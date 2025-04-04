import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function Capcha() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsVerified] = useState(false);

  async function handleCaptchaSubmission(token: string | null) {
    try {
      if (token) {
        await fetch('/api', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token })
        });
        setIsVerified(true);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      setIsVerified(false);
    }
  }
  const handleChange = (token: string | null) => {
    handleCaptchaSubmission(token);
  };

  const handleExpired = () => {
    setIsVerified(false);
  };

  return (
    <div>
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
        ref={recaptchaRef}
        onChange={handleChange}
        onExpired={handleExpired}
      />
      <button
        className='border-solid border-1 border-gray-300 rounded-md p-2 bg-blue-500 text-white disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed'
        type='submit'
        disabled={!isVerified}
      >
        Submit Form
      </button>
    </div>
  );
}
