const lol = (m, s, c) =>
  s[m.floor(m.random() * s.length)] + (c && lol(m, s, c - 1));

export const hexToRGB = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return `rgba(${r},${g},${b},${alpha})`;
  }
  return `rgb(${r},${g},${b})`;
};

export default () => `#${lol(Math, '0123456789ABCDEF', 4)}`;
