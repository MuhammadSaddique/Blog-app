// https://firebase.google.com/docs/web/setup
// https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js  ==>firestore


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { db, doc, getDoc, setDoc } from "./firebase.js";


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
  var firstName = document.getElementById("firstName");
  var lastName  = document.getElementById("lastName");
  var phoneNumber  = document.getElementById("phoneNumber");
 

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async function (success) {
      console.log(success, "success");
      

      // store user in firebase

      var userObj={
        user_id : success.user.uid,
        email : email.value,
        firstName : firstName.value,
        lastName : lastName.value,
        phoneNumber : phoneNumber.value,

      };
      // Add a new document in collection "cities"
  await setDoc(doc(db, "users",success.user.uid),userObj);
  



  alert("successfully signup");
      window.location.href = "./index.html";
      // Generte auto doc id
     //  addDoc(Collection(db,"collectionName"),userObj);

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
    .then(async function (success) {
      console.log(success, "success");

      // user data get
      var docRef = doc(db, "users", success.user.uid);
      var docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      localStorage.setItem("uid", success.user.uid);
      localStorage.setItem(userData, JSON.stringify(docSnap.data()));
      alert("successfully login");
      window.location.replace("./dashbord.html");

      } else {
        alert("Something Went Wrong")
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }

      var userData

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





