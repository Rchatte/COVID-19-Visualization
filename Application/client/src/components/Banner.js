import React, { useState,useEffect } from 'react'
import "./Banner.css"

function Banner({image}) {






    return (
        <header className="banner"
            style={{
                backgroundSize:"cover",
                backgroundImage: `url(
                    "${image}"
                )`,
                backgroundPosition:"center center",
            }}
        >

<div className="banner__contents">
                <h1 className="banner__title">
                    {/* some apis give you inconsistent content,
                    so if movie title doesnt exist tserach .name ... */}
                    {"hello"}
                </h1>
                <div className="banner__buttons">
                    <button className="banner__button">play</button>
                    <button className="banner__button">my list</button>

                </div>
                <h1 className="banner__description">
                    {/* movie?.overview */}
                    {"hello jkfjdlskjflkdsfjdlskfjdlks"}
                </h1>

            </div>

        <div className="banner--fadeBottom"/>
        </header>
    )
}

export default Banner
