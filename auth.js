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
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

function signupFunc() {
  console.log("signupFunc");
  var email = document.getElementById("email");
  var password = document.getElementById("password");

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(function (success) {
      console.log(success, "success");
      alert("successfully signup");
      window.location.href = "./index.html";
    })
    .catch(function (error) {
      console.log(error.code, "error");
      alert(error.code);
    });
}

function loginFunc() {
  var email = document.getElementById("email");
  var password = document.getElementById("password");

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(function (success) {
      console.log(success, "success");
      localStorage.setItem("uid", success.user.uid);
      alert("successfully login");
      window.location.replace("./dashbord.html");
    })
    .catch(function (error) {
      console.log(error.code, "error");
      alert(error.code);
    });
}

window.addEventListener("load", function () {
  console.log("blog load");
  var uid = localStorage.getItem("uid");
  console.log(uid, "uid");

  if (uid) {
    location.replace("./dashbord.html");
    return;
  }
});

///function assign
window.signupFunc = signupFunc;
window.loginFunc = loginFunc;





