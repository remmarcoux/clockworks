# THIS REPOSITORY IS DEPRECATED
Future changes will be committed to https://gitlab.yu-shan.net/chapeau/clockworks

# ClockWorks
An app designed to help reduce the amount of physical card/paper murdered by the insane amount of Clocks created when playing Blades in the Dark or its derivatives.

## Technical details
This is a Node JS app with a React front-end created by Create-React-App. Data is persisted to a MongoDB database.

## Developer setup
You must have Node JS 12+ and NPM installed to work on this project. You must also have a mongodb database handy.

1. Checkout the project
2. `npm install`

To start the project in development mode:
1. `npm start` in the root folder to start the backend, which will by default listen on port 8081.
2. `cd ClientApp` then `npm start`, which will start the front end.
3. Point your browser to `http://localhost:3000` and presto! ClockWorks.

## Configuration
This application uses the [config](https://www.npmjs.com/package/config) package for backend configuration. Configuration keys are either read from specific environment variables or from configuration files in the "config" folder.

**Do not change configuration files**

If you wish to configure the application for your environment or workstation, create a file called `local.yml` and put your configuration there or use environment variables. "Config" overwrites keys from the `default.yml` file with `local.yml`, then with environment variables. Nothing overwrites environment variables. `local.yml` files are gitignored and will not pollute the VCS.

|Key|Env. Variable|Description|
|---|---|---|
|server.port|PORT|Sets the port the application listens on|
|database.connectionString|MONGODB_CONNECTIONSTRING|Sets the connection string to connect to mongodb|

## App build
During development, the two components of the application (backend and front-end) are hosted separately, one by itself (backend) and the other by the Webpack Development Server (front-end).This isn't a viable setup for a production environment however and is only suitable for developement machines.

To build the application, run `npm build`, which will compile the front-end into static assets that are then hosted by the backend. `npm start` to run the application, then point a browser to `http://localhost:8081` and presto! ClockWorks. You can then zip the whole folder and deploy this wherever you please, we've done Azure and dockerized the application. We suggest you remove the `ClientApp/node_modules` folder as it is quite heavy and useless after `npm build`. The root `node_modules` is necessary however.
