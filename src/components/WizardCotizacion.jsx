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

/**
 * Esquema de validación con Zod — un paso por objeto anidado.
 * Cada paso se valida de forma independiente al intentar avanzar.
 */
const quoteSchema = z.object({
  // Paso 1: Selección de servicios
  serviceType: z.enum(['branding', 'web', 'ads', 'ecommerce', 'social'], {
    required_error: 'Selecciona al menos un servicio',
  }),
  projectScope: z.string().min(10, 'Describe tu proyecto con al menos 10 caracteres'),

  // Paso 2: Presupuesto y plazos
  budget: z.enum(['under_5k', '5k_15k', '15k_50k', 'over_50k'], {
    required_error: 'Selecciona un rango de presupuesto',
  }),
  timeline: z.enum(['urgent', 'standard', 'relaxed'], {
    required_error: 'Selecciona la urgencia del proyecto',
  }),
  extraNotes: z.string().optional(),

  // Paso 3: Datos de contacto
  fullName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Ingresa un correo electrónico válido'),
  company: z.string().min(2, 'Ingresa el nombre de tu empresa'),
  phone: z.string().optional(),
});

/** Opciones de cada paso — se extraen para mantener el JSX limpio */
const SERVICE_OPTIONS = [
  { value: 'branding', label: 'Branding e Identidad Visual' },
  { value: 'web', label: 'Desarrollo Web / App' },
  { value: 'ads', label: 'Publicidad Digital (Ads)' },
  { value: 'ecommerce', label: 'Optimización E-Commerce' },
  { value: 'social', label: 'Gestión de Redes Sociales' },
];

const BUDGET_OPTIONS = [
  { value: 'under_5k', label: 'Menos de $5,000' },
  { value: '5k_15k', label: '$5,000 — $15,000' },
  { value: '15k_50k', label: '$15,000 — $50,000' },
  { value: 'over_50k', label: 'Más de $50,000' },
];

const TIMELINE_OPTIONS = [
  { value: 'urgent', label: 'Urgente (1-2 semanas)' },
  { value: 'standard', label: 'Estándar (3-6 semanas)' },
  { value: 'relaxed', label: 'Sin prisa (2+ meses)' },
];

/** Mapea los nombres de campo de Zod a los pasos donde se validan */
const STEP_FIELDS = {
  1: ['serviceType', 'projectScope'],
  2: ['budget', 'timeline', 'extraNotes'],
  3: ['fullName', 'email', 'company', 'phone'],
};

const TOTAL_STEPS = 3;

/**
 * Componente WizardCotizacion
 * * Formulario multi-paso para cotizar proyectos.
 * * Usa React Hook Form + Zod para validación progresiva por paso.
 * * Renderiza componentes shadcn/ui dentro de un Card.
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
    // Solo validamos los campos visibles en cada paso
    mode: 'onChange',
  });

  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = form;

  /**
   * Valida solo los campos del paso actual antes de avanzar.
   * Si pasan, incrementa currentStep.
   */
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

  /**
   * Se ejecuta al finalizar los 3 pasos.
   * En el futuro enviará los datos al backend.
   */
  const onSubmit = (data) => {
    setIsSubmitting(true);
    // TODO: conectar con backend
    console.log('Datos de cotización:', data);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('¡Cotización enviada! Te contactaremos pronto.');
    }, 1000);
  };

  return (
    <Card className="max-w-3xl mx-auto bg-slate-900 border-slate-800 shadow-2xl">
      {/* Encabezado: indicador de progreso */}
      <CardHeader className="bg-slate-800/50 border-b border-slate-700 pb-4">
        <p className="text-emerald-400 font-bold text-sm tracking-widest uppercase">
          Paso {currentStep} de {TOTAL_STEPS}
        </p>
        {/* Barra de progreso */}
        <div className="w-full bg-slate-700 rounded-full h-2 mt-3">
          <div
            className="bg-emerald-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </CardHeader>

      <CardContent className="p-8 min-h-[360px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* =========== PASO 1: Servicio y alcance =========== */}
          {currentStep === 1 && (
            <div className="animate-fade-in space-y-6">
              <h2 className="text-3xl font-bold text-white">¿Qué necesitas?</h2>

              {/* Tipo de servicio */}
              <div className="space-y-3">
                <Label htmlFor="serviceType" className="text-slate-300 text-sm">
                  Selecciona el servicio principal
                </Label>
                <Controller
                  name="serviceType"
                  control={control}
                  render={({ field }) => (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SERVICE_OPTIONS.map((opt) => (
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

              {/* Alcance del proyecto */}
              <div className="space-y-2">
                <Label htmlFor="projectScope" className="text-slate-300 text-sm">
                  Cuéntanos brevemente sobre tu proyecto
                </Label>
                <Textarea
                  id="projectScope"
                  {...register('projectScope')}
                  placeholder="Ej: Quiero rediseñar mi sitio web y lanzar campañas en Meta Ads para aumentar ventas..."
                  className="min-h-[100px] bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-500 resize-none"
                />
                {errors.projectScope && (
                  <p className="text-red-400 text-xs">{errors.projectScope.message}</p>
                )}
              </div>
            </div>
          )}

          {/* =========== PASO 2: Presupuesto y tiempos =========== */}
          {currentStep === 2 && (
            <div className="animate-fade-in space-y-6">
              <h2 className="text-3xl font-bold text-white">Presupuesto y Plazos</h2>

              {/* Rango de presupuesto */}
              <div className="space-y-2">
                <Label htmlFor="budget" className="text-slate-300 text-sm">
                  ¿Cuál es tu presupuesto estimado?
                </Label>
                <Controller
                  name="budget"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={(v) => { field.onChange(v); trigger('budget'); }}>
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-200">
                        <SelectValue placeholder="Selecciona un rango" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        {BUDGET_OPTIONS.map((opt) => (
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

              {/* Urgencia */}
              <div className="space-y-2">
                <Label htmlFor="timeline" className="text-slate-300 text-sm">
                  ¿Para cuándo lo necesitas?
                </Label>
                <Controller
                  name="timeline"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={(v) => { field.onChange(v); trigger('timeline'); }}>
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-200">
                        <SelectValue placeholder="Selecciona la urgencia" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        {TIMELINE_OPTIONS.map((opt) => (
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

              {/* Notas adicionales (opcional) */}
              <div className="space-y-2">
                <Label htmlFor="extraNotes" className="text-slate-300 text-sm">
                  Notas adicionales (opcional)
                </Label>
                <Textarea
                  id="extraNotes"
                  {...register('extraNotes')}
                  placeholder="Cualquier detalle adicional que quieras compartir..."
                  className="min-h-[80px] bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-500 resize-none"
                />
              </div>
            </div>
          )}

          {/* =========== PASO 3: Datos de contacto =========== */}
          {currentStep === 3 && (
            <div className="animate-fade-in space-y-6">
              <h2 className="text-3xl font-bold text-white">Tus Datos</h2>
              <p className="text-slate-400 text-sm -mt-4">
                Déjanos tus datos y te enviaremos la cotización en menos de 24 horas.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nombre completo */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-slate-300 text-sm">
                    Nombre completo
                  </Label>
                  <Input
                    id="fullName"
                    {...register('fullName')}
                    placeholder="Ej: Ana García"
                    className="bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-500"
                  />
                  {errors.fullName && (
                    <p className="text-red-400 text-xs">{errors.fullName.message}</p>
                  )}
                </div>

                {/* Correo electrónico */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300 text-sm">
                    Correo electrónico
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="ana@empresa.com"
                    className="bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-500"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs">{errors.email.message}</p>
                  )}
                </div>

                {/* Empresa */}
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-slate-300 text-sm">
                    Empresa
                  </Label>
                  <Input
                    id="company"
                    {...register('company')}
                    placeholder="Nombre de tu empresa"
                    className="bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-500"
                  />
                  {errors.company && (
                    <p className="text-red-400 text-xs">{errors.company.message}</p>
                  )}
                </div>

                {/* Teléfono (opcional) */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-300 text-sm">
                    Teléfono (opcional)
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    placeholder="+52 55 1234 5678"
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
          ← Anterior
        </Button>

        {currentStep < TOTAL_STEPS ? (
          <Button
            type="button"
            onClick={handleNext}
            className="rounded-full px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg transition-all"
          >
            Siguiente →
          </Button>
        ) : (
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="rounded-full px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg transition-all"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Cotización'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
