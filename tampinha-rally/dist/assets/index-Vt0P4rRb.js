(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ja="169",Gc=0,To=1,Vc=2,Bl=1,kl=2,fn=3,kn=0,Dt=1,nn=2,Un=0,si=1,is=2,Ao=3,wo=4,Wc=5,ei=100,Xc=101,qc=102,Yc=103,$c=104,Kc=200,jc=201,Zc=202,Jc=203,sa=204,aa=205,Qc=206,eh=207,th=208,nh=209,ih=210,rh=211,sh=212,ah=213,oh=214,oa=0,la=1,ca=2,Di=3,ha=4,ua=5,da=6,fa=7,zl=0,lh=1,ch=2,Nn=0,hh=1,uh=2,dh=3,Hl=4,fh=5,ph=6,mh=7,Gl=300,Ii=301,Ui=302,pa=303,ma=304,fs=306,ga=1e3,ii=1001,_a=1002,Vt=1003,gh=1004,mr=1005,Jt=1006,bs=1007,ri=1008,Mn=1009,Vl=1010,Wl=1011,sr=1012,Za=1013,oi=1014,gn=1015,lr=1016,Ja=1017,Qa=1018,Ni=1020,Xl=35902,ql=1021,Yl=1022,en=1023,$l=1024,Kl=1025,Ri=1026,Fi=1027,jl=1028,eo=1029,Zl=1030,to=1031,no=1033,Kr=33776,jr=33777,Zr=33778,Jr=33779,va=35840,xa=35841,Ma=35842,Sa=35843,ya=36196,ba=37492,Ea=37496,Ta=37808,Aa=37809,wa=37810,Ca=37811,Ra=37812,Pa=37813,La=37814,Da=37815,Ia=37816,Ua=37817,Na=37818,Fa=37819,Oa=37820,Ba=37821,Qr=36492,ka=36494,za=36495,Jl=36283,Ha=36284,Ga=36285,Va=36286,_h=3200,vh=3201,Ql=0,xh=1,Ln="",Lt="srgb",Vn="srgb-linear",io="display-p3",ps="display-p3-linear",rs="linear",rt="srgb",ss="rec709",as="p3",ui=7680,Co=519,Mh=512,Sh=513,yh=514,ec=515,bh=516,Eh=517,Th=518,Ah=519,Ro=35044,Po="300 es",_n=2e3,os=2001;class zi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Mt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Lo=1234567;const tr=Math.PI/180,ar=180/Math.PI;function Hi(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Mt[n&255]+Mt[n>>8&255]+Mt[n>>16&255]+Mt[n>>24&255]+"-"+Mt[e&255]+Mt[e>>8&255]+"-"+Mt[e>>16&15|64]+Mt[e>>24&255]+"-"+Mt[t&63|128]+Mt[t>>8&255]+"-"+Mt[t>>16&255]+Mt[t>>24&255]+Mt[i&255]+Mt[i>>8&255]+Mt[i>>16&255]+Mt[i>>24&255]).toLowerCase()}function wt(n,e,t){return Math.max(e,Math.min(t,n))}function ro(n,e){return(n%e+e)%e}function wh(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function Ch(n,e,t){return n!==e?(t-n)/(e-n):0}function nr(n,e,t){return(1-t)*n+t*e}function Rh(n,e,t,i){return nr(n,e,1-Math.exp(-t*i))}function Ph(n,e=1){return e-Math.abs(ro(n,e*2)-e)}function Lh(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Dh(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function Ih(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Uh(n,e){return n+Math.random()*(e-n)}function Nh(n){return n*(.5-Math.random())}function Fh(n){n!==void 0&&(Lo=n);let e=Lo+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Oh(n){return n*tr}function Bh(n){return n*ar}function kh(n){return(n&n-1)===0&&n!==0}function zh(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Hh(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Gh(n,e,t,i,r){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+i)/2),h=a((e+i)/2),d=s((e-i)/2),u=a((e-i)/2),m=s((i-e)/2),g=a((i-e)/2);switch(r){case"XYX":n.set(o*h,l*d,l*u,o*c);break;case"YZY":n.set(l*u,o*h,l*d,o*c);break;case"ZXZ":n.set(l*d,l*u,o*h,o*c);break;case"XZX":n.set(o*h,l*g,l*m,o*c);break;case"YXY":n.set(l*m,o*h,l*g,o*c);break;case"ZYZ":n.set(l*g,l*m,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Ai(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Et(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const gr={DEG2RAD:tr,RAD2DEG:ar,generateUUID:Hi,clamp:wt,euclideanModulo:ro,mapLinear:wh,inverseLerp:Ch,lerp:nr,damp:Rh,pingpong:Ph,smoothstep:Lh,smootherstep:Dh,randInt:Ih,randFloat:Uh,randFloatSpread:Nh,seededRandom:Fh,degToRad:Oh,radToDeg:Bh,isPowerOfTwo:kh,ceilPowerOfTwo:zh,floorPowerOfTwo:Hh,setQuaternionFromProperEuler:Gh,normalize:Et,denormalize:Ai};class ze{constructor(e=0,t=0){ze.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(wt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Oe{constructor(e,t,i,r,s,a,o,l,c){Oe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],d=i[7],u=i[2],m=i[5],g=i[8],v=r[0],p=r[3],f=r[6],x=r[1],M=r[4],E=r[7],R=r[2],w=r[5],A=r[8];return s[0]=a*v+o*x+l*R,s[3]=a*p+o*M+l*w,s[6]=a*f+o*E+l*A,s[1]=c*v+h*x+d*R,s[4]=c*p+h*M+d*w,s[7]=c*f+h*E+d*A,s[2]=u*v+m*x+g*R,s[5]=u*p+m*M+g*w,s[8]=u*f+m*E+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-i*s*h+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*a-o*c,u=o*l-h*s,m=c*s-a*l,g=t*d+i*u+r*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=d*v,e[1]=(r*c-h*i)*v,e[2]=(o*i-r*a)*v,e[3]=u*v,e[4]=(h*t-r*l)*v,e[5]=(r*s-o*t)*v,e[6]=m*v,e[7]=(i*l-c*t)*v,e[8]=(a*t-i*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Es.makeScale(e,t)),this}rotate(e){return this.premultiply(Es.makeRotation(-e)),this}translate(e,t){return this.premultiply(Es.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Es=new Oe;function tc(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function ls(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Vh(){const n=ls("canvas");return n.style.display="block",n}const Do={};function es(n){n in Do||(Do[n]=!0,console.warn(n))}function Wh(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}function Xh(n){const e=n.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function qh(n){const e=n.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Io=new Oe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Uo=new Oe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Wi={[Vn]:{transfer:rs,primaries:ss,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n,fromReference:n=>n},[Lt]:{transfer:rt,primaries:ss,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[ps]:{transfer:rs,primaries:as,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.applyMatrix3(Uo),fromReference:n=>n.applyMatrix3(Io)},[io]:{transfer:rt,primaries:as,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.convertSRGBToLinear().applyMatrix3(Uo),fromReference:n=>n.applyMatrix3(Io).convertLinearToSRGB()}},Yh=new Set([Vn,ps]),et={enabled:!0,_workingColorSpace:Vn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!Yh.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=Wi[e].toReference,r=Wi[t].fromReference;return r(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return Wi[n].primaries},getTransfer:function(n){return n===Ln?rs:Wi[n].transfer},getLuminanceCoefficients:function(n,e=this._workingColorSpace){return n.fromArray(Wi[e].luminanceCoefficients)}};function Pi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ts(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let di;class $h{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{di===void 0&&(di=ls("canvas")),di.width=e.width,di.height=e.height;const i=di.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=di}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ls("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Pi(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Pi(t[i]/255)*255):t[i]=Pi(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Kh=0;class nc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Kh++}),this.uuid=Hi(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(As(r[a].image)):s.push(As(r[a]))}else s=As(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function As(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?$h.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let jh=0;class Ct extends zi{constructor(e=Ct.DEFAULT_IMAGE,t=Ct.DEFAULT_MAPPING,i=ii,r=ii,s=Jt,a=ri,o=en,l=Mn,c=Ct.DEFAULT_ANISOTROPY,h=Ln){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:jh++}),this.uuid=Hi(),this.name="",this.source=new nc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ze(0,0),this.repeat=new ze(1,1),this.center=new ze(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Gl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ga:e.x=e.x-Math.floor(e.x);break;case ii:e.x=e.x<0?0:1;break;case _a:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ga:e.y=e.y-Math.floor(e.y);break;case ii:e.y=e.y<0?0:1;break;case _a:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ct.DEFAULT_IMAGE=null;Ct.DEFAULT_MAPPING=Gl;Ct.DEFAULT_ANISOTROPY=1;class lt{constructor(e=0,t=0,i=0,r=1){lt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],m=l[5],g=l[9],v=l[2],p=l[6],f=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(g+p)<.1&&Math.abs(c+m+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(c+1)/2,E=(m+1)/2,R=(f+1)/2,w=(h+u)/4,A=(d+v)/4,P=(g+p)/4;return M>E&&M>R?M<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(M),r=w/i,s=A/i):E>R?E<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(E),i=w/r,s=P/r):R<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),i=A/s,r=P/s),this.set(i,r,s,t),this}let x=Math.sqrt((p-g)*(p-g)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(x)<.001&&(x=1),this.x=(p-g)/x,this.y=(d-v)/x,this.z=(u-h)/x,this.w=Math.acos((c+m+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Zh extends zi{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new lt(0,0,e,t),this.scissorTest=!1,this.viewport=new lt(0,0,e,t);const r={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Jt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new Ct(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new nc(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class li extends Zh{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class ic extends Ct{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Vt,this.minFilter=Vt,this.wrapR=ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Jh extends Ct{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Vt,this.minFilter=Vt,this.wrapR=ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class cr{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],h=i[r+2],d=i[r+3];const u=s[a+0],m=s[a+1],g=s[a+2],v=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d;return}if(o===1){e[t+0]=u,e[t+1]=m,e[t+2]=g,e[t+3]=v;return}if(d!==v||l!==u||c!==m||h!==g){let p=1-o;const f=l*u+c*m+h*g+d*v,x=f>=0?1:-1,M=1-f*f;if(M>Number.EPSILON){const R=Math.sqrt(M),w=Math.atan2(R,f*x);p=Math.sin(p*w)/R,o=Math.sin(o*w)/R}const E=o*x;if(l=l*p+u*E,c=c*p+m*E,h=h*p+g*E,d=d*p+v*E,p===1-o){const R=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=R,c*=R,h*=R,d*=R}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],h=i[r+3],d=s[a],u=s[a+1],m=s[a+2],g=s[a+3];return e[t]=o*g+h*d+l*m-c*u,e[t+1]=l*g+h*u+c*d-o*m,e[t+2]=c*g+h*m+o*u-l*d,e[t+3]=h*g-o*d-l*u-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(r/2),d=o(s/2),u=l(i/2),m=l(r/2),g=l(s/2);switch(a){case"XYZ":this._x=u*h*d+c*m*g,this._y=c*m*d-u*h*g,this._z=c*h*g+u*m*d,this._w=c*h*d-u*m*g;break;case"YXZ":this._x=u*h*d+c*m*g,this._y=c*m*d-u*h*g,this._z=c*h*g-u*m*d,this._w=c*h*d+u*m*g;break;case"ZXY":this._x=u*h*d-c*m*g,this._y=c*m*d+u*h*g,this._z=c*h*g+u*m*d,this._w=c*h*d-u*m*g;break;case"ZYX":this._x=u*h*d-c*m*g,this._y=c*m*d+u*h*g,this._z=c*h*g-u*m*d,this._w=c*h*d+u*m*g;break;case"YZX":this._x=u*h*d+c*m*g,this._y=c*m*d+u*h*g,this._z=c*h*g-u*m*d,this._w=c*h*d-u*m*g;break;case"XZY":this._x=u*h*d-c*m*g,this._y=c*m*d-u*h*g,this._z=c*h*g+u*m*d,this._w=c*h*d+u*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=i+o+d;if(u>0){const m=.5/Math.sqrt(u+1);this._w=.25/m,this._x=(h-l)*m,this._y=(s-c)*m,this._z=(a-r)*m}else if(i>o&&i>d){const m=2*Math.sqrt(1+i-o-d);this._w=(h-l)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+c)/m}else if(o>d){const m=2*Math.sqrt(1+o-i-d);this._w=(s-c)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(l+h)/m}else{const m=2*Math.sqrt(1+d-i-o);this._w=(a-r)/m,this._x=(s+c)/m,this._y=(l+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(wt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+a*o+r*c-s*l,this._y=r*h+a*l+s*o-i*c,this._z=s*h+a*c+i*l-r*o,this._w=a*h-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+i*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const m=1-t;return this._w=m*a+t*this._w,this._x=m*i+t*this._x,this._y=m*r+t*this._y,this._z=m*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),d=Math.sin((1-t)*h)/c,u=Math.sin(t*h)/c;return this._w=a*d+this._w*u,this._x=i*d+this._x*u,this._y=r*d+this._y*u,this._z=s*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(e=0,t=0,i=0){U.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(No.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(No.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),h=2*(o*t-s*r),d=2*(s*i-a*t);return this.x=t+l*c+a*d-o*h,this.y=i+l*h+o*c-s*d,this.z=r+l*d+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return ws.copy(this).projectOnVector(e),this.sub(ws)}reflect(e){return this.sub(ws.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(wt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ws=new U,No=new cr;class hr{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Xt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Xt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Xt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Xt):Xt.fromBufferAttribute(s,a),Xt.applyMatrix4(e.matrixWorld),this.expandByPoint(Xt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),_r.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),_r.copy(i.boundingBox)),_r.applyMatrix4(e.matrixWorld),this.union(_r)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Xt),Xt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Xi),vr.subVectors(this.max,Xi),fi.subVectors(e.a,Xi),pi.subVectors(e.b,Xi),mi.subVectors(e.c,Xi),yn.subVectors(pi,fi),bn.subVectors(mi,pi),Xn.subVectors(fi,mi);let t=[0,-yn.z,yn.y,0,-bn.z,bn.y,0,-Xn.z,Xn.y,yn.z,0,-yn.x,bn.z,0,-bn.x,Xn.z,0,-Xn.x,-yn.y,yn.x,0,-bn.y,bn.x,0,-Xn.y,Xn.x,0];return!Cs(t,fi,pi,mi,vr)||(t=[1,0,0,0,1,0,0,0,1],!Cs(t,fi,pi,mi,vr))?!1:(xr.crossVectors(yn,bn),t=[xr.x,xr.y,xr.z],Cs(t,fi,pi,mi,vr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Xt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Xt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(on[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),on[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),on[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),on[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),on[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),on[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),on[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),on[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(on),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const on=[new U,new U,new U,new U,new U,new U,new U,new U],Xt=new U,_r=new hr,fi=new U,pi=new U,mi=new U,yn=new U,bn=new U,Xn=new U,Xi=new U,vr=new U,xr=new U,qn=new U;function Cs(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){qn.fromArray(n,s);const o=r.x*Math.abs(qn.x)+r.y*Math.abs(qn.y)+r.z*Math.abs(qn.z),l=e.dot(qn),c=t.dot(qn),h=i.dot(qn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Qh=new hr,qi=new U,Rs=new U;class ur{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Qh.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;qi.subVectors(e,this.center);const t=qi.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(qi,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Rs.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(qi.copy(e.center).add(Rs)),this.expandByPoint(qi.copy(e.center).sub(Rs))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ln=new U,Ps=new U,Mr=new U,En=new U,Ls=new U,Sr=new U,Ds=new U;class ms{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ln)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ln.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ln.copy(this.origin).addScaledVector(this.direction,t),ln.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Ps.copy(e).add(t).multiplyScalar(.5),Mr.copy(t).sub(e).normalize(),En.copy(this.origin).sub(Ps);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Mr),o=En.dot(this.direction),l=-En.dot(Mr),c=En.lengthSq(),h=Math.abs(1-a*a);let d,u,m,g;if(h>0)if(d=a*l-o,u=a*o-l,g=s*h,d>=0)if(u>=-g)if(u<=g){const v=1/h;d*=v,u*=v,m=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=s,d=Math.max(0,-(a*u+o)),m=-d*d+u*(u+2*l)+c;else u=-s,d=Math.max(0,-(a*u+o)),m=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-a*s+o)),u=d>0?-s:Math.min(Math.max(-s,-l),s),m=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-s,-l),s),m=u*(u+2*l)+c):(d=Math.max(0,-(a*s+o)),u=d>0?s:Math.min(Math.max(-s,-l),s),m=-d*d+u*(u+2*l)+c);else u=a>0?-s:s,d=Math.max(0,-(a*u+o)),m=-d*d+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Ps).addScaledVector(Mr,u),m}intersectSphere(e,t){ln.subVectors(e.center,this.origin);const i=ln.dot(this.direction),r=ln.dot(ln)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,r=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,r=(e.min.x-u.x)*c),h>=0?(s=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(s=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,ln)!==null}intersectTriangle(e,t,i,r,s){Ls.subVectors(t,e),Sr.subVectors(i,e),Ds.crossVectors(Ls,Sr);let a=this.direction.dot(Ds),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;En.subVectors(this.origin,e);const l=o*this.direction.dot(Sr.crossVectors(En,Sr));if(l<0)return null;const c=o*this.direction.dot(Ls.cross(En));if(c<0||l+c>a)return null;const h=-o*En.dot(Ds);return h<0?null:this.at(h/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class st{constructor(e,t,i,r,s,a,o,l,c,h,d,u,m,g,v,p){st.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,h,d,u,m,g,v,p)}set(e,t,i,r,s,a,o,l,c,h,d,u,m,g,v,p){const f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=r,f[1]=s,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=d,f[14]=u,f[3]=m,f[7]=g,f[11]=v,f[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new st().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/gi.setFromMatrixColumn(e,0).length(),s=1/gi.setFromMatrixColumn(e,1).length(),a=1/gi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const u=a*h,m=a*d,g=o*h,v=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=m+g*c,t[5]=u-v*c,t[9]=-o*l,t[2]=v-u*c,t[6]=g+m*c,t[10]=a*l}else if(e.order==="YXZ"){const u=l*h,m=l*d,g=c*h,v=c*d;t[0]=u+v*o,t[4]=g*o-m,t[8]=a*c,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=m*o-g,t[6]=v+u*o,t[10]=a*l}else if(e.order==="ZXY"){const u=l*h,m=l*d,g=c*h,v=c*d;t[0]=u-v*o,t[4]=-a*d,t[8]=g+m*o,t[1]=m+g*o,t[5]=a*h,t[9]=v-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const u=a*h,m=a*d,g=o*h,v=o*d;t[0]=l*h,t[4]=g*c-m,t[8]=u*c+v,t[1]=l*d,t[5]=v*c+u,t[9]=m*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const u=a*l,m=a*c,g=o*l,v=o*c;t[0]=l*h,t[4]=v-u*d,t[8]=g*d+m,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=m*d+g,t[10]=u-v*d}else if(e.order==="XZY"){const u=a*l,m=a*c,g=o*l,v=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+v,t[5]=a*h,t[9]=m*d-g,t[2]=g*d-m,t[6]=o*h,t[10]=v*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(eu,e,tu)}lookAt(e,t,i){const r=this.elements;return Nt.subVectors(e,t),Nt.lengthSq()===0&&(Nt.z=1),Nt.normalize(),Tn.crossVectors(i,Nt),Tn.lengthSq()===0&&(Math.abs(i.z)===1?Nt.x+=1e-4:Nt.z+=1e-4,Nt.normalize(),Tn.crossVectors(i,Nt)),Tn.normalize(),yr.crossVectors(Nt,Tn),r[0]=Tn.x,r[4]=yr.x,r[8]=Nt.x,r[1]=Tn.y,r[5]=yr.y,r[9]=Nt.y,r[2]=Tn.z,r[6]=yr.z,r[10]=Nt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],d=i[5],u=i[9],m=i[13],g=i[2],v=i[6],p=i[10],f=i[14],x=i[3],M=i[7],E=i[11],R=i[15],w=r[0],A=r[4],P=r[8],W=r[12],_=r[1],y=r[5],F=r[9],k=r[13],V=r[2],q=r[6],z=r[10],j=r[14],H=r[3],ce=r[7],he=r[11],Me=r[15];return s[0]=a*w+o*_+l*V+c*H,s[4]=a*A+o*y+l*q+c*ce,s[8]=a*P+o*F+l*z+c*he,s[12]=a*W+o*k+l*j+c*Me,s[1]=h*w+d*_+u*V+m*H,s[5]=h*A+d*y+u*q+m*ce,s[9]=h*P+d*F+u*z+m*he,s[13]=h*W+d*k+u*j+m*Me,s[2]=g*w+v*_+p*V+f*H,s[6]=g*A+v*y+p*q+f*ce,s[10]=g*P+v*F+p*z+f*he,s[14]=g*W+v*k+p*j+f*Me,s[3]=x*w+M*_+E*V+R*H,s[7]=x*A+M*y+E*q+R*ce,s[11]=x*P+M*F+E*z+R*he,s[15]=x*W+M*k+E*j+R*Me,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],m=e[14],g=e[3],v=e[7],p=e[11],f=e[15];return g*(+s*l*d-r*c*d-s*o*u+i*c*u+r*o*m-i*l*m)+v*(+t*l*m-t*c*u+s*a*u-r*a*m+r*c*h-s*l*h)+p*(+t*c*d-t*o*m-s*a*d+i*a*m+s*o*h-i*c*h)+f*(-r*o*h-t*l*d+t*o*u+r*a*d-i*a*u+i*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],m=e[11],g=e[12],v=e[13],p=e[14],f=e[15],x=d*p*c-v*u*c+v*l*m-o*p*m-d*l*f+o*u*f,M=g*u*c-h*p*c-g*l*m+a*p*m+h*l*f-a*u*f,E=h*v*c-g*d*c+g*o*m-a*v*m-h*o*f+a*d*f,R=g*d*l-h*v*l-g*o*u+a*v*u+h*o*p-a*d*p,w=t*x+i*M+r*E+s*R;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/w;return e[0]=x*A,e[1]=(v*u*s-d*p*s-v*r*m+i*p*m+d*r*f-i*u*f)*A,e[2]=(o*p*s-v*l*s+v*r*c-i*p*c-o*r*f+i*l*f)*A,e[3]=(d*l*s-o*u*s-d*r*c+i*u*c+o*r*m-i*l*m)*A,e[4]=M*A,e[5]=(h*p*s-g*u*s+g*r*m-t*p*m-h*r*f+t*u*f)*A,e[6]=(g*l*s-a*p*s-g*r*c+t*p*c+a*r*f-t*l*f)*A,e[7]=(a*u*s-h*l*s+h*r*c-t*u*c-a*r*m+t*l*m)*A,e[8]=E*A,e[9]=(g*d*s-h*v*s-g*i*m+t*v*m+h*i*f-t*d*f)*A,e[10]=(a*v*s-g*o*s+g*i*c-t*v*c-a*i*f+t*o*f)*A,e[11]=(h*o*s-a*d*s-h*i*c+t*d*c+a*i*m-t*o*m)*A,e[12]=R*A,e[13]=(h*v*r-g*d*r+g*i*u-t*v*u-h*i*p+t*d*p)*A,e[14]=(g*o*r-a*v*r-g*i*l+t*v*l+a*i*p-t*o*p)*A,e[15]=(a*d*r-h*o*r+h*i*l-t*d*l-a*i*u+t*o*u)*A,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,h*o+i,h*l-r*a,0,c*l-r*o,h*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,d=o+o,u=s*c,m=s*h,g=s*d,v=a*h,p=a*d,f=o*d,x=l*c,M=l*h,E=l*d,R=i.x,w=i.y,A=i.z;return r[0]=(1-(v+f))*R,r[1]=(m+E)*R,r[2]=(g-M)*R,r[3]=0,r[4]=(m-E)*w,r[5]=(1-(u+f))*w,r[6]=(p+x)*w,r[7]=0,r[8]=(g+M)*A,r[9]=(p-x)*A,r[10]=(1-(u+v))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=gi.set(r[0],r[1],r[2]).length();const a=gi.set(r[4],r[5],r[6]).length(),o=gi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],qt.copy(this);const c=1/s,h=1/a,d=1/o;return qt.elements[0]*=c,qt.elements[1]*=c,qt.elements[2]*=c,qt.elements[4]*=h,qt.elements[5]*=h,qt.elements[6]*=h,qt.elements[8]*=d,qt.elements[9]*=d,qt.elements[10]*=d,t.setFromRotationMatrix(qt),i.x=s,i.y=a,i.z=o,this}makePerspective(e,t,i,r,s,a,o=_n){const l=this.elements,c=2*s/(t-e),h=2*s/(i-r),d=(t+e)/(t-e),u=(i+r)/(i-r);let m,g;if(o===_n)m=-(a+s)/(a-s),g=-2*a*s/(a-s);else if(o===os)m=-a/(a-s),g=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=_n){const l=this.elements,c=1/(t-e),h=1/(i-r),d=1/(a-s),u=(t+e)*c,m=(i+r)*h;let g,v;if(o===_n)g=(a+s)*d,v=-2*d;else if(o===os)g=s*d,v=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const gi=new U,qt=new st,eu=new U(0,0,0),tu=new U(1,1,1),Tn=new U,yr=new U,Nt=new U,Fo=new st,Oo=new cr;class sn{constructor(e=0,t=0,i=0,r=sn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],h=r[9],d=r[2],u=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin(wt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-wt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(wt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-wt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(wt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-wt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Fo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Fo,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Oo.setFromEuler(this),this.setFromQuaternion(Oo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}sn.DEFAULT_ORDER="XYZ";class so{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let nu=0;const Bo=new U,_i=new cr,cn=new st,br=new U,Yi=new U,iu=new U,ru=new cr,ko=new U(1,0,0),zo=new U(0,1,0),Ho=new U(0,0,1),Go={type:"added"},su={type:"removed"},vi={type:"childadded",child:null},Is={type:"childremoved",child:null};class ft extends zi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:nu++}),this.uuid=Hi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ft.DEFAULT_UP.clone();const e=new U,t=new sn,i=new cr,r=new U(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new st},normalMatrix:{value:new Oe}}),this.matrix=new st,this.matrixWorld=new st,this.matrixAutoUpdate=ft.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new so,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return _i.setFromAxisAngle(e,t),this.quaternion.multiply(_i),this}rotateOnWorldAxis(e,t){return _i.setFromAxisAngle(e,t),this.quaternion.premultiply(_i),this}rotateX(e){return this.rotateOnAxis(ko,e)}rotateY(e){return this.rotateOnAxis(zo,e)}rotateZ(e){return this.rotateOnAxis(Ho,e)}translateOnAxis(e,t){return Bo.copy(e).applyQuaternion(this.quaternion),this.position.add(Bo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ko,e)}translateY(e){return this.translateOnAxis(zo,e)}translateZ(e){return this.translateOnAxis(Ho,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(cn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?br.copy(e):br.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Yi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?cn.lookAt(Yi,br,this.up):cn.lookAt(br,Yi,this.up),this.quaternion.setFromRotationMatrix(cn),r&&(cn.extractRotation(r.matrixWorld),_i.setFromRotationMatrix(cn),this.quaternion.premultiply(_i.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Go),vi.child=e,this.dispatchEvent(vi),vi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(su),Is.child=e,this.dispatchEvent(Is),Is.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),cn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),cn.multiply(e.parent.matrixWorld)),e.applyMatrix4(cn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Go),vi.child=e,this.dispatchEvent(vi),vi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yi,e,iu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yi,ru,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),m=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),m.length>0&&(i.animations=m),g.length>0&&(i.nodes=g)}return i.object=r,i;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}ft.DEFAULT_UP=new U(0,1,0);ft.DEFAULT_MATRIX_AUTO_UPDATE=!0;ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Yt=new U,hn=new U,Us=new U,un=new U,xi=new U,Mi=new U,Vo=new U,Ns=new U,Fs=new U,Os=new U,Bs=new lt,ks=new lt,zs=new lt;class Qt{constructor(e=new U,t=new U,i=new U){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Yt.subVectors(e,t),r.cross(Yt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Yt.subVectors(r,t),hn.subVectors(i,t),Us.subVectors(e,t);const a=Yt.dot(Yt),o=Yt.dot(hn),l=Yt.dot(Us),c=hn.dot(hn),h=hn.dot(Us),d=a*c-o*o;if(d===0)return s.set(0,0,0),null;const u=1/d,m=(c*l-o*h)*u,g=(a*h-o*l)*u;return s.set(1-m-g,g,m)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,un)===null?!1:un.x>=0&&un.y>=0&&un.x+un.y<=1}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,un)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,un.x),l.addScaledVector(a,un.y),l.addScaledVector(o,un.z),l)}static getInterpolatedAttribute(e,t,i,r,s,a){return Bs.setScalar(0),ks.setScalar(0),zs.setScalar(0),Bs.fromBufferAttribute(e,t),ks.fromBufferAttribute(e,i),zs.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Bs,s.x),a.addScaledVector(ks,s.y),a.addScaledVector(zs,s.z),a}static isFrontFacing(e,t,i,r){return Yt.subVectors(i,t),hn.subVectors(e,t),Yt.cross(hn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Yt.subVectors(this.c,this.b),hn.subVectors(this.a,this.b),Yt.cross(hn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Qt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Qt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return Qt.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return Qt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Qt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;xi.subVectors(r,i),Mi.subVectors(s,i),Ns.subVectors(e,i);const l=xi.dot(Ns),c=Mi.dot(Ns);if(l<=0&&c<=0)return t.copy(i);Fs.subVectors(e,r);const h=xi.dot(Fs),d=Mi.dot(Fs);if(h>=0&&d<=h)return t.copy(r);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(i).addScaledVector(xi,a);Os.subVectors(e,s);const m=xi.dot(Os),g=Mi.dot(Os);if(g>=0&&m<=g)return t.copy(s);const v=m*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(i).addScaledVector(Mi,o);const p=h*g-m*d;if(p<=0&&d-h>=0&&m-g>=0)return Vo.subVectors(s,r),o=(d-h)/(d-h+(m-g)),t.copy(r).addScaledVector(Vo,o);const f=1/(p+v+u);return a=v*f,o=u*f,t.copy(i).addScaledVector(xi,a).addScaledVector(Mi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const rc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},An={h:0,s:0,l:0},Er={h:0,s:0,l:0};function Hs(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ue{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Lt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=et.workingColorSpace){return this.r=e,this.g=t,this.b=i,et.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=et.workingColorSpace){if(e=ro(e,1),t=wt(t,0,1),i=wt(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=Hs(a,s,e+1/3),this.g=Hs(a,s,e),this.b=Hs(a,s,e-1/3)}return et.toWorkingColorSpace(this,r),this}setStyle(e,t=Lt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Lt){const i=rc[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Pi(e.r),this.g=Pi(e.g),this.b=Pi(e.b),this}copyLinearToSRGB(e){return this.r=Ts(e.r),this.g=Ts(e.g),this.b=Ts(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Lt){return et.fromWorkingColorSpace(St.copy(this),e),Math.round(wt(St.r*255,0,255))*65536+Math.round(wt(St.g*255,0,255))*256+Math.round(wt(St.b*255,0,255))}getHexString(e=Lt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=et.workingColorSpace){et.fromWorkingColorSpace(St.copy(this),t);const i=St.r,r=St.g,s=St.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case i:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-i)/d+2;break;case s:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=et.workingColorSpace){return et.fromWorkingColorSpace(St.copy(this),t),e.r=St.r,e.g=St.g,e.b=St.b,e}getStyle(e=Lt){et.fromWorkingColorSpace(St.copy(this),e);const t=St.r,i=St.g,r=St.b;return e!==Lt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(An),this.setHSL(An.h+e,An.s+t,An.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(An),e.getHSL(Er);const i=nr(An.h,Er.h,t),r=nr(An.s,Er.s,t),s=nr(An.l,Er.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const St=new Ue;Ue.NAMES=rc;let au=0;class ci extends zi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:au++}),this.uuid=Hi(),this.name="",this.type="Material",this.blending=si,this.side=kn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=sa,this.blendDst=aa,this.blendEquation=ei,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ue(0,0,0),this.blendAlpha=0,this.depthFunc=Di,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Co,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ui,this.stencilZFail=ui,this.stencilZPass=ui,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==si&&(i.blending=this.blending),this.side!==kn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==sa&&(i.blendSrc=this.blendSrc),this.blendDst!==aa&&(i.blendDst=this.blendDst),this.blendEquation!==ei&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Di&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Co&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ui&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ui&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ui&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Fn extends ci{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new sn,this.combine=zl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ut=new U,Tr=new ze;class Bt{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Ro,this.updateRanges=[],this.gpuType=gn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Tr.fromBufferAttribute(this,t),Tr.applyMatrix3(e),this.setXY(t,Tr.x,Tr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)ut.fromBufferAttribute(this,t),ut.applyMatrix3(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)ut.fromBufferAttribute(this,t),ut.applyMatrix4(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)ut.fromBufferAttribute(this,t),ut.applyNormalMatrix(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)ut.fromBufferAttribute(this,t),ut.transformDirection(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ai(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Et(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ai(t,this.array)),t}setX(e,t){return this.normalized&&(t=Et(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ai(t,this.array)),t}setY(e,t){return this.normalized&&(t=Et(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ai(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Et(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ai(t,this.array)),t}setW(e,t){return this.normalized&&(t=Et(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Et(t,this.array),i=Et(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Et(t,this.array),i=Et(i,this.array),r=Et(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Et(t,this.array),i=Et(i,this.array),r=Et(r,this.array),s=Et(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ro&&(e.usage=this.usage),e}}class sc extends Bt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class ac extends Bt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class at extends Bt{constructor(e,t,i){super(new Float32Array(e),t,i)}}let ou=0;const zt=new st,Gs=new ft,Si=new U,Ft=new hr,$i=new hr,gt=new U;class bt extends zi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ou++}),this.uuid=Hi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(tc(e)?ac:sc)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Oe().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return zt.makeRotationFromQuaternion(e),this.applyMatrix4(zt),this}rotateX(e){return zt.makeRotationX(e),this.applyMatrix4(zt),this}rotateY(e){return zt.makeRotationY(e),this.applyMatrix4(zt),this}rotateZ(e){return zt.makeRotationZ(e),this.applyMatrix4(zt),this}translate(e,t,i){return zt.makeTranslation(e,t,i),this.applyMatrix4(zt),this}scale(e,t,i){return zt.makeScale(e,t,i),this.applyMatrix4(zt),this}lookAt(e){return Gs.lookAt(e),Gs.updateMatrix(),this.applyMatrix4(Gs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Si).negate(),this.translate(Si.x,Si.y,Si.z),this}setFromPoints(e){const t=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new at(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new hr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Ft.setFromBufferAttribute(s),this.morphTargetsRelative?(gt.addVectors(this.boundingBox.min,Ft.min),this.boundingBox.expandByPoint(gt),gt.addVectors(this.boundingBox.max,Ft.max),this.boundingBox.expandByPoint(gt)):(this.boundingBox.expandByPoint(Ft.min),this.boundingBox.expandByPoint(Ft.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ur);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(e){const i=this.boundingSphere.center;if(Ft.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];$i.setFromBufferAttribute(o),this.morphTargetsRelative?(gt.addVectors(Ft.min,$i.min),Ft.expandByPoint(gt),gt.addVectors(Ft.max,$i.max),Ft.expandByPoint(gt)):(Ft.expandByPoint($i.min),Ft.expandByPoint($i.max))}Ft.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)gt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(gt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)gt.fromBufferAttribute(o,c),l&&(Si.fromBufferAttribute(e,c),gt.add(Si)),r=Math.max(r,i.distanceToSquared(gt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Bt(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let P=0;P<i.count;P++)o[P]=new U,l[P]=new U;const c=new U,h=new U,d=new U,u=new ze,m=new ze,g=new ze,v=new U,p=new U;function f(P,W,_){c.fromBufferAttribute(i,P),h.fromBufferAttribute(i,W),d.fromBufferAttribute(i,_),u.fromBufferAttribute(s,P),m.fromBufferAttribute(s,W),g.fromBufferAttribute(s,_),h.sub(c),d.sub(c),m.sub(u),g.sub(u);const y=1/(m.x*g.y-g.x*m.y);isFinite(y)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(d,-m.y).multiplyScalar(y),p.copy(d).multiplyScalar(m.x).addScaledVector(h,-g.x).multiplyScalar(y),o[P].add(v),o[W].add(v),o[_].add(v),l[P].add(p),l[W].add(p),l[_].add(p))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let P=0,W=x.length;P<W;++P){const _=x[P],y=_.start,F=_.count;for(let k=y,V=y+F;k<V;k+=3)f(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const M=new U,E=new U,R=new U,w=new U;function A(P){R.fromBufferAttribute(r,P),w.copy(R);const W=o[P];M.copy(W),M.sub(R.multiplyScalar(R.dot(W))).normalize(),E.crossVectors(w,W);const y=E.dot(l[P])<0?-1:1;a.setXYZW(P,M.x,M.y,M.z,y)}for(let P=0,W=x.length;P<W;++P){const _=x[P],y=_.start,F=_.count;for(let k=y,V=y+F;k<V;k+=3)A(e.getX(k+0)),A(e.getX(k+1)),A(e.getX(k+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Bt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,m=i.count;u<m;u++)i.setXYZ(u,0,0,0);const r=new U,s=new U,a=new U,o=new U,l=new U,c=new U,h=new U,d=new U;if(e)for(let u=0,m=e.count;u<m;u+=3){const g=e.getX(u+0),v=e.getX(u+1),p=e.getX(u+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,p),h.subVectors(a,s),d.subVectors(r,s),h.cross(d),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,p),o.add(h),l.add(h),c.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let u=0,m=t.count;u<m;u+=3)r.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,s),d.subVectors(r,s),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)gt.fromBufferAttribute(e,t),gt.normalize(),e.setXYZ(t,gt.x,gt.y,gt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h);let m=0,g=0;for(let v=0,p=l.length;v<p;v++){o.isInterleavedBufferAttribute?m=l[v]*o.data.stride+o.offset:m=l[v]*h;for(let f=0;f<h;f++)u[g++]=c[m++]}return new Bt(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new bt,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let h=0,d=c.length;h<d;h++){const u=c[h],m=e(u,i);l.push(m)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const m=c[d];h.push(m.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const c in r){const h=r[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],d=s[c];for(let u=0,m=d.length;u<m;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Wo=new st,Yn=new ms,Ar=new ur,Xo=new U,wr=new U,Cr=new U,Rr=new U,Vs=new U,Pr=new U,qo=new U,Lr=new U;class Ye extends ft{constructor(e=new bt,t=new Fn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Pr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=o[l],d=s[l];h!==0&&(Vs.fromBufferAttribute(d,e),a?Pr.addScaledVector(Vs,h):Pr.addScaledVector(Vs.sub(t),h))}t.add(Pr)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ar.copy(i.boundingSphere),Ar.applyMatrix4(s),Yn.copy(e.ray).recast(e.near),!(Ar.containsPoint(Yn.origin)===!1&&(Yn.intersectSphere(Ar,Xo)===null||Yn.origin.distanceToSquared(Xo)>(e.far-e.near)**2))&&(Wo.copy(s).invert(),Yn.copy(e.ray).applyMatrix4(Wo),!(i.boundingBox!==null&&Yn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Yn)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,u=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=u.length;g<v;g++){const p=u[g],f=a[p.materialIndex],x=Math.max(p.start,m.start),M=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let E=x,R=M;E<R;E+=3){const w=o.getX(E),A=o.getX(E+1),P=o.getX(E+2);r=Dr(this,f,e,i,c,h,d,w,A,P),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const g=Math.max(0,m.start),v=Math.min(o.count,m.start+m.count);for(let p=g,f=v;p<f;p+=3){const x=o.getX(p),M=o.getX(p+1),E=o.getX(p+2);r=Dr(this,a,e,i,c,h,d,x,M,E),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=u.length;g<v;g++){const p=u[g],f=a[p.materialIndex],x=Math.max(p.start,m.start),M=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let E=x,R=M;E<R;E+=3){const w=E,A=E+1,P=E+2;r=Dr(this,f,e,i,c,h,d,w,A,P),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const g=Math.max(0,m.start),v=Math.min(l.count,m.start+m.count);for(let p=g,f=v;p<f;p+=3){const x=p,M=p+1,E=p+2;r=Dr(this,a,e,i,c,h,d,x,M,E),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}}function lu(n,e,t,i,r,s,a,o){let l;if(e.side===Dt?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===kn,o),l===null)return null;Lr.copy(o),Lr.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Lr);return c<t.near||c>t.far?null:{distance:c,point:Lr.clone(),object:n}}function Dr(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,wr),n.getVertexPosition(l,Cr),n.getVertexPosition(c,Rr);const h=lu(n,e,t,i,wr,Cr,Rr,qo);if(h){const d=new U;Qt.getBarycoord(qo,wr,Cr,Rr,d),r&&(h.uv=Qt.getInterpolatedAttribute(r,o,l,c,d,new ze)),s&&(h.uv1=Qt.getInterpolatedAttribute(s,o,l,c,d,new ze)),a&&(h.normal=Qt.getInterpolatedAttribute(a,o,l,c,d,new U),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new U,materialIndex:0};Qt.getNormal(wr,Cr,Rr,u.normal),h.face=u,h.barycoord=d}return h}class zn extends bt{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],h=[],d=[];let u=0,m=0;g("z","y","x",-1,-1,i,t,e,a,s,0),g("z","y","x",1,-1,i,t,-e,a,s,1),g("x","z","y",1,1,e,i,t,r,a,2),g("x","z","y",1,-1,e,i,-t,r,a,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new at(c,3)),this.setAttribute("normal",new at(h,3)),this.setAttribute("uv",new at(d,2));function g(v,p,f,x,M,E,R,w,A,P,W){const _=E/A,y=R/P,F=E/2,k=R/2,V=w/2,q=A+1,z=P+1;let j=0,H=0;const ce=new U;for(let he=0;he<z;he++){const Me=he*y-k;for(let Ge=0;Ge<q;Ge++){const Xe=Ge*_-F;ce[v]=Xe*x,ce[p]=Me*M,ce[f]=V,c.push(ce.x,ce.y,ce.z),ce[v]=0,ce[p]=0,ce[f]=w>0?1:-1,h.push(ce.x,ce.y,ce.z),d.push(Ge/A),d.push(1-he/P),j+=1}}for(let he=0;he<P;he++)for(let Me=0;Me<A;Me++){const Ge=u+Me+q*he,Xe=u+Me+q*(he+1),X=u+(Me+1)+q*(he+1),J=u+(Me+1)+q*he;l.push(Ge,Xe,J),l.push(Xe,X,J),H+=6}o.addGroup(m,H,W),m+=H,u+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Oi(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Tt(n){const e={};for(let t=0;t<n.length;t++){const i=Oi(n[t]);for(const r in i)e[r]=i[r]}return e}function cu(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function oc(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:et.workingColorSpace}const hu={clone:Oi,merge:Tt};var uu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,du=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Hn extends ci{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=uu,this.fragmentShader=du,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Oi(e.uniforms),this.uniformsGroups=cu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class lc extends ft{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new st,this.projectionMatrix=new st,this.projectionMatrixInverse=new st,this.coordinateSystem=_n}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const wn=new U,Yo=new ze,$o=new ze;class Zt extends lc{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ar*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(tr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ar*2*Math.atan(Math.tan(tr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){wn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(wn.x,wn.y).multiplyScalar(-e/wn.z),wn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(wn.x,wn.y).multiplyScalar(-e/wn.z)}getViewSize(e,t){return this.getViewBounds(e,Yo,$o),t.subVectors($o,Yo)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(tr*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const yi=-90,bi=1;class fu extends ft{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Zt(yi,bi,e,t);r.layers=this.layers,this.add(r);const s=new Zt(yi,bi,e,t);s.layers=this.layers,this.add(s);const a=new Zt(yi,bi,e,t);a.layers=this.layers,this.add(a);const o=new Zt(yi,bi,e,t);o.layers=this.layers,this.add(o);const l=new Zt(yi,bi,e,t);l.layers=this.layers,this.add(l);const c=new Zt(yi,bi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===_n)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===os)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,a),e.setRenderTarget(i,2,r),e.render(t,o),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,r),e.render(t,h),e.setRenderTarget(d,u,m),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class cc extends Ct{constructor(e,t,i,r,s,a,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:Ii,super(e,t,i,r,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class pu extends li{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new cc(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Jt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new zn(5,5,5),s=new Hn({name:"CubemapFromEquirect",uniforms:Oi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Dt,blending:Un});s.uniforms.tEquirect.value=t;const a=new Ye(r,s),o=t.minFilter;return t.minFilter===ri&&(t.minFilter=Jt),new fu(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}const Ws=new U,mu=new U,gu=new Oe;class Pn{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Ws.subVectors(i,t).cross(mu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Ws),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||gu.getNormalMatrix(e),r=this.coplanarPoint(Ws).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const $n=new ur,Ir=new U;class ao{constructor(e=new Pn,t=new Pn,i=new Pn,r=new Pn,s=new Pn,a=new Pn){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=_n){const i=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],h=r[5],d=r[6],u=r[7],m=r[8],g=r[9],v=r[10],p=r[11],f=r[12],x=r[13],M=r[14],E=r[15];if(i[0].setComponents(l-s,u-c,p-m,E-f).normalize(),i[1].setComponents(l+s,u+c,p+m,E+f).normalize(),i[2].setComponents(l+a,u+h,p+g,E+x).normalize(),i[3].setComponents(l-a,u-h,p-g,E-x).normalize(),i[4].setComponents(l-o,u-d,p-v,E-M).normalize(),t===_n)i[5].setComponents(l+o,u+d,p+v,E+M).normalize();else if(t===os)i[5].setComponents(o,d,v,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),$n.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),$n.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere($n)}intersectsSprite(e){return $n.center.set(0,0,0),$n.radius=.7071067811865476,$n.applyMatrix4(e.matrixWorld),this.intersectsSphere($n)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Ir.x=r.normal.x>0?e.max.x:e.min.x,Ir.y=r.normal.y>0?e.max.y:e.min.y,Ir.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ir)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function hc(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function _u(n){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,d=c.byteLength,u=n.createBuffer();n.bindBuffer(l,u),n.bufferData(l,c,h),o.onUploadCallback();let m;if(c instanceof Float32Array)m=n.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=n.SHORT;else if(c instanceof Uint32Array)m=n.UNSIGNED_INT;else if(c instanceof Int32Array)m=n.INT;else if(c instanceof Int8Array)m=n.BYTE;else if(c instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){const h=l.array,d=l.updateRanges;if(n.bindBuffer(c,o),d.length===0)n.bufferSubData(c,0,h);else{d.sort((m,g)=>m.start-g.start);let u=0;for(let m=1;m<d.length;m++){const g=d[u],v=d[m];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++u,d[u]=v)}d.length=u+1;for(let m=0,g=d.length;m<g;m++){const v=d[m];n.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}class Gn extends bt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,h=l+1,d=e/o,u=t/l,m=[],g=[],v=[],p=[];for(let f=0;f<h;f++){const x=f*u-a;for(let M=0;M<c;M++){const E=M*d-s;g.push(E,-x,0),v.push(0,0,1),p.push(M/o),p.push(1-f/l)}}for(let f=0;f<l;f++)for(let x=0;x<o;x++){const M=x+c*f,E=x+c*(f+1),R=x+1+c*(f+1),w=x+1+c*f;m.push(M,E,w),m.push(E,R,w)}this.setIndex(m),this.setAttribute("position",new at(g,3)),this.setAttribute("normal",new at(v,3)),this.setAttribute("uv",new at(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gn(e.width,e.height,e.widthSegments,e.heightSegments)}}var vu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,xu=`#ifdef USE_ALPHAHASH
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
#endif`,Mu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Su=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,yu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,bu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Eu=`#ifdef USE_AOMAP
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
#endif`,Tu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Au=`#ifdef USE_BATCHING
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
#endif`,wu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Cu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ru=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Pu=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Lu=`#ifdef USE_IRIDESCENCE
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
#endif`,Du=`#ifdef USE_BUMPMAP
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
#endif`,Iu=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Uu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Nu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Fu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ou=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Bu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ku=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,zu=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Hu=`#define PI 3.141592653589793
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
} // validated`,Gu=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Vu=`vec3 transformedNormal = objectNormal;
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
#endif`,Wu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Xu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,qu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Yu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,$u="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ku=`
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
}`,ju=`#ifdef USE_ENVMAP
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
#endif`,Zu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ju=`#ifdef USE_ENVMAP
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
#endif`,Qu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ed=`#ifdef USE_ENVMAP
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
#endif`,td=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,nd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,id=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,rd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,sd=`#ifdef USE_GRADIENTMAP
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
}`,ad=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,od=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ld=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,cd=`uniform bool receiveShadow;
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
#endif`,hd=`#ifdef USE_ENVMAP
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
#endif`,ud=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,dd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,fd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,pd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,md=`PhysicalMaterial material;
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
#endif`,gd=`struct PhysicalMaterial {
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
}`,_d=`
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
#endif`,vd=`#if defined( RE_IndirectDiffuse )
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
#endif`,xd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Md=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Sd=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yd=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,bd=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ed=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Td=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ad=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,wd=`#if defined( USE_POINTS_UV )
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
#endif`,Cd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Rd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Pd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ld=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Dd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Id=`#ifdef USE_MORPHTARGETS
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
#endif`,Ud=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Nd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Fd=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Od=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,zd=`#ifdef USE_NORMALMAP
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
#endif`,Hd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Gd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Vd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Wd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Xd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,qd=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Yd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,$d=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Kd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,jd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Zd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Jd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Qd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ef=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,tf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,nf=`float getShadowMask() {
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
}`,rf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,sf=`#ifdef USE_SKINNING
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
#endif`,af=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,of=`#ifdef USE_SKINNING
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
#endif`,lf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,cf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,hf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,uf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,df=`#ifdef USE_TRANSMISSION
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
#endif`,ff=`#ifdef USE_TRANSMISSION
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
#endif`,pf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,mf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,gf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_f=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const vf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,xf=`uniform sampler2D t2D;
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
}`,Mf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Sf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,yf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ef=`#include <common>
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
}`,Tf=`#if DEPTH_PACKING == 3200
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
}`,Af=`#define DISTANCE
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
}`,wf=`#define DISTANCE
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
}`,Cf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Rf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pf=`uniform float scale;
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
}`,Lf=`uniform vec3 diffuse;
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
}`,Df=`#include <common>
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
}`,If=`uniform vec3 diffuse;
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
}`,Uf=`#define LAMBERT
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
}`,Nf=`#define LAMBERT
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
}`,Ff=`#define MATCAP
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
}`,Of=`#define MATCAP
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
}`,Bf=`#define NORMAL
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
}`,kf=`#define NORMAL
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
}`,zf=`#define PHONG
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
}`,Hf=`#define PHONG
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
}`,Gf=`#define STANDARD
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
}`,Vf=`#define STANDARD
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
}`,Wf=`#define TOON
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
}`,Xf=`#define TOON
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
}`,qf=`uniform float size;
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
}`,Yf=`uniform vec3 diffuse;
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
}`,$f=`#include <common>
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
}`,Kf=`uniform vec3 color;
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
}`,jf=`uniform float rotation;
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
}`,Zf=`uniform vec3 diffuse;
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
}`,Fe={alphahash_fragment:vu,alphahash_pars_fragment:xu,alphamap_fragment:Mu,alphamap_pars_fragment:Su,alphatest_fragment:yu,alphatest_pars_fragment:bu,aomap_fragment:Eu,aomap_pars_fragment:Tu,batching_pars_vertex:Au,batching_vertex:wu,begin_vertex:Cu,beginnormal_vertex:Ru,bsdfs:Pu,iridescence_fragment:Lu,bumpmap_pars_fragment:Du,clipping_planes_fragment:Iu,clipping_planes_pars_fragment:Uu,clipping_planes_pars_vertex:Nu,clipping_planes_vertex:Fu,color_fragment:Ou,color_pars_fragment:Bu,color_pars_vertex:ku,color_vertex:zu,common:Hu,cube_uv_reflection_fragment:Gu,defaultnormal_vertex:Vu,displacementmap_pars_vertex:Wu,displacementmap_vertex:Xu,emissivemap_fragment:qu,emissivemap_pars_fragment:Yu,colorspace_fragment:$u,colorspace_pars_fragment:Ku,envmap_fragment:ju,envmap_common_pars_fragment:Zu,envmap_pars_fragment:Ju,envmap_pars_vertex:Qu,envmap_physical_pars_fragment:hd,envmap_vertex:ed,fog_vertex:td,fog_pars_vertex:nd,fog_fragment:id,fog_pars_fragment:rd,gradientmap_pars_fragment:sd,lightmap_pars_fragment:ad,lights_lambert_fragment:od,lights_lambert_pars_fragment:ld,lights_pars_begin:cd,lights_toon_fragment:ud,lights_toon_pars_fragment:dd,lights_phong_fragment:fd,lights_phong_pars_fragment:pd,lights_physical_fragment:md,lights_physical_pars_fragment:gd,lights_fragment_begin:_d,lights_fragment_maps:vd,lights_fragment_end:xd,logdepthbuf_fragment:Md,logdepthbuf_pars_fragment:Sd,logdepthbuf_pars_vertex:yd,logdepthbuf_vertex:bd,map_fragment:Ed,map_pars_fragment:Td,map_particle_fragment:Ad,map_particle_pars_fragment:wd,metalnessmap_fragment:Cd,metalnessmap_pars_fragment:Rd,morphinstance_vertex:Pd,morphcolor_vertex:Ld,morphnormal_vertex:Dd,morphtarget_pars_vertex:Id,morphtarget_vertex:Ud,normal_fragment_begin:Nd,normal_fragment_maps:Fd,normal_pars_fragment:Od,normal_pars_vertex:Bd,normal_vertex:kd,normalmap_pars_fragment:zd,clearcoat_normal_fragment_begin:Hd,clearcoat_normal_fragment_maps:Gd,clearcoat_pars_fragment:Vd,iridescence_pars_fragment:Wd,opaque_fragment:Xd,packing:qd,premultiplied_alpha_fragment:Yd,project_vertex:$d,dithering_fragment:Kd,dithering_pars_fragment:jd,roughnessmap_fragment:Zd,roughnessmap_pars_fragment:Jd,shadowmap_pars_fragment:Qd,shadowmap_pars_vertex:ef,shadowmap_vertex:tf,shadowmask_pars_fragment:nf,skinbase_vertex:rf,skinning_pars_vertex:sf,skinning_vertex:af,skinnormal_vertex:of,specularmap_fragment:lf,specularmap_pars_fragment:cf,tonemapping_fragment:hf,tonemapping_pars_fragment:uf,transmission_fragment:df,transmission_pars_fragment:ff,uv_pars_fragment:pf,uv_pars_vertex:mf,uv_vertex:gf,worldpos_vertex:_f,background_vert:vf,background_frag:xf,backgroundCube_vert:Mf,backgroundCube_frag:Sf,cube_vert:yf,cube_frag:bf,depth_vert:Ef,depth_frag:Tf,distanceRGBA_vert:Af,distanceRGBA_frag:wf,equirect_vert:Cf,equirect_frag:Rf,linedashed_vert:Pf,linedashed_frag:Lf,meshbasic_vert:Df,meshbasic_frag:If,meshlambert_vert:Uf,meshlambert_frag:Nf,meshmatcap_vert:Ff,meshmatcap_frag:Of,meshnormal_vert:Bf,meshnormal_frag:kf,meshphong_vert:zf,meshphong_frag:Hf,meshphysical_vert:Gf,meshphysical_frag:Vf,meshtoon_vert:Wf,meshtoon_frag:Xf,points_vert:qf,points_frag:Yf,shadow_vert:$f,shadow_frag:Kf,sprite_vert:jf,sprite_frag:Zf},re={common:{diffuse:{value:new Ue(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Oe}},envmap:{envMap:{value:null},envMapRotation:{value:new Oe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Oe},normalScale:{value:new ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ue(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ue(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0},uvTransform:{value:new Oe}},sprite:{diffuse:{value:new Ue(16777215)},opacity:{value:1},center:{value:new ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}}},tn={basic:{uniforms:Tt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.fog]),vertexShader:Fe.meshbasic_vert,fragmentShader:Fe.meshbasic_frag},lambert:{uniforms:Tt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new Ue(0)}}]),vertexShader:Fe.meshlambert_vert,fragmentShader:Fe.meshlambert_frag},phong:{uniforms:Tt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new Ue(0)},specular:{value:new Ue(1118481)},shininess:{value:30}}]),vertexShader:Fe.meshphong_vert,fragmentShader:Fe.meshphong_frag},standard:{uniforms:Tt([re.common,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.roughnessmap,re.metalnessmap,re.fog,re.lights,{emissive:{value:new Ue(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag},toon:{uniforms:Tt([re.common,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.gradientmap,re.fog,re.lights,{emissive:{value:new Ue(0)}}]),vertexShader:Fe.meshtoon_vert,fragmentShader:Fe.meshtoon_frag},matcap:{uniforms:Tt([re.common,re.bumpmap,re.normalmap,re.displacementmap,re.fog,{matcap:{value:null}}]),vertexShader:Fe.meshmatcap_vert,fragmentShader:Fe.meshmatcap_frag},points:{uniforms:Tt([re.points,re.fog]),vertexShader:Fe.points_vert,fragmentShader:Fe.points_frag},dashed:{uniforms:Tt([re.common,re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Fe.linedashed_vert,fragmentShader:Fe.linedashed_frag},depth:{uniforms:Tt([re.common,re.displacementmap]),vertexShader:Fe.depth_vert,fragmentShader:Fe.depth_frag},normal:{uniforms:Tt([re.common,re.bumpmap,re.normalmap,re.displacementmap,{opacity:{value:1}}]),vertexShader:Fe.meshnormal_vert,fragmentShader:Fe.meshnormal_frag},sprite:{uniforms:Tt([re.sprite,re.fog]),vertexShader:Fe.sprite_vert,fragmentShader:Fe.sprite_frag},background:{uniforms:{uvTransform:{value:new Oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Fe.background_vert,fragmentShader:Fe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Oe}},vertexShader:Fe.backgroundCube_vert,fragmentShader:Fe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Fe.cube_vert,fragmentShader:Fe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Fe.equirect_vert,fragmentShader:Fe.equirect_frag},distanceRGBA:{uniforms:Tt([re.common,re.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Fe.distanceRGBA_vert,fragmentShader:Fe.distanceRGBA_frag},shadow:{uniforms:Tt([re.lights,re.fog,{color:{value:new Ue(0)},opacity:{value:1}}]),vertexShader:Fe.shadow_vert,fragmentShader:Fe.shadow_frag}};tn.physical={uniforms:Tt([tn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Oe},clearcoatNormalScale:{value:new ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Oe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Oe},sheen:{value:0},sheenColor:{value:new Ue(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Oe},transmissionSamplerSize:{value:new ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Oe},attenuationDistance:{value:0},attenuationColor:{value:new Ue(0)},specularColor:{value:new Ue(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Oe},anisotropyVector:{value:new ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Oe}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag};const Ur={r:0,b:0,g:0},Kn=new sn,Jf=new st;function Qf(n,e,t,i,r,s,a){const o=new Ue(0);let l=s===!0?0:1,c,h,d=null,u=0,m=null;function g(x){let M=x.isScene===!0?x.background:null;return M&&M.isTexture&&(M=(x.backgroundBlurriness>0?t:e).get(M)),M}function v(x){let M=!1;const E=g(x);E===null?f(o,l):E&&E.isColor&&(f(E,1),M=!0);const R=n.xr.getEnvironmentBlendMode();R==="additive"?i.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||M)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function p(x,M){const E=g(M);E&&(E.isCubeTexture||E.mapping===fs)?(h===void 0&&(h=new Ye(new zn(1,1,1),new Hn({name:"BackgroundCubeMaterial",uniforms:Oi(tn.backgroundCube.uniforms),vertexShader:tn.backgroundCube.vertexShader,fragmentShader:tn.backgroundCube.fragmentShader,side:Dt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),Kn.copy(M.backgroundRotation),Kn.x*=-1,Kn.y*=-1,Kn.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Kn.y*=-1,Kn.z*=-1),h.material.uniforms.envMap.value=E,h.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Jf.makeRotationFromEuler(Kn)),h.material.toneMapped=et.getTransfer(E.colorSpace)!==rt,(d!==E||u!==E.version||m!==n.toneMapping)&&(h.material.needsUpdate=!0,d=E,u=E.version,m=n.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new Ye(new Gn(2,2),new Hn({name:"BackgroundMaterial",uniforms:Oi(tn.background.uniforms),vertexShader:tn.background.vertexShader,fragmentShader:tn.background.fragmentShader,side:kn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=et.getTransfer(E.colorSpace)!==rt,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(d!==E||u!==E.version||m!==n.toneMapping)&&(c.material.needsUpdate=!0,d=E,u=E.version,m=n.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function f(x,M){x.getRGB(Ur,oc(n)),i.buffers.color.setClear(Ur.r,Ur.g,Ur.b,M,a)}return{getClearColor:function(){return o},setClearColor:function(x,M=1){o.set(x),l=M,f(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,f(o,l)},render:v,addToRenderList:p}}function ep(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=u(null);let s=r,a=!1;function o(_,y,F,k,V){let q=!1;const z=d(k,F,y);s!==z&&(s=z,c(s.object)),q=m(_,k,F,V),q&&g(_,k,F,V),V!==null&&e.update(V,n.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,E(_,y,F,k),V!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function l(){return n.createVertexArray()}function c(_){return n.bindVertexArray(_)}function h(_){return n.deleteVertexArray(_)}function d(_,y,F){const k=F.wireframe===!0;let V=i[_.id];V===void 0&&(V={},i[_.id]=V);let q=V[y.id];q===void 0&&(q={},V[y.id]=q);let z=q[k];return z===void 0&&(z=u(l()),q[k]=z),z}function u(_){const y=[],F=[],k=[];for(let V=0;V<t;V++)y[V]=0,F[V]=0,k[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:y,enabledAttributes:F,attributeDivisors:k,object:_,attributes:{},index:null}}function m(_,y,F,k){const V=s.attributes,q=y.attributes;let z=0;const j=F.getAttributes();for(const H in j)if(j[H].location>=0){const he=V[H];let Me=q[H];if(Me===void 0&&(H==="instanceMatrix"&&_.instanceMatrix&&(Me=_.instanceMatrix),H==="instanceColor"&&_.instanceColor&&(Me=_.instanceColor)),he===void 0||he.attribute!==Me||Me&&he.data!==Me.data)return!0;z++}return s.attributesNum!==z||s.index!==k}function g(_,y,F,k){const V={},q=y.attributes;let z=0;const j=F.getAttributes();for(const H in j)if(j[H].location>=0){let he=q[H];he===void 0&&(H==="instanceMatrix"&&_.instanceMatrix&&(he=_.instanceMatrix),H==="instanceColor"&&_.instanceColor&&(he=_.instanceColor));const Me={};Me.attribute=he,he&&he.data&&(Me.data=he.data),V[H]=Me,z++}s.attributes=V,s.attributesNum=z,s.index=k}function v(){const _=s.newAttributes;for(let y=0,F=_.length;y<F;y++)_[y]=0}function p(_){f(_,0)}function f(_,y){const F=s.newAttributes,k=s.enabledAttributes,V=s.attributeDivisors;F[_]=1,k[_]===0&&(n.enableVertexAttribArray(_),k[_]=1),V[_]!==y&&(n.vertexAttribDivisor(_,y),V[_]=y)}function x(){const _=s.newAttributes,y=s.enabledAttributes;for(let F=0,k=y.length;F<k;F++)y[F]!==_[F]&&(n.disableVertexAttribArray(F),y[F]=0)}function M(_,y,F,k,V,q,z){z===!0?n.vertexAttribIPointer(_,y,F,V,q):n.vertexAttribPointer(_,y,F,k,V,q)}function E(_,y,F,k){v();const V=k.attributes,q=F.getAttributes(),z=y.defaultAttributeValues;for(const j in q){const H=q[j];if(H.location>=0){let ce=V[j];if(ce===void 0&&(j==="instanceMatrix"&&_.instanceMatrix&&(ce=_.instanceMatrix),j==="instanceColor"&&_.instanceColor&&(ce=_.instanceColor)),ce!==void 0){const he=ce.normalized,Me=ce.itemSize,Ge=e.get(ce);if(Ge===void 0)continue;const Xe=Ge.buffer,X=Ge.type,J=Ge.bytesPerElement,ge=X===n.INT||X===n.UNSIGNED_INT||ce.gpuType===Za;if(ce.isInterleavedBufferAttribute){const fe=ce.data,we=fe.stride,Ae=ce.offset;if(fe.isInstancedInterleavedBuffer){for(let ke=0;ke<H.locationSize;ke++)f(H.location+ke,fe.meshPerAttribute);_.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let ke=0;ke<H.locationSize;ke++)p(H.location+ke);n.bindBuffer(n.ARRAY_BUFFER,Xe);for(let ke=0;ke<H.locationSize;ke++)M(H.location+ke,Me/H.locationSize,X,he,we*J,(Ae+Me/H.locationSize*ke)*J,ge)}else{if(ce.isInstancedBufferAttribute){for(let fe=0;fe<H.locationSize;fe++)f(H.location+fe,ce.meshPerAttribute);_.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let fe=0;fe<H.locationSize;fe++)p(H.location+fe);n.bindBuffer(n.ARRAY_BUFFER,Xe);for(let fe=0;fe<H.locationSize;fe++)M(H.location+fe,Me/H.locationSize,X,he,Me*J,Me/H.locationSize*fe*J,ge)}}else if(z!==void 0){const he=z[j];if(he!==void 0)switch(he.length){case 2:n.vertexAttrib2fv(H.location,he);break;case 3:n.vertexAttrib3fv(H.location,he);break;case 4:n.vertexAttrib4fv(H.location,he);break;default:n.vertexAttrib1fv(H.location,he)}}}}x()}function R(){P();for(const _ in i){const y=i[_];for(const F in y){const k=y[F];for(const V in k)h(k[V].object),delete k[V];delete y[F]}delete i[_]}}function w(_){if(i[_.id]===void 0)return;const y=i[_.id];for(const F in y){const k=y[F];for(const V in k)h(k[V].object),delete k[V];delete y[F]}delete i[_.id]}function A(_){for(const y in i){const F=i[y];if(F[_.id]===void 0)continue;const k=F[_.id];for(const V in k)h(k[V].object),delete k[V];delete F[_.id]}}function P(){W(),a=!0,s!==r&&(s=r,c(s.object))}function W(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:P,resetDefaultState:W,dispose:R,releaseStatesOfGeometry:w,releaseStatesOfProgram:A,initAttributes:v,enableAttribute:p,disableUnusedAttributes:x}}function tp(n,e,t){let i;function r(c){i=c}function s(c,h){n.drawArrays(i,c,h),t.update(h,i,1)}function a(c,h,d){d!==0&&(n.drawArraysInstanced(i,c,h,d),t.update(h,i,d))}function o(c,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,d);let m=0;for(let g=0;g<d;g++)m+=h[g];t.update(m,i,1)}function l(c,h,d,u){if(d===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<c.length;g++)a(c[g],h[g],u[g]);else{m.multiDrawArraysInstancedWEBGL(i,c,0,h,0,u,0,d);let g=0;for(let v=0;v<d;v++)g+=h[v];for(let v=0;v<u.length;v++)t.update(g,i,u[v])}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function np(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(A){return!(A!==en&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const P=A===lr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Mn&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==gn&&!P)}function l(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=t.logarithmicDepthBuffer===!0,u=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(u===!0){const A=e.get("EXT_clip_control");A.clipControlEXT(A.LOWER_LEFT_EXT,A.ZERO_TO_ONE_EXT)}const m=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),x=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),M=n.getParameter(n.MAX_VARYING_VECTORS),E=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,w=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:u,maxTextures:m,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:p,maxAttributes:f,maxVertexUniforms:x,maxVaryings:M,maxFragmentUniforms:E,vertexTextures:R,maxSamples:w}}function ip(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new Pn,o=new Oe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const m=d.length!==0||u||i!==0||r;return r=u,i=d.length,m},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,m){const g=d.clippingPlanes,v=d.clipIntersection,p=d.clipShadows,f=n.get(d);if(!r||g===null||g.length===0||s&&!p)s?h(null):c();else{const x=s?0:i,M=x*4;let E=f.clippingState||null;l.value=E,E=h(g,u,M,m);for(let R=0;R!==M;++R)E[R]=t[R];f.clippingState=E,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(d,u,m,g){const v=d!==null?d.length:0;let p=null;if(v!==0){if(p=l.value,g!==!0||p===null){const f=m+v*4,x=u.matrixWorldInverse;o.getNormalMatrix(x),(p===null||p.length<f)&&(p=new Float32Array(f));for(let M=0,E=m;M!==v;++M,E+=4)a.copy(d[M]).applyMatrix4(x,o),a.normal.toArray(p,E),p[E+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,p}}function rp(n){let e=new WeakMap;function t(a,o){return o===pa?a.mapping=Ii:o===ma&&(a.mapping=Ui),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===pa||o===ma)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new pu(l.height);return c.fromEquirectangularTexture(n,a),e.set(a,c),a.addEventListener("dispose",r),t(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class oo extends lc{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const wi=4,Ko=[.125,.215,.35,.446,.526,.582],ti=20,Xs=new oo,jo=new Ue;let qs=null,Ys=0,$s=0,Ks=!1;const Jn=(1+Math.sqrt(5))/2,Ei=1/Jn,Zo=[new U(-Jn,Ei,0),new U(Jn,Ei,0),new U(-Ei,0,Jn),new U(Ei,0,Jn),new U(0,Jn,-Ei),new U(0,Jn,Ei),new U(-1,1,-1),new U(1,1,-1),new U(-1,1,1),new U(1,1,1)];class Jo{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){qs=this._renderer.getRenderTarget(),Ys=this._renderer.getActiveCubeFace(),$s=this._renderer.getActiveMipmapLevel(),Ks=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=tl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=el(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(qs,Ys,$s),this._renderer.xr.enabled=Ks,e.scissorTest=!1,Nr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ii||e.mapping===Ui?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),qs=this._renderer.getRenderTarget(),Ys=this._renderer.getActiveCubeFace(),$s=this._renderer.getActiveMipmapLevel(),Ks=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Jt,minFilter:Jt,generateMipmaps:!1,type:lr,format:en,colorSpace:Vn,depthBuffer:!1},r=Qo(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Qo(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=sp(s)),this._blurMaterial=ap(s,e,t)}return r}_compileMaterial(e){const t=new Ye(this._lodPlanes[0],e);this._renderer.compile(t,Xs)}_sceneToCubeUV(e,t,i,r){const o=new Zt(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(jo),h.toneMapping=Nn,h.autoClear=!1;const m=new Fn({name:"PMREM.Background",side:Dt,depthWrite:!1,depthTest:!1}),g=new Ye(new zn,m);let v=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,v=!0):(m.color.copy(jo),v=!0);for(let f=0;f<6;f++){const x=f%3;x===0?(o.up.set(0,l[f],0),o.lookAt(c[f],0,0)):x===1?(o.up.set(0,0,l[f]),o.lookAt(0,c[f],0)):(o.up.set(0,l[f],0),o.lookAt(0,0,c[f]));const M=this._cubeSize;Nr(r,x*M,f>2?M:0,M,M),h.setRenderTarget(r),v&&h.render(g,o),h.render(e,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=d,e.background=p}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===Ii||e.mapping===Ui;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=tl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=el());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new Ye(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Nr(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Xs)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Zo[(r-s-1)%Zo.length];this._blur(e,s-1,s,a,o)}t.autoClear=i}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new Ye(this._lodPlanes[r],c),u=c.uniforms,m=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*ti-1),v=s/g,p=isFinite(s)?1+Math.floor(h*v):ti;p>ti&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${ti}`);const f=[];let x=0;for(let A=0;A<ti;++A){const P=A/v,W=Math.exp(-P*P/2);f.push(W),A===0?x+=W:A<p&&(x+=2*W)}for(let A=0;A<f.length;A++)f[A]=f[A]/x;u.envMap.value=e.texture,u.samples.value=p,u.weights.value=f,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:M}=this;u.dTheta.value=g,u.mipInt.value=M-i;const E=this._sizeLods[r],R=3*E*(r>M-wi?r-M+wi:0),w=4*(this._cubeSize-E);Nr(t,R,w,3*E,2*E),l.setRenderTarget(t),l.render(d,Xs)}}function sp(n){const e=[],t=[],i=[];let r=n;const s=n-wi+1+Ko.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let l=1/o;a>n-wi?l=Ko[a-n+wi-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],m=6,g=6,v=3,p=2,f=1,x=new Float32Array(v*g*m),M=new Float32Array(p*g*m),E=new Float32Array(f*g*m);for(let w=0;w<m;w++){const A=w%3*2/3-1,P=w>2?0:-1,W=[A,P,0,A+2/3,P,0,A+2/3,P+1,0,A,P,0,A+2/3,P+1,0,A,P+1,0];x.set(W,v*g*w),M.set(u,p*g*w);const _=[w,w,w,w,w,w];E.set(_,f*g*w)}const R=new bt;R.setAttribute("position",new Bt(x,v)),R.setAttribute("uv",new Bt(M,p)),R.setAttribute("faceIndex",new Bt(E,f)),e.push(R),r>wi&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Qo(n,e,t){const i=new li(n,e,t);return i.texture.mapping=fs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Nr(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function ap(n,e,t){const i=new Float32Array(ti),r=new U(0,1,0);return new Hn({name:"SphericalGaussianBlur",defines:{n:ti,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:lo(),fragmentShader:`

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
		`,blending:Un,depthTest:!1,depthWrite:!1})}function el(){return new Hn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:lo(),fragmentShader:`

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
		`,blending:Un,depthTest:!1,depthWrite:!1})}function tl(){return new Hn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:lo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function lo(){return`

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
	`}function op(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===pa||l===ma,h=l===Ii||l===Ui;if(c||h){let d=e.get(o);const u=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return t===null&&(t=new Jo(n)),d=c?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const m=o.image;return c&&m&&m.height>0||h&&m&&r(m)?(t===null&&(t=new Jo(n)),d=c?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",s),d.texture):null}}}return o}function r(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function lp(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&es("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function cp(n,e,t,i){const r={},s=new WeakMap;function a(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);for(const g in u.morphAttributes){const v=u.morphAttributes[g];for(let p=0,f=v.length;p<f;p++)e.remove(v[p])}u.removeEventListener("dispose",a),delete r[u.id];const m=s.get(u);m&&(e.remove(m),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return r[u.id]===!0||(u.addEventListener("dispose",a),r[u.id]=!0,t.memory.geometries++),u}function l(d){const u=d.attributes;for(const g in u)e.update(u[g],n.ARRAY_BUFFER);const m=d.morphAttributes;for(const g in m){const v=m[g];for(let p=0,f=v.length;p<f;p++)e.update(v[p],n.ARRAY_BUFFER)}}function c(d){const u=[],m=d.index,g=d.attributes.position;let v=0;if(m!==null){const x=m.array;v=m.version;for(let M=0,E=x.length;M<E;M+=3){const R=x[M+0],w=x[M+1],A=x[M+2];u.push(R,w,w,A,A,R)}}else if(g!==void 0){const x=g.array;v=g.version;for(let M=0,E=x.length/3-1;M<E;M+=3){const R=M+0,w=M+1,A=M+2;u.push(R,w,w,A,A,R)}}else return;const p=new(tc(u)?ac:sc)(u,1);p.version=v;const f=s.get(d);f&&e.remove(f),s.set(d,p)}function h(d){const u=s.get(d);if(u){const m=d.index;m!==null&&u.version<m.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function hp(n,e,t){let i;function r(u){i=u}let s,a;function o(u){s=u.type,a=u.bytesPerElement}function l(u,m){n.drawElements(i,m,s,u*a),t.update(m,i,1)}function c(u,m,g){g!==0&&(n.drawElementsInstanced(i,m,s,u*a,g),t.update(m,i,g))}function h(u,m,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,m,0,s,u,0,g);let p=0;for(let f=0;f<g;f++)p+=m[f];t.update(p,i,1)}function d(u,m,g,v){if(g===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let f=0;f<u.length;f++)c(u[f]/a,m[f],v[f]);else{p.multiDrawElementsInstancedWEBGL(i,m,0,s,u,0,v,0,g);let f=0;for(let x=0;x<g;x++)f+=m[x];for(let x=0;x<v.length;x++)t.update(f,i,v[x])}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function up(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function dp(n,e,t){const i=new WeakMap,r=new lt;function s(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=i.get(o);if(u===void 0||u.count!==d){let _=function(){P.dispose(),i.delete(o),o.removeEventListener("dispose",_)};var m=_;u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],x=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let E=0;g===!0&&(E=1),v===!0&&(E=2),p===!0&&(E=3);let R=o.attributes.position.count*E,w=1;R>e.maxTextureSize&&(w=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const A=new Float32Array(R*w*4*d),P=new ic(A,R,w,d);P.type=gn,P.needsUpdate=!0;const W=E*4;for(let y=0;y<d;y++){const F=f[y],k=x[y],V=M[y],q=R*w*4*y;for(let z=0;z<F.count;z++){const j=z*W;g===!0&&(r.fromBufferAttribute(F,z),A[q+j+0]=r.x,A[q+j+1]=r.y,A[q+j+2]=r.z,A[q+j+3]=0),v===!0&&(r.fromBufferAttribute(k,z),A[q+j+4]=r.x,A[q+j+5]=r.y,A[q+j+6]=r.z,A[q+j+7]=0),p===!0&&(r.fromBufferAttribute(V,z),A[q+j+8]=r.x,A[q+j+9]=r.y,A[q+j+10]=r.z,A[q+j+11]=V.itemSize===4?r.w:1)}}u={count:d,texture:P,size:new ze(R,w)},i.set(o,u),o.addEventListener("dispose",_)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let g=0;for(let p=0;p<c.length;p++)g+=c[p];const v=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",v),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:s}}function fp(n,e,t,i){let r=new WeakMap;function s(l){const c=i.render.frame,h=l.geometry,d=e.get(l,h);if(r.get(d)!==c&&(e.update(d),r.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;r.get(u)!==c&&(u.update(),r.set(u,c))}return d}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}class uc extends Ct{constructor(e,t,i,r,s,a,o,l,c,h=Ri){if(h!==Ri&&h!==Fi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Ri&&(i=oi),i===void 0&&h===Fi&&(i=Ni),super(null,r,s,a,o,l,h,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Vt,this.minFilter=l!==void 0?l:Vt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const dc=new Ct,nl=new uc(1,1),fc=new ic,pc=new Jh,mc=new cc,il=[],rl=[],sl=new Float32Array(16),al=new Float32Array(9),ol=new Float32Array(4);function Gi(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=il[r];if(s===void 0&&(s=new Float32Array(r),il[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function pt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function mt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function gs(n,e){let t=rl[e];t===void 0&&(t=new Int32Array(e),rl[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function pp(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function mp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;n.uniform2fv(this.addr,e),mt(t,e)}}function gp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(pt(t,e))return;n.uniform3fv(this.addr,e),mt(t,e)}}function _p(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;n.uniform4fv(this.addr,e),mt(t,e)}}function vp(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(pt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,i))return;ol.set(i),n.uniformMatrix2fv(this.addr,!1,ol),mt(t,i)}}function xp(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(pt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,i))return;al.set(i),n.uniformMatrix3fv(this.addr,!1,al),mt(t,i)}}function Mp(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(pt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,i))return;sl.set(i),n.uniformMatrix4fv(this.addr,!1,sl),mt(t,i)}}function Sp(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function yp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;n.uniform2iv(this.addr,e),mt(t,e)}}function bp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pt(t,e))return;n.uniform3iv(this.addr,e),mt(t,e)}}function Ep(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;n.uniform4iv(this.addr,e),mt(t,e)}}function Tp(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Ap(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;n.uniform2uiv(this.addr,e),mt(t,e)}}function wp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pt(t,e))return;n.uniform3uiv(this.addr,e),mt(t,e)}}function Cp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;n.uniform4uiv(this.addr,e),mt(t,e)}}function Rp(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(nl.compareFunction=ec,s=nl):s=dc,t.setTexture2D(e||s,r)}function Pp(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||pc,r)}function Lp(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||mc,r)}function Dp(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||fc,r)}function Ip(n){switch(n){case 5126:return pp;case 35664:return mp;case 35665:return gp;case 35666:return _p;case 35674:return vp;case 35675:return xp;case 35676:return Mp;case 5124:case 35670:return Sp;case 35667:case 35671:return yp;case 35668:case 35672:return bp;case 35669:case 35673:return Ep;case 5125:return Tp;case 36294:return Ap;case 36295:return wp;case 36296:return Cp;case 35678:case 36198:case 36298:case 36306:case 35682:return Rp;case 35679:case 36299:case 36307:return Pp;case 35680:case 36300:case 36308:case 36293:return Lp;case 36289:case 36303:case 36311:case 36292:return Dp}}function Up(n,e){n.uniform1fv(this.addr,e)}function Np(n,e){const t=Gi(e,this.size,2);n.uniform2fv(this.addr,t)}function Fp(n,e){const t=Gi(e,this.size,3);n.uniform3fv(this.addr,t)}function Op(n,e){const t=Gi(e,this.size,4);n.uniform4fv(this.addr,t)}function Bp(n,e){const t=Gi(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function kp(n,e){const t=Gi(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function zp(n,e){const t=Gi(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Hp(n,e){n.uniform1iv(this.addr,e)}function Gp(n,e){n.uniform2iv(this.addr,e)}function Vp(n,e){n.uniform3iv(this.addr,e)}function Wp(n,e){n.uniform4iv(this.addr,e)}function Xp(n,e){n.uniform1uiv(this.addr,e)}function qp(n,e){n.uniform2uiv(this.addr,e)}function Yp(n,e){n.uniform3uiv(this.addr,e)}function $p(n,e){n.uniform4uiv(this.addr,e)}function Kp(n,e,t){const i=this.cache,r=e.length,s=gs(t,r);pt(i,s)||(n.uniform1iv(this.addr,s),mt(i,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||dc,s[a])}function jp(n,e,t){const i=this.cache,r=e.length,s=gs(t,r);pt(i,s)||(n.uniform1iv(this.addr,s),mt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||pc,s[a])}function Zp(n,e,t){const i=this.cache,r=e.length,s=gs(t,r);pt(i,s)||(n.uniform1iv(this.addr,s),mt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||mc,s[a])}function Jp(n,e,t){const i=this.cache,r=e.length,s=gs(t,r);pt(i,s)||(n.uniform1iv(this.addr,s),mt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||fc,s[a])}function Qp(n){switch(n){case 5126:return Up;case 35664:return Np;case 35665:return Fp;case 35666:return Op;case 35674:return Bp;case 35675:return kp;case 35676:return zp;case 5124:case 35670:return Hp;case 35667:case 35671:return Gp;case 35668:case 35672:return Vp;case 35669:case 35673:return Wp;case 5125:return Xp;case 36294:return qp;case 36295:return Yp;case 36296:return $p;case 35678:case 36198:case 36298:case 36306:case 35682:return Kp;case 35679:case 36299:case 36307:return jp;case 35680:case 36300:case 36308:case 36293:return Zp;case 36289:case 36303:case 36311:case 36292:return Jp}}class em{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Ip(t.type)}}class tm{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Qp(t.type)}}class nm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const js=/(\w+)(\])?(\[|\.)?/g;function ll(n,e){n.seq.push(e),n.map[e.id]=e}function im(n,e,t){const i=n.name,r=i.length;for(js.lastIndex=0;;){const s=js.exec(i),a=js.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){ll(t,c===void 0?new em(o,n,e):new tm(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new nm(o),ll(t,d)),t=d}}}class ts{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);im(s,a,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function cl(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const rm=37297;let sm=0;function am(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}function om(n){const e=et.getPrimaries(et.workingColorSpace),t=et.getPrimaries(n);let i;switch(e===t?i="":e===as&&t===ss?i="LinearDisplayP3ToLinearSRGB":e===ss&&t===as&&(i="LinearSRGBToLinearDisplayP3"),n){case Vn:case ps:return[i,"LinearTransferOETF"];case Lt:case io:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function hl(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+am(n.getShaderSource(e),a)}else return r}function lm(n,e){const t=om(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function cm(n,e){let t;switch(e){case hh:t="Linear";break;case uh:t="Reinhard";break;case dh:t="Cineon";break;case Hl:t="ACESFilmic";break;case ph:t="AgX";break;case mh:t="Neutral";break;case fh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Fr=new U;function hm(){et.getLuminanceCoefficients(Fr);const n=Fr.x.toFixed(4),e=Fr.y.toFixed(4),t=Fr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function um(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(er).join(`
`)}function dm(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function fm(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function er(n){return n!==""}function ul(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function dl(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const pm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Wa(n){return n.replace(pm,gm)}const mm=new Map;function gm(n,e){let t=Fe[e];if(t===void 0){const i=mm.get(e);if(i!==void 0)t=Fe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Wa(t)}const _m=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function fl(n){return n.replace(_m,vm)}function vm(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function pl(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}function xm(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Bl?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===kl?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===fn&&(e="SHADOWMAP_TYPE_VSM"),e}function Mm(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Ii:case Ui:e="ENVMAP_TYPE_CUBE";break;case fs:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Sm(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Ui:e="ENVMAP_MODE_REFRACTION";break}return e}function ym(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case zl:e="ENVMAP_BLENDING_MULTIPLY";break;case lh:e="ENVMAP_BLENDING_MIX";break;case ch:e="ENVMAP_BLENDING_ADD";break}return e}function bm(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function Em(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=xm(t),c=Mm(t),h=Sm(t),d=ym(t),u=bm(t),m=um(t),g=dm(s),v=r.createProgram();let p,f,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(er).join(`
`),p.length>0&&(p+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(er).join(`
`),f.length>0&&(f+=`
`)):(p=[pl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(er).join(`
`),f=[pl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Nn?"#define TONE_MAPPING":"",t.toneMapping!==Nn?Fe.tonemapping_pars_fragment:"",t.toneMapping!==Nn?cm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Fe.colorspace_pars_fragment,lm("linearToOutputTexel",t.outputColorSpace),hm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(er).join(`
`)),a=Wa(a),a=ul(a,t),a=dl(a,t),o=Wa(o),o=ul(o,t),o=dl(o,t),a=fl(a),o=fl(o),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,f=["#define varying in",t.glslVersion===Po?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Po?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const M=x+p+a,E=x+f+o,R=cl(r,r.VERTEX_SHADER,M),w=cl(r,r.FRAGMENT_SHADER,E);r.attachShader(v,R),r.attachShader(v,w),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function A(y){if(n.debug.checkShaderErrors){const F=r.getProgramInfoLog(v).trim(),k=r.getShaderInfoLog(R).trim(),V=r.getShaderInfoLog(w).trim();let q=!0,z=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(q=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,v,R,w);else{const j=hl(r,R,"vertex"),H=hl(r,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+y.name+`
Material Type: `+y.type+`

Program Info Log: `+F+`
`+j+`
`+H)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):(k===""||V==="")&&(z=!1);z&&(y.diagnostics={runnable:q,programLog:F,vertexShader:{log:k,prefix:p},fragmentShader:{log:V,prefix:f}})}r.deleteShader(R),r.deleteShader(w),P=new ts(r,v),W=fm(r,v)}let P;this.getUniforms=function(){return P===void 0&&A(this),P};let W;this.getAttributes=function(){return W===void 0&&A(this),W};let _=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=r.getProgramParameter(v,rm)),_},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=sm++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=R,this.fragmentShader=w,this}let Tm=0;class Am{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new wm(e),t.set(e,i)),i}}class wm{constructor(e){this.id=Tm++,this.code=e,this.usedTimes=0}}function Cm(n,e,t,i,r,s,a){const o=new so,l=new Am,c=new Set,h=[],d=r.logarithmicDepthBuffer,u=r.reverseDepthBuffer,m=r.vertexTextures;let g=r.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(_){return c.add(_),_===0?"uv":`uv${_}`}function f(_,y,F,k,V){const q=k.fog,z=V.geometry,j=_.isMeshStandardMaterial?k.environment:null,H=(_.isMeshStandardMaterial?t:e).get(_.envMap||j),ce=H&&H.mapping===fs?H.image.height:null,he=v[_.type];_.precision!==null&&(g=r.getMaxPrecision(_.precision),g!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",g,"instead."));const Me=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,Ge=Me!==void 0?Me.length:0;let Xe=0;z.morphAttributes.position!==void 0&&(Xe=1),z.morphAttributes.normal!==void 0&&(Xe=2),z.morphAttributes.color!==void 0&&(Xe=3);let X,J,ge,fe;if(he){const Pt=tn[he];X=Pt.vertexShader,J=Pt.fragmentShader}else X=_.vertexShader,J=_.fragmentShader,l.update(_),ge=l.getVertexShaderID(_),fe=l.getFragmentShaderID(_);const we=n.getRenderTarget(),Ae=V.isInstancedMesh===!0,ke=V.isBatchedMesh===!0,Ze=!!_.map,He=!!_.matcap,T=!!H,ne=!!_.aoMap,se=!!_.lightMap,Q=!!_.bumpMap,ie=!!_.normalMap,Ve=!!_.displacementMap,Ce=!!_.emissiveMap,C=!!_.metalnessMap,S=!!_.roughnessMap,N=_.anisotropy>0,$=_.clearcoat>0,Z=_.dispersion>0,Y=_.iridescence>0,ye=_.sheen>0,ae=_.transmission>0,me=N&&!!_.anisotropyMap,$e=$&&!!_.clearcoatMap,ee=$&&!!_.clearcoatNormalMap,_e=$&&!!_.clearcoatRoughnessMap,Le=Y&&!!_.iridescenceMap,De=Y&&!!_.iridescenceThicknessMap,ve=ye&&!!_.sheenColorMap,We=ye&&!!_.sheenRoughnessMap,Ie=!!_.specularMap,nt=!!_.specularColorMap,L=!!_.specularIntensityMap,ue=ae&&!!_.transmissionMap,G=ae&&!!_.thicknessMap,K=!!_.gradientMap,oe=!!_.alphaMap,de=_.alphaTest>0,qe=!!_.alphaHash,ht=!!_.extensions;let Rt=Nn;_.toneMapped&&(we===null||we.isXRRenderTarget===!0)&&(Rt=n.toneMapping);const Ke={shaderID:he,shaderType:_.type,shaderName:_.name,vertexShader:X,fragmentShader:J,defines:_.defines,customVertexShaderID:ge,customFragmentShaderID:fe,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:g,batching:ke,batchingColor:ke&&V._colorsTexture!==null,instancing:Ae,instancingColor:Ae&&V.instanceColor!==null,instancingMorph:Ae&&V.morphTexture!==null,supportsVertexTextures:m,outputColorSpace:we===null?n.outputColorSpace:we.isXRRenderTarget===!0?we.texture.colorSpace:Vn,alphaToCoverage:!!_.alphaToCoverage,map:Ze,matcap:He,envMap:T,envMapMode:T&&H.mapping,envMapCubeUVHeight:ce,aoMap:ne,lightMap:se,bumpMap:Q,normalMap:ie,displacementMap:m&&Ve,emissiveMap:Ce,normalMapObjectSpace:ie&&_.normalMapType===xh,normalMapTangentSpace:ie&&_.normalMapType===Ql,metalnessMap:C,roughnessMap:S,anisotropy:N,anisotropyMap:me,clearcoat:$,clearcoatMap:$e,clearcoatNormalMap:ee,clearcoatRoughnessMap:_e,dispersion:Z,iridescence:Y,iridescenceMap:Le,iridescenceThicknessMap:De,sheen:ye,sheenColorMap:ve,sheenRoughnessMap:We,specularMap:Ie,specularColorMap:nt,specularIntensityMap:L,transmission:ae,transmissionMap:ue,thicknessMap:G,gradientMap:K,opaque:_.transparent===!1&&_.blending===si&&_.alphaToCoverage===!1,alphaMap:oe,alphaTest:de,alphaHash:qe,combine:_.combine,mapUv:Ze&&p(_.map.channel),aoMapUv:ne&&p(_.aoMap.channel),lightMapUv:se&&p(_.lightMap.channel),bumpMapUv:Q&&p(_.bumpMap.channel),normalMapUv:ie&&p(_.normalMap.channel),displacementMapUv:Ve&&p(_.displacementMap.channel),emissiveMapUv:Ce&&p(_.emissiveMap.channel),metalnessMapUv:C&&p(_.metalnessMap.channel),roughnessMapUv:S&&p(_.roughnessMap.channel),anisotropyMapUv:me&&p(_.anisotropyMap.channel),clearcoatMapUv:$e&&p(_.clearcoatMap.channel),clearcoatNormalMapUv:ee&&p(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_e&&p(_.clearcoatRoughnessMap.channel),iridescenceMapUv:Le&&p(_.iridescenceMap.channel),iridescenceThicknessMapUv:De&&p(_.iridescenceThicknessMap.channel),sheenColorMapUv:ve&&p(_.sheenColorMap.channel),sheenRoughnessMapUv:We&&p(_.sheenRoughnessMap.channel),specularMapUv:Ie&&p(_.specularMap.channel),specularColorMapUv:nt&&p(_.specularColorMap.channel),specularIntensityMapUv:L&&p(_.specularIntensityMap.channel),transmissionMapUv:ue&&p(_.transmissionMap.channel),thicknessMapUv:G&&p(_.thicknessMap.channel),alphaMapUv:oe&&p(_.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(ie||N),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!z.attributes.uv&&(Ze||oe),fog:!!q,useFog:_.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:_.flatShading===!0,sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:u,skinning:V.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:Ge,morphTextureStride:Xe,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&F.length>0,shadowMapType:n.shadowMap.type,toneMapping:Rt,decodeVideoTexture:Ze&&_.map.isVideoTexture===!0&&et.getTransfer(_.map.colorSpace)===rt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===nn,flipSided:_.side===Dt,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:ht&&_.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ht&&_.extensions.multiDraw===!0||ke)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Ke.vertexUv1s=c.has(1),Ke.vertexUv2s=c.has(2),Ke.vertexUv3s=c.has(3),c.clear(),Ke}function x(_){const y=[];if(_.shaderID?y.push(_.shaderID):(y.push(_.customVertexShaderID),y.push(_.customFragmentShaderID)),_.defines!==void 0)for(const F in _.defines)y.push(F),y.push(_.defines[F]);return _.isRawShaderMaterial===!1&&(M(y,_),E(y,_),y.push(n.outputColorSpace)),y.push(_.customProgramCacheKey),y.join()}function M(_,y){_.push(y.precision),_.push(y.outputColorSpace),_.push(y.envMapMode),_.push(y.envMapCubeUVHeight),_.push(y.mapUv),_.push(y.alphaMapUv),_.push(y.lightMapUv),_.push(y.aoMapUv),_.push(y.bumpMapUv),_.push(y.normalMapUv),_.push(y.displacementMapUv),_.push(y.emissiveMapUv),_.push(y.metalnessMapUv),_.push(y.roughnessMapUv),_.push(y.anisotropyMapUv),_.push(y.clearcoatMapUv),_.push(y.clearcoatNormalMapUv),_.push(y.clearcoatRoughnessMapUv),_.push(y.iridescenceMapUv),_.push(y.iridescenceThicknessMapUv),_.push(y.sheenColorMapUv),_.push(y.sheenRoughnessMapUv),_.push(y.specularMapUv),_.push(y.specularColorMapUv),_.push(y.specularIntensityMapUv),_.push(y.transmissionMapUv),_.push(y.thicknessMapUv),_.push(y.combine),_.push(y.fogExp2),_.push(y.sizeAttenuation),_.push(y.morphTargetsCount),_.push(y.morphAttributeCount),_.push(y.numDirLights),_.push(y.numPointLights),_.push(y.numSpotLights),_.push(y.numSpotLightMaps),_.push(y.numHemiLights),_.push(y.numRectAreaLights),_.push(y.numDirLightShadows),_.push(y.numPointLightShadows),_.push(y.numSpotLightShadows),_.push(y.numSpotLightShadowsWithMaps),_.push(y.numLightProbes),_.push(y.shadowMapType),_.push(y.toneMapping),_.push(y.numClippingPlanes),_.push(y.numClipIntersection),_.push(y.depthPacking)}function E(_,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),_.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reverseDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.alphaToCoverage&&o.enable(20),_.push(o.mask)}function R(_){const y=v[_.type];let F;if(y){const k=tn[y];F=hu.clone(k.uniforms)}else F=_.uniforms;return F}function w(_,y){let F;for(let k=0,V=h.length;k<V;k++){const q=h[k];if(q.cacheKey===y){F=q,++F.usedTimes;break}}return F===void 0&&(F=new Em(n,y,_,s),h.push(F)),F}function A(_){if(--_.usedTimes===0){const y=h.indexOf(_);h[y]=h[h.length-1],h.pop(),_.destroy()}}function P(_){l.remove(_)}function W(){l.dispose()}return{getParameters:f,getProgramCacheKey:x,getUniforms:R,acquireProgram:w,releaseProgram:A,releaseShaderCache:P,programs:h,dispose:W}}function Rm(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function Pm(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function ml(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function gl(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(d,u,m,g,v,p){let f=n[e];return f===void 0?(f={id:d.id,object:d,geometry:u,material:m,groupOrder:g,renderOrder:d.renderOrder,z:v,group:p},n[e]=f):(f.id=d.id,f.object=d,f.geometry=u,f.material=m,f.groupOrder=g,f.renderOrder=d.renderOrder,f.z=v,f.group=p),e++,f}function o(d,u,m,g,v,p){const f=a(d,u,m,g,v,p);m.transmission>0?i.push(f):m.transparent===!0?r.push(f):t.push(f)}function l(d,u,m,g,v,p){const f=a(d,u,m,g,v,p);m.transmission>0?i.unshift(f):m.transparent===!0?r.unshift(f):t.unshift(f)}function c(d,u){t.length>1&&t.sort(d||Pm),i.length>1&&i.sort(u||ml),r.length>1&&r.sort(u||ml)}function h(){for(let d=e,u=n.length;d<u;d++){const m=n[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:o,unshift:l,finish:h,sort:c}}function Lm(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new gl,n.set(i,[a])):r>=s.length?(a=new gl,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function Dm(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new Ue};break;case"SpotLight":t={position:new U,direction:new U,color:new Ue,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new Ue,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new Ue,groundColor:new Ue};break;case"RectAreaLight":t={color:new Ue,position:new U,halfWidth:new U,halfHeight:new U};break}return n[e.id]=t,t}}}function Im(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Um=0;function Nm(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Fm(n){const e=new Dm,t=Im(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new U);const r=new U,s=new st,a=new st;function o(c){let h=0,d=0,u=0;for(let W=0;W<9;W++)i.probe[W].set(0,0,0);let m=0,g=0,v=0,p=0,f=0,x=0,M=0,E=0,R=0,w=0,A=0;c.sort(Nm);for(let W=0,_=c.length;W<_;W++){const y=c[W],F=y.color,k=y.intensity,V=y.distance,q=y.shadow&&y.shadow.map?y.shadow.map.texture:null;if(y.isAmbientLight)h+=F.r*k,d+=F.g*k,u+=F.b*k;else if(y.isLightProbe){for(let z=0;z<9;z++)i.probe[z].addScaledVector(y.sh.coefficients[z],k);A++}else if(y.isDirectionalLight){const z=e.get(y);if(z.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){const j=y.shadow,H=t.get(y);H.shadowIntensity=j.intensity,H.shadowBias=j.bias,H.shadowNormalBias=j.normalBias,H.shadowRadius=j.radius,H.shadowMapSize=j.mapSize,i.directionalShadow[m]=H,i.directionalShadowMap[m]=q,i.directionalShadowMatrix[m]=y.shadow.matrix,x++}i.directional[m]=z,m++}else if(y.isSpotLight){const z=e.get(y);z.position.setFromMatrixPosition(y.matrixWorld),z.color.copy(F).multiplyScalar(k),z.distance=V,z.coneCos=Math.cos(y.angle),z.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),z.decay=y.decay,i.spot[v]=z;const j=y.shadow;if(y.map&&(i.spotLightMap[R]=y.map,R++,j.updateMatrices(y),y.castShadow&&w++),i.spotLightMatrix[v]=j.matrix,y.castShadow){const H=t.get(y);H.shadowIntensity=j.intensity,H.shadowBias=j.bias,H.shadowNormalBias=j.normalBias,H.shadowRadius=j.radius,H.shadowMapSize=j.mapSize,i.spotShadow[v]=H,i.spotShadowMap[v]=q,E++}v++}else if(y.isRectAreaLight){const z=e.get(y);z.color.copy(F).multiplyScalar(k),z.halfWidth.set(y.width*.5,0,0),z.halfHeight.set(0,y.height*.5,0),i.rectArea[p]=z,p++}else if(y.isPointLight){const z=e.get(y);if(z.color.copy(y.color).multiplyScalar(y.intensity),z.distance=y.distance,z.decay=y.decay,y.castShadow){const j=y.shadow,H=t.get(y);H.shadowIntensity=j.intensity,H.shadowBias=j.bias,H.shadowNormalBias=j.normalBias,H.shadowRadius=j.radius,H.shadowMapSize=j.mapSize,H.shadowCameraNear=j.camera.near,H.shadowCameraFar=j.camera.far,i.pointShadow[g]=H,i.pointShadowMap[g]=q,i.pointShadowMatrix[g]=y.shadow.matrix,M++}i.point[g]=z,g++}else if(y.isHemisphereLight){const z=e.get(y);z.skyColor.copy(y.color).multiplyScalar(k),z.groundColor.copy(y.groundColor).multiplyScalar(k),i.hemi[f]=z,f++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=re.LTC_FLOAT_1,i.rectAreaLTC2=re.LTC_FLOAT_2):(i.rectAreaLTC1=re.LTC_HALF_1,i.rectAreaLTC2=re.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=u;const P=i.hash;(P.directionalLength!==m||P.pointLength!==g||P.spotLength!==v||P.rectAreaLength!==p||P.hemiLength!==f||P.numDirectionalShadows!==x||P.numPointShadows!==M||P.numSpotShadows!==E||P.numSpotMaps!==R||P.numLightProbes!==A)&&(i.directional.length=m,i.spot.length=v,i.rectArea.length=p,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=E+R-w,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=A,P.directionalLength=m,P.pointLength=g,P.spotLength=v,P.rectAreaLength=p,P.hemiLength=f,P.numDirectionalShadows=x,P.numPointShadows=M,P.numSpotShadows=E,P.numSpotMaps=R,P.numLightProbes=A,i.version=Um++)}function l(c,h){let d=0,u=0,m=0,g=0,v=0;const p=h.matrixWorldInverse;for(let f=0,x=c.length;f<x;f++){const M=c[f];if(M.isDirectionalLight){const E=i.directional[d];E.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(p),d++}else if(M.isSpotLight){const E=i.spot[m];E.position.setFromMatrixPosition(M.matrixWorld),E.position.applyMatrix4(p),E.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(p),m++}else if(M.isRectAreaLight){const E=i.rectArea[g];E.position.setFromMatrixPosition(M.matrixWorld),E.position.applyMatrix4(p),a.identity(),s.copy(M.matrixWorld),s.premultiply(p),a.extractRotation(s),E.halfWidth.set(M.width*.5,0,0),E.halfHeight.set(0,M.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),g++}else if(M.isPointLight){const E=i.point[u];E.position.setFromMatrixPosition(M.matrixWorld),E.position.applyMatrix4(p),u++}else if(M.isHemisphereLight){const E=i.hemi[v];E.direction.setFromMatrixPosition(M.matrixWorld),E.direction.transformDirection(p),v++}}}return{setup:o,setupView:l,state:i}}function _l(n){const e=new Fm(n),t=[],i=[];function r(h){c.camera=h,t.length=0,i.length=0}function s(h){t.push(h)}function a(h){i.push(h)}function o(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function Om(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new _l(n),e.set(r,[o])):s>=a.length?(o=new _l(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}class Bm extends ci{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=_h,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class km extends ci{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const zm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Hm=`uniform sampler2D shadow_pass;
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
}`;function Gm(n,e,t){let i=new ao;const r=new ze,s=new ze,a=new lt,o=new Bm({depthPacking:vh}),l=new km,c={},h=t.maxTextureSize,d={[kn]:Dt,[Dt]:kn,[nn]:nn},u=new Hn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ze},radius:{value:4}},vertexShader:zm,fragmentShader:Hm}),m=u.clone();m.defines.HORIZONTAL_PASS=1;const g=new bt;g.setAttribute("position",new Bt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Ye(g,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Bl;let f=this.type;this.render=function(w,A,P){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||w.length===0)return;const W=n.getRenderTarget(),_=n.getActiveCubeFace(),y=n.getActiveMipmapLevel(),F=n.state;F.setBlending(Un),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const k=f!==fn&&this.type===fn,V=f===fn&&this.type!==fn;for(let q=0,z=w.length;q<z;q++){const j=w[q],H=j.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);const ce=H.getFrameExtents();if(r.multiply(ce),s.copy(H.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/ce.x),r.x=s.x*ce.x,H.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/ce.y),r.y=s.y*ce.y,H.mapSize.y=s.y)),H.map===null||k===!0||V===!0){const Me=this.type!==fn?{minFilter:Vt,magFilter:Vt}:{};H.map!==null&&H.map.dispose(),H.map=new li(r.x,r.y,Me),H.map.texture.name=j.name+".shadowMap",H.camera.updateProjectionMatrix()}n.setRenderTarget(H.map),n.clear();const he=H.getViewportCount();for(let Me=0;Me<he;Me++){const Ge=H.getViewport(Me);a.set(s.x*Ge.x,s.y*Ge.y,s.x*Ge.z,s.y*Ge.w),F.viewport(a),H.updateMatrices(j,Me),i=H.getFrustum(),E(A,P,H.camera,j,this.type)}H.isPointLightShadow!==!0&&this.type===fn&&x(H,P),H.needsUpdate=!1}f=this.type,p.needsUpdate=!1,n.setRenderTarget(W,_,y)};function x(w,A){const P=e.update(v);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,m.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,m.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new li(r.x,r.y)),u.uniforms.shadow_pass.value=w.map.texture,u.uniforms.resolution.value=w.mapSize,u.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(A,null,P,u,v,null),m.uniforms.shadow_pass.value=w.mapPass.texture,m.uniforms.resolution.value=w.mapSize,m.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(A,null,P,m,v,null)}function M(w,A,P,W){let _=null;const y=P.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(y!==void 0)_=y;else if(_=P.isPointLight===!0?l:o,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const F=_.uuid,k=A.uuid;let V=c[F];V===void 0&&(V={},c[F]=V);let q=V[k];q===void 0&&(q=_.clone(),V[k]=q,A.addEventListener("dispose",R)),_=q}if(_.visible=A.visible,_.wireframe=A.wireframe,W===fn?_.side=A.shadowSide!==null?A.shadowSide:A.side:_.side=A.shadowSide!==null?A.shadowSide:d[A.side],_.alphaMap=A.alphaMap,_.alphaTest=A.alphaTest,_.map=A.map,_.clipShadows=A.clipShadows,_.clippingPlanes=A.clippingPlanes,_.clipIntersection=A.clipIntersection,_.displacementMap=A.displacementMap,_.displacementScale=A.displacementScale,_.displacementBias=A.displacementBias,_.wireframeLinewidth=A.wireframeLinewidth,_.linewidth=A.linewidth,P.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const F=n.properties.get(_);F.light=P}return _}function E(w,A,P,W,_){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&_===fn)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,w.matrixWorld);const k=e.update(w),V=w.material;if(Array.isArray(V)){const q=k.groups;for(let z=0,j=q.length;z<j;z++){const H=q[z],ce=V[H.materialIndex];if(ce&&ce.visible){const he=M(w,ce,W,_);w.onBeforeShadow(n,w,A,P,k,he,H),n.renderBufferDirect(P,null,k,he,w,H),w.onAfterShadow(n,w,A,P,k,he,H)}}}else if(V.visible){const q=M(w,V,W,_);w.onBeforeShadow(n,w,A,P,k,q,null),n.renderBufferDirect(P,null,k,q,w,null),w.onAfterShadow(n,w,A,P,k,q,null)}}const F=w.children;for(let k=0,V=F.length;k<V;k++)E(F[k],A,P,W,_)}function R(w){w.target.removeEventListener("dispose",R);for(const P in c){const W=c[P],_=w.target.uuid;_ in W&&(W[_].dispose(),delete W[_])}}}const Vm={[oa]:la,[ca]:da,[ha]:fa,[Di]:ua,[la]:oa,[da]:ca,[fa]:ha,[ua]:Di};function Wm(n){function e(){let L=!1;const ue=new lt;let G=null;const K=new lt(0,0,0,0);return{setMask:function(oe){G!==oe&&!L&&(n.colorMask(oe,oe,oe,oe),G=oe)},setLocked:function(oe){L=oe},setClear:function(oe,de,qe,ht,Rt){Rt===!0&&(oe*=ht,de*=ht,qe*=ht),ue.set(oe,de,qe,ht),K.equals(ue)===!1&&(n.clearColor(oe,de,qe,ht),K.copy(ue))},reset:function(){L=!1,G=null,K.set(-1,0,0,0)}}}function t(){let L=!1,ue=!1,G=null,K=null,oe=null;return{setReversed:function(de){ue=de},setTest:function(de){de?ge(n.DEPTH_TEST):fe(n.DEPTH_TEST)},setMask:function(de){G!==de&&!L&&(n.depthMask(de),G=de)},setFunc:function(de){if(ue&&(de=Vm[de]),K!==de){switch(de){case oa:n.depthFunc(n.NEVER);break;case la:n.depthFunc(n.ALWAYS);break;case ca:n.depthFunc(n.LESS);break;case Di:n.depthFunc(n.LEQUAL);break;case ha:n.depthFunc(n.EQUAL);break;case ua:n.depthFunc(n.GEQUAL);break;case da:n.depthFunc(n.GREATER);break;case fa:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}K=de}},setLocked:function(de){L=de},setClear:function(de){oe!==de&&(n.clearDepth(de),oe=de)},reset:function(){L=!1,G=null,K=null,oe=null}}}function i(){let L=!1,ue=null,G=null,K=null,oe=null,de=null,qe=null,ht=null,Rt=null;return{setTest:function(Ke){L||(Ke?ge(n.STENCIL_TEST):fe(n.STENCIL_TEST))},setMask:function(Ke){ue!==Ke&&!L&&(n.stencilMask(Ke),ue=Ke)},setFunc:function(Ke,Pt,an){(G!==Ke||K!==Pt||oe!==an)&&(n.stencilFunc(Ke,Pt,an),G=Ke,K=Pt,oe=an)},setOp:function(Ke,Pt,an){(de!==Ke||qe!==Pt||ht!==an)&&(n.stencilOp(Ke,Pt,an),de=Ke,qe=Pt,ht=an)},setLocked:function(Ke){L=Ke},setClear:function(Ke){Rt!==Ke&&(n.clearStencil(Ke),Rt=Ke)},reset:function(){L=!1,ue=null,G=null,K=null,oe=null,de=null,qe=null,ht=null,Rt=null}}}const r=new e,s=new t,a=new i,o=new WeakMap,l=new WeakMap;let c={},h={},d=new WeakMap,u=[],m=null,g=!1,v=null,p=null,f=null,x=null,M=null,E=null,R=null,w=new Ue(0,0,0),A=0,P=!1,W=null,_=null,y=null,F=null,k=null;const V=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,z=0;const j=n.getParameter(n.VERSION);j.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(j)[1]),q=z>=1):j.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),q=z>=2);let H=null,ce={};const he=n.getParameter(n.SCISSOR_BOX),Me=n.getParameter(n.VIEWPORT),Ge=new lt().fromArray(he),Xe=new lt().fromArray(Me);function X(L,ue,G,K){const oe=new Uint8Array(4),de=n.createTexture();n.bindTexture(L,de),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let qe=0;qe<G;qe++)L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY?n.texImage3D(ue,0,n.RGBA,1,1,K,0,n.RGBA,n.UNSIGNED_BYTE,oe):n.texImage2D(ue+qe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,oe);return de}const J={};J[n.TEXTURE_2D]=X(n.TEXTURE_2D,n.TEXTURE_2D,1),J[n.TEXTURE_CUBE_MAP]=X(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[n.TEXTURE_2D_ARRAY]=X(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),J[n.TEXTURE_3D]=X(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),a.setClear(0),ge(n.DEPTH_TEST),s.setFunc(Di),se(!1),Q(To),ge(n.CULL_FACE),T(Un);function ge(L){c[L]!==!0&&(n.enable(L),c[L]=!0)}function fe(L){c[L]!==!1&&(n.disable(L),c[L]=!1)}function we(L,ue){return h[L]!==ue?(n.bindFramebuffer(L,ue),h[L]=ue,L===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=ue),L===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=ue),!0):!1}function Ae(L,ue){let G=u,K=!1;if(L){G=d.get(ue),G===void 0&&(G=[],d.set(ue,G));const oe=L.textures;if(G.length!==oe.length||G[0]!==n.COLOR_ATTACHMENT0){for(let de=0,qe=oe.length;de<qe;de++)G[de]=n.COLOR_ATTACHMENT0+de;G.length=oe.length,K=!0}}else G[0]!==n.BACK&&(G[0]=n.BACK,K=!0);K&&n.drawBuffers(G)}function ke(L){return m!==L?(n.useProgram(L),m=L,!0):!1}const Ze={[ei]:n.FUNC_ADD,[Xc]:n.FUNC_SUBTRACT,[qc]:n.FUNC_REVERSE_SUBTRACT};Ze[Yc]=n.MIN,Ze[$c]=n.MAX;const He={[Kc]:n.ZERO,[jc]:n.ONE,[Zc]:n.SRC_COLOR,[sa]:n.SRC_ALPHA,[ih]:n.SRC_ALPHA_SATURATE,[th]:n.DST_COLOR,[Qc]:n.DST_ALPHA,[Jc]:n.ONE_MINUS_SRC_COLOR,[aa]:n.ONE_MINUS_SRC_ALPHA,[nh]:n.ONE_MINUS_DST_COLOR,[eh]:n.ONE_MINUS_DST_ALPHA,[rh]:n.CONSTANT_COLOR,[sh]:n.ONE_MINUS_CONSTANT_COLOR,[ah]:n.CONSTANT_ALPHA,[oh]:n.ONE_MINUS_CONSTANT_ALPHA};function T(L,ue,G,K,oe,de,qe,ht,Rt,Ke){if(L===Un){g===!0&&(fe(n.BLEND),g=!1);return}if(g===!1&&(ge(n.BLEND),g=!0),L!==Wc){if(L!==v||Ke!==P){if((p!==ei||M!==ei)&&(n.blendEquation(n.FUNC_ADD),p=ei,M=ei),Ke)switch(L){case si:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case is:n.blendFunc(n.ONE,n.ONE);break;case Ao:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case wo:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case si:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case is:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Ao:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case wo:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}f=null,x=null,E=null,R=null,w.set(0,0,0),A=0,v=L,P=Ke}return}oe=oe||ue,de=de||G,qe=qe||K,(ue!==p||oe!==M)&&(n.blendEquationSeparate(Ze[ue],Ze[oe]),p=ue,M=oe),(G!==f||K!==x||de!==E||qe!==R)&&(n.blendFuncSeparate(He[G],He[K],He[de],He[qe]),f=G,x=K,E=de,R=qe),(ht.equals(w)===!1||Rt!==A)&&(n.blendColor(ht.r,ht.g,ht.b,Rt),w.copy(ht),A=Rt),v=L,P=!1}function ne(L,ue){L.side===nn?fe(n.CULL_FACE):ge(n.CULL_FACE);let G=L.side===Dt;ue&&(G=!G),se(G),L.blending===si&&L.transparent===!1?T(Un):T(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),s.setFunc(L.depthFunc),s.setTest(L.depthTest),s.setMask(L.depthWrite),r.setMask(L.colorWrite);const K=L.stencilWrite;a.setTest(K),K&&(a.setMask(L.stencilWriteMask),a.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),a.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Ve(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ge(n.SAMPLE_ALPHA_TO_COVERAGE):fe(n.SAMPLE_ALPHA_TO_COVERAGE)}function se(L){W!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),W=L)}function Q(L){L!==Gc?(ge(n.CULL_FACE),L!==_&&(L===To?n.cullFace(n.BACK):L===Vc?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):fe(n.CULL_FACE),_=L}function ie(L){L!==y&&(q&&n.lineWidth(L),y=L)}function Ve(L,ue,G){L?(ge(n.POLYGON_OFFSET_FILL),(F!==ue||k!==G)&&(n.polygonOffset(ue,G),F=ue,k=G)):fe(n.POLYGON_OFFSET_FILL)}function Ce(L){L?ge(n.SCISSOR_TEST):fe(n.SCISSOR_TEST)}function C(L){L===void 0&&(L=n.TEXTURE0+V-1),H!==L&&(n.activeTexture(L),H=L)}function S(L,ue,G){G===void 0&&(H===null?G=n.TEXTURE0+V-1:G=H);let K=ce[G];K===void 0&&(K={type:void 0,texture:void 0},ce[G]=K),(K.type!==L||K.texture!==ue)&&(H!==G&&(n.activeTexture(G),H=G),n.bindTexture(L,ue||J[L]),K.type=L,K.texture=ue)}function N(){const L=ce[H];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function $(){try{n.compressedTexImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Z(){try{n.compressedTexImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Y(){try{n.texSubImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ye(){try{n.texSubImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ae(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function me(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function $e(){try{n.texStorage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ee(){try{n.texStorage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function _e(){try{n.texImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Le(){try{n.texImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function De(L){Ge.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),Ge.copy(L))}function ve(L){Xe.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),Xe.copy(L))}function We(L,ue){let G=l.get(ue);G===void 0&&(G=new WeakMap,l.set(ue,G));let K=G.get(L);K===void 0&&(K=n.getUniformBlockIndex(ue,L.name),G.set(L,K))}function Ie(L,ue){const K=l.get(ue).get(L);o.get(ue)!==K&&(n.uniformBlockBinding(ue,K,L.__bindingPointIndex),o.set(ue,K))}function nt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),c={},H=null,ce={},h={},d=new WeakMap,u=[],m=null,g=!1,v=null,p=null,f=null,x=null,M=null,E=null,R=null,w=new Ue(0,0,0),A=0,P=!1,W=null,_=null,y=null,F=null,k=null,Ge.set(0,0,n.canvas.width,n.canvas.height),Xe.set(0,0,n.canvas.width,n.canvas.height),r.reset(),s.reset(),a.reset()}return{buffers:{color:r,depth:s,stencil:a},enable:ge,disable:fe,bindFramebuffer:we,drawBuffers:Ae,useProgram:ke,setBlending:T,setMaterial:ne,setFlipSided:se,setCullFace:Q,setLineWidth:ie,setPolygonOffset:Ve,setScissorTest:Ce,activeTexture:C,bindTexture:S,unbindTexture:N,compressedTexImage2D:$,compressedTexImage3D:Z,texImage2D:_e,texImage3D:Le,updateUBOMapping:We,uniformBlockBinding:Ie,texStorage2D:$e,texStorage3D:ee,texSubImage2D:Y,texSubImage3D:ye,compressedTexSubImage2D:ae,compressedTexSubImage3D:me,scissor:De,viewport:ve,reset:nt}}function vl(n,e,t,i){const r=Xm(i);switch(t){case ql:return n*e;case $l:return n*e;case Kl:return n*e*2;case jl:return n*e/r.components*r.byteLength;case eo:return n*e/r.components*r.byteLength;case Zl:return n*e*2/r.components*r.byteLength;case to:return n*e*2/r.components*r.byteLength;case Yl:return n*e*3/r.components*r.byteLength;case en:return n*e*4/r.components*r.byteLength;case no:return n*e*4/r.components*r.byteLength;case Kr:case jr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Zr:case Jr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case xa:case Sa:return Math.max(n,16)*Math.max(e,8)/4;case va:case Ma:return Math.max(n,8)*Math.max(e,8)/2;case ya:case ba:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ea:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ta:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Aa:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case wa:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Ca:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Ra:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Pa:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case La:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Da:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Ia:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Ua:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Na:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Fa:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Oa:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Ba:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Qr:case ka:case za:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Jl:case Ha:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Ga:case Va:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Xm(n){switch(n){case Mn:case Vl:return{byteLength:1,components:1};case sr:case Wl:case lr:return{byteLength:2,components:1};case Ja:case Qa:return{byteLength:2,components:4};case oi:case Za:case gn:return{byteLength:4,components:1};case Xl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function qm(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ze,h=new WeakMap;let d;const u=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,S){return m?new OffscreenCanvas(C,S):ls("canvas")}function v(C,S,N){let $=1;const Z=Ce(C);if((Z.width>N||Z.height>N)&&($=N/Math.max(Z.width,Z.height)),$<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const Y=Math.floor($*Z.width),ye=Math.floor($*Z.height);d===void 0&&(d=g(Y,ye));const ae=S?g(Y,ye):d;return ae.width=Y,ae.height=ye,ae.getContext("2d").drawImage(C,0,0,Y,ye),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+Y+"x"+ye+")."),ae}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),C;return C}function p(C){return C.generateMipmaps&&C.minFilter!==Vt&&C.minFilter!==Jt}function f(C){n.generateMipmap(C)}function x(C,S,N,$,Z=!1){if(C!==null){if(n[C]!==void 0)return n[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let Y=S;if(S===n.RED&&(N===n.FLOAT&&(Y=n.R32F),N===n.HALF_FLOAT&&(Y=n.R16F),N===n.UNSIGNED_BYTE&&(Y=n.R8)),S===n.RED_INTEGER&&(N===n.UNSIGNED_BYTE&&(Y=n.R8UI),N===n.UNSIGNED_SHORT&&(Y=n.R16UI),N===n.UNSIGNED_INT&&(Y=n.R32UI),N===n.BYTE&&(Y=n.R8I),N===n.SHORT&&(Y=n.R16I),N===n.INT&&(Y=n.R32I)),S===n.RG&&(N===n.FLOAT&&(Y=n.RG32F),N===n.HALF_FLOAT&&(Y=n.RG16F),N===n.UNSIGNED_BYTE&&(Y=n.RG8)),S===n.RG_INTEGER&&(N===n.UNSIGNED_BYTE&&(Y=n.RG8UI),N===n.UNSIGNED_SHORT&&(Y=n.RG16UI),N===n.UNSIGNED_INT&&(Y=n.RG32UI),N===n.BYTE&&(Y=n.RG8I),N===n.SHORT&&(Y=n.RG16I),N===n.INT&&(Y=n.RG32I)),S===n.RGB_INTEGER&&(N===n.UNSIGNED_BYTE&&(Y=n.RGB8UI),N===n.UNSIGNED_SHORT&&(Y=n.RGB16UI),N===n.UNSIGNED_INT&&(Y=n.RGB32UI),N===n.BYTE&&(Y=n.RGB8I),N===n.SHORT&&(Y=n.RGB16I),N===n.INT&&(Y=n.RGB32I)),S===n.RGBA_INTEGER&&(N===n.UNSIGNED_BYTE&&(Y=n.RGBA8UI),N===n.UNSIGNED_SHORT&&(Y=n.RGBA16UI),N===n.UNSIGNED_INT&&(Y=n.RGBA32UI),N===n.BYTE&&(Y=n.RGBA8I),N===n.SHORT&&(Y=n.RGBA16I),N===n.INT&&(Y=n.RGBA32I)),S===n.RGB&&N===n.UNSIGNED_INT_5_9_9_9_REV&&(Y=n.RGB9_E5),S===n.RGBA){const ye=Z?rs:et.getTransfer($);N===n.FLOAT&&(Y=n.RGBA32F),N===n.HALF_FLOAT&&(Y=n.RGBA16F),N===n.UNSIGNED_BYTE&&(Y=ye===rt?n.SRGB8_ALPHA8:n.RGBA8),N===n.UNSIGNED_SHORT_4_4_4_4&&(Y=n.RGBA4),N===n.UNSIGNED_SHORT_5_5_5_1&&(Y=n.RGB5_A1)}return(Y===n.R16F||Y===n.R32F||Y===n.RG16F||Y===n.RG32F||Y===n.RGBA16F||Y===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function M(C,S){let N;return C?S===null||S===oi||S===Ni?N=n.DEPTH24_STENCIL8:S===gn?N=n.DEPTH32F_STENCIL8:S===sr&&(N=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===oi||S===Ni?N=n.DEPTH_COMPONENT24:S===gn?N=n.DEPTH_COMPONENT32F:S===sr&&(N=n.DEPTH_COMPONENT16),N}function E(C,S){return p(C)===!0||C.isFramebufferTexture&&C.minFilter!==Vt&&C.minFilter!==Jt?Math.log2(Math.max(S.width,S.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?S.mipmaps.length:1}function R(C){const S=C.target;S.removeEventListener("dispose",R),A(S),S.isVideoTexture&&h.delete(S)}function w(C){const S=C.target;S.removeEventListener("dispose",w),W(S)}function A(C){const S=i.get(C);if(S.__webglInit===void 0)return;const N=C.source,$=u.get(N);if($){const Z=$[S.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&P(C),Object.keys($).length===0&&u.delete(N)}i.remove(C)}function P(C){const S=i.get(C);n.deleteTexture(S.__webglTexture);const N=C.source,$=u.get(N);delete $[S.__cacheKey],a.memory.textures--}function W(C){const S=i.get(C);if(C.depthTexture&&C.depthTexture.dispose(),C.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(S.__webglFramebuffer[$]))for(let Z=0;Z<S.__webglFramebuffer[$].length;Z++)n.deleteFramebuffer(S.__webglFramebuffer[$][Z]);else n.deleteFramebuffer(S.__webglFramebuffer[$]);S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer[$])}else{if(Array.isArray(S.__webglFramebuffer))for(let $=0;$<S.__webglFramebuffer.length;$++)n.deleteFramebuffer(S.__webglFramebuffer[$]);else n.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&n.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let $=0;$<S.__webglColorRenderbuffer.length;$++)S.__webglColorRenderbuffer[$]&&n.deleteRenderbuffer(S.__webglColorRenderbuffer[$]);S.__webglDepthRenderbuffer&&n.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const N=C.textures;for(let $=0,Z=N.length;$<Z;$++){const Y=i.get(N[$]);Y.__webglTexture&&(n.deleteTexture(Y.__webglTexture),a.memory.textures--),i.remove(N[$])}i.remove(C)}let _=0;function y(){_=0}function F(){const C=_;return C>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+r.maxTextures),_+=1,C}function k(C){const S=[];return S.push(C.wrapS),S.push(C.wrapT),S.push(C.wrapR||0),S.push(C.magFilter),S.push(C.minFilter),S.push(C.anisotropy),S.push(C.internalFormat),S.push(C.format),S.push(C.type),S.push(C.generateMipmaps),S.push(C.premultiplyAlpha),S.push(C.flipY),S.push(C.unpackAlignment),S.push(C.colorSpace),S.join()}function V(C,S){const N=i.get(C);if(C.isVideoTexture&&ie(C),C.isRenderTargetTexture===!1&&C.version>0&&N.__version!==C.version){const $=C.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Xe(N,C,S);return}}t.bindTexture(n.TEXTURE_2D,N.__webglTexture,n.TEXTURE0+S)}function q(C,S){const N=i.get(C);if(C.version>0&&N.__version!==C.version){Xe(N,C,S);return}t.bindTexture(n.TEXTURE_2D_ARRAY,N.__webglTexture,n.TEXTURE0+S)}function z(C,S){const N=i.get(C);if(C.version>0&&N.__version!==C.version){Xe(N,C,S);return}t.bindTexture(n.TEXTURE_3D,N.__webglTexture,n.TEXTURE0+S)}function j(C,S){const N=i.get(C);if(C.version>0&&N.__version!==C.version){X(N,C,S);return}t.bindTexture(n.TEXTURE_CUBE_MAP,N.__webglTexture,n.TEXTURE0+S)}const H={[ga]:n.REPEAT,[ii]:n.CLAMP_TO_EDGE,[_a]:n.MIRRORED_REPEAT},ce={[Vt]:n.NEAREST,[gh]:n.NEAREST_MIPMAP_NEAREST,[mr]:n.NEAREST_MIPMAP_LINEAR,[Jt]:n.LINEAR,[bs]:n.LINEAR_MIPMAP_NEAREST,[ri]:n.LINEAR_MIPMAP_LINEAR},he={[Mh]:n.NEVER,[Ah]:n.ALWAYS,[Sh]:n.LESS,[ec]:n.LEQUAL,[yh]:n.EQUAL,[Th]:n.GEQUAL,[bh]:n.GREATER,[Eh]:n.NOTEQUAL};function Me(C,S){if(S.type===gn&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===Jt||S.magFilter===bs||S.magFilter===mr||S.magFilter===ri||S.minFilter===Jt||S.minFilter===bs||S.minFilter===mr||S.minFilter===ri)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(C,n.TEXTURE_WRAP_S,H[S.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,H[S.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,H[S.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,ce[S.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,ce[S.minFilter]),S.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,he[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Vt||S.minFilter!==mr&&S.minFilter!==ri||S.type===gn&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){const N=e.get("EXT_texture_filter_anisotropic");n.texParameterf(C,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function Ge(C,S){let N=!1;C.__webglInit===void 0&&(C.__webglInit=!0,S.addEventListener("dispose",R));const $=S.source;let Z=u.get($);Z===void 0&&(Z={},u.set($,Z));const Y=k(S);if(Y!==C.__cacheKey){Z[Y]===void 0&&(Z[Y]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,N=!0),Z[Y].usedTimes++;const ye=Z[C.__cacheKey];ye!==void 0&&(Z[C.__cacheKey].usedTimes--,ye.usedTimes===0&&P(S)),C.__cacheKey=Y,C.__webglTexture=Z[Y].texture}return N}function Xe(C,S,N){let $=n.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&($=n.TEXTURE_2D_ARRAY),S.isData3DTexture&&($=n.TEXTURE_3D);const Z=Ge(C,S),Y=S.source;t.bindTexture($,C.__webglTexture,n.TEXTURE0+N);const ye=i.get(Y);if(Y.version!==ye.__version||Z===!0){t.activeTexture(n.TEXTURE0+N);const ae=et.getPrimaries(et.workingColorSpace),me=S.colorSpace===Ln?null:et.getPrimaries(S.colorSpace),$e=S.colorSpace===Ln||ae===me?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,$e);let ee=v(S.image,!1,r.maxTextureSize);ee=Ve(S,ee);const _e=s.convert(S.format,S.colorSpace),Le=s.convert(S.type);let De=x(S.internalFormat,_e,Le,S.colorSpace,S.isVideoTexture);Me($,S);let ve;const We=S.mipmaps,Ie=S.isVideoTexture!==!0,nt=ye.__version===void 0||Z===!0,L=Y.dataReady,ue=E(S,ee);if(S.isDepthTexture)De=M(S.format===Fi,S.type),nt&&(Ie?t.texStorage2D(n.TEXTURE_2D,1,De,ee.width,ee.height):t.texImage2D(n.TEXTURE_2D,0,De,ee.width,ee.height,0,_e,Le,null));else if(S.isDataTexture)if(We.length>0){Ie&&nt&&t.texStorage2D(n.TEXTURE_2D,ue,De,We[0].width,We[0].height);for(let G=0,K=We.length;G<K;G++)ve=We[G],Ie?L&&t.texSubImage2D(n.TEXTURE_2D,G,0,0,ve.width,ve.height,_e,Le,ve.data):t.texImage2D(n.TEXTURE_2D,G,De,ve.width,ve.height,0,_e,Le,ve.data);S.generateMipmaps=!1}else Ie?(nt&&t.texStorage2D(n.TEXTURE_2D,ue,De,ee.width,ee.height),L&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ee.width,ee.height,_e,Le,ee.data)):t.texImage2D(n.TEXTURE_2D,0,De,ee.width,ee.height,0,_e,Le,ee.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Ie&&nt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ue,De,We[0].width,We[0].height,ee.depth);for(let G=0,K=We.length;G<K;G++)if(ve=We[G],S.format!==en)if(_e!==null)if(Ie){if(L)if(S.layerUpdates.size>0){const oe=vl(ve.width,ve.height,S.format,S.type);for(const de of S.layerUpdates){const qe=ve.data.subarray(de*oe/ve.data.BYTES_PER_ELEMENT,(de+1)*oe/ve.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,G,0,0,de,ve.width,ve.height,1,_e,qe,0,0)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,G,0,0,0,ve.width,ve.height,ee.depth,_e,ve.data,0,0)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,G,De,ve.width,ve.height,ee.depth,0,ve.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ie?L&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,G,0,0,0,ve.width,ve.height,ee.depth,_e,Le,ve.data):t.texImage3D(n.TEXTURE_2D_ARRAY,G,De,ve.width,ve.height,ee.depth,0,_e,Le,ve.data)}else{Ie&&nt&&t.texStorage2D(n.TEXTURE_2D,ue,De,We[0].width,We[0].height);for(let G=0,K=We.length;G<K;G++)ve=We[G],S.format!==en?_e!==null?Ie?L&&t.compressedTexSubImage2D(n.TEXTURE_2D,G,0,0,ve.width,ve.height,_e,ve.data):t.compressedTexImage2D(n.TEXTURE_2D,G,De,ve.width,ve.height,0,ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ie?L&&t.texSubImage2D(n.TEXTURE_2D,G,0,0,ve.width,ve.height,_e,Le,ve.data):t.texImage2D(n.TEXTURE_2D,G,De,ve.width,ve.height,0,_e,Le,ve.data)}else if(S.isDataArrayTexture)if(Ie){if(nt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ue,De,ee.width,ee.height,ee.depth),L)if(S.layerUpdates.size>0){const G=vl(ee.width,ee.height,S.format,S.type);for(const K of S.layerUpdates){const oe=ee.data.subarray(K*G/ee.data.BYTES_PER_ELEMENT,(K+1)*G/ee.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,K,ee.width,ee.height,1,_e,Le,oe)}S.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,_e,Le,ee.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,De,ee.width,ee.height,ee.depth,0,_e,Le,ee.data);else if(S.isData3DTexture)Ie?(nt&&t.texStorage3D(n.TEXTURE_3D,ue,De,ee.width,ee.height,ee.depth),L&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,_e,Le,ee.data)):t.texImage3D(n.TEXTURE_3D,0,De,ee.width,ee.height,ee.depth,0,_e,Le,ee.data);else if(S.isFramebufferTexture){if(nt)if(Ie)t.texStorage2D(n.TEXTURE_2D,ue,De,ee.width,ee.height);else{let G=ee.width,K=ee.height;for(let oe=0;oe<ue;oe++)t.texImage2D(n.TEXTURE_2D,oe,De,G,K,0,_e,Le,null),G>>=1,K>>=1}}else if(We.length>0){if(Ie&&nt){const G=Ce(We[0]);t.texStorage2D(n.TEXTURE_2D,ue,De,G.width,G.height)}for(let G=0,K=We.length;G<K;G++)ve=We[G],Ie?L&&t.texSubImage2D(n.TEXTURE_2D,G,0,0,_e,Le,ve):t.texImage2D(n.TEXTURE_2D,G,De,_e,Le,ve);S.generateMipmaps=!1}else if(Ie){if(nt){const G=Ce(ee);t.texStorage2D(n.TEXTURE_2D,ue,De,G.width,G.height)}L&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,_e,Le,ee)}else t.texImage2D(n.TEXTURE_2D,0,De,_e,Le,ee);p(S)&&f($),ye.__version=Y.version,S.onUpdate&&S.onUpdate(S)}C.__version=S.version}function X(C,S,N){if(S.image.length!==6)return;const $=Ge(C,S),Z=S.source;t.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+N);const Y=i.get(Z);if(Z.version!==Y.__version||$===!0){t.activeTexture(n.TEXTURE0+N);const ye=et.getPrimaries(et.workingColorSpace),ae=S.colorSpace===Ln?null:et.getPrimaries(S.colorSpace),me=S.colorSpace===Ln||ye===ae?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);const $e=S.isCompressedTexture||S.image[0].isCompressedTexture,ee=S.image[0]&&S.image[0].isDataTexture,_e=[];for(let K=0;K<6;K++)!$e&&!ee?_e[K]=v(S.image[K],!0,r.maxCubemapSize):_e[K]=ee?S.image[K].image:S.image[K],_e[K]=Ve(S,_e[K]);const Le=_e[0],De=s.convert(S.format,S.colorSpace),ve=s.convert(S.type),We=x(S.internalFormat,De,ve,S.colorSpace),Ie=S.isVideoTexture!==!0,nt=Y.__version===void 0||$===!0,L=Z.dataReady;let ue=E(S,Le);Me(n.TEXTURE_CUBE_MAP,S);let G;if($e){Ie&&nt&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ue,We,Le.width,Le.height);for(let K=0;K<6;K++){G=_e[K].mipmaps;for(let oe=0;oe<G.length;oe++){const de=G[oe];S.format!==en?De!==null?Ie?L&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,oe,0,0,de.width,de.height,De,de.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,oe,We,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ie?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,oe,0,0,de.width,de.height,De,ve,de.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,oe,We,de.width,de.height,0,De,ve,de.data)}}}else{if(G=S.mipmaps,Ie&&nt){G.length>0&&ue++;const K=Ce(_e[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ue,We,K.width,K.height)}for(let K=0;K<6;K++)if(ee){Ie?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,_e[K].width,_e[K].height,De,ve,_e[K].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,We,_e[K].width,_e[K].height,0,De,ve,_e[K].data);for(let oe=0;oe<G.length;oe++){const qe=G[oe].image[K].image;Ie?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,oe+1,0,0,qe.width,qe.height,De,ve,qe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,oe+1,We,qe.width,qe.height,0,De,ve,qe.data)}}else{Ie?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,De,ve,_e[K]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,We,De,ve,_e[K]);for(let oe=0;oe<G.length;oe++){const de=G[oe];Ie?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,oe+1,0,0,De,ve,de.image[K]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,oe+1,We,De,ve,de.image[K])}}}p(S)&&f(n.TEXTURE_CUBE_MAP),Y.__version=Z.version,S.onUpdate&&S.onUpdate(S)}C.__version=S.version}function J(C,S,N,$,Z,Y){const ye=s.convert(N.format,N.colorSpace),ae=s.convert(N.type),me=x(N.internalFormat,ye,ae,N.colorSpace);if(!i.get(S).__hasExternalTextures){const ee=Math.max(1,S.width>>Y),_e=Math.max(1,S.height>>Y);Z===n.TEXTURE_3D||Z===n.TEXTURE_2D_ARRAY?t.texImage3D(Z,Y,me,ee,_e,S.depth,0,ye,ae,null):t.texImage2D(Z,Y,me,ee,_e,0,ye,ae,null)}t.bindFramebuffer(n.FRAMEBUFFER,C),Q(S)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,$,Z,i.get(N).__webglTexture,0,se(S)):(Z===n.TEXTURE_2D||Z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,$,Z,i.get(N).__webglTexture,Y),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ge(C,S,N){if(n.bindRenderbuffer(n.RENDERBUFFER,C),S.depthBuffer){const $=S.depthTexture,Z=$&&$.isDepthTexture?$.type:null,Y=M(S.stencilBuffer,Z),ye=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ae=se(S);Q(S)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ae,Y,S.width,S.height):N?n.renderbufferStorageMultisample(n.RENDERBUFFER,ae,Y,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,Y,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ye,n.RENDERBUFFER,C)}else{const $=S.textures;for(let Z=0;Z<$.length;Z++){const Y=$[Z],ye=s.convert(Y.format,Y.colorSpace),ae=s.convert(Y.type),me=x(Y.internalFormat,ye,ae,Y.colorSpace),$e=se(S);N&&Q(S)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,$e,me,S.width,S.height):Q(S)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,$e,me,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,me,S.width,S.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function fe(C,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,C),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),V(S.depthTexture,0);const $=i.get(S.depthTexture).__webglTexture,Z=se(S);if(S.depthTexture.format===Ri)Q(S)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,$,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,$,0);else if(S.depthTexture.format===Fi)Q(S)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,$,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,$,0);else throw new Error("Unknown depthTexture format")}function we(C){const S=i.get(C),N=C.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==C.depthTexture){const $=C.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),$){const Z=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,$.removeEventListener("dispose",Z)};$.addEventListener("dispose",Z),S.__depthDisposeCallback=Z}S.__boundDepthTexture=$}if(C.depthTexture&&!S.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");fe(S.__webglFramebuffer,C)}else if(N){S.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[$]),S.__webglDepthbuffer[$]===void 0)S.__webglDepthbuffer[$]=n.createRenderbuffer(),ge(S.__webglDepthbuffer[$],C,!1);else{const Z=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Y=S.__webglDepthbuffer[$];n.bindRenderbuffer(n.RENDERBUFFER,Y),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,Y)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=n.createRenderbuffer(),ge(S.__webglDepthbuffer,C,!1);else{const $=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Z=S.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,Z),n.framebufferRenderbuffer(n.FRAMEBUFFER,$,n.RENDERBUFFER,Z)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ae(C,S,N){const $=i.get(C);S!==void 0&&J($.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),N!==void 0&&we(C)}function ke(C){const S=C.texture,N=i.get(C),$=i.get(S);C.addEventListener("dispose",w);const Z=C.textures,Y=C.isWebGLCubeRenderTarget===!0,ye=Z.length>1;if(ye||($.__webglTexture===void 0&&($.__webglTexture=n.createTexture()),$.__version=S.version,a.memory.textures++),Y){N.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(S.mipmaps&&S.mipmaps.length>0){N.__webglFramebuffer[ae]=[];for(let me=0;me<S.mipmaps.length;me++)N.__webglFramebuffer[ae][me]=n.createFramebuffer()}else N.__webglFramebuffer[ae]=n.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){N.__webglFramebuffer=[];for(let ae=0;ae<S.mipmaps.length;ae++)N.__webglFramebuffer[ae]=n.createFramebuffer()}else N.__webglFramebuffer=n.createFramebuffer();if(ye)for(let ae=0,me=Z.length;ae<me;ae++){const $e=i.get(Z[ae]);$e.__webglTexture===void 0&&($e.__webglTexture=n.createTexture(),a.memory.textures++)}if(C.samples>0&&Q(C)===!1){N.__webglMultisampledFramebuffer=n.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let ae=0;ae<Z.length;ae++){const me=Z[ae];N.__webglColorRenderbuffer[ae]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,N.__webglColorRenderbuffer[ae]);const $e=s.convert(me.format,me.colorSpace),ee=s.convert(me.type),_e=x(me.internalFormat,$e,ee,me.colorSpace,C.isXRRenderTarget===!0),Le=se(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,Le,_e,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.RENDERBUFFER,N.__webglColorRenderbuffer[ae])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(N.__webglDepthRenderbuffer=n.createRenderbuffer(),ge(N.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Y){t.bindTexture(n.TEXTURE_CUBE_MAP,$.__webglTexture),Me(n.TEXTURE_CUBE_MAP,S);for(let ae=0;ae<6;ae++)if(S.mipmaps&&S.mipmaps.length>0)for(let me=0;me<S.mipmaps.length;me++)J(N.__webglFramebuffer[ae][me],C,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,me);else J(N.__webglFramebuffer[ae],C,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);p(S)&&f(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ye){for(let ae=0,me=Z.length;ae<me;ae++){const $e=Z[ae],ee=i.get($e);t.bindTexture(n.TEXTURE_2D,ee.__webglTexture),Me(n.TEXTURE_2D,$e),J(N.__webglFramebuffer,C,$e,n.COLOR_ATTACHMENT0+ae,n.TEXTURE_2D,0),p($e)&&f(n.TEXTURE_2D)}t.unbindTexture()}else{let ae=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ae=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ae,$.__webglTexture),Me(ae,S),S.mipmaps&&S.mipmaps.length>0)for(let me=0;me<S.mipmaps.length;me++)J(N.__webglFramebuffer[me],C,S,n.COLOR_ATTACHMENT0,ae,me);else J(N.__webglFramebuffer,C,S,n.COLOR_ATTACHMENT0,ae,0);p(S)&&f(ae),t.unbindTexture()}C.depthBuffer&&we(C)}function Ze(C){const S=C.textures;for(let N=0,$=S.length;N<$;N++){const Z=S[N];if(p(Z)){const Y=C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,ye=i.get(Z).__webglTexture;t.bindTexture(Y,ye),f(Y),t.unbindTexture()}}}const He=[],T=[];function ne(C){if(C.samples>0){if(Q(C)===!1){const S=C.textures,N=C.width,$=C.height;let Z=n.COLOR_BUFFER_BIT;const Y=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ye=i.get(C),ae=S.length>1;if(ae)for(let me=0;me<S.length;me++)t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+me,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+me,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ye.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ye.__webglFramebuffer);for(let me=0;me<S.length;me++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(Z|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(Z|=n.STENCIL_BUFFER_BIT)),ae){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ye.__webglColorRenderbuffer[me]);const $e=i.get(S[me]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,$e,0)}n.blitFramebuffer(0,0,N,$,0,0,N,$,Z,n.NEAREST),l===!0&&(He.length=0,T.length=0,He.push(n.COLOR_ATTACHMENT0+me),C.depthBuffer&&C.resolveDepthBuffer===!1&&(He.push(Y),T.push(Y),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,T)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,He))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ae)for(let me=0;me<S.length;me++){t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+me,n.RENDERBUFFER,ye.__webglColorRenderbuffer[me]);const $e=i.get(S[me]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+me,n.TEXTURE_2D,$e,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ye.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const S=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[S])}}}function se(C){return Math.min(r.maxSamples,C.samples)}function Q(C){const S=i.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function ie(C){const S=a.render.frame;h.get(C)!==S&&(h.set(C,S),C.update())}function Ve(C,S){const N=C.colorSpace,$=C.format,Z=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||N!==Vn&&N!==Ln&&(et.getTransfer(N)===rt?($!==en||Z!==Mn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),S}function Ce(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=F,this.resetTextureUnits=y,this.setTexture2D=V,this.setTexture2DArray=q,this.setTexture3D=z,this.setTextureCube=j,this.rebindTextures=Ae,this.setupRenderTarget=ke,this.updateRenderTargetMipmap=Ze,this.updateMultisampleRenderTarget=ne,this.setupDepthRenderbuffer=we,this.setupFrameBufferTexture=J,this.useMultisampledRTT=Q}function Ym(n,e){function t(i,r=Ln){let s;const a=et.getTransfer(r);if(i===Mn)return n.UNSIGNED_BYTE;if(i===Ja)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Qa)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Xl)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Vl)return n.BYTE;if(i===Wl)return n.SHORT;if(i===sr)return n.UNSIGNED_SHORT;if(i===Za)return n.INT;if(i===oi)return n.UNSIGNED_INT;if(i===gn)return n.FLOAT;if(i===lr)return n.HALF_FLOAT;if(i===ql)return n.ALPHA;if(i===Yl)return n.RGB;if(i===en)return n.RGBA;if(i===$l)return n.LUMINANCE;if(i===Kl)return n.LUMINANCE_ALPHA;if(i===Ri)return n.DEPTH_COMPONENT;if(i===Fi)return n.DEPTH_STENCIL;if(i===jl)return n.RED;if(i===eo)return n.RED_INTEGER;if(i===Zl)return n.RG;if(i===to)return n.RG_INTEGER;if(i===no)return n.RGBA_INTEGER;if(i===Kr||i===jr||i===Zr||i===Jr)if(a===rt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Kr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===jr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Zr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Jr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Kr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===jr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Zr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Jr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===va||i===xa||i===Ma||i===Sa)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===va)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===xa)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ma)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Sa)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ya||i===ba||i===Ea)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===ya||i===ba)return a===rt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Ea)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Ta||i===Aa||i===wa||i===Ca||i===Ra||i===Pa||i===La||i===Da||i===Ia||i===Ua||i===Na||i===Fa||i===Oa||i===Ba)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Ta)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Aa)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===wa)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ca)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ra)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Pa)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===La)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Da)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ia)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ua)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Na)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Fa)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Oa)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ba)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Qr||i===ka||i===za)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Qr)return a===rt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===ka)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===za)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Jl||i===Ha||i===Ga||i===Va)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Qr)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Ha)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ga)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Va)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ni?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}class $m extends Zt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class vn extends ft{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Km={type:"move"};class Zs{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new vn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new vn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new vn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const p=t.getJointPose(v,i),f=this._getHandJoint(c,v);p!==null&&(f.matrix.fromArray(p.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=p.radius),f.visible=p!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),m=.02,g=.005;c.inputState.pinching&&u>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Km)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new vn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const jm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Zm=`
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

}`;class Jm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const r=new Ct,s=e.properties.get(r);s.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Hn({vertexShader:jm,fragmentShader:Zm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ye(new Gn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Qm extends zi{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,m=null,g=null;const v=new Jm,p=t.getContextAttributes();let f=null,x=null;const M=[],E=[],R=new ze;let w=null;const A=new Zt;A.layers.enable(1),A.viewport=new lt;const P=new Zt;P.layers.enable(2),P.viewport=new lt;const W=[A,P],_=new $m;_.layers.enable(1),_.layers.enable(2);let y=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let J=M[X];return J===void 0&&(J=new Zs,M[X]=J),J.getTargetRaySpace()},this.getControllerGrip=function(X){let J=M[X];return J===void 0&&(J=new Zs,M[X]=J),J.getGripSpace()},this.getHand=function(X){let J=M[X];return J===void 0&&(J=new Zs,M[X]=J),J.getHandSpace()};function k(X){const J=E.indexOf(X.inputSource);if(J===-1)return;const ge=M[J];ge!==void 0&&(ge.update(X.inputSource,X.frame,c||a),ge.dispatchEvent({type:X.type,data:X.inputSource}))}function V(){r.removeEventListener("select",k),r.removeEventListener("selectstart",k),r.removeEventListener("selectend",k),r.removeEventListener("squeeze",k),r.removeEventListener("squeezestart",k),r.removeEventListener("squeezeend",k),r.removeEventListener("end",V),r.removeEventListener("inputsourceschange",q);for(let X=0;X<M.length;X++){const J=E[X];J!==null&&(E[X]=null,M[X].disconnect(J))}y=null,F=null,v.reset(),e.setRenderTarget(f),m=null,u=null,d=null,r=null,x=null,Xe.stop(),i.isPresenting=!1,e.setPixelRatio(w),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){s=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return u!==null?u:m},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(X){if(r=X,r!==null){if(f=e.getRenderTarget(),r.addEventListener("select",k),r.addEventListener("selectstart",k),r.addEventListener("selectend",k),r.addEventListener("squeeze",k),r.addEventListener("squeezestart",k),r.addEventListener("squeezeend",k),r.addEventListener("end",V),r.addEventListener("inputsourceschange",q),p.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(R),r.renderState.layers===void 0){const J={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,t,J),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),x=new li(m.framebufferWidth,m.framebufferHeight,{format:en,type:Mn,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let J=null,ge=null,fe=null;p.depth&&(fe=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,J=p.stencil?Fi:Ri,ge=p.stencil?Ni:oi);const we={colorFormat:t.RGBA8,depthFormat:fe,scaleFactor:s};d=new XRWebGLBinding(r,t),u=d.createProjectionLayer(we),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),x=new li(u.textureWidth,u.textureHeight,{format:en,type:Mn,depthTexture:new uc(u.textureWidth,u.textureHeight,ge,void 0,void 0,void 0,void 0,void 0,void 0,J),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Xe.setContext(r),Xe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function q(X){for(let J=0;J<X.removed.length;J++){const ge=X.removed[J],fe=E.indexOf(ge);fe>=0&&(E[fe]=null,M[fe].disconnect(ge))}for(let J=0;J<X.added.length;J++){const ge=X.added[J];let fe=E.indexOf(ge);if(fe===-1){for(let Ae=0;Ae<M.length;Ae++)if(Ae>=E.length){E.push(ge),fe=Ae;break}else if(E[Ae]===null){E[Ae]=ge,fe=Ae;break}if(fe===-1)break}const we=M[fe];we&&we.connect(ge)}}const z=new U,j=new U;function H(X,J,ge){z.setFromMatrixPosition(J.matrixWorld),j.setFromMatrixPosition(ge.matrixWorld);const fe=z.distanceTo(j),we=J.projectionMatrix.elements,Ae=ge.projectionMatrix.elements,ke=we[14]/(we[10]-1),Ze=we[14]/(we[10]+1),He=(we[9]+1)/we[5],T=(we[9]-1)/we[5],ne=(we[8]-1)/we[0],se=(Ae[8]+1)/Ae[0],Q=ke*ne,ie=ke*se,Ve=fe/(-ne+se),Ce=Ve*-ne;if(J.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Ce),X.translateZ(Ve),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),we[10]===-1)X.projectionMatrix.copy(J.projectionMatrix),X.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{const C=ke+Ve,S=Ze+Ve,N=Q-Ce,$=ie+(fe-Ce),Z=He*Ze/S*C,Y=T*Ze/S*C;X.projectionMatrix.makePerspective(N,$,Z,Y,C,S),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function ce(X,J){J===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(J.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(r===null)return;let J=X.near,ge=X.far;v.texture!==null&&(v.depthNear>0&&(J=v.depthNear),v.depthFar>0&&(ge=v.depthFar)),_.near=P.near=A.near=J,_.far=P.far=A.far=ge,(y!==_.near||F!==_.far)&&(r.updateRenderState({depthNear:_.near,depthFar:_.far}),y=_.near,F=_.far);const fe=X.parent,we=_.cameras;ce(_,fe);for(let Ae=0;Ae<we.length;Ae++)ce(we[Ae],fe);we.length===2?H(_,A,P):_.projectionMatrix.copy(A.projectionMatrix),he(X,_,fe)};function he(X,J,ge){ge===null?X.matrix.copy(J.matrixWorld):(X.matrix.copy(ge.matrixWorld),X.matrix.invert(),X.matrix.multiply(J.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(J.projectionMatrix),X.projectionMatrixInverse.copy(J.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=ar*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(u===null&&m===null))return l},this.setFoveation=function(X){l=X,u!==null&&(u.fixedFoveation=X),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=X)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(_)};let Me=null;function Ge(X,J){if(h=J.getViewerPose(c||a),g=J,h!==null){const ge=h.views;m!==null&&(e.setRenderTargetFramebuffer(x,m.framebuffer),e.setRenderTarget(x));let fe=!1;ge.length!==_.cameras.length&&(_.cameras.length=0,fe=!0);for(let Ae=0;Ae<ge.length;Ae++){const ke=ge[Ae];let Ze=null;if(m!==null)Ze=m.getViewport(ke);else{const T=d.getViewSubImage(u,ke);Ze=T.viewport,Ae===0&&(e.setRenderTargetTextures(x,T.colorTexture,u.ignoreDepthValues?void 0:T.depthStencilTexture),e.setRenderTarget(x))}let He=W[Ae];He===void 0&&(He=new Zt,He.layers.enable(Ae),He.viewport=new lt,W[Ae]=He),He.matrix.fromArray(ke.transform.matrix),He.matrix.decompose(He.position,He.quaternion,He.scale),He.projectionMatrix.fromArray(ke.projectionMatrix),He.projectionMatrixInverse.copy(He.projectionMatrix).invert(),He.viewport.set(Ze.x,Ze.y,Ze.width,Ze.height),Ae===0&&(_.matrix.copy(He.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),fe===!0&&_.cameras.push(He)}const we=r.enabledFeatures;if(we&&we.includes("depth-sensing")){const Ae=d.getDepthInformation(ge[0]);Ae&&Ae.isValid&&Ae.texture&&v.init(e,Ae,r.renderState)}}for(let ge=0;ge<M.length;ge++){const fe=E[ge],we=M[ge];fe!==null&&we!==void 0&&we.update(fe,J,c||a)}Me&&Me(X,J),J.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:J}),g=null}const Xe=new hc;Xe.setAnimationLoop(Ge),this.setAnimationLoop=function(X){Me=X},this.dispose=function(){}}}const jn=new sn,e0=new st;function t0(n,e){function t(p,f){p.matrixAutoUpdate===!0&&p.updateMatrix(),f.value.copy(p.matrix)}function i(p,f){f.color.getRGB(p.fogColor.value,oc(n)),f.isFog?(p.fogNear.value=f.near,p.fogFar.value=f.far):f.isFogExp2&&(p.fogDensity.value=f.density)}function r(p,f,x,M,E){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(p,f):f.isMeshToonMaterial?(s(p,f),d(p,f)):f.isMeshPhongMaterial?(s(p,f),h(p,f)):f.isMeshStandardMaterial?(s(p,f),u(p,f),f.isMeshPhysicalMaterial&&m(p,f,E)):f.isMeshMatcapMaterial?(s(p,f),g(p,f)):f.isMeshDepthMaterial?s(p,f):f.isMeshDistanceMaterial?(s(p,f),v(p,f)):f.isMeshNormalMaterial?s(p,f):f.isLineBasicMaterial?(a(p,f),f.isLineDashedMaterial&&o(p,f)):f.isPointsMaterial?l(p,f,x,M):f.isSpriteMaterial?c(p,f):f.isShadowMaterial?(p.color.value.copy(f.color),p.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(p,f){p.opacity.value=f.opacity,f.color&&p.diffuse.value.copy(f.color),f.emissive&&p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(p.map.value=f.map,t(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.bumpMap&&(p.bumpMap.value=f.bumpMap,t(f.bumpMap,p.bumpMapTransform),p.bumpScale.value=f.bumpScale,f.side===Dt&&(p.bumpScale.value*=-1)),f.normalMap&&(p.normalMap.value=f.normalMap,t(f.normalMap,p.normalMapTransform),p.normalScale.value.copy(f.normalScale),f.side===Dt&&p.normalScale.value.negate()),f.displacementMap&&(p.displacementMap.value=f.displacementMap,t(f.displacementMap,p.displacementMapTransform),p.displacementScale.value=f.displacementScale,p.displacementBias.value=f.displacementBias),f.emissiveMap&&(p.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,p.emissiveMapTransform)),f.specularMap&&(p.specularMap.value=f.specularMap,t(f.specularMap,p.specularMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);const x=e.get(f),M=x.envMap,E=x.envMapRotation;M&&(p.envMap.value=M,jn.copy(E),jn.x*=-1,jn.y*=-1,jn.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(jn.y*=-1,jn.z*=-1),p.envMapRotation.value.setFromMatrix4(e0.makeRotationFromEuler(jn)),p.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=f.reflectivity,p.ior.value=f.ior,p.refractionRatio.value=f.refractionRatio),f.lightMap&&(p.lightMap.value=f.lightMap,p.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,p.lightMapTransform)),f.aoMap&&(p.aoMap.value=f.aoMap,p.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,p.aoMapTransform))}function a(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,f.map&&(p.map.value=f.map,t(f.map,p.mapTransform))}function o(p,f){p.dashSize.value=f.dashSize,p.totalSize.value=f.dashSize+f.gapSize,p.scale.value=f.scale}function l(p,f,x,M){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.size.value=f.size*x,p.scale.value=M*.5,f.map&&(p.map.value=f.map,t(f.map,p.uvTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function c(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.rotation.value=f.rotation,f.map&&(p.map.value=f.map,t(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function h(p,f){p.specular.value.copy(f.specular),p.shininess.value=Math.max(f.shininess,1e-4)}function d(p,f){f.gradientMap&&(p.gradientMap.value=f.gradientMap)}function u(p,f){p.metalness.value=f.metalness,f.metalnessMap&&(p.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,p.metalnessMapTransform)),p.roughness.value=f.roughness,f.roughnessMap&&(p.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,p.roughnessMapTransform)),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)}function m(p,f,x){p.ior.value=f.ior,f.sheen>0&&(p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),p.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(p.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,p.sheenColorMapTransform)),f.sheenRoughnessMap&&(p.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,p.sheenRoughnessMapTransform))),f.clearcoat>0&&(p.clearcoat.value=f.clearcoat,p.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(p.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,p.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(p.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Dt&&p.clearcoatNormalScale.value.negate())),f.dispersion>0&&(p.dispersion.value=f.dispersion),f.iridescence>0&&(p.iridescence.value=f.iridescence,p.iridescenceIOR.value=f.iridescenceIOR,p.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(p.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,p.iridescenceMapTransform)),f.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),f.transmission>0&&(p.transmission.value=f.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),f.transmissionMap&&(p.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,p.transmissionMapTransform)),p.thickness.value=f.thickness,f.thicknessMap&&(p.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=f.attenuationDistance,p.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(p.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(p.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=f.specularIntensity,p.specularColor.value.copy(f.specularColor),f.specularColorMap&&(p.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,p.specularColorMapTransform)),f.specularIntensityMap&&(p.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,f){f.matcap&&(p.matcap.value=f.matcap)}function v(p,f){const x=e.get(f).light;p.referencePosition.value.setFromMatrixPosition(x.matrixWorld),p.nearDistance.value=x.shadow.camera.near,p.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function n0(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,M){const E=M.program;i.uniformBlockBinding(x,E)}function c(x,M){let E=r[x.id];E===void 0&&(g(x),E=h(x),r[x.id]=E,x.addEventListener("dispose",p));const R=M.program;i.updateUBOMapping(x,R);const w=e.render.frame;s[x.id]!==w&&(u(x),s[x.id]=w)}function h(x){const M=d();x.__bindingPointIndex=M;const E=n.createBuffer(),R=x.__size,w=x.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,R,w),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,M,E),E}function d(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){const M=r[x.id],E=x.uniforms,R=x.__cache;n.bindBuffer(n.UNIFORM_BUFFER,M);for(let w=0,A=E.length;w<A;w++){const P=Array.isArray(E[w])?E[w]:[E[w]];for(let W=0,_=P.length;W<_;W++){const y=P[W];if(m(y,w,W,R)===!0){const F=y.__offset,k=Array.isArray(y.value)?y.value:[y.value];let V=0;for(let q=0;q<k.length;q++){const z=k[q],j=v(z);typeof z=="number"||typeof z=="boolean"?(y.__data[0]=z,n.bufferSubData(n.UNIFORM_BUFFER,F+V,y.__data)):z.isMatrix3?(y.__data[0]=z.elements[0],y.__data[1]=z.elements[1],y.__data[2]=z.elements[2],y.__data[3]=0,y.__data[4]=z.elements[3],y.__data[5]=z.elements[4],y.__data[6]=z.elements[5],y.__data[7]=0,y.__data[8]=z.elements[6],y.__data[9]=z.elements[7],y.__data[10]=z.elements[8],y.__data[11]=0):(z.toArray(y.__data,V),V+=j.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,F,y.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(x,M,E,R){const w=x.value,A=M+"_"+E;if(R[A]===void 0)return typeof w=="number"||typeof w=="boolean"?R[A]=w:R[A]=w.clone(),!0;{const P=R[A];if(typeof w=="number"||typeof w=="boolean"){if(P!==w)return R[A]=w,!0}else if(P.equals(w)===!1)return P.copy(w),!0}return!1}function g(x){const M=x.uniforms;let E=0;const R=16;for(let A=0,P=M.length;A<P;A++){const W=Array.isArray(M[A])?M[A]:[M[A]];for(let _=0,y=W.length;_<y;_++){const F=W[_],k=Array.isArray(F.value)?F.value:[F.value];for(let V=0,q=k.length;V<q;V++){const z=k[V],j=v(z),H=E%R,ce=H%j.boundary,he=H+ce;E+=ce,he!==0&&R-he<j.storage&&(E+=R-he),F.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=E,E+=j.storage}}}const w=E%R;return w>0&&(E+=R-w),x.__size=E,x.__cache={},this}function v(x){const M={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(M.boundary=4,M.storage=4):x.isVector2?(M.boundary=8,M.storage=8):x.isVector3||x.isColor?(M.boundary=16,M.storage=12):x.isVector4?(M.boundary=16,M.storage=16):x.isMatrix3?(M.boundary=48,M.storage=48):x.isMatrix4?(M.boundary=64,M.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),M}function p(x){const M=x.target;M.removeEventListener("dispose",p);const E=a.indexOf(M.__bindingPointIndex);a.splice(E,1),n.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function f(){for(const x in r)n.deleteBuffer(r[x]);a=[],r={},s={}}return{bind:l,update:c,dispose:f}}class i0{constructor(e={}){const{canvas:t=Vh(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let u;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");u=i.getContextAttributes().alpha}else u=a;const m=new Uint32Array(4),g=new Int32Array(4);let v=null,p=null;const f=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Lt,this.toneMapping=Nn,this.toneMappingExposure=1;const M=this;let E=!1,R=0,w=0,A=null,P=-1,W=null;const _=new lt,y=new lt;let F=null;const k=new Ue(0);let V=0,q=t.width,z=t.height,j=1,H=null,ce=null;const he=new lt(0,0,q,z),Me=new lt(0,0,q,z);let Ge=!1;const Xe=new ao;let X=!1,J=!1;const ge=new st,fe=new st,we=new U,Ae=new lt,ke={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ze=!1;function He(){return A===null?j:1}let T=i;function ne(b,D){return t.getContext(b,D)}try{const b={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ja}`),t.addEventListener("webglcontextlost",K,!1),t.addEventListener("webglcontextrestored",oe,!1),t.addEventListener("webglcontextcreationerror",de,!1),T===null){const D="webgl2";if(T=ne(D,b),T===null)throw ne(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let se,Q,ie,Ve,Ce,C,S,N,$,Z,Y,ye,ae,me,$e,ee,_e,Le,De,ve,We,Ie,nt,L;function ue(){se=new lp(T),se.init(),Ie=new Ym(T,se),Q=new np(T,se,e,Ie),ie=new Wm(T),Q.reverseDepthBuffer&&ie.buffers.depth.setReversed(!0),Ve=new up(T),Ce=new Rm,C=new qm(T,se,ie,Ce,Q,Ie,Ve),S=new rp(M),N=new op(M),$=new _u(T),nt=new ep(T,$),Z=new cp(T,$,Ve,nt),Y=new fp(T,Z,$,Ve),De=new dp(T,Q,C),ee=new ip(Ce),ye=new Cm(M,S,N,se,Q,nt,ee),ae=new t0(M,Ce),me=new Lm,$e=new Om(se),Le=new Qf(M,S,N,ie,Y,u,l),_e=new Gm(M,Y,Q),L=new n0(T,Ve,Q,ie),ve=new tp(T,se,Ve),We=new hp(T,se,Ve),Ve.programs=ye.programs,M.capabilities=Q,M.extensions=se,M.properties=Ce,M.renderLists=me,M.shadowMap=_e,M.state=ie,M.info=Ve}ue();const G=new Qm(M,T);this.xr=G,this.getContext=function(){return T},this.getContextAttributes=function(){return T.getContextAttributes()},this.forceContextLoss=function(){const b=se.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=se.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(b){b!==void 0&&(j=b,this.setSize(q,z,!1))},this.getSize=function(b){return b.set(q,z)},this.setSize=function(b,D,O=!0){if(G.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=b,z=D,t.width=Math.floor(b*j),t.height=Math.floor(D*j),O===!0&&(t.style.width=b+"px",t.style.height=D+"px"),this.setViewport(0,0,b,D)},this.getDrawingBufferSize=function(b){return b.set(q*j,z*j).floor()},this.setDrawingBufferSize=function(b,D,O){q=b,z=D,j=O,t.width=Math.floor(b*O),t.height=Math.floor(D*O),this.setViewport(0,0,b,D)},this.getCurrentViewport=function(b){return b.copy(_)},this.getViewport=function(b){return b.copy(he)},this.setViewport=function(b,D,O,B){b.isVector4?he.set(b.x,b.y,b.z,b.w):he.set(b,D,O,B),ie.viewport(_.copy(he).multiplyScalar(j).round())},this.getScissor=function(b){return b.copy(Me)},this.setScissor=function(b,D,O,B){b.isVector4?Me.set(b.x,b.y,b.z,b.w):Me.set(b,D,O,B),ie.scissor(y.copy(Me).multiplyScalar(j).round())},this.getScissorTest=function(){return Ge},this.setScissorTest=function(b){ie.setScissorTest(Ge=b)},this.setOpaqueSort=function(b){H=b},this.setTransparentSort=function(b){ce=b},this.getClearColor=function(b){return b.copy(Le.getClearColor())},this.setClearColor=function(){Le.setClearColor.apply(Le,arguments)},this.getClearAlpha=function(){return Le.getClearAlpha()},this.setClearAlpha=function(){Le.setClearAlpha.apply(Le,arguments)},this.clear=function(b=!0,D=!0,O=!0){let B=0;if(b){let I=!1;if(A!==null){const te=A.texture.format;I=te===no||te===to||te===eo}if(I){const te=A.texture.type,le=te===Mn||te===oi||te===sr||te===Ni||te===Ja||te===Qa,xe=Le.getClearColor(),Se=Le.getClearAlpha(),Re=xe.r,Pe=xe.g,be=xe.b;le?(m[0]=Re,m[1]=Pe,m[2]=be,m[3]=Se,T.clearBufferuiv(T.COLOR,0,m)):(g[0]=Re,g[1]=Pe,g[2]=be,g[3]=Se,T.clearBufferiv(T.COLOR,0,g))}else B|=T.COLOR_BUFFER_BIT}D&&(B|=T.DEPTH_BUFFER_BIT,T.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),O&&(B|=T.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),T.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",K,!1),t.removeEventListener("webglcontextrestored",oe,!1),t.removeEventListener("webglcontextcreationerror",de,!1),me.dispose(),$e.dispose(),Ce.dispose(),S.dispose(),N.dispose(),Y.dispose(),nt.dispose(),L.dispose(),ye.dispose(),G.dispose(),G.removeEventListener("sessionstart",_o),G.removeEventListener("sessionend",vo),Wn.stop()};function K(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function oe(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const b=Ve.autoReset,D=_e.enabled,O=_e.autoUpdate,B=_e.needsUpdate,I=_e.type;ue(),Ve.autoReset=b,_e.enabled=D,_e.autoUpdate=O,_e.needsUpdate=B,_e.type=I}function de(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function qe(b){const D=b.target;D.removeEventListener("dispose",qe),ht(D)}function ht(b){Rt(b),Ce.remove(b)}function Rt(b){const D=Ce.get(b).programs;D!==void 0&&(D.forEach(function(O){ye.releaseProgram(O)}),b.isShaderMaterial&&ye.releaseShaderCache(b))}this.renderBufferDirect=function(b,D,O,B,I,te){D===null&&(D=ke);const le=I.isMesh&&I.matrixWorld.determinant()<0,xe=Bc(b,D,O,B,I);ie.setMaterial(B,le);let Se=O.index,Re=1;if(B.wireframe===!0){if(Se=Z.getWireframeAttribute(O),Se===void 0)return;Re=2}const Pe=O.drawRange,be=O.attributes.position;let tt=Pe.start*Re,it=(Pe.start+Pe.count)*Re;te!==null&&(tt=Math.max(tt,te.start*Re),it=Math.min(it,(te.start+te.count)*Re)),Se!==null?(tt=Math.max(tt,0),it=Math.min(it,Se.count)):be!=null&&(tt=Math.max(tt,0),it=Math.min(it,be.count));const ot=it-tt;if(ot<0||ot===1/0)return;nt.setup(I,B,xe,O,Se);let It,Je=ve;if(Se!==null&&(It=$.get(Se),Je=We,Je.setIndex(It)),I.isMesh)B.wireframe===!0?(ie.setLineWidth(B.wireframeLinewidth*He()),Je.setMode(T.LINES)):Je.setMode(T.TRIANGLES);else if(I.isLine){let Ee=B.linewidth;Ee===void 0&&(Ee=1),ie.setLineWidth(Ee*He()),I.isLineSegments?Je.setMode(T.LINES):I.isLineLoop?Je.setMode(T.LINE_LOOP):Je.setMode(T.LINE_STRIP)}else I.isPoints?Je.setMode(T.POINTS):I.isSprite&&Je.setMode(T.TRIANGLES);if(I.isBatchedMesh)if(I._multiDrawInstances!==null)Je.renderMultiDrawInstances(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount,I._multiDrawInstances);else if(se.get("WEBGL_multi_draw"))Je.renderMultiDraw(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount);else{const Ee=I._multiDrawStarts,vt=I._multiDrawCounts,Qe=I._multiDrawCount,Wt=Se?$.get(Se).bytesPerElement:1,hi=Ce.get(B).currentProgram.getUniforms();for(let Ut=0;Ut<Qe;Ut++)hi.setValue(T,"_gl_DrawID",Ut),Je.render(Ee[Ut]/Wt,vt[Ut])}else if(I.isInstancedMesh)Je.renderInstances(tt,ot,I.count);else if(O.isInstancedBufferGeometry){const Ee=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,vt=Math.min(O.instanceCount,Ee);Je.renderInstances(tt,ot,vt)}else Je.render(tt,ot)};function Ke(b,D,O){b.transparent===!0&&b.side===nn&&b.forceSinglePass===!1?(b.side=Dt,b.needsUpdate=!0,pr(b,D,O),b.side=kn,b.needsUpdate=!0,pr(b,D,O),b.side=nn):pr(b,D,O)}this.compile=function(b,D,O=null){O===null&&(O=b),p=$e.get(O),p.init(D),x.push(p),O.traverseVisible(function(I){I.isLight&&I.layers.test(D.layers)&&(p.pushLight(I),I.castShadow&&p.pushShadow(I))}),b!==O&&b.traverseVisible(function(I){I.isLight&&I.layers.test(D.layers)&&(p.pushLight(I),I.castShadow&&p.pushShadow(I))}),p.setupLights();const B=new Set;return b.traverse(function(I){if(!(I.isMesh||I.isPoints||I.isLine||I.isSprite))return;const te=I.material;if(te)if(Array.isArray(te))for(let le=0;le<te.length;le++){const xe=te[le];Ke(xe,O,I),B.add(xe)}else Ke(te,O,I),B.add(te)}),x.pop(),p=null,B},this.compileAsync=function(b,D,O=null){const B=this.compile(b,D,O);return new Promise(I=>{function te(){if(B.forEach(function(le){Ce.get(le).currentProgram.isReady()&&B.delete(le)}),B.size===0){I(b);return}setTimeout(te,10)}se.get("KHR_parallel_shader_compile")!==null?te():setTimeout(te,10)})};let Pt=null;function an(b){Pt&&Pt(b)}function _o(){Wn.stop()}function vo(){Wn.start()}const Wn=new hc;Wn.setAnimationLoop(an),typeof self<"u"&&Wn.setContext(self),this.setAnimationLoop=function(b){Pt=b,G.setAnimationLoop(b),b===null?Wn.stop():Wn.start()},G.addEventListener("sessionstart",_o),G.addEventListener("sessionend",vo),this.render=function(b,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),G.enabled===!0&&G.isPresenting===!0&&(G.cameraAutoUpdate===!0&&G.updateCamera(D),D=G.getCamera()),b.isScene===!0&&b.onBeforeRender(M,b,D,A),p=$e.get(b,x.length),p.init(D),x.push(p),fe.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Xe.setFromProjectionMatrix(fe),J=this.localClippingEnabled,X=ee.init(this.clippingPlanes,J),v=me.get(b,f.length),v.init(),f.push(v),G.enabled===!0&&G.isPresenting===!0){const te=M.xr.getDepthSensingMesh();te!==null&&xs(te,D,-1/0,M.sortObjects)}xs(b,D,0,M.sortObjects),v.finish(),M.sortObjects===!0&&v.sort(H,ce),Ze=G.enabled===!1||G.isPresenting===!1||G.hasDepthSensing()===!1,Ze&&Le.addToRenderList(v,b),this.info.render.frame++,X===!0&&ee.beginShadows();const O=p.state.shadowsArray;_e.render(O,b,D),X===!0&&ee.endShadows(),this.info.autoReset===!0&&this.info.reset();const B=v.opaque,I=v.transmissive;if(p.setupLights(),D.isArrayCamera){const te=D.cameras;if(I.length>0)for(let le=0,xe=te.length;le<xe;le++){const Se=te[le];Mo(B,I,b,Se)}Ze&&Le.render(b);for(let le=0,xe=te.length;le<xe;le++){const Se=te[le];xo(v,b,Se,Se.viewport)}}else I.length>0&&Mo(B,I,b,D),Ze&&Le.render(b),xo(v,b,D);A!==null&&(C.updateMultisampleRenderTarget(A),C.updateRenderTargetMipmap(A)),b.isScene===!0&&b.onAfterRender(M,b,D),nt.resetDefaultState(),P=-1,W=null,x.pop(),x.length>0?(p=x[x.length-1],X===!0&&ee.setGlobalState(M.clippingPlanes,p.state.camera)):p=null,f.pop(),f.length>0?v=f[f.length-1]:v=null};function xs(b,D,O,B){if(b.visible===!1)return;if(b.layers.test(D.layers)){if(b.isGroup)O=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(D);else if(b.isLight)p.pushLight(b),b.castShadow&&p.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||Xe.intersectsSprite(b)){B&&Ae.setFromMatrixPosition(b.matrixWorld).applyMatrix4(fe);const le=Y.update(b),xe=b.material;xe.visible&&v.push(b,le,xe,O,Ae.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||Xe.intersectsObject(b))){const le=Y.update(b),xe=b.material;if(B&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Ae.copy(b.boundingSphere.center)):(le.boundingSphere===null&&le.computeBoundingSphere(),Ae.copy(le.boundingSphere.center)),Ae.applyMatrix4(b.matrixWorld).applyMatrix4(fe)),Array.isArray(xe)){const Se=le.groups;for(let Re=0,Pe=Se.length;Re<Pe;Re++){const be=Se[Re],tt=xe[be.materialIndex];tt&&tt.visible&&v.push(b,le,tt,O,Ae.z,be)}}else xe.visible&&v.push(b,le,xe,O,Ae.z,null)}}const te=b.children;for(let le=0,xe=te.length;le<xe;le++)xs(te[le],D,O,B)}function xo(b,D,O,B){const I=b.opaque,te=b.transmissive,le=b.transparent;p.setupLightsView(O),X===!0&&ee.setGlobalState(M.clippingPlanes,O),B&&ie.viewport(_.copy(B)),I.length>0&&fr(I,D,O),te.length>0&&fr(te,D,O),le.length>0&&fr(le,D,O),ie.buffers.depth.setTest(!0),ie.buffers.depth.setMask(!0),ie.buffers.color.setMask(!0),ie.setPolygonOffset(!1)}function Mo(b,D,O,B){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[B.id]===void 0&&(p.state.transmissionRenderTarget[B.id]=new li(1,1,{generateMipmaps:!0,type:se.has("EXT_color_buffer_half_float")||se.has("EXT_color_buffer_float")?lr:Mn,minFilter:ri,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:et.workingColorSpace}));const te=p.state.transmissionRenderTarget[B.id],le=B.viewport||_;te.setSize(le.z,le.w);const xe=M.getRenderTarget();M.setRenderTarget(te),M.getClearColor(k),V=M.getClearAlpha(),V<1&&M.setClearColor(16777215,.5),M.clear(),Ze&&Le.render(O);const Se=M.toneMapping;M.toneMapping=Nn;const Re=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),p.setupLightsView(B),X===!0&&ee.setGlobalState(M.clippingPlanes,B),fr(b,O,B),C.updateMultisampleRenderTarget(te),C.updateRenderTargetMipmap(te),se.has("WEBGL_multisampled_render_to_texture")===!1){let Pe=!1;for(let be=0,tt=D.length;be<tt;be++){const it=D[be],ot=it.object,It=it.geometry,Je=it.material,Ee=it.group;if(Je.side===nn&&ot.layers.test(B.layers)){const vt=Je.side;Je.side=Dt,Je.needsUpdate=!0,So(ot,O,B,It,Je,Ee),Je.side=vt,Je.needsUpdate=!0,Pe=!0}}Pe===!0&&(C.updateMultisampleRenderTarget(te),C.updateRenderTargetMipmap(te))}M.setRenderTarget(xe),M.setClearColor(k,V),Re!==void 0&&(B.viewport=Re),M.toneMapping=Se}function fr(b,D,O){const B=D.isScene===!0?D.overrideMaterial:null;for(let I=0,te=b.length;I<te;I++){const le=b[I],xe=le.object,Se=le.geometry,Re=B===null?le.material:B,Pe=le.group;xe.layers.test(O.layers)&&So(xe,D,O,Se,Re,Pe)}}function So(b,D,O,B,I,te){b.onBeforeRender(M,D,O,B,I,te),b.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),I.onBeforeRender(M,D,O,B,b,te),I.transparent===!0&&I.side===nn&&I.forceSinglePass===!1?(I.side=Dt,I.needsUpdate=!0,M.renderBufferDirect(O,D,B,I,b,te),I.side=kn,I.needsUpdate=!0,M.renderBufferDirect(O,D,B,I,b,te),I.side=nn):M.renderBufferDirect(O,D,B,I,b,te),b.onAfterRender(M,D,O,B,I,te)}function pr(b,D,O){D.isScene!==!0&&(D=ke);const B=Ce.get(b),I=p.state.lights,te=p.state.shadowsArray,le=I.state.version,xe=ye.getParameters(b,I.state,te,D,O),Se=ye.getProgramCacheKey(xe);let Re=B.programs;B.environment=b.isMeshStandardMaterial?D.environment:null,B.fog=D.fog,B.envMap=(b.isMeshStandardMaterial?N:S).get(b.envMap||B.environment),B.envMapRotation=B.environment!==null&&b.envMap===null?D.environmentRotation:b.envMapRotation,Re===void 0&&(b.addEventListener("dispose",qe),Re=new Map,B.programs=Re);let Pe=Re.get(Se);if(Pe!==void 0){if(B.currentProgram===Pe&&B.lightsStateVersion===le)return bo(b,xe),Pe}else xe.uniforms=ye.getUniforms(b),b.onBeforeCompile(xe,M),Pe=ye.acquireProgram(xe,Se),Re.set(Se,Pe),B.uniforms=xe.uniforms;const be=B.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(be.clippingPlanes=ee.uniform),bo(b,xe),B.needsLights=zc(b),B.lightsStateVersion=le,B.needsLights&&(be.ambientLightColor.value=I.state.ambient,be.lightProbe.value=I.state.probe,be.directionalLights.value=I.state.directional,be.directionalLightShadows.value=I.state.directionalShadow,be.spotLights.value=I.state.spot,be.spotLightShadows.value=I.state.spotShadow,be.rectAreaLights.value=I.state.rectArea,be.ltc_1.value=I.state.rectAreaLTC1,be.ltc_2.value=I.state.rectAreaLTC2,be.pointLights.value=I.state.point,be.pointLightShadows.value=I.state.pointShadow,be.hemisphereLights.value=I.state.hemi,be.directionalShadowMap.value=I.state.directionalShadowMap,be.directionalShadowMatrix.value=I.state.directionalShadowMatrix,be.spotShadowMap.value=I.state.spotShadowMap,be.spotLightMatrix.value=I.state.spotLightMatrix,be.spotLightMap.value=I.state.spotLightMap,be.pointShadowMap.value=I.state.pointShadowMap,be.pointShadowMatrix.value=I.state.pointShadowMatrix),B.currentProgram=Pe,B.uniformsList=null,Pe}function yo(b){if(b.uniformsList===null){const D=b.currentProgram.getUniforms();b.uniformsList=ts.seqWithValue(D.seq,b.uniforms)}return b.uniformsList}function bo(b,D){const O=Ce.get(b);O.outputColorSpace=D.outputColorSpace,O.batching=D.batching,O.batchingColor=D.batchingColor,O.instancing=D.instancing,O.instancingColor=D.instancingColor,O.instancingMorph=D.instancingMorph,O.skinning=D.skinning,O.morphTargets=D.morphTargets,O.morphNormals=D.morphNormals,O.morphColors=D.morphColors,O.morphTargetsCount=D.morphTargetsCount,O.numClippingPlanes=D.numClippingPlanes,O.numIntersection=D.numClipIntersection,O.vertexAlphas=D.vertexAlphas,O.vertexTangents=D.vertexTangents,O.toneMapping=D.toneMapping}function Bc(b,D,O,B,I){D.isScene!==!0&&(D=ke),C.resetTextureUnits();const te=D.fog,le=B.isMeshStandardMaterial?D.environment:null,xe=A===null?M.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Vn,Se=(B.isMeshStandardMaterial?N:S).get(B.envMap||le),Re=B.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,Pe=!!O.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),be=!!O.morphAttributes.position,tt=!!O.morphAttributes.normal,it=!!O.morphAttributes.color;let ot=Nn;B.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(ot=M.toneMapping);const It=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Je=It!==void 0?It.length:0,Ee=Ce.get(B),vt=p.state.lights;if(X===!0&&(J===!0||b!==W)){const kt=b===W&&B.id===P;ee.setState(B,b,kt)}let Qe=!1;B.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==vt.state.version||Ee.outputColorSpace!==xe||I.isBatchedMesh&&Ee.batching===!1||!I.isBatchedMesh&&Ee.batching===!0||I.isBatchedMesh&&Ee.batchingColor===!0&&I.colorTexture===null||I.isBatchedMesh&&Ee.batchingColor===!1&&I.colorTexture!==null||I.isInstancedMesh&&Ee.instancing===!1||!I.isInstancedMesh&&Ee.instancing===!0||I.isSkinnedMesh&&Ee.skinning===!1||!I.isSkinnedMesh&&Ee.skinning===!0||I.isInstancedMesh&&Ee.instancingColor===!0&&I.instanceColor===null||I.isInstancedMesh&&Ee.instancingColor===!1&&I.instanceColor!==null||I.isInstancedMesh&&Ee.instancingMorph===!0&&I.morphTexture===null||I.isInstancedMesh&&Ee.instancingMorph===!1&&I.morphTexture!==null||Ee.envMap!==Se||B.fog===!0&&Ee.fog!==te||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==ee.numPlanes||Ee.numIntersection!==ee.numIntersection)||Ee.vertexAlphas!==Re||Ee.vertexTangents!==Pe||Ee.morphTargets!==be||Ee.morphNormals!==tt||Ee.morphColors!==it||Ee.toneMapping!==ot||Ee.morphTargetsCount!==Je)&&(Qe=!0):(Qe=!0,Ee.__version=B.version);let Wt=Ee.currentProgram;Qe===!0&&(Wt=pr(B,D,I));let hi=!1,Ut=!1,Ms=!1;const ct=Wt.getUniforms(),Sn=Ee.uniforms;if(ie.useProgram(Wt.program)&&(hi=!0,Ut=!0,Ms=!0),B.id!==P&&(P=B.id,Ut=!0),hi||W!==b){Q.reverseDepthBuffer?(ge.copy(b.projectionMatrix),Xh(ge),qh(ge),ct.setValue(T,"projectionMatrix",ge)):ct.setValue(T,"projectionMatrix",b.projectionMatrix),ct.setValue(T,"viewMatrix",b.matrixWorldInverse);const kt=ct.map.cameraPosition;kt!==void 0&&kt.setValue(T,we.setFromMatrixPosition(b.matrixWorld)),Q.logarithmicDepthBuffer&&ct.setValue(T,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&ct.setValue(T,"isOrthographic",b.isOrthographicCamera===!0),W!==b&&(W=b,Ut=!0,Ms=!0)}if(I.isSkinnedMesh){ct.setOptional(T,I,"bindMatrix"),ct.setOptional(T,I,"bindMatrixInverse");const kt=I.skeleton;kt&&(kt.boneTexture===null&&kt.computeBoneTexture(),ct.setValue(T,"boneTexture",kt.boneTexture,C))}I.isBatchedMesh&&(ct.setOptional(T,I,"batchingTexture"),ct.setValue(T,"batchingTexture",I._matricesTexture,C),ct.setOptional(T,I,"batchingIdTexture"),ct.setValue(T,"batchingIdTexture",I._indirectTexture,C),ct.setOptional(T,I,"batchingColorTexture"),I._colorsTexture!==null&&ct.setValue(T,"batchingColorTexture",I._colorsTexture,C));const Ss=O.morphAttributes;if((Ss.position!==void 0||Ss.normal!==void 0||Ss.color!==void 0)&&De.update(I,O,Wt),(Ut||Ee.receiveShadow!==I.receiveShadow)&&(Ee.receiveShadow=I.receiveShadow,ct.setValue(T,"receiveShadow",I.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(Sn.envMap.value=Se,Sn.flipEnvMap.value=Se.isCubeTexture&&Se.isRenderTargetTexture===!1?-1:1),B.isMeshStandardMaterial&&B.envMap===null&&D.environment!==null&&(Sn.envMapIntensity.value=D.environmentIntensity),Ut&&(ct.setValue(T,"toneMappingExposure",M.toneMappingExposure),Ee.needsLights&&kc(Sn,Ms),te&&B.fog===!0&&ae.refreshFogUniforms(Sn,te),ae.refreshMaterialUniforms(Sn,B,j,z,p.state.transmissionRenderTarget[b.id]),ts.upload(T,yo(Ee),Sn,C)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(ts.upload(T,yo(Ee),Sn,C),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&ct.setValue(T,"center",I.center),ct.setValue(T,"modelViewMatrix",I.modelViewMatrix),ct.setValue(T,"normalMatrix",I.normalMatrix),ct.setValue(T,"modelMatrix",I.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const kt=B.uniformsGroups;for(let ys=0,Hc=kt.length;ys<Hc;ys++){const Eo=kt[ys];L.update(Eo,Wt),L.bind(Eo,Wt)}}return Wt}function kc(b,D){b.ambientLightColor.needsUpdate=D,b.lightProbe.needsUpdate=D,b.directionalLights.needsUpdate=D,b.directionalLightShadows.needsUpdate=D,b.pointLights.needsUpdate=D,b.pointLightShadows.needsUpdate=D,b.spotLights.needsUpdate=D,b.spotLightShadows.needsUpdate=D,b.rectAreaLights.needsUpdate=D,b.hemisphereLights.needsUpdate=D}function zc(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(b,D,O){Ce.get(b.texture).__webglTexture=D,Ce.get(b.depthTexture).__webglTexture=O;const B=Ce.get(b);B.__hasExternalTextures=!0,B.__autoAllocateDepthBuffer=O===void 0,B.__autoAllocateDepthBuffer||se.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),B.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,D){const O=Ce.get(b);O.__webglFramebuffer=D,O.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(b,D=0,O=0){A=b,R=D,w=O;let B=!0,I=null,te=!1,le=!1;if(b){const Se=Ce.get(b);if(Se.__useDefaultFramebuffer!==void 0)ie.bindFramebuffer(T.FRAMEBUFFER,null),B=!1;else if(Se.__webglFramebuffer===void 0)C.setupRenderTarget(b);else if(Se.__hasExternalTextures)C.rebindTextures(b,Ce.get(b.texture).__webglTexture,Ce.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const be=b.depthTexture;if(Se.__boundDepthTexture!==be){if(be!==null&&Ce.has(be)&&(b.width!==be.image.width||b.height!==be.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(b)}}const Re=b.texture;(Re.isData3DTexture||Re.isDataArrayTexture||Re.isCompressedArrayTexture)&&(le=!0);const Pe=Ce.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Pe[D])?I=Pe[D][O]:I=Pe[D],te=!0):b.samples>0&&C.useMultisampledRTT(b)===!1?I=Ce.get(b).__webglMultisampledFramebuffer:Array.isArray(Pe)?I=Pe[O]:I=Pe,_.copy(b.viewport),y.copy(b.scissor),F=b.scissorTest}else _.copy(he).multiplyScalar(j).floor(),y.copy(Me).multiplyScalar(j).floor(),F=Ge;if(ie.bindFramebuffer(T.FRAMEBUFFER,I)&&B&&ie.drawBuffers(b,I),ie.viewport(_),ie.scissor(y),ie.setScissorTest(F),te){const Se=Ce.get(b.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_CUBE_MAP_POSITIVE_X+D,Se.__webglTexture,O)}else if(le){const Se=Ce.get(b.texture),Re=D||0;T.framebufferTextureLayer(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,Se.__webglTexture,O||0,Re)}P=-1},this.readRenderTargetPixels=function(b,D,O,B,I,te,le){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xe=Ce.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&le!==void 0&&(xe=xe[le]),xe){ie.bindFramebuffer(T.FRAMEBUFFER,xe);try{const Se=b.texture,Re=Se.format,Pe=Se.type;if(!Q.textureFormatReadable(Re)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Q.textureTypeReadable(Pe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=b.width-B&&O>=0&&O<=b.height-I&&T.readPixels(D,O,B,I,Ie.convert(Re),Ie.convert(Pe),te)}finally{const Se=A!==null?Ce.get(A).__webglFramebuffer:null;ie.bindFramebuffer(T.FRAMEBUFFER,Se)}}},this.readRenderTargetPixelsAsync=async function(b,D,O,B,I,te,le){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xe=Ce.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&le!==void 0&&(xe=xe[le]),xe){const Se=b.texture,Re=Se.format,Pe=Se.type;if(!Q.textureFormatReadable(Re))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Q.textureTypeReadable(Pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(D>=0&&D<=b.width-B&&O>=0&&O<=b.height-I){ie.bindFramebuffer(T.FRAMEBUFFER,xe);const be=T.createBuffer();T.bindBuffer(T.PIXEL_PACK_BUFFER,be),T.bufferData(T.PIXEL_PACK_BUFFER,te.byteLength,T.STREAM_READ),T.readPixels(D,O,B,I,Ie.convert(Re),Ie.convert(Pe),0);const tt=A!==null?Ce.get(A).__webglFramebuffer:null;ie.bindFramebuffer(T.FRAMEBUFFER,tt);const it=T.fenceSync(T.SYNC_GPU_COMMANDS_COMPLETE,0);return T.flush(),await Wh(T,it,4),T.bindBuffer(T.PIXEL_PACK_BUFFER,be),T.getBufferSubData(T.PIXEL_PACK_BUFFER,0,te),T.deleteBuffer(be),T.deleteSync(it),te}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,D=null,O=0){b.isTexture!==!0&&(es("WebGLRenderer: copyFramebufferToTexture function signature has changed."),D=arguments[0]||null,b=arguments[1]);const B=Math.pow(2,-O),I=Math.floor(b.image.width*B),te=Math.floor(b.image.height*B),le=D!==null?D.x:0,xe=D!==null?D.y:0;C.setTexture2D(b,0),T.copyTexSubImage2D(T.TEXTURE_2D,O,0,0,le,xe,I,te),ie.unbindTexture()},this.copyTextureToTexture=function(b,D,O=null,B=null,I=0){b.isTexture!==!0&&(es("WebGLRenderer: copyTextureToTexture function signature has changed."),B=arguments[0]||null,b=arguments[1],D=arguments[2],I=arguments[3]||0,O=null);let te,le,xe,Se,Re,Pe;O!==null?(te=O.max.x-O.min.x,le=O.max.y-O.min.y,xe=O.min.x,Se=O.min.y):(te=b.image.width,le=b.image.height,xe=0,Se=0),B!==null?(Re=B.x,Pe=B.y):(Re=0,Pe=0);const be=Ie.convert(D.format),tt=Ie.convert(D.type);C.setTexture2D(D,0),T.pixelStorei(T.UNPACK_FLIP_Y_WEBGL,D.flipY),T.pixelStorei(T.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),T.pixelStorei(T.UNPACK_ALIGNMENT,D.unpackAlignment);const it=T.getParameter(T.UNPACK_ROW_LENGTH),ot=T.getParameter(T.UNPACK_IMAGE_HEIGHT),It=T.getParameter(T.UNPACK_SKIP_PIXELS),Je=T.getParameter(T.UNPACK_SKIP_ROWS),Ee=T.getParameter(T.UNPACK_SKIP_IMAGES),vt=b.isCompressedTexture?b.mipmaps[I]:b.image;T.pixelStorei(T.UNPACK_ROW_LENGTH,vt.width),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,vt.height),T.pixelStorei(T.UNPACK_SKIP_PIXELS,xe),T.pixelStorei(T.UNPACK_SKIP_ROWS,Se),b.isDataTexture?T.texSubImage2D(T.TEXTURE_2D,I,Re,Pe,te,le,be,tt,vt.data):b.isCompressedTexture?T.compressedTexSubImage2D(T.TEXTURE_2D,I,Re,Pe,vt.width,vt.height,be,vt.data):T.texSubImage2D(T.TEXTURE_2D,I,Re,Pe,te,le,be,tt,vt),T.pixelStorei(T.UNPACK_ROW_LENGTH,it),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,ot),T.pixelStorei(T.UNPACK_SKIP_PIXELS,It),T.pixelStorei(T.UNPACK_SKIP_ROWS,Je),T.pixelStorei(T.UNPACK_SKIP_IMAGES,Ee),I===0&&D.generateMipmaps&&T.generateMipmap(T.TEXTURE_2D),ie.unbindTexture()},this.copyTextureToTexture3D=function(b,D,O=null,B=null,I=0){b.isTexture!==!0&&(es("WebGLRenderer: copyTextureToTexture3D function signature has changed."),O=arguments[0]||null,B=arguments[1]||null,b=arguments[2],D=arguments[3],I=arguments[4]||0);let te,le,xe,Se,Re,Pe,be,tt,it;const ot=b.isCompressedTexture?b.mipmaps[I]:b.image;O!==null?(te=O.max.x-O.min.x,le=O.max.y-O.min.y,xe=O.max.z-O.min.z,Se=O.min.x,Re=O.min.y,Pe=O.min.z):(te=ot.width,le=ot.height,xe=ot.depth,Se=0,Re=0,Pe=0),B!==null?(be=B.x,tt=B.y,it=B.z):(be=0,tt=0,it=0);const It=Ie.convert(D.format),Je=Ie.convert(D.type);let Ee;if(D.isData3DTexture)C.setTexture3D(D,0),Ee=T.TEXTURE_3D;else if(D.isDataArrayTexture||D.isCompressedArrayTexture)C.setTexture2DArray(D,0),Ee=T.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}T.pixelStorei(T.UNPACK_FLIP_Y_WEBGL,D.flipY),T.pixelStorei(T.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),T.pixelStorei(T.UNPACK_ALIGNMENT,D.unpackAlignment);const vt=T.getParameter(T.UNPACK_ROW_LENGTH),Qe=T.getParameter(T.UNPACK_IMAGE_HEIGHT),Wt=T.getParameter(T.UNPACK_SKIP_PIXELS),hi=T.getParameter(T.UNPACK_SKIP_ROWS),Ut=T.getParameter(T.UNPACK_SKIP_IMAGES);T.pixelStorei(T.UNPACK_ROW_LENGTH,ot.width),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,ot.height),T.pixelStorei(T.UNPACK_SKIP_PIXELS,Se),T.pixelStorei(T.UNPACK_SKIP_ROWS,Re),T.pixelStorei(T.UNPACK_SKIP_IMAGES,Pe),b.isDataTexture||b.isData3DTexture?T.texSubImage3D(Ee,I,be,tt,it,te,le,xe,It,Je,ot.data):D.isCompressedArrayTexture?T.compressedTexSubImage3D(Ee,I,be,tt,it,te,le,xe,It,ot.data):T.texSubImage3D(Ee,I,be,tt,it,te,le,xe,It,Je,ot),T.pixelStorei(T.UNPACK_ROW_LENGTH,vt),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,Qe),T.pixelStorei(T.UNPACK_SKIP_PIXELS,Wt),T.pixelStorei(T.UNPACK_SKIP_ROWS,hi),T.pixelStorei(T.UNPACK_SKIP_IMAGES,Ut),I===0&&D.generateMipmaps&&T.generateMipmap(Ee),ie.unbindTexture()},this.initRenderTarget=function(b){Ce.get(b).__webglFramebuffer===void 0&&C.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?C.setTextureCube(b,0):b.isData3DTexture?C.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?C.setTexture2DArray(b,0):C.setTexture2D(b,0),ie.unbindTexture()},this.resetState=function(){R=0,w=0,A=null,ie.reset(),nt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return _n}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===io?"display-p3":"srgb",t.unpackColorSpace=et.workingColorSpace===ps?"display-p3":"srgb"}}class co{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Ue(e),this.near=t,this.far=i}clone(){return new co(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class r0 extends ft{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new sn,this.environmentIntensity=1,this.environmentRotation=new sn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class gc extends ci{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ue(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const cs=new U,hs=new U,xl=new st,Ki=new ms,Or=new ur,Js=new U,Ml=new U;class s0 extends ft{constructor(e=new bt,t=new gc){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)cs.fromBufferAttribute(t,r-1),hs.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=cs.distanceTo(hs);e.setAttribute("lineDistance",new at(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Or.copy(i.boundingSphere),Or.applyMatrix4(r),Or.radius+=s,e.ray.intersectsSphere(Or)===!1)return;xl.copy(r).invert(),Ki.copy(e.ray).applyMatrix4(xl);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){const m=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let v=m,p=g-1;v<p;v+=c){const f=h.getX(v),x=h.getX(v+1),M=Br(this,e,Ki,l,f,x);M&&t.push(M)}if(this.isLineLoop){const v=h.getX(g-1),p=h.getX(m),f=Br(this,e,Ki,l,v,p);f&&t.push(f)}}else{const m=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let v=m,p=g-1;v<p;v+=c){const f=Br(this,e,Ki,l,v,v+1);f&&t.push(f)}if(this.isLineLoop){const v=Br(this,e,Ki,l,g-1,m);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Br(n,e,t,i,r,s){const a=n.geometry.attributes.position;if(cs.fromBufferAttribute(a,r),hs.fromBufferAttribute(a,s),t.distanceSqToSegment(cs,hs,Js,Ml)>i)return;Js.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(Js);if(!(l<e.near||l>e.far))return{distance:l,point:Ml.clone().applyMatrix4(n.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:n}}class _c extends ci{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ue(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Sl=new st,Xa=new ms,kr=new ur,zr=new U;class a0 extends ft{constructor(e=new bt,t=new _c){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),kr.copy(i.boundingSphere),kr.applyMatrix4(r),kr.radius+=s,e.ray.intersectsSphere(kr)===!1)return;Sl.copy(r).invert(),Xa.copy(e.ray).applyMatrix4(Sl);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,d=i.attributes.position;if(c!==null){const u=Math.max(0,a.start),m=Math.min(c.count,a.start+a.count);for(let g=u,v=m;g<v;g++){const p=c.getX(g);zr.fromBufferAttribute(d,p),yl(zr,p,l,r,e,t,this)}}else{const u=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let g=u,v=m;g<v;g++)zr.fromBufferAttribute(d,g),yl(zr,g,l,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function yl(n,e,t,i,r,s,a){const o=Xa.distanceSqToPoint(n);if(o<t){const l=new U;Xa.closestPointToPoint(n,l),l.applyMatrix4(i);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class _s extends Ct{constructor(e,t,i,r,s,a,o,l,c){super(e,t,i,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ai extends bt{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);const s=[],a=[],o=[],l=[],c=new U,h=new ze;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=t;d++,u+=3){const m=i+d/t*r;c.x=e*Math.cos(m),c.y=e*Math.sin(m),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/e+1)/2,h.y=(a[u+1]/e+1)/2,l.push(h.x,h.y)}for(let d=1;d<=t;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new at(a,3)),this.setAttribute("normal",new at(o,3)),this.setAttribute("uv",new at(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ai(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Bi extends bt{constructor(e=1,t=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const h=[],d=[],u=[],m=[];let g=0;const v=[],p=i/2;let f=0;x(),a===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new at(d,3)),this.setAttribute("normal",new at(u,3)),this.setAttribute("uv",new at(m,2));function x(){const E=new U,R=new U;let w=0;const A=(t-e)/i;for(let P=0;P<=s;P++){const W=[],_=P/s,y=_*(t-e)+e;for(let F=0;F<=r;F++){const k=F/r,V=k*l+o,q=Math.sin(V),z=Math.cos(V);R.x=y*q,R.y=-_*i+p,R.z=y*z,d.push(R.x,R.y,R.z),E.set(q,A,z).normalize(),u.push(E.x,E.y,E.z),m.push(k,1-_),W.push(g++)}v.push(W)}for(let P=0;P<r;P++)for(let W=0;W<s;W++){const _=v[W][P],y=v[W+1][P],F=v[W+1][P+1],k=v[W][P+1];e>0&&(h.push(_,y,k),w+=3),t>0&&(h.push(y,F,k),w+=3)}c.addGroup(f,w,0),f+=w}function M(E){const R=g,w=new ze,A=new U;let P=0;const W=E===!0?e:t,_=E===!0?1:-1;for(let F=1;F<=r;F++)d.push(0,p*_,0),u.push(0,_,0),m.push(.5,.5),g++;const y=g;for(let F=0;F<=r;F++){const V=F/r*l+o,q=Math.cos(V),z=Math.sin(V);A.x=W*z,A.y=p*_,A.z=W*q,d.push(A.x,A.y,A.z),u.push(0,_,0),w.x=q*.5+.5,w.y=z*.5*_+.5,m.push(w.x,w.y),g++}for(let F=0;F<r;F++){const k=R+F,V=y+F;E===!0?h.push(V,V+1,k):h.push(V+1,V,k),P+=3}c.addGroup(f,P,E===!0?1:2),f+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bi(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ho extends bt{constructor(e=[],t=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:r};const s=[],a=[];o(r),c(i),h(),this.setAttribute("position",new at(s,3)),this.setAttribute("normal",new at(s.slice(),3)),this.setAttribute("uv",new at(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(x){const M=new U,E=new U,R=new U;for(let w=0;w<t.length;w+=3)m(t[w+0],M),m(t[w+1],E),m(t[w+2],R),l(M,E,R,x)}function l(x,M,E,R){const w=R+1,A=[];for(let P=0;P<=w;P++){A[P]=[];const W=x.clone().lerp(E,P/w),_=M.clone().lerp(E,P/w),y=w-P;for(let F=0;F<=y;F++)F===0&&P===w?A[P][F]=W:A[P][F]=W.clone().lerp(_,F/y)}for(let P=0;P<w;P++)for(let W=0;W<2*(w-P)-1;W++){const _=Math.floor(W/2);W%2===0?(u(A[P][_+1]),u(A[P+1][_]),u(A[P][_])):(u(A[P][_+1]),u(A[P+1][_+1]),u(A[P+1][_]))}}function c(x){const M=new U;for(let E=0;E<s.length;E+=3)M.x=s[E+0],M.y=s[E+1],M.z=s[E+2],M.normalize().multiplyScalar(x),s[E+0]=M.x,s[E+1]=M.y,s[E+2]=M.z}function h(){const x=new U;for(let M=0;M<s.length;M+=3){x.x=s[M+0],x.y=s[M+1],x.z=s[M+2];const E=p(x)/2/Math.PI+.5,R=f(x)/Math.PI+.5;a.push(E,1-R)}g(),d()}function d(){for(let x=0;x<a.length;x+=6){const M=a[x+0],E=a[x+2],R=a[x+4],w=Math.max(M,E,R),A=Math.min(M,E,R);w>.9&&A<.1&&(M<.2&&(a[x+0]+=1),E<.2&&(a[x+2]+=1),R<.2&&(a[x+4]+=1))}}function u(x){s.push(x.x,x.y,x.z)}function m(x,M){const E=x*3;M.x=e[E+0],M.y=e[E+1],M.z=e[E+2]}function g(){const x=new U,M=new U,E=new U,R=new U,w=new ze,A=new ze,P=new ze;for(let W=0,_=0;W<s.length;W+=9,_+=6){x.set(s[W+0],s[W+1],s[W+2]),M.set(s[W+3],s[W+4],s[W+5]),E.set(s[W+6],s[W+7],s[W+8]),w.set(a[_+0],a[_+1]),A.set(a[_+2],a[_+3]),P.set(a[_+4],a[_+5]),R.copy(x).add(M).add(E).divideScalar(3);const y=p(R);v(w,_+0,x,y),v(A,_+2,M,y),v(P,_+4,E,y)}}function v(x,M,E,R){R<0&&x.x===1&&(a[M]=x.x-1),E.x===0&&E.z===0&&(a[M]=R/2/Math.PI+.5)}function p(x){return Math.atan2(x.z,-x.x)}function f(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ho(e.vertices,e.indices,e.radius,e.details)}}class vs extends ho{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,r=1/i,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-i,0,-r,i,0,r,-i,0,r,i,-r,-i,0,-r,i,0,r,-i,0,r,i,0,-i,0,-r,i,0,-r,-i,0,r,i,0,r],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new vs(e.radius,e.detail)}}class us extends bt{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const h=[],d=new U,u=new U,m=[],g=[],v=[],p=[];for(let f=0;f<=i;f++){const x=[],M=f/i;let E=0;f===0&&a===0?E=.5/t:f===i&&l===Math.PI&&(E=-.5/t);for(let R=0;R<=t;R++){const w=R/t;d.x=-e*Math.cos(r+w*s)*Math.sin(a+M*o),d.y=e*Math.cos(a+M*o),d.z=e*Math.sin(r+w*s)*Math.sin(a+M*o),g.push(d.x,d.y,d.z),u.copy(d).normalize(),v.push(u.x,u.y,u.z),p.push(w+E,1-M),x.push(c++)}h.push(x)}for(let f=0;f<i;f++)for(let x=0;x<t;x++){const M=h[f][x+1],E=h[f][x],R=h[f+1][x],w=h[f+1][x+1];(f!==0||a>0)&&m.push(M,E,w),(f!==i-1||l<Math.PI)&&m.push(E,R,w)}this.setIndex(m),this.setAttribute("position",new at(g,3)),this.setAttribute("normal",new at(v,3)),this.setAttribute("uv",new at(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new us(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ki extends bt{constructor(e=1,t=.4,i=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:r,arc:s},i=Math.floor(i),r=Math.floor(r);const a=[],o=[],l=[],c=[],h=new U,d=new U,u=new U;for(let m=0;m<=i;m++)for(let g=0;g<=r;g++){const v=g/r*s,p=m/i*Math.PI*2;d.x=(e+t*Math.cos(p))*Math.cos(v),d.y=(e+t*Math.cos(p))*Math.sin(v),d.z=t*Math.sin(p),o.push(d.x,d.y,d.z),h.x=e*Math.cos(v),h.y=e*Math.sin(v),u.subVectors(d,h).normalize(),l.push(u.x,u.y,u.z),c.push(g/r),c.push(m/i)}for(let m=1;m<=i;m++)for(let g=1;g<=r;g++){const v=(r+1)*m+g-1,p=(r+1)*(m-1)+g-1,f=(r+1)*(m-1)+g,x=(r+1)*m+g;a.push(v,p,x),a.push(p,f,x)}this.setIndex(a),this.setAttribute("position",new at(o,3)),this.setAttribute("normal",new at(l,3)),this.setAttribute("uv",new at(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ki(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Gt extends ci{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ue(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ql,this.normalScale=new ze(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new sn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class o0 extends gc{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}class uo extends ft{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ue(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class l0 extends uo{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ue(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Qs=new st,bl=new U,El=new U;class c0{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ze(512,512),this.map=null,this.mapPass=null,this.matrix=new st,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ao,this._frameExtents=new ze(1,1),this._viewportCount=1,this._viewports=[new lt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;bl.setFromMatrixPosition(e.matrixWorld),t.position.copy(bl),El.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(El),t.updateMatrixWorld(),Qs.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Qs),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Qs)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class h0 extends c0{constructor(){super(new oo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class u0 extends uo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.target=new ft,this.shadow=new h0}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class d0 extends uo{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class f0{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Tl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Tl();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Tl(){return performance.now()}const Al=new st;class p0{constructor(e,t,i=0,r=1/0){this.ray=new ms(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new so,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Al.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Al),this}intersectObject(e,t=!0,i=[]){return qa(e,this,i,t),i.sort(wl),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)qa(e[r],this,i,t);return i.sort(wl),i}}function wl(n,e){return n.distance-e.distance}function qa(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let a=0,o=s.length;a<o;a++)qa(s[a],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ja}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ja);function m0(n){const e=new i0({canvas:n,antialias:!0});return e.setPixelRatio(Math.min(2,devicePixelRatio||1)),e.shadowMap.enabled=!0,e.shadowMap.type=kl,e.toneMapping=Hl,e.toneMappingExposure=1.05,e.outputColorSpace=Lt,e}function g0(n){const e=new r0;return e.background=new Ue(n),e.fog=new co(new Ue(n),90,200),e.add(new l0(16777215,9075290,.72)),e.add(new d0(7368816,.35)),e}function _0(n,e,t){const i=new u0(16774104,1.65);i.position.set(e*.5-22,46,t*.5-30),i.castShadow=!0,i.shadow.mapSize.set(2048,2048);const r=i.shadow.camera,s=Math.max(e,t)*.62;return r.left=-s,r.right=s,r.top=s,r.bottom=-s,r.near=1,r.far=160,i.shadow.bias=-4e-4,i.shadow.normalBias=.04,i.shadow.radius=5,i.target.position.set(e*.5,0,t*.5),n.add(i,i.target),i}class vc{constructor(e,t){this.target=new U,this.goalTarget=new U,this.frustum=20,this.az=0,this.pol=.6,this.dist=80,this.bw=e,this.bh=t,this.camera=new oo(-1,1,1,-1,-60,300),this.target.set(e/2,0,t/2),this.goalTarget.copy(this.target),this.place()}place(){const e=Math.sin(this.pol)*this.dist,t=Math.cos(this.pol)*this.dist;this.camera.position.set(this.target.x+e*Math.sin(this.az),this.target.y+t,this.target.z+e*Math.cos(this.az)),this.camera.up.set(0,1,0),this.camera.lookAt(this.target)}resize(e,t){const i=e/t,r=this.frustum;this.camera.left=-r*i,this.camera.right=r*i,this.camera.top=r,this.camera.bottom=-r,this.camera.updateProjectionMatrix()}follow(e,t){const i=Math.min(this.bw*.28,9),r=Math.min(this.bh*.22,11);this.goalTarget.set(gr.clamp(e,i,this.bw-i),0,gr.clamp(t,r,this.bh-r))}setFrustum(e,t,i){this.frustum=gr.clamp(e,9,34),this.resize(t,i)}zoomBy(e,t,i){this.setFrustum(this.frustum*e,t,i)}rotate(e){this.az-=e*.005,this.place()}tilt(e){this.pol=gr.clamp(this.pol-e*.004,.18,1.05),this.place()}update(e){this.target.lerp(this.goalTarget,Math.min(1,e*3.2)),this.place()}}const xc=26;function pn(n,e,t,i,r,s,a){n.fillStyle=r;for(let o=0;o<i;o++){n.globalAlpha=s*(.4+Math.random()*.6);const l=Math.random()*e,c=Math.random()*t,h=a*(.5+Math.random());n.beginPath(),n.arc(l,c,h,0,7),n.fill()}n.globalAlpha=1}const Cl={dirt(n,e,t){n.fillStyle="#8a6a44",n.fillRect(0,0,e,t),pn(n,e,t,2600,"#6f5334",.5,2.2),pn(n,e,t,1200,"#a07f52",.4,2.4)},sand(n,e,t){n.fillStyle="#e6c98a",n.fillRect(0,0,e,t),pn(n,e,t,3200,"#d3b273",.4,1.7),pn(n,e,t,900,"#f3ddab",.5,2)},sidewalk(n,e,t){n.fillStyle="#b9b3a6",n.fillRect(0,0,e,t),pn(n,e,t,1500,"#a49e90",.35,2.4),n.strokeStyle="rgba(120,114,100,0.5)",n.lineWidth=3;for(let i=0;i<t;i+=xc*6)n.beginPath(),n.moveTo(0,i),n.lineTo(e,i+(Math.random()-.5)*10),n.stroke()},cardboard(n,e,t){n.fillStyle="#cba875",n.fillRect(0,0,e,t),pn(n,e,t,1200,"#b9915f",.4,2.2),n.strokeStyle="rgba(150,110,70,0.28)",n.lineWidth=2;for(let i=0;i<e;i+=10)n.beginPath(),n.moveTo(i,0),n.lineTo(i,t),n.stroke()},grass(n,e,t){n.fillStyle="#5f8a3a",n.fillRect(0,0,e,t),pn(n,e,t,2600,"#4d7530",.5,2.4),pn(n,e,t,1200,"#7aa54a",.5,2.2)},mud:()=>{},water:()=>{},ramp:()=>{},chalk:()=>{},out:()=>{}};function v0(n,e,t,i){const[r,s]=t(e.x,e.y),a=(e.r??Math.max(e.hw,e.hh))*i;if(n.save(),n.beginPath(),e.r!=null)n.arc(r,s,a,0,7);else{const l=e.hw*i,c=e.hh*i;n.rect(r-l,s-c,l*2,c*2)}n.clip();const o=e.surface;if(o==="sand"){n.fillStyle="#ecd192",n.fillRect(r-a,s-a,a*2,a*2),pn(n,0,0,0,"",0,0),n.globalAlpha=1;for(let l=0;l<400;l++)n.globalAlpha=.3,n.fillStyle="#d8b96f",n.beginPath(),n.arc(r+(Math.random()-.5)*a*2,s+(Math.random()-.5)*a*2,1.6,0,7),n.fill();n.globalAlpha=1}else if(o==="mud"){const l=n.createRadialGradient(r,s,0,r,s,a);l.addColorStop(0,"#4a3620"),l.addColorStop(1,"#5c452a"),n.fillStyle=l,n.fillRect(r-a,s-a,a*2,a*2);for(let c=0;c<30;c++)n.globalAlpha=.3,n.fillStyle="#6b5335",n.beginPath(),n.arc(r+(Math.random()-.5)*a*1.6,s+(Math.random()-.5)*a*1.6,3+Math.random()*4,0,7),n.fill();n.globalAlpha=1}else if(o==="water"){const l=n.createRadialGradient(r,s,0,r,s,a);l.addColorStop(0,"rgba(90,170,205,0.85)"),l.addColorStop(1,"rgba(70,150,190,0.7)"),n.fillStyle=l,n.fillRect(r-a,s-a,a*2,a*2),n.strokeStyle="rgba(255,255,255,0.4)",n.lineWidth=2;for(let c=0;c<5;c++)n.beginPath(),n.arc(r,s,a*(.3+c*.15),.4,2.2),n.stroke()}else if(o==="ramp"){n.fillStyle="#d9b98a",n.fillRect(r-a,s-a,a*2,a*2);const l=e.dir??-1.57;n.save(),n.translate(r,s),n.rotate(l+1.57),n.fillStyle="rgba(255,255,255,0.55)";for(let c=-1;c<=1;c++)n.beginPath(),n.moveTo(-a*.4,a*.3-c*12),n.lineTo(0,-a*.3-c*12),n.lineTo(a*.4,a*.3-c*12),n.lineWidth=6,n.strokeStyle="rgba(255,255,255,0.6)",n.stroke();n.restore()}else if(o==="chalk")n.fillStyle="rgba(255,255,255,0.15)",n.fillRect(r-a,s-a,a*2,a*2);else if(o==="grass"){n.fillStyle="#5a8636",n.fillRect(r-a,s-a,a*2,a*2);for(let l=0;l<60;l++){n.strokeStyle="#6f9c40",n.lineWidth=2;const c=r+(Math.random()-.5)*a*2,h=s+(Math.random()-.5)*a*2;n.beginPath(),n.moveTo(c,h),n.lineTo(c+(Math.random()-.5)*6,h-6-Math.random()*6),n.stroke()}}else o==="sidewalk"?(n.fillStyle="#c6c0b2",n.fillRect(r-a,s-a,a*2,a*2)):o==="cardboard"&&(n.fillStyle="#d3b17e",n.fillRect(r-a,s-a,a*2,a*2));n.restore()}function x0(n){const e=n.path,t=n.half,i=[],r=[];for(let s=0;s<e.length;s++){const a=e[Math.max(0,s-1)],o=e[Math.min(e.length-1,s+1)];let l=-(o.y-a.y),c=o.x-a.x;const h=Math.hypot(l,c)||1;l/=h,c/=h;const d=t[s];i.push([e[s].x+l*d,e[s].y+c*d]),r.push([e[s].x-l*d,e[s].y-c*d])}return{L:i,R:r}}function M0(n){const e=Math.max(n.w,n.h),t=Math.max(7,Math.min(xc,Math.floor(3e3/e))),i=Math.round(n.w*t),r=Math.round(n.h*t),s=document.createElement("canvas");s.width=i,s.height=r;const a=s.getContext("2d"),o=(f,x)=>[f*t,r-x*t],l=()=>(Cl[n.ground]||Cl.dirt)(a,i,r);l();const{L:c,R:h}=x0(n),d=new Path2D;for(let f=0;f<n.path.length;f++){const[x,M]=o(n.path[f].x,n.path[f].y),E=n.half[f]*t;d.moveTo(x+E,M),d.arc(x,M,E,0,Math.PI*2)}for(const f of n.pads){const[x,M]=o(f.x,f.y),E=f.r*t;d.moveTo(x+E,M),d.arc(x,M,E,0,Math.PI*2)}a.fillStyle="rgba(18,12,6,0.42)",a.fillRect(0,0,i,r),a.save(),a.clip(d,"nonzero"),l(),a.restore();for(const f of n.patches)v0(a,f,o,t);const u=(f,x,M)=>{a.strokeStyle=M,a.lineWidth=x,a.lineJoin="round",a.lineCap="round",a.beginPath(),f.forEach((E,R)=>{const[w,A]=o(E[0],E[1]);R?a.lineTo(w,A):a.moveTo(w,A)}),a.stroke()};u(c,Math.max(3,t*.55),"rgba(35,22,10,0.55)"),u(h,Math.max(3,t*.55),"rgba(35,22,10,0.55)"),u(c,Math.max(1.6,t*.28),"rgba(255,250,238,0.95)"),u(h,Math.max(1.6,t*.28),"rgba(255,250,238,0.95)"),a.strokeStyle="rgba(255,255,255,0.30)",a.lineWidth=Math.max(2,t*.16),a.setLineDash([t,t*1.2]),a.beginPath(),n.path.forEach((f,x)=>{const[M,E]=o(f.x,f.y);x?a.lineTo(M,E):a.moveTo(M,E)}),a.stroke(),a.setLineDash([]),n.checkpoints.forEach((f,x)=>{if(x===0)return;const[M,E]=o(f.x,f.y);a.fillStyle="rgba(255,255,255,0.55)",a.beginPath(),a.arc(M,E,t*.4,0,7),a.fill(),a.fillStyle="rgba(60,60,60,0.7)",a.font=`bold ${Math.round(t*.7)}px sans-serif`,a.textAlign="center",a.textBaseline="middle",a.fillText(String(x),M,E+1)});const m=(f,x,M)=>{const[E,R]=o(f[0],f[1]),[w,A]=o(x[0],x[1]),P=w-E,W=A-R,_=Math.hypot(P,W)||1,y=-W/_,F=P/_,k=3,V=_/10;for(let q=0;q<k;q++)for(let z=0;z<10;z++){a.fillStyle=(q+z)%2?M:"#fff";const j=E+P*z/10+y*(q-1)*V,H=R+W*z/10+F*(q-1)*V;a.save(),a.translate(j,H),a.rotate(Math.atan2(W,P)),a.fillRect(0,-V/2,V,V),a.restore()}},g={x:-Math.sin(n.startAngle),y:Math.cos(n.startAngle)},v=n.half[0];m([n.start.x-g.x*v,n.start.y-g.y*v],[n.start.x+g.x*v,n.start.y+g.y*v],"#2a7d3a"),m([n.finish[0].x,n.finish[0].y],[n.finish[1].x,n.finish[1].y],"#222");const p=new _s(s);return p.colorSpace=Lt,p.anisotropy=4,p.needsUpdate=!0,p}function S0(n,e){const t=parseInt(n.slice(1),16);let i=(t>>16)+e,r=(t>>8&255)+e,s=(t&255)+e;return i=Math.min(255,i),r=Math.min(255,r),s=Math.min(255,s),`rgb(${i},${r},${s})`}function y0(n,e=1){const i=document.createElement("canvas");i.width=i.height=128;const r=i.getContext("2d"),s=128/2,a=128/2;if(n==="bomb")r.fillStyle="#c0392b",r.beginPath(),r.arc(s,a,128*.44,0,7),r.fill(),r.strokeStyle="#fff",r.lineWidth=14,r.lineCap="round",r.beginPath(),r.moveTo(s-28,a-28),r.lineTo(s+28,a+28),r.moveTo(s+28,a-28),r.lineTo(s-28,a+28),r.stroke();else{const l=e>=3?"#e0a020":e===2?"#2e9fa4":"#2ea44f";r.fillStyle=l,r.beginPath(),r.arc(s,a,128*.44,0,7),r.fill(),r.fillStyle="#fff",r.font="bold 58px sans-serif",r.textAlign="center",r.textBaseline="middle",r.fillText("+"+e,s,a+4)}const o=new _s(i);return o.colorSpace=Lt,o.anisotropy=4,o}function b0(n,e){const t=new vn,i=(a,o=.9)=>new Gt({color:a,roughness:o}),r=(a,o,l,c)=>new Ye(new Bi(a,o,l,12),i(c)),s=(a,o,l,c)=>new Ye(new zn(a,o,l),i(c));switch(n){case"twig":{const a=r(.09,.12,2.2,"#5a3f22");a.rotation.z=1.57,a.position.y=.12,t.add(a);break}case"leaf":{const a=new Ye(new us(.5,8,6),i(e||"#7a9b3a"));a.scale.set(1,.14,.7),a.position.y=.07,t.add(a);break}case"pebble":{const a=new Ye(new vs(.42),i("#b8ae98"));a.scale.y=.6,a.position.y=.2,t.add(a);break}case"grass":{for(let a=0;a<5;a++){const o=r(.02,.05,1.1,"#5f8a36");o.position.set((Math.random()-.5)*.5,.55,(Math.random()-.5)*.5),o.rotation.z=(Math.random()-.5)*.5,t.add(o)}break}case"shell":{const a=new Ye(new us(.42,10,8,0,6.3,0,1.6),i(e||"#f0dcc6"));a.position.y=.1,t.add(a);break}case"starfish":{const a=new Ye(new Bi(.55,.55,.12,5),i(e||"#e08a4a"));a.position.y=.1,t.add(a);break}case"castle":{const a=s(2.4,1.4,2.4,"#d8b878");a.position.y=.7,t.add(a);for(const[o,l]of[[-1,-1],[1,-1],[-1,1],[1,1]]){const c=r(.35,.4,1.9,"#d8b878");c.position.set(o,.95,l),t.add(c)}break}case"chalk":{const a=new Ye(new Gn(2.4,.7),new Gt({color:e||"#e8607a",roughness:1,transparent:!0,opacity:.85}));a.rotation.x=-1.57,a.position.y=.03,t.add(a);break}case"toy":{const a=s(1.1,.7,1.1,e||"#e0c040");a.position.y=.35,t.add(a);const o=r(.28,.28,.5,S0(e||"#e0c040",20));o.position.y=.9,t.add(o);break}case"box":{const a=s(2.4,1.6,2,"#c39a63");a.position.y=.8,a.castShadow=!0,t.add(a);const o=s(2.5,.14,2.1,"#a97f48");o.position.y=1.6,t.add(o);break}case"tape":{const a=s(2.2,.06,.6,"#d9d2c2");a.position.y=.05,t.add(a);break}case"pencil":{const a=r(.13,.13,3.2,e||"#e0b030");a.rotation.z=1.57,a.position.y=.16,t.add(a);const o=r(0,.13,.4,"#333");o.rotation.z=1.57,o.position.set(1.7,.16,0),t.add(o);break}case"cup":{const a=r(.85,.65,1.8,"#e8e4dc");a.position.y=.9,a.castShadow=!0,t.add(a);const o=r(.7,.55,1.6,"#b8b0a2");o.position.y=1.05,t.add(o);break}case"coin":{const a=r(.55,.55,.12,e||"#e0c050");a.position.y=.06,t.add(a);break}case"eraser":{const a=s(1,.5,.6,e||"#e06a8a");a.position.y=.25,t.add(a);break}case"straw":{const a=r(.1,.1,3,e||"#e05a5a");a.rotation.z=1.4,a.position.y=.14,t.add(a);break}}return t.traverse(a=>{a.isMesh&&(a.castShadow=!0,a.receiveShadow=!0)}),t}function E0(n){const e=new vn,t=[],i=new Ye(new zn(n.w+5,1.4,n.h+5),new Gt({color:n.bg,roughness:.95}));i.position.set(n.w/2,-.72,n.h/2),i.receiveShadow=!0,e.add(i);const r=M0(n);r.flipY=!1;const s=new Ye(new Gn(n.w,n.h),new Gt({map:r,roughness:.98}));s.rotation.x=-Math.PI/2,s.position.set(n.w/2,0,n.h/2),s.receiveShadow=!0,e.add(s);const a=n.wallCol||"#6b4e2e",o=new Gt({color:a,roughness:.85});for(const l of n.walls){const c=l.b.x-l.a.x,h=l.b.y-l.a.y,d=Math.hypot(c,h);if(d<.05)continue;const u=new Ye(new zn(d+.5,.9,.6),o);u.position.set((l.a.x+l.b.x)/2,.42,(l.a.y+l.b.y)/2),u.rotation.y=-Math.atan2(h,c),u.castShadow=!0,u.receiveShadow=!0,e.add(u)}for(const l of n.obstacles)if(l.type==="stone"){const c=new Ye(new vs(l.r,0),new Gt({color:"#9a948a",roughness:.9,flatShading:!0}));c.position.set(l.x,l.r*.55,l.y),c.scale.y=.8,c.rotation.set(Math.random(),Math.random(),Math.random()),c.castShadow=!0,c.receiveShadow=!0,e.add(c)}else if(l.type==="hole"){const c=new Ye(new ai(l.r,24),new Fn({color:1709068}));c.rotation.x=-Math.PI/2,c.position.set(l.x,.015,l.y),e.add(c);const h=new Ye(new ki(l.r,.13,8,24),new Gt({color:"#3a2c1a",roughness:1}));h.rotation.x=-Math.PI/2,h.position.set(l.x,.02,l.y),e.add(h)}else{const c=l.n||1,h=l.type==="bomb"?"#c0392b":c>=3?"#e0a020":c===2?"#2e9fa4":"#2ea44f",d=new Ye(new ai(l.r,24),new Fn({map:y0(l.type,c),transparent:!0}));d.rotation.x=-Math.PI/2,d.position.set(l.x,.03,l.y),e.add(d);const u=new Ye(new ai(l.r*1.5,24),new Fn({color:h,transparent:!0,opacity:.3,blending:is,depthWrite:!1}));u.rotation.x=-Math.PI/2,u.position.set(l.x,.025,l.y),e.add(u),t.push({mesh:u,kind:l.type,base:l.r*1.5})}for(const l of n.decor){const c=b0(l.kind,l.c);c.position.set(l.x,0,l.y),l.s&&c.scale.multiplyScalar(l.s),l.rot&&(c.rotation.y=l.rot),e.add(c)}for(const l of n.finish){const c=new Ye(new Bi(.08,.08,2.4,8),new Gt({color:"#eee"}));c.position.set(l.x,1.2,l.y),c.castShadow=!0,e.add(c);const h=new Ye(new Gn(1.2,.7),new Gt({color:"#e5484d",side:nn}));h.position.set(l.x+.6,2,l.y),e.add(h)}return{group:e,pulses:t}}const Rl={bal:{weight:1,slide:1,stability:1,bounce:1,control:1},glide:{weight:.93,slide:1.12,stability:.96,bounce:1.03,control:.98},heavy:{weight:1.13,slide:.9,stability:1.09,bounce:.9,control:1.01},precise:{weight:.98,slide:1,stability:1.08,bounce:.97,control:1.12},bouncy:{weight:.95,slide:1.05,stability:.95,bounce:1.15,control:.98},nimble:{weight:.9,slide:1.08,stability:1.02,bounce:1.02,control:1.05},tank:{weight:1.17,slide:.87,stability:1.13,bounce:.85,control:1},allround:{weight:1.05,slide:1.06,stability:1.06,bounce:1.05,control:1.06}},Pl={comum:0,rara:.012,epica:.028,lendaria:.05};function T0(n,e){const t=Rl[n]||Rl.bal,i=1+Pl[e],r=1+Pl[e]*.4,s=a=>+(a*(a>=1?i:r)).toFixed(3);return{weight:s(t.weight),slide:s(t.slide),stability:s(t.stability),bounce:s(t.bounce),control:s(t.control)}}function A0(n,e=38){const t=parseInt(n.replace("#",""),16),i=Math.max(0,(t>>16)-e),r=Math.max(0,(t>>8&255)-e),s=Math.max(0,(t&255)-e);return"#"+(i<<16|r<<8|s).toString(16).padStart(6,"0")}const w0={steel:"#c8ccd2",silver:"#d2d6db",gold:"#e8be55",copper:"#c67e46",dark:"#3a3e44"};function pe(n,e,t,i,r,s,a,o){return{id:n,name:e,rarity:t,unlock:i,stats:T0(r,t),top:s,side:A0(s),ring:w0[a.metal||"steel"],art:a,desc:o}}const mn=[pe("coca","Cola Vermelha","comum",0,"bal","#d81f26",{bg:["#e5343a","#c0121a"],metal:"steel",arcTop:["DRINK","#fff"],center:"Cola",centerColor:"#fff",centerFont:"script",centerSize:.5,sub:["DELICIOSA & GELADA","#ffd7a0"],vintage:.4},"A clássica. Equilibrada em tudo."),pe("grape","Uva Roxa","comum",0,"bal","#6a3d9a",{bg:["#7a4bb0","#54307c"],metal:"steel",arcTop:["GRAPE","#fff"],arcBot:["SODA","#fff"],emblem:"grape",emblemColor:"#dcc6f2",vintage:.35},"Refri de uva de sempre."),pe("orangecrush","Laranja Crush","comum",0,"bouncy","#e5761a",{bg:["#f79a2e","#dd6412"],metal:"steel",arcTop:["ORANGE","#7a2f10"],center:"Crush",centerColor:"#fff",centerFont:"script",centerSize:.5,sub:["SODA","#7a2f10"],vintage:.4},"Quica com gosto de laranja."),pe("sprite","Limão Verde","comum",0,"nimble","#2f8a52",{bg:["#f2f6ee","#d6e6cf"],metal:"steel",center:"Sprite",centerColor:"#1f7a3a",centerFont:"script",centerSize:.5,emblem:"star",emblemColor:"#3fae6a",emblemY:-.02,emblemScale:.5,sub:["LIMÃO","#1f7a3a"],vintage:.3},"Leve e ágil."),pe("rootbeer","Root Beer do Pop","comum",0,"heavy","#5a3418",{bg:["#6b4020","#3f2410"],metal:"copper",arcTop:["ROOT","#ffd7a0"],arcBot:["BEER","#ffd7a0"],emblem:"bottle",emblemColor:"#caa16b",vintage:.45},"Pesada, empurra geral."),pe("pinklem","Limonada Rosa","comum",0,"bouncy","#e86a9a",{bg:["#f7a8c6","#e06a95"],metal:"steel",arcTop:["PINK","#7a1f45"],arcBot:["LEMONADE","#7a1f45"],emblem:"clown",emblemColor:"#e86a9a",emblemColor2:"#c0392b",emblemScale:.9,vintage:.4},"Doce e saltitante."),pe("bubbleup","Bubble Up","comum",0,"nimble","#2fae4e",{bg:["#39c257","#1f8a3a"],metal:"steel",center:"Bubble up",centerColor:"#fff",centerFont:"script",centerSize:.36,sub:["LIMÃO·LIMA","#fff"],vintage:.35},"Borbulha e desliza."),pe("sevenup","Sete Acima","comum",0,"precise","#c0392b",{bg:["#eef0ea","#cfd2c8"],metal:"silver",center:"7up",centerColor:"#c0392b",centerFont:"slab",centerSize:.5,sub:["LEMON SODA","#2f8a52"],vintage:.4},"Limpa e precisa."),pe("cherrycoke","Cereja","comum",1,"bal","#e0489a",{bg:["#ec5aa6","#c02d78"],metal:"steel",center:"Cherry",centerColor:"#fff",centerFont:"script",centerSize:.42,emblem:"cherry",emblemColor:"#c0122a",emblemY:.42,emblemScale:.7,arcTop:["CHERRY COLA","#fff"],vintage:.35},"Cola com cereja."),pe("lemon","Bubble Lima","comum",1,"glide","#3fae6a",{bg:["#e9e2cf","#cfc7ac"],metal:"steel",arcTop:["LEMON","#3f7a2a"],center:"bubble up",centerColor:"#c0392b",centerFont:"script",centerSize:.34,sub:["LIME SODA","#3f7a2a"],vintage:.5},"Escorrega bastante."),pe("whistle","Whistle","comum",1,"bal","#e5761a",{bg:["#f79a2e","#e5761a"],metal:"steel",arcTop:["THIRSTY?","#0a3d91"],center:"WHISTLE",centerColor:"#0a3d91",centerFont:"block",centerSize:.34,sub:["JUST","#0a3d91"],vintage:.4},"Assobia de sede."),pe("moxie","Moxie","comum",2,"heavy","#d4341f",{bg:["#e5453a","#b8261a"],metal:"steel",arcTop:["TRADE MARK","#ffe9c0"],center:"Moxie",centerColor:"#fff",centerFont:"serif",centerSize:.5,sub:["SODA","#ffe9c0"],vintage:.5},"Amarga e teimosa."),pe("cheerwine","Cheerwine","comum",2,"bal","#cf1f2d",{bg:["#f4cf3a","#e0b21f"],metal:"steel",arcTop:["CHEERWINE","#c0122a"],center:"Since 1917",centerColor:"#c0122a",centerFont:"serif",centerSize:.22,emblem:"cherry",emblemColor:"#c0122a",emblemY:.4,emblemScale:.55,sub:["GOOD CHEER","#c0122a"],vintage:.4},"Cheia de bom humor."),pe("howdy","Howdy","comum",2,"bouncy","#e5761a",{bg:["#1c1c1c","#000"],metal:"steel",arcTop:["ORANGE","#f79420"],center:"Howdy",centerColor:"#f79420",centerFont:"script",centerSize:.46,sub:["SODA","#f79420"],vintage:.45},"Alegre e pula-pula."),pe("ski","Ski","comum",3,"nimble","#2f8a52",{bg:["#f2c200","#d9a800"],metal:"steel",band:["#1f7a3a","Ski","#f2c200"],sub:["CITRUS","#1f7a3a"],vintage:.35},"Cítrica e esperta."),pe("lucky","Lucky Club","comum",3,"bal","#c0392b",{bg:["#e9e6dc","#cfccc0"],metal:"silver",band:["#c0392b","Lucky Club","#fff"],emblem:"leaf",emblemColor:"#2f8a52",emblemY:-.42,emblemScale:.45,sub:["COLA","#0a3d91"],vintage:.4},"Um trevo de sorte."),pe("bonedry","Bone Dry","comum",3,"precise","#0a3d91",{bg:["#f2f2f0","#dcdcd8"],metal:"silver",arcTop:["GINGER ALE","#0a3d91"],center:"Bone Dry",centerColor:"#0a3d91",centerFont:"serif",centerSize:.36,vintage:.35},"Sequinha, boa de mira."),pe("sunnykid","Sunny Kid","comum",4,"glide","#1f7a3a",{bg:["#2f8a52","#186633"],metal:"steel",center:"Sunny Kid",centerColor:"#f4d76a",centerFont:"serif",centerSize:.34,emblem:"sunburst",emblemColor:"#f4d76a",emblemColor2:"#f4d76a",emblemY:0,emblemScale:.5,vintage:.45},"Desliza no sol."),pe("uptown","Up-Town","comum",4,"nimble","#1f7a3a",{bg:["#2f8a52","#155a2c"],metal:"steel",center:"up-town",centerColor:"#fff",centerFont:"script",centerSize:.4,emblem:"heart",emblemColor:"#e5484d",emblemY:.44,emblemScale:.4,vintage:.4},"Chique da cidade."),pe("dads","Dad's","comum",4,"heavy","#0a3d91",{bg:["#f2c200","#d9a800"],metal:"steel",arcTop:["SINCE 1937","#0a3d91"],center:"DAD'S",centerColor:"#c0392b",centerFont:"slab",centerSize:.42,sub:["OLD FASHIONED","#0a3d91"],vintage:.45},"Root beer do pai."),pe("mas","Ma's","comum",5,"bal","#6b7078",{bg:["#8a9098","#5a6068"],metal:"silver",arcTop:["NO DEPOSIT","#fff"],center:"Ma's",centerColor:"#e5484d",centerFont:"script",centerSize:.46,sub:["NO RETURN","#fff"],vintage:.45},"Caseira, sem devolução."),pe("wakeup","Wake Up","comum",5,"precise","#0a3d91",{bg:["#e9e6dc","#cfc7ac"],metal:"silver",center:"WAKE UP",centerColor:"#0a3d91",centerFont:"block",centerSize:.32,emblem:"star",emblemColor:"#0a3d91",emblemY:-.42,emblemScale:.4,vintage:.4},"Desperta e acerta."),pe("pickupper","Pick-Upper","comum",5,"nimble","#c0392b",{bg:["#eef0ea","#d0d2cc"],metal:"silver",center:"Pick-UPPER",centerColor:"#c0392b",centerFont:"block",centerSize:.3,sub:["CITRATE SODA","#8a8a80"],vintage:.4},"Levanta o astral."),pe("upanup","Up and Up","comum",6,"bal","#c0392b",{bg:["#e9e6dc","#cfc7ac"],metal:"silver",center:"UP and UP",centerColor:"#c0392b",centerFont:"block",centerSize:.3,vintage:.4},"Sempre pra cima."),pe("yup","Yup!","comum",6,"bouncy","#f2a400",{bg:["#f7c948","#e59a12"],metal:"steel",center:"Yup!",centerColor:"#1f7a3a",centerFont:"script",centerSize:.5,sub:["IS UP","#1f7a3a"],vintage:.4},"Positiva e saltitante."),pe("goody","Goody Uva","comum",7,"glide","#8e5bd0",{bg:["#f2d6f0","#dcb0e0"],metal:"steel",arcTop:["GOODY","#7c3aed"],center:"Goody",centerColor:"#7c3aed",centerFont:"script",centerSize:.46,sub:["GRAPE SODA","#7c3aed"],vintage:.4},"Boazinha e lisa."),pe("smile","Smile","comum",8,"nimble","#e5761a",{bg:["#f79420","#dd6412"],metal:"steel",center:"Smile",centerColor:"#fff",centerFont:"script",centerSize:.42,emblem:"orange",emblemColor:"#f4c04a",emblemY:.42,emblemScale:.45,vintage:.4},"Sempre sorrindo."),pe("pepsi","Pepsi-Cola","rara",5,"glide","#0a3d91",{bg:["#e5343a","#0a3d91"],metal:"steel",band:["#f2f2f2","Pepsi·Cola","#0a3d91"],vintage:.4},"Desliza suave e longe."),pe("drpepper","Dr Pepper","rara",6,"bal","#6e1f2b",{bg:["#7a1f2b","#4f141c"],metal:"steel",arcTop:["SINCE 1891","#f2c6c0"],center:"Dr Pepper",centerColor:"#fff",centerFont:"slab",centerSize:.3,sub:["DUBLIN · TEXAS","#f2c6c0"],vintage:.4},"Vinte e três sabores."),pe("felix","Felix Orange Dry","rara",7,"bal","#e5761a",{bg:["#f79420","#c85f12"],metal:"gold",arcTop:["FELIX","#3a1c08"],emblem:"bear",emblemColor:"#3a1c08",emblemY:-.34,emblemScale:.42,center:"ORANGE",centerColor:"#3a1c08",centerFont:"slab",centerSize:.28,sub:["DRY","#3a1c08"],vintage:.5},"O gato da laranja."),pe("eskimo","Eskimo Cream","rara",7,"precise","#0a3d91",{bg:["#1a4fa0","#0a2f70"],metal:"silver",emblem:"bear",emblemColor:"#eef3ff",emblemY:-.36,emblemScale:.42,center:"Eskimo",centerColor:"#fff",centerFont:"script",centerSize:.42,sub:["CREAM SODA","#cfe0ff"],vintage:.4},"Cremosa e certeira."),pe("lemmy","Lemmy Lemonade","rara",8,"nimble","#8a6b1f",{bg:["#3a2c10","#1c1508"],metal:"gold",arcTop:["LEMMY","#f4d76a"],center:"LEMONADE",centerColor:"#f4d76a",centerFont:"slab",centerSize:.24,emblem:"lemon",emblemColor:"#f4d76a",emblemY:.42,emblemScale:.5,vintage:.55},"Azedinha e ligeira."),pe("bluebird","Blue Bird","rara",8,"glide","#6a1f45",{bg:["#7a2b52","#521636"],metal:"gold",arcTop:["ARTIFICIAL COLOR","#f2c6d8"],center:"Blue Bird",centerColor:"#f4d76a",centerFont:"serif",centerSize:.3,sub:["GRAPE SODA","#f2c6d8"],vintage:.5},"Voa raspando o chão."),pe("bigtop","Big Top","rara",9,"bouncy","#e5761a",{bg:["#f79420","#dd6412"],metal:"steel",arcTop:["ORANGE","#fff"],band:["#c0392b","BIG TOP","#fff"],sub:["SODA","#fff"],vintage:.45},"Circo laranja saltitante."),pe("applejack","Apple Jack","rara",9,"nimble","#3fae6a",{bg:["#f2d64a","#d9b21f"],metal:"steel",center:"Apple Jack",centerColor:"#1f7a3a",centerFont:"serif",centerSize:.3,emblem:"apple",emblemColor:"#3fae6a",emblemY:.42,emblemScale:.5,vintage:.4},"Maçã ligeira."),pe("jacksup","Jack's-Up","rara",10,"bal","#c0392b",{bg:["#f2f2f0","#dcdcd8"],metal:"silver",center:"Jack's-Up",centerColor:"#c0392b",centerFont:"script",centerSize:.4,emblem:"cards",emblemY:-.42,emblemScale:.55,vintage:.4},"Aposta certeira."),pe("blimey","Blimey","rara",10,"glide","#1f7a3a",{bg:["#e9e6dc","#cfc7ac"],metal:"steel",arcTop:["LEMON LIME","#1f7a3a"],center:"blimey",centerColor:"#1f7a3a",centerFont:"script",centerSize:.44,sub:["SODA","#1f7a3a"],vintage:.45},"Desliza que é uma beleza."),pe("lincoln","Lincoln Grape","rara",11,"heavy","#7c3aed",{bg:["#8a5bc0","#5a2f8a"],metal:"steel",arcTop:["LINCOLN","#fff"],center:"GRAPE",centerColor:"#fff",centerFont:"slab",centerSize:.32,sub:["SODA","#fff"],vintage:.5},"Presidencial e firme."),pe("royalpalm","Royal Palm","rara",12,"bal","#8a1220",{bg:["#a01a2a","#6a0c18"],metal:"gold",arcTop:["ROYAL PALM","#f4d76a"],center:"STRAWBERRY",centerColor:"#f4d76a",centerFont:"slab",centerSize:.2,emblem:"leaf",emblemColor:"#f4d76a",emblemY:.44,emblemScale:.4,sub:["SODA","#f4d76a"],vintage:.5},"Morango real."),pe("dilly","Dilly","rara",12,"nimble","#c0392b",{bg:["#f2ead0","#dcd2b0"],metal:"steel",center:"Dilly",centerColor:"#c0392b",centerFont:"script",centerSize:.5,sub:["FOR THIRST","#8a6b2a"],vintage:.5},"Uma gracinha ágil."),pe("chaser","Chaser","rara",13,"nimble","#1f7a3a",{bg:["#2f8a52","#155a2c"],metal:"steel",center:"Chaser",centerColor:"#f4d76a",centerFont:"script",centerSize:.5,vintage:.35},"Persegue e alcança."),pe("sport","Sport","rara",14,"bal","#c0392b",{bg:["#f2f2f0","#d8d8d4"],metal:"silver",arcTop:["SPORT","#c0392b"],center:"WINNER",centerColor:"#c0392b",centerFont:"slab",centerSize:.26,emblem:"star",emblemColor:"#c0392b",emblemY:.42,emblemScale:.4,sub:["EVERY TIME","#c0392b"],vintage:.4},"Espírito esportivo."),pe("jolt","Jolt","rara",15,"bouncy","#e5484d",{bg:["#e5343a","#b8241a"],metal:"steel",center:"JOLT",centerColor:"#fff",centerFont:"slab",centerSize:.4,emblem:"bolt",emblemColor:"#f4d76a",emblemY:-.4,emblemScale:.5,vintage:.35},"Um choque de energia."),pe("charge","Charge Up","rara",16,"nimble","#1f7a3a",{bg:["#e9e6dc","#cfc7ac"],metal:"silver",arcTop:["MISSION","#1f7a3a"],center:"CHARGE UP",centerColor:"#1f7a3a",centerFont:"block",centerSize:.24,emblem:"bolt",emblemColor:"#1f7a3a",emblemY:.42,emblemScale:.4,vintage:.4},"Carrega e dispara."),pe("stepn","Step 'N High","rara",16,"precise","#c0392b",{bg:["#eef0ea","#d0d2cc"],metal:"silver",arcTop:["STEP 'N","#c0392b"],center:"HIGH",centerColor:"#c0392b",centerFont:"slab",centerSize:.3,sub:["TO REFRESH","#c0392b"],vintage:.4},"Sobe degraus com jeito."),pe("dragon","Dragon Cream","epica",16,"heavy","#0a3d91",{bg:["#123a80","#08245a"],metal:"gold",arcTop:["DRAGON","#f4d76a"],emblem:"dragon",emblemColor:"#f4d76a",emblemY:-.06,emblemScale:.7,sub:["CREAM SODA","#f4d76a"],vintage:.5},"O dragão que empurra tudo."),pe("donaldsoda","Pato Laranja","epica",18,"bouncy","#e5761a",{bg:["#f2ead0","#dccea0"],metal:"steel",arcTop:["DONALD DUCK","#0a3d91"],emblem:"duck",emblemColor:"#fff",emblemColor2:"#f2a400",emblemY:-.32,emblemScale:.5,center:"ORANGE",centerColor:"#e5761a",centerFont:"slab",centerSize:.24,sub:["SODA","#0a3d91"],vintage:.45},"O pato mais saltitante."),pe("donaldcola","Pato Cola","epica",20,"nimble","#1f6ea0",{bg:["#2f8ac0","#155a80"],metal:"steel",arcTop:["DONALD DUCK","#f4d76a"],center:"Cola",centerColor:"#f4d76a",centerFont:"script",centerSize:.4,emblem:"duck",emblemColor:"#fff",emblemColor2:"#f2a400",emblemY:-.36,emblemScale:.6,vintage:.4},"Ágil como um pato."),pe("vegasvic","Vegas Vic","epica",22,"bal","#6e2a12",{bg:["#7a3418","#4f200c"],metal:"gold",arcTop:["VEGAS VIC","#f4d76a"],center:"ROOT BEER",centerColor:"#f4d76a",centerFont:"slab",centerSize:.26,emblem:"star",emblemColor:"#f4d76a",emblemY:.42,emblemScale:.45,vintage:.5},"O caubói da estrada."),pe("royalflush","Royal Flush","epica",24,"bal","#c0122a",{bg:["#d4142e","#8a0c1e"],metal:"gold",arcTop:["LOGANBERRY","#f4d76a"],center:"PORT",centerColor:"#f4d76a",centerFont:"slab",centerSize:.26,emblem:"cards",emblemY:-.4,emblemScale:.5,sub:["ROYAL FLUSH","#f4d76a"],vintage:.5},"A mão vencedora."),pe("strawmilk","Leite Morango","epica",26,"heavy","#c0392b",{bg:["#e07a5a","#c05a3a"],metal:"steel",arcTop:["STRAWBERRY","#fff"],center:"MILK",centerColor:"#fff",centerFont:"slab",centerSize:.34,emblem:"cherry",emblemColor:"#c0122a",emblemY:.44,emblemScale:.45,vintage:.45},"Cremosa e encorpada."),pe("brownie","Brownie","epica",28,"heavy","#4a2c12",{bg:["#5a3418","#33200c"],metal:"copper",arcTop:["BROWNIE","#e9c9a0"],arcBot:["ROOT BEER","#e9c9a0"],emblem:"bear",emblemColor:"#e9c9a0",emblemScale:.85,vintage:.55},"O duende do root beer."),pe("jurk","Jurk","epica",30,"nimble","#1f7a3a",{bg:["#e9e6dc","#cfc7ac"],metal:"steel",center:"Jurk",centerColor:"#1f7a3a",centerFont:"script",centerSize:.5,emblem:"lemon",emblemColor:"#f4d76a",emblemY:-.4,emblemScale:.45,vintage:.45},"Cítrica misteriosa."),pe("rcorange","Royal Crown","epica",32,"glide","#e5761a",{bg:["#f79420","#c85f12"],metal:"gold",arcTop:["ROYAL","#3a1c08"],center:"ORANGE",centerColor:"#3a1c08",centerFont:"slab",centerSize:.28,emblem:"crown",emblemColor:"#f4d76a",emblemY:-.42,emblemScale:.45,vintage:.45},"Corôa que desliza."),pe("slender","Slender","epica",34,"glide","#c0392b",{bg:["#c9b89a","#a89670"],metal:"copper",center:"Slender",centerColor:"#c0392b",centerFont:"script",centerSize:.46,vintage:.6},"Fininha e escorregadia."),pe("kona","Kona","epica",36,"bal","#e5a400",{bg:["#f2b400","#c98a00"],metal:"gold",arcTop:["KONA","#3a2c08"],center:"BREWING",centerColor:"#3a2c08",centerFont:"slab",centerSize:.24,emblem:"wave",emblemColor:"#0a6ea0",emblemColor2:"#0a6ea0",emblemY:.36,emblemScale:.5,vintage:.35},"Onda do Havaí."),pe("newcastle","Newcastle","epica",38,"heavy","#6a1f2b",{bg:["#7a1f2b","#4f141c"],metal:"silver",center:"BROWN ALE",centerColor:"#fff",centerFont:"slab",centerSize:.24,emblem:"star6",emblemColor:"#3fae6a",emblemColor2:"#f2c200",emblemY:-.02,emblemScale:.8,vintage:.4},"A estrela azul da cerveja."),pe("cocagold","Cola Ouro Atlanta","lendaria",30,"allround","#f2c200",{bg:["#f7d84a","#e0a800"],metal:"gold",arcTop:["DELICIOUS · REFRESHING","#7a1f10"],center:"Cola",centerColor:"#c0122a",centerFont:"script",centerSize:.44,sub:["ATLANTA","#7a1f10"],vintage:.35},"A joia dourada. Leve vantagem em tudo."),pe("duvel","Duvel","lendaria",36,"allround","#c0392b",{bg:["#f2ead0","#dcceA0"],metal:"silver",center:"Duvel",centerColor:"#c0122a",centerFont:"script",centerSize:.5,emblem:"star",emblemColor:"#c0122a",emblemY:-.42,emblemScale:.35,vintage:.3},"Diabólica e perfeita."),pe("sierra","Sierra Nevada","lendaria",42,"allround","#0f7a3a",{bg:["#e9e6dc","#cfc7ac"],metal:"gold",arcTop:["SIERRA NEVADA","#0f7a3a"],center:"PALE ALE",centerColor:"#0f7a3a",centerFont:"slab",centerSize:.22,emblem:"leaf",emblemColor:"#0f7a3a",emblemY:.36,emblemScale:.5,vintage:.35},"Montanha de qualidade."),pe("newbelgium","New Belgium","lendaria",48,"allround","#e5761a",{bg:["#f2c200","#d99000"],metal:"gold",arcTop:["NEW BELGIUM","#7a2f08"],center:"BREWING",centerColor:"#7a2f08",centerFont:"slab",centerSize:.22,emblem:"ring",emblemColor:"#c0392b",emblemY:.02,emblemScale:.9,vintage:.35},"A bicicleta que voa."),pe("spaten","Spaten","lendaria",55,"allround","#c0122a",{bg:["#f2f2f0","#dcdcd8"],metal:"silver",arcTop:["SPATEN","#c0122a"],center:"München",centerColor:"#c0122a",centerFont:"serif",centerSize:.3,emblem:"shield",emblemColor:"#c0122a",emblemY:-.4,emblemScale:.4,vintage:.3},"Realeza de Munique."),pe("newbelgium2","Great Lakes 30","lendaria",62,"allround","#5a7ab0",{bg:["#7a9ad0","#4f6ea0"],metal:"silver",arcTop:["GREAT LAKES","#fff"],center:"30",centerColor:"#fff",centerFont:"slab",centerSize:.5,sub:["EST. 1988","#dceaff"],vintage:.3},"Três décadas de lenda."),pe("goldenleaf","Golden Leaf","lendaria",70,"allround","#f2c200",{bg:["#1c1c1c","#000"],metal:"gold",arcTop:["GOLDEN LEAF","#f4d76a"],emblem:"glass",emblemColor:"#f4d76a",emblemY:-.34,emblemScale:.42,center:"WHEAT",centerColor:"#f4d76a",centerFont:"slab",centerSize:.26,vintage:.3},"A folha de ouro."),pe("felixgold","Felix Dourado","lendaria",78,"allround","#f2a400",{bg:["#f7c948","#e59a12"],metal:"gold",arcTop:["FELIX","#3a1c08"],emblem:"bear",emblemColor:"#3a1c08",emblemY:.02,emblemScale:.72,sub:["ORANGE DRY","#3a1c08"],vintage:.4},"O gato lendário do ouro.")],ji=["#e5484d","#3b82f6","#3fae6a","#f7d046","#f59e0b","#7c3aed"],ir=n=>mn.find(e=>e.id===n)||mn[0],C0=n=>mn.filter(e=>n>=e.unlock),Ll={comum:"#9aa2ac",rara:"#3b82f6",epica:"#a855f7",lendaria:"#f5b400"},R0={comum:"Comum",rara:"Rara",epica:"Épica",lendaria:"Lendária"},P0=["comum","rara","epica","lendaria"],Te=Math.PI*2;function L0(n,e,t,i,r){if(typeof r=="string")return r;const s=n.createRadialGradient(e-i*.18,t-i*.22,i*.1,e,t,i);return s.addColorStop(0,r[0]),s.addColorStop(1,r[1]),s}function Dl(n,e,t,i,r,s,a,o){n.save(),n.fillStyle=o,n.font=a,n.textAlign="center",n.textBaseline="middle";const l=[...e];let c=0;const h=l.map(m=>{const g=n.measureText(m).width+r*.02;return c+=g,g}),d=c/r;let u=s?-Math.PI/2-d/2:Math.PI/2+d/2;for(let m=0;m<l.length;m++){const g=h[m]/r;u+=(s?1:-1)*g/2,n.save(),n.translate(t+Math.cos(u)*r,i+Math.sin(u)*r),n.rotate(s?u+Math.PI/2:u-Math.PI/2),n.fillText(l[m],0,0),n.restore(),u+=(s?1:-1)*g/2}n.restore()}function D0(n,e,t,i,r){let s=i;for(n.font=`${r} ${s}px sans-serif`;n.measureText(e).width>t&&s>8;)s-=2,n.font=`${r} ${s}px sans-serif`;return s}function I0(n,e,t=!0){n.beginPath(),e.forEach((i,r)=>r?n.lineTo(i[0],i[1]):n.moveTo(i[0],i[1])),t&&n.closePath()}function ns(n,e,t,i,r,s,a=-Math.PI/2){n.beginPath();for(let o=0;o<s*2;o++){const l=o%2?r:i,c=a+o/(s*2)*Te,h=e+Math.cos(c)*l,d=t+Math.sin(c)*l;o?n.lineTo(h,d):n.moveTo(h,d)}n.closePath()}function U0(n,e,t,i,r,s,a){n.save(),n.translate(t,i);const o=c=>{n.fillStyle=c,n.fill()},l=(c,h)=>{n.strokeStyle=c,n.lineWidth=h,n.lineJoin="round",n.lineCap="round",n.stroke()};switch(e){case"star":ns(n,0,0,r,r*.42,5),o(s);break;case"star6":ns(n,0,0,r,r*.5,6),o(s);break;case"sunburst":{for(let c=0;c<16;c++){const h=c/16*Te;n.save(),n.rotate(h),n.beginPath(),n.moveTo(r*.5,-r*.06),n.lineTo(r*1.05,0),n.lineTo(r*.5,r*.06),n.closePath(),o(s),n.restore()}n.beginPath(),n.arc(0,0,r*.5,0,Te),o(a||s);break}case"cherry":{n.beginPath(),n.moveTo(-r*.1,-r*.9),n.bezierCurveTo(r*.3,-r*.7,-r*.4,-r*.1,-r*.35,r*.2),l("#3c6b2e",r*.1),n.beginPath(),n.moveTo(-r*.1,-r*.9),n.bezierCurveTo(r*.4,-r*.6,r*.5,-r*.1,r*.45,r*.2),l("#3c6b2e",r*.1),n.beginPath(),n.arc(-r*.38,r*.5,r*.34,0,Te),o(s),n.beginPath(),n.arc(r*.42,r*.45,r*.34,0,Te),o(s),n.fillStyle="rgba(255,255,255,.5)",n.beginPath(),n.arc(-r*.48,r*.4,r*.09,0,Te),n.arc(r*.32,r*.35,r*.09,0,Te),n.fill();break}case"grape":{n.fillStyle=s,[[-.5,-.4,.5],[-.75,-.25,.25,.75],[-.5,0,.5],[-.25,.25],[0]].forEach((h,d)=>h.forEach(u=>{n.beginPath(),n.arc(u*r,(-.55+d*.34)*r,r*.2,0,Te),n.fill()})),n.strokeStyle="#3c6b2e",n.lineWidth=r*.09,n.beginPath(),n.moveTo(0,-r*.75),n.lineTo(r*.2,-r*1.05),n.stroke();break}case"orange":{n.beginPath(),n.arc(0,0,r,0,Te),o(s),n.strokeStyle="rgba(255,255,255,.55)",n.lineWidth=r*.06;for(let c=0;c<8;c++){const h=c/8*Te;n.beginPath(),n.moveTo(0,0),n.lineTo(Math.cos(h)*r*.9,Math.sin(h)*r*.9),n.stroke()}n.beginPath(),n.arc(0,0,r*.16,0,Te),n.fillStyle="rgba(255,255,255,.4)",n.fill();break}case"lemon":{n.save(),n.rotate(-.5),n.beginPath(),n.ellipse(0,0,r,r*.62,0,0,Te),o(s),n.beginPath(),n.moveTo(-r,0),n.lineTo(-r*1.18,0),l(s,r*.14),n.beginPath(),n.moveTo(r,0),n.lineTo(r*1.18,0),l(s,r*.14),n.restore();break}case"apple":{n.beginPath(),n.moveTo(0,-r*.5),n.bezierCurveTo(-r*1.1,-r*1.1,-r*1.1,r*.5,0,r),n.bezierCurveTo(r*1.1,r*.5,r*1.1,-r*1.1,0,-r*.5),o(s),n.strokeStyle="#3c6b2e",n.lineWidth=r*.11,n.beginPath(),n.moveTo(0,-r*.5),n.lineTo(r*.08,-r*.95),n.stroke(),n.fillStyle="#3c6b2e",n.beginPath(),n.ellipse(r*.35,-r*.85,r*.28,r*.14,-.6,0,Te),n.fill();break}case"bottle":{n.fillStyle=s,n.beginPath(),n.moveTo(-r*.28,-r),n.lineTo(r*.28,-r),n.lineTo(r*.28,-r*.5),n.bezierCurveTo(r*.55,-r*.3,r*.5,r*.9,r*.4,r),n.lineTo(-r*.4,r),n.bezierCurveTo(-r*.5,r*.9,-r*.55,-r*.3,-r*.28,-r*.5),n.closePath(),n.fill(),n.fillStyle="rgba(255,255,255,.3)",n.fillRect(-r*.2,-r*.2,r*.14,r*.9);break}case"duck":{n.fillStyle=s,n.beginPath(),n.arc(-r*.1,-r*.15,r*.6,0,Te),n.fill(),n.beginPath(),n.arc(r*.4,-r*.35,r*.4,0,Te),n.fill(),n.fillStyle=a||"#f2a400",n.beginPath(),n.moveTo(r*.7,-r*.35),n.quadraticCurveTo(r*1.25,-r*.25,r*.75,-r*.05),n.closePath(),n.fill(),n.fillStyle="#222",n.beginPath(),n.arc(r*.5,-r*.42,r*.07,0,Te),n.fill();break}case"bear":{n.fillStyle=s,n.beginPath(),n.arc(0,r*.2,r*.7,0,Te),n.fill(),n.beginPath(),n.arc(0,-r*.55,r*.42,0,Te),n.fill(),n.beginPath(),n.arc(-r*.32,-r*.85,r*.16,0,Te),n.arc(r*.32,-r*.85,r*.16,0,Te),n.fill(),n.fillStyle="#222",n.beginPath(),n.arc(-r*.14,-r*.6,r*.06,0,Te),n.arc(r*.14,-r*.6,r*.06,0,Te),n.arc(0,-r*.42,r*.08,0,Te),n.fill();break}case"clown":{n.fillStyle="#ffe0c4",n.beginPath(),n.arc(0,r*.1,r*.62,0,Te),n.fill(),n.fillStyle=s,n.beginPath(),n.arc(0,r*.35,r*.22,0,Te),n.fill(),n.beginPath(),n.arc(-r*.5,r*.05,r*.2,0,Te),n.arc(r*.5,r*.05,r*.2,0,Te),n.fill(),n.fillStyle=a||"#c0392b",n.beginPath(),n.moveTo(-r*.55,-r*.45),n.lineTo(0,-r),n.lineTo(r*.55,-r*.45),n.closePath(),n.fill(),n.fillStyle="#222",n.beginPath(),n.arc(-r*.2,r*.02,r*.06,0,Te),n.arc(r*.2,r*.02,r*.06,0,Te),n.fill();break}case"goat":{n.fillStyle=s,n.beginPath(),n.moveTo(0,r),n.lineTo(-r*.4,r*.2),n.lineTo(-r*.2,-r*.4),n.lineTo(0,-r*.2),n.lineTo(r*.2,-r*.4),n.lineTo(r*.4,r*.2),n.closePath(),n.fill(),n.strokeStyle=s,n.lineWidth=r*.14,n.beginPath(),n.moveTo(-r*.2,-r*.4),n.quadraticCurveTo(-r*.7,-r*.7,-r*.4,-r*1.05),n.moveTo(r*.2,-r*.4),n.quadraticCurveTo(r*.7,-r*.7,r*.4,-r*1.05),n.stroke();break}case"eagle":{n.fillStyle=s,n.beginPath(),n.moveTo(0,-r*.2),n.quadraticCurveTo(-r*1.1,-r*.7,-r*1.2,0),n.quadraticCurveTo(-r*.6,0,0,r*.4),n.quadraticCurveTo(r*.6,0,r*1.2,0),n.quadraticCurveTo(r*1.1,-r*.7,0,-r*.2),n.fill(),n.beginPath(),n.arc(0,-r*.45,r*.28,0,Te),n.fill(),n.fillStyle=a||"#f2a400",n.beginPath(),n.moveTo(0,-r*.3),n.lineTo(r*.18,-r*.1),n.lineTo(-r*.18,-r*.1),n.closePath(),n.fill();break}case"diamond":{n.beginPath(),n.moveTo(0,-r),n.lineTo(r*.7,0),n.lineTo(0,r),n.lineTo(-r*.7,0),n.closePath(),o(s),n.fillStyle="rgba(255,255,255,.35)",n.beginPath(),n.moveTo(0,-r),n.lineTo(r*.35,-r*.5),n.lineTo(0,0),n.lineTo(-r*.35,-r*.5),n.closePath(),n.fill();break}case"cards":{const c=(h,d)=>{n.save(),n.translate(h,0),n.rotate(d),n.fillStyle="#fff",n.strokeStyle="#c0392b",n.lineWidth=r*.04,n.beginPath(),n.rect(-r*.32,-r*.5,r*.64,r),n.fill(),n.stroke(),n.fillStyle="#c0392b",ns(n,0,-r*.22,r*.16,r*.07,5),n.fill(),n.restore()};c(-r*.28,-.28),c(r*.28,.28),c(0,0);break}case"bolt":{n.fillStyle=s,I0(n,[[-r*.1,-r],[r*.5,-r*.15],[r*.1,-r*.15],[r*.4,r],[-r*.5,-r*.05],[-r*.05,-r*.05]]),n.fill();break}case"crown":{n.fillStyle=s,n.beginPath(),n.moveTo(-r,r*.5),n.lineTo(-r,-r*.3),n.lineTo(-r*.5,r*.1),n.lineTo(0,-r*.6),n.lineTo(r*.5,r*.1),n.lineTo(r,-r*.3),n.lineTo(r,r*.5),n.closePath(),n.fill();break}case"buddha":{n.fillStyle=s,n.beginPath(),n.arc(0,r*.35,r*.75,0,Math.PI),n.fill(),n.beginPath(),n.arc(0,-r*.35,r*.4,0,Te),n.fill(),n.fillStyle="rgba(0,0,0,.25)",n.beginPath(),n.arc(0,r*.4,r*.45,.2,Math.PI-.2),n.stroke();break}case"wave":{n.strokeStyle=s,n.lineWidth=r*.34,n.beginPath(),n.arc(-r*.2,r*.1,r*.7,-Math.PI*.85,Math.PI*.2),n.stroke(),n.fillStyle=a||s;for(const[c,h]of[[-.7,.5],[-.3,.7],[.2,.6]])n.beginPath(),n.arc(c*r,h*r,r*.12,0,Te),n.fill();break}case"key":{n.strokeStyle=s,n.lineWidth=r*.18,n.beginPath(),n.arc(-r*.5,0,r*.4,0,Te),n.stroke(),n.beginPath(),n.moveTo(-r*.15,0),n.lineTo(r*.9,0),n.moveTo(r*.7,0),n.lineTo(r*.7,r*.35),n.moveTo(r*.9,0),n.lineTo(r*.9,r*.45),n.stroke();break}case"shield":{n.fillStyle=s,n.beginPath(),n.moveTo(0,-r),n.lineTo(r*.8,-r*.6),n.lineTo(r*.7,r*.3),n.quadraticCurveTo(r*.4,r,0,r*1.05),n.quadraticCurveTo(-r*.4,r,-r*.7,r*.3),n.lineTo(-r*.8,-r*.6),n.closePath(),n.fill();break}case"heart":{n.fillStyle=s,n.beginPath(),n.moveTo(0,r*.9),n.bezierCurveTo(-r*1.3,-r*.1,-r*.5,-r,0,-r*.35),n.bezierCurveTo(r*.5,-r,r*1.3,-r*.1,0,r*.9),n.fill();break}case"glass":{n.fillStyle=s,n.beginPath(),n.moveTo(-r*.5,-r*.7),n.lineTo(r*.5,-r*.7),n.lineTo(r*.32,r*.8),n.lineTo(-r*.32,r*.8),n.closePath(),n.fill(),n.fillStyle="#fff",n.beginPath(),n.ellipse(0,-r*.7,r*.5,r*.16,0,0,Te),n.fill();break}case"snow":{n.strokeStyle=s,n.lineWidth=r*.1;for(let c=0;c<6;c++)n.save(),n.rotate(c/6*Te),n.beginPath(),n.moveTo(0,0),n.lineTo(0,-r),n.moveTo(0,-r*.6),n.lineTo(r*.25,-r*.8),n.moveTo(0,-r*.6),n.lineTo(-r*.25,-r*.8),n.stroke(),n.restore();break}case"leaf":{n.fillStyle=s,n.beginPath(),n.moveTo(0,r),n.bezierCurveTo(-r,r*.2,-r*.6,-r,0,-r),n.bezierCurveTo(r*.6,-r,r,r*.2,0,r),n.fill(),n.strokeStyle="rgba(0,0,0,.2)",n.lineWidth=r*.06,n.beginPath(),n.moveTo(0,r),n.lineTo(0,-r),n.stroke();break}case"pinup":{n.fillStyle=s,n.beginPath(),n.arc(0,-r*.5,r*.32,0,Te),n.fill(),n.beginPath(),n.moveTo(-r*.3,-r*.2),n.quadraticCurveTo(0,r*.1,r*.3,-r*.2),n.quadraticCurveTo(r*.6,r*.7,0,r),n.quadraticCurveTo(-r*.6,r*.7,-r*.3,-r*.2),n.fill();break}case"dragon":{n.fillStyle=s,n.beginPath(),n.moveTo(-r,r*.3),n.quadraticCurveTo(-r*.2,-r*.2,r*.3,-r*.5),n.quadraticCurveTo(r,-r,r*.9,-r*.1),n.quadraticCurveTo(r*.4,r*.2,r*.5,r*.8),n.quadraticCurveTo(0,r*.3,-r,r*.3),n.fill();break}case"thumb":{n.fillStyle=s,n.beginPath(),n.roundRect(-r*.25,-r*.1,r*.5,r,r*.1),n.fill(),n.beginPath(),n.roundRect(-r*.55,-r*.1,r*.32,r*.55,r*.14),n.fill(),n.beginPath(),n.arc(r*.05,-r*.3,r*.34,Math.PI,Te),n.fill();break}case"ring":{n.strokeStyle=s,n.lineWidth=r*.16,n.beginPath(),n.arc(0,0,r*.8,0,Te),n.stroke();break}case"target":{for(let c=3;c>=1;c--)n.beginPath(),n.arc(0,0,r*c/3,0,Te),n.fillStyle=c%2?s:a||"#fff",n.fill();break}default:n.beginPath(),n.arc(0,0,r*.6,0,Te),o(s);break}n.restore()}const N0={steel:["#f2f4f6","#b9c0c7","#7c848c"],silver:["#ffffff","#c8ccd2","#868c94"],gold:["#fff3c0","#e8be55","#9c7818"],copper:["#f4c9a0","#c67e46","#7c471f"],dark:["#6b7078","#3a3e44","#1c1f24"]};function Mc(n,e=360){const t=document.createElement("canvas");t.width=t.height=e;const i=t.getContext("2d"),r=e/2,s=e/2,a=e*.5-1,o=a*.82,l=N0[n.metal||"steel"],c=21;for(let u=0;u<c;u++){const m=u/c*Te-Math.PI/2,g=(u+1)/c*Te-Math.PI/2,v=(m+g)/2;i.beginPath(),i.moveTo(r+Math.cos(m)*o,s+Math.sin(m)*o),i.arc(r,s,o,m,g),i.arc(r,s,a,g,m,!0),i.closePath();const p=.5+.5*Math.cos(v+.7),f=i.createLinearGradient(r+Math.cos(v)*o,s+Math.sin(v)*o,r+Math.cos(v)*a,s+Math.sin(v)*a);f.addColorStop(0,l[1]),f.addColorStop(1,p>.5?l[0]:l[2]),i.fillStyle=f,i.fill(),i.strokeStyle="rgba(0,0,0,0.18)",i.lineWidth=e*.004,i.beginPath(),i.moveTo(r+Math.cos(m)*o,s+Math.sin(m)*o),i.lineTo(r+Math.cos(m)*a,s+Math.sin(m)*a),i.stroke()}if(i.beginPath(),i.arc(r,s,o,0,Te),i.strokeStyle="rgba(0,0,0,0.28)",i.lineWidth=e*.01,i.stroke(),i.save(),i.beginPath(),i.arc(r,s,o-1,0,Te),i.clip(),i.fillStyle=L0(i,r,s,o,n.bg),i.fillRect(0,0,e,e),n.fringe&&(i.strokeStyle=n.fringe,i.lineWidth=o*.14,i.beginPath(),i.arc(r,s,o*.9,0,Te),i.stroke()),n.rings){i.strokeStyle=n.rings,i.lineWidth=e*.006;for(const u of[.62,.7])i.beginPath(),i.arc(r,s,o*u,0,Te),i.stroke()}if(n.emblem&&U0(i,n.emblem,r,s+(n.emblemY??0)*o,o*.34*(n.emblemScale??1),n.emblemColor||"#c0392b",n.emblemColor2||""),n.stars){i.fillStyle=n.starColor||"#fff";for(let u=0;u<n.stars;u++){const m=-Math.PI/2+u/n.stars*Te;ns(i,r+Math.cos(m)*o*.6,s+Math.sin(m)*o*.6,o*.07,o*.03,5),i.fill()}}if(n.band){const[u,m,g]=n.band;if(i.fillStyle=u,i.fillRect(r-o,s-o*.26,o*2,o*.52),m){const v=D0(i,m,o*1.7,o*.34,"800");i.fillStyle=g,i.font=`800 ${v}px sans-serif`,i.textAlign="center",i.textBaseline="middle",i.fillText(m,r,s+o*.01)}}if(n.arcTop&&Dl(i,n.arcTop[0],r,s,o*.82,!0,`800 ${o*.15}px sans-serif`,n.arcTop[1]),n.arcBot&&Dl(i,n.arcBot[0],r,s,o*.82,!1,`800 ${o*.13}px sans-serif`,n.arcBot[1]),n.center){const u=n.centerFont||"block",m=u==="script"?"italic 900":u==="serif"?"bold":u==="slab"?"900":"800",g=u==="script"?"'Segoe Script','Brush Script MT',cursive":u==="serif"?"Georgia,serif":"sans-serif";let v=(n.centerSize??.42)*o;for(i.font=`${m} ${v}px ${g}`;i.measureText(n.center).width>o*1.55&&v>8;)v-=2,i.font=`${m} ${v}px ${g}`;i.fillStyle=n.centerColor||"#fff",i.textAlign="center",i.textBaseline="middle";const p=s+(n.band?0:n.arcBot||n.sub?-o*.05:0);u==="script"?(i.save(),i.translate(r,p),i.transform(1,0,-.18,1,0,0),i.fillText(n.center,0,0),i.restore()):i.fillText(n.center,r,p)}n.sub&&(i.fillStyle=n.sub[1],i.font=`700 ${o*.13}px sans-serif`,i.textAlign="center",i.textBaseline="middle",i.fillText(n.sub[0],r,s+o*.42));const h=n.vintage??.35;if(h>0){for(let m=0;m<40*h;m++)i.globalAlpha=.05+Math.random()*.12,i.fillStyle=Math.random()<.5?"#3a2a12":"#fff",i.beginPath(),i.arc(r+(Math.random()-.5)*o*2,s+(Math.random()-.5)*o*2,o*(.01+Math.random()*.05),0,Te),i.fill();i.globalAlpha=1,i.strokeStyle="rgba(255,255,255,0.12)",i.lineWidth=1;for(let m=0;m<6*h;m++){i.beginPath();const g=Math.random()*Te,v=Math.random()*o;i.moveTo(r+Math.cos(g)*v,s+Math.sin(g)*v),i.lineTo(r+Math.cos(g)*(v+o*.3),s+Math.sin(g)*(v+o*.3)),i.stroke()}const u=i.createRadialGradient(r,s,o*.4,r,s,o);u.addColorStop(0,"rgba(0,0,0,0)"),u.addColorStop(1,`rgba(30,18,6,${.14+h*.22})`),i.fillStyle=u,i.fillRect(0,0,e,e)}i.restore();const d=i.createLinearGradient(0,0,e*.7,e*.7);return d.addColorStop(0,"rgba(255,255,255,0.28)"),d.addColorStop(.35,"rgba(255,255,255,0.05)"),d.addColorStop(1,"rgba(255,255,255,0)"),i.save(),i.beginPath(),i.arc(r,s,a,0,Te),i.clip(),i.fillStyle=d,i.fillRect(0,0,e,e),i.restore(),t}const ea=new Map;function F0(n,e){if(ea.has(n))return ea.get(n);const t=new _s(Mc(e,384));return t.colorSpace=Lt,t.anisotropy=8,ea.set(n,t),t}const Hr=.5;class O0{constructor(e){this.group=new vn;const t=ir(e.skin),i=new Ye(new Bi(e.radius,e.radius*.96,Hr,40),new Gt({color:t.side,roughness:.45,metalness:.25}));i.position.y=Hr/2,i.castShadow=!0,this.group.add(i);const r=new Ye(new ki(e.radius,.07,8,40),new Gt({color:t.ring,roughness:.5,metalness:.3}));r.rotation.x=Math.PI/2,r.position.y=Hr-.03,this.group.add(r),this.top=new Ye(new ai(e.radius*.99,44),new Gt({map:F0(t.id,t.art),roughness:.42,metalness:.25,transparent:!0})),this.top.rotation.x=-Math.PI/2,this.top.position.y=Hr+.005,this.group.add(this.top),this.ringHi=new Ye(new ki(e.radius+.35,.09,8,32),new Fn({color:16777215,transparent:!0,opacity:.9,blending:is,depthWrite:!1})),this.ringHi.rotation.x=-Math.PI/2,this.ringHi.position.y=.05,this.ringHi.visible=!1,this.group.add(this.ringHi)}update(e,t,i){this.group.visible=!0;const r=e.moving?Math.abs(Math.sin(t*20))*.03:Math.sin(t*2+e.bob)*.015;this.group.position.set(e.pos.x,r,e.pos.y),this.group.rotation.y=e.angle;const s=1+e.hitFlash*.12;if(this.group.scale.set(s,1-e.hitFlash*.1,s),this.ringHi.visible=i&&!e.finished,i){const a=1+Math.sin(t*6)*.06;this.ringHi.scale.set(a,a,a),this.ringHi.material.opacity=.5+Math.sin(t*6)*.25}}}class B0{constructor(){this.group=new vn,this.views=[]}build(e){this.group.clear(),this.views=[];for(const t of e){const i=new O0(t);this.views.push(i),this.group.add(i.group)}}update(e,t,i){for(let r=0;r<e.length;r++)this.views[r]?.update(e[r],t,e[r].id===i)}}function k0(){const e=document.createElement("canvas");e.width=e.height=64;const t=e.getContext("2d"),i=t.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);return i.addColorStop(0,"rgba(255,255,255,1)"),i.addColorStop(.6,"rgba(255,255,255,0.6)"),i.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=i,t.fillRect(0,0,64,64),new _s(e)}class z0{constructor(){this.cap=700,this.ps=[];const e=new bt;this.pos=new Float32Array(this.cap*3),this.col=new Float32Array(this.cap*3),this.siz=new Float32Array(this.cap),e.setAttribute("position",new Bt(this.pos,3)),e.setAttribute("color",new Bt(this.col,3)),e.setAttribute("size",new Bt(this.siz,1));const t=new _c({size:.6,map:k0(),vertexColors:!0,transparent:!0,depthWrite:!1,sizeAttenuation:!0,blending:si});this.points=new a0(e,t),this.points.frustumCulled=!1}emit(e,t,i,r,s,a,o,l,c,h){this.ps.length>=this.cap&&this.ps.shift(),this.ps.push({x:e,y:t,z:i,vx:r,vy:s,vz:a,life:o,max:o,size:l,grav:c,r:h.r,g:h.g,b:h.b})}dust(e,t,i=6,r="#d8c090"){const s=new Ue(r);for(let a=0;a<i;a++)this.emit(e,.1,t,(Math.random()-.5)*2,Math.random()*1.5+.5,(Math.random()-.5)*2,.5+Math.random()*.4,.6+Math.random()*.5,-1.2,s)}impact(e,t,i,r="#fff4d0"){const s=new Ue(r),a=Math.min(18,5+i);for(let o=0;o<a;o++){const l=Math.random()*6.28,c=2+Math.random()*i*.5;this.emit(e,.3,t,Math.cos(l)*c,1+Math.random()*2,Math.sin(l)*c,.35+Math.random()*.3,.35,-3,s)}}skid(e,t){this.emit(e,.05,t,0,0,0,.9,.5,0,new Ue("#00000022"))}confetti(e,t){const i=["#e5484d","#3b82f6","#3fae6a","#f7d046","#f59e0b","#7c3aed","#ffffff"];for(let r=0;r<160;r++){const s=new Ue(i[r%i.length]);this.emit(e+(Math.random()-.5)*20,14+Math.random()*6,t+(Math.random()-.5)*20,(Math.random()-.5)*3,-2-Math.random()*2,(Math.random()-.5)*3,2.4+Math.random()*1.5,.7,-.6,s)}}update(e){for(let r=this.ps.length-1;r>=0;r--){const s=this.ps[r];if(s.life-=e,s.life<=0){this.ps.splice(r,1);continue}s.vy+=s.grav*e,s.x+=s.vx*e,s.y+=s.vy*e,s.z+=s.vz*e,s.y<.02&&(s.y=.02,s.vy=0,s.vx*=.7,s.vz*=.7)}const t=Math.min(this.ps.length,this.cap);for(let r=0;r<t;r++){const s=this.ps[r],a=s.life/s.max;this.pos[r*3]=s.x,this.pos[r*3+1]=s.y,this.pos[r*3+2]=s.z,this.col[r*3]=s.r,this.col[r*3+1]=s.g,this.col[r*3+2]=s.b,this.siz[r]=s.size*a}for(let r=t;r<this.cap;r++)this.siz[r]=0;const i=this.points.geometry;i.getAttribute("position").needsUpdate=!0,i.getAttribute("color").needsUpdate=!0,i.getAttribute("size").needsUpdate=!0}}class H0{constructor(){this.group=new vn,this.mat=new Fn({color:3394645,transparent:!0,opacity:.9}),this.shaft=new Ye(new Gn(1,.5),this.mat),this.shaft.rotation.x=-Math.PI/2,this.head=new Ye(new ai(.9,3),this.mat),this.head.rotation.x=-Math.PI/2,this.ring=new Ye(new ki(1.1,.08,8,28),new Fn({color:16777215,transparent:!0,opacity:.6})),this.ring.rotation.x=-Math.PI/2;const e=new o0({color:16777215,dashSize:.4,gapSize:.3,transparent:!0,opacity:.7}),t=new bt().setFromPoints([new U,new U]);this.pull=new s0(t,e),this.pull.computeLineDistances(),this.group.add(this.shaft,this.head,this.ring,this.pull),this.group.visible=!1}set(e,t,i,r,s){this.group.visible=!0;const a=Math.atan2(r,i),o=2+s*12,l=new Ue().setHSL(.33*(1-s),.75,.5);this.mat.color.copy(l),this.shaft.position.set(e+Math.cos(a)*(o/2+1.1),.12,t+Math.sin(a)*(o/2+1.1)),this.shaft.scale.set(o,1,1),this.shaft.rotation.z=0,this.shaft.rotation.y=0,this.shaft.rotation.set(-Math.PI/2,0,-a),this.head.position.set(e+Math.cos(a)*(o+1.4),.12,t+Math.sin(a)*(o+1.4)),this.head.rotation.set(-Math.PI/2,0,-a-Math.PI/2),this.head.scale.setScalar(.7+s*.6),this.ring.position.set(e,.1,t);const c=[new U(e,.15,t),new U(e-Math.cos(a)*o*.6,.15,t-Math.sin(a)*o*.6)];this.pull.geometry.setFromPoints(c),this.pull.computeLineDistances()}hide(){this.group.visible=!1}}const Be=(n=0,e=0)=>({x:n,y:e}),Zn=(n,e)=>({x:n.x-e.x,y:n.y-e.y}),Sc=(n,e)=>({x:n.x*e,y:n.y*e}),xn=n=>Math.hypot(n.x,n.y),yc=(n,e)=>Math.hypot(n.x-e.x,n.y-e.y),Dn=n=>{const e=Math.hypot(n.x,n.y)||1;return{x:n.x/e,y:n.y/e}},Ci=(n,e,t)=>n<e?e:n>t?t:n,bc={sidewalk:{fric:4.5,drag:.15},chalk:{fric:5,drag:.15},cardboard:{fric:8,drag:.35},dirt:{fric:9.5,drag:.45},sand:{fric:17,drag:.9},grass:{fric:20,drag:1.1},mud:{fric:30,drag:1.8},water:{fric:7,drag:.5},ramp:{fric:6,drag:.2},out:{fric:24,drag:1}},G0={weight:1,slide:1,stability:1,bounce:1,control:1};function V0(n,e,t,i,r,s){return{id:n,name:e,skin:t,isAI:r,ai:s,stats:{...i},radius:.82,pos:Be(),vel:Be(),angle:Math.random()*6.28,angVel:0,bob:Math.random()*6.28,progress:0,checkpoint:0,cpPos:Be(),turnStart:Be(),preFlick:Be(),resetTo:Be(),consumed:new Set,flicksLeft:3,bonusFlicks:0,special10:!1,bombed:!1,holed:!1,skipTurns:0,finished:!1,place:0,lap:0,moving:!1,hitFlash:0}}const W0=.42,Ec=27;function ta(n,e,t){const i=t.x-e.x,r=t.y-e.y,s=i*i+r*r||1e-6;let a=Ci(((n.x-e.x)*i+(n.y-e.y)*r)/s,0,1);const o=e.x+i*a,l=e.y+r*a;return{d:Math.hypot(n.x-o,n.y-l),t:a,cx:o,cy:l}}function X0(n,e,t,i){const r=(c,h,d)=>(c.x-h.x)*(d.y-h.y)-(c.y-h.y)*(d.x-h.x),s=r(t,i,n),a=r(t,i,e),o=r(n,e,t),l=r(n,e,i);return s>0!=a>0&&o>0!=l>0}class q0{constructor(e){this.arcs=[0],this.total=0,this.cell=5,this.cols=0,this.rows=0,this.grid=[],this.def=e;let t=0;for(let r=1;r<e.path.length;r++)t+=Math.hypot(e.path[r].x-e.path[r-1].x,e.path[r].y-e.path[r-1].y),this.arcs.push(t);this.total=t,this.cols=Math.ceil(e.w/this.cell)+1,this.rows=Math.ceil(e.h/this.cell)+1,this.grid=Array.from({length:this.cols*this.rows},()=>[]);const i=Math.max(...e.half)+2;for(let r=1;r<e.path.length;r++){const s=e.path[r-1],a=e.path[r],o=Math.min(s.x,a.x)-i,l=Math.max(s.x,a.x)+i,c=Math.min(s.y,a.y)-i,h=Math.max(s.y,a.y)+i;for(let d=Math.floor(c/this.cell);d<=Math.floor(h/this.cell);d++)for(let u=Math.floor(o/this.cell);u<=Math.floor(l/this.cell);u++)u<0||d<0||u>=this.cols||d>=this.rows||this.grid[d*this.cols+u].push(r)}}halfAt(e,t){const i=this.def.half;return i[e-1]*(1-t)+i[Math.min(e,i.length-1)]*t}nearest(e){const t=Ci(Math.floor(e.x/this.cell),0,this.cols-1),i=Ci(Math.floor(e.y/this.cell),0,this.rows-1);let r=this.grid[i*this.cols+t],s=1/0,a=0,o=this.def.half[0];if((c=>{for(const h of c){const d=ta(e,this.def.path[h-1],this.def.path[h]);d.d<s&&(s=d.d,a=this.arcs[h-1]+d.t*(this.arcs[h]-this.arcs[h-1]),o=this.halfAt(h,d.t))}})(r),s===1/0)for(let c=1;c<this.def.path.length;c++){const h=ta(e,this.def.path[c-1],this.def.path[c]);h.d<s&&(s=h.d,a=this.arcs[c-1]+h.t*(this.arcs[c]-this.arcs[c-1]),o=this.halfAt(c,h.t))}return{d:s,arc:a,half:o}}progressOf(e){return this.nearest(e).arc}atArc(e){const t=this.def.path;e=Ci(e,0,this.total);let i=1;for(;i<t.length-1&&this.arcs[i]<e;)i++;const r=this.arcs[i]-this.arcs[i-1]||1,s=Ci((e-this.arcs[i-1])/r,0,1),a=t[i-1],o=t[i];return{p:Be(a.x+(o.x-a.x)*s,a.y+(o.y-a.y)*s),tan:{x:(o.x-a.x)/r,y:(o.y-a.y)/r}}}inPad(e){for(const t of this.def.pads)if((e.x-t.x)**2+(e.y-t.y)**2<=t.r*t.r)return!0;return!1}surfaceAt(e){if(e.x<0||e.y<0||e.x>this.def.w||e.y>this.def.h)return"out";const t=this.nearest(e);if(!(t.d<=t.half||this.inPad(e)))return"out";let r=this.def.ground;for(const s of this.def.patches)s.r!=null?(e.x-s.x)**2+(e.y-s.y)**2<=s.r*s.r&&(r=s.surface):s.hw!=null&&s.hh!=null&&Math.abs(e.x-s.x)<=s.hw&&Math.abs(e.y-s.y)<=s.hh&&(r=s.surface);return r}patchAt(e){let t=null;for(const i of this.def.patches)i.r!=null?(e.x-i.x)**2+(e.y-i.y)**2<=i.r*i.r&&(t=i):i.hw!=null&&i.hh!=null&&Math.abs(e.x-i.x)<=i.hw&&Math.abs(e.y-i.y)<=i.hh&&(t=i);return t}collideWalls(e,t,i,r){let s=null;const a=(o,l,c)=>{e.x+=o*c,e.y+=l*c;const h=t.x*o+t.y*l;h<0&&(t.x-=(1+r)*h*o,t.y-=(1+r)*h*l),s={x:o,y:l}};for(const o of this.def.walls){const l=ta(e,o.a,o.b);if(l.d<i){let c=e.x-l.cx,h=e.y-l.cy;const d=Math.hypot(c,h)||1;a(c/d,h/d,i-l.d+.01)}}return s}obstacleAt(e,t){for(const i of this.def.obstacles){const r=i.r+(i.type==="stone"?t:t*.5);if((e.x-i.x)**2+(e.y-i.y)**2<=r*r)return i}return null}crossedFinish(e,t){return X0(e,t,this.def.finish[0],this.def.finish[1])}}function Tc(n){return n.some(e=>e.moving&&!e.finished)}function Ac(n,e,t){const i=[],r=e.def;for(const s of n){if(s.hitFlash=Math.max(0,s.hitFlash-t*4),s.finished||!s.moving)continue;const a=Be(s.pos.x,s.pos.y),o=e.surfaceAt(s.pos),l=bc[o],c=e.patchAt(s.pos);if(o==="ramp"){const m=c?.dir!=null?{x:Math.cos(c.dir),y:Math.sin(c.dir)}:Dn(s.vel);s.vel.x+=m.x*26*t,s.vel.y+=m.y*26*t}else if(o==="water"){const m=c?.dir!=null?{x:Math.cos(c.dir),y:Math.sin(c.dir)}:{x:0,y:0};s.vel.x+=m.x*7*t,s.vel.y+=m.y*7*t}const h=xn(s.vel);if(h>0){const m=s.stats,g=l.fric>12?1+(m.weight-1)*.55:1,v=l.fric*g/m.slide;let p=h-v*t;const f=l.drag/(.7+.3*m.slide)+(m.control-1)*(h<6?.35:.1);p*=1-Math.min(.92,Math.max(0,f)*t),p<0&&(p=0);const x=Dn(s.vel);s.vel.x=x.x*p,s.vel.y=x.y*p}s.pos.x+=s.vel.x*t,s.pos.y+=s.vel.y*t;const d=xn(s.vel);s.angVel=d*.9*(1/s.stats.stability),s.angle+=s.angVel*t,e.collideWalls(s.pos,s.vel,s.radius,.42*s.stats.bounce)&&(i.push({type:"wall",capId:s.id,x:s.pos.x,y:s.pos.y,power:xn(s.vel)}),s.hitFlash=1);for(let m=0;m<r.obstacles.length;m++){const g=r.obstacles[m],v=g.r+(g.type==="stone"?s.radius:s.radius*.55),p=s.pos.x-g.x,f=s.pos.y-g.y;if(!(p*p+f*f>v*v))if(g.type==="stone"){const x=Math.hypot(p,f)||1,M=p/x,E=f/x,R=v-x;s.pos.x+=M*R,s.pos.y+=E*R;const w=s.vel.x*M+s.vel.y*E;if(w<0){const A=1+.45*s.stats.bounce;s.vel.x-=A*w*M,s.vel.y-=A*w*E}i.push({type:"stone",capId:s.id,x:g.x,y:g.y,power:d}),s.hitFlash=1}else if(g.type==="hole"){s.pos.x=s.cpPos.x,s.pos.y=s.cpPos.y,s.vel=Be(),s.moving=!1,i.push({type:"hole",capId:s.id,x:g.x,y:g.y,power:0});break}else if(g.type==="bomb"){s.pos.x=s.cpPos.x,s.pos.y=s.cpPos.y,s.vel=Be(),s.moving=!1,i.push({type:"bomb",capId:s.id,x:g.x,y:g.y,power:0});break}else g.type==="bonus"&&(s.consumed.has(m)||(s.consumed.add(m),i.push({type:"bonus",capId:s.id,x:g.x,y:g.y,power:0,obsIdx:m,n:g.n||1})))}if(s.moving){if(e.surfaceAt(s.pos)==="out"){s.pos.x=s.resetTo.x,s.pos.y=s.resetTo.y,s.vel=Be(),s.moving=!1,i.push({type:"out",capId:s.id,x:a.x,y:a.y,power:0});continue}if(s.progress>e.total*.72&&e.crossedFinish(a,s.pos)){s.finished=!0,s.vel=Be(),s.moving=!1,i.push({type:"finish",capId:s.id,x:s.pos.x,y:s.pos.y,power:0});continue}s.progress=e.progressOf(s.pos),xn(s.vel)<W0&&(s.vel=Be(),s.moving=!1,i.push({type:"rest",capId:s.id,x:s.pos.x,y:s.pos.y,power:0}))}}return Y0(n,i),i}function Y0(n,e){for(let t=0;t<n.length;t++)for(let i=t+1;i<n.length;i++){const r=n[t],s=n[i];if(r.finished||s.finished)continue;const a=s.pos.x-r.pos.x,o=s.pos.y-r.pos.y,l=r.radius+s.radius,c=a*a+o*o;if(c>l*l||c<1e-6)continue;const h=Math.sqrt(c),d=a/h,u=o/h,m=l-h,g=r.stats.weight,v=s.stats.weight,p=g+v;r.pos.x-=d*m*(v/p),r.pos.y-=u*m*(v/p),s.pos.x+=d*m*(g/p),s.pos.y+=u*m*(g/p);const f=s.vel.x-r.vel.x,x=s.vel.y-r.vel.y,M=f*d+x*u;if(M>0)continue;const R=-(1+.55*((r.stats.bounce+s.stats.bounce)/2))*M/(1/g+1/v),w=R*d,A=R*u;r.vel.x-=w/g,r.vel.y-=A/g,s.vel.x+=w/v,s.vel.y+=A/v;const P=Math.abs(M);P>1.5&&(r.moving||(r.moving=!0),s.moving||(s.moving=!0),r.hitFlash=1,s.hitFlash=1,e.push({type:"capHit",capId:r.id,otherId:s.id,x:(r.pos.x+s.pos.x)/2,y:(r.pos.y+s.pos.y)/2,power:P}))}}const dn=["cauteloso","agressivo","tecnico","caotico","rival"],$0={cauteloso:"Cautelosa",agressivo:"Agressiva",tecnico:"Técnica",caotico:"Caótica",rival:"Rival"},Il={cauteloso:{lookahead:12,powBias:.95,risk:1.5,outPenalty:240,spread:.16,noise:.02,rival:0},agressivo:{lookahead:19,powBias:1.1,risk:.5,outPenalty:90,spread:.22,noise:.055,rival:.25},tecnico:{lookahead:14,powBias:1,risk:1,outPenalty:180,spread:.18,noise:.014,rival:0},caotico:{lookahead:13,powBias:1.03,risk:.7,outPenalty:120,spread:.36,noise:.15,rival:.15},rival:{lookahead:15,powBias:1.05,risk:.8,outPenalty:160,spread:.2,noise:.035,rival:1}};function K0(n){return{...n,pos:Be(n.pos.x,n.pos.y),vel:Be(),cpPos:Be(n.cpPos.x,n.cpPos.y),turnStart:Be(n.turnStart.x,n.turnStart.y),resetTo:Be(n.turnStart.x,n.turnStart.y),preFlick:Be(n.pos.x,n.pos.y),consumed:new Set,stats:{...n.stats},moving:!1,finished:!1}}function Gr(n,e,t,i){const r=K0(n);r.vel=Sc(Dn(t),Math.max(.06,Math.min(1,i))*Ec),r.moving=!0;let s=!1,a=!1,o=!1,l=!1,c=0,h=n.progress;const d=1/120;let u=0;for(;Tc([r])&&u<1400;){const v=Ac([r],e,d);for(const p of v)p.type==="out"?s=!0:p.type==="hole"?a=!0:p.type==="bomb"?o=!0:p.type==="finish"?l=!0:p.type==="bonus"&&(c+=p.n||1);r.progress>h&&(h=r.progress),u++}const m=e.nearest(r.pos),g=Math.max(0,m.d-m.half*.45);return{endProg:r.progress,maxProg:h,out:s,holed:a,bombed:o,finished:l,dEdge:g,endPos:Be(r.pos.x,r.pos.y),bonus:c}}function Vr(n,e,t,i){let r;if(n.out?r=e.progress-t.outPenalty+(n.maxProg-e.progress)*.12:r=n.endProg-n.dEdge*t.risk*2.4,n.holed&&(r-=60),n.bombed&&(r-=85),r+=n.bonus*22,n.finished&&(r+=400),i&&t.rival>0&&!n.out){const s=yc(n.endPos,i.pos);r+=t.rival*Math.max(0,9-s)*3.2}return r}const Zi=(n,e)=>({x:n.x*Math.cos(e)-n.y*Math.sin(e),y:n.x*Math.sin(e)+n.y*Math.cos(e)});function j0(n,e,t){const i=n.ai||"tecnico",r=Il[i]||Il.tecnico,s=t.total,a=t.atArc(n.progress).tan,o=t.atArc(Math.min(s,n.progress+4)).p,l=t.atArc(Math.min(s,n.progress+r.lookahead)).p,c=xn(Zn(o,n.pos))<.4?a:Dn(Zn(o,n.pos)),h=xn(Zn(l,n.pos))<.4?a:Dn(Zn(l,n.pos));let d=null;if(r.rival>0){let R=16;for(const w of e){if(w.id===n.id||w.finished)continue;const A=yc(n.pos,w.pos);A<R&&w.progress>n.progress-6&&(d=w,R=A)}}const u=r.spread,m=[h,Zi(h,u*.6),Zi(h,-u*.6),c,Zi(c,u*.5),Zi(c,-u*.5),a],g=i==="agressivo"?[.2,.4,.6,.78,.9,1]:i==="cauteloso"?[.14,.28,.42,.56,.7,.84]:[.16,.32,.5,.66,.82,.96];let v={dir:c,power:.2,s:-1e9};for(const R of m)for(const w of g){const A=Math.min(1,w*r.powBias),P=Vr(Gr(n,t,R,A),n,r,d);P>v.s&&(v={dir:R,power:A,s:P})}for(const R of[.12,.18]){const w=Vr(Gr(n,t,a,R),n,r,d);w>v.s&&(v={dir:a,power:R,s:w})}const p=t.atArc(Math.min(s,n.progress+3)).p,f=xn(Zn(p,n.pos))<.3?a:Dn(Zn(p,n.pos));for(const R of[.12,.2]){const w=Vr(Gr(n,t,f,R),n,r,d);w>v.s&&(v={dir:f,power:R,s:w})}if(d){const R=Dn(Zn(d.pos,n.pos));for(const w of[.7,.9]){const A=Vr(Gr(n,t,R,w),n,r,d)+18;A>v.s&&(v={dir:R,power:w,s:A})}}const x=(Math.random()-.5)*r.noise*2.2,M=Zi(v.dir,x),E=Math.max(.06,Math.min(1,v.power*(1+(Math.random()-.5)*r.noise)));return{dir:M,power:E}}class Z0{constructor(){this.caps=[],this.current=0,this.phase="aim",this.finishOrder=[],this.turnNo=0,this.onEvent=()=>{},this.onChange=()=>{},this.onToast=()=>{},this.onFlick=()=>{},this.acc=0,this.aiTimer=0,this.aiFired=!1,this.lastFlickOut=!1}setup(e,t){this.track=new q0(e),this.caps=t.map((l,c)=>{const h=ir(l.skin);return V0(c,l.name,l.skin,{...G0,...h.stats},l.isAI,l.ai)});const i=e.start,r=e.startAngle,s={x:Math.cos(r),y:Math.sin(r)},a={x:-Math.sin(r),y:Math.cos(r)},o=e.half[0];this.caps.forEach((l,c)=>{const h=c%2?1:-1,d=c%2===0&&this.caps.length===1?0:h*Math.min(o*.55,1.8),u=.8+Math.floor(c/2)*1.9;l.pos=Be(i.x+s.x*u+a.x*d,i.y+s.y*u+a.y*d),l.cpPos=Be(l.pos.x,l.pos.y),l.turnStart=Be(l.pos.x,l.pos.y),l.progress=this.track.progressOf(l.pos),l.checkpoint=0}),this.finishOrder=[],this.current=0,this.turnNo=1,this.phase="aim",this.beginTurn(!0),this.onChange()}activeCap(){return this.caps[this.current]}beginTurn(e=!1){let t=0;for(;t++<this.caps.length+2;){const r=this.caps[this.current];if(!r)break;if(r.finished){this.advanceIndex();continue}if(r.skipTurns>0){r.skipTurns--,this.onToast(`${r.name} perdeu o turno`,"bad"),this.advanceIndex();continue}break}const i=this.caps[this.current];i&&(i.flicksLeft=3,i.bonusFlicks=0,i.special10=!1,i.consumed.clear(),i.turnStart=Be(i.pos.x,i.pos.y),this.phase="aim",this.aiTimer=0,this.aiFired=!1,e||this.turnNo++,i.isAI||this.onToast("Sua vez, "+i.name,"turn"),this.onChange())}advanceIndex(){this.current=(this.current+1)%this.caps.length}canFlick(){return this.phase==="aim"&&this.activeCap().flicksLeft>0}flick(e,t){if(!this.canFlick())return;const i=this.activeCap(),r=Dn(e),s=Math.max(.06,Math.min(1,t))*Ec;for(const a of this.caps)a.resetTo=Be(a.pos.x,a.pos.y);i.resetTo=Be(i.turnStart.x,i.turnStart.y),i.preFlick=Be(i.pos.x,i.pos.y),i.vel=Sc(r,s),i.moving=!0,this.lastFlickOut=!1,this.phase="resolve",this.acc=0,this.onFlick(i,t),this.onChange()}update(e){if(this.phase==="over")return;if(this.phase==="aim"){const r=this.activeCap();if(r.isAI&&(this.aiTimer+=e,!this.aiFired&&this.aiTimer>.85)){this.aiFired=!0;const s=j0(r,this.caps,this.track);this.flick(s.dir,s.power)}return}this.acc+=e;const t=1/120;let i=0;for(;this.acc>=t&&i<12;){const r=Ac(this.caps,this.track,t);for(const s of r)this.handleEvent(s);if(this.acc-=t,i++,this.phase==="over")return}Tc(this.caps)||this.endFlick()}handleEvent(e){const t=this.caps[e.capId];switch(e.type){case"bonus":t.bonusFlicks+=e.n||1,this.onToast(`+${e.n} peteléco${(e.n||1)>1?"s":""}!`,"good");break;case"hole":t.holed=!0,this.onToast(`${t.name} caiu no buraco — checkpoint`,"bad");break;case"bomb":t.bombed=!0,this.onToast(`${t.name} pisou no X — perdeu a vez`,"bad");break;case"out":t.id===this.current&&(this.lastFlickOut=!0),this.onToast(`${t.name} saiu da pista!`,"bad");break;case"finish":this.onFinish(t);break}this.updateCheckpoint(t),this.onEvent(e)}updateCheckpoint(e){const t=this.track.def.checkpoints;for(let i=e.checkpoint+1;i<t.length;i++)Math.hypot(e.pos.x-t[i].x,e.pos.y-t[i].y)<4.2&&(e.checkpoint=i,e.cpPos=Be(t[i].x,t[i].y))}onFinish(e){this.finishOrder.includes(e)||(e.finished=!0,this.finishOrder.push(e),e.place=this.finishOrder.length,this.finishOrder.length===1&&this.finishRace())}finishRace(){const e=this.caps.filter(i=>!i.finished).sort((i,r)=>r.progress-i.progress);let t=this.finishOrder.length;for(const i of e)i.place=++t;this.phase="over",this.onChange()}endFlick(){const e=this.activeCap();e.flicksLeft-=1,e.holed&&(e.holed=!1,e.flicksLeft-=1),e.bombed&&(e.bombed=!1,e.flicksLeft=0),e.bonusFlicks>0&&(e.flicksLeft+=e.bonusFlicks,e.bonusFlicks=0),e.flicksLeft=Math.max(0,Math.min(e.flicksLeft,9)),e.flicksLeft>1&&(e.turnStart=Be(e.pos.x,e.pos.y)),e.flicksLeft<=0?(this.advanceIndex(),this.beginTurn()):(this.phase="aim",this.aiTimer=0,this.aiFired=!1,this.onChange())}standings(){return[...this.caps].sort((e,t)=>(e.finished?e.place:999-e.progress/1e3,t.finished?t.place:999-t.progress/1e3,e.finished&&t.finished?e.place-t.place:e.finished?-1:t.finished?1:t.progress-e.progress))}winner(){return this.finishOrder[0]||null}}function J0(n){return()=>{n|=0,n=n+1831565813|0;let e=Math.imul(n^n>>>15,1|n);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}const Ji=["Fácil","Médio","Difícil","Muito Difícil","Extrema"],Wr=["#3fae6a","#3b82f6","#f2b100","#e5762a","#e5484d"],Ul=[{key:"quintal",ground:"dirt",bg:"#6f5334",wall:"#6b4e2e",patch:["sand","mud","grass"],decor:["twig","leaf","pebble","grass"],names:["Quintal do Zé","Terra Batida","Fundo de Quintal","Chão de Terra"]},{key:"praia",ground:"sand",bg:"#d9b877",wall:"#c9a35f",patch:["water","ramp","cardboard"],decor:["shell","starfish","castle","pebble"],names:["Praia da Tarde","Areia Fofa","Beira-Mar","Duna do Sol"]},{key:"calcada",ground:"sidewalk",bg:"#9a9488",wall:"#8f8879",patch:["chalk","cardboard"],decor:["chalk","toy","pebble"],names:["Calçada de Giz","Rua de Baixo","Passeio","Meio-Fio"]},{key:"garagem",ground:"cardboard",bg:"#7d6a4e",wall:"#a9773f",patch:["sidewalk","sand"],decor:["box","tape","pencil"],names:["Garagem","Papelão & Fita","Depósito","Oficina"]},{key:"parquinho",ground:"dirt",bg:"#4f5b3a",wall:"#5c4a2c",patch:["mud","water","grass"],decor:["leaf","grass","pebble"],names:["Parquinho Molhado","Lamaçal","Depois da Chuva","Poça & Folha"]},{key:"cozinha",ground:"cardboard",bg:"#c8b48c",wall:"#c05a5a",patch:["sidewalk","water"],decor:["cup","coin","eraser","straw"],names:["Mesa da Cozinha","Hora do Café","Toalha Xadrez","Bancada"]},{key:"jardim",ground:"dirt",bg:"#3f5a2e",wall:"#5a7a3a",patch:["grass","mud","sand"],decor:["grass","leaf","twig","pebble"],names:["Jardim da Vó","Canteiro","Grama & Terra","Horta"]},{key:"deserto",ground:"sand",bg:"#c98f4a",wall:"#a6702f",patch:["ramp","ramp","water"],decor:["pebble","twig","starfish"],names:["Deserto","Dunas","Sol a Pino","Areião"]},{key:"obra",ground:"dirt",bg:"#6a6152",wall:"#8a8070",patch:["cardboard","sand"],decor:["box","pencil","pebble"],names:["Canteiro de Obra","Entulho","Cimento","Andaime"]},{key:"laje",ground:"sidewalk",bg:"#8f9aa0",wall:"#7a848a",patch:["cardboard","chalk"],decor:["toy","pebble","tape"],names:["Laje","Terraço","Cobertura","Varal"]},{key:"piscina",ground:"sidewalk",bg:"#4a90b8",wall:"#cfe4ee",patch:["water","water","chalk"],decor:["pebble","coin","toy"],names:["Borda da Piscina","Deck Molhado","Área de Lazer","Prainha"]},{key:"feira",ground:"cardboard",bg:"#a88f5c",wall:"#8a6238",patch:["sidewalk","chalk"],decor:["box","coin","tape","cup"],names:["Feira Livre","Barraca","Calçadão","Mercadão"]},{key:"estrada",ground:"dirt",bg:"#5c4a30",wall:"#4a3a24",patch:["mud","sand","grass"],decor:["pebble","twig","grass"],names:["Estrada de Barro","Trilha","Rua sem Asfalto","Beira da Roça"]},{key:"varanda",ground:"cardboard",bg:"#8a6a44",wall:"#6b4e2e",patch:["sidewalk","water"],decor:["cup","coin","leaf","pencil"],names:["Varanda","Área Coberta","Quintalzinho","Alpendre"]}],Qn=(n,e)=>{const t=n[Math.max(0,e-1)],i=n[Math.min(n.length-1,e+1)],r=i.x-t.x,s=i.y-t.y,a=Math.hypot(r,s)||1;return{x:r/a,y:s/a}},na=(n,e)=>{const t=Qn(n,e);return{x:-t.y,y:t.x}},Q0=n=>{let e=0;for(let t=1;t<n.length;t++)e+=Math.hypot(n[t].x-n[t-1].x,n[t].y-n[t-1].y);return e},eg=(n,e)=>{const t=Math.cos(e),i=Math.sin(e);for(const r of n){const s=r.x*t-r.y*i,a=r.x*i+r.y*t;r.x=s,r.y=a}},tg=[{half:4.3,open:.05,len:330,holes:[1,2],bombs:[0,1],stones:[2,4],bonus:[2,3],ramps:[1,2]},{half:4.1,open:.24,len:420,holes:[2,3],bombs:[0,1],stones:[3,5],bonus:[2,4],ramps:[1,3]},{half:4,open:.5,len:510,holes:[2,4],bombs:[1,2],stones:[3,6],bonus:[2,4],ramps:[2,3]},{half:3.9,open:.72,len:600,holes:[3,5],bombs:[1,2],stones:[4,6],bonus:[2,3],ramps:[2,4]},{half:3.8,open:.9,len:690,holes:[3,6],bombs:[1,2],stones:[4,7],bonus:[1,3],ramps:[2,4]}];function ng(n,e,t,i,r){const s=t(7,14),a=e(.18,.46),o=e(.8,1.4),l=e(.8,1.4),c=e(.78,.92),h=n()*6.283,d=[];for(let x=0;x<s;x++)d.push(1+(n()*2-1)*a);const u=x=>{let M=x/(2*Math.PI)*s;M=(M%s+s)%s;const E=Math.floor(M),R=M-E,w=d[(E-1+s)%s],A=d[E%s],P=d[(E+1)%s],W=d[(E+2)%s],_=.5*(2*A+(-w+P)*R+(2*w-5*A+4*P-W)*R*R+(-w+3*A-3*P+W)*R*R*R);return Math.max(.35,_)},m=60,g=Math.max(200,Math.round(i/2.2)),v=c*2*Math.PI,p=[];for(let x=0;x<=g;x++){const M=h+x/g*v,E=u(M)*m;p.push(Be(o*E*Math.cos(M),l*E*Math.sin(M)))}const f=i/Q0(p);for(const x of p)x.x*=f,x.y*=f;return p}function ig(n,e,t){const i=J0(n*7919+e*131+t*17+1),r=(T,ne)=>Math.floor(T+i()*(ne-T+1)),s=(T,ne)=>T+i()*(ne-T),a=Ul[(t*3+e*7+n)%Ul.length],o=tg[e],l=o.half*s(.92,1.08),c=o.len*s(.9,1.1),h=ng(i,s,r,c);eg(h,i()*6.283);const d=l+5;let u=1/0,m=1/0,g=-1/0,v=-1/0;for(const T of h)T.x<u&&(u=T.x),T.y<m&&(m=T.y),T.x>g&&(g=T.x),T.y>v&&(v=T.y);for(const T of h)T.x+=d-u,T.y+=d-m;const p=Math.ceil(g-u+2*d),f=Math.ceil(v-m+2*d),x=h,M=x.length,E=[0];let R=0;for(let T=1;T<M;T++)R+=Math.hypot(x[T].x-x[T-1].x,x[T].y-x[T-1].y),E.push(R);const w=R,A=T=>{let ne=1;for(;ne<M-1&&E[ne]<T;)ne++;const se=E[ne]-E[ne-1]||1,Q=(T-E[ne-1])/se;return{p:Be(x[ne-1].x+(x[ne].x-x[ne-1].x)*Q,x[ne-1].y+(x[ne].y-x[ne-1].y)*Q),i:ne}},P=(T,ne=0)=>{const{p:se,i:Q}=A(T),ie=na(x,Q);return Be(se.x+ie.x*ne,se.y+ie.y*ne)},W=new Array(M).fill(0);for(let T=1;T<M-1;T++){const ne=Qn(x,T-1),se=Qn(x,T+1);let Q=ne.x*se.x+ne.y*se.y;Q=Q<-1?-1:Q>1?1:Q;const ie=E[Math.min(M-1,T+1)]-E[Math.max(0,T-1)]||1;W[T]=Ci(Math.acos(Q)/ie/.22,0,1)}const _=new Array(M).fill(0);for(let T=0;T<M;T++){let ne=0,se=0;for(let Q=-3;Q<=3;Q++){const ie=T+Q;ie>=0&&ie<M&&(ne+=W[ie],se++)}_[T]=ne/se}const y=[];for(let T=0;T<M;T++){let ne=l+Math.sin(E[T]*.05)*.3;E[T]<10&&(ne=Math.max(ne,l+2*(1-E[T]/10))),w-E[T]<8&&(ne+=.9),ne*=1+.45*_[T],y.push(ne)}const F=[],k=3,V=T=>T<10||w-T<9;for(let T=k;T<M;T+=k){const ne=T-k,se=o.open*(1-.85*_[T]);if(i()<se&&!V(E[T]))continue;const Q=na(x,ne),ie=na(x,T);F.push({a:Be(x[ne].x+Q.x*y[ne],x[ne].y+Q.y*y[ne]),b:Be(x[T].x+ie.x*y[T],x[T].y+ie.y*y[T])}),F.push({a:Be(x[ne].x-Q.x*y[ne],x[ne].y-Q.y*y[ne]),b:Be(x[T].x-ie.x*y[T],x[T].y-ie.y*y[T])})}const q=[],z=[],j=[],H=[Be(x[0].x,x[0].y)],ce=[];ce.push({x:x[0].x,y:x[0].y,r:l+2.8});const he=r(4,7);for(let T=1;T<=he;T++)H.push(P(w*T/(he+1)));const Me=r(o.ramps[0],o.ramps[1]);for(let T=0;T<Me;T++){const ne=s(.15,.85)*w,{p:se,i:Q}=A(ne),ie=Qn(x,Q);z.push({surface:"ramp",x:se.x,y:se.y,r:l*.9,dir:Math.atan2(ie.y,ie.x)})}for(let T=0;T<r(2,4);T++){const ne=s(.1,.9)*w,se=P(ne,s(-l*.4,l*.4)),Q=a.patch[r(0,a.patch.length-1)],{i:ie}=A(ne),Ve=Qn(x,ie);z.push({surface:Q,x:se.x,y:se.y,r:l*s(.7,1.05),dir:Q==="water"?Math.atan2(Ve.y,Ve.x)+s(-.6,.6):void 0})}const Ge=[],Xe=T=>Ge.every(ne=>Math.abs(ne-T)>14),X=(T,ne,se)=>{const Q=P(T,ne);se(Q),Ge.push(T)};for(let T=0,ne=0;T<r(o.holes[0],o.holes[1])&&ne<40;ne++){const se=s(.14,.9)*w;Xe(se)&&(X(se,s(-l*.5,l*.5),Q=>q.push({type:"hole",x:Q.x,y:Q.y,r:s(1,1.4)})),T++)}for(let T=0,ne=0;T<r(o.bombs[0],o.bombs[1])&&ne<30;ne++){const se=s(.2,.85)*w;Xe(se)&&(X(se,s(-l*.4,l*.4),Q=>q.push({type:"bomb",x:Q.x,y:Q.y,r:.95})),T++)}for(let T=0;T<r(o.stones[0],o.stones[1]);T++){const ne=s(.1,.92)*w,se=(i()<.5?-1:1)*s(l*.3,l*.75),Q=P(ne,se);q.push({type:"stone",x:Q.x,y:Q.y,r:s(.7,1.2)})}for(let T=0,ne=0;T<r(o.bonus[0],o.bonus[1])&&ne<30;ne++){const se=s(.15,.9)*w;if(!Xe(se))continue;const Q=i(),ie=Q>.94?3:Q>.72?2:1;X(se,(i()<.5?-1:1)*s(l*.2,l*.7),Ve=>q.push({type:"bonus",x:Ve.x,y:Ve.y,r:1.1,n:ie})),T++}if(e>=1&&i()<.55){let T=-1,ne=-1,se=1e9;for(let Q=0;Q<M;Q+=4)for(let ie=Q+1;ie<M;ie+=4){const Ve=E[ie]-E[Q];if(Ve<w*.16||Ve>w*.6||E[Q]<w*.12||E[ie]>w*.88)continue;const Ce=Math.hypot(x[Q].x-x[ie].x,x[Q].y-x[ie].y);Ce<se&&(se=Ce,T=Q,ne=ie)}if(T>=0&&se>2*l+1&&se<2*l+16){const Q=(x[T].x+x[ne].x)/2,ie=(x[T].y+x[ne].y)/2;ce.push({x:Q,y:ie,r:se/2+l*.7}),q.push({type:"hole",x:Q+s(-1,1),y:ie+s(-1,1),r:s(1.2,1.7)})}}for(let T=0;T<r(12,22);T++){const ne=s(2,p-2),se=s(2,f-2),Q=a.decor[r(0,a.decor.length-1)];j.push({kind:Q,x:ne,y:se,s:s(.8,1.3),rot:i()*6})}const J=Be(x[0].x,x[0].y),ge=Qn(x,0),fe=Math.atan2(ge.y,ge.x),we=x[M-1],Ae=Qn(x,M-1),ke={x:-Ae.y,y:Ae.x},Ze=[Be(we.x+ke.x*(l+.6),we.y+ke.y*(l+.6)),Be(we.x-ke.x*(l+.6),we.y-ke.y*(l+.6))],He=a.names[t%a.names.length]+(t>=a.names.length?" "+(Math.floor(t/a.names.length)+1):"");return{id:n,name:He,theme:a.key,level:e,w:p,h:f,ground:a.ground,bg:a.bg,wallCol:a.wall,path:x,half:y,pads:ce,patches:z,walls:F,obstacles:q,checkpoints:H,start:J,startAngle:fe,finish:Ze,decor:j}}const ia=new Map;function wc(n,e){const t=n*10+e;return ia.has(t)||ia.set(t,ig(t,n,e)),ia.get(t)}const Kt=10,rg=13;class sg{constructor(e,t,i,r){this.dom=e,this.cam=t,this.rig=i,this.opts=r,this.ray=new p0,this.ndc=new ze,this.plane=new Pn(new U(0,1,0),0),this.pointers=new Map,this.aiming=!1,this.camDrag=null,this.pinch=0,this.lastMid=null,this.down=s=>{if(this.dom.setPointerCapture?.(s.pointerId),this.pointers.set(s.pointerId,{x:s.clientX,y:s.clientY}),this.pointers.size===1){if(s.button===2){this.camDrag={x:s.clientX,y:s.clientY};return}this.opts.canAim()?(this.aiming=!0,this.updateAim(s.clientX,s.clientY)):this.camDrag={x:s.clientX,y:s.clientY}}else if(this.pointers.size===2){this.aiming=!1,this.opts.onCancel(),this.camDrag=null;const a=[...this.pointers.values()];this.pinch=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y),this.lastMid={x:(a[0].x+a[1].x)/2,y:(a[0].y+a[1].y)/2}}},this.move=s=>{if(this.pointers.has(s.pointerId)){if(this.pointers.set(s.pointerId,{x:s.clientX,y:s.clientY}),this.pointers.size===1)this.aiming?this.updateAim(s.clientX,s.clientY):this.camDrag&&(this.rig.rotate(s.clientX-this.camDrag.x),this.rig.tilt(s.clientY-this.camDrag.y),this.camDrag={x:s.clientX,y:s.clientY});else if(this.pointers.size===2){const a=[...this.pointers.values()],o=(a[0].x+a[1].x)/2,l=(a[0].y+a[1].y)/2,c=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);this.lastMid&&(this.rig.rotate((o-this.lastMid.x)*.8),this.rig.tilt((l-this.lastMid.y)*.8)),this.pinch&&this.rig.zoomBy(this.pinch/c,this.dom.clientWidth,this.dom.clientHeight),this.lastMid={x:o,y:l},this.pinch=c}}},this.up=s=>{const a=this.aiming&&this.pointers.size===1;this.pointers.delete(s.pointerId),this.pointers.size<2&&(this.pinch=0,this.lastMid=null),this.pointers.size===0&&(a&&this.release(s.clientX,s.clientY),this.aiming=!1,this.camDrag=null)},this.wheel=s=>{s.preventDefault(),this.rig.zoomBy(s.deltaY>0?1.08:.92,this.dom.clientWidth,this.dom.clientHeight)},e.addEventListener("pointerdown",this.down),e.addEventListener("pointermove",this.move),window.addEventListener("pointerup",this.up),e.addEventListener("wheel",this.wheel,{passive:!1}),e.addEventListener("contextmenu",s=>s.preventDefault())}setCamera(e,t){this.cam=e,this.rig=t}world(e,t){const i=this.dom.getBoundingClientRect();this.ndc.x=(e-i.left)/i.width*2-1,this.ndc.y=-((t-i.top)/i.height)*2+1,this.ray.setFromCamera(this.ndc,this.cam);const r=new U;return this.ray.ray.intersectPlane(this.plane,r)?{x:r.x,z:r.z}:null}aimVec(e,t){const i=this.opts.capPos(),r=this.world(e,t);if(!i||!r)return null;const s=r.x-i.x,a=r.z-i.y,o=Math.hypot(s,a),l=Math.min(1,o/rg);return o<.4?{dx:1,dz:0,power:0}:{dx:-s/o,dz:-a/o,power:l}}updateAim(e,t){const i=this.aimVec(e,t);i&&this.opts.onAim(i.dx,i.dz,i.power)}release(e,t){const i=this.aimVec(e,t);i&&i.power>.06?this.opts.onRelease(i.dx,i.dz,i.power):this.opts.onCancel()}}const Cc="tampinha_rally_v1",Nl={wins:0,skin:"refri",music:.5,sfx:.8,muted:!1,daily:{}};let Ot=ag();function ag(){try{return{...Nl,...JSON.parse(localStorage.getItem(Cc)||"{}")}}catch{return{...Nl}}}function Xr(){try{localStorage.setItem(Cc,JSON.stringify(Ot))}catch{}}const xt={get(){return Ot},addWin(){Ot.wins++,Xr()},wins(){return Ot.wins},setSkin(n){Ot.skin=n,Xr()},skin(){return Ot.skin},setVols(n,e,t){Ot.music=n,Ot.sfx=e,Ot.muted=t,Xr()},dailyBest(n){return Ot.daily[n]},setDailyBest(n,e){(Ot.daily[n]==null||e<Ot.daily[n])&&(Ot.daily[n]=e,Xr())}};let Ne=null,ni,On,Bn,Ti=null,Qi=null,Cn=null,Rc=!1,Ya=0;const yt={music:.5,sfx:.8,muted:!1};function $t(){if(Ne)return!0;try{return Ne=new(window.AudioContext||window.webkitAudioContext),ni=Ne.createGain(),ni.gain.value=yt.muted?0:1,ni.connect(Ne.destination),On=Ne.createGain(),On.gain.value=yt.sfx,On.connect(ni),Bn=Ne.createGain(),Bn.gain.value=yt.music,Bn.connect(ni),!0}catch{return!1}}function Pc(){$t()&&Ne.state==="suspended"&&Ne.resume()}function fo(){const n=Ne.sampleRate*1,e=Ne.createBuffer(1,n,Ne.sampleRate),t=e.getChannelData(0);for(let i=0;i<n;i++)t[i]=Math.random()*2-1;return e}function Rn(n,e,t,i,r,s){if(!Ne)return;const a=Ne.createOscillator(),o=Ne.createGain();a.type=i,a.frequency.setValueAtTime(n,e),s&&a.frequency.exponentialRampToValueAtTime(s,e+t),o.gain.setValueAtTime(0,e),o.gain.linearRampToValueAtTime(r,e+.008),o.gain.exponentialRampToValueAtTime(8e-4,e+t),a.connect(o),o.connect(On),a.start(e),a.stop(e+t+.02)}function ra(n,e,t,i,r){if(!Ne)return;const s=Ne.createBufferSource();s.buffer=fo();const a=Ne.createBiquadFilter(),o=Ne.createGain();a.type="bandpass",a.frequency.value=i,a.Q.value=r,o.gain.setValueAtTime(t,n),o.gain.exponentialRampToValueAtTime(8e-4,n+e),s.connect(a),a.connect(o),o.connect(On),s.start(n),s.stop(n+e+.02)}const jt={flick(n=.5){if(!$t())return;const e=Ne.currentTime;Rn(360+n*340,e,.09,"triangle",.35,220),ra(e,.05,.25,1400,1.2)},ui(){$t()&&Rn(520,Ne.currentTime,.06,"sine",.2,660)},wall(n=1){if(!$t())return;const e=Ne.currentTime;ra(e,.09,Math.min(.4,.12+n*.03),240,2),Rn(150,e,.08,"sine",.2,90)},clack(n=1){if(!$t())return;const e=Ne.currentTime;ra(e,.06,Math.min(.45,.15+n*.03),900,3),Rn(500,e,.05,"square",.15,380)},hole(){if(!$t())return;const n=Ne.currentTime;Rn(400,n,.5,"sine",.3,70)},bonus(){if(!$t())return;const n=Ne.currentTime;[523,659,784,1047].forEach((e,t)=>Rn(e,n+t*.06,.18,"triangle",.25))},bad(){if(!$t())return;const n=Ne.currentTime;Rn(300,n,.25,"sawtooth",.22,140)},win(){if(!$t())return;const n=Ne.currentTime;[523,659,784,1047,784,1047,1319].forEach((e,t)=>Rn(e,n+t*.11,.3,"triangle",.3))},slide(n){if(!$t())return;Ti||(Ti=Ne.createBufferSource(),Ti.buffer=fo(),Ti.loop=!0,Cn=Ne.createBiquadFilter(),Cn.type="bandpass",Cn.frequency.value=1200,Cn.Q.value=.8,Qi=Ne.createGain(),Qi.gain.value=0,Ti.connect(Cn),Cn.connect(Qi),Qi.connect(On),Ti.start());const e=Math.min(.22,n*.02);Qi.gain.setTargetAtTime(e,Ne.currentTime,.05),Cn&&Cn.frequency.setTargetAtTime(700+n*90,Ne.currentTime,.05)}},Fl=[[196,247,294],[220,262,330],[175,220,262],[196,247,311]];function og(){$t()&&(Rc=!0,Ya=0,Lc())}function Lc(){if(!Ne||!Rc)return;const n=Ne.currentTime,e=Ya%Fl.length,t=Fl[e];t.forEach(r=>{const s=Ne.createOscillator(),a=Ne.createGain();s.type="triangle",s.frequency.value=r,a.gain.setValueAtTime(0,n),a.gain.linearRampToValueAtTime(.06,n+.05),a.gain.exponentialRampToValueAtTime(.001,n+1.7),s.connect(a),a.connect(Bn),s.start(n),s.stop(n+1.8)}),[t[2]*2,t[1]*2,t[2]*2,t[0]*2].forEach((r,s)=>{const a=Ne.createOscillator(),o=Ne.createGain();a.type="sine",a.frequency.value=r;const l=n+s*.45;o.gain.setValueAtTime(0,l),o.gain.linearRampToValueAtTime(.05,l+.03),o.gain.exponentialRampToValueAtTime(.001,l+.35),a.connect(o),o.connect(Bn),a.start(l),a.stop(l+.4)});for(let r=0;r<8;r++)lg(n+r*.225);Ya++,setTimeout(Lc,1800)}function lg(n){if(!Ne)return;const e=Ne.createBufferSource();e.buffer=fo();const t=Ne.createBiquadFilter(),i=Ne.createGain();t.type="highpass",t.frequency.value=6e3,i.gain.setValueAtTime(.03,n),i.gain.exponentialRampToValueAtTime(.001,n+.08),e.connect(t),t.connect(i),i.connect(Bn),e.start(n),e.stop(n+.1)}function Dc(n){yt.music=n,Bn&&(Bn.gain.value=n)}function Ic(n){yt.sfx=n,On&&(On.gain.value=n)}function Uc(n){yt.muted=n,ni&&(ni.gain.value=n?0:1)}const qr=["Bolha","Zé","Nina","Tato","Duda","Chico","Lila"];class cg{constructor(e){this.root=document.getElementById("ui"),this.cfgLevel=0,this.cfgTrack=0,this.cfgPick="specific",this.cfgMode="quick",this.cfgPlayers=[],this.toastEl=null,this.toastT=0,this.hud=null,this.onPause=null,this.onResume=null,this.onRestart=null,this.onNext=null,this.onMenu=null,this.cb=e,this.resetPlayers("quick")}el(e){const t=document.createElement("div");return t.innerHTML=e.trim(),t.firstElementChild}clear(){this.root.querySelectorAll(".screen").forEach(e=>e.remove())}showMenu(){this.clear();const e=xt.wins(),t=this.el(`
      <div class="screen menu">
        <div class="logo"><span class="cap-ico"></span><h1>Tampinha <em>Rally</em></h1><div class="tag">corrida de tampinhas · peteléco &amp; caos</div></div>
        <div class="mode-grid">
          <button class="mode-btn" data-m="quick"><b>Corrida Rápida</b><span>você + IA, é só jogar</span></button>
          <button class="mode-btn" data-m="ai"><b>Contra a IA</b><span>escolha rivais e nível</span></button>
          <button class="mode-btn" data-m="local"><b>Multiplayer Local</b><span>2–6 no mesmo aparelho</span></button>
          <button class="mode-btn" data-m="champ"><b>Campeonato</b><span>várias pistas, 1 campeão</span></button>
          <button class="mode-btn" data-m="daily"><b>Desafio Diário</b><span>pista do dia, menos petelecos</span></button>
          <button class="mode-btn ghost" data-m="skins"><b>Tampinhas</b><span>desbloqueadas: ${mn.filter(i=>e>=i.unlock).length}/${mn.length}</span></button>
        </div>
        <div class="menu-foot"><button class="txt-btn" id="cfgBtn">⚙ Ajustes</button><span>Vitórias: <b>${e}</b></span></div>
      </div>`);this.root.appendChild(t),t.querySelectorAll(".mode-btn").forEach(i=>i.addEventListener("click",()=>{const r=i.dataset.m;r==="skins"?this.showSkins():this.showSetup(r)})),t.querySelector("#cfgBtn").addEventListener("click",()=>this.showSettings())}resetPlayers(e){this.cfgPlayers=[{human:!0,ai:"cauteloso",color:0,name:"Você"}];let t=3;e==="daily"&&(t=0),e==="local"&&(t=1);for(let i=0;i<t;i++)this.cfgPlayers.push({human:e==="local",ai:dn[i%dn.length],color:(i+1)%ji.length,name:e==="local"?`Jogador ${i+2}`:qr[i%qr.length]})}showSetup(e){if(this.cfgMode=e,this.resetPlayers(e),this.cfgPick="specific",e==="daily"){const t=new Date,i=t.getFullYear()*372+(t.getMonth()+1)*31+t.getDate();this.cfgLevel=i%5,this.cfgTrack=Math.floor(i/5)%Kt}this.renderSetup()}renderSetup(){this.clear();const e=this.cfgMode==="daily",t=this.cfgMode==="champ",i=this.cfgPick!=="specific",r=wc(this.cfgLevel,this.cfgTrack),s=!e,a={quick:"Corrida Rápida",ai:"Contra a IA",local:"Multiplayer Local",champ:"Campeonato",daily:"Desafio Diário"}[this.cfgMode],o=e?"":`<div class="lvl-row" id="lvls">
      ${Ji.map((u,m)=>`<button class="lvl-chip ${m===this.cfgLevel?"sel":""}" data-l="${m}" style="--lc:${Wr[m]}"><b>${u}</b><span>${this.levelHint(m)}</span></button>`).join("")}
    </div>`;let l="";if(t)l=`<div class="champ-note">🏆 Campeonato: <b>5 pistas sorteadas</b> do nível <b style="color:${Wr[this.cfgLevel]}">${Ji[this.cfgLevel]}</b>. Some pontos e seja o campeão!</div>`;else if(i)l=`<div class="track-pick">
        <div class="track-card mystery" style="border-color:${this.cfgPick==="randany"?"#b98cff":Wr[this.cfgLevel]}">
          <div class="track-name">🎲 Surpresa!</div>
          <div class="track-sub">${this.cfgPick==="randany"?"pista aleatória de qualquer nível":"pista aleatória do nível "+Ji[this.cfgLevel]}</div>
        </div>
      </div>`;else{const u=!e,m=Array.from({length:Kt},(g,v)=>`<button class="tnum ${v===this.cfgTrack?"sel":""}" data-i="${v}">${v+1}</button>`).join("");l=`<div class="track-pick">
        ${u?'<button class="arrow" id="tprev">‹</button>':""}
        <div class="track-card" style="border-color:${Wr[this.cfgLevel]}">
          <div class="track-name">${r.name}</div>
          <div class="track-sub">${r.theme} · ${this.lenLabel(r)}${u?" · pista "+(this.cfgTrack+1)+"/"+Kt:" · "+Ji[this.cfgLevel]}</div>
          <div class="track-mini" id="mini"></div>
        </div>
        ${u?'<button class="arrow" id="tnext">›</button>':""}
      </div>
      ${u?`<div class="tnum-row" id="tnums">${m}</div>`:""}`}const c=e||t?"":`<div class="rand-row">
      <button class="chip ${this.cfgPick==="specific"?"sel":""}" id="pspec">🎯 Escolher</button>
      <button class="chip ${this.cfgPick==="randlevel"?"sel":""}" id="prlvl">🎲 Do nível</button>
      <button class="chip ${this.cfgPick==="randany"?"sel":""}" id="prany">🎲 Qualquer</button>
    </div>`,h=this.el(`
      <div class="screen setup">
        <div class="setup-head"><button class="txt-btn" id="back">‹ Voltar</button><h2>${a}</h2><div></div></div>
        ${o}
        ${c}
        ${l}
        ${s?`<div class="players" id="players"></div>
        <div class="pcount">
          <button class="chip" id="less">– jogador</button>
          <span>${this.cfgPlayers.length} tampinhas</span>
          <button class="chip" id="more">+ jogador</button>
        </div>`:`<div class="daily-note">Pista do dia: <b>${r.name}</b> (${Ji[this.cfgLevel]}). Contra o relógio: leve a tampinha à chegada com o <b>menor número de petelecos</b>. Recorde de hoje: <b>${xt.dailyBest(hg())??"—"}</b></div>`}
        <button class="play-btn" id="play">Jogar ▶</button>
      </div>`);this.root.appendChild(h);const d=h.querySelector("#mini");d&&this.drawMini(d,r),h.querySelector("#back").addEventListener("click",()=>this.showMenu()),h.querySelectorAll(".lvl-chip").forEach(u=>u.addEventListener("click",()=>{this.cfgLevel=+u.dataset.l,this.cfgTrack=0,this.renderSetup()})),h.querySelector("#pspec")?.addEventListener("click",()=>{this.cfgPick="specific",this.renderSetup()}),h.querySelector("#prlvl")?.addEventListener("click",()=>{this.cfgPick="randlevel",this.renderSetup()}),h.querySelector("#prany")?.addEventListener("click",()=>{this.cfgPick="randany",this.renderSetup()}),h.querySelector("#tprev")?.addEventListener("click",()=>{this.cfgTrack=(this.cfgTrack+Kt-1)%Kt,this.renderSetup()}),h.querySelector("#tnext")?.addEventListener("click",()=>{this.cfgTrack=(this.cfgTrack+1)%Kt,this.renderSetup()}),h.querySelectorAll(".tnum").forEach(u=>u.addEventListener("click",()=>{this.cfgTrack=+u.dataset.i,this.renderSetup()})),s&&(this.renderPlayers(h.querySelector("#players")),h.querySelector("#less").addEventListener("click",()=>{this.cfgPlayers.length>2&&(this.cfgPlayers.pop(),this.renderSetup())}),h.querySelector("#more").addEventListener("click",()=>{if(this.cfgPlayers.length<6){const u=this.cfgPlayers.length;this.cfgPlayers.push({human:this.cfgMode==="local",ai:dn[u%dn.length],color:u%ji.length,name:this.cfgMode==="local"?`Jogador ${u+1}`:qr[(u-1)%qr.length]}),this.renderSetup()}})),h.querySelector("#play").addEventListener("click",()=>this.launch())}levelHint(e){return["muito protegida","protegida","pouca proteção","quase sem muro","sem muro"][e]}lenLabel(e){let t=0;for(let i=1;i<e.path.length;i++)t+=Math.hypot(e.path[i].x-e.path[i-1].x,e.path[i].y-e.path[i-1].y);return t<320?"curta":t<480?"longa":t<620?"muito longa":"épica"}renderPlayers(e){e.innerHTML="",this.cfgPlayers.forEach((t,i)=>{const r=this.el(`<div class="prow">
        <span class="pdot" style="background:${ji[t.color]}"></span>
        <input class="pname" value="${t.name}" ${i===0?"readonly":""}/>
        ${i===0?'<span class="ptag you">você</span>':`<button class="ptype">${t.human?"👤 Humano":"🤖 "+$0[t.ai]}</button>`}
      </div>`);e.appendChild(r);const s=r.querySelector(".pname");s.addEventListener("change",()=>t.name=s.value||t.name);const a=r.querySelector(".pdot");a.addEventListener("click",()=>{t.color=(t.color+1)%ji.length,a.style.background=ji[t.color]});const o=r.querySelector(".ptype");o&&o.addEventListener("click",()=>{if(this.cfgMode==="local")t.human=!t.human,t.human||(t.ai=dn[i%dn.length]);else{const l=dn.indexOf(t.ai);t.ai=dn[(l+1)%dn.length],t.human=!1}this.renderPlayers(e)})})}launch(){const e=this.cfgMode==="daily"?[{name:"Você",isAI:!1,skin:xt.skin()}]:this.cfgPlayers.map((r,s)=>({name:r.name,isAI:!r.human,ai:r.ai,skin:s===0?xt.skin():mn[Math.floor(Math.random()*mn.length)].id}));let t=this.cfgLevel,i=this.cfgTrack;this.cfgPick==="randlevel"?i=Math.floor(Math.random()*Kt):this.cfgPick==="randany"&&(t=Math.floor(Math.random()*5),i=Math.floor(Math.random()*Kt)),this.cb.start({level:t,trackIdx:i,pick:this.cfgPick,players:e,mode:this.cfgMode})}drawMini(e,t){const a=document.createElement("canvas");a.width=250,a.height=156;const o=a.getContext("2d"),l=Math.min((250-10*2)/t.w,(156-10*2)/t.h),c=(250-t.w*l)/2,h=(156-t.h*l)/2,d=g=>c+g*l,u=g=>h+g*l;o.fillStyle="#0000002e",o.fillRect(0,0,250,156),o.strokeStyle="rgba(255,255,255,0.18)",o.lineWidth=Math.max(4,8*l),o.lineCap="round",o.lineJoin="round",o.beginPath(),t.path.forEach((g,v)=>{const p=d(g.x),f=u(g.y);v?o.lineTo(p,f):o.moveTo(p,f)}),o.stroke(),o.strokeStyle=t.wallCol||"#caa",o.globalAlpha=.9,o.lineWidth=1.3,o.beginPath();for(const g of t.walls)o.moveTo(d(g.a.x),u(g.a.y)),o.lineTo(d(g.b.x),u(g.b.y));o.stroke(),o.globalAlpha=1,o.strokeStyle="rgba(255,255,255,0.5)",o.lineWidth=1.4,o.setLineDash([3,3]),o.beginPath(),t.path.forEach((g,v)=>{const p=d(g.x),f=u(g.y);v?o.lineTo(p,f):o.moveTo(p,f)}),o.stroke(),o.setLineDash([]);for(const g of t.obstacles){const v=Math.max(1.4,g.r*l);o.fillStyle=g.type==="hole"?"#120c06":g.type==="bomb"?"#e5484d":g.type==="stone"?"#9a948a":g.n>=3?"#e0a020":g.n===2?"#2e9fa4":"#2ea44f",o.beginPath(),o.arc(d(g.x),u(g.y),v,0,7),o.fill()}o.fillStyle="#3fae6a",o.beginPath(),o.arc(d(t.start.x),u(t.start.y),4,0,7),o.fill(),o.fillStyle="#e5484d";const m=t.finish[0];o.beginPath(),o.arc(d(m.x),u(m.y),4,0,7),o.fill(),e.innerHTML="",e.appendChild(a)}showSkins(){this.clear();const e=xt.wins(),t=xt.skin(),i=this.el(`<div class="screen skins">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Voltar</button><h2>Tampinhas <span class="cap-count">${C0(e).length}/${mn.length}</span></h2><div></div></div>
      <div class="skin-scroll" id="scroll"></div>
    </div>`);this.root.appendChild(i);const r=i.querySelector("#scroll");for(const s of P0){const a=mn.filter(h=>h.rarity===s),o=a.filter(h=>e>=h.unlock).length,l=this.el(`<div class="rar-sec">
        <div class="rar-head" style="--rc:${Ll[s]}"><span class="rar-dot"></span>${R0[s]} <b>${o}/${a.length}</b></div>
        <div class="skin-grid"></div></div>`);r.appendChild(l);const c=l.querySelector(".skin-grid");for(const h of a){const d=e<h.unlock,u=this.el(`<button class="skin-card ${t===h.id?"sel":""} ${d?"locked":""}" style="--rc:${Ll[h.rarity]}">
          <div class="skin-face"></div>
          <div class="skin-name">${h.name}</div>
          <div class="skin-desc">${d?"🔒 "+h.unlock+" vitórias":h.desc}</div>
          <div class="skin-bars">${Yr("Desliza",h.stats.slide)}${Yr("Peso",h.stats.weight)}${Yr("Controle",h.stats.control)}${Yr("Quique",h.stats.bounce)}</div>
        </button>`),m=u.querySelector(".skin-face"),g=Mc(h.art,132);g.style.width="100%",g.style.height="auto",g.style.display="block",d&&(g.style.filter="grayscale(1) brightness(0.55)"),m.appendChild(g),c.appendChild(u),d||u.addEventListener("click",()=>{this.cb.setSkin(h.id),this.showSkins()})}}i.querySelector("#back").addEventListener("click",()=>this.showMenu())}showSettings(){this.clear();const e=this.el(`<div class="screen settings">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Voltar</button><h2>Ajustes</h2><div></div></div>
      <div class="cfg-row"><label>Música</label><input type="range" id="mus" min="0" max="1" step="0.05" value="${yt.music}"></div>
      <div class="cfg-row"><label>Efeitos</label><input type="range" id="sfx" min="0" max="1" step="0.05" value="${yt.sfx}"></div>
      <div class="cfg-row"><label>Mudo</label><button class="chip" id="mute">${yt.muted?"🔇 Ligado":"🔊 Desligado"}</button></div>
      <div class="how"><b>Como jogar:</b> arraste a tampinha <b>para trás</b> e solte — quanto mais puxa, mais forte. 3 petelecos por vez; chegue primeiro! <b>Proteção:</b> pistas fáceis têm muro que te segura na pista; nas difíceis o muro some e é fácil <b>cair fora</b> (volta pro início do turno). <b>Buraco</b> = volta ao checkpoint e perde 1 peteléco · <b>X</b> = perde a vez · <b>verde +1/+2/+3</b> = petelecos extras. Câmera: dois dedos giram/aproximam.</div>
    </div>`);this.root.appendChild(e);const t=()=>this.cb.setVols(+e.querySelector("#mus").value,+e.querySelector("#sfx").value,yt.muted);e.querySelector("#mus").addEventListener("input",t),e.querySelector("#sfx").addEventListener("input",t),e.querySelector("#mute").addEventListener("click",()=>{yt.muted=!yt.muted,t(),e.querySelector("#mute").textContent=yt.muted?"🔇 Ligado":"🔊 Desligado"}),e.querySelector("#back").addEventListener("click",()=>this.showMenu())}showGame(){this.clear(),this.hud=this.el(`
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
    </div>`),this.root.appendChild(this.hud),this.hud.querySelector("#pause").addEventListener("click",()=>this.onPause?.())}updateHUD(e,t){if(!this.hud)return;const i=e.activeCap(),r=this.hud.querySelector("#turn");r.innerHTML=`<span class="tdot" style="background:${ir(i.skin).top}"></span> ${i.finished?"Corrida!":"Vez de <b>"+i.name+"</b>"}`;const s=this.hud.querySelector("#flicks");let a="";Math.max(3,i.flicksLeft);for(let c=0;c<i.flicksLeft;c++)a+='<span class="fd on"></span>';s.innerHTML=(e.phase==="aim"&&t?'<span class="fl-lab">Petelecos</span>':"")+a+(i.flicksLeft===1?'<span class="flast">último!</span>':""),s.style.opacity=i.isAI||e.phase!=="aim"?"0.55":"1";const o=this.hud.querySelector("#stand");o.innerHTML=e.standings().map((c,h)=>`<div class="srow ${c.id===i.id?"act":""}"><span class="spos">${h+1}º</span><span class="sdot" style="background:${ir(c.skin).top}"></span><span class="sname">${c.name}</span>${c.finished?'<span class="sfin">🏁</span>':""}</div>`).join("");const l=this.hud.querySelector("#hint");l.style.display=t&&e.phase==="aim"?"block":"none",l.textContent="Arraste a tampinha para trás e solte"}toast(e,t=""){if(!this.hud)return;const i=this.hud.querySelector("#toasts"),r=this.el(`<div class="toast ${t}">${e}</div>`);i.appendChild(r),setTimeout(()=>r.classList.add("show"),10),setTimeout(()=>{r.classList.remove("show"),setTimeout(()=>r.remove(),300)},1700)}showPause(){const e=this.hud.querySelector("#modal"),t=this.hud.querySelector("#mbox");t.className="modal",t.innerHTML=`<h3>Pausado</h3><div class="mactions col">
      <button class="play-btn" id="r">▶ Continuar</button>
      <button class="chip" id="re">↻ Reiniciar</button>
      <button class="chip" id="mn">Sair</button></div>`,e.classList.remove("hidden"),t.querySelector("#r").addEventListener("click",()=>this.onResume?.()),t.querySelector("#re").addEventListener("click",()=>this.onRestart?.()),t.querySelector("#mn").addEventListener("click",()=>this.onMenu?.())}hideModal(){this.hud?.querySelector("#modal").classList.add("hidden")}showResults(e,t,i){const r=this.hud.querySelector("#modal"),s=this.hud.querySelector("#mbox"),a=e.standings(),o=e.caps.find(u=>!u.isAI),l=o&&o.place===1;s.className="modal win";const c=a.slice(0,Math.min(4,a.length)).map((u,m)=>`<div class="prow2"><span class="pl">${["🥇","🥈","🥉","4º"][m]}</span><span class="sdot" style="background:${ir(u.skin).top}"></span><span>${u.name}</span></div>`).join(""),h=t==="daily"?`<h3>Chegou!</h3><div class="big">${e.caps[0].place===1?"Você completou!":""}</div>`:`<h3>${l?"Você venceu! 🎉":o?o.place+"º lugar":"Fim!"}</h3>`,d=i?`<div class="champ-line">Corrida ${i.race}/${i.total} · ${i.pts}</div>`:"";s.innerHTML=`${h}${d}<div class="podium">${c}</div>
      <div class="mactions">
        <button class="chip" id="mn">Menu</button>
        <button class="chip" id="re">↻ Revanche</button>
        <button class="play-btn" id="nx">${i&&!i.last?"Próxima ▶":"Nova pista ▶"}</button>
      </div>`,r.classList.remove("hidden"),s.querySelector("#mn").addEventListener("click",()=>this.onMenu?.()),s.querySelector("#re").addEventListener("click",()=>this.onRestart?.()),s.querySelector("#nx").addEventListener("click",()=>this.onNext?.())}}function Yr(n,e){const t=Math.round((e-.8)/.4*100);return`<div class="sbar"><span>${n}</span><i style="width:${Math.max(8,Math.min(100,t))}%"></i></div>`}function hg(){const n=new Date;return`${n.getFullYear()}-${n.getMonth()+1}-${n.getDate()}`}const Nc=document.getElementById("scene"),Fc=m0(Nc);let In,rn=new vc(34,54),or=null;const $a=new B0,Ht=new z0,rr=new H0,je=new Z0;let Li="quick",At=null,dt=null,po=0,dr=!1,Ol=!1;function ds(n){At=n,Li=n.mode,po=0;const e=wc(n.level,n.trackIdx);In=g0(e.bg),_0(In,e.w,e.h),or=E0(e),In.add(or.group),In.add($a.group,Ht.points,rr.group),rn=new vc(e.w,e.h),rn.setFrustum(21,innerWidth,innerHeight),go(),je.setup(e,n.players),$a.build(je.caps),ug.setCamera(rn.camera,rn),_t.showGame(),dr=!0,Ol||(og(),Ol=!0),_t.updateHUD(je,mo())}function mo(){return je.phase==="aim"&&!je.activeCap().isAI}je.onToast=(n,e)=>_t.toast(n,e);je.onChange=()=>_t.updateHUD(je,mo());je.onFlick=(n,e)=>{jt.flick(e),bc[je.track.surfaceAt(n.pos)],Ht.dust(n.pos.x,n.pos.y,8),rr.hide()};je.onEvent=n=>{switch(n.type){case"wall":jt.wall(n.power),Ht.impact(n.x,n.y,n.power*.4,"#ffe6b0");break;case"stone":jt.wall(n.power),Ht.impact(n.x,n.y,n.power*.5,"#e8e0d0");break;case"capHit":jt.clack(n.power),Ht.impact(n.x,n.y,n.power*.6,"#fff");break;case"hole":jt.hole(),Ht.dust(n.x,n.y,14,"#3a2c1a");break;case"bomb":jt.bad(),Ht.impact(n.x,n.y,10,"#ff8a5a");break;case"bonus":jt.bonus(),Ht.impact(n.x,n.y,10,"#8affc0");break;case"out":jt.bad(),Ht.dust(n.x,n.y,10,"#cbb58a");break;case"finish":Ht.confetti(n.x,n.y);break}};const _t=new cg({start:n=>{if(Pc(),n.mode==="champ"){const e=[0,1,2,3,4,5,6,7,8,9];for(let i=e.length-1;i>0;i--){const r=Math.floor(Math.random()*(i+1));[e[i],e[r]]=[e[r],e[i]]}const t=e.slice(0,5).map(i=>({level:n.level,idx:i}));dt={seq:t,race:0,pts:new Map},n.level=t[0].level,n.trackIdx=t[0].idx}else dt=null;ds(n)},setVols:(n,e,t)=>{Dc(n),Ic(e),Uc(t),xt.setVols(n,e,t)},setSkin:n=>{xt.setSkin(n),jt.ui()}});_t.onPause=()=>{je.phase!=="over"&&(Vi=!0,_t.showPause())};_t.onResume=()=>{Vi=!1,_t.hideModal()};_t.onRestart=()=>{Vi=!1,_t.hideModal(),At&&ds(At)};_t.onMenu=()=>{dr=!1,Vi=!1,dg(),_t.showMenu()};_t.onNext=()=>{if(_t.hideModal(),dt){if(dt.race++,dt.race>=dt.seq.length){pg();return}At.level=dt.seq[dt.race].level,At.trackIdx=dt.seq[dt.race].idx,ds(At);return}At&&(At.pick==="randany"?(At.level=Math.floor(Math.random()*5),At.trackIdx=Math.floor(Math.random()*Kt)):At.pick==="randlevel"?At.trackIdx=Math.floor(Math.random()*Kt):At.trackIdx=(At.trackIdx+1)%Kt,ds(At))};Dc(xt.get().music);Ic(xt.get().sfx);Uc(xt.get().muted);yt.music=xt.get().music;yt.sfx=xt.get().sfx;yt.muted=xt.get().muted;let Vi=!1;const ug=new sg(Nc,rn.camera,rn,{canAim:()=>dr&&!Vi&&mo(),capPos:()=>{const n=je.activeCap();return n?{x:n.pos.x,y:n.pos.y}:null},onAim:(n,e,t)=>{const i=je.activeCap();rr.set(i.pos.x,i.pos.y,n,e,t)},onRelease:(n,e,t)=>{rr.hide(),Li==="daily"&&po++,je.flick({x:n,y:e},t)},onCancel:()=>rr.hide()});function dg(){In&&In.clear(),or=null}let Ka=!1;function fg(){if(Ka)return;Ka=!0;const n=je.caps.find(t=>!t.isAI);n&&n.place===1&&Li!=="daily"&&xt.addWin(),Li==="daily"&&je.caps[0].finished&&xt.setDailyBest(gg(),po),jt.win();let e;if(dt){const t=[10,6,4,3,2,1];je.standings().forEach((r,s)=>dt.pts.set(r.id,(dt.pts.get(r.id)||0)+(t[s]||0)));const i="Pontos: "+[...dt.pts.entries()].sort((r,s)=>s[1]-r[1]).map(([r,s])=>`${je.caps[r].name} ${s}`).slice(0,3).join(" · ");e={race:dt.race+1,total:dt.seq.length,last:dt.race+1>=dt.seq.length,pts:i}}_t.showResults(je,Li,e)}function pg(){const n=[...dt.pts.entries()].sort((t,i)=>i[1]-t[1])[0],e=je.caps[n[0]];e&&!e.isAI&&xt.addWin(),_t.toast("Campeão: "+e.name+" 🏆","good"),dt=null,_t.onMenu?.()}function go(){const n=innerWidth,e=innerHeight;Fc.setSize(n,e),rn.resize(n,e)}addEventListener("resize",go);addEventListener("pointerdown",()=>Pc(),{once:!0});_t.showMenu();go();window.__mgr=je;window.__diag={get inGame(){return dr},get mode(){return Li}};const mg=new f0;let $r=0;function Oc(){const n=Math.min(.05,mg.getDelta());if($r+=n,dr&&In){Vi||(je.update(n),je.phase==="over"?fg():Ka=!1);let e=je.activeCap();if(je.phase==="resolve"){let i=-1,r=e;for(const s of je.caps){const a=xn(s.vel);s.moving&&a>i&&(i=a,r=s)}e=r}e&&rn.follow(e.pos.x,e.pos.y),rn.update(n);let t=0;for(const i of je.caps)if(i.moving){const r=xn(i.vel);if(r>t&&(t=r),r>3&&Math.random()<.5){const s=je.track.surfaceAt(i.pos);(s==="sand"||s==="dirt"||s==="mud"||s==="grass")&&Ht.dust(i.pos.x,i.pos.y,1,s==="mud"?"#5c452a":s==="grass"?"#5f8a36":"#d8c090")}}if(jt.slide(t),or)for(const i of or.pulses){const r=1+Math.sin($r*4)*.18;i.mesh.scale.set(r,r,1),i.mesh.material.opacity=.22+Math.sin($r*4)*.12}$a.update(je.caps,$r,je.activeCap()?.id??-1),Ht.update(n),Fc.render(In,rn.camera)}requestAnimationFrame(Oc)}Oc();function gg(){const n=new Date;return`${n.getFullYear()}-${n.getMonth()+1}-${n.getDate()}`}
