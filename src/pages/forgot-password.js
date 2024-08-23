import { useState } from 'react';
import LayoutBeforeLogin from '../components/LayoutBeforeLogin';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/request-reset', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        const result = await response.json();
        setMessage(result.message);
    };

    return (
        <LayoutBeforeLogin pageTitle="Login">
        <main class="main-content">
            <div class="form-container">
                <h1>Forgot Password</h1>
                <form onSubmit={handleSubmit}>
                    <div class="form-group">
                        <label>Email:
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
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