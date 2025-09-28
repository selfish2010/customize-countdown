/**
 * 倒计时组件
 * @param {Object} options - 配置参数
 * @param {string} options.ele - 元素ID
 * @param {number} options.initial - 初始秒数，默认60
 * @param {boolean} options.autostart - 是否自动开始，默认true
 * @param {boolean} options.effect - 是否使用数字管效果，默认false
 * @param {Function} options.running - 倒计时执行中的回调函数
 * @param {Function} options.end - 倒计时结束时的回调函数
 */
class Clock {
    constructor(options) {
        // 参数验证和默认值设置
        if (!options || typeof options !== 'object') {
            throw new Error('参数必须是一个对象');
        }
        
        if (!options.ele) {
            throw new Error('必须提供元素ID');
        }
        
        // 初始化属性
        this.rawTime = options.initial || 60;
        this.HH = null;
        this.MM = null;
        this.SS = null;
        this.formattedTime = null;
        this.autoStart = options.autostart !== 0 && options.autostart !== false;
        this.timerId = null;
        this.useEffect = !!options.effect;
        this.wrapper = document.getElementById(options.ele);
        
        // 检查元素是否存在
        if (!this.wrapper) {
            throw new Error(`未找到ID为${options.ele}的元素`);
        }
        
        // 存储回调函数
        this.onRunning = typeof options.running === 'function' ? options.running : null;
        this.onEnd = typeof options.end === 'function' ? options.end : null;
        
        // 创建数字管结构
        const DIGIT_TUBE_TEMPLATE = 
            '<div class="count-wrap">' +
                '<div class="dig-wrap"><div class="dig-item"></div><div class="dig-item"></div></div>' +
                '<div class="count-dot"></div>' +
                '<div class="dig-wrap"><div class="dig-item"></div><div class="dig-item"></div></div>' +
                '<div class="count-dot"></div>' +
                '<div class="dig-wrap"><div class="dig-item"></div><div class="dig-item"></div></div>' +
            '</div>';
        
        // 初始化显示
        this.wrapper.innerHTML = this.useEffect ? DIGIT_TUBE_TEMPLATE : '00:00:00';
        
        // 缓存DOM元素引用
        if (this.useEffect) {
            this.digitWraps = this.getElementsByClass('dig-wrap', this.wrapper);
        }
        
        // 开始倒计时或仅计算初始值
        this.autoStart ? this.start() : this.calculateTime();
    }
    
    /**
     * 格式化数字，不足两位前面补零
     * @param {number} num - 要格式化的数字
     * @returns {string} 格式化后的字符串
     */
    formatNumber(num) {
        return Math.floor(num) > 9 ? Math.floor(num).toString() : '0' + Math.floor(num);
    }
    
    /**
     * 设置数字管效果
     */
    setDigitTubeEffect() {
        if (!this.useEffect) return;
        
        const HArr = this.HH.split(''), 
              MArr = this.MM.split(''), 
              SArr = this.SS.split('');
        
        // 更新时、分、秒的显示
        this.updateDigit(this.digitWraps[0], HArr);
        this.updateDigit(this.digitWraps[1], MArr);
        this.updateDigit(this.digitWraps[2], SArr);
    }
    
    /**
     * 更新单个数字管
     * @param {HTMLElement} wrap - 数字管容器
     * @param {Array} digits - 数字数组
     */
    updateDigit(wrap, digits) {
        const items = this.getElementsByClass('dig-item', wrap);
        items[0].className = `dig-item dig-${digits[0]}`;
        items[1].className = `dig-item dig-${digits[1]}`;
    }
    
    /**
     * 获取指定类名的元素
     * @param {string} className - 类名
     * @param {HTMLElement} parent - 父元素
     * @returns {HTMLCollection} 元素集合
     */
    getElementsByClass(className, parent) {
        return parent ? parent.getElementsByClassName(className) : document.getElementsByClassName(className);
    }
    
    /**
     * 计算时间
     */
    calculateTime() {
        this.HH = this.formatNumber(this.rawTime / 3600);
        this.MM = this.formatNumber((this.rawTime - this.HH * 3600) / 60);
        this.SS = this.formatNumber(this.rawTime % 60);
        this.formattedTime = `${this.HH}:${this.MM}:${this.SS}`;
        
        // 更新显示
        if (this.useEffect) {
            this.setDigitTubeEffect();
        } else {
            this.wrapper.textContent = this.formattedTime;
        }
    }
    
    /**
     * 开始倒计时
     */
    start() {
        // 清除已有定时器
        this.pause();
        
        // 创建新的定时器
        this.timerId = setInterval(() => {
            // 检查是否结束
            if (this.rawTime <= 0) {
                this.onEnd && this.onEnd();
                this.pause();
                return;
            }
            
            // 更新时间
            this.calculateTime();
            
            // 执行回调
            this.onRunning && this.onRunning(this);
            
            // 减少时间
            this.rawTime -= 1;
        }, 1000);
    }
    
    /**
     * 暂停倒计时
     */
    pause() {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }
    
    /**
     * 重新开始倒计时
     */
    restart() {
        // 重置时间并开始
        this.rawTime = this.options?.initial || 60;
        this.start();
    }
}

// 导出Clock类
export default Clock;
