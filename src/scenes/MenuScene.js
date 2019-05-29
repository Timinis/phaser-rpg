import Phaser from 'phaser';
import CST from '../CST';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.MENU
    });
  }

  init() {}
  create() {
    let currentFrame = 19;
    let tower = this.add.image(-200, 0, 'tower').setOrigin(0);
    tower.setScale(0.63).setDepth(0);
    this.add
      .image(
        this.game.renderer.width / 2,
        this.game.renderer.height * 0.2,
        'title'
      )
      .setDepth(1);
    let hoverBat = this.add.sprite(100, 100, 'bat');
    let soundButton = this.add.sprite(750, 550, 'button', 19);
    soundButton.setScale(2);

    hoverBat.setScale(2);

    this.anims.create({
      key: 'mute',
      frameRate: 2,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('button', {
        frames: [18, 19]
      })
    });

    this.anims.create({
      key: 'fly',
      frameRate: 4,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('bat', {
        frames: [1, 2, 3]
      })
    });

    hoverBat.setVisible(false);
    let playButton = this.add
      .image(
        this.game.renderer.width / 2,
        this.game.renderer.height * 0.55,
        'play'
      )
      .setDepth(1);

    soundButton.setInteractive();
    soundButton.on('pointerover', () => {
      soundButton.play('mute');
    });
    soundButton.on('pointerout', () => {
      soundButton.anims.stop();
      soundButton.setFrame(currentFrame);
    });
    soundButton.on('pointerup', () => {
      soundButton.anims.stop();
      if (currentFrame === 19) {
        currentFrame = 18;
        this.sound.play('title-song', {
          loop: true,
          volume: 0.3
        });
      } else {
        currentFrame = 19;
        this.sound.stopAll();
      }
      soundButton.setFrame(currentFrame);
    });
    playButton.setInteractive();
    playButton.on('pointerover', () => {
      console.log('hover');
      hoverBat.setVisible(true);
      hoverBat.play('fly');
      hoverBat.x = playButton.x - playButton.width;
      hoverBat.y = playButton.y;
    });
    playButton.on('pointerout', () => {
      hoverBat.setVisible(false);
    });
    playButton.on('pointerup', () => {
      this.sound.stopAll();
      this.scene.start(CST.SCENES.PLAYLOAD);
    });
  }
}
