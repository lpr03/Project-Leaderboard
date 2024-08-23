// pages/leaderboard.js
import clientPromise from "../../lib/mongodb";
import LayoutAfterLogin from "../components/LayoutAfterLogin"

export async function getServerSideProps() {
    // const { db } = await clientPromise;
    const client = await clientPromise;
    const db = client.db('Users');

    const users = await db.collection('Profiles').find({}).sort({ t_norm: -1 }).toArray();
    const leaderboard = users.map((user, index) => ({
        name: user.Username,
        score: user.t_norm,
        rank: index + 1,
    }));

    return {
        props: {
            leaderboard,
        },
    };
}

const Leaderboard = ({ leaderboard }) => {
    return (
        //<div>
        //    <h3>Leaderboard</h3>
        //    {leaderboard.length > 0 ? (
        //        <table>
        //            <thead>
        //                <tr>
        //                    <th>Rank</th>
        //                    <th>Name</th>
        //                    <th>Score</th>
        //                </tr>
        //            </thead>
        //            <tbody>
        //                {leaderboard.map(({ rank, name, score }) => (
        //                    <tr key={rank}>
        //                        <td>{rank}</td>
        //                        <td>{name}</td>
        //                        <td>{score}</td>
        //                    </tr>
        //                ))}
        //            </tbody>
        //        </table>
        //    ) : (
        //        <p>No data available.</p>
        //    )}
        //    </div>
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
                        {leaderboard.map(({ rank, name, score }) => (
                            <tr key={rank} className={rank % 2 === 0 ? "evenRow" : "oddRow"}>
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
    );
};

export default Leaderboard;