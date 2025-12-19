function displayNumber() {
    const number = Math.floor(Math.random() * 1000000);
    const random = document.getElementById("random");
    random.innerHTML = "";
    
    const numberString = number.toString();
    for (let i = 0; i < numberString.length; i++) {
        const digit = numberString[i];
        random.innerHTML += `<img src="numbers/${digit}.png">`;
    }

    if (number.toString().length < 6) {
        for (let j = numberString.length; j < 6; j++) {
            random.innerHTML = `<img src="numbers/0.png">` + random.innerHTML;
        }
    }
}
