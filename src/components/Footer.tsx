import Link from 'next/link';

export default function Footer() {
    return (
        <footer style={{
            padding: '60px 0 20px',
            background: 'var(--surface)',
            borderTop: '1px solid var(--border)',
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
                        <h3 style={{ marginBottom: '20px', color: 'var(--primary)' }}>OaxacaFit</h3>
                        <p style={{ color: 'var(--text-light)', fontSize: '14px' }}>
                            El directorio número uno de fitness, salud y bienestar en el estado de Oaxaca.
                        </p>
                    </div>
                    <div>
                        <h4 style={{ marginBottom: '20px' }}>Enlaces Rápidos</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <li><Link href="/directorio">Directorio</Link></li>
                            <li><Link href="/blog">Blog</Link></li>
                            <li><Link href="/sumar-negocio">Sumar mi Negocio</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ marginBottom: '20px' }}>Legal</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <li><Link href="/aviso-legal">Aviso Legal</Link></li>
                            <li><Link href="/terminos">Términos y Condiciones</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ marginBottom: '20px' }}>Contacto</h4>
                        <p style={{ fontSize: '14px', color: 'var(--text-light)' }}>
                            ¿Necesitas ayuda?<br />
                            <Link href="https://wa.me/526563230397" style={{ color: 'var(--secondary)', fontWeight: '600' }}>WhatsApp Soporte</Link>
                        </p>
                    </div>
                </div>
                <div style={{
                    paddingTop: '20px',
                    borderTop: '1px solid var(--border)',
                    textAlign: 'center',
                    fontSize: '12px',
                    color: 'var(--text-light)'
                }}>
                    &copy; {new Date().getFullYear()} OaxacaFit.com - Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
}
