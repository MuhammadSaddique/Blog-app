
import { collection, db, getDocs, where,query,doc } from "./firebase.js";


console.log("myblog Page");


window.addEventListener("load", async function () {
    console.log("blog load");
    var uid = localStorage.getItem("uid");
    console.log(uid, "uid");
  
    if (!uid) {
      location.replace("./index.html");
      return;
    }else{
      
  //     var BlogArr = [];
  // const querySnapshot = await getDocs(collection(db,"blogs"));
  // querySnapshot.forEach((doc) =>{
  //     console.log(doc.data());
  //     console.log(doc.id);

  //     if(uid === doc.data().uid){
  //       BlogArr.push({
  //         title:doc.data().title,
  //         desc: doc.data().desc,
  //         uid: doc.data().uid,
  //         image: doc.data().image,
  //         blogId: doc.id,
  //         isPrivate: doc.data().isPrivate,
  //       })
  //        }



  // })
  // console.log(BlogArr , "arr");




      
      // Create a query against the collection.
      var q = query(collection(db, "blogs"), where("uid", "==", uid));
  
      const querySnapshot = await getDocs(q);
      var myBLogArr = [];
      querySnapshot.forEach(function (doc) {
        //   console.log(doc.data());
        var data = doc.data();
        myBLogArr.push({
          tilte: data.tilte,
          desc: data.desc,
          uid: data.uid,
          image: data.image,
          blogId: doc.id,
          isPrivate: data.isPrivate,
        });
      });
      console.log(myBLogArr, "myBLogArr");

    }
  });