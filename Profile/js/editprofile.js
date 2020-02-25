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
    
    var url = 'http://localhost:3002';
    var theAPIKey = "notTheRealAPIKey";
    sessionStorage.setItem('dashdbemail', 'jason@temporary.placeholder');
    // var theAPIKey = "C@D@123";
    let fetchData = async (url) => {
        let getID = await fetch(url+'/id', {
            method: "GET",
            headers: {
                "apiKey": theAPIKey,
                "email": sessionStorage.getItem('dashdbemail')
            }
        })
        .catch((err) => {
            console.log(err);
        });
        let tempIdNum = await getID.json();
        let idNum = tempIdNum[0].id;
        //console.log("id: "+idNum);
        
        let getUsers = await fetch(url+'/users/'+idNum, {
            method: "GET",
            headers: {
                "apiKey": theAPIKey
            }
        })
        .then((res) => res.json())
        .then((data) => {
            //console.log(data[0]);
            loadUser(data[0]);
        })
        .catch((err) => {
            console.log(err);
        });
        
        return;
    }
    fetchData(url);
}

function loadUser(userJSON) {
    document.getElementById("perNameField").value = userJSON.name;
    document.getElementById("perEmailField").value = userJSON.email;
    document.getElementById("theAvatar").src = userJSON.avatar;
}

function saveTheProfile(){
    // Take in all the values
    var newData = {
        name: document.getElementById("perNameField").value,
        email: document.getElementById("perEmailField").value,
        avatar: document.getElementById("theAvatar").style.backgroundImage // Check if it's in the format of just the url or url(theURL), also deal with how we are going to stor this
    }
    console.log(JSON.stringify(newData));
    var password = document.getElementById("perPasswordField").value;
    var checkPass = document.getElementById("perConfirmField").value;
    // Check their validity
    if(password == checkPass){
        // If valid
        var url = 'http://localhost:3002';
        var theAPIKey = "notTheRealAPIKey";
        // var theAPIKey = "C@D@123";
        
        if(password != ""){
            // Send the new password, since it's not blank
            
        }
        
        sessionStorage.setItem('dashdbemail', newData.email);
        let updateData = async (url, newData) => {
            let getID = await fetch(url+'/id', {
                method: "GET",
                headers: {
                    "apiKey": theAPIKey,
                    "email": sessionStorage.getItem('dashdbemail')
                }
            })
            .catch((err) => {
                console.log(err);
            });
            let tempIdNum = await getID.json();
            let idNum = tempIdNum[0].id;

            let sendData = await fetch(url+'/users/cont/'+idNum, {
                method: "PUT",
                headers: {
                    "apiKey": theAPIKey,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newData)
            })
            .then(() => {
                // Return to the profile page
                location.assign("profile.html");
            })
            .catch((err) => {
                console.log(err);
            });
        }
        
        updateData(url, newData);
        
        // Return to the Profile Page
        //location.assign("profile.html");
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