import Cookies from 'cookies'
import clientPromise from "../../../lib/mongodb";
const {createHash} = require('node:crypto');
/* import {HomePage} from '../api_3/leetcode/page'; */

export default async function handler(req, res) {
  if (req.method == "POST"){
    const username = req.body['username']
    const password = req.body['password']
    const passwordagain = req.body['passwordagain']
    const lt_username = req.body['lt_username']
    const gfg_username = req.body['gfg_username']
    const cc_username = req.body['cc_username']
    
    if (password != passwordagain){
        res.redirect("/signup?msg=The two passwords don't match");
        return;
    }
    const client = await clientPromise;
    const db = client.db("Users");
    const users = await db.collection("Profiles").find({"Username": username}).toArray();
    if (users.length > 0){
        res.redirect("/signup?msg=A user already has this username");
        return;
    }
    const password_hash = createHash('sha256').update(password).digest('hex');
    const currentDate = new Date().toUTCString();
    const bodyObject = {
        Username: username,
        Password: password_hash,
        Created: currentDate,
        Lt_username: lt_username,
        GFG_username: gfg_username,
        CC_username: cc_username
    }
    await db.collection("Profiles").insertOne(bodyObject);
    const cookies = new Cookies(req, res)
    cookies.set('username', username)
    res.redirect("/")
  } else {
    res.redirect("/")
  }
}