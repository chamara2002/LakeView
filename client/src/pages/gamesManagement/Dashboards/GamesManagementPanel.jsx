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
        backgroundColor: '#161E38',
    };

    const sidebarStyle = {
        width: '250px',
        backgroundColor: '#1d284c',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    };

    // Default button style
    const buttonStyle = {
        backgroundColor: '#fff', // Dark teal
        border: 'none',
        color: '#000000',
        padding: '10px 20px',
        margin: '10px 0',
        borderRadius: '5px',
        cursor: 'pointer',
        textAlign: 'left',
    };

    // Active button style override
    const activeButtonStyle = {
        backgroundColor: '#FFD700', // Yellow color for the active page
        color: '#000', // Black text
    };

    const contentStyle = {
        flex: 1,
        padding: '20px',
        backgroundColor: '#ffffff',
        overflowY: 'auto',
    };

    return (
        <div style={containerStyle}>
            <div style={sidebarStyle}>
                <button
                    style={activePage === 'AddGames' ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                    onClick={() => setActivePage('AddGames')}
                >
                    Add Games
                </button>
                <button
                    style={activePage === 'GamesDetails' ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                    onClick={() => setActivePage('GamesDetails')}
                >
                    Games Details
                </button>
                <button
                    style={activePage === 'AvailableTimes' ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                    onClick={() => setActivePage('AvailableTimes')}
                >
                    Available Times
                </button>
                <button
                    style={activePage === 'FeedbackDetails' ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                    onClick={() => setActivePage('FeedbackDetails')}
                >
                    Feedback Details
                </button>
            </div>
            <div style={contentStyle}>
                {renderActivePage()}
            </div>
        </div>
    );
};

export default GameUpdate;
