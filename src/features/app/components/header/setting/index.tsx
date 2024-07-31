import { Bolt, Edit } from 'lucide-react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useSettingStore } from '@/stores/settingStore';
import { Label } from '@/components/ui/label';

export default () => {
  const { hotKey, copyConfig } = useSettingStore();

  const settingList = [
    {
      title: '全局设置',
      items: [
        {
          title: '唤起快捷键',
          value: hotKey,
          onclick: () => {
            console.log('123');
          },
        },
      ],
    },
    {
      title: '剪切板设置',
      items: [
        {
          title: '唤起快捷键',
          value: copyConfig.hotKey,
          onclick: () => {
            console.log('123');
          },
        },
        {
          title: '保存周期',
          value: copyConfig.catchTimeType,
          onclick: () => {
            console.log('123');
          },
        },
      ],
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Bolt className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle />
        {settingList.map(setting => (
          <div key={setting.title} className="mb-4">
            <p className="text-md mb-4">{setting.title}</p>
            <div className="grid">
              {setting.items.map(item => (
                <div key={item.title} className="flex items-center">
                  <Label
                    htmlFor={item.title}
                    className="text-sm opacity-75 font-normal text-right w-20"
                  >
                    {item.title}
                  </Label>
                  <Label id={item.title} className="grow ml-4">
                    {item.value}
                  </Label>
                  <Button variant="ghost" size="icon">
                    <Edit size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
};
