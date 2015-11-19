
var game = new Phaser.Game(1000,650,Phaser.WEBGL, 'gameDiv');

Phaser.Sprite.prototype.enableBody = true;


Phaser.Sprite.prototype.grow = function(ratio) {

	if (this.scale.x > 0) {
		this.scale.set(this.scale.x + ratio, this.scale.y + ratio);
	}

	if (this.scale.x < 0) {
		this.scale.set(this.scale.x - ratio, this.scale.y + ratio);
	}
}

Phaser.Sprite.prototype.reduce = function(ratio) {

	if (this.scale.x > 0) {
		this.scale.set(this.scale.x - ratio, this.scale.y - ratio);
	}

	if (this.scale.x < 0) {
		this.scale.set(this.scale.x + ratio, this.scale.y - ratio);
	}
}

Phaser.Group.prototype.grow = function(ratio) {

	if (this.scale.x > 0) {
		this.scale.set(this.scale.x + ratio, this.scale.y + ratio);
	}

	if (this.scale.x < 0) {
		this.scale.set(this.scale.x - ratio, this.scale.y + ratio);
	}
} 

Phaser.Group.prototype.reduce = function(ratio) {

	if (this.scale.x > 0) {
		this.scale.set(this.scale.x - ratio, this.scale.y - ratio);
	}

	if (this.scale.x < 0) {
		this.scale.set(this.scale.x + ratio, this.scale.y - ratio);
	}
} 

var bulletPool;

/***********************************************************************************************

                                                                  
88888888ba   88                                                   
88      "8b  88                                                   
88      ,8P  88                                                   
88aaaaaa8P'  88  ,adPPYYba,  8b       d8   ,adPPYba,  8b,dPPYba,  
88""""""'    88  ""     `Y8  `8b     d8'  a8P_____88  88P'   "Y8  
88           88  ,adPPPPP88   `8b   d8'   8PP"""""""  88          
88           88  88,    ,88    `8b,d8'    "8b,   ,aa  88          
88           88  `"8bbdP"Y8      Y88'      `"Ybbd8"'  88          
                                 d8'                              
                                d8'                               

***********************************************************************************************/

var Player = function (game, posx, posy, scale) {

	Phaser.Sprite.call(this, game, 0, 0, 'player');

		this.moveSpeed = 400;
		
		this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
		this.anchor.set(0.5);
		game.physics.enable(this, Phaser.Physics.ARCADE);
		this.enableBody = true;
		this.body.collideWorldBounds = true;

		this.animations.add('anim', [0,1]);
		this.animations.play('anim', 20, true);

		this.x = posx;
		this.y = posy;
		this.scale.set(scale,scale);
		face = this.addChild(new Phaser.Sprite(game, 0, 0, 'playerface2'));
		face.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
		face.anchor.set(0.5);
		face.blendMode = PIXI.blendModes.MULTIPLY
		face.scale.set(1.6)
		
}

Player.prototype = Object.create(Phaser.Sprite.prototype);

// PLAYER.MOVE

Player.prototype.move = function() {

	this.body.velocity.x = 0;
	this.body.velocity.y = 0;

	// Move left
	if (cursors.left.isDown) {
		this.body.velocity.x = -this.moveSpeed;
		// flip
		if (this.scale.x > 0) {
			this.scale.x *= -1;
		};

		if (this.getChildAt(0).x < 4) {
			this.getChildAt(0).x+= 0.5;
		};

	}

	// Move right
	if (cursors.right.isDown) {
		this.body.velocity.x = this.moveSpeed;
		// flip
		if (this.scale.x < 0) {
			this.scale.x *= -1;
		};

		if (this.getChildAt(0).x < 4) {
			this.getChildAt(0).x+= 0.5;
		}
	}

	// Move up
	if (cursors.up.isDown) {
		this.body.velocity.y = -this.moveSpeed;
		if (this.getChildAt(0).y > -4) {
			this.getChildAt(0).y -= 0.5;
		}
	}

	// Move down
	if (cursors.down.isDown) {
		this.body.velocity.y = this.moveSpeed;
		if (this.getChildAt(0).y < 4) {
			this.getChildAt(0).y += 0.5;
		}
	}

	if (this.body.velocity.x == 0 && this.body.velocity.y == 0) {
		
		if (this.getChildAt(0).x !=0) {
			this.getChildAt(0).x-= 0.5;
			this.getChildAt(0).y = 0;
		}

		if (this.getChildAt(0).y > 0) {
			this.getChildAt(0).y -= 0.5;
		}

		if (this.getChildAt(0).y < 0) {
			this.getChildAt(0).y += 0.5;
		}

		
	}

}

// PLAYER.UPDATE

Player.prototype.update = function() {

	this.move();

	if (game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).isDown && this.scale.y>=0.5) {
			
		this.reduce(0.02);
	}

	if (this.scale.y<0.4) {
		this.kill();
	}

	if (this.scale.y < 1) {

		if (this.getChildAt(0).scale.y < 2) {
			this.getChildAt(0).scale.set(this.getChildAt(0).scale.y + 0.01);
		}
		
		

	} else {
		
	// 	if (this.scale.y <= 0.5) {
	// 		this.getChildAt(0).scale.set(2);
	// 	}
	// } else {
		this.getChildAt(0).scale.set(1.6);
	// }
	}

}

var Things = function(game) {

	Phaser.Group.call(this, game, 0, 0);
}


/***********************************************************************************************

                                                                       
88888888888                                                            
88                                                                     
88                                                                     
88aaaaa      8b,dPPYba,    ,adPPYba,  88,dPYba,,adPYba,   8b       d8  
88"""""      88P'   `"8a  a8P_____88  88P'   "88"    "8a  `8b     d8'  
88           88       88  8PP"""""""  88      88      88   `8b   d8'   
88           88       88  "8b,   ,aa  88      88      88    `8b,d8'    
88888888888  88       88   `"Ybbd8"'  88      88      88      Y88'     
                                                              d8'      
                                                             d8'       

***********************************************************************************************/

var enemies = [];

var Enemy = function (game, key) {

	Phaser.Sprite.call(this, game, 0, 0, key);

		this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
		this.anchor.set(0.5);
		this.enableBody = true;
		game.physics.enable(this,Phaser.Physics.ARCADE);

	enemies.push(this);
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {
	game.physics.arcade.collide(this, player);
}

/***********************************************************************************************

                                                                    
88        88                          88           88               
88        88                          88           ""               
88        88                          88                            
88        88  8b,dPPYba,   ,adPPYba,  88,dPPYba,   88  8b,dPPYba,   
88        88  88P'   "Y8  a8"     ""  88P'    "8a  88  88P'   `"8a  
88        88  88          8b          88       88  88  88       88  
Y8a.    .a8P  88          "8a,   ,aa  88       88  88  88       88  
 `"Y8888Y"'   88           `"Ybbd8"'  88       88  88  88       88  
                                                                    
                                                                    

***********************************************************************************************/

var urchins = [];
var urchin;

var Urchin = function(game, posx, posy, scale) {

	enemies.push(this);
	urchins.push(this);

	Phaser.Sprite.call(this, game, 0, 0, 'urchin');

		this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
		this.anchor.set(0.5);
		this.enableBody = true;
		game.physics.enable(this,Phaser.Physics.ARCADE);
		this.body.immovable = true;

		this.nextFire = 0;
        this.bulletSpeed = 300;
        this.fireRate = 800;
        this.bulletNumber = 48;
		
		this.name = 'urchin'+urchins.length;
		this.scale.set(scale,scale);
		this.x = posx;
		this.y = posy;

		game.add.existing(this);
	
}

Urchin.prototype = Object.create(Phaser.Sprite.prototype);
Urchin.prototype.constructor = Urchin;
Urchin.prototype.shoot = function() {

	if (game.time.now > this.nextFire) {

		for (i=0; i<360; i+=45) {

			bullet = bulletPool.getFirstExists(false);
		
			if (bullet) {
				bullet.fire(this, i, this.bulletSpeed, this.scale.y);
			}

		}

		this.nextFire = game.time.now + this.fireRate
	}
}
Urchin.prototype.transferScale = function (Urchin, Player) {

	enemyReduce = this.scale.y/20;
	playerGrow = enemyReduce/2;
	playerReduce = this.scale.y/10;
	enemyGrow = playerReduce/2;

	if (this.scale.y > player.scale.y) {
		player.reduce(playerReduce);
		this.grow(enemyGrow);
	}
	if (this.scale.y < player.scale.y) {
		this.reduce(enemyReduce);
		player.grow(playerGrow);
	}
}

Urchin.prototype.update = function() { 
	
	if (this.exists) {
		this.shoot();
	}
	
	game.physics.arcade.collide(this, player, this.transferScale, null, this);

	if (this.scale.y<0.3) {
		this.kill();
	}
}

/***********************************************************************************************

                                                                    
                                                              
  ,ad8888ba,                                                  
 d8"'    `"8b                                                 
d8'                                                           
88             8b,dPPYba,   ,adPPYba,   ,adPPYba,  ,adPPYba,  
88             88P'   "Y8  a8"     "8a  I8[    ""  I8[    ""  
Y8,            88          8b       d8   `"Y8ba,    `"Y8ba,   
 Y8a.    .a8P  88          "8a,   ,a8"  aa    ]8I  aa    ]8I  
  `"Y8888Y"'   88           `"YbbdP"'   `"YbbdP"'  `"YbbdP"'  
                                                                                                                                  

***********************************************************************************************/
var crosses = [];
var newCross;
var lasers;
// 
/**
 * Prototype de l'enemi Urchin
 * @param {[type]} 	 game  [description]
 * @param {[number]} posx  [position sur l'axe horizontal]
 * @param {[number]} posy  [position sur l'axe vertical]
 * @param {[number]} scale [taille]
 */
var Cross = function(game, posx, posy, scale) {

	enemies.push(this);
	crosses.push(this);

	Phaser.Group.call(this, game, 0, 0);

		this.nextFire = 0;
        this.bulletSpeed = 300;
        this.fireRate = 1;
        this.bulletNumber = 48;
        this.canShoot = false;
        this.shootTime = 400;
        this.indice = 0;
        this.pivot.x = 0;
        this.pivot.y = 0;
        this.x = posx;
        this.y = posy;

		newCross = this.add(new Enemy(game, 'urchin'));
		newCross.body.immovable = true;
		newCross.scale.set(scale, scale);

		
			this.add(new Laser(game,0));
			this.add(new Laser(game,90));
		

		game.add.existing(this);

}

Cross.prototype = Object.create(Phaser.Group.prototype);
Cross.prototype.constructor = Cross;
Cross.prototype.toggle = function() {

	switch(this.canShoot) {
		case true:
			this.canShoot = false;

			
			break;
		case false:
			this.canShoot = true;
			break;
			
	}
	
}

Cross.prototype.update = function() {

	if (this.canShoot) {
		this.getAt(1).animations.play('shoot', 20, false);
		this.getAt(2).animations.play('shoot', 20, false);
		
		this.getAt(0).angle++;
		
		this.getAt(1).angle++;
		this.getAt(2).angle++;


	} else {
		this.getAt(1).animations.play('prepare', 20, true);
		this.getAt(2).animations.play('prepare', 20, true);
	}

	this.indice ++;

	if (this.indice>this.shootTime) {
		this.toggle();
		this.indice=0;
	}

	game.physics.arcade.collide(this.getAt(0), player)
	
	game.physics.arcade.overlap(this.getAt(1), player, this.getAt(1).laserHit, null, this.getAt(1));
	game.physics.arcade.overlap(this.getAt(2), player, this.getAt(2).laserHit, null, this.getAt(2));
	
}

/***********************************************************************************************
                                                       
                                                            
88                                                          
88                                                          
88                                                          
88           ,adPPYYba,  ,adPPYba,   ,adPPYba,  8b,dPPYba,  
88           ""     `Y8  I8[    ""  a8P_____88  88P'   "Y8  
88           ,adPPPPP88   `"Y8ba,   8PP"""""""  88          
88           88,    ,88  aa    ]8I  "8b,   ,aa  88          
88888888888  `"8bbdP"Y8  `"YbbdP"'   `"Ybbd8"'  88          
                                                            
                                                       
***********************************************************************************************/


var Laser = function(game, angle) {

	Phaser.Sprite.call(this, game, 0, 0, 'laser');

        this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

        this.anchor.set(0.5);

        this.checkWorldBounds 	= true;
		game.physics.enable(this,Phaser.Physics.ARCADE);
		this.scale.y = 300;	
		this.angle = angle;
		this.animations.add('prepare', [0, 1, 2, 3, 4, 5]);
		this.animations.add('shoot', [8]);
		this.animations.play('shoot', 20, true);
		this.body.immovable = true;

}

Laser.prototype 				= Object.create(Phaser.Sprite.prototype);
Laser.prototype.constructor 	= Enemy;
Laser.prototype.fire = function(source, angle, speed, scale) {
}

Laser.prototype.laserHit = function(Bullet, Player) {
		player.reduce(this.scale.x/10);
}

Laser.prototype.update = function() {

	game.physics.arcade.overlap(this, player, this.laserHit, null, this);
}

/***********************************************************************************************

                                              
888888888888                 88               
     88                      ""               
     88                                       
     88  8b      db      d8  88  8b,dPPYba,   
     88  `8b    d88b    d8'  88  88P'   `"8a  
     88   `8b  d8'`8b  d8'   88  88       88  
     88    `8bd8'  `8bd8'    88  88       88  
     88      YP      YP      88  88       88  
                                              
                                              
***********************************************************************************************/

// var place = '';

// var Twin = function(game, place, range) {

// 	Phaser.Group.call(this, game, 0, 0);
// 	newTwin = this.add(new Enemy(game, 'twin'));
// 	newTwin.body.immovable = true;
// 	newWeak = this.add(new Enemy(game, 'twinWeak'));
// 	newTwin.body.immovable = true;

// 	this.placing = place;
// 	this.indice = 0;
// 	this.indiceSpan = 0;
// 	this.moveSpeed = 1000;
// 	this.range = range;

// 	switch (place) {
		
// 		case 'left':
// 			newTwin.x = Math.floor(0+newTwin.width/2);
// 			this.basePosition = Math.floor(0+newTwin.width/2);
// 			break;
// 		case 'right':
// 			newTwin.x = Math.floor(1000-newTwin.width/2);
// 			this.basePosition = Math.floor(1000-this.getAt(0).width/2);
// 			break;

// 		case 'top':
// 			newTwin.y = 0+newTwin.height/2;
// 			this.basePosition = 0+newTwin.height/2;
// 			break;
		
// 		case 'bottom':
// 			newTwin.y = 650-newTwin.height/2;
// 			this.basePosition = 650-newTwin.height/2;
// 			break;
// 	}
	
// 	game.add.existing(this);
// }

// Twin.prototype = Object.create(Phaser.Group.prototype);
// Twin.prototype.constructor = Twin;
// Twin.prototype.transferScale = function() {
	
// 	enemyReduce = this.scale.y/20;
// 	playerGrow = enemyReduce/2;
// 	playerReduce = player.scale.y/20;
// 	enemyGrow = playerReduce/2;

// 		player.reduce(playerReduce);
// 		this.getAt(0).grow(enemyGrow);

// }

// Twin.prototype.update = function() {

// 	this.indiceSpan++;

// 	this.getAt(1).y = this.getAt(0).y;
// 	this.getAt(1).x = this.getAt(0).x + (this.getAt(1).width + this.getAt(0).width) / 2;

// 	switch(this.placing) {
// 		case 'left':

// 			this.getAt(0).y = player.y;

// 			break;

// 		case 'right':

// 			if (this.getAt(0).x == this.basePosition) {
// 				this.getAt(0).y = player.y;
// 				this.indice++;

// 			} else {
// 				this.getAt(0).y = this.getAt(0).y;
// 			}

// 			if (this.indice > 200 && this.getAt(0).x == this.basePosition) {

// 				this.getAt(0).body.velocity.x = -this.moveSpeed;
// 				this.getAt(0).body.immovable = false;

// 			}

// 			if (this.getAt(0).x < this.range || this.indiceSpan > 300) {
// 				this.getAt(0).body.velocity.x = 200;
// 				this.getAt(0).body.immovable = true;
// 			}

// 			if (this.getAt(0).x > this.basePosition) {
// 				this.getAt(0).body.velocity.x = 0;
// 				this.getAt(0).x = this.basePosition;
// 				this.indice = 0;
// 				this.indiceSpan = 0;
// 			}

// 			break;
// 	}
// 	this.getAt(1).y = this.getAt(0).y;
// 	this.getAt(1).x = this.getAt(0).x + (this.getAt(1).width + this.getAt(0).width) / 2;
// 	game.physics.arcade.collide(this.getAt(0), player);
// }

/***********************************************************************************************

                                              
888888888888                 88               
     88                      ""               
     88                                       
     88  8b      db      d8  88  8b,dPPYba,   
     88  `8b    d88b    d8'  88  88P'   `"8a  
     88   `8b  d8'`8b  d8'   88  88       88  
     88    `8bd8'  `8bd8'    88  88       88  
     88      YP      YP      88  88       88  
                                              
                                              
***********************************************************************************************/
var newWeak;
var place = '';

var Twin = function(game, place, range, scale) {

	Phaser.Sprite.call(this, game, 0, 0, 'twin');
	this.enableBody = true;
	game.physics.enable(this);
	this.anchor.set(0.5);
	// this.body.immovable = true;
	this.body.mass = 2;
	this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
	
	this.placing = place;
	this.indice = 0;
	this.indiceSpan = 0;
	this.moveSpeed = 1000;
	this.range = range;

	switch (place) {
		
		case 'left':
			// Add weakness sprite behind Twin depending on Twin placing
			newWeak = this.addChild(new Phaser.Sprite(game, this.x + this.width/2, this.y-this.height/2, 'twinWeak'));
			// Position Twin depending on placing.
			this.x = 0+this.width/2;
			this.angle = 180;
			// Set base position (x)
			this.basePosition = this.x;
			break;
		
		case 'right':
			// Add weakness sprite behind Twin depending on Twin placing
			newWeak = this.addChild(new Phaser.Sprite(game, this.x + this.width/2, this.y-this.height/2, 'twinWeak'));
			// Position Twin depending on placing.
			this.x = 1000-this.width/2;
			// Set base position (x)
			this.basePosition = 1000-this.width/2;
			break;

		case 'top':
			newTwin.y = 0+newTwin.height/2;
			this.basePosition = 0+newTwin.height/2;
			break;
		
		case 'bottom':
			newTwin.y = 650-newTwin.height/2;
			this.basePosition = 650-newTwin.height/2;
			break;
	}
	this.scale.set(scale);
	newWeak.enableBody = true;
	game.physics.enable(newWeak,Phaser.Physics.ARCADE);
	newWeak.body.immovable = true;
	game.add.existing(this);
}

Twin.prototype = Object.create(Phaser.Sprite.prototype);
Twin.prototype.constructor = Twin;

Twin.prototype.transferScale = function() {
	
	enemyReduce = player.scale.y/40;
	playerGrow = enemyReduce/2;
	playerReduce = this.scale.y/10;
	enemyGrow = playerReduce/2;
	
	switch (this.placing) {
		
		case 'left':
			
			if (this.body.touching.left) {
				this.reduce(enemyReduce);
				player.grow(playerGrow);

			} else {
				
				player.reduce(playerReduce);
				this.grow(enemyGrow);

				if (this.body.touching.top || this.body.touching.bottom) {
				}
			}

		break;

		case 'right':
			
			if (this.body.touching.right) {
				this.reduce(enemyReduce);
				player.grow(playerGrow);

			} else {
				player.reduce(playerReduce);
				this.grow(enemyGrow);
			}

		break;
	} 
}

Twin.prototype.update = function() {

	this.indiceSpan++;

	this.y = this.y;

	switch(this.placing) {
		
		case 'left':

			this.body.velocity.y = 0;
			
			// Update base position depending on Twin.width.
			this.basePosition = 0+this.width/2;

			// When Twin is at basePosition, Twin follows player y and charges up.
			if (this.x == this.basePosition) {
				this.y = player.y;
				this.indice++;

			// if Twin not at basePosition, Twin doesn't follow player.
			} else {
				this.y = this.y;
			}

			// When Twin charged and at basePosition, launch.
			if (this.indice > 200 && this.x == this.basePosition) {

				this.body.velocity.x = this.moveSpeed;

			}

			// When Twin goes out of range, go back.
			if (this.x > this.range || this.indiceSpan > 300) {
				this.body.velocity.x = -200;
			}

			// // go 
			// if (this.body.velocity.x > 0 && this.x > this.range + this.range/2) {
			// 	if (player.y > this.y) {
			// 		this.y++;
			// 	}

			// 	if (player.y < this.y) {
			// 		this.y--;
			// 	}
			// }

			// When Twin goes further than basePosition, reset to basePosition;
			if (this.x < this.basePosition) {
				this.body.velocity.x = 0;
				this.x = this.basePosition;
				this.indice = 0;
				this.indiceSpan = 0;
			}
			break;

		case 'right':

			this.body.velocity.y = 0;

			// Update base position depending on Twin.width.
			this.basePosition = 1000-this.width/2;

			// When Twin is at basePosition, Twin follows player y and charges up.
			if (this.x == this.basePosition) {
				this.y = player.y;
				this.indice++;

			// if Twin not at basePosition, Twin doesn't follow player.
			} else {
				this.y = this.y;
			}

			// When Twin charged and at basePosition, launch.
			if (this.indice > 200 && this.x == this.basePosition) {

				this.body.velocity.x = -this.moveSpeed;

			}

			// When Twin goes out of range, go back.
			if (this.x < this.range || this.indiceSpan > 300) {
				this.body.velocity.x = 200;
			}

			// if (this.body.velocity.x > 0 && this.x > this.range + this.range/2) {
			// 	if (player.y > this.y) {
			// 		this.y++;
			// 	}

			// 	if (player.y < this.y) {
			// 		this.y--;
			// 	}
			// }

			// When Twin goes further than basePosition, reset to basePosition;
			if (this.x > this.basePosition) {
				this.body.velocity.x = 0;
				this.x = this.basePosition;
				this.indice = 0;
				this.indiceSpan = 0;
			}

			break;
	}

	if (this.scale.y < 0.3) {
		this.kill();
	}	
	
	if (game.physics.arcade.collide(this, player)) {
		this.transferScale();
		console.log(this.indiceSpan);

	}

	game.physics.arcade.collide(this, twins);
	game.physics.arcade.collide(this, blocs);

	if (game.physics.arcade.collide(this)) {
		console.log('coucou');
	}
	
}

/***********************************************************************************************

                                                                                          
 ad88888ba   88                                    88  88                                 
d8"     "8b  88                                    ""  88                                 
Y8,          88                                        88                                 
`Y8aaaaa,    88,dPPYba,   88       88  8b,dPPYba,  88  88   ,d8   ,adPPYba,  8b,dPPYba,   
  `"""""8b,  88P'    "8a  88       88  88P'   "Y8  88  88 ,a8"   a8P_____88  88P'   `"8a  
        `8b  88       88  88       88  88          88  8888[     8PP"""""""  88       88  
Y8a     a8P  88       88  "8a,   ,a88  88          88  88`"Yba,  "8b,   ,aa  88       88  
 "Y88888P"   88       88   `"YbbdP'Y8  88          88  88   `Y8a  `"Ybbd8"'  88       88  
                                                                                          

***********************************************************************************************/

var Shurikenes = [];
var Shuriken = function(game, posx, posy, scale) {
		
		enemies.push(this);
		Shurikenes.push(this);

		Phaser.Sprite.call(this, game, 0, 0, 'shuriken');

		this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
		this.anchor.set(0.5);
		this.enableBody = true;
		game.physics.enable(this,Phaser.Physics.ARCADE);
		this.body.immovable = true;

		this.nextFire = 0;
        this.bulletSpeed = 300;
        this.fireRate = 20;
        this.bulletNumber = 48;
		
		this.name = 'Shuriken'+Shurikenes.length;
		this.scale.set(scale,scale);
		this.x = posx;
		this.y = posy;

		game.add.existing(this);

	}

Shuriken.prototype = Object.create(Phaser.Sprite.prototype);
Shuriken.prototype.constructor = Shuriken;
Shuriken.prototype.shoot = function() {

	if (game.time.now > this.nextFire) {

		for (i=0; i<360; i+=90) {

			bullet = bulletPool.getFirstExists(false);
		
			if (bullet) {
				bullet.fire(this, this.angle+i, this.bulletSpeed, this.scale.y*0.5);
			}

		}

		this.nextFire = game.time.now + this.fireRate
	}
}
Shuriken.prototype.transferScale = function (Shuriken, Player) {

	enemyReduce = player.scale.y/20;
	playerGrow = enemyReduce/2;
	playerReduce = this.scale.y/10;
	enemyGrow = playerReduce/2;

	if (this.scale.y > player.scale.y) {
		player.reduce(playerReduce);
		this.grow(enemyGrow);
	}
	if (this.scale.y < player.scale.y) {
		this.reduce(enemyReduce);
		player.grow(playerGrow);
	}
}
Shuriken.prototype.update = function() { 
	
	if (this.exists) {
		this.shoot();
	}
	
	game.physics.arcade.collide(this, player, this.transferScale, null, this);

	if (this.scale.y<0.3) {
		this.kill();
	}

	this.angle+=0.5;
}

/***********************************************************************************************

                                                                                                                          
  ,ad8888ba,                                     88    ,ad8888ba,                                         88              
 d8"'    `"8b                                    88   d8"'    `"8b                                        88              
d8'                                              88  d8'                                                  88              
88             8b,dPPYba,  8b,dPPYba,    ,adPPYb,88  88             88       88   ,adPPYba,  88       88  88   ,adPPYba,  
88      88888  88P'   "Y8  88P'   `"8a  a8"    `Y88  88      88888  88       88  a8P_____88  88       88  88  a8P_____88  
Y8,        88  88          88       88  8b       88  Y8,        88  88       88  8PP"""""""  88       88  88  8PP"""""""  
 Y8a.    .a88  88          88       88  "8a,   ,d88   Y8a.    .a88  "8a,   ,a88  "8b,   ,aa  "8a,   ,a88  88  "8b,   ,aa  
  `"Y88888P"   88          88       88   `"8bbdP"Y8    `"Y88888P"    `"YbbdP'Y8   `"Ybbd8"'   `"YbbdP'Y8  88   `"Ybbd8"'  
                                                                                                                          
                                                                                                                                                                                                                                      
***********************************************************************************************/

var grandegueules = [];

var GrandeGueule = function(game, posx, posy, scale) {

	enemies.push(this);
	grandegueules.push(this);

	Phaser.Sprite.call(this, game, 0, 0, 'gg');

		this.moveSpeed = 150 - (this.scale.y*50);

		this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
		this.anchor.set(0.5);
		this.enableBody = true;
		game.physics.enable(this,Phaser.Physics.ARCADE);
		this.body.collideWorldBounds = true;
		this.animations.add('stand', [0, 1]);
		this.animations.play('stand', 20, true);

		
		this.name = 'gg'+grandegueules.length;
		this.scale.set(scale,scale);
		this.x = posx;
		this.y = posy;

		game.add.existing(this);
	
}
GrandeGueule.prototype = Object.create(Phaser.Sprite.prototype);
GrandeGueule.prototype.constructor = GrandeGueule;
GrandeGueule.prototype.move = function() {
	
	// If enemy bigger than player = enemy flees from player.
	if (this.scale.y > player.scale.y) {

		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
				
		if (this.x > player.x + player.width/2)
		{
			this.body.velocity.x = -this.moveSpeed;
			
			// flip
			if (this.scale.x > 0) {
				this.scale.x *= -1;
			}; 
			
		}

		if (this.x < player.x - player.width/2)
		{
			this.body.velocity.x = this.moveSpeed;
			
			// flip
			if (this.scale.x < 0) {
				this.scale.x *= -1;
			}; 

		}

		if (this.y > player.y + player.height/2)
		{
			this.body.velocity.y = -this.moveSpeed;		
		}

		if (this.y < player.y - player.height/2)
		{
			this.body.velocity.y = this.moveSpeed;		
		}

	}

	// If enemy smaller than player = enemy flees from player.
	if (this.scale.y < player.scale.y) {

		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
	
		if (this.x > player.x + player.width/2)
		{
			this.body.velocity.x = this.moveSpeed;
			// flip
			if (this.scale.x < 0) {
				this.scale.x *= -1;
			};  
			
		}

		if (this.x < player.x - player.width/2)
		{
			this.body.velocity.x = -this.moveSpeed;
			// flip
			if (this.scale.x > 0) {
				this.scale.x *= -1;
			};  

		}

		if (this.y > player.y + player.height/2)
		{
			this.body.velocity.y = this.moveSpeed; 
		}

		if (this.body.position.y < player.body.position.y - player.height/2)
		{
			this.body.velocity.y = -this.moveSpeed; 
		}
	}
}
GrandeGueule.prototype.transferScale = function (GrandeGueule, Player) {

	enemyReduce = player.scale.y/20;
	playerGrow = enemyReduce/2;
	playerReduce = this.scale.y/20;
	enemyGrow = playerReduce/2;

	if (this.scale.y > player.scale.y) {
		player.reduce(playerReduce);
		this.grow(enemyGrow);
	}
	if (this.scale.y < player.scale.y) {
		this.reduce(enemyReduce);
		player.grow(playerGrow);
	}
}
GrandeGueule.prototype.update = function() {
	this.move();
	game.physics.arcade.collide(this, player, this.transferScale, null, this);
	game.physics.arcade.collide(this);
	game.physics.arcade.collide(this, blocs);

	if (this.scale.y<0.3) {
		this.kill();
	}

}

/***********************************************************************************************
                                                       
                                          
88888888ba   88                           
88      "8b  88                           
88      ,8P  88                           
88aaaaaa8P'  88   ,adPPYba,    ,adPPYba,  
88""""""8b,  88  a8"     "8a  a8"     ""  
88      `8b  88  8b       d8  8b          
88      a8P  88  "8a,   ,a8"  "8a,   ,aa  
88888888P"   88   `"YbbdP"'    `"Ybbd8"'  
                                          
                                                                       
***********************************************************************************************/

var Bloc = function(game, x, y, width, height) {

	Phaser.Sprite.call(this, game, 0, 0, 'bloc');

		this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
		this.enableBody = true;
		game.physics.enable(this,Phaser.Physics.ARCADE);
		this.body.immovable = true;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		game.add.existing(this);
		
}

Bloc.prototype = Object.create(Phaser.Sprite.prototype);
Bloc.prototype.constructor = Bloc;
Bloc.prototype.update = function() {
	game.physics.arcade.collide(this, player);

} 

/***********************************************************************************************
                                                       
88888888ba                88  88                       
88      "8b               88  88                ,d     
88      ,8P               88  88                88     
88aaaaaa8P'  88       88  88  88   ,adPPYba,  MM88MMM  
88""""""8b,  88       88  88  88  a8P_____88    88     
88      `8b  88       88  88  88  8PP"""""""    88     
88      a8P  "8a,   ,a88  88  88  "8b,   ,aa    88,    
88888888P"    `"YbbdP'Y8  88  88   `"Ybbd8"'    "Y888  
                                                       
***********************************************************************************************/

var bullets;
var bullet;
var Bullet = function(game, key) {

	Phaser.Sprite.call(this, game, 0, 0, key);

        this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

        this.anchor.set(0.5);

        this.checkWorldBounds 	= true;
        this.outOfBoundsKill 	= true;
        this.exists 			= false;
        this.enableBody 		= true;
		game.physics.enable(this,Phaser.Physics.ARCADE);	

        this.tracking = true;
        this.scaleSpeed = 0;

}

Bullet.prototype 				= Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor 	= Enemy;
Bullet.prototype.fire = function(source, angle, speed, scale) {
		
		this.reset(source.x, source.y);
		this.angle = angle;
		this.scale.set(scale);
		this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);

}

Bullet.prototype.bulletHit = function(Bullet, Player) {
		this.kill();
		player.reduce(this.scale.y/10);
}

Bullet.prototype.hit = function(Bullet, Sprite) {
	this.kill();
}

Bullet.prototype.update = function() {

	game.physics.arcade.collide(this, player, this.bulletHit, null, this);
	game.physics.arcade.collide(this, blocs, this.hit, null, this);

}

/***********************************************************************************************

                                                     
888888888888 88          88                          
     88      88          ""                          
     88      88                                      
     88      88,dPPYba,  88 8b,dPPYba,   ,adPPYb,d8  
     88      88P'    "8a 88 88P'   `"8a a8"    `Y88  
     88      88       88 88 88       88 8b       88  
     88      88       88 88 88       88 "8a,   ,d88  
     88      88       88 88 88       88  `"YbbdP"Y8  
                                         aa,    ,88  
                                          "Y8bbdP"   

***********************************************************************************************/

var Thing = function(game, posx, posy, scale) {

	scale = scale || 1;

	Phaser.Sprite.call(this, game, 0, 0, "thing");

        this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
        this.anchor.set(0.5);
        this.enableBody 		= true;
		game.physics.enable(this,Phaser.Physics.ARCADE);	
		this.scale.set(scale,scale);
		this.x = posx;
		this.y = posy;

}

Thing.prototype 				= Object.create(Phaser.Sprite.prototype);
Thing.prototype.constructor 	= Thing;
Thing.prototype.playerPick = function(Thing, Player) {
		
		this.kill();
		player.grow(this.scale.y/10);
}

Thing.prototype.update = function() {

	game.physics.arcade.collide(this, player, this.playerPick, null, this);
}

/***********************************************************************************************

                                                                                                                                                        
888888888888  88           88                             ad88888ba                                                                                     
     88       88           ""                            d8"     "8b                                                                                    
     88       88                                         Y8,                                                                                            
     88       88,dPPYba,   88  8b,dPPYba,    ,adPPYb,d8  `Y8aaaaa,    8b,dPPYba,   ,adPPYYba,  8b      db      d8  8b,dPPYba,    ,adPPYba,  8b,dPPYba,  
     88       88P'    "8a  88  88P'   `"8a  a8"    `Y88    `"""""8b,  88P'    "8a  ""     `Y8  `8b    d88b    d8'  88P'   `"8a  a8P_____88  88P'   "Y8  
     88       88       88  88  88       88  8b       88          `8b  88       d8  ,adPPPPP88   `8b  d8'`8b  d8'   88       88  8PP"""""""  88          
     88       88       88  88  88       88  "8a,   ,d88  Y8a     a8P  88b,   ,a8"  88,    ,88    `8bd8'  `8bd8'    88       88  "8b,   ,aa  88          
     88       88       88  88  88       88   `"YbbdP"Y8   "Y88888P"   88`YbbdP"'   `"8bbdP"Y8      YP      YP      88       88   `"Ybbd8"'  88          
                                             aa,    ,88               88                                                                                
                                              "Y8bbdP"                88                                                                                

***********************************************************************************************/

var newThing;
var ThingSpawner = function(game, posx, posy, width, height, scale) {


	Phaser.Group.call(this, game, posx, posy, 'thing');

		this.nextSpawn = 0;
        this.spawnRate = 600;
        this.thingNumber = 32;

        this.physicsBodyType = Phaser.Physics.ARCADE;
        this.enableBody = true;

		this.zoneWidth = width;
		this.zoneHeight = height;
		// this.randomX = 0;
		// this.randomY = 0;
		
		for (i=0; i<this.thingNumber; i++) {
			
			newThing = this.add(new Thing(game, 0, 0, scale));
			newThing.exists = false;

		}
}

ThingSpawner.prototype 					= Object.create(Phaser.Group.prototype);
ThingSpawner.prototype.constructor 		= ThingSpawner;
ThingSpawner.prototype.spawnThing = function() {

	if (game.time.now > this.nextSpawn) {
		
		thing = this.getFirstExists(false);
	
		if (thing) {

			// this.randomX = Math.floor(Math.random()*((this.x+this.width)-this.x)+this.x);
			// this.randomY = Math.floor(Math.random()*((this.y+this.height)-this.y)+this.y);
			thing.reset(Math.floor(Math.random()*((this.x+this.zoneWidth)-this.x)+this.x), Math.floor(Math.random()*((this.y+this.zoneHeight)-this.y)+this.y));
			thing.enableBody = true;
			game.physics.enable(thing,Phaser.Physics.ARCADE);	

		}

		this.nextSpawn = game.time.now + this.spawnRate;
	}
}

ThingSpawner.prototype.update = function() {
	this.spawnThing();
	for(i=0; i<this.length; i++) {
		game.physics.arcade.collide(this.getAt(i), player, this.getAt(i).playerPick, null, this.getAt(i));
	}
	
}

/***********************************************************************************************

                                                     
88888888ba,                                          
88      `"8b                                         
88        `8b                                        
88         88   ,adPPYba,    ,adPPYba,   8b,dPPYba,  
88         88  a8"     "8a  a8"     "8a  88P'   "Y8  
88         8P  8b       d8  8b       d8  88          
88      .a8P   "8a,   ,a8"  "8a,   ,a8"  88          
88888888Y"'     `"YbbdP"'    `"YbbdP"'   88          
                                                     
                                                     

***********************************************************************************************/

/**
 * [Door creates a platform and a door. the door open if the player walks over the platform with greater scale than the platform]
 * @param {Number}  posx      x position of the platform
 * @param {Number}  posy      y position of the platform
 * @param {Number}  scale     scale of the platform
 * @param {Boolean} vertical  states whether the door is vertical or horizontal
 * @param {Number}  doorposx  x position of the door
 * @param {Number}  doorposy  y position of the door
 * @param {Number}  size      width or height of the door
 */

var Door = function(posx, posy, scale, vertical, doorposx, doorposy, size) {
	
	Phaser.Sprite.call(this, game, posx, posy, 'platform');

		this.doorVertical = vertical;
		
		this.scale.set(scale);
		this.anchor.set(0);
		
		if (this.doorVertical) {
			newDoor = this.addChild(new Enemy(game, 'doorvertical'));
			newDoor.height = size;
		} else {
			newDoor = this.addChild(new Enemy(game, 'doorhorizontal'));
			newDoor.width = size;
		}

		newDoor.anchor.set(0);
		newDoor.x = doorposx;
		newDoor.y = doorposy;
}

var filter = [];
var FILTER_VIGNETTE = 0;
var FILTER_FILMGRAIN = 1;
var FILTER_SNOISE = 2;

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
		game.load.image('doorvertical', "img/doorvertical.png");
		game.load.image('doorhorizontal', "img/doorhorizontal.png");

		
		game.load.spritesheet('player', "img/player.png", 32, 32);
		game.load.spritesheet('playerface2', "img/playerface2.png", 16, 16);
		game.load.spritesheet('playerface3', "img/playerface3.png", 16, 16);


		game.load.spritesheet('urchin', "img/urchin.png", 32, 32);
		game.load.image('shuriken', "img/shuriken.png");
		game.load.image('enemy', "img/enemy.png");
		game.load.image('twin', "img/twin.png");
		game.load.image('twinWeak', "img/twinweak.png");
		game.load.spritesheet('gg', "img/gg.png", 32, 32);
		
		game.load.image('thing', "img/thing.png", 16, 16);
		game.load.image('bullet', "img/bullet.png");
		game.load.spritesheet('laser', "img/laser.png", 16, 8);

		game.load.script('tilt', 'phaser-master/filters/pixi/RGBSplitFilter.js');
		game.load.script('filter-vignette', 'filters/Vignette.js');
	    game.load.script('filter-filmgrain', 'filters/FilmGrain.js');


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
		 
		game.world.setBounds(0, 0, 1000, 650);
		backgroundImage = game.add.tileSprite(0,0,1000,1000,'backgroundImage');
		cursors = game.input.keyboard.createCursorKeys();
		game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

// Create Bullet Pool
// **********************************************************

		bulletPool = game.add.group();
		bulletPool.enableBody 		= true;
		bulletPool.physicsBodyType = Phaser.Physics.ARCADE;

		// Add non existing bullets to the pool
		for (i=0; i<400; i++) {
		 	bulletPool.add(new Bullet(game,'bullet'))
		}

		// doorA = new Door(400, 400, 3, true, 400, 450, 100)

// Add player
// ********************************************************** 
		
		player = new Player(game, 300, 200, 1);

// Add enemies groups
// ********************************************************** 

		twins = game.add.group();
		twinA = twins.add(new Twin(game, 'right', 500, 2));
		twinB = twins.add(new Twin(game,  'left', 500, 2));

		ggs = game.add.group();
		// ggA = ggs.add(new GrandeGueule (game, 500, 500, 2));
		ggB = ggs.add(new GrandeGueule (game, 500, 325, 1.5));

		// urchinA 		= new Urchin       (game, 500, 325, 1);
		
		// ShurikenA 		= new Shuriken     (game, 500, 325, 1);
	
// Add Things and thingSpawners
// ********************************************************** 	

		thingSpawner = new ThingSpawner (game, 0, 0, 1000, 1000, 1);
		game.add.existing(thingSpawner);

// Add blocs group
// ********************************************************** 

		blocs = game.add.group();
		blocs.enableBody 		= true;
		blocs.physicsBodyType = Phaser.Physics.ARCADE;
		 	 
		blocs.add(new Bloc(game, 100, 100, 64, 64));
		// blocs.add(new Bloc(game, 100, 486, 64, 64));
		blocs.add(new Bloc(game, 836, 486, 64, 64));
		// blocs.add(new Bloc(game, 836, 100, 64, 64));

// Add player 
// ********************************************************** 
		
		player = new Player(game, 300, 200, 1);
		game.add.existing(player);
		game.camera.follow(player);

// COLLISIONS 
// ********************************************************** 
		game.physics.arcade.collide(twins);

// FILTERS 
// ********************************************************** 

		game.stage.smoothed = false;
		
		var tilt = new PIXI.RGBSplitFilter();
		tilt.blue.x = 2;
		tilt.blue.y = 0;
		tilt.red.x = -2;
		tilt.red.y = 0;
		tilt.green.x = 0;
		tilt.green.y = 0;
		
		filter[FILTER_VIGNETTE] = game.add.filter('Vignette');
    	filter[FILTER_VIGNETTE].size = 0.2;
    	filter[FILTER_VIGNETTE].amount = 0.4;
    	filter[FILTER_VIGNETTE].alpha = 1.0;

    	//filter[FILTER_SNOISE] = game.add.filter('SNoise');

    	filter[FILTER_FILMGRAIN] = game.add.filter('FilmGrain');
    	filter[FILTER_FILMGRAIN].color = 0.6;
    	filter[FILTER_FILMGRAIN].amount = 0.02;
    	filter[FILTER_FILMGRAIN].luminance = 0.3;
		
		game.stage.filters = [tilt, filter[FILTER_FILMGRAIN], filter[FILTER_VIGNETTE]];
		


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

function laserHit (lasers, player) {
	playerSetting.reduce(0.02);
}

function laserKill (lasers, blocs) {
	laser.kill();
}

function bulletHit (Bullet, player) {
	player.reduce(0.1);
	Bullet.kill();
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
			
}

game.state.add('mainState', mainState);

game.state.start('mainState');