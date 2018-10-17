// Custom func to build docker with static www and all published html pages
exports.build = new function() {
  let app = null;

  this.init = (fractal) => {
    app = fractal;
  };

  this.create = (args, done) => {
    const fs = require('fs-extra')
    const path = require('path');
    const root = 'docker/';
    const dockerWWW = `${root}src/`;
    const statuses = ['published'];
    const secrets = require(path.join(__dirname, 'secrets.json'));

    const clonePages = (pageBody) => {
      let files = 0;
      for (let item of app.components.flatten()) {
        if (item.viewPath.match(/(\/|\\)([0-9]*-)?pages(\/|\\)/g)) {
          if (statuses.indexOf(item.status.label.toLowerCase()) >= 0) {
            item.render().then((contentBody) => {
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

    fs.copy('public', dockerWWW, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Dist ready on '${root}'`);
        buildWebPage();
      }
    });

    done();
  };

  this.remove = (args, done) => {
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

  return this;
};
