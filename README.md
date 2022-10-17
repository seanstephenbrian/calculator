I created this calculator as my final project for the Foundations section of the Odin Project curriculum.

The central challenge was to code the logic of the calculator in JavaScript without simply evaluating a provided expression. 
I created a set of variables to hold a stored value and track various critical pieces of information, such as the last-clicked key,
the last-used operator, etc. 'Click' event listeners on the numbers and operators trigger the central function, updateDisplay(),
which uses nested conditional statements to check for various situations, complete a chosen operation using the correct inputs, and
update the display accordingly. 

In the end, my goal was to precisely mimic the behavior of other digital calculator applications, such as the built-in calculator on 
the iPhone. This meant that I had to code for some specialized behavior -- such as when a user clicks a number, then an operator, then
the equals sign. Other student solutions have their calculator print an error or clear the display field in this situation, but the
iPhone calculator (and real physical calculators) will evaluate an expression with the chosen operator using the display value as
both the 'x' and 'y'. If a user continues to click the '=' button, the calculator will keep carrying out the same operation, using
the initial display value as one input and the current display value as the other. It was difficult to get my calculator to
do this without going off the rails, but adding more conditional statements and creating new variables (like 'lastOperator' and a 
useful 'tempValue') allowed me to get the calculator to behave as intended.

The visual design of the site is intense and intentionally confrontational, employing a neon green and red color scheme, a custom blackletter
font, and various graphic effects when the user hovers over different elements on the page. The mobile version is a little more stripped 
down. Though the design is definitely bold, I wanted to preserve usability and legibility without sacrificing any visual
interest, and I think I have done so. In any case, the primary purpose of this project was to successfully code the logic of the calculator,
and I'm very satisfied with the way it works.