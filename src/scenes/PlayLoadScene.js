import Phaser from 'phaser';
import CST from '../CST.js';
import character from '../assets/dungeon/character.png';
import characterBack from '../assets/dungeon/characterBack.png';
import tile from '../assets/dungeon/tile.png';
import monster from '../assets/dungeon/monster.png';
import sky from '../assets/sky.gif';
import * as MapGenerator from '../library/mapGeneration.ts';

export class PlayLoadScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.PLAYLOAD
    });
    this.mapInfo = { size: [24, 18], generated: null, spawnPoint: null };
  }
  init() {}

  preload() {
    this.load.spritesheet('character', character, {
      frameHeight: 32,
      frameWidth: 32
    });
    this.load.spritesheet('characterBack', characterBack, {
      frameHeight: 32,
      frameWidth: 32
    });
    this.load.spritesheet('monster', monster, {
      frameHeight: 32,
      frameWidth: 32
    });
    this.load.spritesheet('tile', tile, {
      frameHeight: 32,
      frameWidth: 32
    });
    this.load.image('sky', sky);

    this.mapInfo.generated = MapGenerator.phaserGridGenerator(
      this.mapInfo.size[0],
      this.mapInfo.size[1]
    );
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
    this.mapInfo.spawnPoint = MapGenerator.randomSpawnPoint(
      this.mapInfo.generated
    );
  }

  create() {
    this.scene.start(CST.SCENES.PLAY, this.mapInfo);
  }
}
