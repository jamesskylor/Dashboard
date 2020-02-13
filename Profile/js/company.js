window.addEventListener("load", (e)=>{
    // Get values from database and set the placeholder values tot eh right ones
    loadValues();
});

document.getElementById("theSaveButton").addEventListener("click", (e)=>{
    e.preventDefault();
    saveInfo();
});

function loadValues(){
    // Get database data
    var name;
    var site;
    var desc;
    var vert;
    var prod;
    var reas;
    var time;
    var prog;
    var prog2;
    var inc;
    var publ;
    // Load the placeholder values to the correct ones
    document.getElementById("compNameField").value = name;
    document.getElementById("compSiteField").value = site;
    document.getElementById("compDescField").value = desc;
    document.getElementById("compVertField").value = vert;
    document.getElementById("compProdField").value = prod;
    document.getElementById("compReasField").value = reas;
    document.getElementById("compTimeField").value = time;
    document.getElementById("compProgField").value = prog;
    document.getElementById("compProg2Field").value = prog2;
    document.getElementById(inc).checked = true;
    document.getElementById(publ).checked = true;
}

function saveInfo(){
    // Take in the values
    var companyName = document.getElementById("compNameField").value;
    var companyWebsite = document.getElementById("compSiteField").value;
    var companyDescription = document.getElementById("compDescField").value;
    var verticality = document.getElementById("compVertField").value;
    var companyProduct = document.getElementById("compProdField").value;
    var companyReason = document.getElementById("compReasField").value;
    var fullOrPartTime = document.getElementById("compTimeField").value;
    var companyProgress = document.getElementById("compProgField").value;
    var companyProgress2 = document.getElementById("compProg2Field").value;
    var incorporated = document.querySelector('input[name="compInc"]:checked').value;
    var publicity = document.querySelector('input[name="compPublicity"]:checked').value;
    // Check for validity/process information
    
    // If not valid
    
        // Reject and resubmit
    
    // If valid
    
        // Send data to the server
}