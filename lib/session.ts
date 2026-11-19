import {SignJWT,jwtVerify} from 'jose'; import {db} from './db';
export const COOKIE='lw_session';
const key=()=>new TextEncoder().encode(process.env.SESSION_SECRET!);
export const signVisitor=(epoch:number,hours:number)=>new SignJWT({sub:'visitor',epoch}).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime(`${hours}h`).sign(key());
export async function readToken(t?:string){ if(!t) return null; try{ return (await jwtVerify(t,key(),{algorithms:['HS256']})).payload as {epoch:number}; }catch{ return null; } }
/** Full check incl. revocation epoch. Use in every protected handler/page. */
export async function isVisitor(t?:string){ const p=await readToken(t); if(!p) return false;
 const {data}=await db().from('birthday_project').select('session_epoch').single(); return data?.session_epoch===p.epoch; }
