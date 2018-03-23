const randomUnpopularId = (requestParams, context, ee, next) => {
  context.vars.id = Math.floor(Math.random() * 9999999);
  return next();
};

const randomPopularId = (requestParams, context, ee, next) => {
  context.vars.id = Math.floor(Math.random() * 1000);
  return next();
};

module.exports = {
  randomUnpopularId,
  randomPopularId,
};
