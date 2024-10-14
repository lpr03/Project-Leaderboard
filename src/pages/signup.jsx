import React, { useState } from 'react';
import LayoutBeforeLogin from '../components/LayoutBeforeLogin';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function SignupPage({ username }) {
    const router = useRouter();
    const { msg } = router.query;

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordAgainVisible, setPasswordAgainVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const togglePasswordAgainVisibility = () => {
        setPasswordAgainVisible(!passwordAgainVisible);
    };

    return (
        <LayoutBeforeLogin pageTitle="Signup">
            {msg ? <h3 className="red">{msg}</h3> : <></>}
            <main className="main-content">
                <div className="form-container">
                    <h2 style={{ textAlign: "center" }}>SignUp</h2>
                    <form action="/api/signup" method="POST">
                        <div className="form-group">
                            <input name="email" id="email" type="email" placeholder="Email" required />
                        </div>
                        <div className="form-group">
                            <input minLength="3" name="username" id="username" type="text" placeholder="Username" required />
                        </div>
                        <div className="password-container form-group" style={{ position: 'relative' }}>
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                id="password"
                                className="password-input"
                                name="password"
                                pattern="^[a-zA-Z0-9@#$%&]{5,}$"
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
                        <div className="password-container form-group" style={{ position: 'relative' }}>
                            <input
                                type={passwordAgainVisible ? 'text' : 'password'}
                                id="passwordagain"
                                name="passwordagain"
                                pattern="^[a-zA-Z0-9@#$%&]{5,}$"
                                placeholder="Password Again"
                                title="Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, number and special character."
                                required
                            />
                            <span
                                onClick={togglePasswordAgainVisibility}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer',
                                    width: '18px',
                                }}
                            >
                                <FontAwesomeIcon icon={passwordAgainVisible ? faEyeSlash : faEye} />
                            </span>
                        </div>
                        <div className="select">
                            <select name="college" id="college">
                                <option defaultChecked>Select your College</option>
                                <option value="Vignana Bharathi Institute of Technology">Vignana Bharathi Institute of Technology</option>
                                <option value="Anurag University">Anurag University</option>
                                <option value="Nalla Malla Reddy Engineering College">Nalla Malla Reddy Engineering College</option>
                                <option value="Nalla Narasimha Reddy College of Engineering">Nalla Narasimha Reddy College of Engineering</option>
                                <option value="ACE Engineering College">ACE Engineering College</option>
                                <option value="Sreenidhi Institute of Science and Technology">Sreenidhi Institute of Science and Technology</option>
                                <option value="Aurora's Technological and Management Academy">Aurora's Technological and Management Academy</option>
                                <option value="Kommuri Pratap Reddy Institute of Technology">Kommuri Pratap Reddy Institute of Technology</option>
                                <option value="Megha Institute of Engineering and Technology for Women">Megha Institute of Engineering and Technology for Women</option>
                                <option value="Princeton College of Engineering and Technology">Princeton College of Engineering and Technology</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input minLength="3" name="lt_username" id="lt_username" type="text" placeholder="Leetcode username" />
                        </div>
                        <div className="form-group">
                            <input minLength="3" name="gfg_username" id="gfg_username" type="text" placeholder="GeekForGeeks username" />
                        </div>
                        <div className="form-group">
                            <input minLength="3" name="cc_username" id="cc_username" type="text" placeholder="Codechef username" />
                        </div>
                        <div className="form-group">
                            <button type="submit">Sign Up</button>
                        </div>
                    </form>
                </div>
            </main>
        </LayoutBeforeLogin>
    );
}

export async function getServerSideProps(context) {
    const req = context.req;
    const res = context.res;
    var username = getCookie('username', { req, res });
    if (username != undefined) {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
        };
    }
    return { props: { username: false } };
}