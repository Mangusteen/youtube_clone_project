export const BASE_URL = 'https://youtube.googleapis.com/youtube/v3';

export const truncStr = (str, num) => {
  if (str?.length > num) {
    return str.slice(0, num) + '... '
  } else {
    return str
  }
}
