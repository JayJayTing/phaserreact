import Phaser from "phaser";

export default function sumoGame() {
	let thiis;
	let cursors;
	let w, a, s, d;

	let circle
	let dot;
	let dot2;
	var config = {
		type: Phaser.AUTO,
		width: 600,
		height: 600,
		physics: {
			default: "arcade",
			arcade: {

				gravity: {},
				debug: true
			}
		},
		scene: {
			preload,
			create,
			update
		}
	};
	//myimage = game.add.sprite(0,game.world.height-250, 'ca﻿t');myimage.scale.set﻿To(0.5,0.5);
	let game = new Phaser.Game(config);
	function sumo1Movement() {
		if (cursors.left.isDown) {
			//need to ask Viet about this
			dot.body.acceleration.x += -20;
		}
		if (cursors.right.isDown) {
			//need to ask Viet about this
			dot.body.acceleration.x += 20;
		}
		if (cursors.up.isDown) {
			//need to ask Viet about this
			dot.body.acceleration.y += -20;
		}
		if (cursors.down.isDown) {
			//need to ask Viet about this
			dot.body.acceleration.y += 20;
		}
	}

	function sumo2Movement() {
		//get rid of this later
		if(Phaser.Input.Keyboard.KeyCodes.W.isDown){
			console.log("testing works")
		}
		if (a.isDown) {
			//need to ask Viet about this
			dot2.body.acceleration.x += -20;
		}
		if (d.isDown) {
			//need to ask Viet about this
			dot2.body.acceleration.x += 20;
		}
		if (w.isDown) {
			//need to ask Viet about this
			dot2.body.acceleration.y += -20;
		}
		if (s.isDown) {
			//need to ask Viet about this
			dot2.body.acceleration.y += 20;
		}
	}
	function preload() {
		thiis = this;
		
		this.load.image("background", "assets/sumo/background.png");
		this.load.image("circle", "assets/sumo/circle.png");
		this.load.image("dot", "assets/sumo/dot.png");
		this.load.image("dot2", "assets/sumo/dot.png");
	}
	function create() {
		
		w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
		d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		cursors = this.input.keyboard.createCursorKeys();

		//console.log(cursors);
		let background = this.add.image(
			config.width / 2,
			config.height / 2,
			"background"
		);
		circle = this.physics.add.image(
			config.width / 2,
			config.height / 2,
			"circle"
		);
		dot = this.physics.add.sprite(config.width / 2.4, config.height / 2, "dot");
		dot2 = this.physics.add.sprite(
			config.width / 1.7,
			config.height / 2,
			"dot2"
		);
		//console.log("dot added!");

		background.setDisplaySize(config.width, config.height);
		circle.setDisplaySize(config.width / 1.33, config.height / 1.33);
		circle.body.setCircle(1000)
		dot.setBounce(0.2);
		dot.setDisplaySize(50, 50);
		dot.body.setCircle(208);
		
		dot.setCollideWorldBounds(true);
		
		dot2.setBounce(0.2);
		dot2.setDisplaySize(50, 50);
		dot2.setCollideWorldBounds(true);
		dot2.body.setCircle(208);
		this.physics.add.collider(dot, dot2);
		
		
		
		 this.physics.add.overlap(dot, circle, ()=>{console.log("touching")});
	}
	function update() {
		sumo1Movement();
		sumo2Movement();
		outOfBounds();
		console.log("doing something")
		
		
	}

	function outOfBounds(){
		if(!thiis.physics.world.overlap(dot, circle)){
			dot.visible = false;
			
		}
		if(!thiis.physics.world.overlap(dot2, circle)){
			dot2.visible = false;
			
		}

	}
	
}
