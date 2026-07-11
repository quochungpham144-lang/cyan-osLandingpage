export type TableRow = string[];

export interface TableDef {
  headers: string[];
  rows: TableRow[];
  label?: string;
}

export interface SchemaField {
  field: string;
  type: string;
  required?: boolean;
  description: string;
  aliases?: string;
}

export interface ParamDef {
  param: string;
  type: string;
  description: string;
  default?: string;
}

export interface HeaderDef {
  name: string;
  value: string;
}

export interface RequestBody {
  label: string;
  note?: string;
  fields: SchemaField[];
}

export interface ResponseDef {
  status: string;
  code: string;
  note?: string;
}

export interface ErrorDef {
  status: string;
  code: string;
  description: string;
}

export interface OceanTable {
  headers: string[];
  rows: string[][];
  note: string;
}

export interface VoiceTable {
  provider: string;
  headers: string[];
  rows: string[][];
}

export interface Mode {
  label: string;
  requestBody: { fields: SchemaField[] };
  exampleRequest: { language: string; code: string };
}

export interface ContentBlock {
  type: string;
  text?: string;
  code?: string;
  language?: string;
  label?: string;
  variant?: string;
  items?: string[];
  headers?: string[];
  rows?: string[][];
}

export interface Endpoint {
  id: string;
  method: string | null;
  path: string | null;
  label: string;
  description: string;
  auth: string | null;
  headers?: HeaderDef[];
  requestBody?: RequestBody;
  exampleRequest?: { language: string; code: string };
  responses?: ResponseDef[];
  responseSchema?: SchemaField[];
  errors?: ErrorDef[];
  pathParams?: ParamDef[];
  queryParams?: ParamDef[];
  modes?: Mode[];
  oceanTable?: OceanTable;
  voiceTables?: VoiceTable[];
}

export interface Section {
  id: string;
  label: string;
  icon: string;
  description: string;
  content?: ContentBlock[];
  endpoints?: Endpoint[];
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
}
