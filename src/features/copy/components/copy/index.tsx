import { useMemo, useState } from 'react';
import { Clipboard, X } from 'lucide-react';
import dayjs from 'dayjs';
import { Input } from '@/components/ui/input';
import { useCopyStore } from '@/stores/copyStore';
import { CopyCatchType, CopyCatchTypes } from '@/typesAndStatics/copy';
import { ScrollArea } from '@/components/ui/scroll-area';
import { copyToClipboard } from '@/utils/copy';
import { useToast } from '@/components/ui/use-toast';
import { useWindowSize } from '@/hooks/useWindowSize';

const Copy = () => {
  const { copyCatchList, deleteCopyCatch } = useCopyStore(state => state);

  const { toast } = useToast();

  // 当前选中的标签类型
  const [currentType, setCurrentType] = useState<CopyCatchType>(
    CopyCatchType.all,
  );
  // 搜索的内容
  const [inputValue, setInputValue] = useState('');

  // 类型过滤后的列表
  const filteredList = useMemo(() => {
    switch (currentType) {
      case CopyCatchType.all:
        return copyCatchList;
      case CopyCatchType.image:
        return copyCatchList.filter(item => item.type === CopyCatchType.image);
      case CopyCatchType.text:
        return copyCatchList.filter(item => item.type === CopyCatchType.text);
      default:
        return [];
    }
  }, [currentType, copyCatchList]);
  // 展示的列表
  const showedList = useMemo(() => {
    if (inputValue === '') {
      return filteredList;
    }
    return filteredList.filter(item => item.content.includes(inputValue));
  }, [inputValue, filteredList]);

  const onInputSearch = (e: any) => {
    setInputValue(e.target.value);
  };

  const { windowSize } = useWindowSize();
  const itemWidthClass = useMemo(() => {
    console.log(windowSize);
    if (windowSize.width < 750) {
      return 'w-full';
    }
    if (windowSize.width < 1500) {
      return 'w-1/2 odd:pr-8';
    }
    return 'w-1/3 pr-6 nth-child(3n):pr-0';
  }, [windowSize]);

  return (
    <div className="h-full">
      <header className="flex items-center justify-between">
        <div className="flex">
          {CopyCatchTypes.map(item => (
            <div
              key={item.label}
              className={`text-white font-semibold mr-3 cursor-pointer whitespace-nowrap hover:!${
                item.activeBg
              } ${
                currentType === item.value ? `${item.activeBg}` : `${item.bg}`
              } inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors`}
              onClick={() => setCurrentType(item.value)}
            >
              {item.label}
            </div>
          ))}
        </div>
        <div>
          <Input placeholder="搜索" onInput={onInputSearch} />
        </div>
      </header>
      <ScrollArea className="mt-4" style={{ height: 'calc(100% - 40px)' }}>
        <div className="flex flex-wrap">
          {showedList.map(item => (
            <div
              key={item.id}
              className={`${itemWidthClass} flex justify-between`}
            >
              <div className="grow pl-2 pr-4 py-2 border-t border-slate-200[.8]">
                {item.type === CopyCatchType.image ? (
                  <img
                    src={`data:image/jpeg;base64,${item.content}`}
                    width={100}
                    height={100}
                    alt="图片"
                  />
                ) : (
                  <p className="text-sm break-all">{item.content}</p>
                )}
              </div>
              <div className="flex flex-col justify-between py-2 border-t border-slate-200[.8]">
                <div className="whitespace-nowrap text-right">
                  <button
                    onClick={() => {
                      // 复制到剪切板
                      copyToClipboard(item.content, item.type)
                        .then(() => {
                          toast({
                            title: '复制成功',
                          });
                        })
                        .catch(() => {
                          toast({
                            title: '复制失败',
                            variant: 'destructive',
                          });
                        });
                    }}
                    className="mr-4 opacity-60"
                  >
                    <Clipboard size={18} />
                  </button>
                  <button
                    onClick={() => {
                      deleteCopyCatch([item.id]);
                    }}
                    className="mr-2 opacity-60"
                  >
                    <X size={18} />
                  </button>
                </div>
                <p className="text-xs opacity-50 text-right whitespace-nowrap mt-2">
                  {dayjs(item.crateTime).format('YYYY-MM-DD HH:mm:ss')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Copy;
