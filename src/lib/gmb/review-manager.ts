import { GBPReview, ReviewRequestCampaign } from './types';

export class GBPReviewManager {
  /**
   * Generates a context-aware personalized AI response for a review.
   */
  static generateReply(review: GBPReview, businessName: string): string {
    const reviewer = review.reviewerName.split(' ')[0] || 'Valued Customer';

    if (review.rating >= 4) {
      return `Hi ${reviewer}, thank you so much for the 5-star rating! The entire team at ${businessName} is thrilled to hear about your great experience. We look forward to serving you again soon!`;
    }

    if (review.rating === 3) {
      return `Hi ${reviewer}, thank you for your feedback. At ${businessName}, we hold ourselves to the highest standards. We would love to learn more about how we can earn a 5-star experience from you on your next visit. Please reach out to our team directly.`;
    }

    // Negative (1 or 2 stars)
    return `Hello ${reviewer}, we take this feedback very seriously. Customer satisfaction is our top priority at ${businessName}, and we apologize that your experience did not meet expectations. Please contact our leadership directly at support@${businessName.toLowerCase().replace(/\s+/g, '')}.com so we can address your concerns immediately.`;
  }

  /**
   * Creates an automated review-request message to grow genuine review volume.
   */
  static createReviewRequest(params: {
    clientId: string;
    customerName: string;
    customerContact: string;
    businessName: string;
    reviewLink: string;
    channel?: 'SMS' | 'EMAIL';
  }): ReviewRequestCampaign {
    const channel = params.channel || 'SMS';
    const firstName = params.customerName.split(' ')[0] || 'there';

    const message =
      channel === 'SMS'
        ? `Hi ${firstName}, thank you for choosing ${params.businessName}! Could you take 30 seconds to leave us a quick review on Google? It means the world to our local team: ${params.reviewLink}`
        : `Dear ${params.customerName},\n\nThank you for choosing ${params.businessName}. We take pride in delivering exceptional local service. If you enjoyed your experience, please consider leaving us a quick Google review:\n\n${params.reviewLink}\n\nWarm regards,\nThe ${params.businessName} Team`;

    return {
      id: `req_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      clientId: params.clientId,
      customerName: params.customerName,
      customerContact: params.customerContact,
      channel,
      message,
      status: 'QUEUED',
    };
  }
}
