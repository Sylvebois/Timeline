import CardsManager from '../helpers/CardsManager';
import ZonesManager from '../helpers/ZonesManager';
import AnimationManager from '../helpers/AnimationsManager';

import cardsImg from '../assets/timeline-cards.png';

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });
    // This is the real size of the card * scaling factor
    this.cardWidth = 160 * 0.75;
    this.cardHeight = 240 * 0.75;
  }

  preload() {
    this.load.spritesheet('cards', cardsImg, { frameWidth: this.cardWidth / 0.75, frameHeight: this.cardHeight / 0.75 });
  }

  create() {
    let nbPlayers = 2;

    // Intialize the zones
    this.zonesManager = new ZonesManager(this);
    this.dropZone = this.zonesManager.addZone(200 + this.cardWidth * 4, this.game.config.height / 2, this.cardWidth * 8, this.cardHeight + this.cardHeight / 2, 'dropZone');
    this.deckZone = this.zonesManager.addContainer(10, 135, this.cardWidth, this.cardHeight, 'deckZone');
    this.trashZone = this.zonesManager.addContainer(10, 385, this.cardWidth, this.cardHeight, 'trashZone');
    this.playerOne = this.zonesManager.addContainer(200, 510, this.cardWidth * 4, this.cardHeight, 'playerOne');
    this.playerTwo = this.zonesManager.addContainer(200, 10, this.cardWidth * 4, this.cardHeight, 'playerTwo');

    // Initialize the data
    this.cardsManager = new CardsManager(this);
    this.cardsManager.createDeck(this.deckZone);
    this.cardsManager.initialDeal([this.playerOne, this.playerTwo], this.deckZone, this.dropZone);
    this.input.setDraggable(this.playerOne.list);
    this.currentPlayer = this.playerOne;

    // Initialize the visual interface
    this.playerOneOutline = this.zonesManager.renderContainer(this.playerOne);
    this.playerOne.depth = 1000;
    this.playerTwoOutline = this.zonesManager.renderContainer(this.playerTwo);
    this.playerTwo.depth = 1000;
    this.dropZoneOutline = this.zonesManager.renderDropZone(this.dropZone);

    // Add events
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.setScale(0.75);
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on('dragend', function (pointer, gameObject, dropped) {
      if (!dropped) {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }
    });

    this.input.on('drop', (pointer, gameObject) => {
      this.currentPlayer.remove(gameObject);

      let cardsPlaced = this.dropZone.getData('cards');
      let placeIndex = this.cardsManager.getDroppedCardIndex(pointer.upX, gameObject, cardsPlaced);

      if (!cardsPlaced.length || placeIndex >= 0) {
        gameObject.cardData.dateText = this.add.text(0, 0, gameObject.cardData.date).setOrigin(0.5, 1);
        this.cardsManager.placeCard(gameObject, placeIndex, this.dropZone);

        if (!this.currentPlayer.list.length) {
          console.log('you win !!!')
        }
      }
      else {
        this.cardsManager.moveToTrash(gameObject, this.trashZone);

        if (!this.deckZone.list.length && this.trashZone.list.length) {
          this.cardsManager.fillDeck(this.deckZone, this.trashZone);
        }

        this.cardsManager.dealCard(this.currentPlayer, this.deckZone);
        this.input.setDraggable(this.currentPlayer.list);
      }
    })

    this.input.on('pointerover', function (pointer, gameObject) {
      if (gameObject[0].parentContainer) {
        gameObject[0].parentContainer.bringToTop(gameObject[0]);
      }
      gameObject[0].setScale(1);
    });

    this.input.on('pointerout', function (pointer, gameObject) {
      gameObject[0].setScale(0.75);
    });
  }

  update() {

  }
}