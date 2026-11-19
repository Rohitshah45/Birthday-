const M:Record<string,number>={jan:1,feb:2,mar:3,apr:4,may:5,jun:6,jul:7,aug:8,sep:9,oct:10,nov:11,dec:12};
const p=(n:number)=>String(n).padStart(2,'0');
function ok(d:number,m:number,y?:number){ if(m<1||m>12||d<1||d>31) return null;
 const dt=new Date(Date.UTC(y??2000,m-1,d)); if(dt.getUTCMonth()!==m-1) return null;
 return y?`${y}-${p(m)}-${p(d)}`:`${p(m)}-${p(d)}`; }
/** Canonical date string or null. Numeric d/m is day-first. No year -> "MM-DD". */
export function normalizeDate(raw:string):string|null{
 const s=raw.trim().toLowerCase().replace(/(\d)(st|nd|rd|th)\b/g,'$1').replace(/,/g,' ').replace(/\s+/g,' ');
 let m=s.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/); if(m) return ok(+m[3],+m[2],+m[1]);
 m=s.match(/^(\d{1,2})[-/. ](\d{1,2})[-/. ](\d{4})$/); if(m) return ok(+m[1],+m[2],+m[3]);
 m=s.match(/^(\d{1,2})[-/.](\d{1,2})$/); if(m) return ok(+m[1],+m[2]);
 m=s.match(/^(\d{1,2}) ([a-z]{3,9})(?: (\d{4}))?$/); if(m&&M[m[2].slice(0,3)]) return ok(+m[1],M[m[2].slice(0,3)],m[3]?+m[3]:undefined);
 m=s.match(/^([a-z]{3,9}) (\d{1,2})(?: (\d{4}))?$/); if(m&&M[m[1].slice(0,3)]) return ok(+m[2],M[m[1].slice(0,3)],m[3]?+m[3]:undefined);
 return null; }
