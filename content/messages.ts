export interface ChaosCapsule {
  id: string;
  topic: string;
  badge: string;
  icon: string;
  quote: string;
  verdict: string;
  friendshipStat: string;
  scrapbookSticker: string;
}

export interface StargazeConfession {
  id: string;
  starTitle: string;
  whisper: string;
  detail: string;
  symbol: string;
  tag: string;
}

// Chapter 03: The Friendship Chronicles — Authentic, warm, real human words
export const chaosDossier: ChaosCapsule[] = [
  {
    id: "case-01",
    topic: "7th Standard: How Two Random Kids Became Inseparable",
    badge: "Where It All Started 🎒",
    icon: "🏫",
    quote: "“Remember back in 7th std, sitting in class, sharing silly jokes and borrowing stationery? We were just kids then.”",
    verdict: "It’s crazy to think that a random classroom friendship back in school would turn into the most solid, comforting thing in my life. Through changed schools, new phases, and growing up, you stayed.",
    friendshipStat: "Since: 7th Standard • Still Standing Strong ⏳",
    scrapbookSticker: "DAY ONE BESTIE 🌸",
  },
  {
    id: "case-02",
    topic: "No Matter How Many Miles Apart, Nothing Changes",
    badge: "Distance Can't Touch Us ✈️",
    icon: "📍",
    quote: "“We might not talk every single day or live in the same place, but the second we connect, it feels like yesterday.”",
    verdict: "Real friendship isn't about needing to be side-by-side 24/7. It's knowing that even with distance, busy schedules, and time zones, you're the first person I want to text when something crazy happens.",
    friendshipStat: "Bond Strength: 100% Unbreakable 🛡️",
    scrapbookSticker: "DISTANCE IS NOTHING 💌",
  },
  {
    id: "case-03",
    topic: "Growing Up Together Without Growing Apart",
    badge: "Through Every Phase 🌿",
    icon: "👭",
    quote: "“We saw each other go from awkward school uniforms to figuring out real life and actual adulthood.”",
    verdict: "Most school friends become just names on a contacts list, but not us. You've held my secrets, tolerated my vents, celebrated my wins, and always kept me grounded. Having someone who knows who you were at 13 and loves who you are now is rare.",
    friendshipStat: "Years of Trust: Priceless 🌟",
    scrapbookSticker: "LIFELONG ALLY 💫",
  },
  {
    id: "case-04",
    topic: "That Telepathic Eye-Contact Humor",
    badge: "Inside Jokes Only 🤫",
    icon: "😂",
    quote: "“One glance across the room, and we both start suffocating trying to hold back our laughter.”",
    verdict: "Nobody else gets our weird jokes, the random callbacks from years ago, or why we find the dumbest things hilarious. It's an unspoken wavelength that belongs purely to us.",
    friendshipStat: "Laughing Fits: Off The Charts ♾️",
    scrapbookSticker: "TELEPATHIC DUO 💖",
  },
];

// Chapter 04: What I Genuinely Love About You (Genuine, heartfelt, human warmth)
export const constellationThoughts: StargazeConfession[] = [
  {
    id: "star-01",
    starTitle: "Your Unapologetic Confidence",
    whisper: "You walk into a place and your energy just instantly lifts the room.",
    detail: "You have this effortless way of being yourself without caring what everyone else thinks. It's inspiring to watch, and it makes everyone around you feel like they can be comfortable and real too.",
    symbol: "✨",
    tag: "Your Vibe",
  },
  {
    id: "star-02",
    starTitle: "That Crinkly-Eyed Laugh",
    whisper: "When you actually lose it laughing, it's impossible not to smile with you.",
    detail: "It's so genuine and contagious. If I've had a completely draining week, just hearing you laugh about some random incident completely resets everything.",
    symbol: "🌸",
    tag: "Pure Joy",
  },
  {
    id: "star-03",
    starTitle: "How Fiercely You Care",
    whisper: "Behind all the banter and teasing, you have the softest, most loyal heart.",
    detail: "You might act tough or chaotic, but you're one of the most thoughtful, fiercely protective friends anyone could ask for. If someone you love needs you, you're always there, no questions asked.",
    symbol: "🕊️",
    tag: "Your Heart",
  },
  {
    id: "star-04",
    starTitle: "Genuinely One Of A Kind",
    whisper: "They really broke the mold with you, Jennifer.",
    detail: "From your stubborn quirks to your wild stories, your sharp humor, and the comfort you give — there isn't anyone quite like you in my world, and there never will be. Never stop being you.",
    symbol: "💎",
    tag: "Irreplaceable",
  },
];
