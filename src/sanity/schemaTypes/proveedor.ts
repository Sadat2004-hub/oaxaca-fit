import { defineField, defineType } from 'sanity'

export const proveedorType = defineType({
    name: 'proveedor',
    title: 'Proveedores',
    type: 'document',
    fields: [
        defineField({
            name: 'order',
            title: 'Orden de aparición',
            description: 'Número para ordenar (ej. 1 para aparecer primero, 2 segundo...)',
            type: 'number',
            initialValue: 100,
        }),
        defineField({
            name: 'name',
            title: 'Nombre del Negocio',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Categorías',
            description: 'Selecciona todas las categorías que apliquen',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: '🏋️ CrossFit & Funcional', value: 'crossfit' },
                    { title: '💪 Gimnasios Pesas', value: 'gym' },
                    { title: '🧘 Balance (Yoga, Pilates, Barre, GAP)', value: 'balance' },
                    { title: '🧘 Yoga', value: 'yoga' },
                    { title: '🧘 Pilates', value: 'pilates' },
                    { title: '🧘 Barre', value: 'barre' },
                    { title: '🧘 GAP', value: 'gap' },
                    { title: '🥋 Artes Marciales', value: 'artes-marciales' },
                    { title: '👊 Golpeo (Kickboxing, Karate, etc)', value: 'golpeo' },
                    { title: '🤼 Agarre (Judo, Jiu-Jitsu, etc)', value: 'agarre' },
                    { title: '⚔️ Híbridas (MMA, Krav Maga)', value: 'hibridas' },
                    { title: '🥊 Boxeo', value: 'boxeo' },
                    { title: '🎾 Deportes Raqueta', value: 'raqueta' },
                    { title: '🎾 Tenis / Pádel', value: 'tenis' },
                    { title: '🏊 Acuáticos', value: 'acuaticos' },
                    { title: '💃 Baile y Danza', value: 'baile' },
                    { title: '💃 Zumba / Latinos', value: 'zumba' },
                    { title: '💃 Pole Dance / Telas', value: 'pole-dance' },
                    { title: '💃 Salsa / Bachata', value: 'salsa' },
                    { title: '🚵 Aventura', value: 'aventura' },
                    { title: '🚲 Ciclismo', value: 'ciclismo' },
                    { title: '🥾 Senderismo', value: 'senderismo' },
                    { title: '🧗 Escalada', value: 'escalada' },
                    { title: '🏃 Running', value: 'running' },
                    { title: '⚽ Deportes Equipo', value: 'equipo' },
                    { title: '⚽ Futbol / Basquet / Voley', value: 'deportes-equipo-sub' },
                    { title: '🏥 Salud Deportiva', value: 'salud' },
                    { title: '🏥 Fisioterapia / Masajes', value: 'fisioterapia' },
                    { title: '🏥 Nutrición', value: 'nutricion' },
                ],
            },
            validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
            name: 'description',
            title: 'Descripción',
            type: 'text',
            rows: 4,
        }),
        defineField({
            name: 'address',
            title: 'Dirección (Texto)',
            type: 'string',
        }),
        defineField({
            name: 'mapEmbedUrl',
            title: 'URL de Google Maps (Iframe)',
            description: 'Copia el src del iframe de Google Maps (Share -> Embed Map)',
            type: 'string',
        }),
        defineField({
            name: 'whatsapp',
            title: 'Teléfono (WhatsApp)',
            description: 'Escribir el número con código de país sin el símbolo +, ej: 529511234567',
            type: 'string',
        }),
        defineField({
            name: 'mainImage',
            title: 'Imagen Principal',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'gallery',
            title: 'Galería de Imágenes',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
        }),
        defineField({
            name: 'services',
            title: 'Servicios',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'openingHours',
            title: 'Horarios de Apertura',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Horario',
                    fields: [
                        { name: 'days', title: 'Días', type: 'string', description: 'Ej. Lunes a Viernes' },
                        { name: 'hours', title: 'Horario', type: 'string', description: 'Ej. 06:00 - 22:00' }
                    ]
                }
            ]
        }),
        defineField({
            name: 'rating',
            title: 'Calificación',
            description: 'Calificación de 1 a 5 (ej. 4.9)',
            type: 'number',
            initialValue: 4.9,
            validation: (Rule) => Rule.min(1).max(5),
        }),
    ],
})
