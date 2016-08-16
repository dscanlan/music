# Assumptions
I have assumed that the presets could have a version and so have put the persets into a seperate document store and have made a reference to the _id of the document in a seperate User document.

# Approach
The way that i have approached this task is to first build the server api and then to complete the task by building a front page.

Each preset has a controller that will do the work and communicate with the Mongoose model.

I have split out the routes of the endpoints into their own file with the idea of keeping each module as small as possible to aid maintenance.

# Start
To start the application `npm start`. Which will run the start script in the package.json file.