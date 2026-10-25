export const site = {
  name: 'Just Blinds', descriptor: 'Considered window coverings.',
  domain: process.env.NEXT_PUBLIC_SITE_URL || null,
  business: { email: null as string | null, phone: null as string | null, address: null as string | null, city: null as string | null, country: null as string | null, serviceAreas: [] as string[], instagramUrl: null as string | null },
};
export const navigation = [{ label: 'Home', href: '/' }, { label: 'Our Blinds', href: '/blinds' }, { label: 'Curtains', href: '/curtains' }, { label: 'Gallery', href: '/gallery' }, { label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }];
export const home = {
  hero: 'A considered collection of window blinds for spaces that feel as good as they look. Discover simple lines, softer light and a style that feels like home.',
  introduction: 'The right window covering does more than complete a room. It shapes the daylight, creates a sense of privacy and brings everything into balance. We believe choosing blinds should feel inspiring, not overwhelming.',
  collection: 'From minimal roller blinds to soft, tailored folds, explore timeless styles for different rooms, moods and ways of living.',
  manifesto: 'They shape the light, soften the mood and bring a room together. Sometimes, the smallest design choice makes the biggest difference.',
  gallery: 'Quiet corners, open spaces and beautiful natural light. Find ideas for the way you want your rooms to feel.',
  steps: [
    ['Tell us about your space', 'Share a few details about the room, window and look you have in mind.'],
    ['Explore the possibilities', 'Browse blind styles and tell us which details matter most to you.'],
    ['Take the next step', 'Send an enquiry to discuss what may be suitable for your project.'],
  ],
  cta: "Whether you know exactly what you want or are just beginning to explore, we'd love to hear what you have in mind.",
};
export const about = {
  lead: 'We believe the best interiors are made of thoughtful details. A beautifully chosen blind can transform the way light enters a room and how the space feels throughout the day.',
  detail: 'Just Blinds is built around a simple idea: window coverings should feel like a natural part of the home, not an afterthought. We focus on clean styles, considered choices and a welcoming place to begin exploring what could work for your space.',
  style: "Some rooms call for a minimal finish. Others come alive with texture. There isn't one perfect look for every window — the most satisfying choice is the one that fits the room and the people living in it.",
  values: [['Considered simplicity', 'Keep the experience clear, calm and easy to explore.'], ['Attention to detail', 'Care about material, texture, proportion and light.'], ['A personal approach', 'Make room for different styles, spaces and ideas.']],
};
