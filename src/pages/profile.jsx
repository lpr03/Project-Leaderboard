import LayoutAfterLogin from '../components/LayoutAfterLogin';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import clientPromise from "../../lib/mongodb";
import { useEffect, useState, useRef } from 'react';
import { Chart, BarController, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

Chart.register(BarController, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function ProfilePage({ userdoc }) {
    const [isDate, setIsDate] = useState('');
    const [chartData, setChartData] = useState(null);
    const chartRef = useRef(null);

    const username = userdoc['Username'];
    const ltname = userdoc['Lt_username'];
    const gfgname = userdoc['GFG_username'];
    const ccname = userdoc['CC_username'];
    const ltsolved = userdoc['lc'];
    const gfgsolved = userdoc['gfg'];
    const ccsolved = userdoc['cc'];

    const created = userdoc['Created'];

    useEffect(() => {
        const utcDate = new Date(created);
        const options = { 
            timeZone: 'Asia/Kolkata', 
            weekday: 'long',
            year: 'numeric', 
            month: 'long',
            day: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric', 
            second: 'numeric' 
        };
        const formattedDate = utcDate.toLocaleString('en-GB', options);
        setIsDate(formattedDate);
    }, [created]);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            const data = {
                labels: ['LeetCode', 'GFG', 'CodeChef'],
                datasets: [
                    {
                        label: 'School',
                        data: [0, gfgsolved[0],0],
                        backgroundColor: 'rgb(255, 182, 153)',
                    },
                    {
                        label: 'Basic',
                        data: [0, gfgsolved[1],0],
                        backgroundColor: 'rgb(255, 145, 102)',
                    },
                    {
                        label: 'Easy',
                        data: [ltsolved[0], gfgsolved[2], 0],
                        backgroundColor: 'rgb(255, 91, 26)',
                    },
                    {
                        label: 'Medium',
                        data: [ltsolved[1], gfgsolved[3], ccsolved],
                        backgroundColor: 'rgb(204, 58, 0)',
                    },
                    {
                        label: 'Hard',
                        data: [ltsolved[2], gfgsolved[4], 0],
                        backgroundColor: 'rgb(153, 43, 0)',
                    },
                ],
            };

            if (chartData) {
                chartData.destroy();
            }

            const newChart = new Chart(ctx, {
                type: 'bar',
                data: data,
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            stacked: true,
                        },
                        y: {
                            stacked: true,
                            beginAtZero: true,
                        },
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                    },
                },
            });

            setChartData(newChart);
        }
    }, [ltsolved, gfgsolved, ccsolved]);

    return (
        <LayoutAfterLogin pageTitle="Profile">
            <button className='btn'>
                <Link style={{ color: 'white', textDecoration: 'none' }} href="/">Home</Link><br />
            </button>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div>
            <h2>{username}'s Profile</h2>
            <p><strong>Account created -</strong> {isDate}</p>
            
                    <table style={{ width: '150%', marginTop: '10px', borderCollapse: 'collapse' }}>
                        <tbody>
                            <tr>
                                <td style={{ padding: '8px' }}><strong>Leetcode UserID</strong></td>
                                <td style={{ padding: '8px' }}>{ltname}</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '8px' }}><strong>GFG UserID</strong></td>
                                <td style={{ padding: '8px' }}>{gfgname}</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '8px' }}><strong>CodeChef UserID</strong></td>
                                <td style={{ padding: '8px' }}>{ccname}</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '8px' }}><strong>Leetcode Problems Solved</strong></td>
                                <td style={{ padding: '8px' }}><strong>Easy:</strong> {ltsolved[0]}, <strong>Medium:</strong> {ltsolved[1]}, <strong>Hard:</strong> {ltsolved[2]}</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '8px' }}><strong>GFG Problems Solved</strong></td>
                                <td style={{ padding: '8px' }}><strong>School:</strong> {gfgsolved[0]}, <strong>Basic:</strong> {gfgsolved[1]}<br /><strong>Easy:</strong> {gfgsolved[2]}, <strong>Medium:</strong> {gfgsolved[3]}, <strong>Hard:</strong> {gfgsolved[4]}</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '8px' }}><strong>CodeChef Problems Solved</strong></td>
                                <td style={{ padding: '8px' }}>{ccsolved}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <canvas ref={chartRef} style={{  width: '400px', height: '400px' }}></canvas>
                </div>
            </div>
        </LayoutAfterLogin>
    );
}

export async function getServerSideProps(context) {
    const req = context.req;
    const res = context.res;
    const username = getCookie('username', { req, res });

    if (username === undefined) {
        return {
            redirect: {
                permanent: false,
                destination: "/"
            }
        };
    }

    const client = await clientPromise;
    const db = client.db("Users");
    const users = await db.collection("Profiles").find({ "Username": username }).toArray();

    const userdoc = users.length > 0 ? { ...users[0], _id: users[0]._id.toString() } : null;

    if (!userdoc) {
        return {
            notFound: true,
        };
    }

    return {
        props: { userdoc },
    };
}
