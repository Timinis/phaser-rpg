import Phaser from 'phaser';

import { LoadScene } from './scenes/LoadScene';
import { MenuScene } from './scenes/MenuScene';
import { PlayLoadScene } from './scenes/PlayLoadScene.js';
import { PlayScene } from './scenes/PlayScene.js';

const game = new Phaser.Game({
  width: 800,
  height: 600,
  scene: [LoadScene, MenuScene, PlayLoadScene, PlayScene],
  render: {
    pixelArt: true
  }
});
