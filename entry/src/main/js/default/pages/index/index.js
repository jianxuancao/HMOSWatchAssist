import storage from '@system.storage';
import vibrator from '@system.vibrator';

var waterCount = 0.0;
var totalWaterCount = 8.0;

export default {
    data: {
        waterTitle: "",
        waterText: "咋没渴死你",
        textBank: ["咋没渴死你", "再多喝点吧", "再多就要喝死了"],
        waterPercentage: 0.0,

        timeTitle: "",
        time: "",
        timePercentage: 0
    },
    onInit() {
        storageGet();
        setInterval(this.updateWaterText, 100); // 每隔0.1秒调用一次
        setInterval(this.updateTime, 1000); // 每隔1秒调用一次
    },
    updateWaterText() {
        this.waterTitle = waterCount + "/" + totalWaterCount;
        this.waterPercentage = waterCount * 100 / totalWaterCount;
        var index = 0;
        if (this.waterPercentage >= 100) {
            index = 2;
        } else if (this.waterPercentage > 33) {
            index = 1;
        } else {
            index = 0;
        }

        this.waterText = this.textBank[index];
    },
    plusWater() {
        waterCount++;
        this.updateWaterText();
        storageSet();
        vibrator.vibrate({
            mode: 'short',
            success() {
                console.log('success to vibrate');
            },
            fail(data, code) {
                console.log('handle fail, data :' + data + ', code :' + code);
            },
        });
    },
    minusWater() {
        if (waterCount != 0) {
            waterCount--;
        }
        this.updateWaterText();
        storageSet();
        vibrator.vibrate({
            mode: 'short',
            success() {
                console.log('success to vibrate');
            },
            fail(data, code) {
                console.log('handle fail, data :' + data + ', code :' + code);
            },
        });
    },
    increaseTotal() {
        totalWaterCount++;
        this.updateWaterText();
        storageSet();
        vibrator.vibrate({
            mode: 'short',
            success() {
                console.log('success to vibrate');
            },
            fail(data, code) {
                console.log('handle fail, data :' + data + ', code :' + code);
            },
        });
    },
    decreaseTotal() {
        totalWaterCount--;
        if (totalWaterCount <= 0) {
            totalWaterCount = 1;
        }
        this.updateWaterText();
        storageSet();
        vibrator.vibrate({
            mode: 'short',
            success() {
                console.log('success to vibrate');
            },
            fail(data, code) {
                console.log('handle fail, data :' + data + ', code :' + code);
            },
        });
    },
    reset() {
        waterCount = 0;
        this.updateWaterText();
        storageSet();
        vibrator.vibrate({
            mode: 'short',
            success() {
                console.log('success to vibrate');
            },
            fail(data, code) {
                console.log('handle fail, data :' + data + ', code :' + code);
            },
        });
    },
    updateTime() {
        var now = new Date().getTime(); // 获取当前时间的时间戳

        // 设置每天的17:30时间的时间戳
        var targetTime = new Date();
        targetTime.setHours(17, 30, 0, 0);

        var timeDiff = targetTime.getTime() - now; // 计算时间差（单位：毫秒）

        // 设置每天的9:00时间的时间戳
        var startTime = new Date();
        startTime.setHours(9, 0, 0, 0);

        // 9:00到17:30的总时间（ms）
        var totalDuration = targetTime.getTime() - startTime.getTime();
        // 计算当前时间到17:30的时间差（ms）
        var timeDiff = targetTime.getTime() - now;

        // 计算，更新百分比
        this.timePercentage = 100 - (timeDiff / totalDuration) * 100;

        if (timeDiff <= 0) {
            this.timeTitle = "8小时留给自己\n已经下班：";
            // 时间差->小时和分钟
            var hours = Math.abs(Math.floor(timeDiff / (1000 * 60 * 60)));
            var minutes = Math.abs(Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)));
            var seconds = Math.abs(Math.floor((timeDiff % (1000 * 60)) / 1000));

            //更新字幕
            var formattedTime = ('0' + hours).slice(-2) + ':' +
            ('0' + minutes).slice(-2) + ':' +
            ('0' + seconds).slice(-2);
            this.time = formattedTime;
        } else if (timeDiff <= 60 * 60) {
            this.timeTitle = "同志,该休息了";
            // 时间差->小时和分钟
            var hours = Math.abs(Math.floor(timeDiff / (1000 * 60 * 60)));
            var minutes = Math.abs(Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)));
            var seconds = Math.abs(Math.floor((timeDiff % (1000 * 60)) / 1000));

            //更新字幕
            var formattedTime = ('0' + hours).slice(-2) + ':' +
            ('0' + minutes).slice(-2) + ':' +
            ('0' + seconds).slice(-2);
            this.time = formattedTime;
        } else {
            this.timeTitle = "距离下班还有";

            // 时间差->小时和分钟
            var hours = Math.floor(timeDiff / (1000 * 60 * 60));
            var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            //更新字幕
            var formattedTime = ('0' + hours).slice(-2) + ':' +
            ('0' + minutes).slice(-2) + ':' +
            ('0' + seconds).slice(-2);
            this.time = formattedTime;
        }
    }
}

function storageGet() {
    const date = new Date();
    var keyDate = date.getFullYear() + date.getMonth() + date.getDay();
    storage.get({
        key: keyDate + 'waterCount',
        success: function (data) {
            if (isNaN(parseFloat(data))) {
                waterCount = 0.0;
            } else {
                waterCount = parseFloat(data);
            }
        },
    });
    storage.get({
        key: keyDate + 'totalWaterCount',
        success: function (data) {
            if (isNaN(parseFloat(data))) {
                totalWaterCount = 8.0;
            } else {
                totalWaterCount = parseFloat(data);
            }
        },
    });
}

function storageSet() {
    const date = new Date();
    var keyDate = date.getFullYear() + date.getMonth() + date.getDay();
    storage.set({
        key: keyDate + 'waterCount',
        value: waterCount.toString(),
        success: function () {
            console.log('call storage.set success.');
        }
    });
    storage.set({
        key: keyDate + 'totalWaterCount',
        value: totalWaterCount.toString(),
        success: function () {
            console.log('call storage.set success.');
        }
    });
}