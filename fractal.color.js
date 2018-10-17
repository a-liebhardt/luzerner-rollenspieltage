// Custom func to build color page and configs based on yml automatically
exports.update = (args, done) => {
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
  const loopObject = (items, html, level, colorId) => {
    Object.keys(items).forEach((section) => {
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
