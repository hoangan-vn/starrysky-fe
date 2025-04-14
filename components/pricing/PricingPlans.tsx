'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CheckCircle2, XCircle } from 'lucide-react';

// Shadcn/UI components
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

type PricingPlansProps = {
  className?: string;
};

type PlanFeature = {
  label: string;
  available: boolean;
};

type PricingPlan = {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  monthlyPriceDisplay: string;
  yearlyPriceDisplay: string;
  description: string;
  features: PlanFeature[];
  isPopular?: boolean;
};

export default function PricingPlans({ className }: PricingPlansProps) {
  const t = useTranslations('pricing');
  const [billingCycle, setBillingCycle] = useState<'international' | 'domestic'>('domestic');

  const plans: PricingPlan[] = [
    {
      name: 'Recruit Basic',
      monthlyPrice: 17,
      yearlyPrice: 228,
      monthlyPriceDisplay: '$17',
      yearlyPriceDisplay: '$228',
      description:
        'Get started with essential tools to manage your team efficiently. Ideal for small teams with fundamental needs.',
      features: [
        { label: 'Access to core HR features', available: true },
        { label: 'Employee record management', available: true },
        { label: 'Basic reporting tools', available: true },
        { label: 'Manage up to 10 team members', available: true },
        { label: 'Track employee attendance', available: true },
        { label: 'Assign and monitor tasks', available: false },
        { label: 'Email support', available: false },
        { label: 'Simple onboarding process', available: false },
        { label: 'Designed user-focused interfaces, optimized user', available: false }
      ]
    },
    {
      name: 'Talent Pro',
      monthlyPrice: 26,
      yearlyPrice: 228,
      monthlyPriceDisplay: '$26',
      yearlyPriceDisplay: '$19',
      description: 'A comprehensive solution for growing teams, offering enhanced features to streamline HR processes.',
      features: [
        { label: 'Access to core HR features', available: true },
        { label: 'Employee record management', available: true },
        { label: 'Basic reporting tools', available: true },
        { label: 'Manage up to 10 team members', available: true },
        { label: 'Track employee attendance', available: true },
        { label: 'Assign and monitor tasks', available: true },
        { label: 'Email support', available: false },
        { label: 'Simple onboarding process', available: false },
        { label: 'Designed user-focused interfaces, optimized user', available: false }
      ],
      isPopular: true
    },
    {
      name: 'HR Master',
      monthlyPrice: 34,
      yearlyPrice: 408,
      monthlyPriceDisplay: '$34',
      yearlyPriceDisplay: '$408',
      description:
        'Maximize team performance with premium tools and full customization options, perfect for larger organizations.',
      features: [
        { label: 'Access to core HR features', available: true },
        { label: 'Employee record management', available: true },
        { label: 'Basic reporting tools', available: true },
        { label: 'Manage up to 10 team members', available: true },
        { label: 'Track employee attendance', available: true },
        { label: 'Assign and monitor tasks', available: true },
        { label: 'Email support', available: true },
        { label: 'Simple onboarding process', available: true },
        { label: 'Designed user-focused interfaces, optimized user', available: true }
      ]
    }
  ];

  return (
    <div className={className}>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='flex flex-col justify-between items-center mb-6'>
          <h2 className='text-2xl md:text-5xl font-bold text-gray-800 mb-10'>{t('title')}</h2>
          <ToggleGroup
            type='single'
            value={billingCycle}
            onValueChange={(value) => {
              if (value) setBillingCycle(value as 'international' | 'domestic');
            }}
            className='bg-gray-200 rounded-full p-1'
          >
            <ToggleGroupItem
              value='international'
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                billingCycle === 'international' ? 'bg-white text-black ' : 'text-gray-600'
              }`}
            >
              {t('international') || 'International'}
            </ToggleGroupItem>
            <ToggleGroupItem
              value='domestic'
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                billingCycle === 'domestic' ? 'bg-white text-black' : 'text-gray-600'
              }`}
            >
              {t('domestic') || 'Domestic'}
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative rounded-xl border shadow-lg ${
                plan.isPopular ? 'bg-gradient-to-b from-gray-900 to-black text-white border-yellow-500' : 'bg-white'
              }`}
            >
              {plan.isPopular && (
                <div className='absolute top-0 right-0'>
                  <Badge className='absolute top-4 right-4 bg-yellow-500 text-black'>{t('popular') || 'Popular'}</Badge>
                  {billingCycle === 'domestic' && (
                    <Badge className='absolute top-4 right-20 bg-yellow-500 text-black'>
                      {t('save') || 'Save 27%'}
                    </Badge>
                  )}
                </div>
              )}
              <CardHeader>
                <CardTitle className='text-xl font-semibold'>
                  {plan.name}
                  {plan.isPopular && billingCycle === 'international' && (
                    <span className='ml-2 text-yellow-400'>Active</span>
                  )}
                </CardTitle>
                <div className='flex items-baseline space-x-1'>
                  {plan.isPopular && billingCycle === 'domestic' && (
                    <div className='flex items-center'>
                      <span className='text-4xl font-bold line-through text-gray-400 mr-2'>
                        ${billingCycle === 'domestic' ? '26' : plan.monthlyPrice}
                      </span>
                      <span className='text-4xl font-bold text-yellow-400'>
                        {billingCycle === 'domestic' ? plan.yearlyPriceDisplay : plan.monthlyPriceDisplay}
                      </span>
                    </div>
                  )}
                  {(!plan.isPopular || billingCycle === 'international') && (
                    <span className='text-4xl font-bold'>
                      {billingCycle === 'domestic' ? plan.yearlyPriceDisplay : plan.monthlyPriceDisplay}
                    </span>
                  )}
                  <span className='text-sm'>
                    / {billingCycle === 'international' ? t('month') || 'month' : t('month') || 'month'} (USD)
                  </span>
                </div>
                <div className='text-xs mt-1 text-gray-400'>
                  ${billingCycle === 'domestic' ? plan.yearlyPrice : plan.monthlyPrice} billed yearly
                </div>
                <p className={`mt-2 text-sm ${plan.isPopular ? 'text-gray-300' : 'text-gray-600'}`}>
                  {plan.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className='border-t border-gray-200 my-4 opacity-20'></div>
                <ul className='space-y-3'>
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className='flex items-center space-x-2'>
                      {feature.available ? (
                        <CheckCircle2 className={`w-5 h-5 ${plan.isPopular ? 'text-green-400' : 'text-green-500'}`} />
                      ) : (
                        <XCircle className={`w-5 h-5 ${plan.isPopular ? 'text-gray-600' : 'text-red-500'}`} />
                      )}
                      <span className={`text-sm ${plan.isPopular ? 'text-gray-200' : 'text-gray-700'}`}>
                        {feature.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  variant={plan.isPopular ? 'default' : 'outline'}
                  className={`w-full rounded-full ${plan.isPopular ? 'bg-white text-black hover:bg-gray-200' : 'bg-white text-black'}`}
                >
                  {plan.name === 'Recruit Basic'
                    ? t('cancel') || 'Cancel'
                    : t('start_trial') || 'Start 7-days Free Trial'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
