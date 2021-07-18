const GET_DATA_URL = 'https://23.javascript.pages.academy/kekstagram/data';
const SEND_DATA_URL = 'https://23.javascript.pages.academy/kekstagram';

const getData = (onSucces, onError) => {
  fetch(GET_DATA_URL)
    .then((response) => {
      if (response.ok) {
        return response;
        //Try to delite else
      } else {
        onError();
      }
    })
    .then((response) => response.json())
    .then((data) => {
      onSucces(data);
    })
    .catch(() => {
      onError();
    });
};


const sendData = (onSuccess, onError, body) => {
  fetch(
    SEND_DATA_URL,
    {
      method: 'POST',
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
    .catch(() => {
      onError();
    });
};

export {getData, sendData};
