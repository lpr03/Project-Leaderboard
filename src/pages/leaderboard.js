// pages/leaderboard.js
import { use } from "react";
import clientPromise from "../../lib/mongodb";
import LayoutAfterLogin from "../components/LayoutAfterLogin"

export async function getServerSideProps(context) {
    // const { db } = await clientPromise;
    const client = await clientPromise;
    const db = client.db('Users');
    const username = context.req.cookies.username;
    const users = await db.collection('Profiles').find({}).sort({ t_norm: -1 }).toArray();
    const leaderboard = users.map((user, index) => ({
        name: user.Username,
        score: user.t_norm,
        rank: index + 1,
        isCurrentUser: user.Username === username,
    }));

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
            {leaderboard.length > 0 ? (
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
};