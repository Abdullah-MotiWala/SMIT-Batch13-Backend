const getCode = (digits = 4) => {
  const randomNum = Math.random();
  const code = Math.round(randomNum * 10 ** digits);
  return code;
};

module.exports = { getCode };
