import Phaser from 'phaser';
import Game from './scenes/Game';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-app',
  width: 1280,
  height: 700,
  title: 'Timeline',
  scale : {
    mode : Phaser.Scale.FIT,
    autoCenter : Phaser.Scale.CENTER_BOTH,
  },
  scene: [Game],
};

const game = new Phaser.Game(config);
