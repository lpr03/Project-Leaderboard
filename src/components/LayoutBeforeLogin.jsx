// components/LayoutBeforeLogin.jsx
import Head from 'next/head';
import { useRouter } from 'next/router';
import HeaderBeforeLogin from './HeaderBeforeLogin'; // Import the header component
import Footer from './Footer';

export const siteTitle = "Login Signup Nextjs";

export default function LayoutBeforeLogin({ pageTitle, children }) {
    const router = useRouter();

    const handleLogoClick = () => {
        router.push('/'); // Redirect to home page when clicking the logo
    };

    return (
        <div>
            <Head>
                <link rel="shortcut icon" href="/favicon.ico" />
                <meta name="description" content="CodeMetricApp" />
                <title>{pageTitle}</title>
            </Head>
            <HeaderBeforeLogin onLogoClick={handleLogoClick} />
            <main>{children}</main>
            <Footer />
        </div>
    );
}


