import { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { verifyCaptcha, resetCaptcha } from '@/lib/features/captcha/captchaSlice';
import { useAppDispatch } from '@/hooks/hooks';

type CaptchaProps = {
  className?: string;
};

export default function Captcha({ className }: CaptchaProps) {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const dispatch = useAppDispatch();

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
        dispatch(verifyCaptcha());
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      dispatch(resetCaptcha());
    }
  }

  const handleChange = (token: string | null) => {
    handleCaptchaSubmission(token);
  };

  const handleExpired = () => {
    dispatch(resetCaptcha());
  };

  return (
    <ReCAPTCHA
      className={className}
      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
      ref={recaptchaRef}
      onChange={handleChange}
      onExpired={handleExpired}
    />
  );
}
