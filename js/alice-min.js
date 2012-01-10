/* ===========================================================================
 * AliceJS
 *
 * @description
 * A Lightweight Independent CSS Engine
 *
 * @author Laurent Hasson (@ldhasson)
 * @author Jim Ing (@jim_ing)
 * ===========================================================================
 */

var alice=(function(){"use strict";var _private=function(){},core={id:"alice",name:"AliceJS",description:"A Lightweight Independent CSS Engine",version:"0.2",prefix:"",prefixJS:"",elems:null,plugins:{},debug:false,_elements:function(params){var elems=[],i;if(typeof params==="string"){elems.push(document.getElementById(params));}
else if(typeof params==="object"){if(params.length===undefined){elems.push(params);}
else if(params.length===1){elems.push(document.getElementById(params[0]));}
else if(params.length>0){for(i=0;i<params.length;i+=1){if(document.getElementById(params[i])){elems.push(document.getElementById(params[i]));}
else{if(params[i].nodeType!==3){elems.push(params[i]);}}}}}
else if(typeof params==="function"){if(params.length>0){for(i=0;i<params.length;i+=1){if(params[i].nodeType!==3){elems.push(params[i]);}}}}
return elems;},_randomize:function(num,factor){var f,r;if(typeof factor==="string"&&factor.indexOf("%")>-1){f=parseInt(factor,10)/100;}
else{f=parseFloat(factor,10);}
r=num+num*((Math.random()*2*f)-f);return Math.floor(r);},_duration:function(params){var dur,rnd=params.randomness||0,parseDurStr=function(d){var pd;if(d.indexOf("ms")>-1){pd=parseInt(d,10);}
else if(d.indexOf("s")>-1){pd=parseFloat(d,10)*1000;}
else{pd=parseInt(d,10);}
return pd;};if(typeof params==="number"){dur=params;}
else if(typeof params==="string"){dur=parseDurStr(params);}
else if(typeof params==="object"){if(typeof params.value==="string"){dur=parseDurStr(params.value);}
else{dur=parseInt(params.value,10);}}
return{value:dur,randomness:rnd};},_coords:function(params){if(params===undefined||params===null){return{x:"50%",y:"50%"};}
if(typeof params==="string"){switch(params){case"top-left":return{x:"0%",y:"0%"};case"top-center":return{x:"50%",y:"0%"};case"top-right":return{x:"100%",y:"0%"};case"middle-left":return{x:"0%",y:"50%"};case"middle-center":return{x:"50%",y:"50%"};case"middle-right":return{x:"100%",y:"50%"};case"bottom-left":return{x:"0%",y:"100%"};case"bottom-center":return{x:"50%",y:"100%"};case"bottom-right":return{x:"100%",y:"100%"};case"top":return{x:"50%",y:"0%"};case"left":return{x:"0%",y:"50%"};case"center":return{x:"50%",y:"50%"};case"right":return{x:"100%",y:"50%"};case"bottom":return{x:"50%",y:"100%"};case"NW":return{x:"0%",y:"0%"};case"N":return{x:"50%",y:"0%"};case"NE":return{x:"100%",y:"0%"};case"W":return{x:"0%",y:"50%"};case"E":return{x:"100%",y:"50%"};case"SW":return{x:"0%",y:"100%"};case"S":return{x:"50%",y:"100%"};case"SE":return{x:"100%",y:"100%"};default:return{x:"50%",y:"50%"};}}
return params;},_easing:function(params){switch(params){case"linear":return{p1:0.250,p2:0.250,p3:0.750,p4:0.750};case"ease":return{p1:0.250,p2:0.100,p3:0.250,p4:1.000};case"ease-in":return{p1:0.420,p2:0.000,p3:1.000,p4:1.000};case"ease-out":return{p1:0.000,p2:0.000,p3:0.580,p4:1.000};case"ease-in-out":return{p1:0.420,p2:0.000,p3:0.580,p4:1.000};case"easeInQuad":return{p1:0.550,p2:0.085,p3:0.680,p4:0.530};case"easeInCubic":return{p1:0.550,p2:0.055,p3:0.675,p4:0.190};case"easeInQuart":return{p1:0.895,p2:0.030,p3:0.685,p4:0.220};case"easeInQuint":return{p1:0.755,p2:0.050,p3:0.855,p4:0.060};case"easeInSine":return{p1:0.470,p2:0.000,p3:0.745,p4:0.715};case"easeInExpo":return{p1:0.950,p2:0.050,p3:0.795,p4:0.035};case"easeInCirc":return{p1:0.600,p2:0.040,p3:0.980,p4:0.335};case"easeInBack":return{p1:0.600,p2:-0.280,p3:0.735,p4:0.045};case"easeOutQuad":return{p1:0.250,p2:0.460,p3:0.450,p4:0.940};case"easeOutCubic":return{p1:0.215,p2:0.610,p3:0.355,p4:1.000};case"easeOutQuart":return{p1:0.165,p2:0.840,p3:0.440,p4:1.000};case"easeOutQuint":return{p1:0.230,p2:1.000,p3:0.320,p4:1.000};case"easeOutSine":return{p1:0.390,p2:0.575,p3:0.565,p4:1.000};case"easeOutExpo":return{p1:0.190,p2:1.000,p3:0.220,p4:1.000};case"easeOutCirc":return{p1:0.075,p2:0.820,p3:0.165,p4:1.000};case"easeOutBack":return{p1:0.175,p2:0.885,p3:0.320,p4:1.275};case"easeInOutQuad":return{p1:0.455,p2:0.030,p3:0.515,p4:0.955};case"easeInOutCubic":return{p1:0.645,p2:0.045,p3:0.355,p4:1.000};case"easeInOutQuart":return{p1:0.770,p2:0.000,p3:0.175,p4:1.000};case"easeInOutQuint":return{p1:0.860,p2:0.000,p3:0.070,p4:1.000};case"easeInOutSine":return{p1:0.445,p2:0.050,p3:0.550,p4:0.950};case"easeInOutExpo":return{p1:1.000,p2:0.000,p3:0.000,p4:1.000};case"easeInOutCirc":return{p1:0.785,p2:0.135,p3:0.150,p4:0.860};case"easeInOutBack":return{p1:0.680,p2:-0.550,p3:0.265,p4:1.550};case"custom":return{p1:0.000,p2:0.350,p3:0.500,p4:1.300};case"random":return{p1:Math.random().toPrecision(3),p2:Math.random().toPrecision(3),p3:Math.random().toPrecision(3),p4:Math.random().toPrecision(3)};default:return{p1:0.250,p2:0.100,p3:0.250,p4:1.000};}},_percentage:function(params){var pct;if(typeof params==="string"){if(params.indexOf("%")>-1){pct=parseInt(params,10)/100;}
else{if(params>=1||params<=-1){pct=parseInt(params,10)/100;}
else{pct=parseFloat(params,10);}}}
else if(typeof params==="number"){if(params>=1||params<=-1){pct=params/100;}
else{pct=params;}}
return pct;},_prefix:function(){var el=document.createElement("div");if("webkitAnimation"in el.style){this.prefix="-webkit-";this.prefixJS="webkit";}
else if("MozAnimation"in el.style){this.prefix="-moz-";this.prefixJS="Moz";}
else if("MSAnimation"in el.style){this.prefix="-ms-";this.prefixJS="MS";}
else if("OAnimation"in el.style||"OTransform"in el.style){this.prefix="-o-";this.prefixJS="O";}
else{this.prefix="";this.prefixJS="";}
console.log("prefix="+this.prefix,"prefixJS="+this.prefixJS);return;},_docHeight:function(){var D=document;return Math.max(Math.max(D.body.scrollHeight,D.documentElement.scrollHeight),Math.max(D.body.offsetHeight,D.documentElement.offsetHeight),Math.max(D.body.clientHeight,D.documentElement.clientHeight));},_pixel:function(p,w){var pct;if(typeof p==="number"){if(p%1===0){return p;}
else{return(parseFloat(p,10))*w;}}
if(p.indexOf("px")>-1){return parseInt(p,10);}
if(p.indexOf("%")>-1){return Math.round((parseInt(p,10)/100)*w);}},_keyframeInsert:function(rule){if(document.styleSheets&&document.styleSheets.length){try{document.styleSheets[0].insertRule(rule,0);}
catch(ex){console.warn(ex.message,rule);}}
else{var style=document.createElement("style");style.innerHTML=rule;document.head.appendChild(style);}
return;},_keyframeDelete:function(ruleName){var cssrules=(document.all)?"rules":"cssRules",i;for(i=0;i<document.styleSheets[0][cssrules].length;i+=1){if(document.styleSheets[0][cssrules][i].name===ruleName){document.styleSheets[0].deleteRule(i);if(this.debug){console.log("Deleted keyframe: "+ruleName);}
break;}}
return;},_clearAnimation:function(evt){this.style[this.prefixJS+"AnimationName"]="";this.style[this.prefixJS+"AnimationDelay"]="";this.style[this.prefixJS+"AnimationDuration"]="";this.style[this.prefixJS+"AnimationTimingFunction"]="";this.style[this.prefixJS+"AnimationIterationCount"]="";this.style[this.prefixJS+"AnimationDirection"]="";this.style[this.prefixJS+"AnimationPlayState"]="";alice._keyframeDelete(evt.animationName);return;},init:function(params){console.info("Initializing "+this.name+" ("+this.description+") "+this.version);this._prefix();if(params&&params.elems){this.elems=this._elements(params.elems);}
if(typeof jWorkflow!=="undefined"){console.warn("jWorkflow: enabled");var id=(params&&params.id)?params.id:'',workflow=jWorkflow.order(),animation={delay:function(ms){workflow.chill(ms);return animation;},start:function(){workflow.start(function(){console.info("core.animation.start");});}};Array.prototype.forEach.call(Object.keys(core.plugins),function(plugin){var func=core.plugins[plugin];animation[plugin]=function(){var args=arguments;workflow.andThen(function(){func.apply(document.getElementById(id),args);});return animation;};});return animation;}
else{console.warn("jWorkflow: disabled");}
return core.plugins;}};return core;}());alice.plugins.slide=function(params){"use strict";console.info("slide",params);var formatDuration=function(d){var dObj=alice._duration(d),dVal=alice._randomize(dObj.value,dObj.randomness)+"ms";return dVal;},formatCoords=function(c){var cObj=alice._coords(c),cVal=cObj.x+" "+cObj.y;return cVal;},formatEasing=function(e){var eObj=alice._easing(e),eVal="cubic-bezier("+eObj.p1+", "+eObj.p2+", "+eObj.p3+", "+eObj.p4+")";return eVal;},oppositeNumber=function(n){var oNum=(n>0)?-n:Math.abs(n);return oNum;},getValue=function(obj,val){if(obj){if(obj.value){return obj.value;}
else{return obj;}}
else{return val;}},setSize=function(elem){console.info("setSize");if(elem.children[0]){elem.children[0].onload=function(ev){if(alice.debug){console.log(ev,elem,alice,alice.width,alice.height);}
elem.style.width=alice.width;elem.style.height=alice.height;};}},delay=getValue(params.delay,0),duration=getValue(params.duration,2000),timing=params.timing||"ease",iteration=params.iteration||1,direction=params.direction||"normal",playstate=params.playstate||"running",perspective=params.perspective||"1000",perspectiveOrigin=params.perspectiveOrigin||"center",backfaceVisibility=params.backfaceVisibility||"visible",overshoot=alice._percentage(params.overshoot)||0,overShootPercent=85,rotate=params.rotate||0,rotateStart=alice._percentage(rotate)*100,rotateOver=overshoot*100,rotateEnd=0,flip=params.flip||null,flipStart=0,flipEnd=(flip&&(flip==="right"||flip==="up"))?360:-360,flipOver=Math.floor((1+overshoot)*flipEnd),flipAxis=(flip&&(flip==="left"||flip==="right"))?"Y":"X",fade=(params.fade&&params.fade!=="")?params.fade:null,fadeStart=(fade&&fade==="out")?1:0,fadeEnd=(fade&&fade==="out")?0:1,scale=alice._percentage(params.scale)||1,move="",axis="",sign=1,posStart=0,posEnd=params.posEnd||0,over=posEnd+(sign*Math.floor(posEnd*overshoot)),container,elems,elem,i,animId,css,transformStart,transformOver,transformEnd,boxShadowStart,boxShadowEnd,dir,size,shadowSize;if(alice.elems!==null){elems=alice.elems;}
else{elems=alice._elements(params.elems);}
if(elems&&elems.length>0){for(i=0;i<elems.length;i+=1){elem=elems[i];container=elem.parentElement||elem.parentNode;if(params.delay&&params.delay.offset){delay=parseInt(delay,10)+parseInt(params.delay.offset,10);delay=delay+"ms";}
if(params.duration&&params.duration.offset){duration=parseInt(duration,10)+parseInt(params.duration.offset,10);duration=duration+"ms";}
if(alice.debug){console.warn("delay="+delay,"duration="+duration);}
animId=alice.id+"-slide-"+(new Date()).getTime()+"-"+Math.floor(Math.random()*1000000);if(params.move){dir=params.move.direction||params.move;switch(dir){case"left":move="Left";axis="X";sign=-1;size=window.innerWidth;posStart=(params.move.start)?alice._pixel(params.move.start,size):size;posEnd=(params.move.end)?alice._pixel(params.move.end,size):0;over=sign*Math.floor(posStart*overshoot);break;case"right":move="Right";axis="X";sign=1;size=document.body.offsetWidth-elem.clientWidth;posStart=(params.move.start)?alice._pixel(params.move.start,size):0;posEnd=(params.move.end)?alice._pixel(params.move.end,size):size;over=posEnd+(sign*Math.floor(posEnd*overshoot));break;case"up":move="Up";axis="Y";sign=-1;size=window.innerHeight;posStart=(params.move.start)?alice._pixel(params.move.start,size):size;posEnd=(params.move.end)?alice._pixel(params.move.end,size):0;over=sign*Math.floor(posStart*overshoot);break;case"down":move="Down";axis="Y";sign=1;size=alice._docHeight()-(container.clientHeight*3);posStart=(params.move.start)?alice._pixel(params.move.start,size):0;posEnd=(params.move.end)?alice._pixel(params.move.end,size):size;over=posEnd+(sign*Math.floor(posEnd*overshoot));if(alice.debug){console.warn(alice._docHeight(),window.innerHeight,window.pageYOffset,container.clientHeight);}
break;}}
transformStart="";transformStart+=(flip)?" rotate"+flipAxis+"("+flipStart+"deg)":" translate"+axis+"("+posStart+"px)";transformStart+=(rotate&&rotate!=="0%")?" rotate("+rotateStart+"deg)":"";transformStart+=(scale)?" scale(1)":"";transformOver="";transformOver+=(flip)?" rotate"+flipAxis+"("+flipOver+"deg)":" translate"+axis+"("+over+"px)";transformOver+=(rotate&&rotate!=="0%")?" rotate("+rotateOver+"deg)":"";transformOver+=(scale)?" scale("+scale+")":"";transformEnd="";transformEnd+=(flip)?" rotate"+flipAxis+"("+flipEnd+"deg)":" translate"+axis+"("+posEnd+"px)";if(move===""&&direction==="alternate"){transformEnd+=" rotate("+oppositeNumber(rotateStart)+"deg)";}
else{transformEnd+=(rotate&&rotate!=="0%")?" rotate("+rotateEnd+"deg)":"";}
transformEnd+=(scale)?" scale("+scale+")":"";if(scale>1){shadowSize=Math.round(scale*10);boxShadowStart=" 0px 0px 0px rgba(0, 0, 0, 1)";boxShadowEnd=" "+shadowSize+"px "+shadowSize+"px "+shadowSize+"px rgba(0, 0, 0, 0.5)";if(alice.debug){console.warn("scale="+scale,shadowSize);}}
css="";css+="@"+alice.prefix+"keyframes "+animId+" {\n";css+="\t"+"0% {"+"\n";css+="\t\t"+" "+alice.prefix+"transform:"+transformStart+";"+"\n";css+="\t\t"+" "+alice.prefix+"transform-origin:"+formatCoords(perspectiveOrigin)+";"+"\n";css+=(fade)?"\t\t"+"opacity: "+fadeStart+";"+"\n":"";css+=(scale>1)?"\t\t"+alice.prefix+"box-shadow: "+boxShadowStart+";"+"\n":"";css+="\t"+"}"+"\n";if(overshoot!==0){css+="\t"+overShootPercent+"% {\n";css+="\t\t"+" "+alice.prefix+"transform:"+transformOver+";"+"\n";css+="\t\t"+" "+alice.prefix+"transform-origin:"+formatCoords(perspectiveOrigin)+";"+"\n";css+="\t"+"}"+"\n";}
css+="\t"+"100% {"+"\n";css+="\t\t"+" "+alice.prefix+"transform:"+transformEnd+";"+"\n";css+="\t\t"+" "+alice.prefix+"transform-origin:"+formatCoords(perspectiveOrigin)+";"+"\n";css+=(fade)?"\t\t"+"opacity: "+fadeEnd+";"+"\n":"";css+=(scale>1)?"\t\t"+alice.prefix+"box-shadow: "+boxShadowEnd+";"+"\n":"";css+="\t"+"}"+"\n";css+="}"+"\n";if(alice.debug){console.log(css);}
alice._keyframeInsert(css);if("MozAnimation"in elem.style){elem.addEventListener("animationend",alice._clearAnimation,false);}
else{elem.addEventListener(alice.prefixJS+"AnimationEnd",alice._clearAnimation,false);}
container.style[alice.prefixJS+"Perspective"]=perspective;container.style[alice.prefixJS+"PerspectiveOrigin"]=formatCoords(perspectiveOrigin);elem.style[alice.prefixJS+"BackfaceVisibility"]=backfaceVisibility;elem.style[alice.prefixJS+"AnimationName"]=animId;elem.style[alice.prefixJS+"AnimationDelay"]=formatDuration(delay);elem.style[alice.prefixJS+"AnimationDuration"]=formatDuration(duration);elem.style[alice.prefixJS+"AnimationTimingFunction"]=formatEasing(timing);elem.style[alice.prefixJS+"AnimationIterationCount"]=iteration;elem.style[alice.prefixJS+"AnimationDirection"]=direction;elem.style[alice.prefixJS+"AnimationPlayState"]=playstate;elem.style[alice.prefixJS+"Transform"]=transformEnd;elem.style.opacity=(fade)?fadeEnd:"";elem.style[alice.prefixJS+"BoxShadow"]=(scale>1)?boxShadowEnd:"";if(alice.debug){console.log(elem.id,elem.style,elem.style[alice.prefixJS+"AnimationDuration"],elem.style[alice.prefixJS+"AnimationTimingFunction"]);}}}
else{console.warn("No elements!");}
return params;};alice.plugins.slideLeft=function(params){"use strict";var p=params;p.move="left";alice.plugins.slide(p);return p;};alice.plugins.slideRight=function(params){"use strict";var p=params;p.move="right";alice.plugins.slide(p);return p;};alice.plugins.slideUp=function(params){"use strict";var p=params;p.move="up";alice.plugins.slide(p);return p;};alice.plugins.slideDown=function(params){"use strict";var p=params;p.move="down";alice.plugins.slide(p);return p;};alice.plugins.tossLeft=function(params){"use strict";var p=params;p.move="left";p.rotate=720;p.fade="in";alice.plugins.slide(p);return p;};alice.plugins.tossRight=function(params){"use strict";var p=params;p.move="right";p.rotate=-720;p.fade="in";alice.plugins.slide(p);return p;};alice.plugins.tossUp=function(params){"use strict";var p=params;p.move="up";p.rotate=-720;p.fade="in";alice.plugins.slide(p);return p;};alice.plugins.tossDown=function(params){"use strict";var p=params;p.move="down";p.rotate=720;p.fade="in";alice.plugins.slide(p);return p;};alice.plugins.spinLeft=function(params){"use strict";var p=params;p.flip="left";alice.plugins.slide(p);return p;};alice.plugins.spinRight=function(params){"use strict";var p=params;p.flip="right";alice.plugins.slide(p);return p;};alice.plugins.spinUp=function(params){"use strict";var p=params;p.flip="up";alice.plugins.slide(p);return p;};alice.plugins.spinDown=function(params){"use strict";var p=params;p.flip="down";alice.plugins.slide(p);return p;};alice.plugins.pushForward=function(params){"use strict";var p=params;p.scale="150%";alice.plugins.slide(p);return p;};alice.plugins.pushBackward=function(params){"use strict";var p=params;p.scale="50%";alice.plugins.slide(p);return p;};alice.plugins.fadeIn=function(params){"use strict";var p=params;p.move="none";p.fade="in";alice.plugins.slide(p);return p;};alice.plugins.fadeOut=function(params){"use strict";var p=params;p.move="none";p.fade="out";alice.plugins.slide(p);return p;};alice.plugins.drain=function(params){"use strict";var p=params;p.move="none";p.rotate=-720;p.fade="out";p.scale=1;alice.plugins.slide(p);return p;};alice.plugins.phantomZone=function(params){"use strict";var p=params;p.move="none";p.rotate=-720;p.flip="left";p.fade="out";p.scale=1;alice.plugins.slide(p);return p;};alice.plugins.pageFlipLeft=function(params){"use strict";var p=params;p.flip="left";p.perspectiveOrigin="left";alice.plugins.slide(p);return p;};alice.plugins.pageFlipRight=function(params){"use strict";var p=params;p.flip="right";p.perspectiveOrigin="right";alice.plugins.slide(p);return p;};alice.plugins.pageFlipUp=function(params){"use strict";var p=params;p.flip="up";p.perspectiveOrigin="top";alice.plugins.slide(p);return p;};alice.plugins.pageFlipDown=function(params){"use strict";var p=params;p.flip="down";p.perspectiveOrigin="bottom";alice.plugins.slide(p);return p;};alice.plugins.twirlFromLeft=function(params){"use strict";var p=params;p.move="none";p.rotate=-135;p.flip="left";p.perspectiveOrigin="left";alice.plugins.slide(p);return p;};alice.plugins.twirlFromRight=function(params){"use strict";var p=params;p.move="none";p.rotate=135;p.flip="right";p.perspectiveOrigin="right";alice.plugins.slide(p);return p;};alice.plugins.raceFlag=function(params){"use strict";var p=params;p.move="up";p.rotate=-720;p.flip="down";p.perspectiveOrigin="top-right";alice.plugins.slide(p);return p;};alice.plugins.hinge=function(params){"use strict";var p=params;p.duration="1s";p.timing="linear";p.iteration="infinite";p.direction="alternate";p.move="none";p.rotate=45;p.overshoot=0;p.perspectiveOrigin="top-left";alice.plugins.slide(p);return p;};alice.plugins.wobble=function(params){"use strict";var p=params;p.duration="200ms";p.timing="linear";p.iteration="infinite";p.direction="alternate";p.move="none";p.rotate=10;p.overshoot=0;p.perspectiveOrigin="center";alice.plugins.slide(p);return p;};alice.plugins.dance=function(params){"use strict";var p=params;p.duration="500ms";p.timing="easeInOutBack";p.iteration="infinite";p.direction="alternate";p.move="none";p.rotate=45;p.overshoot=0;p.perspectiveOrigin="center";alice.plugins.slide(p);return p;};alice.plugins.pendulum=function(params){"use strict";var p=params;p.duration="1s";p.timing="ease-in-out";p.iteration="infinite";p.direction="alternate";p.move="none";p.rotate=45;p.overshoot=0;p.perspectiveOrigin="top";alice.plugins.slide(p);return p;};alice.plugins.bounce=function(params){"use strict";var p=params;p.scale="125%";p.duration="500ms";p.timing="easeOutSine";p.iteration="infinite";p.direction="alternate";p.move="none";alice.plugins.slide(p);return p;};
