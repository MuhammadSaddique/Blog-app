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
import {  
  getDownloadURL,
  ref,
  storage,
  uploadBytesResumable,
} from "./firebase.js";

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

// for loop
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

var blogImage = document.getElementById("blogImage")
var imageURL;
if(blogImage.file[0]){
  imageURL = await imageUpload(blogImage.file[0])
}else{
  imageURL = "https://picum.photos/200/300"
}
// imageUpload(blogImage.files[0])
return
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
    title.value = "";
    desc.value = "";
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
          <button class="btn btn-danger" id=${id}  onclick="deleteBlog(this)">Delete</button>
      <button class="btn btn-info"  id=${id} onclick="editBlog(this)">Edit</button>

        </div>
      </div>
      `
      return UI;
}

async  function deleteBlog(ele){
  console.log("deleteBlog",ele.id);
  var blogId = ele.id;
  await deleteDoc(doc(db, "blogs",blogId));
}

function editBlog(){
  console.log("editBlog");
}

function logoutFunction(){
  localStorage.clear();
  window.location.replace("./index.html")
}







function imageUpload(file) {
  return new Promise(function (resolve, reject) {
    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: "image/jpeg",
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(Storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          resolve(downloadURL);
        });
      }
    );
  });
}





window.createBlog = createBlog;
window.logoutFunction = logoutFunction;
window.editBlog = editBlog;
window.deleteBlog = deleteBlog;

