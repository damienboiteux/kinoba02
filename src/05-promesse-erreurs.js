window.onunhandledrejection = function (event) {
  console.error("****",event.reason, "*****");
  return true;
};

// const promise = new Promise((resolve, reject) => {
//   reject(new Error("Promise failed"));
// });

function interrogerApi(url) {
  fetch(url)
    .then((response)=> {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => console.log(data))
    // .catch((error) => console.error(error))
    .finally(() => console.log("Requête terminée"));
}

interrogerApi("https://jsonplaceholder.typicode.com/posts/10000");
