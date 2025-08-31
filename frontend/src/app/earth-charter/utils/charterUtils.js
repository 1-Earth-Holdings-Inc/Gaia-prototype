/**
 * Earth Charter utility functions
 */

export const formatUserName = (user) => {
  if (!user) return '';
  return `${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}`;
};

export const formatSignatureDate = () => {
  return new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

export const validateSignature = (signatureText, user) => {
  if (!signatureText || !signatureText.trim()) {
    return {
      isValid: false,
      error: 'Thou must inscribe thy name upon this sacred parchment.'
    };
  }
  
  return {
    isValid: true,
    error: null
  };
};

export const charterTextContent = {
  greeting: "Dear Guardian,",
  paragraphs: [
    "Thou art hereby invited to join ranks with the Knights of Gaia and pledge thy sacred oath to our Mother Earth. Here thou wilt be greeted with wisdom of ancient ways, knowledge of the natural world, and sacred bonds that tie all living beings to the eternal cycle of life.",
    "By the power vested in us by the ancient spirits of forest, mountain, and sea, we call upon thee to become a Guardian of the Sacred Realm. Shouldst thou accept this calling, thy name shall be inscribed in the Great Book of Planetarians, and thou shalt be granted the title of Earth's Protector.",
    "Upon reading this scroll, please tell thy local Earth Knight if thou wilt or wilt not take up our offering of peace, harmony, and sacred duty to preserve the natural order for generations yet unborn."
  ],
  signature: {
    yours: "Yours truly,",
    author: "King Gaia of the Sacred Order"
  },
  oath: [
    "I pledge to uphold the sacred ways of Mother Earth,",
    "to protect and cherish all living creatures,",
    "and to stand as Guardian of Gaia for all time."
  ]
};

export const scrollStyles = {
  background: `
    linear-gradient(135deg, #F5F5DC 0%, #F5DEB3 25%, #DEB887 50%, #D2B48C 75%, #BC8F8F 100%),
    radial-gradient(circle at 20% 20%, rgba(139, 69, 19, 0.15) 0%, transparent 30%),
    radial-gradient(circle at 80% 20%, rgba(160, 82, 45, 0.12) 0%, transparent 30%),
    radial-gradient(circle at 40% 60%, rgba(210, 180, 140, 0.2) 0%, transparent 40%),
    radial-gradient(circle at 60% 40%, rgba(245, 222, 179, 0.1) 0%, transparent 40%),
    url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23A0522D' fill-opacity='0.08'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30v60C46.569 60 30 46.569 30 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
  `,
  pageBackground: `
    radial-gradient(circle at 25% 25%, rgba(210, 180, 140, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(245, 222, 179, 0.3) 0%, transparent 50%),
    linear-gradient(135deg, #F5DEB3 0%, #F4A460 50%, #DEB887 100%)
  `
};
