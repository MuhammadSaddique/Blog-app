// https://firebase.google.com/docs/web/setup
// https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js  ==>firestore

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    
 } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAfIoFVPtKOCwH2aKM_tGGf-nBOW7GvO5M",
    authDomain: "first-project-53116.firebaseapp.com",
    projectId: "first-project-53116",
    storageBucket: "first-project-53116.appspot.com",
    messagingSenderId: "362887925831",
    appId: "1:362887925831:web:86fd08c8a0864df3c82162"
  };

// Initialize Firebase
var app = initializeApp(firebaseConfig);
// console.log("app", app);

// Initialize Cloud Firestore and get a reference to the service
var auth = getAuth(app);

// console.log(app);
// console.log(auth);


function signupFunc(){
    // console.log("signupFunc");
    var email = document.getElementById("email")
    var password = document.getElementById("password")

    createUseWithEmailAndPassword(auth,email.value, password.value).then(function(success){
        console.log(success,"success");
        localStorage.getItem("uid",success.user.uid);
        alert("Successfully Login");
        window.location.replace("./dashbord.html")
    })
    .catch(function(error){
        console.log(error.code, error);
        alert(error.code);
        
    })
}

window.addEventListener("load",function(){
    console.log("blog load");
    var uid = this.localStorage.getItem("uid");
    console.log(uid,"uid");

    if(uid){
        location.replace("./dashbord.html");
        return;
    }

})




// funtion assign


window.signupFunc = signupFunc;
// window.loginFunc = loginFunc; 