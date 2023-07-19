class Unauthorized extends Error {
  constructor(err) {
    super(err);
    this.message = 'Авторизуйтесьрннрнрнррн';
    this.statusCode = 401;
  }
}

module.exports = {
  Unauthorized,
};
