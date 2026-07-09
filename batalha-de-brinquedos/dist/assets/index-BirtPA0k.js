var Ac=Object.defineProperty;var Rc=(i,t,e)=>t in i?Ac(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var Bt=(i,t,e)=>Rc(i,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ha="169",Cc=0,fo=1,Pc=2,wl=1,Al=2,xn=3,Nn=0,Ne=1,on=2,In=0,Ti=1,po=2,mo=3,go=4,Lc=5,Yn=100,Ic=101,Dc=102,Uc=103,Nc=104,Fc=200,Oc=201,Bc=202,zc=203,qr=204,Yr=205,kc=206,Hc=207,Gc=208,Vc=209,Wc=210,Xc=211,qc=212,Yc=213,$c=214,$r=0,Kr=1,Zr=2,Ri=3,Jr=4,jr=5,Qr=6,ta=7,Rl=0,Kc=1,Zc=2,Dn=0,Jc=1,jc=2,Qc=3,Cl=4,th=5,eh=6,nh=7,Pl=300,Ci=301,Pi=302,ea=303,na=304,Js=306,ia=1e3,Jn=1001,sa=1002,qe=1003,ih=1004,os=1005,je=1006,ar=1007,jn=1008,En=1009,Ll=1010,Il=1011,Ji=1012,Ga=1013,ii=1014,Sn=1015,es=1016,Va=1017,Wa=1018,Li=1020,Dl=35902,Ul=1021,Nl=1022,tn=1023,Fl=1024,Ol=1025,wi=1026,Ii=1027,Bl=1028,Xa=1029,zl=1030,qa=1031,Ya=1033,Ds=33776,Us=33777,Ns=33778,Fs=33779,ra=35840,aa=35841,oa=35842,la=35843,ca=36196,ha=37492,ua=37496,da=37808,fa=37809,pa=37810,ma=37811,ga=37812,_a=37813,va=37814,xa=37815,Ma=37816,Sa=37817,ya=37818,Ea=37819,ba=37820,Ta=37821,Os=36492,wa=36494,Aa=36495,kl=36283,Ra=36284,Ca=36285,Pa=36286,sh=3200,rh=3201,Hl=0,ah=1,Ln="",He="srgb",On="srgb-linear",$a="display-p3",js="display-p3-linear",Ws="linear",ne="srgb",Xs="rec709",qs="p3",oi=7680,_o=519,oh=512,lh=513,ch=514,Gl=515,hh=516,uh=517,dh=518,fh=519,vo=35044,xo="300 es",yn=2e3,Ys=2001;class Ni{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Te=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],or=Math.PI/180,La=180/Math.PI;function Fi(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Te[i&255]+Te[i>>8&255]+Te[i>>16&255]+Te[i>>24&255]+"-"+Te[t&255]+Te[t>>8&255]+"-"+Te[t>>16&15|64]+Te[t>>24&255]+"-"+Te[e&63|128]+Te[e>>8&255]+"-"+Te[e>>16&255]+Te[e>>24&255]+Te[n&255]+Te[n>>8&255]+Te[n>>16&255]+Te[n>>24&255]).toLowerCase()}function Me(i,t,e){return Math.max(t,Math.min(e,i))}function ph(i,t){return(i%t+t)%t}function lr(i,t,e){return(1-e)*i+e*t}function Bi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ue(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class ot{constructor(t=0,e=0){ot.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Me(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class kt{constructor(t,e,n,s,r,a,o,l,c){kt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],f=n[7],d=n[2],p=n[5],g=n[8],x=s[0],u=s[3],m=s[6],E=s[1],M=s[4],b=s[7],C=s[2],R=s[5],A=s[8];return r[0]=a*x+o*E+l*C,r[3]=a*u+o*M+l*R,r[6]=a*m+o*b+l*A,r[1]=c*x+h*E+f*C,r[4]=c*u+h*M+f*R,r[7]=c*m+h*b+f*A,r[2]=d*x+p*E+g*C,r[5]=d*u+p*M+g*R,r[8]=d*m+p*b+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],f=h*a-o*c,d=o*l-h*r,p=c*r-a*l,g=e*f+n*d+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return t[0]=f*x,t[1]=(s*c-h*n)*x,t[2]=(o*n-s*a)*x,t[3]=d*x,t[4]=(h*e-s*l)*x,t[5]=(s*r-o*e)*x,t[6]=p*x,t[7]=(n*l-c*e)*x,t[8]=(a*e-n*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(cr.makeScale(t,e)),this}rotate(t){return this.premultiply(cr.makeRotation(-t)),this}translate(t,e){return this.premultiply(cr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const cr=new kt;function Vl(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function $s(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function mh(){const i=$s("canvas");return i.style.display="block",i}const Mo={};function Bs(i){i in Mo||(Mo[i]=!0,console.warn(i))}function gh(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function _h(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function vh(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const So=new kt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),yo=new kt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),zi={[On]:{transfer:Ws,primaries:Xs,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i,fromReference:i=>i},[He]:{transfer:ne,primaries:Xs,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[js]:{transfer:Ws,primaries:qs,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.applyMatrix3(yo),fromReference:i=>i.applyMatrix3(So)},[$a]:{transfer:ne,primaries:qs,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.convertSRGBToLinear().applyMatrix3(yo),fromReference:i=>i.applyMatrix3(So).convertLinearToSRGB()}},xh=new Set([On,js]),Jt={enabled:!0,_workingColorSpace:On,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!xh.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;const n=zi[t].toReference,s=zi[e].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return zi[i].primaries},getTransfer:function(i){return i===Ln?Ws:zi[i].transfer},getLuminanceCoefficients:function(i,t=this._workingColorSpace){return i.fromArray(zi[t].luminanceCoefficients)}};function Ai(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function hr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let li;class Mh{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{li===void 0&&(li=$s("canvas")),li.width=t.width,li.height=t.height;const n=li.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=li}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=$s("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ai(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Ai(e[n]/255)*255):e[n]=Ai(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Sh=0;class Wl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Sh++}),this.uuid=Fi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(ur(s[a].image)):r.push(ur(s[a]))}else r=ur(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function ur(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Mh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let yh=0;class Le extends Ni{constructor(t=Le.DEFAULT_IMAGE,e=Le.DEFAULT_MAPPING,n=Jn,s=Jn,r=je,a=jn,o=tn,l=En,c=Le.DEFAULT_ANISOTROPY,h=Ln){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:yh++}),this.uuid=Fi(),this.name="",this.source=new Wl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ot(0,0),this.repeat=new ot(1,1),this.center=new ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Pl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ia:t.x=t.x-Math.floor(t.x);break;case Jn:t.x=t.x<0?0:1;break;case sa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ia:t.y=t.y-Math.floor(t.y);break;case Jn:t.y=t.y<0?0:1;break;case sa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Le.DEFAULT_IMAGE=null;Le.DEFAULT_MAPPING=Pl;Le.DEFAULT_ANISOTROPY=1;class ce{constructor(t=0,e=0,n=0,s=1){ce.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],f=l[8],d=l[1],p=l[5],g=l[9],x=l[2],u=l[6],m=l[10];if(Math.abs(h-d)<.01&&Math.abs(f-x)<.01&&Math.abs(g-u)<.01){if(Math.abs(h+d)<.1&&Math.abs(f+x)<.1&&Math.abs(g+u)<.1&&Math.abs(c+p+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(c+1)/2,b=(p+1)/2,C=(m+1)/2,R=(h+d)/4,A=(f+x)/4,L=(g+u)/4;return M>b&&M>C?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=R/n,r=A/n):b>C?b<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),n=R/s,r=L/s):C<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),n=A/r,s=L/r),this.set(n,s,r,e),this}let E=Math.sqrt((u-g)*(u-g)+(f-x)*(f-x)+(d-h)*(d-h));return Math.abs(E)<.001&&(E=1),this.x=(u-g)/E,this.y=(f-x)/E,this.z=(d-h)/E,this.w=Math.acos((c+p+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Eh extends Ni{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ce(0,0,t,e),this.scissorTest=!1,this.viewport=new ce(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:je,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Le(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Wl(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class si extends Eh{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Xl extends Le{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=qe,this.minFilter=qe,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class bh extends Le{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=qe,this.minFilter=qe,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ns{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],f=n[s+3];const d=r[a+0],p=r[a+1],g=r[a+2],x=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=f;return}if(o===1){t[e+0]=d,t[e+1]=p,t[e+2]=g,t[e+3]=x;return}if(f!==x||l!==d||c!==p||h!==g){let u=1-o;const m=l*d+c*p+h*g+f*x,E=m>=0?1:-1,M=1-m*m;if(M>Number.EPSILON){const C=Math.sqrt(M),R=Math.atan2(C,m*E);u=Math.sin(u*R)/C,o=Math.sin(o*R)/C}const b=o*E;if(l=l*u+d*b,c=c*u+p*b,h=h*u+g*b,f=f*u+x*b,u===1-o){const C=1/Math.sqrt(l*l+c*c+h*h+f*f);l*=C,c*=C,h*=C,f*=C}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],f=r[a],d=r[a+1],p=r[a+2],g=r[a+3];return t[e]=o*g+h*f+l*p-c*d,t[e+1]=l*g+h*d+c*f-o*p,t[e+2]=c*g+h*p+o*d-l*f,t[e+3]=h*g-o*f-l*d-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),f=o(r/2),d=l(n/2),p=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=d*h*f+c*p*g,this._y=c*p*f-d*h*g,this._z=c*h*g+d*p*f,this._w=c*h*f-d*p*g;break;case"YXZ":this._x=d*h*f+c*p*g,this._y=c*p*f-d*h*g,this._z=c*h*g-d*p*f,this._w=c*h*f+d*p*g;break;case"ZXY":this._x=d*h*f-c*p*g,this._y=c*p*f+d*h*g,this._z=c*h*g+d*p*f,this._w=c*h*f-d*p*g;break;case"ZYX":this._x=d*h*f-c*p*g,this._y=c*p*f+d*h*g,this._z=c*h*g-d*p*f,this._w=c*h*f+d*p*g;break;case"YZX":this._x=d*h*f+c*p*g,this._y=c*p*f+d*h*g,this._z=c*h*g-d*p*f,this._w=c*h*f-d*p*g;break;case"XZY":this._x=d*h*f-c*p*g,this._y=c*p*f-d*h*g,this._z=c*h*g+d*p*f,this._w=c*h*f+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],f=e[10],d=n+o+f;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(n>o&&n>f){const p=2*Math.sqrt(1+n-o-f);this._w=(h-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>f){const p=2*Math.sqrt(1+o-n-f);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+f-n-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Me(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-e;return this._w=p*a+e*this._w,this._x=p*n+e*this._x,this._y=p*s+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),f=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=a*f+this._w*d,this._x=n*f+this._x*d,this._y=s*f+this._y*d,this._z=r*f+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(t=0,e=0,n=0){D.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Eo.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Eo.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),f=2*(r*n-a*e);return this.x=e+l*c+a*f-o*h,this.y=n+l*h+o*c-r*f,this.z=s+l*f+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return dr.copy(this).projectOnVector(t),this.sub(dr)}reflect(t){return this.sub(dr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Me(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const dr=new D,Eo=new ns;class is{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Ke.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Ke.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Ke.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Ke):Ke.fromBufferAttribute(r,a),Ke.applyMatrix4(t.matrixWorld),this.expandByPoint(Ke);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ls.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ls.copy(n.boundingBox)),ls.applyMatrix4(t.matrixWorld),this.union(ls)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ke),Ke.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ki),cs.subVectors(this.max,ki),ci.subVectors(t.a,ki),hi.subVectors(t.b,ki),ui.subVectors(t.c,ki),Tn.subVectors(hi,ci),wn.subVectors(ui,hi),zn.subVectors(ci,ui);let e=[0,-Tn.z,Tn.y,0,-wn.z,wn.y,0,-zn.z,zn.y,Tn.z,0,-Tn.x,wn.z,0,-wn.x,zn.z,0,-zn.x,-Tn.y,Tn.x,0,-wn.y,wn.x,0,-zn.y,zn.x,0];return!fr(e,ci,hi,ui,cs)||(e=[1,0,0,0,1,0,0,0,1],!fr(e,ci,hi,ui,cs))?!1:(hs.crossVectors(Tn,wn),e=[hs.x,hs.y,hs.z],fr(e,ci,hi,ui,cs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ke).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ke).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(pn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),pn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),pn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),pn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),pn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),pn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),pn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),pn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(pn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const pn=[new D,new D,new D,new D,new D,new D,new D,new D],Ke=new D,ls=new is,ci=new D,hi=new D,ui=new D,Tn=new D,wn=new D,zn=new D,ki=new D,cs=new D,hs=new D,kn=new D;function fr(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){kn.fromArray(i,r);const o=s.x*Math.abs(kn.x)+s.y*Math.abs(kn.y)+s.z*Math.abs(kn.z),l=t.dot(kn),c=e.dot(kn),h=n.dot(kn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Th=new is,Hi=new D,pr=new D;class Ka{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Th.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Hi.subVectors(t,this.center);const e=Hi.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Hi,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(pr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Hi.copy(t.center).add(pr)),this.expandByPoint(Hi.copy(t.center).sub(pr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const mn=new D,mr=new D,us=new D,An=new D,gr=new D,ds=new D,_r=new D;class wh{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,mn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=mn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(mn.copy(this.origin).addScaledVector(this.direction,e),mn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){mr.copy(t).add(e).multiplyScalar(.5),us.copy(e).sub(t).normalize(),An.copy(this.origin).sub(mr);const r=t.distanceTo(e)*.5,a=-this.direction.dot(us),o=An.dot(this.direction),l=-An.dot(us),c=An.lengthSq(),h=Math.abs(1-a*a);let f,d,p,g;if(h>0)if(f=a*l-o,d=a*o-l,g=r*h,f>=0)if(d>=-g)if(d<=g){const x=1/h;f*=x,d*=x,p=f*(f+a*d+2*o)+d*(a*f+d+2*l)+c}else d=r,f=Math.max(0,-(a*d+o)),p=-f*f+d*(d+2*l)+c;else d=-r,f=Math.max(0,-(a*d+o)),p=-f*f+d*(d+2*l)+c;else d<=-g?(f=Math.max(0,-(-a*r+o)),d=f>0?-r:Math.min(Math.max(-r,-l),r),p=-f*f+d*(d+2*l)+c):d<=g?(f=0,d=Math.min(Math.max(-r,-l),r),p=d*(d+2*l)+c):(f=Math.max(0,-(a*r+o)),d=f>0?r:Math.min(Math.max(-r,-l),r),p=-f*f+d*(d+2*l)+c);else d=a>0?-r:r,f=Math.max(0,-(a*d+o)),p=-f*f+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(mr).addScaledVector(us,d),p}intersectSphere(t,e){mn.subVectors(t.center,this.origin);const n=mn.dot(this.direction),s=mn.dot(mn)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,a=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,a=(t.min.y-d.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(t.min.z-d.z)*f,l=(t.max.z-d.z)*f):(o=(t.max.z-d.z)*f,l=(t.min.z-d.z)*f),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,mn)!==null}intersectTriangle(t,e,n,s,r){gr.subVectors(e,t),ds.subVectors(n,t),_r.crossVectors(gr,ds);let a=this.direction.dot(_r),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;An.subVectors(this.origin,t);const l=o*this.direction.dot(ds.crossVectors(An,ds));if(l<0)return null;const c=o*this.direction.dot(gr.cross(An));if(c<0||l+c>a)return null;const h=-o*An.dot(_r);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class oe{constructor(t,e,n,s,r,a,o,l,c,h,f,d,p,g,x,u){oe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,f,d,p,g,x,u)}set(t,e,n,s,r,a,o,l,c,h,f,d,p,g,x,u){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=f,m[14]=d,m[3]=p,m[7]=g,m[11]=x,m[15]=u,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new oe().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/di.setFromMatrixColumn(t,0).length(),r=1/di.setFromMatrixColumn(t,1).length(),a=1/di.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const d=a*h,p=a*f,g=o*h,x=o*f;e[0]=l*h,e[4]=-l*f,e[8]=c,e[1]=p+g*c,e[5]=d-x*c,e[9]=-o*l,e[2]=x-d*c,e[6]=g+p*c,e[10]=a*l}else if(t.order==="YXZ"){const d=l*h,p=l*f,g=c*h,x=c*f;e[0]=d+x*o,e[4]=g*o-p,e[8]=a*c,e[1]=a*f,e[5]=a*h,e[9]=-o,e[2]=p*o-g,e[6]=x+d*o,e[10]=a*l}else if(t.order==="ZXY"){const d=l*h,p=l*f,g=c*h,x=c*f;e[0]=d-x*o,e[4]=-a*f,e[8]=g+p*o,e[1]=p+g*o,e[5]=a*h,e[9]=x-d*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const d=a*h,p=a*f,g=o*h,x=o*f;e[0]=l*h,e[4]=g*c-p,e[8]=d*c+x,e[1]=l*f,e[5]=x*c+d,e[9]=p*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const d=a*l,p=a*c,g=o*l,x=o*c;e[0]=l*h,e[4]=x-d*f,e[8]=g*f+p,e[1]=f,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=p*f+g,e[10]=d-x*f}else if(t.order==="XZY"){const d=a*l,p=a*c,g=o*l,x=o*c;e[0]=l*h,e[4]=-f,e[8]=c*h,e[1]=d*f+x,e[5]=a*h,e[9]=p*f-g,e[2]=g*f-p,e[6]=o*h,e[10]=x*f+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Ah,t,Rh)}lookAt(t,e,n){const s=this.elements;return Be.subVectors(t,e),Be.lengthSq()===0&&(Be.z=1),Be.normalize(),Rn.crossVectors(n,Be),Rn.lengthSq()===0&&(Math.abs(n.z)===1?Be.x+=1e-4:Be.z+=1e-4,Be.normalize(),Rn.crossVectors(n,Be)),Rn.normalize(),fs.crossVectors(Be,Rn),s[0]=Rn.x,s[4]=fs.x,s[8]=Be.x,s[1]=Rn.y,s[5]=fs.y,s[9]=Be.y,s[2]=Rn.z,s[6]=fs.z,s[10]=Be.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],f=n[5],d=n[9],p=n[13],g=n[2],x=n[6],u=n[10],m=n[14],E=n[3],M=n[7],b=n[11],C=n[15],R=s[0],A=s[4],L=s[8],K=s[12],_=s[1],S=s[5],z=s[9],F=s[13],H=s[2],q=s[6],k=s[10],Z=s[14],G=s[3],W=s[7],tt=s[11],nt=s[15];return r[0]=a*R+o*_+l*H+c*G,r[4]=a*A+o*S+l*q+c*W,r[8]=a*L+o*z+l*k+c*tt,r[12]=a*K+o*F+l*Z+c*nt,r[1]=h*R+f*_+d*H+p*G,r[5]=h*A+f*S+d*q+p*W,r[9]=h*L+f*z+d*k+p*tt,r[13]=h*K+f*F+d*Z+p*nt,r[2]=g*R+x*_+u*H+m*G,r[6]=g*A+x*S+u*q+m*W,r[10]=g*L+x*z+u*k+m*tt,r[14]=g*K+x*F+u*Z+m*nt,r[3]=E*R+M*_+b*H+C*G,r[7]=E*A+M*S+b*q+C*W,r[11]=E*L+M*z+b*k+C*tt,r[15]=E*K+M*F+b*Z+C*nt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],f=t[6],d=t[10],p=t[14],g=t[3],x=t[7],u=t[11],m=t[15];return g*(+r*l*f-s*c*f-r*o*d+n*c*d+s*o*p-n*l*p)+x*(+e*l*p-e*c*d+r*a*d-s*a*p+s*c*h-r*l*h)+u*(+e*c*f-e*o*p-r*a*f+n*a*p+r*o*h-n*c*h)+m*(-s*o*h-e*l*f+e*o*d+s*a*f-n*a*d+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],f=t[9],d=t[10],p=t[11],g=t[12],x=t[13],u=t[14],m=t[15],E=f*u*c-x*d*c+x*l*p-o*u*p-f*l*m+o*d*m,M=g*d*c-h*u*c-g*l*p+a*u*p+h*l*m-a*d*m,b=h*x*c-g*f*c+g*o*p-a*x*p-h*o*m+a*f*m,C=g*f*l-h*x*l-g*o*d+a*x*d+h*o*u-a*f*u,R=e*E+n*M+s*b+r*C;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/R;return t[0]=E*A,t[1]=(x*d*r-f*u*r-x*s*p+n*u*p+f*s*m-n*d*m)*A,t[2]=(o*u*r-x*l*r+x*s*c-n*u*c-o*s*m+n*l*m)*A,t[3]=(f*l*r-o*d*r-f*s*c+n*d*c+o*s*p-n*l*p)*A,t[4]=M*A,t[5]=(h*u*r-g*d*r+g*s*p-e*u*p-h*s*m+e*d*m)*A,t[6]=(g*l*r-a*u*r-g*s*c+e*u*c+a*s*m-e*l*m)*A,t[7]=(a*d*r-h*l*r+h*s*c-e*d*c-a*s*p+e*l*p)*A,t[8]=b*A,t[9]=(g*f*r-h*x*r-g*n*p+e*x*p+h*n*m-e*f*m)*A,t[10]=(a*x*r-g*o*r+g*n*c-e*x*c-a*n*m+e*o*m)*A,t[11]=(h*o*r-a*f*r-h*n*c+e*f*c+a*n*p-e*o*p)*A,t[12]=C*A,t[13]=(h*x*s-g*f*s+g*n*d-e*x*d-h*n*u+e*f*u)*A,t[14]=(g*o*s-a*x*s-g*n*l+e*x*l+a*n*u-e*o*u)*A,t[15]=(a*f*s-h*o*s+h*n*l-e*f*l-a*n*d+e*o*d)*A,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,f=o+o,d=r*c,p=r*h,g=r*f,x=a*h,u=a*f,m=o*f,E=l*c,M=l*h,b=l*f,C=n.x,R=n.y,A=n.z;return s[0]=(1-(x+m))*C,s[1]=(p+b)*C,s[2]=(g-M)*C,s[3]=0,s[4]=(p-b)*R,s[5]=(1-(d+m))*R,s[6]=(u+E)*R,s[7]=0,s[8]=(g+M)*A,s[9]=(u-E)*A,s[10]=(1-(d+x))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=di.set(s[0],s[1],s[2]).length();const a=di.set(s[4],s[5],s[6]).length(),o=di.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Ze.copy(this);const c=1/r,h=1/a,f=1/o;return Ze.elements[0]*=c,Ze.elements[1]*=c,Ze.elements[2]*=c,Ze.elements[4]*=h,Ze.elements[5]*=h,Ze.elements[6]*=h,Ze.elements[8]*=f,Ze.elements[9]*=f,Ze.elements[10]*=f,e.setFromRotationMatrix(Ze),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=yn){const l=this.elements,c=2*r/(e-t),h=2*r/(n-s),f=(e+t)/(e-t),d=(n+s)/(n-s);let p,g;if(o===yn)p=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Ys)p=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=yn){const l=this.elements,c=1/(e-t),h=1/(n-s),f=1/(a-r),d=(e+t)*c,p=(n+s)*h;let g,x;if(o===yn)g=(a+r)*f,x=-2*f;else if(o===Ys)g=r*f,x=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=x,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const di=new D,Ze=new oe,Ah=new D(0,0,0),Rh=new D(1,1,1),Rn=new D,fs=new D,Be=new D,bo=new oe,To=new ns;class un{constructor(t=0,e=0,n=0,s=un.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],f=s[2],d=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Me(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Me(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Me(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Me(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Me(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Me(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return bo.makeRotationFromQuaternion(t),this.setFromRotationMatrix(bo,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return To.setFromEuler(this),this.setFromQuaternion(To,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}un.DEFAULT_ORDER="XYZ";class ql{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Ch=0;const wo=new D,fi=new ns,gn=new oe,ps=new D,Gi=new D,Ph=new D,Lh=new ns,Ao=new D(1,0,0),Ro=new D(0,1,0),Co=new D(0,0,1),Po={type:"added"},Ih={type:"removed"},pi={type:"childadded",child:null},vr={type:"childremoved",child:null};class be extends Ni{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ch++}),this.uuid=Fi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=be.DEFAULT_UP.clone();const t=new D,e=new un,n=new ns,s=new D(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new oe},normalMatrix:{value:new kt}}),this.matrix=new oe,this.matrixWorld=new oe,this.matrixAutoUpdate=be.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ql,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return fi.setFromAxisAngle(t,e),this.quaternion.multiply(fi),this}rotateOnWorldAxis(t,e){return fi.setFromAxisAngle(t,e),this.quaternion.premultiply(fi),this}rotateX(t){return this.rotateOnAxis(Ao,t)}rotateY(t){return this.rotateOnAxis(Ro,t)}rotateZ(t){return this.rotateOnAxis(Co,t)}translateOnAxis(t,e){return wo.copy(t).applyQuaternion(this.quaternion),this.position.add(wo.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ao,t)}translateY(t){return this.translateOnAxis(Ro,t)}translateZ(t){return this.translateOnAxis(Co,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(gn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ps.copy(t):ps.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Gi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?gn.lookAt(Gi,ps,this.up):gn.lookAt(ps,Gi,this.up),this.quaternion.setFromRotationMatrix(gn),s&&(gn.extractRotation(s.matrixWorld),fi.setFromRotationMatrix(gn),this.quaternion.premultiply(fi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Po),pi.child=t,this.dispatchEvent(pi),pi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Ih),vr.child=t,this.dispatchEvent(vr),vr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),gn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),gn.multiply(t.parent.matrixWorld)),t.applyMatrix4(gn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Po),pi.child=t,this.dispatchEvent(pi),pi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gi,t,Ph),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gi,Lh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const f=l[c];r(t.shapes,f)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),f=a(t.shapes),d=a(t.skeletons),p=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}be.DEFAULT_UP=new D(0,1,0);be.DEFAULT_MATRIX_AUTO_UPDATE=!0;be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Je=new D,_n=new D,xr=new D,vn=new D,mi=new D,gi=new D,Lo=new D,Mr=new D,Sr=new D,yr=new D,Er=new ce,br=new ce,Tr=new ce;class Qe{constructor(t=new D,e=new D,n=new D){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Je.subVectors(t,e),s.cross(Je);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Je.subVectors(s,e),_n.subVectors(n,e),xr.subVectors(t,e);const a=Je.dot(Je),o=Je.dot(_n),l=Je.dot(xr),c=_n.dot(_n),h=_n.dot(xr),f=a*c-o*o;if(f===0)return r.set(0,0,0),null;const d=1/f,p=(c*l-o*h)*d,g=(a*h-o*l)*d;return r.set(1-p-g,g,p)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,vn)===null?!1:vn.x>=0&&vn.y>=0&&vn.x+vn.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,vn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,vn.x),l.addScaledVector(a,vn.y),l.addScaledVector(o,vn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return Er.setScalar(0),br.setScalar(0),Tr.setScalar(0),Er.fromBufferAttribute(t,e),br.fromBufferAttribute(t,n),Tr.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Er,r.x),a.addScaledVector(br,r.y),a.addScaledVector(Tr,r.z),a}static isFrontFacing(t,e,n,s){return Je.subVectors(n,e),_n.subVectors(t,e),Je.cross(_n).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Je.subVectors(this.c,this.b),_n.subVectors(this.a,this.b),Je.cross(_n).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Qe.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Qe.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Qe.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Qe.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Qe.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;mi.subVectors(s,n),gi.subVectors(r,n),Mr.subVectors(t,n);const l=mi.dot(Mr),c=gi.dot(Mr);if(l<=0&&c<=0)return e.copy(n);Sr.subVectors(t,s);const h=mi.dot(Sr),f=gi.dot(Sr);if(h>=0&&f<=h)return e.copy(s);const d=l*f-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(mi,a);yr.subVectors(t,r);const p=mi.dot(yr),g=gi.dot(yr);if(g>=0&&p<=g)return e.copy(r);const x=p*c-l*g;if(x<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(gi,o);const u=h*g-p*f;if(u<=0&&f-h>=0&&p-g>=0)return Lo.subVectors(r,s),o=(f-h)/(f-h+(p-g)),e.copy(s).addScaledVector(Lo,o);const m=1/(u+x+d);return a=x*m,o=d*m,e.copy(n).addScaledVector(mi,a).addScaledVector(gi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Yl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Cn={h:0,s:0,l:0},ms={h:0,s:0,l:0};function wr(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Vt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=He){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Jt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=Jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Jt.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=Jt.workingColorSpace){if(t=ph(t,1),e=Me(e,0,1),n=Me(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=wr(a,r,t+1/3),this.g=wr(a,r,t),this.b=wr(a,r,t-1/3)}return Jt.toWorkingColorSpace(this,s),this}setStyle(t,e=He){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=He){const n=Yl[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ai(t.r),this.g=Ai(t.g),this.b=Ai(t.b),this}copyLinearToSRGB(t){return this.r=hr(t.r),this.g=hr(t.g),this.b=hr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=He){return Jt.fromWorkingColorSpace(we.copy(this),t),Math.round(Me(we.r*255,0,255))*65536+Math.round(Me(we.g*255,0,255))*256+Math.round(Me(we.b*255,0,255))}getHexString(t=He){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Jt.workingColorSpace){Jt.fromWorkingColorSpace(we.copy(this),e);const n=we.r,s=we.g,r=we.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=h<=.5?f/(a+o):f/(2-a-o),a){case n:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-n)/f+2;break;case r:l=(n-s)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Jt.workingColorSpace){return Jt.fromWorkingColorSpace(we.copy(this),e),t.r=we.r,t.g=we.g,t.b=we.b,t}getStyle(t=He){Jt.fromWorkingColorSpace(we.copy(this),t);const e=we.r,n=we.g,s=we.b;return t!==He?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Cn),this.setHSL(Cn.h+t,Cn.s+e,Cn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Cn),t.getHSL(ms);const n=lr(Cn.h,ms.h,e),s=lr(Cn.s,ms.s,e),r=lr(Cn.l,ms.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const we=new Vt;Vt.NAMES=Yl;let Dh=0;class ss extends Ni{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Dh++}),this.uuid=Fi(),this.name="",this.type="Material",this.blending=Ti,this.side=Nn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=qr,this.blendDst=Yr,this.blendEquation=Yn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Vt(0,0,0),this.blendAlpha=0,this.depthFunc=Ri,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=_o,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=oi,this.stencilZFail=oi,this.stencilZPass=oi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ti&&(n.blending=this.blending),this.side!==Nn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==qr&&(n.blendSrc=this.blendSrc),this.blendDst!==Yr&&(n.blendDst=this.blendDst),this.blendEquation!==Yn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ri&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==_o&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==oi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==oi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==oi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class cn extends ss{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Vt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new un,this.combine=Rl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const fe=new D,gs=new ot;class hn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=vo,this.updateRanges=[],this.gpuType=Sn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)gs.fromBufferAttribute(this,e),gs.applyMatrix3(t),this.setXY(e,gs.x,gs.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)fe.fromBufferAttribute(this,e),fe.applyMatrix3(t),this.setXYZ(e,fe.x,fe.y,fe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)fe.fromBufferAttribute(this,e),fe.applyMatrix4(t),this.setXYZ(e,fe.x,fe.y,fe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)fe.fromBufferAttribute(this,e),fe.applyNormalMatrix(t),this.setXYZ(e,fe.x,fe.y,fe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)fe.fromBufferAttribute(this,e),fe.transformDirection(t),this.setXYZ(e,fe.x,fe.y,fe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Bi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ue(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Bi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ue(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Bi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ue(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Bi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ue(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Bi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ue(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ue(e,this.array),n=Ue(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Ue(e,this.array),n=Ue(n,this.array),s=Ue(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Ue(e,this.array),n=Ue(n,this.array),s=Ue(s,this.array),r=Ue(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==vo&&(t.usage=this.usage),t}}class $l extends hn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Kl extends hn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ue extends hn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Uh=0;const Ve=new oe,Ar=new be,_i=new D,ze=new is,Vi=new is,_e=new D;class Ye extends Ni{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Uh++}),this.uuid=Fi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Vl(t)?Kl:$l)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new kt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ve.makeRotationFromQuaternion(t),this.applyMatrix4(Ve),this}rotateX(t){return Ve.makeRotationX(t),this.applyMatrix4(Ve),this}rotateY(t){return Ve.makeRotationY(t),this.applyMatrix4(Ve),this}rotateZ(t){return Ve.makeRotationZ(t),this.applyMatrix4(Ve),this}translate(t,e,n){return Ve.makeTranslation(t,e,n),this.applyMatrix4(Ve),this}scale(t,e,n){return Ve.makeScale(t,e,n),this.applyMatrix4(Ve),this}lookAt(t){return Ar.lookAt(t),Ar.updateMatrix(),this.applyMatrix4(Ar.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_i).negate(),this.translate(_i.x,_i.y,_i.z),this}setFromPoints(t){const e=[];for(let n=0,s=t.length;n<s;n++){const r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new ue(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new is);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];ze.setFromBufferAttribute(r),this.morphTargetsRelative?(_e.addVectors(this.boundingBox.min,ze.min),this.boundingBox.expandByPoint(_e),_e.addVectors(this.boundingBox.max,ze.max),this.boundingBox.expandByPoint(_e)):(this.boundingBox.expandByPoint(ze.min),this.boundingBox.expandByPoint(ze.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ka);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){const n=this.boundingSphere.center;if(ze.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Vi.setFromBufferAttribute(o),this.morphTargetsRelative?(_e.addVectors(ze.min,Vi.min),ze.expandByPoint(_e),_e.addVectors(ze.max,Vi.max),ze.expandByPoint(_e)):(ze.expandByPoint(Vi.min),ze.expandByPoint(Vi.max))}ze.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)_e.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(_e));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)_e.fromBufferAttribute(o,c),l&&(_i.fromBufferAttribute(t,c),_e.add(_i)),s=Math.max(s,n.distanceToSquared(_e))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new hn(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let L=0;L<n.count;L++)o[L]=new D,l[L]=new D;const c=new D,h=new D,f=new D,d=new ot,p=new ot,g=new ot,x=new D,u=new D;function m(L,K,_){c.fromBufferAttribute(n,L),h.fromBufferAttribute(n,K),f.fromBufferAttribute(n,_),d.fromBufferAttribute(r,L),p.fromBufferAttribute(r,K),g.fromBufferAttribute(r,_),h.sub(c),f.sub(c),p.sub(d),g.sub(d);const S=1/(p.x*g.y-g.x*p.y);isFinite(S)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(f,-p.y).multiplyScalar(S),u.copy(f).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(S),o[L].add(x),o[K].add(x),o[_].add(x),l[L].add(u),l[K].add(u),l[_].add(u))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let L=0,K=E.length;L<K;++L){const _=E[L],S=_.start,z=_.count;for(let F=S,H=S+z;F<H;F+=3)m(t.getX(F+0),t.getX(F+1),t.getX(F+2))}const M=new D,b=new D,C=new D,R=new D;function A(L){C.fromBufferAttribute(s,L),R.copy(C);const K=o[L];M.copy(K),M.sub(C.multiplyScalar(C.dot(K))).normalize(),b.crossVectors(R,K);const S=b.dot(l[L])<0?-1:1;a.setXYZW(L,M.x,M.y,M.z,S)}for(let L=0,K=E.length;L<K;++L){const _=E[L],S=_.start,z=_.count;for(let F=S,H=S+z;F<H;F+=3)A(t.getX(F+0)),A(t.getX(F+1)),A(t.getX(F+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new hn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);const s=new D,r=new D,a=new D,o=new D,l=new D,c=new D,h=new D,f=new D;if(t)for(let d=0,p=t.count;d<p;d+=3){const g=t.getX(d+0),x=t.getX(d+1),u=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),a.fromBufferAttribute(e,u),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,u),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(u,c.x,c.y,c.z)}else for(let d=0,p=e.count;d<p;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)_e.fromBufferAttribute(t,e),_e.normalize(),t.setXYZ(e,_e.x,_e.y,_e.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,f=o.normalized,d=new c.constructor(l.length*h);let p=0,g=0;for(let x=0,u=l.length;x<u;x++){o.isInterleavedBufferAttribute?p=l[x]*o.data.stride+o.offset:p=l[x]*h;for(let m=0;m<h;m++)d[g++]=c[p++]}return new hn(d,h,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ye,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,f=c.length;h<f;h++){const d=c[h],p=t(d,n);l.push(p)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let f=0,d=c.length;f<d;f++){const p=c[f];h.push(p.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],f=r[c];for(let d=0,p=f.length;d<p;d++)h.push(f[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Io=new oe,Hn=new wh,_s=new Ka,Do=new D,vs=new D,xs=new D,Ms=new D,Rr=new D,Ss=new D,Uo=new D,ys=new D;class rt extends be{constructor(t=new Ye,e=new cn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){Ss.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],f=r[l];h!==0&&(Rr.fromBufferAttribute(f,t),a?Ss.addScaledVector(Rr,h):Ss.addScaledVector(Rr.sub(e),h))}e.add(Ss)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),_s.copy(n.boundingSphere),_s.applyMatrix4(r),Hn.copy(t.ray).recast(t.near),!(_s.containsPoint(Hn.origin)===!1&&(Hn.intersectSphere(_s,Do)===null||Hn.origin.distanceToSquared(Do)>(t.far-t.near)**2))&&(Io.copy(r).invert(),Hn.copy(t.ray).applyMatrix4(Io),!(n.boundingBox!==null&&Hn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Hn)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,d=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=d.length;g<x;g++){const u=d[g],m=a[u.materialIndex],E=Math.max(u.start,p.start),M=Math.min(o.count,Math.min(u.start+u.count,p.start+p.count));for(let b=E,C=M;b<C;b+=3){const R=o.getX(b),A=o.getX(b+1),L=o.getX(b+2);s=Es(this,m,t,n,c,h,f,R,A,L),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=u.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),x=Math.min(o.count,p.start+p.count);for(let u=g,m=x;u<m;u+=3){const E=o.getX(u),M=o.getX(u+1),b=o.getX(u+2);s=Es(this,a,t,n,c,h,f,E,M,b),s&&(s.faceIndex=Math.floor(u/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,x=d.length;g<x;g++){const u=d[g],m=a[u.materialIndex],E=Math.max(u.start,p.start),M=Math.min(l.count,Math.min(u.start+u.count,p.start+p.count));for(let b=E,C=M;b<C;b+=3){const R=b,A=b+1,L=b+2;s=Es(this,m,t,n,c,h,f,R,A,L),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=u.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let u=g,m=x;u<m;u+=3){const E=u,M=u+1,b=u+2;s=Es(this,a,t,n,c,h,f,E,M,b),s&&(s.faceIndex=Math.floor(u/3),e.push(s))}}}}function Nh(i,t,e,n,s,r,a,o){let l;if(t.side===Ne?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===Nn,o),l===null)return null;ys.copy(o),ys.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(ys);return c<e.near||c>e.far?null:{distance:c,point:ys.clone(),object:i}}function Es(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,vs),i.getVertexPosition(l,xs),i.getVertexPosition(c,Ms);const h=Nh(i,t,e,n,vs,xs,Ms,Uo);if(h){const f=new D;Qe.getBarycoord(Uo,vs,xs,Ms,f),s&&(h.uv=Qe.getInterpolatedAttribute(s,o,l,c,f,new ot)),r&&(h.uv1=Qe.getInterpolatedAttribute(r,o,l,c,f,new ot)),a&&(h.normal=Qe.getInterpolatedAttribute(a,o,l,c,f,new D),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new D,materialIndex:0};Qe.getNormal(vs,xs,Ms,d.normal),h.face=d,h.barycoord=f}return h}class Se extends Ye{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],f=[];let d=0,p=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new ue(c,3)),this.setAttribute("normal",new ue(h,3)),this.setAttribute("uv",new ue(f,2));function g(x,u,m,E,M,b,C,R,A,L,K){const _=b/A,S=C/L,z=b/2,F=C/2,H=R/2,q=A+1,k=L+1;let Z=0,G=0;const W=new D;for(let tt=0;tt<k;tt++){const nt=tt*S-F;for(let Nt=0;Nt<q;Nt++){const Ht=Nt*_-z;W[x]=Ht*E,W[u]=nt*M,W[m]=H,c.push(W.x,W.y,W.z),W[x]=0,W[u]=0,W[m]=R>0?1:-1,h.push(W.x,W.y,W.z),f.push(Nt/A),f.push(1-tt/L),Z+=1}}for(let tt=0;tt<L;tt++)for(let nt=0;nt<A;nt++){const Nt=d+nt+q*tt,Ht=d+nt+q*(tt+1),X=d+(nt+1)+q*(tt+1),et=d+(nt+1)+q*tt;l.push(Nt,Ht,et),l.push(Ht,X,et),G+=6}o.addGroup(p,G,K),p+=G,d+=Z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Se(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Di(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Re(i){const t={};for(let e=0;e<i.length;e++){const n=Di(i[e]);for(const s in n)t[s]=n[s]}return t}function Fh(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Zl(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Jt.workingColorSpace}const Oh={clone:Di,merge:Re};var Bh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,zh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Fn extends ss{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Bh,this.fragmentShader=zh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Di(t.uniforms),this.uniformsGroups=Fh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Jl extends be{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new oe,this.projectionMatrix=new oe,this.projectionMatrixInverse=new oe,this.coordinateSystem=yn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Pn=new D,No=new ot,Fo=new ot;class We extends Jl{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=La*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(or*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return La*2*Math.atan(Math.tan(or*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Pn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Pn.x,Pn.y).multiplyScalar(-t/Pn.z),Pn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Pn.x,Pn.y).multiplyScalar(-t/Pn.z)}getViewSize(t,e){return this.getViewBounds(t,No,Fo),e.subVectors(Fo,No)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(or*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const vi=-90,xi=1;class kh extends be{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new We(vi,xi,t,e);s.layers=this.layers,this.add(s);const r=new We(vi,xi,t,e);r.layers=this.layers,this.add(r);const a=new We(vi,xi,t,e);a.layers=this.layers,this.add(a);const o=new We(vi,xi,t,e);o.layers=this.layers,this.add(o);const l=new We(vi,xi,t,e);l.layers=this.layers,this.add(l);const c=new We(vi,xi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===yn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ys)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,f=t.getRenderTarget(),d=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(f,d,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class jl extends Le{constructor(t,e,n,s,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Ci,super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Hh extends si{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new jl(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:je}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Se(5,5,5),r=new Fn({name:"CubemapFromEquirect",uniforms:Di(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ne,blending:In});r.uniforms.tEquirect.value=e;const a=new rt(s,r),o=e.minFilter;return e.minFilter===jn&&(e.minFilter=je),new kh(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}const Cr=new D,Gh=new D,Vh=new kt;class Xn{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Cr.subVectors(n,e).cross(Gh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Cr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Vh.getNormalMatrix(t),s=this.coplanarPoint(Cr).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Gn=new Ka,bs=new D;class Za{constructor(t=new Xn,e=new Xn,n=new Xn,s=new Xn,r=new Xn,a=new Xn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=yn){const n=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],f=s[6],d=s[7],p=s[8],g=s[9],x=s[10],u=s[11],m=s[12],E=s[13],M=s[14],b=s[15];if(n[0].setComponents(l-r,d-c,u-p,b-m).normalize(),n[1].setComponents(l+r,d+c,u+p,b+m).normalize(),n[2].setComponents(l+a,d+h,u+g,b+E).normalize(),n[3].setComponents(l-a,d-h,u-g,b-E).normalize(),n[4].setComponents(l-o,d-f,u-x,b-M).normalize(),e===yn)n[5].setComponents(l+o,d+f,u+x,b+M).normalize();else if(e===Ys)n[5].setComponents(o,f,x,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Gn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Gn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Gn)}intersectsSprite(t){return Gn.center.set(0,0,0),Gn.radius=.7071067811865476,Gn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Gn)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(bs.x=s.normal.x>0?t.max.x:t.min.x,bs.y=s.normal.y>0?t.max.y:t.min.y,bs.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(bs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Ql(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Wh(i){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,f=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),o.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,l,c){const h=l.array,f=l.updateRanges;if(i.bindBuffer(c,o),f.length===0)i.bufferSubData(c,0,h);else{f.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<f.length;p++){const g=f[d],x=f[p];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++d,f[d]=x)}f.length=d+1;for(let p=0,g=f.length;p<g;p++){const x=f[p];i.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}class nn extends Ye{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,f=t/o,d=e/l,p=[],g=[],x=[],u=[];for(let m=0;m<h;m++){const E=m*d-a;for(let M=0;M<c;M++){const b=M*f-r;g.push(b,-E,0),x.push(0,0,1),u.push(M/o),u.push(1-m/l)}}for(let m=0;m<l;m++)for(let E=0;E<o;E++){const M=E+c*m,b=E+c*(m+1),C=E+1+c*(m+1),R=E+1+c*m;p.push(M,b,R),p.push(b,C,R)}this.setIndex(p),this.setAttribute("position",new ue(g,3)),this.setAttribute("normal",new ue(x,3)),this.setAttribute("uv",new ue(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new nn(t.width,t.height,t.widthSegments,t.heightSegments)}}var Xh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,qh=`#ifdef USE_ALPHAHASH
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
#endif`,Yh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,$h=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Kh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Zh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Jh=`#ifdef USE_AOMAP
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
#endif`,jh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Qh=`#ifdef USE_BATCHING
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
#endif`,tu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,eu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,nu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,iu=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,su=`#ifdef USE_IRIDESCENCE
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
#endif`,ru=`#ifdef USE_BUMPMAP
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
#endif`,au=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,ou=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,lu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,cu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,hu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,uu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,du=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,fu=`#if defined( USE_COLOR_ALPHA )
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
#endif`,pu=`#define PI 3.141592653589793
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
} // validated`,mu=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,gu=`vec3 transformedNormal = objectNormal;
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
#endif`,_u=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,vu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,xu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Mu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Su="gl_FragColor = linearToOutputTexel( gl_FragColor );",yu=`
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
}`,Eu=`#ifdef USE_ENVMAP
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
#endif`,bu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Tu=`#ifdef USE_ENVMAP
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
#endif`,wu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Au=`#ifdef USE_ENVMAP
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
#endif`,Ru=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Cu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Pu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Lu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Iu=`#ifdef USE_GRADIENTMAP
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
}`,Du=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Uu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Nu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Fu=`uniform bool receiveShadow;
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
#endif`,Ou=`#ifdef USE_ENVMAP
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
#endif`,Bu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,zu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ku=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Hu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Gu=`PhysicalMaterial material;
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
#endif`,Vu=`struct PhysicalMaterial {
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
}`,Wu=`
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
#endif`,Xu=`#if defined( RE_IndirectDiffuse )
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
#endif`,qu=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Yu=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,$u=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ku=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zu=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ju=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ju=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Qu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,td=`#if defined( USE_POINTS_UV )
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
#endif`,ed=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,nd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,id=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,sd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,rd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ad=`#ifdef USE_MORPHTARGETS
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
#endif`,od=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ld=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,cd=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,hd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ud=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,dd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,fd=`#ifdef USE_NORMALMAP
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
#endif`,pd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,md=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,gd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,_d=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,vd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,xd=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Md=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Sd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,yd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ed=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,bd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Td=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,wd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ad=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Rd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Cd=`float getShadowMask() {
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
}`,Pd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ld=`#ifdef USE_SKINNING
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
#endif`,Id=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Dd=`#ifdef USE_SKINNING
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
#endif`,Ud=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Nd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Fd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Od=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Bd=`#ifdef USE_TRANSMISSION
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
#endif`,zd=`#ifdef USE_TRANSMISSION
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
#endif`,kd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Hd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Gd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Vd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Wd=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Xd=`uniform sampler2D t2D;
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
}`,qd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yd=`#ifdef ENVMAP_TYPE_CUBE
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
}`,$d=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Kd=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zd=`#include <common>
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
}`,Jd=`#if DEPTH_PACKING == 3200
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
}`,jd=`#define DISTANCE
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
}`,Qd=`#define DISTANCE
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
}`,tf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ef=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nf=`uniform float scale;
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
}`,sf=`uniform vec3 diffuse;
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
}`,rf=`#include <common>
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
}`,af=`uniform vec3 diffuse;
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
}`,of=`#define LAMBERT
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
}`,lf=`#define LAMBERT
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
}`,cf=`#define MATCAP
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
}`,hf=`#define MATCAP
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
}`,uf=`#define NORMAL
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
}`,df=`#define NORMAL
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
}`,ff=`#define PHONG
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
}`,pf=`#define PHONG
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
}`,mf=`#define STANDARD
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
}`,gf=`#define STANDARD
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
}`,_f=`#define TOON
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
}`,vf=`#define TOON
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
}`,xf=`uniform float size;
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
}`,Mf=`uniform vec3 diffuse;
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
}`,Sf=`#include <common>
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
}`,yf=`uniform vec3 color;
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
}`,Ef=`uniform float rotation;
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
}`,bf=`uniform vec3 diffuse;
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
}`,zt={alphahash_fragment:Xh,alphahash_pars_fragment:qh,alphamap_fragment:Yh,alphamap_pars_fragment:$h,alphatest_fragment:Kh,alphatest_pars_fragment:Zh,aomap_fragment:Jh,aomap_pars_fragment:jh,batching_pars_vertex:Qh,batching_vertex:tu,begin_vertex:eu,beginnormal_vertex:nu,bsdfs:iu,iridescence_fragment:su,bumpmap_pars_fragment:ru,clipping_planes_fragment:au,clipping_planes_pars_fragment:ou,clipping_planes_pars_vertex:lu,clipping_planes_vertex:cu,color_fragment:hu,color_pars_fragment:uu,color_pars_vertex:du,color_vertex:fu,common:pu,cube_uv_reflection_fragment:mu,defaultnormal_vertex:gu,displacementmap_pars_vertex:_u,displacementmap_vertex:vu,emissivemap_fragment:xu,emissivemap_pars_fragment:Mu,colorspace_fragment:Su,colorspace_pars_fragment:yu,envmap_fragment:Eu,envmap_common_pars_fragment:bu,envmap_pars_fragment:Tu,envmap_pars_vertex:wu,envmap_physical_pars_fragment:Ou,envmap_vertex:Au,fog_vertex:Ru,fog_pars_vertex:Cu,fog_fragment:Pu,fog_pars_fragment:Lu,gradientmap_pars_fragment:Iu,lightmap_pars_fragment:Du,lights_lambert_fragment:Uu,lights_lambert_pars_fragment:Nu,lights_pars_begin:Fu,lights_toon_fragment:Bu,lights_toon_pars_fragment:zu,lights_phong_fragment:ku,lights_phong_pars_fragment:Hu,lights_physical_fragment:Gu,lights_physical_pars_fragment:Vu,lights_fragment_begin:Wu,lights_fragment_maps:Xu,lights_fragment_end:qu,logdepthbuf_fragment:Yu,logdepthbuf_pars_fragment:$u,logdepthbuf_pars_vertex:Ku,logdepthbuf_vertex:Zu,map_fragment:Ju,map_pars_fragment:ju,map_particle_fragment:Qu,map_particle_pars_fragment:td,metalnessmap_fragment:ed,metalnessmap_pars_fragment:nd,morphinstance_vertex:id,morphcolor_vertex:sd,morphnormal_vertex:rd,morphtarget_pars_vertex:ad,morphtarget_vertex:od,normal_fragment_begin:ld,normal_fragment_maps:cd,normal_pars_fragment:hd,normal_pars_vertex:ud,normal_vertex:dd,normalmap_pars_fragment:fd,clearcoat_normal_fragment_begin:pd,clearcoat_normal_fragment_maps:md,clearcoat_pars_fragment:gd,iridescence_pars_fragment:_d,opaque_fragment:vd,packing:xd,premultiplied_alpha_fragment:Md,project_vertex:Sd,dithering_fragment:yd,dithering_pars_fragment:Ed,roughnessmap_fragment:bd,roughnessmap_pars_fragment:Td,shadowmap_pars_fragment:wd,shadowmap_pars_vertex:Ad,shadowmap_vertex:Rd,shadowmask_pars_fragment:Cd,skinbase_vertex:Pd,skinning_pars_vertex:Ld,skinning_vertex:Id,skinnormal_vertex:Dd,specularmap_fragment:Ud,specularmap_pars_fragment:Nd,tonemapping_fragment:Fd,tonemapping_pars_fragment:Od,transmission_fragment:Bd,transmission_pars_fragment:zd,uv_pars_fragment:kd,uv_pars_vertex:Hd,uv_vertex:Gd,worldpos_vertex:Vd,background_vert:Wd,background_frag:Xd,backgroundCube_vert:qd,backgroundCube_frag:Yd,cube_vert:$d,cube_frag:Kd,depth_vert:Zd,depth_frag:Jd,distanceRGBA_vert:jd,distanceRGBA_frag:Qd,equirect_vert:tf,equirect_frag:ef,linedashed_vert:nf,linedashed_frag:sf,meshbasic_vert:rf,meshbasic_frag:af,meshlambert_vert:of,meshlambert_frag:lf,meshmatcap_vert:cf,meshmatcap_frag:hf,meshnormal_vert:uf,meshnormal_frag:df,meshphong_vert:ff,meshphong_frag:pf,meshphysical_vert:mf,meshphysical_frag:gf,meshtoon_vert:_f,meshtoon_frag:vf,points_vert:xf,points_frag:Mf,shadow_vert:Sf,shadow_frag:yf,sprite_vert:Ef,sprite_frag:bf},dt={common:{diffuse:{value:new Vt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new kt}},envmap:{envMap:{value:null},envMapRotation:{value:new kt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new kt},normalScale:{value:new ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Vt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Vt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0},uvTransform:{value:new kt}},sprite:{diffuse:{value:new Vt(16777215)},opacity:{value:1},center:{value:new ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}}},an={basic:{uniforms:Re([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.fog]),vertexShader:zt.meshbasic_vert,fragmentShader:zt.meshbasic_frag},lambert:{uniforms:Re([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Vt(0)}}]),vertexShader:zt.meshlambert_vert,fragmentShader:zt.meshlambert_frag},phong:{uniforms:Re([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Vt(0)},specular:{value:new Vt(1118481)},shininess:{value:30}}]),vertexShader:zt.meshphong_vert,fragmentShader:zt.meshphong_frag},standard:{uniforms:Re([dt.common,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.roughnessmap,dt.metalnessmap,dt.fog,dt.lights,{emissive:{value:new Vt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag},toon:{uniforms:Re([dt.common,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.gradientmap,dt.fog,dt.lights,{emissive:{value:new Vt(0)}}]),vertexShader:zt.meshtoon_vert,fragmentShader:zt.meshtoon_frag},matcap:{uniforms:Re([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,{matcap:{value:null}}]),vertexShader:zt.meshmatcap_vert,fragmentShader:zt.meshmatcap_frag},points:{uniforms:Re([dt.points,dt.fog]),vertexShader:zt.points_vert,fragmentShader:zt.points_frag},dashed:{uniforms:Re([dt.common,dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:zt.linedashed_vert,fragmentShader:zt.linedashed_frag},depth:{uniforms:Re([dt.common,dt.displacementmap]),vertexShader:zt.depth_vert,fragmentShader:zt.depth_frag},normal:{uniforms:Re([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,{opacity:{value:1}}]),vertexShader:zt.meshnormal_vert,fragmentShader:zt.meshnormal_frag},sprite:{uniforms:Re([dt.sprite,dt.fog]),vertexShader:zt.sprite_vert,fragmentShader:zt.sprite_frag},background:{uniforms:{uvTransform:{value:new kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:zt.background_vert,fragmentShader:zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new kt}},vertexShader:zt.backgroundCube_vert,fragmentShader:zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:zt.cube_vert,fragmentShader:zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:zt.equirect_vert,fragmentShader:zt.equirect_frag},distanceRGBA:{uniforms:Re([dt.common,dt.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:zt.distanceRGBA_vert,fragmentShader:zt.distanceRGBA_frag},shadow:{uniforms:Re([dt.lights,dt.fog,{color:{value:new Vt(0)},opacity:{value:1}}]),vertexShader:zt.shadow_vert,fragmentShader:zt.shadow_frag}};an.physical={uniforms:Re([an.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new kt},clearcoatNormalScale:{value:new ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new kt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new kt},sheen:{value:0},sheenColor:{value:new Vt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new kt},transmissionSamplerSize:{value:new ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new kt},attenuationDistance:{value:0},attenuationColor:{value:new Vt(0)},specularColor:{value:new Vt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new kt},anisotropyVector:{value:new ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new kt}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag};const Ts={r:0,b:0,g:0},Vn=new un,Tf=new oe;function wf(i,t,e,n,s,r,a){const o=new Vt(0);let l=r===!0?0:1,c,h,f=null,d=0,p=null;function g(E){let M=E.isScene===!0?E.background:null;return M&&M.isTexture&&(M=(E.backgroundBlurriness>0?e:t).get(M)),M}function x(E){let M=!1;const b=g(E);b===null?m(o,l):b&&b.isColor&&(m(b,1),M=!0);const C=i.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,a):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function u(E,M){const b=g(M);b&&(b.isCubeTexture||b.mapping===Js)?(h===void 0&&(h=new rt(new Se(1,1,1),new Fn({name:"BackgroundCubeMaterial",uniforms:Di(an.backgroundCube.uniforms),vertexShader:an.backgroundCube.vertexShader,fragmentShader:an.backgroundCube.fragmentShader,side:Ne,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,R,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Vn.copy(M.backgroundRotation),Vn.x*=-1,Vn.y*=-1,Vn.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Vn.y*=-1,Vn.z*=-1),h.material.uniforms.envMap.value=b,h.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Tf.makeRotationFromEuler(Vn)),h.material.toneMapped=Jt.getTransfer(b.colorSpace)!==ne,(f!==b||d!==b.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,f=b,d=b.version,p=i.toneMapping),h.layers.enableAll(),E.unshift(h,h.geometry,h.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new rt(new nn(2,2),new Fn({name:"BackgroundMaterial",uniforms:Di(an.background.uniforms),vertexShader:an.background.vertexShader,fragmentShader:an.background.fragmentShader,side:Nn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=Jt.getTransfer(b.colorSpace)!==ne,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(f!==b||d!==b.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,f=b,d=b.version,p=i.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function m(E,M){E.getRGB(Ts,Zl(i)),n.buffers.color.setClear(Ts.r,Ts.g,Ts.b,M,a)}return{getClearColor:function(){return o},setClearColor:function(E,M=1){o.set(E),l=M,m(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(E){l=E,m(o,l)},render:x,addToRenderList:u}}function Af(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,a=!1;function o(_,S,z,F,H){let q=!1;const k=f(F,z,S);r!==k&&(r=k,c(r.object)),q=p(_,F,z,H),q&&g(_,F,z,H),H!==null&&t.update(H,i.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,b(_,S,z,F),H!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function l(){return i.createVertexArray()}function c(_){return i.bindVertexArray(_)}function h(_){return i.deleteVertexArray(_)}function f(_,S,z){const F=z.wireframe===!0;let H=n[_.id];H===void 0&&(H={},n[_.id]=H);let q=H[S.id];q===void 0&&(q={},H[S.id]=q);let k=q[F];return k===void 0&&(k=d(l()),q[F]=k),k}function d(_){const S=[],z=[],F=[];for(let H=0;H<e;H++)S[H]=0,z[H]=0,F[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:S,enabledAttributes:z,attributeDivisors:F,object:_,attributes:{},index:null}}function p(_,S,z,F){const H=r.attributes,q=S.attributes;let k=0;const Z=z.getAttributes();for(const G in Z)if(Z[G].location>=0){const tt=H[G];let nt=q[G];if(nt===void 0&&(G==="instanceMatrix"&&_.instanceMatrix&&(nt=_.instanceMatrix),G==="instanceColor"&&_.instanceColor&&(nt=_.instanceColor)),tt===void 0||tt.attribute!==nt||nt&&tt.data!==nt.data)return!0;k++}return r.attributesNum!==k||r.index!==F}function g(_,S,z,F){const H={},q=S.attributes;let k=0;const Z=z.getAttributes();for(const G in Z)if(Z[G].location>=0){let tt=q[G];tt===void 0&&(G==="instanceMatrix"&&_.instanceMatrix&&(tt=_.instanceMatrix),G==="instanceColor"&&_.instanceColor&&(tt=_.instanceColor));const nt={};nt.attribute=tt,tt&&tt.data&&(nt.data=tt.data),H[G]=nt,k++}r.attributes=H,r.attributesNum=k,r.index=F}function x(){const _=r.newAttributes;for(let S=0,z=_.length;S<z;S++)_[S]=0}function u(_){m(_,0)}function m(_,S){const z=r.newAttributes,F=r.enabledAttributes,H=r.attributeDivisors;z[_]=1,F[_]===0&&(i.enableVertexAttribArray(_),F[_]=1),H[_]!==S&&(i.vertexAttribDivisor(_,S),H[_]=S)}function E(){const _=r.newAttributes,S=r.enabledAttributes;for(let z=0,F=S.length;z<F;z++)S[z]!==_[z]&&(i.disableVertexAttribArray(z),S[z]=0)}function M(_,S,z,F,H,q,k){k===!0?i.vertexAttribIPointer(_,S,z,H,q):i.vertexAttribPointer(_,S,z,F,H,q)}function b(_,S,z,F){x();const H=F.attributes,q=z.getAttributes(),k=S.defaultAttributeValues;for(const Z in q){const G=q[Z];if(G.location>=0){let W=H[Z];if(W===void 0&&(Z==="instanceMatrix"&&_.instanceMatrix&&(W=_.instanceMatrix),Z==="instanceColor"&&_.instanceColor&&(W=_.instanceColor)),W!==void 0){const tt=W.normalized,nt=W.itemSize,Nt=t.get(W);if(Nt===void 0)continue;const Ht=Nt.buffer,X=Nt.type,et=Nt.bytesPerElement,St=X===i.INT||X===i.UNSIGNED_INT||W.gpuType===Ga;if(W.isInterleavedBufferAttribute){const ft=W.data,Pt=ft.stride,Ct=W.offset;if(ft.isInstancedInterleavedBuffer){for(let Ft=0;Ft<G.locationSize;Ft++)m(G.location+Ft,ft.meshPerAttribute);_.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ft.meshPerAttribute*ft.count)}else for(let Ft=0;Ft<G.locationSize;Ft++)u(G.location+Ft);i.bindBuffer(i.ARRAY_BUFFER,Ht);for(let Ft=0;Ft<G.locationSize;Ft++)M(G.location+Ft,nt/G.locationSize,X,tt,Pt*et,(Ct+nt/G.locationSize*Ft)*et,St)}else{if(W.isInstancedBufferAttribute){for(let ft=0;ft<G.locationSize;ft++)m(G.location+ft,W.meshPerAttribute);_.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let ft=0;ft<G.locationSize;ft++)u(G.location+ft);i.bindBuffer(i.ARRAY_BUFFER,Ht);for(let ft=0;ft<G.locationSize;ft++)M(G.location+ft,nt/G.locationSize,X,tt,nt*et,nt/G.locationSize*ft*et,St)}}else if(k!==void 0){const tt=k[Z];if(tt!==void 0)switch(tt.length){case 2:i.vertexAttrib2fv(G.location,tt);break;case 3:i.vertexAttrib3fv(G.location,tt);break;case 4:i.vertexAttrib4fv(G.location,tt);break;default:i.vertexAttrib1fv(G.location,tt)}}}}E()}function C(){L();for(const _ in n){const S=n[_];for(const z in S){const F=S[z];for(const H in F)h(F[H].object),delete F[H];delete S[z]}delete n[_]}}function R(_){if(n[_.id]===void 0)return;const S=n[_.id];for(const z in S){const F=S[z];for(const H in F)h(F[H].object),delete F[H];delete S[z]}delete n[_.id]}function A(_){for(const S in n){const z=n[S];if(z[_.id]===void 0)continue;const F=z[_.id];for(const H in F)h(F[H].object),delete F[H];delete z[_.id]}}function L(){K(),a=!0,r!==s&&(r=s,c(r.object))}function K(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:L,resetDefaultState:K,dispose:C,releaseStatesOfGeometry:R,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:u,disableUnusedAttributes:E}}function Rf(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function a(c,h,f){f!==0&&(i.drawArraysInstanced(n,c,h,f),e.update(h,n,f))}function o(c,h,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,f);let p=0;for(let g=0;g<f;g++)p+=h[g];e.update(p,n,1)}function l(c,h,f,d){if(f===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)a(c[g],h[g],d[g]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,f);let g=0;for(let x=0;x<f;x++)g+=h[x];for(let x=0;x<d.length;x++)e.update(g,n,d[x])}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Cf(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==tn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const L=A===es&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==En&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Sn&&!L)}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const f=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control");if(d===!0){const A=t.get("EXT_clip_control");A.clipControlEXT(A.LOWER_LEFT_EXT,A.ZERO_TO_ONE_EXT)}const p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),u=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),b=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,R=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reverseDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:u,maxAttributes:m,maxVertexUniforms:E,maxVaryings:M,maxFragmentUniforms:b,vertexTextures:C,maxSamples:R}}function Pf(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new Xn,o=new kt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const p=f.length!==0||d||n!==0||s;return s=d,n=f.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,d){e=h(f,d,0)},this.setState=function(f,d,p){const g=f.clippingPlanes,x=f.clipIntersection,u=f.clipShadows,m=i.get(f);if(!s||g===null||g.length===0||r&&!u)r?h(null):c();else{const E=r?0:n,M=E*4;let b=m.clippingState||null;l.value=b,b=h(g,d,M,p);for(let C=0;C!==M;++C)b[C]=e[C];m.clippingState=b,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(f,d,p,g){const x=f!==null?f.length:0;let u=null;if(x!==0){if(u=l.value,g!==!0||u===null){const m=p+x*4,E=d.matrixWorldInverse;o.getNormalMatrix(E),(u===null||u.length<m)&&(u=new Float32Array(m));for(let M=0,b=p;M!==x;++M,b+=4)a.copy(f[M]).applyMatrix4(E,o),a.normal.toArray(u,b),u[b+3]=a.constant}l.value=u,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,u}}function Lf(i){let t=new WeakMap;function e(a,o){return o===ea?a.mapping=Ci:o===na&&(a.mapping=Pi),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===ea||o===na)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Hh(l.height);return c.fromEquirectangularTexture(i,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class tc extends Jl{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const yi=4,Oo=[.125,.215,.35,.446,.526,.582],$n=20,Pr=new tc,Bo=new Vt;let Lr=null,Ir=0,Dr=0,Ur=!1;const qn=(1+Math.sqrt(5))/2,Mi=1/qn,zo=[new D(-qn,Mi,0),new D(qn,Mi,0),new D(-Mi,0,qn),new D(Mi,0,qn),new D(0,qn,-Mi),new D(0,qn,Mi),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)];class ko{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Lr=this._renderer.getRenderTarget(),Ir=this._renderer.getActiveCubeFace(),Dr=this._renderer.getActiveMipmapLevel(),Ur=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Vo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Go(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Lr,Ir,Dr),this._renderer.xr.enabled=Ur,t.scissorTest=!1,ws(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ci||t.mapping===Pi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Lr=this._renderer.getRenderTarget(),Ir=this._renderer.getActiveCubeFace(),Dr=this._renderer.getActiveMipmapLevel(),Ur=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:je,minFilter:je,generateMipmaps:!1,type:es,format:tn,colorSpace:On,depthBuffer:!1},s=Ho(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ho(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=If(r)),this._blurMaterial=Df(r,t,e)}return s}_compileMaterial(t){const e=new rt(this._lodPlanes[0],t);this._renderer.compile(e,Pr)}_sceneToCubeUV(t,e,n,s){const o=new We(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,d=h.toneMapping;h.getClearColor(Bo),h.toneMapping=Dn,h.autoClear=!1;const p=new cn({name:"PMREM.Background",side:Ne,depthWrite:!1,depthTest:!1}),g=new rt(new Se,p);let x=!1;const u=t.background;u?u.isColor&&(p.color.copy(u),t.background=null,x=!0):(p.color.copy(Bo),x=!0);for(let m=0;m<6;m++){const E=m%3;E===0?(o.up.set(0,l[m],0),o.lookAt(c[m],0,0)):E===1?(o.up.set(0,0,l[m]),o.lookAt(0,c[m],0)):(o.up.set(0,l[m],0),o.lookAt(0,0,c[m]));const M=this._cubeSize;ws(s,E*M,m>2?M:0,M,M),h.setRenderTarget(s),x&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=f,t.background=u}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Ci||t.mapping===Pi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Vo()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Go());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new rt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;ws(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Pr)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=zo[(s-r-1)%zo.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,f=new rt(this._lodPlanes[s],c),d=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*$n-1),x=r/g,u=isFinite(r)?1+Math.floor(h*x):$n;u>$n&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${u} samples when the maximum is set to ${$n}`);const m=[];let E=0;for(let A=0;A<$n;++A){const L=A/x,K=Math.exp(-L*L/2);m.push(K),A===0?E+=K:A<u&&(E+=2*K)}for(let A=0;A<m.length;A++)m[A]=m[A]/E;d.envMap.value=t.texture,d.samples.value=u,d.weights.value=m,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:M}=this;d.dTheta.value=g,d.mipInt.value=M-n;const b=this._sizeLods[s],C=3*b*(s>M-yi?s-M+yi:0),R=4*(this._cubeSize-b);ws(e,C,R,3*b,2*b),l.setRenderTarget(e),l.render(f,Pr)}}function If(i){const t=[],e=[],n=[];let s=i;const r=i-yi+1+Oo.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>i-yi?l=Oo[a-i+yi-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,f=1+c,d=[h,h,f,h,f,f,h,h,f,f,h,f],p=6,g=6,x=3,u=2,m=1,E=new Float32Array(x*g*p),M=new Float32Array(u*g*p),b=new Float32Array(m*g*p);for(let R=0;R<p;R++){const A=R%3*2/3-1,L=R>2?0:-1,K=[A,L,0,A+2/3,L,0,A+2/3,L+1,0,A,L,0,A+2/3,L+1,0,A,L+1,0];E.set(K,x*g*R),M.set(d,u*g*R);const _=[R,R,R,R,R,R];b.set(_,m*g*R)}const C=new Ye;C.setAttribute("position",new hn(E,x)),C.setAttribute("uv",new hn(M,u)),C.setAttribute("faceIndex",new hn(b,m)),t.push(C),s>yi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Ho(i,t,e){const n=new si(i,t,e);return n.texture.mapping=Js,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ws(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Df(i,t,e){const n=new Float32Array($n),s=new D(0,1,0);return new Fn({name:"SphericalGaussianBlur",defines:{n:$n,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ja(),fragmentShader:`

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
		`,blending:In,depthTest:!1,depthWrite:!1})}function Go(){return new Fn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ja(),fragmentShader:`

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
		`,blending:In,depthTest:!1,depthWrite:!1})}function Vo(){return new Fn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ja(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:In,depthTest:!1,depthWrite:!1})}function Ja(){return`

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
	`}function Uf(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===ea||l===na,h=l===Ci||l===Pi;if(c||h){let f=t.get(o);const d=f!==void 0?f.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new ko(i)),f=c?e.fromEquirectangular(o,f):e.fromCubemap(o,f),f.texture.pmremVersion=o.pmremVersion,t.set(o,f),f.texture;if(f!==void 0)return f.texture;{const p=o.image;return c&&p&&p.height>0||h&&p&&s(p)?(e===null&&(e=new ko(i)),f=c?e.fromEquirectangular(o):e.fromCubemap(o),f.texture.pmremVersion=o.pmremVersion,t.set(o,f),o.addEventListener("dispose",r),f.texture):null}}}return o}function s(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Nf(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Bs("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Ff(i,t,e,n){const s={},r=new WeakMap;function a(f){const d=f.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);for(const g in d.morphAttributes){const x=d.morphAttributes[g];for(let u=0,m=x.length;u<m;u++)t.remove(x[u])}d.removeEventListener("dispose",a),delete s[d.id];const p=r.get(d);p&&(t.remove(p),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(f,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,e.memory.geometries++),d}function l(f){const d=f.attributes;for(const g in d)t.update(d[g],i.ARRAY_BUFFER);const p=f.morphAttributes;for(const g in p){const x=p[g];for(let u=0,m=x.length;u<m;u++)t.update(x[u],i.ARRAY_BUFFER)}}function c(f){const d=[],p=f.index,g=f.attributes.position;let x=0;if(p!==null){const E=p.array;x=p.version;for(let M=0,b=E.length;M<b;M+=3){const C=E[M+0],R=E[M+1],A=E[M+2];d.push(C,R,R,A,A,C)}}else if(g!==void 0){const E=g.array;x=g.version;for(let M=0,b=E.length/3-1;M<b;M+=3){const C=M+0,R=M+1,A=M+2;d.push(C,R,R,A,A,C)}}else return;const u=new(Vl(d)?Kl:$l)(d,1);u.version=x;const m=r.get(f);m&&t.remove(m),r.set(f,u)}function h(f){const d=r.get(f);if(d){const p=f.index;p!==null&&d.version<p.version&&c(f)}else c(f);return r.get(f)}return{get:o,update:l,getWireframeAttribute:h}}function Of(i,t,e){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,p){i.drawElements(n,p,r,d*a),e.update(p,n,1)}function c(d,p,g){g!==0&&(i.drawElementsInstanced(n,p,r,d*a,g),e.update(p,n,g))}function h(d,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,d,0,g);let u=0;for(let m=0;m<g;m++)u+=p[m];e.update(u,n,1)}function f(d,p,g,x){if(g===0)return;const u=t.get("WEBGL_multi_draw");if(u===null)for(let m=0;m<d.length;m++)c(d[m]/a,p[m],x[m]);else{u.multiDrawElementsInstancedWEBGL(n,p,0,r,d,0,x,0,g);let m=0;for(let E=0;E<g;E++)m+=p[E];for(let E=0;E<x.length;E++)e.update(m,n,x[E])}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=f}function Bf(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function zf(i,t,e){const n=new WeakMap,s=new ce;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==f){let _=function(){L.dispose(),n.delete(o),o.removeEventListener("dispose",_)};var p=_;d!==void 0&&d.texture.dispose();const g=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,u=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],E=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let b=0;g===!0&&(b=1),x===!0&&(b=2),u===!0&&(b=3);let C=o.attributes.position.count*b,R=1;C>t.maxTextureSize&&(R=Math.ceil(C/t.maxTextureSize),C=t.maxTextureSize);const A=new Float32Array(C*R*4*f),L=new Xl(A,C,R,f);L.type=Sn,L.needsUpdate=!0;const K=b*4;for(let S=0;S<f;S++){const z=m[S],F=E[S],H=M[S],q=C*R*4*S;for(let k=0;k<z.count;k++){const Z=k*K;g===!0&&(s.fromBufferAttribute(z,k),A[q+Z+0]=s.x,A[q+Z+1]=s.y,A[q+Z+2]=s.z,A[q+Z+3]=0),x===!0&&(s.fromBufferAttribute(F,k),A[q+Z+4]=s.x,A[q+Z+5]=s.y,A[q+Z+6]=s.z,A[q+Z+7]=0),u===!0&&(s.fromBufferAttribute(H,k),A[q+Z+8]=s.x,A[q+Z+9]=s.y,A[q+Z+10]=s.z,A[q+Z+11]=H.itemSize===4?s.w:1)}}d={count:f,texture:L,size:new ot(C,R)},n.set(o,d),o.addEventListener("dispose",_)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let g=0;for(let u=0;u<c.length;u++)g+=c[u];const x=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",x),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function kf(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,f=t.get(l,h);if(s.get(f)!==c&&(t.update(f),s.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return f}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}class ec extends Le{constructor(t,e,n,s,r,a,o,l,c,h=wi){if(h!==wi&&h!==Ii)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===wi&&(n=ii),n===void 0&&h===Ii&&(n=Li),super(null,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:qe,this.minFilter=l!==void 0?l:qe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const nc=new Le,Wo=new ec(1,1),ic=new Xl,sc=new bh,rc=new jl,Xo=[],qo=[],Yo=new Float32Array(16),$o=new Float32Array(9),Ko=new Float32Array(4);function Oi(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Xo[s];if(r===void 0&&(r=new Float32Array(s),Xo[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function me(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function ge(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Qs(i,t){let e=qo[t];e===void 0&&(e=new Int32Array(t),qo[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Hf(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Gf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(me(e,t))return;i.uniform2fv(this.addr,t),ge(e,t)}}function Vf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(me(e,t))return;i.uniform3fv(this.addr,t),ge(e,t)}}function Wf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(me(e,t))return;i.uniform4fv(this.addr,t),ge(e,t)}}function Xf(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(me(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),ge(e,t)}else{if(me(e,n))return;Ko.set(n),i.uniformMatrix2fv(this.addr,!1,Ko),ge(e,n)}}function qf(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(me(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),ge(e,t)}else{if(me(e,n))return;$o.set(n),i.uniformMatrix3fv(this.addr,!1,$o),ge(e,n)}}function Yf(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(me(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),ge(e,t)}else{if(me(e,n))return;Yo.set(n),i.uniformMatrix4fv(this.addr,!1,Yo),ge(e,n)}}function $f(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Kf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(me(e,t))return;i.uniform2iv(this.addr,t),ge(e,t)}}function Zf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(me(e,t))return;i.uniform3iv(this.addr,t),ge(e,t)}}function Jf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(me(e,t))return;i.uniform4iv(this.addr,t),ge(e,t)}}function jf(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Qf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(me(e,t))return;i.uniform2uiv(this.addr,t),ge(e,t)}}function tp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(me(e,t))return;i.uniform3uiv(this.addr,t),ge(e,t)}}function ep(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(me(e,t))return;i.uniform4uiv(this.addr,t),ge(e,t)}}function np(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Wo.compareFunction=Gl,r=Wo):r=nc,e.setTexture2D(t||r,s)}function ip(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||sc,s)}function sp(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||rc,s)}function rp(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||ic,s)}function ap(i){switch(i){case 5126:return Hf;case 35664:return Gf;case 35665:return Vf;case 35666:return Wf;case 35674:return Xf;case 35675:return qf;case 35676:return Yf;case 5124:case 35670:return $f;case 35667:case 35671:return Kf;case 35668:case 35672:return Zf;case 35669:case 35673:return Jf;case 5125:return jf;case 36294:return Qf;case 36295:return tp;case 36296:return ep;case 35678:case 36198:case 36298:case 36306:case 35682:return np;case 35679:case 36299:case 36307:return ip;case 35680:case 36300:case 36308:case 36293:return sp;case 36289:case 36303:case 36311:case 36292:return rp}}function op(i,t){i.uniform1fv(this.addr,t)}function lp(i,t){const e=Oi(t,this.size,2);i.uniform2fv(this.addr,e)}function cp(i,t){const e=Oi(t,this.size,3);i.uniform3fv(this.addr,e)}function hp(i,t){const e=Oi(t,this.size,4);i.uniform4fv(this.addr,e)}function up(i,t){const e=Oi(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function dp(i,t){const e=Oi(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function fp(i,t){const e=Oi(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function pp(i,t){i.uniform1iv(this.addr,t)}function mp(i,t){i.uniform2iv(this.addr,t)}function gp(i,t){i.uniform3iv(this.addr,t)}function _p(i,t){i.uniform4iv(this.addr,t)}function vp(i,t){i.uniform1uiv(this.addr,t)}function xp(i,t){i.uniform2uiv(this.addr,t)}function Mp(i,t){i.uniform3uiv(this.addr,t)}function Sp(i,t){i.uniform4uiv(this.addr,t)}function yp(i,t,e){const n=this.cache,s=t.length,r=Qs(e,s);me(n,r)||(i.uniform1iv(this.addr,r),ge(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||nc,r[a])}function Ep(i,t,e){const n=this.cache,s=t.length,r=Qs(e,s);me(n,r)||(i.uniform1iv(this.addr,r),ge(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||sc,r[a])}function bp(i,t,e){const n=this.cache,s=t.length,r=Qs(e,s);me(n,r)||(i.uniform1iv(this.addr,r),ge(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||rc,r[a])}function Tp(i,t,e){const n=this.cache,s=t.length,r=Qs(e,s);me(n,r)||(i.uniform1iv(this.addr,r),ge(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||ic,r[a])}function wp(i){switch(i){case 5126:return op;case 35664:return lp;case 35665:return cp;case 35666:return hp;case 35674:return up;case 35675:return dp;case 35676:return fp;case 5124:case 35670:return pp;case 35667:case 35671:return mp;case 35668:case 35672:return gp;case 35669:case 35673:return _p;case 5125:return vp;case 36294:return xp;case 36295:return Mp;case 36296:return Sp;case 35678:case 36198:case 36298:case 36306:case 35682:return yp;case 35679:case 36299:case 36307:return Ep;case 35680:case 36300:case 36308:case 36293:return bp;case 36289:case 36303:case 36311:case 36292:return Tp}}class Ap{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=ap(e.type)}}class Rp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=wp(e.type)}}class Cp{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const Nr=/(\w+)(\])?(\[|\.)?/g;function Zo(i,t){i.seq.push(t),i.map[t.id]=t}function Pp(i,t,e){const n=i.name,s=n.length;for(Nr.lastIndex=0;;){const r=Nr.exec(n),a=Nr.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Zo(e,c===void 0?new Ap(o,i,t):new Rp(o,i,t));break}else{let f=e.map[o];f===void 0&&(f=new Cp(o),Zo(e,f)),e=f}}}class zs{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);Pp(r,a,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function Jo(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Lp=37297;let Ip=0;function Dp(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}function Up(i){const t=Jt.getPrimaries(Jt.workingColorSpace),e=Jt.getPrimaries(i);let n;switch(t===e?n="":t===qs&&e===Xs?n="LinearDisplayP3ToLinearSRGB":t===Xs&&e===qs&&(n="LinearSRGBToLinearDisplayP3"),i){case On:case js:return[n,"LinearTransferOETF"];case He:case $a:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function jo(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Dp(i.getShaderSource(t),a)}else return s}function Np(i,t){const e=Up(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Fp(i,t){let e;switch(t){case Jc:e="Linear";break;case jc:e="Reinhard";break;case Qc:e="Cineon";break;case Cl:e="ACESFilmic";break;case eh:e="AgX";break;case nh:e="Neutral";break;case th:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const As=new D;function Op(){Jt.getLuminanceCoefficients(As);const i=As.x.toFixed(4),t=As.y.toFixed(4),e=As.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Bp(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(qi).join(`
`)}function zp(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function kp(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function qi(i){return i!==""}function Qo(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function tl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Hp=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ia(i){return i.replace(Hp,Vp)}const Gp=new Map;function Vp(i,t){let e=zt[t];if(e===void 0){const n=Gp.get(t);if(n!==void 0)e=zt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ia(e)}const Wp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function el(i){return i.replace(Wp,Xp)}function Xp(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function nl(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function qp(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===wl?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Al?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===xn&&(t="SHADOWMAP_TYPE_VSM"),t}function Yp(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ci:case Pi:t="ENVMAP_TYPE_CUBE";break;case Js:t="ENVMAP_TYPE_CUBE_UV";break}return t}function $p(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Pi:t="ENVMAP_MODE_REFRACTION";break}return t}function Kp(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Rl:t="ENVMAP_BLENDING_MULTIPLY";break;case Kc:t="ENVMAP_BLENDING_MIX";break;case Zc:t="ENVMAP_BLENDING_ADD";break}return t}function Zp(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Jp(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=qp(e),c=Yp(e),h=$p(e),f=Kp(e),d=Zp(e),p=Bp(e),g=zp(r),x=s.createProgram();let u,m,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(u=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(qi).join(`
`),u.length>0&&(u+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(qi).join(`
`),m.length>0&&(m+=`
`)):(u=[nl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(qi).join(`
`),m=[nl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Dn?"#define TONE_MAPPING":"",e.toneMapping!==Dn?zt.tonemapping_pars_fragment:"",e.toneMapping!==Dn?Fp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",zt.colorspace_pars_fragment,Np("linearToOutputTexel",e.outputColorSpace),Op(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(qi).join(`
`)),a=Ia(a),a=Qo(a,e),a=tl(a,e),o=Ia(o),o=Qo(o,e),o=tl(o,e),a=el(a),o=el(o),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,u=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+u,m=["#define varying in",e.glslVersion===xo?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===xo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const M=E+u+a,b=E+m+o,C=Jo(s,s.VERTEX_SHADER,M),R=Jo(s,s.FRAGMENT_SHADER,b);s.attachShader(x,C),s.attachShader(x,R),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function A(S){if(i.debug.checkShaderErrors){const z=s.getProgramInfoLog(x).trim(),F=s.getShaderInfoLog(C).trim(),H=s.getShaderInfoLog(R).trim();let q=!0,k=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,C,R);else{const Z=jo(s,C,"vertex"),G=jo(s,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+S.name+`
Material Type: `+S.type+`

Program Info Log: `+z+`
`+Z+`
`+G)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(F===""||H==="")&&(k=!1);k&&(S.diagnostics={runnable:q,programLog:z,vertexShader:{log:F,prefix:u},fragmentShader:{log:H,prefix:m}})}s.deleteShader(C),s.deleteShader(R),L=new zs(s,x),K=kp(s,x)}let L;this.getUniforms=function(){return L===void 0&&A(this),L};let K;this.getAttributes=function(){return K===void 0&&A(this),K};let _=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=s.getProgramParameter(x,Lp)),_},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Ip++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=C,this.fragmentShader=R,this}let jp=0;class Qp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new tm(t),e.set(t,n)),n}}class tm{constructor(t){this.id=jp++,this.code=t,this.usedTimes=0}}function em(i,t,e,n,s,r,a){const o=new ql,l=new Qp,c=new Set,h=[],f=s.logarithmicDepthBuffer,d=s.reverseDepthBuffer,p=s.vertexTextures;let g=s.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function u(_){return c.add(_),_===0?"uv":`uv${_}`}function m(_,S,z,F,H){const q=F.fog,k=H.geometry,Z=_.isMeshStandardMaterial?F.environment:null,G=(_.isMeshStandardMaterial?e:t).get(_.envMap||Z),W=G&&G.mapping===Js?G.image.height:null,tt=x[_.type];_.precision!==null&&(g=s.getMaxPrecision(_.precision),g!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",g,"instead."));const nt=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,Nt=nt!==void 0?nt.length:0;let Ht=0;k.morphAttributes.position!==void 0&&(Ht=1),k.morphAttributes.normal!==void 0&&(Ht=2),k.morphAttributes.color!==void 0&&(Ht=3);let X,et,St,ft;if(tt){const De=an[tt];X=De.vertexShader,et=De.fragmentShader}else X=_.vertexShader,et=_.fragmentShader,l.update(_),St=l.getVertexShaderID(_),ft=l.getFragmentShaderID(_);const Pt=i.getRenderTarget(),Ct=H.isInstancedMesh===!0,Ft=H.isBatchedMesh===!0,Gt=!!_.map,J=!!_.matcap,w=!!G,ct=!!_.aoMap,lt=!!_.lightMap,it=!!_.bumpMap,ht=!!_.normalMap,At=!!_.displacementMap,gt=!!_.emissiveMap,T=!!_.metalnessMap,v=!!_.roughnessMap,N=_.anisotropy>0,Y=_.clearcoat>0,j=_.dispersion>0,$=_.iridescence>0,bt=_.sheen>0,ut=_.transmission>0,xt=N&&!!_.anisotropyMap,Wt=Y&&!!_.clearcoatMap,st=Y&&!!_.clearcoatNormalMap,Mt=Y&&!!_.clearcoatRoughnessMap,Dt=$&&!!_.iridescenceMap,Ut=$&&!!_.iridescenceThicknessMap,yt=bt&&!!_.sheenColorMap,Xt=bt&&!!_.sheenRoughnessMap,Ot=!!_.specularMap,te=!!_.specularColorMap,P=!!_.specularIntensityMap,_t=ut&&!!_.transmissionMap,V=ut&&!!_.thicknessMap,Q=!!_.gradientMap,pt=!!_.alphaMap,vt=_.alphaTest>0,qt=!!_.alphaHash,de=!!_.extensions;let Ie=Dn;_.toneMapped&&(Pt===null||Pt.isXRRenderTarget===!0)&&(Ie=i.toneMapping);const $t={shaderID:tt,shaderType:_.type,shaderName:_.name,vertexShader:X,fragmentShader:et,defines:_.defines,customVertexShaderID:St,customFragmentShaderID:ft,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:g,batching:Ft,batchingColor:Ft&&H._colorsTexture!==null,instancing:Ct,instancingColor:Ct&&H.instanceColor!==null,instancingMorph:Ct&&H.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:Pt===null?i.outputColorSpace:Pt.isXRRenderTarget===!0?Pt.texture.colorSpace:On,alphaToCoverage:!!_.alphaToCoverage,map:Gt,matcap:J,envMap:w,envMapMode:w&&G.mapping,envMapCubeUVHeight:W,aoMap:ct,lightMap:lt,bumpMap:it,normalMap:ht,displacementMap:p&&At,emissiveMap:gt,normalMapObjectSpace:ht&&_.normalMapType===ah,normalMapTangentSpace:ht&&_.normalMapType===Hl,metalnessMap:T,roughnessMap:v,anisotropy:N,anisotropyMap:xt,clearcoat:Y,clearcoatMap:Wt,clearcoatNormalMap:st,clearcoatRoughnessMap:Mt,dispersion:j,iridescence:$,iridescenceMap:Dt,iridescenceThicknessMap:Ut,sheen:bt,sheenColorMap:yt,sheenRoughnessMap:Xt,specularMap:Ot,specularColorMap:te,specularIntensityMap:P,transmission:ut,transmissionMap:_t,thicknessMap:V,gradientMap:Q,opaque:_.transparent===!1&&_.blending===Ti&&_.alphaToCoverage===!1,alphaMap:pt,alphaTest:vt,alphaHash:qt,combine:_.combine,mapUv:Gt&&u(_.map.channel),aoMapUv:ct&&u(_.aoMap.channel),lightMapUv:lt&&u(_.lightMap.channel),bumpMapUv:it&&u(_.bumpMap.channel),normalMapUv:ht&&u(_.normalMap.channel),displacementMapUv:At&&u(_.displacementMap.channel),emissiveMapUv:gt&&u(_.emissiveMap.channel),metalnessMapUv:T&&u(_.metalnessMap.channel),roughnessMapUv:v&&u(_.roughnessMap.channel),anisotropyMapUv:xt&&u(_.anisotropyMap.channel),clearcoatMapUv:Wt&&u(_.clearcoatMap.channel),clearcoatNormalMapUv:st&&u(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Mt&&u(_.clearcoatRoughnessMap.channel),iridescenceMapUv:Dt&&u(_.iridescenceMap.channel),iridescenceThicknessMapUv:Ut&&u(_.iridescenceThicknessMap.channel),sheenColorMapUv:yt&&u(_.sheenColorMap.channel),sheenRoughnessMapUv:Xt&&u(_.sheenRoughnessMap.channel),specularMapUv:Ot&&u(_.specularMap.channel),specularColorMapUv:te&&u(_.specularColorMap.channel),specularIntensityMapUv:P&&u(_.specularIntensityMap.channel),transmissionMapUv:_t&&u(_.transmissionMap.channel),thicknessMapUv:V&&u(_.thicknessMap.channel),alphaMapUv:pt&&u(_.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(ht||N),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!k.attributes.uv&&(Gt||pt),fog:!!q,useFog:_.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:_.flatShading===!0,sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:d,skinning:H.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:Nt,morphTextureStride:Ht,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&z.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ie,decodeVideoTexture:Gt&&_.map.isVideoTexture===!0&&Jt.getTransfer(_.map.colorSpace)===ne,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===on,flipSided:_.side===Ne,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:de&&_.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(de&&_.extensions.multiDraw===!0||Ft)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return $t.vertexUv1s=c.has(1),$t.vertexUv2s=c.has(2),$t.vertexUv3s=c.has(3),c.clear(),$t}function E(_){const S=[];if(_.shaderID?S.push(_.shaderID):(S.push(_.customVertexShaderID),S.push(_.customFragmentShaderID)),_.defines!==void 0)for(const z in _.defines)S.push(z),S.push(_.defines[z]);return _.isRawShaderMaterial===!1&&(M(S,_),b(S,_),S.push(i.outputColorSpace)),S.push(_.customProgramCacheKey),S.join()}function M(_,S){_.push(S.precision),_.push(S.outputColorSpace),_.push(S.envMapMode),_.push(S.envMapCubeUVHeight),_.push(S.mapUv),_.push(S.alphaMapUv),_.push(S.lightMapUv),_.push(S.aoMapUv),_.push(S.bumpMapUv),_.push(S.normalMapUv),_.push(S.displacementMapUv),_.push(S.emissiveMapUv),_.push(S.metalnessMapUv),_.push(S.roughnessMapUv),_.push(S.anisotropyMapUv),_.push(S.clearcoatMapUv),_.push(S.clearcoatNormalMapUv),_.push(S.clearcoatRoughnessMapUv),_.push(S.iridescenceMapUv),_.push(S.iridescenceThicknessMapUv),_.push(S.sheenColorMapUv),_.push(S.sheenRoughnessMapUv),_.push(S.specularMapUv),_.push(S.specularColorMapUv),_.push(S.specularIntensityMapUv),_.push(S.transmissionMapUv),_.push(S.thicknessMapUv),_.push(S.combine),_.push(S.fogExp2),_.push(S.sizeAttenuation),_.push(S.morphTargetsCount),_.push(S.morphAttributeCount),_.push(S.numDirLights),_.push(S.numPointLights),_.push(S.numSpotLights),_.push(S.numSpotLightMaps),_.push(S.numHemiLights),_.push(S.numRectAreaLights),_.push(S.numDirLightShadows),_.push(S.numPointLightShadows),_.push(S.numSpotLightShadows),_.push(S.numSpotLightShadowsWithMaps),_.push(S.numLightProbes),_.push(S.shadowMapType),_.push(S.toneMapping),_.push(S.numClippingPlanes),_.push(S.numClipIntersection),_.push(S.depthPacking)}function b(_,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),_.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reverseDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.alphaToCoverage&&o.enable(20),_.push(o.mask)}function C(_){const S=x[_.type];let z;if(S){const F=an[S];z=Oh.clone(F.uniforms)}else z=_.uniforms;return z}function R(_,S){let z;for(let F=0,H=h.length;F<H;F++){const q=h[F];if(q.cacheKey===S){z=q,++z.usedTimes;break}}return z===void 0&&(z=new Jp(i,S,_,r),h.push(z)),z}function A(_){if(--_.usedTimes===0){const S=h.indexOf(_);h[S]=h[h.length-1],h.pop(),_.destroy()}}function L(_){l.remove(_)}function K(){l.dispose()}return{getParameters:m,getProgramCacheKey:E,getUniforms:C,acquireProgram:R,releaseProgram:A,releaseShaderCache:L,programs:h,dispose:K}}function nm(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function im(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function il(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function sl(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(f,d,p,g,x,u){let m=i[t];return m===void 0?(m={id:f.id,object:f,geometry:d,material:p,groupOrder:g,renderOrder:f.renderOrder,z:x,group:u},i[t]=m):(m.id=f.id,m.object=f,m.geometry=d,m.material=p,m.groupOrder=g,m.renderOrder=f.renderOrder,m.z=x,m.group=u),t++,m}function o(f,d,p,g,x,u){const m=a(f,d,p,g,x,u);p.transmission>0?n.push(m):p.transparent===!0?s.push(m):e.push(m)}function l(f,d,p,g,x,u){const m=a(f,d,p,g,x,u);p.transmission>0?n.unshift(m):p.transparent===!0?s.unshift(m):e.unshift(m)}function c(f,d){e.length>1&&e.sort(f||im),n.length>1&&n.sort(d||il),s.length>1&&s.sort(d||il)}function h(){for(let f=t,d=i.length;f<d;f++){const p=i[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function sm(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new sl,i.set(n,[a])):s>=r.length?(a=new sl,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function rm(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new D,color:new Vt};break;case"SpotLight":e={position:new D,direction:new D,color:new Vt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new Vt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new Vt,groundColor:new Vt};break;case"RectAreaLight":e={color:new Vt,position:new D,halfWidth:new D,halfHeight:new D};break}return i[t.id]=e,e}}}function am(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let om=0;function lm(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function cm(i){const t=new rm,e=am(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new D);const s=new D,r=new oe,a=new oe;function o(c){let h=0,f=0,d=0;for(let K=0;K<9;K++)n.probe[K].set(0,0,0);let p=0,g=0,x=0,u=0,m=0,E=0,M=0,b=0,C=0,R=0,A=0;c.sort(lm);for(let K=0,_=c.length;K<_;K++){const S=c[K],z=S.color,F=S.intensity,H=S.distance,q=S.shadow&&S.shadow.map?S.shadow.map.texture:null;if(S.isAmbientLight)h+=z.r*F,f+=z.g*F,d+=z.b*F;else if(S.isLightProbe){for(let k=0;k<9;k++)n.probe[k].addScaledVector(S.sh.coefficients[k],F);A++}else if(S.isDirectionalLight){const k=t.get(S);if(k.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){const Z=S.shadow,G=e.get(S);G.shadowIntensity=Z.intensity,G.shadowBias=Z.bias,G.shadowNormalBias=Z.normalBias,G.shadowRadius=Z.radius,G.shadowMapSize=Z.mapSize,n.directionalShadow[p]=G,n.directionalShadowMap[p]=q,n.directionalShadowMatrix[p]=S.shadow.matrix,E++}n.directional[p]=k,p++}else if(S.isSpotLight){const k=t.get(S);k.position.setFromMatrixPosition(S.matrixWorld),k.color.copy(z).multiplyScalar(F),k.distance=H,k.coneCos=Math.cos(S.angle),k.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),k.decay=S.decay,n.spot[x]=k;const Z=S.shadow;if(S.map&&(n.spotLightMap[C]=S.map,C++,Z.updateMatrices(S),S.castShadow&&R++),n.spotLightMatrix[x]=Z.matrix,S.castShadow){const G=e.get(S);G.shadowIntensity=Z.intensity,G.shadowBias=Z.bias,G.shadowNormalBias=Z.normalBias,G.shadowRadius=Z.radius,G.shadowMapSize=Z.mapSize,n.spotShadow[x]=G,n.spotShadowMap[x]=q,b++}x++}else if(S.isRectAreaLight){const k=t.get(S);k.color.copy(z).multiplyScalar(F),k.halfWidth.set(S.width*.5,0,0),k.halfHeight.set(0,S.height*.5,0),n.rectArea[u]=k,u++}else if(S.isPointLight){const k=t.get(S);if(k.color.copy(S.color).multiplyScalar(S.intensity),k.distance=S.distance,k.decay=S.decay,S.castShadow){const Z=S.shadow,G=e.get(S);G.shadowIntensity=Z.intensity,G.shadowBias=Z.bias,G.shadowNormalBias=Z.normalBias,G.shadowRadius=Z.radius,G.shadowMapSize=Z.mapSize,G.shadowCameraNear=Z.camera.near,G.shadowCameraFar=Z.camera.far,n.pointShadow[g]=G,n.pointShadowMap[g]=q,n.pointShadowMatrix[g]=S.shadow.matrix,M++}n.point[g]=k,g++}else if(S.isHemisphereLight){const k=t.get(S);k.skyColor.copy(S.color).multiplyScalar(F),k.groundColor.copy(S.groundColor).multiplyScalar(F),n.hemi[m]=k,m++}}u>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=dt.LTC_FLOAT_1,n.rectAreaLTC2=dt.LTC_FLOAT_2):(n.rectAreaLTC1=dt.LTC_HALF_1,n.rectAreaLTC2=dt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=d;const L=n.hash;(L.directionalLength!==p||L.pointLength!==g||L.spotLength!==x||L.rectAreaLength!==u||L.hemiLength!==m||L.numDirectionalShadows!==E||L.numPointShadows!==M||L.numSpotShadows!==b||L.numSpotMaps!==C||L.numLightProbes!==A)&&(n.directional.length=p,n.spot.length=x,n.rectArea.length=u,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=b,n.spotShadowMap.length=b,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=b+C-R,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=A,L.directionalLength=p,L.pointLength=g,L.spotLength=x,L.rectAreaLength=u,L.hemiLength=m,L.numDirectionalShadows=E,L.numPointShadows=M,L.numSpotShadows=b,L.numSpotMaps=C,L.numLightProbes=A,n.version=om++)}function l(c,h){let f=0,d=0,p=0,g=0,x=0;const u=h.matrixWorldInverse;for(let m=0,E=c.length;m<E;m++){const M=c[m];if(M.isDirectionalLight){const b=n.directional[f];b.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(u),f++}else if(M.isSpotLight){const b=n.spot[p];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(u),b.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(u),p++}else if(M.isRectAreaLight){const b=n.rectArea[g];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(u),a.identity(),r.copy(M.matrixWorld),r.premultiply(u),a.extractRotation(r),b.halfWidth.set(M.width*.5,0,0),b.halfHeight.set(0,M.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),g++}else if(M.isPointLight){const b=n.point[d];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(u),d++}else if(M.isHemisphereLight){const b=n.hemi[x];b.direction.setFromMatrixPosition(M.matrixWorld),b.direction.transformDirection(u),x++}}}return{setup:o,setupView:l,state:n}}function rl(i){const t=new cm(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function hm(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new rl(i),t.set(s,[o])):r>=a.length?(o=new rl(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class um extends ss{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=sh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class dm extends ss{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const fm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,pm=`uniform sampler2D shadow_pass;
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
}`;function mm(i,t,e){let n=new Za;const s=new ot,r=new ot,a=new ce,o=new um({depthPacking:rh}),l=new dm,c={},h=e.maxTextureSize,f={[Nn]:Ne,[Ne]:Nn,[on]:on},d=new Fn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ot},radius:{value:4}},vertexShader:fm,fragmentShader:pm}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const g=new Ye;g.setAttribute("position",new hn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new rt(g,d),u=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=wl;let m=this.type;this.render=function(R,A,L){if(u.enabled===!1||u.autoUpdate===!1&&u.needsUpdate===!1||R.length===0)return;const K=i.getRenderTarget(),_=i.getActiveCubeFace(),S=i.getActiveMipmapLevel(),z=i.state;z.setBlending(In),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const F=m!==xn&&this.type===xn,H=m===xn&&this.type!==xn;for(let q=0,k=R.length;q<k;q++){const Z=R[q],G=Z.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const W=G.getFrameExtents();if(s.multiply(W),r.copy(G.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/W.x),s.x=r.x*W.x,G.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/W.y),s.y=r.y*W.y,G.mapSize.y=r.y)),G.map===null||F===!0||H===!0){const nt=this.type!==xn?{minFilter:qe,magFilter:qe}:{};G.map!==null&&G.map.dispose(),G.map=new si(s.x,s.y,nt),G.map.texture.name=Z.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();const tt=G.getViewportCount();for(let nt=0;nt<tt;nt++){const Nt=G.getViewport(nt);a.set(r.x*Nt.x,r.y*Nt.y,r.x*Nt.z,r.y*Nt.w),z.viewport(a),G.updateMatrices(Z,nt),n=G.getFrustum(),b(A,L,G.camera,Z,this.type)}G.isPointLightShadow!==!0&&this.type===xn&&E(G,L),G.needsUpdate=!1}m=this.type,u.needsUpdate=!1,i.setRenderTarget(K,_,S)};function E(R,A){const L=t.update(x);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,p.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new si(s.x,s.y)),d.uniforms.shadow_pass.value=R.map.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(A,null,L,d,x,null),p.uniforms.shadow_pass.value=R.mapPass.texture,p.uniforms.resolution.value=R.mapSize,p.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(A,null,L,p,x,null)}function M(R,A,L,K){let _=null;const S=L.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(S!==void 0)_=S;else if(_=L.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const z=_.uuid,F=A.uuid;let H=c[z];H===void 0&&(H={},c[z]=H);let q=H[F];q===void 0&&(q=_.clone(),H[F]=q,A.addEventListener("dispose",C)),_=q}if(_.visible=A.visible,_.wireframe=A.wireframe,K===xn?_.side=A.shadowSide!==null?A.shadowSide:A.side:_.side=A.shadowSide!==null?A.shadowSide:f[A.side],_.alphaMap=A.alphaMap,_.alphaTest=A.alphaTest,_.map=A.map,_.clipShadows=A.clipShadows,_.clippingPlanes=A.clippingPlanes,_.clipIntersection=A.clipIntersection,_.displacementMap=A.displacementMap,_.displacementScale=A.displacementScale,_.displacementBias=A.displacementBias,_.wireframeLinewidth=A.wireframeLinewidth,_.linewidth=A.linewidth,L.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const z=i.properties.get(_);z.light=L}return _}function b(R,A,L,K,_){if(R.visible===!1)return;if(R.layers.test(A.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&_===xn)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,R.matrixWorld);const F=t.update(R),H=R.material;if(Array.isArray(H)){const q=F.groups;for(let k=0,Z=q.length;k<Z;k++){const G=q[k],W=H[G.materialIndex];if(W&&W.visible){const tt=M(R,W,K,_);R.onBeforeShadow(i,R,A,L,F,tt,G),i.renderBufferDirect(L,null,F,tt,R,G),R.onAfterShadow(i,R,A,L,F,tt,G)}}}else if(H.visible){const q=M(R,H,K,_);R.onBeforeShadow(i,R,A,L,F,q,null),i.renderBufferDirect(L,null,F,q,R,null),R.onAfterShadow(i,R,A,L,F,q,null)}}const z=R.children;for(let F=0,H=z.length;F<H;F++)b(z[F],A,L,K,_)}function C(R){R.target.removeEventListener("dispose",C);for(const L in c){const K=c[L],_=R.target.uuid;_ in K&&(K[_].dispose(),delete K[_])}}}const gm={[$r]:Kr,[Zr]:Qr,[Jr]:ta,[Ri]:jr,[Kr]:$r,[Qr]:Zr,[ta]:Jr,[jr]:Ri};function _m(i){function t(){let P=!1;const _t=new ce;let V=null;const Q=new ce(0,0,0,0);return{setMask:function(pt){V!==pt&&!P&&(i.colorMask(pt,pt,pt,pt),V=pt)},setLocked:function(pt){P=pt},setClear:function(pt,vt,qt,de,Ie){Ie===!0&&(pt*=de,vt*=de,qt*=de),_t.set(pt,vt,qt,de),Q.equals(_t)===!1&&(i.clearColor(pt,vt,qt,de),Q.copy(_t))},reset:function(){P=!1,V=null,Q.set(-1,0,0,0)}}}function e(){let P=!1,_t=!1,V=null,Q=null,pt=null;return{setReversed:function(vt){_t=vt},setTest:function(vt){vt?St(i.DEPTH_TEST):ft(i.DEPTH_TEST)},setMask:function(vt){V!==vt&&!P&&(i.depthMask(vt),V=vt)},setFunc:function(vt){if(_t&&(vt=gm[vt]),Q!==vt){switch(vt){case $r:i.depthFunc(i.NEVER);break;case Kr:i.depthFunc(i.ALWAYS);break;case Zr:i.depthFunc(i.LESS);break;case Ri:i.depthFunc(i.LEQUAL);break;case Jr:i.depthFunc(i.EQUAL);break;case jr:i.depthFunc(i.GEQUAL);break;case Qr:i.depthFunc(i.GREATER);break;case ta:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Q=vt}},setLocked:function(vt){P=vt},setClear:function(vt){pt!==vt&&(i.clearDepth(vt),pt=vt)},reset:function(){P=!1,V=null,Q=null,pt=null}}}function n(){let P=!1,_t=null,V=null,Q=null,pt=null,vt=null,qt=null,de=null,Ie=null;return{setTest:function($t){P||($t?St(i.STENCIL_TEST):ft(i.STENCIL_TEST))},setMask:function($t){_t!==$t&&!P&&(i.stencilMask($t),_t=$t)},setFunc:function($t,De,fn){(V!==$t||Q!==De||pt!==fn)&&(i.stencilFunc($t,De,fn),V=$t,Q=De,pt=fn)},setOp:function($t,De,fn){(vt!==$t||qt!==De||de!==fn)&&(i.stencilOp($t,De,fn),vt=$t,qt=De,de=fn)},setLocked:function($t){P=$t},setClear:function($t){Ie!==$t&&(i.clearStencil($t),Ie=$t)},reset:function(){P=!1,_t=null,V=null,Q=null,pt=null,vt=null,qt=null,de=null,Ie=null}}}const s=new t,r=new e,a=new n,o=new WeakMap,l=new WeakMap;let c={},h={},f=new WeakMap,d=[],p=null,g=!1,x=null,u=null,m=null,E=null,M=null,b=null,C=null,R=new Vt(0,0,0),A=0,L=!1,K=null,_=null,S=null,z=null,F=null;const H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,k=0;const Z=i.getParameter(i.VERSION);Z.indexOf("WebGL")!==-1?(k=parseFloat(/^WebGL (\d)/.exec(Z)[1]),q=k>=1):Z.indexOf("OpenGL ES")!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),q=k>=2);let G=null,W={};const tt=i.getParameter(i.SCISSOR_BOX),nt=i.getParameter(i.VIEWPORT),Nt=new ce().fromArray(tt),Ht=new ce().fromArray(nt);function X(P,_t,V,Q){const pt=new Uint8Array(4),vt=i.createTexture();i.bindTexture(P,vt),i.texParameteri(P,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(P,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let qt=0;qt<V;qt++)P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY?i.texImage3D(_t,0,i.RGBA,1,1,Q,0,i.RGBA,i.UNSIGNED_BYTE,pt):i.texImage2D(_t+qt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,pt);return vt}const et={};et[i.TEXTURE_2D]=X(i.TEXTURE_2D,i.TEXTURE_2D,1),et[i.TEXTURE_CUBE_MAP]=X(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),et[i.TEXTURE_2D_ARRAY]=X(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),et[i.TEXTURE_3D]=X(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),a.setClear(0),St(i.DEPTH_TEST),r.setFunc(Ri),lt(!1),it(fo),St(i.CULL_FACE),w(In);function St(P){c[P]!==!0&&(i.enable(P),c[P]=!0)}function ft(P){c[P]!==!1&&(i.disable(P),c[P]=!1)}function Pt(P,_t){return h[P]!==_t?(i.bindFramebuffer(P,_t),h[P]=_t,P===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=_t),P===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=_t),!0):!1}function Ct(P,_t){let V=d,Q=!1;if(P){V=f.get(_t),V===void 0&&(V=[],f.set(_t,V));const pt=P.textures;if(V.length!==pt.length||V[0]!==i.COLOR_ATTACHMENT0){for(let vt=0,qt=pt.length;vt<qt;vt++)V[vt]=i.COLOR_ATTACHMENT0+vt;V.length=pt.length,Q=!0}}else V[0]!==i.BACK&&(V[0]=i.BACK,Q=!0);Q&&i.drawBuffers(V)}function Ft(P){return p!==P?(i.useProgram(P),p=P,!0):!1}const Gt={[Yn]:i.FUNC_ADD,[Ic]:i.FUNC_SUBTRACT,[Dc]:i.FUNC_REVERSE_SUBTRACT};Gt[Uc]=i.MIN,Gt[Nc]=i.MAX;const J={[Fc]:i.ZERO,[Oc]:i.ONE,[Bc]:i.SRC_COLOR,[qr]:i.SRC_ALPHA,[Wc]:i.SRC_ALPHA_SATURATE,[Gc]:i.DST_COLOR,[kc]:i.DST_ALPHA,[zc]:i.ONE_MINUS_SRC_COLOR,[Yr]:i.ONE_MINUS_SRC_ALPHA,[Vc]:i.ONE_MINUS_DST_COLOR,[Hc]:i.ONE_MINUS_DST_ALPHA,[Xc]:i.CONSTANT_COLOR,[qc]:i.ONE_MINUS_CONSTANT_COLOR,[Yc]:i.CONSTANT_ALPHA,[$c]:i.ONE_MINUS_CONSTANT_ALPHA};function w(P,_t,V,Q,pt,vt,qt,de,Ie,$t){if(P===In){g===!0&&(ft(i.BLEND),g=!1);return}if(g===!1&&(St(i.BLEND),g=!0),P!==Lc){if(P!==x||$t!==L){if((u!==Yn||M!==Yn)&&(i.blendEquation(i.FUNC_ADD),u=Yn,M=Yn),$t)switch(P){case Ti:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case po:i.blendFunc(i.ONE,i.ONE);break;case mo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case go:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case Ti:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case po:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case mo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case go:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}m=null,E=null,b=null,C=null,R.set(0,0,0),A=0,x=P,L=$t}return}pt=pt||_t,vt=vt||V,qt=qt||Q,(_t!==u||pt!==M)&&(i.blendEquationSeparate(Gt[_t],Gt[pt]),u=_t,M=pt),(V!==m||Q!==E||vt!==b||qt!==C)&&(i.blendFuncSeparate(J[V],J[Q],J[vt],J[qt]),m=V,E=Q,b=vt,C=qt),(de.equals(R)===!1||Ie!==A)&&(i.blendColor(de.r,de.g,de.b,Ie),R.copy(de),A=Ie),x=P,L=!1}function ct(P,_t){P.side===on?ft(i.CULL_FACE):St(i.CULL_FACE);let V=P.side===Ne;_t&&(V=!V),lt(V),P.blending===Ti&&P.transparent===!1?w(In):w(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),r.setFunc(P.depthFunc),r.setTest(P.depthTest),r.setMask(P.depthWrite),s.setMask(P.colorWrite);const Q=P.stencilWrite;a.setTest(Q),Q&&(a.setMask(P.stencilWriteMask),a.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),a.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),At(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?St(i.SAMPLE_ALPHA_TO_COVERAGE):ft(i.SAMPLE_ALPHA_TO_COVERAGE)}function lt(P){K!==P&&(P?i.frontFace(i.CW):i.frontFace(i.CCW),K=P)}function it(P){P!==Cc?(St(i.CULL_FACE),P!==_&&(P===fo?i.cullFace(i.BACK):P===Pc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ft(i.CULL_FACE),_=P}function ht(P){P!==S&&(q&&i.lineWidth(P),S=P)}function At(P,_t,V){P?(St(i.POLYGON_OFFSET_FILL),(z!==_t||F!==V)&&(i.polygonOffset(_t,V),z=_t,F=V)):ft(i.POLYGON_OFFSET_FILL)}function gt(P){P?St(i.SCISSOR_TEST):ft(i.SCISSOR_TEST)}function T(P){P===void 0&&(P=i.TEXTURE0+H-1),G!==P&&(i.activeTexture(P),G=P)}function v(P,_t,V){V===void 0&&(G===null?V=i.TEXTURE0+H-1:V=G);let Q=W[V];Q===void 0&&(Q={type:void 0,texture:void 0},W[V]=Q),(Q.type!==P||Q.texture!==_t)&&(G!==V&&(i.activeTexture(V),G=V),i.bindTexture(P,_t||et[P]),Q.type=P,Q.texture=_t)}function N(){const P=W[G];P!==void 0&&P.type!==void 0&&(i.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function Y(){try{i.compressedTexImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function j(){try{i.compressedTexImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function $(){try{i.texSubImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function bt(){try{i.texSubImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ut(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function xt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Wt(){try{i.texStorage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function st(){try{i.texStorage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Mt(){try{i.texImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Dt(){try{i.texImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Ut(P){Nt.equals(P)===!1&&(i.scissor(P.x,P.y,P.z,P.w),Nt.copy(P))}function yt(P){Ht.equals(P)===!1&&(i.viewport(P.x,P.y,P.z,P.w),Ht.copy(P))}function Xt(P,_t){let V=l.get(_t);V===void 0&&(V=new WeakMap,l.set(_t,V));let Q=V.get(P);Q===void 0&&(Q=i.getUniformBlockIndex(_t,P.name),V.set(P,Q))}function Ot(P,_t){const Q=l.get(_t).get(P);o.get(_t)!==Q&&(i.uniformBlockBinding(_t,Q,P.__bindingPointIndex),o.set(_t,Q))}function te(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),c={},G=null,W={},h={},f=new WeakMap,d=[],p=null,g=!1,x=null,u=null,m=null,E=null,M=null,b=null,C=null,R=new Vt(0,0,0),A=0,L=!1,K=null,_=null,S=null,z=null,F=null,Nt.set(0,0,i.canvas.width,i.canvas.height),Ht.set(0,0,i.canvas.width,i.canvas.height),s.reset(),r.reset(),a.reset()}return{buffers:{color:s,depth:r,stencil:a},enable:St,disable:ft,bindFramebuffer:Pt,drawBuffers:Ct,useProgram:Ft,setBlending:w,setMaterial:ct,setFlipSided:lt,setCullFace:it,setLineWidth:ht,setPolygonOffset:At,setScissorTest:gt,activeTexture:T,bindTexture:v,unbindTexture:N,compressedTexImage2D:Y,compressedTexImage3D:j,texImage2D:Mt,texImage3D:Dt,updateUBOMapping:Xt,uniformBlockBinding:Ot,texStorage2D:Wt,texStorage3D:st,texSubImage2D:$,texSubImage3D:bt,compressedTexSubImage2D:ut,compressedTexSubImage3D:xt,scissor:Ut,viewport:yt,reset:te}}function al(i,t,e,n){const s=vm(n);switch(e){case Ul:return i*t;case Fl:return i*t;case Ol:return i*t*2;case Bl:return i*t/s.components*s.byteLength;case Xa:return i*t/s.components*s.byteLength;case zl:return i*t*2/s.components*s.byteLength;case qa:return i*t*2/s.components*s.byteLength;case Nl:return i*t*3/s.components*s.byteLength;case tn:return i*t*4/s.components*s.byteLength;case Ya:return i*t*4/s.components*s.byteLength;case Ds:case Us:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ns:case Fs:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case aa:case la:return Math.max(i,16)*Math.max(t,8)/4;case ra:case oa:return Math.max(i,8)*Math.max(t,8)/2;case ca:case ha:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ua:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case da:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case fa:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case pa:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case ma:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case ga:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case _a:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case va:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case xa:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ma:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Sa:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case ya:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Ea:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case ba:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Ta:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Os:case wa:case Aa:return Math.ceil(i/4)*Math.ceil(t/4)*16;case kl:case Ra:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Ca:case Pa:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function vm(i){switch(i){case En:case Ll:return{byteLength:1,components:1};case Ji:case Il:case es:return{byteLength:2,components:1};case Va:case Wa:return{byteLength:2,components:4};case ii:case Ga:case Sn:return{byteLength:4,components:1};case Dl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function xm(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ot,h=new WeakMap;let f;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,v){return p?new OffscreenCanvas(T,v):$s("canvas")}function x(T,v,N){let Y=1;const j=gt(T);if((j.width>N||j.height>N)&&(Y=N/Math.max(j.width,j.height)),Y<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const $=Math.floor(Y*j.width),bt=Math.floor(Y*j.height);f===void 0&&(f=g($,bt));const ut=v?g($,bt):f;return ut.width=$,ut.height=bt,ut.getContext("2d").drawImage(T,0,0,$,bt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+$+"x"+bt+")."),ut}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),T;return T}function u(T){return T.generateMipmaps&&T.minFilter!==qe&&T.minFilter!==je}function m(T){i.generateMipmap(T)}function E(T,v,N,Y,j=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let $=v;if(v===i.RED&&(N===i.FLOAT&&($=i.R32F),N===i.HALF_FLOAT&&($=i.R16F),N===i.UNSIGNED_BYTE&&($=i.R8)),v===i.RED_INTEGER&&(N===i.UNSIGNED_BYTE&&($=i.R8UI),N===i.UNSIGNED_SHORT&&($=i.R16UI),N===i.UNSIGNED_INT&&($=i.R32UI),N===i.BYTE&&($=i.R8I),N===i.SHORT&&($=i.R16I),N===i.INT&&($=i.R32I)),v===i.RG&&(N===i.FLOAT&&($=i.RG32F),N===i.HALF_FLOAT&&($=i.RG16F),N===i.UNSIGNED_BYTE&&($=i.RG8)),v===i.RG_INTEGER&&(N===i.UNSIGNED_BYTE&&($=i.RG8UI),N===i.UNSIGNED_SHORT&&($=i.RG16UI),N===i.UNSIGNED_INT&&($=i.RG32UI),N===i.BYTE&&($=i.RG8I),N===i.SHORT&&($=i.RG16I),N===i.INT&&($=i.RG32I)),v===i.RGB_INTEGER&&(N===i.UNSIGNED_BYTE&&($=i.RGB8UI),N===i.UNSIGNED_SHORT&&($=i.RGB16UI),N===i.UNSIGNED_INT&&($=i.RGB32UI),N===i.BYTE&&($=i.RGB8I),N===i.SHORT&&($=i.RGB16I),N===i.INT&&($=i.RGB32I)),v===i.RGBA_INTEGER&&(N===i.UNSIGNED_BYTE&&($=i.RGBA8UI),N===i.UNSIGNED_SHORT&&($=i.RGBA16UI),N===i.UNSIGNED_INT&&($=i.RGBA32UI),N===i.BYTE&&($=i.RGBA8I),N===i.SHORT&&($=i.RGBA16I),N===i.INT&&($=i.RGBA32I)),v===i.RGB&&N===i.UNSIGNED_INT_5_9_9_9_REV&&($=i.RGB9_E5),v===i.RGBA){const bt=j?Ws:Jt.getTransfer(Y);N===i.FLOAT&&($=i.RGBA32F),N===i.HALF_FLOAT&&($=i.RGBA16F),N===i.UNSIGNED_BYTE&&($=bt===ne?i.SRGB8_ALPHA8:i.RGBA8),N===i.UNSIGNED_SHORT_4_4_4_4&&($=i.RGBA4),N===i.UNSIGNED_SHORT_5_5_5_1&&($=i.RGB5_A1)}return($===i.R16F||$===i.R32F||$===i.RG16F||$===i.RG32F||$===i.RGBA16F||$===i.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function M(T,v){let N;return T?v===null||v===ii||v===Li?N=i.DEPTH24_STENCIL8:v===Sn?N=i.DEPTH32F_STENCIL8:v===Ji&&(N=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===ii||v===Li?N=i.DEPTH_COMPONENT24:v===Sn?N=i.DEPTH_COMPONENT32F:v===Ji&&(N=i.DEPTH_COMPONENT16),N}function b(T,v){return u(T)===!0||T.isFramebufferTexture&&T.minFilter!==qe&&T.minFilter!==je?Math.log2(Math.max(v.width,v.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?v.mipmaps.length:1}function C(T){const v=T.target;v.removeEventListener("dispose",C),A(v),v.isVideoTexture&&h.delete(v)}function R(T){const v=T.target;v.removeEventListener("dispose",R),K(v)}function A(T){const v=n.get(T);if(v.__webglInit===void 0)return;const N=T.source,Y=d.get(N);if(Y){const j=Y[v.__cacheKey];j.usedTimes--,j.usedTimes===0&&L(T),Object.keys(Y).length===0&&d.delete(N)}n.remove(T)}function L(T){const v=n.get(T);i.deleteTexture(v.__webglTexture);const N=T.source,Y=d.get(N);delete Y[v.__cacheKey],a.memory.textures--}function K(T){const v=n.get(T);if(T.depthTexture&&T.depthTexture.dispose(),T.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(v.__webglFramebuffer[Y]))for(let j=0;j<v.__webglFramebuffer[Y].length;j++)i.deleteFramebuffer(v.__webglFramebuffer[Y][j]);else i.deleteFramebuffer(v.__webglFramebuffer[Y]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[Y])}else{if(Array.isArray(v.__webglFramebuffer))for(let Y=0;Y<v.__webglFramebuffer.length;Y++)i.deleteFramebuffer(v.__webglFramebuffer[Y]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let Y=0;Y<v.__webglColorRenderbuffer.length;Y++)v.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[Y]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const N=T.textures;for(let Y=0,j=N.length;Y<j;Y++){const $=n.get(N[Y]);$.__webglTexture&&(i.deleteTexture($.__webglTexture),a.memory.textures--),n.remove(N[Y])}n.remove(T)}let _=0;function S(){_=0}function z(){const T=_;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),_+=1,T}function F(T){const v=[];return v.push(T.wrapS),v.push(T.wrapT),v.push(T.wrapR||0),v.push(T.magFilter),v.push(T.minFilter),v.push(T.anisotropy),v.push(T.internalFormat),v.push(T.format),v.push(T.type),v.push(T.generateMipmaps),v.push(T.premultiplyAlpha),v.push(T.flipY),v.push(T.unpackAlignment),v.push(T.colorSpace),v.join()}function H(T,v){const N=n.get(T);if(T.isVideoTexture&&ht(T),T.isRenderTargetTexture===!1&&T.version>0&&N.__version!==T.version){const Y=T.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ht(N,T,v);return}}e.bindTexture(i.TEXTURE_2D,N.__webglTexture,i.TEXTURE0+v)}function q(T,v){const N=n.get(T);if(T.version>0&&N.__version!==T.version){Ht(N,T,v);return}e.bindTexture(i.TEXTURE_2D_ARRAY,N.__webglTexture,i.TEXTURE0+v)}function k(T,v){const N=n.get(T);if(T.version>0&&N.__version!==T.version){Ht(N,T,v);return}e.bindTexture(i.TEXTURE_3D,N.__webglTexture,i.TEXTURE0+v)}function Z(T,v){const N=n.get(T);if(T.version>0&&N.__version!==T.version){X(N,T,v);return}e.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+v)}const G={[ia]:i.REPEAT,[Jn]:i.CLAMP_TO_EDGE,[sa]:i.MIRRORED_REPEAT},W={[qe]:i.NEAREST,[ih]:i.NEAREST_MIPMAP_NEAREST,[os]:i.NEAREST_MIPMAP_LINEAR,[je]:i.LINEAR,[ar]:i.LINEAR_MIPMAP_NEAREST,[jn]:i.LINEAR_MIPMAP_LINEAR},tt={[oh]:i.NEVER,[fh]:i.ALWAYS,[lh]:i.LESS,[Gl]:i.LEQUAL,[ch]:i.EQUAL,[dh]:i.GEQUAL,[hh]:i.GREATER,[uh]:i.NOTEQUAL};function nt(T,v){if(v.type===Sn&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===je||v.magFilter===ar||v.magFilter===os||v.magFilter===jn||v.minFilter===je||v.minFilter===ar||v.minFilter===os||v.minFilter===jn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,G[v.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,G[v.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,G[v.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,W[v.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,W[v.minFilter]),v.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,tt[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===qe||v.minFilter!==os&&v.minFilter!==jn||v.type===Sn&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const N=t.get("EXT_texture_filter_anisotropic");i.texParameterf(T,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function Nt(T,v){let N=!1;T.__webglInit===void 0&&(T.__webglInit=!0,v.addEventListener("dispose",C));const Y=v.source;let j=d.get(Y);j===void 0&&(j={},d.set(Y,j));const $=F(v);if($!==T.__cacheKey){j[$]===void 0&&(j[$]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,N=!0),j[$].usedTimes++;const bt=j[T.__cacheKey];bt!==void 0&&(j[T.__cacheKey].usedTimes--,bt.usedTimes===0&&L(v)),T.__cacheKey=$,T.__webglTexture=j[$].texture}return N}function Ht(T,v,N){let Y=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(Y=i.TEXTURE_3D);const j=Nt(T,v),$=v.source;e.bindTexture(Y,T.__webglTexture,i.TEXTURE0+N);const bt=n.get($);if($.version!==bt.__version||j===!0){e.activeTexture(i.TEXTURE0+N);const ut=Jt.getPrimaries(Jt.workingColorSpace),xt=v.colorSpace===Ln?null:Jt.getPrimaries(v.colorSpace),Wt=v.colorSpace===Ln||ut===xt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Wt);let st=x(v.image,!1,s.maxTextureSize);st=At(v,st);const Mt=r.convert(v.format,v.colorSpace),Dt=r.convert(v.type);let Ut=E(v.internalFormat,Mt,Dt,v.colorSpace,v.isVideoTexture);nt(Y,v);let yt;const Xt=v.mipmaps,Ot=v.isVideoTexture!==!0,te=bt.__version===void 0||j===!0,P=$.dataReady,_t=b(v,st);if(v.isDepthTexture)Ut=M(v.format===Ii,v.type),te&&(Ot?e.texStorage2D(i.TEXTURE_2D,1,Ut,st.width,st.height):e.texImage2D(i.TEXTURE_2D,0,Ut,st.width,st.height,0,Mt,Dt,null));else if(v.isDataTexture)if(Xt.length>0){Ot&&te&&e.texStorage2D(i.TEXTURE_2D,_t,Ut,Xt[0].width,Xt[0].height);for(let V=0,Q=Xt.length;V<Q;V++)yt=Xt[V],Ot?P&&e.texSubImage2D(i.TEXTURE_2D,V,0,0,yt.width,yt.height,Mt,Dt,yt.data):e.texImage2D(i.TEXTURE_2D,V,Ut,yt.width,yt.height,0,Mt,Dt,yt.data);v.generateMipmaps=!1}else Ot?(te&&e.texStorage2D(i.TEXTURE_2D,_t,Ut,st.width,st.height),P&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,st.width,st.height,Mt,Dt,st.data)):e.texImage2D(i.TEXTURE_2D,0,Ut,st.width,st.height,0,Mt,Dt,st.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Ot&&te&&e.texStorage3D(i.TEXTURE_2D_ARRAY,_t,Ut,Xt[0].width,Xt[0].height,st.depth);for(let V=0,Q=Xt.length;V<Q;V++)if(yt=Xt[V],v.format!==tn)if(Mt!==null)if(Ot){if(P)if(v.layerUpdates.size>0){const pt=al(yt.width,yt.height,v.format,v.type);for(const vt of v.layerUpdates){const qt=yt.data.subarray(vt*pt/yt.data.BYTES_PER_ELEMENT,(vt+1)*pt/yt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,V,0,0,vt,yt.width,yt.height,1,Mt,qt,0,0)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,V,0,0,0,yt.width,yt.height,st.depth,Mt,yt.data,0,0)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,V,Ut,yt.width,yt.height,st.depth,0,yt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ot?P&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,V,0,0,0,yt.width,yt.height,st.depth,Mt,Dt,yt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,V,Ut,yt.width,yt.height,st.depth,0,Mt,Dt,yt.data)}else{Ot&&te&&e.texStorage2D(i.TEXTURE_2D,_t,Ut,Xt[0].width,Xt[0].height);for(let V=0,Q=Xt.length;V<Q;V++)yt=Xt[V],v.format!==tn?Mt!==null?Ot?P&&e.compressedTexSubImage2D(i.TEXTURE_2D,V,0,0,yt.width,yt.height,Mt,yt.data):e.compressedTexImage2D(i.TEXTURE_2D,V,Ut,yt.width,yt.height,0,yt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ot?P&&e.texSubImage2D(i.TEXTURE_2D,V,0,0,yt.width,yt.height,Mt,Dt,yt.data):e.texImage2D(i.TEXTURE_2D,V,Ut,yt.width,yt.height,0,Mt,Dt,yt.data)}else if(v.isDataArrayTexture)if(Ot){if(te&&e.texStorage3D(i.TEXTURE_2D_ARRAY,_t,Ut,st.width,st.height,st.depth),P)if(v.layerUpdates.size>0){const V=al(st.width,st.height,v.format,v.type);for(const Q of v.layerUpdates){const pt=st.data.subarray(Q*V/st.data.BYTES_PER_ELEMENT,(Q+1)*V/st.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Q,st.width,st.height,1,Mt,Dt,pt)}v.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,st.width,st.height,st.depth,Mt,Dt,st.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ut,st.width,st.height,st.depth,0,Mt,Dt,st.data);else if(v.isData3DTexture)Ot?(te&&e.texStorage3D(i.TEXTURE_3D,_t,Ut,st.width,st.height,st.depth),P&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,st.width,st.height,st.depth,Mt,Dt,st.data)):e.texImage3D(i.TEXTURE_3D,0,Ut,st.width,st.height,st.depth,0,Mt,Dt,st.data);else if(v.isFramebufferTexture){if(te)if(Ot)e.texStorage2D(i.TEXTURE_2D,_t,Ut,st.width,st.height);else{let V=st.width,Q=st.height;for(let pt=0;pt<_t;pt++)e.texImage2D(i.TEXTURE_2D,pt,Ut,V,Q,0,Mt,Dt,null),V>>=1,Q>>=1}}else if(Xt.length>0){if(Ot&&te){const V=gt(Xt[0]);e.texStorage2D(i.TEXTURE_2D,_t,Ut,V.width,V.height)}for(let V=0,Q=Xt.length;V<Q;V++)yt=Xt[V],Ot?P&&e.texSubImage2D(i.TEXTURE_2D,V,0,0,Mt,Dt,yt):e.texImage2D(i.TEXTURE_2D,V,Ut,Mt,Dt,yt);v.generateMipmaps=!1}else if(Ot){if(te){const V=gt(st);e.texStorage2D(i.TEXTURE_2D,_t,Ut,V.width,V.height)}P&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Mt,Dt,st)}else e.texImage2D(i.TEXTURE_2D,0,Ut,Mt,Dt,st);u(v)&&m(Y),bt.__version=$.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function X(T,v,N){if(v.image.length!==6)return;const Y=Nt(T,v),j=v.source;e.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+N);const $=n.get(j);if(j.version!==$.__version||Y===!0){e.activeTexture(i.TEXTURE0+N);const bt=Jt.getPrimaries(Jt.workingColorSpace),ut=v.colorSpace===Ln?null:Jt.getPrimaries(v.colorSpace),xt=v.colorSpace===Ln||bt===ut?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt);const Wt=v.isCompressedTexture||v.image[0].isCompressedTexture,st=v.image[0]&&v.image[0].isDataTexture,Mt=[];for(let Q=0;Q<6;Q++)!Wt&&!st?Mt[Q]=x(v.image[Q],!0,s.maxCubemapSize):Mt[Q]=st?v.image[Q].image:v.image[Q],Mt[Q]=At(v,Mt[Q]);const Dt=Mt[0],Ut=r.convert(v.format,v.colorSpace),yt=r.convert(v.type),Xt=E(v.internalFormat,Ut,yt,v.colorSpace),Ot=v.isVideoTexture!==!0,te=$.__version===void 0||Y===!0,P=j.dataReady;let _t=b(v,Dt);nt(i.TEXTURE_CUBE_MAP,v);let V;if(Wt){Ot&&te&&e.texStorage2D(i.TEXTURE_CUBE_MAP,_t,Xt,Dt.width,Dt.height);for(let Q=0;Q<6;Q++){V=Mt[Q].mipmaps;for(let pt=0;pt<V.length;pt++){const vt=V[pt];v.format!==tn?Ut!==null?Ot?P&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pt,0,0,vt.width,vt.height,Ut,vt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pt,Xt,vt.width,vt.height,0,vt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ot?P&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pt,0,0,vt.width,vt.height,Ut,yt,vt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pt,Xt,vt.width,vt.height,0,Ut,yt,vt.data)}}}else{if(V=v.mipmaps,Ot&&te){V.length>0&&_t++;const Q=gt(Mt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,_t,Xt,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(st){Ot?P&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Mt[Q].width,Mt[Q].height,Ut,yt,Mt[Q].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Xt,Mt[Q].width,Mt[Q].height,0,Ut,yt,Mt[Q].data);for(let pt=0;pt<V.length;pt++){const qt=V[pt].image[Q].image;Ot?P&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pt+1,0,0,qt.width,qt.height,Ut,yt,qt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pt+1,Xt,qt.width,qt.height,0,Ut,yt,qt.data)}}else{Ot?P&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Ut,yt,Mt[Q]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Xt,Ut,yt,Mt[Q]);for(let pt=0;pt<V.length;pt++){const vt=V[pt];Ot?P&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pt+1,0,0,Ut,yt,vt.image[Q]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pt+1,Xt,Ut,yt,vt.image[Q])}}}u(v)&&m(i.TEXTURE_CUBE_MAP),$.__version=j.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function et(T,v,N,Y,j,$){const bt=r.convert(N.format,N.colorSpace),ut=r.convert(N.type),xt=E(N.internalFormat,bt,ut,N.colorSpace);if(!n.get(v).__hasExternalTextures){const st=Math.max(1,v.width>>$),Mt=Math.max(1,v.height>>$);j===i.TEXTURE_3D||j===i.TEXTURE_2D_ARRAY?e.texImage3D(j,$,xt,st,Mt,v.depth,0,bt,ut,null):e.texImage2D(j,$,xt,st,Mt,0,bt,ut,null)}e.bindFramebuffer(i.FRAMEBUFFER,T),it(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,j,n.get(N).__webglTexture,0,lt(v)):(j===i.TEXTURE_2D||j>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,j,n.get(N).__webglTexture,$),e.bindFramebuffer(i.FRAMEBUFFER,null)}function St(T,v,N){if(i.bindRenderbuffer(i.RENDERBUFFER,T),v.depthBuffer){const Y=v.depthTexture,j=Y&&Y.isDepthTexture?Y.type:null,$=M(v.stencilBuffer,j),bt=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ut=lt(v);it(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ut,$,v.width,v.height):N?i.renderbufferStorageMultisample(i.RENDERBUFFER,ut,$,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,$,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,bt,i.RENDERBUFFER,T)}else{const Y=v.textures;for(let j=0;j<Y.length;j++){const $=Y[j],bt=r.convert($.format,$.colorSpace),ut=r.convert($.type),xt=E($.internalFormat,bt,ut,$.colorSpace),Wt=lt(v);N&&it(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Wt,xt,v.width,v.height):it(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Wt,xt,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,xt,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ft(T,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,T),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(v.depthTexture).__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),H(v.depthTexture,0);const Y=n.get(v.depthTexture).__webglTexture,j=lt(v);if(v.depthTexture.format===wi)it(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Y,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Y,0);else if(v.depthTexture.format===Ii)it(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Y,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Y,0);else throw new Error("Unknown depthTexture format")}function Pt(T){const v=n.get(T),N=T.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==T.depthTexture){const Y=T.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),Y){const j=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,Y.removeEventListener("dispose",j)};Y.addEventListener("dispose",j),v.__depthDisposeCallback=j}v.__boundDepthTexture=Y}if(T.depthTexture&&!v.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");ft(v.__webglFramebuffer,T)}else if(N){v.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[Y]),v.__webglDepthbuffer[Y]===void 0)v.__webglDepthbuffer[Y]=i.createRenderbuffer(),St(v.__webglDepthbuffer[Y],T,!1);else{const j=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,$=v.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,$),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,$)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),St(v.__webglDepthbuffer,T,!1);else{const Y=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,j=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,j),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,j)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ct(T,v,N){const Y=n.get(T);v!==void 0&&et(Y.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),N!==void 0&&Pt(T)}function Ft(T){const v=T.texture,N=n.get(T),Y=n.get(v);T.addEventListener("dispose",R);const j=T.textures,$=T.isWebGLCubeRenderTarget===!0,bt=j.length>1;if(bt||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=v.version,a.memory.textures++),$){N.__webglFramebuffer=[];for(let ut=0;ut<6;ut++)if(v.mipmaps&&v.mipmaps.length>0){N.__webglFramebuffer[ut]=[];for(let xt=0;xt<v.mipmaps.length;xt++)N.__webglFramebuffer[ut][xt]=i.createFramebuffer()}else N.__webglFramebuffer[ut]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){N.__webglFramebuffer=[];for(let ut=0;ut<v.mipmaps.length;ut++)N.__webglFramebuffer[ut]=i.createFramebuffer()}else N.__webglFramebuffer=i.createFramebuffer();if(bt)for(let ut=0,xt=j.length;ut<xt;ut++){const Wt=n.get(j[ut]);Wt.__webglTexture===void 0&&(Wt.__webglTexture=i.createTexture(),a.memory.textures++)}if(T.samples>0&&it(T)===!1){N.__webglMultisampledFramebuffer=i.createFramebuffer(),N.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let ut=0;ut<j.length;ut++){const xt=j[ut];N.__webglColorRenderbuffer[ut]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,N.__webglColorRenderbuffer[ut]);const Wt=r.convert(xt.format,xt.colorSpace),st=r.convert(xt.type),Mt=E(xt.internalFormat,Wt,st,xt.colorSpace,T.isXRRenderTarget===!0),Dt=lt(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,Dt,Mt,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.RENDERBUFFER,N.__webglColorRenderbuffer[ut])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(N.__webglDepthRenderbuffer=i.createRenderbuffer(),St(N.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if($){e.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),nt(i.TEXTURE_CUBE_MAP,v);for(let ut=0;ut<6;ut++)if(v.mipmaps&&v.mipmaps.length>0)for(let xt=0;xt<v.mipmaps.length;xt++)et(N.__webglFramebuffer[ut][xt],T,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,xt);else et(N.__webglFramebuffer[ut],T,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0);u(v)&&m(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(bt){for(let ut=0,xt=j.length;ut<xt;ut++){const Wt=j[ut],st=n.get(Wt);e.bindTexture(i.TEXTURE_2D,st.__webglTexture),nt(i.TEXTURE_2D,Wt),et(N.__webglFramebuffer,T,Wt,i.COLOR_ATTACHMENT0+ut,i.TEXTURE_2D,0),u(Wt)&&m(i.TEXTURE_2D)}e.unbindTexture()}else{let ut=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ut=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ut,Y.__webglTexture),nt(ut,v),v.mipmaps&&v.mipmaps.length>0)for(let xt=0;xt<v.mipmaps.length;xt++)et(N.__webglFramebuffer[xt],T,v,i.COLOR_ATTACHMENT0,ut,xt);else et(N.__webglFramebuffer,T,v,i.COLOR_ATTACHMENT0,ut,0);u(v)&&m(ut),e.unbindTexture()}T.depthBuffer&&Pt(T)}function Gt(T){const v=T.textures;for(let N=0,Y=v.length;N<Y;N++){const j=v[N];if(u(j)){const $=T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,bt=n.get(j).__webglTexture;e.bindTexture($,bt),m($),e.unbindTexture()}}}const J=[],w=[];function ct(T){if(T.samples>0){if(it(T)===!1){const v=T.textures,N=T.width,Y=T.height;let j=i.COLOR_BUFFER_BIT;const $=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,bt=n.get(T),ut=v.length>1;if(ut)for(let xt=0;xt<v.length;xt++)e.bindFramebuffer(i.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,bt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,bt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,bt.__webglFramebuffer);for(let xt=0;xt<v.length;xt++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(j|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(j|=i.STENCIL_BUFFER_BIT)),ut){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,bt.__webglColorRenderbuffer[xt]);const Wt=n.get(v[xt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Wt,0)}i.blitFramebuffer(0,0,N,Y,0,0,N,Y,j,i.NEAREST),l===!0&&(J.length=0,w.length=0,J.push(i.COLOR_ATTACHMENT0+xt),T.depthBuffer&&T.resolveDepthBuffer===!1&&(J.push($),w.push($),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,w)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,J))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ut)for(let xt=0;xt<v.length;xt++){e.bindFramebuffer(i.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.RENDERBUFFER,bt.__webglColorRenderbuffer[xt]);const Wt=n.get(v[xt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,bt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.TEXTURE_2D,Wt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,bt.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const v=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function lt(T){return Math.min(s.maxSamples,T.samples)}function it(T){const v=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function ht(T){const v=a.render.frame;h.get(T)!==v&&(h.set(T,v),T.update())}function At(T,v){const N=T.colorSpace,Y=T.format,j=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||N!==On&&N!==Ln&&(Jt.getTransfer(N)===ne?(Y!==tn||j!==En)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),v}function gt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=S,this.setTexture2D=H,this.setTexture2DArray=q,this.setTexture3D=k,this.setTextureCube=Z,this.rebindTextures=Ct,this.setupRenderTarget=Ft,this.updateRenderTargetMipmap=Gt,this.updateMultisampleRenderTarget=ct,this.setupDepthRenderbuffer=Pt,this.setupFrameBufferTexture=et,this.useMultisampledRTT=it}function Mm(i,t){function e(n,s=Ln){let r;const a=Jt.getTransfer(s);if(n===En)return i.UNSIGNED_BYTE;if(n===Va)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Wa)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Dl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ll)return i.BYTE;if(n===Il)return i.SHORT;if(n===Ji)return i.UNSIGNED_SHORT;if(n===Ga)return i.INT;if(n===ii)return i.UNSIGNED_INT;if(n===Sn)return i.FLOAT;if(n===es)return i.HALF_FLOAT;if(n===Ul)return i.ALPHA;if(n===Nl)return i.RGB;if(n===tn)return i.RGBA;if(n===Fl)return i.LUMINANCE;if(n===Ol)return i.LUMINANCE_ALPHA;if(n===wi)return i.DEPTH_COMPONENT;if(n===Ii)return i.DEPTH_STENCIL;if(n===Bl)return i.RED;if(n===Xa)return i.RED_INTEGER;if(n===zl)return i.RG;if(n===qa)return i.RG_INTEGER;if(n===Ya)return i.RGBA_INTEGER;if(n===Ds||n===Us||n===Ns||n===Fs)if(a===ne)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ds)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Us)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ns)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Fs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ds)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Us)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ns)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Fs)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ra||n===aa||n===oa||n===la)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ra)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===aa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===oa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===la)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ca||n===ha||n===ua)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ca||n===ha)return a===ne?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ua)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===da||n===fa||n===pa||n===ma||n===ga||n===_a||n===va||n===xa||n===Ma||n===Sa||n===ya||n===Ea||n===ba||n===Ta)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===da)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===fa)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===pa)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ma)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ga)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===_a)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===va)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===xa)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ma)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Sa)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ya)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ea)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ba)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ta)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Os||n===wa||n===Aa)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Os)return a===ne?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===wa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Aa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===kl||n===Ra||n===Ca||n===Pa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Os)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ra)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ca)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Pa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Li?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class Sm extends We{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class re extends be{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ym={type:"move"};class Fr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new re,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new re,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new re,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const x of t.hand.values()){const u=e.getJointPose(x,n),m=this._getHandJoint(c,x);u!==null&&(m.matrix.fromArray(u.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=u.radius),m.visible=u!==null}const h=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],d=h.position.distanceTo(f.position),p=.02,g=.005;c.inputState.pinching&&d>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ym)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new re;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Em=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,bm=`
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

}`;class Tm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new Le,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Fn({vertexShader:Em,fragmentShader:bm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new rt(new nn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class wm extends Ni{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,f=null,d=null,p=null,g=null;const x=new Tm,u=e.getContextAttributes();let m=null,E=null;const M=[],b=[],C=new ot;let R=null;const A=new We;A.layers.enable(1),A.viewport=new ce;const L=new We;L.layers.enable(2),L.viewport=new ce;const K=[A,L],_=new Sm;_.layers.enable(1),_.layers.enable(2);let S=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let et=M[X];return et===void 0&&(et=new Fr,M[X]=et),et.getTargetRaySpace()},this.getControllerGrip=function(X){let et=M[X];return et===void 0&&(et=new Fr,M[X]=et),et.getGripSpace()},this.getHand=function(X){let et=M[X];return et===void 0&&(et=new Fr,M[X]=et),et.getHandSpace()};function F(X){const et=b.indexOf(X.inputSource);if(et===-1)return;const St=M[et];St!==void 0&&(St.update(X.inputSource,X.frame,c||a),St.dispatchEvent({type:X.type,data:X.inputSource}))}function H(){s.removeEventListener("select",F),s.removeEventListener("selectstart",F),s.removeEventListener("selectend",F),s.removeEventListener("squeeze",F),s.removeEventListener("squeezestart",F),s.removeEventListener("squeezeend",F),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",q);for(let X=0;X<M.length;X++){const et=b[X];et!==null&&(b[X]=null,M[X].disconnect(et))}S=null,z=null,x.reset(),t.setRenderTarget(m),p=null,d=null,f=null,s=null,E=null,Ht.stop(),n.isPresenting=!1,t.setPixelRatio(R),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(m=t.getRenderTarget(),s.addEventListener("select",F),s.addEventListener("selectstart",F),s.addEventListener("selectend",F),s.addEventListener("squeeze",F),s.addEventListener("squeezestart",F),s.addEventListener("squeezeend",F),s.addEventListener("end",H),s.addEventListener("inputsourceschange",q),u.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(C),s.renderState.layers===void 0){const et={antialias:u.antialias,alpha:!0,depth:u.depth,stencil:u.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,et),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),E=new si(p.framebufferWidth,p.framebufferHeight,{format:tn,type:En,colorSpace:t.outputColorSpace,stencilBuffer:u.stencil})}else{let et=null,St=null,ft=null;u.depth&&(ft=u.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,et=u.stencil?Ii:wi,St=u.stencil?Li:ii);const Pt={colorFormat:e.RGBA8,depthFormat:ft,scaleFactor:r};f=new XRWebGLBinding(s,e),d=f.createProjectionLayer(Pt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),E=new si(d.textureWidth,d.textureHeight,{format:tn,type:En,depthTexture:new ec(d.textureWidth,d.textureHeight,St,void 0,void 0,void 0,void 0,void 0,void 0,et),stencilBuffer:u.stencil,colorSpace:t.outputColorSpace,samples:u.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Ht.setContext(s),Ht.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function q(X){for(let et=0;et<X.removed.length;et++){const St=X.removed[et],ft=b.indexOf(St);ft>=0&&(b[ft]=null,M[ft].disconnect(St))}for(let et=0;et<X.added.length;et++){const St=X.added[et];let ft=b.indexOf(St);if(ft===-1){for(let Ct=0;Ct<M.length;Ct++)if(Ct>=b.length){b.push(St),ft=Ct;break}else if(b[Ct]===null){b[Ct]=St,ft=Ct;break}if(ft===-1)break}const Pt=M[ft];Pt&&Pt.connect(St)}}const k=new D,Z=new D;function G(X,et,St){k.setFromMatrixPosition(et.matrixWorld),Z.setFromMatrixPosition(St.matrixWorld);const ft=k.distanceTo(Z),Pt=et.projectionMatrix.elements,Ct=St.projectionMatrix.elements,Ft=Pt[14]/(Pt[10]-1),Gt=Pt[14]/(Pt[10]+1),J=(Pt[9]+1)/Pt[5],w=(Pt[9]-1)/Pt[5],ct=(Pt[8]-1)/Pt[0],lt=(Ct[8]+1)/Ct[0],it=Ft*ct,ht=Ft*lt,At=ft/(-ct+lt),gt=At*-ct;if(et.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(gt),X.translateZ(At),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Pt[10]===-1)X.projectionMatrix.copy(et.projectionMatrix),X.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{const T=Ft+At,v=Gt+At,N=it-gt,Y=ht+(ft-gt),j=J*Gt/v*T,$=w*Gt/v*T;X.projectionMatrix.makePerspective(N,Y,j,$,T,v),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function W(X,et){et===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(et.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let et=X.near,St=X.far;x.texture!==null&&(x.depthNear>0&&(et=x.depthNear),x.depthFar>0&&(St=x.depthFar)),_.near=L.near=A.near=et,_.far=L.far=A.far=St,(S!==_.near||z!==_.far)&&(s.updateRenderState({depthNear:_.near,depthFar:_.far}),S=_.near,z=_.far);const ft=X.parent,Pt=_.cameras;W(_,ft);for(let Ct=0;Ct<Pt.length;Ct++)W(Pt[Ct],ft);Pt.length===2?G(_,A,L):_.projectionMatrix.copy(A.projectionMatrix),tt(X,_,ft)};function tt(X,et,St){St===null?X.matrix.copy(et.matrixWorld):(X.matrix.copy(St.matrixWorld),X.matrix.invert(),X.matrix.multiply(et.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(et.projectionMatrix),X.projectionMatrixInverse.copy(et.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=La*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(X){l=X,d!==null&&(d.fixedFoveation=X),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=X)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(_)};let nt=null;function Nt(X,et){if(h=et.getViewerPose(c||a),g=et,h!==null){const St=h.views;p!==null&&(t.setRenderTargetFramebuffer(E,p.framebuffer),t.setRenderTarget(E));let ft=!1;St.length!==_.cameras.length&&(_.cameras.length=0,ft=!0);for(let Ct=0;Ct<St.length;Ct++){const Ft=St[Ct];let Gt=null;if(p!==null)Gt=p.getViewport(Ft);else{const w=f.getViewSubImage(d,Ft);Gt=w.viewport,Ct===0&&(t.setRenderTargetTextures(E,w.colorTexture,d.ignoreDepthValues?void 0:w.depthStencilTexture),t.setRenderTarget(E))}let J=K[Ct];J===void 0&&(J=new We,J.layers.enable(Ct),J.viewport=new ce,K[Ct]=J),J.matrix.fromArray(Ft.transform.matrix),J.matrix.decompose(J.position,J.quaternion,J.scale),J.projectionMatrix.fromArray(Ft.projectionMatrix),J.projectionMatrixInverse.copy(J.projectionMatrix).invert(),J.viewport.set(Gt.x,Gt.y,Gt.width,Gt.height),Ct===0&&(_.matrix.copy(J.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),ft===!0&&_.cameras.push(J)}const Pt=s.enabledFeatures;if(Pt&&Pt.includes("depth-sensing")){const Ct=f.getDepthInformation(St[0]);Ct&&Ct.isValid&&Ct.texture&&x.init(t,Ct,s.renderState)}}for(let St=0;St<M.length;St++){const ft=b[St],Pt=M[St];ft!==null&&Pt!==void 0&&Pt.update(ft,et,c||a)}nt&&nt(X,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),g=null}const Ht=new Ql;Ht.setAnimationLoop(Nt),this.setAnimationLoop=function(X){nt=X},this.dispose=function(){}}}const Wn=new un,Am=new oe;function Rm(i,t){function e(u,m){u.matrixAutoUpdate===!0&&u.updateMatrix(),m.value.copy(u.matrix)}function n(u,m){m.color.getRGB(u.fogColor.value,Zl(i)),m.isFog?(u.fogNear.value=m.near,u.fogFar.value=m.far):m.isFogExp2&&(u.fogDensity.value=m.density)}function s(u,m,E,M,b){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(u,m):m.isMeshToonMaterial?(r(u,m),f(u,m)):m.isMeshPhongMaterial?(r(u,m),h(u,m)):m.isMeshStandardMaterial?(r(u,m),d(u,m),m.isMeshPhysicalMaterial&&p(u,m,b)):m.isMeshMatcapMaterial?(r(u,m),g(u,m)):m.isMeshDepthMaterial?r(u,m):m.isMeshDistanceMaterial?(r(u,m),x(u,m)):m.isMeshNormalMaterial?r(u,m):m.isLineBasicMaterial?(a(u,m),m.isLineDashedMaterial&&o(u,m)):m.isPointsMaterial?l(u,m,E,M):m.isSpriteMaterial?c(u,m):m.isShadowMaterial?(u.color.value.copy(m.color),u.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(u,m){u.opacity.value=m.opacity,m.color&&u.diffuse.value.copy(m.color),m.emissive&&u.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(u.map.value=m.map,e(m.map,u.mapTransform)),m.alphaMap&&(u.alphaMap.value=m.alphaMap,e(m.alphaMap,u.alphaMapTransform)),m.bumpMap&&(u.bumpMap.value=m.bumpMap,e(m.bumpMap,u.bumpMapTransform),u.bumpScale.value=m.bumpScale,m.side===Ne&&(u.bumpScale.value*=-1)),m.normalMap&&(u.normalMap.value=m.normalMap,e(m.normalMap,u.normalMapTransform),u.normalScale.value.copy(m.normalScale),m.side===Ne&&u.normalScale.value.negate()),m.displacementMap&&(u.displacementMap.value=m.displacementMap,e(m.displacementMap,u.displacementMapTransform),u.displacementScale.value=m.displacementScale,u.displacementBias.value=m.displacementBias),m.emissiveMap&&(u.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,u.emissiveMapTransform)),m.specularMap&&(u.specularMap.value=m.specularMap,e(m.specularMap,u.specularMapTransform)),m.alphaTest>0&&(u.alphaTest.value=m.alphaTest);const E=t.get(m),M=E.envMap,b=E.envMapRotation;M&&(u.envMap.value=M,Wn.copy(b),Wn.x*=-1,Wn.y*=-1,Wn.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Wn.y*=-1,Wn.z*=-1),u.envMapRotation.value.setFromMatrix4(Am.makeRotationFromEuler(Wn)),u.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,u.reflectivity.value=m.reflectivity,u.ior.value=m.ior,u.refractionRatio.value=m.refractionRatio),m.lightMap&&(u.lightMap.value=m.lightMap,u.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,u.lightMapTransform)),m.aoMap&&(u.aoMap.value=m.aoMap,u.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,u.aoMapTransform))}function a(u,m){u.diffuse.value.copy(m.color),u.opacity.value=m.opacity,m.map&&(u.map.value=m.map,e(m.map,u.mapTransform))}function o(u,m){u.dashSize.value=m.dashSize,u.totalSize.value=m.dashSize+m.gapSize,u.scale.value=m.scale}function l(u,m,E,M){u.diffuse.value.copy(m.color),u.opacity.value=m.opacity,u.size.value=m.size*E,u.scale.value=M*.5,m.map&&(u.map.value=m.map,e(m.map,u.uvTransform)),m.alphaMap&&(u.alphaMap.value=m.alphaMap,e(m.alphaMap,u.alphaMapTransform)),m.alphaTest>0&&(u.alphaTest.value=m.alphaTest)}function c(u,m){u.diffuse.value.copy(m.color),u.opacity.value=m.opacity,u.rotation.value=m.rotation,m.map&&(u.map.value=m.map,e(m.map,u.mapTransform)),m.alphaMap&&(u.alphaMap.value=m.alphaMap,e(m.alphaMap,u.alphaMapTransform)),m.alphaTest>0&&(u.alphaTest.value=m.alphaTest)}function h(u,m){u.specular.value.copy(m.specular),u.shininess.value=Math.max(m.shininess,1e-4)}function f(u,m){m.gradientMap&&(u.gradientMap.value=m.gradientMap)}function d(u,m){u.metalness.value=m.metalness,m.metalnessMap&&(u.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,u.metalnessMapTransform)),u.roughness.value=m.roughness,m.roughnessMap&&(u.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,u.roughnessMapTransform)),m.envMap&&(u.envMapIntensity.value=m.envMapIntensity)}function p(u,m,E){u.ior.value=m.ior,m.sheen>0&&(u.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),u.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(u.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,u.sheenColorMapTransform)),m.sheenRoughnessMap&&(u.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,u.sheenRoughnessMapTransform))),m.clearcoat>0&&(u.clearcoat.value=m.clearcoat,u.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(u.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,u.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(u.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,u.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(u.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,u.clearcoatNormalMapTransform),u.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Ne&&u.clearcoatNormalScale.value.negate())),m.dispersion>0&&(u.dispersion.value=m.dispersion),m.iridescence>0&&(u.iridescence.value=m.iridescence,u.iridescenceIOR.value=m.iridescenceIOR,u.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],u.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(u.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,u.iridescenceMapTransform)),m.iridescenceThicknessMap&&(u.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,u.iridescenceThicknessMapTransform))),m.transmission>0&&(u.transmission.value=m.transmission,u.transmissionSamplerMap.value=E.texture,u.transmissionSamplerSize.value.set(E.width,E.height),m.transmissionMap&&(u.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,u.transmissionMapTransform)),u.thickness.value=m.thickness,m.thicknessMap&&(u.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,u.thicknessMapTransform)),u.attenuationDistance.value=m.attenuationDistance,u.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(u.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(u.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,u.anisotropyMapTransform))),u.specularIntensity.value=m.specularIntensity,u.specularColor.value.copy(m.specularColor),m.specularColorMap&&(u.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,u.specularColorMapTransform)),m.specularIntensityMap&&(u.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,u.specularIntensityMapTransform))}function g(u,m){m.matcap&&(u.matcap.value=m.matcap)}function x(u,m){const E=t.get(m).light;u.referencePosition.value.setFromMatrixPosition(E.matrixWorld),u.nearDistance.value=E.shadow.camera.near,u.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Cm(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,M){const b=M.program;n.uniformBlockBinding(E,b)}function c(E,M){let b=s[E.id];b===void 0&&(g(E),b=h(E),s[E.id]=b,E.addEventListener("dispose",u));const C=M.program;n.updateUBOMapping(E,C);const R=t.render.frame;r[E.id]!==R&&(d(E),r[E.id]=R)}function h(E){const M=f();E.__bindingPointIndex=M;const b=i.createBuffer(),C=E.__size,R=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,C,R),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,b),b}function f(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(E){const M=s[E.id],b=E.uniforms,C=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let R=0,A=b.length;R<A;R++){const L=Array.isArray(b[R])?b[R]:[b[R]];for(let K=0,_=L.length;K<_;K++){const S=L[K];if(p(S,R,K,C)===!0){const z=S.__offset,F=Array.isArray(S.value)?S.value:[S.value];let H=0;for(let q=0;q<F.length;q++){const k=F[q],Z=x(k);typeof k=="number"||typeof k=="boolean"?(S.__data[0]=k,i.bufferSubData(i.UNIFORM_BUFFER,z+H,S.__data)):k.isMatrix3?(S.__data[0]=k.elements[0],S.__data[1]=k.elements[1],S.__data[2]=k.elements[2],S.__data[3]=0,S.__data[4]=k.elements[3],S.__data[5]=k.elements[4],S.__data[6]=k.elements[5],S.__data[7]=0,S.__data[8]=k.elements[6],S.__data[9]=k.elements[7],S.__data[10]=k.elements[8],S.__data[11]=0):(k.toArray(S.__data,H),H+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,z,S.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(E,M,b,C){const R=E.value,A=M+"_"+b;if(C[A]===void 0)return typeof R=="number"||typeof R=="boolean"?C[A]=R:C[A]=R.clone(),!0;{const L=C[A];if(typeof R=="number"||typeof R=="boolean"){if(L!==R)return C[A]=R,!0}else if(L.equals(R)===!1)return L.copy(R),!0}return!1}function g(E){const M=E.uniforms;let b=0;const C=16;for(let A=0,L=M.length;A<L;A++){const K=Array.isArray(M[A])?M[A]:[M[A]];for(let _=0,S=K.length;_<S;_++){const z=K[_],F=Array.isArray(z.value)?z.value:[z.value];for(let H=0,q=F.length;H<q;H++){const k=F[H],Z=x(k),G=b%C,W=G%Z.boundary,tt=G+W;b+=W,tt!==0&&C-tt<Z.storage&&(b+=C-tt),z.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=b,b+=Z.storage}}}const R=b%C;return R>0&&(b+=C-R),E.__size=b,E.__cache={},this}function x(E){const M={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(M.boundary=4,M.storage=4):E.isVector2?(M.boundary=8,M.storage=8):E.isVector3||E.isColor?(M.boundary=16,M.storage=12):E.isVector4?(M.boundary=16,M.storage=16):E.isMatrix3?(M.boundary=48,M.storage=48):E.isMatrix4?(M.boundary=64,M.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),M}function u(E){const M=E.target;M.removeEventListener("dispose",u);const b=a.indexOf(M.__bindingPointIndex);a.splice(b,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function m(){for(const E in s)i.deleteBuffer(s[E]);a=[],s={},r={}}return{bind:l,update:c,dispose:m}}class Pm{constructor(t={}){const{canvas:e=mh(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=a;const p=new Uint32Array(4),g=new Int32Array(4);let x=null,u=null;const m=[],E=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=He,this.toneMapping=Dn,this.toneMappingExposure=1;const M=this;let b=!1,C=0,R=0,A=null,L=-1,K=null;const _=new ce,S=new ce;let z=null;const F=new Vt(0);let H=0,q=e.width,k=e.height,Z=1,G=null,W=null;const tt=new ce(0,0,q,k),nt=new ce(0,0,q,k);let Nt=!1;const Ht=new Za;let X=!1,et=!1;const St=new oe,ft=new oe,Pt=new D,Ct=new ce,Ft={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Gt=!1;function J(){return A===null?Z:1}let w=n;function ct(y,I){return e.getContext(y,I)}try{const y={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ha}`),e.addEventListener("webglcontextlost",Q,!1),e.addEventListener("webglcontextrestored",pt,!1),e.addEventListener("webglcontextcreationerror",vt,!1),w===null){const I="webgl2";if(w=ct(I,y),w===null)throw ct(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let lt,it,ht,At,gt,T,v,N,Y,j,$,bt,ut,xt,Wt,st,Mt,Dt,Ut,yt,Xt,Ot,te,P;function _t(){lt=new Nf(w),lt.init(),Ot=new Mm(w,lt),it=new Cf(w,lt,t,Ot),ht=new _m(w),it.reverseDepthBuffer&&ht.buffers.depth.setReversed(!0),At=new Bf(w),gt=new nm,T=new xm(w,lt,ht,gt,it,Ot,At),v=new Lf(M),N=new Uf(M),Y=new Wh(w),te=new Af(w,Y),j=new Ff(w,Y,At,te),$=new kf(w,j,Y,At),Ut=new zf(w,it,T),st=new Pf(gt),bt=new em(M,v,N,lt,it,te,st),ut=new Rm(M,gt),xt=new sm,Wt=new hm(lt),Dt=new wf(M,v,N,ht,$,d,l),Mt=new mm(M,$,it),P=new Cm(w,At,it,ht),yt=new Rf(w,lt,At),Xt=new Of(w,lt,At),At.programs=bt.programs,M.capabilities=it,M.extensions=lt,M.properties=gt,M.renderLists=xt,M.shadowMap=Mt,M.state=ht,M.info=At}_t();const V=new wm(M,w);this.xr=V,this.getContext=function(){return w},this.getContextAttributes=function(){return w.getContextAttributes()},this.forceContextLoss=function(){const y=lt.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=lt.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return Z},this.setPixelRatio=function(y){y!==void 0&&(Z=y,this.setSize(q,k,!1))},this.getSize=function(y){return y.set(q,k)},this.setSize=function(y,I,O=!0){if(V.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=y,k=I,e.width=Math.floor(y*Z),e.height=Math.floor(I*Z),O===!0&&(e.style.width=y+"px",e.style.height=I+"px"),this.setViewport(0,0,y,I)},this.getDrawingBufferSize=function(y){return y.set(q*Z,k*Z).floor()},this.setDrawingBufferSize=function(y,I,O){q=y,k=I,Z=O,e.width=Math.floor(y*O),e.height=Math.floor(I*O),this.setViewport(0,0,y,I)},this.getCurrentViewport=function(y){return y.copy(_)},this.getViewport=function(y){return y.copy(tt)},this.setViewport=function(y,I,O,B){y.isVector4?tt.set(y.x,y.y,y.z,y.w):tt.set(y,I,O,B),ht.viewport(_.copy(tt).multiplyScalar(Z).round())},this.getScissor=function(y){return y.copy(nt)},this.setScissor=function(y,I,O,B){y.isVector4?nt.set(y.x,y.y,y.z,y.w):nt.set(y,I,O,B),ht.scissor(S.copy(nt).multiplyScalar(Z).round())},this.getScissorTest=function(){return Nt},this.setScissorTest=function(y){ht.setScissorTest(Nt=y)},this.setOpaqueSort=function(y){G=y},this.setTransparentSort=function(y){W=y},this.getClearColor=function(y){return y.copy(Dt.getClearColor())},this.setClearColor=function(){Dt.setClearColor.apply(Dt,arguments)},this.getClearAlpha=function(){return Dt.getClearAlpha()},this.setClearAlpha=function(){Dt.setClearAlpha.apply(Dt,arguments)},this.clear=function(y=!0,I=!0,O=!0){let B=0;if(y){let U=!1;if(A!==null){const at=A.texture.format;U=at===Ya||at===qa||at===Xa}if(U){const at=A.texture.type,mt=at===En||at===ii||at===Ji||at===Li||at===Va||at===Wa,Et=Dt.getClearColor(),Tt=Dt.getClearAlpha(),Lt=Et.r,It=Et.g,wt=Et.b;mt?(p[0]=Lt,p[1]=It,p[2]=wt,p[3]=Tt,w.clearBufferuiv(w.COLOR,0,p)):(g[0]=Lt,g[1]=It,g[2]=wt,g[3]=Tt,w.clearBufferiv(w.COLOR,0,g))}else B|=w.COLOR_BUFFER_BIT}I&&(B|=w.DEPTH_BUFFER_BIT,w.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),O&&(B|=w.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),w.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Q,!1),e.removeEventListener("webglcontextrestored",pt,!1),e.removeEventListener("webglcontextcreationerror",vt,!1),xt.dispose(),Wt.dispose(),gt.dispose(),v.dispose(),N.dispose(),$.dispose(),te.dispose(),P.dispose(),bt.dispose(),V.dispose(),V.removeEventListener("sessionstart",so),V.removeEventListener("sessionend",ro),Bn.stop()};function Q(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function pt(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const y=At.autoReset,I=Mt.enabled,O=Mt.autoUpdate,B=Mt.needsUpdate,U=Mt.type;_t(),At.autoReset=y,Mt.enabled=I,Mt.autoUpdate=O,Mt.needsUpdate=B,Mt.type=U}function vt(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function qt(y){const I=y.target;I.removeEventListener("dispose",qt),de(I)}function de(y){Ie(y),gt.remove(y)}function Ie(y){const I=gt.get(y).programs;I!==void 0&&(I.forEach(function(O){bt.releaseProgram(O)}),y.isShaderMaterial&&bt.releaseShaderCache(y))}this.renderBufferDirect=function(y,I,O,B,U,at){I===null&&(I=Ft);const mt=U.isMesh&&U.matrixWorld.determinant()<0,Et=Ec(y,I,O,B,U);ht.setMaterial(B,mt);let Tt=O.index,Lt=1;if(B.wireframe===!0){if(Tt=j.getWireframeAttribute(O),Tt===void 0)return;Lt=2}const It=O.drawRange,wt=O.attributes.position;let jt=It.start*Lt,ee=(It.start+It.count)*Lt;at!==null&&(jt=Math.max(jt,at.start*Lt),ee=Math.min(ee,(at.start+at.count)*Lt)),Tt!==null?(jt=Math.max(jt,0),ee=Math.min(ee,Tt.count)):wt!=null&&(jt=Math.max(jt,0),ee=Math.min(ee,wt.count));const le=ee-jt;if(le<0||le===1/0)return;te.setup(U,B,Et,O,Tt);let Fe,Kt=yt;if(Tt!==null&&(Fe=Y.get(Tt),Kt=Xt,Kt.setIndex(Fe)),U.isMesh)B.wireframe===!0?(ht.setLineWidth(B.wireframeLinewidth*J()),Kt.setMode(w.LINES)):Kt.setMode(w.TRIANGLES);else if(U.isLine){let Rt=B.linewidth;Rt===void 0&&(Rt=1),ht.setLineWidth(Rt*J()),U.isLineSegments?Kt.setMode(w.LINES):U.isLineLoop?Kt.setMode(w.LINE_LOOP):Kt.setMode(w.LINE_STRIP)}else U.isPoints?Kt.setMode(w.POINTS):U.isSprite&&Kt.setMode(w.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)Kt.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(lt.get("WEBGL_multi_draw"))Kt.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const Rt=U._multiDrawStarts,ye=U._multiDrawCounts,Zt=U._multiDrawCount,$e=Tt?Y.get(Tt).bytesPerElement:1,ai=gt.get(B).currentProgram.getUniforms();for(let Oe=0;Oe<Zt;Oe++)ai.setValue(w,"_gl_DrawID",Oe),Kt.render(Rt[Oe]/$e,ye[Oe])}else if(U.isInstancedMesh)Kt.renderInstances(jt,le,U.count);else if(O.isInstancedBufferGeometry){const Rt=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,ye=Math.min(O.instanceCount,Rt);Kt.renderInstances(jt,le,ye)}else Kt.render(jt,le)};function $t(y,I,O){y.transparent===!0&&y.side===on&&y.forceSinglePass===!1?(y.side=Ne,y.needsUpdate=!0,as(y,I,O),y.side=Nn,y.needsUpdate=!0,as(y,I,O),y.side=on):as(y,I,O)}this.compile=function(y,I,O=null){O===null&&(O=y),u=Wt.get(O),u.init(I),E.push(u),O.traverseVisible(function(U){U.isLight&&U.layers.test(I.layers)&&(u.pushLight(U),U.castShadow&&u.pushShadow(U))}),y!==O&&y.traverseVisible(function(U){U.isLight&&U.layers.test(I.layers)&&(u.pushLight(U),U.castShadow&&u.pushShadow(U))}),u.setupLights();const B=new Set;return y.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;const at=U.material;if(at)if(Array.isArray(at))for(let mt=0;mt<at.length;mt++){const Et=at[mt];$t(Et,O,U),B.add(Et)}else $t(at,O,U),B.add(at)}),E.pop(),u=null,B},this.compileAsync=function(y,I,O=null){const B=this.compile(y,I,O);return new Promise(U=>{function at(){if(B.forEach(function(mt){gt.get(mt).currentProgram.isReady()&&B.delete(mt)}),B.size===0){U(y);return}setTimeout(at,10)}lt.get("KHR_parallel_shader_compile")!==null?at():setTimeout(at,10)})};let De=null;function fn(y){De&&De(y)}function so(){Bn.stop()}function ro(){Bn.start()}const Bn=new Ql;Bn.setAnimationLoop(fn),typeof self<"u"&&Bn.setContext(self),this.setAnimationLoop=function(y){De=y,V.setAnimationLoop(y),y===null?Bn.stop():Bn.start()},V.addEventListener("sessionstart",so),V.addEventListener("sessionend",ro),this.render=function(y,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),V.enabled===!0&&V.isPresenting===!0&&(V.cameraAutoUpdate===!0&&V.updateCamera(I),I=V.getCamera()),y.isScene===!0&&y.onBeforeRender(M,y,I,A),u=Wt.get(y,E.length),u.init(I),E.push(u),ft.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),Ht.setFromProjectionMatrix(ft),et=this.localClippingEnabled,X=st.init(this.clippingPlanes,et),x=xt.get(y,m.length),x.init(),m.push(x),V.enabled===!0&&V.isPresenting===!0){const at=M.xr.getDepthSensingMesh();at!==null&&nr(at,I,-1/0,M.sortObjects)}nr(y,I,0,M.sortObjects),x.finish(),M.sortObjects===!0&&x.sort(G,W),Gt=V.enabled===!1||V.isPresenting===!1||V.hasDepthSensing()===!1,Gt&&Dt.addToRenderList(x,y),this.info.render.frame++,X===!0&&st.beginShadows();const O=u.state.shadowsArray;Mt.render(O,y,I),X===!0&&st.endShadows(),this.info.autoReset===!0&&this.info.reset();const B=x.opaque,U=x.transmissive;if(u.setupLights(),I.isArrayCamera){const at=I.cameras;if(U.length>0)for(let mt=0,Et=at.length;mt<Et;mt++){const Tt=at[mt];oo(B,U,y,Tt)}Gt&&Dt.render(y);for(let mt=0,Et=at.length;mt<Et;mt++){const Tt=at[mt];ao(x,y,Tt,Tt.viewport)}}else U.length>0&&oo(B,U,y,I),Gt&&Dt.render(y),ao(x,y,I);A!==null&&(T.updateMultisampleRenderTarget(A),T.updateRenderTargetMipmap(A)),y.isScene===!0&&y.onAfterRender(M,y,I),te.resetDefaultState(),L=-1,K=null,E.pop(),E.length>0?(u=E[E.length-1],X===!0&&st.setGlobalState(M.clippingPlanes,u.state.camera)):u=null,m.pop(),m.length>0?x=m[m.length-1]:x=null};function nr(y,I,O,B){if(y.visible===!1)return;if(y.layers.test(I.layers)){if(y.isGroup)O=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(I);else if(y.isLight)u.pushLight(y),y.castShadow&&u.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||Ht.intersectsSprite(y)){B&&Ct.setFromMatrixPosition(y.matrixWorld).applyMatrix4(ft);const mt=$.update(y),Et=y.material;Et.visible&&x.push(y,mt,Et,O,Ct.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||Ht.intersectsObject(y))){const mt=$.update(y),Et=y.material;if(B&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Ct.copy(y.boundingSphere.center)):(mt.boundingSphere===null&&mt.computeBoundingSphere(),Ct.copy(mt.boundingSphere.center)),Ct.applyMatrix4(y.matrixWorld).applyMatrix4(ft)),Array.isArray(Et)){const Tt=mt.groups;for(let Lt=0,It=Tt.length;Lt<It;Lt++){const wt=Tt[Lt],jt=Et[wt.materialIndex];jt&&jt.visible&&x.push(y,mt,jt,O,Ct.z,wt)}}else Et.visible&&x.push(y,mt,Et,O,Ct.z,null)}}const at=y.children;for(let mt=0,Et=at.length;mt<Et;mt++)nr(at[mt],I,O,B)}function ao(y,I,O,B){const U=y.opaque,at=y.transmissive,mt=y.transparent;u.setupLightsView(O),X===!0&&st.setGlobalState(M.clippingPlanes,O),B&&ht.viewport(_.copy(B)),U.length>0&&rs(U,I,O),at.length>0&&rs(at,I,O),mt.length>0&&rs(mt,I,O),ht.buffers.depth.setTest(!0),ht.buffers.depth.setMask(!0),ht.buffers.color.setMask(!0),ht.setPolygonOffset(!1)}function oo(y,I,O,B){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;u.state.transmissionRenderTarget[B.id]===void 0&&(u.state.transmissionRenderTarget[B.id]=new si(1,1,{generateMipmaps:!0,type:lt.has("EXT_color_buffer_half_float")||lt.has("EXT_color_buffer_float")?es:En,minFilter:jn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Jt.workingColorSpace}));const at=u.state.transmissionRenderTarget[B.id],mt=B.viewport||_;at.setSize(mt.z,mt.w);const Et=M.getRenderTarget();M.setRenderTarget(at),M.getClearColor(F),H=M.getClearAlpha(),H<1&&M.setClearColor(16777215,.5),M.clear(),Gt&&Dt.render(O);const Tt=M.toneMapping;M.toneMapping=Dn;const Lt=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),u.setupLightsView(B),X===!0&&st.setGlobalState(M.clippingPlanes,B),rs(y,O,B),T.updateMultisampleRenderTarget(at),T.updateRenderTargetMipmap(at),lt.has("WEBGL_multisampled_render_to_texture")===!1){let It=!1;for(let wt=0,jt=I.length;wt<jt;wt++){const ee=I[wt],le=ee.object,Fe=ee.geometry,Kt=ee.material,Rt=ee.group;if(Kt.side===on&&le.layers.test(B.layers)){const ye=Kt.side;Kt.side=Ne,Kt.needsUpdate=!0,lo(le,O,B,Fe,Kt,Rt),Kt.side=ye,Kt.needsUpdate=!0,It=!0}}It===!0&&(T.updateMultisampleRenderTarget(at),T.updateRenderTargetMipmap(at))}M.setRenderTarget(Et),M.setClearColor(F,H),Lt!==void 0&&(B.viewport=Lt),M.toneMapping=Tt}function rs(y,I,O){const B=I.isScene===!0?I.overrideMaterial:null;for(let U=0,at=y.length;U<at;U++){const mt=y[U],Et=mt.object,Tt=mt.geometry,Lt=B===null?mt.material:B,It=mt.group;Et.layers.test(O.layers)&&lo(Et,I,O,Tt,Lt,It)}}function lo(y,I,O,B,U,at){y.onBeforeRender(M,I,O,B,U,at),y.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),U.onBeforeRender(M,I,O,B,y,at),U.transparent===!0&&U.side===on&&U.forceSinglePass===!1?(U.side=Ne,U.needsUpdate=!0,M.renderBufferDirect(O,I,B,U,y,at),U.side=Nn,U.needsUpdate=!0,M.renderBufferDirect(O,I,B,U,y,at),U.side=on):M.renderBufferDirect(O,I,B,U,y,at),y.onAfterRender(M,I,O,B,U,at)}function as(y,I,O){I.isScene!==!0&&(I=Ft);const B=gt.get(y),U=u.state.lights,at=u.state.shadowsArray,mt=U.state.version,Et=bt.getParameters(y,U.state,at,I,O),Tt=bt.getProgramCacheKey(Et);let Lt=B.programs;B.environment=y.isMeshStandardMaterial?I.environment:null,B.fog=I.fog,B.envMap=(y.isMeshStandardMaterial?N:v).get(y.envMap||B.environment),B.envMapRotation=B.environment!==null&&y.envMap===null?I.environmentRotation:y.envMapRotation,Lt===void 0&&(y.addEventListener("dispose",qt),Lt=new Map,B.programs=Lt);let It=Lt.get(Tt);if(It!==void 0){if(B.currentProgram===It&&B.lightsStateVersion===mt)return ho(y,Et),It}else Et.uniforms=bt.getUniforms(y),y.onBeforeCompile(Et,M),It=bt.acquireProgram(Et,Tt),Lt.set(Tt,It),B.uniforms=Et.uniforms;const wt=B.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(wt.clippingPlanes=st.uniform),ho(y,Et),B.needsLights=Tc(y),B.lightsStateVersion=mt,B.needsLights&&(wt.ambientLightColor.value=U.state.ambient,wt.lightProbe.value=U.state.probe,wt.directionalLights.value=U.state.directional,wt.directionalLightShadows.value=U.state.directionalShadow,wt.spotLights.value=U.state.spot,wt.spotLightShadows.value=U.state.spotShadow,wt.rectAreaLights.value=U.state.rectArea,wt.ltc_1.value=U.state.rectAreaLTC1,wt.ltc_2.value=U.state.rectAreaLTC2,wt.pointLights.value=U.state.point,wt.pointLightShadows.value=U.state.pointShadow,wt.hemisphereLights.value=U.state.hemi,wt.directionalShadowMap.value=U.state.directionalShadowMap,wt.directionalShadowMatrix.value=U.state.directionalShadowMatrix,wt.spotShadowMap.value=U.state.spotShadowMap,wt.spotLightMatrix.value=U.state.spotLightMatrix,wt.spotLightMap.value=U.state.spotLightMap,wt.pointShadowMap.value=U.state.pointShadowMap,wt.pointShadowMatrix.value=U.state.pointShadowMatrix),B.currentProgram=It,B.uniformsList=null,It}function co(y){if(y.uniformsList===null){const I=y.currentProgram.getUniforms();y.uniformsList=zs.seqWithValue(I.seq,y.uniforms)}return y.uniformsList}function ho(y,I){const O=gt.get(y);O.outputColorSpace=I.outputColorSpace,O.batching=I.batching,O.batchingColor=I.batchingColor,O.instancing=I.instancing,O.instancingColor=I.instancingColor,O.instancingMorph=I.instancingMorph,O.skinning=I.skinning,O.morphTargets=I.morphTargets,O.morphNormals=I.morphNormals,O.morphColors=I.morphColors,O.morphTargetsCount=I.morphTargetsCount,O.numClippingPlanes=I.numClippingPlanes,O.numIntersection=I.numClipIntersection,O.vertexAlphas=I.vertexAlphas,O.vertexTangents=I.vertexTangents,O.toneMapping=I.toneMapping}function Ec(y,I,O,B,U){I.isScene!==!0&&(I=Ft),T.resetTextureUnits();const at=I.fog,mt=B.isMeshStandardMaterial?I.environment:null,Et=A===null?M.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:On,Tt=(B.isMeshStandardMaterial?N:v).get(B.envMap||mt),Lt=B.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,It=!!O.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),wt=!!O.morphAttributes.position,jt=!!O.morphAttributes.normal,ee=!!O.morphAttributes.color;let le=Dn;B.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(le=M.toneMapping);const Fe=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Kt=Fe!==void 0?Fe.length:0,Rt=gt.get(B),ye=u.state.lights;if(X===!0&&(et===!0||y!==K)){const Ge=y===K&&B.id===L;st.setState(B,y,Ge)}let Zt=!1;B.version===Rt.__version?(Rt.needsLights&&Rt.lightsStateVersion!==ye.state.version||Rt.outputColorSpace!==Et||U.isBatchedMesh&&Rt.batching===!1||!U.isBatchedMesh&&Rt.batching===!0||U.isBatchedMesh&&Rt.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Rt.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Rt.instancing===!1||!U.isInstancedMesh&&Rt.instancing===!0||U.isSkinnedMesh&&Rt.skinning===!1||!U.isSkinnedMesh&&Rt.skinning===!0||U.isInstancedMesh&&Rt.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Rt.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Rt.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Rt.instancingMorph===!1&&U.morphTexture!==null||Rt.envMap!==Tt||B.fog===!0&&Rt.fog!==at||Rt.numClippingPlanes!==void 0&&(Rt.numClippingPlanes!==st.numPlanes||Rt.numIntersection!==st.numIntersection)||Rt.vertexAlphas!==Lt||Rt.vertexTangents!==It||Rt.morphTargets!==wt||Rt.morphNormals!==jt||Rt.morphColors!==ee||Rt.toneMapping!==le||Rt.morphTargetsCount!==Kt)&&(Zt=!0):(Zt=!0,Rt.__version=B.version);let $e=Rt.currentProgram;Zt===!0&&($e=as(B,I,U));let ai=!1,Oe=!1,ir=!1;const he=$e.getUniforms(),bn=Rt.uniforms;if(ht.useProgram($e.program)&&(ai=!0,Oe=!0,ir=!0),B.id!==L&&(L=B.id,Oe=!0),ai||K!==y){it.reverseDepthBuffer?(St.copy(y.projectionMatrix),_h(St),vh(St),he.setValue(w,"projectionMatrix",St)):he.setValue(w,"projectionMatrix",y.projectionMatrix),he.setValue(w,"viewMatrix",y.matrixWorldInverse);const Ge=he.map.cameraPosition;Ge!==void 0&&Ge.setValue(w,Pt.setFromMatrixPosition(y.matrixWorld)),it.logarithmicDepthBuffer&&he.setValue(w,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&he.setValue(w,"isOrthographic",y.isOrthographicCamera===!0),K!==y&&(K=y,Oe=!0,ir=!0)}if(U.isSkinnedMesh){he.setOptional(w,U,"bindMatrix"),he.setOptional(w,U,"bindMatrixInverse");const Ge=U.skeleton;Ge&&(Ge.boneTexture===null&&Ge.computeBoneTexture(),he.setValue(w,"boneTexture",Ge.boneTexture,T))}U.isBatchedMesh&&(he.setOptional(w,U,"batchingTexture"),he.setValue(w,"batchingTexture",U._matricesTexture,T),he.setOptional(w,U,"batchingIdTexture"),he.setValue(w,"batchingIdTexture",U._indirectTexture,T),he.setOptional(w,U,"batchingColorTexture"),U._colorsTexture!==null&&he.setValue(w,"batchingColorTexture",U._colorsTexture,T));const sr=O.morphAttributes;if((sr.position!==void 0||sr.normal!==void 0||sr.color!==void 0)&&Ut.update(U,O,$e),(Oe||Rt.receiveShadow!==U.receiveShadow)&&(Rt.receiveShadow=U.receiveShadow,he.setValue(w,"receiveShadow",U.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(bn.envMap.value=Tt,bn.flipEnvMap.value=Tt.isCubeTexture&&Tt.isRenderTargetTexture===!1?-1:1),B.isMeshStandardMaterial&&B.envMap===null&&I.environment!==null&&(bn.envMapIntensity.value=I.environmentIntensity),Oe&&(he.setValue(w,"toneMappingExposure",M.toneMappingExposure),Rt.needsLights&&bc(bn,ir),at&&B.fog===!0&&ut.refreshFogUniforms(bn,at),ut.refreshMaterialUniforms(bn,B,Z,k,u.state.transmissionRenderTarget[y.id]),zs.upload(w,co(Rt),bn,T)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(zs.upload(w,co(Rt),bn,T),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&he.setValue(w,"center",U.center),he.setValue(w,"modelViewMatrix",U.modelViewMatrix),he.setValue(w,"normalMatrix",U.normalMatrix),he.setValue(w,"modelMatrix",U.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const Ge=B.uniformsGroups;for(let rr=0,wc=Ge.length;rr<wc;rr++){const uo=Ge[rr];P.update(uo,$e),P.bind(uo,$e)}}return $e}function bc(y,I){y.ambientLightColor.needsUpdate=I,y.lightProbe.needsUpdate=I,y.directionalLights.needsUpdate=I,y.directionalLightShadows.needsUpdate=I,y.pointLights.needsUpdate=I,y.pointLightShadows.needsUpdate=I,y.spotLights.needsUpdate=I,y.spotLightShadows.needsUpdate=I,y.rectAreaLights.needsUpdate=I,y.hemisphereLights.needsUpdate=I}function Tc(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(y,I,O){gt.get(y.texture).__webglTexture=I,gt.get(y.depthTexture).__webglTexture=O;const B=gt.get(y);B.__hasExternalTextures=!0,B.__autoAllocateDepthBuffer=O===void 0,B.__autoAllocateDepthBuffer||lt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),B.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(y,I){const O=gt.get(y);O.__webglFramebuffer=I,O.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(y,I=0,O=0){A=y,C=I,R=O;let B=!0,U=null,at=!1,mt=!1;if(y){const Tt=gt.get(y);if(Tt.__useDefaultFramebuffer!==void 0)ht.bindFramebuffer(w.FRAMEBUFFER,null),B=!1;else if(Tt.__webglFramebuffer===void 0)T.setupRenderTarget(y);else if(Tt.__hasExternalTextures)T.rebindTextures(y,gt.get(y.texture).__webglTexture,gt.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const wt=y.depthTexture;if(Tt.__boundDepthTexture!==wt){if(wt!==null&&gt.has(wt)&&(y.width!==wt.image.width||y.height!==wt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(y)}}const Lt=y.texture;(Lt.isData3DTexture||Lt.isDataArrayTexture||Lt.isCompressedArrayTexture)&&(mt=!0);const It=gt.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(It[I])?U=It[I][O]:U=It[I],at=!0):y.samples>0&&T.useMultisampledRTT(y)===!1?U=gt.get(y).__webglMultisampledFramebuffer:Array.isArray(It)?U=It[O]:U=It,_.copy(y.viewport),S.copy(y.scissor),z=y.scissorTest}else _.copy(tt).multiplyScalar(Z).floor(),S.copy(nt).multiplyScalar(Z).floor(),z=Nt;if(ht.bindFramebuffer(w.FRAMEBUFFER,U)&&B&&ht.drawBuffers(y,U),ht.viewport(_),ht.scissor(S),ht.setScissorTest(z),at){const Tt=gt.get(y.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_CUBE_MAP_POSITIVE_X+I,Tt.__webglTexture,O)}else if(mt){const Tt=gt.get(y.texture),Lt=I||0;w.framebufferTextureLayer(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,Tt.__webglTexture,O||0,Lt)}L=-1},this.readRenderTargetPixels=function(y,I,O,B,U,at,mt){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Et=gt.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&mt!==void 0&&(Et=Et[mt]),Et){ht.bindFramebuffer(w.FRAMEBUFFER,Et);try{const Tt=y.texture,Lt=Tt.format,It=Tt.type;if(!it.textureFormatReadable(Lt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!it.textureTypeReadable(It)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=y.width-B&&O>=0&&O<=y.height-U&&w.readPixels(I,O,B,U,Ot.convert(Lt),Ot.convert(It),at)}finally{const Tt=A!==null?gt.get(A).__webglFramebuffer:null;ht.bindFramebuffer(w.FRAMEBUFFER,Tt)}}},this.readRenderTargetPixelsAsync=async function(y,I,O,B,U,at,mt){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Et=gt.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&mt!==void 0&&(Et=Et[mt]),Et){const Tt=y.texture,Lt=Tt.format,It=Tt.type;if(!it.textureFormatReadable(Lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!it.textureTypeReadable(It))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(I>=0&&I<=y.width-B&&O>=0&&O<=y.height-U){ht.bindFramebuffer(w.FRAMEBUFFER,Et);const wt=w.createBuffer();w.bindBuffer(w.PIXEL_PACK_BUFFER,wt),w.bufferData(w.PIXEL_PACK_BUFFER,at.byteLength,w.STREAM_READ),w.readPixels(I,O,B,U,Ot.convert(Lt),Ot.convert(It),0);const jt=A!==null?gt.get(A).__webglFramebuffer:null;ht.bindFramebuffer(w.FRAMEBUFFER,jt);const ee=w.fenceSync(w.SYNC_GPU_COMMANDS_COMPLETE,0);return w.flush(),await gh(w,ee,4),w.bindBuffer(w.PIXEL_PACK_BUFFER,wt),w.getBufferSubData(w.PIXEL_PACK_BUFFER,0,at),w.deleteBuffer(wt),w.deleteSync(ee),at}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(y,I=null,O=0){y.isTexture!==!0&&(Bs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),I=arguments[0]||null,y=arguments[1]);const B=Math.pow(2,-O),U=Math.floor(y.image.width*B),at=Math.floor(y.image.height*B),mt=I!==null?I.x:0,Et=I!==null?I.y:0;T.setTexture2D(y,0),w.copyTexSubImage2D(w.TEXTURE_2D,O,0,0,mt,Et,U,at),ht.unbindTexture()},this.copyTextureToTexture=function(y,I,O=null,B=null,U=0){y.isTexture!==!0&&(Bs("WebGLRenderer: copyTextureToTexture function signature has changed."),B=arguments[0]||null,y=arguments[1],I=arguments[2],U=arguments[3]||0,O=null);let at,mt,Et,Tt,Lt,It;O!==null?(at=O.max.x-O.min.x,mt=O.max.y-O.min.y,Et=O.min.x,Tt=O.min.y):(at=y.image.width,mt=y.image.height,Et=0,Tt=0),B!==null?(Lt=B.x,It=B.y):(Lt=0,It=0);const wt=Ot.convert(I.format),jt=Ot.convert(I.type);T.setTexture2D(I,0),w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL,I.flipY),w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),w.pixelStorei(w.UNPACK_ALIGNMENT,I.unpackAlignment);const ee=w.getParameter(w.UNPACK_ROW_LENGTH),le=w.getParameter(w.UNPACK_IMAGE_HEIGHT),Fe=w.getParameter(w.UNPACK_SKIP_PIXELS),Kt=w.getParameter(w.UNPACK_SKIP_ROWS),Rt=w.getParameter(w.UNPACK_SKIP_IMAGES),ye=y.isCompressedTexture?y.mipmaps[U]:y.image;w.pixelStorei(w.UNPACK_ROW_LENGTH,ye.width),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,ye.height),w.pixelStorei(w.UNPACK_SKIP_PIXELS,Et),w.pixelStorei(w.UNPACK_SKIP_ROWS,Tt),y.isDataTexture?w.texSubImage2D(w.TEXTURE_2D,U,Lt,It,at,mt,wt,jt,ye.data):y.isCompressedTexture?w.compressedTexSubImage2D(w.TEXTURE_2D,U,Lt,It,ye.width,ye.height,wt,ye.data):w.texSubImage2D(w.TEXTURE_2D,U,Lt,It,at,mt,wt,jt,ye),w.pixelStorei(w.UNPACK_ROW_LENGTH,ee),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,le),w.pixelStorei(w.UNPACK_SKIP_PIXELS,Fe),w.pixelStorei(w.UNPACK_SKIP_ROWS,Kt),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Rt),U===0&&I.generateMipmaps&&w.generateMipmap(w.TEXTURE_2D),ht.unbindTexture()},this.copyTextureToTexture3D=function(y,I,O=null,B=null,U=0){y.isTexture!==!0&&(Bs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),O=arguments[0]||null,B=arguments[1]||null,y=arguments[2],I=arguments[3],U=arguments[4]||0);let at,mt,Et,Tt,Lt,It,wt,jt,ee;const le=y.isCompressedTexture?y.mipmaps[U]:y.image;O!==null?(at=O.max.x-O.min.x,mt=O.max.y-O.min.y,Et=O.max.z-O.min.z,Tt=O.min.x,Lt=O.min.y,It=O.min.z):(at=le.width,mt=le.height,Et=le.depth,Tt=0,Lt=0,It=0),B!==null?(wt=B.x,jt=B.y,ee=B.z):(wt=0,jt=0,ee=0);const Fe=Ot.convert(I.format),Kt=Ot.convert(I.type);let Rt;if(I.isData3DTexture)T.setTexture3D(I,0),Rt=w.TEXTURE_3D;else if(I.isDataArrayTexture||I.isCompressedArrayTexture)T.setTexture2DArray(I,0),Rt=w.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL,I.flipY),w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),w.pixelStorei(w.UNPACK_ALIGNMENT,I.unpackAlignment);const ye=w.getParameter(w.UNPACK_ROW_LENGTH),Zt=w.getParameter(w.UNPACK_IMAGE_HEIGHT),$e=w.getParameter(w.UNPACK_SKIP_PIXELS),ai=w.getParameter(w.UNPACK_SKIP_ROWS),Oe=w.getParameter(w.UNPACK_SKIP_IMAGES);w.pixelStorei(w.UNPACK_ROW_LENGTH,le.width),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,le.height),w.pixelStorei(w.UNPACK_SKIP_PIXELS,Tt),w.pixelStorei(w.UNPACK_SKIP_ROWS,Lt),w.pixelStorei(w.UNPACK_SKIP_IMAGES,It),y.isDataTexture||y.isData3DTexture?w.texSubImage3D(Rt,U,wt,jt,ee,at,mt,Et,Fe,Kt,le.data):I.isCompressedArrayTexture?w.compressedTexSubImage3D(Rt,U,wt,jt,ee,at,mt,Et,Fe,le.data):w.texSubImage3D(Rt,U,wt,jt,ee,at,mt,Et,Fe,Kt,le),w.pixelStorei(w.UNPACK_ROW_LENGTH,ye),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,Zt),w.pixelStorei(w.UNPACK_SKIP_PIXELS,$e),w.pixelStorei(w.UNPACK_SKIP_ROWS,ai),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Oe),U===0&&I.generateMipmaps&&w.generateMipmap(Rt),ht.unbindTexture()},this.initRenderTarget=function(y){gt.get(y).__webglFramebuffer===void 0&&T.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?T.setTextureCube(y,0):y.isData3DTexture?T.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?T.setTexture2DArray(y,0):T.setTexture2D(y,0),ht.unbindTexture()},this.resetState=function(){C=0,R=0,A=null,ht.reset(),te.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return yn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===$a?"display-p3":"srgb",e.unpackColorSpace=Jt.workingColorSpace===js?"display-p3":"srgb"}}class ja{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Vt(t),this.near=e,this.far=n}clone(){return new ja(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Lm extends be{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new un,this.environmentIntensity=1,this.environmentRotation=new un,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Qa extends Le{constructor(t,e,n,s,r,a,o,l,c){super(t,e,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class dn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);const h=n[s],d=n[s+1]-h,p=(a-h)/d;return(s+p)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new ot:new D);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new D,s=[],r=[],a=[],o=new D,l=new oe;for(let p=0;p<=t;p++){const g=p/t;s[p]=this.getTangentAt(g,new D)}r[0]=new D,a[0]=new D;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),f=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),f<=c&&(c=f,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(s[p-1],s[p]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Me(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(l.makeRotationAxis(o,g))}a[p].crossVectors(s[p],r[p])}if(e===!0){let p=Math.acos(Me(r[0].dot(r[t]),-1,1));p/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(p=-p);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],p*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class to extends dn{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new ot){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),d=l-this.aX,p=c-this.aY;l=d*h-p*f+this.aX,c=d*f+p*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Im extends to{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function eo(){let i=0,t=0,e=0,n=0;function s(r,a,o,l){i=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,f){let d=(a-r)/c-(o-r)/(c+h)+(o-a)/h,p=(o-a)/h-(l-a)/(h+f)+(l-o)/f;d*=h,p*=h,s(a,o,d,p)},calc:function(r){const a=r*r,o=a*r;return i+t*r+e*a+n*o}}}const Rs=new D,Or=new eo,Br=new eo,zr=new eo;class Dm extends dn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new D){const n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(Rs.subVectors(s[0],s[1]).add(s[0]),c=Rs);const f=s[o%r],d=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Rs.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Rs),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(f),p),x=Math.pow(f.distanceToSquared(d),p),u=Math.pow(d.distanceToSquared(h),p);x<1e-4&&(x=1),g<1e-4&&(g=x),u<1e-4&&(u=x),Or.initNonuniformCatmullRom(c.x,f.x,d.x,h.x,g,x,u),Br.initNonuniformCatmullRom(c.y,f.y,d.y,h.y,g,x,u),zr.initNonuniformCatmullRom(c.z,f.z,d.z,h.z,g,x,u)}else this.curveType==="catmullrom"&&(Or.initCatmullRom(c.x,f.x,d.x,h.x,this.tension),Br.initCatmullRom(c.y,f.y,d.y,h.y,this.tension),zr.initCatmullRom(c.z,f.z,d.z,h.z,this.tension));return n.set(Or.calc(l),Br.calc(l),zr.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new D().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function ol(i,t,e,n,s){const r=(n-t)*.5,a=(s-e)*.5,o=i*i,l=i*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*i+e}function Um(i,t){const e=1-i;return e*e*t}function Nm(i,t){return 2*(1-i)*i*t}function Fm(i,t){return i*i*t}function Yi(i,t,e,n){return Um(i,t)+Nm(i,e)+Fm(i,n)}function Om(i,t){const e=1-i;return e*e*e*t}function Bm(i,t){const e=1-i;return 3*e*e*i*t}function zm(i,t){return 3*(1-i)*i*i*t}function km(i,t){return i*i*i*t}function $i(i,t,e,n,s){return Om(i,t)+Bm(i,e)+zm(i,n)+km(i,s)}class ac extends dn{constructor(t=new ot,e=new ot,n=new ot,s=new ot){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new ot){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set($i(t,s.x,r.x,a.x,o.x),$i(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Hm extends dn{constructor(t=new D,e=new D,n=new D,s=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new D){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set($i(t,s.x,r.x,a.x,o.x),$i(t,s.y,r.y,a.y,o.y),$i(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class oc extends dn{constructor(t=new ot,e=new ot){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ot){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ot){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Gm extends dn{constructor(t=new D,e=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new D){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new D){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class lc extends dn{constructor(t=new ot,e=new ot,n=new ot){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ot){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Yi(t,s.x,r.x,a.x),Yi(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Vm extends dn{constructor(t=new D,e=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new D){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Yi(t,s.x,r.x,a.x),Yi(t,s.y,r.y,a.y),Yi(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class cc extends dn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ot){const n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],f=s[a>s.length-3?s.length-1:a+2];return n.set(ol(o,l.x,c.x,h.x,f.x),ol(o,l.y,c.y,h.y,f.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new ot().fromArray(s))}return this}}var Da=Object.freeze({__proto__:null,ArcCurve:Im,CatmullRomCurve3:Dm,CubicBezierCurve:ac,CubicBezierCurve3:Hm,EllipseCurve:to,LineCurve:oc,LineCurve3:Gm,QuadraticBezierCurve:lc,QuadraticBezierCurve3:Vm,SplineCurve:cc});class Wm extends dn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Da[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new Da[s.type]().fromJSON(s))}return this}}class Ua extends Wm{constructor(t){super(),this.type="Path",this.currentPoint=new ot,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new oc(this.currentPoint.clone(),new ot(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new lc(this.currentPoint.clone(),new ot(t,e),new ot(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){const o=new ac(this.currentPoint.clone(),new ot(t,e),new ot(n,s),new ot(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new cc(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,a,o,l),this}absellipse(t,e,n,s,r,a,o,l){const c=new to(t,e,n,s,r,a,o,l);if(this.curves.length>0){const f=c.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class tr extends Ye{constructor(t=[new ot(0,-.5),new ot(.5,0),new ot(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=Me(s,0,Math.PI*2);const r=[],a=[],o=[],l=[],c=[],h=1/e,f=new D,d=new ot,p=new D,g=new D,x=new D;let u=0,m=0;for(let E=0;E<=t.length-1;E++)switch(E){case 0:u=t[E+1].x-t[E].x,m=t[E+1].y-t[E].y,p.x=m*1,p.y=-u,p.z=m*0,x.copy(p),p.normalize(),l.push(p.x,p.y,p.z);break;case t.length-1:l.push(x.x,x.y,x.z);break;default:u=t[E+1].x-t[E].x,m=t[E+1].y-t[E].y,p.x=m*1,p.y=-u,p.z=m*0,g.copy(p),p.x+=x.x,p.y+=x.y,p.z+=x.z,p.normalize(),l.push(p.x,p.y,p.z),x.copy(g)}for(let E=0;E<=e;E++){const M=n+E*h*s,b=Math.sin(M),C=Math.cos(M);for(let R=0;R<=t.length-1;R++){f.x=t[R].x*b,f.y=t[R].y,f.z=t[R].x*C,a.push(f.x,f.y,f.z),d.x=E/e,d.y=R/(t.length-1),o.push(d.x,d.y);const A=l[3*R+0]*b,L=l[3*R+1],K=l[3*R+0]*C;c.push(A,L,K)}}for(let E=0;E<e;E++)for(let M=0;M<t.length-1;M++){const b=M+E*t.length,C=b,R=b+t.length,A=b+t.length+1,L=b+1;r.push(C,R,L),r.push(A,L,R)}this.setIndex(r),this.setAttribute("position",new ue(a,3)),this.setAttribute("uv",new ue(o,2)),this.setAttribute("normal",new ue(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new tr(t.points,t.segments,t.phiStart,t.phiLength)}}class no extends tr{constructor(t=1,e=1,n=4,s=8){const r=new Ua;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:s}}static fromJSON(t){return new no(t.radius,t.length,t.capSegments,t.radialSegments)}}class Yt extends Ye{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],f=[],d=[],p=[];let g=0;const x=[],u=n/2;let m=0;E(),a===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new ue(f,3)),this.setAttribute("normal",new ue(d,3)),this.setAttribute("uv",new ue(p,2));function E(){const b=new D,C=new D;let R=0;const A=(e-t)/n;for(let L=0;L<=r;L++){const K=[],_=L/r,S=_*(e-t)+t;for(let z=0;z<=s;z++){const F=z/s,H=F*l+o,q=Math.sin(H),k=Math.cos(H);C.x=S*q,C.y=-_*n+u,C.z=S*k,f.push(C.x,C.y,C.z),b.set(q,A,k).normalize(),d.push(b.x,b.y,b.z),p.push(F,1-_),K.push(g++)}x.push(K)}for(let L=0;L<s;L++)for(let K=0;K<r;K++){const _=x[K][L],S=x[K+1][L],z=x[K+1][L+1],F=x[K][L+1];t>0&&(h.push(_,S,F),R+=3),e>0&&(h.push(S,z,F),R+=3)}c.addGroup(m,R,0),m+=R}function M(b){const C=g,R=new ot,A=new D;let L=0;const K=b===!0?t:e,_=b===!0?1:-1;for(let z=1;z<=s;z++)f.push(0,u*_,0),d.push(0,_,0),p.push(.5,.5),g++;const S=g;for(let z=0;z<=s;z++){const H=z/s*l+o,q=Math.cos(H),k=Math.sin(H);A.x=K*k,A.y=u*_,A.z=K*q,f.push(A.x,A.y,A.z),d.push(0,_,0),R.x=q*.5+.5,R.y=k*.5*_+.5,p.push(R.x,R.y),g++}for(let z=0;z<s;z++){const F=C+z,H=S+z;b===!0?h.push(H,H+1,F):h.push(H+1,H,F),L+=3}c.addGroup(m,L,b===!0?1:2),m+=L}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Yt(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class en extends Yt{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new en(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class hc extends Ua{constructor(t){super(t),this.uuid=Fi(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new Ua().fromJSON(s))}return this}}const Xm={triangulate:function(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=uc(i,0,s,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c,h,f,d,p;if(n&&(r=Zm(i,t,r,e)),i.length>80*e){o=c=i[0],l=h=i[1];for(let g=e;g<s;g+=e)f=i[g],d=i[g+1],f<o&&(o=f),d<l&&(l=d),f>c&&(c=f),d>h&&(h=d);p=Math.max(c-o,h-l),p=p!==0?32767/p:0}return ji(r,a,e,o,l,p,0),a}};function uc(i,t,e,n,s){let r,a;if(s===o0(i,t,e,n)>0)for(r=t;r<e;r+=n)a=ll(r,i[r],i[r+1],a);else for(r=e-n;r>=t;r-=n)a=ll(r,i[r],i[r+1],a);return a&&er(a,a.next)&&(ts(a),a=a.next),a}function ri(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(er(e,e.next)||ae(e.prev,e,e.next)===0)){if(ts(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function ji(i,t,e,n,s,r,a){if(!i)return;!a&&r&&e0(i,n,s,r);let o=i,l,c;for(;i.prev!==i.next;){if(l=i.prev,c=i.next,r?Ym(i,n,s,r):qm(i)){t.push(l.i/e|0),t.push(i.i/e|0),t.push(c.i/e|0),ts(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=$m(ri(i),t,e),ji(i,t,e,n,s,r,2)):a===2&&Km(i,t,e,n,s,r):ji(ri(i),t,e,n,s,r,1);break}}}function qm(i){const t=i.prev,e=i,n=i.next;if(ae(t,e,n)>=0)return!1;const s=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=s<r?s<a?s:a:r<a?r:a,f=o<l?o<c?o:c:l<c?l:c,d=s>r?s>a?s:a:r>a?r:a,p=o>l?o>c?o:c:l>c?l:c;let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=d&&g.y>=f&&g.y<=p&&Ei(s,o,r,l,a,c,g.x,g.y)&&ae(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Ym(i,t,e,n){const s=i.prev,r=i,a=i.next;if(ae(s,r,a)>=0)return!1;const o=s.x,l=r.x,c=a.x,h=s.y,f=r.y,d=a.y,p=o<l?o<c?o:c:l<c?l:c,g=h<f?h<d?h:d:f<d?f:d,x=o>l?o>c?o:c:l>c?l:c,u=h>f?h>d?h:d:f>d?f:d,m=Na(p,g,t,e,n),E=Na(x,u,t,e,n);let M=i.prevZ,b=i.nextZ;for(;M&&M.z>=m&&b&&b.z<=E;){if(M.x>=p&&M.x<=x&&M.y>=g&&M.y<=u&&M!==s&&M!==a&&Ei(o,h,l,f,c,d,M.x,M.y)&&ae(M.prev,M,M.next)>=0||(M=M.prevZ,b.x>=p&&b.x<=x&&b.y>=g&&b.y<=u&&b!==s&&b!==a&&Ei(o,h,l,f,c,d,b.x,b.y)&&ae(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;M&&M.z>=m;){if(M.x>=p&&M.x<=x&&M.y>=g&&M.y<=u&&M!==s&&M!==a&&Ei(o,h,l,f,c,d,M.x,M.y)&&ae(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;b&&b.z<=E;){if(b.x>=p&&b.x<=x&&b.y>=g&&b.y<=u&&b!==s&&b!==a&&Ei(o,h,l,f,c,d,b.x,b.y)&&ae(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function $m(i,t,e){let n=i;do{const s=n.prev,r=n.next.next;!er(s,r)&&dc(s,n,n.next,r)&&Qi(s,r)&&Qi(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),ts(n),ts(n.next),n=i=r),n=n.next}while(n!==i);return ri(n)}function Km(i,t,e,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&s0(a,o)){let l=fc(a,o);a=ri(a,a.next),l=ri(l,l.next),ji(a,t,e,n,s,r,0),ji(l,t,e,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function Zm(i,t,e,n){const s=[];let r,a,o,l,c;for(r=0,a=t.length;r<a;r++)o=t[r]*n,l=r<a-1?t[r+1]*n:i.length,c=uc(i,o,l,n,!1),c===c.next&&(c.steiner=!0),s.push(i0(c));for(s.sort(Jm),r=0;r<s.length;r++)e=jm(s[r],e);return e}function Jm(i,t){return i.x-t.x}function jm(i,t){const e=Qm(i,t);if(!e)return t;const n=fc(e,i);return ri(n,n.next),ri(e,e.next)}function Qm(i,t){let e=t,n=-1/0,s;const r=i.x,a=i.y;do{if(a<=e.y&&a>=e.next.y&&e.next.y!==e.y){const d=e.x+(a-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=r&&d>n&&(n=d,s=e.x<e.next.x?e:e.next,d===r))return s}e=e.next}while(e!==t);if(!s)return null;const o=s,l=s.x,c=s.y;let h=1/0,f;e=s;do r>=e.x&&e.x>=l&&r!==e.x&&Ei(a<c?r:n,a,l,c,a<c?n:r,a,e.x,e.y)&&(f=Math.abs(a-e.y)/(r-e.x),Qi(e,i)&&(f<h||f===h&&(e.x>s.x||e.x===s.x&&t0(s,e)))&&(s=e,h=f)),e=e.next;while(e!==o);return s}function t0(i,t){return ae(i.prev,i,t.prev)<0&&ae(t.next,i,i.next)<0}function e0(i,t,e,n){let s=i;do s.z===0&&(s.z=Na(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,n0(s)}function n0(i){let t,e,n,s,r,a,o,l,c=1;do{for(e=i,i=null,r=null,a=0;e;){for(a++,n=e,o=0,t=0;t<c&&(o++,n=n.nextZ,!!n);t++);for(l=c;o>0||l>0&&n;)o!==0&&(l===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,o--):(s=n,n=n.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,c*=2}while(a>1);return i}function Na(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function i0(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Ei(i,t,e,n,s,r,a,o){return(s-a)*(t-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(n-o)}function s0(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!r0(i,t)&&(Qi(i,t)&&Qi(t,i)&&a0(i,t)&&(ae(i.prev,i,t.prev)||ae(i,t.prev,t))||er(i,t)&&ae(i.prev,i,i.next)>0&&ae(t.prev,t,t.next)>0)}function ae(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function er(i,t){return i.x===t.x&&i.y===t.y}function dc(i,t,e,n){const s=Ps(ae(i,t,e)),r=Ps(ae(i,t,n)),a=Ps(ae(e,n,i)),o=Ps(ae(e,n,t));return!!(s!==r&&a!==o||s===0&&Cs(i,e,t)||r===0&&Cs(i,n,t)||a===0&&Cs(e,i,n)||o===0&&Cs(e,t,n))}function Cs(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Ps(i){return i>0?1:i<0?-1:0}function r0(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&dc(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Qi(i,t){return ae(i.prev,i,i.next)<0?ae(i,t,i.next)>=0&&ae(i,i.prev,t)>=0:ae(i,t,i.prev)<0||ae(i,i.next,t)<0}function a0(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function fc(i,t){const e=new Fa(i.i,i.x,i.y),n=new Fa(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function ll(i,t,e,n){const s=new Fa(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function ts(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Fa(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function o0(i,t,e,n){let s=0;for(let r=t,a=e-n;r<e;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class Ki{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return Ki.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];cl(t),hl(n,t);let a=t.length;e.forEach(cl);for(let l=0;l<e.length;l++)s.push(a),a+=e[l].length,hl(n,e[l]);const o=Xm.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function cl(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function hl(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class io extends Ye{constructor(t=new hc([new ot(.5,.5),new ot(-.5,.5),new ot(-.5,-.5),new ot(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],r=[];for(let o=0,l=t.length;o<l;o++){const c=t[o];a(c)}this.setAttribute("position",new ue(s,3)),this.setAttribute("uv",new ue(r,2)),this.computeVertexNormals();function a(o){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,f=e.depth!==void 0?e.depth:1;let d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,p=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:p-.1,x=e.bevelOffset!==void 0?e.bevelOffset:0,u=e.bevelSegments!==void 0?e.bevelSegments:3;const m=e.extrudePath,E=e.UVGenerator!==void 0?e.UVGenerator:l0;let M,b=!1,C,R,A,L;m&&(M=m.getSpacedPoints(h),b=!0,d=!1,C=m.computeFrenetFrames(h,!1),R=new D,A=new D,L=new D),d||(u=0,p=0,g=0,x=0);const K=o.extractPoints(c);let _=K.shape;const S=K.holes;if(!Ki.isClockWise(_)){_=_.reverse();for(let J=0,w=S.length;J<w;J++){const ct=S[J];Ki.isClockWise(ct)&&(S[J]=ct.reverse())}}const F=Ki.triangulateShape(_,S),H=_;for(let J=0,w=S.length;J<w;J++){const ct=S[J];_=_.concat(ct)}function q(J,w,ct){return w||console.error("THREE.ExtrudeGeometry: vec does not exist"),J.clone().addScaledVector(w,ct)}const k=_.length,Z=F.length;function G(J,w,ct){let lt,it,ht;const At=J.x-w.x,gt=J.y-w.y,T=ct.x-J.x,v=ct.y-J.y,N=At*At+gt*gt,Y=At*v-gt*T;if(Math.abs(Y)>Number.EPSILON){const j=Math.sqrt(N),$=Math.sqrt(T*T+v*v),bt=w.x-gt/j,ut=w.y+At/j,xt=ct.x-v/$,Wt=ct.y+T/$,st=((xt-bt)*v-(Wt-ut)*T)/(At*v-gt*T);lt=bt+At*st-J.x,it=ut+gt*st-J.y;const Mt=lt*lt+it*it;if(Mt<=2)return new ot(lt,it);ht=Math.sqrt(Mt/2)}else{let j=!1;At>Number.EPSILON?T>Number.EPSILON&&(j=!0):At<-Number.EPSILON?T<-Number.EPSILON&&(j=!0):Math.sign(gt)===Math.sign(v)&&(j=!0),j?(lt=-gt,it=At,ht=Math.sqrt(N)):(lt=At,it=gt,ht=Math.sqrt(N/2))}return new ot(lt/ht,it/ht)}const W=[];for(let J=0,w=H.length,ct=w-1,lt=J+1;J<w;J++,ct++,lt++)ct===w&&(ct=0),lt===w&&(lt=0),W[J]=G(H[J],H[ct],H[lt]);const tt=[];let nt,Nt=W.concat();for(let J=0,w=S.length;J<w;J++){const ct=S[J];nt=[];for(let lt=0,it=ct.length,ht=it-1,At=lt+1;lt<it;lt++,ht++,At++)ht===it&&(ht=0),At===it&&(At=0),nt[lt]=G(ct[lt],ct[ht],ct[At]);tt.push(nt),Nt=Nt.concat(nt)}for(let J=0;J<u;J++){const w=J/u,ct=p*Math.cos(w*Math.PI/2),lt=g*Math.sin(w*Math.PI/2)+x;for(let it=0,ht=H.length;it<ht;it++){const At=q(H[it],W[it],lt);ft(At.x,At.y,-ct)}for(let it=0,ht=S.length;it<ht;it++){const At=S[it];nt=tt[it];for(let gt=0,T=At.length;gt<T;gt++){const v=q(At[gt],nt[gt],lt);ft(v.x,v.y,-ct)}}}const Ht=g+x;for(let J=0;J<k;J++){const w=d?q(_[J],Nt[J],Ht):_[J];b?(A.copy(C.normals[0]).multiplyScalar(w.x),R.copy(C.binormals[0]).multiplyScalar(w.y),L.copy(M[0]).add(A).add(R),ft(L.x,L.y,L.z)):ft(w.x,w.y,0)}for(let J=1;J<=h;J++)for(let w=0;w<k;w++){const ct=d?q(_[w],Nt[w],Ht):_[w];b?(A.copy(C.normals[J]).multiplyScalar(ct.x),R.copy(C.binormals[J]).multiplyScalar(ct.y),L.copy(M[J]).add(A).add(R),ft(L.x,L.y,L.z)):ft(ct.x,ct.y,f/h*J)}for(let J=u-1;J>=0;J--){const w=J/u,ct=p*Math.cos(w*Math.PI/2),lt=g*Math.sin(w*Math.PI/2)+x;for(let it=0,ht=H.length;it<ht;it++){const At=q(H[it],W[it],lt);ft(At.x,At.y,f+ct)}for(let it=0,ht=S.length;it<ht;it++){const At=S[it];nt=tt[it];for(let gt=0,T=At.length;gt<T;gt++){const v=q(At[gt],nt[gt],lt);b?ft(v.x,v.y+M[h-1].y,M[h-1].x+ct):ft(v.x,v.y,f+ct)}}}X(),et();function X(){const J=s.length/3;if(d){let w=0,ct=k*w;for(let lt=0;lt<Z;lt++){const it=F[lt];Pt(it[2]+ct,it[1]+ct,it[0]+ct)}w=h+u*2,ct=k*w;for(let lt=0;lt<Z;lt++){const it=F[lt];Pt(it[0]+ct,it[1]+ct,it[2]+ct)}}else{for(let w=0;w<Z;w++){const ct=F[w];Pt(ct[2],ct[1],ct[0])}for(let w=0;w<Z;w++){const ct=F[w];Pt(ct[0]+k*h,ct[1]+k*h,ct[2]+k*h)}}n.addGroup(J,s.length/3-J,0)}function et(){const J=s.length/3;let w=0;St(H,w),w+=H.length;for(let ct=0,lt=S.length;ct<lt;ct++){const it=S[ct];St(it,w),w+=it.length}n.addGroup(J,s.length/3-J,1)}function St(J,w){let ct=J.length;for(;--ct>=0;){const lt=ct;let it=ct-1;it<0&&(it=J.length-1);for(let ht=0,At=h+u*2;ht<At;ht++){const gt=k*ht,T=k*(ht+1),v=w+lt+gt,N=w+it+gt,Y=w+it+T,j=w+lt+T;Ct(v,N,Y,j)}}}function ft(J,w,ct){l.push(J),l.push(w),l.push(ct)}function Pt(J,w,ct){Ft(J),Ft(w),Ft(ct);const lt=s.length/3,it=E.generateTopUV(n,s,lt-3,lt-2,lt-1);Gt(it[0]),Gt(it[1]),Gt(it[2])}function Ct(J,w,ct,lt){Ft(J),Ft(w),Ft(lt),Ft(w),Ft(ct),Ft(lt);const it=s.length/3,ht=E.generateSideWallUV(n,s,it-6,it-3,it-2,it-1);Gt(ht[0]),Gt(ht[1]),Gt(ht[3]),Gt(ht[1]),Gt(ht[2]),Gt(ht[3])}function Ft(J){s.push(l[J*3+0]),s.push(l[J*3+1]),s.push(l[J*3+2])}function Gt(J){r.push(J.x),r.push(J.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return c0(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,a=t.shapes.length;r<a;r++){const o=e[t.shapes[r]];n.push(o)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Da[s.type]().fromJSON(s)),new io(n,t.options)}}const l0={generateTopUV:function(i,t,e,n,s){const r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[s*3],h=t[s*3+1];return[new ot(r,a),new ot(o,l),new ot(c,h)]},generateSideWallUV:function(i,t,e,n,s,r){const a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],f=t[n*3+2],d=t[s*3],p=t[s*3+1],g=t[s*3+2],x=t[r*3],u=t[r*3+1],m=t[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new ot(a,1-l),new ot(c,1-f),new ot(d,1-g),new ot(x,1-m)]:[new ot(o,1-l),new ot(h,1-f),new ot(p,1-g),new ot(u,1-m)]}};function c0(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Xe extends Ye{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],f=new D,d=new D,p=[],g=[],x=[],u=[];for(let m=0;m<=n;m++){const E=[],M=m/n;let b=0;m===0&&a===0?b=.5/e:m===n&&l===Math.PI&&(b=-.5/e);for(let C=0;C<=e;C++){const R=C/e;f.x=-t*Math.cos(s+R*r)*Math.sin(a+M*o),f.y=t*Math.cos(a+M*o),f.z=t*Math.sin(s+R*r)*Math.sin(a+M*o),g.push(f.x,f.y,f.z),d.copy(f).normalize(),x.push(d.x,d.y,d.z),u.push(R+b,1-M),E.push(c++)}h.push(E)}for(let m=0;m<n;m++)for(let E=0;E<e;E++){const M=h[m][E+1],b=h[m][E],C=h[m+1][E],R=h[m+1][E+1];(m!==0||a>0)&&p.push(M,b,R),(m!==n-1||l<Math.PI)&&p.push(b,C,R)}this.setIndex(p),this.setAttribute("position",new ue(g,3)),this.setAttribute("normal",new ue(x,3)),this.setAttribute("uv",new ue(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xe(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Un extends Ye{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],l=[],c=[],h=new D,f=new D,d=new D;for(let p=0;p<=n;p++)for(let g=0;g<=s;g++){const x=g/s*r,u=p/n*Math.PI*2;f.x=(t+e*Math.cos(u))*Math.cos(x),f.y=(t+e*Math.cos(u))*Math.sin(x),f.z=e*Math.sin(u),o.push(f.x,f.y,f.z),h.x=t*Math.cos(x),h.y=t*Math.sin(x),d.subVectors(f,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/s),c.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=s;g++){const x=(s+1)*p+g-1,u=(s+1)*(p-1)+g-1,m=(s+1)*(p-1)+g,E=(s+1)*p+g;a.push(x,u,E),a.push(u,m,E)}this.setIndex(a),this.setAttribute("position",new ue(o,3)),this.setAttribute("normal",new ue(l,3)),this.setAttribute("uv",new ue(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Un(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Qn extends ss{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Vt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Vt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Hl,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new un,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class pc extends Qn{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ot(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Me(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Vt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Vt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Vt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class mc extends be{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Vt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class h0 extends mc{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(be.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Vt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const kr=new oe,ul=new D,dl=new D;class u0{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ot(512,512),this.map=null,this.mapPass=null,this.matrix=new oe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Za,this._frameExtents=new ot(1,1),this._viewportCount=1,this._viewports=[new ce(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;ul.setFromMatrixPosition(t.matrixWorld),e.position.copy(ul),dl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(dl),e.updateMatrixWorld(),kr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(kr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(kr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class d0 extends u0{constructor(){super(new tc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Hr extends mc{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(be.DEFAULT_UP),this.updateMatrix(),this.target=new be,this.shadow=new d0}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class f0{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=fl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=fl();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function fl(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ha}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ha);const ei={laneZ:[-84,0,84],baseX:312,matHalfW:152,matHalfL:392};function p0(i){const t=new Pm({antialias:!0,alpha:!0});return t.setPixelRatio(Math.min(devicePixelRatio,2)),t.setSize(innerWidth,innerHeight),t.shadowMap.enabled=!0,t.shadowMap.type=Al,t.toneMapping=Cl,t.toneMappingExposure=1.12,t.outputColorSpace=He,i.appendChild(t.domElement),t}function m0(){const i=new Lm;i.fog=new ja(13212530,900,1900);const t=new h0(16773853,11565130,.5);i.add(t);const e=new Hr(16767392,2.7);e.position.set(260,420,210),e.castShadow=!0,e.shadow.mapSize.set(2048,2048),e.shadow.camera.left=-520,e.shadow.camera.right=520,e.shadow.camera.top=420,e.shadow.camera.bottom=-420,e.shadow.camera.near=60,e.shadow.camera.far=1300,e.shadow.bias=-6e-4,e.shadow.radius=6,e.shadow.camera.updateProjectionMatrix(),i.add(e),i.add(e.target);const n=new Hr(10404607,.35);n.position.set(-320,260,-160),i.add(n);const s=new Hr(16771520,.55);return s.position.set(-80,190,-420),i.add(s),i}class g0{constructor(){Bt(this,"camera");Bt(this,"t",0);Bt(this,"shake",0);Bt(this,"baseDist",700);this.camera=new We(36,innerWidth/innerHeight,10,4e3),this.resize()}resize(){this.camera.aspect=innerWidth/innerHeight;const t=this.camera.fov*Math.PI/180,e=2*Math.atan(Math.tan(t/2)*this.camera.aspect),n=(ei.matHalfL+60)/Math.tan(e/2),s=(ei.matHalfW+170)/Math.tan(t/2),r=Math.max(n,s,380);this.baseDist=r,this.camera.updateProjectionMatrix()}update(t){this.t+=t,this.shake=Math.max(0,this.shake-t*2.2);const e=this.baseDist,n=Math.sin(this.t*.21)*6,s=(Math.random()-.5)*this.shake*9,r=(Math.random()-.5)*this.shake*7,a=.82;this.camera.position.set(n+s,Math.sin(a)*e*.86+r,Math.cos(a)*e+40),this.camera.lookAt(0,-26,-14)}}const{laneZ:Oa,baseX:Si,matHalfW:Ae,matHalfL:Wi}=ei;function Ui(i,t,e){const n=document.createElement("canvas");n.width=i,n.height=t,e(n.getContext("2d"));const s=new Qa(n);return s.colorSpace=He,s.anisotropy=4,s}function _0(){return Ui(1024,1024,i=>{i.fillStyle="#8a5a34",i.fillRect(0,0,1024,1024);for(let t=0;t<8;t++){const e=t*128,n=i.createLinearGradient(0,e,0,e+128);n.addColorStop(0,t%2?"#96683c":"#8a5c34"),n.addColorStop(.5,t%2?"#8a5c34":"#946438"),n.addColorStop(1,t%2?"#7e5230":"#835830"),i.fillStyle=n,i.fillRect(0,e,1024,126),i.fillStyle="rgba(50,30,14,.5)",i.fillRect(0,e+126,1024,3)}for(let t=0;t<90;t++){const e=Math.random()*1024,n=Math.random()*1024,s=80+Math.random()*300;i.strokeStyle=`rgba(60,36,16,${.06+Math.random()*.12})`,i.lineWidth=1+Math.random()*2,i.beginPath(),i.moveTo(e,n),i.bezierCurveTo(e+s*.3,n+(Math.random()-.5)*14,e+s*.7,n+(Math.random()-.5)*14,e+s,n+(Math.random()-.5)*8),i.stroke()}for(let t=0;t<10;t++){const e=Math.random()*1024,n=Math.random()*1024,s=i.createRadialGradient(e,n,1,e,n,14);s.addColorStop(0,"rgba(60,36,16,.55)"),s.addColorStop(1,"rgba(60,36,16,0)"),i.fillStyle=s,i.beginPath(),i.arc(e,n,14,0,7),i.fill()}})}function v0(){return Ui(2048,1024,e=>{e.fillStyle="#79b25b",e.fillRect(0,0,2048,1024);for(let r=0;r<5200;r++)e.fillStyle=`rgba(${Math.random()<.5?"255,255,255":"40,80,30"},${.03+Math.random()*.05})`,e.fillRect(Math.random()*2048,Math.random()*1024,2.2,2.2);const n=r=>(r/Ae*.5+.5)*1024,s=34/Ae*.5*1024*2;for(const r of Oa){const a=n(r);e.fillStyle="#5c8a44",e.fillRect(0,a-s/2-7,2048,s+14);const o=e.createLinearGradient(0,a-s/2,0,a+s/2);o.addColorStop(0,"#e8cf9a"),o.addColorStop(.5,"#f2dfae"),o.addColorStop(1,"#e0c48c"),e.fillStyle=o,e.fillRect(0,a-s/2,2048,s),e.strokeStyle="rgba(255,255,255,.75)",e.lineWidth=7,e.setLineDash([46,34]),e.beginPath(),e.moveTo(0,a),e.lineTo(2048,a),e.stroke(),e.setLineDash([]),e.strokeStyle="rgba(120,90,40,.4)",e.lineWidth=5,e.setLineDash([16,12]),e.beginPath(),e.moveTo(0,a-s/2+6),e.lineTo(2048,a-s/2+6),e.stroke(),e.beginPath(),e.moveTo(0,a+s/2-6),e.lineTo(2048,a+s/2-6),e.stroke(),e.setLineDash([]);for(let l=0;l<130;l++)e.fillStyle=`rgba(160,120,60,${.06+Math.random()*.1})`,e.fillRect(Math.random()*2048,a-s/2+8+Math.random()*(s-16),3,3)}for(let r=0;r<46;r++){const a=Math.random()*2048,o=Math.random()*1024;if(!Oa.some(c=>Math.abs(n(c)-o)<s*.72)){e.fillStyle=["#f2e2a0","#e88fb0","#9adcff"][r%3];for(let c=0;c<5;c++){const h=c/5*Math.PI*2;e.beginPath(),e.arc(a+Math.cos(h)*6,o+Math.sin(h)*6,4,0,7),e.fill()}e.fillStyle="#fff",e.beginPath(),e.arc(a,o,3.4,0,7),e.fill()}}e.strokeStyle="rgba(255,255,255,.5)",e.lineWidth=8,e.setLineDash([26,18]),e.strokeRect(16,16,2016,992),e.setLineDash([])})}function x0(i,t){return Ui(256,256,e=>{e.fillStyle=t,e.fillRect(0,0,256,256),e.fillStyle="rgba(255,255,255,.24)",e.fillRect(0,0,256,34),e.strokeStyle="rgba(255,255,255,.6)",e.lineWidth=10,e.strokeRect(18,18,220,220),e.fillStyle="#fff8ea",e.font="bold 150px sans-serif",e.textAlign="center",e.textBaseline="middle",e.fillText(i,128,138)})}let Gr=null;function Kn(i,t,e=.34){Gr||(Gr=Ui(128,128,s=>{const r=s.createRadialGradient(64,64,6,64,64,62);r.addColorStop(0,"rgba(20,14,8,1)"),r.addColorStop(.6,"rgba(20,14,8,.6)"),r.addColorStop(1,"rgba(20,14,8,0)"),s.fillStyle=r,s.fillRect(0,0,128,128)}));const n=new rt(new nn(i*2,t*2),new cn({map:Gr,transparent:!0,opacity:e,depthWrite:!1}));return n.rotation.x=-Math.PI/2,n.position.y=.7,n.renderOrder=1,n}const Qt=(i,t=.32)=>new pc({color:i,roughness:t,clearcoat:.65,clearcoatRoughness:.35}),ln=(i,t=.62)=>new Qn({color:i,roughness:t,metalness:0});function Ba(i,t,e,n,s){const r=new hc,a=i/2-n,o=t/2-n;r.moveTo(-a,-o-n),r.lineTo(a,-o-n),r.absarc(a,-o,n,-Math.PI/2,0,!1),r.lineTo(a+n,o),r.absarc(a,o,n,0,Math.PI/2,!1),r.lineTo(-a,o+n),r.absarc(-a,o,n,Math.PI/2,Math.PI,!1),r.lineTo(-a-n,-o),r.absarc(-a,-o,n,Math.PI,Math.PI*1.5,!1);const l=new io(r,{depth:e,bevelEnabled:!0,bevelThickness:3,bevelSize:3,bevelSegments:3,curveSegments:10});l.rotateX(-Math.PI/2);const c=new rt(l,s);return c.castShadow=c.receiveShadow=!0,c}function M0(i){const t=new re,e=new rt(new Se(1700,34,1050),new Qn({map:_0(),roughness:.55}));e.position.y=-31,e.receiveShadow=!0,e.castShadow=!1,t.add(e);const n=v0();n.repeat.set(1/(Wi*2),1/(Ae*2)),n.offset.set(.5,.5);const s=Ba(Wi*2,Ae*2,12,26,new Qn({map:n,roughness:.9}));s.position.y=-13,t.add(s);const r=pl(1);r.position.set(-Si,0,0),t.add(r);const a=pl(-1);a.position.set(Si,0,0),t.add(a);for(const E of[-Si,Si]){const M=Kn(108,98,.3);M.position.set(E,.6,0),t.add(M)}const o={mine:[],foe:[]};for(const E of[1,-1])for(let M=0;M<3;M++){const b=new D(E>0?-Si+78:Si-78,0,Oa[M]);(E>0?o.mine:o.foe).push(b);const C=new rt(new Un(15,2.4,10,28),Qt(E>0?10149119:15902346,.45));C.rotation.x=Math.PI/2,C.position.copy(b).setY(1.4),C.castShadow=!0,C.receiveShadow=!0,C.name=`slot-${E>0?"mine":"foe"}-${M}`,t.add(C)}const l=new re,c=new rt(new Yt(7,7,260,6),Qt(15905085,.5));c.rotation.z=Math.PI/2,l.add(c);const h=new rt(new en(7,26,6),ln(15257498));h.rotation.z=-Math.PI/2,h.position.x=143,l.add(h);const f=new rt(new en(2.6,9,6),Qt(2894900,.4));f.rotation.z=-Math.PI/2,f.position.x=152,l.add(f);const d=new rt(new Yt(7.4,7.4,14,12),Qt(15241136,.5));d.rotation.z=Math.PI/2,d.position.x=-136,l.add(d),l.traverse(E=>{E.castShadow=!0,E.receiveShadow=!0}),l.position.set(-120,-7,-Ae-64),l.rotation.y=.06,t.add(l);const p=Kn(150,14,.3);p.position.set(-120,-13.4,-Ae-60),t.add(p);const g=[["B","#e8645a",-Wi+40,-Ae-70,.3],["D","#5a9ae8",-Wi+96,-Ae-58,-.2],["B","#6ab04c",Wi-70,-Ae-66,.5]];for(const[E,M,b,C,R]of g){const A=new rt(new Se(46,46,46),new Qn({map:x0(E,M),roughness:.5}));A.position.set(b,9,C),A.rotation.y=R,A.castShadow=A.receiveShadow=!0,t.add(A);const L=Kn(34,32,.32);L.position.set(b,-13.3,C),t.add(L)}const x=[9067728,15242314,4889320];for(let E=0;E<3;E++){const M=new re,b=new rt(new Se(210-E*22,24,150-E*14),Qt(x[E],.55)),C=new rt(new Se(196-E*22,18,138-E*14),new Qn({color:16116952,roughness:.9}));C.position.x=6,M.add(b,C),M.position.set(190+E*8,-2+E*24,-Ae-150),M.rotation.y=(E-1)*.14,M.traverse(R=>{R.castShadow=!0,R.receiveShadow=!0}),t.add(M)}const u=Kn(130,90,.32);u.position.set(196,-13.3,-Ae-148),t.add(u);const m=[[-210,Ae-22,1],[150,Ae-18,.8],[40,-Ae+24,.9],[-40,Ae-20,.7],[255,-Ae+26,.75]];for(const[E,M,b]of m){const C=new re,R=new rt(new Yt(4.6*b,5.4*b,18*b,10),ln(10119742));R.position.y=9*b;const A=new rt(new Xe(17*b,20,16),Qt(6991948,.45));A.position.y=30*b,A.scale.y=.92;const L=new rt(new Yt(9*b,10*b,4,14),Qt(16116952,.5));L.position.y=2,C.add(R,A,L,Kn(19*b,15*b,.3)),C.traverse(K=>{K.castShadow=!0,K.receiveShadow=!0}),C.position.set(E,0,M),t.add(C)}return i.add(t),{group:t,slotPos:o,baseMeshes:{mine:r,foe:a}}}function pl(i){const t=new re,e=i>0?6727912:15233112,n=i>0?4160976:13649976,s=16116952,r=Ba(176,166,8,20,Qt(s,.5));r.position.y=0,t.add(r);const a=new rt(new Se(84,62,96),Qt(e));a.position.set(i*-8,39,0),t.add(a);const o=Ba(96,108,8,8,Qt(s,.45));o.position.set(i*-8,70,0),t.add(o);for(let u=-2;u<=2;u++){for(const m of[-48,48]){const E=new rt(new Se(12,10,9),Qt(e));E.position.set(i*-8+u*19,83,m),t.add(E)}for(const m of[-42,42]){const E=new rt(new Se(9,10,12),Qt(e));E.position.set(i*-8+m,83,u*19),t.add(E)}}for(const[u,m]of[[-44,-44],[-44,44],[30,-44],[30,44]]){const E=new rt(new Yt(15,17,78,18),Qt(e));E.position.set(i*-8+u*(i>0?1:-1),47,m),t.add(E);const M=new rt(new Yt(16.5,16.5,7,18),Qt(s,.45));M.position.set(E.position.x,74,m),t.add(M);const b=new rt(new en(21,30,18),Qt(n,.38));b.position.set(E.position.x,101,m),t.add(b)}const l=new rt(new Yt(19,22,104,20),Qt(e));l.position.set(i*-34,60,0),t.add(l);const c=new rt(new Yt(21,21,8,20),Qt(s,.45));c.position.set(i*-34,96,0),t.add(c);const h=new rt(new en(26,34,20),Qt(n,.38));h.position.set(i*-34,129,0),t.add(h);const f=new rt(new Yt(1.6,1.6,26,8),ln(10119742));f.position.set(i*-34,158,0),t.add(f);const d=Ui(64,44,u=>{u.fillStyle=i>0?"#ffd76a":"#ffb84a",u.beginPath(),u.moveTo(0,0),u.lineTo(64,12),u.lineTo(0,30),u.fill()}),p=new rt(new nn(24,15),new cn({map:d,side:on,transparent:!0}));p.position.set(i*-34+13,166,0),p.name="flag",t.add(p);const g=Ui(128,128,u=>{u.fillStyle="#4a2e16",u.beginPath(),u.moveTo(22,128),u.lineTo(22,58),u.quadraticCurveTo(64,6,106,58),u.lineTo(106,128),u.fill(),u.fillStyle="#2c1a0c",u.beginPath(),u.moveTo(34,128),u.lineTo(34,64),u.quadraticCurveTo(64,26,94,64),u.lineTo(94,128),u.fill(),u.strokeStyle="rgba(255,240,200,.35)",u.lineWidth=4;for(const m of[50,64,78])u.beginPath(),u.moveTo(m,44+Math.abs(m-64)*.5),u.lineTo(m,128),u.stroke();u.fillStyle="rgba(255,240,200,.4)",u.beginPath(),u.arc(64,60,4,0,7),u.fill()}),x=new rt(new nn(42,46),new cn({map:g,transparent:!0,polygonOffset:!0,polygonOffsetFactor:-2}));return x.position.set(i*-8+i*42.4,31,0),x.rotation.y=i*Math.PI/2,t.add(x),t.traverse(u=>{u.castShadow=!0,u.receiveShadow=!0}),t}function S0(i,t){const e=document.createElement("canvas");e.width=e.height=128;const n=e.getContext("2d");n.clearRect(0,0,128,128),n.fillStyle="#2c2118";const s=56,r=22;i==="veloz"?(n.strokeStyle="#2c2118",n.lineWidth=5,n.beginPath(),n.arc(64-r,s,13,0,7),n.stroke(),n.beginPath(),n.arc(64+r,s,13,0,7),n.stroke(),n.beginPath(),n.moveTo(55,s),n.lineTo(73,s),n.stroke(),n.fillStyle="rgba(150,220,255,.7)",n.beginPath(),n.arc(64-r,s,10,0,7),n.fill(),n.beginPath(),n.arc(64+r,s,10,0,7),n.fill()):(n.beginPath(),n.arc(64-r,s,i==="tanque"?7:6,0,7),n.fill(),n.beginPath(),n.arc(64+r,s,i==="tanque"?7:6,0,7),n.fill(),n.fillStyle="#fff",n.beginPath(),n.arc(64-r+2,s-2,2,0,7),n.arc(64+r+2,s-2,2,0,7),n.fill()),i==="tanque"?(n.strokeStyle="#2c2118",n.lineWidth=6,n.beginPath(),n.moveTo(64-r-9,s-14),n.lineTo(64-r+8,s-9),n.stroke(),n.beginPath(),n.moveTo(64+r+9,s-14),n.lineTo(64+r-8,s-9),n.stroke(),n.fillStyle="#4a3categoria".slice(0,7),n.fillStyle="#4a3424",n.beginPath(),n.ellipse(64,84,22,8,0,0,7),n.fill(),n.clearRect(56,74,16,8)):(n.strokeStyle="#2c2118",n.lineWidth=4,n.lineCap="round",n.beginPath(),n.arc(64,74,10,.35,Math.PI-.35),n.stroke()),n.fillStyle=t?"rgba(240,120,90,.5)":"rgba(240,140,150,.5)",n.beginPath(),n.arc(26,74,8,0,7),n.arc(102,74,8,0,7),n.fill();const a=new Qa(e);return a.colorSpace=He,a}function y0(i,t,e){const n=[],s=t*.58;n.push(new ot(.01,0)),n.push(new ot(i*.94,0)),n.push(new ot(i,t*.16)),n.push(new ot(i*.92,t*.4)),n.push(new ot(i*.72,s));for(let r=0;r<=10;r++){const a=-Math.PI/2+r/10*Math.PI;n.push(new ot(Math.cos(a)*e+.001,s+e*.86+Math.sin(a)*e))}return new tr(n,26)}const E0={madeira:{mine:"#5a9ae8",foe:"#e8645a",trim:"#f5ecd8",skin:"#f2cf9a"},pirata:{mine:"#3f7dd0",foe:"#d04838",trim:"#2c2c34",skin:"#f2cf9a"},robo:{mine:"#7ab8d8",foe:"#e89058",trim:"#c8ccd4",skin:"#dfe4ea"}};function b0(i,t,e){const n=new re,s=E0[t],r=e?s.foe:s.mine,a=[],o=(W,tt=.42)=>{const nt=Qt(W,tt);return a.push(nt),nt},l=i==="tanque",c=i==="veloz",h=(l?1.45:c?.82:1)*1.24,f=10*h,d=30*h,p=8.4*h,g=c?10.5:14,x=new rt(new Yt(g*h,(g+1)*h,3.4,20),o(e?"#c86a58":"#7aa8d8",.5));x.scale.z=.72,x.position.y=1.7,n.add(x);const u=new re;u.position.y=3.4,n.add(u);const m=t==="robo"?o(s.skin,.35):new Qn({color:s.skin,roughness:.55});t!=="robo"&&a.push(m);let E;t==="robo"?(E=new rt(new Se(f*1.7,d*.62,f*1.5),o(r,.3)),E.position.y=d*.31):E=new rt(y0(f,d,p),m),u.add(E);const M=new rt(new Yt(f*1.02,f*1.06,d*.34,24,1,!0),o(r,.38));M.position.y=d*.24,t!=="robo"&&u.add(M);const b=new rt(new Yt(f*1.04,f*1.04,d*.07,24,1,!0),o(s.trim,.4));b.position.y=d*.44,t!=="robo"&&u.add(b);const C=new re,R=t==="robo"?d*.62+p*.8:d*.58+p*.86;if(C.position.y=R,u.add(C),t==="robo"){const W=new rt(new Se(p*1.9,p*1.7,p*1.8),o(s.skin,.3));C.add(W);const tt=new rt(new Yt(.8,.8,8,6),o(s.trim,.35));tt.position.y=p*1.3,C.add(tt);const nt=new rt(new Xe(2.4,10,8),o(e?"#ffb84a":"#8af0a0",.25));nt.position.y=p*1.3+5,C.add(nt)}const A=new re,L=t==="robo"?.34:.6;A.rotation.y=e?L:-L;const K=new rt(new nn(p*2.1,p*2.1),new cn({map:S0(i,e),transparent:!0,polygonOffset:!0,polygonOffsetFactor:-4,depthWrite:!1}));if(K.position.set(p*(t==="robo"?1.24:1.02),t==="robo"?0:.5,0),K.rotation.y=Math.PI/2,K.renderOrder=3,A.add(K),C.add(A),t==="madeira"){if(i==="espada"){const W=new rt(new Xe(p*1.06,18,10,0,Math.PI*2,0,Math.PI*.55),o(r,.35));W.position.y=p*.34,C.add(W)}if(i==="arco"){const W=new rt(new en(p*1.05,p*1.7,16),o("#5c8a44",.45));W.position.y=p*.9,W.rotation.z=-.14,C.add(W)}if(i==="tanque"){const W=new rt(new Yt(p*.92,p*1.05,p*.9,16),o("#8a8478",.3));W.position.y=p*.62,C.add(W);const tt=new rt(new Un(p*1.02,p*.16,8,18),o("#8a8478",.3));tt.rotation.x=Math.PI/2,tt.position.y=p*.3,C.add(tt)}if(i==="veloz"){const W=new rt(new Xe(p*1.04,18,10,0,Math.PI*2,0,Math.PI*.5),o("#8a5c30",.45));W.position.y=p*.4,C.add(W)}}else if(t==="pirata"){const W=new rt(new Xe(p*1.05,18,10,0,Math.PI*2,0,Math.PI*.5),o(e?"#d04838":"#3f7dd0",.45));if(W.position.y=p*.4,C.add(W),i==="tanque"){const tt=new rt(new en(p*1.3,p*.9,4),o("#2c2c34",.4));tt.position.y=p*.8,tt.rotation.y=Math.PI/4,C.add(tt)}}else{const W=new rt(new Yt(2.6,2.6,3,8),o("#8a8f98",.3));W.position.y=p*.95,C.add(W)}const _=d*.5,S=new re;S.position.set(0,_,f*1.02),u.add(S);const z=new re;z.position.set(0,_,-f*1.02),u.add(z);for(const[W,tt]of[[S,1],[z,-1]]){const nt=new rt(new no(3.6*h,6*h,6,10),o(r,.38));nt.position.set(0,-4*h,tt*1.6*h);const Nt=new rt(new Xe(3.1*h,10,8),t==="robo"?o(s.skin,.3):m);Nt.position.set(0,-9.5*h,tt*1.6*h),W.add(nt,Nt)}const F=-9.5*h;if(i==="espada"){const W=new re;W.position.set(0,F,1.6*h);const tt=new rt(new Se(2.2,15*h,4.2),o("#e0dacb",.28));tt.position.y=10.5*h;const nt=new rt(new en(2.2,4.4,4),o("#e0dacb",.28));nt.position.y=18*h+2,nt.rotation.y=Math.PI/4;const Nt=new rt(new Se(6.4,1.8,7.4),o("#c8a84a",.4));Nt.position.y=3*h,W.add(tt,nt,Nt),W.rotation.z=-.95,S.add(W);const Ht=new rt(new Yt(6*h,6*h,2,16),o(r,.4));Ht.rotation.x=Math.PI/2,Ht.position.set(0,F+2*h,-3.4*h);const X=new rt(new Xe(2*h,10,8),o(s.trim,.35));X.position.set(0,F+2*h,-4.6*h),z.add(Ht,X)}if(i==="arco"){const W=new re;W.position.set(1.5*h,F,1.2*h);const tt=new rt(new Un(8.5*h,1.2,8,22,Math.PI*1.3),o("#8a5c30",.5));tt.rotation.z=Math.PI*.36;const nt=new rt(new Yt(.4,.4,15.6*h,4),o("#f5ecd8",.6));nt.position.x=-2.2*h,W.add(tt,nt),S.add(W)}if(i==="tanque"){const W=new re;W.position.set(0,F,1.6*h);const tt=new rt(new Yt(1.7,1.9,20*h,8),ln(10119742));tt.position.y=8*h;const nt=new rt(new Yt(5.6*h,5.6*h,10*h,14),o("#9a958a",.35));nt.rotation.x=Math.PI/2,nt.position.y=17*h,W.add(tt,nt),W.rotation.z=-.8,S.add(W),a.push(tt.material)}if(i==="veloz"){const W=new re;W.position.set(0,F,1.4*h);const tt=new rt(new Yt(1.1,1.1,19*h,8),ln(10119742));tt.position.y=6*h;const nt=new rt(new en(1.8,5,6),o(s.trim,.4));nt.position.y=16*h,W.add(tt,nt),W.rotation.z=-1.25,S.add(W);for(const[Nt,Ht]of[[-11,11],[11,11],[-11,-11],[11,-11]]){const X=new rt(new Yt(3.6*h,3.6*h,2.4,12),o("#3a3630",.35));X.rotation.x=Math.PI/2,X.position.set(Nt*h,3.4,Ht*h),X.name="wheel",n.add(X);const et=new rt(new Yt(1.4,1.4,2.8,8),o(s.trim,.35));et.rotation.x=Math.PI/2,et.position.copy(X.position),n.add(et)}}let H;if(t==="robo"){H=new re;const W=new rt(new Yt(1.6,1.6,7,8),o("#c8a84a",.3));W.rotation.x=Math.PI/2,W.position.x=-f*1.1;const tt=new rt(new Un(5.5,1.8,8,16),o("#e8c86a",.3));tt.position.x=-f*1.1-4.4,H.add(W,tt),H.position.y=d*.38,u.add(H)}const q=new re,k=new rt(new nn(26*h,4.6),new cn({color:2240540,transparent:!0,opacity:.78,depthWrite:!1})),Z=new rt(new nn(24*h,2.8),new cn({color:e?15882826:8312922,depthWrite:!1}));Z.position.z=.15,q.add(k,Z),q.position.y=t==="robo"?R+p*2.1:R+p*2.2,q.renderOrder=5,q.visible=!1,n.add(q);const G=Kn(13*h,10*h,.34);return n.add(G),n.traverse(W=>{W.isMesh&&W!==G&&W.parent!==q&&(W.castShadow=!0,W.receiveShadow=!0)}),e&&(n.rotation.y=Math.PI),{group:n,body:u,head:C,armF:S,armB:z,key:H,blob:G,hp:{root:q,fill:Z},mats:a,h:d+p*2}}function T0(i,t){const e=t==="veloz"?11:t==="tanque"?5.2:7.5,n=t==="veloz"?1.1:t==="tanque"?2:2.8,s=[];return i.group.traverse(r=>{r.name==="wheel"&&s.push(r)}),{rig:i,mode:"spawn",t:0,phase:Math.random()*6,freq:e,hopAmp:n,sy:1,syV:0,flash:0,kick:0,fade:1,struck:!1,onStrike:null,gone:!1,wheels:s}}function ti(i,t){i.mode!=="die"&&i.mode!==t&&(i.mode=t,i.t=0,i.struck=!1)}function ml(i){i.flash=1,i.kick=1,i.sy=.82}function w0(i){i.mode!=="die"&&(i.mode="die",i.t=0)}const gl=i=>i<0?0:i>1?1:i,A0=i=>{const e=i-1;return 1+(1.7+1)*e*e*e+1.7*e*e},R0=i=>i<1/2.75?7.5625*i*i:i<2/2.75?7.5625*(i-=1.5/2.75)*i+.75:i<2.5/2.75?7.5625*(i-=2.25/2.75)*i+.9375:7.5625*(i-=2.625/2.75)*i+.984375;function _l(i,t,e){var p,g;const n=i.rig;i.t+=t;const s=130;i.syV+=(1-i.sy)*s*t,i.syV*=Math.exp(-13*t),i.sy+=i.syV*t,i.flash=Math.max(0,i.flash-t*4.5),i.kick=Math.max(0,i.kick-t*5);for(const x of n.mats)x.emissive.setRGB(i.flash,i.flash*.92,i.flash*.85);const r=n.body;let a=0,o=0,l=0,c=0,h=0,f=0,d=null;if(i.mode==="spawn"){const x=gl(i.t/.38);n.group.scale.setScalar(Math.max(.05,A0(x))),a=(1-x)*16*(1-x),i.t>.16&&i.t-t<=.16&&(i.sy=.74),i.t>.5&&ti(i,"walk")}else if(i.mode==="walk"){i.phase+=t*i.freq,a=Math.abs(Math.sin(i.phase))*i.hopAmp,o=Math.sin(i.phase)*.085,l=Math.sin(i.phase*.5)*.05,c=Math.sin(i.phase)*.4,Math.sin(i.phase)<-.985&&i.sy>.93&&(i.sy=.9);for(const x of i.wheels)x.rotation.z-=t*9;n.key&&(n.key.rotation.x+=t*5.5)}else if(i.mode==="idle")a=Math.sin(i.t*3.2)*.9+.9,c=Math.sin(i.t*3.2)*.12,n.key&&(n.key.rotation.x+=t*1.6);else if(i.mode==="melee"){const x=i.t;if(x<.24){const u=x/.24;d=-2.1*u,f=-.2*u,h=-2.5*u,u>.8&&i.sy>.93&&(i.sy=.92)}else if(x<.36){const u=(x-.24)/.12;d=-2.1+3.4*u,f=-.2+.42*u,h=-2.5+9.5*u,!i.struck&&u>.55&&(i.struck=!0,i.sy=1.1,(p=i.onStrike)==null||p.call(i))}else if(x<.7){const u=(x-.36)/.34;d=1.3*(1-u),f=.22*(1-u),h=7*(1-u)}else ti(i,"idle");n.key&&(n.key.rotation.x+=t*3)}else if(i.mode==="shoot"){const x=i.t;if(x<.3){const u=x/.3;d=-.55*u,f=-.1*u}else if(x<.42){const u=(x-.3)/.12;d=-.55+.75*u,f=-.1+.16*u,!i.struck&&u>.3&&(i.struck=!0,(g=i.onStrike)==null||g.call(i))}else if(x<.66){const u=(x-.42)/.24;d=.2*(1-u),f=.06*(1-u)}else ti(i,"idle")}else if(i.mode==="die"){const x=i.t;x<.12&&(a=Math.sin(x/.12*Math.PI)*5);const u=gl((x-.06)/.5);n.group.rotation.z=-R0(u)*Math.PI*.46,x>.62&&(i.fade=Math.max(0,1-(x-.62)/.4),n.group.traverse(m=>{const E=m.material;E&&(E.transparent=!0,E.opacity=i.fade)})),n.hp.root.visible=!1,x>1.05&&(i.gone=!0)}r.position.y=a,r.position.x=h-i.kick*4,r.rotation.z=o+f,r.rotation.x=l,r.scale.set(2-i.sy,i.sy,2-i.sy),d!=null?n.armF.rotation.z=d:n.armF.rotation.z=c,n.armB.rotation.z=-c*.8,n.blob.scale.setScalar(1-a*.018),n.blob.material.opacity=.34*i.fade,n.hp.root.quaternion.copy(e)}const C0={espada:{kind:"espada",cost:12,hp:54,dmg:10,rate:.9,speed:34,range:30,ranged:!1,reward:8,xp:6,vsBase:1,train:1.2},arco:{kind:"arco",cost:20,hp:34,dmg:8,rate:1.2,speed:30,range:150,ranged:!0,reward:12,xp:8,vsBase:.7,train:1.5},tanque:{kind:"tanque",cost:42,hp:175,dmg:22,rate:1.55,speed:19,range:34,ranged:!1,reward:26,xp:16,vsBase:1.6,train:2.8},veloz:{kind:"veloz",cost:26,hp:42,dmg:12,rate:.85,speed:64,range:28,ranged:!1,reward:16,xp:10,vsBase:1.1,train:1.4}},Xi={hp:1.9,dmg:1.9,cost:2.1,reward:1.8,xp:1.6},P0={madeira:{hp:1,dmg:1},pirata:{hp:.92,dmg:1.18},robo:{hp:1.2,dmg:.92}};function ks(i,t){const e=C0[i],n=P0[t];return t==="madeira"?{...e}:{...e,hp:Math.round(e.hp*Xi.hp*n.hp),dmg:Math.round(e.dmg*Xi.dmg*n.dmg),cost:Math.round(e.cost*Xi.cost),reward:Math.round(e.reward*Xi.reward),xp:Math.round(e.xp*Xi.xp)}}function vl(i,t){return i==="espada"&&t==="arco"||i==="arco"&&t==="tanque"||i==="tanque"&&t==="espada"?1.5:1}const L0={espada:{name:"Espadinha",ico:"⚔️",tip:"vence Arqueiro"},arco:{name:"Arqueirinho",ico:"🏹",tip:"vence Tanque"},tanque:{name:"Tanquinho",ico:"🛡️",tip:"vence Espadinha"},veloz:{name:"Corredor",ico:"🐎",tip:"rápido, fura linha"}},Vr={madeira:{name:"Madeirinhas",desc:"os bonequinhos de madeira do baú"},pirata:{name:"Piratas de Plástico",desc:"dano bruto e canhonadas — abordar!"},robo:{name:"Robôs de Corda",desc:"latinhas resistentes e o Ímã Gigante"}},Hs=150,Ks=450,I0=3.1,xl=35,xe={torreta:{name:"Torreta",ico:"🎯",cost:55,up:70,tip:"atira na faixa"},gerador:{name:"Gerador",ico:"⚙️",cost:50,up:65,tip:"+1.3 ouro/s"},muralha:{name:"Muralha",ico:"🧱",cost:40,up:55,tip:"bloqueia a faixa"}},Wr={range:200,dmg:9,rate:1.25},D0=1.3,Ml=240,gc=48,U0={madeira:{name:"Chuva de Bolinhas",ico:"🔮",desc:"bolinhas de gude caem no campo inimigo"},pirata:{name:"Canhonada",ico:"💣",desc:"balas de canhão varrem os invasores"},robo:{name:"Ímã Gigante",ico:"🧲",desc:"puxa os inimigos pra trás e atordoa"}};let pe=null,Zn,sn,Zi;const za={muted:!1};function Ce(){if(pe)return!0;try{return pe=new(window.AudioContext||window.webkitAudioContext),Zn=pe.createGain(),Zn.gain.value=1,Zn.connect(pe.destination),Zi=pe.createGain(),Zi.gain.value=.9,Zi.connect(Zn),sn=pe.createGain(),sn.gain.value=.34,sn.connect(Zn),!0}catch{return!1}}function _c(){Ce()&&pe.state==="suspended"&&pe.resume()}function N0(i){za.muted=i,Zn&&(Zn.gain.value=i?0:1)}function ve(i,t,e,n,s,r,a){if(!pe)return;const o=pe.createOscillator(),l=pe.createGain();o.type=n,o.frequency.setValueAtTime(i,t),r&&o.frequency.exponentialRampToValueAtTime(r,t+e),l.gain.setValueAtTime(1e-4,t),l.gain.linearRampToValueAtTime(s,t+.008),l.gain.exponentialRampToValueAtTime(8e-4,t+e),o.connect(l),l.connect(a||Zi),o.start(t),o.stop(t+e+.03)}let Ls=null;function rn(i,t,e,n,s,r="bandpass",a){if(!pe)return;if(!Ls){Ls=pe.createBuffer(1,pe.sampleRate,pe.sampleRate);const h=Ls.getChannelData(0);for(let f=0;f<h.length;f++)h[f]=Math.random()*2-1}const o=pe.createBufferSource();o.buffer=Ls;const l=pe.createBiquadFilter();l.type=r,l.frequency.value=n,l.Q.value=s;const c=pe.createGain();c.gain.setValueAtTime(e,i),c.gain.exponentialRampToValueAtTime(8e-4,i+t),o.connect(l),l.connect(c),c.connect(a||Zi),o.start(i),o.stop(i+t+.02)}const Ee=()=>pe.currentTime,se={ui(){Ce()&&ve(620,Ee(),.05,"sine",.16,760)},pop(){Ce()&&(ve(340,Ee(),.1,"sine",.3,620),rn(Ee(),.04,.12,2400,1))},tok(){Ce()&&(ve(880,Ee(),.045,"square",.1,640),rn(Ee(),.05,.3,1600,2.4))},thud(){Ce()&&(ve(120,Ee(),.14,"sine",.4,62),rn(Ee(),.08,.2,300,1.2))},twang(){Ce()&&ve(700,Ee(),.09,"triangle",.2,240)},boing(){if(!Ce())return;const i=Ee();ve(300,i,.3,"sine",.28,90),ve(602,i,.22,"triangle",.12,180)},coin(){if(!Ce())return;const i=Ee();ve(1240,i,.06,"square",.08),ve(1660,i+.06,.16,"square",.08)},snap(){if(!Ce())return;const i=Ee();rn(i,.03,.3,3e3,3),ve(420,i+.02,.08,"sine",.2,300)},crumble(){if(!Ce())return;const i=Ee();for(let t=0;t<5;t++)rn(i+t*.05,.09,.2-t*.03,900-t*120,1.4)},special(){if(!Ce())return;const i=Ee();ve(240,i,.5,"sawtooth",.14,900),rn(i,.4,.1,1200,.8,"highpass")},rumble(){if(!Ce())return;const i=Ee();ve(60,i,1.6,"sine",.3,40),rn(i,1.4,.12,140,.8,"lowpass")},fanfare(){if(!Ce())return;const i=Ee();[523,659,784,1047].forEach((t,e)=>ve(t,i+e*.12,.34,"triangle",.22))},sad(){if(!Ce())return;const i=Ee();[392,370,349,311].forEach((t,e)=>ve(t,i+e*.28,.4,"triangle",.2))}};let ka=!1,Gs=0;const Is=i=>440*Math.pow(2,(i-69)/12),Sl=[[[72,1],[76,1],[79,1],[76,1],[72,1],[76,1],[79,2]],[[81,1],[79,1],[77,1],[79,1],[81,1],[79,1],[77,2]],[[72,1],[76,1],[79,1],[76,1],[84,1],[83,1],[79,2]],[[77,1],[81,1],[79,1],[76,1],[72,3],[0,1]]],F0=[48,55,52,55,53,57,55,55];function vc(){if(!pe||!ka)return;const i=Ee()+.06,t=60/108,e=t/2,n=F0[Gs%8];ve(Is(n-12),i,t*.9,"triangle",.16,void 0,sn),ve(Is(n-5),i+t*2,t*.9,"triangle",.13,void 0,sn),rn(i+t,.05,.07,2e3,2,"bandpass",sn),rn(i+t*3,.05,.08,2e3,2,"bandpass",sn);for(let a=0;a<8;a++)rn(i+a*e,.03,.02+(a%2?0:.012),6e3,1,"highpass",sn);const s=Sl[Gs%Sl.length];let r=i;for(const[a,o]of s)a>0&&(ve(Is(a),r,e*o*.92,"sine",.13,void 0,sn),ve(Is(a)*3.02,r,e*.5,"sine",.03,void 0,sn)),r+=e*o;Gs++,window.setTimeout(vc,t*4*1e3-30)}function O0(){Ce()&&(ka||(ka=!0,Gs=0,vc()))}const{laneZ:ke,baseX:bi}=ei,yl=bi-60,El=bi-74;class B0{constructor(t,e,n){Bt(this,"units",[]);Bt(this,"projs",[]);Bt(this,"gold",[xl,xl]);Bt(this,"xp",[0,0]);Bt(this,"faction",["madeira","madeira"]);Bt(this,"evolved",[!1,!1]);Bt(this,"baseHp",[Ks,Ks]);Bt(this,"slots",[[],[]]);Bt(this,"specCd",[0,0]);Bt(this,"spawnCd",[0,0]);Bt(this,"over",!1);Bt(this,"winner",0);Bt(this,"time",0);Bt(this,"speed",1);Bt(this,"incomeMul",[1,1]);Bt(this,"marble",{state:"idle",t:0,lane:0,x:0,dir:1,next:50,m:null,warn:null});Bt(this,"onShake",()=>{});Bt(this,"toast",()=>{});Bt(this,"onOver",()=>{});Bt(this,"id",1);this.scene=t,this.fx=e,this.slotPos=n;for(const s of[0,1])this.slots[s]=[0,1,2].map(()=>({kind:null,lvl:0,cd:0,wallHp:0,mesh:null,spawnT:0}))}canBuy(t,e){return!this.over&&this.gold[t]>=ks(e,this.faction[t]).cost&&this.spawnCd[t]<=0}buy(t,e,n){if(!this.canBuy(t,e))return!1;const s=ks(e,this.faction[t]);return this.gold[t]-=s.cost,this.spawnCd[t]=s.train,this.spawn(t,e,n),!0}spawn(t,e,n){const s=ks(e,this.faction[t]),r=b0(e,this.faction[t],t===1),a=t===0?-yl:yl;r.group.position.set(a,0,ke[n]+(Math.random()-.5)*18),this.scene.add(r.group);const o={id:this.id++,side:t,kind:e,lane:n,x:a,hp:s.hp,st:s,anim:T0(r,e),cd:0,stun:0,dead:!1};return this.units.push(o),this.fx.puff(a,8,ke[n],16116952,6,3),se.pop(),o}build(t,e,n){const s=this.slots[t][e],r=xe[n];return this.over||s.kind||this.gold[t]<r.cost?!1:(this.gold[t]-=r.cost,s.kind=n,s.lvl=1,s.cd=0,s.spawnT=0,n==="muralha"&&(s.wallHp=Ml),s.mesh=this.moduleMesh(n,t,e,1),this.scene.add(s.mesh),this.fx.puff(s.mesh.position.x,10,s.mesh.position.z,16771488,8,4),se.snap(),!0)}upgrade(t,e){const n=this.slots[t][e];return this.over||!n.kind||n.lvl!==1||this.gold[t]<xe[n.kind].up?!1:(this.gold[t]-=xe[n.kind].up,n.lvl=2,n.spawnT=0,n.kind==="muralha"&&(n.wallHp=Ml*2),n.mesh&&this.scene.remove(n.mesh),n.mesh=this.moduleMesh(n.kind,t,e,2),this.scene.add(n.mesh),this.fx.sparks(n.mesh.position.x,20,n.mesh.position.z,16771488,10),se.snap(),!0)}moduleMesh(t,e,n,s){const r=(e===0?this.slotPos.mine:this.slotPos.foe)[n],a=new re;a.position.copy(r);const o=e===0?5937896:15230042,l=s===2?1.22:1;if(t==="torreta"){const c=new rt(new Yt(12*l,14*l,12,14),Qt(12104356,.4));c.position.y=6;const h=new rt(new Yt(2.4,2.8,22*l,8),ln(9067568));h.position.y=12+10*l;const f=new rt(new Yt(2,2,14,8),ln(9067568));f.position.set(0,12+20*l,-5),f.rotation.x=.5;const d=new rt(new Yt(2,2,14,8),ln(9067568));d.position.set(0,12+20*l,5),d.rotation.x=-.5;const p=new rt(new Yt(.9,.9,13,6),Qt(15230042,.5));p.position.set(0,12+24*l,0),p.rotation.x=Math.PI/2,a.add(c,h,f,d,p)}else if(t==="gerador"){const c=new rt(new Se(20*l,16,18*l),Qt(o,.4));c.position.y=8;const h=new rt(new Un(8*l,3,8,10),Qt(15255658,.3));h.position.y=16+6*l,h.name="gear";const f=new rt(new Yt(1.6,1.6,8,8),Qt(9080728,.3));f.position.y=16+6*l,a.add(c,h,f)}else{for(let c=0;c<(s===2?3:2);c++)for(let h=0;h<3;h++){const f=new rt(new Se(10,12,20),ln(c%2?13149288:12095578));f.position.set(0,6+c*12.4,(h-1)*20.6+(c%2?5:-5)),f.rotation.y=(Math.random()-.5)*.06,a.add(f)}a.name="wall"}return a.add(Kn(16*l,13*l,.3)),a.traverse(c=>{c.castShadow=!0,c.receiveShadow=!0}),a.userData.spawnT=0,a}canSpecial(t){return!this.over&&this.specCd[t]<=0}useSpecial(t){if(!this.canSpecial(t))return!1;this.specCd[t]=gc;const e=this.faction[t],n=this.units.filter(s=>s.side!==t&&!s.dead);if(se.special(),e==="robo"){for(const s of n)s.x+=(s.side===0?-1:1)*80,s.stun=2.2,ml(s.anim),this.fx.sparks(s.x,20,ke[s.lane],5560536,5);this.onShake(.5),this.toast(t===0?"🧲 Ímã Gigante!":"🧲 O inimigo usou o Ímã!","spec")}else{const s=e==="pirata"?6:9,r=e==="pirata"?"bala":"gude";for(let a=0;a<s;a++){const o=n.length?n[a%n.length]:null,l=o?o.lane:a%3,c=o?o.x+(Math.random()-.5)*40:(t===0?1:-1)*(60+Math.random()*180);this.dropProj(t,l,c,r,e==="pirata"?46:30,e==="pirata"?46:34,.5+a*.14)}this.toast(t===0?e==="pirata"?"💣 Canhonada!":"🔮 Chuva de Bolinhas!":"⚠️ Especial inimigo!","spec")}return!0}dropProj(t,e,n,s,r,a,o){setTimeout(()=>{if(this.over)return;const l=new rt(new Xe(s==="bala"?7:6,14,12),s==="bala"?Qt(2894900,.3):Qt([5560536,15241136,16766826][Math.random()*3|0],.15));l.castShadow=!0,this.scene.add(l),this.projs.push({m:l,x:n,y:240,z:ke[e]+(Math.random()-.5)*30,vx:0,vy:-10,side:t,lane:e,dmg:r,radius:a,t:0,kind:s})},o*1e3/this.speed)}canEvolve(t){return!this.evolved[t]&&this.xp[t]>=Hs}evolve(t,e){this.canEvolve(t)&&(this.evolved[t]=!0,this.faction[t]=e,this.fx.confetti(t===0?-bi+80:bi-80,0),this.onShake(.35),se.fanfare())}lanePower(t,e,n){let s=0;for(const r of this.units)r.dead||r.side!==t||r.lane!==e||n==="own"&&(t===0?r.x>0:r.x<0)||(s+=r.st.dmg/r.st.rate+r.hp*.06);return s}laneMajorityKind(t,e){const n={};for(const a of this.units)!a.dead&&a.side===t&&a.lane===e&&(n[a.kind]=(n[a.kind]||0)+1);let s=null,r=0;for(const a of Object.keys(n))n[a]>r&&(r=n[a],s=a);return s}update(t,e){const n=t*this.speed;this.over||(this.time+=n);for(const s of[0,1]){if(this.over)break;let r=I0*this.incomeMul[s];for(const a of this.slots[s])a.kind==="gerador"&&(r+=D0*a.lvl);this.gold[s]+=r*n,this.specCd[s]=Math.max(0,this.specCd[s]-n),this.spawnCd[s]=Math.max(0,this.spawnCd[s]-n)}for(const s of this.units){if(s.dead){_l(s.anim,n,e);continue}s.cd=Math.max(0,s.cd-n),s.stun=Math.max(0,s.stun-n);const r=s.side===0?1:-1,a=this.wallInFront(s),o=a?null:this.nearestFoe(s),l=s.st.range;if(s.stun>0)ti(s.anim,"idle");else if(a!=null)s.cd<=0&&this.strike(s,()=>this.damageWall(s,a));else if(r>0?s.x>=El:s.x<=-El)s.cd<=0&&this.strike(s,()=>this.damageBase(s));else if(o&&Math.abs(o.x-s.x)<=l)s.cd<=0&&this.strike(s,()=>this.damageUnit(s,o));else{const c=this.allyAhead(s),h=c!=null?c-26*r:r*1e9,f=s.x+r*s.st.speed*n;(r>0?f<h:f>h)?(s.x=f,ti(s.anim,"walk"),Math.random()<n*2.2&&this.fx.dust(s.x-r*8,ke[s.lane])):ti(s.anim,"idle")}s.anim.rig.group.position.x=s.x,_l(s.anim,n,e)}for(let s=this.units.length-1;s>=0;s--){const r=this.units[s];r.anim.gone&&(this.scene.remove(r.anim.rig.group),this.units.splice(s,1))}for(const s of[0,1])this.slots[s].forEach((r,a)=>{if(r.mesh){r.spawnT+=n;const h=Math.min(1,r.spawnT/.4);r.mesh.scale.setScalar(.4+.6*(1+Math.sin(Math.min(1,h)*Math.PI*.5)*0)*h+(h<1?Math.sin(h*Math.PI)*.18:0));const f=r.mesh.getObjectByName("gear");f&&(f.rotation.z+=n*2.4)}if(r.kind!=="torreta"||(r.cd-=n,r.cd>0))return;const o=(s===0?this.slotPos.mine:this.slotPos.foe)[a];let l=null,c=Wr.range*(r.lvl===2?1.15:1);for(const h of this.units){if(h.dead||h.side===s||h.lane!==a)continue;const f=Math.abs(h.x-o.x);f<c&&(c=f,l=h)}l&&(r.cd=Wr.rate,this.shootArrow(s,a,o.x,l,Wr.dmg*(r.lvl===2?1.7:1)),se.twang())});for(let s=this.projs.length-1;s>=0;s--){const r=this.projs[s];if(r.t+=n,r.vy-=300*n,r.x+=r.vx*n,r.y+=r.vy*n,r.m.position.set(r.x,r.y,r.z),r.kind==="flecha"&&(r.m.rotation.z=Math.atan2(r.vy,r.vx)),r.y<=6){this.fx.puff(r.x,4,r.z,r.kind==="gude"?12577013:14206112,6,3),r.kind!=="flecha"&&(this.fx.sparks(r.x,8,r.z,16766826,8),this.onShake(.18),se.thud());for(const a of this.units)a.dead||a.side===r.side||a.lane!==r.lane||Math.abs(a.x-r.x)<=r.radius&&this.applyDamage(a,r.dmg,r.side);this.scene.remove(r.m),this.projs.splice(s,1)}}this.marbleUpdate(n)}strike(t,e){t.cd=t.st.rate,t.anim.onStrike=()=>{e(),t.anim.onStrike=null},ti(t.anim,t.st.ranged?"shoot":"melee"),t.anim.t=0,t.anim.struck=!1}nearestFoe(t){let e=null,n=1e9;for(const s of this.units){if(s.dead||s.side===t.side||s.lane!==t.lane)continue;const r=(s.x-t.x)*(t.side===0?1:-1);r>-12&&r<n&&(n=r,e=s)}return e}allyAhead(t){let e=null;for(const n of this.units){if(n.dead||n===t||n.side!==t.side||n.lane!==t.lane)continue;const s=(n.x-t.x)*(t.side===0?1:-1);s>0&&s<30&&(e==null||Math.abs(n.x-t.x)<Math.abs(e-t.x))&&(e=n.x)}return e}wallInFront(t){const e=t.side===0?1:0,n=this.slots[e][t.lane];if(!n.kind||n.kind!=="muralha"||n.wallHp<=0)return null;const r=((e===0?this.slotPos.mine:this.slotPos.foe)[t.lane].x-t.x)*(t.side===0?1:-1);return r>0&&r<=t.st.range+6?t.lane:null}damageWall(t,e){const n=t.side===0?1:0,s=this.slots[n][e];s.wallHp-=t.st.dmg,s.mesh&&(this.fx.puff(s.mesh.position.x,16,s.mesh.position.z,13149288,4,3),s.mesh.rotation.y=(Math.random()-.5)*.05,se.tok(),s.wallHp<=0&&(this.fx.puff(s.mesh.position.x,14,s.mesh.position.z,13149288,14,5),this.onShake(.3),se.crumble(),this.scene.remove(s.mesh),s.mesh=null,s.kind=null,s.lvl=0))}damageUnit(t,e){if(t.st.ranged){this.shootArrow(t.side,t.lane,t.x,e,t.st.dmg*vl(t.kind,e.kind)),se.twang();return}this.applyDamage(e,t.st.dmg*vl(t.kind,e.kind),t.side),this.fx.hitStar((t.x+e.x)/2,26,ke[t.lane]),se[t.kind==="tanque"?"thud":"tok"]()}shootArrow(t,e,n,s,r){const a=new rt(new Yt(.9,.9,14,6),ln(10119742)),o=new rt(new en(1.6,4,6),Qt(12104356,.35));o.position.y=9,a.add(o),a.rotation.z=-Math.PI/2,this.scene.add(a);const l=s.x-n,c=Math.max(.28,Math.abs(l)/260),h=l/c,f=-16/c+.5*300*c;a.position.set(n,34,ke[e]),this.projs.push({m:a,x:n,y:34,z:ke[e],vx:h,vy:f,side:t,lane:e,dmg:r,radius:16,t:0,kind:"flecha"})}applyDamage(t,e,n){t.dead||(t.hp-=e,ml(t.anim),t.anim.rig.hp.root.visible=!0,t.anim.rig.hp.fill.scale.x=Math.max(.02,t.hp/t.st.hp),t.hp<=0&&(t.dead=!0,w0(t.anim),this.fx.puff(t.x,12,ke[t.lane],16116952,9,4),this.fx.coins(t.x,10,ke[t.lane],Math.min(6,2+t.st.reward/8)),se.boing(),this.gold[n]+=t.st.reward,this.xp[n]+=t.st.xp))}damageBase(t){const e=t.side===0?1:0;this.baseHp[e]-=t.st.dmg*t.st.vsBase,this.fx.sparks(t.x+(t.side===0?30:-30),30,ke[t.lane],16758858,5),this.onShake(.12),se.thud(),this.baseHp[e]<=0&&!this.over&&(this.over=!0,this.winner=t.side,this.fx.confetti(t.side===0?bi-60:-bi+60,0),this.onShake(.8),se.fanfare(),this.onOver(this.winner))}marbleUpdate(t){const e=this.marble;if(!this.over){if(e.state==="idle"){if(e.next-=t,e.next<=0){e.state="warn",e.t=0,e.lane=Math.random()*3|0,e.dir=Math.random()<.5?1:-1;const n=new rt(new nn(ei.matHalfL*2-60,52),new cn({color:16734794,transparent:!0,opacity:0,depthWrite:!1}));n.rotation.x=-Math.PI/2,n.position.set(0,1.2,ke[e.lane]),n.renderOrder=2,this.scene.add(n),e.warn=n,this.toast("🔴 GUDE GIGANTE vindo na faixa "+(e.lane+1)+"!","warn"),se.rumble()}}else if(e.state==="warn"){if(e.t+=t,e.warn&&(e.warn.material.opacity=.16+Math.sin(e.t*10)*.12),e.t>2){e.warn&&(this.scene.remove(e.warn),e.warn=null),e.state="roll",e.t=0,e.x=e.dir>0?-432:ei.matHalfL+40;const n=new pc({color:10149109,roughness:.05,transmission:.5,thickness:6,clearcoat:1}),s=new rt(new Xe(24,24,18),n),r=new rt(new Un(10,4,10,22),Qt(15241136,.2));r.rotation.x=1,s.add(r),s.castShadow=!0,this.scene.add(s),e.m=s}}else if(e.state==="roll"){e.x+=e.dir*300*t,e.m&&(e.m.position.set(e.x,24,ke[e.lane]),e.m.rotation.z-=e.dir*t*300/24),this.onShake(.16);const n=70+Math.min(90,this.time*.35);for(const s of this.units)s.dead||s.lane!==e.lane||Math.abs(s.x-e.x)<30&&this.applyDamage(s,n,s.side===0?1:0);Math.abs(e.x)>ei.matHalfL+60&&(e.m&&this.scene.remove(e.m),e.m=null,e.state="idle",e.next=Math.max(22,48-this.time*.08)+Math.random()*18)}}}}const bl={facil:{think:2.1,income:.82,noise:.35,reserve:0},medio:{think:1.35,income:1,noise:.16,reserve:16},dificil:{think:.9,income:1.14,noise:.06,reserve:26}},z0={arco:"espada",tanque:"arco",espada:"tanque",veloz:"espada"};class k0{constructor(t,e){Bt(this,"t",0);Bt(this,"waveSaving",!1);this.g=t,this.diff=e,t.incomeMul[1]=bl[e].income}update(t){if(this.g.over||(this.t-=t,this.t>0))return;const e=bl[this.diff];if(this.t=e.think*(1+(Math.random()-.5)*.4),Math.random()<e.noise)return;const n=this.g;if(n.canEvolve(1)&&(this.diff!=="facil"||Math.random()<.4)){n.evolve(1,Math.random()<.5?"pirata":"robo");return}const s=[0,0,0],r=[-1e9,-1e9,-1e9];for(const d of n.units){if(d.dead||d.side!==0)continue;const p=Math.max(0,d.x+60)/320;s[d.lane]+=(d.st.dmg/d.st.rate+d.hp*.05)*(.5+p*2.4),r[d.lane]=Math.max(r[d.lane],d.x)}for(let d=0;d<3;d++)s[d]-=n.lanePower(1,d)*.8;let a=0;for(let d=1;d<3;d++)s[d]>s[a]&&(a=d);if(r[a]>40&&s[a]>0){if(s[a]>30&&n.canSpecial(1)){n.useSpecial(1);return}const d=n.slots[1][a];if(!d.kind&&n.gold[1]>=xe.muralha.cost){n.build(1,a,"muralha");return}if(d.kind==="muralha"&&d.lvl===1&&d.wallHp<140&&n.gold[1]>=xe.muralha.up){n.upgrade(1,a);return}if(n.canBuy(1,"arco")){n.buy(1,"arco",a);return}const p=n.laneMajorityKind(0,a),g=p?z0[p]:"espada";if(r[a]>150&&n.canBuy(1,g)){n.buy(1,g,a);return}return}if(s[a]>12){if(!n.slots[1][a].kind&&n.gold[1]>=xe.torreta.cost){n.build(1,a,"torreta");return}if(n.canBuy(1,"arco")){n.buy(1,"arco",a);return}}const o=n.slots[1].findIndex(d=>!d.kind);if(n.slots[1].filter(d=>d.kind==="gerador").length<(this.diff==="dificil"?2:1)&&o>=0&&n.gold[1]>xe.gerador.cost+26){n.build(1,o,"gerador");return}if(o>=0&&!n.slots[1][a].kind&&s[a]>2&&n.gold[1]>xe.torreta.cost+e.reserve){n.build(1,a,"torreta");return}if(n.gold[1]>190){const d=n.slots[1].findIndex(p=>p.kind&&p.lvl===1);if(d>=0&&n.upgrade(1,d))return}let c=0,h=-1e9;for(let d=0;d<3;d++){const p=n.lanePower(1,d)-n.lanePower(0,d);p>h&&(h=p,c=d)}const f=this.diff==="dificil"?115:95;if(this.waveSaving){n.gold[1]>=f&&(n.buy(1,"tanque",c),n.canBuy(1,"arco")&&n.buy(1,"arco",c),this.waveSaving=!1);return}if(Math.random()<.35){this.waveSaving=!0;return}if(n.gold[1]>30+e.reserve){const d=Math.random()<.3?"arco":Math.random()<.25?"veloz":"espada";n.canBuy(1,d)&&n.buy(1,d,c)}}}class H0{constructor(t){Bt(this,"group",new re);Bt(this,"parts",[]);Bt(this,"free",[]);Bt(this,"starTex");t.add(this.group);const e=document.createElement("canvas");e.width=e.height=64;const n=e.getContext("2d");n.fillStyle="#fff",n.beginPath();for(let s=0;s<10;s++){const r=s/10*Math.PI*2-Math.PI/2,a=s%2?12:30;n.lineTo(32+Math.cos(r)*a,32+Math.sin(r)*a)}n.closePath(),n.fill(),this.starTex=new Qa(e)}take(){let t=this.free.pop();return t||(t=new rt(new Xe(1,8,6),new cn({transparent:!0,depthWrite:!1})),t.renderOrder=6),t.material.map=null,t.visible=!0,t.scale.setScalar(1),t.rotation.set(0,0,0),this.group.add(t),t}emit(t,e,n,s,r,a,o,l,c,h=160,f=0,d=0,p=!1){const g=this.take(),x=g.material;x.color.set(s),x.opacity=1,p&&(x.map=this.starTex),g.scale.setScalar(r),g.position.set(t,e,n),this.parts.push({m:g,vx:a,vy:o,vz:l,t:0,life:c,spin:d,grav:h,grow:f})}puff(t,e,n,s=16116952,r=7,a=4){for(let o=0;o<r;o++){const l=Math.random()*6.28;this.emit(t,e+Math.random()*4,n,s,a*(.7+Math.random()*.7),Math.cos(l)*(14+Math.random()*26),26+Math.random()*30,Math.sin(l)*(14+Math.random()*20),.55+Math.random()*.3,40,6)}}sparks(t,e,n,s=16766826,r=6){for(let a=0;a<r;a++){const o=Math.random()*6.28;this.emit(t,e,n,s,1.6+Math.random()*1.6,Math.cos(o)*(46+Math.random()*60),40+Math.random()*60,Math.sin(o)*40,.32+Math.random()*.2,300)}}hitStar(t,e,n){const s=this.take(),r=s.material;r.color.set(16773824),r.opacity=1,r.map=null,s.position.set(t,e,n),this.parts.push({m:s,vx:0,vy:6,vz:0,t:0,life:.22,spin:6,grav:0,grow:46})}coins(t,e,n,s=4){for(let r=0;r<s;r++)this.emit(t,e+6,n,15905085,2.6,(Math.random()-.5)*46,78+Math.random()*46,(Math.random()-.5)*30,.62,260,0,9)}confetti(t,e){const n=[16738954,6991948,5937896,15905085,10514152,5560536];for(let s=0;s<90;s++)this.emit(t+(Math.random()-.5)*240,150+Math.random()*120,e+(Math.random()-.5)*160,n[s%n.length],2.6+Math.random()*2,(Math.random()-.5)*40,-20-Math.random()*30,(Math.random()-.5)*40,2.6+Math.random()*1.2,26,0,4+Math.random()*6)}dust(t,e,n=3){for(let s=0;s<n;s++)this.emit(t-6+Math.random()*4,2,e+(Math.random()-.5)*10,14206112,2+Math.random()*2,-14-Math.random()*12,10+Math.random()*10,(Math.random()-.5)*12,.4,30,5)}update(t){for(let e=this.parts.length-1;e>=0;e--){const n=this.parts[e];if(n.t+=t,n.t>=n.life){n.m.visible=!1,this.group.remove(n.m),this.free.push(n.m),this.parts.splice(e,1);continue}n.vy-=n.grav*t,n.m.position.x+=n.vx*t,n.m.position.y+=n.vy*t,n.m.position.z+=n.vz*t,n.m.position.y<1.5&&(n.m.position.y=1.5,n.vy*=-.35,n.vx*=.7);const s=n.t/n.life;n.m.material.opacity=1-s*s,n.grow&&n.m.scale.addScalar(n.grow*t),n.spin&&(n.m.rotation.z+=n.spin*t,n.m.rotation.x+=n.spin*.6*t)}}}const G0=`
  #ui { font-family: -apple-system,'Segoe UI',Roboto,sans-serif; color:#3a2c14; }
  .hit { pointer-events:auto; }
  /* topo */
  .top { position:absolute; top:max(8px,env(safe-area-inset-top)); left:10px; right:10px; display:flex; gap:8px; align-items:flex-start; }
  .plq { background:linear-gradient(180deg,#f5e2b8,#e0bd82); border:2px solid #a87c3e; border-radius:12px;
         padding:5px 12px; font-weight:800; font-size:15px; box-shadow:0 3px 0 #8a6230, 0 6px 14px rgba(40,20,5,.3); }
  .plq small { font-weight:700; opacity:.75; font-size:11px; }
  .xpwrap { flex:1; max-width:300px; }
  .xpbar { height:12px; background:#5c4a2c; border-radius:8px; border:2px solid #a87c3e; overflow:hidden; box-shadow:0 3px 0 #8a6230; }
  .xpbar i { display:block; height:100%; width:0%; background:linear-gradient(90deg,#7ec8ff,#4a9ae8); border-radius:6px; transition:width .3s; }
  .xplab { font-size:11px; font-weight:800; color:#fff; text-shadow:0 1px 2px rgba(0,0,0,.5); margin-top:2px; }
  .evolve { display:none; margin-top:4px; background:linear-gradient(180deg,#8af0a0,#3fae6a); color:#0c3a1c; border:2px solid #2c7a44;
            border-radius:12px; padding:6px 14px; font-weight:900; font-size:14px; box-shadow:0 3px 0 #205c32; cursor:pointer;
            animation:pulse 1s infinite; }
  @keyframes pulse { 50% { transform:scale(1.06); } }
  .basebars { position:absolute; top:max(8px,env(safe-area-inset-top)); left:50%; transform:translateX(-50%); display:flex; gap:14px; }
  .bb { width:120px; } .bb .lab { font-size:10px; font-weight:800; color:#fff; text-shadow:0 1px 2px rgba(0,0,0,.5); text-align:center; }
  .bb .bar { height:10px; background:rgba(20,14,8,.55); border-radius:6px; overflow:hidden; border:1.5px solid rgba(255,255,255,.35); }
  .bb .bar i { display:block; height:100%; border-radius:5px; transition:width .25s; }
  .rgt { margin-left:auto; display:flex; gap:8px; }
  .icobtn { width:38px; height:38px; border-radius:12px; background:linear-gradient(180deg,#f5e2b8,#e0bd82); border:2px solid #a87c3e;
            box-shadow:0 3px 0 #8a6230; font-size:18px; display:flex; align-items:center; justify-content:center; cursor:pointer; }
  /* cartas de tropa */
  .deck { position:absolute; bottom:max(10px,env(safe-area-inset-bottom)); left:50%; transform:translateX(-50%);
          display:flex; gap:10px; align-items:flex-end; }
  .card { width:74px; border-radius:14px; background:linear-gradient(180deg,#fdf6e4,#ecd9ae); border:2.5px solid #a87c3e;
          box-shadow:0 4px 0 #8a6230, 0 8px 18px rgba(40,20,5,.35); padding:6px 4px 5px; text-align:center; cursor:pointer;
          transition:transform .12s; position:relative; }
  .card .ico { font-size:26px; line-height:1; }
  .card .nm { font-size:10.5px; font-weight:900; margin-top:2px; }
  .card .tip { font-size:8.5px; color:#7a5c2e; font-weight:700; }
  .card .cost { position:absolute; top:-9px; right:-7px; background:#ffd76a; border:2px solid #a87c3e; border-radius:10px;
                font-size:11px; font-weight:900; padding:1px 6px; box-shadow:0 2px 0 #8a6230; }
  .card.poor { filter:grayscale(.75) brightness(.8); }
  .card.sel { transform:translateY(-10px) scale(1.08); outline:3px solid #8af0a0; }
  /* especial */
  .spec { position:absolute; right:14px; bottom:max(74px,calc(env(safe-area-inset-bottom) + 64px)); width:74px; height:74px;
          border-radius:50%; background:radial-gradient(circle at 32% 28%, #ffb84a, #e8641e); border:3px solid #a83c10;
          box-shadow:0 5px 0 #7c2c0c, 0 10px 20px rgba(40,10,0,.4); font-size:30px; display:flex; align-items:center;
          justify-content:center; cursor:pointer; position:absolute; }
  .spec .cd { position:absolute; inset:-3px; border-radius:50%; background:conic-gradient(rgba(20,10,4,.72) var(--p), transparent 0); }
  .spec .lab { position:absolute; bottom:-18px; width:120px; left:50%; transform:translateX(-50%); font-size:10px; font-weight:800;
               color:#fff; text-shadow:0 1px 3px rgba(0,0,0,.6); text-align:center; }
  /* slots */
  .slots { position:absolute; left:12px; bottom:max(74px,calc(env(safe-area-inset-bottom) + 64px)); display:flex; flex-direction:column; gap:6px; }
  .slot { display:flex; align-items:center; gap:6px; }
  .slot button { min-width:44px; height:40px; border-radius:11px; background:linear-gradient(180deg,#f5e2b8,#e0bd82);
                 border:2px solid #a87c3e; box-shadow:0 3px 0 #8a6230; font-size:16px; font-weight:900; cursor:pointer; padding:0 8px; }
  .slot .lane { font-size:11px; font-weight:900; color:#fff; text-shadow:0 1px 2px rgba(0,0,0,.5); width:44px; }
  .pop { position:absolute; display:none; background:#fdf6e4; border:2.5px solid #a87c3e; border-radius:14px; padding:8px;
         box-shadow:0 8px 24px rgba(40,20,5,.45); z-index:10; }
  .pop button { display:flex; width:170px; align-items:center; gap:8px; background:linear-gradient(180deg,#fff,#f0e2c0);
                border:2px solid #c8a468; border-radius:10px; padding:6px 8px; margin:4px 0; font-weight:800; font-size:13px; cursor:pointer; }
  .pop button small { margin-left:auto; background:#ffd76a; border-radius:8px; padding:1px 6px; font-weight:900; }
  /* faixas clicáveis */
  .lanes { position:absolute; inset:0; display:none; }
  .lanes div { position:absolute; left:8%; width:84%; height:64px; border-radius:18px; border:3px dashed rgba(255,255,255,.85);
               background:rgba(140,230,150,.16); cursor:pointer; display:flex; align-items:center; padding-left:14px;
               font-weight:900; color:#fff; text-shadow:0 1px 3px rgba(0,0,0,.6); }
  .lanes div:hover { background:rgba(140,230,150,.3); }
  /* toasts */
  .toasts { position:absolute; top:22%; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; gap:6px; align-items:center; }
  .toast { background:rgba(30,20,8,.82); color:#ffe9c0; font-weight:800; font-size:14px; border-radius:12px; padding:7px 16px;
           opacity:0; transition:opacity .25s, transform .25s; transform:translateY(-6px); }
  .toast.show { opacity:1; transform:none; }
  .toast.warn { background:rgba(160,40,20,.9); color:#fff; }
  /* modais */
  .modal { position:absolute; inset:0; background:rgba(30,18,8,.55); display:flex; align-items:center; justify-content:center; z-index:20; }
  .box { background:linear-gradient(180deg,#fdf6e4,#f0dcae); border:3px solid #a87c3e; border-radius:22px; padding:22px 24px;
         max-width:min(92vw,560px); text-align:center; box-shadow:0 14px 40px rgba(20,10,0,.5); }
  .box h1 { font-size:26px; margin-bottom:4px; } .box h2 { font-size:20px; margin-bottom:8px; }
  .box p { font-size:13.5px; color:#6a5030; line-height:1.45; }
  .facrow { display:flex; gap:12px; margin:14px 0 6px; }
  .fac { flex:1; background:linear-gradient(180deg,#fff,#f0e2c0); border:2.5px solid #c8a468; border-radius:16px; padding:12px 8px;
         cursor:pointer; transition:transform .12s; }
  .fac:hover { transform:scale(1.04); border-color:#3fae6a; }
  .fac .big { font-size:34px; } .fac b { display:block; font-size:15px; margin:4px 0 2px; } .fac span { font-size:11px; color:#7a5c2e; }
  .bigbtn { background:linear-gradient(180deg,#8af0a0,#3fae6a); color:#0c3a1c; border:2.5px solid #2c7a44; border-radius:14px;
            padding:10px 26px; font-weight:900; font-size:17px; box-shadow:0 4px 0 #205c32; cursor:pointer; margin-top:12px; }
  .diffrow { display:flex; gap:10px; justify-content:center; margin-top:12px; }
  .diff { background:linear-gradient(180deg,#fff,#f0e2c0); border:2.5px solid #c8a468; border-radius:12px; padding:8px 16px;
          font-weight:900; cursor:pointer; font-size:14px; }
  .diff.sel { border-color:#3fae6a; background:linear-gradient(180deg,#d8ffe0,#a8e8b8); }
`;class V0{constructor(){Bt(this,"root",document.getElementById("ui"));Bt(this,"onPickLane",null);Bt(this,"onBuild",null);Bt(this,"onUpgrade",null);Bt(this,"onSpecial",null);Bt(this,"onEvolve",null);Bt(this,"onStart",null);Bt(this,"onRestart",null);Bt(this,"sel",null);Bt(this,"els",{});const t=document.createElement("style");t.textContent=G0,document.head.appendChild(t)}el(t){const e=document.createElement("div");return e.innerHTML=t.trim(),e.firstElementChild}showStart(){this.root.innerHTML="";let t="medio";const e=this.el(`<div class="modal hit"><div class="box">
      <h1>🧸 Batalha de Brinquedos</h1>
      <p>O quarto virou campo de batalha! Treine seus bonequinhos, escolha a FAIXA da mesa onde eles marcham,
      construa módulos na base (torreta, gerador, muralha) e junte XP pra <b>evoluir de era</b>:
      Piratas de Plástico ou Robôs de Corda? E cuidado com a <b>gude gigante</b> que atravessa a mesa!</p>
      <div class="diffrow">
        <button class="diff" data-d="facil">😊 Fácil</button>
        <button class="diff sel" data-d="medio">🙂 Médio</button>
        <button class="diff" data-d="dificil">😈 Difícil</button>
      </div>
      <button class="bigbtn" id="go">▶ BRINCAR</button>
    </div></div>`);e.querySelectorAll(".diff").forEach(n=>n.addEventListener("click",()=>{e.querySelectorAll(".diff").forEach(s=>s.classList.remove("sel")),n.classList.add("sel"),t=n.dataset.d,se.ui()})),e.querySelector("#go").addEventListener("click",()=>{var n;se.ui(),this.root.innerHTML="",(n=this.onStart)==null||n.call(this,t)}),this.root.appendChild(e)}showHUD(t){this.root.innerHTML=`
      <div class="top">
        <div class="plq hit">🪙 <span id="gold">0</span></div>
        <div class="xpwrap">
          <div class="xpbar"><i id="xpf"></i></div>
          <div class="xplab" id="xplab">Madeirinhas</div>
          <button class="evolve hit" id="evolve">⭐ EVOLUIR!</button>
        </div>
        <div class="rgt">
          <button class="icobtn hit" id="mute">🔊</button>
        </div>
      </div>
      <div class="basebars">
        <div class="bb"><div class="lab">SUA BASE</div><div class="bar"><i id="hpMine" style="background:linear-gradient(90deg,#8af0a0,#3fae6a);width:100%"></i></div></div>
        <div class="bb"><div class="lab">INIMIGO</div><div class="bar"><i id="hpFoe" style="background:linear-gradient(90deg,#ff9a7a,#e8503a);width:100%"></i></div></div>
      </div>
      <div class="deck" id="deck"></div>
      <button class="spec hit" id="spec"><span id="specIco">🔮</span><div class="cd" id="specCd" style="--p:0deg"></div><div class="lab" id="specLab"></div></button>
      <div class="slots" id="slots"></div>
      <div class="pop hit" id="pop"></div>
      <div class="lanes" id="lanes">
        <div data-l="0">Faixa 1 ⬅ solta aqui</div><div data-l="1">Faixa 2</div><div data-l="2">Faixa 3</div>
      </div>
      <div class="toasts" id="toasts"></div>`,this.els={};for(const r of["gold","xpf","xplab","evolve","hpMine","hpFoe","deck","spec","specIco","specCd","specLab","slots","pop","lanes","toasts","mute"])this.els[r]=this.root.querySelector("#"+r);this.buildDeck(t),this.buildSlots(t),this.els.evolve.addEventListener("click",()=>this.showEvolve()),this.els.spec.addEventListener("click",()=>{var r;(r=this.onSpecial)==null||r.call(this)}),this.els.mute.addEventListener("click",()=>{N0(!za.muted),this.els.mute.textContent=za.muted?"🔇":"🔊",se.ui()});const e=this.els.lanes;e.querySelectorAll("div").forEach(r=>r.addEventListener("pointerdown",a=>{var o;a.stopPropagation(),this.sel!=null&&((o=this.onPickLane)==null||o.call(this,this.sel,+r.dataset.l)),this.deselect()}));const n=e.querySelectorAll("div"),s=()=>{const r=innerHeight;n[0].style.top=r*.3-32+"px",n[1].style.top=r*.46-32+"px",n[2].style.top=r*.62-32+"px"};s(),addEventListener("resize",s)}buildDeck(t){const e=this.els.deck;e.innerHTML="",["espada","arco","tanque","veloz"].forEach(n=>{const s=L0[n],r=this.el(`<div class="card hit" data-k="${n}">
        <div class="cost" data-cost>?</div>
        <div class="ico">${s.ico}</div><div class="nm">${s.name}</div><div class="tip">${s.tip}</div></div>`);r.addEventListener("pointerdown",a=>{if(a.stopPropagation(),this.sel===n){this.deselect();return}this.sel=n,se.ui(),e.querySelectorAll(".card").forEach(o=>o.classList.remove("sel")),r.classList.add("sel"),this.els.lanes.style.display="block"}),e.appendChild(r)})}buildSlots(t){const e=this.els.slots;e.innerHTML="";for(let n=0;n<3;n++){const s=this.el(`<div class="slot"><span class="lane">Faixa ${n+1}</span><button class="hit" data-i="${n}">＋</button></div>`),r=s.querySelector("button");r.addEventListener("click",a=>{a.stopPropagation(),this.openPop(t,n,r)}),e.appendChild(s)}document.addEventListener("pointerdown",()=>{this.els.pop.style.display="none"})}openPop(t,e,n){se.ui();const s=this.els.pop,r=t.slots[0][e];r.kind?r.lvl===1?(s.innerHTML=`<button data-up>⬆️ Melhorar ${xe[r.kind].name} <small>🪙${xe[r.kind].up}</small></button>`,s.querySelector("button").addEventListener("pointerdown",o=>{var l;o.stopPropagation(),(l=this.onUpgrade)==null||l.call(this,e),s.style.display="none"})):s.innerHTML=`<button disabled style="opacity:.6">${xe[r.kind].ico} ${xe[r.kind].name} nível MÁXIMO ⭐</button>`:(s.innerHTML=Object.keys(xe).map(o=>`<button data-k="${o}">${xe[o].ico} ${xe[o].name} <em style="font-size:10px;font-style:normal;color:#8a6a34">${xe[o].tip}</em><small>🪙${xe[o].cost}</small></button>`).join(""),s.querySelectorAll("button").forEach(o=>o.addEventListener("pointerdown",l=>{var c;l.stopPropagation(),(c=this.onBuild)==null||c.call(this,e,o.dataset.k),s.style.display="none"})));const a=n.getBoundingClientRect();s.style.left=a.right+8+"px",s.style.top=Math.max(8,a.top-40)+"px",s.style.display="block"}deselect(){var t;this.sel=null,this.els.lanes.style.display="none",(t=this.els.deck)==null||t.querySelectorAll(".card").forEach(e=>e.classList.remove("sel"))}refresh(t){if(!this.els.gold)return;this.els.gold.textContent=String(Math.floor(t.gold[0]));const e=t.faction[0];this.els.xplab.textContent=`${Vr[e].name} · XP ${Math.min(t.xp[0],Hs)}/${Hs}`,this.els.xpf.style.width=Math.min(100,t.xp[0]/Hs*100)+"%",this.els.evolve.style.display=t.canEvolve(0)?"inline-block":"none",this.els.hpMine.style.width=Math.max(0,t.baseHp[0]/Ks*100)+"%",this.els.hpFoe.style.width=Math.max(0,t.baseHp[1]/Ks*100)+"%",this.els.deck.querySelectorAll(".card").forEach(r=>{const a=r.dataset.k,o=ks(a,e);r.querySelector("[data-cost]").textContent="🪙"+o.cost,r.classList.toggle("poor",t.gold[0]<o.cost)}),this.els.slots.querySelectorAll("button").forEach((r,a)=>{const o=t.slots[0][a];r.textContent=o.kind?`${xe[o.kind].ico}${o.lvl===2?"⭐":""}`:"＋"});const n=U0[e];this.els.specIco.textContent=n.ico,this.els.specLab.textContent=n.name;const s=t.specCd[0]/gc;this.els.specCd.style.setProperty("--p",s*360+"deg")}toast(t,e=""){if(!this.els.toasts)return;const n=this.el(`<div class="toast ${e}">${t}</div>`);this.els.toasts.appendChild(n),requestAnimationFrame(()=>n.classList.add("show")),setTimeout(()=>{n.classList.remove("show"),setTimeout(()=>n.remove(),300)},2100)}showEvolve(){se.ui();const t=this.el(`<div class="modal hit"><div class="box">
      <h2>⭐ Hora de EVOLUIR!</h2>
      <p>Seus bonequinhos de madeira estão prontos pra virar outra coisa. Escolha com carinho — vale a partida toda!</p>
      <div class="facrow">
        <div class="fac" data-f="pirata"><div class="big">🏴‍☠️</div><b>Piratas de Plástico</b><span>${Vr.pirata.desc}</span><br><span>especial: 💣 Canhonada</span></div>
        <div class="fac" data-f="robo"><div class="big">🤖</div><b>Robôs de Corda</b><span>${Vr.robo.desc}</span><br><span>especial: 🧲 Ímã Gigante</span></div>
      </div>
    </div></div>`);t.querySelectorAll(".fac").forEach(e=>e.addEventListener("click",()=>{var n;(n=this.onEvolve)==null||n.call(this,e.dataset.f),t.remove()})),this.root.appendChild(t)}showEnd(t){const e=this.el(`<div class="modal hit"><div class="box">
      <h1>${t?"🏆 VITÓRIA!":"💔 Derrota…"}</h1>
      <p>${t?"A base inimiga virou um monte de pecinhas! O quarto é seu.":"Sua base desmontou… mas brinquedo bom volta pra caixa e tenta de novo!"}</p>
      <button class="bigbtn" id="again">↻ Jogar de novo</button>
    </div></div>`);e.querySelector("#again").addEventListener("click",()=>{var n;e.remove(),(n=this.onRestart)==null||n.call(this)}),this.root.appendChild(e)}}const W0=document.getElementById("app"),xc=p0(W0),Mn=m0(),ni=new g0,Zs=M0(Mn),Mc=new H0(Mn),Pe=new V0;let ie=null,Vs=null,Xr=!1;function Sc(i){if(ie){for(const t of ie.units)Mn.remove(t.anim.rig.group);for(const t of[0,1])for(const e of ie.slots[t])e.mesh&&Mn.remove(e.mesh);ie.marble.m&&Mn.remove(ie.marble.m),ie.marble.warn&&Mn.remove(ie.marble.warn)}ie=new B0(Mn,Mc,Zs.slotPos),Vs=new k0(ie,i),Xr=!1,ie.onShake=t=>{ni.shake=Math.max(ni.shake,t)},ie.toast=(t,e)=>Pe.toast(t,e),ie.onOver=t=>{setTimeout(()=>{Xr||(Xr=!0,Pe.showEnd(t===0),t!==0&&se.sad())},1400)},Pe.showHUD(ie),Pe.onPickLane=(t,e)=>{ie.buy(0,t,e)&&se.coin()},Pe.onBuild=(t,e)=>{ie.build(0,t,e)},Pe.onUpgrade=t=>{ie.upgrade(0,t)},Pe.onSpecial=()=>{ie.useSpecial(0)},Pe.onEvolve=t=>{ie.evolve(0,t),Pe.toast(`⭐ Vocês agora são ${t==="pirata"?"PIRATAS DE PLÁSTICO 🏴‍☠️":"ROBÔS DE CORDA 🤖"}!`)},Pe.onRestart=()=>Pe.showStart()}Pe.onStart=i=>{_c(),O0(),Sc(i)};Pe.showStart();addEventListener("pointerdown",()=>_c(),{once:!0});addEventListener("resize",()=>{xc.setSize(innerWidth,innerHeight),ni.resize()});const Tl=new f0;function yc(){const i=Math.min(.05,Tl.getDelta());ni.update(i);const t=Tl.elapsedTime;for(const e of[Zs.baseMeshes.mine,Zs.baseMeshes.foe]){const n=e.getObjectByName("flag");n&&(n.rotation.y=Math.sin(t*3.1+e.position.x)*.35)}ie&&(ie.update(i,ni.camera.quaternion),Vs==null||Vs.update(i*ie.speed),Pe.refresh(ie)),Mc.update(i),xc.render(Mn,ni.camera),requestAnimationFrame(yc)}yc();window.__bdb={scene:Mn,rig:ni,board:Zs,get game(){return ie},newGame:Sc,ui:Pe};
