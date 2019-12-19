let city = $("#searchTerm").val();
// store api key
const apiKey = "";


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


  function getCurrentConditions (response) {

    // get the temperature and convert to fahrenheit 
    let tempF = (response.main.temp - 273.15) * 1.80 + 32;
    tempF = Math.floor(tempF);

    // get and set the content 
    const cardBody = $("#current-city");
    const city = $("#cityName").text(response.name);
    const temperature = $("#currentTemp").text("Temperature: " + tempF + " °F");
    const humidity = $("#currentHumidity").text("Humidity: " + response.main.humidity + "%");
    const wind = $("#currentWind").text("Wind Speed: " + response.wind.speed + " MPH");
    const image = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

    // add to page
    city.append(image)
    cardBody.append(city, temperature, humidity, wind);
   
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
      const temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF + " °F");
      const humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results[i].main.humidity + "%");

      const image = $("<img>").attr("src", "http://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")

      cardBody.append(image, temperature, humidity);
      card.append(cardBody);
      $("#forecast").append(card);
    }
  })

}

