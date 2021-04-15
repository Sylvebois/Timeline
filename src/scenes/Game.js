import createDeck from '../helpers/createDeck';

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

    let cardsDeck = createDeck();
    let cardsTrash = [];
    let playersHand = new Array(nbPlayers).fill(null).map(elem => elem = []);

    // Give 4 cards to each player
    for (let i = cardsDeck.length - 1, nbLoops = nbPlayers * 4; nbLoops > 0; i--, nbLoops--) {
      let player = i % nbPlayers;
      playersHand[player].push(cardsDeck[i]);
      cardsDeck.pop();
    }

    cardsDeck.forEach((card, cardIndex) => card.img = this.add.sprite(10 + cardIndex * 2, this.game.config.height / 2, 'cards', card.id).setOrigin(0, 0.5));

    playersHand.forEach((player, playerIndex) => {
      player.forEach((card, cardIndex) => card.img = this.add.sprite(200 + cardIndex * 140, this.game.config.height - 10 - playerIndex * 490, 'cards', card.id).setOrigin(0, 1).setInteractive());
      this.add.text(10, this.game.config.height - 50 - playerIndex * 490, 'Player ' + (playerIndex + 1));
    })

    playersHand[0][0].img.on('pointerdown', () => {
      let imgId = (playersHand[0][0].img.frame.name == '0') ? playersHand[0][0].id : 0
      playersHand[0][0].img.setTexture('cards', imgId)
    })

  }
}