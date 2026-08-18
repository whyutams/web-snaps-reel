export interface VideoItem {
  id: string;
  videoUrl: string;
  posterUrl: string;
  username: string;
  avatar: string;
  caption: string;
  hashtags: string[];
  soundName: string;
  likesCount: number;
  likesFormatted: string;
  comments: string;
  shares: string;
}

export const VIDEOS_DATA: VideoItem[] = [
  {
    id: "reel-1",
    videoUrl: "/videos/p-info-flexing.mp4",
    posterUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80",
    username: "@sultan_circle",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    caption: "P info flexing 💵💅✨",
    hashtags: ["#flexing", "#sultan", "#rich", "#money", "#fyp"],
    soundName: "Suara Asli - @sultan_circle • Dangdut Flexing Beat",
    likesCount: 124500,
    likesFormatted: "124.5K",
    comments: "3,420",
    shares: "1,890",
  },
  {
    id: "reel-2",
    videoUrl: "/videos/no-desc.mp4",
    posterUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    username: "@ocean_melancholy",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    caption: "Sometimes the ocean is the only one that understands 🌊💙",
    hashtags: ["#ocean", "#sea", "#melancholy", "#aesthetic", "#vibes"],
    soundName: "Merry Christmas Please Don't Call - Sad Acoustic Sea",
    likesCount: 89400,
    likesFormatted: "89.4K",
    comments: "1,210",
    shares: "640",
  },
  {
    id: "reel-3",
    videoUrl: "/videos/iklan-pinjol.mp4",
    posterUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
    username: "@gak_pernah_laku",
    avatar: "/icons/pp pinjol.png",
    caption: "Cair cepat, proses gampang. Gak pake ribet! 💸 Coba sekarang di Gak Pernah Laku 🚀",
    hashtags: ["#pinjol", "#caircepat", "#pinjamanonline", "#solusikeuangan", "#gakpernahlaku"],
    soundName: "Iklan Resmi - @gak_pernah_laku • Pinjaman Cepat",
    likesCount: 254900,
    likesFormatted: "254.9K",
    comments: "8,940",
    shares: "5,120",
  },
];
