"use client"

import { forwardRef, useState } from "react"
import { cn } from "@/lib/utils"

interface AvatarProps {
  src?: string | null
  name?: string | null
  email?: string | null
  size?: "sm" | "md" | "lg"
  className?: string
}

// 预定义的颜色组合，类似 Google 的风格
const colorCombinations = [
  { bg: "bg-blue-600", text: "text-white" },
  { bg: "bg-green-600", text: "text-white" },
  { bg: "bg-purple-600", text: "text-white" },
  { bg: "bg-red-600", text: "text-white" },
  { bg: "bg-orange-600", text: "text-white" },
  { bg: "bg-pink-600", text: "text-white" },
  { bg: "bg-indigo-600", text: "text-white" },
  { bg: "bg-teal-600", text: "text-white" },
  { bg: "bg-cyan-600", text: "text-white" },
  { bg: "bg-emerald-600", text: "text-white" },
  { bg: "bg-amber-600", text: "text-white" },
  { bg: "bg-violet-600", text: "text-white" },
]

// 基于字符串生成一致的颜色索引
function generateColorIndex(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // 转换为32位整数
  }
  return Math.abs(hash) % colorCombinations.length
}

// 获取显示的首字母
function getInitials(name?: string | null, email?: string | null): string {
  if (name && name.trim()) {
    const words = name.trim().split(/\s+/)
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase()
    }
    return words[0][0].toUpperCase()
  }
  
  if (email && email.trim()) {
    return email.trim()[0].toUpperCase()
  }
  
  return "U" // 默认显示 U (User)
}

// 获取用于生成颜色的字符串
function getColorSeed(name?: string | null, email?: string | null): string {
  return name?.trim() || email?.trim() || "user"
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, name, email, size = "md", className, ...props }, ref) => {
    const [imageError, setImageError] = useState(false)
    const initials = getInitials(name, email)
    const colorSeed = getColorSeed(name, email)
    const colorIndex = generateColorIndex(colorSeed)
    const colors = colorCombinations[colorIndex]

    // 处理Google用户内容URL
    const processImageUrl = (url: string | null | undefined): string | null => {
      if (!url) return null
      
      // 如果是Google用户内容URL，移除尺寸参数让Google自动选择合适尺寸
      if (url.includes('googleusercontent.com')) {
        return url.replace(/=s\d+-c$/, '=s200-c')
      }
      
      return url
    }

    const processedSrc = processImageUrl(src)


    const sizeClasses = {
      sm: "w-8 h-8 text-sm",
      md: "w-10 h-10 text-base",
      lg: "w-12 h-12 text-lg"
    }

    // 如果有图片且没有加载错误，显示图片
    if (processedSrc && !imageError) {
      return (
        <div
          ref={ref}
          className={cn(
            "relative inline-flex items-center justify-center rounded-full overflow-hidden",
            sizeClasses[size],
            className
          )}
          {...props}
        >
          <img
            src={processedSrc}
            alt={name || email || "User avatar"}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
          />
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-medium",
          sizeClasses[size],
          colors.bg,
          colors.text,
          className
        )}
        {...props}
      >
        {initials}
      </div>
    )
  }
)
Avatar.displayName = "Avatar"

export { Avatar }