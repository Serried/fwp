const t = document.getElementById("t");

function loadTable(data) {
    data.forEach(employee => {
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = employee.id;
        row.appendChild(idCell);

        const gender = document.createElement("td");
        gender.textContent = employee.Gender;
        row.appendChild(gender);

        const name = document.createElement("td");
        name.textContent = employee.FirstName + " " + employee.LastName;
        row.appendChild(name);

        const position = document.createElement("td");
        position.textContent = employee.Position;
        row.appendChild(position);

        const address = document.createElement("td");
        address.textContent = employee.Address;
        row.appendChild(address);

        t.appendChild(row);
    })
}

fetch("employees.json")
    .then(response => response.json())
    .then(data => loadTable(data)) 
    .catch(error => console.log('Error:', error));
    
