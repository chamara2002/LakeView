import React, { Component } from "react";
import styles from "./detailSection.module.css";

export default class DetailSection extends Component {
  render() {
    // Destructure props from this.props
    const { name, description, price, availableDays, availableTimes } =
      this.props;

    return (
      <div className={styles.details_parent}>
        <h2 className={styles.Topic}>{name}</h2>
        <p style={{ color: "white" }}>{description}</p>
        <h2 className={styles.Topic}>Price</h2>
        <p className={styles.sub}>{price}</p>
        <h2 className={styles.Topic}>Available Days</h2>
        {/* Render availableDays as a list */}
        <ul className={styles.sub}>
          {Array.isArray(availableDays) && availableDays.length > 0 ? (
            availableDays.map((day, index) => <li key={index}>{day}</li>)
          ) : (
            <li>No days available</li>
          )}
        </ul>
        <h2 className={styles.Topic}>Available Times</h2>
        {/* Render availableTimes as a list */}
        <ul className={styles.sub}>
          {Array.isArray(availableTimes) && availableTimes.length > 0 ? (
            availableTimes.map((time, index) => <li key={index}>{time}</li>)
          ) : (
            <li>No times available</li>
          )}
        </ul>
      </div>
    );
  }
}
