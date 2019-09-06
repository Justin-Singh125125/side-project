import React from "react";
import Navbar from "../../components/Navbar";
import { db } from "../../firebase/config";

class Home extends React.Component {

    state = {
        name: "",
        photo: "",
    }

    componentDidMount() {

        this.handleCheckUser();
        this.handleGetUserData();
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

    render() {
        return (
            <div>
                <Navbar
                    name={this.state.name}
                    img={this.state.img}
                />
            </div>
        );
    }
}

export default Home;