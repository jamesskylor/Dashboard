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

window.addEventListener("load", (e)=>{
    // Get the database values and load them in to the inputs (and the non-input things too)
    loadValues();
});

function loadValues(){
    var url = 'https://dashdb.herokuapp.com';
    var theAPIKey = "C@D@123";
    let fetchData = async (url, theAPIKey) => {
        var idString = getCookie("dashId");
        if(idString == ""){
            location.assign("../Login/login.html");
        }
        var idNum = parseInt(idString);
        var updateDate = "2017-07-23";
        let getUpdates = await fetch(url+'/updates/'+idNum + updateDate, {
            method: "GET",
            headers: {
                "apiKey": theAPIKey
            }
        })
        .then((res) => res.json())
        .then((data) => {
            //console.log(data[0]);
            loadUpdateData(data[0]);
        })
        .catch((err) => {
            console.log(err);
        });
        
        return;
    }
    fetchData(url, theAPIKey);
}

function loadUser(userJSON){
    if(document.getElementById("input1").value === 0) {
    document.getElementById("users").value = updatesJSON.users;
    document.getElementById("userLearning).innerHTML = updatesJSON.userLearning;
    document.getElementById("goals").innerHTML = updatesJSON.goals;
    document.getElementById("improvement").innerHTML = updatesJSON.goals;
    document.getElementById("biggestObstacle").innerHTML = updatesJSON.biggestObstacle;
    document.getElementById("news").innerHTML = updatesJSON.news;
    document.getElementById("morale").value = updatesJSON.morale;
    document.getElementById("expenses").value = updatesJSON.expenses;
    document.getElementById("revenue").value = updatesJSON.moneyInTheBank;
    document.getElementById("productUpdates").innerHTML = updatesJSON.productUpdates;
    document.getElementById("marketing").innerHTML = updatesJSON.marketing;
    document.getElementById("offersAccepted").value = updatesJSON.offersAccepted;
    document.getElementById("offersDeclined").value = updatesJSON.offersDeclined;
    document.getElementById("hiresFires").value = updatesJSON.hiresFires;
    } else {
    document.getElementById("input1").value = updatesJSON.launch;
    document.getElementById("users").value = updatesJSON.users;
    document.getElementById("userLearning).innerHTML = updatesJSON.userLearning;
    document.getElementById("goals").innerHTML = updatesJSON.goals;
    document.getElementById("improvement").innerHTML = updatesJSON.goals;
    document.getElementById("biggestObstacle").innerHTML = updatesJSON.biggestObstacle;
    document.getElementById("news").innerHTML = updatesJSON.news;
    document.getElementById("morale").value = updatesJSON.morale;
}
   
}

