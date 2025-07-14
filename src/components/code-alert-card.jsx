'use client';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Baby, Biohazard, Bomb, CheckCircle2, FileText, Flame, HeartPulse, Loader2, MapPin, ShieldAlert, Clock, } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { getProcedureSummary } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
const codeInfoMap = {
    'Code Red': { icon: Flame, color: 'text-red-500', bgColor: 'bg-red-500/10' },
    'Code Blue': { icon: HeartPulse, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
    'Code Pink': { icon: Baby, color: 'text-pink-500', bgColor: 'bg-pink-500/10' },
    'Code Silver': { icon: ShieldAlert, color: 'text-gray-500', bgColor: 'bg-gray-500/10' },
    'Code Black': { icon: Bomb, color: 'text-black', bgColor: 'bg-gray-800/10' },
    'Code Orange': { icon: Biohazard, color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
};
export default function CodeAlertCard({ code, onAcknowledge }) {
    const [isAcknowledging, setIsAcknowledging] = useState(false);
    const [isSummaryOpen, setIsSummaryOpen] = useState(false);
    const [summary, setSummary] = useState('');
    const [isLoadingSummary, setIsLoadingSummary] = useState(false);
    const { toast } = useToast();
    const handleAcknowledgeClick = () => {
        setIsAcknowledging(true);
        setTimeout(() => {
            onAcknowledge(code.id);
        }, 500); // Simulate network latency
    };
    const handleViewProcedureClick = async () => {
        setIsSummaryOpen(true);
        setIsLoadingSummary(true);
        const result = await getProcedureSummary(code.code);
        if (result.success) {
            setSummary(result.summary || '');
        }
        else {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: result.error,
            });
            setIsSummaryOpen(false);
        }
        setIsLoadingSummary(false);
    };
    const { icon: Icon, color, bgColor } = codeInfoMap[code.code] || codeInfoMap['Code Silver'];
    const cardClasses = cn('transition-all duration-500 ease-in-out', code.acknowledged ? 'bg-card/60 opacity-70' : 'bg-card');
    return (<>
      <Card className={cardClasses}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn('p-2 rounded-full', bgColor)}>
                <Icon className={cn('h-6 w-6', color)}/>
              </div>
              <span className="text-xl font-bold">{code.code}</span>
            </div>
            {code.acknowledged && (<div className="flex items-center gap-1 text-sm font-normal text-green-600">
                <CheckCircle2 className="h-4 w-4"/>
                <span>Acknowledged</span>
              </div>)}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg font-medium text-foreground">{code.type}</p>
          <div className="space-y-2 text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4"/>
              <span>{code.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4"/>
              <span>
                {formatDistanceToNow(code.timestamp, { addSuffix: true })}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <Button variant="outline" size="sm" onClick={handleViewProcedureClick}>
              <FileText className="mr-2 h-4 w-4"/>
              View Procedure
            </Button>
            {!code.acknowledged && (<Button onClick={handleAcknowledgeClick} disabled={isAcknowledging} size="sm">
                {isAcknowledging ? (<Loader2 className="mr-2 h-4 w-4 animate-spin"/>) : (<CheckCircle2 className="mr-2 h-4 w-4"/>)}
                Acknowledge
              </Button>)}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isSummaryOpen} onOpenChange={setIsSummaryOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Procedure for {code.code}</DialogTitle>
            <DialogDescription>AI-generated summary for quick reference.</DialogDescription>
          </DialogHeader>
          {isLoadingSummary ? (<div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary"/>
            </div>) : (<div className="py-4 text-sm whitespace-pre-wrap">{summary}</div>)}
        </DialogContent>
      </Dialog>
    </>);
}
