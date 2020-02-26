window.addEventListener("load", (e)=>{
    // Get the database values and load them in to the inputs (and the non-input things too)
    loadValues();
});


function loadValues(){
    var url = 'http://localhost:3002';
    var theAPIKey = "notTheRealAPIKey";
    // var theAPIKey = "C@D@123";
    let fetchData = async (url, theAPIKey) => {
        var idNum = parseInt(getCookie("dashId"));
        
        let getUpdates = await fetch(url+'/updates/'+idNum, {
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
    fetchData(url, theAPIKey);
}

function updateHistory ()  {
 for each (updatesJSON.updateDate) { 
// function used to print the update history.
    var tabel = document.createElement("TABLE");
    tabel.className= "parentTable";
    var parentTable = document.getElementById("parent");
    var currentRow = document.createElement("TR");
    var currentRow2 = document.createElement("TR");
    currentRow2.className = "currentRow2";
    tabel.appendChild(currentRow);
    var currentCell = document.createElement("TD");
    currentCell.className="currentCell";
    var currentCell2 = document.createElement("TD");
    currentCell2.className="currentCell";
    var tableHeader  = document.createElement("A");
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var link = document.createTextNode(date); // placeholder for the actual date
    tableHeader.appendChild(link);
    tableHeader.title=date;
    tableHeader.href = ("/Dashboard/Updates/my-updates.html");
    tableHeader.className ="tableHeader";
    var paragraph = document.createElement("P");
    paragraph.className="paragraph";
    var paragraph2 = document.createElement("P");
    paragraph2.className="paragraph2";
    paragraph.innerHTML = "number of Users: 1000.";
    paragraph2.innerHTML = "Margins: 1000";
    var tableContainer = document.createElement("DIV");
    tableContainer.className = "tableContainer";
    currentRow.appendChild(tableHeader);
    currentCell.appendChild(paragraph);
    currentCell2.appendChild(paragraph2);
    currentRow2.appendChild(currentCell);
    currentRow2.appendChild(currentCell2);
    tableContainer.appendChild(currentRow2);
    tabel.appendChild(tableContainer);
    parentTable.appendChild(tabel);

 }
    
}