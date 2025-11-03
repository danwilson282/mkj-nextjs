'use server';
import { SanityCustomDevSection } from '@/sanity/types/CustomDev';
import { TestDevServerComponent } from '@/developerComponents/test';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '@/lib/auth/authProvider';
type SectionProps = {
  section: SanityCustomDevSection;
};

export const CustomDevSection: React.FC<SectionProps> = async ({ section }) => {
  // Can fetch custom data here from server such as session
  const session = (await getServerSession(authOptions)) as Session;
  const slug = section.customDev.slug;
  switch (slug) {
    case 'test':
      return <TestDevServerComponent session={session} />;
    default:
      return <>CUSTOM</>;
  }
};
