/*
This is a client side javascript file which will be served to the requester.
 */
console.log("Client side javascript file is loaded");

/*
Here we need to get the data into this client-side javascript.
FETCH API is used to HTTP request from the client side javascript.
This is a browser based API.
 */

fetch
(
    'http://puzzle.mead.io/puzzle' // URL from which we are fetching.
    /*
    Calling fetch in our client side javascript is an asynchronous I/O operation.
    Which is much like calling a request in NodeJS.
     */
).then
(
    (response)=> // Runs when data is available.
    {
        response.json().then // Parse to object.
            (
                (data)=> // Runs when json data is arrived and parsed.
                {
                    console.log("Puzzle response :",data);
                }
            )
    }
);

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const para1 = document.querySelector('#paraOne');
const para2 = document.querySelector('#paraTwo');

weatherForm.addEventListener('submit',
    (event)=>
    {
        event.preventDefault(); // Prevent the default behaviour that is refresh on submit.

        const location =  search.value;

        console.log('Requested location :',location);

        para1.textContent = 'Fetching...';
        para2.textContent = '';

        fetch
        (
            //`http://localhost:3000/weather?address=${location}` // Commented after using heroku
            `/weather?address=${location}`
            /*
            Removing http:// make sure to use local host if we are running on local host or to use
            the heroku app.
             */
        ).then
        (
            (response)=>
            {
                response.json().then
                (
                    (data)=>
                    {
                        if (data.geocodeError)
                        {
                            para1.textContent = data.geocodeError;
                            return;
                        }
                        else if (data.forecastError)
                        {
                            para1.textContent = data.forecastError;
                            return;
                        }
                        else if (data.error)
                        {
                            para1.textContent = data.error;
                            return console.log("Error occurred while fetching forecast : ",data.error)
                        }
                        console.log("Forecast response :",data);
                        console.log(data.forecast);

                        para1.textContent=data.location;
                        para2.textContent = data.forecast;
                    }
                )
            }
        );
    }
    );