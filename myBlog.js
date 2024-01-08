import { getDocs } from "./firebase.js";


console.log("myblog Page");


window.addEventListener("load", async function () {
    console.log("blog load");
    var uid = localStorage.getItem("uid");
    console.log(uid, "uid");
  
    if (!uid) {
      location.replace("./index.html");
      return;
    }else{

      const querySnapshot = await getDocs(collection(db,"blogs"));
      


  


    }
  });