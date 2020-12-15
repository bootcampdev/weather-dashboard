// JavaScript function that wraps everything and runs when DOM is ready
// Notes:
// - Special math symbols http://www.javascripter.net/faq/mathsymbols.html
// - Weather Icons by https://www.flaticon.com/authors/those-icons

$(document).ready(function () {

    // saved api key for openweathermap.org

    var apikey = "d57aa70b0f8e0b9c1c6f9e59e8773471";
    var weather_url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apikey + "&units=imperial";
    var forecast_url = "https://api.openweathermap.org/data/2.5/forecast/?appid=" + apikey + "&units=imperial";
    var weather_uv_url = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apikey

    var today = new Date();
    var localDate = today.toLocaleDateString();

    //events
    //

    // search click event, get the weather and add the city to the list
    $(".btn").on("click", function (e) {

        var inputstr = $("#input-city").val();
        var cityval = inputstr.charAt(0).toUpperCase() + inputstr.slice(1);
        $("#input-city").val(cityval);

        // add click event listener to this new li
        $('.city-list').prepend("<li>" + cityval + "</li>").on("click", "li", function () {
            var city = $(this).text();
            get_forecast_weather(city);
        });

        //get_current_weather(cityval);
        get_forecast_weather(cityval);
        localStorage.setItem("myWeatherLastCity", cityval);
    })

    // $("#input-city").keypress(function (e) {
    //     var key = e.which;
    //     if (key == 13)  // the enter key code
    //     {
    //         //$('input[name = butAssignProd]').click();
    //         console.log("return");
    //         $(".btn").click();
    //         //return false;
    //     }
    // })

    // functions 
    //

    function get_current_weather(city) {

        var lat;
        var lon;
        var main;

        // todays weather and uv index
        $.ajax({
            url: weather_url + "&q=" + city,
            method: "GET",
            success: function (weatherData) {

                $(".main-card-title-custom").text(weatherData.name + " (" + localDate + ")");

                // the main is a one word description of the weather
                // use this word to set the icon

                main = weatherData.weather[0].main;
                set_weather_icon(main, "#main-icon");

                $("#temp").text("Temperature: " + weatherData.main.temp + " F\xB0;");
                $("#humidity").text("Humidity: " + weatherData.main.humidity + " %");
                $("#wind").text("Wind Speed: " + weatherData.wind.speed + " MPH");

                lat = weatherData.coord.lat;
                lon = weatherData.coord.lon

                // fetch the uv index with the latitude and longitude info
                $.ajax({
                    url: weather_uv_url + "&lat=" + lat + "&lon=" + lon,
                    method: "GET"
                }).then(function (uvData) {

                    var uvVal = parseFloat(uvData.value);
                    $("#uv-index").text("UV Index: " + uvData.value);

                    // set uv index color by uv rating
                    if (uvVal > 11)
                        $("#uv-index").css("background-color", "purple");
                    else if (uvVal > 8)
                        $("#uv-index").css("background-color", "red");
                    else if (uvVal > 6)
                        $("#uv-index").css("background-color", "orange");
                    else if (uvVal > 3)
                        $("#uv-index").css("background-color", "yellow");
                    else if (uvVal > 0)
                        $("#uv-index").css("background-color", "green");
                })
            },
            error: function () {
                alert("ERROR: No such city.  Please try again.");
            }
        })
    }

    function get_forecast_weather(city) {

        get_current_weather(city);

        // forecast weather starting with tomorrow
        $.ajax({
            url: forecast_url + "&q=" + city,
            method: "GET",
            success: function (weatherData) {

                // Loop through the next 5 days (3hr incrments) displaying temp and humidity for the 5-day forecast
                var ii = 0;
                for (var i = 1; i < 6; i++) {

                    $("#card-temp" + i).text("Temp: " + weatherData.list[ii].main.temp + " F\xB0")
                    $("#card-humid" + i).text("Humidity: " + weatherData.list[i].main.humidity + " %");

                    set_weather_icon(weatherData.list[ii].weather[0].main, "#card-icon" + i)

                    ii = ii + 8;
                }
            },
            error: function () {
                alert("ERROR: No such city.  Please try again.");
            }
        })

        // not sequential need call back not working keep to reference
        // see https://stackoverflow.com/questions/15847292/function-that-return-a-value-from-ajax-call-request
        // function get_uv_index(lat, lon) {
        //     // fetch the uv index with the latitude and longitude info
        //     $.ajax({
        //         url: weather_uv_url + "&lat=" + lat + "&lon=" + lon,
        //         method: "GET"
        //     }).then(function (uvData) {
        //         console.log("here!");
        //         console.log(uvData.value);
        //         return (uvData.value);

        //         //$("#uv-index").text("UV Index: " + uvData.value);
        //     })
        // }
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

    function init_5_day_forecast_cards() {

        // main card title      
        $(".main-card-title-custom").text("Enter or select a city! (" + localDate + ")");

        // check local storage for the last city weather check
        if (localStorage.getItem("myWeatherLastCity") != null) {
            //add to the display recent city searched
            var myWeatherLastCity = localStorage.getItem("myWeatherLastCity");

            $(".city-list").append("<li>" + myWeatherLastCity + "</li>").on("click", "li", function () {
                get_forecast_weather(myWeatherLastCity);
            });
        }
        else {
            // initialize storage variable
            localStorage.setItem("myWeatherLastCity", "");
        }

        // initialize the next 5 days as boot strap cards
        // add a day to today for the next 5 days to display forecast
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

    //
    // begin: initialize the weather cards then let user select city

    init_5_day_forecast_cards();

})    