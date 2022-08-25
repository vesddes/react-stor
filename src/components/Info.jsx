import React from "react";
import {Link} from "react-router-dom";

const Info = ({image, title, description}) => {

    return (
        <div className="info">
            <img className="infoImg" width={70}  src={image} alt="emoji"/>
            <h2>{title}</h2>
            <p>{description}</p>
            <Link to="/react-store">
                <button className="greenBtn">
                    <img src="img/arrow.svg" alt="arrow"/>
                    Get back
                </button>
            </Link>
        </div>
    )
}

export default  Info;