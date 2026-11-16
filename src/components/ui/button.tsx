import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-[background-color,border-color,color,transform] duration-200 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "relative overflow-hidden bg-primary text-primary-foreground shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_10px_30px_-12px_var(--primary)] hover:bg-primary-hover hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_14px_40px_-10px_var(--primary)] after:pointer-events-none after:absolute after:inset-y-0 after:left-[-70%] after:w-1/2 after:-skew-x-12 after:bg-gradient-to-r after:from-transparent after:via-white/30 after:to-transparent after:transition-[left] after:duration-700 hover:after:left-[130%]",
        outline:
          "border border-border-strong bg-card/60 text-foreground hover:border-accent/50 hover:bg-raised",
        ghost: "text-muted-foreground hover:bg-raised hover:text-foreground",
        link: "text-accent underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-9 px-3.5 text-[13px]",
        lg: "h-12 px-6 text-[15px]",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
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
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
