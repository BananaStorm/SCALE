

var game = new Phaser.Game(1000,650,Phaser.CANVAS, 'gameDiv');

var backgroundImage;


var player;

var worldScale = 1;

var things;
var thing;

var blocs;
var bloc;

var enemy;
var enemies;

var door;

var platform;


var bullets;
var bullet;


var randomScale;

var lifebar;

var reduceButton;

var enemyFaceRight = true;

var gameScene = {
	
	width: 1000,
	height: 1000
}

/***********************************************************************************************

                                                                                                                                           
             88                                                    ad88888ba                                 88                            
             88                                                   d8"     "8b                ,d       ,d     ""                            
             88                                                   Y8,                        88       88                                   
8b,dPPYba,   88  ,adPPYYba,  8b       d8   ,adPPYba,  8b,dPPYba,  `Y8aaaaa,     ,adPPYba,  MM88MMM  MM88MMM  88  8b,dPPYba,    ,adPPYb,d8  
88P'    "8a  88  ""     `Y8  `8b     d8'  a8P_____88  88P'   "Y8    `"""""8b,  a8P_____88    88       88     88  88P'   `"8a  a8"    `Y88  
88       d8  88  ,adPPPPP88   `8b   d8'   8PP"""""""  88                  `8b  8PP"""""""    88       88     88  88       88  8b       88  
88b,   ,a8"  88  88,    ,88    `8b,d8'    "8b,   ,aa  88          Y8a     a8P  "8b,   ,aa    88,      88,    88  88       88  "8a,   ,d88  
88`YbbdP"'   88  `"8bbdP"Y8      Y88'      `"Ybbd8"'  88           "Y88888P"    `"Ybbd8"'    "Y888    "Y888  88  88       88   `"YbbdP"Y8  
88                               d8'                                                                                           aa,    ,88  
88                              d8'                                                                                             "Y8bbdP"   

***********************************************************************************************/

// Objet contenant les informations sur le joueur et les methodes qui lui sont liées
// playerSetting.move() déplace le personnage si le joueur presse les flèches directionelles
// playerSetting.grow() augmente la taille du personnage
// playerSetting.reduce() réduit la taille du personnage
// playerSetting.die() détruit le personnage

var playerSetting = {
	
	moveSpeed	: 350,
	scale		: 1,
	acceleration: 2000,

	// move player according to arrows keys
	move: function() {
		
		player.body.velocity.x = 0;
		player.body.velocity.y = 0;

		if (cursors.left.isDown)
		{
			player.body.velocity.x = -this.moveSpeed;

			if (player.scale.x > 0) {
				player.scale.x *= -1;
			};
		}

		if (cursors.right.isDown)
		{
			player.body.velocity.x = this.moveSpeed;

			if (player.scale.x < 0) {
				player.scale.x *= -1;
			};
		}

		if (cursors.up.isDown)
		{
			player.body.velocity.y = -this.moveSpeed;
		}

		if (cursors.down.isDown)
		{
			player.body.velocity.y = this.moveSpeed;
		}
	},

	// player scale up.
	grow: function(ratio) {
		
		this.scale+=ratio;
		
		player.scale.setTo(this.scale,this.scale);
	},

	// player scale down.
	reduce: function(ratio) {

		this.scale-=ratio;

		player.scale.setTo(this.scale,this.scale);	

	},

	// player scale down.
	die: function() {

		if (this.scale < 0.3) {
			player.kill();
		}
	}
}

/***********************************************************************************************

                                                                                                                                               
                                                                       ad88888ba                                 88                            
                                                                      d8"     "8b                ,d       ,d     ""                            
                                                                      Y8,                        88       88                                   
 ,adPPYba,  8b,dPPYba,    ,adPPYba,  88,dPYba,,adPYba,   8b       d8  `Y8aaaaa,     ,adPPYba,  MM88MMM  MM88MMM  88  8b,dPPYba,    ,adPPYb,d8  
a8P_____88  88P'   `"8a  a8P_____88  88P'   "88"    "8a  `8b     d8'    `"""""8b,  a8P_____88    88       88     88  88P'   `"8a  a8"    `Y88  
8PP"""""""  88       88  8PP"""""""  88      88      88   `8b   d8'           `8b  8PP"""""""    88       88     88  88       88  8b       88  
"8b,   ,aa  88       88  "8b,   ,aa  88      88      88    `8b,d8'    Y8a     a8P  "8b,   ,aa    88,      88,    88  88       88  "8a,   ,d88  
 `"Ybbd8"'  88       88   `"Ybbd8"'  88      88      88      Y88'      "Y88888P"    `"Ybbd8"'    "Y888    "Y888  88  88       88   `"YbbdP"Y8  
                                                             d8'                                                                   aa,    ,88  
                                                            d8'                                                                     "Y8bbdP"   

***********************************************************************************************/

// Objet contenant les informations sur les ennemis et les methodes qui leur sont liées
// playerSetting.move() déplace le personnage si le joueur presse les flèches directionelles
// playerSetting.grow() augmente la taille de l'ennemi
// playerSetting.reduce() réduit la taille de l'ennemi
// playerSetting.die() détruit l'ennemi

var enemySetting = {

	moveSpeed: 100,
	scale : 1,

	move2: function() {

		for (i=0; i<enemies.length; i++) {

			enemies.getAt(i).body.velocity.x = 0;
			enemies.getAt(i).body.velocity.y = 0;

			if (Phaser.Math.distance(player.x, player.y, enemies.getAt(i).x, enemies.getAt(i).y) < 400) {

				// If enemy bigger than player = enemy chases player.
				if (enemies.getAt(i).scale.y > player.scale.y) {
				
					if (enemies.getAt(i).body.position.x > player.body.position.x + 5)
					{
						enemies.getAt(i).body.velocity.x = -this.moveSpeed;
						
					}

					if (enemies.getAt(i).body.position.x < player.body.position.x - 5)
					{
						enemies.getAt(i).body.velocity.x = this.moveSpeed;

					}

					if (enemies.getAt(i).body.position.y > player.body.position.y + 5)
					{
						enemies.getAt(i).body.velocity.y = -this.moveSpeed;
					}

					if (enemies.getAt(i).body.position.y < player.body.position.y - 5)
					{
						enemies.getAt(i).body.velocity.y = this.moveSpeed;
					}

				}

				// If enemy smaller than player = enemy flees from player.
				if (enemies.getAt(i).scale.y < player.scale.y) {
				
					if (enemies.getAt(i).body.position.x > player.body.position.x + 5)
					{
						enemies.getAt(i).body.velocity.x = this.moveSpeed;
						
					}

					if (enemies.getAt(i).body.position.x < player.body.position.x - 5)
					{
						enemies.getAt(i).body.velocity.x = -this.moveSpeed;

					}

					if (enemies.getAt(i).body.position.y > player.body.position.y + 5)
					{
						enemies.getAt(i).body.velocity.y = this.moveSpeed;
					}

					if (enemies.getAt(i).body.position.y < player.body.position.y - 5)
					{
						enemies.getAt(i).body.velocity.y = -this.moveSpeed;
					}
				}
			}
		}
	},

	grow: function(ratiox, ratioy, which) {
		which.scale.x += ratiox;
		which.scale.y += ratioy;
	},

	reduce: function(ratiox, ratioy, which) {
		which.scale.x -= ratiox;
		which.scale.y -= ratioy;
	},

	flip: function() {
		
		for (i=0; i<enemies.length; i++) {

			if (enemies.getAt(i).body.position.x > player.body.position.x && enemies.getAt(i).width > 0) {
				
				enemies.getAt(i).width *= -1;
			}

			if (enemies.getAt(i).body.position.x < player.body.position.x && enemies.getAt(i).width < 0) {

				enemies.getAt(i).width *= -1;
			}
		}
	},

	die: function() {

		for (i=0; i<enemies.length; i++) {

			if (enemies.getAt(i).scale.y < 0.3) {
				enemies.getAt(i).kill();
			}
		}
	}
}

var shootingEnemySetting = {

	bulletTime: 0,
	fireRate: 600,
	bulletSpeed: 400,
	
	fire: function(x, y, source, angle) {

		bullet = bullets.getFirstExists(false);

		if (bullet) {
			bullet.checkWorldBounds = true;
			bullet.outOfBoundsKill = true;
			bullet.reset(source.x, source.y);
			bullet.body.velocity.y = y;
			bullet.body.velocity.x = x;
			this.bulletTime = game.time.now + this.fireRate;
			bullet.tracking = true;
			bullet.angle = angle;
		}
	}
}	

var laserEnemySetting = {

	bulletTime: 0,
	fireRate: 70,
	bulletSpeed: 100,
	
	fire: function(x, y, source, angle) {

		laser = lasers.getFirstExists(false);

		if (laser) {
			laser.checkWorldBounds = true;
			laser.outOfBoundsKill = true;
			laser.reset(source.x, source.y);
			laser.body.velocity.y = y;
			laser.body.velocity.x = x;
			this.bulletTime = game.time.now + this.fireRate;
			laser.tracking = true;
			laser.angle = angle;
			laser.animations.add('burst', [0, 1, 2, 3], 20, true);
			laser.animations.play("burst")
			laser.immovable=true;
		}
	}
}	


var mainState = {

/***********************************************************************************************
                                                                               
                                     88                                    88  
                                     88                                    88  
                                     88                                    88  
8b,dPPYba,   8b,dPPYba,   ,adPPYba,  88   ,adPPYba,   ,adPPYYba,   ,adPPYb,88  
88P'    "8a  88P'   "Y8  a8P_____88  88  a8"     "8a  ""     `Y8  a8"    `Y88  
88       d8  88          8PP"""""""  88  8b       d8  ,adPPPPP88  8b       88  
88b,   ,a8"  88          "8b,   ,aa  88  "8a,   ,a8"  88,    ,88  "8a,   ,d88  
88`YbbdP"'   88           `"Ybbd8"'  88   `"YbbdP"'   `"8bbdP"Y8   `"8bbdP"Y8  
88                                                                             
88                                                                             

***********************************************************************************************/
	
	preload:function(){
		
		game.load.image('backgroundImage', "img/background.png");
		game.load.image('bloc', "img/bloc.png");
		game.load.image('platform', "img/platform.png");
		
		game.load.spritesheet('player', "img/player.png", 32, 32);
		game.load.spritesheet('enemy', "img/enemy.png", 32, 32);
		
		game.load.spritesheet('thing', "img/thing.png", 16, 16);
		game.load.spritesheet('bullet', "img/bullet.png", 8, 16);
		game.load.spritesheet('laser', "img/laser.png", 16, 8);

	},

/***********************************************************************************************
                                                                    
                                                                    
                                                  ,d                
                                                  88                
 ,adPPYba,  8b,dPPYba,   ,adPPYba,  ,adPPYYba,  MM88MMM  ,adPPYba,  
a8"     ""  88P'   "Y8  a8P_____88  ""     `Y8    88    a8P_____88  
8b          88          8PP"""""""  ,adPPPPP88    88    8PP"""""""  
"8a,   ,aa  88          "8b,   ,aa  88,    ,88    88,   "8b,   ,aa  
 `"Ybbd8"'  88           `"Ybbd8"'  `"8bbdP"Y8    "Y888  `"Ybbd8"'  
                                                                    
                                                                    
***********************************************************************************************/

	create:function(){

		game.world.setBounds(0, 0, gameScene.width, gameScene.height);
		backgroundImage = game.add.tileSprite(0,0,gameScene.width,gameScene.height,'backgroundImage');

		
// DOOR 
// ********************************************************
		
		door = game.add.sprite(500, 430, 'bloc');
		door.enableBody = true;
		game.physics.enable(door,Phaser.Physics.ARCADE);	
		door.height = 110;
		door.width = 32;
		door.body.immovable = true;

// BLOCS
// ********************************************************
		
		blocs = game.add.group();

			// Add blocs group.
			createBloc(gameScene.width/2, 0, 32, 450);
			createBloc(gameScene.width/2, 540, 32, 450);

// PLATFORMS
// ********************************************************
		
		platform 					= game.add.sprite(350, 450, 'platform');
		platform.enableBody 		= true;
		game.physics.enable(platform,Phaser.Physics.ARCADE);	
		platform.scale.setTo(2, 2);


// THINGS
// ********************************************************

		things 					= game.add.group();
		things.enableBody 		= true;
		things.physicsBodyType 	= Phaser.Physics.ARCADE;
		things.createMultiple(32, 'thing');
			// Create things on timer.
			setInterval(function() {spawnThing(Math.random()*gameScene.width, Math.random()*gameScene.height)}, 1000);

// ENEMY
// ********************************************************

		enemies 				= game.add.group();
		enemies.enableBody 		= true;
		enemies.physicsBodyType = Phaser.Physics.ARCADE;
			
			// Create 4 enemies on random.
			for (i=0; i<4; i++) {

				randomScale = Math.random()*(2.5-0.5)+0.5;
				spawnEnemy(Math.random()*(1000-550)+550, Math.random()*gameScene.height, randomScale);
				
			};

			spawnEnemy(Math.random()*450, Math.random()*gameScene.height, 1.4);
// BULLETS 
// ********************************************************

		bullets = game.add.group();
		bullets.enableBody 		= true;
		bullets.physicsBodyType = Phaser.Physics.ARCADE;
		bullets.createMultiple(32, 'bullet');
		bullets.setAll('anchor.x', 0.5);
		bullets.setAll('anchor.y', 1);

// SHOOTING ENEMY
// ******************************************************** 

		shootingEnemy 					= game.add.sprite(-400, -400, 'enemy');
		shootingEnemy.enableBody 		= true;
		shootingEnemy.physicsBodyType 	= Phaser.Physics.ARCADE;
		shootingEnemy.animations.add('stand', [0, 1, 2, 3], 20, true);
		shootingEnemy.animations.play('stand');
		shootingEnemy.anchor.setTo(0.5, 0.5);


// LASER ENEMY
// ******************************************************** 

		laserEnemy 					= game.add.sprite(400, 400, 'enemy');
		laserEnemy.enableBody 		= true;
		laserEnemy.physicsBodyType 	= Phaser.Physics.ARCADE;
		laserEnemy.animations.add('stand', [0, 1, 2, 3], 20, true);
		laserEnemy.animations.play('stand');
		laserEnemy.anchor.setTo(0.5, 0.5);

// LASER
// ********************************************************

		lasers = game.add.group();
		lasers.enableBody	= true;
		lasers.physicsBodyType = Phaser.Physics.ARCADE;
		lasers.createMultiple(300, 'laser');
		lasers.setAll('anchor.x', 0.5);
		lasers.setAll('anchor.y', 1);
		lasers.x = laserEnemy.x;
		lasers.y = laserEnemy.y;
		lasers.pivot = laserEnemy;

// PLAYER
// ********************************************************

		player = game.add.sprite(200, 200, 'player');
		game.physics.enable(player,Phaser.Physics.ARCADE);	
		player.enableBody = true;
		player.anchor.setTo(0.5, 0.5);
		player.body.collideWorldBounds=true;
		player.animations.add('stand', [0, 1, 2, 3, 4], 10, true);
		player.animations.play('stand');
		player.smoothed = false;
		
			

// LIFE BAR
// ********************************************************

	// 	lifebar = game.add.sprite(100, 100, 'player');
			
	// 		lifebar.fixedToCamera = true;
	// 		lifebar.cameraOffset.setTo(25, 25);
	// 		lifebar.scale.setTo(2, 0.5);

		cursors = game.input.keyboard.createCursorKeys();

		reduceButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


		game.camera.follow(player);
	},

/***********************************************************************************************
                                                                       
                                   88                                  
                                   88                ,d                
                                   88                88                
88       88  8b,dPPYba,    ,adPPYb,88  ,adPPYYba,  MM88MMM  ,adPPYba,  
88       88  88P'    "8a  a8"    `Y88  ""     `Y8    88    a8P_____88  
88       88  88       d8  8b       88  ,adPPPPP88    88    8PP"""""""  
"8a,   ,a88  88b,   ,a8"  "8a,   ,d88  88,    ,88    88,   "8b,   ,aa  
 `"YbbdP'Y8  88`YbbdP"'    `"8bbdP"Y8  `"8bbdP"Y8    "Y888  `"Ybbd8"'  
             88                                                        
             88                                                                       
                                                                    
***********************************************************************************************/

	update:function(){

		game.physics.arcade.collide(player, blocs);
		game.physics.arcade.overlap(player, platform, openDoor, null, this);
		game.physics.arcade.collide(player, door);
		game.physics.arcade.collide(player, things, bonus, null, this);
		game.physics.arcade.collide(player, enemies, transferScale, null, this);

		game.physics.arcade.collide(enemies);
		game.physics.arcade.collide(enemies, door);
		game.physics.arcade.collide(blocs, enemies);

		game.physics.arcade.overlap(bullets, player, laserHit, null, this);
		game.physics.arcade.overlap(lasers, player, laserHit, null, this);

		// PLAYER BEHAVIOR

		playerSetting.move();
		playerSetting.die();

		if (reduceButton.isDown && playerSetting.scale>0.4) {
			
			playerSetting.reduce(0.02);
		}

		// ENEMY BEHAVIOR


		enemySetting.move2();

		
		enemySetting.flip();
		enemySetting.die();
		
		// SHOOTING ENEMY BEHAVIOR

		// if (game.time.now > shootingEnemySetting.bulletTime) {
				
		//     shootingEnemySetting.fire(400, 0, shootingEnemy, 90);
		//     shootingEnemySetting.fire(300, 300, shootingEnemy, 135);
		//     shootingEnemySetting.fire(0, 400, shootingEnemy, 180);
		//     shootingEnemySetting.fire(-300, 300, shootingEnemy, 225);
		//     shootingEnemySetting.fire(-400, 0, shootingEnemy, 270);
		//     shootingEnemySetting.fire(-300, -300, shootingEnemy, 315);
		//     shootingEnemySetting.fire(0, -400, shootingEnemy, 0);
		//     shootingEnemySetting.fire(300, -300, shootingEnemy, 45);

		// }

		// LASER ENEMY BEHAVIOR

		lasers.angle+=1;

		if (game.time.now > laserEnemySetting.bulletTime) {
				
		    laserEnemySetting.fire(100, 0, laserEnemy, 90);
		    laserEnemySetting.fire(0, 100, laserEnemy, 180);
		    laserEnemySetting.fire(-100, 0, laserEnemy, 270);
		    laserEnemySetting.fire(0, -100, laserEnemy, 0);

		}
	}
}

/***********************************************************************************************

                                                                                                 
   ad88                                                 88                                       
  d8"                                            ,d     ""                                       
  88                                             88                                              
MM88MMM  88       88  8b,dPPYba,    ,adPPYba,  MM88MMM  88   ,adPPYba,   8b,dPPYba,   ,adPPYba,  
  88     88       88  88P'   `"8a  a8"     ""    88     88  a8"     "8a  88P'   `"8a  I8[    ""  
  88     88       88  88       88  8b            88     88  8b       d8  88       88   `"Y8ba,   
  88     "8a,   ,a88  88       88  "8a,   ,aa    88,    88  "8a,   ,a8"  88       88  aa    ]8I  
  88      `"YbbdP'Y8  88       88   `"Ybbd8"'    "Y888  88   `"YbbdP"'   88       88  `"YbbdP"'  
                                                                                                 
                                                                                                 
***********************************************************************************************/

function bonus(player, thing) {
	playerSetting.grow(0.1);
	thing.kill();
}

function createBloc(x, y, width, height) {

	bloc = blocs.create(x, y, 'bloc');
	game.physics.enable(bloc,Phaser.Physics.ARCADE);
	bloc.enableBody = true;
	bloc.body.immovable = true;
	bloc.width = width;
	bloc.height = height;

}

function spawnEnemy(x, y, scale) {
	
	enemy = enemies.create(x, y, 'enemy');
	enemy.anchor.setTo(0.5, 0.5);
	enemy.name = 'enemy'+enemies.length;
	enemy.animations.add('stand', [0, 1, 2, 3], 10, true);
	enemy.animations.add('bite', [4, 5, 6, 7, 8, 9], 10, true);
	enemy.animations.play('stand');
	enemy.scale.setTo(scale, scale);
	enemy.smoothed = false;
	enemy.body.collideWorldBounds=true;
}

function spawnThing(x, y) {
	
	thing = things.getFirstExists(false)

	if (thing) {

		thing.body.immovable 	= true;
		thing.animations.add('normal', [0,1,2,3], 15, true)
		thing.animations.play('normal');
		thing.smoothed = false;
		thing.checkWorldBounds = true;
		thing.outOfBoundsKill = true;
		thing.reset(x, y);

	}
}

// function spawnUrchin(x, y, scale) {

// }

function laserHit (lasers, player) {
	playerSetting.reduce(0.02);
}

function laserKill (lasers, blocs) {
	laser.kill();
}

function bulletHit (lasers, player) {
	playerSetting.reduce(0.1);
	bullet.kill();
}

function openDoor (player, platform) {
	if (player.scale.y >= platform.scale.y) {
		door.position.y--;
	}
}

function transferScale(player, enemy) {
	
	var enemyReduce = 0.05;
	var playerGrow = enemyReduce/2;
	var playerReduce = 0.05;
	var enemyGrow = enemyReduce/2;
	
	for (i = 1; i <= enemies.length; i++) {
		
		if ( enemy.name == "enemy" + i) {

			if (enemy.scale.x > 0) {
				
				if (player.scale.y > enemy.scale.y) {

					playerSetting.grow(playerGrow);
					enemySetting.reduce(enemyReduce, enemyReduce, enemy);
				
				}

				if (player.scale.y < enemy.scale.y) {
					
					enemySetting.grow(enemyGrow, enemyGrow, enemy);
					playerSetting.reduce(playerReduce);
					enemy.animations.play('bite');
				}
			}
			
			if (enemy.scale.x < 0) {
				
				if ( player.scale.y > enemy.scale.y) {
					playerSetting.grow(playerGrow);
					enemySetting.reduce(-enemyReduce, enemyReduce, enemy);
				}

				if ( player.scale.y < enemy.scale.y) {
					enemySetting.grow(-enemyGrow, enemyGrow, enemy);
					playerSetting.reduce(playerReduce);
					enemy.animations.play('bite');
				}
			}		
		}
	}
		
	console.log(enemy.name);
	
}

game.state.add('mainState', mainState);

game.state.start('mainState');