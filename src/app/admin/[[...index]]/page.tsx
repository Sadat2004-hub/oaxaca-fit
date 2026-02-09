'use client'

/**
 * This route is responsible for the built-in authoring environment of Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * For more information on how to support community-side rendering in Next.js, see:
 * https://www.sanity.io/docs/nextjs-navigation
 */

import { NextStudio } from 'sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
    return <NextStudio config={config} />
}
