const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('#upload-file');
const formOverlay = uploadForm.querySelector('.img-upload__overlay');

const openForm = () =>{
  uploadFile.addEventListener('change', () => {
    formOverlay.classList.remove('hidden');
  });
};

export {openForm};
