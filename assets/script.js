var apiIng = "www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
var apiDrink = "www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

var formEl = $("#searchForm");
var inputEl = $("#termInput");

formEl.on("submit", function (e) {
  e.preventDefault();
  console.log("input", inputEl.val());
  //now we take value and search api
});

function search(term) {
  var url = "some url" + term;


  //fetch
  
}
