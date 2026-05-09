import React, { useState, useEffect } from 'react';
import { Activity, CheckCircle2, AlertCircle } from "lucide-react";

export const SmartSensorDemo = () => {
  const [isClean, setIsClean] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsClean((prev) => !prev);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <div className={`relative flex h-32 w-32 items-center justify-center rounded-full border-[8px] transition-all duration-1000 ${
          isClean ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'border-red-500 shadow-[0_0_20px_rgba(239,44,44,0.3)]'
        }`}>
          <Activity className={`h-12 w-12 transition-colors duration-1000 ${isClean ? 'text-blue-500' : 'text-red-500'}`} />
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-bold">
            {isClean ? "Cleaning complete" : "Dust & mites detected"}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            The LED sensor shows real-time cleanliness.
          </p>
        </div>
        <div className={`mt-4 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
          isClean ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
        }`}>
          {isClean ? "Blue = Clean" : "Red = Cleaning in progress"}
        </div>
      </div>
    </div>
  );
};
