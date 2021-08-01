
// Self-executing function
( async () => {

  const express = require('express');
  const exphbs  = require('express-handlebars');
  const handlebars = require('handlebars');
  const path = require('path');

  const app = express();

  app.engine('hbs', exphbs({
    handlebars: handlebars,
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
      makeUpperCase: function(v){
        return new handlebars.SafeString(v.toUpperCase());
        // return v.toUpperCase();
      },
      makeLowerCase: function(v){
        return new handlebars.SafeString(v.toLowerCase());
        // return v.toLowerCase();
      },
      safe: function(v){
        // return `<h3> ${new handlebars.SafeString(v)} </h3>`;
        return new handlebars.SafeString(`<h3> ${v} </h3>`);
      },
      opt: function(options){
        return new handlebars.SafeString(`<p> ${options.fn({value: "jjj"})} </p>`);
      }
    }
  }));
  app.set('view engine', 'hbs');
  app.set('views', path.join(__dirname, 'views'));
  app.use(express.static(path.join(__dirname, 'static')));

  app.get('/', function (req, res) {
      res.render('home', {
        "name": "Home",
        "isUpperCase": false,
        "listData1D": ['alpha', 'beta', 'charlie'],
        "listData2D": [
          {'x': 'alpha'},
          {'y': 'beta'},
          {'z': 'charlie'}
        ]
      });
  });

  app.listen(3000);

  console.log(`Server is running at: http://localhost:3000`);

})();