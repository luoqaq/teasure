import { Outlet } from '@modern-js/runtime/router';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

export default function Layout() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <div>
        <Outlet />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}
