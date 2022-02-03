import './components/controlTheme';
import heroSlider from './components/heroSlider';
import beforeAfterSlider from './components/beforeAfterSlider';
import videoPlayer from './components/videoPlayer';
import videoSlider from './components/videoSlider';
import bookTickest from './components/bookTickets';
import createModal from './components/createModal';
import animateGallery from './components/animateGallery';
import createMap from './components/createMap';
import rippleEffect from './components/rippleEffect';

import './css/normalize.css';
import './css/style.css';

heroSlider();

beforeAfterSlider();

videoPlayer();

videoSlider();

bookTickest();

rippleEffect();

createModal('a-nav', true, true);
createModal('reservation');

animateGallery();

createMap();
