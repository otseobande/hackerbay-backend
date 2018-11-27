[![Build Status](https://travis-ci.com/otseobande/hackerbay-backend.svg?branch=develop)](https://travis-ci.com/otseobande/hackerbay-backend) [![codecov](https://codecov.io/gh/otseobande/hackerbay-backend/branch/develop/graph/badge.svg)](https://codecov.io/gh/otseobande/hackerbay-backend)

## Hackerbay Backend Challenge

#### Features

- User login.
- Thumbnail creation (50x50) from image url.
- [Json patching](http://jsonpatch.com/).

#### Installation and setup

- Clone this repository by running: `$ git clone https://github.com/otseobande/hackerbay-backend.git`
- Navigate to into the project folder: `cd hackerbay-backend`
- Install dependencies by running: `$ npm install`
- Start the development server by running: `$ npm run start:dev`
- All is set. You should be able to access the application via `localhost:8000`

#### Testing

To test the application simply run: `$ npm run test`

#### Docker
Docker hub repo: [Link](https://hub.docker.com/r/otseobande/hackerbay-backend/)

To use the application's docker image. Follow the following steps:

- Download and install docker
- Login using: `$ docker login`
- Pull the application image: `$ docker pull otseobande/hackerbay-backend`
- Run the image in container: `$ docker run -p 8000:8000 otseobande/hackerbay-backend:latest`
- The application should be accessible via `localhost:8000`

And you're good to go!


#### API documentation

All endpoints are documented using postman. Checkout the [published documentation.](https://documenter.getpostman.com/view/4534067/RzfasXYR)

#### Project management

This project is managed with Pivotal Tracker. Here's a link to the story board: [PT board](https://www.pivotaltracker.com/n/projects/2228010).