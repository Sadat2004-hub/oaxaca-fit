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
            <section style={{ padding: '40px 0', borderBottom: '1px solid var(--border)' }}>
                <div className="container">
                    <Link href={`/directorio/${listing.categorySlug || listing.category}`} style={{ color: 'var(--text-light)', fontSize: '14px', marginBottom: '10px', display: 'block' }}>
                        &larr; Volver a {listing.categoryLabel || listing.category}
                    </Link>
                    <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '10px' }}>{listing.name}</h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', marginBottom: '15px' }}>
                        📍 {listing.address} | <span style={{ color: 'var(--primary)', fontWeight: '600' }}>{listing.categoryLabel || listing.category}</span>
                    </p>

                    {/* Quick Contact - Mobile Only */}
                    <div className="mobile-only-contact" style={{ display: 'none', flexDirection: 'column', gap: '15px', marginTop: '25px' }}>
                        <Link href={waLink} target="_blank" style={{
                            background: '#25D366',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '16px',
                            borderRadius: '12px',
                            fontSize: '1.1rem',
                            fontWeight: '800',
                            textAlign: 'center',
                            boxShadow: '0 10px 20px rgba(37, 211, 102, 0.2)'
                        }}>
                            📲 Contactar por WhatsApp
                        </Link>
                        <div style={{ color: 'var(--text-light)', fontSize: '1rem', fontWeight: '500' }}>
                            🕒 Horarios: {listing.openingHours || 'Consultar horario'}
                        </div>
                    </div>
                </div>
            </section>

            <div className="container listing-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px', padding: '40px 0' }}>
                {/* Main Content */}
                <div className="listing-content-container" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

                    {/* Gallery Carousel */}
                    {listing.gallery && listing.gallery.length > 0 ? (
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
                                {listing.gallery.map((img: string, i: number) => (
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
                    ) : listing.image && (
                        <div>
                            <h2 style={{ marginBottom: '20px' }}>Imagen</h2>
                            <div style={{
                                position: 'relative',
                                height: '450px',
                                borderRadius: 'var(--radius)',
                                overflow: 'hidden'
                            }}>
                                <Image src={listing.image} alt={listing.name} fill style={{ objectFit: 'cover' }} />
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    <div>
                        <h2 style={{ marginBottom: '20px' }}>Sobre nosotros</h2>
                        <p style={{ fontSize: '1.1rem', whiteSpace: 'pre-line' }}>{listing.description}</p>
                    </div>

                    {/* Services */}
                    {listing.services && listing.services.length > 0 && (
                        <div>
                            <h2 style={{ marginBottom: '20px' }}>Servicios y Comodidades</h2>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                                {listing.services.map((s: string) => (
                                    <span key={s} className="service-tag">
                                        <span style={{ color: 'var(--primary)' }}>✔</span> {s}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Map */}
                    <div>
                        <h2 style={{ marginBottom: '20px' }}>Ubicación</h2>
                        <div style={{
                            width: '100%',
                            height: '400px',
                            background: '#eee',
                            borderRadius: 'var(--radius)',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#666',
                            border: '1px solid var(--border)'
                        }}>
                            {listing.mapEmbedUrl ? (
                                <iframe
                                    src={listing.mapEmbedUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            ) : (
                                <span>[📍 Mapa no disponible]</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="listing-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    <div className="sidebar-container" style={{
                        padding: '30px',
                        background: 'var(--surface)',
                        borderRadius: 'var(--radius)',
                        border: '1px solid var(--border)',
                        position: 'sticky',
                        top: '120px',
                        boxShadow: 'var(--shadow)'
                    }}>
                        <div className="sidebar-desktop-info">
                            <h3 style={{ marginBottom: '20px' }}>Horarios</h3>
                            <p style={{ marginBottom: '30px', color: 'var(--text-light)' }}>{listing.openingHours || 'Consultar horario'}</p>
                        </div>

                        {listing.website && (
                            <div className="sidebar-desktop-info">
                                <Link href={listing.website} target="_blank" style={{
                                    background: 'white',
                                    color: 'var(--text)',
                                    border: '2px solid var(--border)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '15px',
                                    borderRadius: 'var(--radius)',
                                    fontSize: '1rem',
                                    fontWeight: '700',
                                    textAlign: 'center',
                                    marginBottom: '15px'
                                }}>
                                    🌐 Visitar Sitio Web
                                </Link>
                            </div>
                        )}

                        <div className="sidebar-desktop-info">
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
                        </div>

                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                            <Link href="/sumar-negocio" style={{ fontSize: '13px', color: 'var(--text-light)', textDecoration: 'underline' }}>
                                ¿Eres el dueño de este negocio? Reclama esta ficha
                            </Link>
                        </div>
                    </div>
                </aside>
            </div>

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
                    .listing-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .listing-sidebar {
                        order: -1;
                    }
                    .mobile-only-contact {
                        display: flex !important;
                    }
                    .sidebar-desktop-info {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    );
}
