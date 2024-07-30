// 复制内容的类型
export enum CopyCatchType {
  all = 'all',
  text = 'text',
  image = 'image',
}

// 复制内容
export interface CopyCatchItem {
  id: string;
  content: string;
  type: CopyCatchType;
  crateTime: number;
}

// 复制内容缓存时效
export enum CopyCatchTimeType {
  day = 'day',
  week = 'week',
  month = 'month',
  year = 'year',
  // 永久有效
  no = 'no',
}

export interface SettingCopyConfig {
  // 复制唤起快捷键
  hotKey: string;
  // 粘贴板存储周期 天、周、月
  catchTimeType: CopyCatchTimeType;
  // copy相关默认为应用存放位置下的 copyCatch/ 目录，
  catchPath: string;
}

// 复制内容的类型标签
export const CopyCatchTypes = [
  {
    label: '全部',
    value: CopyCatchType.all,
    bg: 'bg-sky-200',
    activeBg: 'bg-sky-600',
  },
  {
    label: '文本',
    value: CopyCatchType.text,
    bg: 'bg-indigo-200',
    activeBg: 'bg-indigo-600',
  },
  {
    label: '图片',
    value: CopyCatchType.image,
    bg: 'bg-orange-200',
    activeBg: 'bg-orange-600',
  },
];

export const LocalTextFIlePath = 'copyCatchList.txt';
