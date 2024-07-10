function counter(name) {
  let n = 0;
  let _name = name;

  return {
    count: function () {
      console.log(_name, n);
      return n++;
    },
    reset: function () {
      n = 0;
      console.log(_name, n);
    },
  };
}
let c = counter('c'),
  d = counter('d'); // Create two counters

c.count(); // => 0
d.count(); // => 0: they count independently
c.reset(); // reset() and count() methods share state
c.count(); // => 0: because we reset c
d.count(); // => 1: d was not reset
