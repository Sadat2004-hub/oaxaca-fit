import { client } from './sanity'

export const PROVIDE_ALL_QUERY = `*[_type == "proveedor"] | order(order asc, _createdAt desc) {
  "id": _id,
  name,
  "slug": slug.current,
  category,
  description,
  address,
  whatsapp,
  "image": mainImage.asset->url,
  "gallery": gallery[].asset->url,
  services,
  openingHours,
  location,
  mapEmbedUrl,
  order,
  rating
}`

export const PROVIDE_BY_CATEGORY_QUERY = `*[_type == "proveedor" && (
  $category in category || 
  (count($categories) > 0 && count((category)[@ in $categories]) > 0)
)] | order(order asc, _createdAt desc) {
  "id": _id,
  name,
  "slug": slug.current,
  category,
  description,
  address,
  whatsapp,
  "image": mainImage.asset->url,
  "gallery": gallery[].asset->url,
  services,
  openingHours,
  location,
  mapEmbedUrl,
  order,
  rating
}`

export const PROVIDE_BY_SLUG_QUERY = `*[_type == "proveedor" && slug.current == $slug][0] {
  "id": _id,
  name,
  "slug": slug.current,
  category,
  description,
  address,
  whatsapp,
  "image": mainImage.asset->url,
  "gallery": gallery[].asset->url,
  services,
  openingHours,
  location,
  mapEmbedUrl,
  order,
  rating
}`

export async function getAllProveedores() {
  return await client.fetch(PROVIDE_ALL_QUERY)
}

export async function getProveedoresByCategory(category: string, categories: string[] = []) {
  return await client.fetch(PROVIDE_BY_CATEGORY_QUERY, { category, categories })
}

export async function getProveedorBySlug(slug: string) {
  return await client.fetch(PROVIDE_BY_SLUG_QUERY, { slug })
}
