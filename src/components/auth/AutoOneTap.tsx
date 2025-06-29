"use client"

import { useEffect, useState } from "react";
import { oneTap } from "@/lib/auth-client";
import { useSession } from "@/lib/auth-client";

interface AutoOneTapProps {
  callbackURL?: string;
  delay?: number;
}

export function AutoOneTap({ callbackURL = "/dashboard", delay = 3000 }: AutoOneTapProps) {
  const [hasTriggered, setHasTriggered] = useState(false);
  const { data: session, isPending } = useSession();
  
  useEffect(() => {
    // Don't trigger if user is already logged in or session is loading
    if (session?.user || isPending || hasTriggered) {
      return;
    }

    // Don't trigger on localhost (Google One Tap limitation)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('Google One Tap disabled on localhost');
      return;
    }

    // Only trigger on pages where it makes sense (not login pages)
    const currentPath = window.location.pathname;
    if (currentPath.includes('/auth/')) {
      return;
    }

    const timer = setTimeout(async () => {
      setHasTriggered(true);
      
      try {
        await oneTap({
          callbackURL,
          onPromptNotification: (notification) => {
            console.log("Auto One Tap notification:", notification);
          },
          fetchOptions: {
            onError: (ctx) => {
              console.log("Auto One Tap error:", ctx.error);
            },
            onSuccess: () => {
              console.log("Auto One Tap success");
            }
          }
        });
      } catch (error) {
        console.log("Auto One Tap error:", error);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [session?.user, isPending, hasTriggered, callbackURL, delay]);

  // This component doesn't render anything visible
  return null;
}