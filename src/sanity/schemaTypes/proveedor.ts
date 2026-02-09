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
                    { title: 'CrossFit', value: 'crossfit' },
                    { title: 'Gimnasio', value: 'gym' },
                    { title: 'Yoga', value: 'yoga' },
                    { title: 'Funcional', value: 'functional' },
                    { title: 'Boxeo', value: 'boxing' },
                    { title: 'Natación', value: 'swimming' },
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
