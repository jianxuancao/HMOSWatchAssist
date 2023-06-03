import router from '@system.router';
import storage from '@system.storage';

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
        this.storageGet();
        this.updateText();
    },
    storageGet() {
        storage.get({
            key: 'waterCount',
            success: function (data) {
                waterCount = parseFloat(data);
            }
        });
    },
    storageSet() {
        storage.set({
            key: 'waterCount',
            value: waterCount.toString(),
            success: function () {
                console.log('call storage.set success.');
            }
        });
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
        this.storageSet()
    },
    minusWater() {
        if (waterCount != 0) {
            waterCount--;
        }
        this.updateText();
        this.storageSet()
    },
    increaseTotal() {
        totalWaterCount++;
        this.updateText();
        this.storageSet()
    },
    decreaseTotal() {
        totalWaterCount--;

        if (totalWaterCount <= 0) {
            totalWaterCount = 1;
        }
        this.updateText();
        this.storageSet()
    },
    reset() {
        waterCount = 0;
        this.updateText();
        this.storageSet()
    },
    nextPage() {
        router.replace({
            uri: 'pages/countDown/page'
        });
    }
}