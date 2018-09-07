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

const updateColor = function (args, done) {
  // Local dependencies
  const os = require('os');
  const yaml = require('yamljs');
  const hexRgb = require('hex-rgb');
  const fs = require('fs-extra');
  // Array that stores color variables so they can be referenced by other variables
  const endOfLine = os.EOL;
  const colorsArray = [];
  const colorsStartDelimiter = `// COLORS (START) ${endOfLine}// Auto-Generated section, please edit in src/atoms/colors/colors.yml ${endOfLine}// Use SASS function rgba, darken, lighten ... to adjust color to your needs. ${endOfLine}// For more Info see: https://robots.thoughtbot.com/controlling-color-with-sass-color-functions`;
  const colorsEndDelimiter = '// COLORS (END)';
  const fileYML = './patterns/01-core/colors/colors.config.yml';
  const fileHBS = './patterns/01-core/colors/colors.hbs';
  const fileSettings = './patterns/_config/_settings.scss';
  let currentColor;
  let currentColorId;
  let rgbValue;
  let colorSection;
  let segments;
  let segmentColor;
  let segmentName;
  let newColorsSection = colorsStartDelimiter + endOfLine;

  const getColorPartial = (colorPartName, colorPartId, colorPartHEX, colorPartRGB, level) => {
    let colorPart = '';
    colorPart += `<div class="color-item level-${level}">${endOfLine}`;
    colorPart += `<section class="color-example" style="background-color: ${colorPartHEX};"></section>${endOfLine}`;
    colorPart += `<aside>${endOfLine}`;
    colorPart += `<h3>${colorPartName}</h3>${endOfLine}`;
    colorPart += `<p class="color-id">ID: ${colorPartId.toLowerCase().replace('$', '')}</p>${endOfLine}`;
    colorPart += `<p class="color-hex">HEX: ${colorPartHEX}</p>${endOfLine}`;
    colorPart += `<p class="color-rgb">RGB: ${colorPartRGB}</p>${endOfLine}`;
    colorPart += `</aside>${endOfLine}`;
    colorPart += `</div>${endOfLine}`;
    return colorPart;
  };

  const componentToHex = (c) => {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  };

  const rgbToHex = (r, g, b) => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  };

  const colorsYAML = yaml.load(fileYML);
  const loopObject = function(items, html, level, colorId) {
    Object.keys(items).forEach(function(section) {
      if (level == 0) {
        // Draw group header
        newColorsSection += `//--- ${section.toUpperCase()} ---//${endOfLine}`;
        html += `<div class="color-items">${endOfLine}`;
      }
      // Read color object
      colorSection = items[section];

      // Set color ID
      currentColorId = colorId + section.toLowerCase();

      // Parse each colors in the section
      if (typeof colorSection === 'object') {
        html = loopObject(colorSection, html, level + 1, currentColorId)

      } else {

        segments = colorSection.split(';');
        segmentColor = segments[0] ? segments[0] : colorSection;
        segmentName = segments[1] ? segments[1] : section;

        if (level == 0) {
          parentGroupName = segmentName;
        }

        // Check if another color variable is referenced to (must be in the same file and must be defined first)
        currentColor = segmentColor.startsWith('$') ? colorsArray[segmentColor] : segmentColor;

        // Store color in colors array (in case referenced later as a variable by another color)
        colorsArray[currentColorId] = currentColor;

        // Get RGB
        if (currentColor.startsWith('rgb')) {
          const rgb = currentColor.replace(/[rgba\(\) ]/gi, '').split(',');
          rgbValue = [
            parseInt(rgb[0]),
            parseInt(rgb[1]),
            parseInt(rgb[2])
          ];
        // Convert HEX to RGB
        } else {
          rgbValue = hexRgb(currentColor);
        }

        // Add to color template
        const hexLabel = rgbToHex(rgbValue[0], rgbValue[1] ,rgbValue[2]);
        const rgbLabel = rgbValue.join('/');
        if (level == 0) {
          html += getColorPartial(segmentName, currentColorId, hexLabel, rgbLabel, level);
        } else {
          html += getColorPartial(`${parentGroupName} ${segmentName}`, currentColorId, hexLabel, rgbLabel, level);
        }

        // Create the RGB variable
        newColorsSection += `${currentColorId}: rgb(${rgbValue[0]}, ${rgbValue[1]}, ${rgbValue[2]});${endOfLine}`;
      }
      if (level == 0) {
        // Close group
        html += `</div>${endOfLine}`;
      }
    });

    return html;
  };

  let colorsHTML = loopObject(colorsYAML.context.colors, '', 0, '$color--');

  newColorsSection += colorsEndDelimiter;

  let settingsContent = fs.readFileSync(fileSettings, 'utf8');
  settingsContent = settingsContent.replace(/\/\/ COLORS \(START\)(.|\n|\r\n)*\/\/ COLORS \(END\)/, newColorsSection);
  // Update color varaibles in settings
  fs.writeFileSync(fileSettings, settingsContent);
  // Update color preview HTML
  fs.writeFileSync(fileHBS, colorsHTML);

  done();
};

fractal.cli.command('fractal:color', updateColor);

// Special func to distribute static html page
const docker = function (args, done) {
  const fs = require('fs-extra')
  const path = require('path');
  const app = this.fractal;
  const root = 'docker/';
  const dockerWWW = `${root}src/`;
  const statuses = ['published'];
  const secrets = require(path.join(__dirname, 'secrets.json'));

  const clonePages = (pageBody) => {
    let files = 0;
    for (let item of app.components.flatten()) {
      if (item.viewPath.match(/(\/|\\)([0-9]*-)?pages(\/|\\)/g)) {
        if (statuses.indexOf(item.status.label.toLowerCase()) >= 0) {
          item.render().then(function(contentBody){
            // content to page wrapper
            let htmlBody = pageBody.replace(/\{\{\{ yield \}\}\}/, contentBody);
            // Remove whitespaces, newlines and tabs
            htmlBody = htmlBody.replace(/[\s\t\n]{1,}/g, ' ');
            htmlBody = htmlBody.replace(/\> \</g, '><');
            htmlBody = htmlBody.replace(/<!--[^\[](.*?)-->/g, '');
            secrets.replacements.production.forEach((secret) => {
              htmlBody = htmlBody.replace(new RegExp(secret.search, 'g'), secret.replace);
            });
            // Write file to dest
            fs.writeFile(path.join(__dirname, `${dockerWWW}${item.handle}.html`), htmlBody, {encoding:'utf8', mode:0o666, flag:'w'}, (err) => {
              if (err) throw err;
              files++;
              console.log(`Page ready: '${dockerWWW}${item.handle}.html'`);
            });
          });
        }
      }
    }
    setTimeout(() => {
      if (!files) {
        console.warn(`Warning: No page released. Please make sure to set status 'published' for pages in order to distribute.`);
      }
    }, 1000);
  };

  const buildWebPage = () => {
    fs.readFile('patterns/_preview-competition.hbs', {encoding:'utf8', flag:'r'}, (err, data) => {
      if (err) throw err;
      // Parse fractal paths
      data = data.replace(/\{\{ path \'([0-9a-zA-Z\/\-.]*)'\}\}/g, '.$1');
      clonePages(data);
    });
  };

  fs.copy('public', dockerWWW, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log(`Dist ready on '${root}'`);
      buildWebPage();
    }
  });

  done();
};

fractal.cli.command('docker', docker);

const rmdocker = function (args, done) {
  const fs = require('fs-extra')
  const path = require('path');
  const root = 'docker/';

  // Remove root folder
  fs.remove(path.join(__dirname, root), () => {
    // Add new root folder
    fs.mkdir(path.join(__dirname, root), (err) => {
      if (err) throw err;
      console.log(`Dist '${root}' is ready`);
      done();
    });
  });
};

fractal.cli.command('rmdocker', rmdocker);

const i18n = function (args, done) {
  // Local dependencies
  const glob = require('glob');
  const os = require('os');
  const yaml = require('yamljs');
  const fs = require('fs-extra');
  const endOfLine = os.EOL;
  const fileYML = './patterns/**/*.config.yml';
  const fileJS = './public/translations.json';
  let i18nBody = {};
  let statuses = [];
  if (typeof args.status !== 'undefined') {
    statuses = args.status.toLowerCase().split(',');
  }

  glob(path.join(__dirname, fileYML), {}, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      const configYAML = yaml.load(file);
      if (configYAML && typeof configYAML.i18n !== 'undefined' && typeof configYAML.status !== 'undefined') {
        // console.log(file);
        // console.log(configYAML.i18n);
        if (statuses.indexOf(configYAML.status.toLowerCase()) >= 0) {
          Object.keys(configYAML.i18n).forEach(function(iso) {
            if (typeof i18nBody[iso] === 'undefined') {
              i18nBody[iso] = {};
            }
            Object.keys(configYAML.i18n[iso]).forEach(function(key) {
              i18nBody[iso][key] = configYAML.i18n[iso][key];
            });
          });
        }
      }
    });
    // console.log(i18nBody);
    htmlBody = JSON.stringify(i18nBody);
    // Write file to dest
    fs.writeFile(path.join(__dirname, fileJS), htmlBody, {encoding:'utf8', mode:0o666, flag:'w'}, (err) => {
      if (err) throw err;
      console.log(`Translation updated in '${fileJS}'`);
    });
  });
  done();
};

fractal.cli.command('fractal:i18n [status]', i18n);
