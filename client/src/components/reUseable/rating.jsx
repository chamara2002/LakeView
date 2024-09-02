import styles from "./rating.module.css";

const Rating = ({ rating, totalRating }) => (
  <>
    <div className={styles.rating}>
      <div className={styles.stars}>
        {/* Render stars based on the rating */}
        {"★".repeat(Math.round(rating))}
        {"☆".repeat(5 - Math.round(rating))}
      </div>
    </div>
    <div className={styles.score}>{rating}</div>
  </>
);

export default Rating;
