import { useContext, useState } from "react";
import MovieContext from "../context/MovieContext";
import "./movie.scss";
import backIcon from "../Assets/arrow-back.png";
import icon from "../Assets/play-icon.png";
import closeIcon from "../Assets/close-icon.png";
const Movie = (props) => {
  const { selectedMovie, setSelectedMovie } = useContext(MovieContext);
  const [booked, setBooked] = useState(null);
  const {name, summary, genres, language, runtime,premiered,image, schedule} = selectedMovie.show;
 
  const handleSubmit = (e) =>{
    e.preventDefault()
    const ticket = {
      name: e.target.name.value,
      email: e.target.email.value,
      number: e.target.number.value,
      on: schedule.days[0],
      at: schedule.time
    }
     const data = JSON.parse(localStorage.getItem("booked"))
     if(data){
        const newdata = [...data, ticket]
        localStorage.setItem("booked", JSON.stringify(newdata)) 
     }else{
       localStorage.setItem("booked", JSON.stringify([ticket]))
     }
  }
  return (
    <div className="movie">
        <div className="movie-head">
          {!booked && (
            <span
              className="movie-head-close"
              onClick={() => setSelectedMovie(null)}
            >
              <img src={backIcon} alt="close" />
            </span>
          )}
          <div className="movie-head-text">
            <div className="movie-head-text-name">
              {name}
            </div>
            <div className="movie-head-text-synopsis" dangerouslySetInnerHTML={{__html: summary}}/>
              
            <div className="movie-head-text-genra">
              <span>Genre:</span>{" "}
              {genres.map((e) => {
                return e + ", ";
              })}
            </div>
            <div className="movie-head-text-genra">
              <span>Scheduled:</span>{" "}
              
                {schedule.time ? <span> {schedule.days} at: {schedule.time}</span> : <span>No Slot Found</span>}
             
            </div>
            <div className="movie-head-text-director">
              <span>Language:</span>{" "}
              {language}
            </div>
            <div className="movie-head-text-cast">
              <span>Time:</span> {runtime} Min
            </div>
            <div className="movie-head-text-advisory">
              Release Date: {premiered}
            </div>
            {schedule.time ?
            <span
              className="movie-head-text-trailer"
             onClick={()=>setBooked(true)}>
              <img src={icon} alt="icon" /> Book Ticket
            </span> : <span
              className="movie-head-text-trailer">
                No Show Available</span>}
          </div>
          <div className="movie-head-image">
            <img
              src={image.original}
              alt="movie poster"
            />
          </div>
        </div>
      
      {booked && (
        <div className="movie-trailer">
          <span>
            <img src={closeIcon} alt="close" onClick={() => setBooked(null)} />
          </span>
          <div className="movie-trailer-container">
            <h2>Book Your Ticket</h2>
            <form onSubmit={handleSubmit}>
              <div><label>Show Name:</label> {name}</div>
              <div><label>Slot Avalable On:</label> {schedule.days} at: {schedule.time}</div>
              <div><label>Name:</label><input type="text" id="name" placeholder="Enter your Name" required/></div> 
              <div><label>Email:</label><input type="email" id="email" placeholder="Enter your Email" required/></div> 
              <div>
                <label>Quantity:</label>
                <select id="number">
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                </select>
              </div>
              <button>Book Ticket</button> 
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;
