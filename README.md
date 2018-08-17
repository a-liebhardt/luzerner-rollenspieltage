# Luzerner Rollenspieltage

## Getting started

You will need [Node.js](http://nodejs.org)
Use [yarn](https://yarnpkg.com) as your package manager, or npm.

    $ git clone https://github.com/a-liebhardt/luzerner-rollenspieltage.git
    $ cd luzerner-rollenspieltage

### Install

Use node version defined in .nvrmc, if you use nvm as node version manager:

    $ nvm use

To install yarn:

    $ npm install -g yarn

Install dependencies (with yarn):

    $ yarn install

Or to install dev dependencies (with npm):

    $ npm install --only=dev

Last on root ./ you have to create a secrets.json manually and add key/value couples like this:

    {
      "replacements": [
        { "search": "{KEY}", "replace": "XXX" },
        { "search": "{KEY}", "replace": "XXX" },
        ...
      ]
    }

It will replace critical variables on build automatically. Variables in use:
- {GOOGLE_MAP_APIKEY} -> /patterns/02-ui/map/map
- {PHP_MAILER_HOST} -> /patterns/static_docker/src/form
- {PHP_MAILER_USER} -> /patterns/static_docker/src/form
- {PHP_MAILER_PASSWORD} -> /patterns/static_docker/src/form

### Develop

Run to build all files (dev mode) and start a local server:

    $ yarn start

### Deploy

Generate a production ready styleguide build (root ./build):

    $ yarn build

Or to build the release (with npm):

    $ npm run build

To generate a production ready docker build (root ./docker):

    $ yarn build:docker

Deploy the files from current branch to gh-pages (after build):

    $ npm run deploy:github gh-pages


## Documentation

- Styleguide is based on [fractal](https://fractal.build/guide) from clearleft.
