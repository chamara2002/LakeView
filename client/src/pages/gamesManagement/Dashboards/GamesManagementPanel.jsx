import React, { useState } from 'react';
import NavBar from "../../../components/core/NavBar";
import Footer from "../../../components/core/Footer";
import AddGames from './AddGames';
import GameDetails from '../Gamedetails';
import AvailableTimes from './AvailableTimes';
import ChangeAvailableTimes from './ChangeAvailableTimes';
import FeedbackDetails from './FeedbackDetails';

const GameUpdate = () => {
    const [activePage, setActivePage] = useState('AddGames');

    const renderActivePage = () => {
        switch (activePage) {
            case 'GamesDetails':
                return <GameDetails />;
            case 'AvailableTimes':
                return <AvailableTimes />;
            case 'ChangeAvailableTimes':
                return <ChangeAvailableTimes />;
            case 'FeedbackDetails':
                return <FeedbackDetails />;
            default:
                return <AddGames />;
        }
    };

    return (
        <>
            <NavBar name="game-update" />
            <div style={styles.container}>
                <div style={styles.sidebar}>
                    <h2 style={styles.sidebarTitle}>Pages</h2>
                    <div style={styles.buttonList}>
                        <button
                            style={activePage === 'AddGames' ? { ...styles.button, ...styles.activeButton } : styles.button}
                            onClick={() => setActivePage('AddGames')}
                        >
                            Add Games
                        </button>
                        <button
                            style={activePage === 'GamesDetails' ? { ...styles.button, ...styles.activeButton } : styles.button}
                            onClick={() => setActivePage('GamesDetails')}
                        >
                            Games Details
                        </button>
                        <button
                            style={activePage === 'AvailableTimes' ? { ...styles.button, ...styles.activeButton } : styles.button}
                            onClick={() => setActivePage('AvailableTimes')}
                        >
                            Available Times
                        </button>
                        <button
                            style={activePage === 'FeedbackDetails' ? { ...styles.button, ...styles.activeButton } : styles.button}
                            onClick={() => setActivePage('FeedbackDetails')}
                        >
                            Feedback Details
                        </button>
                    </div>
                </div>
                <div style={styles.mainContent}>
                    {renderActivePage()}
                </div>
            </div>
            <Footer />
        </>
    );
};

// Styles adapted from EventDashboard
const styles = {
    container: {
        display: 'flex',
        height: 'calc(100vh - 60px)', // Adjusted for NavBar height
        backgroundColor: '#0a1e42',
        color: '#fff',
        padding: '10px',
    },
    sidebar: {
        width: '20%',
        backgroundColor: '#1a2b57',
        padding: '20px',
        borderRadius: '8px',
    },
    sidebarTitle: {
        marginBottom: '20px',
        fontSize: '18px',
        fontWeight: 'bold',
    },
    buttonList: {
        display: 'flex',
        flexDirection: 'column',
    },
    button: {
        backgroundColor: '#fff',
        border: 'none',
        color: '#000',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
        textAlign: 'left',
    },
    activeButton: {
        backgroundColor: '#FFD700',
        color: '#000',
    },
    mainContent: {
        flex: 1,
        padding: '20px',
        backgroundColor: '#ffffff',
        overflowY: 'auto',
    },
};

export default GameUpdate;
