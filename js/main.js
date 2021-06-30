import {createPostedPhotos} from './mocks.js';
import {addPhotoMiniatures} from './miniatures.js';
import {showPreviewOverlay} from './big-photo-overlay.js';

import {addNewUserPhoto} from './form.js';

const userPhotos = createPostedPhotos();
addPhotoMiniatures(userPhotos);

showPreviewOverlay(userPhotos);

addNewUserPhoto();
