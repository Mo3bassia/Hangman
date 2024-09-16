// for (let i = 1; i <= 7; i++) {
//   document.querySelector(`.wrong-${i}`).style.display = "block";
// }

let letters = "abcdefghijklmnopqrstuvwxyz0123456789";
let inputs = document.querySelector(".inputs");
let result = document.querySelector(".result");
let from = document.querySelector(".from span");
let hint = document.querySelector(".hint span");
let man = document.querySelector(".man");
let overlay = document.querySelector(".overlay");
let message = document.querySelector(".overlay .message");

let numberOfFails = 0;
let nextTry = 1;
let words = {
  programming: [
    "html",
    "css",
    "javascript",
    "react js",
    "bootstrap",
    "tailwind css",
  ],
  people: [
    "mohamed",
    "ahmed",
    "saleh",
    "fathy",
    "saif",
    "belal",
    "samah",
    "galal",
  ],
  laptops: ["hp", "leonovo", "dell"],
};

let randomCategory =
  Object.keys(words)[Math.floor(Math.random() * Object.keys(words).length)];

let randomArray = words[randomCategory];

let randomWord = randomArray[Math.floor(Math.random() * randomArray.length)];

hint.textContent = randomWord.slice(0, 3);
from.textContent = randomCategory;

letters.split("").forEach((e) => {
  let div = document.createElement("div");
  div.textContent = e.toUpperCase();
  inputs.append(div);

  div.addEventListener("click", function () {
    this.classList.add("disabled");
    if (randomWord.split("").includes(div.textContent.toLowerCase())) {
      randomWord
        .split("")
        .map((e, index) => {
          if (e == this.textContent.toLowerCase()) return index;
        })
        .filter((e) => e != undefined)
        .forEach((e) => {
          result.children[e].textContent = randomWord[e].toUpperCase();
        });

      if (
        Array.from(result.querySelectorAll("div")).every((e) => {
          return e.textContent != "";
        })
      ) {
        console.log("Cong");
        new Audio("./audio/Win sound effect no copyright.mp3").autoplay = true;

        overlay.style.opacity = "1";
        overlay.style.zIndex = "9";

        message.textContent = `Congratulations`;
      } else {
        new Audio("./audio/Succes.mp3").autoplay = true;
      }
    } else {
      document.querySelector(`.wrong-${nextTry}`).style.display = "block";
      nextTry++;
      if (nextTry == man.children.length + 1) {
        inputs.querySelectorAll("div").forEach((element) => {
          element.classList.add("disabled");
        });

        new Audio(
          "./audio/y2mate.com - Arcade game over sound effect.mp3"
        ).autoplay = true;

        overlay.style.opacity = "1";
        overlay.style.zIndex = "9";

        message.textContent = `Game Over, The Word is ${randomWord}`;
      } else {
        console.log("Hs");
        new Audio("./audio/False.mp3").autoplay = true;
      }
    }
  });
});

console.log(randomWord);

for (let i = 0; i < randomWord.length; i++) {
  if (randomWord[i] == " ") {
    let span = document.createElement("span");
    result.append(span);
  } else {
    let div = document.createElement("div");
    result.append(div);
  }
}

hint.parentElement.addEventListener("mouseenter", function () {
  hint.style.display = "inline-block";
});
hint.parentElement.addEventListener("mouseleave", function () {
  hint.style.display = "none";
});

document.querySelector(".reload").onclick = function () {
  location.reload();
};
