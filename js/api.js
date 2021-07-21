const RequestUrl = {
  GET: 'https://23.javascript.pages.academy/kekstagram/data',
  POST: 'https://23.javascript.pages.academy/kekstagram',
};

const HttpMethod = {
  POST: 'POST',
};

const getData = (onSucces, onError) => {
  fetch(RequestUrl.GET)
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        onError();
      }
    })
    .then((response) => response.json())
    .then(onSucces)
    .catch(onError);
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    RequestUrl.POST,
    {
      method: HttpMethod.POST,
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(onError);
};

export {getData, sendData};
