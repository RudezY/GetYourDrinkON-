import fetch from "node-fetch"
import { writeFileSync } from "fs";
const letters = "abcdefghijklmnopqrstuvwxyz".split("");
// fetch("https://www.google.com").then(r => console.log(r))
const requests = letters.map(l => fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${l}`).then(r => r.json()));

Promise.all(requests).then(data => writeFileSync("./output.json", JSON.stringify(data)))