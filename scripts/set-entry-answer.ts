import {createInterface} from 'readline'; import {createClient} from '@supabase/supabase-js';
import {hashAnswer} from '../lib/hash'; import {normalizeDate} from '../lib/normalize';
// Run: npx tsx --env-file=.env.local scripts/set-entry-answer.ts  (input is hidden; nothing is printed or stored in plaintext)
function ask(q:string):Promise<string>{ return new Promise(r=>{ const rl:any=createInterface({input:process.stdin,output:process.stdout});
 rl._writeToOutput=(s:string)=>{ if(s.includes(q)) process.stdout.write(s); }; rl.question(q,(a:string)=>{rl.close();process.stdout.write('\n');r(a);}); }); }
(async()=>{ const a=await ask('Answer: '), b=await ask('Confirm: ');
 const c=normalizeDate(a); if(!c||a.trim()!==b.trim()) throw new Error('Unparseable date, or the two entries differ.');
 const d=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.SUPABASE_SERVICE_ROLE_KEY!);
 const {data:p}=await d.from('birthday_project').select('id,session_epoch').single();
 const {error}=await d.from('birthday_project').update({answer_hash:await hashAnswer(c),session_epoch:(p!.session_epoch)+1}).eq('id',p!.id);
 if(error) throw error; console.log('Answer hash saved. Sessions revoked.'); })().catch(e=>{console.error(e.message);process.exit(1);});
