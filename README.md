# Customize Countdown

自定义电子屏倒计时插件，支持数字管效果和普通文本显示。
![preview](https://github.com/Godziillaa/customize-countdown-timer/blob/main/preview-new.jpg)

## 安装

### NPM
```bash
npm install customize-countdown
```

### Yarn
```bash
yarn add customize-countdown
```

### PNPM
```bash
pnpm add customize-countdown
```

## 使用

### ES Module 导入
```javascript
import { Clock } from 'customize-countdown';
import 'customize-countdown/dist/customize-countdown.css';

const clock = new Clock({
  ele: 'countdown-container', // 容器元素ID
  initial: 60, // 初始秒数，默认60
  autostart: true, // 是否自动开始，默认true
  effect: true, // 是否使用数字管效果，默认false
  running: (instance) => {
    // 每秒执行的回调函数
    console.log('倒计时运行中:', instance.formattedTime);
  },
  end: () => {
    // 倒计时结束时的回调函数
    console.log('倒计时结束');
  }
});
```

### Script 标签引入
```html
<link rel="stylesheet" href="path/to/customize-countdown.min.css">
<script src="path/to/customize-countdown.min.js"></script>
<script>
  const clock = new CustomizeCountdown.Clock({
    ele: 'countdown-container',
    initial: 3600, // 1小时
    effect: true
  });
</script>
```

## API

### 创建实例
```javascript
const clock = new Clock(options);
```

### 选项参数
- `ele` (string): 容器元素ID，必需
- `initial` (number): 初始秒数，默认60
- `autostart` (boolean): 是否自动开始，默认true
- `effect` (boolean): 是否使用数字管效果，默认false
- `running` (function): 每秒执行的回调函数，接收实例对象作为参数
- `end` (function): 倒计时结束时的回调函数

### 方法
- `start()`: 开始倒计时
- `pause()`: 暂停倒计时
- `restart()`: 重新开始倒计时

## 兼容性

支持所有现代浏览器（Chrome, Firefox, Safari, Edge）。

## 开发

### 安装依赖
```bash
pnpm install
```

### 构建项目
```bash
pnpm run build
```

### 开发模式（监视文件变化）
```bash
pnpm run dev
```

## License

ISC
