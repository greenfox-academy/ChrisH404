'use strict';

var lineCount = 4;

// Write a program that draws a
// triangle like this:
//
// *
// **
// ***
// ****
//
// The triangle should have as many lines as lineCount is
var out = "*";
for (var i = 1; i <= lineCount; i++) {
    console.log(out);
    out += "*";
}