import { UnlistenFn } from '@tauri-apps/api/event';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  writeText,
  readText,
  onImageUpdate,
  onTextUpdate,
  startListening,
  writeImageBase64,
} from 'tauri-plugin-clipboard-api';
import { saveToLocal } from './setting';
import {
  CopyCatchItem,
  CopyCatchType,
  LocalTextFIlePath,
} from '@/typesAndStatics/copy';
import { useCopyStore } from '@/stores/copyStore';

/**
 * 复制到粘贴板
 * @param text 内容
 */
export async function copyToClipboard(
  content: string,
  type = CopyCatchType.text,
) {
  // await invoke('set_clipboard_content', { content: text});
  // return await writeText(text);
  if (type === CopyCatchType.image) {
    return await writeImageBase64(content);
  }
  return await writeText(content);
}

/**
 * 获取粘贴板内容
 * @returns 文本内容
 */
export async function getClipboardContent(): Promise<string | null> {
  // return await invoke('get_clipboard_content');
  // return await readText();
  return await readText();
}

// 做粘贴防抖
// 原因：所有组件莫名render两次，clipboard 监听事件也会触发两次，所以每次复制都会触发四次，离谱！！！
let lastClipboardTime = 0;
const DebounceGap = 500;
/**
 * 监听剪切板的变化
 */
export const useListenClipboardChange = (
  onCopyDataChange?: (copyData: CopyCatchItem) => void,
) => {
  const unlistenTextUpdate = useRef<UnlistenFn | null>(null);
  const unlistenImageUpdate = useRef<UnlistenFn | null>(null);
  const unlistenClipboardChange = useRef<UnlistenFn | null>(null);

  // const [text, setText] = useState('');
  // const [base64Image, setBase64Image] = useState('');
  // const [htmlMonitorContent, setHtmlMonitorContent] = useState('');
  // const [files, setFiles] = useState<string[]>([]);
  // const [rtf, setRtf] = useState('');

  const [copyData, setCopyData] = useState<CopyCatchItem | null>(null);

  const startWatch = useCallback(async () => {
    console.log('startWatch', unlistenClipboardChange.current);

    unlistenTextUpdate.current = await onTextUpdate((newText: string) => {
      // console.log('newText', newText);
      const now = Date.now();
      // 做1s内防抖
      if (lastClipboardTime + DebounceGap > now) {
        return;
      }
      lastClipboardTime = now;
      // setText(newText);
      const data = {
        id: `${now}_${Math.ceil(Math.random() * 100)}`,
        content: newText,
        type: CopyCatchType.text,
        crateTime: now,
      };
      setCopyData(data);
      onCopyDataChange?.(data);
    });
    unlistenImageUpdate.current = await onImageUpdate((b64Str: string) => {
      console.log('b64Str', b64Str);
      // setBase64Image(b64Str);
      const now = Date.now();
      // 做1s内防抖
      if (
        b64Str === copyData?.content &&
        lastClipboardTime + DebounceGap > now
      ) {
        return;
      }
      const data = {
        id: `${now}_${Math.ceil(Math.random() * 100)}`,
        content: b64Str,
        type: CopyCatchType.image,
        crateTime: now,
      };
      setCopyData(data);
      onCopyDataChange?.(data);
    });
    // unlisten.current.unlistenHtmlUpdate = await onHTMLUpdate((newHtml) => {
    //   console.log('newHtml', newHtml);
    //   setHtmlMonitorContent(newHtml);
    // });
    // unlisten.current.unlistenFiles = await onFilesUpdate((newFiles) => {
    //   console.log('newFiles', newFiles);
    //   setFiles(newFiles);
    // });
    // unlisten.current.unlistenRTF = await onRTFUpdate((newRTF) => {
    //   console.log('newRTF', newRTF);
    //   setRtf(newRTF);
    // });
    unlistenClipboardChange.current = await startListening();
    // onClipboardUpdate(async () => {
    //   console.log('clipboard changed');
    //   const text = await hasText()
    //   console.log('1-text', text);
    //   const image = await hasImage()
    //   console.log('1-image', image);
    //   // const html = await hasHTML()
    //   // console.log('1-html', html);
    //   // const files = await hasFiles()
    //   // console.log('1-files', files);
    //   // const rtf = await hasRTF()
    //   // console.log('1-rtf', rtf);
    // })
  }, []);

  useEffect(() => {
    console.log('useListenClipboardChange');
    startWatch();

    return () => {
      unlistenClipboardChange.current?.();
      unlistenTextUpdate.current?.();
      unlistenImageUpdate.current?.();
    };
  }, [startWatch]);

  return {
    copyData,
  };
};

/**
 * 将剪切板内容保存到本地
 */
export const useSaveClipboardToLocal = () => {
  const copyCatchList = useCopyStore(state => state.copyCatchList);

  useEffect(() => {
    if (!copyCatchList?.length) {
      return;
    }
    saveToLocal(LocalTextFIlePath, JSON.stringify(copyCatchList))
      .then(() => {
        console.log('saveClipboardToLocal success');
      })
      .catch(err => {
        console.log('saveClipboardToLocal Error', err);
      });
  }, [copyCatchList]);
};
