import { SanityFooter } from '@/sanity/types/globals/Footer';
import { FC } from 'react';
// components/Footer.tsx
interface FooterProps {
  footer: SanityFooter;
}

const Footer: FC<FooterProps> = ({ footer }) => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-white text-center py-4">
      <p>
        &copy; {currentYear} {footer.footerText}
      </p>
    </footer>
  );
};

export default Footer;
