const fs = require('fs');
const { brs } = OMEGGA_UTIL;
let brsFile = fs.readFileSync(__dirname + "/Misc/BuildBattleArena.brs");
const arenaBRS = brs.read(brsFile);

let arenaScale = 32;

module.exports = class Plugin {
	constructor(omegga, config, store) {
		this.omegga = omegga;
		this.config = config;
		this.store = store;
	}
	
	async initArenas() {
		
		function randomMinMax(min, max) {
			return Math.floor(Math.random() * (max - min)) - min;
		}
		
		this.omegga.clearAllBricks();
		
		const players = this.omegga.players;
		for(let p in players) {
			
			const player = players[p];
			
			const randX = randomMinMax(-120000, 120000) * 10;
			const randY = randomMinMax(-120000, 120000) * 10;
			this.omegga.loadSaveData(arenaBRS, {quiet: true, offX: randX, offY: randY});
			this.omegga.writeln("tp " + player.name + " " + randX + " " + randY + " 0 0");
			
		}
		
	}
	
	async init() {
		// Write your plugin!
		this.omegga.on('cmd:test', (speaker) => {
			this.initArenas();
		});
		
		return { registeredCommands: ['test'] };
	}
	
	async stop() {
		// Anything that needs to be cleaned up...
	}
}
