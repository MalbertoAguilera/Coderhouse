const getRandomItem = (stock) => {
      console.log("Cantidad items",stock.length);
      randomIndex = Math.round(Math.random() * (stock.length - 1));
      console.log("INDICE: ",randomIndex);
      return stock[randomIndex];
}

module.exports = getRandomItem;