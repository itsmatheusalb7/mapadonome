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
      className="w-full mt-4 text-muted-foreground hover:text-foreground flex items-center justify-center"
      aria-label="Retourner à l'étape précédente"
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      Retour
    </Button>
  )
}
