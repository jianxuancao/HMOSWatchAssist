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
        this.updateText();
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
    plusWater() {
        waterCount++;
        this.updateText();
    },
    minusWater() {
        if (waterCount != 0) {
            waterCount--;
        }
        this.updateText();
    },
    increaseTotal() {
        totalWaterCount++;
        this.updateText();
    },
    decreaseTotal() {
        totalWaterCount--;

        if (totalWaterCount <= 0) {
            totalWaterCount = 1;
        }
        this.updateText();
    },
    reset() {
        waterCount = 0;
        this.updateText();
    },
    nextPage() {
        router.replace({
            uri: 'pages/countDown/page'
        });
    }
}