// pages/index.js
"use client"
import clientPromise from "../../../lib/mongodb";
import { useEffect, useState } from 'react';
import axios from 'axios';

export async function getServerSideProps() {
    const client = await clientPromise;
    const db = client.db('Users');
    const user = await db.collection("Profiles").findOne({"Username": LTUsername});
    const lt_username = user ? user.username : '';

    return {
        props: { lt_username },
    };
}

export default function HomePage( lt_username ) {
    const [statsData, setStatsData] = useState(null);

    useEffect(() => {
        async function fetchStatsData() {
            try {
                const apiUrl = `https://leetcode-stats-api.herokuapp.com/`;
                const response = await axios.post(apiUrl, { lt_username });
                setStatsData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        }

        fetchStatsData();
    }, [lt_username]);

    return (
        <div className='m-10'>
            <h1 className='font-bold'>LeetCode Stats</h1>
            {statsData ? (
                <div>
                    <p>Total Solved: {statsData.totalSolved}</p>
                    <p>Easy Solved: {statsData.easySolved}</p>
                    <p>Medium Solved: {statsData.mediumSolved}</p>
                    <p>Hard Solved: {statsData.hardSolved}</p>
                    <p>Ranking: {statsData.ranking}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}