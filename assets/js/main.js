$("#searchBtn").on("click", function() {
    // get the value of the input from user
    let city = $("#searchTerm").val();

    // clear input box
    $("#searchTerm").val("");

    // store api key
    const apiKey = "&appid=afaa8eea1769b4359fd8e07b2efcefbd";

    // full url to call api
    const queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

    $.ajax({
        url: queryUrl,
        method: "GET"
    })
    .then(function (response){

        console.log(response.name)
        console.log(response.weather[0].icon)

        let tempF = (response.main.temp - 273.15) * 1.80 + 32;
        console.log(Math.floor(tempF))

        console.log(response.main.humidity)

        console.log(response.wind.speed)
        currentConditions(response)

    })
  });


  function currentConditions (response) {

    let tempF = (response.main.temp - 273.15) * 1.80 + 32;
    tempF = Math.floor(tempF);

    const cardBody = $(".current-city-body");
    const city = $("#cityName").text(response.name);
    const temp = $("<p>").addClass("current-city-text").text("Temperature: " + tempF + " °F");
    const humid = $("<p>").addClass("current-city-text").text("Humidity: " + response.main.humidity + "%");
    const wind = $("<p>").addClass("current-city-text").text("Wind Speed: " + response.wind.speed + " MPH");

    // add to page
    cardBody.append(city, temp, humid, wind);

  }



