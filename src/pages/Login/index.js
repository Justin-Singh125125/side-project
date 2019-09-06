import React from "react";
import { db, firebase } from "../../firebase/config";


class Login extends React.Component {

    handleHomeChange = () => {
        this.props.history.push(`/home`)
    }



    handleLoginUser = () => {
        var test = this.props;

        if (localStorage.getItem("id")) {
            console.log("loggedIn", localStorage.getItem("id"));
            this.handleHomeChange();
        }
        else {


            var provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then(function (result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;

                console.log(result);

                console.log(result.user.photoURL);

                const id = result.user.uid;
                const name = result.user.displayName;
                const email = result.user.email;
                const photo = result.user.photoURL;

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
                                id: id,
                                photo: photo
                            })
                                .then(function (docRef) {
                                    localStorage.setItem("id", id)
                                    console.log(localStorage.getItem("id"))



                                })
                                .catch(function (error) {
                                    console.error("Error adding document: ", error);
                                });
                        }
                        else {

                            console.log("logged in!", localStorage.getItem("id"));


                            querySnapshot.forEach(function (doc) {
                                // doc.data() is never undefined for query doc snapshots

                                console.log("user id", doc.id);

                                localStorage.setItem("id", doc.id);

                                test.history.push(`/home`);

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
            <div>

                <p>Login Page</p>

                <button onClick={this.handleLoginUser}>Login</button>
            </div>
        );
    }
}

export default Login;