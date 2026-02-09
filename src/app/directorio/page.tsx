import { listings } from '@/data/listings';
import { getAllProveedores } from '@/lib/sanity.queries';
import { getCategoryData } from '@/lib/utils';
import ListingCard from '@/components/ListingCard';

export default async function DirectoryPage() {
    // 1. Obtener los de Sanity
    const sanityListings = await getAllProveedores();
    const sanitySlugs = new Set((sanityListings || []).map((s: any) => s.slug));

    // 2. Obtener los locales eliminando duplicados
    const localListings = listings
        .filter(l => !sanitySlugs.has(l.slug))
        .map(l => ({
            ...l,
            categoryLabel: l.category
        }));

    // 3. Mezclarlos
    const allListings = [
        ...(sanityListings || []).map((s: any) => {
            const catData = getCategoryData(s.category);
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
        <div className="container" style={{ padding: '60px 20px' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '40px' }}>Directorio OaxacaFit</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '30px' }}>
                {allListings.map(listing => (
                    <ListingCard key={listing.id} listing={listing} />
                ))}
            </div>
        </div>
    );
}
