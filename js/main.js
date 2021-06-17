import {createPostedPhotos} from './mocks.js';
import {addPhotoMiniatures} from './miniatures.js';

const userPhotos = createPostedPhotos();
addPhotoMiniatures(userPhotos);
