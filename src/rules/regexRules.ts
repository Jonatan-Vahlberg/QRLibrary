export const regexRules = {
  imageRegex: /(https?:\/\/.*\.(png|jpg|gif))$/,
  websiteRegex: /^(http|https):\/\/.+\..{2,}$/, //Due to linking problems can only recognize Http/https
  phoneRegex: /\+\d{1,4}[\d\s\-]{8,15}\d$/, //International only
  emailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

//How to better matching
/*
 * Allow for multiple matching
 * Handle errors in a more sofisticated way
 * Allow VCard or event codes
 *
 */
