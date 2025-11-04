import Image from "next/image"

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`select-none ${className || ""}`}>
      {/* Preserve intrinsic ratio: width + h-auto prevents single-axis stretching */}
      <Image
        src="/images/td-studios-logo.png"
        alt="TD Studios"
        width={140}
        height={28}
        className="h-7 w-auto"
      />
    </div>
  )
}
