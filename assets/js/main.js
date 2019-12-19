let city = $("#searchTerm").val();
// store api key
const apiKey = "&appid=afaa8eea1769b4359fd8e07b2efcefbd";

const date = new Date();


$("#searchBtn").on("click", function() {
    // get the value of the input from user
    city = $("#searchTerm").val();

    // clear input box
    $("#searchTerm").val("");

    // full url to call api
    const queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

    $.ajax({
      url: queryUrl,
      method: "GET"
    })
    .then(function (response){

      console.log(response)

      console.log(response.name)
      console.log(response.weather[0].icon)

      let tempF = (response.main.temp - 273.15) * 1.80 + 32;
      console.log(Math.floor(tempF))

      console.log(response.main.humidity)

      console.log(response.wind.speed)

      getCurrentConditions(response);
      getCurrentForecast(response);

    })
  });

  $(".list").on("click", function(city){

  })

  function makeList() {
    let listItem = $("<li>").addClass("list-group-item").text(city);
    $(".list").append(listItem);
  }


  function getCurrentConditions (response) {

    // get the temperature and convert to fahrenheit 
    let tempF = (response.main.temp - 273.15) * 1.80 + 32;
    tempF = Math.floor(tempF);

    // get and set the content 
    const card = $("<div>").addClass("card");
    const cardBody = $("<div>").addClass("card-body");
    const city = $("#cityName").text(response.name);
    const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
    const temperature = $("#currentTemp").text("Temperature: " + tempF + " °F");
    const humidity = $("#currentHumidity").text("Humidity: " + response.main.humidity + "%");
    const wind = $("#currentWind").text("Wind Speed: " + response.wind.speed + " MPH");
    const image = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

    // add to page
    city.append(cityDate, image)
    cardBody.append(city, temperature, humidity, wind);
    card.append(cardBody);
    $("#currentCity").append(card);
   
  }

function getCurrentForecast (response) {
  
  $.ajax({
    url: "http://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
    method: "GET"
  }).then(function (response){

    console.log(response)

    // variable to hold response.list
    let results = response.list;

    for (let i = 0; i < results.length; i++) {

      // get the temperature and convert to fahrenheit 
      let temp = (results[i].main.temp - 273.15) * 1.80 + 32;
      let tempF = Math.floor(temp);

      const card = $("<div>").addClass("card col-md-4 bg-primary text-white");
      const cardBody = $("<div>").addClass("card-body p-3 forecastBody")
      const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
      const temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF + " °F");
      const humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results[i].main.humidity + "%");

      const image = $("<img>").attr("src", "http://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")

      cardBody.append(cityDate, image, temperature, humidity);
      card.append(cardBody);
      $("#forecast").append(card);
    }
  })

}

