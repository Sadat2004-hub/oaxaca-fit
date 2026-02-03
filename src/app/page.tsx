import Image from 'next/image';
import Link from 'next/link';

const categories = [
  { name: 'CrossFit & Funcional', icon: '🏋️', slug: 'crossfit' },
  { name: 'Gimnasios Clásicos', icon: '💪', slug: 'gimnasios' },
  { name: 'Yoga & Pilates', icon: '🧘', slug: 'yoga' },
  { name: 'Nutrición & Suplementos', icon: '🥗', slug: 'nutricion' },
  { name: 'Artes Marciales', icon: '🥋', slug: 'artes-marciales' },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        background: '#000'
      }}>
        <Image
          src="/images/hero.png"
          alt="Oaxaca Fit Hero"
          fill
          style={{ objectFit: 'cover', opacity: 0.6 }}
          priority
        />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="hero-title" style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '20px', textShadow: '2px 2px 10px rgba(0,0,0,0.5)' }}>
            Encuentra tu Gimnasio o Coach ideal en Oaxaca
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '40px', maxWidth: '700px', margin: '0 auto 40px' }}>
            La plataforma definitiva para alcanzar tus metas de salud y bienestar en el corazón de Oaxaca.
          </p>

          {/* Search Bar */}
          <div className="search-container" style={{
            background: 'white',
            padding: '10px',
            borderRadius: '50px',
            display: 'flex',
            maxWidth: '800px',
            margin: '0 auto',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            <input
              type="text"
              placeholder="¿Qué buscas? (ej. CrossFit)"
              className="search-input"
              style={{
                flex: 1,
                padding: '15px 25px',
                border: 'none',
                borderRadius: '50px',
                fontSize: '1rem',
                outline: 'none',
                color: '#333'
              }}
            />
            <input
              type="text"
              placeholder="Zona (ej. Reforma)"
              className="search-input"
              style={{
                flex: 1,
                padding: '15px 25px',
                border: 'none',
                borderLeft: '1px solid #ddd',
                fontSize: '1rem',
                outline: 'none',
                color: '#333'
              }}
            />
            <button className="search-button" style={{
              background: 'var(--primary)',
              color: 'white',
              padding: '15px 40px',
              borderRadius: '50px',
              fontSize: '1rem',
              fontWeight: '700'
            }}>
              Buscar
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '50px', fontSize: '2.5rem' }}>Categorías Destacadas</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            {categories.map((cat) => (
              <Link href={`/directorio/${cat.slug}`} key={cat.slug} className="category-card" style={{
                background: 'var(--surface)',
                padding: '40px 20px',
                borderRadius: 'var(--radius)',
                textAlign: 'center',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                display: 'block',
                border: '1px solid var(--border)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>{cat.icon}</div>
                <h3 style={{ fontSize: '1.2rem' }}>{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '80px 0',
        background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>¿Tienes un negocio fitness?</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '40px', opacity: 0.9 }}>
            Únete a la comunidad más grande de Oaxaca y aumenta tu visibilidad.
          </p>
          <Link href="/sumar-negocio" style={{
            background: 'white',
            color: 'var(--primary)',
            padding: '18px 50px',
            borderRadius: '50px',
            fontSize: '1.1rem',
            fontWeight: '800',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
          }}>
            Aparece en OaxacaFit
          </Link>
        </div>
      </section>
    </div>
  );
}
