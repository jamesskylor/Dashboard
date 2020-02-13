window.addEventListener("load", (e)=>{
    // Supply the page with it's correct current values
    loadValues();
});

document.getElementById("theForm").addEventListener("submit", (e)=>{
    e.preventDefault();
    saveTheProfile();
});

document.getElementById("theFileInput").addEventListener("change", (e)=>{
    e.preventDefault(); // Dunno if I want this to prevent the default
    updateAvatar();
});

function loadValues(){
    // Get info from database ************************************************************************************************************
    var name = "John Smith";
    var email = "jsmith@gmail.com";
    var image = "https://www.ajactraining.org/wp-content/uploads/2019/09/image-placeholder.jpg";
    // Set all the input values to their corresponding database values (except password)
    document.getElementById("perNameField").value = name;
    document.getElementById("perEmailField").value = email;
    document.getElementById("theAvatar").src = image;
}

function saveTheProfile(){
    // Take in all the values
    var name = document.getElementById("perNameField").value;
    var email = document.getElementById("perEmailField").value;
    var password = document.getElementById("perPasswordField").value;
    var checkPass = document.getElementById("perConfirmField").value;
    // Get  the Image
    var image = document.getElementById("theAvatar").style.backgroundImage; // Care about this later when we have a database to compare pros/cons with *****************************
    // Check their validity
    if(password == checkPass){
        // If valid
        // Send data to the server to save the update ***********************************************************************************
        
        if(password != ""){
            // Send the new password, since it's not blank
            
        }
        
        // Return to the Profile Page
        location.assign("profile.html");
    }
    else{
        // If not valid
        // Reject the save
        var warning = document.createElement("P");
        warning.className = "warning";
        warning.innerHTML = "Your passwords do not match, please try again.";
        document.getElementById("appendWarning").appendChild(warning);
        // Reprompt for valid responses by emptying the fields
        document.getElementById("perPasswordField").value = "";
        document.getElementById("perConfirmField").value = "";
    }
}

function updateAvatar(){ // Change this accordingly with what our database ends up being *************************************************************************
    // Take in the file
    var theImgFile = document.getElementById("theFileInput").files[0];
    // Change the src of "theAvatar" to the new image
    document.getElementById("theAvatar").style.backgroundImage = "url("+URL.createObjectURL(theImgFile)+")";
}