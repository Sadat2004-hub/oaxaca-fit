import { type SchemaTypeDefinition } from 'sanity'
import { proveedorType } from './proveedor'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [proveedorType],
}
