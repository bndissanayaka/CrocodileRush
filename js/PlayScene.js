class PlayScene extends Phaser.Scene {

    constructor() {
        super('PlayScene');
        var player;
        var sky;
        var eggs;
        var egg;
        var bombs;
        var bomb;
        var platforms;
        var cursors;
        var scoreText;
        var leftKey;
        var rightKey;
        var upKey;
        var repeatEggCount;
        var music;
        var eggDestroy;
        var eggCollect;
        var homeButton;
        var gameEndSound;

    }

    //called only once
    create() {

        this.registry.set('gameOver', 'no');
        var score = 0;

        this.music = this.sound.add('audio', {
            volume: 1,
            loop: true,
            delay: 0
        });
        this.gameEndSound = this.sound.add('gameEnd', {
            volume: 0.7,
            loop: false,
            delay: 0
        });

        if (this.registry.get('musicPlay') === 'yes') {
            this.music.play();
        } else {
            this.music.stop();
        }

        this.sound.pauseOnBlur = false;

        this.eggDestroy = this.sound.add('eggDestroy', {
            volume: 0.5,
            loop: false,
            delay: 0
        });

        this.eggCollect = this.sound.add('eggCollect', {
            volume: 1,
            loop: false,
            delay: 0
        });

        //  A simple background for our game
        this.sky = this.add.image(400, 300, 'sky');
        this.sky.setScale(0.8);

        this.homeButton = this.add.image(750, 30, 'home');
        this.homeButton.setScale(1);
        this.homeButton.setInteractive({ useHandCursor: true });
        this.homeButton.on('pointerdown', () => this.clickHomeButton(this.registry.get('musicPlay'), this.registry.get('soundPlay')));

        //  The platforms group contains the ground and the 2 ledges we can jump on
        this.platforms = this.physics.add.staticGroup();


        // Here we create the ground.
        // Scale it to fit the width of the game(the original sprite is 400 x32 in size)
        this.platforms.create(390, 568, 'ground1');
        //  Now let's create some ledges
        this.platforms.create(750, 200, 'ground2');
        this.platforms.create(0, 150, 'ground4');
        this.platforms.create(690, 420, 'ground4');
        this.platforms.create(100, 320, 'ground4');

        // The player and its settings
        this.player = this.physics.add.sprite(100, 450, 'player');

        //  Player physics properties. Give the little guy a slight bounce.
        this.player.setBounce(0.3);
        this.player.setCollideWorldBounds(true);
        this.player.setScale(0.15);
        this.player.setSize(300, 400, false);
        this.player.body.offset.y = 0;
        this.player.body.offset.x = 0;


        //  Input Events
        this.cursors = this.input.keyboard.createCursorKeys();
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        //  Our player animations, turning, walking left.
        this.anims.create({
            key: 'LeftRun',
            frames: this.anims.generateFrameNumbers('player', {
                start: 14,
                end: 17
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'LeftJump',
            frames: [{
                key: 'player',
                frame: 13
            }],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'LeftIdle',
            frames: this.anims.generateFrameNumbers('player', {
                start: 9,
                end: 10
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'LeftDizzy',
            frames: this.anims.generateFrameNumbers('player', {
                start: 10,
                end: 11
            }),
            frameRate: 10,
            repeat: -1
        });

        //  Our player animations, turning, walking Right.

        this.anims.create({
            key: 'RightRun',
            frames: this.anims.generateFrameNumbers('player', {
                start: 5,
                end: 8
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'RightJump',
            frames: [{
                key: 'player',
                frame: 4
            }],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'RightIdle',
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 1
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'RighttDizzy',
            frames: this.anims.generateFrameNumbers('player', {
                start: 2,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        });

        //  Some eggs to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        this.repeatEggCount = 15;
        this.eggs = this.physics.add.group({
            key: 'egg',
            repeat: this.repeatEggCount,
            setXY: {
                x: 8,
                y: 0,
                stepX: 50
            },
            setScale: {
                x: 0.05,
                y: 0.05
            }
        });

        this.eggs.children.iterate(function(child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.3, 0.5));

        });

        this.bombs = this.physics.add.group();
        //font styles
        var scoreFont = {
            font: "35px Lucida Sans",
            fill: "#1e821e",
            stroke: "#1e821e",
            align: "center",
            strokeThickness: 5
        };

        var fadeOutFont = {
            font: "35px Lucida Sans",
            fill: "#e81313",
            stroke: "#e81313",
            align: "center",
            strokeThickness: 5
        };
        this.scoreText = this.add.text(0, 0, "Score: 0", scoreFont);

        //  Collide the player and the eggs with the platformss
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.eggs, this.platforms);
        this.physics.add.collider(this.bombs, this.platforms);

        this.physics.add.overlap(this.player, this.eggs, (player, egg) => {

            egg.disableBody(true, true);
            this.scoreText.setText('Score: ' + (score += 10));
            this.registry.set('score', score);

            if (this.registry.get('soundPlay') === 'yes') {
                this.eggCollect.play();
            } else {
                this.eggCollect.stop();
            }


            if (this.eggs.countActive(true) === 0) {

                //  A new batch of eggs to collect
                this.eggs.children.iterate((child) => {

                    child.enableBody(true, child.x, 0, true, true);

                });

                var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

                var bomb = this.bombs.create(x, 16, 'bomb');
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(Phaser.Math.Between(-300, 300), 10);
                bomb.allowGravity = false;

            }

        }, null);

        this.physics.add.overlap(this.bombs, this.eggs, (bomb, egg) => {
            egg.disableBody(true, true);
            var test = this.add.text(200, 1, "-10", fadeOutFont);
            this.scoreText.setText('Score: ' + (score -= 10));
            this.registry.set('score', score);
            this.tweens.add({
                targets: test,
                alpha: 0,
                duration: 1000,
                ease: 'Power2'
            });

            if (this.registry.get('soundPlay') === 'yes') {
                this.eggDestroy.play();
            } else {
                this.eggDestroy.stop();
            }

            if (this.eggs.countActive(true) === 0) {

                //  A new batch of eggs to collect
                this.eggs.children.iterate((child) => {

                    child.enableBody(true, child.x, 0, true, true);

                });

                var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

                var bomb = this.bombs.create(x, 16, 'bomb');
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(Phaser.Math.Between(-300, 300), 10);
                bomb.allowGravity = false;
            }

        }, null);


        this.physics.add.collider(this.player, this.bombs, () => {
            this.music.stop();
            this.eggCollect.stop();
            this.eggDestroy.stop();
            this.physics.pause();
            this.gameEndSound.play();
            if (this.player.anims.currentAnim.key === 'RightRun' || this.player.anims.currentAnim.key === 'RightIdle' || this.player.anims.currentAnim.key === 'RightJump') {
                this.player.anims.play('RighttDizzy');
            }

            if (this.player.anims.currentAnim.key === 'LeftRun' || this.player.anims.currentAnim.key === 'LeftIdle' || this.player.anims.currentAnim.key === 'LeftJump') {
                this.player.anims.play('LeftDizzy');
            }

            this.registry.set('gameOver', 'yes');
            let timer = this.time.delayedCall(1500, () => {
                this.player.anims.stop();
                this.scene.start('GameOverScene');
            }, [], this);

        }, null, this);

    }

    //called per every frame
    update() {

        if (this.registry.get('gameOver') === 'yes') {
            return;
        }

        if (this.cursors.left.isDown) {

            this.player.setVelocityX(-160);
            this.player.anims.play('LeftRun', true);


        } else if (this.cursors.right.isDown) {

            this.player.setVelocityX(160);
            this.player.anims.play('RightRun', true);

        } else if (Phaser.Input.Keyboard.JustUp(this.leftKey)) {

            this.player.setVelocityX(0);
            this.player.anims.play('LeftIdle', true);

        } else if (Phaser.Input.Keyboard.JustUp(this.rightKey)) {

            this.player.setVelocityX(0);
            this.player.anims.play('RightIdle', true);

        } else if (Phaser.Input.Keyboard.JustUp(this.upKey) && this.player.anims.currentAnim != null) {

            if (this.player.anims.currentAnim.key === 'LeftJump') {
                this.player.anims.play('LeftIdle', true);

            }

            if (this.player.anims.currentAnim.key === 'RightJump') {
                this.player.anims.play('RightIdle', true);

            }

        } else if (this.cursors.up.isDown && this.player.anims.currentAnim != null) {

            if (this.player.anims.currentAnim.key === 'RightIdle') {
                this.player.anims.play('RightJump', true);
                if (this.player.body.touching.down) {
                    this.player.setVelocityY(-375);
                }

            }

            if (this.player.anims.currentAnim.key === 'LeftIdle') {
                this.player.anims.play('LeftJump', true);
                if (this.player.body.touching.down) {
                    this.player.setVelocityY(-350);
                }
            }
        }
    }

    clickHomeButton(keepMusic, keepSound) {
        this.registry.set('keepMusic', keepMusic);
        this.registry.set('keepSound', keepSound);
        this.music.stop();
        this.eggDestroy.stop();
        this.eggCollect.stop();
        this.scene.start('TitleScene');

    }

}