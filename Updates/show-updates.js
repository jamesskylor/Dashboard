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
    console.log("start");
    loadValues();
});

function loadValues(){
    var url = 'http://localhost:3002';
    var theAPIKey = "notTheRealAPIKey";
    var dateSubmitted = sessionStorage.getItem('key');
    // var theAPIKey = "C@D@123";
    let fetchData = async (url, theAPIKey, dateSubmitted) => {
        console.log("hello");
        var idNum = parseInt(getCookie("dashId"));
        let getUpdates = await fetch(url+'/update/4', {
            method: "GET",
            headers: {
                "apiKey": theAPIKey,
                "updateDate": dateSubmitted
            }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            loadUpdates(data[0]);
        })
        .catch((err) => {
            console.log(err);
        });
        
        return;
    }
    console.log("hello2");
    fetchData(url, theAPIKey, dateSubmitted);
}
function launched () {
                var x= document.getElementById("switch-innertext");
                if(x.innerHTML ==="Weeks until launch:") {
                    x.innerHTML = "Congratulations you are launched!";
                } else {
                    x.innerHTML = "Weeks until launch:"
                }
                var y= document.getElementById("numberWeeks");
                if(y.style.display ==="none") {
                    y.style.display = "block";
                }
                else {
                    y.style.display = "none";
                }
                var hideThis = document.getElementById("hideThis");
                if(hideThis.style.display =="block") {
                    hideThis.style.display = "none";
                }
                else{
                    hideThis.style.display = "block";
                }
               
            }

function loadUpdates(updatesJSON){
    if(updatesJSON.launch === "0") {
    document.getElementById("users").value = updatesJSON.users;
    document.getElementById("userLearning").innerHTML = updatesJSON.userlearning;
    document.getElementById("goals3").innerHTML = updatesJSON.goals;
    document.getElementById("growth").defaultValue = updatesJSON.improvement;
    document.getElementById("biggestObstacle").innerHTML = updatesJSON.biggestobstacle;
    document.getElementById("news").innerHTML = updatesJSON.news;
    document.getElementById("morale").value = updatesJSON.morale;
    document.getElementById("revenue").value = updatesJSON.moneyinthebank;
    document.getElementById("monthlyBurnRate").value = updatesJSON.monthlyburnrate;
    document.getElementById("productUpdates").value = updatesJSON.productupdates;
    document.getElementById("marketing").defaultValue = updatesJSON.marketing;
    document.getElementById("offersAccepted").value = updatesJSON.offersaccepted;
    document.getElementById("offersDeclined").value = updatesJSON.offersdeclined;
    document.getElementById("hiresFires").defaultValue = updatesJSON.hiresfires;
    launched();
    } else {
    document.getElementById("launchWeeks").value = updatesJSON.launch;
    console.log(updatesJSON.launch);
    console.log(updatesJSON);
    document.getElementById("users").value = updatesJSON.users;
    document.getElementById("userLearning").value = updatesJSON.userlearning;
    document.getElementById("goals").value = updatesJSON.goals;
    document.getElementById("improvement").value = updatesJSON.goals;
    document.getElementById("biggestObstacle").value = updatesJSON.biggestobstacle;
    document.getElementById("news").value = updatesJSON.news;
    document.getElementById("morale").value = updatesJSON.morale;
}
   
}



