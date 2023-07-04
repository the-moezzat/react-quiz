import { ReactNode } from 'react';
interface MainContentProps {
  children: ReactNode;
}
function MainContent({ children }: MainContentProps) {
  return <main className="main">{children}</main>;
}

export default MainContent;
