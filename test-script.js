/**
 * Test Script for Crypto Alert System
 * Run in browser console to test functionality
 */

// Test configuration
const testConfig = {
    rsiPeriod: 18,
    oversoldLevel: 30,
    overboughtLevel: 70,
    trendLevel: 25
};

// Test data generator
function generateTestData(symbol = 'BTCUSDT', count = 100) {
    const data = [];
    let price = 45000; // Starting price
    const baseTime = Date.now() - (count * 5 * 60 * 1000); // 5 minutes per candle
    
    for (let i = 0; i < count; i++) {
        // Random price movement
        const change = (Math.random() - 0.5) * 200; // ±100
        price += change;
        
        const high = price + Math.random() * 50;
        const low = price - Math.random() * 50;
        const open = data.length > 0 ? data[data.length - 1].close : price;
        
        data.push({
            openTime: baseTime + (i * 5 * 60 * 1000),
            closeTime: baseTime + ((i + 1) * 5 * 60 * 1000),
            symbol: symbol,
            interval: '5m',
            open: open,
            high: Math.max(open, high, price),
            low: Math.min(open, low, price),
            close: price,
            volume: Math.random() * 1000,
            isClosed: true
        });
    }
    
    return data;
}

// Test functions
const CryptoAlertTester = {
    
    // Test indicator calculations
    testIndicators: function() {
        console.log('🧮 Testing Technical Indicators...');
        
        const testData = generateTestData();
        const result = cryptoAlertApp.indicators.calculate(testData, 'btcusdt');
        
        console.log('RSI Result:', result.rsi);
        console.log('ADXR Result:', result.adxr);
        console.log('Signals:', result.signals);
        
        return result;
    },
    
    // Test audio system
    testAudio: async function() {
        console.log('🎵 Testing Audio System...');
        
        const status = cryptoAlertApp.audio.getStatus();
        console.log('Audio Status:', status);
        
        console.log('Playing test sounds...');
        await cryptoAlertApp.audio.playNotificationAlert();
        
        setTimeout(async () => {
            await cryptoAlertApp.audio.playLongAlert();
        }, 1000);
        
        setTimeout(async () => {
            await cryptoAlertApp.audio.playShortAlert();
        }, 2000);
        
        return status;
    },
    
    // Test WebSocket connection
    testWebSocket: function() {
        console.log('📡 Testing WebSocket Connection...');
        
        const status = cryptoAlertApp.websocket.getStatus();
        console.log('WebSocket Status:', status);
        
        const dataSummary = cryptoAlertApp.websocket.getDataSummary();
        console.log('Data Summary:', dataSummary);
        
        return { status, dataSummary };
    },
    
    // Test alert system with fake data
    testAlerts: function() {
        console.log('🚨 Testing Alert System...');
        
        // Generate fake alert
        const fakeAlert = {
            symbol: 'BTCUSDT',
            timeframe: '5m',
            type: 'LONG_ENTRY',
            rsi: 25.8,
            adxr: 28.5,
            price: 45250.50,
            timestamp: Date.now(),
            description: 'Test Alert: RSI crossed above oversold level with strong trend confirmation'
        };
        
        cryptoAlertApp.triggerAlert(fakeAlert);
        
        // Generate another alert after 3 seconds
        setTimeout(() => {
            const shortAlert = {
                symbol: 'ETHUSDT',
                timeframe: '15m',
                type: 'SHORT_ENTRY',
                rsi: 72.3,
                adxr: 31.2,
                price: 2850.75,
                timestamp: Date.now(),
                description: 'Test Alert: RSI crossed below overbought level with strong trend'
            };
            
            cryptoAlertApp.triggerAlert(shortAlert);
        }, 3000);
        
        return fakeAlert;
    },
    
    // Test configuration updates
    testConfig: function() {
        console.log('⚙️ Testing Configuration Updates...');
        
        const originalConfig = cryptoAlertApp.indicators.getConfig();
        console.log('Original Config:', originalConfig);
        
        // Update config
        const newConfig = {
            rsiPeriod: 21,
            oversoldLevel: 25,
            overboughtLevel: 75,
            trendLevel: 30
        };
        
        cryptoAlertApp.indicators.updateConfig(newConfig);
        
        const updatedConfig = cryptoAlertApp.indicators.getConfig();
        console.log('Updated Config:', updatedConfig);
        
        // Restore original config after 5 seconds
        setTimeout(() => {
            cryptoAlertApp.indicators.updateConfig(originalConfig);
            console.log('Config restored to original values');
        }, 5000);
        
        return { original: originalConfig, updated: updatedConfig };
    },
    
    // Performance test
    testPerformance: function() {
        console.log('⚡ Testing Performance...');
        
        const iterations = 1000;
        const testData = generateTestData('BTCUSDT', 200);
        
        // Test indicator calculation speed
        const startTime = performance.now();
        
        for (let i = 0; i < iterations; i++) {
            cryptoAlertApp.indicators.calculate(testData, 'btcusdt');
        }
        
        const endTime = performance.now();
        const totalTime = endTime - startTime;
        const avgTime = totalTime / iterations;
        
        console.log(`Performance Results:`);
        console.log(`- Total time for ${iterations} calculations: ${totalTime.toFixed(2)}ms`);
        console.log(`- Average time per calculation: ${avgTime.toFixed(4)}ms`);
        console.log(`- Calculations per second: ${(1000 / avgTime).toFixed(0)}`);
        
        return {
            totalTime: totalTime,
            averageTime: avgTime,
            calculationsPerSecond: Math.round(1000 / avgTime),
            iterations: iterations
        };
    },
    
    // Memory usage test
    testMemoryUsage: function() {
        console.log('🧠 Testing Memory Usage...');
        
        if (performance.memory) {
            const memory = {
                used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
                total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
                limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
            };
            
            console.log('Memory Usage:');
            console.log(`- Used: ${memory.used} MB`);
            console.log(`- Total: ${memory.total} MB`);
            console.log(`- Limit: ${memory.limit} MB`);
            
            return memory;
        } else {
            console.log('Memory API not supported in this browser');
            return null;
        }
    },
    
    // Complete system test
    runCompleteTest: async function() {
        console.log('🚀 Running Complete System Test...');
        console.log('==========================================');
        
        const results = {
            timestamp: new Date().toISOString(),
            tests: {}
        };
        
        try {
            // Test each component
            results.tests.indicators = this.testIndicators();
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            results.tests.audio = await this.testAudio();
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            results.tests.websocket = this.testWebSocket();
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            results.tests.config = this.testConfig();
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            results.tests.performance = this.testPerformance();
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            results.tests.memory = this.testMemoryUsage();
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            results.tests.alerts = this.testAlerts();
            
            // Get overall system status
            results.systemStatus = cryptoAlertApp.getStatus();
            
            console.log('==========================================');
            console.log('✅ Complete Test Finished!');
            console.log('Results:', results);
            
            return results;
            
        } catch (error) {
            console.error('❌ Test failed:', error);
            results.error = error.message;
            return results;
        }
    }
};

// Auto-run basic test if needed
console.log('🔧 Crypto Alert System Test Tools Loaded');
console.log('Available commands:');
console.log('- CryptoAlertTester.testIndicators()');
console.log('- CryptoAlertTester.testAudio()'); 
console.log('- CryptoAlertTester.testWebSocket()');
console.log('- CryptoAlertTester.testAlerts()');
console.log('- CryptoAlertTester.testConfig()');
console.log('- CryptoAlertTester.testPerformance()');
console.log('- CryptoAlertTester.runCompleteTest()');

// Export for global access
window.CryptoAlertTester = CryptoAlertTester;