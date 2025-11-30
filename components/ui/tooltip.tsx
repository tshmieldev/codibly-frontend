import * as React from "react";
import { cn } from "@/lib/utils";

const Tooltip = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "z-50 rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
            className,
        )}
        {...props}
    />
));
Tooltip.displayName = "Tooltip";

export { Tooltip };
