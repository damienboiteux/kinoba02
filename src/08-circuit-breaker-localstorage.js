class CircuitBreaker {
    constructor(url, maxRetries=3, resetTimeout=5000) {
        this.url = url;
        this.maxRetries = maxRetries;
        this.resetTimeout = resetTimeout;

        const savedState = JSON.parse(localStorage.getItem('circuitBreakerState')) || {};
        
        this.failureCount =  savedState.failureCount || 0;
        this.isOpen = savedState.isOpen || false;
        this.lastOpenedTime = savedState.lastOpenedTime || null;

        if(this.isOpen && this.lastOpenedTime) {
            const elapsedTime = Date.now() - this.lastOpenedTime;
            if(elapsedTime > this.resetTimeout) {
                this.isOpen = false;
                this.failureCount = 0;
            } else {
                setTimeout(() => {
                    this.isOpen = false;
                    this.failureCount = 0;
                }, this.resetTimeout - elapsedTime);
            }
        }
    }

    async fetchData() {
        if(this.isOpen) {
            console.warn('Circuit is open');
            return Promise.reject('Circuit is open');
        }
        try {
            const response = await fetch(this.url);
            if(!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            this.failureCount = 0;
            return data;
        } catch(error) {
            console.log(error);
            this.failureCount++;
            if(this.failureCount >= this.maxRetries) {
                this.isOpen = true;
                setTimeout(() => {
                    this.isOpen = false;
                    this.failureCount = 0;
                }, this.resetTimeout);
                localStorage.setItem('circuitBreakerState', JSON.stringify({
                    failureCount: this.failureCount,
                    isOpen: this.isOpen,
                    lastOpenedTime: Date.now()
                }));
            }
            return Promise(reject, error);
        }
    } 
}

const circuitBreaker = new CircuitBreaker('https://jsonplaceholder.typicode.com/posts/10000');


document.getElementById('fetchButton').addEventListener('click', () => {
    circuitBreaker.fetchData()
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        });
});