import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { BlogsLink } from '@/lib/router/coordinator';

interface BlogCardProps {
  title: string;
  description: string;
  imageSrc: string;
  slug: string;
  loading?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, description, imageSrc, slug, loading = false }) => {
  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden'>
      {/* Image */}
      <div className='relative h-48 w-full'>
        {loading ? (
          <Skeleton className='h-full w-full rounded-t-lg' />
        ) : (
          <Image
            src={imageSrc}
            alt={title}
            layout='fill'
            objectFit='cover'
            className='rounded-t-lg transform transition duration-300 ease-in-out hover:scale-110 hover:blur-[1px]'
          />
        )}
      </div>
      {/* Content */}
      <div className='p-4'>
        {loading ? (
          <>
            <Skeleton className='h-6 w-3/4 mb-2' /> {/* Title placeholder */}
            <Skeleton className='h-4 w-full mb-1' /> {/* Description line 1 */}
            <Skeleton className='h-4 w-5/6 mb-1' /> {/* Description line 2 */}
            <Skeleton className='h-4 w-4/5' /> {/* Description line 3 */}
            <Skeleton className='h-4 w-1/4 mt-4' /> {/* Read More link placeholder */}
          </>
        ) : (
          <>
            <h3 className='text-lg font-semibold uppercase'>{title}</h3>
            <p className='text-gray-600 mt-2 line-clamp-3'>{description}</p>
            <BlogsLink slug={slug}>
              <span className='text-orange-500 mt-4 inline-block hover:underline'>Read More</span>
            </BlogsLink>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
