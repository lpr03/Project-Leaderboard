import LayoutBeforeLogin from '../components/LayoutBeforeLogin';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
//import Leaderboard from './leaderboard';

export default function LoginPage({ username }) {
    const router = useRouter()
    const { msg } = router.query

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <LayoutBeforeLogin pageTitle="Login">
            
            {/*<h2>Login</h2>*/}
            {/*<form action='/api/login' method='POST'>*/}
            {/*    <input minLength="3" name="username" id="username" type="text" placeholder='username' required></input><br />*/}
            {/*    <input minLength="3" name="password" id="password" type="password" placeholder='password' required></input><br />*/}
            {/*    <Link href="/forgot-password">forgot password? </Link>*/}
            {/*    <input type="submit" value="Login" />*/}
            {/*</form>*/}
            <main class="main-content">
                <div class="form-container">
                    <h2 style={{textAlign:"center"}}>Login</h2>
                    <form action='/api/login' method="POST">
                        <div class="form-group">
                            <input minLength="3" name="username" id="username" type="text" placeholder='Username' required></input><br />
                        </div>
                        <div className="password-container form-group" style={{ position: 'relative' }}>
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                id="password"
                                className="password-input"
                                name="password"
                                //pattern="^[a-zA-Z0-9@#$%&]{5,}$"
                                placeholder="Password"
                                title="Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, number and special character."
                                required
                            />
                            <span
                                onClick={togglePasswordVisibility}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer',
                                    width: '18px',
                                }}
                            >
                                <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                            </span>
                        </div>
                        {/* <div class="form-group">
                            <label name="rememberMe">Remember me</label>
                            <input name="RememberMe" type="checkbox" />
                        </div> */}
                        <Link href="/forgot-password"
                        style={{
                            color: 'black',
                            textDecoration: 'none',

                        }}>Forgot password?
                        </Link>
                        <button type="submit">Log in</button>
                    </form>
                    {msg ?
                <h3 style={{textAlign: "center"}} className="red">{msg}</h3>
                :
                <></>
            }
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