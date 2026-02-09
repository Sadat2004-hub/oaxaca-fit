import Link from 'next/link';
import { listings } from '@/data/listings';
import { notFound } from 'next/navigation';
import { getProveedoresByCategory } from '@/lib/sanity.queries';
import { getCategoryData } from '@/lib/utils';
import ListingCard from '@/components/ListingCard';

// Map slugs to display names and icons
const categoryInfo: Record<string, { name: string; icon: string; description: string; sanityValue: string }> = {
    'crossfit': {
        name: 'CrossFit & Funcional',
        icon: '🏋️',
        description: 'Centros de alto rendimiento para superar tus límites.',
        sanityValue: 'crossfit'
    },
    'gimnasios': {
        name: 'Gimnasios Clásicos',
        icon: '💪',
        description: 'Equipamiento completo para tu rutina de musculación y cardio.',
        sanityValue: 'gym'
    },
    'yoga': {
        name: 'Yoga & Pilates',
        icon: '🧘',
        description: 'Conecta cuerpo y mente en los mejores estudios de la ciudad.',
        sanityValue: 'yoga'
    },
    'nutricion': {
        name: 'Nutrición & Suplementos',
        icon: '🥗',
        description: 'Expertos que te ayudarán a alcanzar tus metas alimenticias.',
        sanityValue: 'nutricion'
    },
    'artes-marciales': {
        name: 'Artes Marciales',
        icon: '🥋',
        description: 'Disciplina, defensa personal y acondicionamiento físico.',
        sanityValue: 'boxing'
    }
};

export async function generateStaticParams() {
    return Object.keys(categoryInfo).map((category) => ({
        category,
    }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;
    const info = categoryInfo[category];

    if (!info) {
        notFound();
    }

    // 1. Obtener los locales
    const localListings = listings.filter(item => item.categorySlug === category).map(l => ({
        ...l,
        categoryLabel: l.category
    }));

    // 2. Obtener los de Sanity
    const sanityListings = await getProveedoresByCategory(info.sanityValue);

    // 3. Mezclarlos
    const allListings = [
        ...localListings,
        ...(sanityListings || []).map((s: any) => {
            const catData = getCategoryData(s.category);
            return {
                ...s,
                categorySlug: catData.slug,
                categoryLabel: catData.label
            };
        })
    ];

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
                {allListings.length > 0 ? (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '30px'
                    }}>
                        {allListings.map((listing) => (
                            <ListingCard key={listing.id} listing={listing} />
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
