import { getCookie } from 'cookies-next';
import Link from 'next/link';
import Leaderboard, { getServerSideProps as getLeaderboardProps } from './leaderboard';
import LayoutBeforeLogin from '../components/LayoutBeforeLogin';
import LayoutAfterLogin from '../components/LayoutAfterLogin';

export default function HomePage({ username, leaderboard }) {
    return (
        <>
            {username ? (
                <LayoutAfterLogin pageTitle="LeaderBoard">
                    <h2>Hi {username}!</h2>
                    <Leaderboard leaderboard={leaderboard} />
                </LayoutAfterLogin>
            ) : (
                <LayoutBeforeLogin pageTitle="Home">
                        <div class="container">
                            <div class="block">
                                <h1>Welcome to CodeMetric</h1>
                                <p>Your one-stop solution for all your coding metrics needs.</p>
                            </div>
                            <div class="block">
                               {/* <Image src="../../images/slide1.jpg" alt="Example Image" width={500} height={300} />*/}
                                <p>Our platform provides detailed analytics and insights to help you improve your coding skills.</p>
                            </div>
                            <div class="block">
                                <h2>Feature 1</h2>
                                <p>Track your progress with our comprehensive dashboard.</p>
                            </div>
                            <div class="block">
                                <h2>Feature 2</h2>
                                <p>Get personalized recommendations based on your coding habits.</p>
                            </div>
                            <div class="block">
                                <h2>Feature 3</h2>
                                <p>Join a community of like-minded developers and share your achievements.</p>
                            </div>
                        </div>
                </LayoutBeforeLogin>
            )}
        </>
    );
}

export async function getServerSideProps(context) {
    const req = context.req;
    const res = context.res;
    var username = getCookie('username', { req, res });
    if (username === undefined) {
        username = false;
    }
    const leaderboardProps = await getLeaderboardProps(context);

    return {
        props: {
            username,
            ...leaderboardProps.props,
        },
    };
}
