var menu = document.querySelector("#menu");
var dropMenu = document.querySelector("#dropMenu");
var closeMenu = document.querySelector("#close");
var filter = document.querySelector("#filter");
var dropFilter = document.querySelector("#dropFilter");
var shadow = document.querySelector("#shadow");

menu.addEventListener("click", () => {
   dropMenu.style.display = "block";
});

closeMenu.addEventListener("click", () => {
   dropMenu.style.display = "none";
});

filter.addEventListener("click", () => {
   // if (dropFilter.classList.contains("openFilter")) {
   //    dropFilter.classList.remove("openFilter");
   // } else {
   //    dropFilter.classList.add("openFilter");
   // }
   dropFilter.classList.toggle("openfilter");
   shadow.classList.toggle("activefilter");
   filter.classList.toggle("filterActive")
});