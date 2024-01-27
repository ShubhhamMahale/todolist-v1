
module.exports.getDate = function(){
let today = new Date();
// let currentDay = today.getDay();
// let day = "";

let options = {
  weekday: "long",
  day: "numeric",
  month:"long"
};

return today.toLocaleDateString("en-US", options);

}

module.exports.getDay = function(){
let today = new Date();
// let currentDay = today.getDay();
// let day = "";

let options = {
  weekday: "long"
};

return today.toLocaleDateString("en-US", options);

}
