import Layout from '../components/layout'
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import Leaderboard, { getServerSideProps as getLeaderboardProps } from './leaderboard';

export default function HomePage( {username, leaderboard} ) {
    return (
        <Layout pageTitle="Home">
        {username ?
        <>
            <h2>Hi {username}!</h2>
            <Link href="/profile">Profile</Link><br/>
            <Link href="/api/logout">Logout</Link>
            <br />
            <Leaderboard leaderboard={leaderboard} />
        </>: 
        <>  
            <h1>Log in</h1>
            <p>
            <Link href="/login">Login</Link><br/>
            </p>
            <p>
            <Link href="/signup">Signup</Link>
            </p>
        </>
        }
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const req = context.req
    const res = context.res
    var username = getCookie('username', { req, res });
    if (username == undefined){
        username = false;
    }
    //return { props: {username} };
    const leaderboardProps = await getLeaderboardProps(context);

    return {
        props: {
            username,
            ...leaderboardProps.props, // This spreads the leaderboard data into the props
        },
    };
};