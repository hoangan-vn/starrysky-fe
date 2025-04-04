import Image from 'next/image';
import { Button } from '@/components/ui/button';

const Banner = () => {
  return (
    <section className='w-full h-[100vh] min-h-[50vh] flex items-center justify-center bg-white'>
      <div className='container mx-auto flex flex-col md:flex-row items-center justify-between px-6'>
        {/* Left Side: Text and Button */}
        <div className='md:w-1/2 text-center md:text-left mb-8 md:mb-0'>
          <h1 className='text-4xl md:text-5xl font-bold leading-tight'>
            We Save Time <br />
            And Provide <br />
            Convenience <br />
            For Your Trip
          </h1>
          <Button className='mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full'>
            Get Started
          </Button>
        </div>

        {/* Right Side: Image with Circular Background */}
        <div className='md:w-1/2 relative flex justify-center'>
          <div className='relative'>
            {/* Circular Background */}
            <div className='absolute inset-0 rounded-full w-[300px] h-[300px] md:w-[400px] md:h-[400px] z-0'></div>
            {/* Dashed Border */}
            <div className='absolute inset-0 rounded-full w-[300px] h-[300px] md:w-[400px] md:h-[400px] border-2 border-dashed border-gray-500 z-10'></div>
            {/* Image */}
            <Image
              src='/playstore-icon.png' // Replace with the actual path to your image
              alt='Traveler with passport'
              width={400}
              height={400}
              className='relative z-30 object-cover'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
