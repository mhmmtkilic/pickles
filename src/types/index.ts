// Kullanıcı Rolleri
export type UserRole = 
  | "yeni_gelen"      // 0-500 Coin
  | "seyyah"          // 501-2500 Coin
  | "gezgin"          // 2501-10000 Coin
  | "kasif_meraklisi" // 10001-50000 Coin
  | "konya_bilgesi";  // 50001+ Coin

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: UserRole;
  gencCoin: number;
  kulturKartId?: string;
  badges: Badge[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedAt: Date;
}

// Rol Bilgileri
export interface RoleInfo {
  name: string;
  turkishName: string;
  minCoin: number;
  maxCoin: number;
  multiplier: number;
  permissions: string[];
  color: string;
}

// Başlık (Topic) - Wiki + Sözlük
export interface Topic {
  id: string;
  title: string;
  slug: string;
  category: TopicCategory;
  wikiContent: WikiContent;
  entries: Entry[];
  viewCount: number;
  contributorCount: number;
  createdBy: User;
  createdAt: Date;
  updatedAt: Date;
}

export type TopicCategory = 
  | "akademik"
  | "sosyal_yasam"
  | "barinma"
  | "kariyer"
  | "konya_kesif";

export interface WikiContent {
  id: string;
  content: string;
  lastEditedBy: User;
  lastEditedAt: Date;
  version: number;
  usefulVotes: number;
  notUsefulVotes: number;
}

export interface WikiEdit {
  id: string;
  topicId: string;
  content: string;
  editedBy: User;
  editedAt: Date;
  status: "pending" | "approved" | "rejected" | "reverted";
  version: number;
}

// Yorum (Entry) - Sözlük Alanı
export interface Entry {
  id: string;
  topicId: string;
  content: string;
  author: User;
  likes: number;
  dislikes: number;
  isLiked?: boolean;
  isDisliked?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// GençCoin İşlemleri
export interface CoinTransaction {
  id: string;
  userId: string;
  amount: number;
  type: CoinTransactionType;
  description: string;
  createdAt: Date;
}

export type CoinTransactionType = 
  | "topic_created"
  | "wiki_edit"
  | "entry_written"
  | "wiki_useful_vote"
  | "wiki_not_useful_vote"
  | "entry_liked"
  | "social_project"
  | "referral_bonus"
  | "kultur_kart_transfer";

// Bildirimler
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  link?: string;
  createdAt: Date;
}

export type NotificationType = 
  | "coin_earned"
  | "role_upgrade"
  | "entry_liked"
  | "wiki_approved"
  | "wiki_rejected"
  | "badge_earned"
  | "system";

// API Response tipleri
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form tipleri
export interface LoginFormData {
  kulturKartId: string;
  password: string;
}

export interface RegisterFormData {
  username: string;
  email: string;
  kulturKartId: string;
  password: string;
  confirmPassword: string;
}

// Genel tipler
export type Status = "idle" | "loading" | "success" | "error";

// Feed tipleri
export type FeedItemType = "post" | "wiki" | "job" | "academic";
export type JobType = "ozel_ders" | "ev_arkadasi" | "part_time" | "staj";
export type FileType = "pdf" | "zip" | "doc" | "ppt";

export interface FeedItem {
  id: string;
  type: FeedItemType;
  createdAt: Date;
}

// Etkinlik tipleri
export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
}

// Liderlik tablosu
export interface LeaderboardUser {
  rank: number;
  name: string;
  username: string;
  role: UserRole;
  avatar?: string;
  coins: number;
}