import Phaser from 'phaser';
import Menu from './scenes/Menu';
import Game from './scenes/Game';
import TextOnly from './scenes/TextOnly';


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
  scene: [Menu, Game, TextOnly],
};

const game = new Phaser.Game(config);
