import Cookies from 'cookies';
import clientPromise from "../../../lib/mongodb";
import { updateQuestionsSolved } from './scrape';
const { createHash } = require('node:crypto');

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, username, password, passwordagain, lt_username, gfg_username, cc_username } = req.body;

    // Password validation
    if (password !== passwordagain) {
      res.redirect("/signup?msg=The two passwords don't match");
      return;
    }

    // Store user data in cookies to use in the success page
    const cookies = new Cookies(req, res);
    cookies.set('signupData', JSON.stringify({ email, username, password, lt_username, gfg_username, cc_username }));

    // Redirect to the signup success page
    res.redirect("/signup-success");
  } else {
    res.redirect("/");
  }
}
