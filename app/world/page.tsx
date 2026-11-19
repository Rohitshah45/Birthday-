import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ScrapbookClient from './ScrapbookClient';

export const dynamic = 'force-dynamic';

export default async function World() {
  const visitorCookie = (await cookies()).get('lw_visitor')?.value;
  if (!visitorCookie) {
    redirect('/');
  }

  return <ScrapbookClient />;
}
