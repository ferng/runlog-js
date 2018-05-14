# runlog-js - an exercise log, mainly for running, mainly for me
* Enter and review runs, as in a regular running log, not wanting to rely on my garmin and it's website to review past data many years hence

## Running runlog-js
The application uses mongodb to store data, without it an error will be logged and the application will end (to be honest, as it's effectively a db front end it's pretty much useless without a db!)

### configuration
* **config.js**: server port, database, log location

### deployment:
* build bundle.js (see below)
* copy everything to some directory


## Development
* ES6
* webpack (with babel) and webpack-dev-server for live reloading
* bunyan (testing)
* tape (logging)

### environment
* eslint (with google's style)
* ide (vim): configuration in [github] (https://github.com/ferng/config/tree/master/unixHome)

### building
* public/bundle.js

>     npm run webpack


### local instance:
* start up server:

>     npm start
>     npm run start-plain
 
* run dev-server:

>     npm run web-dev

* go to the webpack dev-server [page] (http://localhost:8080/webpack-dev-server/)


## Testing
### run back-end tests:
>     npm run test-back

### run front-end tests:
>     npm run test-front

### run all tests:
>     npm test

### run one spec file while debugging
* open .vscode/launch.json
* change "program" in "Single" configuration to point to the spec you want to run
* run "Single" in the visual studio code debugger

## Logging
* change configuration if appropriate (see above)
* log file currently set to (runlog.log.json)


## Documentation
### Generate API documentation:
>     npm run docs

### Generate project developer documentation:
>     npm run docs-internal
