export interface MemoryPhoto {
  id: string;
  src: string;
  caption: string;
  date?: string;
  tag?: string;
  rotation?: number;
  note?: string;
}

export const memories: MemoryPhoto[] = [
  {
    id: "mem-1",
    src: "/memories/photo1.jpg",
    caption: "That smile says it all.",
    date: "A Day to Remember",
    tag: "Core Memory 💫",
    rotation: -2.5,
    note: "Honestly, how can someone look this happy and radiant without even trying?",
  },
  {
    id: "mem-2",
    src: "/memories/photo2.jpg",
    caption: "Golden moments with you.",
    date: "Pure Joy",
    tag: "Favorite Vibe ✨",
    rotation: 3,
    note: "Just one of those days where we laughed so much my stomach actually hurt.",
  },
  {
    id: "mem-3",
    src: "/memories/photo3.jpg",
    caption: "Our crazy, unfiltered bond.",
    date: "Unplanned Chaos",
    tag: "Partners in Crime 🌸",
    rotation: -1.8,
    note: "No filters, no pretending — just us being completely ourselves.",
  },
  {
    id: "mem-4",
    src: "/memories/photo4.jpg",
    caption: "Jennifer in her element.",
    date: "Unforgettable",
    tag: "Main Character 👑",
    rotation: 2.2,
    note: "Look at you! Effortlessly stunning and always bringing the best energy.",
  },
];
