const navBar = document.getElementById("navBar");
const navNavigation = document.getElementById("navNavigation");

//Navigation togglling on and off
navBar.addEventListener("click", () => {
  if (navNavigation.classList.contains("hidden")) {
    navNavigation.classList.remove("hidden");
    navNavigation.classList.add("block");
    navBar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 text-blue-700 font-semibold">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
      `;
  } else {
    navNavigation.classList.add("hidden");
    navNavigation.classList.remove("block");
    navBar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 text-blue-700 font-semibold">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
      `;
  }
});

//Navigation Scroll EventListener
const navigationBody = document.getElementById("navigationBody");
document.addEventListener("scroll", (scroll) => {
  navigationBody.style.position = "relative";
  if (scrollY > 200) {
    navigationBody.style.position = "fixed";
    navigationBody.classList.add("p-fixed");
  } else if (scrollY <= 0) {
    navigationBody.style.position = "relative";
    navigationBody.classList.remove("p-fixed");
  }
});

// //Create a pop up notification when user is done with creating account
// const newAccountNotification = document.getElementById("newAccountNotification");
// document.addeventListener("DOMContentLoaded", (e) => {
//   newAccountNotification.style.classList.replace("top-0", "top-20");
//   setTimeout(() => {
//     newAccountNotification.style.display = "none";
//   }, 5000)
// });

// //Exit the pop up notification
// document.getElementById("exitNotification").addEventListener("click", (e) => {
//   newAccountNotification.style.display = "none"
// })