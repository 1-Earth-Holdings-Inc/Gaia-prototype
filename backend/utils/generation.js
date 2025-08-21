function getGenerationalIdentity(year) {
  if (!year) return '';
  const y = Number(year);
  if (y >= 2013) return 'Generation Alpha';
  if (y >= 1997) return 'Generation Z';
  if (y >= 1981) return 'Generation Y';
  if (y >= 1965) return 'Generation X';
  if (y >= 1946) return 'Baby Boomers';
  if (y >= 1928) return 'Silent Generation';
  return '';
}

module.exports = { getGenerationalIdentity };


