import Content from './components/content';
import Header from './components/header';
import { useInit } from '@/hooks/useInit';

export default function Home() {
  useInit();

  return (
    <div className="w-full h-full">
      <Header />
      <Content />
    </div>
  );
}
