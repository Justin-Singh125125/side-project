import React from "react";

const Card = props => {

    console.log("card data", props.id)
    return (
        <div className="card">
            <h2 className="card__name">{props.isCredit ? `${props.name} Credit Card: $${props.cardBalance}` : `${props.name} Debit Card: $${props.cardBalance}`}</h2>
            <h2 className="card__history">History</h2>

            <div className="card__history-content">
                <ul>
                    <li>{true ? "+ $3.00" : ""}</li>
                </ul>
            </div>
        </div>
    )
}

export default Card;