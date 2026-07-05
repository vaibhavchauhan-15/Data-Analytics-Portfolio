import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Vaibhav Chauhan — Data Analyst Portfolio'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#121212',
          padding: '80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, #22C55E, #39FF14, #66FF66)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: '-120px',
            top: '180px',
            width: '420px',
            height: '420px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(57,255,20,0.4), transparent 70%)',
          }}
        />
        <div style={{ display: 'flex', color: '#B3B3B3', fontSize: '24px', letterSpacing: '4px' }}>
          DATA ANALYST PORTFOLIO
        </div>
        <div style={{ display: 'flex', color: '#F5F5F5', fontSize: '96px', fontWeight: 800, marginTop: '16px' }}>
          Vaibhav Chauhan
        </div>
        <div style={{ display: 'flex', color: '#39FF14', fontSize: '40px', fontWeight: 600, marginTop: '8px' }}>
          Power BI · Python · SQL · ML
        </div>
        <div style={{ display: 'flex', color: '#8B8BA8', fontSize: '28px', marginTop: '24px' }}>
          Delhi, India · Open to Work
        </div>
      </div>
    ),
    { ...size }
  )
}
