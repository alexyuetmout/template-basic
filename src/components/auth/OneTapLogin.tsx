"use client"

import { useEffect, useState } from "react";
import { oneTap } from "@/lib/auth-client";
import { useSession } from "@/lib/auth-client";

interface OneTapLoginProps {
  callbackURL?: string;
  autoTrigger?: boolean;
}

export function OneTapLogin({ callbackURL = "/dashboard", autoTrigger = true }: OneTapLoginProps) {
  const [hasTriggered, setHasTriggered] = useState(false);
  const { data: session } = useSession();
  
  const triggerOneTap = async () => {
    // Don't trigger if user is already logged in
    if (session?.user) {
      return;
    }

    // Avoid multiple triggers
    if (hasTriggered) {
      return;
    }

    setHasTriggered(true);

    try {
      await oneTap({
        callbackURL,
        onPromptNotification: (notification) => {
          console.log("One Tap prompt notification:", notification);
          // Reset trigger flag if prompt was dismissed
          if (notification.isSkippedMoment()) {
            setHasTriggered(false);
          }
        },
        fetchOptions: {
          onError: (ctx) => {
            console.log("One Tap fetch error:", ctx.error);
            // Reset trigger flag on error
            setHasTriggered(false);
          },
          onSuccess: () => {
            console.log("One Tap login successful");
          }
        }
      });
    } catch (error) {
      console.log("One Tap error:", error);
      // Reset trigger flag on error
      setHasTriggered(false);
    }
  };

  useEffect(() => {
    if (autoTrigger && !session?.user && !hasTriggered) {
      // Longer delay to ensure Google GSI library is fully loaded
      const timer = setTimeout(() => {
        triggerOneTap();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [autoTrigger, session?.user, hasTriggered]);

  // Don't render anything if user is already logged in
  if (session?.user) {
    return null;
  }

  return (
    <div className="one-tap-container">
      {!autoTrigger && (
        <button
          onClick={triggerOneTap}
          disabled={hasTriggered}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          {hasTriggered ? "Loading..." : "Login with Google One Tap"}
        </button>
      )}
    </div>
  );
}