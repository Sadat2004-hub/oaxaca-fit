export const categoryMapping: Record<string, { label: string; slug: string }> = {
    'crossfit': { label: 'CrossFit & Funcional', slug: 'crossfit' },
    'gym': { label: 'Gimnasios Clásicos', slug: 'gimnasios' },
    'yoga': { label: 'Yoga & Pilates', slug: 'yoga' },
    'nutricion': { label: 'Nutrición & Suplementos', slug: 'nutricion' },
    'boxing': { label: 'Artes Marciales', slug: 'artes-marciales' },
    'swimming': { label: 'Natación', slug: 'natacion' }
};

export function getCategoryData(sanityValue: string) {
    return categoryMapping[sanityValue] || { label: sanityValue, slug: sanityValue };
}
