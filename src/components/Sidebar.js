import { useState } from 'react';
import { useRouter } from 'next/router';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();

    return (
        <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <nav>
                <ul>
                    <li onClick={() => router.push('/analytics')}>
                        {collapsed ? (
                            <span>📊</span>
                        ) : (
                            <>
                                <span>📊</span>
                                <span>Analytics</span>
                            </>
                        )}
                    </li>
                    <li onClick={() => router.push('/leaderboard')}>
                        {collapsed ? (
                            <span>🏆</span>
                        ) : (
                            <>
                                <span>🏆</span>
                                <span>LeaderBoard</span>
                            </>
                        )}
                    </li>
                    <li onClick={() => router.push('/global')}>
                        {collapsed ? (
                            <span>🌍</span>
                        ) : (
                            <>
                                <span>🌍</span>
                                <span>Global</span>
                            </>
                        )}
                    </li>
                    <li onClick={() => router.push('/profile')}>
                        {collapsed ? (
                            <span>👤</span>
                        ) : (
                            <>
                                <span>👤</span>
                                <span>Profile</span>
                            </>
                        )}
                    </li>
                </ul>
            </nav>
            <div className="collapse-arrow" onClick={() => setCollapsed(!collapsed)}>
                {collapsed ? '➡️' : '⬅️'}
            </div>
        </div>
    );
};

export default Sidebar;
