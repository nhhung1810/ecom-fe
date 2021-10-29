import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory} from "react-router-dom";

import { selectAuthUser } from "../../redux/auth.redux";

import "./navbar.css"
import { DropCard } from "./navbar.dropcard";
import { AuthenticatedGroup, UnauthenticatedGroup } from "./navbar.authenticate.group";
import { searchProduct } from "../../api/product.api";
import { formatFirstCtg } from "../../utilities/product.list.utils";
import { MAIN_CATEGORIES_LIST } from "../../const/options.list.const";


export const NavBar = props => {
    return (
        <div className="navbar__container">
            <div className="navbar__header">
                <SearchBar />
                <Link to="/">
                    <Logo />
                </Link>
                <RightTool />
            </div>
            <div className="navbar__footer">
                <div className="navbar__footer-dropcard-center">
                    <DropCard to="/product?ctg=men">Men</DropCard>
                    <DropCard to="/product?ctg=ladies">Ladies</DropCard>
                    <DropCard to="/product?ctg=girls">Girls</DropCard>
                    <DropCard to="/product?ctg=boys">Boys</DropCard>
                </div>
            </div>
        </div>
    )
}

const SearchBar = props => {
    const history = useHistory()
    const [search, setSearch] = useState("")

    const handleSearch = async e => {
        if(search.length === 0) return
        const response = await searchProduct(search)
        if(!response) return
        if(!response.data.id) return

        let mainCtg = response.data.categories
        let mainCtgParam = ""
        if(MAIN_CATEGORIES_LIST.findIndex(e => e.value === mainCtg[0]) !== -1)
            mainCtgParam = mainCtg[0]
        else if(MAIN_CATEGORIES_LIST.findIndex(e => e.value === mainCtg[1]) !== -1)
            mainCtgParam = mainCtg[1]

        let query = {
            id : response.data.id,
            mc : mainCtgParam
        }
        let param = new URLSearchParams(query)
        console.log(param.toString())
        history.push("/info?" + param.toString())
    }
    
    return (
        <span className="navbar__search-container">
            <img
                onClick={handleSearch}
                src={process.env.PUBLIC_URL + "/images/search.svg"}
                className="navbar__search-icon"
                alt="search icon"></img>
            <input onChange={e => setSearch(e.target.value)} type="text" className="navbar__searchbar" placeholder="Search"></input>
        </span>
    )
}

const Logo = props => {
    return (
        <img
            className="navbar__logo"
            src={process.env.PUBLIC_URL + "/images/logo.svg"}
            alt="logo">
        </img>
    )
}

const RightTool = props => {
    let user = useSelector(selectAuthUser);
    return (
        <span className="navbar__right-align">
            {
                user === null ?
                    <UnauthenticatedGroup />
                    :
                    <AuthenticatedGroup />
            }
        </span>
    )
}
