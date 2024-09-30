import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../foodManagement/context/authContext";

const AvailableTimes = () => {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateSearchTerm, setDateSearchTerm] = useState(""); // New state for date search
  const [gameIdToUpdate, setGameIdToUpdate] = useState(null);
  const [newTimes, setNewTimes] = useState({});

  const { user } = useAuth();

  const fetchGames = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/games/games");
      setGames(response.data);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDateSearchChange = (event) => {
    setDateSearchTerm(event.target.value);
  };

  const filteredGames = games
    .filter((game) =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleTimeDelete = (gameId, time) => async () => {
    const updatedTimes = games
      .find((game) => game._id === gameId)
      .availableTimes.filter((t) => t !== time);

    setNewTimes((prevTimes) => ({
      ...prevTimes,
      [gameId]: updatedTimes,
    }));
    setGameIdToUpdate(gameId);
  };

  useEffect(() => {
    const updateGame = async () => {
      if (gameIdToUpdate && newTimes[gameIdToUpdate]) {
        try {
          const response = await axios.put(
            `http://localhost:3000/api/games/games/${gameIdToUpdate}`,
            { availableTimes: newTimes[gameIdToUpdate] }
          );
          console.log("Game updated successfully:", response.data);
        } catch (error) {
          console.error("There was an error updating the game:", error);
          console.error(
            "Error details:",
            error.response?.data || error.message
          );
        }
      }
    };

    updateGame();
    fetchGames();
  }, [newTimes, gameIdToUpdate]);

  return (
   <div>
     <div style={styles.pageContainer}>
     
     <div style={styles.content}>
       <div style={styles.header}>
       <h2 style={styles.title}><center>Available Times</center> </h2>
         <input
           type="text"
           placeholder="Search by game name"
           value={searchTerm}
           onChange={handleSearchChange}
           style={styles.searchInput}
         />
       </div>
       <div style={styles.tableContainer}>
         <table style={styles.table}>
           <thead>
             <tr>
               <th style={styles.tableHeader}>Game ID</th>
               <th style={styles.tableHeader}>Game Name</th>
               <th style={styles.tableHeader}>Available Time</th>
               <th style={styles.tableHeader}>Available Date</th>
               {user.user.role ? (
                 <th style={styles.tableHeader}>Action</th>
               ) : (
                 <></>
               )}
             </tr>
           </thead>
           <tbody>
             {filteredGames.length > 0 ? (
               filteredGames.map((game) =>
                 game.availableTimes.map((time, index) => (
                   <tr key={`${game._id}-${index}`} style={styles.tableRow}>
                     <td style={styles.tableCell}>{"GID" + game._id.slice(-4)}</td>
                     <td style={styles.tableCell}>{game.name}</td>
                     <td style={styles.tableCell}>
                       {new Date(time).toLocaleTimeString([], {
                         hour: "2-digit",
                         minute: "2-digit",
                       })}
                     </td>
                     <td style={styles.tableCell}>
                       {new Date(time).toLocaleDateString()}
                     </td>
                     {user.user.role ? (
                       <td style={styles.tableCell}>
                         <button
                           style={styles.deleteButton}
                           onClick={handleTimeDelete(game._id, time)}
                         >
                           Delete
                         </button>
                       </td>
                     ) : (
                       <></>
                     )}
                   </tr>
                 ))
               )
             ) : (
               <tr style={styles.tableRow}>
                 <td style={styles.tableCell} colSpan="5">
                   No games available
                 </td>
               </tr>
             )}
           </tbody>
         </table>
       </div>
     </div>
   </div>
   </div>
  );
};

const styles = {
  title: {
    color: "#fff",
    padding: "10px",
  },
  pageContainer: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#161E38",
    color: "#fff",
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#1B2138",
    padding: "20px",
  },
  sidebarMenu: {
    listStyleType: "none",
    padding: 0,
  },
  sidebarMenuItem: {
    padding: "10px 20px",
    color: "#fff",
    cursor: "pointer",
  },
  sidebarMenuItemActive: {
    padding: "10px 20px",
    color: "#FFD700",
    cursor: "pointer",
    backgroundColor: "#1E2749",
    borderRadius: "5px",
  },
  content: {
    flex: 1,
    padding: "20px",
  },
  header: {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  searchInput: {
    marginBottom: "10px",
    padding: "10px",
    width: "40%",
    borderRadius: "5px",
    border: "1px solid #2C3354",
    backgroundColor: "#243055",
    color: "#fff",
  },
  tableContainer: {
    backgroundColor: "#1E2749",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
  },
  table: {
    width: "100%",
    maxWidth: "1200px", 
    borderCollapse: "collapse",
  },
  tableHeader: {
    padding: "12px",  
    backgroundColor: "#2E3A59",  
    color: "#fff",
    textAlign: "left",
    borderBottom: "1px solid #444",  
  },
  tableRow: {
    borderBottom: "1px solid #444",  
  },
  tableCell: {
    padding: "12px",
    textAlign: "left",  
    borderBottom: "1px solid #444",  
  },
  deleteButton: {
    backgroundColor: "#FF6347",  
    color: "#fff",
    border: "none",
    padding: "6px 12px",  
    borderRadius: "4px",  
    cursor: "pointer",
  },
};



export default AvailableTimes;
