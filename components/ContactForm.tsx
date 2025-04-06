'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    serviceType: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, serviceType: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here (e.g., API call)
  };

  return (
    <div id='contact-us' className='h-[100vh] max-w-2xl mx-auto p-6'>
      <h2 className='text-2xl font-bold mb-6'>Contact Us</h2>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Fullname */}
          <div>
            <label htmlFor='fullname' className='block text-sm font-medium'>
              Fullname <span className='text-red-500'>*</span>
            </label>
            <Input
              id='fullname'
              name='fullname'
              value={formData.fullname}
              onChange={handleChange}
              required
              className='mt-1'
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor='email' className='block text-sm font-medium'>
              Email <span className='text-red-500'>*</span>
            </label>
            <Input
              id='email'
              name='email'
              type='email'
              value={formData.email}
              onChange={handleChange}
              required
              className='mt-1'
            />
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Phone */}
          <div>
            <label htmlFor='phone' className='block text-sm font-medium'>
              Phone <span className='text-red-500'>*</span>
            </label>
            <div className='flex items-center mt-1'>
              <span className='inline-flex items-center px-3 border border-r-0 rounded-l-md bg-gray-50'>🇻🇳 +84</span>
              <Input
                id='phone'
                name='phone'
                type='tel'
                value={formData.phone}
                onChange={handleChange}
                required
                className='rounded-l-none'
              />
            </div>
          </div>

          {/* Service Type */}
          <div>
            <label htmlFor='serviceType' className='block text-sm font-medium'>
              Service Type <span className='text-red-500'>*</span>
            </label>
            <Select onValueChange={handleServiceTypeChange} value={formData.serviceType} required>
              <SelectTrigger className='mt-1'>
                <SelectValue placeholder='Select a service type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='arrival-fast-track'>Arrival fast track</SelectItem>
                <SelectItem value='departure-fast-track'>Departure fast track</SelectItem>
                <SelectItem value='transit-fast-track'>Transit fast track</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor='message' className='block text-sm font-medium'>
            Message <span className='text-red-500'>*</span>
          </label>
          <Textarea
            id='message'
            name='message'
            value={formData.message}
            onChange={handleChange}
            required
            className='mt-1'
            rows={4}
          />
        </div>

        {/* Submit Button */}
        <div className='text-center'>
          <Button type='submit' className='bg-orange-500 hover:bg-orange-600'>
            Send Message
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
