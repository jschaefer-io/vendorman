const jsonfile = require('jsonfile');
const cwd = process.cwd();


module.exports = {
	raw: function(){
		try{
			return jsonfile.readFileSync('vendorman.json');
		}
		catch(e){
			return new Object();
		}
	},
	all: function(ext='.+'){
		let fileList = new Array(),
			exp = new RegExp('\.'+ext+'$'),
			list = this.raw();
		for(let pack in list){
			fileList = fileList.concat(this.package(pack, ext));
		}
		return fileList;
	},
	package: function(pack, ext='.+'){
		let list = this.raw(),
			exp = new RegExp('\.'+ext+'$'),
			fileList = new Array();
		if (list[pack]) {
			list[pack].files.forEach((file)=>{
				if (file.match(exp)) {
					fileList.push(list[pack].path + file);
				}
			})
		}
		return fileList;
	}
};