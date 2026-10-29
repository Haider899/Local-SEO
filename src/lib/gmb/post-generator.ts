import { GBPPost, GBPPostType } from './types';

export class GBPPostGenerator {
  private static POST_TEMPLATES: Record<GBPPostType, (biz: string, cat: string) => { title: string; body: string; cta: GBPPost['callToAction']['actionType'] }> = {
    SERVICE: (biz, cat) => ({
      title: `Expert ${cat} Solutions in Your Area`,
      body: `Looking for top-tier ${cat.toLowerCase()} services? At ${biz}, our certified specialists deliver premium quality and unmatched reliability. Call or book your consultation today to experience the difference.`,
      cta: 'BOOK',
    }),
    OFFER: (biz, cat) => ({
      title: `Special Local Promotion on ${cat}`,
      body: `Exclusive limited-time savings! Mention this Google listing when contacting ${biz} to receive your special complimentary assessment and exclusive local discount.`,
      cta: 'CALL',
    }),
    FAQ: (biz, cat) => ({
      title: `Common Question: How often do you need professional ${cat}?`,
      body: `Regular maintenance and professional care are key to protecting your investment. At ${biz}, we walk you through every step with full transparency and upfront pricing. Have a question? Reach out today!`,
      cta: 'LEARN_MORE',
    }),
    SEASONAL: (biz, cat) => ({
      title: `Seasonal Guide & Best Practices from ${biz}`,
      body: `Ensure your property and systems are prepared for the season ahead. The team at ${biz} provides quick turnaround and emergency support across the community.`,
      cta: 'CALL',
    }),
  };

  static generatePost(params: {
    clientId: string;
    businessName: string;
    category: string;
    preferredType?: GBPPostType;
    mode: 'Auto' | 'Approval';
  }): GBPPost {
    const types: GBPPostType[] = ['SERVICE', 'OFFER', 'FAQ', 'SEASONAL'];
    const postType = params.preferredType || types[Math.floor(Math.random() * types.length)];
    const template = this.POST_TEMPLATES[postType](params.businessName, params.category);

    const now = new Date();
    // Schedule for 24h from now or immediate
    const scheduledFor = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();

    return {
      id: `post_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      clientId: params.clientId,
      postType,
      title: template.title,
      body: template.body,
      callToAction: {
        actionType: template.cta,
        url: `https://example.com/contact`,
      },
      scheduledFor,
      status: params.mode === 'Auto' ? 'SCHEDULED' : 'PENDING_APPROVAL',
      createdAt: now.toISOString(),
    };
  }
}
