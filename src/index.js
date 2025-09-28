// 引入样式
import './style.less';

// 引入核心类
import Clock from './main.js';

// 导出插件
export default { Clock, version: '1.0.0' };

// 为了支持直接通过script标签使用
if (typeof window !== 'undefined') {
  window.CustomizeCountdown = { Clock };
}