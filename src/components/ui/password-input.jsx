import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { forwardRef, useState } from "react"



// Komponen Custom yang menggabungkan Input + Tombol Mata
const PasswordInput = forwardRef(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        className={`pr-10 ${className}`} 
        ref={ref}
        {...props}
      />
      <button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setShowPassword((prev) => !prev)}
        tabIndex="-1"
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4 text-slate-500" aria-hidden="true" />
        ) : (
          <Eye className="h-4 w-4 text-slate-500" aria-hidden="true" />
        )}
        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
      </button>
    </div>
  )
})
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }