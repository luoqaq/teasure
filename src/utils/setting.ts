import { invoke } from '@tauri-apps/api';
import {
  writeTextFile,
  readTextFile,
  BaseDirectory,
  exists,
} from '@tauri-apps/api/fs';

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
  console.log('saveToLocal', path, content, { dir: BaseDirectory.Resource });
  return await writeTextFile(path, content, { dir: BaseDirectory.Resource });
  // return await invoke('write_to_file', { filePath: path, content });
}

/**
 * 读取指定文件内容
 */
export async function readFromLocal(path: string): Promise<string> {
  console.log('readFromLocal', path, { dir: BaseDirectory.Resource });
  if (!(await exists(path, { dir: BaseDirectory.Resource }))) {
    return '';
  }
  return await readTextFile(path, { dir: BaseDirectory.Resource });
  // return await invoke('read_from_file', { filePath: path });
}
