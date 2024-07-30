import { Link } from '@modern-js/runtime/router';
import Copy from './components/copy';

export default function Page() {
  return (
    <main>
      <Link to={'/'}>返回首页</Link>

      <h1>这是copy路由页面</h1>
      <Copy />
    </main>
  );
}
