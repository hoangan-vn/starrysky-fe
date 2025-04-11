import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import NavLink from '@/lib/router/NavLink';
import { useNavLinks } from '@/lib/router/router';
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
          <SheetContent side='right' className='w-[250px] sm:w-[300px]'>
            <div className='flex flex-col gap-4 mt-6'>
              {navLinks.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  className='text-lg font-medium hover:text-blue-500'
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
