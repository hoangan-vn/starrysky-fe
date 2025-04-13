import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import NavLink from '@/lib/router/NavLink';
import { useNavLinks } from '@/lib/router/router';
import Logo from '../logo/Logo';
import ZaloContact from './ZaloContact';
import TelContact from './TelContact';
import MailContact from './MailContact';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = useNavLinks();

  return (
    <nav>
      <div className='container mx-auto flex justify-between items-center shadow-md rounded-lg'>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant='outline' size='icon' aria-label='Open menu'>
              <Menu className='h-6 w-6' />
            </Button>
          </SheetTrigger>
          <SheetContent side='right' className='w-[280px] sm:w-[320px] border-l border-blue-100 shadow-lg p-0'>
            <div className='h-full flex flex-col bg-gradient-to-b from-white to-blue-50'>
              <div className='flex justify-between items-center border-b border-blue-100'>
                <SheetHeader>
                  <SheetTitle className='text-xl font-bold'>
                    <Logo isMenu />
                  </SheetTitle>
                </SheetHeader>
              </div>

              <div className='flex-1 overflow-auto py-6'>
                <div className='flex flex-col gap-1 px-4'>
                  {navLinks.map((item, index) => (
                    <NavLink
                      key={item.href || index}
                      href={item.href}
                      className='relative py-3 px-4 text-gray-700 font-medium rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 flex items-center group'
                      onClick={() => setIsOpen(false)}
                    >
                      <span className='absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-blue-500 rounded-r group-hover:h-4/5 transition-all duration-200'></span>
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>

              <div className='mt-auto p-6 border-t border-blue-100 bg-gray-100'>
                <div className='flex items-center justify-center space-x-4'>
                  <TelContact isIcon />
                  <ZaloContact isIcon />
                  <MailContact isIcon />
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
