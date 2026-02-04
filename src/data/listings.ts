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
    mapEmbedUrl?: string;
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
        image: '/images/twister-crossfit-gym/twister-crossfit-gym.jpg',
        gallery: [
            '/images/twister-crossfit-gym/twister-crossfit-gym.jpg',
            '/images/twister-crossfit-gym/twister-crossfit-gym1.jpg',
            '/images/twister-crossfit-gym/twister-crossfit-gym2.jpg',
            '/images/twister-crossfit-gym/twister-crossfit-gym3.jpg',
            '/images/twister-crossfit-gym/twister-crossfit-gym4.jpg',
            '/images/twister-crossfit-gym/twister-crossfit-gym5.jpg',
        ],
        description: 'Centro líder en Oaxaca con calificación 4.9. Ofrecemos CrossFit puro, entrenamiento funcional, yoga y asesoría nutricional. ¡Únete a la comunidad más fuerte!',
        services: ['CrossFit', 'Funcional', 'Yoga', 'Nutrición', 'Regaderas'],
        openingHours: 'Lun-Vie: 6:00 - 22:00, Sáb: 8:00 - 14:00',
        location: { lat: 17.065, lng: -96.723 },
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3814.135610885082!2d-96.73707672540839!3d17.066018111984825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c723e2f3a446e9%3A0xf2b8db02961a7099!2sTwister%20Crossfit%20Gym!5e0!3m2!1ses!2smx!4v1770127895943!5m2!1ses!2smx'
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
