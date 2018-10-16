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

### Add secrets and private datas

Then you have to add a `./private` folder. Place all static files and folders inside of it. Those files and folders won't show up in GitHub but will be used for deployment.

Last create a `secrets.json` on root `./`. Then add key/value couples for development as well as for production like this:

    {
      "replacements": {
        "development": [
          { "search": "{KEY}", "replace": "XXX" },
          { "search": "{KEY}", "replace": "XXX" },
          ...
        ],
        "production": [
          { "search": "{KEY}", "replace": "XXX" },
          { "search": "{KEY}", "replace": "XXX" },
          ...
        ]
      }
    }

It will replace critical variables on build automatically. Latest variables in use are:
- `{GOOGLE_MAP_APIKEY}` /patterns/02-ui/map/map
- `{PHP_MAILER_HOST}` /static_files/docker/src/form
- `{PHP_MAILER_USER}` /static_files/docker/src/form
- `{PHP_MAILER_PASSWORD}` /static_files/docker/src/form
- `{PHP_MAILER_PASSWORD}` /static_files/docker/src/form
- `action="http://localhost:3000/rest/form.json"` /patterns/03-modules/form-1,-2,-3
- `method="get"` /patterns/03-modules/form-1,-2,-3

### Develop

Run to build all files (dev mode) and start a local server:

    $ yarn start

### Deploy

Generate a production ready styleguide build in `./build`:

    $ yarn build

Or to build the release (with npm):

    $ npm run build

To generate a production ready docker build in `./docker`:

    $ yarn build:docker

Deploy the files from current branch to gh-pages (after build):

    $ npm run deploy:github gh-pages

## Best practice

### Basic

We follow a CORE, UI and MODULES workflow. The idea is to build your elements from global (CORE) to general (UI) to specific (MODULES). This approach offer an easy way to standardize the build up. And makes handling and reusability of every UI element easy.

#### CORE

All CORE elements must be desigend as global ones. Here we talking for example about colors, fonts and typography. Totally lose stuff here.

#### UI

UI elements are more specific and therefore designed to handle specific jobs. As example we have one elemente to handle labels. And labels only with all it configuration options and ways it can be used. There for a UI element must be as general as possible and at the same way provide the necessary build up and modularity to do its job. It must be simple and stupid.

#### MODULES

Last we have MODULES. Those are the elements which are the most specific ones. MODULES are used to solve a specific task and are build with various UI elements. For example we build a gallery list. There for we may use several UIs: ARTICLE to setup a title, IMAGES to show our images and LINK to add a show more link. Then we setup a basic structure using our GRID and place all UIs on their final positions. That's it.

### Style

To support the modular apporach we follow the princip of simplicity. Every element should have a single main and unique class selector. Inside a element we then can use a structure key approach. All sub classes you like to add to modify special behaviours of a element should be placed next to the main class, too. This approach make sure CSS overwrite isn't messed up. On the same page you minimize DOM size which lead to higher performance on user side and increase readability and maintainability in your development process.

`Note: If you notice you have to much levels inside a DOM and or SCSS declaration or it is hard to read or hard to maintain you may split up your element to several subs at any time.`

We recommend to use pattern like this:

    .initial-class > header
    .initial-class > header > h1
    .initial-class > main
    .initial-class > main > p
    .initial-class > main > ul
    .initial-class > main > ul > li

`Note: We use strict selectors to match the current element only. This way we'll prevent conflicts with other elements when they are placed inside and/or combined with other elements.`

SCSS Lint setup: https://github.com/brigade/scss-lint
SCSS Linters: https://github.com/brigade/scss-lint/blob/master/lib/scss_lint/linter/README.md

### Script

For JavaScript we use an open approach pased on Vanilla Script. This approach is, because of an high variety of existing build patterns and workflows, unrestricted. Please use a princip of simplicity for all your JS solutions.

## Documentation

- Styleguide is based on [fractal](https://fractal.build/guide) from clearleft.
