const isInArray = (id, array) => {
      return array.some(item => item.id ===id);
};

module.exports = isInArray;