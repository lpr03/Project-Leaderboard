const { MongoClient } = require('mongodb');
const axios = require('axios');
const cheerio = require('cheerio');

const url = process.env.MONGODB_URI;
const dbName = 'Users';
const usersCollectionName = 'Profiles';

// Helper function to delay execution
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function ccscrapeQuestionsSolved(url, selector) {
    try {
        const res = await axios.get(url);
        const $ = cheerio.load(res.data);
        const d = $(selector).last().text().trim();
        const parsedValue = parseInt(d.match(/\d+/)?.[0]);
        return isNaN(parsedValue) ? 0 : parsedValue; // Return 0 if undefined or NaN
    } catch (error) {
        return 0; // Return 0 if there's an error
    }
}

async function gfgScrapeQuestionsSolved(url, selector) {
    let myList = [];
    try {
        const res = await axios.get(url);
        const $ = cheerio.load(res.data);
        const d = $(selector).text();
        let matches = d.match(/\d+/g);
        if (matches) {
            matches.forEach((num) => {
                const parsedNum = parseInt(num, 10);
                myList.push(isNaN(parsedNum) ? 0 : parsedNum); // Handle undefined or NaN
            });
        }
        return myList.length > 0 ? myList : [0, 0, 0, 0, 0]; // Default array if no matches
    } catch (error) {
        return [0, 0, 0, 0, 0]; // Default array on error
    }
}

async function fetchLeetCodeSolved(username) {
    let myList = [];
    try {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        const res = await axios.get(url);

        let easy = parseInt(res.data.easySolved);
        let medium = parseInt(res.data.mediumSolved);
        let hard = parseInt(res.data.hardSolved);

        myList.push(isNaN(easy) ? 0 : easy, isNaN(medium) ? 0 : medium, isNaN(hard) ? 0 : hard);
        return myList;
    } catch (error) {
        return [0, 0, 0]; // Return default array on error
    }
}

export async function updateQuestionsSolved() {
    const client = new MongoClient(url);
    const maxRetries = 3;
    const retryDelay = 5000; // 5 seconds

    try {
        await client.connect();
        const db = client.db(dbName);
        const usersCollection = db.collection(usersCollectionName);

        const users = await usersCollection.find().toArray();
        let i = 0;

        for (const user of users) {
            try {
                const codechefUrl = `https://www.codechef.com/users/${user.CC_username}`;
                const leetcodeUsername = user.Lt_username;
                const gfgUsernameUrl = `https://www.geeksforgeeks.org/user/${user.GFG_username}`;

                let codechefSolved, leetcodeSolved, gfgSolved;

                // CodeChef
                for (let attempt = 0; attempt < maxRetries; attempt++) {
                    try {
                        codechefSolved = await ccscrapeQuestionsSolved(codechefUrl, '.rating-data-section.problems-solved h3');
                        break;
                    } catch (error) {
                        if (attempt === maxRetries - 1) throw error;
                        await delay(retryDelay);
                    }
                }

                // LeetCode
                for (let attempt = 0; attempt < maxRetries; attempt++) {
                    try {
                        leetcodeSolved = await fetchLeetCodeSolved(leetcodeUsername);
                        break;
                    } catch (error) {
                        if (attempt === maxRetries - 1) throw error;
                        await delay(retryDelay);
                    }
                }

                // GeeksforGeeks
                for (let attempt = 0; attempt < maxRetries; attempt++) {
                    try {
                        gfgSolved = await gfgScrapeQuestionsSolved(gfgUsernameUrl, '.problemNavbar_head__cKSRi');
                        break;
                    } catch (error) {
                        if (attempt === maxRetries - 1) throw error;
                        await delay(retryDelay);
                    }
                }

                // Calculate normalized scores
                const lc_norm = 2 * leetcodeSolved[0] + 3 * leetcodeSolved[1] + 4 * leetcodeSolved[2];
                let gfg_norm = 0.5 * gfgSolved[0] + 1 * gfgSolved[1] + 2 * gfgSolved[2] + 3 * gfgSolved[3] + 4 * gfgSolved[4];

                gfg_norm = isNaN(gfg_norm) ? 0 : gfg_norm;
                const cc_norm = codechefSolved || 0;

                // Calculate total normalized score
                let total_norm = 0;
                total_norm = cc_norm + lc_norm + gfg_norm;

                const newValues = {
                    cc: codechefSolved,
                    ccs: cc_norm,
                    lc: leetcodeSolved,
                    lcs: lc_norm,
                    gfg: gfgSolved,
                    gfgs: gfg_norm,
                    t_norm: total_norm
                };

                const currentUser = await usersCollection.findOne({ _id: user._id });

                const hasChanges = Object.keys(newValues).some(key => JSON.stringify(currentUser[key]) !== JSON.stringify(newValues[key]));

                if (hasChanges) {
                    await usersCollection.updateOne({ _id: user._id }, {
                        $set: newValues
                    });
                    console.log(`Updated user ${user._id}`);
                } else {
                    console.log(`No changes for user ${user._id}`);
                }

                i++;
                await delay(1000);
            } catch (error) {
                console.error(`Error processing user ${user._id}:`, error.message);
            }
        }
    } finally {
        await client.close();
    }
}

updateQuestionsSolved().catch(console.error);
