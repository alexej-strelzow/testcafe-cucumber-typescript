/*
 * Formatting logic
 */

const nsToTimeString = ns => {

  const ms = ns / 1000000;
  const seconds = ((ms / 1000)%60).toFixed(1);
  const minutes = Math.floor((ms / (60 * 1000)) % 60);
  const hours = Math.floor((ms / (60 * 60 * 1000)) % 60);

  return hours > 0
    ? hours + 'h ' + minutes + 'm ' + seconds + 's'
    : minutes > 0
      ? minutes + 'm ' + seconds + 's'
      : seconds + 's';
};

const truncate = (text, maxLength) => text.length > maxLength ? `${text.substr(0, maxLength)}...` : text;

module.exports = {
  nsToTimeString: nsToTimeString,
  truncate: truncate,
};
