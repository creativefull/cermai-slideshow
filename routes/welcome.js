function Welcome(db) {
	var ModelItem = db.collection('item');

	this.index = function(req,res,next) {
		var data = [];
		ModelItem.find({published : "1"}).toArray(function(err, docs) {
			if (err) console.error(err);
			docs.forEach(function(doc) {
				data.push({
					image : doc.gambar,
					title : doc.caption,
					desc : doc.desc
				});
			})
			res.render('index', { data : data });
		})
	}
}
module.exports = Welcome;