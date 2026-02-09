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
    'salud': { label: 'Salud Deportiva', slug: 'salud' },
    'kickboxing': { label: 'Kickboxing', slug: 'kickboxing' },
    'karate': { label: 'Karate', slug: 'karate' },
    'taekwondo': { label: 'Taekwondo', slug: 'taekwondo' },
    'judo': { label: 'Judo', slug: 'judo' },
    'jiu-jitsu': { label: 'Jiu-Jitsu Brasileño', slug: 'jiu-jitsu' },
    'lucha-libre': { label: 'Lucha Libre', slug: 'lucha-libre' },
    'mma': { label: 'MMA', slug: 'mma' },
    'krav-maga': { label: 'Krav Maga', slug: 'krav-maga' },
    'tenis': { label: 'Tenis', slug: 'tenis' },
    'padel': { label: 'Pádel', slug: 'padel' },
    'squash': { label: 'Squash', slug: 'squash' },
    'fronton': { label: 'Frontón/Frontenis', slug: 'fronton' },
    'pickleball': { label: 'Pickeball', slug: 'pickleball' },
    'pinpon': { label: 'Pinpon', slug: 'pinpon' },
    'badminton': { label: 'Bádminton', slug: 'badminton' },
    'zumba': { label: 'Zumba', slug: 'zumba' },
    'ritmos-latinos': { label: 'Ritmos Latinos', slug: 'ritmos-latinos' },
    'pole-dance': { label: 'Pole Dance', slug: 'pole-dance' },
    'aerial': { label: 'Aerial (Telas)', slug: 'aerial' },
    'salsa': { label: 'Salsa', slug: 'salsa' },
    'bachata': { label: 'Bachata', slug: 'bachata' }
};

export function getCategoryData(sanityValue: string) {
    return categoryMapping[sanityValue] || { label: sanityValue, slug: sanityValue };
}
