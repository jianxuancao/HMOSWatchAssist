import router from '@system.router';

export default {
    data: {
        title: "",
        time: "",
        percentage: 0
    },
    onInit() {
        this.title = "距离下班还有";
        this.update();
        setInterval(this.update, 1000); // 每隔1秒调用一次
    },
    prevPage() {
        router.replace({
            uri: 'pages/index/index'
        });
    },
    update() {
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
        this.percentage = 100 - (timeDiff / totalDuration) * 100;

        if (timeDiff <= 0) {
            this.title = "8小时留给自己,好好休息\n已经下班：";
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
            this.title = "同志，你已本分工作一整天，该休息了";
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
