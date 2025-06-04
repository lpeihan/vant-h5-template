import Decimal from 'decimal.js';

Decimal.set({
  toExpNeg: -100,
  toExpPos: 100,
});

export const movePointRight = (value, point) => {
  return new Decimal(value).times(new Decimal(10).pow(point)).toString();
};

export const movePointLeft = (value, point) => {
  return new Decimal(value).div(new Decimal(10).pow(point)).toString();
};
