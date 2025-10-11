"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BackButtonProps {
  onBack: () => void;
  disabled?: boolean;
}

export function BackButton({ onBack, disabled }: BackButtonProps) {
  return (
    <Button
      variant="ghost"
      onClick={onBack}
      disabled={disabled}
      className="absolute top-4 left-4 text-muted-foreground hover:text-foreground"
      aria-label="Voltar para a etapa anterior"
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      Voltar
    </Button>
  )
}
