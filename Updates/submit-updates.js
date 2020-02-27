document.getElementById("theEditButton").addEventListener("click", (e)=>{
    e.preventDefault();
    submitUpdate();
});

function submitUpdate(){
    // Get values
    var newUData = {
        linkedURL: document.getElementById("linkedinField").value,
        githubURL: document.getElementById("githubField").value,
        eduLVL: document.getElementById("educationField").value,
        expArea: document.getElementById("expertField").value,
        techFounder: document.querySelector('input[name="technical"]:checked').value,
        coFounder: document.querySelector('input[name="cofounder"]:checked').value,
        accomplishments: document.getElementById("accomplishmentField").value,
        location: document.getElementById("locationField").value,
        applicationStat: document.getElementById("applicationField").value,
        publicity: document.querySelector('input[name="publicity"]:checked').value
    }
    console.log(JSON.stringify(newUData));
    
    var url = 'http://localhost:3002';
    var theAPIKey = "notTheRealAPIKey";
    // var theAPIKey = "C@D@123";
    
    let updateData = async (url, newUData) => {
        var idNum = parseInt(getCookie("dashId"));
        
        let sendUData = await fetch(url+'/userData/'+idNum, {
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