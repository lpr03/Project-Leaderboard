import { useState } from 'react';
import LayoutBeforeLogin from '../components/LayoutBeforeLogin';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/request-reset', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, username }),  // Send both email and username
        });

        const result = await response.json();
        setMessage(result.message);
    };

    return (
        <LayoutBeforeLogin pageTitle="Login">
            <main className="main-content">
                <div className="form-container">
                    <h1>Forgot Password</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Username:
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Email:
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <button type="submit">Send Reset Link</button>
                    </form>
                    {message && <p>{message}</p>}
                </div>
            </main>
        </LayoutBeforeLogin>
    );
};

export default ForgotPasswordPage;
