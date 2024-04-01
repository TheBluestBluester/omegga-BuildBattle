const fs = require('fs');
const { brs } = OMEGGA_UTIL;
let brsFile = fs.readFileSync(__dirname + "/Misc/BuildBattleArena.brs");
const arenaBRS = brs.read(brsFile);

let interval;

let arenaScale = 32;
let arenaVOffset = 1;

let gameState = "WaitingForPlayers";
let timer = 0;
let index = 0;

let arenaPosArray = {};
let builds = {};

module.exports = class Plugin {
	constructor(omegga, config, store) {
		this.omegga = omegga;
		this.config = config;
		this.store = store;
	}
	
	async gameTick() {
		
		switch(gameState) {
			
			case "waitingForPlayers":
				
				timer++;
				break;
			
		}
		
	}
	
	async initArenas() {
		
		function randomMinMax(min, max) {
			return Math.floor(Math.random() * (max - min)) - min;
		}
		
		this.omegga.clearAllBricks();
		
		const players = this.omegga.players;
		for(let p in players) {
			
			const player = players[p];
			
			const randX = randomMinMax(-20000, 20000) * 10;
			const randY = randomMinMax(-20000, 20000) * 10;
			this.omegga.loadSaveData(arenaBRS, {quiet: true, offX: randX, offY: randY});
			this.omegga.writeln("Chat.Command /TP \"" + player.name + "\" " + randX + " " + randY + " 0 0");
			arenaPosArray[player.name] = {pos: [randX, randY, arenaVOffset + arenaScale]};
			
		}
		
	}
	
	async init() {
		// Write your plugin!
		this.omegga.on('cmd:test', (speaker) => {
			this.initArenas();
		});
		
		interval = setInterval(() => this.gameTick(), 1000);
		
		return { registeredCommands: ['test'] };
	}
	
	async stop() {
		
		clearInterval(interval);
		
	}
}
