let login = document.querySelector(".login");
let signup = document.querySelector(".signup");
let loginOrSignUp = document.querySelector(".loginOrSignUp");
let loginBtn = document.querySelector(".loginBtn");
let signupBtn = document.querySelector(".signupBtn");
let modalTitle = document.querySelector(".modal-title");
let navBarRight = document.querySelector(".navbar-right");
let canvasItems = document.querySelectorAll(".canvas-item");

login.addEventListener("click", () => {
  login.classList.add("active");
  signup.classList.remove("active");
  loginBtn.classList.remove("hide");
  signupBtn.classList.add("hide");
  loginOrSignUp.innerHTML = `<input type="email" placeholder="email" class="email"/>
    <input type="password" placeholder="password" class="password"/>`;
  modalTitle.innerText = "Login Here";
});

signup.addEventListener("click", () => {
  signup.classList.add("active");
  login.classList.remove("active");
  signupBtn.classList.remove("hide");
  loginBtn.classList.add("hide");
  loginOrSignUp.innerHTML = `<input type="text" placeholder="full name" class="fullName"/> <input type="email" placeholder="email" class="email"/>
    <input type="password" placeholder="password" class="password"/> <input type="password" placeholder="confirm password" class="confirmPassword"/>
    <p></p>
    `;
  modalTitle.innerText = "Signup Here";
});

document.querySelector(".reset").addEventListener("click", () => {
  let inputs = document.querySelectorAll("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
});

//clear contents of form when model opens
document.querySelector(".loginProfileBtn").addEventListener("click", () => {
  let inputs = loginOrSignUp.querySelectorAll("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
  document.querySelector(".navbar-collapse").classList.remove("show");
});

//making nav-items on nav-bar active except login and logout
let navLinks = navBarRight.querySelectorAll(".nav-link");
for (let i = 0; i < navLinks.length - 2; i++) {
  navLinks[i].addEventListener("click", () => {
    removeActiveState();
    navLinks[i].classList.add("active");
    hideCanvasItems();
    canvasItems[i].classList.remove("hide");
    document.querySelector(".navbar-collapse").classList.remove("show");
  });
}

//remove active class for present active nav-link
function removeActiveState() {
  for (let i = 0; i < navLinks.length - 2; i++) {
    navLinks[i].classList.remove("active");
  }
}

//hide all canvasItems
function hideCanvasItems() {
  for (let i = 0; i < canvasItems.length; i++) {
    canvasItems[i].classList.add("hide");
  }
}


document.addEventListener('DOMContentLoaded', function () {
  const themeToggle = document.getElementById('themeToggle');

  themeToggle.addEventListener('change', function () {
    if (this.checked) {
      document.body.style.backgroundColor = 'black';
      document.body.style.color = 'white';
      showToast("White Theme Changed..");
    } else {
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black';
      showToast("Black Theme Changed..");
      
    }
  });
});

let cursor = document.getElementById("cursor");
 let cursorPointer = document.getElementById("cursor-pointer");

  document.body.addEventListener("mousemove", function (e) {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    cursorPointer.style.left = e.clientX + "px";
    cursorPointer.style.top = e.clientY + "px";
  });

  document.body.addEventListener("mousedown", function (e) {
    cursor.style.height = "0.5rem";
    cursor.style.width = "0.5rem";
    cursorPointer.style.height = "3rem";
    cursorPointer.style.width = "3rem";
  });

  document.body.addEventListener("mouseup", function (e) {
    cursor.style.height = "0.3rem";
    cursor.style.width = "0.3rem";
    cursorPointer.style.height = "2rem";
    cursorPointer.style.width = "2rem";
  });
