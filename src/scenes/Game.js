import ceateDeck from '../helpers/createDeck';

import cardsImg from '../assets/timeline-cards.png';

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });
  }

  preload() {
    this.load.spritesheet('cards', cardsImg, { frameWidth: 128, frameHeight: 176 });
  }

  create() {
    let nbPlayers = 2;
    let cardsDeck = ceateDeck();

    cardsDeck.forEach((card, index) => {
      this.add.sprite(100 + index*130, 100, 'cards', card.id);
    });
  }
}