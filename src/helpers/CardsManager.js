import { Card, cardsData } from "./Card";

export default class CardsManager {
  constructor(scene, cardWith, cardHeight) {
    this.scene = scene;
    this.cardWidth = Math.ceil(scene.cardWidth / 10) * 10;
    this.cardHeight = Math.ceil(scene.cardHeight / 10) * 10;
  }

  /**
   * Create the initial stack of cards.
   * 
   * @param {Phaser.GameObjects.Container} deck - The deck container
   */
  createDeck(deck) {
    let mixedData = Phaser.Math.RND.shuffle(cardsData);

    mixedData.forEach((data, index) => {
      let card = new Card(this.scene);
      deck.add(card.render(index * 2, index * 2, data.id, data).setOrigin(0, 0))
    })
  }

  /**
   * Create the initial hands for all the players.
   * 
   * @param {Phaser.GameObjects.Container[]} players - An array of hand containers
   * @param {Phaser.GameObjects.Container} deck - The deck container
   * @param {Phaser.GameObjects.Zone} dropZone 
   */
  initialDeal(players, deck, dropZone) {
    players.forEach(playerZone => {
      playerZone.add(deck.list.splice(-4, 4));
      playerZone.list.forEach((card, cardIndex) => {
        let y = (playerZone.name == 'playerOne') ? playerZone.height : 0;
        let originY = (playerZone.name == 'playerOne') ? 1 : 0;

        card.setPosition(cardIndex * this.cardWidth, y);
        card.setOrigin(0, originY);
      })
    })
  }

  /**
   * When a card is placed on the wrong place, move it to the trash stack.
   * 
   * @param {Phaser.GameObjects} card - The card to be moved to the trash container
   * @param {Phaser.GameObjects.Container} trash - The trash container
   */
  moveToTrash(card, trash) {
    let pos = trash.list.length * 2;
    card.setOrigin(0, 0);
    card.setPosition(pos, pos);
    card.disableInteractive();
    trash.add(card);
  }

  /**
   * Give a card to the player.
   * 
   * @param {Phaser.GameObjects.Container} player - The player's hand container
   * @param {Phaser.GameObjects.Container} deck - The deck container
   */
  dealCard(player, deck) {
    let card = deck.last;
    let originY = (player.name == 'playerOne') ? 1 : 0;

    card.setOrigin(0, originY);

    deck.remove(card);
    player.add(card);

    player.list.forEach((playerCard, index) => {
      let y = (player.name == 'playerOne') ? player.height : 0;
      playerCard.setPosition(index * this.cardWidth, y);
    });
  }

  /**
   * When the deck is empty, fill it with the trash stack.
   * 
   * @param {Phaser.GameObjects.Container} deck - The deck container
   * @param {Phaser.GameObjects.Container} trash - The trash container
   */
  fillDeck(deck, trash) {
    trash.each(card => deck.add(card));
    trash.removeAll();
    deck.reverse();
  }

  /**
   * 
   * @param {Phaser.GameObjects} card 
   * @param {Number} index 
   * @param {Phaser.GameObjects.Zone} dropZone 
   */
  placeCard(card, index, dropZone) {
    let cardsPlaced = dropZone.getData('cards');
    let nbcardsPlaced = cardsPlaced.length;

    if (index === 0) {
      cardsPlaced.unshift(card);
    }
    else if (index === nbcardsPlaced) {
      cardsPlaced.push(card);
    }
    else {
      cardsPlaced.splice(index, 0, card);
    }

    card.setOrigin(0.5, 0.5);
    card.disableInteractive();

    cardsPlaced.forEach((cardPlaced, cardIndex) => {
      let posX = dropZone.x + cardIndex * this.cardWidth - nbcardsPlaced * this.cardWidth / 2;

      cardPlaced.setPosition(posX, dropZone.y);
      cardPlaced.cardData.dateText.setPosition(posX, dropZone.y - 90);
    })
  }

  /**
   * Check if the card has been dropped at the right position.
   * If correctly dropped, returns the index where the card should be inserted.
   * Else, returns -1.
   * 
   * @param {Number} pointerX - The X position of the pointer when the drop occured
   * @param {Phaser.GameObjects} cardDropped - The card that has been dropped into the zone 
   * @param {Phaser.GameObjects[]} cardsPlaced - An array of cards already present into the zone
   * @returns The index where the card should be put in the array or -1
   */
  getDroppedCardIndex(pointerX, cardDropped, cardsPlaced) {
    let cardsPlacedLength = cardsPlaced.length;

    if (!cardsPlacedLength) {
      return 0;
    }
    else {
      let cardDate = cardDropped.cardData.date;
      let droppedIndex = cardsPlaced.findIndex(card => pointerX >= (card.x - card.width / 2) && pointerX <= (card.x + card.width / 2));

      // If dropped on the first half of the first card or before
      if (droppedIndex <= 0 && pointerX < cardsPlaced[0].x && cardDate < cardsPlaced[0].cardData.date) {
        console.log('case 0 : ' + droppedIndex)
        return 0;
      }
      // If dropped on the second half of the last card or further
      else if ((droppedIndex === -1 || droppedIndex === cardsPlacedLength - 1) && pointerX > cardsPlaced[cardsPlacedLength - 1].x && cardDate > cardsPlaced[cardsPlacedLength - 1].cardData.date) {
        console.log('case 1 : ' + droppedIndex)
        return cardsPlacedLength;
      }
      // If dropped on the first half of a card
      else if (pointerX < cardsPlaced[droppedIndex].x && cardDate > cardsPlaced[droppedIndex-1].cardData.date && cardDate < cardsPlaced[droppedIndex].cardData.date ) {
        console.log('case 2 : ' + droppedIndex)
        return droppedIndex;
      }
      // If dropped on the second half of a card
      else if (pointerX > cardsPlaced[droppedIndex].x && cardDate > cardsPlaced[droppedIndex].cardData.date && cardDate < cardsPlaced[droppedIndex+1].cardData.date ) {
        console.log('case 3 : ' + droppedIndex)
        return droppedIndex + 1;
      }
      else {
        console.log('case 4 : ' + droppedIndex)
        return -1;
      }
    }
  }
}