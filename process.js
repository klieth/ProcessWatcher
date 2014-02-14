
var fs = require('fs');
var cp = require('child_process');

var modules = [];
var script = null;
var scriptOpts = [];

var i = 2;

while (i < process.argv.length) {
	if (process.argv[i] === "--module") {
		i++;
		var args = [];
		while (process.argv[i] !== "--module" && process.argv[i] !== "--") {
			args.push(process.argv[i++]);
		}
		modules.push(require("./modules/" + args[0] + ".js")(args));
	} else if (process.argv[i] === "--") {
		i++;
		script = process.argv[i];
		while (i < process.argv.length) {
			scriptOpts.push(process.argv[i++]);
		}
		break;
	} else {
		console.log("Not a recognized command");
		process.exit(0);
	}
}

if (!script || !fs.existsSync(script)) {
	console.log("You must specify a script to run.");
	process.exit(0);
}

var child = cp.fork(script,scriptOpts.slice(1),{});


child.on('close', function (code) {
	console.log('child process ended with code: ' + code);
	for (var i = 0; i < modules.length; i++) {
		modules[i].onClose();
	}
});

