import {createHmac} from 'crypto'; import {db} from './db';
export const bucketFor=(ip:string)=>createHmac('sha256',process.env.IP_HASH_SECRET!).update(ip).digest('hex');
/** 5 failures/15min per bucket; 30/hour global. Returns seconds to wait or 0. */
export async function limited(bucket:string){
 const d=db(), now=Date.now(), since=(ms:number)=>new Date(now-ms).toISOString();
 const mine=await d.from('auth_attempt').select('attempted_at').eq('bucket',bucket).eq('succeeded',false).gte('attempted_at',since(15*60e3)).order('attempted_at',{ascending:false});
 if((mine.data?.length??0)>=5) return Math.max(60,Math.ceil((new Date(mine.data![0].attempted_at).getTime()+15*60e3-now)/1000));
 const g=await d.from('auth_attempt').select('id',{count:'exact',head:true}).eq('succeeded',false).gte('attempted_at',since(3600e3));
 return (g.count??0)>=30?900:0; }
export const record=(bucket:string,succeeded:boolean)=>db().from('auth_attempt').insert({bucket,succeeded});
