import { useState } from 'react';
import { useRouter } from 'next/router';
import LayoutBeforeLogin from "../components/LayoutBeforeLogin";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const ResetPasswordPage = () => {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { token } = router.query;

        const response = await fetch('/api/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, newPassword: password }),
        });

        const result = await response.json();
        setMessage(result.message);

        if (response.ok) {
            // Optionally redirect to login page
            router.push('/login');
        }
    };

    return (
        <LayoutBeforeLogin>
            <main class="main-content">
                <div class="form-container">
                    <h1>Reset Password</h1>
                    <form onSubmit={handleSubmit}>
                    <div className="password-container form-group" style={{ position: 'relative' }}>
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                id="password"
                                className="password-input"
                                name="password"
                                pattern="^[a-zA-Z0-9@#$%&]{5,}$"
                                placeholder="Password"
                                title="Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, number and special character."
                                onChange={(e) => setPassword(e.target.value)}
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
                            <label>New Password:
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </label>
                         </div> */}
                        <button type="submit">Reset Password</button>
                    </form>
                    {message && <p>{message}</p>}
                </div>
            </main>
        </LayoutBeforeLogin>
    );
};

export default ResetPasswordPage;