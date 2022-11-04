const drinks = require("./output.json");
const { writeFileSync} = require("fs");

const cleanUpNullish = obj => {
    console.log(obj)
    Object.keys(obj).forEach(key => {
        obj[key] === null && (delete obj[key])
    });
    return obj
}

let allDrinks = [];

drinks.forEach(d => {
    allDrinks = allDrinks.concat(d.drinks)
})

const output = allDrinks.filter(a => !!a).map(d => {
    return cleanUpNullish(d)
});

writeFileSync("./cleanedOutput.json", JSON.stringify(output))