


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



//*--|*|--*\\_____// Inputs \\_____//*--|*|--*\\



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



const pdfLinks:HTMLElement | null = document.querySelector(".section1 .sec-links");
const pdfLinksOutput:HTMLElement | null = document.querySelector(".pdf-links");
const addLinkBtn:HTMLElement | null = document.querySelector(".add-link");

// Change the label text to the input value
function changeLabel(inputElem, labelElem){
    inputElem.addEventListener("input", function(){
        labelElem.innerHTML = inputElem.value;
    });
}

// Add the link elements
let linkIndex:number = 0;

function addLink(){

    const linkNumber:number = pdfLinks?.querySelectorAll(".sec-link").length ?? 0;

    if (linkNumber < 5){

        // Create a link div
        const newLinkDiv:HTMLElement = document.createElement("div");
        newLinkDiv.classList.add("sec-link");
    


            /* Link Name */

        // Create a link name div
        const createSecElem1:HTMLElement = document.createElement("div");
        createSecElem1.classList.add("section-item");
        
        // Create a link name label
        const newLabel1:HTMLLabelElement = document.createElement("label");
        newLabel1.setAttribute("for", "sec-link-name"+linkIndex);
        newLabel1.innerHTML = "Link Name";
    
        // Create a link name input
        const newInput1:HTMLInputElement = document.createElement("input");
        newInput1.type = "text";
        newInput1.classList.add("sec-input", "sec-link-name"+linkIndex);
        newInput1.setAttribute("id", "sec-link-name"+linkIndex);
        newInput1.setAttribute("data-output", "pdf-link-name"+linkIndex);

        // Append the label and input
        createSecElem1?.appendChild(newLabel1);
        createSecElem1?.appendChild(newInput1);
    


            /* Link URL */
    
        // Create a link url div
        const createSecElem2:HTMLElement = document.createElement("div");
        createSecElem2.classList.add("section-item");
    
        // Create a link url label
        const newLabel2:HTMLLabelElement = document.createElement("label");
        newLabel2.setAttribute("for", "sec-link-url"+linkIndex);
        newLabel2.innerHTML = "URL";
    
        // Create a link url input
        const newInput2:HTMLInputElement = document.createElement("input");
        newInput2.type = "text";
        newInput2.classList.add("sec-input", "sec-link-url"+linkIndex);
        newInput2.setAttribute("id", "sec-link-url"+linkIndex);
        newInput2.setAttribute("data-output", "pdf-link-url"+linkIndex);
    
        // Append the label and input
        createSecElem2?.appendChild(newLabel2);
        createSecElem2?.appendChild(newInput2);



            /* Delete Link Button */

        const deleteLinkBtn:HTMLElement = document.createElement("div");
        deleteLinkBtn.classList.add("delete-btn", "delete-link");
        deleteLinkBtn.setAttribute("delete-name", "pdf-link-name"+linkIndex);
        deleteLinkBtn.setAttribute("delete-url", "pdf-link-url"+linkIndex);


        
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
        if (linkNumber !== 0){
            newInput1.focus();
        }

        // Change the input label
        changeLabel(newInput1, newLabel1);

        // Delete the link in the PDF
        deleteLinkBtn.addEventListener("click", function(){

            const pdfNameElemClass:HTMLElement | null = document.querySelector("."+deleteLinkBtn.getAttribute("delete-name"));
            
            const pdfUrlElemClass:HTMLElement | null = document.querySelector("."+deleteLinkBtn.getAttribute("delete-url"));

            pdfNameElemClass?.remove();
            pdfUrlElemClass?.remove();
            newLinkDiv.remove();

        });

        // Add 1 to the index
        linkIndex++

    }

}

addLink();
addLinkBtn?.addEventListener("click", addLink);



//*--|*|--*\\_____// Image Upload \\_____//*--|*|--*\\



// Upload Icon
const uploadIcon:string = "<svg class='modal-icon lm-upload-icon' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><defs><style>.cls-1{fill:none;stroke-linecap:round;stroke-linejoin:round;}</style></defs><circle class='cls-1' cx='100' cy='100' r='90'/><path class='cls-1 lm-upload-inner' d='M145.6,116.6v15.9a15,15,0,0,1-15,15H69.4a15,15,0,0,1-15-15V116.6'/><line class='cls-1 lm-upload-inner lm-upload-arrow lm-upload-arrowshaft' x1='100' y1='121.9' x2='100' y2='52.5'/><polyline class='cls-1 lm-upload-inner lm-upload-arrow' points='124.7 77.2 100 52.5 75.3 77.2'/></svg>";

// Checkmark Icon
const checkmarkIcon:string = "<svg class='modal-icon lm-check-icon' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><defs><style>.cls-1{fill:none;stroke-linecap:round;stroke-linejoin:round;}</style></defs><circle class='cls-1 lm-check-circle' cx='100' cy='100' r='90'/><polyline class='cls-1 lm-checkmark' points='51.9 103 84.1 135.3 148.1 71.3'/></svg>";

// X Icon
const xIcon:string = "<svg class='modal-icon lm-x-icon' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><defs><style>.cls-1{fill:none; stroke-linecap:round;stroke-linejoin:round;}</style></defs><circle class='cls-1' cx='100' cy='100' r='90'/><line class='cls-1 lm-x-inner' x1='61.3' y1='61.3' x2='138.7' y2='138.7'/><line class='cls-1 lm-x-inner' x1='138.7' y1='61.3' x2='61.3' y2='138.7'/></svg>";



    /* File Upload */

// Upload Time
const uploadTime:number = 1750;

// Drop zone element
const dropZone:HTMLElement | null = document.querySelector(".drop-zone");

// File input
const fileInput:HTMLInputElement | null = document.querySelector(".lm-file");

// Insert the image into these elements
const insertLogoElements:NodeListOf<Element> = document.querySelectorAll(".insert-photo");

// Accepted file types
const fileTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];



    /* Upload Functions */

// Insert logo
function insertLogo(url){
    insertLogoElements.forEach((logoElem) => {

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
    dropZone!.innerHTML = uploadIcon;
}
insertUploadIcon();

// Remove upload icon active class
function uploadIconActive(){
    dropZone?.classList.remove("modal-icon-active");
}

// Insert X icon
function insertXIcon(){
    dropZone!.innerHTML = xIcon;
}

// Checkmark icon
function successfulUpload(){
    dropZone!.innerHTML = checkmarkIcon;

    // Insert the upload icon and remove the classes
    setTimeout(function(){
        insertUploadIcon();
        dropZone?.classList.remove("modal-icon-active");
        dropZone?.classList.remove("modal-drop");
    }, uploadTime);

}



    /* Document drag events */

document.documentElement.addEventListener('dragover', function(e){
    e.preventDefault();

    // Get the file dragged over the document
    const file:DataTransferItem | undefined = e.dataTransfer?.items[0];

    if (file && fileTypes.includes(file.type)){
        dropZone?.classList.add("modal-icon-active");
    } else if (file &&
    !fileTypes.includes(file.type) &&
    !dropZone?.contains(document.querySelector(".lm-x-icon"))){

        // Insert X icon
        insertXIcon();
    }
});

document.body.addEventListener('dragleave', function(e){

    // If the mouse is within the window - do nothing
    if (e.clientX > 0 && e.clientY > 0 && e.clientX < window.innerWidth && e.clientY < window.innerHeight) {
        return;
    }
        
    // Insert upload icon
    insertUploadIcon();

    // Remove the active class
    uploadIconActive();

});



    /* File on document drop */

document.documentElement.addEventListener('drop', function(e){

    // Prevent from opening the file in another tab
    e.preventDefault();

    const eTarget:HTMLElement | null = e.target as HTMLElement | null;

    if (!eTarget!.closest(".drop-zone")){

        // Insert upload icon
        insertUploadIcon();

        // Remove the active class
        uploadIconActive();
    }
});



    /* Drop zone drag events */

dropZone?.addEventListener('dragover', function(e){

    // Get the file dragged over the document
    const file:DataTransferItem | undefined = e.dataTransfer?.items[0];

    if (file && fileTypes.includes(file.type)){
        dropZone?.classList.add("modal-drop");
    }

});

dropZone?.addEventListener('dragleave', function(e){
    dropZone?.classList.remove("modal-drop");
});

// Functions called on logo upload
function uploadFunctions(url){

    // Successful Upload
    successfulUpload();

    // Insert images into the page elements
    insertLogo(url);

}



    /* Drop zone drop event */

dropZone?.addEventListener('drop', function(e){

    // Prevent from opening the file in another tab
    e.preventDefault();

    // Get the dropped file
    const file = e.dataTransfer?.files[0];

    if (file && fileTypes.includes(file.type)){

        // Create an URL object
        const url:string = URL.createObjectURL(file);

        uploadFunctions(url);

    } else {

        // Insert upload icon
        insertUploadIcon();
    }

});



    /* File upload via input */

fileInput?.addEventListener("change", function(){

    const file:File = fileInput.files![0];

    if (file && fileTypes.includes(file.type)){

        // Create an URL object
        const url:string = URL.createObjectURL(file);

        uploadFunctions(url);

    } else if (file && !fileTypes.includes(file.type)){
        // Input (in HTML) excludes undesired file types, but just in case

        // Insert X icon
        insertXIcon();

        // Insert upload icon after some time
        setTimeout(function(){
            insertUploadIcon();
        }, 1000);

    }

});



    /* Delete File Button */

const deleteFileBtn:HTMLElement | null = document.querySelector(".delete-file");

deleteFileBtn?.addEventListener("click", () => {
    insertLogoElements.forEach((logoElem) => {
        logoElem.innerHTML = "";
    });
});