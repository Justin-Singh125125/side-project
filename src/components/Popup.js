import React from "react";

//photos


const Popup = props => {
    return (
        <div className={props.openPopup ? "popup open" : "popup"} id="popup">
            <div className="popup__content">
                <a onClick={props.handlePopup} href="#section-portfolio" className="popup__close">&times;</a>


                <div onClick={props.handleIsCredit} className={props.isCredit ? "popup__box popup__box--credit popup__box--active" : "popup__box popup__box--credit"}>
                    Credit
                </div>

                <div onClick={props.handleIsCredit} className={!props.isCredit ? "popup__box popup__box--debit popup__box--active" : "popup__box popup__box--debit"}>
                    Debit
                </div>

                <div className="popup__card-name">
                    <label className="popup__balance-name" htmlFor="">Card Name</label>
                    <input onChange={props.handleInputChange} value={props.cardName} name="cardName" className="popup__balance" type="text" />
                </div>
                <div className="popup__number">
                    <label className="popup__balance-name" htmlFor="">Enter Balance $</label>
                    <input onChange={props.handleInputChange} value={props.cardBalance} name="cardBalance" className="popup__balance" type="number" placeholder="2.00" />

                </div>

                <button onClick={props.handleCreateCard} className="popup__create">Create</button>
            </div>


        </div>

    )
}

export default Popup;