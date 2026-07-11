import { SchemaField } from './types';
import { DataTable } from './DataTable';

interface SchemaTableProps {
  fields: SchemaField[];
  label?: string;
}

export function SchemaTable({ fields, label }: SchemaTableProps) {
  const hasAliases = fields.some(f => f.aliases);
  const showRequired = fields.some(f => f.required !== undefined);
  const headers = ['Field', ...(hasAliases ? ['Aliases'] : []), 'Type', ...(showRequired ? ['Required'] : []), 'Description'];
  const rows = fields.map(f => [
    f.field,
    ...(hasAliases ? [f.aliases ?? '—'] : []),
    f.type,
    ...(showRequired ? [f.required === true ? 'Yes' : f.required === false ? 'No' : '—'] : []),
    f.description
  ]);
  return <DataTable headers={headers} rows={rows} label={label} />;
}
