// -----------------
// handle nav menue
// -----------------
let iconToClick = document.querySelector(".header .icon");
let ulNav = document.querySelector(".header .container .nav ul");
let exitBtn = document.createElement("span");
let lis = Array.from(document.querySelectorAll(".header .nav ul li"));
let allLinks = document.querySelectorAll(".header .nav ul li a");
exitBtn.classList.add("exit");
exitBtn.innerHTML = "X";
iconToClick.onclick = function () {
  ulNav.prepend(exitBtn);
  ulNav.style.top = "0";
  iconToClick.style.opacity = "0";
};
exitBtn.onclick = function () {
  ulNav.style.top = "-100vh";
  iconToClick.style.opacity = "1";
};
lis.forEach((li) => {
  li.addEventListener("click", function () {
    allLinks.forEach((a) => {
      a.classList.remove("active");
    });
    this.children[0].classList.add("active");
    exitBtn.click();
  });
});

// --------------------------
// handle background landing
// --------------------------
let landingSection = document.querySelector(".landing");
let i = 1;
let countRandomBackground;
let backgroundOption = true;
function randomizeImgs() {
  if (backgroundOption) {
    countRandomBackground = setInterval(() => {
      landingSection.style.backgroundImage = `url('../imgs/land-${i}.jpeg')`;
      i++;
      if (i === 5) i = 1;
    }, 3000);
  }
}
// --------------------------
// handle Settings Box
// --------------------------
let gearBtn = document.querySelector(".settings-box > .gear");
let gearBtnIcon = document.querySelector(".settings-box > .gear > i");
let settingDiv = document.querySelector(".settings-box");
let colorOptions = document.querySelectorAll(
  ".settings-box .setting-options ul li"
);
let isRandomBtn = document.querySelectorAll(".random-backgrounds span");

// check if you have color in local storage
if (window.localStorage.getItem("color")) {
  let currentColorSelected = document.querySelector(
    `[data-color="${window.localStorage.getItem("color")}"]`
  );
  // console.log(window.localStorage.getItem("color"));
  document.documentElement.style.setProperty(
    "--head-color",
    window.localStorage.getItem("color")
  );
  colorOptions.forEach((opt) => {
    opt.classList.remove("active");
  });
  currentColorSelected.classList.add("active");
}
if (window.localStorage.getItem("randomBG")) {
  if (window.localStorage.getItem("randomBG") === "yes") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  isRandomBtn.forEach((span) => {
    span.classList.remove("active");
  });
  document
    .querySelector(`[data-back="${window.localStorage.getItem("randomBG")}"]`)
    .classList.add("active");
}
gearBtn.onclick = function () {
  settingDiv.classList.toggle("on");
  gearBtnIcon.classList.toggle("fa-spin");
};
// handle color setting
// document.documentElement.style.setProperty('--head-color', 'black');
colorOptions.forEach((opt) => {
  opt.addEventListener("click", function () {
    colorOptions.forEach((opt) => {
      opt.classList.remove("active");
    });
    this.classList.add("active");
    document.documentElement.style.setProperty(
      "--head-color",
      this.dataset.color
    );
    // store value to local storage
    window.localStorage.setItem("color", this.dataset.color);
  });
});
// handle random background setting
randomizeImgs();
isRandomBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    if (this.dataset.back === "yes") {
      backgroundOption = true;
      randomizeImgs();
    } else {
      backgroundOption = false;
      clearInterval(countRandomBackground);
    }
    window.localStorage.setItem("randomBG", this.dataset.back);
    isRandomBtn.forEach((span) => {
      span.classList.remove("active");
    });
    this.classList.add("active");
  });
});



// --------------------------
// handle Our skills animation
// --------------------------
let skillsSection = document.querySelector(".our-skills")
let skillProgress = document.querySelectorAll(".our-skills .box span")
console.log(skillsSection.offsetTop);
window.onscroll = function () {
  if(window.scrollY >= skillsSection.offsetTop - 200) {
    skillProgress.forEach(ele=> {
      ele.style.width = ele.dataset.goal;
    })
  }
}





