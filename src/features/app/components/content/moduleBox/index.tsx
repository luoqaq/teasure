import { Ellipsis } from 'lucide-react';
import { CardHeader, CardTitle, CardContent, Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { ModuleItem } from '@/typesAndStatics/moduleManage';

interface Props {
  module: ModuleItem;
  className?: string;
}

export default function ModuleBox(props: Props) {
  const { module, className = '' } = props;

  return (
    <Card className={className}>
      <CardHeader className="justify-between items-center">
        <CardTitle>{module.name}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Ellipsis className="cursor-pointer" size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {module.operates?.map(item => (
              <DropdownMenuItem
                key={item.name}
                onClick={() => {
                  item.onClick?.(item);
                }}
              >
                {item.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent style={{ height: 'calc(100% - 60px)' }}>
        {module.component}
      </CardContent>
    </Card>
  );
}
