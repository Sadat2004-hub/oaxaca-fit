import Link from 'next/link';
import { listings } from '@/data/listings';
import { notFound } from 'next/navigation';
import { getProveedoresByCategory } from '@/lib/sanity.queries';
import { getCategoryData } from '@/lib/utils';
import ListingCard from '@/components/ListingCard';

export const revalidate = 60;

// Map slugs to display names and icons
const categoryInfo: Record<string, { name: string; icon: string; description: string; sanityValue: string; subcategories?: { name: string; slug: string; icon: string }[] }> = {
    'crossfit': {
        name: 'CrossFit & Funcional',
        icon: '🏋️',
        description: 'Centros de alto rendimiento para superar tus límites.',
        sanityValue: 'crossfit'
    },
    'gimnasios': {
        name: 'Gimnasios Pesas',
        icon: '💪',
        description: 'Equipamiento completo para tu rutina de musculación y cardio.',
        sanityValue: 'gym'
    },
    'balance': {
        name: 'Balance',
        icon: '🧘',
        description: 'Estudios dedicados al equilibrio, flexibilidad y bienestar integral.',
        sanityValue: 'balance',
        subcategories: [
            { name: 'Yoga', slug: 'yoga', icon: '🧘' },
            { name: 'Pilates', slug: 'pilates', icon: '🌀' },
            { name: 'Barre', slug: 'barre', icon: '🩰' },
            { name: 'GAP', slug: 'gap', icon: '🍑' }
        ]
    },
    'artes-marciales': {
        name: 'Artes Marciales',
        icon: '🥋',
        description: 'Disciplinas de combate: Golpeo, Agarre, Lucha e Híbridas.',
        sanityValue: 'artes-marciales',
        subcategories: [
            { name: 'Kickboxing', slug: 'kickboxing', icon: '👊' },
            { name: 'Karate', slug: 'karate', icon: '🥋' },
            { name: 'Taekwondo', slug: 'taekwondo', icon: '🥋' },
            { name: 'Judo', slug: 'judo', icon: '🤼' },
            { name: 'Jiu-Jitsu', slug: 'jiu-jitsu', icon: '🥋' },
            { name: 'Lucha Libre', slug: 'lucha-libre', icon: '🤼' },
            { name: 'MMA', slug: 'mma', icon: '⚔️' },
            { name: 'Krav Maga', slug: 'krav-maga', icon: '⚔️' }
        ]
    },
    'boxeo': {
        name: 'Boxeo',
        icon: '🥊',
        description: 'Entrenamiento de boxeo recreativo y competitivo.',
        sanityValue: 'boxeo'
    },
    'raqueta': {
        name: 'Deportes Raqueta',
        icon: '🏸',
        description: 'Tenis, Pádel, Squash y más en las mejores canchas de Oaxaca.',
        sanityValue: 'raqueta',
        subcategories: [
            { name: 'Tenis', slug: 'tenis', icon: '🎾' },
            { name: 'Pádel', slug: 'padel', icon: '🏓' },
            { name: 'Squash', slug: 'squash', icon: '🎾' },
            { name: 'Frontón/Frontenis', slug: 'fronton', icon: '🎾' },
            { name: 'Pickeball', slug: 'pickleball', icon: '🏓' },
            { name: 'Pinpon', slug: 'pinpon', icon: '🏓' },
            { name: 'Bádminton', slug: 'badminton', icon: '🏸' }
        ]
    },
    'gimnasia': {
        name: 'Gimnasia',
        icon: '🤸',
        description: 'Centros de gimnasia artística, rítmica y recreativa en Oaxaca.',
        sanityValue: 'gimnasia'
    },
    'clubes': {
        name: 'Clubes Deportivos',
        icon: '🏢',
        description: 'Clubes con múltiples disciplinas, albercas y gimnasios.',
        sanityValue: 'clubes'
    },
    'acuaticos': {
        name: 'Acuáticos',
        icon: '🏊',
        description: 'Natación y actividades acuáticas para todas las edades.',
        sanityValue: 'acuaticos'
    },
    'baile': {
        name: 'Baile y Danza',
        icon: '💃',
        description: 'Zumba, Pole Dance, Salsa y diversos ritmos para mover el cuerpo.',
        sanityValue: 'baile',
        subcategories: [
            { name: 'Zumba', slug: 'zumba', icon: '💃' },
            { name: 'Ritmos Latinos', slug: 'ritmos-latinos', icon: '🕺' },
            { name: 'Pole Dance', slug: 'pole-dance', icon: '💃' },
            { name: 'Aerial (Telas)', slug: 'aerial', icon: '🎪' },
            { name: 'Salsa', slug: 'salsa', icon: '💃' },
            { name: 'Bachata', slug: 'bachata', icon: '🕺' }
        ]
    },
    'aventura': {
        name: 'Aventura',
        icon: '🚵',
        description: 'Ciclismo, Senderismo, Escalada y Running al aire libre.',
        sanityValue: 'aventura',
        subcategories: [
            { name: 'Ciclismo', slug: 'ciclismo', icon: '🚲' },
            { name: 'Senderismo', slug: 'senderismo', icon: '🥾' },
            { name: 'Escalada', slug: 'escalada', icon: '🧗' },
            { name: 'Running', slug: 'running', icon: '🏃' }
        ]
    },
    'equipo': {
        name: 'Deportes de Equipo',
        icon: '⚽',
        description: 'Futbol, Basquetball y Voleibol en ligas y centros deportivos de Oaxaca.',
        sanityValue: 'equipo',
        subcategories: [
            { name: 'Futbol', slug: 'futbol', icon: '⚽' },
            { name: 'Basquetball', slug: 'basquetball', icon: '🏀' },
            { name: 'Voleibol', slug: 'voleibol', icon: '🏐' }
        ]
    },
    'salud': {
        name: 'Salud Deportiva',
        icon: '🏥',
        description: 'Fisioterapia, Masajes y Nutrición para optimizar tu rendimiento.',
        sanityValue: 'salud',
        subcategories: [
            { name: 'Fisio/Masajes', slug: 'fisioterapia', icon: '🏥' },
            { name: 'Nutrición', slug: 'nutricion', icon: '🥗' }
        ]
    },
    // Subcategory mappings to handle their specific pages
    'yoga': { name: 'Yoga', icon: '🧘', description: 'Estudios de Yoga en Oaxaca.', sanityValue: 'yoga' },
    'pilates': { name: 'Pilates', icon: '🌀', description: 'Estudios de Pilates en Oaxaca.', sanityValue: 'pilates' },
    'barre': { name: 'Barre', icon: '🩰', description: 'Centros de Barre en Oaxaca.', sanityValue: 'barre' },
    'gap': { name: 'GAP', icon: '🍑', description: 'Clases de Glúteos, Abdomen y Pierna.', sanityValue: 'gap' },
    'kickboxing': { name: 'Kickboxing', icon: '👊', description: 'Kickboxing recreativo y competitivo.', sanityValue: 'kickboxing' },
    'karate': { name: 'Karate', icon: '🥋', description: 'Dojos de Karate en Oaxaca.', sanityValue: 'karate' },
    'taekwondo': { name: 'Taekwondo', icon: '🥋', description: 'Escuelas de Taekwondo.', sanityValue: 'taekwondo' },
    'judo': { name: 'Judo', icon: '🤼', description: 'Clases de Judo y defensa personal.', sanityValue: 'judo' },
    'jiu-jitsu': { name: 'Jiu-Jitsu Brasileño', icon: '🥋', description: 'Academias de BJJ.', sanityValue: 'jiu-jitsu' },
    'lucha-libre': { name: 'Lucha Libre', icon: '🤼', description: 'Entrenamiento de Lucha Libre profesional.', sanityValue: 'lucha-libre' },
    'mma': { name: 'MMA', icon: '⚔️', description: 'Artes Marciales Mixtas.', sanityValue: 'mma' },
    'krav-maga': { name: 'Krav Maga', icon: '⚔️', description: 'Defensa personal Krav Maga.', sanityValue: 'krav-maga' },
    'tenis': { name: 'Tenis', icon: '🎾', description: 'Canchas y clases de Tenis.', sanityValue: 'tenis' },
    'padel': { name: 'Pádel', icon: '🏓', description: 'Canchas y clases de Pádel.', sanityValue: 'padel' },
    'squash': { name: 'Squash', icon: '🎾', description: 'Canchas y clases de Squash.', sanityValue: 'squash' },
    'fronton': { name: 'Frontón/Frontenis', icon: '🎾', description: 'Canchas de Frontón y Frontenis.', sanityValue: 'fronton' },
    'pickleball': { name: 'Pickeball', icon: '🏓', description: 'Canchas de Pickeball en Oaxaca.', sanityValue: 'pickleball' },
    'pinpon': { name: 'Pinpon', icon: '🏓', description: 'Mesas y clubes de Pinpon/Tenis de Mesa.', sanityValue: 'pinpon' },
    'badminton': { name: 'Bádminton', icon: '🏸', description: 'Pistas y clubes de Bádminton.', sanityValue: 'badminton' },
    'zumba': { name: 'Zumba', icon: '💃', description: 'Clases de Zumba Fitness.', sanityValue: 'zumba' },
    'ritmos-latinos': { name: 'Ritmos Latinos', icon: '🕺', description: 'Clases de ritmos tropicales y latinos.', sanityValue: 'ritmos-latinos' },
    'pole-dance': { name: 'Pole Dance', icon: '💃', description: 'Estudios de Pole Dance en Oaxaca.', sanityValue: 'pole-dance' },
    'aerial': { name: 'Aerial (Telas)', icon: '🎪', description: 'Clases de Danza Aérea y Telas.', sanityValue: 'aerial' },
    'salsa': { name: 'Salsa', icon: '💃', description: 'Clases de Salsa (Línea, Cubana, etc).', sanityValue: 'salsa' },
    'bachata': { name: 'Bachata', icon: '🕺', description: 'Clases de Bachata para todos los niveles.', sanityValue: 'bachata' },
    'ciclismo': { name: 'Ciclismo', icon: '🚲', description: 'Ciclismo de Ruta y Montaña/MTB.', sanityValue: 'ciclismo' },
    'senderismo': { name: 'Senderismo', icon: '🥾', description: 'Clubes de caminata y Trekking.', sanityValue: 'senderismo' },
    'escalada': { name: 'Escalada', icon: '🧗', description: 'Rocódromos y salidas a roca.', sanityValue: 'escalada' },
    'running': { name: 'Running', icon: '🏃', description: 'Clubes de corredores.', sanityValue: 'running' },
    'futbol': { name: 'Futbol', icon: '⚽', description: 'Canchas y ligas de Futbol.', sanityValue: 'futbol' },
    'basquetball': { name: 'Basquetball', icon: '🏀', description: 'Canchas y ligas de Basquetball.', sanityValue: 'basquetball' },
    'voleibol': { name: 'Voleibol', icon: '🏐', description: 'Canchas y ligas de Voleibol.', sanityValue: 'voleibol' },
    'fisioterapia': { name: 'Fisio & Masajes', icon: '🏥', description: 'Fisioterapia y masajes deportivos.', sanityValue: 'fisioterapia' },
    'nutricion': { name: 'Nutrición', icon: '🥗', description: 'Especialistas en nutrición deportiva.', sanityValue: 'nutricion' }
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

    // 1. Obtener los de Sanity (Fuente de verdad actualizable)
    const sanityListings = await getProveedoresByCategory(info.sanityValue);
    const sanitySlugs = new Set((sanityListings || []).map((s: any) => s.slug));

    // 2. Obtener los locales, pero SOLAMENTE si no están ya en Sanity
    const localListings = listings
        .filter(item => item.categorySlug === category && !sanitySlugs.has(item.slug))
        .map(l => ({
            ...l,
            categoryLabel: l.category
        }));

    // 3. Mezclarlos
    const allListings = [
        ...(sanityListings || []).map((s: any) => {
            const categories = Array.isArray(s.category) ? s.category : [s.category];
            const catData = getCategoryData(categories[0]);
            return {
                ...s,
                categorySlug: catData.slug,
                categoryLabel: catData.label
            };
        }),
        ...localListings
    ].sort((a, b) => {
        const orderA = a.order ?? 100;
        const orderB = b.order ?? 100;
        if (orderA !== orderB) return orderA - orderB;
        return a.name.localeCompare(b.name);
    });

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

                    {/* Subcategories Navigation */}
                    {info.subcategories && (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '15px',
                            marginTop: '30px',
                            flexWrap: 'wrap'
                        }}>
                            {info.subcategories.map(sub => (
                                <Link
                                    key={sub.slug}
                                    href={`/directorio/${sub.slug}`}
                                    style={{
                                        background: 'white',
                                        padding: '10px 20px',
                                        borderRadius: '50px',
                                        border: '1px solid var(--border)',
                                        textDecoration: 'none',
                                        color: 'var(--text)',
                                        fontWeight: '600',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                                        transition: 'all 0.3s ease'
                                    }}
                                    className="subcategory-tag"
                                >
                                    <span>{sub.icon}</span> {sub.name}
                                </Link>
                            ))}
                        </div>
                    )}
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
