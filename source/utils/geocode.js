const request = require('request');

const geocode = (address,fetchGeocode) =>
{
    const mapbox_API_KEY = 'pk.eyJ1IjoiYWl0aGF0YXJ1biIsImEiOiJja2NnYTZoMDEwcTk5MzVueHA0MnV0cnk4In0.Is8HmG891aDHhfW4IPLOXA';
    address = encodeURIComponent(address);
    const mapbox_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${mapbox_API_KEY}`;

    request
    (
        {url: mapbox_URL,json: true},
        (error,{body})=>
        {
            if (error)
            {
                fetchGeocode("Network error occurred");
            }
            else if (body.message)
            {
                fetchGeocode("Error occurred with API : "+body.message);
            }
            else if (body.features.length===0)
            {
                fetchGeocode("Error occurred with API : invalid location");
            }
            else
            {
                const locationData = body.features;

                const longitude = locationData[0].center[0];
                const latitude = locationData[0].center[1];
                const location = locationData[0].place_name;

                fetchGeocode(undefined,
                    {
                        longitude : longitude,
                        latitude : latitude,
                        location : location
                    });
            }
        }
    );
};

module.exports = geocode;