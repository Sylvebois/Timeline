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
    mixedData.forEach((data, index) => deck.add(new Card(this.scene, index * 2, index * 2, data.id, data).disableInteractive()))
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
        let y = (playerZone.name == 'playerOne') ? playerZone.height - this.cardHeight : 0;
        card.setPosition(cardIndex * this.cardWidth, y);
      })
    })

    this.placeCard(deck.last, 0, dropZone);
    deck.remove(deck.last);
  }

  /**
   * When a card is placed on the wrong place, move it to the trash stack.
   * 
   * @param {Phaser.GameObjects.Container} card - The card to be moved to the trash container
   * @param {Phaser.GameObjects.Container} trash - The trash container
   */
  moveToTrash(card, trash) {
    let pos = trash.list.length * 2;
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

    deck.remove(card);
    player.add(card);

    player.list.forEach((playerCard, index) => {
      let y = (player.name == 'playerOne') ? player.height - this.cardHeight : 0;
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
    deck.list.forEach((card, index) => card.setPosition(index * 2, index * 2));
  }

  /**
   * 
   * @param {Phaser.GameObjects.Container} card 
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

    card.disableInteractive();

    cardsPlaced.forEach((cardPlaced, cardIndex) => {
      let posX = dropZone.x - this.cardWidth / 2 + cardIndex * this.cardWidth - nbcardsPlaced * this.cardWidth / 2;

      cardPlaced.setPosition(posX, dropZone.y - this.cardHeight / 2);
      cardPlaced.last.setVisible(true);
    })
  }

  /**
   * Check if the card has been dropped at the right position.
   * If correctly dropped, returns the index where the card should be inserted.
   * Else, returns -1.
   * 
   * @param {Number} pointerX - The X position of the pointer when the drop occured
   * @param {Phaser.GameObjects.Container} cardDropped - The card that has been dropped into the zone 
   * @param {Phaser.GameObjects[]} cardsPlaced - An array of cards already present into the zone
   * @returns The index where the card should be put in the array or -1
   */
  getDroppedCardIndex(pointerX, cardDropped, cardsPlaced) {
    const cardsPlacedLength = cardsPlaced.length;

    if (!cardsPlacedLength) {
      return 0;
    }
    else {
      let cardDate = cardDropped.cardData.date;
      let droppedIndex = cardsPlaced.findIndex(card => pointerX >= card.x && pointerX <= (card.x + card.width));

      // If dropped on the first half of the first card or before
      if (droppedIndex <= 0 && pointerX < cardsPlaced[0].x && cardDate < cardsPlaced[0].cardData.date) {
        return 0;
      }
      // If dropped on the second half of the last card or further
      else if ((droppedIndex === -1 || droppedIndex === cardsPlacedLength - 1) && pointerX > cardsPlaced[cardsPlacedLength - 1].x && cardDate > cardsPlaced[cardsPlacedLength - 1].cardData.date) {
        return cardsPlacedLength;
      }
      // If dropped on the first half of a card
      else if (droppedIndex >= 0 && pointerX < cardsPlaced[droppedIndex].x && cardDate < cardsPlaced[droppedIndex].cardData.date && cardDate > cardsPlaced[droppedIndex - 1].cardData.date) {
        return droppedIndex;
      }
      // If dropped on the second half of a card
      else if (droppedIndex >= 0 && pointerX > cardsPlaced[droppedIndex].x && cardDate > cardsPlaced[droppedIndex].cardData.date && cardDate < cardsPlaced[droppedIndex + 1].cardData.date) {
        return droppedIndex + 1;
      }
      else {
        return -1;
      }
    }
  }
}