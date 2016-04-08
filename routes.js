module.exports = exports = function(cermai, db) {
	var WelcomeHandler = require('./routes/welcome'), Welcome = new WelcomeHandler(db);
	var ServerHandler = require('./routes/server'), Server = new ServerHandler(db);
	var ItemHandler = require('./routes/item'), Item = new ItemHandler(db);
	var io = require('socket.io')(7080);

	io.on('connection', function(socket) {
		socket.on("refresh", function(data) {
			io.emit("refreshPage", { refresh : true});
		});

		socket.on("idle", function(data) {
			console.log(data);
		})
	})

	cermai.get('/', Welcome.index);
	cermai.get('/main', Server.index);
	cermai.get('/dashboard', Server.home);
	cermai.get('/items', Item.index);
	cermai.post('/items/save', Item.simpan);
	cermai.post('/items/save/edit', Item.simpanEdit);
	cermai.post('/items/hapus', Item.delete);
}