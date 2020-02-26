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

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function loadValues(){
    
    var url = 'http://localhost:3002';
    // var url = 'https://dashdb.herokuapp.com';
    var theAPIKey = "notTheRealAPIKey";
    // var theAPIKey = "C@D@123";
    let fetchData = async (url) => {
        var idString = getCookie("dashId");
        if(idString == ""){
            location.assign("../Login/login.html");
        }
        var idNum = parseInt(idString);
        
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
    document.getElementById("theAvatar").style.backgroundImage = userJSON.avatar;
}

function saveTheProfile(){
    // Take in all the values
    var newData = {
        name: document.getElementById("perNameField").value,
        email: document.getElementById("perEmailField").value,
        avatar: document.getElementById("theAvatar").style.backgroundImage
    }
    console.log(JSON.stringify(newData));
    var passwrd = document.getElementById("perPasswordField").value;
    var checkPass = document.getElementById("perConfirmField").value;
    // Check their validity
    if(passwrd == checkPass){
        // If valid
        var url = 'http://localhost:3002';
        // var url = 'https://dashdb.herokuapp.com';
        var theAPIKey = "notTheRealAPIKey";
        // var theAPIKey = "C@D@123";
        
        if(passwrd != ""){
            var newPass = {
                password: passwrd
            }
            // Send the new password, since it's not blank
            let updatePass = async(url, newPass) => {
                var idString = getCookie("dashId");
                if(idString == ""){
                    location.assign("../Login/login.html");
                }
                var idNum = parseInt(idString);
                
                let sendPass = await fetch(url+"/users/pass/"+idNum, {
                    method: "PUT",
                    headers: {
                        "apiKey": theAPIKey,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newPass)
                })
                .catch((err) => {
                    console.log(err);
                })
            }
            
            updatePass(url, newPass);
        }
        
        let updateData = async (url, newData) => {
            var idString = getCookie("dashId");
            if(idString == ""){
                location.assign("../Login/login.html");
            }
            var idNum = parseInt(idString);

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

function updateAvatar(){
    // Take in the file
    var fileInput = document.getElementById("theFileInput").files[0];
    var canvas = document.createElement("CANVAS");
    
    var tempImg = new Image();
    var theImgFile;
    tempImg.onload = () => {
        var endWidth = 100;
        var endHeight = 100;
        var xcoord = 0;
        var ycoord = 0;
        if(tempImg.width > tempImg.height) {
            var temp = tempImg.height / 100.0;
            endWidth = tempImg.width / temp;
            endHeight = 100;
            xcoord = -1*(endWidth - 100)/2;
            ycoord = 0;
        }
        else {
            var temp = tempImg.width / 100.0;
            endWidth = 100;
            endHeight = tempImg.height / temp;
            xcoord = 0;
            ycoord = -1*(endHeight - 100)/2;
        }
        canvas.width = 100;
        canvas.height = 100;
        canvas.getContext("2d").drawImage(tempImg, xcoord, ycoord, endWidth, endHeight);
        theImgFile = "url("+canvas.toDataURL()+")";
        document.getElementById("theAvatar").style.backgroundImage = theImgFile;
    }
    tempImg.src = URL.createObjectURL(fileInput);
}