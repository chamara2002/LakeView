import React, { useState } from 'react';
import NavBar from "../../../components/core/NavBar";
import Footer from "../../../components/core/Footer";
import AddGames from './AddGames';
import GameDetails from '../Gamedetails';
import AvailableTimes from './AvailableTimes';
import ChangeAvailableTimes from './ChangeAvailableTimes';
import FeedbackDetails from './FeedbackDetails';

const GameUpdate = () => {
    const [activePage, setActivePage] = useState('GamesDetails');

    const renderActivePage = () => {
        switch (activePage) {
            case 'AddGames':
                return <AddGames />;
            case 'AvailableTimes':
                return <AvailableTimes />;
            case 'ChangeAvailableTimes':
                return <ChangeAvailableTimes />;
            case 'FeedbackDetails':
                return <FeedbackDetails />;
            default:
                return <GameDetails />;
        }
    };

    return (
        <>
            <NavBar name="game-update" />
            <div style={styles.container}>
                <div style={styles.sidebar}>
                    <center>
                    <h2 style={styles.sidebarTitle}>Games</h2>
                    <h2 style={styles.sidebarTitle2}>Management Panel</h2>
                    </center>
                    <div style={styles.buttonList}>
                        <button
                            style={activePage === 'GamesDetails' ? { ...styles.button, ...styles.activeButton } : styles.button}
                            onClick={() => setActivePage('GamesDetails')}
                        >
                            Games Details
                        </button>
                        <button
                            style={activePage === 'AddGames' ? { ...styles.button, ...styles.activeButton } : styles.button}
                            onClick={() => setActivePage('AddGames')}
                        >
                            Add Games
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

const styles = {
    container: {
        display: 'flex',
        height: 'calc(100vh - 60px)',
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
        marginTop: '45px',
        marginBottom: '-10px',
        fontSize: '22px',
        fontWeight: 'bold',
        lineHeight: 1.2,
    },
    sidebarTitle2: {
        marginBottom: '80px',
        fontSize: '22px',
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
