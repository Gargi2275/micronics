import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 select-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-glow",
        orange:
          "shimmer-btn bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-md hover:shadow-amber-glow hover:brightness-105",
        blue:
          "shimmer-btn bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-md hover:shadow-glow hover:brightness-105",
        glass:
          "border border-border/80 bg-card/80 text-foreground shadow-sm backdrop-blur-md hover:bg-card hover:border-primary/40 hover:shadow-md",
        glassHero:
          "border border-white/15 bg-white/10 text-white shadow-md backdrop-blur-md hover:bg-white/20 hover:border-white/25",
        subtle:
          "bg-secondary/70 text-secondary-foreground hover:bg-secondary border border-transparent hover:border-border/60",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background/50 shadow-sm hover:bg-accent/10 hover:text-foreground hover:border-border",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost:
          "hover:bg-accent/10 hover:text-accent text-foreground/80",
        link:
          "text-primary underline-offset-4 hover:underline p-0 h-auto font-medium",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-11 rounded-xl px-6 text-sm",
        xl: "h-13 rounded-xl px-8 text-base font-bold shadow-lg",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
