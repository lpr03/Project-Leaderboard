// import Cookies from 'cookies';
// import clientPromise from "../../../lib/mongodb";
// import { updateQuestionsSolved } from './scrape';
// //import { fetchLeaderboard } from './leaderboard';

// const { createHash } = require('node:crypto');

// export default async function handler(req, res) {
//   if (req.method == "POST") {
//     const username = req.body['username']
//     const guess = req.body['password']
//     const client = await clientPromise;
//     const db = client.db("Users");
//     const users = await db.collection("Profiles").find({ "Username": username }).toArray();
//     if (users.length == 0) {
//       res.redirect("/login?msg=Incorrect username or password");
//       return;
//     }
//     const user = users[0]
//     const guess_hash = createHash('sha256').update(guess).digest('hex');
//     if (guess_hash == user.Password) {
//       const cookies = new Cookies(req, res)
//       cookies.set('username', username)

//       await updateQuestionsSolved();
//       //await fetchLeaderboard();

//       res.redirect("/")
//     } else {
//       res.redirect("/login?msg=Incorrect username or password")
//     }
//   } else {
//     res.redirect("/")
//   }
// }

import Cookies from 'cookies';
import clientPromise from '../../../lib/mongodb';
// import { updateQuestionsSolved } from './scrape';
import { createHash } from 'node:crypto';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      const client = await clientPromise;
      const db = client.db('Users');
      const users = await db.collection('Profiles').find({ Username: username }).toArray();

      if (users.length === 0) {
        res.redirect('/login?msg=Incorrect username or password');
        return;
      }

      const user = users[0];
      const guessHash = createHash('sha256').update(password).digest('hex');

      if (guessHash === user.Password) {
        const cookies = new Cookies(req, res, { secure: true, httpOnly: true });
        cookies.set('username', username);

        // await updateQuestionsSolved();
        res.redirect('/');
      } else {
        res.redirect('/login?msg=Incorrect username or password');
      }
    } catch (error) {
      console.error('Error handling login request:', error);
      res.redirect('/login?msg=Internal server error');
    }
  } else {
    res.redirect('/');
  }
}