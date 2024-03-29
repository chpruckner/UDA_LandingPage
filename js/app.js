/* global variables */
const sections = document.querySelectorAll("section");
const navUl = document.querySelector("#navbar__list");
const downButton = document.querySelector(".main__scroll-down");
const scrollUp = document.querySelector(".main__scroll-top");
const screenTop = document.querySelector("body");
const headerHeight = document.getElementById("header").offsetHeight;
const firstSection = sections[0];

const navBar = sections.forEach( (el) => {
  const navLi = document.createElement("li");
  navLi.classList.add("menu__item");

  const navA = document.createElement("a");
  navA.classList.add("menu__link");
  const id = el.id;
  navA.id = `${id}-link`;
  //navA.href = `#${id}`;
  navA.addEventListener("click", () => {
    el.scrollIntoView({behavior: "smooth"});
  });

  const navTxt = document.createTextNode(`${el.dataset.nav}`);

  navA.appendChild(navTxt);
  navLi.appendChild(navA);
  navUl.appendChild(navLi);

});

downButton.addEventListener("click", () => {
  sections[0].scrollIntoView({behavior: "smooth"});
})

scrollUp.addEventListener("click", () => {
  screenTop.scrollIntoView({behavior: "smooth"});
});

firstSection.style.marginTop = `${headerHeight}px`;
firstSection.style.paddingTop = `-${headerHeight}px`;

const isInViewport = (element) => {
  const currentPos = element.getBoundingClientRect();
  return (
    currentPos.top < window.innerHeight * 0.8  &&
    currentPos.bottom >= window.innerHeight * 0.8
  );
}

let scrollPos = 0;
window.addEventListener("scroll", () => {
  /**
   * hide main__scroll-down when scrolling down
   */
  const scrollDown = document.querySelector(".main__scroll-down");
  const hero = document.querySelector(".main__hero");
  const bodyTop = (document.body.getBoundingClientRect()).top;
  // attribute to @lehollandaisvolant and his "Simple JS scroll-direction detection" pen
  
  if (bodyTop < scrollPos) { // direction is down
    scrollDown.classList.add("invisible");
  } else if (isInViewport(hero) || bodyTop > scrollPos) {
    scrollDown.classList.remove("invisible");
  }

  /**
   * show scroll-to-top when scrolling down
   */
  if (isInViewport(firstSection) && bodyTop < scrollPos) {
    scrollUp.classList.add("show");
  } else if (isInViewport(hero) && bodyTop > scrollPos) {
    scrollUp.classList.remove("show");
  }

  scrollPos = bodyTop;

  /**
   * adding active class to menu and sections
   */
  const navElements = document.querySelectorAll(".menu__link");
  for (const navEl of navElements) {
    navEl.classList.remove(".active");
  };

  for (const sect of sections) {
    const currentNavEl = document.getElementById(`${sect.id}-link`);

    if (isInViewport(sect)) {
      currentNavEl.classList.add("active");
      sect.classList.add("active");
    } else {
      sect.classList.remove("active");
      currentNavEl.classList.remove("active")
    }
  }
});
