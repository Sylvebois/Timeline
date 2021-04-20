import Phaser from 'phaser';
import Game from './scenes/Game';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-app',
  width: 1280,
  height: 700,
  backgroundColor: 0x3f3f3f,
  title: 'Timeline',
  scene: [Game],
};

const game = new Phaser.Game(config);
