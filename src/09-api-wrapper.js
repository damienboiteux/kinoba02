const apiWrapper = {
    get: async (url) => {
        try {
            const response = await fetch(url);
            if(!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            return data;
        } catch(error) {
            console.log(error);
            return Promise.reject(error);
        }
    },
    post: async (url, body) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(!response.ok) {
                throw new Error('Failed to post data');
            }
            const data = await response.json();
            return data;
        } catch(error) {
            console.log(error);
            return Promise.reject(error);
        }
    }
};

export default apiWrapper;

