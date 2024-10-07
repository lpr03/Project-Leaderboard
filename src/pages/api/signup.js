import Cookies from 'cookies';
import clientPromise from "../../../lib/mongodb";
import { updateQuestionsSolved } from './scrape';
import { createHash } from 'node:crypto';

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { email, username, password, passwordagain, lt_username, gfg_username, cc_username } = req.body;

        if (password !== passwordagain) {
            res.redirect("/signup?msg=The two passwords don't match");
            return;
        }

        try {
            const client = await clientPromise;
            const db = client.db("Users");
            const userExists = await db.collection("Profiles").findOne({ Username: username });

            if (userExists) {
                res.redirect("/signup?msg=A user already has this username");
                return;
            }

            const password_hash = createHash('sha256').update(password).digest('hex');
            const currentDate = new Date().toUTCString();
            const bodyObject = {
                Email: email,
                Username: username,
                Password: password_hash,
                Created: currentDate,
                Lt_username: lt_username,
                GFG_username: gfg_username,
                CC_username: cc_username,
                resetPasswordToken: null,
                resetPasswordExpires: null,
            };

            await db.collection("Profiles").insertOne(bodyObject);
            const cookies = new Cookies(req, res);
            cookies.set('username', username);
            await updateQuestionsSolved();
            res.redirect("/");
        } catch (error) {
            console.error("Error during signup:", error);
            res.redirect("/signup?msg=Error occurred, please try again.");
        }
    } else {
        res.redirect("/");
    }
}
