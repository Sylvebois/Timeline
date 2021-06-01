import Phaser from 'phaser';
import Menu from './scenes/Menu';
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
  scene: [Menu, Game],
};

const game = new Phaser.Game(config);
