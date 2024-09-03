import LayoutAfterLogin from '../components/LayoutAfterLogin'
import { getCookie } from 'cookies-next';
import Link from 'next/link'
import clientPromise from "../../lib/mongodb";

export default function ProfilePage({ username, created }) {
     // Replace with the UTC date from your database
    const utcDate = new Date(created); 
    const options = { 
      timeZone: 'Asia/Kolkata', 
      weekday: 'long',    // For the full day name (e.g., "Monday")
      year: 'numeric', 
      month: 'long',      // For the full month name (e.g., "August")
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric', 
      second: 'numeric' 
    };
    const isDate = utcDate.toLocaleString('en-GB', options);
    return (
        <LayoutAfterLogin pageTitle="Profile">
            <button className='btn'>
            <Link 
                     style={{
                        color: 'white',
                        textDecoration: 'none',

                    }}
            href="/">Home</Link><br />
            </button>
            <h2>{username}'s Profile</h2>
            <p>Account created - <strong>{isDate}</strong></p>
        </LayoutAfterLogin>
    );
}

export async function getServerSideProps(context) {
    const req = context.req
    const res = context.res
    var username = getCookie('username', { req, res });
    if (username == undefined) {
        return {
            redirect: {
                permanent: false,
                destination: "/"
            }
        }
    }
    const client = await clientPromise;
    const db = client.db("Users");
    const users = await db.collection("Profiles").find({ "Username": username }).toArray();
    const userdoc = users[0]
    const created = userdoc['Created']
    return {
        props: { username: username, created: created },
    }
}
