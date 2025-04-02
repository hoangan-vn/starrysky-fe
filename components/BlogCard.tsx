import Image from 'next/image';
import Link from 'next/link';

interface BlogCardProps {
  title: string;
  description: string;
  imageSrc: string;
  slug: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, description, imageSrc, slug }) => {
  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden'>
      {/* Image */}
      <div className='relative h-48 w-full'>
        <Image src={imageSrc} alt={title} layout='fill' objectFit='cover' className='rounded-t-lg' />
      </div>
      {/* Content */}
      <div className='p-4'>
        <h3 className='text-lg font-semibold uppercase'>{title}</h3>
        <p className='text-gray-600 mt-2 line-clamp-3'>{description}</p>
        <Link href={`/blog/${slug}`}>
          <span className='text-orange-500 mt-4 inline-block hover:underline'>Read More</span>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
