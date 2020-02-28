window.addEventListener("load", (e)=>{
    // Get the database values and load them in to the inputs (and the non-input things too)
    loadValues();
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
// sessionStorage.setItem("key", document.getElementByClassName(tableHeader).value) use e. value to get the value of the date clicked.

function loadValues(){
    var url = 'https://dashdb.herokuapp.com';
    var theAPIKey = "C@D@123";
    let fetchData = async (url, theAPIKey) => {
        var idNum = parseInt(getCookie("dashId"));
        let getUpdates = await fetch(url+'/updates/4', {
            method: "GET",
            headers: {
                "apiKey": theAPIKey
            }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            loadUpdates(data);
        })
        .catch((err) => {
            console.log(err);
        });
        
        return;
    }
    fetchData(url, theAPIKey);
}

function loadUpdates (updatesJSON) {
updatesJSON.forEach (element => updateHistory(element));
}
function updateHistory (updatesJSON)  {
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
    console.log(updatesJSON.updatedate);
    var date = updatesJSON.updatedate;
    console.log(date);
    var link = document.createTextNode(date); // placeholder for the actual date
    tableHeader.appendChild(link);
    tableHeader.title=date;
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

var containingDiv = document.getElementById('parent');

containingDiv.addEventListener('click', (e)=> {
  if(/tableHeader/.test(e.target.className)) {
      e.preventDefault();
    //console.log(e.target.innerHTML);
    var str = e.target.innerHTML; 
    var split= str.slice(0,10);
    sessionStorage.setItem('key',split);
    let data = sessionStorage.getItem('key');
    console.log(data);
    location.assign("../updates/show-updates.html");
  }
}, false);  
/*document.getElementById("parent").addEventListener( "click", (e) => {
    console.log(e.target.innerHTML);
}); */