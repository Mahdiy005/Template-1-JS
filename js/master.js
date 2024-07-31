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
let navigationBtns = document.querySelectorAll(".setting-options .navi-bullet span")
let navBulletsDiv = document.querySelector(".nav-bullets");


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
if(window.localStorage.getItem("is_nav")){
  navigationBtns.forEach(btn=> {
    btn.classList.remove("active")
  })
  if(window.localStorage.getItem("is_nav")==='yes') {
    navBulletsDiv.style.right = "15px";
  } else {
    navBulletsDiv.style.right = "-30px";
  }
  document.querySelector(`[data-nav="${window.localStorage.getItem("is_nav")}"]`).classList.add("active")
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

// controle apeeare and disappear navigation bullets 


navigationBtns.forEach(btn => {
  btn.addEventListener("click", function() {
    if(this.dataset.nav === 'yes') {
      navBulletsDiv.style.right = "15px";
    } else {
      navBulletsDiv.style.right = "-30px";
    }
    navigationBtns.forEach(btn=> {
      btn.classList.remove("active")
    });
    this.classList.add("active")
    window.localStorage.setItem("is_nav", this.dataset.nav)
  })
})


// --------------------------
// handle Our skills animation
// --------------------------
let skillsSection = document.querySelector(".our-skills");
let skillProgress = document.querySelectorAll(".our-skills .box span");
console.log(skillsSection.offsetTop);
window.onscroll = function () {
  if (window.scrollY >= skillsSection.offsetTop - 200) {
    skillProgress.forEach((ele) => {
      ele.style.width = ele.dataset.goal;
    });
  }
};

// ----------------------
// handle gallary popup
// ----------------------
let allImgs = document.querySelectorAll(".gallary .car img");
let allH3 = document.querySelectorAll(".gallary .car h3");
let currentImgIndex;

allH3.forEach((h) => {
  h.addEventListener("click", function name() {
    let overLay = document.createElement("div");
    let popupBox = document.createElement("div");
    let imgPop = document.createElement("img");
    let btnNext = document.createElement("i");
    let btnPrev = document.createElement("i");
    // let galTitle = document.c
    btnNext.classList.add("fa-solid", "fa-circle-chevron-right", "next");
    btnPrev.classList.add("fa-solid", "fa-circle-chevron-left", "prev");
    overLay.className = "popups-overlay";
    document.body.appendChild(overLay);
    imgPop.src = h.parentElement.children[0].src;
    currentImgIndex = h.parentElement.children[0].getAttribute("alt");
    popupBox.className = "popup-box";
    popupBox.appendChild(imgPop);
    document.body.appendChild(popupBox);
    document.body.append(btnNext, btnPrev);
    // popupBox.append(
    //   document.querySelector(`[alt="${currentImgIndex}"]`).parentElement
    //     .children[1]
    // );
    // handle next and previoues
    traverse(imgPop, popupBox);
    overLay.onclick = function () {
      popupBox.remove();
      overLay.remove();
      btnNext.remove();
      btnPrev.remove();
    };
  });
});

// document.addEventListener("click", function (e) {
//   if (e.target.classList.contains("next")) {
//     let popUpboxImg = document.querySelector(".popup-box img");
//     let popUpbox = document.querySelector(".popup-box");
//     currentImgIndex++;
//     console.log(currentImgIndex == 6);
//     if (currentImgIndex == 6) {
//       currentImgIndex = 1;
//     }

//     popUpboxImg.src = document.querySelector(`[alt="${currentImgIndex}"]`).src;
//     // popUpbox.children[1].remove();
//     console.log(
//       document.querySelector(`[alt="${currentImgIndex}"]`).parentElement
//         .children[1]
//     );
//   }
// });

// handle next and last image
function traverse(img, box) {
  let btnNext = document.querySelector(".next");
  let btnPrev = document.querySelector(".prev");
  // let currentImgIndex = 1;
  btnNext.addEventListener("click", function () {
    // console.log(currentImgIndex);
    currentImgIndex++;
    if (currentImgIndex == 6) {
      currentImgIndex = 1;
    }
    img.src = `../imgs/gallery-0${currentImgIndex}.${
      currentImgIndex == 3 || currentImgIndex == 5 ? "jpg" : "png"
    }`;
  });
  btnPrev.addEventListener("click", function () {
    // console.log(currentImgIndex);
    currentImgIndex--;
    if (currentImgIndex == 0) {
      currentImgIndex = 5;
    }
    img.src = `../imgs/gallery-0${currentImgIndex}.${
      currentImgIndex == 3 || currentImgIndex == 5 ? "jpg" : "png"
    }`;
  });
}

// -----------------------
// handle countdown events
// -----------------------
let daysContent = document.querySelector(".days span");
let hoursContent = document.querySelector(".hours span");
let miniutsContent = document.querySelector(".minuits span");
let secondsContent = document.querySelector(".seconds span");
let targetTime = new Date("Dec 31 2024 23:59:59").getTime();

let countDownEvents = setInterval(() => {
  let timeNow = new Date().getTime();
  reeminderTime = targetTime - timeNow;
  // get days
  let days = reeminderTime / (1000 * 60 * 60 * 24);
  daysContent.innerHTML = parseInt(days);

  // get Hours
  let hours = (reeminderTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60);
  hoursContent.innerHTML = `${
    parseInt(hours) >= 10 ? parseInt(hours) : "0" + parseInt(hours)
  }`;

  // get minuits
  let minuts =
    ((reeminderTime % (1000 * 60 * 60 * 24)) % (1000 * 60 * 60)) / (1000 * 60);
  miniutsContent.innerHTML = `${
    parseInt(minuts) >= 10 ? parseInt(minuts) : "0" + parseInt(minuts)
  }`;

  // get seconds
  let seconds =
    (((reeminderTime % (1000 * 60 * 60 * 24)) % (1000 * 60 * 60)) %
      (1000 * 60)) /
    1000;
  secondsContent.innerHTML = `${
    parseInt(seconds) >= 10 ? parseInt(seconds) : "0" + parseInt(seconds)
  }`;
}, 1000);


// ------------
// handle navigation bullets
// ------------
let bullets = document.querySelectorAll(".nav-bullets > span")

bullets.forEach(bullet=> {
  bullet.addEventListener("click", function() {
    window.location.hash = this.dataset.section;
  })
})