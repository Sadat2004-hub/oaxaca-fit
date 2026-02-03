
import Link from 'next/link';
import Image from 'next/image';
import { listings } from '@/data/listings';
import { notFound } from 'next/navigation';

// Map slugs to display names and icons
const categoryInfo: Record<string, { name: string; icon: string; description: string }> = {
    'crossfit': {
        name: 'CrossFit & Funcional',
        icon: '🏋️',
        description: 'Centros de alto rendimiento para superar tus límites.'
    },
    'gimnasios': {
        name: 'Gimnasios Clásicos',
        icon: '💪',
        description: 'Equipamiento completo para tu rutina de musculación y cardio.'
    },
    'yoga': {
        name: 'Yoga & Pilates',
        icon: '🧘',
        description: 'Conecta cuerpo y mente en los mejores estudios de la ciudad.'
    },
    'nutricion': {
        name: 'Nutrición & Suplementos',
        icon: '🥗',
        description: 'Expertos que te ayudarán a alcanzar tus metas alimenticias.'
    },
    'artes-marciales': {
        name: 'Artes Marciales',
        icon: '🥋',
        description: 'Disciplina, defensa personal y acondicionamiento físico.'
    }
};

export function generateStaticParams() {
    return Object.keys(categoryInfo).map((category) => ({
        category,
    }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;
    const info = categoryInfo[category];

    if (!info) {
        // If category doesn't exist in our map, 404
        notFound();
    }

    // Filter listings by category slug
    const categoryListings = listings.filter(item => item.categorySlug === category);

    return (
        <div style={{ minHeight: '100vh', paddingBottom: '80px' }}>
            {/* Category Hero */}
            <section style={{
                background: 'linear-gradient(135deg, var(--surface) 0%, #fff 100%)',
                padding: '80px 0 40px',
                textAlign: 'center',
                borderBottom: '1px solid var(--border)'
            }}>
                <div className="container">
                    <div style={{ fontSize: '4rem', marginBottom: '10px' }}>{info.icon}</div>
                    <h1 style={{
                        fontSize: '3rem',
                        fontWeight: '800',
                        marginBottom: '10px',
                        background: 'linear-gradient(45deg, var(--primary) 0%, var(--accent) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        display: 'inline-block'
                    }}>
                        {info.name}
                    </h1>
                    <p style={{
                        fontSize: '1.2rem',
                        color: 'var(--text-light)',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        {info.description}
                    </p>
                </div>
            </section>

            {/* Listings Grid */}
            <section className="container" style={{ marginTop: '40px' }}>
                {categoryListings.length > 0 ? (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '30px'
                    }}>
                        {categoryListings.map((listing) => (
                            <Link
                                href={`/directorio/${category}/${listing.slug}`}
                                key={listing.id}
                                className="listing-card"
                                style={{
                                    background: 'white',
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                                    border: '1px solid var(--border)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                                }}
                            >
                                <div style={{ position: 'relative', height: '220px', width: '100%' }}>
                                    <Image
                                        src={listing.image}
                                        alt={listing.name}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        top: '15px',
                                        right: '15px',
                                        background: 'white',
                                        padding: '5px 12px',
                                        borderRadius: '20px',
                                        fontSize: '0.8rem',
                                        fontWeight: '700',
                                        color: 'var(--primary)',
                                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                                    }}>
                                        4.9 ⭐
                                    </div>
                                </div>

                                <div style={{ padding: '25px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '10px', lineHeight: '1.3' }}>
                                        {listing.name}
                                    </h3>
                                    <p style={{
                                        fontSize: '0.95rem',
                                        color: 'var(--text-light)',
                                        marginBottom: '20px',
                                        lineHeight: '1.5',
                                        flex: 1
                                    }}>
                                        {listing.address.split(',')[0]}...
                                    </p>

                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginTop: 'auto'
                                    }}>
                                        <span style={{
                                            fontSize: '0.9rem',
                                            color: 'var(--primary)',
                                            fontWeight: '600'
                                        }}>
                                            Ver detalles →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div style={{
                        textAlign: 'center',
                        padding: '60px 20px',
                        background: 'var(--surface)',
                        borderRadius: '20px',
                        border: '2px dashed var(--border)'
                    }}>
                        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🧐</div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '15px' }}>
                            Aún no hay lugares registrados en esta categoría
                        </h3>
                        <p style={{ color: 'var(--text-light)', marginBottom: '30px' }}>
                            ¿Conoces un buen lugar que debería estar aquí? O si eres dueño, ¡únete a OaxacaFit!
                        </p>
                        <Link href="/sumar-negocio" style={{
                            background: 'var(--primary)',
                            color: 'white',
                            padding: '12px 30px',
                            borderRadius: '50px',
                            fontWeight: '600',
                            display: 'inline-block'
                        }}>
                            Registrar Negocio
                        </Link>
                    </div>
                )}
            </section>
        </div>
    );
}
