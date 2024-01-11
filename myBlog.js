
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
          title:data.title,
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







