import { RoleInfo, TopicCategory } from "@/types";

// Uygulama sabitleri
export const APP_NAME = "Konya Genç WikiSözlük";
export const APP_DESCRIPTION = "Konya'daki üniversite öğrencilerinin kolektif bilgi platformu";

// Rota sabitleri
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DISCOVER: "/discover",
  SEARCH: "/search",
  PROFILE: "/profile",
  SETTINGS: "/settings",
  TOPIC: (slug: string) => `/topic/${slug}`,
  TOPIC_CREATE: "/topic/create",
  CATEGORY: (category: string) => `/category/${category}`,
  COIN_TRANSFER: "/coin-transfer",
  REFERRAL: "/referral",
  NOTIFICATIONS: "/notifications",
  LEADERBOARD: "/leaderboard",
} as const;

// Rol Bilgileri
export const ROLES: Record<string, RoleInfo> = {
  yeni_gelen: {
    name: "yeni_gelen",
    turkishName: "Yeni Gelen",
    minCoin: 0,
    maxCoin: 500,
    multiplier: 1.0,
    permissions: ["comment", "suggest_edit"],
    color: "#94a3b8", // slate-400
  },
  seyyah: {
    name: "seyyah",
    turkishName: "Seyyah",
    minCoin: 501,
    maxCoin: 2500,
    multiplier: 1.2,
    permissions: ["comment", "edit_wiki"],
    color: "#22c55e", // green-500
  },
  gezgin: {
    name: "gezgin",
    turkishName: "Gezgin",
    minCoin: 2501,
    maxCoin: 10000,
    multiplier: 1.5,
    permissions: ["comment", "edit_wiki", "create_topic"],
    color: "#3b82f6", // blue-500
  },
  kasif_meraklisi: {
    name: "kasif_meraklisi",
    turkishName: "Kaşif Meraklısı",
    minCoin: 10001,
    maxCoin: 50000,
    multiplier: 2.0,
    permissions: ["comment", "edit_wiki", "create_topic", "moderate"],
    color: "#a855f7", // purple-500
  },
  konya_bilgesi: {
    name: "konya_bilgesi",
    turkishName: "Konya Bilgesi",
    minCoin: 50001,
    maxCoin: Infinity,
    multiplier: 2.5,
    permissions: ["comment", "edit_wiki", "create_topic", "moderate", "admin_view"],
    color: "#f59e0b", // amber-500
  },
};

// Kategori Bilgileri
export const CATEGORIES: Record<TopicCategory, { name: string; icon: string; description: string }> = {
  akademik: {
    name: "Akademik Destek",
    icon: "📚",
    description: "Ders notları, hoca rehberleri, sınav tüyoları",
  },
  sosyal_yasam: {
    name: "Sosyal Yaşam & Mekan",
    icon: "☕",
    description: "Kafeler, restoranlar, etkinlikler",
  },
  barinma: {
    name: "Barınma & Yaşam",
    icon: "🏠",
    description: "Yurtlar, kiralık evler, ulaşım",
  },
  kariyer: {
    name: "Kariyer & Gelişim",
    icon: "💼",
    description: "Stajlar, part-time işler, burslar",
  },
  konya_kesif: {
    name: "Konya Keşif Rehberi",
    icon: "🗺️",
    description: "Turistik yerler, yerel lezzetler",
  },
};

// Coin Kazanma Tablosu
export const COIN_REWARDS = {
  topic_created: 20,
  wiki_edit: 10,
  entry_written: 2,
  wiki_useful_vote: 5,
  wiki_not_useful_vote: -10,
  entry_liked: 1,
  social_project: 100,
  referral_bonus: 100,
} as const;

// Kültür Kart Dönüşüm Oranı
export const KULTUR_KART_CONVERSION_RATE = 100; // 100 GençCoin = 1 Kültür Kart Puanı

// API sabitleri
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
  },
  USERS: {
    LIST: "/users",
    GET: (id: string) => `/users/${id}`,
    PROFILE: "/users/profile",
    LEADERBOARD: "/users/leaderboard",
  },
  TOPICS: {
    LIST: "/topics",
    GET: (slug: string) => `/topics/${slug}`,
    CREATE: "/topics",
    TRENDING: "/topics/trending",
    BY_CATEGORY: (category: string) => `/topics/category/${category}`,
  },
  ENTRIES: {
    LIST: (topicId: string) => `/topics/${topicId}/entries`,
    CREATE: (topicId: string) => `/topics/${topicId}/entries`,
    POPULAR: "/entries/popular",
  },
  WIKI: {
    EDIT: (topicId: string) => `/topics/${topicId}/wiki`,
    HISTORY: (topicId: string) => `/topics/${topicId}/wiki/history`,
  },
  COINS: {
    BALANCE: "/coins/balance",
    TRANSACTIONS: "/coins/transactions",
    TRANSFER: "/coins/transfer-to-kart",
  },
  NOTIFICATIONS: {
    LIST: "/notifications",
    MARK_READ: (id: string) => `/notifications/${id}/read`,
  },
} as const;

// Sayfalama sabitleri
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  LIMIT_OPTIONS: [10, 25, 50, 100],
} as const;
