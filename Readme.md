# express-errors

Express middleware for displaying Rails-inspired error pages for development environments
with error name, message, stack trace and extracted code around source of error.

**Note**: It does not swallow errors, they still get the same usual output in the console.

**Tip**: Looking for [koa version](https://github.com/vdemedes/koa-errors)?


### Installation

```
$ npm install express-errs --save
```

**Question**: Why is the name so weird? Because express is so popular, it was impossible to find a normal name for this package.



### Usage

```javascript
var express = require('express');
var errors = require('express-errs');

var app = express();

app.get('/', function (req, res) {
  throw new Error('Oh no!');
  
  res.end('Oh yes!');
});

app.use(errors());

app.listen(3000);

```

![](http://cl.ly/image/2P2h2o0a1l0X/direct)


### License

express-errors is released under the MIT license.
