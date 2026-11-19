export interface VideoMemory {
  id: string;
  src: string;
  title: string;
  desc: string;
  tag?: string;
  caption?: string;
  reelLabel?: string;
  secretNote?: string;
}

export const videos: VideoMemory[] = [
  {
    id: "vid-1",
    src: "/videos/video1.mp4",
    title: "Jennifer Being Jennifer 🎬",
    desc: "A genuine snippet of your laughter and infectious energy that photos just couldn't capture.",
    tag: "Sealed Tape • Sound On 🔊",
    reelLabel: "Archived Reel #01 • Candid Moments",
    secretNote: "Click the film seal to break it open and watch the reel!",
    caption: "There is never a dull second when you are around. Turn the sound on and enjoy!",
  },
];
