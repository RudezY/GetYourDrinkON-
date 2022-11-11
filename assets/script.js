var apiIng = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
var apiDrink = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
var drink = "";
var drinkHistory = JSON.parse(localStorage.getItem("clickedDrinks")) || [];
var formEl = $("#searchForm");
var inputEl = $("#termInput");
var drinkDisplay = $(".drinkDisplay");
var resetbutton = $("#resetbtn");
var selectedDrinkID = $("drink-id");

formEl.on("submit", function (e) {
  e.preventDefault();
  var term = inputEl.val();
  var url = apiIng + term;
  console.log(term);
  //fetch
  fetch(`${url}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      document.querySelector(".drinkDisplay").innerHTML = "";
      for (var i = 0; i < data.drinks.length; i++) {
        var drinkData = data.drinks[i];
        createDrinkCard(drinkData);
      }
    })
    .catch((err) => console.log(err));
});

$("#historybtn").on("click", clearInput);

var userClickedArray = [];

function createDrinkCard(data) {
  var drinkDiv = document.createElement("div");
  drinkDiv.setAttribute("drink-id", data.idDrink);
  drinkDiv.setAttribute("class", "alldrinks");

  drinkDiv.innerHTML += `
  <div style="vertical-align: middle;">
    <img style="flex-grow: 1; height: 200px;" src="${data.strDrinkThumb}" />
    <p style ="inline-size:200px">${data.strDrink}</p>
  </div>
`;

  document.querySelector(".drinkDisplay").appendChild(drinkDiv);
  drinkDiv.addEventListener("click", function () {
    var drinkId = this.getAttribute("drink-id");
    var drinkImg = data.strDrinkThumb;
    var drinkName = data.strDrink;
    console.log(drinkName);
    console.log(drinkImg);
    var userClicked = {
      drinkName: drinkName,
      drinkId: drinkId,
      picture: drinkImg,
    };
    userClickedArray.push(userClicked);
    localStorage.setItem("clickedDrinks", JSON.stringify(userClickedArray));
  });
}

// TODO function that takes a drink's data and store in localStorage as favorite drinks
function saveToFavorites(drinkData) {}

function saveDrinkHistory(drinkId) {}

function getOneDrink(drinkId) {
  console.log("here's yo drink id", drinkId);
  //TODO - use drinkID and build API call, test to see if get data
  let theDrink = drinkId;
  console.log("here is theDrink", theDrink);
  url2 = apiDrink + theDrink;
  console.log("here is the url", url2);
  fetch(`${url2}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);

      document.querySelector(
        ".singleDrink"
      ).innerHTML = `${data.drinks.drinks[0].idDrink}`;
      console.log(drink);
      //filter_array_values(data)
      for (var i = 0; i < data.drinks.length; i++) {
        var selectedDrink = data.drinks.length;
        createDrinkCard(selectedDrink);
      }
    })
    .catch((err) => console.log(err));
}

function createMainDrinkCard(selectedDrink) {
  //
  var drinkSection = document.createElement("div");
  drinkSection.setAttribute("drinkchoice", selectedDrink.idDrink);
  drinkSection.setAttribute("class", "theDrinkSelected");
  drinkSection.innerHTML += `
<div id="hide" style ="vertical-align: middle; max-height: 100px; max-width: 100px;">
 <img style ="flex-grow: 1; height: 100px;" src="${selectedDrink.strDrinkThumb}" />
 <p>${selectedDrink.strIngredient[i]} : ${selectedDrink.strMeasure[i]}</p>
</div>
 `;
  if (getOneDrink()) {
    $("drink-id").addId("hide");
    $("theDrinkSelected").removeId("hide");
  }
}

function clearInput() {
  document.getElementById("searchForm").reset();
  document.querySelector(".drinkDisplay").innerHTML = "";

  var historyDrinks = JSON.parse(localStorage.getItem("clickedDrinks"));
  console.log(historyDrinks);

  for (i = 0; i < historyDrinks.length; i++) {
    var historydiv = document.createElement("div");
    console.log(
      `We are working on drink with id: ${historyDrinks[i].drinkId}. And name: ${historyDrinks[i].drinkName}. And Img url: ${historyDrinks[i].picture}`
    );
    var historypic = historyDrinks[i].picture;
    var historyDrinkNames = historyDrinks[i].drinkName;
    console.log(historyDrinkNames);
    console.log(historypic);
    historydiv.setAttribute("drink-id", historyDrinkNames[i].drinkId);

    historydiv.setAttribute("class", "alldrinks");
    historydiv.innerHTML += `
      <div style="vertical-align: middle;">
        <img style="flex-grow: 1; height: 200px;" src="${historypic}" />
        <p style ="inline-size:200px">${historyDrinkNames}</p>
      </div>
      `;
    document.querySelector(".drinkDisplay").appendChild(historydiv);
  }
}

$("#resetbtn").on("click", clearInput);
