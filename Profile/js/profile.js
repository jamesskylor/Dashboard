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

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function loadValues(){
    var url = 'https://dashdb.herokuapp.com';
    var theAPIKey = "C@D@123";
    let fetchData = async (url, theAPIKey) => {
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
        
        
        let getUData = await fetch(url+'/userData/'+idNum, {
            method: "GET",
            headers: {
                "apiKey": theAPIKey
            }
        })
        .then((res) => res.json())
        .then((data) => {
            //console.log(data[0]);
            sessionStorage.setItem("profileRows", data.length);
            loadUserData(data[0]);
        })
        .catch((err) => {
            console.log(err);
        });
        
        return;
    }
    fetchData(url, theAPIKey);
}

function loadUser(userJSON){
    document.getElementById("nameField").innerHTML = userJSON.name;
    document.getElementById("emailField").innerHTML = userJSON.email;
    document.getElementById("theAvatar").style.backgroundImage = userJSON.avatar;
}

function loadUserData(userDataJSON){
    document.getElementById("linkedinField").value = userDataJSON.linkedurl; // NOTE: there are no caps in the key names cuz sql
    document.getElementById("githubField").value = userDataJSON.githuburl;
    document.getElementById("educationField").value = userDataJSON.edulvl;
    document.getElementById("expertField").value = userDataJSON.exparea;
    document.getElementById("tech"+userDataJSON.techfounder).checked = true;
    document.getElementById("co"+userDataJSON.cofounder).checked = true;
    document.getElementById("accomplishmentField").defaultValue = userDataJSON.accomplishments;
    document.getElementById("locationField").value = userDataJSON.location;
}

function goToEdit(){
    // Navigate to the Edit Profile Page
    location.assign("editProfile.html");
}

function saveInfo(){
    // Get values
    var theMethod = "PUT";
    if(sessionStorage.getItem("profileRows") == 0) {
        theMethod = "POST";
    }
    var newUData = {
        linkedURL: document.getElementById("linkedinField").value,
        githubURL: document.getElementById("githubField").value,
        eduLVL: document.getElementById("educationField").value,
        expArea: document.getElementById("expertField").value,
        techFounder: document.querySelector('input[name="technical"]:checked').value,
        coFounder: document.querySelector('input[name="cofounder"]:checked').value,
        accomplishments: document.getElementById("accomplishmentField").value,
        location: document.getElementById("locationField").value
    }
    console.log(JSON.stringify(newUData));
    
    var url = 'https://dashdb.herokuapp.com';
    var theAPIKey = "C@D@123";
    
    let updateData = async (url, newUData) => {
        var idString = getCookie("dashId");
        if(idString == ""){
            location.assign("../Login/login.html");
        }
        var idNum = parseInt(idString);
        
        let sendUData = await fetch(url+'/userData/'+idNum, {
            method: theMethod,
            headers: {
                "apiKey": theAPIKey,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUData)
        })
        .catch((err) => {
            console.log(err);
        });
    }
    
    updateData(url, newUData);
    
    var responsiveText = document.getElementById("saved");
    if(responsiveText.classList.contains("fade-out")){
        responsiveText.classList.remove("fade-out");
    }
    responsiveText.classList.add("fade-out");
}