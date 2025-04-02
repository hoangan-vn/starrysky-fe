import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Github, Twitter, MessageCircle } from 'lucide-react';
import { HomeLink } from '@/lib/router/coordinator';
import { AppIcon } from './icons';
export default function Footer() {
  const footerLinks = [
    {
      title: 'Resources',
      links: [
        { name: 'Docs', href: '/docs' },
        { name: 'Support', href: '/support' },
        { name: 'Learn', href: '/learn' },
        { name: 'Showcase', href: '/showcase' },
        { name: 'Blog', href: '/blog' },
        { name: 'Analytics', href: '/analytics' },
        { name: 'Next.js Conf', href: '/nextjs-conf' },
        { name: 'Previews', href: '/previews' }
      ]
    },
    {
      title: 'More',
      links: [
        { name: 'Next.js Commerce', href: '/nextjs-commerce' },
        { name: 'Contact Sales', href: '/contact-sales' },
        { name: 'Community', href: '/community' },
        { name: 'GitHub', href: '/github' },
        { name: 'Releases', href: '/releases' },
        { name: 'Telemetry', href: '/telemetry' },
        { name: 'Governance', href: '/governance' }
      ]
    },
    {
      title: 'About Vercel',
      links: [
        { name: 'Next.js + Vercel', href: '/nextjs-vercel' },
        { name: 'Open Source Software', href: '/open-source' },
        { name: 'GitHub', href: 'https://github.com/vercel' },
        { name: 'Bluesky', href: 'https://bsky.app/profile/vercel.com' },
        { name: 'X', href: 'https://x.com/vercel' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Cookie Preferences', href: '/cookie-preferences' }
      ]
    }
  ];

  return (
    <footer className='bg-white border-t py-10'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Logo */}
        <div className='mb-8'>
          <div className='flex items-center space-x-2'>
            <AppIcon width={40} height={40} />
            <HomeLink className='text-lg font-bold'>Starry Sky</HomeLink>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className='grid grid-cols-2 md:grid-cols-5 gap-8'>
          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className='text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4'>{section.title}</h3>
              <ul className='space-y-2'>
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className='text-sm text-gray-600 hover:text-gray-900'>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Subscription */}
          <div>
            <h3 className='text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4'>
              Subscribe to our newsletter
            </h3>
            <p className='text-sm text-gray-600 mb-4'>
              Stay updated on new releases and features, guides, and case studies.
            </p>
            <div className='flex space-x-2'>
              <Input type='email' placeholder='you@domain.com' className='flex-1' />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='mt-10 flex justify-between items-center border-t pt-6'>
          <p className='text-sm text-gray-600'>© 2025 Starry Sky, Inc. Deveoped by Hoang An</p>
          <div className='flex space-x-4'>
            <Link href='https://github.com/vercel' className='text-gray-600 hover:text-gray-900'>
              <Github className='w-5 h-5' />
            </Link>
            <Link href='https://x.com/vercel' className='text-gray-600 hover:text-gray-900'>
              <Twitter className='w-5 h-5' />
            </Link>
            <Link href='https://bsky.app/profile/vercel.com' className='text-gray-600 hover:text-gray-900'>
              <MessageCircle className='w-5 h-5' />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
