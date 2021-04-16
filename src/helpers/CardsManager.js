import { Card, cardsData } from "./Card";

export default class CardsManager {
  constructor(scene) {
    this.scene = scene;
  }

  createDeck(container) {
    let mixedData = Phaser.Math.RND.shuffle(cardsData);

    mixedData.forEach((data, index) => {
      let card = new Card(this.scene);
      container.add(card.render(index * 2, index * 2, data.id, data).setOrigin(0, 0))
    })
  }

  initialDeal(players, deck) {
    players.forEach(playerZone => {
      playerZone.add(deck.list.splice(-4, 4));
      playerZone.list.forEach((card, cardIndex) => {
        let y = (playerZone.name == 'playerOneZone')? playerZone.height : 0;

        card.setPosition(cardIndex * 140, y);

        if (playerZone.name == 'playerOneZone') {
          card.setOrigin(0, 1);
          card.setInteractive();
        }
      })
    })
  }

  moveToTrash(card, trash) {
    let pos = trash.list.length * 2;
    card.disableInteractive();
    card.setOrigin(0, 0);
    card.setPosition(pos, pos);
    trash.add(card);
  }

  dealCard(player, deck) {
    let card = deck.last;

    deck.remove(card);
    player.add(card);

    player.list.forEach((playerCard,index) => {
      let y = (player.name == 'playerOneZone')? player.height : 0;
      playerCard.setPosition(index * 140, y);
    });

    if (player.name == 'playerOneZone') {
      card.setOrigin(0, 1);
      card.setInteractive();
    }
  }

  fillDeck(cardsDeck, cardsTrash) {
    cardsDeck = Phaser.Math.RND.shuffle(cardsTrash);
    cardsTrash = [];
  }

  render(x, y, sprite, imgNb, isPlayerHand = true) {
    let card = this.scene.add.sprite(x, y, sprite, imgNb);

    if (isPlayerHand) {
      card.setInteractive();
      this.scene.input.setDraggable(card);
    }

    return card;
  }
}

/**
 * If using container, we will move one child from one container to another
 */