import { useEffect, useState, useRef } from 'react'; // Added useRef import
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
import clientPromise from "../../lib/mongodb";
import LayoutAfterLogin from "../components/LayoutAfterLogin";


Chart.register(PieController, ArcElement, Tooltip, Legend);

export async function getServerSideProps(context) {
    const client = await clientPromise;
    const db = client.db('Users');
    const users = await db.collection('Profiles').find({}).sort({ t_norm: -1 }).toArray();
    const data = users.map((user) => ({
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
  const chartInstance = useRef(null); // Store the chart instance

  useEffect(() => {
    if (data) {
      // Prepare labels (usernames) and data (scores) for the pie chart
      const labels = data.map(user => user.name); // Fixed this line
      const scores = data.map(user => user.score); // Fixed this line

      // Set the chart data
      setChartData({
        labels, // These labels will appear in the legend
        datasets: [{
          data: scores,
          backgroundColor: generateColors(labels.length),
        }],
      });
    }
  }, [data]); // Added data as dependency to useEffect

  // Function to generate random colors for the pie chart
  const generateColors = (length) => {
    const colors = [];
    for (let i = 0; i < length; i++) {
      const color = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`;
      colors.push(color);
    }
    return colors;
  };

  // Initialize the chart when chartData is available
  useEffect(() => {
    if (chartData) {
      const ctx = document.getElementById('myPieChart').getContext('2d');

      // Destroy the previous chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create a new chart and store its reference
      chartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false, // Allows for resizing the chart
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
  }, [chartData]); // Added chartData as a dependency to useEffect

  return (
    <LayoutAfterLogin pageTitle="LeaderBoard">
      <div className="container" style={{ width: '90%', height: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>Performance Share by User</h1>
        <div style={{ display: 'flex', width: '50%', height: '100%', alignItems: 'flex-start', justifyContent: 'center' }}> 
          <canvas id="myPieChart"></canvas>
        </div>
      </div>
    </LayoutAfterLogin>
  );
  
}
