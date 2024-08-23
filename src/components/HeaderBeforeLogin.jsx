// components/HeaderBeforeLogin.jsx
import Link from 'next/link';

/*import styles from '../styles/globals.css'*/; // Adjust the path to your CSS file

export default function HeaderBeforeLogin({ onLogoClick }) {
    
    return (
        <header class="header">
            <div class="logo" onClick={onLogoClick} style={{ cursor: 'pointer' }}>
                <h1>CodeMetric</h1>
            </div>
            <div class="buttons">
                <Link href="/login">
                    <button>Login</button>
                </Link>
                <Link href="/signup">
                    <button>Sign Up</button>
                </Link>
            </div>
        </header>
    );
}
