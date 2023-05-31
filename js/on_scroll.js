const scrollItems = document.querySelectorAll(".scroll-item");

const elementInView = function(el, offset = 0) {
    const elTop = el.getBoundingClientRect().top;
    const elBot = el.getBoundingClientRect().bottom;
    /* console.log(elTop);
    console.log(elBot);
    console.log(window.innerHeight);
    console.log(document.documentElement.clientHeight); */
    return (elTop <= (document.documentElement.clientHeight) - offset/2) &&
    (elBot >= offset);
}

const displayEl = function(e){
    e.classList.add("scrolled");
    e.classList.remove("scrolled-out");
}

const hideEl = function(e){
    e.classList.add("scrolled-out");
    e.classList.remove("scrolled");
}

const scrollAnim = function(){
    //check if elements are in view
    //if elements in view add scrolled class
    //else if outside view add scrolled class
    scrollItems.forEach(e => {
        if(elementInView(e, 150)){
            displayEl(e);
        }else{
            hideEl(e);
        }
    })
}

//whenever user scrolls check scroll animations
document.querySelector("#links").addEventListener("scroll", () => {
    scrollAnim();
});

window.onload(scrollAnim());
