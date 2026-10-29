import { MetadataRoute } from 'next';
import { SERVICES_DATA, ServiceDetail } from '@/lib/data/services';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://omnirank.ai';

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/about',
    '/services',
    '/pricing',
    '/free-tools',
    '/free-tools/local-rank-checker',
    '/free-tools/local-business-schema-generator',
    '/free-tools/meta-tag-analyzer',
    '/free-tools/ai-visibility-checker',
    '/free-tools/robots-txt-checker',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES_DATA.map((service: ServiceDetail) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
