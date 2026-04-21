import { MessageCircle } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

interface Props extends Omit<ButtonProps, "asChild"> {
  message: string;
  label?: string;
  showIcon?: boolean;
}

export const WhatsAppButton = ({
  message,
  label,
  showIcon = true,
  className,
  variant = "default",
  size = "default",
  ...rest
}: Props) => {
  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={cn(
        variant === "default" &&
          "bg-gold-gradient text-primary-foreground hover:opacity-90 shadow-gold border-0",
        "font-medium tracking-wide",
        className
      )}
      {...rest}
    >
      <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open WhatsApp"
      >
        {showIcon && <MessageCircle className="h-4 w-4" />}
        {label && <span>{label}</span>}
      </a>
    </Button>
  );
};
