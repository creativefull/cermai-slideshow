function Welcome(db) {
	var ModelItem = db.collection('item');

	this.index = function(req,res,next) {
		// ModelItem.find({published : 1})
		var data = [{
			image : "http://cdn.wonderfulengineering.com/wp-content/uploads/2014/01/Technology-Wallpaper.jpg",
			title : "LAN RJ45",
			desc : "Kabel Penghubung Internet"
		},{
			image : "http://cdn.wonderfulengineering.com/wp-content/uploads/2014/01/Technology-Wallpaper-10.jpg",
			title : "HD Desktop Technology Wallpaper",
			desc : "Iki ngonok e ngenek"
		},{
			image : "http://www.qdtricks.org/wp-content/uploads/2014/03/technology-wallpapers-hd1.jpg",
			title : "Just One Touch",
			desc : "1 command to distribute your application to client"
		}]
		res.render('index', { data : data });
	}
}
module.exports = Welcome;