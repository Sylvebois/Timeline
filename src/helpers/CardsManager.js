import { Card, cardsData } from "./Card";

export default class CardsManager {
  constructor(scene) {
    this.scene = scene;
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
   */
  initialDeal(players, deck) {
    players.forEach(playerZone => {
      playerZone.add(deck.list.splice(-4, 4));
      playerZone.list.forEach((card, cardIndex) => {
        let y = (playerZone.name == 'playerOneZone') ? playerZone.height : 0;

        card.setPosition(cardIndex * 140, y);

        if (playerZone.name == 'playerOneZone') {
          card.setOrigin(0, 1);
          card.setInteractive();
        }
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
    card.disableInteractive();
    card.setOrigin(0, 0);
    card.setPosition(pos, pos);
    trash.add(card);
  }

  /**
   * Give a card to the player.
   * 
   * @param {*} player - The player's hand container
   * @param {*} deck - The deck container
   */
  dealCard(player, deck) {
    let card = deck.last;

    deck.remove(card);
    player.add(card);

    player.list.forEach((playerCard, index) => {
      let y = (player.name == 'playerOneZone') ? player.height : 0;
      playerCard.setPosition(index * 140, y);
    });

    if (player.name == 'playerOneZone') {
      card.setOrigin(0, 1);
      card.setInteractive();
    }
  }

  /**
   * When the deck is empty, fill it with the trash stack.
   * 
   * @param {*} deck - The deck container
   * @param {*} trash - The trash container
   */
  fillDeck(deck, trash) {
    trash.each(card => deck.add(card));
    trash.removeAll();
    deck.reverse();
  }

  placeCard(card, index, dropZone) {
    let cardsPlaced = dropZone.getData('cards');

    if (index === 0) {
      cardsPlaced.unshift(card);
    }
    else if (index === cardsPlaced.length) {
      cardsPlaced.push(card);
    }
    else {
      cardsPlaced.splice(index, 0, card);
    }

    card.setOrigin(0.5, 0.5);
    card.disableInteractive();

    cardsPlaced.forEach((cardPlaced, cardIndex) => {
      cardPlaced.setPosition(dropZone.x + cardIndex * 140, dropZone.y);
    })

  }

  //TO DO Optimization
  getDroppedCardIndex(pointerX, cardDropped, cardsPlaced) {
    let cardDate = cardDropped.cardData.date;

    if (!cardsPlaced.length) {
      return 0;
    }
    else if (cardsPlaced.length === 1) {
      if (pointerX <= cardsPlaced[0].x && cardDate < cardsPlaced[0].cardData.date) {
        return 0;
      }
      else if (pointerX > cardsPlaced[0].x && cardDate > cardsPlaced[0].cardData.date) {
        return 2;
      }
      else {
        return -1;
      }
    }
    else {
      let indexDown, indexUp;
      let closestDown = -100000;
      let closestUp = 100000;

      cardsPlaced.forEach((cardPlaced, cardIndex) => {
        let diff = cardPlaced.x - pointerX;

        if (diff < 0 && closestDown < diff) {
          indexDown = cardIndex;
        }
        else if (diff > 0 && closestUp > diff) {
          indexUp = cardIndex;
        }
      });

      if (typeof (indexDown) == 'undefined' && cardDate < cardsPlaced[0].cardData.date) {
        return 0;
      }
      else if (typeof (indexUp) == 'undefined' && cardDate > cardsPlaced[cardsPlaced.length - 1].cardData.date) {
        return cardsPlaced.length;
      }
      else if (indexDown >= 0 && indexUp >= 0 && cardDate > cardsPlaced[indexDown].cardData.date && cardDate < cardsPlaced[indexUp].cardData.date) {
        return indexUp;
      }
      else {
        return -1;
      }
    }
  }
}