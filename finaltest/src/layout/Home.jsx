import "./Home.css";
import axios from "axios";
import { IoReorderThree } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import { Carousel, Modal } from "antd";
import { useEffect, useState } from "react";

function Home() {
  const [isDisplay, setIsDisplay] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const showBox = (movie) => {
    setSelectedCard(movie);
    setIsDisplay(true);
  };
  const handleCancel = () => {
    setIsDisplay(!isDisplay);
  };

  const [movieData, setMovieData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/movies");
      setMovieData(response.data); // set movie data array
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  // call api only once when component mounts
  useEffect(() => {
    fetchData();
    console.log(movieData);
  }, []);

  const contentStyle = {
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
    flexDirection: "column",
    height: "350px",
  };

  const imageStyle = {
    width: "100%",
  };
  return (
    <div className="container">
      <Modal
        title={selectedCard ? selectedCard.name : ""}
        visible={isDisplay}
        onCancel={handleCancel}
      >
        {selectedCard && (
          <div>
            <img
              src={selectedCard.image}
              alt={selectedCard.name}
              style={{ width: "100%" }}
            />
            <p>{selectedCard.introduce}</p>{" "}
            <p>
              <strong>Time:</strong> {selectedCard.time} min
            </p>
            <p>
              <strong>Year:</strong> {selectedCard.year}
            </p>
          </div>
        )}
      </Modal>
      <div className="movie-section-container">
        <br />
        <div className="header-section">
          <button className="menu-btn">
            <IoReorderThree />
          </button>
          <h2>MovieUI</h2>
          <button className="search-btn">
            <IoSearchSharp />
          </button>
        </div>
        <hr />
        <div className="popular-movies">
          <br />
          <h3>Most Popular Movies</h3>
          <br />
          <div className="content">
            <Carousel
              arrows
              infinite={true}
              draggable={true}
              slidesToShow={4}
              slidesToScroll={1}
            >
              {/* mapping movie data */}
              {movieData.map((movie, index) => (
                <div
                  className="option"
                  key={index}
                  style={contentStyle}
                  onClick={() => showBox(movie)}
                >
                  <div className="movie-image">
                    <img style={imageStyle} src={movie.image} />
                  </div>
                  <p className="name-movie">{movie.name}</p>
                  <p className="time">
                    {movie.time} min {movie.year}
                  </p>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
