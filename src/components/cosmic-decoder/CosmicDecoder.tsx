"use client";

import { useState, useEffect, useCallback } from 'react';
import type { FormData } from '@/lib/types';
import Step1_Preloader from './steps/Step1_Preloader';
import Step2_FirstNameLetter from './steps/Step2_FirstNameLetter';
import Step3_Gender from './steps/Step3_Gender';
import Step4_BirthMonth from './steps/Step4_BirthMonth';
import Step5_BirthDay from './steps/Step5_BirthDay';
import Step6_BirthDecade from './steps/Step6_BirthDecade';
import Step7_BirthYear from './steps/Step7_BirthYear';
import Step8_MaritalStatus from './steps/Step8_MaritalStatus';
import Step9_Challenge from './steps/Step9_Challenge';
import Step10_FirstName from './steps/Step10_FirstName';
import Step11_LoadingSummary from './steps/Step11_LoadingSummary';
import Step12_Result from './steps/Step12_Result';
import Step13_VSLPlayer from './steps/Step13_VSLPlayer';

const formSteps = [
  { step: 1, component: Step1_Preloader },
  { step: 2, component: Step2_FirstNameLetter },
  { step: 3, component: Step3_Gender },
  { step: 4, component: Step4_BirthMonth },
  { step: 5, component: Step5_BirthDay },
  { step: 6, component: Step6_BirthDecade },
  { step: 7, component: Step7_BirthYear },
  { step: 8, component: Step8_MaritalStatus },
  { step: 9, component: Step9_Challenge },
  { step: 10, component: Step10_FirstName },
  { step: 11, component: Step11_LoadingSummary },
  { step: 12, component: Step12_Result },
  { step: 13, component: Step13_VSLPlayer },
];

export function CosmicDecoder() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({});
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Only run on the client
    try {
      localStorage.removeItem('cosmicDecoderData');
      localStorage.removeItem('cosmicDecoderStep');
    } catch (error) {
      console.error("Failed to access localStorage", error);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem('cosmicDecoderData', JSON.stringify(formData));
        if (step < 13) {
            localStorage.setItem('cosmicDecoderStep', step.toString());
        }
      } catch (error) {
        console.error("Failed to write to localStorage", error);
      }
    }
  }, [formData, step, isInitialized]);

  const handleNext = useCallback(() => {
    setStep((prevStep) => Math.min(prevStep + 1, formSteps.length));
  }, []);

  const handleBack = useCallback(() => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  }, []);

  const updateFormData = useCallback((newData: Partial<FormData>) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  }, []);
  
  if (!isInitialized) {
    return null; // Or a loading spinner to prevent hydration mismatch
  }

  const CurrentStepComponent = formSteps.find((s) => s.step === step)?.component;

  const showLayout = step < 13;

  return (
    <>
      {CurrentStepComponent && showLayout && (
        <CurrentStepComponent
          onNext={handleNext}
          onBack={handleBack}
          setData={updateFormData}
          formData={formData}
        />
      )}
      {CurrentStepComponent && !showLayout && (
        <CurrentStepComponent
          onNext={handleNext}
          onBack={handleBack}
          setData={updateFormData}
          formData={formData}
        />
      )}
    </>
  );
}
