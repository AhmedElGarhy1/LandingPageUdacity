// select all sections
const sections = document.querySelectorAll("section");
// get the navbar to append the lis
const nav = document.getElementById("navbar__list");

/* 
 - create a fragment node to append the elements then append it to the body 
 - to improve the performance of the code
*/
let fragment = new DocumentFragment();

// set a counter to make it ease to count the number of section to set the li's id
let sectionCounter = 1;

/*
    styleing the navbar list 
*/
nav.style.cssText = `
    display: flex;
    justify-content: center;
`;
// --------------------------------------------------------------------------
// main function to clean the code
function main() {
  sections.forEach(CreateAndAppendToFragment);

  // Now add the fragment to the navbar
  nav.appendChild(fragment);
  const newLis = document.querySelectorAll(".menu__link");
  newLis.forEach((li) => {
    li.addEventListener("click", moveToSection);
  });
  window.addEventListener("scroll", () => {
    sections.forEach(FindActiveSection);
  });
}

/*
    the function of the code
    ------------------------
*/

function CreateAndAppendToFragment(section) {
  // get section name by it's data attribute
  let name = section.getAttribute("data-nav");
  let createdLi = document.createElement("li");

  //set id to the li
  createdLi.id = sectionCounter;
  createdLi.innerHTML = name;
  createdLi.classList.add("menu__link");
  createdLi.style.cursor = "pointer";
  fragment.appendChild(createdLi);
  sectionCounter++;
}

function moveToSection(ele) {
  console.log(ele.target);
  window.scrollTo({
    top: document.getElementById(`section${ele.target.id}`).offsetTop,
    behavior: "smooth",
  });
}

function FindActiveSection(ele) {
  const lis = nav.children;
  let num = Number(ele.id[7]) - 1;
  if (
    ele.getBoundingClientRect().top <= ele.clientHeight / 2.5 &&
    ele.getBoundingClientRect().bottom >= ele.clientHeight / 2.5
  ) {
    ele.classList.add("your-active-class");
    lis[num].classList.add("active__link");
  } else {
    ele.classList.remove("your-active-class");
    lis[num].classList.remove("active__link");
  }
}

main();
