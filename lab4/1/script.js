function displayResult(num) {
    let table = document.getElementById("result");
    num = parseInt(num);

    while (table.rows.length > 1) {
        table.removeChild(table.rows[1]);
    }

    for (let i = 1; i <= 7; i++) {
        let row = document.createElement("tr");
        let op = document.createElement("td");
        let ans = document.createElement("td");

        op.textContent = `${num} × ${i}`;
        ans.textContent = num * i;

        row.appendChild(op);
        row.appendChild(ans);
        table.appendChild(row);
    }
}

function trigger() {
    let num = document.getElementById("number").value;
    displayResult(num);
}