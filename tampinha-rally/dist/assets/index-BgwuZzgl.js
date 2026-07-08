(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const qa="169",Fc=0,yo=1,Oc=2,Dl=1,Il=2,un=3,Nn=0,Pe=1,tn=2,Pn=0,ni=1,Js=2,So=3,Eo=4,Bc=5,Kn=100,kc=101,zc=102,Hc=103,Gc=104,Vc=200,Wc=201,Xc=202,qc=203,ea=204,na=205,Yc=206,$c=207,Kc=208,jc=209,Zc=210,Jc=211,Qc=212,th=213,eh=214,ia=0,sa=1,ra=2,Ci=3,aa=4,oa=5,la=6,ca=7,Ul=0,nh=1,ih=2,Ln=0,sh=1,rh=2,ah=3,Nl=4,oh=5,lh=6,ch=7,Fl=300,Pi=301,Li=302,ha=303,ua=304,lr=306,da=1e3,Qn=1001,fa=1002,He=1003,hh=1004,fs=1005,je=1006,vr=1007,ti=1008,gn=1009,Ol=1010,Bl=1011,is=1012,Ya=1013,ri=1014,fn=1015,as=1016,$a=1017,Ka=1018,Di=1020,kl=35902,zl=1021,Hl=1022,Je=1023,Gl=1024,Vl=1025,Ai=1026,Ii=1027,Wl=1028,ja=1029,Xl=1030,Za=1031,Ja=1033,Xs=33776,qs=33777,Ys=33778,$s=33779,pa=35840,ma=35841,ga=35842,_a=35843,va=36196,xa=37492,Ma=37496,ya=37808,Sa=37809,Ea=37810,ba=37811,Ta=37812,Aa=37813,wa=37814,Ra=37815,Ca=37816,Pa=37817,La=37818,Da=37819,Ia=37820,Ua=37821,Ks=36492,Na=36494,Fa=36495,ql=36283,Oa=36284,Ba=36285,ka=36286,uh=3200,dh=3201,Yl=0,fh=1,wn="",Ce="srgb",kn="srgb-linear",Qa="display-p3",cr="display-p3-linear",Qs="linear",ee="srgb",tr="rec709",er="p3",ci=7680,bo=519,ph=512,mh=513,gh=514,$l=515,_h=516,vh=517,xh=518,Mh=519,To=35044,Ao="300 es",pn=2e3,nr=2001;class Oi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const _e=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let wo=1234567;const Qi=Math.PI/180,ss=180/Math.PI;function Bi(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(_e[i&255]+_e[i>>8&255]+_e[i>>16&255]+_e[i>>24&255]+"-"+_e[t&255]+_e[t>>8&255]+"-"+_e[t>>16&15|64]+_e[t>>24&255]+"-"+_e[e&63|128]+_e[e>>8&255]+"-"+_e[e>>16&255]+_e[e>>24&255]+_e[n&255]+_e[n>>8&255]+_e[n>>16&255]+_e[n>>24&255]).toLowerCase()}function Te(i,t,e){return Math.max(t,Math.min(e,i))}function to(i,t){return(i%t+t)%t}function yh(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Sh(i,t,e){return i!==t?(e-i)/(t-i):0}function ts(i,t,e){return(1-e)*i+e*t}function Eh(i,t,e,n){return ts(i,t,1-Math.exp(-e*n))}function bh(i,t=1){return t-Math.abs(to(i,t*2)-t)}function Th(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Ah(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function wh(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Rh(i,t){return i+Math.random()*(t-i)}function Ch(i){return i*(.5-Math.random())}function Ph(i){i!==void 0&&(wo=i);let t=wo+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Lh(i){return i*Qi}function Dh(i){return i*ss}function Ih(i){return(i&i-1)===0&&i!==0}function Uh(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Nh(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Fh(i,t,e,n,s){const r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),h=a((t+n)/2),d=r((t-n)/2),u=a((t-n)/2),m=r((n-t)/2),g=a((n-t)/2);switch(s){case"XYX":i.set(o*h,l*d,l*u,o*c);break;case"YZY":i.set(l*u,o*h,l*d,o*c);break;case"ZXZ":i.set(l*d,l*u,o*h,o*c);break;case"XZX":i.set(o*h,l*g,l*m,o*c);break;case"YXY":i.set(l*m,o*h,l*g,o*c);break;case"ZYZ":i.set(l*g,l*m,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function bi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Se(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const ps={DEG2RAD:Qi,RAD2DEG:ss,generateUUID:Bi,clamp:Te,euclideanModulo:to,mapLinear:yh,inverseLerp:Sh,lerp:ts,damp:Eh,pingpong:bh,smoothstep:Th,smootherstep:Ah,randInt:wh,randFloat:Rh,randFloatSpread:Ch,seededRandom:Ph,degToRad:Lh,radToDeg:Dh,isPowerOfTwo:Ih,ceilPowerOfTwo:Uh,floorPowerOfTwo:Nh,setQuaternionFromProperEuler:Fh,normalize:Se,denormalize:bi};class kt{constructor(t=0,e=0){kt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Te(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ft{constructor(t,e,n,s,r,a,o,l,c){Ft.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],m=n[5],g=n[8],v=s[0],f=s[3],p=s[6],S=s[1],M=s[4],x=s[7],R=s[2],w=s[5],A=s[8];return r[0]=a*v+o*S+l*R,r[3]=a*f+o*M+l*w,r[6]=a*p+o*x+l*A,r[1]=c*v+h*S+d*R,r[4]=c*f+h*M+d*w,r[7]=c*p+h*x+d*A,r[2]=u*v+m*S+g*R,r[5]=u*f+m*M+g*w,r[8]=u*p+m*x+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*a-o*c,u=o*l-h*r,m=c*r-a*l,g=e*d+n*u+s*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=d*v,t[1]=(s*c-h*n)*v,t[2]=(o*n-s*a)*v,t[3]=u*v,t[4]=(h*e-s*l)*v,t[5]=(s*r-o*e)*v,t[6]=m*v,t[7]=(n*l-c*e)*v,t[8]=(a*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(xr.makeScale(t,e)),this}rotate(t){return this.premultiply(xr.makeRotation(-t)),this}translate(t,e){return this.premultiply(xr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const xr=new Ft;function Kl(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function ir(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Oh(){const i=ir("canvas");return i.style.display="block",i}const Ro={};function js(i){i in Ro||(Ro[i]=!0,console.warn(i))}function Bh(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function kh(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function zh(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Co=new Ft().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Po=new Ft().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Hi={[kn]:{transfer:Qs,primaries:tr,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i,fromReference:i=>i},[Ce]:{transfer:ee,primaries:tr,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[cr]:{transfer:Qs,primaries:er,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.applyMatrix3(Po),fromReference:i=>i.applyMatrix3(Co)},[Qa]:{transfer:ee,primaries:er,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.convertSRGBToLinear().applyMatrix3(Po),fromReference:i=>i.applyMatrix3(Co).convertLinearToSRGB()}},Hh=new Set([kn,cr]),Zt={enabled:!0,_workingColorSpace:kn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Hh.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;const n=Hi[t].toReference,s=Hi[e].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return Hi[i].primaries},getTransfer:function(i){return i===wn?Qs:Hi[i].transfer},getLuminanceCoefficients:function(i,t=this._workingColorSpace){return i.fromArray(Hi[t].luminanceCoefficients)}};function wi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Mr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let hi;class Gh{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{hi===void 0&&(hi=ir("canvas")),hi.width=t.width,hi.height=t.height;const n=hi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=hi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ir("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=wi(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(wi(e[n]/255)*255):e[n]=wi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Vh=0;class jl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Vh++}),this.uuid=Bi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(yr(s[a].image)):r.push(yr(s[a]))}else r=yr(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function yr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Gh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Wh=0;class Ae extends Oi{constructor(t=Ae.DEFAULT_IMAGE,e=Ae.DEFAULT_MAPPING,n=Qn,s=Qn,r=je,a=ti,o=Je,l=gn,c=Ae.DEFAULT_ANISOTROPY,h=wn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Wh++}),this.uuid=Bi(),this.name="",this.source=new jl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new kt(0,0),this.repeat=new kt(1,1),this.center=new kt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ft,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Fl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case da:t.x=t.x-Math.floor(t.x);break;case Qn:t.x=t.x<0?0:1;break;case fa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case da:t.y=t.y-Math.floor(t.y);break;case Qn:t.y=t.y<0?0:1;break;case fa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ae.DEFAULT_IMAGE=null;Ae.DEFAULT_MAPPING=Fl;Ae.DEFAULT_ANISOTROPY=1;class re{constructor(t=0,e=0,n=0,s=1){re.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],m=l[5],g=l[9],v=l[2],f=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(g-f)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(g+f)<.1&&Math.abs(c+m+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(c+1)/2,x=(m+1)/2,R=(p+1)/2,w=(h+u)/4,A=(d+v)/4,C=(g+f)/4;return M>x&&M>R?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=w/n,r=A/n):x>R?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=w/s,r=C/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=A/r,s=C/r),this.set(n,s,r,e),this}let S=Math.sqrt((f-g)*(f-g)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(S)<.001&&(S=1),this.x=(f-g)/S,this.y=(d-v)/S,this.z=(u-h)/S,this.w=Math.acos((c+m+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Xh extends Oi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new re(0,0,t,e),this.scissorTest=!1,this.viewport=new re(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:je,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Ae(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new jl(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ai extends Xh{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Zl extends Ae{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=He,this.minFilter=He,this.wrapR=Qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class qh extends Ae{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=He,this.minFilter=He,this.wrapR=Qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class os{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3];const u=r[a+0],m=r[a+1],g=r[a+2],v=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(o===1){t[e+0]=u,t[e+1]=m,t[e+2]=g,t[e+3]=v;return}if(d!==v||l!==u||c!==m||h!==g){let f=1-o;const p=l*u+c*m+h*g+d*v,S=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){const R=Math.sqrt(M),w=Math.atan2(R,p*S);f=Math.sin(f*w)/R,o=Math.sin(o*w)/R}const x=o*S;if(l=l*f+u*x,c=c*f+m*x,h=h*f+g*x,d=d*f+v*x,f===1-o){const R=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=R,c*=R,h*=R,d*=R}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[a],u=r[a+1],m=r[a+2],g=r[a+3];return t[e]=o*g+h*d+l*m-c*u,t[e+1]=l*g+h*u+c*d-o*m,t[e+2]=c*g+h*m+o*u-l*d,t[e+3]=h*g-o*d-l*u-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),d=o(r/2),u=l(n/2),m=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*m*g,this._y=c*m*d-u*h*g,this._z=c*h*g+u*m*d,this._w=c*h*d-u*m*g;break;case"YXZ":this._x=u*h*d+c*m*g,this._y=c*m*d-u*h*g,this._z=c*h*g-u*m*d,this._w=c*h*d+u*m*g;break;case"ZXY":this._x=u*h*d-c*m*g,this._y=c*m*d+u*h*g,this._z=c*h*g+u*m*d,this._w=c*h*d-u*m*g;break;case"ZYX":this._x=u*h*d-c*m*g,this._y=c*m*d+u*h*g,this._z=c*h*g-u*m*d,this._w=c*h*d+u*m*g;break;case"YZX":this._x=u*h*d+c*m*g,this._y=c*m*d+u*h*g,this._z=c*h*g-u*m*d,this._w=c*h*d-u*m*g;break;case"XZY":this._x=u*h*d-c*m*g,this._y=c*m*d-u*h*g,this._z=c*h*g+u*m*d,this._w=c*h*d+u*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+o+d;if(u>0){const m=.5/Math.sqrt(u+1);this._w=.25/m,this._x=(h-l)*m,this._y=(r-c)*m,this._z=(a-s)*m}else if(n>o&&n>d){const m=2*Math.sqrt(1+n-o-d);this._w=(h-l)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+c)/m}else if(o>d){const m=2*Math.sqrt(1+o-n-d);this._w=(r-c)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(l+h)/m}else{const m=2*Math.sqrt(1+d-n-o);this._w=(a-s)/m,this._x=(r+c)/m,this._y=(l+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Te(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const m=1-e;return this._w=m*a+e*this._w,this._x=m*n+e*this._x,this._y=m*s+e*this._y,this._z=m*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),d=Math.sin((1-e)*h)/c,u=Math.sin(e*h)/c;return this._w=a*d+this._w*u,this._x=n*d+this._x*u,this._y=s*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(t=0,e=0,n=0){U.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Lo.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Lo.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),d=2*(r*n-a*e);return this.x=e+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Sr.copy(this).projectOnVector(t),this.sub(Sr)}reflect(t){return this.sub(Sr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Te(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Sr=new U,Lo=new os;class ls{constructor(t=new U(1/0,1/0,1/0),e=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Ve.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Ve.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Ve.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Ve):Ve.fromBufferAttribute(r,a),Ve.applyMatrix4(t.matrixWorld),this.expandByPoint(Ve);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ms.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ms.copy(n.boundingBox)),ms.applyMatrix4(t.matrixWorld),this.union(ms)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ve),Ve.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Gi),gs.subVectors(this.max,Gi),ui.subVectors(t.a,Gi),di.subVectors(t.b,Gi),fi.subVectors(t.c,Gi),vn.subVectors(di,ui),xn.subVectors(fi,di),Hn.subVectors(ui,fi);let e=[0,-vn.z,vn.y,0,-xn.z,xn.y,0,-Hn.z,Hn.y,vn.z,0,-vn.x,xn.z,0,-xn.x,Hn.z,0,-Hn.x,-vn.y,vn.x,0,-xn.y,xn.x,0,-Hn.y,Hn.x,0];return!Er(e,ui,di,fi,gs)||(e=[1,0,0,0,1,0,0,0,1],!Er(e,ui,di,fi,gs))?!1:(_s.crossVectors(vn,xn),e=[_s.x,_s.y,_s.z],Er(e,ui,di,fi,gs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ve).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ve).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(rn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),rn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),rn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),rn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),rn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),rn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),rn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),rn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(rn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const rn=[new U,new U,new U,new U,new U,new U,new U,new U],Ve=new U,ms=new ls,ui=new U,di=new U,fi=new U,vn=new U,xn=new U,Hn=new U,Gi=new U,gs=new U,_s=new U,Gn=new U;function Er(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Gn.fromArray(i,r);const o=s.x*Math.abs(Gn.x)+s.y*Math.abs(Gn.y)+s.z*Math.abs(Gn.z),l=t.dot(Gn),c=e.dot(Gn),h=n.dot(Gn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Yh=new ls,Vi=new U,br=new U;class cs{constructor(t=new U,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Yh.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Vi.subVectors(t,this.center);const e=Vi.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Vi,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(br.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Vi.copy(t.center).add(br)),this.expandByPoint(Vi.copy(t.center).sub(br))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const an=new U,Tr=new U,vs=new U,Mn=new U,Ar=new U,xs=new U,wr=new U;class hr{constructor(t=new U,e=new U(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,an)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=an.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(an.copy(this.origin).addScaledVector(this.direction,e),an.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Tr.copy(t).add(e).multiplyScalar(.5),vs.copy(e).sub(t).normalize(),Mn.copy(this.origin).sub(Tr);const r=t.distanceTo(e)*.5,a=-this.direction.dot(vs),o=Mn.dot(this.direction),l=-Mn.dot(vs),c=Mn.lengthSq(),h=Math.abs(1-a*a);let d,u,m,g;if(h>0)if(d=a*l-o,u=a*o-l,g=r*h,d>=0)if(u>=-g)if(u<=g){const v=1/h;d*=v,u*=v,m=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),m=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),m=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),m=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),m=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),m=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),m=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Tr).addScaledVector(vs,u),m}intersectSphere(t,e){an.subVectors(t.center,this.origin);const n=an.dot(this.direction),s=an.dot(an)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,an)!==null}intersectTriangle(t,e,n,s,r){Ar.subVectors(e,t),xs.subVectors(n,t),wr.crossVectors(Ar,xs);let a=this.direction.dot(wr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Mn.subVectors(this.origin,t);const l=o*this.direction.dot(xs.crossVectors(Mn,xs));if(l<0)return null;const c=o*this.direction.dot(Ar.cross(Mn));if(c<0||l+c>a)return null;const h=-o*Mn.dot(wr);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ne{constructor(t,e,n,s,r,a,o,l,c,h,d,u,m,g,v,f){ne.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,d,u,m,g,v,f)}set(t,e,n,s,r,a,o,l,c,h,d,u,m,g,v,f){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=m,p[7]=g,p[11]=v,p[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ne().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/pi.setFromMatrixColumn(t,0).length(),r=1/pi.setFromMatrixColumn(t,1).length(),a=1/pi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const u=a*h,m=a*d,g=o*h,v=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=m+g*c,e[5]=u-v*c,e[9]=-o*l,e[2]=v-u*c,e[6]=g+m*c,e[10]=a*l}else if(t.order==="YXZ"){const u=l*h,m=l*d,g=c*h,v=c*d;e[0]=u+v*o,e[4]=g*o-m,e[8]=a*c,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=m*o-g,e[6]=v+u*o,e[10]=a*l}else if(t.order==="ZXY"){const u=l*h,m=l*d,g=c*h,v=c*d;e[0]=u-v*o,e[4]=-a*d,e[8]=g+m*o,e[1]=m+g*o,e[5]=a*h,e[9]=v-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const u=a*h,m=a*d,g=o*h,v=o*d;e[0]=l*h,e[4]=g*c-m,e[8]=u*c+v,e[1]=l*d,e[5]=v*c+u,e[9]=m*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const u=a*l,m=a*c,g=o*l,v=o*c;e[0]=l*h,e[4]=v-u*d,e[8]=g*d+m,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=m*d+g,e[10]=u-v*d}else if(t.order==="XZY"){const u=a*l,m=a*c,g=o*l,v=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+v,e[5]=a*h,e[9]=m*d-g,e[2]=g*d-m,e[6]=o*h,e[10]=v*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose($h,t,Kh)}lookAt(t,e,n){const s=this.elements;return Ie.subVectors(t,e),Ie.lengthSq()===0&&(Ie.z=1),Ie.normalize(),yn.crossVectors(n,Ie),yn.lengthSq()===0&&(Math.abs(n.z)===1?Ie.x+=1e-4:Ie.z+=1e-4,Ie.normalize(),yn.crossVectors(n,Ie)),yn.normalize(),Ms.crossVectors(Ie,yn),s[0]=yn.x,s[4]=Ms.x,s[8]=Ie.x,s[1]=yn.y,s[5]=Ms.y,s[9]=Ie.y,s[2]=yn.z,s[6]=Ms.z,s[10]=Ie.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],m=n[13],g=n[2],v=n[6],f=n[10],p=n[14],S=n[3],M=n[7],x=n[11],R=n[15],w=s[0],A=s[4],C=s[8],W=s[12],_=s[1],b=s[5],O=s[9],N=s[13],X=s[2],Y=s[6],H=s[10],K=s[14],G=s[3],lt=s[7],ut=s[11],xt=s[15];return r[0]=a*w+o*_+l*X+c*G,r[4]=a*A+o*b+l*Y+c*lt,r[8]=a*C+o*O+l*H+c*ut,r[12]=a*W+o*N+l*K+c*xt,r[1]=h*w+d*_+u*X+m*G,r[5]=h*A+d*b+u*Y+m*lt,r[9]=h*C+d*O+u*H+m*ut,r[13]=h*W+d*N+u*K+m*xt,r[2]=g*w+v*_+f*X+p*G,r[6]=g*A+v*b+f*Y+p*lt,r[10]=g*C+v*O+f*H+p*ut,r[14]=g*W+v*N+f*K+p*xt,r[3]=S*w+M*_+x*X+R*G,r[7]=S*A+M*b+x*Y+R*lt,r[11]=S*C+M*O+x*H+R*ut,r[15]=S*W+M*N+x*K+R*xt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],m=t[14],g=t[3],v=t[7],f=t[11],p=t[15];return g*(+r*l*d-s*c*d-r*o*u+n*c*u+s*o*m-n*l*m)+v*(+e*l*m-e*c*u+r*a*u-s*a*m+s*c*h-r*l*h)+f*(+e*c*d-e*o*m-r*a*d+n*a*m+r*o*h-n*c*h)+p*(-s*o*h-e*l*d+e*o*u+s*a*d-n*a*u+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],m=t[11],g=t[12],v=t[13],f=t[14],p=t[15],S=d*f*c-v*u*c+v*l*m-o*f*m-d*l*p+o*u*p,M=g*u*c-h*f*c-g*l*m+a*f*m+h*l*p-a*u*p,x=h*v*c-g*d*c+g*o*m-a*v*m-h*o*p+a*d*p,R=g*d*l-h*v*l-g*o*u+a*v*u+h*o*f-a*d*f,w=e*S+n*M+s*x+r*R;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/w;return t[0]=S*A,t[1]=(v*u*r-d*f*r-v*s*m+n*f*m+d*s*p-n*u*p)*A,t[2]=(o*f*r-v*l*r+v*s*c-n*f*c-o*s*p+n*l*p)*A,t[3]=(d*l*r-o*u*r-d*s*c+n*u*c+o*s*m-n*l*m)*A,t[4]=M*A,t[5]=(h*f*r-g*u*r+g*s*m-e*f*m-h*s*p+e*u*p)*A,t[6]=(g*l*r-a*f*r-g*s*c+e*f*c+a*s*p-e*l*p)*A,t[7]=(a*u*r-h*l*r+h*s*c-e*u*c-a*s*m+e*l*m)*A,t[8]=x*A,t[9]=(g*d*r-h*v*r-g*n*m+e*v*m+h*n*p-e*d*p)*A,t[10]=(a*v*r-g*o*r+g*n*c-e*v*c-a*n*p+e*o*p)*A,t[11]=(h*o*r-a*d*r-h*n*c+e*d*c+a*n*m-e*o*m)*A,t[12]=R*A,t[13]=(h*v*s-g*d*s+g*n*u-e*v*u-h*n*f+e*d*f)*A,t[14]=(g*o*s-a*v*s-g*n*l+e*v*l+a*n*f-e*o*f)*A,t[15]=(a*d*s-h*o*s+h*n*l-e*d*l-a*n*u+e*o*u)*A,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,d=o+o,u=r*c,m=r*h,g=r*d,v=a*h,f=a*d,p=o*d,S=l*c,M=l*h,x=l*d,R=n.x,w=n.y,A=n.z;return s[0]=(1-(v+p))*R,s[1]=(m+x)*R,s[2]=(g-M)*R,s[3]=0,s[4]=(m-x)*w,s[5]=(1-(u+p))*w,s[6]=(f+S)*w,s[7]=0,s[8]=(g+M)*A,s[9]=(f-S)*A,s[10]=(1-(u+v))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=pi.set(s[0],s[1],s[2]).length();const a=pi.set(s[4],s[5],s[6]).length(),o=pi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],We.copy(this);const c=1/r,h=1/a,d=1/o;return We.elements[0]*=c,We.elements[1]*=c,We.elements[2]*=c,We.elements[4]*=h,We.elements[5]*=h,We.elements[6]*=h,We.elements[8]*=d,We.elements[9]*=d,We.elements[10]*=d,e.setFromRotationMatrix(We),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=pn){const l=this.elements,c=2*r/(e-t),h=2*r/(n-s),d=(e+t)/(e-t),u=(n+s)/(n-s);let m,g;if(o===pn)m=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===nr)m=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=pn){const l=this.elements,c=1/(e-t),h=1/(n-s),d=1/(a-r),u=(e+t)*c,m=(n+s)*h;let g,v;if(o===pn)g=(a+r)*d,v=-2*d;else if(o===nr)g=r*d,v=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const pi=new U,We=new ne,$h=new U(0,0,0),Kh=new U(1,1,1),yn=new U,Ms=new U,Ie=new U,Do=new ne,Io=new os;class nn{constructor(t=0,e=0,n=0,s=nn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(Te(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Te(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Te(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Te(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Te(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Te(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Do.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Do,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Io.setFromEuler(this),this.setFromQuaternion(Io,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}nn.DEFAULT_ORDER="XYZ";class eo{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let jh=0;const Uo=new U,mi=new os,on=new ne,ys=new U,Wi=new U,Zh=new U,Jh=new os,No=new U(1,0,0),Fo=new U(0,1,0),Oo=new U(0,0,1),Bo={type:"added"},Qh={type:"removed"},gi={type:"childadded",child:null},Rr={type:"childremoved",child:null};class he extends Oi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:jh++}),this.uuid=Bi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=he.DEFAULT_UP.clone();const t=new U,e=new nn,n=new os,s=new U(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ne},normalMatrix:{value:new Ft}}),this.matrix=new ne,this.matrixWorld=new ne,this.matrixAutoUpdate=he.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=he.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new eo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return mi.setFromAxisAngle(t,e),this.quaternion.multiply(mi),this}rotateOnWorldAxis(t,e){return mi.setFromAxisAngle(t,e),this.quaternion.premultiply(mi),this}rotateX(t){return this.rotateOnAxis(No,t)}rotateY(t){return this.rotateOnAxis(Fo,t)}rotateZ(t){return this.rotateOnAxis(Oo,t)}translateOnAxis(t,e){return Uo.copy(t).applyQuaternion(this.quaternion),this.position.add(Uo.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(No,t)}translateY(t){return this.translateOnAxis(Fo,t)}translateZ(t){return this.translateOnAxis(Oo,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(on.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ys.copy(t):ys.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Wi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?on.lookAt(Wi,ys,this.up):on.lookAt(ys,Wi,this.up),this.quaternion.setFromRotationMatrix(on),s&&(on.extractRotation(s.matrixWorld),mi.setFromRotationMatrix(on),this.quaternion.premultiply(mi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Bo),gi.child=t,this.dispatchEvent(gi),gi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Qh),Rr.child=t,this.dispatchEvent(Rr),Rr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),on.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),on.multiply(t.parent.matrixWorld)),t.applyMatrix4(on),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Bo),gi.child=t,this.dispatchEvent(gi),gi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wi,t,Zh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wi,Jh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),m=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}he.DEFAULT_UP=new U(0,1,0);he.DEFAULT_MATRIX_AUTO_UPDATE=!0;he.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Xe=new U,ln=new U,Cr=new U,cn=new U,_i=new U,vi=new U,ko=new U,Pr=new U,Lr=new U,Dr=new U,Ir=new re,Ur=new re,Nr=new re;class Ze{constructor(t=new U,e=new U,n=new U){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Xe.subVectors(t,e),s.cross(Xe);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Xe.subVectors(s,e),ln.subVectors(n,e),Cr.subVectors(t,e);const a=Xe.dot(Xe),o=Xe.dot(ln),l=Xe.dot(Cr),c=ln.dot(ln),h=ln.dot(Cr),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;const u=1/d,m=(c*l-o*h)*u,g=(a*h-o*l)*u;return r.set(1-m-g,g,m)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,cn)===null?!1:cn.x>=0&&cn.y>=0&&cn.x+cn.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,cn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,cn.x),l.addScaledVector(a,cn.y),l.addScaledVector(o,cn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return Ir.setScalar(0),Ur.setScalar(0),Nr.setScalar(0),Ir.fromBufferAttribute(t,e),Ur.fromBufferAttribute(t,n),Nr.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Ir,r.x),a.addScaledVector(Ur,r.y),a.addScaledVector(Nr,r.z),a}static isFrontFacing(t,e,n,s){return Xe.subVectors(n,e),ln.subVectors(t,e),Xe.cross(ln).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Xe.subVectors(this.c,this.b),ln.subVectors(this.a,this.b),Xe.cross(ln).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ze.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Ze.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Ze.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Ze.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ze.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;_i.subVectors(s,n),vi.subVectors(r,n),Pr.subVectors(t,n);const l=_i.dot(Pr),c=vi.dot(Pr);if(l<=0&&c<=0)return e.copy(n);Lr.subVectors(t,s);const h=_i.dot(Lr),d=vi.dot(Lr);if(h>=0&&d<=h)return e.copy(s);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(_i,a);Dr.subVectors(t,r);const m=_i.dot(Dr),g=vi.dot(Dr);if(g>=0&&m<=g)return e.copy(r);const v=m*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(vi,o);const f=h*g-m*d;if(f<=0&&d-h>=0&&m-g>=0)return ko.subVectors(r,s),o=(d-h)/(d-h+(m-g)),e.copy(s).addScaledVector(ko,o);const p=1/(f+v+u);return a=v*p,o=u*p,e.copy(n).addScaledVector(_i,a).addScaledVector(vi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Jl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Sn={h:0,s:0,l:0},Ss={h:0,s:0,l:0};function Fr(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class It{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ce){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Zt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=Zt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Zt.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=Zt.workingColorSpace){if(t=to(t,1),e=Te(e,0,1),n=Te(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Fr(a,r,t+1/3),this.g=Fr(a,r,t),this.b=Fr(a,r,t-1/3)}return Zt.toWorkingColorSpace(this,s),this}setStyle(t,e=Ce){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ce){const n=Jl[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=wi(t.r),this.g=wi(t.g),this.b=wi(t.b),this}copyLinearToSRGB(t){return this.r=Mr(t.r),this.g=Mr(t.g),this.b=Mr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ce){return Zt.fromWorkingColorSpace(ve.copy(this),t),Math.round(Te(ve.r*255,0,255))*65536+Math.round(Te(ve.g*255,0,255))*256+Math.round(Te(ve.b*255,0,255))}getHexString(t=Ce){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Zt.workingColorSpace){Zt.fromWorkingColorSpace(ve.copy(this),e);const n=ve.r,s=ve.g,r=ve.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Zt.workingColorSpace){return Zt.fromWorkingColorSpace(ve.copy(this),e),t.r=ve.r,t.g=ve.g,t.b=ve.b,t}getStyle(t=Ce){Zt.fromWorkingColorSpace(ve.copy(this),t);const e=ve.r,n=ve.g,s=ve.b;return t!==Ce?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Sn),this.setHSL(Sn.h+t,Sn.s+e,Sn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Sn),t.getHSL(Ss);const n=ts(Sn.h,Ss.h,e),s=ts(Sn.s,Ss.s,e),r=ts(Sn.l,Ss.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ve=new It;It.NAMES=Jl;let tu=0;class oi extends Oi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:tu++}),this.uuid=Bi(),this.name="",this.type="Material",this.blending=ni,this.side=Nn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ea,this.blendDst=na,this.blendEquation=Kn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new It(0,0,0),this.blendAlpha=0,this.depthFunc=Ci,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=bo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ci,this.stencilZFail=ci,this.stencilZPass=ci,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ni&&(n.blending=this.blending),this.side!==Nn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ea&&(n.blendSrc=this.blendSrc),this.blendDst!==na&&(n.blendDst=this.blendDst),this.blendEquation!==Kn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ci&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==bo&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ci&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ci&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ci&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Dn extends oi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new It(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new nn,this.combine=Ul,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const le=new U,Es=new kt;class Fe{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=To,this.updateRanges=[],this.gpuType=fn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Es.fromBufferAttribute(this,e),Es.applyMatrix3(t),this.setXY(e,Es.x,Es.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)le.fromBufferAttribute(this,e),le.applyMatrix3(t),this.setXYZ(e,le.x,le.y,le.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)le.fromBufferAttribute(this,e),le.applyMatrix4(t),this.setXYZ(e,le.x,le.y,le.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)le.fromBufferAttribute(this,e),le.applyNormalMatrix(t),this.setXYZ(e,le.x,le.y,le.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)le.fromBufferAttribute(this,e),le.transformDirection(t),this.setXYZ(e,le.x,le.y,le.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=bi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Se(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=bi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Se(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=bi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Se(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=bi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Se(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=bi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Se(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Se(e,this.array),n=Se(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Se(e,this.array),n=Se(n,this.array),s=Se(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Se(e,this.array),n=Se(n,this.array),s=Se(s,this.array),r=Se(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==To&&(t.usage=this.usage),t}}class Ql extends Fe{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class tc extends Fe{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ie extends Fe{constructor(t,e,n){super(new Float32Array(t),e,n)}}let eu=0;const Be=new ne,Or=new he,xi=new U,Ue=new ls,Xi=new ls,fe=new U;class Me extends Oi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:eu++}),this.uuid=Bi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Kl(t)?tc:Ql)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ft().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Be.makeRotationFromQuaternion(t),this.applyMatrix4(Be),this}rotateX(t){return Be.makeRotationX(t),this.applyMatrix4(Be),this}rotateY(t){return Be.makeRotationY(t),this.applyMatrix4(Be),this}rotateZ(t){return Be.makeRotationZ(t),this.applyMatrix4(Be),this}translate(t,e,n){return Be.makeTranslation(t,e,n),this.applyMatrix4(Be),this}scale(t,e,n){return Be.makeScale(t,e,n),this.applyMatrix4(Be),this}lookAt(t){return Or.lookAt(t),Or.updateMatrix(),this.applyMatrix4(Or.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(xi).negate(),this.translate(xi.x,xi.y,xi.z),this}setFromPoints(t){const e=[];for(let n=0,s=t.length;n<s;n++){const r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new ie(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ls);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Ue.setFromBufferAttribute(r),this.morphTargetsRelative?(fe.addVectors(this.boundingBox.min,Ue.min),this.boundingBox.expandByPoint(fe),fe.addVectors(this.boundingBox.max,Ue.max),this.boundingBox.expandByPoint(fe)):(this.boundingBox.expandByPoint(Ue.min),this.boundingBox.expandByPoint(Ue.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new cs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(t){const n=this.boundingSphere.center;if(Ue.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Xi.setFromBufferAttribute(o),this.morphTargetsRelative?(fe.addVectors(Ue.min,Xi.min),Ue.expandByPoint(fe),fe.addVectors(Ue.max,Xi.max),Ue.expandByPoint(fe)):(Ue.expandByPoint(Xi.min),Ue.expandByPoint(Xi.max))}Ue.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)fe.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(fe));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)fe.fromBufferAttribute(o,c),l&&(xi.fromBufferAttribute(t,c),fe.add(xi)),s=Math.max(s,n.distanceToSquared(fe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Fe(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let C=0;C<n.count;C++)o[C]=new U,l[C]=new U;const c=new U,h=new U,d=new U,u=new kt,m=new kt,g=new kt,v=new U,f=new U;function p(C,W,_){c.fromBufferAttribute(n,C),h.fromBufferAttribute(n,W),d.fromBufferAttribute(n,_),u.fromBufferAttribute(r,C),m.fromBufferAttribute(r,W),g.fromBufferAttribute(r,_),h.sub(c),d.sub(c),m.sub(u),g.sub(u);const b=1/(m.x*g.y-g.x*m.y);isFinite(b)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(d,-m.y).multiplyScalar(b),f.copy(d).multiplyScalar(m.x).addScaledVector(h,-g.x).multiplyScalar(b),o[C].add(v),o[W].add(v),o[_].add(v),l[C].add(f),l[W].add(f),l[_].add(f))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let C=0,W=S.length;C<W;++C){const _=S[C],b=_.start,O=_.count;for(let N=b,X=b+O;N<X;N+=3)p(t.getX(N+0),t.getX(N+1),t.getX(N+2))}const M=new U,x=new U,R=new U,w=new U;function A(C){R.fromBufferAttribute(s,C),w.copy(R);const W=o[C];M.copy(W),M.sub(R.multiplyScalar(R.dot(W))).normalize(),x.crossVectors(w,W);const b=x.dot(l[C])<0?-1:1;a.setXYZW(C,M.x,M.y,M.z,b)}for(let C=0,W=S.length;C<W;++C){const _=S[C],b=_.start,O=_.count;for(let N=b,X=b+O;N<X;N+=3)A(t.getX(N+0)),A(t.getX(N+1)),A(t.getX(N+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Fe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,m=n.count;u<m;u++)n.setXYZ(u,0,0,0);const s=new U,r=new U,a=new U,o=new U,l=new U,c=new U,h=new U,d=new U;if(t)for(let u=0,m=t.count;u<m;u+=3){const g=t.getX(u+0),v=t.getX(u+1),f=t.getX(u+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,f),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,f),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(f,c.x,c.y,c.z)}else for(let u=0,m=e.count;u<m;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)fe.fromBufferAttribute(t,e),fe.normalize(),t.setXYZ(e,fe.x,fe.y,fe.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h);let m=0,g=0;for(let v=0,f=l.length;v<f;v++){o.isInterleavedBufferAttribute?m=l[v]*o.data.stride+o.offset:m=l[v]*h;for(let p=0;p<h;p++)u[g++]=c[m++]}return new Fe(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Me,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){const u=c[h],m=t(u,n);l.push(m)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const m=c[d];h.push(m.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],d=r[c];for(let u=0,m=d.length;u<m;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const zo=new ne,Vn=new hr,bs=new cs,Ho=new U,Ts=new U,As=new U,ws=new U,Br=new U,Rs=new U,Go=new U,Cs=new U;class Vt extends he{constructor(t=new Me,e=new Dn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){Rs.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],d=r[l];h!==0&&(Br.fromBufferAttribute(d,t),a?Rs.addScaledVector(Br,h):Rs.addScaledVector(Br.sub(e),h))}e.add(Rs)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),bs.copy(n.boundingSphere),bs.applyMatrix4(r),Vn.copy(t.ray).recast(t.near),!(bs.containsPoint(Vn.origin)===!1&&(Vn.intersectSphere(bs,Ho)===null||Vn.origin.distanceToSquared(Ho)>(t.far-t.near)**2))&&(zo.copy(r).invert(),Vn.copy(t.ray).applyMatrix4(zo),!(n.boundingBox!==null&&Vn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Vn)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=u.length;g<v;g++){const f=u[g],p=a[f.materialIndex],S=Math.max(f.start,m.start),M=Math.min(o.count,Math.min(f.start+f.count,m.start+m.count));for(let x=S,R=M;x<R;x+=3){const w=o.getX(x),A=o.getX(x+1),C=o.getX(x+2);s=Ps(this,p,t,n,c,h,d,w,A,C),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=f.materialIndex,e.push(s))}}else{const g=Math.max(0,m.start),v=Math.min(o.count,m.start+m.count);for(let f=g,p=v;f<p;f+=3){const S=o.getX(f),M=o.getX(f+1),x=o.getX(f+2);s=Ps(this,a,t,n,c,h,d,S,M,x),s&&(s.faceIndex=Math.floor(f/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=u.length;g<v;g++){const f=u[g],p=a[f.materialIndex],S=Math.max(f.start,m.start),M=Math.min(l.count,Math.min(f.start+f.count,m.start+m.count));for(let x=S,R=M;x<R;x+=3){const w=x,A=x+1,C=x+2;s=Ps(this,p,t,n,c,h,d,w,A,C),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=f.materialIndex,e.push(s))}}else{const g=Math.max(0,m.start),v=Math.min(l.count,m.start+m.count);for(let f=g,p=v;f<p;f+=3){const S=f,M=f+1,x=f+2;s=Ps(this,a,t,n,c,h,d,S,M,x),s&&(s.faceIndex=Math.floor(f/3),e.push(s))}}}}function nu(i,t,e,n,s,r,a,o){let l;if(t.side===Pe?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===Nn,o),l===null)return null;Cs.copy(o),Cs.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Cs);return c<e.near||c>e.far?null:{distance:c,point:Cs.clone(),object:i}}function Ps(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,Ts),i.getVertexPosition(l,As),i.getVertexPosition(c,ws);const h=nu(i,t,e,n,Ts,As,ws,Go);if(h){const d=new U;Ze.getBarycoord(Go,Ts,As,ws,d),s&&(h.uv=Ze.getInterpolatedAttribute(s,o,l,c,d,new kt)),r&&(h.uv1=Ze.getInterpolatedAttribute(r,o,l,c,d,new kt)),a&&(h.normal=Ze.getInterpolatedAttribute(a,o,l,c,d,new U),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new U,materialIndex:0};Ze.getNormal(Ts,As,ws,u.normal),h.face=u,h.barycoord=d}return h}class Fn extends Me{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],d=[];let u=0,m=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new ie(c,3)),this.setAttribute("normal",new ie(h,3)),this.setAttribute("uv",new ie(d,2));function g(v,f,p,S,M,x,R,w,A,C,W){const _=x/A,b=R/C,O=x/2,N=R/2,X=w/2,Y=A+1,H=C+1;let K=0,G=0;const lt=new U;for(let ut=0;ut<H;ut++){const xt=ut*b-N;for(let zt=0;zt<Y;zt++){const Xt=zt*_-O;lt[v]=Xt*S,lt[f]=xt*M,lt[p]=X,c.push(lt.x,lt.y,lt.z),lt[v]=0,lt[f]=0,lt[p]=w>0?1:-1,h.push(lt.x,lt.y,lt.z),d.push(zt/A),d.push(1-ut/C),K+=1}}for(let ut=0;ut<C;ut++)for(let xt=0;xt<A;xt++){const zt=u+xt+Y*ut,Xt=u+xt+Y*(ut+1),q=u+(xt+1)+Y*(ut+1),tt=u+(xt+1)+Y*ut;l.push(zt,Xt,tt),l.push(Xt,q,tt),G+=6}o.addGroup(m,G,W),m+=G,u+=K}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ui(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ee(i){const t={};for(let e=0;e<i.length;e++){const n=Ui(i[e]);for(const s in n)t[s]=n[s]}return t}function iu(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function ec(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Zt.workingColorSpace}const su={clone:Ui,merge:Ee};var ru=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,au=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class On extends oi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ru,this.fragmentShader=au,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ui(t.uniforms),this.uniformsGroups=iu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class nc extends he{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ne,this.projectionMatrix=new ne,this.projectionMatrixInverse=new ne,this.coordinateSystem=pn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const En=new U,Vo=new kt,Wo=new kt;class Ke extends nc{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ss*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Qi*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ss*2*Math.atan(Math.tan(Qi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){En.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(En.x,En.y).multiplyScalar(-t/En.z),En.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(En.x,En.y).multiplyScalar(-t/En.z)}getViewSize(t,e){return this.getViewBounds(t,Vo,Wo),e.subVectors(Wo,Vo)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Qi*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Mi=-90,yi=1;class ou extends he{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ke(Mi,yi,t,e);s.layers=this.layers,this.add(s);const r=new Ke(Mi,yi,t,e);r.layers=this.layers,this.add(r);const a=new Ke(Mi,yi,t,e);a.layers=this.layers,this.add(a);const o=new Ke(Mi,yi,t,e);o.layers=this.layers,this.add(o);const l=new Ke(Mi,yi,t,e);l.layers=this.layers,this.add(l);const c=new Ke(Mi,yi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===pn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===nr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(d,u,m),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class ic extends Ae{constructor(t,e,n,s,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Pi,super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class lu extends ai{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new ic(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:je}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Fn(5,5,5),r=new On({name:"CubemapFromEquirect",uniforms:Ui(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Pe,blending:Pn});r.uniforms.tEquirect.value=e;const a=new Vt(s,r),o=e.minFilter;return e.minFilter===ti&&(e.minFilter=je),new ou(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}const kr=new U,cu=new U,hu=new Ft;class An{constructor(t=new U(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=kr.subVectors(n,e).cross(cu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(kr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||hu.getNormalMatrix(t),s=this.coplanarPoint(kr).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Wn=new cs,Ls=new U;class no{constructor(t=new An,e=new An,n=new An,s=new An,r=new An,a=new An){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=pn){const n=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],d=s[6],u=s[7],m=s[8],g=s[9],v=s[10],f=s[11],p=s[12],S=s[13],M=s[14],x=s[15];if(n[0].setComponents(l-r,u-c,f-m,x-p).normalize(),n[1].setComponents(l+r,u+c,f+m,x+p).normalize(),n[2].setComponents(l+a,u+h,f+g,x+S).normalize(),n[3].setComponents(l-a,u-h,f-g,x-S).normalize(),n[4].setComponents(l-o,u-d,f-v,x-M).normalize(),e===pn)n[5].setComponents(l+o,u+d,f+v,x+M).normalize();else if(e===nr)n[5].setComponents(o,d,v,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Wn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Wn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Wn)}intersectsSprite(t){return Wn.center.set(0,0,0),Wn.radius=.7071067811865476,Wn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Wn)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Ls.x=s.normal.x>0?t.max.x:t.min.x,Ls.y=s.normal.y>0?t.max.y:t.min.y,Ls.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Ls)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function sc(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function uu(i){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),o.onUploadCallback();let m;if(c instanceof Float32Array)m=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=i.SHORT;else if(c instanceof Uint32Array)m=i.UNSIGNED_INT;else if(c instanceof Int32Array)m=i.INT;else if(c instanceof Int8Array)m=i.BYTE;else if(c instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const h=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,h);else{d.sort((m,g)=>m.start-g.start);let u=0;for(let m=1;m<d.length;m++){const g=d[u],v=d[m];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++u,d[u]=v)}d.length=u+1;for(let m=0,g=d.length;m<g;m++){const v=d[m];i.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}class Bn extends Me{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,d=t/o,u=e/l,m=[],g=[],v=[],f=[];for(let p=0;p<h;p++){const S=p*u-a;for(let M=0;M<c;M++){const x=M*d-r;g.push(x,-S,0),v.push(0,0,1),f.push(M/o),f.push(1-p/l)}}for(let p=0;p<l;p++)for(let S=0;S<o;S++){const M=S+c*p,x=S+c*(p+1),R=S+1+c*(p+1),w=S+1+c*p;m.push(M,x,w),m.push(x,R,w)}this.setIndex(m),this.setAttribute("position",new ie(g,3)),this.setAttribute("normal",new ie(v,3)),this.setAttribute("uv",new ie(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Bn(t.width,t.height,t.widthSegments,t.heightSegments)}}var du=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,fu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,pu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,mu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,gu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,_u=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,vu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,xu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Mu=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,yu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Su=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Eu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Tu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Au=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,wu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Ru=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Cu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Pu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Lu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Du=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Iu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Uu=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Nu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Fu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Ou=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Bu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ku=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,zu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Hu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Gu="gl_FragColor = linearToOutputTexel( gl_FragColor );",Vu=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Wu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Xu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,qu=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Yu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,$u=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Ku=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ju=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Zu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ju=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Qu=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,td=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ed=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,nd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,id=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,sd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,rd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ad=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,od=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ld=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,cd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,hd=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,ud=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,dd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,fd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,pd=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,md=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gd=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_d=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,vd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,xd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Md=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,yd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Sd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ed=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,bd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Td=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ad=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wd=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Rd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Cd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Pd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Ld=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Dd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Id=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ud=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Nd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Fd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Od=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Bd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,kd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,zd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Hd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Gd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Vd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Wd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Xd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,qd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Yd=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,$d=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Kd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,jd=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Zd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Jd=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Qd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,tf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,ef=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,nf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,sf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,rf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,af=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,of=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,lf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,cf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,hf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,uf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const df=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ff=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_f=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,xf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Mf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,yf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Sf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ef=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Tf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Af=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,wf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Cf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Lf=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Df=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,If=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Uf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Nf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ff=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Of=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bf=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kf=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zf=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Hf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Gf=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Vf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Wf=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Xf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Nt={alphahash_fragment:du,alphahash_pars_fragment:fu,alphamap_fragment:pu,alphamap_pars_fragment:mu,alphatest_fragment:gu,alphatest_pars_fragment:_u,aomap_fragment:vu,aomap_pars_fragment:xu,batching_pars_vertex:Mu,batching_vertex:yu,begin_vertex:Su,beginnormal_vertex:Eu,bsdfs:bu,iridescence_fragment:Tu,bumpmap_pars_fragment:Au,clipping_planes_fragment:wu,clipping_planes_pars_fragment:Ru,clipping_planes_pars_vertex:Cu,clipping_planes_vertex:Pu,color_fragment:Lu,color_pars_fragment:Du,color_pars_vertex:Iu,color_vertex:Uu,common:Nu,cube_uv_reflection_fragment:Fu,defaultnormal_vertex:Ou,displacementmap_pars_vertex:Bu,displacementmap_vertex:ku,emissivemap_fragment:zu,emissivemap_pars_fragment:Hu,colorspace_fragment:Gu,colorspace_pars_fragment:Vu,envmap_fragment:Wu,envmap_common_pars_fragment:Xu,envmap_pars_fragment:qu,envmap_pars_vertex:Yu,envmap_physical_pars_fragment:sd,envmap_vertex:$u,fog_vertex:Ku,fog_pars_vertex:ju,fog_fragment:Zu,fog_pars_fragment:Ju,gradientmap_pars_fragment:Qu,lightmap_pars_fragment:td,lights_lambert_fragment:ed,lights_lambert_pars_fragment:nd,lights_pars_begin:id,lights_toon_fragment:rd,lights_toon_pars_fragment:ad,lights_phong_fragment:od,lights_phong_pars_fragment:ld,lights_physical_fragment:cd,lights_physical_pars_fragment:hd,lights_fragment_begin:ud,lights_fragment_maps:dd,lights_fragment_end:fd,logdepthbuf_fragment:pd,logdepthbuf_pars_fragment:md,logdepthbuf_pars_vertex:gd,logdepthbuf_vertex:_d,map_fragment:vd,map_pars_fragment:xd,map_particle_fragment:Md,map_particle_pars_fragment:yd,metalnessmap_fragment:Sd,metalnessmap_pars_fragment:Ed,morphinstance_vertex:bd,morphcolor_vertex:Td,morphnormal_vertex:Ad,morphtarget_pars_vertex:wd,morphtarget_vertex:Rd,normal_fragment_begin:Cd,normal_fragment_maps:Pd,normal_pars_fragment:Ld,normal_pars_vertex:Dd,normal_vertex:Id,normalmap_pars_fragment:Ud,clearcoat_normal_fragment_begin:Nd,clearcoat_normal_fragment_maps:Fd,clearcoat_pars_fragment:Od,iridescence_pars_fragment:Bd,opaque_fragment:kd,packing:zd,premultiplied_alpha_fragment:Hd,project_vertex:Gd,dithering_fragment:Vd,dithering_pars_fragment:Wd,roughnessmap_fragment:Xd,roughnessmap_pars_fragment:qd,shadowmap_pars_fragment:Yd,shadowmap_pars_vertex:$d,shadowmap_vertex:Kd,shadowmask_pars_fragment:jd,skinbase_vertex:Zd,skinning_pars_vertex:Jd,skinning_vertex:Qd,skinnormal_vertex:tf,specularmap_fragment:ef,specularmap_pars_fragment:nf,tonemapping_fragment:sf,tonemapping_pars_fragment:rf,transmission_fragment:af,transmission_pars_fragment:of,uv_pars_fragment:lf,uv_pars_vertex:cf,uv_vertex:hf,worldpos_vertex:uf,background_vert:df,background_frag:ff,backgroundCube_vert:pf,backgroundCube_frag:mf,cube_vert:gf,cube_frag:_f,depth_vert:vf,depth_frag:xf,distanceRGBA_vert:Mf,distanceRGBA_frag:yf,equirect_vert:Sf,equirect_frag:Ef,linedashed_vert:bf,linedashed_frag:Tf,meshbasic_vert:Af,meshbasic_frag:wf,meshlambert_vert:Rf,meshlambert_frag:Cf,meshmatcap_vert:Pf,meshmatcap_frag:Lf,meshnormal_vert:Df,meshnormal_frag:If,meshphong_vert:Uf,meshphong_frag:Nf,meshphysical_vert:Ff,meshphysical_frag:Of,meshtoon_vert:Bf,meshtoon_frag:kf,points_vert:zf,points_frag:Hf,shadow_vert:Gf,shadow_frag:Vf,sprite_vert:Wf,sprite_frag:Xf},at={common:{diffuse:{value:new It(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ft},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ft}},envmap:{envMap:{value:null},envMapRotation:{value:new Ft},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ft}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ft}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ft},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ft},normalScale:{value:new kt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ft},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ft}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ft}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ft}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new It(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new It(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0},uvTransform:{value:new Ft}},sprite:{diffuse:{value:new It(16777215)},opacity:{value:1},center:{value:new kt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ft},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0}}},Qe={basic:{uniforms:Ee([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.fog]),vertexShader:Nt.meshbasic_vert,fragmentShader:Nt.meshbasic_frag},lambert:{uniforms:Ee([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new It(0)}}]),vertexShader:Nt.meshlambert_vert,fragmentShader:Nt.meshlambert_frag},phong:{uniforms:Ee([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new It(0)},specular:{value:new It(1118481)},shininess:{value:30}}]),vertexShader:Nt.meshphong_vert,fragmentShader:Nt.meshphong_frag},standard:{uniforms:Ee([at.common,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.roughnessmap,at.metalnessmap,at.fog,at.lights,{emissive:{value:new It(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Nt.meshphysical_vert,fragmentShader:Nt.meshphysical_frag},toon:{uniforms:Ee([at.common,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.gradientmap,at.fog,at.lights,{emissive:{value:new It(0)}}]),vertexShader:Nt.meshtoon_vert,fragmentShader:Nt.meshtoon_frag},matcap:{uniforms:Ee([at.common,at.bumpmap,at.normalmap,at.displacementmap,at.fog,{matcap:{value:null}}]),vertexShader:Nt.meshmatcap_vert,fragmentShader:Nt.meshmatcap_frag},points:{uniforms:Ee([at.points,at.fog]),vertexShader:Nt.points_vert,fragmentShader:Nt.points_frag},dashed:{uniforms:Ee([at.common,at.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Nt.linedashed_vert,fragmentShader:Nt.linedashed_frag},depth:{uniforms:Ee([at.common,at.displacementmap]),vertexShader:Nt.depth_vert,fragmentShader:Nt.depth_frag},normal:{uniforms:Ee([at.common,at.bumpmap,at.normalmap,at.displacementmap,{opacity:{value:1}}]),vertexShader:Nt.meshnormal_vert,fragmentShader:Nt.meshnormal_frag},sprite:{uniforms:Ee([at.sprite,at.fog]),vertexShader:Nt.sprite_vert,fragmentShader:Nt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ft},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Nt.background_vert,fragmentShader:Nt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ft}},vertexShader:Nt.backgroundCube_vert,fragmentShader:Nt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Nt.cube_vert,fragmentShader:Nt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Nt.equirect_vert,fragmentShader:Nt.equirect_frag},distanceRGBA:{uniforms:Ee([at.common,at.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Nt.distanceRGBA_vert,fragmentShader:Nt.distanceRGBA_frag},shadow:{uniforms:Ee([at.lights,at.fog,{color:{value:new It(0)},opacity:{value:1}}]),vertexShader:Nt.shadow_vert,fragmentShader:Nt.shadow_frag}};Qe.physical={uniforms:Ee([Qe.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ft},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ft},clearcoatNormalScale:{value:new kt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ft},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ft},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ft},sheen:{value:0},sheenColor:{value:new It(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ft},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ft},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ft},transmissionSamplerSize:{value:new kt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ft},attenuationDistance:{value:0},attenuationColor:{value:new It(0)},specularColor:{value:new It(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ft},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ft},anisotropyVector:{value:new kt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ft}}]),vertexShader:Nt.meshphysical_vert,fragmentShader:Nt.meshphysical_frag};const Ds={r:0,b:0,g:0},Xn=new nn,qf=new ne;function Yf(i,t,e,n,s,r,a){const o=new It(0);let l=r===!0?0:1,c,h,d=null,u=0,m=null;function g(S){let M=S.isScene===!0?S.background:null;return M&&M.isTexture&&(M=(S.backgroundBlurriness>0?e:t).get(M)),M}function v(S){let M=!1;const x=g(S);x===null?p(o,l):x&&x.isColor&&(p(x,1),M=!0);const R=i.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function f(S,M){const x=g(M);x&&(x.isCubeTexture||x.mapping===lr)?(h===void 0&&(h=new Vt(new Fn(1,1,1),new On({name:"BackgroundCubeMaterial",uniforms:Ui(Qe.backgroundCube.uniforms),vertexShader:Qe.backgroundCube.vertexShader,fragmentShader:Qe.backgroundCube.fragmentShader,side:Pe,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Xn.copy(M.backgroundRotation),Xn.x*=-1,Xn.y*=-1,Xn.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Xn.y*=-1,Xn.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(qf.makeRotationFromEuler(Xn)),h.material.toneMapped=Zt.getTransfer(x.colorSpace)!==ee,(d!==x||u!==x.version||m!==i.toneMapping)&&(h.material.needsUpdate=!0,d=x,u=x.version,m=i.toneMapping),h.layers.enableAll(),S.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new Vt(new Bn(2,2),new On({name:"BackgroundMaterial",uniforms:Ui(Qe.background.uniforms),vertexShader:Qe.background.vertexShader,fragmentShader:Qe.background.fragmentShader,side:Nn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=Zt.getTransfer(x.colorSpace)!==ee,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(d!==x||u!==x.version||m!==i.toneMapping)&&(c.material.needsUpdate=!0,d=x,u=x.version,m=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function p(S,M){S.getRGB(Ds,ec(i)),n.buffers.color.setClear(Ds.r,Ds.g,Ds.b,M,a)}return{getClearColor:function(){return o},setClearColor:function(S,M=1){o.set(S),l=M,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,p(o,l)},render:v,addToRenderList:f}}function $f(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,a=!1;function o(_,b,O,N,X){let Y=!1;const H=d(N,O,b);r!==H&&(r=H,c(r.object)),Y=m(_,N,O,X),Y&&g(_,N,O,X),X!==null&&t.update(X,i.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,x(_,b,O,N),X!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function l(){return i.createVertexArray()}function c(_){return i.bindVertexArray(_)}function h(_){return i.deleteVertexArray(_)}function d(_,b,O){const N=O.wireframe===!0;let X=n[_.id];X===void 0&&(X={},n[_.id]=X);let Y=X[b.id];Y===void 0&&(Y={},X[b.id]=Y);let H=Y[N];return H===void 0&&(H=u(l()),Y[N]=H),H}function u(_){const b=[],O=[],N=[];for(let X=0;X<e;X++)b[X]=0,O[X]=0,N[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:b,enabledAttributes:O,attributeDivisors:N,object:_,attributes:{},index:null}}function m(_,b,O,N){const X=r.attributes,Y=b.attributes;let H=0;const K=O.getAttributes();for(const G in K)if(K[G].location>=0){const ut=X[G];let xt=Y[G];if(xt===void 0&&(G==="instanceMatrix"&&_.instanceMatrix&&(xt=_.instanceMatrix),G==="instanceColor"&&_.instanceColor&&(xt=_.instanceColor)),ut===void 0||ut.attribute!==xt||xt&&ut.data!==xt.data)return!0;H++}return r.attributesNum!==H||r.index!==N}function g(_,b,O,N){const X={},Y=b.attributes;let H=0;const K=O.getAttributes();for(const G in K)if(K[G].location>=0){let ut=Y[G];ut===void 0&&(G==="instanceMatrix"&&_.instanceMatrix&&(ut=_.instanceMatrix),G==="instanceColor"&&_.instanceColor&&(ut=_.instanceColor));const xt={};xt.attribute=ut,ut&&ut.data&&(xt.data=ut.data),X[G]=xt,H++}r.attributes=X,r.attributesNum=H,r.index=N}function v(){const _=r.newAttributes;for(let b=0,O=_.length;b<O;b++)_[b]=0}function f(_){p(_,0)}function p(_,b){const O=r.newAttributes,N=r.enabledAttributes,X=r.attributeDivisors;O[_]=1,N[_]===0&&(i.enableVertexAttribArray(_),N[_]=1),X[_]!==b&&(i.vertexAttribDivisor(_,b),X[_]=b)}function S(){const _=r.newAttributes,b=r.enabledAttributes;for(let O=0,N=b.length;O<N;O++)b[O]!==_[O]&&(i.disableVertexAttribArray(O),b[O]=0)}function M(_,b,O,N,X,Y,H){H===!0?i.vertexAttribIPointer(_,b,O,X,Y):i.vertexAttribPointer(_,b,O,N,X,Y)}function x(_,b,O,N){v();const X=N.attributes,Y=O.getAttributes(),H=b.defaultAttributeValues;for(const K in Y){const G=Y[K];if(G.location>=0){let lt=X[K];if(lt===void 0&&(K==="instanceMatrix"&&_.instanceMatrix&&(lt=_.instanceMatrix),K==="instanceColor"&&_.instanceColor&&(lt=_.instanceColor)),lt!==void 0){const ut=lt.normalized,xt=lt.itemSize,zt=t.get(lt);if(zt===void 0)continue;const Xt=zt.buffer,q=zt.type,tt=zt.bytesPerElement,mt=q===i.INT||q===i.UNSIGNED_INT||lt.gpuType===Ya;if(lt.isInterleavedBufferAttribute){const pt=lt.data,Rt=pt.stride,Tt=lt.offset;if(pt.isInstancedInterleavedBuffer){for(let Ot=0;Ot<G.locationSize;Ot++)p(G.location+Ot,pt.meshPerAttribute);_.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=pt.meshPerAttribute*pt.count)}else for(let Ot=0;Ot<G.locationSize;Ot++)f(G.location+Ot);i.bindBuffer(i.ARRAY_BUFFER,Xt);for(let Ot=0;Ot<G.locationSize;Ot++)M(G.location+Ot,xt/G.locationSize,q,ut,Rt*tt,(Tt+xt/G.locationSize*Ot)*tt,mt)}else{if(lt.isInstancedBufferAttribute){for(let pt=0;pt<G.locationSize;pt++)p(G.location+pt,lt.meshPerAttribute);_.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let pt=0;pt<G.locationSize;pt++)f(G.location+pt);i.bindBuffer(i.ARRAY_BUFFER,Xt);for(let pt=0;pt<G.locationSize;pt++)M(G.location+pt,xt/G.locationSize,q,ut,xt*tt,xt/G.locationSize*pt*tt,mt)}}else if(H!==void 0){const ut=H[K];if(ut!==void 0)switch(ut.length){case 2:i.vertexAttrib2fv(G.location,ut);break;case 3:i.vertexAttrib3fv(G.location,ut);break;case 4:i.vertexAttrib4fv(G.location,ut);break;default:i.vertexAttrib1fv(G.location,ut)}}}}S()}function R(){C();for(const _ in n){const b=n[_];for(const O in b){const N=b[O];for(const X in N)h(N[X].object),delete N[X];delete b[O]}delete n[_]}}function w(_){if(n[_.id]===void 0)return;const b=n[_.id];for(const O in b){const N=b[O];for(const X in N)h(N[X].object),delete N[X];delete b[O]}delete n[_.id]}function A(_){for(const b in n){const O=n[b];if(O[_.id]===void 0)continue;const N=O[_.id];for(const X in N)h(N[X].object),delete N[X];delete O[_.id]}}function C(){W(),a=!0,r!==s&&(r=s,c(r.object))}function W(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:C,resetDefaultState:W,dispose:R,releaseStatesOfGeometry:w,releaseStatesOfProgram:A,initAttributes:v,enableAttribute:f,disableUnusedAttributes:S}}function Kf(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function a(c,h,d){d!==0&&(i.drawArraysInstanced(n,c,h,d),e.update(h,n,d))}function o(c,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let m=0;for(let g=0;g<d;g++)m+=h[g];e.update(m,n,1)}function l(c,h,d,u){if(d===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<c.length;g++)a(c[g],h[g],u[g]);else{m.multiDrawArraysInstancedWEBGL(n,c,0,h,0,u,0,d);let g=0;for(let v=0;v<d;v++)g+=h[v];for(let v=0;v<u.length;v++)e.update(g,n,u[v])}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function jf(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==Je&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const C=A===as&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==gn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==fn&&!C)}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=e.logarithmicDepthBuffer===!0,u=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control");if(u===!0){const A=t.get("EXT_clip_control");A.clipControlEXT(A.LOWER_LEFT_EXT,A.ZERO_TO_ONE_EXT)}const m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),f=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:u,maxTextures:m,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:f,maxAttributes:p,maxVertexUniforms:S,maxVaryings:M,maxFragmentUniforms:x,vertexTextures:R,maxSamples:w}}function Zf(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new An,o=new Ft,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const m=d.length!==0||u||n!==0||s;return s=u,n=d.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,m){const g=d.clippingPlanes,v=d.clipIntersection,f=d.clipShadows,p=i.get(d);if(!s||g===null||g.length===0||r&&!f)r?h(null):c();else{const S=r?0:n,M=S*4;let x=p.clippingState||null;l.value=x,x=h(g,u,M,m);for(let R=0;R!==M;++R)x[R]=e[R];p.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,m,g){const v=d!==null?d.length:0;let f=null;if(v!==0){if(f=l.value,g!==!0||f===null){const p=m+v*4,S=u.matrixWorldInverse;o.getNormalMatrix(S),(f===null||f.length<p)&&(f=new Float32Array(p));for(let M=0,x=m;M!==v;++M,x+=4)a.copy(d[M]).applyMatrix4(S,o),a.normal.toArray(f,x),f[x+3]=a.constant}l.value=f,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,f}}function Jf(i){let t=new WeakMap;function e(a,o){return o===ha?a.mapping=Pi:o===ua&&(a.mapping=Li),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===ha||o===ua)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new lu(l.height);return c.fromEquirectangularTexture(i,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class io extends nc{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Ti=4,Xo=[.125,.215,.35,.446,.526,.582],jn=20,zr=new io,qo=new It;let Hr=null,Gr=0,Vr=0,Wr=!1;const Yn=(1+Math.sqrt(5))/2,Si=1/Yn,Yo=[new U(-Yn,Si,0),new U(Yn,Si,0),new U(-Si,0,Yn),new U(Si,0,Yn),new U(0,Yn,-Si),new U(0,Yn,Si),new U(-1,1,-1),new U(1,1,-1),new U(-1,1,1),new U(1,1,1)];class $o{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Hr=this._renderer.getRenderTarget(),Gr=this._renderer.getActiveCubeFace(),Vr=this._renderer.getActiveMipmapLevel(),Wr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Zo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=jo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Hr,Gr,Vr),this._renderer.xr.enabled=Wr,t.scissorTest=!1,Is(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Pi||t.mapping===Li?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Hr=this._renderer.getRenderTarget(),Gr=this._renderer.getActiveCubeFace(),Vr=this._renderer.getActiveMipmapLevel(),Wr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:je,minFilter:je,generateMipmaps:!1,type:as,format:Je,colorSpace:kn,depthBuffer:!1},s=Ko(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ko(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Qf(r)),this._blurMaterial=tp(r,t,e)}return s}_compileMaterial(t){const e=new Vt(this._lodPlanes[0],t);this._renderer.compile(e,zr)}_sceneToCubeUV(t,e,n,s){const o=new Ke(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(qo),h.toneMapping=Ln,h.autoClear=!1;const m=new Dn({name:"PMREM.Background",side:Pe,depthWrite:!1,depthTest:!1}),g=new Vt(new Fn,m);let v=!1;const f=t.background;f?f.isColor&&(m.color.copy(f),t.background=null,v=!0):(m.color.copy(qo),v=!0);for(let p=0;p<6;p++){const S=p%3;S===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):S===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));const M=this._cubeSize;Is(s,S*M,p>2?M:0,M,M),h.setRenderTarget(s),v&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=d,t.background=f}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Pi||t.mapping===Li;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Zo()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=jo());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Vt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;Is(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,zr)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Yo[(s-r-1)%Yo.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new Vt(this._lodPlanes[s],c),u=c.uniforms,m=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*jn-1),v=r/g,f=isFinite(r)?1+Math.floor(h*v):jn;f>jn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${jn}`);const p=[];let S=0;for(let A=0;A<jn;++A){const C=A/v,W=Math.exp(-C*C/2);p.push(W),A===0?S+=W:A<f&&(S+=2*W)}for(let A=0;A<p.length;A++)p[A]=p[A]/S;u.envMap.value=t.texture,u.samples.value=f,u.weights.value=p,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:M}=this;u.dTheta.value=g,u.mipInt.value=M-n;const x=this._sizeLods[s],R=3*x*(s>M-Ti?s-M+Ti:0),w=4*(this._cubeSize-x);Is(e,R,w,3*x,2*x),l.setRenderTarget(e),l.render(d,zr)}}function Qf(i){const t=[],e=[],n=[];let s=i;const r=i-Ti+1+Xo.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>i-Ti?l=Xo[a-i+Ti-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],m=6,g=6,v=3,f=2,p=1,S=new Float32Array(v*g*m),M=new Float32Array(f*g*m),x=new Float32Array(p*g*m);for(let w=0;w<m;w++){const A=w%3*2/3-1,C=w>2?0:-1,W=[A,C,0,A+2/3,C,0,A+2/3,C+1,0,A,C,0,A+2/3,C+1,0,A,C+1,0];S.set(W,v*g*w),M.set(u,f*g*w);const _=[w,w,w,w,w,w];x.set(_,p*g*w)}const R=new Me;R.setAttribute("position",new Fe(S,v)),R.setAttribute("uv",new Fe(M,f)),R.setAttribute("faceIndex",new Fe(x,p)),t.push(R),s>Ti&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Ko(i,t,e){const n=new ai(i,t,e);return n.texture.mapping=lr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Is(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function tp(i,t,e){const n=new Float32Array(jn),s=new U(0,1,0);return new On({name:"SphericalGaussianBlur",defines:{n:jn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:so(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Pn,depthTest:!1,depthWrite:!1})}function jo(){return new On({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:so(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Pn,depthTest:!1,depthWrite:!1})}function Zo(){return new On({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:so(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Pn,depthTest:!1,depthWrite:!1})}function so(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function ep(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===ha||l===ua,h=l===Pi||l===Li;if(c||h){let d=t.get(o);const u=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return e===null&&(e=new $o(i)),d=c?e.fromEquirectangular(o,d):e.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{const m=o.image;return c&&m&&m.height>0||h&&m&&s(m)?(e===null&&(e=new $o(i)),d=c?e.fromEquirectangular(o):e.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function s(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function np(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&js("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function ip(i,t,e,n){const s={},r=new WeakMap;function a(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const g in u.attributes)t.remove(u.attributes[g]);for(const g in u.morphAttributes){const v=u.morphAttributes[g];for(let f=0,p=v.length;f<p;f++)t.remove(v[f])}u.removeEventListener("dispose",a),delete s[u.id];const m=r.get(u);m&&(t.remove(m),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,e.memory.geometries++),u}function l(d){const u=d.attributes;for(const g in u)t.update(u[g],i.ARRAY_BUFFER);const m=d.morphAttributes;for(const g in m){const v=m[g];for(let f=0,p=v.length;f<p;f++)t.update(v[f],i.ARRAY_BUFFER)}}function c(d){const u=[],m=d.index,g=d.attributes.position;let v=0;if(m!==null){const S=m.array;v=m.version;for(let M=0,x=S.length;M<x;M+=3){const R=S[M+0],w=S[M+1],A=S[M+2];u.push(R,w,w,A,A,R)}}else if(g!==void 0){const S=g.array;v=g.version;for(let M=0,x=S.length/3-1;M<x;M+=3){const R=M+0,w=M+1,A=M+2;u.push(R,w,w,A,A,R)}}else return;const f=new(Kl(u)?tc:Ql)(u,1);f.version=v;const p=r.get(d);p&&t.remove(p),r.set(d,f)}function h(d){const u=r.get(d);if(u){const m=d.index;m!==null&&u.version<m.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function sp(i,t,e){let n;function s(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,m){i.drawElements(n,m,r,u*a),e.update(m,n,1)}function c(u,m,g){g!==0&&(i.drawElementsInstanced(n,m,r,u*a,g),e.update(m,n,g))}function h(u,m,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,r,u,0,g);let f=0;for(let p=0;p<g;p++)f+=m[p];e.update(f,n,1)}function d(u,m,g,v){if(g===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let p=0;p<u.length;p++)c(u[p]/a,m[p],v[p]);else{f.multiDrawElementsInstancedWEBGL(n,m,0,r,u,0,v,0,g);let p=0;for(let S=0;S<g;S++)p+=m[S];for(let S=0;S<v.length;S++)e.update(p,n,v[S])}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function rp(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function ap(i,t,e){const n=new WeakMap,s=new re;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==d){let _=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",_)};var m=_;u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,f=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],S=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let x=0;g===!0&&(x=1),v===!0&&(x=2),f===!0&&(x=3);let R=o.attributes.position.count*x,w=1;R>t.maxTextureSize&&(w=Math.ceil(R/t.maxTextureSize),R=t.maxTextureSize);const A=new Float32Array(R*w*4*d),C=new Zl(A,R,w,d);C.type=fn,C.needsUpdate=!0;const W=x*4;for(let b=0;b<d;b++){const O=p[b],N=S[b],X=M[b],Y=R*w*4*b;for(let H=0;H<O.count;H++){const K=H*W;g===!0&&(s.fromBufferAttribute(O,H),A[Y+K+0]=s.x,A[Y+K+1]=s.y,A[Y+K+2]=s.z,A[Y+K+3]=0),v===!0&&(s.fromBufferAttribute(N,H),A[Y+K+4]=s.x,A[Y+K+5]=s.y,A[Y+K+6]=s.z,A[Y+K+7]=0),f===!0&&(s.fromBufferAttribute(X,H),A[Y+K+8]=s.x,A[Y+K+9]=s.y,A[Y+K+10]=s.z,A[Y+K+11]=X.itemSize===4?s.w:1)}}u={count:d,texture:C,size:new kt(R,w)},n.set(o,u),o.addEventListener("dispose",_)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let g=0;for(let f=0;f<c.length;f++)g+=c[f];const v=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",v),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function op(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,d=t.get(l,h);if(s.get(d)!==c&&(t.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;s.get(u)!==c&&(u.update(),s.set(u,c))}return d}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}class rc extends Ae{constructor(t,e,n,s,r,a,o,l,c,h=Ai){if(h!==Ai&&h!==Ii)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ai&&(n=ri),n===void 0&&h===Ii&&(n=Di),super(null,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:He,this.minFilter=l!==void 0?l:He,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const ac=new Ae,Jo=new rc(1,1),oc=new Zl,lc=new qh,cc=new ic,Qo=[],tl=[],el=new Float32Array(16),nl=new Float32Array(9),il=new Float32Array(4);function ki(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Qo[s];if(r===void 0&&(r=new Float32Array(s),Qo[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function ue(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function de(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function ur(i,t){let e=tl[t];e===void 0&&(e=new Int32Array(t),tl[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function lp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function cp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ue(e,t))return;i.uniform2fv(this.addr,t),de(e,t)}}function hp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ue(e,t))return;i.uniform3fv(this.addr,t),de(e,t)}}function up(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ue(e,t))return;i.uniform4fv(this.addr,t),de(e,t)}}function dp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ue(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),de(e,t)}else{if(ue(e,n))return;il.set(n),i.uniformMatrix2fv(this.addr,!1,il),de(e,n)}}function fp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ue(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),de(e,t)}else{if(ue(e,n))return;nl.set(n),i.uniformMatrix3fv(this.addr,!1,nl),de(e,n)}}function pp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ue(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),de(e,t)}else{if(ue(e,n))return;el.set(n),i.uniformMatrix4fv(this.addr,!1,el),de(e,n)}}function mp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function gp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ue(e,t))return;i.uniform2iv(this.addr,t),de(e,t)}}function _p(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ue(e,t))return;i.uniform3iv(this.addr,t),de(e,t)}}function vp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ue(e,t))return;i.uniform4iv(this.addr,t),de(e,t)}}function xp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Mp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ue(e,t))return;i.uniform2uiv(this.addr,t),de(e,t)}}function yp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ue(e,t))return;i.uniform3uiv(this.addr,t),de(e,t)}}function Sp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ue(e,t))return;i.uniform4uiv(this.addr,t),de(e,t)}}function Ep(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Jo.compareFunction=$l,r=Jo):r=ac,e.setTexture2D(t||r,s)}function bp(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||lc,s)}function Tp(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||cc,s)}function Ap(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||oc,s)}function wp(i){switch(i){case 5126:return lp;case 35664:return cp;case 35665:return hp;case 35666:return up;case 35674:return dp;case 35675:return fp;case 35676:return pp;case 5124:case 35670:return mp;case 35667:case 35671:return gp;case 35668:case 35672:return _p;case 35669:case 35673:return vp;case 5125:return xp;case 36294:return Mp;case 36295:return yp;case 36296:return Sp;case 35678:case 36198:case 36298:case 36306:case 35682:return Ep;case 35679:case 36299:case 36307:return bp;case 35680:case 36300:case 36308:case 36293:return Tp;case 36289:case 36303:case 36311:case 36292:return Ap}}function Rp(i,t){i.uniform1fv(this.addr,t)}function Cp(i,t){const e=ki(t,this.size,2);i.uniform2fv(this.addr,e)}function Pp(i,t){const e=ki(t,this.size,3);i.uniform3fv(this.addr,e)}function Lp(i,t){const e=ki(t,this.size,4);i.uniform4fv(this.addr,e)}function Dp(i,t){const e=ki(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Ip(i,t){const e=ki(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Up(i,t){const e=ki(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Np(i,t){i.uniform1iv(this.addr,t)}function Fp(i,t){i.uniform2iv(this.addr,t)}function Op(i,t){i.uniform3iv(this.addr,t)}function Bp(i,t){i.uniform4iv(this.addr,t)}function kp(i,t){i.uniform1uiv(this.addr,t)}function zp(i,t){i.uniform2uiv(this.addr,t)}function Hp(i,t){i.uniform3uiv(this.addr,t)}function Gp(i,t){i.uniform4uiv(this.addr,t)}function Vp(i,t,e){const n=this.cache,s=t.length,r=ur(e,s);ue(n,r)||(i.uniform1iv(this.addr,r),de(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||ac,r[a])}function Wp(i,t,e){const n=this.cache,s=t.length,r=ur(e,s);ue(n,r)||(i.uniform1iv(this.addr,r),de(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||lc,r[a])}function Xp(i,t,e){const n=this.cache,s=t.length,r=ur(e,s);ue(n,r)||(i.uniform1iv(this.addr,r),de(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||cc,r[a])}function qp(i,t,e){const n=this.cache,s=t.length,r=ur(e,s);ue(n,r)||(i.uniform1iv(this.addr,r),de(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||oc,r[a])}function Yp(i){switch(i){case 5126:return Rp;case 35664:return Cp;case 35665:return Pp;case 35666:return Lp;case 35674:return Dp;case 35675:return Ip;case 35676:return Up;case 5124:case 35670:return Np;case 35667:case 35671:return Fp;case 35668:case 35672:return Op;case 35669:case 35673:return Bp;case 5125:return kp;case 36294:return zp;case 36295:return Hp;case 36296:return Gp;case 35678:case 36198:case 36298:case 36306:case 35682:return Vp;case 35679:case 36299:case 36307:return Wp;case 35680:case 36300:case 36308:case 36293:return Xp;case 36289:case 36303:case 36311:case 36292:return qp}}class $p{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=wp(e.type)}}class Kp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Yp(e.type)}}class jp{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const Xr=/(\w+)(\])?(\[|\.)?/g;function sl(i,t){i.seq.push(t),i.map[t.id]=t}function Zp(i,t,e){const n=i.name,s=n.length;for(Xr.lastIndex=0;;){const r=Xr.exec(n),a=Xr.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){sl(e,c===void 0?new $p(o,i,t):new Kp(o,i,t));break}else{let d=e.map[o];d===void 0&&(d=new jp(o),sl(e,d)),e=d}}}class Zs{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);Zp(r,a,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function rl(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Jp=37297;let Qp=0;function tm(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}function em(i){const t=Zt.getPrimaries(Zt.workingColorSpace),e=Zt.getPrimaries(i);let n;switch(t===e?n="":t===er&&e===tr?n="LinearDisplayP3ToLinearSRGB":t===tr&&e===er&&(n="LinearSRGBToLinearDisplayP3"),i){case kn:case cr:return[n,"LinearTransferOETF"];case Ce:case Qa:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function al(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+tm(i.getShaderSource(t),a)}else return s}function nm(i,t){const e=em(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function im(i,t){let e;switch(t){case sh:e="Linear";break;case rh:e="Reinhard";break;case ah:e="Cineon";break;case Nl:e="ACESFilmic";break;case lh:e="AgX";break;case ch:e="Neutral";break;case oh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Us=new U;function sm(){Zt.getLuminanceCoefficients(Us);const i=Us.x.toFixed(4),t=Us.y.toFixed(4),e=Us.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function rm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ji).join(`
`)}function am(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function om(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Ji(i){return i!==""}function ol(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ll(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const lm=/^[ \t]*#include +<([\w\d./]+)>/gm;function za(i){return i.replace(lm,hm)}const cm=new Map;function hm(i,t){let e=Nt[t];if(e===void 0){const n=cm.get(t);if(n!==void 0)e=Nt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return za(e)}const um=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function cl(i){return i.replace(um,dm)}function dm(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function hl(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function fm(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Dl?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Il?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===un&&(t="SHADOWMAP_TYPE_VSM"),t}function pm(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Pi:case Li:t="ENVMAP_TYPE_CUBE";break;case lr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function mm(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Li:t="ENVMAP_MODE_REFRACTION";break}return t}function gm(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Ul:t="ENVMAP_BLENDING_MULTIPLY";break;case nh:t="ENVMAP_BLENDING_MIX";break;case ih:t="ENVMAP_BLENDING_ADD";break}return t}function _m(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function vm(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=fm(e),c=pm(e),h=mm(e),d=gm(e),u=_m(e),m=rm(e),g=am(r),v=s.createProgram();let f,p,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ji).join(`
`),f.length>0&&(f+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ji).join(`
`),p.length>0&&(p+=`
`)):(f=[hl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ji).join(`
`),p=[hl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ln?"#define TONE_MAPPING":"",e.toneMapping!==Ln?Nt.tonemapping_pars_fragment:"",e.toneMapping!==Ln?im("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Nt.colorspace_pars_fragment,nm("linearToOutputTexel",e.outputColorSpace),sm(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ji).join(`
`)),a=za(a),a=ol(a,e),a=ll(a,e),o=za(o),o=ol(o,e),o=ll(o,e),a=cl(a),o=cl(o),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,f=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,p=["#define varying in",e.glslVersion===Ao?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ao?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=S+f+a,x=S+p+o,R=rl(s,s.VERTEX_SHADER,M),w=rl(s,s.FRAGMENT_SHADER,x);s.attachShader(v,R),s.attachShader(v,w),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function A(b){if(i.debug.checkShaderErrors){const O=s.getProgramInfoLog(v).trim(),N=s.getShaderInfoLog(R).trim(),X=s.getShaderInfoLog(w).trim();let Y=!0,H=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(Y=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,R,w);else{const K=al(s,R,"vertex"),G=al(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+b.name+`
Material Type: `+b.type+`

Program Info Log: `+O+`
`+K+`
`+G)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(N===""||X==="")&&(H=!1);H&&(b.diagnostics={runnable:Y,programLog:O,vertexShader:{log:N,prefix:f},fragmentShader:{log:X,prefix:p}})}s.deleteShader(R),s.deleteShader(w),C=new Zs(s,v),W=om(s,v)}let C;this.getUniforms=function(){return C===void 0&&A(this),C};let W;this.getAttributes=function(){return W===void 0&&A(this),W};let _=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=s.getProgramParameter(v,Jp)),_},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Qp++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=R,this.fragmentShader=w,this}let xm=0;class Mm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new ym(t),e.set(t,n)),n}}class ym{constructor(t){this.id=xm++,this.code=t,this.usedTimes=0}}function Sm(i,t,e,n,s,r,a){const o=new eo,l=new Mm,c=new Set,h=[],d=s.logarithmicDepthBuffer,u=s.reverseDepthBuffer,m=s.vertexTextures;let g=s.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function f(_){return c.add(_),_===0?"uv":`uv${_}`}function p(_,b,O,N,X){const Y=N.fog,H=X.geometry,K=_.isMeshStandardMaterial?N.environment:null,G=(_.isMeshStandardMaterial?e:t).get(_.envMap||K),lt=G&&G.mapping===lr?G.image.height:null,ut=v[_.type];_.precision!==null&&(g=s.getMaxPrecision(_.precision),g!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",g,"instead."));const xt=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,zt=xt!==void 0?xt.length:0;let Xt=0;H.morphAttributes.position!==void 0&&(Xt=1),H.morphAttributes.normal!==void 0&&(Xt=2),H.morphAttributes.color!==void 0&&(Xt=3);let q,tt,mt,pt;if(ut){const Re=Qe[ut];q=Re.vertexShader,tt=Re.fragmentShader}else q=_.vertexShader,tt=_.fragmentShader,l.update(_),mt=l.getVertexShaderID(_),pt=l.getFragmentShaderID(_);const Rt=i.getRenderTarget(),Tt=X.isInstancedMesh===!0,Ot=X.isBatchedMesh===!0,qt=!!_.map,Bt=!!_.matcap,P=!!G,ye=!!_.aoMap,z=!!_.lightMap,J=!!_.bumpMap,et=!!_.normalMap,st=!!_.displacementMap,rt=!!_.emissiveMap,T=!!_.metalnessMap,y=!!_.roughnessMap,F=_.anisotropy>0,j=_.clearcoat>0,Q=_.dispersion>0,$=_.iridescence>0,St=_.sheen>0,ot=_.transmission>0,gt=F&&!!_.anisotropyMap,Wt=j&&!!_.clearcoatMap,nt=j&&!!_.clearcoatNormalMap,_t=j&&!!_.clearcoatRoughnessMap,Ct=$&&!!_.iridescenceMap,Pt=$&&!!_.iridescenceThicknessMap,vt=St&&!!_.sheenColorMap,Ht=St&&!!_.sheenRoughnessMap,Dt=!!_.specularMap,Qt=!!_.specularColorMap,L=!!_.specularIntensityMap,dt=ot&&!!_.transmissionMap,V=ot&&!!_.thicknessMap,Z=!!_.gradientMap,ct=!!_.alphaMap,ft=_.alphaTest>0,Gt=!!_.alphaHash,oe=!!_.extensions;let we=Ln;_.toneMapped&&(Rt===null||Rt.isXRRenderTarget===!0)&&(we=i.toneMapping);const Yt={shaderID:ut,shaderType:_.type,shaderName:_.name,vertexShader:q,fragmentShader:tt,defines:_.defines,customVertexShaderID:mt,customFragmentShaderID:pt,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:g,batching:Ot,batchingColor:Ot&&X._colorsTexture!==null,instancing:Tt,instancingColor:Tt&&X.instanceColor!==null,instancingMorph:Tt&&X.morphTexture!==null,supportsVertexTextures:m,outputColorSpace:Rt===null?i.outputColorSpace:Rt.isXRRenderTarget===!0?Rt.texture.colorSpace:kn,alphaToCoverage:!!_.alphaToCoverage,map:qt,matcap:Bt,envMap:P,envMapMode:P&&G.mapping,envMapCubeUVHeight:lt,aoMap:ye,lightMap:z,bumpMap:J,normalMap:et,displacementMap:m&&st,emissiveMap:rt,normalMapObjectSpace:et&&_.normalMapType===fh,normalMapTangentSpace:et&&_.normalMapType===Yl,metalnessMap:T,roughnessMap:y,anisotropy:F,anisotropyMap:gt,clearcoat:j,clearcoatMap:Wt,clearcoatNormalMap:nt,clearcoatRoughnessMap:_t,dispersion:Q,iridescence:$,iridescenceMap:Ct,iridescenceThicknessMap:Pt,sheen:St,sheenColorMap:vt,sheenRoughnessMap:Ht,specularMap:Dt,specularColorMap:Qt,specularIntensityMap:L,transmission:ot,transmissionMap:dt,thicknessMap:V,gradientMap:Z,opaque:_.transparent===!1&&_.blending===ni&&_.alphaToCoverage===!1,alphaMap:ct,alphaTest:ft,alphaHash:Gt,combine:_.combine,mapUv:qt&&f(_.map.channel),aoMapUv:ye&&f(_.aoMap.channel),lightMapUv:z&&f(_.lightMap.channel),bumpMapUv:J&&f(_.bumpMap.channel),normalMapUv:et&&f(_.normalMap.channel),displacementMapUv:st&&f(_.displacementMap.channel),emissiveMapUv:rt&&f(_.emissiveMap.channel),metalnessMapUv:T&&f(_.metalnessMap.channel),roughnessMapUv:y&&f(_.roughnessMap.channel),anisotropyMapUv:gt&&f(_.anisotropyMap.channel),clearcoatMapUv:Wt&&f(_.clearcoatMap.channel),clearcoatNormalMapUv:nt&&f(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_t&&f(_.clearcoatRoughnessMap.channel),iridescenceMapUv:Ct&&f(_.iridescenceMap.channel),iridescenceThicknessMapUv:Pt&&f(_.iridescenceThicknessMap.channel),sheenColorMapUv:vt&&f(_.sheenColorMap.channel),sheenRoughnessMapUv:Ht&&f(_.sheenRoughnessMap.channel),specularMapUv:Dt&&f(_.specularMap.channel),specularColorMapUv:Qt&&f(_.specularColorMap.channel),specularIntensityMapUv:L&&f(_.specularIntensityMap.channel),transmissionMapUv:dt&&f(_.transmissionMap.channel),thicknessMapUv:V&&f(_.thicknessMap.channel),alphaMapUv:ct&&f(_.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(et||F),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:X.isPoints===!0&&!!H.attributes.uv&&(qt||ct),fog:!!Y,useFog:_.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:_.flatShading===!0,sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:u,skinning:X.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:zt,morphTextureStride:Xt,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&O.length>0,shadowMapType:i.shadowMap.type,toneMapping:we,decodeVideoTexture:qt&&_.map.isVideoTexture===!0&&Zt.getTransfer(_.map.colorSpace)===ee,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===tn,flipSided:_.side===Pe,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:oe&&_.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(oe&&_.extensions.multiDraw===!0||Ot)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Yt.vertexUv1s=c.has(1),Yt.vertexUv2s=c.has(2),Yt.vertexUv3s=c.has(3),c.clear(),Yt}function S(_){const b=[];if(_.shaderID?b.push(_.shaderID):(b.push(_.customVertexShaderID),b.push(_.customFragmentShaderID)),_.defines!==void 0)for(const O in _.defines)b.push(O),b.push(_.defines[O]);return _.isRawShaderMaterial===!1&&(M(b,_),x(b,_),b.push(i.outputColorSpace)),b.push(_.customProgramCacheKey),b.join()}function M(_,b){_.push(b.precision),_.push(b.outputColorSpace),_.push(b.envMapMode),_.push(b.envMapCubeUVHeight),_.push(b.mapUv),_.push(b.alphaMapUv),_.push(b.lightMapUv),_.push(b.aoMapUv),_.push(b.bumpMapUv),_.push(b.normalMapUv),_.push(b.displacementMapUv),_.push(b.emissiveMapUv),_.push(b.metalnessMapUv),_.push(b.roughnessMapUv),_.push(b.anisotropyMapUv),_.push(b.clearcoatMapUv),_.push(b.clearcoatNormalMapUv),_.push(b.clearcoatRoughnessMapUv),_.push(b.iridescenceMapUv),_.push(b.iridescenceThicknessMapUv),_.push(b.sheenColorMapUv),_.push(b.sheenRoughnessMapUv),_.push(b.specularMapUv),_.push(b.specularColorMapUv),_.push(b.specularIntensityMapUv),_.push(b.transmissionMapUv),_.push(b.thicknessMapUv),_.push(b.combine),_.push(b.fogExp2),_.push(b.sizeAttenuation),_.push(b.morphTargetsCount),_.push(b.morphAttributeCount),_.push(b.numDirLights),_.push(b.numPointLights),_.push(b.numSpotLights),_.push(b.numSpotLightMaps),_.push(b.numHemiLights),_.push(b.numRectAreaLights),_.push(b.numDirLightShadows),_.push(b.numPointLightShadows),_.push(b.numSpotLightShadows),_.push(b.numSpotLightShadowsWithMaps),_.push(b.numLightProbes),_.push(b.shadowMapType),_.push(b.toneMapping),_.push(b.numClippingPlanes),_.push(b.numClipIntersection),_.push(b.depthPacking)}function x(_,b){o.disableAll(),b.supportsVertexTextures&&o.enable(0),b.instancing&&o.enable(1),b.instancingColor&&o.enable(2),b.instancingMorph&&o.enable(3),b.matcap&&o.enable(4),b.envMap&&o.enable(5),b.normalMapObjectSpace&&o.enable(6),b.normalMapTangentSpace&&o.enable(7),b.clearcoat&&o.enable(8),b.iridescence&&o.enable(9),b.alphaTest&&o.enable(10),b.vertexColors&&o.enable(11),b.vertexAlphas&&o.enable(12),b.vertexUv1s&&o.enable(13),b.vertexUv2s&&o.enable(14),b.vertexUv3s&&o.enable(15),b.vertexTangents&&o.enable(16),b.anisotropy&&o.enable(17),b.alphaHash&&o.enable(18),b.batching&&o.enable(19),b.dispersion&&o.enable(20),b.batchingColor&&o.enable(21),_.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reverseDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.alphaToCoverage&&o.enable(20),_.push(o.mask)}function R(_){const b=v[_.type];let O;if(b){const N=Qe[b];O=su.clone(N.uniforms)}else O=_.uniforms;return O}function w(_,b){let O;for(let N=0,X=h.length;N<X;N++){const Y=h[N];if(Y.cacheKey===b){O=Y,++O.usedTimes;break}}return O===void 0&&(O=new vm(i,b,_,r),h.push(O)),O}function A(_){if(--_.usedTimes===0){const b=h.indexOf(_);h[b]=h[h.length-1],h.pop(),_.destroy()}}function C(_){l.remove(_)}function W(){l.dispose()}return{getParameters:p,getProgramCacheKey:S,getUniforms:R,acquireProgram:w,releaseProgram:A,releaseShaderCache:C,programs:h,dispose:W}}function Em(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function bm(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function ul(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function dl(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(d,u,m,g,v,f){let p=i[t];return p===void 0?(p={id:d.id,object:d,geometry:u,material:m,groupOrder:g,renderOrder:d.renderOrder,z:v,group:f},i[t]=p):(p.id=d.id,p.object=d,p.geometry=u,p.material=m,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=v,p.group=f),t++,p}function o(d,u,m,g,v,f){const p=a(d,u,m,g,v,f);m.transmission>0?n.push(p):m.transparent===!0?s.push(p):e.push(p)}function l(d,u,m,g,v,f){const p=a(d,u,m,g,v,f);m.transmission>0?n.unshift(p):m.transparent===!0?s.unshift(p):e.unshift(p)}function c(d,u){e.length>1&&e.sort(d||bm),n.length>1&&n.sort(u||ul),s.length>1&&s.sort(u||ul)}function h(){for(let d=t,u=i.length;d<u;d++){const m=i[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function Tm(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new dl,i.set(n,[a])):s>=r.length?(a=new dl,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function Am(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new U,color:new It};break;case"SpotLight":e={position:new U,direction:new U,color:new It,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new U,color:new It,distance:0,decay:0};break;case"HemisphereLight":e={direction:new U,skyColor:new It,groundColor:new It};break;case"RectAreaLight":e={color:new It,position:new U,halfWidth:new U,halfHeight:new U};break}return i[t.id]=e,e}}}function wm(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new kt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new kt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new kt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Rm=0;function Cm(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Pm(i){const t=new Am,e=wm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new U);const s=new U,r=new ne,a=new ne;function o(c){let h=0,d=0,u=0;for(let W=0;W<9;W++)n.probe[W].set(0,0,0);let m=0,g=0,v=0,f=0,p=0,S=0,M=0,x=0,R=0,w=0,A=0;c.sort(Cm);for(let W=0,_=c.length;W<_;W++){const b=c[W],O=b.color,N=b.intensity,X=b.distance,Y=b.shadow&&b.shadow.map?b.shadow.map.texture:null;if(b.isAmbientLight)h+=O.r*N,d+=O.g*N,u+=O.b*N;else if(b.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(b.sh.coefficients[H],N);A++}else if(b.isDirectionalLight){const H=t.get(b);if(H.color.copy(b.color).multiplyScalar(b.intensity),b.castShadow){const K=b.shadow,G=e.get(b);G.shadowIntensity=K.intensity,G.shadowBias=K.bias,G.shadowNormalBias=K.normalBias,G.shadowRadius=K.radius,G.shadowMapSize=K.mapSize,n.directionalShadow[m]=G,n.directionalShadowMap[m]=Y,n.directionalShadowMatrix[m]=b.shadow.matrix,S++}n.directional[m]=H,m++}else if(b.isSpotLight){const H=t.get(b);H.position.setFromMatrixPosition(b.matrixWorld),H.color.copy(O).multiplyScalar(N),H.distance=X,H.coneCos=Math.cos(b.angle),H.penumbraCos=Math.cos(b.angle*(1-b.penumbra)),H.decay=b.decay,n.spot[v]=H;const K=b.shadow;if(b.map&&(n.spotLightMap[R]=b.map,R++,K.updateMatrices(b),b.castShadow&&w++),n.spotLightMatrix[v]=K.matrix,b.castShadow){const G=e.get(b);G.shadowIntensity=K.intensity,G.shadowBias=K.bias,G.shadowNormalBias=K.normalBias,G.shadowRadius=K.radius,G.shadowMapSize=K.mapSize,n.spotShadow[v]=G,n.spotShadowMap[v]=Y,x++}v++}else if(b.isRectAreaLight){const H=t.get(b);H.color.copy(O).multiplyScalar(N),H.halfWidth.set(b.width*.5,0,0),H.halfHeight.set(0,b.height*.5,0),n.rectArea[f]=H,f++}else if(b.isPointLight){const H=t.get(b);if(H.color.copy(b.color).multiplyScalar(b.intensity),H.distance=b.distance,H.decay=b.decay,b.castShadow){const K=b.shadow,G=e.get(b);G.shadowIntensity=K.intensity,G.shadowBias=K.bias,G.shadowNormalBias=K.normalBias,G.shadowRadius=K.radius,G.shadowMapSize=K.mapSize,G.shadowCameraNear=K.camera.near,G.shadowCameraFar=K.camera.far,n.pointShadow[g]=G,n.pointShadowMap[g]=Y,n.pointShadowMatrix[g]=b.shadow.matrix,M++}n.point[g]=H,g++}else if(b.isHemisphereLight){const H=t.get(b);H.skyColor.copy(b.color).multiplyScalar(N),H.groundColor.copy(b.groundColor).multiplyScalar(N),n.hemi[p]=H,p++}}f>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=at.LTC_FLOAT_1,n.rectAreaLTC2=at.LTC_FLOAT_2):(n.rectAreaLTC1=at.LTC_HALF_1,n.rectAreaLTC2=at.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const C=n.hash;(C.directionalLength!==m||C.pointLength!==g||C.spotLength!==v||C.rectAreaLength!==f||C.hemiLength!==p||C.numDirectionalShadows!==S||C.numPointShadows!==M||C.numSpotShadows!==x||C.numSpotMaps!==R||C.numLightProbes!==A)&&(n.directional.length=m,n.spot.length=v,n.rectArea.length=f,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=x+R-w,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=A,C.directionalLength=m,C.pointLength=g,C.spotLength=v,C.rectAreaLength=f,C.hemiLength=p,C.numDirectionalShadows=S,C.numPointShadows=M,C.numSpotShadows=x,C.numSpotMaps=R,C.numLightProbes=A,n.version=Rm++)}function l(c,h){let d=0,u=0,m=0,g=0,v=0;const f=h.matrixWorldInverse;for(let p=0,S=c.length;p<S;p++){const M=c[p];if(M.isDirectionalLight){const x=n.directional[d];x.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(f),d++}else if(M.isSpotLight){const x=n.spot[m];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(f),x.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(f),m++}else if(M.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(f),a.identity(),r.copy(M.matrixWorld),r.premultiply(f),a.extractRotation(r),x.halfWidth.set(M.width*.5,0,0),x.halfHeight.set(0,M.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),g++}else if(M.isPointLight){const x=n.point[u];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(f),u++}else if(M.isHemisphereLight){const x=n.hemi[v];x.direction.setFromMatrixPosition(M.matrixWorld),x.direction.transformDirection(f),v++}}}return{setup:o,setupView:l,state:n}}function fl(i){const t=new Pm(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function Lm(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new fl(i),t.set(s,[o])):r>=a.length?(o=new fl(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class Dm extends oi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=uh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Im extends oi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Um=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Nm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Fm(i,t,e){let n=new no;const s=new kt,r=new kt,a=new re,o=new Dm({depthPacking:dh}),l=new Im,c={},h=e.maxTextureSize,d={[Nn]:Pe,[Pe]:Nn,[tn]:tn},u=new On({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new kt},radius:{value:4}},vertexShader:Um,fragmentShader:Nm}),m=u.clone();m.defines.HORIZONTAL_PASS=1;const g=new Me;g.setAttribute("position",new Fe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Vt(g,u),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Dl;let p=this.type;this.render=function(w,A,C){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||w.length===0)return;const W=i.getRenderTarget(),_=i.getActiveCubeFace(),b=i.getActiveMipmapLevel(),O=i.state;O.setBlending(Pn),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const N=p!==un&&this.type===un,X=p===un&&this.type!==un;for(let Y=0,H=w.length;Y<H;Y++){const K=w[Y],G=K.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const lt=G.getFrameExtents();if(s.multiply(lt),r.copy(G.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/lt.x),s.x=r.x*lt.x,G.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/lt.y),s.y=r.y*lt.y,G.mapSize.y=r.y)),G.map===null||N===!0||X===!0){const xt=this.type!==un?{minFilter:He,magFilter:He}:{};G.map!==null&&G.map.dispose(),G.map=new ai(s.x,s.y,xt),G.map.texture.name=K.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();const ut=G.getViewportCount();for(let xt=0;xt<ut;xt++){const zt=G.getViewport(xt);a.set(r.x*zt.x,r.y*zt.y,r.x*zt.z,r.y*zt.w),O.viewport(a),G.updateMatrices(K,xt),n=G.getFrustum(),x(A,C,G.camera,K,this.type)}G.isPointLightShadow!==!0&&this.type===un&&S(G,C),G.needsUpdate=!1}p=this.type,f.needsUpdate=!1,i.setRenderTarget(W,_,b)};function S(w,A){const C=t.update(v);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,m.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,m.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new ai(s.x,s.y)),u.uniforms.shadow_pass.value=w.map.texture,u.uniforms.resolution.value=w.mapSize,u.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(A,null,C,u,v,null),m.uniforms.shadow_pass.value=w.mapPass.texture,m.uniforms.resolution.value=w.mapSize,m.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(A,null,C,m,v,null)}function M(w,A,C,W){let _=null;const b=C.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(b!==void 0)_=b;else if(_=C.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const O=_.uuid,N=A.uuid;let X=c[O];X===void 0&&(X={},c[O]=X);let Y=X[N];Y===void 0&&(Y=_.clone(),X[N]=Y,A.addEventListener("dispose",R)),_=Y}if(_.visible=A.visible,_.wireframe=A.wireframe,W===un?_.side=A.shadowSide!==null?A.shadowSide:A.side:_.side=A.shadowSide!==null?A.shadowSide:d[A.side],_.alphaMap=A.alphaMap,_.alphaTest=A.alphaTest,_.map=A.map,_.clipShadows=A.clipShadows,_.clippingPlanes=A.clippingPlanes,_.clipIntersection=A.clipIntersection,_.displacementMap=A.displacementMap,_.displacementScale=A.displacementScale,_.displacementBias=A.displacementBias,_.wireframeLinewidth=A.wireframeLinewidth,_.linewidth=A.linewidth,C.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const O=i.properties.get(_);O.light=C}return _}function x(w,A,C,W,_){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&_===un)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,w.matrixWorld);const N=t.update(w),X=w.material;if(Array.isArray(X)){const Y=N.groups;for(let H=0,K=Y.length;H<K;H++){const G=Y[H],lt=X[G.materialIndex];if(lt&&lt.visible){const ut=M(w,lt,W,_);w.onBeforeShadow(i,w,A,C,N,ut,G),i.renderBufferDirect(C,null,N,ut,w,G),w.onAfterShadow(i,w,A,C,N,ut,G)}}}else if(X.visible){const Y=M(w,X,W,_);w.onBeforeShadow(i,w,A,C,N,Y,null),i.renderBufferDirect(C,null,N,Y,w,null),w.onAfterShadow(i,w,A,C,N,Y,null)}}const O=w.children;for(let N=0,X=O.length;N<X;N++)x(O[N],A,C,W,_)}function R(w){w.target.removeEventListener("dispose",R);for(const C in c){const W=c[C],_=w.target.uuid;_ in W&&(W[_].dispose(),delete W[_])}}}const Om={[ia]:sa,[ra]:la,[aa]:ca,[Ci]:oa,[sa]:ia,[la]:ra,[ca]:aa,[oa]:Ci};function Bm(i){function t(){let L=!1;const dt=new re;let V=null;const Z=new re(0,0,0,0);return{setMask:function(ct){V!==ct&&!L&&(i.colorMask(ct,ct,ct,ct),V=ct)},setLocked:function(ct){L=ct},setClear:function(ct,ft,Gt,oe,we){we===!0&&(ct*=oe,ft*=oe,Gt*=oe),dt.set(ct,ft,Gt,oe),Z.equals(dt)===!1&&(i.clearColor(ct,ft,Gt,oe),Z.copy(dt))},reset:function(){L=!1,V=null,Z.set(-1,0,0,0)}}}function e(){let L=!1,dt=!1,V=null,Z=null,ct=null;return{setReversed:function(ft){dt=ft},setTest:function(ft){ft?mt(i.DEPTH_TEST):pt(i.DEPTH_TEST)},setMask:function(ft){V!==ft&&!L&&(i.depthMask(ft),V=ft)},setFunc:function(ft){if(dt&&(ft=Om[ft]),Z!==ft){switch(ft){case ia:i.depthFunc(i.NEVER);break;case sa:i.depthFunc(i.ALWAYS);break;case ra:i.depthFunc(i.LESS);break;case Ci:i.depthFunc(i.LEQUAL);break;case aa:i.depthFunc(i.EQUAL);break;case oa:i.depthFunc(i.GEQUAL);break;case la:i.depthFunc(i.GREATER);break;case ca:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Z=ft}},setLocked:function(ft){L=ft},setClear:function(ft){ct!==ft&&(i.clearDepth(ft),ct=ft)},reset:function(){L=!1,V=null,Z=null,ct=null}}}function n(){let L=!1,dt=null,V=null,Z=null,ct=null,ft=null,Gt=null,oe=null,we=null;return{setTest:function(Yt){L||(Yt?mt(i.STENCIL_TEST):pt(i.STENCIL_TEST))},setMask:function(Yt){dt!==Yt&&!L&&(i.stencilMask(Yt),dt=Yt)},setFunc:function(Yt,Re,sn){(V!==Yt||Z!==Re||ct!==sn)&&(i.stencilFunc(Yt,Re,sn),V=Yt,Z=Re,ct=sn)},setOp:function(Yt,Re,sn){(ft!==Yt||Gt!==Re||oe!==sn)&&(i.stencilOp(Yt,Re,sn),ft=Yt,Gt=Re,oe=sn)},setLocked:function(Yt){L=Yt},setClear:function(Yt){we!==Yt&&(i.clearStencil(Yt),we=Yt)},reset:function(){L=!1,dt=null,V=null,Z=null,ct=null,ft=null,Gt=null,oe=null,we=null}}}const s=new t,r=new e,a=new n,o=new WeakMap,l=new WeakMap;let c={},h={},d=new WeakMap,u=[],m=null,g=!1,v=null,f=null,p=null,S=null,M=null,x=null,R=null,w=new It(0,0,0),A=0,C=!1,W=null,_=null,b=null,O=null,N=null;const X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,H=0;const K=i.getParameter(i.VERSION);K.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(K)[1]),Y=H>=1):K.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),Y=H>=2);let G=null,lt={};const ut=i.getParameter(i.SCISSOR_BOX),xt=i.getParameter(i.VIEWPORT),zt=new re().fromArray(ut),Xt=new re().fromArray(xt);function q(L,dt,V,Z){const ct=new Uint8Array(4),ft=i.createTexture();i.bindTexture(L,ft),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Gt=0;Gt<V;Gt++)L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY?i.texImage3D(dt,0,i.RGBA,1,1,Z,0,i.RGBA,i.UNSIGNED_BYTE,ct):i.texImage2D(dt+Gt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ct);return ft}const tt={};tt[i.TEXTURE_2D]=q(i.TEXTURE_2D,i.TEXTURE_2D,1),tt[i.TEXTURE_CUBE_MAP]=q(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),tt[i.TEXTURE_2D_ARRAY]=q(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),tt[i.TEXTURE_3D]=q(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),a.setClear(0),mt(i.DEPTH_TEST),r.setFunc(Ci),z(!1),J(yo),mt(i.CULL_FACE),P(Pn);function mt(L){c[L]!==!0&&(i.enable(L),c[L]=!0)}function pt(L){c[L]!==!1&&(i.disable(L),c[L]=!1)}function Rt(L,dt){return h[L]!==dt?(i.bindFramebuffer(L,dt),h[L]=dt,L===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=dt),L===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=dt),!0):!1}function Tt(L,dt){let V=u,Z=!1;if(L){V=d.get(dt),V===void 0&&(V=[],d.set(dt,V));const ct=L.textures;if(V.length!==ct.length||V[0]!==i.COLOR_ATTACHMENT0){for(let ft=0,Gt=ct.length;ft<Gt;ft++)V[ft]=i.COLOR_ATTACHMENT0+ft;V.length=ct.length,Z=!0}}else V[0]!==i.BACK&&(V[0]=i.BACK,Z=!0);Z&&i.drawBuffers(V)}function Ot(L){return m!==L?(i.useProgram(L),m=L,!0):!1}const qt={[Kn]:i.FUNC_ADD,[kc]:i.FUNC_SUBTRACT,[zc]:i.FUNC_REVERSE_SUBTRACT};qt[Hc]=i.MIN,qt[Gc]=i.MAX;const Bt={[Vc]:i.ZERO,[Wc]:i.ONE,[Xc]:i.SRC_COLOR,[ea]:i.SRC_ALPHA,[Zc]:i.SRC_ALPHA_SATURATE,[Kc]:i.DST_COLOR,[Yc]:i.DST_ALPHA,[qc]:i.ONE_MINUS_SRC_COLOR,[na]:i.ONE_MINUS_SRC_ALPHA,[jc]:i.ONE_MINUS_DST_COLOR,[$c]:i.ONE_MINUS_DST_ALPHA,[Jc]:i.CONSTANT_COLOR,[Qc]:i.ONE_MINUS_CONSTANT_COLOR,[th]:i.CONSTANT_ALPHA,[eh]:i.ONE_MINUS_CONSTANT_ALPHA};function P(L,dt,V,Z,ct,ft,Gt,oe,we,Yt){if(L===Pn){g===!0&&(pt(i.BLEND),g=!1);return}if(g===!1&&(mt(i.BLEND),g=!0),L!==Bc){if(L!==v||Yt!==C){if((f!==Kn||M!==Kn)&&(i.blendEquation(i.FUNC_ADD),f=Kn,M=Kn),Yt)switch(L){case ni:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Js:i.blendFunc(i.ONE,i.ONE);break;case So:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Eo:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case ni:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Js:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case So:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Eo:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}p=null,S=null,x=null,R=null,w.set(0,0,0),A=0,v=L,C=Yt}return}ct=ct||dt,ft=ft||V,Gt=Gt||Z,(dt!==f||ct!==M)&&(i.blendEquationSeparate(qt[dt],qt[ct]),f=dt,M=ct),(V!==p||Z!==S||ft!==x||Gt!==R)&&(i.blendFuncSeparate(Bt[V],Bt[Z],Bt[ft],Bt[Gt]),p=V,S=Z,x=ft,R=Gt),(oe.equals(w)===!1||we!==A)&&(i.blendColor(oe.r,oe.g,oe.b,we),w.copy(oe),A=we),v=L,C=!1}function ye(L,dt){L.side===tn?pt(i.CULL_FACE):mt(i.CULL_FACE);let V=L.side===Pe;dt&&(V=!V),z(V),L.blending===ni&&L.transparent===!1?P(Pn):P(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),r.setFunc(L.depthFunc),r.setTest(L.depthTest),r.setMask(L.depthWrite),s.setMask(L.colorWrite);const Z=L.stencilWrite;a.setTest(Z),Z&&(a.setMask(L.stencilWriteMask),a.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),a.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),st(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?mt(i.SAMPLE_ALPHA_TO_COVERAGE):pt(i.SAMPLE_ALPHA_TO_COVERAGE)}function z(L){W!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),W=L)}function J(L){L!==Fc?(mt(i.CULL_FACE),L!==_&&(L===yo?i.cullFace(i.BACK):L===Oc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):pt(i.CULL_FACE),_=L}function et(L){L!==b&&(Y&&i.lineWidth(L),b=L)}function st(L,dt,V){L?(mt(i.POLYGON_OFFSET_FILL),(O!==dt||N!==V)&&(i.polygonOffset(dt,V),O=dt,N=V)):pt(i.POLYGON_OFFSET_FILL)}function rt(L){L?mt(i.SCISSOR_TEST):pt(i.SCISSOR_TEST)}function T(L){L===void 0&&(L=i.TEXTURE0+X-1),G!==L&&(i.activeTexture(L),G=L)}function y(L,dt,V){V===void 0&&(G===null?V=i.TEXTURE0+X-1:V=G);let Z=lt[V];Z===void 0&&(Z={type:void 0,texture:void 0},lt[V]=Z),(Z.type!==L||Z.texture!==dt)&&(G!==V&&(i.activeTexture(V),G=V),i.bindTexture(L,dt||tt[L]),Z.type=L,Z.texture=dt)}function F(){const L=lt[G];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function j(){try{i.compressedTexImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Q(){try{i.compressedTexImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function $(){try{i.texSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function St(){try{i.texSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ot(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function gt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Wt(){try{i.texStorage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function nt(){try{i.texStorage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function _t(){try{i.texImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ct(){try{i.texImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Pt(L){zt.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),zt.copy(L))}function vt(L){Xt.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),Xt.copy(L))}function Ht(L,dt){let V=l.get(dt);V===void 0&&(V=new WeakMap,l.set(dt,V));let Z=V.get(L);Z===void 0&&(Z=i.getUniformBlockIndex(dt,L.name),V.set(L,Z))}function Dt(L,dt){const Z=l.get(dt).get(L);o.get(dt)!==Z&&(i.uniformBlockBinding(dt,Z,L.__bindingPointIndex),o.set(dt,Z))}function Qt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),c={},G=null,lt={},h={},d=new WeakMap,u=[],m=null,g=!1,v=null,f=null,p=null,S=null,M=null,x=null,R=null,w=new It(0,0,0),A=0,C=!1,W=null,_=null,b=null,O=null,N=null,zt.set(0,0,i.canvas.width,i.canvas.height),Xt.set(0,0,i.canvas.width,i.canvas.height),s.reset(),r.reset(),a.reset()}return{buffers:{color:s,depth:r,stencil:a},enable:mt,disable:pt,bindFramebuffer:Rt,drawBuffers:Tt,useProgram:Ot,setBlending:P,setMaterial:ye,setFlipSided:z,setCullFace:J,setLineWidth:et,setPolygonOffset:st,setScissorTest:rt,activeTexture:T,bindTexture:y,unbindTexture:F,compressedTexImage2D:j,compressedTexImage3D:Q,texImage2D:_t,texImage3D:Ct,updateUBOMapping:Ht,uniformBlockBinding:Dt,texStorage2D:Wt,texStorage3D:nt,texSubImage2D:$,texSubImage3D:St,compressedTexSubImage2D:ot,compressedTexSubImage3D:gt,scissor:Pt,viewport:vt,reset:Qt}}function pl(i,t,e,n){const s=km(n);switch(e){case zl:return i*t;case Gl:return i*t;case Vl:return i*t*2;case Wl:return i*t/s.components*s.byteLength;case ja:return i*t/s.components*s.byteLength;case Xl:return i*t*2/s.components*s.byteLength;case Za:return i*t*2/s.components*s.byteLength;case Hl:return i*t*3/s.components*s.byteLength;case Je:return i*t*4/s.components*s.byteLength;case Ja:return i*t*4/s.components*s.byteLength;case Xs:case qs:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ys:case $s:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ma:case _a:return Math.max(i,16)*Math.max(t,8)/4;case pa:case ga:return Math.max(i,8)*Math.max(t,8)/2;case va:case xa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ma:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ya:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Sa:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Ea:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case ba:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Ta:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Aa:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case wa:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Ra:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ca:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Pa:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case La:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Da:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Ia:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Ua:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Ks:case Na:case Fa:return Math.ceil(i/4)*Math.ceil(t/4)*16;case ql:case Oa:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Ba:case ka:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function km(i){switch(i){case gn:case Ol:return{byteLength:1,components:1};case is:case Bl:case as:return{byteLength:2,components:1};case $a:case Ka:return{byteLength:2,components:4};case ri:case Ya:case fn:return{byteLength:4,components:1};case kl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function zm(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new kt,h=new WeakMap;let d;const u=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,y){return m?new OffscreenCanvas(T,y):ir("canvas")}function v(T,y,F){let j=1;const Q=rt(T);if((Q.width>F||Q.height>F)&&(j=F/Math.max(Q.width,Q.height)),j<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const $=Math.floor(j*Q.width),St=Math.floor(j*Q.height);d===void 0&&(d=g($,St));const ot=y?g($,St):d;return ot.width=$,ot.height=St,ot.getContext("2d").drawImage(T,0,0,$,St),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+$+"x"+St+")."),ot}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),T;return T}function f(T){return T.generateMipmaps&&T.minFilter!==He&&T.minFilter!==je}function p(T){i.generateMipmap(T)}function S(T,y,F,j,Q=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let $=y;if(y===i.RED&&(F===i.FLOAT&&($=i.R32F),F===i.HALF_FLOAT&&($=i.R16F),F===i.UNSIGNED_BYTE&&($=i.R8)),y===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&($=i.R8UI),F===i.UNSIGNED_SHORT&&($=i.R16UI),F===i.UNSIGNED_INT&&($=i.R32UI),F===i.BYTE&&($=i.R8I),F===i.SHORT&&($=i.R16I),F===i.INT&&($=i.R32I)),y===i.RG&&(F===i.FLOAT&&($=i.RG32F),F===i.HALF_FLOAT&&($=i.RG16F),F===i.UNSIGNED_BYTE&&($=i.RG8)),y===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&($=i.RG8UI),F===i.UNSIGNED_SHORT&&($=i.RG16UI),F===i.UNSIGNED_INT&&($=i.RG32UI),F===i.BYTE&&($=i.RG8I),F===i.SHORT&&($=i.RG16I),F===i.INT&&($=i.RG32I)),y===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&($=i.RGB8UI),F===i.UNSIGNED_SHORT&&($=i.RGB16UI),F===i.UNSIGNED_INT&&($=i.RGB32UI),F===i.BYTE&&($=i.RGB8I),F===i.SHORT&&($=i.RGB16I),F===i.INT&&($=i.RGB32I)),y===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&($=i.RGBA8UI),F===i.UNSIGNED_SHORT&&($=i.RGBA16UI),F===i.UNSIGNED_INT&&($=i.RGBA32UI),F===i.BYTE&&($=i.RGBA8I),F===i.SHORT&&($=i.RGBA16I),F===i.INT&&($=i.RGBA32I)),y===i.RGB&&F===i.UNSIGNED_INT_5_9_9_9_REV&&($=i.RGB9_E5),y===i.RGBA){const St=Q?Qs:Zt.getTransfer(j);F===i.FLOAT&&($=i.RGBA32F),F===i.HALF_FLOAT&&($=i.RGBA16F),F===i.UNSIGNED_BYTE&&($=St===ee?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&($=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&($=i.RGB5_A1)}return($===i.R16F||$===i.R32F||$===i.RG16F||$===i.RG32F||$===i.RGBA16F||$===i.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function M(T,y){let F;return T?y===null||y===ri||y===Di?F=i.DEPTH24_STENCIL8:y===fn?F=i.DEPTH32F_STENCIL8:y===is&&(F=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===ri||y===Di?F=i.DEPTH_COMPONENT24:y===fn?F=i.DEPTH_COMPONENT32F:y===is&&(F=i.DEPTH_COMPONENT16),F}function x(T,y){return f(T)===!0||T.isFramebufferTexture&&T.minFilter!==He&&T.minFilter!==je?Math.log2(Math.max(y.width,y.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?y.mipmaps.length:1}function R(T){const y=T.target;y.removeEventListener("dispose",R),A(y),y.isVideoTexture&&h.delete(y)}function w(T){const y=T.target;y.removeEventListener("dispose",w),W(y)}function A(T){const y=n.get(T);if(y.__webglInit===void 0)return;const F=T.source,j=u.get(F);if(j){const Q=j[y.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&C(T),Object.keys(j).length===0&&u.delete(F)}n.remove(T)}function C(T){const y=n.get(T);i.deleteTexture(y.__webglTexture);const F=T.source,j=u.get(F);delete j[y.__cacheKey],a.memory.textures--}function W(T){const y=n.get(T);if(T.depthTexture&&T.depthTexture.dispose(),T.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(y.__webglFramebuffer[j]))for(let Q=0;Q<y.__webglFramebuffer[j].length;Q++)i.deleteFramebuffer(y.__webglFramebuffer[j][Q]);else i.deleteFramebuffer(y.__webglFramebuffer[j]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[j])}else{if(Array.isArray(y.__webglFramebuffer))for(let j=0;j<y.__webglFramebuffer.length;j++)i.deleteFramebuffer(y.__webglFramebuffer[j]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let j=0;j<y.__webglColorRenderbuffer.length;j++)y.__webglColorRenderbuffer[j]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[j]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const F=T.textures;for(let j=0,Q=F.length;j<Q;j++){const $=n.get(F[j]);$.__webglTexture&&(i.deleteTexture($.__webglTexture),a.memory.textures--),n.remove(F[j])}n.remove(T)}let _=0;function b(){_=0}function O(){const T=_;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),_+=1,T}function N(T){const y=[];return y.push(T.wrapS),y.push(T.wrapT),y.push(T.wrapR||0),y.push(T.magFilter),y.push(T.minFilter),y.push(T.anisotropy),y.push(T.internalFormat),y.push(T.format),y.push(T.type),y.push(T.generateMipmaps),y.push(T.premultiplyAlpha),y.push(T.flipY),y.push(T.unpackAlignment),y.push(T.colorSpace),y.join()}function X(T,y){const F=n.get(T);if(T.isVideoTexture&&et(T),T.isRenderTargetTexture===!1&&T.version>0&&F.__version!==T.version){const j=T.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Xt(F,T,y);return}}e.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+y)}function Y(T,y){const F=n.get(T);if(T.version>0&&F.__version!==T.version){Xt(F,T,y);return}e.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+y)}function H(T,y){const F=n.get(T);if(T.version>0&&F.__version!==T.version){Xt(F,T,y);return}e.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+y)}function K(T,y){const F=n.get(T);if(T.version>0&&F.__version!==T.version){q(F,T,y);return}e.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+y)}const G={[da]:i.REPEAT,[Qn]:i.CLAMP_TO_EDGE,[fa]:i.MIRRORED_REPEAT},lt={[He]:i.NEAREST,[hh]:i.NEAREST_MIPMAP_NEAREST,[fs]:i.NEAREST_MIPMAP_LINEAR,[je]:i.LINEAR,[vr]:i.LINEAR_MIPMAP_NEAREST,[ti]:i.LINEAR_MIPMAP_LINEAR},ut={[ph]:i.NEVER,[Mh]:i.ALWAYS,[mh]:i.LESS,[$l]:i.LEQUAL,[gh]:i.EQUAL,[xh]:i.GEQUAL,[_h]:i.GREATER,[vh]:i.NOTEQUAL};function xt(T,y){if(y.type===fn&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===je||y.magFilter===vr||y.magFilter===fs||y.magFilter===ti||y.minFilter===je||y.minFilter===vr||y.minFilter===fs||y.minFilter===ti)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,G[y.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,G[y.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,G[y.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,lt[y.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,lt[y.minFilter]),y.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,ut[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===He||y.minFilter!==fs&&y.minFilter!==ti||y.type===fn&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const F=t.get("EXT_texture_filter_anisotropic");i.texParameterf(T,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function zt(T,y){let F=!1;T.__webglInit===void 0&&(T.__webglInit=!0,y.addEventListener("dispose",R));const j=y.source;let Q=u.get(j);Q===void 0&&(Q={},u.set(j,Q));const $=N(y);if($!==T.__cacheKey){Q[$]===void 0&&(Q[$]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,F=!0),Q[$].usedTimes++;const St=Q[T.__cacheKey];St!==void 0&&(Q[T.__cacheKey].usedTimes--,St.usedTimes===0&&C(y)),T.__cacheKey=$,T.__webglTexture=Q[$].texture}return F}function Xt(T,y,F){let j=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(j=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(j=i.TEXTURE_3D);const Q=zt(T,y),$=y.source;e.bindTexture(j,T.__webglTexture,i.TEXTURE0+F);const St=n.get($);if($.version!==St.__version||Q===!0){e.activeTexture(i.TEXTURE0+F);const ot=Zt.getPrimaries(Zt.workingColorSpace),gt=y.colorSpace===wn?null:Zt.getPrimaries(y.colorSpace),Wt=y.colorSpace===wn||ot===gt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Wt);let nt=v(y.image,!1,s.maxTextureSize);nt=st(y,nt);const _t=r.convert(y.format,y.colorSpace),Ct=r.convert(y.type);let Pt=S(y.internalFormat,_t,Ct,y.colorSpace,y.isVideoTexture);xt(j,y);let vt;const Ht=y.mipmaps,Dt=y.isVideoTexture!==!0,Qt=St.__version===void 0||Q===!0,L=$.dataReady,dt=x(y,nt);if(y.isDepthTexture)Pt=M(y.format===Ii,y.type),Qt&&(Dt?e.texStorage2D(i.TEXTURE_2D,1,Pt,nt.width,nt.height):e.texImage2D(i.TEXTURE_2D,0,Pt,nt.width,nt.height,0,_t,Ct,null));else if(y.isDataTexture)if(Ht.length>0){Dt&&Qt&&e.texStorage2D(i.TEXTURE_2D,dt,Pt,Ht[0].width,Ht[0].height);for(let V=0,Z=Ht.length;V<Z;V++)vt=Ht[V],Dt?L&&e.texSubImage2D(i.TEXTURE_2D,V,0,0,vt.width,vt.height,_t,Ct,vt.data):e.texImage2D(i.TEXTURE_2D,V,Pt,vt.width,vt.height,0,_t,Ct,vt.data);y.generateMipmaps=!1}else Dt?(Qt&&e.texStorage2D(i.TEXTURE_2D,dt,Pt,nt.width,nt.height),L&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,nt.width,nt.height,_t,Ct,nt.data)):e.texImage2D(i.TEXTURE_2D,0,Pt,nt.width,nt.height,0,_t,Ct,nt.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Dt&&Qt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,dt,Pt,Ht[0].width,Ht[0].height,nt.depth);for(let V=0,Z=Ht.length;V<Z;V++)if(vt=Ht[V],y.format!==Je)if(_t!==null)if(Dt){if(L)if(y.layerUpdates.size>0){const ct=pl(vt.width,vt.height,y.format,y.type);for(const ft of y.layerUpdates){const Gt=vt.data.subarray(ft*ct/vt.data.BYTES_PER_ELEMENT,(ft+1)*ct/vt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,V,0,0,ft,vt.width,vt.height,1,_t,Gt,0,0)}y.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,V,0,0,0,vt.width,vt.height,nt.depth,_t,vt.data,0,0)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,V,Pt,vt.width,vt.height,nt.depth,0,vt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Dt?L&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,V,0,0,0,vt.width,vt.height,nt.depth,_t,Ct,vt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,V,Pt,vt.width,vt.height,nt.depth,0,_t,Ct,vt.data)}else{Dt&&Qt&&e.texStorage2D(i.TEXTURE_2D,dt,Pt,Ht[0].width,Ht[0].height);for(let V=0,Z=Ht.length;V<Z;V++)vt=Ht[V],y.format!==Je?_t!==null?Dt?L&&e.compressedTexSubImage2D(i.TEXTURE_2D,V,0,0,vt.width,vt.height,_t,vt.data):e.compressedTexImage2D(i.TEXTURE_2D,V,Pt,vt.width,vt.height,0,vt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Dt?L&&e.texSubImage2D(i.TEXTURE_2D,V,0,0,vt.width,vt.height,_t,Ct,vt.data):e.texImage2D(i.TEXTURE_2D,V,Pt,vt.width,vt.height,0,_t,Ct,vt.data)}else if(y.isDataArrayTexture)if(Dt){if(Qt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,dt,Pt,nt.width,nt.height,nt.depth),L)if(y.layerUpdates.size>0){const V=pl(nt.width,nt.height,y.format,y.type);for(const Z of y.layerUpdates){const ct=nt.data.subarray(Z*V/nt.data.BYTES_PER_ELEMENT,(Z+1)*V/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Z,nt.width,nt.height,1,_t,Ct,ct)}y.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,_t,Ct,nt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Pt,nt.width,nt.height,nt.depth,0,_t,Ct,nt.data);else if(y.isData3DTexture)Dt?(Qt&&e.texStorage3D(i.TEXTURE_3D,dt,Pt,nt.width,nt.height,nt.depth),L&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,_t,Ct,nt.data)):e.texImage3D(i.TEXTURE_3D,0,Pt,nt.width,nt.height,nt.depth,0,_t,Ct,nt.data);else if(y.isFramebufferTexture){if(Qt)if(Dt)e.texStorage2D(i.TEXTURE_2D,dt,Pt,nt.width,nt.height);else{let V=nt.width,Z=nt.height;for(let ct=0;ct<dt;ct++)e.texImage2D(i.TEXTURE_2D,ct,Pt,V,Z,0,_t,Ct,null),V>>=1,Z>>=1}}else if(Ht.length>0){if(Dt&&Qt){const V=rt(Ht[0]);e.texStorage2D(i.TEXTURE_2D,dt,Pt,V.width,V.height)}for(let V=0,Z=Ht.length;V<Z;V++)vt=Ht[V],Dt?L&&e.texSubImage2D(i.TEXTURE_2D,V,0,0,_t,Ct,vt):e.texImage2D(i.TEXTURE_2D,V,Pt,_t,Ct,vt);y.generateMipmaps=!1}else if(Dt){if(Qt){const V=rt(nt);e.texStorage2D(i.TEXTURE_2D,dt,Pt,V.width,V.height)}L&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,_t,Ct,nt)}else e.texImage2D(i.TEXTURE_2D,0,Pt,_t,Ct,nt);f(y)&&p(j),St.__version=$.version,y.onUpdate&&y.onUpdate(y)}T.__version=y.version}function q(T,y,F){if(y.image.length!==6)return;const j=zt(T,y),Q=y.source;e.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+F);const $=n.get(Q);if(Q.version!==$.__version||j===!0){e.activeTexture(i.TEXTURE0+F);const St=Zt.getPrimaries(Zt.workingColorSpace),ot=y.colorSpace===wn?null:Zt.getPrimaries(y.colorSpace),gt=y.colorSpace===wn||St===ot?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,gt);const Wt=y.isCompressedTexture||y.image[0].isCompressedTexture,nt=y.image[0]&&y.image[0].isDataTexture,_t=[];for(let Z=0;Z<6;Z++)!Wt&&!nt?_t[Z]=v(y.image[Z],!0,s.maxCubemapSize):_t[Z]=nt?y.image[Z].image:y.image[Z],_t[Z]=st(y,_t[Z]);const Ct=_t[0],Pt=r.convert(y.format,y.colorSpace),vt=r.convert(y.type),Ht=S(y.internalFormat,Pt,vt,y.colorSpace),Dt=y.isVideoTexture!==!0,Qt=$.__version===void 0||j===!0,L=Q.dataReady;let dt=x(y,Ct);xt(i.TEXTURE_CUBE_MAP,y);let V;if(Wt){Dt&&Qt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,dt,Ht,Ct.width,Ct.height);for(let Z=0;Z<6;Z++){V=_t[Z].mipmaps;for(let ct=0;ct<V.length;ct++){const ft=V[ct];y.format!==Je?Pt!==null?Dt?L&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ct,0,0,ft.width,ft.height,Pt,ft.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ct,Ht,ft.width,ft.height,0,ft.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Dt?L&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ct,0,0,ft.width,ft.height,Pt,vt,ft.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ct,Ht,ft.width,ft.height,0,Pt,vt,ft.data)}}}else{if(V=y.mipmaps,Dt&&Qt){V.length>0&&dt++;const Z=rt(_t[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,dt,Ht,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(nt){Dt?L&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,_t[Z].width,_t[Z].height,Pt,vt,_t[Z].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ht,_t[Z].width,_t[Z].height,0,Pt,vt,_t[Z].data);for(let ct=0;ct<V.length;ct++){const Gt=V[ct].image[Z].image;Dt?L&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ct+1,0,0,Gt.width,Gt.height,Pt,vt,Gt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ct+1,Ht,Gt.width,Gt.height,0,Pt,vt,Gt.data)}}else{Dt?L&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Pt,vt,_t[Z]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ht,Pt,vt,_t[Z]);for(let ct=0;ct<V.length;ct++){const ft=V[ct];Dt?L&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ct+1,0,0,Pt,vt,ft.image[Z]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ct+1,Ht,Pt,vt,ft.image[Z])}}}f(y)&&p(i.TEXTURE_CUBE_MAP),$.__version=Q.version,y.onUpdate&&y.onUpdate(y)}T.__version=y.version}function tt(T,y,F,j,Q,$){const St=r.convert(F.format,F.colorSpace),ot=r.convert(F.type),gt=S(F.internalFormat,St,ot,F.colorSpace);if(!n.get(y).__hasExternalTextures){const nt=Math.max(1,y.width>>$),_t=Math.max(1,y.height>>$);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?e.texImage3D(Q,$,gt,nt,_t,y.depth,0,St,ot,null):e.texImage2D(Q,$,gt,nt,_t,0,St,ot,null)}e.bindFramebuffer(i.FRAMEBUFFER,T),J(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,Q,n.get(F).__webglTexture,0,z(y)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,j,Q,n.get(F).__webglTexture,$),e.bindFramebuffer(i.FRAMEBUFFER,null)}function mt(T,y,F){if(i.bindRenderbuffer(i.RENDERBUFFER,T),y.depthBuffer){const j=y.depthTexture,Q=j&&j.isDepthTexture?j.type:null,$=M(y.stencilBuffer,Q),St=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=z(y);J(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ot,$,y.width,y.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,ot,$,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,$,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,St,i.RENDERBUFFER,T)}else{const j=y.textures;for(let Q=0;Q<j.length;Q++){const $=j[Q],St=r.convert($.format,$.colorSpace),ot=r.convert($.type),gt=S($.internalFormat,St,ot,$.colorSpace),Wt=z(y);F&&J(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Wt,gt,y.width,y.height):J(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Wt,gt,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,gt,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function pt(T,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,T),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(y.depthTexture).__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),X(y.depthTexture,0);const j=n.get(y.depthTexture).__webglTexture,Q=z(y);if(y.depthTexture.format===Ai)J(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,j,0,Q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,j,0);else if(y.depthTexture.format===Ii)J(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,j,0,Q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function Rt(T){const y=n.get(T),F=T.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==T.depthTexture){const j=T.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),j){const Q=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,j.removeEventListener("dispose",Q)};j.addEventListener("dispose",Q),y.__depthDisposeCallback=Q}y.__boundDepthTexture=j}if(T.depthTexture&&!y.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");pt(y.__webglFramebuffer,T)}else if(F){y.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[j]),y.__webglDepthbuffer[j]===void 0)y.__webglDepthbuffer[j]=i.createRenderbuffer(),mt(y.__webglDepthbuffer[j],T,!1);else{const Q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,$=y.__webglDepthbuffer[j];i.bindRenderbuffer(i.RENDERBUFFER,$),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,$)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),mt(y.__webglDepthbuffer,T,!1);else{const j=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Q=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Q),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,Q)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Tt(T,y,F){const j=n.get(T);y!==void 0&&tt(j.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&Rt(T)}function Ot(T){const y=T.texture,F=n.get(T),j=n.get(y);T.addEventListener("dispose",w);const Q=T.textures,$=T.isWebGLCubeRenderTarget===!0,St=Q.length>1;if(St||(j.__webglTexture===void 0&&(j.__webglTexture=i.createTexture()),j.__version=y.version,a.memory.textures++),$){F.__webglFramebuffer=[];for(let ot=0;ot<6;ot++)if(y.mipmaps&&y.mipmaps.length>0){F.__webglFramebuffer[ot]=[];for(let gt=0;gt<y.mipmaps.length;gt++)F.__webglFramebuffer[ot][gt]=i.createFramebuffer()}else F.__webglFramebuffer[ot]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){F.__webglFramebuffer=[];for(let ot=0;ot<y.mipmaps.length;ot++)F.__webglFramebuffer[ot]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(St)for(let ot=0,gt=Q.length;ot<gt;ot++){const Wt=n.get(Q[ot]);Wt.__webglTexture===void 0&&(Wt.__webglTexture=i.createTexture(),a.memory.textures++)}if(T.samples>0&&J(T)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let ot=0;ot<Q.length;ot++){const gt=Q[ot];F.__webglColorRenderbuffer[ot]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[ot]);const Wt=r.convert(gt.format,gt.colorSpace),nt=r.convert(gt.type),_t=S(gt.internalFormat,Wt,nt,gt.colorSpace,T.isXRRenderTarget===!0),Ct=z(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ct,_t,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ot,i.RENDERBUFFER,F.__webglColorRenderbuffer[ot])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),mt(F.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if($){e.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture),xt(i.TEXTURE_CUBE_MAP,y);for(let ot=0;ot<6;ot++)if(y.mipmaps&&y.mipmaps.length>0)for(let gt=0;gt<y.mipmaps.length;gt++)tt(F.__webglFramebuffer[ot][gt],T,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,gt);else tt(F.__webglFramebuffer[ot],T,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0);f(y)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(St){for(let ot=0,gt=Q.length;ot<gt;ot++){const Wt=Q[ot],nt=n.get(Wt);e.bindTexture(i.TEXTURE_2D,nt.__webglTexture),xt(i.TEXTURE_2D,Wt),tt(F.__webglFramebuffer,T,Wt,i.COLOR_ATTACHMENT0+ot,i.TEXTURE_2D,0),f(Wt)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let ot=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ot=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ot,j.__webglTexture),xt(ot,y),y.mipmaps&&y.mipmaps.length>0)for(let gt=0;gt<y.mipmaps.length;gt++)tt(F.__webglFramebuffer[gt],T,y,i.COLOR_ATTACHMENT0,ot,gt);else tt(F.__webglFramebuffer,T,y,i.COLOR_ATTACHMENT0,ot,0);f(y)&&p(ot),e.unbindTexture()}T.depthBuffer&&Rt(T)}function qt(T){const y=T.textures;for(let F=0,j=y.length;F<j;F++){const Q=y[F];if(f(Q)){const $=T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,St=n.get(Q).__webglTexture;e.bindTexture($,St),p($),e.unbindTexture()}}}const Bt=[],P=[];function ye(T){if(T.samples>0){if(J(T)===!1){const y=T.textures,F=T.width,j=T.height;let Q=i.COLOR_BUFFER_BIT;const $=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,St=n.get(T),ot=y.length>1;if(ot)for(let gt=0;gt<y.length;gt++)e.bindFramebuffer(i.FRAMEBUFFER,St.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,St.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,St.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,St.__webglFramebuffer);for(let gt=0;gt<y.length;gt++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),ot){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,St.__webglColorRenderbuffer[gt]);const Wt=n.get(y[gt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Wt,0)}i.blitFramebuffer(0,0,F,j,0,0,F,j,Q,i.NEAREST),l===!0&&(Bt.length=0,P.length=0,Bt.push(i.COLOR_ATTACHMENT0+gt),T.depthBuffer&&T.resolveDepthBuffer===!1&&(Bt.push($),P.push($),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,P)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Bt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ot)for(let gt=0;gt<y.length;gt++){e.bindFramebuffer(i.FRAMEBUFFER,St.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.RENDERBUFFER,St.__webglColorRenderbuffer[gt]);const Wt=n.get(y[gt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,St.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.TEXTURE_2D,Wt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,St.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const y=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function z(T){return Math.min(s.maxSamples,T.samples)}function J(T){const y=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function et(T){const y=a.render.frame;h.get(T)!==y&&(h.set(T,y),T.update())}function st(T,y){const F=T.colorSpace,j=T.format,Q=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||F!==kn&&F!==wn&&(Zt.getTransfer(F)===ee?(j!==Je||Q!==gn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),y}function rt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=b,this.setTexture2D=X,this.setTexture2DArray=Y,this.setTexture3D=H,this.setTextureCube=K,this.rebindTextures=Tt,this.setupRenderTarget=Ot,this.updateRenderTargetMipmap=qt,this.updateMultisampleRenderTarget=ye,this.setupDepthRenderbuffer=Rt,this.setupFrameBufferTexture=tt,this.useMultisampledRTT=J}function Hm(i,t){function e(n,s=wn){let r;const a=Zt.getTransfer(s);if(n===gn)return i.UNSIGNED_BYTE;if(n===$a)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ka)return i.UNSIGNED_SHORT_5_5_5_1;if(n===kl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ol)return i.BYTE;if(n===Bl)return i.SHORT;if(n===is)return i.UNSIGNED_SHORT;if(n===Ya)return i.INT;if(n===ri)return i.UNSIGNED_INT;if(n===fn)return i.FLOAT;if(n===as)return i.HALF_FLOAT;if(n===zl)return i.ALPHA;if(n===Hl)return i.RGB;if(n===Je)return i.RGBA;if(n===Gl)return i.LUMINANCE;if(n===Vl)return i.LUMINANCE_ALPHA;if(n===Ai)return i.DEPTH_COMPONENT;if(n===Ii)return i.DEPTH_STENCIL;if(n===Wl)return i.RED;if(n===ja)return i.RED_INTEGER;if(n===Xl)return i.RG;if(n===Za)return i.RG_INTEGER;if(n===Ja)return i.RGBA_INTEGER;if(n===Xs||n===qs||n===Ys||n===$s)if(a===ee)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Xs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===qs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ys)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===$s)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Xs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===qs)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ys)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===$s)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===pa||n===ma||n===ga||n===_a)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===pa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ma)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ga)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===_a)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===va||n===xa||n===Ma)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===va||n===xa)return a===ee?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ma)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ya||n===Sa||n===Ea||n===ba||n===Ta||n===Aa||n===wa||n===Ra||n===Ca||n===Pa||n===La||n===Da||n===Ia||n===Ua)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ya)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Sa)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ea)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ba)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ta)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Aa)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===wa)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ra)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ca)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Pa)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===La)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Da)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ia)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ua)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ks||n===Na||n===Fa)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Ks)return a===ee?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Na)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Fa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ql||n===Oa||n===Ba||n===ka)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ks)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Oa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ba)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ka)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Di?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class Gm extends Ke{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class mn extends he{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Vm={type:"move"};class qr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new mn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new mn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new mn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const v of t.hand.values()){const f=e.getJointPose(v,n),p=this._getHandJoint(c,v);f!==null&&(p.matrix.fromArray(f.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=f.radius),p.visible=f!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),m=.02,g=.005;c.inputState.pinching&&u>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Vm)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new mn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Wm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Xm=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class qm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new Ae,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new On({vertexShader:Wm,fragmentShader:Xm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Vt(new Bn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Ym extends Oi{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,m=null,g=null;const v=new qm,f=e.getContextAttributes();let p=null,S=null;const M=[],x=[],R=new kt;let w=null;const A=new Ke;A.layers.enable(1),A.viewport=new re;const C=new Ke;C.layers.enable(2),C.viewport=new re;const W=[A,C],_=new Gm;_.layers.enable(1),_.layers.enable(2);let b=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let tt=M[q];return tt===void 0&&(tt=new qr,M[q]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(q){let tt=M[q];return tt===void 0&&(tt=new qr,M[q]=tt),tt.getGripSpace()},this.getHand=function(q){let tt=M[q];return tt===void 0&&(tt=new qr,M[q]=tt),tt.getHandSpace()};function N(q){const tt=x.indexOf(q.inputSource);if(tt===-1)return;const mt=M[tt];mt!==void 0&&(mt.update(q.inputSource,q.frame,c||a),mt.dispatchEvent({type:q.type,data:q.inputSource}))}function X(){s.removeEventListener("select",N),s.removeEventListener("selectstart",N),s.removeEventListener("selectend",N),s.removeEventListener("squeeze",N),s.removeEventListener("squeezestart",N),s.removeEventListener("squeezeend",N),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",Y);for(let q=0;q<M.length;q++){const tt=x[q];tt!==null&&(x[q]=null,M[q].disconnect(tt))}b=null,O=null,v.reset(),t.setRenderTarget(p),m=null,u=null,d=null,s=null,S=null,Xt.stop(),n.isPresenting=!1,t.setPixelRatio(w),t.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return u!==null?u:m},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",N),s.addEventListener("selectstart",N),s.addEventListener("selectend",N),s.addEventListener("squeeze",N),s.addEventListener("squeezestart",N),s.addEventListener("squeezeend",N),s.addEventListener("end",X),s.addEventListener("inputsourceschange",Y),f.xrCompatible!==!0&&await e.makeXRCompatible(),w=t.getPixelRatio(),t.getSize(R),s.renderState.layers===void 0){const tt={antialias:f.antialias,alpha:!0,depth:f.depth,stencil:f.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,e,tt),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),S=new ai(m.framebufferWidth,m.framebufferHeight,{format:Je,type:gn,colorSpace:t.outputColorSpace,stencilBuffer:f.stencil})}else{let tt=null,mt=null,pt=null;f.depth&&(pt=f.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,tt=f.stencil?Ii:Ai,mt=f.stencil?Di:ri);const Rt={colorFormat:e.RGBA8,depthFormat:pt,scaleFactor:r};d=new XRWebGLBinding(s,e),u=d.createProjectionLayer(Rt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),S=new ai(u.textureWidth,u.textureHeight,{format:Je,type:gn,depthTexture:new rc(u.textureWidth,u.textureHeight,mt,void 0,void 0,void 0,void 0,void 0,void 0,tt),stencilBuffer:f.stencil,colorSpace:t.outputColorSpace,samples:f.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Xt.setContext(s),Xt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function Y(q){for(let tt=0;tt<q.removed.length;tt++){const mt=q.removed[tt],pt=x.indexOf(mt);pt>=0&&(x[pt]=null,M[pt].disconnect(mt))}for(let tt=0;tt<q.added.length;tt++){const mt=q.added[tt];let pt=x.indexOf(mt);if(pt===-1){for(let Tt=0;Tt<M.length;Tt++)if(Tt>=x.length){x.push(mt),pt=Tt;break}else if(x[Tt]===null){x[Tt]=mt,pt=Tt;break}if(pt===-1)break}const Rt=M[pt];Rt&&Rt.connect(mt)}}const H=new U,K=new U;function G(q,tt,mt){H.setFromMatrixPosition(tt.matrixWorld),K.setFromMatrixPosition(mt.matrixWorld);const pt=H.distanceTo(K),Rt=tt.projectionMatrix.elements,Tt=mt.projectionMatrix.elements,Ot=Rt[14]/(Rt[10]-1),qt=Rt[14]/(Rt[10]+1),Bt=(Rt[9]+1)/Rt[5],P=(Rt[9]-1)/Rt[5],ye=(Rt[8]-1)/Rt[0],z=(Tt[8]+1)/Tt[0],J=Ot*ye,et=Ot*z,st=pt/(-ye+z),rt=st*-ye;if(tt.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(rt),q.translateZ(st),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),Rt[10]===-1)q.projectionMatrix.copy(tt.projectionMatrix),q.projectionMatrixInverse.copy(tt.projectionMatrixInverse);else{const T=Ot+st,y=qt+st,F=J-rt,j=et+(pt-rt),Q=Bt*qt/y*T,$=P*qt/y*T;q.projectionMatrix.makePerspective(F,j,Q,$,T,y),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function lt(q,tt){tt===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(tt.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let tt=q.near,mt=q.far;v.texture!==null&&(v.depthNear>0&&(tt=v.depthNear),v.depthFar>0&&(mt=v.depthFar)),_.near=C.near=A.near=tt,_.far=C.far=A.far=mt,(b!==_.near||O!==_.far)&&(s.updateRenderState({depthNear:_.near,depthFar:_.far}),b=_.near,O=_.far);const pt=q.parent,Rt=_.cameras;lt(_,pt);for(let Tt=0;Tt<Rt.length;Tt++)lt(Rt[Tt],pt);Rt.length===2?G(_,A,C):_.projectionMatrix.copy(A.projectionMatrix),ut(q,_,pt)};function ut(q,tt,mt){mt===null?q.matrix.copy(tt.matrixWorld):(q.matrix.copy(mt.matrixWorld),q.matrix.invert(),q.matrix.multiply(tt.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(tt.projectionMatrix),q.projectionMatrixInverse.copy(tt.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=ss*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(u===null&&m===null))return l},this.setFoveation=function(q){l=q,u!==null&&(u.fixedFoveation=q),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=q)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(_)};let xt=null;function zt(q,tt){if(h=tt.getViewerPose(c||a),g=tt,h!==null){const mt=h.views;m!==null&&(t.setRenderTargetFramebuffer(S,m.framebuffer),t.setRenderTarget(S));let pt=!1;mt.length!==_.cameras.length&&(_.cameras.length=0,pt=!0);for(let Tt=0;Tt<mt.length;Tt++){const Ot=mt[Tt];let qt=null;if(m!==null)qt=m.getViewport(Ot);else{const P=d.getViewSubImage(u,Ot);qt=P.viewport,Tt===0&&(t.setRenderTargetTextures(S,P.colorTexture,u.ignoreDepthValues?void 0:P.depthStencilTexture),t.setRenderTarget(S))}let Bt=W[Tt];Bt===void 0&&(Bt=new Ke,Bt.layers.enable(Tt),Bt.viewport=new re,W[Tt]=Bt),Bt.matrix.fromArray(Ot.transform.matrix),Bt.matrix.decompose(Bt.position,Bt.quaternion,Bt.scale),Bt.projectionMatrix.fromArray(Ot.projectionMatrix),Bt.projectionMatrixInverse.copy(Bt.projectionMatrix).invert(),Bt.viewport.set(qt.x,qt.y,qt.width,qt.height),Tt===0&&(_.matrix.copy(Bt.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),pt===!0&&_.cameras.push(Bt)}const Rt=s.enabledFeatures;if(Rt&&Rt.includes("depth-sensing")){const Tt=d.getDepthInformation(mt[0]);Tt&&Tt.isValid&&Tt.texture&&v.init(t,Tt,s.renderState)}}for(let mt=0;mt<M.length;mt++){const pt=x[mt],Rt=M[mt];pt!==null&&Rt!==void 0&&Rt.update(pt,tt,c||a)}xt&&xt(q,tt),tt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:tt}),g=null}const Xt=new sc;Xt.setAnimationLoop(zt),this.setAnimationLoop=function(q){xt=q},this.dispose=function(){}}}const qn=new nn,$m=new ne;function Km(i,t){function e(f,p){f.matrixAutoUpdate===!0&&f.updateMatrix(),p.value.copy(f.matrix)}function n(f,p){p.color.getRGB(f.fogColor.value,ec(i)),p.isFog?(f.fogNear.value=p.near,f.fogFar.value=p.far):p.isFogExp2&&(f.fogDensity.value=p.density)}function s(f,p,S,M,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(f,p):p.isMeshToonMaterial?(r(f,p),d(f,p)):p.isMeshPhongMaterial?(r(f,p),h(f,p)):p.isMeshStandardMaterial?(r(f,p),u(f,p),p.isMeshPhysicalMaterial&&m(f,p,x)):p.isMeshMatcapMaterial?(r(f,p),g(f,p)):p.isMeshDepthMaterial?r(f,p):p.isMeshDistanceMaterial?(r(f,p),v(f,p)):p.isMeshNormalMaterial?r(f,p):p.isLineBasicMaterial?(a(f,p),p.isLineDashedMaterial&&o(f,p)):p.isPointsMaterial?l(f,p,S,M):p.isSpriteMaterial?c(f,p):p.isShadowMaterial?(f.color.value.copy(p.color),f.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(f,p){f.opacity.value=p.opacity,p.color&&f.diffuse.value.copy(p.color),p.emissive&&f.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(f.map.value=p.map,e(p.map,f.mapTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,e(p.alphaMap,f.alphaMapTransform)),p.bumpMap&&(f.bumpMap.value=p.bumpMap,e(p.bumpMap,f.bumpMapTransform),f.bumpScale.value=p.bumpScale,p.side===Pe&&(f.bumpScale.value*=-1)),p.normalMap&&(f.normalMap.value=p.normalMap,e(p.normalMap,f.normalMapTransform),f.normalScale.value.copy(p.normalScale),p.side===Pe&&f.normalScale.value.negate()),p.displacementMap&&(f.displacementMap.value=p.displacementMap,e(p.displacementMap,f.displacementMapTransform),f.displacementScale.value=p.displacementScale,f.displacementBias.value=p.displacementBias),p.emissiveMap&&(f.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,f.emissiveMapTransform)),p.specularMap&&(f.specularMap.value=p.specularMap,e(p.specularMap,f.specularMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest);const S=t.get(p),M=S.envMap,x=S.envMapRotation;M&&(f.envMap.value=M,qn.copy(x),qn.x*=-1,qn.y*=-1,qn.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(qn.y*=-1,qn.z*=-1),f.envMapRotation.value.setFromMatrix4($m.makeRotationFromEuler(qn)),f.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,f.reflectivity.value=p.reflectivity,f.ior.value=p.ior,f.refractionRatio.value=p.refractionRatio),p.lightMap&&(f.lightMap.value=p.lightMap,f.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,f.lightMapTransform)),p.aoMap&&(f.aoMap.value=p.aoMap,f.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,f.aoMapTransform))}function a(f,p){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,p.map&&(f.map.value=p.map,e(p.map,f.mapTransform))}function o(f,p){f.dashSize.value=p.dashSize,f.totalSize.value=p.dashSize+p.gapSize,f.scale.value=p.scale}function l(f,p,S,M){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,f.size.value=p.size*S,f.scale.value=M*.5,p.map&&(f.map.value=p.map,e(p.map,f.uvTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,e(p.alphaMap,f.alphaMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest)}function c(f,p){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,f.rotation.value=p.rotation,p.map&&(f.map.value=p.map,e(p.map,f.mapTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,e(p.alphaMap,f.alphaMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest)}function h(f,p){f.specular.value.copy(p.specular),f.shininess.value=Math.max(p.shininess,1e-4)}function d(f,p){p.gradientMap&&(f.gradientMap.value=p.gradientMap)}function u(f,p){f.metalness.value=p.metalness,p.metalnessMap&&(f.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,f.metalnessMapTransform)),f.roughness.value=p.roughness,p.roughnessMap&&(f.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,f.roughnessMapTransform)),p.envMap&&(f.envMapIntensity.value=p.envMapIntensity)}function m(f,p,S){f.ior.value=p.ior,p.sheen>0&&(f.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),f.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(f.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,f.sheenColorMapTransform)),p.sheenRoughnessMap&&(f.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,f.sheenRoughnessMapTransform))),p.clearcoat>0&&(f.clearcoat.value=p.clearcoat,f.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(f.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,f.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(f.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Pe&&f.clearcoatNormalScale.value.negate())),p.dispersion>0&&(f.dispersion.value=p.dispersion),p.iridescence>0&&(f.iridescence.value=p.iridescence,f.iridescenceIOR.value=p.iridescenceIOR,f.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(f.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,f.iridescenceMapTransform)),p.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),p.transmission>0&&(f.transmission.value=p.transmission,f.transmissionSamplerMap.value=S.texture,f.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(f.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,f.transmissionMapTransform)),f.thickness.value=p.thickness,p.thicknessMap&&(f.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=p.attenuationDistance,f.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(f.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(f.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=p.specularIntensity,f.specularColor.value.copy(p.specularColor),p.specularColorMap&&(f.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,f.specularColorMapTransform)),p.specularIntensityMap&&(f.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,f.specularIntensityMapTransform))}function g(f,p){p.matcap&&(f.matcap.value=p.matcap)}function v(f,p){const S=t.get(p).light;f.referencePosition.value.setFromMatrixPosition(S.matrixWorld),f.nearDistance.value=S.shadow.camera.near,f.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function jm(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,M){const x=M.program;n.uniformBlockBinding(S,x)}function c(S,M){let x=s[S.id];x===void 0&&(g(S),x=h(S),s[S.id]=x,S.addEventListener("dispose",f));const R=M.program;n.updateUBOMapping(S,R);const w=t.render.frame;r[S.id]!==w&&(u(S),r[S.id]=w)}function h(S){const M=d();S.__bindingPointIndex=M;const x=i.createBuffer(),R=S.__size,w=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,R,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,x),x}function d(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(S){const M=s[S.id],x=S.uniforms,R=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let w=0,A=x.length;w<A;w++){const C=Array.isArray(x[w])?x[w]:[x[w]];for(let W=0,_=C.length;W<_;W++){const b=C[W];if(m(b,w,W,R)===!0){const O=b.__offset,N=Array.isArray(b.value)?b.value:[b.value];let X=0;for(let Y=0;Y<N.length;Y++){const H=N[Y],K=v(H);typeof H=="number"||typeof H=="boolean"?(b.__data[0]=H,i.bufferSubData(i.UNIFORM_BUFFER,O+X,b.__data)):H.isMatrix3?(b.__data[0]=H.elements[0],b.__data[1]=H.elements[1],b.__data[2]=H.elements[2],b.__data[3]=0,b.__data[4]=H.elements[3],b.__data[5]=H.elements[4],b.__data[6]=H.elements[5],b.__data[7]=0,b.__data[8]=H.elements[6],b.__data[9]=H.elements[7],b.__data[10]=H.elements[8],b.__data[11]=0):(H.toArray(b.__data,X),X+=K.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,O,b.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(S,M,x,R){const w=S.value,A=M+"_"+x;if(R[A]===void 0)return typeof w=="number"||typeof w=="boolean"?R[A]=w:R[A]=w.clone(),!0;{const C=R[A];if(typeof w=="number"||typeof w=="boolean"){if(C!==w)return R[A]=w,!0}else if(C.equals(w)===!1)return C.copy(w),!0}return!1}function g(S){const M=S.uniforms;let x=0;const R=16;for(let A=0,C=M.length;A<C;A++){const W=Array.isArray(M[A])?M[A]:[M[A]];for(let _=0,b=W.length;_<b;_++){const O=W[_],N=Array.isArray(O.value)?O.value:[O.value];for(let X=0,Y=N.length;X<Y;X++){const H=N[X],K=v(H),G=x%R,lt=G%K.boundary,ut=G+lt;x+=lt,ut!==0&&R-ut<K.storage&&(x+=R-ut),O.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=x,x+=K.storage}}}const w=x%R;return w>0&&(x+=R-w),S.__size=x,S.__cache={},this}function v(S){const M={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(M.boundary=4,M.storage=4):S.isVector2?(M.boundary=8,M.storage=8):S.isVector3||S.isColor?(M.boundary=16,M.storage=12):S.isVector4?(M.boundary=16,M.storage=16):S.isMatrix3?(M.boundary=48,M.storage=48):S.isMatrix4?(M.boundary=64,M.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),M}function f(S){const M=S.target;M.removeEventListener("dispose",f);const x=a.indexOf(M.__bindingPointIndex);a.splice(x,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function p(){for(const S in s)i.deleteBuffer(s[S]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}class Zm{constructor(t={}){const{canvas:e=Oh(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=t;this.isWebGLRenderer=!0;let u;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");u=n.getContextAttributes().alpha}else u=a;const m=new Uint32Array(4),g=new Int32Array(4);let v=null,f=null;const p=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ce,this.toneMapping=Ln,this.toneMappingExposure=1;const M=this;let x=!1,R=0,w=0,A=null,C=-1,W=null;const _=new re,b=new re;let O=null;const N=new It(0);let X=0,Y=e.width,H=e.height,K=1,G=null,lt=null;const ut=new re(0,0,Y,H),xt=new re(0,0,Y,H);let zt=!1;const Xt=new no;let q=!1,tt=!1;const mt=new ne,pt=new ne,Rt=new U,Tt=new re,Ot={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let qt=!1;function Bt(){return A===null?K:1}let P=n;function ye(E,D){return e.getContext(E,D)}try{const E={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${qa}`),e.addEventListener("webglcontextlost",Z,!1),e.addEventListener("webglcontextrestored",ct,!1),e.addEventListener("webglcontextcreationerror",ft,!1),P===null){const D="webgl2";if(P=ye(D,E),P===null)throw ye(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let z,J,et,st,rt,T,y,F,j,Q,$,St,ot,gt,Wt,nt,_t,Ct,Pt,vt,Ht,Dt,Qt,L;function dt(){z=new np(P),z.init(),Dt=new Hm(P,z),J=new jf(P,z,t,Dt),et=new Bm(P),J.reverseDepthBuffer&&et.buffers.depth.setReversed(!0),st=new rp(P),rt=new Em,T=new zm(P,z,et,rt,J,Dt,st),y=new Jf(M),F=new ep(M),j=new uu(P),Qt=new $f(P,j),Q=new ip(P,j,st,Qt),$=new op(P,Q,j,st),Pt=new ap(P,J,T),nt=new Zf(rt),St=new Sm(M,y,F,z,J,Qt,nt),ot=new Km(M,rt),gt=new Tm,Wt=new Lm(z),Ct=new Yf(M,y,F,et,$,u,l),_t=new Fm(M,$,J),L=new jm(P,st,J,et),vt=new Kf(P,z,st),Ht=new sp(P,z,st),st.programs=St.programs,M.capabilities=J,M.extensions=z,M.properties=rt,M.renderLists=gt,M.shadowMap=_t,M.state=et,M.info=st}dt();const V=new Ym(M,P);this.xr=V,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const E=z.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=z.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(E){E!==void 0&&(K=E,this.setSize(Y,H,!1))},this.getSize=function(E){return E.set(Y,H)},this.setSize=function(E,D,B=!0){if(V.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=E,H=D,e.width=Math.floor(E*K),e.height=Math.floor(D*K),B===!0&&(e.style.width=E+"px",e.style.height=D+"px"),this.setViewport(0,0,E,D)},this.getDrawingBufferSize=function(E){return E.set(Y*K,H*K).floor()},this.setDrawingBufferSize=function(E,D,B){Y=E,H=D,K=B,e.width=Math.floor(E*B),e.height=Math.floor(D*B),this.setViewport(0,0,E,D)},this.getCurrentViewport=function(E){return E.copy(_)},this.getViewport=function(E){return E.copy(ut)},this.setViewport=function(E,D,B,k){E.isVector4?ut.set(E.x,E.y,E.z,E.w):ut.set(E,D,B,k),et.viewport(_.copy(ut).multiplyScalar(K).round())},this.getScissor=function(E){return E.copy(xt)},this.setScissor=function(E,D,B,k){E.isVector4?xt.set(E.x,E.y,E.z,E.w):xt.set(E,D,B,k),et.scissor(b.copy(xt).multiplyScalar(K).round())},this.getScissorTest=function(){return zt},this.setScissorTest=function(E){et.setScissorTest(zt=E)},this.setOpaqueSort=function(E){G=E},this.setTransparentSort=function(E){lt=E},this.getClearColor=function(E){return E.copy(Ct.getClearColor())},this.setClearColor=function(){Ct.setClearColor.apply(Ct,arguments)},this.getClearAlpha=function(){return Ct.getClearAlpha()},this.setClearAlpha=function(){Ct.setClearAlpha.apply(Ct,arguments)},this.clear=function(E=!0,D=!0,B=!0){let k=0;if(E){let I=!1;if(A!==null){const it=A.texture.format;I=it===Ja||it===Za||it===ja}if(I){const it=A.texture.type,ht=it===gn||it===ri||it===is||it===Di||it===$a||it===Ka,Mt=Ct.getClearColor(),yt=Ct.getClearAlpha(),At=Mt.r,wt=Mt.g,Et=Mt.b;ht?(m[0]=At,m[1]=wt,m[2]=Et,m[3]=yt,P.clearBufferuiv(P.COLOR,0,m)):(g[0]=At,g[1]=wt,g[2]=Et,g[3]=yt,P.clearBufferiv(P.COLOR,0,g))}else k|=P.COLOR_BUFFER_BIT}D&&(k|=P.DEPTH_BUFFER_BIT,P.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),B&&(k|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Z,!1),e.removeEventListener("webglcontextrestored",ct,!1),e.removeEventListener("webglcontextcreationerror",ft,!1),gt.dispose(),Wt.dispose(),rt.dispose(),y.dispose(),F.dispose(),$.dispose(),Qt.dispose(),L.dispose(),St.dispose(),V.dispose(),V.removeEventListener("sessionstart",fo),V.removeEventListener("sessionend",po),zn.stop()};function Z(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),x=!0}function ct(){console.log("THREE.WebGLRenderer: Context Restored."),x=!1;const E=st.autoReset,D=_t.enabled,B=_t.autoUpdate,k=_t.needsUpdate,I=_t.type;dt(),st.autoReset=E,_t.enabled=D,_t.autoUpdate=B,_t.needsUpdate=k,_t.type=I}function ft(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Gt(E){const D=E.target;D.removeEventListener("dispose",Gt),oe(D)}function oe(E){we(E),rt.remove(E)}function we(E){const D=rt.get(E).programs;D!==void 0&&(D.forEach(function(B){St.releaseProgram(B)}),E.isShaderMaterial&&St.releaseShaderCache(E))}this.renderBufferDirect=function(E,D,B,k,I,it){D===null&&(D=Ot);const ht=I.isMesh&&I.matrixWorld.determinant()<0,Mt=Dc(E,D,B,k,I);et.setMaterial(k,ht);let yt=B.index,At=1;if(k.wireframe===!0){if(yt=Q.getWireframeAttribute(B),yt===void 0)return;At=2}const wt=B.drawRange,Et=B.attributes.position;let Jt=wt.start*At,te=(wt.start+wt.count)*At;it!==null&&(Jt=Math.max(Jt,it.start*At),te=Math.min(te,(it.start+it.count)*At)),yt!==null?(Jt=Math.max(Jt,0),te=Math.min(te,yt.count)):Et!=null&&(Jt=Math.max(Jt,0),te=Math.min(te,Et.count));const se=te-Jt;if(se<0||se===1/0)return;Qt.setup(I,k,Mt,B,yt);let Le,Kt=vt;if(yt!==null&&(Le=j.get(yt),Kt=Ht,Kt.setIndex(Le)),I.isMesh)k.wireframe===!0?(et.setLineWidth(k.wireframeLinewidth*Bt()),Kt.setMode(P.LINES)):Kt.setMode(P.TRIANGLES);else if(I.isLine){let bt=k.linewidth;bt===void 0&&(bt=1),et.setLineWidth(bt*Bt()),I.isLineSegments?Kt.setMode(P.LINES):I.isLineLoop?Kt.setMode(P.LINE_LOOP):Kt.setMode(P.LINE_STRIP)}else I.isPoints?Kt.setMode(P.POINTS):I.isSprite&&Kt.setMode(P.TRIANGLES);if(I.isBatchedMesh)if(I._multiDrawInstances!==null)Kt.renderMultiDrawInstances(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount,I._multiDrawInstances);else if(z.get("WEBGL_multi_draw"))Kt.renderMultiDraw(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount);else{const bt=I._multiDrawStarts,me=I._multiDrawCounts,jt=I._multiDrawCount,Ge=yt?j.get(yt).bytesPerElement:1,li=rt.get(k).currentProgram.getUniforms();for(let De=0;De<jt;De++)li.setValue(P,"_gl_DrawID",De),Kt.render(bt[De]/Ge,me[De])}else if(I.isInstancedMesh)Kt.renderInstances(Jt,se,I.count);else if(B.isInstancedBufferGeometry){const bt=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,me=Math.min(B.instanceCount,bt);Kt.renderInstances(Jt,se,me)}else Kt.render(Jt,se)};function Yt(E,D,B){E.transparent===!0&&E.side===tn&&E.forceSinglePass===!1?(E.side=Pe,E.needsUpdate=!0,ds(E,D,B),E.side=Nn,E.needsUpdate=!0,ds(E,D,B),E.side=tn):ds(E,D,B)}this.compile=function(E,D,B=null){B===null&&(B=E),f=Wt.get(B),f.init(D),S.push(f),B.traverseVisible(function(I){I.isLight&&I.layers.test(D.layers)&&(f.pushLight(I),I.castShadow&&f.pushShadow(I))}),E!==B&&E.traverseVisible(function(I){I.isLight&&I.layers.test(D.layers)&&(f.pushLight(I),I.castShadow&&f.pushShadow(I))}),f.setupLights();const k=new Set;return E.traverse(function(I){if(!(I.isMesh||I.isPoints||I.isLine||I.isSprite))return;const it=I.material;if(it)if(Array.isArray(it))for(let ht=0;ht<it.length;ht++){const Mt=it[ht];Yt(Mt,B,I),k.add(Mt)}else Yt(it,B,I),k.add(it)}),S.pop(),f=null,k},this.compileAsync=function(E,D,B=null){const k=this.compile(E,D,B);return new Promise(I=>{function it(){if(k.forEach(function(ht){rt.get(ht).currentProgram.isReady()&&k.delete(ht)}),k.size===0){I(E);return}setTimeout(it,10)}z.get("KHR_parallel_shader_compile")!==null?it():setTimeout(it,10)})};let Re=null;function sn(E){Re&&Re(E)}function fo(){zn.stop()}function po(){zn.start()}const zn=new sc;zn.setAnimationLoop(sn),typeof self<"u"&&zn.setContext(self),this.setAnimationLoop=function(E){Re=E,V.setAnimationLoop(E),E===null?zn.stop():zn.start()},V.addEventListener("sessionstart",fo),V.addEventListener("sessionend",po),this.render=function(E,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(x===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),V.enabled===!0&&V.isPresenting===!0&&(V.cameraAutoUpdate===!0&&V.updateCamera(D),D=V.getCamera()),E.isScene===!0&&E.onBeforeRender(M,E,D,A),f=Wt.get(E,S.length),f.init(D),S.push(f),pt.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Xt.setFromProjectionMatrix(pt),tt=this.localClippingEnabled,q=nt.init(this.clippingPlanes,tt),v=gt.get(E,p.length),v.init(),p.push(v),V.enabled===!0&&V.isPresenting===!0){const it=M.xr.getDepthSensingMesh();it!==null&&pr(it,D,-1/0,M.sortObjects)}pr(E,D,0,M.sortObjects),v.finish(),M.sortObjects===!0&&v.sort(G,lt),qt=V.enabled===!1||V.isPresenting===!1||V.hasDepthSensing()===!1,qt&&Ct.addToRenderList(v,E),this.info.render.frame++,q===!0&&nt.beginShadows();const B=f.state.shadowsArray;_t.render(B,E,D),q===!0&&nt.endShadows(),this.info.autoReset===!0&&this.info.reset();const k=v.opaque,I=v.transmissive;if(f.setupLights(),D.isArrayCamera){const it=D.cameras;if(I.length>0)for(let ht=0,Mt=it.length;ht<Mt;ht++){const yt=it[ht];go(k,I,E,yt)}qt&&Ct.render(E);for(let ht=0,Mt=it.length;ht<Mt;ht++){const yt=it[ht];mo(v,E,yt,yt.viewport)}}else I.length>0&&go(k,I,E,D),qt&&Ct.render(E),mo(v,E,D);A!==null&&(T.updateMultisampleRenderTarget(A),T.updateRenderTargetMipmap(A)),E.isScene===!0&&E.onAfterRender(M,E,D),Qt.resetDefaultState(),C=-1,W=null,S.pop(),S.length>0?(f=S[S.length-1],q===!0&&nt.setGlobalState(M.clippingPlanes,f.state.camera)):f=null,p.pop(),p.length>0?v=p[p.length-1]:v=null};function pr(E,D,B,k){if(E.visible===!1)return;if(E.layers.test(D.layers)){if(E.isGroup)B=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(D);else if(E.isLight)f.pushLight(E),E.castShadow&&f.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Xt.intersectsSprite(E)){k&&Tt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(pt);const ht=$.update(E),Mt=E.material;Mt.visible&&v.push(E,ht,Mt,B,Tt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Xt.intersectsObject(E))){const ht=$.update(E),Mt=E.material;if(k&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Tt.copy(E.boundingSphere.center)):(ht.boundingSphere===null&&ht.computeBoundingSphere(),Tt.copy(ht.boundingSphere.center)),Tt.applyMatrix4(E.matrixWorld).applyMatrix4(pt)),Array.isArray(Mt)){const yt=ht.groups;for(let At=0,wt=yt.length;At<wt;At++){const Et=yt[At],Jt=Mt[Et.materialIndex];Jt&&Jt.visible&&v.push(E,ht,Jt,B,Tt.z,Et)}}else Mt.visible&&v.push(E,ht,Mt,B,Tt.z,null)}}const it=E.children;for(let ht=0,Mt=it.length;ht<Mt;ht++)pr(it[ht],D,B,k)}function mo(E,D,B,k){const I=E.opaque,it=E.transmissive,ht=E.transparent;f.setupLightsView(B),q===!0&&nt.setGlobalState(M.clippingPlanes,B),k&&et.viewport(_.copy(k)),I.length>0&&us(I,D,B),it.length>0&&us(it,D,B),ht.length>0&&us(ht,D,B),et.buffers.depth.setTest(!0),et.buffers.depth.setMask(!0),et.buffers.color.setMask(!0),et.setPolygonOffset(!1)}function go(E,D,B,k){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[k.id]===void 0&&(f.state.transmissionRenderTarget[k.id]=new ai(1,1,{generateMipmaps:!0,type:z.has("EXT_color_buffer_half_float")||z.has("EXT_color_buffer_float")?as:gn,minFilter:ti,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Zt.workingColorSpace}));const it=f.state.transmissionRenderTarget[k.id],ht=k.viewport||_;it.setSize(ht.z,ht.w);const Mt=M.getRenderTarget();M.setRenderTarget(it),M.getClearColor(N),X=M.getClearAlpha(),X<1&&M.setClearColor(16777215,.5),M.clear(),qt&&Ct.render(B);const yt=M.toneMapping;M.toneMapping=Ln;const At=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),f.setupLightsView(k),q===!0&&nt.setGlobalState(M.clippingPlanes,k),us(E,B,k),T.updateMultisampleRenderTarget(it),T.updateRenderTargetMipmap(it),z.has("WEBGL_multisampled_render_to_texture")===!1){let wt=!1;for(let Et=0,Jt=D.length;Et<Jt;Et++){const te=D[Et],se=te.object,Le=te.geometry,Kt=te.material,bt=te.group;if(Kt.side===tn&&se.layers.test(k.layers)){const me=Kt.side;Kt.side=Pe,Kt.needsUpdate=!0,_o(se,B,k,Le,Kt,bt),Kt.side=me,Kt.needsUpdate=!0,wt=!0}}wt===!0&&(T.updateMultisampleRenderTarget(it),T.updateRenderTargetMipmap(it))}M.setRenderTarget(Mt),M.setClearColor(N,X),At!==void 0&&(k.viewport=At),M.toneMapping=yt}function us(E,D,B){const k=D.isScene===!0?D.overrideMaterial:null;for(let I=0,it=E.length;I<it;I++){const ht=E[I],Mt=ht.object,yt=ht.geometry,At=k===null?ht.material:k,wt=ht.group;Mt.layers.test(B.layers)&&_o(Mt,D,B,yt,At,wt)}}function _o(E,D,B,k,I,it){E.onBeforeRender(M,D,B,k,I,it),E.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),I.onBeforeRender(M,D,B,k,E,it),I.transparent===!0&&I.side===tn&&I.forceSinglePass===!1?(I.side=Pe,I.needsUpdate=!0,M.renderBufferDirect(B,D,k,I,E,it),I.side=Nn,I.needsUpdate=!0,M.renderBufferDirect(B,D,k,I,E,it),I.side=tn):M.renderBufferDirect(B,D,k,I,E,it),E.onAfterRender(M,D,B,k,I,it)}function ds(E,D,B){D.isScene!==!0&&(D=Ot);const k=rt.get(E),I=f.state.lights,it=f.state.shadowsArray,ht=I.state.version,Mt=St.getParameters(E,I.state,it,D,B),yt=St.getProgramCacheKey(Mt);let At=k.programs;k.environment=E.isMeshStandardMaterial?D.environment:null,k.fog=D.fog,k.envMap=(E.isMeshStandardMaterial?F:y).get(E.envMap||k.environment),k.envMapRotation=k.environment!==null&&E.envMap===null?D.environmentRotation:E.envMapRotation,At===void 0&&(E.addEventListener("dispose",Gt),At=new Map,k.programs=At);let wt=At.get(yt);if(wt!==void 0){if(k.currentProgram===wt&&k.lightsStateVersion===ht)return xo(E,Mt),wt}else Mt.uniforms=St.getUniforms(E),E.onBeforeCompile(Mt,M),wt=St.acquireProgram(Mt,yt),At.set(yt,wt),k.uniforms=Mt.uniforms;const Et=k.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Et.clippingPlanes=nt.uniform),xo(E,Mt),k.needsLights=Uc(E),k.lightsStateVersion=ht,k.needsLights&&(Et.ambientLightColor.value=I.state.ambient,Et.lightProbe.value=I.state.probe,Et.directionalLights.value=I.state.directional,Et.directionalLightShadows.value=I.state.directionalShadow,Et.spotLights.value=I.state.spot,Et.spotLightShadows.value=I.state.spotShadow,Et.rectAreaLights.value=I.state.rectArea,Et.ltc_1.value=I.state.rectAreaLTC1,Et.ltc_2.value=I.state.rectAreaLTC2,Et.pointLights.value=I.state.point,Et.pointLightShadows.value=I.state.pointShadow,Et.hemisphereLights.value=I.state.hemi,Et.directionalShadowMap.value=I.state.directionalShadowMap,Et.directionalShadowMatrix.value=I.state.directionalShadowMatrix,Et.spotShadowMap.value=I.state.spotShadowMap,Et.spotLightMatrix.value=I.state.spotLightMatrix,Et.spotLightMap.value=I.state.spotLightMap,Et.pointShadowMap.value=I.state.pointShadowMap,Et.pointShadowMatrix.value=I.state.pointShadowMatrix),k.currentProgram=wt,k.uniformsList=null,wt}function vo(E){if(E.uniformsList===null){const D=E.currentProgram.getUniforms();E.uniformsList=Zs.seqWithValue(D.seq,E.uniforms)}return E.uniformsList}function xo(E,D){const B=rt.get(E);B.outputColorSpace=D.outputColorSpace,B.batching=D.batching,B.batchingColor=D.batchingColor,B.instancing=D.instancing,B.instancingColor=D.instancingColor,B.instancingMorph=D.instancingMorph,B.skinning=D.skinning,B.morphTargets=D.morphTargets,B.morphNormals=D.morphNormals,B.morphColors=D.morphColors,B.morphTargetsCount=D.morphTargetsCount,B.numClippingPlanes=D.numClippingPlanes,B.numIntersection=D.numClipIntersection,B.vertexAlphas=D.vertexAlphas,B.vertexTangents=D.vertexTangents,B.toneMapping=D.toneMapping}function Dc(E,D,B,k,I){D.isScene!==!0&&(D=Ot),T.resetTextureUnits();const it=D.fog,ht=k.isMeshStandardMaterial?D.environment:null,Mt=A===null?M.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:kn,yt=(k.isMeshStandardMaterial?F:y).get(k.envMap||ht),At=k.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,wt=!!B.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Et=!!B.morphAttributes.position,Jt=!!B.morphAttributes.normal,te=!!B.morphAttributes.color;let se=Ln;k.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(se=M.toneMapping);const Le=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Kt=Le!==void 0?Le.length:0,bt=rt.get(k),me=f.state.lights;if(q===!0&&(tt===!0||E!==W)){const Oe=E===W&&k.id===C;nt.setState(k,E,Oe)}let jt=!1;k.version===bt.__version?(bt.needsLights&&bt.lightsStateVersion!==me.state.version||bt.outputColorSpace!==Mt||I.isBatchedMesh&&bt.batching===!1||!I.isBatchedMesh&&bt.batching===!0||I.isBatchedMesh&&bt.batchingColor===!0&&I.colorTexture===null||I.isBatchedMesh&&bt.batchingColor===!1&&I.colorTexture!==null||I.isInstancedMesh&&bt.instancing===!1||!I.isInstancedMesh&&bt.instancing===!0||I.isSkinnedMesh&&bt.skinning===!1||!I.isSkinnedMesh&&bt.skinning===!0||I.isInstancedMesh&&bt.instancingColor===!0&&I.instanceColor===null||I.isInstancedMesh&&bt.instancingColor===!1&&I.instanceColor!==null||I.isInstancedMesh&&bt.instancingMorph===!0&&I.morphTexture===null||I.isInstancedMesh&&bt.instancingMorph===!1&&I.morphTexture!==null||bt.envMap!==yt||k.fog===!0&&bt.fog!==it||bt.numClippingPlanes!==void 0&&(bt.numClippingPlanes!==nt.numPlanes||bt.numIntersection!==nt.numIntersection)||bt.vertexAlphas!==At||bt.vertexTangents!==wt||bt.morphTargets!==Et||bt.morphNormals!==Jt||bt.morphColors!==te||bt.toneMapping!==se||bt.morphTargetsCount!==Kt)&&(jt=!0):(jt=!0,bt.__version=k.version);let Ge=bt.currentProgram;jt===!0&&(Ge=ds(k,D,I));let li=!1,De=!1,mr=!1;const ae=Ge.getUniforms(),_n=bt.uniforms;if(et.useProgram(Ge.program)&&(li=!0,De=!0,mr=!0),k.id!==C&&(C=k.id,De=!0),li||W!==E){J.reverseDepthBuffer?(mt.copy(E.projectionMatrix),kh(mt),zh(mt),ae.setValue(P,"projectionMatrix",mt)):ae.setValue(P,"projectionMatrix",E.projectionMatrix),ae.setValue(P,"viewMatrix",E.matrixWorldInverse);const Oe=ae.map.cameraPosition;Oe!==void 0&&Oe.setValue(P,Rt.setFromMatrixPosition(E.matrixWorld)),J.logarithmicDepthBuffer&&ae.setValue(P,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&ae.setValue(P,"isOrthographic",E.isOrthographicCamera===!0),W!==E&&(W=E,De=!0,mr=!0)}if(I.isSkinnedMesh){ae.setOptional(P,I,"bindMatrix"),ae.setOptional(P,I,"bindMatrixInverse");const Oe=I.skeleton;Oe&&(Oe.boneTexture===null&&Oe.computeBoneTexture(),ae.setValue(P,"boneTexture",Oe.boneTexture,T))}I.isBatchedMesh&&(ae.setOptional(P,I,"batchingTexture"),ae.setValue(P,"batchingTexture",I._matricesTexture,T),ae.setOptional(P,I,"batchingIdTexture"),ae.setValue(P,"batchingIdTexture",I._indirectTexture,T),ae.setOptional(P,I,"batchingColorTexture"),I._colorsTexture!==null&&ae.setValue(P,"batchingColorTexture",I._colorsTexture,T));const gr=B.morphAttributes;if((gr.position!==void 0||gr.normal!==void 0||gr.color!==void 0)&&Pt.update(I,B,Ge),(De||bt.receiveShadow!==I.receiveShadow)&&(bt.receiveShadow=I.receiveShadow,ae.setValue(P,"receiveShadow",I.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(_n.envMap.value=yt,_n.flipEnvMap.value=yt.isCubeTexture&&yt.isRenderTargetTexture===!1?-1:1),k.isMeshStandardMaterial&&k.envMap===null&&D.environment!==null&&(_n.envMapIntensity.value=D.environmentIntensity),De&&(ae.setValue(P,"toneMappingExposure",M.toneMappingExposure),bt.needsLights&&Ic(_n,mr),it&&k.fog===!0&&ot.refreshFogUniforms(_n,it),ot.refreshMaterialUniforms(_n,k,K,H,f.state.transmissionRenderTarget[E.id]),Zs.upload(P,vo(bt),_n,T)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(Zs.upload(P,vo(bt),_n,T),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&ae.setValue(P,"center",I.center),ae.setValue(P,"modelViewMatrix",I.modelViewMatrix),ae.setValue(P,"normalMatrix",I.normalMatrix),ae.setValue(P,"modelMatrix",I.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){const Oe=k.uniformsGroups;for(let _r=0,Nc=Oe.length;_r<Nc;_r++){const Mo=Oe[_r];L.update(Mo,Ge),L.bind(Mo,Ge)}}return Ge}function Ic(E,D){E.ambientLightColor.needsUpdate=D,E.lightProbe.needsUpdate=D,E.directionalLights.needsUpdate=D,E.directionalLightShadows.needsUpdate=D,E.pointLights.needsUpdate=D,E.pointLightShadows.needsUpdate=D,E.spotLights.needsUpdate=D,E.spotLightShadows.needsUpdate=D,E.rectAreaLights.needsUpdate=D,E.hemisphereLights.needsUpdate=D}function Uc(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(E,D,B){rt.get(E.texture).__webglTexture=D,rt.get(E.depthTexture).__webglTexture=B;const k=rt.get(E);k.__hasExternalTextures=!0,k.__autoAllocateDepthBuffer=B===void 0,k.__autoAllocateDepthBuffer||z.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),k.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,D){const B=rt.get(E);B.__webglFramebuffer=D,B.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(E,D=0,B=0){A=E,R=D,w=B;let k=!0,I=null,it=!1,ht=!1;if(E){const yt=rt.get(E);if(yt.__useDefaultFramebuffer!==void 0)et.bindFramebuffer(P.FRAMEBUFFER,null),k=!1;else if(yt.__webglFramebuffer===void 0)T.setupRenderTarget(E);else if(yt.__hasExternalTextures)T.rebindTextures(E,rt.get(E.texture).__webglTexture,rt.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Et=E.depthTexture;if(yt.__boundDepthTexture!==Et){if(Et!==null&&rt.has(Et)&&(E.width!==Et.image.width||E.height!==Et.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(E)}}const At=E.texture;(At.isData3DTexture||At.isDataArrayTexture||At.isCompressedArrayTexture)&&(ht=!0);const wt=rt.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(wt[D])?I=wt[D][B]:I=wt[D],it=!0):E.samples>0&&T.useMultisampledRTT(E)===!1?I=rt.get(E).__webglMultisampledFramebuffer:Array.isArray(wt)?I=wt[B]:I=wt,_.copy(E.viewport),b.copy(E.scissor),O=E.scissorTest}else _.copy(ut).multiplyScalar(K).floor(),b.copy(xt).multiplyScalar(K).floor(),O=zt;if(et.bindFramebuffer(P.FRAMEBUFFER,I)&&k&&et.drawBuffers(E,I),et.viewport(_),et.scissor(b),et.setScissorTest(O),it){const yt=rt.get(E.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+D,yt.__webglTexture,B)}else if(ht){const yt=rt.get(E.texture),At=D||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,yt.__webglTexture,B||0,At)}C=-1},this.readRenderTargetPixels=function(E,D,B,k,I,it,ht){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Mt=rt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ht!==void 0&&(Mt=Mt[ht]),Mt){et.bindFramebuffer(P.FRAMEBUFFER,Mt);try{const yt=E.texture,At=yt.format,wt=yt.type;if(!J.textureFormatReadable(At)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!J.textureTypeReadable(wt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=E.width-k&&B>=0&&B<=E.height-I&&P.readPixels(D,B,k,I,Dt.convert(At),Dt.convert(wt),it)}finally{const yt=A!==null?rt.get(A).__webglFramebuffer:null;et.bindFramebuffer(P.FRAMEBUFFER,yt)}}},this.readRenderTargetPixelsAsync=async function(E,D,B,k,I,it,ht){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Mt=rt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ht!==void 0&&(Mt=Mt[ht]),Mt){const yt=E.texture,At=yt.format,wt=yt.type;if(!J.textureFormatReadable(At))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!J.textureTypeReadable(wt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(D>=0&&D<=E.width-k&&B>=0&&B<=E.height-I){et.bindFramebuffer(P.FRAMEBUFFER,Mt);const Et=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Et),P.bufferData(P.PIXEL_PACK_BUFFER,it.byteLength,P.STREAM_READ),P.readPixels(D,B,k,I,Dt.convert(At),Dt.convert(wt),0);const Jt=A!==null?rt.get(A).__webglFramebuffer:null;et.bindFramebuffer(P.FRAMEBUFFER,Jt);const te=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Bh(P,te,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Et),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,it),P.deleteBuffer(Et),P.deleteSync(te),it}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,D=null,B=0){E.isTexture!==!0&&(js("WebGLRenderer: copyFramebufferToTexture function signature has changed."),D=arguments[0]||null,E=arguments[1]);const k=Math.pow(2,-B),I=Math.floor(E.image.width*k),it=Math.floor(E.image.height*k),ht=D!==null?D.x:0,Mt=D!==null?D.y:0;T.setTexture2D(E,0),P.copyTexSubImage2D(P.TEXTURE_2D,B,0,0,ht,Mt,I,it),et.unbindTexture()},this.copyTextureToTexture=function(E,D,B=null,k=null,I=0){E.isTexture!==!0&&(js("WebGLRenderer: copyTextureToTexture function signature has changed."),k=arguments[0]||null,E=arguments[1],D=arguments[2],I=arguments[3]||0,B=null);let it,ht,Mt,yt,At,wt;B!==null?(it=B.max.x-B.min.x,ht=B.max.y-B.min.y,Mt=B.min.x,yt=B.min.y):(it=E.image.width,ht=E.image.height,Mt=0,yt=0),k!==null?(At=k.x,wt=k.y):(At=0,wt=0);const Et=Dt.convert(D.format),Jt=Dt.convert(D.type);T.setTexture2D(D,0),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,D.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,D.unpackAlignment);const te=P.getParameter(P.UNPACK_ROW_LENGTH),se=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Le=P.getParameter(P.UNPACK_SKIP_PIXELS),Kt=P.getParameter(P.UNPACK_SKIP_ROWS),bt=P.getParameter(P.UNPACK_SKIP_IMAGES),me=E.isCompressedTexture?E.mipmaps[I]:E.image;P.pixelStorei(P.UNPACK_ROW_LENGTH,me.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,me.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Mt),P.pixelStorei(P.UNPACK_SKIP_ROWS,yt),E.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,I,At,wt,it,ht,Et,Jt,me.data):E.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,I,At,wt,me.width,me.height,Et,me.data):P.texSubImage2D(P.TEXTURE_2D,I,At,wt,it,ht,Et,Jt,me),P.pixelStorei(P.UNPACK_ROW_LENGTH,te),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,se),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Le),P.pixelStorei(P.UNPACK_SKIP_ROWS,Kt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,bt),I===0&&D.generateMipmaps&&P.generateMipmap(P.TEXTURE_2D),et.unbindTexture()},this.copyTextureToTexture3D=function(E,D,B=null,k=null,I=0){E.isTexture!==!0&&(js("WebGLRenderer: copyTextureToTexture3D function signature has changed."),B=arguments[0]||null,k=arguments[1]||null,E=arguments[2],D=arguments[3],I=arguments[4]||0);let it,ht,Mt,yt,At,wt,Et,Jt,te;const se=E.isCompressedTexture?E.mipmaps[I]:E.image;B!==null?(it=B.max.x-B.min.x,ht=B.max.y-B.min.y,Mt=B.max.z-B.min.z,yt=B.min.x,At=B.min.y,wt=B.min.z):(it=se.width,ht=se.height,Mt=se.depth,yt=0,At=0,wt=0),k!==null?(Et=k.x,Jt=k.y,te=k.z):(Et=0,Jt=0,te=0);const Le=Dt.convert(D.format),Kt=Dt.convert(D.type);let bt;if(D.isData3DTexture)T.setTexture3D(D,0),bt=P.TEXTURE_3D;else if(D.isDataArrayTexture||D.isCompressedArrayTexture)T.setTexture2DArray(D,0),bt=P.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,D.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,D.unpackAlignment);const me=P.getParameter(P.UNPACK_ROW_LENGTH),jt=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Ge=P.getParameter(P.UNPACK_SKIP_PIXELS),li=P.getParameter(P.UNPACK_SKIP_ROWS),De=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,se.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,se.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,yt),P.pixelStorei(P.UNPACK_SKIP_ROWS,At),P.pixelStorei(P.UNPACK_SKIP_IMAGES,wt),E.isDataTexture||E.isData3DTexture?P.texSubImage3D(bt,I,Et,Jt,te,it,ht,Mt,Le,Kt,se.data):D.isCompressedArrayTexture?P.compressedTexSubImage3D(bt,I,Et,Jt,te,it,ht,Mt,Le,se.data):P.texSubImage3D(bt,I,Et,Jt,te,it,ht,Mt,Le,Kt,se),P.pixelStorei(P.UNPACK_ROW_LENGTH,me),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,jt),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Ge),P.pixelStorei(P.UNPACK_SKIP_ROWS,li),P.pixelStorei(P.UNPACK_SKIP_IMAGES,De),I===0&&D.generateMipmaps&&P.generateMipmap(bt),et.unbindTexture()},this.initRenderTarget=function(E){rt.get(E).__webglFramebuffer===void 0&&T.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?T.setTextureCube(E,0):E.isData3DTexture?T.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?T.setTexture2DArray(E,0):T.setTexture2D(E,0),et.unbindTexture()},this.resetState=function(){R=0,w=0,A=null,et.reset(),Qt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return pn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===Qa?"display-p3":"srgb",e.unpackColorSpace=Zt.workingColorSpace===cr?"display-p3":"srgb"}}class ro{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new It(t),this.near=e,this.far=n}clone(){return new ro(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Jm extends he{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new nn,this.environmentIntensity=1,this.environmentRotation=new nn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class hc extends oi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new It(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const sr=new U,rr=new U,ml=new ne,qi=new hr,Ns=new cs,Yr=new U,gl=new U;class Qm extends he{constructor(t=new Me,e=new hc){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)sr.fromBufferAttribute(e,s-1),rr.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=sr.distanceTo(rr);t.setAttribute("lineDistance",new ie(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ns.copy(n.boundingSphere),Ns.applyMatrix4(s),Ns.radius+=r,t.ray.intersectsSphere(Ns)===!1)return;ml.copy(s).invert(),qi.copy(t.ray).applyMatrix4(ml);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const m=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let v=m,f=g-1;v<f;v+=c){const p=h.getX(v),S=h.getX(v+1),M=Fs(this,t,qi,l,p,S);M&&e.push(M)}if(this.isLineLoop){const v=h.getX(g-1),f=h.getX(m),p=Fs(this,t,qi,l,v,f);p&&e.push(p)}}else{const m=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let v=m,f=g-1;v<f;v+=c){const p=Fs(this,t,qi,l,v,v+1);p&&e.push(p)}if(this.isLineLoop){const v=Fs(this,t,qi,l,g-1,m);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Fs(i,t,e,n,s,r){const a=i.geometry.attributes.position;if(sr.fromBufferAttribute(a,s),rr.fromBufferAttribute(a,r),e.distanceSqToSegment(sr,rr,Yr,gl)>n)return;Yr.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Yr);if(!(l<t.near||l>t.far))return{distance:l,point:gl.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}class uc extends oi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new It(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const _l=new ne,Ha=new hr,Os=new cs,Bs=new U;class tg extends he{constructor(t=new Me,e=new uc){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Os.copy(n.boundingSphere),Os.applyMatrix4(s),Os.radius+=r,t.ray.intersectsSphere(Os)===!1)return;_l.copy(s).invert(),Ha.copy(t.ray).applyMatrix4(_l);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){const u=Math.max(0,a.start),m=Math.min(c.count,a.start+a.count);for(let g=u,v=m;g<v;g++){const f=c.getX(g);Bs.fromBufferAttribute(d,f),vl(Bs,f,l,s,t,e,this)}}else{const u=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let g=u,v=m;g<v;g++)Bs.fromBufferAttribute(d,g),vl(Bs,g,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function vl(i,t,e,n,s,r,a){const o=Ha.distanceSqToPoint(i);if(o<e){const l=new U;Ha.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class dr extends Ae{constructor(t,e,n,s,r,a,o,l,c){super(t,e,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ii extends Me{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],a=[],o=[],l=[],c=new U,h=new kt;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){const m=n+d/e*s;c.x=t*Math.cos(m),c.y=t*Math.sin(m),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/t+1)/2,h.y=(a[u+1]/t+1)/2,l.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new ie(a,3)),this.setAttribute("normal",new ie(o,3)),this.setAttribute("uv",new ie(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ii(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Ni extends Me{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],d=[],u=[],m=[];let g=0;const v=[],f=n/2;let p=0;S(),a===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new ie(d,3)),this.setAttribute("normal",new ie(u,3)),this.setAttribute("uv",new ie(m,2));function S(){const x=new U,R=new U;let w=0;const A=(e-t)/n;for(let C=0;C<=r;C++){const W=[],_=C/r,b=_*(e-t)+t;for(let O=0;O<=s;O++){const N=O/s,X=N*l+o,Y=Math.sin(X),H=Math.cos(X);R.x=b*Y,R.y=-_*n+f,R.z=b*H,d.push(R.x,R.y,R.z),x.set(Y,A,H).normalize(),u.push(x.x,x.y,x.z),m.push(N,1-_),W.push(g++)}v.push(W)}for(let C=0;C<s;C++)for(let W=0;W<r;W++){const _=v[W][C],b=v[W+1][C],O=v[W+1][C+1],N=v[W][C+1];t>0&&(h.push(_,b,N),w+=3),e>0&&(h.push(b,O,N),w+=3)}c.addGroup(p,w,0),p+=w}function M(x){const R=g,w=new kt,A=new U;let C=0;const W=x===!0?t:e,_=x===!0?1:-1;for(let O=1;O<=s;O++)d.push(0,f*_,0),u.push(0,_,0),m.push(.5,.5),g++;const b=g;for(let O=0;O<=s;O++){const X=O/s*l+o,Y=Math.cos(X),H=Math.sin(X);A.x=W*H,A.y=f*_,A.z=W*Y,d.push(A.x,A.y,A.z),u.push(0,_,0),w.x=Y*.5+.5,w.y=H*.5*_+.5,m.push(w.x,w.y),g++}for(let O=0;O<s;O++){const N=R+O,X=b+O;x===!0?h.push(X,X+1,N):h.push(X+1,X,N),C+=3}c.addGroup(p,C,x===!0?1:2),p+=C}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ni(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ao extends Me{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],a=[];o(s),c(n),h(),this.setAttribute("position",new ie(r,3)),this.setAttribute("normal",new ie(r.slice(),3)),this.setAttribute("uv",new ie(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(S){const M=new U,x=new U,R=new U;for(let w=0;w<e.length;w+=3)m(e[w+0],M),m(e[w+1],x),m(e[w+2],R),l(M,x,R,S)}function l(S,M,x,R){const w=R+1,A=[];for(let C=0;C<=w;C++){A[C]=[];const W=S.clone().lerp(x,C/w),_=M.clone().lerp(x,C/w),b=w-C;for(let O=0;O<=b;O++)O===0&&C===w?A[C][O]=W:A[C][O]=W.clone().lerp(_,O/b)}for(let C=0;C<w;C++)for(let W=0;W<2*(w-C)-1;W++){const _=Math.floor(W/2);W%2===0?(u(A[C][_+1]),u(A[C+1][_]),u(A[C][_])):(u(A[C][_+1]),u(A[C+1][_+1]),u(A[C+1][_]))}}function c(S){const M=new U;for(let x=0;x<r.length;x+=3)M.x=r[x+0],M.y=r[x+1],M.z=r[x+2],M.normalize().multiplyScalar(S),r[x+0]=M.x,r[x+1]=M.y,r[x+2]=M.z}function h(){const S=new U;for(let M=0;M<r.length;M+=3){S.x=r[M+0],S.y=r[M+1],S.z=r[M+2];const x=f(S)/2/Math.PI+.5,R=p(S)/Math.PI+.5;a.push(x,1-R)}g(),d()}function d(){for(let S=0;S<a.length;S+=6){const M=a[S+0],x=a[S+2],R=a[S+4],w=Math.max(M,x,R),A=Math.min(M,x,R);w>.9&&A<.1&&(M<.2&&(a[S+0]+=1),x<.2&&(a[S+2]+=1),R<.2&&(a[S+4]+=1))}}function u(S){r.push(S.x,S.y,S.z)}function m(S,M){const x=S*3;M.x=t[x+0],M.y=t[x+1],M.z=t[x+2]}function g(){const S=new U,M=new U,x=new U,R=new U,w=new kt,A=new kt,C=new kt;for(let W=0,_=0;W<r.length;W+=9,_+=6){S.set(r[W+0],r[W+1],r[W+2]),M.set(r[W+3],r[W+4],r[W+5]),x.set(r[W+6],r[W+7],r[W+8]),w.set(a[_+0],a[_+1]),A.set(a[_+2],a[_+3]),C.set(a[_+4],a[_+5]),R.copy(S).add(M).add(x).divideScalar(3);const b=f(R);v(w,_+0,S,b),v(A,_+2,M,b),v(C,_+4,x,b)}}function v(S,M,x,R){R<0&&S.x===1&&(a[M]=S.x-1),x.x===0&&x.z===0&&(a[M]=R/2/Math.PI+.5)}function f(S){return Math.atan2(S.z,-S.x)}function p(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ao(t.vertices,t.indices,t.radius,t.details)}}class fr extends ao{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new fr(t.radius,t.detail)}}class ar extends Me{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],d=new U,u=new U,m=[],g=[],v=[],f=[];for(let p=0;p<=n;p++){const S=[],M=p/n;let x=0;p===0&&a===0?x=.5/e:p===n&&l===Math.PI&&(x=-.5/e);for(let R=0;R<=e;R++){const w=R/e;d.x=-t*Math.cos(s+w*r)*Math.sin(a+M*o),d.y=t*Math.cos(a+M*o),d.z=t*Math.sin(s+w*r)*Math.sin(a+M*o),g.push(d.x,d.y,d.z),u.copy(d).normalize(),v.push(u.x,u.y,u.z),f.push(w+x,1-M),S.push(c++)}h.push(S)}for(let p=0;p<n;p++)for(let S=0;S<e;S++){const M=h[p][S+1],x=h[p][S],R=h[p+1][S],w=h[p+1][S+1];(p!==0||a>0)&&m.push(M,x,w),(p!==n-1||l<Math.PI)&&m.push(x,R,w)}this.setIndex(m),this.setAttribute("position",new ie(g,3)),this.setAttribute("normal",new ie(v,3)),this.setAttribute("uv",new ie(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ar(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Fi extends Me{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],l=[],c=[],h=new U,d=new U,u=new U;for(let m=0;m<=n;m++)for(let g=0;g<=s;g++){const v=g/s*r,f=m/n*Math.PI*2;d.x=(t+e*Math.cos(f))*Math.cos(v),d.y=(t+e*Math.cos(f))*Math.sin(v),d.z=e*Math.sin(f),o.push(d.x,d.y,d.z),h.x=t*Math.cos(v),h.y=t*Math.sin(v),u.subVectors(d,h).normalize(),l.push(u.x,u.y,u.z),c.push(g/s),c.push(m/n)}for(let m=1;m<=n;m++)for(let g=1;g<=s;g++){const v=(s+1)*m+g-1,f=(s+1)*(m-1)+g-1,p=(s+1)*(m-1)+g,S=(s+1)*m+g;a.push(v,f,S),a.push(f,p,S)}this.setIndex(a),this.setAttribute("position",new ie(o,3)),this.setAttribute("normal",new ie(l,3)),this.setAttribute("uv",new ie(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fi(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class ze extends oi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new It(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new It(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Yl,this.normalScale=new kt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new nn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class eg extends hc{constructor(t){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}}class oo extends he{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new It(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class ng extends oo{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(he.DEFAULT_UP),this.updateMatrix(),this.groundColor=new It(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const $r=new ne,xl=new U,Ml=new U;class ig{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new kt(512,512),this.map=null,this.mapPass=null,this.matrix=new ne,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new no,this._frameExtents=new kt(1,1),this._viewportCount=1,this._viewports=[new re(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;xl.setFromMatrixPosition(t.matrixWorld),e.position.copy(xl),Ml.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Ml),e.updateMatrixWorld(),$r.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix($r),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply($r)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class sg extends ig{constructor(){super(new io(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class rg extends oo{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(he.DEFAULT_UP),this.updateMatrix(),this.target=new he,this.shadow=new sg}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class ag extends oo{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class og{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=yl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=yl();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function yl(){return performance.now()}const Sl=new ne;class lg{constructor(t,e,n=0,s=1/0){this.ray=new hr(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new eo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Sl.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Sl),this}intersectObject(t,e=!0,n=[]){return Ga(t,this,n,e),n.sort(El),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Ga(t[s],this,n,e);return n.sort(El),n}}function El(i,t){return i.distance-t.distance}function Ga(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Ga(r[a],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:qa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=qa);function cg(i){const t=new Zm({canvas:i,antialias:!0});return t.setPixelRatio(Math.min(2,devicePixelRatio||1)),t.shadowMap.enabled=!0,t.shadowMap.type=Il,t.toneMapping=Nl,t.toneMappingExposure=1.05,t.outputColorSpace=Ce,t}function hg(i){const t=new Jm;return t.background=new It(i),t.fog=new ro(new It(i),90,200),t.add(new ng(16777215,9075290,.72)),t.add(new ag(7368816,.35)),t}function ug(i,t,e){const n=new rg(16774104,1.65);n.position.set(t*.5-22,46,e*.5-30),n.castShadow=!0,n.shadow.mapSize.set(2048,2048);const s=n.shadow.camera,r=Math.max(t,e)*.62;return s.left=-r,s.right=r,s.top=r,s.bottom=-r,s.near=1,s.far=160,n.shadow.bias=-4e-4,n.shadow.normalBias=.04,n.shadow.radius=5,n.target.position.set(t*.5,0,e*.5),i.add(n,n.target),n}class dc{constructor(t,e){this.target=new U,this.goalTarget=new U,this.frustum=20,this.az=0,this.pol=.6,this.dist=80,this.bw=t,this.bh=e,this.camera=new io(-1,1,1,-1,-60,300),this.target.set(t/2,0,e/2),this.goalTarget.copy(this.target),this.place()}place(){const t=Math.sin(this.pol)*this.dist,e=Math.cos(this.pol)*this.dist;this.camera.position.set(this.target.x+t*Math.sin(this.az),this.target.y+e,this.target.z+t*Math.cos(this.az)),this.camera.up.set(0,1,0),this.camera.lookAt(this.target)}resize(t,e){const n=t/e,s=this.frustum;this.camera.left=-s*n,this.camera.right=s*n,this.camera.top=s,this.camera.bottom=-s,this.camera.updateProjectionMatrix()}follow(t,e){const n=Math.min(this.bw*.28,9),s=Math.min(this.bh*.22,11);this.goalTarget.set(ps.clamp(t,n,this.bw-n),0,ps.clamp(e,s,this.bh-s))}setFrustum(t,e,n){this.frustum=ps.clamp(t,9,34),this.resize(e,n)}zoomBy(t,e,n){this.setFrustum(this.frustum*t,e,n)}rotate(t){this.az-=t*.005,this.place()}tilt(t){this.pol=ps.clamp(this.pol-t*.004,.18,1.05),this.place()}update(t){this.target.lerp(this.goalTarget,Math.min(1,t*3.2)),this.place()}}const fc=26;function dn(i,t,e,n,s,r,a){i.fillStyle=s;for(let o=0;o<n;o++){i.globalAlpha=r*(.4+Math.random()*.6);const l=Math.random()*t,c=Math.random()*e,h=a*(.5+Math.random());i.beginPath(),i.arc(l,c,h,0,7),i.fill()}i.globalAlpha=1}const bl={dirt(i,t,e){i.fillStyle="#8a6a44",i.fillRect(0,0,t,e),dn(i,t,e,2600,"#6f5334",.5,2.2),dn(i,t,e,1200,"#a07f52",.4,2.4)},sand(i,t,e){i.fillStyle="#e6c98a",i.fillRect(0,0,t,e),dn(i,t,e,3200,"#d3b273",.4,1.7),dn(i,t,e,900,"#f3ddab",.5,2)},sidewalk(i,t,e){i.fillStyle="#b9b3a6",i.fillRect(0,0,t,e),dn(i,t,e,1500,"#a49e90",.35,2.4),i.strokeStyle="rgba(120,114,100,0.5)",i.lineWidth=3;for(let n=0;n<e;n+=fc*6)i.beginPath(),i.moveTo(0,n),i.lineTo(t,n+(Math.random()-.5)*10),i.stroke()},cardboard(i,t,e){i.fillStyle="#cba875",i.fillRect(0,0,t,e),dn(i,t,e,1200,"#b9915f",.4,2.2),i.strokeStyle="rgba(150,110,70,0.28)",i.lineWidth=2;for(let n=0;n<t;n+=10)i.beginPath(),i.moveTo(n,0),i.lineTo(n,e),i.stroke()},grass(i,t,e){i.fillStyle="#5f8a3a",i.fillRect(0,0,t,e),dn(i,t,e,2600,"#4d7530",.5,2.4),dn(i,t,e,1200,"#7aa54a",.5,2.2)},mud:()=>{},water:()=>{},ramp:()=>{},chalk:()=>{},out:()=>{}};function dg(i,t,e,n){const[s,r]=e(t.x,t.y),a=(t.r??Math.max(t.hw,t.hh))*n;if(i.save(),i.beginPath(),t.r!=null)i.arc(s,r,a,0,7);else{const l=t.hw*n,c=t.hh*n;i.rect(s-l,r-c,l*2,c*2)}i.clip();const o=t.surface;if(o==="sand"){i.fillStyle="#ecd192",i.fillRect(s-a,r-a,a*2,a*2),dn(i,0,0,0,"",0,0),i.globalAlpha=1;for(let l=0;l<400;l++)i.globalAlpha=.3,i.fillStyle="#d8b96f",i.beginPath(),i.arc(s+(Math.random()-.5)*a*2,r+(Math.random()-.5)*a*2,1.6,0,7),i.fill();i.globalAlpha=1}else if(o==="mud"){const l=i.createRadialGradient(s,r,0,s,r,a);l.addColorStop(0,"#4a3620"),l.addColorStop(1,"#5c452a"),i.fillStyle=l,i.fillRect(s-a,r-a,a*2,a*2);for(let c=0;c<30;c++)i.globalAlpha=.3,i.fillStyle="#6b5335",i.beginPath(),i.arc(s+(Math.random()-.5)*a*1.6,r+(Math.random()-.5)*a*1.6,3+Math.random()*4,0,7),i.fill();i.globalAlpha=1}else if(o==="water"){const l=i.createRadialGradient(s,r,0,s,r,a);l.addColorStop(0,"rgba(90,170,205,0.85)"),l.addColorStop(1,"rgba(70,150,190,0.7)"),i.fillStyle=l,i.fillRect(s-a,r-a,a*2,a*2),i.strokeStyle="rgba(255,255,255,0.4)",i.lineWidth=2;for(let c=0;c<5;c++)i.beginPath(),i.arc(s,r,a*(.3+c*.15),.4,2.2),i.stroke()}else if(o==="ramp"){i.fillStyle="#d9b98a",i.fillRect(s-a,r-a,a*2,a*2);const l=t.dir??-1.57;i.save(),i.translate(s,r),i.rotate(l+1.57),i.fillStyle="rgba(255,255,255,0.55)";for(let c=-1;c<=1;c++)i.beginPath(),i.moveTo(-a*.4,a*.3-c*12),i.lineTo(0,-a*.3-c*12),i.lineTo(a*.4,a*.3-c*12),i.lineWidth=6,i.strokeStyle="rgba(255,255,255,0.6)",i.stroke();i.restore()}else if(o==="chalk")i.fillStyle="rgba(255,255,255,0.15)",i.fillRect(s-a,r-a,a*2,a*2);else if(o==="grass"){i.fillStyle="#5a8636",i.fillRect(s-a,r-a,a*2,a*2);for(let l=0;l<60;l++){i.strokeStyle="#6f9c40",i.lineWidth=2;const c=s+(Math.random()-.5)*a*2,h=r+(Math.random()-.5)*a*2;i.beginPath(),i.moveTo(c,h),i.lineTo(c+(Math.random()-.5)*6,h-6-Math.random()*6),i.stroke()}}else o==="sidewalk"?(i.fillStyle="#c6c0b2",i.fillRect(s-a,r-a,a*2,a*2)):o==="cardboard"&&(i.fillStyle="#d3b17e",i.fillRect(s-a,r-a,a*2,a*2));i.restore()}function fg(i){const t=i.path,e=i.half,n=[],s=[];for(let r=0;r<t.length;r++){const a=t[Math.max(0,r-1)],o=t[Math.min(t.length-1,r+1)];let l=-(o.y-a.y),c=o.x-a.x;const h=Math.hypot(l,c)||1;l/=h,c/=h;const d=e[r];n.push([t[r].x+l*d,t[r].y+c*d]),s.push([t[r].x-l*d,t[r].y-c*d])}return{L:n,R:s}}function pg(i){const t=Math.max(i.w,i.h),e=Math.max(7,Math.min(fc,Math.floor(3e3/t))),n=Math.round(i.w*e),s=Math.round(i.h*e),r=document.createElement("canvas");r.width=n,r.height=s;const a=r.getContext("2d"),o=(S,M)=>[S*e,M*e],l=()=>(bl[i.ground]||bl.dirt)(a,n,s);l();const{L:c,R:h}=fg(i),d=new Path2D;{const[S,M]=o(c[0][0],c[0][1]);d.moveTo(S,M)}for(let S=1;S<c.length;S++){const[M,x]=o(c[S][0],c[S][1]);d.lineTo(M,x)}for(let S=h.length-1;S>=0;S--){const[M,x]=o(h[S][0],h[S][1]);d.lineTo(M,x)}d.closePath();const u=new Path2D;u.rect(0,0,n,s),u.addPath(d),a.fillStyle="rgba(18,12,6,0.40)",a.fill(u,"evenodd");for(const S of i.pads){const[M,x]=o(S.x,S.y);a.save(),a.beginPath(),a.arc(M,x,S.r*e,0,7),a.clip(),l(),a.restore()}for(const S of i.patches)dg(a,S,o,e);const m=(S,M,x)=>{a.strokeStyle=x,a.lineWidth=M,a.lineJoin="round",a.lineCap="round",a.beginPath(),S.forEach((R,w)=>{const[A,C]=o(R[0],R[1]);w?a.lineTo(A,C):a.moveTo(A,C)}),a.stroke()};m(c,Math.max(3,e*.55),"rgba(35,22,10,0.55)"),m(h,Math.max(3,e*.55),"rgba(35,22,10,0.55)"),m(c,Math.max(1.6,e*.28),"rgba(255,250,238,0.95)"),m(h,Math.max(1.6,e*.28),"rgba(255,250,238,0.95)"),a.strokeStyle="rgba(255,255,255,0.30)",a.lineWidth=Math.max(2,e*.16),a.setLineDash([e,e*1.2]),a.beginPath(),i.path.forEach((S,M)=>{const[x,R]=o(S.x,S.y);M?a.lineTo(x,R):a.moveTo(x,R)}),a.stroke(),a.setLineDash([]),i.checkpoints.forEach((S,M)=>{if(M===0)return;const[x,R]=o(S.x,S.y);a.fillStyle="rgba(255,255,255,0.55)",a.beginPath(),a.arc(x,R,e*.4,0,7),a.fill(),a.fillStyle="rgba(60,60,60,0.7)",a.font=`bold ${Math.round(e*.7)}px sans-serif`,a.textAlign="center",a.textBaseline="middle",a.fillText(String(M),x,R+1)});const g=(S,M,x)=>{const[R,w]=o(S[0],S[1]),[A,C]=o(M[0],M[1]),W=A-R,_=C-w,b=Math.hypot(W,_)||1,O=-_/b,N=W/b,X=3,Y=b/10;for(let H=0;H<X;H++)for(let K=0;K<10;K++){a.fillStyle=(H+K)%2?x:"#fff";const G=R+W*K/10+O*(H-1)*Y,lt=w+_*K/10+N*(H-1)*Y;a.save(),a.translate(G,lt),a.rotate(Math.atan2(_,W)),a.fillRect(0,-Y/2,Y,Y),a.restore()}},v={x:-Math.sin(i.startAngle),y:Math.cos(i.startAngle)},f=i.half[0];g([i.start.x-v.x*f,i.start.y-v.y*f],[i.start.x+v.x*f,i.start.y+v.y*f],"#2a7d3a"),g([i.finish[0].x,i.finish[0].y],[i.finish[1].x,i.finish[1].y],"#222");const p=new dr(r);return p.colorSpace=Ce,p.anisotropy=4,p.needsUpdate=!0,p}function mg(i){const e=document.createElement("canvas");e.width=e.height=256;const n=e.getContext("2d"),s=256/2,r=256/2;n.fillStyle=i.side,n.beginPath(),n.arc(s,r,256*.48,0,7),n.fill();const a=n.createRadialGradient(s-30,r-40,10,s,r,256*.46);if(a.addColorStop(0,pc(i.top,30)),a.addColorStop(1,i.top),n.fillStyle=a,n.beginPath(),n.arc(s,r,256*.43,0,7),n.fill(),n.strokeStyle=i.ring,n.lineWidth=10,n.beginPath(),n.arc(s,r,256*.37,0,7),n.stroke(),n.fillStyle=i.ring,n.strokeStyle=i.ring,n.textAlign="center",n.textBaseline="middle",i.logo==="ridges")for(let l=0;l<21;l++){const c=l/21*6.283;n.save(),n.translate(s+Math.cos(c)*256*.4,r+Math.sin(c)*256*.4),n.rotate(c),n.fillRect(-4,-8,8,16),n.restore()}else if(i.logo==="star")Tl(n,s,r,5,256*.22,256*.1,i.ring);else if(i.logo==="num")n.fillStyle=i.ring,n.font=`bold ${256*.4}px sans-serif`,n.fillText("7",s,r+6);else if(i.logo==="rust"){for(let l=0;l<40;l++)n.globalAlpha=.4,n.fillStyle="#5a3a1e",n.beginPath(),n.arc(s+(Math.random()-.5)*256*.7,r+(Math.random()-.5)*256*.7,2+Math.random()*6,0,7),n.fill();n.globalAlpha=1}else i.logo==="sticker"?(n.fillStyle="#fff",n.beginPath(),n.arc(s,r,256*.18,0,7),n.fill(),Tl(n,s,r,5,256*.14,256*.06,i.top)):i.logo==="hand"&&(n.strokeStyle=i.ring,n.lineWidth=6,n.beginPath(),n.arc(s,r,256*.16,.3,5.6),n.stroke(),n.beginPath(),n.arc(s+4,r-4,256*.1,.5,4),n.stroke());const o=new dr(e);return o.colorSpace=Ce,o.anisotropy=4,o}function Tl(i,t,e,n,s,r,a){i.fillStyle=a,i.beginPath();for(let o=0;o<n*2;o++){const l=o%2?r:s,c=o/(n*2)*6.283-1.57,h=t+Math.cos(c)*l,d=e+Math.sin(c)*l;o?i.lineTo(h,d):i.moveTo(h,d)}i.closePath(),i.fill()}function pc(i,t){const e=parseInt(i.slice(1),16);let n=(e>>16)+t,s=(e>>8&255)+t,r=(e&255)+t;return n=Math.min(255,n),s=Math.min(255,s),r=Math.min(255,r),`rgb(${n},${s},${r})`}function gg(i,t=1){const n=document.createElement("canvas");n.width=n.height=128;const s=n.getContext("2d"),r=128/2,a=128/2;if(i==="bomb")s.fillStyle="#c0392b",s.beginPath(),s.arc(r,a,128*.44,0,7),s.fill(),s.strokeStyle="#fff",s.lineWidth=14,s.lineCap="round",s.beginPath(),s.moveTo(r-28,a-28),s.lineTo(r+28,a+28),s.moveTo(r+28,a-28),s.lineTo(r-28,a+28),s.stroke();else{const l=t>=3?"#e0a020":t===2?"#2e9fa4":"#2ea44f";s.fillStyle=l,s.beginPath(),s.arc(r,a,128*.44,0,7),s.fill(),s.fillStyle="#fff",s.font="bold 58px sans-serif",s.textAlign="center",s.textBaseline="middle",s.fillText("+"+t,r,a+4)}const o=new dr(n);return o.colorSpace=Ce,o.anisotropy=4,o}function _g(i,t){const e=new mn,n=(a,o=.9)=>new ze({color:a,roughness:o}),s=(a,o,l,c)=>new Vt(new Ni(a,o,l,12),n(c)),r=(a,o,l,c)=>new Vt(new Fn(a,o,l),n(c));switch(i){case"twig":{const a=s(.09,.12,2.2,"#5a3f22");a.rotation.z=1.57,a.position.y=.12,e.add(a);break}case"leaf":{const a=new Vt(new ar(.5,8,6),n(t||"#7a9b3a"));a.scale.set(1,.14,.7),a.position.y=.07,e.add(a);break}case"pebble":{const a=new Vt(new fr(.42),n("#b8ae98"));a.scale.y=.6,a.position.y=.2,e.add(a);break}case"grass":{for(let a=0;a<5;a++){const o=s(.02,.05,1.1,"#5f8a36");o.position.set((Math.random()-.5)*.5,.55,(Math.random()-.5)*.5),o.rotation.z=(Math.random()-.5)*.5,e.add(o)}break}case"shell":{const a=new Vt(new ar(.42,10,8,0,6.3,0,1.6),n(t||"#f0dcc6"));a.position.y=.1,e.add(a);break}case"starfish":{const a=new Vt(new Ni(.55,.55,.12,5),n(t||"#e08a4a"));a.position.y=.1,e.add(a);break}case"castle":{const a=r(2.4,1.4,2.4,"#d8b878");a.position.y=.7,e.add(a);for(const[o,l]of[[-1,-1],[1,-1],[-1,1],[1,1]]){const c=s(.35,.4,1.9,"#d8b878");c.position.set(o,.95,l),e.add(c)}break}case"chalk":{const a=new Vt(new Bn(2.4,.7),new ze({color:t||"#e8607a",roughness:1,transparent:!0,opacity:.85}));a.rotation.x=-1.57,a.position.y=.03,e.add(a);break}case"toy":{const a=r(1.1,.7,1.1,t||"#e0c040");a.position.y=.35,e.add(a);const o=s(.28,.28,.5,pc(t||"#e0c040",20));o.position.y=.9,e.add(o);break}case"box":{const a=r(2.4,1.6,2,"#c39a63");a.position.y=.8,a.castShadow=!0,e.add(a);const o=r(2.5,.14,2.1,"#a97f48");o.position.y=1.6,e.add(o);break}case"tape":{const a=r(2.2,.06,.6,"#d9d2c2");a.position.y=.05,e.add(a);break}case"pencil":{const a=s(.13,.13,3.2,t||"#e0b030");a.rotation.z=1.57,a.position.y=.16,e.add(a);const o=s(0,.13,.4,"#333");o.rotation.z=1.57,o.position.set(1.7,.16,0),e.add(o);break}case"cup":{const a=s(.85,.65,1.8,"#e8e4dc");a.position.y=.9,a.castShadow=!0,e.add(a);const o=s(.7,.55,1.6,"#b8b0a2");o.position.y=1.05,e.add(o);break}case"coin":{const a=s(.55,.55,.12,t||"#e0c050");a.position.y=.06,e.add(a);break}case"eraser":{const a=r(1,.5,.6,t||"#e06a8a");a.position.y=.25,e.add(a);break}case"straw":{const a=s(.1,.1,3,t||"#e05a5a");a.rotation.z=1.4,a.position.y=.14,e.add(a);break}}return e.traverse(a=>{a.isMesh&&(a.castShadow=!0,a.receiveShadow=!0)}),e}function vg(i){const t=new mn,e=[],n=new Vt(new Fn(i.w+5,1.4,i.h+5),new ze({color:i.bg,roughness:.95}));n.position.set(i.w/2,-.72,i.h/2),n.receiveShadow=!0,t.add(n);const s=pg(i);s.flipY=!1;const r=new Vt(new Bn(i.w,i.h),new ze({map:s,roughness:.98}));r.rotation.x=-Math.PI/2,r.position.set(i.w/2,0,i.h/2),r.receiveShadow=!0,t.add(r);const a=i.wallCol||"#6b4e2e",o=new ze({color:a,roughness:.85});for(const l of i.walls){const c=l.b.x-l.a.x,h=l.b.y-l.a.y,d=Math.hypot(c,h);if(d<.05)continue;const u=new Vt(new Fn(d+.5,.9,.6),o);u.position.set((l.a.x+l.b.x)/2,.42,(l.a.y+l.b.y)/2),u.rotation.y=-Math.atan2(h,c),u.castShadow=!0,u.receiveShadow=!0,t.add(u)}for(const l of i.obstacles)if(l.type==="stone"){const c=new Vt(new fr(l.r,0),new ze({color:"#9a948a",roughness:.9,flatShading:!0}));c.position.set(l.x,l.r*.55,l.y),c.scale.y=.8,c.rotation.set(Math.random(),Math.random(),Math.random()),c.castShadow=!0,c.receiveShadow=!0,t.add(c)}else if(l.type==="hole"){const c=new Vt(new ii(l.r,24),new Dn({color:1709068}));c.rotation.x=-Math.PI/2,c.position.set(l.x,.015,l.y),t.add(c);const h=new Vt(new Fi(l.r,.13,8,24),new ze({color:"#3a2c1a",roughness:1}));h.rotation.x=-Math.PI/2,h.position.set(l.x,.02,l.y),t.add(h)}else{const c=l.n||1,h=l.type==="bomb"?"#c0392b":c>=3?"#e0a020":c===2?"#2e9fa4":"#2ea44f",d=new Vt(new ii(l.r,24),new Dn({map:gg(l.type,c),transparent:!0}));d.rotation.x=-Math.PI/2,d.position.set(l.x,.03,l.y),t.add(d);const u=new Vt(new ii(l.r*1.5,24),new Dn({color:h,transparent:!0,opacity:.3,blending:Js,depthWrite:!1}));u.rotation.x=-Math.PI/2,u.position.set(l.x,.025,l.y),t.add(u),e.push({mesh:u,kind:l.type,base:l.r*1.5})}for(const l of i.decor){const c=_g(l.kind,l.c);c.position.set(l.x,0,l.y),l.s&&c.scale.multiplyScalar(l.s),l.rot&&(c.rotation.y=l.rot),t.add(c)}for(const l of i.finish){const c=new Vt(new Ni(.08,.08,2.4,8),new ze({color:"#eee"}));c.position.set(l.x,1.2,l.y),c.castShadow=!0,t.add(c);const h=new Vt(new Bn(1.2,.7),new ze({color:"#e5484d",side:tn}));h.position.set(l.x+.6,2,l.y),t.add(h)}return{group:t,pulses:e}}const Zn=[{id:"refri",name:"Refri Vermelha",top:"#e5484d",side:"#b83232",ring:"#f7c948",logo:"ridges",stats:{weight:1,slide:1,stability:1,bounce:1,control:1},unlock:0,desc:"Equilibrada. A clássica."},{id:"azul",name:"Azul Metálica",top:"#3b82f6",side:"#2563c9",ring:"#cfe4ff",logo:"star",stats:{weight:1.05,slide:1.06,stability:.98,bounce:1.05,control:1},unlock:0,desc:"Desliza um tico mais."},{id:"verde",name:"Verde Velha",top:"#3fae6a",side:"#2f8a52",ring:"#dfeccb",logo:"plain",stats:{weight:1.1,slide:.94,stability:1.08,bounce:.9,control:1.05},unlock:1,desc:"Pesada e estável."},{id:"numero",name:"Número 7",top:"#f4f1e6",side:"#cfc7ac",ring:"#333",logo:"num",stats:{weight:.95,slide:1.03,stability:1.05,bounce:1,control:1.06},unlock:2,desc:"Precisa, boa de mira."},{id:"ferrugem",name:"Enferrujada",top:"#9c6b3f",side:"#6f4a2a",ring:"#c99a63",logo:"rust",stats:{weight:1.15,slide:.9,stability:1.1,bounce:.85,control:1},unlock:3,desc:"Tanque. Empurra geral."},{id:"adesivo",name:"Do Adesivo",top:"#7c3aed",side:"#5b21b6",ring:"#f5d0fe",logo:"sticker",stats:{weight:.98,slide:1.05,stability:1.02,bounce:1.1,control:1},unlock:4,desc:"Quica com estilo."},{id:"mao",name:"Feita à Mão",top:"#f59e0b",side:"#c47908",ring:"#fff3d6",logo:"hand",stats:{weight:1,slide:1,stability:1.06,bounce:1,control:1.08},unlock:6,desc:"Carinho no controle."},{id:"dourada",name:"Dourada Rara",top:"#f7d046",side:"#caa11e",ring:"#fff6c8",logo:"star",stats:{weight:1.02,slide:1.08,stability:1.08,bounce:1.05,control:1.08},unlock:9,desc:"A joia. Levemente melhor em tudo."}],Yi=["#e5484d","#3b82f6","#3fae6a","#f7d046","#f59e0b","#7c3aed"],es=i=>Zn.find(t=>t.id===i)||Zn[0],ks=.5;class xg{constructor(t){this.group=new mn;const e=es(t.skin),n=new Vt(new Ni(t.radius,t.radius*.96,ks,40),new ze({color:e.side,roughness:.45,metalness:.25}));n.position.y=ks/2,n.castShadow=!0,this.group.add(n);const s=new Vt(new Fi(t.radius,.07,8,40),new ze({color:e.ring,roughness:.5,metalness:.3}));s.rotation.x=Math.PI/2,s.position.y=ks-.03,this.group.add(s),this.top=new Vt(new ii(t.radius*.94,40),new ze({map:mg(e),roughness:.4,metalness:.2})),this.top.rotation.x=-Math.PI/2,this.top.position.y=ks+.005,this.group.add(this.top),this.ringHi=new Vt(new Fi(t.radius+.35,.09,8,32),new Dn({color:16777215,transparent:!0,opacity:.9,blending:Js,depthWrite:!1})),this.ringHi.rotation.x=-Math.PI/2,this.ringHi.position.y=.05,this.ringHi.visible=!1,this.group.add(this.ringHi)}update(t,e,n){this.group.visible=!0;const s=t.moving?Math.abs(Math.sin(e*20))*.03:Math.sin(e*2+t.bob)*.015;this.group.position.set(t.pos.x,s,t.pos.y),this.group.rotation.y=t.angle;const r=1+t.hitFlash*.12;if(this.group.scale.set(r,1-t.hitFlash*.1,r),this.ringHi.visible=n&&!t.finished,n){const a=1+Math.sin(e*6)*.06;this.ringHi.scale.set(a,a,a),this.ringHi.material.opacity=.5+Math.sin(e*6)*.25}}}class Mg{constructor(){this.group=new mn,this.views=[]}build(t){this.group.clear(),this.views=[];for(const e of t){const n=new xg(e);this.views.push(n),this.group.add(n.group)}}update(t,e,n){for(let s=0;s<t.length;s++)this.views[s]?.update(t[s],e,t[s].id===n)}}function yg(){const t=document.createElement("canvas");t.width=t.height=64;const e=t.getContext("2d"),n=e.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);return n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.6,"rgba(255,255,255,0.6)"),n.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=n,e.fillRect(0,0,64,64),new dr(t)}class Sg{constructor(){this.cap=700,this.ps=[];const t=new Me;this.pos=new Float32Array(this.cap*3),this.col=new Float32Array(this.cap*3),this.siz=new Float32Array(this.cap),t.setAttribute("position",new Fe(this.pos,3)),t.setAttribute("color",new Fe(this.col,3)),t.setAttribute("size",new Fe(this.siz,1));const e=new uc({size:.6,map:yg(),vertexColors:!0,transparent:!0,depthWrite:!1,sizeAttenuation:!0,blending:ni});this.points=new tg(t,e),this.points.frustumCulled=!1}emit(t,e,n,s,r,a,o,l,c,h){this.ps.length>=this.cap&&this.ps.shift(),this.ps.push({x:t,y:e,z:n,vx:s,vy:r,vz:a,life:o,max:o,size:l,grav:c,r:h.r,g:h.g,b:h.b})}dust(t,e,n=6,s="#d8c090"){const r=new It(s);for(let a=0;a<n;a++)this.emit(t,.1,e,(Math.random()-.5)*2,Math.random()*1.5+.5,(Math.random()-.5)*2,.5+Math.random()*.4,.6+Math.random()*.5,-1.2,r)}impact(t,e,n,s="#fff4d0"){const r=new It(s),a=Math.min(18,5+n);for(let o=0;o<a;o++){const l=Math.random()*6.28,c=2+Math.random()*n*.5;this.emit(t,.3,e,Math.cos(l)*c,1+Math.random()*2,Math.sin(l)*c,.35+Math.random()*.3,.35,-3,r)}}skid(t,e){this.emit(t,.05,e,0,0,0,.9,.5,0,new It("#00000022"))}confetti(t,e){const n=["#e5484d","#3b82f6","#3fae6a","#f7d046","#f59e0b","#7c3aed","#ffffff"];for(let s=0;s<160;s++){const r=new It(n[s%n.length]);this.emit(t+(Math.random()-.5)*20,14+Math.random()*6,e+(Math.random()-.5)*20,(Math.random()-.5)*3,-2-Math.random()*2,(Math.random()-.5)*3,2.4+Math.random()*1.5,.7,-.6,r)}}update(t){for(let s=this.ps.length-1;s>=0;s--){const r=this.ps[s];if(r.life-=t,r.life<=0){this.ps.splice(s,1);continue}r.vy+=r.grav*t,r.x+=r.vx*t,r.y+=r.vy*t,r.z+=r.vz*t,r.y<.02&&(r.y=.02,r.vy=0,r.vx*=.7,r.vz*=.7)}const e=Math.min(this.ps.length,this.cap);for(let s=0;s<e;s++){const r=this.ps[s],a=r.life/r.max;this.pos[s*3]=r.x,this.pos[s*3+1]=r.y,this.pos[s*3+2]=r.z,this.col[s*3]=r.r,this.col[s*3+1]=r.g,this.col[s*3+2]=r.b,this.siz[s]=r.size*a}for(let s=e;s<this.cap;s++)this.siz[s]=0;const n=this.points.geometry;n.getAttribute("position").needsUpdate=!0,n.getAttribute("color").needsUpdate=!0,n.getAttribute("size").needsUpdate=!0}}class Eg{constructor(){this.group=new mn,this.mat=new Dn({color:3394645,transparent:!0,opacity:.9}),this.shaft=new Vt(new Bn(1,.5),this.mat),this.shaft.rotation.x=-Math.PI/2,this.head=new Vt(new ii(.9,3),this.mat),this.head.rotation.x=-Math.PI/2,this.ring=new Vt(new Fi(1.1,.08,8,28),new Dn({color:16777215,transparent:!0,opacity:.6})),this.ring.rotation.x=-Math.PI/2;const t=new eg({color:16777215,dashSize:.4,gapSize:.3,transparent:!0,opacity:.7}),e=new Me().setFromPoints([new U,new U]);this.pull=new Qm(e,t),this.pull.computeLineDistances(),this.group.add(this.shaft,this.head,this.ring,this.pull),this.group.visible=!1}set(t,e,n,s,r){this.group.visible=!0;const a=Math.atan2(s,n),o=2+r*12,l=new It().setHSL(.33*(1-r),.75,.5);this.mat.color.copy(l),this.shaft.position.set(t+Math.cos(a)*(o/2+1.1),.12,e+Math.sin(a)*(o/2+1.1)),this.shaft.scale.set(o,1,1),this.shaft.rotation.z=0,this.shaft.rotation.y=0,this.shaft.rotation.set(-Math.PI/2,0,-a),this.head.position.set(t+Math.cos(a)*(o+1.4),.12,e+Math.sin(a)*(o+1.4)),this.head.rotation.set(-Math.PI/2,0,-a-Math.PI/2),this.head.scale.setScalar(.7+r*.6),this.ring.position.set(t,.1,e);const c=[new U(t,.15,e),new U(t-Math.cos(a)*o*.6,.15,e-Math.sin(a)*o*.6)];this.pull.geometry.setFromPoints(c),this.pull.computeLineDistances()}hide(){this.group.visible=!1}}const Lt=(i=0,t=0)=>({x:i,y:t}),$i=(i,t)=>({x:i.x-t.x,y:i.y-t.y}),mc=(i,t)=>({x:i.x*t,y:i.y*t}),Rn=i=>Math.hypot(i.x,i.y),gc=(i,t)=>Math.hypot(i.x-t.x,i.y-t.y),si=i=>{const t=Math.hypot(i.x,i.y)||1;return{x:i.x/t,y:i.y/t}},ei=(i,t,e)=>i<t?t:i>e?e:i,_c={sidewalk:{fric:4.5,drag:.15},chalk:{fric:5,drag:.15},cardboard:{fric:8,drag:.35},dirt:{fric:9.5,drag:.45},sand:{fric:17,drag:.9},grass:{fric:20,drag:1.1},mud:{fric:30,drag:1.8},water:{fric:7,drag:.5},ramp:{fric:6,drag:.2},out:{fric:24,drag:1}},bg={weight:1,slide:1,stability:1,bounce:1,control:1};function Tg(i,t,e,n,s,r){return{id:i,name:t,skin:e,isAI:s,ai:r,stats:{...n},radius:.82,pos:Lt(),vel:Lt(),angle:Math.random()*6.28,angVel:0,bob:Math.random()*6.28,progress:0,checkpoint:0,cpPos:Lt(),turnStart:Lt(),preFlick:Lt(),resetTo:Lt(),consumed:new Set,flicksLeft:3,bonusFlicks:0,special10:!1,bombed:!1,holed:!1,skipTurns:0,finished:!1,place:0,lap:0,moving:!1,hitFlash:0}}const Ag=.42,vc=27;function Kr(i,t,e){const n=e.x-t.x,s=e.y-t.y,r=n*n+s*s||1e-6;let a=ei(((i.x-t.x)*n+(i.y-t.y)*s)/r,0,1);const o=t.x+n*a,l=t.y+s*a;return{d:Math.hypot(i.x-o,i.y-l),t:a,cx:o,cy:l}}function wg(i,t,e,n){const s=(c,h,d)=>(c.x-h.x)*(d.y-h.y)-(c.y-h.y)*(d.x-h.x),r=s(e,n,i),a=s(e,n,t),o=s(i,t,e),l=s(i,t,n);return r>0!=a>0&&o>0!=l>0}class Rg{constructor(t){this.arcs=[0],this.total=0,this.cell=5,this.cols=0,this.rows=0,this.grid=[],this.def=t;let e=0;for(let s=1;s<t.path.length;s++)e+=Math.hypot(t.path[s].x-t.path[s-1].x,t.path[s].y-t.path[s-1].y),this.arcs.push(e);this.total=e,this.cols=Math.ceil(t.w/this.cell)+1,this.rows=Math.ceil(t.h/this.cell)+1,this.grid=Array.from({length:this.cols*this.rows},()=>[]);const n=Math.max(...t.half)+2;for(let s=1;s<t.path.length;s++){const r=t.path[s-1],a=t.path[s],o=Math.min(r.x,a.x)-n,l=Math.max(r.x,a.x)+n,c=Math.min(r.y,a.y)-n,h=Math.max(r.y,a.y)+n;for(let d=Math.floor(c/this.cell);d<=Math.floor(h/this.cell);d++)for(let u=Math.floor(o/this.cell);u<=Math.floor(l/this.cell);u++)u<0||d<0||u>=this.cols||d>=this.rows||this.grid[d*this.cols+u].push(s)}}halfAt(t,e){const n=this.def.half;return n[t-1]*(1-e)+n[Math.min(t,n.length-1)]*e}nearest(t){const e=ei(Math.floor(t.x/this.cell),0,this.cols-1),n=ei(Math.floor(t.y/this.cell),0,this.rows-1);let s=this.grid[n*this.cols+e],r=1/0,a=0,o=this.def.half[0];if((c=>{for(const h of c){const d=Kr(t,this.def.path[h-1],this.def.path[h]);d.d<r&&(r=d.d,a=this.arcs[h-1]+d.t*(this.arcs[h]-this.arcs[h-1]),o=this.halfAt(h,d.t))}})(s),r===1/0)for(let c=1;c<this.def.path.length;c++){const h=Kr(t,this.def.path[c-1],this.def.path[c]);h.d<r&&(r=h.d,a=this.arcs[c-1]+h.t*(this.arcs[c]-this.arcs[c-1]),o=this.halfAt(c,h.t))}return{d:r,arc:a,half:o}}progressOf(t){return this.nearest(t).arc}atArc(t){const e=this.def.path;t=ei(t,0,this.total);let n=1;for(;n<e.length-1&&this.arcs[n]<t;)n++;const s=this.arcs[n]-this.arcs[n-1]||1,r=ei((t-this.arcs[n-1])/s,0,1),a=e[n-1],o=e[n];return{p:Lt(a.x+(o.x-a.x)*r,a.y+(o.y-a.y)*r),tan:{x:(o.x-a.x)/s,y:(o.y-a.y)/s}}}inPad(t){for(const e of this.def.pads)if((t.x-e.x)**2+(t.y-e.y)**2<=e.r*e.r)return!0;return!1}surfaceAt(t){if(t.x<0||t.y<0||t.x>this.def.w||t.y>this.def.h)return"out";const e=this.nearest(t);if(!(e.d<=e.half||this.inPad(t)))return"out";let s=this.def.ground;for(const r of this.def.patches)r.r!=null?(t.x-r.x)**2+(t.y-r.y)**2<=r.r*r.r&&(s=r.surface):r.hw!=null&&r.hh!=null&&Math.abs(t.x-r.x)<=r.hw&&Math.abs(t.y-r.y)<=r.hh&&(s=r.surface);return s}patchAt(t){let e=null;for(const n of this.def.patches)n.r!=null?(t.x-n.x)**2+(t.y-n.y)**2<=n.r*n.r&&(e=n):n.hw!=null&&n.hh!=null&&Math.abs(t.x-n.x)<=n.hw&&Math.abs(t.y-n.y)<=n.hh&&(e=n);return e}collideWalls(t,e,n,s){let r=null;const a=(o,l,c)=>{t.x+=o*c,t.y+=l*c;const h=e.x*o+e.y*l;h<0&&(e.x-=(1+s)*h*o,e.y-=(1+s)*h*l),r={x:o,y:l}};for(const o of this.def.walls){const l=Kr(t,o.a,o.b);if(l.d<n){let c=t.x-l.cx,h=t.y-l.cy;const d=Math.hypot(c,h)||1;a(c/d,h/d,n-l.d+.01)}}return r}obstacleAt(t,e){for(const n of this.def.obstacles){const s=n.r+(n.type==="stone"?e:e*.5);if((t.x-n.x)**2+(t.y-n.y)**2<=s*s)return n}return null}crossedFinish(t,e){return wg(t,e,this.def.finish[0],this.def.finish[1])}}function xc(i){return i.some(t=>t.moving&&!t.finished)}function Mc(i,t,e){const n=[],s=t.def;for(const r of i){if(r.hitFlash=Math.max(0,r.hitFlash-e*4),r.finished||!r.moving)continue;const a=Lt(r.pos.x,r.pos.y),o=t.surfaceAt(r.pos),l=_c[o],c=t.patchAt(r.pos);if(o==="ramp"){const m=c?.dir!=null?{x:Math.cos(c.dir),y:Math.sin(c.dir)}:si(r.vel);r.vel.x+=m.x*26*e,r.vel.y+=m.y*26*e}else if(o==="water"){const m=c?.dir!=null?{x:Math.cos(c.dir),y:Math.sin(c.dir)}:{x:0,y:0};r.vel.x+=m.x*7*e,r.vel.y+=m.y*7*e}const h=Rn(r.vel);if(h>0){const m=l.fric/r.stats.slide;let g=h-m*e;g*=1-Math.min(.9,l.drag*e),g<0&&(g=0);const v=si(r.vel);r.vel.x=v.x*g,r.vel.y=v.y*g}r.pos.x+=r.vel.x*e,r.pos.y+=r.vel.y*e;const d=Rn(r.vel);r.angVel=d*.9*(1/r.stats.stability),r.angle+=r.angVel*e,t.collideWalls(r.pos,r.vel,r.radius,.42*r.stats.bounce)&&(n.push({type:"wall",capId:r.id,x:r.pos.x,y:r.pos.y,power:Rn(r.vel)}),r.hitFlash=1);for(let m=0;m<s.obstacles.length;m++){const g=s.obstacles[m],v=g.r+(g.type==="stone"?r.radius:r.radius*.55),f=r.pos.x-g.x,p=r.pos.y-g.y;if(!(f*f+p*p>v*v))if(g.type==="stone"){const S=Math.hypot(f,p)||1,M=f/S,x=p/S,R=v-S;r.pos.x+=M*R,r.pos.y+=x*R;const w=r.vel.x*M+r.vel.y*x;if(w<0){const A=1+.45*r.stats.bounce;r.vel.x-=A*w*M,r.vel.y-=A*w*x}n.push({type:"stone",capId:r.id,x:g.x,y:g.y,power:d}),r.hitFlash=1}else if(g.type==="hole"){r.pos.x=r.cpPos.x,r.pos.y=r.cpPos.y,r.vel=Lt(),r.moving=!1,n.push({type:"hole",capId:r.id,x:g.x,y:g.y,power:0});break}else if(g.type==="bomb"){r.pos.x=r.cpPos.x,r.pos.y=r.cpPos.y,r.vel=Lt(),r.moving=!1,n.push({type:"bomb",capId:r.id,x:g.x,y:g.y,power:0});break}else g.type==="bonus"&&(r.consumed.has(m)||(r.consumed.add(m),n.push({type:"bonus",capId:r.id,x:g.x,y:g.y,power:0,obsIdx:m,n:g.n||1})))}if(r.moving){if(t.surfaceAt(r.pos)==="out"){r.pos.x=r.resetTo.x,r.pos.y=r.resetTo.y,r.vel=Lt(),r.moving=!1,n.push({type:"out",capId:r.id,x:a.x,y:a.y,power:0});continue}if(r.progress>t.total*.72&&t.crossedFinish(a,r.pos)){r.finished=!0,r.vel=Lt(),r.moving=!1,n.push({type:"finish",capId:r.id,x:r.pos.x,y:r.pos.y,power:0});continue}r.progress=t.progressOf(r.pos),Rn(r.vel)<Ag&&(r.vel=Lt(),r.moving=!1,n.push({type:"rest",capId:r.id,x:r.pos.x,y:r.pos.y,power:0}))}}return Cg(i,n),n}function Cg(i,t){for(let e=0;e<i.length;e++)for(let n=e+1;n<i.length;n++){const s=i[e],r=i[n];if(s.finished||r.finished)continue;const a=r.pos.x-s.pos.x,o=r.pos.y-s.pos.y,l=s.radius+r.radius,c=a*a+o*o;if(c>l*l||c<1e-6)continue;const h=Math.sqrt(c),d=a/h,u=o/h,m=l-h,g=s.stats.weight,v=r.stats.weight,f=g+v;s.pos.x-=d*m*(v/f),s.pos.y-=u*m*(v/f),r.pos.x+=d*m*(g/f),r.pos.y+=u*m*(g/f);const p=r.vel.x-s.vel.x,S=r.vel.y-s.vel.y,M=p*d+S*u;if(M>0)continue;const x=-1.62*M/(1/g+1/v),R=x*d,w=x*u;s.vel.x-=R/g,s.vel.y-=w/g,r.vel.x+=R/v,r.vel.y+=w/v;const A=Math.abs(M);A>1.5&&(s.moving||(s.moving=!0),r.moving||(r.moving=!0),s.hitFlash=1,r.hitFlash=1,t.push({type:"capHit",capId:s.id,otherId:r.id,x:(s.pos.x+r.pos.x)/2,y:(s.pos.y+r.pos.y)/2,power:A}))}}const hn=["cauteloso","agressivo","tecnico","caotico","rival"],Pg={cauteloso:"Cautelosa",agressivo:"Agressiva",tecnico:"Técnica",caotico:"Caótica",rival:"Rival"},Al={cauteloso:{lookahead:12,powBias:.95,risk:1.5,outPenalty:240,spread:.16,noise:.02,rival:0},agressivo:{lookahead:19,powBias:1.1,risk:.5,outPenalty:90,spread:.22,noise:.055,rival:.25},tecnico:{lookahead:14,powBias:1,risk:1,outPenalty:180,spread:.18,noise:.014,rival:0},caotico:{lookahead:13,powBias:1.03,risk:.7,outPenalty:120,spread:.36,noise:.15,rival:.15},rival:{lookahead:15,powBias:1.05,risk:.8,outPenalty:160,spread:.2,noise:.035,rival:1}};function Lg(i){return{...i,pos:Lt(i.pos.x,i.pos.y),vel:Lt(),cpPos:Lt(i.cpPos.x,i.cpPos.y),turnStart:Lt(i.turnStart.x,i.turnStart.y),resetTo:Lt(i.turnStart.x,i.turnStart.y),preFlick:Lt(i.pos.x,i.pos.y),consumed:new Set,stats:{...i.stats},moving:!1,finished:!1}}function jr(i,t,e,n){const s=Lg(i);s.vel=mc(si(e),Math.max(.06,Math.min(1,n))*vc),s.moving=!0;let r=!1,a=!1,o=!1,l=!1,c=0,h=i.progress;const d=1/120;let u=0;for(;xc([s])&&u<1400;){const v=Mc([s],t,d);for(const f of v)f.type==="out"?r=!0:f.type==="hole"?a=!0:f.type==="bomb"?o=!0:f.type==="finish"?l=!0:f.type==="bonus"&&(c+=f.n||1);s.progress>h&&(h=s.progress),u++}const m=t.nearest(s.pos),g=Math.max(0,m.d-m.half*.45);return{endProg:s.progress,maxProg:h,out:r,holed:a,bombed:o,finished:l,dEdge:g,endPos:Lt(s.pos.x,s.pos.y),bonus:c}}function Zr(i,t,e,n){let s;if(i.out?s=t.progress-e.outPenalty+(i.maxProg-t.progress)*.12:s=i.endProg-i.dEdge*e.risk*2.4,i.holed&&(s-=60),i.bombed&&(s-=85),s+=i.bonus*22,i.finished&&(s+=400),n&&e.rival>0&&!i.out){const r=gc(i.endPos,n.pos);s+=e.rival*Math.max(0,9-r)*3.2}return s}const Ki=(i,t)=>({x:i.x*Math.cos(t)-i.y*Math.sin(t),y:i.x*Math.sin(t)+i.y*Math.cos(t)});function Dg(i,t,e){const n=i.ai||"tecnico",s=Al[n]||Al.tecnico,r=e.total,a=e.atArc(i.progress).tan,o=e.atArc(Math.min(r,i.progress+6)).p,l=e.atArc(Math.min(r,i.progress+s.lookahead)).p,c=Rn($i(o,i.pos))<.4?a:si($i(o,i.pos)),h=Rn($i(l,i.pos))<.4?a:si($i(l,i.pos));let d=null;if(s.rival>0){let M=16;for(const x of t){if(x.id===i.id||x.finished)continue;const R=gc(i.pos,x.pos);R<M&&x.progress>i.progress-6&&(d=x,M=R)}}const u=s.spread,m=[h,Ki(h,u*.6),Ki(h,-u*.6),c,Ki(c,u*.5),Ki(c,-u*.5),a],g=n==="agressivo"?[.2,.4,.6,.78,.9,1]:n==="cauteloso"?[.14,.28,.42,.56,.7,.84]:[.16,.32,.5,.66,.82,.96];let v={dir:c,power:.2,s:-1e9};for(const M of m)for(const x of g){const R=Math.min(1,x*s.powBias),w=Zr(jr(i,e,M,R),i,s,d);w>v.s&&(v={dir:M,power:R,s:w})}for(const M of[.12,.18]){const x=Zr(jr(i,e,a,M),i,s,d);x>v.s&&(v={dir:a,power:M,s:x})}if(d){const M=si($i(d.pos,i.pos));for(const x of[.7,.9]){const R=Zr(jr(i,e,M,x),i,s,d)+18;R>v.s&&(v={dir:M,power:x,s:R})}}const f=(Math.random()-.5)*s.noise*2.2,p=Ki(v.dir,f),S=Math.max(.06,Math.min(1,v.power*(1+(Math.random()-.5)*s.noise)));return{dir:p,power:S}}class Ig{constructor(){this.caps=[],this.current=0,this.phase="aim",this.finishOrder=[],this.turnNo=0,this.onEvent=()=>{},this.onChange=()=>{},this.onToast=()=>{},this.onFlick=()=>{},this.acc=0,this.aiTimer=0,this.aiFired=!1,this.lastFlickOut=!1}setup(t,e){this.track=new Rg(t),this.caps=e.map((l,c)=>{const h=es(l.skin);return Tg(c,l.name,l.skin,{...bg,...h.stats},l.isAI,l.ai)});const n=t.start,s=t.startAngle,r={x:Math.cos(s),y:Math.sin(s)},a={x:-Math.sin(s),y:Math.cos(s)},o=t.half[0];this.caps.forEach((l,c)=>{const h=c%2?1:-1,d=c%2===0&&this.caps.length===1?0:h*Math.min(o*.55,1.8),u=.8+Math.floor(c/2)*1.9;l.pos=Lt(n.x+r.x*u+a.x*d,n.y+r.y*u+a.y*d),l.cpPos=Lt(l.pos.x,l.pos.y),l.turnStart=Lt(l.pos.x,l.pos.y),l.progress=this.track.progressOf(l.pos),l.checkpoint=0}),this.finishOrder=[],this.current=0,this.turnNo=1,this.phase="aim",this.beginTurn(!0),this.onChange()}activeCap(){return this.caps[this.current]}beginTurn(t=!1){let e=0;for(;e++<this.caps.length+2;){const s=this.caps[this.current];if(!s)break;if(s.finished){this.advanceIndex();continue}if(s.skipTurns>0){s.skipTurns--,this.onToast(`${s.name} perdeu o turno`,"bad"),this.advanceIndex();continue}break}const n=this.caps[this.current];n&&(n.flicksLeft=3,n.bonusFlicks=0,n.special10=!1,n.consumed.clear(),n.turnStart=Lt(n.pos.x,n.pos.y),this.phase="aim",this.aiTimer=0,this.aiFired=!1,t||this.turnNo++,n.isAI||this.onToast("Sua vez, "+n.name,"turn"),this.onChange())}advanceIndex(){this.current=(this.current+1)%this.caps.length}canFlick(){return this.phase==="aim"&&this.activeCap().flicksLeft>0}flick(t,e){if(!this.canFlick())return;const n=this.activeCap(),s=si(t),r=Math.max(.06,Math.min(1,e))*vc;for(const a of this.caps)a.resetTo=Lt(a.pos.x,a.pos.y);n.resetTo=Lt(n.turnStart.x,n.turnStart.y),n.preFlick=Lt(n.pos.x,n.pos.y),n.vel=mc(s,r),n.moving=!0,this.lastFlickOut=!1,this.phase="resolve",this.acc=0,this.onFlick(n,e),this.onChange()}update(t){if(this.phase==="over")return;if(this.phase==="aim"){const s=this.activeCap();if(s.isAI&&(this.aiTimer+=t,!this.aiFired&&this.aiTimer>.85)){this.aiFired=!0;const r=Dg(s,this.caps,this.track);this.flick(r.dir,r.power)}return}this.acc+=t;const e=1/120;let n=0;for(;this.acc>=e&&n<12;){const s=Mc(this.caps,this.track,e);for(const r of s)this.handleEvent(r);if(this.acc-=e,n++,this.phase==="over")return}xc(this.caps)||this.endFlick()}handleEvent(t){const e=this.caps[t.capId];switch(t.type){case"bonus":e.bonusFlicks+=t.n||1,this.onToast(`+${t.n} peteléco${(t.n||1)>1?"s":""}!`,"good");break;case"hole":e.holed=!0,this.onToast(`${e.name} caiu no buraco — checkpoint`,"bad");break;case"bomb":e.bombed=!0,this.onToast(`${e.name} pisou no X — perdeu a vez`,"bad");break;case"out":e.id===this.current&&(this.lastFlickOut=!0),this.onToast(`${e.name} saiu da pista!`,"bad");break;case"finish":this.onFinish(e);break}this.updateCheckpoint(e),this.onEvent(t)}updateCheckpoint(t){const e=this.track.def.checkpoints;for(let n=t.checkpoint+1;n<e.length;n++)Math.hypot(t.pos.x-e[n].x,t.pos.y-e[n].y)<4.2&&(t.checkpoint=n,t.cpPos=Lt(e[n].x,e[n].y))}onFinish(t){this.finishOrder.includes(t)||(t.finished=!0,this.finishOrder.push(t),t.place=this.finishOrder.length,this.finishOrder.length===1&&this.finishRace())}finishRace(){const t=this.caps.filter(n=>!n.finished).sort((n,s)=>s.progress-n.progress);let e=this.finishOrder.length;for(const n of t)n.place=++e;this.phase="over",this.onChange()}endFlick(){const t=this.activeCap();t.flicksLeft-=1,t.holed&&(t.holed=!1,t.flicksLeft-=1),t.bombed&&(t.bombed=!1,t.flicksLeft=0),t.bonusFlicks>0&&(t.flicksLeft+=t.bonusFlicks,t.bonusFlicks=0),t.flicksLeft=Math.max(0,Math.min(t.flicksLeft,9)),t.flicksLeft>1&&(t.turnStart=Lt(t.pos.x,t.pos.y)),t.flicksLeft<=0?(this.advanceIndex(),this.beginTurn()):(this.phase="aim",this.aiTimer=0,this.aiFired=!1,this.onChange())}standings(){return[...this.caps].sort((t,e)=>(t.finished?t.place:999-t.progress/1e3,e.finished?e.place:999-e.progress/1e3,t.finished&&e.finished?t.place-e.place:t.finished?-1:e.finished?1:e.progress-t.progress))}winner(){return this.finishOrder[0]||null}}function Ug(i){return()=>{i|=0,i=i+1831565813|0;let t=Math.imul(i^i>>>15,1|i);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}const ji=["Fácil","Médio","Difícil","Muito Difícil","Extrema"],zs=["#3fae6a","#3b82f6","#f2b100","#e5762a","#e5484d"],wl=[{key:"quintal",ground:"dirt",bg:"#6f5334",wall:"#6b4e2e",patch:["sand","mud","grass"],decor:["twig","leaf","pebble","grass"],names:["Quintal do Zé","Terra Batida","Fundo de Quintal","Chão de Terra"]},{key:"praia",ground:"sand",bg:"#d9b877",wall:"#c9a35f",patch:["water","ramp","cardboard"],decor:["shell","starfish","castle","pebble"],names:["Praia da Tarde","Areia Fofa","Beira-Mar","Duna do Sol"]},{key:"calcada",ground:"sidewalk",bg:"#9a9488",wall:"#8f8879",patch:["chalk","cardboard"],decor:["chalk","toy","pebble"],names:["Calçada de Giz","Rua de Baixo","Passeio","Meio-Fio"]},{key:"garagem",ground:"cardboard",bg:"#7d6a4e",wall:"#a9773f",patch:["sidewalk","sand"],decor:["box","tape","pencil"],names:["Garagem","Papelão & Fita","Depósito","Oficina"]},{key:"parquinho",ground:"dirt",bg:"#4f5b3a",wall:"#5c4a2c",patch:["mud","water","grass"],decor:["leaf","grass","pebble"],names:["Parquinho Molhado","Lamaçal","Depois da Chuva","Poça & Folha"]},{key:"cozinha",ground:"cardboard",bg:"#c8b48c",wall:"#c05a5a",patch:["sidewalk","water"],decor:["cup","coin","eraser","straw"],names:["Mesa da Cozinha","Hora do Café","Toalha Xadrez","Bancada"]},{key:"jardim",ground:"dirt",bg:"#3f5a2e",wall:"#5a7a3a",patch:["grass","mud","sand"],decor:["grass","leaf","twig","pebble"],names:["Jardim da Vó","Canteiro","Grama & Terra","Horta"]},{key:"deserto",ground:"sand",bg:"#c98f4a",wall:"#a6702f",patch:["ramp","ramp","water"],decor:["pebble","twig","starfish"],names:["Deserto","Dunas","Sol a Pino","Areião"]},{key:"obra",ground:"dirt",bg:"#6a6152",wall:"#8a8070",patch:["cardboard","sand"],decor:["box","pencil","pebble"],names:["Canteiro de Obra","Entulho","Cimento","Andaime"]},{key:"laje",ground:"sidewalk",bg:"#8f9aa0",wall:"#7a848a",patch:["cardboard","chalk"],decor:["toy","pebble","tape"],names:["Laje","Terraço","Cobertura","Varal"]},{key:"piscina",ground:"sidewalk",bg:"#4a90b8",wall:"#cfe4ee",patch:["water","water","chalk"],decor:["pebble","coin","toy"],names:["Borda da Piscina","Deck Molhado","Área de Lazer","Prainha"]},{key:"feira",ground:"cardboard",bg:"#a88f5c",wall:"#8a6238",patch:["sidewalk","chalk"],decor:["box","coin","tape","cup"],names:["Feira Livre","Barraca","Calçadão","Mercadão"]},{key:"estrada",ground:"dirt",bg:"#5c4a30",wall:"#4a3a24",patch:["mud","sand","grass"],decor:["pebble","twig","grass"],names:["Estrada de Barro","Trilha","Rua sem Asfalto","Beira da Roça"]},{key:"varanda",ground:"cardboard",bg:"#8a6a44",wall:"#6b4e2e",patch:["sidewalk","water"],decor:["cup","coin","leaf","pencil"],names:["Varanda","Área Coberta","Quintalzinho","Alpendre"]}],$n=(i,t)=>{const e=i[Math.max(0,t-1)],n=i[Math.min(i.length-1,t+1)],s=n.x-e.x,r=n.y-e.y,a=Math.hypot(s,r)||1;return{x:s/a,y:r/a}},Jr=(i,t)=>{const e=$n(i,t);return{x:-e.y,y:e.x}},Ng=i=>{let t=0;for(let e=1;e<i.length;e++)t+=Math.hypot(i[e].x-i[e-1].x,i[e].y-i[e-1].y);return t},Fg=(i,t)=>{const e=Math.cos(t),n=Math.sin(t);for(const s of i){const r=s.x*e-s.y*n,a=s.x*n+s.y*e;s.x=r,s.y=a}},Og=[{half:4.3,open:.05,len:330,holes:[1,2],bombs:[0,1],stones:[2,4],bonus:[2,3],ramps:[1,2]},{half:4.1,open:.24,len:420,holes:[2,3],bombs:[0,1],stones:[3,5],bonus:[2,4],ramps:[1,3]},{half:4,open:.5,len:510,holes:[2,4],bombs:[1,2],stones:[3,6],bonus:[2,4],ramps:[2,3]},{half:3.9,open:.72,len:600,holes:[3,5],bombs:[1,2],stones:[4,6],bonus:[2,3],ramps:[2,4]},{half:3.8,open:.9,len:690,holes:[3,6],bombs:[1,2],stones:[4,7],bonus:[1,3],ramps:[2,4]}];function Bg(i,t,e,n){const r=e(1,3),a=e(2,5),o=t(.3,.52),l=t(.08,.24),c=i()<.5?-1:1,h=i()<.5?-1:1,d=e(0,2),u=S=>d===1?.3+.7*S:d===2?1-.7*S:1,m=t(-.25,.25),g=S=>(o*c*Math.sin(Math.PI*r*S)+l*h*Math.sin(Math.PI*a*S+m))*u(S),v=200,f=[];for(let S=0;S<=v;S++){const M=S/v;f.push(Lt(M*100,g(M)*100))}const p=n/Ng(f);for(const S of f)S.x*=p,S.y*=p;return f}function kg(i,t,e,n,s,r){const a=r?t(48,68):t(36,50),o=t(0,12),l=t(0,1.5),c=Math.max(t(3.5,6.5),2*l+2),h=2*(s*1.35)+c,d=ei(Math.round(n/(a+h*.5)),4,46),u=[],m=12,g=8;for(let v=0;v<d;v++){const f=v%2===0,p=f?0:a,S=f?a:0,M=v*h;for(let x=0;x<=m;x++){const R=x/m,w=p+(S-p)*R,A=f?R:1-R,C=Math.sin(Math.PI*A)*o,W=Math.sin(A*2*Math.PI)*l;u.push(Lt(w,M+C+W))}if(v<d-1){const x=f?1:-1,R=M+h/2,w=h/2;for(let A=1;A<g;A++){const C=A/g*Math.PI;u.push(Lt(S+x*Math.sin(C)*w,R-Math.cos(C)*w))}}}return u}function Rl(i,t,e,n,s,r){const a=t(2,3.2),o=2*(s*1.35)+t(4,7),l=s+4,c=Math.max(n/(Math.PI*a),a*o),h=l+c,d=a*2*Math.PI,u=i()<.5?1:-1,m=Math.max(160,Math.round(n/2.2)),g=[];for(let v=0;v<=m;v++){const f=v/m,p=f*d,S=h-c*f;g.push(Lt(S*Math.cos(u*p),S*Math.sin(u*p)))}return r&&g.reverse(),g}function zg(i,t,e){const n=Ug(i*7919+t*131+e*17+1),s=(z,J)=>Math.floor(z+n()*(J-z+1)),r=(z,J)=>z+n()*(J-z),a=wl[(e*3+t*7+i)%wl.length],o=Og[t],l=o.half*r(.92,1.08),c=o.len*r(.9,1.1),h=["wave","serpN","spin","serpW","wave","spout","serpN","spin","serpW","wave"];let d=h[(e+t*3)%h.length];d==="wave"&&c>440&&(d=e%2?"spin":"serpN");let u;d==="wave"?u=Bg(n,r,s,c):d==="spin"?u=Rl(n,r,s,c,l,!1):d==="spout"?u=Rl(n,r,s,c,l,!0):u=kg(n,r,s,c,l,d==="serpW"),Fg(u,n()*6.283);const m=l+5;let g=1/0,v=1/0,f=-1/0,p=-1/0;for(const z of u)z.x<g&&(g=z.x),z.y<v&&(v=z.y),z.x>f&&(f=z.x),z.y>p&&(p=z.y);for(const z of u)z.x+=m-g,z.y+=m-v;const S=Math.ceil(f-g+2*m),M=Math.ceil(p-v+2*m),x=u,R=x.length,w=[0];let A=0;for(let z=1;z<R;z++)A+=Math.hypot(x[z].x-x[z-1].x,x[z].y-x[z-1].y),w.push(A);const C=A,W=z=>{let J=1;for(;J<R-1&&w[J]<z;)J++;const et=w[J]-w[J-1]||1,st=(z-w[J-1])/et;return{p:Lt(x[J-1].x+(x[J].x-x[J-1].x)*st,x[J-1].y+(x[J].y-x[J-1].y)*st),i:J}},_=(z,J=0)=>{const{p:et,i:st}=W(z),rt=Jr(x,st);return Lt(et.x+rt.x*J,et.y+rt.y*J)},b=new Array(R).fill(0);for(let z=1;z<R-1;z++){const J=$n(x,z-1),et=$n(x,z+1);let st=J.x*et.x+J.y*et.y;st=st<-1?-1:st>1?1:st;const rt=w[Math.min(R-1,z+1)]-w[Math.max(0,z-1)]||1;b[z]=ei(Math.acos(st)/rt/.22,0,1)}const O=new Array(R).fill(0);for(let z=0;z<R;z++){let J=0,et=0;for(let st=-3;st<=3;st++){const rt=z+st;rt>=0&&rt<R&&(J+=b[rt],et++)}O[z]=J/et}const N=[];for(let z=0;z<R;z++){let J=l+Math.sin(w[z]*.05)*.3;w[z]<10&&(J=Math.max(J,l+2*(1-w[z]/10))),C-w[z]<8&&(J+=.9),J*=1+.35*O[z],N.push(J)}const X=[],Y=3,H=z=>z<10||C-z<9;for(let z=Y;z<R;z+=Y){const J=z-Y,et=o.open*(1-.7*O[z]);if(n()<et&&!H(w[z]))continue;const st=Jr(x,J),rt=Jr(x,z);X.push({a:Lt(x[J].x+st.x*N[J],x[J].y+st.y*N[J]),b:Lt(x[z].x+rt.x*N[z],x[z].y+rt.y*N[z])}),X.push({a:Lt(x[J].x-st.x*N[J],x[J].y-st.y*N[J]),b:Lt(x[z].x-rt.x*N[z],x[z].y-rt.y*N[z])})}const K=[],G=[],lt=[],ut=[Lt(x[0].x,x[0].y)],xt=[];xt.push({x:x[0].x,y:x[0].y,r:l+2.8});const zt=s(4,7);for(let z=1;z<=zt;z++)ut.push(_(C*z/(zt+1)));const Xt=s(o.ramps[0],o.ramps[1]);for(let z=0;z<Xt;z++){const J=r(.15,.85)*C,{p:et,i:st}=W(J),rt=$n(x,st);G.push({surface:"ramp",x:et.x,y:et.y,r:l*.9,dir:Math.atan2(rt.y,rt.x)})}for(let z=0;z<s(2,4);z++){const J=r(.1,.9)*C,et=_(J,r(-l*.4,l*.4)),st=a.patch[s(0,a.patch.length-1)],{i:rt}=W(J),T=$n(x,rt);G.push({surface:st,x:et.x,y:et.y,r:l*r(.7,1.05),dir:st==="water"?Math.atan2(T.y,T.x)+r(-.6,.6):void 0})}const q=[],tt=z=>q.every(J=>Math.abs(J-z)>14),mt=(z,J,et)=>{const st=_(z,J);et(st),q.push(z)};for(let z=0,J=0;z<s(o.holes[0],o.holes[1])&&J<40;J++){const et=r(.14,.9)*C;tt(et)&&(mt(et,r(-l*.5,l*.5),st=>K.push({type:"hole",x:st.x,y:st.y,r:r(1,1.4)})),z++)}for(let z=0,J=0;z<s(o.bombs[0],o.bombs[1])&&J<30;J++){const et=r(.2,.85)*C;tt(et)&&(mt(et,r(-l*.4,l*.4),st=>K.push({type:"bomb",x:st.x,y:st.y,r:.95})),z++)}for(let z=0;z<s(o.stones[0],o.stones[1]);z++){const J=r(.1,.92)*C,et=(n()<.5?-1:1)*r(l*.3,l*.75),st=_(J,et);K.push({type:"stone",x:st.x,y:st.y,r:r(.7,1.2)})}for(let z=0,J=0;z<s(o.bonus[0],o.bonus[1])&&J<30;J++){const et=r(.15,.9)*C;if(!tt(et))continue;const st=n(),rt=st>.94?3:st>.72?2:1;mt(et,(n()<.5?-1:1)*r(l*.2,l*.7),T=>K.push({type:"bonus",x:T.x,y:T.y,r:1.1,n:rt})),z++}if(t>=1&&n()<.55){let z=-1,J=-1,et=1e9;for(let st=0;st<R;st+=4)for(let rt=st+1;rt<R;rt+=4){if(w[rt]-w[st]<C*.16)continue;const T=Math.hypot(x[st].x-x[rt].x,x[st].y-x[rt].y);T<et&&(et=T,z=st,J=rt)}if(z>=0&&et>2*l+1&&et<2*l+16){const st=(x[z].x+x[J].x)/2,rt=(x[z].y+x[J].y)/2;xt.push({x:st,y:rt,r:et/2+l*.7}),K.push({type:"hole",x:st+r(-1,1),y:rt+r(-1,1),r:r(1.2,1.7)})}}for(let z=0;z<s(12,22);z++){const J=r(2,S-2),et=r(2,M-2),st=a.decor[s(0,a.decor.length-1)];lt.push({kind:st,x:J,y:et,s:r(.8,1.3),rot:n()*6})}const pt=Lt(x[0].x,x[0].y),Rt=$n(x,0),Tt=Math.atan2(Rt.y,Rt.x),Ot=x[R-1],qt=$n(x,R-1),Bt={x:-qt.y,y:qt.x},P=[Lt(Ot.x+Bt.x*(l+.6),Ot.y+Bt.y*(l+.6)),Lt(Ot.x-Bt.x*(l+.6),Ot.y-Bt.y*(l+.6))],ye=a.names[e%a.names.length]+(e>=a.names.length?" "+(Math.floor(e/a.names.length)+1):"");return{id:i,name:ye,theme:a.key,level:t,w:S,h:M,ground:a.ground,bg:a.bg,wallCol:a.wall,path:x,half:N,pads:xt,patches:G,walls:X,obstacles:K,checkpoints:ut,start:pt,startAngle:Tt,finish:P,decor:lt}}const Qr=new Map;function yc(i,t){const e=i*10+t;return Qr.has(e)||Qr.set(e,zg(e,i,t)),Qr.get(e)}const Ye=10,Hg=13;class Gg{constructor(t,e,n,s){this.dom=t,this.cam=e,this.rig=n,this.opts=s,this.ray=new lg,this.ndc=new kt,this.plane=new An(new U(0,1,0),0),this.pointers=new Map,this.aiming=!1,this.camDrag=null,this.pinch=0,this.lastMid=null,this.down=r=>{if(this.dom.setPointerCapture?.(r.pointerId),this.pointers.set(r.pointerId,{x:r.clientX,y:r.clientY}),this.pointers.size===1){if(r.button===2){this.camDrag={x:r.clientX,y:r.clientY};return}this.opts.canAim()?(this.aiming=!0,this.updateAim(r.clientX,r.clientY)):this.camDrag={x:r.clientX,y:r.clientY}}else if(this.pointers.size===2){this.aiming=!1,this.opts.onCancel(),this.camDrag=null;const a=[...this.pointers.values()];this.pinch=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y),this.lastMid={x:(a[0].x+a[1].x)/2,y:(a[0].y+a[1].y)/2}}},this.move=r=>{if(this.pointers.has(r.pointerId)){if(this.pointers.set(r.pointerId,{x:r.clientX,y:r.clientY}),this.pointers.size===1)this.aiming?this.updateAim(r.clientX,r.clientY):this.camDrag&&(this.rig.rotate(r.clientX-this.camDrag.x),this.rig.tilt(r.clientY-this.camDrag.y),this.camDrag={x:r.clientX,y:r.clientY});else if(this.pointers.size===2){const a=[...this.pointers.values()],o=(a[0].x+a[1].x)/2,l=(a[0].y+a[1].y)/2,c=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);this.lastMid&&(this.rig.rotate((o-this.lastMid.x)*.8),this.rig.tilt((l-this.lastMid.y)*.8)),this.pinch&&this.rig.zoomBy(this.pinch/c,this.dom.clientWidth,this.dom.clientHeight),this.lastMid={x:o,y:l},this.pinch=c}}},this.up=r=>{const a=this.aiming&&this.pointers.size===1;this.pointers.delete(r.pointerId),this.pointers.size<2&&(this.pinch=0,this.lastMid=null),this.pointers.size===0&&(a&&this.release(r.clientX,r.clientY),this.aiming=!1,this.camDrag=null)},this.wheel=r=>{r.preventDefault(),this.rig.zoomBy(r.deltaY>0?1.08:.92,this.dom.clientWidth,this.dom.clientHeight)},t.addEventListener("pointerdown",this.down),t.addEventListener("pointermove",this.move),window.addEventListener("pointerup",this.up),t.addEventListener("wheel",this.wheel,{passive:!1}),t.addEventListener("contextmenu",r=>r.preventDefault())}setCamera(t,e){this.cam=t,this.rig=e}world(t,e){const n=this.dom.getBoundingClientRect();this.ndc.x=(t-n.left)/n.width*2-1,this.ndc.y=-((e-n.top)/n.height)*2+1,this.ray.setFromCamera(this.ndc,this.cam);const s=new U;return this.ray.ray.intersectPlane(this.plane,s)?{x:s.x,z:s.z}:null}aimVec(t,e){const n=this.opts.capPos(),s=this.world(t,e);if(!n||!s)return null;const r=s.x-n.x,a=s.z-n.y,o=Math.hypot(r,a),l=Math.min(1,o/Hg);return o<.4?{dx:1,dz:0,power:0}:{dx:-r/o,dz:-a/o,power:l}}updateAim(t,e){const n=this.aimVec(t,e);n&&this.opts.onAim(n.dx,n.dz,n.power)}release(t,e){const n=this.aimVec(t,e);n&&n.power>.06?this.opts.onRelease(n.dx,n.dz,n.power):this.opts.onCancel()}}const Sc="tampinha_rally_v1",Cl={wins:0,skin:"refri",music:.5,sfx:.8,muted:!1,daily:{}};let Ne=Vg();function Vg(){try{return{...Cl,...JSON.parse(localStorage.getItem(Sc)||"{}")}}catch{return{...Cl}}}function Hs(){try{localStorage.setItem(Sc,JSON.stringify(Ne))}catch{}}const ge={get(){return Ne},addWin(){Ne.wins++,Hs()},wins(){return Ne.wins},setSkin(i){Ne.skin=i,Hs()},skin(){return Ne.skin},setVols(i,t,e){Ne.music=i,Ne.sfx=t,Ne.muted=e,Hs()},dailyBest(i){return Ne.daily[i]},setDailyBest(i,t){(Ne.daily[i]==null||t<Ne.daily[i])&&(Ne.daily[i]=t,Hs())}};let Ut=null,Jn,In,Un,Ei=null,Zi=null,bn=null,Ec=!1,Va=0;const xe={music:.5,sfx:.8,muted:!1};function qe(){if(Ut)return!0;try{return Ut=new(window.AudioContext||window.webkitAudioContext),Jn=Ut.createGain(),Jn.gain.value=xe.muted?0:1,Jn.connect(Ut.destination),In=Ut.createGain(),In.gain.value=xe.sfx,In.connect(Jn),Un=Ut.createGain(),Un.gain.value=xe.music,Un.connect(Jn),!0}catch{return!1}}function bc(){qe()&&Ut.state==="suspended"&&Ut.resume()}function lo(){const i=Ut.sampleRate*1,t=Ut.createBuffer(1,i,Ut.sampleRate),e=t.getChannelData(0);for(let n=0;n<i;n++)e[n]=Math.random()*2-1;return t}function Tn(i,t,e,n,s,r){if(!Ut)return;const a=Ut.createOscillator(),o=Ut.createGain();a.type=n,a.frequency.setValueAtTime(i,t),r&&a.frequency.exponentialRampToValueAtTime(r,t+e),o.gain.setValueAtTime(0,t),o.gain.linearRampToValueAtTime(s,t+.008),o.gain.exponentialRampToValueAtTime(8e-4,t+e),a.connect(o),o.connect(In),a.start(t),a.stop(t+e+.02)}function ta(i,t,e,n,s){if(!Ut)return;const r=Ut.createBufferSource();r.buffer=lo();const a=Ut.createBiquadFilter(),o=Ut.createGain();a.type="bandpass",a.frequency.value=n,a.Q.value=s,o.gain.setValueAtTime(e,i),o.gain.exponentialRampToValueAtTime(8e-4,i+t),r.connect(a),a.connect(o),o.connect(In),r.start(i),r.stop(i+t+.02)}const $e={flick(i=.5){if(!qe())return;const t=Ut.currentTime;Tn(360+i*340,t,.09,"triangle",.35,220),ta(t,.05,.25,1400,1.2)},ui(){qe()&&Tn(520,Ut.currentTime,.06,"sine",.2,660)},wall(i=1){if(!qe())return;const t=Ut.currentTime;ta(t,.09,Math.min(.4,.12+i*.03),240,2),Tn(150,t,.08,"sine",.2,90)},clack(i=1){if(!qe())return;const t=Ut.currentTime;ta(t,.06,Math.min(.45,.15+i*.03),900,3),Tn(500,t,.05,"square",.15,380)},hole(){if(!qe())return;const i=Ut.currentTime;Tn(400,i,.5,"sine",.3,70)},bonus(){if(!qe())return;const i=Ut.currentTime;[523,659,784,1047].forEach((t,e)=>Tn(t,i+e*.06,.18,"triangle",.25))},bad(){if(!qe())return;const i=Ut.currentTime;Tn(300,i,.25,"sawtooth",.22,140)},win(){if(!qe())return;const i=Ut.currentTime;[523,659,784,1047,784,1047,1319].forEach((t,e)=>Tn(t,i+e*.11,.3,"triangle",.3))},slide(i){if(!qe())return;Ei||(Ei=Ut.createBufferSource(),Ei.buffer=lo(),Ei.loop=!0,bn=Ut.createBiquadFilter(),bn.type="bandpass",bn.frequency.value=1200,bn.Q.value=.8,Zi=Ut.createGain(),Zi.gain.value=0,Ei.connect(bn),bn.connect(Zi),Zi.connect(In),Ei.start());const t=Math.min(.22,i*.02);Zi.gain.setTargetAtTime(t,Ut.currentTime,.05),bn&&bn.frequency.setTargetAtTime(700+i*90,Ut.currentTime,.05)}},Pl=[[196,247,294],[220,262,330],[175,220,262],[196,247,311]];function Wg(){qe()&&(Ec=!0,Va=0,Tc())}function Tc(){if(!Ut||!Ec)return;const i=Ut.currentTime,t=Va%Pl.length,e=Pl[t];e.forEach(s=>{const r=Ut.createOscillator(),a=Ut.createGain();r.type="triangle",r.frequency.value=s,a.gain.setValueAtTime(0,i),a.gain.linearRampToValueAtTime(.06,i+.05),a.gain.exponentialRampToValueAtTime(.001,i+1.7),r.connect(a),a.connect(Un),r.start(i),r.stop(i+1.8)}),[e[2]*2,e[1]*2,e[2]*2,e[0]*2].forEach((s,r)=>{const a=Ut.createOscillator(),o=Ut.createGain();a.type="sine",a.frequency.value=s;const l=i+r*.45;o.gain.setValueAtTime(0,l),o.gain.linearRampToValueAtTime(.05,l+.03),o.gain.exponentialRampToValueAtTime(.001,l+.35),a.connect(o),o.connect(Un),a.start(l),a.stop(l+.4)});for(let s=0;s<8;s++)Xg(i+s*.225);Va++,setTimeout(Tc,1800)}function Xg(i){if(!Ut)return;const t=Ut.createBufferSource();t.buffer=lo();const e=Ut.createBiquadFilter(),n=Ut.createGain();e.type="highpass",e.frequency.value=6e3,n.gain.setValueAtTime(.03,i),n.gain.exponentialRampToValueAtTime(.001,i+.08),t.connect(e),e.connect(n),n.connect(Un),t.start(i),t.stop(i+.1)}function Ac(i){xe.music=i,Un&&(Un.gain.value=i)}function wc(i){xe.sfx=i,In&&(In.gain.value=i)}function Rc(i){xe.muted=i,Jn&&(Jn.gain.value=i?0:1)}const Gs=["Bolha","Zé","Nina","Tato","Duda","Chico","Lila"];class qg{constructor(t){this.root=document.getElementById("ui"),this.cfgLevel=0,this.cfgTrack=0,this.cfgPick="specific",this.cfgMode="quick",this.cfgPlayers=[],this.toastEl=null,this.toastT=0,this.hud=null,this.onPause=null,this.onResume=null,this.onRestart=null,this.onNext=null,this.onMenu=null,this.cb=t,this.resetPlayers("quick")}el(t){const e=document.createElement("div");return e.innerHTML=t.trim(),e.firstElementChild}clear(){this.root.querySelectorAll(".screen").forEach(t=>t.remove())}showMenu(){this.clear();const t=ge.wins(),e=this.el(`
      <div class="screen menu">
        <div class="logo"><span class="cap-ico"></span><h1>Tampinha <em>Rally</em></h1><div class="tag">corrida de tampinhas · peteléco &amp; caos</div></div>
        <div class="mode-grid">
          <button class="mode-btn" data-m="quick"><b>Corrida Rápida</b><span>você + IA, é só jogar</span></button>
          <button class="mode-btn" data-m="ai"><b>Contra a IA</b><span>escolha rivais e nível</span></button>
          <button class="mode-btn" data-m="local"><b>Multiplayer Local</b><span>2–6 no mesmo aparelho</span></button>
          <button class="mode-btn" data-m="champ"><b>Campeonato</b><span>várias pistas, 1 campeão</span></button>
          <button class="mode-btn" data-m="daily"><b>Desafio Diário</b><span>pista do dia, menos petelecos</span></button>
          <button class="mode-btn ghost" data-m="skins"><b>Tampinhas</b><span>desbloqueadas: ${Zn.filter(n=>t>=n.unlock).length}/${Zn.length}</span></button>
        </div>
        <div class="menu-foot"><button class="txt-btn" id="cfgBtn">⚙ Ajustes</button><span>Vitórias: <b>${t}</b></span></div>
      </div>`);this.root.appendChild(e),e.querySelectorAll(".mode-btn").forEach(n=>n.addEventListener("click",()=>{const s=n.dataset.m;s==="skins"?this.showSkins():this.showSetup(s)})),e.querySelector("#cfgBtn").addEventListener("click",()=>this.showSettings())}resetPlayers(t){this.cfgPlayers=[{human:!0,ai:"cauteloso",color:0,name:"Você"}];let e=3;t==="daily"&&(e=0),t==="local"&&(e=1);for(let n=0;n<e;n++)this.cfgPlayers.push({human:t==="local",ai:hn[n%hn.length],color:(n+1)%Yi.length,name:t==="local"?`Jogador ${n+2}`:Gs[n%Gs.length]})}showSetup(t){if(this.cfgMode=t,this.resetPlayers(t),this.cfgPick="specific",t==="daily"){const e=new Date,n=e.getFullYear()*372+(e.getMonth()+1)*31+e.getDate();this.cfgLevel=n%5,this.cfgTrack=Math.floor(n/5)%Ye}this.renderSetup()}renderSetup(){this.clear();const t=this.cfgMode==="daily",e=this.cfgMode==="champ",n=this.cfgPick!=="specific",s=yc(this.cfgLevel,this.cfgTrack),r=!t,a={quick:"Corrida Rápida",ai:"Contra a IA",local:"Multiplayer Local",champ:"Campeonato",daily:"Desafio Diário"}[this.cfgMode],o=t?"":`<div class="lvl-row" id="lvls">
      ${ji.map((u,m)=>`<button class="lvl-chip ${m===this.cfgLevel?"sel":""}" data-l="${m}" style="--lc:${zs[m]}"><b>${u}</b><span>${this.levelHint(m)}</span></button>`).join("")}
    </div>`;let l="";if(e)l=`<div class="champ-note">🏆 Campeonato: <b>5 pistas sorteadas</b> do nível <b style="color:${zs[this.cfgLevel]}">${ji[this.cfgLevel]}</b>. Some pontos e seja o campeão!</div>`;else if(n)l=`<div class="track-pick">
        <div class="track-card mystery" style="border-color:${this.cfgPick==="randany"?"#b98cff":zs[this.cfgLevel]}">
          <div class="track-name">🎲 Surpresa!</div>
          <div class="track-sub">${this.cfgPick==="randany"?"pista aleatória de qualquer nível":"pista aleatória do nível "+ji[this.cfgLevel]}</div>
        </div>
      </div>`;else{const u=!t,m=Array.from({length:Ye},(g,v)=>`<button class="tnum ${v===this.cfgTrack?"sel":""}" data-i="${v}">${v+1}</button>`).join("");l=`<div class="track-pick">
        ${u?'<button class="arrow" id="tprev">‹</button>':""}
        <div class="track-card" style="border-color:${zs[this.cfgLevel]}">
          <div class="track-name">${s.name}</div>
          <div class="track-sub">${s.theme} · ${this.lenLabel(s)}${u?" · pista "+(this.cfgTrack+1)+"/"+Ye:" · "+ji[this.cfgLevel]}</div>
          <div class="track-mini" id="mini"></div>
        </div>
        ${u?'<button class="arrow" id="tnext">›</button>':""}
      </div>
      ${u?`<div class="tnum-row" id="tnums">${m}</div>`:""}`}const c=t||e?"":`<div class="rand-row">
      <button class="chip ${this.cfgPick==="specific"?"sel":""}" id="pspec">🎯 Escolher</button>
      <button class="chip ${this.cfgPick==="randlevel"?"sel":""}" id="prlvl">🎲 Do nível</button>
      <button class="chip ${this.cfgPick==="randany"?"sel":""}" id="prany">🎲 Qualquer</button>
    </div>`,h=this.el(`
      <div class="screen setup">
        <div class="setup-head"><button class="txt-btn" id="back">‹ Voltar</button><h2>${a}</h2><div></div></div>
        ${o}
        ${c}
        ${l}
        ${r?`<div class="players" id="players"></div>
        <div class="pcount">
          <button class="chip" id="less">– jogador</button>
          <span>${this.cfgPlayers.length} tampinhas</span>
          <button class="chip" id="more">+ jogador</button>
        </div>`:`<div class="daily-note">Pista do dia: <b>${s.name}</b> (${ji[this.cfgLevel]}). Contra o relógio: leve a tampinha à chegada com o <b>menor número de petelecos</b>. Recorde de hoje: <b>${ge.dailyBest(Yg())??"—"}</b></div>`}
        <button class="play-btn" id="play">Jogar ▶</button>
      </div>`);this.root.appendChild(h);const d=h.querySelector("#mini");d&&this.drawMini(d,s),h.querySelector("#back").addEventListener("click",()=>this.showMenu()),h.querySelectorAll(".lvl-chip").forEach(u=>u.addEventListener("click",()=>{this.cfgLevel=+u.dataset.l,this.cfgTrack=0,this.renderSetup()})),h.querySelector("#pspec")?.addEventListener("click",()=>{this.cfgPick="specific",this.renderSetup()}),h.querySelector("#prlvl")?.addEventListener("click",()=>{this.cfgPick="randlevel",this.renderSetup()}),h.querySelector("#prany")?.addEventListener("click",()=>{this.cfgPick="randany",this.renderSetup()}),h.querySelector("#tprev")?.addEventListener("click",()=>{this.cfgTrack=(this.cfgTrack+Ye-1)%Ye,this.renderSetup()}),h.querySelector("#tnext")?.addEventListener("click",()=>{this.cfgTrack=(this.cfgTrack+1)%Ye,this.renderSetup()}),h.querySelectorAll(".tnum").forEach(u=>u.addEventListener("click",()=>{this.cfgTrack=+u.dataset.i,this.renderSetup()})),r&&(this.renderPlayers(h.querySelector("#players")),h.querySelector("#less").addEventListener("click",()=>{this.cfgPlayers.length>2&&(this.cfgPlayers.pop(),this.renderSetup())}),h.querySelector("#more").addEventListener("click",()=>{if(this.cfgPlayers.length<6){const u=this.cfgPlayers.length;this.cfgPlayers.push({human:this.cfgMode==="local",ai:hn[u%hn.length],color:u%Yi.length,name:this.cfgMode==="local"?`Jogador ${u+1}`:Gs[(u-1)%Gs.length]}),this.renderSetup()}})),h.querySelector("#play").addEventListener("click",()=>this.launch())}levelHint(t){return["muito protegida","protegida","pouca proteção","quase sem muro","sem muro"][t]}lenLabel(t){let e=0;for(let n=1;n<t.path.length;n++)e+=Math.hypot(t.path[n].x-t.path[n-1].x,t.path[n].y-t.path[n-1].y);return e<320?"curta":e<480?"longa":e<620?"muito longa":"épica"}renderPlayers(t){t.innerHTML="",this.cfgPlayers.forEach((e,n)=>{const s=this.el(`<div class="prow">
        <span class="pdot" style="background:${Yi[e.color]}"></span>
        <input class="pname" value="${e.name}" ${n===0?"readonly":""}/>
        ${n===0?'<span class="ptag you">você</span>':`<button class="ptype">${e.human?"👤 Humano":"🤖 "+Pg[e.ai]}</button>`}
      </div>`);t.appendChild(s);const r=s.querySelector(".pname");r.addEventListener("change",()=>e.name=r.value||e.name);const a=s.querySelector(".pdot");a.addEventListener("click",()=>{e.color=(e.color+1)%Yi.length,a.style.background=Yi[e.color]});const o=s.querySelector(".ptype");o&&o.addEventListener("click",()=>{if(this.cfgMode==="local")e.human=!e.human,e.human||(e.ai=hn[n%hn.length]);else{const l=hn.indexOf(e.ai);e.ai=hn[(l+1)%hn.length],e.human=!1}this.renderPlayers(t)})})}launch(){const t=this.cfgMode==="daily"?[{name:"Você",isAI:!1,skin:ge.skin()}]:this.cfgPlayers.map((s,r)=>({name:s.name,isAI:!s.human,ai:s.ai,skin:r===0?ge.skin():Zn[(s.color+2)%Zn.length].id}));let e=this.cfgLevel,n=this.cfgTrack;this.cfgPick==="randlevel"?n=Math.floor(Math.random()*Ye):this.cfgPick==="randany"&&(e=Math.floor(Math.random()*5),n=Math.floor(Math.random()*Ye)),this.cb.start({level:e,trackIdx:n,pick:this.cfgPick,players:t,mode:this.cfgMode})}drawMini(t,e){const a=document.createElement("canvas");a.width=250,a.height=156;const o=a.getContext("2d"),l=Math.min((250-10*2)/e.w,(156-10*2)/e.h),c=(250-e.w*l)/2,h=(156-e.h*l)/2,d=g=>c+g*l,u=g=>h+g*l;o.fillStyle="#0000002e",o.fillRect(0,0,250,156),o.strokeStyle="rgba(255,255,255,0.18)",o.lineWidth=Math.max(4,8*l),o.lineCap="round",o.lineJoin="round",o.beginPath(),e.path.forEach((g,v)=>{const f=d(g.x),p=u(g.y);v?o.lineTo(f,p):o.moveTo(f,p)}),o.stroke(),o.strokeStyle=e.wallCol||"#caa",o.globalAlpha=.9,o.lineWidth=1.3,o.beginPath();for(const g of e.walls)o.moveTo(d(g.a.x),u(g.a.y)),o.lineTo(d(g.b.x),u(g.b.y));o.stroke(),o.globalAlpha=1,o.strokeStyle="rgba(255,255,255,0.5)",o.lineWidth=1.4,o.setLineDash([3,3]),o.beginPath(),e.path.forEach((g,v)=>{const f=d(g.x),p=u(g.y);v?o.lineTo(f,p):o.moveTo(f,p)}),o.stroke(),o.setLineDash([]);for(const g of e.obstacles){const v=Math.max(1.4,g.r*l);o.fillStyle=g.type==="hole"?"#120c06":g.type==="bomb"?"#e5484d":g.type==="stone"?"#9a948a":g.n>=3?"#e0a020":g.n===2?"#2e9fa4":"#2ea44f",o.beginPath(),o.arc(d(g.x),u(g.y),v,0,7),o.fill()}o.fillStyle="#3fae6a",o.beginPath(),o.arc(d(e.start.x),u(e.start.y),4,0,7),o.fill(),o.fillStyle="#e5484d";const m=e.finish[0];o.beginPath(),o.arc(d(m.x),u(m.y),4,0,7),o.fill(),t.innerHTML="",t.appendChild(a)}showSkins(){this.clear();const t=ge.wins(),e=ge.skin(),n=this.el(`<div class="screen skins">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Voltar</button><h2>Tampinhas</h2><div></div></div>
      <div class="skin-grid" id="grid"></div>
    </div>`);this.root.appendChild(n);const s=n.querySelector("#grid");for(const r of Zn){const a=t<r.unlock,o=this.el(`<button class="skin-card ${e===r.id?"sel":""} ${a?"locked":""}">
        <div class="skin-face" style="background:${r.top};border-color:${r.ring}"><span style="background:${r.ring}"></span></div>
        <div class="skin-name">${r.name}</div>
        <div class="skin-desc">${a?"🔒 "+r.unlock+" vitórias":r.desc}</div>
        <div class="skin-bars">${Vs("Desliza",r.stats.slide)}${Vs("Peso",r.stats.weight)}${Vs("Controle",r.stats.control)}${Vs("Quique",r.stats.bounce)}</div>
      </button>`);s.appendChild(o),a||o.addEventListener("click",()=>{this.cb.setSkin(r.id),this.showSkins()})}n.querySelector("#back").addEventListener("click",()=>this.showMenu())}showSettings(){this.clear();const t=this.el(`<div class="screen settings">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Voltar</button><h2>Ajustes</h2><div></div></div>
      <div class="cfg-row"><label>Música</label><input type="range" id="mus" min="0" max="1" step="0.05" value="${xe.music}"></div>
      <div class="cfg-row"><label>Efeitos</label><input type="range" id="sfx" min="0" max="1" step="0.05" value="${xe.sfx}"></div>
      <div class="cfg-row"><label>Mudo</label><button class="chip" id="mute">${xe.muted?"🔇 Ligado":"🔊 Desligado"}</button></div>
      <div class="how"><b>Como jogar:</b> arraste a tampinha <b>para trás</b> e solte — quanto mais puxa, mais forte. 3 petelecos por vez; chegue primeiro! <b>Proteção:</b> pistas fáceis têm muro que te segura na pista; nas difíceis o muro some e é fácil <b>cair fora</b> (volta pro início do turno). <b>Buraco</b> = volta ao checkpoint e perde 1 peteléco · <b>X</b> = perde a vez · <b>verde +1/+2/+3</b> = petelecos extras. Câmera: dois dedos giram/aproximam.</div>
    </div>`);this.root.appendChild(t);const e=()=>this.cb.setVols(+t.querySelector("#mus").value,+t.querySelector("#sfx").value,xe.muted);t.querySelector("#mus").addEventListener("input",e),t.querySelector("#sfx").addEventListener("input",e),t.querySelector("#mute").addEventListener("click",()=>{xe.muted=!xe.muted,e(),t.querySelector("#mute").textContent=xe.muted?"🔇 Ligado":"🔊 Desligado"}),t.querySelector("#back").addEventListener("click",()=>this.showMenu())}showGame(){this.clear(),this.hud=this.el(`
    <div class="screen hud">
      <div class="hud-top">
        <button class="round" id="pause">❚❚</button>
        <div class="turn-banner" id="turn"></div>
        <button class="round" id="cam" title="A câmera segue sozinha">🎯</button>
      </div>
      <div class="standings" id="stand"></div>
      <div class="flicks" id="flicks"></div>
      <div class="toast-wrap" id="toasts"></div>
      <div class="hint" id="hint"></div>
      <div class="modal-bg hidden" id="modal"><div class="modal" id="mbox"></div></div>
    </div>`),this.root.appendChild(this.hud),this.hud.querySelector("#pause").addEventListener("click",()=>this.onPause?.())}updateHUD(t,e){if(!this.hud)return;const n=t.activeCap(),s=this.hud.querySelector("#turn");s.innerHTML=`<span class="tdot" style="background:${es(n.skin).top}"></span> ${n.finished?"Corrida!":"Vez de <b>"+n.name+"</b>"}`;const r=this.hud.querySelector("#flicks");let a="";Math.max(3,n.flicksLeft);for(let c=0;c<n.flicksLeft;c++)a+='<span class="fd on"></span>';r.innerHTML=(t.phase==="aim"&&e?'<span class="fl-lab">Petelecos</span>':"")+a+(n.flicksLeft===1?'<span class="flast">último!</span>':""),r.style.opacity=n.isAI||t.phase!=="aim"?"0.55":"1";const o=this.hud.querySelector("#stand");o.innerHTML=t.standings().map((c,h)=>`<div class="srow ${c.id===n.id?"act":""}"><span class="spos">${h+1}º</span><span class="sdot" style="background:${es(c.skin).top}"></span><span class="sname">${c.name}</span>${c.finished?'<span class="sfin">🏁</span>':""}</div>`).join("");const l=this.hud.querySelector("#hint");l.style.display=e&&t.phase==="aim"?"block":"none",l.textContent="Arraste a tampinha para trás e solte"}toast(t,e=""){if(!this.hud)return;const n=this.hud.querySelector("#toasts"),s=this.el(`<div class="toast ${e}">${t}</div>`);n.appendChild(s),setTimeout(()=>s.classList.add("show"),10),setTimeout(()=>{s.classList.remove("show"),setTimeout(()=>s.remove(),300)},1700)}showPause(){const t=this.hud.querySelector("#modal"),e=this.hud.querySelector("#mbox");e.className="modal",e.innerHTML=`<h3>Pausado</h3><div class="mactions col">
      <button class="play-btn" id="r">▶ Continuar</button>
      <button class="chip" id="re">↻ Reiniciar</button>
      <button class="chip" id="mn">Sair</button></div>`,t.classList.remove("hidden"),e.querySelector("#r").addEventListener("click",()=>this.onResume?.()),e.querySelector("#re").addEventListener("click",()=>this.onRestart?.()),e.querySelector("#mn").addEventListener("click",()=>this.onMenu?.())}hideModal(){this.hud?.querySelector("#modal").classList.add("hidden")}showResults(t,e,n){const s=this.hud.querySelector("#modal"),r=this.hud.querySelector("#mbox"),a=t.standings(),o=t.caps.find(u=>!u.isAI),l=o&&o.place===1;r.className="modal win";const c=a.slice(0,Math.min(4,a.length)).map((u,m)=>`<div class="prow2"><span class="pl">${["🥇","🥈","🥉","4º"][m]}</span><span class="sdot" style="background:${es(u.skin).top}"></span><span>${u.name}</span></div>`).join(""),h=e==="daily"?`<h3>Chegou!</h3><div class="big">${t.caps[0].place===1?"Você completou!":""}</div>`:`<h3>${l?"Você venceu! 🎉":o?o.place+"º lugar":"Fim!"}</h3>`,d=n?`<div class="champ-line">Corrida ${n.race}/${n.total} · ${n.pts}</div>`:"";r.innerHTML=`${h}${d}<div class="podium">${c}</div>
      <div class="mactions">
        <button class="chip" id="mn">Menu</button>
        <button class="chip" id="re">↻ Revanche</button>
        <button class="play-btn" id="nx">${n&&!n.last?"Próxima ▶":"Nova pista ▶"}</button>
      </div>`,s.classList.remove("hidden"),r.querySelector("#mn").addEventListener("click",()=>this.onMenu?.()),r.querySelector("#re").addEventListener("click",()=>this.onRestart?.()),r.querySelector("#nx").addEventListener("click",()=>this.onNext?.())}}function Vs(i,t){const e=Math.round((t-.8)/.4*100);return`<div class="sbar"><span>${i}</span><i style="width:${Math.max(8,Math.min(100,e))}%"></i></div>`}function Yg(){const i=new Date;return`${i.getFullYear()}-${i.getMonth()+1}-${i.getDate()}`}const Cc=document.getElementById("scene"),Pc=cg(Cc);let Cn,en=new dc(34,54),rs=null;const Wa=new Mg,ke=new Sg,ns=new Eg,$t=new Ig;let Ri="quick",be=null,ce=null,co=0,hs=!1,Ll=!1;function or(i){be=i,Ri=i.mode,co=0;const t=yc(i.level,i.trackIdx);Cn=hg(t.bg),ug(Cn,t.w,t.h),rs=vg(t),Cn.add(rs.group),Cn.add(Wa.group,ke.points,ns.group),en=new dc(t.w,t.h),en.setFrustum(21,innerWidth,innerHeight),uo(),$t.setup(t,i.players),Wa.build($t.caps),$g.setCamera(en.camera,en),pe.showGame(),hs=!0,Ll||(Wg(),Ll=!0),pe.updateHUD($t,ho())}function ho(){return $t.phase==="aim"&&!$t.activeCap().isAI}$t.onToast=(i,t)=>pe.toast(i,t);$t.onChange=()=>pe.updateHUD($t,ho());$t.onFlick=(i,t)=>{$e.flick(t),_c[$t.track.surfaceAt(i.pos)],ke.dust(i.pos.x,i.pos.y,8),ns.hide()};$t.onEvent=i=>{switch(i.type){case"wall":$e.wall(i.power),ke.impact(i.x,i.y,i.power*.4,"#ffe6b0");break;case"stone":$e.wall(i.power),ke.impact(i.x,i.y,i.power*.5,"#e8e0d0");break;case"capHit":$e.clack(i.power),ke.impact(i.x,i.y,i.power*.6,"#fff");break;case"hole":$e.hole(),ke.dust(i.x,i.y,14,"#3a2c1a");break;case"bomb":$e.bad(),ke.impact(i.x,i.y,10,"#ff8a5a");break;case"bonus":$e.bonus(),ke.impact(i.x,i.y,10,"#8affc0");break;case"out":$e.bad(),ke.dust(i.x,i.y,10,"#cbb58a");break;case"finish":ke.confetti(i.x,i.y);break}};const pe=new qg({start:i=>{if(bc(),i.mode==="champ"){const t=[0,1,2,3,4,5,6,7,8,9];for(let n=t.length-1;n>0;n--){const s=Math.floor(Math.random()*(n+1));[t[n],t[s]]=[t[s],t[n]]}const e=t.slice(0,5).map(n=>({level:i.level,idx:n}));ce={seq:e,race:0,pts:new Map},i.level=e[0].level,i.trackIdx=e[0].idx}else ce=null;or(i)},setVols:(i,t,e)=>{Ac(i),wc(t),Rc(e),ge.setVols(i,t,e)},setSkin:i=>{ge.setSkin(i),$e.ui()}});pe.onPause=()=>{$t.phase!=="over"&&(zi=!0,pe.showPause())};pe.onResume=()=>{zi=!1,pe.hideModal()};pe.onRestart=()=>{zi=!1,pe.hideModal(),be&&or(be)};pe.onMenu=()=>{hs=!1,zi=!1,Kg(),pe.showMenu()};pe.onNext=()=>{if(pe.hideModal(),ce){if(ce.race++,ce.race>=ce.seq.length){Zg();return}be.level=ce.seq[ce.race].level,be.trackIdx=ce.seq[ce.race].idx,or(be);return}be&&(be.pick==="randany"?(be.level=Math.floor(Math.random()*5),be.trackIdx=Math.floor(Math.random()*Ye)):be.pick==="randlevel"?be.trackIdx=Math.floor(Math.random()*Ye):be.trackIdx=(be.trackIdx+1)%Ye,or(be))};Ac(ge.get().music);wc(ge.get().sfx);Rc(ge.get().muted);xe.music=ge.get().music;xe.sfx=ge.get().sfx;xe.muted=ge.get().muted;let zi=!1;const $g=new Gg(Cc,en.camera,en,{canAim:()=>hs&&!zi&&ho(),capPos:()=>{const i=$t.activeCap();return i?{x:i.pos.x,y:i.pos.y}:null},onAim:(i,t,e)=>{const n=$t.activeCap();ns.set(n.pos.x,n.pos.y,i,t,e)},onRelease:(i,t,e)=>{ns.hide(),Ri==="daily"&&co++,$t.flick({x:i,y:t},e)},onCancel:()=>ns.hide()});function Kg(){Cn&&Cn.clear(),rs=null}let Xa=!1;function jg(){if(Xa)return;Xa=!0;const i=$t.caps.find(e=>!e.isAI);i&&i.place===1&&Ri!=="daily"&&ge.addWin(),Ri==="daily"&&$t.caps[0].finished&&ge.setDailyBest(Qg(),co),$e.win();let t;if(ce){const e=[10,6,4,3,2,1];$t.standings().forEach((s,r)=>ce.pts.set(s.id,(ce.pts.get(s.id)||0)+(e[r]||0)));const n="Pontos: "+[...ce.pts.entries()].sort((s,r)=>r[1]-s[1]).map(([s,r])=>`${$t.caps[s].name} ${r}`).slice(0,3).join(" · ");t={race:ce.race+1,total:ce.seq.length,last:ce.race+1>=ce.seq.length,pts:n}}pe.showResults($t,Ri,t)}function Zg(){const i=[...ce.pts.entries()].sort((e,n)=>n[1]-e[1])[0],t=$t.caps[i[0]];t&&!t.isAI&&ge.addWin(),pe.toast("Campeão: "+t.name+" 🏆","good"),ce=null,pe.onMenu?.()}function uo(){const i=innerWidth,t=innerHeight;Pc.setSize(i,t),en.resize(i,t)}addEventListener("resize",uo);addEventListener("pointerdown",()=>bc(),{once:!0});pe.showMenu();uo();window.__mgr=$t;window.__diag={get inGame(){return hs},get mode(){return Ri}};const Jg=new og;let Ws=0;function Lc(){const i=Math.min(.05,Jg.getDelta());if(Ws+=i,hs&&Cn){zi||($t.update(i),$t.phase==="over"?jg():Xa=!1);let t=$t.activeCap();if($t.phase==="resolve"){let n=-1,s=t;for(const r of $t.caps){const a=Rn(r.vel);r.moving&&a>n&&(n=a,s=r)}t=s}t&&en.follow(t.pos.x,t.pos.y),en.update(i);let e=0;for(const n of $t.caps)if(n.moving){const s=Rn(n.vel);if(s>e&&(e=s),s>3&&Math.random()<.5){const r=$t.track.surfaceAt(n.pos);(r==="sand"||r==="dirt"||r==="mud"||r==="grass")&&ke.dust(n.pos.x,n.pos.y,1,r==="mud"?"#5c452a":r==="grass"?"#5f8a36":"#d8c090")}}if($e.slide(e),rs)for(const n of rs.pulses){const s=1+Math.sin(Ws*4)*.18;n.mesh.scale.set(s,s,1),n.mesh.material.opacity=.22+Math.sin(Ws*4)*.12}Wa.update($t.caps,Ws,$t.activeCap()?.id??-1),ke.update(i),Pc.render(Cn,en.camera)}requestAnimationFrame(Lc)}Lc();function Qg(){const i=new Date;return`${i.getFullYear()}-${i.getMonth()+1}-${i.getDate()}`}
