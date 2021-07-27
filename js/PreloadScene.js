class PreloadScene extends Phaser.Scene {

    constructor() {
        super('PreloadScene');
    }

    // called only once
    preload() {
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });

        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', function(value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        this.load.on('fileprogress', function(file) {
            assetText.setText('Loading asset: ' + file.key);
        });

        this.load.on('complete', function() {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });

        this.load.image('background', './assests/img/drawing.png');
        this.load.image('play', './assests/img/play.png');
        this.load.image('home', './assests/img/home.png');
        this.load.image('musicR', './assests/img/musicR.png');
        this.load.image('musicG', './assests/img/musicG.png');
        this.load.image('soundR', './assests/img/soundR.png');
        this.load.image('soundG', './assests/img/soundG.png');
        this.load.image('backLong', './assests/img/backLong.png');
        this.load.image('sky', './assests/img/sky.png');
        this.load.image('ground1', './assests/img/platform1.png');
        this.load.image('ground2', './assests/img/platform2.png');
        this.load.image('ground3', './assests/img/platform3.png');
        this.load.image('ground4', './assests/img/platform4.png');
        this.load.image('egg', './assests/img/goldEgg.png');
        this.load.image('bomb', './assests/img/bomb.png');
        this.load.image('gameOverBG', './assests/img/GameOver.png');
        this.load.image('reStartButton', './assests/img/restart.png');
        this.load.spritesheet('player', './assests/img/player.png', {
            frameWidth: 380,
            frameHeight: 461
        });

        this.load.audio('audio', './assests/sound/music.mp3');
        this.load.audio('eggDestroy', './assests/sound/eggDestroy.wav');
        this.load.audio('eggCollect', './assests/sound/eggCollect.mp3');
        this.load.audio('gameEnd', './assests/sound/gameEnd.wav');



    }
    create() { this.scene.start('TitleScene'); }
}