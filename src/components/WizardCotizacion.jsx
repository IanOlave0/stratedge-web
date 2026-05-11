import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { STRINGS } from '@/i18n/strings';

const { wizard } = STRINGS;
const E = wizard.errors;
const TOTAL_STEPS = 3;

/**
 * Esquema de validación con Zod.
 * Los mensajes de error se referencian desde STRINGS.wizard.errors
 * para mantenerlos centralizados y listos para i18n.
 */
const quoteSchema = z.object({
  serviceType: z.enum(['branding', 'web', 'ads', 'ecommerce', 'social'], {
    required_error: E.serviceRequired,
  }),
  projectScope: z.string().min(10, E.scopeMin),

  budget: z.enum(['under_5k', '5k_15k', '15k_50k', 'over_50k'], {
    required_error: E.budgetRequired,
  }),
  timeline: z.enum(['urgent', 'standard', 'relaxed'], {
    required_error: E.timelineRequired,
  }),
  extraNotes: z.string().optional(),

  fullName: z.string().min(2, E.fullNameMin),
  email: z.string().email(E.emailInvalid),
  company: z.string().min(2, E.companyMin),
  phone: z.string().optional(),
});

/** Mapea los nombres de campo de Zod a los pasos donde se validan */
const STEP_FIELDS = {
  1: ['serviceType', 'projectScope'],
  2: ['budget', 'timeline', 'extraNotes'],
  3: ['fullName', 'email', 'company', 'phone'],
};

/**
 * Componente WizardCotizacion
 * * Formulario multi-paso para cotizar proyectos.
 * * Usa React Hook Form + Zod para validación progresiva por paso.
 * * Todos los textos visibles se obtienen de STRINGS (i18n-ready).
 */
export default function WizardCotizacion() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      serviceType: undefined,
      projectScope: '',
      budget: undefined,
      timeline: undefined,
      extraNotes: '',
      fullName: '',
      email: '',
      company: '',
      phone: '',
    },
    mode: 'onChange',
  });

  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = form;

  const handleNext = async () => {
    const fieldsToValidate = STEP_FIELDS[currentStep];
    const isValid = await trigger(fieldsToValidate);
    if (isValid && currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const onSubmit = (data) => {
    setIsSubmitting(true);
    // TODO: conectar con backend
    console.log('Datos de cotización:', data);
    setTimeout(() => {
      setIsSubmitting(false);
      alert(wizard.success);
    }, 1000);
  };

  return (
    <Card className="max-w-3xl mx-auto bg-slate-900 border-slate-800 shadow-2xl">
      {/* Encabezado: indicador de progreso */}
      <CardHeader className="bg-slate-800/50 border-b border-slate-700 pb-4">
        <p className="text-emerald-400 font-bold text-sm tracking-widest uppercase">
          {wizard.stepLabel(currentStep, TOTAL_STEPS)}
        </p>
        <div className="w-full bg-slate-700 rounded-full h-2 mt-3">
          <div
            className="bg-emerald-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </CardHeader>

      <CardContent className="p-8 min-h-[360px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* =========== PASO 1 =========== */}
          {currentStep === 1 && (
            <div className="animate-fade-in space-y-6">
              <h2 className="text-3xl font-bold text-white">{wizard.step1.heading}</h2>

              <div className="space-y-3">
                <Label htmlFor="serviceType" className="text-slate-300 text-sm">
                  {wizard.step1.serviceLabel}
                </Label>
                <Controller
                  name="serviceType"
                  control={control}
                  render={({ field }) => (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {wizard.serviceOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                            field.onChange(opt.value);
                            trigger('serviceType');
                          }}
                          className={`text-left px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                            field.value === opt.value
                              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
                              : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                />
                {errors.serviceType && (
                  <p className="text-red-400 text-xs mt-1">{errors.serviceType.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectScope" className="text-slate-300 text-sm">
                  {wizard.step1.scopeLabel}
                </Label>
                <Textarea
                  id="projectScope"
                  {...register('projectScope')}
                  placeholder={wizard.step1.scopePlaceholder}
                  className="min-h-[100px] bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-500 resize-none"
                />
                {errors.projectScope && (
                  <p className="text-red-400 text-xs">{errors.projectScope.message}</p>
                )}
              </div>
            </div>
          )}

          {/* =========== PASO 2 =========== */}
          {currentStep === 2 && (
            <div className="animate-fade-in space-y-6">
              <h2 className="text-3xl font-bold text-white">{wizard.step2.heading}</h2>

              <div className="space-y-2">
                <Label htmlFor="budget" className="text-slate-300 text-sm">
                  {wizard.step2.budgetLabel}
                </Label>
                <Controller
                  name="budget"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={(v) => { field.onChange(v); trigger('budget'); }}>
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-200">
                        <SelectValue placeholder={wizard.step2.budgetPlaceholder} />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        {wizard.budgetOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value} className="text-slate-200 focus:bg-slate-700 focus:text-white">
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.budget && (
                  <p className="text-red-400 text-xs">{errors.budget.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeline" className="text-slate-300 text-sm">
                  {wizard.step2.timelineLabel}
                </Label>
                <Controller
                  name="timeline"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={(v) => { field.onChange(v); trigger('timeline'); }}>
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-200">
                        <SelectValue placeholder={wizard.step2.timelinePlaceholder} />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        {wizard.timelineOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value} className="text-slate-200 focus:bg-slate-700 focus:text-white">
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.timeline && (
                  <p className="text-red-400 text-xs">{errors.timeline.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="extraNotes" className="text-slate-300 text-sm">
                  {wizard.step2.notesLabel}
                </Label>
                <Textarea
                  id="extraNotes"
                  {...register('extraNotes')}
                  placeholder={wizard.step2.notesPlaceholder}
                  className="min-h-[80px] bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-500 resize-none"
                />
              </div>
            </div>
          )}

          {/* =========== PASO 3 =========== */}
          {currentStep === 3 && (
            <div className="animate-fade-in space-y-6">
              <h2 className="text-3xl font-bold text-white">{wizard.step3.heading}</h2>
              <p className="text-slate-400 text-sm -mt-4">{wizard.step3.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-slate-300 text-sm">{wizard.step3.fullName}</Label>
                  <Input
                    id="fullName"
                    {...register('fullName')}
                    placeholder={wizard.step3.fullNamePlaceholder}
                    className="bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-500"
                  />
                  {errors.fullName && <p className="text-red-400 text-xs">{errors.fullName.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300 text-sm">{wizard.step3.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder={wizard.step3.emailPlaceholder}
                    className="bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-500"
                  />
                  {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-slate-300 text-sm">{wizard.step3.company}</Label>
                  <Input
                    id="company"
                    {...register('company')}
                    placeholder={wizard.step3.companyPlaceholder}
                    className="bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-500"
                  />
                  {errors.company && <p className="text-red-400 text-xs">{errors.company.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-300 text-sm">{wizard.step3.phone}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    placeholder={wizard.step3.phonePlaceholder}
                    className="bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-500"
                  />
                </div>
              </div>
            </div>
          )}
        </form>
      </CardContent>

      {/* Pie: botones de navegación */}
      <CardFooter className="px-8 py-6 border-t border-slate-800 flex justify-between items-center">
        <Button
          type="button"
          variant="ghost"
          onClick={handleBack}
          disabled={currentStep === 1}
          className={`rounded-full font-semibold ${
            currentStep === 1 ? 'text-slate-600' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          {wizard.back}
        </Button>

        {currentStep < TOTAL_STEPS ? (
          <Button
            type="button"
            onClick={handleNext}
            className="rounded-full px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg transition-all"
          >
            {wizard.next}
          </Button>
        ) : (
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="rounded-full px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg transition-all"
          >
            {isSubmitting ? wizard.submitting : wizard.submit}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
