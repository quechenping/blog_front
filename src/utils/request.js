const ajax = async (url, params) => {
  const response = await fetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    ...params,
  });
  return response.json();
};

export default ajax;
