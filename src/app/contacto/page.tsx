import Link from 'next/link';

export default function Contacto() {
    return (
        <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
            <h1>Contacto</h1>
            <p style={{ marginTop: '20px', color: 'var(--text-light)' }}>
                ¿Tienes alguna duda o sugerencia? Estamos para ayudarte.
            </p>

            <div style={{ marginTop: '60px' }}>
                <Link href="https://wa.me/526563230397" style={{
                    background: '#25D366',
                    color: 'white',
                    padding: '15px 40px',
                    borderRadius: '50px',
                    fontWeight: '700',
                    fontSize: '1.1rem'
                }}>
                    Chatear por WhatsApp
                </Link>
                <p style={{ marginTop: '30px' }}>O escríbenos a: <br /> <strong>contacto@oaxacafit.com</strong></p>
            </div>
        </div>
    );
}
