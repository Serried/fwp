function getData(data, index) {
    const forms = document.getElementById("forms");

    const question = document.createElement("p");
    question.textContent = `${index+1}. ` + data.question;
    forms.appendChild(question);

    ["a", "b", "c"].forEach(key => {
        const input = document.createElement("input");
        input.type = "radio";
        input.name = `ans_${index}`;
        input.id = `${key}_${index}`;
        input.value = key;

        if (key === data.answers.correct) {
            input.checked = true;
        }

        const label = document.createElement("label");
        label.htmlFor = input.id;
        label.textContent = data.answers[key];

        forms.appendChild(input);
        forms.appendChild(label);
        forms.appendChild(document.createElement("br"));
    });
}

fetch("questionAnswerData.json")
  .then(res => res.json())
  .then(data => data.forEach((q, i) => getData(q, i)))
  .catch(e => console.log("Error:", e));
