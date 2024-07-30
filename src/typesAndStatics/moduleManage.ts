// 模块类型
export enum ModuleType {
  // 复制粘贴板模块
  Copy,
  // todo模块
  Todo,
}

// 模块操作
interface ModuleOperate {
  name: string;
  onClick: (module?: ModuleItem) => void;
}

// 模块管理
export interface ModuleItem {
  // 模块类型
  type?: ModuleType;
  // 模块名称
  name?: string;
  // 模块描述
  description?: string;
  // 模块在第一二顺位时展示的组件
  component?: React.JSX.Element;
  // 模块在非一二顺位时只展示icon
  icon?: string;
  operates?: ModuleOperate[];
}
