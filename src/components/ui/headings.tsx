import React from "react";
import { cn } from "@/lib/utils";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

export const HeadingH1 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <h1
        ref={ref}
        className={cn(
          // 响应式字体大小: 手机端40px, 桌面端60px
          "text-4xl md:text-6xl",
          // 字体粗细700-900之间
          "font-bold",
          // 字母间距-0.4px
          "tracking-tight",
          // 行高1
          "leading-none",
          className
        )}
        {...props}
      >
        {children}
      </h1>
    );
  }
);
HeadingH1.displayName = "HeadingH1";

export const HeadingH2 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn(
          // 响应式字体大小: 手机端30px, 桌面端36px  
          "text-3xl md:text-4xl",
          // 字体粗细700-900之间
          "font-bold",
          // 字母间距-0.4px
          "tracking-tight", 
          // 行高1
          "leading-none",
          className
        )}
        {...props}
      >
        {children}
      </h2>
    );
  }
);
HeadingH2.displayName = "HeadingH2";