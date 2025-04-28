import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import ApllyForm from '@/components/services/sub/ApllyForm';
import HTMLString from '@/components/widgets/HTMLString';

interface ServiceCardInfo {
  id: string;
  title: string;
  description: string;
}

interface ServicePageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ category?: string }>;
}

export default async function ServicePage({ params, searchParams }: ServicePageProps) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;
  const categoriesId = resolvedSearchParams?.category === 'international' ? 1 : 2;

  const service = await fetchServiceById(categoriesId, id);

  if (!service) {
    notFound();
  }

  return (
    <div className='max-w-6xl mx-auto p-4'>
      {/* Phần mô tả dịch vụ */}
      <section className='mb-8 flex items-center justify-center flex-col'>
        <h1 className='text-3xl font-bold mb-4'>{service.title}</h1>
        <HTMLString className='text-gray-600' strTag={service.description} />
      </section>

      {/* Form đăng ký */}
      <section>
        <ApllyForm serviceTitle={service.title} />
      </section>
    </div>
  );
}

async function fetchServiceById(categoriesId: number, id: string) {
  const t = await getTranslations(categoriesId === 1 ? 'our-service.international' : 'our-service.domestic');
  const services = t.raw('services') as ServiceCardInfo[];

  return services.find((service) => service.id === id) || null;
}
