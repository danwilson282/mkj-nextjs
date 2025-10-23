import { FC, ReactNode } from 'react';

interface ErrorPageProps {
  children?: ReactNode;
}
const ErrorPage: FC<ErrorPageProps> = ({ children }) => {
  return (
    <div className="flex flex-col">
      <div>Error</div>
      <div>{children}</div>
    </div>
  );
};

export default ErrorPage;
