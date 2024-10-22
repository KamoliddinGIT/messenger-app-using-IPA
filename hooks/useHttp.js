const useHttp = () => {
  const request = (url, method, body) => {
    return fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Request error:", error);
        throw error;
      });
  };

  return { request };
};

export default useHttp;
