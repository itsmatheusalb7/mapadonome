import { Heart, HeartCrack, Users, User, MoreHorizontal, HeartPulse, DollarSign, Smile } from 'lucide-react';

export const MARITAL_STATUS_OPTIONS = [
  { value: 'celibataire', label: 'Célibataire', icon: User },
  { value: 'en_couple', label: 'En couple', icon: Heart },
  { value: 'marie', label: 'Marié(e)', icon: Users },
  { value: 'separe', label: 'Séparé(e)', icon: HeartCrack },
  { value: 'divorce', label: 'Divorcé(e)', icon: HeartCrack },
  { value: 'veuf', label: 'Veuf(ve)', icon: User },
  { value: 'union_libre', label: 'En union libre', icon: Users },
  { value: 'autre', label: 'Autre', icon: MoreHorizontal },
];

export const CHALLENGE_OPTIONS = [
    { value: 'vie_amoureuse', label: 'Vie amoureuse', icon: Heart },
    { value: 'finances', label: 'Finances', icon: DollarSign },
    { value: 'sante', label: 'Santé', icon: HeartPulse },
    { value: 'bonheur', label: 'Bonheur', icon: Smile },
];

export const MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

export const DECADES = Array.from({ length: 11 }, (_, i) => 1910 + i * 10);

export const TOTAL_STEPS = 10; // Total number of interactive steps before VSL
