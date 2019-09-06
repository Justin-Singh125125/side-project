import React from "react";

const Navbar = props => {
    return (
        <div className="navbar">
            <button className="navbar__btn navbar__btn--delete">Delete a Card</button>
            <button className="navbar__btn navbar__btn--add">Add a Card</button>

            <span className="navbar__name">{props.name}</span>
            <img class="navbar__img" src={props.img} alt="User Photo" />
        </div>
    )
}

export default Navbar;