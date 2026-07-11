import { useState } from 'react';
import { Endpoint } from './types';
import { METHOD_COLORS, STATUS_COLORS } from './constants';
import { CodeBlock } from './CodeBlock';
import { DataTable } from './DataTable';
import { SchemaTable } from './SchemaTable';

interface EndpointBlockProps {
  ep: Endpoint;
}

export function EndpointBlock({ ep }: EndpointBlockProps) {
  const [open, setOpen] = useState(true);
  const [copiedCurl, setCopiedCurl] = useState(false);
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://api.cyan-os.cc/api/v1";
  const fullUrl = `${baseUrl}${ep.path || ""}`;

  const handleCopyCurl = () => {
    let curlCmd = `curl -X ${ep.method || "GET"} "${fullUrl}"`;
    
    // Add Authorization header
    curlCmd += ` \\\n  -H "Authorization: Bearer YOUR_API_KEY"`;
    
    // Add custom headers if any
    if (ep.headers && ep.headers.length > 0) {
      ep.headers.forEach(h => {
        curlCmd += ` \\\n  -H "${h.name}: ${h.value}"`;
      });
    }
    
    // If request body exists, add content type and mock JSON payload
    if (ep.requestBody || ep.modes) {
      curlCmd += ` \\\n  -H "Content-Type: application/json"`;
      
      const payload: Record<string, unknown> = {};
      const fields = ep.requestBody?.fields || ep.modes?.[0]?.requestBody?.fields || [];
      fields.forEach(f => {
        if (f.field) {
          if (f.type.toLowerCase().includes("boolean")) {
            payload[f.field] = true;
          } else if (f.type.toLowerCase().includes("number") || f.type.toLowerCase().includes("int")) {
            payload[f.field] = 1;
          } else if (f.type.toLowerCase().includes("array")) {
            payload[f.field] = ["string"];
          } else {
            payload[f.field] = "string";
          }
        }
      });
      
      curlCmd += ` \\\n  -d '${JSON.stringify(payload, null, 2)}'`;
    }
    
    navigator.clipboard.writeText(curlCmd);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  return (
    <div className="border border-slate-200 dark:border-slate-800/80 rounded-2xl mb-12 shadow-sm bg-white dark:bg-slate-900/30 hover:border-slate-300 dark:hover:border-slate-750 transition-all duration-200" id={ep.id}>
      {/* Top Header / Expand Toggle Bar */}
      <div
        onClick={() => setOpen(o => !o)}
        className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-4 bg-slate-50/80 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800/80 rounded-t-2xl cursor-pointer select-none transition-colors"
      >
        <div className="flex flex-wrap items-center gap-3 min-w-0">
          {ep.method && (
            <span className={`px-2.5 py-1 text-xs font-extrabold rounded-md font-mono tracking-wider shrink-0 ${METHOD_COLORS[ep.method] ?? 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-300'}`}>
              {ep.method}
            </span>
          )}
          <span className="font-bold text-gray-900 dark:text-white text-base sm:text-lg">{ep.label}</span>
          {ep.path && <code className="text-gray-500 dark:text-gray-400 font-mono text-xs sm:text-sm hidden md:inline font-semibold">{ep.path}</code>}
        </div>

        <div className="flex items-center gap-3 ml-auto sm:ml-0 shrink-0">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 bg-slate-200/60 dark:bg-slate-800 px-2.5 py-1 rounded-md">
            {open ? 'Collapse' : 'Expand'}
          </span>
        </div>
      </div>

      {/* 2-Column Main Content Section (Left side long, right side short & sticky) */}
      {open && (
        <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 rounded-b-2xl">
          {/* Left Column: Description & Schemas (7 cols on lg, stretches grid row height) */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">{ep.description}</p>

            {ep.auth && (
              <div className="inline-flex items-center gap-2 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5">
                <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-bold">Authentication:</span>
                <span className="text-xs text-cyan-600 dark:text-cyan-400 font-mono font-semibold">{ep.auth}</span>
              </div>
            )}

            {ep.headers && ep.headers.length > 0 && (
              <DataTable label="Request Headers" headers={["Header", "Value"]} rows={ep.headers.map(h => [h.name, h.value])} />
            )}

            {ep.pathParams && ep.pathParams.length > 0 && (
              <DataTable label="Path Parameters" headers={["Parameter", "Type", "Description"]} rows={ep.pathParams.map(p => [p.param, p.type, p.description])} />
            )}

            {ep.queryParams && ep.queryParams.length > 0 && (
              <DataTable label="Query Parameters" headers={["Parameter", "Type", "Default", "Description"]} rows={ep.queryParams.map(p => [p.param, p.type, p.default ?? '—', p.description])} />
            )}

            {ep.modes ? (
              <div className="space-y-6">
                {ep.modes.map((mode, mi) => (
                  <div key={mi} className="border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4 bg-slate-50/40 dark:bg-slate-900/20">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white border-l-2 border-cyan-500 pl-2.5">
                      {mode.label} Schema
                    </h4>
                    <SchemaTable fields={mode.requestBody.fields} label="Fields" />
                  </div>
                ))}
              </div>
            ) : ep.requestBody ? (
              <div>
                <SchemaTable fields={ep.requestBody.fields} label={ep.requestBody.label + (ep.requestBody.note ? ` — ${ep.requestBody.note}` : '')} />
              </div>
            ) : null}

            {ep.oceanTable && (
              <div>
                <DataTable headers={ep.oceanTable.headers} rows={ep.oceanTable.rows} label="Ocean Endpoints" />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">{ep.oceanTable.note}</p>
              </div>
            )}

            {ep.voiceTables && ep.voiceTables.map((vt, vi) => (
              <DataTable key={vi} headers={vt.headers} rows={vt.rows} label={`${vt.provider} Voices`} />
            ))}

            {ep.responseSchema && ep.responseSchema.length > 0 && (
              <SchemaTable fields={ep.responseSchema} label="Response Schema" />
            )}

            {ep.errors && ep.errors.length > 0 && (
              <div className="mt-6 border border-slate-200 dark:border-slate-800 rounded-xl overflow-x-auto custom-scrollbar shadow-sm bg-slate-50/30 dark:bg-slate-900/20">
                <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Error Responses
                </div>
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-50/50 dark:bg-slate-950/40">
                      <th className="px-4 py-2.5 text-left font-bold text-gray-650 dark:text-gray-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">Status</th>
                      <th className="px-4 py-2.5 text-left font-bold text-gray-650 dark:text-gray-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">Code</th>
                      <th className="px-4 py-2.5 text-left font-bold text-gray-650 dark:text-gray-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
                    {ep.errors.map((e, ei) => (
                      <tr key={ei} className="hover:bg-slate-100/40 dark:hover:bg-slate-800/20 transition-colors">
                        <td className={`px-4 py-2.5 font-mono font-bold ${STATUS_COLORS[e.status] ?? 'text-gray-700 dark:text-gray-400'}`}>{e.status}</td>
                        <td className="px-4 py-2.5 font-mono text-gray-800 dark:text-gray-200 font-semibold">{e.code}</td>
                        <td className="px-4 py-2.5 text-gray-600 dark:text-gray-300">{e.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Right Column Grid Wrapper (5 cols on lg, stretches to left column's height) */}
          <div className="lg:col-span-5">
            {/* Inner Sticky Box: Short right-side box sticks at top-6 until long left side finishes */}
            <div className="space-y-5 lg:sticky lg:top-6 lg:z-10">
              {/* Dark Terminal Box for Endpoint URL & Try/Copy actions */}
              <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-xl">
                <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                    <span className="text-xs font-mono font-bold text-gray-300 uppercase tracking-wider">Endpoint URL</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyCurl}
                      className="px-2.5 py-1 text-[11px] font-semibold bg-slate-800 hover:bg-slate-750 text-slate-200 rounded border border-slate-700 transition-all active:scale-95"
                    >
                      {copiedCurl ? "Copied cURL!" : "Copy cURL"}
                    </button>
                    <a
                      href="https://rapidapi.com/cyan-os-cyan-os-default/api/cyan-os-lite"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 text-[11px] font-semibold bg-cyan-600 hover:bg-cyan-500 text-white rounded transition-all shadow-sm active:scale-95"
                    >
                      Try
                    </a>
                  </div>
                </div>
                <div className="p-4 font-mono text-xs sm:text-[13px] text-cyan-400 break-all bg-black/50 leading-relaxed">
                  <span className="font-extrabold text-white mr-2">{ep.method}</span>
                  <span>{fullUrl}</span>
                </div>
              </div>

              {/* Example Request Code Block(s) */}
              {ep.modes ? (
                ep.modes.map((mode, mi) => (
                  <div key={mi} className="space-y-2">
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block px-1">
                      {mode.label} Payload Example
                    </span>
                    <CodeBlock code={mode.exampleRequest.code} language={mode.exampleRequest.language} label={`${mode.label} Request`} />
                  </div>
                ))
              ) : ep.exampleRequest ? (
                <CodeBlock code={ep.exampleRequest.code} language={ep.exampleRequest.language} label="Sample Request Payload" />
              ) : null}

              {/* Response Code Block(s) */}
              {ep.responses && ep.responses.length > 0 ? (
                ep.responses.map((r, ri) => (
                  <div key={ri} className="space-y-1.5">
                    {r.note && <p className="text-xs text-gray-500 dark:text-gray-400 font-medium px-1">{r.note}</p>}
                    <CodeBlock code={r.code} language="json" label={`Sample Response (${r.status})`} />
                  </div>
                ))
              ) : (
                <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs text-gray-400 shadow-md">
                  <span className="text-gray-500 block mb-2 font-bold uppercase tracking-wider text-[10px]">Quick cURL Snippet</span>
                  <pre className="text-cyan-400 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                    {`curl -X ${ep.method || "GET"} "${fullUrl}" \\\n  -H "Authorization: Bearer YOUR_API_KEY"`}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
