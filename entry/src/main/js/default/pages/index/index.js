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
        storageGet();
        setInterval(this.updateText, 100); // 每隔1秒调用一次
    },
    onDestroy() {
        storageSet();
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
    storage.get({
        key: 'waterCount',
        success: function (data) {
            if (parseFloat(data) == NaN) {
                waterCount = 0.0;
            } else {
                waterCount = parseFloat(data);
            }
        },
    });
}

function storageSet() {
    storage.set({
        key: 'waterCount',
        value: waterCount.toString(),
        success: function () {
            console.log('call storage.set success.');
        }
    });
}