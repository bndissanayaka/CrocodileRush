class GameOverScene extends Phaser.Scene {

    constructor() {
        super({ key: 'GameOverScene' });
        var sky;
        var highestsScoreText;
        var restartButton;
    }

    create() {

        this.sky = this.add.image(400, 300, 'gameOverBG');

        this.restartButton = this.add.image(394, 392, 'reStartButton');
        this.restartButton.setScale(0.53);
        this.restartButton.setInteractive({ useHandCursor: true });
        this.restartButton.on('pointerdown', () => {
            //  this.registry.set('restart', 'yes');
            this.scene.start('TitleScene');
        });

        var gameOvrFont = {
            font: "35px Lucida Sans",
            fill: "#1e821e",
            stroke: "#1e821e",
            align: "center",
            strokeThickness: 5,
        };
        this.highestsScoreText = this.add.text(495, 270, '', gameOvrFont);
        this.highestsScoreText.setText(this.registry.get('score'));
    }
}