import Link from 'next/link';

export default function SumarNegocio() {
    const waLink = `https://wa.me/526563230397?text=Hola,%20quiero%20más%20información%20sobre%20cómo%20anunciar%20mi%20negocio%20en%20OaxacaFit.`;

    return (
        <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '20px' }}>Haz crecer tu negocio Fitness</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', marginBottom: '60px', maxWidth: '700px', margin: '0 auto 60px' }}>
                Llega a miles de personas interesadas en mejorar su salud en Oaxaca. Aparece en los primeros resultados y aumenta tus clientes.
            </p>

            <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginBottom: '60px'
            }}>
                <div style={{ padding: '40px', background: 'var(--surface)', borderRadius: 'var(--radius)' }}>
                    <h3 style={{ marginBottom: '15px' }}>Mayor Visibilidad</h3>
                    <p>Aparece en las búsquedas locales de Google y en nuestro directorio especializado.</p>
                </div>
                <div style={{ padding: '40px', background: 'var(--surface)', borderRadius: 'var(--radius)' }}>
                    <h3 style={{ marginBottom: '15px' }}>Lead Directo</h3>
                    <p>Los clientes te contactan directamente por WhatsApp, sin intermediarios.</p>
                </div>
                <div style={{ padding: '40px', background: 'var(--surface)', borderRadius: 'var(--radius)' }}>
                    <h3 style={{ marginBottom: '15px' }}>Posicionamiento</h3>
                    <p>Mejora el SEO de tu negocio con un enlace de alta calidad desde OaxacaFit.</p>
                </div>
            </div>

            <Link href={waLink} target="_blank" style={{
                background: 'var(--primary)',
                color: 'white',
                padding: '20px 60px',
                borderRadius: '50px',
                fontSize: '1.2rem',
                fontWeight: '800',
                display: 'inline-block',
                boxShadow: '0 10px 30px rgba(255, 107, 0, 0.3)'
            }}>
                ¡Quiero registrar mi negocio!
            </Link>
        </div>
    );
}
