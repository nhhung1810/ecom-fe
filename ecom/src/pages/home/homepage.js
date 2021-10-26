import React from "react";
import { NavBar } from "../../components";
import { Link } from "react-router-dom";
import "./homepage.css"

const HomePage = props => {

    return (
        <div>
            <NavBar />
            <HomePageBody />
        </div>
    )
}

const HomePageBody = props => {
    return (
        <div className="home__body">
            <div className="home__body-container">
                <div className="home__body-main-image-container">
                <div className="home__body-image-text">OUTFIT OF THE WEEK</div>
                    <img
                        src={process.env.PUBLIC_URL + "images/home-1.jpg"}
                        alt="homepage"
                    />
                    <span className="home__main-button-position">
                        <Link to="/">
                            <button className="home__link-button home__bigger">Shop now</button>
                        </Link>
                    </span>
                </div>
                <HomeSubImage />
            </div>
        </div>
    )

}

const HomeSubImage = props => {
    let imageURL = [
        process.env.PUBLIC_URL + "images/home-2.jpg",
        process.env.PUBLIC_URL + "images/home-2.jpg",
        process.env.PUBLIC_URL + "images/home-2.jpg",
        process.env.PUBLIC_URL + "images/home-2.jpg"
    ]
    return (
        <div className="home__body-sub">
            <HomeSubImageCard image={imageURL[0]}>Men</HomeSubImageCard>
            <HomeSubImageCard image={imageURL[1]}>Men
            </HomeSubImageCard>
            <HomeSubImageCard image={imageURL[2]}>Men</HomeSubImageCard>
            <HomeSubImageCard image={imageURL[3]}>Men</HomeSubImageCard>
        </div>
    )
}


const HomeSubImageCard = (props) => {
    return (
        <div>
            <div className="home__body-image-container">
                <img alt="sub image" src={props.image} />
                <div className="home__sub-label">
                    <div className="home__sub-label-text">
                        {props.children}
                    </div>
                    <div className="home_sub-label-line" />
                </div>
                <span className="home__sub-button-position">
                    <Link to="/">
                        <button className="home__link-button">Shop now</button>
                    </Link>
                </span>
            </div>
        </div>
    )
}

export default HomePage;