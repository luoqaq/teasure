import { useEffect } from 'react';
import Content from './components/content';
import Header from './components/header';
import {
  useListenClipboardChange,
  useSaveClipboardToLocal,
} from '@/utils/copy';
import { useCopyStore } from '@/stores/copyStore';
import { getAppInstallPath } from '@/utils/setting';

export default function Home() {
  const { setCopyCatch, init } = useCopyStore(state => state);

  useEffect(() => {
    console.log('home Render');
    init();

    getAppInstallPath().then(path => {
      console.log(path);
    });
  }, []);

  useListenClipboardChange(copyData => {
    setCopyCatch(copyData);
  });

  useSaveClipboardToLocal();

  return (
    <div className="w-full h-full">
      <Header />
      <Content />
    </div>
  );
}
