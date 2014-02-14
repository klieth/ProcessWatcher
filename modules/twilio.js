
var fs = require('fs');

module.exports = function(argv) {
	if (!argv[1] || !argv[2]) {
		console.log("Must specify a config file and a notification number");
		return null;
	}
	var ret = {
		onClose: function () {
			console.log('Nothing here, yet');
		}
	};
	fs.readFile(argv[1], function (err, data) {
		if (err) {
			console.dir(err);
			return;
		}
		var config = JSON.parse(data);
		var twilio = require('twilio')(config.sid,config.auth);
		ret.onClose = function () {
			twilio.sms.messages.create({
				body: "Process has ended.",
				from: "+1" + config.number,
				to: "+1" + argv[2]
			}, function (err, msg) {
				if (err) {
					console.log(err);
				} else {
					console.log(msg.sid);
				}
			});
		};
	});
	return ret;
};

