
var fs = require('fs');
var cp = require('child_process');


var i = 2;

while (i < process.argv.length) {
	if (process.argv[i] === "--module") {
	} else if (process.argv[i] === "--") {
	} else {
		console.log("Not a recognized command");
	}
	switch (process.argv[i]) {
		case "--module":
			break;
		case "--":
			break;
	}
}

// switch script to come after --module declarations
var script = process.argv[2] || null;

if (!script || !fs.existsSync(script)) {
	console.log("You must specify a script to run.");
	process.exit(0);
}

for (var i = 3; i < process.argv.length; i++) {
	console.log(process.argv[i]);
}

// add option for cmd line opts
var child = cp.fork(script,[],{});


child.on('close', function (code) {
	console.log('child process ended with code: ' + code);
	twilio.sms.messages.create({
		body: "Process has ended.",
		from: "+1",
		to: "+19196195878"
	}, function (err, message) {
		if (err) {
			console.log(err);
		} else {
			console.log(message.sid);
		}
		process.exit(0);
	});
});

