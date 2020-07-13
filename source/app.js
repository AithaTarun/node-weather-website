/*
Here we will load in Express nad configure it to serve something up and then we will start server.
 */
const express = require('express');
/*
Express library exposes a single function. Here that is express that we use to create a new
express application.
 */
const expressApplication = express(); // No arguments
/*
Instead we configure our server by using various methods provided on the expressApplication itself.
 */

/*
Here if we can have and URLs or routes :
app.com
app.com/help
app.com/about

So, here we have a one domain app.com and all of it's going to run on a single express server.
They will have multiple routes.

We set up our server to send a response when someone tries ro get something at a specific route.
With :
 */

/*
This get method allows us to configure what the server should do when someone tries to get
the resource at a specific URL. Maybe we should be sending back HTML or maybe we should be
sending back JSON.
 */

const path = require('path');

console.log(__dirname); // Gives current directory in which current script lives.
console.log(__filename); // Gives current file location.
/*
Both above values are provided by the wrapper function (main).
That is our code gets wrapped in a function which provided various things to our code like
the require function (to import libraries), that is where __dirname and __filename comes from.

Also we could use "Path" core module to manipulate the OS path.

join function returns a final path to which we send the pieces to the path.

.. : Go up one folder
 */
console.log(path.join(__dirname,'../public'));

const publicDirectoryPath = path.join(__dirname,'../public'); // Defining a path for express config
expressApplication.use(express.static(publicDirectoryPath)); // Setup static directory to serve
/*
 Used to serve the directory.
 It's a way to customize our server. Takes a function which takes the folder we want to serve up.
 Also this is used to provide / serve up static files.
 */
/*
Here static means that the assets are static they do not change.
Also we could use a template engine to render dynamic web pages using express.
Here we use handlebars template engine.
This allows us to render dynamic documents, and also allow us to do is to easily create code
that we can reuse across the pages.
For example we could think that in index_copy.html we want to keep a header up top and a footer down
below. And the header and the footer are things we share across all web pages.
So that header and footer must not change when we keep on going from one page to another.

Without a template engine we have to write out the header in the file and then copy paste
that header in other HTML documents.
So without changing every document we could  reuse a header markup across all of the pages
in the website with a template engine.

Handlebars which is HBS is a addon for the express.
Installation : npm install hbs.
 */

expressApplication.set('view engine','hbs');// Setup handlebars engine.
/*
 Telling express which template engine we have used. With this we set up handlebars.
 Here set is used to set a value for a given express setting.
 */

/*
When we are working with express it expects all of our views or here handlebar templates
to live in a specific folder that is in views folder.
In their we create a view that replaces the home page.
So instead of a home page being a static document served up from public it's going to be a
handlebars template.
 */
const viewsPath = path.join(__dirname,'../templates/views'); // Defining a path for express config
expressApplication.set('views',viewsPath);// Setting path for our views

expressApplication.get
(
    '', // Root route
    (request,response)=>
    {
        response.render('index',
            {
                title : 'Weather App',
                name : 'Aitha Tarun'
            });
        /*
        Render allows us to render our views.
        And here second argument is all of the values that we want that view to access.
        Means passing a dynamic content.
        */
    }
); // This route is for handlebars template.

expressApplication.get
(
    '/about',
    (request,response)=>
    {
        response.render('about',
            {
                title : 'About me',
                name : 'Aitha Tarun'
            });
    }
); // This route is for about handlebars template.

expressApplication.get
(
    '/help',
    (request,response)=>
    {
        response.render('help',
            {
                message : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, aliquam commodi cumque dicta dolorem earum esse eum exercitationem nihil nobis placeat provident quos sed, sequi sit soluta totam velit. Iure.',
                title : 'Help',
                name : 'Aitha Tarun'
            });
    }
); // This route is for help handlebars template.

/*expressApplication.get
(
    '', // Root route/URL.
    // Partial URL means routes : /, /help, /about
    (request,response)=>
    {
        /!*
        This is to describe what we want to do when someone visits the above route.

        This function gets two parameters. First one is the object containing information about
        the incoming request to the server.
        The other argument is the response which contains some methods which allow us to customize
        what we are going to send back to the requester.
         *!/
        /!*response.send('Hello request received this is your response.')*!/ // Commented after sending HTML
        // This send method is used to send something back to the requester.

        /!*response.send
        (
            '<h1>Weather</h1>'
        );*!/ // Commented after sending HTML file.

        /!*
        This is a root route so automatically if we use expressApplication.use(express.static(publicDirectoryPath));
        their is a index_copy.html which will be loaded.
         *!/
        /!*
        So, this won't execute so we could remove this.
         *!/
    }
);*/ // Commented after using expressApplication.use(express.static(publicDirectoryPath)) -> index_copy.html

/*expressApplication.get
(
    '/help', // help rote
    (request,response)=>
    {
        /!*response.send('This is help page');*!/ // Commented after sending object

       /!* response.send
        (
            {
                name : 'Name',
                age : 50
            }
            /!*
            Here express will detect that we have provided an object so it automatically
            going to stringify the JSON and send that to the requester.
             *!/ // Commented after sending array of objects.
        );*!/

        response.send
        (
            [
                {
                    name : 'name1',
                    age : 1
                },
                {
                    name : 'name2',
                    age : 2
                }
            ]
        );
    }
);

expressApplication.get
(
    '/about', // about rote
    (request,response)=>
    {
        /!*response.send('This is about page');*!/ // Commented after sending HTML

        response.send
        (
            '<h1>ABOUT</h1>'
        );
    }
);*/ // Commented both /help and /about after sending respective static files as response.
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

expressApplication.get
(
    /*
    This route goal is to use geocode and forecast functions we created.
    It's then going to send that JSON data back to the browser and the browser will be able to render
    the forecast.

    Here also the browser need to send address to this route. For that we use queryString.
    So, the browser will provide a queryString as part of the URL .
    Then the server will then read the query string value to get the address information.

     */
    '/weather', // weather rote
    (request,response)=>
    {
        /*response.send('This is weather page');*/ // Commented after sending object

        if(!request.query.address)
        {
            return response.send
            (
                {
                    error : 'Provide address as a query parameter to fetch forecast'
                }
            );
        }

        geocode
        (
            request.query.address,
            (error,{longitude,latitude,location} = {})=> // Set a default, because if provided value is not possible to destructure.
            {
                if (error)
                {
                    return response.send
                    (
                        {
                            geocodeError: "An error occurred with geocode : "+error
                        }
                    );
                }
                else
                {
                   forecast(longitude,latitude,
                        (error,{currentTemperature,todayForecast})=>
                        {
                            if (error)
                            {
                                return response.send
                                (
                                    {
                                        forecastError : "An error occurred with forecast : "+error
                                    }
                                );
                            }
                            else
                            {
                                response.send
                                (
                                    {
                                        forecast : todayForecast+"."+currentTemperature,
                                        location,
                                        address : request.query.address
                                    }
                                )
                            }
                        }
                    );
                }
            }
            );
    }
);

expressApplication.get
(
    /*
    This route is used to sends back JSON for experimenting with query strings.
    Query strings are used to provide additional information for the server.
    That will be started with ? and separated by & : ?key=value
     */
    '/products',
    (request,response)=>
    {
        console.log(request.query); // This query property will have the query string/strings.

        if (!request.query.search) // When no search query string, means ?search=games
        {
            return response.send
            (
                {
                    error : 'Provide search query string'
                }
            );
        }
        /*
        This will throw error : Cannot set headers after they are sent to the client.
        When we are trying to respond to a request twice. (Without above return)
        This return will stop the function execution. Or we could use else block.
         */
        response.send
        (
            {
                products : []
            }
        );
    }
);

expressApplication.get
(
    '/help/* ', // Means /help/{anything}
    (request,response)=>
    {
        response.render(
            '404',
            {
                title : 'Help',
                name : 'Aitha Tarun',
                errorMessage : 'Help article not found'
            });
    }
);

expressApplication.get
(
    /*
    This route is used for 404 not found page or we could redirect user when user requested page is
    not found.
    Here * means everything else.

    This route comes last because when an route come it starts compare with public folder
    begin with every other route and if those above routes are not found we serve this route.
     */
    '*',
    (request,response)=>
    {
        response.render
        (
            '404',
            {
                title : 'Not found',
                name : 'Aitha Tarun',
                errorMessage : 'Page not found'
            }
        )
    }
);


expressApplication.listen
(
    3000,
    ()=>
    {
        console.log("Server started on port 3000");
    }
);
/*
This starts up a server and takes a port parameter.
And other argument is listen method which is a callback function which just runs when the
server is up and running.

Starting a server is not a synchronous process.

Here when server is started, in console we won't get back to cmd because the node process is
still up and running, because if with the notes-app or the weather-app there is some discrete
task that needed to be completed. Like read a note or to fetch the weather information for a given
location. When that task was done the node process was closed, with web server it's will
never stop unless we stop it because it;s job is to stay up and running, listening and processing
new incoming requests so it's staying up and running, so if someone does visit the root of
the website they can get a response right away.

We can stop it with : CTRL+C .

URL : localhost:3000/
Here we don't have domains because here we run on the local machines.
 */

/*
Handlebars partials : As the name suggests allows us to create a little template which is part of a
bigger web page. Means like using some reusable things across multiple pages in our website.
For example they can be headers, footers which we want the exact same thing showing on every page.

For that we need to load HBS and we need to tell handlebars where we are going to keep our
partials (also files with .hbs).
 */
const hbs = require('hbs');
const partialsPath = path.join(__dirname,'../templates/partials');
hbs.registerPartials(partialsPath);

/*
For nodemon to watch changes in other than .js we can use -e js,hbs,html,css. This would watch
for the changes in js,html,hbs and css files. Here e represents extension.

Means change intellij configuration : C:\Users\aitha\AppData\Roaming\npm\node_modules\nodemon\bin\nodemon.js -e js,hbs,css,html
*/

/*
To initialize GIT we use command in project root folder : 'git init'
This will create a .git directory in the project folder, this is where GIT stores everything
that makes up our GIT project. So as we add new files and create new commits those are going
to end up getting stored in data structures inside .git directory.

Here repository is a place where GIT things are stored.

This intellij IDE show files in red which are not committed.

Also command 'git status' prints the current status of our setup which includes untracked files.

From here we can add the directories we want to commit.
But node_modules directory not need to be committed because they are node libraries and
they can easy be setup with command 'npm install' .
So we ignore that directory.
GIT gives a way to ignore things from our setup, by creating .gitignore file in the project directory.
In their we can list out the things that GIT don't have to track.

Now if we run git-status we can see that node_modules directory will be excluded.

Now with command 'git add' with of the things we want to add to Staged Changes meaning they
are ready to be committed.
Like 'git add source/' ... .

Also with command 'git add .' used to add all files in Untracked files to Staged Changes.

Now we could use 'git status', we see that all files that we choose to commit will be added and they
are ready for commit (no untracked section).

Now with command 'git commit' used to create a new commit, and we have to provide a message with each commit
describing what exactly changed. Like : for initial commit 'git commit -m "Init commit"'.

Now colors in the IDE will be changed and it comes whn we perform changes.

Again we perform from 'git add .' to 'git commit' to create new commits.

And we commit with : git commit -m {message of the new changes} : git commit -m "Added new comments".
And we get this :
[master 07011e2] Added new comments
 1 file changed, 12 insertions(+)

 */
