// pages/index.jsx
import { getCookie } from 'cookies-next';
import LayoutBeforeLogin from '../components/LayoutBeforeLogin';
import LayoutAfterLogin from '../components/LayoutAfterLogin';
import { updateQuestionsSolved } from './api/scrape';
import ScrollView from '../components/ScrollView'

export default function HomePage({ username, leaderboard }) {
    
    return (
        <>
            {username ? (
                <LayoutAfterLogin pageTitle="LeaderBoard">
                    <h2>Hi {username}!</h2>
                    <div className="container">
                        <h3>Leaderboard</h3>
                        {leaderboard && leaderboard.length > 0 ? (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Name</th>
                                        <th>Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaderboard.slice(0, 5).map(({ rank, name, score, isCurrentUser }) => (
                                        <tr key={rank} className={isCurrentUser ? "currentUserRow" : (rank % 2 === 0 ? "evenRow" : "oddRow")}>
                                            <td>{rank}</td>
                                            <td>{name}</td>
                                            <td>{score !== null ? score : 'N/A'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No data available.</p>
                        )}
                    </div>
                </LayoutAfterLogin>
            ) : (
                <LayoutBeforeLogin pageTitle="Home">
                        <div className="container">
                            <div className="first-block">
                            <h1>Welcome to CodeMetric</h1>
                            <p>Your one-stop solution for all your coding metrics needs.</p>
                        </div>
                        <div >
                            <ScrollView />
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

    // Get username from cookie
    let username = getCookie('username', { req, res });
    if (!username) {
        username = false;
        // No username, no need to fetch leaderboard props
        return {
            props: {
                username,
            },
        };
    }

    // Fetch leaderboard props only if username exists
    const { props: leaderboardProps } = await import('./leaderboard').then(mod => mod.getServerSideProps(context));

    // Sanitize leaderboard data by replacing undefined scores with null
    const sanitizedLeaderboard = leaderboardProps.leaderboard.map(entry => ({
        ...entry,
        score: entry.score === undefined ? null : entry.score,
    }));
    updateQuestionsSolved();
    return {
        props: {
            username,
            leaderboard: sanitizedLeaderboard, // Pass sanitized leaderboard
        },
    };
}
