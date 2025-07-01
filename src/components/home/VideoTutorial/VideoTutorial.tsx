"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";

export function VideoTutorial() {
  const [isPlaying, setIsPlaying] = useState(false);
  const { t } = useTranslation("home");

  return (
    <div className="relative py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-background dark:bg-background rounded-3xl shadow-2xl overflow-hidden">
          <CardContent className="p-8 lg:p-12">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-foreground dark:text-foreground mb-4">
                {t("videoTutorial.title")}
              </h3>
              <p className="text-lg text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto">
                {t("videoTutorial.subtitle")}
              </p>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700">
                {!isPlaying ? (
                  <>
                    <Image
                      src="/images/tutorial/tutorial-thumbnail.jpg"
                      alt="AI Development Tutorial"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={() => setIsPlaying(true)}
                        className="flex items-center gap-3 bg-background/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full hover:bg-background/20 transition-all duration-300 transform hover:scale-105"
                      >
                        <Play className="h-6 w-6 fill-current" />
                        <span className="font-medium">
                          {t("videoTutorial.watchButton")}
                        </span>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                      title="AI Development Tutorial"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-2xl"
                    ></iframe>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
