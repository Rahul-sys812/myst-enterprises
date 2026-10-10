import InvoiceStandaloneView from './InvoiceStandaloneView';
import { INITIAL_INVOICES, INITIAL_CLIENTS } from '@/data/mockData';

export function generateStaticParams() {
  const ids: { id: string }[] = [];
  INITIAL_INVOICES.forEach((inv) => {
    ids.push({ id: inv.id });
    ids.push({ id: inv.invoiceNumber });
    ids.push({ id: inv.invoiceNumber.toLowerCase() });
    ids.push({ id: String(inv.clientNo) });
    ids.push({ id: `c-${inv.clientNo}` });
  });
  INITIAL_CLIENTS.forEach((c) => {
    ids.push({ id: c.id });
    ids.push({ id: String(c.clientNo) });
  });
  ids.push(
    { id: 'demo' },
    { id: 'sharma-cafe' },
    { id: 'c-rahul-sharma' },
    { id: 'c-233' },
    { id: 'INV-233' }
  );
  const uniqueIds = Array.from(new Set(ids.map((item) => item.id))).map((id) => ({ id }));
  return uniqueIds;
}

export default function Page() {
  return <InvoiceStandaloneView />;
}
