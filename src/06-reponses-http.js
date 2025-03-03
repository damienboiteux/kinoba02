// const FALLBACK_DATA = [ 
//     { userId: 1, id: 1 },
//     { userId: 1, id: 2 },
//     { userId: 2, id: 3 },
//     { userId: 3, id: 4 },
//     { userId: 4, id: 5 }
// ];

// async function fetchData() {
//     try {
//         const response = await fetch('https://jsonplaceholder.typicode.com/posts/10000');
//         if(!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         console.log(data);
//     } catch(error) {
//         console.error(error);
//         console.warn('Utilisation des données de secours');
//         console.log(FALLBACK_DATA);
//     } finally {
//         console.log('fetchData done');
//     }

// }

// fetchData().then(() => console.log('fetchData terminé'));

// RETRY avec délai fixe
// async function fetchWithRetry(url, delay = 1000, maxRetries=3 ) {
//     let response;
//     for(let i = 0; i < maxRetries; i++) {
//         try{
//             response = await fetch(url);
//             if(!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return await response.json();
//         } catch(error) {
//             console.error(`Echec de la requête ${url}: ${error}`);
//             await new Promise((resolve) => setTimeout(resolve, delay));
//         }
//     }
// } 

// fetchWithRetry('https://jsonplaceholder.typicode.com/posts/1000')
//     .then(data => console.log(data))
//     .catch(error => console.error(error));

// RETRY avec délai exponentiel
// async function fetchWithRetry(url, delay = 1000, maxRetries=3 ) {
//     let response;
//     for(let i = 0; i < maxRetries; i++) {
//         try{
//             response = await fetch(url);
//             if(!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return await response.json();
//         } catch(error) {
//             console.error(`Echec de la requête ${url}: ${error}`);
//             await new Promise((resolve) => setTimeout(resolve, delay));
//             delay *= 2;
//         }
//     }
// }

// fetchWithRetry('https://jsonplaceholder.typicode.com/posts/1000')
//     .then(data => console.log(data))
//     .catch(error => console.error(error));