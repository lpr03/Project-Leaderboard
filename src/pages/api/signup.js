import Cookies from 'cookies';
import clientPromise from "../../../lib/mongodb";
import { updateQuestionsSolved } from './scrape';
import { createHash } from 'node:crypto';

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, username, password, passwordagain,college, lt_username, gfg_username, cc_username } = req.body;

    // Check if passwords match
    if (password !== passwordagain) {
      return res.status(400).json({ msg: "The two passwords don't match" });
    }

    // Connect to the database
    const client = await clientPromise;
    const db = client.db("Users");

    // Check if username already exists
    const existingUser = await db.collection("Profiles").findOne({ "Username": username });
    if (existingUser) {
      return res.status(400).json({ msg: "A user already has this username" });
    }

    // Hash the password
    const password_hash = createHash('sha256').update(password).digest('hex');
    const currentDate = new Date().toUTCString();

    // Create the user object
    const userObject = {
      Email: email,
      Username: username,
      Password: password_hash,
      Created: currentDate,
      College: college,
      Lt_username: lt_username,
      GFG_username: gfg_username,
      CC_username: cc_username,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    };

    // Insert the user into the database
    await db.collection("Profiles").insertOne(userObject);

    // Set cookie
    const cookies = new Cookies(req, res);
    cookies.set('username', username);
    
    res.redirect("/")
  } else {
    res.redirect("/")
  }
}