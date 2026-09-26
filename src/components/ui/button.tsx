import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-1 focus-visible:ring-mint disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-acid font-bold tracking-[0.14em] text-volcanic uppercase hover:bg-mint",
        outline:
          "border-gunmetal bg-transparent text-offwhite hover:border-acid hover:text-acid",
        secondary:
          "border-gunmetal bg-volcanic text-offwhite hover:border-mint hover:text-mint",
        ghost: "text-faded hover:bg-volcanic hover:text-offwhite",
        destructive: "bg-destructive text-offwhite hover:bg-destructive/80",
        link: "text-acid underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 gap-2 px-4",
        xs: "h-6 gap-1 px-2 text-[10px] tracking-[0.12em]",
        sm: "h-8 gap-1.5 px-3 text-[11px]",
        lg: "h-11 gap-2 px-5",
        icon: "size-9",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
