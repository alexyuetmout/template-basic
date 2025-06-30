import { Separator } from "@/components/ui/separator"

interface AuthDividerProps {
  text?: string
}

export function AuthDivider({ text = "Or continue with" }: AuthDividerProps) {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <Separator />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-white dark:bg-neutral-900 px-2 text-neutral-500 dark:text-neutral-400">
          {text}
        </span>
      </div>
    </div>
  )
}