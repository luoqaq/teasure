import { create } from 'zustand';
import {
  CopyCatchItem,
  CopyCatchType,
  LocalTextFIlePath,
} from '@/typesAndStatics/copy';
import { readFromLocal } from '@/utils/setting';

interface CopyStore {
  copyCatchList: CopyCatchItem[];
  init: () => void;
  setCopyCatch: (data: CopyCatchItem) => void;
  clearCopyCatch: (data?: {
    type?: CopyCatchType | 'all';
    beforeTime?: number;
  }) => void;
  deleteCopyCatch: (ids: string[]) => void;
  topCopyCatch: (id: string) => void;
}

/**
 * 复制粘贴管理器Store
 */
export const useCopyStore = create<CopyStore>(set => ({
  // 复制缓存列表
  copyCatchList: [],
  // 初始化
  init: async () => {
    // 从本地加载
    const data = await readFromLocal(LocalTextFIlePath);
    if (!data) {
      return;
    }
    set({ copyCatchList: JSON.parse(data) });
  },
  // 增加复制缓存
  setCopyCatch: data =>
    set(state => {
      const index = state.copyCatchList.findIndex(
        item => item.content === data.content,
      );
      const _copyCatchList = [...state.copyCatchList];
      if (index === -1) {
        _copyCatchList.unshift(data);
      } else {
        // 有历史的，删除历史，将新的置顶
        _copyCatchList.splice(index, 1);
        _copyCatchList.unshift(data);
      }
      return { copyCatchList: _copyCatchList };
    }),
  // 清除复制缓存
  clearCopyCatch: data =>
    set(state => {
      const { type = CopyCatchType.all, beforeTime = 0 } = data || {};
      let newList = state.copyCatchList;
      newList = newList.filter(item => {
        const needDeleteByType =
          type === CopyCatchType.all || type === item.type;
        const needDeleteByTime =
          beforeTime === 0 || item.crateTime < beforeTime;
        // 多条件 与 才能删除
        return !(needDeleteByType && needDeleteByTime);
      });
      return {
        copyCatchList: newList,
      };
    }),
  // 删除若干
  deleteCopyCatch(ids) {
    set(state => {
      const newList = state.copyCatchList.filter(
        item => ids.indexOf(item.id) === -1,
      );
      return {
        copyCatchList: newList,
      };
    });
  },
  // 置顶指定的缓存记录
  topCopyCatch(id: string) {
    set(state => {
      const newList = state.copyCatchList.filter(item => item.id !== id);
      const target = state.copyCatchList.find(item => item.id === id);
      if (target) {
        newList.unshift(target);
      }
      return {
        copyCatchList: newList,
      };
    });
  },
}));
