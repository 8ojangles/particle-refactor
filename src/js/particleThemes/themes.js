import { fireTheme} from './themes/fire/theme.js';
import { resetTheme} from './themes/reset/resetTheme.js';
import { warpStarTheme} from './themes/warpStar/theme.js';
import { flameTheme} from './themes/flame/flameTheme.js';
import { smokeTheme} from './themes/smoke/smokeTheme.js';

const themes = {
   reset: resetTheme,
   fire: fireTheme,
   warpStar: warpStarTheme,
   flame: flameTheme,
   smoke: smokeTheme
};

export { themes };