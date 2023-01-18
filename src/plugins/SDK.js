export const SDK = {
    getGlassData: async (symbol) => {
        const glassData = await fetch(`https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=500`)
            .then(res => res.json())            
        return glassData;
    },
    subscribeBySymbol: (symbol) => {
        let ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@depth@1000ms`);
        return ws;
    }
}
