const path = require('path');
const fractal = module.exports = require('@frctl/fractal').create();
const pkg = require(path.join(__dirname, 'package.json'));

fractal.set('project.title', pkg.title);
fractal.set('project.version', pkg.version);

/*
 * Components.
 */
fractal.components.set('path', path.join(__dirname, 'patterns'));
fractal.components.set('label', 'Patterns');
fractal.components.set('default.status', pkg.defaultStatus);
fractal.components.set('statuses', pkg.statuses);

/*
 * Documentation pages.
 */
fractal.docs.set('path', path.join(__dirname, 'docs'));

/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
fractal.web.set('static.path', path.join(__dirname, 'public'));
fractal.web.set('builder.dest', path.join(__dirname, 'build'));
fractal.web.set('server.sync', true);
fractal.web.set('server.syncOptions', {
  open: true,
  // browser: ['google chrome', 'firefox'],
  browser: ['google chrome'],
  watchOptions: {
    ignoreInitial: true,
    ignored: ['**/*.scss'], // ignore the files you want webpack HMR to take care of
  },
});

// Extend fractal with custom functions
const i18n = require('./fractal.i18n.js');
fractal.cli.command('fractal:i18n [status]', i18n.build);

const docker = require('./fractal.docker.js')
docker.build.init(fractal);
fractal.cli.command('docker', docker.build.create);
fractal.cli.command('rmdocker', docker.build.remove);

const color = require('./fractal.color.js');
fractal.cli.command('fractal:color', color.update);
