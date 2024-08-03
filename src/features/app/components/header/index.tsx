'use client';

import { useShallow } from 'zustand/react/shallow';
import { ModeToggle } from './theme';
import Setting from './setting';
import { useModuleManageStore } from '@/stores/moduleManageStore';
import { ModuleType } from '@/typesAndStatics/moduleManage';

const ModuleMap = {
  [ModuleType.Copy]: {
    icon: '',
    name: '剪切板',
  },
  [ModuleType.Todo]: {
    icon: '',
    name: 'Todo',
  },
};

export default function Headr() {
  const { selectedModule, changeSelectedModule, sortedModules } =
    useModuleManageStore(
      useShallow(state => ({
        selectedModule: state.selectedModule,
        changeSelectedModule: state.changeSelectedModule,
        sortedModules: state.sortedModules,
      })),
    );

  return (
    <header className="flex justify-between items-center h-12 px-4">
      <div>
        {sortedModules.map(moduleType => (
          <button
            key={moduleType}
            onClick={() => changeSelectedModule(moduleType)}
            className={`${
              selectedModule === moduleType
                ? 'text-foreground font-bold'
                : 'text-foreground opacity-70'
            } mr-2`}
          >
            {ModuleMap[moduleType].name || ''}
          </button>
        ))}
      </div>
      <div>
        <Setting />
        <ModeToggle />
      </div>
    </header>
  );
}
