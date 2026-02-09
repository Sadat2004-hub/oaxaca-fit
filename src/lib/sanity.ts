import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '../sanity/env'

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    // These settings will be overridden in 
    // server-side data fetching for better performance
    perspective: 'published',
})
