"use client";
import { useState, useMemo, useCallback } from 'react';
import { Stethoscope } from 'lucide-react';
import { initialCodes } from '@/lib/mock-data';
import CodeAlertCard from '@/components/code-alert-card';
import { Separator } from '@/components/ui/separator';
export default function Home() {
    const [codes, setCodes] = useState(initialCodes);
    const handleAcknowledge = useCallback((id) => {
        setCodes((prevCodes) => prevCodes.map((code) => code.id === id ? Object.assign(Object.assign({}, code), { acknowledged: true, acknowledgedAt: new Date() }) : code));
    }, []);
    const { activeCodes, recentCodes } = useMemo(() => {
        const active = codes
            .filter((code) => !code.acknowledged)
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        const recent = codes
            .filter((code) => code.acknowledged)
            .sort((a, b) => { var _a, _b; return (((_a = b.acknowledgedAt) === null || _a === void 0 ? void 0 : _a.getTime()) || 0) - (((_b = a.acknowledgedAt) === null || _b === void 0 ? void 0 : _b.getTime()) || 0); });
        return { activeCodes: active, recentCodes: recent };
    }, [codes]);
    return (<div className="min-h-screen w-full">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Stethoscope className="h-7 w-7 text-primary"/>
              <h1 className="text-2xl font-bold text-foreground">CodeCast</h1>
            </div>
            <div className="text-sm text-muted-foreground">
              Emergency Code Alerts
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Active Codes</h2>
            {activeCodes.length > 0 ? (<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {activeCodes.map((code) => (<CodeAlertCard key={code.id} code={code} onAcknowledge={handleAcknowledge}/>))}
              </div>) : (<div className="text-center py-10 px-4 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">No active codes at the moment.</p>
              </div>)}
          </div>

          <Separator />

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Recent Codes</h2>
            {recentCodes.length > 0 ? (<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {recentCodes.map((code) => (<CodeAlertCard key={code.id} code={code} onAcknowledge={handleAcknowledge}/>))}
              </div>) : (<div className="text-center py-10 px-4 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">No recently acknowledged codes.</p>
              </div>)}
          </div>
        </div>
      </main>
    </div>);
}
