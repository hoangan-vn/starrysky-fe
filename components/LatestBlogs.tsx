import BlogCard from './BlogCard';
import Link from 'next/link';

// Sample blog data (you can replace this with an API call or CMS data)
const blogPosts = [
  {
    title: 'Can Citizen Identity Cards Replace Passports?',
    description:
      'The recent introduction of Citizen Identity Cards raised questions on their potential to replace passports for entry/exit Vietnam',
    imageSrc: '/playstore-icon.png', // Replace with actual image path
    slug: 'can-citizen-identity-cards-replace-passports'
  },
  {
    title: 'Van Phuc Silk Village, a Thousand-Year-Old Traditional Beauty of Vietnam',
    description:
      'Van Phuc, or Ha Dong Silk Village, is one of the must-visit stops for foreigners when traveling to the capital city of Hanoi, Vietnam',
    imageSrc: '/playstore-icon.png', // Replace with actual image path
    slug: 'van-phuc-silk-village'
  },
  {
    title: 'Discover Sao Ha "Hell" Village: From Real-life to Viral Vietnamese-based Horror Series',
    description:
      "Sao Ha Village (Ha Giang) has gained online fame after being showcased in a Vietnamese Netflix horror series titled 'Hellbound Village'",
    imageSrc: '/playstore-icon.png', // Replace with actual image path
    slug: 'discover-sao-ha-hell-village'
  },
  {
    title: 'Passengers Can Access To Wifi In Domestic and International Vietnam Airlines Flights',
    description:
      'Vietnam Airlines and VNPT have just signed a cooperation agreement to deploy in-flight internet service',
    imageSrc: '/playstore-icon.png', // Replace with actual image path
    slug: 'passengers-can-access-wifi-vietnam-airlines'
  },
  {
    title: 'Introduce to Traveler: Business Lounge at Tan Son Nhat International Airport',
    description:
      'Business Lounge is an excellent addition to travelers’ airport experience when visiting Vietnam, amid the bustling atmosphere of busy airports',
    imageSrc: '/playstore-icon.png', // Replace with actual image path
    slug: 'business-lounge-tan-son-nhat'
  },
  {
    title: 'The Ultimate Guide For Using Vietnamese Airlines’ Online Check-in System',
    description:
      'You can complete check-in online anywhere and anytime within 24 hours to 60 minutes before your scheduled flight',
    imageSrc: '/playstore-icon.png', // Replace with actual image path
    slug: 'ultimate-guide-online-checkin-vietnamese-airlines'
  }
];

const LatestBlogs = () => {
  return (
    <section className='w-full py-12 px-10 bg-gray-50'>
      <div className='container mx-auto px-6'>
        <h2 className='text-3xl font-bold mb-8'>Our Latest Blogs</h2>
        {/* Blog Grid */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
          {blogPosts.map((post) => (
            <BlogCard
              key={post.slug}
              title={post.title}
              description={post.description}
              imageSrc={post.imageSrc}
              slug={post.slug}
            />
          ))}
        </div>
        {/* View More Link */}
        <div className='text-center mt-8'>
          <Link href='/blog'>
            <span className='text-orange-500 font-semibold hover:underline'>View More</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestBlogs;
