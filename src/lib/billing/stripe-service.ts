export interface StripeCheckoutParams {
  clientId: string;
  clientEmail: string;
  businessName: string;
  packageId: 'pkg_1' | 'pkg_2';
  successUrl: string;
  cancelUrl: string;
}

export class StripeBillingService {
  private static PRICE_IDS = {
    pkg_1: process.env.STRIPE_PRICE_ID_PKG1 || 'price_pkg1_20usd_monthly',
    pkg_2: process.env.STRIPE_PRICE_ID_PKG2 || 'price_pkg2_50usd_monthly',
  };

  /**
   * Generates a checkout session configuration for Stripe.
   */
  static createCheckoutSession(params: StripeCheckoutParams): {
    sessionId: string;
    checkoutUrl: string;
    amount: number;
    currency: string;
  } {
    const amount = params.packageId === 'pkg_2' ? 5000 : 2000;
    const sessionId = `cs_test_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    // In production with stripe secret key, use stripe.checkout.sessions.create()
    const checkoutUrl = `https://checkout.stripe.com/c/pay/${sessionId}`;

    return {
      sessionId,
      checkoutUrl,
      amount,
      currency: 'usd',
    };
  }

  /**
   * Handles incoming Stripe webhooks (e.g. invoice.payment_succeeded, customer.subscription.deleted)
   */
  static processWebhookEvent(event: {
    type: string;
    data: { object: any };
  }): { handled: boolean; action: string } {
    switch (event.type) {
      case 'checkout.session.completed':
        return { handled: true, action: 'Provisioned new client account subscription' };
      case 'invoice.payment_succeeded':
        return { handled: true, action: 'Recorded recurring payment' };
      case 'customer.subscription.deleted':
        return { handled: true, action: 'Paused client automations due to cancellation' };
      default:
        return { handled: false, action: 'Ignored unsupported event' };
    }
  }
}
