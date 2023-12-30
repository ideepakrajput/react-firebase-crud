// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getAuth } from "firebase/auth";

function StartFirebase() {
    const firebaseConfig = {
        apiKey: "AIzaSyDd5CWEp0Lh5iRHCWWXVLRmhDhCUioLRmI",
        authDomain: "deepakrajput.firebaseapp.com",
        databaseURL: "https://deepakrajput-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "deepakrajput",
        storageBucket: "deepakrajput.appspot.com",
        messagingSenderId: "94224777752",
        appId: "1:94224777752:web:e8d0e74bf7fc51fbf5396d",
        measurementId: "G-ERFC8587J2"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const storage = getStorage(app);
    const auth = getAuth(app);

    return { database, storage, auth };

}

export default StartFirebase;