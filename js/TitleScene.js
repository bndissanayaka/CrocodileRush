class TitleScene extends Phaser.Scene {

    constructor() {
        super({ key: 'TitleScene' });
        var playButton;
        var musicGButton;
        var soundGButton;
        var musicRButton;
        var soundRButton;
        var musicPlay = 'no';
        var soundPlay = 'no';
    }


    create() {


        var bg = this.add.sprite(0, 0, 'background');
        bg.setOrigin(0, 0);

        if (this.registry.get('musicPlay') === undefined) {
            this.registry.set('musicPlay', 'yes');
            this.registry.set('soundPlay', 'yes');
        }

        this.playButton = this.add.image(400, 239, 'play');
        this.playButton.setScale(0.4);
        this.playButton.setInteractive({ useHandCursor: true });
        this.playButton.on('pointerdown', () => this.clickPlayButton());

        this.musicGButton = this.add.image(750, 525, 'musicG');
        this.musicGButton.setScale(0.35);
        this.musicGButton.setInteractive({ useHandCursor: true });
        this.musicGButton.on('pointerdown', () => this.clickMusicGButton());

        this.soundGButton = this.add.image(700, 525, 'soundG');
        this.soundGButton.setScale(0.35);
        this.soundGButton.setInteractive({ useHandCursor: true });
        this.soundGButton.on('pointerdown', () => this.clickSoundGButton());

        this.musicRButton = this.add.image(750, 525, 'musicR');
        this.musicRButton.setScale(0.35);
        this.musicRButton.setInteractive({ useHandCursor: true });
        this.musicRButton.on('pointerdown', () => this.clickMusicRButton());
        this.musicRButton.setVisible(false);

        this.soundRButton = this.add.image(700, 525, 'soundR');
        this.soundRButton.setScale(0.35);
        this.soundRButton.setInteractive({ useHandCursor: true });
        this.soundRButton.on('pointerdown', () => this.clickSoundRButton());
        this.soundRButton.setVisible(false);

        if (this.registry.get('keepMusic') === 'no') {
            this.musicRButton.setVisible(true);
            this.musicGButton.setVisible(false);
        } else {
            this.musicRButton.setVisible(false);
            this.musicGButton.setVisible(true);
        }
        if (this.registry.get('keepSound') === 'no') {
            this.soundRButton.setVisible(true);
            this.soundGButton.setVisible(false);
        } else {
            this.soundRButton.setVisible(false);
            this.soundGButton.setVisible(true);
        }
    }

    clickPlayButton() {
        if (this.registry.get('gameOver') === 'yes') {
            this.registry.set('gameOver', 'no');
            this.scene.start('PlayScene');
        } else {

            this.scene.start('PlayScene');
        }

    }
    clickMusicGButton() {

        this.musicRButton.setVisible(true);
        this.musicGButton.setVisible(false);
        this.registry.set('musicPlay', 'no');
    }
    clickSoundGButton() {
        this.soundRButton.setVisible(true);
        this.soundGButton.setVisible(false);
        this.registry.set('soundPlay', 'no');
    }
    clickMusicRButton() {
        this.musicRButton.setVisible(false);
        this.musicGButton.setVisible(true);
        this.registry.set('musicPlay', 'yes');
    }
    clickSoundRButton() {
        this.soundRButton.setVisible(false);
        this.soundGButton.setVisible(true);
        this.registry.set('soundPlay', 'yes');
    }

}