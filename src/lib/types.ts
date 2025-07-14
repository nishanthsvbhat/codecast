import type { LucideIcon } from 'lucide-react';

export type CodeType = 'Code Red' | 'Code Blue' | 'Code Pink' | 'Code Silver' | 'Code Black' | 'Code Orange';

export interface CodeAlert {
  id: string;
  code: CodeType;
  type: string;
  location: string;
  timestamp: Date;
  acknowledged: boolean;
  acknowledgedAt?: Date;
}

export interface CodeInfo {
  icon: LucideIcon;
  color: string;
  bgColor: string;
}
