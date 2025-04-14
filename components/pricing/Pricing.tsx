'use client';

import PricingPlans from './PricingPlans';

const Pricing = () => {
  return (
    <section
      className='py-12 px-4 max-w-6xl mx-auto bg-gray-50 flex items-center justify-center'
    >
      {/* <PricingTable /> */}
      <PricingPlans />
    </section>
  );
};

export default Pricing;
