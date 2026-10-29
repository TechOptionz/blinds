import type { BlindStyle } from './products';
export const blindGuidance: Record<BlindStyle, { character: string; light: string; discuss: string }> = {
  roller: { character: 'A smooth fabric panel and a minimal profile.', light: 'Fabric choice shapes how light passes through the blind.', discuss: 'Fabric opacity, colour, window proportions and how the blind will operate.' },
  roman: { character: 'Tailored fabric with soft, horizontal folds.', light: 'Fabric and lining choices influence the light and privacy.', discuss: 'Texture, lining, fold depth and the space needed above the window.' },
  venetian: { character: 'Crisp horizontal slats with an architectural rhythm.', light: 'Tilting the slats changes the direction of entering light.', discuss: 'Slat material, finish, cleaning needs and suitability for the room.' },
  'double-roller': { character: 'Two fabric layers on one compact bracket.', light: 'A sheer layer filters daylight; a blockout layer closes the window down.', discuss: 'Fabric pairings, bracket depth and which layer sits at the front.' },
  honeycomb: { character: 'Soft pleated cells with a uniform, cushioned look.', light: 'Cell fabric spreads light evenly, from filtered to blockout.', discuss: 'Cell size, fabric opacity and how the blind will be operated.' },
  vertical: { character: 'Tall fabric vanes with a clean, linear rhythm.', light: 'Rotating the vanes angles the light across the room.', discuss: 'Vane width, fabric, stacking side and clearance for doors.' },
  panel: { character: 'Wide, flat panels that glide across the opening.', light: 'Panel fabric sets the mood, from airy sheer to full blockout.', discuss: 'Track channels, panel count, stacking space and fabric weight.' },
  sunscreen: { character: 'An open-weave fabric with a crisp, technical finish.', light: 'Filters glare and UV while keeping the daytime view.', discuss: 'Weave openness, colour and whether a blockout layer is needed at night.' },
  vision: { character: 'Horizontal sheer and solid bands in a modern rhythm.', light: 'Align the bands to move from open to closed.', discuss: 'Band width, fabric colour and control type.' },
  'timber-venetian': { character: 'Wide wooden slats with visible grain.', light: 'Tilting the slats steers sunlight and shade.', discuss: 'Slat width, stain or paint finish and room humidity.' },
  motorised: { character: 'Any style, operated by motor instead of cords.', light: 'Open and close on a schedule or with a remote.', discuss: 'Power supply, control type and which styles to motorise.' },
};
export const blindPriorities = [
  ['Follow the light.', 'Notice when the room is brightest and how you use it throughout the day. Tell us whether you want a brighter backdrop or a more shaded space.'],
  ['Think about privacy.', 'Consider the view into your room from outside, especially after dark. Fabric, slat position and the overall fit all matter.'],
  ['Look at the whole room.', 'Bring together wall colours, furnishings and textures. A blind can quietly blend in or give the window a little more definition.'],
];
export const blindFaqs = [
  ['What is the difference between roller, Roman and Venetian blinds?', 'Roller blinds use a smooth fabric panel, Roman blinds gather into soft folds, and Venetian blinds use horizontal slats. Start with the shape you like, then discuss light, privacy and practical requirements.'],
  ['Which style should I consider for a bedroom?', 'Begin with your light and privacy priorities. Ask about fabric opacity, linings, edge gaps and how the covering will sit around your window. The style alone does not determine how much light is blocked.'],
  ['Can I combine blinds with curtains?', 'Blinds and curtains can work together as a design approach, pairing clean structure with soft fabric. Ask about window clearance, tracks and how both coverings will operate.'],
  ['What details help with an enquiry?', 'Include your preferred style, the room, approximate window dimensions and any priorities such as light, privacy or easy upkeep. Let us know if you are also considering curtains.'],
  ['Are all materials and finishes available?', 'The collection introduces design directions. Ask about the current materials, finishes, operating options and suitability for your particular window before making a final choice.'],
];
