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
        <span className="bg-background dark:bg-background px-2 text-muted-foreground dark:text-muted-foreground">
          {text}
        </span>
      </div>
    </div>
  )
}