console.log("myblog Page");


window.addEventListener("load", function () {
    console.log("blog load");
    var uid = localStorage.getItem("uid");
    console.log(uid, "uid");
  
    if (!uid) {
      location.replace("./index.html");
      return;
    }
  });