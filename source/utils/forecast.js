const request = require('request');

const forecast = (longitude,latitude,fetchWeather) =>
{
    const Weather_API_KEY = 'f349a9e6c8c8d102a13633d5b80ee760';
    const units = "metric";
    const limit = 1;

    const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${Weather_API_KEY}&units=${units}&limit=${limit}`;
    request
    (
        {
            url : weatherURL,
            json : true
        },

        (error,{body})=>
    {

        if (error)
        {
            fetchWeather("Unable to connect to service",undefined);
        }
        else if (body.message)
        {
            fetchWeather("Any error occurred with API : "+body.message,undefined);
        }
        else
        {
            const currentData = body.current;
            const currentTemperature = "It is currently "+currentData.temp+" °C out";

            const dailyData = body.daily;
            const todayForecast = "Today weather is "+dailyData[0].weather[0].description;

            fetchWeather(undefined,
                {
                    currentTemperature : currentTemperature,
                    todayForecast : todayForecast
                })
        }
    }
);
}

module.exports = forecast;