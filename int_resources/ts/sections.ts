


//*--|*|--*\\_____// Validation \\_____//*--|*|--*\\



const allSectionsArr:Element[] = Array.from(document.querySelectorAll(".section"));
const inputsVal:NodeListOf<HTMLInputElement> = document.querySelectorAll(".inp-val");
const pdfBtn:HTMLElement | null = document.querySelector(".pdf-btn");

let isValidated:boolean = false;

function inputValidation(){

    isValidated = true;

    inputsVal.forEach((input) => {

        const closestSecIndex:number =
            allSectionsArr.indexOf(input.closest(".section")!) + 1;

        const closestNavElem:HTMLElement | null = document.querySelector(".nav-elem" 
            + closestSecIndex);

        const closestSecElem:HTMLElement | null = document.querySelector(".section" 
            + closestSecIndex);
    
        if (!input.value){

          closestNavElem!.classList.add("validation-failed");
          input.classList.add("validation-failed");
          
          isValidated = false;

        } else {

            input.classList.remove("validation-failed");

            let hasValInp:boolean = true;

            inputsVal.forEach((input) => {
                if (closestSecElem?.contains(input) && !input.value){
                    hasValInp = false;
                }
            });

            if (hasValInp){
                closestNavElem!.classList.remove("validation-failed");
            }

        }

    });
}

let clickedPdfBtn:boolean = false;

pdfBtn!.addEventListener("click", function(){

    inputValidation();

    if (!clickedPdfBtn){
        inputsVal.forEach(function(inpVal){
            inpVal.addEventListener("input", function(){
                inputValidation();
            });
        });
    }

    if (isValidated){
        window.print();
    }

    clickedPdfBtn = true;

});





/*
const pdfElem:HTMLElement | null = document.querySelector(".pdfc-inner-inner");

const secInput:HTMLInputElement | null = document.querySelector(".sec-input1");
appendOutput(pdfElem, secInput);

const secInput2:HTMLInputElement | null = document.querySelector(".sec-input2");
appendOutput(pdfElem, secInput2);

const pdfName:HTMLInputElement | null = document.querySelector(".sec-name");
addOutput(pdfName);
*/






//*--|*|--*\\_____// Image Upload \\_____//*--|*|--*\\



// Upload Icon
const uploadIcon:string = "<svg class='modal-icon lm-upload-icon' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><defs><style>.cls-1{fill:none;stroke-linecap:round;stroke-linejoin:round;}</style></defs><circle class='cls-1' cx='100' cy='100' r='90'/><path class='cls-1 lm-upload-inner' d='M145.6,116.6v15.9a15,15,0,0,1-15,15H69.4a15,15,0,0,1-15-15V116.6'/><line class='cls-1 lm-upload-inner lm-upload-arrow lm-upload-arrowshaft' x1='100' y1='121.9' x2='100' y2='52.5'/><polyline class='cls-1 lm-upload-inner lm-upload-arrow' points='124.7 77.2 100 52.5 75.3 77.2'/></svg>";

// Checkmark Icon
const checkmarkIcon:string = "<svg class='modal-icon lm-check-icon' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><defs><style>.cls-1{fill:none;stroke-linecap:round;stroke-linejoin:round;}</style></defs><circle class='cls-1 lm-check-circle' cx='100' cy='100' r='90'/><polyline class='cls-1 lm-checkmark' points='51.9 103 84.1 135.3 148.1 71.3'/></svg>";

// X Icon
const xIcon:string = "<svg class='modal-icon lm-x-icon' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><defs><style>.cls-1{fill:none; stroke-linecap:round;stroke-linejoin:round;}</style></defs><circle class='cls-1' cx='100' cy='100' r='90'/><line class='cls-1 lm-x-inner' x1='61.3' y1='61.3' x2='138.7' y2='138.7'/><line class='cls-1 lm-x-inner' x1='138.7' y1='61.3' x2='61.3' y2='138.7'/></svg>";



    /* File Upload */

// Drop Zones (you can drop the file on these elements)
const dropZones:NodeListOf<Element> = document.querySelectorAll(".drop-zone");

// Upload Time
const uploadTime:number = 1750;

// Accepted file types
const fileTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];



    /* Upload Functions */

// Insert logo
function insertImgElem(url, insertElements){
    insertElements.forEach((logoElem) => {

        // Create an image element
        const logoImg:HTMLImageElement = document.createElement("img");
        logoImg.src = url;
        logoImg.classList.add("insert-logo-img");
        logoImg.setAttribute("alt", "Uploaded Logo");

        // Remove previous content from the logo elements
        logoElem.innerHTML = "";

        // Append logo to the elements
        setTimeout(function(){
            logoElem.appendChild(logoImg);
        }, uploadTime);
        
    });
}

// Insert upload icon
function insertUploadIcon(){
    dropZones.forEach((dropZone) => {
        dropZone!.innerHTML = uploadIcon;
    });
}
insertUploadIcon();

// Remove upload icon active class
function uploadIconActive(){
    dropZones.forEach((dropZone) => {
        dropZone?.classList.remove("modal-icon-active");
    });
}

// Insert X icon
function insertXIcon(){
    dropZones.forEach((dropZone) => {
        dropZone!.innerHTML = xIcon;
    });
}

// Checkmark icon
function successfulUpload(dropZone){
    dropZone!.innerHTML = checkmarkIcon;

    // Insert the upload icon and remove the classes
    dropZones.forEach((dropZone) => {
        dropZone?.classList.remove("modal-icon-active");

        setTimeout(function(){
            insertUploadIcon();
            dropZone?.classList.remove("modal-drop");
        }, uploadTime);
    });
    
}



    /* Document Events */

// Document drag events
function docDragOver(e){
    e.preventDefault();

    // Get the file dragged over the document
    const file:DataTransferItem | undefined = e.dataTransfer?.items[0];

    dropZones.forEach((dropZone) => {

        if (file && fileTypes.includes(file.type)){
            dropZone?.classList.add("modal-icon-active");
        } else if (file &&
        !fileTypes.includes(file.type) &&
        !dropZone?.contains(document.querySelector(".lm-x-icon"))){

            // Insert X icon
            insertXIcon();
        }

    });
}

function docDragLeave(e){

    // If the mouse is within the window - do nothing
    if (e.clientX > 0 && e.clientY > 0 && 
    e.clientX < window.innerWidth && e.clientY < window.innerHeight){
        return;
    }
        
    // Insert upload icon
    insertUploadIcon();

    // Remove the active class
    uploadIconActive();
}

document.documentElement.addEventListener("dragover", function(e){
    docDragOver(e);
});

document.body.addEventListener("dragleave", function(e){
    docDragLeave(e)
});

// File on document drop
function docDrop(e){

    // Prevent from opening the file in another tab
    e.preventDefault();

    if ((e.target as HTMLElement | null)!.closest(".drop-zone")){
        return;
    }
    
    // Insert upload icon
    insertUploadIcon();
    
    // Remove the active class
    uploadIconActive();
}

document.documentElement.addEventListener("drop", function(e){
    docDrop(e);
});



    /* Drop Zone */

// Drag events
function fileDragOver(e, dropZone){

    // Get the file dragged over the document
    const file:DataTransferItem | undefined = e.dataTransfer?.items[0];

    if (file && fileTypes.includes(file.type)){
        dropZone?.classList.add("modal-drop");
    }
}

// Functions called on logo upload
function uploadFunctions(url, insertElements, dropZone){

    // Successful Upload
    successfulUpload(dropZone);

    // Insert images into the page elements
    insertImgElem(url, insertElements);
}

// Drop zone drop event
function fileDrop(e, insertElements, dropZone){

    // Prevent from opening the file in another tab
    e.preventDefault();

    // Get the dropped file
    const file = e.dataTransfer?.files[0];

    if (file && fileTypes.includes(file.type)){

        // Create an URL object
        const url:string = URL.createObjectURL(file);
        uploadFunctions(url, insertElements, dropZone);

    } else {

        // Insert upload icon
        insertUploadIcon();
    }
}

// File upload via input
function fileInputUpload(insertElements, fileInput, dropZone){
    const file:File = fileInput!.files![0];
console.log(fileInput)
    if (file && fileTypes.includes(file.type)){

        // Create an URL object
        const url:string = URL.createObjectURL(file);

        uploadFunctions(url, insertElements, dropZone);

    } else if (file && !fileTypes.includes(file.type)){
        // Input (in HTML) excludes undesired file types, but just in case

        // Insert X icon
        insertXIcon();

        // Insert upload icon after some time
        setTimeout(function(){
            insertUploadIcon();
        }, 1000);

    }
}

// Delete File
function fileDelete(insertElements){
    insertElements.forEach((logoElem) => {
        logoElem.innerHTML = "";
    });
}

function fileEvents(dropZone, fileInput, deleteFileBtn, insertElements){

    // Drop zone drag events
    dropZone?.addEventListener("dragover", function(e){
        fileDragOver(e, dropZone);
    });
    
    dropZone?.addEventListener("dragleave", function(){
        dropZone?.classList.remove("modal-drop");
    });

    // Drop zone drop event
    dropZone?.addEventListener("drop", function(e){
        fileDrop(e, insertElements, dropZone);
    });

    // File upload via input
    fileInput?.addEventListener("change", function(){
        fileInputUpload(insertElements, fileInput, dropZone);
    });

    // Delete file
    deleteFileBtn?.addEventListener("click", () => {
        fileDelete(insertElements);
    });
    
}



    /* Photo */

// Drop zone element
const photoDropZone:HTMLElement | null = document.querySelector(".photo-drop-zone");

// File input
const photoFileInput:HTMLInputElement | null = document.querySelector(".photo-upload-btn");

// Insert image elements
const insertPhotos:NodeListOf<Element> = document.querySelectorAll(".insert-photo");

// Delete file button
const deletePhotoBtn:HTMLElement | null = document.querySelector(".delete-photo");

fileEvents(photoDropZone, photoFileInput, deletePhotoBtn, insertPhotos);



    /* QR Code */

// Drop zone element
const dropZoneQR:HTMLElement | null = document.querySelector(".qr-drop-zone");

// File input
const fileInputQR:HTMLInputElement | null = document.querySelector(".qr-upload-btn");

// Insert image elements
const insertImagesQR:NodeListOf<Element> = document.querySelectorAll(".qr-insert");

// Delete file button
const deleteFileBtnQR:HTMLElement | null = document.querySelector(".qr-delete-file");

fileEvents(dropZoneQR, fileInputQR, deleteFileBtnQR, insertImagesQR);



//*--|*|--*\\_____// Input to Output \\_____//*--|*|--*\\



const inputElements:NodeListOf<HTMLInputElement> = document.querySelectorAll(".inp-add");

// Add output elements (for each .inp-add element)
function addOutputElements(){
    inputElements.forEach(function(inputElem){
        const outputClass:string | null = inputElem.getAttribute("data-output");
        const output:HTMLElement | null = document.querySelector("."+outputClass);
        
        inputElem.addEventListener("input", function(){
    
            // Change the element value to the input value
            if (output){
                output.innerHTML = inputElem.value;
            }
        });
    });
}
addOutputElements();

// Insert value into the output
function addOutput(inputElem){
    const outputClass:string = inputElem.getAttribute("data-output");
    const output:HTMLElement | null = document.querySelector("."+outputClass);
    
    inputElem.addEventListener("input", function(){

        // Change the element value to the input value
        if (output){
            output.innerHTML = inputElem.value;
        }
    });
}

// Append output
function appendOutput(appendTo, inputElem){

    const outputClass:string = inputElem.getAttribute("data-output");

    // Create an element and append it
    const pdfOutput:HTMLElement = document.createElement("p");
    pdfOutput.classList.add(outputClass);
    appendTo?.appendChild(pdfOutput);

    inputElem.addEventListener("input", function(){

        // Change the element value to the input value
        const output:HTMLElement | null = document.querySelector("."+outputClass);

        if (output){
            output.innerHTML = inputElem.value;
        }

    });

}

// Append output that is removed when there's no value
function appendRemoveableOutput(appendTo, inputElem){

    let hasVal:boolean = false;
    const outputClass:string = inputElem.getAttribute("data-output");

    inputElem.addEventListener("input", function(){

        // If there was no data entered
        if (hasVal === false){

            // Create an element and append it
            const pdfOutput:HTMLElement = document.createElement("p");
            pdfOutput.classList.add(outputClass);
            appendTo?.appendChild(pdfOutput);

            // The data was entered, so set the variable to true
            hasVal = true;
        }

        const output:HTMLElement | null = document.querySelector("."+outputClass);

        // If all of the data was removed - remove the appended element
        if (output && 
        inputElem.value.length === 0){
            output.remove();
            hasVal = false;
        }

        // Change the element value to the input value
        if (output){
            output.innerHTML = inputElem.value;
        }

    });

}



//*--|*|--*\\_____// Create HTML Elements \\_____//*--|*|--*\\


// Create a Div
function createDiv(elemObj, elemIndex){

    const elemClasses:string = elemObj.elemClasses;
    const elemIndexClasses:string = elemObj.elemIndexClasses;

    const newElem:HTMLElement = document.createElement("div");

    if (elemClasses.trim() != ""){
        const classNames = elemClasses.split(", ");
        newElem.classList.add(...classNames);
    }

    if (elemIndexClasses.trim() != ""){
        const classNamesIndex = elemIndexClasses.split(", ");
        classNamesIndex.forEach((classIndex) => {
            newElem.classList.add(classIndex + elemIndex);
        });
    }

    return newElem;

}

// Create a Label
function createLabel(elemObj, elemIndex){

    const elemName:string = elemObj.elemName;
    const elemFor:string = elemObj.elemFor;
    const elemClasses:string = elemObj.elemClasses;
    const elemIndexClasses:string = elemObj.elemIndexClasses;

    const newElem:HTMLLabelElement = document.createElement("label");

    if (elemClasses.trim() != ""){
        const classNames = elemClasses.split(", ");
        newElem.classList.add(...classNames);
    }

    if (elemIndexClasses.trim() != ""){
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
function createInput(elemObj, elemIndex){

    const elemType:string = elemObj.elemType;
    const elemId:string = elemObj.elemId;
    const elemClasses:string = elemObj.elemClasses;
    const elemIndexClasses:string = elemObj.elemIndexClasses;
    const elemPlaceholder:string = elemObj.elemPlaceholder;
    const elemDataOutput:string = elemObj.elemDataOutput;

    const newElem:HTMLInputElement = document.createElement("input");
    newElem.type = elemType;

    if (elemClasses.trim() != ""){
        const classNames = elemClasses.split(", ");
        newElem.classList.add(...classNames);
    }

    if (elemIndexClasses.trim() != ""){
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
function createTextArea(elemObj, elemIndex){

    const elemId:string = elemObj.elemId;
    const elemClasses:string = elemObj.elemClasses;
    const elemIndexClasses:string = elemObj.elemIndexClasses;
    const elemPlaceholder:string = elemObj.elemPlaceholder;
    const elemDataOutput:string = elemObj.elemDataOutput;

    const newElem:HTMLTextAreaElement = document.createElement("textarea");

    if (elemClasses.trim() != ""){
        const classNames = elemClasses.split(", ");
        newElem.classList.add(...classNames);
    }

    if (elemIndexClasses.trim() != ""){
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
*/



//*--|*|--*\\_____// Create Links \\_____//*--|*|--*\\



const pdfLinks:HTMLElement | null = document.querySelector(".sec-link-list");
const pdfLinksOutput:HTMLElement | null = document.querySelector(".pdf-links");
const addLinkBtn:HTMLElement | null = document.querySelector(".add-link");

// Change the label text to the input value
function changeLabel(inputElem, labelElem, labelName){
    inputElem.addEventListener("input", function(){
        if (inputElem.value != ""){
            labelElem.innerHTML = inputElem.value;
        } else {
            labelElem.innerHTML = labelName;
        }
        
    });
}

// Add the link elements
let linkIndex:number = 0;
const linkLabelName:string = "Link Name";

const linkDivObj:Object = {
    elemClasses: "sec-link",
    elemIndexClasses: ""
}

const linkElem1Obj:Object = {
    elemClasses: "section-item",
    elemIndexClasses: ""
}

const linkElem2Obj:Object = {
    elemClasses: "section-item",
    elemIndexClasses: ""
}

const deleteLinkBtnObj:Object = {
    elemClasses: "delete-btn, delete-link",
    elemIndexClasses: ""
}

const newLabel1Obj:Object = {
    elemName: linkLabelName,
    elemFor: "sec-link-name",
    elemClasses: "",
    elemIndexClasses: ""
}

const newLabel2Obj:Object = {
    elemName: "URL",
    elemFor: "sec-link-url",
    elemClasses: "",
    elemIndexClasses: ""
}

const newInput1Obj:Object = {
    elemType: "text",
    elemId: "sec-link-name",
    elemClasses: "sec-input",
    elemIndexClasses: "sec-link-name",
    elemPlaceholder: "LinkedIn Profile",
    elemDataOutput: "pdf-link-name"
}

const newInput2Obj:Object = {
    elemType: "text",
    elemId: "sec-link-url",
    elemClasses: "sec-input",
    elemIndexClasses: "sec-link-url",
    elemPlaceholder: "https://www.linkedin.com/in/johndoe",
    elemDataOutput: "pdf-link-url"
}

function addLink(){

    const linkNumber:number = pdfLinks?.querySelectorAll(".sec-link").length ?? 0;
    
    if (linkNumber < 5){

        // Create a link div
        const newLinkDiv:HTMLElement = createDiv(linkDivObj, linkIndex);
        


            /* Link Name */

        // Create a link name div
        const linkElem1:HTMLElement = createDiv(linkElem1Obj, linkIndex);
        
        // Create a link name label
        const newLabel1:HTMLLabelElement = createLabel(newLabel1Obj, linkIndex);
    
        // Create a link name input
        const newInput1:HTMLInputElement = createInput(newInput1Obj, linkIndex);

        // Append the label and input
        linkElem1?.appendChild(newLabel1);
        linkElem1?.appendChild(newInput1);
    


            /* Link URL */
    
        // Create a link url div
        const linkElem2:HTMLElement = createDiv(linkElem2Obj, linkIndex);
    
        // Create a link url label
        const newLabel2:HTMLLabelElement = createLabel(newLabel2Obj, linkIndex);

        // Create a link url input
        const newInput2:HTMLInputElement = createInput(newInput2Obj, linkIndex);
    
        // Append the label and input
        linkElem2?.appendChild(newLabel2);
        linkElem2?.appendChild(newInput2);



            /* Delete Link Button */

        const deleteLinkBtn:HTMLElement = createDiv(deleteLinkBtnObj, linkIndex);
        deleteLinkBtn.setAttribute("delete-name", "pdf-link-name"+linkIndex);
        deleteLinkBtn.setAttribute("delete-url", "pdf-link-url"+linkIndex);


        
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
        if (linkNumber !== 0){
            newInput1.focus();
        }

        // Change the input label
        changeLabel(newInput1, newLabel1, linkLabelName);

        // Delete the link in the PDF
        deleteLinkBtn.addEventListener("click", function(){

            // PDF Link Label
            const pdfNameElemClass:HTMLElement | null = document.querySelector("." + 
            deleteLinkBtn.getAttribute("delete-name"));
    
            // PDF Link URL
            const pdfUrlElemClass:HTMLElement | null = document.querySelector("." + 
                deleteLinkBtn.getAttribute("delete-url"));

            // Remove the section link element if it's not the first one
            newLinkDiv.remove();

            // Remove the link elements from the PDF preview
            pdfNameElemClass?.remove();
            pdfUrlElemClass?.remove();

        });

        // Add 1 to the index
        linkIndex++

    }

}

addLinkBtn?.addEventListener("click", addLink);