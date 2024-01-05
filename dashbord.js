// https://firebase.google.com/docs/web/setup
// https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js  ==>firestore

// Import the functions you need from the SDKs you need
// import { get } from "express/lib/response";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
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

var parent = document.getElementById("parent");
var exampleModal1 = document.getElementById("exampleModal1");

var myModal = new bootstrap.Modal(document.getElementById('exampleModal1'), {
  keyboard: false
})

window.addEventListener("load",async function () {
  // console.log("blog load");
  var uid = localStorage.getItem("uid");
  // console.log(uid, "uid");

  if (!uid) {
    location.replace("./index.html");
    return;
  }

  var BlogArr = [];
  const querySnapshot = await getDocs(collection(db,"blogs"));
  querySnapshot.forEach((doc) =>{
      console.log(doc.data());
      console.log(doc.id);

      // BlogArr.push(doc.data())

      BlogArr.push({
        title:doc.data().title,
        desc: doc.data().desc,
        uid: doc.data().uid,
        image: doc.data().image,
        blogId: doc.id,
        isPrivate: doc.data().isPrivate,
      })

  })
  console.log(BlogArr , "arr");


  for(var value of BlogArr){ 
    if(value.isPrivate){

      if(value.uid === uid){
        parent.innerHTML += renderCardUI(
          value.title,
           value.desc,
           value.image,
           value.blogId,
           value.isPrivate,
         );
      }
      
    }else{
      parent.innerHTML += renderCardUI(
        value.title,
         value.desc,
         value.image,
         value.blogId,
         value.isPrivate,
       );
     
    }
   
  }

});


async function createBlog(){
    console.log(createBlog,);
    var title = document.getElementById("title");
    var desc = document.getElementById("desc");
    var uid = localStorage.getItem("uid");
  var privatePost = document.getElementById("privatePost").checked;



    var blogObj = {
        title: title.value,
        desc: desc.value,
        uid: uid,
        image: "",
        isPrivate: privatePost,
    }

    const docRef = await addDoc(collection(db,"blogs"),blogObj);
    parent.innerHTML += renderCardUI(title.value, desc.value, "", docRef.id,privatePost);
    myModal.hide();
    
    title.value = ""
    desc.value = ""
    console.log(docRef,"docRef");
}


function renderCardUI(title,desc,image,id,isPrivate){
  // console.log("UI is Private",isPrivate);
  var lockValue = "";
  if(isPrivate){
    lockValue = `<i class="fa fa-lock" aria-hidden="true"></i>`;
  }else{
    lockValue = "";
  }



  var UI = `
  <div class="card" style="width: 18rem;">
        <img src="https://picsum.photos/300/200" class="card-img-top" alt="">
        <div class="card-body">
          <h5 class="card-title">${title} ${lockValue} </h5>
          <p class="card-text">
          ${desc}
          </p>
          <a href="#" class="card-link ">Go SomeWhere</a>
        </div>
      </div>
      `
      return UI;
}



window.createBlog = createBlog;

