import LayoutBeforeLogin from '../components/LayoutBeforeLogin';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/router';
//import Leaderboard from './leaderboard';

export default function LoginPage({ username }) {
    const router = useRouter()
    const { msg } = router.query
    return (
        <LayoutBeforeLogin pageTitle="Login">
            {msg ?
                <h3 className="red">{msg}</h3>
                :
                <></>
            }
            {/*<h2>Login</h2>*/}
            {/*<form action='/api/login' method='POST'>*/}
            {/*    <input minLength="3" name="username" id="username" type="text" placeholder='username' required></input><br />*/}
            {/*    <input minLength="3" name="password" id="password" type="password" placeholder='password' required></input><br />*/}
            {/*    <Link href="/forgot-password">forgot password? </Link>*/}
            {/*    <input type="submit" value="Login" />*/}
            {/*</form>*/}
            <main class="main-content">
                <div class="form-container">
                    <h2>Login</h2>
                    <form action='/api/login' method="POST">
                        <div class="form-group">
                            <input minLength="3" name="username" id="username" type="text" placeholder='username' required></input><br />
                        </div>
                        <div class="form-group">
                            <input minLength="3" name="password" id="password" type="password" placeholder='password' required></input><br />
                        </div>
                        <div class="form-group">
                            <label name="rememberMe">Remember me?</label>
                            <input name="RememberMe" type="checkbox" />
                        </div>
                        <Link href="/forgot-password">forgot password? </Link>
                        <button type="submit">Log in</button>
                    </form>
                </div>
            </main>

        </LayoutBeforeLogin>
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