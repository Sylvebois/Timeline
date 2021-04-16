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
        if (playerZone.name == 'playerOneZone') {
          card.setOrigin(0, 1);
          card.x = cardIndex * 140;
          card.y = playerZone.height;
          card.setInteractive();
        }
        else {
          card.x = cardIndex * 140;
          card.y = 0;
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

  dealCard(player, cardsDeck) {
    cardsDeck[cardsDeck.length - 1].img.setInteractive();
    this.scene.input.setDraggable(cardsDeck[cardsDeck.length - 1].img);
    player.push(cardsDeck[cardsDeck.length - 1]);
    cardsDeck.pop();
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