import { listings } from '@/data/listings';
import Image from 'next/image';
import Link from 'next/link';

export default function DirectoryPage() {
    return (
        <div className="container" style={{ padding: '60px 20px' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '40px' }}>Directorio OaxacaFit</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
                {listings.map(listing => (
                    <div key={listing.id} className="listing-card" style={{
                        background: 'white',
                        borderRadius: 'var(--radius)',
                        overflow: 'hidden',
                        border: '1px solid var(--border)',
                        transition: 'transform 0.3s ease',
                        boxShadow: 'var(--shadow)'
                    }}>
                        <div style={{ position: 'relative', height: '200px' }}>
                            <Image src={listing.image} alt={listing.name} fill style={{ objectFit: 'cover' }} />
                        </div>
                        <div style={{ padding: '20px' }}>
                            <span style={{ color: 'var(--primary)', fontSize: '12px', fontWeight: '700' }}>{listing.category.toUpperCase()}</span>
                            <h3 style={{ margin: '10px 0' }}>{listing.name}</h3>
                            <p style={{ fontSize: '14px', color: 'var(--text-light)', marginBottom: '20px' }}>📍 {listing.address}</p>
                            <Link href={`/directorio/${listing.categorySlug}/${listing.slug}`} style={{
                                display: 'block',
                                background: 'var(--text)',
                                color: 'white',
                                textAlign: 'center',
                                padding: '12px',
                                borderRadius: '8px',
                                fontWeight: '600'
                            }}>
                                Ver Detalles
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
