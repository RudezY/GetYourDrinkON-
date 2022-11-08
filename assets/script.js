var apiIng = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
var apiDrink = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
var drink = "";
var sDrinks = [];
var formEl = $("#searchForm");
var inputEl = $("#termInput");

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
  }).catch(err => console.log(err));
})