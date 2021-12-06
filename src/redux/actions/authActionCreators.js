// import { firebase, googleAuthProvider } from "../../firebase/firebase-config";
// import authActionTypes from "./authActionsTypes";

// export const startGoogleLogin = () => {
//     return (dispatch) => {
//         firebase.auth().signInWithPopup( googleAuthProvider )
//             .then( userCred => {
//                 console.log(userCred)
//             })
//     }
// }

// export const login = (uid, displayName) => {
//     return {
//         type: authActionTypes.LOGIN,
//         payload: {
//             uid,
//             displayName
//         }
//     }
// }