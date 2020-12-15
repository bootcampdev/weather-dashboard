# 06 Server-Side APIs: Weather Dashboard
### weather-dashboard

Demonstartion of third-pary APIs to allow developers to access their data.  This applicaion will use the  [OpenWeather API](https://openweathermap.org/api) to fetch the current and forecasted weather for the city selected.  

The weather-dashboard utilize the `localStorage` to retrieve the last city searched and dynamically update the CSS to show the weather type (sunny, cloudy..) with a representative icon.  (Acknowlegment, Icons made by Those Icons from www.flaticon.com)


## User Story

```
As a user this dashboard will show the weather and their forecast for multiple cities and store in a list.  
The list is clickable or the user can can type in the city name and click the search button.  
The city name is checked to verify it is valid.

```

![weather dashboard interface](./weather-dashboard/Assets/weather-dashboard-example.PNG)

## Technical Features Include

```
- API jQuery Ajax call, checking for success and failure
- Utilize local storage for the last city search and display this city the next time the application is run
- Dynamic clickable list building including adding the event listener
- Uitilize icons from Flat Icon and specail math symbols from javascripter.com
- Include bootstrap cards
- Color coded UV index presentation based on value
```

Application direct link hosted by Github:

[weather-dashboard](https://bootcampdev.github.io/weather-dashboard/)


