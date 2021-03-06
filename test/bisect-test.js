var tape = require("tape"),
    arrays = require("../");

tape("bisect is an alias for bisectRight", function(test) {
  test.equal(arrays.bisect, arrays.bisectRight);
  test.end();
});

tape("bisectLeft(array, value) returns the index of an exact match", function(test) {
  var array = [1, 2, 3];
  test.equal(arrays.bisectLeft(array, 1), 0);
  test.equal(arrays.bisectLeft(array, 2), 1);
  test.equal(arrays.bisectLeft(array, 3), 2);
  test.end();
});

tape("bisectLeft(array, value) returns the index of the first match", function(test) {
  var array = [1, 2, 2, 3];
  test.equal(arrays.bisectLeft(array, 1), 0);
  test.equal(arrays.bisectLeft(array, 2), 1);
  test.equal(arrays.bisectLeft(array, 3), 3);
  test.end();
});

tape("bisectLeft(array, value) returns the insertion point of a non-exact match", function(test) {
  var array = [1, 2, 3];
  test.equal(arrays.bisectLeft(array, 0.5), 0);
  test.equal(arrays.bisectLeft(array, 1.5), 1);
  test.equal(arrays.bisectLeft(array, 2.5), 2);
  test.equal(arrays.bisectLeft(array, 3.5), 3);
  test.end();
});

tape("bisectLeft(array, value) has undefined behavior if the search value is unorderable", function(test) {
  var array = [1, 2, 3];
  arrays.bisectLeft(array, new Date(NaN)); // who knows what this will return!
  arrays.bisectLeft(array, undefined);
  arrays.bisectLeft(array, NaN);
  test.end();
});

tape("bisectLeft(array, value, lo) observes the specified lower bound", function(test) {
  var array = [1, 2, 3, 4, 5];
  test.equal(arrays.bisectLeft(array, 0, 2), 2);
  test.equal(arrays.bisectLeft(array, 1, 2), 2);
  test.equal(arrays.bisectLeft(array, 2, 2), 2);
  test.equal(arrays.bisectLeft(array, 3, 2), 2);
  test.equal(arrays.bisectLeft(array, 4, 2), 3);
  test.equal(arrays.bisectLeft(array, 5, 2), 4);
  test.equal(arrays.bisectLeft(array, 6, 2), 5);
  test.end();
});

tape("bisectLeft(array, value, lo, hi) observes the specified bounds", function(test) {
  var array = [1, 2, 3, 4, 5];
  test.equal(arrays.bisectLeft(array, 0, 2, 3), 2);
  test.equal(arrays.bisectLeft(array, 1, 2, 3), 2);
  test.equal(arrays.bisectLeft(array, 2, 2, 3), 2);
  test.equal(arrays.bisectLeft(array, 3, 2, 3), 2);
  test.equal(arrays.bisectLeft(array, 4, 2, 3), 3);
  test.equal(arrays.bisectLeft(array, 5, 2, 3), 3);
  test.equal(arrays.bisectLeft(array, 6, 2, 3), 3);
  test.end();
});

tape("bisectLeft(array, value) handles large sparse arrays", function(test) {
  var array = [],
      i = 1 << 30;
  array[i++] = 1;
  array[i++] = 2;
  array[i++] = 3;
  array[i++] = 4;
  array[i++] = 5;
  test.equal(arrays.bisectLeft(array, 0, i - 5, i), i - 5);
  test.equal(arrays.bisectLeft(array, 1, i - 5, i), i - 5);
  test.equal(arrays.bisectLeft(array, 2, i - 5, i), i - 4);
  test.equal(arrays.bisectLeft(array, 3, i - 5, i), i - 3);
  test.equal(arrays.bisectLeft(array, 4, i - 5, i), i - 2);
  test.equal(arrays.bisectLeft(array, 5, i - 5, i), i - 1);
  test.equal(arrays.bisectLeft(array, 6, i - 5, i), i - 0);
  test.end();
});

tape("bisectRight(array, value) returns the index after an exact match", function(test) {
  var array = [1, 2, 3];
  test.equal(arrays.bisectRight(array, 1), 1);
  test.equal(arrays.bisectRight(array, 2), 2);
  test.equal(arrays.bisectRight(array, 3), 3);
  test.end();
});

tape("bisectRight(array, value) returns the index after the last match", function(test) {
  var array = [1, 2, 2, 3];
  test.equal(arrays.bisectRight(array, 1), 1);
  test.equal(arrays.bisectRight(array, 2), 3);
  test.equal(arrays.bisectRight(array, 3), 4);
  test.end();
});

tape("bisectRight(array, value) returns the insertion point of a non-exact match", function(test) {
  var array = [1, 2, 3];
  test.equal(arrays.bisectRight(array, 0.5), 0);
  test.equal(arrays.bisectRight(array, 1.5), 1);
  test.equal(arrays.bisectRight(array, 2.5), 2);
  test.equal(arrays.bisectRight(array, 3.5), 3);
  test.end();
});

tape("bisectRight(array, value, lo) observes the specified lower bound", function(test) {
  var array = [1, 2, 3, 4, 5];
  test.equal(arrays.bisectRight(array, 0, 2), 2);
  test.equal(arrays.bisectRight(array, 1, 2), 2);
  test.equal(arrays.bisectRight(array, 2, 2), 2);
  test.equal(arrays.bisectRight(array, 3, 2), 3);
  test.equal(arrays.bisectRight(array, 4, 2), 4);
  test.equal(arrays.bisectRight(array, 5, 2), 5);
  test.equal(arrays.bisectRight(array, 6, 2), 5);
  test.end();
});

tape("bisectRight(array, value, lo, hi) observes the specified bounds", function(test) {
  var array = [1, 2, 3, 4, 5];
  test.equal(arrays.bisectRight(array, 0, 2, 3), 2);
  test.equal(arrays.bisectRight(array, 1, 2, 3), 2);
  test.equal(arrays.bisectRight(array, 2, 2, 3), 2);
  test.equal(arrays.bisectRight(array, 3, 2, 3), 3);
  test.equal(arrays.bisectRight(array, 4, 2, 3), 3);
  test.equal(arrays.bisectRight(array, 5, 2, 3), 3);
  test.equal(arrays.bisectRight(array, 6, 2, 3), 3);
  test.end();
});

tape("bisectRight(array, value) handles large sparse arrays", function(test) {
  var array = [],
      i = 1 << 30;
  array[i++] = 1;
  array[i++] = 2;
  array[i++] = 3;
  array[i++] = 4;
  array[i++] = 5;
  test.equal(arrays.bisectRight(array, 0, i - 5, i), i - 5);
  test.equal(arrays.bisectRight(array, 1, i - 5, i), i - 4);
  test.equal(arrays.bisectRight(array, 2, i - 5, i), i - 3);
  test.equal(arrays.bisectRight(array, 3, i - 5, i), i - 2);
  test.equal(arrays.bisectRight(array, 4, i - 5, i), i - 1);
  test.equal(arrays.bisectRight(array, 5, i - 5, i), i - 0);
  test.equal(arrays.bisectRight(array, 6, i - 5, i), i - 0);
  test.end();
});
