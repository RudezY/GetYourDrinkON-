var apiIng = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
var apiDrink = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
var drink = "";
var historyDrinks = JSON.parse(localStorage.getItem("clickedDrinks")) || [];
var formEl = $("#searchForm");
var inputEl = $("#termInput");
var drinkDisplay = $(".drinkDisplay");
var resetbutton = $("#resetbtn");
var selectedDrinkID = $("drink-id");
var userClickedArray = [];

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

$("#historybtn").on("click", historyInput);

function createDrinkCard(data) {
  removeDrinkCards();
  $(".drinkDisplay").show();
  //DONT FORGET TO REMOVE EVERYTHING IN "singleDrink" element!!!
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
    getOneDrink(drinkId);
    console.log(drinkName);
    console.log(drinkImg);
    var userClicked = {
      drinkName: drinkName,
      drinkId: drinkId,
      picture: drinkImg,
    };
    //get it from localStorage;
    var userClickedArray =
      JSON.parse(localStorage.getItem("clickedDrinks")) || [];

    //TODO - Maybe DONT push if already in the clickedArray? HINT- research on the Array.prototype.find method 
     removeDuplicates(userClickedArray)
    userClickedArray.push(userClicked);
    localStorage.setItem("clickedDrinks", JSON.stringify(userClickedArray));
  
  });
}

function removeDuplicates(userClickedArray) {
 userClickedArray.sort();
 for (var i = 0; i < userClickedArray.length; i++) {
  if(userClickedArray[i-1] == userClickedArray[i]) {
    userClickedArray.splice(i, 1);
 }else {
  i++;
 }
}
return userClickedArray;
}

// TODO function that takes a drink's data and store in localStorage as favorite drinks
function saveToFavorites(drinkData) {}


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
      document.querySelector(".singleDrink").innerHTML = "";
      //filter_array_values(data)

      var selectedDrink = data.drinks[0];
      console.log("here is a selected drink", selectedDrink);
      var drinkIngredients = [];
      for (var i = 1; i < 16; i++) {
        var name = selectedDrink["strIngredient" + i];
        //if there's an ingredient name, add to the list
        if (name) {
          drinkIngredients.push({
            name: name.trim(),
            measurement: selectedDrink["strMeasure" + i]?.trim(),
          });
        } else {
          break;
        }
      }
      selectedDrink.ingredients = drinkIngredients;
      createMainDrinkCard(cleanUpNullish(selectedDrink));
    })
    .catch((err) => console.log(err));
}

function createMainDrinkCard(selectedDrink) {
  console.log("HERE'S YO DATA", selectedDrink);
  var drinkSection = document.createElement("div");
  drinkSection.setAttribute("drinkchoice", selectedDrink.idDrink);
  drinkSection.setAttribute("class", "theDrinkSelected col-md-12 justify-content:space-around; mt-15; pt-5");
  //make var here to store the ingredients html string
  var ingredientsHTML = "";
  for (let i = 0; i < selectedDrink.ingredients.length; i++) {
    ingName = selectedDrink.ingredients[i].name;
    ingMeasurement = selectedDrink.ingredients[i].measurement;
    //create 1 ingredient html in each loop and add to the htmlString for all ingredients
    ingredientsHTML += `
    <p style = "font-weight: Bolder; pt-2 mt-2">${ingName} : ${ingMeasurement}</p>
    `;
  }
  drinkSection.innerHTML += `
  <div class = "singleDrinkSelected" style ="min-height: 700px; max-width: 400px;">
  <img style ="flex-grow: 1; margin-left:43px; width: 300px; height: 300px;" src="${selectedDrink.strDrinkThumb}" />
 ${ingredientsHTML}
       Here is how to make the drink :
       ${selectedDrink.strInstructions}
      </div>
       `;

  $(".drinkDisplay").hide();
  $(".singleDrink").append(drinkSection);
  console.log("This is the data im looking for", selectedDrink.ingredients);
}

function historyInput() {
  removeDrinkCards();
  document.getElementById("searchForm").reset();
  document.querySelector(".drinkDisplay").innerHTML = "";
  //DONT FORGET TO REMOVE EVERYTHING IN "singleDrink" element!!!
  $(".drinkDisplay").show();
  var historyDrinks = JSON.parse(localStorage.getItem("clickedDrinks")) || [];
  console.log(historyDrinks);

  for (i = 0; i < historyDrinks.length; i++) {
    var historydiv = document.createElement("div");
    console.log(
      `We are working on drink with id: ${historyDrinks[i].drinkId}. And name: ${historyDrinks[i].drinkName}. And Img url: ${historyDrinks[i].picture}`
    );
    var historypic = historyDrinks[i].picture;
    var historyDrinkNames = historyDrinks[i].drinkName;
    var historyDrinkID = historyDrinks[i].drinkId;
    console.log("this is a past drink selected", historyDrinkID)
    console.log(historyDrinkNames);
    console.log(historypic);
    historydiv.setAttribute("pastDrink-id", historyDrinkID);

    historydiv.setAttribute("class", "alldrinks");
    historydiv.innerHTML += `
      <div style="vertical-align: middle;">
        <img style="flex-grow: 1; height: 200px;" src="${historypic}" />
        <p style ="inline-size:200px">${historyDrinkNames}</p>
      </div>
      `;
    document.querySelector(".drinkDisplay").appendChild(historydiv);
   historydiv.addEventListener("click", function (){
    var oldDrinkID = this.getAttribute("pastDrink-id")
    getOneDrink(oldDrinkID)
   });
  }
}

$("#resetbtn").on("click", clearInput);

//after for loop and creating the ingredientsHTML, put in as part of the whole recipe html

//this function is a utility that takes an object and removes the nullish fields
var cleanUpNullish = (obj) => {
  Object.keys(obj).forEach((key) => {
    obj[key] === null && delete obj[key];
  });
  return obj;
};
function removeDrinkCards() {
$(".theDrinkSelected").remove();

}
function clearInput() {
  document.getElementById("searchForm").reset();
  document.querySelector(".drinkDisplay").innerHTML = "";
  location.reload();
}
