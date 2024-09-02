// src/components/ActivitiesGrid.jsx
import React from "react";
import ActivityCard from "./ActivityCard";
import styles from "./ActivitiesGrid.module.css";

const ActivitiesGrid = ({activities}) => {
  console.log(activities );
  return (
    <div className={styles.gridContainer}>
      {activities.length > 0 ? (
        activities.map((activity) => (
          <ActivityCard
            key={activity._id} // Use a unique identifier for keys
            image={activity.image} // Assuming images is an array
            title={activity.name}
            activity={activity}
          />
        ))
      ) : (
        <p>No activities found</p>
      )}
    </div>
  );
};

export default ActivitiesGrid;
