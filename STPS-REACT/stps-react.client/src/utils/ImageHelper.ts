import {UTIL_VARIABLE} from "./UtilVariable";

export function getFullImageUrl(imageUrl) {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    return UTIL_VARIABLE.API_BASE_URL.replace(/\/$/, '') + imageUrl;
  }