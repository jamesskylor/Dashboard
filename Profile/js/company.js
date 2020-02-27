window.addEventListener("load", (e)=>{
    // Get values from database and set the placeholder values tot eh right ones
    loadValues();
});

document.getElementById("theSaveButton").addEventListener("click", (e)=>{
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

function loadValues() {
    var url = 'https://dashdb.herokuapp.com';
    var theAPIKey = "C@D@123";
    let fetchData = async (url) => {
        var idString = getCookie("dashId");
        if(idString == ""){
            location.assign("../Login/login.html");
        }
        var idNum = parseInt(idString);
        
        let getUsers = await fetch(url+'/companyData/'+idNum, {
            method: "GET",
            headers: {
                "apiKey": theAPIKey
            }
        })
        .then((res) => res.json())
        .then((data) => {
            //console.log(data[0]);
            sessionStorage.setItem("companyRows", data.length);
            loadCompany(data[0]);
        })
        .catch((err) => {
            console.log(err);
        });
        
        return;
    }
    fetchData(url);
}

function loadCompany(companyJSON) {
    document.getElementById("compNameField").value = companyJSON.name;
    document.getElementById("compSiteField").value = companyJSON.site;
    document.getElementById("compDescField").defaultValue = companyJSON.description;
    document.getElementById("compVertField").value = companyJSON.verticality;
    document.getElementById("compProdField").value = companyJSON.product;
    document.getElementById("compReasField").defaultValue = companyJSON.raisondetre;
    document.getElementById("compTimeField").value = "fullTime"+companyJSON.fulltime;
    document.getElementById("compProgField").value = companyJSON.progress;
    document.getElementById("compProg2Field").value = companyJSON.progressplus;
    document.getElementById("inc"+companyJSON.incorporated).checked = true;
}

function saveInfo(){
    // Take in the values
    var theMethod = "PUT";
    if(sessionStorage.getItem("companyRows") == 0) {
        theMethod = "POST";
    }
    var newCData = {
        name: document.getElementById("compNameField").value,
        site: document.getElementById("compSiteField").value,
        description: document.getElementById("compDescField").value,
        verticality: document.getElementById("compVertField").value,
        product: document.getElementById("compProdField").value,
        raisondetre: document.getElementById("compReasField").value,
        fulltime: document.getElementById("compTimeField").value.replace('fullTime', ''),
        progress: document.getElementById("compProgField").value,
        progressPlus: document.getElementById("compProg2Field").value,
        incorporated: document.querySelector('input[name="compInc"]:checked').value
    }
    console.log(JSON.stringify(newCData));
    
    var url = 'https://dashdb.herokuapp.com';
    var theAPIKey = "C@D@123";
    
    let updateData = async (url, newCData) => {
        var idString = getCookie("dashId");
        if(idString == ""){
            location.assign("../Login/login.html");
        }
        var idNum = parseInt(idString);
        
        let sendCData = await fetch(url+'/companyData/'+idNum, {
            method: theMethod,
            headers: {
                "apiKey": theAPIKey,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCData)
        })
        .catch((err) => {
            console.log(err);
        });
    }
    
    updateData(url, newCData);
    
    var responsiveText = document.getElementById("saved");
    if(responsiveText.classList.contains("fade-out")){
        responsiveText.classList.remove("fade-out");
    }
    responsiveText.classList.add("fade-out");
}