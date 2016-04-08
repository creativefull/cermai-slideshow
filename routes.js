module.exports = exports = function(cermai, db) {
	var WelcomeHandler = require('./routes/welcome'), Welcome = new WelcomeHandler(db);
	var ServerHandler = require('./routes/server'), Server = new ServerHandler(db);

	cermai.get('/', Welcome.index);
	cermai.get('/main', Server.index);
}