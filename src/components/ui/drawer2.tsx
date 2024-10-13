import { cva } from "cva";
import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
  forwardRef,
} from "react";
import { Drawer as DrawerPrimitive } from "vaul";

const drawerOverlayStyle = cva({
  base: ["fixed", "inset-0", "z-10", "bg-black/50"],
});
const drawerContentStyle = cva({
  base: ["fixed", "z-10", "p-2", "bg-slate-950 "],
  variants: {
    direction: {
      left: ["left-0", "h-dvh", "inset-y-0", "mr-20", "rounded-l-0"],
      right: ["right-0", "inset-y-0", "ml-20", "rounded-r-0"],
      top: ["top-0", "inset-x-0", "mb-20", "rounded-t-0"],
      bottom: ["bottom-0", "inset-x-0", "mt-20", "rounded-b-0"],
    },
  },
  defaultVariants: {
    direction: "bottom",
  },
});
const drawerHeaderStyle = cva({});
const drawerFooterStyle = cva({
  base: ["mt-auto", "flex", "flex-col", "gap-2", "p-4"],
});
const drawerTitleStyle = cva({
  base: ["text-lg", "font-semibold", "leading-none", "tracking-tight"],
});
const drawerDescriptionStyle = cva({
  base: ["text-sm", "text-muted-foreground"],
});
const Drawer = ({ ...props }: ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root {...props} />
);
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = forwardRef<
  ElementRef<typeof DrawerPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={drawerOverlayStyle({ className })}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

interface DrawerContentProps
  extends ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> {
  direction?: "left" | "right" | "top" | "bottom";
}

const DrawerContent = forwardRef<
  ElementRef<typeof DrawerPrimitive.Content>,
  DrawerContentProps
>(({ className, children, direction, ...props }, ref) => {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={ref}
        className={drawerContentStyle({ className, direction })}
        {...props}
      >
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
});
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={drawerHeaderStyle({ className })} {...props} />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={drawerFooterStyle({ className })} {...props} />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = forwardRef<
  ElementRef<typeof DrawerPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={drawerTitleStyle({ className })}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = forwardRef<
  ElementRef<typeof DrawerPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={drawerDescriptionStyle({ className })}
    {...props}
  />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
