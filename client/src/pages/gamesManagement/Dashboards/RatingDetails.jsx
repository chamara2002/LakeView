import React from 'react';

const RatingDetails = () => {
    // Example data, replace this with your actual data source
    const ratings = [
        { id: 'G001', gameName: 'Game 1', rating: 4.5, numberOfReviews: 120 },
        { id: 'G002', gameName: 'Game 2', rating: 4.0, numberOfReviews: 98 },
        { id: 'G003', gameName: 'Game 3', rating: 4.8, numberOfReviews: 200 },
    ];

    return (
        <div className="rating-details">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Game Name</th>
                        <th>Rating</th>
                        <th>Number of Reviews</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {ratings.map((rating) => (
                        <tr key={rating.id}>
                            <td>{rating.id}</td>
                            <td>{rating.gameName}</td>
                            <td>{rating.rating}</td>
                            <td>{rating.numberOfReviews}</td>
                            <td><button className="delete-button">Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RatingDetails;
