export const categoryMapping: Record<string, { label: string; slug: string }> = {
    'crossfit': { label: 'CrossFit & Funcional', slug: 'crossfit' },
    'gym': { label: 'Gimnasios Pesas', slug: 'gimnasios' },
    'balance': { label: 'Balance', slug: 'balance' },
    'artes-marciales': { label: 'Artes Marciales', slug: 'artes-marciales' },
    'boxeo': { label: 'Boxeo', slug: 'boxeo' },
    'raqueta': { label: 'Deportes Raqueta', slug: 'raqueta' },
    'acuaticos': { label: 'Acuáticos', slug: 'acuaticos' },
    'baile': { label: 'Baile y Danza', slug: 'baile' },
    'aventura': { label: 'Aventura', slug: 'aventura' },
    'equipo': { label: 'Deportes Equipo', slug: 'equipo' },
    'salud': { label: 'Salud Deportiva', slug: 'salud' }
};

export function getCategoryData(sanityValue: string) {
    return categoryMapping[sanityValue] || { label: sanityValue, slug: sanityValue };
}
