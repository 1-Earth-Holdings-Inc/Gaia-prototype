export const calculateGenerationalIdentity = (birthYear) => {
  if (!birthYear) return '';
  
  const year = parseInt(birthYear);
  
  if (year >= 2013) return 'Generation Alpha';
  if (year >= 1997) return 'Generation Z';
  if (year >= 1981) return 'Millennials';
  if (year >= 1965) return 'Generation X';
  if (year >= 1946) return 'Baby Boomers';
  if (year >= 1928) return 'Silent Generation';
  if (year >= 1901) return 'Greatest Generation';
  
  return 'Lost Generation';
};

export const getGenerationalDescription = (generationalIdentity) => {
  const descriptions = {
    'Generation Alpha': 'Born in the digital age, tech-native from birth',
    'Generation Z': 'Digital natives, social media generation',
    'Millennials': 'Came of age during the digital revolution',
    'Generation X': 'Latchkey kids, independent and adaptable',
    'Baby Boomers': 'Post-war generation, optimistic and ambitious',
    'Silent Generation': 'Children of the Great Depression',
    'Greatest Generation': 'Survived the Great Depression and WWII',
    'Lost Generation': 'Came of age during WWI'
  };
  
  return descriptions[generationalIdentity] || '';
};
