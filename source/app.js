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
                                        forecast : todayForecast+".\n"+currentTemperature,
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


/*expressApplication.listen
(
    3000,
    ()=>
    {
        console.log("Server started on port 3000");
    }
);*/ // Changed to below after deploying to heroku.
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
const port = process.env.PORT || 3000; // Port provided by heroku in environment variables. Another condition due to that environment variable port is only done by heroku so if using it ourselves.
expressApplication.listen
(
    port,
    ()=>
    {
        console.log("Server started on port",port);
    }
);

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

Now we should transfer our project coe between our machine and the other third party services
server in a secure way. For that we use SSH, secure shell which gives us a means for securely
communicating with another machine.
Here we use SSH key pair which is a set of two files which will be using to facilitate the
secure communication.

(GIT bash commands)
Command "ls -a -l ~/.ssh" will list the directories of a certain directory.
-a flag is for showing hidden files.
-l flag is for listing items top to bottom.
~ to path to print the contents.

If SSH key are not found then we use command " ssh-keygen -t rsa -b 4096 -C "aitha.tarun@gmail.com" " which allows us to generate this
SSH key pair.
Argument -t is type.
RSA protocol is used here.
-b for number of bits.
-C is for comment for the key.

By above command we will generate two files "id_rsa", "id_rsa.pub", where first file is a
secret file which we are going to keep on our machine. And other is a public file which we
will share with both GITHUB and heroku so it can secure the communication between our machine
and their server.

And with command "eval "$(ssh-agent -s)" it will start up SSH agent

And with command "ssh-add" we register the file.

Now which SSH are setup we create a new repository in GITHUB and send local machine repository
to the server. Here created repository : "node-weather-website".

For sending to server we use two commands (CMD) :
git remote add origin https://github.com/AithaTarun/node-weather-website.git .
Here remote is to manipulate our remotes, a remote is nothing more than a version of our project
hosted somewhere else.
Here add to add remote.
Also origin is the name of the remote and by default we should have the same name for first remote.
ThenURL contains two pieces of information. Username and repository name.
And this command is used to set up the channel of communication.

And with command (CMD): git push -u origin master
Here push allows us to push our commits up to a given remote here origin.
And master is the default name for branch.
-=And -u flag allows us to set the upstream.
Means one we use this command for the first time then from the next time we could use
"git push" to push commits to GITHUB.

And also we need to provide our public key file to GITHUB.
And also with command "cat ~/.ssh/id_rsa.pub" in bash to get our key.

Here our key name is set to : AithaPredatorSSHKey

To test our connection we run command (Bash) : "ssh -T git@github.com"  and type yes, this is done only once.

Now we could run that second command (CMD): "git push -u origin master"
Which take our commits and push them to the server repository which we have set it in by
the one of the command of two that is "git remote ..." .

So from here if we change code or add new files we just run (CMD)
1) git add .
2) git commit -m "Our change message"
3) git push -u origin master
 */

/*
Now here we see how to push our code to heroku and that will allow us to actually deploy our
NodeJS applications to production so everyone with the URL can view and use the website.

1)First we set out SSH public key file with heroku with command : heroku keys:add
2)And then we create our heroku application with (from root of the project) : heroku create {project name}
  here we given project name = node-weather-website-heroku
  This will give two URLs back in which first one is URL to view our application.
  And second is the URL to the GIT repository where we should be pushing the code we want to deploy.
3) Now for heroku to start up our application we have to tell it which file to run, That is achieved
  by specifying it in the script (in package.json). Their in scripts object we remove key-value
  pair of test and add ' "start" : "node source/app.js" ', which tells heroku how to start
  our app. Also with this in CMD with command "npm run start" will start our application.
4) Now we need to change the listening port in the script which is specified by expressApplication.listen,
  Because while heroku is deploying it will provide the port automatically, now that is not
  a static value, this is a value that changes over time and it's provided to our application
  via environment variable, and environment variable is just a key-value pair set at OS level.
  In this case heroku sets one for the port where the value is the port number to use.

With command "git remote" to to view all our remotes.

And with command : "git push heroku master".
This will ush our latest commits up to the heroku GIT remote. When heroku see that new commits
have been pushed it's going to deploy our application again.

Here our app is deployed to production environment : " https://node-weather-website-heroku.herokuapp.com/"
 */

/*
We can also add a second development script in package.json, which will run nodemon command.
Means we no need to use entire nodemon to run the application.
That script is "dev" : "nodemon source/app.js -e js,html,css,hbs".
By that it will be easy to startup the development server.
Now we can just run "npm run dev" instead of "nodemon source/app.js -e js,html,css,hbs" .

Here this dev scripts works because we have nodemon installed as a global module.
So, that is globally installed and it might not get installed when these project file are provided
to other because "npm install" node_modules which are only local. So, we have to uninstall
the nodemon globally by command : npm uninstall -g nodemon . And install that locally
with command : npm install nodemon --save-dev.
Here save-dev is used to lists it as a dev dependencies i our project.
That is added in package.json under devDependencies. Dev dependencies are dependencies
we only need on our local machine while we are developing, these dependencies are not installed
in our production environment so it saves some time.

Also replace intellij run edit configuration from : C:\Users\aitha\AppData\Roaming\npm\node_modules\nodemon\bin\nodemon.js -e js,hbs,css,html in Node parameters
to "npm run dev" in Application parameters.
 */
