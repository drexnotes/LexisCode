const { body, check } = require('express-validator');

module.exports = {
  searchES: () => {
    return [
      check("name", "Name is required!").not().isEmpty(),
    ]
  }
}