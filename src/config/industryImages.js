export const getIndustryHeroImage = (slug) => {
  const mapping = {
    'healthcare': 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=80',
    'e-commerce-retail': 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1600&q=80',
    'real-estate': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80',
    'education-edtech': 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&q=80',
    'banking-finance-bfsi': 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1600&q=80',
    'manufacturing': 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=1600&q=80',
    'logistics-transportation': 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1600&q=80',
    'hospitality-travel': 'https://images.unsplash.com/photo-1517840901100-8179e982acb7?w=1600&q=80',
    'agriculture-agritech': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&q=80',
    'media-entertainment': 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=1600&q=80',
    'automotive': 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80',
    'legal': 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=1600&q=80',
    'energy': 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1600&q=80',
    'construction': 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&q=80',
    'technology': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80',
    'insurance': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80',
    'non-profit': 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1600&q=80',
    'government': 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1600&q=80',
    'agriculture': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&q=80',
    'media': 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=1600&q=80',
    'startups': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80'
  };
  return mapping[slug] || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80';
};
