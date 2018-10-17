// Custom func to build i18n translation json based on given yml translation
exports.build = (args, done) => {
  // Local dependencies
  const path = require('path');
  const glob = require('glob');
  const os = require('os');
  const yaml = require('yamljs');
  const fs = require('fs-extra');
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

    htmlBody = JSON.stringify(i18nBody);
    // Write file to dest
    fs.writeFile(path.join(__dirname, fileJS), htmlBody, {encoding:'utf8', mode:0o666, flag:'w'}, (err) => {
      if (err) throw err;
      console.log(`Translation updated in '${fileJS}'`);
    });
  });
  done();
};
