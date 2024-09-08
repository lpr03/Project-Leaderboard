// //import { uri } from '../../../lib/mongodb';
// const { MongoClient } = require('mongodb');
// const axios = require('axios');
// const cheerio = require('cheerio');

// const url = process.env.MONGODB_URI;
// const dbName = 'Users';
// const usersCollectionName = 'Profiles';

// async function scrapeQuestionsSolved(url, selector) {
//     try {
//         const res = await axios.get(url);
//         const $ = cheerio.load(res.data);
//         const d = $(selector).last().text().trim();
//         return parseInt(d.match(/\d+/)[0]);
//     } catch (error) {
//         console.error(`Error fetching data from ${url}:`, error.message);
//         return null;
//     }
// }

// async function gfgScrapeQuestionsSolved(url, selector) {
//     let myList = [];
//     try {
//         const res = await axios.get(url);
//         const $ = cheerio.load(res.data);
//         const d = $(selector).text();
//         let matches = d.match(/\d+/g);
//         if (matches) {
//             matches.forEach((num) => {
//                 myList.push(parseInt(num, 10));
//             })
//         }
//         return myList;
//     } catch (error) {
//         console.error(`Error fetching data from ${url}:`, error.message);
//         return null;
//     }
// }

// async function fetchLeetCodeSolved(username) {
//     let myList = [];
//     try {
//         const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
//         const res = await axios.get(url);

//         let easy = parseInt(res.data.easySolved);
//         let medium = parseInt(res.data.mediumSolved);
//         let hard = parseInt(res.data.hardSolved);

//         myList.push(easy, medium, hard);
//         return myList;
//     } catch (error) {
//         console.error(`Error fetching data from LeetCode for user ${username}:`, error.message);
//         return null;
//     }
// }

// export async function updateQuestionsSolved() {
//     //const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
//     const client = new MongoClient(url);


//     try {
//         await client.connect();
//         const db = client.db(dbName);
//         const usersCollection = db.collection(usersCollectionName);

//         const users = await usersCollection.find().toArray();
//         let i = 0;

//         for (const user of users) {
//             try {
//                 const codechefUrl = `https://www.codechef.com/users/${user.CC_username}`;
//                 const leetcodeUsername = user.Lt_username;
//                 const gfgUsernameUrl = `https://www.geeksforgeeks.org/user/${user.GFG_username}`;

//                 const codechefSolved = await scrapeQuestionsSolved(codechefUrl, '.rating-data-section.problems-solved h3');
//                 const leetcodeSolved = await fetchLeetCodeSolved(leetcodeUsername);
//                 const gfgSolved = await gfgScrapeQuestionsSolved(gfgUsernameUrl, '.problemNavbar_head__cKSRi');

//                 const lc_norm = 2 * leetcodeSolved[0] + 3 * leetcodeSolved[1] + 4 * leetcodeSolved[2];
//                 let gfg_norm = 0.5 * gfgSolved[0] + 1 * gfgSolved[1] + 2 * gfgSolved[2] + 3 * gfgSolved[3] + 4 * gfgSolved[4];
//                 if (isNaN(gfg_norm)) {
//                     gfg_norm = 0;
//                 }
//                 const cc_norm = 2.5 * codechefSolved;

//                 let total_norm = 0;

//                 if (user.Lt_username && user.GFG_username && user.CC_username) {
//                     total_norm = cc_norm / 3 + lc_norm / 3 + gfg_norm / 3;
//                 }
//                 else if (user.Lt_username && user.GFG_username || user.GFG_username && user.CC_username || user.CC_username && user.Lt_username) {
//                     total_norm = cc_norm / 2 + lc_norm / 2 + gfg_norm / 2;
//                 }
//                 else if (user.Lt_username || user.GFG_username || user.CC_username) {
//                     total_norm = cc_norm / 1 + lc_norm / 1 + gfg_norm / 1;
//                 }
//                 else {
//                     total_norm = 0;
//                 }
//                 //const totalSolved = codechefSolved + leetcodeSolved + gfgSolved;

//                 await usersCollection.updateOne({ _id: user._id }, {
//                     $set: {
//                         cc: codechefSolved,
//                         ccs: cc_norm,
//                         lc: leetcodeSolved,
//                         lcs: lc_norm,
//                         gfg: gfgSolved,
//                         gfgs: gfg_norm,
//                         t_norm: total_norm
//                     }
//                 });
//                 console.log(i);
//                 i++;
//             } catch (error) {
//                 console.error(`Error processing user ${user._id}:`, error.message);
//             }
//         }
//     } finally {
//         await client.close();
//     }
// }
// updateQuestionsSolved().catch(console.error);




const { MongoClient } = require('mongodb');
const axios = require('axios');
const cheerio = require('cheerio');

const url = process.env.MONGODB_URI;
const dbName = 'Users';
const usersCollectionName = 'Profiles';

// Helper function to delay execution
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function scrapeQuestionsSolved(url, selector) {
        try {
            const res = await axios.get(url);
            const $ = cheerio.load(res.data);
            const d = $(selector).last().text().trim();
            return parseInt(d.match(/\d+/)[0]);
        } catch (error) {
            console.error(`Error fetching data from ${url}:`, error.message);
            return null;
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
                myList.push(parseInt(num, 10));
            });
        }
        return myList;
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error.message);
        return null;
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

        myList.push(easy, medium, hard);
        return myList;
    } catch (error) {
        console.error(`Error fetching data from LeetCode for user ${username}:`, error.message);
        return null;
    }
}

async function updateQuestionsSolved() {
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

                for (let attempt = 0; attempt < maxRetries; attempt++) {
                    try {
                        codechefSolved = await scrapeQuestionsSolved(codechefUrl, '.rating-data-section.problems-solved h3');
                        break; // Exit loop if successful
                    } catch (error) {
                        if (attempt === maxRetries - 1) throw error;
                        console.error(`Retrying CodeChef scrape for user ${user._id} (attempt ${attempt + 1})`);
                        await delay(retryDelay);
                    }
                }

                for (let attempt = 0; attempt < maxRetries; attempt++) {
                    try {
                        leetcodeSolved = await fetchLeetCodeSolved(leetcodeUsername);
                        break; // Exit loop if successful
                    } catch (error) {
                        if (attempt === maxRetries - 1) throw error;
                        console.error(`Retrying LeetCode fetch for user ${user._id} (attempt ${attempt + 1})`);
                        await delay(retryDelay);
                    }
                }

                for (let attempt = 0; attempt < maxRetries; attempt++) {
                    try {
                        gfgSolved = await gfgScrapeQuestionsSolved(gfgUsernameUrl, '.problemNavbar_head__cKSRi');
                        break; // Exit loop if successful
                    } catch (error) {
                        if (attempt === maxRetries - 1) throw error;
                        console.error(`Retrying GFG scrape for user ${user._id} (attempt ${attempt + 1})`);
                        await delay(retryDelay);
                    }
                }

                const lc_norm = 2 * leetcodeSolved[0] + 3 * leetcodeSolved[1] + 4 * leetcodeSolved[2];
                let gfg_norm = 0.5 * gfgSolved[0] + 1 * gfgSolved[1] + 2 * gfgSolved[2] + 3 * gfgSolved[3] + 4 * gfgSolved[4];
                if (isNaN(gfg_norm)) {
                    gfg_norm = 0;
                }
                const cc_norm = 2.5 * codechefSolved;

                let total_norm = 0;

                if (user.Lt_username && user.GFG_username && user.CC_username) {
                    total_norm = cc_norm / 3 + lc_norm / 3 + gfg_norm / 3;
                } else if (user.Lt_username && user.GFG_username || user.GFG_username && user.CC_username || user.CC_username && user.Lt_username) {
                    total_norm = cc_norm / 2 + lc_norm / 2 + gfg_norm / 2;
                } else if (user.Lt_username || user.GFG_username || user.CC_username) {
                    total_norm = cc_norm / 1 + lc_norm / 1 + gfg_norm / 1;
                } else {
                    total_norm = 0;
                }

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
                if (!currentUser) continue; // Skip if user not found

                const hasChanges = Object.keys(newValues).some(key => 
                    JSON.stringify(currentUser[key]) !== JSON.stringify(newValues[key])
                );

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
