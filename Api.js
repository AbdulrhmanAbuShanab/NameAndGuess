let btn = document.querySelector("#button");
let input = document.querySelector("#name");
let genderAPI = "https://api.genderize.io/?name=";
let ageAPI = "https://api.agify.io?name=";
let nationalityAPI = "https://api.nationalize.io/?name=";
let countryApi = "https://restcountries.com/v3.1/alpha?codes=";
btn.addEventListener("click", (event) => {
  let getGender = fetch(genderAPI + input.value);
  getGender
    .then((response) => {
      if (response.ok) {
        let flags = document.querySelector(".flagCard");
        flags.innerHTML = "";
        return response.json();
      }
    })
    .then((json) => {
      let gender = document.querySelector(".genderP");
      gender.innerHTML = json.gender;
      return fetch(ageAPI + json.name);
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((json) => {
      let age = document.querySelector(".ageP");
      age.innerHTML = json.age;
      return fetch(nationalityAPI + json.name);
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((json) => {
      let countries = json.country;
      countries.forEach((element) => {
        fetch(countryApi + element.country_id)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
          })
          .then((json) => {
            console.log(json);
            json.forEach((element) => {
              let cards = document.querySelector(".flagCard");
              let div = document.createElement("div");
              let img = document.createElement("img");
              img.src = element.flags.png;
              div.append(img);
              let cName = document.createElement("p");
              let node = document.createTextNode(element.altSpellings[2]);
              cName.appendChild(node);
              div.appendChild(cName);

              cards.append(div);
            });
          });
      });
    });
});
