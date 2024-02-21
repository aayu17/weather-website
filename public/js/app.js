// const { response } = require("express");

// console.log("Client Side Javascript");
//hey
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
// messageOne.textContent = "HEY";
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const loc = search.value;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  fetch("http://localhost:3000/weather?address=" + loc).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.place;
        messageTwo.textContent = data.forecastData;
        console.log(data.place);
        console.log(data.forecastData);
      }
    });
  });
});
