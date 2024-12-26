const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export const getRandomString = (length: number) => {
  if (Number.isNaN(length) || length < 1) {
    throw new Error('Length must be a positive integer.');
  }

  return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
};
