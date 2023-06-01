export default {
    data: {
        title: "",
        waterCount: 0.0,
        totalWaterCount: 8.0,
        percentage: 0.0
    },
    onInit() {
        this.title = this.waterCount + "/" + this.totalWaterCount;
    },
    plusWater() {
        this.waterCount++;

        this.title = this.waterCount + "/" + this.totalWaterCount;
        this.percentage = this.waterCount * 100 / this.totalWaterCount;
    },
    minusWater() {
        this.waterCount--;

        this.title = this.waterCount + "/" + this.totalWaterCount;
        this.percentage = this.waterCount * 100 / this.totalWaterCount;
    },
    increaseTotal() {
        this.totalWaterCount++;

        this.title = this.waterCount + "/" + this.totalWaterCount;
        this.percentage = this.waterCount * 100 / this.totalWaterCount;
    },
    decreaseTotal() {
        this.totalWaterCount--;

        if (this.totalWaterCount <= 0) {
            this.totalWaterCount = 1;
        }

        this.title = this.waterCount + "/" + this.totalWaterCount;
        this.percentage = this.waterCount * 100 / this.totalWaterCount;
    },
    reset() {
        this.waterCount = 0;
        this.title = this.waterCount + "/" + this.totalWaterCount;
        this.percentage = this.waterCount * 100 / this.totalWaterCount;
    }
}
