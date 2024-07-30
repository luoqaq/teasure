import { create } from 'zustand';
import { ModuleType } from '@/typesAndStatics/moduleManage';

interface ModuleManageStore {
  // 当前选中的模块
  selectedModule: ModuleType;
  // 模块列表
  sortedModules: ModuleType[];
  // 将传入的modules 置顶
  topToModules: (modules: ModuleType[]) => void;
  // change选中的模块
  changeSelectedModule: (module: ModuleType) => void;
}

export const useModuleManageStore = create<ModuleManageStore>(set => ({
  selectedModule: ModuleType.Copy,
  sortedModules: [ModuleType.Copy, ModuleType.Todo],
  topToModules: (modules: ModuleType[]) => {
    set({ sortedModules: modules });
  },
  changeSelectedModule: (module: ModuleType) => {
    set({ selectedModule: module });
  },
}));
