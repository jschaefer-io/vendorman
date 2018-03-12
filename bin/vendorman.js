#!/usr/bin/env node

const path = require('path');
const program = require('commander');
const colors = require('colors');
const package = require(process.cwd() + path.sep + 'package.json');
const execa = require('execa');
const jsonfile = require('jsonfile');

program
  .version(package.version);

program
	.command('add <packages...>')
	.option('-s --save', 'Save the packages as a non-dev dependency')
	.description('Installs the given packages from npm as a dev dependency')
	.action((packages, options)=>{

	program
	.command('add <packages...>')
	.option('-s --save', 'Save the packages as a non-dev dependency')
	.description('Installs the given packages from npm as a dev dependency')
	.action((packages, options)=>{
	});
		if (!options.save) {
			options.save = false;
		}

		let list = new Object();

		try{
			list = jsonfile.readFileSync('vendorman.json');
		}
		catch(e){
			console.log(colors.yellow('vendorman.json not found.'));
		}

		console.log('Try to install vendor packages: '  + packages.join(', '));
		packages.forEach((pack)=>{
			let files = new Array();
			if (list[pack]) {
				if (options.save === list[pack].save) {
					console.log(colors.red(pack + ' already installed.'));
					return;
				}
				console.log(colors.yellow(pack + ' already installed. It will be moved to ' + (options.save?'--save':'--save-dev')));
				files = list[pack].files;
			}
			try{
				let res = execa.sync('npm', ['install', pack , ((options.save)?'--save-prod':'--save-dev')]);
				console.log(colors.green(pack + ' installed successfully!'));

				let packagePath = 'node_modules/' + pack;
					json = jsonfile.readFileSync(packagePath + '/package.json');
				
				list[pack] = {
					name: pack,
					path: packagePath + '/',
					files: Array.from(new Set(files.concat([json.main]))),
					save: (options.save)?true:false
				};
			}
			catch(e){
				console.log(colors.red(pack + ' could not be installed!'));
			}			
		});

		try{			
			jsonfile.writeFileSync('vendorman.json', list, {spaces: 2});
			console.log("\n" + 'vendorman.json updated');
		}
		catch(e){
			console.log(colors.red('Error writing vendorman.json'));
		}	
	});

program
	.command('remove <packages...>')
	.description('Removes the given packages from node_modules and vendorman.json')
	.action((packages)=>{
		let list = new Object();

		try{
			list = jsonfile.readFileSync('vendorman.json');
		}
		catch(e){
			console.log(colors.red('vendorman.json not found.'));
			return;
		}
		console.log('Try to remove vendor packages: '  + packages.join(', '));
		packages.forEach((pack)=>{
			if (!list[pack]) {
				console.log(colors.red(pack + ' is not installed and can therefore not be removed.'));
				return;
			}
			try{
				let res = execa.sync('npm', ['remove', pack]);
				delete list[pack];
				console.log(colors.green(pack + ' removed successfully!'));
			}
			catch(e){
				console.log(colors.red(pack + ' could not be removed!'));
			}
		});

		try{			
			jsonfile.writeFileSync('vendorman.json', list, {spaces: 2});
			console.log("\n" + 'vendorman.json updated');
		}
		catch(e){
			console.log(colors.red('Error writing vendorman.json'));
		}
	});


program
	.command('list')
	.description('lists all installed vendor packages')
	.action(()=>{
		try{
			let list = jsonfile.readFileSync('vendorman.json');
			for(let pack in list){
				console.log(pack + ' ' + colors.yellow((list[pack].save)?'--save':'--save-dev'));
			}
		}
		catch(e){
			console.log(colors.red('vendorman.json not found.'));
			return;
		}
	});

program.parse(process.argv);

/**
 * No Parameter given -> render help
 */
if (!process.argv.slice(2).length) {
	program.help();
}