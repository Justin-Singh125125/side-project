import React from "react";
import { db } from "../../firebase/config";

import Navbar from "../../components/Navbar";
import Popup from "../../components/Popup";
import Card from "../../components/Card";

import Grid from "../../layouts/Grid";
import { generateKeyPair } from "crypto";
class Home extends React.Component {

    state = {
        name: "",
        photo: "",

        isDropdownOn: false,
        openPopup: false,
        isCredit: false,

        cardBalance: 0,
        cardName: 0,

        cardData: [],

        creditCardData: [],
        debitCardData: []
    }

    componentDidMount() {

        this.handleCheckUser();
        this.handleGetUserData();
        this.handleGetCards();
    }

    handleCreateCard = () => {
        var isCredit = false;
        if (this.state.isCredit) {
            isCredit = true;
        }

        db.collection("cards").add({
            id: this.handleGenerateKey(),
            foreignKey: localStorage.getItem("id"),
            name: this.state.cardName,
            cardBalance: this.state.cardBalance,
            isCredit: isCredit
        }).then((data) => {

        })
        //close the popup
        this.handlePopup();
        this.handleGetCards();
    }

    handleCheckUser = () => {
        if (!localStorage.getItem("id")) {
            this.props.history.push("/");
        }
    }
    handleLogout = () => {
        localStorage.clear();
        this.props.history.push("/")
    }
    handleGetUserData = () => {
        const id = localStorage.getItem("id");
        console.log(id);


        db.collection("users").where("id", "==", id).get().then((querySnapshot) => {
            console.log(querySnapshot.docs[0].data());
            this.setState({
                name: querySnapshot.docs[0].data().name,
                img: querySnapshot.docs[0].data().photo
            })

        })
    }

    handleGetCards = () => {
        db.collection("cards").where("foreignKey", "==", localStorage.getItem("id")).get().then((querySnapshot) => {

            var creditCardData = [];
            var debitCardData = [];
            querySnapshot.docs.forEach(d => {


                if (d.data().isCredit) {
                    creditCardData.push(d.data());
                }
                else {
                    debitCardData.push(d.data())
                }
            })
            this.setState({
                creditCardData: creditCardData,
                debitCardData: debitCardData

            })
            console.log(this.state.cardData)

        })
    }

    handleIsDropDownOn = () => {
        console.log(this.state.isDropdownOn)
        if (this.state.isDropdownOn) {
            this.setState({ isDropdownOn: false });
        }
        else {
            this.setState({ isDropdownOn: true });
        }

    }


    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        let value = event.target.value;
        const name = event.target.name;

        // Updating the input's state
        this.setState({
            [name]: value
        });
    };
    handleIsCredit = () => {
        if (this.state.isCredit) {
            this.setState({ isCredit: false });
        }
        else {
            this.setState({ isCredit: true })
        }
    }



    handlePopup = () => {
        console.log(this.state.openPopup)
        if (this.state.openPopup) {
            this.setState({ openPopup: false })
        }
        else {
            this.setState({ openPopup: true })
        }
    }


    handleGenerateKey = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    render() {
        return (
            <div>
                <Navbar
                    name={this.state.name}
                    img={this.state.img}
                    isDropdownOn={this.state.isDropdownOn}
                    handleIsDropDownOn={this.handleIsDropDownOn}
                    handleLogout={this.handleLogout}
                    handlePopup={this.handlePopup}
                />

                <Grid>
                    <section className="section-card">
                        {this.state.creditCardData.map((d) => (

                            <Card
                                key={d.id}
                                id={d.id}
                                name={d.name}
                                isCredit={d.isCredit}
                                cardBalance={d.cardBalance}
                            />

                        ))}

                        {this.state.debitCardData.map((d) => (

                            <Card
                                key={d.id}
                                id={d.id}
                                name={d.name}
                                isCredit={d.isCredit}
                                cardBalance={d.cardBalance}
                            />

                        ))}
                    </section>

                </Grid>

                <Popup
                    openPopup={this.state.openPopup}
                    isCredit={this.state.isCredit}
                    cardBalance={this.state.cardBalance}
                    cardName={this.state.cardName}
                    handlePopup={this.handlePopup}
                    handleIsCredit={this.handleIsCredit}
                    handleInputChange={this.handleInputChange}
                    handleCreateCard={this.handleCreateCard}
                />
            </div>
        );
    }
}

export default Home;