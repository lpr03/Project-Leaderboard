import React, { useState, useEffect } from 'react';
import LayoutBeforeLogin from '../components/LayoutBeforeLogin';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function SignupPage({ username }) {
    const router = useRouter();
    const { msg } = router.query;

    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordAgainVisible, setPasswordAgainVisible] = useState(false);

    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
    const togglePasswordAgainVisibility = () => setPasswordAgainVisible(!passwordAgainVisible);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                router.push('/');
            } else {
                const error = await response.text();
                console.error('Error:', error);
                router.push(`/signup?msg=${encodeURIComponent(error)}`);
            }
        } catch (error) {
            console.error('Signup error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (loading) {
            const timeoutId = setTimeout(() => {
                window.location.reload();
            }, 9000);

            return () => clearTimeout(timeoutId);
        }
    }, [loading]);

    return (
        <LayoutBeforeLogin pageTitle="Signup">
            {msg && <h3 className="red">{msg}</h3>}
            <main className="main-content">
                <div className="form-container">
                    <h2 style={{ textAlign: 'center' }}>SignUp</h2>
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <input name="email" type="email" placeholder="Email" required />
                        </div>
                        <div className="form-group">
                            <input minLength="3" name="username" type="text" placeholder="Username" required />
                        </div>
                        <div className="password-container form-group" style={{ position: 'relative' }}>
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                name="password"
                                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])[A-Za-z\d@#$%^&+=]{8,}$"
                                placeholder="Password"
                                title="Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, number, and special character."
                                required
                            />
                            <span onClick={togglePasswordVisibility} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', width: '18px' }}>
                                <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                            </span>
                        </div>
                        <div className="password-container form-group" style={{ position: 'relative' }}>
                            <input
                                type={passwordAgainVisible ? 'text' : 'password'}
                                name="passwordagain"
                                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])[A-Za-z\d@#$%^&+=]{8,}$"
                                placeholder="Password Again"
                                required
                            />
                            <span onClick={togglePasswordAgainVisibility} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', width: '18px' }}>
                                <FontAwesomeIcon icon={passwordAgainVisible ? faEyeSlash : faEye} />
                            </span>
                        </div>
                        <div className="form-group">
                            <input minLength="3" name="lt_username" type="text" placeholder="Leetcode username" />
                        </div>
                        <div className="form-group">
                            <input minLength="3" name="gfg_username" type="text" placeholder="GeekForGeeks username" />
                        </div>
                        <div className="form-group">
                            <input minLength="3" name="cc_username" type="text" placeholder="Codechef username" />
                        </div>
                        <div className="form-group">
                            <button type="submit" disabled={loading}>
                                {loading ? 'Signing Up...' : 'Sign Up'}
                            </button>
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
    const username = getCookie('username', { req, res });
    if (username) {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
        };
    }
    return { props: { username: false } };
}
