// https://firebase.google.com/docs/web/setup
// https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js  ==>firestore

// Import the functions you need from the SDKs you need
import { get } from "express/lib/response";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
var db = getFirestore(app);

// console.log(app,"app is working");
// console.log(db , "db is working");


window.addEventListener("load",function(){
    console.log("blog load");
    var uid = localStorage.getItem("uid");
    console.log("uid",uid);
    if(!uid){
        location.replace("./index.html")
        return;
    }
})

async function createBlog(){
    console.log(createBlog,);
    var title = document.getElementById("title").value;
    var desc = document.getElementById("desc").value;
    var uid = localStorage.getItem("uid");

    var blogObj = {
        title: title,
        desc: desc,
        uid: uid,
        image: "",
    }
    const docRef = await addDoc(collection(db,"blogs"),blogObj);
    console.log(docRef,"docRef");


}

window.addEventListener('load',async function(){
    const querySnapshot = await getDocs(collection(db,"blogs"));
    querySnapshot.forEach((doc) =>{
        console.log(doc.data());
    })
})




window.createBlog = createBlog;

