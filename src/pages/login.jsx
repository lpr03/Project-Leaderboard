import Layout from '../components/layout';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/router';
//import Leaderboard from './leaderboard';

export default function LoginPage({ username }) {
    const router = useRouter()
    const { msg } = router.query
    return (
        <Layout pageTitle="Login">
            <Link href="/">Home</Link><br />
            {msg ?
                <h3 className="red">{msg}</h3>
                :
                <></>
            }
            <h2>Login</h2>
            <form action='/api/login' method='POST'>
                <input minLength="3" name="username" id="username" type="text" placeholder='username' required></input><br />
                <input minLength="3" name="password" id="password" type="password" placeholder='password' required></input><br />
                <Link href="/forgot-password">forgot password? </Link>
                <input type="submit" value="Login" />
            </form>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const req = context.req
    const res = context.res
    var username = getCookie('username', { req, res });
    
    if (username != undefined) {

        return {
            redirect: {
                permanent: false,
                destination: "/"
            }
        }
    }
    
    return { props: { username: false } };
};