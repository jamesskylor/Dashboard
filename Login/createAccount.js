document.getElementById("theForm").addEventListener("submit", (e) => {
    e.preventDefault();
    signup();
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function signup() {
    // Check password
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm").value;
    if(password != confirmPassword) {
        document.getElementById("invalidlogin").innerHTML = "Passwords do not match";
        document.getElementById("confirm").value = "";
        document.getElementById("password").value = "";
    }
    else{
        // Create the JSON
        var newUser = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            avatar: "placeholder"
        }
        // Connect to server
        var url = 'https://dashdb.herokuapp.com';
        var theAPIKey = "C@D@123";
        let fetchData = async (url, theAPIKey, newUser) => {
            let createID = await fetch(url+'/users', {
                method: "POST",
                headers: {
                    "apiKey": theAPIKey,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            })
            .catch((err) => {
                console.log(err);
            });
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
            if(tempIdNum[0].hasOwnProperty("id")) { // Check if login passed
                let idNum = tempIdNum[0].id;

                // put id into cookie that expires in a day
                setCookie("dashId", idNum, 1);
                location.assign("../Homepage/dashboard-index.html"); // Not sure if this is the right address
            }
            else {
                // Error message as login failed
                document.getElementById("invalidlogin").innerHTML = "Something went wrong. Sorry for the inconvenience.";
            }
            return;
        }
        fetchData(url, theAPIKey, newUser);
    }
}