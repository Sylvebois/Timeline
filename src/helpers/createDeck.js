export default function createDeck() {
  const cardsData = [
    { id: 0, name: 'Le Parthénon', date: -447 },
    { id: 1, name: 'Notre-Dame de Paris', date: 1162 },
    { id: 2, name: 'Le mont Saint-Michel', date: 708 },
    { id: 3, name: 'La pyramide de Khéops', date: -2560 },
    { id: 4, name: 'Le Colisée', date: 70 },
    { id: 5, name: 'La tour Eiffel', date: 1887 },
    { id: 6, name: 'La tour de Pise', date: 1172 },
    { id: 7, name: 'Le Palais idéal', date: 1879 },
    { id: 8, name: 'La statue de la Liberté', date: 1886 },
    { id: 9, name: 'Le Taj Mahal', date: 1621 },
    { id: 10, name: 'Le cercle de Stonehenge', date: -2800 },
    { id: 11, name: 'Les alignements de Carnac', date: -5000 }
  ];

  return Phaser.Math.RND.shuffle(cardsData);
}