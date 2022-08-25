import React from "react";

export function Banner() {
    return (
        <div className="banner">
            <div className='bannerLeft'>
                <h1><span>Stan Smith</span>, Forever!</h1>
            </div>
            <div>
                <img src="img/banner.jpg" alt="banner-img"/>
            </div>
        </div>
    );
}