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
    openingHours: string;
    location: { lat: number; lng: number };
};

export const listings: Listing[] = [
    {
        id: '1',
        name: 'Twister Crossfit Gym',
        slug: 'twister-crossfit-gym',
        category: 'CrossFit & Funcional',
        categorySlug: 'crossfit',
        address: 'Mariano Escobedo #105, 68000 Oaxaca de Juárez, Oax.',
        whatsapp: '529511234567', // Placeholder contact
        image: 'https://images.unsplash.com/photo-1541534741688-6078c65b5ec3?q=80&w=1000',
        gallery: [
            'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000',
            'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000',
        ],
        description: 'Centro líder en Oaxaca con calificación 4.9. Ofrecemos CrossFit puro, entrenamiento funcional, yoga y asesoría nutricional. ¡Únete a la comunidad más fuerte!',
        services: ['CrossFit', 'Funcional', 'Yoga', 'Nutrición', 'Regaderas'],
        openingHours: 'Lun-Vie: 6:00 - 22:00, Sáb: 8:00 - 14:00',
        location: { lat: 17.065, lng: -96.723 }
    },
    {
        id: '2',
        name: 'CrossFit Oaxaca',
        slug: 'crossfit-oaxaca',
        category: 'CrossFit & Funcional',
        categorySlug: 'crossfit',
        address: 'Zona Reforma, Oaxaca de Juárez, Oax.',
        whatsapp: '529519876543', // Placeholder contact
        image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=1000',
        gallery: [
            'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?q=80&w=1000',
        ],
        description: 'Comunidad unida y entrenadores dedicados. Mezclamos cardio, levantamiento de pesas y gimnasia para resultados reales.',
        services: ['CrossFit', 'Levantamiento de Pesas', 'Cardio', 'Estacionamiento'],
        openingHours: 'Lun-Vie: 6:00 - 21:00, Sáb: 9:00 - 13:00',
        location: { lat: 17.078, lng: -96.710 }
    },
    {
        id: '3',
        name: 'Victory GYM',
        slug: 'victory-gym-etla',
        category: 'CrossFit & Funcional',
        categorySlug: 'crossfit',
        address: 'Agencia Municipal Santiago Etla, Oaxaca',
        whatsapp: '529515556666',
        image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000',
        gallery: [],
        description: 'Especialistas en alta intensidad y pérdida de peso. Instalaciones amplias para tu entrenamiento funcional.',
        services: ['Funcional', 'Pesas', 'Nutrición Deportiva'],
        openingHours: 'Lun-Vie: 6:00 - 22:00',
        location: { lat: 17.130, lng: -96.760 }
    },
    {
        id: '4',
        name: 'Eagle Fit Functional Studio',
        slug: 'eagle-fit-functional',
        category: 'CrossFit & Funcional',
        categorySlug: 'crossfit',
        address: 'Oaxaca de Juárez, Oax.',
        whatsapp: '529514443333',
        image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=1000',
        gallery: [],
        description: 'Estudio boutique enfocado 100% al entrenamiento funcional de calidad y atención personalizada.',
        services: ['Entrenamiento Funcional', 'Grupos Pequeños'],
        openingHours: 'Consultar horario',
        location: { lat: 17.060, lng: -96.720 }
    },
    {
        id: '5',
        name: 'Gimnasio Ursus',
        slug: 'gimnasio-ursus',
        category: 'CrossFit & Funcional',
        categorySlug: 'crossfit',
        address: 'Chapultepec 13, Soledad Etla, Oaxaca',
        whatsapp: '529512221111',
        image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=1000',
        gallery: [],
        description: 'Entrenamiento rudo y efectivo. Boxeo, funcional y pesas con asesoría de nutricionista deportivo.',
        services: ['Boxeo', 'Funcional', 'Nutricionista', 'Pesas'],
        openingHours: 'Lun-Sáb: 7:00 - 21:00',
        location: { lat: 17.140, lng: -96.770 }
    }
];
