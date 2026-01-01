const en_countries = ["Thailand", "Vietnam", "Laos", "Malaysia", "Singapore", "Philipines", "Myanmar", "Cambodia", "Brunei"]
const th_countries = ["ไทย", "เวียดนาม", "ลาว", "มาเลเซีย", "สิงคโปร์", "ฟิลิปปินส์", "เมียนมา", "กัมพูชา", "บรูไน"]
let current_language = "th"

function loadCountries() {
    let dropdown = document.getElementById("countries")
    
    let placeholderOption = document.createElement("option");
    placeholderOption.id = "placeholder";
    placeholderOption.value = "";
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    
    if (current_language == "th") {
        let placeholderText = document.createTextNode("เลือกประเทศ");
        placeholderOption.appendChild(placeholderText);
    } else if (current_language == "en") {
        let placeholderText = document.createTextNode("Select a country");
        placeholderOption.appendChild(placeholderText);
    }
    
    dropdown.appendChild(placeholderOption);
    
    for (let i = 0; i < en_countries.length; i++) {
        let option = document.createElement("option")
        if (current_language == "th") {
            x = document.createTextNode(th_countries[i]);
            option.appendChild(x);
            dropdown.appendChild(option);
        } else if (current_language == "en") {
            x = document.createTextNode(en_countries[i]);
            option.appendChild(x);
            dropdown.appendChild(option);
        }
    }
}

function switchLanguage() {
    let button = document.getElementById("switch-button");
    let dropdown = document.getElementById("countries");
    
    while (button.firstChild) {
        button.removeChild(button.firstChild);
    }
    
    while (dropdown.firstChild) {
        dropdown.removeChild(dropdown.firstChild);
    }
    
    if (current_language == "th") {
        current_language = "en";
    } else if (current_language == "en") {
        current_language = "th";
    }
    
    if (current_language == "th") {
        let th_name = document.createTextNode("ชื่อ:");
        let th_surname = document.createTextNode("นามสกุล:")
        let th_countries_label = document.createTextNode("ประเทศ:");
        let buttonText = document.createTextNode("เปลี่ยนเป็นภาษาอังกฤษ");
        button.appendChild(buttonText);
        document.getElementById("label-name").replaceChild(th_name, document.getElementById("label-name").firstChild);
        document.getElementById("label-surname").replaceChild(th_surname, document.getElementById("label-surname").firstChild);
        document.getElementById("label-countries").replaceChild(th_countries_label, document.getElementById("label-countries").firstChild);
    } else if (current_language == "en") {
        let en_name = document.createTextNode("First Name:");
        let en_surname = document.createTextNode("Last Name:")
        let en_countries_label = document.createTextNode("Country:");
        document.getElementById("label-name").replaceChild(en_name, document.getElementById("label-name").firstChild);
        document.getElementById("label-surname").replaceChild(en_surname, document.getElementById("label-surname").firstChild);
        document.getElementById("label-countries").replaceChild(en_countries_label, document.getElementById("label-countries").firstChild);
        let buttonText = document.createTextNode("Change to Thai");
        button.appendChild(buttonText);
    }
    
    loadCountries();
}

loadCountries();