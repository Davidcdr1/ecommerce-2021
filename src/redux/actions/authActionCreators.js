import { firebase, googleAuthProvider } from "../../firebase/firebase-config";
import authActionTypes from "./authActionsTypes";

export const startRegisterWithEmailPasswordName = (email, password, name ) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword( email, password )
        .then( async({user}) => {

            await user.updateProfile({ displayName: name});
            dispatch(
                login(user.uid, user.displayName)
            )

            console.log(user)
        })
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ({ user }) => {
                dispatch(
                    login(user.uid, user.displayName)
                )
                console.log(user)
            })
    }
}

export const login = (uid, displayName) => ({
    
        type: authActionTypes.LOGIN,
        payload: {
            uid,
            displayName
        }
    
});