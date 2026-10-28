import { ImageResponse } from 'next/og';
export const alt = 'Screens N Blinds — Beautiful blinds. Better living.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '65px 75px', background: '#1d211f', color: '#f7f6f2', fontFamily: 'sans-serif' }}><div style={{ display: 'flex', fontSize: 24, letterSpacing: 4 }}>SCREENS N BLINDS</div><div style={{ display: 'flex', flexDirection: 'column', fontSize: 86, letterSpacing: -5, lineHeight: 1.08, marginTop: 100 }}><div>Beautiful blinds.</div><div style={{ color: '#b6a895' }}>Better living.</div></div><div style={{ display: 'flex', fontSize: 16, letterSpacing: 3, marginTop: 'auto' }}>WINDOWS, CONSIDERED.</div></div>, size);
}
