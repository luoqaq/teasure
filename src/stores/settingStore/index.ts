import { create } from 'zustand';
import { CopyCatchTimeType, SettingCopyConfig } from '@/typesAndStatics/copy';
import { readFromLocal } from '@/utils/setting';

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

const FilePathSetting = 'setting.txt';

/**
 * 系统设置Store
 */
export const useSettingStore = create<SettingStore>(set => ({
  filePath: '',
  hotKey: 'Ctrl+Shift+Q',
  copyConfig: {
    hotKey: 'Ctrl+Shift+C',
    catchTimeType: CopyCatchTimeType.week,
    catchPath: '',
  },
  init: async () => {
    // 读取文件
    const file = await readFromLocal(FilePathSetting);
    if (file) {
      try {
        const data = JSON.parse(file);
        set({
          filePath: data.filePath,
          hotKey: data.hotKey,
          copyConfig: data.copyConfig,
        });
      } catch (error) {}
    }
  },
  changeFilePath: (path: string) => set({ filePath: path }),
  changeHotKey: (key: string) => set({ hotKey: key }),
  changeCopyConfig: (config: SettingCopyConfig) => set({ copyConfig: config }),
}));
