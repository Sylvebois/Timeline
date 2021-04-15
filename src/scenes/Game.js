import CardsManager from '../helpers/CardsManager';
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

    // Intialize the data
    let cardsManager = new CardsManager(this);

    let cardsDeck = cardsManager.createDeck();
    let cardsTrash = [];
    let playersHand = cardsManager.initialDeal(nbPlayers, cardsDeck);

    // Draw the game and add events
    cardsDeck.forEach((card, cardIndex) => card.img = this.add.sprite(10 + cardIndex * 2, this.game.config.height / 3, 'cards', card.id).setOrigin(0, 0.5));
   
    let deckZone = this.add.zone(10, this.game.config.height / 3, 128, 176).setInteractive();

    let trashZone = this.add.graphics();
    trashZone.lineStyle(4, 0xff0000);
    trashZone.strokeRoundedRect(10, this.game.config.height * 2 / 3, 128, 176, 15);

    playersHand.forEach((player, playerIndex) => {
      player.forEach((card, cardIndex) => {
        if (playerIndex == 0) {
          card.img = this.add.sprite(200 + cardIndex * 140, this.game.config.height - 10, 'cards', card.id).setOrigin(0, 1);
        }
        else if (playerIndex == 1) {
          card.img = this.add.sprite(200 + cardIndex * 140, 10, 'cards', card.id).setOrigin(0, 0);
        }
    
        card.img.setInteractive();

        card.img.on('pointerover', () => {
          card.img.depth = 1000;
          card.img.setScale(1.5);
        });
        card.img.on('pointerout', () => {
          card.img.depth = 0;
          card.img.setScale(1)
        });
        card.img.on('pointerdown', () => {
          let imgId = (card.img.frame.name == '0') ? card.id : 0;
          card.img.setTexture('cards', imgId);
        })
      });
    })

    deckZone.on('pointerdown', () => {
      if(!cardsDeck.length) {
        cardsManager.fillDeck(cardsDeck, cardsTrash);
      }
      cardsManager.dealCard(playersHand[0],cardsDeck)
    });
  }

  update() {

  }
}