// TOGGLING FUNCTIONALITY
$("#slideleft").click(function () {
  $("#login-card").hide();
  $("#signup-card").show();
  $(".left").hide();
  $(".right").show();
});

$("#slideright").click(function () {
  $("#login-card").show();
  $("#signup-card").hide();
  $(".left").show();
  $(".right").hide();
});

const loginForm = document.querySelector("form#login");
const signupForm = document.querySelector("form#signup");
// const loginBtn = document.querySelector("label.login");
// const signupBtn = document.querySelector("label.signup");
// const signupLink = document.querySelector("form .signup-link a");
const messageBody = document.getElementById("response");
const responseBody = document.getElementById("response-container");

// // SIGNUP FUNCTION
const signup = async (name, email, pass, question, answer) => {
  console.log("clicked");
  const url = `https://overwatch-apis.herokuapp.com/authentication/register`;
  const params = `?username=${name}&email=${email}&password=${pass}&sec_question=${question}&sec_answer=${answer}`;
  const base = `${url}${params}`;
  const req = await fetch(base, {
    method: "POST",
  });
  const response = await req.json();
  console.log(response);
  responseBody.style.display = "block";
  const myTimeout = setTimeout(hider, 1500);
  messageBody.innerHTML = `<div class="msgdiv">
  <img src="../assets/icons/correct.png" id="correct" class="animate__animated animate__heartBeat">
    <h4>${response.message}</h4></div>`;
};
// // LOGIN FUNCTION
const login = async (email, pass) => {
  console.log("clicked");
  const url = `https://overwatch-apis.herokuapp.com/authentication/login`;
  const params = `?email=${email}&password=${pass}`;
  const base = `${url}${params}`;
  const req = await fetch(base, {
    method: "GET",
  });
  const response = await req.json();
  console.log(response);
  if (response.status == 200) {
    messageBody.innerHTML = `<div class="msgdiv"><h4>${response.message}</h4></div>`;
    sessionStorage.setItem("uid", `${response.uid}`);
    sessionStorage.setItem("uname", `${response.username}`);
    sessionStorage.setItem("uemail", `${response.email}`);
    window.location.href = "./index.html";
  } else {
    messageBody.innerHTML = `<div class="msgdiv"><h4>${response.message}</h4></div>`;
    // alert(`${response.message}`)
  }
};

// // HANDLING LOGIN FORM ACTIVITY
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const lemail = document.getElementById("lemail").value;
  const lpass = document.getElementById("lpass").value;
  login(lemail, lpass);
});

// // HANDLING SIGNUP FORM ACTIVITY
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const sName = document.getElementById("sname").value;
  const sEmail = document.getElementById("semail").value;
  const sPass = document.getElementById("spass").value;
  const secQuestion = document.getElementById("secquestion").value;
  const secAnswer = document.getElementById("secanswer").value;
  signup(sName, sEmail, sPass, secQuestion, secAnswer);
  console.log(sName, sEmail, sPass, secQuestion, secAnswer);
});

const hider = () => {
  responseBody.style.display = "none";
};
