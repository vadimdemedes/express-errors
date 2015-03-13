/**
 * Dependencies
 */

var ejs = require('ejs');
var fs = require('fs');


/**
 * Expose errors middleware
 */

module.exports = function () { return errors; };


/**
 * Compile template
 */

var template;

template = fs.readFileSync(__dirname + '/templates/error.html.ejs', 'utf-8');
template = ejs.compile(template);

/**
 * Errors middleware
 */

function errors (err, req, res, next) {
  console.error(err.stack);
  
  // parse first line in stacktrace
	var line = err.stack.split('\n')[1];

	// parse file path and line
	var result = /at\s(.+\s)?\(?(.+)\:([0-9]+)\:[0-9]+/.exec(line);
	var path = result[2];
	var row = +result[3];

	// read file and create an excerpt
	// around line where error occured
	fs.readFile(path, 'utf-8', function (error, file) {
	  if (error) throw error;
	  
	  file = file.split('\n');

  	var start = row - 6 < 0 ? 0 : row - 6;
  	var end = row + 6;

  	var excerpt = file.slice(start, end);

    var body = template({
      name: err.name,
  		message: err.message,
  		line: row,
  		excerpt: excerpt,
  		excerpt_start: start + 1,
  		stack: err.stack
    });

    res.status(500);
    res.end(body);
    
    next();
	});
}
