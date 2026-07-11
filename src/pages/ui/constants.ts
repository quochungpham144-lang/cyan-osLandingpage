import React from 'react';
import {
  Key, Play, Server, FileAudio, Mic, FileText, AlertTriangle, Activity
} from 'lucide-react';

export const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Key, Play, Server, FileAudio, Mic, FileText, AlertTriangle, Activity,
};

export const METHOD_COLORS: Record<string, string> = {
  GET: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 shadow-sm shadow-emerald-500/10',
  POST: 'bg-blue-500/15 text-blue-700 dark:text-blue-400 border border-blue-500/30 shadow-sm shadow-blue-500/10',
  DELETE: 'bg-red-500/15 text-red-700 dark:text-red-400 border border-red-500/30 shadow-sm shadow-red-500/10',
  PUT: 'bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 border border-yellow-500/30 shadow-sm shadow-yellow-500/10',
  PATCH: 'bg-orange-500/15 text-orange-700 dark:text-orange-400 border border-orange-500/30 shadow-sm shadow-orange-500/10',
};

export const STATUS_COLORS: Record<string, string> = {
  '400': 'text-yellow-600 dark:text-yellow-400',
  '401': 'text-red-600 dark:text-red-400',
  '402': 'text-orange-600 dark:text-orange-400',
  '403': 'text-orange-600 dark:text-orange-400',
  '404': 'text-yellow-600 dark:text-yellow-400',
  '429': 'text-orange-600 dark:text-orange-400',
  '500': 'text-red-600 dark:text-red-400',
};
