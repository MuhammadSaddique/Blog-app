import { collection, db, getDocs } from "./firebase.js";


console.log("myblog Page");


window.addEventListener("load", async function () {
    console.log("blog load");
    var uid = localStorage.getItem("uid");
    console.log(uid, "uid");
  
    if (!uid) {
      location.replace("./index.html");
      return;
    }else{

      var  bolgRef = collection(db, "blogs");

      // Create a query against the collection.
      const q = query(citiesRef, where("state", "==", "CA"));
      

// time is 39:44 in 3rd recording












      const querySnapshot = await getDocs(collection(db,"blogs"));
      var myBlogArr = [];
      querySnapshot.forEach(function(doc){
        myBlogArr.push(doc.data());
      });

      console.log(doc.data());


    }
  });