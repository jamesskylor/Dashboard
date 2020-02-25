document.getElementById("submit").addEventListener("click", (e) => {
    e.preventDefault();
    login();
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var url = 'http://localhost:3002';
    var theAPIKey = "notTheRealAPIKey";
    // var theAPIKey = "C@D@123";
    let fetchData = async (url, theAPIKey, email, password) => {
        let getID = await fetch(url+'/id', {
            method: "GET",
            headers: {
                "apiKey": theAPIKey,
                "email": email,
                "key": password
            }
        })
        .catch((err) => {
            console.log(err);
        });
        let tempIdNum = await getID.json();
        if() { // Check if login passed
            let idNum = tempIdNum[0].id;

            // put id into cookie that expires (or not if remember me is selected)
            setCookie("dashId", idNum, 1);

            location.assign("../Homepage/dashboard-index.html"); // Not sure if this is the right address
        }
        else {
            // Error message as login failed
            
            
        }
        
        return;
    }
    fetchData(url, theAPIKey, email, password);
}