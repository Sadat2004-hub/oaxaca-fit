import { getAllProveedores } from '@/lib/sanity.queries';
import { getCategoryData } from '@/lib/utils';
import ListingCard from '@/components/ListingCard';

export const revalidate = 60;

export default async function DirectoryPage() {
    // Obtener los proveedores de Sanity (Fuente única de verdad)
    const sanityListings = await getAllProveedores();

    const allListings = (sanityListings || []).map((s: any) => {
        const categories = Array.isArray(s.category) ? s.category : [s.category];
        const catData = getCategoryData(categories[0]);
        return {
            ...s,
            categorySlug: catData.slug,
            categoryLabel: catData.label
        };
    }).sort((a: any, b: any) => {
        const orderA = a.order ?? 100;
        const orderB = b.order ?? 100;
        if (orderA !== orderB) return orderA - orderB;
        return a.name.localeCompare(b.name);
    });

    return (
        <div className="container" style={{ padding: '60px 20px' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '40px' }}>Directorio OaxacaFit</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '30px' }}>
                {allListings.map((listing: any) => (
                    <ListingCard key={listing.id} listing={listing} />
                ))}
            </div>
        </div>
    );
}
