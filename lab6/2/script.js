async function loadJSON() {
    try {
        const response = await fetch("student-score.json");
        const data = await response.json();

        for (let i = 0; i < data.length; i++) {
            let card = document.createElement("div");
            card.className = "card";
            let name = document.createElement("h2");
            name.textContent = (i+1) + ". "+ data[i].name;
            let gender = data[i].gender
            let img = document.createElement("img");
            img.className = "avatar";
            if (gender === "Male") {
                img.src = "img/img_male.png";
            } else {
                img.src = "img/img_female.png";
            }
            
            let physics = document.createElement("p");
            physics.textContent = "Physics : " + data[i].physics;
            let maths = document.createElement("p");
            maths.textContent = "Mathmatics : " + data[i].maths;
            let english = document.createElement("p");
            english.textContent = "English : " + data[i].english;
            card.appendChild(img);
            card.appendChild(name);
            card.appendChild(physics);
            card.appendChild(maths);
            card.appendChild(english);
            document.getElementById('container').appendChild(card);
        }
    } catch (e) {
        console.log(e);
    }
}

loadJSON();