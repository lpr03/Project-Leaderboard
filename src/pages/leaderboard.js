import clientPromise from "../../lib/mongodb";
import LayoutAfterLogin from "../components/LayoutAfterLogin";

export async function getServerSideProps(context) {
    const client = await clientPromise;
    const db = client.db('Users');
    
    // Ensure username is defined or fallback to an empty string
    const username = context.req.cookies.username || '';

    // Fetch users and sort by t_norm, check for missing fields
    const users = await db.collection('Profiles').find({}).sort({ t_norm: -1 }).toArray();

    // Map the leaderboard data, filter out any undefined or missing fields
    const leaderboard = users.map((user, index) => {
        if (!user.Username || user.t_norm === undefined) {
            return null; // Skip if fields are missing
        }
        return {
            name: user.Username,
            score: user.t_norm,
            rank: index + 1,
            isCurrentUser: user.Username === username,
        };
    }).filter(Boolean); // Remove null entries from leaderboard

    return {
        props: {
            leaderboard,
        },
    };
}

export default function Leaderboard({ leaderboard }) {
    return (
        <LayoutAfterLogin pageTitle="LeaderBoard">
            <div className="container">
                <h3>Leaderboard</h3>
                {/* Check if leaderboard exists and has entries */}
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
                            {leaderboard.map(({ rank, name, score, isCurrentUser }) => (
                                <tr key={rank} className={isCurrentUser ? "currentUserRow" : (rank % 2 === 0 ? "evenRow" : "oddRow")}>
                                    <td>{rank}</td>
                                    <td>{name}</td>
                                    <td>{score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No data available.</p>
                )}
            </div>
        </LayoutAfterLogin>
    );
}
