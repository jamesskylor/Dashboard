document.getElementById("theSubmitButton").addEventListener("click", (e)=>{
    e.preventDefault();
    submitUpdate();
    console.log('submitted');
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

function submitUpdate(){
    // Get values
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var path = "";
    if(document.getElementById("launchWeeks").value === "") {
        var newUData = {
            updateDate: date,
            launch: 0,
            users: document.getElementById("users").value, 
            userLearning: document.getElementById("userLearning").value,
            goals: document.getElementById('goals3').value,
            improvement: document.getElementById('growth').value,
            biggestObstacle: document.getElementById("biggestObstacle").value,
            news: document.getElementById("news").value,
            morale: document.getElementById("morale").value,
        }
        path = "/updates/";
    }
    else {
        var newUData = {
            updateDate: date,
            launch: document.getElementById("launchWeeks").value,
            users: document.getElementById("users").value,
            userLearning: document.getElementById("userLearning").value,
            goals: document.getElementById('goals3').value,
            improvement: document.getElementById('growth').value,
            biggestObstacle: document.getElementById("biggestObstacle").value,
            news: document.getElementById("news").value,
            morale: document.getElementById("morale").value,
            revenue: document.getElementById("revenue").value,
            moneyInTheBank: document.getElementById("moneyInTheBank").value,
            monthlyBurnRate: document.getElementById("monthlyBurnRate").value,
            productUpdates: document.getElementById("productUpdates").value,
            marketing: document.getElementById("marketing").value,
            offersAccepted: document.getElementById("offersAccepted").value,
            offersDeclined: document.getElementById("offersDeclined").value,
            offersOustanding: document.getElementById("offersOustanding").value,
            hiresFires: document.getElementById("hiresFires").value
        }
        path = "/updates/";
    }
    
    console.log(JSON.stringify(newUData));
    
    var url = 'https://dashdb.herokuapp.com';
    var theAPIKey = "C@D@123";
    
    let updateData = async (url, newUData) => {
        var idNum = parseInt(getCookie("dashId"));
        console.log("ID: "+idNum);
        let sendUData = await fetch(url+path+idNum, {
            method: "POST",
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
}
