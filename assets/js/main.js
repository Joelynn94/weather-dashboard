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

    // get the temperature and convert to fahrenheit 
    let tempF = (response.main.temp - 273.15) * 1.80 + 32;
    tempF = Math.floor(tempF);

    // get and set the content 
    const cardBody = $("#current-city");
    const city = $("#cityName").text(response.name);
    const temp = $("#currentTemp").text("Temperature: " + tempF + " °F");
    const humid = $("#currentHumidity").text("Humidity: " + response.main.humidity + "%");
    const wind = $("#currentWind").text("Wind Speed: " + response.wind.speed + " MPH");
    const image = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

    // add to page
    city.append(image)
    cardBody.append(city, temp, humid, wind);
   
  }



