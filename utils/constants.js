const RegURL = (/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/);
const RegName = /^[А-ЯA-Zё\s-]+$/imu;
const MongoDB = 'mongodb://127.0.0.1:27017/bitfilmsdb';

module.exports = {
  RegURL,
  MongoDB,
  RegName,
};
