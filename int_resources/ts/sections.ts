


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

// Create a Button
function createBtn(elemObj, elemIndex){

    const elemClasses:string = elemObj.elemClasses;
    const elemIndexClasses:string = elemObj.elemIndexClasses;

    const newElem:HTMLElement = document.createElement("button");

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

let linkIndex:number = 0;

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

        // Index number =+ 1
        linkIndex++

    }

}

addLinkBtn?.addEventListener("click", addLink);



//*--|*|--*\\_____// Create Work Experience Elements \\_____//*--|*|--*\\



// SVG
const bpListIcon:string = "<svg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><line class='cls-1' x1='51.4' y1='19' x2='191' y2='19.2'/><path class='cls-2' d='M191,28.2h0L51.4,28a9,9,0,0,1,0-18h0l139.6.2a9,9,0,0,1,0,18Z'/><path class='cls-2' d='M9,28l-1.7-.2-1.7-.5A8,8,0,0,1,4,26.5L2.6,25.4,1.5,24a8,8,0,0,1-.8-1.6,9.8,9.8,0,0,1-.5-1.6A11,11,0,0,1,0,19a9.4,9.4,0,0,1,2.6-6.4L4,11.5l1.6-.8,1.7-.5a6.9,6.9,0,0,1,3.5,0l1.7.5,1.5.8,1.4,1.1A7.6,7.6,0,0,1,16.5,14a8,8,0,0,1,.8,1.6,9.8,9.8,0,0,1,.5,1.6A5.5,5.5,0,0,1,18,19a5.5,5.5,0,0,1-.2,1.8,9.8,9.8,0,0,1-.5,1.6,8,8,0,0,1-.8,1.6,13.4,13.4,0,0,1-1.1,1.4A9.4,9.4,0,0,1,9,28Z'/><line class='cls-1' x1='51.4' y1='180.8' x2='191' y2='181'/><path class='cls-2' d='M191,190h0l-139.6-.2a9,9,0,0,1,0-18h0L191,172a9,9,0,0,1,0,18Z'/><path class='cls-2' d='M9,189.8a9,9,0,0,1-6.4-2.6,7.6,7.6,0,0,1-1.1-1.4,10.9,10.9,0,0,1-.8-1.5,10.9,10.9,0,0,1-.5-1.7,11,11,0,0,1-.2-1.8,11.1,11.1,0,0,1,.2-1.7,8.4,8.4,0,0,1,.5-1.7l.8-1.6a6.9,6.9,0,0,1,1.1-1.3A9.1,9.1,0,0,1,9,171.8a9.1,9.1,0,0,1,6.4,2.7,6.9,6.9,0,0,1,1.1,1.3l.8,1.6a8.4,8.4,0,0,1,.5,1.7,11.1,11.1,0,0,1,.2,1.7,11,11,0,0,1-.2,1.8,10.9,10.9,0,0,1-.5,1.7,10.9,10.9,0,0,1-.8,1.5,7.6,7.6,0,0,1-1.1,1.4A9,9,0,0,1,9,189.8Z'/><line class='cls-1' x1='51.4' y1='99.9' x2='191' y2='100.1'/><path class='cls-2' d='M191,109.1h0l-139.6-.2a9,9,0,0,1,0-18h0l139.6.2a9,9,0,0,1,0,18Z'/><path class='cls-2' d='M9,108.9a9,9,0,0,1-6.4-2.6,7.6,7.6,0,0,1-1.1-1.4,10.9,10.9,0,0,1-.8-1.5,15.4,15.4,0,0,1-.5-1.7A11,11,0,0,1,0,99.9a8.8,8.8,0,0,1,.2-1.7,8.4,8.4,0,0,1,.5-1.7,8,8,0,0,1,.8-1.6,6.9,6.9,0,0,1,1.1-1.3,9.1,9.1,0,0,1,8.2-2.5l1.6.5,1.6.8,1.4,1.2a6.9,6.9,0,0,1,1.1,1.3,8,8,0,0,1,.8,1.6,8.4,8.4,0,0,1,.5,1.7,8.8,8.8,0,0,1,.2,1.7,11,11,0,0,1-.2,1.8,15.4,15.4,0,0,1-.5,1.7,10.9,10.9,0,0,1-.8,1.5,7.6,7.6,0,0,1-1.1,1.4L14,107.4l-1.6.8a10.4,10.4,0,0,1-1.6.6Z'/></svg>";

const numberListIcon:string = "<svg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><line class='cls-1' x1='119.5' y1='19' x2='191' y2='19.2'/><path class='cls-2' d='M191,28.2h0L119.5,28a9,9,0,0,1,0-18h0l71.5.2a9,9,0,0,1,0,18Z'/><line class='cls-1' x1='119.5' y1='180.8' x2='191' y2='181'/><path class='cls-2' d='M191,190h0l-71.5-.2a9,9,0,0,1,0-18h0l71.5.2a9,9,0,0,1,0,18Z'/><line class='cls-1' x1='119.5' y1='99.9' x2='191' y2='100.1'/><path class='cls-2' d='M191,109.1h0l-71.5-.2a9,9,0,0,1,0-18h0l71.5.2a9,9,0,0,1,0,18Z'/><path d='M52.6,191.5a8.5,8.5,0,0,1-6-2.3,7.8,7.8,0,0,1-2.3-5.5V27.2l2.9,2.6L12.6,53.2a8,8,0,0,1-4.4,1.3,7.6,7.6,0,0,1-5.6-2.6A7.7,7.7,0,0,1,.1,46.4a7.3,7.3,0,0,1,4.2-6.7L47.7,11.1a10.4,10.4,0,0,1,3.2-1.5,7.8,7.8,0,0,1,3-.1A7,7,0,0,1,59.1,12a8.1,8.1,0,0,1,1.8,5.3V183.7a7.4,7.4,0,0,1-2.3,5.5A8.3,8.3,0,0,1,52.6,191.5Z'/></svg>";



// Elements
const expList:HTMLElement | null = document.querySelector(".experience-list");
const addExpBtn:HTMLElement | null = document.querySelector(".add-experience");
const appendExp:HTMLElement | null = document.querySelector(".exp-append");

const jobTitle:string = "Job Title";


    /* Element Objects */

const expSectionObj:Object = {
    elemClasses: "sec-exp, dock-inner",
    elemIndexClasses: "sec-exp"
}
const expHeadObj:Object = {
    elemClasses: "sec-exp-head",
    elemIndexClasses: "sec-exp-head"
}
const deleteExpBtnObj:Object = {
    elemClasses: "delete-btn, delete-exp",
    elemIndexClasses: "delete-exp"
}
const expIndicatorObj:Object = {
    elemClasses: "sec-exp-indicator",
    elemIndexClasses: "sec-exp-indicator"
}

const secInputsObj:Object = {
    elemClasses: "sec-exp-inputs",
    elemIndexClasses: ""
}
const secItemObj:Object = {
    elemClasses: "section-item",
    elemIndexClasses: ""
}
const pdfExpDivObj:Object = {
    elemClasses: "pdf-exp",
    elemIndexClasses: ""
}


const jobTitleLabObj:Object = {
    elemName: "Job Title",
    elemFor: "sec-job-title",
    elemClasses: "exp-label",
    elemIndexClasses: ""
}

const jobTitleInpObj:Object = {
    elemType: "text",
    elemId: "sec-job-title",
    elemClasses: "sec-input",
    elemIndexClasses: "sec-job-title",
    elemPlaceholder: "",
    elemDataOutput: "pdf-job-title"
}


const compLabObj:Object = {
    elemName: "Company",
    elemFor: "sec-company",
    elemClasses: "exp-label",
    elemIndexClasses: ""
}

const compInpObj:Object = {
    elemType: "text",
    elemId: "sec-company",
    elemClasses: "sec-input",
    elemIndexClasses: "sec-company",
    elemPlaceholder: "",
    elemDataOutput: "pdf-company"
}


const locationLabObj:Object = {
    elemName: "Location",
    elemFor: "sec-location",
    elemClasses: "exp-label",
    elemIndexClasses: ""
}

const locationInpObj:Object = {
    elemType: "text",
    elemId: "sec-location",
    elemClasses: "sec-input",
    elemIndexClasses: "sec-location",
    elemPlaceholder: "",
    elemDataOutput: "pdf-location"
}


const startDateLabObj:Object = {
    elemName: "Start Date",
    elemFor: "sec-start-date",
    elemClasses: "exp-label",
    elemIndexClasses: ""
}

const startDateInpObj:Object = {
    elemType: "date",
    elemId: "sec-start-date",
    elemClasses: "sec-input",
    elemIndexClasses: "sec-start-date",
    elemPlaceholder: "",
    elemDataOutput: "pdf-start-date"
}


const endDateLabObj:Object = {
    elemName: "End Date",
    elemFor: "sec-end-date",
    elemClasses: "exp-label",
    elemIndexClasses: ""
}

const endDateInpObj:Object = {
    elemType: "date",
    elemId: "sec-end-date",
    elemClasses: "sec-input",
    elemIndexClasses: "sec-end-date",
    elemPlaceholder: "",
    elemDataOutput: "pdf-end-date"
}


const currPosLabObj:Object = {
    elemName: "I still work here",
    elemFor: "sec-curr-pos",
    elemClasses: "exp-label",
    elemIndexClasses: ""
}


const descDivObj:Object = {
    elemClasses: "exp-desc-inner",
    elemIndexClasses: ""
}

const descBtnsDivObj:Object = {
    elemClasses: "exp-desc-btns",
    elemIndexClasses: ""
}

const boldBtnObj:Object = {
    elemClasses: "exp-desc-btn, exp-bold-btn",
    elemIndexClasses: ""
}
const italicBtnObj:Object = {
    elemClasses: "exp-desc-btn, exp-italic-btn",
    elemIndexClasses: ""
}
const underlineBtnObj:Object = {
    elemClasses: "exp-desc-btn, exp-underline-btn",
    elemIndexClasses: ""
}

const nrListBtnObj:Object = {
    elemClasses: "exp-desc-btn, exp-list-btn, exp-nr-list-btn",
    elemIndexClasses: ""
}
const bpListBtnObj:Object = {
    elemClasses: "exp-desc-btn, exp-list-btn, exp-bp-list-btn",
    elemIndexClasses: ""
}


const descTextAreaObj:Object = {
    elemClasses: "sec-exp-desc",
    elemIndexClasses: ""
}

let expIndex:number = 0;

function addExperience(){

    const expNumber:number = expList?.querySelectorAll(".sec-exp").length ?? 0;

    if (expNumber < 8){



            /* Section Div */

        // Section Div
        const expSection:HTMLElement = createDiv(expSectionObj, expIndex);

        // Head
        const expHead:HTMLElement = createDiv(expHeadObj, expIndex);

        // Heading
        const expHeading:HTMLElement = document.createElement("h4");
        expHeading.classList.add("sec-exp-heading", "sec-exp-heading" + expIndex);
        expHeading.innerHTML = jobTitle;

        // Delete Button
        const deleteBtn:HTMLElement = createDiv(deleteExpBtnObj, expIndex);
        deleteBtn.setAttribute("delete-exp", "pdf-exp"+expIndex);

        // List Indicator
        const expindicator:HTMLElement = createDiv(expIndicatorObj, expIndex);
        
        expHead.appendChild(expHeading);
        expHead.appendChild(deleteBtn);
        expHead.appendChild(expindicator);

        expSection.appendChild(expHead);



            /* Job Title */

        // Inputs Div
        const secInpsuts:HTMLElement = createDiv(secInputsObj, expIndex);

        // Create Elements
        const jobTitleDiv:HTMLElement = createDiv(secItemObj, expIndex);
        const jobTitleLab:HTMLLabelElement = createLabel(jobTitleLabObj, expIndex);
        const jobTitleInp:HTMLInputElement = createInput(jobTitleInpObj, expIndex);

        // Append
        jobTitleDiv.appendChild(jobTitleLab);
        jobTitleDiv.appendChild(jobTitleInp);
        secInpsuts?.appendChild(jobTitleDiv);

        // Change the section title
        jobTitleInp.addEventListener("input", () => {
            if (jobTitleInp.value.length > 0){
                expHeading.innerHTML = jobTitleInp.value;
            } else {
                expHeading.innerHTML = jobTitle;
            }
        });



            /* Company */

        // Create Elements
        const compDiv:HTMLElement = createDiv(secItemObj, expIndex);
        const compLab:HTMLLabelElement = createLabel(compLabObj, expIndex);
        const compInp:HTMLInputElement = createInput(compInpObj, expIndex);

        // Append
        compDiv.appendChild(compLab);
        compDiv.appendChild(compInp);
        secInpsuts?.appendChild(compDiv);



            /* Location */

        // Create Elements
        const locationDiv:HTMLElement = createDiv(secItemObj, expIndex);
        const locationLab:HTMLLabelElement = createLabel(locationLabObj, expIndex);
        const locationInp:HTMLInputElement = createInput(locationInpObj, expIndex);

        // Append
        locationDiv.appendChild(locationLab);
        locationDiv.appendChild(locationInp);
        secInpsuts?.appendChild(locationDiv);



            /* Start Date */

        // Create Elements
        const startDateDiv:HTMLElement = createDiv(secItemObj, expIndex);
        const startDateLab:HTMLLabelElement = createLabel(startDateLabObj, expIndex);
        const startDateInp:HTMLInputElement = createInput(startDateInpObj, expIndex);

        // Append
        startDateDiv.appendChild(startDateLab);
        startDateDiv.appendChild(startDateInp);
        secInpsuts?.appendChild(startDateDiv);



            /* End Date */

        // Create Elements
        const endDateDiv:HTMLElement = createDiv(secItemObj, expIndex);
        const endDateLab:HTMLLabelElement = createLabel(endDateLabObj, expIndex);
        const endDateInp:HTMLInputElement = createInput(endDateInpObj, expIndex);

        // Append
        endDateDiv.appendChild(endDateLab);
        endDateDiv.appendChild(endDateInp);
        secInpsuts?.appendChild(endDateDiv);



            /* Current Position */

        // Create Elements
        const currPosDiv:HTMLElement = createDiv(secItemObj, expIndex);
        currPosDiv.classList.add("curr-pos-div");
        const currPosLab:HTMLLabelElement = createLabel(currPosLabObj, expIndex);

        const currPosInp:HTMLInputElement = document.createElement("input");
        currPosInp.type = "checkbox";
        currPosInp.classList.add("sec-curr-pos" + expIndex);
        currPosInp.setAttribute("id", "sec-curr-pos" + expIndex);
        currPosInp.setAttribute("data-output", "pdf-curr-pos" + expIndex);

        // Append
        currPosDiv.appendChild(currPosLab);
        currPosDiv.appendChild(currPosInp);
        secInpsuts?.appendChild(currPosDiv);



            /* Description */

        // Create Elements
        const descDiv:HTMLElement = createDiv(secItemObj, expIndex);
        descDiv.classList.add("exp-desc-div");
        const descDivInner:HTMLElement = createDiv(descDivObj, expIndex);


        const descBtnsDiv:HTMLElement = createDiv(descBtnsDivObj, expIndex);

        const boldBtn:HTMLElement = createBtn(boldBtnObj, expIndex);
        boldBtn.innerHTML = "B";

        const italicBtn:HTMLElement = createBtn(italicBtnObj, expIndex);
        italicBtn.innerHTML = "I";

        const underlineBtn:HTMLElement = createBtn(underlineBtnObj, expIndex);
        underlineBtn.innerHTML = "U";


        const nrListBtn:HTMLElement = createBtn(nrListBtnObj, expIndex);
        nrListBtn.innerHTML = numberListIcon;

        const bpListBtn:HTMLElement = createBtn(bpListBtnObj, expIndex);
        bpListBtn.innerHTML = bpListIcon;


        const descLab:HTMLElement = document.createElement("p");
        descLab.classList.add("exp-label");
        descLab.innerHTML = "Description";

        const descTextArea:HTMLElement = createDiv(descTextAreaObj, expIndex);
        descTextArea.setAttribute("id", "sec-exp-desc" + expIndex);
        descTextArea.setAttribute("contentEditable", "true");
        descTextArea.setAttribute("data-output", "pdf-exp-desc" + expIndex);
        descTextArea.setAttribute("placeholder", 
            "Developed and maintained responsive web applications using JavaScript, TypeScript and jQuery.");
        
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
        secInpsuts?.appendChild(descDiv);

        expSection?.appendChild(secInpsuts);



            /* Append Description & Character Limit */

        const outputClass:string | null = descTextArea.getAttribute("data-output");
    
        // Create an element and append it
        const pdfOutput:HTMLElement = document.createElement("p");
        pdfOutput.classList.add(outputClass!);
    
        const maxDescLength:number = 200; 

        function textAreaInput(){

            // Change the element value to the input value
            const output:HTMLElement | null = document.querySelector("."+outputClass);

            // Limit the character number
            if(descTextArea.innerText.length > maxDescLength){
                descTextArea.innerText = descTextArea.innerText.slice(0, maxDescLength);
            }
    
            // Append the text to the pdf preview
            if (output){
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

        let currentListNum:number = 1;
        nrListBtn.addEventListener("click", () => {
            if (descTextArea.innerHTML != ""){
                descTextArea.innerHTML += `<br>${currentListNum}.&nbsp;`;
            } else {
                descTextArea.innerHTML += `${currentListNum}.&nbsp;`;
            }

            nrListBtn.classList.toggle("desc-btn-active");
            textAreaInput();
            currentListNum++
        });

        bpListBtn.addEventListener("click", () => {
            if (descTextArea.innerHTML != ""){
                descTextArea.innerHTML += `<br>&#x2022;&nbsp;`;
            } else {
                descTextArea.innerHTML += `&#x2022;&nbsp;`;
            }

            bpListBtn.classList.toggle("desc-btn-active");
            textAreaInput();
        });



            /* Append the elements to PDF */

        // Append the link name and url output to the pdf
        const pdfExpDiv:HTMLElement = document.createElement("div");
        pdfExpDiv.classList.add("pdf-exp");
        pdfExpDiv.setAttribute("id", "pdf-exp"+expIndex);

        appendOutput(pdfExpDiv, jobTitleInp);
        appendOutput(pdfExpDiv, compInp);
        appendOutput(pdfExpDiv, locationInp);
        appendOutput(pdfExpDiv, startDateInp);
        appendOutput(pdfExpDiv, endDateInp);

        pdfExpDiv.appendChild(pdfOutput);
        appendExp?.appendChild(pdfExpDiv);
        


            /* Delete Link Button Event */

        deleteBtn.addEventListener("click", function(){

            // PDF Experience Section
            const pdfElemClass:HTMLElement | null = document.querySelector("#" + 
            deleteBtn.getAttribute("delete-exp"));

            // Remove the section link element if it's not the first one
            deleteBtn.remove();

            // Remove the experience section (sections)
            expSection?.remove();

            // Remove the experience section from the PDF preview
            pdfElemClass?.remove()

        });

        

            /* Current Position Checkbox Event */

        const currentJobTxt:string = "Present";

        currPosInp.addEventListener("click", () => {

            const pdfEndDate:HTMLElement | null = document.querySelector("." + 
                endDateInp.getAttribute("data-output"))

            if(currPosInp.checked){
                endDateDiv.classList.add("no-end-date");
                pdfEndDate!.innerHTML = currentJobTxt;
            } else {
                endDateDiv.classList.remove("no-end-date");
                pdfEndDate!.innerHTML = endDateInp.value;
            }

        });

        endDateInp.addEventListener("input", () => {
            currPosInp.checked = false;
        });


        
            /* Section expand / collapse */

        function removeOpenClass(){
            document.querySelectorAll(".sec-exp").forEach((section) => {
                if (section !== expSection){
                    section.classList.remove("exp-open");
                }
            });
        }

        removeOpenClass();
        expSection.classList.add("exp-open");

        expHead.addEventListener("click", () => {
            removeOpenClass();
            expSection.classList.toggle("exp-open");
        });



            /* Settings */

        // Append Elements (Section)
        expList?.appendChild(expSection);

        // Set focus when creating a new section
        jobTitleInp.focus();

        // Index number =+ 1
        expIndex++

    }

}

addExpBtn?.addEventListener("click", addExperience);