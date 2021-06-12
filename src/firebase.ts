// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

/**
 * Configure firebase to access firebase storage
 */
export const firebaseConfig = {
    apiKey: "AIzaSyAc42RB0PU6jJ-cRzQ8TqXJY4_HjFoQQqM",
    authDomain: "learnreactcrud.firebaseapp.com",
    projectId: "learnreactcrud",
    storageBucket: "learnreactcrud.appspot.com",
    messagingSenderId: "345283870037",
    appId: "1:345283870037:web:5a65abfccc7acc0a4cc3dc",
    measurementId: "G-W7S8M9MVZR"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
const storage = firebase.storage();

export {storage, firebase as default}