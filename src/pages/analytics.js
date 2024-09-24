import { useEffect, useState, useRef } from 'react';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
import clientPromise from "../../lib/mongodb";
import LayoutAfterLogin from "../components/LayoutAfterLogin";

Chart.register(PieController, ArcElement, Tooltip, Legend);

export async function getServerSideProps(context) {
    const client = await clientPromise;
    const db = client.db('Users');
    const users = await db.collection('Profiles').find({}).sort({ t_norm: -1 }).toArray();

    // Handle users that don't have `t_norm` or `Username` properly
    const data = users
        .filter(user => user.Username && user.t_norm !== undefined)
        .map((user) => ({
            name: user.Username,
            score: user.t_norm,
        }));

    return {
        props: {
            data,
        },
    };
}

export default function HomePage({ data }) {
    const [chartData, setChartData] = useState(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (data && data.length > 0) {
            const labels = data.map(user => user.name);
            const scores = data.map(user => user.score);

            setChartData({
                labels,
                datasets: [{
                    data: scores,
                    backgroundColor: generateColors(labels.length),
                }],
            });
        }
    }, [data]);

    const generateColors = (length) => {
        const colors = [];
        for (let i = 0; i < length; i++) {
            const color = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`;
            colors.push(color);
        }
        return colors;
    };

    useEffect(() => {
        if (chartData) {
            const ctx = document.getElementById('myPieChart')?.getContext('2d');
            
            // Ensure canvas exists before drawing the chart
            if (ctx) {
                if (chartInstance.current) {
                    chartInstance.current.destroy(); // Destroy previous chart instance
                }

                chartInstance.current = new Chart(ctx, {
                    type: 'pie',
                    data: chartData,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'right',
                            },
                            tooltip: {
                                enabled: true,
                            },
                        },
                    },
                });
            }
        }
    }, [chartData]);

    return (
        <LayoutAfterLogin pageTitle="Performance Analytics">
            <div className="container" style={{ width: '90%', height: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1>Performance Share by User</h1>
                {data && data.length > 0 ? (
                    <div style={{ display: 'flex', width: '50%', height: '100%', alignItems: 'flex-start', justifyContent: 'center' }}>
                        <canvas id="myPieChart"></canvas>
                    </div>
                ) : (
                    <p>No data available.</p>
                )}
            </div>
        </LayoutAfterLogin>
    );
}
