import Phaser from 'phaser';
import CST from '../CST.js';
import tower from '../assets/tower.jpeg';
import song from '../assets/title-song.mp3';
import title from '../assets/title.png';
import play from '../assets/play.png';
import bat from '../assets/bat.png';
import button from '../assets/button.png';

export class LoadScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.LOAD
    });
  }
  init() {}

  preload() {
    this.load.audio('title-song', song);
    this.load.image('tower', tower);
    this.load.image('title', title);
    this.load.image('play', play);
    this.load.spritesheet('bat', bat, {
      frameHeight: 32,
      frameWidth: 32
    });
    this.load.spritesheet('button', button, {
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
