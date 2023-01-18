import { reactive } from "vue";

export const store = reactive({
    isMobile: false,
    currentSymbol: "BTCUSDT",
    symbolsList: ["BTCUSDT", "BNBBTC", "ETHBTC"],
    listOfEvents: [],
    lastUpdateId: '',
    currentData: null,
    adds: null,
    bids: null,

    getCurrentData(data) {
        this.currentData = data
    },

    getLastUpdateId(lastUpdateId) {
        this.lastUpdateId = lastUpdateId;
    },
    getAdds(adds) {
        this.adds = adds
    },
    getBids(bids) {
        this.bids = bids
    },
    addEventInList(data) {
        if(this.listOfEvents.length > 50) {
            this.listOfEvents = [data, ...this.listOfEvents.slice(this.listOfEvents.length - 50)];
        }
        this.listOfEvents = [data, ...this.listOfEvents]
    }

});
