import { StepLayout } from '../StepLayout';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  firstName: z.string()
    .min(2, { message: 'O nome deve ter pelo menos 2 caracteres.' })
    .max(30, { message: 'O nome não pode ter mais de 30 caracteres.' })
    .regex(/^[a-zA-Z\u00C0-\u017F\s]+$/, { message: 'Use apenas letras e espaços.' }),
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
      title="Qual é o seu primeiro nome?"
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
                    placeholder="Digite seu nome aqui" 
                    {...field}
                    className="text-center text-lg h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-accent">
            Clique para continuar
          </Button>
        </form>
      </Form>
    </StepLayout>
  );
}
