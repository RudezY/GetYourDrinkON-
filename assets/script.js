var apiIng = "www.thecocktaildb.com/api/json/v1/1/filter.php?i=" ;
var apiDrink = "www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" ;
var liquorName = "";
// create other variable for search button
var searchButton = $('#search-button');
var searchDrink = $('#search-drink');
var sDrinks = [];
var ingredients = $('#ingredients');
var instructions = $('#instructions');
// storage for drink by id that was chosen
// function for getting the input from the search input field and getting the value
function getDrink(event) {
    event.preventDefault();
}
//function to fetch the api for drink by ingredient
// display drink options with said ingredient
// grab the drink id from said options
// function to fetch drink choice by drink id.
// display ingredients and instructions on how to make said drink
// make a function that will store past drink choices 5
// click handlers for search function and selecting drink choice
$("#search-button").on("click",getDrink);