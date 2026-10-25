import { Gallery } from '@/components/sections/Gallery';
import { PageHeading, SectionCTA } from '@/components/sections/Shared';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata('Blinds Inspiration Gallery', 'Explore interior inspiration with window blinds, thoughtful materials and beautiful natural light.', '/gallery');
export default function GalleryPage() { return <><PageHeading label="The inspiration edit" title="Spaces worth slowing down for." description="A collection of interiors and details that celebrate light, texture and beautifully finished windows. Save an idea or simply enjoy the view." /><Gallery /><SectionCTA title="Inspired by what you see?" copy="Tell us about your window and the look you’re working towards." label="Get in Touch" /></>; }
