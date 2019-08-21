import Phaser from "phaser";

export default function sumoGame() {
	let thiis;
	let cursors;
	let dot;
	let dot2;
	var config = {
		type: Phaser.AUTO,
		width: 1000,
		height: 1000,
		physics: {
			default: "arcade",
			arcade: {
				gravity: {},
				debug: false
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
		if (cursors.left.isDown) {
			//need to ask Viet about this
			dot2.body.acceleration.x += -20;
		}
		if (cursors.right.isDown) {
			//need to ask Viet about this
			dot2.body.acceleration.x += 20;
		}
		if (cursors.up.isDown) {
			//need to ask Viet about this
			dot2.body.acceleration.y += -20;
		}
		if (cursors.down.isDown) {
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
		cursors = this.input.keyboard.createCursorKeys();
		let background = this.add.image(
			config.width / 2,
			config.height / 2,
			"background"
		);
		let circle = this.physics.add.staticImage(
			config.width / 2,
			config.height / 2,
			"circle"
		);
		dot = this.physics.add.sprite(config.width / 2, config.height / 2, "dot");
		dot2 = this.physics.add.sprite(
			config.width / 1.2,
			config.height / 1.2,
			"dot2"
		);
		//console.log("dot added!");

		background.setDisplaySize(config.width, config.height);
		circle.setDisplaySize(config.width / 1.33, config.height / 1.33);
		dot.setDisplaySize(50, 50);
		dot.setBounce(0.2);
		dot.setCollideWorldBounds(true);
		dot.body.setCircle(25);

		dot2.setDisplaySize(50, 50);
		dot2.setBounce(0.2);
		dot2.setCollideWorldBounds(true);
		dot2.body.setCircle(25);
		this.physics.add.collider(dot, dot);
		// this.physics.add.overlap(dot, circle, null, null, this);
	}
	function update() {
		sumo1Movement();
		sumo2Movement();
	}
}
