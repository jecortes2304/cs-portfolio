import { MetadataRoute } from 'next'
import ProjectsData from '@/data/Projects'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://cortestudios-portfolio.netlify.app'

    // Páginas estáticas
    const staticPages = [
        '',
        '/about',
        '/portfolio',
        '/contact',
    ].map(route => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
    }))

    // Páginas de proyectos (dinámicas)
    const projectPages = ProjectsData.map(project => ({
        url: `${baseUrl}/details/${project.id}`,
        lastModified: new Date(),
    }))

    // Páginas de idiomas
    const languages = ['en', 'es']
    const languagePages = languages.flatMap(lang =>
        [
            ...staticPages.map(page => ({
                url: `${baseUrl}/${lang}${page.url.replace(baseUrl, '')}`,
                lastModified: page.lastModified,
            })),
            ...projectPages.map(page => ({
                url: `${baseUrl}/${lang}${page.url.replace(baseUrl, '')}`,
                lastModified: page.lastModified,
            }))
        ]
    )

    return [
        // Página raíz
        {
            url: baseUrl,
            lastModified: new Date(),
        },
        // Todas las demás páginas
        ...languagePages,
    ]
}