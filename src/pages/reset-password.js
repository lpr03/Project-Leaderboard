import { useState } from 'react';
import { useRouter } from 'next/router';
import LayoutBeforeLogin from "../components/LayoutBeforeLogin";

const ResetPasswordPage = () => {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

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
                        <div class="form-group">
                            <label>New Password:
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </label>
                         </div>
                        <button type="submit">Reset Password</button>
                    </form>
                    {message && <p>{message}</p>}
                </div>
            </main>
        </LayoutBeforeLogin>
    );
};

export default ResetPasswordPage;