import Link from 'next/link';

export default function Footer() {
    return (
        <footer style={{
            padding: '60px 0 20px',
            background: '#000',
            color: '#fff',
            marginTop: '60px'
        }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '40px',
                    marginBottom: '40px'
                }}>
                    <div>
                        <Link href="/" style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            fontSize: '24px',
                            fontWeight: '900',
                            letterSpacing: '-1px',
                            marginBottom: '20px'
                        }}>
                            <span style={{ color: 'var(--primary)' }}>Oaxaca</span>
                            <span style={{ color: '#fff' }}>Fit</span>
                            <span style={{ color: 'var(--primary)', fontWeight: '900' }}>.</span>
                            <span style={{ fontSize: '0.7em', fontWeight: '600', color: '#fff' }}>com</span>
                        </Link>
                        <p style={{ color: '#aaa', fontSize: '14px' }}>
                            El directorio número uno de fitness, salud y bienestar en el estado de Oaxaca.
                        </p>
                    </div>
                    <div>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <li><Link href="/directorio" style={{ color: '#fff' }}>Directorio</Link></li>
                            <li><Link href="/sumar-negocio" style={{ color: '#fff' }}>Sumar mi Negocio</Link></li>
                        </ul>
                    </div>
                    <div>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <li><Link href="/aviso-legal" style={{ color: '#fff' }}>Aviso Legal</Link></li>
                            <li><Link href="/terminos" style={{ color: '#fff' }}>Términos y Condiciones</Link></li>
                        </ul>
                    </div>
                    <div>
                        <p style={{ fontSize: '14px', color: '#aaa' }}>
                            ¿Necesitas ayuda?<br />
                            <Link href="https://wa.me/526563230397" style={{ color: 'var(--primary)', fontWeight: '600' }}>WhatsApp Soporte</Link>
                        </p>
                    </div>
                </div>
                <div style={{
                    paddingTop: '20px',
                    borderTop: '1px solid #333',
                    textAlign: 'center',
                    fontSize: '12px',
                    color: '#666'
                }}>
                    &copy; {new Date().getFullYear()} OaxacaFit.com - Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
}
