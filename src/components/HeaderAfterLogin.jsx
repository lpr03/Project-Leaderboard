// components/HeaderAfterLogin.jsx
import Link from 'next/link';
/*import styles from '../styles/globals.css';*/

export default function HeaderAfterLogin({ onLogout, onLogoClick }) {
    return (
        <header className="header">
            <div className="logo" onClick={onLogoClick} style={{ cursor: 'pointer' }}>
                <h1>CodeMetric</h1>
            </div>
            <div className="buttons">
                <button onClick={onLogout}>Logout</button>
            </div>
        </header>
    );
}
