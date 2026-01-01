function addToTable() {
    var item = document.getElementById("item").value;
    var amount = document.getElementById("amount").value;
    var type = document.getElementById("type").value;
    var date = document.getElementById("date").value;

    
    var table = document.getElementById("summary");
    var row = document.createElement("tr");
    
    var dateCell = document.createElement("td");
    var itemCell = document.createElement("td");
    var incomeCell = document.createElement("td");
    var expenseCell = document.createElement("td");
    
    dateCell.appendChild(document.createTextNode(date));
    itemCell.appendChild(document.createTextNode(item));
    
    if (type === "income") {
        incomeCell.appendChild(document.createTextNode(amount));
        expenseCell.appendChild(document.createTextNode("0"));
    } else {
        incomeCell.appendChild(document.createTextNode("0"));
        expenseCell.appendChild(document.createTextNode(amount));
    }
    
    row.appendChild(dateCell);
    row.appendChild(itemCell);
    row.appendChild(incomeCell);
    row.appendChild(expenseCell);
    
    table.appendChild(row);
    
    updateBalance();
    
    document.getElementById("item").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("date").value = "";
}

function updateBalance() {
    var table = document.getElementById("summary");
    var rows = table.rows;
    var balance = 0;
    
    for (var i = 1; i < rows.length; i++) {
        var incomeText = rows[i].cells[2].textContent;
        var expenseText = rows[i].cells[3].textContent;
        
        var income = incomeText === "0" || incomeText === "" ? 0 : parseFloat(incomeText);
        var expense = expenseText === "0" || expenseText === "" ? 0 : parseFloat(expenseText);
        
        balance += income - expense;
    }
    
    document.getElementById("balance").textContent = balance;
}