!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";var o=void 0,r=void 0,l=void 0,c=void 0,d=void 0,u=void 0,i=1;function m(){v(),o=setInterval(function(){return v()},1e3)}function a(e){var t=void 0,n=void 0;clearInterval(o),"p"===e?(t=document.getElementById("ptime").value,document.title="POMODORO",n="black",l=i%4==0?"lb":"sb",c="Pomodoro time!",d="Time for a pomodoro!",u=0):"sb"===e?(document.title="POMODORO - Short break",t=document.getElementById("sbtime").value,i+=1,l="p",n="#008000",c="Break time!",d="Time for a short break!"):(document.title="POMODORO - Long break",t=document.getElementById("lbtime").value,i+=1,l="p",n="#00FF00",c="Break time!",d="Time for a long break!"),document.getElementById("minute").style.color=n,document.getElementById("second").style.color=n,r=60*t,m(),function(e,t,n){"p"===e?$.growl.error({title:t,message:n}):$.growl.notice({title:t,message:n})}(e,c,d)}function s(){var e=void 0;u?(u=0,m(),e="Pause"):(u=1,clearInterval(o),e="Continue"),document.getElementById("stop").value=e}function v(){var e,t=void 0,n=Math.round((r-30)/60);n<10&&(n="0"+n),(t=r%60)<10&&(t="0"+t),document.getElementById("minute").innerHTML=n,document.getElementById("second").innerHTML=t,r>0?r-=1:(clearInterval(o),a(l),e="bell",document.getElementById(e).play())}function f(){clearInterval(o),document.getElementById("ptime").value=25,document.getElementById("sbtime").value=5,document.getElementById("lbtime").value=15,document.getElementById("minute").innerHTML=25,document.getElementById("second").innerHTML="00"}document.addEventListener("DOMContentLoaded",function(){document.getElementById("pomodoro").onclick=function(){a("p")},document.getElementById("sbreak").onclick=function(){a("sb")},document.getElementById("lbreak").onclick=function(){a("lb")},document.getElementById("stop").onclick=s,document.getElementById("reset").onclick=f})}]);