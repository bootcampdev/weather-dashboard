// JavaScript function that wraps everything and runs when DOM is ready
// Notes:
// - Special math symbols http://www.javascripter.net/faq/mathsymbols.htm
$(document).ready(function () {

    // saved api key for openweathermap.org

    var apikey = "d57aa70b0f8e0b9c1c6f9e59e8773471";
    var weather_url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apikey + "&units=imperial";

    var forecast_url = "https://api.openweathermap.org/data/2.5/forecast/?appid=" + apikey + "&units=imperial";

    var weather_uv_url = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apikey

    var today = new Date();
    var currentDate = today.toDateString();
    var localDate = today.toLocaleDateString();


    //events
    //

    // when there is a click on the city list
    $("li").on("click", function (e) {
        var city = $(this).text();
        console.log("item click " + $(this).text())

        get_forecast_weather(city);
    })

    // when there is a click on search button
    $(".btn").on("click", function (e) {

        var inputstr = $("#input-city").val();
        var cityval = inputstr.charAt(0).toUpperCase() + inputstr.slice(1);
        $("#input-city").val(cityval);
        
        get_forecast_weather(cityval);
    })

    // functions 
    //
    function get_forecast_weather(city) {
        var lat;
        var lon;
        var main;
        var uv_index;

        // this also includes todays weather forecast
        $.ajax({
            url: forecast_url + "&q=" + city,
            method: "GET",
            success: function (weatherData) {
                console.log(weatherData);
                $(".main-card-title-custom").text(weatherData.city.name + " (" + localDate + ")");

                // the main is a one word description of the weather
                // use this word to set the icon

                main = weatherData.list[0].weather[0].main;
                set_weather_icon(main, "#main-icon");

                $("#temp").text("Temperature: " + weatherData.list[0].main.temp + " F\xB0;");
                //console.log(weatherData.list[0].main.humidity);
                $("#humidity").text("Humidity: " + weatherData.list[0].main.humidity + " %");
                //console.log(weatherData.list[0].wind.speed);
                $("#wind").text("Wind Speed: " + weatherData.list[0].wind.speed + " MPH");

                lat = weatherData.city.coord.lat;
                lon = weatherData.city.coord.lon

                // fetch the uv index with the latitude and longitude info
                $.ajax({
                    url: weather_uv_url + "&lat=" + lat + "&lon=" + lon,
                    method: "GET"
                }).then(function (uvData) {
                    console.log(uvData);

                    $("#uv-index").text("UV Index: " + uvData.value);
                    $("#uv-index").css("background-color", "red");
                })

                //uv_index = get_uv_index(lat, lon);
                //console.log("back"  + uv_index);
                //$("#uv-index").text("UV Index: " + uv_index);

                // Loop through the next 5 days displaying temp and humidity for the 5-day forecast

                for (var i = 1; i < 6; i++) {

                    $("#card-temp" + i).text("Temp: " + weatherData.list[i].main.temp + " F\xB0;")
                    $("#card-humid" + i).text("Humidity: " + weatherData.list[i].main.humidity + " %");

                    set_weather_icon(weatherData.list[i].weather[0].main, "#card-icon" + i)
                }               

                // finally save city searched and add to city list
                var li = $("li");
                li.text(weatherData.city.name);
                //$(".city-list").prepend(li);
                $(".city-list").append("<li>" + weatherData.city.name + "</li>");
                 
                 localStorage.setItem("myWeatherLastCity", weatherData.city.name);
            },
            error: function () {
                alert("ERROR: No such city.  Please try again.");
            }
        })

        // not sequential need call back not working
        // see https://stackoverflow.com/questions/15847292/function-that-return-a-value-from-ajax-call-request
        function get_uv_index(lat, lon) {
            // fetch the uv index with the latitude and longitude info
            $.ajax({
                url: weather_uv_url + "&lat=" + lat + "&lon=" + lon,
                method: "GET"
            }).then(function (uvData) {
                console.log("here!");
                console.log(uvData.value);
                return (uvData.value);

                //$("#uv-index").text("UV Index: " + uvData.value);
            })
        }

        function set_weather_icon(weather_type, idset) {

            if (weather_type === "Rain")
                $(idset).attr("src", "./Assets/storm.png");
            else if (weather_type === "Clouds")
                $(idset).attr("src", "./Assets/cloudy.png");
            else if (weather_type === "Snow")
                $(idset).attr("src", "./Assets/snowflake.png");
            else if (weather_type === "Clear")
                $(idset).attr("src", "./Assets/sun.png");
        }
    }

    function init_5_day_forecast_cards() {

        // main card titles        
        $(".main-card-title-custom").text("Enter or select a city! (" + localDate + ")");

        // check local storage for the last city weather check
        if (localStorage.getItem("myWeatherLastCity") != null) {
            //add to the display recent city searched
            var myWeatherLastCity = localStorage.getItem("myWeatherLastCity");

            var li = $("li");
            li.text(myWeatherLastCity);
            //$(".city-list").append(li);            
            $(".city-list").append("<li>" + myWeatherLastCity + "</li>");
        }
        else {
            // initialize
            localStorage.setItem("myWeatherLastCity", "");
        }


        // add a day to today for the next 5 days
        var nextDay = new Date();
        nextDay.setDate(nextDay.getDate() + 1);
        var nextLocalDate1 = nextDay.toLocaleDateString();

        var nextDay2 = new Date();
        nextDay2.setDate(nextDay2.getDate() + 2);
        var nextLocalDate2 = nextDay2.toLocaleDateString();

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


    // initialize the weather cards

    init_5_day_forecast_cards();

})    