import ClientDetailsView from './ClientDetailsView';
import { INITIAL_CLIENTS } from '@/data/mockData';

export function generateStaticParams() {
  const ids: { id: string }[] = [];
  INITIAL_CLIENTS.forEach((c) => {
    ids.push({ id: c.id });
    ids.push({ id: String(c.clientNo) });
  });
  ids.push(
    { id: 'c-rahul-sharma' },
    { id: 'sharma-cafe' },
    { id: 'demo' },
    { id: 'c-233' },
    { id: '233' }
  );
  const uniqueIds = Array.from(new Set(ids.map((item) => item.id))).map((id) => ({ id }));
  return uniqueIds;
}

export default function Page() {
  return <ClientDetailsView />;
}
