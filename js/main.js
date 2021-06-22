import {createPostedPhotos} from './mocks.js';
import {addPhotoMiniatures} from './miniatures.js';
import {showPreviewOverlay} from './big-photo-overlay.js';

const userPhotos = createPostedPhotos();
addPhotoMiniatures(userPhotos);

// NEW CODE

showPreviewOverlay(userPhotos);
