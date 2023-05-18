    

    
    /* Remove transition on page load (flash) */

const bodyElem:HTMLElement = document.getElementsByTagName("body")[0];

setTimeout(function(){
    bodyElem.classList.add("add-transition");
}, 20);



    /* Dark Mode */

// It's not in order to maximize the performance (don't flash light theme on page load)

const dmBtn:HTMLInputElement | null = document.querySelector(".dm-btn");

// Set visit counter
let visit:number | null = localStorage.getItem('visit') ? parseInt(localStorage.getItem('visit')!) : null;

// If user's device is set to dark mode, set it on the first page visit
if (visit === null){
    visit = 0;
    
    if (window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches){
        dmBtn!.checked = true;
        localStorage.setItem("dm-checkbox", dmBtn!.checked.toString());
    }
}

// Get the dark mode state and set it to the dm toggle
let dmState:boolean | null = JSON.parse(localStorage.getItem("dm-checkbox") || "null");
if (dmState !== null){
    bodyElem.classList.toggle("dark-mode", dmState);
}

// Check the dark-mode toggle
if (dmBtn !== null && dmState !== null){
    dmBtn.checked = dmState;
}

// Update the visit counter
if (visit !== null) {
    visit++;
    localStorage.setItem('visit', visit.toString());
}

// Set dark mode on toggle
if (dmBtn !== null){
    dmBtn.addEventListener("click", function(){
        localStorage.setItem("dm-checkbox", dmBtn.checked.toString());
        const dmState = JSON.parse(localStorage.getItem("dm-checkbox") || "null") as boolean | null;

        if (dmState !== null) {
            bodyElem.classList.toggle("dark-mode", dmState);
        }
    });
}



    /* Set the page to always load at the left - top side */

function scrollToTopLeft(){
    setTimeout(function(){
        window.scrollTo(0, 0);
    }, 0);
}
window.addEventListener('load', scrollToTopLeft);