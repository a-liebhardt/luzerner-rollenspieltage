# Luzerner Rollenspieltage

## Getting started

You will need [Node.js](http://nodejs.org)
Use [yarn](https://yarnpkg.com) as your package manager, or npm.

    $ git clone https://github.com/a-liebhardt/luzerner-rollenspieltage.git
    $ cd luzerner-rollenspieltage

    # Use node version defined in .nvrmc
    # If you use nvm as node version manager
    $ nvm use

    # To install yarn
    $ npm install -g yarn

    # Install dependencies (with yarn)
    $ yarn install

    # Install dev dependencies (with npm)
    $ npm install --only=dev

    # Run to build all files (dev mode) and start a local server
    $ yarn start

    # Run to generate a production ready styleguide build (root ./build)
    $ yarn build

    # Build the files for release.
    $ npm run build

    # Run to generate a production ready docker build (root ./docker)
    $ yarn build:docker

    # Deploy the files from current branch to gh-pages (after build).
    $ npm run deploy:github gh-pages


## Documentation

- Styleguide is based on [fractal](https://fractal.build/guide) from clearleft.
