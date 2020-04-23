let modal = document.getElementById("add_modal");
const add_post = () => {
  modal.style.display = "block";
};
var close = document.getElementById("close-modal");
close.addEventListener("click", () => {
  modal.style.display = "none";
});
var post_image = document.getElementById("post-img-input");
var user_name;
var user_dp = document.getElementById("user-dp-input");
var post_image_data;
var post_dp_data;

let num = 1;
var temp = [];

function readFile() {
  if (this.files && this.files[0]) {
    var FR = new FileReader();

    FR.addEventListener("load", function (e) {
      temp.push(e.target.result);
    });

    FR.readAsDataURL(this.files[0]);
  }
}

document.getElementById("post-img-input").addEventListener("change", readFile);
num = num + 1;
document.getElementById("user-dp-input").addEventListener("change", readFile);
var to_be_stored = [];
var id;
function post_add() {
  if (localStorage.getItem("Id") != null) {
    console.log("called");
    id = Number(localStorage.getItem("Id")) + 1;
    localStorage.setItem("Id", id);
  } else {
    id = 1;
    localStorage.setItem("Id", 1);
  }
  user_name = document.getElementById("un").value;
  post_image_data = temp[0];
  post_dp_data = temp[1];
  temp = [];
  if (user_name != null && post_image_data != null && post_dp_data != null) {
    to_be_stored.push(user_name, post_image_data, post_dp_data);

    localStorage.setItem(id, to_be_stored);

    to_be_stored = [];

    modal.style.display = "none";
    var n = Number(localStorage.Id);
    localStorage.setItem(n + "h", 1234);
    display_post(n);
  } else {
    console.log("null");
  }
}

//Checking if there are existing storage
if (localStorage.getItem("Id") != null) {
  var old_n = Number(localStorage.getItem("Id"));
  for (var k = 1; k <= old_n; k++) {
    display_post(k);
  }
} else {
  heart_listener();
}

function display_post(nk) {
  var post = document.querySelector(".posts");
  var header = `<div class="each-post">
  <div class="one-user-pad">
  <h2 class="username">`;
  var mid = `<img src="`;
  var body = `alt=""
    class="profile-pic2"
    style="
      margin-top: 5px;
      margin-bottom: 5px;
      border: 2px solid #dc3075;
    "
  />&nbsp;&nbsp`;
  var en = `</h2></div>
  <img src="`;
  var fin = `alt="" srcset="" class="user-post" />
  <div class="actions">
    <i class="far fa-heart" id="`;
  var fin_temp = `"></i>
    <i class="fab fa-telegram-plane" id="faa"></i>
    <i class="fas fa-compass" id="faa"></i>
  </div>
  <h3 class="likes" id="`;
  var fin2 =
    `>` +
    localStorage.getItem(nk + "h") +
    `&nbsp;likes</h3>
  <div class="capt">
    <h5 id="caption">
      ram_gram:
    </h5>
    <p class="cap">#Summer day chilling</p>
  </div>
  <div class="capt">
    <h5 id="caption">
      shankara_sharma:
    </h5>
    <p class="cap">Nice Pic</p>
  </div>
  <div class="capt">
    <h5 id="caption">
      sree_varshan_biker:
    </h5>
    <p class="cap">Have fun bro!</p>
  </div>
  </div>`;
  var i;

  var op = localStorage.getItem(Number(nk)).split(",");
  //console.log(op);
  var temp2 =
    header +
    mid +
    op[3] +
    "," +
    op[4] +
    `"` +
    body +
    op[0] +
    en +
    op[1] +
    "," +
    op[2] +
    `"` +
    fin +
    parseInt(nk) +
    fin_temp +
    parseInt(nk) +
    "h" +
    `"` +
    fin2;

  post.innerHTML += temp2;
  heart_listener();
}

{
  /* <div class="each-post">
<div class="one-user-pad">
  <img
    src="./sundar.jpg"
    alt=""
    class="profile-pic2"
    style="
      margin-top: 5px;
      margin-bottom: 5px;
      border: 2px solid #dc3075;
    "
  />
  <h2 class="username">&nbsp;&nbsp;jeff_bezos</h2>

  <p class="update">&nbsp;&nbsp;1 hour ago</p>
</div>
<img src="./tree.jpg" alt="" srcset="" class="user-post" />
<div class="actions">
  <i class="far fa-heart" id="faa"></i>
  <i class="fab fa-telegram-plane" id="faa"></i>
  <i class="fas fa-compass" id="faa"></i>
</div>
<h3 class="likes">1,235 likes</h3>
<div class="capt">
  <h5 id="caption">
    ram_gram:
  </h5>
  <p class="cap">#Summer day chilling</p>
</div>
<div class="capt">
  <h5 id="caption">
    shankara_sharma:
  </h5>
  <p class="cap">Nice Pic</p>
</div>
<div class="capt">
  <h5 id="caption">
    sree_varshan_biker:
  </h5>
  <p class="cap">Have fun bro!</p>
</div>
</div> */
}
function heart_listener() {
  var hearts = document.getElementsByClassName("fa-heart");
  for (var i = 0; i < hearts.length; i++) {
    hearts.item(i).addEventListener("click", (e) => {
      var like_id = e.path[0].id + "h";
      console.log(like_id);
      var likes = parseInt(document.getElementById(like_id).innerText);
      document.getElementById(like_id).innerText =
        parseInt(likes) + 1 + " likes";
      localStorage.setItem(like_id, ++likes);
    });
  }
}
