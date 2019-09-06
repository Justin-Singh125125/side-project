import React from "react";

import { db, firebase } from "../../firebase/config";

class Home extends React.Component {

    componentDidMount() {
        console.log("test");
        // this.handleCreateUser();
        this.handleLoginUser();
    }

    handleCreateUser = () => {

    }
    handleLoginUser = () => {

        if (localStorage.getItem("id")) {
            console.log("loggedIn", localStorage.getItem("id"));
        }
        else {


            var provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then(function (result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;

                console.log(result);

                // console.log(result.)

                const id = result.user.uid;
                const name = result.user.displayName;
                const email = result.user.email;

                // db.collection("users").where("id", "==", )


                //check database if we are gucci
                db.collection("users").where("id", "==", id)
                    .get()
                    .then(function (querySnapshot) {

                        //if user is not found, create them in database
                        console.log(querySnapshot.size);
                        if (querySnapshot.size === 0) {
                            db.collection("users").add({
                                name: name,
                                email: email,
                                id: id
                            })
                                .then(function (docRef) {
                                    localStorage.setItem("id", id)
                                })
                                .catch(function (error) {
                                    console.error("Error adding document: ", error);
                                });
                        }
                        else {
                            console.log("logged in!", localStorage.getItem("id"));


                            querySnapshot.forEach(function (doc) {
                                // doc.data() is never undefined for query doc snapshots

                                console.log(doc.id, doc.data());
                            });
                        }

                    })
                    .catch(function (error) {
                        console.log("Error getting documents: ", error);
                    });


            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
        }
    }

    render() {
        return (
            null
        );
    }
}

export default Home;