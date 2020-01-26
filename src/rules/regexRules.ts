export const regexRules = {
  imageRegex: /(https?:\/\/.*\.(png|jpg|gif))$/,
  websiteRegex: /^(https|http|www)(:\/\/|.).+(\.).+$/,
  phoneRegex: /\+\d[\d\s\-]{8,15}\d$/,
  emailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};
