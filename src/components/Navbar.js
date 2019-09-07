import React from "react";

const Navbar = props => {
    return (
        <div className="navbar">
            <button className="navbar__btn navbar__btn--delete">Delete a Card</button>
            <button onClick={props.handlePopup} className="navbar__btn navbar__btn--add">Add a Card</button>

            <span className="navbar__name">Hello {props.name}</span>

            <div className="navbar__user" >
                <img onClick={props.handleIsDropDownOn} class="navbar__img" src={props.img} alt="User Photo" />
                <button onClick={props.handleLogout} className={props.isDropdownOn ? "navbar__logout navbar__logout__dropdown" : "navbar__logout"}>Logout</button>
            </div>

        </div>
    )
}

export default Navbar;