import moment from "jalali-moment";

export function getUnixDifferenceTimeFromNow(time) {
  if (time) {
    const now = moment().unix();
    const productEndOfferUnixTime = moment(time).unix();

    return now - productEndOfferUnixTime;
  }
  return null;
}

export default {
  getUnixDifferenceTimeFromNow,
};
