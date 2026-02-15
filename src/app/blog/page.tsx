import Link from 'next/link';

export default function BlogPage() {
    return (
        <div className="container" style={{ padding: '80px 20px', minHeight: '60vh' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '20px' }}>Blog de Salud & Bienestar</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', marginBottom: '60px' }}>
                Tips, guías y consejos de expertos para llevar tu vida fitness al siguiente nivel en Oaxaca.
            </p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '40px'
            }}>
                {/* Placeholder post */}
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '20px' }}>
                    <div style={{ height: '200px', background: '#eee', borderRadius: 'var(--radius)', marginBottom: '20px' }}></div>
                    <span style={{ color: 'var(--primary)', fontSize: '12px', fontWeight: '700' }}>NUTRICIÓN</span>
                    <h2 style={{ fontSize: '1.5rem', margin: '10px 0' }}>Cómo empezar una dieta Keto en Oaxaca</h2>
                    <p style={{ color: 'var(--text-light)', marginBottom: '20px' }}>Próximamente estaremos compartiendo los mejores tips de la Coach...</p>
                    <Link href="#" style={{ color: 'var(--primary)', fontWeight: '700' }}>Leer más &rarr;</Link>
                </div>
                {/* More placeholders */}
                {[1, 2].map(i => (
                    <div key={i} style={{ opacity: 0.5 }}>
                        <div style={{ height: '200px', background: '#eee', borderRadius: 'var(--radius)', marginBottom: '20px' }}></div>
                        <h2 style={{ fontSize: '1.5rem', margin: '10px 0' }}>Próximamente...</h2>
                        <p>Estamos preparando contenido de alta calidad para ti.</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
