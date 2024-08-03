import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useHotKey, usePreventExitApp } from '../utils/setting';
import { useCopyStore } from '@/stores/copyStore';
import {
  useListenClipboardChange,
  useSaveClipboardToLocal,
} from '@/utils/copy';

export const useInit = () => {
  /**
   * 剪切板相关
   */
  const { setCopyCatch, init } = useCopyStore(
    useShallow(state => ({
      setCopyCatch: state.setCopyCatch,
      init: state.init,
    })),
  );
  useEffect(() => {
    // 初始化剪切板
    init();
  }, []);
  // 监听剪切板变化
  useListenClipboardChange(copyData => {
    setCopyCatch(copyData);
  });
  // 存储剪切板到本地
  useSaveClipboardToLocal();

  // 热键
  useHotKey();

  // 阻止关闭应用
  usePreventExitApp();

  useEffect(() => {
    window.addEventListener('keydown', e => {
      console.log('keydown', e);
    });
    window.addEventListener('keyup', e => {
      console.log('keyup', e);
    });
  }, []);
};
