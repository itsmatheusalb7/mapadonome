import { Heart, HeartCrack, Users, User, MoreHorizontal, HeartPulse, DollarSign, Smile } from 'lucide-react';

export const MARITAL_STATUS_OPTIONS = [
  { value: 'solteiro', label: 'Solteiro(a)', icon: User },
  { value: 'namorando', label: 'Namorando', icon: Heart },
  { value: 'casado', label: 'Casado(a)', icon: Users },
  { value: 'separado', label: 'Separado(a)', icon: HeartCrack },
  { value: 'divorciado', label: 'Divorciado(a)', icon: HeartCrack },
  { value: 'viuvo', label: 'Viúvo(a)', icon: User },
  { value: 'uniao_estavel', label: 'Em união estável', icon: Users },
  { value: 'outro', label: 'Outro', icon: MoreHorizontal },
];

export const CHALLENGE_OPTIONS = [
    { value: 'amorosa', label: 'Vida amorosa', icon: Heart },
    { value: 'financas', label: 'Finanças', icon: DollarSign },
    { value: 'saude', label: 'Saúde', icon: HeartPulse },
    { value: 'felicidade', label: 'Felicidade', icon: Smile },
];

export const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export const DECADES = Array.from({ length: 11 }, (_, i) => 1910 + i * 10);

export const TOTAL_STEPS = 10; // Total number of interactive steps before VSL
