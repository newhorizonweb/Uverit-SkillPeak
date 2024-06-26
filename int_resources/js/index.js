/* Program Settings */
// Program Version
const programVersion = "v1.4.0";
/* Embedded SVG */
// Uverit Logo
const uveritLogo = "<svg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 604.944 172.884'><defs></defs><path class='cls-1' d='M204.528 236.239a12.641 12.641 0 0 1 9.46 3.85 13.2 13.2 0 0 1 3.74 9.57v55.88q0 23.322-12.98 36.96t-37.4 13.64q-24.42 0-37.29-13.64t-12.87-36.96v-55.88a13.191 13.191 0 0 1 3.74-9.57 13.547 13.547 0 0 1 18.92 0 13.2 13.2 0 0 1 3.74 9.57v55.88q0 13.421 5.94 19.909t17.82 6.49q12.1 0 18.04-6.49t5.94-19.909v-55.88a13.191 13.191 0 0 1 3.74-9.57 12.631 12.631 0 0 1 9.46-3.85zM251.606 236.239a14.831 14.831 0 0 1 7.7 2.09 12.851 12.851 0 0 1 5.28 6.27l32.34 73.92-4.84 2.2 33-75.9q3.738-8.8 11.66-8.36a12.064 12.064 0 0 1 8.91 3.41 11.511 11.511 0 0 1 3.41 8.47 11.165 11.165 0 0 1-.55 3.3 34.438 34.438 0 0 1-1.21 3.3l-41.14 90.64q-3.522 7.918-11.22 8.359a11.982 11.982 0 0 1-8.03-1.54 13.778 13.778 0 0 1-5.83-6.819l-40.92-90.64q-.444-1.1-.99-2.86a14.026 14.026 0 0 1-.55-4.18q0-3.96 3.52-7.81a12.193 12.193 0 0 1 9.46-3.85zM423.207 356.139q-18.7 0-32.45-7.81a53.9 53.9 0 0 1-21.12-21.23 61.99 61.99 0 0 1-7.369-30.36q0-19.8 8.029-33.77a56.786 56.786 0 0 1 21.011-21.45 54.247 54.247 0 0 1 27.5-7.48 50.063 50.063 0 0 1 21.228 4.62 58.1 58.1 0 0 1 17.711 12.65 61.556 61.556 0 0 1 12.209 18.59 56.546 56.546 0 0 1 4.512 22.44 11.3 11.3 0 0 1-4.182 8.58 13.99 13.99 0 0 1-9.238 3.3h-84.041l-6.6-22h80.74l-4.839 4.4v-5.94a20.116 20.116 0 0 0-4.51-11.44 29.51 29.51 0 0 0-10.121-8.03 28.833 28.833 0 0 0-12.869-2.97A41.735 41.735 0 0 0 406.487 260a23.635 23.635 0 0 0-9.9 5.94 28.836 28.836 0 0 0-6.6 11.22q-2.423 7.043-2.42 17.82 0 11.879 4.951 20.129a33.827 33.827 0 0 0 29.369 16.83 51.136 51.136 0 0 0 12.979-1.319 29.209 29.209 0 0 0 7.811-3.19q2.97-1.866 5.39-3.191a16.784 16.784 0 0 1 7.481-1.979 11.08 11.08 0 0 1 11.219 11q0 5.94-6.161 10.78-5.721 4.842-16.058 8.47a63.993 63.993 0 0 1-21.341 3.629zM509.664 353.938a12.623 12.623 0 0 1-9.46-3.849 13.177 13.177 0 0 1-3.74-9.57v-90.86a13.186 13.186 0 0 1 3.74-9.57 13.547 13.547 0 0 1 18.92 0 13.2 13.2 0 0 1 3.74 9.57v20.68l-1.54-14.74a34.257 34.257 0 0 1 6.27-9.35 37.237 37.237 0 0 1 8.69-6.82 39.467 39.467 0 0 1 10.34-4.07 46.963 46.963 0 0 1 11-1.32 16.832 16.832 0 0 1 11.11 3.74q4.506 3.743 4.51 8.8 0 7.26-3.74 10.45a12.292 12.292 0 0 1-8.14 3.19 18.2 18.2 0 0 1-7.59-1.54 18.847 18.847 0 0 0-7.81-1.54 19.163 19.163 0 0 0-8.03 1.87 22.111 22.111 0 0 0-7.48 5.83 30.7 30.7 0 0 0-5.5 9.79 40.733 40.733 0 0 0-2.09 13.75v52.14a13.193 13.193 0 0 1-3.74 9.57 12.631 12.631 0 0 1-9.46 3.849zM603.382 221.939q-7.482 0-10.561-2.42t-3.08-8.58v-4.18q0-6.378 3.41-8.69t10.451-2.31q7.7 0 10.78 2.42t3.08 8.58v4.18q0 6.384-3.3 8.69t-10.78 2.31zm13.42 118.58a13.193 13.193 0 0 1-3.74 9.57 13.55 13.55 0 0 1-18.92 0 13.178 13.178 0 0 1-3.741-9.57v-90.86a13.187 13.187 0 0 1 3.741-9.57 13.547 13.547 0 0 1 18.92 0 13.2 13.2 0 0 1 3.74 9.57zM645.18 238.439h52.139a12.032 12.032 0 0 1 12.321 12.32 11.317 11.317 0 0 1-3.521 8.47 12.137 12.137 0 0 1-8.8 3.41H645.18a12.032 12.032 0 0 1-12.321-12.32 11.318 11.318 0 0 1 3.521-8.47 12.143 12.143 0 0 1 8.8-3.41zm23.54-27.5a12.285 12.285 0 0 1 9.349 3.85 13.416 13.416 0 0 1 3.63 9.57v97.9a9.56 9.56 0 0 0 1.21 5.059 6.91 6.91 0 0 0 3.3 2.861 11.464 11.464 0 0 0 4.51.88 11.651 11.651 0 0 0 4.84-.991 12.217 12.217 0 0 1 5.059-.989 7.418 7.418 0 0 1 5.61 2.859q2.527 2.863 2.531 7.92 0 6.163-6.71 10.121a27.885 27.885 0 0 1-14.41 3.959 75.337 75.337 0 0 1-10.231-.769 27.629 27.629 0 0 1-10.559-3.74 22.881 22.881 0 0 1-8.25-9.13q-3.3-6.157-3.3-16.941v-99a13.152 13.152 0 0 1 13.42-13.42z' transform='translate(-104.696 -195.759)'/><path class='cls-2' d='M167.348 368.643c-19.785 0-35.391-5.91-46.386-17.564-10.412-11.035-15.881-25.686-16.257-43.554 0-.085-.008-.171-.009-.259a4 4 0 0 1 3.945-4.2h.053a4 4 0 0 1 4 4.087c.3 15.916 5.035 28.849 14.082 38.437 9.423 9.989 23.072 15.054 40.567 15.054s31.167-5.06 40.663-15.039c9.436-9.916 14.221-23.4 14.221-40.065v-55.88a17.866 17.866 0 0 0-5.02-12.715 16.9 16.9 0 0 0-11.261-5.16 4.008 4.008 0 1 1 .428-8 5.2 5.2 0 0 1 .627.061 24.994 24.994 0 0 1 15.944 7.526 25.719 25.719 0 0 1 7.282 18.29v55.88c0 18.79-5.526 34.126-16.425 45.58-11.061 11.625-26.692 17.521-46.454 17.521z' transform='translate(-104.696 -195.759)'/><path class='cls-2' d='M167.348 327.435c-6.66 0-11.4-1.646-14.5-5.03-3.156-3.446-4.757-9.121-4.757-16.866v-55.88a17.865 17.865 0 0 0-5.02-12.715 16.894 16.894 0 0 0-11.25-5.159 4.008 4.008 0 1 1 .43-8 4.886 4.886 0 0 1 .632.062 24.988 24.988 0 0 1 15.925 7.524 25.714 25.714 0 0 1 7.283 18.29v55.88c0 7.729 1.859 10.592 2.658 11.465 1.476 1.613 4.368 2.431 8.6 2.431 4.314 0 7.362-.839 8.815-2.427 1.511-1.651 2.471-5.267 2.635-9.923a4.005 4.005 0 1 1 8 .225c0 .135-.01.268-.023.4-.289 6.676-1.874 11.6-4.715 14.7-3.048 3.331-7.999 5.023-14.713 5.023z' transform='translate(-104.696 -195.759)'/></svg>";
// Body
const body = document.body;
/* Insert Uverit Logo into the HTML elements */
const logoElements = document.querySelectorAll(".uverit-logo");
logoElements.forEach((logoElem) => {
    logoElem.innerHTML = uveritLogo;
});
/* Hide Landing Page Button */
const cvBtn = document.querySelector(".lp-btn");
cvBtn.addEventListener("click", () => {
    body.classList.add("hide-modal");
    // Display a popup when the user is trying to leave the page
    window.addEventListener("beforeunload", function (e) {
        e.preventDefault();
        // Prompt the user with a custom message (usually custom messages are unsupported, but it is what it is)
        e.returnValue = 'Are you sure you want to leave this page? Your changes will not be saved.';
    });
});
document.addEventListener("DOMContentLoaded", function () {
    //*--|*|--*\\_____// Navigation \\_____//*--|*|--*\\
    const navInner = document.querySelector(".nav-inner");
    const navElements = document.querySelectorAll(".nav-elem");
    const navMark = document.querySelector(".nav-mark");
    const closeNavBtn = document.querySelector(".nav-close");
    const settingsBtn = document.querySelector(".settings-btn");
    const sections = document.querySelectorAll(".section");
    function removeNavClass() {
        navElements.forEach((navElem) => {
            navElem.classList.remove("curr-section");
            navElem.classList.remove("curr-pos");
        });
    }
    navElements.forEach((navElem) => {
        navElem.addEventListener("click", function () {
            // Appear the nav mark
            navMark?.classList.remove("mark-invisible");
            // Add a class to the clicked nav element
            removeNavClass();
            this.classList.add("curr-section");
            this.classList.add("curr-pos");
            // Remove the "nav-not-opened" class
            navElements.forEach((navElem) => {
                navElem.classList.remove("nav-not-opened");
            });
            // Remove the class from the settings button
            settingsBtn?.classList.remove("open-settings");
            // Add a class to the current section
            const navLink = navElem.getAttribute("data-link");
            sections.forEach((section) => {
                const sectionLink = section.getAttribute("data-link");
                section.classList.remove("visible-section");
                if (navLink === sectionLink) {
                    section.classList.add("visible-section");
                }
            });
            // Open / close the nav (smaller screen sizes)
            if (navElem.classList.contains("curr-section")) {
                navInner?.classList.toggle("open-nav");
            }
        });
    });
    // Hide Nav (smaller screen sizes)
    function closeNav() {
        navInner?.classList.remove("open-nav");
    }
    closeNavBtn?.addEventListener("click", closeNav);
    window.addEventListener("resize", closeNav);
    document.addEventListener("click", function (e) {
        const eTarget = e.target;
        if (!eTarget?.closest('.nav-inner')) {
            closeNav();
        }
    });
    /* Settings Button */
    settingsBtn?.addEventListener("click", function () {
        // Fade in/out the settings section
        settingsBtn.classList.toggle("open-settings");
        sections.forEach((section) => {
            const sectionLink = section.getAttribute("data-link");
            if (sectionLink === "settings-section") {
                section.classList.toggle("visible-section");
            }
        });
    });
    /* Expand / Close PDF Buttons */
    const expandPdfBtn = document.querySelector(".expand-pdf-btn");
    const closePdfBtn = document.querySelector(".close-pdf-btn");
    expandPdfBtn?.addEventListener("click", function () {
        body.classList.add("pdf-expanded");
    });
    closePdfBtn?.addEventListener("click", function () {
        body.classList.remove("pdf-expanded");
    });
    //*--|*|--*\\_____// Section Navigation \\_____//*--|*|--*\\
    const secNavPrev = document.querySelector(".sec-nav-prev");
    const secNavNext = document.querySelector(".sec-nav-next");
    function findCurrElem() {
        const navElemArr = Array.from(navElements);
        let elemIndex = navElemArr.findIndex(function (element) {
            return element.classList.contains("curr-section");
        });
        return elemIndex;
    }
    function navigateToSection(actElemIndex, actElemPos) {
        // Add a "nav-not-opened" class
        navElements.forEach((navElem) => {
            navElem.classList.add("nav-not-opened");
        });
        // Remove the class from the settings button
        settingsBtn?.classList.remove("open-settings");
        // Add a class to the nav element
        removeNavClass();
        navElements[actElemIndex].classList.add("curr-section");
        navElements[actElemIndex].classList.add("curr-pos");
        // Add a class to the action section
        const sectionIndex = "section" + actElemPos;
        sections.forEach((section) => {
            const sectionLink = section.getAttribute("data-link");
            section.classList.remove("visible-section");
            if (sectionIndex === sectionLink) {
                section.classList.add("visible-section");
            }
        });
    }
    // Prev
    secNavPrev?.addEventListener("click", function () {
        // Find the current nav section element
        findCurrElem();
        const elemIndex = findCurrElem();
        const navElemArr = Array.from(navElements);
        const elemPos = elemIndex + 1;
        let actElemPos = 0;
        let actElemIndex = 0;
        // Current position
        if (elemPos !== 1) {
            actElemPos = elemPos - 1;
        }
        else {
            actElemPos = navElemArr.length;
        }
        // Previous element index
        if (elemIndex !== 0) {
            actElemIndex = elemIndex - 1;
        }
        else {
            actElemIndex = navElemArr.length - 1;
        }
        // Change the current nav element and section
        navigateToSection(actElemIndex, actElemPos);
    });
    // Next
    secNavNext?.addEventListener("click", function () {
        // Find the current nav section element
        findCurrElem();
        const elemIndex = findCurrElem();
        const navElemArr = Array.from(navElements);
        const elemPos = elemIndex + 1;
        let actElemPos = 0;
        let actElemIndex = 0;
        // Current position
        if (elemPos !== navElemArr.length) {
            actElemPos = elemPos + 1;
        }
        else {
            actElemPos = 1;
        }
        // Next element index
        if (elemIndex !== navElemArr.length - 1) {
            actElemIndex = elemIndex + 1;
        }
        else {
            actElemIndex = 0;
        }
        // Change the current nav element and section
        navigateToSection(actElemIndex, actElemPos);
    });
    //*--|*|--*\\_____// Version \\_____//*--|*|--*\\
    const programVersionElem = document.querySelector(".program-version");
    programVersionElem.innerHTML = `Uverit SkillPeak ${programVersion}`;
    //*--|*|--*\\_____// Scroll \\_____//*--|*|--*\\
    function topPageScroll() {
        window.scrollTo(0, 0);
    }
    setTimeout(() => {
        // Make sure to scroll the page to X = 0 && Y = 0 on load 
        topPageScroll();
    }, 100);
});
