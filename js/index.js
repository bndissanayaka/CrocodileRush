const WIDTH = document.body.offsetWidth;
const HEIGHT = document.body.offsetHeight;

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                //300 pixels per secon gravity force
                y: 300
            },
            debug: false
        },
        // scale: {
        //     mode: Phaser.Scale.FIT

        // },
    },
    scene: [PreloadScene, TitleScene, PlayScene, GameOverScene]

};

new Phaser.Game(config);