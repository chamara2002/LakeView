import React, { Component } from "react";

export default class MovieCard extends Component {

  handleClick = () => {
    const { movie, onNavigate } = this.props;
    onNavigate(movie._id);
  };
  render() {
    const { movie } = this.props;

    return (
      <div style={styles.movieCard} onClick={this.handleClick}>
        <div style={{height:150,width:200,overflow:"hidden"}}>
          <img src={movie.image} alt={movie.name} style={styles.movieImage} />
        </div>
        <p style={{marginTop:"80px"}}>{movie.name}</p>
      </div>
    );
  }
}

const styles = {
  movieCard: {
    textAlign: "center",
    backgroundColor: "#2d2d44",
    borderRadius: "10px",
    padding: "10px",
    height: "300px",
    margin:"20px",
    width: "200px",
  },
  movieImage: {
    width: "100%",
    borderRadius: "10px",
    overflow:"hidden",
  },
};
