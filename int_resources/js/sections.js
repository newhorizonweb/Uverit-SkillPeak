//*--|*|--*\\_____// Validation \\_____//*--|*|--*\\
const allSectionsArr = Array.from(document.querySelectorAll(".section"));
const inputsVal = document.querySelectorAll(".inp-val");
const pdfBtn = document.querySelector(".pdf-btn");
let isValidated = false;
function inputValidation() {
    isValidated = true;
    inputsVal.forEach((input) => {
        const closestSecIndex = allSectionsArr.indexOf(input.closest(".section")) + 1;
        const closestNavElem = document.querySelector(".nav-elem"
            + closestSecIndex);
        const closestSecElem = document.querySelector(".section"
            + closestSecIndex);
        if (!input.value) {
            closestNavElem.classList.add("validation-failed");
            input.classList.add("validation-failed");
            isValidated = false;
        }
        else {
            input.classList.remove("validation-failed");
            let hasValInp = true;
            inputsVal.forEach((input) => {
                if (closestSecElem?.contains(input) && !input.value) {
                    hasValInp = false;
                }
            });
            if (hasValInp) {
                closestNavElem.classList.remove("validation-failed");
            }
        }
    });
}
let clickedPdfBtn = false;
pdfBtn.addEventListener("click", function () {
    inputValidation();
    if (!clickedPdfBtn) {
        inputsVal.forEach(function (inpVal) {
            inpVal.addEventListener("input", function () {
                inputValidation();
            });
        });
    }
    if (isValidated) {
        window.print();
    }
    clickedPdfBtn = true;
});
//*--|*|--*\\_____// Inputs \\_____//*--|*|--*\\
const inputElements = document.querySelectorAll(".inp-add");
// Add output elements (for each .inp-add element)
function addOutputElements() {
    inputElements.forEach(function (inputElem) {
        const outputClass = inputElem.getAttribute("data-output");
        const output = document.querySelector("." + outputClass);
        inputElem.addEventListener("input", function () {
            // Change the element value to the input value
            if (output) {
                output.innerHTML = inputElem.value;
            }
        });
    });
}
addOutputElements();
// Insert value into the output
function addOutput(inputElem) {
    const outputClass = inputElem.getAttribute("data-output");
    const output = document.querySelector("." + outputClass);
    inputElem.addEventListener("input", function () {
        // Change the element value to the input value
        if (output) {
            output.innerHTML = inputElem.value;
        }
    });
}
// Append output
function appendOutput(appendTo, inputElem) {
    const outputClass = inputElem.getAttribute("data-output");
    // Create an element and append it
    const pdfOutput = document.createElement("p");
    pdfOutput.classList.add(outputClass);
    appendTo?.appendChild(pdfOutput);
    inputElem.addEventListener("input", function () {
        // Change the element value to the input value
        const output = document.querySelector("." + outputClass);
        if (output) {
            output.innerHTML = inputElem.value;
        }
    });
}
// Append output that is removed when there's no value
function appendRemoveableOutput(appendTo, inputElem) {
    let hasVal = false;
    const outputClass = inputElem.getAttribute("data-output");
    inputElem.addEventListener("input", function () {
        // If there was no data entered
        if (hasVal === false) {
            // Create an element and append it
            const pdfOutput = document.createElement("p");
            pdfOutput.classList.add(outputClass);
            appendTo?.appendChild(pdfOutput);
            // The data was entered, so set the variable to true
            hasVal = true;
        }
        const output = document.querySelector("." + outputClass);
        // If all of the data was removed - remove the appended element
        if (output &&
            inputElem.value.length === 0) {
            output.remove();
            hasVal = false;
        }
        // Change the element value to the input value
        if (output) {
            output.innerHTML = inputElem.value;
        }
    });
}
/*
const pdfElem:HTMLElement | null = document.querySelector(".pdfc-inner-inner");

const secInput:HTMLInputElement | null = document.querySelector(".sec-input1");
appendOutput(pdfElem, secInput);

const secInput2:HTMLInputElement | null = document.querySelector(".sec-input2");
appendOutput(pdfElem, secInput2);

const pdfName:HTMLInputElement | null = document.querySelector(".sec-name");
addOutput(pdfName);
*/
//*--|*|--*\\_____// Create Inputs \\_____//*--|*|--*\\
const pdfLinks = document.querySelector(".sec-link-list");
const pdfLinksOutput = document.querySelector(".pdf-links");
const addLinkBtn = document.querySelector(".add-link");
// Change the label text to the input value
function changeLabel(inputElem, labelElem) {
    inputElem.addEventListener("input", function () {
        labelElem.innerHTML = inputElem.value;
    });
}
// Add the link elements
let linkIndex = 0;
function addLink() {
    const linkNumber = pdfLinks?.querySelectorAll(".sec-link").length ?? 0;
    const linkLabelName = "Link Name";
    if (linkNumber < 5) {
        // Create a link div
        const newLinkDiv = document.createElement("div");
        newLinkDiv.classList.add("sec-link");
        /* Link Name */
        // Create a link name div
        const createSecElem1 = document.createElement("div");
        createSecElem1.classList.add("section-item");
        // Create a link name label
        const newLabel1 = document.createElement("label");
        newLabel1.setAttribute("for", "sec-link-name" + linkIndex);
        newLabel1.innerHTML = linkLabelName;
        // Create a link name input
        const newInput1 = document.createElement("input");
        newInput1.type = "text";
        newInput1.classList.add("sec-input", "sec-link-name" + linkIndex);
        newInput1.setAttribute("id", "sec-link-name" + linkIndex);
        newInput1.setAttribute("data-output", "pdf-link-name" + linkIndex);
        // Append the label and input
        createSecElem1?.appendChild(newLabel1);
        createSecElem1?.appendChild(newInput1);
        /* Link URL */
        // Create a link url div
        const createSecElem2 = document.createElement("div");
        createSecElem2.classList.add("section-item");
        // Create a link url label
        const newLabel2 = document.createElement("label");
        newLabel2.setAttribute("for", "sec-link-url" + linkIndex);
        newLabel2.innerHTML = "URL";
        // Create a link url input
        const newInput2 = document.createElement("input");
        newInput2.type = "text";
        newInput2.classList.add("sec-input", "sec-link-url" + linkIndex);
        newInput2.setAttribute("id", "sec-link-url" + linkIndex);
        newInput2.setAttribute("data-output", "pdf-link-url" + linkIndex);
        // Append the label and input
        createSecElem2?.appendChild(newLabel2);
        createSecElem2?.appendChild(newInput2);
        /* Delete Link Button */
        const deleteLinkBtn = document.createElement("div");
        deleteLinkBtn.classList.add("delete-btn", "delete-link");
        deleteLinkBtn.setAttribute("delete-name", "pdf-link-name" + linkIndex);
        deleteLinkBtn.setAttribute("delete-url", "pdf-link-url" + linkIndex);
        /* Append */
        // Append the link name and url divs to the section
        newLinkDiv?.appendChild(createSecElem1);
        newLinkDiv?.appendChild(createSecElem2);
        newLinkDiv?.appendChild(deleteLinkBtn);
        pdfLinks?.appendChild(newLinkDiv);
        // Append the link name and url output to the pdf
        appendOutput(pdfLinksOutput, newInput1);
        appendOutput(pdfLinksOutput, newInput2);
        // Set focus on the input
        if (linkNumber !== 0) {
            newInput1.focus();
        }
        // Change the input label
        changeLabel(newInput1, newLabel1);
        // Delete the link in the PDF
        deleteLinkBtn.addEventListener("click", function () {
            // PDF Link Label
            const pdfNameElemClass = document.querySelector("." +
                deleteLinkBtn.getAttribute("delete-name"));
            // PDF Link URL
            const pdfUrlElemClass = document.querySelector("." +
                deleteLinkBtn.getAttribute("delete-url"));
            if (linkNumber === 0) {
                // Remove the values if it's the first link element
                newLabel1.innerHTML = linkLabelName;
                newInput1.value = "";
                newInput2.value = "";
                pdfNameElemClass.innerHTML = "";
                pdfUrlElemClass.innerHTML = "";
            }
            else {
                // Remove the link element if it's not the first one
                newLinkDiv.remove();
                // Remove the link elements from the PDF preview
                pdfNameElemClass?.remove();
                pdfUrlElemClass?.remove();
            }
        });
        // Add 1 to the index
        linkIndex++;
    }
}
addLink();
addLinkBtn?.addEventListener("click", addLink);
//*--|*|--*\\_____// Image Upload \\_____//*--|*|--*\\
// Upload Icon
const uploadIcon = "<svg class='modal-icon lm-upload-icon' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><defs><style>.cls-1{fill:none;stroke-linecap:round;stroke-linejoin:round;}</style></defs><circle class='cls-1' cx='100' cy='100' r='90'/><path class='cls-1 lm-upload-inner' d='M145.6,116.6v15.9a15,15,0,0,1-15,15H69.4a15,15,0,0,1-15-15V116.6'/><line class='cls-1 lm-upload-inner lm-upload-arrow lm-upload-arrowshaft' x1='100' y1='121.9' x2='100' y2='52.5'/><polyline class='cls-1 lm-upload-inner lm-upload-arrow' points='124.7 77.2 100 52.5 75.3 77.2'/></svg>";
// Checkmark Icon
const checkmarkIcon = "<svg class='modal-icon lm-check-icon' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><defs><style>.cls-1{fill:none;stroke-linecap:round;stroke-linejoin:round;}</style></defs><circle class='cls-1 lm-check-circle' cx='100' cy='100' r='90'/><polyline class='cls-1 lm-checkmark' points='51.9 103 84.1 135.3 148.1 71.3'/></svg>";
// X Icon
const xIcon = "<svg class='modal-icon lm-x-icon' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><defs><style>.cls-1{fill:none; stroke-linecap:round;stroke-linejoin:round;}</style></defs><circle class='cls-1' cx='100' cy='100' r='90'/><line class='cls-1 lm-x-inner' x1='61.3' y1='61.3' x2='138.7' y2='138.7'/><line class='cls-1 lm-x-inner' x1='138.7' y1='61.3' x2='61.3' y2='138.7'/></svg>";
/* File Upload */
// Drop Zones (you can drop the file on these elements)
const dropZones = document.querySelectorAll(".drop-zone");
// Upload Time
const uploadTime = 1750;
// Accepted file types
const fileTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
/* Upload Functions */
// Insert logo
function insertImgElem(url, insertElements) {
    insertElements.forEach((logoElem) => {
        // Create an image element
        const logoImg = document.createElement("img");
        logoImg.src = url;
        logoImg.classList.add("insert-logo-img");
        logoImg.setAttribute("alt", "Uploaded Logo");
        // Remove previous content from the logo elements
        logoElem.innerHTML = "";
        // Append logo to the elements
        setTimeout(function () {
            logoElem.appendChild(logoImg);
        }, uploadTime);
    });
}
// Insert upload icon
function insertUploadIcon() {
    dropZones.forEach((dropZone) => {
        dropZone.innerHTML = uploadIcon;
    });
}
insertUploadIcon();
// Remove upload icon active class
function uploadIconActive() {
    dropZones.forEach((dropZone) => {
        dropZone?.classList.remove("modal-icon-active");
    });
}
// Insert X icon
function insertXIcon() {
    dropZones.forEach((dropZone) => {
        dropZone.innerHTML = xIcon;
    });
}
// Checkmark icon
function successfulUpload(dropZone) {
    dropZone.innerHTML = checkmarkIcon;
    // Insert the upload icon and remove the classes
    dropZones.forEach((dropZone) => {
        dropZone?.classList.remove("modal-icon-active");
        setTimeout(function () {
            insertUploadIcon();
            dropZone?.classList.remove("modal-drop");
        }, uploadTime);
    });
}
/* Document Events */
// Document drag events
function docDragOver(e) {
    e.preventDefault();
    // Get the file dragged over the document
    const file = e.dataTransfer?.items[0];
    dropZones.forEach((dropZone) => {
        if (file && fileTypes.includes(file.type)) {
            dropZone?.classList.add("modal-icon-active");
        }
        else if (file &&
            !fileTypes.includes(file.type) &&
            !dropZone?.contains(document.querySelector(".lm-x-icon"))) {
            // Insert X icon
            insertXIcon();
        }
    });
}
function docDragLeave(e) {
    // If the mouse is within the window - do nothing
    if (e.clientX > 0 && e.clientY > 0 &&
        e.clientX < window.innerWidth && e.clientY < window.innerHeight) {
        return;
    }
    // Insert upload icon
    insertUploadIcon();
    // Remove the active class
    uploadIconActive();
}
document.documentElement.addEventListener("dragover", function (e) {
    docDragOver(e);
});
document.body.addEventListener("dragleave", function (e) {
    docDragLeave(e);
});
// File on document drop
function docDrop(e) {
    // Prevent from opening the file in another tab
    e.preventDefault();
    if (e.target.closest(".drop-zone")) {
        return;
    }
    // Insert upload icon
    insertUploadIcon();
    // Remove the active class
    uploadIconActive();
}
document.documentElement.addEventListener("drop", function (e) {
    docDrop(e);
});
/* Drop Zone */
// Drag events
function fileDragOver(e, dropZone) {
    // Get the file dragged over the document
    const file = e.dataTransfer?.items[0];
    if (file && fileTypes.includes(file.type)) {
        dropZone?.classList.add("modal-drop");
    }
}
// Functions called on logo upload
function uploadFunctions(url, insertElements, dropZone) {
    // Successful Upload
    successfulUpload(dropZone);
    // Insert images into the page elements
    insertImgElem(url, insertElements);
}
// Drop zone drop event
function fileDrop(e, insertElements, dropZone) {
    // Prevent from opening the file in another tab
    e.preventDefault();
    // Get the dropped file
    const file = e.dataTransfer?.files[0];
    if (file && fileTypes.includes(file.type)) {
        // Create an URL object
        const url = URL.createObjectURL(file);
        uploadFunctions(url, insertElements, dropZone);
    }
    else {
        // Insert upload icon
        insertUploadIcon();
    }
}
// File upload via input
function fileInputUpload(insertElements, fileInput, dropZone) {
    const file = fileInput.files[0];
    console.log(fileInput);
    if (file && fileTypes.includes(file.type)) {
        // Create an URL object
        const url = URL.createObjectURL(file);
        uploadFunctions(url, insertElements, dropZone);
    }
    else if (file && !fileTypes.includes(file.type)) {
        // Input (in HTML) excludes undesired file types, but just in case
        // Insert X icon
        insertXIcon();
        // Insert upload icon after some time
        setTimeout(function () {
            insertUploadIcon();
        }, 1000);
    }
}
// Delete File
function fileDelete(insertElements) {
    insertElements.forEach((logoElem) => {
        logoElem.innerHTML = "";
    });
}
function fileEvents(dropZone, fileInput, deleteFileBtn, insertElements) {
    // Drop zone drag events
    dropZone?.addEventListener("dragover", function (e) {
        fileDragOver(e, dropZone);
    });
    dropZone?.addEventListener("dragleave", function () {
        dropZone?.classList.remove("modal-drop");
    });
    // Drop zone drop event
    dropZone?.addEventListener("drop", function (e) {
        fileDrop(e, insertElements, dropZone);
    });
    // File upload via input
    fileInput?.addEventListener("change", function () {
        fileInputUpload(insertElements, fileInput, dropZone);
    });
    // Delete file
    deleteFileBtn?.addEventListener("click", () => {
        fileDelete(insertElements);
    });
}
/* Photo */
// Drop zone element
const photoDropZone = document.querySelector(".photo-drop-zone");
// File input
const photoFileInput = document.querySelector(".photo-upload-btn");
// Insert image elements
const insertPhotos = document.querySelectorAll(".insert-photo");
// Delete file button
const deletePhotoBtn = document.querySelector(".delete-photo");
fileEvents(photoDropZone, photoFileInput, deletePhotoBtn, insertPhotos);
/* QR Code */
// Drop zone element
const dropZoneQR = document.querySelector(".qr-drop-zone");
// File input
const fileInputQR = document.querySelector(".qr-upload-btn");
// Insert image elements
const insertImagesQR = document.querySelectorAll(".qr-insert");
// Delete file button
const deleteFileBtnQR = document.querySelector(".qr-delete-file");
fileEvents(dropZoneQR, fileInputQR, deleteFileBtnQR, insertImagesQR);
