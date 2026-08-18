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
    id: "reel-2",
    videoUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    username: "@cinema_trailer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    caption: "Trailer animasi petualangan dengan musik orkestra megah ⚔️🐉",
    hashtags: ["#animation", "#fantasy", "#cinema", "#fypシ", "#viral"],
    soundName: "Sintel Cinematic Orchestra Sound Track",
    likesCount: 2900,
    likesFormatted: "2.9K",
    comments: "5,892",
    shares: "3,410",
  },
  {
    id: "reel-1",
    videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
    posterUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    username: "@ocean_deep",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    caption: "Menelusuri keindahan dan gemuruh ombak samudra biru 🌊🐚",
    hashtags: ["#fyp", "#ocean", "#waves", "#nature", "#snapsreel"],
    soundName: "Suara Asli - @ocean_deep • Ocean Waves Audio",
    likesCount: 4500,
    likesFormatted: "4.5K",
    comments: "2,120",
    shares: "1,190",
  },
  {
    id: "reel-4",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
    username: "@cartoon_hub",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    caption: "Momen lucu karakter kelinci animasi 🐰🎶",
    hashtags: ["#funny", "#animation", "#cartoon", "#snaps"],
    soundName: "Big Buck Bunny Original Soundtrack",
    likesCount: 15400,
    likesFormatted: "15.4K",
    comments: "3,210",
    shares: "1,450",
  },
];
