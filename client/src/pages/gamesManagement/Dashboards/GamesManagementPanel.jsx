import React, { useState } from 'react';
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

    // Inline styles
    const containerStyle = {
        display: 'flex',
        height: '100vh',
        backgroundColor: '#161E38', // Light gray background

    };

    const sidebarStyle = {
        width: '250px',
        backgroundColor: '#00796b', // Teal background
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    };

    const buttonStyle = {
        backgroundColor: '#004d40', // Darker teal
        border: 'none',
        color: '#fff',
        padding: '10px 20px',
        margin: '10px 0',
        borderRadius: '5px',
        cursor: 'pointer',
        textAlign: 'left',
    };

    const contentStyle = {
        flex: 1,
        padding: '20px',
        backgroundColor: '#ffffff', // White background
        overflowY: 'auto',
    };

    return (
        <div style={containerStyle}>
            <div style={sidebarStyle}>
                <button style={buttonStyle} onClick={() => setActivePage('AddGames')}>Add Games</button>
                <button style={buttonStyle} onClick={() => setActivePage('GamesDetails')}>Games Details</button>
                <button style={buttonStyle} onClick={() => setActivePage('AvailableTimes')}>Available Times</button>
                <button style={buttonStyle} onClick={() => setActivePage('ChangeAvailableTimes')}>Change Available Times</button>
                <button style={buttonStyle} onClick={() => setActivePage('FeedbackDetails')}>Feedback Details</button>
            </div>
            <div style={contentStyle}>
                {renderActivePage()}
            </div>
        </div>
    );
};

export default GameUpdate;
