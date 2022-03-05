import { useContext } from "react";
import MovieContext from "../context/MovieContext";
import "./home.scss";
const Home = (props) => {
  const { movie } = props;
  const { setSelectedMovie } = useContext(MovieContext);

  return (
    <div className="home">
      <ul className="home-list">
        {console.log(movie)}
        {movie &&
          movie.map((e, el) => {
            const {image, id, name} = e.show;
            
              return (
                <li onClick={() => setSelectedMovie(e)} key={id}>
                  <img
                    src={image.medium}
                    alt={name}
                  />
                  <span>{name}</span>
                </li>
              );
            
          })}
      </ul>
    </div>
  );
};

export default Home;
