import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PrivacyLink, SignInLink, TermsLink } from '@/lib/router/coordinator';

export default function SignUpPage() {
  return (
    <div className='min-h-screen flex'>
      {/* Left Section - Quote */}
      <div className='w-1/2 bg-black text-white flex flex-col justify-between p-8'>
        <div className='flex items-center space-x-2'>
          <span className='text-2xl font-bold'>ACME INC</span>
        </div>
        <div className='text-center'>
          <p className='text-lg italic'>
            “This library has saved me countless hours of work and helped me deliver stunning designs to my clients
            faster than ever before.”
          </p>
          <p className='mt-4 font-semibold'>Sofia Davis</p>
        </div>
        <div></div> {/* Spacer */}
      </div>

      {/* Right Section - Form */}
      <div className='w-1/2 bg-white flex flex-col justify-center p-8'>
        <div className='max-w-md mx-auto w-full'>
          <div className='flex justify-end'>
            <SignInLink className='text-sm text-gray-600 hover:underline'>Sign in</SignInLink>
          </div>
          <h1 className='text-2xl font-bold mt-4'>Create an account</h1>
          <p className='text-sm text-gray-600 mt-2'>Enter your email below to create your account</p>

          {/* Email Input */}
          <div className='mt-4'>
            <Input type='email' placeholder='name@example.com' className='w-full' />
          </div>

          {/* Sign Up Button */}
          <Button className='w-full mt-4 bg-black text-white hover:bg-gray-800'>Sign Up with Email</Button>

          {/* Divider */}
          <div className='flex items-center my-4'>
            <div className='flex-grow h-px bg-gray-300'></div>
            <span className='mx-2 text-sm text-gray-500'>OR CONTINUE WITH</span>
            <div className='flex-grow h-px bg-gray-300'></div>
          </div>

          {/* GitHub Button */}
          <Button variant='outline' className='w-full flex items-center justify-center space-x-2'>
            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <path d='M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.332-1.754-1.332-1.754-1.087-.744.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.809 1.304 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z' />
            </svg>
            <span>GitHub</span>
          </Button>

          {/* Terms and Privacy */}
          <p className='text-xs text-gray-500 text-center mt-4'>
            By clicking continue, you agree to our
            <TermsLink className='underline'>Terms of Service</TermsLink>
            and <PrivacyLink className='underline'>Privacy Policy</PrivacyLink>.
          </p>
        </div>
      </div>
    </div>
  );
}
