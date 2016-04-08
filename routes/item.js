function ItemHandler(db) {
	var multiparty = require('multiparty');
	var path = require('path');
	var ModelItem = db.collection('item');
	var shortid = require('shortid');

	this.index = function(req,res,next) {
		ModelItem.find({published : "1"}).toArray(function(err, hasil) {
			res.render('server/items/item', {
				gambars : hasil
			});
		})
	}

	this.simpan = function(req,res,next) {
		var fs = require('fs');
		var form = 	new multiparty.Form();
		form.parse(req, function (err , field , files){
			var caption = field.caption[0];
			var desc = field.description[0];
			var p = field.published[0];
			// var id_user = req.user.toJSON().id;
			var img = '';
			var tempat_file = path.normalize(__dirname+'/..');
			var id = shortid.generate();

			if (files.gambar != undefined) {
				img = files.gambar[0];
			}
			fs.readFile(img.path, function (err,data_gambar){
				if (err)  return res.json({gambar : '', hasil : 0});
				fs.writeFile(tempat_file+'/public/img/'+id+"_"+img.originalFilename, data_gambar, function (err){
					var data = {
						caption:caption,
						desc:desc,
						published:p,
						gambar:'/img/' + id + "_" + img.originalFilename,
						created_at : new Date()
					}
					ModelItem.insert(data, function(err, result)
					{
						if (err) {
							return res.json("Gagal Simpan Data");
						}
						else
						{
							return res.json('success');
						}
					});
				});
			});
		});
	}
}
module.exports = ItemHandler;