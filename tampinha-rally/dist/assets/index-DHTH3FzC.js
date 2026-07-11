(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const xc="169",ru=0,el=1,cu=2,zh=1,Gh=2,ni=3,Ai=0,vn=1,Sn=2,wi=0,Yi=1,si=2,tl=3,nl=4,lu=5,Hi=100,hu=101,du=102,uu=103,fu=104,pu=200,mu=201,gu=202,vu=203,yr=204,xr=205,bu=206,yu=207,xu=208,_u=209,Mu=210,Su=211,wu=212,Eu=213,Tu=214,_r=0,Mr=1,Sr=2,Ts=3,wr=4,Er=5,Tr=6,Ar=7,Hh=0,Au=1,Cu=2,Ei=0,Ru=1,Pu=2,Lu=3,Vh=4,ku=5,Du=6,Iu=7,Wh=300,As=301,Cs=302,Cr=303,Rr=304,mo=306,Pr=1e3,$i=1001,Lr=1002,Cn=1003,Nu=1004,va=1005,Nn=1006,Ro=1007,qi=1008,hi=1009,$h=1010,qh=1011,ra=1012,_c=1013,Ki=1014,ai=1015,da=1016,Mc=1017,Sc=1018,Rs=1020,Xh=35902,Yh=1021,jh=1022,On=1023,Kh=1024,Jh=1025,Ss=1026,Ps=1027,Zh=1028,wc=1029,Qh=1030,Ec=1031,Tc=1033,Xa=33776,Ya=33777,ja=33778,Ka=33779,kr=35840,Dr=35841,Ir=35842,Nr=35843,Ur=36196,Fr=37492,Or=37496,Br=37808,zr=37809,Gr=37810,Hr=37811,Vr=37812,Wr=37813,$r=37814,qr=37815,Xr=37816,Yr=37817,jr=37818,Kr=37819,Jr=37820,Zr=37821,Ja=36492,Qr=36494,ec=36495,ed=36283,tc=36284,nc=36285,ic=36286,Uu=3200,Fu=3201,td=0,Ou=1,Mi="",mn="srgb",Ri="srgb-linear",Ac="display-p3",go="display-p3-linear",oo="linear",xt="srgb",ro="rec709",co="p3",ts=7680,il=519,Bu=512,zu=513,Gu=514,nd=515,Hu=516,Vu=517,Wu=518,$u=519,sl=35044,al="300 es",oi=2e3,lo=2001;class ks{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const a=s.indexOf(t);a!==-1&&s.splice(a,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let a=0,o=s.length;a<o;a++)s[a].call(this,e);e.target=null}}}const Kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ol=1234567;const ea=Math.PI/180,ca=180/Math.PI;function Ds(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Kt[n&255]+Kt[n>>8&255]+Kt[n>>16&255]+Kt[n>>24&255]+"-"+Kt[e&255]+Kt[e>>8&255]+"-"+Kt[e>>16&15|64]+Kt[e>>24&255]+"-"+Kt[t&63|128]+Kt[t>>8&255]+"-"+Kt[t>>16&255]+Kt[t>>24&255]+Kt[i&255]+Kt[i>>8&255]+Kt[i>>16&255]+Kt[i>>24&255]).toLowerCase()}function Ft(n,e,t){return Math.max(e,Math.min(t,n))}function Cc(n,e){return(n%e+e)%e}function qu(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function Xu(n,e,t){return n!==e?(t-n)/(e-n):0}function ta(n,e,t){return(1-t)*n+t*e}function Yu(n,e,t,i){return ta(n,e,1-Math.exp(-t*i))}function ju(n,e=1){return e-Math.abs(Cc(n,e*2)-e)}function Ku(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Ju(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function Zu(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Qu(n,e){return n+Math.random()*(e-n)}function ef(n){return n*(.5-Math.random())}function tf(n){n!==void 0&&(ol=n);let e=ol+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function nf(n){return n*ea}function sf(n){return n*ca}function af(n){return(n&n-1)===0&&n!==0}function of(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function rf(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function cf(n,e,t,i,s){const a=Math.cos,o=Math.sin,r=a(t/2),l=o(t/2),c=a((e+i)/2),h=o((e+i)/2),d=a((e-i)/2),u=o((e-i)/2),f=a((i-e)/2),g=o((i-e)/2);switch(s){case"XYX":n.set(r*h,l*d,l*u,r*c);break;case"YZY":n.set(l*u,r*h,l*d,r*c);break;case"ZXZ":n.set(l*d,l*u,r*h,r*c);break;case"XZX":n.set(r*h,l*g,l*f,r*c);break;case"YXY":n.set(l*f,r*h,l*g,r*c);break;case"ZYZ":n.set(l*g,l*f,r*h,r*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ys(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function tn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const ba={DEG2RAD:ea,RAD2DEG:ca,generateUUID:Ds,clamp:Ft,euclideanModulo:Cc,mapLinear:qu,inverseLerp:Xu,lerp:ta,damp:Yu,pingpong:ju,smoothstep:Ku,smootherstep:Ju,randInt:Zu,randFloat:Qu,randFloatSpread:ef,seededRandom:tf,degToRad:nf,radToDeg:sf,isPowerOfTwo:af,ceilPowerOfTwo:of,floorPowerOfTwo:rf,setQuaternionFromProperEuler:cf,normalize:tn,denormalize:ys};class Se{constructor(e=0,t=0){Se.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ft(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),a=this.x-e.x,o=this.y-e.y;return this.x=a*i-o*s+e.x,this.y=a*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class $e{constructor(e,t,i,s,a,o,r,l,c){$e.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,a,o,r,l,c)}set(e,t,i,s,a,o,r,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=r,h[3]=t,h[4]=a,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,a=this.elements,o=i[0],r=i[3],l=i[6],c=i[1],h=i[4],d=i[7],u=i[2],f=i[5],g=i[8],b=s[0],p=s[3],m=s[6],y=s[1],v=s[4],x=s[7],T=s[2],M=s[5],S=s[8];return a[0]=o*b+r*y+l*T,a[3]=o*p+r*v+l*M,a[6]=o*m+r*x+l*S,a[1]=c*b+h*y+d*T,a[4]=c*p+h*v+d*M,a[7]=c*m+h*x+d*S,a[2]=u*b+f*y+g*T,a[5]=u*p+f*v+g*M,a[8]=u*m+f*x+g*S,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],a=e[3],o=e[4],r=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*r*c-i*a*h+i*r*l+s*a*c-s*o*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],a=e[3],o=e[4],r=e[5],l=e[6],c=e[7],h=e[8],d=h*o-r*c,u=r*l-h*a,f=c*a-o*l,g=t*d+i*u+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const b=1/g;return e[0]=d*b,e[1]=(s*c-h*i)*b,e[2]=(r*i-s*o)*b,e[3]=u*b,e[4]=(h*t-s*l)*b,e[5]=(s*a-r*t)*b,e[6]=f*b,e[7]=(i*l-c*t)*b,e[8]=(o*t-i*a)*b,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,a,o,r){const l=Math.cos(a),c=Math.sin(a);return this.set(i*l,i*c,-i*(l*o+c*r)+o+e,-s*c,s*l,-s*(-c*o+l*r)+r+t,0,0,1),this}scale(e,t){return this.premultiply(Po.makeScale(e,t)),this}rotate(e){return this.premultiply(Po.makeRotation(-e)),this}translate(e,t){return this.premultiply(Po.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Po=new $e;function id(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function ho(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function lf(){const n=ho("canvas");return n.style.display="block",n}const rl={};function Za(n){n in rl||(rl[n]=!0,console.warn(n))}function hf(n,e,t){return new Promise(function(i,s){function a(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:i()}}setTimeout(a,t)})}function df(n){const e=n.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function uf(n){const e=n.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const cl=new $e().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),ll=new $e().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ns={[Ri]:{transfer:oo,primaries:ro,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n,fromReference:n=>n},[mn]:{transfer:xt,primaries:ro,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[go]:{transfer:oo,primaries:co,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.applyMatrix3(ll),fromReference:n=>n.applyMatrix3(cl)},[Ac]:{transfer:xt,primaries:co,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.convertSRGBToLinear().applyMatrix3(ll),fromReference:n=>n.applyMatrix3(cl).convertLinearToSRGB()}},ff=new Set([Ri,go]),lt={enabled:!0,_workingColorSpace:Ri,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!ff.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=Ns[e].toReference,s=Ns[t].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return Ns[n].primaries},getTransfer:function(n){return n===Mi?oo:Ns[n].transfer},getLuminanceCoefficients:function(n,e=this._workingColorSpace){return n.fromArray(Ns[e].luminanceCoefficients)}};function ws(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Lo(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ns;class pf{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ns===void 0&&(ns=ho("canvas")),ns.width=e.width,ns.height=e.height;const i=ns.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=ns}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ho("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),a=s.data;for(let o=0;o<a.length;o++)a[o]=ws(a[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(ws(t[i]/255)*255):t[i]=ws(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let mf=0;class sd{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:mf++}),this.uuid=Ds(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let a;if(Array.isArray(s)){a=[];for(let o=0,r=s.length;o<r;o++)s[o].isDataTexture?a.push(ko(s[o].image)):a.push(ko(s[o]))}else a=ko(s);i.url=a}return t||(e.images[this.uuid]=i),i}}function ko(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?pf.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let gf=0;class rn extends ks{constructor(e=rn.DEFAULT_IMAGE,t=rn.DEFAULT_MAPPING,i=$i,s=$i,a=Nn,o=qi,r=On,l=hi,c=rn.DEFAULT_ANISOTROPY,h=Mi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:gf++}),this.uuid=Ds(),this.name="",this.source=new sd(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=a,this.minFilter=o,this.anisotropy=c,this.format=r,this.internalFormat=null,this.type=l,this.offset=new Se(0,0),this.repeat=new Se(1,1),this.center=new Se(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $e,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Wh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Pr:e.x=e.x-Math.floor(e.x);break;case $i:e.x=e.x<0?0:1;break;case Lr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Pr:e.y=e.y-Math.floor(e.y);break;case $i:e.y=e.y<0?0:1;break;case Lr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}rn.DEFAULT_IMAGE=null;rn.DEFAULT_MAPPING=Wh;rn.DEFAULT_ANISOTROPY=1;class Tt{constructor(e=0,t=0,i=0,s=1){Tt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,a=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*a,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*a,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*a,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*a,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,a;const l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],b=l[2],p=l[6],m=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-b)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+b)<.1&&Math.abs(g+p)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(c+1)/2,x=(f+1)/2,T=(m+1)/2,M=(h+u)/4,S=(d+b)/4,C=(g+p)/4;return v>x&&v>T?v<.01?(i=0,s=.707106781,a=.707106781):(i=Math.sqrt(v),s=M/i,a=S/i):x>T?x<.01?(i=.707106781,s=0,a=.707106781):(s=Math.sqrt(x),i=M/s,a=C/s):T<.01?(i=.707106781,s=.707106781,a=0):(a=Math.sqrt(T),i=S/a,s=C/a),this.set(i,s,a,t),this}let y=Math.sqrt((p-g)*(p-g)+(d-b)*(d-b)+(u-h)*(u-h));return Math.abs(y)<.001&&(y=1),this.x=(p-g)/y,this.y=(d-b)/y,this.z=(u-h)/y,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class vf extends ks{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Tt(0,0,e,t),this.scissorTest=!1,this.viewport=new Tt(0,0,e,t);const s={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Nn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const a=new rn(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);a.flipY=!1,a.generateMipmaps=i.generateMipmaps,a.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let r=0;r<o;r++)this.textures[r]=a.clone(),this.textures[r].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,a=this.textures.length;s<a;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,s=e.textures.length;i<s;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new sd(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ji extends vf{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class ad extends rn{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Cn,this.minFilter=Cn,this.wrapR=$i,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class bf extends rn{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Cn,this.minFilter=Cn,this.wrapR=$i,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ua{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,a,o,r){let l=i[s+0],c=i[s+1],h=i[s+2],d=i[s+3];const u=a[o+0],f=a[o+1],g=a[o+2],b=a[o+3];if(r===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d;return}if(r===1){e[t+0]=u,e[t+1]=f,e[t+2]=g,e[t+3]=b;return}if(d!==b||l!==u||c!==f||h!==g){let p=1-r;const m=l*u+c*f+h*g+d*b,y=m>=0?1:-1,v=1-m*m;if(v>Number.EPSILON){const T=Math.sqrt(v),M=Math.atan2(T,m*y);p=Math.sin(p*M)/T,r=Math.sin(r*M)/T}const x=r*y;if(l=l*p+u*x,c=c*p+f*x,h=h*p+g*x,d=d*p+b*x,p===1-r){const T=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=T,c*=T,h*=T,d*=T}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,s,a,o){const r=i[s],l=i[s+1],c=i[s+2],h=i[s+3],d=a[o],u=a[o+1],f=a[o+2],g=a[o+3];return e[t]=r*g+h*d+l*f-c*u,e[t+1]=l*g+h*u+c*d-r*f,e[t+2]=c*g+h*f+r*u-l*d,e[t+3]=h*g-r*d-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,a=e._z,o=e._order,r=Math.cos,l=Math.sin,c=r(i/2),h=r(s/2),d=r(a/2),u=l(i/2),f=l(s/2),g=l(a/2);switch(o){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],a=t[8],o=t[1],r=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=i+r+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(a-c)*f,this._z=(o-s)*f}else if(i>r&&i>d){const f=2*Math.sqrt(1+i-r-d);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(a+c)/f}else if(r>d){const f=2*Math.sqrt(1+r-i-d);this._w=(a-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+d-i-r);this._w=(o-s)/f,this._x=(a+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ft(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,a=e._z,o=e._w,r=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+o*r+s*c-a*l,this._y=s*h+o*l+a*r-i*c,this._z=a*h+o*c+i*l-s*r,this._w=o*h-i*r-s*l-a*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,a=this._z,o=this._w;let r=o*e._w+i*e._x+s*e._y+a*e._z;if(r<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,r=-r):this.copy(e),r>=1)return this._w=o,this._x=i,this._y=s,this._z=a,this;const l=1-r*r;if(l<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*i+t*this._x,this._y=f*s+t*this._y,this._z=f*a+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,r),d=Math.sin((1-t)*h)/c,u=Math.sin(t*h)/c;return this._w=o*d+this._w*u,this._x=i*d+this._x*u,this._y=s*d+this._y*u,this._z=a*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(e=0,t=0,i=0){U.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(hl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(hl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6]*s,this.y=a[1]*t+a[4]*i+a[7]*s,this.z=a[2]*t+a[5]*i+a[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,a=e.elements,o=1/(a[3]*t+a[7]*i+a[11]*s+a[15]);return this.x=(a[0]*t+a[4]*i+a[8]*s+a[12])*o,this.y=(a[1]*t+a[5]*i+a[9]*s+a[13])*o,this.z=(a[2]*t+a[6]*i+a[10]*s+a[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,a=e.x,o=e.y,r=e.z,l=e.w,c=2*(o*s-r*i),h=2*(r*t-a*s),d=2*(a*i-o*t);return this.x=t+l*c+o*d-r*h,this.y=i+l*h+r*c-a*d,this.z=s+l*d+a*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s,this.y=a[1]*t+a[5]*i+a[9]*s,this.z=a[2]*t+a[6]*i+a[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,a=e.z,o=t.x,r=t.y,l=t.z;return this.x=s*l-a*r,this.y=a*o-i*l,this.z=i*r-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Do.copy(this).projectOnVector(e),this.sub(Do)}reflect(e){return this.sub(Do.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ft(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Do=new U,hl=new ua;class fa{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Pn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Pn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Pn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const a=i.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let o=0,r=a.count;o<r;o++)e.isMesh===!0?e.getVertexPosition(o,Pn):Pn.fromBufferAttribute(a,o),Pn.applyMatrix4(e.matrixWorld),this.expandByPoint(Pn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ya.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ya.copy(i.boundingBox)),ya.applyMatrix4(e.matrixWorld),this.union(ya)}const s=e.children;for(let a=0,o=s.length;a<o;a++)this.expandByObject(s[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Pn),Pn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Us),xa.subVectors(this.max,Us),is.subVectors(e.a,Us),ss.subVectors(e.b,Us),as.subVectors(e.c,Us),ui.subVectors(ss,is),fi.subVectors(as,ss),ki.subVectors(is,as);let t=[0,-ui.z,ui.y,0,-fi.z,fi.y,0,-ki.z,ki.y,ui.z,0,-ui.x,fi.z,0,-fi.x,ki.z,0,-ki.x,-ui.y,ui.x,0,-fi.y,fi.x,0,-ki.y,ki.x,0];return!Io(t,is,ss,as,xa)||(t=[1,0,0,0,1,0,0,0,1],!Io(t,is,ss,as,xa))?!1:(_a.crossVectors(ui,fi),t=[_a.x,_a.y,_a.z],Io(t,is,ss,as,xa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Pn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Pn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(jn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const jn=[new U,new U,new U,new U,new U,new U,new U,new U],Pn=new U,ya=new fa,is=new U,ss=new U,as=new U,ui=new U,fi=new U,ki=new U,Us=new U,xa=new U,_a=new U,Di=new U;function Io(n,e,t,i,s){for(let a=0,o=n.length-3;a<=o;a+=3){Di.fromArray(n,a);const r=s.x*Math.abs(Di.x)+s.y*Math.abs(Di.y)+s.z*Math.abs(Di.z),l=e.dot(Di),c=t.dot(Di),h=i.dot(Di);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>r)return!1}return!0}const yf=new fa,Fs=new U,No=new U;class pa{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):yf.setFromPoints(e).getCenter(i);let s=0;for(let a=0,o=e.length;a<o;a++)s=Math.max(s,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Fs.subVectors(e,this.center);const t=Fs.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Fs,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(No.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Fs.copy(e.center).add(No)),this.expandByPoint(Fs.copy(e.center).sub(No))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Kn=new U,Uo=new U,Ma=new U,pi=new U,Fo=new U,Sa=new U,Oo=new U;class vo{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Kn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Kn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Kn.copy(this.origin).addScaledVector(this.direction,t),Kn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Uo.copy(e).add(t).multiplyScalar(.5),Ma.copy(t).sub(e).normalize(),pi.copy(this.origin).sub(Uo);const a=e.distanceTo(t)*.5,o=-this.direction.dot(Ma),r=pi.dot(this.direction),l=-pi.dot(Ma),c=pi.lengthSq(),h=Math.abs(1-o*o);let d,u,f,g;if(h>0)if(d=o*l-r,u=o*r-l,g=a*h,d>=0)if(u>=-g)if(u<=g){const b=1/h;d*=b,u*=b,f=d*(d+o*u+2*r)+u*(o*d+u+2*l)+c}else u=a,d=Math.max(0,-(o*u+r)),f=-d*d+u*(u+2*l)+c;else u=-a,d=Math.max(0,-(o*u+r)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-o*a+r)),u=d>0?-a:Math.min(Math.max(-a,-l),a),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-a,-l),a),f=u*(u+2*l)+c):(d=Math.max(0,-(o*a+r)),u=d>0?a:Math.min(Math.max(-a,-l),a),f=-d*d+u*(u+2*l)+c);else u=o>0?-a:a,d=Math.max(0,-(o*u+r)),f=-d*d+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Uo).addScaledVector(Ma,u),f}intersectSphere(e,t){Kn.subVectors(e.center,this.origin);const i=Kn.dot(this.direction),s=Kn.dot(Kn)-i*i,a=e.radius*e.radius;if(s>a)return null;const o=Math.sqrt(a-s),r=i-o,l=i+o;return l<0?null:r<0?this.at(l,t):this.at(r,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,a,o,r,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),h>=0?(a=(e.min.y-u.y)*h,o=(e.max.y-u.y)*h):(a=(e.max.y-u.y)*h,o=(e.min.y-u.y)*h),i>o||a>s||((a>i||isNaN(i))&&(i=a),(o<s||isNaN(s))&&(s=o),d>=0?(r=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(r=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),i>l||r>s)||((r>i||i!==i)&&(i=r),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Kn)!==null}intersectTriangle(e,t,i,s,a){Fo.subVectors(t,e),Sa.subVectors(i,e),Oo.crossVectors(Fo,Sa);let o=this.direction.dot(Oo),r;if(o>0){if(s)return null;r=1}else if(o<0)r=-1,o=-o;else return null;pi.subVectors(this.origin,e);const l=r*this.direction.dot(Sa.crossVectors(pi,Sa));if(l<0)return null;const c=r*this.direction.dot(Fo.cross(pi));if(c<0||l+c>o)return null;const h=-r*pi.dot(Oo);return h<0?null:this.at(h/o,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class gt{constructor(e,t,i,s,a,o,r,l,c,h,d,u,f,g,b,p){gt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,a,o,r,l,c,h,d,u,f,g,b,p)}set(e,t,i,s,a,o,r,l,c,h,d,u,f,g,b,p){const m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=s,m[1]=a,m[5]=o,m[9]=r,m[13]=l,m[2]=c,m[6]=h,m[10]=d,m[14]=u,m[3]=f,m[7]=g,m[11]=b,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new gt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/os.setFromMatrixColumn(e,0).length(),a=1/os.setFromMatrixColumn(e,1).length(),o=1/os.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*a,t[5]=i[5]*a,t[6]=i[6]*a,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,a=e.z,o=Math.cos(i),r=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(a),d=Math.sin(a);if(e.order==="XYZ"){const u=o*h,f=o*d,g=r*h,b=r*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=f+g*c,t[5]=u-b*c,t[9]=-r*l,t[2]=b-u*c,t[6]=g+f*c,t[10]=o*l}else if(e.order==="YXZ"){const u=l*h,f=l*d,g=c*h,b=c*d;t[0]=u+b*r,t[4]=g*r-f,t[8]=o*c,t[1]=o*d,t[5]=o*h,t[9]=-r,t[2]=f*r-g,t[6]=b+u*r,t[10]=o*l}else if(e.order==="ZXY"){const u=l*h,f=l*d,g=c*h,b=c*d;t[0]=u-b*r,t[4]=-o*d,t[8]=g+f*r,t[1]=f+g*r,t[5]=o*h,t[9]=b-u*r,t[2]=-o*c,t[6]=r,t[10]=o*l}else if(e.order==="ZYX"){const u=o*h,f=o*d,g=r*h,b=r*d;t[0]=l*h,t[4]=g*c-f,t[8]=u*c+b,t[1]=l*d,t[5]=b*c+u,t[9]=f*c-g,t[2]=-c,t[6]=r*l,t[10]=o*l}else if(e.order==="YZX"){const u=o*l,f=o*c,g=r*l,b=r*c;t[0]=l*h,t[4]=b-u*d,t[8]=g*d+f,t[1]=d,t[5]=o*h,t[9]=-r*h,t[2]=-c*h,t[6]=f*d+g,t[10]=u-b*d}else if(e.order==="XZY"){const u=o*l,f=o*c,g=r*l,b=r*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+b,t[5]=o*h,t[9]=f*d-g,t[2]=g*d-f,t[6]=r*h,t[10]=b*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(xf,e,_f)}lookAt(e,t,i){const s=this.elements;return xn.subVectors(e,t),xn.lengthSq()===0&&(xn.z=1),xn.normalize(),mi.crossVectors(i,xn),mi.lengthSq()===0&&(Math.abs(i.z)===1?xn.x+=1e-4:xn.z+=1e-4,xn.normalize(),mi.crossVectors(i,xn)),mi.normalize(),wa.crossVectors(xn,mi),s[0]=mi.x,s[4]=wa.x,s[8]=xn.x,s[1]=mi.y,s[5]=wa.y,s[9]=xn.y,s[2]=mi.z,s[6]=wa.z,s[10]=xn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,a=this.elements,o=i[0],r=i[4],l=i[8],c=i[12],h=i[1],d=i[5],u=i[9],f=i[13],g=i[2],b=i[6],p=i[10],m=i[14],y=i[3],v=i[7],x=i[11],T=i[15],M=s[0],S=s[4],C=s[8],N=s[12],_=s[1],w=s[5],L=s[9],I=s[13],B=s[2],j=s[6],F=s[10],Q=s[14],K=s[3],me=s[7],ge=s[11],Ae=s[15];return a[0]=o*M+r*_+l*B+c*K,a[4]=o*S+r*w+l*j+c*me,a[8]=o*C+r*L+l*F+c*ge,a[12]=o*N+r*I+l*Q+c*Ae,a[1]=h*M+d*_+u*B+f*K,a[5]=h*S+d*w+u*j+f*me,a[9]=h*C+d*L+u*F+f*ge,a[13]=h*N+d*I+u*Q+f*Ae,a[2]=g*M+b*_+p*B+m*K,a[6]=g*S+b*w+p*j+m*me,a[10]=g*C+b*L+p*F+m*ge,a[14]=g*N+b*I+p*Q+m*Ae,a[3]=y*M+v*_+x*B+T*K,a[7]=y*S+v*w+x*j+T*me,a[11]=y*C+v*L+x*F+T*ge,a[15]=y*N+v*I+x*Q+T*Ae,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],a=e[12],o=e[1],r=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],f=e[14],g=e[3],b=e[7],p=e[11],m=e[15];return g*(+a*l*d-s*c*d-a*r*u+i*c*u+s*r*f-i*l*f)+b*(+t*l*f-t*c*u+a*o*u-s*o*f+s*c*h-a*l*h)+p*(+t*c*d-t*r*f-a*o*d+i*o*f+a*r*h-i*c*h)+m*(-s*r*h-t*l*d+t*r*u+s*o*d-i*o*u+i*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],a=e[3],o=e[4],r=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],f=e[11],g=e[12],b=e[13],p=e[14],m=e[15],y=d*p*c-b*u*c+b*l*f-r*p*f-d*l*m+r*u*m,v=g*u*c-h*p*c-g*l*f+o*p*f+h*l*m-o*u*m,x=h*b*c-g*d*c+g*r*f-o*b*f-h*r*m+o*d*m,T=g*d*l-h*b*l-g*r*u+o*b*u+h*r*p-o*d*p,M=t*y+i*v+s*x+a*T;if(M===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const S=1/M;return e[0]=y*S,e[1]=(b*u*a-d*p*a-b*s*f+i*p*f+d*s*m-i*u*m)*S,e[2]=(r*p*a-b*l*a+b*s*c-i*p*c-r*s*m+i*l*m)*S,e[3]=(d*l*a-r*u*a-d*s*c+i*u*c+r*s*f-i*l*f)*S,e[4]=v*S,e[5]=(h*p*a-g*u*a+g*s*f-t*p*f-h*s*m+t*u*m)*S,e[6]=(g*l*a-o*p*a-g*s*c+t*p*c+o*s*m-t*l*m)*S,e[7]=(o*u*a-h*l*a+h*s*c-t*u*c-o*s*f+t*l*f)*S,e[8]=x*S,e[9]=(g*d*a-h*b*a-g*i*f+t*b*f+h*i*m-t*d*m)*S,e[10]=(o*b*a-g*r*a+g*i*c-t*b*c-o*i*m+t*r*m)*S,e[11]=(h*r*a-o*d*a-h*i*c+t*d*c+o*i*f-t*r*f)*S,e[12]=T*S,e[13]=(h*b*s-g*d*s+g*i*u-t*b*u-h*i*p+t*d*p)*S,e[14]=(g*r*s-o*b*s-g*i*l+t*b*l+o*i*p-t*r*p)*S,e[15]=(o*d*s-h*r*s+h*i*l-t*d*l-o*i*u+t*r*u)*S,this}scale(e){const t=this.elements,i=e.x,s=e.y,a=e.z;return t[0]*=i,t[4]*=s,t[8]*=a,t[1]*=i,t[5]*=s,t[9]*=a,t[2]*=i,t[6]*=s,t[10]*=a,t[3]*=i,t[7]*=s,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),a=1-i,o=e.x,r=e.y,l=e.z,c=a*o,h=a*r;return this.set(c*o+i,c*r-s*l,c*l+s*r,0,c*r+s*l,h*r+i,h*l-s*o,0,c*l-s*r,h*l+s*o,a*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,a,o){return this.set(1,i,a,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,a=t._x,o=t._y,r=t._z,l=t._w,c=a+a,h=o+o,d=r+r,u=a*c,f=a*h,g=a*d,b=o*h,p=o*d,m=r*d,y=l*c,v=l*h,x=l*d,T=i.x,M=i.y,S=i.z;return s[0]=(1-(b+m))*T,s[1]=(f+x)*T,s[2]=(g-v)*T,s[3]=0,s[4]=(f-x)*M,s[5]=(1-(u+m))*M,s[6]=(p+y)*M,s[7]=0,s[8]=(g+v)*S,s[9]=(p-y)*S,s[10]=(1-(u+b))*S,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let a=os.set(s[0],s[1],s[2]).length();const o=os.set(s[4],s[5],s[6]).length(),r=os.set(s[8],s[9],s[10]).length();this.determinant()<0&&(a=-a),e.x=s[12],e.y=s[13],e.z=s[14],Ln.copy(this);const c=1/a,h=1/o,d=1/r;return Ln.elements[0]*=c,Ln.elements[1]*=c,Ln.elements[2]*=c,Ln.elements[4]*=h,Ln.elements[5]*=h,Ln.elements[6]*=h,Ln.elements[8]*=d,Ln.elements[9]*=d,Ln.elements[10]*=d,t.setFromRotationMatrix(Ln),i.x=a,i.y=o,i.z=r,this}makePerspective(e,t,i,s,a,o,r=oi){const l=this.elements,c=2*a/(t-e),h=2*a/(i-s),d=(t+e)/(t-e),u=(i+s)/(i-s);let f,g;if(r===oi)f=-(o+a)/(o-a),g=-2*o*a/(o-a);else if(r===lo)f=-o/(o-a),g=-o*a/(o-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+r);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,a,o,r=oi){const l=this.elements,c=1/(t-e),h=1/(i-s),d=1/(o-a),u=(t+e)*c,f=(i+s)*h;let g,b;if(r===oi)g=(o+a)*d,b=-2*d;else if(r===lo)g=a*d,b=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+r);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=b,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const os=new U,Ln=new gt,xf=new U(0,0,0),_f=new U(1,1,1),mi=new U,wa=new U,xn=new U,dl=new gt,ul=new ua;class Wn{constructor(e=0,t=0,i=0,s=Wn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,a=s[0],o=s[4],r=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Ft(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,a)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ft(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(r,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,a),this._z=0);break;case"ZXY":this._x=Math.asin(Ft(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-Ft(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ft(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,a)):(this._x=0,this._y=Math.atan2(r,f));break;case"XZY":this._z=Math.asin(-Ft(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(r,a)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return dl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(dl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ul.setFromEuler(this),this.setFromQuaternion(ul,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Wn.DEFAULT_ORDER="XYZ";class Rc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Mf=0;const fl=new U,rs=new ua,Jn=new gt,Ea=new U,Os=new U,Sf=new U,wf=new ua,pl=new U(1,0,0),ml=new U(0,1,0),gl=new U(0,0,1),vl={type:"added"},Ef={type:"removed"},cs={type:"childadded",child:null},Bo={type:"childremoved",child:null};class Ot extends ks{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Mf++}),this.uuid=Ds(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ot.DEFAULT_UP.clone();const e=new U,t=new Wn,i=new ua,s=new U(1,1,1);function a(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(a),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new gt},normalMatrix:{value:new $e}}),this.matrix=new gt,this.matrixWorld=new gt,this.matrixAutoUpdate=Ot.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ot.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Rc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return rs.setFromAxisAngle(e,t),this.quaternion.multiply(rs),this}rotateOnWorldAxis(e,t){return rs.setFromAxisAngle(e,t),this.quaternion.premultiply(rs),this}rotateX(e){return this.rotateOnAxis(pl,e)}rotateY(e){return this.rotateOnAxis(ml,e)}rotateZ(e){return this.rotateOnAxis(gl,e)}translateOnAxis(e,t){return fl.copy(e).applyQuaternion(this.quaternion),this.position.add(fl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(pl,e)}translateY(e){return this.translateOnAxis(ml,e)}translateZ(e){return this.translateOnAxis(gl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Jn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Ea.copy(e):Ea.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Os.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Jn.lookAt(Os,Ea,this.up):Jn.lookAt(Ea,Os,this.up),this.quaternion.setFromRotationMatrix(Jn),s&&(Jn.extractRotation(s.matrixWorld),rs.setFromRotationMatrix(Jn),this.quaternion.premultiply(rs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(vl),cs.child=e,this.dispatchEvent(cs),cs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ef),Bo.child=e,this.dispatchEvent(Bo),Bo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Jn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Jn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Jn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(vl),cs.child=e,this.dispatchEvent(cs),cs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Os,e,Sf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Os,wf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(r=>({boxInitialized:r.boxInitialized,boxMin:r.box.min.toArray(),boxMax:r.box.max.toArray(),sphereInitialized:r.sphereInitialized,sphereRadius:r.sphere.radius,sphereCenter:r.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function a(r,l){return r[l.uuid]===void 0&&(r[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=a(e.geometries,this.geometry);const r=this.geometry.parameters;if(r!==void 0&&r.shapes!==void 0){const l=r.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];a(e.shapes,d)}else a(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const r=[];for(let l=0,c=this.material.length;l<c;l++)r.push(a(e.materials,this.material[l]));s.material=r}else s.material=a(e.materials,this.material);if(this.children.length>0){s.children=[];for(let r=0;r<this.children.length;r++)s.children.push(this.children[r].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let r=0;r<this.animations.length;r++){const l=this.animations[r];s.animations.push(a(e.animations,l))}}if(t){const r=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),d=o(e.shapes),u=o(e.skeletons),f=o(e.animations),g=o(e.nodes);r.length>0&&(i.geometries=r),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(r){const l=[];for(const c in r){const h=r[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}Ot.DEFAULT_UP=new U(0,1,0);Ot.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ot.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const kn=new U,Zn=new U,zo=new U,Qn=new U,ls=new U,hs=new U,bl=new U,Go=new U,Ho=new U,Vo=new U,Wo=new Tt,$o=new Tt,qo=new Tt;class Un{constructor(e=new U,t=new U,i=new U){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),kn.subVectors(e,t),s.cross(kn);const a=s.lengthSq();return a>0?s.multiplyScalar(1/Math.sqrt(a)):s.set(0,0,0)}static getBarycoord(e,t,i,s,a){kn.subVectors(s,t),Zn.subVectors(i,t),zo.subVectors(e,t);const o=kn.dot(kn),r=kn.dot(Zn),l=kn.dot(zo),c=Zn.dot(Zn),h=Zn.dot(zo),d=o*c-r*r;if(d===0)return a.set(0,0,0),null;const u=1/d,f=(c*l-r*h)*u,g=(o*h-r*l)*u;return a.set(1-f-g,g,f)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Qn)===null?!1:Qn.x>=0&&Qn.y>=0&&Qn.x+Qn.y<=1}static getInterpolation(e,t,i,s,a,o,r,l){return this.getBarycoord(e,t,i,s,Qn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,Qn.x),l.addScaledVector(o,Qn.y),l.addScaledVector(r,Qn.z),l)}static getInterpolatedAttribute(e,t,i,s,a,o){return Wo.setScalar(0),$o.setScalar(0),qo.setScalar(0),Wo.fromBufferAttribute(e,t),$o.fromBufferAttribute(e,i),qo.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Wo,a.x),o.addScaledVector($o,a.y),o.addScaledVector(qo,a.z),o}static isFrontFacing(e,t,i,s){return kn.subVectors(i,t),Zn.subVectors(e,t),kn.cross(Zn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return kn.subVectors(this.c,this.b),Zn.subVectors(this.a,this.b),kn.cross(Zn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Un.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Un.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,a){return Un.getInterpolation(e,this.a,this.b,this.c,t,i,s,a)}containsPoint(e){return Un.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Un.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,a=this.c;let o,r;ls.subVectors(s,i),hs.subVectors(a,i),Go.subVectors(e,i);const l=ls.dot(Go),c=hs.dot(Go);if(l<=0&&c<=0)return t.copy(i);Ho.subVectors(e,s);const h=ls.dot(Ho),d=hs.dot(Ho);if(h>=0&&d<=h)return t.copy(s);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(i).addScaledVector(ls,o);Vo.subVectors(e,a);const f=ls.dot(Vo),g=hs.dot(Vo);if(g>=0&&f<=g)return t.copy(a);const b=f*c-l*g;if(b<=0&&c>=0&&g<=0)return r=c/(c-g),t.copy(i).addScaledVector(hs,r);const p=h*g-f*d;if(p<=0&&d-h>=0&&f-g>=0)return bl.subVectors(a,s),r=(d-h)/(d-h+(f-g)),t.copy(s).addScaledVector(bl,r);const m=1/(p+b+u);return o=b*m,r=u*m,t.copy(i).addScaledVector(ls,o).addScaledVector(hs,r)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const od={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},gi={h:0,s:0,l:0},Ta={h:0,s:0,l:0};function Xo(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class He{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=mn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,lt.toWorkingColorSpace(this,t),this}setRGB(e,t,i,s=lt.workingColorSpace){return this.r=e,this.g=t,this.b=i,lt.toWorkingColorSpace(this,s),this}setHSL(e,t,i,s=lt.workingColorSpace){if(e=Cc(e,1),t=Ft(t,0,1),i=Ft(i,0,1),t===0)this.r=this.g=this.b=i;else{const a=i<=.5?i*(1+t):i+t-i*t,o=2*i-a;this.r=Xo(o,a,e+1/3),this.g=Xo(o,a,e),this.b=Xo(o,a,e-1/3)}return lt.toWorkingColorSpace(this,s),this}setStyle(e,t=mn){function i(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const o=s[1],r=s[2];switch(o){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=s[1],o=a.length;if(o===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(a,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=mn){const i=od[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ws(e.r),this.g=ws(e.g),this.b=ws(e.b),this}copyLinearToSRGB(e){return this.r=Lo(e.r),this.g=Lo(e.g),this.b=Lo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=mn){return lt.fromWorkingColorSpace(Jt.copy(this),e),Math.round(Ft(Jt.r*255,0,255))*65536+Math.round(Ft(Jt.g*255,0,255))*256+Math.round(Ft(Jt.b*255,0,255))}getHexString(e=mn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=lt.workingColorSpace){lt.fromWorkingColorSpace(Jt.copy(this),t);const i=Jt.r,s=Jt.g,a=Jt.b,o=Math.max(i,s,a),r=Math.min(i,s,a);let l,c;const h=(r+o)/2;if(r===o)l=0,c=0;else{const d=o-r;switch(c=h<=.5?d/(o+r):d/(2-o-r),o){case i:l=(s-a)/d+(s<a?6:0);break;case s:l=(a-i)/d+2;break;case a:l=(i-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=lt.workingColorSpace){return lt.fromWorkingColorSpace(Jt.copy(this),t),e.r=Jt.r,e.g=Jt.g,e.b=Jt.b,e}getStyle(e=mn){lt.fromWorkingColorSpace(Jt.copy(this),e);const t=Jt.r,i=Jt.g,s=Jt.b;return e!==mn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(gi),this.setHSL(gi.h+e,gi.s+t,gi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(gi),e.getHSL(Ta);const i=ta(gi.h,Ta.h,t),s=ta(gi.s,Ta.s,t),a=ta(gi.l,Ta.l,t);return this.setHSL(i,s,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,a=e.elements;return this.r=a[0]*t+a[3]*i+a[6]*s,this.g=a[1]*t+a[4]*i+a[7]*s,this.b=a[2]*t+a[5]*i+a[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Jt=new He;He.NAMES=od;let Tf=0;class Qi extends ks{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Tf++}),this.uuid=Ds(),this.name="",this.type="Material",this.blending=Yi,this.side=Ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=yr,this.blendDst=xr,this.blendEquation=Hi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new He(0,0,0),this.blendAlpha=0,this.depthFunc=Ts,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=il,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ts,this.stencilZFail=ts,this.stencilZPass=ts,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Yi&&(i.blending=this.blending),this.side!==Ai&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==yr&&(i.blendSrc=this.blendSrc),this.blendDst!==xr&&(i.blendDst=this.blendDst),this.blendEquation!==Hi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ts&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==il&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ts&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ts&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ts&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(a){const o=[];for(const r in a){const l=a[r];delete l.metadata,o.push(l)}return o}if(t){const a=s(e.textures),o=s(e.images);a.length>0&&(i.textures=a),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let a=0;a!==s;++a)i[a]=t[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Vt extends Qi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new He(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.combine=Hh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const kt=new U,Aa=new Se;class wn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=sl,this.updateRanges=[],this.gpuType=ai,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,a=this.itemSize;s<a;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Aa.fromBufferAttribute(this,t),Aa.applyMatrix3(e),this.setXY(t,Aa.x,Aa.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)kt.fromBufferAttribute(this,t),kt.applyMatrix3(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)kt.fromBufferAttribute(this,t),kt.applyMatrix4(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)kt.fromBufferAttribute(this,t),kt.applyNormalMatrix(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)kt.fromBufferAttribute(this,t),kt.transformDirection(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=ys(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=tn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ys(t,this.array)),t}setX(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ys(t,this.array)),t}setY(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ys(t,this.array)),t}setZ(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ys(t,this.array)),t}setW(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),i=tn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),i=tn(i,this.array),s=tn(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,a){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),i=tn(i,this.array),s=tn(s,this.array),a=tn(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==sl&&(e.usage=this.usage),e}}class rd extends wn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class cd extends wn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class vt extends wn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Af=0;const Tn=new gt,Yo=new Ot,ds=new U,_n=new fa,Bs=new fa,Gt=new U;class jt extends ks{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Af++}),this.uuid=Ds(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(id(e)?cd:rd)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new $e().getNormalMatrix(e);i.applyNormalMatrix(a),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Tn.makeRotationFromQuaternion(e),this.applyMatrix4(Tn),this}rotateX(e){return Tn.makeRotationX(e),this.applyMatrix4(Tn),this}rotateY(e){return Tn.makeRotationY(e),this.applyMatrix4(Tn),this}rotateZ(e){return Tn.makeRotationZ(e),this.applyMatrix4(Tn),this}translate(e,t,i){return Tn.makeTranslation(e,t,i),this.applyMatrix4(Tn),this}scale(e,t,i){return Tn.makeScale(e,t,i),this.applyMatrix4(Tn),this}lookAt(e){return Yo.lookAt(e),Yo.updateMatrix(),this.applyMatrix4(Yo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ds).negate(),this.translate(ds.x,ds.y,ds.z),this}setFromPoints(e){const t=[];for(let i=0,s=e.length;i<s;i++){const a=e[i];t.push(a.x,a.y,a.z||0)}return this.setAttribute("position",new vt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fa);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const a=t[i];_n.setFromBufferAttribute(a),this.morphTargetsRelative?(Gt.addVectors(this.boundingBox.min,_n.min),this.boundingBox.expandByPoint(Gt),Gt.addVectors(this.boundingBox.max,_n.max),this.boundingBox.expandByPoint(Gt)):(this.boundingBox.expandByPoint(_n.min),this.boundingBox.expandByPoint(_n.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new pa);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(e){const i=this.boundingSphere.center;if(_n.setFromBufferAttribute(e),t)for(let a=0,o=t.length;a<o;a++){const r=t[a];Bs.setFromBufferAttribute(r),this.morphTargetsRelative?(Gt.addVectors(_n.min,Bs.min),_n.expandByPoint(Gt),Gt.addVectors(_n.max,Bs.max),_n.expandByPoint(Gt)):(_n.expandByPoint(Bs.min),_n.expandByPoint(Bs.max))}_n.getCenter(i);let s=0;for(let a=0,o=e.count;a<o;a++)Gt.fromBufferAttribute(e,a),s=Math.max(s,i.distanceToSquared(Gt));if(t)for(let a=0,o=t.length;a<o;a++){const r=t[a],l=this.morphTargetsRelative;for(let c=0,h=r.count;c<h;c++)Gt.fromBufferAttribute(r,c),l&&(ds.fromBufferAttribute(e,c),Gt.add(ds)),s=Math.max(s,i.distanceToSquared(Gt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,a=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new wn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),r=[],l=[];for(let C=0;C<i.count;C++)r[C]=new U,l[C]=new U;const c=new U,h=new U,d=new U,u=new Se,f=new Se,g=new Se,b=new U,p=new U;function m(C,N,_){c.fromBufferAttribute(i,C),h.fromBufferAttribute(i,N),d.fromBufferAttribute(i,_),u.fromBufferAttribute(a,C),f.fromBufferAttribute(a,N),g.fromBufferAttribute(a,_),h.sub(c),d.sub(c),f.sub(u),g.sub(u);const w=1/(f.x*g.y-g.x*f.y);isFinite(w)&&(b.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(w),p.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(w),r[C].add(b),r[N].add(b),r[_].add(b),l[C].add(p),l[N].add(p),l[_].add(p))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let C=0,N=y.length;C<N;++C){const _=y[C],w=_.start,L=_.count;for(let I=w,B=w+L;I<B;I+=3)m(e.getX(I+0),e.getX(I+1),e.getX(I+2))}const v=new U,x=new U,T=new U,M=new U;function S(C){T.fromBufferAttribute(s,C),M.copy(T);const N=r[C];v.copy(N),v.sub(T.multiplyScalar(T.dot(N))).normalize(),x.crossVectors(M,N);const w=x.dot(l[C])<0?-1:1;o.setXYZW(C,v.x,v.y,v.z,w)}for(let C=0,N=y.length;C<N;++C){const _=y[C],w=_.start,L=_.count;for(let I=w,B=w+L;I<B;I+=3)S(e.getX(I+0)),S(e.getX(I+1)),S(e.getX(I+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new wn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);const s=new U,a=new U,o=new U,r=new U,l=new U,c=new U,h=new U,d=new U;if(e)for(let u=0,f=e.count;u<f;u+=3){const g=e.getX(u+0),b=e.getX(u+1),p=e.getX(u+2);s.fromBufferAttribute(t,g),a.fromBufferAttribute(t,b),o.fromBufferAttribute(t,p),h.subVectors(o,a),d.subVectors(s,a),h.cross(d),r.fromBufferAttribute(i,g),l.fromBufferAttribute(i,b),c.fromBufferAttribute(i,p),r.add(h),l.add(h),c.add(h),i.setXYZ(g,r.x,r.y,r.z),i.setXYZ(b,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)s.fromBufferAttribute(t,u+0),a.fromBufferAttribute(t,u+1),o.fromBufferAttribute(t,u+2),h.subVectors(o,a),d.subVectors(s,a),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Gt.fromBufferAttribute(e,t),Gt.normalize(),e.setXYZ(t,Gt.x,Gt.y,Gt.z)}toNonIndexed(){function e(r,l){const c=r.array,h=r.itemSize,d=r.normalized,u=new c.constructor(l.length*h);let f=0,g=0;for(let b=0,p=l.length;b<p;b++){r.isInterleavedBufferAttribute?f=l[b]*r.data.stride+r.offset:f=l[b]*h;for(let m=0;m<h;m++)u[g++]=c[f++]}return new wn(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new jt,i=this.index.array,s=this.attributes;for(const r in s){const l=s[r],c=e(l,i);t.setAttribute(r,c)}const a=this.morphAttributes;for(const r in a){const l=[],c=a[r];for(let h=0,d=c.length;h<d;h++){const u=c[h],f=e(u,i);l.push(f)}t.morphAttributes[r]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let r=0,l=o.length;r<l;r++){const c=o[r];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let a=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const f=c[d];h.push(f.toJSON(e.data))}h.length>0&&(s[l]=h,a=!0)}a&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const r=this.boundingSphere;return r!==null&&(e.data.boundingSphere={center:r.center.toArray(),radius:r.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const a=e.morphAttributes;for(const c in a){const h=[],d=a[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const r=e.boundingBox;r!==null&&(this.boundingBox=r.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const yl=new gt,Ii=new vo,Ca=new pa,xl=new U,Ra=new U,Pa=new U,La=new U,jo=new U,ka=new U,_l=new U,Da=new U;class Z extends Ot{constructor(e=new jt,t=new Vt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,o=s.length;a<o;a++){const r=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[r]=a}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,a=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const r=this.morphTargetInfluences;if(a&&r){ka.set(0,0,0);for(let l=0,c=a.length;l<c;l++){const h=r[l],d=a[l];h!==0&&(jo.fromBufferAttribute(d,e),o?ka.addScaledVector(jo,h):ka.addScaledVector(jo.sub(t),h))}t.add(ka)}return t}raycast(e,t){const i=this.geometry,s=this.material,a=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ca.copy(i.boundingSphere),Ca.applyMatrix4(a),Ii.copy(e.ray).recast(e.near),!(Ca.containsPoint(Ii.origin)===!1&&(Ii.intersectSphere(Ca,xl)===null||Ii.origin.distanceToSquared(xl)>(e.far-e.near)**2))&&(yl.copy(a).invert(),Ii.copy(e.ray).applyMatrix4(yl),!(i.boundingBox!==null&&Ii.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Ii)))}_computeIntersections(e,t,i){let s;const a=this.geometry,o=this.material,r=a.index,l=a.attributes.position,c=a.attributes.uv,h=a.attributes.uv1,d=a.attributes.normal,u=a.groups,f=a.drawRange;if(r!==null)if(Array.isArray(o))for(let g=0,b=u.length;g<b;g++){const p=u[g],m=o[p.materialIndex],y=Math.max(p.start,f.start),v=Math.min(r.count,Math.min(p.start+p.count,f.start+f.count));for(let x=y,T=v;x<T;x+=3){const M=r.getX(x),S=r.getX(x+1),C=r.getX(x+2);s=Ia(this,m,e,i,c,h,d,M,S,C),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),b=Math.min(r.count,f.start+f.count);for(let p=g,m=b;p<m;p+=3){const y=r.getX(p),v=r.getX(p+1),x=r.getX(p+2);s=Ia(this,o,e,i,c,h,d,y,v,x),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,b=u.length;g<b;g++){const p=u[g],m=o[p.materialIndex],y=Math.max(p.start,f.start),v=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let x=y,T=v;x<T;x+=3){const M=x,S=x+1,C=x+2;s=Ia(this,m,e,i,c,h,d,M,S,C),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),b=Math.min(l.count,f.start+f.count);for(let p=g,m=b;p<m;p+=3){const y=p,v=p+1,x=p+2;s=Ia(this,o,e,i,c,h,d,y,v,x),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}}function Cf(n,e,t,i,s,a,o,r){let l;if(e.side===vn?l=i.intersectTriangle(o,a,s,!0,r):l=i.intersectTriangle(s,a,o,e.side===Ai,r),l===null)return null;Da.copy(r),Da.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Da);return c<t.near||c>t.far?null:{distance:c,point:Da.clone(),object:n}}function Ia(n,e,t,i,s,a,o,r,l,c){n.getVertexPosition(r,Ra),n.getVertexPosition(l,Pa),n.getVertexPosition(c,La);const h=Cf(n,e,t,i,Ra,Pa,La,_l);if(h){const d=new U;Un.getBarycoord(_l,Ra,Pa,La,d),s&&(h.uv=Un.getInterpolatedAttribute(s,r,l,c,d,new Se)),a&&(h.uv1=Un.getInterpolatedAttribute(a,r,l,c,d,new Se)),o&&(h.normal=Un.getInterpolatedAttribute(o,r,l,c,d,new U),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a:r,b:l,c,normal:new U,materialIndex:0};Un.getNormal(Ra,Pa,La,u.normal),h.face=u,h.barycoord=d}return h}class Ut extends jt{constructor(e=1,t=1,i=1,s=1,a=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:a,depthSegments:o};const r=this;s=Math.floor(s),a=Math.floor(a),o=Math.floor(o);const l=[],c=[],h=[],d=[];let u=0,f=0;g("z","y","x",-1,-1,i,t,e,o,a,0),g("z","y","x",1,-1,i,t,-e,o,a,1),g("x","z","y",1,1,e,i,t,s,o,2),g("x","z","y",1,-1,e,i,-t,s,o,3),g("x","y","z",1,-1,e,t,i,s,a,4),g("x","y","z",-1,-1,e,t,-i,s,a,5),this.setIndex(l),this.setAttribute("position",new vt(c,3)),this.setAttribute("normal",new vt(h,3)),this.setAttribute("uv",new vt(d,2));function g(b,p,m,y,v,x,T,M,S,C,N){const _=x/S,w=T/C,L=x/2,I=T/2,B=M/2,j=S+1,F=C+1;let Q=0,K=0;const me=new U;for(let ge=0;ge<F;ge++){const Ae=ge*w-I;for(let je=0;je<j;je++){const Ke=je*_-L;me[b]=Ke*y,me[p]=Ae*v,me[m]=B,c.push(me.x,me.y,me.z),me[b]=0,me[p]=0,me[m]=M>0?1:-1,h.push(me.x,me.y,me.z),d.push(je/S),d.push(1-ge/C),Q+=1}}for(let ge=0;ge<C;ge++)for(let Ae=0;Ae<S;Ae++){const je=u+Ae+j*ge,Ke=u+Ae+j*(ge+1),ee=u+(Ae+1)+j*(ge+1),ae=u+(Ae+1)+j*ge;l.push(je,Ke,ae),l.push(Ke,ee,ae),K+=6}r.addGroup(f,K,N),f+=K,u+=Q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ut(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ls(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function nn(n){const e={};for(let t=0;t<n.length;t++){const i=Ls(n[t]);for(const s in i)e[s]=i[s]}return e}function Rf(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function ld(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:lt.workingColorSpace}const Pf={clone:Ls,merge:nn};var Lf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,kf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ci extends Qi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Lf,this.fragmentShader=kf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ls(e.uniforms),this.uniformsGroups=Rf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class hd extends Ot{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new gt,this.projectionMatrix=new gt,this.projectionMatrixInverse=new gt,this.coordinateSystem=oi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const vi=new U,Ml=new Se,Sl=new Se;class In extends hd{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ca*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ea*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ca*2*Math.atan(Math.tan(ea*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){vi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(vi.x,vi.y).multiplyScalar(-e/vi.z),vi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(vi.x,vi.y).multiplyScalar(-e/vi.z)}getViewSize(e,t){return this.getViewBounds(e,Ml,Sl),t.subVectors(Sl,Ml)}setViewOffset(e,t,i,s,a,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ea*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,a=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;a+=o.offsetX*s/l,t-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}const r=this.filmOffset;r!==0&&(a+=e*r/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+s,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const us=-90,fs=1;class Df extends Ot{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new In(us,fs,e,t);s.layers=this.layers,this.add(s);const a=new In(us,fs,e,t);a.layers=this.layers,this.add(a);const o=new In(us,fs,e,t);o.layers=this.layers,this.add(o);const r=new In(us,fs,e,t);r.layers=this.layers,this.add(r);const l=new In(us,fs,e,t);l.layers=this.layers,this.add(l);const c=new In(us,fs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,a,o,r,l]=t;for(const c of t)this.remove(c);if(e===oi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),r.up.set(0,1,0),r.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===lo)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),r.up.set(0,-1,0),r.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,o,r,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const b=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,a),e.setRenderTarget(i,1,s),e.render(t,o),e.setRenderTarget(i,2,s),e.render(t,r),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,c),i.texture.generateMipmaps=b,e.setRenderTarget(i,5,s),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class dd extends rn{constructor(e,t,i,s,a,o,r,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:As,super(e,t,i,s,a,o,r,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class If extends Ji{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new dd(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Nn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ut(5,5,5),a=new Ci({name:"CubemapFromEquirect",uniforms:Ls(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:vn,blending:wi});a.uniforms.tEquirect.value=t;const o=new Z(s,a),r=t.minFilter;return t.minFilter===qi&&(t.minFilter=Nn),new Df(1,10,this).update(e,o),t.minFilter=r,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,i,s){const a=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(a)}}const Ko=new U,Nf=new U,Uf=new $e;class xi{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Ko.subVectors(i,t).cross(Nf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Ko),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return a<0||a>1?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Uf.getNormalMatrix(e),s=this.coplanarPoint(Ko).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ni=new pa,Na=new U;class Pc{constructor(e=new xi,t=new xi,i=new xi,s=new xi,a=new xi,o=new xi){this.planes=[e,t,i,s,a,o]}set(e,t,i,s,a,o){const r=this.planes;return r[0].copy(e),r[1].copy(t),r[2].copy(i),r[3].copy(s),r[4].copy(a),r[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=oi){const i=this.planes,s=e.elements,a=s[0],o=s[1],r=s[2],l=s[3],c=s[4],h=s[5],d=s[6],u=s[7],f=s[8],g=s[9],b=s[10],p=s[11],m=s[12],y=s[13],v=s[14],x=s[15];if(i[0].setComponents(l-a,u-c,p-f,x-m).normalize(),i[1].setComponents(l+a,u+c,p+f,x+m).normalize(),i[2].setComponents(l+o,u+h,p+g,x+y).normalize(),i[3].setComponents(l-o,u-h,p-g,x-y).normalize(),i[4].setComponents(l-r,u-d,p-b,x-v).normalize(),t===oi)i[5].setComponents(l+r,u+d,p+b,x+v).normalize();else if(t===lo)i[5].setComponents(r,d,b,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ni.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ni.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ni)}intersectsSprite(e){return Ni.center.set(0,0,0),Ni.radius=.7071067811865476,Ni.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ni)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(Na.x=s.normal.x>0?e.max.x:e.min.x,Na.y=s.normal.y>0?e.max.y:e.min.y,Na.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Na)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function ud(){let n=null,e=!1,t=null,i=null;function s(a,o){t(a,o),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){n=a}}}function Ff(n){const e=new WeakMap;function t(r,l){const c=r.array,h=r.usage,d=c.byteLength,u=n.createBuffer();n.bindBuffer(l,u),n.bufferData(l,c,h),r.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(c instanceof Uint16Array)r.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:r.version,size:d}}function i(r,l,c){const h=l.array,d=l.updateRanges;if(n.bindBuffer(c,r),d.length===0)n.bufferSubData(c,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){const g=d[u],b=d[f];b.start<=g.start+g.count+1?g.count=Math.max(g.count,b.start+b.count-g.start):(++u,d[u]=b)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){const b=d[f];n.bufferSubData(c,b.start*h.BYTES_PER_ELEMENT,h,b.start,b.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(r){return r.isInterleavedBufferAttribute&&(r=r.data),e.get(r)}function a(r){r.isInterleavedBufferAttribute&&(r=r.data);const l=e.get(r);l&&(n.deleteBuffer(l.buffer),e.delete(r))}function o(r,l){if(r.isInterleavedBufferAttribute&&(r=r.data),r.isGLBufferAttribute){const h=e.get(r);(!h||h.version<r.version)&&e.set(r,{buffer:r.buffer,type:r.type,bytesPerElement:r.elementSize,version:r.version});return}const c=e.get(r);if(c===void 0)e.set(r,t(r,l));else if(c.version<r.version){if(c.size!==r.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,r,l),c.version=r.version}}return{get:s,remove:a,update:o}}class An extends jt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const a=e/2,o=t/2,r=Math.floor(i),l=Math.floor(s),c=r+1,h=l+1,d=e/r,u=t/l,f=[],g=[],b=[],p=[];for(let m=0;m<h;m++){const y=m*u-o;for(let v=0;v<c;v++){const x=v*d-a;g.push(x,-y,0),b.push(0,0,1),p.push(v/r),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let y=0;y<r;y++){const v=y+c*m,x=y+c*(m+1),T=y+1+c*(m+1),M=y+1+c*m;f.push(v,x,M),f.push(x,T,M)}this.setIndex(f),this.setAttribute("position",new vt(g,3)),this.setAttribute("normal",new vt(b,3)),this.setAttribute("uv",new vt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new An(e.width,e.height,e.widthSegments,e.heightSegments)}}var Of=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Bf=`#ifdef USE_ALPHAHASH
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
#endif`,zf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Gf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Vf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Wf=`#ifdef USE_AOMAP
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
#endif`,$f=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,qf=`#ifdef USE_BATCHING
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
#endif`,Xf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Yf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,jf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Kf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Jf=`#ifdef USE_IRIDESCENCE
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
#endif`,Zf=`#ifdef USE_BUMPMAP
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
#endif`,Qf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,ep=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,tp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,np=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ip=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,sp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ap=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,op=`#if defined( USE_COLOR_ALPHA )
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
#endif`,rp=`#define PI 3.141592653589793
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
} // validated`,cp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,lp=`vec3 transformedNormal = objectNormal;
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
#endif`,hp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,dp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,up=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,fp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,pp="gl_FragColor = linearToOutputTexel( gl_FragColor );",mp=`
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
}`,gp=`#ifdef USE_ENVMAP
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
#endif`,vp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,bp=`#ifdef USE_ENVMAP
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
#endif`,yp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,xp=`#ifdef USE_ENVMAP
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
#endif`,_p=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Mp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Sp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,wp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ep=`#ifdef USE_GRADIENTMAP
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
}`,Tp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ap=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Cp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Rp=`uniform bool receiveShadow;
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
#endif`,Pp=`#ifdef USE_ENVMAP
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
#endif`,Lp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,kp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Dp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ip=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Np=`PhysicalMaterial material;
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
#endif`,Up=`struct PhysicalMaterial {
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
}`,Fp=`
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
#endif`,Op=`#if defined( RE_IndirectDiffuse )
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
#endif`,Bp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,zp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Gp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Vp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Wp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,$p=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,qp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Xp=`#if defined( USE_POINTS_UV )
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
#endif`,Yp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,jp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Kp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Jp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Zp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Qp=`#ifdef USE_MORPHTARGETS
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
#endif`,em=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,nm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,im=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,am=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,om=`#ifdef USE_NORMALMAP
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
#endif`,rm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,cm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,lm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,hm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,dm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,um=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,fm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,pm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,mm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,gm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,vm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,bm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ym=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,xm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,_m=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Mm=`float getShadowMask() {
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
}`,Sm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,wm=`#ifdef USE_SKINNING
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
#endif`,Em=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Tm=`#ifdef USE_SKINNING
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
#endif`,Am=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Cm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Rm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Pm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Lm=`#ifdef USE_TRANSMISSION
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
#endif`,km=`#ifdef USE_TRANSMISSION
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
#endif`,Dm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Im=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Nm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Um=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Fm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Om=`uniform sampler2D t2D;
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
}`,Bm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Gm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vm=`#include <common>
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
}`,Wm=`#if DEPTH_PACKING == 3200
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
}`,$m=`#define DISTANCE
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
}`,qm=`#define DISTANCE
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
}`,Xm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ym=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jm=`uniform float scale;
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
}`,Km=`uniform vec3 diffuse;
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
}`,Jm=`#include <common>
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
}`,Zm=`uniform vec3 diffuse;
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
}`,Qm=`#define LAMBERT
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
}`,e0=`#define LAMBERT
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
}`,t0=`#define MATCAP
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
}`,n0=`#define MATCAP
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
}`,i0=`#define NORMAL
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
}`,s0=`#define NORMAL
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
}`,a0=`#define PHONG
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
}`,o0=`#define PHONG
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
}`,r0=`#define STANDARD
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
}`,c0=`#define STANDARD
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
}`,l0=`#define TOON
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
}`,h0=`#define TOON
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
}`,d0=`uniform float size;
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
}`,u0=`uniform vec3 diffuse;
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
}`,f0=`#include <common>
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
}`,p0=`uniform vec3 color;
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
}`,m0=`uniform float rotation;
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
}`,g0=`uniform vec3 diffuse;
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
}`,We={alphahash_fragment:Of,alphahash_pars_fragment:Bf,alphamap_fragment:zf,alphamap_pars_fragment:Gf,alphatest_fragment:Hf,alphatest_pars_fragment:Vf,aomap_fragment:Wf,aomap_pars_fragment:$f,batching_pars_vertex:qf,batching_vertex:Xf,begin_vertex:Yf,beginnormal_vertex:jf,bsdfs:Kf,iridescence_fragment:Jf,bumpmap_pars_fragment:Zf,clipping_planes_fragment:Qf,clipping_planes_pars_fragment:ep,clipping_planes_pars_vertex:tp,clipping_planes_vertex:np,color_fragment:ip,color_pars_fragment:sp,color_pars_vertex:ap,color_vertex:op,common:rp,cube_uv_reflection_fragment:cp,defaultnormal_vertex:lp,displacementmap_pars_vertex:hp,displacementmap_vertex:dp,emissivemap_fragment:up,emissivemap_pars_fragment:fp,colorspace_fragment:pp,colorspace_pars_fragment:mp,envmap_fragment:gp,envmap_common_pars_fragment:vp,envmap_pars_fragment:bp,envmap_pars_vertex:yp,envmap_physical_pars_fragment:Pp,envmap_vertex:xp,fog_vertex:_p,fog_pars_vertex:Mp,fog_fragment:Sp,fog_pars_fragment:wp,gradientmap_pars_fragment:Ep,lightmap_pars_fragment:Tp,lights_lambert_fragment:Ap,lights_lambert_pars_fragment:Cp,lights_pars_begin:Rp,lights_toon_fragment:Lp,lights_toon_pars_fragment:kp,lights_phong_fragment:Dp,lights_phong_pars_fragment:Ip,lights_physical_fragment:Np,lights_physical_pars_fragment:Up,lights_fragment_begin:Fp,lights_fragment_maps:Op,lights_fragment_end:Bp,logdepthbuf_fragment:zp,logdepthbuf_pars_fragment:Gp,logdepthbuf_pars_vertex:Hp,logdepthbuf_vertex:Vp,map_fragment:Wp,map_pars_fragment:$p,map_particle_fragment:qp,map_particle_pars_fragment:Xp,metalnessmap_fragment:Yp,metalnessmap_pars_fragment:jp,morphinstance_vertex:Kp,morphcolor_vertex:Jp,morphnormal_vertex:Zp,morphtarget_pars_vertex:Qp,morphtarget_vertex:em,normal_fragment_begin:tm,normal_fragment_maps:nm,normal_pars_fragment:im,normal_pars_vertex:sm,normal_vertex:am,normalmap_pars_fragment:om,clearcoat_normal_fragment_begin:rm,clearcoat_normal_fragment_maps:cm,clearcoat_pars_fragment:lm,iridescence_pars_fragment:hm,opaque_fragment:dm,packing:um,premultiplied_alpha_fragment:fm,project_vertex:pm,dithering_fragment:mm,dithering_pars_fragment:gm,roughnessmap_fragment:vm,roughnessmap_pars_fragment:bm,shadowmap_pars_fragment:ym,shadowmap_pars_vertex:xm,shadowmap_vertex:_m,shadowmask_pars_fragment:Mm,skinbase_vertex:Sm,skinning_pars_vertex:wm,skinning_vertex:Em,skinnormal_vertex:Tm,specularmap_fragment:Am,specularmap_pars_fragment:Cm,tonemapping_fragment:Rm,tonemapping_pars_fragment:Pm,transmission_fragment:Lm,transmission_pars_fragment:km,uv_pars_fragment:Dm,uv_pars_vertex:Im,uv_vertex:Nm,worldpos_vertex:Um,background_vert:Fm,background_frag:Om,backgroundCube_vert:Bm,backgroundCube_frag:zm,cube_vert:Gm,cube_frag:Hm,depth_vert:Vm,depth_frag:Wm,distanceRGBA_vert:$m,distanceRGBA_frag:qm,equirect_vert:Xm,equirect_frag:Ym,linedashed_vert:jm,linedashed_frag:Km,meshbasic_vert:Jm,meshbasic_frag:Zm,meshlambert_vert:Qm,meshlambert_frag:e0,meshmatcap_vert:t0,meshmatcap_frag:n0,meshnormal_vert:i0,meshnormal_frag:s0,meshphong_vert:a0,meshphong_frag:o0,meshphysical_vert:r0,meshphysical_frag:c0,meshtoon_vert:l0,meshtoon_frag:h0,points_vert:d0,points_frag:u0,shadow_vert:f0,shadow_frag:p0,sprite_vert:m0,sprite_frag:g0},_e={common:{diffuse:{value:new He(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $e}},envmap:{envMap:{value:null},envMapRotation:{value:new $e},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $e}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $e}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $e},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $e},normalScale:{value:new Se(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $e},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $e}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $e}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $e}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new He(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new He(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0},uvTransform:{value:new $e}},sprite:{diffuse:{value:new He(16777215)},opacity:{value:1},center:{value:new Se(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}}},Hn={basic:{uniforms:nn([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:nn([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new He(0)}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:nn([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new He(0)},specular:{value:new He(1118481)},shininess:{value:30}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:nn([_e.common,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.roughnessmap,_e.metalnessmap,_e.fog,_e.lights,{emissive:{value:new He(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:nn([_e.common,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.gradientmap,_e.fog,_e.lights,{emissive:{value:new He(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:nn([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:nn([_e.points,_e.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:nn([_e.common,_e.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:nn([_e.common,_e.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:nn([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:nn([_e.sprite,_e.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new $e},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $e}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distanceRGBA:{uniforms:nn([_e.common,_e.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distanceRGBA_vert,fragmentShader:We.distanceRGBA_frag},shadow:{uniforms:nn([_e.lights,_e.fog,{color:{value:new He(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};Hn.physical={uniforms:nn([Hn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $e},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $e},clearcoatNormalScale:{value:new Se(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $e},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $e},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $e},sheen:{value:0},sheenColor:{value:new He(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $e},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $e},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $e},transmissionSamplerSize:{value:new Se},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $e},attenuationDistance:{value:0},attenuationColor:{value:new He(0)},specularColor:{value:new He(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $e},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $e},anisotropyVector:{value:new Se},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $e}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};const Ua={r:0,b:0,g:0},Ui=new Wn,v0=new gt;function b0(n,e,t,i,s,a,o){const r=new He(0);let l=a===!0?0:1,c,h,d=null,u=0,f=null;function g(y){let v=y.isScene===!0?y.background:null;return v&&v.isTexture&&(v=(y.backgroundBlurriness>0?t:e).get(v)),v}function b(y){let v=!1;const x=g(y);x===null?m(r,l):x&&x.isColor&&(m(x,1),v=!0);const T=n.xr.getEnvironmentBlendMode();T==="additive"?i.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||v)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function p(y,v){const x=g(v);x&&(x.isCubeTexture||x.mapping===mo)?(h===void 0&&(h=new Z(new Ut(1,1,1),new Ci({name:"BackgroundCubeMaterial",uniforms:Ls(Hn.backgroundCube.uniforms),vertexShader:Hn.backgroundCube.vertexShader,fragmentShader:Hn.backgroundCube.fragmentShader,side:vn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,M,S){this.matrixWorld.copyPosition(S.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Ui.copy(v.backgroundRotation),Ui.x*=-1,Ui.y*=-1,Ui.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Ui.y*=-1,Ui.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(v0.makeRotationFromEuler(Ui)),h.material.toneMapped=lt.getTransfer(x.colorSpace)!==xt,(d!==x||u!==x.version||f!==n.toneMapping)&&(h.material.needsUpdate=!0,d=x,u=x.version,f=n.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new Z(new An(2,2),new Ci({name:"BackgroundMaterial",uniforms:Ls(Hn.background.uniforms),vertexShader:Hn.background.vertexShader,fragmentShader:Hn.background.fragmentShader,side:Ai,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=lt.getTransfer(x.colorSpace)!==xt,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(d!==x||u!==x.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,d=x,u=x.version,f=n.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function m(y,v){y.getRGB(Ua,ld(n)),i.buffers.color.setClear(Ua.r,Ua.g,Ua.b,v,o)}return{getClearColor:function(){return r},setClearColor:function(y,v=1){r.set(y),l=v,m(r,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,m(r,l)},render:b,addToRenderList:p}}function y0(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null);let a=s,o=!1;function r(_,w,L,I,B){let j=!1;const F=d(I,L,w);a!==F&&(a=F,c(a.object)),j=f(_,I,L,B),j&&g(_,I,L,B),B!==null&&e.update(B,n.ELEMENT_ARRAY_BUFFER),(j||o)&&(o=!1,x(_,w,L,I),B!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function l(){return n.createVertexArray()}function c(_){return n.bindVertexArray(_)}function h(_){return n.deleteVertexArray(_)}function d(_,w,L){const I=L.wireframe===!0;let B=i[_.id];B===void 0&&(B={},i[_.id]=B);let j=B[w.id];j===void 0&&(j={},B[w.id]=j);let F=j[I];return F===void 0&&(F=u(l()),j[I]=F),F}function u(_){const w=[],L=[],I=[];for(let B=0;B<t;B++)w[B]=0,L[B]=0,I[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:w,enabledAttributes:L,attributeDivisors:I,object:_,attributes:{},index:null}}function f(_,w,L,I){const B=a.attributes,j=w.attributes;let F=0;const Q=L.getAttributes();for(const K in Q)if(Q[K].location>=0){const ge=B[K];let Ae=j[K];if(Ae===void 0&&(K==="instanceMatrix"&&_.instanceMatrix&&(Ae=_.instanceMatrix),K==="instanceColor"&&_.instanceColor&&(Ae=_.instanceColor)),ge===void 0||ge.attribute!==Ae||Ae&&ge.data!==Ae.data)return!0;F++}return a.attributesNum!==F||a.index!==I}function g(_,w,L,I){const B={},j=w.attributes;let F=0;const Q=L.getAttributes();for(const K in Q)if(Q[K].location>=0){let ge=j[K];ge===void 0&&(K==="instanceMatrix"&&_.instanceMatrix&&(ge=_.instanceMatrix),K==="instanceColor"&&_.instanceColor&&(ge=_.instanceColor));const Ae={};Ae.attribute=ge,ge&&ge.data&&(Ae.data=ge.data),B[K]=Ae,F++}a.attributes=B,a.attributesNum=F,a.index=I}function b(){const _=a.newAttributes;for(let w=0,L=_.length;w<L;w++)_[w]=0}function p(_){m(_,0)}function m(_,w){const L=a.newAttributes,I=a.enabledAttributes,B=a.attributeDivisors;L[_]=1,I[_]===0&&(n.enableVertexAttribArray(_),I[_]=1),B[_]!==w&&(n.vertexAttribDivisor(_,w),B[_]=w)}function y(){const _=a.newAttributes,w=a.enabledAttributes;for(let L=0,I=w.length;L<I;L++)w[L]!==_[L]&&(n.disableVertexAttribArray(L),w[L]=0)}function v(_,w,L,I,B,j,F){F===!0?n.vertexAttribIPointer(_,w,L,B,j):n.vertexAttribPointer(_,w,L,I,B,j)}function x(_,w,L,I){b();const B=I.attributes,j=L.getAttributes(),F=w.defaultAttributeValues;for(const Q in j){const K=j[Q];if(K.location>=0){let me=B[Q];if(me===void 0&&(Q==="instanceMatrix"&&_.instanceMatrix&&(me=_.instanceMatrix),Q==="instanceColor"&&_.instanceColor&&(me=_.instanceColor)),me!==void 0){const ge=me.normalized,Ae=me.itemSize,je=e.get(me);if(je===void 0)continue;const Ke=je.buffer,ee=je.type,ae=je.bytesPerElement,Te=ee===n.INT||ee===n.UNSIGNED_INT||me.gpuType===_c;if(me.isInterleavedBufferAttribute){const ye=me.data,X=ye.stride,ne=me.offset;if(ye.isInstancedInterleavedBuffer){for(let be=0;be<K.locationSize;be++)m(K.location+be,ye.meshPerAttribute);_.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ye.meshPerAttribute*ye.count)}else for(let be=0;be<K.locationSize;be++)p(K.location+be);n.bindBuffer(n.ARRAY_BUFFER,Ke);for(let be=0;be<K.locationSize;be++)v(K.location+be,Ae/K.locationSize,ee,ge,X*ae,(ne+Ae/K.locationSize*be)*ae,Te)}else{if(me.isInstancedBufferAttribute){for(let ye=0;ye<K.locationSize;ye++)m(K.location+ye,me.meshPerAttribute);_.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let ye=0;ye<K.locationSize;ye++)p(K.location+ye);n.bindBuffer(n.ARRAY_BUFFER,Ke);for(let ye=0;ye<K.locationSize;ye++)v(K.location+ye,Ae/K.locationSize,ee,ge,Ae*ae,Ae/K.locationSize*ye*ae,Te)}}else if(F!==void 0){const ge=F[Q];if(ge!==void 0)switch(ge.length){case 2:n.vertexAttrib2fv(K.location,ge);break;case 3:n.vertexAttrib3fv(K.location,ge);break;case 4:n.vertexAttrib4fv(K.location,ge);break;default:n.vertexAttrib1fv(K.location,ge)}}}}y()}function T(){C();for(const _ in i){const w=i[_];for(const L in w){const I=w[L];for(const B in I)h(I[B].object),delete I[B];delete w[L]}delete i[_]}}function M(_){if(i[_.id]===void 0)return;const w=i[_.id];for(const L in w){const I=w[L];for(const B in I)h(I[B].object),delete I[B];delete w[L]}delete i[_.id]}function S(_){for(const w in i){const L=i[w];if(L[_.id]===void 0)continue;const I=L[_.id];for(const B in I)h(I[B].object),delete I[B];delete L[_.id]}}function C(){N(),o=!0,a!==s&&(a=s,c(a.object))}function N(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:r,reset:C,resetDefaultState:N,dispose:T,releaseStatesOfGeometry:M,releaseStatesOfProgram:S,initAttributes:b,enableAttribute:p,disableUnusedAttributes:y}}function x0(n,e,t){let i;function s(c){i=c}function a(c,h){n.drawArrays(i,c,h),t.update(h,i,1)}function o(c,h,d){d!==0&&(n.drawArraysInstanced(i,c,h,d),t.update(h,i,d))}function r(c,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,d);let f=0;for(let g=0;g<d;g++)f+=h[g];t.update(f,i,1)}function l(c,h,d,u){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],h[g],u[g]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,h,0,u,0,d);let g=0;for(let b=0;b<d;b++)g+=h[b];for(let b=0;b<u.length;b++)t.update(g,i,u[b])}}this.setMode=s,this.render=a,this.renderInstances=o,this.renderMultiDraw=r,this.renderMultiDrawInstances=l}function _0(n,e,t,i){let s;function a(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const S=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(S.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(S){return!(S!==On&&i.convert(S)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function r(S){const C=S===da&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(S!==hi&&i.convert(S)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&S!==ai&&!C)}function l(S){if(S==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";S="mediump"}return S==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=t.logarithmicDepthBuffer===!0,u=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(u===!0){const S=e.get("EXT_clip_control");S.clipControlEXT(S.LOWER_LEFT_EXT,S.ZERO_TO_ONE_EXT)}const f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),y=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),v=n.getParameter(n.MAX_VARYING_VECTORS),x=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),T=g>0,M=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:r,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:b,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:y,maxVaryings:v,maxFragmentUniforms:x,vertexTextures:T,maxSamples:M}}function M0(n){const e=this;let t=null,i=0,s=!1,a=!1;const o=new xi,r=new $e,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||i!==0||s;return s=u,i=d.length,f},this.beginShadows=function(){a=!0,h(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){const g=d.clippingPlanes,b=d.clipIntersection,p=d.clipShadows,m=n.get(d);if(!s||g===null||g.length===0||a&&!p)a?h(null):c();else{const y=a?0:i,v=y*4;let x=m.clippingState||null;l.value=x,x=h(g,u,v,f);for(let T=0;T!==v;++T)x[T]=t[T];m.clippingState=x,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(d,u,f,g){const b=d!==null?d.length:0;let p=null;if(b!==0){if(p=l.value,g!==!0||p===null){const m=f+b*4,y=u.matrixWorldInverse;r.getNormalMatrix(y),(p===null||p.length<m)&&(p=new Float32Array(m));for(let v=0,x=f;v!==b;++v,x+=4)o.copy(d[v]).applyMatrix4(y,r),o.normal.toArray(p,x),p[x+3]=o.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,p}}function S0(n){let e=new WeakMap;function t(o,r){return r===Cr?o.mapping=As:r===Rr&&(o.mapping=Cs),o}function i(o){if(o&&o.isTexture){const r=o.mapping;if(r===Cr||r===Rr)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new If(l.height);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",s),t(c.texture,o.mapping)}else return null}}return o}function s(o){const r=o.target;r.removeEventListener("dispose",s);const l=e.get(r);l!==void 0&&(e.delete(r),l.dispose())}function a(){e=new WeakMap}return{get:i,dispose:a}}class Lc extends hd{constructor(e=-1,t=1,i=1,s=-1,a=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=a,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,a,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let a=i-e,o=i+e,r=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,o=a+c*this.view.width,r-=h*this.view.offsetY,l=r-h*this.view.height}this.projectionMatrix.makeOrthographic(a,o,r,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ms=4,wl=[.125,.215,.35,.446,.526,.582],Vi=20,Jo=new Lc,El=new He;let Zo=null,Qo=0,er=0,tr=!1;const Gi=(1+Math.sqrt(5))/2,ps=1/Gi,Tl=[new U(-Gi,ps,0),new U(Gi,ps,0),new U(-ps,0,Gi),new U(ps,0,Gi),new U(0,Gi,-ps),new U(0,Gi,ps),new U(-1,1,-1),new U(1,1,-1),new U(-1,1,1),new U(1,1,1)];class Al{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100){Zo=this._renderer.getRenderTarget(),Qo=this._renderer.getActiveCubeFace(),er=this._renderer.getActiveMipmapLevel(),tr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(e,i,s,a),t>0&&this._blur(a,0,0,t),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Pl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Rl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Zo,Qo,er),this._renderer.xr.enabled=tr,e.scissorTest=!1,Fa(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===As||e.mapping===Cs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Zo=this._renderer.getRenderTarget(),Qo=this._renderer.getActiveCubeFace(),er=this._renderer.getActiveMipmapLevel(),tr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Nn,minFilter:Nn,generateMipmaps:!1,type:da,format:On,colorSpace:Ri,depthBuffer:!1},s=Cl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Cl(e,t,i);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=w0(a)),this._blurMaterial=E0(a,e,t)}return s}_compileMaterial(e){const t=new Z(this._lodPlanes[0],e);this._renderer.compile(t,Jo)}_sceneToCubeUV(e,t,i,s){const r=new In(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(El),h.toneMapping=Ei,h.autoClear=!1;const f=new Vt({name:"PMREM.Background",side:vn,depthWrite:!1,depthTest:!1}),g=new Z(new Ut,f);let b=!1;const p=e.background;p?p.isColor&&(f.color.copy(p),e.background=null,b=!0):(f.color.copy(El),b=!0);for(let m=0;m<6;m++){const y=m%3;y===0?(r.up.set(0,l[m],0),r.lookAt(c[m],0,0)):y===1?(r.up.set(0,0,l[m]),r.lookAt(0,c[m],0)):(r.up.set(0,l[m],0),r.lookAt(0,0,c[m]));const v=this._cubeSize;Fa(s,y*v,m>2?v:0,v,v),h.setRenderTarget(s),b&&h.render(g,r),h.render(e,r)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=d,e.background=p}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===As||e.mapping===Cs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Pl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Rl());const a=s?this._cubemapMaterial:this._equirectMaterial,o=new Z(this._lodPlanes[0],a),r=a.uniforms;r.envMap.value=e;const l=this._cubeSize;Fa(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,Jo)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let a=1;a<s;a++){const o=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),r=Tl[(s-a-1)%Tl.length];this._blur(e,a-1,a,o,r)}t.autoClear=i}_blur(e,t,i,s,a){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,s,"latitudinal",a),this._halfBlur(o,e,i,i,s,"longitudinal",a)}_halfBlur(e,t,i,s,a,o,r){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new Z(this._lodPlanes[s],c),u=c.uniforms,f=this._sizeLods[i]-1,g=isFinite(a)?Math.PI/(2*f):2*Math.PI/(2*Vi-1),b=a/g,p=isFinite(a)?1+Math.floor(h*b):Vi;p>Vi&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Vi}`);const m=[];let y=0;for(let S=0;S<Vi;++S){const C=S/b,N=Math.exp(-C*C/2);m.push(N),S===0?y+=N:S<p&&(y+=2*N)}for(let S=0;S<m.length;S++)m[S]=m[S]/y;u.envMap.value=e.texture,u.samples.value=p,u.weights.value=m,u.latitudinal.value=o==="latitudinal",r&&(u.poleAxis.value=r);const{_lodMax:v}=this;u.dTheta.value=g,u.mipInt.value=v-i;const x=this._sizeLods[s],T=3*x*(s>v-Ms?s-v+Ms:0),M=4*(this._cubeSize-x);Fa(t,T,M,3*x,2*x),l.setRenderTarget(t),l.render(d,Jo)}}function w0(n){const e=[],t=[],i=[];let s=n;const a=n-Ms+1+wl.length;for(let o=0;o<a;o++){const r=Math.pow(2,s);t.push(r);let l=1/r;o>n-Ms?l=wl[o-n+Ms-1]:o===0&&(l=0),i.push(l);const c=1/(r-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,b=3,p=2,m=1,y=new Float32Array(b*g*f),v=new Float32Array(p*g*f),x=new Float32Array(m*g*f);for(let M=0;M<f;M++){const S=M%3*2/3-1,C=M>2?0:-1,N=[S,C,0,S+2/3,C,0,S+2/3,C+1,0,S,C,0,S+2/3,C+1,0,S,C+1,0];y.set(N,b*g*M),v.set(u,p*g*M);const _=[M,M,M,M,M,M];x.set(_,m*g*M)}const T=new jt;T.setAttribute("position",new wn(y,b)),T.setAttribute("uv",new wn(v,p)),T.setAttribute("faceIndex",new wn(x,m)),e.push(T),s>Ms&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Cl(n,e,t){const i=new Ji(n,e,t);return i.texture.mapping=mo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Fa(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function E0(n,e,t){const i=new Float32Array(Vi),s=new U(0,1,0);return new Ci({name:"SphericalGaussianBlur",defines:{n:Vi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:kc(),fragmentShader:`

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
		`,blending:wi,depthTest:!1,depthWrite:!1})}function Rl(){return new Ci({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:kc(),fragmentShader:`

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
		`,blending:wi,depthTest:!1,depthWrite:!1})}function Pl(){return new Ci({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:kc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wi,depthTest:!1,depthWrite:!1})}function kc(){return`

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
	`}function T0(n){let e=new WeakMap,t=null;function i(r){if(r&&r.isTexture){const l=r.mapping,c=l===Cr||l===Rr,h=l===As||l===Cs;if(c||h){let d=e.get(r);const u=d!==void 0?d.texture.pmremVersion:0;if(r.isRenderTargetTexture&&r.pmremVersion!==u)return t===null&&(t=new Al(n)),d=c?t.fromEquirectangular(r,d):t.fromCubemap(r,d),d.texture.pmremVersion=r.pmremVersion,e.set(r,d),d.texture;if(d!==void 0)return d.texture;{const f=r.image;return c&&f&&f.height>0||h&&f&&s(f)?(t===null&&(t=new Al(n)),d=c?t.fromEquirectangular(r):t.fromCubemap(r),d.texture.pmremVersion=r.pmremVersion,e.set(r,d),r.addEventListener("dispose",a),d.texture):null}}}return r}function s(r){let l=0;const c=6;for(let h=0;h<c;h++)r[h]!==void 0&&l++;return l===c}function a(r){const l=r.target;l.removeEventListener("dispose",a);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function A0(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&Za("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function C0(n,e,t,i){const s={},a=new WeakMap;function o(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);for(const g in u.morphAttributes){const b=u.morphAttributes[g];for(let p=0,m=b.length;p<m;p++)e.remove(b[p])}u.removeEventListener("dispose",o),delete s[u.id];const f=a.get(u);f&&(e.remove(f),a.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function r(d,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,t.memory.geometries++),u}function l(d){const u=d.attributes;for(const g in u)e.update(u[g],n.ARRAY_BUFFER);const f=d.morphAttributes;for(const g in f){const b=f[g];for(let p=0,m=b.length;p<m;p++)e.update(b[p],n.ARRAY_BUFFER)}}function c(d){const u=[],f=d.index,g=d.attributes.position;let b=0;if(f!==null){const y=f.array;b=f.version;for(let v=0,x=y.length;v<x;v+=3){const T=y[v+0],M=y[v+1],S=y[v+2];u.push(T,M,M,S,S,T)}}else if(g!==void 0){const y=g.array;b=g.version;for(let v=0,x=y.length/3-1;v<x;v+=3){const T=v+0,M=v+1,S=v+2;u.push(T,M,M,S,S,T)}}else return;const p=new(id(u)?cd:rd)(u,1);p.version=b;const m=a.get(d);m&&e.remove(m),a.set(d,p)}function h(d){const u=a.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return a.get(d)}return{get:r,update:l,getWireframeAttribute:h}}function R0(n,e,t){let i;function s(u){i=u}let a,o;function r(u){a=u.type,o=u.bytesPerElement}function l(u,f){n.drawElements(i,f,a,u*o),t.update(f,i,1)}function c(u,f,g){g!==0&&(n.drawElementsInstanced(i,f,a,u*o,g),t.update(f,i,g))}function h(u,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,a,u,0,g);let p=0;for(let m=0;m<g;m++)p+=f[m];t.update(p,i,1)}function d(u,f,g,b){if(g===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<u.length;m++)c(u[m]/o,f[m],b[m]);else{p.multiDrawElementsInstancedWEBGL(i,f,0,a,u,0,b,0,g);let m=0;for(let y=0;y<g;y++)m+=f[y];for(let y=0;y<b.length;y++)t.update(m,i,b[y])}}this.setMode=s,this.setIndex=r,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function P0(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,o,r){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=r*(a/3);break;case n.LINES:t.lines+=r*(a/2);break;case n.LINE_STRIP:t.lines+=r*(a-1);break;case n.LINE_LOOP:t.lines+=r*a;break;case n.POINTS:t.points+=r*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function L0(n,e,t){const i=new WeakMap,s=new Tt;function a(o,r,l){const c=o.morphTargetInfluences,h=r.morphAttributes.position||r.morphAttributes.normal||r.morphAttributes.color,d=h!==void 0?h.length:0;let u=i.get(r);if(u===void 0||u.count!==d){let N=function(){S.dispose(),i.delete(r),r.removeEventListener("dispose",N)};u!==void 0&&u.texture.dispose();const f=r.morphAttributes.position!==void 0,g=r.morphAttributes.normal!==void 0,b=r.morphAttributes.color!==void 0,p=r.morphAttributes.position||[],m=r.morphAttributes.normal||[],y=r.morphAttributes.color||[];let v=0;f===!0&&(v=1),g===!0&&(v=2),b===!0&&(v=3);let x=r.attributes.position.count*v,T=1;x>e.maxTextureSize&&(T=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);const M=new Float32Array(x*T*4*d),S=new ad(M,x,T,d);S.type=ai,S.needsUpdate=!0;const C=v*4;for(let _=0;_<d;_++){const w=p[_],L=m[_],I=y[_],B=x*T*4*_;for(let j=0;j<w.count;j++){const F=j*C;f===!0&&(s.fromBufferAttribute(w,j),M[B+F+0]=s.x,M[B+F+1]=s.y,M[B+F+2]=s.z,M[B+F+3]=0),g===!0&&(s.fromBufferAttribute(L,j),M[B+F+4]=s.x,M[B+F+5]=s.y,M[B+F+6]=s.z,M[B+F+7]=0),b===!0&&(s.fromBufferAttribute(I,j),M[B+F+8]=s.x,M[B+F+9]=s.y,M[B+F+10]=s.z,M[B+F+11]=I.itemSize===4?s.w:1)}}u={count:d,texture:S,size:new Se(x,T)},i.set(r,u),r.addEventListener("dispose",N)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let f=0;for(let b=0;b<c.length;b++)f+=c[b];const g=r.morphTargetsRelative?1:1-f;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:a}}function k0(n,e,t,i){let s=new WeakMap;function a(l){const c=i.render.frame,h=l.geometry,d=e.get(l,h);if(s.get(d)!==c&&(e.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",r)===!1&&l.addEventListener("dispose",r),s.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;s.get(u)!==c&&(u.update(),s.set(u,c))}return d}function o(){s=new WeakMap}function r(l){const c=l.target;c.removeEventListener("dispose",r),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:a,dispose:o}}class fd extends rn{constructor(e,t,i,s,a,o,r,l,c,h=Ss){if(h!==Ss&&h!==Ps)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Ss&&(i=Ki),i===void 0&&h===Ps&&(i=Rs),super(null,s,a,o,r,l,h,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=r!==void 0?r:Cn,this.minFilter=l!==void 0?l:Cn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const pd=new rn,Ll=new fd(1,1),md=new ad,gd=new bf,vd=new dd,kl=[],Dl=[],Il=new Float32Array(16),Nl=new Float32Array(9),Ul=new Float32Array(4);function Is(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let a=kl[s];if(a===void 0&&(a=new Float32Array(s),kl[s]=a),e!==0){i.toArray(a,0);for(let o=1,r=0;o!==e;++o)r+=t,n[o].toArray(a,r)}return a}function Bt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function zt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function bo(n,e){let t=Dl[e];t===void 0&&(t=new Int32Array(e),Dl[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function D0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function I0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;n.uniform2fv(this.addr,e),zt(t,e)}}function N0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Bt(t,e))return;n.uniform3fv(this.addr,e),zt(t,e)}}function U0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;n.uniform4fv(this.addr,e),zt(t,e)}}function F0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Bt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),zt(t,e)}else{if(Bt(t,i))return;Ul.set(i),n.uniformMatrix2fv(this.addr,!1,Ul),zt(t,i)}}function O0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Bt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),zt(t,e)}else{if(Bt(t,i))return;Nl.set(i),n.uniformMatrix3fv(this.addr,!1,Nl),zt(t,i)}}function B0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Bt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),zt(t,e)}else{if(Bt(t,i))return;Il.set(i),n.uniformMatrix4fv(this.addr,!1,Il),zt(t,i)}}function z0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function G0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;n.uniform2iv(this.addr,e),zt(t,e)}}function H0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Bt(t,e))return;n.uniform3iv(this.addr,e),zt(t,e)}}function V0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;n.uniform4iv(this.addr,e),zt(t,e)}}function W0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function $0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;n.uniform2uiv(this.addr,e),zt(t,e)}}function q0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Bt(t,e))return;n.uniform3uiv(this.addr,e),zt(t,e)}}function X0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;n.uniform4uiv(this.addr,e),zt(t,e)}}function Y0(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let a;this.type===n.SAMPLER_2D_SHADOW?(Ll.compareFunction=nd,a=Ll):a=pd,t.setTexture2D(e||a,s)}function j0(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||gd,s)}function K0(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||vd,s)}function J0(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||md,s)}function Z0(n){switch(n){case 5126:return D0;case 35664:return I0;case 35665:return N0;case 35666:return U0;case 35674:return F0;case 35675:return O0;case 35676:return B0;case 5124:case 35670:return z0;case 35667:case 35671:return G0;case 35668:case 35672:return H0;case 35669:case 35673:return V0;case 5125:return W0;case 36294:return $0;case 36295:return q0;case 36296:return X0;case 35678:case 36198:case 36298:case 36306:case 35682:return Y0;case 35679:case 36299:case 36307:return j0;case 35680:case 36300:case 36308:case 36293:return K0;case 36289:case 36303:case 36311:case 36292:return J0}}function Q0(n,e){n.uniform1fv(this.addr,e)}function eg(n,e){const t=Is(e,this.size,2);n.uniform2fv(this.addr,t)}function tg(n,e){const t=Is(e,this.size,3);n.uniform3fv(this.addr,t)}function ng(n,e){const t=Is(e,this.size,4);n.uniform4fv(this.addr,t)}function ig(n,e){const t=Is(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function sg(n,e){const t=Is(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function ag(n,e){const t=Is(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function og(n,e){n.uniform1iv(this.addr,e)}function rg(n,e){n.uniform2iv(this.addr,e)}function cg(n,e){n.uniform3iv(this.addr,e)}function lg(n,e){n.uniform4iv(this.addr,e)}function hg(n,e){n.uniform1uiv(this.addr,e)}function dg(n,e){n.uniform2uiv(this.addr,e)}function ug(n,e){n.uniform3uiv(this.addr,e)}function fg(n,e){n.uniform4uiv(this.addr,e)}function pg(n,e,t){const i=this.cache,s=e.length,a=bo(t,s);Bt(i,a)||(n.uniform1iv(this.addr,a),zt(i,a));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||pd,a[o])}function mg(n,e,t){const i=this.cache,s=e.length,a=bo(t,s);Bt(i,a)||(n.uniform1iv(this.addr,a),zt(i,a));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||gd,a[o])}function gg(n,e,t){const i=this.cache,s=e.length,a=bo(t,s);Bt(i,a)||(n.uniform1iv(this.addr,a),zt(i,a));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||vd,a[o])}function vg(n,e,t){const i=this.cache,s=e.length,a=bo(t,s);Bt(i,a)||(n.uniform1iv(this.addr,a),zt(i,a));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||md,a[o])}function bg(n){switch(n){case 5126:return Q0;case 35664:return eg;case 35665:return tg;case 35666:return ng;case 35674:return ig;case 35675:return sg;case 35676:return ag;case 5124:case 35670:return og;case 35667:case 35671:return rg;case 35668:case 35672:return cg;case 35669:case 35673:return lg;case 5125:return hg;case 36294:return dg;case 36295:return ug;case 36296:return fg;case 35678:case 36198:case 36298:case 36306:case 35682:return pg;case 35679:case 36299:case 36307:return mg;case 35680:case 36300:case 36308:case 36293:return gg;case 36289:case 36303:case 36311:case 36292:return vg}}class yg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Z0(t.type)}}class xg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=bg(t.type)}}class _g{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let a=0,o=s.length;a!==o;++a){const r=s[a];r.setValue(e,t[r.id],i)}}}const nr=/(\w+)(\])?(\[|\.)?/g;function Fl(n,e){n.seq.push(e),n.map[e.id]=e}function Mg(n,e,t){const i=n.name,s=i.length;for(nr.lastIndex=0;;){const a=nr.exec(i),o=nr.lastIndex;let r=a[1];const l=a[2]==="]",c=a[3];if(l&&(r=r|0),c===void 0||c==="["&&o+2===s){Fl(t,c===void 0?new yg(r,n,e):new xg(r,n,e));break}else{let d=t.map[r];d===void 0&&(d=new _g(r),Fl(t,d)),t=d}}}class Qa{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const a=e.getActiveUniform(t,s),o=e.getUniformLocation(t,a.name);Mg(a,o,this)}}setValue(e,t,i,s){const a=this.map[t];a!==void 0&&a.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let a=0,o=t.length;a!==o;++a){const r=t[a],l=i[r.id];l.needsUpdate!==!1&&r.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,a=e.length;s!==a;++s){const o=e[s];o.id in t&&i.push(o)}return i}}function Ol(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Sg=37297;let wg=0;function Eg(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let o=s;o<a;o++){const r=o+1;i.push(`${r===e?">":" "} ${r}: ${t[o]}`)}return i.join(`
`)}function Tg(n){const e=lt.getPrimaries(lt.workingColorSpace),t=lt.getPrimaries(n);let i;switch(e===t?i="":e===co&&t===ro?i="LinearDisplayP3ToLinearSRGB":e===ro&&t===co&&(i="LinearSRGBToLinearDisplayP3"),n){case Ri:case go:return[i,"LinearTransferOETF"];case mn:case Ac:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Bl(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=n.getShaderInfoLog(e).trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+Eg(n.getShaderSource(e),o)}else return s}function Ag(n,e){const t=Tg(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Cg(n,e){let t;switch(e){case Ru:t="Linear";break;case Pu:t="Reinhard";break;case Lu:t="Cineon";break;case Vh:t="ACESFilmic";break;case Du:t="AgX";break;case Iu:t="Neutral";break;case ku:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Oa=new U;function Rg(){lt.getLuminanceCoefficients(Oa);const n=Oa.x.toFixed(4),e=Oa.y.toFixed(4),t=Oa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Pg(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Zs).join(`
`)}function Lg(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function kg(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const a=n.getActiveAttrib(e,s),o=a.name;let r=1;a.type===n.FLOAT_MAT2&&(r=2),a.type===n.FLOAT_MAT3&&(r=3),a.type===n.FLOAT_MAT4&&(r=4),t[o]={type:a.type,location:n.getAttribLocation(e,o),locationSize:r}}return t}function Zs(n){return n!==""}function zl(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Gl(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Dg=/^[ \t]*#include +<([\w\d./]+)>/gm;function sc(n){return n.replace(Dg,Ng)}const Ig=new Map;function Ng(n,e){let t=We[e];if(t===void 0){const i=Ig.get(e);if(i!==void 0)t=We[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return sc(t)}const Ug=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Hl(n){return n.replace(Ug,Fg)}function Fg(n,e,t,i){let s="";for(let a=parseInt(e);a<parseInt(t);a++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return s}function Vl(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Og(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===zh?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Gh?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===ni&&(e="SHADOWMAP_TYPE_VSM"),e}function Bg(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case As:case Cs:e="ENVMAP_TYPE_CUBE";break;case mo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function zg(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Cs:e="ENVMAP_MODE_REFRACTION";break}return e}function Gg(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Hh:e="ENVMAP_BLENDING_MULTIPLY";break;case Au:e="ENVMAP_BLENDING_MIX";break;case Cu:e="ENVMAP_BLENDING_ADD";break}return e}function Hg(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function Vg(n,e,t,i){const s=n.getContext(),a=t.defines;let o=t.vertexShader,r=t.fragmentShader;const l=Og(t),c=Bg(t),h=zg(t),d=Gg(t),u=Hg(t),f=Pg(t),g=Lg(a),b=s.createProgram();let p,m,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Zs).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Zs).join(`
`),m.length>0&&(m+=`
`)):(p=[Vl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Zs).join(`
`),m=[Vl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ei?"#define TONE_MAPPING":"",t.toneMapping!==Ei?We.tonemapping_pars_fragment:"",t.toneMapping!==Ei?Cg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,Ag("linearToOutputTexel",t.outputColorSpace),Rg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Zs).join(`
`)),o=sc(o),o=zl(o,t),o=Gl(o,t),r=sc(r),r=zl(r,t),r=Gl(r,t),o=Hl(o),r=Hl(r),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===al?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===al?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const v=y+p+o,x=y+m+r,T=Ol(s,s.VERTEX_SHADER,v),M=Ol(s,s.FRAGMENT_SHADER,x);s.attachShader(b,T),s.attachShader(b,M),t.index0AttributeName!==void 0?s.bindAttribLocation(b,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(b,0,"position"),s.linkProgram(b);function S(w){if(n.debug.checkShaderErrors){const L=s.getProgramInfoLog(b).trim(),I=s.getShaderInfoLog(T).trim(),B=s.getShaderInfoLog(M).trim();let j=!0,F=!0;if(s.getProgramParameter(b,s.LINK_STATUS)===!1)if(j=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,b,T,M);else{const Q=Bl(s,T,"vertex"),K=Bl(s,M,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(b,s.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+L+`
`+Q+`
`+K)}else L!==""?console.warn("THREE.WebGLProgram: Program Info Log:",L):(I===""||B==="")&&(F=!1);F&&(w.diagnostics={runnable:j,programLog:L,vertexShader:{log:I,prefix:p},fragmentShader:{log:B,prefix:m}})}s.deleteShader(T),s.deleteShader(M),C=new Qa(s,b),N=kg(s,b)}let C;this.getUniforms=function(){return C===void 0&&S(this),C};let N;this.getAttributes=function(){return N===void 0&&S(this),N};let _=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=s.getProgramParameter(b,Sg)),_},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(b),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=wg++,this.cacheKey=e,this.usedTimes=1,this.program=b,this.vertexShader=T,this.fragmentShader=M,this}let Wg=0;class $g{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),a=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(a)===!1&&(o.add(a),a.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new qg(e),t.set(e,i)),i}}class qg{constructor(e){this.id=Wg++,this.code=e,this.usedTimes=0}}function Xg(n,e,t,i,s,a,o){const r=new Rc,l=new $g,c=new Set,h=[],d=s.logarithmicDepthBuffer,u=s.reverseDepthBuffer,f=s.vertexTextures;let g=s.precision;const b={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(_){return c.add(_),_===0?"uv":`uv${_}`}function m(_,w,L,I,B){const j=I.fog,F=B.geometry,Q=_.isMeshStandardMaterial?I.environment:null,K=(_.isMeshStandardMaterial?t:e).get(_.envMap||Q),me=K&&K.mapping===mo?K.image.height:null,ge=b[_.type];_.precision!==null&&(g=s.getMaxPrecision(_.precision),g!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",g,"instead."));const Ae=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,je=Ae!==void 0?Ae.length:0;let Ke=0;F.morphAttributes.position!==void 0&&(Ke=1),F.morphAttributes.normal!==void 0&&(Ke=2),F.morphAttributes.color!==void 0&&(Ke=3);let ee,ae,Te,ye;if(ge){const dn=Hn[ge];ee=dn.vertexShader,ae=dn.fragmentShader}else ee=_.vertexShader,ae=_.fragmentShader,l.update(_),Te=l.getVertexShaderID(_),ye=l.getFragmentShaderID(_);const X=n.getRenderTarget(),ne=B.isInstancedMesh===!0,be=B.isBatchedMesh===!0,Fe=!!_.map,Ne=!!_.matcap,D=!!K,St=!!_.aoMap,qe=!!_.lightMap,Ye=!!_.bumpMap,Oe=!!_.normalMap,ut=!!_.displacementMap,Be=!!_.emissiveMap,R=!!_.metalnessMap,E=!!_.roughnessMap,W=_.anisotropy>0,se=_.clearcoat>0,oe=_.dispersion>0,ie=_.iridescence>0,Pe=_.sheen>0,xe=_.transmission>0,we=W&&!!_.anisotropyMap,Qe=se&&!!_.clearcoatMap,de=se&&!!_.clearcoatNormalMap,k=se&&!!_.clearcoatRoughnessMap,z=ie&&!!_.iridescenceMap,$=ie&&!!_.iridescenceThicknessMap,O=Pe&&!!_.sheenColorMap,te=Pe&&!!_.sheenRoughnessMap,ce=!!_.specularMap,ue=!!_.specularColorMap,P=!!_.specularIntensityMap,re=xe&&!!_.transmissionMap,V=xe&&!!_.thicknessMap,J=!!_.gradientMap,le=!!_.alphaMap,ve=_.alphaTest>0,Je=!!_.alphaHash,Lt=!!_.extensions;let hn=Ei;_.toneMapped&&(X===null||X.isXRRenderTarget===!0)&&(hn=n.toneMapping);const st={shaderID:ge,shaderType:_.type,shaderName:_.name,vertexShader:ee,fragmentShader:ae,defines:_.defines,customVertexShaderID:Te,customFragmentShaderID:ye,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:g,batching:be,batchingColor:be&&B._colorsTexture!==null,instancing:ne,instancingColor:ne&&B.instanceColor!==null,instancingMorph:ne&&B.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:X===null?n.outputColorSpace:X.isXRRenderTarget===!0?X.texture.colorSpace:Ri,alphaToCoverage:!!_.alphaToCoverage,map:Fe,matcap:Ne,envMap:D,envMapMode:D&&K.mapping,envMapCubeUVHeight:me,aoMap:St,lightMap:qe,bumpMap:Ye,normalMap:Oe,displacementMap:f&&ut,emissiveMap:Be,normalMapObjectSpace:Oe&&_.normalMapType===Ou,normalMapTangentSpace:Oe&&_.normalMapType===td,metalnessMap:R,roughnessMap:E,anisotropy:W,anisotropyMap:we,clearcoat:se,clearcoatMap:Qe,clearcoatNormalMap:de,clearcoatRoughnessMap:k,dispersion:oe,iridescence:ie,iridescenceMap:z,iridescenceThicknessMap:$,sheen:Pe,sheenColorMap:O,sheenRoughnessMap:te,specularMap:ce,specularColorMap:ue,specularIntensityMap:P,transmission:xe,transmissionMap:re,thicknessMap:V,gradientMap:J,opaque:_.transparent===!1&&_.blending===Yi&&_.alphaToCoverage===!1,alphaMap:le,alphaTest:ve,alphaHash:Je,combine:_.combine,mapUv:Fe&&p(_.map.channel),aoMapUv:St&&p(_.aoMap.channel),lightMapUv:qe&&p(_.lightMap.channel),bumpMapUv:Ye&&p(_.bumpMap.channel),normalMapUv:Oe&&p(_.normalMap.channel),displacementMapUv:ut&&p(_.displacementMap.channel),emissiveMapUv:Be&&p(_.emissiveMap.channel),metalnessMapUv:R&&p(_.metalnessMap.channel),roughnessMapUv:E&&p(_.roughnessMap.channel),anisotropyMapUv:we&&p(_.anisotropyMap.channel),clearcoatMapUv:Qe&&p(_.clearcoatMap.channel),clearcoatNormalMapUv:de&&p(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:k&&p(_.clearcoatRoughnessMap.channel),iridescenceMapUv:z&&p(_.iridescenceMap.channel),iridescenceThicknessMapUv:$&&p(_.iridescenceThicknessMap.channel),sheenColorMapUv:O&&p(_.sheenColorMap.channel),sheenRoughnessMapUv:te&&p(_.sheenRoughnessMap.channel),specularMapUv:ce&&p(_.specularMap.channel),specularColorMapUv:ue&&p(_.specularColorMap.channel),specularIntensityMapUv:P&&p(_.specularIntensityMap.channel),transmissionMapUv:re&&p(_.transmissionMap.channel),thicknessMapUv:V&&p(_.thicknessMap.channel),alphaMapUv:le&&p(_.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(Oe||W),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!F.attributes.uv&&(Fe||le),fog:!!j,useFog:_.fog===!0,fogExp2:!!j&&j.isFogExp2,flatShading:_.flatShading===!0,sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:u,skinning:B.isSkinnedMesh===!0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:je,morphTextureStride:Ke,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:hn,decodeVideoTexture:Fe&&_.map.isVideoTexture===!0&&lt.getTransfer(_.map.colorSpace)===xt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Sn,flipSided:_.side===vn,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:Lt&&_.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Lt&&_.extensions.multiDraw===!0||be)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return st.vertexUv1s=c.has(1),st.vertexUv2s=c.has(2),st.vertexUv3s=c.has(3),c.clear(),st}function y(_){const w=[];if(_.shaderID?w.push(_.shaderID):(w.push(_.customVertexShaderID),w.push(_.customFragmentShaderID)),_.defines!==void 0)for(const L in _.defines)w.push(L),w.push(_.defines[L]);return _.isRawShaderMaterial===!1&&(v(w,_),x(w,_),w.push(n.outputColorSpace)),w.push(_.customProgramCacheKey),w.join()}function v(_,w){_.push(w.precision),_.push(w.outputColorSpace),_.push(w.envMapMode),_.push(w.envMapCubeUVHeight),_.push(w.mapUv),_.push(w.alphaMapUv),_.push(w.lightMapUv),_.push(w.aoMapUv),_.push(w.bumpMapUv),_.push(w.normalMapUv),_.push(w.displacementMapUv),_.push(w.emissiveMapUv),_.push(w.metalnessMapUv),_.push(w.roughnessMapUv),_.push(w.anisotropyMapUv),_.push(w.clearcoatMapUv),_.push(w.clearcoatNormalMapUv),_.push(w.clearcoatRoughnessMapUv),_.push(w.iridescenceMapUv),_.push(w.iridescenceThicknessMapUv),_.push(w.sheenColorMapUv),_.push(w.sheenRoughnessMapUv),_.push(w.specularMapUv),_.push(w.specularColorMapUv),_.push(w.specularIntensityMapUv),_.push(w.transmissionMapUv),_.push(w.thicknessMapUv),_.push(w.combine),_.push(w.fogExp2),_.push(w.sizeAttenuation),_.push(w.morphTargetsCount),_.push(w.morphAttributeCount),_.push(w.numDirLights),_.push(w.numPointLights),_.push(w.numSpotLights),_.push(w.numSpotLightMaps),_.push(w.numHemiLights),_.push(w.numRectAreaLights),_.push(w.numDirLightShadows),_.push(w.numPointLightShadows),_.push(w.numSpotLightShadows),_.push(w.numSpotLightShadowsWithMaps),_.push(w.numLightProbes),_.push(w.shadowMapType),_.push(w.toneMapping),_.push(w.numClippingPlanes),_.push(w.numClipIntersection),_.push(w.depthPacking)}function x(_,w){r.disableAll(),w.supportsVertexTextures&&r.enable(0),w.instancing&&r.enable(1),w.instancingColor&&r.enable(2),w.instancingMorph&&r.enable(3),w.matcap&&r.enable(4),w.envMap&&r.enable(5),w.normalMapObjectSpace&&r.enable(6),w.normalMapTangentSpace&&r.enable(7),w.clearcoat&&r.enable(8),w.iridescence&&r.enable(9),w.alphaTest&&r.enable(10),w.vertexColors&&r.enable(11),w.vertexAlphas&&r.enable(12),w.vertexUv1s&&r.enable(13),w.vertexUv2s&&r.enable(14),w.vertexUv3s&&r.enable(15),w.vertexTangents&&r.enable(16),w.anisotropy&&r.enable(17),w.alphaHash&&r.enable(18),w.batching&&r.enable(19),w.dispersion&&r.enable(20),w.batchingColor&&r.enable(21),_.push(r.mask),r.disableAll(),w.fog&&r.enable(0),w.useFog&&r.enable(1),w.flatShading&&r.enable(2),w.logarithmicDepthBuffer&&r.enable(3),w.reverseDepthBuffer&&r.enable(4),w.skinning&&r.enable(5),w.morphTargets&&r.enable(6),w.morphNormals&&r.enable(7),w.morphColors&&r.enable(8),w.premultipliedAlpha&&r.enable(9),w.shadowMapEnabled&&r.enable(10),w.doubleSided&&r.enable(11),w.flipSided&&r.enable(12),w.useDepthPacking&&r.enable(13),w.dithering&&r.enable(14),w.transmission&&r.enable(15),w.sheen&&r.enable(16),w.opaque&&r.enable(17),w.pointsUvs&&r.enable(18),w.decodeVideoTexture&&r.enable(19),w.alphaToCoverage&&r.enable(20),_.push(r.mask)}function T(_){const w=b[_.type];let L;if(w){const I=Hn[w];L=Pf.clone(I.uniforms)}else L=_.uniforms;return L}function M(_,w){let L;for(let I=0,B=h.length;I<B;I++){const j=h[I];if(j.cacheKey===w){L=j,++L.usedTimes;break}}return L===void 0&&(L=new Vg(n,w,_,a),h.push(L)),L}function S(_){if(--_.usedTimes===0){const w=h.indexOf(_);h[w]=h[h.length-1],h.pop(),_.destroy()}}function C(_){l.remove(_)}function N(){l.dispose()}return{getParameters:m,getProgramCacheKey:y,getUniforms:T,acquireProgram:M,releaseProgram:S,releaseShaderCache:C,programs:h,dispose:N}}function Yg(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let r=n.get(o);return r===void 0&&(r={},n.set(o,r)),r}function i(o){n.delete(o)}function s(o,r,l){n.get(o)[r]=l}function a(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:a}}function jg(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Wl(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function $l(){const n=[];let e=0;const t=[],i=[],s=[];function a(){e=0,t.length=0,i.length=0,s.length=0}function o(d,u,f,g,b,p){let m=n[e];return m===void 0?(m={id:d.id,object:d,geometry:u,material:f,groupOrder:g,renderOrder:d.renderOrder,z:b,group:p},n[e]=m):(m.id=d.id,m.object=d,m.geometry=u,m.material=f,m.groupOrder=g,m.renderOrder=d.renderOrder,m.z=b,m.group=p),e++,m}function r(d,u,f,g,b,p){const m=o(d,u,f,g,b,p);f.transmission>0?i.push(m):f.transparent===!0?s.push(m):t.push(m)}function l(d,u,f,g,b,p){const m=o(d,u,f,g,b,p);f.transmission>0?i.unshift(m):f.transparent===!0?s.unshift(m):t.unshift(m)}function c(d,u){t.length>1&&t.sort(d||jg),i.length>1&&i.sort(u||Wl),s.length>1&&s.sort(u||Wl)}function h(){for(let d=e,u=n.length;d<u;d++){const f=n[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:i,transparent:s,init:a,push:r,unshift:l,finish:h,sort:c}}function Kg(){let n=new WeakMap;function e(i,s){const a=n.get(i);let o;return a===void 0?(o=new $l,n.set(i,[o])):s>=a.length?(o=new $l,a.push(o)):o=a[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function Jg(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new He};break;case"SpotLight":t={position:new U,direction:new U,color:new He,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new He,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new He,groundColor:new He};break;case"RectAreaLight":t={color:new He,position:new U,halfWidth:new U,halfHeight:new U};break}return n[e.id]=t,t}}}function Zg(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Qg=0;function ev(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function tv(n){const e=new Jg,t=Zg(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new U);const s=new U,a=new gt,o=new gt;function r(c){let h=0,d=0,u=0;for(let N=0;N<9;N++)i.probe[N].set(0,0,0);let f=0,g=0,b=0,p=0,m=0,y=0,v=0,x=0,T=0,M=0,S=0;c.sort(ev);for(let N=0,_=c.length;N<_;N++){const w=c[N],L=w.color,I=w.intensity,B=w.distance,j=w.shadow&&w.shadow.map?w.shadow.map.texture:null;if(w.isAmbientLight)h+=L.r*I,d+=L.g*I,u+=L.b*I;else if(w.isLightProbe){for(let F=0;F<9;F++)i.probe[F].addScaledVector(w.sh.coefficients[F],I);S++}else if(w.isDirectionalLight){const F=e.get(w);if(F.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){const Q=w.shadow,K=t.get(w);K.shadowIntensity=Q.intensity,K.shadowBias=Q.bias,K.shadowNormalBias=Q.normalBias,K.shadowRadius=Q.radius,K.shadowMapSize=Q.mapSize,i.directionalShadow[f]=K,i.directionalShadowMap[f]=j,i.directionalShadowMatrix[f]=w.shadow.matrix,y++}i.directional[f]=F,f++}else if(w.isSpotLight){const F=e.get(w);F.position.setFromMatrixPosition(w.matrixWorld),F.color.copy(L).multiplyScalar(I),F.distance=B,F.coneCos=Math.cos(w.angle),F.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),F.decay=w.decay,i.spot[b]=F;const Q=w.shadow;if(w.map&&(i.spotLightMap[T]=w.map,T++,Q.updateMatrices(w),w.castShadow&&M++),i.spotLightMatrix[b]=Q.matrix,w.castShadow){const K=t.get(w);K.shadowIntensity=Q.intensity,K.shadowBias=Q.bias,K.shadowNormalBias=Q.normalBias,K.shadowRadius=Q.radius,K.shadowMapSize=Q.mapSize,i.spotShadow[b]=K,i.spotShadowMap[b]=j,x++}b++}else if(w.isRectAreaLight){const F=e.get(w);F.color.copy(L).multiplyScalar(I),F.halfWidth.set(w.width*.5,0,0),F.halfHeight.set(0,w.height*.5,0),i.rectArea[p]=F,p++}else if(w.isPointLight){const F=e.get(w);if(F.color.copy(w.color).multiplyScalar(w.intensity),F.distance=w.distance,F.decay=w.decay,w.castShadow){const Q=w.shadow,K=t.get(w);K.shadowIntensity=Q.intensity,K.shadowBias=Q.bias,K.shadowNormalBias=Q.normalBias,K.shadowRadius=Q.radius,K.shadowMapSize=Q.mapSize,K.shadowCameraNear=Q.camera.near,K.shadowCameraFar=Q.camera.far,i.pointShadow[g]=K,i.pointShadowMap[g]=j,i.pointShadowMatrix[g]=w.shadow.matrix,v++}i.point[g]=F,g++}else if(w.isHemisphereLight){const F=e.get(w);F.skyColor.copy(w.color).multiplyScalar(I),F.groundColor.copy(w.groundColor).multiplyScalar(I),i.hemi[m]=F,m++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=_e.LTC_FLOAT_1,i.rectAreaLTC2=_e.LTC_FLOAT_2):(i.rectAreaLTC1=_e.LTC_HALF_1,i.rectAreaLTC2=_e.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=u;const C=i.hash;(C.directionalLength!==f||C.pointLength!==g||C.spotLength!==b||C.rectAreaLength!==p||C.hemiLength!==m||C.numDirectionalShadows!==y||C.numPointShadows!==v||C.numSpotShadows!==x||C.numSpotMaps!==T||C.numLightProbes!==S)&&(i.directional.length=f,i.spot.length=b,i.rectArea.length=p,i.point.length=g,i.hemi.length=m,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=v,i.pointShadowMap.length=v,i.spotShadow.length=x,i.spotShadowMap.length=x,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=v,i.spotLightMatrix.length=x+T-M,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=M,i.numLightProbes=S,C.directionalLength=f,C.pointLength=g,C.spotLength=b,C.rectAreaLength=p,C.hemiLength=m,C.numDirectionalShadows=y,C.numPointShadows=v,C.numSpotShadows=x,C.numSpotMaps=T,C.numLightProbes=S,i.version=Qg++)}function l(c,h){let d=0,u=0,f=0,g=0,b=0;const p=h.matrixWorldInverse;for(let m=0,y=c.length;m<y;m++){const v=c[m];if(v.isDirectionalLight){const x=i.directional[d];x.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(p),d++}else if(v.isSpotLight){const x=i.spot[f];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(p),x.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(p),f++}else if(v.isRectAreaLight){const x=i.rectArea[g];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(p),o.identity(),a.copy(v.matrixWorld),a.premultiply(p),o.extractRotation(a),x.halfWidth.set(v.width*.5,0,0),x.halfHeight.set(0,v.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(v.isPointLight){const x=i.point[u];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(p),u++}else if(v.isHemisphereLight){const x=i.hemi[b];x.direction.setFromMatrixPosition(v.matrixWorld),x.direction.transformDirection(p),b++}}}return{setup:r,setupView:l,state:i}}function ql(n){const e=new tv(n),t=[],i=[];function s(h){c.camera=h,t.length=0,i.length=0}function a(h){t.push(h)}function o(h){i.push(h)}function r(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:r,setupLightsView:l,pushLight:a,pushShadow:o}}function nv(n){let e=new WeakMap;function t(s,a=0){const o=e.get(s);let r;return o===void 0?(r=new ql(n),e.set(s,[r])):a>=o.length?(r=new ql(n),o.push(r)):r=o[a],r}function i(){e=new WeakMap}return{get:t,dispose:i}}class iv extends Qi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Uu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class sv extends Qi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const av=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ov=`uniform sampler2D shadow_pass;
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
}`;function rv(n,e,t){let i=new Pc;const s=new Se,a=new Se,o=new Tt,r=new iv({depthPacking:Fu}),l=new sv,c={},h=t.maxTextureSize,d={[Ai]:vn,[vn]:Ai,[Sn]:Sn},u=new Ci({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Se},radius:{value:4}},vertexShader:av,fragmentShader:ov}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new jt;g.setAttribute("position",new wn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const b=new Z(g,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=zh;let m=this.type;this.render=function(M,S,C){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||M.length===0)return;const N=n.getRenderTarget(),_=n.getActiveCubeFace(),w=n.getActiveMipmapLevel(),L=n.state;L.setBlending(wi),L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const I=m!==ni&&this.type===ni,B=m===ni&&this.type!==ni;for(let j=0,F=M.length;j<F;j++){const Q=M[j],K=Q.shadow;if(K===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;s.copy(K.mapSize);const me=K.getFrameExtents();if(s.multiply(me),a.copy(K.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(a.x=Math.floor(h/me.x),s.x=a.x*me.x,K.mapSize.x=a.x),s.y>h&&(a.y=Math.floor(h/me.y),s.y=a.y*me.y,K.mapSize.y=a.y)),K.map===null||I===!0||B===!0){const Ae=this.type!==ni?{minFilter:Cn,magFilter:Cn}:{};K.map!==null&&K.map.dispose(),K.map=new Ji(s.x,s.y,Ae),K.map.texture.name=Q.name+".shadowMap",K.camera.updateProjectionMatrix()}n.setRenderTarget(K.map),n.clear();const ge=K.getViewportCount();for(let Ae=0;Ae<ge;Ae++){const je=K.getViewport(Ae);o.set(a.x*je.x,a.y*je.y,a.x*je.z,a.y*je.w),L.viewport(o),K.updateMatrices(Q,Ae),i=K.getFrustum(),x(S,C,K.camera,Q,this.type)}K.isPointLightShadow!==!0&&this.type===ni&&y(K,C),K.needsUpdate=!1}m=this.type,p.needsUpdate=!1,n.setRenderTarget(N,_,w)};function y(M,S){const C=e.update(b);u.defines.VSM_SAMPLES!==M.blurSamples&&(u.defines.VSM_SAMPLES=M.blurSamples,f.defines.VSM_SAMPLES=M.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new Ji(s.x,s.y)),u.uniforms.shadow_pass.value=M.map.texture,u.uniforms.resolution.value=M.mapSize,u.uniforms.radius.value=M.radius,n.setRenderTarget(M.mapPass),n.clear(),n.renderBufferDirect(S,null,C,u,b,null),f.uniforms.shadow_pass.value=M.mapPass.texture,f.uniforms.resolution.value=M.mapSize,f.uniforms.radius.value=M.radius,n.setRenderTarget(M.map),n.clear(),n.renderBufferDirect(S,null,C,f,b,null)}function v(M,S,C,N){let _=null;const w=C.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(w!==void 0)_=w;else if(_=C.isPointLight===!0?l:r,n.localClippingEnabled&&S.clipShadows===!0&&Array.isArray(S.clippingPlanes)&&S.clippingPlanes.length!==0||S.displacementMap&&S.displacementScale!==0||S.alphaMap&&S.alphaTest>0||S.map&&S.alphaTest>0){const L=_.uuid,I=S.uuid;let B=c[L];B===void 0&&(B={},c[L]=B);let j=B[I];j===void 0&&(j=_.clone(),B[I]=j,S.addEventListener("dispose",T)),_=j}if(_.visible=S.visible,_.wireframe=S.wireframe,N===ni?_.side=S.shadowSide!==null?S.shadowSide:S.side:_.side=S.shadowSide!==null?S.shadowSide:d[S.side],_.alphaMap=S.alphaMap,_.alphaTest=S.alphaTest,_.map=S.map,_.clipShadows=S.clipShadows,_.clippingPlanes=S.clippingPlanes,_.clipIntersection=S.clipIntersection,_.displacementMap=S.displacementMap,_.displacementScale=S.displacementScale,_.displacementBias=S.displacementBias,_.wireframeLinewidth=S.wireframeLinewidth,_.linewidth=S.linewidth,C.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const L=n.properties.get(_);L.light=C}return _}function x(M,S,C,N,_){if(M.visible===!1)return;if(M.layers.test(S.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&_===ni)&&(!M.frustumCulled||i.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,M.matrixWorld);const I=e.update(M),B=M.material;if(Array.isArray(B)){const j=I.groups;for(let F=0,Q=j.length;F<Q;F++){const K=j[F],me=B[K.materialIndex];if(me&&me.visible){const ge=v(M,me,N,_);M.onBeforeShadow(n,M,S,C,I,ge,K),n.renderBufferDirect(C,null,I,ge,M,K),M.onAfterShadow(n,M,S,C,I,ge,K)}}}else if(B.visible){const j=v(M,B,N,_);M.onBeforeShadow(n,M,S,C,I,j,null),n.renderBufferDirect(C,null,I,j,M,null),M.onAfterShadow(n,M,S,C,I,j,null)}}const L=M.children;for(let I=0,B=L.length;I<B;I++)x(L[I],S,C,N,_)}function T(M){M.target.removeEventListener("dispose",T);for(const C in c){const N=c[C],_=M.target.uuid;_ in N&&(N[_].dispose(),delete N[_])}}}const cv={[_r]:Mr,[Sr]:Tr,[wr]:Ar,[Ts]:Er,[Mr]:_r,[Tr]:Sr,[Ar]:wr,[Er]:Ts};function lv(n){function e(){let P=!1;const re=new Tt;let V=null;const J=new Tt(0,0,0,0);return{setMask:function(le){V!==le&&!P&&(n.colorMask(le,le,le,le),V=le)},setLocked:function(le){P=le},setClear:function(le,ve,Je,Lt,hn){hn===!0&&(le*=Lt,ve*=Lt,Je*=Lt),re.set(le,ve,Je,Lt),J.equals(re)===!1&&(n.clearColor(le,ve,Je,Lt),J.copy(re))},reset:function(){P=!1,V=null,J.set(-1,0,0,0)}}}function t(){let P=!1,re=!1,V=null,J=null,le=null;return{setReversed:function(ve){re=ve},setTest:function(ve){ve?Te(n.DEPTH_TEST):ye(n.DEPTH_TEST)},setMask:function(ve){V!==ve&&!P&&(n.depthMask(ve),V=ve)},setFunc:function(ve){if(re&&(ve=cv[ve]),J!==ve){switch(ve){case _r:n.depthFunc(n.NEVER);break;case Mr:n.depthFunc(n.ALWAYS);break;case Sr:n.depthFunc(n.LESS);break;case Ts:n.depthFunc(n.LEQUAL);break;case wr:n.depthFunc(n.EQUAL);break;case Er:n.depthFunc(n.GEQUAL);break;case Tr:n.depthFunc(n.GREATER);break;case Ar:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}J=ve}},setLocked:function(ve){P=ve},setClear:function(ve){le!==ve&&(n.clearDepth(ve),le=ve)},reset:function(){P=!1,V=null,J=null,le=null}}}function i(){let P=!1,re=null,V=null,J=null,le=null,ve=null,Je=null,Lt=null,hn=null;return{setTest:function(st){P||(st?Te(n.STENCIL_TEST):ye(n.STENCIL_TEST))},setMask:function(st){re!==st&&!P&&(n.stencilMask(st),re=st)},setFunc:function(st,dn,Yn){(V!==st||J!==dn||le!==Yn)&&(n.stencilFunc(st,dn,Yn),V=st,J=dn,le=Yn)},setOp:function(st,dn,Yn){(ve!==st||Je!==dn||Lt!==Yn)&&(n.stencilOp(st,dn,Yn),ve=st,Je=dn,Lt=Yn)},setLocked:function(st){P=st},setClear:function(st){hn!==st&&(n.clearStencil(st),hn=st)},reset:function(){P=!1,re=null,V=null,J=null,le=null,ve=null,Je=null,Lt=null,hn=null}}}const s=new e,a=new t,o=new i,r=new WeakMap,l=new WeakMap;let c={},h={},d=new WeakMap,u=[],f=null,g=!1,b=null,p=null,m=null,y=null,v=null,x=null,T=null,M=new He(0,0,0),S=0,C=!1,N=null,_=null,w=null,L=null,I=null;const B=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let j=!1,F=0;const Q=n.getParameter(n.VERSION);Q.indexOf("WebGL")!==-1?(F=parseFloat(/^WebGL (\d)/.exec(Q)[1]),j=F>=1):Q.indexOf("OpenGL ES")!==-1&&(F=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),j=F>=2);let K=null,me={};const ge=n.getParameter(n.SCISSOR_BOX),Ae=n.getParameter(n.VIEWPORT),je=new Tt().fromArray(ge),Ke=new Tt().fromArray(Ae);function ee(P,re,V,J){const le=new Uint8Array(4),ve=n.createTexture();n.bindTexture(P,ve),n.texParameteri(P,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(P,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Je=0;Je<V;Je++)P===n.TEXTURE_3D||P===n.TEXTURE_2D_ARRAY?n.texImage3D(re,0,n.RGBA,1,1,J,0,n.RGBA,n.UNSIGNED_BYTE,le):n.texImage2D(re+Je,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,le);return ve}const ae={};ae[n.TEXTURE_2D]=ee(n.TEXTURE_2D,n.TEXTURE_2D,1),ae[n.TEXTURE_CUBE_MAP]=ee(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ae[n.TEXTURE_2D_ARRAY]=ee(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ae[n.TEXTURE_3D]=ee(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Te(n.DEPTH_TEST),a.setFunc(Ts),qe(!1),Ye(el),Te(n.CULL_FACE),D(wi);function Te(P){c[P]!==!0&&(n.enable(P),c[P]=!0)}function ye(P){c[P]!==!1&&(n.disable(P),c[P]=!1)}function X(P,re){return h[P]!==re?(n.bindFramebuffer(P,re),h[P]=re,P===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=re),P===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=re),!0):!1}function ne(P,re){let V=u,J=!1;if(P){V=d.get(re),V===void 0&&(V=[],d.set(re,V));const le=P.textures;if(V.length!==le.length||V[0]!==n.COLOR_ATTACHMENT0){for(let ve=0,Je=le.length;ve<Je;ve++)V[ve]=n.COLOR_ATTACHMENT0+ve;V.length=le.length,J=!0}}else V[0]!==n.BACK&&(V[0]=n.BACK,J=!0);J&&n.drawBuffers(V)}function be(P){return f!==P?(n.useProgram(P),f=P,!0):!1}const Fe={[Hi]:n.FUNC_ADD,[hu]:n.FUNC_SUBTRACT,[du]:n.FUNC_REVERSE_SUBTRACT};Fe[uu]=n.MIN,Fe[fu]=n.MAX;const Ne={[pu]:n.ZERO,[mu]:n.ONE,[gu]:n.SRC_COLOR,[yr]:n.SRC_ALPHA,[Mu]:n.SRC_ALPHA_SATURATE,[xu]:n.DST_COLOR,[bu]:n.DST_ALPHA,[vu]:n.ONE_MINUS_SRC_COLOR,[xr]:n.ONE_MINUS_SRC_ALPHA,[_u]:n.ONE_MINUS_DST_COLOR,[yu]:n.ONE_MINUS_DST_ALPHA,[Su]:n.CONSTANT_COLOR,[wu]:n.ONE_MINUS_CONSTANT_COLOR,[Eu]:n.CONSTANT_ALPHA,[Tu]:n.ONE_MINUS_CONSTANT_ALPHA};function D(P,re,V,J,le,ve,Je,Lt,hn,st){if(P===wi){g===!0&&(ye(n.BLEND),g=!1);return}if(g===!1&&(Te(n.BLEND),g=!0),P!==lu){if(P!==b||st!==C){if((p!==Hi||v!==Hi)&&(n.blendEquation(n.FUNC_ADD),p=Hi,v=Hi),st)switch(P){case Yi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case si:n.blendFunc(n.ONE,n.ONE);break;case tl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case nl:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case Yi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case si:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case tl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case nl:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}m=null,y=null,x=null,T=null,M.set(0,0,0),S=0,b=P,C=st}return}le=le||re,ve=ve||V,Je=Je||J,(re!==p||le!==v)&&(n.blendEquationSeparate(Fe[re],Fe[le]),p=re,v=le),(V!==m||J!==y||ve!==x||Je!==T)&&(n.blendFuncSeparate(Ne[V],Ne[J],Ne[ve],Ne[Je]),m=V,y=J,x=ve,T=Je),(Lt.equals(M)===!1||hn!==S)&&(n.blendColor(Lt.r,Lt.g,Lt.b,hn),M.copy(Lt),S=hn),b=P,C=!1}function St(P,re){P.side===Sn?ye(n.CULL_FACE):Te(n.CULL_FACE);let V=P.side===vn;re&&(V=!V),qe(V),P.blending===Yi&&P.transparent===!1?D(wi):D(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),a.setFunc(P.depthFunc),a.setTest(P.depthTest),a.setMask(P.depthWrite),s.setMask(P.colorWrite);const J=P.stencilWrite;o.setTest(J),J&&(o.setMask(P.stencilWriteMask),o.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),o.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),ut(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?Te(n.SAMPLE_ALPHA_TO_COVERAGE):ye(n.SAMPLE_ALPHA_TO_COVERAGE)}function qe(P){N!==P&&(P?n.frontFace(n.CW):n.frontFace(n.CCW),N=P)}function Ye(P){P!==ru?(Te(n.CULL_FACE),P!==_&&(P===el?n.cullFace(n.BACK):P===cu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ye(n.CULL_FACE),_=P}function Oe(P){P!==w&&(j&&n.lineWidth(P),w=P)}function ut(P,re,V){P?(Te(n.POLYGON_OFFSET_FILL),(L!==re||I!==V)&&(n.polygonOffset(re,V),L=re,I=V)):ye(n.POLYGON_OFFSET_FILL)}function Be(P){P?Te(n.SCISSOR_TEST):ye(n.SCISSOR_TEST)}function R(P){P===void 0&&(P=n.TEXTURE0+B-1),K!==P&&(n.activeTexture(P),K=P)}function E(P,re,V){V===void 0&&(K===null?V=n.TEXTURE0+B-1:V=K);let J=me[V];J===void 0&&(J={type:void 0,texture:void 0},me[V]=J),(J.type!==P||J.texture!==re)&&(K!==V&&(n.activeTexture(V),K=V),n.bindTexture(P,re||ae[P]),J.type=P,J.texture=re)}function W(){const P=me[K];P!==void 0&&P.type!==void 0&&(n.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function se(){try{n.compressedTexImage2D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function oe(){try{n.compressedTexImage3D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ie(){try{n.texSubImage2D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Pe(){try{n.texSubImage3D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function xe(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function we(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Qe(){try{n.texStorage2D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function de(){try{n.texStorage3D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function k(){try{n.texImage2D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function z(){try{n.texImage3D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function $(P){je.equals(P)===!1&&(n.scissor(P.x,P.y,P.z,P.w),je.copy(P))}function O(P){Ke.equals(P)===!1&&(n.viewport(P.x,P.y,P.z,P.w),Ke.copy(P))}function te(P,re){let V=l.get(re);V===void 0&&(V=new WeakMap,l.set(re,V));let J=V.get(P);J===void 0&&(J=n.getUniformBlockIndex(re,P.name),V.set(P,J))}function ce(P,re){const J=l.get(re).get(P);r.get(re)!==J&&(n.uniformBlockBinding(re,J,P.__bindingPointIndex),r.set(re,J))}function ue(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),c={},K=null,me={},h={},d=new WeakMap,u=[],f=null,g=!1,b=null,p=null,m=null,y=null,v=null,x=null,T=null,M=new He(0,0,0),S=0,C=!1,N=null,_=null,w=null,L=null,I=null,je.set(0,0,n.canvas.width,n.canvas.height),Ke.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:Te,disable:ye,bindFramebuffer:X,drawBuffers:ne,useProgram:be,setBlending:D,setMaterial:St,setFlipSided:qe,setCullFace:Ye,setLineWidth:Oe,setPolygonOffset:ut,setScissorTest:Be,activeTexture:R,bindTexture:E,unbindTexture:W,compressedTexImage2D:se,compressedTexImage3D:oe,texImage2D:k,texImage3D:z,updateUBOMapping:te,uniformBlockBinding:ce,texStorage2D:Qe,texStorage3D:de,texSubImage2D:ie,texSubImage3D:Pe,compressedTexSubImage2D:xe,compressedTexSubImage3D:we,scissor:$,viewport:O,reset:ue}}function Xl(n,e,t,i){const s=hv(i);switch(t){case Yh:return n*e;case Kh:return n*e;case Jh:return n*e*2;case Zh:return n*e/s.components*s.byteLength;case wc:return n*e/s.components*s.byteLength;case Qh:return n*e*2/s.components*s.byteLength;case Ec:return n*e*2/s.components*s.byteLength;case jh:return n*e*3/s.components*s.byteLength;case On:return n*e*4/s.components*s.byteLength;case Tc:return n*e*4/s.components*s.byteLength;case Xa:case Ya:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ja:case Ka:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Dr:case Nr:return Math.max(n,16)*Math.max(e,8)/4;case kr:case Ir:return Math.max(n,8)*Math.max(e,8)/2;case Ur:case Fr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Or:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Br:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case zr:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Gr:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Hr:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Vr:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Wr:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case $r:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case qr:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Xr:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Yr:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case jr:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Kr:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Jr:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Zr:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Ja:case Qr:case ec:return Math.ceil(n/4)*Math.ceil(e/4)*16;case ed:case tc:return Math.ceil(n/4)*Math.ceil(e/4)*8;case nc:case ic:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function hv(n){switch(n){case hi:case $h:return{byteLength:1,components:1};case ra:case qh:case da:return{byteLength:2,components:1};case Mc:case Sc:return{byteLength:2,components:4};case Ki:case _c:case ai:return{byteLength:4,components:1};case Xh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function dv(n,e,t,i,s,a,o){const r=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Se,h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,E){return f?new OffscreenCanvas(R,E):ho("canvas")}function b(R,E,W){let se=1;const oe=Be(R);if((oe.width>W||oe.height>W)&&(se=W/Math.max(oe.width,oe.height)),se<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const ie=Math.floor(se*oe.width),Pe=Math.floor(se*oe.height);d===void 0&&(d=g(ie,Pe));const xe=E?g(ie,Pe):d;return xe.width=ie,xe.height=Pe,xe.getContext("2d").drawImage(R,0,0,ie,Pe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+oe.width+"x"+oe.height+") to ("+ie+"x"+Pe+")."),xe}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+oe.width+"x"+oe.height+")."),R;return R}function p(R){return R.generateMipmaps&&R.minFilter!==Cn&&R.minFilter!==Nn}function m(R){n.generateMipmap(R)}function y(R,E,W,se,oe=!1){if(R!==null){if(n[R]!==void 0)return n[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let ie=E;if(E===n.RED&&(W===n.FLOAT&&(ie=n.R32F),W===n.HALF_FLOAT&&(ie=n.R16F),W===n.UNSIGNED_BYTE&&(ie=n.R8)),E===n.RED_INTEGER&&(W===n.UNSIGNED_BYTE&&(ie=n.R8UI),W===n.UNSIGNED_SHORT&&(ie=n.R16UI),W===n.UNSIGNED_INT&&(ie=n.R32UI),W===n.BYTE&&(ie=n.R8I),W===n.SHORT&&(ie=n.R16I),W===n.INT&&(ie=n.R32I)),E===n.RG&&(W===n.FLOAT&&(ie=n.RG32F),W===n.HALF_FLOAT&&(ie=n.RG16F),W===n.UNSIGNED_BYTE&&(ie=n.RG8)),E===n.RG_INTEGER&&(W===n.UNSIGNED_BYTE&&(ie=n.RG8UI),W===n.UNSIGNED_SHORT&&(ie=n.RG16UI),W===n.UNSIGNED_INT&&(ie=n.RG32UI),W===n.BYTE&&(ie=n.RG8I),W===n.SHORT&&(ie=n.RG16I),W===n.INT&&(ie=n.RG32I)),E===n.RGB_INTEGER&&(W===n.UNSIGNED_BYTE&&(ie=n.RGB8UI),W===n.UNSIGNED_SHORT&&(ie=n.RGB16UI),W===n.UNSIGNED_INT&&(ie=n.RGB32UI),W===n.BYTE&&(ie=n.RGB8I),W===n.SHORT&&(ie=n.RGB16I),W===n.INT&&(ie=n.RGB32I)),E===n.RGBA_INTEGER&&(W===n.UNSIGNED_BYTE&&(ie=n.RGBA8UI),W===n.UNSIGNED_SHORT&&(ie=n.RGBA16UI),W===n.UNSIGNED_INT&&(ie=n.RGBA32UI),W===n.BYTE&&(ie=n.RGBA8I),W===n.SHORT&&(ie=n.RGBA16I),W===n.INT&&(ie=n.RGBA32I)),E===n.RGB&&W===n.UNSIGNED_INT_5_9_9_9_REV&&(ie=n.RGB9_E5),E===n.RGBA){const Pe=oe?oo:lt.getTransfer(se);W===n.FLOAT&&(ie=n.RGBA32F),W===n.HALF_FLOAT&&(ie=n.RGBA16F),W===n.UNSIGNED_BYTE&&(ie=Pe===xt?n.SRGB8_ALPHA8:n.RGBA8),W===n.UNSIGNED_SHORT_4_4_4_4&&(ie=n.RGBA4),W===n.UNSIGNED_SHORT_5_5_5_1&&(ie=n.RGB5_A1)}return(ie===n.R16F||ie===n.R32F||ie===n.RG16F||ie===n.RG32F||ie===n.RGBA16F||ie===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ie}function v(R,E){let W;return R?E===null||E===Ki||E===Rs?W=n.DEPTH24_STENCIL8:E===ai?W=n.DEPTH32F_STENCIL8:E===ra&&(W=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Ki||E===Rs?W=n.DEPTH_COMPONENT24:E===ai?W=n.DEPTH_COMPONENT32F:E===ra&&(W=n.DEPTH_COMPONENT16),W}function x(R,E){return p(R)===!0||R.isFramebufferTexture&&R.minFilter!==Cn&&R.minFilter!==Nn?Math.log2(Math.max(E.width,E.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?E.mipmaps.length:1}function T(R){const E=R.target;E.removeEventListener("dispose",T),S(E),E.isVideoTexture&&h.delete(E)}function M(R){const E=R.target;E.removeEventListener("dispose",M),N(E)}function S(R){const E=i.get(R);if(E.__webglInit===void 0)return;const W=R.source,se=u.get(W);if(se){const oe=se[E.__cacheKey];oe.usedTimes--,oe.usedTimes===0&&C(R),Object.keys(se).length===0&&u.delete(W)}i.remove(R)}function C(R){const E=i.get(R);n.deleteTexture(E.__webglTexture);const W=R.source,se=u.get(W);delete se[E.__cacheKey],o.memory.textures--}function N(R){const E=i.get(R);if(R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let se=0;se<6;se++){if(Array.isArray(E.__webglFramebuffer[se]))for(let oe=0;oe<E.__webglFramebuffer[se].length;oe++)n.deleteFramebuffer(E.__webglFramebuffer[se][oe]);else n.deleteFramebuffer(E.__webglFramebuffer[se]);E.__webglDepthbuffer&&n.deleteRenderbuffer(E.__webglDepthbuffer[se])}else{if(Array.isArray(E.__webglFramebuffer))for(let se=0;se<E.__webglFramebuffer.length;se++)n.deleteFramebuffer(E.__webglFramebuffer[se]);else n.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&n.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&n.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let se=0;se<E.__webglColorRenderbuffer.length;se++)E.__webglColorRenderbuffer[se]&&n.deleteRenderbuffer(E.__webglColorRenderbuffer[se]);E.__webglDepthRenderbuffer&&n.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const W=R.textures;for(let se=0,oe=W.length;se<oe;se++){const ie=i.get(W[se]);ie.__webglTexture&&(n.deleteTexture(ie.__webglTexture),o.memory.textures--),i.remove(W[se])}i.remove(R)}let _=0;function w(){_=0}function L(){const R=_;return R>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),_+=1,R}function I(R){const E=[];return E.push(R.wrapS),E.push(R.wrapT),E.push(R.wrapR||0),E.push(R.magFilter),E.push(R.minFilter),E.push(R.anisotropy),E.push(R.internalFormat),E.push(R.format),E.push(R.type),E.push(R.generateMipmaps),E.push(R.premultiplyAlpha),E.push(R.flipY),E.push(R.unpackAlignment),E.push(R.colorSpace),E.join()}function B(R,E){const W=i.get(R);if(R.isVideoTexture&&Oe(R),R.isRenderTargetTexture===!1&&R.version>0&&W.__version!==R.version){const se=R.image;if(se===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(se.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ke(W,R,E);return}}t.bindTexture(n.TEXTURE_2D,W.__webglTexture,n.TEXTURE0+E)}function j(R,E){const W=i.get(R);if(R.version>0&&W.__version!==R.version){Ke(W,R,E);return}t.bindTexture(n.TEXTURE_2D_ARRAY,W.__webglTexture,n.TEXTURE0+E)}function F(R,E){const W=i.get(R);if(R.version>0&&W.__version!==R.version){Ke(W,R,E);return}t.bindTexture(n.TEXTURE_3D,W.__webglTexture,n.TEXTURE0+E)}function Q(R,E){const W=i.get(R);if(R.version>0&&W.__version!==R.version){ee(W,R,E);return}t.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture,n.TEXTURE0+E)}const K={[Pr]:n.REPEAT,[$i]:n.CLAMP_TO_EDGE,[Lr]:n.MIRRORED_REPEAT},me={[Cn]:n.NEAREST,[Nu]:n.NEAREST_MIPMAP_NEAREST,[va]:n.NEAREST_MIPMAP_LINEAR,[Nn]:n.LINEAR,[Ro]:n.LINEAR_MIPMAP_NEAREST,[qi]:n.LINEAR_MIPMAP_LINEAR},ge={[Bu]:n.NEVER,[$u]:n.ALWAYS,[zu]:n.LESS,[nd]:n.LEQUAL,[Gu]:n.EQUAL,[Wu]:n.GEQUAL,[Hu]:n.GREATER,[Vu]:n.NOTEQUAL};function Ae(R,E){if(E.type===ai&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===Nn||E.magFilter===Ro||E.magFilter===va||E.magFilter===qi||E.minFilter===Nn||E.minFilter===Ro||E.minFilter===va||E.minFilter===qi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(R,n.TEXTURE_WRAP_S,K[E.wrapS]),n.texParameteri(R,n.TEXTURE_WRAP_T,K[E.wrapT]),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,K[E.wrapR]),n.texParameteri(R,n.TEXTURE_MAG_FILTER,me[E.magFilter]),n.texParameteri(R,n.TEXTURE_MIN_FILTER,me[E.minFilter]),E.compareFunction&&(n.texParameteri(R,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(R,n.TEXTURE_COMPARE_FUNC,ge[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Cn||E.minFilter!==va&&E.minFilter!==qi||E.type===ai&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||i.get(E).__currentAnisotropy){const W=e.get("EXT_texture_filter_anisotropic");n.texParameterf(R,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy}}}function je(R,E){let W=!1;R.__webglInit===void 0&&(R.__webglInit=!0,E.addEventListener("dispose",T));const se=E.source;let oe=u.get(se);oe===void 0&&(oe={},u.set(se,oe));const ie=I(E);if(ie!==R.__cacheKey){oe[ie]===void 0&&(oe[ie]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,W=!0),oe[ie].usedTimes++;const Pe=oe[R.__cacheKey];Pe!==void 0&&(oe[R.__cacheKey].usedTimes--,Pe.usedTimes===0&&C(E)),R.__cacheKey=ie,R.__webglTexture=oe[ie].texture}return W}function Ke(R,E,W){let se=n.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(se=n.TEXTURE_2D_ARRAY),E.isData3DTexture&&(se=n.TEXTURE_3D);const oe=je(R,E),ie=E.source;t.bindTexture(se,R.__webglTexture,n.TEXTURE0+W);const Pe=i.get(ie);if(ie.version!==Pe.__version||oe===!0){t.activeTexture(n.TEXTURE0+W);const xe=lt.getPrimaries(lt.workingColorSpace),we=E.colorSpace===Mi?null:lt.getPrimaries(E.colorSpace),Qe=E.colorSpace===Mi||xe===we?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Qe);let de=b(E.image,!1,s.maxTextureSize);de=ut(E,de);const k=a.convert(E.format,E.colorSpace),z=a.convert(E.type);let $=y(E.internalFormat,k,z,E.colorSpace,E.isVideoTexture);Ae(se,E);let O;const te=E.mipmaps,ce=E.isVideoTexture!==!0,ue=Pe.__version===void 0||oe===!0,P=ie.dataReady,re=x(E,de);if(E.isDepthTexture)$=v(E.format===Ps,E.type),ue&&(ce?t.texStorage2D(n.TEXTURE_2D,1,$,de.width,de.height):t.texImage2D(n.TEXTURE_2D,0,$,de.width,de.height,0,k,z,null));else if(E.isDataTexture)if(te.length>0){ce&&ue&&t.texStorage2D(n.TEXTURE_2D,re,$,te[0].width,te[0].height);for(let V=0,J=te.length;V<J;V++)O=te[V],ce?P&&t.texSubImage2D(n.TEXTURE_2D,V,0,0,O.width,O.height,k,z,O.data):t.texImage2D(n.TEXTURE_2D,V,$,O.width,O.height,0,k,z,O.data);E.generateMipmaps=!1}else ce?(ue&&t.texStorage2D(n.TEXTURE_2D,re,$,de.width,de.height),P&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,de.width,de.height,k,z,de.data)):t.texImage2D(n.TEXTURE_2D,0,$,de.width,de.height,0,k,z,de.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){ce&&ue&&t.texStorage3D(n.TEXTURE_2D_ARRAY,re,$,te[0].width,te[0].height,de.depth);for(let V=0,J=te.length;V<J;V++)if(O=te[V],E.format!==On)if(k!==null)if(ce){if(P)if(E.layerUpdates.size>0){const le=Xl(O.width,O.height,E.format,E.type);for(const ve of E.layerUpdates){const Je=O.data.subarray(ve*le/O.data.BYTES_PER_ELEMENT,(ve+1)*le/O.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,V,0,0,ve,O.width,O.height,1,k,Je,0,0)}E.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,V,0,0,0,O.width,O.height,de.depth,k,O.data,0,0)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,V,$,O.width,O.height,de.depth,0,O.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ce?P&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,V,0,0,0,O.width,O.height,de.depth,k,z,O.data):t.texImage3D(n.TEXTURE_2D_ARRAY,V,$,O.width,O.height,de.depth,0,k,z,O.data)}else{ce&&ue&&t.texStorage2D(n.TEXTURE_2D,re,$,te[0].width,te[0].height);for(let V=0,J=te.length;V<J;V++)O=te[V],E.format!==On?k!==null?ce?P&&t.compressedTexSubImage2D(n.TEXTURE_2D,V,0,0,O.width,O.height,k,O.data):t.compressedTexImage2D(n.TEXTURE_2D,V,$,O.width,O.height,0,O.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ce?P&&t.texSubImage2D(n.TEXTURE_2D,V,0,0,O.width,O.height,k,z,O.data):t.texImage2D(n.TEXTURE_2D,V,$,O.width,O.height,0,k,z,O.data)}else if(E.isDataArrayTexture)if(ce){if(ue&&t.texStorage3D(n.TEXTURE_2D_ARRAY,re,$,de.width,de.height,de.depth),P)if(E.layerUpdates.size>0){const V=Xl(de.width,de.height,E.format,E.type);for(const J of E.layerUpdates){const le=de.data.subarray(J*V/de.data.BYTES_PER_ELEMENT,(J+1)*V/de.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,J,de.width,de.height,1,k,z,le)}E.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,de.width,de.height,de.depth,k,z,de.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,$,de.width,de.height,de.depth,0,k,z,de.data);else if(E.isData3DTexture)ce?(ue&&t.texStorage3D(n.TEXTURE_3D,re,$,de.width,de.height,de.depth),P&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,de.width,de.height,de.depth,k,z,de.data)):t.texImage3D(n.TEXTURE_3D,0,$,de.width,de.height,de.depth,0,k,z,de.data);else if(E.isFramebufferTexture){if(ue)if(ce)t.texStorage2D(n.TEXTURE_2D,re,$,de.width,de.height);else{let V=de.width,J=de.height;for(let le=0;le<re;le++)t.texImage2D(n.TEXTURE_2D,le,$,V,J,0,k,z,null),V>>=1,J>>=1}}else if(te.length>0){if(ce&&ue){const V=Be(te[0]);t.texStorage2D(n.TEXTURE_2D,re,$,V.width,V.height)}for(let V=0,J=te.length;V<J;V++)O=te[V],ce?P&&t.texSubImage2D(n.TEXTURE_2D,V,0,0,k,z,O):t.texImage2D(n.TEXTURE_2D,V,$,k,z,O);E.generateMipmaps=!1}else if(ce){if(ue){const V=Be(de);t.texStorage2D(n.TEXTURE_2D,re,$,V.width,V.height)}P&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,k,z,de)}else t.texImage2D(n.TEXTURE_2D,0,$,k,z,de);p(E)&&m(se),Pe.__version=ie.version,E.onUpdate&&E.onUpdate(E)}R.__version=E.version}function ee(R,E,W){if(E.image.length!==6)return;const se=je(R,E),oe=E.source;t.bindTexture(n.TEXTURE_CUBE_MAP,R.__webglTexture,n.TEXTURE0+W);const ie=i.get(oe);if(oe.version!==ie.__version||se===!0){t.activeTexture(n.TEXTURE0+W);const Pe=lt.getPrimaries(lt.workingColorSpace),xe=E.colorSpace===Mi?null:lt.getPrimaries(E.colorSpace),we=E.colorSpace===Mi||Pe===xe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,we);const Qe=E.isCompressedTexture||E.image[0].isCompressedTexture,de=E.image[0]&&E.image[0].isDataTexture,k=[];for(let J=0;J<6;J++)!Qe&&!de?k[J]=b(E.image[J],!0,s.maxCubemapSize):k[J]=de?E.image[J].image:E.image[J],k[J]=ut(E,k[J]);const z=k[0],$=a.convert(E.format,E.colorSpace),O=a.convert(E.type),te=y(E.internalFormat,$,O,E.colorSpace),ce=E.isVideoTexture!==!0,ue=ie.__version===void 0||se===!0,P=oe.dataReady;let re=x(E,z);Ae(n.TEXTURE_CUBE_MAP,E);let V;if(Qe){ce&&ue&&t.texStorage2D(n.TEXTURE_CUBE_MAP,re,te,z.width,z.height);for(let J=0;J<6;J++){V=k[J].mipmaps;for(let le=0;le<V.length;le++){const ve=V[le];E.format!==On?$!==null?ce?P&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,le,0,0,ve.width,ve.height,$,ve.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,le,te,ve.width,ve.height,0,ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ce?P&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,le,0,0,ve.width,ve.height,$,O,ve.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,le,te,ve.width,ve.height,0,$,O,ve.data)}}}else{if(V=E.mipmaps,ce&&ue){V.length>0&&re++;const J=Be(k[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,re,te,J.width,J.height)}for(let J=0;J<6;J++)if(de){ce?P&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,k[J].width,k[J].height,$,O,k[J].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,te,k[J].width,k[J].height,0,$,O,k[J].data);for(let le=0;le<V.length;le++){const Je=V[le].image[J].image;ce?P&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,le+1,0,0,Je.width,Je.height,$,O,Je.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,le+1,te,Je.width,Je.height,0,$,O,Je.data)}}else{ce?P&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,$,O,k[J]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,te,$,O,k[J]);for(let le=0;le<V.length;le++){const ve=V[le];ce?P&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,le+1,0,0,$,O,ve.image[J]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,le+1,te,$,O,ve.image[J])}}}p(E)&&m(n.TEXTURE_CUBE_MAP),ie.__version=oe.version,E.onUpdate&&E.onUpdate(E)}R.__version=E.version}function ae(R,E,W,se,oe,ie){const Pe=a.convert(W.format,W.colorSpace),xe=a.convert(W.type),we=y(W.internalFormat,Pe,xe,W.colorSpace);if(!i.get(E).__hasExternalTextures){const de=Math.max(1,E.width>>ie),k=Math.max(1,E.height>>ie);oe===n.TEXTURE_3D||oe===n.TEXTURE_2D_ARRAY?t.texImage3D(oe,ie,we,de,k,E.depth,0,Pe,xe,null):t.texImage2D(oe,ie,we,de,k,0,Pe,xe,null)}t.bindFramebuffer(n.FRAMEBUFFER,R),Ye(E)?r.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,se,oe,i.get(W).__webglTexture,0,qe(E)):(oe===n.TEXTURE_2D||oe>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&oe<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,se,oe,i.get(W).__webglTexture,ie),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Te(R,E,W){if(n.bindRenderbuffer(n.RENDERBUFFER,R),E.depthBuffer){const se=E.depthTexture,oe=se&&se.isDepthTexture?se.type:null,ie=v(E.stencilBuffer,oe),Pe=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,xe=qe(E);Ye(E)?r.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,xe,ie,E.width,E.height):W?n.renderbufferStorageMultisample(n.RENDERBUFFER,xe,ie,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,ie,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Pe,n.RENDERBUFFER,R)}else{const se=E.textures;for(let oe=0;oe<se.length;oe++){const ie=se[oe],Pe=a.convert(ie.format,ie.colorSpace),xe=a.convert(ie.type),we=y(ie.internalFormat,Pe,xe,ie.colorSpace),Qe=qe(E);W&&Ye(E)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Qe,we,E.width,E.height):Ye(E)?r.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Qe,we,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,we,E.width,E.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ye(R,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,R),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(E.depthTexture).__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),B(E.depthTexture,0);const se=i.get(E.depthTexture).__webglTexture,oe=qe(E);if(E.depthTexture.format===Ss)Ye(E)?r.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,se,0,oe):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,se,0);else if(E.depthTexture.format===Ps)Ye(E)?r.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,se,0,oe):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,se,0);else throw new Error("Unknown depthTexture format")}function X(R){const E=i.get(R),W=R.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==R.depthTexture){const se=R.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),se){const oe=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,se.removeEventListener("dispose",oe)};se.addEventListener("dispose",oe),E.__depthDisposeCallback=oe}E.__boundDepthTexture=se}if(R.depthTexture&&!E.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");ye(E.__webglFramebuffer,R)}else if(W){E.__webglDepthbuffer=[];for(let se=0;se<6;se++)if(t.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer[se]),E.__webglDepthbuffer[se]===void 0)E.__webglDepthbuffer[se]=n.createRenderbuffer(),Te(E.__webglDepthbuffer[se],R,!1);else{const oe=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ie=E.__webglDepthbuffer[se];n.bindRenderbuffer(n.RENDERBUFFER,ie),n.framebufferRenderbuffer(n.FRAMEBUFFER,oe,n.RENDERBUFFER,ie)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=n.createRenderbuffer(),Te(E.__webglDepthbuffer,R,!1);else{const se=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=E.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,oe),n.framebufferRenderbuffer(n.FRAMEBUFFER,se,n.RENDERBUFFER,oe)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function ne(R,E,W){const se=i.get(R);E!==void 0&&ae(se.__webglFramebuffer,R,R.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),W!==void 0&&X(R)}function be(R){const E=R.texture,W=i.get(R),se=i.get(E);R.addEventListener("dispose",M);const oe=R.textures,ie=R.isWebGLCubeRenderTarget===!0,Pe=oe.length>1;if(Pe||(se.__webglTexture===void 0&&(se.__webglTexture=n.createTexture()),se.__version=E.version,o.memory.textures++),ie){W.__webglFramebuffer=[];for(let xe=0;xe<6;xe++)if(E.mipmaps&&E.mipmaps.length>0){W.__webglFramebuffer[xe]=[];for(let we=0;we<E.mipmaps.length;we++)W.__webglFramebuffer[xe][we]=n.createFramebuffer()}else W.__webglFramebuffer[xe]=n.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){W.__webglFramebuffer=[];for(let xe=0;xe<E.mipmaps.length;xe++)W.__webglFramebuffer[xe]=n.createFramebuffer()}else W.__webglFramebuffer=n.createFramebuffer();if(Pe)for(let xe=0,we=oe.length;xe<we;xe++){const Qe=i.get(oe[xe]);Qe.__webglTexture===void 0&&(Qe.__webglTexture=n.createTexture(),o.memory.textures++)}if(R.samples>0&&Ye(R)===!1){W.__webglMultisampledFramebuffer=n.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let xe=0;xe<oe.length;xe++){const we=oe[xe];W.__webglColorRenderbuffer[xe]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,W.__webglColorRenderbuffer[xe]);const Qe=a.convert(we.format,we.colorSpace),de=a.convert(we.type),k=y(we.internalFormat,Qe,de,we.colorSpace,R.isXRRenderTarget===!0),z=qe(R);n.renderbufferStorageMultisample(n.RENDERBUFFER,z,k,R.width,R.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.RENDERBUFFER,W.__webglColorRenderbuffer[xe])}n.bindRenderbuffer(n.RENDERBUFFER,null),R.depthBuffer&&(W.__webglDepthRenderbuffer=n.createRenderbuffer(),Te(W.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ie){t.bindTexture(n.TEXTURE_CUBE_MAP,se.__webglTexture),Ae(n.TEXTURE_CUBE_MAP,E);for(let xe=0;xe<6;xe++)if(E.mipmaps&&E.mipmaps.length>0)for(let we=0;we<E.mipmaps.length;we++)ae(W.__webglFramebuffer[xe][we],R,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,we);else ae(W.__webglFramebuffer[xe],R,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0);p(E)&&m(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Pe){for(let xe=0,we=oe.length;xe<we;xe++){const Qe=oe[xe],de=i.get(Qe);t.bindTexture(n.TEXTURE_2D,de.__webglTexture),Ae(n.TEXTURE_2D,Qe),ae(W.__webglFramebuffer,R,Qe,n.COLOR_ATTACHMENT0+xe,n.TEXTURE_2D,0),p(Qe)&&m(n.TEXTURE_2D)}t.unbindTexture()}else{let xe=n.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(xe=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(xe,se.__webglTexture),Ae(xe,E),E.mipmaps&&E.mipmaps.length>0)for(let we=0;we<E.mipmaps.length;we++)ae(W.__webglFramebuffer[we],R,E,n.COLOR_ATTACHMENT0,xe,we);else ae(W.__webglFramebuffer,R,E,n.COLOR_ATTACHMENT0,xe,0);p(E)&&m(xe),t.unbindTexture()}R.depthBuffer&&X(R)}function Fe(R){const E=R.textures;for(let W=0,se=E.length;W<se;W++){const oe=E[W];if(p(oe)){const ie=R.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,Pe=i.get(oe).__webglTexture;t.bindTexture(ie,Pe),m(ie),t.unbindTexture()}}}const Ne=[],D=[];function St(R){if(R.samples>0){if(Ye(R)===!1){const E=R.textures,W=R.width,se=R.height;let oe=n.COLOR_BUFFER_BIT;const ie=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Pe=i.get(R),xe=E.length>1;if(xe)for(let we=0;we<E.length;we++)t.bindFramebuffer(n.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+we,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Pe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+we,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Pe.__webglFramebuffer);for(let we=0;we<E.length;we++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(oe|=n.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(oe|=n.STENCIL_BUFFER_BIT)),xe){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Pe.__webglColorRenderbuffer[we]);const Qe=i.get(E[we]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Qe,0)}n.blitFramebuffer(0,0,W,se,0,0,W,se,oe,n.NEAREST),l===!0&&(Ne.length=0,D.length=0,Ne.push(n.COLOR_ATTACHMENT0+we),R.depthBuffer&&R.resolveDepthBuffer===!1&&(Ne.push(ie),D.push(ie),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,D)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ne))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),xe)for(let we=0;we<E.length;we++){t.bindFramebuffer(n.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+we,n.RENDERBUFFER,Pe.__webglColorRenderbuffer[we]);const Qe=i.get(E[we]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Pe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+we,n.TEXTURE_2D,Qe,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const E=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[E])}}}function qe(R){return Math.min(s.maxSamples,R.samples)}function Ye(R){const E=i.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Oe(R){const E=o.render.frame;h.get(R)!==E&&(h.set(R,E),R.update())}function ut(R,E){const W=R.colorSpace,se=R.format,oe=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||W!==Ri&&W!==Mi&&(lt.getTransfer(W)===xt?(se!==On||oe!==hi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),E}function Be(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=L,this.resetTextureUnits=w,this.setTexture2D=B,this.setTexture2DArray=j,this.setTexture3D=F,this.setTextureCube=Q,this.rebindTextures=ne,this.setupRenderTarget=be,this.updateRenderTargetMipmap=Fe,this.updateMultisampleRenderTarget=St,this.setupDepthRenderbuffer=X,this.setupFrameBufferTexture=ae,this.useMultisampledRTT=Ye}function uv(n,e){function t(i,s=Mi){let a;const o=lt.getTransfer(s);if(i===hi)return n.UNSIGNED_BYTE;if(i===Mc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Sc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Xh)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===$h)return n.BYTE;if(i===qh)return n.SHORT;if(i===ra)return n.UNSIGNED_SHORT;if(i===_c)return n.INT;if(i===Ki)return n.UNSIGNED_INT;if(i===ai)return n.FLOAT;if(i===da)return n.HALF_FLOAT;if(i===Yh)return n.ALPHA;if(i===jh)return n.RGB;if(i===On)return n.RGBA;if(i===Kh)return n.LUMINANCE;if(i===Jh)return n.LUMINANCE_ALPHA;if(i===Ss)return n.DEPTH_COMPONENT;if(i===Ps)return n.DEPTH_STENCIL;if(i===Zh)return n.RED;if(i===wc)return n.RED_INTEGER;if(i===Qh)return n.RG;if(i===Ec)return n.RG_INTEGER;if(i===Tc)return n.RGBA_INTEGER;if(i===Xa||i===Ya||i===ja||i===Ka)if(o===xt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===Xa)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ya)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ja)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ka)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===Xa)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ya)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ja)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ka)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===kr||i===Dr||i===Ir||i===Nr)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===kr)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Dr)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ir)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Nr)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ur||i===Fr||i===Or)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(i===Ur||i===Fr)return o===xt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===Or)return o===xt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Br||i===zr||i===Gr||i===Hr||i===Vr||i===Wr||i===$r||i===qr||i===Xr||i===Yr||i===jr||i===Kr||i===Jr||i===Zr)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(i===Br)return o===xt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===zr)return o===xt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Gr)return o===xt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Hr)return o===xt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Vr)return o===xt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Wr)return o===xt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===$r)return o===xt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===qr)return o===xt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Xr)return o===xt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Yr)return o===xt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===jr)return o===xt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Kr)return o===xt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Jr)return o===xt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Zr)return o===xt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ja||i===Qr||i===ec)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(i===Ja)return o===xt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Qr)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ec)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ed||i===tc||i===nc||i===ic)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(i===Ja)return a.COMPRESSED_RED_RGTC1_EXT;if(i===tc)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===nc)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ic)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Rs?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}class fv extends In{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class $t extends Ot{constructor(){super(),this.isGroup=!0,this.type="Group"}}const pv={type:"move"};class ir{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new $t,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new $t,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new $t,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,a=null,o=null;const r=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const b of e.hand.values()){const p=t.getJointPose(b,i),m=this._getHandJoint(c,b);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,i),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1));r!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&a!==null&&(s=a),s!==null&&(r.matrix.fromArray(s.transform.matrix),r.matrix.decompose(r.position,r.rotation,r.scale),r.matrixWorldNeedsUpdate=!0,s.linearVelocity?(r.hasLinearVelocity=!0,r.linearVelocity.copy(s.linearVelocity)):r.hasLinearVelocity=!1,s.angularVelocity?(r.hasAngularVelocity=!0,r.angularVelocity.copy(s.angularVelocity)):r.hasAngularVelocity=!1,this.dispatchEvent(pv)))}return r!==null&&(r.visible=s!==null),l!==null&&(l.visible=a!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new $t;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const mv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,gv=`
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

}`;class vv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const s=new rn,a=e.properties.get(s);a.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Ci({vertexShader:mv,fragmentShader:gv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Z(new An(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class bv extends ks{constructor(e,t){super();const i=this;let s=null,a=1,o=null,r="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null;const b=new vv,p=t.getContextAttributes();let m=null,y=null;const v=[],x=[],T=new Se;let M=null;const S=new In;S.layers.enable(1),S.viewport=new Tt;const C=new In;C.layers.enable(2),C.viewport=new Tt;const N=[S,C],_=new fv;_.layers.enable(1),_.layers.enable(2);let w=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ee){let ae=v[ee];return ae===void 0&&(ae=new ir,v[ee]=ae),ae.getTargetRaySpace()},this.getControllerGrip=function(ee){let ae=v[ee];return ae===void 0&&(ae=new ir,v[ee]=ae),ae.getGripSpace()},this.getHand=function(ee){let ae=v[ee];return ae===void 0&&(ae=new ir,v[ee]=ae),ae.getHandSpace()};function I(ee){const ae=x.indexOf(ee.inputSource);if(ae===-1)return;const Te=v[ae];Te!==void 0&&(Te.update(ee.inputSource,ee.frame,c||o),Te.dispatchEvent({type:ee.type,data:ee.inputSource}))}function B(){s.removeEventListener("select",I),s.removeEventListener("selectstart",I),s.removeEventListener("selectend",I),s.removeEventListener("squeeze",I),s.removeEventListener("squeezestart",I),s.removeEventListener("squeezeend",I),s.removeEventListener("end",B),s.removeEventListener("inputsourceschange",j);for(let ee=0;ee<v.length;ee++){const ae=x[ee];ae!==null&&(x[ee]=null,v[ee].disconnect(ae))}w=null,L=null,b.reset(),e.setRenderTarget(m),f=null,u=null,d=null,s=null,y=null,Ke.stop(),i.isPresenting=!1,e.setPixelRatio(M),e.setSize(T.width,T.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ee){a=ee,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ee){r=ee,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(ee){c=ee},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(ee){if(s=ee,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",I),s.addEventListener("selectstart",I),s.addEventListener("selectend",I),s.addEventListener("squeeze",I),s.addEventListener("squeezestart",I),s.addEventListener("squeezeend",I),s.addEventListener("end",B),s.addEventListener("inputsourceschange",j),p.xrCompatible!==!0&&await t.makeXRCompatible(),M=e.getPixelRatio(),e.getSize(T),s.renderState.layers===void 0){const ae={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:a};f=new XRWebGLLayer(s,t,ae),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Ji(f.framebufferWidth,f.framebufferHeight,{format:On,type:hi,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let ae=null,Te=null,ye=null;p.depth&&(ye=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ae=p.stencil?Ps:Ss,Te=p.stencil?Rs:Ki);const X={colorFormat:t.RGBA8,depthFormat:ye,scaleFactor:a};d=new XRWebGLBinding(s,t),u=d.createProjectionLayer(X),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new Ji(u.textureWidth,u.textureHeight,{format:On,type:hi,depthTexture:new fd(u.textureWidth,u.textureHeight,Te,void 0,void 0,void 0,void 0,void 0,void 0,ae),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(r),Ke.setContext(s),Ke.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return b.getDepthTexture()};function j(ee){for(let ae=0;ae<ee.removed.length;ae++){const Te=ee.removed[ae],ye=x.indexOf(Te);ye>=0&&(x[ye]=null,v[ye].disconnect(Te))}for(let ae=0;ae<ee.added.length;ae++){const Te=ee.added[ae];let ye=x.indexOf(Te);if(ye===-1){for(let ne=0;ne<v.length;ne++)if(ne>=x.length){x.push(Te),ye=ne;break}else if(x[ne]===null){x[ne]=Te,ye=ne;break}if(ye===-1)break}const X=v[ye];X&&X.connect(Te)}}const F=new U,Q=new U;function K(ee,ae,Te){F.setFromMatrixPosition(ae.matrixWorld),Q.setFromMatrixPosition(Te.matrixWorld);const ye=F.distanceTo(Q),X=ae.projectionMatrix.elements,ne=Te.projectionMatrix.elements,be=X[14]/(X[10]-1),Fe=X[14]/(X[10]+1),Ne=(X[9]+1)/X[5],D=(X[9]-1)/X[5],St=(X[8]-1)/X[0],qe=(ne[8]+1)/ne[0],Ye=be*St,Oe=be*qe,ut=ye/(-St+qe),Be=ut*-St;if(ae.matrixWorld.decompose(ee.position,ee.quaternion,ee.scale),ee.translateX(Be),ee.translateZ(ut),ee.matrixWorld.compose(ee.position,ee.quaternion,ee.scale),ee.matrixWorldInverse.copy(ee.matrixWorld).invert(),X[10]===-1)ee.projectionMatrix.copy(ae.projectionMatrix),ee.projectionMatrixInverse.copy(ae.projectionMatrixInverse);else{const R=be+ut,E=Fe+ut,W=Ye-Be,se=Oe+(ye-Be),oe=Ne*Fe/E*R,ie=D*Fe/E*R;ee.projectionMatrix.makePerspective(W,se,oe,ie,R,E),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert()}}function me(ee,ae){ae===null?ee.matrixWorld.copy(ee.matrix):ee.matrixWorld.multiplyMatrices(ae.matrixWorld,ee.matrix),ee.matrixWorldInverse.copy(ee.matrixWorld).invert()}this.updateCamera=function(ee){if(s===null)return;let ae=ee.near,Te=ee.far;b.texture!==null&&(b.depthNear>0&&(ae=b.depthNear),b.depthFar>0&&(Te=b.depthFar)),_.near=C.near=S.near=ae,_.far=C.far=S.far=Te,(w!==_.near||L!==_.far)&&(s.updateRenderState({depthNear:_.near,depthFar:_.far}),w=_.near,L=_.far);const ye=ee.parent,X=_.cameras;me(_,ye);for(let ne=0;ne<X.length;ne++)me(X[ne],ye);X.length===2?K(_,S,C):_.projectionMatrix.copy(S.projectionMatrix),ge(ee,_,ye)};function ge(ee,ae,Te){Te===null?ee.matrix.copy(ae.matrixWorld):(ee.matrix.copy(Te.matrixWorld),ee.matrix.invert(),ee.matrix.multiply(ae.matrixWorld)),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.updateMatrixWorld(!0),ee.projectionMatrix.copy(ae.projectionMatrix),ee.projectionMatrixInverse.copy(ae.projectionMatrixInverse),ee.isPerspectiveCamera&&(ee.fov=ca*2*Math.atan(1/ee.projectionMatrix.elements[5]),ee.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(ee){l=ee,u!==null&&(u.fixedFoveation=ee),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=ee)},this.hasDepthSensing=function(){return b.texture!==null},this.getDepthSensingMesh=function(){return b.getMesh(_)};let Ae=null;function je(ee,ae){if(h=ae.getViewerPose(c||o),g=ae,h!==null){const Te=h.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let ye=!1;Te.length!==_.cameras.length&&(_.cameras.length=0,ye=!0);for(let ne=0;ne<Te.length;ne++){const be=Te[ne];let Fe=null;if(f!==null)Fe=f.getViewport(be);else{const D=d.getViewSubImage(u,be);Fe=D.viewport,ne===0&&(e.setRenderTargetTextures(y,D.colorTexture,u.ignoreDepthValues?void 0:D.depthStencilTexture),e.setRenderTarget(y))}let Ne=N[ne];Ne===void 0&&(Ne=new In,Ne.layers.enable(ne),Ne.viewport=new Tt,N[ne]=Ne),Ne.matrix.fromArray(be.transform.matrix),Ne.matrix.decompose(Ne.position,Ne.quaternion,Ne.scale),Ne.projectionMatrix.fromArray(be.projectionMatrix),Ne.projectionMatrixInverse.copy(Ne.projectionMatrix).invert(),Ne.viewport.set(Fe.x,Fe.y,Fe.width,Fe.height),ne===0&&(_.matrix.copy(Ne.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),ye===!0&&_.cameras.push(Ne)}const X=s.enabledFeatures;if(X&&X.includes("depth-sensing")){const ne=d.getDepthInformation(Te[0]);ne&&ne.isValid&&ne.texture&&b.init(e,ne,s.renderState)}}for(let Te=0;Te<v.length;Te++){const ye=x[Te],X=v[Te];ye!==null&&X!==void 0&&X.update(ye,ae,c||o)}Ae&&Ae(ee,ae),ae.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ae}),g=null}const Ke=new ud;Ke.setAnimationLoop(je),this.setAnimationLoop=function(ee){Ae=ee},this.dispose=function(){}}}const Fi=new Wn,yv=new gt;function xv(n,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function i(p,m){m.color.getRGB(p.fogColor.value,ld(n)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,y,v,x){m.isMeshBasicMaterial||m.isMeshLambertMaterial?a(p,m):m.isMeshToonMaterial?(a(p,m),d(p,m)):m.isMeshPhongMaterial?(a(p,m),h(p,m)):m.isMeshStandardMaterial?(a(p,m),u(p,m),m.isMeshPhysicalMaterial&&f(p,m,x)):m.isMeshMatcapMaterial?(a(p,m),g(p,m)):m.isMeshDepthMaterial?a(p,m):m.isMeshDistanceMaterial?(a(p,m),b(p,m)):m.isMeshNormalMaterial?a(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&r(p,m)):m.isPointsMaterial?l(p,m,y,v):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function a(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===vn&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===vn&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const y=e.get(m),v=y.envMap,x=y.envMapRotation;v&&(p.envMap.value=v,Fi.copy(x),Fi.x*=-1,Fi.y*=-1,Fi.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Fi.y*=-1,Fi.z*=-1),p.envMapRotation.value.setFromMatrix4(yv.makeRotationFromEuler(Fi)),p.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function r(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,y,v){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*y,p.scale.value=v*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function d(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function u(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,y){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===vn&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=y.texture,p.transmissionSamplerSize.value.set(y.width,y.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function b(p,m){const y=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(y.matrixWorld),p.nearDistance.value=y.shadow.camera.near,p.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function _v(n,e,t,i){let s={},a={},o=[];const r=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,v){const x=v.program;i.uniformBlockBinding(y,x)}function c(y,v){let x=s[y.id];x===void 0&&(g(y),x=h(y),s[y.id]=x,y.addEventListener("dispose",p));const T=v.program;i.updateUBOMapping(y,T);const M=e.render.frame;a[y.id]!==M&&(u(y),a[y.id]=M)}function h(y){const v=d();y.__bindingPointIndex=v;const x=n.createBuffer(),T=y.__size,M=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,x),n.bufferData(n.UNIFORM_BUFFER,T,M),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,v,x),x}function d(){for(let y=0;y<r;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){const v=s[y.id],x=y.uniforms,T=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,v);for(let M=0,S=x.length;M<S;M++){const C=Array.isArray(x[M])?x[M]:[x[M]];for(let N=0,_=C.length;N<_;N++){const w=C[N];if(f(w,M,N,T)===!0){const L=w.__offset,I=Array.isArray(w.value)?w.value:[w.value];let B=0;for(let j=0;j<I.length;j++){const F=I[j],Q=b(F);typeof F=="number"||typeof F=="boolean"?(w.__data[0]=F,n.bufferSubData(n.UNIFORM_BUFFER,L+B,w.__data)):F.isMatrix3?(w.__data[0]=F.elements[0],w.__data[1]=F.elements[1],w.__data[2]=F.elements[2],w.__data[3]=0,w.__data[4]=F.elements[3],w.__data[5]=F.elements[4],w.__data[6]=F.elements[5],w.__data[7]=0,w.__data[8]=F.elements[6],w.__data[9]=F.elements[7],w.__data[10]=F.elements[8],w.__data[11]=0):(F.toArray(w.__data,B),B+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,L,w.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(y,v,x,T){const M=y.value,S=v+"_"+x;if(T[S]===void 0)return typeof M=="number"||typeof M=="boolean"?T[S]=M:T[S]=M.clone(),!0;{const C=T[S];if(typeof M=="number"||typeof M=="boolean"){if(C!==M)return T[S]=M,!0}else if(C.equals(M)===!1)return C.copy(M),!0}return!1}function g(y){const v=y.uniforms;let x=0;const T=16;for(let S=0,C=v.length;S<C;S++){const N=Array.isArray(v[S])?v[S]:[v[S]];for(let _=0,w=N.length;_<w;_++){const L=N[_],I=Array.isArray(L.value)?L.value:[L.value];for(let B=0,j=I.length;B<j;B++){const F=I[B],Q=b(F),K=x%T,me=K%Q.boundary,ge=K+me;x+=me,ge!==0&&T-ge<Q.storage&&(x+=T-ge),L.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=x,x+=Q.storage}}}const M=x%T;return M>0&&(x+=T-M),y.__size=x,y.__cache={},this}function b(y){const v={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=48,v.storage=48):y.isMatrix4?(v.boundary=64,v.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),v}function p(y){const v=y.target;v.removeEventListener("dispose",p);const x=o.indexOf(v.__bindingPointIndex);o.splice(x,1),n.deleteBuffer(s[v.id]),delete s[v.id],delete a[v.id]}function m(){for(const y in s)n.deleteBuffer(s[y]);o=[],s={},a={}}return{bind:l,update:c,dispose:m}}class Mv{constructor(e={}){const{canvas:t=lf(),context:i=null,depth:s=!0,stencil:a=!1,alpha:o=!1,antialias:r=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let u;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");u=i.getContextAttributes().alpha}else u=o;const f=new Uint32Array(4),g=new Int32Array(4);let b=null,p=null;const m=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=mn,this.toneMapping=Ei,this.toneMappingExposure=1;const v=this;let x=!1,T=0,M=0,S=null,C=-1,N=null;const _=new Tt,w=new Tt;let L=null;const I=new He(0);let B=0,j=t.width,F=t.height,Q=1,K=null,me=null;const ge=new Tt(0,0,j,F),Ae=new Tt(0,0,j,F);let je=!1;const Ke=new Pc;let ee=!1,ae=!1;const Te=new gt,ye=new gt,X=new U,ne=new Tt,be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Fe=!1;function Ne(){return S===null?Q:1}let D=i;function St(A,G){return t.getContext(A,G)}try{const A={alpha:!0,depth:s,stencil:a,antialias:r,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${xc}`),t.addEventListener("webglcontextlost",J,!1),t.addEventListener("webglcontextrestored",le,!1),t.addEventListener("webglcontextcreationerror",ve,!1),D===null){const G="webgl2";if(D=St(G,A),D===null)throw St(G)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let qe,Ye,Oe,ut,Be,R,E,W,se,oe,ie,Pe,xe,we,Qe,de,k,z,$,O,te,ce,ue,P;function re(){qe=new A0(D),qe.init(),ce=new uv(D,qe),Ye=new _0(D,qe,e,ce),Oe=new lv(D),Ye.reverseDepthBuffer&&Oe.buffers.depth.setReversed(!0),ut=new P0(D),Be=new Yg,R=new dv(D,qe,Oe,Be,Ye,ce,ut),E=new S0(v),W=new T0(v),se=new Ff(D),ue=new y0(D,se),oe=new C0(D,se,ut,ue),ie=new k0(D,oe,se,ut),$=new L0(D,Ye,R),de=new M0(Be),Pe=new Xg(v,E,W,qe,Ye,ue,de),xe=new xv(v,Be),we=new Kg,Qe=new nv(qe),z=new b0(v,E,W,Oe,ie,u,l),k=new rv(v,ie,Ye),P=new _v(D,ut,Ye,Oe),O=new x0(D,qe,ut),te=new R0(D,qe,ut),ut.programs=Pe.programs,v.capabilities=Ye,v.extensions=qe,v.properties=Be,v.renderLists=we,v.shadowMap=k,v.state=Oe,v.info=ut}re();const V=new bv(v,D);this.xr=V,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const A=qe.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=qe.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(A){A!==void 0&&(Q=A,this.setSize(j,F,!1))},this.getSize=function(A){return A.set(j,F)},this.setSize=function(A,G,q=!0){if(V.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}j=A,F=G,t.width=Math.floor(A*Q),t.height=Math.floor(G*Q),q===!0&&(t.style.width=A+"px",t.style.height=G+"px"),this.setViewport(0,0,A,G)},this.getDrawingBufferSize=function(A){return A.set(j*Q,F*Q).floor()},this.setDrawingBufferSize=function(A,G,q){j=A,F=G,Q=q,t.width=Math.floor(A*q),t.height=Math.floor(G*q),this.setViewport(0,0,A,G)},this.getCurrentViewport=function(A){return A.copy(_)},this.getViewport=function(A){return A.copy(ge)},this.setViewport=function(A,G,q,Y){A.isVector4?ge.set(A.x,A.y,A.z,A.w):ge.set(A,G,q,Y),Oe.viewport(_.copy(ge).multiplyScalar(Q).round())},this.getScissor=function(A){return A.copy(Ae)},this.setScissor=function(A,G,q,Y){A.isVector4?Ae.set(A.x,A.y,A.z,A.w):Ae.set(A,G,q,Y),Oe.scissor(w.copy(Ae).multiplyScalar(Q).round())},this.getScissorTest=function(){return je},this.setScissorTest=function(A){Oe.setScissorTest(je=A)},this.setOpaqueSort=function(A){K=A},this.setTransparentSort=function(A){me=A},this.getClearColor=function(A){return A.copy(z.getClearColor())},this.setClearColor=function(){z.setClearColor.apply(z,arguments)},this.getClearAlpha=function(){return z.getClearAlpha()},this.setClearAlpha=function(){z.setClearAlpha.apply(z,arguments)},this.clear=function(A=!0,G=!0,q=!0){let Y=0;if(A){let H=!1;if(S!==null){const pe=S.texture.format;H=pe===Tc||pe===Ec||pe===wc}if(H){const pe=S.texture.type,Ee=pe===hi||pe===Ki||pe===ra||pe===Rs||pe===Mc||pe===Sc,Le=z.getClearColor(),ke=z.getClearAlpha(),ze=Le.r,Ge=Le.g,De=Le.b;Ee?(f[0]=ze,f[1]=Ge,f[2]=De,f[3]=ke,D.clearBufferuiv(D.COLOR,0,f)):(g[0]=ze,g[1]=Ge,g[2]=De,g[3]=ke,D.clearBufferiv(D.COLOR,0,g))}else Y|=D.COLOR_BUFFER_BIT}G&&(Y|=D.DEPTH_BUFFER_BIT,D.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),q&&(Y|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",J,!1),t.removeEventListener("webglcontextrestored",le,!1),t.removeEventListener("webglcontextcreationerror",ve,!1),we.dispose(),Qe.dispose(),Be.dispose(),E.dispose(),W.dispose(),ie.dispose(),ue.dispose(),P.dispose(),Pe.dispose(),V.dispose(),V.removeEventListener("sessionstart",qc),V.removeEventListener("sessionend",Xc),Li.stop()};function J(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),x=!0}function le(){console.log("THREE.WebGLRenderer: Context Restored."),x=!1;const A=ut.autoReset,G=k.enabled,q=k.autoUpdate,Y=k.needsUpdate,H=k.type;re(),ut.autoReset=A,k.enabled=G,k.autoUpdate=q,k.needsUpdate=Y,k.type=H}function ve(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Je(A){const G=A.target;G.removeEventListener("dispose",Je),Lt(G)}function Lt(A){hn(A),Be.remove(A)}function hn(A){const G=Be.get(A).programs;G!==void 0&&(G.forEach(function(q){Pe.releaseProgram(q)}),A.isShaderMaterial&&Pe.releaseShaderCache(A))}this.renderBufferDirect=function(A,G,q,Y,H,pe){G===null&&(G=be);const Ee=H.isMesh&&H.matrixWorld.determinant()<0,Le=iu(A,G,q,Y,H);Oe.setMaterial(Y,Ee);let ke=q.index,ze=1;if(Y.wireframe===!0){if(ke=oe.getWireframeAttribute(q),ke===void 0)return;ze=2}const Ge=q.drawRange,De=q.attributes.position;let ht=Ge.start*ze,bt=(Ge.start+Ge.count)*ze;pe!==null&&(ht=Math.max(ht,pe.start*ze),bt=Math.min(bt,(pe.start+pe.count)*ze)),ke!==null?(ht=Math.max(ht,0),bt=Math.min(bt,ke.count)):De!=null&&(ht=Math.max(ht,0),bt=Math.min(bt,De.count));const wt=bt-ht;if(wt<0||wt===1/0)return;ue.setup(H,Y,Le,q,ke);let bn,at=O;if(ke!==null&&(bn=se.get(ke),at=te,at.setIndex(bn)),H.isMesh)Y.wireframe===!0?(Oe.setLineWidth(Y.wireframeLinewidth*Ne()),at.setMode(D.LINES)):at.setMode(D.TRIANGLES);else if(H.isLine){let Ie=Y.linewidth;Ie===void 0&&(Ie=1),Oe.setLineWidth(Ie*Ne()),H.isLineSegments?at.setMode(D.LINES):H.isLineLoop?at.setMode(D.LINE_LOOP):at.setMode(D.LINE_STRIP)}else H.isPoints?at.setMode(D.POINTS):H.isSprite&&at.setMode(D.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)at.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(qe.get("WEBGL_multi_draw"))at.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const Ie=H._multiDrawStarts,qt=H._multiDrawCounts,ot=H._multiDrawCount,Rn=ke?se.get(ke).bytesPerElement:1,es=Be.get(Y).currentProgram.getUniforms();for(let yn=0;yn<ot;yn++)es.setValue(D,"_gl_DrawID",yn),at.render(Ie[yn]/Rn,qt[yn])}else if(H.isInstancedMesh)at.renderInstances(ht,wt,H.count);else if(q.isInstancedBufferGeometry){const Ie=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,qt=Math.min(q.instanceCount,Ie);at.renderInstances(ht,wt,qt)}else at.render(ht,wt)};function st(A,G,q){A.transparent===!0&&A.side===Sn&&A.forceSinglePass===!1?(A.side=vn,A.needsUpdate=!0,ga(A,G,q),A.side=Ai,A.needsUpdate=!0,ga(A,G,q),A.side=Sn):ga(A,G,q)}this.compile=function(A,G,q=null){q===null&&(q=A),p=Qe.get(q),p.init(G),y.push(p),q.traverseVisible(function(H){H.isLight&&H.layers.test(G.layers)&&(p.pushLight(H),H.castShadow&&p.pushShadow(H))}),A!==q&&A.traverseVisible(function(H){H.isLight&&H.layers.test(G.layers)&&(p.pushLight(H),H.castShadow&&p.pushShadow(H))}),p.setupLights();const Y=new Set;return A.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const pe=H.material;if(pe)if(Array.isArray(pe))for(let Ee=0;Ee<pe.length;Ee++){const Le=pe[Ee];st(Le,q,H),Y.add(Le)}else st(pe,q,H),Y.add(pe)}),y.pop(),p=null,Y},this.compileAsync=function(A,G,q=null){const Y=this.compile(A,G,q);return new Promise(H=>{function pe(){if(Y.forEach(function(Ee){Be.get(Ee).currentProgram.isReady()&&Y.delete(Ee)}),Y.size===0){H(A);return}setTimeout(pe,10)}qe.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let dn=null;function Yn(A){dn&&dn(A)}function qc(){Li.stop()}function Xc(){Li.start()}const Li=new ud;Li.setAnimationLoop(Yn),typeof self<"u"&&Li.setContext(self),this.setAnimationLoop=function(A){dn=A,V.setAnimationLoop(A),A===null?Li.stop():Li.start()},V.addEventListener("sessionstart",qc),V.addEventListener("sessionend",Xc),this.render=function(A,G){if(G!==void 0&&G.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(x===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),V.enabled===!0&&V.isPresenting===!0&&(V.cameraAutoUpdate===!0&&V.updateCamera(G),G=V.getCamera()),A.isScene===!0&&A.onBeforeRender(v,A,G,S),p=Qe.get(A,y.length),p.init(G),y.push(p),ye.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),Ke.setFromProjectionMatrix(ye),ae=this.localClippingEnabled,ee=de.init(this.clippingPlanes,ae),b=we.get(A,m.length),b.init(),m.push(b),V.enabled===!0&&V.isPresenting===!0){const pe=v.xr.getDepthSensingMesh();pe!==null&&Eo(pe,G,-1/0,v.sortObjects)}Eo(A,G,0,v.sortObjects),b.finish(),v.sortObjects===!0&&b.sort(K,me),Fe=V.enabled===!1||V.isPresenting===!1||V.hasDepthSensing()===!1,Fe&&z.addToRenderList(b,A),this.info.render.frame++,ee===!0&&de.beginShadows();const q=p.state.shadowsArray;k.render(q,A,G),ee===!0&&de.endShadows(),this.info.autoReset===!0&&this.info.reset();const Y=b.opaque,H=b.transmissive;if(p.setupLights(),G.isArrayCamera){const pe=G.cameras;if(H.length>0)for(let Ee=0,Le=pe.length;Ee<Le;Ee++){const ke=pe[Ee];jc(Y,H,A,ke)}Fe&&z.render(A);for(let Ee=0,Le=pe.length;Ee<Le;Ee++){const ke=pe[Ee];Yc(b,A,ke,ke.viewport)}}else H.length>0&&jc(Y,H,A,G),Fe&&z.render(A),Yc(b,A,G);S!==null&&(R.updateMultisampleRenderTarget(S),R.updateRenderTargetMipmap(S)),A.isScene===!0&&A.onAfterRender(v,A,G),ue.resetDefaultState(),C=-1,N=null,y.pop(),y.length>0?(p=y[y.length-1],ee===!0&&de.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,m.pop(),m.length>0?b=m[m.length-1]:b=null};function Eo(A,G,q,Y){if(A.visible===!1)return;if(A.layers.test(G.layers)){if(A.isGroup)q=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(G);else if(A.isLight)p.pushLight(A),A.castShadow&&p.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||Ke.intersectsSprite(A)){Y&&ne.setFromMatrixPosition(A.matrixWorld).applyMatrix4(ye);const Ee=ie.update(A),Le=A.material;Le.visible&&b.push(A,Ee,Le,q,ne.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||Ke.intersectsObject(A))){const Ee=ie.update(A),Le=A.material;if(Y&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),ne.copy(A.boundingSphere.center)):(Ee.boundingSphere===null&&Ee.computeBoundingSphere(),ne.copy(Ee.boundingSphere.center)),ne.applyMatrix4(A.matrixWorld).applyMatrix4(ye)),Array.isArray(Le)){const ke=Ee.groups;for(let ze=0,Ge=ke.length;ze<Ge;ze++){const De=ke[ze],ht=Le[De.materialIndex];ht&&ht.visible&&b.push(A,Ee,ht,q,ne.z,De)}}else Le.visible&&b.push(A,Ee,Le,q,ne.z,null)}}const pe=A.children;for(let Ee=0,Le=pe.length;Ee<Le;Ee++)Eo(pe[Ee],G,q,Y)}function Yc(A,G,q,Y){const H=A.opaque,pe=A.transmissive,Ee=A.transparent;p.setupLightsView(q),ee===!0&&de.setGlobalState(v.clippingPlanes,q),Y&&Oe.viewport(_.copy(Y)),H.length>0&&ma(H,G,q),pe.length>0&&ma(pe,G,q),Ee.length>0&&ma(Ee,G,q),Oe.buffers.depth.setTest(!0),Oe.buffers.depth.setMask(!0),Oe.buffers.color.setMask(!0),Oe.setPolygonOffset(!1)}function jc(A,G,q,Y){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[Y.id]===void 0&&(p.state.transmissionRenderTarget[Y.id]=new Ji(1,1,{generateMipmaps:!0,type:qe.has("EXT_color_buffer_half_float")||qe.has("EXT_color_buffer_float")?da:hi,minFilter:qi,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:lt.workingColorSpace}));const pe=p.state.transmissionRenderTarget[Y.id],Ee=Y.viewport||_;pe.setSize(Ee.z,Ee.w);const Le=v.getRenderTarget();v.setRenderTarget(pe),v.getClearColor(I),B=v.getClearAlpha(),B<1&&v.setClearColor(16777215,.5),v.clear(),Fe&&z.render(q);const ke=v.toneMapping;v.toneMapping=Ei;const ze=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),p.setupLightsView(Y),ee===!0&&de.setGlobalState(v.clippingPlanes,Y),ma(A,q,Y),R.updateMultisampleRenderTarget(pe),R.updateRenderTargetMipmap(pe),qe.has("WEBGL_multisampled_render_to_texture")===!1){let Ge=!1;for(let De=0,ht=G.length;De<ht;De++){const bt=G[De],wt=bt.object,bn=bt.geometry,at=bt.material,Ie=bt.group;if(at.side===Sn&&wt.layers.test(Y.layers)){const qt=at.side;at.side=vn,at.needsUpdate=!0,Kc(wt,q,Y,bn,at,Ie),at.side=qt,at.needsUpdate=!0,Ge=!0}}Ge===!0&&(R.updateMultisampleRenderTarget(pe),R.updateRenderTargetMipmap(pe))}v.setRenderTarget(Le),v.setClearColor(I,B),ze!==void 0&&(Y.viewport=ze),v.toneMapping=ke}function ma(A,G,q){const Y=G.isScene===!0?G.overrideMaterial:null;for(let H=0,pe=A.length;H<pe;H++){const Ee=A[H],Le=Ee.object,ke=Ee.geometry,ze=Y===null?Ee.material:Y,Ge=Ee.group;Le.layers.test(q.layers)&&Kc(Le,G,q,ke,ze,Ge)}}function Kc(A,G,q,Y,H,pe){A.onBeforeRender(v,G,q,Y,H,pe),A.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),H.onBeforeRender(v,G,q,Y,A,pe),H.transparent===!0&&H.side===Sn&&H.forceSinglePass===!1?(H.side=vn,H.needsUpdate=!0,v.renderBufferDirect(q,G,Y,H,A,pe),H.side=Ai,H.needsUpdate=!0,v.renderBufferDirect(q,G,Y,H,A,pe),H.side=Sn):v.renderBufferDirect(q,G,Y,H,A,pe),A.onAfterRender(v,G,q,Y,H,pe)}function ga(A,G,q){G.isScene!==!0&&(G=be);const Y=Be.get(A),H=p.state.lights,pe=p.state.shadowsArray,Ee=H.state.version,Le=Pe.getParameters(A,H.state,pe,G,q),ke=Pe.getProgramCacheKey(Le);let ze=Y.programs;Y.environment=A.isMeshStandardMaterial?G.environment:null,Y.fog=G.fog,Y.envMap=(A.isMeshStandardMaterial?W:E).get(A.envMap||Y.environment),Y.envMapRotation=Y.environment!==null&&A.envMap===null?G.environmentRotation:A.envMapRotation,ze===void 0&&(A.addEventListener("dispose",Je),ze=new Map,Y.programs=ze);let Ge=ze.get(ke);if(Ge!==void 0){if(Y.currentProgram===Ge&&Y.lightsStateVersion===Ee)return Zc(A,Le),Ge}else Le.uniforms=Pe.getUniforms(A),A.onBeforeCompile(Le,v),Ge=Pe.acquireProgram(Le,ke),ze.set(ke,Ge),Y.uniforms=Le.uniforms;const De=Y.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(De.clippingPlanes=de.uniform),Zc(A,Le),Y.needsLights=au(A),Y.lightsStateVersion=Ee,Y.needsLights&&(De.ambientLightColor.value=H.state.ambient,De.lightProbe.value=H.state.probe,De.directionalLights.value=H.state.directional,De.directionalLightShadows.value=H.state.directionalShadow,De.spotLights.value=H.state.spot,De.spotLightShadows.value=H.state.spotShadow,De.rectAreaLights.value=H.state.rectArea,De.ltc_1.value=H.state.rectAreaLTC1,De.ltc_2.value=H.state.rectAreaLTC2,De.pointLights.value=H.state.point,De.pointLightShadows.value=H.state.pointShadow,De.hemisphereLights.value=H.state.hemi,De.directionalShadowMap.value=H.state.directionalShadowMap,De.directionalShadowMatrix.value=H.state.directionalShadowMatrix,De.spotShadowMap.value=H.state.spotShadowMap,De.spotLightMatrix.value=H.state.spotLightMatrix,De.spotLightMap.value=H.state.spotLightMap,De.pointShadowMap.value=H.state.pointShadowMap,De.pointShadowMatrix.value=H.state.pointShadowMatrix),Y.currentProgram=Ge,Y.uniformsList=null,Ge}function Jc(A){if(A.uniformsList===null){const G=A.currentProgram.getUniforms();A.uniformsList=Qa.seqWithValue(G.seq,A.uniforms)}return A.uniformsList}function Zc(A,G){const q=Be.get(A);q.outputColorSpace=G.outputColorSpace,q.batching=G.batching,q.batchingColor=G.batchingColor,q.instancing=G.instancing,q.instancingColor=G.instancingColor,q.instancingMorph=G.instancingMorph,q.skinning=G.skinning,q.morphTargets=G.morphTargets,q.morphNormals=G.morphNormals,q.morphColors=G.morphColors,q.morphTargetsCount=G.morphTargetsCount,q.numClippingPlanes=G.numClippingPlanes,q.numIntersection=G.numClipIntersection,q.vertexAlphas=G.vertexAlphas,q.vertexTangents=G.vertexTangents,q.toneMapping=G.toneMapping}function iu(A,G,q,Y,H){G.isScene!==!0&&(G=be),R.resetTextureUnits();const pe=G.fog,Ee=Y.isMeshStandardMaterial?G.environment:null,Le=S===null?v.outputColorSpace:S.isXRRenderTarget===!0?S.texture.colorSpace:Ri,ke=(Y.isMeshStandardMaterial?W:E).get(Y.envMap||Ee),ze=Y.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,Ge=!!q.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),De=!!q.morphAttributes.position,ht=!!q.morphAttributes.normal,bt=!!q.morphAttributes.color;let wt=Ei;Y.toneMapped&&(S===null||S.isXRRenderTarget===!0)&&(wt=v.toneMapping);const bn=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,at=bn!==void 0?bn.length:0,Ie=Be.get(Y),qt=p.state.lights;if(ee===!0&&(ae===!0||A!==N)){const En=A===N&&Y.id===C;de.setState(Y,A,En)}let ot=!1;Y.version===Ie.__version?(Ie.needsLights&&Ie.lightsStateVersion!==qt.state.version||Ie.outputColorSpace!==Le||H.isBatchedMesh&&Ie.batching===!1||!H.isBatchedMesh&&Ie.batching===!0||H.isBatchedMesh&&Ie.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&Ie.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&Ie.instancing===!1||!H.isInstancedMesh&&Ie.instancing===!0||H.isSkinnedMesh&&Ie.skinning===!1||!H.isSkinnedMesh&&Ie.skinning===!0||H.isInstancedMesh&&Ie.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Ie.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Ie.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Ie.instancingMorph===!1&&H.morphTexture!==null||Ie.envMap!==ke||Y.fog===!0&&Ie.fog!==pe||Ie.numClippingPlanes!==void 0&&(Ie.numClippingPlanes!==de.numPlanes||Ie.numIntersection!==de.numIntersection)||Ie.vertexAlphas!==ze||Ie.vertexTangents!==Ge||Ie.morphTargets!==De||Ie.morphNormals!==ht||Ie.morphColors!==bt||Ie.toneMapping!==wt||Ie.morphTargetsCount!==at)&&(ot=!0):(ot=!0,Ie.__version=Y.version);let Rn=Ie.currentProgram;ot===!0&&(Rn=ga(Y,G,H));let es=!1,yn=!1,To=!1;const At=Rn.getUniforms(),di=Ie.uniforms;if(Oe.useProgram(Rn.program)&&(es=!0,yn=!0,To=!0),Y.id!==C&&(C=Y.id,yn=!0),es||N!==A){Ye.reverseDepthBuffer?(Te.copy(A.projectionMatrix),df(Te),uf(Te),At.setValue(D,"projectionMatrix",Te)):At.setValue(D,"projectionMatrix",A.projectionMatrix),At.setValue(D,"viewMatrix",A.matrixWorldInverse);const En=At.map.cameraPosition;En!==void 0&&En.setValue(D,X.setFromMatrixPosition(A.matrixWorld)),Ye.logarithmicDepthBuffer&&At.setValue(D,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&At.setValue(D,"isOrthographic",A.isOrthographicCamera===!0),N!==A&&(N=A,yn=!0,To=!0)}if(H.isSkinnedMesh){At.setOptional(D,H,"bindMatrix"),At.setOptional(D,H,"bindMatrixInverse");const En=H.skeleton;En&&(En.boneTexture===null&&En.computeBoneTexture(),At.setValue(D,"boneTexture",En.boneTexture,R))}H.isBatchedMesh&&(At.setOptional(D,H,"batchingTexture"),At.setValue(D,"batchingTexture",H._matricesTexture,R),At.setOptional(D,H,"batchingIdTexture"),At.setValue(D,"batchingIdTexture",H._indirectTexture,R),At.setOptional(D,H,"batchingColorTexture"),H._colorsTexture!==null&&At.setValue(D,"batchingColorTexture",H._colorsTexture,R));const Ao=q.morphAttributes;if((Ao.position!==void 0||Ao.normal!==void 0||Ao.color!==void 0)&&$.update(H,q,Rn),(yn||Ie.receiveShadow!==H.receiveShadow)&&(Ie.receiveShadow=H.receiveShadow,At.setValue(D,"receiveShadow",H.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(di.envMap.value=ke,di.flipEnvMap.value=ke.isCubeTexture&&ke.isRenderTargetTexture===!1?-1:1),Y.isMeshStandardMaterial&&Y.envMap===null&&G.environment!==null&&(di.envMapIntensity.value=G.environmentIntensity),yn&&(At.setValue(D,"toneMappingExposure",v.toneMappingExposure),Ie.needsLights&&su(di,To),pe&&Y.fog===!0&&xe.refreshFogUniforms(di,pe),xe.refreshMaterialUniforms(di,Y,Q,F,p.state.transmissionRenderTarget[A.id]),Qa.upload(D,Jc(Ie),di,R)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(Qa.upload(D,Jc(Ie),di,R),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&At.setValue(D,"center",H.center),At.setValue(D,"modelViewMatrix",H.modelViewMatrix),At.setValue(D,"normalMatrix",H.normalMatrix),At.setValue(D,"modelMatrix",H.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){const En=Y.uniformsGroups;for(let Co=0,ou=En.length;Co<ou;Co++){const Qc=En[Co];P.update(Qc,Rn),P.bind(Qc,Rn)}}return Rn}function su(A,G){A.ambientLightColor.needsUpdate=G,A.lightProbe.needsUpdate=G,A.directionalLights.needsUpdate=G,A.directionalLightShadows.needsUpdate=G,A.pointLights.needsUpdate=G,A.pointLightShadows.needsUpdate=G,A.spotLights.needsUpdate=G,A.spotLightShadows.needsUpdate=G,A.rectAreaLights.needsUpdate=G,A.hemisphereLights.needsUpdate=G}function au(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return M},this.getRenderTarget=function(){return S},this.setRenderTargetTextures=function(A,G,q){Be.get(A.texture).__webglTexture=G,Be.get(A.depthTexture).__webglTexture=q;const Y=Be.get(A);Y.__hasExternalTextures=!0,Y.__autoAllocateDepthBuffer=q===void 0,Y.__autoAllocateDepthBuffer||qe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Y.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,G){const q=Be.get(A);q.__webglFramebuffer=G,q.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(A,G=0,q=0){S=A,T=G,M=q;let Y=!0,H=null,pe=!1,Ee=!1;if(A){const ke=Be.get(A);if(ke.__useDefaultFramebuffer!==void 0)Oe.bindFramebuffer(D.FRAMEBUFFER,null),Y=!1;else if(ke.__webglFramebuffer===void 0)R.setupRenderTarget(A);else if(ke.__hasExternalTextures)R.rebindTextures(A,Be.get(A.texture).__webglTexture,Be.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const De=A.depthTexture;if(ke.__boundDepthTexture!==De){if(De!==null&&Be.has(De)&&(A.width!==De.image.width||A.height!==De.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(A)}}const ze=A.texture;(ze.isData3DTexture||ze.isDataArrayTexture||ze.isCompressedArrayTexture)&&(Ee=!0);const Ge=Be.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Ge[G])?H=Ge[G][q]:H=Ge[G],pe=!0):A.samples>0&&R.useMultisampledRTT(A)===!1?H=Be.get(A).__webglMultisampledFramebuffer:Array.isArray(Ge)?H=Ge[q]:H=Ge,_.copy(A.viewport),w.copy(A.scissor),L=A.scissorTest}else _.copy(ge).multiplyScalar(Q).floor(),w.copy(Ae).multiplyScalar(Q).floor(),L=je;if(Oe.bindFramebuffer(D.FRAMEBUFFER,H)&&Y&&Oe.drawBuffers(A,H),Oe.viewport(_),Oe.scissor(w),Oe.setScissorTest(L),pe){const ke=Be.get(A.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+G,ke.__webglTexture,q)}else if(Ee){const ke=Be.get(A.texture),ze=G||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,ke.__webglTexture,q||0,ze)}C=-1},this.readRenderTargetPixels=function(A,G,q,Y,H,pe,Ee){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Le=Be.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ee!==void 0&&(Le=Le[Ee]),Le){Oe.bindFramebuffer(D.FRAMEBUFFER,Le);try{const ke=A.texture,ze=ke.format,Ge=ke.type;if(!Ye.textureFormatReadable(ze)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ye.textureTypeReadable(Ge)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=A.width-Y&&q>=0&&q<=A.height-H&&D.readPixels(G,q,Y,H,ce.convert(ze),ce.convert(Ge),pe)}finally{const ke=S!==null?Be.get(S).__webglFramebuffer:null;Oe.bindFramebuffer(D.FRAMEBUFFER,ke)}}},this.readRenderTargetPixelsAsync=async function(A,G,q,Y,H,pe,Ee){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Le=Be.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ee!==void 0&&(Le=Le[Ee]),Le){const ke=A.texture,ze=ke.format,Ge=ke.type;if(!Ye.textureFormatReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ye.textureTypeReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(G>=0&&G<=A.width-Y&&q>=0&&q<=A.height-H){Oe.bindFramebuffer(D.FRAMEBUFFER,Le);const De=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,De),D.bufferData(D.PIXEL_PACK_BUFFER,pe.byteLength,D.STREAM_READ),D.readPixels(G,q,Y,H,ce.convert(ze),ce.convert(Ge),0);const ht=S!==null?Be.get(S).__webglFramebuffer:null;Oe.bindFramebuffer(D.FRAMEBUFFER,ht);const bt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await hf(D,bt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,De),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,pe),D.deleteBuffer(De),D.deleteSync(bt),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,G=null,q=0){A.isTexture!==!0&&(Za("WebGLRenderer: copyFramebufferToTexture function signature has changed."),G=arguments[0]||null,A=arguments[1]);const Y=Math.pow(2,-q),H=Math.floor(A.image.width*Y),pe=Math.floor(A.image.height*Y),Ee=G!==null?G.x:0,Le=G!==null?G.y:0;R.setTexture2D(A,0),D.copyTexSubImage2D(D.TEXTURE_2D,q,0,0,Ee,Le,H,pe),Oe.unbindTexture()},this.copyTextureToTexture=function(A,G,q=null,Y=null,H=0){A.isTexture!==!0&&(Za("WebGLRenderer: copyTextureToTexture function signature has changed."),Y=arguments[0]||null,A=arguments[1],G=arguments[2],H=arguments[3]||0,q=null);let pe,Ee,Le,ke,ze,Ge;q!==null?(pe=q.max.x-q.min.x,Ee=q.max.y-q.min.y,Le=q.min.x,ke=q.min.y):(pe=A.image.width,Ee=A.image.height,Le=0,ke=0),Y!==null?(ze=Y.x,Ge=Y.y):(ze=0,Ge=0);const De=ce.convert(G.format),ht=ce.convert(G.type);R.setTexture2D(G,0),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,G.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,G.unpackAlignment);const bt=D.getParameter(D.UNPACK_ROW_LENGTH),wt=D.getParameter(D.UNPACK_IMAGE_HEIGHT),bn=D.getParameter(D.UNPACK_SKIP_PIXELS),at=D.getParameter(D.UNPACK_SKIP_ROWS),Ie=D.getParameter(D.UNPACK_SKIP_IMAGES),qt=A.isCompressedTexture?A.mipmaps[H]:A.image;D.pixelStorei(D.UNPACK_ROW_LENGTH,qt.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,qt.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Le),D.pixelStorei(D.UNPACK_SKIP_ROWS,ke),A.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,H,ze,Ge,pe,Ee,De,ht,qt.data):A.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,H,ze,Ge,qt.width,qt.height,De,qt.data):D.texSubImage2D(D.TEXTURE_2D,H,ze,Ge,pe,Ee,De,ht,qt),D.pixelStorei(D.UNPACK_ROW_LENGTH,bt),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,wt),D.pixelStorei(D.UNPACK_SKIP_PIXELS,bn),D.pixelStorei(D.UNPACK_SKIP_ROWS,at),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Ie),H===0&&G.generateMipmaps&&D.generateMipmap(D.TEXTURE_2D),Oe.unbindTexture()},this.copyTextureToTexture3D=function(A,G,q=null,Y=null,H=0){A.isTexture!==!0&&(Za("WebGLRenderer: copyTextureToTexture3D function signature has changed."),q=arguments[0]||null,Y=arguments[1]||null,A=arguments[2],G=arguments[3],H=arguments[4]||0);let pe,Ee,Le,ke,ze,Ge,De,ht,bt;const wt=A.isCompressedTexture?A.mipmaps[H]:A.image;q!==null?(pe=q.max.x-q.min.x,Ee=q.max.y-q.min.y,Le=q.max.z-q.min.z,ke=q.min.x,ze=q.min.y,Ge=q.min.z):(pe=wt.width,Ee=wt.height,Le=wt.depth,ke=0,ze=0,Ge=0),Y!==null?(De=Y.x,ht=Y.y,bt=Y.z):(De=0,ht=0,bt=0);const bn=ce.convert(G.format),at=ce.convert(G.type);let Ie;if(G.isData3DTexture)R.setTexture3D(G,0),Ie=D.TEXTURE_3D;else if(G.isDataArrayTexture||G.isCompressedArrayTexture)R.setTexture2DArray(G,0),Ie=D.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,G.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,G.unpackAlignment);const qt=D.getParameter(D.UNPACK_ROW_LENGTH),ot=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Rn=D.getParameter(D.UNPACK_SKIP_PIXELS),es=D.getParameter(D.UNPACK_SKIP_ROWS),yn=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,wt.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,wt.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,ke),D.pixelStorei(D.UNPACK_SKIP_ROWS,ze),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Ge),A.isDataTexture||A.isData3DTexture?D.texSubImage3D(Ie,H,De,ht,bt,pe,Ee,Le,bn,at,wt.data):G.isCompressedArrayTexture?D.compressedTexSubImage3D(Ie,H,De,ht,bt,pe,Ee,Le,bn,wt.data):D.texSubImage3D(Ie,H,De,ht,bt,pe,Ee,Le,bn,at,wt),D.pixelStorei(D.UNPACK_ROW_LENGTH,qt),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ot),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Rn),D.pixelStorei(D.UNPACK_SKIP_ROWS,es),D.pixelStorei(D.UNPACK_SKIP_IMAGES,yn),H===0&&G.generateMipmaps&&D.generateMipmap(Ie),Oe.unbindTexture()},this.initRenderTarget=function(A){Be.get(A).__webglFramebuffer===void 0&&R.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?R.setTextureCube(A,0):A.isData3DTexture?R.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?R.setTexture2DArray(A,0):R.setTexture2D(A,0),Oe.unbindTexture()},this.resetState=function(){T=0,M=0,S=null,Oe.reset(),ue.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return oi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Ac?"display-p3":"srgb",t.unpackColorSpace=lt.workingColorSpace===go?"display-p3":"srgb"}}class Dc{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new He(e),this.near=t,this.far=i}clone(){return new Dc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Sv extends Ot{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Wn,this.environmentIntensity=1,this.environmentRotation=new Wn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class bd extends Qi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new He(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const uo=new U,fo=new U,Yl=new gt,zs=new vo,Ba=new pa,sr=new U,jl=new U;class wv extends Ot{constructor(e=new jt,t=new bd){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,a=t.count;s<a;s++)uo.fromBufferAttribute(t,s-1),fo.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=uo.distanceTo(fo);e.setAttribute("lineDistance",new vt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,a=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ba.copy(i.boundingSphere),Ba.applyMatrix4(s),Ba.radius+=a,e.ray.intersectsSphere(Ba)===!1)return;Yl.copy(s).invert(),zs.copy(e.ray).applyMatrix4(Yl);const r=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=r*r,c=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){const f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let b=f,p=g-1;b<p;b+=c){const m=h.getX(b),y=h.getX(b+1),v=za(this,e,zs,l,m,y);v&&t.push(v)}if(this.isLineLoop){const b=h.getX(g-1),p=h.getX(f),m=za(this,e,zs,l,b,p);m&&t.push(m)}}else{const f=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let b=f,p=g-1;b<p;b+=c){const m=za(this,e,zs,l,b,b+1);m&&t.push(m)}if(this.isLineLoop){const b=za(this,e,zs,l,g-1,f);b&&t.push(b)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,o=s.length;a<o;a++){const r=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[r]=a}}}}}function za(n,e,t,i,s,a){const o=n.geometry.attributes.position;if(uo.fromBufferAttribute(o,s),fo.fromBufferAttribute(o,a),t.distanceSqToSegment(uo,fo,sr,jl)>i)return;sr.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(sr);if(!(l<e.near||l>e.far))return{distance:l,point:jl.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}class yd extends Qi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new He(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Kl=new gt,ac=new vo,Ga=new pa,Ha=new U;class Ev extends Ot{constructor(e=new jt,t=new yd){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,a=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ga.copy(i.boundingSphere),Ga.applyMatrix4(s),Ga.radius+=a,e.ray.intersectsSphere(Ga)===!1)return;Kl.copy(s).invert(),ac.copy(e.ray).applyMatrix4(Kl);const r=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=r*r,c=i.index,d=i.attributes.position;if(c!==null){const u=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=u,b=f;g<b;g++){const p=c.getX(g);Ha.fromBufferAttribute(d,p),Jl(Ha,p,l,s,e,t,this)}}else{const u=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let g=u,b=f;g<b;g++)Ha.fromBufferAttribute(d,g),Jl(Ha,g,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,o=s.length;a<o;a++){const r=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[r]=a}}}}}function Jl(n,e,t,i,s,a,o){const r=ac.distanceSqToPoint(n);if(r<t){const l=new U;ac.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;a.push({distance:c,distanceToRay:Math.sqrt(r),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class yo extends rn{constructor(e,t,i,s,a,o,r,l,c){super(e,t,i,s,a,o,r,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class $n{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,s=this.getPoint(0),a=0;t.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),a+=i.distanceTo(s),t.push(a),s=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const i=this.getLengths();let s=0;const a=i.length;let o;t?o=t:o=e*i[a-1];let r=0,l=a-1,c;for(;r<=l;)if(s=Math.floor(r+(l-r)/2),c=i[s]-o,c<0)r=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===o)return s/(a-1);const h=i[s],u=i[s+1]-h,f=(o-h)/u;return(s+f)/(a-1)}getTangent(e,t){let s=e-1e-4,a=e+1e-4;s<0&&(s=0),a>1&&(a=1);const o=this.getPoint(s),r=this.getPoint(a),l=t||(o.isVector2?new Se:new U);return l.copy(r).sub(o).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t){const i=new U,s=[],a=[],o=[],r=new U,l=new gt;for(let f=0;f<=e;f++){const g=f/e;s[f]=this.getTangentAt(g,new U)}a[0]=new U,o[0]=new U;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),u<=c&&i.set(0,0,1),r.crossVectors(s[0],i).normalize(),a[0].crossVectors(s[0],r),o[0].crossVectors(s[0],a[0]);for(let f=1;f<=e;f++){if(a[f]=a[f-1].clone(),o[f]=o[f-1].clone(),r.crossVectors(s[f-1],s[f]),r.length()>Number.EPSILON){r.normalize();const g=Math.acos(Ft(s[f-1].dot(s[f]),-1,1));a[f].applyMatrix4(l.makeRotationAxis(r,g))}o[f].crossVectors(s[f],a[f])}if(t===!0){let f=Math.acos(Ft(a[0].dot(a[e]),-1,1));f/=e,s[0].dot(r.crossVectors(a[0],a[e]))>0&&(f=-f);for(let g=1;g<=e;g++)a[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),o[g].crossVectors(s[g],a[g])}return{tangents:s,normals:a,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Ic extends $n{constructor(e=0,t=0,i=1,s=1,a=0,o=Math.PI*2,r=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=s,this.aStartAngle=a,this.aEndAngle=o,this.aClockwise=r,this.aRotation=l}getPoint(e,t=new Se){const i=t,s=Math.PI*2;let a=this.aEndAngle-this.aStartAngle;const o=Math.abs(a)<Number.EPSILON;for(;a<0;)a+=s;for(;a>s;)a-=s;a<Number.EPSILON&&(o?a=0:a=s),this.aClockwise===!0&&!o&&(a===s?a=-s:a=a-s);const r=this.aStartAngle+e*a;let l=this.aX+this.xRadius*Math.cos(r),c=this.aY+this.yRadius*Math.sin(r);if(this.aRotation!==0){const h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Tv extends Ic{constructor(e,t,i,s,a,o){super(e,t,i,i,s,a,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Nc(){let n=0,e=0,t=0,i=0;function s(a,o,r,l){n=a,e=r,t=-3*a+3*o-2*r-l,i=2*a-2*o+r+l}return{initCatmullRom:function(a,o,r,l,c){s(o,r,c*(r-a),c*(l-o))},initNonuniformCatmullRom:function(a,o,r,l,c,h,d){let u=(o-a)/c-(r-a)/(c+h)+(r-o)/h,f=(r-o)/h-(l-o)/(h+d)+(l-r)/d;u*=h,f*=h,s(o,r,u,f)},calc:function(a){const o=a*a,r=o*a;return n+e*a+t*o+i*r}}}const Va=new U,ar=new Nc,or=new Nc,rr=new Nc;class Av extends $n{constructor(e=[],t=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=s}getPoint(e,t=new U){const i=t,s=this.points,a=s.length,o=(a-(this.closed?0:1))*e;let r=Math.floor(o),l=o-r;this.closed?r+=r>0?0:(Math.floor(Math.abs(r)/a)+1)*a:l===0&&r===a-1&&(r=a-2,l=1);let c,h;this.closed||r>0?c=s[(r-1)%a]:(Va.subVectors(s[0],s[1]).add(s[0]),c=Va);const d=s[r%a],u=s[(r+1)%a];if(this.closed||r+2<a?h=s[(r+2)%a]:(Va.subVectors(s[a-1],s[a-2]).add(s[a-1]),h=Va),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(d),f),b=Math.pow(d.distanceToSquared(u),f),p=Math.pow(u.distanceToSquared(h),f);b<1e-4&&(b=1),g<1e-4&&(g=b),p<1e-4&&(p=b),ar.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,g,b,p),or.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,g,b,p),rr.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,g,b,p)}else this.curveType==="catmullrom"&&(ar.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),or.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),rr.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return i.set(ar.calc(l),or.calc(l),rr.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new U().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Zl(n,e,t,i,s){const a=(i-e)*.5,o=(s-t)*.5,r=n*n,l=n*r;return(2*t-2*i+a+o)*l+(-3*t+3*i-2*a-o)*r+a*n+t}function Cv(n,e){const t=1-n;return t*t*e}function Rv(n,e){return 2*(1-n)*n*e}function Pv(n,e){return n*n*e}function na(n,e,t,i){return Cv(n,e)+Rv(n,t)+Pv(n,i)}function Lv(n,e){const t=1-n;return t*t*t*e}function kv(n,e){const t=1-n;return 3*t*t*n*e}function Dv(n,e){return 3*(1-n)*n*n*e}function Iv(n,e){return n*n*n*e}function ia(n,e,t,i,s){return Lv(n,e)+kv(n,t)+Dv(n,i)+Iv(n,s)}class xd extends $n{constructor(e=new Se,t=new Se,i=new Se,s=new Se){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new Se){const i=t,s=this.v0,a=this.v1,o=this.v2,r=this.v3;return i.set(ia(e,s.x,a.x,o.x,r.x),ia(e,s.y,a.y,o.y,r.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Nv extends $n{constructor(e=new U,t=new U,i=new U,s=new U){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new U){const i=t,s=this.v0,a=this.v1,o=this.v2,r=this.v3;return i.set(ia(e,s.x,a.x,o.x,r.x),ia(e,s.y,a.y,o.y,r.y),ia(e,s.z,a.z,o.z,r.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class _d extends $n{constructor(e=new Se,t=new Se){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Se){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Se){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Uv extends $n{constructor(e=new U,t=new U){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new U){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new U){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Md extends $n{constructor(e=new Se,t=new Se,i=new Se){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new Se){const i=t,s=this.v0,a=this.v1,o=this.v2;return i.set(na(e,s.x,a.x,o.x),na(e,s.y,a.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Fv extends $n{constructor(e=new U,t=new U,i=new U){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new U){const i=t,s=this.v0,a=this.v1,o=this.v2;return i.set(na(e,s.x,a.x,o.x),na(e,s.y,a.y,o.y),na(e,s.z,a.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Sd extends $n{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Se){const i=t,s=this.points,a=(s.length-1)*e,o=Math.floor(a),r=a-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],d=s[o>s.length-3?s.length-1:o+2];return i.set(Zl(r,l.x,c.x,h.x,d.x),Zl(r,l.y,c.y,h.y,d.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new Se().fromArray(s))}return this}}var Ql=Object.freeze({__proto__:null,ArcCurve:Tv,CatmullRomCurve3:Av,CubicBezierCurve:xd,CubicBezierCurve3:Nv,EllipseCurve:Ic,LineCurve:_d,LineCurve3:Uv,QuadraticBezierCurve:Md,QuadraticBezierCurve3:Fv,SplineCurve:Sd});class Ov extends $n{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ql[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),s=this.getCurveLengths();let a=0;for(;a<s.length;){if(s[a]>=i){const o=s[a]-i,r=this.curves[a],l=r.getLength(),c=l===0?0:1-o/l;return r.getPointAt(c,t)}a++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,s=this.curves.length;i<s;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let s=0,a=this.curves;s<a.length;s++){const o=a[s],r=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(r);for(let c=0;c<l.length;c++){const h=l[c];i&&i.equals(h)||(t.push(h),i=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const s=e.curves[t];this.curves.push(new Ql[s.type]().fromJSON(s))}return this}}class Bv extends Ov{constructor(e){super(),this.type="Path",this.currentPoint=new Se,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new _d(this.currentPoint.clone(),new Se(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,s){const a=new Md(this.currentPoint.clone(),new Se(e,t),new Se(i,s));return this.curves.push(a),this.currentPoint.set(i,s),this}bezierCurveTo(e,t,i,s,a,o){const r=new xd(this.currentPoint.clone(),new Se(e,t),new Se(i,s),new Se(a,o));return this.curves.push(r),this.currentPoint.set(a,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new Sd(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,s,a,o){const r=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+r,t+l,i,s,a,o),this}absarc(e,t,i,s,a,o){return this.absellipse(e,t,i,i,s,a,o),this}ellipse(e,t,i,s,a,o,r,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,i,s,a,o,r,l),this}absellipse(e,t,i,s,a,o,r,l){const c=new Ic(e,t,i,s,a,o,r,l);if(this.curves.length>0){const d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class xo extends jt{constructor(e=[new Se(0,-.5),new Se(.5,0),new Se(0,.5)],t=12,i=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:i,phiLength:s},t=Math.floor(t),s=Ft(s,0,Math.PI*2);const a=[],o=[],r=[],l=[],c=[],h=1/t,d=new U,u=new Se,f=new U,g=new U,b=new U;let p=0,m=0;for(let y=0;y<=e.length-1;y++)switch(y){case 0:p=e[y+1].x-e[y].x,m=e[y+1].y-e[y].y,f.x=m*1,f.y=-p,f.z=m*0,b.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(b.x,b.y,b.z);break;default:p=e[y+1].x-e[y].x,m=e[y+1].y-e[y].y,f.x=m*1,f.y=-p,f.z=m*0,g.copy(f),f.x+=b.x,f.y+=b.y,f.z+=b.z,f.normalize(),l.push(f.x,f.y,f.z),b.copy(g)}for(let y=0;y<=t;y++){const v=i+y*h*s,x=Math.sin(v),T=Math.cos(v);for(let M=0;M<=e.length-1;M++){d.x=e[M].x*x,d.y=e[M].y,d.z=e[M].x*T,o.push(d.x,d.y,d.z),u.x=y/t,u.y=M/(e.length-1),r.push(u.x,u.y);const S=l[3*M+0]*x,C=l[3*M+1],N=l[3*M+0]*T;c.push(S,C,N)}}for(let y=0;y<t;y++)for(let v=0;v<e.length-1;v++){const x=v+y*e.length,T=x,M=x+e.length,S=x+e.length+1,C=x+1;a.push(T,M,C),a.push(S,C,M)}this.setIndex(a),this.setAttribute("position",new vt(o,3)),this.setAttribute("uv",new vt(r,2)),this.setAttribute("normal",new vt(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xo(e.points,e.segments,e.phiStart,e.phiLength)}}class Gn extends xo{constructor(e=1,t=1,i=4,s=8){const a=new Bv;a.absarc(0,-t/2,e,Math.PI*1.5,0),a.absarc(0,t/2,e,0,Math.PI*.5),super(a.getPoints(i),s),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:i,radialSegments:s}}static fromJSON(e){return new Gn(e.radius,e.length,e.capSegments,e.radialSegments)}}class Mn extends jt{constructor(e=1,t=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:s},t=Math.max(3,t);const a=[],o=[],r=[],l=[],c=new U,h=new Se;o.push(0,0,0),r.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=t;d++,u+=3){const f=i+d/t*s;c.x=e*Math.cos(f),c.y=e*Math.sin(f),o.push(c.x,c.y,c.z),r.push(0,0,1),h.x=(o[u]/e+1)/2,h.y=(o[u+1]/e+1)/2,l.push(h.x,h.y)}for(let d=1;d<=t;d++)a.push(d,d+1,0);this.setIndex(a),this.setAttribute("position",new vt(o,3)),this.setAttribute("normal",new vt(r,3)),this.setAttribute("uv",new vt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mn(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class dt extends jt{constructor(e=1,t=1,i=1,s=32,a=1,o=!1,r=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:a,openEnded:o,thetaStart:r,thetaLength:l};const c=this;s=Math.floor(s),a=Math.floor(a);const h=[],d=[],u=[],f=[];let g=0;const b=[],p=i/2;let m=0;y(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new vt(d,3)),this.setAttribute("normal",new vt(u,3)),this.setAttribute("uv",new vt(f,2));function y(){const x=new U,T=new U;let M=0;const S=(t-e)/i;for(let C=0;C<=a;C++){const N=[],_=C/a,w=_*(t-e)+e;for(let L=0;L<=s;L++){const I=L/s,B=I*l+r,j=Math.sin(B),F=Math.cos(B);T.x=w*j,T.y=-_*i+p,T.z=w*F,d.push(T.x,T.y,T.z),x.set(j,S,F).normalize(),u.push(x.x,x.y,x.z),f.push(I,1-_),N.push(g++)}b.push(N)}for(let C=0;C<s;C++)for(let N=0;N<a;N++){const _=b[N][C],w=b[N+1][C],L=b[N+1][C+1],I=b[N][C+1];e>0&&(h.push(_,w,I),M+=3),t>0&&(h.push(w,L,I),M+=3)}c.addGroup(m,M,0),m+=M}function v(x){const T=g,M=new Se,S=new U;let C=0;const N=x===!0?e:t,_=x===!0?1:-1;for(let L=1;L<=s;L++)d.push(0,p*_,0),u.push(0,_,0),f.push(.5,.5),g++;const w=g;for(let L=0;L<=s;L++){const B=L/s*l+r,j=Math.cos(B),F=Math.sin(B);S.x=N*F,S.y=p*_,S.z=N*j,d.push(S.x,S.y,S.z),u.push(0,_,0),M.x=j*.5+.5,M.y=F*.5*_+.5,f.push(M.x,M.y),g++}for(let L=0;L<s;L++){const I=T+L,B=w+L;x===!0?h.push(B,B+1,I):h.push(B+1,B,I),C+=3}c.addGroup(m,C,x===!0?1:2),m+=C}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new dt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ji extends dt{constructor(e=1,t=1,i=32,s=1,a=!1,o=0,r=Math.PI*2){super(0,e,t,i,s,a,o,r),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:r}}static fromJSON(e){return new ji(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class _o extends jt{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};const a=[],o=[];r(s),c(i),h(),this.setAttribute("position",new vt(a,3)),this.setAttribute("normal",new vt(a.slice(),3)),this.setAttribute("uv",new vt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function r(y){const v=new U,x=new U,T=new U;for(let M=0;M<t.length;M+=3)f(t[M+0],v),f(t[M+1],x),f(t[M+2],T),l(v,x,T,y)}function l(y,v,x,T){const M=T+1,S=[];for(let C=0;C<=M;C++){S[C]=[];const N=y.clone().lerp(x,C/M),_=v.clone().lerp(x,C/M),w=M-C;for(let L=0;L<=w;L++)L===0&&C===M?S[C][L]=N:S[C][L]=N.clone().lerp(_,L/w)}for(let C=0;C<M;C++)for(let N=0;N<2*(M-C)-1;N++){const _=Math.floor(N/2);N%2===0?(u(S[C][_+1]),u(S[C+1][_]),u(S[C][_])):(u(S[C][_+1]),u(S[C+1][_+1]),u(S[C+1][_]))}}function c(y){const v=new U;for(let x=0;x<a.length;x+=3)v.x=a[x+0],v.y=a[x+1],v.z=a[x+2],v.normalize().multiplyScalar(y),a[x+0]=v.x,a[x+1]=v.y,a[x+2]=v.z}function h(){const y=new U;for(let v=0;v<a.length;v+=3){y.x=a[v+0],y.y=a[v+1],y.z=a[v+2];const x=p(y)/2/Math.PI+.5,T=m(y)/Math.PI+.5;o.push(x,1-T)}g(),d()}function d(){for(let y=0;y<o.length;y+=6){const v=o[y+0],x=o[y+2],T=o[y+4],M=Math.max(v,x,T),S=Math.min(v,x,T);M>.9&&S<.1&&(v<.2&&(o[y+0]+=1),x<.2&&(o[y+2]+=1),T<.2&&(o[y+4]+=1))}}function u(y){a.push(y.x,y.y,y.z)}function f(y,v){const x=y*3;v.x=e[x+0],v.y=e[x+1],v.z=e[x+2]}function g(){const y=new U,v=new U,x=new U,T=new U,M=new Se,S=new Se,C=new Se;for(let N=0,_=0;N<a.length;N+=9,_+=6){y.set(a[N+0],a[N+1],a[N+2]),v.set(a[N+3],a[N+4],a[N+5]),x.set(a[N+6],a[N+7],a[N+8]),M.set(o[_+0],o[_+1]),S.set(o[_+2],o[_+3]),C.set(o[_+4],o[_+5]),T.copy(y).add(v).add(x).divideScalar(3);const w=p(T);b(M,_+0,y,w),b(S,_+2,v,w),b(C,_+4,x,w)}}function b(y,v,x,T){T<0&&y.x===1&&(o[v]=y.x-1),x.x===0&&x.z===0&&(o[v]=T/2/Math.PI+.5)}function p(y){return Math.atan2(y.z,-y.x)}function m(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _o(e.vertices,e.indices,e.radius,e.details)}}class la extends _o{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,s=1/i,a=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-i,0,-s,i,0,s,-i,0,s,i,-s,-i,0,-s,i,0,s,-i,0,s,i,0,-i,0,-s,i,0,-s,-i,0,s,i,0,s],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(a,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new la(e.radius,e.detail)}}class Uc extends _o{constructor(e=1,t=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Uc(e.radius,e.detail)}}class ct extends jt{constructor(e=1,t=32,i=16,s=0,a=Math.PI*2,o=0,r=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:a,thetaStart:o,thetaLength:r},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(o+r,Math.PI);let c=0;const h=[],d=new U,u=new U,f=[],g=[],b=[],p=[];for(let m=0;m<=i;m++){const y=[],v=m/i;let x=0;m===0&&o===0?x=.5/t:m===i&&l===Math.PI&&(x=-.5/t);for(let T=0;T<=t;T++){const M=T/t;d.x=-e*Math.cos(s+M*a)*Math.sin(o+v*r),d.y=e*Math.cos(o+v*r),d.z=e*Math.sin(s+M*a)*Math.sin(o+v*r),g.push(d.x,d.y,d.z),u.copy(d).normalize(),b.push(u.x,u.y,u.z),p.push(M+x,1-v),y.push(c++)}h.push(y)}for(let m=0;m<i;m++)for(let y=0;y<t;y++){const v=h[m][y+1],x=h[m][y],T=h[m+1][y],M=h[m+1][y+1];(m!==0||o>0)&&f.push(v,x,M),(m!==i-1||l<Math.PI)&&f.push(x,T,M)}this.setIndex(f),this.setAttribute("position",new vt(g,3)),this.setAttribute("normal",new vt(b,3)),this.setAttribute("uv",new vt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ct(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Wt extends jt{constructor(e=1,t=.4,i=12,s=48,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:a},i=Math.floor(i),s=Math.floor(s);const o=[],r=[],l=[],c=[],h=new U,d=new U,u=new U;for(let f=0;f<=i;f++)for(let g=0;g<=s;g++){const b=g/s*a,p=f/i*Math.PI*2;d.x=(e+t*Math.cos(p))*Math.cos(b),d.y=(e+t*Math.cos(p))*Math.sin(b),d.z=t*Math.sin(p),r.push(d.x,d.y,d.z),h.x=e*Math.cos(b),h.y=e*Math.sin(b),u.subVectors(d,h).normalize(),l.push(u.x,u.y,u.z),c.push(g/s),c.push(f/i)}for(let f=1;f<=i;f++)for(let g=1;g<=s;g++){const b=(s+1)*f+g-1,p=(s+1)*(f-1)+g-1,m=(s+1)*(f-1)+g,y=(s+1)*f+g;o.push(b,p,y),o.push(p,m,y)}this.setIndex(o),this.setAttribute("position",new vt(r,3)),this.setAttribute("normal",new vt(l,3)),this.setAttribute("uv",new vt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wt(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Ve extends Qi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new He(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new He(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=td,this.normalScale=new Se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class oc extends Ve{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Se(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ft(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new He(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new He(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new He(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class zv extends bd{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}class Fc extends Ot{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new He(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Gv extends Fc{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ot.DEFAULT_UP),this.updateMatrix(),this.groundColor=new He(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const cr=new gt,eh=new U,th=new U;class Hv{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Se(512,512),this.map=null,this.mapPass=null,this.matrix=new gt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Pc,this._frameExtents=new Se(1,1),this._viewportCount=1,this._viewports=[new Tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;eh.setFromMatrixPosition(e.matrixWorld),t.position.copy(eh),th.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(th),t.updateMatrixWorld(),cr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(cr),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(cr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Vv extends Hv{constructor(){super(new Lc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Wv extends Fc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ot.DEFAULT_UP),this.updateMatrix(),this.target=new Ot,this.shadow=new Vv}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class $v extends Fc{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class qv{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=nh(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=nh();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function nh(){return performance.now()}const ih=new gt;class Xv{constructor(e,t,i=0,s=1/0){this.ray=new vo(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new Rc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return ih.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ih),this}intersectObject(e,t=!0,i=[]){return rc(e,this,i,t),i.sort(sh),i}intersectObjects(e,t=!0,i=[]){for(let s=0,a=e.length;s<a;s++)rc(e[s],this,i,t);return i.sort(sh),i}}function sh(n,e){return n.distance-e.distance}function rc(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){const a=n.children;for(let o=0,r=a.length;o<r;o++)rc(a[o],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:xc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=xc);function Yv(n){const e=new Mv({canvas:n,antialias:!0});return e.setPixelRatio(Math.min(2,devicePixelRatio||1)),e.shadowMap.enabled=!0,e.shadowMap.type=Gh,e.toneMapping=Vh,e.toneMappingExposure=1.05,e.outputColorSpace=mn,e}function wd(n){const e=new Sv;return e.background=new He(n),e.fog=new Dc(new He(n),90,200),e.add(new Gv(16777215,9075290,.72)),e.add(new $v(7368816,.35)),e}function Ed(n,e,t){const i=new Wv(16774104,1.65);i.position.set(e*.5-22,46,t*.5-30),i.castShadow=!0,i.shadow.mapSize.set(2048,2048);const s=i.shadow.camera,a=Math.max(e,t)*.62;return s.left=-a,s.right=a,s.top=a,s.bottom=-a,s.near=1,s.far=160,i.shadow.bias=-4e-4,i.shadow.normalBias=.04,i.shadow.radius=5,i.target.position.set(e*.5,0,t*.5),n.add(i,i.target),i}class Oc{constructor(e,t){this.target=new U,this.goalTarget=new U,this.frustum=20,this.az=0,this.pol=.6,this.dist=80,this.bw=e,this.bh=t,this.camera=new Lc(-1,1,1,-1,-60,300),this.target.set(e/2,0,t/2),this.goalTarget.copy(this.target),this.place()}place(){const e=Math.sin(this.pol)*this.dist,t=Math.cos(this.pol)*this.dist;this.camera.position.set(this.target.x+e*Math.sin(this.az),this.target.y+t,this.target.z+e*Math.cos(this.az)),this.camera.up.set(0,1,0),this.camera.lookAt(this.target)}resize(e,t){const i=e/t,s=this.frustum;this.camera.left=-s*i,this.camera.right=s*i,this.camera.top=s,this.camera.bottom=-s,this.camera.updateProjectionMatrix()}follow(e,t){const i=Math.min(this.bw*.28,9),s=Math.min(this.bh*.22,11);this.goalTarget.set(ba.clamp(e,i,this.bw-i),0,ba.clamp(t,s,this.bh-s))}setFrustum(e,t,i){this.frustum=ba.clamp(e,9,34),this.resize(t,i)}zoomBy(e,t,i){this.setFrustum(this.frustum*e,t,i)}rotate(e){this.az-=e*.005,this.place()}tilt(e){this.pol=ba.clamp(this.pol-e*.004,.18,1.05),this.place()}update(e){this.target.lerp(this.goalTarget,Math.min(1,e*3.2)),this.place()}}const he=(n=0,e=0)=>({x:n,y:e}),un=(n,e)=>({x:n.x-e.x,y:n.y-e.y}),Bc=(n,e)=>({x:n.x*e,y:n.y*e}),on=n=>Math.hypot(n.x,n.y),Td=(n,e)=>Math.hypot(n.x-e.x,n.y-e.y),sn=n=>{const e=Math.hypot(n.x,n.y)||1;return{x:n.x/e,y:n.y/e}},Si=(n,e,t)=>n<e?e:n>t?t:n,Ad={sidewalk:{fric:4.5,drag:.15},chalk:{fric:5,drag:.15},ice:{fric:2.2,drag:.05},cardboard:{fric:8,drag:.35},dirt:{fric:9.5,drag:.45},sand:{fric:17,drag:.9},grass:{fric:19,drag:1},mud:{fric:30,drag:1.8},water:{fric:7,drag:.5},ramp:{fric:6,drag:.2},push:{fric:11,drag:.5},out:{fric:24,drag:1},felt:{fric:6,drag:.22},frost:{fric:3.2,drag:.08},metal:{fric:5.2,drag:.16},carpet:{fric:12,drag:.75},gum:{fric:32,drag:2},magnet:{fric:6.5,drag:.2},vortex:{fric:6,drag:.2}},Cd=.55,jv={weight:1,slide:1,stability:1,bounce:1,control:1,power:1,grip:1};function Kv(n,e,t,i,s,a){return{id:n,name:e,skin:t,isAI:s,ai:a,stats:{...i},radius:.82,pos:he(),vel:he(),z:0,vz:0,airborne:!1,angle:Math.random()*6.28,angVel:0,bob:Math.random()*6.28,progress:0,checkpoint:0,cpPos:he(),turnStart:he(),preFlick:he(),resetTo:he(),consumed:new Set,takenBonus:new Set,flicksLeft:3,bonusFlicks:0,special10:!1,bombed:!1,holed:!1,skipTurns:0,finished:!1,place:0,lap:0,moving:!1,hitFlash:0,lastTurnProg:0,stuckTurns:0,rescues:0,rescueProg:0,team:-1,items:[],shield:!1,boostNext:1,smashNext:!1,smash:!1,ghostNext:!1,ghost:!1,anchored:!1,eliminated:!1,itemFlash:0}}const Jv=.42,zc=27;function Rd(n){const e=[];if(n.type==="band"){const t=Math.cos(n.dir||0)*n.r,i=Math.sin(n.dir||0)*n.r;e.push({a:he(n.x-t,n.y-i),b:he(n.x+t,n.y+i)})}else if(n.type==="mill"){const t=n.n===4?2:1;for(let i=0;i<t;i++){const s=(n.dir||0)+i*Math.PI/2,a=Math.cos(s)*n.r,o=Math.sin(s)*n.r;e.push({a:he(n.x-a,n.y-o),b:he(n.x+a,n.y+o)})}}return e}function lr(n,e,t){const i=t.x-e.x,s=t.y-e.y,a=i*i+s*s||1e-6;let o=Si(((n.x-e.x)*i+(n.y-e.y)*s)/a,0,1);const r=e.x+i*o,l=e.y+s*o;return{d:Math.hypot(n.x-r,n.y-l),t:o,cx:r,cy:l}}function Zv(n,e,t,i){const s=(c,h,d)=>(c.x-h.x)*(d.y-h.y)-(c.y-h.y)*(d.x-h.x),a=s(t,i,n),o=s(t,i,e),r=s(n,e,t),l=s(n,e,i);return a>0!=o>0&&r>0!=l>0}class Pd{constructor(e){this.arcs=[0],this.total=0,this.cell=5,this.cols=0,this.rows=0,this.grid=[],this.def=e;let t=0;for(let s=1;s<e.path.length;s++)t+=Math.hypot(e.path[s].x-e.path[s-1].x,e.path[s].y-e.path[s-1].y),this.arcs.push(t);this.total=t,this.cols=Math.ceil(e.w/this.cell)+1,this.rows=Math.ceil(e.h/this.cell)+1,this.grid=Array.from({length:this.cols*this.rows},()=>[]);const i=Math.max(...e.half)+2;for(let s=1;s<e.path.length;s++){const a=e.path[s-1],o=e.path[s],r=Math.min(a.x,o.x)-i,l=Math.max(a.x,o.x)+i,c=Math.min(a.y,o.y)-i,h=Math.max(a.y,o.y)+i;for(let d=Math.floor(c/this.cell);d<=Math.floor(h/this.cell);d++)for(let u=Math.floor(r/this.cell);u<=Math.floor(l/this.cell);u++)u<0||d<0||u>=this.cols||d>=this.rows||this.grid[d*this.cols+u].push(s)}}halfAt(e,t){const i=this.def.half;return i[e-1]*(1-t)+i[Math.min(e,i.length-1)]*t}nearest(e){const t=Si(Math.floor(e.x/this.cell),0,this.cols-1),i=Si(Math.floor(e.y/this.cell),0,this.rows-1);let s=this.grid[i*this.cols+t],a=1/0,o=0,r=this.def.half[0];if((c=>{for(const h of c){const d=lr(e,this.def.path[h-1],this.def.path[h]);d.d<a&&(a=d.d,o=this.arcs[h-1]+d.t*(this.arcs[h]-this.arcs[h-1]),r=this.halfAt(h,d.t))}})(s),a===1/0)for(let c=1;c<this.def.path.length;c++){const h=lr(e,this.def.path[c-1],this.def.path[c]);h.d<a&&(a=h.d,o=this.arcs[c-1]+h.t*(this.arcs[c]-this.arcs[c-1]),r=this.halfAt(c,h.t))}return{d:a,arc:o,half:r}}progressOf(e){return this.nearest(e).arc}atArc(e){const t=this.def.path;e=Si(e,0,this.total);let i=1;for(;i<t.length-1&&this.arcs[i]<e;)i++;const s=this.arcs[i]-this.arcs[i-1]||1,a=Si((e-this.arcs[i-1])/s,0,1),o=t[i-1],r=t[i];return{p:he(o.x+(r.x-o.x)*a,o.y+(r.y-o.y)*a),tan:{x:(r.x-o.x)/s,y:(r.y-o.y)/s}}}inPad(e){for(const t of this.def.pads)if((e.x-t.x)**2+(e.y-t.y)**2<=t.r*t.r)return!0;return!1}surfaceAt(e){if(e.x<0||e.y<0||e.x>this.def.w||e.y>this.def.h)return"out";const t=this.nearest(e);if(!(t.d<=t.half||this.inPad(e)))return"out";let s=this.def.ground;for(const a of this.def.patches)a.r!=null?(e.x-a.x)**2+(e.y-a.y)**2<=a.r*a.r&&(s=a.surface):a.hw!=null&&a.hh!=null&&Math.abs(e.x-a.x)<=a.hw&&Math.abs(e.y-a.y)<=a.hh&&(s=a.surface);return s}patchAt(e){let t=null;for(const i of this.def.patches)i.r!=null?(e.x-i.x)**2+(e.y-i.y)**2<=i.r*i.r&&(t=i):i.hw!=null&&i.hh!=null&&Math.abs(e.x-i.x)<=i.hw&&Math.abs(e.y-i.y)<=i.hh&&(t=i);return t}collideWalls(e,t,i,s){let a=null;const o=(r,l,c)=>{e.x+=r*c,e.y+=l*c;const h=t.x*r+t.y*l;h<0&&(t.x-=(1+s)*h*r,t.y-=(1+s)*h*l),a={x:r,y:l}};for(const r of this.def.walls){const l=lr(e,r.a,r.b);if(l.d<i){let c=e.x-l.cx,h=e.y-l.cy;const d=Math.hypot(c,h)||1;o(c/d,h/d,i-l.d+.01)}}return a}obstacleAt(e,t){for(const i of this.def.obstacles){const s=i.r+(i.type==="stone"?t:t*.5);if((e.x-i.x)**2+(e.y-i.y)**2<=s*s)return i}return null}crossedFinish(e,t){return Zv(e,t,this.def.finish[0],this.def.finish[1])}}const Qv=26;function tt(n,e,t,i,s,a,o){n.fillStyle=s;for(let r=0;r<i;r++){n.globalAlpha=a*(.4+Math.random()*.6);const l=Math.random()*e,c=Math.random()*t,h=o*(.5+Math.random());n.beginPath(),n.arc(l,c,h,0,7),n.fill()}n.globalAlpha=1}const ah={dirt(n,e,t){n.fillStyle="#8a6a44",n.fillRect(0,0,e,t),tt(n,e,t,2600,"#6f5334",.5,2.2),tt(n,e,t,1400,"#a07f52",.4,2.4),tt(n,e,t,500,"#4f3a1f",.45,3.4),tt(n,e,t,120,"#3a2810",.35,5.5)},sand(n,e,t){n.fillStyle="#e6c98a",n.fillRect(0,0,e,t),tt(n,e,t,3200,"#d3b273",.4,1.7),tt(n,e,t,900,"#f3ddab",.5,2),n.strokeStyle="rgba(198,168,108,0.22)",n.lineWidth=2;for(let i=0;i<t;i+=24){n.beginPath();for(let s=0;s<e;s+=22)n.lineTo(s,i+Math.sin(s*.02+i*.1)*4);n.stroke()}},sidewalk(n,e,t){n.fillStyle="#b9b3a6",n.fillRect(0,0,e,t),tt(n,e,t,1800,"#a49e90",.35,2.4),tt(n,e,t,700,"#cfc9bc",.35,2.2),n.strokeStyle="rgba(120,114,100,0.5)",n.lineWidth=3;for(let i=0;i<t;i+=Qv*6)n.beginPath(),n.moveTo(0,i),n.lineTo(e,i+(Math.random()-.5)*10),n.stroke();n.strokeStyle="rgba(90,84,72,0.35)",n.lineWidth=1.4;for(let i=0;i<8;i++){n.beginPath();let s=Math.random()*e,a=Math.random()*t;n.moveTo(s,a);for(let o=0;o<4;o++)s+=(Math.random()-.5)*90,a+=(Math.random()-.5)*90,n.lineTo(s,a);n.stroke()}},cardboard(n,e,t){n.fillStyle="#cba875",n.fillRect(0,0,e,t),tt(n,e,t,1200,"#b9915f",.4,2.2),n.strokeStyle="rgba(150,110,70,0.26)",n.lineWidth=2;for(let i=0;i<e;i+=10)n.beginPath(),n.moveTo(i,0),n.lineTo(i,t),n.stroke();n.fillStyle="rgba(214,204,184,0.45)";for(let i=0;i<5;i++)n.save(),n.translate(Math.random()*e,Math.random()*t),n.rotate(Math.random()*3),n.fillRect(-42,-8,84,16),n.restore()},grass(n,e,t){n.fillStyle="#4f7d30",n.fillRect(0,0,e,t),tt(n,e,t,2200,"#3e6626",.5,2.6),tt(n,e,t,1200,"#6f9c40",.5,2.2),n.lineWidth=1.4;const i=Math.min(6e3,Math.floor(e*t/1100));for(let s=0;s<i;s++){const a=Math.random()*e,o=Math.random()*t,r=Math.random();n.strokeStyle=r<.45?"#3c6322":r<.8?"#6fa840":"#84c052",n.beginPath(),n.moveTo(a,o),n.lineTo(a+(Math.random()-.5)*4,o-4-Math.random()*5),n.stroke()}},felt(n,e,t){n.fillStyle="#2e7d4b",n.fillRect(0,0,e,t),tt(n,e,t,2600,"#256b3e",.45,2),tt(n,e,t,1400,"#3a915c",.4,1.8),tt(n,e,t,400,"#1d5a33",.4,3),n.strokeStyle="rgba(210,240,220,0.06)",n.lineWidth=8;for(let i=0;i<7;i++){const s=Math.random()*t;n.beginPath(),n.moveTo(0,s),n.lineTo(e,s+(Math.random()-.5)*120),n.stroke()}n.strokeStyle="rgba(20,60,35,0.20)",n.lineWidth=2;for(let i=0;i<5;i++){const s=Math.random()*e,a=Math.random()*t;n.beginPath(),n.moveTo(s,a),n.lineTo(s+(Math.random()-.5)*260,a+(Math.random()-.5)*260),n.stroke()}},frost(n,e,t){const i=n.createLinearGradient(0,0,e,t);i.addColorStop(0,"#dcecf4"),i.addColorStop(.5,"#c8dfea"),i.addColorStop(1,"#d4e8f2"),n.fillStyle=i,n.fillRect(0,0,e,t),tt(n,e,t,2200,"#b6d4e2",.4,2.2),tt(n,e,t,1600,"#f2fbff",.5,1.6),n.strokeStyle="rgba(255,255,255,0.55)",n.lineWidth=1.6,n.lineCap="round";for(let s=0;s<26;s++){let a=Math.random()*e,o=Math.random()*t,r=Math.random()*6.28;for(let l=0;l<5;l++){const c=a+Math.cos(r)*26,h=o+Math.sin(r)*26;n.beginPath(),n.moveTo(a,o),n.lineTo(c,h),n.stroke(),n.beginPath(),n.moveTo((a+c)/2,(o+h)/2),n.lineTo((a+c)/2+Math.cos(r+.9)*12,(o+h)/2+Math.sin(r+.9)*12),n.stroke(),a=c,o=h,r+=(Math.random()-.5)*.7}}n.fillStyle="rgba(255,255,255,0.9)";for(let s=0;s<320;s++)n.globalAlpha=.3+Math.random()*.55,n.beginPath(),n.arc(Math.random()*e,Math.random()*t,1+Math.random()*1.6,0,7),n.fill();n.globalAlpha=1},metal(n,e,t){n.fillStyle="#9aa4ac",n.fillRect(0,0,e,t);for(let i=0;i<t;i+=3)n.globalAlpha=.05+Math.random()*.09,n.fillStyle=Math.random()<.5?"#7e8890":"#c2ccd4",n.fillRect(0,i,e,2);n.globalAlpha=1,n.strokeStyle="rgba(60,68,76,0.35)",n.lineWidth=1.4;for(let i=0;i<10;i++){const s=Math.random()*e,a=Math.random()*t;n.beginPath(),n.moveTo(s,a),n.lineTo(s+(Math.random()-.5)*220,a+(Math.random()-.5)*40),n.stroke()}for(let i=0;i<26;i++){const s=Math.random()*e,a=Math.random()*t;n.fillStyle="#78828a",n.beginPath(),n.arc(s,a,7,0,7),n.fill(),n.fillStyle="#cdd7de",n.beginPath(),n.arc(s-2,a-2,3.4,0,7),n.fill()}},carpet(n,e,t){n.fillStyle="#a05648",n.fillRect(0,0,e,t),tt(n,e,t,2400,"#8a4438",.5,2.4),tt(n,e,t,1600,"#b96a58",.45,2),n.lineWidth=1.6;const i=Math.min(7e3,Math.floor(e*t/950));for(let s=0;s<i;s++){const a=Math.random()*e,o=Math.random()*t,r=Math.random()*6.28,l=Math.random();n.strokeStyle=l<.4?"#7e3c30":l<.8?"#b56553":"#cd8068",n.beginPath(),n.moveTo(a,o),n.lineTo(a+Math.cos(r)*5,o+Math.sin(r)*5),n.stroke()}n.strokeStyle="rgba(60,25,18,0.14)",n.lineWidth=3;for(let s=0;s<t;s+=54)n.beginPath(),n.moveTo(0,s),n.lineTo(e,s),n.stroke();for(let s=0;s<e;s+=54)n.beginPath(),n.moveTo(s,0),n.lineTo(s,t),n.stroke()},mud:()=>{},water:()=>{},ramp:()=>{},push:()=>{},chalk:()=>{},ice:()=>{},out:()=>{},gum:()=>{},magnet:()=>{},vortex:()=>{},wetdirt(n,e,t){n.fillStyle="#5f4c30",n.fillRect(0,0,e,t),tt(n,e,t,3e3,"#4a3a22",.55,2.4),tt(n,e,t,1200,"#6f5a3a",.4,2),tt(n,e,t,400,"#33260f",.5,3.6);for(let i=0;i<26;i++)n.globalAlpha=.1+Math.random()*.12,n.fillStyle="#b8d4e2",n.beginPath(),n.ellipse(Math.random()*e,Math.random()*t,26+Math.random()*70,8+Math.random()*18,Math.random()*3,0,7),n.fill();n.globalAlpha=1;for(let i=0;i<30;i++)n.fillStyle=Math.random()<.5?"#5f8a36":"#3f5c22",n.globalAlpha=.6,n.beginPath(),n.ellipse(Math.random()*e,Math.random()*t,7,3.5,Math.random()*3,0,7),n.fill();n.globalAlpha=1},garden(n,e,t){n.fillStyle="#5c4a2e",n.fillRect(0,0,e,t),tt(n,e,t,2600,"#4a3a20",.5,2.2),tt(n,e,t,1e3,"#6f5c3a",.4,2);for(let s=0;s<60;s++)n.globalAlpha=.16+Math.random()*.18,n.fillStyle=Math.random()<.5?"#4f7d30":"#3e6626",n.beginPath(),n.arc(Math.random()*e,Math.random()*t,14+Math.random()*34,0,7),n.fill();n.globalAlpha=1,n.lineWidth=1.4;const i=Math.min(3200,Math.floor(e*t/2100));for(let s=0;s<i;s++){const a=Math.random()*e,o=Math.random()*t;n.strokeStyle=Math.random()<.5?"#5f9a38":"#7bbd4a",n.beginPath(),n.moveTo(a,o),n.lineTo(a+(Math.random()-.5)*4,o-4-Math.random()*4),n.stroke()}},cement(n,e,t){n.fillStyle="#a29a8a",n.fillRect(0,0,e,t),tt(n,e,t,1600,"#948c7c",.35,2.4),tt(n,e,t,700,"#b4ac9c",.35,2.2),n.strokeStyle="rgba(120,112,98,0.22)",n.lineWidth=7;for(let i=0;i<12;i++){const s=Math.random()*e,a=Math.random()*t,o=40+Math.random()*90;n.beginPath(),n.arc(s,a,o,Math.random()*3,Math.random()*3+2.2),n.stroke()}n.strokeStyle="rgba(80,74,62,0.5)",n.lineWidth=2.4;for(let i=160;i<e;i+=220)n.beginPath(),n.moveTo(i,0),n.lineTo(i+(Math.random()-.5)*16,t),n.stroke();for(let i=0;i<240;i++)n.globalAlpha=.4,n.fillStyle=Math.random()<.5?"#7e7668":"#c2baa8",n.beginPath(),n.arc(Math.random()*e,Math.random()*t,1.6+Math.random()*2.4,0,7),n.fill();n.globalAlpha=1},clay(n,e,t){n.fillStyle="#9a5a34",n.fillRect(0,0,e,t),tt(n,e,t,2600,"#7e441f",.5,2.4),tt(n,e,t,1200,"#b06a40",.4,2.2),tt(n,e,t,300,"#5f3014",.5,4),n.lineCap="round";for(let i=0;i<4;i++){const s=Math.random()*t,a=20+Math.random()*40,o=Math.random()*6;for(const r of[0,26]){n.strokeStyle="rgba(94,48,20,0.55)",n.lineWidth=9,n.beginPath();for(let l=0;l<=e;l+=24)n.lineTo(l,s+r+Math.sin(l*.008+o)*a);n.stroke(),n.strokeStyle="rgba(60,28,10,0.35)",n.lineWidth=3,n.beginPath();for(let l=0;l<=e;l+=24)n.lineTo(l,s+r+Math.sin(l*.008+o)*a);n.stroke()}}n.strokeStyle="rgba(70,32,12,0.4)",n.lineWidth=1.6;for(let i=0;i<14;i++){let s=Math.random()*e,a=Math.random()*t;n.beginPath(),n.moveTo(s,a);for(let o=0;o<4;o++)s+=(Math.random()-.5)*60,a+=(Math.random()-.5)*60,n.lineTo(s,a);n.stroke()}},gingham(n,e,t){n.fillStyle="#f4ede0",n.fillRect(0,0,e,t);const i=52;n.fillStyle="rgba(200,70,64,0.55)";for(let s=0;s<e;s+=i*2)n.fillRect(s,0,i,t);for(let s=0;s<t;s+=i*2)n.fillRect(0,s,e,i);n.globalAlpha=.1,n.strokeStyle="#8a4038",n.lineWidth=1;for(let s=0;s<e;s+=4)n.beginPath(),n.moveTo(s,0),n.lineTo(s,t),n.stroke();for(let s=0;s<t;s+=4)n.beginPath(),n.moveTo(0,s),n.lineTo(e,s),n.stroke();n.globalAlpha=1},stripes(n,e,t){const i=["#3f9a5c","#f2e2b0"];for(let a=-t,o=0;a<e+t;a+=74,o++)n.fillStyle=i[o%2],n.beginPath(),n.moveTo(a,0),n.lineTo(a+74,0),n.lineTo(a+74-t*.35,t),n.lineTo(a-t*.35,t),n.closePath(),n.fill();tt(n,e,t,1600,"#5a4a2e",.14,2.2),n.strokeStyle="rgba(90,74,46,0.3)",n.lineWidth=2;for(let a=0;a<5;a++){const o=Math.random()*e,r=Math.random()*t;n.strokeRect(o,r,60+Math.random()*60,40+Math.random()*40)}},planks(n,e,t){n.fillStyle="#8a5a34",n.fillRect(0,0,e,t);const i=64;for(let s=0,a=0;s<t;s+=i,a++){n.fillStyle=a%2?"rgba(122,74,38,0.5)":"rgba(154,102,56,0.5)",n.fillRect(0,s,e,i),n.strokeStyle="rgba(60,36,16,0.6)",n.lineWidth=3,n.beginPath(),n.moveTo(0,s),n.lineTo(e,s),n.stroke(),n.strokeStyle="rgba(70,42,20,0.30)",n.lineWidth=1.6;for(let r=0;r<4;r++){const l=s+10+Math.random()*(i-20);n.beginPath();for(let c=0;c<=e;c+=30)n.lineTo(c,l+Math.sin(c*.02+r)*3);n.stroke()}const o=200+Math.random()*300;n.strokeStyle="rgba(60,36,16,0.55)",n.lineWidth=2.6;for(let r=o;r<e;r+=o)n.beginPath(),n.moveTo(r+(a%2?90:0),s),n.lineTo(r+(a%2?90:0),s+i),n.stroke()}for(let s=0;s<12;s++)n.fillStyle="rgba(56,32,14,0.6)",n.beginPath(),n.ellipse(Math.random()*e,Math.random()*t,5+Math.random()*5,3+Math.random()*3,Math.random()*3,0,7),n.fill()},slab(n,e,t){n.fillStyle="#a4756b",n.fillRect(0,0,e,t),tt(n,e,t,2e3,"#916359",.4,2.4),tt(n,e,t,800,"#b8857a",.35,2),n.strokeStyle="rgba(70,48,42,0.55)",n.lineWidth=3;const i=240,s=200;for(let a=i;a<e;a+=i)n.beginPath(),n.moveTo(a,0),n.lineTo(a+(Math.random()-.5)*10,t),n.stroke();for(let a=s;a<t;a+=s)n.beginPath(),n.moveTo(0,a),n.lineTo(e,a+(Math.random()-.5)*10),n.stroke();for(let a=0;a<8;a++)n.globalAlpha=.35,n.fillStyle="#3a2e2a",n.beginPath(),n.ellipse(Math.random()*e,Math.random()*t,24+Math.random()*40,16+Math.random()*26,Math.random()*3,0,7),n.fill();n.globalAlpha=1;for(let a=0;a<20;a++)n.globalAlpha=.3,n.fillStyle="#d8cfc2",n.beginPath(),n.ellipse(Math.random()*e,Math.random()*t,10+Math.random()*16,4+Math.random()*6,Math.random()*3,0,7),n.fill();n.globalAlpha=1},tiles(n,e,t){n.fillStyle="#bcdce4",n.fillRect(0,0,e,t);const i=44;for(let s=0;s<t;s+=i)for(let a=0;a<e;a+=i){const o=Math.random();n.fillStyle=o<.08?"#5f9ab8":o<.2?"#a4ccd8":o<.3?"#cde8ee":"#bcdce4",n.fillRect(a,s,i,i),n.fillStyle="rgba(255,255,255,0.35)",n.fillRect(a+4,s+4,i*.4,i*.16)}n.strokeStyle="rgba(120,150,160,0.75)",n.lineWidth=2.6;for(let s=0;s<=e;s+=i)n.beginPath(),n.moveTo(s,0),n.lineTo(s,t),n.stroke();for(let s=0;s<=t;s+=i)n.beginPath(),n.moveTo(0,s),n.lineTo(e,s),n.stroke()},dunes(n,e,t){const i=n.createLinearGradient(0,0,e,t);i.addColorStop(0,"#d59a52"),i.addColorStop(1,"#c9884a"),n.fillStyle=i,n.fillRect(0,0,e,t);for(let s=0;s<9;s++){const a=(s+.5)*t/9,o=26+Math.random()*30,r=Math.random()*6;n.fillStyle="rgba(150,92,40,0.30)",n.beginPath(),n.moveTo(0,a);for(let l=0;l<=e;l+=26)n.lineTo(l,a+Math.sin(l*.006+r)*o);for(let l=e;l>=0;l-=26)n.lineTo(l,a+30+Math.sin(l*.006+r)*o);n.closePath(),n.fill(),n.strokeStyle="rgba(244,214,160,0.55)",n.lineWidth=4,n.lineCap="round",n.beginPath();for(let l=0;l<=e;l+=26)n.lineTo(l,a+Math.sin(l*.006+r)*o);n.stroke()}tt(n,e,t,2200,"#b9773c",.35,1.8),tt(n,e,t,900,"#ecc084",.4,1.8)}};function eb(n,e){const t=Math.sin(n*12.9898+e*78.233)*43758.5453;return t-Math.floor(t)}function tb(n,e,t,i,s){n.beginPath();for(let o=0;o<=22;o++){const r=o/22*Math.PI*2,l=.8+.2*Math.sin(r*3+s*6.283)+.1*Math.sin(r*5-s*9),c=i*l,h=e+Math.cos(r)*c,d=t+Math.sin(r)*c;o?n.lineTo(h,d):n.moveTo(h,d)}n.closePath()}function nb(n,e,t,i,s,a){n.beginPath();for(let r=0;r<=26;r++){const l=r/26*Math.PI*2,c=1+.12*Math.sin(l*4+a*6.283),h=e+Math.cos(l)*i*c,d=t+Math.sin(l)*s*c;r?n.lineTo(h,d):n.moveTo(h,d)}n.closePath()}function ib(n,e,t,i){const[s,a]=t(e.x,e.y),o=e.r==null&&e.hw!=null&&e.hh!=null,r=(e.hw??e.r??1)*i,l=(e.hh??e.r??1)*i,c=Math.max(r,l),h=eb(Math.round(e.x*1.7),Math.round(e.y*1.3)),d=e.surface,u=()=>o?nb(n,s,a,r,l,h):tb(n,s,a,(e.r??1)*i,h);if(d==="ramp"||d==="push"){n.save(),n.beginPath(),n.arc(s,a,c,0,7),n.clip(),n.save(),n.translate(s,a),n.rotate(1.57-(e.dir??-1.57));const p=n.createLinearGradient(0,c,0,-c);d==="ramp"?(p.addColorStop(0,"#1f7a3a"),p.addColorStop(1,"#43c463")):(p.addColorStop(0,"#8a1810"),p.addColorStop(1,"#ef5a5f")),n.fillStyle=p,n.fillRect(-c,-c,c*2,c*2),n.strokeStyle="rgba(255,255,255,0.95)",n.lineWidth=c*.16,n.lineCap="round",n.lineJoin="round";for(let m=-1;m<=1;m++){const y=m*c*.52;n.beginPath(),n.moveTo(-c*.5,y+c*.24),n.lineTo(0,y-c*.24),n.lineTo(c*.5,y+c*.24),n.stroke()}n.restore(),n.restore();return}let f=Math.sin((h+1)*99.13)*9999;const g=()=>(f=Math.sin(f)*9999,f-Math.floor(f));n.save(),u(),n.clip();const b=p=>{n.fillStyle=p,n.fillRect(s-c,a-c,c*2,c*2)};if(d==="sand"){const p=n.createRadialGradient(s,a-c*.2,c*.2,s,a,c);p.addColorStop(0,"#f0d79a"),p.addColorStop(1,"#d6b271"),n.fillStyle=p,n.fillRect(s-c,a-c,c*2,c*2),n.lineWidth=Math.max(1.5,i*.1),n.lineCap="round";for(let m=0;m<6;m++){const y=a-c+(m+g())*c*.34;n.strokeStyle=m%2?"rgba(255,246,214,0.5)":"rgba(180,150,96,0.45)",n.beginPath();for(let v=s-c;v<=s+c;v+=i*.4)n.lineTo(v,y+Math.sin(v*.05+m)*i*.5);n.stroke()}for(let m=0;m<240;m++)n.globalAlpha=.35,n.fillStyle=g()<.5?"#c9a86a":"#fdeec4",n.beginPath(),n.arc(s+(g()-.5)*c*2,a+(g()-.5)*c*2,i*.06,0,7),n.fill();n.globalAlpha=1}else if(d==="mud"){const p=n.createRadialGradient(s-c*.2,a-c*.2,c*.1,s,a,c);p.addColorStop(0,"#6b4d2a"),p.addColorStop(.7,"#4a3418"),p.addColorStop(1,"#33240f"),n.fillStyle=p,n.fillRect(s-c,a-c,c*2,c*2);for(let y=0;y<16;y++)n.fillStyle=g()<.5?"rgba(92,68,38,0.7)":"rgba(38,26,12,0.6)",n.beginPath(),n.arc(s+(g()-.5)*c*1.5,a+(g()-.5)*c*1.5,i*(.14+g()*.36),0,7),n.fill();const m=n.createRadialGradient(s-c*.3,a-c*.35,0,s-c*.3,a-c*.35,c*.85);m.addColorStop(0,"rgba(255,240,200,0.28)"),m.addColorStop(1,"rgba(255,240,200,0)"),n.fillStyle=m,n.fillRect(s-c,a-c,c*2,c*2)}else if(d==="water"){const p=n.createRadialGradient(s,a,c*.15,s,a,c);p.addColorStop(0,"rgba(120,200,235,0.92)"),p.addColorStop(.7,"rgba(70,150,200,0.92)"),p.addColorStop(1,"rgba(40,110,165,0.94)"),n.fillStyle=p,n.fillRect(s-c,a-c,c*2,c*2),n.strokeStyle="rgba(255,255,255,0.42)",n.lineWidth=Math.max(1.2,i*.07);for(let m=1;m<=5;m++)n.globalAlpha=.5-m*.06,n.beginPath(),n.arc(s-c*.15,a-c*.1,c*(.18+m*.16),.3,2.5),n.stroke();n.globalAlpha=1,n.fillStyle="rgba(255,255,255,0.55)",n.beginPath(),n.ellipse(s-c*.35,a-c*.4,c*.28,c*.09,-.5,0,7),n.fill();for(let m=0;m<8;m++)n.fillStyle="rgba(255,255,255,0.5)",n.beginPath(),n.arc(s+(g()-.5)*c*1.6,a+(g()-.5)*c*1.6,i*.05,0,7),n.fill()}else if(d==="grass"){b("#4d7a2e");for(let p=0;p<200;p++){const m=s+(g()-.5)*c*2,y=a+(g()-.5)*c*2,v=i*(.3+g()*.5);n.strokeStyle=g()<.4?"#3c6322":g()<.8?"#5f9a38":"#7bbd4a",n.lineWidth=Math.max(1,i*.05),n.beginPath(),n.moveTo(m,y),n.lineTo(m+(g()-.5)*i*.3,y-v),n.stroke()}}else if(d==="ice"){const p=n.createRadialGradient(s-c*.25,a-c*.3,c*.1,s,a,c);p.addColorStop(0,"rgba(235,250,255,0.95)"),p.addColorStop(.6,"rgba(185,228,248,0.92)"),p.addColorStop(1,"rgba(140,200,235,0.94)"),n.fillStyle=p,n.fillRect(s-c,a-c,c*2,c*2),n.strokeStyle="rgba(255,255,255,0.75)",n.lineWidth=Math.max(1,i*.055),n.lineCap="round";for(let m=0;m<5;m++){let y=s+(g()-.5)*c,v=a+(g()-.5)*c;n.beginPath(),n.moveTo(y,v);for(let x=0;x<3;x++)y+=(g()-.5)*c*.9,v+=(g()-.5)*c*.9,n.lineTo(y,v);n.stroke()}n.fillStyle="rgba(255,255,255,0.8)",n.beginPath(),n.ellipse(s-c*.3,a-c*.35,c*.3,c*.1,-.6,0,7),n.fill(),n.strokeStyle="rgba(120,180,220,0.5)",n.lineWidth=Math.max(1,i*.04);for(let m=0;m<4;m++)n.beginPath(),n.arc(s+(g()-.5)*c,a+(g()-.5)*c,c*(.1+g()*.2),g()*3,g()*3+2),n.stroke()}else if(d==="gum"){const p=n.createRadialGradient(s-c*.25,a-c*.3,c*.1,s,a,c);p.addColorStop(0,"#ff9ec4"),p.addColorStop(.6,"#f272a8"),p.addColorStop(1,"#d64f8b"),n.fillStyle=p,n.fillRect(s-c,a-c,c*2,c*2),n.strokeStyle="rgba(255,210,230,0.75)",n.lineWidth=Math.max(1.4,i*.07),n.lineCap="round";for(let m=0;m<6;m++){const y=s+(g()-.5)*c*1.4,v=a+(g()-.5)*c*1.4;n.beginPath(),n.moveTo(y,v),n.quadraticCurveTo(y+(g()-.5)*c,v+(g()-.5)*c,y+(g()-.5)*c*1.4,v+(g()-.5)*c*1.4),n.stroke()}for(let m=0;m<7;m++)n.fillStyle="rgba(255,190,215,0.55)",n.beginPath(),n.arc(s+(g()-.5)*c*1.5,a+(g()-.5)*c*1.5,i*(.1+g()*.22),0,7),n.fill();n.fillStyle="rgba(255,255,255,0.65)",n.beginPath(),n.ellipse(s-c*.3,a-c*.38,c*.26,c*.09,-.5,0,7),n.fill()}else if(d==="magnet"){const p=n.createRadialGradient(s-c*.2,a-c*.25,c*.1,s,a,c);p.addColorStop(0,"#c3ccd4"),p.addColorStop(.7,"#98a3ac"),p.addColorStop(1,"#7c868e"),n.fillStyle=p,n.fillRect(s-c,a-c,c*2,c*2),n.strokeStyle="rgba(210,60,60,0.55)",n.lineWidth=Math.max(1.6,i*.09),n.setLineDash([i*.4,i*.32]);for(let m=1;m<=3;m++)n.beginPath(),n.arc(s,a,c*(.32+m*.2),0,7),n.stroke();n.setLineDash([]),n.save(),n.translate(s,a),n.rotate(h*6.283),n.lineCap="butt",n.strokeStyle="#d33c3c",n.lineWidth=c*.24,n.beginPath(),n.arc(0,0,c*.34,.6,Math.PI*2-.6),n.stroke(),n.fillStyle="#e8eef2";for(const m of[.6,-.6]){const y=Math.cos(m)*c*.34,v=Math.sin(m)*c*.34;n.save(),n.translate(y,v),n.rotate(m+1.57),n.fillRect(-c*.13,-c*.1,c*.26,c*.2),n.restore()}n.restore()}else if(d==="vortex"){const p=n.createRadialGradient(s,a,c*.05,s,a,c);p.addColorStop(0,"rgba(30,80,120,0.9)"),p.addColorStop(.55,"rgba(70,140,190,0.85)"),p.addColorStop(1,"rgba(120,185,225,0.8)"),n.fillStyle=p,n.fillRect(s-c,a-c,c*2,c*2);const m=Math.sin(e.x*3.7+e.y*2.3)>=0?1:-1;n.lineCap="round";for(let y=0;y<3;y++){n.strokeStyle=y?"rgba(255,255,255,0.55)":"rgba(255,255,255,0.8)",n.lineWidth=Math.max(2,i*(.16-y*.03)),n.beginPath();const v=h*6.283+y*2.09;for(let x=0;x<=1;x+=.04){const T=v+m*x*4.4,M=c*(.12+x*.8),S=s+Math.cos(T)*M,C=a+Math.sin(T)*M;x?n.lineTo(S,C):n.moveTo(S,C)}if(n.stroke(),y===0){const x=v+m*4.4,T=c*.92,M=s+Math.cos(x)*T,S=a+Math.sin(x)*T,C=x+m*1.62;n.fillStyle="rgba(255,255,255,0.85)",n.beginPath(),n.moveTo(M+Math.cos(C)*i*.5,S+Math.sin(C)*i*.5),n.lineTo(M+Math.cos(C+2.5)*i*.34,S+Math.sin(C+2.5)*i*.34),n.lineTo(M+Math.cos(C-2.5)*i*.34,S+Math.sin(C-2.5)*i*.34),n.closePath(),n.fill()}}n.fillStyle="rgba(15,45,75,0.9)",n.beginPath(),n.arc(s,a,c*.1,0,7),n.fill()}else if(d==="chalk"){n.fillStyle="rgba(240,240,245,0.14)",n.fillRect(s-c,a-c,c*2,c*2);const p=["#ff8fb0","#8fd0ff","#ffe38f","#a0ffb0","#c9a0ff"];for(let m=0;m<5;m++){n.strokeStyle=p[m%p.length],n.globalAlpha=.55,n.lineWidth=i*.14,n.lineCap="round";const y=s+(g()-.5)*c,v=a+(g()-.5)*c;n.beginPath(),n.moveTo(y,v),n.lineTo(y+(g()-.5)*c,v+(g()-.5)*c),n.stroke()}n.globalAlpha=1}else if(d==="cardboard"){b("#cba875"),n.strokeStyle="rgba(150,110,70,0.32)",n.lineWidth=i*.12;for(let p=s-c;p<s+c;p+=i*.55)n.beginPath(),n.moveTo(p,a-c),n.lineTo(p,a+c),n.stroke()}else if(d==="sidewalk"){b("#c6c0b2");for(let p=0;p<60;p++)n.globalAlpha=.3,n.fillStyle=g()<.5?"#b0a99a":"#dad4c6",n.beginPath(),n.arc(s+(g()-.5)*c*2,a+(g()-.5)*c*2,i*.07,0,7),n.fill();n.globalAlpha=1,n.strokeStyle="rgba(120,114,100,0.5)",n.lineWidth=i*.08,n.beginPath(),n.moveTo(s-c,a+(g()-.5)*c),n.lineTo(s+c,a+(g()-.5)*c),n.stroke()}else b("#c9bfa8");n.restore(),n.save(),u(),n.lineWidth=Math.max(2,i*.16),n.strokeStyle=d==="water"?"rgba(20,70,110,0.5)":d==="ice"?"rgba(90,150,200,0.55)":d==="gum"?"rgba(160,40,95,0.6)":d==="magnet"?"rgba(55,62,70,0.65)":d==="vortex"?"rgba(25,70,110,0.6)":"rgba(0,0,0,0.2)",n.stroke(),n.restore()}function sb(n){const e=n.path,t=n.half,i=[],s=[];for(let a=0;a<e.length;a++){const o=e[Math.max(0,a-1)],r=e[Math.min(e.length-1,a+1)];let l=-(r.y-o.y),c=r.x-o.x;const h=Math.hypot(l,c)||1;l/=h,c/=h;const d=t[a];i.push([e[a].x+l*d,e[a].y+c*d]),s.push([e[a].x-l*d,e[a].y-c*d])}return{L:i,R:s}}function ab(n){const e=Math.max(n.w,n.h),t=Math.max(9,Math.min(30,Math.floor(3800/e))),i=Math.round(n.w*t),s=Math.round(n.h*t),a=document.createElement("canvas");a.width=i,a.height=s;const o=a.getContext("2d"),r=(v,x)=>[v*t,s-x*t],l=()=>(ah[n.paint||n.ground]||ah.dirt)(o,i,s);l();const{L:c,R:h}=sb(n),d=new Path2D;for(let v=0;v<n.path.length;v++){const[x,T]=r(n.path[v].x,n.path[v].y),M=n.half[v]*t;d.moveTo(x+M,T),d.arc(x,T,M,0,Math.PI*2)}for(const v of n.pads){const[x,T]=r(v.x,v.y),M=v.r*t;d.moveTo(x+M,T),d.arc(x,T,M,0,Math.PI*2)}const u=n.paint==="gingham"||n.paint==="stripes"||n.paint==="tiles";o.fillStyle=u?"rgba(18,12,6,0.56)":"rgba(18,12,6,0.42)",o.fillRect(0,0,i,s),o.save(),o.clip(d,"nonzero"),l(),o.restore();for(const v of n.patches)ib(o,v,r,t);const f=(v,x,T)=>{o.strokeStyle=T,o.lineWidth=x,o.lineJoin="round",o.lineCap="round",o.beginPath(),v.forEach((M,S)=>{const[C,N]=r(M[0],M[1]);S?o.lineTo(C,N):o.moveTo(C,N)}),o.stroke()};f(c,Math.max(3,t*.55),"rgba(35,22,10,0.55)"),f(h,Math.max(3,t*.55),"rgba(35,22,10,0.55)"),f(c,Math.max(1.6,t*.28),"rgba(255,250,238,0.95)"),f(h,Math.max(1.6,t*.28),"rgba(255,250,238,0.95)"),o.strokeStyle="rgba(255,255,255,0.30)",o.lineWidth=Math.max(2,t*.16),o.setLineDash([t,t*1.2]),o.beginPath(),n.path.forEach((v,x)=>{const[T,M]=r(v.x,v.y);x?o.lineTo(T,M):o.moveTo(T,M)}),o.stroke(),o.setLineDash([]);const g=v=>{let x=0,T=1e9;for(let M=0;M<n.path.length;M++){const S=n.path[M].x-v.x,C=n.path[M].y-v.y,N=S*S+C*C;N<T&&(T=N,x=M)}return x};n.checkpoints.forEach((v,x)=>{if(x===0)return;const T=g(v),M=n.path[Math.max(0,T-1)],S=n.path[Math.min(n.path.length-1,T+1)];let C=-(S.y-M.y),N=S.x-M.x;const _=Math.hypot(C,N)||1;C/=_,N/=_;const w=n.half[T],[L,I]=r(v.x+C*w,v.y+N*w),[B,j]=r(v.x-C*w,v.y-N*w),[F,Q]=r(v.x,v.y);o.lineCap="butt",o.strokeStyle="rgba(40,190,235,0.42)",o.lineWidth=t*1.1,o.beginPath(),o.moveTo(L,I),o.lineTo(B,j),o.stroke(),o.strokeStyle="rgba(255,255,255,0.9)",o.lineWidth=Math.max(2,t*.18),o.setLineDash([t*.55,t*.4]),o.beginPath(),o.moveTo(L,I),o.lineTo(B,j),o.stroke(),o.setLineDash([]),o.fillStyle="#1f9ad0",o.beginPath(),o.arc(F,Q,t*.66,0,7),o.fill(),o.lineWidth=Math.max(2,t*.14),o.strokeStyle="#eafcff",o.stroke(),o.fillStyle="#fff",o.font=`900 ${Math.round(t*.82)}px sans-serif`,o.textAlign="center",o.textBaseline="middle",o.fillText(String(x),F,Q+1)});const b=(v,x,T)=>{const[M,S]=r(v[0],v[1]),[C,N]=r(x[0],x[1]),_=C-M,w=N-S,L=Math.hypot(_,w)||1,I=-w/L,B=_/L,j=3,F=L/10;for(let Q=0;Q<j;Q++)for(let K=0;K<10;K++){o.fillStyle=(Q+K)%2?T:"#fff";const me=M+_*K/10+I*(Q-1)*F,ge=S+w*K/10+B*(Q-1)*F;o.save(),o.translate(me,ge),o.rotate(Math.atan2(w,_)),o.fillRect(0,-F/2,F,F),o.restore()}},p={x:-Math.sin(n.startAngle),y:Math.cos(n.startAngle)},m=n.half[0];b([n.start.x-p.x*m,n.start.y-p.y*m],[n.start.x+p.x*m,n.start.y+p.y*m],"#2a7d3a"),b([n.finish[0].x,n.finish[0].y],[n.finish[1].x,n.finish[1].y],"#222");const y=new yo(a);return y.colorSpace=mn,y.anisotropy=8,y.needsUpdate=!0,y}function ob(n,e){const t=parseInt(n.slice(1),16);let i=(t>>16)+e,s=(t>>8&255)+e,a=(t&255)+e;return i=Math.min(255,i),s=Math.min(255,s),a=Math.min(255,a),`rgb(${i},${s},${a})`}function Gs(n,e=1){const i=document.createElement("canvas");i.width=i.height=128;const s=i.getContext("2d"),a=128/2,o=128/2;if(n==="jumparrow"){s.clearRect(0,0,128,128),s.strokeStyle="rgba(90,255,140,0.95)",s.lineWidth=16,s.lineCap="round",s.lineJoin="round";for(let l=-1;l<=1;l++){const c=o+l*34;s.beginPath(),s.moveTo(a-34,c+16),s.lineTo(a,c-16),s.lineTo(a+34,c+16),s.stroke()}}else if(n==="bomb")s.fillStyle="#c0392b",s.beginPath(),s.arc(a,o,128*.44,0,7),s.fill(),s.strokeStyle="#fff",s.lineWidth=14,s.lineCap="round",s.beginPath(),s.moveTo(a-28,o-28),s.lineTo(a+28,o+28),s.moveTo(a+28,o-28),s.lineTo(a-28,o+28),s.stroke();else if(n==="itembox"){const l=s.createLinearGradient(0,0,128,128);l.addColorStop(0,"#a86bff"),l.addColorStop(1,"#6a3ce0"),s.fillStyle=l,s.fillRect(0,0,128,128),s.strokeStyle="#fff",s.lineWidth=8,s.strokeRect(8,8,112,112),s.fillStyle="#fff",s.font="900 84px sans-serif",s.textAlign="center",s.textBaseline="middle",s.fillText("?",a,o+6)}else if(n==="cp")s.clearRect(0,0,128,128),s.fillStyle="#1f9ad0",s.strokeStyle="#eafcff",s.lineWidth=8,s.beginPath(),s.arc(a,o,128*.42,0,7),s.fill(),s.stroke(),s.fillStyle="#dff6ff",s.font="800 22px sans-serif",s.textAlign="center",s.textBaseline="middle",s.fillText("CHECK",a,o-24),s.fillStyle="#fff",s.font="900 62px sans-serif",s.fillText(String(e),a,o+18);else{const l=e>=3?"#e0a020":e===2?"#2e9fa4":"#2ea44f";s.fillStyle=l,s.beginPath(),s.arc(a,o,128*.44,0,7),s.fill(),s.fillStyle="#fff",s.font="bold 58px sans-serif",s.textAlign="center",s.textBaseline="middle",s.fillText("+"+e,a,o+4)}const r=new yo(i);return r.colorSpace=mn,r.anisotropy=4,r}function rb(n,e){const t=new $t,i=(o,r=.9)=>new Ve({color:o,roughness:r}),s=(o,r,l,c)=>new Z(new dt(o,r,l,12),i(c)),a=(o,r,l,c)=>new Z(new Ut(o,r,l),i(c));switch(n){case"twig":{const o=s(.09,.12,2.2,"#5a3f22");o.rotation.z=1.57,o.position.y=.12,t.add(o);break}case"leaf":{const o=new Z(new ct(.5,8,6),i(e||"#7a9b3a"));o.scale.set(1,.14,.7),o.position.y=.07,t.add(o);break}case"pebble":{const o=new Z(new la(.42),i("#b8ae98"));o.scale.y=.6,o.position.y=.2,t.add(o);break}case"grass":{for(let o=0;o<5;o++){const r=s(.02,.05,1.1,"#5f8a36");r.position.set((Math.random()-.5)*.5,.55,(Math.random()-.5)*.5),r.rotation.z=(Math.random()-.5)*.5,t.add(r)}break}case"shell":{const o=new Z(new ct(.42,10,8,0,6.3,0,1.6),i(e||"#f0dcc6"));o.position.y=.1,t.add(o);break}case"starfish":{const o=new Z(new dt(.55,.55,.12,5),i(e||"#e08a4a"));o.position.y=.1,t.add(o);break}case"castle":{const o=a(2.4,1.4,2.4,"#d8b878");o.position.y=.7,t.add(o);for(const[r,l]of[[-1,-1],[1,-1],[-1,1],[1,1]]){const c=s(.35,.4,1.9,"#d8b878");c.position.set(r,.95,l),t.add(c)}break}case"chalk":{const o=new Z(new An(2.4,.7),new Ve({color:e||"#e8607a",roughness:1,transparent:!0,opacity:.85}));o.rotation.x=-1.57,o.position.y=.03,t.add(o);break}case"toy":{const o=a(1.1,.7,1.1,e||"#e0c040");o.position.y=.35,t.add(o);const r=s(.28,.28,.5,ob(e||"#e0c040",20));r.position.y=.9,t.add(r);break}case"box":{const o=a(2.4,1.6,2,"#c39a63");o.position.y=.8,o.castShadow=!0,t.add(o);const r=a(2.5,.14,2.1,"#a97f48");r.position.y=1.6,t.add(r);break}case"tape":{const o=a(2.2,.06,.6,"#d9d2c2");o.position.y=.05,t.add(o);break}case"pencil":{const o=s(.13,.13,3.2,e||"#e0b030");o.rotation.z=1.57,o.position.y=.16,t.add(o);const r=s(0,.13,.4,"#333");r.rotation.z=1.57,r.position.set(1.7,.16,0),t.add(r);break}case"cup":{const o=s(.85,.65,1.8,"#e8e4dc");o.position.y=.9,o.castShadow=!0,t.add(o);const r=s(.7,.55,1.6,"#b8b0a2");r.position.y=1.05,t.add(r);break}case"coin":{const o=s(.55,.55,.12,e||"#e0c050");o.position.y=.06,t.add(o);break}case"eraser":{const o=a(1,.5,.6,e||"#e06a8a");o.position.y=.25,t.add(o);break}case"straw":{const o=s(.1,.1,3,e||"#e05a5a");o.rotation.z=1.4,o.position.y=.14,t.add(o);break}case"ball8":{const o=new Z(new ct(.62,14,12),i("#141414",.35));o.position.y=.62,o.castShadow=!0,t.add(o);const r=s(.24,.24,.05,"#f2f2f2");r.position.set(.28,1.05,.28),r.lookAt(2,3,2),t.add(r);break}case"icecube":{const o=new Z(new Ut(1.1,1.1,1.1),new Ve({color:"#cfeaf6",roughness:.15,transparent:!0,opacity:.7}));o.position.y=.55,o.rotation.y=Math.random()*1.5,o.castShadow=!0,t.add(o);break}case"bolt":{const o=s(.42,.42,.3,"#8a949c");o.geometry.dispose(),o.geometry=new dt(.42,.42,.3,6),o.position.y=.15,t.add(o);const r=s(.16,.16,1.4,"#a8b2ba");r.rotation.z=1.57,r.position.set(.8,.16,0),t.add(r);break}case"remote":{const o=a(.9,.22,2.2,"#2a2a30");o.position.y=.11,o.castShadow=!0,t.add(o);for(let r=0;r<6;r++){const l=s(.09,.09,.08,r===0?"#e05a5a":"#b8c0c8");l.position.set((r%2-.5)*.36,.24,-.7+Math.floor(r/2)*.42),t.add(l)}break}case"saltshaker":{const o=new oc({color:"#eef2f4",roughness:.08,transmission:.55,thickness:.6}),r=new Z(new dt(.95,1.15,3,18),o);r.position.y=1.5,r.castShadow=!0,t.add(r);const l=s(.82,1,2,"#ffffff");l.position.y=1.1,t.add(l);const c=new Z(new dt(.8,.95,.75,18),i("#c8ced4",.35));c.position.y=3.35,c.castShadow=!0,t.add(c);for(let h=0;h<7;h++){const d=h/7*6.283,u=s(.09,.09,.06,"#4a5056");u.position.set(Math.cos(d)*.4,3.74,Math.sin(d)*.4),t.add(u)}break}case"plate":{const o=[new Se(0,.12),new Se(2.6,.12),new Se(3.4,.3),new Se(4.1,.75),new Se(4.25,.8)],r=new Z(new xo(o,36),i("#f2ede2",.35));r.castShadow=!0,r.receiveShadow=!0,t.add(r);const l=new Z(new Wt(3.6,.07,8,40),i("#4a7ab0",.5));l.rotation.x=1.57,l.position.y=.62,t.add(l);for(let c=0;c<8;c++){const h=new Z(new la(.14),i("#c9a35f"));h.position.set((Math.random()-.5)*3.4,.22,(Math.random()-.5)*3.4),t.add(h)}break}case"mugcoffee":{const o=new Z(new dt(1.7,1.5,3.9,22,1,!0),new Ve({color:e||"#d05a4a",roughness:.4,side:Sn}));o.position.y=1.95,o.castShadow=!0,t.add(o);const r=s(1.5,1.5,.16,e||"#d05a4a");r.position.y=.08,t.add(r);const l=s(1.55,1.55,.08,"#3a2414");l.position.y=3.55,t.add(l);const c=new Z(new Wt(.95,.26,10,20,Math.PI*1.5),i(e||"#d05a4a",.4));c.position.set(1.95,2.1,0),c.rotation.z=-.5,c.castShadow=!0,t.add(c);break}case"napkinfold":{const o=a(3.4,.1,3.4,"#f6f2ea");o.position.y=.05,t.add(o);const r=a(2.4,.1,2.4,"#efe9dd");r.position.y=.15,r.rotation.y=.4,t.add(r);break}case"apple":{const o=new Z(new ct(1.7,18,14),i(e||"#c8382e",.35));o.position.y=1.55,o.scale.y=.92,o.castShadow=!0,t.add(o);const r=s(.09,.12,.9,"#5a3a1a");r.position.y=3.3,r.rotation.z=.25,t.add(r);const l=new Z(new ct(.5,8,6),i("#4f7d30"));l.scale.set(1,.25,.5),l.position.set(.45,3.35,0),t.add(l);break}case"cuttingboard":{const o=a(7,.5,4.4,"#b98a52");o.position.y=.25,o.castShadow=!0,t.add(o);const r=s(.55,.55,.5,"#b98a52");r.position.set(4.1,.25,0),t.add(r);const l=s(.28,.28,.54,"#6f5334");l.position.set(4.1,.26,0),t.add(l);break}case"bucketzinc":{const o=new Z(new dt(1.9,1.5,3.2,20,1,!0),new Ve({color:"#aab4bc",roughness:.35,metalness:.55,side:Sn}));o.position.y=1.6,o.castShadow=!0,t.add(o);const r=s(1.5,1.5,.14,"#98a2aa");r.position.y=.07,t.add(r);const l=new Z(new Wt(1.9,.09,8,24),i("#8e989e",.3));l.rotation.x=1.57,l.position.y=3.2,t.add(l);const c=new Z(new Wt(1.75,.08,8,24,Math.PI),i("#78828a",.3));c.position.y=3.2,c.rotation.x=.5,t.add(c);break}case"bone":{for(const r of[-1.5,1.5])for(const l of[-.4,.4]){const c=new Z(new ct(.55,10,8),i("#e8e0d0",.6));c.position.set(r,.5,l),c.castShadow=!0,t.add(c)}const o=s(.4,.4,3,"#e8e0d0");o.rotation.z=1.57,o.position.y=.5,o.castShadow=!0,t.add(o);break}case"fencebit":{for(const o of[-2.4,0,2.4]){const r=a(.5,3.4,.5,"#7a5a34");r.position.set(o,1.7,0),r.castShadow=!0,t.add(r);const l=new Z(new ji(.38,.6,4),i("#6b4e2e"));l.position.set(o,3.7,0),l.rotation.y=.78,t.add(l)}for(const o of[1.1,2.3]){const r=a(6.4,.4,.24,"#8a6a3e");r.position.y=o,r.castShadow=!0,t.add(r)}break}case"beachumbrella":{const o=s(.14,.14,8.5,"#e8e4dc");o.position.y=4,o.rotation.z=.22,o.castShadow=!0,t.add(o);const r=new $t;for(let c=0;c<10;c++){const h=new Z(new ji(4.6,1.9,10,1,!0,c/10*6.283,.629),i(c%2?"#e5484d":"#f6f0e2",.7));h.material.side=Sn,h.castShadow=!0,r.add(h)}const l=new Z(new ji(.16,.7,8),i("#c9a35f"));l.position.y=1.25,r.add(l),r.position.set(1.85,7.6,0),r.rotation.z=.22,t.add(r);break}case"beachball":{const o=new Z(new ct(1.75,20,16),i("#f6f0e2",.45));o.position.y=1.75,o.castShadow=!0,t.add(o);const r=["#e5484d","#3b82f6","#f2b100"];for(let l=0;l<3;l++){const c=new Z(new ct(1.76,20,16,l*2.09,.9),i(r[l],.45));c.position.y=1.75,t.add(c)}break}case"flipflop":{const o=new Z(new Gn(1.05,2.3,6,12),i(e||"#3fae6a",.7));o.scale.y=.16,o.rotation.x=1.57,o.position.y=.22,o.castShadow=!0,t.add(o);for(const r of[-1,1]){const l=new Z(new Wt(.75,.13,8,14,2.4),i("#f6f0e2",.6));l.position.set(r*.35,.3,-.65),l.rotation.set(0,r*-.5,r*-1.2),t.add(l)}break}case"sunscreen":{const o=new Z(new Gn(.85,1.8,6,14),i("#f2b100",.4));o.scale.z=.55,o.position.y=1.75,o.castShadow=!0,t.add(o);const r=s(.5,.55,.7,"#f6f0e2");r.position.y=3.15,t.add(r);const l=a(1.35,1.1,1,"#f6f0e2");l.position.y=1.7,t.add(l);break}case"toycar":{const o=a(1.9,.85,3.6,e||"#3b82f6");o.position.y=.95,o.castShadow=!0,t.add(o);const r=a(1.7,.8,1.8,"#cfe4ee");r.position.set(0,1.7,-.2),r.castShadow=!0,t.add(r);for(const l of[-1.2,1.2])for(const c of[-1,1]){const h=s(.55,.55,.35,"#22262a");h.rotation.z=1.57,h.position.set(c,.55,l),t.add(h);const d=s(.22,.22,.38,"#c8ced4");d.rotation.z=1.57,d.position.set(c,.55,l),t.add(d)}break}case"chalkset":{["#ff8fb0","#8fd0ff","#ffe38f","#a0ffb0"].forEach((r,l)=>{const c=s(.28,.28,2.2,r);c.rotation.z=1.57,c.rotation.y=(Math.random()-.5)*1.2,c.position.set((l-1.5)*.75,.28,(Math.random()-.5)*1.2),c.castShadow=!0,t.add(c)});break}case"paintcan":{const o=new Z(new dt(1.55,1.55,3.4,20),new Ve({color:"#c8ced4",roughness:.3,metalness:.5}));o.position.y=1.7,o.castShadow=!0,t.add(o);const r=s(1.58,1.58,1.7,e||"#3b82f6");r.position.y=1.7,t.add(r);const l=s(1.4,1.4,.1,e||"#3b82f6");l.position.y=3.46,t.add(l);const c=new Z(new ct(.4,10,8),i(e||"#3b82f6",.3));c.scale.set(1,.25,1.6),c.position.set(1.5,3.35,.4),t.add(c);break}case"wrench":{const o=a(3.2,.3,.75,"#b8c2ca");o.position.y=.16,o.castShadow=!0,t.add(o);for(const r of[-1,1]){const l=new Z(new Wt(.75,.3,8,18,4.4),new Ve({color:"#b8c2ca",roughness:.3,metalness:.6}));l.rotation.x=1.57,l.rotation.z=r>0?.8:.8+3.14,l.position.set(r*2,.16,0),l.castShadow=!0,t.add(l)}break}case"tirestack":{for(let o=0;o<2;o++){const r=new Z(new Wt(1.9,.8,12,24),i("#26282c",.85));r.rotation.x=1.57,r.position.y=.8+o*1.5,r.castShadow=!0,t.add(r)}break}case"oldtire":{const o=new Z(new Wt(1.9,.8,12,24),i("#26282c",.85));o.rotation.x=1.57,o.position.y=.8,o.castShadow=!0,t.add(o);break}case"toyshovel":{const o=s(.16,.16,3.6,e||"#e5484d");o.rotation.z=1.35,o.position.y=.5,t.add(o);const r=a(1.5,.16,1.9,e||"#e5484d");r.position.set(2.1,.2,0),r.rotation.z=-.12,r.castShadow=!0,t.add(r);const l=new Z(new Wt(.4,.14,8,14),i(e||"#e5484d",.5));l.position.set(-1.95,1.15,0),l.rotation.y=1.57,t.add(l);break}case"wateringcan":{const o=new Z(new dt(1.7,1.9,3.2,20),i(e||"#3fae6a",.45));o.position.y=1.6,o.castShadow=!0,t.add(o);const r=s(.22,.34,3.4,e||"#3fae6a");r.rotation.z=.9,r.position.set(2.35,2.35,0),r.castShadow=!0,t.add(r);const l=s(.62,.62,.3,"#2e8a50");l.rotation.z=.9,l.position.set(3.65,3.35,0),t.add(l);const c=new Z(new Wt(1.2,.16,8,20,Math.PI),i(e||"#3fae6a",.45));c.position.set(-1.2,3,0),c.rotation.z=.5,t.add(c);break}case"flowerpot":{const o=new Z(new dt(1.5,1.05,2.4,18),i("#b06a40",.7));o.position.y=1.2,o.castShadow=!0,t.add(o);const r=s(1.65,1.65,.5,"#a05a34");r.position.y=2.45,t.add(r);const l=s(1.35,1.35,.12,"#4a3418");l.position.y=2.72,t.add(l);const c=s(.09,.11,2.6,"#4f7d30");c.position.y=4,t.add(c);for(let u=0;u<6;u++){const f=u/6*6.283,g=new Z(new ct(.5,8,6),i(e||"#f2b100",.5));g.scale.set(1,.35,.6),g.position.set(Math.cos(f)*.62,5.35,Math.sin(f)*.62),g.rotation.y=-f,t.add(g)}const h=new Z(new ct(.38,10,8),i("#a4581e"));h.position.y=5.4,t.add(h);const d=new Z(new ct(.55,8,6),i("#4f7d30"));d.scale.set(1,.22,.5),d.position.set(.5,3.6,.2),t.add(d);break}case"mushroom":{const o=s(.42,.55,1.1,"#efe9dd");o.position.y=.55,t.add(o);const r=new Z(new ct(1,14,10,0,6.3,0,1.35),i(e||"#d05a4a",.55));r.position.y=.95,r.castShadow=!0,t.add(r);for(let l=0;l<5;l++){const c=l*1.9,h=s(.14,.14,.06,"#f6f0e2");h.position.set(Math.cos(c)*.55,1.45+Math.sin(l)*.1,Math.sin(c)*.55),h.rotation.set(Math.cos(c)*.5,0,Math.sin(c)*-.5),t.add(h)}break}case"cactus":{const o=new Z(new Gn(.95,3.4,6,14),i("#3e7d3e",.7));o.position.y=2.6,o.castShadow=!0,t.add(o);for(const l of[-1,1]){const c=new Z(new Gn(.55,1.4,6,12),i("#469046",.7));c.position.set(l*1.35,2.6+(l>0?.7:.1),0),c.rotation.z=l*-.5,c.castShadow=!0,t.add(c)}const r=new Z(new ct(.4,10,8),i("#ff8fb0",.5));r.position.y=4.75,t.add(r);for(let l=0;l<22;l++){const c=Math.random()*6.283,h=1+Math.random()*3.2,d=s(.02,.05,.4,"#e8e0c0");d.position.set(Math.cos(c)*.98,h,Math.sin(c)*.98),d.rotation.set(Math.sin(c)*1.57,0,Math.cos(c)*-1.57),t.add(d)}break}case"drybush":{for(let o=0;o<9;o++){const r=s(.05,.09,1.8+Math.random(),"#9a7a4a");r.position.y=.8,r.rotation.set((Math.random()-.5)*1.6,Math.random()*6.283,(Math.random()-.5)*1.6),r.castShadow=!0,t.add(r)}break}case"brickpile":{const r=a(2.6,1.1,1.25,"#c05a3a");r.position.y=.55,r.castShadow=!0,t.add(r);const l=a(2.6,1.1,1.25,"#b0522e");l.position.set(.4,1.65,.15),l.rotation.y=.22,l.castShadow=!0,t.add(l);const c=a(2.6,1.1,1.25,"#c86040");c.position.set(-1.4,.55,1.6),c.rotation.y=-.5,c.castShadow=!0,t.add(c);break}case"helmet":{const o=new Z(new ct(1.7,18,12,0,6.3,0,1.62),i("#f2b100",.4));o.position.y=.25,o.castShadow=!0,t.add(o);const r=s(2.1,2.2,.18,"#e0a400");r.position.y=.3,t.add(r);const l=a(.5,.3,2.9,"#e0a400");l.position.y=1.85,t.add(l);break}case"watertank":{const o=new Z(new dt(3.3,2.9,4.2,24),i("#2e6fb0",.5));o.position.y=2.1,o.castShadow=!0,t.add(o);const r=new Z(new ct(3.35,24,10,0,6.3,0,.9),i("#3b82c8",.5));r.position.y=3.15,r.scale.y=.75,r.castShadow=!0,t.add(r);const l=s(3.36,3.36,.5,"#245a94");l.position.y=2,t.add(l);break}case"clothesline":{for(const l of[-4.4,4.4]){const c=s(.14,.16,5.2,"#8a8f94");c.position.set(l,2.6,0),c.castShadow=!0,t.add(c)}const o=s(.035,.035,8.8,"#e8e4dc");o.rotation.z=1.57,o.position.y=4.9,t.add(o);const r=["#e5484d","#3b82f6","#3fae6a","#f2b100"];for(let l=0;l<4;l++){const c=a(1.25,1.7,.09,r[l]);c.position.set(-3.1+l*2.05,4.05,0),c.rotation.x=.12,c.castShadow=!0,t.add(c)}break}case"floatring":{const o=new Z(new Wt(2.1,.85,14,28),i("#ff7ea8",.45));o.rotation.x=1.57,o.position.y=.85,o.castShadow=!0,t.add(o);for(let r=0;r<4;r++){const l=new Z(new Wt(2.11,.86,14,28,.7),i("#f6f0e2",.45));l.rotation.x=1.57,l.rotation.z=r*1.57+.4,l.position.y=.85,t.add(l)}break}case"fruitcrate":{const o="#b98a52";for(const[r,l,c,h,d,u]of[[4.4,.3,3,0,.15,0],[4.4,1.4,.25,0,.85,1.4],[4.4,1.4,.25,0,.85,-1.4],[.25,1.4,3,2.1,.85,0],[.25,1.4,3,-2.1,.85,0]]){const f=a(r,l,c,o);f.position.set(h,d,u),f.castShadow=!0,t.add(f)}for(let r=0;r<7;r++){const l=new Z(new ct(.62,12,10),i("#f28a1e",.5));l.position.set((Math.random()-.5)*2.8,.85+(r>4?.8:0),(Math.random()-.5)*1.7),l.castShadow=!0,t.add(l)}break}case"roadsign":{const o=s(.13,.15,5.6,"#8a8f94");o.position.y=2.8,o.castShadow=!0,t.add(o);const r=a(2.6,2.6,.16,"#f2b100");r.position.y=5.1,r.rotation.z=.785,r.castShadow=!0,t.add(r);const l=a(.8,.8,.06,"#22262a");l.position.set(0,5.1,.1),l.rotation.z=.785,t.add(l);break}case"cuestick":{const o=s(.13,.3,11,"#b98a52");o.rotation.z=1.545,o.position.y=.32,o.castShadow=!0,t.add(o);const r=s(.13,.13,.25,"#3b82f6");r.rotation.z=1.545,r.position.set(-5.55,.4,0),t.add(r);const l=s(.31,.31,.3,"#26282c");l.rotation.z=1.545,l.position.set(5.6,.24,0),t.add(l);break}case"poolballs":{[["#f2b100",1],["#e5484d",3],["#3b82f6",2]].forEach(([r],l)=>{const c=l*2.09,h=new Z(new ct(.62,14,12),i(r,.25));h.position.set(Math.cos(c)*.75,.62,Math.sin(c)*.75),h.castShadow=!0,t.add(h);const d=s(.24,.24,.05,"#f6f0e2");d.position.set(Math.cos(c)*.75,1.22,Math.sin(c)*.75),t.add(d)});break}case"bluechalk":{const o=a(1.05,.8,1.05,"#3b82f6");o.position.y=.4,o.castShadow=!0,t.add(o);const r=s(.4,.4,.12,"#2a62b8");r.position.y=.82,t.add(r);break}case"sodacup":{const o=new oc({color:"#e8f0f4",roughness:.1,transmission:.5,thickness:.5}),r=new Z(new dt(1.25,.95,3.6,18),o);r.position.y=1.8,r.castShadow=!0,t.add(r);const l=s(1.05,.9,2.7,"#7a3c14");l.position.y=1.5,t.add(l);const c=s(1.35,1.3,.35,"#e5484d");c.position.y=3.75,t.add(c);const h=s(.12,.12,3.2,"#f6f0e2");h.rotation.z=.3,h.position.set(-.45,5,0),t.add(h);break}case"popsicle":{const o=s(.18,.18,1.6,"#d8b888");o.rotation.x=1.57,o.position.set(0,.2,2.2),t.add(o);const r=new Z(new Gn(1,2.6,6,14),i(e||"#ff7ea8",.35));r.scale.z=.45,r.rotation.x=1.57,r.position.y=.5,r.castShadow=!0,t.add(r);const l=new Z(new ct(.65,10,8),i("#a8c8d4",.4));l.position.set(.7,.75,-1.7),t.add(l);break}case"icecreamtub":{const o=new Z(new dt(2,1.7,2.3,20),i("#efe6d4",.5));o.position.y=1.15,o.castShadow=!0,t.add(o);const r=s(2.02,2.02,.8,e||"#c86a94");r.position.y=1.3,t.add(r);const l=s(2.1,2.1,.3,"#e0d6c4");l.position.y=2.45,t.add(l);const c=new Z(new ct(.9,12,10),i(e||"#c86a94",.5));c.position.set(.4,2.85,-.2),c.castShadow=!0,t.add(c);break}case"icetray":{const o=a(3.4,.55,2.3,"#8fc2e8");o.position.y=.28,o.castShadow=!0,t.add(o);for(let r=0;r<4;r++)for(let l=0;l<3;l++){const c=new Z(new Ut(.62,.3,.55),new Ve({color:"#dff2fc",roughness:.15,transparent:!0,opacity:.85}));c.position.set(-1.2+r*.8,.6,-.72+l*.72),t.add(c)}break}case"hammer":{const o=s(.22,.26,4.4,"#b98a52");o.rotation.z=1.57,o.position.y=.26,o.castShadow=!0,t.add(o);const r=a(1.1,.85,.85,"#78828a");r.position.set(2.1,.45,0),r.castShadow=!0,t.add(r);const l=a(.85,.5,.5,"#8a949c");l.position.set(2.1,.45,.65),l.rotation.x=.4,t.add(l);break}case"screwdriver":{const o=new Z(new Gn(.42,1.4,6,12),i(e||"#e5484d",.35));o.rotation.z=1.57,o.position.set(-1.2,.42,0),o.castShadow=!0,t.add(o);const r=s(.11,.11,2.6,"#c8ced4");r.rotation.z=1.57,r.position.set(1,.42,0),t.add(r);break}case"pillow":{const o=new Z(new Ut(4.4,1.4,4.4,4,2,4),i(e||"#3b82f6",.75)),r=o.geometry.attributes.position;for(let c=0;c<r.count;c++){const h=r.getX(c),d=r.getY(c),u=r.getZ(c),f=1-Math.abs(h)/2.2*(Math.abs(u)/2.2)*.55;r.setY(c,d*f)}o.geometry.computeVertexNormals(),o.position.y=.7,o.rotation.y=.3,o.castShadow=!0,t.add(o);const l=s(.2,.2,.14,"#2a62b8");l.position.y=1.42,t.add(l);break}case"bookpile":{["#c05a5a","#3fae6a","#3b82f6"].forEach((r,l)=>{const c=a(3.2-l*.3,.55,4.3-l*.4,r);c.position.y=.28+l*.56,c.rotation.y=(l-1)*.25,c.castShadow=!0,t.add(c);const h=a(2.9-l*.3,.4,4-l*.4,"#f2ede2");h.position.y=.28+l*.56,h.rotation.y=(l-1)*.25,t.add(h)});break}case"sock":{const o=new Z(new Gn(.55,1.8,6,12),i(e||"#e5484d",.85));o.rotation.z=1.2,o.position.set(-.6,.55,0),o.castShadow=!0,t.add(o);const r=new Z(new Gn(.55,1.2,6,12),i(e||"#e5484d",.85));r.rotation.set(0,0,.15),r.rotation.y=.9,r.position.set(1,.55,.4),r.castShadow=!0,t.add(r);const l=s(.57,.57,.35,"#f6f0e2");l.rotation.z=1.2,l.position.set(-1.35,.85,0),t.add(l);break}}return t.traverse(o=>{o.isMesh&&(o.castShadow=!0,o.receiveShadow=!0)}),t}function Gc(n){const e=new $t,t=[],i=[],s=[],a=[],o=new Z(new Ut(n.w+5,1.4,n.h+5),new Ve({color:n.bg,roughness:.95}));o.position.set(n.w/2,-.72,n.h/2),o.receiveShadow=!0,e.add(o);const r=ab(n);r.flipY=!1;const l=new Z(new An(n.w,n.h),new Ve({map:r,roughness:.98}));l.rotation.x=-Math.PI/2,l.position.set(n.w/2,0,n.h/2),l.receiveShadow=!0,e.add(l);const c=n.wallCol||"#6b4e2e",h=new Ve({color:c,roughness:.85});for(const u of n.walls){const f=u.b.x-u.a.x,g=u.b.y-u.a.y,b=Math.hypot(f,g);if(b<.05)continue;const p=new Z(new Ut(b+.5,.9,.6),h);p.position.set((u.a.x+u.b.x)/2,.42,(u.a.y+u.b.y)/2),p.rotation.y=-Math.atan2(g,f),p.castShadow=!0,p.receiveShadow=!0,e.add(p)}const d=new Ve({color:"#8a5a2e",roughness:.82});for(const u of n.obstacles)if(u.type==="stone"){const f=new Z(new la(u.r,0),new Ve({color:"#9a948a",roughness:.9,flatShading:!0}));f.position.set(u.x,u.r*.55,u.y),f.scale.y=.8,f.rotation.set(Math.random(),Math.random(),Math.random()),f.castShadow=!0,f.receiveShadow=!0,e.add(f)}else if(u.type==="hole"){const f=new Z(new Mn(u.r,28),new Vt({color:1182726}));f.rotation.x=-Math.PI/2,f.position.set(u.x,.015,u.y),e.add(f);const g=new Z(new Wt(u.r,.15,8,28),new Ve({color:"#3a2c1a",roughness:1}));g.rotation.x=-Math.PI/2,g.position.set(u.x,.03,u.y),g.castShadow=!0,e.add(g)}else if(u.type==="jump"){const f=new $t,g=new Z(new Ut(3,.34,3.4),d);g.rotation.x=-.52,g.position.set(0,.55,.2),g.castShadow=!0,g.receiveShadow=!0,f.add(g);const b=new Z(new Ut(3,.5,.32),new Ve({color:"#c9902e",roughness:.7}));b.position.set(0,1,1.5),f.add(b);const p=new Z(new An(2.4,3),new Vt({map:Gs("jumparrow"),transparent:!0,depthWrite:!1}));p.rotation.x=-Math.PI/2-.52,p.rotation.z=Math.PI,p.position.set(0,.8,.4),f.add(p),f.position.set(u.x,0,u.y),f.rotation.y=Math.PI/2-(u.dir??0),e.add(f)}else if(u.type==="top"){const f=new $t,g=new Z(new ji(u.r,1.15,16),new Ve({color:"#d84a8a",roughness:.35}));g.rotation.x=Math.PI,g.position.y=.62,g.castShadow=!0,f.add(g);const b=new Z(new dt(u.r*.82,u.r*.62,.3,16),new Ve({color:"#ffd24a",roughness:.35}));b.position.y=.92,f.add(b);const p=new Z(new ct(u.r*.55,12,8,0,6.3,0,1.6),new Ve({color:"#4a90d8",roughness:.3}));p.position.y=1.2,f.add(p);const m=new Z(new dt(.09,.09,.5,8),new Ve({color:"#e8e4dc"}));m.position.y=1.6,f.add(m),f.position.set(u.x,0,u.y),e.add(f),s.push({update:v=>{f.rotation.y+=v*9,f.rotation.z=Math.sin(f.rotation.y*.7)*.06}});const y=new Z(new Mn(u.r*1.5,24),new Vt({color:"#ff7ab0",transparent:!0,opacity:.28,blending:si,depthWrite:!1}));y.rotation.x=-Math.PI/2,y.position.set(u.x,.025,u.y),e.add(y),t.push({mesh:y,kind:"top",base:u.r*1.5})}else if(u.type==="car"){const f=new $t,g=new Z(new Ut(1.7,.5,.95),new Ve({color:"#f2b13a",roughness:.3,metalness:.15}));g.position.y=.5,g.castShadow=!0,f.add(g);const b=new Z(new Ut(.85,.42,.8),new Ve({color:"#3f9ae0",roughness:.2,metalness:.2}));b.position.set(-.15,.92,0),f.add(b);const p=new Z(new Ut(.3,.32,.7),new Ve({color:"#e5484d",roughness:.35}));p.position.set(.9,.42,0),f.add(p);const m=[];for(const[v,x]of[[-.55,-.52],[-.55,.52],[.55,-.52],[.55,.52]]){const T=new Z(new dt(.28,.28,.18,12),new Ve({color:"#242424",roughness:.8}));T.rotation.x=Math.PI/2,T.position.set(v,.28,x),f.add(T),m.push(T)}e.add(f),f.position.set(u.x,0,u.y),f.rotation.y=-(u.dir||0),s.push({update:v=>{const x=u.x-f.position.x,T=u.y-f.position.z;if(Math.hypot(x,T)>.03){f.position.x+=x*Math.min(1,v*6),f.position.z+=T*Math.min(1,v*6);for(const S of m)S.rotation.y+=v*30;f.rotation.z=Math.sin(performance.now()*.03)*.04}else f.rotation.z*=.9,f.rotation.y=-(u.dir||0)}});const y=new Z(new Mn(u.r*1.5,24),new Vt({color:"#ffd24a",transparent:!0,opacity:.26,blending:si,depthWrite:!1}));y.rotation.x=-Math.PI/2,y.position.set(u.x,.025,u.y),e.add(y),t.push({mesh:y,kind:"car",base:u.r*1.5})}else if(u.type==="band"){const[f]=Rd(u);for(const M of[f.a,f.b]){const S=new Z(new dt(.16,.2,1.5,10),d);S.position.set(M.x,.75,M.y),S.castShadow=!0,e.add(S);const C=new Z(new ct(.2,8,6),new Ve({color:"#e5484d",roughness:.5}));C.position.set(M.x,1.55,M.y),e.add(C)}const g=new Ve({color:"#e5484d",roughness:.45}),b=new Z(new dt(.12,.12,1,8),g),p=new Z(new dt(.12,.12,1,8),g);b.castShadow=p.castShadow=!0,e.add(b,p);const m={x:(f.a.x+f.b.x)/2,y:(f.a.y+f.b.y)/2},y={ox:0,oy:0,vx:0,vy:0},v=new U(0,1,0),x=new U,T=(M,S,C,N,_)=>{const w=Math.max(.05,Math.hypot(N-S,_-C));M.scale.set(1,w,1),M.position.set((S+N)/2,.62,(C+_)/2),M.quaternion.setFromUnitVectors(v,x.set(N-S,0,_-C).normalize())};s.push({update:M=>{const S=u;S.pokeP&&(y.vx+=S.pokeX*S.pokeP*14,y.vy+=S.pokeY*S.pokeP*14,S.pokeP=0),y.vx+=(-60*y.ox-6*y.vx)*M,y.vy+=(-60*y.oy-6*y.vy)*M,y.ox+=y.vx*M,y.oy+=y.vy*M;const C=m.x+y.ox,N=m.y+y.oy;T(b,f.a.x,f.a.y,C,N),T(p,C,N,f.b.x,f.b.y);const _=.12/(1+Math.hypot(y.ox,y.oy)*.8);b.scale.x=b.scale.z=p.scale.x=p.scale.z=_/.12}}),T(b,f.a.x,f.a.y,m.x,m.y),T(p,m.x,m.y,f.b.x,f.b.y)}else if(u.type==="mill"){const f=new $t,g=new Z(new dt(.22,.28,1.4,10),d);g.position.y=.7,g.castShadow=!0,f.add(g);const b=new Z(new ct(.3,10,8),new Ve({color:"#ffd24a",roughness:.4}));b.position.y=1,f.add(b);const p=new $t;p.position.y=.62;const m=u.n===4?2:1,y=["#4a90d8","#3fae6a"];for(let x=0;x<m;x++){const T=new Z(new Ut(u.r*2,.85,.18),new Ve({color:y[x%2],roughness:.55}));T.rotation.y=x*Math.PI/2,T.castShadow=!0,p.add(T);for(const M of[-1,1]){const S=new Z(new Ut(.4,.9,.22),new Ve({color:"#e5484d",roughness:.5}));S.position.set(M*(u.r-.2),0,0),S.rotation.y=x*Math.PI/2,x===1&&S.position.set(0,0,M*(u.r-.2)),p.add(S)}}f.add(p),f.position.set(u.x,0,u.y),e.add(f);const v={last:-(u.dir||0),from:0,amt:0,t:1};p.rotation.y=v.last,s.push({update:x=>{const T=-(u.dir||0);if(Math.abs(T-v.last)>.001){let M=T-v.last;for(;M>Math.PI;)M-=Math.PI*2;for(;M<-Math.PI;)M+=Math.PI*2;const S=M>=0?1:-1;v.from=p.rotation.y,v.amt=M+S*Math.PI*2,v.t=0,v.last=T}if(v.t<1){v.t=Math.min(1,v.t+x/1.4);const M=1-Math.pow(1-v.t,3);p.rotation.y=v.from+v.amt*M}}})}else if(u.type==="balloon"){const f=new $t,g=new Z(new ct(u.r,18,14),new oc({color:"#3f9ae0",roughness:.15,clearcoat:.8,transparent:!0,opacity:.92}));g.scale.y=1.12,g.position.y=u.r*1.05,g.castShadow=!0,f.add(g);const b=new Z(new ct(u.r*.26,8,6),new Vt({color:"#dff2ff"}));b.position.set(-u.r*.4,u.r*1.5,u.r*.3),f.add(b);const p=new Z(new ji(.16,.3,8),new Ve({color:"#2a72b0"}));p.position.y=.12,p.rotation.x=Math.PI,f.add(p),f.position.set(u.x,0,u.y),e.add(f),s.push({update:m=>{if(f.visible=!u.popped,!u.popped){const y=1+Math.sin(performance.now()*.005)*.035;g.scale.set(y,1.12/y,y)}}})}else if(u.type==="bomb"){const f=new $t,g=new Z(new ct(u.r*.95,18,14),new Ve({color:"#191919",roughness:.35,metalness:.4}));g.position.y=u.r*.95,g.castShadow=!0,f.add(g);const b=new Z(new dt(.18,.24,.28,10),new Ve({color:"#4a4a4a",metalness:.6,roughness:.4}));b.position.y=u.r*1.75,f.add(b);const p=new Z(new dt(.06,.06,.5,6),new Ve({color:"#6a4a2a"}));p.position.set(.1,u.r*2.05,0),p.rotation.z=.4,f.add(p);const m=new Z(new ct(.16,8,6),new Vt({color:"#ffd24a"}));m.position.set(.24,u.r*2.28,0),f.add(m),i.push(m),f.position.set(u.x,0,u.y),e.add(f);const y=new Z(new Mn(u.r*1.6,24),new Vt({color:"#e5484d",transparent:!0,opacity:.3,blending:si,depthWrite:!1}));y.rotation.x=-Math.PI/2,y.position.set(u.x,.025,u.y),e.add(y),t.push({mesh:y,kind:"bomb",base:u.r*1.6})}else if(u.type==="item"){const f=new $t,g=new Z(new Ut(1.25,1.25,1.25),new Ve({map:Gs("itembox"),roughness:.3,metalness:.2,emissive:"#8a5cff",emissiveIntensity:.25}));g.position.y=1.35,g.castShadow=!0,f.add(g),i.push(g),f.position.set(u.x,0,u.y),e.add(f);const b=new Z(new Mn(u.r*1.7,24),new Vt({color:"#b98cff",transparent:!0,opacity:.3,blending:si,depthWrite:!1}));b.rotation.x=-Math.PI/2,b.position.set(u.x,.025,u.y),e.add(b),t.push({mesh:b,kind:"item",base:u.r*1.7})}else{const f=u.n||1,g=f>=3?"#f2c200":f===2?"#2e9fa4":"#2ea44f",b=new Z(new Uc(u.r*.5,0),new Ve({color:g,roughness:.15,metalness:.55,emissive:g,emissiveIntensity:.35,flatShading:!0}));b.position.set(u.x,u.r*.75,u.y),b.castShadow=!0,e.add(b),i.push(b);const p=new Z(new Mn(u.r*.7,20),new Vt({map:Gs("bonus",f),transparent:!0,depthWrite:!1}));p.rotation.x=-Math.PI/2,p.position.set(u.x,.04,u.y),e.add(p);const m=new Z(new An(1.7,1.7),new Vt({map:Gs("bonus",f),transparent:!0,depthWrite:!1}));m.position.set(u.x,u.r*2.3,u.y),e.add(m),a.push(m);const y=new Z(new Mn(u.r*1.6,24),new Vt({color:g,transparent:!0,opacity:.32,blending:si,depthWrite:!1}));y.rotation.x=-Math.PI/2,y.position.set(u.x,.025,u.y),e.add(y),t.push({mesh:y,kind:"bonus",base:u.r*1.6})}n.checkpoints.forEach((u,f)=>{if(f===0)return;let g=0,b=1e9;for(let w=0;w<n.path.length;w++){const L=n.path[w].x-u.x,I=n.path[w].y-u.y,B=L*L+I*I;B<b&&(b=B,g=w)}const p=n.path[Math.max(0,g-1)],m=n.path[Math.min(n.path.length-1,g+1)];let y=-(m.y-p.y),v=m.x-p.x;const x=Math.hypot(y,v)||1;y/=x,v/=x;const T=(m.x-p.x)/x,M=(m.y-p.y)/x,S=n.half[g],C="#28c0e0";for(const w of[1,-1]){const L=u.x+y*S*w,I=u.y+v*S*w,B=new Z(new dt(.16,.2,2.3,10),new Ve({color:C,emissive:C,emissiveIntensity:.55,roughness:.4}));B.position.set(L,1.15,I),B.castShadow=!0,e.add(B);const j=new Z(new ct(.28,12,10),new Ve({color:"#eaffff",emissive:C,emissiveIntensity:.9}));j.position.set(L,2.42,I),e.add(j),i.push(j)}const N=new Z(new An(S*2,.9),new Vt({color:C,transparent:!0,opacity:.4,blending:si,depthWrite:!1}));N.rotation.x=-Math.PI/2,N.rotation.z=-Math.atan2(M,T),N.position.set(u.x,.03,u.y),e.add(N);const _=new Z(new An(1.8,1.8),new Vt({map:Gs("cp",f),transparent:!0,depthWrite:!1}));_.position.set(u.x,3,u.y),e.add(_),a.push(_)});for(const u of n.decor){const f=rb(u.kind,u.c);f.position.set(u.x,0,u.y),u.s&&f.scale.multiplyScalar(u.s),u.rot&&(f.rotation.y=u.rot),e.add(f)}for(const u of n.finish){const f=new Z(new dt(.08,.08,2.4,8),new Ve({color:"#eee"}));f.position.set(u.x,1.2,u.y),f.castShadow=!0,e.add(f);const g=new Z(new An(1.2,.7),new Ve({color:"#e5484d",side:Sn}));g.position.set(u.x+.6,2,u.y),e.add(g)}return{group:e,pulses:t,spinners:i,billboards:a,dynamics:s}}const Ld="tampinha_rally_v1",oh={wins:0,skin:"refri",music:.5,sfx:.8,muted:!1,daily:{},trial:{},tracks:[],name:"",bonus:[]};let rt=cb();function cb(){try{return{...oh,...JSON.parse(localStorage.getItem(Ld)||"{}")}}catch{return{...oh}}}function Bn(){try{localStorage.setItem(Ld,JSON.stringify(rt))}catch{}}const Ce={get(){return rt},persistNow(){Bn()},addWin(){rt.wins++,Bn()},hasBonus(n){return(rt.bonus||[]).includes(n)},addBonus(n){rt.bonus||(rt.bonus=[]),rt.bonus.includes(n)||(rt.bonus.push(n),Bn())},wins(){return rt.wins},setSkin(n){rt.skin=n,Bn()},skin(){return rt.skin},setName(n){rt.name=(n||"").slice(0,12),Bn()},name(){return rt.name||""},setVols(n,e,t){rt.music=n,rt.sfx=e,rt.muted=t,Bn()},dailyBest(n){return rt.daily[n]},setDailyBest(n,e){(rt.daily[n]==null||e<rt.daily[n])&&(rt.daily[n]=e,Bn())},trialBest(n,e){return rt.trial[n+"-"+e]},setTrialBest(n,e,t){const i=n+"-"+e;return rt.trial[i]==null||t<rt.trial[i]?(rt.trial[i]=t,Bn(),!0):!1},customTracks(){return rt.tracks},saveTrack(n){const e=rt.tracks.findIndex(t=>t.id===n.id);e>=0?rt.tracks[e]=n:rt.tracks.push(n),Bn()},deleteTrack(n){rt.tracks=rt.tracks.filter(e=>e.id!==n),Bn()}},Dn={comum:"#9aa2ac",rara:"#3b82f6",epica:"#a855f7",lendaria:"#f5b400",mitica:"#ff4fa3"},ei={comum:"Comum",rara:"Rara",epica:"Épica",lendaria:"Lendária",mitica:"Mítica"},kd=["comum","rara","epica","lendaria","mitica"],Ue=Math.PI*2;function lb(n,e,t,i,s){if(typeof s=="string")return s;const a=n.createRadialGradient(e-i*.18,t-i*.22,i*.1,e,t,i);return a.addColorStop(0,s[0]),a.addColorStop(1,s[1]),a}function rh(n,e,t,i,s,a,o,r){n.save(),n.fillStyle=r,n.font=o,n.textAlign="center",n.textBaseline="middle";const l=[...e];let c=0;const h=l.map(f=>{const g=n.measureText(f).width+s*.02;return c+=g,g}),d=c/s;let u=a?-Math.PI/2-d/2:Math.PI/2+d/2;for(let f=0;f<l.length;f++){const g=h[f]/s;u+=(a?1:-1)*g/2,n.save(),n.translate(t+Math.cos(u)*s,i+Math.sin(u)*s),n.rotate(a?u+Math.PI/2:u-Math.PI/2),n.fillText(l[f],0,0),n.restore(),u+=(a?1:-1)*g/2}n.restore()}function hb(n,e,t,i,s){let a=i;for(n.font=`${s} ${a}px sans-serif`;n.measureText(e).width>t&&a>8;)a-=2,n.font=`${s} ${a}px sans-serif`;return a}function db(n,e,t=!0){n.beginPath(),e.forEach((i,s)=>s?n.lineTo(i[0],i[1]):n.moveTo(i[0],i[1])),t&&n.closePath()}function eo(n,e,t,i,s,a,o=-Math.PI/2){n.beginPath();for(let r=0;r<a*2;r++){const l=r%2?s:i,c=o+r/(a*2)*Ue,h=e+Math.cos(c)*l,d=t+Math.sin(c)*l;r?n.lineTo(h,d):n.moveTo(h,d)}n.closePath()}function ub(n,e,t,i,s,a,o){n.save(),n.translate(t,i);const r=c=>{n.fillStyle=c,n.fill()},l=(c,h)=>{n.strokeStyle=c,n.lineWidth=h,n.lineJoin="round",n.lineCap="round",n.stroke()};switch(e){case"star":eo(n,0,0,s,s*.42,5),r(a);break;case"star6":eo(n,0,0,s,s*.5,6),r(a);break;case"sunburst":{for(let c=0;c<16;c++){const h=c/16*Ue;n.save(),n.rotate(h),n.beginPath(),n.moveTo(s*.5,-s*.06),n.lineTo(s*1.05,0),n.lineTo(s*.5,s*.06),n.closePath(),r(a),n.restore()}n.beginPath(),n.arc(0,0,s*.5,0,Ue),r(o||a);break}case"cherry":{n.beginPath(),n.moveTo(-s*.1,-s*.9),n.bezierCurveTo(s*.3,-s*.7,-s*.4,-s*.1,-s*.35,s*.2),l("#3c6b2e",s*.1),n.beginPath(),n.moveTo(-s*.1,-s*.9),n.bezierCurveTo(s*.4,-s*.6,s*.5,-s*.1,s*.45,s*.2),l("#3c6b2e",s*.1),n.beginPath(),n.arc(-s*.38,s*.5,s*.34,0,Ue),r(a),n.beginPath(),n.arc(s*.42,s*.45,s*.34,0,Ue),r(a),n.fillStyle="rgba(255,255,255,.5)",n.beginPath(),n.arc(-s*.48,s*.4,s*.09,0,Ue),n.arc(s*.32,s*.35,s*.09,0,Ue),n.fill();break}case"grape":{n.fillStyle=a,[[-.5,-.4,.5],[-.75,-.25,.25,.75],[-.5,0,.5],[-.25,.25],[0]].forEach((h,d)=>h.forEach(u=>{n.beginPath(),n.arc(u*s,(-.55+d*.34)*s,s*.2,0,Ue),n.fill()})),n.strokeStyle="#3c6b2e",n.lineWidth=s*.09,n.beginPath(),n.moveTo(0,-s*.75),n.lineTo(s*.2,-s*1.05),n.stroke();break}case"orange":{n.beginPath(),n.arc(0,0,s,0,Ue),r(a),n.strokeStyle="rgba(255,255,255,.55)",n.lineWidth=s*.06;for(let c=0;c<8;c++){const h=c/8*Ue;n.beginPath(),n.moveTo(0,0),n.lineTo(Math.cos(h)*s*.9,Math.sin(h)*s*.9),n.stroke()}n.beginPath(),n.arc(0,0,s*.16,0,Ue),n.fillStyle="rgba(255,255,255,.4)",n.fill();break}case"lemon":{n.save(),n.rotate(-.5),n.beginPath(),n.ellipse(0,0,s,s*.62,0,0,Ue),r(a),n.beginPath(),n.moveTo(-s,0),n.lineTo(-s*1.18,0),l(a,s*.14),n.beginPath(),n.moveTo(s,0),n.lineTo(s*1.18,0),l(a,s*.14),n.restore();break}case"apple":{n.beginPath(),n.moveTo(0,-s*.5),n.bezierCurveTo(-s*1.1,-s*1.1,-s*1.1,s*.5,0,s),n.bezierCurveTo(s*1.1,s*.5,s*1.1,-s*1.1,0,-s*.5),r(a),n.strokeStyle="#3c6b2e",n.lineWidth=s*.11,n.beginPath(),n.moveTo(0,-s*.5),n.lineTo(s*.08,-s*.95),n.stroke(),n.fillStyle="#3c6b2e",n.beginPath(),n.ellipse(s*.35,-s*.85,s*.28,s*.14,-.6,0,Ue),n.fill();break}case"bottle":{n.fillStyle=a,n.beginPath(),n.moveTo(-s*.28,-s),n.lineTo(s*.28,-s),n.lineTo(s*.28,-s*.5),n.bezierCurveTo(s*.55,-s*.3,s*.5,s*.9,s*.4,s),n.lineTo(-s*.4,s),n.bezierCurveTo(-s*.5,s*.9,-s*.55,-s*.3,-s*.28,-s*.5),n.closePath(),n.fill(),n.fillStyle="rgba(255,255,255,.3)",n.fillRect(-s*.2,-s*.2,s*.14,s*.9);break}case"duck":{n.fillStyle=a,n.beginPath(),n.arc(-s*.1,-s*.15,s*.6,0,Ue),n.fill(),n.beginPath(),n.arc(s*.4,-s*.35,s*.4,0,Ue),n.fill(),n.fillStyle=o||"#f2a400",n.beginPath(),n.moveTo(s*.7,-s*.35),n.quadraticCurveTo(s*1.25,-s*.25,s*.75,-s*.05),n.closePath(),n.fill(),n.fillStyle="#222",n.beginPath(),n.arc(s*.5,-s*.42,s*.07,0,Ue),n.fill();break}case"bear":{n.fillStyle=a,n.beginPath(),n.arc(0,s*.2,s*.7,0,Ue),n.fill(),n.beginPath(),n.arc(0,-s*.55,s*.42,0,Ue),n.fill(),n.beginPath(),n.arc(-s*.32,-s*.85,s*.16,0,Ue),n.arc(s*.32,-s*.85,s*.16,0,Ue),n.fill(),n.fillStyle="#222",n.beginPath(),n.arc(-s*.14,-s*.6,s*.06,0,Ue),n.arc(s*.14,-s*.6,s*.06,0,Ue),n.arc(0,-s*.42,s*.08,0,Ue),n.fill();break}case"clown":{n.fillStyle="#ffe0c4",n.beginPath(),n.arc(0,s*.1,s*.62,0,Ue),n.fill(),n.fillStyle=a,n.beginPath(),n.arc(0,s*.35,s*.22,0,Ue),n.fill(),n.beginPath(),n.arc(-s*.5,s*.05,s*.2,0,Ue),n.arc(s*.5,s*.05,s*.2,0,Ue),n.fill(),n.fillStyle=o||"#c0392b",n.beginPath(),n.moveTo(-s*.55,-s*.45),n.lineTo(0,-s),n.lineTo(s*.55,-s*.45),n.closePath(),n.fill(),n.fillStyle="#222",n.beginPath(),n.arc(-s*.2,s*.02,s*.06,0,Ue),n.arc(s*.2,s*.02,s*.06,0,Ue),n.fill();break}case"goat":{n.fillStyle=a,n.beginPath(),n.moveTo(0,s),n.lineTo(-s*.4,s*.2),n.lineTo(-s*.2,-s*.4),n.lineTo(0,-s*.2),n.lineTo(s*.2,-s*.4),n.lineTo(s*.4,s*.2),n.closePath(),n.fill(),n.strokeStyle=a,n.lineWidth=s*.14,n.beginPath(),n.moveTo(-s*.2,-s*.4),n.quadraticCurveTo(-s*.7,-s*.7,-s*.4,-s*1.05),n.moveTo(s*.2,-s*.4),n.quadraticCurveTo(s*.7,-s*.7,s*.4,-s*1.05),n.stroke();break}case"eagle":{n.fillStyle=a,n.beginPath(),n.moveTo(0,-s*.2),n.quadraticCurveTo(-s*1.1,-s*.7,-s*1.2,0),n.quadraticCurveTo(-s*.6,0,0,s*.4),n.quadraticCurveTo(s*.6,0,s*1.2,0),n.quadraticCurveTo(s*1.1,-s*.7,0,-s*.2),n.fill(),n.beginPath(),n.arc(0,-s*.45,s*.28,0,Ue),n.fill(),n.fillStyle=o||"#f2a400",n.beginPath(),n.moveTo(0,-s*.3),n.lineTo(s*.18,-s*.1),n.lineTo(-s*.18,-s*.1),n.closePath(),n.fill();break}case"diamond":{n.beginPath(),n.moveTo(0,-s),n.lineTo(s*.7,0),n.lineTo(0,s),n.lineTo(-s*.7,0),n.closePath(),r(a),n.fillStyle="rgba(255,255,255,.35)",n.beginPath(),n.moveTo(0,-s),n.lineTo(s*.35,-s*.5),n.lineTo(0,0),n.lineTo(-s*.35,-s*.5),n.closePath(),n.fill();break}case"cards":{const c=(h,d)=>{n.save(),n.translate(h,0),n.rotate(d),n.fillStyle="#fff",n.strokeStyle="#c0392b",n.lineWidth=s*.04,n.beginPath(),n.rect(-s*.32,-s*.5,s*.64,s),n.fill(),n.stroke(),n.fillStyle="#c0392b",eo(n,0,-s*.22,s*.16,s*.07,5),n.fill(),n.restore()};c(-s*.28,-.28),c(s*.28,.28),c(0,0);break}case"bolt":{n.fillStyle=a,db(n,[[-s*.1,-s],[s*.5,-s*.15],[s*.1,-s*.15],[s*.4,s],[-s*.5,-s*.05],[-s*.05,-s*.05]]),n.fill();break}case"crown":{n.fillStyle=a,n.beginPath(),n.moveTo(-s,s*.5),n.lineTo(-s,-s*.3),n.lineTo(-s*.5,s*.1),n.lineTo(0,-s*.6),n.lineTo(s*.5,s*.1),n.lineTo(s,-s*.3),n.lineTo(s,s*.5),n.closePath(),n.fill();break}case"buddha":{n.fillStyle=a,n.beginPath(),n.arc(0,s*.35,s*.75,0,Math.PI),n.fill(),n.beginPath(),n.arc(0,-s*.35,s*.4,0,Ue),n.fill(),n.fillStyle="rgba(0,0,0,.25)",n.beginPath(),n.arc(0,s*.4,s*.45,.2,Math.PI-.2),n.stroke();break}case"wave":{n.strokeStyle=a,n.lineWidth=s*.34,n.beginPath(),n.arc(-s*.2,s*.1,s*.7,-Math.PI*.85,Math.PI*.2),n.stroke(),n.fillStyle=o||a;for(const[c,h]of[[-.7,.5],[-.3,.7],[.2,.6]])n.beginPath(),n.arc(c*s,h*s,s*.12,0,Ue),n.fill();break}case"key":{n.strokeStyle=a,n.lineWidth=s*.18,n.beginPath(),n.arc(-s*.5,0,s*.4,0,Ue),n.stroke(),n.beginPath(),n.moveTo(-s*.15,0),n.lineTo(s*.9,0),n.moveTo(s*.7,0),n.lineTo(s*.7,s*.35),n.moveTo(s*.9,0),n.lineTo(s*.9,s*.45),n.stroke();break}case"shield":{n.fillStyle=a,n.beginPath(),n.moveTo(0,-s),n.lineTo(s*.8,-s*.6),n.lineTo(s*.7,s*.3),n.quadraticCurveTo(s*.4,s,0,s*1.05),n.quadraticCurveTo(-s*.4,s,-s*.7,s*.3),n.lineTo(-s*.8,-s*.6),n.closePath(),n.fill();break}case"heart":{n.fillStyle=a,n.beginPath(),n.moveTo(0,s*.9),n.bezierCurveTo(-s*1.3,-s*.1,-s*.5,-s,0,-s*.35),n.bezierCurveTo(s*.5,-s,s*1.3,-s*.1,0,s*.9),n.fill();break}case"glass":{n.fillStyle=a,n.beginPath(),n.moveTo(-s*.5,-s*.7),n.lineTo(s*.5,-s*.7),n.lineTo(s*.32,s*.8),n.lineTo(-s*.32,s*.8),n.closePath(),n.fill(),n.fillStyle="#fff",n.beginPath(),n.ellipse(0,-s*.7,s*.5,s*.16,0,0,Ue),n.fill();break}case"snow":{n.strokeStyle=a,n.lineWidth=s*.1;for(let c=0;c<6;c++)n.save(),n.rotate(c/6*Ue),n.beginPath(),n.moveTo(0,0),n.lineTo(0,-s),n.moveTo(0,-s*.6),n.lineTo(s*.25,-s*.8),n.moveTo(0,-s*.6),n.lineTo(-s*.25,-s*.8),n.stroke(),n.restore();break}case"leaf":{n.fillStyle=a,n.beginPath(),n.moveTo(0,s),n.bezierCurveTo(-s,s*.2,-s*.6,-s,0,-s),n.bezierCurveTo(s*.6,-s,s,s*.2,0,s),n.fill(),n.strokeStyle="rgba(0,0,0,.2)",n.lineWidth=s*.06,n.beginPath(),n.moveTo(0,s),n.lineTo(0,-s),n.stroke();break}case"pinup":{n.fillStyle=a,n.beginPath(),n.arc(0,-s*.5,s*.32,0,Ue),n.fill(),n.beginPath(),n.moveTo(-s*.3,-s*.2),n.quadraticCurveTo(0,s*.1,s*.3,-s*.2),n.quadraticCurveTo(s*.6,s*.7,0,s),n.quadraticCurveTo(-s*.6,s*.7,-s*.3,-s*.2),n.fill();break}case"dragon":{n.fillStyle=a,n.beginPath(),n.moveTo(-s,s*.3),n.quadraticCurveTo(-s*.2,-s*.2,s*.3,-s*.5),n.quadraticCurveTo(s,-s,s*.9,-s*.1),n.quadraticCurveTo(s*.4,s*.2,s*.5,s*.8),n.quadraticCurveTo(0,s*.3,-s,s*.3),n.fill();break}case"thumb":{n.fillStyle=a,n.beginPath(),n.roundRect(-s*.25,-s*.1,s*.5,s,s*.1),n.fill(),n.beginPath(),n.roundRect(-s*.55,-s*.1,s*.32,s*.55,s*.14),n.fill(),n.beginPath(),n.arc(s*.05,-s*.3,s*.34,Math.PI,Ue),n.fill();break}case"ring":{n.strokeStyle=a,n.lineWidth=s*.16,n.beginPath(),n.arc(0,0,s*.8,0,Ue),n.stroke();break}case"target":{for(let c=3;c>=1;c--)n.beginPath(),n.arc(0,0,s*c/3,0,Ue),n.fillStyle=c%2?a:o||"#fff",n.fill();break}default:n.beginPath(),n.arc(0,0,s*.6,0,Ue),r(a);break}n.restore()}const fb={steel:["#f2f4f6","#b9c0c7","#7c848c"],silver:["#ffffff","#c8ccd2","#868c94"],gold:["#fff3c0","#e8be55","#9c7818"],copper:["#f4c9a0","#c67e46","#7c471f"],dark:["#6b7078","#3a3e44","#1c1f24"]};function it(n,e=360){const t=Math.round(e*2.5),i=document.createElement("canvas");i.width=i.height=t,i.style.width=i.style.height=e+"px";const s=i.getContext("2d");s.imageSmoothingQuality="high";const a=t/2,o=t/2,r=t*.5-1,l=r*.82,c=fb[n.metal||"steel"],h=21;for(let p=0;p<h;p++){const m=p/h*Ue-Math.PI/2,y=(p+1)/h*Ue-Math.PI/2,v=(m+y)/2;s.beginPath(),s.moveTo(a+Math.cos(m)*l,o+Math.sin(m)*l),s.arc(a,o,l,m,y),s.arc(a,o,r,y,m,!0),s.closePath();const x=.5+.5*Math.cos(v+.7),T=s.createLinearGradient(a+Math.cos(v)*l,o+Math.sin(v)*l,a+Math.cos(v)*r,o+Math.sin(v)*r);T.addColorStop(0,c[1]),T.addColorStop(.55,x>.5?c[0]:c[2]),T.addColorStop(1,x>.65?c[1]:c[2]),s.fillStyle=T,s.fill(),s.strokeStyle="rgba(0,0,0,0.18)",s.lineWidth=t*.004,s.beginPath(),s.moveTo(a+Math.cos(m)*l,o+Math.sin(m)*l),s.lineTo(a+Math.cos(m)*r,o+Math.sin(m)*r),s.stroke()}if(s.beginPath(),s.arc(a,o,l,0,Ue),s.strokeStyle="rgba(0,0,0,0.28)",s.lineWidth=t*.01,s.stroke(),s.lineCap="round",s.beginPath(),s.arc(a,o,l-t*.006,Math.PI*.8,Math.PI*1.85),s.strokeStyle="rgba(255,255,255,0.4)",s.lineWidth=t*.008,s.stroke(),s.beginPath(),s.arc(a,o,l-t*.006,-Math.PI*.15,Math.PI*.75),s.strokeStyle="rgba(0,0,0,0.22)",s.lineWidth=t*.008,s.stroke(),s.lineCap="butt",s.save(),s.beginPath(),s.arc(a,o,l-1,0,Ue),s.clip(),s.fillStyle=lb(s,a,o,l,n.bg),s.fillRect(0,0,t,t),s.shadowColor="rgba(0,0,0,0.28)",s.shadowBlur=t*.008,s.shadowOffsetY=t*.003,n.fringe&&(s.strokeStyle=n.fringe,s.lineWidth=l*.14,s.beginPath(),s.arc(a,o,l*.9,0,Ue),s.stroke()),n.rings){s.strokeStyle=n.rings,s.lineWidth=t*.006;for(const p of[.62,.7])s.beginPath(),s.arc(a,o,l*p,0,Ue),s.stroke()}if(n.emblem&&ub(s,n.emblem,a,o+(n.emblemY??0)*l,l*.34*(n.emblemScale??1),n.emblemColor||"#c0392b",n.emblemColor2||""),n.stars){s.fillStyle=n.starColor||"#fff";for(let p=0;p<n.stars;p++){const m=-Math.PI/2+p/n.stars*Ue;eo(s,a+Math.cos(m)*l*.6,o+Math.sin(m)*l*.6,l*.07,l*.03,5),s.fill()}}if(n.band){const[p,m,y]=n.band;if(s.fillStyle=p,s.fillRect(a-l,o-l*.26,l*2,l*.52),m){const v=hb(s,m,l*1.7,l*.34,"800");s.fillStyle=y,s.font=`800 ${v}px sans-serif`,s.textAlign="center",s.textBaseline="middle",s.fillText(m,a,o+l*.01)}}if(n.arcTop&&rh(s,n.arcTop[0],a,o,l*.82,!0,`800 ${l*.15}px sans-serif`,n.arcTop[1]),n.arcBot&&rh(s,n.arcBot[0],a,o,l*.82,!1,`800 ${l*.13}px sans-serif`,n.arcBot[1]),n.center){const p=n.centerFont||"block",m=p==="script"?"italic 900":p==="serif"?"bold":p==="slab"?"900":"800",y=p==="script"?"'Segoe Script','Brush Script MT',cursive":p==="serif"?"Georgia,serif":"sans-serif";let v=(n.centerSize??.42)*l;for(s.font=`${m} ${v}px ${y}`;s.measureText(n.center).width>l*1.55&&v>8;)v-=2,s.font=`${m} ${v}px ${y}`;s.fillStyle=n.centerColor||"#fff",s.textAlign="center",s.textBaseline="middle";const x=o+(n.band?0:n.arcBot||n.sub?-l*.05:0);p==="script"?(s.save(),s.translate(a,x),s.transform(1,0,-.18,1,0,0),s.fillText(n.center,0,0),s.restore()):s.fillText(n.center,a,x)}n.sub&&(s.fillStyle=n.sub[1],s.font=`700 ${l*.13}px sans-serif`,s.textAlign="center",s.textBaseline="middle",s.fillText(n.sub[0],a,o+l*.42)),s.shadowColor="transparent",s.shadowBlur=0,s.shadowOffsetY=0;const d=s.createRadialGradient(a,o,l*.82,a,o,l);d.addColorStop(0,"rgba(0,0,0,0)"),d.addColorStop(1,"rgba(0,0,0,0.24)"),s.fillStyle=d,s.fillRect(0,0,t,t);const u=n.vintage??.35;if(u>0){for(let m=0;m<40*u;m++)s.globalAlpha=.05+Math.random()*.12,s.fillStyle=Math.random()<.5?"#3a2a12":"#fff",s.beginPath(),s.arc(a+(Math.random()-.5)*l*2,o+(Math.random()-.5)*l*2,l*(.01+Math.random()*.05),0,Ue),s.fill();s.globalAlpha=1,s.strokeStyle="rgba(255,255,255,0.12)",s.lineWidth=1;for(let m=0;m<6*u;m++){s.beginPath();const y=Math.random()*Ue,v=Math.random()*l;s.moveTo(a+Math.cos(y)*v,o+Math.sin(y)*v),s.lineTo(a+Math.cos(y)*(v+l*.3),o+Math.sin(y)*(v+l*.3)),s.stroke()}const p=s.createRadialGradient(a,o,l*.4,a,o,l);p.addColorStop(0,"rgba(0,0,0,0)"),p.addColorStop(1,`rgba(30,18,6,${.14+u*.22})`),s.fillStyle=p,s.fillRect(0,0,t,t)}s.restore(),s.save(),s.beginPath(),s.arc(a,o,r,0,Ue),s.clip();const f=s.createLinearGradient(0,0,t*.7,t*.7);f.addColorStop(0,"rgba(255,255,255,0.26)"),f.addColorStop(.35,"rgba(255,255,255,0.05)"),f.addColorStop(1,"rgba(255,255,255,0)"),s.fillStyle=f,s.fillRect(0,0,t,t);const g=s.createRadialGradient(a-r*.42,o-r*.46,0,a-r*.42,o-r*.46,r*.55);g.addColorStop(0,"rgba(255,255,255,0.30)"),g.addColorStop(.5,"rgba(255,255,255,0.07)"),g.addColorStop(1,"rgba(255,255,255,0)"),s.fillStyle=g,s.fillRect(0,0,t,t);const b=s.createRadialGradient(a+r*.55,o+r*.6,r*.2,a+r*.55,o+r*.6,r*.75);return b.addColorStop(0,"rgba(190,220,255,0.10)"),b.addColorStop(1,"rgba(190,220,255,0)"),s.fillStyle=b,s.fillRect(0,0,t,t),s.restore(),i}const hr=new Map;function pb(n,e){if(hr.has(n))return hr.get(n);const t=new yo(it(e,300));return t.colorSpace=mn,t.anisotropy=16,hr.set(n,t),t}const ch={bal:{weight:1,slide:1,stability:1,bounce:1,control:1,power:1,grip:1},glide:{weight:.93,slide:1.13,stability:.97,bounce:1.03,control:.98,power:.96,grip:.95},heavy:{weight:1.14,slide:.9,stability:1.09,bounce:.9,control:1.01,power:1.08,grip:1.1},precise:{weight:.98,slide:1,stability:1.09,bounce:.97,control:1.14,power:.99,grip:1.02},bouncy:{weight:.95,slide:1.05,stability:.94,bounce:1.16,control:.98,power:1.02,grip:.94},nimble:{weight:.9,slide:1.09,stability:1.02,bounce:1.02,control:1.06,power:.95,grip:.97},tank:{weight:1.18,slide:.87,stability:1.13,bounce:.85,control:1,power:1.12,grip:1.16},allround:{weight:1.05,slide:1.06,stability:1.06,bounce:1.05,control:1.06,power:1.05,grip:1.05}},lh={comum:0,rara:.013,epica:.028,lendaria:.048,mitica:.066};function mb(n,e){const t=ch[n]||ch.bal,i=1+lh[e],s=1+lh[e]*.4,a=o=>+(o*(o>=1?i:s)).toFixed(3);return{weight:a(t.weight),slide:a(t.slide),stability:a(t.stability),bounce:a(t.bounce),control:a(t.control),power:a(t.power),grip:a(t.grip)}}function Dd(n,e=38){const t=parseInt(n.replace("#",""),16),i=Math.max(0,(t>>16)-e),s=Math.max(0,(t>>8&255)-e),a=Math.max(0,(t&255)-e);return"#"+(i<<16|s<<8|a).toString(16).padStart(6,"0")}const Id={steel:"#c8ccd2",silver:"#d2d6db",gold:"#e8be55",copper:"#c67e46",dark:"#3a3e44"};function fe(n,e,t,i,s,a,o,r){return{id:n,name:e,rarity:t,unlock:i,stats:mb(s,t),top:a,side:Dd(a),ring:Id[o.metal||"steel"],art:o,desc:r}}const Rt=[fe("coca","Cola Vermelha","comum",0,"bal","#d81f26",{bg:["#e5343a","#c0121a"],metal:"steel",arcTop:["DRINK","#fff"],center:"Cola",centerColor:"#fff",centerFont:"script",centerSize:.5,sub:["DELICIOSA & GELADA","#ffd7a0"],vintage:.4},"A clássica. Equilibrada em tudo."),fe("grape","Uva Roxa","comum",0,"bal","#6a3d9a",{bg:["#7a4bb0","#54307c"],metal:"steel",arcTop:["GRAPE","#fff"],arcBot:["SODA","#fff"],emblem:"grape",emblemColor:"#dcc6f2",vintage:.35},"Refri de uva de sempre."),fe("orangecrush","Laranja Crush","comum",0,"bouncy","#e5761a",{bg:["#f79a2e","#dd6412"],metal:"steel",arcTop:["ORANGE","#7a2f10"],center:"Crush",centerColor:"#fff",centerFont:"script",centerSize:.5,sub:["SODA","#7a2f10"],vintage:.4},"Quica com gosto de laranja."),fe("sprite","Limão Verde","comum",0,"nimble","#2f8a52",{bg:["#f2f6ee","#d6e6cf"],metal:"steel",center:"Sprite",centerColor:"#1f7a3a",centerFont:"script",centerSize:.5,emblem:"star",emblemColor:"#3fae6a",emblemY:-.02,emblemScale:.5,sub:["LIMÃO","#1f7a3a"],vintage:.3},"Leve e ágil."),fe("rootbeer","Root Beer do Pop","comum",0,"heavy","#5a3418",{bg:["#6b4020","#3f2410"],metal:"copper",arcTop:["ROOT","#ffd7a0"],arcBot:["BEER","#ffd7a0"],emblem:"bottle",emblemColor:"#caa16b",vintage:.45},"Pesada, empurra geral."),fe("pinklem","Limonada Rosa","comum",0,"bouncy","#e86a9a",{bg:["#f7a8c6","#e06a95"],metal:"steel",arcTop:["PINK","#7a1f45"],arcBot:["LEMONADE","#7a1f45"],emblem:"clown",emblemColor:"#e86a9a",emblemColor2:"#c0392b",emblemScale:.9,vintage:.4},"Doce e saltitante."),fe("bubbleup","Bubble Up","comum",0,"nimble","#2fae4e",{bg:["#39c257","#1f8a3a"],metal:"steel",center:"Bubble up",centerColor:"#fff",centerFont:"script",centerSize:.36,sub:["LIMÃO·LIMA","#fff"],vintage:.35},"Borbulha e desliza."),fe("sevenup","Sete Acima","comum",0,"precise","#c0392b",{bg:["#eef0ea","#cfd2c8"],metal:"silver",center:"7up",centerColor:"#c0392b",centerFont:"slab",centerSize:.5,sub:["LEMON SODA","#2f8a52"],vintage:.4},"Limpa e precisa."),fe("cherrycoke","Cereja","comum",1,"bal","#e0489a",{bg:["#ec5aa6","#c02d78"],metal:"steel",center:"Cherry",centerColor:"#fff",centerFont:"script",centerSize:.42,emblem:"cherry",emblemColor:"#c0122a",emblemY:.42,emblemScale:.7,arcTop:["CHERRY COLA","#fff"],vintage:.35},"Cola com cereja."),fe("lemon","Bubble Lima","comum",1,"glide","#3fae6a",{bg:["#e9e2cf","#cfc7ac"],metal:"steel",arcTop:["LEMON","#3f7a2a"],center:"bubble up",centerColor:"#c0392b",centerFont:"script",centerSize:.34,sub:["LIME SODA","#3f7a2a"],vintage:.5},"Escorrega bastante."),fe("whistle","Whistle","comum",1,"bal","#e5761a",{bg:["#f79a2e","#e5761a"],metal:"steel",arcTop:["THIRSTY?","#0a3d91"],center:"WHISTLE",centerColor:"#0a3d91",centerFont:"block",centerSize:.34,sub:["JUST","#0a3d91"],vintage:.4},"Assobia de sede."),fe("moxie","Moxie","comum",2,"heavy","#d4341f",{bg:["#e5453a","#b8261a"],metal:"steel",arcTop:["TRADE MARK","#ffe9c0"],center:"Moxie",centerColor:"#fff",centerFont:"serif",centerSize:.5,sub:["SODA","#ffe9c0"],vintage:.5},"Amarga e teimosa."),fe("cheerwine","Cheerwine","comum",2,"bal","#cf1f2d",{bg:["#f4cf3a","#e0b21f"],metal:"steel",arcTop:["CHEERWINE","#c0122a"],center:"Since 1917",centerColor:"#c0122a",centerFont:"serif",centerSize:.22,emblem:"cherry",emblemColor:"#c0122a",emblemY:.4,emblemScale:.55,sub:["GOOD CHEER","#c0122a"],vintage:.4},"Cheia de bom humor."),fe("howdy","Howdy","comum",2,"bouncy","#e5761a",{bg:["#1c1c1c","#000"],metal:"steel",arcTop:["ORANGE","#f79420"],center:"Howdy",centerColor:"#f79420",centerFont:"script",centerSize:.46,sub:["SODA","#f79420"],vintage:.45},"Alegre e pula-pula."),fe("ski","Ski","comum",3,"nimble","#2f8a52",{bg:["#f2c200","#d9a800"],metal:"steel",band:["#1f7a3a","Ski","#f2c200"],sub:["CITRUS","#1f7a3a"],vintage:.35},"Cítrica e esperta."),fe("lucky","Lucky Club","comum",3,"bal","#c0392b",{bg:["#e9e6dc","#cfccc0"],metal:"silver",band:["#c0392b","Lucky Club","#fff"],emblem:"leaf",emblemColor:"#2f8a52",emblemY:-.42,emblemScale:.45,sub:["COLA","#0a3d91"],vintage:.4},"Um trevo de sorte."),fe("bonedry","Bone Dry","comum",3,"precise","#0a3d91",{bg:["#f2f2f0","#dcdcd8"],metal:"silver",arcTop:["GINGER ALE","#0a3d91"],center:"Bone Dry",centerColor:"#0a3d91",centerFont:"serif",centerSize:.36,vintage:.35},"Sequinha, boa de mira."),fe("sunnykid","Sunny Kid","comum",4,"glide","#1f7a3a",{bg:["#2f8a52","#186633"],metal:"steel",center:"Sunny Kid",centerColor:"#f4d76a",centerFont:"serif",centerSize:.34,emblem:"sunburst",emblemColor:"#f4d76a",emblemColor2:"#f4d76a",emblemY:0,emblemScale:.5,vintage:.45},"Desliza no sol."),fe("uptown","Up-Town","comum",4,"nimble","#1f7a3a",{bg:["#2f8a52","#155a2c"],metal:"steel",center:"up-town",centerColor:"#fff",centerFont:"script",centerSize:.4,emblem:"heart",emblemColor:"#e5484d",emblemY:.44,emblemScale:.4,vintage:.4},"Chique da cidade."),fe("dads","Dad's","comum",4,"heavy","#0a3d91",{bg:["#f2c200","#d9a800"],metal:"steel",arcTop:["SINCE 1937","#0a3d91"],center:"DAD'S",centerColor:"#c0392b",centerFont:"slab",centerSize:.42,sub:["OLD FASHIONED","#0a3d91"],vintage:.45},"Root beer do pai."),fe("mas","Ma's","comum",5,"bal","#6b7078",{bg:["#8a9098","#5a6068"],metal:"silver",arcTop:["NO DEPOSIT","#fff"],center:"Ma's",centerColor:"#e5484d",centerFont:"script",centerSize:.46,sub:["NO RETURN","#fff"],vintage:.45},"Caseira, sem devolução."),fe("wakeup","Wake Up","comum",5,"precise","#0a3d91",{bg:["#e9e6dc","#cfc7ac"],metal:"silver",center:"WAKE UP",centerColor:"#0a3d91",centerFont:"block",centerSize:.32,emblem:"star",emblemColor:"#0a3d91",emblemY:-.42,emblemScale:.4,vintage:.4},"Desperta e acerta."),fe("pickupper","Pick-Upper","comum",5,"nimble","#c0392b",{bg:["#eef0ea","#d0d2cc"],metal:"silver",center:"Pick-UPPER",centerColor:"#c0392b",centerFont:"block",centerSize:.3,sub:["CITRATE SODA","#8a8a80"],vintage:.4},"Levanta o astral."),fe("upanup","Up and Up","comum",6,"bal","#c0392b",{bg:["#e9e6dc","#cfc7ac"],metal:"silver",center:"UP and UP",centerColor:"#c0392b",centerFont:"block",centerSize:.3,vintage:.4},"Sempre pra cima."),fe("yup","Yup!","comum",6,"bouncy","#f2a400",{bg:["#f7c948","#e59a12"],metal:"steel",center:"Yup!",centerColor:"#1f7a3a",centerFont:"script",centerSize:.5,sub:["IS UP","#1f7a3a"],vintage:.4},"Positiva e saltitante."),fe("goody","Goody Uva","comum",7,"glide","#8e5bd0",{bg:["#f2d6f0","#dcb0e0"],metal:"steel",arcTop:["GOODY","#7c3aed"],center:"Goody",centerColor:"#7c3aed",centerFont:"script",centerSize:.46,sub:["GRAPE SODA","#7c3aed"],vintage:.4},"Boazinha e lisa."),fe("smile","Smile","comum",8,"nimble","#e5761a",{bg:["#f79420","#dd6412"],metal:"steel",center:"Smile",centerColor:"#fff",centerFont:"script",centerSize:.42,emblem:"orange",emblemColor:"#f4c04a",emblemY:.42,emblemScale:.45,vintage:.4},"Sempre sorrindo."),fe("pepsi","Pepsi-Cola","rara",5,"glide","#0a3d91",{bg:["#e5343a","#0a3d91"],metal:"steel",band:["#f2f2f2","Pepsi·Cola","#0a3d91"],vintage:.4},"Desliza suave e longe."),fe("drpepper","Dr Pepper","rara",6,"bal","#6e1f2b",{bg:["#7a1f2b","#4f141c"],metal:"steel",arcTop:["SINCE 1891","#f2c6c0"],center:"Dr Pepper",centerColor:"#fff",centerFont:"slab",centerSize:.3,sub:["DUBLIN · TEXAS","#f2c6c0"],vintage:.4},"Vinte e três sabores."),fe("felix","Felix Orange Dry","rara",7,"bal","#e5761a",{bg:["#f79420","#c85f12"],metal:"gold",arcTop:["FELIX","#3a1c08"],emblem:"bear",emblemColor:"#3a1c08",emblemY:-.34,emblemScale:.42,center:"ORANGE",centerColor:"#3a1c08",centerFont:"slab",centerSize:.28,sub:["DRY","#3a1c08"],vintage:.5},"O gato da laranja."),fe("eskimo","Eskimo Cream","rara",7,"precise","#0a3d91",{bg:["#1a4fa0","#0a2f70"],metal:"silver",emblem:"bear",emblemColor:"#eef3ff",emblemY:-.36,emblemScale:.42,center:"Eskimo",centerColor:"#fff",centerFont:"script",centerSize:.42,sub:["CREAM SODA","#cfe0ff"],vintage:.4},"Cremosa e certeira."),fe("lemmy","Lemmy Lemonade","rara",8,"nimble","#8a6b1f",{bg:["#3a2c10","#1c1508"],metal:"gold",arcTop:["LEMMY","#f4d76a"],center:"LEMONADE",centerColor:"#f4d76a",centerFont:"slab",centerSize:.24,emblem:"lemon",emblemColor:"#f4d76a",emblemY:.42,emblemScale:.5,vintage:.55},"Azedinha e ligeira."),fe("bluebird","Blue Bird","rara",8,"glide","#6a1f45",{bg:["#7a2b52","#521636"],metal:"gold",arcTop:["ARTIFICIAL COLOR","#f2c6d8"],center:"Blue Bird",centerColor:"#f4d76a",centerFont:"serif",centerSize:.3,sub:["GRAPE SODA","#f2c6d8"],vintage:.5},"Voa raspando o chão."),fe("bigtop","Big Top","rara",9,"bouncy","#e5761a",{bg:["#f79420","#dd6412"],metal:"steel",arcTop:["ORANGE","#fff"],band:["#c0392b","BIG TOP","#fff"],sub:["SODA","#fff"],vintage:.45},"Circo laranja saltitante."),fe("applejack","Apple Jack","rara",9,"nimble","#3fae6a",{bg:["#f2d64a","#d9b21f"],metal:"steel",center:"Apple Jack",centerColor:"#1f7a3a",centerFont:"serif",centerSize:.3,emblem:"apple",emblemColor:"#3fae6a",emblemY:.42,emblemScale:.5,vintage:.4},"Maçã ligeira."),fe("jacksup","Jack's-Up","rara",10,"bal","#c0392b",{bg:["#f2f2f0","#dcdcd8"],metal:"silver",center:"Jack's-Up",centerColor:"#c0392b",centerFont:"script",centerSize:.4,emblem:"cards",emblemY:-.42,emblemScale:.55,vintage:.4},"Aposta certeira."),fe("blimey","Blimey","rara",10,"glide","#1f7a3a",{bg:["#e9e6dc","#cfc7ac"],metal:"steel",arcTop:["LEMON LIME","#1f7a3a"],center:"blimey",centerColor:"#1f7a3a",centerFont:"script",centerSize:.44,sub:["SODA","#1f7a3a"],vintage:.45},"Desliza que é uma beleza."),fe("lincoln","Lincoln Grape","rara",11,"heavy","#7c3aed",{bg:["#8a5bc0","#5a2f8a"],metal:"steel",arcTop:["LINCOLN","#fff"],center:"GRAPE",centerColor:"#fff",centerFont:"slab",centerSize:.32,sub:["SODA","#fff"],vintage:.5},"Presidencial e firme."),fe("royalpalm","Royal Palm","rara",12,"bal","#8a1220",{bg:["#a01a2a","#6a0c18"],metal:"gold",arcTop:["ROYAL PALM","#f4d76a"],center:"STRAWBERRY",centerColor:"#f4d76a",centerFont:"slab",centerSize:.2,emblem:"leaf",emblemColor:"#f4d76a",emblemY:.44,emblemScale:.4,sub:["SODA","#f4d76a"],vintage:.5},"Morango real."),fe("dilly","Dilly","rara",12,"nimble","#c0392b",{bg:["#f2ead0","#dcd2b0"],metal:"steel",center:"Dilly",centerColor:"#c0392b",centerFont:"script",centerSize:.5,sub:["FOR THIRST","#8a6b2a"],vintage:.5},"Uma gracinha ágil."),fe("chaser","Chaser","rara",13,"nimble","#1f7a3a",{bg:["#2f8a52","#155a2c"],metal:"steel",center:"Chaser",centerColor:"#f4d76a",centerFont:"script",centerSize:.5,vintage:.35},"Persegue e alcança."),fe("sport","Sport","rara",14,"bal","#c0392b",{bg:["#f2f2f0","#d8d8d4"],metal:"silver",arcTop:["SPORT","#c0392b"],center:"WINNER",centerColor:"#c0392b",centerFont:"slab",centerSize:.26,emblem:"star",emblemColor:"#c0392b",emblemY:.42,emblemScale:.4,sub:["EVERY TIME","#c0392b"],vintage:.4},"Espírito esportivo."),fe("jolt","Jolt","rara",15,"bouncy","#e5484d",{bg:["#e5343a","#b8241a"],metal:"steel",center:"JOLT",centerColor:"#fff",centerFont:"slab",centerSize:.4,emblem:"bolt",emblemColor:"#f4d76a",emblemY:-.4,emblemScale:.5,vintage:.35},"Um choque de energia."),fe("charge","Charge Up","rara",16,"nimble","#1f7a3a",{bg:["#e9e6dc","#cfc7ac"],metal:"silver",arcTop:["MISSION","#1f7a3a"],center:"CHARGE UP",centerColor:"#1f7a3a",centerFont:"block",centerSize:.24,emblem:"bolt",emblemColor:"#1f7a3a",emblemY:.42,emblemScale:.4,vintage:.4},"Carrega e dispara."),fe("stepn","Step 'N High","rara",16,"precise","#c0392b",{bg:["#eef0ea","#d0d2cc"],metal:"silver",arcTop:["STEP 'N","#c0392b"],center:"HIGH",centerColor:"#c0392b",centerFont:"slab",centerSize:.3,sub:["TO REFRESH","#c0392b"],vintage:.4},"Sobe degraus com jeito."),fe("dragon","Dragon Cream","epica",16,"heavy","#0a3d91",{bg:["#123a80","#08245a"],metal:"gold",arcTop:["DRAGON","#f4d76a"],emblem:"dragon",emblemColor:"#f4d76a",emblemY:-.06,emblemScale:.7,sub:["CREAM SODA","#f4d76a"],vintage:.5},"O dragão que empurra tudo."),fe("donaldsoda","Pato Laranja","epica",18,"bouncy","#e5761a",{bg:["#f2ead0","#dccea0"],metal:"steel",arcTop:["DONALD DUCK","#0a3d91"],emblem:"duck",emblemColor:"#fff",emblemColor2:"#f2a400",emblemY:-.32,emblemScale:.5,center:"ORANGE",centerColor:"#e5761a",centerFont:"slab",centerSize:.24,sub:["SODA","#0a3d91"],vintage:.45},"O pato mais saltitante."),fe("donaldcola","Pato Cola","epica",20,"nimble","#1f6ea0",{bg:["#2f8ac0","#155a80"],metal:"steel",arcTop:["DONALD DUCK","#f4d76a"],center:"Cola",centerColor:"#f4d76a",centerFont:"script",centerSize:.4,emblem:"duck",emblemColor:"#fff",emblemColor2:"#f2a400",emblemY:-.36,emblemScale:.6,vintage:.4},"Ágil como um pato."),fe("vegasvic","Vegas Vic","epica",22,"bal","#6e2a12",{bg:["#7a3418","#4f200c"],metal:"gold",arcTop:["VEGAS VIC","#f4d76a"],center:"ROOT BEER",centerColor:"#f4d76a",centerFont:"slab",centerSize:.26,emblem:"star",emblemColor:"#f4d76a",emblemY:.42,emblemScale:.45,vintage:.5},"O caubói da estrada."),fe("royalflush","Royal Flush","epica",24,"bal","#c0122a",{bg:["#d4142e","#8a0c1e"],metal:"gold",arcTop:["LOGANBERRY","#f4d76a"],center:"PORT",centerColor:"#f4d76a",centerFont:"slab",centerSize:.26,emblem:"cards",emblemY:-.4,emblemScale:.5,sub:["ROYAL FLUSH","#f4d76a"],vintage:.5},"A mão vencedora."),fe("strawmilk","Leite Morango","epica",26,"heavy","#c0392b",{bg:["#e07a5a","#c05a3a"],metal:"steel",arcTop:["STRAWBERRY","#fff"],center:"MILK",centerColor:"#fff",centerFont:"slab",centerSize:.34,emblem:"cherry",emblemColor:"#c0122a",emblemY:.44,emblemScale:.45,vintage:.45},"Cremosa e encorpada."),fe("brownie","Brownie","epica",28,"heavy","#4a2c12",{bg:["#5a3418","#33200c"],metal:"copper",arcTop:["BROWNIE","#e9c9a0"],arcBot:["ROOT BEER","#e9c9a0"],emblem:"bear",emblemColor:"#e9c9a0",emblemScale:.85,vintage:.55},"O duende do root beer."),fe("jurk","Jurk","epica",30,"nimble","#1f7a3a",{bg:["#e9e6dc","#cfc7ac"],metal:"steel",center:"Jurk",centerColor:"#1f7a3a",centerFont:"script",centerSize:.5,emblem:"lemon",emblemColor:"#f4d76a",emblemY:-.4,emblemScale:.45,vintage:.45},"Cítrica misteriosa."),fe("rcorange","Royal Crown","epica",32,"glide","#e5761a",{bg:["#f79420","#c85f12"],metal:"gold",arcTop:["ROYAL","#3a1c08"],center:"ORANGE",centerColor:"#3a1c08",centerFont:"slab",centerSize:.28,emblem:"crown",emblemColor:"#f4d76a",emblemY:-.42,emblemScale:.45,vintage:.45},"Corôa que desliza."),fe("slender","Slender","epica",34,"glide","#c0392b",{bg:["#c9b89a","#a89670"],metal:"copper",center:"Slender",centerColor:"#c0392b",centerFont:"script",centerSize:.46,vintage:.6},"Fininha e escorregadia."),fe("kona","Kona","epica",36,"bal","#e5a400",{bg:["#f2b400","#c98a00"],metal:"gold",arcTop:["KONA","#3a2c08"],center:"BREWING",centerColor:"#3a2c08",centerFont:"slab",centerSize:.24,emblem:"wave",emblemColor:"#0a6ea0",emblemColor2:"#0a6ea0",emblemY:.36,emblemScale:.5,vintage:.35},"Onda do Havaí."),fe("newcastle","Newcastle","epica",38,"heavy","#6a1f2b",{bg:["#7a1f2b","#4f141c"],metal:"silver",center:"BROWN ALE",centerColor:"#fff",centerFont:"slab",centerSize:.24,emblem:"star6",emblemColor:"#3fae6a",emblemColor2:"#f2c200",emblemY:-.02,emblemScale:.8,vintage:.4},"A estrela azul da cerveja."),fe("cocagold","Cola Ouro Atlanta","lendaria",30,"allround","#f2c200",{bg:["#f7d84a","#e0a800"],metal:"gold",arcTop:["DELICIOUS · REFRESHING","#7a1f10"],center:"Cola",centerColor:"#c0122a",centerFont:"script",centerSize:.44,sub:["ATLANTA","#7a1f10"],vintage:.35},"A joia dourada. Boa em tudo."),fe("duvel","Duvel","lendaria",36,"precise","#c0392b",{bg:["#f2ead0","#dcceA0"],metal:"silver",center:"Duvel",centerColor:"#c0122a",centerFont:"script",centerSize:.5,emblem:"star",emblemColor:"#c0122a",emblemY:-.42,emblemScale:.35,vintage:.3},"Diabólica na mira: controle afiado."),fe("sierra","Sierra Nevada","lendaria",42,"glide","#0f7a3a",{bg:["#e9e6dc","#cfc7ac"],metal:"gold",arcTop:["SIERRA NEVADA","#0f7a3a"],center:"PALE ALE",centerColor:"#0f7a3a",centerFont:"slab",centerSize:.22,emblem:"leaf",emblemColor:"#0f7a3a",emblemY:.36,emblemScale:.5,vintage:.35},"Desce a montanha deslizando."),fe("newbelgium","New Belgium","lendaria",48,"nimble","#e5761a",{bg:["#f2c200","#d99000"],metal:"gold",arcTop:["NEW BELGIUM","#7a2f08"],center:"BREWING",centerColor:"#7a2f08",centerFont:"slab",centerSize:.22,emblem:"ring",emblemColor:"#c0392b",emblemY:.02,emblemScale:.9,vintage:.35},"A bicicleta ágil que voa."),fe("spaten","Spaten","lendaria",55,"tank","#c0122a",{bg:["#f2f2f0","#dcdcd8"],metal:"silver",arcTop:["SPATEN","#c0122a"],center:"München",centerColor:"#c0122a",centerFont:"serif",centerSize:.3,emblem:"shield",emblemColor:"#c0122a",emblemY:-.4,emblemScale:.4,vintage:.3},"Muralha de Munique: pesa e resiste."),fe("newbelgium2","Great Lakes 30","lendaria",62,"bouncy","#5a7ab0",{bg:["#7a9ad0","#4f6ea0"],metal:"silver",arcTop:["GREAT LAKES","#fff"],center:"30",centerColor:"#fff",centerFont:"slab",centerSize:.5,sub:["EST. 1988","#dceaff"],vintage:.3},"Três décadas de quique."),fe("goldenleaf","Golden Leaf","lendaria",70,"heavy","#f2c200",{bg:["#1c1c1c","#000"],metal:"gold",arcTop:["GOLDEN LEAF","#f4d76a"],emblem:"glass",emblemColor:"#f4d76a",emblemY:-.34,emblemScale:.42,center:"WHEAT",centerColor:"#f4d76a",centerFont:"slab",centerSize:.26,vintage:.3},"A folha de ouro, pesada e forte."),fe("felixgold","Felix Dourado","lendaria",78,"bal","#f2a400",{bg:["#f7c948","#e59a12"],metal:"gold",arcTop:["FELIX","#3a1c08"],emblem:"bear",emblemColor:"#3a1c08",emblemY:.02,emblemScale:.72,sub:["ORANGE DRY","#3a1c08"],vintage:.4},"O gato lendário do ouro, equilibrado."),fe("prisma","Prisma","mitica",90,"nimble","#22d3ee",{bg:["#b8f7ff","#6a3df0"],metal:"silver",arcTop:["PRISMA","#3a1060"],emblem:"diamond",emblemColor:"#eafcff",emblemColor2:"#ff5ea8",emblemY:-.02,emblemScale:.8,sub:["ESPECTRO","#3a1060"],vintage:.15},"Ágil como a luz que se divide."),fe("aurora","Aurora Boreal","mitica",105,"glide","#2ee6a8",{bg:["#2ee6a8","#1a4fa0"],metal:"silver",arcTop:["AURORA","#eafff6"],center:"BOREAL",centerColor:"#eafff6",centerFont:"slab",centerSize:.26,emblem:"wave",emblemColor:"#eafff6",emblemColor2:"#b8f7ff",emblemY:.36,emblemScale:.5,vintage:.15},"Desliza como véu de luz no céu."),fe("vulcao","Vulcão","mitica",120,"heavy","#e5484d",{bg:["#ff7a3a","#7a0c10"],metal:"copper",arcTop:["VULCÃO","#ffd76a"],emblem:"dragon",emblemColor:"#ffd76a",emblemColor2:"#ff7a3a",emblemY:0,emblemScale:.72,sub:["MAGMA","#ffd76a"],vintage:.2},"Pesada como rocha derretida."),fe("trovao","Trovão","mitica",138,"bouncy","#f2c200",{bg:["#1a1c3a","#050614"],metal:"gold",arcTop:["TROVÃO","#ffe36a"],emblem:"bolt",emblemColor:"#ffe36a",emblemY:-.02,emblemScale:.85,sub:["TEMPESTADE","#ffe36a"],vintage:.15},"Quica com a fúria do raio."),fe("obsidiana","Obsidiana","mitica",158,"tank","#7c3aed",{bg:["#3a2c5a","#0a0612"],metal:"dark",arcTop:["OBSIDIANA","#c9a0ff"],emblem:"shield",emblemColor:"#c9a0ff",emblemColor2:"#7c3aed",emblemY:-.02,emblemScale:.7,sub:["VIDRO VULCÂNICO","#c9a0ff"],vintage:.2},"Vidro negro: pesa e não sai do lugar."),fe("infinito","Infinito","mitica",180,"allround","#ff4fa3",{bg:["#ff8fd0","#6a1fa0"],metal:"gold",arcTop:["INFINITO","#fff"],center:"∞",centerColor:"#fff",centerFont:"serif",centerSize:.6,emblem:"target",emblemColor:"#ff4fa3",emblemColor2:"#fff",emblemY:0,emblemScale:.95,vintage:.1},"A tampinha suprema. Melhor em tudo.")];function dr(n,e,t,i,s,a){return{id:n,name:e,rarity:"comum",unlock:99999,hidden:!0,stats:s,top:t,side:Dd(t),ring:Id[i.metal||"steel"],art:i,desc:a}}Rt.push(dr("enferrujada","Enferrujada","#8a5a2e",{bg:["#9a6a38","#5a3a18"],metal:"copper",arcTop:["FERRO VELHO","#3a2408"],center:"Rusty",centerColor:"#3a2408",centerFont:"script",centerSize:.44,vintage:.9},{weight:1.02,slide:.88,stability:.92,bounce:.86,control:.9,power:.92,grip:.94},"Achada no quintal. Pesadinha, mas cheia de vontade."),dr("riscada","Riscada","#6b7078",{bg:["#8a9098","#4a5058"],metal:"steel",arcTop:["BEM USADA","#2a2e33"],center:"Risk",centerColor:"#2a2e33",centerFont:"slab",centerSize:.4,vintage:.85},{weight:.9,slide:.95,stability:.88,bounce:.92,control:.92,power:.88,grip:.88},"Cheia de riscos de batalha. Levinha e escorregadia."),dr("desbotada","Desbotada","#c9b89a",{bg:["#d9c9a8","#a89670"],metal:"silver",arcTop:["COR? QUE COR?","#7a6a48"],center:"Fade",centerColor:"#7a6a48",centerFont:"serif",centerSize:.42,vintage:.95},{weight:.92,slide:.9,stability:.94,bounce:.88,control:.95,power:.86,grip:.9},"O sol levou a cor, não a mira. Um tiquinho mais precisa."));const Hs=["#e5484d","#3b82f6","#3fae6a","#f7d046","#f59e0b","#7c3aed"],et=n=>Rt.find(e=>e.id===n)||Rt[0],gb=[.06,.06,.05,.1,.06];function xs(n,e){e.unlock=99999,e.prize=n;const t=gb[n]??.06,i=1+t,s=1+t*.6;for(const a of Object.keys(e.stats))e.stats[a]=+(e.stats[a]*(e.stats[a]>=1?i:s)).toFixed(3);return e}Rt.push(xs(0,fe("itubaina","Itubaína Retrô","comum",99999,"nimble","#d81f26",{bg:["#e8433a","#b01218"],metal:"steel",arcTop:["DESDE 1948","#ffe9c0"],center:"Itubaína",centerColor:"#fff",centerFont:"script",centerSize:.4,sub:["TUTTI-FRUTTI","#ffe9c0"],vintage:.5},"O tutti-frutti do quintal brasileiro. Ágil como a molecada.")),xs(1,fe("nesbitts","Nesbitt's California","rara",99999,"bouncy","#f79420",{bg:["#f79420","#d85f0e"],metal:"steel",band:["#1c1c1c","NESBITT'S","#f79420"],arcTop:["CALIFORNIA","#fff"],sub:["ORANGE","#1c1c1c"],vintage:.5},"A laranja da calçada californiana. Quica cheia de sol.")),xs(2,fe("hires","Hires Root Beer","epica",99999,"heavy","#1a4fa0",{bg:["#1f5ab0","#0d3070"],metal:"silver",arcTop:["SINCE 1876","#f4d76a"],center:"Hires",centerColor:"#fff",centerFont:"script",centerSize:.46,sub:["ROOT BEER","#f79420"],vintage:.5},"A root beer mais antiga da cidade. Pesada e imponente.")),xs(3,fe("guarana","Guaraná Champagne","lendaria",99999,"glide","#1f7a3a",{bg:["#2f9a4c","#115c26"],metal:"gold",arcTop:["CHAMPAGNE","#ffe9c0"],center:"Guaraná",centerColor:"#fff",centerFont:"script",centerSize:.4,emblem:"cherry",emblemColor:"#d8231f",emblemY:.42,emblemScale:.5,sub:["ANTARCTICA","#ffe9c0"],vintage:.45},"O orgulho nacional, bagas vermelhas e tudo. Desliza como espuma.")),xs(4,fe("schweppes","Schweppes 1783","mitica",99999,"precise","#0e4a2c",{bg:["#11593a","#062b1a"],metal:"gold",arcTop:["SINCE 1783","#e8c86a"],center:"Schweppes",centerColor:"#f2e2b0",centerFont:"script",centerSize:.32,emblem:"sunburst",emblemColor:"#e8c86a",emblemColor2:"#e8c86a",emblemY:-.4,emblemScale:.34,sub:["SODA WATER","#e8c86a"],vintage:.4},"A soda mais antiga do MUNDO. Precisão de dois séculos e meio.")));const hh=.025;function _s(n,e){xs(n,e),e.prize=void 0,e.rprize=n;const t=1+hh,i=1+hh*.6;for(const s of Object.keys(e.stats))e.stats[s]=+(e.stats[s]*(e.stats[s]>=1?t:i)).toFixed(3);return e}Rt.push(_s(0,fe("mineirinho","Mineirinho","comum",99999,"nimble","#1f7a3a",{bg:["#2f9a4c","#0f5c26"],metal:"steel",arcTop:["O SABOR DE MINAS","#eafcd0"],center:"Mineirinho",centerColor:"#fff",centerFont:"script",centerSize:.3,emblem:"leaf",emblemColor:"#b8e986",emblemY:.4,emblemScale:.45,sub:["MATE COM GUARANÁ","#eafcd0"],vintage:.45},"O verdinho de Minas, mate com guaraná. Ágil como moleque de botequim.")),_s(1,fe("dolly","Dolly Guaraná","rara",99999,"bouncy","#f2c200",{bg:["#f7d84a","#2f9a4c"],metal:"gold",arcTop:["GUARANÁ","#0f5c26"],center:"Dolly",centerColor:"#0f5c26",centerFont:"script",centerSize:.5,sub:["O PREFERIDO","#0f5c26"],vintage:.4},"O guaraná paulista que virou lenda. Quica alegre como a propaganda.")),_s(2,fe("saogeraldo","Cajuína São Geraldo","epica",99999,"heavy","#e5761a",{bg:["#f4b03a","#c85f12"],metal:"gold",arcTop:["CAJUÍNA","#7a2f08"],center:"São Geraldo",centerColor:"#fff",centerFont:"serif",centerSize:.28,emblem:"sunburst",emblemColor:"#ffe9c0",emblemColor2:"#ffe9c0",emblemY:-.38,emblemScale:.32,sub:["DESDE 1938 · CE","#7a2f08"],vintage:.5},"O ouro do caju cearense. Parruda e imponente como o sertão.")),_s(3,fe("bare","Baré Guaraná","lendaria",99999,"glide","#1a4fa0",{bg:["#1f5ab0","#0d3070"],metal:"gold",arcTop:["O GUARANÁ DO NORTE","#f4d76a"],center:"Baré",centerColor:"#f4d76a",centerFont:"slab",centerSize:.44,sub:["MANAUS · AM","#dceaff"],vintage:.45},"O gigante de Manaus, orgulho do Norte. Desliza como o rio Negro.")),_s(4,fe("guaranajesus","Guaraná Jesus","mitica",99999,"precise","#ff4fa3",{bg:["#ff7ac0","#d81f6a"],metal:"gold",arcTop:["O SABOR ROSA","#fff"],center:"Jesus",centerColor:"#fff",centerFont:"script",centerSize:.46,emblem:"star",emblemColor:"#ffe36a",emblemY:-.4,emblemScale:.32,sub:["MARANHÃO · 1920","#ffe9f4"],vintage:.4},"O rosa milagroso do Maranhão. Precisão divina — a melhor tampinha do jogo.")));function Vs(n,e){return _s(n,e),e.rcaos=!0,e}Rt.push(Vs(0,fe("grapette","Grapette","comum",99999,"nimble","#6a3d9a",{bg:["#7a4bb0","#4a2578"],metal:"steel",arcTop:["THIRSTY OR NOT","#e8d6ff"],center:"Grapette",centerColor:"#fff",centerFont:"script",centerSize:.38,sub:["UVA · DESDE 1949","#e8d6ff"],vintage:.5},"A uvinha que o Brasil inteiro tomou na infância. Ligeira como recreio.")),Vs(1,fe("cotuba","Cotuba","rara",99999,"bouncy","#c0392b",{bg:["#d84a3a","#8a1c12"],metal:"steel",arcTop:["O SABOR DO INTERIOR","#ffe9c0"],center:"Cotuba",centerColor:"#fff",centerFont:"slab",centerSize:.4,sub:["GUARANÁ · SP","#ffe9c0"],vintage:.5},"O guaraná do interior paulista. Quica como bola de meia em rua de terra.")),Vs(2,fe("matecouro","Mate Couro","epica",99999,"heavy","#5a3418",{bg:["#6b4020","#33200e"],metal:"copper",arcTop:["DESDE 1936 · BH","#f4d76a"],center:"Mate Couro",centerColor:"#f4d76a",centerFont:"serif",centerSize:.3,sub:["O MATE MINEIRO","#e8caa0"],vintage:.55},"O mate de Belo Horizonte, escuro e encorpado. Pesa como boteco cheio.")),Vs(3,fe("fruki","Fruki Guaraná","lendaria",99999,"glide","#2f8a52",{bg:["#3fae6a","#186633"],metal:"gold",arcTop:["DESDE 1924 · RS","#eafcd0"],center:"Fruki",centerColor:"#fff",centerFont:"script",centerSize:.46,sub:["O GUARANÁ GAÚCHO","#eafcd0"],vintage:.45},"O orgulho do Rio Grande. Desliza macio como chimarrão descendo.")),Vs(4,fe("simba","Simba Guaraná","mitica",99999,"precise","#e5761a",{bg:["#f79420","#a84e0a"],metal:"gold",arcTop:["O REI GUARANÁ","#3a1c08"],center:"Simba",centerColor:"#3a1c08",centerFont:"slab",centerSize:.44,emblem:"sunburst",emblemColor:"#ffe36a",emblemColor2:"#ffe36a",emblemY:-.38,emblemScale:.3,sub:["ANOS 60","#3a1c08"],vintage:.55},"O rei dos guaranás dos anos 60. Mira de rei da rua — lenda do circuito Caos.")));const to=n=>Rt.filter(e=>!e.hidden&&(n>=e.unlock||Ce.hasBonus(e.id))),vb=n=>kd.indexOf(n),Wa=.5;class bb{constructor(e){this.group=new $t;const t=et(e.skin),i=new Z(new dt(e.radius,e.radius*.96,Wa,40),new Ve({color:t.side,roughness:.45,metalness:.25}));i.position.y=Wa/2,i.castShadow=!0,this.group.add(i);const s=new Z(new Wt(e.radius,.07,8,40),new Ve({color:t.ring,roughness:.5,metalness:.3}));s.rotation.x=Math.PI/2,s.position.y=Wa-.03,this.group.add(s),this.top=new Z(new Mn(e.radius*.99,44),new Ve({map:pb(t.id,t.art),roughness:.42,metalness:.25,transparent:!0})),this.top.rotation.x=-Math.PI/2,this.top.position.y=Wa+.005,this.group.add(this.top),this.ringHi=new Z(new Wt(e.radius+.35,.09,8,32),new Vt({color:16777215,transparent:!0,opacity:.9,blending:si,depthWrite:!1})),this.ringHi.rotation.x=-Math.PI/2,this.ringHi.position.y=.05,this.ringHi.visible=!1,this.group.add(this.ringHi)}update(e,t,i){this.group.visible=!0;const s=e.moving?Math.abs(Math.sin(t*20))*.03:Math.sin(t*2+e.bob)*.015;this.group.position.set(e.pos.x,s+(e.z||0),e.pos.y),this.group.rotation.y=e.angle,e.airborne?this.group.rotation.x=Math.sin(t*10)*.25:this.group.rotation.x=0;const a=(1+e.hitFlash*.12)*(1+(e.z||0)*.05);if(this.group.scale.set(a,1-e.hitFlash*.1,a),this.ringHi.visible=i&&!e.finished,i){const o=1+Math.sin(t*6)*.06;this.ringHi.scale.set(o,o,o),this.ringHi.material.opacity=.5+Math.sin(t*6)*.25}}}class yb{constructor(){this.group=new $t,this.views=[]}build(e){this.group.clear(),this.views=[];for(const t of e){const i=new bb(t);this.views.push(i),this.group.add(i.group)}}update(e,t,i){for(let s=0;s<e.length;s++)this.views[s]?.update(e[s],t,e[s].id===i)}}function xb(){const e=document.createElement("canvas");e.width=e.height=64;const t=e.getContext("2d"),i=t.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);return i.addColorStop(0,"rgba(255,255,255,1)"),i.addColorStop(.6,"rgba(255,255,255,0.6)"),i.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=i,t.fillRect(0,0,64,64),new yo(e)}class _b{constructor(){this.cap=700,this.ps=[];const e=new jt;this.pos=new Float32Array(this.cap*3),this.col=new Float32Array(this.cap*3),this.siz=new Float32Array(this.cap),e.setAttribute("position",new wn(this.pos,3)),e.setAttribute("color",new wn(this.col,3)),e.setAttribute("size",new wn(this.siz,1));const t=new yd({size:.6,map:xb(),vertexColors:!0,transparent:!0,depthWrite:!1,sizeAttenuation:!0,blending:Yi});this.points=new Ev(e,t),this.points.frustumCulled=!1}emit(e,t,i,s,a,o,r,l,c,h){this.ps.length>=this.cap&&this.ps.shift(),this.ps.push({x:e,y:t,z:i,vx:s,vy:a,vz:o,life:r,max:r,size:l,grav:c,r:h.r,g:h.g,b:h.b})}dust(e,t,i=6,s="#d8c090"){const a=new He(s);for(let o=0;o<i;o++)this.emit(e,.1,t,(Math.random()-.5)*2,Math.random()*1.5+.5,(Math.random()-.5)*2,.5+Math.random()*.4,.6+Math.random()*.5,-1.2,a)}impact(e,t,i,s="#fff4d0"){const a=new He(s),o=Math.min(18,5+i);for(let r=0;r<o;r++){const l=Math.random()*6.28,c=2+Math.random()*i*.5;this.emit(e,.3,t,Math.cos(l)*c,1+Math.random()*2,Math.sin(l)*c,.35+Math.random()*.3,.35,-3,a)}}skid(e,t){this.emit(e,.05,t,0,0,0,.9,.5,0,new He("#00000022"))}confetti(e,t){const i=["#e5484d","#3b82f6","#3fae6a","#f7d046","#f59e0b","#7c3aed","#ffffff"];for(let s=0;s<160;s++){const a=new He(i[s%i.length]);this.emit(e+(Math.random()-.5)*20,14+Math.random()*6,t+(Math.random()-.5)*20,(Math.random()-.5)*3,-2-Math.random()*2,(Math.random()-.5)*3,2.4+Math.random()*1.5,.7,-.6,a)}}update(e){for(let s=this.ps.length-1;s>=0;s--){const a=this.ps[s];if(a.life-=e,a.life<=0){this.ps.splice(s,1);continue}a.vy+=a.grav*e,a.x+=a.vx*e,a.y+=a.vy*e,a.z+=a.vz*e,a.y<.02&&(a.y=.02,a.vy=0,a.vx*=.7,a.vz*=.7)}const t=Math.min(this.ps.length,this.cap);for(let s=0;s<t;s++){const a=this.ps[s],o=a.life/a.max;this.pos[s*3]=a.x,this.pos[s*3+1]=a.y,this.pos[s*3+2]=a.z,this.col[s*3]=a.r,this.col[s*3+1]=a.g,this.col[s*3+2]=a.b,this.siz[s]=a.size*o}for(let s=t;s<this.cap;s++)this.siz[s]=0;const i=this.points.geometry;i.getAttribute("position").needsUpdate=!0,i.getAttribute("color").needsUpdate=!0,i.getAttribute("size").needsUpdate=!0}}class Mb{constructor(){this.group=new $t,this.mat=new Vt({color:3394645,transparent:!0,opacity:.9}),this.shaft=new Z(new An(1,.5),this.mat),this.shaft.rotation.x=-Math.PI/2,this.head=new Z(new Mn(.9,3),this.mat),this.head.rotation.x=-Math.PI/2,this.ring=new Z(new Wt(1.1,.08,8,28),new Vt({color:16777215,transparent:!0,opacity:.6})),this.ring.rotation.x=-Math.PI/2;const e=new zv({color:16777215,dashSize:.4,gapSize:.3,transparent:!0,opacity:.7}),t=new jt().setFromPoints([new U,new U]);this.pull=new wv(t,e),this.pull.computeLineDistances(),this.group.add(this.shaft,this.head,this.ring,this.pull),this.group.visible=!1}set(e,t,i,s,a){this.group.visible=!0;const o=Math.atan2(s,i),r=2+a*12,l=new He().setHSL(.33*(1-a),.75,.5);this.mat.color.copy(l),this.shaft.position.set(e+Math.cos(o)*(r/2+1.1),.12,t+Math.sin(o)*(r/2+1.1)),this.shaft.scale.set(r,1,1),this.shaft.rotation.z=0,this.shaft.rotation.y=0,this.shaft.rotation.set(-Math.PI/2,0,-o),this.head.position.set(e+Math.cos(o)*(r+1.4),.12,t+Math.sin(o)*(r+1.4)),this.head.rotation.set(-Math.PI/2,0,-o-Math.PI/2),this.head.scale.setScalar(.7+a*.6),this.ring.position.set(e,.1,t);const c=[new U(e,.15,t),new U(e-Math.cos(o)*r*.6,.15,t-Math.sin(o)*r*.6)];this.pull.geometry.setFromPoints(c),this.pull.computeLineDistances()}hide(){this.group.visible=!1}}const Sb=34,wb=6;function Nd(n){return n.some(e=>(e.moving||e.airborne)&&!e.finished)}function Ud(n,e,t){const i=[],s=e.def;for(const a of n){if(a.hitFlash=Math.max(0,a.hitFlash-t*4),a.finished||!a.moving&&!a.airborne)continue;const o=he(a.pos.x,a.pos.y);if(a.airborne){if(a.pos.x+=a.vel.x*t,a.pos.y+=a.vel.y*t,a.vz-=Sb*t,a.z+=a.vz*t,a.angle+=7*t,a.progress>e.total*.72&&e.crossedFinish(o,a.pos)){a.finished=!0,a.vel=he(),a.moving=!1,a.airborne=!1,a.z=0,i.push({type:"finish",capId:a.id,x:a.pos.x,y:a.pos.y,power:0});continue}a.z<=0&&(a.z=0,a.airborne=!1,a.vel=Bc(a.vel,Math.min(.92,.7+.14*a.stats.stability)),i.push({type:"land",capId:a.id,x:a.pos.x,y:a.pos.y,power:on(a.vel)})),a.pos.x>=0&&a.pos.y>=0&&a.pos.x<=s.w&&a.pos.y<=s.h&&(a.progress=e.progressOf(a.pos));continue}const r=e.surfaceAt(a.pos),l=Ad[r],c=e.patchAt(a.pos);if(r==="ramp"){const b=c?.dir!=null?{x:Math.cos(c.dir),y:Math.sin(c.dir)}:sn(a.vel);a.vel.x+=b.x*30*t,a.vel.y+=b.y*30*t}else if(r==="push"){const b=c?.dir!=null?{x:Math.cos(c.dir),y:Math.sin(c.dir)}:{x:-a.vel.x,y:-a.vel.y};a.vel.x=a.vel.x*.93+b.x*30*t,a.vel.y=a.vel.y*.93+b.y*30*t}else if(r==="water"){const b=c?.dir!=null?{x:Math.cos(c.dir),y:Math.sin(c.dir)}:{x:0,y:0};a.vel.x+=b.x*10*t,a.vel.y+=b.y*10*t}else if(r==="magnet"&&c){const b=c.x-a.pos.x,p=c.y-a.pos.y,m=Math.hypot(b,p);m>.05&&(a.vel.x+=b/m*26*t,a.vel.y+=p/m*26*t)}else if(r==="vortex"&&c){const p=(Math.sin(c.x*3.7+c.y*2.3)>=0?1:-1)*2*t,m=Math.cos(p),y=Math.sin(p),v=a.vel.x*m-a.vel.y*y,x=a.vel.x*y+a.vel.y*m;a.vel.x=v,a.vel.y=x}const h=on(a.vel);if(h>0){const b=a.stats,p=l.fric>12,m=p?1+(b.weight-1)*.55:1,y=p?b.power*b.power:1,v=l.fric*m/(b.slide*y);let x=h-v*t;const T=r==="frost"?.3:1,M=l.drag/(.7+.3*b.slide)+(b.control-1)*(h<6?.85:.12)*T;x*=1-Math.min(.92,Math.max(0,M)*t),x<0&&(x=0);const S=sn(a.vel);a.vel.x=S.x*x,a.vel.y=S.y*x}a.pos.x+=a.vel.x*t,a.pos.y+=a.vel.y*t;const d=on(a.vel);if(a.angVel=d*.9*(1/a.stats.stability),a.angle+=a.angVel*t,d>1.2){const b=r==="grass"?1:r==="sand"?.45:0;if(b>0){const m=Math.sin(a.pos.x*.31+a.pos.y*.23+1.7)*b*a.angVel*.095*t,y=Math.cos(m),v=Math.sin(m),x=a.vel.x*y-a.vel.y*v,T=a.vel.x*v+a.vel.y*y;a.vel.x=x,a.vel.y=T}}const u=r==="felt"?1.5:r==="metal"?1.35:r==="carpet"?.45:1,f=Math.max(1,u);e.collideWalls(a.pos,a.vel,a.radius,Math.min(.95,.42*a.stats.bounce*u))&&(i.push({type:"wall",capId:a.id,x:a.pos.x,y:a.pos.y,power:on(a.vel)}),a.hitFlash=1);for(let b=0;b<s.obstacles.length;b++){const p=s.obstacles[b];if(a.ghost&&(p.type==="band"||p.type==="mill"||p.type==="stone"||p.type==="top"||p.type==="car"||p.type==="balloon"))continue;if(p.type==="band"||p.type==="mill"){for(const T of Rd(p)){const M=T.b.x-T.a.x,S=T.b.y-T.a.y,C=M*M+S*S||1e-6;let N=((a.pos.x-T.a.x)*M+(a.pos.y-T.a.y)*S)/C;N=N<0?0:N>1?1:N;const _=T.a.x+M*N,w=T.a.y+S*N,L=Math.hypot(a.pos.x-_,a.pos.y-w),I=.2+a.radius;if(L>=I)continue;let B=a.pos.x-_,j=a.pos.y-w;const F=Math.hypot(B,j)||1;B/=F,j/=F,a.pos.x+=B*(I-L+.01),a.pos.y+=j*(I-L+.01);const Q=a.vel.x*B+a.vel.y*j;if(Q<0){if(p.type==="band"){const K=Math.min(1.55,1.1+.03*Math.abs(Q));a.vel.x-=(1+K)*Q*B,a.vel.y-=(1+K)*Q*j;const me=on(a.vel),ge=zc*1.05;me>ge&&(a.vel.x*=ge/me,a.vel.y*=ge/me),i.push({type:"band",capId:a.id,x:_,y:w,power:Math.abs(Q)})}else a.vel.x-=1.55*Q*B,a.vel.y-=1.55*Q*j,a.vel.x+=-j*2.2,a.vel.y+=B*2.2,i.push({type:"mill",capId:a.id,x:_,y:w,power:Math.abs(Q)});a.hitFlash=1}}continue}const m=p,y=p.r+(p.type==="stone"||p.type==="top"||p.type==="car"?a.radius:a.radius*.55),v=a.pos.x-m.x,x=a.pos.y-m.y;if(!(v*v+x*x>y*y)){if(p.type==="jump"){const T=p.dir!=null?{x:Math.cos(p.dir),y:Math.sin(p.dir)}:sn(a.vel),M=a.vel.x*T.x+a.vel.y*T.y;if(M>wb){a.airborne=!0,a.z=.02,a.vz=Math.min(14,6+M*.5),a.vel.x=(a.vel.x*.55+T.x*M*.5)*1.12,a.vel.y=(a.vel.y*.55+T.y*M*.5)*1.12,i.push({type:"ramp",capId:a.id,x:p.x,y:p.y,power:M});break}continue}if(p.type==="stone"){const T=Math.hypot(v,x)||1,M=v/T,S=x/T,C=y-T;a.pos.x+=M*C,a.pos.y+=S*C;const N=a.vel.x*M+a.vel.y*S;if(N<0){const _=1+Math.min(.95,.45*a.stats.bounce*f);a.vel.x-=_*N*M,a.vel.y-=_*N*S}i.push({type:"stone",capId:a.id,x:p.x,y:p.y,power:d}),a.hitFlash=1}else if(p.type==="top"){const T=Math.hypot(v,x)||1,M=v/T,S=x/T,C=y-T;a.pos.x+=M*C,a.pos.y+=S*C;const N=a.vel.x*M+a.vel.y*S;if(N<0){const _=1+.55*a.stats.bounce;a.vel.x-=_*N*M,a.vel.y-=_*N*S,a.vel.x+=-S*5.5,a.vel.y+=M*5.5,i.push({type:"top",capId:a.id,x:m.x,y:m.y,power:Math.abs(N)}),a.hitFlash=1}}else if(p.type==="car"){const T=Math.hypot(v,x)||1,M=v/T,S=x/T,C=y-T;a.pos.x+=M*C,a.pos.y+=S*C;const N=a.vel.x*M+a.vel.y*S;N<0&&(a.vel.x-=1.2*N*M,a.vel.y-=1.2*N*S,a.vel.x*=.8,a.vel.y*=.8,a.consumed.has(b)||(a.consumed.add(b),i.push({type:"car",capId:a.id,x:p.x,y:p.y,power:Math.abs(N),obsIdx:b})),a.hitFlash=1)}else if(p.type==="balloon"){if(p.popped||a.consumed.has(b))continue;a.consumed.add(b),i.push({type:"balloon",capId:a.id,x:p.x,y:p.y,power:on(a.vel),obsIdx:b});for(const T of n){if(T.finished)continue;const M=T.pos.x-p.x,S=T.pos.y-p.y,C=Math.hypot(M,S);if(C>4.2||C<1e-4)continue;const N=11-C*2.2;T.vel.x+=M/C*N,T.vel.y+=S/C*N,!T.moving&&!T.finished&&(T.moving=!0),T.hitFlash=1}}else if(p.type==="hole"){if(a.shield){a.shield=!1;let T=a.pos.x-p.x,M=a.pos.y-p.y,S=Math.hypot(T,M);S<1e-4&&(T=-a.vel.x,M=-a.vel.y,S=Math.hypot(T,M)||1);const C=T/S,N=M/S,_=p.r+a.radius*.55+.08;a.pos.x=p.x+C*_,a.pos.y=p.y+N*_;const w=a.vel.x*C+a.vel.y*N;if(w<0){a.vel.x-=w*C,a.vel.y-=w*N;const L=-N,I=C,j=a.vel.x*L+a.vel.y*I>=0?1:-1;a.vel.x+=L*j*Math.abs(w)*.6,a.vel.y+=I*j*Math.abs(w)*.6}a.vel.x+=C*2.5,a.vel.y+=N*2.5,a.moving||(a.moving=!0),i.push({type:"item",capId:a.id,x:p.x,y:p.y,power:-1});continue}a.pos.x=a.cpPos.x,a.pos.y=a.cpPos.y,a.vel=he(),a.moving=!1,i.push({type:"hole",capId:a.id,x:p.x,y:p.y,power:0});break}else if(p.type==="bomb"){a.pos.x=a.cpPos.x,a.pos.y=a.cpPos.y,a.vel=he(),a.moving=!1,i.push({type:"bomb",capId:a.id,x:p.x,y:p.y,power:0});break}else p.type==="bonus"?!a.consumed.has(b)&&!a.takenBonus.has(b)&&(a.consumed.add(b),a.takenBonus.add(b),i.push({type:"bonus",capId:a.id,x:p.x,y:p.y,power:0,obsIdx:b,n:p.n||1})):p.type==="item"&&(a.consumed.has(b)||(a.consumed.add(b),i.push({type:"item",capId:a.id,x:p.x,y:p.y,power:0,obsIdx:b})))}}if(a.moving){if(e.surfaceAt(a.pos)==="out"){if(a.shield){a.shield=!1,a.pos.x=o.x,a.pos.y=o.y,a.vel=he(),a.moving=!1,i.push({type:"item",capId:a.id,x:o.x,y:o.y,power:-1});continue}a.pos.x=a.resetTo.x,a.pos.y=a.resetTo.y,a.vel=he(),a.moving=!1,i.push({type:"out",capId:a.id,x:o.x,y:o.y,power:0});continue}if(a.progress>e.total*.72&&e.crossedFinish(o,a.pos)){a.finished=!0,a.vel=he(),a.moving=!1,i.push({type:"finish",capId:a.id,x:a.pos.x,y:a.pos.y,power:0});continue}a.progress=e.progressOf(a.pos),on(a.vel)<Jv&&(a.vel=he(),a.moving=!1,i.push({type:"rest",capId:a.id,x:a.pos.x,y:a.pos.y,power:0}))}}return Eb(n,i),i}function Eb(n,e){for(let t=0;t<n.length;t++)for(let i=t+1;i<n.length;i++){const s=n[t],a=n[i];if(s.finished||a.finished||s.ghost||a.ghost)continue;const o=a.pos.x-s.pos.x,r=a.pos.y-s.pos.y,l=s.radius+a.radius,c=o*o+r*r;if(c>l*l||c<1e-6)continue;const h=Math.sqrt(c),d=o/h,u=r/h,f=l-h,g=Math.pow(s.stats.weight,1.6),b=Math.pow(a.stats.weight,1.6),p=g+b;s.pos.x-=d*f*(b/p),s.pos.y-=u*f*(b/p),a.pos.x+=d*f*(g/p),a.pos.y+=u*f*(g/p);const m=a.vel.x-s.vel.x,y=a.vel.y-s.vel.y,v=m*d+y*u;if(v>0)continue;const x=.55*((s.stats.bounce+a.stats.bounce)/2),T=on(s.vel)>=on(a.vel),M=T?s.stats.power:a.stats.power,S=T?s.smash:a.smash,C=-(1+x)*v/(1/g+1/b)*M*(S?1.75:1),N=C*d,_=C*u,w=(I,B)=>(S&&B?.35:1)/I.stats.grip;s.vel.x-=N/g*w(s,T),s.vel.y-=_/g*w(s,T),a.vel.x+=N/b*w(a,!T),a.vel.y+=_/b*w(a,!T);const L=Math.abs(v);L>1.5&&(s.moving||(s.moving=!0),a.moving||(a.moving=!0),s.hitFlash=1,a.hitFlash=1,e.push({type:"capHit",capId:s.id,otherId:a.id,x:(s.pos.x+a.pos.x)/2,y:(s.pos.y+a.pos.y)/2,power:L}))}}const Yt=["cauteloso","agressivo","tecnico","caotico","rival"],Fd={cauteloso:"Cautelosa",agressivo:"Agressiva",tecnico:"Técnica",caotico:"Caótica",rival:"Rival"},dh={cauteloso:{lookahead:17,powBias:1.04,risk:1.1,outPenalty:300,spread:.16,noise:.008,rival:0,offense:0},agressivo:{lookahead:24,powBias:1.18,risk:.55,outPenalty:190,spread:.24,noise:.018,rival:.25,offense:.8},tecnico:{lookahead:21,powBias:1.1,risk:.85,outPenalty:235,spread:.18,noise:.004,rival:0,offense:.1},caotico:{lookahead:16,powBias:1.1,risk:.7,outPenalty:170,spread:.32,noise:.05,rival:.15,offense:.35},rival:{lookahead:22,powBias:1.16,risk:.72,outPenalty:225,spread:.2,noise:.009,rival:.6,offense:1}};function uh(n){return{...n,pos:he(n.pos.x,n.pos.y),vel:he(),z:0,vz:0,airborne:!1,cpPos:he(n.cpPos.x,n.cpPos.y),turnStart:he(n.turnStart.x,n.turnStart.y),resetTo:he(n.pos.x,n.pos.y),preFlick:he(n.pos.x,n.pos.y),consumed:new Set,takenBonus:new Set(n.takenBonus),stats:{...n.stats},moving:!1,finished:!1}}function Tb(n,e,t,i,s){const a=uh(n);a.resetTo=he(n.pos.x,n.pos.y);const o=t.surfaceAt(n.pos)==="gum"?Cd:1;a.vel=Bc(sn(i),Math.max(.06,Math.min(1,s))*zc*o),a.moving=!0;const r=[a];for(const T of e){if(T.id===n.id||T.finished)continue;const M=uh(T);r.push(M)}let l=!1,c=!1,h=!1,d=!1,u=!1,f=0,g=0,b=0,p=n.progress;const m=new Set,y=1/120;let v=0;for(;Nd(r)&&v<700;){const T=Ud(r,t,y);for(const M of T)M.capId===a.id?M.type==="out"?l=!0:M.type==="hole"?c=!0:M.type==="bomb"?h=!0:M.type==="finish"?d=!0:M.type==="bonus"?f+=M.n||1:M.type==="item"?g+=1:M.type==="ramp"?u=!0:M.type==="wall"&&b++:(M.type==="out"||M.type==="hole"||M.type==="bomb")&&m.add(M.capId);a.progress>p&&(p=a.progress),v++}const x=t.nearest(a.pos);return{endProg:a.progress,maxProg:p,out:l,holed:c,bombed:h,finished:d,jumped:u,dEdge:Math.max(0,x.d-x.half*.45),endPos:he(a.pos.x,a.pos.y),bonus:f,item:g,oppHarm:m.size,walls:b,gumEnd:t.surfaceAt(a.pos)==="gum"}}function Ab(n,e,t,i){let s;return n.out?s=e.progress-t.outPenalty+(n.maxProg-e.progress)*.12:s=n.endProg-n.dEdge*t.risk*2.4,n.holed&&(s-=90),n.bombed&&(s-=120),s+=n.bonus*22,s+=n.item*20,s-=Math.min(n.walls,4)*3,n.gumEnd&&!n.finished&&(s-=9),!n.out&&!n.finished&&n.endProg<=e.progress+.5&&n.walls>0&&(s-=25),n.jumped&&(s+=10),n.finished&&(s+=500),n.oppHarm>0&&t.offense>0&&n.endProg>=e.progress-1&&(s+=n.oppHarm*t.offense*90),e.stuckTurns>=2&&!n.out&&!n.holed&&!n.bombed&&(s+=Math.min(14,Td(n.endPos,e.pos))*4),s}const ms=(n,e)=>({x:n.x*Math.cos(e)-n.y*Math.sin(e),y:n.x*Math.sin(e)+n.y*Math.cos(e)});function Od(n,e,t){const i=n.ai||"tecnico",s=dh[i]||dh.tecnico,a=t.total,o=t.atArc(n.progress).tan,r=t.atArc(Math.min(a,n.progress+4)).p,l=t.atArc(Math.min(a,n.progress+s.lookahead)).p,c=on(un(r,n.pos))<.4?o:sn(un(r,n.pos)),h=on(un(l,n.pos))<.4?o:sn(un(l,n.pos));let d=null;if(s.rival>0||s.offense>0){let L=18;for(const I of e){if(I.id===n.id||I.finished)continue;const B=Td(n.pos,I.pos);B<L&&I.progress>n.progress-8&&(d=I,L=B)}}const u=t.atArc(Math.min(a,n.progress+9)),f={x:-u.tan.y,y:u.tan.x},g=sn(un({x:u.p.x+f.x*2.7,y:u.p.y+f.y*2.7},n.pos)),b=sn(un({x:u.p.x-f.x*2.7,y:u.p.y-f.y*2.7},n.pos));let p={dir:c,power:.2,s:-1e9},m=null;const y=(L,I)=>{const B=Math.max(.06,Math.min(1,I)),j=Tb(n,e,t,L,B),F=Ab(j,n,s);F>p.s&&(p={dir:L,power:B,s:F},m=j)},v=[8,13,s.lookahead,s.lookahead+6],x=[o,c,h,g,b];for(const L of v){const I=t.atArc(Math.min(a,n.progress+L)).p,B=on(un(I,n.pos))<.4?o:sn(un(I,n.pos));x.push(B)}const T=s.spread,M=[0,T*.45,-T*.45],S=[.26,.42,.56,.7,.84,1];for(const L of x)for(const I of M){const B=ms(L,I);for(const j of S)y(B,j*s.powBias)}for(const L of[3.5,7,12]){const I=t.atArc(Math.min(a,n.progress+L)),B={x:-I.tan.y,y:I.tan.x},j=t.nearest(I.p).half;for(const F of[-.72,-.38,.38,.72]){const Q={x:I.p.x+B.x*j*F,y:I.p.y+B.y*j*F},K=on(un(Q,n.pos))<.4?o:sn(un(Q,n.pos));for(const me of[.3,.5,.72])y(K,me)}}for(const L of t.def.obstacles){if(L.type!=="jump")continue;const I=t.progressOf(he(L.x,L.y));if(I>n.progress+1&&I<n.progress+28){const B=sn(un(he(L.x,L.y),n.pos));for(const j of[.72,.86,1])y(B,j)}}for(let L=0;L<t.def.obstacles.length;L++){const I=t.def.obstacles[L];if(I.type!=="item"&&I.type!=="bonus"||I.type==="bonus"&&n.takenBonus.has(L))continue;const B=t.progressOf(he(I.x,I.y));if(B>n.progress-3&&B<n.progress+s.lookahead+6){const j=sn(un(he(I.x,I.y),n.pos));for(const F of[.35,.5,.65,.8])y(j,F)}}if(n.progress>a-(s.lookahead+14)){const L=t.atArc(a).p,I=sn(un(L,n.pos));for(const B of M)for(const j of[.6,.75,.9,1])y(ms(I,B),j)}if(d&&s.offense>.4){const L=sn(un(d.pos,n.pos));for(const I of[.6,.8,1])y(L,I)}{const L=p.dir,I=p.power;for(const F of[.04,-.04,.09,-.09])for(const Q of[0,.06,-.06])y(ms(L,F),I+Q);for(const F of[.03,-.03,.07,-.07])y(L,I+F);const B=p.dir,j=p.power;for(const F of[.02,-.02,.05,-.05])for(const Q of[0,.025,-.025])y(ms(B,F),j+Q)}if(!m||m.out||m.holed||m.bombed||m.endProg<=n.progress+.6)for(let L=0;L<24;L++){const I=L/24*Math.PI*2,B={x:Math.cos(I),y:Math.sin(I)};for(const j of[.14,.24,.38,.55])y(B,j)}if(n.stuckTurns>=2){for(let L=0;L<24;L++){const I=L/24*Math.PI*2,B={x:Math.cos(I),y:Math.sin(I)};for(const j of[.3,.55,.8,1])y(B,j)}for(let L=0;L<14;L++)y(ms(h,(Math.random()-.5)*2.4),.2+Math.random()*.8)}const N=(Math.random()-.5)*s.noise*2.2,_=ms(p.dir,N),w=Math.max(.06,Math.min(1,p.power*(1+(Math.random()-.5)*s.noise)));return{dir:_,power:w}}const Cb=2,ri={raio:{id:"raio",name:"Raio",ico:"⚡",desc:"Manda o líder de volta pro checkpoint dele",tier:5,kind:"now",needsAhead:!0},troca:{id:"troca",name:"Troca-Troca",ico:"🔁",desc:"Troca de lugar com quem está logo à sua frente",tier:5,kind:"now",needsAhead:!0},furacao:{id:"furacao",name:"Furacão",ico:"🌪️",desc:"Sopra TODOS os rivais alguns passos pra trás",tier:4,kind:"now"},chuva:{id:"chuva",name:"Chuvinha",ico:"🌧️",desc:"Deixa uma poça d’água no caminho do líder",tier:4,kind:"now",needsAhead:!0},ancora:{id:"ancora",name:"Âncora",ico:"⚓",desc:"O próximo peteléco do líder sai fraquinho",tier:4,kind:"now",needsAhead:!0},gude:{id:"gude",name:"Bola de Gude",ico:"🔮",desc:"Acerta o rival mais próximo e derruba ele pra trás",tier:3,kind:"now",needsAhead:!0},cola:{id:"cola",name:"Chiclete",ico:"🫠",desc:"Larga um chiclete atrás de você — quem pisar, gruda",tier:2,kind:"now"},foguete:{id:"foguete",name:"Foguete",ico:"🚀",desc:"Próximo peteléco com muito mais alcance",tier:4,kind:"arm"},salto:{id:"salto",name:"Salto",ico:"✨",desc:"Pula um trecho pra frente na pista",tier:4,kind:"now"},ima:{id:"ima",name:"Ímã",ico:"🧲",desc:"Cola no centro e empurra de leve pra frente",tier:2,kind:"now"},turbo:{id:"turbo",name:"Turbinho",ico:"💨",desc:"Empurrãozinho pra frente no próximo peteléco",tier:1,kind:"arm"},fantasma:{id:"fantasma",name:"Fantasma",ico:"👻",desc:"Próximo peteléco ATRAVESSA tampinhas e obstáculos",tier:4,kind:"arm"},pancada:{id:"pancada",name:"Pancada",ico:"🥊",desc:"Próximo peteléco: trombadas jogam os outros LONGE",tier:3,kind:"arm"},extra:{id:"extra",name:"Peteléco +1",ico:"➕",desc:"Ganha um peteléco extra nesta vez",tier:3,kind:"now"},escudo:{id:"escudo",name:"Escudo",ico:"🛡️",desc:"Anula 1 buraco ou queda — você desvia pela beirada",tier:3,kind:"now"}},ur=Object.keys(ri);function Rb(n,e,t=Math.random){const i=Math.max(0,Math.min(1,n)),s={};for(const r of ur){const c=(ri[r].tier-1)/4;let h=(1-c)*(1-i)+c*i;h=.12+h*h*1.6,ri[r].needsAhead&&e&&(h=0),s[r]=h}let a=0;for(const r of ur)a+=s[r];let o=t()*a;for(const r of ur)if(!(s[r]<=0)&&(o-=s[r],o<=0))return r;return"turbo"}class Pb{constructor(){this.caps=[],this.current=0,this.phase="aim",this.finishOrder=[],this.turnNo=0,this.onEvent=()=>{},this.onChange=()=>{},this.onToast=()=>{},this.onFlick=()=>{},this.onCheckpoint=()=>{},this.acc=0,this.aiTimer=0,this.aiFired=!1,this.lastFlickOut=!1,this.manualControl=!1,this.cpArcs=[],this.flickCount=0,this.chaos=!1,this.teams=0,this.onItem=()=>{}}setup(e,t){const i={...e,obstacles:e.obstacles.map(d=>({...d})),patches:e.patches.slice()};this.track=new Pd(i),this.caps=t.map((d,u)=>{const f=et(d.skin),g=Kv(u,d.name,d.skin,{...jv,...f.stats,...d.stats||{}},d.isAI,d.ai);return g.team=d.team??-1,g}),this.teams=t.some(d=>(d.team??-1)>=0)?new Set(t.map(d=>d.team??-1)).size:0;const s=e.start,a=e.startAngle,o={x:Math.cos(a),y:Math.sin(a)},r={x:-Math.sin(a),y:Math.cos(a)},l=e.half[0],c=this.caps.length,h=c>1?Math.min(1.95,2*(l-1)/(c-1)):0;this.caps.forEach((d,u)=>{const f=(u-(c-1)/2)*h,g=1.2;d.pos=he(s.x+o.x*g+r.x*f,s.y+o.y*g+r.y*f),d.cpPos=he(d.pos.x,d.pos.y),d.turnStart=he(d.pos.x,d.pos.y),d.progress=this.track.progressOf(d.pos),d.checkpoint=0}),this.cpArcs=this.track.def.checkpoints.map(d=>this.track.progressOf(he(d.x,d.y))),this.finishOrder=[],this.current=0,this.turnNo=1,this.phase="aim",this.flickCount=0,this.beginTurn(!0),this.onChange()}activeCap(){return this.caps[this.current]}beginTurn(e=!1){if(!e)for(const s of this.track.def.obstacles)s.type==="mill"&&(s.ph=(s.ph||0)+1,s.dir=(s.dir||0)+(s.ph%2?.9:-.9));let t=0;for(;t++<this.caps.length+2;){const s=this.caps[this.current];if(!s)break;if(s.finished){this.advanceIndex();continue}if(s.skipTurns>0){s.skipTurns--,this.onToast(`${s.name} perdeu o turno`,"bad"),this.advanceIndex();continue}break}const i=this.caps[this.current];if(i){if(i.progress<i.lastTurnProg+.8?i.stuckTurns++:i.stuckTurns=0,i.lastTurnProg=i.progress,i.stuckTurns>=4){i.rescues>0&&i.progress>i.rescueProg+6&&(i.rescues=0);let s=2+i.rescues*8;const a=r=>{const l=this.track.atArc(Math.max(0,i.progress-r)),c=i.rescues>0?(i.rescues%2?1:-1)*this.track.nearest(l.p).half*.4:0;return he(l.p.x-l.tan.y*c,l.p.y+l.tan.x*c)};let o=a(s);for(let r=0;r<6&&this.caps.some(c=>c.id!==i.id&&!c.finished&&Math.hypot(c.pos.x-o.x,c.pos.y-o.y)<i.radius*2.4);r++)s+=2.5,o=a(s);i.pos=he(o.x,o.y),i.vel=he(),i.z=0,i.vz=0,i.airborne=!1,i.progress=this.track.progressOf(i.pos),i.stuckTurns=0,i.lastTurnProg=i.progress,i.rescues++,i.rescueProg=i.progress,this.onToast(`🛟 ${i.name} foi resgatada pra pista!`,"bad")}i.flicksLeft=3,i.bonusFlicks=0,i.special10=!1,i.consumed.clear(),i.turnStart=he(i.pos.x,i.pos.y),this.phase="aim",this.aiTimer=0,this.aiFired=!1,e||this.turnNo++,!i.isAI&&!this.manualControl&&this.onToast("Sua vez, "+i.name,"turn"),this.onChange()}}advanceIndex(){this.current=(this.current+1)%this.caps.length}rank01(e){const i=[...this.caps.filter(o=>!o.finished)].sort((o,r)=>r.progress-o.progress),s=i.indexOf(e),a=Math.max(1,i.length-1);return{r:s<0?.5:s/a,leader:s===0}}hazardAhead(e){for(const t of this.track.def.obstacles){if(t.type!=="hole"&&t.type!=="bomb")continue;const i=this.track.progressOf(he(t.x,t.y));if(i>e.progress+1&&i<e.progress+24)return!0}return!1}grantItem(e){if(e.items.length>=Cb)return!1;const{r:t,leader:i}=this.rank01(e),s=Rb(t,i);return e.items.push(s),e.itemFlash=1,e.isAI||this.onToast(`${ri[s].ico} ${ri[s].name}! toque no botão pra usar`,"good"),this.onItem(e,s,!1),!0}rivalsAhead(e){return this.caps.filter(t=>!t.finished&&t.id!==e.id&&t.progress>e.progress).sort((t,i)=>i.progress-t.progress)}knockBack(e,t){const i=Math.max(.6,e.progress-t),s=this.track.atArc(i).p;e.pos=he(s.x,s.y),e.progress=i,e.vel=he(),e.z=0,e.vz=0,e.airborne=!1,e.itemFlash=1,e.hitFlash=1}useItem(e=0,t=this.activeCap()){const i=t.items[e];if(!i)return;t.items.splice(e,1),t.itemFlash=1;const s=ri[i];switch(i){case"foguete":t.boostNext=1.7;break;case"turbo":t.boostNext=1.28;break;case"extra":t.flicksLeft+=1;break;case"escudo":t.shield=!0;break;case"pancada":t.smashNext=!0;break;case"fantasma":t.ghostNext=!0;break;case"salto":{const a=Math.min(this.track.total-1,t.progress+15),o=this.track.atArc(a).p;t.pos=he(o.x,o.y),t.progress=a,this.updateCheckpoint(t);break}case"ima":{const a=this.track.atArc(t.progress).p;t.pos=he(a.x,a.y),t.boostNext=1.18;break}case"raio":{const a=this.rivalsAhead(t)[0]||this.caps.filter(o=>!o.finished&&o.id!==t.id).sort((o,r)=>r.progress-o.progress)[0];a&&(a.pos=he(a.cpPos.x,a.cpPos.y),a.progress=this.track.progressOf(a.cpPos),a.vel=he(),a.itemFlash=1,this.onToast(`⚡ ${a.name} levou um raio!`,"bad"));break}case"gude":{const a=this.rivalsAhead(t),o=a.length?a[a.length-1]:null;o&&(this.knockBack(o,9),this.onToast(`🔮 ${o.name} levou uma bolada!`,"bad"));break}case"troca":{const a=this.rivalsAhead(t),o=a.length?a[a.length-1]:null;if(o){const r=he(t.pos.x,t.pos.y),l=t.progress;t.pos=he(o.pos.x,o.pos.y),t.progress=o.progress,o.pos=r,o.progress=l,o.vel=he(),t.vel=he(),o.itemFlash=1,this.updateCheckpoint(t),this.onToast(`🔁 trocou de lugar com ${o.name}!`,"good")}break}case"furacao":{for(const a of this.caps)!a.finished&&a.id!==t.id&&this.knockBack(a,6);this.onToast("🌪️ o furacão varreu a pista!","good");break}case"chuva":{const a=this.rivalsAhead(t)[0];if(a){const o=Math.min(this.track.total-1,a.progress+3.2),r=this.track.atArc(o).p;this.track.def.patches.push({surface:"water",x:r.x,y:r.y,r:2}),this.onToast(`🌧️ choveu na frente de ${a.name}!`,"good"),this.onEvent({type:"balloon",capId:t.id,x:r.x,y:r.y,power:-2})}break}case"ancora":{const a=this.rivalsAhead(t)[0];a&&(a.anchored=!0,a.itemFlash=1,this.onToast(`⚓ ${a.name} tá com a âncora!`,"bad"));break}case"cola":{const a=Math.max(.6,t.progress-2.5),o=this.track.atArc(a).p;this.track.def.patches.push({surface:"gum",x:o.x,y:o.y,r:1.5}),this.onToast("🫠 chiclete no chão — quem pisar, gruda!","good");break}}!t.isAI&&s.needsAhead!==!0&&this.onToast(`${s.ico} ${s.name}!`,"good"),this.onItem(t,i,!0),this.onChange()}canFlick(){return this.phase==="aim"&&this.activeCap().flicksLeft>0}flick(e,t){if(!this.canFlick())return;const i=this.activeCap(),s=i.boostNext;i.boostNext=1;const a=i.anchored?.55:1;i.anchored=!1,i.smash=i.smashNext,i.smashNext=!1,i.ghost=i.ghostNext,i.ghostNext=!1;const o=this.track.surfaceAt(i.pos)==="gum"?Cd:1,r=sn(e),l=Math.max(.06,Math.min(1,t))*zc*s*a*o;i.preFlick=he(i.pos.x,i.pos.y);for(const c of this.caps){if(c.id===i.id){c.resetTo=he(i.preFlick.x,i.preFlick.y);continue}const h=Math.max(.6,c.progress-16),d=this.track.atArc(h).p;c.resetTo=he(d.x,d.y)}i.z=0,i.vz=0,i.airborne=!1,i.vel=Bc(r,l),i.moving=!0,this.lastFlickOut=!1,this.flickCount++,this.phase="resolve",this.acc=0,this.onFlick(i,t),this.onChange()}update(e){if(this.phase==="over")return;if(this.phase==="aim"){if(this.manualControl)return;const s=this.activeCap();if(s.isAI){if(this.aiTimer+=e,this.chaos&&s.items.length&&this.aiTimer>.4&&this.aiTimer<.45){const a=s.items.findIndex(o=>o==="escudo"?this.hazardAhead(s):ri[o].needsAhead?this.rivalsAhead(s).length>0:!0);a>=0&&this.useItem(a,s)}if(!this.aiFired&&this.aiTimer>.85){this.aiFired=!0;const a=Od(s,this.caps,this.track);this.flick(a.dir,a.power)}}return}this.acc+=e;const t=1/120;let i=0;for(;this.acc>=t&&i<12;){const s=Ud(this.caps,this.track,t);for(const a of s)this.handleEvent(a);if(this.acc-=t,i++,this.phase==="over")return}Nd(this.caps)||this.endFlick()}handleEvent(e){const t=this.caps[e.capId];switch(e.type){case"bonus":t.bonusFlicks+=e.n||1,this.onToast(`+${e.n} peteléco${(e.n||1)>1?"s":""}!`,"good");break;case"hole":t.holed=!0,this.onToast(`${t.name} caiu no buraco — checkpoint`,"bad");break;case"bomb":t.bombed=!0,this.onToast(`${t.name} pisou no X — perdeu a vez`,"bad");break;case"out":t.id===this.current&&(this.lastFlickOut=!0),this.onToast(`${t.name} saiu da pista!`,"bad");break;case"ramp":t.id===this.current&&this.onToast("Voou! 🚀","good");break;case"top":t.id===this.current&&this.onToast("🪀 o pião rebateu!","bad");break;case"band":t.id===this.current&&this.onToast("🪃 estilingue!","good");break;case"car":{if(e.obsIdx!=null){const i=this.track.def.obstacles[e.obsIdx];if(i&&i.type==="car"){const s=i.dir||0,a=Math.cos(s),o=Math.sin(s),r=10+(e.power||0)*.4;let l=i.x,c=i.y,h=0;for(;h<r;){const d=l+a*.5,u=c+o*.5;if(this.track.surfaceAt(he(d,u))==="out")break;l=d,c=u,h+=.5;for(const f of this.caps){if(f.finished)continue;const g=f.pos.x-l,b=f.pos.y-c,p=Math.hypot(g,b);if(p<1.6){const m=Math.max(.001,p);f.vel.x+=a*9+g/m*4,f.vel.y+=o*9+b/m*4,f.moving=!0,f.itemFlash=1}}}i.x=l,i.y=c,this.onToast("🚗 o carrinho disparou!","bad")}}break}case"balloon":{if(e.obsIdx!=null){const i=this.track.def.obstacles[e.obsIdx];i&&!i.popped&&(i.popped=!0,this.track.def.patches.push({surface:"water",x:i.x,y:i.y,r:1.7}),this.onToast("💦 SPLASH! A bexiga estourou!","bad"))}break}case"item":e.power===-1?(t.itemFlash=1,this.onToast(`🛡️ ${t.name} — escudo salvou!`,"good")):!this.grantItem(t)&&e.obsIdx!=null&&t.consumed.delete(e.obsIdx);break;case"finish":this.onFinish(t);break}this.updateCheckpoint(t),this.onEvent(e)}updateCheckpoint(e){const t=this.cpArcs;let i=-1;for(let s=e.checkpoint+1;s<t.length&&e.progress+.3>=t[s];s++){e.checkpoint=s;const a=this.track.atArc(t[s]).p;e.cpPos=he(a.x,a.y),i=s}i>0&&(this.onCheckpoint(e,i),e.isAI||this.onToast("Checkpoint "+i+" ✓","turn"))}onFinish(e){this.finishOrder.includes(e)||(e.finished=!0,e.airborne=!1,e.z=0,this.finishOrder.push(e),e.place=this.finishOrder.length,this.onToast(`${e.name} chegou em ${e.place}º! 🏁`,e.place===1?"good":"turn"),this.finishOrder.length>=Math.max(1,this.caps.length-1)&&this.finishRace())}finishRace(){const e=this.caps.filter(i=>!i.finished).sort((i,s)=>s.progress-i.progress);let t=this.finishOrder.length;for(const i of e)i.place=++t;this.phase="over",this.onChange()}endFlick(){const e=this.activeCap();if(e.smash=!1,e.ghost=!1,e.finished){this.advanceIndex(),this.beginTurn();return}e.flicksLeft-=1,e.holed&&(e.holed=!1,e.flicksLeft-=1),e.bombed&&(e.bombed=!1,e.flicksLeft=0),e.bonusFlicks>0&&(e.flicksLeft+=e.bonusFlicks,e.bonusFlicks=0),e.flicksLeft=Math.max(0,Math.min(e.flicksLeft,9)),e.flicksLeft>1&&(e.turnStart=he(e.pos.x,e.pos.y)),e.flicksLeft<=0?(this.advanceIndex(),this.beginTurn()):(this.phase="aim",this.aiTimer=0,this.aiFired=!1,this.onChange())}standings(){return[...this.caps].sort((e,t)=>(e.finished?e.place:999-e.progress/1e3,t.finished?t.place:999-t.progress/1e3,e.finished&&t.finished?e.place-t.place:e.finished?-1:t.finished?1:t.progress-e.progress))}winner(){return this.finishOrder[0]||null}snapshot(){return{cur:this.current,tn:this.turnNo,ph:this.phase,fc:this.flickCount,fin:this.finishOrder.map(e=>e.id),caps:this.caps.map(e=>({i:e.id,x:e.pos.x,y:e.pos.y,pr:e.progress,cp:e.checkpoint,cx:e.cpPos.x,cy:e.cpPos.y,tx:e.turnStart.x,ty:e.turnStart.y,fl:e.flicksLeft,bf:e.bonusFlicks,sk:e.skipTurns,fn:e.finished,pl:e.place,ai:e.isAI}))}}applySnapshot(e){if(!(!e||!e.caps)){this.current=e.cur,this.turnNo=e.tn,this.phase=e.ph,typeof e.fc=="number"&&(this.flickCount=e.fc);for(const t of e.caps){const i=this.caps[t.i];i&&(i.pos.x=t.x,i.pos.y=t.y,i.vel.x=0,i.vel.y=0,i.z=0,i.vz=0,i.airborne=!1,i.moving=!1,i.progress=t.pr,i.checkpoint=t.cp,i.cpPos=he(t.cx,t.cy),i.turnStart=he(t.tx,t.ty),i.flicksLeft=t.fl,i.bonusFlicks=t.bf,i.skipTurns=t.sk,i.finished=t.fn,i.place=t.pl,i.isAI=t.ai)}this.finishOrder=(e.fin||[]).map(t=>this.caps[t]).filter(Boolean),this.phase,this.onChange()}}}function Bd(n){return()=>{n|=0,n=n+1831565813|0;let e=Math.imul(n^n>>>15,1|n);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}const ti=["Fácil","Médio","Difícil","Muito Difícil","Extrema"],Ws=["#3fae6a","#3b82f6","#f2b100","#e5762a","#e5484d"],cc=[{key:"quintal",ground:"dirt",bg:"#6f5334",wall:"#6b4e2e",patch:["sand","mud","grass"],decor:["twig","leaf","pebble","grass"],names:["Quintal do Zé","Terra Batida","Fundo de Quintal","Chão de Terra"],heroes:["bucketzinc","bone","fencebit","wateringcan"]},{key:"praia",ground:"sand",bg:"#d9b877",wall:"#c9a35f",patch:["water","ramp","cardboard"],decor:["shell","starfish","castle","pebble"],names:["Praia da Tarde","Areia Fofa","Beira-Mar","Duna do Sol"],heroes:["beachumbrella","beachball","flipflop","sunscreen"]},{key:"calcada",ground:"sidewalk",bg:"#9a9488",wall:"#8f8879",patch:["chalk","cardboard","gum"],decor:["chalk","toy","pebble"],names:["Calçada de Giz","Rua de Baixo","Passeio","Meio-Fio"],heroes:["toycar","chalkset","sodacup"]},{key:"garagem",ground:"cardboard",bg:"#7d6a4e",wall:"#a9773f",patch:["sidewalk","magnet","sand"],decor:["box","tape","pencil"],names:["Garagem","Papelão & Fita","Depósito","Oficina"],heroes:["paintcan","wrench","tirestack","toycar"]},{key:"parquinho",ground:"dirt",bg:"#414c36",wall:"#5c4a2c",patch:["water","mud","water","grass"],decor:["leaf","grass","pebble"],names:["Parquinho Molhado","Lamaçal","Depois da Chuva","Poça & Folha"],paint:"wetdirt",patchN:[5,7],heroes:["toyshovel","beachball","bucketzinc"]},{key:"cozinha",ground:"cardboard",bg:"#c8b48c",wall:"#c05a5a",patch:["sidewalk","water","ice"],decor:["cup","coin","eraser","straw"],names:["Mesa da Cozinha","Hora do Café","Toalha Xadrez","Bancada"],paint:"gingham",heroes:["saltshaker","mugcoffee","plate","apple","cuttingboard","napkinfold"]},{key:"jardim",ground:"dirt",bg:"#3f5a2e",wall:"#5a7a3a",patch:["grass","grass","mud","water"],decor:["grass","leaf","twig","pebble"],names:["Jardim da Vó","Canteiro","Grama & Terra","Horta"],paint:"garden",patchN:[5,7],heroes:["wateringcan","flowerpot","mushroom","fencebit"]},{key:"deserto",ground:"sand",bg:"#c98f4a",wall:"#a6702f",patch:["ramp","vortex","water"],decor:["pebble","twig","starfish"],names:["Deserto","Dunas","Sol a Pino","Areião"],paint:"dunes",heroes:["cactus","drybush","oldtire"]},{key:"obra",ground:"sidewalk",bg:"#7e786a",wall:"#8a8070",patch:["sand","cardboard","push"],decor:["box","pencil","pebble"],names:["Canteiro de Obra","Entulho","Cimento","Andaime"],paint:"cement",heroes:["brickpile","helmet","paintcan","oldtire"]},{key:"laje",ground:"sidewalk",bg:"#8f9aa0",wall:"#7a848a",patch:["cardboard","chalk","ice"],decor:["toy","pebble","tape"],names:["Laje","Terraço","Cobertura","Varal"],paint:"slab",heroes:["watertank","clothesline","flowerpot"]},{key:"piscina",ground:"sidewalk",bg:"#4a90b8",wall:"#cfe4ee",patch:["water","ice","vortex"],decor:["pebble","coin","toy"],names:["Borda da Piscina","Deck Molhado","Área de Lazer","Prainha"],paint:"tiles",heroes:["floatring","flipflop","sunscreen","beachball"]},{key:"feira",ground:"cardboard",bg:"#a88f5c",wall:"#8a6238",patch:["sidewalk","chalk"],decor:["box","coin","tape","cup"],names:["Feira Livre","Barraca","Calçadão","Mercadão"],paint:"stripes",heroes:["fruitcrate","beachumbrella","sodacup"]},{key:"estrada",ground:"dirt",bg:"#7e4a30",wall:"#4a3a24",patch:["mud","mud","sand"],decor:["pebble","twig","grass"],names:["Estrada de Barro","Trilha","Rua sem Asfalto","Beira da Roça"],paint:"clay",patchN:[4,6],heroes:["roadsign","oldtire","fencebit","drybush"]},{key:"varanda",ground:"cardboard",bg:"#8a6a44",wall:"#6b4e2e",patch:["sidewalk","water"],decor:["cup","coin","leaf","pencil"],names:["Varanda","Área Coberta","Quintalzinho","Alpendre"],paint:"planks",heroes:["mugcoffee","flowerpot","bookpile","plate"]}],lc=[{key:"sinuca",ground:"felt",bg:"#1c5a38",wall:"#7a4a26",patch:["gum","chalk","water"],decor:["ball8","chalk","coin","cup"],names:["Mesa de Sinuca","Bar do Tio","Tabela Certa","Bico de Giz"],heroes:["cuestick","poolballs","bluechalk","sodacup"]},{key:"geladeira",ground:"frost",bg:"#a8c8d4",wall:"#8fb4c2",patch:["ice","water","vortex"],decor:["icecube","cup","straw","coin"],names:["Congelador","Bandeja de Gelo","Geladeira Aberta","Friozão"],heroes:["popsicle","icecreamtub","icetray"]},{key:"bancada",ground:"metal",bg:"#727c84",wall:"#4e565e",patch:["magnet","magnet","ramp","push"],decor:["bolt","pencil","tape","box"],names:["Bancada da Oficina","Parafuso Solto","Ferramentaria","Aço Liso"],heroes:["hammer","screwdriver","wrench","paintcan"]},{key:"sala",ground:"carpet",bg:"#8a4a42",wall:"#6b4030",patch:["gum","cardboard","water","gum"],decor:["remote","toy","cup","eraser"],names:["Tapete da Sala","Sala de TV","Felpudo","Tarde de Domingo"],heroes:["pillow","bookpile","sock","mugcoffee","toycar"]}],fn=(n,e)=>{const t=n[Math.max(0,e-1)],i=n[Math.min(n.length-1,e+1)],s=i.x-t.x,a=i.y-t.y,o=Math.hypot(s,a)||1;return{x:s/o,y:a/o}},Vn=(n,e)=>{const t=fn(n,e);return{x:-t.y,y:t.x}},Lb=n=>{let e=0;for(let t=1;t<n.length;t++)e+=Math.hypot(n[t].x-n[t-1].x,n[t].y-n[t-1].y);return e},kb=(n,e)=>{const t=Math.cos(e),i=Math.sin(e);for(const s of n){const a=s.x*t-s.y*i,o=s.x*i+s.y*t;s.x=a,s.y=o}},Db=[{half:4.3,open:.05,len:330,holes:[1,2],bombs:[0,1],stones:[5,7],bonus:[2,3],ramps:[1,2],chi:[1,2],gates:[1,2],gate:3.2,slalom:[1,1]},{half:4.1,open:.24,len:420,holes:[2,3],bombs:[0,1],stones:[3,5],bonus:[2,4],ramps:[1,3],chi:[2,2],gates:[2,2],gate:3,slalom:[1,2]},{half:4,open:.5,len:510,holes:[2,4],bombs:[1,2],stones:[4,6],bonus:[2,4],ramps:[2,3],chi:[2,3],gates:[2,3],gate:2.8,slalom:[2,2]},{half:3.9,open:.72,len:600,holes:[3,5],bombs:[1,2],stones:[6,9],bonus:[2,3],ramps:[2,4],chi:[2,3],gates:[2,3],gate:2.6,slalom:[2,2]},{half:3.8,open:.9,len:690,holes:[3,6],bombs:[1,2],stones:[5,8],bonus:[1,3],ramps:[2,4],chi:[3,4],gates:[3,3],gate:2.5,slalom:[2,3]}];function Ib(n,e,t,i,s){const a=t(7,14),o=e(.18,.46),r=e(.8,1.4),l=e(.8,1.4),c=e(.78,.92),h=n()*6.283,d=[];for(let y=0;y<a;y++)d.push(1+(n()*2-1)*o);const u=y=>{let v=y/(2*Math.PI)*a;v=(v%a+a)%a;const x=Math.floor(v),T=v-x,M=d[(x-1+a)%a],S=d[x%a],C=d[(x+1)%a],N=d[(x+2)%a],_=.5*(2*S+(-M+C)*T+(2*M-5*S+4*C-N)*T*T+(-M+3*S-3*C+N)*T*T*T);return Math.max(.35,_)},f=60,g=Math.max(200,Math.round(i/2.2)),b=c*2*Math.PI,p=[];for(let y=0;y<=g;y++){const v=h+y/g*b,x=u(v)*f;p.push(he(r*x*Math.cos(v),l*x*Math.sin(v)))}const m=i/Lb(p);for(const y of p)y.x*=m,y.y*=m;return p}function Nb(n,e,t){const i=Bd(n*7919+e*131+t*17+1),s=(k,z)=>Math.floor(k+i()*(z-k+1)),a=(k,z)=>k+i()*(z-k),o=t*3+e*7+n,r=o%5===2?lc[(e*2+(t>4?1:0))%lc.length]:cc[o%cc.length],l=Db[e],c=l.half*a(.92,1.08),h=l.len*a(.9,1.1),d=Ib(i,a,s,h);kb(d,i()*6.283);const u=c+5;let f=1/0,g=1/0,b=-1/0,p=-1/0;for(const k of d)k.x<f&&(f=k.x),k.y<g&&(g=k.y),k.x>b&&(b=k.x),k.y>p&&(p=k.y);for(const k of d)k.x+=u-f,k.y+=u-g;const m=Math.ceil(b-f+2*u),y=Math.ceil(p-g+2*u),v=d,x=v.length,T=[0];let M=0;for(let k=1;k<x;k++)M+=Math.hypot(v[k].x-v[k-1].x,v[k].y-v[k-1].y),T.push(M);const S=M,C=k=>{let z=1;for(;z<x-1&&T[z]<k;)z++;const $=T[z]-T[z-1]||1,O=(k-T[z-1])/$;return{p:he(v[z-1].x+(v[z].x-v[z-1].x)*O,v[z-1].y+(v[z].y-v[z-1].y)*O),i:z}},N=(k,z=0)=>{const{p:$,i:O}=C(k),te=Vn(v,O);return he($.x+te.x*z,$.y+te.y*z)},_=new Array(x).fill(0);for(let k=1;k<x-1;k++){const z=fn(v,k-1),$=fn(v,k+1);let O=z.x*$.x+z.y*$.y;O=O<-1?-1:O>1?1:O;const te=T[Math.min(x-1,k+1)]-T[Math.max(0,k-1)]||1;_[k]=Si(Math.acos(O)/te/.22,0,1)}const w=new Array(x).fill(0);for(let k=0;k<x;k++){let z=0,$=0;for(let O=-3;O<=3;O++){const te=k+O;te>=0&&te<x&&(z+=_[te],$++)}w[k]=z/$}const L=[];for(let k=0;k<x;k++){let z=c+Math.sin(T[k]*.05)*.3;T[k]<13&&(z=Math.max(z,c+3.2*(1-T[k]/13))),S-T[k]<8&&(z+=.9),z*=1+.45*w[k],L.push(z)}const I=[],B=3,j=k=>k<10||S-k<9;for(let k=B;k<x;k+=B){const z=k-B,$=l.open*(1-.85*w[k]);if(i()<$&&!j(T[k]))continue;const O=Vn(v,z),te=Vn(v,k);I.push({a:he(v[z].x+O.x*L[z],v[z].y+O.y*L[z]),b:he(v[k].x+te.x*L[k],v[k].y+te.y*L[k])}),I.push({a:he(v[z].x-O.x*L[z],v[z].y-O.y*L[z]),b:he(v[k].x-te.x*L[k],v[k].y-te.y*L[k])})}const F=[],Q=[],K=[],me=[he(v[0].x,v[0].y)],ge=[];ge.push({x:v[0].x,y:v[0].y,r:c+3.6});const Ae=s(4,7),je=[];for(let k=1;k<=Ae;k++){const z=S*k/(Ae+1);je.push(z),me.push(N(z))}const Ke=s(l.ramps[0],l.ramps[1]);for(let k=0;k<Ke;k++){const z=a(.1,.9)*S,{i:$}=C(z),O=fn(v,$),te=i()<.4?0:(i()<.5?-1:1)*a(c*.3,c*.62),ce=N(z,te);Q.push({surface:"ramp",x:ce.x,y:ce.y,r:a(1.5,2),dir:Math.atan2(O.y,O.x)})}const ee=r.patchN||[3,5];for(let k=0;k<s(ee[0],ee[1]);k++){const z=a(.06,.94)*S,$=N(z,a(-c*.35,c*.35)),O=r.patch[s(0,r.patch.length-1)],{i:te}=C(z),ce=fn(v,te);if(O==="ramp"||O==="push"){Q.push({surface:O,x:$.x,y:$.y,r:a(1.5,2),dir:Math.atan2(ce.y,ce.x)+(O==="push"?Math.PI:0)});continue}const ue=O==="water"?Math.atan2(ce.y,ce.x)+a(-.6,.6):void 0;i()<.45&&O!=="magnet"&&O!=="vortex"&&O!=="gum"?Q.push({surface:O,x:$.x,y:$.y,hw:c*a(.5,.85),hh:c*a(.85,1.4),dir:ue}):Q.push({surface:O,x:$.x,y:$.y,r:c*a(.7,1.1)*(O==="gum"?.44:1),dir:ue})}const ae=[...je],Te=k=>ae.every(z=>Math.abs(z-k)>14),ye=(k,z,$)=>{const O=N(k,z);$(O),ae.push(k)};for(let k=0,z=0;k<s(l.holes[0],l.holes[1])&&z<40;z++){const $=a(.1,.94)*S;Te($)&&(ye($,(i()<.5?-1:1)*a(c*.32,c*.62),O=>F.push({type:"hole",x:O.x,y:O.y,r:a(1,1.4)})),k++)}for(let k=0,z=0;k<s(l.bombs[0],l.bombs[1])&&z<30;z++){const $=a(.14,.92)*S;Te($)&&(ye($,(i()<.5?-1:1)*a(c*.38,c*.7),O=>F.push({type:"bomb",x:O.x,y:O.y,r:.95})),k++)}for(let k=0;k<s(l.stones[0],l.stones[1]);k++){const z=a(.06,.96)*S,$=(i()<.5?-1:1)*a(c*.3,c*.75),O=N(z,$);F.push({type:"stone",x:O.x,y:O.y,r:a(.7,1.2)})}for(let k=0,z=0;k<s(l.bonus[0],l.bonus[1])&&z<40;z++){const $=a(.12,.92)*S;if(!Te($))continue;const O=i(),te=O>.88?3:O>.6?2:1,ce=i()<.5?-1:1,ue=C($).i,P=L[Math.min(x-1,ue)],re=te===3?.74:te===2?.6:.42;if(ye($,ce*P*re,V=>F.push({type:"bonus",x:V.x,y:V.y,r:1.1,n:te})),te>=2&&i()<(te===3?.8:.45)){const V=N($+3.8,ce*P*(re-.06));F.push({type:"hole",x:V.x,y:V.y,r:te===3?1.25:1}),ae.push($+3.8)}k++}const X=s(1,e>=2?3:2);for(let k=0,z=0;k<X&&z<24;z++){const $=a(.2,.85)*S;if(!Te($))continue;const{i:O}=C($),te=fn(v,O),ce=Vn(v,O),ue=i();let P,re;if(ue<.45)P=Math.atan2(te.y,te.x)+Math.PI,re=(i()<.5?-1:1)*a(c*.3,c*.62);else if(ue<.75){const J=i()<.5?1:-1;P=Math.atan2(ce.y*J,ce.x*J),re=-J*a(c*.15,c*.45)}else{const J=i()<.5?1:-1;P=Math.atan2(te.y,te.x)+Math.PI+J*.7,re=(i()<.5?-1:1)*a(c*.25,c*.6)}const V=N($,re);Q.push({surface:"push",x:V.x,y:V.y,r:a(1.5,1.9),dir:P}),ae.push($),k++}const ne=e>=3?2:1;for(let k=0;k<ne;k++){let z=-1,$=1;for(let P=0;P<18;P++){const re=a(.2,.72)*S;if(!Te(re))continue;const V=C(re).i;w[V]<$&&($=w[V],z=re)}if(z<0)continue;const{p:O,i:te}=C(z),ce=fn(v,te);F.push({type:"jump",x:O.x,y:O.y,r:1.6,dir:Math.atan2(ce.y,ce.x)});const ue=N(z+a(5.5,7.5),0);F.push({type:"hole",x:ue.x,y:ue.y,r:Math.min(2.5,c*.72)}),ae.push(z,z+6.5)}const be=k=>ae.every(z=>Math.abs(z-k)>10),Fe=s(l.chi[0],l.chi[1]);for(let k=0,z=0;k<Fe&&z<30;z++){const $=s(3,4),O=7.5,te=a(.1,.84)*S;let ce=!0;for(let ue=0;ue<$;ue++)if(!be(te+ue*O)||te+ue*O>S-14){ce=!1;break}if(ce){for(let ue=0;ue<$;ue++){const P=te+ue*O,{p:re,i:V}=C(P),J=Vn(v,V),le=L[Math.min(x-1,V)],ve=ue%2?1:-1;I.push({a:he(re.x+J.x*le*ve,re.y+J.y*le*ve),b:he(re.x+J.x*le*ve*.2,re.y+J.y*le*ve*.2)}),ae.push(P)}k++}}const Ne=s(l.gates[0],l.gates[1]);for(let k=0,z=0;k<Ne&&z<34;z++){let $=-1,O=1;for(let J=0;J<14;J++){const le=a(.12,.9)*S;if(!be(le))continue;const ve=C(le).i;w[ve]<O&&(O=w[ve],$=le)}if($<0||O>.35)continue;const{p:te,i:ce}=C($),ue=Vn(v,ce),P=L[Math.min(x-1,ce)],re=Math.max(l.gate*a(.95,1.1),2.3),V=i();if(V<.4){const J=re/2;for(const le of[1,-1])I.push({a:he(te.x+ue.x*P*le,te.y+ue.y*P*le),b:he(te.x+ue.x*J*le,te.y+ue.y*J*le)})}else if(V<.75){const J=i()<.5?1:-1,le=-P+re;I.push({a:he(te.x+ue.x*P*J,te.y+ue.y*P*J),b:he(te.x+ue.x*le*J,te.y+ue.y*le*J)})}else{const J=a(.85,1.05),le=Math.min(P-.6,re/2+J+.82+.25);for(const ve of[1,-1]){const Je=he(te.x+ue.x*le*ve,te.y+ue.y*le*ve);F.push({type:"stone",x:Je.x,y:Je.y,r:J})}}ae.push($),k++}const D=s(l.slalom[0],l.slalom[1]);for(let k=0,z=0;k<D&&z<26;z++){const $=a(.08,.88)*S,O=5.5;let te=!0;for(let ce=0;ce<3;ce++)if(!be($+ce*O)||$+ce*O>S-12){te=!1;break}if(te){for(let ce=0;ce<3;ce++){const ue=$+ce*O,{i:P}=C(ue),re=L[Math.min(x-1,P)],V=ce%2?1:-1,J=N(ue,V*re*a(.3,.42));F.push({type:"stone",x:J.x,y:J.y,r:a(.8,1.05)}),ae.push(ue)}k++}}{const k=S*a(.055,.1),z=N(k,(i()<.5?-1:1)*c*a(.3,.5));F.push({type:"stone",x:z.x,y:z.y,r:a(.8,1.05)})}{const k=S*a(.86,.9);for(let z=0;z<3;z++){const $=k+z*5;if($>S-9)break;const{i:O}=C($),te=L[Math.min(x-1,O)],ce=N($,(z%2?1:-1)*te*a(.3,.42));F.push({type:"stone",x:ce.x,y:ce.y,r:a(.75,1)}),ae.push($)}}const St=k=>ae.every(z=>Math.abs(z-k)>7),qe=s(1,e>=2?2:1);for(let k=0,z=0;k<qe&&z<40;z++){const $=a(.12,.9)*S;St($)&&(ye($,a(-.25,.25)*c,O=>F.push({type:"top",x:O.x,y:O.y,r:.95})),k++)}const Ye=s(1,e>=1?2:1);for(let k=0,z=0;k<Ye&&z<40;z++){const $=a(.15,.88)*S;if(!St($))continue;const{i:O}=C($),te=fn(v,O),ce=i()<.5?-1:1;ye($,0,ue=>F.push({type:"car",x:ue.x,y:ue.y,r:.9,dir:Math.atan2(te.y,te.x)+ce*a(.4,.7)})),k++}const Oe=e>=1?s(1,2):s(0,1);for(let k=0,z=0;k<Oe&&z<40;z++){const $=a(.14,.9)*S;if(!St($))continue;const{i:O}=C($),te=fn(v,O),ce=L[Math.min(x-1,O)],ue=i()<.5?-1:1,P=N($,ue*ce*.5);F.push({type:"band",x:P.x,y:P.y,r:ce*a(.42,.55),dir:Math.atan2(te.y,te.x)+ue*a(.5,.8)}),ae.push($),k++}if(e>=1&&i()<.85)for(let k=0;k<40;k++){const z=a(.25,.8)*S;if(!St(z))continue;const{i:$}=C(z),O=L[Math.min(x-1,$)];ye(z,0,te=>F.push({type:"mill",x:te.x,y:te.y,r:Math.min(2.4,O*.6),dir:i()*3.14,n:e>=3?4:2}));break}const ut=s(1,2);for(let k=0,z=0;k<ut&&z<40;z++){const $=a(.18,.86)*S;St($)&&(ye($,a(-.4,.4)*c,O=>F.push({type:"balloon",x:O.x,y:O.y,r:1.05})),k++)}if(e>=1&&i()<.55){let k=-1,z=-1,$=1e9;for(let O=0;O<x;O+=4)for(let te=O+1;te<x;te+=4){const ce=T[te]-T[O];if(ce<S*.16||ce>S*.6||T[O]<S*.12||T[te]>S*.88)continue;const ue=Math.hypot(v[O].x-v[te].x,v[O].y-v[te].y);ue<$&&($=ue,k=O,z=te)}if(k>=0&&$>2*c+1&&$<2*c+16){const O=(v[k].x+v[z].x)/2,te=(v[k].y+v[z].y)/2;ge.push({x:O,y:te,r:$/2+c*.7}),F.push({type:"hole",x:O+a(-1,1),y:te+a(-1,1),r:a(1.2,1.7)})}}const Be=(k,z,$,O,te,ce)=>{const ue=te-$,P=ce-O,re=ue*ue+P*P||1e-6;let V=((k-$)*ue+(z-O)*P)/re;V=V<0?0:V>1?1:V;const J=k-($+ue*V),le=z-(O+P*V);return J*J+le*le},R=(k,z)=>{for(const O of ge)if((k-O.x)**2+(z-O.y)**2<=(O.r+2)**2)return!1;const $=(c+4.5)*(c+4.5);for(let O=1;O<x;O++)if(Be(k,z,v[O-1].x,v[O-1].y,v[O].x,v[O].y)<$)return!1;return!0};for(let k=0,z=0;k<s(12,22)&&z<400;z++){const $=a(2,m-2),O=a(2,y-2);if(!R($,O))continue;const te=r.decor[s(0,r.decor.length-1)];K.push({kind:te,x:$,y:O,s:a(.8,1.3),rot:i()*6}),k++}for(let k=F.length-1;k>=0;k--){const z=F[k];if(z.type==="stone")for(let $=0;$<k;$++){const O=F[$];if(O.type!=="stone")continue;if(Math.hypot(z.x-O.x,z.y-O.y)-z.r-O.r<2.6){F.splice(k,1);break}}}const E={saltshaker:1.4,plate:4.5,mugcoffee:2.6,napkinfold:2.6,apple:2,cuttingboard:4.2,bucketzinc:2.2,bone:2.3,fencebit:3.7,beachumbrella:5.2,beachball:2,flipflop:2.1,sunscreen:1.4,toycar:2.3,chalkset:2,paintcan:1.9,wrench:2.5,tirestack:2.9,oldtire:2.9,toyshovel:2.7,wateringcan:2.9,flowerpot:2,mushroom:1.4,cactus:2,drybush:1.7,brickpile:2.5,helmet:2.4,watertank:3.8,clothesline:5.2,floatring:3.2,fruitcrate:2.9,roadsign:2,cuestick:6,poolballs:1.6,bluechalk:.9,sodacup:1.6,popsicle:2.5,icecreamtub:2.3,icetray:2.2,hammer:2.7,screwdriver:2.1,pillow:3.2,bookpile:2.7,sock:1.7},W=r.heroes||[];if(W.length){const k=[],z=(O,te,ce)=>{for(const P of ge)if((O-P.x)**2+(te-P.y)**2<=(P.r+ce+2)**2)return!1;const ue=(c+2.5+ce)**2;for(let P=1;P<x;P++)if(Be(O,te,v[P-1].x,v[P-1].y,v[P].x,v[P].y)<ue)return!1;return!0},$=Math.min(W.length+2,s(4,6));for(let O=0,te=0;O<$&&te<500;te++){const ce=W[O%W.length],ue=E[ce]||2.5,P=a(3+ue,m-3-ue),re=a(3+ue,y-3-ue);z(P,re,ue)&&(k.some(V=>(V.x-P)**2+(V.y-re)**2<(V.r+ue+3)**2)||(K.push({kind:ce,x:P,y:re,s:a(.95,1.25),rot:i()*6.283}),k.push({x:P,y:re,r:ue}),O++))}}for(let k=F.length-1;k>=0;k--){const z=F[k];z.type!=="hole"&&z.type!=="bomb"||me.some($=>(z.x-$.x)**2+(z.y-$.y)**2<5.5*5.5)&&F.splice(k,1)}const se=he(v[0].x,v[0].y),oe=fn(v,0),ie=Math.atan2(oe.y,oe.x),Pe=v[x-1],xe=fn(v,x-1),we={x:-xe.y,y:xe.x},Qe=[he(Pe.x+we.x*(c+.6),Pe.y+we.y*(c+.6)),he(Pe.x-we.x*(c+.6),Pe.y-we.y*(c+.6))],de=r.names[t%r.names.length]+(t>=r.names.length?" "+(Math.floor(t/r.names.length)+1):"");return{id:n,name:de,theme:r.key,level:e,w:m,h:y,ground:r.ground,paint:r.paint,bg:r.bg,wallCol:r.wall,path:v,half:L,pads:ge,patches:Q,walls:I,obstacles:F,checkpoints:me,start:se,startAngle:ie,finish:Qe,decor:K}}const fr=new Map;function zd(n,e){const t=n*10+e;return fr.has(t)||fr.set(t,Nb(t,n,e)),fr.get(t)}const an=10;function ci(n,e,t){let i=n>>>0||1;for(let o=0;o<e.length;o++)i=Math.imul(i^e.charCodeAt(o),2654435761)>>>0;i=Math.imul(i^i>>>13,2246822519)>>>0;const s=i%an,a=[1,3,7,9][(i>>>8)%4];return(s+t*a)%an}function Ub(n){const e=n.path,t=e.length,i=[0];let s=0;for(let h=1;h<t;h++)s+=Math.hypot(e[h].x-e[h-1].x,e[h].y-e[h-1].y),i.push(s);const a=s,o=h=>{let d=1;for(;d<t-1&&i[d]<h;)d++;const u=i[d]-i[d-1]||1,f=(h-i[d-1])/u;return{p:he(e[d-1].x+(e[d].x-e[d-1].x)*f,e[d-1].y+(e[d].y-e[d-1].y)*f),i:d}},r=Bd(n.id*2657+13),l=n.obstacles.slice(),c=6+Math.floor(r()*3);for(let h=0;h<c;h++){const d=(h+.5)/c*a*.92+a*.05,{p:u,i:f}=o(d),g=Vn(e,f),b=(r()<.5?-1:1)*(n.half[Math.min(t-1,f)]||4)*(r()*.28),p=u.x+g.x*b,m=u.y+g.y*b;n.obstacles.some(y=>(y.type==="hole"||y.type==="bomb")&&(y.x-p)**2+(y.y-m)**2<9)||l.push({type:"item",x:p,y:m,r:1.15})}return{...n,obstacles:l}}function $s(n){const e=[...cc,...lc],t=e[(n.theme%e.length+e.length)%e.length],i=Si(n.half||4.2,3.2,6.5);let s=n.pts.map(X=>he(X.x,X.y));s.length<2&&(s=[he(10,10),he(40,30)]);const a=[s[0]],o=2.2;for(let X=1;X<s.length;X++){const ne=a[a.length-1],be=s[X],Fe=Math.hypot(be.x-ne.x,be.y-ne.y),Ne=Math.max(1,Math.round(Fe/o));for(let D=1;D<=Ne;D++)a.push(he(ne.x+(be.x-ne.x)*D/Ne,ne.y+(be.y-ne.y)*D/Ne))}let r=a;for(let X=0;X<3;X++){const ne=[r[0]];for(let be=1;be<r.length-1;be++)ne.push(he((r[be-1].x+2*r[be].x+r[be+1].x)/4,(r[be-1].y+2*r[be].y+r[be+1].y)/4));ne.push(r[r.length-1]),r=ne}const l=r.length,c=i+6;let h=1/0,d=1/0,u=-1/0,f=-1/0;for(const X of r)X.x<h&&(h=X.x),X.y<d&&(d=X.y),X.x>u&&(u=X.x),X.y>f&&(f=X.y);const g=c-h,b=c-d;for(const X of r)X.x+=g,X.y+=b;const p=Math.ceil(u-h+2*c),m=Math.ceil(f-d+2*c),y=[0];let v=0;for(let X=1;X<l;X++)v+=Math.hypot(r[X].x-r[X-1].x,r[X].y-r[X-1].y),y.push(v);const x=v,T=X=>{let ne=1;for(;ne<l-1&&y[ne]<X;)ne++;const be=y[ne]-y[ne-1]||1,Fe=(X-y[ne-1])/be;return{p:he(r[ne-1].x+(r[ne].x-r[ne-1].x)*Fe,r[ne-1].y+(r[ne].y-r[ne-1].y)*Fe),i:ne}},M=(X,ne=0)=>{const{p:be,i:Fe}=T(X),Ne=Vn(r,Fe);return he(be.x+Ne.x*ne,be.y+Ne.y*ne)},S=[];for(let X=0;X<l;X++){let ne=i;y[X]<12&&(ne=Math.max(ne,i+3*(1-y[X]/12))),x-y[X]<8&&(ne+=.8),S.push(ne)}const C=[],N=l>130?2:1,_=n.protect==null?1:Math.max(0,Math.min(1,n.protect)),w=X=>X<11||x-X<9,L=n.openArcs||[],I=X=>L.some(ne=>Math.abs(ne-X)<4.5);for(let X=N;X<l;X+=N){const ne=X-N,be=(y[X]+y[ne])/2;if(!w(be)&&(I(be)||_<1&&(X*2654435761>>>8)%1e3/1e3>=_))continue;const Fe=Vn(r,ne),Ne=Vn(r,X);C.push({a:he(r[ne].x+Fe.x*S[ne],r[ne].y+Fe.y*S[ne]),b:he(r[X].x+Ne.x*S[X],r[X].y+Ne.y*S[X])}),C.push({a:he(r[ne].x-Fe.x*S[ne],r[ne].y-Fe.y*S[ne]),b:he(r[X].x-Ne.x*S[X],r[X].y-Ne.y*S[X])})}const B=[he(r[0].x,r[0].y)],j=Si(Math.round(x/90),2,6);for(let X=1;X<=j;X++)B.push(M(x*X/(j+1)));const F=(X,ne)=>{let be=1,Fe=1e9;for(let D=1;D<l;D++){const St=r[D].x-X,qe=r[D].y-ne,Ye=St*St+qe*qe;Ye<Fe&&(Fe=Ye,be=D)}const Ne=fn(r,be);return Math.atan2(Ne.y,Ne.x)},Q=[];for(const X of n.obstacles){const ne=X.x+g,be=X.y+b;X.type==="jump"?Q.push({type:"jump",x:ne,y:be,r:X.r||1.6,dir:F(ne,be)}):X.type==="car"?Q.push({type:"car",x:ne,y:be,r:.9,dir:F(ne,be)+.5}):X.type==="band"?Q.push({type:"band",x:ne,y:be,r:X.r||2.2,dir:F(ne,be)+.6}):X.type==="mill"?Q.push({type:"mill",x:ne,y:be,r:X.r||2.2,dir:0,n:2}):Q.push({type:X.type,x:ne,y:be,r:X.r||(X.type==="bonus"?1.1:X.type==="bomb"?.95:X.type==="item"?1.15:X.type==="top"?.95:X.type==="balloon"?1.05:1.2),n:X.n})}const K=[];for(const X of n.patches||[]){const ne=X.x+g,be=X.y+b,Fe=Math.min(X.r||2.4,X.surface==="gum"||X.surface==="ramp"||X.surface==="push"?2.1:99),D=X.surface==="ramp"||X.surface==="push"||X.surface==="water"?F(ne,be)+(X.surface==="push"?Math.PI:0):void 0;K.push({surface:X.surface,x:ne,y:be,r:Fe,dir:D})}for(let X=Q.length-1;X>=0;X--){const ne=Q[X];ne.type!=="hole"&&ne.type!=="bomb"||B.some(be=>(ne.x-be.x)**2+(ne.y-be.y)**2<5.5*5.5)&&Q.splice(X,1)}const me=[{x:r[0].x,y:r[0].y,r:i+3.6}],ge=he(r[0].x,r[0].y),Ae=fn(r,0),je=Math.atan2(Ae.y,Ae.x),Ke=r[l-1],ee=fn(r,l-1),ae={x:-ee.y,y:ee.x},Te=[he(Ke.x+ae.x*(i+.6),Ke.y+ae.y*(i+.6)),he(Ke.x-ae.x*(i+.6),Ke.y-ae.y*(i+.6))],ye={id:900,name:n.name||"Minha Pista",theme:t.key,level:2,w:p,h:m,ground:t.ground,paint:t.paint,bg:t.bg,wallCol:t.wall,path:r,half:S,pads:me,patches:K,walls:C,obstacles:Q,checkpoints:B,start:ge,startAngle:je,finish:Te,decor:[]};return ye._shift={dx:g,dy:b},ye._total=x,ye}const Fb=13;class Ob{constructor(e,t,i,s){this.dom=e,this.cam=t,this.rig=i,this.opts=s,this.ray=new Xv,this.ndc=new Se,this.plane=new xi(new U(0,1,0),0),this.pointers=new Map,this.aiming=!1,this.camDrag=null,this.editing=!1,this.pinch=0,this.lastMid=null,this.down=a=>{if(this.dom.setPointerCapture?.(a.pointerId),this.pointers.set(a.pointerId,{x:a.clientX,y:a.clientY}),this.pointers.size===1){if(a.button===2){this.camDrag={x:a.clientX,y:a.clientY};return}if((this.opts.editMode?this.opts.editMode():"off")!=="off"){const r=this.world(a.clientX,a.clientY);r&&(this.editing=!0,this.opts.onEditDown?.(r.x,r.z));return}this.opts.canAim()?(this.aiming=!0,this.updateAim(a.clientX,a.clientY)):this.camDrag={x:a.clientX,y:a.clientY}}else if(this.pointers.size===2){this.aiming=!1,this.editing=!1,this.opts.onEditUp?.(),this.opts.onCancel(),this.camDrag=null;const o=[...this.pointers.values()];this.pinch=Math.hypot(o[0].x-o[1].x,o[0].y-o[1].y),this.lastMid={x:(o[0].x+o[1].x)/2,y:(o[0].y+o[1].y)/2}}},this.move=a=>{if(this.pointers.has(a.pointerId)){if(this.pointers.set(a.pointerId,{x:a.clientX,y:a.clientY}),this.pointers.size===1)if(this.editing){const o=this.world(a.clientX,a.clientY);o&&this.opts.onEditMove?.(o.x,o.z)}else this.aiming?this.updateAim(a.clientX,a.clientY):this.camDrag&&(this.rig.rotate(a.clientX-this.camDrag.x),this.rig.tilt(a.clientY-this.camDrag.y),this.camDrag={x:a.clientX,y:a.clientY});else if(this.pointers.size===2){const o=[...this.pointers.values()],r=(o[0].x+o[1].x)/2,l=(o[0].y+o[1].y)/2,c=Math.hypot(o[0].x-o[1].x,o[0].y-o[1].y);this.lastMid&&(this.rig.rotate((r-this.lastMid.x)*.8),this.rig.tilt((l-this.lastMid.y)*.8)),this.pinch&&this.rig.zoomBy(this.pinch/c,this.dom.clientWidth,this.dom.clientHeight),this.lastMid={x:r,y:l},this.pinch=c}}},this.up=a=>{const o=this.aiming&&this.pointers.size===1;this.pointers.delete(a.pointerId),this.pointers.size<2&&(this.pinch=0,this.lastMid=null),this.pointers.size===0&&(o&&this.release(a.clientX,a.clientY),this.editing&&(this.opts.onEditUp?.(),this.editing=!1),this.aiming=!1,this.camDrag=null)},this.wheel=a=>{a.preventDefault(),this.rig.zoomBy(a.deltaY>0?1.08:.92,this.dom.clientWidth,this.dom.clientHeight)},e.addEventListener("pointerdown",this.down),e.addEventListener("pointermove",this.move),window.addEventListener("pointerup",this.up),e.addEventListener("wheel",this.wheel,{passive:!1}),e.addEventListener("contextmenu",a=>a.preventDefault())}setCamera(e,t){this.cam=e,this.rig=t}world(e,t){const i=this.dom.getBoundingClientRect();this.ndc.x=(e-i.left)/i.width*2-1,this.ndc.y=-((t-i.top)/i.height)*2+1,this.ray.setFromCamera(this.ndc,this.cam);const s=new U;return this.ray.ray.intersectPlane(this.plane,s)?{x:s.x,z:s.z}:null}aimVec(e,t){const i=this.opts.capPos(),s=this.world(e,t);if(!i||!s)return null;const a=s.x-i.x,o=s.z-i.y,r=Math.hypot(a,o),l=Math.min(1,r/Fb);return r<.4?{dx:1,dz:0,power:0}:{dx:-a/r,dz:-o/r,power:l}}updateAim(e,t){const i=this.aimVec(e,t);i&&this.opts.onAim(i.dx,i.dz,i.power)}release(e,t){const i=this.aimVec(e,t);i&&i.power>.06?this.opts.onRelease(i.dx,i.dz,i.power):this.opts.onCancel()}}const no=[{name:"Liga do Quintal",ico:"🏡",col:"#3fae6a",level:0,desc:"Onde toda lenda começa: terra batida e joelho ralado."},{name:"Liga da Rua",ico:"🛴",col:"#3b82f6",level:1,desc:"A calçada inteira é sua pista. A molecada é boa."},{name:"Liga da Cidade",ico:"🏙️",col:"#f2b100",level:2,desc:"Os campeões de cada bairro. Aqui ninguém dá mole."},{name:"Liga Nacional",ico:"🇧🇷",col:"#e5762a",level:3,desc:"O país inteiro de olho. Tampinhas lendárias na pista."},{name:"Liga Mundial",ico:"🌍",col:"#e5484d",level:4,desc:"O topo do mundo. Só as míticas — e você."}],pr=["caotico","cauteloso"],$a=["cauteloso","caotico","agressivo"],gs=["tecnico","agressivo","rival"],Oi=["tecnico","rival","rival"];function Dt(n,e,t,i,s,a,o,r,l=!1){return{id:n,liga:e,name:t,ico:i,races:s,level:no[e].level,nOpp:a,rarities:o,aiKinds:r,final:l}}const Xi=[Dt("q1",0,"Copa Poeirinha","🌪️",2,3,["comum"],pr),Dt("q2",0,"Troféu Formiga","🐜",2,3,["comum"],pr),Dt("q3",0,"Desafio do Varal","👕",3,3,["comum"],pr),Dt("q4",0,"Final do Quintal","🏡",3,4,["comum"],$a),Dt("r1",1,"Copa Meio-Fio","🛹",3,4,["comum","rara"],$a),Dt("r2",1,"Troféu Poste a Poste","💡",3,4,["rara","comum"],$a),Dt("r3",1,"Grande Ladeira","⛰️",3,4,["rara"],$a),Dt("r4",1,"Final da Rua","🛴",4,4,["rara"],gs),Dt("c1",2,"Copa Viaduto","🌉",3,4,["rara","epica"],gs),Dt("c2",2,"Troféu Praça Central","⛲",3,5,["epica","rara"],gs),Dt("c3",2,"Noturna da Cidade","🌃",4,5,["epica"],gs),Dt("c4",2,"Final Metropolitana","🏙️",4,5,["epica"],gs),Dt("n1",3,"Copa dos Estados","🗺️",3,5,["epica","lendaria"],gs),Dt("n2",3,"Troféu Litoral","🏖️",4,5,["lendaria","epica"],Oi),Dt("n3",3,"Rally do Sertão","🌵",4,5,["lendaria"],Oi),Dt("n4",3,"Final Nacional","🇧🇷",4,5,["lendaria"],Oi),Dt("m1",4,"Copa Intercontinental","✈️",4,5,["lendaria","mitica"],Oi),Dt("m2",4,"Troféu Aurora","🌌",4,5,["mitica","lendaria"],Oi),Dt("m3",4,"Semifinal Mundial","🌍",4,5,["mitica"],Oi),Dt("m4",4,"A GRANDE FINAL","👑",5,5,["mitica"],Oi,!0)],Mo=n=>Xi.find(e=>e.id===n),mr=12,Bb=.012;function gr(n){return n<4?1:n<8?2:3}function pn(){const n=Ce.get().campaign,e=n||{cap:null,pts:0,alloc:{},best:{},done:!1,races:0,golds:0};return e.seed||(e.seed=Math.random()*4294967295>>>0,n&&Ce.persistNow()),e}function sa(n){Ce.get().campaign=n,Ce.persistNow()}function vr(n){const t={...(Rt.find(i=>i.id===n.cap)||Rt[0]).stats};for(const i of Object.keys(n.alloc))t[i]!=null&&(t[i]=+(t[i]+n.alloc[i]*Bb).toFixed(3));return t}const io=["itubaina","nesbitts","hires","guarana","schweppes"];function Gd(n,e){return Xi.filter(t=>t.liga===e&&n.best[t.id]===1).length}const fh={1:5,2:3,3:2},ph={1:2,2:1,3:1};function zb(n,e,t){const i=n.best[e]??99,s=fh[t]||0,a=fh[i]||0,o=ph[t]||0,r=ph[i]||0,l=Math.max(0,s-a),c=Math.max(0,o-r),h=t<i;h&&(n.best[e]=t),n.pts+=l;for(let g=0;g<c;g++)Ce.addWin();const d=Mo(e);let u=!1;if(d.final&&t===1&&!n.done){n.done=!0,u=!0,n.pts+=10;for(let g=0;g<10;g++)Ce.addWin()}sa(n);let f=null;return Gd(n,d.liga)>=4&&!Ce.hasBonus(io[d.liga])&&(Ce.addBonus(io[d.liga]),f=io[d.liga]),{pts:l,wins:c+(u?10:0),improved:h,finished:u,prize:f}}function Gb(n,e){if(e===0)return!0;const t=Xi[e-1];return(n.best[t.id]??99)<=3}function Hb(n,e=Math.random){const t=[];for(const s of n.rarities)for(const a of Rt)a.rarity===s&&!a.hidden&&a.prize==null&&t.push(a.id);for(let s=t.length-1;s>0;s--){const a=Math.floor(e()*(s+1));[t[s],t[a]]=[t[a],t[s]]}const i=[];for(let s=0;s<n.nOpp;s++)i.push(t[s%t.length]);return i}const _i=[{key:"normal",name:"Tier Normal",ico:"🥉",col:"#3fae6a",level:0,rarity:"comum",desc:"A porta de entrada do ranking. Rivais comuns — mas cada vez mais espertos."},{key:"raro",name:"Tier Raro",ico:"🥈",col:"#3b82f6",level:1,rarity:"rara",desc:"Tampinhas raras na pista. Aqui já não tem jogo fácil."},{key:"epico",name:"Tier Épico",ico:"🥇",col:"#a855f7",level:2,rarity:"epica",desc:"As épicas entram em cena. Só passa quem joga MUITO."},{key:"lendario",name:"Tier Lendário",ico:"💎",col:"#f2a400",level:3,rarity:"lendaria",desc:"Lendárias em cada raia. O ar fica rarefeito aqui em cima."},{key:"mistico",name:"Tier Místico",ico:"👑",col:"#e5484d",level:4,rarity:"mitica",desc:"O topo do topo. Míticas turbinadas — e o mundo inteiro olhando."}],Vb=[0,.05,.11,.17,.23,.3,.37,.45],Wb=[["caotico","cauteloso"],["cauteloso","caotico","agressivo"],["cauteloso","agressivo"],["agressivo","tecnico"],["tecnico","agressivo"],["tecnico","agressivo","rival"],["tecnico","rival"],["tecnico","rival","rival"]],mh=[["Abertura","🚩"],["Etapa das Pedras","🪨"],["Volta Rápida","💨"],["Meia-Temporada","🌗"],["Etapa Noturna","🌙"],["Chuva de Pontos","🌧️"],["Semifinal","🔥"],["GRANDE FINAL","🏆"]],$b=[2,2,3,3,3,4,4,4],qb=[3,3,4,4,4,5,5,5],li=[];for(let n=0;n<5;n++)for(let e=0;e<8;e++)li.push({id:`rk${n}${e}`,tier:n,idx:e,name:mh[e][0],ico:mh[e][1],races:$b[e],level:_i[n].level,nOpp:qb[e],boost:Vb[e],aiKinds:Wb[e]});const So=n=>li.find(e=>e.id===n),Hd=[12,9,7,5,3,1],Qs=n=>n.races*Hd[0],gh=li.reduce((n,e)=>n+Qs(e),0);function hc(){return Math.random().toString(36).slice(2,10)+Math.random().toString(36).slice(2,6)}const dc=()=>Math.random()*4294967295>>>0,Hc=n=>n==="caos"?"rankc":"rank";function Xt(n="normal"){const e=Ce.get(),t=Hc(n);return e[t]||(e[t]={name:null,dev:hc(),claimTs:0,best:{},place:{},cap:"coca",seed:dc()}),e[t].dev||(e[t].dev=hc()),e[t].seed||(e[t].seed=dc(),Ce.persistNow()),e[t]}function uc(n,e="normal"){Ce.get()[Hc(e)]=n,Ce.persistNow()}function Xb(n="normal"){const e=Ce.get(),t=Hc(n),i=e[t]?.dev||hc();e[t]={name:null,dev:i,claimTs:0,best:{},place:{},cap:"coca",seed:dc()},Ce.persistNow()}const qs=n=>Object.values(n.best).reduce((e,t)=>e+t,0),so=(n,e)=>li.filter(t=>t.tier===e&&n.place[t.id]===1).length,Yb=(n,e)=>li.filter(t=>t.tier===e&&(n.place[t.id]??99)<=3).length;function vh(n,e){if(e===0)return!0;const t=li[e-1];return(n.place[t.id]??99)<=3}const jb=["mineirinho","dolly","saogeraldo","bare","guaranajesus"],Kb=["grapette","cotuba","matecouro","fruki","simba"],Vd=n=>n==="caos"?Kb:jb;function Jb(n){return to(Ce.wins()).filter(e=>vb(e.rarity)<=n)}function Zb(n,e,t,i,s,a="normal"){const o=So(e),r=n.best[e]??0,l=Math.max(0,i-r);i>r&&(n.best[e]=i);const c=n.place[e]??99,h=t<c;h&&(n.place[e]=t),n.cap=s,uc(n,a);let d=null;const u=Vd(a);return so(n,o.tier)>=8&&!Ce.hasBonus(u[o.tier])&&(Ce.addBonus(u[o.tier]),d=u[o.tier]),{dPts:l,improvedPlace:h,prize:d,podium:t<=3}}function Qb(n,e=Math.random){const t=_i[n.tier].rarity,i=Rt.filter(a=>a.rarity===t&&!a.hidden&&a.prize==null&&a.rprize==null);for(let a=i.length-1;a>0;a--){const o=Math.floor(e()*(a+1));[i[a],i[o]]=[i[o],i[a]]}const s=[];for(let a=0;a<n.nOpp;a++){const o=i[a%i.length];s.push({skin:o.id,stats:e1(o.stats,n.boost)})}return s}function e1(n,e){const t=1+e,i=1+e*.5,s={};for(const a of Object.keys(n))s[a]=+(n[a]*(n[a]>=1?t:i)).toFixed(3);return s}const t1="modulepreload",n1=function(n,e){return new URL(n,e).href},bh={},Wd=function(e,t,i){let s=Promise.resolve();if(t&&t.length>0){const o=document.getElementsByTagName("link"),r=document.querySelector("meta[property=csp-nonce]"),l=r?.nonce||r?.getAttribute("nonce");s=Promise.allSettled(t.map(c=>{if(c=n1(c,i),c in bh)return;bh[c]=!0;const h=c.endsWith(".css"),d=h?'[rel="stylesheet"]':"";if(!!i)for(let g=o.length-1;g>=0;g--){const b=o[g];if(b.href===c&&(!h||b.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${c}"]${d}`))return;const f=document.createElement("link");if(f.rel=h?"stylesheet":t1,h||(f.as="script"),f.crossOrigin="",f.href=c,l&&f.setAttribute("nonce",l),document.head.appendChild(f),h)return new Promise((g,b)=>{f.addEventListener("load",g),f.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${c}`)))})}))}function a(o){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=o,window.dispatchEvent(r),!r.defaultPrevented)throw o}return s.then(o=>{for(const r of o||[])r.status==="rejected"&&a(r.reason);return e().catch(a)})};async function yh(){const n=await Wd(()=>import("./bundler-DMWXtVuP.js"),[],import.meta.url);return n.Peer||n.default||n}const i1=[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun1.l.google.com:19302"},{urls:"turn:openrelay.metered.ca:80",username:"openrelayproject",credential:"openrelayproject"},{urls:"turn:openrelay.metered.ca:443",username:"openrelayproject",credential:"openrelayproject"},{urls:"turn:openrelay.metered.ca:443?transport=tcp",username:"openrelayproject",credential:"openrelayproject"}],xh={debug:0,config:{iceServers:i1}};function po(){try{const n=JSON.parse(localStorage.getItem("tmprally_broker")||"null");if(n)return{...xh,...n}}catch{}return xh}const _h=new Set(["unavailable-id","network","server-error","socket-error","socket-closed","disconnected"]),Mh="tmprally-",Sh="ABCDEFGHJKMNPQRSTUVWXYZ23456789";function s1(n=5){let e="";for(let t=0;t<n;t++)e+=Sh[Math.floor(Math.random()*Sh.length)];return e}class wh{constructor(){this.peer=null,this.isHost=!1,this.code="",this.conns=new Map,this.onData=()=>{},this.onOpen=()=>{},this.onJoin=()=>{},this.onLeave=()=>{},this.onError=()=>{}}host(){this.isHost=!0;const e=async t=>{const i=await yh(),s=t>0&&this.code?this.code:s1(),a=new i(Mh+s,po());this.peer=a,this.code=s;let o=!1;a.on("open",()=>{o=!0,this.onOpen(s)}),a.on("connection",r=>this.accept(r)),a.on("error",r=>{const l=r&&r.type||String(r);if(l==="unavailable-id"&&(this.code=""),_h.has(l)&&t<8){try{a.destroy()}catch{}setTimeout(()=>e(t+1),700+t*400)}else l!=="peer-unavailable"&&this.onError(l)}),setTimeout(()=>{if(!o&&t<8){try{a.destroy()}catch{}e(t+1)}},14e3)};e(0).catch(()=>this.onError("load"))}accept(e){e.on("open",()=>{this.conns.set(e.peer,e),this.onJoin(e.peer)}),e.on("data",t=>this.onData(e.peer,t)),e.on("close",()=>{this.conns.delete(e.peer)&&this.onLeave(e.peer)}),e.on("error",()=>{this.conns.delete(e.peer)&&this.onLeave(e.peer)})}join(e){this.isHost=!1,this.code=e.toUpperCase();let t=!1;const i=s=>{const a=(o=700)=>{!t&&s<7?setTimeout(()=>i(s+1),o+s*300):t||this.onError("peer-unavailable")};yh().then(o=>{const r=new o(po());this.peer=r;let l=!1;r.on("open",()=>{l=!0;const c=r.connect(Mh+this.code,{reliable:!0});c.on("open",()=>{t=!0,this.conns.set("host",c),this.onOpen(this.code)}),c.on("data",h=>this.onData("host",h)),c.on("close",()=>this.onLeave("host")),c.on("error",()=>{try{r.destroy()}catch{}a()}),setTimeout(()=>{if(!t){try{r.destroy()}catch{}a()}},16e3)}),r.on("error",c=>{const h=c&&c.type||String(c);try{r.destroy()}catch{}h==="peer-unavailable"?t||a(1200):_h.has(h)?a():t||this.onError(h)}),setTimeout(()=>{if(!l&&!t){try{r.destroy()}catch{}a()}},12e3)}).catch(()=>this.onError("load"))};i(0)}send(e,t){const i=this.conns.get(e);if(i&&i.open)try{i.send(t)}catch{}}broadcast(e){for(const t of this.conns.values())if(t.open)try{t.send(e)}catch{}}relay(e,t){for(const[i,s]of this.conns)if(i!==e&&s.open)try{s.send(t)}catch{}}count(){return this.conns.size}destroy(){try{this.peer?.destroy()}catch{}this.conns.clear(),this.peer=null}}async function Eh(){const n=await Wd(()=>import("./bundler-DMWXtVuP.js"),[],import.meta.url);return n.Peer||n.default||n}const a1="tmprally-RANKHUB-V1",o1="tmprally-RANKHUB-CAOS-V1",r1="tmprally_rankboard",c1="tmprally_rankboard_caos";function ao(n){return n.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/\s+/g," ")}function Th(n){const e=n.trim().replace(/\s+/g," ");return e.length<2?"Muito curto (mínimo 2 letras)":e.length>12?"Muito longo (máximo 12)":/^[\p{L}\p{N} _.-]+$/u.test(e)?null:"Só letras, números, espaço e _ . -"}function l1(n,e){if(!n)return e;if(!e)return n;if(n.dev===e.dev)return n.ts>=e.ts?n:e;const t=!!n.del,i=!!e.del;if(t&&i)return n.ts>=e.ts?n:e;if(t!==i){const s=t?n:e,a=t?e:n;return a.claimTs>(s.del||0)?a:s}return n.claimTs!==e.claimTs?n.claimTs<e.claimTs?n:e:n.dev<e.dev?n:e}function Ah(n,e){let t=!1;for(const i of Object.keys(e)){const s=l1(n[i],e[i]);s&&s!==n[i]&&(n[i]=s,t=!0)}return t}function Ch(n,e,t){const i=n[ao(e)];return!i||!!i.del||i.dev===t}function Rh(n){return Object.values(n).filter(e=>!e.del).sort((e,t)=>t.score-e.score||e.claimTs-t.claimTs)}class Ph{constructor(e="normal"){this.board={},this.status="off",this.onChange=()=>{},this.onNameLost=()=>{},this.peer=null,this.conns=new Map,this.myName=null,this.myDev="",this.stopped=!0,this.attempt=0,this.hubId=e==="caos"?o1:a1,this.lsKey=e==="caos"?c1:r1,this.loadLocal()}loadLocal(){try{this.board=JSON.parse(localStorage.getItem(this.lsKey)||"{}")||{}}catch{this.board={}}}persist(){try{localStorage.setItem(this.lsKey,JSON.stringify(this.board))}catch{}}submit(e){this.myName=e.del?null:e.name,this.myDev=e.dev,Ah(this.board,{[ao(e.name)]:e})&&this.persist();const i={t:"up",row:e};this.status==="hub"?this.broadcast(i):this.status==="online"&&this.send(i),this.onChange()}watch(e,t){this.myName=e,this.myDev=t}setStatus(e){this.status!==e&&(this.status=e,this.onChange())}absorb(e){if(Ah(this.board,e)){if(this.persist(),this.myName){const i=this.board[ao(this.myName)];if(i&&!i.del&&i.dev!==this.myDev){const s=this.myName;this.myName=null,this.onNameLost(s)}}this.onChange()}}start(){this.stopped&&(this.stopped=!1,this.attempt=0,this.setStatus("connecting"),this.tryJoin())}stop(){this.stopped=!0,this.destroyPeer(),this.setStatus("off")}destroyPeer(){try{this.peer?.destroy()}catch{}this.peer=null,this.conns.clear()}later(e,t){setTimeout(()=>{this.stopped||e()},t)}fail(){this.destroyPeer(),this.setStatus("off"),this.later(()=>{this.setStatus("connecting"),this.attempt=0,this.tryJoin()},45e3)}tryJoin(){this.stopped||(this.destroyPeer(),Eh().then(e=>{if(this.stopped)return;const t=new e(po());this.peer=t;let i=!1;const s=a=>{i||this.stopped||(i=!0,this.destroyPeer(),a?this.tryHost():this.retry())};t.on("open",()=>{if(this.stopped)return;const a=t.connect(this.hubId,{reliable:!0});a.on("open",()=>{this.stopped||(i=!0,this.conns.set("hub",a),a.send({t:"hi",board:this.board}),this.setStatus("online"))}),a.on("data",o=>this.clientData(o)),a.on("close",()=>{this.conns.delete("hub"),!this.stopped&&this.status==="online"&&(this.setStatus("connecting"),this.attempt=0,this.later(()=>this.tryJoin(),800))}),a.on("error",()=>s(!0)),setTimeout(()=>{i||s(!0)},12e3)}),t.on("error",a=>{const o=a&&a.type||String(a);s(o==="peer-unavailable")}),setTimeout(()=>{i||s(!1)},15e3)}).catch(()=>this.fail()))}tryHost(){this.stopped||Eh().then(e=>{if(this.stopped)return;const t=new e(this.hubId,po());this.peer=t;let i=!1;t.on("open",()=>{this.stopped||(i=!0,this.setStatus("hub"))}),t.on("connection",s=>{s.on("open",()=>this.conns.set(s.peer,s)),s.on("data",a=>this.hubData(s,a)),s.on("close",()=>this.conns.delete(s.peer)),s.on("error",()=>this.conns.delete(s.peer))}),t.on("error",s=>{const a=s&&s.type||String(s);i&&(a==="network"||a==="disconnected")||i||(i=!0,this.destroyPeer(),a==="unavailable-id"?this.later(()=>this.tryJoin(),400):this.retry())}),setTimeout(()=>{!i&&!this.stopped&&(this.destroyPeer(),this.retry())},15e3)}).catch(()=>this.fail())}retry(){if(this.attempt++,this.attempt>=3){this.fail();return}this.later(()=>this.tryJoin(),900*this.attempt)}hubData(e,t){if(t.t==="hi"&&t.board){this.absorb(t.board);try{e.send({t:"board",board:this.board})}catch{}}else if(t.t==="up"&&t.row){this.absorb({[ao(t.row.name)]:t.row}),this.broadcast({t:"board",board:this.board},e.peer);try{e.send({t:"board",board:this.board})}catch{}}else if(t.t==="pull")try{e.send({t:"board",board:this.board})}catch{}}clientData(e){e.t==="board"&&e.board&&this.absorb(e.board)}broadcast(e,t){for(const[i,s]of this.conns)if(i!==t&&s.open)try{s.send(e)}catch{}}send(e){const t=this.conns.get("hub");if(t&&t.open)try{t.send(e)}catch{}}refresh(){this.status==="online"&&this.send({t:"pull"})}}const $d={c:0,d:2,e:4,f:5,g:7,a:9,b:11},Xs=n=>440*Math.pow(2,(n-69)/12);function h1(n){const e=/^([a-g])([#b]?)(\d)$/.exec(n);if(!e)throw new Error("nota inválida: "+n);return 12*(+e[3]+1)+$d[e[1]]+(e[2]==="#"?1:e[2]==="b"?-1:0)}const Lh={"":[0,4,7],m:[0,3,7],7:[0,4,7,10],maj7:[0,4,7,11],m7:[0,3,7,10],m7b5:[0,3,6,10],6:[0,4,7,9],m6:[0,3,7,9],9:[0,4,10,14],dim7:[0,3,6,9],sus4:[0,5,7],"7sus4":[0,5,7,10],add9:[0,4,7,14]};function kh(n){const e=/^([A-G])([#b]?)(.*)$/.exec(n);if(!e||Lh[e[3]]==null)throw new Error("acorde inválido: "+n);const t=$d[e[1].toLowerCase()]+(e[2]==="#"?1:e[2]==="b"?-1:0),i=Lh[e[3]],s=i.map(o=>{let r=t+60+o;for(;r>72;)r-=12;for(;r<57;)r+=12;return r}).sort((o,r)=>o-r).filter((o,r,l)=>l.indexOf(o)===r);let a=t+36;for(;a<34;)a+=12;for(;a>45;)a-=12;return{rootPc:t,ints:i,comp:s,bass:a}}function d1(n){const e=[];let t=0;for(const i of n.replace(/\|/g," ").trim().split(/\s+/)){if(!i)continue;const s=i.split(":"),a=parseFloat(s[1]??"1");s[0]!=="r"&&e.push({beat:t,dur:a,midi:h1(s[0]),vel:+(s[2]??.8)}),t+=a}return e}const yt=(n,e=.8)=>n.map(t=>[t,e]),Dh={bossaLite:{shaker:[[0,.5],[2,.3],[4,.45],[6,.3],[8,.5],[10,.3],[12,.45],[14,.3]],rim:yt([0,3,8,10,13],.5),kick:[[0,.5],[8,.45]]},bossaFull:{shaker:[[0,.55],[1,.2],[2,.3],[3,.2],[4,.5],[5,.2],[6,.3],[7,.2],[8,.55],[9,.2],[10,.3],[11,.2],[12,.5],[13,.2],[14,.3],[15,.2]],rim:yt([0,3,8,10,13],.6),kick:[[0,.6],[6,.25],[8,.5],[14,.3]]},baiao:{kick:[[0,.95],[6,.7],[8,.55],[14,.4]],rim:[[8,.6]],triC:[[0,.5],[2,.3],[6,.3],[8,.5],[10,.3],[14,.3]],triO:[[4,.55],[12,.55]]},baiaoFull:{kick:[[0,1],[6,.75],[8,.6],[14,.45]],rim:[[4,.4],[8,.65],[13,.3]],triC:[[0,.5],[2,.35],[6,.35],[8,.5],[10,.35],[14,.35]],triO:[[4,.6],[12,.6]],shaker:yt([0,2,4,6,8,10,12,14],.22)},baiaoBrk:{kick:[[0,1],[6,.8]],triC:yt([0,2,4,6,8,10,12,14],.45),triO:[[4,.6],[12,.6]]},sambaLite:{surdo:[[4,.7],[12,1]],tamb:yt([0,3,4,6,10,11,14],.5),choc:yt([0,2,4,6,8,10,12,14],.3)},sambaFull:{surdo:[[4,.75],[12,1],[14,.35]],tamb:yt([0,2,3,5,6,8,10,11,13,14],.55),agogoH:yt([0,6,10],.5),agogoL:yt([3,13],.5),choc:yt([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],.26),kick:[[4,.35],[12,.5]]},sambaBrk:{surdo:[[4,.8],[12,1]],choc:yt([0,2,4,6,8,10,12,14],.35),agogoH:yt([0,6,10],.55),agogoL:yt([3,13],.55)},surf:{kick:[[0,.8],[8,.7],[11,.35]],snare:[[4,.7],[12,.75]],hatC:yt([0,2,4,6,8,10,12,14],.4),shaker:yt([1,3,5,7,9,11,13,15],.18)},surfFull:{kick:[[0,.85],[8,.75],[11,.4]],snare:[[4,.75],[12,.8],[15,.25]],hatC:yt([0,2,4,6,10,12,14],.45),hatO:[[8,.4]],shaker:yt([1,3,5,7,9,11,13,15],.2)},choro:{kick:[[0,.75],[8,.7]],rim:[[4,.6],[12,.6]],hatC:yt([2,6,10,14],.5),shaker:yt([0,4,8,12],.2)},choroFull:{kick:[[0,.8],[8,.75],[14,.3]],rim:[[4,.65],[12,.65]],snare:[[7,.2],[15,.25]],hatC:yt([2,6,10,14],.55),shaker:yt([0,1,4,5,8,9,12,13],.22)},desert:{kick:[[0,.9],[10,.6]],tomL:[[3,.4],[11,.35]],shaker:yt([0,2,4,6,8,10,12,14],.3),snare:[[4,.25],[12,.3]]},desertFull:{kick:[[0,.95],[7,.3],[10,.65]],tomL:[[3,.45],[11,.4],[13,.3]],shaker:yt([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],.2),snare:[[4,.3],[12,.4]],rim:[[6,.3],[14,.35]]},frevo:{kick:[[0,.9],[8,.85]],snare:[[2,.3],[4,.7],[7,.3],[10,.3],[12,.75],[15,.35]],hatC:yt([0,2,4,6,8,10,12,14],.4),surdo:[[0,.5],[8,.5]]},frevoFull:{kick:[[0,.95],[8,.9],[11,.3]],snare:[[0,.3],[2,.35],[4,.75],[6,.3],[7,.35],[10,.35],[12,.8],[14,.3],[15,.4]],hatC:yt([0,2,4,6,8,10,12,14],.45),surdo:[[0,.55],[8,.55]]},fill:{snare:[[8,.4],[10,.5],[12,.6],[13,.65],[14,.75],[15,.85]],kick:[[0,.9]],tomL:[[11,.5]]}},u1={bossa:[[0,6,"r",.9],[8,5,"5",.8],[14,2,"a",.5]],baiao:[[0,3,"r",1],[3,3,"5",.55],[6,2,"r",.8],[8,3,"r",.85],[11,3,"5",.5],[14,2,"a",.5]],samba:[[0,3,"r",.6],[4,4,"5",.85],[8,3,"r",.7],[12,2,"5",.9],[14,2,"a",.45]],pump:[[0,2,"r",.9],[2,2,"r",.6],[4,2,"5",.8],[6,2,"r",.6],[8,2,"r",.85],[10,2,"5",.7],[12,2,"r",.7],[14,2,"a",.6]],walk:[[0,4,"r",.85],[4,4,"3",.7],[8,4,"5",.8],[12,4,"a",.7]],longo:[[0,10,"r",.9],[10,4,"5",.6],[14,2,"a",.45]]};function f1(n,e,t){let i=n.bass;for(t==="5"?i+=7:t==="3"?i+=n.ints[1]??4:t==="b7"?i+=10:t==="o"?i+=12:t==="a"&&(i=e.bass-1,Math.abs(i-n.bass)>7&&(i=e.bass+1));i>50;)i-=12;for(;i<33;)i+=12;return i}const Ih={bossa:[[[0,2,.5],[6,3,.8],[12,2,.55]],[[2,2,.6],[6,2,.5],[10,3,.8]]],cav:[[[2,1,.6],[6,1,.9],[10,1,.6],[14,1,.9]],[[2,1,.6],[6,1,.85],[10,1,.65],[13,1,.5],[14,1,.8]]],ska:[[[4,2,.9],[12,2,.85]],[[4,2,.85],[12,2,.9],[14,1,.4]]],calmo:[[[0,8,.55],[8,8,.5]],[[0,8,.5],[10,5,.55]]],pulso:[[[0,3,.6],[8,3,.65],[14,2,.4]],[[0,3,.6],[6,2,.4],[8,3,.6]]]},p1={name:"Beira da Tarde",bpm:96,swing:.12,lead:"nylon",compV:"ep",ctrV:"flute",mels:{i:"r:2 e5:0.5 d5:0.5 c5:0.5 d5:0.5 | e5:1.5 g5:0.5 e5:2 | r:1 a5:0.5 g5:0.5 e5:0.5 d5:0.5 c5:1 | d5:3 r:1",a:`r:0.5 e5:0.5 g5:0.5 e5:0.5 c5:1.5 r:0.5 | r:0.5 f5:0.5 a5:0.5 f5:0.5 d5:1.5 r:0.5 | r:0.5 d5:0.5 f5:0.5 d5:0.5 b4:1.5 r:0.5 | c5:2.5 g4:0.5 a4:0.5 b4:0.5
       | c5:0.5 e5:0.5 g5:1 e5:1 c5:1 | f#5:0.5 e5:0.5 d5:1 a4:1 c5:1 | d5:1.5 f5:0.5 a5:1 f5:1 | g5:0.5 f5:0.5 d5:0.5 b4:0.5 d5:2
       | e5:1 g5:1 b5:1.5 r:0.5 | a5:0.5 g5:0.5 e5:0.5 c#5:0.5 e5:1.5 r:0.5 | f5:1 e5:0.5 d5:0.5 c5:1 a4:1 | b4:2 d5:1 f5:1
       | e5:3 r:1 | c5:0.5 ab4:0.5 f4:0.5 ab4:0.5 c5:1 d5:1 | e5:1 g5:1 e5:1 c#5:1 | d5:1 f5:1 b4:1 d5:0.5 e5:0.5`,b:`a5:1 g5:0.5 f5:0.5 c5:2 | f5:1 d5:1 c5:1.5 ab4:0.5 | g4:0.5 c5:0.5 e5:0.5 g5:0.5 e5:2 | e5:0.5 g5:0.5 bb5:1 g5:1 e5:1
       | a5:1.5 c6:0.5 a5:1 g5:1 | f5:1 d5:1 ab4:1 c5:1 | b4:0.5 d5:0.5 g5:1 e5:2 | c#5:0.5 e5:0.5 a5:1 g5:1 e5:1
       | f5:1.5 e5:0.5 d5:1 c5:1 | b4:1 d5:1 f5:1.5 r:0.5 | g5:1 e5:1 b4:1 d5:1 | c5:1 e5:1 a5:1.5 r:0.5
       | d5:0.5 e5:0.5 f5:0.5 a5:0.5 f5:1 e5:1 | d5:1 b4:1 f5:1 d5:1 | e5:2 g5:1 c6:1 | c5:3 r:1`,p:`eb5:1 c5:1 ab4:1.5 r:0.5 | d5:1 b4:1 g4:1.5 r:0.5 | eb5:0.5 f5:0.5 g5:1 eb5:1 c5:1 | d5:0.5 f5:0.5 b4:1 d5:2
       | a5:1 g5:1 f5:1 e5:1 | f5:1 d5:1 c5:1 ab4:1 | a4:0.5 c5:0.5 d5:0.5 f5:0.5 e5:1 d5:1 | d5:1 b4:1 g4:2`},secs:[{bars:4,ch:"Cmaj7 Am7 Dm7 G7",mel:"i",drums:"bossaLite",bass:"bossa",comp:"bossa",mix:.7},{bars:16,ch:"Cmaj7 Dm7 G7 Cmaj7 Am7 D7 Dm7 G7 Em7 A7 Dm7 G7 Cmaj7 Fm6 Em7,A7 Dm7,G7",mel:"a",drums:"bossaLite",bass:"bossa",comp:"bossa",mix:.8},{bars:16,ch:"Fmaj7 Fm6 Cmaj7 C7 Fmaj7 Fm6 Em7 A7 Dm7 G7 Em7 Am7 Dm7 G7 Cmaj7 Cmaj7",mel:"b",drums:"bossaFull",bass:"bossa",comp:"bossa",mix:.95},{bars:16,ch:"Cmaj7 Dm7 G7 Cmaj7 Am7 D7 Dm7 G7 Em7 A7 Dm7 G7 Cmaj7 Fm6 Em7,A7 Dm7,G7",mel:"a",drums:"bossaFull",bass:"bossa",comp:"bossa",ctr:!0,mix:.9},{bars:8,ch:"Abmaj7 G7 Abmaj7 G7 Fmaj7 Fm6 Dm7 G7",mel:"p",drums:"bossaLite",bass:"bossa",comp:"calmo",pad:!0,mix:.7},{bars:16,ch:"Fmaj7 Fm6 Cmaj7 C7 Fmaj7 Fm6 Em7 A7 Dm7 G7 Em7 Am7 Dm7 G7 Cmaj7 Cmaj7",mel:"b",drums:"bossaFull",bass:"bossa",comp:"bossa",ctr:!0,mix:1}],loopFrom:1},m1={name:"Forró do Quintal",bpm:112,swing:.18,lead:"sanfona",compV:"nylon",ctrV:"sanfona",mels:{i:"g4:0.5 b4:0.5 d5:0.5 g5:0.5 f5:0.5 d5:0.5 b4:0.5 f4:0.5 | g4:0.5 b4:0.5 d5:0.5 g5:0.5 a5:1 g5:1 | e5:0.5 f5:0.5 e5:0.5 d5:0.5 c5:0.5 b4:0.5 a4:0.5 g4:0.5 | b4:0.5 c5:0.5 d5:1 g4:2",a:`b4:0.5 d5:0.5 d5:1 r:0.5 d5:0.5 e5:0.5 d5:0.5 | b4:0.5 g4:0.5 b4:1 d5:1 r:1 | c5:0.5 e5:0.5 e5:1 e5:0.5 f5:0.5 e5:0.5 d5:0.5 | b4:1 g4:1 d5:1.5 r:0.5
       | d5:0.5 g5:0.5 g5:1 f5:0.5 e5:0.5 d5:1 | f5:0.5 e5:0.5 f5:1 c5:1 a4:1 | e5:0.5 g5:0.5 e5:0.5 c5:0.5 e5:1 g5:1 | d5:0.5 b4:0.5 a4:0.5 b4:0.5 g4:2
       | g5:0.5 f5:0.5 d5:0.5 b4:0.5 d5:1 g5:1 | g5:0.5 a5:0.5 b5:1 a5:0.5 g5:0.5 f5:1 | e5:0.5 g5:0.5 g5:1 e5:0.5 c5:0.5 e5:1 | d5:1 b4:1 g4:1.5 r:0.5
       | d5:0.5 e5:0.5 f5:0.5 e5:0.5 d5:1 b4:1 | c5:0.5 a4:0.5 c5:1 f5:1 e5:1 | e5:0.5 c5:0.5 g5:1 e5:0.5 c5:0.5 g4:1 | a4:0.5 b4:0.5 g4:2.5 r:0.5`,b:`e5:1 g5:1 g5:0.5 f#5:0.5 e5:1 | e5:0.5 d5:0.5 c5:1 e5:1 g4:1 | b4:0.5 d5:0.5 d5:1 b4:0.5 g4:0.5 b4:1 | a4:0.5 b4:0.5 c5:0.5 b4:0.5 a4:1 f#4:1
       | e5:1 g5:1 b5:1.5 r:0.5 | a5:0.5 g5:0.5 e5:1 c5:1 e5:1 | f#5:0.5 a5:0.5 a5:1 f#5:0.5 d5:0.5 a4:1 | b4:0.5 c5:0.5 d5:1 g4:2
       | e5:0.5 b4:0.5 e5:0.5 g5:0.5 f#5:0.5 e5:0.5 b4:1 | c5:0.5 e5:0.5 g5:1 e5:0.5 c5:0.5 g4:1 | d5:0.5 b4:0.5 d5:1 g5:1 b4:1 | a4:0.5 c5:0.5 f#5:1 a5:1 c5:1
       | b4:1 e5:1 g5:1 b5:1 | a5:1 g5:0.5 e5:0.5 c5:2 | a4:0.5 c5:0.5 d5:0.5 f#5:0.5 a5:1 c6:1 | b5:0.5 a5:0.5 g5:2.5 r:0.5`},secs:[{bars:4,ch:"G G G G",mel:"i",drums:"baiao",bass:"baiao",comp:"pulso",mix:.75},{bars:16,ch:"G G C G G F C G G G C G G F C G",mel:"a",drums:"baiao",bass:"baiao",comp:"pulso",mix:.85},{bars:16,ch:"Em C G D Em C D G Em C G D7 Em C D7 G",mel:"b",drums:"baiaoFull",bass:"baiao",comp:"pulso",mix:1},{bars:4,ch:"G G F,C G",drums:"baiaoBrk",bass:"baiao",mix:.8},{bars:16,ch:"G G C G G F C G G G C G G F C G",mel:"a",drums:"baiaoFull",bass:"baiao",comp:"pulso",ctr:!0,mix:.95},{bars:16,ch:"Em C G D Em C D G Em C G D7 Em C D7 G",mel:"b",drums:"baiaoFull",bass:"baiao",comp:"pulso",ctr:!0,mix:1}],loopFrom:1},g1={name:"Onda de Verão",bpm:104,swing:.1,lead:"flute",compV:"ep",ctrV:"nylon",mels:{i:"r:1 a4:0.5 c5:0.5 e5:1 f5:1 | g5:2 f5:0.5 e5:0.5 d5:1 | c5:1.5 e5:0.5 g5:2 | bb4:1 g4:1 c5:2",a:`a5:1.5 g5:0.5 f5:1 c5:1 | e5:0.5 f5:0.5 g5:0.5 a5:0.5 f5:2 | d5:1 f5:1 bb5:1.5 r:0.5 | db5:0.5 f5:0.5 bb4:1 db5:1 f4:1
       | e5:1 c5:1 g5:1.5 r:0.5 | f#5:0.5 a5:0.5 c6:1 a5:0.5 f#5:0.5 d5:1 | g5:1 d5:1 bb4:1 d5:1 | e5:0.5 g5:0.5 bb5:1 g5:1 e5:1
       | c6:1 a5:1 g5:0.5 f5:0.5 e5:1 | f5:0.5 g5:0.5 a5:1 c6:1 a5:1 | bb5:1.5 a5:0.5 f5:1 d5:1 | g5:1 f5:1 db5:1 bb4:1
       | c5:0.5 e5:0.5 g5:1 e5:1 c5:1 | d5:0.5 f#5:0.5 a5:1 c6:1.5 r:0.5 | bb5:1 a5:0.5 g5:0.5 d5:1 g5:1 | e5:1 g5:1 c5:2`,b:`f5:1 e5:0.5 d5:0.5 a4:1 d5:1 | b4:1 d5:1 f5:1 g5:1 | f5:0.5 g5:0.5 a5:1 f5:1 d5:1 | e5:1 g5:1 bb5:1 c6:1
       | c6:1.5 a5:0.5 e5:1 g5:1 | f5:1 a5:1 d5:1.5 r:0.5 | d5:0.5 g5:0.5 bb5:1 a5:0.5 g5:0.5 d5:1 | e5:2 g5:1 bb5:1
       | a5:1 f5:1 d5:1 f5:1 | d5:0.5 f5:0.5 b4:1 d5:1 f5:1 | db5:1 f5:1 g5:1 f5:1 | g5:0.5 f5:0.5 db5:1 bb4:2
       | e5:1 g5:1 a5:1.5 r:0.5 | f#5:1 a5:1 c6:1 d6:1 | d6:1 bb5:1 g5:1 f5:1 | e5:1 d5:0.5 bb4:0.5 c5:2`,p:"d5:2 f5:1 a5:1 | db5:2 f5:1 g5:1 | a5:2 g5:1 f5:1 | f#5:1 a5:1 c6:1.5 r:0.5 | bb5:1 g5:1 d5:1.5 r:0.5 | e5:1 g5:1 bb5:1 g5:1 | a5:3 r:1 | g5:1 e5:1 bb4:1 c5:1"},secs:[{bars:4,ch:"Fmaj7 Gm7 Am7 C7",mel:"i",drums:"surf",bass:"bossa",comp:"calmo",mix:.7},{bars:16,ch:"Fmaj7 Fmaj7 Bbmaj7 Bbm6 Am7 D7 Gm7 C7 Fmaj7 Fmaj7 Bbmaj7 Bbm6 Am7 D7 Gm7 C7",mel:"a",drums:"surf",bass:"bossa",comp:"pulso",mix:.85},{bars:16,ch:"Dm7 G7 Bbmaj7 C7 Am7 Dm7 Gm7 C7 Dm7 G7 Bbm6 C7 Am7 D7 Gm7 C7",mel:"b",drums:"surfFull",bass:"samba",comp:"pulso",mix:1},{bars:8,ch:"Bbmaj7 Bbm6 Fmaj7 D7 Gm7 C7 Fmaj7 C7",mel:"p",drums:"surf",bass:"bossa",comp:"calmo",pad:!0,mix:.72},{bars:16,ch:"Fmaj7 Fmaj7 Bbmaj7 Bbm6 Am7 D7 Gm7 C7 Fmaj7 Fmaj7 Bbmaj7 Bbm6 Am7 D7 Gm7 C7",mel:"a",drums:"surfFull",bass:"samba",comp:"pulso",ctr:!0,mix:.95},{bars:16,ch:"Dm7 G7 Bbmaj7 C7 Am7 Dm7 Gm7 C7 Dm7 G7 Bbm6 C7 Am7 D7 Gm7 C7",mel:"b",drums:"surfFull",bass:"samba",comp:"pulso",ctr:!0,mix:1}],loopFrom:1},v1={name:"Samba do Meio-Fio",bpm:100,swing:.22,lead:"nylon",compV:"cavaq",ctrV:"flute",mels:{i:"r:1 d5:0.5 f5:0.5 g5:1 bb5:1 | g5:0.5 e5:0.5 c5:1 e5:2 | f5:0.5 a5:0.5 c6:1 a5:0.5 f5:0.5 c5:1 | d5:0.5 c5:0.5 a4:1 f#4:2",a:`r:0.5 d5:0.5 f5:0.5 g5:0.5 f5:1 d5:1 | r:0.5 e5:0.5 g5:0.5 bb5:0.5 g5:1 e5:1 | c5:0.5 e5:0.5 g5:1 e5:0.5 c5:0.5 e5:1 | f#5:0.5 a5:0.5 c6:1 a5:0.5 f#5:0.5 d5:1
       | g5:1 f5:0.5 d5:0.5 bb4:1 d5:1 | e5:0.5 g5:0.5 bb5:1 g5:0.5 e5:0.5 c5:1 | f5:1.5 a5:0.5 c6:1 a5:1 | g5:0.5 f5:0.5 d5:0.5 c5:0.5 a4:1 c5:1
       | d5:0.5 g5:0.5 g5:1 f5:0.5 d5:0.5 g5:1 | e5:0.5 c5:0.5 e5:1 g5:0.5 bb5:0.5 g5:1 | a5:1 e5:1 c5:1 e5:1 | d5:0.5 f#5:0.5 a5:1 c6:1 a5:1
       | bb5:0.5 a5:0.5 g5:1 f5:0.5 d5:0.5 bb4:1 | c5:0.5 e5:0.5 g5:1 bb5:1 e5:1 | f5:2 a5:1 c6:1 | c6:0.5 a5:0.5 f5:1 a5:1 c5:1`,b:`d5:1 f5:1 bb5:1.5 r:0.5 | b4:0.5 d5:0.5 f5:1 ab5:1 f5:1 | e5:1 c5:1 g5:1.5 r:0.5 | f#5:0.5 e5:0.5 d5:1 c5:1 a4:1
       | bb4:0.5 d5:0.5 f5:1 g5:1 f5:1 | e5:0.5 g5:0.5 bb5:1.5 g5:0.5 e5:1 | a5:1 g5:0.5 f5:0.5 c5:1 a4:1 | a4:0.5 c5:0.5 d5:1 f#5:1 a5:1
       | bb5:1 f5:1 d5:1 f5:1 | ab5:0.5 f5:0.5 d5:1 b4:1 d5:1 | c5:0.5 e5:0.5 g5:1 e5:1 c5:1 | d5:1 f#5:1 a5:1 c6:1
       | d6:0.5 c6:0.5 bb5:1 g5:0.5 f5:0.5 d5:1 | e5:0.5 g5:0.5 bb5:1 g5:1 e5:1 | f5:1 c5:1 a5:1.5 r:0.5 | a5:0.5 c6:0.5 f5:2.5 r:0.5`,p:"g5:2 f5:1 d5:1 | e5:2 g5:1 bb5:1 | g5:1 d5:1 bb4:1.5 r:0.5 | c5:0.5 e5:0.5 g5:1 bb5:1 e5:1 | f5:1 bb5:1 d6:1.5 r:0.5 | b4:0.5 d5:0.5 f5:1 ab5:1 f5:1 | e5:1 g5:1 c6:1.5 r:0.5 | f#5:0.5 a5:0.5 c6:1 a5:1 f#5:1"},secs:[{bars:4,ch:"Gm7 C7 F6 D7",mel:"i",drums:"sambaLite",bass:"samba",comp:"cav",mix:.75},{bars:16,ch:"Gm7 C7 Am7 D7 Gm7 C7 F6 F6 Gm7 C7 Am7 D7 Gm7 C7 F6 F6",mel:"a",drums:"sambaLite",bass:"samba",comp:"cav",mix:.85},{bars:16,ch:"Bb6 Bdim7 Am7 D7 Gm7 C7 F6 D7 Bb6 Bdim7 Am7 D7 Gm7 C7 F6 F6",mel:"b",drums:"sambaFull",bass:"samba",comp:"cav",mix:1},{bars:8,ch:"Gm7 C7 Gm7 C7 Bb6 Bdim7 Am7 D7",mel:"p",drums:"sambaBrk",bass:"samba",comp:"cav",mix:.8},{bars:16,ch:"Gm7 C7 Am7 D7 Gm7 C7 F6 F6 Gm7 C7 Am7 D7 Gm7 C7 F6 F6",mel:"a",drums:"sambaFull",bass:"samba",comp:"cav",ctr:!0,mix:.95},{bars:16,ch:"Bb6 Bdim7 Am7 D7 Gm7 C7 F6 D7 Bb6 Bdim7 Am7 D7 Gm7 C7 F6 F6",mel:"b",drums:"sambaFull",bass:"samba",comp:"cav",ctr:!0,mix:1}],loopFrom:1},b1={name:"Xícara & Colher",bpm:118,swing:.2,lead:"marimba",compV:"nylon",ctrV:"flute",mels:{i:"e5:0.5 a5:0.5 e5:0.5 c5:0.5 a4:1 r:1 | b4:0.5 e5:0.5 g#5:0.5 b5:0.5 g#5:1 e5:1 | a5:1 e5:0.5 c5:0.5 a4:2 | b4:0.5 d5:0.5 g#4:0.5 b4:0.5 e5:2",a:`a4:0.5 c5:0.5 e5:0.5 a5:0.5 e5:0.5 c5:0.5 e5:0.5 a4:0.5 | g#4:0.5 b4:0.5 e5:0.5 d5:0.5 b4:0.5 g#4:0.5 b4:0.5 e4:0.5 | a4:0.5 c5:0.5 e5:0.5 c5:0.5 a5:1 r:1 | a5:0.5 g5:0.5 e5:0.5 c#5:0.5 e5:1 g5:1
       | f5:0.5 e5:0.5 d5:0.5 f5:0.5 a5:1 f5:1 | g5:0.5 f5:0.5 d5:0.5 b4:0.5 d5:1 f5:1 | e5:0.5 c5:0.5 g4:0.5 c5:0.5 e5:1 g5:1 | g#5:0.5 b5:0.5 e5:1 d5:1 b4:1
       | a4:0.5 e5:0.5 a5:0.5 e5:0.5 c5:0.5 e5:0.5 a4:0.5 e5:0.5 | g#4:0.5 d5:0.5 e5:0.5 d5:0.5 b4:1 g#4:1 | c5:0.5 e5:0.5 a5:1 e5:0.5 c5:0.5 a4:1 | e5:0.5 g5:0.5 a5:0.5 g5:0.5 e5:0.5 c#5:0.5 e5:1
       | d5:0.5 f5:0.5 a5:0.5 f5:0.5 d5:1 f5:1 | b4:0.5 d5:0.5 f5:0.5 d5:0.5 g5:1 b4:1 | c5:1 e5:0.5 g5:0.5 c6:2 | b5:0.5 g#5:0.5 e5:1 d5:1 b4:1`,b:`e5:0.5 g5:0.5 c6:1 g5:0.5 e5:0.5 g5:1 | d5:0.5 f5:0.5 b5:1 f5:0.5 d5:0.5 f5:1 | e5:1 c6:1 g5:1.5 r:0.5 | e5:0.5 g5:0.5 bb5:1 g5:1 e5:1
       | f5:0.5 a5:0.5 c6:1 a5:0.5 f5:0.5 a5:1 | ab5:1 f5:1 d5:1 f5:1 | e5:1 g5:1 c#5:1 e5:1 | d5:0.5 f5:0.5 a5:1 b4:0.5 d5:0.5 f5:1
       | e5:0.5 g5:0.5 c6:0.5 e6:0.5 c6:0.5 g5:0.5 e5:0.5 g5:0.5 | f5:0.5 d5:0.5 b4:0.5 d5:0.5 g5:1 f5:1 | e5:1 g5:1 c6:1 e5:1 | e5:0.5 g5:0.5 bb5:1 c6:1 bb5:1
       | a5:1 c6:1 f5:1.5 r:0.5 | g5:0.5 f5:0.5 d5:1 b4:1 d5:1 | c5:0.5 e5:0.5 g5:1 e5:1 c5:1 | c5:2.5 r:1.5`},secs:[{bars:4,ch:"Am E7 Am E7",mel:"i",drums:"choro",bass:"walk",comp:"ska",mix:.75},{bars:16,ch:"Am E7 Am A7 Dm G7 C E7 Am E7 Am A7 Dm G7 C E7",mel:"a",drums:"choro",bass:"walk",comp:"ska",mix:.85},{bars:16,ch:"C G7 C C7 F Fm6 C,A7 Dm7,G7 C G7 C C7 F G7 C C",mel:"b",drums:"choroFull",bass:"walk",comp:"ska",mix:1},{bars:4,ch:"Am E7 Am E7",drums:"choroFull",bass:"pump",comp:"ska",mix:.85},{bars:16,ch:"Am E7 Am A7 Dm G7 C E7 Am E7 Am A7 Dm G7 C E7",mel:"a",drums:"choroFull",bass:"walk",comp:"ska",ctr:!0,mix:.95},{bars:16,ch:"C G7 C C7 F Fm6 C,A7 Dm7,G7 C G7 C C7 F G7 C C",mel:"b",drums:"choroFull",bass:"walk",comp:"ska",ctr:!0,mix:1}],loopFrom:1},y1={name:"Poeira na Trilha",bpm:92,swing:.08,lead:"twang",compV:"nylon",ctrV:"sanfona",mels:{i:"e4:1 g4:1 a4:1 b4:1 | e5:2.5 r:1.5 | d5:1 b4:1 a4:1 g4:1 | e4:3 r:1",a:`e4:1 g4:1 b4:1.5 r:0.5 | a4:0.5 g4:0.5 e4:2.5 r:0.5 | d5:1 b4:1 g4:1.5 r:0.5 | a4:1 c#5:1 e5:1.5 r:0.5
       | g4:0.5 a4:0.5 b4:2 e5:1 | d5:0.5 b4:0.5 g4:1 e4:2 | g4:1 c5:1 e5:1.5 r:0.5 | d#5:1 f#5:1 b4:2
       | b4:0.5 e5:0.5 e5:1 g5:1 f#5:1 | e5:0.5 d5:0.5 b4:1 g4:2 | b4:1 d5:1 g5:1.5 r:0.5 | e5:1 c#5:1 a4:2
       | g4:0.5 b4:0.5 e5:1 g5:1 e5:1 | d5:1 b4:0.5 a4:0.5 g4:2 | c5:1 e5:1 g5:1 e5:1 | f#5:1 d#5:1 b4:2`,b:`a4:1 c5:1 e5:1.5 r:0.5 | g5:0.5 f#5:0.5 e5:1 b4:2 | c5:0.5 e5:0.5 a5:1 e5:1 c5:1 | b4:1 g4:1 e4:2
       | g4:1 c5:1 e5:2 | d5:1 b4:1 g4:2 | f#5:1 d#5:1 b4:1 a4:1 | b4:0.5 d#5:0.5 f#5:1 a5:1 f#5:1
       | e5:1 c5:1 a4:1.5 r:0.5 | b4:0.5 c5:0.5 b4:1 g4:1 e4:1 | a4:0.5 c5:0.5 e5:1 a5:1.5 r:0.5 | g5:1 f#5:0.5 e5:0.5 b4:2
       | c5:1 e5:1 g5:1 c6:1 | b5:1 g5:1 d5:1 b4:1 | a4:1 b4:1 d#5:1 f#5:1 | e5:3 r:1`},secs:[{bars:4,ch:"Em Em Em Em",mel:"i",drums:"desert",bass:"longo",comp:"calmo",mix:.7},{bars:16,ch:"Em Em G A Em Em C B7 Em Em G A Em Em C B7",mel:"a",drums:"desert",bass:"longo",comp:"calmo",mix:.82},{bars:16,ch:"Am Em Am Em C G B7 B7 Am Em Am Em C G B7 B7",mel:"b",drums:"desertFull",bass:"baiao",comp:"pulso",mix:1},{bars:4,ch:"Em Em C,B7 Em",drums:"desertFull",bass:"baiao",mix:.85},{bars:16,ch:"Em Em G A Em Em C B7 Em Em G A Em Em C B7",mel:"a",drums:"desertFull",bass:"baiao",comp:"pulso",ctr:!0,mix:.95},{bars:16,ch:"Am Em Am Em C G B7 B7 Am Em Am Em C G B7 B7",mel:"b",drums:"desertFull",bass:"baiao",comp:"pulso",ctr:!0,mix:1}],loopFrom:1},x1={name:"Frevo do Mercadão",bpm:126,swing:.06,lead:"brass",compV:"ep",ctrV:"brass",mels:{i:"g4:0.5 c5:0.5 e5:0.5 g5:0.5 c6:1 r:1 | e5:0.5 g5:0.5 c6:0.5 e6:0.5 g5:1 r:1 | f5:0.5 d5:0.5 b4:0.5 g4:0.5 d5:0.5 f5:0.5 b4:0.5 d5:0.5 | c5:1 e5:1 g5:1 c6:1",a:`g4:0.5 c5:0.5 e5:0.5 g5:0.5 e5:0.5 c5:0.5 e5:0.5 g4:0.5 | a4:0.5 c5:0.5 e5:0.5 a5:0.5 e5:0.5 c5:0.5 a4:1 | f5:0.5 e5:0.5 d5:0.5 c5:0.5 b4:0.5 a4:0.5 b4:0.5 d5:0.5 | f5:0.5 d5:0.5 b4:0.5 g4:0.5 d5:1 b4:1
       | c5:0.5 e5:0.5 g5:0.5 c6:0.5 g5:0.5 e5:0.5 c5:0.5 e5:0.5 | c#5:0.5 e5:0.5 g5:0.5 a5:0.5 e5:1 c#5:1 | d5:0.5 f5:0.5 a5:0.5 f5:0.5 b4:0.5 d5:0.5 f5:0.5 d5:0.5 | e5:0.5 g5:0.5 c5:2.5 r:0.5
       | e5:0.5 g5:0.5 c6:0.5 g5:0.5 e5:0.5 g5:0.5 c6:0.5 e6:0.5 | e6:0.5 c6:0.5 a5:0.5 e5:0.5 c5:0.5 e5:0.5 a5:1 | f5:0.5 a5:0.5 f5:0.5 d5:0.5 a4:0.5 d5:0.5 f5:0.5 a5:0.5 | g5:0.5 f5:0.5 d5:0.5 b4:0.5 d5:1 f5:1
       | e5:0.5 c5:0.5 g5:0.5 e5:0.5 c6:0.5 g5:0.5 e5:0.5 c5:0.5 | a5:0.5 g5:0.5 e5:0.5 c#5:0.5 e5:1 g5:1 | f5:0.5 a5:0.5 d5:0.5 f5:0.5 b4:0.5 d5:0.5 f5:0.5 b4:0.5 | c5:1 e5:0.5 g5:0.5 c6:2`,b:`a5:0.5 f5:0.5 c5:0.5 f5:0.5 a5:1 c6:1 | g5:0.5 e5:0.5 c5:0.5 e5:0.5 g5:1 e5:1 | f5:0.5 d5:0.5 b4:0.5 d5:0.5 f5:1 d5:1 | e5:0.5 g5:0.5 c6:1 g5:1 e5:1
       | c6:0.5 a5:0.5 f5:0.5 a5:0.5 c6:1 a5:1 | eb5:0.5 f#5:0.5 a5:0.5 c6:0.5 a5:1 f#5:1 | g5:0.5 e5:0.5 c5:0.5 e5:0.5 g5:0.5 a5:0.5 c#5:0.5 e5:0.5 | d5:0.5 f5:0.5 a5:0.5 f5:0.5 d5:0.5 b4:0.5 d5:0.5 f5:0.5
       | c6:1 a5:0.5 f5:0.5 a5:1 c6:1 | g5:1 e5:0.5 c5:0.5 e5:1 g5:1 | d5:0.5 f5:0.5 b5:1 f5:1 d5:1 | c6:2 g5:1 e5:1
       | f5:1 a5:1 c6:1.5 r:0.5 | eb5:0.5 c6:0.5 a5:1 f#5:1 a5:1 | g5:0.5 e5:0.5 c5:0.5 e5:0.5 a4:0.5 c#5:0.5 e5:0.5 g5:0.5 | f5:0.5 d5:0.5 b4:0.5 d5:0.5 c5:2`},secs:[{bars:4,ch:"C C G7 C",mel:"i",drums:"frevo",bass:"pump",comp:"ska",mix:.8},{bars:16,ch:"C Am7 Dm7 G7 C A7 Dm7,G7 C C Am7 Dm7 G7 C A7 Dm7,G7 C",mel:"a",drums:"frevo",bass:"pump",comp:"ska",mix:.9},{bars:16,ch:"F C G7 C F F#dim7 C,A7 Dm7,G7 F C G7 C F F#dim7 C,A7 Dm7,G7",mel:"b",drums:"frevoFull",bass:"pump",comp:"ska",mix:1},{bars:4,ch:"C C G7,C C",drums:"frevoFull",bass:"pump",mix:.9},{bars:16,ch:"C Am7 Dm7 G7 C A7 Dm7,G7 C C Am7 Dm7 G7 C A7 Dm7,G7 C",mel:"a",drums:"frevoFull",bass:"pump",comp:"ska",ctr:!0,mix:.95},{bars:16,ch:"F C G7 C F F#dim7 C,A7 Dm7,G7 F C G7 C F F#dim7 C,A7 Dm7,G7",mel:"b",drums:"frevoFull",bass:"pump",comp:"ska",ctr:!0,mix:1}],loopFrom:1},_1={menu:p1,forro:m1,praia:g1,samba:v1,choro:b1,deserto:y1,frevo:x1},M1={quintal:"forro",jardim:"forro",parquinho:"forro",praia:"praia",piscina:"praia",calcada:"samba",laje:"samba",varanda:"samba",cozinha:"choro",deserto:"deserto",estrada:"deserto",obra:"deserto",feira:"frevo",garagem:"frevo",sinuca:"choro",geladeira:"praia",bancada:"frevo",sala:"samba"},S1=n=>M1[n]||"samba";let Ys=null;function Nh(n){if(Ys)return Ys;const e=Math.floor(n.sampleRate*1.4),t=n.createBuffer(2,e,n.sampleRate);for(let i=0;i<2;i++){const s=t.getChannelData(i);for(let a=0;a<e;a++)s[a]=(Math.random()*2-1)*Math.exp(-3.2*a/e)}return Ys=n.createConvolver(),Ys.buffer=t,Ys}let js=null;function qd(n){if(js)return js;const e=n.sampleRate;js=n.createBuffer(1,e,n.sampleRate);const t=js.getChannelData(0);for(let i=0;i<e;i++)t[i]=Math.random()*2-1;return js}function Ht(n,e,t,i,s,a=0){const o=n.createOscillator();return o.type=e,o.frequency.value=t,o.detune.value=a,o.start(i),o.stop(s),o}function yi(n,e,t,i,s,a){const o=n.createGain();return o.gain.setValueAtTime(1e-4,e),o.gain.linearRampToValueAtTime(i,e+t),o.gain.setValueAtTime(i,Math.max(e+t,e+s-a)),o.gain.exponentialRampToValueAtTime(8e-4,e+s),o}function Uh(n,e,t,i,s,a){const o=n.createOscillator();o.frequency.value=i;const r=n.createGain();r.gain.setValueAtTime(0,t),r.gain.linearRampToValueAtTime(s,t+a+.25),o.connect(r);for(const l of e)r.connect(l.detune);o.start(t),o.stop(t+8)}function qa(n,e,t,i,s,a,o){const r=i+s+.15;if(e==="nylon"||e==="cavaq"){const l=e==="cavaq"?1.6:1,c=Ht(n,"triangle",t,i,r),h=Ht(n,"sine",t*2,i,r),d=n.createBiquadFilter();d.type="lowpass",d.Q.value=.5,d.frequency.setValueAtTime(2300*l,i),d.frequency.exponentialRampToValueAtTime(900*l,i+Math.min(s,.8));const u=yi(n,i,.006,a*.5,Math.min(s+.12,e==="cavaq"?.35:1.3),.05),f=n.createGain();f.gain.value=.18,c.connect(d),h.connect(f),f.connect(d),d.connect(u),u.connect(o)}else if(e==="ep"){const l=Ht(n,"sine",t,i,r),c=Ht(n,"sine",t*2.01,i,r),h=n.createGain();h.gain.value=.3;const d=yi(n,i,.012,a*.42,s+.1,.08),u=n.createGain();u.gain.value=1;const f=Ht(n,"sine",4.6,i,r),g=n.createGain();g.gain.value=.12,f.connect(g),g.connect(u.gain),l.connect(u),c.connect(h),h.connect(u),u.connect(d),d.connect(o)}else if(e==="sanfona"){const l=Ht(n,"sawtooth",t,i,r,-6),c=Ht(n,"sawtooth",t,i,r,6),h=Ht(n,"sawtooth",t*2,i,r),d=n.createGain();d.gain.value=.22;const u=n.createBiquadFilter();u.type="bandpass",u.frequency.value=950,u.Q.value=.6;const f=yi(n,i,.035,a*.3,s+.05,.07);Uh(n,[l,c,h],i,5.6,6,.14),l.connect(u),c.connect(u),h.connect(d),d.connect(u),u.connect(f),f.connect(o)}else if(e==="flute"){const l=Ht(n,"sine",t,i,r),c=Ht(n,"sine",t*2,i,r),h=n.createGain();h.gain.value=.1;const d=n.createBufferSource();d.buffer=qd(n),d.loop=!0,d.start(i),d.stop(r);const u=n.createBiquadFilter();u.type="bandpass",u.frequency.value=t*2.2,u.Q.value=1.4;const f=n.createGain();f.gain.value=.02;const g=yi(n,i,.06,a*.42,s+.08,.09);Uh(n,[l],i,5.1,8,.2),l.connect(g),c.connect(h),h.connect(g),d.connect(u),u.connect(f),f.connect(g),g.connect(o)}else if(e==="twang"){const l=Ht(n,"sawtooth",t,i,r);l.frequency.setValueAtTime(t*1.025,i),l.frequency.exponentialRampToValueAtTime(t,i+.045);const c=n.createBiquadFilter();c.type="lowpass",c.Q.value=3.2,c.frequency.setValueAtTime(2100,i),c.frequency.exponentialRampToValueAtTime(820,i+Math.min(s,.6));const h=yi(n,i,.005,a*.42,Math.min(s+.15,1.5),.06);l.connect(c),c.connect(h),h.connect(o)}else if(e==="brass"){const l=Ht(n,"sawtooth",t,i,r,-8),c=Ht(n,"sawtooth",t,i,r,8),h=Ht(n,"sawtooth",t*.5,i,r),d=n.createGain();d.gain.value=.25;const u=n.createBiquadFilter();u.type="lowpass",u.Q.value=1,u.frequency.setValueAtTime(700,i),u.frequency.linearRampToValueAtTime(2300,i+.06),u.frequency.exponentialRampToValueAtTime(1300,i+Math.max(.12,s));const f=yi(n,i,.025,a*.3,s+.05,.07);l.connect(u),c.connect(u),h.connect(d),d.connect(u),u.connect(f),f.connect(o)}else if(e==="marimba"){const l=Ht(n,"sine",t,i,r),c=Ht(n,"sine",t*4,i,r),h=n.createGain();h.gain.setValueAtTime(.3,i),h.gain.exponentialRampToValueAtTime(.001,i+.12);const d=yi(n,i,.004,a*.5,Math.min(s+.15,.7),.08);l.connect(d),c.connect(h),h.connect(d),d.connect(o)}}function w1(n,e,t,i,s,a){const o=t+i+.1,r=Ht(n,"sine",e,t,o),l=Ht(n,"triangle",e,t,o),c=n.createGain();c.gain.value=.35;const h=n.createBiquadFilter();h.type="lowpass",h.frequency.value=620,h.Q.value=.4;const d=yi(n,t,.008,s*.62,i,.05);r.connect(h),l.connect(c),c.connect(h),h.connect(d),d.connect(a)}function Fh(n,e,t,i,s){const a=(r,l,c,h,d,u=.001)=>{const f=n.createBufferSource();f.buffer=qd(n);const g=n.createBiquadFilter();g.type=h,g.frequency.value=l,g.Q.value=c;const b=n.createGain();b.gain.setValueAtTime(1e-4,t),b.gain.linearRampToValueAtTime(d,t+u),b.gain.exponentialRampToValueAtTime(8e-4,t+r),f.connect(g),g.connect(b),b.connect(s),f.start(t),f.stop(t+r+.02)},o=(r,l,c,h)=>{const d=n.createOscillator();d.type="sine",d.frequency.setValueAtTime(r,t),d.frequency.exponentialRampToValueAtTime(l,t+c*.8);const u=n.createGain();u.gain.setValueAtTime(h,t),u.gain.exponentialRampToValueAtTime(8e-4,t+c),d.connect(u),u.connect(s),d.start(t),d.stop(t+c+.02)};switch(e){case"kick":o(140,46,.13,i*.85);break;case"surdo":o(84,62,.4,i*.8);break;case"tomL":o(130,92,.25,i*.6);break;case"snare":o(190,150,.05,i*.3),a(.13,1800,.9,"bandpass",i*.4);break;case"rim":a(.035,3900,6,"bandpass",i*.5),o(1750,1500,.02,i*.2);break;case"hatC":a(.04,8e3,1,"highpass",i*.32);break;case"hatO":a(.24,7200,1,"highpass",i*.26);break;case"shaker":a(.07,5200,1.2,"bandpass",i*.3,.018);break;case"choc":a(.05,6200,.8,"bandpass",i*.26,.012);break;case"tamb":a(.04,3e3,4,"bandpass",i*.5),o(1e3,900,.025,i*.25);break;case"agogoH":o(1320,1240,.11,i*.3);break;case"agogoL":o(880,830,.13,i*.3);break;case"triO":o(2960,2900,.4,i*.16),a(.3,9e3,1,"highpass",i*.1);break;case"triC":o(2960,2900,.07,i*.14);break}}let gn=null;function E1(n,e){const t=n.createGain();t.gain.value=0;const i=n.createGain();i.gain.value=1,i.connect(t);const s=n.createGain();s.gain.value=.16,s.connect(Nh(n)),Nh(n).connect(t);const a=n.createGain();a.connect(i),a.connect(s);const o=n.createDelay(1.5);o.delayTime.value=.75*60/e.bpm;const r=n.createGain();r.gain.value=.26;const l=n.createGain();l.gain.value=.13,a.connect(o),o.connect(r),r.connect(o),o.connect(l),l.connect(i);const c=n.createGain();c.gain.value=1,c.connect(i);const h=n.createGain();h.gain.value=.05,c.connect(h),h.connect(s);const d=n.createGain();d.connect(i);const u=n.createGain();u.connect(i);const f=n.createGain();f.gain.value=.4,u.connect(f),f.connect(s);const g=n.createGain();return g.connect(i),g.connect(s),{bus:t,dry:i,wet:s,lead:a,drums:c,bassG:d,compG:u,other:g}}function T1(n,e){const t=n.ch.trim().split(/\s+/),i=t[e%t.length].split(",").map(kh),s=t[(e+1)%t.length].split(",").map(kh)[0];return{cur:i,next:s}}function A1(n){const e=wo(),t=n.song,i=t.secs[n.sec],s=60/t.bpm,a=s*4,o=a/16,r=m=>m%2===1?t.swing*o:0,l=()=>(Math.random()-.5)*.006,c=n.t,h=i.mix??1,{cur:d,next:u}=T1(i,n.bar),f=m=>d[m>=8&&d.length>1?1:0],g=i.bars>=8&&n.bar%8===7,b=Dh[i.drums],p=Dh.fill;for(const m of Object.keys(b)){const y=g&&(m==="snare"||m==="tamb")?[]:b[m];for(const[v,x]of y)Fh(e,m,c+v*o+r(v)+l(),x*h,n.drums)}if(g)for(const m of Object.keys(p))for(const[y,v]of p[m])Fh(e,m,c+y*o+r(y),v*h,n.drums);for(const[m,y,v,x]of u1[i.bass]){const T=f(m),M=d.length>1&&m<8?d[1]:u;w1(e,Xs(f1(T,M,v)),c+m*o+r(m),y*o*1.1,x*h,n.bassG)}if(i.comp){const m=Ih[i.comp][n.bar%Ih[i.comp].length];for(const[y,v,x]of m){const T=f(y);for(const M of T.comp)qa(e,t.compV,Xs(M),c+y*o+r(y)+l(),v*o,x*.55*h,n.compG)}}if(i.pad)for(const m of d[0].comp)qa(e,"ep",Xs(m),c,a*.96,.16,n.other);if(i.ctr){const m=d[0],y=n.bar%2===0?m.ints[1]??4:m.ints[3]??m.ints[2]??7;let v=m.rootPc+48+y;for(;v>62;)v-=12;for(;v<50;)v+=12;qa(e,t.ctrV,Xs(v),c+r(0),a*.9,.2,n.other)}if(i.mel){const m=n.mels[i.mel],y=n.bar*4,v=y+4;for(const x of m)if(x.beat>=y&&x.beat<v){const T=(x.beat-y)*4;qa(e,t.lead,Xs(x.midi),c+T*o+r(Math.round(T))+l(),x.dur*s*.92,x.vel*.85,n.lead)}}n.t+=a,n.bar++,n.bar>=i.bars&&(n.bar=0,n.sec++,n.sec>=t.secs.length&&(n.sec=t.loopFrom??0))}function Xd(){if(!gn)return;const n=wo();if(n&&n.state==="running")for(gn.t<n.currentTime&&(gn.t=n.currentTime+.06);gn.t<n.currentTime+3.2;)A1(gn);gn.timer=window.setTimeout(Xd,350)}function qn(n){const e=wo();if(!e||gn&&gn.id===n)return;if(gn){const a=gn;clearTimeout(a.timer),a.bus.gain.setTargetAtTime(0,e.currentTime,.3),setTimeout(()=>a.bus.disconnect(),1600),gn=null}const t=_1[n];if(!t)return;const i=E1(e,t);i.bus.connect(Yd()),i.bus.gain.setValueAtTime(0,e.currentTime),i.bus.gain.linearRampToValueAtTime(1,e.currentTime+.7);const s={};for(const a of Object.keys(t.mels))s[a]=d1(t.mels[a]);gn={id:n,song:t,sec:0,bar:0,t:e.currentTime+.1,mels:s,timer:0,...i},Xd()}function C1(){return gn?gn.id:null}let Ze=null,Wi,Ti,Es,vs=null,Ks=null,bi=null;const Qt={music:.5,sfx:.8,muted:!1};function Zt(){if(Ze)return!0;try{return Ze=new(window.AudioContext||window.webkitAudioContext),Wi=Ze.createGain(),Wi.gain.value=Qt.muted?0:1,Wi.connect(Ze.destination),Ti=Ze.createGain(),Ti.gain.value=Qt.sfx,Ti.connect(Wi),Es=Ze.createGain(),Es.gain.value=Qt.music,Es.connect(Wi),!0}catch{return!1}}function Vc(){Zt()&&Ze.state==="suspended"&&Ze.resume()}function wo(){return Zt()?Ze:null}function Yd(){return Zt()?Es:null}function jd(){const n=Ze.sampleRate*1,e=Ze.createBuffer(1,n,Ze.sampleRate),t=e.getChannelData(0);for(let i=0;i<n;i++)t[i]=Math.random()*2-1;return e}function en(n,e,t,i,s,a){if(!Ze)return;const o=Ze.createOscillator(),r=Ze.createGain();o.type=i,o.frequency.setValueAtTime(n,e),a&&o.frequency.exponentialRampToValueAtTime(a,e+t),r.gain.setValueAtTime(0,e),r.gain.linearRampToValueAtTime(s,e+.008),r.gain.exponentialRampToValueAtTime(8e-4,e+t),o.connect(r),r.connect(Ti),o.start(e),o.stop(e+t+.02)}function Bi(n,e,t,i,s){if(!Ze)return;const a=Ze.createBufferSource();a.buffer=jd();const o=Ze.createBiquadFilter(),r=Ze.createGain();o.type="bandpass",o.frequency.value=i,o.Q.value=s,r.gain.setValueAtTime(t,n),r.gain.exponentialRampToValueAtTime(8e-4,n+e),a.connect(o),o.connect(r),r.connect(Ti),a.start(n),a.stop(n+e+.02)}const Ct={squeak(){if(!Zt())return;const n=Ze.currentTime;en(880,n,.07,"triangle",.22,260),en(1240,n+.07,.06,"triangle",.16,-180)},vroom(){if(!Zt())return;const n=Ze.currentTime;en(90,n,.5,"sawtooth",.3,340),en(140,n+.04,.42,"square",.14,420),Bi(n,.4,.2,1800,.4)},elastic(n=.5){if(!Zt())return;const e=Ze.currentTime;en(180,e,.16,"sawtooth",.22*(.5+n),320),en(90,e,.2,"sine",.3,140),Bi(e,.05,.12,2400,1)},pop(){if(!Zt())return;const n=Ze.currentTime;Bi(n,.09,.8,900,.6),Bi(n+.04,.3,.4,3200,.5),en(160,n,.12,"sine",.4,-90)},flick(n=.5){if(!Zt())return;const e=Ze.currentTime;en(360+n*340,e,.09,"triangle",.35,220),Bi(e,.05,.25,1400,1.2)},ui(){Zt()&&en(520,Ze.currentTime,.06,"sine",.2,660)},wall(n=1){if(!Zt())return;const e=Ze.currentTime;Bi(e,.09,Math.min(.4,.12+n*.03),240,2),en(150,e,.08,"sine",.2,90)},clack(n=1){if(!Zt())return;const e=Ze.currentTime;Bi(e,.06,Math.min(.45,.15+n*.03),900,3),en(500,e,.05,"square",.15,380)},hole(){if(!Zt())return;const n=Ze.currentTime;en(400,n,.5,"sine",.3,70)},bonus(){if(!Zt())return;const n=Ze.currentTime;[523,659,784,1047].forEach((e,t)=>en(e,n+t*.06,.18,"triangle",.25))},bad(){if(!Zt())return;const n=Ze.currentTime;en(300,n,.25,"sawtooth",.22,140)},win(){if(!Zt())return;const n=Ze.currentTime;[523,659,784,1047,784,1047,1319].forEach((e,t)=>en(e,n+t*.11,.3,"triangle",.3))},slide(n){if(!Zt())return;vs||(vs=Ze.createBufferSource(),vs.buffer=jd(),vs.loop=!0,bi=Ze.createBiquadFilter(),bi.type="bandpass",bi.frequency.value=1200,bi.Q.value=.8,Ks=Ze.createGain(),Ks.gain.value=0,vs.connect(bi),bi.connect(Ks),Ks.connect(Ti),vs.start());const e=Math.min(.22,n*.02);Ks.gain.setTargetAtTime(e,Ze.currentTime,.05),bi&&bi.frequency.setTargetAtTime(700+n*90,Ze.currentTime,.05)}};function Kd(n){Qt.music=n,Es&&(Es.gain.value=n)}function Jd(n){Qt.sfx=n,Ti&&(Ti.gain.value=n)}function Zd(n){Qt.muted=n,Wi&&(Wi.gain.value=n?0:1)}const bs={sprint:{name:"Sprint",ico:"⚡",races:3,desc:"3 pistas rápidas"},copa:{name:"Copa",ico:"🏆",races:5,desc:"5 pistas do nível"},maratona:{name:"Maratona",ico:"🔥",races:7,desc:"7 pistas, fôlego total"},gp:{name:"Grand Prix",ico:"🌍",races:5,desc:"1 de cada nível, dificuldade sobe"}},zn=["Bolha","Zé","Nina","Tato","Duda","Chico","Lila"],ii=class ii{constructor(e,t){this.root=document.getElementById("ui"),this.cfgLevel=0,this.cfgTrack=0,this.cfgPick="specific",this.cfgMode="quick",this.cfgChampFmt="copa",this.cfgTeamSize=2,this.cfgPlayers=[],this.myName="Você",this.edPts=[],this.edObs=[],this.edPatches=[],this.edTool="draw",this.edTheme=0,this.edHalf=4.2,this.edName="Minha Pista",this.edProtect=1,this.edOpenArcs=[],this.edPrevMode="view",this.edPrevDef=null,this.edPrevTrack=null,this.edDragItem=null,this.toastEl=null,this.toastT=0,this.onCampBack=null,this.onCampRetry=null,this.onCampFinale=null,this.rankNet=new Ph,this.rankNetCaos=new Ph("caos"),this.rankCirc="normal",this.rankNetOn={normal:!1,caos:!1},this.rankCapSel=null,this.onRankBack=null,this.onRankRetry=null,this.edW=92,this.edH=62,this.onPreviewBack=null,this.onPreviewPlay=null,this.lobbyOpen=!1,this.hud=null,this.speedMul=1,this.onSpeed=null,this.onPause=null,this.onResume=null,this.onRestart=null,this.onNext=null,this.onMenu=null,this.onUseItem=null,this.cb=e,this.online=t,this.myName=Ce.name()||"Você",this.resetPlayers("quick")}el(e){const t=document.createElement("div");return t.innerHTML=e.trim(),t.firstElementChild}clear(){this.root.querySelectorAll(".screen").forEach(e=>e.remove())}bgFx(e=8){const t=this.el('<div class="fxlayer"></div>');for(let i=0;i<e;i++){const s=Rt[Math.floor(Math.random()*Rt.length)],a=document.createElement("div");a.className="fcap";const o=30+Math.random()*52;a.style.cssText=`left:${Math.random()*100}%;width:${o}px;height:${o}px;opacity:${(.1+Math.random()*.16).toFixed(2)};animation-duration:${(16+Math.random()*16).toFixed(1)}s;animation-delay:${(-Math.random()*26).toFixed(1)}s`;const r=it(s.art,72);r.style.width="100%",r.style.height="100%",r.style.display="block",a.appendChild(r),t.appendChild(a)}for(let i=0;i<10;i++){const s=document.createElement("div");s.className="bub";const a=6+Math.random()*18;s.style.cssText=`left:${Math.random()*100}%;width:${a}px;height:${a}px;animation-duration:${(10+Math.random()*12).toFixed(1)}s;animation-delay:${(-Math.random()*20).toFixed(1)}s`,t.appendChild(s)}return t}confetti(e){const t=["#f2b100","#e5484d","#3b82f6","#2ea44f","#a855f7","#ff8fb0","#fff"];for(let i=0;i<46;i++){const s=document.createElement("div");s.className="confetti",s.style.cssText=`left:${Math.random()*100}%;background:${t[i%t.length]};animation-duration:${(1+Math.random()*1.5).toFixed(2)}s;animation-delay:${(Math.random()*.5).toFixed(2)}s;transform:rotate(${Math.floor(Math.random()*360)}deg)`,e.appendChild(s),setTimeout(()=>s.remove(),2800)}}showMenu(){this.clear();const e=Ce.wins(),t=to(e).length,i=this.el(`
      <div class="screen menu">
        <div class="topbar">
          <div class="coin-pill">🏆 <b>${e}</b>&nbsp;<span style="font-weight:700;font-size:12px;opacity:.85">vitórias</span></div>
          <button class="icon-btn" id="cfgBtn">⚙</button>
        </div>
        <div class="logo">
          <div class="cap-ico" id="capico"></div>
          <h1>Tampinha <em>Rally</em></h1>
          <div class="tag">CORRIDA DE TAMPINHAS • PETELECO &amp; CAOS</div>
        </div>
        <div class="mode-grid">
          <button class="mode-btn feat" data-m="quick"><span class="mi">🏁</span><b>Jogar Rápido</b><span class="ms">você + IA, é só jogar</span></button>
          <button class="mode-btn" data-m="ai" style="--a:var(--blu)"><span class="mi">🤖</span><b>Contra a IA</b><span class="ms">escolha os rivais</span></button>
          <button class="mode-btn" data-m="mp" style="--a:var(--grn)"><span class="mi">🌐</span><b>Multiplayer</b><span class="ms">local ou online</span></button>
          <button class="mode-btn hot" data-m="camp" style="--a:#c98a00"><span class="mi">🏆</span><b>Campanha</b><span class="ms">${this.campMenuSub()}</span></button>
          <button class="mode-btn hot" data-m="rank" style="--a:#7c3aed"><span class="mi">⚔️</span><b>Ranqueada</b><span class="ms">${this.rankMenuSub()}</span></button>
          <button class="mode-btn" data-m="modes" style="--a:#ff4fa3"><span class="mi">🎡</span><b>Modos de Jogo</b><span class="ms">Caos, Eliminação, Dupla…</span></button>
          <button class="mode-btn" data-m="champ" style="--a:var(--gold)"><span class="mi">🏆</span><b>Campeonato</b><span class="ms">4 formatos, 1 campeão</span></button>
          <button class="mode-btn" data-m="daily" style="--a:var(--pur)"><span class="mi">📅</span><b>Desafio Diário</b><span class="ms">a pista do dia</span></button>
          <button class="mode-btn" data-m="editor" style="--a:#00c2a8"><span class="mi">✏️</span><b>Editor de Pista</b><span class="ms">crie e jogue a sua</span></button>
          <button class="mode-btn" data-m="skins" style="--a:var(--orange)"><span class="mi">🎨</span><b>Tampinhas</b><span class="ms">coleção ${t}/${Rt.filter(s=>!s.hidden).length}</span></button>
          <button class="mode-btn" data-m="help" style="--a:#00b4d8"><span class="mi">📖</span><b>Como Jogar</b><span class="ms">obstáculos &amp; atributos</span></button>
        </div>
      </div>`);i.prepend(this.bgFx(9)),i.querySelector("#capico").appendChild(it(et("coca").art,120)),this.root.appendChild(i),i.querySelectorAll(".mode-btn").forEach(s=>s.addEventListener("click",()=>{const a=s.dataset.m;a==="skins"?this.showSkins():a==="help"?this.showHelp():a==="mp"?this.showMultiplayer():a==="modes"?this.showModes():a==="editor"?this.showEditor():a==="camp"?this.showCampaign():a==="rank"?this.showRanked():this.showSetup(a)})),i.querySelector("#cfgBtn").addEventListener("click",()=>this.showSettings())}showModes(){this.clear();const e=[{m:"caos",ico:"🌀",name:"Modo Caos",sub:"Power-ups estilo Mario Kart! Quem está atrás pega os melhores itens.",col:"#ff4fa3"},{m:"elim",ico:"💀",name:"Eliminação",sub:"Várias pistas: o último de cada corrida é eliminado até sobrar 1.",col:"#e5484d"},{m:"trial",ico:"⏱️",name:"Contra-Relógio",sub:"Sozinho contra o cronômetro: chegue com o MENOR número de petelecos.",col:"#3b82f6"},{m:"dupla",ico:"🤝",name:"Corrida de Dupla",sub:"Times! 2×2 ou 3×3 — a soma das colocações decide o time campeão.",col:"#2ea44f"}],t=this.el(`<div class="screen setup modes-screen">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Voltar</button><h2>Modos de Jogo</h2><div></div></div>
      <div class="modes-note">O jogo <b>comum</b> continua no menu. Aqui são os modos especiais — bem diferentes! 🎉</div>
      <div class="modes-list">
        ${e.map(i=>`<button class="modecard" data-m="${i.m}" style="--mc:${i.col}"><span class="mc-ico">${i.ico}</span><div class="mc-tx"><b>${i.name}</b><span>${i.sub}</span></div><span class="mc-go">▶</span></button>`).join("")}
      </div>
      <div class="modes-hint">🌐 Dupla e Campeonato também dá pra jogar <b>Online</b> (no Multiplayer → Online).</div>
    </div>`);this.root.appendChild(t),t.prepend(this.bgFx(7)),t.querySelector("#back").addEventListener("click",()=>this.showMenu()),t.querySelectorAll(".modecard").forEach(i=>i.addEventListener("click",()=>this.showSetup(i.dataset.m)))}campMenuSub(){const e=pn();return e.cap?e.done?"👑 ZERADA! · reviva a glória":`${Object.values(e.best).filter(i=>i<=3).length}/${Xi.length} troféus · continue!`:"comece do zero, vire lenda"}showCampaign(){const e=pn();if(!e.cap){this.showCampStarterPick();return}this.clear();const t=Object.values(e.best).filter(o=>o<=3).length,i=this.el(`<div class="screen setup camp">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Menu</button><h2>🏆 Campanha</h2><div></div></div>
      <div class="camp-head">
        <div class="camp-face" id="cface"></div>
        <div class="camp-info">
          <b>${et(e.cap).name}</b>
          <span>🏅 ${t}/${Xi.length} troféus ${e.done?'· <b class="camp-done">👑 ZERADA</b>':""}</span>
        </div>
        <button class="chip camp-ofi" id="ofi">🔧 Oficina <b>${e.pts}</b></button>
      </div>
      <div class="camp-scroll" id="ligas"></div>
    </div>`);this.root.appendChild(i),i.prepend(this.bgFx(5));const s=it(et(e.cap).art,96);s.style.width="100%",s.style.height="100%",s.style.display="block",i.querySelector("#cface").appendChild(s),i.querySelector("#cface").addEventListener("click",()=>this.showCampOficina()),i.querySelector("#ofi").addEventListener("click",()=>this.showCampOficina()),i.querySelector("#back").addEventListener("click",()=>this.showMenu());const a=i.querySelector("#ligas");no.forEach((o,r)=>{const l=io[r],c=et(l),h=Gd(e,r),d=Ce.hasBonus(l),u=this.el(`<div class="camp-liga" style="--lc:${o.col}">
        <div class="cl-head"><span class="cl-ico">${o.ico}</span><div class="cl-tx"><b>${o.name}</b><span>${o.desc}</span></div></div>
        <button class="cl-prize ${d?"earned":""}" style="--rc:${Dn[c.rarity]}">
          <div class="clp-face"></div>
          <div class="clp-tx">
            <span class="clp-tag">${d?"🏆 CONQUISTADA!":"🎁 PRÊMIO DA LIGA"}</span>
            <b>${c.name}</b>
            <span class="clp-rar"><i class="rar-dot"></i>${ei[c.rarity]} EXCLUSIVA</span>
            <span class="clp-cond">${d?"sua pra sempre — já joga com ela no modo livre!":"faça <b>🥇 OURO</b> nas 4 competições da liga"}</span>
            <span class="clp-prog">${"🥇".repeat(h)}${'<i class="clp-slot"></i>'.repeat(Math.max(0,4-h))} <em>${h}/4</em></span>
          </div>
          <span class="clp-zoom">🔍</span>
        </button>
        <div class="cl-comps"></div>
      </div>`),f=u.querySelector(".clp-face"),g=it(c.art,100);g.style.width="72px",g.style.height="72px",g.style.display="block",f.appendChild(g),u.querySelector(".cl-prize").addEventListener("click",()=>this.showCapStats(c.name,l));const b=u.querySelector(".cl-comps");Xi.forEach((p,m)=>{if(p.liga!==r)return;const y=Gb(e,m),v=e.best[p.id],x=v===1?"🥇":v===2?"🥈":v===3?"🥉":"",T=this.el(`<button class="cc ${y?"":"locked"} ${p.final?"final":""}">
          <span class="cc-ico">${y?p.ico:"🔒"}</span>
          <b>${p.name}</b>
          <span class="cc-sub">${p.races} corridas · ${p.nOpp} rivais</span>
          <span class="cc-tro">${x||(y?"▶ JOGAR":"vença a anterior")}</span>
        </button>`);y&&T.addEventListener("click",()=>this.showCampCompIntro(p)),b.appendChild(T)}),a.appendChild(u)})}showCampStarterPick(){this.clear();const e=Rt.filter(s=>s.hidden),t=this.el(`<div class="screen setup camp">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Menu</button><h2>🏆 Campanha</h2><div></div></div>
      <div class="camp-story">Você achou <b>três tampinhas velhas</b> no fundo do quintal. Nenhuma parece grande coisa… ainda. Escolha a sua companheira: vocês vão juntas <b>do quintal ao topo do mundo</b> — e ela evolui a cada troféu. <b>Escolha com carinho: é pra sempre!</b></div>
      <div class="camp-pickers" id="pk"></div>
    </div>`);this.root.appendChild(t),t.prepend(this.bgFx(6)),t.querySelector("#back").addEventListener("click",()=>this.showMenu());const i=t.querySelector("#pk");for(const s of e){const a=this.el(`<button class="camp-pick"><div class="cp-face"></div><b>${s.name}</b><span class="cp-desc">${s.desc}</span>${zi(s.stats,!0)}<span class="cp-go">ESCOLHER ▶</span></button>`),o=it(s.art,120);o.style.width="92px",o.style.height="92px",o.style.display="block",o.style.margin="0 auto",a.querySelector(".cp-face").appendChild(o),a.addEventListener("click",()=>{const r=pn();r.cap=s.id,sa(r),this.notify(`${s.name} é sua! Boa sorte, campeã! 🍀`,"good"),this.showCampaign()}),i.appendChild(a)}}showCampOficina(){this.clear();const e=pn(),t=et(e.cap||"coca");vr(e);const i=this.el(`<div class="screen setup camp">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Campanha</button><h2>🔧 Oficina</h2><div></div></div>
      <div class="ofi-head">
        <div class="camp-face big" id="oface"></div>
        <div class="ofi-tx"><b>${t.name}</b><span>Pontos de Oficina: <b class="ofi-pts">${e.pts}</b> ⭐</span><small>Ganhe pontos com troféus e melhore ONDE VOCÊ quiser. Vale só na campanha.</small></div>
      </div>
      <div class="ofi-rows" id="rows"></div>
      <button class="chip" id="reset">↩️ Redistribuir tudo (de graça)</button>
    </div>`);this.root.appendChild(i),i.prepend(this.bgFx(4));const s=it(t.art,120);s.style.width="100%",s.style.height="100%",s.style.display="block",i.querySelector("#oface").appendChild(s),i.querySelector("#back").addEventListener("click",()=>this.showCampaign());const a=i.querySelector("#rows"),o=[["💨","Desliza","slide"],["⚖️","Peso","weight"],["🎯","Controle","control"],["🏀","Quique","bounce"],["🌀","Estabil.","stability"],["💥","Potência","power"],["🧲","Aderência","grip"]],r=()=>{const l=pn(),c=vr(l);i.querySelector(".ofi-pts").textContent=String(l.pts),a.innerHTML="";for(const[h,d,u]of o){const f=l.alloc[u]||0,g=gr(f),b=f>=mr,p=!b&&l.pts>=g,m=Array.from({length:mr},(x,T)=>`<i class="${T<f?"on":""}"></i>`).join(""),y=this.el(`<div class="ofi-row">
          <span class="or-ico">${h}</span>
          <div class="or-mid"><div class="or-top"><b>${d}</b><span class="or-val">${Qd(c[u])}</span></div><div class="or-pips">${m}</div></div>
          <button class="or-plus ${p?"":"off"}" data-k="${u}">${b?"MAX":`+1 <small>⭐${g}</small>`}</button>
        </div>`),v=y.querySelector(".or-plus");p&&v.addEventListener("click",()=>{const x=pn(),T=x.alloc[u]||0,M=gr(T);x.pts<M||T>=mr||(x.pts-=M,x.alloc[u]=T+1,sa(x),r())}),a.appendChild(y)}};r(),i.querySelector("#reset").addEventListener("click",()=>{const l=pn();let c=0;for(const h of Object.keys(l.alloc)){const d=l.alloc[h];for(let u=0;u<d;u++)c+=gr(u)}c&&(l.pts+=c,l.alloc={},sa(l),r(),this.notify(`⭐ ${c} pontos devolvidos!`,"good"))})}showCampCompIntro(e){pn();const t=no[e.liga],i={comum:"Comuns",rara:"Raras",epica:"Épicas",lendaria:"Lendárias",mitica:"MÍTICAS"},{box:s,close:a}=this.overlay(`
      <div class="ov-head"><b>${e.ico} ${e.name}</b><button class="ov-x">✕</button></div>
      <div class="ov-sub">${t.ico} ${t.name} · dificuldade <b>${ti[e.level]}</b></div>
      <div class="cc-detail">
        <div>🏁 <b>${e.races} corridas</b> — pontos por posição, soma tudo</div>
        <div>🥊 <b>${e.nOpp} rivais</b> com tampinhas <b>${e.rarities.map(o=>i[o]).join(" e ")}</b></div>
        <div>🏅 Pódio libera a próxima · 🥇 OURO = mais pontos de Oficina</div>
        ${e.final?'<div class="cc-final-note">👑 A GRANDE FINAL: vença e entre pra história!</div>':""}
      </div>
      <div class="mactions"><button class="chip" id="cofi">🔧 Oficina</button><button class="play-btn" id="go">🏁 Começar</button></div>`);s.querySelector(".ov-x").addEventListener("click",a),s.querySelector("#cofi").addEventListener("click",()=>{a(),this.showCampOficina()}),s.querySelector("#go").addEventListener("click",()=>{a(),this.launchCamp(e)})}launchCamp(e){const t=pn();if(!t.cap)return;const i=Hb(e),s=[{name:this.myName||"Você",isAI:!1,skin:t.cap,stats:vr(t)},...i.map((a,o)=>({name:zn[o%zn.length],isAI:!0,ai:e.aiKinds[o%e.aiKinds.length],skin:a}))];this.cb.start({level:e.level,trackIdx:ci(t.seed,e.id,0),pick:"randlevel",players:s,mode:"camp",campComp:e.id})}showCampResult(e){const{modal:t,box:i}=this.modalBox();i.className="modal win";const s=e.place===1?"🥇":e.place===2?"🥈":e.place===3?"🥉":"😤",a=e.place===1?"CAMPEÃO!":e.place===2?"Prata!":e.place===3?"Bronze!":e.place+"º lugar",o=e.place<=3,r=e.ptsGained||e.winsGained?`<div class="camp-rw">${e.ptsGained?`<span class="rw">🔧 +${e.ptsGained} pts de Oficina</span>`:""}${e.winsGained?`<span class="rw">🏆 +${e.winsGained} vitórias (modo livre)</span>`:""}</div>`:o?'<div class="camp-rw"><span class="rw dim">troféu já conquistado — melhore pra ganhar mais!</span></div>':"",l=e.prize?et(e.prize):null;i.innerHTML=`<div class="camp-tro">${s}</div><h3>${e.comp.ico} ${e.comp.name}</h3><div class="camp-place">${a}</div>
      ${r}
      ${l?`<div class="prize-reveal" style="--rc:${Dn[l.rarity]}">
        <div class="pr-tag">✨ TAMPINHA EXCLUSIVA DESBLOQUEADA ✨</div>
        <div class="pr-face" id="prf"></div>
        <b class="pr-name">${l.name}</b>
        <span class="pr-rar"><i class="rar-dot"></i>${ei[l.rarity]} · OURO nas 4 da liga</span>
        ${zi(l.stats,!0)}
        <span class="pr-note">já é sua no modo livre! 🎉</span>
      </div>`:""}
      ${o?"":'<div class="camp-tip">Precisa de PÓDIO (top 3) pra liberar a próxima. Passa na 🔧 Oficina e tenta de novo!</div>'}
      ${e.hist?br(e.hist.length,e.hist.length,e.hist):""}
      <div class="champ-stand">${e.rows.map((h,d)=>`<div class="cs-row ${h.you?"you":""} ${d===0?"lead":""}"><span class="cs-pos">${d+1}º</span><span class="cs-cap" data-s="${h.skin}"></span><span class="cs-nm">${h.name}</span><b class="cs-pts">${h.pts}</b></div>`).join("")}</div>
      <div class="mactions"><button class="chip" id="again">↻ De novo</button><button class="play-btn" id="mapa">${e.finished?"👑 Ver o FINAL":"Campanha ▶"}</button></div>`,i.querySelectorAll(".cs-cap").forEach(h=>h.appendChild(it(et(h.dataset.s).art,44)));const c=i.querySelector("#prf");if(c&&l){const h=it(l.art,150);h.style.width="110px",h.style.height="110px",h.style.display="block",h.style.margin="0 auto",c.appendChild(h)}t.classList.remove("hidden"),(o||l)&&this.confetti(i),i.querySelector("#again").addEventListener("click",()=>{this.hideModal(),this.onCampRetry?.(e.comp.id)}),i.querySelector("#mapa").addEventListener("click",()=>{this.hideModal(),e.finished?this.onCampFinale?.():this.onCampBack?.()})}showCampFinale(){const e=pn(),t=et(e.cap||"coca"),i=Object.values(e.best).filter(o=>o===1).length;this.clear();const s=this.el(`<div class="screen camp-finale">
      <div class="fin-stars"></div>
      <div class="fin-crown">👑</div>
      <h1 class="fin-title">LENDA DAS<br>TAMPINHAS</h1>
      <div class="fin-face" id="ff"></div>
      <div class="fin-cap">${t.name}</div>
      <div class="fin-story">Ela era só uma tampinha <b>${t.name.toLowerCase()}</b> achada no quintal.<br>Ninguém apostava nada. Hoje, o mundo inteiro conhece o seu peteleco.</div>
      <div class="fin-stats">
        <div><b>${e.races}</b><span>corridas</span></div>
        <div><b>${i}</b><span>ouros</span></div>
        <div><b>${Object.values(e.best).filter(o=>o<=3).length}/${Xi.length}</b><span>troféus</span></div>
      </div>
      <div class="fin-bonus">🎁 Bônus de lenda: <b>+10 vitórias</b> no modo livre e <b>+10 pontos</b> de Oficina!</div>
      <div class="fin-note">A campanha continua aberta: cace os 🥇 que faltam!</div>
      <button class="play-btn" id="fim">✨ Voltar como LENDA</button>
    </div>`);this.root.appendChild(s);const a=it(t.art,180);a.style.width="130px",a.style.height="130px",a.style.display="block",a.style.margin="0 auto",s.querySelector("#ff").appendChild(a),this.confetti(s),setTimeout(()=>this.confetti(s),900),setTimeout(()=>this.confetti(s),1800),s.querySelector("#fim").addEventListener("click",()=>this.showCampaign())}rnet(){return this.rankCirc==="caos"?this.rankNetCaos:this.rankNet}rkTitle(){return this.rankCirc==="caos"?"🌀 Ranqueada Caos":"⚔️ Ranqueada"}rankMenuSub(){const e=Xt("normal"),t=Xt("caos");if(!e.name&&!t.name)return"clássica e Caos · ranking mundial";const i=[];return e.name&&i.push(`⚔️ ${qs(e)}`),t.name&&i.push(`🌀 ${qs(t)}`),i.join(" · ")+" pts"}rankNetStart(){const e=this.rankCirc;if(this.rankNetOn[e])return;this.rankNetOn[e]=!0;const t=Xt(e),i=this.rnet();i.watch(t.name,t.dev),i.onNameLost=s=>{const a=Xt(e);a.name=null,uc(a,e),this.notify(`⚠️ O nome "${s}" já era de outra pessoa (registro mais antigo). Escolha outro!`,"bad")},i.start()}myRankRow(){const e=Xt(this.rankCirc);if(!e.name)return null;const t=[0,1,2,3,4].reduce((s,a)=>s+so(e,a),0);let i=0;for(let s=0;s<li.length;s++)vh(e,s)&&(i=li[s].tier);return{name:e.name,dev:e.dev,score:qs(e),tier:i,golds:t,cap:e.cap,claimTs:e.claimTs,ts:Date.now()}}rankSubmit(){const e=this.myRankRow();e&&this.rnet().submit(e)}rankStatusHtml(){const e=this.rnet().status;return e==="online"?'<span class="rk-dot on"></span>AO VIVO':e==="hub"?'<span class="rk-dot on"></span>AO VIVO · você é o servidor':e==="connecting"?'<span class="rk-dot mid"></span>conectando…':'<span class="rk-dot off"></span>offline · cópia local'}myRankPos(){const e=Rh(this.rnet().board),t=Xt(this.rankCirc),i=e.findIndex(s=>s.dev===t.dev);return{pos:i<0?e.length+1:i+1,total:Math.max(e.length,i<0?e.length+1:e.length)}}rankTabs(e){const t=this.el(`<div class="rk-tabs">
      <button class="rk-tab ${this.rankCirc==="normal"?"sel":""}" data-c="normal">⚔️ Clássica</button>
      <button class="rk-tab caos ${this.rankCirc==="caos"?"sel":""}" data-c="caos">🌀 Caos</button>
    </div>`);return t.querySelectorAll(".rk-tab").forEach(i=>i.addEventListener("click",()=>{const s=i.dataset.c;s!==this.rankCirc&&(this.rankCirc=s,this.rankCapSel=null,this.showRanked())})),e.appendChild(t),t}showRanked(e){e&&(this.rankCirc=e);const t=Xt(this.rankCirc);if(!t.name){this.showRankRegister();return}this.rankNetStart(),this.rankSubmit(),this.clear();const i=this.rankCirc==="caos",s=qs(t),a=Object.values(t.place).filter(d=>d<=3).length,o=this.myRankPos(),r=Vd(this.rankCirc),l=this.el(`<div class="screen setup camp rank ${i?"rk-caos":""}">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Menu</button><h2>${this.rkTitle()}</h2><div></div></div>
      <div class="rk-tabs-slot"></div>
      <div class="rank-head">
        <div class="camp-face" id="rface"></div>
        <div class="rank-info">
          <b>${t.name}</b>
          <span class="rank-score">⚡ <b>${s}</b> <small>/ ${gh} pts</small></span>
          <span class="rank-sub">🏅 ${a}/40 · ${o.pos>0&&this.rnet().status!=="off"?`🌍 ${o.pos}º do mundo`:this.rankStatusHtml()}</span>
        </div>
        <button class="chip rank-board-btn" id="board">🌍 Ranking</button>
      </div>
      ${i?'<div class="rk-caos-note">🌀 Aqui as corridas têm <b>POWER-UPS</b>: caixinhas na pista, 2 bolsos, raio, furacão, fantasma…</div>':""}
      <div class="rank-bar"><i style="width:${Math.min(100,s/gh*100).toFixed(1)}%"></i></div>
      <div class="camp-scroll" id="tiers"></div>
      <button class="rk-del" id="del">🗑️ excluir conta deste ranking</button>
    </div>`);this.root.appendChild(l),l.prepend(this.bgFx(5)),this.rankTabs(l.querySelector(".rk-tabs-slot"));const c=it(et(t.cap).art,96);c.style.cssText="width:100%;height:100%;display:block",l.querySelector("#rface").appendChild(c),l.querySelector("#back").addEventListener("click",()=>this.showMenu()),l.querySelector("#board").addEventListener("click",()=>this.showRankBoard()),l.querySelector("#del").addEventListener("click",()=>this.showRankDelete());const h=l.querySelector("#tiers");_i.forEach((d,u)=>{const f=r[u],g=et(f),b=so(t,u),p=Ce.hasBonus(f),m=Yb(t,u),y=this.el(`<div class="camp-liga rank-tier" style="--lc:${d.col}">
        <div class="cl-head"><span class="cl-ico">${d.ico}</span><div class="cl-tx"><b>${d.name}</b><span>${d.desc}</span></div><span class="rk-tprog">${m}/8</span></div>
        <button class="cl-prize ${p?"earned":""}" style="--rc:${Dn[g.rarity]}">
          <div class="clp-face"></div>
          <div class="clp-tx">
            <span class="clp-tag">${p?"🏆 CONQUISTADA!":"👑 PRÊMIO DO TIER"}</span>
            <b>${g.name}</b>
            <span class="clp-rar"><i class="rar-dot"></i>${ei[g.rarity]} EXCLUSIVA · a melhor do jogo</span>
            <span class="clp-cond">${p?"sua pra sempre — joga com ela em tudo!":"faça <b>🥇 OURO</b> nas 8 competições do tier"}</span>
            <span class="clp-prog">${"🥇".repeat(b)}${'<i class="clp-slot"></i>'.repeat(Math.max(0,8-b))} <em>${b}/8</em></span>
          </div>
          <span class="clp-zoom">🔍</span>
        </button>
        <div class="cl-comps"></div>
      </div>`),v=y.querySelector(".clp-face"),x=it(g.art,100);x.style.cssText="width:72px;height:72px;display:block",v.appendChild(x),y.querySelector(".cl-prize").addEventListener("click",()=>this.showCapStats(g.name,f));const T=y.querySelector(".cl-comps");li.forEach((M,S)=>{if(M.tier!==u)return;const C=vh(t,S),N=t.place[M.id],_=N===1?"🥇":N===2?"🥈":N===3?"🥉":"",w=t.best[M.id]??0,L=this.el(`<button class="cc rk-cc ${C?"":"locked"} ${M.idx===7?"final":""}">
          <span class="cc-ico">${C?M.ico:"🔒"}</span>
          <b>${M.name}</b>
          <span class="cc-sub">${M.races} corridas · rivais ${M.boost>0?`+${Math.round(M.boost*100)}% 💪`:"na base"}</span>
          <span class="rk-pts ${w>=Qs(M)?"max":""}">${w>0?`⚡ ${w}/${Qs(M)}`:C?"⚡ 0/"+Qs(M):""}</span>
          <span class="cc-tro">${_||(C?"▶ JOGAR":"pódio na anterior")}</span>
        </button>`);C&&L.addEventListener("click",()=>this.showRankCompIntro(M)),T.appendChild(L)}),h.appendChild(y)})}showRankRegister(){this.rankNetStart(),this.clear();const e=this.rankCirc==="caos",t=this.el(`<div class="screen setup camp rank ${e?"rk-caos":""}">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Menu</button><h2>${this.rkTitle()}</h2><div></div></div>
      <div class="rk-tabs-slot"></div>
      <div class="rank-reg">
        <div class="rk-reg-ico">${e?"🌀":"⚔️"}</div>
        <h3>Escolha seu nome de batalha</h3>
        <p class="rk-reg-p">É o nome que aparece no <b>Ranking ${e?"do CAOS":"Mundial"}</b> — e é <b>único aqui</b>: cada circuito tem os próprios nomes${e?" (pode até repetir o da clássica!)":""}. Escolha bem: é a sua lenda!</p>
        <div class="rk-input-row"><input id="nm" maxlength="12" placeholder="ex.: Diego" autocomplete="off"><span class="rk-check" id="chk"></span></div>
        <div class="rk-status">${this.rankStatusHtml()}</div>
        <button class="play-btn" id="go">${e?"🌀":"⚔️"} ENTRAR NO RANKING</button>
        <div class="rk-rules">
          ${e?"<div>🌀 <b>Corridas com POWER-UPS</b>: caixinhas na pista, 2 bolsos, raio, furacão, fantasma, pancada…</div>":""}
          <div>🪜 <b>5 tiers</b> (Normal → Místico) · <b>8 competições</b> cada — 40 no total</div>
          <div>🧢 Você joga com <b>as suas tampinhas</b>: no Normal valem as comuns; cada tier libera a raridade seguinte</div>
          <div>💪 Os rivais <b>ficam mais fortes</b> a cada etapa (até +45% na Grande Final do tier)</div>
          <div>⚡ Cada corrida vale pontos (12·9·7·5·3·1). O <b>melhor resultado</b> de cada competição soma no seu score — dá pra voltar e melhorar!</div>
          <div>👑 <b>OURO nas 8</b> de um tier = tampinha EXCLUSIVA ${e?"do circuito Caos":""} (as melhores do jogo)</div>
        </div>
      </div>
    </div>`);this.root.appendChild(t),t.prepend(this.bgFx(6)),this.rankTabs(t.querySelector(".rk-tabs-slot")),t.querySelector("#back").addEventListener("click",()=>this.showMenu());const i=t.querySelector("#nm"),s=t.querySelector("#chk"),a=t.querySelector(".rk-status"),o=this.rankCirc,r=Xt(o),l=this.rnet(),c=()=>{const h=i.value;if(!h.trim()){s.textContent="";return}const d=Th(h);if(d){s.textContent="✕ "+d,s.className="rk-check bad";return}if(!Ch(l.board,h,r.dev)){s.textContent="✕ nome já em uso",s.className="rk-check bad";return}s.textContent=l.status==="online"||l.status==="hub"?"✓ disponível":"✓ livre por aqui",s.className="rk-check ok"};i.addEventListener("input",c),l.onChange=()=>{a.innerHTML=this.rankStatusHtml(),c()},t.querySelector("#go").addEventListener("click",()=>{const h=i.value.trim().replace(/\s+/g," "),d=Th(h);if(d){this.notify("✕ "+d,"bad");return}if(!Ch(l.board,h,r.dev)){this.notify(`✕ "${h}" já está em uso neste ranking — escolha outro`,"bad");return}const u=Xt(o);u.name=h,u.claimTs=Date.now(),uc(u,o),l.watch(h,u.dev),this.rankSubmit(),l.status==="off"||l.status==="connecting"?this.notify("📡 Sem conexão agora — seu nome será confirmado quando o ranking conectar","bad"):this.notify(`${o==="caos"?"🌀":"⚔️"} ${h} entrou pro ranking!`,"good"),this.showRanked()})}showRankDelete(){const e=this.rankCirc,t=Xt(e),{box:i,close:s}=this.overlay(`
      <div class="ov-head"><b>🗑️ Excluir conta (${e==="caos"?"Caos":"clássica"})</b><button class="ov-x">✕</button></div>
      <div class="cc-detail">
        <div>Isso apaga <b>${t.name}</b> do ranking da ${e==="caos"?"Ranqueada CAOS":"Ranqueada clássica"} e <b>zera todo o progresso</b> desse circuito (as 40 competições).</div>
        <div>O nome <b>fica livre</b> pra qualquer pessoa usar. Tampinhas exclusivas já ganhas <b>continuam suas</b>. ${e==="caos"?"A Ranqueada clássica NÃO é afetada.":"A Ranqueada Caos NÃO é afetada."}</div>
        <div class="cc-final-note">Não tem volta!</div>
      </div>
      <div class="mactions"><button class="chip" id="no">Cancelar</button><button class="play-btn danger" id="yes">Excluir mesmo</button></div>`);i.querySelector(".ov-x").addEventListener("click",s),i.querySelector("#no").addEventListener("click",s),i.querySelector("#yes").addEventListener("click",()=>{s(),t.name&&this.rnet().submit({name:t.name,dev:t.dev,score:0,tier:0,golds:0,cap:t.cap,claimTs:t.claimTs,ts:Date.now(),del:Date.now()}),Xb(e),this.rnet().watch(null,t.dev),this.notify("Conta excluída. O nome ficou livre.","good"),this.showMenu()})}showRankBoard(){this.rankNetStart(),this.rankSubmit(),this.clear();const e=this.rankCirc==="caos",t=this.rnet(),i=this.el(`<div class="screen setup camp rank ${e?"rk-caos":""}">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Ranqueada</button><h2>🌍 Ranking ${e?"do Caos":"Mundial"}</h2><div></div></div>
      <div class="rk-status center" id="stat">${this.rankStatusHtml()}</div>
      <div class="camp-scroll rk-rows" id="rows"></div>
    </div>`);this.root.appendChild(i),i.prepend(this.bgFx(4)),i.querySelector("#back").addEventListener("click",()=>{t.onChange=()=>{},this.showRanked()});const s=i.querySelector("#rows"),a=Xt(this.rankCirc),o=()=>{i.querySelector("#stat").innerHTML=this.rankStatusHtml();const r=Rh(t.board);if(s.innerHTML="",!r.length){s.appendChild(this.el('<div class="rk-empty">Ninguém no ranking ainda — seja a primeira lenda! '+(e?"🌀":"⚔️")+"</div>"));return}r.slice(0,100).forEach((l,c)=>{const h=c===0?"🥇":c===1?"🥈":c===2?"🥉":`${c+1}º`,d=l.dev===a.dev,u=_i[Math.min(4,l.tier)],f=this.el(`<div class="rk-row ${d?"you":""} ${c<3?"top":""}">
          <span class="rk-pos">${h}</span>
          <span class="rk-capface"></span>
          <div class="rk-nm"><b>${l.name}${d?" <i>(você)</i>":""}</b><small>${u.ico} ${u.name}${l.golds?` · ${l.golds}🥇`:""}</small></div>
          <b class="rk-sc">⚡ ${l.score}</b>
        </div>`);f.querySelector(".rk-capface").appendChild(it(et(l.cap||"coca").art,44)),s.appendChild(f)})};o(),t.onChange=o,t.refresh()}showRankCompIntro(e){const t=Xt(this.rankCirc),i=this.rankCirc==="caos",s=_i[e.tier],a=Jb(e.tier);(!this.rankCapSel||!a.some(g=>g.id===this.rankCapSel))&&(this.rankCapSel=a.some(g=>g.id===t.cap)?t.cap:a[a.length-1]?.id||"coca");const o=t.best[e.id]??0,r=_i.slice(0,e.tier+1).map(g=>ei[g.rarity]).join(" · "),{box:l,close:c}=this.overlay(`
      <div class="ov-head"><b>${e.ico} ${e.name} <small class="rk-tiertag" style="--lc:${s.col}">${s.ico} ${s.name}</small></b><button class="ov-x">✕</button></div>
      <div class="cc-detail">
        ${i?"<div>🌀 <b>MODO CAOS</b>: caixinhas de power-up na pista — 2 bolsos, raio, furacão, fantasma…</div>":""}
        <div>🏁 <b>${e.races} corridas</b> · pontos por posição (12·9·7·5·3·1)</div>
        <div>🥊 <b>${e.nOpp} rivais ${ei[s.rarity]}s</b> ${e.boost>0?`<b class="rk-boost">+${Math.round(e.boost*100)}% mais fortes 💪</b>`:"na força natural"}</div>
        <div>⚡ Seu melhor aqui: <b>${o}/${Qs(e)}</b> — melhorou, o score sobe junto</div>
        <div>🏅 Pódio libera a próxima · 🥇 ouro conta pro prêmio do tier</div>
      </div>
      <div class="rk-pick-title">🧢 Escolha a tampinha <small>(valem: ${r})</small></div>
      <div class="rk-capdet" id="capdet"></div>
      <div class="rk-pick" id="pick"></div>
      <div class="mactions"><button class="play-btn" id="go">🏁 Começar</button></div>`,"rk-ov");l.querySelector(".ov-x").addEventListener("click",c);const h=l.querySelector("#pick"),d=l.querySelector("#capdet"),u=()=>{const g=et(this.rankCapSel||"coca");d.style.setProperty("--rc",Dn[g.rarity]),d.innerHTML=`<div class="rkd-face"></div>
        <div class="rkd-tx">
          <div class="rkd-top"><b>${g.name}</b><span class="rkd-rar"><i class="rar-dot"></i>${ei[g.rarity]}${g.prize!=null||g.rprize!=null?" · EXCLUSIVA ✨":""}</span></div>
          <span class="rkd-desc">${g.desc}</span>
          ${zi(g.stats,!0)}
        </div>`;const b=it(g.art,120);b.style.cssText="width:100%;height:100%;display:block",d.querySelector(".rkd-face").appendChild(b),d.classList.remove("pop"),d.offsetWidth,d.classList.add("pop")},f=()=>{h.innerHTML="";for(const g of a){const b=g.id===this.rankCapSel,p=this.el(`<button class="rk-cap ${b?"sel":""}" style="--rc:${Dn[g.rarity]}"><span class="rk-cap-face"></span><small>${g.name}</small></button>`);p.querySelector(".rk-cap-face").appendChild(it(g.art,66)),p.addEventListener("click",()=>{this.rankCapSel=g.id,f(),u()}),h.appendChild(p)}};f(),u(),l.querySelector("#go").addEventListener("click",()=>{c(),this.launchRank(e)})}launchRank(e){const t=this.rankCirc,i=this.rankCapSel||"coca",s=Qb(e),a=[{name:Xt(t).name||"Você",isAI:!1,skin:i},...s.map((o,r)=>({name:zn[r%zn.length],isAI:!0,ai:e.aiKinds[r%e.aiKinds.length],skin:o.skin,stats:o.stats}))];this.cb.start({level:e.level,trackIdx:ci(Xt(t).seed,e.id,0),pick:"randlevel",players:a,mode:"rank",rankComp:e.id,rankCirc:t})}showRankResult(e){const t=this.rankCirc,i=Xt(t),s=Zb(i,e.comp.id,e.place,e.pts,e.capId,t);this.rankNetStart(),this.rankSubmit();const{modal:a,box:o}=this.modalBox();o.className="modal win";const r=e.place===1?"🥇":e.place===2?"🥈":e.place===3?"🥉":"😤",l=e.place===1?"OURO!":e.place===2?"Prata!":e.place===3?"Bronze!":e.place+"º lugar",c=_i[e.comp.tier],h=so(i,e.comp.tier),d=s.prize?et(s.prize):null,u=!s.podium&&(i.place[e.comp.id]??99)>3;o.innerHTML=`<div class="camp-tro">${r}</div><h3>${t==="caos"?"🌀 ":""}${e.comp.ico} ${e.comp.name} <small class="rk-tiertag" style="--lc:${c.col}">${c.ico} ${c.name}</small></h3><div class="camp-place">${l}</div>
      <div class="rk-res-pts">
        <div class="rkp"><span>essa rodada</span><b>⚡ ${e.pts}</b></div>
        <div class="rkp ${s.dPts>0?"up":""}"><span>${s.dPts>0?"score mundial":"seu melhor"}</span><b>${s.dPts>0?`+${s.dPts} pts! 📈`:`⚡ ${i.best[e.comp.id]??0}`}</b></div>
        <div class="rkp"><span>score total</span><b>⚡ ${qs(i)}</b></div>
      </div>
      ${d?`<div class="prize-reveal" style="--rc:${Dn[d.rarity]}">
        <div class="pr-tag">✨ TAMPINHA EXCLUSIVA DESBLOQUEADA ✨</div>
        <div class="pr-face" id="prf"></div>
        <b class="pr-name">${d.name}</b>
        <span class="pr-rar"><i class="rar-dot"></i>${ei[d.rarity]} · OURO nas 8 do ${c.name}${t==="caos"?" (Caos)":""}</span>
        ${zi(d.stats,!0)}
        <span class="pr-note">a melhor da categoria — sua pra sempre! 🎉</span>
      </div>`:`<div class="rk-goldprog">👑 Prêmio do tier: ${"🥇".repeat(h)}${'<i class="clp-slot"></i>'.repeat(Math.max(0,8-h))} <em>${h}/8 ouros</em></div>`}
      ${u?'<div class="camp-tip">Precisa de PÓDIO (top 3) pra liberar a próxima etapa. Troca de tampinha e tenta de novo!</div>':""}
      ${br(e.hist.length,e.hist.length,e.hist)}
      <div class="champ-stand">${e.rows.map((g,b)=>`<div class="cs-row ${g.you?"you":""} ${b===0?"lead":""}"><span class="cs-pos">${b+1}º</span><span class="cs-cap" data-s="${g.skin}"></span><span class="cs-nm">${g.name}</span><b class="cs-pts">${g.pts}</b></div>`).join("")}</div>
      <div class="mactions"><button class="chip" id="again">↻ De novo</button><button class="play-btn" id="mapa">Ranqueada ▶</button></div>`,o.querySelectorAll(".cs-cap").forEach(g=>g.appendChild(it(et(g.dataset.s).art,44)));const f=o.querySelector("#prf");if(f&&d){const g=it(d.art,150);g.style.cssText="width:110px;height:110px;display:block;margin:0 auto",f.appendChild(g)}a.classList.remove("hidden"),(s.podium||d)&&this.confetti(o),o.querySelector("#again").addEventListener("click",()=>{this.hideModal(),this.onRankRetry?.(e.comp.id)}),o.querySelector("#mapa").addEventListener("click",()=>{this.hideModal(),this.onRankBack?.()})}confirmRestartComp(e,t,i,s,a){this.hideModal();const{box:o,close:r}=this.overlay(`
      <div class="ov-head"><b>⚠️ Reiniciar ${e}?</b><button class="ov-x">✕</button></div>
      <div class="cc-detail">
        <div>Isso <b>NÃO</b> reinicia só esta corrida: volta pra <b>1ª corrida</b> e <b>zera os pontos</b> de ${e} inteira.</div>
        ${t>0?`<div>Você já completou <b>${t} de ${i}</b> corrida${t>1?"s":""} — esse progresso se perde.</div>`:`<div>São <b>${i} corridas</b> no total.</div>`}
        <div class="cc-final-note">Seu melhor resultado já salvo continua valendo.</div>
      </div>
      <div class="mactions"><button class="chip" id="no">Cancelar</button><button class="play-btn danger" id="yes">↻ Reiniciar tudo</button></div>`),l=()=>{r(),a?.()};o.querySelector(".ov-x").addEventListener("click",l),o.querySelector("#no").addEventListener("click",l),o.querySelector("#yes").addEventListener("click",()=>{r(),s()})}showEditor(){this.clear();const e=["Quintal","Praia","Calçada","Garagem","Parque","Cozinha","Jardim","Deserto"],t=[[14,"Sinuca 🎱"],[15,"Congelador 🧊"],[16,"Bancada 🧲"],[17,"Sala (tapete) 🛋️"]],i=ii.ED_TOOLS,s=this.el(`<div class="screen editor">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Voltar</button><h2>✏️ Editor de Pista</h2><div></div></div>
      <div class="ed-help">1️⃣ <b>Traçar</b>: arraste pra desenhar. 2️⃣ Escolha um item e <b>toque na pista</b> pra colocar. 3️⃣ <b>Mover</b>: arraste um item pro lugar exato. 👁️ Veja em 3D e 🏁 jogue!</div>
      <div class="ed-tools" id="tools">${i.map(f=>`<button class="ed-tool grp-${f.grp} ${f.t===this.edTool?"sel":""}" data-t="${f.t}" style="--tc:${f.col}"><span>${f.ico}</span><small>${f.lab}</small></button>`).join("")}</div>
      <div class="ed-canvas-wrap"><canvas id="edcv" class="ed-canvas"></canvas><div class="ed-count" id="edcount"></div></div>
      <div class="ed-opts">
        <label>Tema</label>
        <select id="edtheme">${e.map((f,g)=>`<option value="${g}" ${g===this.edTheme?"selected":""}>${f}</option>`).join("")}${t.map(([f,g])=>`<option value="${f}" ${f===this.edTheme?"selected":""}>${g}</option>`).join("")}</select>
        <label>Largura</label>
        <input type="range" id="edhalf" min="3.4" max="6" step="0.2" value="${this.edHalf}">
        <input class="ed-name" id="edname" maxlength="18" value="${this.edName}">
      </div>
      <div class="ed-opts prot-row">
        <label>🛡️ Proteção</label>
        ${[[1,"Cheia"],[.6,"Média"],[.3,"Pouca"],[0,"Nenhuma"]].map(([f,g])=>`<button class="chip prot ${this.edProtect===f?"sel":""}" data-pr="${f}">${g}</button>`).join("")}
      </div>
      <div class="ed-actions">
        <button class="chip" id="edclear">🗑️ Limpar</button>
        <button class="chip" id="edsave">💾 Salvar</button>
        <button class="chip" id="edload">📂 Minhas</button>
        <button class="chip" id="edshare">🔗 Compartilhar</button>
      </div>
      <div class="ed-actions">
        <button class="chip big" id="edview">👁️ Ver em 3D</button>
        <button class="play-btn" id="edplay">🏁 Jogar</button>
      </div>
    </div>`);this.root.appendChild(s);const a=s.querySelector("#edcv"),o=s.querySelector("#edcount"),r=()=>{this.drawEditor(a),o.textContent=`${this.edObs.length+this.edPatches.length} itens · ${this.edPts.length} pts`},l=()=>{const f=a.getBoundingClientRect();if(f.width<4){requestAnimationFrame(l);return}a.width=Math.round(f.width),a.height=Math.round(f.width*this.edH/this.edW),r()};setTimeout(l,30),requestAnimationFrame(l),addEventListener("resize",l);const c=f=>{const g=a.getBoundingClientRect();return{x:(f.clientX-g.left)/g.width*this.edW,y:(f.clientY-g.top)/g.height*this.edH}};let h=!1,d=null;a.addEventListener("pointerdown",f=>{f.preventDefault(),a.setPointerCapture?.(f.pointerId);const g=c(f);this.edTool==="draw"?(h=!0,this.edPts.push(g)):this.edTool==="erase"?this.edEraseAt(g):this.edTool==="move"?d=this.edPickAt(g):this.edPlaceObs(g),r()}),a.addEventListener("pointermove",f=>{const g=c(f);if(h){const b=this.edPts[this.edPts.length-1];(!b||Math.hypot(g.x-b.x,g.y-b.y)>2)&&(this.edPts.push(g),r())}else d&&(d.x=g.x,d.y=g.y,r())});const u=()=>{h=!1,d=null};a.addEventListener("pointerup",u),a.addEventListener("pointercancel",u),a.addEventListener("pointerleave",u),s.querySelectorAll(".ed-tool").forEach(f=>f.addEventListener("click",()=>{this.edTool=f.dataset.t,s.querySelectorAll(".ed-tool").forEach(g=>g.classList.remove("sel")),f.classList.add("sel")})),s.querySelector("#edtheme").addEventListener("change",f=>{this.edTheme=+f.target.value,r()}),s.querySelector("#edhalf").addEventListener("input",f=>{this.edHalf=+f.target.value,r()}),s.querySelector("#edname").addEventListener("change",f=>this.edName=f.target.value||"Minha Pista"),s.querySelectorAll(".prot").forEach(f=>f.addEventListener("click",()=>{this.edProtect=+f.dataset.pr,s.querySelectorAll(".prot").forEach(g=>g.classList.remove("sel")),f.classList.add("sel")})),s.querySelector("#back").addEventListener("click",()=>this.showMenu()),s.querySelector("#edclear").addEventListener("click",()=>{this.edObs.length+this.edPatches.length+this.edPts.length!==0&&(this.edPts=[],this.edObs=[],this.edPatches=[],this.edOpenArcs=[],r())}),s.querySelector("#edsave").addEventListener("click",()=>{if(this.edPts.length<3){this.notify("Trace a pista primeiro!","bad");return}Ce.saveTrack(this.edData("ct"+Date.now())),this.notify("Pista salva! 💾","good")}),s.querySelector("#edload").addEventListener("click",()=>this.showMyTracks()),s.querySelector("#edshare").addEventListener("click",()=>this.shareCustom()),s.querySelector("#edview").addEventListener("click",()=>this.previewCustom()),s.querySelector("#edplay").addEventListener("click",()=>this.playCustom())}edData(e){return{id:e,name:this.edName,theme:this.edTheme,half:this.edHalf,pts:this.edPts,obstacles:this.edObs,patches:this.edPatches,protect:this.edProtect,openArcs:this.edOpenArcs}}themeGround(){const e=[["#6f5334","#7a5a34"],["#d9b877","#c9a35f"],["#9a9488","#b4ada0"],["#7d6a4e","#8a744f"],["#4f5b3a","#5f6a44"],["#c8b48c","#b8a074"],["#3f5a2e","#4f6a3a"],["#c98f4a","#b47c3a"]][this.edTheme%8];return{bg:e[0],corr:e[1]}}drawEditor(e){const t=e.getContext("2d"),i=e.width,s=e.height,a=h=>h/this.edW*i,o=h=>h/this.edH*s,r=this.themeGround();t.clearRect(0,0,i,s),t.fillStyle=r.bg,t.fillRect(0,0,i,s);const l=t.createRadialGradient(i/2,s/2,s*.3,i/2,s/2,i*.75);l.addColorStop(0,"rgba(0,0,0,0)"),l.addColorStop(1,"rgba(0,0,0,0.35)"),t.fillStyle=l,t.fillRect(0,0,i,s),t.strokeStyle="rgba(255,255,255,0.045)",t.lineWidth=1;for(let h=0;h<=this.edW;h+=8)t.beginPath(),t.moveTo(a(h),0),t.lineTo(a(h),s),t.stroke();for(let h=0;h<=this.edH;h+=8)t.beginPath(),t.moveTo(0,o(h)),t.lineTo(i,o(h)),t.stroke();const c=i/this.edW;this.edPts.length>1&&(t.lineCap="round",t.lineJoin="round",t.strokeStyle="rgba(0,0,0,0.28)",t.lineWidth=(this.edHalf*2+1.2)*c,this.strokePath(t,a,o),t.strokeStyle=r.corr,t.lineWidth=this.edHalf*2*c,this.strokePath(t,a,o),t.strokeStyle="rgba(255,255,255,0.10)",t.lineWidth=this.edHalf*2*c,this.strokePath(t,a,o),t.strokeStyle="rgba(70,45,20,0.85)",t.lineWidth=Math.max(2,.7*c),this.strokeOffset(t,a,o,this.edHalf),this.strokeOffset(t,a,o,-this.edHalf),t.strokeStyle="rgba(255,255,255,0.55)",t.lineWidth=Math.max(1.5,.35*c),t.setLineDash([6,6]),this.strokePath(t,a,o),t.setLineDash([]));for(const h of this.edPatches){const d=ii.ED_TOOLS.find(u=>u.t===h.surface)?.col||"#888";t.fillStyle=d+"cc",t.beginPath(),t.arc(a(h.x),o(h.y),2.4*c,0,7),t.fill(),t.fillStyle="#fff",t.font=`${Math.round(1.9*c)}px sans-serif`,t.textAlign="center",t.textBaseline="middle",t.fillText(ii.ED_TOOLS.find(u=>u.t===h.surface)?.ico||"",a(h.x),o(h.y))}for(const h of this.edObs){const d=ii.ED_TOOLS.find(u=>u.t===(h.type==="bonus"?"bonus"+(h.n||1):h.type));t.fillStyle="rgba(0,0,0,0.45)",t.beginPath(),t.arc(a(h.x),o(h.y),2*c,0,7),t.fill(),t.font=`${Math.round(2.4*c)}px sans-serif`,t.textAlign="center",t.textBaseline="middle",t.fillText(d?.ico||"⬤",a(h.x),o(h.y))}if(this.edPts.length){const h=this.edPts[0];t.fillStyle="#2ea44f",t.beginPath(),t.arc(a(h.x),o(h.y),1.5*c,0,7),t.fill(),t.font=`${Math.round(2.2*c)}px sans-serif`,t.textAlign="center",t.textBaseline="middle",t.fillText("🚦",a(h.x),o(h.y))}if(this.edPts.length>1){const h=this.edPts[this.edPts.length-1];t.font=`${Math.round(2.6*c)}px sans-serif`,t.textAlign="center",t.textBaseline="middle",t.fillText("🏁",a(h.x),o(h.y))}this.edPts.length<2&&(t.fillStyle="rgba(255,255,255,0.5)",t.font=`${Math.round(.03*i)}px sans-serif`,t.textAlign="center",t.fillText("✏️ arraste aqui pra desenhar a pista",i/2,s/2))}strokePath(e,t,i){e.beginPath(),this.edPts.forEach((s,a)=>{a?e.lineTo(t(s.x),i(s.y)):e.moveTo(t(s.x),i(s.y))}),e.stroke()}strokeOffset(e,t,i,s){const a=this.edPts;if(!(a.length<2)){e.beginPath();for(let o=0;o<a.length;o++){const r=a[Math.max(0,o-1)],l=a[Math.min(a.length-1,o+1)];let c=-(l.y-r.y),h=l.x-r.x;const d=Math.hypot(c,h)||1;c/=d,h/=d;const u=t(a[o].x+c*s),f=i(a[o].y+h*s);o?e.lineTo(u,f):e.moveTo(u,f)}e.stroke()}}edPlaceObs(e){if(this.edPts.length<2){this.notify("Trace a pista primeiro! ✏️","bad");return}const t=this.edTool;if(ii.ED_SURF.has(t)){this.edPatches.push({surface:t,x:e.x,y:e.y,r:2.4});return}const s={hole:{type:"hole"},bomb:{type:"bomb"},stone:{type:"stone"},jump:{type:"jump"},item:{type:"item"},bonus1:{type:"bonus",n:1},bonus2:{type:"bonus",n:2},bonus3:{type:"bonus",n:3}}[t];s&&this.edObs.push({type:s.type,x:e.x,y:e.y,n:s.n})}edPickAt(e){let t=null,i=36;for(const s of this.edObs){const a=(s.x-e.x)**2+(s.y-e.y)**2;a<i&&(i=a,t=s)}for(const s of this.edPatches){const a=(s.x-e.x)**2+(s.y-e.y)**2;a<i&&(i=a,t=s)}return t}edEraseAt(e){const t=this.edPickAt(e);if(!t)return;const i=this.edObs.indexOf(t);if(i>=0){this.edObs.splice(i,1);return}const s=this.edPatches.indexOf(t);s>=0&&this.edPatches.splice(s,1)}aiPlayers(){const e=pc(Ce.skin(),3);return[{name:"Você",isAI:!1,skin:Ce.skin()},...e.map((t,i)=>({name:zn[i%zn.length],isAI:!0,ai:Yt[i%Yt.length],skin:t}))]}playCustom(){if(this.edPts.length<3){this.notify("Trace a pista primeiro! ✏️","bad");return}const e=$s(this.edData("play"));this.cb.start({level:2,trackIdx:0,pick:"specific",players:this.aiPlayers(),mode:"quick",customTrack:e})}previewCustom(){if(this.edPts.length<3){this.notify("Trace a pista primeiro! ✏️","bad");return}const e=$s(this.edData("prev"));this.setPreviewDef(e),this.cb.preview?.(e)}setPreviewDef(e){this.edPrevDef=e;try{this.edPrevTrack=new Pd(e)}catch{this.edPrevTrack=null}}previewEditMode(){return this.edPrevMode==="view"?"off":this.edPrevMode}preview3D(e,t,i){const s=this.edPrevDef;if(!s)return!1;const a=s._shift||{dx:0,dy:0};if(this.edPrevMode==="move"){const o=t-a.dx,r=i-a.dy;if(e==="down")return this.edDragItem=this.edPickAt({x:o,y:r}),!1;if(e==="move"&&this.edDragItem)return this.edDragItem.x=o,this.edDragItem.y=r,!0;if(e==="up"){const l=!!this.edDragItem;return this.edDragItem=null,l}}else if(this.edPrevMode==="wall"&&e==="down"&&this.edPrevTrack){const o=this.edPrevTrack.progressOf({x:t,y:i}),r=this.edOpenArcs.findIndex(l=>Math.abs(l-o)<6);return r>=0?this.edOpenArcs.splice(r,1):this.edOpenArcs.push(o),!0}return!1}rebuildPreviewDef(){const e=$s(this.edData("prev"));return this.setPreviewDef(e),e}showPreviewBar(){this.clear(),this.edPrevMode="view",this.edDragItem=null;const e=this.el(`<div class="screen preview-bar">
      <div class="pv-top"><button class="txt-btn" id="pvback">‹ Editar</button><div class="pv-title">👁️ Ver em 3D</div><div></div></div>
      <div class="pv-modes">
        <button class="chip pv-m sel" data-m="view">👁️ Ver</button>
        <button class="chip pv-m" data-m="move">✋ Mover</button>
        <button class="chip pv-m" data-m="wall">🧱 Muro</button>
      </div>
      <div class="pv-hint" id="pvhint">Um dedo <b>gira</b> · dois dedos dão <b>zoom</b>. Toque numa ferramenta acima pra editar.</div>
      <div class="pv-actions"><button class="play-btn" id="pvplay">🏁 Jogar</button></div>
    </div>`);this.root.appendChild(e);const t=e.querySelector("#pvhint"),i=s=>{this.edPrevMode=s,e.querySelectorAll(".pv-m").forEach(a=>a.classList.toggle("sel",a.dataset.m===s)),t.innerHTML=s==="view"?"Um dedo <b>gira</b> · dois dedos dão <b>zoom</b>.":s==="move"?"✋ <b>Arraste</b> os objetos pro lugar exato. Dois dedos = câmera.":"🧱 <b>Toque no muro</b> pra apagar/pôr a proteção (mais aberto = mais difícil). Dois dedos = câmera."};e.querySelectorAll(".pv-m").forEach(s=>s.addEventListener("click",()=>i(s.dataset.m))),e.querySelector("#pvback").addEventListener("click",()=>this.onPreviewBack?.()),e.querySelector("#pvplay").addEventListener("click",()=>this.onPreviewPlay?.())}shareCustom(){if(this.edPts.length<3){this.notify("Trace a pista primeiro! ✏️","bad");return}try{const e=this.edData("sh"),t=JSON.stringify(e),i=btoa(unescape(encodeURIComponent(t))),s=location.origin+location.pathname+"#p="+i,a=`🏁 Joga a minha pista "${this.edName}" no Tampinha Rally: ${s}`;navigator.share?navigator.share({text:a}).catch(()=>{}):navigator.clipboard?navigator.clipboard.writeText(s).then(()=>this.notify("Link copiado! Mande pros amigos 🔗","good")).catch(()=>this.showShareLink(s)):this.showShareLink(s)}catch{this.notify("Não deu pra gerar o link","bad")}}showShareLink(e){const{box:t}=this.overlay(`<div class="ov-head"><b>🔗 Compartilhar pista</b><button class="ov-x">✕</button></div>
      <div class="ov-sub">Copie o link e mande pros amigos jogarem a sua pista:</div>
      <textarea class="share-box" readonly>${e}</textarea>`,"wide");t.querySelector(".share-box").select(),t.querySelector(".ov-x").addEventListener("click",()=>t.closest(".ov-bg")?.remove())}importSharedTrack(e){try{const t=decodeURIComponent(escape(atob(e))),i=JSON.parse(t);if(!i||!Array.isArray(i.pts)||i.pts.length<2)return!1;this.edPts=i.pts,this.edObs=i.obstacles||[],this.edPatches=i.patches||[],this.edTheme=i.theme||0,this.edHalf=i.half||4.2,this.edName=i.name||"Pista compartilhada",this.edProtect=i.protect==null?1:i.protect,this.edOpenArcs=i.openArcs||[];const s=$s(this.edData("shared")),{box:a,close:o}=this.overlay(`<div class="ov-head"><b>🎁 Pista compartilhada!</b><button class="ov-x">✕</button></div>
        <div class="ov-sub">Alguém te mandou a pista <b>“${this.edName}”</b>. Bora jogar?</div>
        <div class="mactions" style="margin-top:10px"><button class="chip" id="shedit">✏️ Abrir no editor</button><button class="play-btn" id="shplay">🏁 Jogar agora</button></div>`,"wide");return a.querySelector(".ov-x").addEventListener("click",o),a.querySelector("#shedit").addEventListener("click",()=>{o(),this.showEditor()}),a.querySelector("#shplay").addEventListener("click",()=>{o(),this.cb.start({level:2,trackIdx:0,pick:"specific",players:this.aiPlayers(),mode:"quick",customTrack:s})}),!0}catch{return!1}}showMyTracks(){const e=Ce.customTracks(),{box:t,close:i}=this.overlay(`<div class="ov-head"><b>📂 Minhas Pistas</b><button class="ov-x">✕</button></div>
      <div class="my-tracks" id="mt">${e.length?"":'<div class="mt-empty">Nenhuma pista salva ainda. Crie a sua! ✏️</div>'}</div>`,"wide"),s=t.querySelector("#mt");e.forEach(a=>{const o=this.el(`<div class="mt-row"><span class="mt-nm">🏁 ${a.name}</span><span class="mt-acts"><button class="chip mini" data-a="load">Abrir</button><button class="chip mini" data-a="share">🔗</button><button class="chip mini" data-a="play">Jogar</button><button class="chip mini danger" data-a="del">🗑️</button></span></div>`);o.querySelector('[data-a="load"]').addEventListener("click",()=>{this.edPts=a.pts.slice(),this.edObs=(a.obstacles||[]).slice(),this.edPatches=(a.patches||[]).slice(),this.edTheme=a.theme,this.edHalf=a.half,this.edName=a.name,this.edProtect=a.protect==null?1:a.protect,this.edOpenArcs=(a.openArcs||[]).slice(),i(),this.showEditor()}),o.querySelector('[data-a="share"]').addEventListener("click",()=>{this.edPts=a.pts.slice(),this.edObs=(a.obstacles||[]).slice(),this.edPatches=(a.patches||[]).slice(),this.edTheme=a.theme,this.edHalf=a.half,this.edName=a.name,this.shareCustom()}),o.querySelector('[data-a="play"]').addEventListener("click",()=>{const r=$s(a);i(),this.cb.start({level:2,trackIdx:0,pick:"specific",players:this.aiPlayers(),mode:"quick",customTrack:r})}),o.querySelector('[data-a="del"]').addEventListener("click",()=>{Ce.deleteTrack(a.id),o.remove()}),s.appendChild(o)}),t.querySelector(".ov-x").addEventListener("click",i)}resetPlayers(e){this.cfgPlayers=[{human:!0,ai:"cauteloso",color:0,name:"Você"}];let t=3;(e==="daily"||e==="trial")&&(t=0),e==="local"&&(t=1),e==="elim"&&(t=5),e==="dupla"&&(t=this.cfgTeamSize*2-1);for(let i=0;i<t;i++)this.cfgPlayers.push({human:e==="local",ai:Yt[i%Yt.length],color:(i+1)%Hs.length,name:e==="local"?`Jogador ${i+2}`:zn[i%zn.length]})}showSetup(e){if(this.cfgMode=e,this.resetPlayers(e),this.cfgPick="specific",e==="daily"){const t=new Date,i=t.getFullYear()*372+(t.getMonth()+1)*31+t.getDate();this.cfgLevel=i%5,this.cfgTrack=Math.floor(i/5)%an}this.renderSetup()}renderSetup(){this.clear();const e=this.cfgMode==="daily",t=this.cfgMode==="trial",i=this.cfgMode==="dupla",s=this.cfgMode==="elim",a=this.cfgMode==="caos",o=this.cfgMode==="champ",r=this.cfgPick!=="specific",l=zd(this.cfgLevel,this.cfgTrack),c=!e&&!t,h={quick:"Corrida Rápida",ai:"Contra a IA",local:"Multiplayer Local",champ:"Campeonato",daily:"Desafio Diário",caos:"🌀 Modo Caos",elim:"💀 Eliminação",trial:"⏱️ Contra-Relógio",dupla:"🤝 Corrida de Dupla"}[this.cfgMode],d=a?'<div class="mode-banner caos">🌀 <b>Modo Caos:</b> caixas <b>?</b> na pista dão power-ups. Quem está mais atrás pega os melhores (raio, foguete, salto). Toque no item pra usar!</div>':s?'<div class="mode-banner elim">💀 <b>Eliminação:</b> a cada corrida numa pista nova, o <b>último colocado sai</b>. Sobrevive até ser o único!</div>':t?'<div class="mode-banner trial">⏱️ <b>Contra-Relógio:</b> você sozinho. Leve a tampinha à chegada com o <b>menor número de petelecos</b> possível.</div>':i?'<div class="mode-banner dupla">🤝 <b>Dupla:</b> dois times. Vence o time com a <b>menor soma de colocações</b>. Ajude o parceiro… ou atrapalhe o rival!</div>':"",u=e?"":`<div class="lvl-row" id="lvls">
      ${ti.map((x,T)=>`<button class="lvl-chip ${T===this.cfgLevel?"sel":""}" data-l="${T}" style="--lc:${Ws[T]}"><b>${x}</b><span>${this.levelHint(T)}</span></button>`).join("")}
    </div>`;let f="";if(o){const x=bs[this.cfgChampFmt],T=Object.keys(bs).map(S=>`<button class="champ-fmt ${S===this.cfgChampFmt?"sel":""}" data-f="${S}"><span class="cf-ico">${bs[S].ico}</span><b>${bs[S].name}</b><span>${bs[S].desc}</span></button>`).join(""),M=this.cfgChampFmt==="gp"?"<b>todos os níveis</b> (Fácil → Extrema)":`nível <b style="color:${Ws[this.cfgLevel]}">${ti[this.cfgLevel]}</b>`;f=`<div class="champ-fmts">${T}</div>
        <div class="champ-note">🏆 <b>${x.races} corridas</b> · ${M}. Pontos por posição em cada corrida — some tudo e seja o <b>campeão</b>! 🏅</div>`}else if(r)f=`<div class="track-pick">
        <div class="track-card mystery" style="border-color:${this.cfgPick==="randany"?"#b98cff":Ws[this.cfgLevel]}">
          <div class="track-name">🎲 Surpresa!</div>
          <div class="track-sub">${this.cfgPick==="randany"?"pista aleatória de qualquer nível":"pista aleatória do nível "+ti[this.cfgLevel]}</div>
        </div>
      </div>`;else{const x=!e,T=Array.from({length:an},(M,S)=>`<button class="tnum ${S===this.cfgTrack?"sel":""}" data-i="${S}">${S+1}</button>`).join("");f=`<div class="track-pick">
        ${x?'<button class="arrow" id="tprev">‹</button>':""}
        <div class="track-card" style="border-color:${Ws[this.cfgLevel]}">
          <div class="track-name">${l.name}</div>
          <div class="track-sub">${l.theme} · ${this.lenLabel(l)}${x?" · pista "+(this.cfgTrack+1)+"/"+an:" · "+ti[this.cfgLevel]}</div>
          <div class="track-mini" id="mini"></div>
        </div>
        ${x?'<button class="arrow" id="tnext">›</button>':""}
      </div>
      ${x?`<div class="tnum-row" id="tnums">${T}</div>`:""}`}const g=i?`<div class="rand-row team-row">
      <button class="chip ${this.cfgTeamSize===2?"sel":""}" data-ts="2">2 × 2</button>
      <button class="chip ${this.cfgTeamSize===3?"sel":""}" data-ts="3">3 × 3</button>
    </div>`:"",b=e||o?"":`<div class="rand-row">
      <button class="chip ${this.cfgPick==="specific"?"sel":""}" id="pspec">🎯 Escolher</button>
      <button class="chip ${this.cfgPick==="randlevel"?"sel":""}" id="prlvl">🎲 Do nível</button>
      <button class="chip ${this.cfgPick==="randany"?"sel":""}" id="prany">🎲 Qualquer</button>
    </div>`,p=t?`<div class="daily-note">⏱️ <b>${l.name}</b> (${ti[this.cfgLevel]}). Você sozinho: chegue com o <b>menor número de petelecos</b>. Recorde nesta pista: <b>${Ce.trialBest(this.cfgLevel,this.cfgTrack)??"—"}</b></div>`:`<div class="daily-note">Pista do dia: <b>${l.name}</b> (${ti[this.cfgLevel]}). Contra o relógio: leve a tampinha à chegada com o <b>menor número de petelecos</b>. Recorde de hoje: <b>${Ce.dailyBest(L1())??"—"}</b></div>`,m=this.el(`
      <div class="screen setup">
        <div class="setup-head"><button class="txt-btn" id="back">‹ Voltar</button><h2>${h}</h2><div></div></div>
        ${d}
        ${u}
        ${g}
        ${b}
        ${f}
        ${c?`<div class="players" id="players"></div>
        ${i?"":`<div class="pcount">
          <button class="chip" id="less">– jogador</button>
          <span>${this.cfgPlayers.length} tampinhas</span>
          <button class="chip" id="more">+ jogador</button>
        </div>`}`:p}
        <div class="play-dock"><button class="play-btn" id="play">Jogar ▶</button></div>
      </div>`);this.root.appendChild(m),m.prepend(this.bgFx(6));const y=m.querySelector("#mini");y&&this.drawMini(y,l);const v=["caos","elim","trial","dupla"].includes(this.cfgMode);m.querySelector("#back").addEventListener("click",()=>v?this.showModes():this.showMenu()),m.querySelectorAll(".lvl-chip").forEach(x=>x.addEventListener("click",()=>{this.cfgLevel=+x.dataset.l,this.cfgTrack=0,this.renderSetup()})),m.querySelectorAll(".champ-fmt").forEach(x=>x.addEventListener("click",()=>{this.cfgChampFmt=x.dataset.f,this.renderSetup()})),m.querySelectorAll("[data-ts]").forEach(x=>x.addEventListener("click",()=>{this.cfgTeamSize=+x.dataset.ts,this.resetPlayers("dupla"),this.renderSetup()})),m.querySelector("#pspec")?.addEventListener("click",()=>{this.cfgPick="specific",this.renderSetup()}),m.querySelector("#prlvl")?.addEventListener("click",()=>{this.cfgPick="randlevel",this.renderSetup()}),m.querySelector("#prany")?.addEventListener("click",()=>{this.cfgPick="randany",this.renderSetup()}),m.querySelector("#tprev")?.addEventListener("click",()=>{this.cfgTrack=(this.cfgTrack+an-1)%an,this.renderSetup()}),m.querySelector("#tnext")?.addEventListener("click",()=>{this.cfgTrack=(this.cfgTrack+1)%an,this.renderSetup()}),m.querySelectorAll(".tnum").forEach(x=>x.addEventListener("click",()=>{this.cfgTrack=+x.dataset.i,this.renderSetup()})),c&&(this.renderPlayers(m.querySelector("#players")),m.querySelector("#less").addEventListener("click",()=>{this.cfgPlayers.length>2&&(this.cfgPlayers.pop(),this.renderSetup())}),m.querySelector("#more").addEventListener("click",()=>{if(this.cfgPlayers.length<6){const x=this.cfgPlayers.length;this.cfgPlayers.push({human:this.cfgMode==="local",ai:Yt[x%Yt.length],color:x%Hs.length,name:this.cfgMode==="local"?`Jogador ${x+1}`:zn[(x-1)%zn.length]}),this.renderSetup()}})),m.querySelector("#play").addEventListener("click",()=>this.launch())}levelHint(e){return["muito protegida","protegida","pouca proteção","quase sem muro","sem muro"][e]}lenLabel(e){let t=0;for(let i=1;i<e.path.length;i++)t+=Math.hypot(e.path[i].x-e.path[i-1].x,e.path[i].y-e.path[i-1].y);return t<320?"curta":t<480?"longa":t<620?"muito longa":"épica"}renderPlayers(e){e.innerHTML="";const t=this.cfgMode==="dupla";this.cfgPlayers.forEach((i,s)=>{const a=s===0,o=t?s%2:-1,r=t?`<span class="team-badge t${o}">Time ${o===0?"A":"B"}</span>`:"",l=this.el(`<div class="prow ${a?"you-row":""} ${t?"team-t"+o:""}">
        ${a?'<span class="pcap-mini" id="ycap"></span>':`<span class="pdot" style="background:${Hs[i.color]}"></span>`}
        <input class="pname" value="${i.name}" ${a?"readonly":""}/>
        ${r}
        ${a?'<button class="ptag you">🎨 trocar</button>':`<button class="ptype">${i.human?"👤 Humano":"🤖 "+Fd[i.ai]}</button>`}
      </div>`);e.appendChild(l);const c=l.querySelector(".pname");if(c.addEventListener("change",()=>i.name=c.value||i.name),a){const h=l.querySelector("#ycap"),d=it(et(Ce.skin()).art,60);d.style.width="100%",d.style.height="100%",d.style.display="block",h.appendChild(d);const u=()=>this.showCapPicker(Ce.skin(),f=>{this.cb.setSkin(f),this.renderPlayers(e)});h.addEventListener("click",u),l.querySelector(".ptag").addEventListener("click",u)}else{const h=l.querySelector(".pdot");h.addEventListener("click",()=>{i.color=(i.color+1)%Hs.length,h.style.background=Hs[i.color]});const d=l.querySelector(".ptype");d&&d.addEventListener("click",()=>{if(this.cfgMode==="local")i.human=!i.human,i.human||(i.ai=Yt[s%Yt.length]);else{const u=Yt.indexOf(i.ai);i.ai=Yt[(u+1)%Yt.length],i.human=!1}this.renderPlayers(e)})}})}launch(){const e=this.cfgMode==="daily"||this.cfgMode==="trial",t=this.cfgMode==="dupla",i=pc(Ce.skin(),this.cfgPlayers.length-1),s=e?[{name:"Você",isAI:!1,skin:Ce.skin()}]:this.cfgPlayers.map((r,l)=>({name:r.name,isAI:!r.human,ai:r.ai,skin:l===0?Ce.skin():i[l-1],team:t?l%2:void 0}));let a=this.cfgLevel,o=this.cfgTrack;this.cfgPick==="randlevel"?o=Math.floor(Math.random()*an):this.cfgPick==="randany"&&(a=Math.floor(Math.random()*5),o=Math.floor(Math.random()*an)),this.cb.start({level:a,trackIdx:o,pick:this.cfgPick,players:s,mode:this.cfgMode,champFmt:this.cfgChampFmt,teamSize:this.cfgTeamSize})}drawMini(e,t){const o=document.createElement("canvas");o.width=250,o.height=156;const r=o.getContext("2d"),l=Math.min((250-10*2)/t.w,(156-10*2)/t.h),c=(250-t.w*l)/2,h=(156-t.h*l)/2,d=g=>c+g*l,u=g=>h+g*l;r.fillStyle="#0000002e",r.fillRect(0,0,250,156),r.strokeStyle="rgba(255,255,255,0.18)",r.lineWidth=Math.max(4,8*l),r.lineCap="round",r.lineJoin="round",r.beginPath(),t.path.forEach((g,b)=>{const p=d(g.x),m=u(g.y);b?r.lineTo(p,m):r.moveTo(p,m)}),r.stroke(),r.strokeStyle=t.wallCol||"#caa",r.globalAlpha=.9,r.lineWidth=1.3,r.beginPath();for(const g of t.walls)r.moveTo(d(g.a.x),u(g.a.y)),r.lineTo(d(g.b.x),u(g.b.y));r.stroke(),r.globalAlpha=1,r.strokeStyle="rgba(255,255,255,0.5)",r.lineWidth=1.4,r.setLineDash([3,3]),r.beginPath(),t.path.forEach((g,b)=>{const p=d(g.x),m=u(g.y);b?r.lineTo(p,m):r.moveTo(p,m)}),r.stroke(),r.setLineDash([]);for(const g of t.obstacles){const b=Math.max(1.4,g.r*l);r.fillStyle=g.type==="hole"?"#120c06":g.type==="bomb"?"#e5484d":g.type==="stone"?"#9a948a":g.n>=3?"#e0a020":g.n===2?"#2e9fa4":"#2ea44f",r.beginPath(),r.arc(d(g.x),u(g.y),b,0,7),r.fill()}r.fillStyle="#3fae6a",r.beginPath(),r.arc(d(t.start.x),u(t.start.y),4,0,7),r.fill(),r.fillStyle="#e5484d";const f=t.finish[0];r.beginPath(),r.arc(d(f.x),u(f.y),4,0,7),r.fill(),e.innerHTML="",e.appendChild(o)}showSkins(){this.clear();const e=Ce.wins(),t=Ce.skin(),i=this.el(`<div class="screen skins">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Voltar</button><h2>Tampinhas <span class="cap-count">${to(e).length}/${Rt.filter(a=>!a.hidden).length}</span></h2><div></div></div>
      <div class="skin-scroll" id="scroll"></div>
    </div>`);this.root.appendChild(i),i.prepend(this.bgFx(5));const s=i.querySelector("#scroll");for(const a of kd){const o=Rt.filter(h=>h.rarity===a&&!h.hidden),r=o.filter(h=>e>=h.unlock||Ce.hasBonus(h.id)).length,l=this.el(`<div class="rar-sec">
        <div class="rar-head" style="--rc:${Dn[a]}"><span class="rar-dot"></span>${ei[a]} <b>${r}/${o.length}</b></div>
        <div class="skin-grid"></div></div>`);s.appendChild(l);const c=l.querySelector(".skin-grid");for(const h of o){const d=e<h.unlock&&!Ce.hasBonus(h.id),u=this.el(`<button class="skin-card ${t===h.id?"sel":""} ${d?"locked":""}" style="--rc:${Dn[h.rarity]}">
          <div class="skin-face"></div>
          <div class="skin-name">${h.name}</div>
          <div class="skin-desc">${d?h.prize!=null?"🏆 OURO nas 4 da "+no[h.prize].name:h.rprize!=null?(h.rcaos?"🌀":"⚔️")+" OURO nas 8 do "+_i[h.rprize].name+" (Ranqueada"+(h.rcaos?" Caos":"")+")":"🔒 "+h.unlock+" vitórias":h.desc}</div>
          ${zi(h.stats,!0)}
        </button>`),f=u.querySelector(".skin-face"),g=it(h.art,132);g.style.width="100%",g.style.height="auto",g.style.display="block",d&&(g.style.filter="grayscale(1) brightness(0.55)"),f.appendChild(g),c.appendChild(u),d||u.addEventListener("click",()=>{this.cb.setSkin(h.id),this.showSkins()})}}i.querySelector("#back").addEventListener("click",()=>this.showMenu())}showSettings(){this.clear();const e=this.el(`<div class="screen settings">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Voltar</button><h2>Ajustes</h2><div></div></div>
      <div class="cfg-row"><label>Música</label><input type="range" id="mus" min="0" max="1" step="0.05" value="${Qt.music}"></div>
      <div class="cfg-row"><label>Efeitos</label><input type="range" id="sfx" min="0" max="1" step="0.05" value="${Qt.sfx}"></div>
      <div class="cfg-row"><label>Mudo</label><button class="chip" id="mute">${Qt.muted?"🔇 Ligado":"🔊 Desligado"}</button></div>
      <div class="how"><b>Como jogar:</b> arraste a tampinha <b>para trás</b> e solte — quanto mais puxa, mais forte. 3 petelecos por vez; chegue primeiro! <b>Proteção:</b> pistas fáceis têm muro que te segura na pista; nas difíceis o muro some e é fácil <b>cair fora</b> (volta pro início do turno). <b>Buraco</b> = volta ao checkpoint e perde 1 peteléco · <b>X</b> = perde a vez · <b>verde +1/+2/+3</b> = petelecos extras. Câmera: dois dedos giram/aproximam.</div>
    </div>`);this.root.appendChild(e),e.prepend(this.bgFx(5));const t=()=>this.cb.setVols(+e.querySelector("#mus").value,+e.querySelector("#sfx").value,Qt.muted);e.querySelector("#mus").addEventListener("input",t),e.querySelector("#sfx").addEventListener("input",t),e.querySelector("#mute").addEventListener("click",()=>{Qt.muted=!Qt.muted,t(),e.querySelector("#mute").textContent=Qt.muted?"🔇 Ligado":"🔊 Desligado"}),e.querySelector("#back").addEventListener("click",()=>this.showMenu())}overlay(e,t=""){const i=this.el(`<div class="ov-bg"><div class="ov ${t}">${e}</div></div>`);this.root.appendChild(i);const s=()=>i.remove();return i.addEventListener("click",a=>{a.target===i&&s()}),{box:i.querySelector(".ov"),close:s}}notify(e,t=""){const i=this.el(`<div class="float-msg ${t}">${e}</div>`);this.root.appendChild(i),setTimeout(()=>i.classList.add("show"),10),setTimeout(()=>{i.classList.remove("show"),setTimeout(()=>i.remove(),300)},2400)}showCapPicker(e,t){const i=to(Ce.wins()),{box:s,close:a}=this.overlay(`
      <div class="ov-head"><b>🎨 Sua tampinha</b><button class="ov-x">✕</button></div>
      <div class="ov-sub">Você tem ${i.length} tampinha${i.length>1?"s":""} — toque pra escolher</div>
      <div class="pick-grid" id="pg"></div>`,"wide"),o=s.querySelector("#pg");for(const r of i){const l=this.el(`<button class="pick-card ${r.id===e?"sel":""}" style="--rc:${Dn[r.rarity]}">
        <div class="pick-face"></div><div class="pick-name">${r.name}</div>${zi(r.stats,!0)}</button>`),c=it(r.art,96);c.style.width="100%",c.style.height="auto",c.style.display="block",l.querySelector(".pick-face").appendChild(c),l.addEventListener("click",()=>{t(r.id),a()}),o.appendChild(l)}s.querySelector(".ov-x").addEventListener("click",a)}showCapStats(e,t,i){const s=et(t),a=i||s.stats,o=!!i&&mc.some(([,h])=>i[h]>(s.stats[h]??1)+1e-6),{box:r,close:l}=this.overlay(`
      <div class="ov-head"><b>${e}</b><button class="ov-x">✕</button></div>
      <div class="cs-face" id="csf"></div>
      <div class="cs-name" style="color:${Dn[s.rarity]}">${s.name}</div>
      <div class="rar-head cs-rar" style="--rc:${Dn[s.rarity]};justify-content:center"><span class="rar-dot"></span>${ei[s.rarity]}</div>
      ${zi(a,!0,i?s.stats:void 0)}
      ${o?'<div class="cs-ofi">▲ melhorado na Oficina</div>':""}
      <div class="cs-desc">${s.desc}</div>`,"stats"),c=it(s.art,160);c.style.width="124px",c.style.height="124px",c.style.display="block",c.style.margin="0 auto",r.querySelector("#csf").appendChild(c),r.querySelector(".ov-x").addEventListener("click",l)}showHelp(){this.clear();const e=[["⚫","Buraco","Caiu, voltou! Você retorna ao <b>último checkpoint</b> e perde 1 peteléco. Eles ficam fora da linha central — dá pra desviar."],["💣","Bomba (X)","Explode e você <b>perde o resto da vez</b>. Passe bem longe."],["🪨","Pedra","Sólida: a tampinha <b>quica</b> nela. Dá pra usar de tabela pra fazer curva… ou te atrapalha."],["🛫","Rampa de salto","Com <b>velocidade</b> a tampinha decola e <b>voa por cima</b> do buraco na frente. Devagar, ela cai. Chegue com força!"],["⏫","Setas verdes","Tira de aceleração: dá um <b>impulso</b> no sentido da pista. Passe por cima pra ganhar velocidade."],["🪵","Tábuas (zig-zag)","Estreitam a pista de um lado e do outro. Faça o <b>zigue-zague</b> pra passar."],["💎","Bônus +1/+2/+3","Petelecos extras! Ficam em lugares <b>arriscados</b>: quanto maior o número, mais perto da beira ou de um buraco. O +3 é pra corajoso."],["🚩","Checkpoint","A faixa azul numerada. Ao <b>cruzar</b>, você fica salvo ali — se cair depois, volta pra este ponto (não pro início)."],["🏁","Fora da pista","Saiu do corredor? Volta pro começo do peteléco. Nas fases difíceis quase não tem muro — cuidado!"]],t=[["Peso","⚖️","Massa da tampinha. A <b>pesada</b> quase não sai do lugar quando batem nela e <b>empurra</b> as leves pra longe. Só que em areia/lama afunda e freia mais."],["Desliza","💨","Vai <b>mais longe</b> com o mesmo peteléco. Ótima em calçada/giz; cuidado pra não passar do ponto."],["Controle","🎯","Freia mais certinho no fim — <b>para onde você mira</b>. Boa pra encaixar em espaço apertado sem passar direto."],["Quique","🏀",'Quica mais nas <b>bordas</b> e pedras, e "tabela" mais forte batendo nas outras tampinhas.'],["Estabil.","🌀","Mantém a linha: <b>roda menos</b> e desvia menos do rumo. Estável = previsível."],["Potência","💥","Sai com mais <b>força</b>: bate mais forte nas rivais (joga elas longe) e atravessa melhor a <b>lama e a areia</b>. Quem vai mais longe é o Desliza."],["Aderência","🧲","Firmeza na pista: <b>difícil de te jogarem pra fora</b> quando batem em você. Segura firme na hora do encontrão."]],i=(a,o,r)=>`<div class="hc"><div class="hc-ico">${a}</div><div class="hc-tx"><div class="hc-t">${o}</div><div class="hc-d">${r}</div></div></div>`,s=this.el(`<div class="screen help">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Voltar</button><h2>Como Jogar</h2><div></div></div>
      <div class="help-scroll">
        <div class="help-intro">Arraste a tampinha <b>para trás</b> e solte — quanto mais puxa, mais forte. São <b>3 petelecos</b> por vez. A corrida acaba quando o <b>penúltimo</b> chega. Dois dedos giram/aproximam a câmera.</div>
        <h3 class="help-h">🧩 Obstáculos</h3>
        <div class="help-grid">${e.map(a=>i(a[0],a[1],a[2])).join("")}</div>
        <h3 class="help-h">🌍 Superfícies (cada uma faz uma coisa!)</h3>
        <div class="help-grid">${[["🟡","Areia","Freia bastante e <b>afunda o pesado</b>. Potência ajuda a atravessar."],["🌿","Grama","Freia e o mato <b>PUXA PRO LADO</b> — a tampinha girando desvia da linha. <b>Estabilidade</b> segura firme."],["🟤","Lama","<b>Prende</b> de verdade. Só muita <b>Potência</b> atravessa."],["💧","Água","A <b>correnteza EMPURRA</b> no sentido do fluxo — pode te levar pro lugar errado (ou certo!)."],["🧊","Gelo","Quase <b>não para</b> — desliza demais. Cuidado pra não passar do ponto!"],["🖍️","Giz/Calçada","Lisinho: desliza longe, bom pra ganhar distância."]].map(a=>i(a[0],a[1],a[2])).join("")}</div>
        <h3 class="help-h">🏅 Atributos das tampinhas</h3>
        <div class="help-note">Cada tampinha tem notas de <b>0 a 99</b>. Compare as barrinhas e os números pra escolher a sua!</div>
        <div class="help-grid">${t.map(a=>i(a[1],a[0],a[2])).join("")}</div>
      </div>
    </div>`);this.root.appendChild(s),s.prepend(this.bgFx(5)),s.querySelector("#back").addEventListener("click",()=>this.showMenu())}showMultiplayer(){this.clear();const e=this.el(`<div class="screen setup">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Voltar</button><h2>Multiplayer</h2><div></div></div>
      <div class="mp-choice">
        <button class="mp-card" id="mlocal"><span class="mp-ico">👥</span><b>Local</b><span>2–6 no mesmo aparelho, revezando</span></button>
        <button class="mp-card on" id="monline"><span class="mp-ico">🌐</span><b>Online</b><span>crie uma sala e jogue com amigos por código</span></button>
      </div>
    </div>`);this.root.appendChild(e),e.prepend(this.bgFx(6)),e.querySelector("#back").addEventListener("click",()=>this.showMenu()),e.querySelector("#mlocal").addEventListener("click",()=>this.showSetup("local")),e.querySelector("#monline").addEventListener("click",()=>this.showOnlineHome())}showOnlineHome(){this.clear();const e=this.el(`<div class="screen setup online-home">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Voltar</button><h2>Jogar Online</h2><div></div></div>
      <div class="ol-face" id="olface"></div>
      <div class="ol-facelab">sua tampinha (toque pra trocar)</div>
      <div class="ol-namelab">✏️ Seu nome (os outros vão ver assim)</div>
      <input class="ol-name" id="oname" maxlength="12" value="${this.myName}" placeholder="Seu nome"/>
      <button class="play-btn" id="create">➕ Criar sala</button>
      <div class="ol-or"><span>ou entre num código</span></div>
      <div class="ol-join">
        <input class="ol-code" id="ocode" maxlength="5" placeholder="CÓDIGO" autocomplete="off"/>
        <button class="chip big" id="join">Entrar ▶</button>
      </div>
      <div class="ol-tip">Cada um no seu aparelho ou aba. Até <b>6</b> jogadores — complete o resto com <b>IA</b>. Conexão direta P2P.</div>
    </div>`);this.root.appendChild(e),e.prepend(this.bgFx(5));const t=it(et(Ce.skin()).art,96);t.style.width="86px",t.style.height="86px",t.style.display="block",t.style.margin="0 auto";const i=e.querySelector("#olface");i.appendChild(t),i.addEventListener("click",()=>this.showCapPicker(Ce.skin(),r=>{this.cb.setSkin(r),this.showOnlineHome()}));const s=e.querySelector("#oname"),a=e.querySelector("#ocode"),o=()=>(this.myName=(s.value||"Você").slice(0,12),Ce.setName(this.myName),this.myName);s.addEventListener("change",o),a.addEventListener("input",()=>a.value=a.value.toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,5)),e.querySelector("#back").addEventListener("click",()=>{this.online.leave(),this.showMultiplayer()}),e.querySelector("#create").addEventListener("click",()=>{this.online.createRoom(o(),Ce.skin()),this.showLobby("Criando sala…")}),e.querySelector("#join").addEventListener("click",()=>{const r=a.value.trim();if(r.length<4){this.notify("Digite o código da sala","bad");return}this.online.joinRoom(r,o(),Ce.skin()),this.showLobby("Entrando na sala…")})}showLobby(e=""){this.clear(),this.lobbyOpen=!0;const t=this.el(`<div class="screen setup lobby">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Sair</button><h2>Sala Online</h2><div></div></div>
      <div class="lob-code" id="code"></div>
      <div class="lob-status" id="status">${e}</div>
      <div class="lob-seats" id="seats"></div>
      <div class="lob-ctrl" id="ctrl"></div>
    </div>`);this.root.appendChild(t),t.prepend(this.bgFx(4)),t.querySelector("#back").addEventListener("click",()=>{this.lobbyOpen=!1,this.online.leave(),this.showOnlineHome()}),this.online.onCode=()=>this.renderLobby(),this.online.onRoster=()=>this.renderLobby(),this.online.onError=i=>{const s=document.querySelector(".lobby #status");s&&(s.textContent=i,s.classList.add("err")),this.notify(i,"bad")},this.renderLobby()}renderLobby(){const e=this.root.querySelector(".lobby");if(!e)return;const t=this.online;e.querySelector("#code").innerHTML=t.code?`<span class="lc-lab">código</span><span class="lc-val" id="cval">${t.code}</span><button class="chip lc-copy" id="copy">📋 Compartilhar</button>`:'<span class="lc-lab">conectando…</span>';const i=e.querySelector("#copy");i&&i.addEventListener("click",()=>{const r="Bora jogar Tampinha Rally! Código da sala: "+t.code;navigator.share?navigator.share({text:r}).catch(()=>{}):navigator.clipboard?navigator.clipboard.writeText(t.code).then(()=>this.notify("Código copiado!","good")):this.notify("Código: "+t.code)});const s=e.querySelector("#seats");s.innerHTML="";const a=t.seats.length?t.seats:[{name:t.myName,skin:t.mySkin,kind:"human",owner:"host"}];e.querySelector("#status").textContent=`${a.length}/6 na sala`,a.forEach(r=>{const l=r.kind==="human"&&r.owner===t.myId,c=r.off?"📴 saiu (IA)":r.kind==="ai"?"🤖 "+t.aiLabel(r.ai):r.owner==="host"?"👑 anfitrião":l?"⭐ você":"👤 jogador",h=t.cfg.roomMode==="dupla"&&r.team!=null?`<span class="team-badge t${r.team}">${r.team===0?"A":"B"}</span>`:"",d=l?`<input class="ls-name-edit" id="myname" maxlength="12" value="${r.name}"/>`:`<span class="ls-name">${r.name}</span>`,u=this.el(`<div class="prow lob-seat ${l?"you-row":""} ${t.cfg.roomMode==="dupla"&&r.team!=null?"team-t"+r.team:""}"><span class="pcap-mini"></span>${d}${h}<span class="ls-tag">${c}</span></div>`),f=it(et(r.skin).art,56);if(f.style.width="100%",f.style.height="100%",f.style.display="block",u.querySelector(".pcap-mini").appendChild(f),l){const g=u.querySelector(".pcap-mini");g.classList.add("tap"),g.addEventListener("click",()=>this.showCapPicker(t.mySkin,m=>{this.cb.setSkin(m),t.setMyCap(m)}));const b=u.querySelector("#myname"),p=()=>{const m=(b.value||"Você").slice(0,12);this.myName=m,Ce.setName(m),t.setMyName(m)};b.addEventListener("change",p),b.addEventListener("blur",p)}s.appendChild(u)});const o=e.querySelector("#ctrl");if(o.innerHTML="",t.isHost){const r=ti.map((g,b)=>`<button class="lvl-chip mini ${b===t.cfg.level?"sel":""}" data-l="${b}" style="--lc:${Ws[b]}"><b>${g}</b></button>`).join(""),l=`<div class="rand-row"><button class="chip ${t.cfg.pick==="specific"?"sel":""}" data-p="specific">🎯 Escolher</button><button class="chip ${t.cfg.pick==="randlevel"?"sel":""}" data-p="randlevel">🎲 Do nível</button><button class="chip ${t.cfg.pick==="randany"?"sel":""}" data-p="randany">🎲 Qualquer</button></div>`,c=t.cfg.pick==="specific"?`<div class="tnum-row">${Array.from({length:an},(g,b)=>`<button class="tnum ${b===t.cfg.trackIdx?"sel":""}" data-i="${b}">${b+1}</button>`).join("")}</div>`:"",h=t.cfg.roomMode,d=`<div class="lob-h">Modo da sala</div><div class="rand-row room-row">
        <button class="chip ${h==="normal"?"sel":""}" data-rm="normal">🏁 Normal</button>
        <button class="chip ${h==="dupla"?"sel":""}" data-rm="dupla">🤝 Dupla</button>
        <button class="chip ${h==="champ"?"sel":""}" data-rm="champ">🏆 Campeonato</button></div>`,u=h==="dupla"?`<div class="rand-row"><button class="chip ${t.cfg.teamSize===2?"sel":""}" data-team="2">2 × 2</button><button class="chip ${t.cfg.teamSize===3?"sel":""}" data-team="3">3 × 3</button></div>`:h==="champ"?`<div class="rand-row">${[3,5,7].map(g=>`<button class="chip ${t.cfg.champRaces===g?"sel":""}" data-cr="${g}">${g} corridas</button>`).join("")}</div>`:"",f=h==="dupla"?"":`<div class="lob-total"><button class="chip" id="tless">–</button><span><b>${t.total}</b> corredores <small>(${t.seats.filter(g=>g.kind==="human").length} 👤 + ${t.seats.filter(g=>g.kind==="ai").length} 🤖)</small></span><button class="chip" id="tmore">+</button></div>`;o.innerHTML=`${d}${u}<div class="lob-h">Dificuldade &amp; fase</div><div class="lvl-row">${r}</div>${l}${c}
        ${f}
        <button class="play-btn" id="startm">🏁 Começar ${h==="champ"?"Campeonato":h==="dupla"?"Dupla":"Partida"}</button>`,o.querySelectorAll("[data-rm]").forEach(g=>g.addEventListener("click",()=>t.setRoom(g.dataset.rm))),o.querySelectorAll("[data-team]").forEach(g=>g.addEventListener("click",()=>t.setRoom("dupla",+g.dataset.team))),o.querySelectorAll("[data-cr]").forEach(g=>g.addEventListener("click",()=>t.setRoom("champ",t.cfg.teamSize,+g.dataset.cr))),o.querySelectorAll(".lvl-chip").forEach(g=>g.addEventListener("click",()=>t.setCfg(+g.dataset.l,0,t.cfg.pick))),o.querySelectorAll("[data-p]").forEach(g=>g.addEventListener("click",()=>t.setCfg(t.cfg.level,t.cfg.trackIdx,g.dataset.p))),o.querySelectorAll(".tnum").forEach(g=>g.addEventListener("click",()=>t.setCfg(t.cfg.level,+g.dataset.i,t.cfg.pick))),o.querySelector("#tless")?.addEventListener("click",()=>t.setTotal(t.total-1)),o.querySelector("#tmore")?.addEventListener("click",()=>t.setTotal(t.total+1)),o.querySelector("#startm").addEventListener("click",()=>{this.lobbyOpen=!1,t.startMatch()})}else{const r=t.cfg.roomMode==="dupla"?`🤝 Dupla ${t.cfg.teamSize}×${t.cfg.teamSize}`:t.cfg.roomMode==="champ"?`🏆 Campeonato (${t.cfg.champRaces} corridas)`:"🏁 Normal";o.innerHTML=`<div class="lob-wait">⏳ Aguardando o anfitrião começar…<br><small>Modo: <b>${r}</b> · Dificuldade: <b>${ti[t.cfg.level]}</b></small></div>`}}showGame(){this.clear(),this.hud=this.el(`
    <div class="screen hud">
      <div class="hud-top">
        <button class="round" id="pause">❚❚</button>
        <div class="turn-banner" id="turn"></div>
        <button class="round" id="cam" title="A câmera segue sozinha">🎯</button>
      </div>
      <button class="round speed" id="speed" title="Velocidade das jogadas da IA">1×</button>
      <div class="standings" id="stand"></div>
      <div class="item-slot hidden" id="item"></div>
      <div class="flicks" id="flicks"></div>
      <div class="toast-wrap" id="toasts"></div>
      <div class="hint" id="hint"></div>
      <div class="modal-bg hidden" id="modal"><div class="modal" id="mbox"></div></div>
    </div>`),this.root.appendChild(this.hud),this.hud.querySelector("#pause").addEventListener("click",()=>this.onPause?.());const e=this.hud.querySelector("#speed");if(this.online.active)e.classList.add("hidden");else{const t=()=>{e.textContent=this.speedMul+"×",e.classList.toggle("fast",this.speedMul>1)};t(),e.addEventListener("click",()=>{this.speedMul=this.speedMul===1?2:this.speedMul===2?4:1,t(),this.onSpeed?.(this.speedMul)}),this.onSpeed?.(this.speedMul)}}updateHUD(e,t){if(!this.hud)return;const i=e.activeCap(),s=this.hud.querySelector("#turn");s.innerHTML=`<span class="tdot" style="background:${et(i.skin).top};color:${et(i.skin).top}"></span> ${i.finished?"Corrida!":"Vez de <b>"+i.name+"</b>"} <span class="tzoom">🔍</span>`,s.onclick=()=>this.showCapStats(i.name,i.skin,i.stats);const a=this.hud.querySelector("#flicks");let o="";Math.max(3,i.flicksLeft);for(let h=0;h<i.flicksLeft;h++)o+='<span class="fd on"></span>';a.innerHTML=(e.phase==="aim"&&t?'<span class="fl-lab">Petelecos</span>':"")+o+(i.flicksLeft===1?'<span class="flast">último!</span>':""),a.style.opacity=i.isAI||e.phase!=="aim"?"0.55":"1";const r=this.hud.querySelector("#item");if(e.chaos&&t&&e.phase==="aim"&&(i.items.length||i.shield||i.boostNext>1||i.smashNext||i.ghostNext)){r.classList.remove("hidden");let h="";i.items.forEach((u,f)=>{const g=ri[u];h+=`<button class="item-mini" data-i="${f}" title="${g.name}: ${g.desc}"><span class="im-ico">${g.ico}</span><span class="im-lab">${g.name}</span></button>`});const d=this.activeFxHtml(i);d&&(h+=`<div class="fx-active col">${d}</div>`),r.innerHTML=h,r.querySelectorAll(".item-mini").forEach(u=>u.addEventListener("click",()=>this.onUseItem?.(+u.dataset.i)))}else r.classList.add("hidden"),r.innerHTML="";const l=this.hud.querySelector("#stand");l.innerHTML=e.standings().map((h,d)=>`<div class="srow ${h.id===i.id?"act":""}" data-id="${h.id}"><span class="spos">${d+1}º</span><span class="sdot" style="background:${et(h.skin).top}"></span><span class="sname">${h.name}</span>${e.chaos?this.capFxIcons(h):""}${h.finished?'<span class="sfin">🏁</span>':'<span class="szoom">🔍</span>'}</div>`).join(""),l.querySelectorAll(".srow").forEach(h=>h.addEventListener("click",()=>{const d=e.caps[+h.dataset.id];d&&this.showCapStats(d.name,d.skin,d.stats)}));const c=this.hud.querySelector("#hint");c.style.display=t&&e.phase==="aim"?"block":"none",c.textContent="Arraste a tampinha para trás e solte"}capFxIcons(e){let t="";for(const i of e.items||[])t+=`<span class="fx-held" title="guardado">${ri[i].ico}</span>`;return e.shield&&(t+='<span class="fx-on" title="escudo ativo">🛡️</span>'),e.boostNext>1&&(t+='<span class="fx-on" title="turbo pronto">🚀</span>'),e.smashNext&&(t+='<span class="fx-on" title="pancada armada">🥊</span>'),e.ghostNext&&(t+='<span class="fx-on" title="fantasma armado">👻</span>'),e.anchored&&(t+='<span class="fx-on" title="com âncora">⚓</span>'),t?`<span class="srow-fx">${t}</span>`:""}activeFxHtml(e){const t=[];return e.shield&&t.push('<span class="fxa shield">🛡️ Escudo</span>'),e.boostNext>1&&t.push('<span class="fxa boost">🚀 Turbo</span>'),e.smashNext&&t.push('<span class="fxa boost">🥊 Pancada</span>'),e.ghostNext&&t.push('<span class="fxa boost">👻 Fantasma</span>'),e.anchored&&t.push('<span class="fxa shield">⚓ Âncora!</span>'),t.join("")}toast(e,t=""){if(!this.hud)return;const i=this.hud.querySelector("#toasts"),s=this.el(`<div class="toast ${t}">${e}</div>`);i.appendChild(s),setTimeout(()=>s.classList.add("show"),10),setTimeout(()=>{s.classList.remove("show"),setTimeout(()=>s.remove(),300)},1700)}showPause(){const e=this.hud.querySelector("#modal"),t=this.hud.querySelector("#mbox");t.className="modal",t.innerHTML=`<h3>Pausado</h3><div class="mactions col">
      <button class="play-btn" id="r">▶ Continuar</button>
      <button class="chip" id="re">↻ Reiniciar</button>
      <button class="chip" id="mn">Sair</button></div>`,e.classList.remove("hidden"),t.querySelector("#r").addEventListener("click",()=>this.onResume?.()),t.querySelector("#re").addEventListener("click",()=>this.onRestart?.()),t.querySelector("#mn").addEventListener("click",()=>this.onMenu?.())}hideModal(){this.hud?.querySelector("#modal").classList.add("hidden")}showResults(e,t,i,s){const a=this.hud.querySelector("#modal"),o=this.hud.querySelector("#mbox"),r=e.standings(),l=t==="online"&&this.online.active?e.caps[this.online.mySeatIndex()]:e.caps.find(b=>!b.isAI),c=s?s.won:l&&l.place===1;o.className="modal win";const h=t==="daily"?`<h3>Chegou! 🏁</h3><div class="big">${e.caps[0].place===1?"Você completou!":""}</div>`:s?`<h3>${s.won?"Seu time venceu! 🎉":"Fim de jogo"}</h3>`:i?`<h3 style="font-size:22px">Corrida ${i.race}/${i.total} 🏁</h3>`:`<h3>${c?"Você venceu! 🎉":l?l.place+"º lugar":"Fim!"}</h3>`,d=i?`${br(i.race,i.total,i.hist)}<div class="champ-stand"><div class="cs-title">🏆 Classificação do campeonato</div>${i.rows.map((b,p)=>`<div class="cs-row ${b.you?"you":""} ${p===0?"lead":""}"><span class="cs-pos">${p+1}º</span><span class="cs-cap" data-s="${b.skin}"></span><span class="cs-nm">${b.name}</span><b class="cs-pts">${b.pts}</b></div>`).join("")}</div>`:"",u=s?`<div class="team-cols">${s.teams.map(b=>`<div class="team-col ${b.win?"win":""} ${b.you?"mine":""}"><div class="team-h">${b.win?"🏆 ":""}${b.label}</div><div class="team-score">${b.score} <small>pts</small></div>${b.members.slice().sort((p,m)=>p.place-m.place).map(p=>`<div class="team-mem"><span class="tm-cap" data-s="${p.skin}"></span><span class="tm-nm">${p.name}</span><b>${p.place}º</b></div>`).join("")}</div>`).join("")}</div>`:"",f=t==="online"?this.online.isHost?'<button class="chip" id="mn">Sair da sala</button><button class="play-btn" id="lob">🔁 Nova partida</button>':'<button class="chip" id="mn">Sair da sala</button><div class="ol-wait2">⏳ Aguardando o anfitrião…</div>':i?`<button class="chip" id="mn">Sair</button><button class="play-btn" id="nx">${i.last?"🏆 Ver campeão":"Próxima ▶"}</button>`:'<button class="chip" id="mn">Menu</button><button class="chip" id="re">↻ Revanche</button><button class="play-btn" id="nx">Nova pista ▶</button>';o.innerHTML=`${h}${s?u:i?d:'<div class="podium" id="pod"></div>'}<div class="mactions">${f}</div>`,i&&o.querySelectorAll(".cs-cap").forEach(b=>{b.appendChild(it(et(b.dataset.s).art,44))}),s&&o.querySelectorAll(".tm-cap").forEach(b=>{b.appendChild(it(et(b.dataset.s).art,36))});const g=o.querySelector("#pod");g&&r.slice(0,Math.min(4,r.length)).forEach((b,p)=>{const m=this.el(`<div class="prow2 ${p===0?"p1":""}"><span class="pl">${["🥇","🥈","🥉","4º"][p]}</span><span class="pcap"></span><span class="pn">${b.name}</span></div>`);m.querySelector(".pcap").appendChild(it(et(b.skin).art,64)),m.addEventListener("click",()=>this.showCapStats(b.name,b.skin,b.stats)),g.appendChild(m)}),a.classList.remove("hidden"),(c||t==="daily"&&e.caps[0].place===1)&&this.confetti(o),o.querySelector("#mn").addEventListener("click",()=>{t==="online"&&this.online.leave(),this.onMenu?.()}),o.querySelector("#re")?.addEventListener("click",()=>this.onRestart?.()),o.querySelector("#nx")?.addEventListener("click",()=>this.onNext?.()),o.querySelector("#lob")?.addEventListener("click",()=>{this.hideModal(),this.online.backToLobby()})}showOnlineChampStanding(e,t,i,s,a){const{modal:o,box:r}=this.modalBox();r.className="modal win";const l=a?`<button class="chip" id="mn">Sair da sala</button><button class="play-btn" id="nx">${s?"🏆 Ver campeão":"Próxima corrida ▶"}</button>`:'<button class="chip" id="mn">Sair da sala</button><div class="ol-wait2">⏳ Aguardando o anfitrião…</div>';r.innerHTML=`<h3 style="font-size:22px">🏆 Campeonato · Corrida ${t}/${i}</h3>
      <div class="champ-stand"><div class="cs-title">Classificação geral</div>${e.map((c,h)=>`<div class="cs-row ${c.you?"you":""} ${h===0?"lead":""}"><span class="cs-pos">${h+1}º</span><span class="cs-cap" data-s="${c.skin}"></span><span class="cs-nm">${c.name}</span><b class="cs-pts">${c.pts}</b></div>`).join("")}</div>
      <div class="mactions">${l}</div>`,r.querySelectorAll(".cs-cap").forEach(c=>c.appendChild(it(et(c.dataset.s).art,44))),o.classList.remove("hidden"),r.querySelector("#mn").addEventListener("click",()=>{this.online.leave(),this.onMenu?.()}),r.querySelector("#nx")?.addEventListener("click",()=>{this.hideModal(),this.online.hostNextChamp()})}modalBox(){return{modal:this.hud.querySelector("#modal"),box:this.hud.querySelector("#mbox")}}showTrialResult(e){const{modal:t,box:i}=this.modalBox();i.className="modal win",i.innerHTML=`<h3>${e.finished?e.record?"NOVO RECORDE! 🏆":"Chegou! ⏱️":"Fim"}</h3>
      <div class="trial-big"><span class="tb-num">${e.flicks}</span><span class="tb-lab">petelecos</span></div>
      <div class="trial-best">🏅 Recorde nesta pista: <b>${e.best??e.flicks}</b></div>
      <div class="mactions"><button class="chip" id="mn">Menu</button><button class="chip" id="re">↻ De novo</button><button class="play-btn" id="nx">Nova pista ▶</button></div>`,t.classList.remove("hidden"),e.record&&this.confetti(i),i.querySelector("#mn").addEventListener("click",()=>this.onMenu?.()),i.querySelector("#re").addEventListener("click",()=>this.onRestart?.()),i.querySelector("#nx").addEventListener("click",()=>this.onNext?.())}showTeamResult(e){const{modal:t,box:i}=this.modalBox();i.className="modal win";const s=e.teams.map(a=>`<div class="team-col ${a.win?"win":""} ${a.you?"mine":""}">
      <div class="team-h">${a.win?"🏆 ":""}${a.label}</div>
      <div class="team-score">${a.score} <small>pts</small></div>
      ${a.members.sort((o,r)=>o.place-r.place).map(o=>`<div class="team-mem"><span class="tm-cap" data-s="${o.skin}"></span><span class="tm-nm">${o.name}</span><b>${o.place}º</b></div>`).join("")}
    </div>`).join("");i.innerHTML=`<h3>${e.won?"Seu time venceu! 🎉":"Fim de jogo"}</h3>
      <div class="team-cols">${s}</div>
      <div class="team-note">Vence o time com a <b>menor soma</b> de colocações.</div>
      <div class="mactions"><button class="chip" id="mn">Menu</button><button class="chip" id="re">↻ Revanche</button><button class="play-btn" id="nx">Nova pista ▶</button></div>`,i.querySelectorAll(".tm-cap").forEach(a=>a.appendChild(it(et(a.dataset.s).art,36))),t.classList.remove("hidden"),e.won&&this.confetti(i),i.querySelector("#mn").addEventListener("click",()=>this.onMenu?.()),i.querySelector("#re").addEventListener("click",()=>this.onRestart?.()),i.querySelector("#nx").addEventListener("click",()=>this.onNext?.())}showElimResult(e){const{modal:t,box:i}=this.modalBox();i.className="modal win",i.innerHTML=`<h3>${e.last?"Última eliminação!":"💀 Eliminado!"}</h3>
      <div class="elim-loser"><span class="el-cap" id="elc"></span><div><b>${e.loser.name}</b><span> foi eliminado${e.youOut?" — era VOCÊ 😵":""}</span></div></div>
      <div class="elim-alive"><div class="ea-t">Ainda na disputa (${e.survivors.length})</div>
        ${e.survivors.map((s,a)=>`<div class="ea-row ${s.you?"you":""}"><span class="ea-cap" data-s="${s.skin}"></span><span class="ea-nm">${s.name}</span>${a===0?'<span class="ea-lead">🥇 líder</span>':""}</div>`).join("")}</div>
      <div class="mactions"><button class="chip" id="mn">Sair</button><button class="play-btn" id="nx">${e.last?"🏆 Ver campeão":"Próxima corrida ▶"}</button></div>`,i.querySelector("#elc").appendChild(it(et(e.loser.skin).art,52)),i.querySelectorAll(".ea-cap").forEach(s=>s.appendChild(it(et(s.dataset.s).art,36))),t.classList.remove("hidden"),i.querySelector("#mn").addEventListener("click",()=>this.onMenu?.()),i.querySelector("#nx").addEventListener("click",()=>this.onNext?.())}showChampion(e){const t=this.hud.querySelector("#modal"),i=this.hud.querySelector("#mbox");i.className="modal win champ-final";const s=e.fmt==="elim"?"Eliminação":bs[e.fmt]?.name||"Campeonato";i.innerHTML=`
      <div class="cf-crown">👑</div>
      <h3 style="color:#c98a00">${e.youWon?"VOCÊ é o campeão! 🎉":"Campeão do "+s}</h3>
      <div class="cf-face" id="cff"></div>
      <div class="cf-name">${e.name} 🏆</div>
      <div class="champ-stand final">${e.rows.map((o,r)=>`<div class="cs-row ${o.you?"you":""} ${r===0?"lead":""}"><span class="cs-pos">${["🥇","🥈","🥉"][r]||r+1+"º"}</span><span class="cs-cap" data-s="${o.skin}"></span><span class="cs-nm">${o.name}</span><b class="cs-pts">${o.pts} pts</b></div>`).join("")}</div>
      <div class="mactions"><button class="play-btn" id="mn">Menu ▶</button></div>`;const a=it(et(e.skin).art,150);a.style.width="110px",a.style.height="110px",a.style.display="block",a.style.margin="0 auto",i.querySelector("#cff").appendChild(a),i.querySelectorAll(".cs-cap").forEach(o=>o.appendChild(it(et(o.dataset.s).art,40))),t.classList.remove("hidden"),this.confetti(i),i.querySelector("#mn").addEventListener("click",()=>this.onMenu?.())}};ii.ED_TOOLS=[{t:"draw",ico:"✏️",lab:"Traçar",grp:"p",col:"#8fd0ff"},{t:"move",ico:"✋",lab:"Mover",grp:"p",col:"#ffd94a"},{t:"erase",ico:"🧽",lab:"Apagar",grp:"p",col:"#ff8a8a"},{t:"hole",ico:"⚫",lab:"Buraco",grp:"o",col:"#100a04"},{t:"bomb",ico:"💣",lab:"Bomba",grp:"o",col:"#e5484d"},{t:"stone",ico:"🪨",lab:"Pedra",grp:"o",col:"#9a948a"},{t:"jump",ico:"🛫",lab:"Salto",grp:"o",col:"#c9902e"},{t:"item",ico:"❓",lab:"Caixa",grp:"o",col:"#a86bff"},{t:"top",ico:"🪀",lab:"Pião",grp:"o",col:"#d84a8a"},{t:"car",ico:"🚗",lab:"Carrinho",grp:"o",col:"#f2b13a"},{t:"band",ico:"➰",lab:"Elástico",grp:"o",col:"#e5484d"},{t:"mill",ico:"🎡",lab:"Catavento",grp:"o",col:"#4a90d8"},{t:"balloon",ico:"🎈",lab:"Bexiga",grp:"o",col:"#3f9ae0"},{t:"bonus1",ico:"💎",lab:"+1",grp:"b",col:"#2ea44f"},{t:"bonus2",ico:"💠",lab:"+2",grp:"b",col:"#2e9fa4"},{t:"bonus3",ico:"🏆",lab:"+3",grp:"b",col:"#e0a020"},{t:"ramp",ico:"⏫",lab:"Impulso",grp:"s",col:"#3fae6a"},{t:"push",ico:"⏬",lab:"Freio",grp:"s",col:"#e5484d"},{t:"sand",ico:"🟡",lab:"Areia",grp:"s",col:"#d9b877"},{t:"mud",ico:"🟤",lab:"Lama",grp:"s",col:"#5c452a"},{t:"water",ico:"💧",lab:"Água",grp:"s",col:"#4a90b8"},{t:"grass",ico:"🌿",lab:"Grama",grp:"s",col:"#5f8a36"},{t:"ice",ico:"🧊",lab:"Gelo",grp:"s",col:"#a8dcf5"},{t:"gum",ico:"🍬",lab:"Chiclete",grp:"s",col:"#e878b0"},{t:"magnet",ico:"🧲",lab:"Ímã",grp:"s",col:"#d34a4a"},{t:"vortex",ico:"🌀",lab:"Redemoinho",grp:"s",col:"#58a8d8"}],ii.ED_SURF=new Set(["sand","mud","water","grass","ice","gum","magnet","vortex","ramp","push"]);let fc=ii;function pc(n,e){const t=et(n).rarity,i=Rt.filter(a=>a.rarity===t&&a.id!==n&&!a.hidden&&a.prize==null).map(a=>a.id);for(let a=i.length-1;a>0;a--){const o=Math.floor(Math.random()*(a+1));[i[a],i[o]]=[i[o],i[a]]}const s=[];for(let a=0;a<Math.max(0,e);a++)s.push(i.length?i[a%i.length]:n);return s}function Qd(n){return Math.max(1,Math.min(99,Math.round((n-.8)/.45*99)))}function R1(n){return n>=74?"hi":n>=50?"mid":"lo"}function P1(n,e,t=!1){const i=Qd(e),s=Math.max(8,Math.min(100,Math.round((e-.8)/.4*100)));return`<div class="sbar ${R1(i)}"><span class="sbl">${n}</span><span class="strack"><i style="width:${s}%"></i></span><b class="sval">${i}${t?'<i class="sup">▲</i>':""}</b></div>`}const mc=[["Desliza","slide"],["Peso","weight"],["Controle","control"],["Quique","bounce"],["Estabil.","stability"],["Potência","power"],["Aderência","grip"]];function zi(n,e=!1,t){return`<div class="skin-bars">${(e?mc:mc.slice(0,4)).map(([s,a])=>P1(s,n[a],!!t&&n[a]>(t[a]??1)+1e-6)).join("")}</div>`}function br(n,e,t){const i=r=>r===1?"🥇":r===2?"🥈":r===3?"🥉":r?r+"º":"·";let s="";for(let r=0;r<e;r++){const l=r<n,c=r===n;s+=`<div class="rs-cell ${l?"done":c?"next":""}">
      <span class="rs-flag">${l?"🏁":c?"▶️":"🔒"}</span>
      <span class="rs-med">${l?i(t?.[r]):c?"AGORA":""}</span>
      <span class="rs-lab">${r+1}ª</span>
    </div>`,r<e-1&&(s+=`<i class="rs-link ${r<n-1||r===n-1&&n>0?"on":""}"></i>`)}const a=e-n,o=a===0?"🏆 Competição completa!":a===1?"🔥 Falta só a ÚLTIMA corrida!":`Faltam <b>${a}</b> corridas`;return`<div class="rstrip">${s}</div><div class="rs-note">${o}</div>`}function L1(){const n=new Date;return`${n.getFullYear()}-${n.getMonth()+1}-${n.getDate()}`}const Oh=["Bolha","Zé","Nina","Tato","Duda","Chico"];class k1{constructor(){this.net=new wh,this.active=!1,this.inRoom=!1,this.isHost=!1,this.code="",this.myId="host",this.myName="Você",this.mySkin="coca",this.humans=[],this.seats=[],this.total=4,this.cfg={level:0,trackIdx:0,pick:"specific",roomMode:"normal",teamSize:2,champRaces:3},this.mgr=null,this.champ=null,this.onRoster=()=>{},this.onError=()=>{},this.onCode=()=>{},this.onStartMatch=()=>{},this.onToLobby=()=>{},this.onClosed=()=>{},this.onChampStanding=()=>{},this.onChampEnd=()=>{},this.lastTok="",this.decided=!1,this.aiWait=0,this.applied=new Set,this.pendingFlick=null,this.pendingSync=null}reset(){this.net.destroy(),this.net=new wh,this.active=!1,this.inRoom=!1,this.isHost=!1,this.code="",this.myId="host",this.humans=[],this.seats=[],this.total=4,this.mgr=null,this.cfg={level:0,trackIdx:0,pick:"specific",roomMode:"normal",teamSize:2,champRaces:3},this.champ=null,this.lastTok="",this.decided=!1,this.aiWait=0,this.applied.clear(),this.pendingFlick=null,this.pendingSync=null}createRoom(e,t){this.reset(),this.isHost=!0,this.myId="host",this.myName=e,this.mySkin=t,this.humans=[{owner:"host",name:e,skin:t}],this.total=4,this.inRoom=!0,this.net.onOpen=i=>{this.code=i,this.onCode(i),this.rebuild()},this.net.onData=(i,s)=>this.hostData(i,s),this.net.onLeave=i=>this.hostLeave(i),this.net.onError=i=>this.onError(this.friendly(i)),this.net.host()}joinRoom(e,t,i){this.reset(),this.isHost=!1,this.myName=t,this.mySkin=i,this.net.onOpen=()=>{this.myId=this.net.peer.id,this.inRoom=!0,this.code=e.toUpperCase(),this.net.send("host",{t:"hello",name:t,skin:i}),this.onCode(this.code)},this.net.onData=(s,a)=>this.clientData(a),this.net.onLeave=()=>{this.inRoom&&(this.onError("Conexão com o anfitrião caiu"),this.onClosed())},this.net.onError=s=>this.onError(this.friendly(s)),this.net.join(e)}friendly(e){return e==="peer-unavailable"?"Sala não encontrada — confira o código":e==="network"||e==="server-error"||e==="socket-error"?"Sem conexão com o servidor de salas":e==="browser-incompatible"?"Navegador sem suporte a P2P":"Falha de conexão ("+e+")"}leave(){try{this.net.broadcast({t:"bye"})}catch{}this.reset()}rebuild(){if(!this.isHost)return;this.humans.length>6&&(this.humans=this.humans.slice(0,6)),this.cfg.roomMode==="dupla"&&(this.total=this.cfg.teamSize*2),this.total<this.humans.length&&(this.total=this.humans.length),this.total>6&&(this.total=6),this.total<2&&(this.total=2);const e=this.humans.map(o=>({name:o.name,skin:o.skin,kind:"human",owner:o.owner,off:o.off})),t=this.humans.map(o=>o.skin),i=(this.humans.find(o=>o.owner==="host")||this.humans[0])?.skin||"coca",s=Rt.filter(o=>o.rarity===et(i).rarity&&!t.includes(o.id)&&!o.hidden&&o.prize==null).map(o=>o.id);for(let o=s.length-1;o>0;o--){const r=Math.floor(Math.random()*(o+1));[s[o],s[r]]=[s[r],s[o]]}let a=0;for(;e.length<this.total;){const o=a++,r=s.length?s[o%s.length]:Rt[Math.floor(Math.random()*Rt.length)].id;e.push({name:Oh[o%Oh.length],skin:r,kind:"ai",ai:Yt[o%Yt.length],owner:"host"})}this.cfg.roomMode==="dupla"?e.forEach((o,r)=>o.team=this.seatTeam(r)):e.forEach(o=>o.team=void 0),this.seats=e,this.broadcastRoster(),this.onRoster()}broadcastRoster(){this.net.broadcast({t:"roster",seats:this.seats,total:this.total,cfg:this.cfg})}setTotal(e){!this.isHost||this.cfg.roomMode==="dupla"||(this.total=Math.max(this.humans.length,Math.min(6,e)),this.rebuild())}setCfg(e,t,i){this.isHost&&(this.cfg.level=e,this.cfg.trackIdx=t,this.cfg.pick=i,this.rebuild())}setRoom(e,t=this.cfg.teamSize,i=this.cfg.champRaces){this.isHost&&(this.cfg.roomMode=e,this.cfg.teamSize=t,this.cfg.champRaces=i,e==="dupla"&&(this.total=t*2),this.rebuild())}seatTeam(e){return e%2}setMyCap(e){if(this.mySkin=e,this.isHost){const t=this.humans.find(i=>i.owner==="host");t&&(t.skin=e),this.rebuild()}else this.net.send("host",{t:"setcap",skin:e})}setMyName(e){const t=(e||"Você").slice(0,12);if(this.myName=t,this.isHost){const i=this.humans.find(s=>s.owner==="host");i&&(i.name=t),this.rebuild()}else this.net.send("host",{t:"setname",name:t})}hostData(e,t){if(this.isHost)if(t.t==="hello"){if(this.active||this.humans.some(i=>i.owner===e))return;if(this.humans.length>=6){this.net.send(e,{t:"full"});return}this.humans.push({owner:e,name:(t.name||"Jogador").slice(0,12),skin:t.skin||"coca"}),this.total<this.humans.length&&(this.total=this.humans.length),this.rebuild()}else if(t.t==="setcap"){const i=this.humans.find(s=>s.owner===e);i&&(i.skin=t.skin,this.rebuild())}else if(t.t==="setname"){const i=this.humans.find(s=>s.owner===e);i&&(i.name=(t.name||"Jogador").slice(0,12),this.rebuild())}else t.t==="flick"?(this.net.relay(e,t),this.pendingFlick=t):t.t==="bye"&&this.hostLeave(e)}hostLeave(e){if(this.isHost)if(this.active){for(const i of this.seats)i.owner===e&&(i.off=!0,i.ai||(i.ai=Yt[Math.floor(Math.random()*Yt.length)]));const t=this.humans.find(i=>i.owner===e);t&&(t.off=!0)}else this.humans=this.humans.filter(t=>t.owner!==e),this.rebuild()}clientData(e){if(e.t==="roster")this.seats=e.seats,this.total=e.total,this.cfg=e.cfg,this.onRoster();else if(e.t==="start")this.beginMatch(e.level,e.trackIdx,e.seats);else if(e.t==="flick")this.pendingFlick=e;else if(e.t==="sync")this.pendingSync=e.s;else if(e.t==="champres"){const t=this.mySeatIndex(),i=new Map(e.pts),s=this.seats.map((a,o)=>({seat:o,name:a.name,skin:a.skin,pts:i.get(o)||0,you:o===t})).sort((a,o)=>o.pts-a.pts);this.onChampStanding(s,e.race,e.total,e.last)}else if(e.t==="champend"){const t=this.seats[e.seat];this.active=!1,this.onChampEnd({name:t?.name||"",skin:t?.skin||"coca",you:e.seat===this.mySeatIndex()})}else e.t==="tolobby"?(this.active=!1,this.onToLobby()):e.t==="full"?(this.onError("A sala está cheia"),this.onClosed()):e.t==="bye"&&(this.onError("O anfitrião encerrou a sala"),this.onClosed())}startMatch(){if(!this.isHost)return;this.rebuild();let e=this.cfg.level,t=this.cfg.trackIdx;if(this.cfg.pick==="randlevel"?t=Math.floor(Math.random()*10):this.cfg.pick==="randany"&&(e=Math.floor(Math.random()*5),t=Math.floor(Math.random()*10)),this.cfg.roomMode==="champ"){const s=Math.max(2,Math.min(9,this.cfg.champRaces)),a=[0,1,2,3,4,5,6,7,8,9];for(let r=a.length-1;r>0;r--){const l=Math.floor(Math.random()*(r+1));[a[r],a[l]]=[a[l],a[r]]}const o=a.slice(0,s).map(r=>({level:e,idx:r}));this.champ={race:0,total:s,pts:new Map,seq:o},e=o[0].level,t=o[0].idx}else this.champ=null;const i=this.seats.map(s=>({...s}));this.net.broadcast({t:"start",level:e,trackIdx:t,seats:i}),this.beginMatch(e,t,i)}beginMatch(e,t,i){this.seats=i,this.active=!0,this.lastTok="",this.decided=!1,this.aiWait=0,this.applied.clear(),this.pendingFlick=null,this.pendingSync=null;const s=i.map(a=>({name:a.name,isAI:a.kind==="ai",ai:a.ai,skin:a.skin,team:a.team}));this.onStartMatch(s,e,t)}isChamp(){return!!this.champ}champRows(){const e=this.mySeatIndex();return this.seats.map((t,i)=>({seat:i,name:t.name,skin:t.skin,pts:this.champ.pts.get(i)||0,you:i===e})).sort((t,i)=>i.pts-t.pts)}hostFinishRace(e){if(!this.isHost||!this.champ)return;const t=[12,9,7,5,3,1];e.standings().forEach((a,o)=>this.champ.pts.set(a.id,(this.champ.pts.get(a.id)||0)+(t[o]||0)));const i=this.champ.race+1>=this.champ.total,s=this.champRows();this.net.broadcast({t:"champres",pts:[...this.champ.pts.entries()],race:this.champ.race+1,total:this.champ.total,last:i}),this.onChampStanding(s,this.champ.race+1,this.champ.total,i)}hostNextChamp(){if(!this.isHost||!this.champ)return;if(this.champ.race++,this.champ.race>=this.champ.total){const s=this.champRows()[0];this.net.broadcast({t:"champend",seat:s.seat}),this.onChampEnd({name:s.name,skin:s.skin,you:s.you}),this.champ=null,this.active=!1;return}const{level:e,idx:t}=this.champ.seq[this.champ.race],i=this.seats.map(s=>({...s}));this.net.broadcast({t:"start",level:e,trackIdx:t,seats:i}),this.beginMatch(e,t,i)}bind(e){this.mgr=e}backToLobby(){this.isHost&&(this.active=!1,this.net.broadcast({t:"tolobby"}),this.humans=this.humans.filter(e=>!e.off),this.rebuild(),this.onToLobby())}mySeatIndex(){return this.seats.findIndex(e=>e.kind==="human"&&e.owner===this.myId)}controlsActiveSeat(){const e=this.mgr;if(!e)return!1;const t=this.seats[e.current];return!!t&&t.kind==="human"&&!t.off&&t.owner===this.myId}tok(e){return String(e.flickCount)}emitFlick(e,t,i,s){this.applied.add(s),this.decided=!0;const a={t:"flick",tok:s,dir:t,power:i};this.isHost?this.net.broadcast(a):this.net.send("host",a),e.flick(t,i)}localFlick(e,t){const i=this.mgr;!i||i.phase!=="aim"||!this.controlsActiveSeat()||this.emitFlick(i,e,t,this.tok(i))}localUseItem(){}tick(e){const t=this.mgr;if(!t||!this.active||t.phase!=="aim")return;this.pendingSync&&(t.applySnapshot(this.pendingSync),this.pendingSync=null);const i=this.tok(t);if(i!==this.lastTok&&(this.lastTok=i,this.decided=!1,this.aiWait=0,this.isHost&&this.net.broadcast({t:"sync",s:t.snapshot()})),this.pendingFlick&&this.pendingFlick.tok===i&&!this.applied.has(i)){const o=this.pendingFlick;this.pendingFlick=null,this.applied.add(i),this.decided=!0,t.flick(o.dir,o.power);return}if(this.decided)return;const s=this.seats[t.current];if(this.isHost&&s&&(s.kind==="ai"||s.off)&&(this.aiWait+=e,this.aiWait>.7)){const o=t.caps[t.current],r=Od(o,t.caps,t.track);this.emitFlick(t,r.dir,r.power,i)}}aiLabel(e){return e?Fd[e]:"IA"}}const eu=document.getElementById("scene"),gc=Yv(eu);let It,Pt=new Oc(34,54),Et=null;const vc=new yb,Mt=new _b,aa=new Mb,Me=new Pb,pt=new k1;let Nt="quick",Xe=null,nt=null,_t=null,mt=null,ft=null,oa=0,cn=!1,Pi=!1,ha=null;window.addEventListener("pointerdown",()=>{Vc(),cn||qn("menu")});function Fn(n){Xe=n,Nt=n.mode,oa=0;let e=n.customTrack?n.customTrack:zd(n.level,n.trackIdx);const t=n.mode==="caos"||n.rankCirc==="caos";t&&(e=Ub(e)),It=wd(e.bg),Ed(It,e.w,e.h),Me.setup(e,n.players),Et=Gc(Me.track.def),It.add(Et.group),It.add(vc.group,Mt.points,aa.group),Pt=new Oc(e.w,e.h),Pt.setFrustum(21,innerWidth,innerHeight),$c(),Me.chaos=t,Me.manualControl=n.mode==="online",pt.bind(Me),vc.build(Me.caps),tu.setCamera(Pt.camera,Pt),Re.showGame(),cn=!0,qn(S1(e.theme)),Re.updateHUD(Me,Wc())}function Wc(){return Me.phase==="aim"&&(pt.active?pt.controlsActiveSeat():!Me.activeCap().isAI)}Me.onToast=(n,e)=>Re.toast(n,e);Me.onChange=()=>Re.updateHUD(Me,Wc());Me.onFlick=(n,e)=>{Ct.flick(e),Ad[Me.track.surfaceAt(n.pos)],Mt.dust(n.pos.x,n.pos.y,8),aa.hide()};Me.onItem=(n,e,t)=>{Ct.bonus(),Mt.impact(n.pos.x,n.pos.y,10,t?"#ff9de0":"#b98cff")};Me.onEvent=n=>{switch(n.type){case"wall":Ct.wall(n.power),Mt.impact(n.x,n.y,n.power*.4,"#ffe6b0");break;case"stone":Ct.wall(n.power),Mt.impact(n.x,n.y,n.power*.5,"#e8e0d0");break;case"capHit":Ct.clack(n.power),Mt.impact(n.x,n.y,n.power*.6,"#fff");break;case"hole":Ct.hole(),Mt.dust(n.x,n.y,14,"#3a2c1a");break;case"bomb":Ct.bad(),Mt.impact(n.x,n.y,10,"#ff8a5a");break;case"bonus":Ct.bonus(),Mt.impact(n.x,n.y,10,"#8affc0");break;case"out":Ct.bad(),Mt.dust(n.x,n.y,10,"#cbb58a");break;case"ramp":Ct.bonus(),Mt.impact(n.x,n.y,8,"#9dffb8");break;case"land":Ct.wall(4),Mt.dust(n.x,n.y,14,"#d8c090");break;case"top":Ct.clack(Math.min(1,n.power*.12)),Mt.impact(n.x,n.y,n.power*.5,"#ff7ab0");break;case"car":Ct.vroom(),Mt.dust(n.x,n.y,12,"#e8b84a"),Mt.impact(n.x,n.y,8,"#ffd24a");break;case"band":{Ct.elastic(Math.min(1,n.power*.1)),Mt.impact(n.x,n.y,n.power*.6,"#ff8a8a");let e=null,t=1e9;for(const i of Me.track.def.obstacles){if(i.type!=="band")continue;const s=(i.x-n.x)**2+(i.y-n.y)**2;s<t&&(t=s,e=i)}if(e){const i=Me.caps[n.capId];let s=n.x-(i?i.pos.x:e.x),a=n.y-(i?i.pos.y:e.y);const o=Math.hypot(s,a)||1;s/=o,a/=o,e.pokeX=s,e.pokeY=a,e.pokeP=Math.min(1,n.power*.09)}break}case"mill":Ct.wall(n.power),Mt.impact(n.x,n.y,n.power*.4,"#8fd0ff");break;case"balloon":{if(n.power===-2){if(It){const e=new Z(new Mn(2,26),new Ve({color:"#3f8ec8",roughness:.15,transparent:!0,opacity:.72}));e.rotation.x=-Math.PI/2,e.position.set(n.x,.02,n.y),It.add(e)}Mt.dust(n.x,n.y,12,"#4a90b8");break}if(Ct.pop(),Mt.impact(n.x,n.y,14,"#7ac8f2"),Mt.dust(n.x,n.y,18,"#4a90b8"),It){const e=new Z(new Mn(1.7,26),new Ve({color:"#3f8ec8",roughness:.15,transparent:!0,opacity:.72}));e.rotation.x=-Math.PI/2,e.position.set(n.x,.02,n.y),It.add(e)}break}case"finish":Mt.confetti(n.x,n.y);break}};const Re=new fc({start:n=>{if(pt.active&&pt.leave(),Vc(),n.mode==="champ"){const e=n.champFmt||"copa",t=s=>{for(let a=s.length-1;a>0;a--){const o=Math.floor(Math.random()*(a+1));[s[a],s[o]]=[s[o],s[a]]}return s};let i;if(e==="gp")i=[0,1,2,3,4].map(s=>({level:s,idx:Math.floor(Math.random()*an)}));else{const s=e==="sprint"?3:e==="maratona"?7:5;i=t([0,1,2,3,4,5,6,7,8,9]).slice(0,s).map(a=>({level:n.level,idx:a}))}nt={seq:i,race:0,pts:new Map,fmt:e,hist:[]},n.level=i[0].level,n.trackIdx=i[0].idx}else nt=null;n.mode==="elim"?(_t={players:n.players.slice(),orig:n.players.slice(),level:n.level,race:0,out:[],seed:Math.random()*4294967295>>>0},n.trackIdx=ci(_t.seed,"elim",0)):_t=null,n.mode==="camp"&&n.campComp?mt={compId:n.campComp,race:0,pts:new Map,hist:[]}:mt=null,n.mode==="rank"&&n.rankComp?ft={compId:n.rankComp,race:0,pts:new Map,hist:[],circ:n.rankCirc||"normal"}:ft=null,Fn(n)},setVols:(n,e,t)=>{Kd(n),Jd(e),Zd(t),Ce.setVols(n,e,t)},setSkin:n=>{Ce.setSkin(n),Ct.ui()},preview:n=>D1(n)},pt);pt.onStartMatch=(n,e,t)=>{Xe=null,nt=null,Zi=!1,Fn({level:e,trackIdx:t,pick:"specific",players:n,mode:"online"})};pt.onToLobby=()=>{cn=!1,ln=!1,Zi=!1,Xn(),qn("menu"),Re.showLobby()};pt.onClosed=()=>{const n=cn;cn=!1,ln=!1,Zi=!1,n&&Xn(),qn("menu"),Re.showOnlineHome()};pt.onChampStanding=(n,e,t,i)=>Re.showOnlineChampStanding(n,e,t,i,pt.isHost);pt.onChampEnd=n=>{Zi=!0,n.you&&Ce.addWin(),Ct.win(),Re.showChampion({rows:[],fmt:"champ",youWon:n.you,name:n.name,skin:n.skin})};Re.onUseItem=n=>{pt.active?pt.localUseItem():Me.useItem(n)};Re.onCampBack=()=>{cn=!1,ln=!1,mt=null,Xn(),qn("menu"),Re.showCampaign()};Re.onCampRetry=n=>{cn=!1,ln=!1,mt=null,Xn(),Re.launchCamp(Mo(n))};Re.onRankBack=()=>{cn=!1,ln=!1,ft=null,Xn(),qn("menu"),Re.showRanked()};Re.onRankRetry=n=>{cn=!1,ln=!1,ft=null,Xn(),Re.launchRank(So(n))};Re.onCampFinale=()=>{cn=!1,ln=!1,mt=null,Xn(),qn("menu"),Re.showCampFinale()};Re.onPause=()=>{Me.phase!=="over"&&(ln=!0,Re.showPause())};Re.onResume=()=>{ln=!1,Re.hideModal()};Re.onRestart=()=>{if(!Xe)return;const n=e=>{ln=!1,Re.hideModal(),e(),Fn(Xe)};if(mt&&Nt==="camp"){const e=Mo(mt.compId);Re.confirmRestartComp(`a competição ${e.ico} ${e.name}`,mt.race,e.races,()=>n(()=>{mt={compId:mt.compId,race:0,pts:new Map,hist:[]},Xe.trackIdx=ci(pn().seed,mt.compId,0)}),()=>Re.showPause());return}if(ft&&Nt==="rank"){const e=So(ft.compId);Re.confirmRestartComp(`a competição ${e.ico} ${e.name}`,ft.race,e.races,()=>n(()=>{ft={compId:ft.compId,race:0,pts:new Map,hist:[],circ:ft.circ},Xe.trackIdx=ci(Xt(ft.circ).seed,ft.compId,0)}),()=>Re.showPause());return}if(nt&&Nt==="champ"){Re.confirmRestartComp("o campeonato",nt.race,nt.seq.length,()=>n(()=>{nt.race=0,nt.pts=new Map,nt.hist=[],Xe.level=nt.seq[0].level,Xe.trackIdx=nt.seq[0].idx}),()=>Re.showPause());return}if(_t&&Nt==="elim"){Re.confirmRestartComp("a eliminação",_t.race,_t.orig.length-1,()=>n(()=>{_t.players=_t.orig.slice(),_t.out=[],_t.race=0,Xe.players=_t.players,Xe.trackIdx=ci(_t.seed,"elim",0)}),()=>Re.showPause());return}ln=!1,Re.hideModal(),Fn(Xe)};Re.onMenu=()=>{cn=!1,ln=!1,Xn(),qn("menu"),Re.showMenu()};Re.onNext=()=>{if(Re.hideModal(),mt&&Xe){mt.race++,Xe.trackIdx=ci(pn().seed,mt.compId,mt.race),Fn(Xe);return}if(ft&&Xe){ft.race++,Xe.trackIdx=ci(Xt(ft.circ).seed,ft.compId,ft.race),Fn(Xe);return}if(nt){if(nt.race++,nt.race>=nt.seq.length){U1();return}Xe.level=nt.seq[nt.race].level,Xe.trackIdx=nt.seq[nt.race].idx,Fn(Xe);return}if(_t&&Xe){const n=Me.standings(),e=n[n.length-1];if(_t.players=_t.players.filter(t=>!(t.name===e.name&&t.skin===e.skin)),_t.players.length<=1){const t=_t.players[0],i=t&&!t.isAI;i&&Ce.addWin(),Re.showChampion({rows:[],fmt:"elim",youWon:!!i,name:t?t.name:"",skin:t?t.skin:"coca"}),_t=null;return}_t.race++,Xe.players=_t.players,Xe.trackIdx=ci(_t.seed,"elim",_t.race),Fn(Xe);return}Xe&&(Xe.pick==="randany"?(Xe.level=Math.floor(Math.random()*5),Xe.trackIdx=Math.floor(Math.random()*an)):Xe.pick==="randlevel"?Xe.trackIdx=Math.floor(Math.random()*an):Xe.trackIdx=(Xe.trackIdx+1)%an,Fn(Xe))};Kd(Ce.get().music);Jd(Ce.get().sfx);Zd(Ce.get().muted);Qt.music=Ce.get().music;Qt.sfx=Ce.get().sfx;Qt.muted=Ce.get().muted;let ln=!1;const tu=new Ob(eu,Pt.camera,Pt,{canAim:()=>cn&&!ln&&Wc(),capPos:()=>{const n=Me.activeCap();return n?{x:n.pos.x,y:n.pos.y}:null},onAim:(n,e,t)=>{const i=Me.activeCap();aa.set(i.pos.x,i.pos.y,n,e,t)},onRelease:(n,e,t)=>{aa.hide(),(Nt==="daily"||Nt==="trial")&&oa++,pt.active?pt.localFlick({x:n,y:e},t):Me.flick({x:n,y:e},t)},onCancel:()=>aa.hide(),editMode:()=>Pi?Re.previewEditMode():"off",onEditDown:(n,e)=>{Re.preview3D("down",n,e)&&bc()},onEditMove:(n,e)=>{Re.preview3D("move",n,e)&&I1()},onEditUp:()=>{Re.preview3D("up",0,0)&&bc()}});function Xn(){It&&It.clear(),Et=null,Pi=!1}function D1(n){cn=!1,ln=!1,ha=n,It=wd(n.bg),Ed(It,n.w,n.h),Et=Gc(n),It.add(Et.group),Pt=new Oc(n.w,n.h),Pt.frustum=Math.min(60,Math.max(n.w,n.h)*.42),Pt.resize(innerWidth,innerHeight),Pt.place(),tu.setCamera(Pt.camera,Pt),Pi=!0,Re.showPreviewBar()}let Bh=0;function bc(){!Pi||!It||(ha=Re.rebuildPreviewDef(),Et&&(It.remove(Et.group),Et.group.traverse(n=>{n.geometry?.dispose?.(),n.material&&(Array.isArray(n.material)?n.material:[n.material]).forEach(e=>e.dispose?.())})),Et=Gc(ha),It.add(Et.group))}function I1(){const n=performance.now();n-Bh<70||(Bh=n,bc())}Re.onPreviewBack=()=>{Pi=!1,Xn(),qn("menu"),Re.showEditor()};Re.onPreviewPlay=()=>{Pi=!1,Xn(),ha&&Fn({level:2,trackIdx:0,pick:"specific",players:nu(),mode:"quick",customTrack:ha})};function nu(){const n=pc(Ce.skin(),3),e=["Bolha","Zé","Nina","Tato"];return[{name:"Você",isAI:!1,skin:Ce.skin()},...n.map((t,i)=>({name:e[i%e.length],isAI:!0,ai:Yt[i%Yt.length],skin:t}))]}let Zi=!1;function N1(){if(Zi)return;if(Zi=!0,Ct.win(),Nt==="camp"&&mt){const t=Mo(mt.compId),i=[12,9,7,5,3,1];Me.standings().forEach((c,h)=>mt.pts.set(c.id,(mt.pts.get(c.id)||0)+(i[h]||0)));const s=pn();s.races++,sa(s),mt.hist.push(Me.standings().findIndex(c=>!c.isAI)+1);const a=[...mt.pts.entries()].sort((c,h)=>h[1]-c[1]).map(([c,h])=>({name:Me.caps[c].name,skin:Me.caps[c].skin,pts:h,you:!Me.caps[c].isAI}));if(!(mt.race+1>=t.races)){Re.showResults(Me,Nt,{race:mt.race+1,total:t.races,last:!1,rows:a,fmt:"copa",hist:mt.hist.slice()});return}const r=a.findIndex(c=>c.you)+1,l=zb(pn(),mt.compId,r);Re.showCampResult({comp:t,place:r,ptsGained:l.pts,winsGained:l.wins,improved:l.improved,finished:l.finished,rows:a,hist:mt.hist.slice(),prize:l.prize});return}if(Nt==="rank"&&ft){const t=So(ft.compId),i=Hd;Me.standings().forEach((c,h)=>ft.pts.set(c.id,(ft.pts.get(c.id)||0)+(i[h]||0))),ft.hist.push(Me.standings().findIndex(c=>!c.isAI)+1);const s=[...ft.pts.entries()].sort((c,h)=>h[1]-c[1]).map(([c,h])=>({name:Me.caps[c].name,skin:Me.caps[c].skin,pts:h,you:!Me.caps[c].isAI}));if(!(ft.race+1>=t.races)){Re.showResults(Me,Nt,{race:ft.race+1,total:t.races,last:!1,rows:s,fmt:"copa",hist:ft.hist.slice()});return}const o=s.findIndex(c=>c.you)+1,r=s.find(c=>c.you)?.pts||0,l=Me.caps.find(c=>!c.isAI);Re.showRankResult({comp:t,place:o,pts:r,rows:s,hist:ft.hist.slice(),capId:l?l.skin:"coca"});return}if(Nt==="trial"){const t=Me.caps[0].finished,i=t&&Xe?Ce.setTrialBest(Xe.level,Xe.trackIdx,oa):!1;Re.showTrialResult({finished:t,flicks:oa,best:Xe?Ce.trialBest(Xe.level,Xe.trackIdx):void 0,record:i});return}if(Nt==="dupla"){const i=[...new Set(Me.caps.map(a=>a.team))].sort().map(a=>{const o=Me.caps.filter(l=>l.team===a).map(l=>({name:l.name,skin:l.skin,place:l.place,you:!l.isAI})),r=o.reduce((l,c)=>l+c.place,0);return{tid:a,score:r,members:o,hasYou:o.some(l=>l.you)}}).sort((a,o)=>a.score-o.score),s=i[0].hasYou;s&&Ce.addWin(),Re.showTeamResult({teams:i.map((a,o)=>({label:"Time "+(a.tid===0?"A":"B"),score:a.score,members:a.members,win:o===0,you:a.hasYou})),won:s});return}if(Nt==="elim"&&_t){const t=Me.standings(),i=t[t.length-1];_t.out.push({name:i.name,skin:i.skin});const s=t.slice(0,-1).map(r=>({name:r.name,skin:r.skin,you:!r.isAI})),a=!i.isAI,o=s.length<=1;Re.showElimResult({loser:{name:i.name,skin:i.skin},survivors:s,youOut:a,last:o,championName:o?s[0]?.name:""});return}if(pt.active&&pt.isChamp()){pt.isHost&&pt.hostFinishRace(Me);return}if(pt.active&&Me.teams>0){const i=[...new Set(Me.caps.map(a=>a.team))].sort().map(a=>{const o=Me.caps.filter(r=>r.team===a).map(r=>({name:r.name,skin:r.skin,place:r.place,you:r.id===pt.mySeatIndex()}));return{tid:a,score:o.reduce((r,l)=>r+l.place,0),members:o,hasYou:o.some(r=>r.you)}}).sort((a,o)=>a.score-o.score),s=i[0].hasYou;s&&Ce.addWin(),Re.showResults(Me,Nt,void 0,{teams:i.map((a,o)=>({label:"Time "+(a.tid===0?"A":"B"),score:a.score,members:a.members,win:o===0,you:a.hasYou})),won:s});return}const n=pt.active?Me.caps[pt.mySeatIndex()]:Me.caps.find(t=>!t.isAI);n&&n.place===1&&Nt!=="daily"&&Ce.addWin(),Nt==="daily"&&Me.caps[0].finished&&Ce.setDailyBest(O1(),oa);let e;if(nt){const t=[12,9,7,5,3,1];Me.standings().forEach((s,a)=>nt.pts.set(s.id,(nt.pts.get(s.id)||0)+(t[a]||0))),nt.hist.push(Me.standings().findIndex(s=>!s.isAI)+1);const i=[...nt.pts.entries()].sort((s,a)=>a[1]-s[1]).map(([s,a])=>({name:Me.caps[s].name,skin:Me.caps[s].skin,pts:a,you:!Me.caps[s].isAI}));e={race:nt.race+1,total:nt.seq.length,last:nt.race+1>=nt.seq.length,rows:i,fmt:nt.fmt,hist:nt.hist.slice()}}Re.showResults(Me,Nt,e)}function U1(){const n=[...nt.pts.entries()].sort((a,o)=>o[1]-a[1]),e=n.map(([a,o])=>({name:Me.caps[a].name,skin:Me.caps[a].skin,pts:o,you:!Me.caps[a].isAI})),t=Me.caps[n[0][0]],i=!!t&&!t.isAI;i&&Ce.addWin(),Ct.win();const s=nt.fmt;nt=null,Re.showChampion({rows:e,fmt:s,youWon:i,name:t?t.name:"",skin:t?t.skin:"coca"})}function $c(){const n=innerWidth,e=innerHeight;gc.setSize(n,e),Pt.resize(n,e)}addEventListener("resize",$c);addEventListener("pointerdown",()=>Vc(),{once:!0});Re.showMenu();$c();try{const e=(location.hash||"").match(/[#&]p=([^&]+)/);e&&(Re.importSharedTrack(e[1]),history.replaceState(null,"",location.pathname+location.search))}catch{}window.__go=(n,e)=>Fn({level:n,trackIdx:e,pick:"specific",players:nu(),mode:"quick"});window.__mgr=Me;window.__ui=Re;window.__diag={get inGame(){return cn},get mode(){return Nt},get previewing(){return Pi},get az(){return Pt.az},get frustum(){return Pt.frustum},get music(){return C1()},get actx(){return wo()},get mbus(){return Yd()},playMusic:qn};const F1=new qv;let Js=0;function yc(){const n=Math.min(.05,F1.getDelta());if(Js+=n,Pi&&It){if(Et)for(const e of Et.spinners)e.rotation.y+=n*2.4;if(Et)for(const e of Et.billboards)e.quaternion.copy(Pt.camera.quaternion);gc.render(It,Pt.camera),requestAnimationFrame(yc);return}if(cn&&It){const e=!pt.active&&Me.activeCap()?.isAI?Re.speedMul:1;ln||(pt.active&&pt.tick(n),Me.update(n*e),Me.phase==="over"?N1():Zi=!1);let t=Me.activeCap();if(Me.phase==="resolve"){const s=Me.activeCap();if(s&&s.moving&&!s.finished)t=s;else{let a=-1,o=s;for(const r of Me.caps){if(r.finished||!r.moving)continue;const l=on(r.vel);l>a&&(a=l,o=r)}t=o}}t&&!t.finished&&Pt.follow(t.pos.x,t.pos.y),Pt.update(n);let i=0;for(const s of Me.caps)if(s.moving){const a=on(s.vel);if(a>i&&(i=a),a>3&&Math.random()<.5){const o=Me.track.surfaceAt(s.pos);(o==="sand"||o==="dirt"||o==="mud"||o==="grass"||o==="frost"||o==="carpet")&&Mt.dust(s.pos.x,s.pos.y,1,o==="mud"?"#5c452a":o==="grass"?"#5f8a36":o==="frost"?"#eef8fd":o==="carpet"?"#b06a58":"#d8c090")}}if(Ct.slide(i),Et)for(const s of Et.pulses){const a=1+Math.sin(Js*4)*.18;s.mesh.scale.set(a,a,1),s.mesh.material.opacity=.22+Math.sin(Js*4)*.12}if(Et)for(const s of Et.dynamics)s.update(n);if(Et)for(const s of Et.spinners)s.rotation.y+=n*2.4,s.position.y+=Math.sin(Js*3+s.position.x)*.004;if(Et)for(const s of Et.billboards)s.quaternion.copy(Pt.camera.quaternion);vc.update(Me.caps,Js,Me.activeCap()?.id??-1),Mt.update(n),gc.render(It,Pt.camera)}requestAnimationFrame(yc)}yc();function O1(){const n=new Date;return`${n.getFullYear()}-${n.getMonth()+1}-${n.getDate()}`}
