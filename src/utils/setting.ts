import { invoke } from '@tauri-apps/api';
import {
  writeTextFile,
  readTextFile,
  BaseDirectory,
  exists,
} from '@tauri-apps/api/fs';
import {
  isRegistered,
  register,
  unregisterAll,
} from '@tauri-apps/api/globalShortcut';
import { useEffect } from 'react';
import { appWindow } from '@tauri-apps/api/window';
import { ModuleType } from '@/typesAndStatics/moduleManage';
import { useSettingStore } from '@/stores/settingStore';
import { useModuleManageStore } from '@/stores/moduleManageStore';

/**
 * 获取应用安装位置
 */
export async function getAppInstallPath(): Promise<string> {
  return await invoke('get_installation_path');
}

/**
 * 保存内容到本地
 */
export async function saveToLocal(
  path: string,
  content: string,
): Promise<void> {
  return await writeTextFile(path, content, { dir: BaseDirectory.Resource });
  // return await invoke('write_to_file', { filePath: path, content });
}

/**
 * 读取指定文件内容
 */
export async function readFromLocal(path: string): Promise<string> {
  if (!(await exists(path, { dir: BaseDirectory.Resource }))) {
    return '';
  }
  return await readTextFile(path, { dir: BaseDirectory.Resource });
  // return await invoke('read_from_file', { filePath: path });
}

/**
 * 注册热键
 * @param hotKey 热键
 * @param cb 回调
 */
const registerHotKey = async (hotKey: string, cb: () => void) => {
  const flag = await isRegistered(hotKey);
  if (flag) {
    throw new Error(`${hotKey} 热键已被注册`);
  } else {
    return register(hotKey, cb);
  }
};

/**
 * 展示app
 */
const showApp = () => {
  appWindow.unminimize();
  appWindow.show();
  // appWindow.setAlwaysOnTop(true);
  appWindow.setFocus();
};

/**
 * 注册热键hook
 */
export const useHotKey = () => {
  const { hotKey, copyConfig } = useSettingStore(state => state);
  const { changeSelectedModule } = useModuleManageStore(state => state);

  useEffect(() => {
    if (!hotKey) {
      return;
    }
    registerHotKey(hotKey, () => {
      console.log('打开应用回调执行');
      showApp();
    })
      .then(res => {
        console.log('注册hotkey-打开应用成功', res);
      })
      .catch(er => {
        console.log('注册hotkey-打开应用失败', er);
      });
  }, [hotKey]);

  useEffect(() => {
    if (!copyConfig.hotKey) {
      return;
    }
    registerHotKey(copyConfig.hotKey, () => {
      console.log('打开剪切板回调执行');
      changeSelectedModule(ModuleType.Copy);
      showApp();
    })
      .then(res => {
        console.log('注册hotkey-打开剪切板成功', res);
      })
      .catch(er => {
        console.log('注册hotkey-打开剪切板失败', er);
      });
  }, [copyConfig.hotKey]);

  useEffect(() => {
    unregisterAll();
  }, []);
};

/**
 * 阻止退出应用
 */
export const usePreventExitApp = () => {
  useEffect(() => {
    appWindow.onCloseRequested(event => {
      event.preventDefault();
      appWindow.minimize();
    });
  }, []);
};
