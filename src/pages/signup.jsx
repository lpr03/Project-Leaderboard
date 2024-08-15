import Layout from '../components/layout'
import { getCookie } from 'cookies-next';
import Link from 'next/link'
import { useRouter } from 'next/router';

export default function SignupPage({ username }) {
    const router = useRouter()
    const { msg } = router.query
    return (
        <Layout pageTitle="Signup">
            <Link href="/">Home</Link><br />
            {msg ?
                <h3 className="red">{msg}</h3>
                :
                <></>
            }
            <h2>Sign up</h2>
            <form action='/api/signup' method='POST'>
                <input name="email" id="email" type="email" placeholder='Username' required></input><br />
                <input minLength="3" name="username" id="username" type="text" placeholder='Username' required></input><br />
                <input minLength="5" name="password" id="password" type="password" placeholder='Password' required></input><br />
                <input minLength="5" name="passwordagain" id="passwordagain" type="password" placeholder='Password' required></input><br />
                <input minLength="3" name="lt_username" id="lt_username" type="text" placeholder='Leetcode username' ></input><br />
                <input minLength="3" name="gfg_username" id="gfg_username" type="text" placeholder='GeekForGeeks username' ></input><br />
                <input minLength="3" name="cc_username" id="cc_username" type="text" placeholder='Codechef username' ></input><br />
                {/* <input minLength="5" name="passwordagain" id="passwordagain" type="password" placeholder='password again' required></input><br /> */}
                <input type="submit" value="Signup" />
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