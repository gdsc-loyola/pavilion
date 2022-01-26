/**
 * @desc shuffles an array. Changes order depending on the day of the year. Changes everyday.
 * @param {array} array - array to shuffle
 */
export const shuffleByDay = (array) => {
  const now = new Date();
  const month = now.getMonth();
  const day = now.getDay();
  const year = now.getFullYear();

  return shuffle([...array], month + day + year);
};

// Taken from: https://stackoverflow.com/a/53758827
function shuffle(array, seed) {
  let length = array.length;

  let t, i;

  // While there remain elements to shuffle…
  while (length) {
    // Pick a remaining element…
    i = Math.floor(random(seed) * length--); // <-- MODIFIED LINE

    // And swap it with the current element.
    t = array[length];
    array[length] = array[i];
    array[i] = t;
    ++seed; // <-- ADDED LINE
  }

  return array;
}

function random(seed) {
  var x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}
