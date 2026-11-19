import {hash,verify} from '@node-rs/argon2'; import {createHmac} from 'crypto';
import {normalizeDate} from './normalize';
const peppered=(c:string)=>createHmac('sha256',process.env.ANSWER_PEPPER!).update(c).digest('hex');
export const hashAnswer=(canonical:string)=>hash(peppered(canonical));
let dummy:string|null=null;
/** Always performs one argon2 verify so timing doesn't reveal parse failures. */
export async function checkAnswer(raw:string,stored:string|null){
 const c=normalizeDate(raw);
 dummy ??= await hash('dummy');
 const good=await verify(stored??dummy, peppered(c??'invalid')).catch(()=>false);
 return !!c && !!stored && good; }
