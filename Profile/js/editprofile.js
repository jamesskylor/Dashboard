document.getElementById("theSaveButton").addEventListener("click", (e)=>{
    e.preventDefault();
    saveTheProfile();
});

document.getElementById("theFileInput").addEventListener("change", (e)=>{
    e.preventDefault(); // Dunno if I want this to prevent the default
    updateAvatar();
});

function saveTheProfile(){
    // Take in all the values
    
    // Check their validity
    
    // If not valid
    
        // Reject the save
    
        // Reprompt for valid responses
    
    // If valid
        
        // Send data to the server to save the update
    
        // Return to the Profile Page
}

function updateAvatar(){
    // Take in the file
    
    // Change the src of "theAvatar" to the new image
}