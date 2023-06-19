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
//*--|*|--*\\_____// Input to Output \\_____//*--|*|--*\\
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
    pdfOutput.classList.add("app-elem", outputClass);
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
//*--|*|--*\\_____// Create HTML Elements \\_____//*--|*|--*\\
// Create a Div
function createDiv(elemObj, elemIndex) {
    const elemClasses = elemObj.elemClasses;
    const elemIndexClasses = elemObj.elemIndexClasses;
    const newElem = document.createElement("div");
    if (elemClasses.trim() != "") {
        const classNames = elemClasses.split(", ");
        newElem.classList.add(...classNames);
    }
    if (elemIndexClasses.trim() != "") {
        const classNamesIndex = elemIndexClasses.split(", ");
        classNamesIndex.forEach((classIndex) => {
            newElem.classList.add(classIndex + elemIndex);
        });
    }
    return newElem;
}
// Create a Label
function createLabel(elemObj, elemIndex) {
    const elemName = elemObj.elemName;
    const elemFor = elemObj.elemFor;
    const elemClasses = elemObj.elemClasses;
    const elemIndexClasses = elemObj.elemIndexClasses;
    const newElem = document.createElement("label");
    if (elemClasses.trim() != "") {
        const classNames = elemClasses.split(", ");
        newElem.classList.add(...classNames);
    }
    if (elemIndexClasses.trim() != "") {
        const classNamesIndex = elemIndexClasses.split(", ");
        classNamesIndex.forEach((classIndex) => {
            newElem.classList.add(classIndex + elemIndex);
        });
    }
    newElem.setAttribute("for", elemFor + elemIndex);
    newElem.innerHTML = elemName;
    return newElem;
}
// Create an Input
function createInput(elemObj, elemIndex) {
    const elemType = elemObj.elemType;
    const elemId = elemObj.elemId;
    const elemClasses = elemObj.elemClasses;
    const elemIndexClasses = elemObj.elemIndexClasses;
    const elemPlaceholder = elemObj.elemPlaceholder;
    const elemDataOutput = elemObj.elemDataOutput;
    const newElem = document.createElement("input");
    newElem.type = elemType;
    if (elemClasses.trim() != "") {
        const classNames = elemClasses.split(", ");
        newElem.classList.add(...classNames);
    }
    if (elemIndexClasses.trim() != "") {
        const classNamesIndex = elemIndexClasses.split(", ");
        classNamesIndex.forEach((classIndex) => {
            newElem.classList.add(classIndex + elemIndex);
        });
    }
    newElem.setAttribute("id", elemId + elemIndex);
    newElem.setAttribute("placeholder", elemPlaceholder);
    newElem.setAttribute("data-output", elemDataOutput + elemIndex);
    return newElem;
}
// Create a TextArea
function createTextArea(elemObj, elemIndex) {
    const elemId = elemObj.elemId;
    const elemClasses = elemObj.elemClasses;
    const elemIndexClasses = elemObj.elemIndexClasses;
    const elemPlaceholder = elemObj.elemPlaceholder;
    const elemDataOutput = elemObj.elemDataOutput;
    const newElem = document.createElement("textarea");
    if (elemClasses.trim() != "") {
        const classNames = elemClasses.split(", ");
        newElem.classList.add(...classNames);
    }
    if (elemIndexClasses.trim() != "") {
        const classNamesIndex = elemIndexClasses.split(", ");
        classNamesIndex.forEach((classIndex) => {
            newElem.classList.add(classIndex + elemIndex);
        });
    }
    newElem.setAttribute("id", elemId + elemIndex);
    newElem.setAttribute("placeholder", elemPlaceholder);
    newElem.setAttribute("data-output", elemDataOutput + elemIndex);
    return newElem;
}
// Create a Button
function createBtn(elemObj, elemIndex) {
    const elemClasses = elemObj.elemClasses;
    const elemIndexClasses = elemObj.elemIndexClasses;
    const newElem = document.createElement("button");
    if (elemClasses.trim() != "") {
        const classNames = elemClasses.split(", ");
        newElem.classList.add(...classNames);
    }
    if (elemIndexClasses.trim() != "") {
        const classNamesIndex = elemIndexClasses.split(", ");
        classNamesIndex.forEach((classIndex) => {
            newElem.classList.add(classIndex + elemIndex);
        });
    }
    return newElem;
}
/*
const divElemObj:Object = {
    elemClasses: "",
    elemIndexClasses: ""
}

const labelElemObj:Object = {
    elemName: "",
    elemFor: "",
    elemClasses: "",
    elemIndexClasses: ""
}

const inputElemObj:Object = {
    elemType: "",
    elemId: "",
    elemClasses: "",
    elemIndexClasses: "",
    elemPlaceholder: "",
    elemDataOutput: ""
}

const textareaElemObj:Object = {
    elemId: "",
    elemClasses: "",
    elemIndexClasses: "",
    elemPlaceholder: "",
    elemDataOutput: ""
}

const btnElemObj:Object = {
    elemClasses: "",
    elemIndexClasses: ""
}
*/
//*--|*|--*\\_____// Create Links \\_____//*--|*|--*\\
const pdfLinks = document.querySelector(".sec-link-list");
const pdfLinksOutput = document.querySelector(".pdf-links");
const addLinkBtn = document.querySelector(".add-link");
// Change the label text to the input value
function changeLabel(inputElem, labelElem, labelName) {
    inputElem.addEventListener("input", function () {
        if (inputElem.value != "") {
            labelElem.innerHTML = inputElem.value;
        }
        else {
            labelElem.innerHTML = labelName;
        }
    });
}
const linkLabelName = "Link Name";
const linkDivObj = {
    elemClasses: "sec-link",
    elemIndexClasses: ""
};
const linkElem1Obj = {
    elemClasses: "section-item",
    elemIndexClasses: ""
};
const linkElem2Obj = {
    elemClasses: "section-item",
    elemIndexClasses: ""
};
const deleteLinkBtnObj = {
    elemClasses: "delete-btn, delete-link",
    elemIndexClasses: ""
};
const newLabel1Obj = {
    elemName: linkLabelName,
    elemFor: "sec-link-name",
    elemClasses: "",
    elemIndexClasses: ""
};
const newLabel2Obj = {
    elemName: "URL",
    elemFor: "sec-link-url",
    elemClasses: "",
    elemIndexClasses: ""
};
const newInput1Obj = {
    elemType: "text",
    elemId: "sec-link-name",
    elemClasses: "sec-input",
    elemIndexClasses: "sec-link-name",
    elemPlaceholder: "LinkedIn Profile",
    elemDataOutput: "pdf-link-name"
};
const newInput2Obj = {
    elemType: "text",
    elemId: "sec-link-url",
    elemClasses: "sec-input",
    elemIndexClasses: "sec-link-url",
    elemPlaceholder: "https://www.linkedin.com/in/johndoe",
    elemDataOutput: "pdf-link-url"
};
let linkIndex = 0;
function addLink() {
    const linkNumber = pdfLinks?.querySelectorAll(".sec-link").length ?? 0;
    if (linkNumber < 5) {
        // Create a link div
        const newLinkDiv = createDiv(linkDivObj, linkIndex);
        /* Link Name */
        // Create a link name div
        const linkElem1 = createDiv(linkElem1Obj, linkIndex);
        // Create a link name label
        const newLabel1 = createLabel(newLabel1Obj, linkIndex);
        // Create a link name input
        const newInput1 = createInput(newInput1Obj, linkIndex);
        // Append the label and input
        linkElem1?.appendChild(newLabel1);
        linkElem1?.appendChild(newInput1);
        /* Link URL */
        // Create a link url div
        const linkElem2 = createDiv(linkElem2Obj, linkIndex);
        // Create a link url label
        const newLabel2 = createLabel(newLabel2Obj, linkIndex);
        // Create a link url input
        const newInput2 = createInput(newInput2Obj, linkIndex);
        // Append the label and input
        linkElem2?.appendChild(newLabel2);
        linkElem2?.appendChild(newInput2);
        /* Delete Link Button */
        const deleteLinkBtn = createDiv(deleteLinkBtnObj, linkIndex);
        deleteLinkBtn.setAttribute("delete-name", "pdf-link-name" + linkIndex);
        deleteLinkBtn.setAttribute("delete-url", "pdf-link-url" + linkIndex);
        /* Append */
        // Append the link name and url divs to the section
        newLinkDiv?.appendChild(linkElem1);
        newLinkDiv?.appendChild(linkElem2);
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
        changeLabel(newInput1, newLabel1, linkLabelName);
        // Delete the link in the PDF
        deleteLinkBtn.addEventListener("click", function () {
            // PDF Link Label
            const pdfNameElemClass = document.querySelector("." +
                deleteLinkBtn.getAttribute("delete-name"));
            // PDF Link URL
            const pdfUrlElemClass = document.querySelector("." +
                deleteLinkBtn.getAttribute("delete-url"));
            // Remove the section link element if it's not the first one
            newLinkDiv.remove();
            // Remove the link elements from the PDF preview
            pdfNameElemClass?.remove();
            pdfUrlElemClass?.remove();
        });
        // Index number =+ 1
        linkIndex++;
    }
}
addLinkBtn?.addEventListener("click", addLink);
//*--|*|--*\\_____// Work Experience \\_____//*--|*|--*\\
// SVG
const bpListIcon = "<svg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><line class='cls-1' x1='51.4' y1='19' x2='191' y2='19.2'/><path class='cls-2' d='M191,28.2h0L51.4,28a9,9,0,0,1,0-18h0l139.6.2a9,9,0,0,1,0,18Z'/><path class='cls-2' d='M9,28l-1.7-.2-1.7-.5A8,8,0,0,1,4,26.5L2.6,25.4,1.5,24a8,8,0,0,1-.8-1.6,9.8,9.8,0,0,1-.5-1.6A11,11,0,0,1,0,19a9.4,9.4,0,0,1,2.6-6.4L4,11.5l1.6-.8,1.7-.5a6.9,6.9,0,0,1,3.5,0l1.7.5,1.5.8,1.4,1.1A7.6,7.6,0,0,1,16.5,14a8,8,0,0,1,.8,1.6,9.8,9.8,0,0,1,.5,1.6A5.5,5.5,0,0,1,18,19a5.5,5.5,0,0,1-.2,1.8,9.8,9.8,0,0,1-.5,1.6,8,8,0,0,1-.8,1.6,13.4,13.4,0,0,1-1.1,1.4A9.4,9.4,0,0,1,9,28Z'/><line class='cls-1' x1='51.4' y1='180.8' x2='191' y2='181'/><path class='cls-2' d='M191,190h0l-139.6-.2a9,9,0,0,1,0-18h0L191,172a9,9,0,0,1,0,18Z'/><path class='cls-2' d='M9,189.8a9,9,0,0,1-6.4-2.6,7.6,7.6,0,0,1-1.1-1.4,10.9,10.9,0,0,1-.8-1.5,10.9,10.9,0,0,1-.5-1.7,11,11,0,0,1-.2-1.8,11.1,11.1,0,0,1,.2-1.7,8.4,8.4,0,0,1,.5-1.7l.8-1.6a6.9,6.9,0,0,1,1.1-1.3A9.1,9.1,0,0,1,9,171.8a9.1,9.1,0,0,1,6.4,2.7,6.9,6.9,0,0,1,1.1,1.3l.8,1.6a8.4,8.4,0,0,1,.5,1.7,11.1,11.1,0,0,1,.2,1.7,11,11,0,0,1-.2,1.8,10.9,10.9,0,0,1-.5,1.7,10.9,10.9,0,0,1-.8,1.5,7.6,7.6,0,0,1-1.1,1.4A9,9,0,0,1,9,189.8Z'/><line class='cls-1' x1='51.4' y1='99.9' x2='191' y2='100.1'/><path class='cls-2' d='M191,109.1h0l-139.6-.2a9,9,0,0,1,0-18h0l139.6.2a9,9,0,0,1,0,18Z'/><path class='cls-2' d='M9,108.9a9,9,0,0,1-6.4-2.6,7.6,7.6,0,0,1-1.1-1.4,10.9,10.9,0,0,1-.8-1.5,15.4,15.4,0,0,1-.5-1.7A11,11,0,0,1,0,99.9a8.8,8.8,0,0,1,.2-1.7,8.4,8.4,0,0,1,.5-1.7,8,8,0,0,1,.8-1.6,6.9,6.9,0,0,1,1.1-1.3,9.1,9.1,0,0,1,8.2-2.5l1.6.5,1.6.8,1.4,1.2a6.9,6.9,0,0,1,1.1,1.3,8,8,0,0,1,.8,1.6,8.4,8.4,0,0,1,.5,1.7,8.8,8.8,0,0,1,.2,1.7,11,11,0,0,1-.2,1.8,15.4,15.4,0,0,1-.5,1.7,10.9,10.9,0,0,1-.8,1.5,7.6,7.6,0,0,1-1.1,1.4L14,107.4l-1.6.8a10.4,10.4,0,0,1-1.6.6Z'/></svg>";
const numberListIcon = "<svg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><line class='cls-1' x1='119.5' y1='19' x2='191' y2='19.2'/><path class='cls-2' d='M191,28.2h0L119.5,28a9,9,0,0,1,0-18h0l71.5.2a9,9,0,0,1,0,18Z'/><line class='cls-1' x1='119.5' y1='180.8' x2='191' y2='181'/><path class='cls-2' d='M191,190h0l-71.5-.2a9,9,0,0,1,0-18h0l71.5.2a9,9,0,0,1,0,18Z'/><line class='cls-1' x1='119.5' y1='99.9' x2='191' y2='100.1'/><path class='cls-2' d='M191,109.1h0l-71.5-.2a9,9,0,0,1,0-18h0l71.5.2a9,9,0,0,1,0,18Z'/><path d='M52.6,191.5a8.5,8.5,0,0,1-6-2.3,7.8,7.8,0,0,1-2.3-5.5V27.2l2.9,2.6L12.6,53.2a8,8,0,0,1-4.4,1.3,7.6,7.6,0,0,1-5.6-2.6A7.7,7.7,0,0,1,.1,46.4a7.3,7.3,0,0,1,4.2-6.7L47.7,11.1a10.4,10.4,0,0,1,3.2-1.5,7.8,7.8,0,0,1,3-.1A7,7,0,0,1,59.1,12a8.1,8.1,0,0,1,1.8,5.3V183.7a7.4,7.4,0,0,1-2.3,5.5A8.3,8.3,0,0,1,52.6,191.5Z'/></svg>";
// Elements
const expList = document.querySelector(".experience-list");
const addExpBtn = document.querySelector(".add-experience");
const appendExp = document.querySelector(".exp-append");
const notSpecified = "Not Specified";
/* Element Objects */
const listSectionObj = {
    elemClasses: "sec-list-elem, dock-inner",
    elemIndexClasses: ""
};
const listHeadObj = {
    elemClasses: "sec-list-head",
    elemIndexClasses: ""
};
const deleteListBtnObj = {
    elemClasses: "delete-btn, delete-list",
    elemIndexClasses: ""
};
const listIndicatorObj = {
    elemClasses: "sec-list-indicator",
    elemIndexClasses: ""
};
const secInputsObj = {
    elemClasses: "sec-list-inputs",
    elemIndexClasses: ""
};
const secItemObj = {
    elemClasses: "section-item",
    elemIndexClasses: ""
};
const jobTitleLabObj = {
    elemName: "Job Title",
    elemFor: "sec-job-title",
    elemClasses: "list-label",
    elemIndexClasses: ""
};
const jobTitleInpObj = {
    elemType: "text",
    elemId: "sec-job-title",
    elemClasses: "sec-input",
    elemIndexClasses: "sec-job-title",
    elemPlaceholder: "Front-end Web Dev",
    elemDataOutput: "pdf-job-title"
};
const compLabObj = {
    elemName: "Company",
    elemFor: "sec-company",
    elemClasses: "list-label",
    elemIndexClasses: ""
};
const compInpObj = {
    elemType: "text",
    elemId: "sec-company",
    elemClasses: "sec-input",
    elemIndexClasses: "sec-company",
    elemPlaceholder: "Meta Platforms",
    elemDataOutput: "pdf-company"
};
const locationLabObj = {
    elemName: "Location",
    elemFor: "sec-location",
    elemClasses: "list-label",
    elemIndexClasses: ""
};
const locationInpObj = {
    elemType: "text",
    elemId: "sec-location",
    elemClasses: "sec-input",
    elemIndexClasses: "sec-location",
    elemPlaceholder: "New York City",
    elemDataOutput: "pdf-location"
};
const startDateLabObj = {
    elemName: "Start Date",
    elemFor: "sec-start-date",
    elemClasses: "list-label",
    elemIndexClasses: ""
};
const startDateInpObj = {
    elemType: "date",
    elemId: "sec-start-date",
    elemClasses: "sec-input",
    elemIndexClasses: "sec-start-date",
    elemPlaceholder: "",
    elemDataOutput: "pdf-start-date"
};
const endDateLabObj = {
    elemName: "End Date",
    elemFor: "sec-end-date",
    elemClasses: "list-label",
    elemIndexClasses: ""
};
const endDateInpObj = {
    elemType: "date",
    elemId: "sec-end-date",
    elemClasses: "sec-input",
    elemIndexClasses: "sec-end-date",
    elemPlaceholder: "",
    elemDataOutput: "pdf-end-date"
};
const currPosLabObj = {
    elemName: "I still work here",
    elemFor: "sec-curr-pos",
    elemClasses: "list-label",
    elemIndexClasses: ""
};
const descDivObj = {
    elemClasses: "list-desc-inner",
    elemIndexClasses: ""
};
const descBtnsDivObj = {
    elemClasses: "list-desc-btns",
    elemIndexClasses: ""
};
const boldBtnObj = {
    elemClasses: "list-desc-btn, list-bold-btn",
    elemIndexClasses: ""
};
const italicBtnObj = {
    elemClasses: "list-desc-btn, list-italic-btn",
    elemIndexClasses: ""
};
const underlineBtnObj = {
    elemClasses: "list-desc-btn, list-underline-btn",
    elemIndexClasses: ""
};
const nrListBtnObj = {
    elemClasses: "list-desc-btn, list-list-btn, list-nr-list-btn",
    elemIndexClasses: ""
};
const bpListBtnObj = {
    elemClasses: "list-desc-btn, list-list-btn, list-bp-list-btn",
    elemIndexClasses: ""
};
const descTextAreaObj = {
    elemClasses: "sec-list-desc",
    elemIndexClasses: ""
};
let expIndex = 0;
function addExperience() {
    const listNumber = expList?.querySelectorAll(".sec-list-elem").length ?? 0;
    if (listNumber < 8) {
        /* Section Div && Head */
        // Section Div
        const listSection = createDiv(listSectionObj, expIndex);
        listSection.classList.add("sec-exp");
        // Head
        const listHead = createDiv(listHeadObj, expIndex);
        // Heading
        const listHeading = document.createElement("h4");
        listHeading.classList.add("sec-list-heading");
        listHeading.innerHTML = notSpecified;
        // Delete Button
        const deleteBtn = createDiv(deleteListBtnObj, expIndex);
        deleteBtn.setAttribute("delete-list", "pdf-exp" + expIndex);
        // List Indicator
        const listIndicator = createDiv(listIndicatorObj, expIndex);
        listHead.appendChild(listHeading);
        listHead.appendChild(deleteBtn);
        listHead.appendChild(listIndicator);
        listSection.appendChild(listHead);
        /* Job Title */
        // Inputs Div
        const secInputs = createDiv(secInputsObj, expIndex);
        // Create Elements
        const jobTitleDiv = createDiv(secItemObj, expIndex);
        const jobTitleLab = createLabel(jobTitleLabObj, expIndex);
        const jobTitleInp = createInput(jobTitleInpObj, expIndex);
        // Append
        jobTitleDiv.appendChild(jobTitleLab);
        jobTitleDiv.appendChild(jobTitleInp);
        secInputs?.appendChild(jobTitleDiv);
        // Change the section title
        jobTitleInp.addEventListener("input", () => {
            if (jobTitleInp.value.length > 0) {
                listHeading.innerHTML = jobTitleInp.value;
            }
            else {
                listHeading.innerHTML = notSpecified;
            }
        });
        /* Company */
        // Create Elements
        const compDiv = createDiv(secItemObj, expIndex);
        const compLab = createLabel(compLabObj, expIndex);
        const compInp = createInput(compInpObj, expIndex);
        // Append
        compDiv.appendChild(compLab);
        compDiv.appendChild(compInp);
        secInputs?.appendChild(compDiv);
        /* Location */
        // Create Elements
        const locationDiv = createDiv(secItemObj, expIndex);
        const locationLab = createLabel(locationLabObj, expIndex);
        const locationInp = createInput(locationInpObj, expIndex);
        // Append
        locationDiv.appendChild(locationLab);
        locationDiv.appendChild(locationInp);
        secInputs?.appendChild(locationDiv);
        /* Start Date */
        // Create Elements
        const startDateDiv = createDiv(secItemObj, expIndex);
        const startDateLab = createLabel(startDateLabObj, expIndex);
        const startDateInp = createInput(startDateInpObj, expIndex);
        // Append
        startDateDiv.appendChild(startDateLab);
        startDateDiv.appendChild(startDateInp);
        secInputs?.appendChild(startDateDiv);
        /* End Date */
        // Create Elements
        const endDateDiv = createDiv(secItemObj, expIndex);
        const endDateLab = createLabel(endDateLabObj, expIndex);
        const endDateInp = createInput(endDateInpObj, expIndex);
        // Append
        endDateDiv.appendChild(endDateLab);
        endDateDiv.appendChild(endDateInp);
        secInputs?.appendChild(endDateDiv);
        /* Current Position */
        // Create Elements
        const currPosDiv = createDiv(secItemObj, expIndex);
        currPosDiv.classList.add("curr-pos-div");
        const currPosLab = createLabel(currPosLabObj, expIndex);
        const currPosInp = document.createElement("input");
        currPosInp.type = "checkbox";
        currPosInp.classList.add("sec-curr-pos" + expIndex);
        currPosInp.setAttribute("id", "sec-curr-pos" + expIndex);
        currPosInp.setAttribute("data-output", "pdf-curr-pos" + expIndex);
        // Append
        currPosDiv.appendChild(currPosLab);
        currPosDiv.appendChild(currPosInp);
        secInputs?.appendChild(currPosDiv);
        /* Description */
        // Create Elements
        const descDiv = createDiv(secItemObj, expIndex);
        descDiv.classList.add("list-desc-div");
        const descDivInner = createDiv(descDivObj, expIndex);
        const descBtnsDiv = createDiv(descBtnsDivObj, expIndex);
        const boldBtn = createBtn(boldBtnObj, expIndex);
        boldBtn.innerHTML = "B";
        const italicBtn = createBtn(italicBtnObj, expIndex);
        italicBtn.innerHTML = "I";
        const underlineBtn = createBtn(underlineBtnObj, expIndex);
        underlineBtn.innerHTML = "U";
        const nrListBtn = createBtn(nrListBtnObj, expIndex);
        nrListBtn.innerHTML = numberListIcon;
        const bpListBtn = createBtn(bpListBtnObj, expIndex);
        bpListBtn.innerHTML = bpListIcon;
        const descLab = document.createElement("p");
        descLab.classList.add("list-label");
        descLab.innerHTML = "Description";
        const descTextArea = createDiv(descTextAreaObj, expIndex);
        descTextArea.setAttribute("id", "sec-exp-desc" + expIndex);
        descTextArea.setAttribute("contentEditable", "true");
        descTextArea.setAttribute("data-output", "pdf-exp-desc" + expIndex);
        descTextArea.setAttribute("placeholder", "Developed and maintained responsive web applications using JavaScript, TypeScript and jQuery.");
        // Append
        descDiv.appendChild(descLab);
        descBtnsDiv.appendChild(boldBtn);
        descBtnsDiv.appendChild(italicBtn);
        descBtnsDiv.appendChild(underlineBtn);
        descBtnsDiv.appendChild(nrListBtn);
        descBtnsDiv.appendChild(bpListBtn);
        descDivInner.appendChild(descBtnsDiv);
        descDivInner.appendChild(descTextArea);
        descDiv.appendChild(descDivInner);
        secInputs?.appendChild(descDiv);
        listSection?.appendChild(secInputs);
        /* Append Description & Character Limit */
        const outputClass = descTextArea.getAttribute("data-output");
        // Create an element and append it
        const pdfOutput = document.createElement("p");
        pdfOutput.classList.add(outputClass);
        const maxDescLength = 200;
        function textAreaInput() {
            // Change the element value to the input value
            const output = document.querySelector("." +
                outputClass);
            // Limit the character number
            if (descTextArea.innerText.length > maxDescLength) {
                descTextArea.innerText = descTextArea.innerText.slice(0, maxDescLength);
            }
            // Append the text to the pdf preview
            if (output) {
                output.innerHTML = descTextArea.innerHTML;
            }
        }
        descTextArea.addEventListener("input", textAreaInput);
        /* Description Buttons && Text Area */
        boldBtn.addEventListener("click", () => {
            document.execCommand("bold");
            boldBtn.classList.toggle("desc-btn-active");
        });
        italicBtn.addEventListener("click", () => {
            document.execCommand("italic");
            italicBtn.classList.toggle("desc-btn-active");
        });
        underlineBtn.addEventListener("click", () => {
            document.execCommand("underline");
            underlineBtn.classList.toggle("desc-btn-active");
        });
        let currentListNum = 1;
        nrListBtn.addEventListener("click", () => {
            if (descTextArea.innerHTML != "") {
                descTextArea.innerHTML += `<br>${currentListNum}.&nbsp;`;
            }
            else {
                descTextArea.innerHTML += `${currentListNum}.&nbsp;`;
            }
            nrListBtn.classList.toggle("desc-btn-active");
            textAreaInput();
            currentListNum++;
        });
        bpListBtn.addEventListener("click", () => {
            if (descTextArea.innerHTML != "") {
                descTextArea.innerHTML += `<br>&#x2022;&nbsp;`;
            }
            else {
                descTextArea.innerHTML += `&#x2022;&nbsp;`;
            }
            bpListBtn.classList.toggle("desc-btn-active");
            textAreaInput();
        });
        /* Append the elements to PDF */
        // Append the section elements to the pdf
        const pdfExpDiv = document.createElement("div");
        pdfExpDiv.classList.add("pdf-exp");
        pdfExpDiv.setAttribute("id", "pdf-exp" + expIndex);
        appendOutput(pdfExpDiv, jobTitleInp);
        appendOutput(pdfExpDiv, compInp);
        appendOutput(pdfExpDiv, locationInp);
        appendOutput(pdfExpDiv, startDateInp);
        appendOutput(pdfExpDiv, endDateInp);
        pdfExpDiv.appendChild(pdfOutput);
        appendExp?.appendChild(pdfExpDiv);
        /* Delete Link Button Event */
        deleteBtn.addEventListener("click", function () {
            // PDF Experience Section
            const pdfElemClass = document.querySelector("#" +
                deleteBtn.getAttribute("delete-list"));
            // Remove the experience section (sections)
            listSection?.remove();
            // Remove the experience section from the PDF preview
            pdfElemClass?.remove();
        });
        /* Current Position Checkbox Event */
        const currentJobTxt = "Present";
        currPosInp.addEventListener("click", () => {
            const pdfEndDate = document.querySelector("." +
                endDateInp.getAttribute("data-output"));
            if (currPosInp.checked) {
                endDateDiv.classList.add("no-end-date");
                pdfEndDate.innerHTML = currentJobTxt;
            }
            else {
                endDateDiv.classList.remove("no-end-date");
                pdfEndDate.innerHTML = endDateInp.value;
            }
        });
        endDateInp.addEventListener("input", () => {
            currPosInp.checked = false;
        });
        /* Section expand / collapse */
        function removeOpenClass() {
            document.querySelectorAll(".sec-exp").forEach((section) => {
                if (section !== listSection) {
                    section.classList.remove("list-open");
                }
            });
        }
        removeOpenClass();
        listSection.classList.add("list-open");
        listHead.addEventListener("click", (e) => {
            if (!deleteBtn?.contains(e.target)) {
                removeOpenClass();
                listSection.classList.toggle("list-open");
            }
        });
        /* Settings */
        // Append Elements (Section)
        expList?.appendChild(listSection);
        // Set focus when creating a new section
        jobTitleInp.focus();
        // Index number =+ 1
        expIndex++;
    }
}
addExpBtn?.addEventListener("click", addExperience);
//*--|*|--*\\_____// Education \\_____//*--|*|--*\\
// Education section uses some code from the experience section
// Elements
const eduList = document.querySelector(".education-list");
const addEduBtn = document.querySelector(".add-education");
const appendEdu = document.querySelector(".edu-append");
/* Element Objects */
const degreeLabObj = {
    elemName: "Degree",
    elemFor: "sec-degree",
    elemClasses: "list-label",
    elemIndexClasses: ""
};
const degreeInpObj = {
    elemType: "text",
    elemId: "sec-degree",
    elemClasses: "sec-input",
    elemIndexClasses: "sec-degree",
    elemPlaceholder: "Bachelor's degree in CS",
    elemDataOutput: "pdf-degree"
};
const schoolNameLabObj = {
    elemName: "School Name",
    elemFor: "sec-school-name",
    elemClasses: "list-label",
    elemIndexClasses: ""
};
const schoolNameInpObj = {
    elemType: "text",
    elemId: "sec-school-name",
    elemClasses: "sec-input",
    elemIndexClasses: "sec-school-name",
    elemPlaceholder: "Cornell University",
    elemDataOutput: "pdf-school-name"
};
const cityLabObj = {
    elemName: "City",
    elemFor: "sec-city",
    elemClasses: "list-label",
    elemIndexClasses: ""
};
const cityInpObj = {
    elemType: "text",
    elemId: "sec-city",
    elemClasses: "sec-input",
    elemIndexClasses: "sec-city",
    elemPlaceholder: "Ithaca, NY",
    elemDataOutput: "pdf-city"
};
const eduStartDateInpObj = {
    elemType: "date",
    elemId: "sec-start-date",
    elemClasses: "sec-input",
    elemIndexClasses: "sec-start-date",
    elemPlaceholder: "",
    elemDataOutput: "pdf-edu-start-date"
};
const eduEndDateInpObj = {
    elemType: "date",
    elemId: "sec-end-date",
    elemClasses: "sec-input",
    elemIndexClasses: "sec-end-date",
    elemPlaceholder: "",
    elemDataOutput: "pdf-edu-end-date"
};
const currSchoolLabObj = {
    elemName: "Not graduated yet",
    elemFor: "sec-curr-school",
    elemClasses: "list-label",
    elemIndexClasses: ""
};
let eduIndex = 0;
function addEducation() {
    const listNumber = eduList?.querySelectorAll(".sec-list-elem").length ?? 0;
    if (listNumber < 8) {
        /* Section Div && Head */
        // Section Div
        const listSection = createDiv(listSectionObj, eduIndex);
        listSection.classList.add("sec-edu");
        // Head
        const listHead = createDiv(listHeadObj, eduIndex);
        // Heading
        const listHeading = document.createElement("h4");
        listHeading.classList.add("sec-list-heading");
        listHeading.innerHTML = notSpecified;
        // Delete Button
        const deleteBtn = createDiv(deleteListBtnObj, eduIndex);
        deleteBtn.setAttribute("delete-list", "pdf-edu" + eduIndex);
        // List Indicator
        const listIndicator = createDiv(listIndicatorObj, eduIndex);
        listHead.appendChild(listHeading);
        listHead.appendChild(deleteBtn);
        listHead.appendChild(listIndicator);
        listSection.appendChild(listHead);
        /* Degree */
        // Inputs Div
        const secInputs = createDiv(secInputsObj, eduIndex);
        // Create Elements
        const degreeDiv = createDiv(secItemObj, eduIndex);
        const degreeLab = createLabel(degreeLabObj, eduIndex);
        const degreeInp = createInput(degreeInpObj, eduIndex);
        // Append
        degreeDiv.appendChild(degreeLab);
        degreeDiv.appendChild(degreeInp);
        secInputs?.appendChild(degreeDiv);
        /* School Name */
        // Create Elements
        const schoolNameDiv = createDiv(secItemObj, eduIndex);
        const schoolNameLab = createLabel(schoolNameLabObj, eduIndex);
        const schoolNameInp = createInput(schoolNameInpObj, eduIndex);
        // Append
        schoolNameDiv.appendChild(schoolNameLab);
        schoolNameDiv.appendChild(schoolNameInp);
        secInputs?.appendChild(schoolNameDiv);
        /* City */
        // Create Elements
        const cityDiv = createDiv(secItemObj, eduIndex);
        const cityLab = createLabel(cityLabObj, eduIndex);
        const cityInp = createInput(cityInpObj, eduIndex);
        // Append
        cityDiv.appendChild(cityLab);
        cityDiv.appendChild(cityInp);
        secInputs?.appendChild(cityDiv);
        /* Start Date */
        // Create Elements
        const startDateDiv = createDiv(secItemObj, eduIndex);
        const startDateLab = createLabel(startDateLabObj, eduIndex);
        const startDateInp = createInput(eduStartDateInpObj, eduIndex);
        // Append
        startDateDiv.appendChild(startDateLab);
        startDateDiv.appendChild(startDateInp);
        secInputs?.appendChild(startDateDiv);
        /* End Date */
        // Create Elements
        const endDateDiv = createDiv(secItemObj, eduIndex);
        const endDateLab = createLabel(endDateLabObj, eduIndex);
        const endDateInp = createInput(eduEndDateInpObj, eduIndex);
        // Append
        endDateDiv.appendChild(endDateLab);
        endDateDiv.appendChild(endDateInp);
        secInputs?.appendChild(endDateDiv);
        /* Current Position */
        // Create Elements
        const currPosDiv = createDiv(secItemObj, eduIndex);
        currPosDiv.classList.add("curr-pos-div");
        const currPosLab = createLabel(currSchoolLabObj, eduIndex);
        const currPosInp = document.createElement("input");
        currPosInp.type = "checkbox";
        currPosInp.classList.add("sec-curr-school" + eduIndex);
        currPosInp.setAttribute("id", "sec-curr-school" + eduIndex);
        currPosInp.setAttribute("data-output", "pdf-curr-school" + eduIndex);
        // Append
        currPosDiv.appendChild(currPosLab);
        currPosDiv.appendChild(currPosInp);
        secInputs?.appendChild(currPosDiv);
        /* Description */
        // Create Elements
        const descDiv = createDiv(secItemObj, eduIndex);
        descDiv.classList.add("list-desc-div");
        const descDivInner = createDiv(descDivObj, eduIndex);
        const descBtnsDiv = createDiv(descBtnsDivObj, eduIndex);
        const boldBtn = createBtn(boldBtnObj, eduIndex);
        boldBtn.innerHTML = "B";
        const italicBtn = createBtn(italicBtnObj, eduIndex);
        italicBtn.innerHTML = "I";
        const underlineBtn = createBtn(underlineBtnObj, eduIndex);
        underlineBtn.innerHTML = "U";
        const nrListBtn = createBtn(nrListBtnObj, eduIndex);
        nrListBtn.innerHTML = numberListIcon;
        const bpListBtn = createBtn(bpListBtnObj, eduIndex);
        bpListBtn.innerHTML = bpListIcon;
        const descLab = document.createElement("p");
        descLab.classList.add("list-label");
        descLab.innerHTML = "Description";
        const descTextArea = createDiv(descTextAreaObj, eduIndex);
        descTextArea.setAttribute("id", "sec-edu-desc" + eduIndex);
        descTextArea.setAttribute("contentEditable", "true");
        descTextArea.setAttribute("data-output", "pdf-edu-desc" + eduIndex);
        descTextArea.setAttribute("placeholder", "Developed a strong foundation in core computer science concepts, including algorithms and software development.");
        // Append
        descDiv.appendChild(descLab);
        descBtnsDiv.appendChild(boldBtn);
        descBtnsDiv.appendChild(italicBtn);
        descBtnsDiv.appendChild(underlineBtn);
        descBtnsDiv.appendChild(nrListBtn);
        descBtnsDiv.appendChild(bpListBtn);
        descDivInner.appendChild(descBtnsDiv);
        descDivInner.appendChild(descTextArea);
        descDiv.appendChild(descDivInner);
        secInputs?.appendChild(descDiv);
        listSection?.appendChild(secInputs);
        /* Append Description & Character Limit */
        const outputClass = descTextArea.getAttribute("data-output");
        // Create an element and append it
        const pdfOutput = document.createElement("p");
        pdfOutput.classList.add(outputClass);
        const maxDescLength = 200;
        function textAreaInput() {
            // Change the element value to the input value
            const output = document.querySelector("." +
                outputClass);
            // Limit the character number
            if (descTextArea.innerText.length > maxDescLength) {
                descTextArea.innerText = descTextArea.innerText.slice(0, maxDescLength);
            }
            // Append the text to the pdf preview
            if (output) {
                output.innerHTML = descTextArea.innerHTML;
            }
        }
        descTextArea.addEventListener("input", textAreaInput);
        /* List title change */
        function changeListTitle() {
            switch (true) {
                case degreeInp.value.length > 0 && schoolNameInp.value.length > 0:
                    listHeading.innerHTML = degreeInp.value + " - " + schoolNameInp.value;
                    break;
                case degreeInp.value.length > 0:
                    listHeading.innerHTML = degreeInp.value;
                    break;
                case schoolNameInp.value.length > 0:
                    listHeading.innerHTML = schoolNameInp.value;
                    break;
                default:
                    listHeading.innerHTML = notSpecified;
            }
        }
        schoolNameInp.addEventListener("input", changeListTitle);
        degreeInp.addEventListener("input", changeListTitle);
        /* Description Buttons && Text Area */
        boldBtn.addEventListener("click", () => {
            document.execCommand("bold");
            boldBtn.classList.toggle("desc-btn-active");
        });
        italicBtn.addEventListener("click", () => {
            document.execCommand("italic");
            italicBtn.classList.toggle("desc-btn-active");
        });
        underlineBtn.addEventListener("click", () => {
            document.execCommand("underline");
            underlineBtn.classList.toggle("desc-btn-active");
        });
        let currentListNum = 1;
        nrListBtn.addEventListener("click", () => {
            if (descTextArea.innerHTML != "") {
                descTextArea.innerHTML += `<br>${currentListNum}.&nbsp;`;
            }
            else {
                descTextArea.innerHTML += `${currentListNum}.&nbsp;`;
            }
            nrListBtn.classList.toggle("desc-btn-active");
            textAreaInput();
            currentListNum++;
        });
        bpListBtn.addEventListener("click", () => {
            if (descTextArea.innerHTML != "") {
                descTextArea.innerHTML += `<br>&#x2022;&nbsp;`;
            }
            else {
                descTextArea.innerHTML += `&#x2022;&nbsp;`;
            }
            bpListBtn.classList.toggle("desc-btn-active");
            textAreaInput();
        });
        /* Append the elements to PDF */
        // Append the section elements to the pdf
        const pdfExpDiv = document.createElement("div");
        pdfExpDiv.classList.add("pdf-edu");
        pdfExpDiv.setAttribute("id", "pdf-edu" + eduIndex);
        appendOutput(pdfExpDiv, degreeInp);
        appendOutput(pdfExpDiv, schoolNameInp);
        appendOutput(pdfExpDiv, cityInp);
        appendOutput(pdfExpDiv, startDateInp);
        appendOutput(pdfExpDiv, endDateInp);
        pdfExpDiv.appendChild(pdfOutput);
        appendEdu?.appendChild(pdfExpDiv);
        /* Delete Link Button Event */
        deleteBtn.addEventListener("click", function () {
            // PDF Experience Section
            const pdfElemClass = document.querySelector("#" +
                deleteBtn.getAttribute("delete-list"));
            // Remove the experience section (sections)
            listSection?.remove();
            // Remove the experience section from the PDF preview
            pdfElemClass?.remove();
        });
        /* Current Position Checkbox Event */
        const currentJobTxt = "Present";
        currPosInp.addEventListener("click", () => {
            const pdfEndDate = document.querySelector("." +
                endDateInp.getAttribute("data-output"));
            if (currPosInp.checked) {
                endDateDiv.classList.add("no-end-date");
                pdfEndDate.innerHTML = currentJobTxt;
            }
            else {
                endDateDiv.classList.remove("no-end-date");
                pdfEndDate.innerHTML = endDateInp.value;
            }
        });
        endDateInp.addEventListener("input", () => {
            currPosInp.checked = false;
        });
        /* Section expand / collapse */
        function removeOpenClass() {
            document.querySelectorAll(".sec-edu").forEach((section) => {
                if (section !== listSection) {
                    section.classList.remove("list-open");
                }
            });
        }
        removeOpenClass();
        listSection.classList.add("list-open");
        listHead.addEventListener("click", (e) => {
            if (!deleteBtn?.contains(e.target)) {
                removeOpenClass();
                listSection.classList.toggle("list-open");
            }
        });
        /* Settings */
        // Append Elements (Section)
        eduList?.appendChild(listSection);
        // Set focus when creating a new section
        degreeInp.focus();
        // Index number =+ 1
        eduIndex++;
    }
}
addEduBtn?.addEventListener("click", addEducation);
//*--|*|--*\\_____// Courses \\_____//*--|*|--*\\
// Elements
const courList = document.querySelector(".courses-list");
const addCourBtn = document.querySelector(".add-courses");
const appendCour = document.querySelector(".cour-append");
/* Element Objects */
const courseLabObj = {
    elemName: "Course",
    elemFor: "sec-course",
    elemClasses: "list-label",
    elemIndexClasses: ""
};
const courseInpObj = {
    elemType: "text",
    elemId: "sec-course",
    elemClasses: "sec-input",
    elemIndexClasses: "sec-course",
    elemPlaceholder: "Learn TypeScript",
    elemDataOutput: "pdf-course"
};
const institLabObj = {
    elemName: "Author",
    elemFor: "sec-instit",
    elemClasses: "list-label",
    elemIndexClasses: ""
};
const institInpObj = {
    elemType: "text",
    elemId: "sec-instit",
    elemClasses: "sec-input",
    elemIndexClasses: "sec-instit",
    elemPlaceholder: "Codecademy",
    elemDataOutput: "pdf-instit"
};
const courStartDateInpObj = {
    elemType: "date",
    elemId: "sec-start-date",
    elemClasses: "sec-input",
    elemIndexClasses: "sec-start-date",
    elemPlaceholder: "",
    elemDataOutput: "pdf-cour-start-date"
};
const courEndDateInpObj = {
    elemType: "date",
    elemId: "sec-end-date",
    elemClasses: "sec-input",
    elemIndexClasses: "sec-end-date",
    elemPlaceholder: "",
    elemDataOutput: "pdf-cour-end-date"
};
let courIndex = 0;
function addCourses() {
    const listNumber = courList?.querySelectorAll(".sec-list-elem").length ?? 0;
    if (listNumber < 8) {
        /* Section Div && Head */
        // Section Div
        const listSection = createDiv(listSectionObj, courIndex);
        listSection.classList.add("sec-cour");
        // Head
        const listHead = createDiv(listHeadObj, courIndex);
        // Heading
        const listHeading = document.createElement("h4");
        listHeading.classList.add("sec-list-heading");
        listHeading.innerHTML = notSpecified;
        // Delete Button
        const deleteBtn = createDiv(deleteListBtnObj, courIndex);
        deleteBtn.setAttribute("delete-list", "pdf-cour" + courIndex);
        // List Indicator
        const listIndicator = createDiv(listIndicatorObj, courIndex);
        listHead.appendChild(listHeading);
        listHead.appendChild(deleteBtn);
        listHead.appendChild(listIndicator);
        listSection.appendChild(listHead);
        /* Course */
        // Inputs Div
        const secInputs = createDiv(secInputsObj, courIndex);
        // Create Elements
        const courseDiv = createDiv(secItemObj, courIndex);
        const courseLab = createLabel(courseLabObj, courIndex);
        const courseInp = createInput(courseInpObj, courIndex);
        // Append
        courseDiv.appendChild(courseLab);
        courseDiv.appendChild(courseInp);
        secInputs?.appendChild(courseDiv);
        // Change the section title
        courseInp.addEventListener("input", () => {
            if (courseInp.value.length > 0) {
                listHeading.innerHTML = courseInp.value;
            }
            else {
                listHeading.innerHTML = notSpecified;
            }
        });
        /* Institution */
        // Create Elements
        const institDiv = createDiv(secItemObj, courIndex);
        const institLab = createLabel(institLabObj, courIndex);
        const institInp = createInput(institInpObj, courIndex);
        // Append
        institDiv.appendChild(institLab);
        institDiv.appendChild(institInp);
        secInputs?.appendChild(institDiv);
        /* Start Date */
        // Create Elements
        const startDateDiv = createDiv(secItemObj, courIndex);
        const startDateLab = createLabel(startDateLabObj, courIndex);
        const startDateInp = createInput(courStartDateInpObj, courIndex);
        // Append
        startDateDiv.appendChild(startDateLab);
        startDateDiv.appendChild(startDateInp);
        secInputs?.appendChild(startDateDiv);
        /* End Date */
        // Create Elements
        const endDateDiv = createDiv(secItemObj, courIndex);
        const endDateLab = createLabel(endDateLabObj, courIndex);
        const endDateInp = createInput(courEndDateInpObj, courIndex);
        // Append
        endDateDiv.appendChild(endDateLab);
        endDateDiv.appendChild(endDateInp);
        secInputs?.appendChild(endDateDiv);
        listSection?.appendChild(secInputs);
        /* Append the elements to PDF */
        // Append the section elements to the pdf
        const pdfExpDiv = document.createElement("div");
        pdfExpDiv.classList.add("pdf-cour");
        pdfExpDiv.setAttribute("id", "pdf-cour" + courIndex);
        appendOutput(pdfExpDiv, courseInp);
        appendOutput(pdfExpDiv, institInp);
        appendOutput(pdfExpDiv, startDateInp);
        appendOutput(pdfExpDiv, endDateInp);
        appendCour?.appendChild(pdfExpDiv);
        /* Delete Link Button Event */
        deleteBtn.addEventListener("click", function () {
            // PDF Experience Section
            const pdfElemClass = document.querySelector("#" +
                deleteBtn.getAttribute("delete-list"));
            // Remove the experience section (sections)
            listSection?.remove();
            // Remove the experience section from the PDF preview
            pdfElemClass?.remove();
        });
        /* Section expand / collapse */
        function removeOpenClass() {
            document.querySelectorAll(".sec-cour").forEach((section) => {
                if (section !== listSection) {
                    section.classList.remove("list-open");
                }
            });
        }
        removeOpenClass();
        listSection.classList.add("list-open");
        listHead.addEventListener("click", (e) => {
            if (!deleteBtn?.contains(e.target)) {
                removeOpenClass();
                listSection.classList.toggle("list-open");
            }
        });
        /* Settings */
        // Append Elements (Section)
        courList?.appendChild(listSection);
        // Set focus when creating a new section
        courseInp.focus();
        // Index number =+ 1
        courIndex++;
    }
}
addCourBtn?.addEventListener("click", addCourses);
//*--|*|--*\\_____// References \\_____//*--|*|--*\\
// Education section uses some code from the experience section
// Elements
const refList = document.querySelector(".references-list");
const addRefBtn = document.querySelector(".add-references");
const appendRef = document.querySelector(".ref-append");
/* Element Objects */
const refNameLabObj = {
    elemName: "Referent's Name",
    elemFor: "sec-ref-name",
    elemClasses: "list-label",
    elemIndexClasses: ""
};
const refNameInpObj = {
    elemType: "text",
    elemId: "sec-ref-name",
    elemClasses: "sec-input",
    elemIndexClasses: "sec-ref-name",
    elemPlaceholder: "John Smith",
    elemDataOutput: "pdf-ref-name"
};
const refCompLabObj = {
    elemName: "Company",
    elemFor: "sec-ref-comp",
    elemClasses: "list-label",
    elemIndexClasses: ""
};
const refCompInpObj = {
    elemType: "text",
    elemId: "sec-ref-comp",
    elemClasses: "sec-input",
    elemIndexClasses: "sec-ref-comp",
    elemPlaceholder: "IBM",
    elemDataOutput: "pdf-ref-comp"
};
const relationLabObj = {
    elemName: "Relationship",
    elemFor: "sec-relation",
    elemClasses: "list-label",
    elemIndexClasses: ""
};
const relationInpObj = {
    elemType: "text",
    elemId: "sec-relation",
    elemClasses: "sec-input",
    elemIndexClasses: "sec-relation",
    elemPlaceholder: "Manager",
    elemDataOutput: "pdf-relation"
};
const refMailLabObj = {
    elemName: "E-Mail",
    elemFor: "sec-ref-mail",
    elemClasses: "list-label",
    elemIndexClasses: ""
};
const refMailInpObj = {
    elemType: "text",
    elemId: "sec-ref-mail",
    elemClasses: "sec-input",
    elemIndexClasses: "sec-ref-mail",
    elemPlaceholder: "j.smith@us.ibm.com",
    elemDataOutput: "pdf-ref-mail"
};
const refPhoneLabObj = {
    elemName: "Phone Number",
    elemFor: "sec-ref-phone",
    elemClasses: "list-label",
    elemIndexClasses: ""
};
const refPhoneInpObj = {
    elemType: "text",
    elemId: "sec-ref-phone",
    elemClasses: "sec-input",
    elemIndexClasses: "sec-ref-phone",
    elemPlaceholder: "987-654-3210",
    elemDataOutput: "pdf-ref-phone"
};
let refIndex = 0;
function addReferences() {
    const listNumber = refList?.querySelectorAll(".sec-list-elem").length ?? 0;
    if (listNumber < 6) {
        /* Section Div && Head */
        // Section Div
        const listSection = createDiv(listSectionObj, refIndex);
        listSection.classList.add("sec-ref");
        // Head
        const listHead = createDiv(listHeadObj, refIndex);
        // Heading
        const listHeading = document.createElement("h4");
        listHeading.classList.add("sec-list-heading");
        listHeading.innerHTML = notSpecified;
        // Delete Button
        const deleteBtn = createDiv(deleteListBtnObj, refIndex);
        deleteBtn.setAttribute("delete-list", "pdf-ref" + refIndex);
        // List Indicator
        const listIndicator = createDiv(listIndicatorObj, refIndex);
        listHead.appendChild(listHeading);
        listHead.appendChild(deleteBtn);
        listHead.appendChild(listIndicator);
        listSection.appendChild(listHead);
        /* Referent's Name */
        // Inputs Div
        const secInputs = createDiv(secInputsObj, refIndex);
        // Create Elements
        const refNameDiv = createDiv(secItemObj, refIndex);
        const refNameLab = createLabel(refNameLabObj, refIndex);
        const refNameInp = createInput(refNameInpObj, refIndex);
        // Append
        refNameDiv.appendChild(refNameLab);
        refNameDiv.appendChild(refNameInp);
        secInputs?.appendChild(refNameDiv);
        /* Company */
        // Create Elements
        const refCompDiv = createDiv(secItemObj, refIndex);
        const refCompLab = createLabel(refCompLabObj, refIndex);
        const refCompInp = createInput(refCompInpObj, refIndex);
        // Append
        refCompDiv.appendChild(refCompLab);
        refCompDiv.appendChild(refCompInp);
        secInputs?.appendChild(refCompDiv);
        /* Relationship */
        // Create Elements
        const relationDiv = createDiv(secItemObj, refIndex);
        const relationLab = createLabel(relationLabObj, refIndex);
        const relationInp = createInput(relationInpObj, refIndex);
        // Append
        relationDiv.appendChild(relationLab);
        relationDiv.appendChild(relationInp);
        secInputs?.appendChild(relationDiv);
        /* E-Mail */
        // Create Elements
        const refMailDiv = createDiv(secItemObj, refIndex);
        const refMailLab = createLabel(refMailLabObj, refIndex);
        const refMailInp = createInput(refMailInpObj, refIndex);
        // Append
        refMailDiv.appendChild(refMailLab);
        refMailDiv.appendChild(refMailInp);
        secInputs?.appendChild(refMailDiv);
        /* Phone Number */
        // Create Elements
        const refPhoneDiv = createDiv(secItemObj, refIndex);
        const refPhoneLab = createLabel(refPhoneLabObj, refIndex);
        const refPhoneInp = createInput(refPhoneInpObj, refIndex);
        // Append
        refPhoneDiv.appendChild(refPhoneLab);
        refPhoneDiv.appendChild(refPhoneInp);
        secInputs?.appendChild(refPhoneDiv);
        /* Description */
        // Create Elements
        const descDiv = createDiv(secItemObj, refIndex);
        descDiv.classList.add("list-desc-div");
        const descDivInner = createDiv(descDivObj, refIndex);
        const descBtnsDiv = createDiv(descBtnsDivObj, refIndex);
        const boldBtn = createBtn(boldBtnObj, refIndex);
        boldBtn.innerHTML = "B";
        const italicBtn = createBtn(italicBtnObj, refIndex);
        italicBtn.innerHTML = "I";
        const underlineBtn = createBtn(underlineBtnObj, refIndex);
        underlineBtn.innerHTML = "U";
        const nrListBtn = createBtn(nrListBtnObj, refIndex);
        nrListBtn.innerHTML = numberListIcon;
        const bpListBtn = createBtn(bpListBtnObj, refIndex);
        bpListBtn.innerHTML = bpListIcon;
        const descLab = document.createElement("p");
        descLab.classList.add("list-label");
        descLab.innerHTML = "Description";
        const descTextArea = createDiv(descTextAreaObj, refIndex);
        descTextArea.setAttribute("id", "sec-ref-desc" + refIndex);
        descTextArea.setAttribute("contentEditable", "true");
        descTextArea.setAttribute("data-output", "pdf-ref-desc" + refIndex);
        descTextArea.setAttribute("placeholder", "John Smith was my manager from 2018 to 2020. We worked on implementing the front-end features of the company's website.");
        // Append
        descDiv.appendChild(descLab);
        descBtnsDiv.appendChild(boldBtn);
        descBtnsDiv.appendChild(italicBtn);
        descBtnsDiv.appendChild(underlineBtn);
        descBtnsDiv.appendChild(nrListBtn);
        descBtnsDiv.appendChild(bpListBtn);
        descDivInner.appendChild(descBtnsDiv);
        descDivInner.appendChild(descTextArea);
        descDiv.appendChild(descDivInner);
        secInputs?.appendChild(descDiv);
        listSection?.appendChild(secInputs);
        /* Append Description & Character Limit */
        const outputClass = descTextArea.getAttribute("data-output");
        // Create an element and append it
        const pdfOutput = document.createElement("p");
        pdfOutput.classList.add(outputClass);
        const maxDescLength = 200;
        function textAreaInput() {
            // Change the element value to the input value
            const output = document.querySelector("." +
                outputClass);
            // Limit the character number
            if (descTextArea.innerText.length > maxDescLength) {
                descTextArea.innerText = descTextArea.innerText.slice(0, maxDescLength);
            }
            // Append the text to the pdf preview
            if (output) {
                output.innerHTML = descTextArea.innerHTML;
            }
        }
        descTextArea.addEventListener("input", textAreaInput);
        /* List title change */
        function changeListTitle() {
            switch (true) {
                case refNameInp.value.length > 0 && refCompInp.value.length > 0:
                    listHeading.innerHTML = refNameInp.value + " - " + refCompInp.value;
                    break;
                case refNameInp.value.length > 0:
                    listHeading.innerHTML = refNameInp.value;
                    break;
                case refCompInp.value.length > 0:
                    listHeading.innerHTML = refCompInp.value;
                    break;
                default:
                    listHeading.innerHTML = notSpecified;
            }
        }
        refCompInp.addEventListener("input", changeListTitle);
        refNameInp.addEventListener("input", changeListTitle);
        /* Description Buttons && Text Area */
        boldBtn.addEventListener("click", () => {
            document.execCommand("bold");
            boldBtn.classList.toggle("desc-btn-active");
        });
        italicBtn.addEventListener("click", () => {
            document.execCommand("italic");
            italicBtn.classList.toggle("desc-btn-active");
        });
        underlineBtn.addEventListener("click", () => {
            document.execCommand("underline");
            underlineBtn.classList.toggle("desc-btn-active");
        });
        let currentListNum = 1;
        nrListBtn.addEventListener("click", () => {
            if (descTextArea.innerHTML != "") {
                descTextArea.innerHTML += `<br>${currentListNum}.&nbsp;`;
            }
            else {
                descTextArea.innerHTML += `${currentListNum}.&nbsp;`;
            }
            nrListBtn.classList.toggle("desc-btn-active");
            textAreaInput();
            currentListNum++;
        });
        bpListBtn.addEventListener("click", () => {
            if (descTextArea.innerHTML != "") {
                descTextArea.innerHTML += `<br>&#x2022;&nbsp;`;
            }
            else {
                descTextArea.innerHTML += `&#x2022;&nbsp;`;
            }
            bpListBtn.classList.toggle("desc-btn-active");
            textAreaInput();
        });
        /* Append the elements to PDF */
        // Append the section elements to the pdf
        const pdfExpDiv = document.createElement("div");
        pdfExpDiv.classList.add("pdf-ref");
        pdfExpDiv.setAttribute("id", "pdf-ref" + refIndex);
        appendOutput(pdfExpDiv, refNameInp);
        appendOutput(pdfExpDiv, refCompInp);
        appendOutput(pdfExpDiv, relationInp);
        appendOutput(pdfExpDiv, refMailInp);
        appendOutput(pdfExpDiv, refPhoneInp);
        pdfExpDiv.appendChild(pdfOutput);
        appendRef?.appendChild(pdfExpDiv);
        /* Delete Link Button Event */
        deleteBtn.addEventListener("click", function () {
            // PDF Experience Section
            const pdfElemClass = document.querySelector("#" +
                deleteBtn.getAttribute("delete-list"));
            // Remove the experience section (sections)
            listSection?.remove();
            // Remove the experience section from the PDF preview
            pdfElemClass?.remove();
        });
        /* Section expand / collapse */
        function removeOpenClass() {
            document.querySelectorAll(".sec-ref").forEach((section) => {
                if (section !== listSection) {
                    section.classList.remove("list-open");
                }
            });
        }
        removeOpenClass();
        listSection.classList.add("list-open");
        listHead.addEventListener("click", (e) => {
            if (!deleteBtn?.contains(e.target)) {
                removeOpenClass();
                listSection.classList.toggle("list-open");
            }
        });
        /* Settings */
        // Append Elements (Section)
        refList?.appendChild(listSection);
        // Set focus when creating a new section
        refNameInp.focus();
        // Index number =+ 1
        refIndex++;
    }
}
addRefBtn?.addEventListener("click", addReferences);
//*--|*|--*\\_____// Language Items \\_____//*--|*|--*\\
const langList = document.querySelector(".languages-list");
const addLangBtn = document.querySelector(".add-languages");
const appendLang = document.querySelector(".lang-append");
const langLabelName = "Language";
const langLevels = [
    { val: "dont-display", text: "Don't Display" },
    { val: "A1", text: "A1 - Beginner" },
    { val: "A2", text: "A2 - Elementary" },
    { val: "B1", text: "B1 - Intermediate" },
    { val: "B2", text: "B2 - Upper-Intermed." },
    { val: "C1", text: "C1 - Advanced" },
    { val: "C2", text: "C2 - Proficiency" }
];
const langDivObj = {
    elemClasses: "sec-lang",
    elemIndexClasses: ""
};
const langLabelObj = {
    elemName: langLabelName,
    elemFor: "sec-lang-name",
    elemClasses: "",
    elemIndexClasses: ""
};
const langInpObj = {
    elemType: "text",
    elemId: "sec-lang-name",
    elemClasses: "sec-input",
    elemIndexClasses: "sec-lang-name",
    elemPlaceholder: "English",
    elemDataOutput: "pdf-lang-name"
};
const langLvlLabelObj = {
    elemName: "Level",
    elemFor: "sec-lang-lvl",
    elemClasses: "",
    elemIndexClasses: ""
};
let langIndex = 0;
function addLang() {
    const langNumber = langList?.querySelectorAll(".sec-lang").length ?? 0;
    if (langNumber < 6) {
        // Create a link div
        const langDiv = createDiv(langDivObj, langIndex);
        /* Lang Name */
        // Create elements
        const linkElem1 = createDiv(secItemObj, langIndex);
        const langLabel = createLabel(langLabelObj, langIndex);
        const langInp = createInput(langInpObj, langIndex);
        // Append elements
        linkElem1?.appendChild(langLabel);
        linkElem1?.appendChild(langInp);
        /* Lang Lvl */
        // Create elements
        const linkElem2 = createDiv(secItemObj, langIndex);
        const langLvlLabel = createLabel(langLvlLabelObj, langIndex);
        const langLvlSel = document.createElement("select");
        // Set the select level attributes
        langLvlSel.classList.add("sec-input", "sec-lang-lvl", "sec-lang-lvl" + langIndex);
        langLvlSel.setAttribute("id", "sec-lang-lvl" + langIndex);
        langLvlSel.setAttribute("data-output", "pdf-lang-lvl" + langIndex);
        // Create level options and append them
        for (let lvl = 0; lvl < langLevels.length; lvl++) {
            const lvlOption = document.createElement("option");
            lvlOption.value = langLevels[lvl].val;
            lvlOption.innerHTML = langLevels[lvl].text;
            langLvlSel.appendChild(lvlOption);
        }
        // Append the label and input
        linkElem2?.appendChild(langLvlLabel);
        linkElem2?.appendChild(langLvlSel);
        /* Delete Link Button */
        const deleteLinkBtn = createDiv(deleteListBtnObj, langIndex);
        deleteLinkBtn.setAttribute("delete-name", "pdf-lang-name" + langIndex);
        deleteLinkBtn.setAttribute("delete-url", "pdf-lang-lvl" + langIndex);
        /* Append */
        // Append the link name and url divs to the section
        langDiv?.appendChild(linkElem1);
        langDiv?.appendChild(linkElem2);
        langDiv?.appendChild(deleteLinkBtn);
        langList?.appendChild(langDiv);
        // Append the link name and url output to the pdf
        appendOutput(appendLang, langInp);
        const langLvlOutputClass = langLvlSel.getAttribute("data-output");
        // Create an element and append it
        const pdfOutput = document.createElement("p");
        pdfOutput.classList.add(langLvlOutputClass);
        appendLang?.appendChild(pdfOutput);
        langLvlSel.addEventListener("input", function () {
            // Change the element value to the input value
            const output = document.querySelector("." + langLvlOutputClass);
            if (langLvlSel.value !== "dont-display" &&
                output) {
                output.innerHTML = langLvlSel.value;
            }
            else if (output) {
                output.innerHTML = "";
            }
        });
        // Set focus on the input
        langInp.focus();
        // Change the input label
        changeLabel(langInp, langLabel, langLabelName);
        /* Delete Button */
        deleteLinkBtn.addEventListener("click", function () {
            // PDF Link Label
            const pdfNameElemClass = document.querySelector("." +
                deleteLinkBtn.getAttribute("delete-name"));
            // PDF Link URL
            const pdfUrlElemClass = document.querySelector("." +
                deleteLinkBtn.getAttribute("delete-url"));
            // Remove the section link element if it's not the first one
            langDiv.remove();
            // Remove the link elements from the PDF preview
            pdfNameElemClass?.remove();
            pdfUrlElemClass?.remove();
        });
        // Index number =+ 1
        langIndex++;
    }
}
addLangBtn?.addEventListener("click", addLang);
//*--|*|--*\\_____// Skills \\_____//*--|*|--*\\
const skillList = document.querySelector(".skills-list");
const addSkillBtn = document.querySelector(".add-skills");
const appendSkill = document.querySelector(".skill-append");
const slDivObj = {
    elemClasses: "sl-elem",
    elemIndexClasses: ""
};
const skillInpObj = {
    elemType: "text",
    elemId: "sec-skill",
    elemClasses: "sec-input",
    elemIndexClasses: "sec-skill",
    elemPlaceholder: "JavaScript",
    elemDataOutput: "pdf-skill"
};
let skillIndex = 0;
function addSkill() {
    const elemNumber = skillList?.querySelectorAll(".sl-elem").length ?? 0;
    if (elemNumber < 16) {
        /* Elements */
        // Create a parent div
        const parentDiv = createDiv(slDivObj, skillIndex);
        // Create & append elements
        const elemDiv = createDiv(secItemObj, skillIndex);
        const elemInp = createInput(skillInpObj, skillIndex);
        elemDiv?.appendChild(elemInp);
        // Delete Link Button
        const deleteLinkBtn = createDiv(deleteListBtnObj, skillIndex);
        deleteLinkBtn.setAttribute("delete-name", "pdf-skill" + skillIndex);
        /* Append */
        // Append the link name and url divs to the section
        parentDiv?.appendChild(elemDiv);
        parentDiv?.appendChild(deleteLinkBtn);
        skillList?.appendChild(parentDiv);
        // Append the link name and url output to the pdf
        appendOutput(appendSkill, elemInp);
        // Set focus on the input
        elemInp.focus();
        /* Delete Button */
        deleteLinkBtn.addEventListener("click", function () {
            // PDF Link Label
            const pdfNameElemClass = document.querySelector("." +
                deleteLinkBtn.getAttribute("delete-name"));
            // Remove the section link element if it's not the first one
            parentDiv.remove();
            // Remove the link elements from the PDF preview
            pdfNameElemClass?.remove();
        });
        // Index number =+ 1
        skillIndex++;
    }
}
addSkillBtn?.addEventListener("click", addSkill);
//*--|*|--*\\_____// Accomplishments \\_____//*--|*|--*\\
const accompList = document.querySelector(".accomplishments-list");
const addAccompBtn = document.querySelector(".add-accomplishments");
const appendAccomp = document.querySelector(".accomp-append");
const accompInpObj = {
    elemType: "text",
    elemId: "sec-accomp",
    elemClasses: "sec-input",
    elemIndexClasses: "sec-accomp",
    elemPlaceholder: "Developed a cookbook app",
    elemDataOutput: "pdf-accomp"
};
let accompIndex = 0;
function addAccomp() {
    const elemNumber = skillList?.querySelectorAll(".sl-elem").length ?? 0;
    if (elemNumber < 10) {
        /* Elements */
        // Create a parent div
        const parentDiv = createDiv(slDivObj, accompIndex);
        // Create & append elements
        const elemDiv = createDiv(secItemObj, accompIndex);
        const elemInp = createInput(accompInpObj, accompIndex);
        elemDiv?.appendChild(elemInp);
        // Delete Link Button
        const deleteLinkBtn = createDiv(deleteListBtnObj, accompIndex);
        deleteLinkBtn.setAttribute("delete-name", "pdf-accomp" + accompIndex);
        /* Append */
        // Append the link name and url divs to the section
        parentDiv?.appendChild(elemDiv);
        parentDiv?.appendChild(deleteLinkBtn);
        accompList?.appendChild(parentDiv);
        // Append the link name and url output to the pdf
        appendOutput(appendAccomp, elemInp);
        // Set focus on the input
        elemInp.focus();
        /* Delete Button */
        deleteLinkBtn.addEventListener("click", function () {
            // PDF Link Label
            const pdfNameElemClass = document.querySelector("." +
                deleteLinkBtn.getAttribute("delete-name"));
            // Remove the section link element if it's not the first one
            parentDiv.remove();
            // Remove the link elements from the PDF preview
            pdfNameElemClass?.remove();
        });
        // Index number =+ 1
        accompIndex++;
    }
}
addAccompBtn?.addEventListener("click", addAccomp);
//*--|*|--*\\_____// Hobbies \\_____//*--|*|--*\\
const hobbyList = document.querySelector(".hobbies-list");
const addHobbyBtn = document.querySelector(".add-hobbies");
const appendHobby = document.querySelector(".hobby-append");
const hobbyInpObj = {
    elemType: "text",
    elemId: "sec-hobby",
    elemClasses: "sec-input",
    elemIndexClasses: "sec-hobby",
    elemPlaceholder: "Video Editing",
    elemDataOutput: "pdf-hobby"
};
let hobbyIndex = 0;
function addHobby() {
    const elemNumber = skillList?.querySelectorAll(".sl-elem").length ?? 0;
    if (elemNumber < 10) {
        /* Elements */
        // Create a parent div
        const parentDiv = createDiv(slDivObj, hobbyIndex);
        // Create & append elements
        const elemDiv = createDiv(secItemObj, hobbyIndex);
        const elemInp = createInput(hobbyInpObj, hobbyIndex);
        elemDiv?.appendChild(elemInp);
        // Delete Link Button
        const deleteLinkBtn = createDiv(deleteListBtnObj, hobbyIndex);
        deleteLinkBtn.setAttribute("delete-name", "pdf-hobby" + hobbyIndex);
        /* Append */
        // Append the link name and url divs to the section
        parentDiv?.appendChild(elemDiv);
        parentDiv?.appendChild(deleteLinkBtn);
        hobbyList?.appendChild(parentDiv);
        // Append the link name and url output to the pdf
        appendOutput(appendHobby, elemInp);
        // Set focus on the input
        elemInp.focus();
        /* Delete Button */
        deleteLinkBtn.addEventListener("click", function () {
            // PDF Link Label
            const pdfNameElemClass = document.querySelector("." +
                deleteLinkBtn.getAttribute("delete-name"));
            // Remove the section link element if it's not the first one
            parentDiv.remove();
            // Remove the link elements from the PDF preview
            pdfNameElemClass?.remove();
        });
        // Index number =+ 1
        hobbyIndex++;
    }
}
addHobbyBtn?.addEventListener("click", addHobby);
