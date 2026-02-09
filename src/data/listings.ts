export type Listing = {
    id: string;
    name: string;
    slug: string;
    category: string;
    categorySlug: string;
    address: string;
    whatsapp: string;
    image: string;
    gallery: string[];
    description: string;
    services: string[];
    openingHours: string | { days: string; hours: string }[];
    location: { lat: number; lng: number };
    mapEmbedUrl?: string;
    website?: string;
    rating?: number;
};

export const listings: Listing[] = [
    // Los proveedores ahora se gestionan desde Sanity CMS
    // Accede a /admin para agregar o editar proveedores
];
