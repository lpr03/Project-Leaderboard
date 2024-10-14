import { useState, useEffect } from 'react';
import clientPromise from '../../lib/mongodb';
import LayoutAfterLogin from '../components/LayoutAfterLogin';

// List of all colleges to be displayed
const allColleges = [
    "Vignana Bharathi Institute of Technology",
    "Anurag University",
    "Nalla Malla Reddy Engineering College",
    "Nalla Narasimha Reddy College of Engineering",
    "ACE Engineering College",
    "Sreenidhi Institute of Science and Technology",
    "Aurora's Technological and Management Academy",
    "Kommuri Pratap Reddy Institute of Technology",
    "Megha Institute of Engineering and Technology for Women",
    "Princeton College of Engineering and Technology",
];

export async function getServerSideProps() {
    const client = await clientPromise;
    const db = client.db('Users');

    const collegesData = await db.collection('Profiles').aggregate([
        {
            $group: {
                _id: "$College",
                userCount: { $sum: 1 },
            },
        },
    ]).toArray();

    const collegeMap = new Map(
        collegesData.map((college) => [college._id, college.userCount])
    );

    const collegeList = allColleges.map((college) => ({
        name: college,
        count: collegeMap.get(college) || 0,
    }));

    // Calculate user count for colleges not found in the predefined list
    const otherCount = [...collegesData].reduce((total, college) => {
        if (!allColleges.includes(college._id)) {
            return total + college.userCount;
        }
        return total;
    }, 0);

    if (otherCount > 0) {
        collegeList.push({
            name: 'Other',
            count: otherCount,
        });
    }

    return {
        props: {
            collegeList,
        },
    };
}

export default function CollegeUsersPage({ collegeList }) {
    const [selectedCollege, setSelectedCollege] = useState(allColleges[0]); // Default to the first college
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        const collegeData = collegeList.find(college => college.name === selectedCollege);
        if (collegeData) {
            setUserCount(collegeData.count);
        }
    }, [selectedCollege, collegeList]);

    return (
        <LayoutAfterLogin pageTitle="College-wise User Count">
            <div className="container">
            <h3>User Count for all the colleges</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>College Name</th>
                            <th>User Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {collegeList.map((college, index) => (
                            <tr
                                key={index}
                                className={index % 2 === 0 ? 'evenRow' : 'oddRow'}
                            >
                                <td>{college.name}</td>
                                <td>{college.count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </LayoutAfterLogin>
    );
}
