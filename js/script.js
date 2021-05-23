window.addEventListener("load", () => {
  document.querySelector(".page-loader").classList.add("fade-out");
  setTimeout(() => {
    document.querySelector(".page-loader").style.display = "none";
  }, 5000);
});

/* Bg Animation Effect*/
function bgAnimationItems() {
  const rows = 7,
    cols = 10;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const div = document.createElement("div");
      div.className = `col-${j + 1}`;
      document.querySelector(".bg-animation-effect").appendChild(div);
    }
  }
}
bgAnimationItems();

/*-------------- Toggle Navbar ------------------*/
const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener("click", toggleNavbar);

function toggleNavbar() {
  navToggler.classList.toggle("active");
  document.querySelector(".nav").classList.toggle("open");
  toggleOverlayEffect();
  toggleBodyScrolling();
}

/*------------------------ Hide & Show Section ----------------------*/
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("link-item") && e.target.hash !== "") {
    const hash = e.target.hash;
    if (e.target.classList.contains("nav-item")) {
      activeSection(hash);
      toggleNavbar();
    } else {
      toggleBodyScrolling();
      toggleOverlayEffect();
      document.querySelector(".nav-toggler").classList.add("toggle-hide");
      setTimeout(() => {
        activeSection(hash);
        toggleOverlayEffect();
        toggleBodyScrolling();
        document.querySelector(".nav-toggler").classList.remove("toggle-hide");
      }, 950);
    }
  }
});

function activeSection(sectionId) {
  document.querySelector("section.active").classList.remove("active");
  document.querySelector(sectionId).classList.add("active");
  window.scrollTo(0, 0);
}

/*------------------ Toggle Overlay Effect -------------------*/
function toggleOverlayEffect() {
  document.querySelector(".overlay-effect").classList.toggle("active");
}

/*------------- Toggle Body Scrolling --------------*/
function toggleBodyScrolling() {
  document.body.classList.toggle("hide-scrolling");
}
/*----------- FIlter Portfolio items ------------*/
const filterBtnsContainer = document.querySelector(".portfolio-filter");
let portfolioItems;
filterBtnsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("portfolio-filter-btn") && !e.target.classList.contains("active")) {
    filterBtnsContainer.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");
    toggleBodyScrolling();
    document.querySelector(".filter-status").classList.add("active");
    document.querySelector(".filter-status p").innerHTML = `filtering <span>${e.target.innerHTML}</span> works`;
    setTimeout(() => {
      filterItems(e.target);
    }, 400);
    setTimeout(() => {
      document.querySelector(".filter-status").classList.remove("active");
      toggleBodyScrolling();
    }, 800);
  }
});

function filterItems(filterBtn) {
  const selectedCategory = filterBtn.getAttribute("data-filter");
  document.querySelectorAll(".portfolio-item").forEach((item) => {
    const category = item.getAttribute("data-category").split(",");
    if (category.indexOf(selectedCategory) !== -1 || selectedCategory === "all") {
      item.classList.add("show");
    } else {
      item.classList.remove("show");
    }
  });
  portfolioItems = document.querySelectorAll(".portfolio-item.show");
  console.log(portfolioItems);
}
// Filter Active Category Portfolio Items
filterItems(document.querySelector(".portfolio-filter-btn.active"));

/*---------- Portfolio Item Details Popup -------------*/
let portfolioItemIndex;
document.addEventListener("click", (e) => {
  if (e.target.closest(".portfolio-item")) {
    const currentItem = e.target.closest(".portfolio-item");
    portfolioItemIndex = Array.from(portfolioItems).indexOf(currentItem);
    togglePopup();
    portfolioItemDetails();
    updateNextPrevItem();
  }
});
function togglePopup() {
  document.querySelector(".portfolio-popup").classList.toggle("open");
  toggleBodyScrolling();
}
document.querySelector(".pp-close-btn").addEventListener("click", togglePopup);

function portfolioItemDetails() {
  document.querySelector(".pp-thumbnail img").src = portfolioItems[portfolioItemIndex].querySelector("img").src;

  document.querySelector(".pp-header h3").innerHTML = portfolioItems[portfolioItemIndex].querySelector(".portfolio-item-title").innerHTML;

  document.querySelector(".pp-body").innerHTML = portfolioItems[portfolioItemIndex].querySelector(".portfolio-item-details").innerHTML;

  document.querySelector(".pp-counter").innerHTML = `${portfolioItemIndex + 1} of ${portfolioItems.length}
  (<span title="category">${document.querySelector(".portfolio-filter-btn.active").innerHTML}</span>)`;
}

function updateNextPrevItem() {
  if (portfolioItemIndex !== 0) {
    document.querySelector(".pp-footer-left").classList.remove("hidden");
    document.querySelector(".pp-footer-left h3").innerHTML = portfolioItems[portfolioItemIndex - 1].querySelector("h3").innerHTML;

    document.querySelector(".pp-footer-left img").src = portfolioItems[portfolioItemIndex - 1].querySelector("img").src;
  } else {
    document.querySelector(".pp-footer-left").classList.add("hidden");
  }

  if (portfolioItemIndex !== portfolioItems.length - 1) {
    document.querySelector(".pp-footer-right").classList.remove("hidden");
    document.querySelector(".pp-footer-right h3").innerHTML = portfolioItems[portfolioItemIndex + 1].querySelector("h3").innerHTML;

    document.querySelector(".pp-footer-right img").src = portfolioItems[portfolioItemIndex + 1].querySelector("img").src;
  } else {
    document.querySelector(".pp-footer-right").classList.add("hidden");
  }
}

document.querySelector(".pp-prev-btn").addEventListener("click", () => {
  changePortfolioItem("prev");
});

document.querySelector(".pp-next-btn").addEventListener("click", () => {
  changePortfolioItem("next");
});

function changePortfolioItem(direction) {
  if (direction == "prev") {
    portfolioItemIndex--;
  } else {
    portfolioItemIndex++;
  }
  document.querySelector(".pp-overlay").classList.add(direction);
  setTimeout(() => {
    document.querySelector(".pp-inner").scrollTo(0, 0);
    portfolioItemDetails();
    updateNextPrevItem();
  }, 400);
  setTimeout(() => {
    document.querySelector(".pp-overlay").classList.remove(direction);
  }, 1000);
}

/*-------------------------- Toggle Contact Form -------------------------*/

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("toggle-contact-form-btn")) {
    document.querySelector(".contact-form").classList.toggle("open");
    toggleBodyScrolling();
  }
});

/*-------------- Skill Popup --------------------*/
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("skill-item-btn")) {
    document.querySelector(".skill-popup").classList.toggle("open");
    toggleBodyScrolling();
  }
});

var button_skill = document.querySelectorAll(".skills button");
var info_elements = document.querySelectorAll(".skill-info");
for (var i = 0; i < button_skill.length; i++) {
  button_skill[i].addEventListener("click", function () {
    button_skill.forEach(function (button) {
      button.classList.remove("active");
    });
    this.classList.add("active");
    var button_value = this.getAttribute("data-skill");
    info_elements.forEach(function (info) {
      info.style.display = "none";
    });
    if (button_value == "html") {
      document.querySelector("." + button_value).style.display = "block";
    } else if (button_value == "css") {
      document.querySelector("." + button_value).style.display = "block";
    } else if (button_value == "javascript") {
      document.querySelector("." + button_value).style.display = "block";
    } else if (button_value == "sass") {
      document.querySelector("." + button_value).style.display = "block";
    } else if (button_value == "php") {
      document.querySelector("." + button_value).style.display = "block";
    } else if (button_value == "bootstrap") {
      document.querySelector("." + button_value).style.display = "block";
    } else if (button_value == "vscode") {
      document.querySelector("." + button_value).style.display = "block";
    } else {
      console.log("");
    }
  });
}

/*------------------- Cursor animation -------------------*/
// var cursor = document.querySelector(".cursor");
// var cursor2 = document.querySelector(".cursor2");
// document.addEventListener("mousemove", function (e) {
//   cursor.style.cssText = cursor2.style.cssText = "left : " + e.clientX + "px; top: " + e.clientY + "px;";
// });

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
  cursor.setAttribute("style", "top: " + (e.pageY - 10) + "px; left: " + (e.pageX - 10) + "px;");
});

document.addEventListener("click", () => {
  cursor.classList.add("expand");

  setTimeout(() => {
    cursor.classList.remove("expand");
  }, 500);
});

/*------------- Toggle Day-Night Mode ----------------*/

const daymode = document.querySelector(".day-mode");

daymode.addEventListener("click", () => {
  document.body.classList.toggle("light");
  if (document.body.classList.contains("light")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
  updateIcon();
});

function themeMode() {
  // Check if "theme" key exist
  if (localStorage.getItem("theme") !== null) {
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
    }
  }
  updateIcon();
}
themeMode();

function updateIcon() {
  if (document.body.classList.contains("light")) {
    daymode.querySelector("i").classList.remove("fa-sun");
    daymode.querySelector("i").classList.add("fa-moon");
  } else {
    daymode.querySelector("i").classList.remove("fa-moon");
    daymode.querySelector("i").classList.add("fa-sun");
  }
}

// window.addEventListener("load", () => {
//   if (document.body.classList.contains("light")) {
//     daymode.querySelector("i").classList.add("fa-moon");
//   } else {
//     daymode.querySelector("i").classList.add("fa-sun");
//   }
// });
