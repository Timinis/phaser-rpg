import Phaser from 'phaser';
import CST from '../CST.js';
import tower from '../assets/tower.jpeg';

export class LoadScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.LOAD
    });
  }
  init() {}

  preload() {
    this.load.audio('title-song', './src/assets/title-song.mp3');
    this.load.image('tower', './src/assets/tower.jpeg');
    this.load.image('title', tower);
    this.load.image('play', './src/assets/play.png');
    this.load.spritesheet('bat', './src/assets/bat.png', {
      frameHeight: 32,
      frameWidth: 32
    });
    this.load.spritesheet('button', './src/assets/button.png', {
      frameHeight: 16,
      frameWidth: 16
    });

    let loadingBar = this.add.graphics({
      color: 0xffffff
    });

    this.load.on('progress', percentage => {
      loadingBar.fillRect(
        this.game.renderer.width / 2,
        0,
        50,
        this.game.renderer.height * percentage
      );
    });
  }

  create() {
    this.scene.start(CST.SCENES.MENU, 'hello from load');
  }
}
