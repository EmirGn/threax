export interface TweetUser {
  name: string;
  username: string;
  avatarUrl?: string;
  profileUrl: string;
}

export interface TweetMedia {
  type: 'image' | 'video';
  url: string;
  altText?: string;
}

export interface TweetEngagement {
  replies: number;
  retweets: number;
  likes: number;
  views?: number;
}

export interface TweetData {
  id: string;
  user: TweetUser;
  text: string;
  createdAt: string;
  media?: TweetMedia[];
  engagement: TweetEngagement;
  sourceUrl: string;
}

export interface GeneratedTweet {
  id: string;
  content: string;
  order: number;
}