import { uploadFile } from './form.js';
import {imgPreview} from './scale.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'webp'];

const uploadUserPicture = () => {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      imgPreview.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
};

export {uploadUserPicture};
