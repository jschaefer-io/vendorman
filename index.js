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
	all: function(){
		let fileList = new Array(),
			list = this.raw();
		for(let pack in list){
			list[pack].files.forEach((file)=>{
				fileList.push(list[pack].path + file);
			})
			
		}
		return fileList;
	},
	package: function(pack){
		let list = this.raw(),
			fileList = new Array();
		if (list[pack]) {
			fileList = fileList.concat(list[pack].files);
		}
		return fileList;
	}
};