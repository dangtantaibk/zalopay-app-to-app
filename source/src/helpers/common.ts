/**
 * Hidden email
 *
 * @param {string} email
 * @return {string}
 */
export function hideEmail(email: string) {
  let hiddenEmail = "";
  for (let i = 0; i < email.length; i++) {
    if (i < email.indexOf("@") ) {
      if (email.indexOf("@") > 5) {
        switch (i) {
          case 0:
          case 1:
            hiddenEmail += email[i]; break;
          case email.indexOf("@") - 1:
          case email.indexOf("@") - 2:
            hiddenEmail += email[i]; break;
          default:
            hiddenEmail += "*";
        }
      } else {
        switch (i) {
          case 0: hiddenEmail += email[i]; break;
          case email.indexOf("@") - 1: hiddenEmail += email[i]; break;
          default:
            hiddenEmail += "*";
        }
      }
    } else {
      hiddenEmail += email[i];
    }
  }
  return hiddenEmail;
}

/**
 * Validate email
 *
 * @param {string} email
 * @return {boolean}
 */
export function validateEmail(email: string) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

/**
 * Validate phone number
 *
 * @param {string} phoneNumber
 * @return {boolean}
 */
export function validatePhoneNumber(phoneNumber: string) {
  const phoneno = /^\d{10}$/ || /^\d{11}$/;
  return phoneno.test(String(phoneNumber).toLowerCase());
}

/**
 * Convert string 0:00 to seconds
 *
 * @param {string} timeString
 * @return number
 */
export function convertStringToSeconds(timeString: string): number {
  const time = timeString.split(':');
  let seconds;
  try {
    seconds = (+time[0] * 60) + (+time[1]);
  }
  catch (e) {
    seconds = 0;
  }

  return seconds
}

