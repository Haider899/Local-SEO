export type GBPPostType = 'SERVICE' | 'OFFER' | 'FAQ' | 'SEASONAL';

export interface GBPPost {
  id: string;
  clientId: string;
  postType: GBPPostType;
  title: string;
  body: string;
  callToAction: {
    actionType: 'BOOK' | 'ORDER' | 'SHOP' | 'LEARN_MORE' | 'CALL';
    url?: string;
  };
  scheduledFor: string;
  status: 'DRAFT' | 'PENDING_APPROVAL' | 'SCHEDULED' | 'PUBLISHED';
  createdAt: string;
}

export interface GBPReview {
  id: string;
  clientId: string;
  reviewerName: string;
  rating: number; // 1 - 5
  comment: string;
  createTime: string;
  reply?: {
    comment: string;
    updateTime: string;
    isAutomated: boolean;
  };
  sentiment: 'positive' | 'neutral' | 'negative';
}

export interface GBPQuestion {
  id: string;
  clientId: string;
  authorName: string;
  questionText: string;
  createTime: string;
  answer?: {
    answerText: string;
    isAutomated: boolean;
    answeredAt: string;
  };
}

export interface ReviewRequestCampaign {
  id: string;
  clientId: string;
  customerName: string;
  customerContact: string; // Phone or Email
  channel: 'SMS' | 'EMAIL';
  message: string;
  status: 'QUEUED' | 'SENT' | 'CLICKED' | 'REVIEWED';
  sentAt?: string;
}
