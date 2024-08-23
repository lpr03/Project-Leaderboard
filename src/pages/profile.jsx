import LayoutAfterLogin from '../components/LayoutAfterLogin'
import { getCookie } from 'cookies-next';
import Link from 'next/link'
import clientPromise from "../../lib/mongodb";

export default function ProfilePage({ username, created }) {
    return (
        <LayoutAfterLogin pageTitle="Profile">
            <Link href="/">Home</Link><br />
            <h2>{username}'s Profile</h2>
            <p>Account created - <strong>{created}</strong></p>
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
