document.getElementById("theForm").addEventListener("submit", (e) => {
    e.preventDefault();
    makeRequest();
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

function makeRequest() {
    var url = 'https://dashdb.herokuapp.com';
    var theAPIKey = "C@D@123";
    let fetchData = async (url, theAPIKey) => {
        var idString = getCookie("dashId");
        if(idString == ""){
            location.assign("../Login/login.html");
        }
        var idNum = parseInt(idString);
        
        let getUsers = await fetch(url+'/groupSession/'+idNum, {
            method: "POST",
            headers: {
                "apiKey": theAPIKey
            }
        })
        .then((res) => {
            // It worked so let user know
            console.log("Seems");
        })
        .catch((err) => {
            console.log(err);
        });
        
        return;
    }
    fetchData(url, theAPIKey);
}