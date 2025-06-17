type FIconProps = {
  sizeText?: string
  size?: string
  className?: string
}

export function FIcon({ size = '30', sizeText = '25', className }: FIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <title>Formg.ai</title>
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#a855f7" />
          <stop offset="100%" stop-color="#6d28d9" />
        </linearGradient>
      </defs>
      <rect
        x="4"
        y="4"
        width="40"
        height="40"
        rx="10"
        fill="url(#grad)"
        stroke="#a78bfa"
        stroke-width="2"
      />
      <text
        x="50%"
        y="58%"
        dominant-baseline="middle"
        text-anchor="middle"
        font-family="monospace"
        font-size={sizeText}
        font-style="italic"
        font-weight="bold"
        fill="white"
      >
        F
      </text>
    </svg>
  )
}
