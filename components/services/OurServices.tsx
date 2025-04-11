import { useNavLinks } from '@/lib/router/router';
import InternationalServices from './InternationalServices';

const OurServices = () => {
  const navLinks = useNavLinks();
  
  return (
    <section id={navLinks.at(0)?.id} className='py-12 px-4 max-w-6xl mx-auto'>
      <InternationalServices />
    </section>
  );
};

export default OurServices;
