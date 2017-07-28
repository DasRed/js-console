# js-console

## General
This overwrites the current js console to provide more log flexibility per environment and support for log timestamp and log caller.

## Install
```
yarn add js-browser-console --save
```
```
npm install js-browser-console --save
```
```
bower install js-console --save
```

## Options
After install the log function, will check the configured log level. You can change the log level by changing the value of console.level.
Following values are supported:
- console.LEVEL_DEBUG     
- console.LEVEL_INFO      
- console.LEVEL_NOTICE    
- console.LEVEL_WARN      
- console.LEVEL_ERROR     
- console.LEVEL_CRITICAL  
- console.LEVEL_ALERT     
- console.LEVEL_EMERGENCY 
These level are fully mappable to Monolog.

The default log level is console.LEVEL_DEBUG.

**Example of changing log level**
```js
console.level = console.LEVEL_NOTICE;
```

If you define another log level then all levels, which are no longer allowed, will be NOT reported to the console.

These console functions are mapped to these log levels:
- console.emergency ... console.LEVEL_EMERGENCY
- console.critical  ... console.LEVEL_CRITICAL
- console.alert     ... console.LEVEL_ALERT
- console.error     ... console.LEVEL_ERROR
- console.warn      ... console.LEVEL_WARN
- console.notice    ... console.LEVEL_NOTICE
- console.info      ... console.LEVEL_INFO
- console.debug     ... console.LEVEL_DEBUG
- console.log       ... console.LEVEL_DEBUG

## Additional Functions
There are some additional function to log your message in beautiful colors. Every log function is available in 
- grey #777777
- green #00AA00
- blue #0000CC
- turquoise #00AAAA
- yellow #AAAA00
- pink #CC00CC
- red #CC0000
- black #000000

You can choose these colors by calling the name color log function. Here is the example for the log function "debug". You can do this on the same way for all other log functions:
```js
console.debug('Default Browser Color');
console.debugGrey('grey #777777 Color');
console.debugGreen('green #00AA00 Color');
console.debugBlue('blue #0000CC Color');
console.debugTurquoise('turquoise #00AAAA Color');
console.debugYellow('yellow #AAAA00 Color');
console.debugPink('pink #CC00CC Color');
console.debugRed('red #CC0000 Color');
console.debugBlack('black #000000 Color');
```

## Output
Every log will be written in this format: \[LEVEL] \[DATETIME] \[LOG SOURCE] MESSAGE

## Example
```html
<html>
<head>
    <script src="console.js"></script>
    <script src="example.js"></script>
</head>
</html>


```
**example.js**
```js 
'use strict';

console.log('Hello world log');
console.debug('Hello world debug');
console.level = console.LEVEL_ALERT;
console.debug('Hello world debug should not be displayed');
console.alert('Hello world alert');
```


This will output:
```text
[debug    ] [26.05.2017 07:35:05.301] [/js-console/example] Hello world log
[debug    ] [26.05.2017 07:35:05.310] [/js-console/example] Hello world debug
[alert    ] [26.05.2017 07:35:05.311] [/js-console/example] Hello world alert
```
