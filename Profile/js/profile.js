window.addEventListener("load", (e)=>{
    // Get the database values and load them in to the inputs (and the non-input things too)
    loadValues();
});

document.getElementById("theEditButton").addEventListener("click", (e)=>{
    e.preventDefault();
    goToEdit();
});

document.getElementById("theForm").addEventListener("submit", (e)=>{
    e.preventDefault();
    saveInfo();
});

function loadValues(){
    // Get the values from database ***************************************************************************
    var name = "John Smith";
    var email = "jsmith@gmail.com";
    var passwordLength = 10;
    var obscuredPassword = new Array(passwordLength+1).join("*");
    var avatarImg = "https://g.foolcdn.com/editorial/images/539491/getty-stock-market-success.jpg";
    var linkedURL = "https://www.google.com";
    var githubURL = "https://www.google.com";
    var eduLvl = "HS";
    var expArea = "idk";
    var techFounder = "tech"+"N";
    var coFounder = "co"+"N";
    var accomplishments = "Nothing";
    var location = "Atlantis";
    var applicationStat = "applied";
    var publicity = "pub"+"Y";
    // Set the inputs and the <td>'s to the right values
    document.getElementById("nameField").innerHTML = name;
    document.getElementById("emailField").innerHTML = email;
    document.getElementById("passwordField").innerHTML = obscuredPassword;
    document.getElementById("theAvatar").style.backgroundImage = "url("+avatarImg+")";
    document.getElementById("linkedinField").value = linkedURL;
    document.getElementById("githubField").value = githubURL;
    document.getElementById("educationField").value = eduLvl;
    document.getElementById("expertField").value = expArea;
    document.getElementById(techFounder).checked = true;
    document.getElementById(coFounder).checked = true;
    document.getElementById("accomplishmentField").defaultValue = accomplishments;
    document.getElementById("locationField").value = location;
    document.getElementById("applicationField").value = applicationStat;
    document.getElementById(publicity).checked = true;
}

function goToEdit(){
    // Navigate to the Edit Profile Page
    location.assign("editProfile.html");
}

function saveInfo(){
    // Get values
    var linkedURL = document.getElementById("linkedinField").value;
    var githubURL = document.getElementById("githubField").value;
    var eduLvl = document.getElementById("educationField").value;
    var expArea = document.getElementById("expertField").value;
    var techFounder = document.querySelector('input[name="technical"]:checked').value;
    var coFounder = document.querySelector('input[name="cofounder"]:checked').value;
    var accomplishments = document.getElementById("accomplishmentField").value;
    var location = document.getElementById("locationField").value;
    var applicationStat = document.getElementById("applicationField").value;
    var publicity = document.querySelector('input[name="publicity"]:checked').value;
    // Send the info (Node.js I think) ********************************************************************************
    
    
}