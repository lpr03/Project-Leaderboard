const { MongoClient } = require('mongodb');
const axios = require('axios');
const cheerio = require('cheerio');

const url = process.env.MONGODB_URI;
const dbName = 'Users';
const usersCollectionName = 'Profiles';

// Helper function to delay execution
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Function to scrape CodeChef questions solved
async function ccscrapeQuestionsSolved(url, selector) {
    try {
        const res = await axios.get(url, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const $ = cheerio.load(res.data);
        const d = $(selector).last().text().trim();
        const parsedValue = parseInt(d.match(/\d+/)?.[0]);
        return isNaN(parsedValue) ? null : parsedValue;
    } catch (error) {
        console.error(`Error scraping CodeChef data: ${error.message}`);
        return null; // Return null if there's an error
    }
}

// Function to fetch LeetCode solved questions
async function fetchLeetCodeSolved(username) {
    try {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        const res = await axios.get(url);
        return [
            parseInt(res.data.easySolved) || null,
            parseInt(res.data.mediumSolved) || null,
            parseInt(res.data.hardSolved) || null
        ];
    } catch (error) {
        console.error(`Error fetching LeetCode data for ${username}: ${error.message}`);
        return [null, null, null]; // Return null array if there's an error
    }
}

// Function to scrape GeeksforGeeks questions solved
async function gfgScrapeQuestionsSolved(url, selector) {
    try {
        const res = await axios.get(url, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const $ = cheerio.load(res.data);
        const d = $(selector).text();
        let matches = d.match(/\d+/g);
        return matches ?
            matches.map(num => {
                const parsed = parseInt(num, 10); // Parse the number
                return isNaN(parsed) ? null : parsed; // Return null if NaN, otherwise return parsed value
            })
            : [null, null, null, null, null];
    } catch (error) {
        console.error(`Error scraping GFG data: ${error.message}`);
        return [null, null, null, null, null]; // Return null array if there's an error
    }
}

// Function to update questions solved for all users
export async function updateQuestionsSolved() {
    const client = new MongoClient(url);
    const batchSize = 10;

    try {
        await client.connect();
        const db = client.db(dbName);
        const usersCollection = db.collection(usersCollectionName);

        const users = await usersCollection.find().toArray();
        let successCount = 0;
        let errorCount = 0;
        const updates = [];

        for (let i = 0; i < users.length; i += batchSize) {
            const batch = users.slice(i, i + batchSize);

            await Promise.all(
                batch.map(async (user) => {
                    try {
                        const existingUser = await usersCollection.findOne({ _id: user._id });
                        if (!existingUser) {
                            console.error(`User ${user._id} not found in the database.`);
                            errorCount++;
                            return;
                        }

                        let codechefSolved = null;
                        let leetcodeSolved = [null, null, null];
                        let gfgSolved = [null, null, null, null, null];

                        // Only scrape CodeChef if the username exists
                        if (user.CC_username) {
                            const codechefUrl = `https://www.codechef.com/users/${user.CC_username}`;
                            codechefSolved = await ccscrapeQuestionsSolved(codechefUrl, '.rating-data-section.problems-solved h3');
                            await delay(2000); // Rate limiting
                        }

                        // Only scrape LeetCode if the username exists
                        if (user.Lt_username) {
                            leetcodeSolved = await fetchLeetCodeSolved(user.Lt_username);
                            await delay(2000); // Rate limiting
                        }

                        // Only scrape GeeksforGeeks if the username exists
                        if (user.GFG_username) {
                            const gfgUsernameUrl = `https://www.geeksforgeeks.org/user/${user.GFG_username}`;
                            gfgSolved = await gfgScrapeQuestionsSolved(gfgUsernameUrl, '#comp > div.AuthLayout_outer_div__20rxz > div > div.AuthLayout_head_content__ql3r2 > div > div > div.solvedProblemContainer_head__ZyIn0 > div.solvedProblemSection_head__VEUg4 > div.problemNavbar_head__cKSRi');
                        }

                        // Use existing values if scraping fails and ensure null values are set to zero
                        const cc_norm = codechefSolved !== null ? codechefSolved : existingUser.cc || 0;

                        // LeetCode normalization logic
                        const lc_norm = Array.isArray(leetcodeSolved) && leetcodeSolved.some(val => val !== null)
                            ? 2 * (leetcodeSolved[0] ?? (existingUser.lc[0] || 0)) + 
                              3 * (leetcodeSolved[1] ?? (existingUser.lc[1] || 0)) + 
                              4 * (leetcodeSolved[2] ?? (existingUser.lc[2] || 0))
                            : existingUser.lcs || 0;

                        // GeeksforGeeks normalization logic
                        const gfg_norm = Array.isArray(gfgSolved) && gfgSolved.some(val => val !== null)
                            ? 0.5 * (gfgSolved[0] ?? (existingUser.gfg[0] || 0) )+ 
                              1 * (gfgSolved[1] ?? (existingUser.gfg[1] || 0))+ 
                              2 * (gfgSolved[2] ?? (existingUser.gfg[2] || 0))+ 
                              3 * (gfgSolved[3] ?? (existingUser.gfg[3] || 0)) + 
                              4 * (gfgSolved[4] ?? (existingUser.gfg[4] || 0))
                            : existingUser.gfgs || 0;

                        const total_norm = cc_norm + lc_norm + gfg_norm;

                        const newValues = {
                            cc: codechefSolved !== null ? codechefSolved : existingUser.cc || 0,
                            ccs: cc_norm,
                            lc: leetcodeSolved.some(val => val !== null) ? leetcodeSolved : existingUser.lc || [0, 0, 0],
                            lcs: lc_norm,
                            gfg: gfgSolved.some(val => val !== null) ? gfgSolved : existingUser.gfg || [0, 0, 0, 0, 0],
                            gfgs: gfg_norm,
                            t_norm: total_norm,
                        };

                        updates.push({
                            updateOne: {
                                filter: { _id: user._id },
                                update: { $set: newValues },
                            },
                        });

                        successCount++;
                    } catch (error) {
                        console.error(`Error processing user ${user._id}: ${error.message}`);
                        errorCount++;
                    }
                })
            );
        }

        // Perform the bulk update after processing all users
        if (updates.length > 0) {
            await usersCollection.bulkWrite(updates);
            console.log(`Bulk update completed for ${successCount} users.`);
        }

        if (errorCount > 0) {
            console.log(`There were ${errorCount} errors during processing.`);
        }
    } finally {
        await client.close();
    }
}

updateQuestionsSolved().catch(console.error);
