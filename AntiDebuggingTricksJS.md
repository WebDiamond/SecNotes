0x01 Differences of time

Another trick borrowed from classic anti-reversing techniques is to use checks based on time. When a script is executed with DevTools (or similar), the execution time is markedly slowed. This situation can be abused by us using the time as a little canary that tells us if we are being debugged or not. This aproach can be done in differentes ways.

For example we can measure the elapsed time betweeen two or more points inside the code. If we know the elapsed mean time between those points in “natural” conditions we can use this value as a reference. An elapsed time bigger than the expected would mean that we are being under a debugger.
Other idea based on this topic is to have some functions with loops or another “heavy” code wich execution time is known:

setInterval(function(){
  var startTime = performance.now(), check, diff;
  for (check = 0; check < 1000; check++){
    console.log(check);
    console.clear();
  }
  diff = performance.now() - startTime;
  if (diff > 200){
    alert("Debugger detected!");
  }
}, 500);



First run that code without DevTools opened and later open it. As you can see we could detect the presence of a debugger because the time difference was greater than the expected. This approach to using time references as a canary can be combined with what is shown in the previous section. So we can take a time reference before and after a breakpoint. If the breakpoint is executed, the amount of time lost before we can resume the execution will reveal the presence of a debugger.

    var startTime = performance.now();
    debugger;
    var stopTime = performance.now();
    if ((stopTime - startTime) > 1000) {
        alert("Debugger detected!")
    }

These time checks can be placed at random points inside the code so it will be harder to the analyst to spot them.

0x02 Breakpoints

The tools used to debug JavaScript (for example DevTools) has the capacity of block the script execution at an arbitrary point in order to help us to undertand what is happening. This is done with “breakpoints”. Using breakpoints when you are debugging helps you to see what happened, what is happening and will happen next, so they are one of the most fundamentals basis of debugging.

If you played a bit with a debugger and the x86 family probably you know about the 0xCC instruction. In JavaScript we have an analog instruction called debugger. Placing a debugger; sentence inside your code will produce a stop in the execution of your script when the debugger hit that instruction. Example:

console.log("See me!");
debugger;
console.log("See me!");

If you execute this code with your DevTools opened, a prompt asking you to resume the execution will be shown. Until you press “Continue” the script will be blocked at that point. And here comes the next (pretty stupid) trick seen in comercial products: just put a infinte loop of debugger;. Some browsers prevents this situation, others not. But the concept inside this is just to annoy the guy debugging your code. The loop will flood you with a torrent of windows asking to resume the execution, so we can’t start to work reversing the script until this is fixed.

setTimeout(function() {while (true) {eval("debugger")

Other trick related with breakpoints will be explained in next section.

0x03 Function redefinitions

This is for far the most basic and well-known technique used to avoid someone to debug our code. In JavaScript we can redefine the functions that are used usually to retrieve information. For example, console.log() is used to show in the console information about functions, variables, etc. If we redefine this function, and we change his behaviour, we can hide certain information or just fake it.

To see it in action, just run this inside your DevTools:

console.log("Hello World");
var fake = function() {};
window['console']['log'] = fake;
console.log("You can't see me!");

What we should see is:

VM48:1 Hello World

The second message is not shown because we “disabled” the function with a redefinition to an empty function. But we can be a bit more ingenious and just change his behaviour to show fakec information. To ilustrate it:

console.log("Normal function");
// First we save a reference to the original console.log function
var original = window['console']['log'];
// Next we create our fake function
// Basicly we check the argument and if match we call original function with other param.
// If there is no match pass the argument to the original function
var fake = function(argument) {
    if (argument === "Ka0labs") {
        original("Spoofed!");
    } else {
        original(argument);
    }
}
// We redefine now console.log as our fake function
window['console']['log'] = fake;
// Then we call console.log with any argument
console.log("This is unaltered");
// Now we should see other text in console different to "Ka0labs"
console.log("Ka0labs");
// Aaaand everything still OK
console.log("Bye bye!");

And if everything works…

Normal function
VM117:11 This is unaltered
VM117:9 Spoofed!
VM117:11 Bye bye!

If you played before with “hooking” this will sound familiar to you.

We can be even more clever and redefine other functions more interesting in order to control the code executed in an unexpected way. For example, we can build a snippet based on the code shown before to redefine the eval function. We can pass JavaScript code to the eval function, so this code will be evaluated and executed. But if we redefine the function, we can run a different code. So… what you see is not what you get :).

// Just a normal eval
eval("console.log('1337')");
// Now we repat the process...
var original = eval;
var fake = function(argument) {
    // If the code to be evaluated contains 1337...
    if (argument.indexOf("1337") !== -1) {
        // ... we just execute a different code
        original("for (i = 0; i < 10; i++) { console.log(i);}");
    }
    else {
        original(argument);
    }
}
eval = fake;
eval("console.log('We should see this...')");
// Now we should see the execution of a for loop instead of what is expected
eval("console.log('Too 1337 for you!')");

And… Yep, we executed a different code (the “for” loop instead of the console.log with the string “Too 1337 for you!”).

1337
VM146:1 We should see this...
VM147:1 0
VM147:1 1
VM147:1 2
VM147:1 3
VM147:1 4
VM147:1 5
VM147:1 6
VM147:1 7
VM147:1 8
VM147:1 9

Modifying the flow of our program by this way is a cool trick, but as we said at the begin, it is the most basic trick and can be detected and defeated easily. This is because in JavaScript every function has a method toString (or toSource in Firefox) that returns its own code. So it only needs to check if the code of the desire function was changed or not. Of course we can redefine the method toString / toSource, but we are stucked in the same situation: function.toString.toString().
