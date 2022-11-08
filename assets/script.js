var apiIng = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
var apiDrink = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
var drink = "";
var sDrinks = [];
var formEl = $("#searchForm");
var inputEl = $("#termInput");
var drinkDisplay = $(".drinkDisplay")


formEl.on("submit", function (e) {
  e.preventDefault()
  var term = inputEl.val()
  var url = apiIng + term;
  console.log(term);
  //fetch
  fetch(`${url}`)
  .then(response => {
    return response.json()
    
  }).then(data => {
    console.log(data);
    for (var i=0; i<data.drinks.length; i++) {
console.log(data.drinks[i]);
      var drinkDiv = document.createElement("div")
      drinkDiv.innerHTML += `
    	<div style="display: flex;">
      	<p>Char</p>
      	<img style="flex-grow: 1; height: 60px;" src="${data.drinks[i].strDrinkThumb}" />
        <p>${data.drinks[i].strDrink}</p>
      </div>
    `
    document.querySelector('.drinkDisplay').appendChild(drinkDiv)
    drinkDiv.addEventListener('click', function(e) {
      
    })

    }

  }).catch(err => console.log(err));
})