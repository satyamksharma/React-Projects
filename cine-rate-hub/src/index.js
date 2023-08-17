import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import StarRating from "./StarRating";

function Test() {
    const [movieRating, setMovieRating] = React.useState(0);
    return (
        <div>
            <StarRating
                maxRating={10}
                color='green'
                onSetRating={setMovieRating}
            />
            <p>This Movie was Rated: {movieRating}</p>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
        {/* <StarRating
            maxRating={5}
            className='test'
            messages={["Terrible", "Bad", "Okay", "Good", "Great"]}
        /> */}
        {/* <Test /> */}
    </React.StrictMode>
);
