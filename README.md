# 06 Server-Side APIs: Weather Dashboard
# weather-dashboard

Demonstartion of third-pary APIs to allow developers to access their data.  This applicaion will use the  [OpenWeather API](https://openweathermap.org/api) to fetch the current and forecasted weather for the city selected.  

The weather-dashboard utilize the `localStorage` to retrieve the last city searched and dynamically update the CSS to show the weather type (sunny, cloudy..) with a representative icon.  (Acknowlegment, Icons made by Those Icons from www.flaticon.com)


## User Story

```
As a user this dashboard will show the weather and their forecast for multiple cities

```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast
```

The following image demonstrates the application functionality:

![weather dashboard demo](./Assets/06-server-side-apis-homework-demo.png)

## Review

You are required to submit the following for review:

* The URL of the deployed application.

* The URL of the GitHub repository. Give the repository a unique name and include a README describing the project.

- - -
© 2019 Trilogy Education Services, a 2U, Inc. brand. All Rights Reserved.
