class CircuitBreaker {
    constructor(url, maxRetries=3, resetTimeout=5000) {
        this.url = url;
        this.maxRetries = maxRetries;
        this.resetTimeout = resetTimeout;
        this.failureCount = 0;
        this.isOpen = false;
    }

    async fetchData() {
        if(this.isOpen) {
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