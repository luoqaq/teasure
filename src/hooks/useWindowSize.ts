import { appWindow } from '@tauri-apps/api/window';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

const getWindowSize = async () => {
  const factor = await appWindow.scaleFactor();
  const size = await appWindow.innerSize();
  const logical = size.toLogical(factor);
  return logical;
};

/**
 * 获取窗口尺寸，并监听变化
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const _getWindowSize = async () => {
    const size = await getWindowSize();
    setWindowSize({
      width: size.width,
      height: size.height,
    });
  };

  useEffect(() => {
    _getWindowSize();
    appWindow.onResized(
      debounce(() => {
        _getWindowSize();
      }, 500),
    );
  }, []);

  return {
    windowSize,
  };
}
