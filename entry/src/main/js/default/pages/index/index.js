import router from '@system.router';
import storage from '@system.storage';
import vibrator from '@system.vibrator';

var waterCount = 0.0;
var totalWaterCount = 8.0;

export default {
    data: {
        title: "",
        text: "咋没渴死你",
        textBank: ["咋没渴死你", "再多喝点吧", "行了，再多就要喝死了"],
        percentage: 0.0
    },
    onInit() {
        setInterval(this.updateText, 100); // 每隔0.1秒调用一次
        storageGet();
    },
    updateText() {
        this.title = waterCount + "/" + totalWaterCount;
        this.percentage = waterCount * 100 / totalWaterCount;
        var index = 0;
        if (this.percentage > 100) {
            index = 2;
        } else if (this.percentage > 33) {
            index = 1;
        } else {
            index = 0;
        }

        this.text = this.textBank[index];
    },
    plusWater() {
        waterCount++;
        this.updateText();
        storageSet();
    },
    minusWater() {
        if (waterCount != 0) {
            waterCount--;
        }
        this.updateText();
        storageSet();
    },
    increaseTotal() {
        totalWaterCount++;
        this.updateText();
        storageSet();
    },
    decreaseTotal() {
        totalWaterCount--;
        if (totalWaterCount <= 0) {
            totalWaterCount = 1;
        }
        this.updateText();
        storageSet();
    },
    reset() {
        waterCount = 0;
        this.updateText();
        storageSet();
    },
    nextPage() {
        storageSet();
        router.replace({
            uri: 'pages/countDown/page'
        });
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