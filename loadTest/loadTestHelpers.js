const getRandomNormalId = (requestParams, context, ee, next) => {
  context.vars.id = Math.floor((Math.random() * 9999999) + 1);
  return next();
};

const getRandomPopularId = (requestParams, context, ee, next) => {
  context.vars.id = Math.floor((Math.random() * 10000) + 1);
  return next();
};

module.exports = {
  getRandomNormalId,
  getRandomPopularId,
};
