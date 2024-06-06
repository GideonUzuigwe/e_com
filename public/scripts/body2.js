
const carousel = document.getElementById("carousel");
const __carouselNavigator = document.querySelectorAll(".__carouselNavigator");

//Handle Star Reviews
const starSpan = document.querySelectorAll("#starSpan");
starSpan.forEach((element) => {
    for (var i = 0; i < 4; i++) {
        element.innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4"><path fill-rule="evenodd" d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z" clip-rule="evenodd" /></svg>`;
    }
});

const scrollers = document.querySelectorAll("#scroller");
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
    carouselNavigator();
}

//Handle Scroller Animation
function addAnimation() {
    scrollers.forEach(scroller => {
        scroller.setAttribute("data-animated", true);

        const scrollBarInner = scroller.querySelectorAll("#scrollBarInner");
        scrollBarInner.forEach(innerScroller => {
            const scrollChildren = Array.from(innerScroller.children);
            scrollChildren.forEach(child => {
                const duplicatedItem = child.cloneNode(true);
                duplicatedItem.setAttribute("arial-hidden", true);
                innerScroller.appendChild(duplicatedItem);
            })
        })
    })
};

//Handle Carousel Navigator
function carouselNavigator() {
    __carouselNavigator.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = e.target.parentElement.id;
            const data = id === "previous" ? -1 : 1;
            const scrollAmount = carousel.clientWidth * data;
            carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
        })
    })
}

const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
function handleScrollNavigator() {
    __carouselNavigator[0].style.display = carousel.scrollLeft <= 0 ? "none" : "flex";
    __carouselNavigator[1].style.display = carousel.scrollLeft >= maxScrollLeft ? "none" : "flex";
}

carousel.addEventListener("scroll", (e) => {
    handleScrollNavigator();
})