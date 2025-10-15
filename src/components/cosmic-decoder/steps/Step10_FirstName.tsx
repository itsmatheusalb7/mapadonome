import { StepLayout } from '../StepLayout';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  firstName: z.string()
    .min(2, { message: 'Le prénom doit contenir au moins 2 caractères.' })
    .max(30, { message: 'Le prénom ne peut pas dépasser 30 caractères.' })
    .regex(/^[a-zA-Z\u00C0-\u017F\s]+$/, { message: 'Utilisez uniquement des lettres et des espaces.' }),
});

interface Step10Props {
  onNext: () => void;
  onBack: () => void;
  setData: (data: { firstName: string }) => void;
  formData: { firstName?: string };
}

export default function Step10_FirstName({ onNext, onBack, setData, formData }: Step10Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: formData.firstName || '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setData({ firstName: values.firstName });
    onNext();
  }

  return (
    <StepLayout
      currentStep={9}
      onBack={onBack}
      title="Quel est votre prénom ?"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-sm mx-auto">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    placeholder="Entrez votre prénom ici" 
                    {...field}
                    className="text-center text-lg h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-accent">
            Cliquez pour continuer
          </Button>
        </form>
      </Form>
    </StepLayout>
  );
}
