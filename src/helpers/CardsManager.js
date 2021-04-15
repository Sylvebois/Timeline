export default class CardsManager {
  constructor(scene) {
    this.scene = scene;
  }

  createDeck() {
    const cardsData = [
      { id: 1, name: 'Le Parthénon', date: -447 },
      { id: 2, name: 'Notre-Dame de Paris', date: 1162 },
      { id: 3, name: 'Le mont Saint-Michel', date: 708 },
      { id: 4, name: 'La pyramide de Khéops', date: -2560 },
      { id: 5, name: 'Le Colisée', date: 70 },
      { id: 6, name: 'La tour Eiffel', date: 1887 },
      { id: 7, name: 'La tour de Pise', date: 1172 },
      { id: 8, name: 'Le Palais idéal', date: 1879 },
      { id: 9, name: 'La statue de la Liberté', date: 1886 },
      { id: 10, name: 'Le Taj Mahal', date: 1621 },
      { id: 11, name: 'Le cercle de Stonehenge', date: -2800 },
      { id: 12, name: 'Les alignements de Carnac', date: -5000 }
    ];
  
    return Phaser.Math.RND.shuffle(cardsData);
  }

  initialDeal(nbPlayers, cardsDeck) {
    let playersHand = new Array(nbPlayers).fill(null).map(elem => elem = []);

    // Give 4 cards to each player
    for (let i = cardsDeck.length - 1, nbLoops = nbPlayers * 4; nbLoops > 0; i--, nbLoops--) {
      let player = i % nbPlayers;
      playersHand[player].push(cardsDeck[i]);
      cardsDeck.pop();
    }

    return playersHand;
  }
  
  moveToTrash(player, cardIndex, cardsTrash) {

  }

  dealCard(player, cardsDeck) {
    player.push(cardsDeck[cardsDeck.length-1]);
    cardsDeck.pop();
  }

  fillDeck(cardsDeck, cardsTrash){
    cardsDeck = Phaser.Math.RND.shuffle(cardsTrash);
    cardsTrash = [];
  }
}