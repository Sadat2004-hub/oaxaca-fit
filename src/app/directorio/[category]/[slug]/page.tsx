import { listings } from '@/data/listings';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    return listings.map((l) => ({
        category: l.categorySlug,
        slug: l.slug,
    }));
}

export default async function ListingPage({ params }: { params: Promise<{ category: string, slug: string }> }) {
    const { category, slug } = await params;
    const listing = listings.find(l => l.slug === slug && l.categorySlug === category);

    if (!listing) return notFound();

    const waLink = `https://wa.me/${listing.whatsapp}?text=Hola,%20vi%20su%20perfil%20en%20OaxacaFit%20y%20quiero%20más%20info.`;

    const schemaData = {
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "ExerciseGym"],
        "name": listing.name,
        "image": listing.image,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": listing.address,
            "addressLocality": "Oaxaca",
            "addressCountry": "MX"
        },
        "url": `https://oaxacafit.com/directorio/${listing.categorySlug}/${listing.slug}`,
        "telephone": listing.whatsapp
    };

    return (
        <div className="animate-fade-in">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />

            {/* Header Info */}
            <section style={{ padding: '40px 0', borderBottom: '1px solid var(--border)' }}>
                <div className="container">
                    <Link href="/directorio" style={{ color: 'var(--text-light)', fontSize: '14px', marginBottom: '10px', display: 'block' }}>
                        &larr; Volver al directorio
                    </Link>
                    <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '10px' }}>{listing.name}</h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-light)' }}>
                        📍 {listing.address} | <span style={{ color: 'var(--primary)', fontWeight: '600' }}>{listing.category}</span>
                    </p>
                </div>
            </section>

            <div className="container listing-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px', padding: '40px 0' }}>
                {/* Main Content */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

                    {/* Gallery Carousel */}
                    <div>
                        <h2 style={{ marginBottom: '20px' }}>Galería</h2>
                        <div style={{
                            display: 'flex',
                            gap: '15px',
                            overflowX: 'auto',
                            paddingBottom: '15px',
                            scrollSnapType: 'x mandatory',
                            msOverflowStyle: 'none',
                            scrollbarWidth: 'none'
                        }} className="carousel-container">
                            {listing.gallery.map((img, i) => (
                                <div key={i} style={{
                                    flex: '0 0 80%',
                                    position: 'relative',
                                    height: '400px',
                                    borderRadius: 'var(--radius)',
                                    overflow: 'hidden',
                                    scrollSnapAlign: 'start'
                                }}>
                                    <Image src={img} alt={`${listing.name} ${i}`} fill style={{ objectFit: 'cover' }} />
                                </div>
                            ))}
                        </div>
                        <p style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '5px' }}>&larr; Desliza para ver más fotos &rarr;</p>
                    </div>

                    {/* Description */}
                    <div>
                        <h2 style={{ marginBottom: '20px' }}>Sobre nosotros</h2>
                        <p style={{ fontSize: '1.1rem', whiteSpace: 'pre-line' }}>{listing.description}</p>
                    </div>

                    {/* Services */}
                    <div>
                        <h2 style={{ marginBottom: '20px' }}>Servicios y Comodidades</h2>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                            {listing.services.map(s => (
                                <span key={s} style={{
                                    background: 'var(--surface)',
                                    padding: '8px 20px',
                                    borderRadius: '50px',
                                    fontSize: '0.9rem',
                                    border: '1px solid var(--border)'
                                }}>✨ {s}</span>
                            ))}
                        </div>
                    </div>

                    {/* Map Placeholder */}
                    <div>
                        <h2 style={{ marginBottom: '20px' }}>Ubicación</h2>
                        <div style={{
                            width: '100%',
                            height: '400px',
                            background: '#eee',
                            borderRadius: 'var(--radius)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#666',
                            border: '1px solid var(--border)'
                        }}>
                            [📍 Mapa Interactivo - Oaxaca, México]
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="listing-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    <div style={{
                        padding: '30px',
                        background: 'var(--surface)',
                        borderRadius: 'var(--radius)',
                        border: '1px solid var(--border)',
                        position: 'sticky',
                        top: '120px',
                        boxShadow: 'var(--shadow)'
                    }}>
                        <h3 style={{ marginBottom: '20px' }}>Horarios</h3>
                        <p style={{ marginBottom: '30px', color: 'var(--text-light)' }}>{listing.openingHours}</p>

                        <Link href={waLink} target="_blank" style={{
                            background: '#25D366',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '18px',
                            borderRadius: 'var(--radius)',
                            fontSize: '1.1rem',
                            fontWeight: '800',
                            textAlign: 'center',
                            boxShadow: '0 10px 20px rgba(37, 211, 102, 0.2)'
                        }}>
                            📲 Contactar por WhatsApp
                        </Link>

                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                            <Link href="/sumar-negocio" style={{ fontSize: '13px', color: 'var(--text-light)', textDecoration: 'underline' }}>
                                ¿Eres el dueño de este negocio? Reclama esta ficha
                            </Link>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Interlinking */}
            <section style={{ padding: '60px 0', borderTop: '1px solid var(--border)', background: 'var(--surface)' }}>
                <div className="container">
                    <h2 style={{ marginBottom: '30px' }}>Negocios similares en esta zona</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                        <div style={{ background: 'white', padding: '20px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                            <Link href={`/directorio/${listing.categorySlug}/${listing.slug}`}>
                                <h4 style={{ color: 'var(--primary)' }}>{listing.name}</h4>
                                <p style={{ fontSize: '12px', color: 'var(--text-light)' }}>{listing.category}</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Floating WhatsApp Button (Mobile Only) */}
            <div className="mobile-wa-fab">
                <Link href={waLink} target="_blank">
                    📲 Contactar por WhatsApp
                </Link>
            </div>

            <style>{`
        .carousel-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </div>
    );
}
