export default {
    data: {
        title: "",
        text: "咋没渴死你",
        textBank: ["咋没渴死你", "再多喝点吧", "行了，再多就要喝死了"],
        waterCount: 0.0,
        totalWaterCount: 8.0,
        percentage: 0.0
    },
    updateText() {
        this.title = this.waterCount + "/" + this.totalWaterCount;
        this.percentage = this.waterCount * 100 / this.totalWaterCount;
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
    onInit() {
        this.title = this.waterCount + "/" + this.totalWaterCount;
    },
    plusWater() {
        this.waterCount++;
        this.updateText();
    },
    minusWater() {
        if (this.waterCount != 0) {
            this.waterCount--;
        }
        this.updateText();
    },
    increaseTotal() {
        this.totalWaterCount++;
        this.updateText();
    },
    decreaseTotal() {
        this.totalWaterCount--;

        if (this.totalWaterCount <= 0) {
            this.totalWaterCount = 1;
        }
        this.updateText();
    },
    reset() {
        this.waterCount = 0;
        this.updateText();
    }
}

