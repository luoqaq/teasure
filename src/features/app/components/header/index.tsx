'use client';

import { ModeToggle } from './theme';
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
    useModuleManageStore(state => state);

  return (
    <header className="flex justify-between items-center h-12 px-4">
      <div>
        {sortedModules.map((moduleType, index) => (
          <button
            key={index}
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
      <ModeToggle />
    </header>
  );
}
