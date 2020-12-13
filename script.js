// JavaScript function that wraps everything and runs when DOM is ready
// Notes:
// - Special math symbols http://www.javascripter.net/faq/mathsymbols.htm
$(document).ready(function () {

    var apikey = "d57aa70b0f8e0b9c1c6f9e59e8773471";
    var weather_url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apikey + "&units=imperial";

    var forecast_url = "https://api.openweathermap.org/data/2.5/forecast/?appid=" + apikey + "&units=imperial";

    var weather_uv_url = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apikey

    var today = new Date();
    var currentDate = today.toDateString();
    var localDate = today.toLocaleDateString();


    init_5_day_forecast_cards();

    $("li").on("click", function (e) {
        var city = $(this).text();
        console.log("item click " + $(this).text())

        get_current_weather(city);
    })

    function get_current_weather(city) {

        $.ajax({
            url: weather_url + "&q=" + city,
            method: "GET"
        }).then(function (weatherData) {

            console.log(weatherData);

            console.log(weatherData.weather[0].main);  //icon setting
            console.log(weatherData.main.temp);  //icon setting
            console.log(weatherData.main.humidity);  //temp
            console.log(weatherData.wind.speed);  //temp
            console.log(weatherData.main.humidity);  //temp


            //   $(".city").text(weatherData.name);

            //   $(".wind").text(weatherData.wind.speed);

            //   $(".humidity").text(weatherData.main.humidity);

            //   $(".temp").text(weatherData.main.temp);

            get_forecast_weather(city);
        })

    }

    function get_forecast_weather(city) {
        var lat;
        var lon;

        // also includes todays weather forecast
        $.ajax({
            url: forecast_url + "&q=" + city,
            method: "GET"
        }).then(function (weatherData) {

            //console.log(weatherData);

            console.log(weatherData.list[0].weather[0].main);  //icon setting
            //console.log(weatherData.list[0].main.temp);
            $("#temp").text("Temperature: " + weatherData.list[0].main.temp + " F\xB0;");
            //console.log(weatherData.list[0].main.humidity);
            $("#humidity").text("Humidity: " + weatherData.list[0].main.humidity + " %");
            //console.log(weatherData.list[0].wind.speed);
            $("#wind").text("Wind Speed: " + weatherData.list[0].wind.speed + " MPH");


            lat = weatherData.city.coord.lat;
            lon = weatherData.city.coord.lon
            console.log(lat);
            console.log(lon);

            // fetch the uv index with the latitude and longitude info
            $.ajax({
                url: weather_uv_url + "&lat=" + lat + "&lon=" + lon,
                method: "GET"
            }).then(function (uvData) {
                console.log(uvData);

                $("#uv-index").text("UV Index: " + uvData.value);
            })



            //   $(".city").text(weatherData.name);
            //   $(".wind").text(weatherData.wind.speed);
            //   $(".humidity").text(weatherData.main.humidity);
            //   $(".temp").text(weatherData.main.temp);


        })

    }

    function init_5_day_forecast_cards() {

        // main card titles        
        $(".main-card-title-custom").text("Arlington Heights (" + localDate + ")");

        // add a day to today
        var nextDay = new Date();
        nextDay.setDate(nextDay.getDate() + 1);
        var nextLocalDate1 = nextDay.toLocaleDateString();

        var nextDay2 = new Date();
        nextDay2.setDate(nextDay2.getDate() + 2);
        var nextLocalDate2 = nextDay2.toLocaleDateString();
        console.log(nextDay2);
        console.log(nextLocalDate2);

        var nextDay3 = new Date();
        nextDay3.setDate(nextDay3.getDate() + 3);
        var nextLocalDate3 = nextDay3.toLocaleDateString();

        var nextDay4 = new Date();
        nextDay4.setDate(nextDay4.getDate() + 4);
        var nextLocalDate4 = nextDay4.toLocaleDateString();

        var nextDay5 = new Date();
        nextDay5.setDate(nextDay5.getDate() + 5);
        var nextLocalDate5 = nextDay5.toLocaleDateString();

        $("#card-day-1").text(nextLocalDate1);
        $("#card-day-2").text(nextLocalDate2);
        $("#card-day-3").text(nextLocalDate3);
        $("#card-day-4").text(nextLocalDate4);
        $("#card-day-5").text(nextLocalDate5);
    }








})    