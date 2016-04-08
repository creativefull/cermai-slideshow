module.exports = exports = function(cermai, db) {
	var WelcomeHandler = require('./routes/welcome'), Welcome = new WelcomeHandler(db);
	var ServerHandler = require('./routes/server'), Server = new ServerHandler(db);
	var ItemHandler = require('./routes/item'), Item = new ItemHandler(db);

	cermai.get('/', Welcome.index);
	cermai.get('/main', Server.index);
	cermai.get('/items', Item.index);
	cermai.post('/items/save', Item.simpan);
}