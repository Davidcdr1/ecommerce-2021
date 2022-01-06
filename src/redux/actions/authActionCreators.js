import { firebase, googleAuthProvider } from "../../firebase/firebase-config";
import authActionTypes from "./authActionsTypes";

//logearse con correo y contraseña
export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(
                    login(user.uid, user.displayName)
                );
            }).catch(e => {
                console.log(e);
            })
    }
}


//registrarse con nombre email y password personales
export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {

                await user.updateProfile({ displayName: name });
                dispatch(
                    login(user.uid, user.displayName)
                )


            }).catch(e => {
                console.log(e);
            })
    }
}
// logearse con cuenta de google(gmail)
export const startGoogleLogin = () => {
    return (dispatch) => {

        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                dispatch(
                    login(user.uid, user.displayName)
                )
            });

    }
}


export const login = (uid, displayName) => ({

    type: authActionTypes.LOGIN,
    payload: {
        uid,
        displayName
    }

});