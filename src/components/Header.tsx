import Link from 'next/link';

export default function Header() {
  return (
    <header style={{
      padding: '20px 0',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      background: 'rgba(255,255,255,0.8)',
      backdropFilter: 'blur(10px)',
      zIndex: 1000
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'baseline',
          fontSize: '24px',
          fontWeight: '900',
          letterSpacing: '-1px'
        }}>
          <span style={{ color: 'var(--primary)' }}>Oaxaca</span>
          <span style={{ color: 'black' }}>Fit</span>
          <span style={{ color: 'var(--primary)', fontWeight: '900' }}>.</span>
          <span style={{ fontSize: '0.7em', fontWeight: '600', color: 'black' }}>com</span>
        </Link>
        <nav style={{ display: 'flex', gap: '24px', fontWeight: '500', alignItems: 'center' }}>
          <Link
            href="/blog"
            style={{
              background: 'var(--primary)',
              color: 'white',
              padding: '10px 25px',
              borderRadius: '50px',
              fontWeight: '600',
              boxShadow: '0 4px 15px rgba(255, 107, 0, 0.3)',
              transition: 'transform 0.2s',
            }}
          >
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
}
