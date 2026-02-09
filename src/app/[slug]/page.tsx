import { listings } from '@/data/listings';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProveedorBySlug, getAllProveedores } from '@/lib/sanity.queries';
import { getCategoryData } from '@/lib/utils';

export const revalidate = 60;

export async function generateStaticParams() {
    const sanityProveedores = await getAllProveedores();
    const sanitySlugs = sanityProveedores.map((p: any) => ({ slug: p.slug }));
    const localSlugs = listings.map((l) => ({ slug: l.slug }));

    return [...localSlugs, ...sanitySlugs];
}

export default async function ListingPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // 1. Intenta buscar en los locales (archivo antiguo)
    let listing: any = listings.find(l => l.slug === slug);

    // 2. Si no está ahí, búscalo en Sanity (el nuevo Admin)
    if (!listing) {
        const sanityListing = await getProveedorBySlug(slug);
        if (sanityListing) {
            const catData = getCategoryData(sanityListing.category);
            listing = {
                ...sanityListing,
                categoryLabel: catData.label,
                categorySlug: catData.slug
            };
        }
    }

    if (!listing) return notFound();

    const waLink = `https://wa.me/${listing.whatsapp}?text=Hola,%20vi%20su%20perfil%20en%20OaxacaFit%20y%20quiero%20más%20info.`;

    const baseUrl = 'https://oaxacafit.com';
    const imageUrl = listing.image?.startsWith('http') ? listing.image : `${baseUrl}${listing.image}`;

    const schemaData = {
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "ExerciseGym"],
        "name": listing.name,
        "image": imageUrl,
        "description": listing.description,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": listing.address,
            "addressLocality": "Oaxaca",
            "addressCountry": "MX"
        },
        "url": `${baseUrl}/${listing.slug}`,
        "telephone": listing.whatsapp,
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": listing.rating || 4.9,
            "bestRating": "5",
            "worstRating": "1",
            "ratingCount": "20"
        },
        "openingHours": listing.openingHours
    };

    return (
        <div className="animate-fade-in">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />

            {/* Header Info */}
            <section style={{ padding: '40px 0 20px' }}>
                <div className="container">
                    <Link href={`/directorio/${listing.categorySlug || listing.category}`} style={{ color: 'var(--text-light)', fontSize: '14px', marginBottom: '15px', display: 'block' }}>
                        &larr; Volver a {listing.categoryLabel || listing.category}
                    </Link>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '10px', letterSpacing: '-1.5px' }}>{listing.name}</h1>
                    <span style={{
                        background: 'var(--primary)',
                        color: 'white',
                        padding: '5px 15px',
                        borderRadius: '50px',
                        fontSize: '0.9rem',
                        fontWeight: '700'
                    }}>
                        {listing.categoryLabel || listing.category}
                    </span>
                </div>
            </section>

            <div className="container" style={{ paddingBottom: '60px' }}>
                {/* 1. Gallery Carousel */}
                <div style={{ marginBottom: '60px' }}>
                    {listing.gallery && listing.gallery.length > 0 ? (
                        <div style={{
                            display: 'flex',
                            gap: '20px',
                            overflowX: 'auto',
                            paddingBottom: '20px',
                            scrollSnapType: 'x mandatory',
                            msOverflowStyle: 'none',
                            scrollbarWidth: 'none'
                        }} className="carousel-container">
                            {listing.gallery.map((img: string, i: number) => (
                                <div key={i} style={{
                                    flex: '0 0 85%',
                                    position: 'relative',
                                    height: '500px',
                                    borderRadius: '30px',
                                    overflow: 'hidden',
                                    scrollSnapAlign: 'start',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                                }}>
                                    <Image src={img} alt={`${listing.name} ${i}`} fill style={{ objectFit: 'cover' }} />
                                </div>
                            ))}
                        </div>
                    ) : listing.image && (
                        <div style={{
                            position: 'relative',
                            height: '500px',
                            borderRadius: '30px',
                            overflow: 'hidden',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                        }}>
                            <Image src={listing.image} alt={listing.name} fill style={{ objectFit: 'cover' }} />
                        </div>
                    )}
                </div>

                {/* 2. AboutUs & Services Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', marginBottom: '60px' }} className="details-grid">
                    <div>
                        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '20px' }}>Nosotros</h2>
                        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#444', whiteSpace: 'pre-line' }}>{listing.description}</p>
                    </div>

                    {listing.services && listing.services.length > 0 && (
                        <div>
                            <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '20px' }}>Servicios</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                {listing.services.map((s: string) => (
                                    <div key={s} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        fontSize: '1.1rem',
                                        color: '#555'
                                    }}>
                                        <span style={{ color: 'var(--primary)', fontSize: '1.3rem' }}>★</span> {s}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 3. Contact Section (Light Gray Background) */}
            <section style={{
                background: '#f8f9fa',
                padding: '80px 0',
                borderTop: '1px solid #eee'
            }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '50px', textAlign: 'center' }}>Contacto</h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '40px',
                        alignItems: 'start'
                    }} className="contact-grid">

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                            {/* Ubicación */}
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div style={{
                                    fontSize: '2rem',
                                    background: 'white',
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
                                }}>📍</div>
                                <div>
                                    <h4 style={{ fontSize: '0.9rem', color: 'var(--primary)', textTransform: 'uppercase', fontWeight: '800', marginBottom: '5px' }}>Ubicación</h4>
                                    <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>{listing.address}</p>
                                </div>
                            </div>

                            {/* Teléfono */}
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div style={{
                                    fontSize: '2rem',
                                    background: 'white',
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
                                }}>📞</div>
                                <div>
                                    <h4 style={{ fontSize: '0.9rem', color: 'var(--primary)', textTransform: 'uppercase', fontWeight: '800', marginBottom: '5px' }}>Teléfono</h4>
                                    <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>{listing.whatsapp}</p>
                                </div>
                            </div>

                            {/* Horarios (Added for completeness) */}
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div style={{
                                    fontSize: '2rem',
                                    background: 'white',
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
                                }}>🕒</div>
                                <div>
                                    <h4 style={{ fontSize: '0.9rem', color: 'var(--primary)', textTransform: 'uppercase', fontWeight: '800', marginBottom: '5px' }}>Horarios</h4>
                                    <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>{listing.openingHours || 'Consultar'}</p>
                                </div>
                            </div>

                            {/* WhatsApp Button */}
                            <Link href={waLink} target="_blank" style={{
                                background: '#25D366',
                                color: 'white',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '20px 40px',
                                borderRadius: '50px',
                                fontSize: '1.2rem',
                                fontWeight: '800',
                                textAlign: 'center',
                                marginTop: '20px',
                                textDecoration: 'none',
                                boxShadow: '0 10px 20px rgba(37, 211, 102, 0.2)'
                            }}>
                                📲 Contactar por WhatsApp
                            </Link>
                        </div>

                        {/* Map */}
                        <div style={{
                            width: '100%',
                            height: '450px',
                            background: '#eee',
                            borderRadius: '30px',
                            overflow: 'hidden',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                            border: '4px solid white'
                        }}>
                            {listing.mapEmbedUrl ? (
                                <iframe
                                    src={listing.mapEmbedUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                />
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#999' }}>📍 Mapa no disponible</div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Sponsors Section */}
            <section style={{ padding: '80px 0', borderTop: '1px solid var(--border)', background: 'var(--primary)' }}>
                <div className="container" style={{
                    background: 'white',
                    padding: '60px 40px',
                    borderRadius: '40px',
                    textAlign: 'center',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}>
                    <h2 style={{ marginBottom: '40px', color: 'var(--primary)', fontSize: '2.5rem', fontWeight: '900' }}>Patrocinadores</h2>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '60px',
                        opacity: 0.8
                    }}>
                        <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#000', letterSpacing: '-2px' }}>NIKE</div>
                        <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#000', fontStyle: 'italic' }}>adidas</div>
                        <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#000' }}>PUMA</div>
                        <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#000', letterSpacing: '4px' }}>REEBOK</div>
                    </div>
                </div>
            </section>

            <style>{`
                .carousel-container::-webkit-scrollbar {
                  display: none;
                }
                @media (max-width: 768px) {
                    h1 { font-size: 2.5rem !important; }
                    .details-grid, .contact-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
}
