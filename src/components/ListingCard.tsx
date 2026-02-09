import Image from 'next/image';
import Link from 'next/link';
import { getCategoryData } from '@/lib/utils';

interface ListingCardProps {
    listing: {
        id: string;
        name: string;
        slug: string;
        category: string;
        categorySlug?: string;
        categoryLabel?: string;
        address: string;
        image?: string;
        rating?: number;
    }
}

export default function ListingCard({ listing }: ListingCardProps) {
    const categories = Array.isArray(listing.category) ? listing.category : [listing.category];
    const displayCategory = listing.categoryLabel || getCategoryData(categories[0]).label;

    return (
        <Link
            href={`/${listing.slug}`}
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
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                textDecoration: 'none',
                color: 'inherit'
            }}
        >
            <div style={{ position: 'relative', height: '220px', width: '100%' }}>
                {listing.image ? (
                    <Image
                        src={listing.image}
                        alt={listing.name}
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                ) : (
                    <div style={{ width: '100%', height: '100%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🏋️</div>
                )}
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
                    {listing.rating || 4.9} ⭐
                </div>
            </div>

            <div style={{ padding: '25px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{
                    color: 'var(--primary)',
                    fontSize: '12px',
                    fontWeight: '700',
                    marginBottom: '8px',
                    textTransform: 'uppercase'
                }}>
                    {displayCategory}
                </span>
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
                    {listing.address?.split(',')[0]}...
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
    );
}
