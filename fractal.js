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
fractal.components.set('default.status', 'prototype');
fractal.components.set('statuses', {
  prototype: {
    label: 'Prototype',
    description: 'Do not implement.',
    color: '#FF3333'
  },
  wip: {
      label: 'WiP',
      description: 'Work in progress. Implement with caution.',
      color: '#FF9233'
  },
  ready: {
      label: 'Ready',
      description: 'Ready to implement.',
      color: '#29CC29'
  },
  published: {
    label: 'Published',
    description: 'Is published.',
    color: '#FF00E9'
  }
});

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
  const fs = require('fs');
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
const distribute = function (args, done) {
  const fs = require('fs-extra')
  const path = require('path');
  const app = this.fractal;
  const root = 'dist/';

  const rmdir = (dir) => {
    const list = fs.readdirSync(dir);
    for (var i = 0; i < list.length; i++) {
      const filename = path.join(dir, list[i]);
      const stats = fs.statSync(filename);

      if(filename == '.' || filename == '..') {
        // pass these files
      } else if(stats.isDirectory()) {
        // rmdir recursively
        rmdir(filename);
      } else {
        // rm filename
        fs.unlinkSync(filename);
      }
    }
    return true;
  };

  const clonePages = (pageBody) => {
    let files = 0;
    for (let item of app.components.flatten()) {
      if (item.relViewPath.match(/^pages\//g)) {
        if (item.status.label === 'Published') {
          item.render().then(function(contentBody){
            // content to page wrapper
            let htmlBody = pageBody.replace(/\{\{\{ yield \}\}\}/, contentBody);
            // Remove whitespaces, newlines and tabs
            htmlBody = htmlBody.replace(/[\s\t\n]{1,}/g, ' ');
            htmlBody = htmlBody.replace(/\> \</g, '><');
            htmlBody = htmlBody.replace(/<!--[^\[](.*?)-->/g, '');
            // Write file to dest
            fs.writeFile(path.join(__dirname, `${root}${item.handle}.html`), htmlBody, {encoding:'utf8', mode:0o666, flag:'w'}, (err) => {
              if (err) throw err;
              files++;
              console.log(`Dist ready: '${root}${item.handle}.html'`);
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

  const copyAssetsTo = (items) => {
    const copyFile = (from, to) => {
      fs.copyFile(from, to, (err) => {
        if (err) throw err;
        console.log(`Dist ready: ${to}`);
      });
    };

    items.forEach((item) => {
      try {
        const stats = fs.statSync(path.join(__dirname, item.source));
        if (stats.isFile()) {
          copyFile(path.join(__dirname, item.source), path.join(__dirname, item.target));
        }
        if (stats.isDirectory()) {
          fs.mkdir(path.join(__dirname, item.target), (err) => {
            if (err) throw err;
            const list = fs.readdirSync(item.source);
            for (var i = 0; i < list.length; i++) {
              const filename = list[i];
              copyFile(path.join(__dirname, `${item.source}${filename}`), path.join(__dirname, `${item.target}${filename}`));
            }
          });
        }
      } catch(e) {
        console.warn(`Warning: Not found ${item.source}`);
      }
    });
  };

  fs.remove(path.join(__dirname, root), () => {
    fs.mkdir(path.join(__dirname, root), (err) => {
      if (err) throw err;
      buildWebPage();

      copyAssetsTo([
        { source: 'build/translations.json', target: `${root}/translations.json` },
        { source: 'build/apple-icon-180x180.png', target: `${root}/apple-icon-180x180.png` },
        { source: 'build/favicon-32x32.png', target: `${root}/favicon-32x32.png` },
        { source: 'build/favicon-16x16.png', target: `${root}/favicon-16x16.png` },
        { source: 'build/manifest.json', target: `${root}/manifest.json` },
        { source: 'build/favicon.ico', target: `${root}/favicon.ico` },
        { source: 'build/robots.txt', target: `${root}/robots.txt` },
        { source: 'build/css/', target: `${root}css/` },
        { source: 'build/js/', target: `${root}js/` },
        { source: 'build/images/', target: `${root}images/` },
        { source: 'build/fonts/', target: `${root}fonts/` },
      ]);
    });
  });

  done();
};

fractal.cli.command('fractal:dist', distribute);

const i18n = function (args, done) {
  // Local dependencies
  const glob = require('glob');
  const os = require('os');
  const yaml = require('yamljs');
  const fs = require('fs');
  const endOfLine = os.EOL;
  const fileYML = './patterns/**/*.config.yml';
  const fileJS = './public/translations.json';
  // const fileJSBody = `// This file is auto generated. DO NOT CHANGE!${endOfLine}// Translation can be managed in every *.config.yaml${endOfLine}// Just add a 'i18n' node, choose your ISO key like 'en-EN' and define i18n [key]:[value] pairs${endOfLine}// And don't forget to add they defined key to the element you like to translated using i18n="[key]"${endOfLine}exports.init = (() => {${endOfLine}  window.i18n.setAll('###BODY###');${endOfLine}});${endOfLine}`;
  let i18nBody = {};

  glob(path.join(__dirname, fileYML), {}, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      const configYAML = yaml.load(file);
      if (configYAML && typeof configYAML.i18n !== 'undefined') {
        // console.log(file);
        // console.log(configYAML.i18n);
        Object.keys(configYAML.i18n).forEach(function(iso) {
          if (typeof i18nBody[iso] === 'undefined') {
            i18nBody[iso] = {};
          }
          Object.keys(configYAML.i18n[iso]).forEach(function(key) {
            i18nBody[iso][key] = configYAML.i18n[iso][key];
          });
        });
      }
    });
    // console.log(i18nBody);
    // htmlBody = fileJSBody.replace(/###BODY###/g, JSON.stringify(i18nBody));
    htmlBody = JSON.stringify(i18nBody);
    // Write file to dest
    fs.writeFile(path.join(__dirname, fileJS), htmlBody, {encoding:'utf8', mode:0o666, flag:'w'}, (err) => {
      if (err) throw err;
      console.log(`Translation updated in '${fileJS}'`);
    });
  });
  done();
};

fractal.cli.command('fractal:i18n', i18n);
