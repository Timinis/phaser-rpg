import Phaser from 'phaser';
import CST from '../CST.js';

export class PlayScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.PLAY
    });
    this.map;
  }
  init(data) {
    this.map = data;
  }

  preload() {}

  create() {
    let sky = this.add.image(0, 0, 'sky').setOrigin(0);
    sky.displayWidth = 800;
    let character = this.add
      .sprite(
        0 + this.map.spawnPoint[0] * 32,
        0 + this.map.spawnPoint[1] * 32,
        'character',
        14
      )
      .setOrigin(0)
      .setScale(1)
      .setDepth(2);

    this.anims.create({
      key: 'stand',
      frameRate: 4,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('character', {
        frames: [10, 10, 10, 16, 10, 10, 10]
      })
    });
    character.play('stand');
    this.map.generated.rooms.forEach(element => {
      for (let i = element.xAxis[0]; i < element.xAxis[1]; i++) {
        for (let j = element.yAxis[0]; j < element.yAxis[1]; j++) {
          let tile = this.add
            .sprite(0 + i * 32, 0 + j * 32, 'tile', 30)
            .setOrigin(0)
            .setScale(1)
            .setDepth(1);
        }
      }
    });
    this.map.generated.tunnels.forEach(element => {
      for (
        let i = element.hTunnel.tunnelRange[0];
        i <= element.hTunnel.tunnelRange[1];
        i++
      ) {
        this.add
          .sprite(0 + i * 32, 0 + element.hTunnel.yCordinates * 32, 'tile', 30)
          .setOrigin(0)
          .setScale(1)
          .setDepth(0);
      }
      console.log(element.vTunnel);
      for (
        let j = element.vTunnel.tunnelRange[0];
        j <= element.vTunnel.tunnelRange[1];
        j++
      ) {
        this.add
          .sprite(0 + element.vTunnel.xCordinates * 32, 0 + j * 32, 'tile', 30)
          .setOrigin(0)
          .setScale(1)
          .setDepth(0);
      }
    });
  }
}
