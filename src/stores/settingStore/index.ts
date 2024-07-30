import { create } from 'zustand';
import { CopyCatchTimeType, SettingCopyConfig } from '@/typesAndStatics/copy';

interface SettingStore {
  // 文件存储位置
  filePath: string;
  // 应用唤起快捷键
  hotKey: string;
  // 复制的相关配置
  copyConfig: SettingCopyConfig;
  // 初始化
  init: () => void;
  changeFilePath: (path: string) => void;
  changeHotKey: (key: string) => void;
  changeCopyConfig: (config: SettingCopyConfig) => void;
}

/**
 * 系统设置Store
 */
export const useSettingStore = create<SettingStore>(set => ({
  filePath: '',
  hotKey: 'Ctrl+Alt',
  copyConfig: {
    hotKey: 'Ctrl+Alt+C',
    catchTimeType: CopyCatchTimeType.week,
    catchPath: '',
  },
  init: () => {
    //
    set({});
  },
  changeFilePath: (path: string) => set({ filePath: path }),
  changeHotKey: (key: string) => set({ hotKey: key }),
  changeCopyConfig: (config: SettingCopyConfig) => set({ copyConfig: config }),
}));
