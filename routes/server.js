function ServerHandler(db) {
	var ModelMenu = db.collection('menus');
	function menu(req, cb) {
		var dataMenu = [];
		ModelMenu.find().sort({order_point : 1, menu_title : 1}).toArray(function(err, docs) {
			docs.forEach(function(doc) {
				var s = req.array.searchObject(doc._id, docs, 'menu_parent_id');
				doc.child = [];
				if (s != undefined) {
					doc.child.push(s);
				}
				if (doc.menu_parent_id == null) {
					dataMenu.push(doc);
				}
			})
			return cb(null, dataMenu);
		})
	}
	this.index = function(req,res,next) {
		menu(req, function(err, dataMenu) {
			var element = "";
			var child = function(doc, index) {
				var classnya = "";
				var classIcon = "fa-caret-right";
				if(doc instanceof Array == true) {
					doc.forEach(function(value, i) {
						child(value, i+1)
					})
				}
				else {
					if (doc.icon != "")
						classIcon = doc.icon;
					if (index == 0) {
						classnya = "active";
					}
					if (doc.child.length == 0) {
						if (doc.menu_parent_id != null)
							classIcon = "fa-caret-right";
						element += "<li class=" + classnya + "><a href=" + doc.menu_uri + "><i class=\"menu-icon fa " + classIcon + "\"></i><span class=\"menu-text\">" + doc.menu_title.toUpperCase() + "</span></a><b class=\"arrow\"></b></li>";
					}
					else {
						element += "<li><a href=" + doc.menu_uri + " class=\"dropdown-toggle\"><i class=\"menu-icon fa " + classIcon + "\"></i><span class=\"menu-text\">" + doc.menu_title.toUpperCase() + "</span><b class=\"arrow fa fa-angle-down\"></b></a><b class=\"arrow\"></b>";
						element += "<ul class=\"submenu\">";
						child(doc.child);
						element += "</ul></li>";
					}
				}
			}
			dataMenu.forEach(function(doc, index) {
				child(doc, index);
			})
			res.render('server/index', {
				menu : element
			});
		})
	}

	this.home = function(req,res,next) {
		res.render('server/home');
	}
}
module.exports = ServerHandler;