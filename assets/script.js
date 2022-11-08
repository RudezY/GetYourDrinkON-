var apiIng = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
var apiDrink = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
var drink = "";
var sDrinks = [];
var formEl = $("#searchForm");
var inputEl = $("#termInput");
var drinkDisplay = $(".drinkDisplay")
var resetbutton = $("#resetbtn");
var selectedDrinkID = $("alldrinks");

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
    document.querySelector('.drinkDisplay').innerHTML="";
    for (var i=0; i<data.drinks.length; i++) {
  console.log(data.drinks[i]);
      var drinkDiv = document.createElement("div");
      drinkDiv.setAttribute("drink-id", data.drinks[i].idDrink)
      drinkDiv.setAttribute("class", "alldrinks"+ [i])
      drinkDiv.innerHTML += `
    	<div style="vertical-align: middle;">
      	<img style="flex-grow: 1; height: 60px;" src="${data.drinks[i].strDrinkThumb}" />
        <p>${data.drinks[i].strDrink}</p>
      </div>
    `
    document.querySelector('.drinkDisplay').appendChild(drinkDiv)
    drinkDiv.addEventListener('click', function(e) {
      console.log(this.getAttribute("drink-id"))
      var drinkIDS = (this.getAttribute("drink-id"));
      localStorage.getItem("drink-id")
      var oldIDS = localStorage.getItem("drink-id");
      if (oldIDS) {
        oldIDS = JSON.parse(oldIDS)
      }else {
        oldIDS = [];
      }
      oldIDS.push(drinkIDS)
      localStorage.setItem('drink-ids',JSON.stringify(oldIDS));
      // on click use apiDrink + drink-id to display drink with ingredients and instructions 
    
    })

    }

  }).catch(err => console.log(err));


})

selectedDrinkID.on("click", (e) => {
var drinkToShow = selectedDrinkID.val()
var url2 = apiDrink + drinkToShow
console.log(url2)
fetch(`${url2}`)
.then(response => {
  return response.json()
  
}).then(data => {
  console.log(data);






});

});




function clearInput() {
  document.getElementById("searchForm").reset();
  document.querySelector('.drinkDisplay').innerHTML="";
};

$("#resetbtn").on("click", clearInput);