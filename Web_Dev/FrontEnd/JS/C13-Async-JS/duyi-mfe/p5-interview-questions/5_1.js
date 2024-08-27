function m() {
  console.log(0);
  return Promise.resolve(1).then((n) => {
    console.log(n); // This is equivalent to the `console.log(n)` after `await` in the original code
  });
}


(() => {
  m().then(() => {
    console.log(2); // This is equivalent to the `console.log(2)` after `await` in the original code
  });
})(); // Immediately invoked function

console.log(3);

/**
 * equivalent to 5.js
 */
