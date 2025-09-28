
const Clock = window.CustomizeCountdown?.Clock

// 示例1：手动控制的数字管效果
const clock1 = new Clock({
    ele: 'wrap1',
    initial: 72111, // 20小时3分钟31秒
    effect: true,
    autostart: false,
    running(res) {
        console.log('示例1运行中:', res.formattedTime);
    },
    end() {
        console.log('示例1结束');
    }
});

// 按钮控制
document.getElementById('btn1').onclick = function () {
    clock1.start();
};

document.getElementById('btn2').onclick = function () {
    clock1.pause();
};

document.getElementById('btn3').onclick = function () {
    clock1.restart();
};

// 示例2：小型数字管效果
const clock2 = new Clock({
    ele: 'wrap2',
    initial: 3805, // 1小时3分钟25秒
    effect: true,
    running(res) {
        console.log('示例2运行中:', res.formattedTime);
    },
    end() {
        console.log('示例2结束');
    }
});

// 示例3：大型数字管效果
const clock3 = new Clock({
    ele: 'wrap3',
    initial: 13809, // 3小时50分钟9秒
    effect: true,
    running(res) {
        console.log('示例3运行中:', res.formattedTime);
    },
    end() {
        console.log('示例3结束');
    }
});

// 示例4：普通文本显示
const clock4 = new Clock({
    ele: 'wrap4',
    initial: 10,
    autostart: true,
    running(res) {
        console.log('示例4运行中:', res.formattedTime);
    },
    end() {
        console.log('示例4结束');
        console.log('倒计时结束！');
    }
});
