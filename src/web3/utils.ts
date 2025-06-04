import BN from 'bn.js';
import Decimal from 'decimal.js';

Decimal.set({ toExpNeg: -100, toExpPos: 100 });

export const movePointRight = (value, point) => {
  return new Decimal(value).times(new Decimal(10).pow(point)).toString();
};

export const movePointLeft = (value, point) => {
  return new Decimal(value).div(new Decimal(10).pow(point)).toString();
};

export const convertBN = (obj) => {
  if (obj && obj.toBase58) {
    return obj.toBase58();
  }

  if (BN.isBN(obj)) {
    return obj.toString();
  }

  if (Array.isArray(obj)) {
    return obj.map(convertBN);
  }

  if (typeof obj === 'object' && obj !== null) {
    return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, convertBN(value)]));
  }

  return obj;
};

export const toBN = (value) => {
  return new BN(value);
};

export const toBuffer = (value) => {
  const buffer = Buffer.alloc(8);
  buffer.writeBigUInt64LE(BigInt(value));

  return buffer;
};
