import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Footer from './Footer';
import { AuthProvider, useAuth } from '../context/AuthContext';
import HeaderAfterLogin from './HeaderAfterLogin';
import Sidebar from './Sidebar';
/*import { useAuth } from '../hooks/useAuth';*/
/*import SideNavbar from './SideNavbar';*/
/*import styles from '../styles/globals.css';*/

export const siteTitle = "Login Signup Nextjs";
export default function LayoutAfterLogin({ pageTitle, children }) {
    const [collapsed, setCollapsed] = useState(false);
    /*const { user, logout } = useAuth();*/
    const router = useRouter();

    const handleLogoClick = () => {
        router.push('/profile'); // Redirect to dashboard when clicking the logo
    };

    const handleLogout = () => {
        router.push('/api/logout');
    };

    return (
        <div>
            <Head>
                <link rel="shortcut icon" href="/favicon.ico" />
                <meta name="description" content="CodeMetricApp" />
                <meta property="og:image" content="/logo.png" />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta property="og:site_name" content={siteTitle} />
                <meta name="robots" content="index, follow" />
                <meta property="og:type" content="Website" />
                <title>{pageTitle}</title>
            </Head>
            <AuthProvider>
                <HeaderAfterLogin onLogout={handleLogout} onLogoClick={handleLogoClick} />
                <div className="contentWrapper">
                    <Sidebar />
                    <main className="main">
                        {children}
                    </main>
                </div>
                <Footer />
            </AuthProvider>
        </div>
    );
}

