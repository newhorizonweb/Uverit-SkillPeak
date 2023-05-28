


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

addLinkBtn?.addEventListener("click", function(){

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
        newInput1.focus();

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

});





