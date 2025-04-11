import InternationalServices from './InternationalServices';
import DomesticServices from './DomesticServices';

const OurServices = () => {

  return (
    <section className='py-12 px-4 max-w-6xl mx-auto'>
      <InternationalServices />
      <DomesticServices />
    </section>
  );
};

export default OurServices;
