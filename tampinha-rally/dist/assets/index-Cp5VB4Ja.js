(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const vo="169",bh=0,Xo=1,yh=2,gc=1,vc=2,Pn=3,si=0,$t=1,Mn=2,ei=0,Mi=1,xi=2,Yo=3,jo=4,Mh=5,gi=100,Sh=101,Eh=102,Th=103,wh=104,Ah=200,Ch=201,Rh=202,Ph=203,yr=204,Mr=205,Lh=206,Dh=207,Ih=208,Uh=209,Nh=210,Fh=211,kh=212,Oh=213,Bh=214,Sr=0,Er=1,Tr=2,Qi=3,wr=4,Ar=5,Cr=6,Rr=7,_c=0,zh=1,Hh=2,ti=0,Gh=1,Vh=2,Wh=3,xc=4,qh=5,$h=6,Xh=7,bc=300,es=301,ts=302,Pr=303,Lr=304,wa=306,Dr=1e3,bi=1001,Ir=1002,on=1003,Yh=1004,ks=1005,vn=1006,ka=1007,yi=1008,kn=1009,yc=1010,Mc=1011,As=1012,_o=1013,Ti=1014,Un=1015,Ps=1016,xo=1017,bo=1018,ns=1020,Sc=35902,Ec=1021,Tc=1022,bn=1023,wc=1024,Ac=1025,Ki=1026,is=1027,Cc=1028,yo=1029,Rc=1030,Mo=1031,So=1033,da=33776,ua=33777,fa=33778,pa=33779,Ur=35840,Nr=35841,Fr=35842,kr=35843,Or=36196,Br=37492,zr=37496,Hr=37808,Gr=37809,Vr=37810,Wr=37811,qr=37812,$r=37813,Xr=37814,Yr=37815,jr=37816,Kr=37817,Zr=37818,Jr=37819,Qr=37820,eo=37821,ma=36492,to=36494,no=36495,Pc=36283,io=36284,so=36285,ao=36286,jh=3200,Kh=3201,Lc=0,Zh=1,Jn="",qt="srgb",ri="srgb-linear",Eo="display-p3",Aa="display-p3-linear",xa="linear",lt="srgb",ba="rec709",ya="p3",Pi=7680,Ko=519,Jh=512,Qh=513,ed=514,Dc=515,td=516,nd=517,id=518,sd=519,Zo=35044,Jo="300 es",Nn=2e3,Ma=2001;class rs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const a=s.indexOf(t);a!==-1&&s.splice(a,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let a=0,r=s.length;a<r;a++)s[a].call(this,e);e.target=null}}}const Rt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Qo=1234567;const Ss=Math.PI/180,Cs=180/Math.PI;function os(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Rt[n&255]+Rt[n>>8&255]+Rt[n>>16&255]+Rt[n>>24&255]+"-"+Rt[e&255]+Rt[e>>8&255]+"-"+Rt[e>>16&15|64]+Rt[e>>24&255]+"-"+Rt[t&63|128]+Rt[t>>8&255]+"-"+Rt[t>>16&255]+Rt[t>>24&255]+Rt[i&255]+Rt[i>>8&255]+Rt[i>>16&255]+Rt[i>>24&255]).toLowerCase()}function zt(n,e,t){return Math.max(e,Math.min(t,n))}function To(n,e){return(n%e+e)%e}function ad(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function rd(n,e,t){return n!==e?(t-n)/(e-n):0}function Es(n,e,t){return(1-t)*n+t*e}function od(n,e,t,i){return Es(n,e,1-Math.exp(-t*i))}function ld(n,e=1){return e-Math.abs(To(n,e*2)-e)}function cd(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function hd(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function dd(n,e){return n+Math.floor(Math.random()*(e-n+1))}function ud(n,e){return n+Math.random()*(e-n)}function fd(n){return n*(.5-Math.random())}function pd(n){n!==void 0&&(Qo=n);let e=Qo+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function md(n){return n*Ss}function gd(n){return n*Cs}function vd(n){return(n&n-1)===0&&n!==0}function _d(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function xd(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function bd(n,e,t,i,s){const a=Math.cos,r=Math.sin,o=a(t/2),c=r(t/2),l=a((e+i)/2),h=r((e+i)/2),d=a((e-i)/2),u=r((e-i)/2),f=a((i-e)/2),g=r((i-e)/2);switch(s){case"XYX":n.set(o*h,c*d,c*u,o*l);break;case"YZY":n.set(c*u,o*h,c*d,o*l);break;case"ZXZ":n.set(c*d,c*u,o*h,o*l);break;case"XZX":n.set(o*h,c*g,c*f,o*l);break;case"YXY":n.set(c*f,o*h,c*g,o*l);break;case"ZYZ":n.set(c*g,c*f,o*h,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Xi(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Nt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Os={DEG2RAD:Ss,RAD2DEG:Cs,generateUUID:os,clamp:zt,euclideanModulo:To,mapLinear:ad,inverseLerp:rd,lerp:Es,damp:od,pingpong:ld,smoothstep:cd,smootherstep:hd,randInt:dd,randFloat:ud,randFloatSpread:fd,seededRandom:pd,degToRad:md,radToDeg:gd,isPowerOfTwo:vd,ceilPowerOfTwo:_d,floorPowerOfTwo:xd,setQuaternionFromProperEuler:bd,normalize:Nt,denormalize:Xi};class Xe{constructor(e=0,t=0){Xe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(zt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),a=this.x-e.x,r=this.y-e.y;return this.x=a*i-r*s+e.x,this.y=a*s+r*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ve{constructor(e,t,i,s,a,r,o,c,l){Ve.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,a,r,o,c,l)}set(e,t,i,s,a,r,o,c,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=a,h[5]=c,h[6]=i,h[7]=r,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,a=this.elements,r=i[0],o=i[3],c=i[6],l=i[1],h=i[4],d=i[7],u=i[2],f=i[5],g=i[8],v=s[0],m=s[3],p=s[6],_=s[1],y=s[4],M=s[7],C=s[2],w=s[5],A=s[8];return a[0]=r*v+o*_+c*C,a[3]=r*m+o*y+c*w,a[6]=r*p+o*M+c*A,a[1]=l*v+h*_+d*C,a[4]=l*m+h*y+d*w,a[7]=l*p+h*M+d*A,a[2]=u*v+f*_+g*C,a[5]=u*m+f*y+g*w,a[8]=u*p+f*M+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],a=e[3],r=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*r*h-t*o*l-i*a*h+i*o*c+s*a*l-s*r*c}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],a=e[3],r=e[4],o=e[5],c=e[6],l=e[7],h=e[8],d=h*r-o*l,u=o*c-h*a,f=l*a-r*c,g=t*d+i*u+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=d*v,e[1]=(s*l-h*i)*v,e[2]=(o*i-s*r)*v,e[3]=u*v,e[4]=(h*t-s*c)*v,e[5]=(s*a-o*t)*v,e[6]=f*v,e[7]=(i*c-l*t)*v,e[8]=(r*t-i*a)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,a,r,o){const c=Math.cos(a),l=Math.sin(a);return this.set(i*c,i*l,-i*(c*r+l*o)+r+e,-s*l,s*c,-s*(-l*r+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Oa.makeScale(e,t)),this}rotate(e){return this.premultiply(Oa.makeRotation(-e)),this}translate(e,t){return this.premultiply(Oa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Oa=new Ve;function Ic(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Sa(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function yd(){const n=Sa("canvas");return n.style.display="block",n}const el={};function ga(n){n in el||(el[n]=!0,console.warn(n))}function Md(n,e,t){return new Promise(function(i,s){function a(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:i()}}setTimeout(a,t)})}function Sd(n){const e=n.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Ed(n){const e=n.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const tl=new Ve().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),nl=new Ve().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),cs={[ri]:{transfer:xa,primaries:ba,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n,fromReference:n=>n},[qt]:{transfer:lt,primaries:ba,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Aa]:{transfer:xa,primaries:ya,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.applyMatrix3(nl),fromReference:n=>n.applyMatrix3(tl)},[Eo]:{transfer:lt,primaries:ya,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.convertSRGBToLinear().applyMatrix3(nl),fromReference:n=>n.applyMatrix3(tl).convertLinearToSRGB()}},Td=new Set([ri,Aa]),tt={enabled:!0,_workingColorSpace:ri,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!Td.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=cs[e].toReference,s=cs[t].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return cs[n].primaries},getTransfer:function(n){return n===Jn?xa:cs[n].transfer},getLuminanceCoefficients:function(n,e=this._workingColorSpace){return n.fromArray(cs[e].luminanceCoefficients)}};function Zi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ba(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Li;class wd{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Li===void 0&&(Li=Sa("canvas")),Li.width=e.width,Li.height=e.height;const i=Li.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Li}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Sa("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),a=s.data;for(let r=0;r<a.length;r++)a[r]=Zi(a[r]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Zi(t[i]/255)*255):t[i]=Zi(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ad=0;class Uc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ad++}),this.uuid=os(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let a;if(Array.isArray(s)){a=[];for(let r=0,o=s.length;r<o;r++)s[r].isDataTexture?a.push(za(s[r].image)):a.push(za(s[r]))}else a=za(s);i.url=a}return t||(e.images[this.uuid]=i),i}}function za(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?wd.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Cd=0;class Ht extends rs{constructor(e=Ht.DEFAULT_IMAGE,t=Ht.DEFAULT_MAPPING,i=bi,s=bi,a=vn,r=yi,o=bn,c=kn,l=Ht.DEFAULT_ANISOTROPY,h=Jn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Cd++}),this.uuid=os(),this.name="",this.source=new Uc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=a,this.minFilter=r,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Xe(0,0),this.repeat=new Xe(1,1),this.center=new Xe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==bc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Dr:e.x=e.x-Math.floor(e.x);break;case bi:e.x=e.x<0?0:1;break;case Ir:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Dr:e.y=e.y-Math.floor(e.y);break;case bi:e.y=e.y<0?0:1;break;case Ir:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ht.DEFAULT_IMAGE=null;Ht.DEFAULT_MAPPING=bc;Ht.DEFAULT_ANISOTROPY=1;class ft{constructor(e=0,t=0,i=0,s=1){ft.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,a=this.w,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s+r[12]*a,this.y=r[1]*t+r[5]*i+r[9]*s+r[13]*a,this.z=r[2]*t+r[6]*i+r[10]*s+r[14]*a,this.w=r[3]*t+r[7]*i+r[11]*s+r[15]*a,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,a;const c=e.elements,l=c[0],h=c[4],d=c[8],u=c[1],f=c[5],g=c[9],v=c[2],m=c[6],p=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(l+1)/2,M=(f+1)/2,C=(p+1)/2,w=(h+u)/4,A=(d+v)/4,R=(g+m)/4;return y>M&&y>C?y<.01?(i=0,s=.707106781,a=.707106781):(i=Math.sqrt(y),s=w/i,a=A/i):M>C?M<.01?(i=.707106781,s=0,a=.707106781):(s=Math.sqrt(M),i=w/s,a=R/s):C<.01?(i=.707106781,s=.707106781,a=0):(a=Math.sqrt(C),i=A/a,s=R/a),this.set(i,s,a,t),this}let _=Math.sqrt((m-g)*(m-g)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(_)<.001&&(_=1),this.x=(m-g)/_,this.y=(d-v)/_,this.z=(u-h)/_,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Rd extends rs{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new ft(0,0,e,t),this.scissorTest=!1,this.viewport=new ft(0,0,e,t);const s={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:vn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const a=new Ht(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);a.flipY=!1,a.generateMipmaps=i.generateMipmaps,a.internalFormat=i.internalFormat,this.textures=[];const r=i.count;for(let o=0;o<r;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,a=this.textures.length;s<a;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,s=e.textures.length;i<s;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Uc(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class wi extends Rd{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Nc extends Ht{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=on,this.minFilter=on,this.wrapR=bi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Pd extends Ht{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=on,this.minFilter=on,this.wrapR=bi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ls{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,a,r,o){let c=i[s+0],l=i[s+1],h=i[s+2],d=i[s+3];const u=a[r+0],f=a[r+1],g=a[r+2],v=a[r+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=d;return}if(o===1){e[t+0]=u,e[t+1]=f,e[t+2]=g,e[t+3]=v;return}if(d!==v||c!==u||l!==f||h!==g){let m=1-o;const p=c*u+l*f+h*g+d*v,_=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){const C=Math.sqrt(y),w=Math.atan2(C,p*_);m=Math.sin(m*w)/C,o=Math.sin(o*w)/C}const M=o*_;if(c=c*m+u*M,l=l*m+f*M,h=h*m+g*M,d=d*m+v*M,m===1-o){const C=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=C,l*=C,h*=C,d*=C}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,s,a,r){const o=i[s],c=i[s+1],l=i[s+2],h=i[s+3],d=a[r],u=a[r+1],f=a[r+2],g=a[r+3];return e[t]=o*g+h*d+c*f-l*u,e[t+1]=c*g+h*u+l*d-o*f,e[t+2]=l*g+h*f+o*u-c*d,e[t+3]=h*g-o*d-c*u-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,a=e._z,r=e._order,o=Math.cos,c=Math.sin,l=o(i/2),h=o(s/2),d=o(a/2),u=c(i/2),f=c(s/2),g=c(a/2);switch(r){case"XYZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"YZX":this._x=u*h*d+l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d-u*f*g;break;case"XZY":this._x=u*h*d-l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d+u*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],a=t[8],r=t[1],o=t[5],c=t[9],l=t[2],h=t[6],d=t[10],u=i+o+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-c)*f,this._y=(a-l)*f,this._z=(r-s)*f}else if(i>o&&i>d){const f=2*Math.sqrt(1+i-o-d);this._w=(h-c)/f,this._x=.25*f,this._y=(s+r)/f,this._z=(a+l)/f}else if(o>d){const f=2*Math.sqrt(1+o-i-d);this._w=(a-l)/f,this._x=(s+r)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+d-i-o);this._w=(r-s)/f,this._x=(a+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(zt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,a=e._z,r=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=i*h+r*o+s*l-a*c,this._y=s*h+r*c+a*o-i*l,this._z=a*h+r*l+i*c-s*o,this._w=r*h-i*o-s*c-a*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,a=this._z,r=this._w;let o=r*e._w+i*e._x+s*e._y+a*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=r,this._x=i,this._y=s,this._z=a,this;const c=1-o*o;if(c<=Number.EPSILON){const f=1-t;return this._w=f*r+t*this._w,this._x=f*i+t*this._x,this._y=f*s+t*this._y,this._z=f*a+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,o),d=Math.sin((1-t)*h)/l,u=Math.sin(t*h)/l;return this._w=r*d+this._w*u,this._x=i*d+this._x*u,this._y=s*d+this._y*u,this._z=a*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class k{constructor(e=0,t=0,i=0){k.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(il.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(il.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6]*s,this.y=a[1]*t+a[4]*i+a[7]*s,this.z=a[2]*t+a[5]*i+a[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,a=e.elements,r=1/(a[3]*t+a[7]*i+a[11]*s+a[15]);return this.x=(a[0]*t+a[4]*i+a[8]*s+a[12])*r,this.y=(a[1]*t+a[5]*i+a[9]*s+a[13])*r,this.z=(a[2]*t+a[6]*i+a[10]*s+a[14])*r,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,a=e.x,r=e.y,o=e.z,c=e.w,l=2*(r*s-o*i),h=2*(o*t-a*s),d=2*(a*i-r*t);return this.x=t+c*l+r*d-o*h,this.y=i+c*h+o*l-a*d,this.z=s+c*d+a*h-r*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s,this.y=a[1]*t+a[5]*i+a[9]*s,this.z=a[2]*t+a[6]*i+a[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,a=e.z,r=t.x,o=t.y,c=t.z;return this.x=s*c-a*o,this.y=a*r-i*c,this.z=i*o-s*r,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Ha.copy(this).projectOnVector(e),this.sub(Ha)}reflect(e){return this.sub(Ha.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(zt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ha=new k,il=new Ls;class Ds{constructor(e=new k(1/0,1/0,1/0),t=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(hn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(hn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=hn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const a=i.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let r=0,o=a.count;r<o;r++)e.isMesh===!0?e.getVertexPosition(r,hn):hn.fromBufferAttribute(a,r),hn.applyMatrix4(e.matrixWorld),this.expandByPoint(hn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Bs.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Bs.copy(i.boundingBox)),Bs.applyMatrix4(e.matrixWorld),this.union(Bs)}const s=e.children;for(let a=0,r=s.length;a<r;a++)this.expandByObject(s[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,hn),hn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(hs),zs.subVectors(this.max,hs),Di.subVectors(e.a,hs),Ii.subVectors(e.b,hs),Ui.subVectors(e.c,hs),Hn.subVectors(Ii,Di),Gn.subVectors(Ui,Ii),ci.subVectors(Di,Ui);let t=[0,-Hn.z,Hn.y,0,-Gn.z,Gn.y,0,-ci.z,ci.y,Hn.z,0,-Hn.x,Gn.z,0,-Gn.x,ci.z,0,-ci.x,-Hn.y,Hn.x,0,-Gn.y,Gn.x,0,-ci.y,ci.x,0];return!Ga(t,Di,Ii,Ui,zs)||(t=[1,0,0,0,1,0,0,0,1],!Ga(t,Di,Ii,Ui,zs))?!1:(Hs.crossVectors(Hn,Gn),t=[Hs.x,Hs.y,Hs.z],Ga(t,Di,Ii,Ui,zs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,hn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(hn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Tn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Tn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Tn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Tn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Tn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Tn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Tn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Tn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Tn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Tn=[new k,new k,new k,new k,new k,new k,new k,new k],hn=new k,Bs=new Ds,Di=new k,Ii=new k,Ui=new k,Hn=new k,Gn=new k,ci=new k,hs=new k,zs=new k,Hs=new k,hi=new k;function Ga(n,e,t,i,s){for(let a=0,r=n.length-3;a<=r;a+=3){hi.fromArray(n,a);const o=s.x*Math.abs(hi.x)+s.y*Math.abs(hi.y)+s.z*Math.abs(hi.z),c=e.dot(hi),l=t.dot(hi),h=i.dot(hi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Ld=new Ds,ds=new k,Va=new k;class Is{constructor(e=new k,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Ld.setFromPoints(e).getCenter(i);let s=0;for(let a=0,r=e.length;a<r;a++)s=Math.max(s,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ds.subVectors(e,this.center);const t=ds.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(ds,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Va.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ds.copy(e.center).add(Va)),this.expandByPoint(ds.copy(e.center).sub(Va))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const wn=new k,Wa=new k,Gs=new k,Vn=new k,qa=new k,Vs=new k,$a=new k;class Ca{constructor(e=new k,t=new k(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,wn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=wn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(wn.copy(this.origin).addScaledVector(this.direction,t),wn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Wa.copy(e).add(t).multiplyScalar(.5),Gs.copy(t).sub(e).normalize(),Vn.copy(this.origin).sub(Wa);const a=e.distanceTo(t)*.5,r=-this.direction.dot(Gs),o=Vn.dot(this.direction),c=-Vn.dot(Gs),l=Vn.lengthSq(),h=Math.abs(1-r*r);let d,u,f,g;if(h>0)if(d=r*c-o,u=r*o-c,g=a*h,d>=0)if(u>=-g)if(u<=g){const v=1/h;d*=v,u*=v,f=d*(d+r*u+2*o)+u*(r*d+u+2*c)+l}else u=a,d=Math.max(0,-(r*u+o)),f=-d*d+u*(u+2*c)+l;else u=-a,d=Math.max(0,-(r*u+o)),f=-d*d+u*(u+2*c)+l;else u<=-g?(d=Math.max(0,-(-r*a+o)),u=d>0?-a:Math.min(Math.max(-a,-c),a),f=-d*d+u*(u+2*c)+l):u<=g?(d=0,u=Math.min(Math.max(-a,-c),a),f=u*(u+2*c)+l):(d=Math.max(0,-(r*a+o)),u=d>0?a:Math.min(Math.max(-a,-c),a),f=-d*d+u*(u+2*c)+l);else u=r>0?-a:a,d=Math.max(0,-(r*u+o)),f=-d*d+u*(u+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Wa).addScaledVector(Gs,u),f}intersectSphere(e,t){wn.subVectors(e.center,this.origin);const i=wn.dot(this.direction),s=wn.dot(wn)-i*i,a=e.radius*e.radius;if(s>a)return null;const r=Math.sqrt(a-s),o=i-r,c=i+r;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,a,r,o,c;const l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(i=(e.min.x-u.x)*l,s=(e.max.x-u.x)*l):(i=(e.max.x-u.x)*l,s=(e.min.x-u.x)*l),h>=0?(a=(e.min.y-u.y)*h,r=(e.max.y-u.y)*h):(a=(e.max.y-u.y)*h,r=(e.min.y-u.y)*h),i>r||a>s||((a>i||isNaN(i))&&(i=a),(r<s||isNaN(s))&&(s=r),d>=0?(o=(e.min.z-u.z)*d,c=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,c=(e.min.z-u.z)*d),i>c||o>s)||((o>i||i!==i)&&(i=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,wn)!==null}intersectTriangle(e,t,i,s,a){qa.subVectors(t,e),Vs.subVectors(i,e),$a.crossVectors(qa,Vs);let r=this.direction.dot($a),o;if(r>0){if(s)return null;o=1}else if(r<0)o=-1,r=-r;else return null;Vn.subVectors(this.origin,e);const c=o*this.direction.dot(Vs.crossVectors(Vn,Vs));if(c<0)return null;const l=o*this.direction.dot(qa.cross(Vn));if(l<0||c+l>r)return null;const h=-o*Vn.dot($a);return h<0?null:this.at(h/r,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ct{constructor(e,t,i,s,a,r,o,c,l,h,d,u,f,g,v,m){ct.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,a,r,o,c,l,h,d,u,f,g,v,m)}set(e,t,i,s,a,r,o,c,l,h,d,u,f,g,v,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=s,p[1]=a,p[5]=r,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ct().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/Ni.setFromMatrixColumn(e,0).length(),a=1/Ni.setFromMatrixColumn(e,1).length(),r=1/Ni.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*a,t[5]=i[5]*a,t[6]=i[6]*a,t[7]=0,t[8]=i[8]*r,t[9]=i[9]*r,t[10]=i[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,a=e.z,r=Math.cos(i),o=Math.sin(i),c=Math.cos(s),l=Math.sin(s),h=Math.cos(a),d=Math.sin(a);if(e.order==="XYZ"){const u=r*h,f=r*d,g=o*h,v=o*d;t[0]=c*h,t[4]=-c*d,t[8]=l,t[1]=f+g*l,t[5]=u-v*l,t[9]=-o*c,t[2]=v-u*l,t[6]=g+f*l,t[10]=r*c}else if(e.order==="YXZ"){const u=c*h,f=c*d,g=l*h,v=l*d;t[0]=u+v*o,t[4]=g*o-f,t[8]=r*l,t[1]=r*d,t[5]=r*h,t[9]=-o,t[2]=f*o-g,t[6]=v+u*o,t[10]=r*c}else if(e.order==="ZXY"){const u=c*h,f=c*d,g=l*h,v=l*d;t[0]=u-v*o,t[4]=-r*d,t[8]=g+f*o,t[1]=f+g*o,t[5]=r*h,t[9]=v-u*o,t[2]=-r*l,t[6]=o,t[10]=r*c}else if(e.order==="ZYX"){const u=r*h,f=r*d,g=o*h,v=o*d;t[0]=c*h,t[4]=g*l-f,t[8]=u*l+v,t[1]=c*d,t[5]=v*l+u,t[9]=f*l-g,t[2]=-l,t[6]=o*c,t[10]=r*c}else if(e.order==="YZX"){const u=r*c,f=r*l,g=o*c,v=o*l;t[0]=c*h,t[4]=v-u*d,t[8]=g*d+f,t[1]=d,t[5]=r*h,t[9]=-o*h,t[2]=-l*h,t[6]=f*d+g,t[10]=u-v*d}else if(e.order==="XZY"){const u=r*c,f=r*l,g=o*c,v=o*l;t[0]=c*h,t[4]=-d,t[8]=l*h,t[1]=u*d+v,t[5]=r*h,t[9]=f*d-g,t[2]=g*d-f,t[6]=o*h,t[10]=v*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Dd,e,Id)}lookAt(e,t,i){const s=this.elements;return jt.subVectors(e,t),jt.lengthSq()===0&&(jt.z=1),jt.normalize(),Wn.crossVectors(i,jt),Wn.lengthSq()===0&&(Math.abs(i.z)===1?jt.x+=1e-4:jt.z+=1e-4,jt.normalize(),Wn.crossVectors(i,jt)),Wn.normalize(),Ws.crossVectors(jt,Wn),s[0]=Wn.x,s[4]=Ws.x,s[8]=jt.x,s[1]=Wn.y,s[5]=Ws.y,s[9]=jt.y,s[2]=Wn.z,s[6]=Ws.z,s[10]=jt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,a=this.elements,r=i[0],o=i[4],c=i[8],l=i[12],h=i[1],d=i[5],u=i[9],f=i[13],g=i[2],v=i[6],m=i[10],p=i[14],_=i[3],y=i[7],M=i[11],C=i[15],w=s[0],A=s[4],R=s[8],q=s[12],b=s[1],S=s[5],D=s[9],I=s[13],O=s[2],$=s[6],B=s[10],te=s[14],Y=s[3],ce=s[7],fe=s[11],xe=s[15];return a[0]=r*w+o*b+c*O+l*Y,a[4]=r*A+o*S+c*$+l*ce,a[8]=r*R+o*D+c*B+l*fe,a[12]=r*q+o*I+c*te+l*xe,a[1]=h*w+d*b+u*O+f*Y,a[5]=h*A+d*S+u*$+f*ce,a[9]=h*R+d*D+u*B+f*fe,a[13]=h*q+d*I+u*te+f*xe,a[2]=g*w+v*b+m*O+p*Y,a[6]=g*A+v*S+m*$+p*ce,a[10]=g*R+v*D+m*B+p*fe,a[14]=g*q+v*I+m*te+p*xe,a[3]=_*w+y*b+M*O+C*Y,a[7]=_*A+y*S+M*$+C*ce,a[11]=_*R+y*D+M*B+C*fe,a[15]=_*q+y*I+M*te+C*xe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],a=e[12],r=e[1],o=e[5],c=e[9],l=e[13],h=e[2],d=e[6],u=e[10],f=e[14],g=e[3],v=e[7],m=e[11],p=e[15];return g*(+a*c*d-s*l*d-a*o*u+i*l*u+s*o*f-i*c*f)+v*(+t*c*f-t*l*u+a*r*u-s*r*f+s*l*h-a*c*h)+m*(+t*l*d-t*o*f-a*r*d+i*r*f+a*o*h-i*l*h)+p*(-s*o*h-t*c*d+t*o*u+s*r*d-i*r*u+i*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],a=e[3],r=e[4],o=e[5],c=e[6],l=e[7],h=e[8],d=e[9],u=e[10],f=e[11],g=e[12],v=e[13],m=e[14],p=e[15],_=d*m*l-v*u*l+v*c*f-o*m*f-d*c*p+o*u*p,y=g*u*l-h*m*l-g*c*f+r*m*f+h*c*p-r*u*p,M=h*v*l-g*d*l+g*o*f-r*v*f-h*o*p+r*d*p,C=g*d*c-h*v*c-g*o*u+r*v*u+h*o*m-r*d*m,w=t*_+i*y+s*M+a*C;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/w;return e[0]=_*A,e[1]=(v*u*a-d*m*a-v*s*f+i*m*f+d*s*p-i*u*p)*A,e[2]=(o*m*a-v*c*a+v*s*l-i*m*l-o*s*p+i*c*p)*A,e[3]=(d*c*a-o*u*a-d*s*l+i*u*l+o*s*f-i*c*f)*A,e[4]=y*A,e[5]=(h*m*a-g*u*a+g*s*f-t*m*f-h*s*p+t*u*p)*A,e[6]=(g*c*a-r*m*a-g*s*l+t*m*l+r*s*p-t*c*p)*A,e[7]=(r*u*a-h*c*a+h*s*l-t*u*l-r*s*f+t*c*f)*A,e[8]=M*A,e[9]=(g*d*a-h*v*a-g*i*f+t*v*f+h*i*p-t*d*p)*A,e[10]=(r*v*a-g*o*a+g*i*l-t*v*l-r*i*p+t*o*p)*A,e[11]=(h*o*a-r*d*a-h*i*l+t*d*l+r*i*f-t*o*f)*A,e[12]=C*A,e[13]=(h*v*s-g*d*s+g*i*u-t*v*u-h*i*m+t*d*m)*A,e[14]=(g*o*s-r*v*s-g*i*c+t*v*c+r*i*m-t*o*m)*A,e[15]=(r*d*s-h*o*s+h*i*c-t*d*c-r*i*u+t*o*u)*A,this}scale(e){const t=this.elements,i=e.x,s=e.y,a=e.z;return t[0]*=i,t[4]*=s,t[8]*=a,t[1]*=i,t[5]*=s,t[9]*=a,t[2]*=i,t[6]*=s,t[10]*=a,t[3]*=i,t[7]*=s,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),a=1-i,r=e.x,o=e.y,c=e.z,l=a*r,h=a*o;return this.set(l*r+i,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+i,h*c-s*r,0,l*c-s*o,h*c+s*r,a*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,a,r){return this.set(1,i,a,0,e,1,r,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,a=t._x,r=t._y,o=t._z,c=t._w,l=a+a,h=r+r,d=o+o,u=a*l,f=a*h,g=a*d,v=r*h,m=r*d,p=o*d,_=c*l,y=c*h,M=c*d,C=i.x,w=i.y,A=i.z;return s[0]=(1-(v+p))*C,s[1]=(f+M)*C,s[2]=(g-y)*C,s[3]=0,s[4]=(f-M)*w,s[5]=(1-(u+p))*w,s[6]=(m+_)*w,s[7]=0,s[8]=(g+y)*A,s[9]=(m-_)*A,s[10]=(1-(u+v))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let a=Ni.set(s[0],s[1],s[2]).length();const r=Ni.set(s[4],s[5],s[6]).length(),o=Ni.set(s[8],s[9],s[10]).length();this.determinant()<0&&(a=-a),e.x=s[12],e.y=s[13],e.z=s[14],dn.copy(this);const l=1/a,h=1/r,d=1/o;return dn.elements[0]*=l,dn.elements[1]*=l,dn.elements[2]*=l,dn.elements[4]*=h,dn.elements[5]*=h,dn.elements[6]*=h,dn.elements[8]*=d,dn.elements[9]*=d,dn.elements[10]*=d,t.setFromRotationMatrix(dn),i.x=a,i.y=r,i.z=o,this}makePerspective(e,t,i,s,a,r,o=Nn){const c=this.elements,l=2*a/(t-e),h=2*a/(i-s),d=(t+e)/(t-e),u=(i+s)/(i-s);let f,g;if(o===Nn)f=-(r+a)/(r-a),g=-2*r*a/(r-a);else if(o===Ma)f=-r/(r-a),g=-r*a/(r-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,a,r,o=Nn){const c=this.elements,l=1/(t-e),h=1/(i-s),d=1/(r-a),u=(t+e)*l,f=(i+s)*h;let g,v;if(o===Nn)g=(r+a)*d,v=-2*d;else if(o===Ma)g=a*d,v=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-u,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=v,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Ni=new k,dn=new ct,Dd=new k(0,0,0),Id=new k(1,1,1),Wn=new k,Ws=new k,jt=new k,sl=new ct,al=new Ls;class Sn{constructor(e=0,t=0,i=0,s=Sn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,a=s[0],r=s[4],o=s[8],c=s[1],l=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(zt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-r,a)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-zt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,a),this._z=0);break;case"ZXY":this._x=Math.asin(zt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-r,l)):(this._y=0,this._z=Math.atan2(c,a));break;case"ZYX":this._y=Math.asin(-zt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,a)):(this._x=0,this._z=Math.atan2(-r,l));break;case"YZX":this._z=Math.asin(zt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,a)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-zt(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return sl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(sl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return al.setFromEuler(this),this.setFromQuaternion(al,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Sn.DEFAULT_ORDER="XYZ";class wo{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ud=0;const rl=new k,Fi=new Ls,An=new ct,qs=new k,us=new k,Nd=new k,Fd=new Ls,ol=new k(1,0,0),ll=new k(0,1,0),cl=new k(0,0,1),hl={type:"added"},kd={type:"removed"},ki={type:"childadded",child:null},Xa={type:"childremoved",child:null};class Mt extends rs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ud++}),this.uuid=os(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Mt.DEFAULT_UP.clone();const e=new k,t=new Sn,i=new Ls,s=new k(1,1,1);function a(){i.setFromEuler(t,!1)}function r(){t.setFromQuaternion(i,void 0,!1)}t._onChange(a),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ct},normalMatrix:{value:new Ve}}),this.matrix=new ct,this.matrixWorld=new ct,this.matrixAutoUpdate=Mt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new wo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Fi.setFromAxisAngle(e,t),this.quaternion.multiply(Fi),this}rotateOnWorldAxis(e,t){return Fi.setFromAxisAngle(e,t),this.quaternion.premultiply(Fi),this}rotateX(e){return this.rotateOnAxis(ol,e)}rotateY(e){return this.rotateOnAxis(ll,e)}rotateZ(e){return this.rotateOnAxis(cl,e)}translateOnAxis(e,t){return rl.copy(e).applyQuaternion(this.quaternion),this.position.add(rl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ol,e)}translateY(e){return this.translateOnAxis(ll,e)}translateZ(e){return this.translateOnAxis(cl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(An.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?qs.copy(e):qs.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),us.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?An.lookAt(us,qs,this.up):An.lookAt(qs,us,this.up),this.quaternion.setFromRotationMatrix(An),s&&(An.extractRotation(s.matrixWorld),Fi.setFromRotationMatrix(An),this.quaternion.premultiply(Fi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(hl),ki.child=e,this.dispatchEvent(ki),ki.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(kd),Xa.child=e,this.dispatchEvent(Xa),Xa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),An.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),An.multiply(e.parent.matrixWorld)),e.applyMatrix4(An),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(hl),ki.child=e,this.dispatchEvent(ki),ki.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const r=this.children[i].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(us,e,Nd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(us,Fd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function a(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=a(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const d=c[l];a(e.shapes,d)}else a(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(a(e.materials,this.material[c]));s.material=o}else s.material=a(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(a(e.animations,c))}}if(t){const o=r(e.geometries),c=r(e.materials),l=r(e.textures),h=r(e.images),d=r(e.shapes),u=r(e.skeletons),f=r(e.animations),g=r(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=s,i;function r(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}Mt.DEFAULT_UP=new k(0,1,0);Mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const un=new k,Cn=new k,Ya=new k,Rn=new k,Oi=new k,Bi=new k,dl=new k,ja=new k,Ka=new k,Za=new k,Ja=new ft,Qa=new ft,er=new ft;class _n{constructor(e=new k,t=new k,i=new k){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),un.subVectors(e,t),s.cross(un);const a=s.lengthSq();return a>0?s.multiplyScalar(1/Math.sqrt(a)):s.set(0,0,0)}static getBarycoord(e,t,i,s,a){un.subVectors(s,t),Cn.subVectors(i,t),Ya.subVectors(e,t);const r=un.dot(un),o=un.dot(Cn),c=un.dot(Ya),l=Cn.dot(Cn),h=Cn.dot(Ya),d=r*l-o*o;if(d===0)return a.set(0,0,0),null;const u=1/d,f=(l*c-o*h)*u,g=(r*h-o*c)*u;return a.set(1-f-g,g,f)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Rn)===null?!1:Rn.x>=0&&Rn.y>=0&&Rn.x+Rn.y<=1}static getInterpolation(e,t,i,s,a,r,o,c){return this.getBarycoord(e,t,i,s,Rn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(a,Rn.x),c.addScaledVector(r,Rn.y),c.addScaledVector(o,Rn.z),c)}static getInterpolatedAttribute(e,t,i,s,a,r){return Ja.setScalar(0),Qa.setScalar(0),er.setScalar(0),Ja.fromBufferAttribute(e,t),Qa.fromBufferAttribute(e,i),er.fromBufferAttribute(e,s),r.setScalar(0),r.addScaledVector(Ja,a.x),r.addScaledVector(Qa,a.y),r.addScaledVector(er,a.z),r}static isFrontFacing(e,t,i,s){return un.subVectors(i,t),Cn.subVectors(e,t),un.cross(Cn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return un.subVectors(this.c,this.b),Cn.subVectors(this.a,this.b),un.cross(Cn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return _n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return _n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,a){return _n.getInterpolation(e,this.a,this.b,this.c,t,i,s,a)}containsPoint(e){return _n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return _n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,a=this.c;let r,o;Oi.subVectors(s,i),Bi.subVectors(a,i),ja.subVectors(e,i);const c=Oi.dot(ja),l=Bi.dot(ja);if(c<=0&&l<=0)return t.copy(i);Ka.subVectors(e,s);const h=Oi.dot(Ka),d=Bi.dot(Ka);if(h>=0&&d<=h)return t.copy(s);const u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return r=c/(c-h),t.copy(i).addScaledVector(Oi,r);Za.subVectors(e,a);const f=Oi.dot(Za),g=Bi.dot(Za);if(g>=0&&f<=g)return t.copy(a);const v=f*l-c*g;if(v<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(i).addScaledVector(Bi,o);const m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return dl.subVectors(a,s),o=(d-h)/(d-h+(f-g)),t.copy(s).addScaledVector(dl,o);const p=1/(m+v+u);return r=v*p,o=u*p,t.copy(i).addScaledVector(Oi,r).addScaledVector(Bi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Fc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},qn={h:0,s:0,l:0},$s={h:0,s:0,l:0};function tr(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class ze{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=qt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,tt.toWorkingColorSpace(this,t),this}setRGB(e,t,i,s=tt.workingColorSpace){return this.r=e,this.g=t,this.b=i,tt.toWorkingColorSpace(this,s),this}setHSL(e,t,i,s=tt.workingColorSpace){if(e=To(e,1),t=zt(t,0,1),i=zt(i,0,1),t===0)this.r=this.g=this.b=i;else{const a=i<=.5?i*(1+t):i+t-i*t,r=2*i-a;this.r=tr(r,a,e+1/3),this.g=tr(r,a,e),this.b=tr(r,a,e-1/3)}return tt.toWorkingColorSpace(this,s),this}setStyle(e,t=qt){function i(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const r=s[1],o=s[2];switch(r){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=s[1],r=a.length;if(r===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(r===6)return this.setHex(parseInt(a,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=qt){const i=Fc[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Zi(e.r),this.g=Zi(e.g),this.b=Zi(e.b),this}copyLinearToSRGB(e){return this.r=Ba(e.r),this.g=Ba(e.g),this.b=Ba(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=qt){return tt.fromWorkingColorSpace(Pt.copy(this),e),Math.round(zt(Pt.r*255,0,255))*65536+Math.round(zt(Pt.g*255,0,255))*256+Math.round(zt(Pt.b*255,0,255))}getHexString(e=qt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=tt.workingColorSpace){tt.fromWorkingColorSpace(Pt.copy(this),t);const i=Pt.r,s=Pt.g,a=Pt.b,r=Math.max(i,s,a),o=Math.min(i,s,a);let c,l;const h=(o+r)/2;if(o===r)c=0,l=0;else{const d=r-o;switch(l=h<=.5?d/(r+o):d/(2-r-o),r){case i:c=(s-a)/d+(s<a?6:0);break;case s:c=(a-i)/d+2;break;case a:c=(i-s)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=tt.workingColorSpace){return tt.fromWorkingColorSpace(Pt.copy(this),t),e.r=Pt.r,e.g=Pt.g,e.b=Pt.b,e}getStyle(e=qt){tt.fromWorkingColorSpace(Pt.copy(this),e);const t=Pt.r,i=Pt.g,s=Pt.b;return e!==qt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(qn),this.setHSL(qn.h+e,qn.s+t,qn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(qn),e.getHSL($s);const i=Es(qn.h,$s.h,t),s=Es(qn.s,$s.s,t),a=Es(qn.l,$s.l,t);return this.setHSL(i,s,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,a=e.elements;return this.r=a[0]*t+a[3]*i+a[6]*s,this.g=a[1]*t+a[4]*i+a[7]*s,this.b=a[2]*t+a[5]*i+a[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Pt=new ze;ze.NAMES=Fc;let Od=0;class Ci extends rs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Od++}),this.uuid=os(),this.name="",this.type="Material",this.blending=Mi,this.side=si,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=yr,this.blendDst=Mr,this.blendEquation=gi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ze(0,0,0),this.blendAlpha=0,this.depthFunc=Qi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ko,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Pi,this.stencilZFail=Pi,this.stencilZPass=Pi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Mi&&(i.blending=this.blending),this.side!==si&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==yr&&(i.blendSrc=this.blendSrc),this.blendDst!==Mr&&(i.blendDst=this.blendDst),this.blendEquation!==gi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Qi&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ko&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Pi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Pi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Pi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(a){const r=[];for(const o in a){const c=a[o];delete c.metadata,r.push(c)}return r}if(t){const a=s(e.textures),r=s(e.images);a.length>0&&(i.textures=a),r.length>0&&(i.images=r)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let a=0;a!==s;++a)i[a]=t[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class kt extends Ci{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sn,this.combine=_c,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const xt=new k,Xs=new Xe;class Zt{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Zo,this.updateRanges=[],this.gpuType=Un,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,a=this.itemSize;s<a;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Xs.fromBufferAttribute(this,t),Xs.applyMatrix3(e),this.setXY(t,Xs.x,Xs.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix3(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix4(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.applyNormalMatrix(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.transformDirection(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Xi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Nt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Xi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Xi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Xi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Xi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Nt(t,this.array),i=Nt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Nt(t,this.array),i=Nt(i,this.array),s=Nt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,a){return e*=this.itemSize,this.normalized&&(t=Nt(t,this.array),i=Nt(i,this.array),s=Nt(s,this.array),a=Nt(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Zo&&(e.usage=this.usage),e}}class kc extends Zt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Oc extends Zt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class dt extends Zt{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Bd=0;const Qt=new ct,nr=new Mt,zi=new k,Kt=new Ds,fs=new Ds,Tt=new k;class Ut extends rs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Bd++}),this.uuid=os(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ic(e)?Oc:kc)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new Ve().getNormalMatrix(e);i.applyNormalMatrix(a),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Qt.makeRotationFromQuaternion(e),this.applyMatrix4(Qt),this}rotateX(e){return Qt.makeRotationX(e),this.applyMatrix4(Qt),this}rotateY(e){return Qt.makeRotationY(e),this.applyMatrix4(Qt),this}rotateZ(e){return Qt.makeRotationZ(e),this.applyMatrix4(Qt),this}translate(e,t,i){return Qt.makeTranslation(e,t,i),this.applyMatrix4(Qt),this}scale(e,t,i){return Qt.makeScale(e,t,i),this.applyMatrix4(Qt),this}lookAt(e){return nr.lookAt(e),nr.updateMatrix(),this.applyMatrix4(nr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(zi).negate(),this.translate(zi.x,zi.y,zi.z),this}setFromPoints(e){const t=[];for(let i=0,s=e.length;i<s;i++){const a=e[i];t.push(a.x,a.y,a.z||0)}return this.setAttribute("position",new dt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ds);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const a=t[i];Kt.setFromBufferAttribute(a),this.morphTargetsRelative?(Tt.addVectors(this.boundingBox.min,Kt.min),this.boundingBox.expandByPoint(Tt),Tt.addVectors(this.boundingBox.max,Kt.max),this.boundingBox.expandByPoint(Tt)):(this.boundingBox.expandByPoint(Kt.min),this.boundingBox.expandByPoint(Kt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Is);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(e){const i=this.boundingSphere.center;if(Kt.setFromBufferAttribute(e),t)for(let a=0,r=t.length;a<r;a++){const o=t[a];fs.setFromBufferAttribute(o),this.morphTargetsRelative?(Tt.addVectors(Kt.min,fs.min),Kt.expandByPoint(Tt),Tt.addVectors(Kt.max,fs.max),Kt.expandByPoint(Tt)):(Kt.expandByPoint(fs.min),Kt.expandByPoint(fs.max))}Kt.getCenter(i);let s=0;for(let a=0,r=e.count;a<r;a++)Tt.fromBufferAttribute(e,a),s=Math.max(s,i.distanceToSquared(Tt));if(t)for(let a=0,r=t.length;a<r;a++){const o=t[a],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Tt.fromBufferAttribute(o,l),c&&(zi.fromBufferAttribute(e,l),Tt.add(zi)),s=Math.max(s,i.distanceToSquared(Tt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,a=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Zt(new Float32Array(4*i.count),4));const r=this.getAttribute("tangent"),o=[],c=[];for(let R=0;R<i.count;R++)o[R]=new k,c[R]=new k;const l=new k,h=new k,d=new k,u=new Xe,f=new Xe,g=new Xe,v=new k,m=new k;function p(R,q,b){l.fromBufferAttribute(i,R),h.fromBufferAttribute(i,q),d.fromBufferAttribute(i,b),u.fromBufferAttribute(a,R),f.fromBufferAttribute(a,q),g.fromBufferAttribute(a,b),h.sub(l),d.sub(l),f.sub(u),g.sub(u);const S=1/(f.x*g.y-g.x*f.y);isFinite(S)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(S),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(S),o[R].add(v),o[q].add(v),o[b].add(v),c[R].add(m),c[q].add(m),c[b].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let R=0,q=_.length;R<q;++R){const b=_[R],S=b.start,D=b.count;for(let I=S,O=S+D;I<O;I+=3)p(e.getX(I+0),e.getX(I+1),e.getX(I+2))}const y=new k,M=new k,C=new k,w=new k;function A(R){C.fromBufferAttribute(s,R),w.copy(C);const q=o[R];y.copy(q),y.sub(C.multiplyScalar(C.dot(q))).normalize(),M.crossVectors(w,q);const S=M.dot(c[R])<0?-1:1;r.setXYZW(R,y.x,y.y,y.z,S)}for(let R=0,q=_.length;R<q;++R){const b=_[R],S=b.start,D=b.count;for(let I=S,O=S+D;I<O;I+=3)A(e.getX(I+0)),A(e.getX(I+1)),A(e.getX(I+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Zt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);const s=new k,a=new k,r=new k,o=new k,c=new k,l=new k,h=new k,d=new k;if(e)for(let u=0,f=e.count;u<f;u+=3){const g=e.getX(u+0),v=e.getX(u+1),m=e.getX(u+2);s.fromBufferAttribute(t,g),a.fromBufferAttribute(t,v),r.fromBufferAttribute(t,m),h.subVectors(r,a),d.subVectors(s,a),h.cross(d),o.fromBufferAttribute(i,g),c.fromBufferAttribute(i,v),l.fromBufferAttribute(i,m),o.add(h),c.add(h),l.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(v,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,f=t.count;u<f;u+=3)s.fromBufferAttribute(t,u+0),a.fromBufferAttribute(t,u+1),r.fromBufferAttribute(t,u+2),h.subVectors(r,a),d.subVectors(s,a),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Tt.fromBufferAttribute(e,t),Tt.normalize(),e.setXYZ(t,Tt.x,Tt.y,Tt.z)}toNonIndexed(){function e(o,c){const l=o.array,h=o.itemSize,d=o.normalized,u=new l.constructor(c.length*h);let f=0,g=0;for(let v=0,m=c.length;v<m;v++){o.isInterleavedBufferAttribute?f=c[v]*o.data.stride+o.offset:f=c[v]*h;for(let p=0;p<h;p++)u[g++]=l[f++]}return new Zt(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ut,i=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=e(c,i);t.setAttribute(o,l)}const a=this.morphAttributes;for(const o in a){const c=[],l=a[o];for(let h=0,d=l.length;h<d;h++){const u=l[h],f=e(u,i);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,c=r.length;o<c;o++){const l=r[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let a=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){const f=l[d];h.push(f.toJSON(e.data))}h.length>0&&(s[c]=h,a=!0)}a&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(t))}const a=e.morphAttributes;for(const l in a){const h=[],d=a[l];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let l=0,h=r.length;l<h;l++){const d=r[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ul=new ct,di=new Ca,Ys=new Is,fl=new k,js=new k,Ks=new k,Zs=new k,ir=new k,Js=new k,pl=new k,Qs=new k;class Re extends Mt{constructor(e=new Ut,t=new kt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){const o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,a=i.morphAttributes.position,r=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(a&&o){Js.set(0,0,0);for(let c=0,l=a.length;c<l;c++){const h=o[c],d=a[c];h!==0&&(ir.fromBufferAttribute(d,e),r?Js.addScaledVector(ir,h):Js.addScaledVector(ir.sub(t),h))}t.add(Js)}return t}raycast(e,t){const i=this.geometry,s=this.material,a=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ys.copy(i.boundingSphere),Ys.applyMatrix4(a),di.copy(e.ray).recast(e.near),!(Ys.containsPoint(di.origin)===!1&&(di.intersectSphere(Ys,fl)===null||di.origin.distanceToSquared(fl)>(e.far-e.near)**2))&&(ul.copy(a).invert(),di.copy(e.ray).applyMatrix4(ul),!(i.boundingBox!==null&&di.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,di)))}_computeIntersections(e,t,i){let s;const a=this.geometry,r=this.material,o=a.index,c=a.attributes.position,l=a.attributes.uv,h=a.attributes.uv1,d=a.attributes.normal,u=a.groups,f=a.drawRange;if(o!==null)if(Array.isArray(r))for(let g=0,v=u.length;g<v;g++){const m=u[g],p=r[m.materialIndex],_=Math.max(m.start,f.start),y=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let M=_,C=y;M<C;M+=3){const w=o.getX(M),A=o.getX(M+1),R=o.getX(M+2);s=ea(this,p,e,i,l,h,d,w,A,R),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const _=o.getX(m),y=o.getX(m+1),M=o.getX(m+2);s=ea(this,r,e,i,l,h,d,_,y,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(r))for(let g=0,v=u.length;g<v;g++){const m=u[g],p=r[m.materialIndex],_=Math.max(m.start,f.start),y=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let M=_,C=y;M<C;M+=3){const w=M,A=M+1,R=M+2;s=ea(this,p,e,i,l,h,d,w,A,R),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(c.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const _=m,y=m+1,M=m+2;s=ea(this,r,e,i,l,h,d,_,y,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function zd(n,e,t,i,s,a,r,o){let c;if(e.side===$t?c=i.intersectTriangle(r,a,s,!0,o):c=i.intersectTriangle(s,a,r,e.side===si,o),c===null)return null;Qs.copy(o),Qs.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Qs);return l<t.near||l>t.far?null:{distance:l,point:Qs.clone(),object:n}}function ea(n,e,t,i,s,a,r,o,c,l){n.getVertexPosition(o,js),n.getVertexPosition(c,Ks),n.getVertexPosition(l,Zs);const h=zd(n,e,t,i,js,Ks,Zs,pl);if(h){const d=new k;_n.getBarycoord(pl,js,Ks,Zs,d),s&&(h.uv=_n.getInterpolatedAttribute(s,o,c,l,d,new Xe)),a&&(h.uv1=_n.getInterpolatedAttribute(a,o,c,l,d,new Xe)),r&&(h.normal=_n.getInterpolatedAttribute(r,o,c,l,d,new k),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new k,materialIndex:0};_n.getNormal(js,Ks,Zs,u.normal),h.face=u,h.barycoord=d}return h}class xn extends Ut{constructor(e=1,t=1,i=1,s=1,a=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:a,depthSegments:r};const o=this;s=Math.floor(s),a=Math.floor(a),r=Math.floor(r);const c=[],l=[],h=[],d=[];let u=0,f=0;g("z","y","x",-1,-1,i,t,e,r,a,0),g("z","y","x",1,-1,i,t,-e,r,a,1),g("x","z","y",1,1,e,i,t,s,r,2),g("x","z","y",1,-1,e,i,-t,s,r,3),g("x","y","z",1,-1,e,t,i,s,a,4),g("x","y","z",-1,-1,e,t,-i,s,a,5),this.setIndex(c),this.setAttribute("position",new dt(l,3)),this.setAttribute("normal",new dt(h,3)),this.setAttribute("uv",new dt(d,2));function g(v,m,p,_,y,M,C,w,A,R,q){const b=M/A,S=C/R,D=M/2,I=C/2,O=w/2,$=A+1,B=R+1;let te=0,Y=0;const ce=new k;for(let fe=0;fe<B;fe++){const xe=fe*S-I;for(let We=0;We<$;We++){const qe=We*b-D;ce[v]=qe*_,ce[m]=xe*y,ce[p]=O,l.push(ce.x,ce.y,ce.z),ce[v]=0,ce[m]=0,ce[p]=w>0?1:-1,h.push(ce.x,ce.y,ce.z),d.push(We/A),d.push(1-fe/R),te+=1}}for(let fe=0;fe<R;fe++)for(let xe=0;xe<A;xe++){const We=u+xe+$*fe,qe=u+xe+$*(fe+1),Z=u+(xe+1)+$*(fe+1),ne=u+(xe+1)+$*fe;c.push(We,qe,ne),c.push(qe,Z,ne),Y+=6}o.addGroup(f,Y,q),f+=Y,u+=te}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ss(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function Ft(n){const e={};for(let t=0;t<n.length;t++){const i=ss(n[t]);for(const s in i)e[s]=i[s]}return e}function Hd(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Bc(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:tt.workingColorSpace}const Gd={clone:ss,merge:Ft};var Vd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Wd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ai extends Ci{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Vd,this.fragmentShader=Wd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ss(e.uniforms),this.uniformsGroups=Hd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const r=this.uniforms[s].value;r&&r.isTexture?t.uniforms[s]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[s]={type:"c",value:r.getHex()}:r&&r.isVector2?t.uniforms[s]={type:"v2",value:r.toArray()}:r&&r.isVector3?t.uniforms[s]={type:"v3",value:r.toArray()}:r&&r.isVector4?t.uniforms[s]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?t.uniforms[s]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?t.uniforms[s]={type:"m4",value:r.toArray()}:t.uniforms[s]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class zc extends Mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ct,this.projectionMatrix=new ct,this.projectionMatrixInverse=new ct,this.coordinateSystem=Nn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const $n=new k,ml=new Xe,gl=new Xe;class gn extends zc{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Cs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ss*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Cs*2*Math.atan(Math.tan(Ss*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){$n.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set($n.x,$n.y).multiplyScalar(-e/$n.z),$n.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set($n.x,$n.y).multiplyScalar(-e/$n.z)}getViewSize(e,t){return this.getViewBounds(e,ml,gl),t.subVectors(gl,ml)}setViewOffset(e,t,i,s,a,r){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ss*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,a=-.5*s;const r=this.view;if(this.view!==null&&this.view.enabled){const c=r.fullWidth,l=r.fullHeight;a+=r.offsetX*s/c,t-=r.offsetY*i/l,s*=r.width/c,i*=r.height/l}const o=this.filmOffset;o!==0&&(a+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+s,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Hi=-90,Gi=1;class qd extends Mt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new gn(Hi,Gi,e,t);s.layers=this.layers,this.add(s);const a=new gn(Hi,Gi,e,t);a.layers=this.layers,this.add(a);const r=new gn(Hi,Gi,e,t);r.layers=this.layers,this.add(r);const o=new gn(Hi,Gi,e,t);o.layers=this.layers,this.add(o);const c=new gn(Hi,Gi,e,t);c.layers=this.layers,this.add(c);const l=new gn(Hi,Gi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,a,r,o,c]=t;for(const l of t)this.remove(l);if(e===Nn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ma)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,r,o,c,l,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,a),e.setRenderTarget(i,1,s),e.render(t,r),e.setRenderTarget(i,2,s),e.render(t,o),e.setRenderTarget(i,3,s),e.render(t,c),e.setRenderTarget(i,4,s),e.render(t,l),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,s),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Hc extends Ht{constructor(e,t,i,s,a,r,o,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:es,super(e,t,i,s,a,r,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class $d extends wi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Hc(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:vn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new xn(5,5,5),a=new ai({name:"CubemapFromEquirect",uniforms:ss(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:$t,blending:ei});a.uniforms.tEquirect.value=t;const r=new Re(s,a),o=t.minFilter;return t.minFilter===yi&&(t.minFilter=vn),new qd(1,10,this).update(e,r),t.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(e,t,i,s){const a=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(t,i,s);e.setRenderTarget(a)}}const sr=new k,Xd=new k,Yd=new Ve;class Zn{constructor(e=new k(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=sr.subVectors(i,t).cross(Xd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(sr),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return a<0||a>1?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Yd.getNormalMatrix(e),s=this.coplanarPoint(sr).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ui=new Is,ta=new k;class Ao{constructor(e=new Zn,t=new Zn,i=new Zn,s=new Zn,a=new Zn,r=new Zn){this.planes=[e,t,i,s,a,r]}set(e,t,i,s,a,r){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(a),o[5].copy(r),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Nn){const i=this.planes,s=e.elements,a=s[0],r=s[1],o=s[2],c=s[3],l=s[4],h=s[5],d=s[6],u=s[7],f=s[8],g=s[9],v=s[10],m=s[11],p=s[12],_=s[13],y=s[14],M=s[15];if(i[0].setComponents(c-a,u-l,m-f,M-p).normalize(),i[1].setComponents(c+a,u+l,m+f,M+p).normalize(),i[2].setComponents(c+r,u+h,m+g,M+_).normalize(),i[3].setComponents(c-r,u-h,m-g,M-_).normalize(),i[4].setComponents(c-o,u-d,m-v,M-y).normalize(),t===Nn)i[5].setComponents(c+o,u+d,m+v,M+y).normalize();else if(t===Ma)i[5].setComponents(o,d,v,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ui.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ui.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ui)}intersectsSprite(e){return ui.center.set(0,0,0),ui.radius=.7071067811865476,ui.applyMatrix4(e.matrixWorld),this.intersectsSphere(ui)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(ta.x=s.normal.x>0?e.max.x:e.min.x,ta.y=s.normal.y>0?e.max.y:e.min.y,ta.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ta)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Gc(){let n=null,e=!1,t=null,i=null;function s(a,r){t(a,r),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){n=a}}}function jd(n){const e=new WeakMap;function t(o,c){const l=o.array,h=o.usage,d=l.byteLength,u=n.createBuffer();n.bindBuffer(c,u),n.bufferData(c,l,h),o.onUploadCallback();let f;if(l instanceof Float32Array)f=n.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=n.SHORT;else if(l instanceof Uint32Array)f=n.UNSIGNED_INT;else if(l instanceof Int32Array)f=n.INT;else if(l instanceof Int8Array)f=n.BYTE;else if(l instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,c,l){const h=c.array,d=c.updateRanges;if(n.bindBuffer(l,o),d.length===0)n.bufferSubData(l,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){const g=d[u],v=d[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++u,d[u]=v)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){const v=d[f];n.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function r(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:s,remove:a,update:r}}class sn extends Ut{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const a=e/2,r=t/2,o=Math.floor(i),c=Math.floor(s),l=o+1,h=c+1,d=e/o,u=t/c,f=[],g=[],v=[],m=[];for(let p=0;p<h;p++){const _=p*u-r;for(let y=0;y<l;y++){const M=y*d-a;g.push(M,-_,0),v.push(0,0,1),m.push(y/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let _=0;_<o;_++){const y=_+l*p,M=_+l*(p+1),C=_+1+l*(p+1),w=_+1+l*p;f.push(y,M,w),f.push(M,C,w)}this.setIndex(f),this.setAttribute("position",new dt(g,3)),this.setAttribute("normal",new dt(v,3)),this.setAttribute("uv",new dt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new sn(e.width,e.height,e.widthSegments,e.heightSegments)}}var Kd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Zd=`#ifdef USE_ALPHAHASH
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
#endif`,Jd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Qd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,eu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,tu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,nu=`#ifdef USE_AOMAP
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
#endif`,iu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,su=`#ifdef USE_BATCHING
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
#endif`,au=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ru=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ou=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,lu=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,cu=`#ifdef USE_IRIDESCENCE
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
#endif`,hu=`#ifdef USE_BUMPMAP
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
#endif`,du=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,uu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,fu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,pu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,mu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,gu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,vu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,_u=`#if defined( USE_COLOR_ALPHA )
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
#endif`,xu=`#define PI 3.141592653589793
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
} // validated`,bu=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,yu=`vec3 transformedNormal = objectNormal;
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
#endif`,Mu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Su=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Eu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Tu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,wu="gl_FragColor = linearToOutputTexel( gl_FragColor );",Au=`
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
}`,Cu=`#ifdef USE_ENVMAP
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
#endif`,Ru=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Pu=`#ifdef USE_ENVMAP
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
#endif`,Lu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Du=`#ifdef USE_ENVMAP
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
#endif`,Iu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Uu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Nu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Fu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ku=`#ifdef USE_GRADIENTMAP
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
}`,Ou=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Bu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,zu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Hu=`uniform bool receiveShadow;
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
#endif`,Gu=`#ifdef USE_ENVMAP
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
#endif`,Vu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Wu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,qu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,$u=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Xu=`PhysicalMaterial material;
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
#endif`,Yu=`struct PhysicalMaterial {
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
}`,ju=`
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
#endif`,Ku=`#if defined( RE_IndirectDiffuse )
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
#endif`,Zu=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ju=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Qu=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ef=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,nf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,sf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,af=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,rf=`#if defined( USE_POINTS_UV )
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
#endif`,of=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,lf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,cf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,hf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,df=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,uf=`#ifdef USE_MORPHTARGETS
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
#endif`,ff=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,pf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,mf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,gf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_f=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,xf=`#ifdef USE_NORMALMAP
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
#endif`,bf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,yf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Mf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Sf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ef=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Tf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,wf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Af=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Cf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Rf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Pf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Lf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Df=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,If=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Uf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Nf=`float getShadowMask() {
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
}`,Ff=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,kf=`#ifdef USE_SKINNING
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
#endif`,Of=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Bf=`#ifdef USE_SKINNING
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
#endif`,zf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Hf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Gf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Vf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Wf=`#ifdef USE_TRANSMISSION
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
#endif`,qf=`#ifdef USE_TRANSMISSION
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
#endif`,$f=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Xf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Yf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Kf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Zf=`uniform sampler2D t2D;
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
}`,Jf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,ep=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,tp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,np=`#include <common>
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
}`,ip=`#if DEPTH_PACKING == 3200
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
}`,sp=`#define DISTANCE
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
}`,ap=`#define DISTANCE
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
}`,rp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,op=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lp=`uniform float scale;
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
}`,cp=`uniform vec3 diffuse;
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
}`,hp=`#include <common>
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
}`,dp=`uniform vec3 diffuse;
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
}`,up=`#define LAMBERT
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
}`,fp=`#define LAMBERT
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
}`,pp=`#define MATCAP
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
}`,mp=`#define MATCAP
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
}`,gp=`#define NORMAL
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
}`,vp=`#define NORMAL
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
}`,_p=`#define PHONG
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
}`,xp=`#define PHONG
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
}`,bp=`#define STANDARD
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
}`,yp=`#define STANDARD
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
}`,Mp=`#define TOON
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
}`,Sp=`#define TOON
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
}`,Ep=`uniform float size;
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
}`,Tp=`uniform vec3 diffuse;
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
}`,wp=`#include <common>
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
}`,Ap=`uniform vec3 color;
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
}`,Cp=`uniform float rotation;
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
}`,Rp=`uniform vec3 diffuse;
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
}`,Ge={alphahash_fragment:Kd,alphahash_pars_fragment:Zd,alphamap_fragment:Jd,alphamap_pars_fragment:Qd,alphatest_fragment:eu,alphatest_pars_fragment:tu,aomap_fragment:nu,aomap_pars_fragment:iu,batching_pars_vertex:su,batching_vertex:au,begin_vertex:ru,beginnormal_vertex:ou,bsdfs:lu,iridescence_fragment:cu,bumpmap_pars_fragment:hu,clipping_planes_fragment:du,clipping_planes_pars_fragment:uu,clipping_planes_pars_vertex:fu,clipping_planes_vertex:pu,color_fragment:mu,color_pars_fragment:gu,color_pars_vertex:vu,color_vertex:_u,common:xu,cube_uv_reflection_fragment:bu,defaultnormal_vertex:yu,displacementmap_pars_vertex:Mu,displacementmap_vertex:Su,emissivemap_fragment:Eu,emissivemap_pars_fragment:Tu,colorspace_fragment:wu,colorspace_pars_fragment:Au,envmap_fragment:Cu,envmap_common_pars_fragment:Ru,envmap_pars_fragment:Pu,envmap_pars_vertex:Lu,envmap_physical_pars_fragment:Gu,envmap_vertex:Du,fog_vertex:Iu,fog_pars_vertex:Uu,fog_fragment:Nu,fog_pars_fragment:Fu,gradientmap_pars_fragment:ku,lightmap_pars_fragment:Ou,lights_lambert_fragment:Bu,lights_lambert_pars_fragment:zu,lights_pars_begin:Hu,lights_toon_fragment:Vu,lights_toon_pars_fragment:Wu,lights_phong_fragment:qu,lights_phong_pars_fragment:$u,lights_physical_fragment:Xu,lights_physical_pars_fragment:Yu,lights_fragment_begin:ju,lights_fragment_maps:Ku,lights_fragment_end:Zu,logdepthbuf_fragment:Ju,logdepthbuf_pars_fragment:Qu,logdepthbuf_pars_vertex:ef,logdepthbuf_vertex:tf,map_fragment:nf,map_pars_fragment:sf,map_particle_fragment:af,map_particle_pars_fragment:rf,metalnessmap_fragment:of,metalnessmap_pars_fragment:lf,morphinstance_vertex:cf,morphcolor_vertex:hf,morphnormal_vertex:df,morphtarget_pars_vertex:uf,morphtarget_vertex:ff,normal_fragment_begin:pf,normal_fragment_maps:mf,normal_pars_fragment:gf,normal_pars_vertex:vf,normal_vertex:_f,normalmap_pars_fragment:xf,clearcoat_normal_fragment_begin:bf,clearcoat_normal_fragment_maps:yf,clearcoat_pars_fragment:Mf,iridescence_pars_fragment:Sf,opaque_fragment:Ef,packing:Tf,premultiplied_alpha_fragment:wf,project_vertex:Af,dithering_fragment:Cf,dithering_pars_fragment:Rf,roughnessmap_fragment:Pf,roughnessmap_pars_fragment:Lf,shadowmap_pars_fragment:Df,shadowmap_pars_vertex:If,shadowmap_vertex:Uf,shadowmask_pars_fragment:Nf,skinbase_vertex:Ff,skinning_pars_vertex:kf,skinning_vertex:Of,skinnormal_vertex:Bf,specularmap_fragment:zf,specularmap_pars_fragment:Hf,tonemapping_fragment:Gf,tonemapping_pars_fragment:Vf,transmission_fragment:Wf,transmission_pars_fragment:qf,uv_pars_fragment:$f,uv_pars_vertex:Xf,uv_vertex:Yf,worldpos_vertex:jf,background_vert:Kf,background_frag:Zf,backgroundCube_vert:Jf,backgroundCube_frag:Qf,cube_vert:ep,cube_frag:tp,depth_vert:np,depth_frag:ip,distanceRGBA_vert:sp,distanceRGBA_frag:ap,equirect_vert:rp,equirect_frag:op,linedashed_vert:lp,linedashed_frag:cp,meshbasic_vert:hp,meshbasic_frag:dp,meshlambert_vert:up,meshlambert_frag:fp,meshmatcap_vert:pp,meshmatcap_frag:mp,meshnormal_vert:gp,meshnormal_frag:vp,meshphong_vert:_p,meshphong_frag:xp,meshphysical_vert:bp,meshphysical_frag:yp,meshtoon_vert:Mp,meshtoon_frag:Sp,points_vert:Ep,points_frag:Tp,shadow_vert:wp,shadow_frag:Ap,sprite_vert:Cp,sprite_frag:Rp},oe={common:{diffuse:{value:new ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},envMapRotation:{value:new Ve},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new Xe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new ze(16777215)},opacity:{value:1},center:{value:new Xe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},yn={basic:{uniforms:Ft([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:Ft([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new ze(0)}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:Ft([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new ze(0)},specular:{value:new ze(1118481)},shininess:{value:30}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:Ft([oe.common,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.roughnessmap,oe.metalnessmap,oe.fog,oe.lights,{emissive:{value:new ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:Ft([oe.common,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.gradientmap,oe.fog,oe.lights,{emissive:{value:new ze(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:Ft([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:Ft([oe.points,oe.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:Ft([oe.common,oe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:Ft([oe.common,oe.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:Ft([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:Ft([oe.sprite,oe.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ve}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distanceRGBA:{uniforms:Ft([oe.common,oe.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distanceRGBA_vert,fragmentShader:Ge.distanceRGBA_frag},shadow:{uniforms:Ft([oe.lights,oe.fog,{color:{value:new ze(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};yn.physical={uniforms:Ft([yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new Xe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new Xe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new ze(0)},specularColor:{value:new ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new Xe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const na={r:0,b:0,g:0},fi=new Sn,Pp=new ct;function Lp(n,e,t,i,s,a,r){const o=new ze(0);let c=a===!0?0:1,l,h,d=null,u=0,f=null;function g(_){let y=_.isScene===!0?_.background:null;return y&&y.isTexture&&(y=(_.backgroundBlurriness>0?t:e).get(y)),y}function v(_){let y=!1;const M=g(_);M===null?p(o,c):M&&M.isColor&&(p(M,1),y=!0);const C=n.xr.getEnvironmentBlendMode();C==="additive"?i.buffers.color.setClear(0,0,0,1,r):C==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,r),(n.autoClear||y)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(_,y){const M=g(y);M&&(M.isCubeTexture||M.mapping===wa)?(h===void 0&&(h=new Re(new xn(1,1,1),new ai({name:"BackgroundCubeMaterial",uniforms:ss(yn.backgroundCube.uniforms),vertexShader:yn.backgroundCube.vertexShader,fragmentShader:yn.backgroundCube.fragmentShader,side:$t,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),fi.copy(y.backgroundRotation),fi.x*=-1,fi.y*=-1,fi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(fi.y*=-1,fi.z*=-1),h.material.uniforms.envMap.value=M,h.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Pp.makeRotationFromEuler(fi)),h.material.toneMapped=tt.getTransfer(M.colorSpace)!==lt,(d!==M||u!==M.version||f!==n.toneMapping)&&(h.material.needsUpdate=!0,d=M,u=M.version,f=n.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new Re(new sn(2,2),new ai({name:"BackgroundMaterial",uniforms:ss(yn.background.uniforms),vertexShader:yn.background.vertexShader,fragmentShader:yn.background.fragmentShader,side:si,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=tt.getTransfer(M.colorSpace)!==lt,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(d!==M||u!==M.version||f!==n.toneMapping)&&(l.material.needsUpdate=!0,d=M,u=M.version,f=n.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function p(_,y){_.getRGB(na,Bc(n)),i.buffers.color.setClear(na.r,na.g,na.b,y,r)}return{getClearColor:function(){return o},setClearColor:function(_,y=1){o.set(_),c=y,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(_){c=_,p(o,c)},render:v,addToRenderList:m}}function Dp(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null);let a=s,r=!1;function o(b,S,D,I,O){let $=!1;const B=d(I,D,S);a!==B&&(a=B,l(a.object)),$=f(b,I,D,O),$&&g(b,I,D,O),O!==null&&e.update(O,n.ELEMENT_ARRAY_BUFFER),($||r)&&(r=!1,M(b,S,D,I),O!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function c(){return n.createVertexArray()}function l(b){return n.bindVertexArray(b)}function h(b){return n.deleteVertexArray(b)}function d(b,S,D){const I=D.wireframe===!0;let O=i[b.id];O===void 0&&(O={},i[b.id]=O);let $=O[S.id];$===void 0&&($={},O[S.id]=$);let B=$[I];return B===void 0&&(B=u(c()),$[I]=B),B}function u(b){const S=[],D=[],I=[];for(let O=0;O<t;O++)S[O]=0,D[O]=0,I[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:S,enabledAttributes:D,attributeDivisors:I,object:b,attributes:{},index:null}}function f(b,S,D,I){const O=a.attributes,$=S.attributes;let B=0;const te=D.getAttributes();for(const Y in te)if(te[Y].location>=0){const fe=O[Y];let xe=$[Y];if(xe===void 0&&(Y==="instanceMatrix"&&b.instanceMatrix&&(xe=b.instanceMatrix),Y==="instanceColor"&&b.instanceColor&&(xe=b.instanceColor)),fe===void 0||fe.attribute!==xe||xe&&fe.data!==xe.data)return!0;B++}return a.attributesNum!==B||a.index!==I}function g(b,S,D,I){const O={},$=S.attributes;let B=0;const te=D.getAttributes();for(const Y in te)if(te[Y].location>=0){let fe=$[Y];fe===void 0&&(Y==="instanceMatrix"&&b.instanceMatrix&&(fe=b.instanceMatrix),Y==="instanceColor"&&b.instanceColor&&(fe=b.instanceColor));const xe={};xe.attribute=fe,fe&&fe.data&&(xe.data=fe.data),O[Y]=xe,B++}a.attributes=O,a.attributesNum=B,a.index=I}function v(){const b=a.newAttributes;for(let S=0,D=b.length;S<D;S++)b[S]=0}function m(b){p(b,0)}function p(b,S){const D=a.newAttributes,I=a.enabledAttributes,O=a.attributeDivisors;D[b]=1,I[b]===0&&(n.enableVertexAttribArray(b),I[b]=1),O[b]!==S&&(n.vertexAttribDivisor(b,S),O[b]=S)}function _(){const b=a.newAttributes,S=a.enabledAttributes;for(let D=0,I=S.length;D<I;D++)S[D]!==b[D]&&(n.disableVertexAttribArray(D),S[D]=0)}function y(b,S,D,I,O,$,B){B===!0?n.vertexAttribIPointer(b,S,D,O,$):n.vertexAttribPointer(b,S,D,I,O,$)}function M(b,S,D,I){v();const O=I.attributes,$=D.getAttributes(),B=S.defaultAttributeValues;for(const te in $){const Y=$[te];if(Y.location>=0){let ce=O[te];if(ce===void 0&&(te==="instanceMatrix"&&b.instanceMatrix&&(ce=b.instanceMatrix),te==="instanceColor"&&b.instanceColor&&(ce=b.instanceColor)),ce!==void 0){const fe=ce.normalized,xe=ce.itemSize,We=e.get(ce);if(We===void 0)continue;const qe=We.buffer,Z=We.type,ne=We.bytesPerElement,_e=Z===n.INT||Z===n.UNSIGNED_INT||ce.gpuType===_o;if(ce.isInterleavedBufferAttribute){const z=ce.data,Q=z.stride,re=ce.offset;if(z.isInstancedInterleavedBuffer){for(let Ae=0;Ae<Y.locationSize;Ae++)p(Y.location+Ae,z.meshPerAttribute);b.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=z.meshPerAttribute*z.count)}else for(let Ae=0;Ae<Y.locationSize;Ae++)m(Y.location+Ae);n.bindBuffer(n.ARRAY_BUFFER,qe);for(let Ae=0;Ae<Y.locationSize;Ae++)y(Y.location+Ae,xe/Y.locationSize,Z,fe,Q*ne,(re+xe/Y.locationSize*Ae)*ne,_e)}else{if(ce.isInstancedBufferAttribute){for(let z=0;z<Y.locationSize;z++)p(Y.location+z,ce.meshPerAttribute);b.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let z=0;z<Y.locationSize;z++)m(Y.location+z);n.bindBuffer(n.ARRAY_BUFFER,qe);for(let z=0;z<Y.locationSize;z++)y(Y.location+z,xe/Y.locationSize,Z,fe,xe*ne,xe/Y.locationSize*z*ne,_e)}}else if(B!==void 0){const fe=B[te];if(fe!==void 0)switch(fe.length){case 2:n.vertexAttrib2fv(Y.location,fe);break;case 3:n.vertexAttrib3fv(Y.location,fe);break;case 4:n.vertexAttrib4fv(Y.location,fe);break;default:n.vertexAttrib1fv(Y.location,fe)}}}}_()}function C(){R();for(const b in i){const S=i[b];for(const D in S){const I=S[D];for(const O in I)h(I[O].object),delete I[O];delete S[D]}delete i[b]}}function w(b){if(i[b.id]===void 0)return;const S=i[b.id];for(const D in S){const I=S[D];for(const O in I)h(I[O].object),delete I[O];delete S[D]}delete i[b.id]}function A(b){for(const S in i){const D=i[S];if(D[b.id]===void 0)continue;const I=D[b.id];for(const O in I)h(I[O].object),delete I[O];delete D[b.id]}}function R(){q(),r=!0,a!==s&&(a=s,l(a.object))}function q(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:R,resetDefaultState:q,dispose:C,releaseStatesOfGeometry:w,releaseStatesOfProgram:A,initAttributes:v,enableAttribute:m,disableUnusedAttributes:_}}function Ip(n,e,t){let i;function s(l){i=l}function a(l,h){n.drawArrays(i,l,h),t.update(h,i,1)}function r(l,h,d){d!==0&&(n.drawArraysInstanced(i,l,h,d),t.update(h,i,d))}function o(l,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,h,0,d);let f=0;for(let g=0;g<d;g++)f+=h[g];t.update(f,i,1)}function c(l,h,d,u){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)r(l[g],h[g],u[g]);else{f.multiDrawArraysInstancedWEBGL(i,l,0,h,0,u,0,d);let g=0;for(let v=0;v<d;v++)g+=h[v];for(let v=0;v<u.length;v++)t.update(g,i,u[v])}}this.setMode=s,this.render=a,this.renderInstances=r,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function Up(n,e,t,i){let s;function a(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function r(A){return!(A!==bn&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const R=A===Ps&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==kn&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Un&&!R)}function c(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const d=t.logarithmicDepthBuffer===!0,u=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(u===!0){const A=e.get("EXT_clip_control");A.clipControlEXT(A.LOWER_LEFT_EXT,A.ZERO_TO_ONE_EXT)}const f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),_=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),y=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,w=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:r,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reverseDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:_,maxVaryings:y,maxFragmentUniforms:M,vertexTextures:C,maxSamples:w}}function Np(n){const e=this;let t=null,i=0,s=!1,a=!1;const r=new Zn,o=new Ve,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||i!==0||s;return s=u,i=d.length,f},this.beginShadows=function(){a=!0,h(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){const g=d.clippingPlanes,v=d.clipIntersection,m=d.clipShadows,p=n.get(d);if(!s||g===null||g.length===0||a&&!m)a?h(null):l();else{const _=a?0:i,y=_*4;let M=p.clippingState||null;c.value=M,M=h(g,u,y,f);for(let C=0;C!==y;++C)M[C]=t[C];p.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=_}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(d,u,f,g){const v=d!==null?d.length:0;let m=null;if(v!==0){if(m=c.value,g!==!0||m===null){const p=f+v*4,_=u.matrixWorldInverse;o.getNormalMatrix(_),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,M=f;y!==v;++y,M+=4)r.copy(d[y]).applyMatrix4(_,o),r.normal.toArray(m,M),m[M+3]=r.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function Fp(n){let e=new WeakMap;function t(r,o){return o===Pr?r.mapping=es:o===Lr&&(r.mapping=ts),r}function i(r){if(r&&r.isTexture){const o=r.mapping;if(o===Pr||o===Lr)if(e.has(r)){const c=e.get(r).texture;return t(c,r.mapping)}else{const c=r.image;if(c&&c.height>0){const l=new $d(c.height);return l.fromEquirectangularTexture(n,r),e.set(r,l),r.addEventListener("dispose",s),t(l.texture,r.mapping)}else return null}}return r}function s(r){const o=r.target;o.removeEventListener("dispose",s);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function a(){e=new WeakMap}return{get:i,dispose:a}}class Co extends zc{constructor(e=-1,t=1,i=1,s=-1,a=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=a,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,a,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let a=i-e,r=i+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=l*this.view.offsetX,r=a+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(a,r,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Yi=4,vl=[.125,.215,.35,.446,.526,.582],vi=20,ar=new Co,_l=new ze;let rr=null,or=0,lr=0,cr=!1;const mi=(1+Math.sqrt(5))/2,Vi=1/mi,xl=[new k(-mi,Vi,0),new k(mi,Vi,0),new k(-Vi,0,mi),new k(Vi,0,mi),new k(0,mi,-Vi),new k(0,mi,Vi),new k(-1,1,-1),new k(1,1,-1),new k(-1,1,1),new k(1,1,1)];class bl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100){rr=this._renderer.getRenderTarget(),or=this._renderer.getActiveCubeFace(),lr=this._renderer.getActiveMipmapLevel(),cr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(e,i,s,a),t>0&&this._blur(a,0,0,t),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Sl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ml(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(rr,or,lr),this._renderer.xr.enabled=cr,e.scissorTest=!1,ia(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===es||e.mapping===ts?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),rr=this._renderer.getRenderTarget(),or=this._renderer.getActiveCubeFace(),lr=this._renderer.getActiveMipmapLevel(),cr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:vn,minFilter:vn,generateMipmaps:!1,type:Ps,format:bn,colorSpace:ri,depthBuffer:!1},s=yl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=yl(e,t,i);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=kp(a)),this._blurMaterial=Op(a,e,t)}return s}_compileMaterial(e){const t=new Re(this._lodPlanes[0],e);this._renderer.compile(t,ar)}_sceneToCubeUV(e,t,i,s){const o=new gn(90,1,t,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(_l),h.toneMapping=ti,h.autoClear=!1;const f=new kt({name:"PMREM.Background",side:$t,depthWrite:!1,depthTest:!1}),g=new Re(new xn,f);let v=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,v=!0):(f.color.copy(_l),v=!0);for(let p=0;p<6;p++){const _=p%3;_===0?(o.up.set(0,c[p],0),o.lookAt(l[p],0,0)):_===1?(o.up.set(0,0,c[p]),o.lookAt(0,l[p],0)):(o.up.set(0,c[p],0),o.lookAt(0,0,l[p]));const y=this._cubeSize;ia(s,_*y,p>2?y:0,y,y),h.setRenderTarget(s),v&&h.render(g,o),h.render(e,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=d,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===es||e.mapping===ts;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Sl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ml());const a=s?this._cubemapMaterial:this._equirectMaterial,r=new Re(this._lodPlanes[0],a),o=a.uniforms;o.envMap.value=e;const c=this._cubeSize;ia(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(r,ar)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let a=1;a<s;a++){const r=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),o=xl[(s-a-1)%xl.length];this._blur(e,a-1,a,r,o)}t.autoClear=i}_blur(e,t,i,s,a){const r=this._pingPongRenderTarget;this._halfBlur(e,r,t,i,s,"latitudinal",a),this._halfBlur(r,e,i,i,s,"longitudinal",a)}_halfBlur(e,t,i,s,a,r,o){const c=this._renderer,l=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new Re(this._lodPlanes[s],l),u=l.uniforms,f=this._sizeLods[i]-1,g=isFinite(a)?Math.PI/(2*f):2*Math.PI/(2*vi-1),v=a/g,m=isFinite(a)?1+Math.floor(h*v):vi;m>vi&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${vi}`);const p=[];let _=0;for(let A=0;A<vi;++A){const R=A/v,q=Math.exp(-R*R/2);p.push(q),A===0?_+=q:A<m&&(_+=2*q)}for(let A=0;A<p.length;A++)p[A]=p[A]/_;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=r==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:y}=this;u.dTheta.value=g,u.mipInt.value=y-i;const M=this._sizeLods[s],C=3*M*(s>y-Yi?s-y+Yi:0),w=4*(this._cubeSize-M);ia(t,C,w,3*M,2*M),c.setRenderTarget(t),c.render(d,ar)}}function kp(n){const e=[],t=[],i=[];let s=n;const a=n-Yi+1+vl.length;for(let r=0;r<a;r++){const o=Math.pow(2,s);t.push(o);let c=1/o;r>n-Yi?c=vl[r-n+Yi-1]:r===0&&(c=0),i.push(c);const l=1/(o-2),h=-l,d=1+l,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,v=3,m=2,p=1,_=new Float32Array(v*g*f),y=new Float32Array(m*g*f),M=new Float32Array(p*g*f);for(let w=0;w<f;w++){const A=w%3*2/3-1,R=w>2?0:-1,q=[A,R,0,A+2/3,R,0,A+2/3,R+1,0,A,R,0,A+2/3,R+1,0,A,R+1,0];_.set(q,v*g*w),y.set(u,m*g*w);const b=[w,w,w,w,w,w];M.set(b,p*g*w)}const C=new Ut;C.setAttribute("position",new Zt(_,v)),C.setAttribute("uv",new Zt(y,m)),C.setAttribute("faceIndex",new Zt(M,p)),e.push(C),s>Yi&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function yl(n,e,t){const i=new wi(n,e,t);return i.texture.mapping=wa,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ia(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function Op(n,e,t){const i=new Float32Array(vi),s=new k(0,1,0);return new ai({name:"SphericalGaussianBlur",defines:{n:vi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ro(),fragmentShader:`

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
		`,blending:ei,depthTest:!1,depthWrite:!1})}function Ml(){return new ai({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ro(),fragmentShader:`

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
		`,blending:ei,depthTest:!1,depthWrite:!1})}function Sl(){return new ai({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ro(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ei,depthTest:!1,depthWrite:!1})}function Ro(){return`

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
	`}function Bp(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const c=o.mapping,l=c===Pr||c===Lr,h=c===es||c===ts;if(l||h){let d=e.get(o);const u=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return t===null&&(t=new bl(n)),d=l?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const f=o.image;return l&&f&&f.height>0||h&&f&&s(f)?(t===null&&(t=new bl(n)),d=l?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",a),d.texture):null}}}return o}function s(o){let c=0;const l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function a(o){const c=o.target;c.removeEventListener("dispose",a);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function r(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:r}}function zp(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&ga("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function Hp(n,e,t,i){const s={},a=new WeakMap;function r(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);for(const g in u.morphAttributes){const v=u.morphAttributes[g];for(let m=0,p=v.length;m<p;m++)e.remove(v[m])}u.removeEventListener("dispose",r),delete s[u.id];const f=a.get(u);f&&(e.remove(f),a.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",r),s[u.id]=!0,t.memory.geometries++),u}function c(d){const u=d.attributes;for(const g in u)e.update(u[g],n.ARRAY_BUFFER);const f=d.morphAttributes;for(const g in f){const v=f[g];for(let m=0,p=v.length;m<p;m++)e.update(v[m],n.ARRAY_BUFFER)}}function l(d){const u=[],f=d.index,g=d.attributes.position;let v=0;if(f!==null){const _=f.array;v=f.version;for(let y=0,M=_.length;y<M;y+=3){const C=_[y+0],w=_[y+1],A=_[y+2];u.push(C,w,w,A,A,C)}}else if(g!==void 0){const _=g.array;v=g.version;for(let y=0,M=_.length/3-1;y<M;y+=3){const C=y+0,w=y+1,A=y+2;u.push(C,w,w,A,A,C)}}else return;const m=new(Ic(u)?Oc:kc)(u,1);m.version=v;const p=a.get(d);p&&e.remove(p),a.set(d,m)}function h(d){const u=a.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&l(d)}else l(d);return a.get(d)}return{get:o,update:c,getWireframeAttribute:h}}function Gp(n,e,t){let i;function s(u){i=u}let a,r;function o(u){a=u.type,r=u.bytesPerElement}function c(u,f){n.drawElements(i,f,a,u*r),t.update(f,i,1)}function l(u,f,g){g!==0&&(n.drawElementsInstanced(i,f,a,u*r,g),t.update(f,i,g))}function h(u,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,a,u,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,i,1)}function d(u,f,g,v){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<u.length;p++)l(u[p]/r,f[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(i,f,0,a,u,0,v,0,g);let p=0;for(let _=0;_<g;_++)p+=f[_];for(let _=0;_<v.length;_++)t.update(p,i,v[_])}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function Vp(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,r,o){switch(t.calls++,r){case n.TRIANGLES:t.triangles+=o*(a/3);break;case n.LINES:t.lines+=o*(a/2);break;case n.LINE_STRIP:t.lines+=o*(a-1);break;case n.LINE_LOOP:t.lines+=o*a;break;case n.POINTS:t.points+=o*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Wp(n,e,t){const i=new WeakMap,s=new ft;function a(r,o,c){const l=r.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=i.get(o);if(u===void 0||u.count!==d){let q=function(){A.dispose(),i.delete(o),o.removeEventListener("dispose",q)};u!==void 0&&u.texture.dispose();const f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],_=o.morphAttributes.color||[];let y=0;f===!0&&(y=1),g===!0&&(y=2),v===!0&&(y=3);let M=o.attributes.position.count*y,C=1;M>e.maxTextureSize&&(C=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const w=new Float32Array(M*C*4*d),A=new Nc(w,M,C,d);A.type=Un,A.needsUpdate=!0;const R=y*4;for(let b=0;b<d;b++){const S=m[b],D=p[b],I=_[b],O=M*C*4*b;for(let $=0;$<S.count;$++){const B=$*R;f===!0&&(s.fromBufferAttribute(S,$),w[O+B+0]=s.x,w[O+B+1]=s.y,w[O+B+2]=s.z,w[O+B+3]=0),g===!0&&(s.fromBufferAttribute(D,$),w[O+B+4]=s.x,w[O+B+5]=s.y,w[O+B+6]=s.z,w[O+B+7]=0),v===!0&&(s.fromBufferAttribute(I,$),w[O+B+8]=s.x,w[O+B+9]=s.y,w[O+B+10]=s.z,w[O+B+11]=I.itemSize===4?s.w:1)}}u={count:d,texture:A,size:new Xe(M,C)},i.set(o,u),o.addEventListener("dispose",q)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",r.morphTexture,t);else{let f=0;for(let v=0;v<l.length;v++)f+=l[v];const g=o.morphTargetsRelative?1:1-f;c.getUniforms().setValue(n,"morphTargetBaseInfluence",g),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:a}}function qp(n,e,t,i){let s=new WeakMap;function a(c){const l=i.render.frame,h=c.geometry,d=e.get(c,h);if(s.get(d)!==l&&(e.update(d),s.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const u=c.skeleton;s.get(u)!==l&&(u.update(),s.set(u,l))}return d}function r(){s=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:a,dispose:r}}class Vc extends Ht{constructor(e,t,i,s,a,r,o,c,l,h=Ki){if(h!==Ki&&h!==is)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Ki&&(i=Ti),i===void 0&&h===is&&(i=ns),super(null,s,a,r,o,c,h,i,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:on,this.minFilter=c!==void 0?c:on,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Wc=new Ht,El=new Vc(1,1),qc=new Nc,$c=new Pd,Xc=new Hc,Tl=[],wl=[],Al=new Float32Array(16),Cl=new Float32Array(9),Rl=new Float32Array(4);function ls(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let a=Tl[s];if(a===void 0&&(a=new Float32Array(s),Tl[s]=a),e!==0){i.toArray(a,0);for(let r=1,o=0;r!==e;++r)o+=t,n[r].toArray(a,o)}return a}function St(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Et(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Ra(n,e){let t=wl[e];t===void 0&&(t=new Int32Array(e),wl[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function $p(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Xp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;n.uniform2fv(this.addr,e),Et(t,e)}}function Yp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(St(t,e))return;n.uniform3fv(this.addr,e),Et(t,e)}}function jp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;n.uniform4fv(this.addr,e),Et(t,e)}}function Kp(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(St(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Et(t,e)}else{if(St(t,i))return;Rl.set(i),n.uniformMatrix2fv(this.addr,!1,Rl),Et(t,i)}}function Zp(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(St(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Et(t,e)}else{if(St(t,i))return;Cl.set(i),n.uniformMatrix3fv(this.addr,!1,Cl),Et(t,i)}}function Jp(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(St(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Et(t,e)}else{if(St(t,i))return;Al.set(i),n.uniformMatrix4fv(this.addr,!1,Al),Et(t,i)}}function Qp(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function em(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;n.uniform2iv(this.addr,e),Et(t,e)}}function tm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;n.uniform3iv(this.addr,e),Et(t,e)}}function nm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;n.uniform4iv(this.addr,e),Et(t,e)}}function im(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function sm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;n.uniform2uiv(this.addr,e),Et(t,e)}}function am(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;n.uniform3uiv(this.addr,e),Et(t,e)}}function rm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;n.uniform4uiv(this.addr,e),Et(t,e)}}function om(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let a;this.type===n.SAMPLER_2D_SHADOW?(El.compareFunction=Dc,a=El):a=Wc,t.setTexture2D(e||a,s)}function lm(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||$c,s)}function cm(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Xc,s)}function hm(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||qc,s)}function dm(n){switch(n){case 5126:return $p;case 35664:return Xp;case 35665:return Yp;case 35666:return jp;case 35674:return Kp;case 35675:return Zp;case 35676:return Jp;case 5124:case 35670:return Qp;case 35667:case 35671:return em;case 35668:case 35672:return tm;case 35669:case 35673:return nm;case 5125:return im;case 36294:return sm;case 36295:return am;case 36296:return rm;case 35678:case 36198:case 36298:case 36306:case 35682:return om;case 35679:case 36299:case 36307:return lm;case 35680:case 36300:case 36308:case 36293:return cm;case 36289:case 36303:case 36311:case 36292:return hm}}function um(n,e){n.uniform1fv(this.addr,e)}function fm(n,e){const t=ls(e,this.size,2);n.uniform2fv(this.addr,t)}function pm(n,e){const t=ls(e,this.size,3);n.uniform3fv(this.addr,t)}function mm(n,e){const t=ls(e,this.size,4);n.uniform4fv(this.addr,t)}function gm(n,e){const t=ls(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function vm(n,e){const t=ls(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function _m(n,e){const t=ls(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function xm(n,e){n.uniform1iv(this.addr,e)}function bm(n,e){n.uniform2iv(this.addr,e)}function ym(n,e){n.uniform3iv(this.addr,e)}function Mm(n,e){n.uniform4iv(this.addr,e)}function Sm(n,e){n.uniform1uiv(this.addr,e)}function Em(n,e){n.uniform2uiv(this.addr,e)}function Tm(n,e){n.uniform3uiv(this.addr,e)}function wm(n,e){n.uniform4uiv(this.addr,e)}function Am(n,e,t){const i=this.cache,s=e.length,a=Ra(t,s);St(i,a)||(n.uniform1iv(this.addr,a),Et(i,a));for(let r=0;r!==s;++r)t.setTexture2D(e[r]||Wc,a[r])}function Cm(n,e,t){const i=this.cache,s=e.length,a=Ra(t,s);St(i,a)||(n.uniform1iv(this.addr,a),Et(i,a));for(let r=0;r!==s;++r)t.setTexture3D(e[r]||$c,a[r])}function Rm(n,e,t){const i=this.cache,s=e.length,a=Ra(t,s);St(i,a)||(n.uniform1iv(this.addr,a),Et(i,a));for(let r=0;r!==s;++r)t.setTextureCube(e[r]||Xc,a[r])}function Pm(n,e,t){const i=this.cache,s=e.length,a=Ra(t,s);St(i,a)||(n.uniform1iv(this.addr,a),Et(i,a));for(let r=0;r!==s;++r)t.setTexture2DArray(e[r]||qc,a[r])}function Lm(n){switch(n){case 5126:return um;case 35664:return fm;case 35665:return pm;case 35666:return mm;case 35674:return gm;case 35675:return vm;case 35676:return _m;case 5124:case 35670:return xm;case 35667:case 35671:return bm;case 35668:case 35672:return ym;case 35669:case 35673:return Mm;case 5125:return Sm;case 36294:return Em;case 36295:return Tm;case 36296:return wm;case 35678:case 36198:case 36298:case 36306:case 35682:return Am;case 35679:case 36299:case 36307:return Cm;case 35680:case 36300:case 36308:case 36293:return Rm;case 36289:case 36303:case 36311:case 36292:return Pm}}class Dm{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=dm(t.type)}}class Im{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Lm(t.type)}}class Um{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let a=0,r=s.length;a!==r;++a){const o=s[a];o.setValue(e,t[o.id],i)}}}const hr=/(\w+)(\])?(\[|\.)?/g;function Pl(n,e){n.seq.push(e),n.map[e.id]=e}function Nm(n,e,t){const i=n.name,s=i.length;for(hr.lastIndex=0;;){const a=hr.exec(i),r=hr.lastIndex;let o=a[1];const c=a[2]==="]",l=a[3];if(c&&(o=o|0),l===void 0||l==="["&&r+2===s){Pl(t,l===void 0?new Dm(o,n,e):new Im(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new Um(o),Pl(t,d)),t=d}}}class va{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const a=e.getActiveUniform(t,s),r=e.getUniformLocation(t,a.name);Nm(a,r,this)}}setValue(e,t,i,s){const a=this.map[t];a!==void 0&&a.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let a=0,r=t.length;a!==r;++a){const o=t[a],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,a=e.length;s!==a;++s){const r=e[s];r.id in t&&i.push(r)}return i}}function Ll(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Fm=37297;let km=0;function Om(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let r=s;r<a;r++){const o=r+1;i.push(`${o===e?">":" "} ${o}: ${t[r]}`)}return i.join(`
`)}function Bm(n){const e=tt.getPrimaries(tt.workingColorSpace),t=tt.getPrimaries(n);let i;switch(e===t?i="":e===ya&&t===ba?i="LinearDisplayP3ToLinearSRGB":e===ba&&t===ya&&(i="LinearSRGBToLinearDisplayP3"),n){case ri:case Aa:return[i,"LinearTransferOETF"];case qt:case Eo:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Dl(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=n.getShaderInfoLog(e).trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const r=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+Om(n.getShaderSource(e),r)}else return s}function zm(n,e){const t=Bm(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Hm(n,e){let t;switch(e){case Gh:t="Linear";break;case Vh:t="Reinhard";break;case Wh:t="Cineon";break;case xc:t="ACESFilmic";break;case $h:t="AgX";break;case Xh:t="Neutral";break;case qh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const sa=new k;function Gm(){tt.getLuminanceCoefficients(sa);const n=sa.x.toFixed(4),e=sa.y.toFixed(4),t=sa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Vm(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ms).join(`
`)}function Wm(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function qm(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const a=n.getActiveAttrib(e,s),r=a.name;let o=1;a.type===n.FLOAT_MAT2&&(o=2),a.type===n.FLOAT_MAT3&&(o=3),a.type===n.FLOAT_MAT4&&(o=4),t[r]={type:a.type,location:n.getAttribLocation(e,r),locationSize:o}}return t}function Ms(n){return n!==""}function Il(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ul(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const $m=/^[ \t]*#include +<([\w\d./]+)>/gm;function ro(n){return n.replace($m,Ym)}const Xm=new Map;function Ym(n,e){let t=Ge[e];if(t===void 0){const i=Xm.get(e);if(i!==void 0)t=Ge[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return ro(t)}const jm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Nl(n){return n.replace(jm,Km)}function Km(n,e,t,i){let s="";for(let a=parseInt(e);a<parseInt(t);a++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return s}function Fl(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}function Zm(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===gc?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===vc?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Pn&&(e="SHADOWMAP_TYPE_VSM"),e}function Jm(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case es:case ts:e="ENVMAP_TYPE_CUBE";break;case wa:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Qm(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case ts:e="ENVMAP_MODE_REFRACTION";break}return e}function e0(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case _c:e="ENVMAP_BLENDING_MULTIPLY";break;case zh:e="ENVMAP_BLENDING_MIX";break;case Hh:e="ENVMAP_BLENDING_ADD";break}return e}function t0(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function n0(n,e,t,i){const s=n.getContext(),a=t.defines;let r=t.vertexShader,o=t.fragmentShader;const c=Zm(t),l=Jm(t),h=Qm(t),d=e0(t),u=t0(t),f=Vm(t),g=Wm(a),v=s.createProgram();let m,p,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ms).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ms).join(`
`),p.length>0&&(p+=`
`)):(m=[Fl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ms).join(`
`),p=[Fl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ti?"#define TONE_MAPPING":"",t.toneMapping!==ti?Ge.tonemapping_pars_fragment:"",t.toneMapping!==ti?Hm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,zm("linearToOutputTexel",t.outputColorSpace),Gm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ms).join(`
`)),r=ro(r),r=Il(r,t),r=Ul(r,t),o=ro(o),o=Il(o,t),o=Ul(o,t),r=Nl(r),o=Nl(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Jo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Jo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const y=_+m+r,M=_+p+o,C=Ll(s,s.VERTEX_SHADER,y),w=Ll(s,s.FRAGMENT_SHADER,M);s.attachShader(v,C),s.attachShader(v,w),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function A(S){if(n.debug.checkShaderErrors){const D=s.getProgramInfoLog(v).trim(),I=s.getShaderInfoLog(C).trim(),O=s.getShaderInfoLog(w).trim();let $=!0,B=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if($=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,C,w);else{const te=Dl(s,C,"vertex"),Y=Dl(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+S.name+`
Material Type: `+S.type+`

Program Info Log: `+D+`
`+te+`
`+Y)}else D!==""?console.warn("THREE.WebGLProgram: Program Info Log:",D):(I===""||O==="")&&(B=!1);B&&(S.diagnostics={runnable:$,programLog:D,vertexShader:{log:I,prefix:m},fragmentShader:{log:O,prefix:p}})}s.deleteShader(C),s.deleteShader(w),R=new va(s,v),q=qm(s,v)}let R;this.getUniforms=function(){return R===void 0&&A(this),R};let q;this.getAttributes=function(){return q===void 0&&A(this),q};let b=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(v,Fm)),b},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=km++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=C,this.fragmentShader=w,this}let i0=0;class s0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),a=this._getShaderStage(i),r=this._getShaderCacheForMaterial(e);return r.has(s)===!1&&(r.add(s),s.usedTimes++),r.has(a)===!1&&(r.add(a),a.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new a0(e),t.set(e,i)),i}}class a0{constructor(e){this.id=i0++,this.code=e,this.usedTimes=0}}function r0(n,e,t,i,s,a,r){const o=new wo,c=new s0,l=new Set,h=[],d=s.logarithmicDepthBuffer,u=s.reverseDepthBuffer,f=s.vertexTextures;let g=s.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(b){return l.add(b),b===0?"uv":`uv${b}`}function p(b,S,D,I,O){const $=I.fog,B=O.geometry,te=b.isMeshStandardMaterial?I.environment:null,Y=(b.isMeshStandardMaterial?t:e).get(b.envMap||te),ce=Y&&Y.mapping===wa?Y.image.height:null,fe=v[b.type];b.precision!==null&&(g=s.getMaxPrecision(b.precision),g!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",g,"instead."));const xe=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,We=xe!==void 0?xe.length:0;let qe=0;B.morphAttributes.position!==void 0&&(qe=1),B.morphAttributes.normal!==void 0&&(qe=2),B.morphAttributes.color!==void 0&&(qe=3);let Z,ne,_e,z;if(fe){const Vt=yn[fe];Z=Vt.vertexShader,ne=Vt.fragmentShader}else Z=b.vertexShader,ne=b.fragmentShader,c.update(b),_e=c.getVertexShaderID(b),z=c.getFragmentShaderID(b);const Q=n.getRenderTarget(),re=O.isInstancedMesh===!0,Ae=O.isBatchedMesh===!0,Le=!!b.map,Pe=!!b.matcap,P=!!Y,yt=!!b.aoMap,ke=!!b.lightMap,je=!!b.bumpMap,De=!!b.normalMap,H=!!b.displacementMap,W=!!b.emissiveMap,E=!!b.metalnessMap,x=!!b.roughnessMap,L=b.anisotropy>0,X=b.clearcoat>0,J=b.dispersion>0,j=b.iridescence>0,le=b.sheen>0,ie=b.transmission>0,he=L&&!!b.anisotropyMap,Ye=X&&!!b.clearcoatMap,se=X&&!!b.clearcoatNormalMap,be=X&&!!b.clearcoatRoughnessMap,Ne=j&&!!b.iridescenceMap,Fe=j&&!!b.iridescenceThicknessMap,ye=le&&!!b.sheenColorMap,Ke=le&&!!b.sheenRoughnessMap,Oe=!!b.specularMap,it=!!b.specularColorMap,U=!!b.specularIntensityMap,ge=ie&&!!b.transmissionMap,K=ie&&!!b.thicknessMap,ee=!!b.gradientMap,pe=!!b.alphaMap,ve=b.alphaTest>0,Ze=!!b.alphaHash,_t=!!b.extensions;let Gt=ti;b.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(Gt=n.toneMapping);const Je={shaderID:fe,shaderType:b.type,shaderName:b.name,vertexShader:Z,fragmentShader:ne,defines:b.defines,customVertexShaderID:_e,customFragmentShaderID:z,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:g,batching:Ae,batchingColor:Ae&&O._colorsTexture!==null,instancing:re,instancingColor:re&&O.instanceColor!==null,instancingMorph:re&&O.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:Q===null?n.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:ri,alphaToCoverage:!!b.alphaToCoverage,map:Le,matcap:Pe,envMap:P,envMapMode:P&&Y.mapping,envMapCubeUVHeight:ce,aoMap:yt,lightMap:ke,bumpMap:je,normalMap:De,displacementMap:f&&H,emissiveMap:W,normalMapObjectSpace:De&&b.normalMapType===Zh,normalMapTangentSpace:De&&b.normalMapType===Lc,metalnessMap:E,roughnessMap:x,anisotropy:L,anisotropyMap:he,clearcoat:X,clearcoatMap:Ye,clearcoatNormalMap:se,clearcoatRoughnessMap:be,dispersion:J,iridescence:j,iridescenceMap:Ne,iridescenceThicknessMap:Fe,sheen:le,sheenColorMap:ye,sheenRoughnessMap:Ke,specularMap:Oe,specularColorMap:it,specularIntensityMap:U,transmission:ie,transmissionMap:ge,thicknessMap:K,gradientMap:ee,opaque:b.transparent===!1&&b.blending===Mi&&b.alphaToCoverage===!1,alphaMap:pe,alphaTest:ve,alphaHash:Ze,combine:b.combine,mapUv:Le&&m(b.map.channel),aoMapUv:yt&&m(b.aoMap.channel),lightMapUv:ke&&m(b.lightMap.channel),bumpMapUv:je&&m(b.bumpMap.channel),normalMapUv:De&&m(b.normalMap.channel),displacementMapUv:H&&m(b.displacementMap.channel),emissiveMapUv:W&&m(b.emissiveMap.channel),metalnessMapUv:E&&m(b.metalnessMap.channel),roughnessMapUv:x&&m(b.roughnessMap.channel),anisotropyMapUv:he&&m(b.anisotropyMap.channel),clearcoatMapUv:Ye&&m(b.clearcoatMap.channel),clearcoatNormalMapUv:se&&m(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:be&&m(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Ne&&m(b.iridescenceMap.channel),iridescenceThicknessMapUv:Fe&&m(b.iridescenceThicknessMap.channel),sheenColorMapUv:ye&&m(b.sheenColorMap.channel),sheenRoughnessMapUv:Ke&&m(b.sheenRoughnessMap.channel),specularMapUv:Oe&&m(b.specularMap.channel),specularColorMapUv:it&&m(b.specularColorMap.channel),specularIntensityMapUv:U&&m(b.specularIntensityMap.channel),transmissionMapUv:ge&&m(b.transmissionMap.channel),thicknessMapUv:K&&m(b.thicknessMap.channel),alphaMapUv:pe&&m(b.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(De||L),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!B.attributes.uv&&(Le||pe),fog:!!$,useFog:b.fog===!0,fogExp2:!!$&&$.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:u,skinning:O.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:We,morphTextureStride:qe,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&D.length>0,shadowMapType:n.shadowMap.type,toneMapping:Gt,decodeVideoTexture:Le&&b.map.isVideoTexture===!0&&tt.getTransfer(b.map.colorSpace)===lt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Mn,flipSided:b.side===$t,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:_t&&b.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_t&&b.extensions.multiDraw===!0||Ae)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Je.vertexUv1s=l.has(1),Je.vertexUv2s=l.has(2),Je.vertexUv3s=l.has(3),l.clear(),Je}function _(b){const S=[];if(b.shaderID?S.push(b.shaderID):(S.push(b.customVertexShaderID),S.push(b.customFragmentShaderID)),b.defines!==void 0)for(const D in b.defines)S.push(D),S.push(b.defines[D]);return b.isRawShaderMaterial===!1&&(y(S,b),M(S,b),S.push(n.outputColorSpace)),S.push(b.customProgramCacheKey),S.join()}function y(b,S){b.push(S.precision),b.push(S.outputColorSpace),b.push(S.envMapMode),b.push(S.envMapCubeUVHeight),b.push(S.mapUv),b.push(S.alphaMapUv),b.push(S.lightMapUv),b.push(S.aoMapUv),b.push(S.bumpMapUv),b.push(S.normalMapUv),b.push(S.displacementMapUv),b.push(S.emissiveMapUv),b.push(S.metalnessMapUv),b.push(S.roughnessMapUv),b.push(S.anisotropyMapUv),b.push(S.clearcoatMapUv),b.push(S.clearcoatNormalMapUv),b.push(S.clearcoatRoughnessMapUv),b.push(S.iridescenceMapUv),b.push(S.iridescenceThicknessMapUv),b.push(S.sheenColorMapUv),b.push(S.sheenRoughnessMapUv),b.push(S.specularMapUv),b.push(S.specularColorMapUv),b.push(S.specularIntensityMapUv),b.push(S.transmissionMapUv),b.push(S.thicknessMapUv),b.push(S.combine),b.push(S.fogExp2),b.push(S.sizeAttenuation),b.push(S.morphTargetsCount),b.push(S.morphAttributeCount),b.push(S.numDirLights),b.push(S.numPointLights),b.push(S.numSpotLights),b.push(S.numSpotLightMaps),b.push(S.numHemiLights),b.push(S.numRectAreaLights),b.push(S.numDirLightShadows),b.push(S.numPointLightShadows),b.push(S.numSpotLightShadows),b.push(S.numSpotLightShadowsWithMaps),b.push(S.numLightProbes),b.push(S.shadowMapType),b.push(S.toneMapping),b.push(S.numClippingPlanes),b.push(S.numClipIntersection),b.push(S.depthPacking)}function M(b,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),b.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reverseDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.alphaToCoverage&&o.enable(20),b.push(o.mask)}function C(b){const S=v[b.type];let D;if(S){const I=yn[S];D=Gd.clone(I.uniforms)}else D=b.uniforms;return D}function w(b,S){let D;for(let I=0,O=h.length;I<O;I++){const $=h[I];if($.cacheKey===S){D=$,++D.usedTimes;break}}return D===void 0&&(D=new n0(n,S,b,a),h.push(D)),D}function A(b){if(--b.usedTimes===0){const S=h.indexOf(b);h[S]=h[h.length-1],h.pop(),b.destroy()}}function R(b){c.remove(b)}function q(){c.dispose()}return{getParameters:p,getProgramCacheKey:_,getUniforms:C,acquireProgram:w,releaseProgram:A,releaseShaderCache:R,programs:h,dispose:q}}function o0(){let n=new WeakMap;function e(r){return n.has(r)}function t(r){let o=n.get(r);return o===void 0&&(o={},n.set(r,o)),o}function i(r){n.delete(r)}function s(r,o,c){n.get(r)[o]=c}function a(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:a}}function l0(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function kl(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Ol(){const n=[];let e=0;const t=[],i=[],s=[];function a(){e=0,t.length=0,i.length=0,s.length=0}function r(d,u,f,g,v,m){let p=n[e];return p===void 0?(p={id:d.id,object:d,geometry:u,material:f,groupOrder:g,renderOrder:d.renderOrder,z:v,group:m},n[e]=p):(p.id=d.id,p.object=d,p.geometry=u,p.material=f,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=v,p.group=m),e++,p}function o(d,u,f,g,v,m){const p=r(d,u,f,g,v,m);f.transmission>0?i.push(p):f.transparent===!0?s.push(p):t.push(p)}function c(d,u,f,g,v,m){const p=r(d,u,f,g,v,m);f.transmission>0?i.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function l(d,u){t.length>1&&t.sort(d||l0),i.length>1&&i.sort(u||kl),s.length>1&&s.sort(u||kl)}function h(){for(let d=e,u=n.length;d<u;d++){const f=n[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:i,transparent:s,init:a,push:o,unshift:c,finish:h,sort:l}}function c0(){let n=new WeakMap;function e(i,s){const a=n.get(i);let r;return a===void 0?(r=new Ol,n.set(i,[r])):s>=a.length?(r=new Ol,a.push(r)):r=a[s],r}function t(){n=new WeakMap}return{get:e,dispose:t}}function h0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new k,color:new ze};break;case"SpotLight":t={position:new k,direction:new k,color:new ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new k,color:new ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new k,skyColor:new ze,groundColor:new ze};break;case"RectAreaLight":t={color:new ze,position:new k,halfWidth:new k,halfHeight:new k};break}return n[e.id]=t,t}}}function d0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let u0=0;function f0(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function p0(n){const e=new h0,t=d0(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new k);const s=new k,a=new ct,r=new ct;function o(l){let h=0,d=0,u=0;for(let q=0;q<9;q++)i.probe[q].set(0,0,0);let f=0,g=0,v=0,m=0,p=0,_=0,y=0,M=0,C=0,w=0,A=0;l.sort(f0);for(let q=0,b=l.length;q<b;q++){const S=l[q],D=S.color,I=S.intensity,O=S.distance,$=S.shadow&&S.shadow.map?S.shadow.map.texture:null;if(S.isAmbientLight)h+=D.r*I,d+=D.g*I,u+=D.b*I;else if(S.isLightProbe){for(let B=0;B<9;B++)i.probe[B].addScaledVector(S.sh.coefficients[B],I);A++}else if(S.isDirectionalLight){const B=e.get(S);if(B.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){const te=S.shadow,Y=t.get(S);Y.shadowIntensity=te.intensity,Y.shadowBias=te.bias,Y.shadowNormalBias=te.normalBias,Y.shadowRadius=te.radius,Y.shadowMapSize=te.mapSize,i.directionalShadow[f]=Y,i.directionalShadowMap[f]=$,i.directionalShadowMatrix[f]=S.shadow.matrix,_++}i.directional[f]=B,f++}else if(S.isSpotLight){const B=e.get(S);B.position.setFromMatrixPosition(S.matrixWorld),B.color.copy(D).multiplyScalar(I),B.distance=O,B.coneCos=Math.cos(S.angle),B.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),B.decay=S.decay,i.spot[v]=B;const te=S.shadow;if(S.map&&(i.spotLightMap[C]=S.map,C++,te.updateMatrices(S),S.castShadow&&w++),i.spotLightMatrix[v]=te.matrix,S.castShadow){const Y=t.get(S);Y.shadowIntensity=te.intensity,Y.shadowBias=te.bias,Y.shadowNormalBias=te.normalBias,Y.shadowRadius=te.radius,Y.shadowMapSize=te.mapSize,i.spotShadow[v]=Y,i.spotShadowMap[v]=$,M++}v++}else if(S.isRectAreaLight){const B=e.get(S);B.color.copy(D).multiplyScalar(I),B.halfWidth.set(S.width*.5,0,0),B.halfHeight.set(0,S.height*.5,0),i.rectArea[m]=B,m++}else if(S.isPointLight){const B=e.get(S);if(B.color.copy(S.color).multiplyScalar(S.intensity),B.distance=S.distance,B.decay=S.decay,S.castShadow){const te=S.shadow,Y=t.get(S);Y.shadowIntensity=te.intensity,Y.shadowBias=te.bias,Y.shadowNormalBias=te.normalBias,Y.shadowRadius=te.radius,Y.shadowMapSize=te.mapSize,Y.shadowCameraNear=te.camera.near,Y.shadowCameraFar=te.camera.far,i.pointShadow[g]=Y,i.pointShadowMap[g]=$,i.pointShadowMatrix[g]=S.shadow.matrix,y++}i.point[g]=B,g++}else if(S.isHemisphereLight){const B=e.get(S);B.skyColor.copy(S.color).multiplyScalar(I),B.groundColor.copy(S.groundColor).multiplyScalar(I),i.hemi[p]=B,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=oe.LTC_FLOAT_1,i.rectAreaLTC2=oe.LTC_FLOAT_2):(i.rectAreaLTC1=oe.LTC_HALF_1,i.rectAreaLTC2=oe.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=u;const R=i.hash;(R.directionalLength!==f||R.pointLength!==g||R.spotLength!==v||R.rectAreaLength!==m||R.hemiLength!==p||R.numDirectionalShadows!==_||R.numPointShadows!==y||R.numSpotShadows!==M||R.numSpotMaps!==C||R.numLightProbes!==A)&&(i.directional.length=f,i.spot.length=v,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=_,i.directionalShadowMap.length=_,i.pointShadow.length=y,i.pointShadowMap.length=y,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=_,i.pointShadowMatrix.length=y,i.spotLightMatrix.length=M+C-w,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=A,R.directionalLength=f,R.pointLength=g,R.spotLength=v,R.rectAreaLength=m,R.hemiLength=p,R.numDirectionalShadows=_,R.numPointShadows=y,R.numSpotShadows=M,R.numSpotMaps=C,R.numLightProbes=A,i.version=u0++)}function c(l,h){let d=0,u=0,f=0,g=0,v=0;const m=h.matrixWorldInverse;for(let p=0,_=l.length;p<_;p++){const y=l[p];if(y.isDirectionalLight){const M=i.directional[d];M.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),d++}else if(y.isSpotLight){const M=i.spot[f];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),f++}else if(y.isRectAreaLight){const M=i.rectArea[g];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(m),r.identity(),a.copy(y.matrixWorld),a.premultiply(m),r.extractRotation(a),M.halfWidth.set(y.width*.5,0,0),M.halfHeight.set(0,y.height*.5,0),M.halfWidth.applyMatrix4(r),M.halfHeight.applyMatrix4(r),g++}else if(y.isPointLight){const M=i.point[u];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(m),u++}else if(y.isHemisphereLight){const M=i.hemi[v];M.direction.setFromMatrixPosition(y.matrixWorld),M.direction.transformDirection(m),v++}}}return{setup:o,setupView:c,state:i}}function Bl(n){const e=new p0(n),t=[],i=[];function s(h){l.camera=h,t.length=0,i.length=0}function a(h){t.push(h)}function r(h){i.push(h)}function o(){e.setup(t)}function c(h){e.setupView(t,h)}const l={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:a,pushShadow:r}}function m0(n){let e=new WeakMap;function t(s,a=0){const r=e.get(s);let o;return r===void 0?(o=new Bl(n),e.set(s,[o])):a>=r.length?(o=new Bl(n),r.push(o)):o=r[a],o}function i(){e=new WeakMap}return{get:t,dispose:i}}class g0 extends Ci{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=jh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class v0 extends Ci{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const _0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,x0=`uniform sampler2D shadow_pass;
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
}`;function b0(n,e,t){let i=new Ao;const s=new Xe,a=new Xe,r=new ft,o=new g0({depthPacking:Kh}),c=new v0,l={},h=t.maxTextureSize,d={[si]:$t,[$t]:si,[Mn]:Mn},u=new ai({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Xe},radius:{value:4}},vertexShader:_0,fragmentShader:x0}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new Ut;g.setAttribute("position",new Zt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Re(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=gc;let p=this.type;this.render=function(w,A,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const q=n.getRenderTarget(),b=n.getActiveCubeFace(),S=n.getActiveMipmapLevel(),D=n.state;D.setBlending(ei),D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const I=p!==Pn&&this.type===Pn,O=p===Pn&&this.type!==Pn;for(let $=0,B=w.length;$<B;$++){const te=w[$],Y=te.shadow;if(Y===void 0){console.warn("THREE.WebGLShadowMap:",te,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;s.copy(Y.mapSize);const ce=Y.getFrameExtents();if(s.multiply(ce),a.copy(Y.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(a.x=Math.floor(h/ce.x),s.x=a.x*ce.x,Y.mapSize.x=a.x),s.y>h&&(a.y=Math.floor(h/ce.y),s.y=a.y*ce.y,Y.mapSize.y=a.y)),Y.map===null||I===!0||O===!0){const xe=this.type!==Pn?{minFilter:on,magFilter:on}:{};Y.map!==null&&Y.map.dispose(),Y.map=new wi(s.x,s.y,xe),Y.map.texture.name=te.name+".shadowMap",Y.camera.updateProjectionMatrix()}n.setRenderTarget(Y.map),n.clear();const fe=Y.getViewportCount();for(let xe=0;xe<fe;xe++){const We=Y.getViewport(xe);r.set(a.x*We.x,a.y*We.y,a.x*We.z,a.y*We.w),D.viewport(r),Y.updateMatrices(te,xe),i=Y.getFrustum(),M(A,R,Y.camera,te,this.type)}Y.isPointLightShadow!==!0&&this.type===Pn&&_(Y,R),Y.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(q,b,S)};function _(w,A){const R=e.update(v);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new wi(s.x,s.y)),u.uniforms.shadow_pass.value=w.map.texture,u.uniforms.resolution.value=w.mapSize,u.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(A,null,R,u,v,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(A,null,R,f,v,null)}function y(w,A,R,q){let b=null;const S=R.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(S!==void 0)b=S;else if(b=R.isPointLight===!0?c:o,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const D=b.uuid,I=A.uuid;let O=l[D];O===void 0&&(O={},l[D]=O);let $=O[I];$===void 0&&($=b.clone(),O[I]=$,A.addEventListener("dispose",C)),b=$}if(b.visible=A.visible,b.wireframe=A.wireframe,q===Pn?b.side=A.shadowSide!==null?A.shadowSide:A.side:b.side=A.shadowSide!==null?A.shadowSide:d[A.side],b.alphaMap=A.alphaMap,b.alphaTest=A.alphaTest,b.map=A.map,b.clipShadows=A.clipShadows,b.clippingPlanes=A.clippingPlanes,b.clipIntersection=A.clipIntersection,b.displacementMap=A.displacementMap,b.displacementScale=A.displacementScale,b.displacementBias=A.displacementBias,b.wireframeLinewidth=A.wireframeLinewidth,b.linewidth=A.linewidth,R.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const D=n.properties.get(b);D.light=R}return b}function M(w,A,R,q,b){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&b===Pn)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,w.matrixWorld);const I=e.update(w),O=w.material;if(Array.isArray(O)){const $=I.groups;for(let B=0,te=$.length;B<te;B++){const Y=$[B],ce=O[Y.materialIndex];if(ce&&ce.visible){const fe=y(w,ce,q,b);w.onBeforeShadow(n,w,A,R,I,fe,Y),n.renderBufferDirect(R,null,I,fe,w,Y),w.onAfterShadow(n,w,A,R,I,fe,Y)}}}else if(O.visible){const $=y(w,O,q,b);w.onBeforeShadow(n,w,A,R,I,$,null),n.renderBufferDirect(R,null,I,$,w,null),w.onAfterShadow(n,w,A,R,I,$,null)}}const D=w.children;for(let I=0,O=D.length;I<O;I++)M(D[I],A,R,q,b)}function C(w){w.target.removeEventListener("dispose",C);for(const R in l){const q=l[R],b=w.target.uuid;b in q&&(q[b].dispose(),delete q[b])}}}const y0={[Sr]:Er,[Tr]:Cr,[wr]:Rr,[Qi]:Ar,[Er]:Sr,[Cr]:Tr,[Rr]:wr,[Ar]:Qi};function M0(n){function e(){let U=!1;const ge=new ft;let K=null;const ee=new ft(0,0,0,0);return{setMask:function(pe){K!==pe&&!U&&(n.colorMask(pe,pe,pe,pe),K=pe)},setLocked:function(pe){U=pe},setClear:function(pe,ve,Ze,_t,Gt){Gt===!0&&(pe*=_t,ve*=_t,Ze*=_t),ge.set(pe,ve,Ze,_t),ee.equals(ge)===!1&&(n.clearColor(pe,ve,Ze,_t),ee.copy(ge))},reset:function(){U=!1,K=null,ee.set(-1,0,0,0)}}}function t(){let U=!1,ge=!1,K=null,ee=null,pe=null;return{setReversed:function(ve){ge=ve},setTest:function(ve){ve?_e(n.DEPTH_TEST):z(n.DEPTH_TEST)},setMask:function(ve){K!==ve&&!U&&(n.depthMask(ve),K=ve)},setFunc:function(ve){if(ge&&(ve=y0[ve]),ee!==ve){switch(ve){case Sr:n.depthFunc(n.NEVER);break;case Er:n.depthFunc(n.ALWAYS);break;case Tr:n.depthFunc(n.LESS);break;case Qi:n.depthFunc(n.LEQUAL);break;case wr:n.depthFunc(n.EQUAL);break;case Ar:n.depthFunc(n.GEQUAL);break;case Cr:n.depthFunc(n.GREATER);break;case Rr:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ee=ve}},setLocked:function(ve){U=ve},setClear:function(ve){pe!==ve&&(n.clearDepth(ve),pe=ve)},reset:function(){U=!1,K=null,ee=null,pe=null}}}function i(){let U=!1,ge=null,K=null,ee=null,pe=null,ve=null,Ze=null,_t=null,Gt=null;return{setTest:function(Je){U||(Je?_e(n.STENCIL_TEST):z(n.STENCIL_TEST))},setMask:function(Je){ge!==Je&&!U&&(n.stencilMask(Je),ge=Je)},setFunc:function(Je,Vt,En){(K!==Je||ee!==Vt||pe!==En)&&(n.stencilFunc(Je,Vt,En),K=Je,ee=Vt,pe=En)},setOp:function(Je,Vt,En){(ve!==Je||Ze!==Vt||_t!==En)&&(n.stencilOp(Je,Vt,En),ve=Je,Ze=Vt,_t=En)},setLocked:function(Je){U=Je},setClear:function(Je){Gt!==Je&&(n.clearStencil(Je),Gt=Je)},reset:function(){U=!1,ge=null,K=null,ee=null,pe=null,ve=null,Ze=null,_t=null,Gt=null}}}const s=new e,a=new t,r=new i,o=new WeakMap,c=new WeakMap;let l={},h={},d=new WeakMap,u=[],f=null,g=!1,v=null,m=null,p=null,_=null,y=null,M=null,C=null,w=new ze(0,0,0),A=0,R=!1,q=null,b=null,S=null,D=null,I=null;const O=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,B=0;const te=n.getParameter(n.VERSION);te.indexOf("WebGL")!==-1?(B=parseFloat(/^WebGL (\d)/.exec(te)[1]),$=B>=1):te.indexOf("OpenGL ES")!==-1&&(B=parseFloat(/^OpenGL ES (\d)/.exec(te)[1]),$=B>=2);let Y=null,ce={};const fe=n.getParameter(n.SCISSOR_BOX),xe=n.getParameter(n.VIEWPORT),We=new ft().fromArray(fe),qe=new ft().fromArray(xe);function Z(U,ge,K,ee){const pe=new Uint8Array(4),ve=n.createTexture();n.bindTexture(U,ve),n.texParameteri(U,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(U,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ze=0;Ze<K;Ze++)U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY?n.texImage3D(ge,0,n.RGBA,1,1,ee,0,n.RGBA,n.UNSIGNED_BYTE,pe):n.texImage2D(ge+Ze,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,pe);return ve}const ne={};ne[n.TEXTURE_2D]=Z(n.TEXTURE_2D,n.TEXTURE_2D,1),ne[n.TEXTURE_CUBE_MAP]=Z(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ne[n.TEXTURE_2D_ARRAY]=Z(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ne[n.TEXTURE_3D]=Z(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),r.setClear(0),_e(n.DEPTH_TEST),a.setFunc(Qi),ke(!1),je(Xo),_e(n.CULL_FACE),P(ei);function _e(U){l[U]!==!0&&(n.enable(U),l[U]=!0)}function z(U){l[U]!==!1&&(n.disable(U),l[U]=!1)}function Q(U,ge){return h[U]!==ge?(n.bindFramebuffer(U,ge),h[U]=ge,U===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=ge),U===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=ge),!0):!1}function re(U,ge){let K=u,ee=!1;if(U){K=d.get(ge),K===void 0&&(K=[],d.set(ge,K));const pe=U.textures;if(K.length!==pe.length||K[0]!==n.COLOR_ATTACHMENT0){for(let ve=0,Ze=pe.length;ve<Ze;ve++)K[ve]=n.COLOR_ATTACHMENT0+ve;K.length=pe.length,ee=!0}}else K[0]!==n.BACK&&(K[0]=n.BACK,ee=!0);ee&&n.drawBuffers(K)}function Ae(U){return f!==U?(n.useProgram(U),f=U,!0):!1}const Le={[gi]:n.FUNC_ADD,[Sh]:n.FUNC_SUBTRACT,[Eh]:n.FUNC_REVERSE_SUBTRACT};Le[Th]=n.MIN,Le[wh]=n.MAX;const Pe={[Ah]:n.ZERO,[Ch]:n.ONE,[Rh]:n.SRC_COLOR,[yr]:n.SRC_ALPHA,[Nh]:n.SRC_ALPHA_SATURATE,[Ih]:n.DST_COLOR,[Lh]:n.DST_ALPHA,[Ph]:n.ONE_MINUS_SRC_COLOR,[Mr]:n.ONE_MINUS_SRC_ALPHA,[Uh]:n.ONE_MINUS_DST_COLOR,[Dh]:n.ONE_MINUS_DST_ALPHA,[Fh]:n.CONSTANT_COLOR,[kh]:n.ONE_MINUS_CONSTANT_COLOR,[Oh]:n.CONSTANT_ALPHA,[Bh]:n.ONE_MINUS_CONSTANT_ALPHA};function P(U,ge,K,ee,pe,ve,Ze,_t,Gt,Je){if(U===ei){g===!0&&(z(n.BLEND),g=!1);return}if(g===!1&&(_e(n.BLEND),g=!0),U!==Mh){if(U!==v||Je!==R){if((m!==gi||y!==gi)&&(n.blendEquation(n.FUNC_ADD),m=gi,y=gi),Je)switch(U){case Mi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case xi:n.blendFunc(n.ONE,n.ONE);break;case Yo:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case jo:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Mi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case xi:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Yo:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case jo:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}p=null,_=null,M=null,C=null,w.set(0,0,0),A=0,v=U,R=Je}return}pe=pe||ge,ve=ve||K,Ze=Ze||ee,(ge!==m||pe!==y)&&(n.blendEquationSeparate(Le[ge],Le[pe]),m=ge,y=pe),(K!==p||ee!==_||ve!==M||Ze!==C)&&(n.blendFuncSeparate(Pe[K],Pe[ee],Pe[ve],Pe[Ze]),p=K,_=ee,M=ve,C=Ze),(_t.equals(w)===!1||Gt!==A)&&(n.blendColor(_t.r,_t.g,_t.b,Gt),w.copy(_t),A=Gt),v=U,R=!1}function yt(U,ge){U.side===Mn?z(n.CULL_FACE):_e(n.CULL_FACE);let K=U.side===$t;ge&&(K=!K),ke(K),U.blending===Mi&&U.transparent===!1?P(ei):P(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),s.setMask(U.colorWrite);const ee=U.stencilWrite;r.setTest(ee),ee&&(r.setMask(U.stencilWriteMask),r.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),r.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),H(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?_e(n.SAMPLE_ALPHA_TO_COVERAGE):z(n.SAMPLE_ALPHA_TO_COVERAGE)}function ke(U){q!==U&&(U?n.frontFace(n.CW):n.frontFace(n.CCW),q=U)}function je(U){U!==bh?(_e(n.CULL_FACE),U!==b&&(U===Xo?n.cullFace(n.BACK):U===yh?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):z(n.CULL_FACE),b=U}function De(U){U!==S&&($&&n.lineWidth(U),S=U)}function H(U,ge,K){U?(_e(n.POLYGON_OFFSET_FILL),(D!==ge||I!==K)&&(n.polygonOffset(ge,K),D=ge,I=K)):z(n.POLYGON_OFFSET_FILL)}function W(U){U?_e(n.SCISSOR_TEST):z(n.SCISSOR_TEST)}function E(U){U===void 0&&(U=n.TEXTURE0+O-1),Y!==U&&(n.activeTexture(U),Y=U)}function x(U,ge,K){K===void 0&&(Y===null?K=n.TEXTURE0+O-1:K=Y);let ee=ce[K];ee===void 0&&(ee={type:void 0,texture:void 0},ce[K]=ee),(ee.type!==U||ee.texture!==ge)&&(Y!==K&&(n.activeTexture(K),Y=K),n.bindTexture(U,ge||ne[U]),ee.type=U,ee.texture=ge)}function L(){const U=ce[Y];U!==void 0&&U.type!==void 0&&(n.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function X(){try{n.compressedTexImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function J(){try{n.compressedTexImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function j(){try{n.texSubImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function le(){try{n.texSubImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ie(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function he(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ye(){try{n.texStorage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function se(){try{n.texStorage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function be(){try{n.texImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ne(){try{n.texImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Fe(U){We.equals(U)===!1&&(n.scissor(U.x,U.y,U.z,U.w),We.copy(U))}function ye(U){qe.equals(U)===!1&&(n.viewport(U.x,U.y,U.z,U.w),qe.copy(U))}function Ke(U,ge){let K=c.get(ge);K===void 0&&(K=new WeakMap,c.set(ge,K));let ee=K.get(U);ee===void 0&&(ee=n.getUniformBlockIndex(ge,U.name),K.set(U,ee))}function Oe(U,ge){const ee=c.get(ge).get(U);o.get(ge)!==ee&&(n.uniformBlockBinding(ge,ee,U.__bindingPointIndex),o.set(ge,ee))}function it(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),l={},Y=null,ce={},h={},d=new WeakMap,u=[],f=null,g=!1,v=null,m=null,p=null,_=null,y=null,M=null,C=null,w=new ze(0,0,0),A=0,R=!1,q=null,b=null,S=null,D=null,I=null,We.set(0,0,n.canvas.width,n.canvas.height),qe.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),r.reset()}return{buffers:{color:s,depth:a,stencil:r},enable:_e,disable:z,bindFramebuffer:Q,drawBuffers:re,useProgram:Ae,setBlending:P,setMaterial:yt,setFlipSided:ke,setCullFace:je,setLineWidth:De,setPolygonOffset:H,setScissorTest:W,activeTexture:E,bindTexture:x,unbindTexture:L,compressedTexImage2D:X,compressedTexImage3D:J,texImage2D:be,texImage3D:Ne,updateUBOMapping:Ke,uniformBlockBinding:Oe,texStorage2D:Ye,texStorage3D:se,texSubImage2D:j,texSubImage3D:le,compressedTexSubImage2D:ie,compressedTexSubImage3D:he,scissor:Fe,viewport:ye,reset:it}}function zl(n,e,t,i){const s=S0(i);switch(t){case Ec:return n*e;case wc:return n*e;case Ac:return n*e*2;case Cc:return n*e/s.components*s.byteLength;case yo:return n*e/s.components*s.byteLength;case Rc:return n*e*2/s.components*s.byteLength;case Mo:return n*e*2/s.components*s.byteLength;case Tc:return n*e*3/s.components*s.byteLength;case bn:return n*e*4/s.components*s.byteLength;case So:return n*e*4/s.components*s.byteLength;case da:case ua:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case fa:case pa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Nr:case kr:return Math.max(n,16)*Math.max(e,8)/4;case Ur:case Fr:return Math.max(n,8)*Math.max(e,8)/2;case Or:case Br:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case zr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Hr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Gr:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Vr:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Wr:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case qr:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case $r:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Xr:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Yr:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case jr:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Kr:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Zr:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Jr:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Qr:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case eo:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case ma:case to:case no:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Pc:case io:return Math.ceil(n/4)*Math.ceil(e/4)*8;case so:case ao:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function S0(n){switch(n){case kn:case yc:return{byteLength:1,components:1};case As:case Mc:case Ps:return{byteLength:2,components:1};case xo:case bo:return{byteLength:2,components:4};case Ti:case _o:case Un:return{byteLength:4,components:1};case Sc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function E0(n,e,t,i,s,a,r){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Xe,h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,x){return f?new OffscreenCanvas(E,x):Sa("canvas")}function v(E,x,L){let X=1;const J=W(E);if((J.width>L||J.height>L)&&(X=L/Math.max(J.width,J.height)),X<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const j=Math.floor(X*J.width),le=Math.floor(X*J.height);d===void 0&&(d=g(j,le));const ie=x?g(j,le):d;return ie.width=j,ie.height=le,ie.getContext("2d").drawImage(E,0,0,j,le),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+j+"x"+le+")."),ie}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),E;return E}function m(E){return E.generateMipmaps&&E.minFilter!==on&&E.minFilter!==vn}function p(E){n.generateMipmap(E)}function _(E,x,L,X,J=!1){if(E!==null){if(n[E]!==void 0)return n[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let j=x;if(x===n.RED&&(L===n.FLOAT&&(j=n.R32F),L===n.HALF_FLOAT&&(j=n.R16F),L===n.UNSIGNED_BYTE&&(j=n.R8)),x===n.RED_INTEGER&&(L===n.UNSIGNED_BYTE&&(j=n.R8UI),L===n.UNSIGNED_SHORT&&(j=n.R16UI),L===n.UNSIGNED_INT&&(j=n.R32UI),L===n.BYTE&&(j=n.R8I),L===n.SHORT&&(j=n.R16I),L===n.INT&&(j=n.R32I)),x===n.RG&&(L===n.FLOAT&&(j=n.RG32F),L===n.HALF_FLOAT&&(j=n.RG16F),L===n.UNSIGNED_BYTE&&(j=n.RG8)),x===n.RG_INTEGER&&(L===n.UNSIGNED_BYTE&&(j=n.RG8UI),L===n.UNSIGNED_SHORT&&(j=n.RG16UI),L===n.UNSIGNED_INT&&(j=n.RG32UI),L===n.BYTE&&(j=n.RG8I),L===n.SHORT&&(j=n.RG16I),L===n.INT&&(j=n.RG32I)),x===n.RGB_INTEGER&&(L===n.UNSIGNED_BYTE&&(j=n.RGB8UI),L===n.UNSIGNED_SHORT&&(j=n.RGB16UI),L===n.UNSIGNED_INT&&(j=n.RGB32UI),L===n.BYTE&&(j=n.RGB8I),L===n.SHORT&&(j=n.RGB16I),L===n.INT&&(j=n.RGB32I)),x===n.RGBA_INTEGER&&(L===n.UNSIGNED_BYTE&&(j=n.RGBA8UI),L===n.UNSIGNED_SHORT&&(j=n.RGBA16UI),L===n.UNSIGNED_INT&&(j=n.RGBA32UI),L===n.BYTE&&(j=n.RGBA8I),L===n.SHORT&&(j=n.RGBA16I),L===n.INT&&(j=n.RGBA32I)),x===n.RGB&&L===n.UNSIGNED_INT_5_9_9_9_REV&&(j=n.RGB9_E5),x===n.RGBA){const le=J?xa:tt.getTransfer(X);L===n.FLOAT&&(j=n.RGBA32F),L===n.HALF_FLOAT&&(j=n.RGBA16F),L===n.UNSIGNED_BYTE&&(j=le===lt?n.SRGB8_ALPHA8:n.RGBA8),L===n.UNSIGNED_SHORT_4_4_4_4&&(j=n.RGBA4),L===n.UNSIGNED_SHORT_5_5_5_1&&(j=n.RGB5_A1)}return(j===n.R16F||j===n.R32F||j===n.RG16F||j===n.RG32F||j===n.RGBA16F||j===n.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function y(E,x){let L;return E?x===null||x===Ti||x===ns?L=n.DEPTH24_STENCIL8:x===Un?L=n.DEPTH32F_STENCIL8:x===As&&(L=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Ti||x===ns?L=n.DEPTH_COMPONENT24:x===Un?L=n.DEPTH_COMPONENT32F:x===As&&(L=n.DEPTH_COMPONENT16),L}function M(E,x){return m(E)===!0||E.isFramebufferTexture&&E.minFilter!==on&&E.minFilter!==vn?Math.log2(Math.max(x.width,x.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?x.mipmaps.length:1}function C(E){const x=E.target;x.removeEventListener("dispose",C),A(x),x.isVideoTexture&&h.delete(x)}function w(E){const x=E.target;x.removeEventListener("dispose",w),q(x)}function A(E){const x=i.get(E);if(x.__webglInit===void 0)return;const L=E.source,X=u.get(L);if(X){const J=X[x.__cacheKey];J.usedTimes--,J.usedTimes===0&&R(E),Object.keys(X).length===0&&u.delete(L)}i.remove(E)}function R(E){const x=i.get(E);n.deleteTexture(x.__webglTexture);const L=E.source,X=u.get(L);delete X[x.__cacheKey],r.memory.textures--}function q(E){const x=i.get(E);if(E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(x.__webglFramebuffer[X]))for(let J=0;J<x.__webglFramebuffer[X].length;J++)n.deleteFramebuffer(x.__webglFramebuffer[X][J]);else n.deleteFramebuffer(x.__webglFramebuffer[X]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[X])}else{if(Array.isArray(x.__webglFramebuffer))for(let X=0;X<x.__webglFramebuffer.length;X++)n.deleteFramebuffer(x.__webglFramebuffer[X]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let X=0;X<x.__webglColorRenderbuffer.length;X++)x.__webglColorRenderbuffer[X]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[X]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const L=E.textures;for(let X=0,J=L.length;X<J;X++){const j=i.get(L[X]);j.__webglTexture&&(n.deleteTexture(j.__webglTexture),r.memory.textures--),i.remove(L[X])}i.remove(E)}let b=0;function S(){b=0}function D(){const E=b;return E>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),b+=1,E}function I(E){const x=[];return x.push(E.wrapS),x.push(E.wrapT),x.push(E.wrapR||0),x.push(E.magFilter),x.push(E.minFilter),x.push(E.anisotropy),x.push(E.internalFormat),x.push(E.format),x.push(E.type),x.push(E.generateMipmaps),x.push(E.premultiplyAlpha),x.push(E.flipY),x.push(E.unpackAlignment),x.push(E.colorSpace),x.join()}function O(E,x){const L=i.get(E);if(E.isVideoTexture&&De(E),E.isRenderTargetTexture===!1&&E.version>0&&L.__version!==E.version){const X=E.image;if(X===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{qe(L,E,x);return}}t.bindTexture(n.TEXTURE_2D,L.__webglTexture,n.TEXTURE0+x)}function $(E,x){const L=i.get(E);if(E.version>0&&L.__version!==E.version){qe(L,E,x);return}t.bindTexture(n.TEXTURE_2D_ARRAY,L.__webglTexture,n.TEXTURE0+x)}function B(E,x){const L=i.get(E);if(E.version>0&&L.__version!==E.version){qe(L,E,x);return}t.bindTexture(n.TEXTURE_3D,L.__webglTexture,n.TEXTURE0+x)}function te(E,x){const L=i.get(E);if(E.version>0&&L.__version!==E.version){Z(L,E,x);return}t.bindTexture(n.TEXTURE_CUBE_MAP,L.__webglTexture,n.TEXTURE0+x)}const Y={[Dr]:n.REPEAT,[bi]:n.CLAMP_TO_EDGE,[Ir]:n.MIRRORED_REPEAT},ce={[on]:n.NEAREST,[Yh]:n.NEAREST_MIPMAP_NEAREST,[ks]:n.NEAREST_MIPMAP_LINEAR,[vn]:n.LINEAR,[ka]:n.LINEAR_MIPMAP_NEAREST,[yi]:n.LINEAR_MIPMAP_LINEAR},fe={[Jh]:n.NEVER,[sd]:n.ALWAYS,[Qh]:n.LESS,[Dc]:n.LEQUAL,[ed]:n.EQUAL,[id]:n.GEQUAL,[td]:n.GREATER,[nd]:n.NOTEQUAL};function xe(E,x){if(x.type===Un&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===vn||x.magFilter===ka||x.magFilter===ks||x.magFilter===yi||x.minFilter===vn||x.minFilter===ka||x.minFilter===ks||x.minFilter===yi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(E,n.TEXTURE_WRAP_S,Y[x.wrapS]),n.texParameteri(E,n.TEXTURE_WRAP_T,Y[x.wrapT]),(E===n.TEXTURE_3D||E===n.TEXTURE_2D_ARRAY)&&n.texParameteri(E,n.TEXTURE_WRAP_R,Y[x.wrapR]),n.texParameteri(E,n.TEXTURE_MAG_FILTER,ce[x.magFilter]),n.texParameteri(E,n.TEXTURE_MIN_FILTER,ce[x.minFilter]),x.compareFunction&&(n.texParameteri(E,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(E,n.TEXTURE_COMPARE_FUNC,fe[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===on||x.minFilter!==ks&&x.minFilter!==yi||x.type===Un&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const L=e.get("EXT_texture_filter_anisotropic");n.texParameterf(E,L.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function We(E,x){let L=!1;E.__webglInit===void 0&&(E.__webglInit=!0,x.addEventListener("dispose",C));const X=x.source;let J=u.get(X);J===void 0&&(J={},u.set(X,J));const j=I(x);if(j!==E.__cacheKey){J[j]===void 0&&(J[j]={texture:n.createTexture(),usedTimes:0},r.memory.textures++,L=!0),J[j].usedTimes++;const le=J[E.__cacheKey];le!==void 0&&(J[E.__cacheKey].usedTimes--,le.usedTimes===0&&R(x)),E.__cacheKey=j,E.__webglTexture=J[j].texture}return L}function qe(E,x,L){let X=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(X=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(X=n.TEXTURE_3D);const J=We(E,x),j=x.source;t.bindTexture(X,E.__webglTexture,n.TEXTURE0+L);const le=i.get(j);if(j.version!==le.__version||J===!0){t.activeTexture(n.TEXTURE0+L);const ie=tt.getPrimaries(tt.workingColorSpace),he=x.colorSpace===Jn?null:tt.getPrimaries(x.colorSpace),Ye=x.colorSpace===Jn||ie===he?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ye);let se=v(x.image,!1,s.maxTextureSize);se=H(x,se);const be=a.convert(x.format,x.colorSpace),Ne=a.convert(x.type);let Fe=_(x.internalFormat,be,Ne,x.colorSpace,x.isVideoTexture);xe(X,x);let ye;const Ke=x.mipmaps,Oe=x.isVideoTexture!==!0,it=le.__version===void 0||J===!0,U=j.dataReady,ge=M(x,se);if(x.isDepthTexture)Fe=y(x.format===is,x.type),it&&(Oe?t.texStorage2D(n.TEXTURE_2D,1,Fe,se.width,se.height):t.texImage2D(n.TEXTURE_2D,0,Fe,se.width,se.height,0,be,Ne,null));else if(x.isDataTexture)if(Ke.length>0){Oe&&it&&t.texStorage2D(n.TEXTURE_2D,ge,Fe,Ke[0].width,Ke[0].height);for(let K=0,ee=Ke.length;K<ee;K++)ye=Ke[K],Oe?U&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,ye.width,ye.height,be,Ne,ye.data):t.texImage2D(n.TEXTURE_2D,K,Fe,ye.width,ye.height,0,be,Ne,ye.data);x.generateMipmaps=!1}else Oe?(it&&t.texStorage2D(n.TEXTURE_2D,ge,Fe,se.width,se.height),U&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,se.width,se.height,be,Ne,se.data)):t.texImage2D(n.TEXTURE_2D,0,Fe,se.width,se.height,0,be,Ne,se.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Oe&&it&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ge,Fe,Ke[0].width,Ke[0].height,se.depth);for(let K=0,ee=Ke.length;K<ee;K++)if(ye=Ke[K],x.format!==bn)if(be!==null)if(Oe){if(U)if(x.layerUpdates.size>0){const pe=zl(ye.width,ye.height,x.format,x.type);for(const ve of x.layerUpdates){const Ze=ye.data.subarray(ve*pe/ye.data.BYTES_PER_ELEMENT,(ve+1)*pe/ye.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,ve,ye.width,ye.height,1,be,Ze,0,0)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,0,ye.width,ye.height,se.depth,be,ye.data,0,0)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,K,Fe,ye.width,ye.height,se.depth,0,ye.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Oe?U&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,0,ye.width,ye.height,se.depth,be,Ne,ye.data):t.texImage3D(n.TEXTURE_2D_ARRAY,K,Fe,ye.width,ye.height,se.depth,0,be,Ne,ye.data)}else{Oe&&it&&t.texStorage2D(n.TEXTURE_2D,ge,Fe,Ke[0].width,Ke[0].height);for(let K=0,ee=Ke.length;K<ee;K++)ye=Ke[K],x.format!==bn?be!==null?Oe?U&&t.compressedTexSubImage2D(n.TEXTURE_2D,K,0,0,ye.width,ye.height,be,ye.data):t.compressedTexImage2D(n.TEXTURE_2D,K,Fe,ye.width,ye.height,0,ye.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Oe?U&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,ye.width,ye.height,be,Ne,ye.data):t.texImage2D(n.TEXTURE_2D,K,Fe,ye.width,ye.height,0,be,Ne,ye.data)}else if(x.isDataArrayTexture)if(Oe){if(it&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ge,Fe,se.width,se.height,se.depth),U)if(x.layerUpdates.size>0){const K=zl(se.width,se.height,x.format,x.type);for(const ee of x.layerUpdates){const pe=se.data.subarray(ee*K/se.data.BYTES_PER_ELEMENT,(ee+1)*K/se.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ee,se.width,se.height,1,be,Ne,pe)}x.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,be,Ne,se.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Fe,se.width,se.height,se.depth,0,be,Ne,se.data);else if(x.isData3DTexture)Oe?(it&&t.texStorage3D(n.TEXTURE_3D,ge,Fe,se.width,se.height,se.depth),U&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,be,Ne,se.data)):t.texImage3D(n.TEXTURE_3D,0,Fe,se.width,se.height,se.depth,0,be,Ne,se.data);else if(x.isFramebufferTexture){if(it)if(Oe)t.texStorage2D(n.TEXTURE_2D,ge,Fe,se.width,se.height);else{let K=se.width,ee=se.height;for(let pe=0;pe<ge;pe++)t.texImage2D(n.TEXTURE_2D,pe,Fe,K,ee,0,be,Ne,null),K>>=1,ee>>=1}}else if(Ke.length>0){if(Oe&&it){const K=W(Ke[0]);t.texStorage2D(n.TEXTURE_2D,ge,Fe,K.width,K.height)}for(let K=0,ee=Ke.length;K<ee;K++)ye=Ke[K],Oe?U&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,be,Ne,ye):t.texImage2D(n.TEXTURE_2D,K,Fe,be,Ne,ye);x.generateMipmaps=!1}else if(Oe){if(it){const K=W(se);t.texStorage2D(n.TEXTURE_2D,ge,Fe,K.width,K.height)}U&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,be,Ne,se)}else t.texImage2D(n.TEXTURE_2D,0,Fe,be,Ne,se);m(x)&&p(X),le.__version=j.version,x.onUpdate&&x.onUpdate(x)}E.__version=x.version}function Z(E,x,L){if(x.image.length!==6)return;const X=We(E,x),J=x.source;t.bindTexture(n.TEXTURE_CUBE_MAP,E.__webglTexture,n.TEXTURE0+L);const j=i.get(J);if(J.version!==j.__version||X===!0){t.activeTexture(n.TEXTURE0+L);const le=tt.getPrimaries(tt.workingColorSpace),ie=x.colorSpace===Jn?null:tt.getPrimaries(x.colorSpace),he=x.colorSpace===Jn||le===ie?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);const Ye=x.isCompressedTexture||x.image[0].isCompressedTexture,se=x.image[0]&&x.image[0].isDataTexture,be=[];for(let ee=0;ee<6;ee++)!Ye&&!se?be[ee]=v(x.image[ee],!0,s.maxCubemapSize):be[ee]=se?x.image[ee].image:x.image[ee],be[ee]=H(x,be[ee]);const Ne=be[0],Fe=a.convert(x.format,x.colorSpace),ye=a.convert(x.type),Ke=_(x.internalFormat,Fe,ye,x.colorSpace),Oe=x.isVideoTexture!==!0,it=j.__version===void 0||X===!0,U=J.dataReady;let ge=M(x,Ne);xe(n.TEXTURE_CUBE_MAP,x);let K;if(Ye){Oe&&it&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ge,Ke,Ne.width,Ne.height);for(let ee=0;ee<6;ee++){K=be[ee].mipmaps;for(let pe=0;pe<K.length;pe++){const ve=K[pe];x.format!==bn?Fe!==null?Oe?U&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,pe,0,0,ve.width,ve.height,Fe,ve.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,pe,Ke,ve.width,ve.height,0,ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Oe?U&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,pe,0,0,ve.width,ve.height,Fe,ye,ve.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,pe,Ke,ve.width,ve.height,0,Fe,ye,ve.data)}}}else{if(K=x.mipmaps,Oe&&it){K.length>0&&ge++;const ee=W(be[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ge,Ke,ee.width,ee.height)}for(let ee=0;ee<6;ee++)if(se){Oe?U&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,be[ee].width,be[ee].height,Fe,ye,be[ee].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,Ke,be[ee].width,be[ee].height,0,Fe,ye,be[ee].data);for(let pe=0;pe<K.length;pe++){const Ze=K[pe].image[ee].image;Oe?U&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,pe+1,0,0,Ze.width,Ze.height,Fe,ye,Ze.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,pe+1,Ke,Ze.width,Ze.height,0,Fe,ye,Ze.data)}}else{Oe?U&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,Fe,ye,be[ee]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,Ke,Fe,ye,be[ee]);for(let pe=0;pe<K.length;pe++){const ve=K[pe];Oe?U&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,pe+1,0,0,Fe,ye,ve.image[ee]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,pe+1,Ke,Fe,ye,ve.image[ee])}}}m(x)&&p(n.TEXTURE_CUBE_MAP),j.__version=J.version,x.onUpdate&&x.onUpdate(x)}E.__version=x.version}function ne(E,x,L,X,J,j){const le=a.convert(L.format,L.colorSpace),ie=a.convert(L.type),he=_(L.internalFormat,le,ie,L.colorSpace);if(!i.get(x).__hasExternalTextures){const se=Math.max(1,x.width>>j),be=Math.max(1,x.height>>j);J===n.TEXTURE_3D||J===n.TEXTURE_2D_ARRAY?t.texImage3D(J,j,he,se,be,x.depth,0,le,ie,null):t.texImage2D(J,j,he,se,be,0,le,ie,null)}t.bindFramebuffer(n.FRAMEBUFFER,E),je(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,X,J,i.get(L).__webglTexture,0,ke(x)):(J===n.TEXTURE_2D||J>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,X,J,i.get(L).__webglTexture,j),t.bindFramebuffer(n.FRAMEBUFFER,null)}function _e(E,x,L){if(n.bindRenderbuffer(n.RENDERBUFFER,E),x.depthBuffer){const X=x.depthTexture,J=X&&X.isDepthTexture?X.type:null,j=y(x.stencilBuffer,J),le=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ie=ke(x);je(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ie,j,x.width,x.height):L?n.renderbufferStorageMultisample(n.RENDERBUFFER,ie,j,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,j,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,le,n.RENDERBUFFER,E)}else{const X=x.textures;for(let J=0;J<X.length;J++){const j=X[J],le=a.convert(j.format,j.colorSpace),ie=a.convert(j.type),he=_(j.internalFormat,le,ie,j.colorSpace),Ye=ke(x);L&&je(x)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ye,he,x.width,x.height):je(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ye,he,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,he,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function z(E,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,E),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(x.depthTexture).__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),O(x.depthTexture,0);const X=i.get(x.depthTexture).__webglTexture,J=ke(x);if(x.depthTexture.format===Ki)je(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,X,0,J):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,X,0);else if(x.depthTexture.format===is)je(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,X,0,J):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,X,0);else throw new Error("Unknown depthTexture format")}function Q(E){const x=i.get(E),L=E.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==E.depthTexture){const X=E.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),X){const J=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,X.removeEventListener("dispose",J)};X.addEventListener("dispose",J),x.__depthDisposeCallback=J}x.__boundDepthTexture=X}if(E.depthTexture&&!x.__autoAllocateDepthBuffer){if(L)throw new Error("target.depthTexture not supported in Cube render targets");z(x.__webglFramebuffer,E)}else if(L){x.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[X]),x.__webglDepthbuffer[X]===void 0)x.__webglDepthbuffer[X]=n.createRenderbuffer(),_e(x.__webglDepthbuffer[X],E,!1);else{const J=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,j=x.__webglDepthbuffer[X];n.bindRenderbuffer(n.RENDERBUFFER,j),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,j)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),_e(x.__webglDepthbuffer,E,!1);else{const X=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,J=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,J),n.framebufferRenderbuffer(n.FRAMEBUFFER,X,n.RENDERBUFFER,J)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function re(E,x,L){const X=i.get(E);x!==void 0&&ne(X.__webglFramebuffer,E,E.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),L!==void 0&&Q(E)}function Ae(E){const x=E.texture,L=i.get(E),X=i.get(x);E.addEventListener("dispose",w);const J=E.textures,j=E.isWebGLCubeRenderTarget===!0,le=J.length>1;if(le||(X.__webglTexture===void 0&&(X.__webglTexture=n.createTexture()),X.__version=x.version,r.memory.textures++),j){L.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(x.mipmaps&&x.mipmaps.length>0){L.__webglFramebuffer[ie]=[];for(let he=0;he<x.mipmaps.length;he++)L.__webglFramebuffer[ie][he]=n.createFramebuffer()}else L.__webglFramebuffer[ie]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){L.__webglFramebuffer=[];for(let ie=0;ie<x.mipmaps.length;ie++)L.__webglFramebuffer[ie]=n.createFramebuffer()}else L.__webglFramebuffer=n.createFramebuffer();if(le)for(let ie=0,he=J.length;ie<he;ie++){const Ye=i.get(J[ie]);Ye.__webglTexture===void 0&&(Ye.__webglTexture=n.createTexture(),r.memory.textures++)}if(E.samples>0&&je(E)===!1){L.__webglMultisampledFramebuffer=n.createFramebuffer(),L.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,L.__webglMultisampledFramebuffer);for(let ie=0;ie<J.length;ie++){const he=J[ie];L.__webglColorRenderbuffer[ie]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,L.__webglColorRenderbuffer[ie]);const Ye=a.convert(he.format,he.colorSpace),se=a.convert(he.type),be=_(he.internalFormat,Ye,se,he.colorSpace,E.isXRRenderTarget===!0),Ne=ke(E);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ne,be,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ie,n.RENDERBUFFER,L.__webglColorRenderbuffer[ie])}n.bindRenderbuffer(n.RENDERBUFFER,null),E.depthBuffer&&(L.__webglDepthRenderbuffer=n.createRenderbuffer(),_e(L.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(j){t.bindTexture(n.TEXTURE_CUBE_MAP,X.__webglTexture),xe(n.TEXTURE_CUBE_MAP,x);for(let ie=0;ie<6;ie++)if(x.mipmaps&&x.mipmaps.length>0)for(let he=0;he<x.mipmaps.length;he++)ne(L.__webglFramebuffer[ie][he],E,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,he);else ne(L.__webglFramebuffer[ie],E,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);m(x)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(le){for(let ie=0,he=J.length;ie<he;ie++){const Ye=J[ie],se=i.get(Ye);t.bindTexture(n.TEXTURE_2D,se.__webglTexture),xe(n.TEXTURE_2D,Ye),ne(L.__webglFramebuffer,E,Ye,n.COLOR_ATTACHMENT0+ie,n.TEXTURE_2D,0),m(Ye)&&p(n.TEXTURE_2D)}t.unbindTexture()}else{let ie=n.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(ie=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ie,X.__webglTexture),xe(ie,x),x.mipmaps&&x.mipmaps.length>0)for(let he=0;he<x.mipmaps.length;he++)ne(L.__webglFramebuffer[he],E,x,n.COLOR_ATTACHMENT0,ie,he);else ne(L.__webglFramebuffer,E,x,n.COLOR_ATTACHMENT0,ie,0);m(x)&&p(ie),t.unbindTexture()}E.depthBuffer&&Q(E)}function Le(E){const x=E.textures;for(let L=0,X=x.length;L<X;L++){const J=x[L];if(m(J)){const j=E.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,le=i.get(J).__webglTexture;t.bindTexture(j,le),p(j),t.unbindTexture()}}}const Pe=[],P=[];function yt(E){if(E.samples>0){if(je(E)===!1){const x=E.textures,L=E.width,X=E.height;let J=n.COLOR_BUFFER_BIT;const j=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=i.get(E),ie=x.length>1;if(ie)for(let he=0;he<x.length;he++)t.bindFramebuffer(n.FRAMEBUFFER,le.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+he,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,le.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+he,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,le.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,le.__webglFramebuffer);for(let he=0;he<x.length;he++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(J|=n.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(J|=n.STENCIL_BUFFER_BIT)),ie){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,le.__webglColorRenderbuffer[he]);const Ye=i.get(x[he]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ye,0)}n.blitFramebuffer(0,0,L,X,0,0,L,X,J,n.NEAREST),c===!0&&(Pe.length=0,P.length=0,Pe.push(n.COLOR_ATTACHMENT0+he),E.depthBuffer&&E.resolveDepthBuffer===!1&&(Pe.push(j),P.push(j),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,P)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Pe))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ie)for(let he=0;he<x.length;he++){t.bindFramebuffer(n.FRAMEBUFFER,le.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+he,n.RENDERBUFFER,le.__webglColorRenderbuffer[he]);const Ye=i.get(x[he]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,le.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+he,n.TEXTURE_2D,Ye,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,le.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&c){const x=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function ke(E){return Math.min(s.maxSamples,E.samples)}function je(E){const x=i.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function De(E){const x=r.render.frame;h.get(E)!==x&&(h.set(E,x),E.update())}function H(E,x){const L=E.colorSpace,X=E.format,J=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||L!==ri&&L!==Jn&&(tt.getTransfer(L)===lt?(X!==bn||J!==kn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",L)),x}function W(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(l.width=E.naturalWidth||E.width,l.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(l.width=E.displayWidth,l.height=E.displayHeight):(l.width=E.width,l.height=E.height),l}this.allocateTextureUnit=D,this.resetTextureUnits=S,this.setTexture2D=O,this.setTexture2DArray=$,this.setTexture3D=B,this.setTextureCube=te,this.rebindTextures=re,this.setupRenderTarget=Ae,this.updateRenderTargetMipmap=Le,this.updateMultisampleRenderTarget=yt,this.setupDepthRenderbuffer=Q,this.setupFrameBufferTexture=ne,this.useMultisampledRTT=je}function T0(n,e){function t(i,s=Jn){let a;const r=tt.getTransfer(s);if(i===kn)return n.UNSIGNED_BYTE;if(i===xo)return n.UNSIGNED_SHORT_4_4_4_4;if(i===bo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Sc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===yc)return n.BYTE;if(i===Mc)return n.SHORT;if(i===As)return n.UNSIGNED_SHORT;if(i===_o)return n.INT;if(i===Ti)return n.UNSIGNED_INT;if(i===Un)return n.FLOAT;if(i===Ps)return n.HALF_FLOAT;if(i===Ec)return n.ALPHA;if(i===Tc)return n.RGB;if(i===bn)return n.RGBA;if(i===wc)return n.LUMINANCE;if(i===Ac)return n.LUMINANCE_ALPHA;if(i===Ki)return n.DEPTH_COMPONENT;if(i===is)return n.DEPTH_STENCIL;if(i===Cc)return n.RED;if(i===yo)return n.RED_INTEGER;if(i===Rc)return n.RG;if(i===Mo)return n.RG_INTEGER;if(i===So)return n.RGBA_INTEGER;if(i===da||i===ua||i===fa||i===pa)if(r===lt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===da)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ua)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===fa)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===pa)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===da)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ua)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===fa)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===pa)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ur||i===Nr||i===Fr||i===kr)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===Ur)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Nr)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Fr)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===kr)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Or||i===Br||i===zr)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(i===Or||i===Br)return r===lt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===zr)return r===lt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Hr||i===Gr||i===Vr||i===Wr||i===qr||i===$r||i===Xr||i===Yr||i===jr||i===Kr||i===Zr||i===Jr||i===Qr||i===eo)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(i===Hr)return r===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Gr)return r===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Vr)return r===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Wr)return r===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===qr)return r===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===$r)return r===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Xr)return r===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Yr)return r===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===jr)return r===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Kr)return r===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Zr)return r===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Jr)return r===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Qr)return r===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===eo)return r===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ma||i===to||i===no)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(i===ma)return r===lt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===to)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===no)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Pc||i===io||i===so||i===ao)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(i===ma)return a.COMPRESSED_RED_RGTC1_EXT;if(i===io)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===so)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ao)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ns?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}class w0 extends gn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class ln extends Mt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const A0={type:"move"};class dr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ln,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ln,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ln,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,a=null,r=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){r=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,i),p=this._getHandJoint(l,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;l.inputState.pinching&&u>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,i),a!==null&&(c.matrix.fromArray(a.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,a.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(a.linearVelocity)):c.hasLinearVelocity=!1,a.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(a.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&a!==null&&(s=a),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(A0)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=a!==null),l!==null&&(l.visible=r!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new ln;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const C0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,R0=`
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

}`;class P0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const s=new Ht,a=e.properties.get(s);a.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new ai({vertexShader:C0,fragmentShader:R0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Re(new sn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class L0 extends rs{constructor(e,t){super();const i=this;let s=null,a=1,r=null,o="local-floor",c=1,l=null,h=null,d=null,u=null,f=null,g=null;const v=new P0,m=t.getContextAttributes();let p=null,_=null;const y=[],M=[],C=new Xe;let w=null;const A=new gn;A.layers.enable(1),A.viewport=new ft;const R=new gn;R.layers.enable(2),R.viewport=new ft;const q=[A,R],b=new w0;b.layers.enable(1),b.layers.enable(2);let S=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let ne=y[Z];return ne===void 0&&(ne=new dr,y[Z]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(Z){let ne=y[Z];return ne===void 0&&(ne=new dr,y[Z]=ne),ne.getGripSpace()},this.getHand=function(Z){let ne=y[Z];return ne===void 0&&(ne=new dr,y[Z]=ne),ne.getHandSpace()};function I(Z){const ne=M.indexOf(Z.inputSource);if(ne===-1)return;const _e=y[ne];_e!==void 0&&(_e.update(Z.inputSource,Z.frame,l||r),_e.dispatchEvent({type:Z.type,data:Z.inputSource}))}function O(){s.removeEventListener("select",I),s.removeEventListener("selectstart",I),s.removeEventListener("selectend",I),s.removeEventListener("squeeze",I),s.removeEventListener("squeezestart",I),s.removeEventListener("squeezeend",I),s.removeEventListener("end",O),s.removeEventListener("inputsourceschange",$);for(let Z=0;Z<y.length;Z++){const ne=M[Z];ne!==null&&(M[Z]=null,y[Z].disconnect(ne))}S=null,D=null,v.reset(),e.setRenderTarget(p),f=null,u=null,d=null,s=null,_=null,qe.stop(),i.isPresenting=!1,e.setPixelRatio(w),e.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){a=Z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||r},this.setReferenceSpace=function(Z){l=Z},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(p=e.getRenderTarget(),s.addEventListener("select",I),s.addEventListener("selectstart",I),s.addEventListener("selectend",I),s.addEventListener("squeeze",I),s.addEventListener("squeezestart",I),s.addEventListener("squeezeend",I),s.addEventListener("end",O),s.addEventListener("inputsourceschange",$),m.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(C),s.renderState.layers===void 0){const ne={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:a};f=new XRWebGLLayer(s,t,ne),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new wi(f.framebufferWidth,f.framebufferHeight,{format:bn,type:kn,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let ne=null,_e=null,z=null;m.depth&&(z=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ne=m.stencil?is:Ki,_e=m.stencil?ns:Ti);const Q={colorFormat:t.RGBA8,depthFormat:z,scaleFactor:a};d=new XRWebGLBinding(s,t),u=d.createProjectionLayer(Q),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),_=new wi(u.textureWidth,u.textureHeight,{format:bn,type:kn,depthTexture:new Vc(u.textureWidth,u.textureHeight,_e,void 0,void 0,void 0,void 0,void 0,void 0,ne),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,r=await s.requestReferenceSpace(o),qe.setContext(s),qe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function $(Z){for(let ne=0;ne<Z.removed.length;ne++){const _e=Z.removed[ne],z=M.indexOf(_e);z>=0&&(M[z]=null,y[z].disconnect(_e))}for(let ne=0;ne<Z.added.length;ne++){const _e=Z.added[ne];let z=M.indexOf(_e);if(z===-1){for(let re=0;re<y.length;re++)if(re>=M.length){M.push(_e),z=re;break}else if(M[re]===null){M[re]=_e,z=re;break}if(z===-1)break}const Q=y[z];Q&&Q.connect(_e)}}const B=new k,te=new k;function Y(Z,ne,_e){B.setFromMatrixPosition(ne.matrixWorld),te.setFromMatrixPosition(_e.matrixWorld);const z=B.distanceTo(te),Q=ne.projectionMatrix.elements,re=_e.projectionMatrix.elements,Ae=Q[14]/(Q[10]-1),Le=Q[14]/(Q[10]+1),Pe=(Q[9]+1)/Q[5],P=(Q[9]-1)/Q[5],yt=(Q[8]-1)/Q[0],ke=(re[8]+1)/re[0],je=Ae*yt,De=Ae*ke,H=z/(-yt+ke),W=H*-yt;if(ne.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(W),Z.translateZ(H),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Q[10]===-1)Z.projectionMatrix.copy(ne.projectionMatrix),Z.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{const E=Ae+H,x=Le+H,L=je-W,X=De+(z-W),J=Pe*Le/x*E,j=P*Le/x*E;Z.projectionMatrix.makePerspective(L,X,J,j,E,x),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function ce(Z,ne){ne===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(ne.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let ne=Z.near,_e=Z.far;v.texture!==null&&(v.depthNear>0&&(ne=v.depthNear),v.depthFar>0&&(_e=v.depthFar)),b.near=R.near=A.near=ne,b.far=R.far=A.far=_e,(S!==b.near||D!==b.far)&&(s.updateRenderState({depthNear:b.near,depthFar:b.far}),S=b.near,D=b.far);const z=Z.parent,Q=b.cameras;ce(b,z);for(let re=0;re<Q.length;re++)ce(Q[re],z);Q.length===2?Y(b,A,R):b.projectionMatrix.copy(A.projectionMatrix),fe(Z,b,z)};function fe(Z,ne,_e){_e===null?Z.matrix.copy(ne.matrixWorld):(Z.matrix.copy(_e.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(ne.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(ne.projectionMatrix),Z.projectionMatrixInverse.copy(ne.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Cs*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function(Z){c=Z,u!==null&&(u.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(b)};let xe=null;function We(Z,ne){if(h=ne.getViewerPose(l||r),g=ne,h!==null){const _e=h.views;f!==null&&(e.setRenderTargetFramebuffer(_,f.framebuffer),e.setRenderTarget(_));let z=!1;_e.length!==b.cameras.length&&(b.cameras.length=0,z=!0);for(let re=0;re<_e.length;re++){const Ae=_e[re];let Le=null;if(f!==null)Le=f.getViewport(Ae);else{const P=d.getViewSubImage(u,Ae);Le=P.viewport,re===0&&(e.setRenderTargetTextures(_,P.colorTexture,u.ignoreDepthValues?void 0:P.depthStencilTexture),e.setRenderTarget(_))}let Pe=q[re];Pe===void 0&&(Pe=new gn,Pe.layers.enable(re),Pe.viewport=new ft,q[re]=Pe),Pe.matrix.fromArray(Ae.transform.matrix),Pe.matrix.decompose(Pe.position,Pe.quaternion,Pe.scale),Pe.projectionMatrix.fromArray(Ae.projectionMatrix),Pe.projectionMatrixInverse.copy(Pe.projectionMatrix).invert(),Pe.viewport.set(Le.x,Le.y,Le.width,Le.height),re===0&&(b.matrix.copy(Pe.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),z===!0&&b.cameras.push(Pe)}const Q=s.enabledFeatures;if(Q&&Q.includes("depth-sensing")){const re=d.getDepthInformation(_e[0]);re&&re.isValid&&re.texture&&v.init(e,re,s.renderState)}}for(let _e=0;_e<y.length;_e++){const z=M[_e],Q=y[_e];z!==null&&Q!==void 0&&Q.update(z,ne,l||r)}xe&&xe(Z,ne),ne.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ne}),g=null}const qe=new Gc;qe.setAnimationLoop(We),this.setAnimationLoop=function(Z){xe=Z},this.dispose=function(){}}}const pi=new Sn,D0=new ct;function I0(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Bc(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,_,y,M){p.isMeshBasicMaterial||p.isMeshLambertMaterial?a(m,p):p.isMeshToonMaterial?(a(m,p),d(m,p)):p.isMeshPhongMaterial?(a(m,p),h(m,p)):p.isMeshStandardMaterial?(a(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,M)):p.isMeshMatcapMaterial?(a(m,p),g(m,p)):p.isMeshDepthMaterial?a(m,p):p.isMeshDistanceMaterial?(a(m,p),v(m,p)):p.isMeshNormalMaterial?a(m,p):p.isLineBasicMaterial?(r(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,_,y):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function a(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===$t&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===$t&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const _=e.get(p),y=_.envMap,M=_.envMapRotation;y&&(m.envMap.value=y,pi.copy(M),pi.x*=-1,pi.y*=-1,pi.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(pi.y*=-1,pi.z*=-1),m.envMapRotation.value.setFromMatrix4(D0.makeRotationFromEuler(pi)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function r(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,_,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*_,m.scale.value=y*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,_){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===$t&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const _=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function U0(n,e,t,i){let s={},a={},r=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(_,y){const M=y.program;i.uniformBlockBinding(_,M)}function l(_,y){let M=s[_.id];M===void 0&&(g(_),M=h(_),s[_.id]=M,_.addEventListener("dispose",m));const C=y.program;i.updateUBOMapping(_,C);const w=e.render.frame;a[_.id]!==w&&(u(_),a[_.id]=w)}function h(_){const y=d();_.__bindingPointIndex=y;const M=n.createBuffer(),C=_.__size,w=_.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,C,w),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,y,M),M}function d(){for(let _=0;_<o;_++)if(r.indexOf(_)===-1)return r.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(_){const y=s[_.id],M=_.uniforms,C=_.__cache;n.bindBuffer(n.UNIFORM_BUFFER,y);for(let w=0,A=M.length;w<A;w++){const R=Array.isArray(M[w])?M[w]:[M[w]];for(let q=0,b=R.length;q<b;q++){const S=R[q];if(f(S,w,q,C)===!0){const D=S.__offset,I=Array.isArray(S.value)?S.value:[S.value];let O=0;for(let $=0;$<I.length;$++){const B=I[$],te=v(B);typeof B=="number"||typeof B=="boolean"?(S.__data[0]=B,n.bufferSubData(n.UNIFORM_BUFFER,D+O,S.__data)):B.isMatrix3?(S.__data[0]=B.elements[0],S.__data[1]=B.elements[1],S.__data[2]=B.elements[2],S.__data[3]=0,S.__data[4]=B.elements[3],S.__data[5]=B.elements[4],S.__data[6]=B.elements[5],S.__data[7]=0,S.__data[8]=B.elements[6],S.__data[9]=B.elements[7],S.__data[10]=B.elements[8],S.__data[11]=0):(B.toArray(S.__data,O),O+=te.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,D,S.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(_,y,M,C){const w=_.value,A=y+"_"+M;if(C[A]===void 0)return typeof w=="number"||typeof w=="boolean"?C[A]=w:C[A]=w.clone(),!0;{const R=C[A];if(typeof w=="number"||typeof w=="boolean"){if(R!==w)return C[A]=w,!0}else if(R.equals(w)===!1)return R.copy(w),!0}return!1}function g(_){const y=_.uniforms;let M=0;const C=16;for(let A=0,R=y.length;A<R;A++){const q=Array.isArray(y[A])?y[A]:[y[A]];for(let b=0,S=q.length;b<S;b++){const D=q[b],I=Array.isArray(D.value)?D.value:[D.value];for(let O=0,$=I.length;O<$;O++){const B=I[O],te=v(B),Y=M%C,ce=Y%te.boundary,fe=Y+ce;M+=ce,fe!==0&&C-fe<te.storage&&(M+=C-fe),D.__data=new Float32Array(te.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=M,M+=te.storage}}}const w=M%C;return w>0&&(M+=C-w),_.__size=M,_.__cache={},this}function v(_){const y={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(y.boundary=4,y.storage=4):_.isVector2?(y.boundary=8,y.storage=8):_.isVector3||_.isColor?(y.boundary=16,y.storage=12):_.isVector4?(y.boundary=16,y.storage=16):_.isMatrix3?(y.boundary=48,y.storage=48):_.isMatrix4?(y.boundary=64,y.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),y}function m(_){const y=_.target;y.removeEventListener("dispose",m);const M=r.indexOf(y.__bindingPointIndex);r.splice(M,1),n.deleteBuffer(s[y.id]),delete s[y.id],delete a[y.id]}function p(){for(const _ in s)n.deleteBuffer(s[_]);r=[],s={},a={}}return{bind:c,update:l,dispose:p}}class N0{constructor(e={}){const{canvas:t=yd(),context:i=null,depth:s=!0,stencil:a=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let u;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");u=i.getContextAttributes().alpha}else u=r;const f=new Uint32Array(4),g=new Int32Array(4);let v=null,m=null;const p=[],_=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=qt,this.toneMapping=ti,this.toneMappingExposure=1;const y=this;let M=!1,C=0,w=0,A=null,R=-1,q=null;const b=new ft,S=new ft;let D=null;const I=new ze(0);let O=0,$=t.width,B=t.height,te=1,Y=null,ce=null;const fe=new ft(0,0,$,B),xe=new ft(0,0,$,B);let We=!1;const qe=new Ao;let Z=!1,ne=!1;const _e=new ct,z=new ct,Q=new k,re=new ft,Ae={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Le=!1;function Pe(){return A===null?te:1}let P=i;function yt(T,N){return t.getContext(T,N)}try{const T={alpha:!0,depth:s,stencil:a,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${vo}`),t.addEventListener("webglcontextlost",ee,!1),t.addEventListener("webglcontextrestored",pe,!1),t.addEventListener("webglcontextcreationerror",ve,!1),P===null){const N="webgl2";if(P=yt(N,T),P===null)throw yt(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let ke,je,De,H,W,E,x,L,X,J,j,le,ie,he,Ye,se,be,Ne,Fe,ye,Ke,Oe,it,U;function ge(){ke=new zp(P),ke.init(),Oe=new T0(P,ke),je=new Up(P,ke,e,Oe),De=new M0(P),je.reverseDepthBuffer&&De.buffers.depth.setReversed(!0),H=new Vp(P),W=new o0,E=new E0(P,ke,De,W,je,Oe,H),x=new Fp(y),L=new Bp(y),X=new jd(P),it=new Dp(P,X),J=new Hp(P,X,H,it),j=new qp(P,J,X,H),Fe=new Wp(P,je,E),se=new Np(W),le=new r0(y,x,L,ke,je,it,se),ie=new I0(y,W),he=new c0,Ye=new m0(ke),Ne=new Lp(y,x,L,De,j,u,c),be=new b0(y,j,je),U=new U0(P,H,je,De),ye=new Ip(P,ke,H),Ke=new Gp(P,ke,H),H.programs=le.programs,y.capabilities=je,y.extensions=ke,y.properties=W,y.renderLists=he,y.shadowMap=be,y.state=De,y.info=H}ge();const K=new L0(y,P);this.xr=K,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const T=ke.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=ke.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return te},this.setPixelRatio=function(T){T!==void 0&&(te=T,this.setSize($,B,!1))},this.getSize=function(T){return T.set($,B)},this.setSize=function(T,N,G=!0){if(K.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}$=T,B=N,t.width=Math.floor(T*te),t.height=Math.floor(N*te),G===!0&&(t.style.width=T+"px",t.style.height=N+"px"),this.setViewport(0,0,T,N)},this.getDrawingBufferSize=function(T){return T.set($*te,B*te).floor()},this.setDrawingBufferSize=function(T,N,G){$=T,B=N,te=G,t.width=Math.floor(T*G),t.height=Math.floor(N*G),this.setViewport(0,0,T,N)},this.getCurrentViewport=function(T){return T.copy(b)},this.getViewport=function(T){return T.copy(fe)},this.setViewport=function(T,N,G,V){T.isVector4?fe.set(T.x,T.y,T.z,T.w):fe.set(T,N,G,V),De.viewport(b.copy(fe).multiplyScalar(te).round())},this.getScissor=function(T){return T.copy(xe)},this.setScissor=function(T,N,G,V){T.isVector4?xe.set(T.x,T.y,T.z,T.w):xe.set(T,N,G,V),De.scissor(S.copy(xe).multiplyScalar(te).round())},this.getScissorTest=function(){return We},this.setScissorTest=function(T){De.setScissorTest(We=T)},this.setOpaqueSort=function(T){Y=T},this.setTransparentSort=function(T){ce=T},this.getClearColor=function(T){return T.copy(Ne.getClearColor())},this.setClearColor=function(){Ne.setClearColor.apply(Ne,arguments)},this.getClearAlpha=function(){return Ne.getClearAlpha()},this.setClearAlpha=function(){Ne.setClearAlpha.apply(Ne,arguments)},this.clear=function(T=!0,N=!0,G=!0){let V=0;if(T){let F=!1;if(A!==null){const ae=A.texture.format;F=ae===So||ae===Mo||ae===yo}if(F){const ae=A.texture.type,me=ae===kn||ae===Ti||ae===As||ae===ns||ae===xo||ae===bo,Me=Ne.getClearColor(),Se=Ne.getClearAlpha(),Ie=Me.r,Ue=Me.g,Ee=Me.b;me?(f[0]=Ie,f[1]=Ue,f[2]=Ee,f[3]=Se,P.clearBufferuiv(P.COLOR,0,f)):(g[0]=Ie,g[1]=Ue,g[2]=Ee,g[3]=Se,P.clearBufferiv(P.COLOR,0,g))}else V|=P.COLOR_BUFFER_BIT}N&&(V|=P.DEPTH_BUFFER_BIT,P.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),G&&(V|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ee,!1),t.removeEventListener("webglcontextrestored",pe,!1),t.removeEventListener("webglcontextcreationerror",ve,!1),he.dispose(),Ye.dispose(),W.dispose(),x.dispose(),L.dispose(),j.dispose(),it.dispose(),U.dispose(),le.dispose(),K.dispose(),K.removeEventListener("sessionstart",Bo),K.removeEventListener("sessionend",zo),li.stop()};function ee(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function pe(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const T=H.autoReset,N=be.enabled,G=be.autoUpdate,V=be.needsUpdate,F=be.type;ge(),H.autoReset=T,be.enabled=N,be.autoUpdate=G,be.needsUpdate=V,be.type=F}function ve(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Ze(T){const N=T.target;N.removeEventListener("dispose",Ze),_t(N)}function _t(T){Gt(T),W.remove(T)}function Gt(T){const N=W.get(T).programs;N!==void 0&&(N.forEach(function(G){le.releaseProgram(G)}),T.isShaderMaterial&&le.releaseShaderCache(T))}this.renderBufferDirect=function(T,N,G,V,F,ae){N===null&&(N=Ae);const me=F.isMesh&&F.matrixWorld.determinant()<0,Me=gh(T,N,G,V,F);De.setMaterial(V,me);let Se=G.index,Ie=1;if(V.wireframe===!0){if(Se=J.getWireframeAttribute(G),Se===void 0)return;Ie=2}const Ue=G.drawRange,Ee=G.attributes.position;let nt=Ue.start*Ie,rt=(Ue.start+Ue.count)*Ie;ae!==null&&(nt=Math.max(nt,ae.start*Ie),rt=Math.min(rt,(ae.start+ae.count)*Ie)),Se!==null?(nt=Math.max(nt,0),rt=Math.min(rt,Se.count)):Ee!=null&&(nt=Math.max(nt,0),rt=Math.min(rt,Ee.count));const ut=rt-nt;if(ut<0||ut===1/0)return;it.setup(F,V,Me,G,Se);let Xt,Qe=ye;if(Se!==null&&(Xt=X.get(Se),Qe=Ke,Qe.setIndex(Xt)),F.isMesh)V.wireframe===!0?(De.setLineWidth(V.wireframeLinewidth*Pe()),Qe.setMode(P.LINES)):Qe.setMode(P.TRIANGLES);else if(F.isLine){let Te=V.linewidth;Te===void 0&&(Te=1),De.setLineWidth(Te*Pe()),F.isLineSegments?Qe.setMode(P.LINES):F.isLineLoop?Qe.setMode(P.LINE_LOOP):Qe.setMode(P.LINE_STRIP)}else F.isPoints?Qe.setMode(P.POINTS):F.isSprite&&Qe.setMode(P.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)Qe.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(ke.get("WEBGL_multi_draw"))Qe.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Te=F._multiDrawStarts,At=F._multiDrawCounts,et=F._multiDrawCount,cn=Se?X.get(Se).bytesPerElement:1,Ri=W.get(V).currentProgram.getUniforms();for(let Yt=0;Yt<et;Yt++)Ri.setValue(P,"_gl_DrawID",Yt),Qe.render(Te[Yt]/cn,At[Yt])}else if(F.isInstancedMesh)Qe.renderInstances(nt,ut,F.count);else if(G.isInstancedBufferGeometry){const Te=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,At=Math.min(G.instanceCount,Te);Qe.renderInstances(nt,ut,At)}else Qe.render(nt,ut)};function Je(T,N,G){T.transparent===!0&&T.side===Mn&&T.forceSinglePass===!1?(T.side=$t,T.needsUpdate=!0,Fs(T,N,G),T.side=si,T.needsUpdate=!0,Fs(T,N,G),T.side=Mn):Fs(T,N,G)}this.compile=function(T,N,G=null){G===null&&(G=T),m=Ye.get(G),m.init(N),_.push(m),G.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(m.pushLight(F),F.castShadow&&m.pushShadow(F))}),T!==G&&T.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(m.pushLight(F),F.castShadow&&m.pushShadow(F))}),m.setupLights();const V=new Set;return T.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const ae=F.material;if(ae)if(Array.isArray(ae))for(let me=0;me<ae.length;me++){const Me=ae[me];Je(Me,G,F),V.add(Me)}else Je(ae,G,F),V.add(ae)}),_.pop(),m=null,V},this.compileAsync=function(T,N,G=null){const V=this.compile(T,N,G);return new Promise(F=>{function ae(){if(V.forEach(function(me){W.get(me).currentProgram.isReady()&&V.delete(me)}),V.size===0){F(T);return}setTimeout(ae,10)}ke.get("KHR_parallel_shader_compile")!==null?ae():setTimeout(ae,10)})};let Vt=null;function En(T){Vt&&Vt(T)}function Bo(){li.stop()}function zo(){li.start()}const li=new Gc;li.setAnimationLoop(En),typeof self<"u"&&li.setContext(self),this.setAnimationLoop=function(T){Vt=T,K.setAnimationLoop(T),T===null?li.stop():li.start()},K.addEventListener("sessionstart",Bo),K.addEventListener("sessionend",zo),this.render=function(T,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),K.enabled===!0&&K.isPresenting===!0&&(K.cameraAutoUpdate===!0&&K.updateCamera(N),N=K.getCamera()),T.isScene===!0&&T.onBeforeRender(y,T,N,A),m=Ye.get(T,_.length),m.init(N),_.push(m),z.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),qe.setFromProjectionMatrix(z),ne=this.localClippingEnabled,Z=se.init(this.clippingPlanes,ne),v=he.get(T,p.length),v.init(),p.push(v),K.enabled===!0&&K.isPresenting===!0){const ae=y.xr.getDepthSensingMesh();ae!==null&&Ia(ae,N,-1/0,y.sortObjects)}Ia(T,N,0,y.sortObjects),v.finish(),y.sortObjects===!0&&v.sort(Y,ce),Le=K.enabled===!1||K.isPresenting===!1||K.hasDepthSensing()===!1,Le&&Ne.addToRenderList(v,T),this.info.render.frame++,Z===!0&&se.beginShadows();const G=m.state.shadowsArray;be.render(G,T,N),Z===!0&&se.endShadows(),this.info.autoReset===!0&&this.info.reset();const V=v.opaque,F=v.transmissive;if(m.setupLights(),N.isArrayCamera){const ae=N.cameras;if(F.length>0)for(let me=0,Me=ae.length;me<Me;me++){const Se=ae[me];Go(V,F,T,Se)}Le&&Ne.render(T);for(let me=0,Me=ae.length;me<Me;me++){const Se=ae[me];Ho(v,T,Se,Se.viewport)}}else F.length>0&&Go(V,F,T,N),Le&&Ne.render(T),Ho(v,T,N);A!==null&&(E.updateMultisampleRenderTarget(A),E.updateRenderTargetMipmap(A)),T.isScene===!0&&T.onAfterRender(y,T,N),it.resetDefaultState(),R=-1,q=null,_.pop(),_.length>0?(m=_[_.length-1],Z===!0&&se.setGlobalState(y.clippingPlanes,m.state.camera)):m=null,p.pop(),p.length>0?v=p[p.length-1]:v=null};function Ia(T,N,G,V){if(T.visible===!1)return;if(T.layers.test(N.layers)){if(T.isGroup)G=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(N);else if(T.isLight)m.pushLight(T),T.castShadow&&m.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||qe.intersectsSprite(T)){V&&re.setFromMatrixPosition(T.matrixWorld).applyMatrix4(z);const me=j.update(T),Me=T.material;Me.visible&&v.push(T,me,Me,G,re.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||qe.intersectsObject(T))){const me=j.update(T),Me=T.material;if(V&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),re.copy(T.boundingSphere.center)):(me.boundingSphere===null&&me.computeBoundingSphere(),re.copy(me.boundingSphere.center)),re.applyMatrix4(T.matrixWorld).applyMatrix4(z)),Array.isArray(Me)){const Se=me.groups;for(let Ie=0,Ue=Se.length;Ie<Ue;Ie++){const Ee=Se[Ie],nt=Me[Ee.materialIndex];nt&&nt.visible&&v.push(T,me,nt,G,re.z,Ee)}}else Me.visible&&v.push(T,me,Me,G,re.z,null)}}const ae=T.children;for(let me=0,Me=ae.length;me<Me;me++)Ia(ae[me],N,G,V)}function Ho(T,N,G,V){const F=T.opaque,ae=T.transmissive,me=T.transparent;m.setupLightsView(G),Z===!0&&se.setGlobalState(y.clippingPlanes,G),V&&De.viewport(b.copy(V)),F.length>0&&Ns(F,N,G),ae.length>0&&Ns(ae,N,G),me.length>0&&Ns(me,N,G),De.buffers.depth.setTest(!0),De.buffers.depth.setMask(!0),De.buffers.color.setMask(!0),De.setPolygonOffset(!1)}function Go(T,N,G,V){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[V.id]===void 0&&(m.state.transmissionRenderTarget[V.id]=new wi(1,1,{generateMipmaps:!0,type:ke.has("EXT_color_buffer_half_float")||ke.has("EXT_color_buffer_float")?Ps:kn,minFilter:yi,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:tt.workingColorSpace}));const ae=m.state.transmissionRenderTarget[V.id],me=V.viewport||b;ae.setSize(me.z,me.w);const Me=y.getRenderTarget();y.setRenderTarget(ae),y.getClearColor(I),O=y.getClearAlpha(),O<1&&y.setClearColor(16777215,.5),y.clear(),Le&&Ne.render(G);const Se=y.toneMapping;y.toneMapping=ti;const Ie=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),m.setupLightsView(V),Z===!0&&se.setGlobalState(y.clippingPlanes,V),Ns(T,G,V),E.updateMultisampleRenderTarget(ae),E.updateRenderTargetMipmap(ae),ke.has("WEBGL_multisampled_render_to_texture")===!1){let Ue=!1;for(let Ee=0,nt=N.length;Ee<nt;Ee++){const rt=N[Ee],ut=rt.object,Xt=rt.geometry,Qe=rt.material,Te=rt.group;if(Qe.side===Mn&&ut.layers.test(V.layers)){const At=Qe.side;Qe.side=$t,Qe.needsUpdate=!0,Vo(ut,G,V,Xt,Qe,Te),Qe.side=At,Qe.needsUpdate=!0,Ue=!0}}Ue===!0&&(E.updateMultisampleRenderTarget(ae),E.updateRenderTargetMipmap(ae))}y.setRenderTarget(Me),y.setClearColor(I,O),Ie!==void 0&&(V.viewport=Ie),y.toneMapping=Se}function Ns(T,N,G){const V=N.isScene===!0?N.overrideMaterial:null;for(let F=0,ae=T.length;F<ae;F++){const me=T[F],Me=me.object,Se=me.geometry,Ie=V===null?me.material:V,Ue=me.group;Me.layers.test(G.layers)&&Vo(Me,N,G,Se,Ie,Ue)}}function Vo(T,N,G,V,F,ae){T.onBeforeRender(y,N,G,V,F,ae),T.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),F.onBeforeRender(y,N,G,V,T,ae),F.transparent===!0&&F.side===Mn&&F.forceSinglePass===!1?(F.side=$t,F.needsUpdate=!0,y.renderBufferDirect(G,N,V,F,T,ae),F.side=si,F.needsUpdate=!0,y.renderBufferDirect(G,N,V,F,T,ae),F.side=Mn):y.renderBufferDirect(G,N,V,F,T,ae),T.onAfterRender(y,N,G,V,F,ae)}function Fs(T,N,G){N.isScene!==!0&&(N=Ae);const V=W.get(T),F=m.state.lights,ae=m.state.shadowsArray,me=F.state.version,Me=le.getParameters(T,F.state,ae,N,G),Se=le.getProgramCacheKey(Me);let Ie=V.programs;V.environment=T.isMeshStandardMaterial?N.environment:null,V.fog=N.fog,V.envMap=(T.isMeshStandardMaterial?L:x).get(T.envMap||V.environment),V.envMapRotation=V.environment!==null&&T.envMap===null?N.environmentRotation:T.envMapRotation,Ie===void 0&&(T.addEventListener("dispose",Ze),Ie=new Map,V.programs=Ie);let Ue=Ie.get(Se);if(Ue!==void 0){if(V.currentProgram===Ue&&V.lightsStateVersion===me)return qo(T,Me),Ue}else Me.uniforms=le.getUniforms(T),T.onBeforeCompile(Me,y),Ue=le.acquireProgram(Me,Se),Ie.set(Se,Ue),V.uniforms=Me.uniforms;const Ee=V.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ee.clippingPlanes=se.uniform),qo(T,Me),V.needsLights=_h(T),V.lightsStateVersion=me,V.needsLights&&(Ee.ambientLightColor.value=F.state.ambient,Ee.lightProbe.value=F.state.probe,Ee.directionalLights.value=F.state.directional,Ee.directionalLightShadows.value=F.state.directionalShadow,Ee.spotLights.value=F.state.spot,Ee.spotLightShadows.value=F.state.spotShadow,Ee.rectAreaLights.value=F.state.rectArea,Ee.ltc_1.value=F.state.rectAreaLTC1,Ee.ltc_2.value=F.state.rectAreaLTC2,Ee.pointLights.value=F.state.point,Ee.pointLightShadows.value=F.state.pointShadow,Ee.hemisphereLights.value=F.state.hemi,Ee.directionalShadowMap.value=F.state.directionalShadowMap,Ee.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Ee.spotShadowMap.value=F.state.spotShadowMap,Ee.spotLightMatrix.value=F.state.spotLightMatrix,Ee.spotLightMap.value=F.state.spotLightMap,Ee.pointShadowMap.value=F.state.pointShadowMap,Ee.pointShadowMatrix.value=F.state.pointShadowMatrix),V.currentProgram=Ue,V.uniformsList=null,Ue}function Wo(T){if(T.uniformsList===null){const N=T.currentProgram.getUniforms();T.uniformsList=va.seqWithValue(N.seq,T.uniforms)}return T.uniformsList}function qo(T,N){const G=W.get(T);G.outputColorSpace=N.outputColorSpace,G.batching=N.batching,G.batchingColor=N.batchingColor,G.instancing=N.instancing,G.instancingColor=N.instancingColor,G.instancingMorph=N.instancingMorph,G.skinning=N.skinning,G.morphTargets=N.morphTargets,G.morphNormals=N.morphNormals,G.morphColors=N.morphColors,G.morphTargetsCount=N.morphTargetsCount,G.numClippingPlanes=N.numClippingPlanes,G.numIntersection=N.numClipIntersection,G.vertexAlphas=N.vertexAlphas,G.vertexTangents=N.vertexTangents,G.toneMapping=N.toneMapping}function gh(T,N,G,V,F){N.isScene!==!0&&(N=Ae),E.resetTextureUnits();const ae=N.fog,me=V.isMeshStandardMaterial?N.environment:null,Me=A===null?y.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:ri,Se=(V.isMeshStandardMaterial?L:x).get(V.envMap||me),Ie=V.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Ue=!!G.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Ee=!!G.morphAttributes.position,nt=!!G.morphAttributes.normal,rt=!!G.morphAttributes.color;let ut=ti;V.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(ut=y.toneMapping);const Xt=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Qe=Xt!==void 0?Xt.length:0,Te=W.get(V),At=m.state.lights;if(Z===!0&&(ne===!0||T!==q)){const Jt=T===q&&V.id===R;se.setState(V,T,Jt)}let et=!1;V.version===Te.__version?(Te.needsLights&&Te.lightsStateVersion!==At.state.version||Te.outputColorSpace!==Me||F.isBatchedMesh&&Te.batching===!1||!F.isBatchedMesh&&Te.batching===!0||F.isBatchedMesh&&Te.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Te.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Te.instancing===!1||!F.isInstancedMesh&&Te.instancing===!0||F.isSkinnedMesh&&Te.skinning===!1||!F.isSkinnedMesh&&Te.skinning===!0||F.isInstancedMesh&&Te.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Te.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Te.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Te.instancingMorph===!1&&F.morphTexture!==null||Te.envMap!==Se||V.fog===!0&&Te.fog!==ae||Te.numClippingPlanes!==void 0&&(Te.numClippingPlanes!==se.numPlanes||Te.numIntersection!==se.numIntersection)||Te.vertexAlphas!==Ie||Te.vertexTangents!==Ue||Te.morphTargets!==Ee||Te.morphNormals!==nt||Te.morphColors!==rt||Te.toneMapping!==ut||Te.morphTargetsCount!==Qe)&&(et=!0):(et=!0,Te.__version=V.version);let cn=Te.currentProgram;et===!0&&(cn=Fs(V,N,F));let Ri=!1,Yt=!1,Ua=!1;const pt=cn.getUniforms(),zn=Te.uniforms;if(De.useProgram(cn.program)&&(Ri=!0,Yt=!0,Ua=!0),V.id!==R&&(R=V.id,Yt=!0),Ri||q!==T){je.reverseDepthBuffer?(_e.copy(T.projectionMatrix),Sd(_e),Ed(_e),pt.setValue(P,"projectionMatrix",_e)):pt.setValue(P,"projectionMatrix",T.projectionMatrix),pt.setValue(P,"viewMatrix",T.matrixWorldInverse);const Jt=pt.map.cameraPosition;Jt!==void 0&&Jt.setValue(P,Q.setFromMatrixPosition(T.matrixWorld)),je.logarithmicDepthBuffer&&pt.setValue(P,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&pt.setValue(P,"isOrthographic",T.isOrthographicCamera===!0),q!==T&&(q=T,Yt=!0,Ua=!0)}if(F.isSkinnedMesh){pt.setOptional(P,F,"bindMatrix"),pt.setOptional(P,F,"bindMatrixInverse");const Jt=F.skeleton;Jt&&(Jt.boneTexture===null&&Jt.computeBoneTexture(),pt.setValue(P,"boneTexture",Jt.boneTexture,E))}F.isBatchedMesh&&(pt.setOptional(P,F,"batchingTexture"),pt.setValue(P,"batchingTexture",F._matricesTexture,E),pt.setOptional(P,F,"batchingIdTexture"),pt.setValue(P,"batchingIdTexture",F._indirectTexture,E),pt.setOptional(P,F,"batchingColorTexture"),F._colorsTexture!==null&&pt.setValue(P,"batchingColorTexture",F._colorsTexture,E));const Na=G.morphAttributes;if((Na.position!==void 0||Na.normal!==void 0||Na.color!==void 0)&&Fe.update(F,G,cn),(Yt||Te.receiveShadow!==F.receiveShadow)&&(Te.receiveShadow=F.receiveShadow,pt.setValue(P,"receiveShadow",F.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(zn.envMap.value=Se,zn.flipEnvMap.value=Se.isCubeTexture&&Se.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&N.environment!==null&&(zn.envMapIntensity.value=N.environmentIntensity),Yt&&(pt.setValue(P,"toneMappingExposure",y.toneMappingExposure),Te.needsLights&&vh(zn,Ua),ae&&V.fog===!0&&ie.refreshFogUniforms(zn,ae),ie.refreshMaterialUniforms(zn,V,te,B,m.state.transmissionRenderTarget[T.id]),va.upload(P,Wo(Te),zn,E)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(va.upload(P,Wo(Te),zn,E),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&pt.setValue(P,"center",F.center),pt.setValue(P,"modelViewMatrix",F.modelViewMatrix),pt.setValue(P,"normalMatrix",F.normalMatrix),pt.setValue(P,"modelMatrix",F.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const Jt=V.uniformsGroups;for(let Fa=0,xh=Jt.length;Fa<xh;Fa++){const $o=Jt[Fa];U.update($o,cn),U.bind($o,cn)}}return cn}function vh(T,N){T.ambientLightColor.needsUpdate=N,T.lightProbe.needsUpdate=N,T.directionalLights.needsUpdate=N,T.directionalLightShadows.needsUpdate=N,T.pointLights.needsUpdate=N,T.pointLightShadows.needsUpdate=N,T.spotLights.needsUpdate=N,T.spotLightShadows.needsUpdate=N,T.rectAreaLights.needsUpdate=N,T.hemisphereLights.needsUpdate=N}function _h(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(T,N,G){W.get(T.texture).__webglTexture=N,W.get(T.depthTexture).__webglTexture=G;const V=W.get(T);V.__hasExternalTextures=!0,V.__autoAllocateDepthBuffer=G===void 0,V.__autoAllocateDepthBuffer||ke.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,N){const G=W.get(T);G.__webglFramebuffer=N,G.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(T,N=0,G=0){A=T,C=N,w=G;let V=!0,F=null,ae=!1,me=!1;if(T){const Se=W.get(T);if(Se.__useDefaultFramebuffer!==void 0)De.bindFramebuffer(P.FRAMEBUFFER,null),V=!1;else if(Se.__webglFramebuffer===void 0)E.setupRenderTarget(T);else if(Se.__hasExternalTextures)E.rebindTextures(T,W.get(T.texture).__webglTexture,W.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Ee=T.depthTexture;if(Se.__boundDepthTexture!==Ee){if(Ee!==null&&W.has(Ee)&&(T.width!==Ee.image.width||T.height!==Ee.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");E.setupDepthRenderbuffer(T)}}const Ie=T.texture;(Ie.isData3DTexture||Ie.isDataArrayTexture||Ie.isCompressedArrayTexture)&&(me=!0);const Ue=W.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ue[N])?F=Ue[N][G]:F=Ue[N],ae=!0):T.samples>0&&E.useMultisampledRTT(T)===!1?F=W.get(T).__webglMultisampledFramebuffer:Array.isArray(Ue)?F=Ue[G]:F=Ue,b.copy(T.viewport),S.copy(T.scissor),D=T.scissorTest}else b.copy(fe).multiplyScalar(te).floor(),S.copy(xe).multiplyScalar(te).floor(),D=We;if(De.bindFramebuffer(P.FRAMEBUFFER,F)&&V&&De.drawBuffers(T,F),De.viewport(b),De.scissor(S),De.setScissorTest(D),ae){const Se=W.get(T.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+N,Se.__webglTexture,G)}else if(me){const Se=W.get(T.texture),Ie=N||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,Se.__webglTexture,G||0,Ie)}R=-1},this.readRenderTargetPixels=function(T,N,G,V,F,ae,me){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Me=W.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&me!==void 0&&(Me=Me[me]),Me){De.bindFramebuffer(P.FRAMEBUFFER,Me);try{const Se=T.texture,Ie=Se.format,Ue=Se.type;if(!je.textureFormatReadable(Ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!je.textureTypeReadable(Ue)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=T.width-V&&G>=0&&G<=T.height-F&&P.readPixels(N,G,V,F,Oe.convert(Ie),Oe.convert(Ue),ae)}finally{const Se=A!==null?W.get(A).__webglFramebuffer:null;De.bindFramebuffer(P.FRAMEBUFFER,Se)}}},this.readRenderTargetPixelsAsync=async function(T,N,G,V,F,ae,me){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Me=W.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&me!==void 0&&(Me=Me[me]),Me){const Se=T.texture,Ie=Se.format,Ue=Se.type;if(!je.textureFormatReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!je.textureTypeReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=T.width-V&&G>=0&&G<=T.height-F){De.bindFramebuffer(P.FRAMEBUFFER,Me);const Ee=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Ee),P.bufferData(P.PIXEL_PACK_BUFFER,ae.byteLength,P.STREAM_READ),P.readPixels(N,G,V,F,Oe.convert(Ie),Oe.convert(Ue),0);const nt=A!==null?W.get(A).__webglFramebuffer:null;De.bindFramebuffer(P.FRAMEBUFFER,nt);const rt=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Md(P,rt,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Ee),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,ae),P.deleteBuffer(Ee),P.deleteSync(rt),ae}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,N=null,G=0){T.isTexture!==!0&&(ga("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,T=arguments[1]);const V=Math.pow(2,-G),F=Math.floor(T.image.width*V),ae=Math.floor(T.image.height*V),me=N!==null?N.x:0,Me=N!==null?N.y:0;E.setTexture2D(T,0),P.copyTexSubImage2D(P.TEXTURE_2D,G,0,0,me,Me,F,ae),De.unbindTexture()},this.copyTextureToTexture=function(T,N,G=null,V=null,F=0){T.isTexture!==!0&&(ga("WebGLRenderer: copyTextureToTexture function signature has changed."),V=arguments[0]||null,T=arguments[1],N=arguments[2],F=arguments[3]||0,G=null);let ae,me,Me,Se,Ie,Ue;G!==null?(ae=G.max.x-G.min.x,me=G.max.y-G.min.y,Me=G.min.x,Se=G.min.y):(ae=T.image.width,me=T.image.height,Me=0,Se=0),V!==null?(Ie=V.x,Ue=V.y):(Ie=0,Ue=0);const Ee=Oe.convert(N.format),nt=Oe.convert(N.type);E.setTexture2D(N,0),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,N.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,N.unpackAlignment);const rt=P.getParameter(P.UNPACK_ROW_LENGTH),ut=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Xt=P.getParameter(P.UNPACK_SKIP_PIXELS),Qe=P.getParameter(P.UNPACK_SKIP_ROWS),Te=P.getParameter(P.UNPACK_SKIP_IMAGES),At=T.isCompressedTexture?T.mipmaps[F]:T.image;P.pixelStorei(P.UNPACK_ROW_LENGTH,At.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,At.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Me),P.pixelStorei(P.UNPACK_SKIP_ROWS,Se),T.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,F,Ie,Ue,ae,me,Ee,nt,At.data):T.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,F,Ie,Ue,At.width,At.height,Ee,At.data):P.texSubImage2D(P.TEXTURE_2D,F,Ie,Ue,ae,me,Ee,nt,At),P.pixelStorei(P.UNPACK_ROW_LENGTH,rt),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,ut),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Xt),P.pixelStorei(P.UNPACK_SKIP_ROWS,Qe),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Te),F===0&&N.generateMipmaps&&P.generateMipmap(P.TEXTURE_2D),De.unbindTexture()},this.copyTextureToTexture3D=function(T,N,G=null,V=null,F=0){T.isTexture!==!0&&(ga("WebGLRenderer: copyTextureToTexture3D function signature has changed."),G=arguments[0]||null,V=arguments[1]||null,T=arguments[2],N=arguments[3],F=arguments[4]||0);let ae,me,Me,Se,Ie,Ue,Ee,nt,rt;const ut=T.isCompressedTexture?T.mipmaps[F]:T.image;G!==null?(ae=G.max.x-G.min.x,me=G.max.y-G.min.y,Me=G.max.z-G.min.z,Se=G.min.x,Ie=G.min.y,Ue=G.min.z):(ae=ut.width,me=ut.height,Me=ut.depth,Se=0,Ie=0,Ue=0),V!==null?(Ee=V.x,nt=V.y,rt=V.z):(Ee=0,nt=0,rt=0);const Xt=Oe.convert(N.format),Qe=Oe.convert(N.type);let Te;if(N.isData3DTexture)E.setTexture3D(N,0),Te=P.TEXTURE_3D;else if(N.isDataArrayTexture||N.isCompressedArrayTexture)E.setTexture2DArray(N,0),Te=P.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,N.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,N.unpackAlignment);const At=P.getParameter(P.UNPACK_ROW_LENGTH),et=P.getParameter(P.UNPACK_IMAGE_HEIGHT),cn=P.getParameter(P.UNPACK_SKIP_PIXELS),Ri=P.getParameter(P.UNPACK_SKIP_ROWS),Yt=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,ut.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,ut.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Se),P.pixelStorei(P.UNPACK_SKIP_ROWS,Ie),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Ue),T.isDataTexture||T.isData3DTexture?P.texSubImage3D(Te,F,Ee,nt,rt,ae,me,Me,Xt,Qe,ut.data):N.isCompressedArrayTexture?P.compressedTexSubImage3D(Te,F,Ee,nt,rt,ae,me,Me,Xt,ut.data):P.texSubImage3D(Te,F,Ee,nt,rt,ae,me,Me,Xt,Qe,ut),P.pixelStorei(P.UNPACK_ROW_LENGTH,At),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,et),P.pixelStorei(P.UNPACK_SKIP_PIXELS,cn),P.pixelStorei(P.UNPACK_SKIP_ROWS,Ri),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Yt),F===0&&N.generateMipmaps&&P.generateMipmap(Te),De.unbindTexture()},this.initRenderTarget=function(T){W.get(T).__webglFramebuffer===void 0&&E.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?E.setTextureCube(T,0):T.isData3DTexture?E.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?E.setTexture2DArray(T,0):E.setTexture2D(T,0),De.unbindTexture()},this.resetState=function(){C=0,w=0,A=null,De.reset(),it.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Nn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Eo?"display-p3":"srgb",t.unpackColorSpace=tt.workingColorSpace===Aa?"display-p3":"srgb"}}class Po{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new ze(e),this.near=t,this.far=i}clone(){return new Po(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class F0 extends Mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Sn,this.environmentIntensity=1,this.environmentRotation=new Sn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Yc extends Ci{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ze(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ea=new k,Ta=new k,Hl=new ct,ps=new Ca,aa=new Is,ur=new k,Gl=new k;class k0 extends Mt{constructor(e=new Ut,t=new Yc){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,a=t.count;s<a;s++)Ea.fromBufferAttribute(t,s-1),Ta.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=Ea.distanceTo(Ta);e.setAttribute("lineDistance",new dt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,a=e.params.Line.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),aa.copy(i.boundingSphere),aa.applyMatrix4(s),aa.radius+=a,e.ray.intersectsSphere(aa)===!1)return;Hl.copy(s).invert(),ps.copy(e.ray).applyMatrix4(Hl);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){const f=Math.max(0,r.start),g=Math.min(h.count,r.start+r.count);for(let v=f,m=g-1;v<m;v+=l){const p=h.getX(v),_=h.getX(v+1),y=ra(this,e,ps,c,p,_);y&&t.push(y)}if(this.isLineLoop){const v=h.getX(g-1),m=h.getX(f),p=ra(this,e,ps,c,v,m);p&&t.push(p)}}else{const f=Math.max(0,r.start),g=Math.min(u.count,r.start+r.count);for(let v=f,m=g-1;v<m;v+=l){const p=ra(this,e,ps,c,v,v+1);p&&t.push(p)}if(this.isLineLoop){const v=ra(this,e,ps,c,g-1,f);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){const o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}}function ra(n,e,t,i,s,a){const r=n.geometry.attributes.position;if(Ea.fromBufferAttribute(r,s),Ta.fromBufferAttribute(r,a),t.distanceSqToSegment(Ea,Ta,ur,Gl)>i)return;ur.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(ur);if(!(c<e.near||c>e.far))return{distance:c,point:Gl.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}class jc extends Ci{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ze(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Vl=new ct,oo=new Ca,oa=new Is,la=new k;class O0 extends Mt{constructor(e=new Ut,t=new jc){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,a=e.params.Points.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),oa.copy(i.boundingSphere),oa.applyMatrix4(s),oa.radius+=a,e.ray.intersectsSphere(oa)===!1)return;Vl.copy(s).invert(),oo.copy(e.ray).applyMatrix4(Vl);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=i.index,d=i.attributes.position;if(l!==null){const u=Math.max(0,r.start),f=Math.min(l.count,r.start+r.count);for(let g=u,v=f;g<v;g++){const m=l.getX(g);la.fromBufferAttribute(d,m),Wl(la,m,c,s,e,t,this)}}else{const u=Math.max(0,r.start),f=Math.min(d.count,r.start+r.count);for(let g=u,v=f;g<v;g++)la.fromBufferAttribute(d,g),Wl(la,g,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){const o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}}function Wl(n,e,t,i,s,a,r){const o=oo.distanceSqToPoint(n);if(o<t){const c=new k;oo.closestPointToPoint(n,c),c.applyMatrix4(i);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;a.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:r})}}class Pa extends Ht{constructor(e,t,i,s,a,r,o,c,l){super(e,t,i,s,a,r,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Dn extends Ut{constructor(e=1,t=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:s},t=Math.max(3,t);const a=[],r=[],o=[],c=[],l=new k,h=new Xe;r.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let d=0,u=3;d<=t;d++,u+=3){const f=i+d/t*s;l.x=e*Math.cos(f),l.y=e*Math.sin(f),r.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(r[u]/e+1)/2,h.y=(r[u+1]/e+1)/2,c.push(h.x,h.y)}for(let d=1;d<=t;d++)a.push(d,d+1,0);this.setIndex(a),this.setAttribute("position",new dt(r,3)),this.setAttribute("normal",new dt(o,3)),this.setAttribute("uv",new dt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Dn(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Fn extends Ut{constructor(e=1,t=1,i=1,s=32,a=1,r=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:a,openEnded:r,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),a=Math.floor(a);const h=[],d=[],u=[],f=[];let g=0;const v=[],m=i/2;let p=0;_(),r===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new dt(d,3)),this.setAttribute("normal",new dt(u,3)),this.setAttribute("uv",new dt(f,2));function _(){const M=new k,C=new k;let w=0;const A=(t-e)/i;for(let R=0;R<=a;R++){const q=[],b=R/a,S=b*(t-e)+e;for(let D=0;D<=s;D++){const I=D/s,O=I*c+o,$=Math.sin(O),B=Math.cos(O);C.x=S*$,C.y=-b*i+m,C.z=S*B,d.push(C.x,C.y,C.z),M.set($,A,B).normalize(),u.push(M.x,M.y,M.z),f.push(I,1-b),q.push(g++)}v.push(q)}for(let R=0;R<s;R++)for(let q=0;q<a;q++){const b=v[q][R],S=v[q+1][R],D=v[q+1][R+1],I=v[q][R+1];e>0&&(h.push(b,S,I),w+=3),t>0&&(h.push(S,D,I),w+=3)}l.addGroup(p,w,0),p+=w}function y(M){const C=g,w=new Xe,A=new k;let R=0;const q=M===!0?e:t,b=M===!0?1:-1;for(let D=1;D<=s;D++)d.push(0,m*b,0),u.push(0,b,0),f.push(.5,.5),g++;const S=g;for(let D=0;D<=s;D++){const O=D/s*c+o,$=Math.cos(O),B=Math.sin(O);A.x=q*B,A.y=m*b,A.z=q*$,d.push(A.x,A.y,A.z),u.push(0,b,0),w.x=$*.5+.5,w.y=B*.5*b+.5,f.push(w.x,w.y),g++}for(let D=0;D<s;D++){const I=C+D,O=S+D;M===!0?h.push(O,O+1,I):h.push(O+1,O,I),R+=3}l.addGroup(p,R,M===!0?1:2),p+=R}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class La extends Ut{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};const a=[],r=[];o(s),l(i),h(),this.setAttribute("position",new dt(a,3)),this.setAttribute("normal",new dt(a.slice(),3)),this.setAttribute("uv",new dt(r,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(_){const y=new k,M=new k,C=new k;for(let w=0;w<t.length;w+=3)f(t[w+0],y),f(t[w+1],M),f(t[w+2],C),c(y,M,C,_)}function c(_,y,M,C){const w=C+1,A=[];for(let R=0;R<=w;R++){A[R]=[];const q=_.clone().lerp(M,R/w),b=y.clone().lerp(M,R/w),S=w-R;for(let D=0;D<=S;D++)D===0&&R===w?A[R][D]=q:A[R][D]=q.clone().lerp(b,D/S)}for(let R=0;R<w;R++)for(let q=0;q<2*(w-R)-1;q++){const b=Math.floor(q/2);q%2===0?(u(A[R][b+1]),u(A[R+1][b]),u(A[R][b])):(u(A[R][b+1]),u(A[R+1][b+1]),u(A[R+1][b]))}}function l(_){const y=new k;for(let M=0;M<a.length;M+=3)y.x=a[M+0],y.y=a[M+1],y.z=a[M+2],y.normalize().multiplyScalar(_),a[M+0]=y.x,a[M+1]=y.y,a[M+2]=y.z}function h(){const _=new k;for(let y=0;y<a.length;y+=3){_.x=a[y+0],_.y=a[y+1],_.z=a[y+2];const M=m(_)/2/Math.PI+.5,C=p(_)/Math.PI+.5;r.push(M,1-C)}g(),d()}function d(){for(let _=0;_<r.length;_+=6){const y=r[_+0],M=r[_+2],C=r[_+4],w=Math.max(y,M,C),A=Math.min(y,M,C);w>.9&&A<.1&&(y<.2&&(r[_+0]+=1),M<.2&&(r[_+2]+=1),C<.2&&(r[_+4]+=1))}}function u(_){a.push(_.x,_.y,_.z)}function f(_,y){const M=_*3;y.x=e[M+0],y.y=e[M+1],y.z=e[M+2]}function g(){const _=new k,y=new k,M=new k,C=new k,w=new Xe,A=new Xe,R=new Xe;for(let q=0,b=0;q<a.length;q+=9,b+=6){_.set(a[q+0],a[q+1],a[q+2]),y.set(a[q+3],a[q+4],a[q+5]),M.set(a[q+6],a[q+7],a[q+8]),w.set(r[b+0],r[b+1]),A.set(r[b+2],r[b+3]),R.set(r[b+4],r[b+5]),C.copy(_).add(y).add(M).divideScalar(3);const S=m(C);v(w,b+0,_,S),v(A,b+2,y,S),v(R,b+4,M,S)}}function v(_,y,M,C){C<0&&_.x===1&&(r[y]=_.x-1),M.x===0&&M.z===0&&(r[y]=C/2/Math.PI+.5)}function m(_){return Math.atan2(_.z,-_.x)}function p(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new La(e.vertices,e.indices,e.radius,e.details)}}class Da extends La{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,s=1/i,a=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-i,0,-s,i,0,s,-i,0,s,i,-s,-i,0,-s,i,0,s,-i,0,s,i,0,-i,0,-s,i,0,-s,-i,0,s,i,0,s],r=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(a,r,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Da(e.radius,e.detail)}}class Lo extends La{constructor(e=1,t=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Lo(e.radius,e.detail)}}class Si extends Ut{constructor(e=1,t=32,i=16,s=0,a=Math.PI*2,r=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:a,thetaStart:r,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(r+o,Math.PI);let l=0;const h=[],d=new k,u=new k,f=[],g=[],v=[],m=[];for(let p=0;p<=i;p++){const _=[],y=p/i;let M=0;p===0&&r===0?M=.5/t:p===i&&c===Math.PI&&(M=-.5/t);for(let C=0;C<=t;C++){const w=C/t;d.x=-e*Math.cos(s+w*a)*Math.sin(r+y*o),d.y=e*Math.cos(r+y*o),d.z=e*Math.sin(s+w*a)*Math.sin(r+y*o),g.push(d.x,d.y,d.z),u.copy(d).normalize(),v.push(u.x,u.y,u.z),m.push(w+M,1-y),_.push(l++)}h.push(_)}for(let p=0;p<i;p++)for(let _=0;_<t;_++){const y=h[p][_+1],M=h[p][_],C=h[p+1][_],w=h[p+1][_+1];(p!==0||r>0)&&f.push(y,M,w),(p!==i-1||c<Math.PI)&&f.push(M,C,w)}this.setIndex(f),this.setAttribute("position",new dt(g,3)),this.setAttribute("normal",new dt(v,3)),this.setAttribute("uv",new dt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Si(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class as extends Ut{constructor(e=1,t=.4,i=12,s=48,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:a},i=Math.floor(i),s=Math.floor(s);const r=[],o=[],c=[],l=[],h=new k,d=new k,u=new k;for(let f=0;f<=i;f++)for(let g=0;g<=s;g++){const v=g/s*a,m=f/i*Math.PI*2;d.x=(e+t*Math.cos(m))*Math.cos(v),d.y=(e+t*Math.cos(m))*Math.sin(v),d.z=t*Math.sin(m),o.push(d.x,d.y,d.z),h.x=e*Math.cos(v),h.y=e*Math.sin(v),u.subVectors(d,h).normalize(),c.push(u.x,u.y,u.z),l.push(g/s),l.push(f/i)}for(let f=1;f<=i;f++)for(let g=1;g<=s;g++){const v=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,_=(s+1)*f+g;r.push(v,m,_),r.push(m,p,_)}this.setIndex(r),this.setAttribute("position",new dt(o,3)),this.setAttribute("normal",new dt(c,3)),this.setAttribute("uv",new dt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new as(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class gt extends Ci{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ze(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Lc,this.normalScale=new Xe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class B0 extends Yc{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}class Do extends Mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ze(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class z0 extends Do{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ze(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const fr=new ct,ql=new k,$l=new k;class H0{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Xe(512,512),this.map=null,this.mapPass=null,this.matrix=new ct,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ao,this._frameExtents=new Xe(1,1),this._viewportCount=1,this._viewports=[new ft(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;ql.setFromMatrixPosition(e.matrixWorld),t.position.copy(ql),$l.setFromMatrixPosition(e.target.matrixWorld),t.lookAt($l),t.updateMatrixWorld(),fr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(fr),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(fr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class G0 extends H0{constructor(){super(new Co(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class V0 extends Do{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.target=new Mt,this.shadow=new G0}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class W0 extends Do{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class q0{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Xl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Xl();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Xl(){return performance.now()}const Yl=new ct;class $0{constructor(e,t,i=0,s=1/0){this.ray=new Ca(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new wo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Yl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Yl),this}intersectObject(e,t=!0,i=[]){return lo(e,this,i,t),i.sort(jl),i}intersectObjects(e,t=!0,i=[]){for(let s=0,a=e.length;s<a;s++)lo(e[s],this,i,t);return i.sort(jl),i}}function jl(n,e){return n.distance-e.distance}function lo(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){const a=n.children;for(let r=0,o=a.length;r<o;r++)lo(a[r],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:vo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=vo);function X0(n){const e=new N0({canvas:n,antialias:!0});return e.setPixelRatio(Math.min(2,devicePixelRatio||1)),e.shadowMap.enabled=!0,e.shadowMap.type=vc,e.toneMapping=xc,e.toneMappingExposure=1.05,e.outputColorSpace=qt,e}function Kc(n){const e=new F0;return e.background=new ze(n),e.fog=new Po(new ze(n),90,200),e.add(new z0(16777215,9075290,.72)),e.add(new W0(7368816,.35)),e}function Zc(n,e,t){const i=new V0(16774104,1.65);i.position.set(e*.5-22,46,t*.5-30),i.castShadow=!0,i.shadow.mapSize.set(2048,2048);const s=i.shadow.camera,a=Math.max(e,t)*.62;return s.left=-a,s.right=a,s.top=a,s.bottom=-a,s.near=1,s.far=160,i.shadow.bias=-4e-4,i.shadow.normalBias=.04,i.shadow.radius=5,i.target.position.set(e*.5,0,t*.5),n.add(i,i.target),i}class Io{constructor(e,t){this.target=new k,this.goalTarget=new k,this.frustum=20,this.az=0,this.pol=.6,this.dist=80,this.bw=e,this.bh=t,this.camera=new Co(-1,1,1,-1,-60,300),this.target.set(e/2,0,t/2),this.goalTarget.copy(this.target),this.place()}place(){const e=Math.sin(this.pol)*this.dist,t=Math.cos(this.pol)*this.dist;this.camera.position.set(this.target.x+e*Math.sin(this.az),this.target.y+t,this.target.z+e*Math.cos(this.az)),this.camera.up.set(0,1,0),this.camera.lookAt(this.target)}resize(e,t){const i=e/t,s=this.frustum;this.camera.left=-s*i,this.camera.right=s*i,this.camera.top=s,this.camera.bottom=-s,this.camera.updateProjectionMatrix()}follow(e,t){const i=Math.min(this.bw*.28,9),s=Math.min(this.bh*.22,11);this.goalTarget.set(Os.clamp(e,i,this.bw-i),0,Os.clamp(t,s,this.bh-s))}setFrustum(e,t,i){this.frustum=Os.clamp(e,9,34),this.resize(t,i)}zoomBy(e,t,i){this.setFrustum(this.frustum*e,t,i)}rotate(e){this.az-=e*.005,this.place()}tilt(e){this.pol=Os.clamp(this.pol-e*.004,.18,1.05),this.place()}update(e){this.target.lerp(this.goalTarget,Math.min(1,e*3.2)),this.place()}}const Y0=26;function fn(n,e,t,i,s,a,r){n.fillStyle=s;for(let o=0;o<i;o++){n.globalAlpha=a*(.4+Math.random()*.6);const c=Math.random()*e,l=Math.random()*t,h=r*(.5+Math.random());n.beginPath(),n.arc(c,l,h,0,7),n.fill()}n.globalAlpha=1}const Kl={dirt(n,e,t){n.fillStyle="#8a6a44",n.fillRect(0,0,e,t),fn(n,e,t,2600,"#6f5334",.5,2.2),fn(n,e,t,1400,"#a07f52",.4,2.4),fn(n,e,t,500,"#4f3a1f",.45,3.4),fn(n,e,t,120,"#3a2810",.35,5.5)},sand(n,e,t){n.fillStyle="#e6c98a",n.fillRect(0,0,e,t),fn(n,e,t,3200,"#d3b273",.4,1.7),fn(n,e,t,900,"#f3ddab",.5,2),n.strokeStyle="rgba(198,168,108,0.22)",n.lineWidth=2;for(let i=0;i<t;i+=24){n.beginPath();for(let s=0;s<e;s+=22)n.lineTo(s,i+Math.sin(s*.02+i*.1)*4);n.stroke()}},sidewalk(n,e,t){n.fillStyle="#b9b3a6",n.fillRect(0,0,e,t),fn(n,e,t,1800,"#a49e90",.35,2.4),fn(n,e,t,700,"#cfc9bc",.35,2.2),n.strokeStyle="rgba(120,114,100,0.5)",n.lineWidth=3;for(let i=0;i<t;i+=Y0*6)n.beginPath(),n.moveTo(0,i),n.lineTo(e,i+(Math.random()-.5)*10),n.stroke();n.strokeStyle="rgba(90,84,72,0.35)",n.lineWidth=1.4;for(let i=0;i<8;i++){n.beginPath();let s=Math.random()*e,a=Math.random()*t;n.moveTo(s,a);for(let r=0;r<4;r++)s+=(Math.random()-.5)*90,a+=(Math.random()-.5)*90,n.lineTo(s,a);n.stroke()}},cardboard(n,e,t){n.fillStyle="#cba875",n.fillRect(0,0,e,t),fn(n,e,t,1200,"#b9915f",.4,2.2),n.strokeStyle="rgba(150,110,70,0.26)",n.lineWidth=2;for(let i=0;i<e;i+=10)n.beginPath(),n.moveTo(i,0),n.lineTo(i,t),n.stroke();n.fillStyle="rgba(214,204,184,0.45)";for(let i=0;i<5;i++)n.save(),n.translate(Math.random()*e,Math.random()*t),n.rotate(Math.random()*3),n.fillRect(-42,-8,84,16),n.restore()},grass(n,e,t){n.fillStyle="#4f7d30",n.fillRect(0,0,e,t),fn(n,e,t,2200,"#3e6626",.5,2.6),fn(n,e,t,1200,"#6f9c40",.5,2.2),n.lineWidth=1.4;const i=Math.min(6e3,Math.floor(e*t/1100));for(let s=0;s<i;s++){const a=Math.random()*e,r=Math.random()*t,o=Math.random();n.strokeStyle=o<.45?"#3c6322":o<.8?"#6fa840":"#84c052",n.beginPath(),n.moveTo(a,r),n.lineTo(a+(Math.random()-.5)*4,r-4-Math.random()*5),n.stroke()}},mud:()=>{},water:()=>{},ramp:()=>{},push:()=>{},chalk:()=>{},out:()=>{}};function j0(n,e){const t=Math.sin(n*12.9898+e*78.233)*43758.5453;return t-Math.floor(t)}function K0(n,e,t,i,s){n.beginPath();for(let r=0;r<=22;r++){const o=r/22*Math.PI*2,c=.8+.2*Math.sin(o*3+s*6.283)+.1*Math.sin(o*5-s*9),l=i*c,h=e+Math.cos(o)*l,d=t+Math.sin(o)*l;r?n.lineTo(h,d):n.moveTo(h,d)}n.closePath()}function Z0(n,e,t,i,s,a){n.beginPath();for(let o=0;o<=26;o++){const c=o/26*Math.PI*2,l=1+.12*Math.sin(c*4+a*6.283),h=e+Math.cos(c)*i*l,d=t+Math.sin(c)*s*l;o?n.lineTo(h,d):n.moveTo(h,d)}n.closePath()}function J0(n,e,t,i){const[s,a]=t(e.x,e.y),r=e.r==null&&e.hw!=null&&e.hh!=null,o=(e.hw??e.r??1)*i,c=(e.hh??e.r??1)*i,l=Math.max(o,c),h=j0(Math.round(e.x*1.7),Math.round(e.y*1.3)),d=e.surface,u=()=>r?Z0(n,s,a,o,c,h):K0(n,s,a,(e.r??1)*i,h);if(d==="ramp"||d==="push"){n.save(),n.beginPath(),n.arc(s,a,l,0,7),n.clip(),n.save(),n.translate(s,a),n.rotate(1.57-(e.dir??-1.57));const m=n.createLinearGradient(0,l,0,-l);d==="ramp"?(m.addColorStop(0,"#1f7a3a"),m.addColorStop(1,"#43c463")):(m.addColorStop(0,"#8a1810"),m.addColorStop(1,"#ef5a5f")),n.fillStyle=m,n.fillRect(-l,-l,l*2,l*2),n.strokeStyle="rgba(255,255,255,0.95)",n.lineWidth=l*.16,n.lineCap="round",n.lineJoin="round";for(let p=-1;p<=1;p++){const _=p*l*.52;n.beginPath(),n.moveTo(-l*.5,_+l*.24),n.lineTo(0,_-l*.24),n.lineTo(l*.5,_+l*.24),n.stroke()}n.restore(),n.restore();return}let f=Math.sin((h+1)*99.13)*9999;const g=()=>(f=Math.sin(f)*9999,f-Math.floor(f));n.save(),u(),n.clip();const v=m=>{n.fillStyle=m,n.fillRect(s-l,a-l,l*2,l*2)};if(d==="sand"){const m=n.createRadialGradient(s,a-l*.2,l*.2,s,a,l);m.addColorStop(0,"#f0d79a"),m.addColorStop(1,"#d6b271"),n.fillStyle=m,n.fillRect(s-l,a-l,l*2,l*2),n.lineWidth=Math.max(1.5,i*.1),n.lineCap="round";for(let p=0;p<6;p++){const _=a-l+(p+g())*l*.34;n.strokeStyle=p%2?"rgba(255,246,214,0.5)":"rgba(180,150,96,0.45)",n.beginPath();for(let y=s-l;y<=s+l;y+=i*.4)n.lineTo(y,_+Math.sin(y*.05+p)*i*.5);n.stroke()}for(let p=0;p<240;p++)n.globalAlpha=.35,n.fillStyle=g()<.5?"#c9a86a":"#fdeec4",n.beginPath(),n.arc(s+(g()-.5)*l*2,a+(g()-.5)*l*2,i*.06,0,7),n.fill();n.globalAlpha=1}else if(d==="mud"){const m=n.createRadialGradient(s-l*.2,a-l*.2,l*.1,s,a,l);m.addColorStop(0,"#6b4d2a"),m.addColorStop(.7,"#4a3418"),m.addColorStop(1,"#33240f"),n.fillStyle=m,n.fillRect(s-l,a-l,l*2,l*2);for(let _=0;_<16;_++)n.fillStyle=g()<.5?"rgba(92,68,38,0.7)":"rgba(38,26,12,0.6)",n.beginPath(),n.arc(s+(g()-.5)*l*1.5,a+(g()-.5)*l*1.5,i*(.14+g()*.36),0,7),n.fill();const p=n.createRadialGradient(s-l*.3,a-l*.35,0,s-l*.3,a-l*.35,l*.85);p.addColorStop(0,"rgba(255,240,200,0.28)"),p.addColorStop(1,"rgba(255,240,200,0)"),n.fillStyle=p,n.fillRect(s-l,a-l,l*2,l*2)}else if(d==="water"){const m=n.createRadialGradient(s,a,l*.15,s,a,l);m.addColorStop(0,"rgba(120,200,235,0.92)"),m.addColorStop(.7,"rgba(70,150,200,0.92)"),m.addColorStop(1,"rgba(40,110,165,0.94)"),n.fillStyle=m,n.fillRect(s-l,a-l,l*2,l*2),n.strokeStyle="rgba(255,255,255,0.42)",n.lineWidth=Math.max(1.2,i*.07);for(let p=1;p<=5;p++)n.globalAlpha=.5-p*.06,n.beginPath(),n.arc(s-l*.15,a-l*.1,l*(.18+p*.16),.3,2.5),n.stroke();n.globalAlpha=1,n.fillStyle="rgba(255,255,255,0.55)",n.beginPath(),n.ellipse(s-l*.35,a-l*.4,l*.28,l*.09,-.5,0,7),n.fill();for(let p=0;p<8;p++)n.fillStyle="rgba(255,255,255,0.5)",n.beginPath(),n.arc(s+(g()-.5)*l*1.6,a+(g()-.5)*l*1.6,i*.05,0,7),n.fill()}else if(d==="grass"){v("#4d7a2e");for(let m=0;m<200;m++){const p=s+(g()-.5)*l*2,_=a+(g()-.5)*l*2,y=i*(.3+g()*.5);n.strokeStyle=g()<.4?"#3c6322":g()<.8?"#5f9a38":"#7bbd4a",n.lineWidth=Math.max(1,i*.05),n.beginPath(),n.moveTo(p,_),n.lineTo(p+(g()-.5)*i*.3,_-y),n.stroke()}}else if(d==="chalk"){n.fillStyle="rgba(240,240,245,0.14)",n.fillRect(s-l,a-l,l*2,l*2);const m=["#ff8fb0","#8fd0ff","#ffe38f","#a0ffb0","#c9a0ff"];for(let p=0;p<5;p++){n.strokeStyle=m[p%m.length],n.globalAlpha=.55,n.lineWidth=i*.14,n.lineCap="round";const _=s+(g()-.5)*l,y=a+(g()-.5)*l;n.beginPath(),n.moveTo(_,y),n.lineTo(_+(g()-.5)*l,y+(g()-.5)*l),n.stroke()}n.globalAlpha=1}else if(d==="cardboard"){v("#cba875"),n.strokeStyle="rgba(150,110,70,0.32)",n.lineWidth=i*.12;for(let m=s-l;m<s+l;m+=i*.55)n.beginPath(),n.moveTo(m,a-l),n.lineTo(m,a+l),n.stroke()}else if(d==="sidewalk"){v("#c6c0b2");for(let m=0;m<60;m++)n.globalAlpha=.3,n.fillStyle=g()<.5?"#b0a99a":"#dad4c6",n.beginPath(),n.arc(s+(g()-.5)*l*2,a+(g()-.5)*l*2,i*.07,0,7),n.fill();n.globalAlpha=1,n.strokeStyle="rgba(120,114,100,0.5)",n.lineWidth=i*.08,n.beginPath(),n.moveTo(s-l,a+(g()-.5)*l),n.lineTo(s+l,a+(g()-.5)*l),n.stroke()}else v("#c9bfa8");n.restore(),n.save(),u(),n.lineWidth=Math.max(2,i*.16),n.strokeStyle=d==="water"?"rgba(20,70,110,0.5)":"rgba(0,0,0,0.2)",n.stroke(),n.restore()}function Q0(n){const e=n.path,t=n.half,i=[],s=[];for(let a=0;a<e.length;a++){const r=e[Math.max(0,a-1)],o=e[Math.min(e.length-1,a+1)];let c=-(o.y-r.y),l=o.x-r.x;const h=Math.hypot(c,l)||1;c/=h,l/=h;const d=t[a];i.push([e[a].x+c*d,e[a].y+l*d]),s.push([e[a].x-c*d,e[a].y-l*d])}return{L:i,R:s}}function eg(n){const e=Math.max(n.w,n.h),t=Math.max(9,Math.min(30,Math.floor(3800/e))),i=Math.round(n.w*t),s=Math.round(n.h*t),a=document.createElement("canvas");a.width=i,a.height=s;const r=a.getContext("2d"),o=(_,y)=>[_*t,s-y*t],c=()=>(Kl[n.ground]||Kl.dirt)(r,i,s);c();const{L:l,R:h}=Q0(n),d=new Path2D;for(let _=0;_<n.path.length;_++){const[y,M]=o(n.path[_].x,n.path[_].y),C=n.half[_]*t;d.moveTo(y+C,M),d.arc(y,M,C,0,Math.PI*2)}for(const _ of n.pads){const[y,M]=o(_.x,_.y),C=_.r*t;d.moveTo(y+C,M),d.arc(y,M,C,0,Math.PI*2)}r.fillStyle="rgba(18,12,6,0.42)",r.fillRect(0,0,i,s),r.save(),r.clip(d,"nonzero"),c(),r.restore();for(const _ of n.patches)J0(r,_,o,t);const u=(_,y,M)=>{r.strokeStyle=M,r.lineWidth=y,r.lineJoin="round",r.lineCap="round",r.beginPath(),_.forEach((C,w)=>{const[A,R]=o(C[0],C[1]);w?r.lineTo(A,R):r.moveTo(A,R)}),r.stroke()};u(l,Math.max(3,t*.55),"rgba(35,22,10,0.55)"),u(h,Math.max(3,t*.55),"rgba(35,22,10,0.55)"),u(l,Math.max(1.6,t*.28),"rgba(255,250,238,0.95)"),u(h,Math.max(1.6,t*.28),"rgba(255,250,238,0.95)"),r.strokeStyle="rgba(255,255,255,0.30)",r.lineWidth=Math.max(2,t*.16),r.setLineDash([t,t*1.2]),r.beginPath(),n.path.forEach((_,y)=>{const[M,C]=o(_.x,_.y);y?r.lineTo(M,C):r.moveTo(M,C)}),r.stroke(),r.setLineDash([]);const f=_=>{let y=0,M=1e9;for(let C=0;C<n.path.length;C++){const w=n.path[C].x-_.x,A=n.path[C].y-_.y,R=w*w+A*A;R<M&&(M=R,y=C)}return y};n.checkpoints.forEach((_,y)=>{if(y===0)return;const M=f(_),C=n.path[Math.max(0,M-1)],w=n.path[Math.min(n.path.length-1,M+1)];let A=-(w.y-C.y),R=w.x-C.x;const q=Math.hypot(A,R)||1;A/=q,R/=q;const b=n.half[M],[S,D]=o(_.x+A*b,_.y+R*b),[I,O]=o(_.x-A*b,_.y-R*b),[$,B]=o(_.x,_.y);r.lineCap="butt",r.strokeStyle="rgba(40,190,235,0.42)",r.lineWidth=t*1.1,r.beginPath(),r.moveTo(S,D),r.lineTo(I,O),r.stroke(),r.strokeStyle="rgba(255,255,255,0.9)",r.lineWidth=Math.max(2,t*.18),r.setLineDash([t*.55,t*.4]),r.beginPath(),r.moveTo(S,D),r.lineTo(I,O),r.stroke(),r.setLineDash([]),r.fillStyle="#1f9ad0",r.beginPath(),r.arc($,B,t*.66,0,7),r.fill(),r.lineWidth=Math.max(2,t*.14),r.strokeStyle="#eafcff",r.stroke(),r.fillStyle="#fff",r.font=`900 ${Math.round(t*.82)}px sans-serif`,r.textAlign="center",r.textBaseline="middle",r.fillText(String(y),$,B+1)});const g=(_,y,M)=>{const[C,w]=o(_[0],_[1]),[A,R]=o(y[0],y[1]),q=A-C,b=R-w,S=Math.hypot(q,b)||1,D=-b/S,I=q/S,O=3,$=S/10;for(let B=0;B<O;B++)for(let te=0;te<10;te++){r.fillStyle=(B+te)%2?M:"#fff";const Y=C+q*te/10+D*(B-1)*$,ce=w+b*te/10+I*(B-1)*$;r.save(),r.translate(Y,ce),r.rotate(Math.atan2(b,q)),r.fillRect(0,-$/2,$,$),r.restore()}},v={x:-Math.sin(n.startAngle),y:Math.cos(n.startAngle)},m=n.half[0];g([n.start.x-v.x*m,n.start.y-v.y*m],[n.start.x+v.x*m,n.start.y+v.y*m],"#2a7d3a"),g([n.finish[0].x,n.finish[0].y],[n.finish[1].x,n.finish[1].y],"#222");const p=new Pa(a);return p.colorSpace=qt,p.anisotropy=8,p.needsUpdate=!0,p}function tg(n,e){const t=parseInt(n.slice(1),16);let i=(t>>16)+e,s=(t>>8&255)+e,a=(t&255)+e;return i=Math.min(255,i),s=Math.min(255,s),a=Math.min(255,a),`rgb(${i},${s},${a})`}function ms(n,e=1){const i=document.createElement("canvas");i.width=i.height=128;const s=i.getContext("2d"),a=128/2,r=128/2;if(n==="jumparrow"){s.clearRect(0,0,128,128),s.strokeStyle="rgba(90,255,140,0.95)",s.lineWidth=16,s.lineCap="round",s.lineJoin="round";for(let c=-1;c<=1;c++){const l=r+c*34;s.beginPath(),s.moveTo(a-34,l+16),s.lineTo(a,l-16),s.lineTo(a+34,l+16),s.stroke()}}else if(n==="bomb")s.fillStyle="#c0392b",s.beginPath(),s.arc(a,r,128*.44,0,7),s.fill(),s.strokeStyle="#fff",s.lineWidth=14,s.lineCap="round",s.beginPath(),s.moveTo(a-28,r-28),s.lineTo(a+28,r+28),s.moveTo(a+28,r-28),s.lineTo(a-28,r+28),s.stroke();else if(n==="itembox"){const c=s.createLinearGradient(0,0,128,128);c.addColorStop(0,"#a86bff"),c.addColorStop(1,"#6a3ce0"),s.fillStyle=c,s.fillRect(0,0,128,128),s.strokeStyle="#fff",s.lineWidth=8,s.strokeRect(8,8,112,112),s.fillStyle="#fff",s.font="900 84px sans-serif",s.textAlign="center",s.textBaseline="middle",s.fillText("?",a,r+6)}else if(n==="cp")s.clearRect(0,0,128,128),s.fillStyle="#1f9ad0",s.strokeStyle="#eafcff",s.lineWidth=8,s.beginPath(),s.arc(a,r,128*.42,0,7),s.fill(),s.stroke(),s.fillStyle="#dff6ff",s.font="800 22px sans-serif",s.textAlign="center",s.textBaseline="middle",s.fillText("CHECK",a,r-24),s.fillStyle="#fff",s.font="900 62px sans-serif",s.fillText(String(e),a,r+18);else{const c=e>=3?"#e0a020":e===2?"#2e9fa4":"#2ea44f";s.fillStyle=c,s.beginPath(),s.arc(a,r,128*.44,0,7),s.fill(),s.fillStyle="#fff",s.font="bold 58px sans-serif",s.textAlign="center",s.textBaseline="middle",s.fillText("+"+e,a,r+4)}const o=new Pa(i);return o.colorSpace=qt,o.anisotropy=4,o}function ng(n,e){const t=new ln,i=(r,o=.9)=>new gt({color:r,roughness:o}),s=(r,o,c,l)=>new Re(new Fn(r,o,c,12),i(l)),a=(r,o,c,l)=>new Re(new xn(r,o,c),i(l));switch(n){case"twig":{const r=s(.09,.12,2.2,"#5a3f22");r.rotation.z=1.57,r.position.y=.12,t.add(r);break}case"leaf":{const r=new Re(new Si(.5,8,6),i(e||"#7a9b3a"));r.scale.set(1,.14,.7),r.position.y=.07,t.add(r);break}case"pebble":{const r=new Re(new Da(.42),i("#b8ae98"));r.scale.y=.6,r.position.y=.2,t.add(r);break}case"grass":{for(let r=0;r<5;r++){const o=s(.02,.05,1.1,"#5f8a36");o.position.set((Math.random()-.5)*.5,.55,(Math.random()-.5)*.5),o.rotation.z=(Math.random()-.5)*.5,t.add(o)}break}case"shell":{const r=new Re(new Si(.42,10,8,0,6.3,0,1.6),i(e||"#f0dcc6"));r.position.y=.1,t.add(r);break}case"starfish":{const r=new Re(new Fn(.55,.55,.12,5),i(e||"#e08a4a"));r.position.y=.1,t.add(r);break}case"castle":{const r=a(2.4,1.4,2.4,"#d8b878");r.position.y=.7,t.add(r);for(const[o,c]of[[-1,-1],[1,-1],[-1,1],[1,1]]){const l=s(.35,.4,1.9,"#d8b878");l.position.set(o,.95,c),t.add(l)}break}case"chalk":{const r=new Re(new sn(2.4,.7),new gt({color:e||"#e8607a",roughness:1,transparent:!0,opacity:.85}));r.rotation.x=-1.57,r.position.y=.03,t.add(r);break}case"toy":{const r=a(1.1,.7,1.1,e||"#e0c040");r.position.y=.35,t.add(r);const o=s(.28,.28,.5,tg(e||"#e0c040",20));o.position.y=.9,t.add(o);break}case"box":{const r=a(2.4,1.6,2,"#c39a63");r.position.y=.8,r.castShadow=!0,t.add(r);const o=a(2.5,.14,2.1,"#a97f48");o.position.y=1.6,t.add(o);break}case"tape":{const r=a(2.2,.06,.6,"#d9d2c2");r.position.y=.05,t.add(r);break}case"pencil":{const r=s(.13,.13,3.2,e||"#e0b030");r.rotation.z=1.57,r.position.y=.16,t.add(r);const o=s(0,.13,.4,"#333");o.rotation.z=1.57,o.position.set(1.7,.16,0),t.add(o);break}case"cup":{const r=s(.85,.65,1.8,"#e8e4dc");r.position.y=.9,r.castShadow=!0,t.add(r);const o=s(.7,.55,1.6,"#b8b0a2");o.position.y=1.05,t.add(o);break}case"coin":{const r=s(.55,.55,.12,e||"#e0c050");r.position.y=.06,t.add(r);break}case"eraser":{const r=a(1,.5,.6,e||"#e06a8a");r.position.y=.25,t.add(r);break}case"straw":{const r=s(.1,.1,3,e||"#e05a5a");r.rotation.z=1.4,r.position.y=.14,t.add(r);break}}return t.traverse(r=>{r.isMesh&&(r.castShadow=!0,r.receiveShadow=!0)}),t}function Uo(n){const e=new ln,t=[],i=[],s=[],a=new Re(new xn(n.w+5,1.4,n.h+5),new gt({color:n.bg,roughness:.95}));a.position.set(n.w/2,-.72,n.h/2),a.receiveShadow=!0,e.add(a);const r=eg(n);r.flipY=!1;const o=new Re(new sn(n.w,n.h),new gt({map:r,roughness:.98}));o.rotation.x=-Math.PI/2,o.position.set(n.w/2,0,n.h/2),o.receiveShadow=!0,e.add(o);const c=n.wallCol||"#6b4e2e",l=new gt({color:c,roughness:.85});for(const d of n.walls){const u=d.b.x-d.a.x,f=d.b.y-d.a.y,g=Math.hypot(u,f);if(g<.05)continue;const v=new Re(new xn(g+.5,.9,.6),l);v.position.set((d.a.x+d.b.x)/2,.42,(d.a.y+d.b.y)/2),v.rotation.y=-Math.atan2(f,u),v.castShadow=!0,v.receiveShadow=!0,e.add(v)}const h=new gt({color:"#8a5a2e",roughness:.82});for(const d of n.obstacles)if(d.type==="stone"){const u=new Re(new Da(d.r,0),new gt({color:"#9a948a",roughness:.9,flatShading:!0}));u.position.set(d.x,d.r*.55,d.y),u.scale.y=.8,u.rotation.set(Math.random(),Math.random(),Math.random()),u.castShadow=!0,u.receiveShadow=!0,e.add(u)}else if(d.type==="hole"){const u=new Re(new Dn(d.r,28),new kt({color:1182726}));u.rotation.x=-Math.PI/2,u.position.set(d.x,.015,d.y),e.add(u);const f=new Re(new as(d.r,.15,8,28),new gt({color:"#3a2c1a",roughness:1}));f.rotation.x=-Math.PI/2,f.position.set(d.x,.03,d.y),f.castShadow=!0,e.add(f)}else if(d.type==="jump"){const u=new ln,f=new Re(new xn(3,.34,3.4),h);f.rotation.x=-.52,f.position.set(0,.55,.2),f.castShadow=!0,f.receiveShadow=!0,u.add(f);const g=new Re(new xn(3,.5,.32),new gt({color:"#c9902e",roughness:.7}));g.position.set(0,1,1.5),u.add(g);const v=new Re(new sn(2.4,3),new kt({map:ms("jumparrow"),transparent:!0,depthWrite:!1}));v.rotation.x=-Math.PI/2-.52,v.rotation.z=Math.PI,v.position.set(0,.8,.4),u.add(v),u.position.set(d.x,0,d.y),u.rotation.y=Math.PI/2-(d.dir??0),e.add(u)}else if(d.type==="bomb"){const u=new ln,f=new Re(new Si(d.r*.95,18,14),new gt({color:"#191919",roughness:.35,metalness:.4}));f.position.y=d.r*.95,f.castShadow=!0,u.add(f);const g=new Re(new Fn(.18,.24,.28,10),new gt({color:"#4a4a4a",metalness:.6,roughness:.4}));g.position.y=d.r*1.75,u.add(g);const v=new Re(new Fn(.06,.06,.5,6),new gt({color:"#6a4a2a"}));v.position.set(.1,d.r*2.05,0),v.rotation.z=.4,u.add(v);const m=new Re(new Si(.16,8,6),new kt({color:"#ffd24a"}));m.position.set(.24,d.r*2.28,0),u.add(m),i.push(m),u.position.set(d.x,0,d.y),e.add(u);const p=new Re(new Dn(d.r*1.6,24),new kt({color:"#e5484d",transparent:!0,opacity:.3,blending:xi,depthWrite:!1}));p.rotation.x=-Math.PI/2,p.position.set(d.x,.025,d.y),e.add(p),t.push({mesh:p,kind:"bomb",base:d.r*1.6})}else if(d.type==="item"){const u=new ln,f=new Re(new xn(1.25,1.25,1.25),new gt({map:ms("itembox"),roughness:.3,metalness:.2,emissive:"#8a5cff",emissiveIntensity:.25}));f.position.y=1.35,f.castShadow=!0,u.add(f),i.push(f),u.position.set(d.x,0,d.y),e.add(u);const g=new Re(new Dn(d.r*1.7,24),new kt({color:"#b98cff",transparent:!0,opacity:.3,blending:xi,depthWrite:!1}));g.rotation.x=-Math.PI/2,g.position.set(d.x,.025,d.y),e.add(g),t.push({mesh:g,kind:"item",base:d.r*1.7})}else{const u=d.n||1,f=u>=3?"#f2c200":u===2?"#2e9fa4":"#2ea44f",g=new Re(new Lo(d.r*.5,0),new gt({color:f,roughness:.15,metalness:.55,emissive:f,emissiveIntensity:.35,flatShading:!0}));g.position.set(d.x,d.r*.75,d.y),g.castShadow=!0,e.add(g),i.push(g);const v=new Re(new Dn(d.r*.7,20),new kt({map:ms("bonus",u),transparent:!0,depthWrite:!1}));v.rotation.x=-Math.PI/2,v.position.set(d.x,.04,d.y),e.add(v);const m=new Re(new sn(1.7,1.7),new kt({map:ms("bonus",u),transparent:!0,depthWrite:!1}));m.position.set(d.x,d.r*2.3,d.y),e.add(m),s.push(m);const p=new Re(new Dn(d.r*1.6,24),new kt({color:f,transparent:!0,opacity:.32,blending:xi,depthWrite:!1}));p.rotation.x=-Math.PI/2,p.position.set(d.x,.025,d.y),e.add(p),t.push({mesh:p,kind:"bonus",base:d.r*1.6})}n.checkpoints.forEach((d,u)=>{if(u===0)return;let f=0,g=1e9;for(let b=0;b<n.path.length;b++){const S=n.path[b].x-d.x,D=n.path[b].y-d.y,I=S*S+D*D;I<g&&(g=I,f=b)}const v=n.path[Math.max(0,f-1)],m=n.path[Math.min(n.path.length-1,f+1)];let p=-(m.y-v.y),_=m.x-v.x;const y=Math.hypot(p,_)||1;p/=y,_/=y;const M=(m.x-v.x)/y,C=(m.y-v.y)/y,w=n.half[f],A="#28c0e0";for(const b of[1,-1]){const S=d.x+p*w*b,D=d.y+_*w*b,I=new Re(new Fn(.16,.2,2.3,10),new gt({color:A,emissive:A,emissiveIntensity:.55,roughness:.4}));I.position.set(S,1.15,D),I.castShadow=!0,e.add(I);const O=new Re(new Si(.28,12,10),new gt({color:"#eaffff",emissive:A,emissiveIntensity:.9}));O.position.set(S,2.42,D),e.add(O),i.push(O)}const R=new Re(new sn(w*2,.9),new kt({color:A,transparent:!0,opacity:.4,blending:xi,depthWrite:!1}));R.rotation.x=-Math.PI/2,R.rotation.z=-Math.atan2(C,M),R.position.set(d.x,.03,d.y),e.add(R);const q=new Re(new sn(1.8,1.8),new kt({map:ms("cp",u),transparent:!0,depthWrite:!1}));q.position.set(d.x,3,d.y),e.add(q),s.push(q)});for(const d of n.decor){const u=ng(d.kind,d.c);u.position.set(d.x,0,d.y),d.s&&u.scale.multiplyScalar(d.s),d.rot&&(u.rotation.y=d.rot),e.add(u)}for(const d of n.finish){const u=new Re(new Fn(.08,.08,2.4,8),new gt({color:"#eee"}));u.position.set(d.x,1.2,d.y),u.castShadow=!0,e.add(u);const f=new Re(new sn(1.2,.7),new gt({color:"#e5484d",side:Mn}));f.position.set(d.x+.6,2,d.y),e.add(f)}return{group:e,pulses:t,spinners:i,billboards:s}}const Zl={bal:{weight:1,slide:1,stability:1,bounce:1,control:1,power:1,grip:1},glide:{weight:.93,slide:1.13,stability:.97,bounce:1.03,control:.98,power:.96,grip:.95},heavy:{weight:1.14,slide:.9,stability:1.09,bounce:.9,control:1.01,power:1.08,grip:1.1},precise:{weight:.98,slide:1,stability:1.09,bounce:.97,control:1.14,power:.99,grip:1.02},bouncy:{weight:.95,slide:1.05,stability:.94,bounce:1.16,control:.98,power:1.02,grip:.94},nimble:{weight:.9,slide:1.09,stability:1.02,bounce:1.02,control:1.06,power:.95,grip:.97},tank:{weight:1.18,slide:.87,stability:1.13,bounce:.85,control:1,power:1.12,grip:1.16},allround:{weight:1.05,slide:1.06,stability:1.06,bounce:1.05,control:1.06,power:1.05,grip:1.05}},Jl={comum:0,rara:.013,epica:.028,lendaria:.048,mitica:.066};function ig(n,e){const t=Zl[n]||Zl.bal,i=1+Jl[e],s=1+Jl[e]*.4,a=r=>+(r*(r>=1?i:s)).toFixed(3);return{weight:a(t.weight),slide:a(t.slide),stability:a(t.stability),bounce:a(t.bounce),control:a(t.control),power:a(t.power),grip:a(t.grip)}}function sg(n,e=38){const t=parseInt(n.replace("#",""),16),i=Math.max(0,(t>>16)-e),s=Math.max(0,(t>>8&255)-e),a=Math.max(0,(t&255)-e);return"#"+(i<<16|s<<8|a).toString(16).padStart(6,"0")}const ag={steel:"#c8ccd2",silver:"#d2d6db",gold:"#e8be55",copper:"#c67e46",dark:"#3a3e44"};function ue(n,e,t,i,s,a,r,o){return{id:n,name:e,rarity:t,unlock:i,stats:ig(s,t),top:a,side:sg(a),ring:ag[r.metal||"steel"],art:r,desc:o}}const an=[ue("coca","Cola Vermelha","comum",0,"bal","#d81f26",{bg:["#e5343a","#c0121a"],metal:"steel",arcTop:["DRINK","#fff"],center:"Cola",centerColor:"#fff",centerFont:"script",centerSize:.5,sub:["DELICIOSA & GELADA","#ffd7a0"],vintage:.4},"A clássica. Equilibrada em tudo."),ue("grape","Uva Roxa","comum",0,"bal","#6a3d9a",{bg:["#7a4bb0","#54307c"],metal:"steel",arcTop:["GRAPE","#fff"],arcBot:["SODA","#fff"],emblem:"grape",emblemColor:"#dcc6f2",vintage:.35},"Refri de uva de sempre."),ue("orangecrush","Laranja Crush","comum",0,"bouncy","#e5761a",{bg:["#f79a2e","#dd6412"],metal:"steel",arcTop:["ORANGE","#7a2f10"],center:"Crush",centerColor:"#fff",centerFont:"script",centerSize:.5,sub:["SODA","#7a2f10"],vintage:.4},"Quica com gosto de laranja."),ue("sprite","Limão Verde","comum",0,"nimble","#2f8a52",{bg:["#f2f6ee","#d6e6cf"],metal:"steel",center:"Sprite",centerColor:"#1f7a3a",centerFont:"script",centerSize:.5,emblem:"star",emblemColor:"#3fae6a",emblemY:-.02,emblemScale:.5,sub:["LIMÃO","#1f7a3a"],vintage:.3},"Leve e ágil."),ue("rootbeer","Root Beer do Pop","comum",0,"heavy","#5a3418",{bg:["#6b4020","#3f2410"],metal:"copper",arcTop:["ROOT","#ffd7a0"],arcBot:["BEER","#ffd7a0"],emblem:"bottle",emblemColor:"#caa16b",vintage:.45},"Pesada, empurra geral."),ue("pinklem","Limonada Rosa","comum",0,"bouncy","#e86a9a",{bg:["#f7a8c6","#e06a95"],metal:"steel",arcTop:["PINK","#7a1f45"],arcBot:["LEMONADE","#7a1f45"],emblem:"clown",emblemColor:"#e86a9a",emblemColor2:"#c0392b",emblemScale:.9,vintage:.4},"Doce e saltitante."),ue("bubbleup","Bubble Up","comum",0,"nimble","#2fae4e",{bg:["#39c257","#1f8a3a"],metal:"steel",center:"Bubble up",centerColor:"#fff",centerFont:"script",centerSize:.36,sub:["LIMÃO·LIMA","#fff"],vintage:.35},"Borbulha e desliza."),ue("sevenup","Sete Acima","comum",0,"precise","#c0392b",{bg:["#eef0ea","#cfd2c8"],metal:"silver",center:"7up",centerColor:"#c0392b",centerFont:"slab",centerSize:.5,sub:["LEMON SODA","#2f8a52"],vintage:.4},"Limpa e precisa."),ue("cherrycoke","Cereja","comum",1,"bal","#e0489a",{bg:["#ec5aa6","#c02d78"],metal:"steel",center:"Cherry",centerColor:"#fff",centerFont:"script",centerSize:.42,emblem:"cherry",emblemColor:"#c0122a",emblemY:.42,emblemScale:.7,arcTop:["CHERRY COLA","#fff"],vintage:.35},"Cola com cereja."),ue("lemon","Bubble Lima","comum",1,"glide","#3fae6a",{bg:["#e9e2cf","#cfc7ac"],metal:"steel",arcTop:["LEMON","#3f7a2a"],center:"bubble up",centerColor:"#c0392b",centerFont:"script",centerSize:.34,sub:["LIME SODA","#3f7a2a"],vintage:.5},"Escorrega bastante."),ue("whistle","Whistle","comum",1,"bal","#e5761a",{bg:["#f79a2e","#e5761a"],metal:"steel",arcTop:["THIRSTY?","#0a3d91"],center:"WHISTLE",centerColor:"#0a3d91",centerFont:"block",centerSize:.34,sub:["JUST","#0a3d91"],vintage:.4},"Assobia de sede."),ue("moxie","Moxie","comum",2,"heavy","#d4341f",{bg:["#e5453a","#b8261a"],metal:"steel",arcTop:["TRADE MARK","#ffe9c0"],center:"Moxie",centerColor:"#fff",centerFont:"serif",centerSize:.5,sub:["SODA","#ffe9c0"],vintage:.5},"Amarga e teimosa."),ue("cheerwine","Cheerwine","comum",2,"bal","#cf1f2d",{bg:["#f4cf3a","#e0b21f"],metal:"steel",arcTop:["CHEERWINE","#c0122a"],center:"Since 1917",centerColor:"#c0122a",centerFont:"serif",centerSize:.22,emblem:"cherry",emblemColor:"#c0122a",emblemY:.4,emblemScale:.55,sub:["GOOD CHEER","#c0122a"],vintage:.4},"Cheia de bom humor."),ue("howdy","Howdy","comum",2,"bouncy","#e5761a",{bg:["#1c1c1c","#000"],metal:"steel",arcTop:["ORANGE","#f79420"],center:"Howdy",centerColor:"#f79420",centerFont:"script",centerSize:.46,sub:["SODA","#f79420"],vintage:.45},"Alegre e pula-pula."),ue("ski","Ski","comum",3,"nimble","#2f8a52",{bg:["#f2c200","#d9a800"],metal:"steel",band:["#1f7a3a","Ski","#f2c200"],sub:["CITRUS","#1f7a3a"],vintage:.35},"Cítrica e esperta."),ue("lucky","Lucky Club","comum",3,"bal","#c0392b",{bg:["#e9e6dc","#cfccc0"],metal:"silver",band:["#c0392b","Lucky Club","#fff"],emblem:"leaf",emblemColor:"#2f8a52",emblemY:-.42,emblemScale:.45,sub:["COLA","#0a3d91"],vintage:.4},"Um trevo de sorte."),ue("bonedry","Bone Dry","comum",3,"precise","#0a3d91",{bg:["#f2f2f0","#dcdcd8"],metal:"silver",arcTop:["GINGER ALE","#0a3d91"],center:"Bone Dry",centerColor:"#0a3d91",centerFont:"serif",centerSize:.36,vintage:.35},"Sequinha, boa de mira."),ue("sunnykid","Sunny Kid","comum",4,"glide","#1f7a3a",{bg:["#2f8a52","#186633"],metal:"steel",center:"Sunny Kid",centerColor:"#f4d76a",centerFont:"serif",centerSize:.34,emblem:"sunburst",emblemColor:"#f4d76a",emblemColor2:"#f4d76a",emblemY:0,emblemScale:.5,vintage:.45},"Desliza no sol."),ue("uptown","Up-Town","comum",4,"nimble","#1f7a3a",{bg:["#2f8a52","#155a2c"],metal:"steel",center:"up-town",centerColor:"#fff",centerFont:"script",centerSize:.4,emblem:"heart",emblemColor:"#e5484d",emblemY:.44,emblemScale:.4,vintage:.4},"Chique da cidade."),ue("dads","Dad's","comum",4,"heavy","#0a3d91",{bg:["#f2c200","#d9a800"],metal:"steel",arcTop:["SINCE 1937","#0a3d91"],center:"DAD'S",centerColor:"#c0392b",centerFont:"slab",centerSize:.42,sub:["OLD FASHIONED","#0a3d91"],vintage:.45},"Root beer do pai."),ue("mas","Ma's","comum",5,"bal","#6b7078",{bg:["#8a9098","#5a6068"],metal:"silver",arcTop:["NO DEPOSIT","#fff"],center:"Ma's",centerColor:"#e5484d",centerFont:"script",centerSize:.46,sub:["NO RETURN","#fff"],vintage:.45},"Caseira, sem devolução."),ue("wakeup","Wake Up","comum",5,"precise","#0a3d91",{bg:["#e9e6dc","#cfc7ac"],metal:"silver",center:"WAKE UP",centerColor:"#0a3d91",centerFont:"block",centerSize:.32,emblem:"star",emblemColor:"#0a3d91",emblemY:-.42,emblemScale:.4,vintage:.4},"Desperta e acerta."),ue("pickupper","Pick-Upper","comum",5,"nimble","#c0392b",{bg:["#eef0ea","#d0d2cc"],metal:"silver",center:"Pick-UPPER",centerColor:"#c0392b",centerFont:"block",centerSize:.3,sub:["CITRATE SODA","#8a8a80"],vintage:.4},"Levanta o astral."),ue("upanup","Up and Up","comum",6,"bal","#c0392b",{bg:["#e9e6dc","#cfc7ac"],metal:"silver",center:"UP and UP",centerColor:"#c0392b",centerFont:"block",centerSize:.3,vintage:.4},"Sempre pra cima."),ue("yup","Yup!","comum",6,"bouncy","#f2a400",{bg:["#f7c948","#e59a12"],metal:"steel",center:"Yup!",centerColor:"#1f7a3a",centerFont:"script",centerSize:.5,sub:["IS UP","#1f7a3a"],vintage:.4},"Positiva e saltitante."),ue("goody","Goody Uva","comum",7,"glide","#8e5bd0",{bg:["#f2d6f0","#dcb0e0"],metal:"steel",arcTop:["GOODY","#7c3aed"],center:"Goody",centerColor:"#7c3aed",centerFont:"script",centerSize:.46,sub:["GRAPE SODA","#7c3aed"],vintage:.4},"Boazinha e lisa."),ue("smile","Smile","comum",8,"nimble","#e5761a",{bg:["#f79420","#dd6412"],metal:"steel",center:"Smile",centerColor:"#fff",centerFont:"script",centerSize:.42,emblem:"orange",emblemColor:"#f4c04a",emblemY:.42,emblemScale:.45,vintage:.4},"Sempre sorrindo."),ue("pepsi","Pepsi-Cola","rara",5,"glide","#0a3d91",{bg:["#e5343a","#0a3d91"],metal:"steel",band:["#f2f2f2","Pepsi·Cola","#0a3d91"],vintage:.4},"Desliza suave e longe."),ue("drpepper","Dr Pepper","rara",6,"bal","#6e1f2b",{bg:["#7a1f2b","#4f141c"],metal:"steel",arcTop:["SINCE 1891","#f2c6c0"],center:"Dr Pepper",centerColor:"#fff",centerFont:"slab",centerSize:.3,sub:["DUBLIN · TEXAS","#f2c6c0"],vintage:.4},"Vinte e três sabores."),ue("felix","Felix Orange Dry","rara",7,"bal","#e5761a",{bg:["#f79420","#c85f12"],metal:"gold",arcTop:["FELIX","#3a1c08"],emblem:"bear",emblemColor:"#3a1c08",emblemY:-.34,emblemScale:.42,center:"ORANGE",centerColor:"#3a1c08",centerFont:"slab",centerSize:.28,sub:["DRY","#3a1c08"],vintage:.5},"O gato da laranja."),ue("eskimo","Eskimo Cream","rara",7,"precise","#0a3d91",{bg:["#1a4fa0","#0a2f70"],metal:"silver",emblem:"bear",emblemColor:"#eef3ff",emblemY:-.36,emblemScale:.42,center:"Eskimo",centerColor:"#fff",centerFont:"script",centerSize:.42,sub:["CREAM SODA","#cfe0ff"],vintage:.4},"Cremosa e certeira."),ue("lemmy","Lemmy Lemonade","rara",8,"nimble","#8a6b1f",{bg:["#3a2c10","#1c1508"],metal:"gold",arcTop:["LEMMY","#f4d76a"],center:"LEMONADE",centerColor:"#f4d76a",centerFont:"slab",centerSize:.24,emblem:"lemon",emblemColor:"#f4d76a",emblemY:.42,emblemScale:.5,vintage:.55},"Azedinha e ligeira."),ue("bluebird","Blue Bird","rara",8,"glide","#6a1f45",{bg:["#7a2b52","#521636"],metal:"gold",arcTop:["ARTIFICIAL COLOR","#f2c6d8"],center:"Blue Bird",centerColor:"#f4d76a",centerFont:"serif",centerSize:.3,sub:["GRAPE SODA","#f2c6d8"],vintage:.5},"Voa raspando o chão."),ue("bigtop","Big Top","rara",9,"bouncy","#e5761a",{bg:["#f79420","#dd6412"],metal:"steel",arcTop:["ORANGE","#fff"],band:["#c0392b","BIG TOP","#fff"],sub:["SODA","#fff"],vintage:.45},"Circo laranja saltitante."),ue("applejack","Apple Jack","rara",9,"nimble","#3fae6a",{bg:["#f2d64a","#d9b21f"],metal:"steel",center:"Apple Jack",centerColor:"#1f7a3a",centerFont:"serif",centerSize:.3,emblem:"apple",emblemColor:"#3fae6a",emblemY:.42,emblemScale:.5,vintage:.4},"Maçã ligeira."),ue("jacksup","Jack's-Up","rara",10,"bal","#c0392b",{bg:["#f2f2f0","#dcdcd8"],metal:"silver",center:"Jack's-Up",centerColor:"#c0392b",centerFont:"script",centerSize:.4,emblem:"cards",emblemY:-.42,emblemScale:.55,vintage:.4},"Aposta certeira."),ue("blimey","Blimey","rara",10,"glide","#1f7a3a",{bg:["#e9e6dc","#cfc7ac"],metal:"steel",arcTop:["LEMON LIME","#1f7a3a"],center:"blimey",centerColor:"#1f7a3a",centerFont:"script",centerSize:.44,sub:["SODA","#1f7a3a"],vintage:.45},"Desliza que é uma beleza."),ue("lincoln","Lincoln Grape","rara",11,"heavy","#7c3aed",{bg:["#8a5bc0","#5a2f8a"],metal:"steel",arcTop:["LINCOLN","#fff"],center:"GRAPE",centerColor:"#fff",centerFont:"slab",centerSize:.32,sub:["SODA","#fff"],vintage:.5},"Presidencial e firme."),ue("royalpalm","Royal Palm","rara",12,"bal","#8a1220",{bg:["#a01a2a","#6a0c18"],metal:"gold",arcTop:["ROYAL PALM","#f4d76a"],center:"STRAWBERRY",centerColor:"#f4d76a",centerFont:"slab",centerSize:.2,emblem:"leaf",emblemColor:"#f4d76a",emblemY:.44,emblemScale:.4,sub:["SODA","#f4d76a"],vintage:.5},"Morango real."),ue("dilly","Dilly","rara",12,"nimble","#c0392b",{bg:["#f2ead0","#dcd2b0"],metal:"steel",center:"Dilly",centerColor:"#c0392b",centerFont:"script",centerSize:.5,sub:["FOR THIRST","#8a6b2a"],vintage:.5},"Uma gracinha ágil."),ue("chaser","Chaser","rara",13,"nimble","#1f7a3a",{bg:["#2f8a52","#155a2c"],metal:"steel",center:"Chaser",centerColor:"#f4d76a",centerFont:"script",centerSize:.5,vintage:.35},"Persegue e alcança."),ue("sport","Sport","rara",14,"bal","#c0392b",{bg:["#f2f2f0","#d8d8d4"],metal:"silver",arcTop:["SPORT","#c0392b"],center:"WINNER",centerColor:"#c0392b",centerFont:"slab",centerSize:.26,emblem:"star",emblemColor:"#c0392b",emblemY:.42,emblemScale:.4,sub:["EVERY TIME","#c0392b"],vintage:.4},"Espírito esportivo."),ue("jolt","Jolt","rara",15,"bouncy","#e5484d",{bg:["#e5343a","#b8241a"],metal:"steel",center:"JOLT",centerColor:"#fff",centerFont:"slab",centerSize:.4,emblem:"bolt",emblemColor:"#f4d76a",emblemY:-.4,emblemScale:.5,vintage:.35},"Um choque de energia."),ue("charge","Charge Up","rara",16,"nimble","#1f7a3a",{bg:["#e9e6dc","#cfc7ac"],metal:"silver",arcTop:["MISSION","#1f7a3a"],center:"CHARGE UP",centerColor:"#1f7a3a",centerFont:"block",centerSize:.24,emblem:"bolt",emblemColor:"#1f7a3a",emblemY:.42,emblemScale:.4,vintage:.4},"Carrega e dispara."),ue("stepn","Step 'N High","rara",16,"precise","#c0392b",{bg:["#eef0ea","#d0d2cc"],metal:"silver",arcTop:["STEP 'N","#c0392b"],center:"HIGH",centerColor:"#c0392b",centerFont:"slab",centerSize:.3,sub:["TO REFRESH","#c0392b"],vintage:.4},"Sobe degraus com jeito."),ue("dragon","Dragon Cream","epica",16,"heavy","#0a3d91",{bg:["#123a80","#08245a"],metal:"gold",arcTop:["DRAGON","#f4d76a"],emblem:"dragon",emblemColor:"#f4d76a",emblemY:-.06,emblemScale:.7,sub:["CREAM SODA","#f4d76a"],vintage:.5},"O dragão que empurra tudo."),ue("donaldsoda","Pato Laranja","epica",18,"bouncy","#e5761a",{bg:["#f2ead0","#dccea0"],metal:"steel",arcTop:["DONALD DUCK","#0a3d91"],emblem:"duck",emblemColor:"#fff",emblemColor2:"#f2a400",emblemY:-.32,emblemScale:.5,center:"ORANGE",centerColor:"#e5761a",centerFont:"slab",centerSize:.24,sub:["SODA","#0a3d91"],vintage:.45},"O pato mais saltitante."),ue("donaldcola","Pato Cola","epica",20,"nimble","#1f6ea0",{bg:["#2f8ac0","#155a80"],metal:"steel",arcTop:["DONALD DUCK","#f4d76a"],center:"Cola",centerColor:"#f4d76a",centerFont:"script",centerSize:.4,emblem:"duck",emblemColor:"#fff",emblemColor2:"#f2a400",emblemY:-.36,emblemScale:.6,vintage:.4},"Ágil como um pato."),ue("vegasvic","Vegas Vic","epica",22,"bal","#6e2a12",{bg:["#7a3418","#4f200c"],metal:"gold",arcTop:["VEGAS VIC","#f4d76a"],center:"ROOT BEER",centerColor:"#f4d76a",centerFont:"slab",centerSize:.26,emblem:"star",emblemColor:"#f4d76a",emblemY:.42,emblemScale:.45,vintage:.5},"O caubói da estrada."),ue("royalflush","Royal Flush","epica",24,"bal","#c0122a",{bg:["#d4142e","#8a0c1e"],metal:"gold",arcTop:["LOGANBERRY","#f4d76a"],center:"PORT",centerColor:"#f4d76a",centerFont:"slab",centerSize:.26,emblem:"cards",emblemY:-.4,emblemScale:.5,sub:["ROYAL FLUSH","#f4d76a"],vintage:.5},"A mão vencedora."),ue("strawmilk","Leite Morango","epica",26,"heavy","#c0392b",{bg:["#e07a5a","#c05a3a"],metal:"steel",arcTop:["STRAWBERRY","#fff"],center:"MILK",centerColor:"#fff",centerFont:"slab",centerSize:.34,emblem:"cherry",emblemColor:"#c0122a",emblemY:.44,emblemScale:.45,vintage:.45},"Cremosa e encorpada."),ue("brownie","Brownie","epica",28,"heavy","#4a2c12",{bg:["#5a3418","#33200c"],metal:"copper",arcTop:["BROWNIE","#e9c9a0"],arcBot:["ROOT BEER","#e9c9a0"],emblem:"bear",emblemColor:"#e9c9a0",emblemScale:.85,vintage:.55},"O duende do root beer."),ue("jurk","Jurk","epica",30,"nimble","#1f7a3a",{bg:["#e9e6dc","#cfc7ac"],metal:"steel",center:"Jurk",centerColor:"#1f7a3a",centerFont:"script",centerSize:.5,emblem:"lemon",emblemColor:"#f4d76a",emblemY:-.4,emblemScale:.45,vintage:.45},"Cítrica misteriosa."),ue("rcorange","Royal Crown","epica",32,"glide","#e5761a",{bg:["#f79420","#c85f12"],metal:"gold",arcTop:["ROYAL","#3a1c08"],center:"ORANGE",centerColor:"#3a1c08",centerFont:"slab",centerSize:.28,emblem:"crown",emblemColor:"#f4d76a",emblemY:-.42,emblemScale:.45,vintage:.45},"Corôa que desliza."),ue("slender","Slender","epica",34,"glide","#c0392b",{bg:["#c9b89a","#a89670"],metal:"copper",center:"Slender",centerColor:"#c0392b",centerFont:"script",centerSize:.46,vintage:.6},"Fininha e escorregadia."),ue("kona","Kona","epica",36,"bal","#e5a400",{bg:["#f2b400","#c98a00"],metal:"gold",arcTop:["KONA","#3a2c08"],center:"BREWING",centerColor:"#3a2c08",centerFont:"slab",centerSize:.24,emblem:"wave",emblemColor:"#0a6ea0",emblemColor2:"#0a6ea0",emblemY:.36,emblemScale:.5,vintage:.35},"Onda do Havaí."),ue("newcastle","Newcastle","epica",38,"heavy","#6a1f2b",{bg:["#7a1f2b","#4f141c"],metal:"silver",center:"BROWN ALE",centerColor:"#fff",centerFont:"slab",centerSize:.24,emblem:"star6",emblemColor:"#3fae6a",emblemColor2:"#f2c200",emblemY:-.02,emblemScale:.8,vintage:.4},"A estrela azul da cerveja."),ue("cocagold","Cola Ouro Atlanta","lendaria",30,"allround","#f2c200",{bg:["#f7d84a","#e0a800"],metal:"gold",arcTop:["DELICIOUS · REFRESHING","#7a1f10"],center:"Cola",centerColor:"#c0122a",centerFont:"script",centerSize:.44,sub:["ATLANTA","#7a1f10"],vintage:.35},"A joia dourada. Boa em tudo."),ue("duvel","Duvel","lendaria",36,"precise","#c0392b",{bg:["#f2ead0","#dcceA0"],metal:"silver",center:"Duvel",centerColor:"#c0122a",centerFont:"script",centerSize:.5,emblem:"star",emblemColor:"#c0122a",emblemY:-.42,emblemScale:.35,vintage:.3},"Diabólica na mira: controle afiado."),ue("sierra","Sierra Nevada","lendaria",42,"glide","#0f7a3a",{bg:["#e9e6dc","#cfc7ac"],metal:"gold",arcTop:["SIERRA NEVADA","#0f7a3a"],center:"PALE ALE",centerColor:"#0f7a3a",centerFont:"slab",centerSize:.22,emblem:"leaf",emblemColor:"#0f7a3a",emblemY:.36,emblemScale:.5,vintage:.35},"Desce a montanha deslizando."),ue("newbelgium","New Belgium","lendaria",48,"nimble","#e5761a",{bg:["#f2c200","#d99000"],metal:"gold",arcTop:["NEW BELGIUM","#7a2f08"],center:"BREWING",centerColor:"#7a2f08",centerFont:"slab",centerSize:.22,emblem:"ring",emblemColor:"#c0392b",emblemY:.02,emblemScale:.9,vintage:.35},"A bicicleta ágil que voa."),ue("spaten","Spaten","lendaria",55,"tank","#c0122a",{bg:["#f2f2f0","#dcdcd8"],metal:"silver",arcTop:["SPATEN","#c0122a"],center:"München",centerColor:"#c0122a",centerFont:"serif",centerSize:.3,emblem:"shield",emblemColor:"#c0122a",emblemY:-.4,emblemScale:.4,vintage:.3},"Muralha de Munique: pesa e resiste."),ue("newbelgium2","Great Lakes 30","lendaria",62,"bouncy","#5a7ab0",{bg:["#7a9ad0","#4f6ea0"],metal:"silver",arcTop:["GREAT LAKES","#fff"],center:"30",centerColor:"#fff",centerFont:"slab",centerSize:.5,sub:["EST. 1988","#dceaff"],vintage:.3},"Três décadas de quique."),ue("goldenleaf","Golden Leaf","lendaria",70,"heavy","#f2c200",{bg:["#1c1c1c","#000"],metal:"gold",arcTop:["GOLDEN LEAF","#f4d76a"],emblem:"glass",emblemColor:"#f4d76a",emblemY:-.34,emblemScale:.42,center:"WHEAT",centerColor:"#f4d76a",centerFont:"slab",centerSize:.26,vintage:.3},"A folha de ouro, pesada e forte."),ue("felixgold","Felix Dourado","lendaria",78,"bal","#f2a400",{bg:["#f7c948","#e59a12"],metal:"gold",arcTop:["FELIX","#3a1c08"],emblem:"bear",emblemColor:"#3a1c08",emblemY:.02,emblemScale:.72,sub:["ORANGE DRY","#3a1c08"],vintage:.4},"O gato lendário do ouro, equilibrado."),ue("prisma","Prisma","mitica",90,"nimble","#22d3ee",{bg:["#b8f7ff","#6a3df0"],metal:"silver",arcTop:["PRISMA","#3a1060"],emblem:"diamond",emblemColor:"#eafcff",emblemColor2:"#ff5ea8",emblemY:-.02,emblemScale:.8,sub:["ESPECTRO","#3a1060"],vintage:.15},"Ágil como a luz que se divide."),ue("aurora","Aurora Boreal","mitica",105,"glide","#2ee6a8",{bg:["#2ee6a8","#1a4fa0"],metal:"silver",arcTop:["AURORA","#eafff6"],center:"BOREAL",centerColor:"#eafff6",centerFont:"slab",centerSize:.26,emblem:"wave",emblemColor:"#eafff6",emblemColor2:"#b8f7ff",emblemY:.36,emblemScale:.5,vintage:.15},"Desliza como véu de luz no céu."),ue("vulcao","Vulcão","mitica",120,"heavy","#e5484d",{bg:["#ff7a3a","#7a0c10"],metal:"copper",arcTop:["VULCÃO","#ffd76a"],emblem:"dragon",emblemColor:"#ffd76a",emblemColor2:"#ff7a3a",emblemY:0,emblemScale:.72,sub:["MAGMA","#ffd76a"],vintage:.2},"Pesada como rocha derretida."),ue("trovao","Trovão","mitica",138,"bouncy","#f2c200",{bg:["#1a1c3a","#050614"],metal:"gold",arcTop:["TROVÃO","#ffe36a"],emblem:"bolt",emblemColor:"#ffe36a",emblemY:-.02,emblemScale:.85,sub:["TEMPESTADE","#ffe36a"],vintage:.15},"Quica com a fúria do raio."),ue("obsidiana","Obsidiana","mitica",158,"tank","#7c3aed",{bg:["#3a2c5a","#0a0612"],metal:"dark",arcTop:["OBSIDIANA","#c9a0ff"],emblem:"shield",emblemColor:"#c9a0ff",emblemColor2:"#7c3aed",emblemY:-.02,emblemScale:.7,sub:["VIDRO VULCÂNICO","#c9a0ff"],vintage:.2},"Vidro negro: pesa e não sai do lugar."),ue("infinito","Infinito","mitica",180,"allround","#ff4fa3",{bg:["#ff8fd0","#6a1fa0"],metal:"gold",arcTop:["INFINITO","#fff"],center:"∞",centerColor:"#fff",centerFont:"serif",centerSize:.6,emblem:"target",emblemColor:"#ff4fa3",emblemColor2:"#fff",emblemY:0,emblemScale:.95,vintage:.1},"A tampinha suprema. Melhor em tudo.")],gs=["#e5484d","#3b82f6","#3fae6a","#f7d046","#f59e0b","#7c3aed"],mt=n=>an.find(e=>e.id===n)||an[0],pr=n=>an.filter(e=>n>=e.unlock),vs={comum:"#9aa2ac",rara:"#3b82f6",epica:"#a855f7",lendaria:"#f5b400",mitica:"#ff4fa3"},Ql={comum:"Comum",rara:"Rara",epica:"Épica",lendaria:"Lendária",mitica:"Mítica"},rg=["comum","rara","epica","lendaria","mitica"],Ce=Math.PI*2;function og(n,e,t,i,s){if(typeof s=="string")return s;const a=n.createRadialGradient(e-i*.18,t-i*.22,i*.1,e,t,i);return a.addColorStop(0,s[0]),a.addColorStop(1,s[1]),a}function ec(n,e,t,i,s,a,r,o){n.save(),n.fillStyle=o,n.font=r,n.textAlign="center",n.textBaseline="middle";const c=[...e];let l=0;const h=c.map(f=>{const g=n.measureText(f).width+s*.02;return l+=g,g}),d=l/s;let u=a?-Math.PI/2-d/2:Math.PI/2+d/2;for(let f=0;f<c.length;f++){const g=h[f]/s;u+=(a?1:-1)*g/2,n.save(),n.translate(t+Math.cos(u)*s,i+Math.sin(u)*s),n.rotate(a?u+Math.PI/2:u-Math.PI/2),n.fillText(c[f],0,0),n.restore(),u+=(a?1:-1)*g/2}n.restore()}function lg(n,e,t,i,s){let a=i;for(n.font=`${s} ${a}px sans-serif`;n.measureText(e).width>t&&a>8;)a-=2,n.font=`${s} ${a}px sans-serif`;return a}function cg(n,e,t=!0){n.beginPath(),e.forEach((i,s)=>s?n.lineTo(i[0],i[1]):n.moveTo(i[0],i[1])),t&&n.closePath()}function _a(n,e,t,i,s,a,r=-Math.PI/2){n.beginPath();for(let o=0;o<a*2;o++){const c=o%2?s:i,l=r+o/(a*2)*Ce,h=e+Math.cos(l)*c,d=t+Math.sin(l)*c;o?n.lineTo(h,d):n.moveTo(h,d)}n.closePath()}function hg(n,e,t,i,s,a,r){n.save(),n.translate(t,i);const o=l=>{n.fillStyle=l,n.fill()},c=(l,h)=>{n.strokeStyle=l,n.lineWidth=h,n.lineJoin="round",n.lineCap="round",n.stroke()};switch(e){case"star":_a(n,0,0,s,s*.42,5),o(a);break;case"star6":_a(n,0,0,s,s*.5,6),o(a);break;case"sunburst":{for(let l=0;l<16;l++){const h=l/16*Ce;n.save(),n.rotate(h),n.beginPath(),n.moveTo(s*.5,-s*.06),n.lineTo(s*1.05,0),n.lineTo(s*.5,s*.06),n.closePath(),o(a),n.restore()}n.beginPath(),n.arc(0,0,s*.5,0,Ce),o(r||a);break}case"cherry":{n.beginPath(),n.moveTo(-s*.1,-s*.9),n.bezierCurveTo(s*.3,-s*.7,-s*.4,-s*.1,-s*.35,s*.2),c("#3c6b2e",s*.1),n.beginPath(),n.moveTo(-s*.1,-s*.9),n.bezierCurveTo(s*.4,-s*.6,s*.5,-s*.1,s*.45,s*.2),c("#3c6b2e",s*.1),n.beginPath(),n.arc(-s*.38,s*.5,s*.34,0,Ce),o(a),n.beginPath(),n.arc(s*.42,s*.45,s*.34,0,Ce),o(a),n.fillStyle="rgba(255,255,255,.5)",n.beginPath(),n.arc(-s*.48,s*.4,s*.09,0,Ce),n.arc(s*.32,s*.35,s*.09,0,Ce),n.fill();break}case"grape":{n.fillStyle=a,[[-.5,-.4,.5],[-.75,-.25,.25,.75],[-.5,0,.5],[-.25,.25],[0]].forEach((h,d)=>h.forEach(u=>{n.beginPath(),n.arc(u*s,(-.55+d*.34)*s,s*.2,0,Ce),n.fill()})),n.strokeStyle="#3c6b2e",n.lineWidth=s*.09,n.beginPath(),n.moveTo(0,-s*.75),n.lineTo(s*.2,-s*1.05),n.stroke();break}case"orange":{n.beginPath(),n.arc(0,0,s,0,Ce),o(a),n.strokeStyle="rgba(255,255,255,.55)",n.lineWidth=s*.06;for(let l=0;l<8;l++){const h=l/8*Ce;n.beginPath(),n.moveTo(0,0),n.lineTo(Math.cos(h)*s*.9,Math.sin(h)*s*.9),n.stroke()}n.beginPath(),n.arc(0,0,s*.16,0,Ce),n.fillStyle="rgba(255,255,255,.4)",n.fill();break}case"lemon":{n.save(),n.rotate(-.5),n.beginPath(),n.ellipse(0,0,s,s*.62,0,0,Ce),o(a),n.beginPath(),n.moveTo(-s,0),n.lineTo(-s*1.18,0),c(a,s*.14),n.beginPath(),n.moveTo(s,0),n.lineTo(s*1.18,0),c(a,s*.14),n.restore();break}case"apple":{n.beginPath(),n.moveTo(0,-s*.5),n.bezierCurveTo(-s*1.1,-s*1.1,-s*1.1,s*.5,0,s),n.bezierCurveTo(s*1.1,s*.5,s*1.1,-s*1.1,0,-s*.5),o(a),n.strokeStyle="#3c6b2e",n.lineWidth=s*.11,n.beginPath(),n.moveTo(0,-s*.5),n.lineTo(s*.08,-s*.95),n.stroke(),n.fillStyle="#3c6b2e",n.beginPath(),n.ellipse(s*.35,-s*.85,s*.28,s*.14,-.6,0,Ce),n.fill();break}case"bottle":{n.fillStyle=a,n.beginPath(),n.moveTo(-s*.28,-s),n.lineTo(s*.28,-s),n.lineTo(s*.28,-s*.5),n.bezierCurveTo(s*.55,-s*.3,s*.5,s*.9,s*.4,s),n.lineTo(-s*.4,s),n.bezierCurveTo(-s*.5,s*.9,-s*.55,-s*.3,-s*.28,-s*.5),n.closePath(),n.fill(),n.fillStyle="rgba(255,255,255,.3)",n.fillRect(-s*.2,-s*.2,s*.14,s*.9);break}case"duck":{n.fillStyle=a,n.beginPath(),n.arc(-s*.1,-s*.15,s*.6,0,Ce),n.fill(),n.beginPath(),n.arc(s*.4,-s*.35,s*.4,0,Ce),n.fill(),n.fillStyle=r||"#f2a400",n.beginPath(),n.moveTo(s*.7,-s*.35),n.quadraticCurveTo(s*1.25,-s*.25,s*.75,-s*.05),n.closePath(),n.fill(),n.fillStyle="#222",n.beginPath(),n.arc(s*.5,-s*.42,s*.07,0,Ce),n.fill();break}case"bear":{n.fillStyle=a,n.beginPath(),n.arc(0,s*.2,s*.7,0,Ce),n.fill(),n.beginPath(),n.arc(0,-s*.55,s*.42,0,Ce),n.fill(),n.beginPath(),n.arc(-s*.32,-s*.85,s*.16,0,Ce),n.arc(s*.32,-s*.85,s*.16,0,Ce),n.fill(),n.fillStyle="#222",n.beginPath(),n.arc(-s*.14,-s*.6,s*.06,0,Ce),n.arc(s*.14,-s*.6,s*.06,0,Ce),n.arc(0,-s*.42,s*.08,0,Ce),n.fill();break}case"clown":{n.fillStyle="#ffe0c4",n.beginPath(),n.arc(0,s*.1,s*.62,0,Ce),n.fill(),n.fillStyle=a,n.beginPath(),n.arc(0,s*.35,s*.22,0,Ce),n.fill(),n.beginPath(),n.arc(-s*.5,s*.05,s*.2,0,Ce),n.arc(s*.5,s*.05,s*.2,0,Ce),n.fill(),n.fillStyle=r||"#c0392b",n.beginPath(),n.moveTo(-s*.55,-s*.45),n.lineTo(0,-s),n.lineTo(s*.55,-s*.45),n.closePath(),n.fill(),n.fillStyle="#222",n.beginPath(),n.arc(-s*.2,s*.02,s*.06,0,Ce),n.arc(s*.2,s*.02,s*.06,0,Ce),n.fill();break}case"goat":{n.fillStyle=a,n.beginPath(),n.moveTo(0,s),n.lineTo(-s*.4,s*.2),n.lineTo(-s*.2,-s*.4),n.lineTo(0,-s*.2),n.lineTo(s*.2,-s*.4),n.lineTo(s*.4,s*.2),n.closePath(),n.fill(),n.strokeStyle=a,n.lineWidth=s*.14,n.beginPath(),n.moveTo(-s*.2,-s*.4),n.quadraticCurveTo(-s*.7,-s*.7,-s*.4,-s*1.05),n.moveTo(s*.2,-s*.4),n.quadraticCurveTo(s*.7,-s*.7,s*.4,-s*1.05),n.stroke();break}case"eagle":{n.fillStyle=a,n.beginPath(),n.moveTo(0,-s*.2),n.quadraticCurveTo(-s*1.1,-s*.7,-s*1.2,0),n.quadraticCurveTo(-s*.6,0,0,s*.4),n.quadraticCurveTo(s*.6,0,s*1.2,0),n.quadraticCurveTo(s*1.1,-s*.7,0,-s*.2),n.fill(),n.beginPath(),n.arc(0,-s*.45,s*.28,0,Ce),n.fill(),n.fillStyle=r||"#f2a400",n.beginPath(),n.moveTo(0,-s*.3),n.lineTo(s*.18,-s*.1),n.lineTo(-s*.18,-s*.1),n.closePath(),n.fill();break}case"diamond":{n.beginPath(),n.moveTo(0,-s),n.lineTo(s*.7,0),n.lineTo(0,s),n.lineTo(-s*.7,0),n.closePath(),o(a),n.fillStyle="rgba(255,255,255,.35)",n.beginPath(),n.moveTo(0,-s),n.lineTo(s*.35,-s*.5),n.lineTo(0,0),n.lineTo(-s*.35,-s*.5),n.closePath(),n.fill();break}case"cards":{const l=(h,d)=>{n.save(),n.translate(h,0),n.rotate(d),n.fillStyle="#fff",n.strokeStyle="#c0392b",n.lineWidth=s*.04,n.beginPath(),n.rect(-s*.32,-s*.5,s*.64,s),n.fill(),n.stroke(),n.fillStyle="#c0392b",_a(n,0,-s*.22,s*.16,s*.07,5),n.fill(),n.restore()};l(-s*.28,-.28),l(s*.28,.28),l(0,0);break}case"bolt":{n.fillStyle=a,cg(n,[[-s*.1,-s],[s*.5,-s*.15],[s*.1,-s*.15],[s*.4,s],[-s*.5,-s*.05],[-s*.05,-s*.05]]),n.fill();break}case"crown":{n.fillStyle=a,n.beginPath(),n.moveTo(-s,s*.5),n.lineTo(-s,-s*.3),n.lineTo(-s*.5,s*.1),n.lineTo(0,-s*.6),n.lineTo(s*.5,s*.1),n.lineTo(s,-s*.3),n.lineTo(s,s*.5),n.closePath(),n.fill();break}case"buddha":{n.fillStyle=a,n.beginPath(),n.arc(0,s*.35,s*.75,0,Math.PI),n.fill(),n.beginPath(),n.arc(0,-s*.35,s*.4,0,Ce),n.fill(),n.fillStyle="rgba(0,0,0,.25)",n.beginPath(),n.arc(0,s*.4,s*.45,.2,Math.PI-.2),n.stroke();break}case"wave":{n.strokeStyle=a,n.lineWidth=s*.34,n.beginPath(),n.arc(-s*.2,s*.1,s*.7,-Math.PI*.85,Math.PI*.2),n.stroke(),n.fillStyle=r||a;for(const[l,h]of[[-.7,.5],[-.3,.7],[.2,.6]])n.beginPath(),n.arc(l*s,h*s,s*.12,0,Ce),n.fill();break}case"key":{n.strokeStyle=a,n.lineWidth=s*.18,n.beginPath(),n.arc(-s*.5,0,s*.4,0,Ce),n.stroke(),n.beginPath(),n.moveTo(-s*.15,0),n.lineTo(s*.9,0),n.moveTo(s*.7,0),n.lineTo(s*.7,s*.35),n.moveTo(s*.9,0),n.lineTo(s*.9,s*.45),n.stroke();break}case"shield":{n.fillStyle=a,n.beginPath(),n.moveTo(0,-s),n.lineTo(s*.8,-s*.6),n.lineTo(s*.7,s*.3),n.quadraticCurveTo(s*.4,s,0,s*1.05),n.quadraticCurveTo(-s*.4,s,-s*.7,s*.3),n.lineTo(-s*.8,-s*.6),n.closePath(),n.fill();break}case"heart":{n.fillStyle=a,n.beginPath(),n.moveTo(0,s*.9),n.bezierCurveTo(-s*1.3,-s*.1,-s*.5,-s,0,-s*.35),n.bezierCurveTo(s*.5,-s,s*1.3,-s*.1,0,s*.9),n.fill();break}case"glass":{n.fillStyle=a,n.beginPath(),n.moveTo(-s*.5,-s*.7),n.lineTo(s*.5,-s*.7),n.lineTo(s*.32,s*.8),n.lineTo(-s*.32,s*.8),n.closePath(),n.fill(),n.fillStyle="#fff",n.beginPath(),n.ellipse(0,-s*.7,s*.5,s*.16,0,0,Ce),n.fill();break}case"snow":{n.strokeStyle=a,n.lineWidth=s*.1;for(let l=0;l<6;l++)n.save(),n.rotate(l/6*Ce),n.beginPath(),n.moveTo(0,0),n.lineTo(0,-s),n.moveTo(0,-s*.6),n.lineTo(s*.25,-s*.8),n.moveTo(0,-s*.6),n.lineTo(-s*.25,-s*.8),n.stroke(),n.restore();break}case"leaf":{n.fillStyle=a,n.beginPath(),n.moveTo(0,s),n.bezierCurveTo(-s,s*.2,-s*.6,-s,0,-s),n.bezierCurveTo(s*.6,-s,s,s*.2,0,s),n.fill(),n.strokeStyle="rgba(0,0,0,.2)",n.lineWidth=s*.06,n.beginPath(),n.moveTo(0,s),n.lineTo(0,-s),n.stroke();break}case"pinup":{n.fillStyle=a,n.beginPath(),n.arc(0,-s*.5,s*.32,0,Ce),n.fill(),n.beginPath(),n.moveTo(-s*.3,-s*.2),n.quadraticCurveTo(0,s*.1,s*.3,-s*.2),n.quadraticCurveTo(s*.6,s*.7,0,s),n.quadraticCurveTo(-s*.6,s*.7,-s*.3,-s*.2),n.fill();break}case"dragon":{n.fillStyle=a,n.beginPath(),n.moveTo(-s,s*.3),n.quadraticCurveTo(-s*.2,-s*.2,s*.3,-s*.5),n.quadraticCurveTo(s,-s,s*.9,-s*.1),n.quadraticCurveTo(s*.4,s*.2,s*.5,s*.8),n.quadraticCurveTo(0,s*.3,-s,s*.3),n.fill();break}case"thumb":{n.fillStyle=a,n.beginPath(),n.roundRect(-s*.25,-s*.1,s*.5,s,s*.1),n.fill(),n.beginPath(),n.roundRect(-s*.55,-s*.1,s*.32,s*.55,s*.14),n.fill(),n.beginPath(),n.arc(s*.05,-s*.3,s*.34,Math.PI,Ce),n.fill();break}case"ring":{n.strokeStyle=a,n.lineWidth=s*.16,n.beginPath(),n.arc(0,0,s*.8,0,Ce),n.stroke();break}case"target":{for(let l=3;l>=1;l--)n.beginPath(),n.arc(0,0,s*l/3,0,Ce),n.fillStyle=l%2?a:r||"#fff",n.fill();break}default:n.beginPath(),n.arc(0,0,s*.6,0,Ce),o(a);break}n.restore()}const dg={steel:["#f2f4f6","#b9c0c7","#7c848c"],silver:["#ffffff","#c8ccd2","#868c94"],gold:["#fff3c0","#e8be55","#9c7818"],copper:["#f4c9a0","#c67e46","#7c471f"],dark:["#6b7078","#3a3e44","#1c1f24"]};function wt(n,e=360){const t=document.createElement("canvas");t.width=t.height=e;const i=t.getContext("2d"),s=e/2,a=e/2,r=e*.5-1,o=r*.82,c=dg[n.metal||"steel"],l=21;for(let u=0;u<l;u++){const f=u/l*Ce-Math.PI/2,g=(u+1)/l*Ce-Math.PI/2,v=(f+g)/2;i.beginPath(),i.moveTo(s+Math.cos(f)*o,a+Math.sin(f)*o),i.arc(s,a,o,f,g),i.arc(s,a,r,g,f,!0),i.closePath();const m=.5+.5*Math.cos(v+.7),p=i.createLinearGradient(s+Math.cos(v)*o,a+Math.sin(v)*o,s+Math.cos(v)*r,a+Math.sin(v)*r);p.addColorStop(0,c[1]),p.addColorStop(1,m>.5?c[0]:c[2]),i.fillStyle=p,i.fill(),i.strokeStyle="rgba(0,0,0,0.18)",i.lineWidth=e*.004,i.beginPath(),i.moveTo(s+Math.cos(f)*o,a+Math.sin(f)*o),i.lineTo(s+Math.cos(f)*r,a+Math.sin(f)*r),i.stroke()}if(i.beginPath(),i.arc(s,a,o,0,Ce),i.strokeStyle="rgba(0,0,0,0.28)",i.lineWidth=e*.01,i.stroke(),i.save(),i.beginPath(),i.arc(s,a,o-1,0,Ce),i.clip(),i.fillStyle=og(i,s,a,o,n.bg),i.fillRect(0,0,e,e),n.fringe&&(i.strokeStyle=n.fringe,i.lineWidth=o*.14,i.beginPath(),i.arc(s,a,o*.9,0,Ce),i.stroke()),n.rings){i.strokeStyle=n.rings,i.lineWidth=e*.006;for(const u of[.62,.7])i.beginPath(),i.arc(s,a,o*u,0,Ce),i.stroke()}if(n.emblem&&hg(i,n.emblem,s,a+(n.emblemY??0)*o,o*.34*(n.emblemScale??1),n.emblemColor||"#c0392b",n.emblemColor2||""),n.stars){i.fillStyle=n.starColor||"#fff";for(let u=0;u<n.stars;u++){const f=-Math.PI/2+u/n.stars*Ce;_a(i,s+Math.cos(f)*o*.6,a+Math.sin(f)*o*.6,o*.07,o*.03,5),i.fill()}}if(n.band){const[u,f,g]=n.band;if(i.fillStyle=u,i.fillRect(s-o,a-o*.26,o*2,o*.52),f){const v=lg(i,f,o*1.7,o*.34,"800");i.fillStyle=g,i.font=`800 ${v}px sans-serif`,i.textAlign="center",i.textBaseline="middle",i.fillText(f,s,a+o*.01)}}if(n.arcTop&&ec(i,n.arcTop[0],s,a,o*.82,!0,`800 ${o*.15}px sans-serif`,n.arcTop[1]),n.arcBot&&ec(i,n.arcBot[0],s,a,o*.82,!1,`800 ${o*.13}px sans-serif`,n.arcBot[1]),n.center){const u=n.centerFont||"block",f=u==="script"?"italic 900":u==="serif"?"bold":u==="slab"?"900":"800",g=u==="script"?"'Segoe Script','Brush Script MT',cursive":u==="serif"?"Georgia,serif":"sans-serif";let v=(n.centerSize??.42)*o;for(i.font=`${f} ${v}px ${g}`;i.measureText(n.center).width>o*1.55&&v>8;)v-=2,i.font=`${f} ${v}px ${g}`;i.fillStyle=n.centerColor||"#fff",i.textAlign="center",i.textBaseline="middle";const m=a+(n.band?0:n.arcBot||n.sub?-o*.05:0);u==="script"?(i.save(),i.translate(s,m),i.transform(1,0,-.18,1,0,0),i.fillText(n.center,0,0),i.restore()):i.fillText(n.center,s,m)}n.sub&&(i.fillStyle=n.sub[1],i.font=`700 ${o*.13}px sans-serif`,i.textAlign="center",i.textBaseline="middle",i.fillText(n.sub[0],s,a+o*.42));const h=n.vintage??.35;if(h>0){for(let f=0;f<40*h;f++)i.globalAlpha=.05+Math.random()*.12,i.fillStyle=Math.random()<.5?"#3a2a12":"#fff",i.beginPath(),i.arc(s+(Math.random()-.5)*o*2,a+(Math.random()-.5)*o*2,o*(.01+Math.random()*.05),0,Ce),i.fill();i.globalAlpha=1,i.strokeStyle="rgba(255,255,255,0.12)",i.lineWidth=1;for(let f=0;f<6*h;f++){i.beginPath();const g=Math.random()*Ce,v=Math.random()*o;i.moveTo(s+Math.cos(g)*v,a+Math.sin(g)*v),i.lineTo(s+Math.cos(g)*(v+o*.3),a+Math.sin(g)*(v+o*.3)),i.stroke()}const u=i.createRadialGradient(s,a,o*.4,s,a,o);u.addColorStop(0,"rgba(0,0,0,0)"),u.addColorStop(1,`rgba(30,18,6,${.14+h*.22})`),i.fillStyle=u,i.fillRect(0,0,e,e)}i.restore();const d=i.createLinearGradient(0,0,e*.7,e*.7);return d.addColorStop(0,"rgba(255,255,255,0.28)"),d.addColorStop(.35,"rgba(255,255,255,0.05)"),d.addColorStop(1,"rgba(255,255,255,0)"),i.save(),i.beginPath(),i.arc(s,a,r,0,Ce),i.clip(),i.fillStyle=d,i.fillRect(0,0,e,e),i.restore(),t}const mr=new Map;function ug(n,e){if(mr.has(n))return mr.get(n);const t=new Pa(wt(e,384));return t.colorSpace=qt,t.anisotropy=8,mr.set(n,t),t}const ca=.5;class fg{constructor(e){this.group=new ln;const t=mt(e.skin),i=new Re(new Fn(e.radius,e.radius*.96,ca,40),new gt({color:t.side,roughness:.45,metalness:.25}));i.position.y=ca/2,i.castShadow=!0,this.group.add(i);const s=new Re(new as(e.radius,.07,8,40),new gt({color:t.ring,roughness:.5,metalness:.3}));s.rotation.x=Math.PI/2,s.position.y=ca-.03,this.group.add(s),this.top=new Re(new Dn(e.radius*.99,44),new gt({map:ug(t.id,t.art),roughness:.42,metalness:.25,transparent:!0})),this.top.rotation.x=-Math.PI/2,this.top.position.y=ca+.005,this.group.add(this.top),this.ringHi=new Re(new as(e.radius+.35,.09,8,32),new kt({color:16777215,transparent:!0,opacity:.9,blending:xi,depthWrite:!1})),this.ringHi.rotation.x=-Math.PI/2,this.ringHi.position.y=.05,this.ringHi.visible=!1,this.group.add(this.ringHi)}update(e,t,i){this.group.visible=!0;const s=e.moving?Math.abs(Math.sin(t*20))*.03:Math.sin(t*2+e.bob)*.015;this.group.position.set(e.pos.x,s+(e.z||0),e.pos.y),this.group.rotation.y=e.angle,e.airborne?this.group.rotation.x=Math.sin(t*10)*.25:this.group.rotation.x=0;const a=(1+e.hitFlash*.12)*(1+(e.z||0)*.05);if(this.group.scale.set(a,1-e.hitFlash*.1,a),this.ringHi.visible=i&&!e.finished,i){const r=1+Math.sin(t*6)*.06;this.ringHi.scale.set(r,r,r),this.ringHi.material.opacity=.5+Math.sin(t*6)*.25}}}class pg{constructor(){this.group=new ln,this.views=[]}build(e){this.group.clear(),this.views=[];for(const t of e){const i=new fg(t);this.views.push(i),this.group.add(i.group)}}update(e,t,i){for(let s=0;s<e.length;s++)this.views[s]?.update(e[s],t,e[s].id===i)}}function mg(){const e=document.createElement("canvas");e.width=e.height=64;const t=e.getContext("2d"),i=t.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);return i.addColorStop(0,"rgba(255,255,255,1)"),i.addColorStop(.6,"rgba(255,255,255,0.6)"),i.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=i,t.fillRect(0,0,64,64),new Pa(e)}class gg{constructor(){this.cap=700,this.ps=[];const e=new Ut;this.pos=new Float32Array(this.cap*3),this.col=new Float32Array(this.cap*3),this.siz=new Float32Array(this.cap),e.setAttribute("position",new Zt(this.pos,3)),e.setAttribute("color",new Zt(this.col,3)),e.setAttribute("size",new Zt(this.siz,1));const t=new jc({size:.6,map:mg(),vertexColors:!0,transparent:!0,depthWrite:!1,sizeAttenuation:!0,blending:Mi});this.points=new O0(e,t),this.points.frustumCulled=!1}emit(e,t,i,s,a,r,o,c,l,h){this.ps.length>=this.cap&&this.ps.shift(),this.ps.push({x:e,y:t,z:i,vx:s,vy:a,vz:r,life:o,max:o,size:c,grav:l,r:h.r,g:h.g,b:h.b})}dust(e,t,i=6,s="#d8c090"){const a=new ze(s);for(let r=0;r<i;r++)this.emit(e,.1,t,(Math.random()-.5)*2,Math.random()*1.5+.5,(Math.random()-.5)*2,.5+Math.random()*.4,.6+Math.random()*.5,-1.2,a)}impact(e,t,i,s="#fff4d0"){const a=new ze(s),r=Math.min(18,5+i);for(let o=0;o<r;o++){const c=Math.random()*6.28,l=2+Math.random()*i*.5;this.emit(e,.3,t,Math.cos(c)*l,1+Math.random()*2,Math.sin(c)*l,.35+Math.random()*.3,.35,-3,a)}}skid(e,t){this.emit(e,.05,t,0,0,0,.9,.5,0,new ze("#00000022"))}confetti(e,t){const i=["#e5484d","#3b82f6","#3fae6a","#f7d046","#f59e0b","#7c3aed","#ffffff"];for(let s=0;s<160;s++){const a=new ze(i[s%i.length]);this.emit(e+(Math.random()-.5)*20,14+Math.random()*6,t+(Math.random()-.5)*20,(Math.random()-.5)*3,-2-Math.random()*2,(Math.random()-.5)*3,2.4+Math.random()*1.5,.7,-.6,a)}}update(e){for(let s=this.ps.length-1;s>=0;s--){const a=this.ps[s];if(a.life-=e,a.life<=0){this.ps.splice(s,1);continue}a.vy+=a.grav*e,a.x+=a.vx*e,a.y+=a.vy*e,a.z+=a.vz*e,a.y<.02&&(a.y=.02,a.vy=0,a.vx*=.7,a.vz*=.7)}const t=Math.min(this.ps.length,this.cap);for(let s=0;s<t;s++){const a=this.ps[s],r=a.life/a.max;this.pos[s*3]=a.x,this.pos[s*3+1]=a.y,this.pos[s*3+2]=a.z,this.col[s*3]=a.r,this.col[s*3+1]=a.g,this.col[s*3+2]=a.b,this.siz[s]=a.size*r}for(let s=t;s<this.cap;s++)this.siz[s]=0;const i=this.points.geometry;i.getAttribute("position").needsUpdate=!0,i.getAttribute("color").needsUpdate=!0,i.getAttribute("size").needsUpdate=!0}}class vg{constructor(){this.group=new ln,this.mat=new kt({color:3394645,transparent:!0,opacity:.9}),this.shaft=new Re(new sn(1,.5),this.mat),this.shaft.rotation.x=-Math.PI/2,this.head=new Re(new Dn(.9,3),this.mat),this.head.rotation.x=-Math.PI/2,this.ring=new Re(new as(1.1,.08,8,28),new kt({color:16777215,transparent:!0,opacity:.6})),this.ring.rotation.x=-Math.PI/2;const e=new B0({color:16777215,dashSize:.4,gapSize:.3,transparent:!0,opacity:.7}),t=new Ut().setFromPoints([new k,new k]);this.pull=new k0(t,e),this.pull.computeLineDistances(),this.group.add(this.shaft,this.head,this.ring,this.pull),this.group.visible=!1}set(e,t,i,s,a){this.group.visible=!0;const r=Math.atan2(s,i),o=2+a*12,c=new ze().setHSL(.33*(1-a),.75,.5);this.mat.color.copy(c),this.shaft.position.set(e+Math.cos(r)*(o/2+1.1),.12,t+Math.sin(r)*(o/2+1.1)),this.shaft.scale.set(o,1,1),this.shaft.rotation.z=0,this.shaft.rotation.y=0,this.shaft.rotation.set(-Math.PI/2,0,-r),this.head.position.set(e+Math.cos(r)*(o+1.4),.12,t+Math.sin(r)*(o+1.4)),this.head.rotation.set(-Math.PI/2,0,-r-Math.PI/2),this.head.scale.setScalar(.7+a*.6),this.ring.position.set(e,.1,t);const l=[new k(e,.15,t),new k(e-Math.cos(r)*o*.6,.15,t-Math.sin(r)*o*.6)];this.pull.geometry.setFromPoints(l),this.pull.computeLineDistances()}hide(){this.group.visible=!1}}const de=(n=0,e=0)=>({x:n,y:e}),en=(n,e)=>({x:n.x-e.x,y:n.y-e.y}),No=(n,e)=>({x:n.x*e,y:n.y*e}),rn=n=>Math.hypot(n.x,n.y),_g=(n,e)=>Math.hypot(n.x-e.x,n.y-e.y),Wt=n=>{const e=Math.hypot(n.x,n.y)||1;return{x:n.x/e,y:n.y/e}},Qn=(n,e,t)=>n<e?e:n>t?t:n,Jc={sidewalk:{fric:4.5,drag:.15},chalk:{fric:5,drag:.15},cardboard:{fric:8,drag:.35},dirt:{fric:9.5,drag:.45},sand:{fric:17,drag:.9},grass:{fric:20,drag:1.1},mud:{fric:30,drag:1.8},water:{fric:7,drag:.5},ramp:{fric:6,drag:.2},push:{fric:11,drag:.5},out:{fric:24,drag:1}},xg={weight:1,slide:1,stability:1,bounce:1,control:1,power:1,grip:1};function bg(n,e,t,i,s,a){return{id:n,name:e,skin:t,isAI:s,ai:a,stats:{...i},radius:.82,pos:de(),vel:de(),z:0,vz:0,airborne:!1,angle:Math.random()*6.28,angVel:0,bob:Math.random()*6.28,progress:0,checkpoint:0,cpPos:de(),turnStart:de(),preFlick:de(),resetTo:de(),consumed:new Set,flicksLeft:3,bonusFlicks:0,special10:!1,bombed:!1,holed:!1,skipTurns:0,finished:!1,place:0,lap:0,moving:!1,hitFlash:0,team:-1,item:null,shield:!1,boostNext:1,eliminated:!1,itemFlash:0}}const yg=.42,Qc=27;function gr(n,e,t){const i=t.x-e.x,s=t.y-e.y,a=i*i+s*s||1e-6;let r=Qn(((n.x-e.x)*i+(n.y-e.y)*s)/a,0,1);const o=e.x+i*r,c=e.y+s*r;return{d:Math.hypot(n.x-o,n.y-c),t:r,cx:o,cy:c}}function Mg(n,e,t,i){const s=(l,h,d)=>(l.x-h.x)*(d.y-h.y)-(l.y-h.y)*(d.x-h.x),a=s(t,i,n),r=s(t,i,e),o=s(n,e,t),c=s(n,e,i);return a>0!=r>0&&o>0!=c>0}class eh{constructor(e){this.arcs=[0],this.total=0,this.cell=5,this.cols=0,this.rows=0,this.grid=[],this.def=e;let t=0;for(let s=1;s<e.path.length;s++)t+=Math.hypot(e.path[s].x-e.path[s-1].x,e.path[s].y-e.path[s-1].y),this.arcs.push(t);this.total=t,this.cols=Math.ceil(e.w/this.cell)+1,this.rows=Math.ceil(e.h/this.cell)+1,this.grid=Array.from({length:this.cols*this.rows},()=>[]);const i=Math.max(...e.half)+2;for(let s=1;s<e.path.length;s++){const a=e.path[s-1],r=e.path[s],o=Math.min(a.x,r.x)-i,c=Math.max(a.x,r.x)+i,l=Math.min(a.y,r.y)-i,h=Math.max(a.y,r.y)+i;for(let d=Math.floor(l/this.cell);d<=Math.floor(h/this.cell);d++)for(let u=Math.floor(o/this.cell);u<=Math.floor(c/this.cell);u++)u<0||d<0||u>=this.cols||d>=this.rows||this.grid[d*this.cols+u].push(s)}}halfAt(e,t){const i=this.def.half;return i[e-1]*(1-t)+i[Math.min(e,i.length-1)]*t}nearest(e){const t=Qn(Math.floor(e.x/this.cell),0,this.cols-1),i=Qn(Math.floor(e.y/this.cell),0,this.rows-1);let s=this.grid[i*this.cols+t],a=1/0,r=0,o=this.def.half[0];if((l=>{for(const h of l){const d=gr(e,this.def.path[h-1],this.def.path[h]);d.d<a&&(a=d.d,r=this.arcs[h-1]+d.t*(this.arcs[h]-this.arcs[h-1]),o=this.halfAt(h,d.t))}})(s),a===1/0)for(let l=1;l<this.def.path.length;l++){const h=gr(e,this.def.path[l-1],this.def.path[l]);h.d<a&&(a=h.d,r=this.arcs[l-1]+h.t*(this.arcs[l]-this.arcs[l-1]),o=this.halfAt(l,h.t))}return{d:a,arc:r,half:o}}progressOf(e){return this.nearest(e).arc}atArc(e){const t=this.def.path;e=Qn(e,0,this.total);let i=1;for(;i<t.length-1&&this.arcs[i]<e;)i++;const s=this.arcs[i]-this.arcs[i-1]||1,a=Qn((e-this.arcs[i-1])/s,0,1),r=t[i-1],o=t[i];return{p:de(r.x+(o.x-r.x)*a,r.y+(o.y-r.y)*a),tan:{x:(o.x-r.x)/s,y:(o.y-r.y)/s}}}inPad(e){for(const t of this.def.pads)if((e.x-t.x)**2+(e.y-t.y)**2<=t.r*t.r)return!0;return!1}surfaceAt(e){if(e.x<0||e.y<0||e.x>this.def.w||e.y>this.def.h)return"out";const t=this.nearest(e);if(!(t.d<=t.half||this.inPad(e)))return"out";let s=this.def.ground;for(const a of this.def.patches)a.r!=null?(e.x-a.x)**2+(e.y-a.y)**2<=a.r*a.r&&(s=a.surface):a.hw!=null&&a.hh!=null&&Math.abs(e.x-a.x)<=a.hw&&Math.abs(e.y-a.y)<=a.hh&&(s=a.surface);return s}patchAt(e){let t=null;for(const i of this.def.patches)i.r!=null?(e.x-i.x)**2+(e.y-i.y)**2<=i.r*i.r&&(t=i):i.hw!=null&&i.hh!=null&&Math.abs(e.x-i.x)<=i.hw&&Math.abs(e.y-i.y)<=i.hh&&(t=i);return t}collideWalls(e,t,i,s){let a=null;const r=(o,c,l)=>{e.x+=o*l,e.y+=c*l;const h=t.x*o+t.y*c;h<0&&(t.x-=(1+s)*h*o,t.y-=(1+s)*h*c),a={x:o,y:c}};for(const o of this.def.walls){const c=gr(e,o.a,o.b);if(c.d<i){let l=e.x-c.cx,h=e.y-c.cy;const d=Math.hypot(l,h)||1;r(l/d,h/d,i-c.d+.01)}}return a}obstacleAt(e,t){for(const i of this.def.obstacles){const s=i.r+(i.type==="stone"?t:t*.5);if((e.x-i.x)**2+(e.y-i.y)**2<=s*s)return i}return null}crossedFinish(e,t){return Mg(e,t,this.def.finish[0],this.def.finish[1])}}const Sg=34,Eg=6;function th(n){return n.some(e=>(e.moving||e.airborne)&&!e.finished)}function nh(n,e,t){const i=[],s=e.def;for(const a of n){if(a.hitFlash=Math.max(0,a.hitFlash-t*4),a.finished||!a.moving&&!a.airborne)continue;const r=de(a.pos.x,a.pos.y);if(a.airborne){if(a.pos.x+=a.vel.x*t,a.pos.y+=a.vel.y*t,a.vz-=Sg*t,a.z+=a.vz*t,a.angle+=7*t,a.progress>e.total*.72&&e.crossedFinish(r,a.pos)){a.finished=!0,a.vel=de(),a.moving=!1,a.airborne=!1,a.z=0,i.push({type:"finish",capId:a.id,x:a.pos.x,y:a.pos.y,power:0});continue}a.z<=0&&(a.z=0,a.airborne=!1,a.vel=No(a.vel,Math.min(.92,.7+.14*a.stats.stability)),i.push({type:"land",capId:a.id,x:a.pos.x,y:a.pos.y,power:rn(a.vel)})),a.pos.x>=0&&a.pos.y>=0&&a.pos.x<=s.w&&a.pos.y<=s.h&&(a.progress=e.progressOf(a.pos));continue}const o=e.surfaceAt(a.pos),c=Jc[o],l=e.patchAt(a.pos);if(o==="ramp"){const f=l?.dir!=null?{x:Math.cos(l.dir),y:Math.sin(l.dir)}:Wt(a.vel);a.vel.x+=f.x*30*t,a.vel.y+=f.y*30*t}else if(o==="push"){const f=l?.dir!=null?{x:Math.cos(l.dir),y:Math.sin(l.dir)}:{x:-a.vel.x,y:-a.vel.y};a.vel.x=a.vel.x*.93+f.x*30*t,a.vel.y=a.vel.y*.93+f.y*30*t}else if(o==="water"){const f=l?.dir!=null?{x:Math.cos(l.dir),y:Math.sin(l.dir)}:{x:0,y:0};a.vel.x+=f.x*7*t,a.vel.y+=f.y*7*t}const h=rn(a.vel);if(h>0){const f=a.stats,g=c.fric>12,v=g?1+(f.weight-1)*.55:1,m=g?f.power*f.power:1,p=c.fric*v/(f.slide*m);let _=h-p*t;const y=c.drag/(.7+.3*f.slide)+(f.control-1)*(h<6?.85:.12);_*=1-Math.min(.92,Math.max(0,y)*t),_<0&&(_=0);const M=Wt(a.vel);a.vel.x=M.x*_,a.vel.y=M.y*_}a.pos.x+=a.vel.x*t,a.pos.y+=a.vel.y*t;const d=rn(a.vel);a.angVel=d*.9*(1/a.stats.stability),a.angle+=a.angVel*t,e.collideWalls(a.pos,a.vel,a.radius,.42*a.stats.bounce)&&(i.push({type:"wall",capId:a.id,x:a.pos.x,y:a.pos.y,power:rn(a.vel)}),a.hitFlash=1);for(let f=0;f<s.obstacles.length;f++){const g=s.obstacles[f],v=g.r+(g.type==="stone"?a.radius:a.radius*.55),m=a.pos.x-g.x,p=a.pos.y-g.y;if(!(m*m+p*p>v*v)){if(g.type==="jump"){const _=g.dir!=null?{x:Math.cos(g.dir),y:Math.sin(g.dir)}:Wt(a.vel),y=a.vel.x*_.x+a.vel.y*_.y;if(y>Eg){a.airborne=!0,a.z=.02,a.vz=Math.min(14,6+y*.5),a.vel.x=(a.vel.x*.55+_.x*y*.5)*1.12,a.vel.y=(a.vel.y*.55+_.y*y*.5)*1.12,i.push({type:"ramp",capId:a.id,x:g.x,y:g.y,power:y});break}continue}if(g.type==="stone"){const _=Math.hypot(m,p)||1,y=m/_,M=p/_,C=v-_;a.pos.x+=y*C,a.pos.y+=M*C;const w=a.vel.x*y+a.vel.y*M;if(w<0){const A=1+.45*a.stats.bounce;a.vel.x-=A*w*y,a.vel.y-=A*w*M}i.push({type:"stone",capId:a.id,x:g.x,y:g.y,power:d}),a.hitFlash=1}else if(g.type==="hole"){if(a.shield){a.shield=!1,i.push({type:"item",capId:a.id,x:g.x,y:g.y,power:-1});continue}a.pos.x=a.cpPos.x,a.pos.y=a.cpPos.y,a.vel=de(),a.moving=!1,i.push({type:"hole",capId:a.id,x:g.x,y:g.y,power:0});break}else if(g.type==="bomb"){a.pos.x=a.cpPos.x,a.pos.y=a.cpPos.y,a.vel=de(),a.moving=!1,i.push({type:"bomb",capId:a.id,x:g.x,y:g.y,power:0});break}else g.type==="bonus"?a.consumed.has(f)||(a.consumed.add(f),i.push({type:"bonus",capId:a.id,x:g.x,y:g.y,power:0,obsIdx:f,n:g.n||1})):g.type==="item"&&(a.consumed.has(f)||(a.consumed.add(f),i.push({type:"item",capId:a.id,x:g.x,y:g.y,power:0,obsIdx:f})))}}if(a.moving){if(e.surfaceAt(a.pos)==="out"){if(a.shield){a.shield=!1,a.pos.x=r.x,a.pos.y=r.y,a.vel=de(),a.moving=!1,i.push({type:"item",capId:a.id,x:r.x,y:r.y,power:-1});continue}a.pos.x=a.resetTo.x,a.pos.y=a.resetTo.y,a.vel=de(),a.moving=!1,i.push({type:"out",capId:a.id,x:r.x,y:r.y,power:0});continue}if(a.progress>e.total*.72&&e.crossedFinish(r,a.pos)){a.finished=!0,a.vel=de(),a.moving=!1,i.push({type:"finish",capId:a.id,x:a.pos.x,y:a.pos.y,power:0});continue}a.progress=e.progressOf(a.pos),rn(a.vel)<yg&&(a.vel=de(),a.moving=!1,i.push({type:"rest",capId:a.id,x:a.pos.x,y:a.pos.y,power:0}))}}return Tg(n,i),i}function Tg(n,e){for(let t=0;t<n.length;t++)for(let i=t+1;i<n.length;i++){const s=n[t],a=n[i];if(s.finished||a.finished)continue;const r=a.pos.x-s.pos.x,o=a.pos.y-s.pos.y,c=s.radius+a.radius,l=r*r+o*o;if(l>c*c||l<1e-6)continue;const h=Math.sqrt(l),d=r/h,u=o/h,f=c-h,g=Math.pow(s.stats.weight,1.6),v=Math.pow(a.stats.weight,1.6),m=g+v;s.pos.x-=d*f*(v/m),s.pos.y-=u*f*(v/m),a.pos.x+=d*f*(g/m),a.pos.y+=u*f*(g/m);const p=a.vel.x-s.vel.x,_=a.vel.y-s.vel.y,y=p*d+_*u;if(y>0)continue;const M=.55*((s.stats.bounce+a.stats.bounce)/2),C=rn(s.vel)>=rn(a.vel)?s.stats.power:a.stats.power,w=-(1+M)*y/(1/g+1/v)*C,A=w*d,R=w*u;s.vel.x-=A/g/s.stats.grip,s.vel.y-=R/g/s.stats.grip,a.vel.x+=A/v/a.stats.grip,a.vel.y+=R/v/a.stats.grip;const q=Math.abs(y);q>1.5&&(s.moving||(s.moving=!0),a.moving||(a.moving=!0),s.hitFlash=1,a.hitFlash=1,e.push({type:"capHit",capId:s.id,otherId:a.id,x:(s.pos.x+a.pos.x)/2,y:(s.pos.y+a.pos.y)/2,power:q}))}}const Ct=["cauteloso","agressivo","tecnico","caotico","rival"],ih={cauteloso:"Cautelosa",agressivo:"Agressiva",tecnico:"Técnica",caotico:"Caótica",rival:"Rival"},tc={cauteloso:{lookahead:16,powBias:1,risk:1.2,outPenalty:300,spread:.16,noise:.01,rival:0,offense:0},agressivo:{lookahead:23,powBias:1.14,risk:.55,outPenalty:190,spread:.24,noise:.026,rival:.25,offense:.8},tecnico:{lookahead:19,powBias:1.06,risk:.9,outPenalty:235,spread:.18,noise:.006,rival:0,offense:.1},caotico:{lookahead:15,powBias:1.06,risk:.7,outPenalty:170,spread:.34,noise:.08,rival:.15,offense:.35},rival:{lookahead:20,powBias:1.1,risk:.75,outPenalty:225,spread:.2,noise:.014,rival:.6,offense:1}};function nc(n){return{...n,pos:de(n.pos.x,n.pos.y),vel:de(),z:0,vz:0,airborne:!1,cpPos:de(n.cpPos.x,n.cpPos.y),turnStart:de(n.turnStart.x,n.turnStart.y),resetTo:de(n.pos.x,n.pos.y),preFlick:de(n.pos.x,n.pos.y),consumed:new Set,stats:{...n.stats},moving:!1,finished:!1}}function wg(n,e,t,i,s){const a=nc(n);a.resetTo=de(n.pos.x,n.pos.y),a.vel=No(Wt(i),Math.max(.06,Math.min(1,s))*Qc),a.moving=!0;const r=[a];for(const y of e){if(y.id===n.id||y.finished)continue;const M=nc(y);r.push(M)}let o=!1,c=!1,l=!1,h=!1,d=!1,u=0,f=0,g=n.progress;const v=new Set,m=1/120;let p=0;for(;th(r)&&p<700;){const y=nh(r,t,m);for(const M of y)M.capId===a.id?M.type==="out"?o=!0:M.type==="hole"?c=!0:M.type==="bomb"?l=!0:M.type==="finish"?h=!0:M.type==="bonus"?u+=M.n||1:M.type==="item"?f+=1:M.type==="ramp"&&(d=!0):(M.type==="out"||M.type==="hole"||M.type==="bomb")&&v.add(M.capId);a.progress>g&&(g=a.progress),p++}const _=t.nearest(a.pos);return{endProg:a.progress,maxProg:g,out:o,holed:c,bombed:l,finished:h,jumped:d,dEdge:Math.max(0,_.d-_.half*.45),endPos:de(a.pos.x,a.pos.y),bonus:u,item:f,oppHarm:v.size}}function Ag(n,e,t,i){let s;return n.out?s=e.progress-t.outPenalty+(n.maxProg-e.progress)*.12:s=n.endProg-n.dEdge*t.risk*2.4,n.holed&&(s-=90),n.bombed&&(s-=120),s+=n.bonus*22,s+=n.item*20,n.jumped&&(s+=10),n.finished&&(s+=500),n.oppHarm>0&&t.offense>0&&n.endProg>=e.progress-1&&(s+=n.oppHarm*t.offense*90),s}const ha=(n,e)=>({x:n.x*Math.cos(e)-n.y*Math.sin(e),y:n.x*Math.sin(e)+n.y*Math.cos(e)});function sh(n,e,t){const i=n.ai||"tecnico",s=tc[i]||tc.tecnico,a=t.total,r=t.atArc(n.progress).tan,o=t.atArc(Math.min(a,n.progress+4)).p,c=t.atArc(Math.min(a,n.progress+s.lookahead)).p,l=rn(en(o,n.pos))<.4?r:Wt(en(o,n.pos)),h=rn(en(c,n.pos))<.4?r:Wt(en(c,n.pos));let d=null;if(s.rival>0||s.offense>0){let D=18;for(const I of e){if(I.id===n.id||I.finished)continue;const O=_g(n.pos,I.pos);O<D&&I.progress>n.progress-8&&(d=I,D=O)}}const u=t.atArc(Math.min(a,n.progress+9)),f={x:-u.tan.y,y:u.tan.x},g=Wt(en({x:u.p.x+f.x*2.7,y:u.p.y+f.y*2.7},n.pos)),v=Wt(en({x:u.p.x-f.x*2.7,y:u.p.y-f.y*2.7},n.pos));let m={dir:l,power:.2,s:-1e9},p=null;const _=(D,I)=>{const O=Math.max(.06,Math.min(1,I)),$=wg(n,e,t,D,O),B=Ag($,n,s);B>m.s&&(m={dir:D,power:O,s:B},p=$)},y=[8,13,s.lookahead,s.lookahead+6],M=[r,l,h,g,v];for(const D of y){const I=t.atArc(Math.min(a,n.progress+D)).p,O=rn(en(I,n.pos))<.4?r:Wt(en(I,n.pos));M.push(O)}const C=s.spread,w=[0,C*.45,-C*.45],A=[.26,.42,.56,.7,.84,1];for(const D of M)for(const I of w){const O=ha(D,I);for(const $ of A)_(O,$*s.powBias)}for(const D of t.def.obstacles){if(D.type!=="jump")continue;const I=t.progressOf(de(D.x,D.y));if(I>n.progress+1&&I<n.progress+28){const O=Wt(en(de(D.x,D.y),n.pos));for(const $ of[.72,.86,1])_(O,$)}}for(const D of t.def.obstacles){if(D.type!=="item"&&D.type!=="bonus")continue;const I=t.progressOf(de(D.x,D.y));if(I>n.progress-3&&I<n.progress+s.lookahead+6){const O=Wt(en(de(D.x,D.y),n.pos));for(const $ of[.35,.5,.65,.8])_(O,$)}}if(n.progress>a-(s.lookahead+14)){const D=t.atArc(a).p,I=Wt(en(D,n.pos));for(const O of w)for(const $ of[.6,.75,.9,1])_(ha(I,O),$)}if(d&&s.offense>.4){const D=Wt(en(d.pos,n.pos));for(const I of[.6,.8,1])_(D,I)}{const D=m.dir,I=m.power;for(const O of[.04,-.04,.09,-.09])for(const $ of[0,.06,-.06])_(ha(D,O),I+$);for(const O of[.03,-.03,.07,-.07])_(D,I+O)}if(!p||p.out||p.holed||p.bombed||p.endProg<=n.progress+.6)for(let D=0;D<24;D++){const I=D/24*Math.PI*2,O={x:Math.cos(I),y:Math.sin(I)};for(const $ of[.14,.24,.38,.55])_(O,$)}const q=(Math.random()-.5)*s.noise*2.2,b=ha(m.dir,q),S=Math.max(.06,Math.min(1,m.power*(1+(Math.random()-.5)*s.noise)));return{dir:b,power:S}}const Ji={raio:{id:"raio",name:"Raio",ico:"⚡",desc:"Manda o líder de volta pro checkpoint dele",tier:5,kind:"now"},foguete:{id:"foguete",name:"Foguete",ico:"🚀",desc:"Próximo peteléco com muito mais alcance",tier:4,kind:"arm"},salto:{id:"salto",name:"Salto",ico:"✨",desc:"Pula um trecho pra frente na pista",tier:4,kind:"now"},extra:{id:"extra",name:"Peteléco +1",ico:"➕",desc:"Ganha um peteléco extra nesta vez",tier:3,kind:"now"},escudo:{id:"escudo",name:"Escudo",ico:"🛡️",desc:"Anula o próximo buraco ou queda pra fora",tier:3,kind:"now"},ima:{id:"ima",name:"Ímã",ico:"🧲",desc:"Cola no centro e empurra de leve pra frente",tier:2,kind:"now"},turbo:{id:"turbo",name:"Turbinho",ico:"💨",desc:"Empurrãozinho pra frente no próximo peteléco",tier:1,kind:"arm"}},vr=["raio","foguete","salto","extra","escudo","ima","turbo"];function Cg(n,e,t=Math.random){const i=Math.max(0,Math.min(1,n)),s={};for(const o of vr){const l=(Ji[o].tier-1)/4;let h=(1-l)*(1-i)+l*i;h=.12+h*h*1.6,o==="raio"&&e&&(h=0),s[o]=h}let a=0;for(const o of vr)a+=s[o];let r=t()*a;for(const o of vr)if(r-=s[o],r<=0)return o;return"turbo"}class Rg{constructor(){this.caps=[],this.current=0,this.phase="aim",this.finishOrder=[],this.turnNo=0,this.onEvent=()=>{},this.onChange=()=>{},this.onToast=()=>{},this.onFlick=()=>{},this.onCheckpoint=()=>{},this.acc=0,this.aiTimer=0,this.aiFired=!1,this.lastFlickOut=!1,this.manualControl=!1,this.cpArcs=[],this.flickCount=0,this.chaos=!1,this.teams=0,this.onItem=()=>{}}setup(e,t){this.track=new eh(e),this.caps=t.map((h,d)=>{const u=mt(h.skin),f=bg(d,h.name,h.skin,{...xg,...u.stats},h.isAI,h.ai);return f.team=h.team??-1,f}),this.teams=t.some(h=>(h.team??-1)>=0)?new Set(t.map(h=>h.team??-1)).size:0;const i=e.start,s=e.startAngle,a={x:Math.cos(s),y:Math.sin(s)},r={x:-Math.sin(s),y:Math.cos(s)},o=e.half[0],c=this.caps.length,l=c>1?Math.min(1.95,2*(o-1)/(c-1)):0;this.caps.forEach((h,d)=>{const u=(d-(c-1)/2)*l,f=1.2;h.pos=de(i.x+a.x*f+r.x*u,i.y+a.y*f+r.y*u),h.cpPos=de(h.pos.x,h.pos.y),h.turnStart=de(h.pos.x,h.pos.y),h.progress=this.track.progressOf(h.pos),h.checkpoint=0}),this.cpArcs=this.track.def.checkpoints.map(h=>this.track.progressOf(de(h.x,h.y))),this.finishOrder=[],this.current=0,this.turnNo=1,this.phase="aim",this.flickCount=0,this.beginTurn(!0),this.onChange()}activeCap(){return this.caps[this.current]}beginTurn(e=!1){let t=0;for(;t++<this.caps.length+2;){const s=this.caps[this.current];if(!s)break;if(s.finished){this.advanceIndex();continue}if(s.skipTurns>0){s.skipTurns--,this.onToast(`${s.name} perdeu o turno`,"bad"),this.advanceIndex();continue}break}const i=this.caps[this.current];i&&(i.flicksLeft=3,i.bonusFlicks=0,i.special10=!1,i.consumed.clear(),i.turnStart=de(i.pos.x,i.pos.y),this.phase="aim",this.aiTimer=0,this.aiFired=!1,e||this.turnNo++,!i.isAI&&!this.manualControl&&this.onToast("Sua vez, "+i.name,"turn"),this.onChange())}advanceIndex(){this.current=(this.current+1)%this.caps.length}rank01(e){const i=[...this.caps.filter(r=>!r.finished)].sort((r,o)=>o.progress-r.progress),s=i.indexOf(e),a=Math.max(1,i.length-1);return{r:s<0?.5:s/a,leader:s===0}}hazardAhead(e){for(const t of this.track.def.obstacles){if(t.type!=="hole"&&t.type!=="bomb")continue;const i=this.track.progressOf(de(t.x,t.y));if(i>e.progress+1&&i<e.progress+24)return!0}return!1}grantItem(e){if(e.item)return!1;const{r:t,leader:i}=this.rank01(e),s=Cg(t,i);return e.item=s,e.itemFlash=1,e.isAI||this.onToast(`${Ji[s].ico} ${Ji[s].name}! toque pra usar`,"good"),this.onItem(e,s,!1),!0}useItem(e=this.activeCap()){const t=e.item;if(!t)return;e.item=null,e.itemFlash=1;const i=Ji[t];switch(t){case"foguete":e.boostNext=1.7;break;case"turbo":e.boostNext=1.28;break;case"extra":e.flicksLeft+=1,e.bonusFlicks+=0;break;case"escudo":e.shield=!0;break;case"salto":{const s=Math.min(this.track.total-1,e.progress+15),a=this.track.atArc(s).p;e.pos=de(a.x,a.y),e.progress=s,this.updateCheckpoint(e);break}case"ima":{const s=this.track.atArc(e.progress).p;e.pos=de(s.x,s.y),e.boostNext=1.18;break}case"raio":{const a=this.caps.filter(r=>!r.finished&&r.id!==e.id).sort((r,o)=>o.progress-r.progress)[0];a&&(a.pos=de(a.cpPos.x,a.cpPos.y),a.progress=this.track.progressOf(a.cpPos),a.itemFlash=1,this.onToast(`⚡ ${a.name} levou um raio!`,"bad"));break}}!e.isAI&&t!=="raio"&&this.onToast(`${i.ico} ${i.name}!`,"good"),this.onItem(e,t,!0),this.onChange()}canFlick(){return this.phase==="aim"&&this.activeCap().flicksLeft>0}flick(e,t){if(!this.canFlick())return;const i=this.activeCap(),s=i.boostNext;i.boostNext=1;const a=Wt(e),r=Math.max(.06,Math.min(1,t))*Qc*s;i.preFlick=de(i.pos.x,i.pos.y);for(const o of this.caps){if(o.id===i.id){o.resetTo=de(i.preFlick.x,i.preFlick.y);continue}const c=Math.max(.6,o.progress-16),l=this.track.atArc(c).p;o.resetTo=de(l.x,l.y)}i.z=0,i.vz=0,i.airborne=!1,i.vel=No(a,r),i.moving=!0,this.lastFlickOut=!1,this.flickCount++,this.phase="resolve",this.acc=0,this.onFlick(i,t),this.onChange()}update(e){if(this.phase==="over")return;if(this.phase==="aim"){if(this.manualControl)return;const s=this.activeCap();if(s.isAI&&(this.aiTimer+=e,this.chaos&&s.item&&this.aiTimer>.4&&this.aiTimer<.45&&(s.item!=="escudo"||this.hazardAhead(s))&&this.useItem(s),!this.aiFired&&this.aiTimer>.85)){this.aiFired=!0;const a=sh(s,this.caps,this.track);this.flick(a.dir,a.power)}return}this.acc+=e;const t=1/120;let i=0;for(;this.acc>=t&&i<12;){const s=nh(this.caps,this.track,t);for(const a of s)this.handleEvent(a);if(this.acc-=t,i++,this.phase==="over")return}th(this.caps)||this.endFlick()}handleEvent(e){const t=this.caps[e.capId];switch(e.type){case"bonus":t.bonusFlicks+=e.n||1,this.onToast(`+${e.n} peteléco${(e.n||1)>1?"s":""}!`,"good");break;case"hole":t.holed=!0,this.onToast(`${t.name} caiu no buraco — checkpoint`,"bad");break;case"bomb":t.bombed=!0,this.onToast(`${t.name} pisou no X — perdeu a vez`,"bad");break;case"out":t.id===this.current&&(this.lastFlickOut=!0),this.onToast(`${t.name} saiu da pista!`,"bad");break;case"ramp":t.id===this.current&&this.onToast("Voou! 🚀","good");break;case"item":e.power===-1?(t.itemFlash=1,this.onToast(`🛡️ ${t.name} — escudo salvou!`,"good")):!this.grantItem(t)&&e.obsIdx!=null&&t.consumed.delete(e.obsIdx);break;case"finish":this.onFinish(t);break}this.updateCheckpoint(t),this.onEvent(e)}updateCheckpoint(e){const t=this.cpArcs;let i=-1;for(let s=e.checkpoint+1;s<t.length&&e.progress+.3>=t[s];s++){e.checkpoint=s;const a=this.track.atArc(t[s]).p;e.cpPos=de(a.x,a.y),i=s}i>0&&(this.onCheckpoint(e,i),e.isAI||this.onToast("Checkpoint "+i+" ✓","turn"))}onFinish(e){this.finishOrder.includes(e)||(e.finished=!0,e.airborne=!1,e.z=0,this.finishOrder.push(e),e.place=this.finishOrder.length,this.onToast(`${e.name} chegou em ${e.place}º! 🏁`,e.place===1?"good":"turn"),this.finishOrder.length>=Math.max(1,this.caps.length-1)&&this.finishRace())}finishRace(){const e=this.caps.filter(i=>!i.finished).sort((i,s)=>s.progress-i.progress);let t=this.finishOrder.length;for(const i of e)i.place=++t;this.phase="over",this.onChange()}endFlick(){const e=this.activeCap();if(e.finished){this.advanceIndex(),this.beginTurn();return}e.flicksLeft-=1,e.holed&&(e.holed=!1,e.flicksLeft-=1),e.bombed&&(e.bombed=!1,e.flicksLeft=0),e.bonusFlicks>0&&(e.flicksLeft+=e.bonusFlicks,e.bonusFlicks=0),e.flicksLeft=Math.max(0,Math.min(e.flicksLeft,9)),e.flicksLeft>1&&(e.turnStart=de(e.pos.x,e.pos.y)),e.flicksLeft<=0?(this.advanceIndex(),this.beginTurn()):(this.phase="aim",this.aiTimer=0,this.aiFired=!1,this.onChange())}standings(){return[...this.caps].sort((e,t)=>(e.finished?e.place:999-e.progress/1e3,t.finished?t.place:999-t.progress/1e3,e.finished&&t.finished?e.place-t.place:e.finished?-1:t.finished?1:t.progress-e.progress))}winner(){return this.finishOrder[0]||null}snapshot(){return{cur:this.current,tn:this.turnNo,ph:this.phase,fc:this.flickCount,fin:this.finishOrder.map(e=>e.id),caps:this.caps.map(e=>({i:e.id,x:e.pos.x,y:e.pos.y,pr:e.progress,cp:e.checkpoint,cx:e.cpPos.x,cy:e.cpPos.y,tx:e.turnStart.x,ty:e.turnStart.y,fl:e.flicksLeft,bf:e.bonusFlicks,sk:e.skipTurns,fn:e.finished,pl:e.place,ai:e.isAI}))}}applySnapshot(e){if(!(!e||!e.caps)){this.current=e.cur,this.turnNo=e.tn,this.phase=e.ph,typeof e.fc=="number"&&(this.flickCount=e.fc);for(const t of e.caps){const i=this.caps[t.i];i&&(i.pos.x=t.x,i.pos.y=t.y,i.vel.x=0,i.vel.y=0,i.z=0,i.vz=0,i.airborne=!1,i.moving=!1,i.progress=t.pr,i.checkpoint=t.cp,i.cpPos=de(t.cx,t.cy),i.turnStart=de(t.tx,t.ty),i.flicksLeft=t.fl,i.bonusFlicks=t.bf,i.skipTurns=t.sk,i.finished=t.fn,i.place=t.pl,i.isAI=t.ai)}this.finishOrder=(e.fin||[]).map(t=>this.caps[t]).filter(Boolean),this.phase,this.onChange()}}}function ah(n){return()=>{n|=0,n=n+1831565813|0;let e=Math.imul(n^n>>>15,1|n);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}const Xn=["Fácil","Médio","Difícil","Muito Difícil","Extrema"],_s=["#3fae6a","#3b82f6","#f2b100","#e5762a","#e5484d"],ji=[{key:"quintal",ground:"dirt",bg:"#6f5334",wall:"#6b4e2e",patch:["sand","mud","grass"],decor:["twig","leaf","pebble","grass"],names:["Quintal do Zé","Terra Batida","Fundo de Quintal","Chão de Terra"]},{key:"praia",ground:"sand",bg:"#d9b877",wall:"#c9a35f",patch:["water","ramp","cardboard"],decor:["shell","starfish","castle","pebble"],names:["Praia da Tarde","Areia Fofa","Beira-Mar","Duna do Sol"]},{key:"calcada",ground:"sidewalk",bg:"#9a9488",wall:"#8f8879",patch:["chalk","cardboard"],decor:["chalk","toy","pebble"],names:["Calçada de Giz","Rua de Baixo","Passeio","Meio-Fio"]},{key:"garagem",ground:"cardboard",bg:"#7d6a4e",wall:"#a9773f",patch:["sidewalk","sand"],decor:["box","tape","pencil"],names:["Garagem","Papelão & Fita","Depósito","Oficina"]},{key:"parquinho",ground:"dirt",bg:"#4f5b3a",wall:"#5c4a2c",patch:["mud","water","grass"],decor:["leaf","grass","pebble"],names:["Parquinho Molhado","Lamaçal","Depois da Chuva","Poça & Folha"]},{key:"cozinha",ground:"cardboard",bg:"#c8b48c",wall:"#c05a5a",patch:["sidewalk","water"],decor:["cup","coin","eraser","straw"],names:["Mesa da Cozinha","Hora do Café","Toalha Xadrez","Bancada"]},{key:"jardim",ground:"dirt",bg:"#3f5a2e",wall:"#5a7a3a",patch:["grass","mud","sand"],decor:["grass","leaf","twig","pebble"],names:["Jardim da Vó","Canteiro","Grama & Terra","Horta"]},{key:"deserto",ground:"sand",bg:"#c98f4a",wall:"#a6702f",patch:["ramp","ramp","water"],decor:["pebble","twig","starfish"],names:["Deserto","Dunas","Sol a Pino","Areião"]},{key:"obra",ground:"dirt",bg:"#6a6152",wall:"#8a8070",patch:["cardboard","sand"],decor:["box","pencil","pebble"],names:["Canteiro de Obra","Entulho","Cimento","Andaime"]},{key:"laje",ground:"sidewalk",bg:"#8f9aa0",wall:"#7a848a",patch:["cardboard","chalk"],decor:["toy","pebble","tape"],names:["Laje","Terraço","Cobertura","Varal"]},{key:"piscina",ground:"sidewalk",bg:"#4a90b8",wall:"#cfe4ee",patch:["water","water","chalk"],decor:["pebble","coin","toy"],names:["Borda da Piscina","Deck Molhado","Área de Lazer","Prainha"]},{key:"feira",ground:"cardboard",bg:"#a88f5c",wall:"#8a6238",patch:["sidewalk","chalk"],decor:["box","coin","tape","cup"],names:["Feira Livre","Barraca","Calçadão","Mercadão"]},{key:"estrada",ground:"dirt",bg:"#5c4a30",wall:"#4a3a24",patch:["mud","sand","grass"],decor:["pebble","twig","grass"],names:["Estrada de Barro","Trilha","Rua sem Asfalto","Beira da Roça"]},{key:"varanda",ground:"cardboard",bg:"#8a6a44",wall:"#6b4e2e",patch:["sidewalk","water"],decor:["cup","coin","leaf","pencil"],names:["Varanda","Área Coberta","Quintalzinho","Alpendre"]}],tn=(n,e)=>{const t=n[Math.max(0,e-1)],i=n[Math.min(n.length-1,e+1)],s=i.x-t.x,a=i.y-t.y,r=Math.hypot(s,a)||1;return{x:s/r,y:a/r}},In=(n,e)=>{const t=tn(n,e);return{x:-t.y,y:t.x}},Pg=n=>{let e=0;for(let t=1;t<n.length;t++)e+=Math.hypot(n[t].x-n[t-1].x,n[t].y-n[t-1].y);return e},Lg=(n,e)=>{const t=Math.cos(e),i=Math.sin(e);for(const s of n){const a=s.x*t-s.y*i,r=s.x*i+s.y*t;s.x=a,s.y=r}},Dg=[{half:4.3,open:.05,len:330,holes:[1,2],bombs:[0,1],stones:[2,4],bonus:[2,3],ramps:[1,2]},{half:4.1,open:.24,len:420,holes:[2,3],bombs:[0,1],stones:[3,5],bonus:[2,4],ramps:[1,3]},{half:4,open:.5,len:510,holes:[2,4],bombs:[1,2],stones:[3,6],bonus:[2,4],ramps:[2,3]},{half:3.9,open:.72,len:600,holes:[3,5],bombs:[1,2],stones:[4,6],bonus:[2,3],ramps:[2,4]},{half:3.8,open:.9,len:690,holes:[3,6],bombs:[1,2],stones:[4,7],bonus:[1,3],ramps:[2,4]}];function Ig(n,e,t,i,s){const a=t(7,14),r=e(.18,.46),o=e(.8,1.4),c=e(.8,1.4),l=e(.78,.92),h=n()*6.283,d=[];for(let _=0;_<a;_++)d.push(1+(n()*2-1)*r);const u=_=>{let y=_/(2*Math.PI)*a;y=(y%a+a)%a;const M=Math.floor(y),C=y-M,w=d[(M-1+a)%a],A=d[M%a],R=d[(M+1)%a],q=d[(M+2)%a],b=.5*(2*A+(-w+R)*C+(2*w-5*A+4*R-q)*C*C+(-w+3*A-3*R+q)*C*C*C);return Math.max(.35,b)},f=60,g=Math.max(200,Math.round(i/2.2)),v=l*2*Math.PI,m=[];for(let _=0;_<=g;_++){const y=h+_/g*v,M=u(y)*f;m.push(de(o*M*Math.cos(y),c*M*Math.sin(y)))}const p=i/Pg(m);for(const _ of m)_.x*=p,_.y*=p;return m}function Ug(n,e,t){const i=ah(n*7919+e*131+t*17+1),s=(H,W)=>Math.floor(H+i()*(W-H+1)),a=(H,W)=>H+i()*(W-H),r=ji[(t*3+e*7+n)%ji.length],o=Dg[e],c=o.half*a(.92,1.08),l=o.len*a(.9,1.1),h=Ig(i,a,s,l);Lg(h,i()*6.283);const d=c+5;let u=1/0,f=1/0,g=-1/0,v=-1/0;for(const H of h)H.x<u&&(u=H.x),H.y<f&&(f=H.y),H.x>g&&(g=H.x),H.y>v&&(v=H.y);for(const H of h)H.x+=d-u,H.y+=d-f;const m=Math.ceil(g-u+2*d),p=Math.ceil(v-f+2*d),_=h,y=_.length,M=[0];let C=0;for(let H=1;H<y;H++)C+=Math.hypot(_[H].x-_[H-1].x,_[H].y-_[H-1].y),M.push(C);const w=C,A=H=>{let W=1;for(;W<y-1&&M[W]<H;)W++;const E=M[W]-M[W-1]||1,x=(H-M[W-1])/E;return{p:de(_[W-1].x+(_[W].x-_[W-1].x)*x,_[W-1].y+(_[W].y-_[W-1].y)*x),i:W}},R=(H,W=0)=>{const{p:E,i:x}=A(H),L=In(_,x);return de(E.x+L.x*W,E.y+L.y*W)},q=new Array(y).fill(0);for(let H=1;H<y-1;H++){const W=tn(_,H-1),E=tn(_,H+1);let x=W.x*E.x+W.y*E.y;x=x<-1?-1:x>1?1:x;const L=M[Math.min(y-1,H+1)]-M[Math.max(0,H-1)]||1;q[H]=Qn(Math.acos(x)/L/.22,0,1)}const b=new Array(y).fill(0);for(let H=0;H<y;H++){let W=0,E=0;for(let x=-3;x<=3;x++){const L=H+x;L>=0&&L<y&&(W+=q[L],E++)}b[H]=W/E}const S=[];for(let H=0;H<y;H++){let W=c+Math.sin(M[H]*.05)*.3;M[H]<13&&(W=Math.max(W,c+3.2*(1-M[H]/13))),w-M[H]<8&&(W+=.9),W*=1+.45*b[H],S.push(W)}const D=[],I=3,O=H=>H<10||w-H<9;for(let H=I;H<y;H+=I){const W=H-I,E=o.open*(1-.85*b[H]);if(i()<E&&!O(M[H]))continue;const x=In(_,W),L=In(_,H);D.push({a:de(_[W].x+x.x*S[W],_[W].y+x.y*S[W]),b:de(_[H].x+L.x*S[H],_[H].y+L.y*S[H])}),D.push({a:de(_[W].x-x.x*S[W],_[W].y-x.y*S[W]),b:de(_[H].x-L.x*S[H],_[H].y-L.y*S[H])})}const $=[],B=[],te=[],Y=[de(_[0].x,_[0].y)],ce=[];ce.push({x:_[0].x,y:_[0].y,r:c+3.6});const fe=s(4,7),xe=[];for(let H=1;H<=fe;H++){const W=w*H/(fe+1);xe.push(W),Y.push(R(W))}const We=s(o.ramps[0],o.ramps[1]);for(let H=0;H<We;H++){const W=a(.15,.85)*w,{i:E}=A(W),x=tn(_,E),L=i()<.4?0:(i()<.5?-1:1)*a(c*.3,c*.62),X=R(W,L);B.push({surface:"ramp",x:X.x,y:X.y,r:a(1.5,2),dir:Math.atan2(x.y,x.x)})}for(let H=0;H<s(3,5);H++){const W=a(.1,.9)*w,E=R(W,a(-c*.35,c*.35)),x=r.patch[s(0,r.patch.length-1)],{i:L}=A(W),X=tn(_,L),J=x==="water"?Math.atan2(X.y,X.x)+a(-.6,.6):void 0;i()<.45?B.push({surface:x,x:E.x,y:E.y,hw:c*a(.5,.85),hh:c*a(.85,1.4),dir:J}):B.push({surface:x,x:E.x,y:E.y,r:c*a(.7,1.1),dir:J})}const qe=[...xe],Z=H=>qe.every(W=>Math.abs(W-H)>14),ne=(H,W,E)=>{const x=R(H,W);E(x),qe.push(H)};for(let H=0,W=0;H<s(o.holes[0],o.holes[1])&&W<40;W++){const E=a(.14,.9)*w;Z(E)&&(ne(E,(i()<.5?-1:1)*a(c*.32,c*.62),x=>$.push({type:"hole",x:x.x,y:x.y,r:a(1,1.4)})),H++)}for(let H=0,W=0;H<s(o.bombs[0],o.bombs[1])&&W<30;W++){const E=a(.2,.85)*w;Z(E)&&(ne(E,(i()<.5?-1:1)*a(c*.38,c*.7),x=>$.push({type:"bomb",x:x.x,y:x.y,r:.95})),H++)}for(let H=0;H<s(o.stones[0],o.stones[1]);H++){const W=a(.1,.92)*w,E=(i()<.5?-1:1)*a(c*.3,c*.75),x=R(W,E);$.push({type:"stone",x:x.x,y:x.y,r:a(.7,1.2)})}for(let H=0,W=0;H<s(o.bonus[0],o.bonus[1])&&W<40;W++){const E=a(.16,.88)*w;if(!Z(E))continue;const x=i(),L=x>.8?3:x>.44?2:1,X=i()<.5?-1:1,J=A(E).i,j=S[Math.min(y-1,J)],le=L===3?.66:L===2?.52:.4;ne(E,X*j*le,ie=>$.push({type:"bonus",x:ie.x,y:ie.y,r:1.1,n:L})),H++}const _e=s(1,e>=2?3:2);for(let H=0,W=0;H<_e&&W<24;W++){const E=a(.2,.85)*w;if(!Z(E))continue;const{i:x}=A(E),L=tn(_,x),X=In(_,x),J=i();let j,le;if(J<.45)j=Math.atan2(L.y,L.x)+Math.PI,le=(i()<.5?-1:1)*a(c*.3,c*.62);else if(J<.75){const he=i()<.5?1:-1;j=Math.atan2(X.y*he,X.x*he),le=-he*a(c*.15,c*.45)}else{const he=i()<.5?1:-1;j=Math.atan2(L.y,L.x)+Math.PI+he*.7,le=(i()<.5?-1:1)*a(c*.25,c*.6)}const ie=R(E,le);B.push({surface:"push",x:ie.x,y:ie.y,r:a(1.5,1.9),dir:j}),qe.push(E),H++}const z=e>=3?2:1;for(let H=0;H<z;H++){let W=-1,E=1;for(let j=0;j<18;j++){const le=a(.2,.72)*w;if(!Z(le))continue;const ie=A(le).i;b[ie]<E&&(E=b[ie],W=le)}if(W<0)continue;const{p:x,i:L}=A(W),X=tn(_,L);$.push({type:"jump",x:x.x,y:x.y,r:1.6,dir:Math.atan2(X.y,X.x)});const J=R(W+a(5.5,7.5),0);$.push({type:"hole",x:J.x,y:J.y,r:Math.min(2.5,c*.72)}),qe.push(W,W+6.5)}if(e>=1&&e<=3&&i()<.6){const H=s(3,4),W=a(.28,.52)*w,E=7.5;for(let x=0;x<H;x++){const L=W+x*E;if(L>w-14)break;const{p:X,i:J}=A(L),j=In(_,J),le=S[Math.min(y-1,J)],ie=x%2?1:-1;D.push({a:de(X.x+j.x*le*ie,X.y+j.y*le*ie),b:de(X.x+j.x*le*ie*.2,X.y+j.y*le*ie*.2)}),qe.push(L)}}if(e>=1&&i()<.55){let H=-1,W=-1,E=1e9;for(let x=0;x<y;x+=4)for(let L=x+1;L<y;L+=4){const X=M[L]-M[x];if(X<w*.16||X>w*.6||M[x]<w*.12||M[L]>w*.88)continue;const J=Math.hypot(_[x].x-_[L].x,_[x].y-_[L].y);J<E&&(E=J,H=x,W=L)}if(H>=0&&E>2*c+1&&E<2*c+16){const x=(_[H].x+_[W].x)/2,L=(_[H].y+_[W].y)/2;ce.push({x,y:L,r:E/2+c*.7}),$.push({type:"hole",x:x+a(-1,1),y:L+a(-1,1),r:a(1.2,1.7)})}}const Q=(H,W,E,x,L,X)=>{const J=L-E,j=X-x,le=J*J+j*j||1e-6;let ie=((H-E)*J+(W-x)*j)/le;ie=ie<0?0:ie>1?1:ie;const he=H-(E+J*ie),Ye=W-(x+j*ie);return he*he+Ye*Ye},re=(H,W)=>{for(const x of ce)if((H-x.x)**2+(W-x.y)**2<=(x.r+2)**2)return!1;const E=(c+4.5)*(c+4.5);for(let x=1;x<y;x++)if(Q(H,W,_[x-1].x,_[x-1].y,_[x].x,_[x].y)<E)return!1;return!0};for(let H=0,W=0;H<s(12,22)&&W<400;W++){const E=a(2,m-2),x=a(2,p-2);if(!re(E,x))continue;const L=r.decor[s(0,r.decor.length-1)];te.push({kind:L,x:E,y:x,s:a(.8,1.3),rot:i()*6}),H++}for(let H=$.length-1;H>=0;H--){const W=$[H];W.type!=="hole"&&W.type!=="bomb"||Y.some(E=>(W.x-E.x)**2+(W.y-E.y)**2<5.5*5.5)&&$.splice(H,1)}const Ae=de(_[0].x,_[0].y),Le=tn(_,0),Pe=Math.atan2(Le.y,Le.x),P=_[y-1],yt=tn(_,y-1),ke={x:-yt.y,y:yt.x},je=[de(P.x+ke.x*(c+.6),P.y+ke.y*(c+.6)),de(P.x-ke.x*(c+.6),P.y-ke.y*(c+.6))],De=r.names[t%r.names.length]+(t>=r.names.length?" "+(Math.floor(t/r.names.length)+1):"");return{id:n,name:De,theme:r.key,level:e,w:m,h:p,ground:r.ground,bg:r.bg,wallCol:r.wall,path:_,half:S,pads:ce,patches:B,walls:D,obstacles:$,checkpoints:Y,start:Ae,startAngle:Pe,finish:je,decor:te}}const _r=new Map;function rh(n,e){const t=n*10+e;return _r.has(t)||_r.set(t,Ug(t,n,e)),_r.get(t)}const Bt=10;function Ng(n){const e=n.path,t=e.length,i=[0];let s=0;for(let h=1;h<t;h++)s+=Math.hypot(e[h].x-e[h-1].x,e[h].y-e[h-1].y),i.push(s);const a=s,r=h=>{let d=1;for(;d<t-1&&i[d]<h;)d++;const u=i[d]-i[d-1]||1,f=(h-i[d-1])/u;return{p:de(e[d-1].x+(e[d].x-e[d-1].x)*f,e[d-1].y+(e[d].y-e[d-1].y)*f),i:d}},o=ah(n.id*2657+13),c=n.obstacles.slice(),l=6+Math.floor(o()*3);for(let h=0;h<l;h++){const d=(h+.5)/l*a*.92+a*.05,{p:u,i:f}=r(d),g=In(e,f),v=(o()<.5?-1:1)*(n.half[Math.min(t-1,f)]||4)*(o()*.28),m=u.x+g.x*v,p=u.y+g.y*v;n.obstacles.some(_=>(_.type==="hole"||_.type==="bomb")&&(_.x-m)**2+(_.y-p)**2<9)||c.push({type:"item",x:m,y:p,r:1.15})}return{...n,obstacles:c}}function xs(n){const e=ji[(n.theme%ji.length+ji.length)%ji.length],t=Qn(n.half||4.2,3.2,6.5);let i=n.pts.map(z=>de(z.x,z.y));i.length<2&&(i=[de(10,10),de(40,30)]);const s=[i[0]],a=2.2;for(let z=1;z<i.length;z++){const Q=s[s.length-1],re=i[z],Ae=Math.hypot(re.x-Q.x,re.y-Q.y),Le=Math.max(1,Math.round(Ae/a));for(let Pe=1;Pe<=Le;Pe++)s.push(de(Q.x+(re.x-Q.x)*Pe/Le,Q.y+(re.y-Q.y)*Pe/Le))}let r=s;for(let z=0;z<3;z++){const Q=[r[0]];for(let re=1;re<r.length-1;re++)Q.push(de((r[re-1].x+2*r[re].x+r[re+1].x)/4,(r[re-1].y+2*r[re].y+r[re+1].y)/4));Q.push(r[r.length-1]),r=Q}const o=r.length,c=t+6;let l=1/0,h=1/0,d=-1/0,u=-1/0;for(const z of r)z.x<l&&(l=z.x),z.y<h&&(h=z.y),z.x>d&&(d=z.x),z.y>u&&(u=z.y);const f=c-l,g=c-h;for(const z of r)z.x+=f,z.y+=g;const v=Math.ceil(d-l+2*c),m=Math.ceil(u-h+2*c),p=[0];let _=0;for(let z=1;z<o;z++)_+=Math.hypot(r[z].x-r[z-1].x,r[z].y-r[z-1].y),p.push(_);const y=_,M=z=>{let Q=1;for(;Q<o-1&&p[Q]<z;)Q++;const re=p[Q]-p[Q-1]||1,Ae=(z-p[Q-1])/re;return{p:de(r[Q-1].x+(r[Q].x-r[Q-1].x)*Ae,r[Q-1].y+(r[Q].y-r[Q-1].y)*Ae),i:Q}},C=(z,Q=0)=>{const{p:re,i:Ae}=M(z),Le=In(r,Ae);return de(re.x+Le.x*Q,re.y+Le.y*Q)},w=[];for(let z=0;z<o;z++){let Q=t;p[z]<12&&(Q=Math.max(Q,t+3*(1-p[z]/12))),y-p[z]<8&&(Q+=.8),w.push(Q)}const A=[],R=o>130?2:1,q=n.protect==null?1:Math.max(0,Math.min(1,n.protect)),b=z=>z<11||y-z<9,S=n.openArcs||[],D=z=>S.some(Q=>Math.abs(Q-z)<4.5);for(let z=R;z<o;z+=R){const Q=z-R,re=(p[z]+p[Q])/2;if(!b(re)&&(D(re)||q<1&&(z*2654435761>>>8)%1e3/1e3>=q))continue;const Ae=In(r,Q),Le=In(r,z);A.push({a:de(r[Q].x+Ae.x*w[Q],r[Q].y+Ae.y*w[Q]),b:de(r[z].x+Le.x*w[z],r[z].y+Le.y*w[z])}),A.push({a:de(r[Q].x-Ae.x*w[Q],r[Q].y-Ae.y*w[Q]),b:de(r[z].x-Le.x*w[z],r[z].y-Le.y*w[z])})}const I=[de(r[0].x,r[0].y)],O=Qn(Math.round(y/90),2,6);for(let z=1;z<=O;z++)I.push(C(y*z/(O+1)));const $=(z,Q)=>{let re=1,Ae=1e9;for(let Pe=1;Pe<o;Pe++){const P=r[Pe].x-z,yt=r[Pe].y-Q,ke=P*P+yt*yt;ke<Ae&&(Ae=ke,re=Pe)}const Le=tn(r,re);return Math.atan2(Le.y,Le.x)},B=[];for(const z of n.obstacles){const Q=z.x+f,re=z.y+g;z.type==="jump"?B.push({type:"jump",x:Q,y:re,r:z.r||1.6,dir:$(Q,re)}):B.push({type:z.type,x:Q,y:re,r:z.r||(z.type==="bonus"?1.1:z.type==="bomb"?.95:z.type==="item"?1.15:1.2),n:z.n})}const te=[];for(const z of n.patches||[]){const Q=z.x+f,re=z.y+g,Ae=z.r||2.4,Pe=z.surface==="ramp"||z.surface==="push"||z.surface==="water"?$(Q,re)+(z.surface==="push"?Math.PI:0):void 0;te.push({surface:z.surface,x:Q,y:re,r:Ae,dir:Pe})}for(let z=B.length-1;z>=0;z--){const Q=B[z];Q.type!=="hole"&&Q.type!=="bomb"||I.some(re=>(Q.x-re.x)**2+(Q.y-re.y)**2<5.5*5.5)&&B.splice(z,1)}const Y=[{x:r[0].x,y:r[0].y,r:t+3.6}],ce=de(r[0].x,r[0].y),fe=tn(r,0),xe=Math.atan2(fe.y,fe.x),We=r[o-1],qe=tn(r,o-1),Z={x:-qe.y,y:qe.x},ne=[de(We.x+Z.x*(t+.6),We.y+Z.y*(t+.6)),de(We.x-Z.x*(t+.6),We.y-Z.y*(t+.6))],_e={id:900,name:n.name||"Minha Pista",theme:e.key,level:2,w:v,h:m,ground:e.ground,bg:e.bg,wallCol:e.wall,path:r,half:w,pads:Y,patches:te,walls:A,obstacles:B,checkpoints:I,start:ce,startAngle:xe,finish:ne,decor:[]};return _e._shift={dx:f,dy:g},_e._total=y,_e}const Fg=13;class kg{constructor(e,t,i,s){this.dom=e,this.cam=t,this.rig=i,this.opts=s,this.ray=new $0,this.ndc=new Xe,this.plane=new Zn(new k(0,1,0),0),this.pointers=new Map,this.aiming=!1,this.camDrag=null,this.editing=!1,this.pinch=0,this.lastMid=null,this.down=a=>{if(this.dom.setPointerCapture?.(a.pointerId),this.pointers.set(a.pointerId,{x:a.clientX,y:a.clientY}),this.pointers.size===1){if(a.button===2){this.camDrag={x:a.clientX,y:a.clientY};return}if((this.opts.editMode?this.opts.editMode():"off")!=="off"){const o=this.world(a.clientX,a.clientY);o&&(this.editing=!0,this.opts.onEditDown?.(o.x,o.z));return}this.opts.canAim()?(this.aiming=!0,this.updateAim(a.clientX,a.clientY)):this.camDrag={x:a.clientX,y:a.clientY}}else if(this.pointers.size===2){this.aiming=!1,this.editing=!1,this.opts.onEditUp?.(),this.opts.onCancel(),this.camDrag=null;const r=[...this.pointers.values()];this.pinch=Math.hypot(r[0].x-r[1].x,r[0].y-r[1].y),this.lastMid={x:(r[0].x+r[1].x)/2,y:(r[0].y+r[1].y)/2}}},this.move=a=>{if(this.pointers.has(a.pointerId)){if(this.pointers.set(a.pointerId,{x:a.clientX,y:a.clientY}),this.pointers.size===1)if(this.editing){const r=this.world(a.clientX,a.clientY);r&&this.opts.onEditMove?.(r.x,r.z)}else this.aiming?this.updateAim(a.clientX,a.clientY):this.camDrag&&(this.rig.rotate(a.clientX-this.camDrag.x),this.rig.tilt(a.clientY-this.camDrag.y),this.camDrag={x:a.clientX,y:a.clientY});else if(this.pointers.size===2){const r=[...this.pointers.values()],o=(r[0].x+r[1].x)/2,c=(r[0].y+r[1].y)/2,l=Math.hypot(r[0].x-r[1].x,r[0].y-r[1].y);this.lastMid&&(this.rig.rotate((o-this.lastMid.x)*.8),this.rig.tilt((c-this.lastMid.y)*.8)),this.pinch&&this.rig.zoomBy(this.pinch/l,this.dom.clientWidth,this.dom.clientHeight),this.lastMid={x:o,y:c},this.pinch=l}}},this.up=a=>{const r=this.aiming&&this.pointers.size===1;this.pointers.delete(a.pointerId),this.pointers.size<2&&(this.pinch=0,this.lastMid=null),this.pointers.size===0&&(r&&this.release(a.clientX,a.clientY),this.editing&&(this.opts.onEditUp?.(),this.editing=!1),this.aiming=!1,this.camDrag=null)},this.wheel=a=>{a.preventDefault(),this.rig.zoomBy(a.deltaY>0?1.08:.92,this.dom.clientWidth,this.dom.clientHeight)},e.addEventListener("pointerdown",this.down),e.addEventListener("pointermove",this.move),window.addEventListener("pointerup",this.up),e.addEventListener("wheel",this.wheel,{passive:!1}),e.addEventListener("contextmenu",a=>a.preventDefault())}setCamera(e,t){this.cam=e,this.rig=t}world(e,t){const i=this.dom.getBoundingClientRect();this.ndc.x=(e-i.left)/i.width*2-1,this.ndc.y=-((t-i.top)/i.height)*2+1,this.ray.setFromCamera(this.ndc,this.cam);const s=new k;return this.ray.ray.intersectPlane(this.plane,s)?{x:s.x,z:s.z}:null}aimVec(e,t){const i=this.opts.capPos(),s=this.world(e,t);if(!i||!s)return null;const a=s.x-i.x,r=s.z-i.y,o=Math.hypot(a,r),c=Math.min(1,o/Fg);return o<.4?{dx:1,dz:0,power:0}:{dx:-a/o,dz:-r/o,power:c}}updateAim(e,t){const i=this.aimVec(e,t);i&&this.opts.onAim(i.dx,i.dz,i.power)}release(e,t){const i=this.aimVec(e,t);i&&i.power>.06?this.opts.onRelease(i.dx,i.dz,i.power):this.opts.onCancel()}}const oh="tampinha_rally_v1",ic={wins:0,skin:"refri",music:.5,sfx:.8,muted:!1,daily:{},trial:{},tracks:[],name:""};let ot=Og();function Og(){try{return{...ic,...JSON.parse(localStorage.getItem(oh)||"{}")}}catch{return{...ic}}}function Yn(){try{localStorage.setItem(oh,JSON.stringify(ot))}catch{}}const Be={get(){return ot},addWin(){ot.wins++,Yn()},wins(){return ot.wins},setSkin(n){ot.skin=n,Yn()},skin(){return ot.skin},setName(n){ot.name=(n||"").slice(0,12),Yn()},name(){return ot.name||""},setVols(n,e,t){ot.music=n,ot.sfx=e,ot.muted=t,Yn()},dailyBest(n){return ot.daily[n]},setDailyBest(n,e){(ot.daily[n]==null||e<ot.daily[n])&&(ot.daily[n]=e,Yn())},trialBest(n,e){return ot.trial[n+"-"+e]},setTrialBest(n,e,t){const i=n+"-"+e;return ot.trial[i]==null||t<ot.trial[i]?(ot.trial[i]=t,Yn(),!0):!1},customTracks(){return ot.tracks},saveTrack(n){const e=ot.tracks.findIndex(t=>t.id===n.id);e>=0?ot.tracks[e]=n:ot.tracks.push(n),Yn()},deleteTrack(n){ot.tracks=ot.tracks.filter(e=>e.id!==n),Yn()}};let He=null,_i,ni,ii,Wi=null,bs=null,jn=null,lh=!1,co=0;const Dt={music:.5,sfx:.8,muted:!1};function pn(){if(He)return!0;try{return He=new(window.AudioContext||window.webkitAudioContext),_i=He.createGain(),_i.gain.value=Dt.muted?0:1,_i.connect(He.destination),ni=He.createGain(),ni.gain.value=Dt.sfx,ni.connect(_i),ii=He.createGain(),ii.gain.value=Dt.music,ii.connect(_i),!0}catch{return!1}}function ch(){pn()&&He.state==="suspended"&&He.resume()}function Fo(){const n=He.sampleRate*1,e=He.createBuffer(1,n,He.sampleRate),t=e.getChannelData(0);for(let i=0;i<n;i++)t[i]=Math.random()*2-1;return e}function Kn(n,e,t,i,s,a){if(!He)return;const r=He.createOscillator(),o=He.createGain();r.type=i,r.frequency.setValueAtTime(n,e),a&&r.frequency.exponentialRampToValueAtTime(a,e+t),o.gain.setValueAtTime(0,e),o.gain.linearRampToValueAtTime(s,e+.008),o.gain.exponentialRampToValueAtTime(8e-4,e+t),r.connect(o),o.connect(ni),r.start(e),r.stop(e+t+.02)}function xr(n,e,t,i,s){if(!He)return;const a=He.createBufferSource();a.buffer=Fo();const r=He.createBiquadFilter(),o=He.createGain();r.type="bandpass",r.frequency.value=i,r.Q.value=s,o.gain.setValueAtTime(t,n),o.gain.exponentialRampToValueAtTime(8e-4,n+e),a.connect(r),r.connect(o),o.connect(ni),a.start(n),a.stop(n+e+.02)}const Lt={flick(n=.5){if(!pn())return;const e=He.currentTime;Kn(360+n*340,e,.09,"triangle",.35,220),xr(e,.05,.25,1400,1.2)},ui(){pn()&&Kn(520,He.currentTime,.06,"sine",.2,660)},wall(n=1){if(!pn())return;const e=He.currentTime;xr(e,.09,Math.min(.4,.12+n*.03),240,2),Kn(150,e,.08,"sine",.2,90)},clack(n=1){if(!pn())return;const e=He.currentTime;xr(e,.06,Math.min(.45,.15+n*.03),900,3),Kn(500,e,.05,"square",.15,380)},hole(){if(!pn())return;const n=He.currentTime;Kn(400,n,.5,"sine",.3,70)},bonus(){if(!pn())return;const n=He.currentTime;[523,659,784,1047].forEach((e,t)=>Kn(e,n+t*.06,.18,"triangle",.25))},bad(){if(!pn())return;const n=He.currentTime;Kn(300,n,.25,"sawtooth",.22,140)},win(){if(!pn())return;const n=He.currentTime;[523,659,784,1047,784,1047,1319].forEach((e,t)=>Kn(e,n+t*.11,.3,"triangle",.3))},slide(n){if(!pn())return;Wi||(Wi=He.createBufferSource(),Wi.buffer=Fo(),Wi.loop=!0,jn=He.createBiquadFilter(),jn.type="bandpass",jn.frequency.value=1200,jn.Q.value=.8,bs=He.createGain(),bs.gain.value=0,Wi.connect(jn),jn.connect(bs),bs.connect(ni),Wi.start());const e=Math.min(.22,n*.02);bs.gain.setTargetAtTime(e,He.currentTime,.05),jn&&jn.frequency.setTargetAtTime(700+n*90,He.currentTime,.05)}},sc=[[196,247,294],[220,262,330],[175,220,262],[196,247,311]];function Bg(){pn()&&(lh=!0,co=0,hh())}function hh(){if(!He||!lh)return;const n=He.currentTime,e=co%sc.length,t=sc[e];t.forEach(s=>{const a=He.createOscillator(),r=He.createGain();a.type="triangle",a.frequency.value=s,r.gain.setValueAtTime(0,n),r.gain.linearRampToValueAtTime(.06,n+.05),r.gain.exponentialRampToValueAtTime(.001,n+1.7),a.connect(r),r.connect(ii),a.start(n),a.stop(n+1.8)}),[t[2]*2,t[1]*2,t[2]*2,t[0]*2].forEach((s,a)=>{const r=He.createOscillator(),o=He.createGain();r.type="sine",r.frequency.value=s;const c=n+a*.45;o.gain.setValueAtTime(0,c),o.gain.linearRampToValueAtTime(.05,c+.03),o.gain.exponentialRampToValueAtTime(.001,c+.35),r.connect(o),o.connect(ii),r.start(c),r.stop(c+.4)});for(let s=0;s<8;s++)zg(n+s*.225);co++,setTimeout(hh,1800)}function zg(n){if(!He)return;const e=He.createBufferSource();e.buffer=Fo();const t=He.createBiquadFilter(),i=He.createGain();t.type="highpass",t.frequency.value=6e3,i.gain.setValueAtTime(.03,n),i.gain.exponentialRampToValueAtTime(.001,n+.08),e.connect(t),t.connect(i),i.connect(ii),e.start(n),e.stop(n+.1)}function dh(n){Dt.music=n,ii&&(ii.gain.value=n)}function uh(n){Dt.sfx=n,ni&&(ni.gain.value=n)}function fh(n){Dt.muted=n,_i&&(_i.gain.value=n?0:1)}const qi={sprint:{name:"Sprint",ico:"⚡",races:3,desc:"3 pistas rápidas"},copa:{name:"Copa",ico:"🏆",races:5,desc:"5 pistas do nível"},maratona:{name:"Maratona",ico:"🔥",races:7,desc:"7 pistas, fôlego total"},gp:{name:"Grand Prix",ico:"🌍",races:5,desc:"1 de cada nível, dificuldade sobe"}},$i=["Bolha","Zé","Nina","Tato","Duda","Chico","Lila"],Ln=class Ln{constructor(e,t){this.root=document.getElementById("ui"),this.cfgLevel=0,this.cfgTrack=0,this.cfgPick="specific",this.cfgMode="quick",this.cfgChampFmt="copa",this.cfgTeamSize=2,this.cfgPlayers=[],this.myName="Você",this.edPts=[],this.edObs=[],this.edPatches=[],this.edTool="draw",this.edTheme=0,this.edHalf=4.2,this.edName="Minha Pista",this.edProtect=1,this.edOpenArcs=[],this.edPrevMode="view",this.edPrevDef=null,this.edPrevTrack=null,this.edDragItem=null,this.toastEl=null,this.toastT=0,this.edW=92,this.edH=62,this.onPreviewBack=null,this.onPreviewPlay=null,this.lobbyOpen=!1,this.hud=null,this.onPause=null,this.onResume=null,this.onRestart=null,this.onNext=null,this.onMenu=null,this.onUseItem=null,this.cb=e,this.online=t,this.myName=Be.name()||"Você",this.resetPlayers("quick")}el(e){const t=document.createElement("div");return t.innerHTML=e.trim(),t.firstElementChild}clear(){this.root.querySelectorAll(".screen").forEach(e=>e.remove())}bgFx(e=8){const t=this.el('<div class="fxlayer"></div>');for(let i=0;i<e;i++){const s=an[Math.floor(Math.random()*an.length)],a=document.createElement("div");a.className="fcap";const r=30+Math.random()*52;a.style.cssText=`left:${Math.random()*100}%;width:${r}px;height:${r}px;opacity:${(.1+Math.random()*.16).toFixed(2)};animation-duration:${(16+Math.random()*16).toFixed(1)}s;animation-delay:${(-Math.random()*26).toFixed(1)}s`;const o=wt(s.art,72);o.style.width="100%",o.style.height="100%",o.style.display="block",a.appendChild(o),t.appendChild(a)}for(let i=0;i<10;i++){const s=document.createElement("div");s.className="bub";const a=6+Math.random()*18;s.style.cssText=`left:${Math.random()*100}%;width:${a}px;height:${a}px;animation-duration:${(10+Math.random()*12).toFixed(1)}s;animation-delay:${(-Math.random()*20).toFixed(1)}s`,t.appendChild(s)}return t}confetti(e){const t=["#f2b100","#e5484d","#3b82f6","#2ea44f","#a855f7","#ff8fb0","#fff"];for(let i=0;i<46;i++){const s=document.createElement("div");s.className="confetti",s.style.cssText=`left:${Math.random()*100}%;background:${t[i%t.length]};animation-duration:${(1+Math.random()*1.5).toFixed(2)}s;animation-delay:${(Math.random()*.5).toFixed(2)}s;transform:rotate(${Math.floor(Math.random()*360)}deg)`,e.appendChild(s),setTimeout(()=>s.remove(),2800)}}showMenu(){this.clear();const e=Be.wins(),t=pr(e).length,i=this.el(`
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
          <button class="mode-btn hot" data-m="modes" style="--a:#ff4fa3"><span class="mi">🎡</span><b>Modos de Jogo</b><span class="ms">Caos, Eliminação, Dupla…</span></button>
          <button class="mode-btn" data-m="champ" style="--a:var(--gold)"><span class="mi">🏆</span><b>Campeonato</b><span class="ms">4 formatos, 1 campeão</span></button>
          <button class="mode-btn" data-m="daily" style="--a:var(--pur)"><span class="mi">📅</span><b>Desafio Diário</b><span class="ms">a pista do dia</span></button>
          <button class="mode-btn" data-m="editor" style="--a:#00c2a8"><span class="mi">✏️</span><b>Editor de Pista</b><span class="ms">crie e jogue a sua</span></button>
          <button class="mode-btn" data-m="skins" style="--a:var(--orange)"><span class="mi">🎨</span><b>Tampinhas</b><span class="ms">coleção ${t}/${an.length}</span></button>
          <button class="mode-btn" data-m="help" style="--a:#00b4d8"><span class="mi">📖</span><b>Como Jogar</b><span class="ms">obstáculos &amp; atributos</span></button>
        </div>
      </div>`);i.prepend(this.bgFx(9)),i.querySelector("#capico").appendChild(wt(mt("coca").art,120)),this.root.appendChild(i),i.querySelectorAll(".mode-btn").forEach(s=>s.addEventListener("click",()=>{const a=s.dataset.m;a==="skins"?this.showSkins():a==="help"?this.showHelp():a==="mp"?this.showMultiplayer():a==="modes"?this.showModes():a==="editor"?this.showEditor():this.showSetup(a)})),i.querySelector("#cfgBtn").addEventListener("click",()=>this.showSettings())}showModes(){this.clear();const e=[{m:"caos",ico:"🌀",name:"Modo Caos",sub:"Power-ups estilo Mario Kart! Quem está atrás pega os melhores itens.",col:"#ff4fa3"},{m:"elim",ico:"💀",name:"Eliminação",sub:"Várias pistas: o último de cada corrida é eliminado até sobrar 1.",col:"#e5484d"},{m:"trial",ico:"⏱️",name:"Contra-Relógio",sub:"Sozinho contra o cronômetro: chegue com o MENOR número de petelecos.",col:"#3b82f6"},{m:"dupla",ico:"🤝",name:"Corrida de Dupla",sub:"Times! 2×2 ou 3×3 — a soma das colocações decide o time campeão.",col:"#2ea44f"}],t=this.el(`<div class="screen setup modes-screen">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Voltar</button><h2>Modos de Jogo</h2><div></div></div>
      <div class="modes-note">O jogo <b>comum</b> continua no menu. Aqui são os modos especiais — bem diferentes! 🎉</div>
      <div class="modes-list">
        ${e.map(i=>`<button class="modecard" data-m="${i.m}" style="--mc:${i.col}"><span class="mc-ico">${i.ico}</span><div class="mc-tx"><b>${i.name}</b><span>${i.sub}</span></div><span class="mc-go">▶</span></button>`).join("")}
      </div>
      <div class="modes-hint">🌐 Dupla e Campeonato também dá pra jogar <b>Online</b> (no Multiplayer → Online).</div>
    </div>`);this.root.appendChild(t),t.prepend(this.bgFx(7)),t.querySelector("#back").addEventListener("click",()=>this.showMenu()),t.querySelectorAll(".modecard").forEach(i=>i.addEventListener("click",()=>this.showSetup(i.dataset.m)))}showEditor(){this.clear();const e=["Quintal","Praia","Calçada","Garagem","Parque","Cozinha","Jardim","Deserto"],t=Ln.ED_TOOLS,i=this.el(`<div class="screen editor">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Voltar</button><h2>✏️ Editor de Pista</h2><div></div></div>
      <div class="ed-help">1️⃣ <b>Traçar</b>: arraste pra desenhar. 2️⃣ Escolha um item e <b>toque na pista</b> pra colocar. 3️⃣ <b>Mover</b>: arraste um item pro lugar exato. 👁️ Veja em 3D e 🏁 jogue!</div>
      <div class="ed-tools" id="tools">${t.map(u=>`<button class="ed-tool grp-${u.grp} ${u.t===this.edTool?"sel":""}" data-t="${u.t}" style="--tc:${u.col}"><span>${u.ico}</span><small>${u.lab}</small></button>`).join("")}</div>
      <div class="ed-canvas-wrap"><canvas id="edcv" class="ed-canvas"></canvas><div class="ed-count" id="edcount"></div></div>
      <div class="ed-opts">
        <label>Tema</label>
        <select id="edtheme">${e.map((u,f)=>`<option value="${f}" ${f===this.edTheme?"selected":""}>${u}</option>`).join("")}</select>
        <label>Largura</label>
        <input type="range" id="edhalf" min="3.4" max="6" step="0.2" value="${this.edHalf}">
        <input class="ed-name" id="edname" maxlength="18" value="${this.edName}">
      </div>
      <div class="ed-opts prot-row">
        <label>🛡️ Proteção</label>
        ${[[1,"Cheia"],[.6,"Média"],[.3,"Pouca"],[0,"Nenhuma"]].map(([u,f])=>`<button class="chip prot ${this.edProtect===u?"sel":""}" data-pr="${u}">${f}</button>`).join("")}
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
    </div>`);this.root.appendChild(i);const s=i.querySelector("#edcv"),a=i.querySelector("#edcount"),r=()=>{this.drawEditor(s),a.textContent=`${this.edObs.length+this.edPatches.length} itens · ${this.edPts.length} pts`},o=()=>{const u=s.getBoundingClientRect();if(u.width<4){requestAnimationFrame(o);return}s.width=Math.round(u.width),s.height=Math.round(u.width*this.edH/this.edW),r()};setTimeout(o,30),requestAnimationFrame(o),addEventListener("resize",o);const c=u=>{const f=s.getBoundingClientRect();return{x:(u.clientX-f.left)/f.width*this.edW,y:(u.clientY-f.top)/f.height*this.edH}};let l=!1,h=null;s.addEventListener("pointerdown",u=>{u.preventDefault(),s.setPointerCapture?.(u.pointerId);const f=c(u);this.edTool==="draw"?(l=!0,this.edPts.push(f)):this.edTool==="erase"?this.edEraseAt(f):this.edTool==="move"?h=this.edPickAt(f):this.edPlaceObs(f),r()}),s.addEventListener("pointermove",u=>{const f=c(u);if(l){const g=this.edPts[this.edPts.length-1];(!g||Math.hypot(f.x-g.x,f.y-g.y)>2)&&(this.edPts.push(f),r())}else h&&(h.x=f.x,h.y=f.y,r())});const d=()=>{l=!1,h=null};s.addEventListener("pointerup",d),s.addEventListener("pointercancel",d),s.addEventListener("pointerleave",d),i.querySelectorAll(".ed-tool").forEach(u=>u.addEventListener("click",()=>{this.edTool=u.dataset.t,i.querySelectorAll(".ed-tool").forEach(f=>f.classList.remove("sel")),u.classList.add("sel")})),i.querySelector("#edtheme").addEventListener("change",u=>{this.edTheme=+u.target.value,r()}),i.querySelector("#edhalf").addEventListener("input",u=>{this.edHalf=+u.target.value,r()}),i.querySelector("#edname").addEventListener("change",u=>this.edName=u.target.value||"Minha Pista"),i.querySelectorAll(".prot").forEach(u=>u.addEventListener("click",()=>{this.edProtect=+u.dataset.pr,i.querySelectorAll(".prot").forEach(f=>f.classList.remove("sel")),u.classList.add("sel")})),i.querySelector("#back").addEventListener("click",()=>this.showMenu()),i.querySelector("#edclear").addEventListener("click",()=>{this.edObs.length+this.edPatches.length+this.edPts.length!==0&&(this.edPts=[],this.edObs=[],this.edPatches=[],this.edOpenArcs=[],r())}),i.querySelector("#edsave").addEventListener("click",()=>{if(this.edPts.length<3){this.notify("Trace a pista primeiro!","bad");return}Be.saveTrack(this.edData("ct"+Date.now())),this.notify("Pista salva! 💾","good")}),i.querySelector("#edload").addEventListener("click",()=>this.showMyTracks()),i.querySelector("#edshare").addEventListener("click",()=>this.shareCustom()),i.querySelector("#edview").addEventListener("click",()=>this.previewCustom()),i.querySelector("#edplay").addEventListener("click",()=>this.playCustom())}edData(e){return{id:e,name:this.edName,theme:this.edTheme,half:this.edHalf,pts:this.edPts,obstacles:this.edObs,patches:this.edPatches,protect:this.edProtect,openArcs:this.edOpenArcs}}themeGround(){const e=[["#6f5334","#7a5a34"],["#d9b877","#c9a35f"],["#9a9488","#b4ada0"],["#7d6a4e","#8a744f"],["#4f5b3a","#5f6a44"],["#c8b48c","#b8a074"],["#3f5a2e","#4f6a3a"],["#c98f4a","#b47c3a"]][this.edTheme%8];return{bg:e[0],corr:e[1]}}drawEditor(e){const t=e.getContext("2d"),i=e.width,s=e.height,a=h=>h/this.edW*i,r=h=>h/this.edH*s,o=this.themeGround();t.clearRect(0,0,i,s),t.fillStyle=o.bg,t.fillRect(0,0,i,s);const c=t.createRadialGradient(i/2,s/2,s*.3,i/2,s/2,i*.75);c.addColorStop(0,"rgba(0,0,0,0)"),c.addColorStop(1,"rgba(0,0,0,0.35)"),t.fillStyle=c,t.fillRect(0,0,i,s),t.strokeStyle="rgba(255,255,255,0.045)",t.lineWidth=1;for(let h=0;h<=this.edW;h+=8)t.beginPath(),t.moveTo(a(h),0),t.lineTo(a(h),s),t.stroke();for(let h=0;h<=this.edH;h+=8)t.beginPath(),t.moveTo(0,r(h)),t.lineTo(i,r(h)),t.stroke();const l=i/this.edW;this.edPts.length>1&&(t.lineCap="round",t.lineJoin="round",t.strokeStyle="rgba(0,0,0,0.28)",t.lineWidth=(this.edHalf*2+1.2)*l,this.strokePath(t,a,r),t.strokeStyle=o.corr,t.lineWidth=this.edHalf*2*l,this.strokePath(t,a,r),t.strokeStyle="rgba(255,255,255,0.10)",t.lineWidth=this.edHalf*2*l,this.strokePath(t,a,r),t.strokeStyle="rgba(70,45,20,0.85)",t.lineWidth=Math.max(2,.7*l),this.strokeOffset(t,a,r,this.edHalf),this.strokeOffset(t,a,r,-this.edHalf),t.strokeStyle="rgba(255,255,255,0.55)",t.lineWidth=Math.max(1.5,.35*l),t.setLineDash([6,6]),this.strokePath(t,a,r),t.setLineDash([]));for(const h of this.edPatches){const d=Ln.ED_TOOLS.find(u=>u.t===h.surface)?.col||"#888";t.fillStyle=d+"cc",t.beginPath(),t.arc(a(h.x),r(h.y),2.4*l,0,7),t.fill(),t.fillStyle="#fff",t.font=`${Math.round(1.9*l)}px sans-serif`,t.textAlign="center",t.textBaseline="middle",t.fillText(Ln.ED_TOOLS.find(u=>u.t===h.surface)?.ico||"",a(h.x),r(h.y))}for(const h of this.edObs){const d=Ln.ED_TOOLS.find(u=>u.t===(h.type==="bonus"?"bonus"+(h.n||1):h.type));t.fillStyle="rgba(0,0,0,0.45)",t.beginPath(),t.arc(a(h.x),r(h.y),2*l,0,7),t.fill(),t.font=`${Math.round(2.4*l)}px sans-serif`,t.textAlign="center",t.textBaseline="middle",t.fillText(d?.ico||"⬤",a(h.x),r(h.y))}if(this.edPts.length){const h=this.edPts[0];t.fillStyle="#2ea44f",t.beginPath(),t.arc(a(h.x),r(h.y),1.5*l,0,7),t.fill(),t.font=`${Math.round(2.2*l)}px sans-serif`,t.textAlign="center",t.textBaseline="middle",t.fillText("🚦",a(h.x),r(h.y))}if(this.edPts.length>1){const h=this.edPts[this.edPts.length-1];t.font=`${Math.round(2.6*l)}px sans-serif`,t.textAlign="center",t.textBaseline="middle",t.fillText("🏁",a(h.x),r(h.y))}this.edPts.length<2&&(t.fillStyle="rgba(255,255,255,0.5)",t.font=`${Math.round(.03*i)}px sans-serif`,t.textAlign="center",t.fillText("✏️ arraste aqui pra desenhar a pista",i/2,s/2))}strokePath(e,t,i){e.beginPath(),this.edPts.forEach((s,a)=>{a?e.lineTo(t(s.x),i(s.y)):e.moveTo(t(s.x),i(s.y))}),e.stroke()}strokeOffset(e,t,i,s){const a=this.edPts;if(!(a.length<2)){e.beginPath();for(let r=0;r<a.length;r++){const o=a[Math.max(0,r-1)],c=a[Math.min(a.length-1,r+1)];let l=-(c.y-o.y),h=c.x-o.x;const d=Math.hypot(l,h)||1;l/=d,h/=d;const u=t(a[r].x+l*s),f=i(a[r].y+h*s);r?e.lineTo(u,f):e.moveTo(u,f)}e.stroke()}}edPlaceObs(e){if(this.edPts.length<2){this.notify("Trace a pista primeiro! ✏️","bad");return}const t=this.edTool;if(Ln.ED_SURF.has(t)){this.edPatches.push({surface:t,x:e.x,y:e.y,r:2.4});return}const s={hole:{type:"hole"},bomb:{type:"bomb"},stone:{type:"stone"},jump:{type:"jump"},item:{type:"item"},bonus1:{type:"bonus",n:1},bonus2:{type:"bonus",n:2},bonus3:{type:"bonus",n:3}}[t];s&&this.edObs.push({type:s.type,x:e.x,y:e.y,n:s.n})}edPickAt(e){let t=null,i=36;for(const s of this.edObs){const a=(s.x-e.x)**2+(s.y-e.y)**2;a<i&&(i=a,t=s)}for(const s of this.edPatches){const a=(s.x-e.x)**2+(s.y-e.y)**2;a<i&&(i=a,t=s)}return t}edEraseAt(e){const t=this.edPickAt(e);if(!t)return;const i=this.edObs.indexOf(t);if(i>=0){this.edObs.splice(i,1);return}const s=this.edPatches.indexOf(t);s>=0&&this.edPatches.splice(s,1)}aiPlayers(){const e=uo(Be.skin(),3);return[{name:"Você",isAI:!1,skin:Be.skin()},...e.map((t,i)=>({name:$i[i%$i.length],isAI:!0,ai:Ct[i%Ct.length],skin:t}))]}playCustom(){if(this.edPts.length<3){this.notify("Trace a pista primeiro! ✏️","bad");return}const e=xs(this.edData("play"));this.cb.start({level:2,trackIdx:0,pick:"specific",players:this.aiPlayers(),mode:"quick",customTrack:e})}previewCustom(){if(this.edPts.length<3){this.notify("Trace a pista primeiro! ✏️","bad");return}const e=xs(this.edData("prev"));this.setPreviewDef(e),this.cb.preview?.(e)}setPreviewDef(e){this.edPrevDef=e;try{this.edPrevTrack=new eh(e)}catch{this.edPrevTrack=null}}previewEditMode(){return this.edPrevMode==="view"?"off":this.edPrevMode}preview3D(e,t,i){const s=this.edPrevDef;if(!s)return!1;const a=s._shift||{dx:0,dy:0};if(this.edPrevMode==="move"){const r=t-a.dx,o=i-a.dy;if(e==="down")return this.edDragItem=this.edPickAt({x:r,y:o}),!1;if(e==="move"&&this.edDragItem)return this.edDragItem.x=r,this.edDragItem.y=o,!0;if(e==="up"){const c=!!this.edDragItem;return this.edDragItem=null,c}}else if(this.edPrevMode==="wall"&&e==="down"&&this.edPrevTrack){const r=this.edPrevTrack.progressOf({x:t,y:i}),o=this.edOpenArcs.findIndex(c=>Math.abs(c-r)<6);return o>=0?this.edOpenArcs.splice(o,1):this.edOpenArcs.push(r),!0}return!1}rebuildPreviewDef(){const e=xs(this.edData("prev"));return this.setPreviewDef(e),e}showPreviewBar(){this.clear(),this.edPrevMode="view",this.edDragItem=null;const e=this.el(`<div class="screen preview-bar">
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
      <textarea class="share-box" readonly>${e}</textarea>`,"wide");t.querySelector(".share-box").select(),t.querySelector(".ov-x").addEventListener("click",()=>t.closest(".ov-bg")?.remove())}importSharedTrack(e){try{const t=decodeURIComponent(escape(atob(e))),i=JSON.parse(t);if(!i||!Array.isArray(i.pts)||i.pts.length<2)return!1;this.edPts=i.pts,this.edObs=i.obstacles||[],this.edPatches=i.patches||[],this.edTheme=i.theme||0,this.edHalf=i.half||4.2,this.edName=i.name||"Pista compartilhada",this.edProtect=i.protect==null?1:i.protect,this.edOpenArcs=i.openArcs||[];const s=xs(this.edData("shared")),{box:a,close:r}=this.overlay(`<div class="ov-head"><b>🎁 Pista compartilhada!</b><button class="ov-x">✕</button></div>
        <div class="ov-sub">Alguém te mandou a pista <b>“${this.edName}”</b>. Bora jogar?</div>
        <div class="mactions" style="margin-top:10px"><button class="chip" id="shedit">✏️ Abrir no editor</button><button class="play-btn" id="shplay">🏁 Jogar agora</button></div>`,"wide");return a.querySelector(".ov-x").addEventListener("click",r),a.querySelector("#shedit").addEventListener("click",()=>{r(),this.showEditor()}),a.querySelector("#shplay").addEventListener("click",()=>{r(),this.cb.start({level:2,trackIdx:0,pick:"specific",players:this.aiPlayers(),mode:"quick",customTrack:s})}),!0}catch{return!1}}showMyTracks(){const e=Be.customTracks(),{box:t,close:i}=this.overlay(`<div class="ov-head"><b>📂 Minhas Pistas</b><button class="ov-x">✕</button></div>
      <div class="my-tracks" id="mt">${e.length?"":'<div class="mt-empty">Nenhuma pista salva ainda. Crie a sua! ✏️</div>'}</div>`,"wide"),s=t.querySelector("#mt");e.forEach(a=>{const r=this.el(`<div class="mt-row"><span class="mt-nm">🏁 ${a.name}</span><span class="mt-acts"><button class="chip mini" data-a="load">Abrir</button><button class="chip mini" data-a="share">🔗</button><button class="chip mini" data-a="play">Jogar</button><button class="chip mini danger" data-a="del">🗑️</button></span></div>`);r.querySelector('[data-a="load"]').addEventListener("click",()=>{this.edPts=a.pts.slice(),this.edObs=(a.obstacles||[]).slice(),this.edPatches=(a.patches||[]).slice(),this.edTheme=a.theme,this.edHalf=a.half,this.edName=a.name,this.edProtect=a.protect==null?1:a.protect,this.edOpenArcs=(a.openArcs||[]).slice(),i(),this.showEditor()}),r.querySelector('[data-a="share"]').addEventListener("click",()=>{this.edPts=a.pts.slice(),this.edObs=(a.obstacles||[]).slice(),this.edPatches=(a.patches||[]).slice(),this.edTheme=a.theme,this.edHalf=a.half,this.edName=a.name,this.shareCustom()}),r.querySelector('[data-a="play"]').addEventListener("click",()=>{const o=xs(a);i(),this.cb.start({level:2,trackIdx:0,pick:"specific",players:this.aiPlayers(),mode:"quick",customTrack:o})}),r.querySelector('[data-a="del"]').addEventListener("click",()=>{Be.deleteTrack(a.id),r.remove()}),s.appendChild(r)}),t.querySelector(".ov-x").addEventListener("click",i)}resetPlayers(e){this.cfgPlayers=[{human:!0,ai:"cauteloso",color:0,name:"Você"}];let t=3;(e==="daily"||e==="trial")&&(t=0),e==="local"&&(t=1),e==="elim"&&(t=5),e==="dupla"&&(t=this.cfgTeamSize*2-1);for(let i=0;i<t;i++)this.cfgPlayers.push({human:e==="local",ai:Ct[i%Ct.length],color:(i+1)%gs.length,name:e==="local"?`Jogador ${i+2}`:$i[i%$i.length]})}showSetup(e){if(this.cfgMode=e,this.resetPlayers(e),this.cfgPick="specific",e==="daily"){const t=new Date,i=t.getFullYear()*372+(t.getMonth()+1)*31+t.getDate();this.cfgLevel=i%5,this.cfgTrack=Math.floor(i/5)%Bt}this.renderSetup()}renderSetup(){this.clear();const e=this.cfgMode==="daily",t=this.cfgMode==="trial",i=this.cfgMode==="dupla",s=this.cfgMode==="elim",a=this.cfgMode==="caos",r=this.cfgMode==="champ",o=this.cfgPick!=="specific",c=rh(this.cfgLevel,this.cfgTrack),l=!e&&!t,h={quick:"Corrida Rápida",ai:"Contra a IA",local:"Multiplayer Local",champ:"Campeonato",daily:"Desafio Diário",caos:"🌀 Modo Caos",elim:"💀 Eliminação",trial:"⏱️ Contra-Relógio",dupla:"🤝 Corrida de Dupla"}[this.cfgMode],d=a?'<div class="mode-banner caos">🌀 <b>Modo Caos:</b> caixas <b>?</b> na pista dão power-ups. Quem está mais atrás pega os melhores (raio, foguete, salto). Toque no item pra usar!</div>':s?'<div class="mode-banner elim">💀 <b>Eliminação:</b> a cada corrida numa pista nova, o <b>último colocado sai</b>. Sobrevive até ser o único!</div>':t?'<div class="mode-banner trial">⏱️ <b>Contra-Relógio:</b> você sozinho. Leve a tampinha à chegada com o <b>menor número de petelecos</b> possível.</div>':i?'<div class="mode-banner dupla">🤝 <b>Dupla:</b> dois times. Vence o time com a <b>menor soma de colocações</b>. Ajude o parceiro… ou atrapalhe o rival!</div>':"",u=e?"":`<div class="lvl-row" id="lvls">
      ${Xn.map((M,C)=>`<button class="lvl-chip ${C===this.cfgLevel?"sel":""}" data-l="${C}" style="--lc:${_s[C]}"><b>${M}</b><span>${this.levelHint(C)}</span></button>`).join("")}
    </div>`;let f="";if(r){const M=qi[this.cfgChampFmt],C=Object.keys(qi).map(A=>`<button class="champ-fmt ${A===this.cfgChampFmt?"sel":""}" data-f="${A}"><span class="cf-ico">${qi[A].ico}</span><b>${qi[A].name}</b><span>${qi[A].desc}</span></button>`).join(""),w=this.cfgChampFmt==="gp"?"<b>todos os níveis</b> (Fácil → Extrema)":`nível <b style="color:${_s[this.cfgLevel]}">${Xn[this.cfgLevel]}</b>`;f=`<div class="champ-fmts">${C}</div>
        <div class="champ-note">🏆 <b>${M.races} corridas</b> · ${w}. Pontos por posição em cada corrida — some tudo e seja o <b>campeão</b>! 🏅</div>`}else if(o)f=`<div class="track-pick">
        <div class="track-card mystery" style="border-color:${this.cfgPick==="randany"?"#b98cff":_s[this.cfgLevel]}">
          <div class="track-name">🎲 Surpresa!</div>
          <div class="track-sub">${this.cfgPick==="randany"?"pista aleatória de qualquer nível":"pista aleatória do nível "+Xn[this.cfgLevel]}</div>
        </div>
      </div>`;else{const M=!e,C=Array.from({length:Bt},(w,A)=>`<button class="tnum ${A===this.cfgTrack?"sel":""}" data-i="${A}">${A+1}</button>`).join("");f=`<div class="track-pick">
        ${M?'<button class="arrow" id="tprev">‹</button>':""}
        <div class="track-card" style="border-color:${_s[this.cfgLevel]}">
          <div class="track-name">${c.name}</div>
          <div class="track-sub">${c.theme} · ${this.lenLabel(c)}${M?" · pista "+(this.cfgTrack+1)+"/"+Bt:" · "+Xn[this.cfgLevel]}</div>
          <div class="track-mini" id="mini"></div>
        </div>
        ${M?'<button class="arrow" id="tnext">›</button>':""}
      </div>
      ${M?`<div class="tnum-row" id="tnums">${C}</div>`:""}`}const g=i?`<div class="rand-row team-row">
      <button class="chip ${this.cfgTeamSize===2?"sel":""}" data-ts="2">2 × 2</button>
      <button class="chip ${this.cfgTeamSize===3?"sel":""}" data-ts="3">3 × 3</button>
    </div>`:"",v=e||r?"":`<div class="rand-row">
      <button class="chip ${this.cfgPick==="specific"?"sel":""}" id="pspec">🎯 Escolher</button>
      <button class="chip ${this.cfgPick==="randlevel"?"sel":""}" id="prlvl">🎲 Do nível</button>
      <button class="chip ${this.cfgPick==="randany"?"sel":""}" id="prany">🎲 Qualquer</button>
    </div>`,m=t?`<div class="daily-note">⏱️ <b>${c.name}</b> (${Xn[this.cfgLevel]}). Você sozinho: chegue com o <b>menor número de petelecos</b>. Recorde nesta pista: <b>${Be.trialBest(this.cfgLevel,this.cfgTrack)??"—"}</b></div>`:`<div class="daily-note">Pista do dia: <b>${c.name}</b> (${Xn[this.cfgLevel]}). Contra o relógio: leve a tampinha à chegada com o <b>menor número de petelecos</b>. Recorde de hoje: <b>${Be.dailyBest(Wg())??"—"}</b></div>`,p=this.el(`
      <div class="screen setup">
        <div class="setup-head"><button class="txt-btn" id="back">‹ Voltar</button><h2>${h}</h2><div></div></div>
        ${d}
        ${u}
        ${g}
        ${v}
        ${f}
        ${l?`<div class="players" id="players"></div>
        ${i?"":`<div class="pcount">
          <button class="chip" id="less">– jogador</button>
          <span>${this.cfgPlayers.length} tampinhas</span>
          <button class="chip" id="more">+ jogador</button>
        </div>`}`:m}
        <div class="play-dock"><button class="play-btn" id="play">Jogar ▶</button></div>
      </div>`);this.root.appendChild(p),p.prepend(this.bgFx(6));const _=p.querySelector("#mini");_&&this.drawMini(_,c);const y=["caos","elim","trial","dupla"].includes(this.cfgMode);p.querySelector("#back").addEventListener("click",()=>y?this.showModes():this.showMenu()),p.querySelectorAll(".lvl-chip").forEach(M=>M.addEventListener("click",()=>{this.cfgLevel=+M.dataset.l,this.cfgTrack=0,this.renderSetup()})),p.querySelectorAll(".champ-fmt").forEach(M=>M.addEventListener("click",()=>{this.cfgChampFmt=M.dataset.f,this.renderSetup()})),p.querySelectorAll("[data-ts]").forEach(M=>M.addEventListener("click",()=>{this.cfgTeamSize=+M.dataset.ts,this.resetPlayers("dupla"),this.renderSetup()})),p.querySelector("#pspec")?.addEventListener("click",()=>{this.cfgPick="specific",this.renderSetup()}),p.querySelector("#prlvl")?.addEventListener("click",()=>{this.cfgPick="randlevel",this.renderSetup()}),p.querySelector("#prany")?.addEventListener("click",()=>{this.cfgPick="randany",this.renderSetup()}),p.querySelector("#tprev")?.addEventListener("click",()=>{this.cfgTrack=(this.cfgTrack+Bt-1)%Bt,this.renderSetup()}),p.querySelector("#tnext")?.addEventListener("click",()=>{this.cfgTrack=(this.cfgTrack+1)%Bt,this.renderSetup()}),p.querySelectorAll(".tnum").forEach(M=>M.addEventListener("click",()=>{this.cfgTrack=+M.dataset.i,this.renderSetup()})),l&&(this.renderPlayers(p.querySelector("#players")),p.querySelector("#less").addEventListener("click",()=>{this.cfgPlayers.length>2&&(this.cfgPlayers.pop(),this.renderSetup())}),p.querySelector("#more").addEventListener("click",()=>{if(this.cfgPlayers.length<6){const M=this.cfgPlayers.length;this.cfgPlayers.push({human:this.cfgMode==="local",ai:Ct[M%Ct.length],color:M%gs.length,name:this.cfgMode==="local"?`Jogador ${M+1}`:$i[(M-1)%$i.length]}),this.renderSetup()}})),p.querySelector("#play").addEventListener("click",()=>this.launch())}levelHint(e){return["muito protegida","protegida","pouca proteção","quase sem muro","sem muro"][e]}lenLabel(e){let t=0;for(let i=1;i<e.path.length;i++)t+=Math.hypot(e.path[i].x-e.path[i-1].x,e.path[i].y-e.path[i-1].y);return t<320?"curta":t<480?"longa":t<620?"muito longa":"épica"}renderPlayers(e){e.innerHTML="";const t=this.cfgMode==="dupla";this.cfgPlayers.forEach((i,s)=>{const a=s===0,r=t?s%2:-1,o=t?`<span class="team-badge t${r}">Time ${r===0?"A":"B"}</span>`:"",c=this.el(`<div class="prow ${a?"you-row":""} ${t?"team-t"+r:""}">
        ${a?'<span class="pcap-mini" id="ycap"></span>':`<span class="pdot" style="background:${gs[i.color]}"></span>`}
        <input class="pname" value="${i.name}" ${a?"readonly":""}/>
        ${o}
        ${a?'<button class="ptag you">🎨 trocar</button>':`<button class="ptype">${i.human?"👤 Humano":"🤖 "+ih[i.ai]}</button>`}
      </div>`);e.appendChild(c);const l=c.querySelector(".pname");if(l.addEventListener("change",()=>i.name=l.value||i.name),a){const h=c.querySelector("#ycap"),d=wt(mt(Be.skin()).art,60);d.style.width="100%",d.style.height="100%",d.style.display="block",h.appendChild(d);const u=()=>this.showCapPicker(Be.skin(),f=>{this.cb.setSkin(f),this.renderPlayers(e)});h.addEventListener("click",u),c.querySelector(".ptag").addEventListener("click",u)}else{const h=c.querySelector(".pdot");h.addEventListener("click",()=>{i.color=(i.color+1)%gs.length,h.style.background=gs[i.color]});const d=c.querySelector(".ptype");d&&d.addEventListener("click",()=>{if(this.cfgMode==="local")i.human=!i.human,i.human||(i.ai=Ct[s%Ct.length]);else{const u=Ct.indexOf(i.ai);i.ai=Ct[(u+1)%Ct.length],i.human=!1}this.renderPlayers(e)})}})}launch(){const e=this.cfgMode==="daily"||this.cfgMode==="trial",t=this.cfgMode==="dupla",i=uo(Be.skin(),this.cfgPlayers.length-1),s=e?[{name:"Você",isAI:!1,skin:Be.skin()}]:this.cfgPlayers.map((o,c)=>({name:o.name,isAI:!o.human,ai:o.ai,skin:c===0?Be.skin():i[c-1],team:t?c%2:void 0}));let a=this.cfgLevel,r=this.cfgTrack;this.cfgPick==="randlevel"?r=Math.floor(Math.random()*Bt):this.cfgPick==="randany"&&(a=Math.floor(Math.random()*5),r=Math.floor(Math.random()*Bt)),this.cb.start({level:a,trackIdx:r,pick:this.cfgPick,players:s,mode:this.cfgMode,champFmt:this.cfgChampFmt,teamSize:this.cfgTeamSize})}drawMini(e,t){const r=document.createElement("canvas");r.width=250,r.height=156;const o=r.getContext("2d"),c=Math.min((250-10*2)/t.w,(156-10*2)/t.h),l=(250-t.w*c)/2,h=(156-t.h*c)/2,d=g=>l+g*c,u=g=>h+g*c;o.fillStyle="#0000002e",o.fillRect(0,0,250,156),o.strokeStyle="rgba(255,255,255,0.18)",o.lineWidth=Math.max(4,8*c),o.lineCap="round",o.lineJoin="round",o.beginPath(),t.path.forEach((g,v)=>{const m=d(g.x),p=u(g.y);v?o.lineTo(m,p):o.moveTo(m,p)}),o.stroke(),o.strokeStyle=t.wallCol||"#caa",o.globalAlpha=.9,o.lineWidth=1.3,o.beginPath();for(const g of t.walls)o.moveTo(d(g.a.x),u(g.a.y)),o.lineTo(d(g.b.x),u(g.b.y));o.stroke(),o.globalAlpha=1,o.strokeStyle="rgba(255,255,255,0.5)",o.lineWidth=1.4,o.setLineDash([3,3]),o.beginPath(),t.path.forEach((g,v)=>{const m=d(g.x),p=u(g.y);v?o.lineTo(m,p):o.moveTo(m,p)}),o.stroke(),o.setLineDash([]);for(const g of t.obstacles){const v=Math.max(1.4,g.r*c);o.fillStyle=g.type==="hole"?"#120c06":g.type==="bomb"?"#e5484d":g.type==="stone"?"#9a948a":g.n>=3?"#e0a020":g.n===2?"#2e9fa4":"#2ea44f",o.beginPath(),o.arc(d(g.x),u(g.y),v,0,7),o.fill()}o.fillStyle="#3fae6a",o.beginPath(),o.arc(d(t.start.x),u(t.start.y),4,0,7),o.fill(),o.fillStyle="#e5484d";const f=t.finish[0];o.beginPath(),o.arc(d(f.x),u(f.y),4,0,7),o.fill(),e.innerHTML="",e.appendChild(r)}showSkins(){this.clear();const e=Be.wins(),t=Be.skin(),i=this.el(`<div class="screen skins">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Voltar</button><h2>Tampinhas <span class="cap-count">${pr(e).length}/${an.length}</span></h2><div></div></div>
      <div class="skin-scroll" id="scroll"></div>
    </div>`);this.root.appendChild(i),i.prepend(this.bgFx(5));const s=i.querySelector("#scroll");for(const a of rg){const r=an.filter(h=>h.rarity===a),o=r.filter(h=>e>=h.unlock).length,c=this.el(`<div class="rar-sec">
        <div class="rar-head" style="--rc:${vs[a]}"><span class="rar-dot"></span>${Ql[a]} <b>${o}/${r.length}</b></div>
        <div class="skin-grid"></div></div>`);s.appendChild(c);const l=c.querySelector(".skin-grid");for(const h of r){const d=e<h.unlock,u=this.el(`<button class="skin-card ${t===h.id?"sel":""} ${d?"locked":""}" style="--rc:${vs[h.rarity]}">
          <div class="skin-face"></div>
          <div class="skin-name">${h.name}</div>
          <div class="skin-desc">${d?"🔒 "+h.unlock+" vitórias":h.desc}</div>
          ${br(h.stats,!0)}
        </button>`),f=u.querySelector(".skin-face"),g=wt(h.art,132);g.style.width="100%",g.style.height="auto",g.style.display="block",d&&(g.style.filter="grayscale(1) brightness(0.55)"),f.appendChild(g),l.appendChild(u),d||u.addEventListener("click",()=>{this.cb.setSkin(h.id),this.showSkins()})}}i.querySelector("#back").addEventListener("click",()=>this.showMenu())}showSettings(){this.clear();const e=this.el(`<div class="screen settings">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Voltar</button><h2>Ajustes</h2><div></div></div>
      <div class="cfg-row"><label>Música</label><input type="range" id="mus" min="0" max="1" step="0.05" value="${Dt.music}"></div>
      <div class="cfg-row"><label>Efeitos</label><input type="range" id="sfx" min="0" max="1" step="0.05" value="${Dt.sfx}"></div>
      <div class="cfg-row"><label>Mudo</label><button class="chip" id="mute">${Dt.muted?"🔇 Ligado":"🔊 Desligado"}</button></div>
      <div class="how"><b>Como jogar:</b> arraste a tampinha <b>para trás</b> e solte — quanto mais puxa, mais forte. 3 petelecos por vez; chegue primeiro! <b>Proteção:</b> pistas fáceis têm muro que te segura na pista; nas difíceis o muro some e é fácil <b>cair fora</b> (volta pro início do turno). <b>Buraco</b> = volta ao checkpoint e perde 1 peteléco · <b>X</b> = perde a vez · <b>verde +1/+2/+3</b> = petelecos extras. Câmera: dois dedos giram/aproximam.</div>
    </div>`);this.root.appendChild(e),e.prepend(this.bgFx(5));const t=()=>this.cb.setVols(+e.querySelector("#mus").value,+e.querySelector("#sfx").value,Dt.muted);e.querySelector("#mus").addEventListener("input",t),e.querySelector("#sfx").addEventListener("input",t),e.querySelector("#mute").addEventListener("click",()=>{Dt.muted=!Dt.muted,t(),e.querySelector("#mute").textContent=Dt.muted?"🔇 Ligado":"🔊 Desligado"}),e.querySelector("#back").addEventListener("click",()=>this.showMenu())}overlay(e,t=""){const i=this.el(`<div class="ov-bg"><div class="ov ${t}">${e}</div></div>`);this.root.appendChild(i);const s=()=>i.remove();return i.addEventListener("click",a=>{a.target===i&&s()}),{box:i.querySelector(".ov"),close:s}}notify(e,t=""){const i=this.el(`<div class="float-msg ${t}">${e}</div>`);this.root.appendChild(i),setTimeout(()=>i.classList.add("show"),10),setTimeout(()=>{i.classList.remove("show"),setTimeout(()=>i.remove(),300)},2400)}showCapPicker(e,t){const i=pr(Be.wins()),{box:s,close:a}=this.overlay(`
      <div class="ov-head"><b>🎨 Sua tampinha</b><button class="ov-x">✕</button></div>
      <div class="ov-sub">Você tem ${i.length} tampinha${i.length>1?"s":""} — toque pra escolher</div>
      <div class="pick-grid" id="pg"></div>`,"wide"),r=s.querySelector("#pg");for(const o of i){const c=this.el(`<button class="pick-card ${o.id===e?"sel":""}" style="--rc:${vs[o.rarity]}">
        <div class="pick-face"></div><div class="pick-name">${o.name}</div>${br(o.stats,!0)}</button>`),l=wt(o.art,96);l.style.width="100%",l.style.height="auto",l.style.display="block",c.querySelector(".pick-face").appendChild(l),c.addEventListener("click",()=>{t(o.id),a()}),r.appendChild(c)}s.querySelector(".ov-x").addEventListener("click",a)}showCapStats(e,t){const i=mt(t),{box:s,close:a}=this.overlay(`
      <div class="ov-head"><b>${e}</b><button class="ov-x">✕</button></div>
      <div class="cs-face" id="csf"></div>
      <div class="cs-name" style="color:${vs[i.rarity]}">${i.name}</div>
      <div class="rar-head cs-rar" style="--rc:${vs[i.rarity]};justify-content:center"><span class="rar-dot"></span>${Ql[i.rarity]}</div>
      ${br(i.stats,!0)}
      <div class="cs-desc">${i.desc}</div>`,"stats"),r=wt(i.art,160);r.style.width="124px",r.style.height="124px",r.style.display="block",r.style.margin="0 auto",s.querySelector("#csf").appendChild(r),s.querySelector(".ov-x").addEventListener("click",a)}showHelp(){this.clear();const e=[["⚫","Buraco","Caiu, voltou! Você retorna ao <b>último checkpoint</b> e perde 1 peteléco. Eles ficam fora da linha central — dá pra desviar."],["💣","Bomba (X)","Explode e você <b>perde o resto da vez</b>. Passe bem longe."],["🪨","Pedra","Sólida: a tampinha <b>quica</b> nela. Dá pra usar de tabela pra fazer curva… ou te atrapalha."],["🛫","Rampa de salto","Com <b>velocidade</b> a tampinha decola e <b>voa por cima</b> do buraco na frente. Devagar, ela cai. Chegue com força!"],["⏫","Setas verdes","Tira de aceleração: dá um <b>impulso</b> no sentido da pista. Passe por cima pra ganhar velocidade."],["🪵","Tábuas (zig-zag)","Estreitam a pista de um lado e do outro. Faça o <b>zigue-zague</b> pra passar."],["💎","Bônus +1/+2/+3","Petelecos extras! Ficam em lugares <b>arriscados</b>: quanto maior o número, mais perto da beira ou de um buraco. O +3 é pra corajoso."],["🚩","Checkpoint","A faixa azul numerada. Ao <b>cruzar</b>, você fica salvo ali — se cair depois, volta pra este ponto (não pro início)."],["🏁","Fora da pista","Saiu do corredor? Volta pro começo do peteléco. Nas fases difíceis quase não tem muro — cuidado!"]],t=[["Peso","⚖️","Massa da tampinha. A <b>pesada</b> quase não sai do lugar quando batem nela e <b>empurra</b> as leves pra longe. Só que em areia/lama afunda e freia mais."],["Desliza","💨","Vai <b>mais longe</b> com o mesmo peteléco. Ótima em calçada/giz; cuidado pra não passar do ponto."],["Controle","🎯","Freia mais certinho no fim — <b>para onde você mira</b>. Boa pra encaixar em espaço apertado sem passar direto."],["Quique","🏀",'Quica mais nas <b>bordas</b> e pedras, e "tabela" mais forte batendo nas outras tampinhas.'],["Estabil.","🌀","Mantém a linha: <b>roda menos</b> e desvia menos do rumo. Estável = previsível."],["Potência","💥","Sai com mais <b>força</b>: bate mais forte nas rivais (joga elas longe) e atravessa melhor a <b>lama e a areia</b>. Quem vai mais longe é o Desliza."],["Aderência","🧲","Firmeza na pista: <b>difícil de te jogarem pra fora</b> quando batem em você. Segura firme na hora do encontrão."]],i=(a,r,o)=>`<div class="hc"><div class="hc-ico">${a}</div><div class="hc-tx"><div class="hc-t">${r}</div><div class="hc-d">${o}</div></div></div>`,s=this.el(`<div class="screen help">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Voltar</button><h2>Como Jogar</h2><div></div></div>
      <div class="help-scroll">
        <div class="help-intro">Arraste a tampinha <b>para trás</b> e solte — quanto mais puxa, mais forte. São <b>3 petelecos</b> por vez. A corrida acaba quando o <b>penúltimo</b> chega. Dois dedos giram/aproximam a câmera.</div>
        <h3 class="help-h">🧩 Obstáculos</h3>
        <div class="help-grid">${e.map(a=>i(a[0],a[1],a[2])).join("")}</div>
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
    </div>`);this.root.appendChild(e),e.prepend(this.bgFx(5));const t=wt(mt(Be.skin()).art,96);t.style.width="86px",t.style.height="86px",t.style.display="block",t.style.margin="0 auto";const i=e.querySelector("#olface");i.appendChild(t),i.addEventListener("click",()=>this.showCapPicker(Be.skin(),o=>{this.cb.setSkin(o),this.showOnlineHome()}));const s=e.querySelector("#oname"),a=e.querySelector("#ocode"),r=()=>(this.myName=(s.value||"Você").slice(0,12),Be.setName(this.myName),this.myName);s.addEventListener("change",r),a.addEventListener("input",()=>a.value=a.value.toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,5)),e.querySelector("#back").addEventListener("click",()=>{this.online.leave(),this.showMultiplayer()}),e.querySelector("#create").addEventListener("click",()=>{this.online.createRoom(r(),Be.skin()),this.showLobby("Criando sala…")}),e.querySelector("#join").addEventListener("click",()=>{const o=a.value.trim();if(o.length<4){this.notify("Digite o código da sala","bad");return}this.online.joinRoom(o,r(),Be.skin()),this.showLobby("Entrando na sala…")})}showLobby(e=""){this.clear(),this.lobbyOpen=!0;const t=this.el(`<div class="screen setup lobby">
      <div class="setup-head"><button class="txt-btn" id="back">‹ Sair</button><h2>Sala Online</h2><div></div></div>
      <div class="lob-code" id="code"></div>
      <div class="lob-status" id="status">${e}</div>
      <div class="lob-seats" id="seats"></div>
      <div class="lob-ctrl" id="ctrl"></div>
    </div>`);this.root.appendChild(t),t.prepend(this.bgFx(4)),t.querySelector("#back").addEventListener("click",()=>{this.lobbyOpen=!1,this.online.leave(),this.showOnlineHome()}),this.online.onCode=()=>this.renderLobby(),this.online.onRoster=()=>this.renderLobby(),this.online.onError=i=>{const s=document.querySelector(".lobby #status");s&&(s.textContent=i,s.classList.add("err")),this.notify(i,"bad")},this.renderLobby()}renderLobby(){const e=this.root.querySelector(".lobby");if(!e)return;const t=this.online;e.querySelector("#code").innerHTML=t.code?`<span class="lc-lab">código</span><span class="lc-val" id="cval">${t.code}</span><button class="chip lc-copy" id="copy">📋 Compartilhar</button>`:'<span class="lc-lab">conectando…</span>';const i=e.querySelector("#copy");i&&i.addEventListener("click",()=>{const o="Bora jogar Tampinha Rally! Código da sala: "+t.code;navigator.share?navigator.share({text:o}).catch(()=>{}):navigator.clipboard?navigator.clipboard.writeText(t.code).then(()=>this.notify("Código copiado!","good")):this.notify("Código: "+t.code)});const s=e.querySelector("#seats");s.innerHTML="";const a=t.seats.length?t.seats:[{name:t.myName,skin:t.mySkin,kind:"human",owner:"host"}];e.querySelector("#status").textContent=`${a.length}/6 na sala`,a.forEach(o=>{const c=o.kind==="human"&&o.owner===t.myId,l=o.off?"📴 saiu (IA)":o.kind==="ai"?"🤖 "+t.aiLabel(o.ai):o.owner==="host"?"👑 anfitrião":c?"⭐ você":"👤 jogador",h=t.cfg.roomMode==="dupla"&&o.team!=null?`<span class="team-badge t${o.team}">${o.team===0?"A":"B"}</span>`:"",d=c?`<input class="ls-name-edit" id="myname" maxlength="12" value="${o.name}"/>`:`<span class="ls-name">${o.name}</span>`,u=this.el(`<div class="prow lob-seat ${c?"you-row":""} ${t.cfg.roomMode==="dupla"&&o.team!=null?"team-t"+o.team:""}"><span class="pcap-mini"></span>${d}${h}<span class="ls-tag">${l}</span></div>`),f=wt(mt(o.skin).art,56);if(f.style.width="100%",f.style.height="100%",f.style.display="block",u.querySelector(".pcap-mini").appendChild(f),c){const g=u.querySelector(".pcap-mini");g.classList.add("tap"),g.addEventListener("click",()=>this.showCapPicker(t.mySkin,p=>{this.cb.setSkin(p),t.setMyCap(p)}));const v=u.querySelector("#myname"),m=()=>{const p=(v.value||"Você").slice(0,12);this.myName=p,Be.setName(p),t.setMyName(p)};v.addEventListener("change",m),v.addEventListener("blur",m)}s.appendChild(u)});const r=e.querySelector("#ctrl");if(r.innerHTML="",t.isHost){const o=Xn.map((g,v)=>`<button class="lvl-chip mini ${v===t.cfg.level?"sel":""}" data-l="${v}" style="--lc:${_s[v]}"><b>${g}</b></button>`).join(""),c=`<div class="rand-row"><button class="chip ${t.cfg.pick==="specific"?"sel":""}" data-p="specific">🎯 Escolher</button><button class="chip ${t.cfg.pick==="randlevel"?"sel":""}" data-p="randlevel">🎲 Do nível</button><button class="chip ${t.cfg.pick==="randany"?"sel":""}" data-p="randany">🎲 Qualquer</button></div>`,l=t.cfg.pick==="specific"?`<div class="tnum-row">${Array.from({length:Bt},(g,v)=>`<button class="tnum ${v===t.cfg.trackIdx?"sel":""}" data-i="${v}">${v+1}</button>`).join("")}</div>`:"",h=t.cfg.roomMode,d=`<div class="lob-h">Modo da sala</div><div class="rand-row room-row">
        <button class="chip ${h==="normal"?"sel":""}" data-rm="normal">🏁 Normal</button>
        <button class="chip ${h==="dupla"?"sel":""}" data-rm="dupla">🤝 Dupla</button>
        <button class="chip ${h==="champ"?"sel":""}" data-rm="champ">🏆 Campeonato</button></div>`,u=h==="dupla"?`<div class="rand-row"><button class="chip ${t.cfg.teamSize===2?"sel":""}" data-team="2">2 × 2</button><button class="chip ${t.cfg.teamSize===3?"sel":""}" data-team="3">3 × 3</button></div>`:h==="champ"?`<div class="rand-row">${[3,5,7].map(g=>`<button class="chip ${t.cfg.champRaces===g?"sel":""}" data-cr="${g}">${g} corridas</button>`).join("")}</div>`:"",f=h==="dupla"?"":`<div class="lob-total"><button class="chip" id="tless">–</button><span><b>${t.total}</b> corredores <small>(${t.seats.filter(g=>g.kind==="human").length} 👤 + ${t.seats.filter(g=>g.kind==="ai").length} 🤖)</small></span><button class="chip" id="tmore">+</button></div>`;r.innerHTML=`${d}${u}<div class="lob-h">Dificuldade &amp; fase</div><div class="lvl-row">${o}</div>${c}${l}
        ${f}
        <button class="play-btn" id="startm">🏁 Começar ${h==="champ"?"Campeonato":h==="dupla"?"Dupla":"Partida"}</button>`,r.querySelectorAll("[data-rm]").forEach(g=>g.addEventListener("click",()=>t.setRoom(g.dataset.rm))),r.querySelectorAll("[data-team]").forEach(g=>g.addEventListener("click",()=>t.setRoom("dupla",+g.dataset.team))),r.querySelectorAll("[data-cr]").forEach(g=>g.addEventListener("click",()=>t.setRoom("champ",t.cfg.teamSize,+g.dataset.cr))),r.querySelectorAll(".lvl-chip").forEach(g=>g.addEventListener("click",()=>t.setCfg(+g.dataset.l,0,t.cfg.pick))),r.querySelectorAll("[data-p]").forEach(g=>g.addEventListener("click",()=>t.setCfg(t.cfg.level,t.cfg.trackIdx,g.dataset.p))),r.querySelectorAll(".tnum").forEach(g=>g.addEventListener("click",()=>t.setCfg(t.cfg.level,+g.dataset.i,t.cfg.pick))),r.querySelector("#tless")?.addEventListener("click",()=>t.setTotal(t.total-1)),r.querySelector("#tmore")?.addEventListener("click",()=>t.setTotal(t.total+1)),r.querySelector("#startm").addEventListener("click",()=>{this.lobbyOpen=!1,t.startMatch()})}else{const o=t.cfg.roomMode==="dupla"?`🤝 Dupla ${t.cfg.teamSize}×${t.cfg.teamSize}`:t.cfg.roomMode==="champ"?`🏆 Campeonato (${t.cfg.champRaces} corridas)`:"🏁 Normal";r.innerHTML=`<div class="lob-wait">⏳ Aguardando o anfitrião começar…<br><small>Modo: <b>${o}</b> · Dificuldade: <b>${Xn[t.cfg.level]}</b></small></div>`}}showGame(){this.clear(),this.hud=this.el(`
    <div class="screen hud">
      <div class="hud-top">
        <button class="round" id="pause">❚❚</button>
        <div class="turn-banner" id="turn"></div>
        <button class="round" id="cam" title="A câmera segue sozinha">🎯</button>
      </div>
      <div class="standings" id="stand"></div>
      <div class="item-slot hidden" id="item"></div>
      <div class="flicks" id="flicks"></div>
      <div class="toast-wrap" id="toasts"></div>
      <div class="hint" id="hint"></div>
      <div class="modal-bg hidden" id="modal"><div class="modal" id="mbox"></div></div>
    </div>`),this.root.appendChild(this.hud),this.hud.querySelector("#pause").addEventListener("click",()=>this.onPause?.())}updateHUD(e,t){if(!this.hud)return;const i=e.activeCap(),s=this.hud.querySelector("#turn");s.innerHTML=`<span class="tdot" style="background:${mt(i.skin).top};color:${mt(i.skin).top}"></span> ${i.finished?"Corrida!":"Vez de <b>"+i.name+"</b>"} <span class="tzoom">🔍</span>`,s.onclick=()=>this.showCapStats(i.name,i.skin);const a=this.hud.querySelector("#flicks");let r="";Math.max(3,i.flicksLeft);for(let h=0;h<i.flicksLeft;h++)r+='<span class="fd on"></span>';a.innerHTML=(e.phase==="aim"&&t?'<span class="fl-lab">Petelecos</span>':"")+r+(i.flicksLeft===1?'<span class="flast">último!</span>':""),a.style.opacity=i.isAI||e.phase!=="aim"?"0.55":"1";const o=this.hud.querySelector("#item");if(e.chaos&&t&&e.phase==="aim"&&(i.item||i.shield||i.boostNext>1)){o.classList.remove("hidden");let h="";if(i.item){const f=Ji[i.item];h+=`<button class="item-btn"><span class="it-ico">${f.ico}</span><span class="it-tx"><b>${f.name}</b><small>${f.desc}</small></span><span class="it-use">USAR</span></button>`}const d=this.activeFxHtml(i);d&&(h+=`<div class="fx-active">${d}</div>`),o.innerHTML=h;const u=o.querySelector(".item-btn");u&&(u.onclick=()=>this.onUseItem?.())}else o.classList.add("hidden"),o.innerHTML="";const c=this.hud.querySelector("#stand");c.innerHTML=e.standings().map((h,d)=>`<div class="srow ${h.id===i.id?"act":""}" data-id="${h.id}"><span class="spos">${d+1}º</span><span class="sdot" style="background:${mt(h.skin).top}"></span><span class="sname">${h.name}</span>${e.chaos?this.capFxIcons(h):""}${h.finished?'<span class="sfin">🏁</span>':'<span class="szoom">🔍</span>'}</div>`).join(""),c.querySelectorAll(".srow").forEach(h=>h.addEventListener("click",()=>{const d=e.caps[+h.dataset.id];d&&this.showCapStats(d.name,d.skin)}));const l=this.hud.querySelector("#hint");l.style.display=t&&e.phase==="aim"?"block":"none",l.textContent="Arraste a tampinha para trás e solte"}capFxIcons(e){let t="";return e.item&&(t+=`<span class="fx-held" title="guardado">${Ji[e.item].ico}</span>`),e.shield&&(t+='<span class="fx-on" title="escudo ativo">🛡️</span>'),e.boostNext>1&&(t+='<span class="fx-on" title="turbo pronto">🚀</span>'),t?`<span class="srow-fx">${t}</span>`:""}activeFxHtml(e){const t=[];return e.shield&&t.push('<span class="fxa shield">🛡️ Escudo ativo</span>'),e.boostNext>1&&t.push('<span class="fxa boost">🚀 Turbo pronto</span>'),t.join("")}toast(e,t=""){if(!this.hud)return;const i=this.hud.querySelector("#toasts"),s=this.el(`<div class="toast ${t}">${e}</div>`);i.appendChild(s),setTimeout(()=>s.classList.add("show"),10),setTimeout(()=>{s.classList.remove("show"),setTimeout(()=>s.remove(),300)},1700)}showPause(){const e=this.hud.querySelector("#modal"),t=this.hud.querySelector("#mbox");t.className="modal",t.innerHTML=`<h3>Pausado</h3><div class="mactions col">
      <button class="play-btn" id="r">▶ Continuar</button>
      <button class="chip" id="re">↻ Reiniciar</button>
      <button class="chip" id="mn">Sair</button></div>`,e.classList.remove("hidden"),t.querySelector("#r").addEventListener("click",()=>this.onResume?.()),t.querySelector("#re").addEventListener("click",()=>this.onRestart?.()),t.querySelector("#mn").addEventListener("click",()=>this.onMenu?.())}hideModal(){this.hud?.querySelector("#modal").classList.add("hidden")}showResults(e,t,i,s){const a=this.hud.querySelector("#modal"),r=this.hud.querySelector("#mbox"),o=e.standings(),c=t==="online"&&this.online.active?e.caps[this.online.mySeatIndex()]:e.caps.find(v=>!v.isAI),l=s?s.won:c&&c.place===1;r.className="modal win";const h=t==="daily"?`<h3>Chegou! 🏁</h3><div class="big">${e.caps[0].place===1?"Você completou!":""}</div>`:s?`<h3>${s.won?"Seu time venceu! 🎉":"Fim de jogo"}</h3>`:i?`<h3 style="font-size:22px">Corrida ${i.race}/${i.total} 🏁</h3>`:`<h3>${l?"Você venceu! 🎉":c?c.place+"º lugar":"Fim!"}</h3>`,d=i?`<div class="champ-stand"><div class="cs-title">🏆 Classificação do campeonato</div>${i.rows.map((v,m)=>`<div class="cs-row ${v.you?"you":""} ${m===0?"lead":""}"><span class="cs-pos">${m+1}º</span><span class="cs-cap" data-s="${v.skin}"></span><span class="cs-nm">${v.name}</span><b class="cs-pts">${v.pts}</b></div>`).join("")}</div>`:"",u=s?`<div class="team-cols">${s.teams.map(v=>`<div class="team-col ${v.win?"win":""} ${v.you?"mine":""}"><div class="team-h">${v.win?"🏆 ":""}${v.label}</div><div class="team-score">${v.score} <small>pts</small></div>${v.members.slice().sort((m,p)=>m.place-p.place).map(m=>`<div class="team-mem"><span class="tm-cap" data-s="${m.skin}"></span><span class="tm-nm">${m.name}</span><b>${m.place}º</b></div>`).join("")}</div>`).join("")}</div>`:"",f=t==="online"?this.online.isHost?'<button class="chip" id="mn">Sair da sala</button><button class="play-btn" id="lob">🔁 Nova partida</button>':'<button class="chip" id="mn">Sair da sala</button><div class="ol-wait2">⏳ Aguardando o anfitrião…</div>':i?`<button class="chip" id="mn">Sair</button><button class="play-btn" id="nx">${i.last?"🏆 Ver campeão":"Próxima ▶"}</button>`:'<button class="chip" id="mn">Menu</button><button class="chip" id="re">↻ Revanche</button><button class="play-btn" id="nx">Nova pista ▶</button>';r.innerHTML=`${h}${s?u:i?d:'<div class="podium" id="pod"></div>'}<div class="mactions">${f}</div>`,i&&r.querySelectorAll(".cs-cap").forEach(v=>{v.appendChild(wt(mt(v.dataset.s).art,44))}),s&&r.querySelectorAll(".tm-cap").forEach(v=>{v.appendChild(wt(mt(v.dataset.s).art,36))});const g=r.querySelector("#pod");g&&o.slice(0,Math.min(4,o.length)).forEach((v,m)=>{const p=this.el(`<div class="prow2 ${m===0?"p1":""}"><span class="pl">${["🥇","🥈","🥉","4º"][m]}</span><span class="pcap"></span><span class="pn">${v.name}</span></div>`);p.querySelector(".pcap").appendChild(wt(mt(v.skin).art,64)),p.addEventListener("click",()=>this.showCapStats(v.name,v.skin)),g.appendChild(p)}),a.classList.remove("hidden"),(l||t==="daily"&&e.caps[0].place===1)&&this.confetti(r),r.querySelector("#mn").addEventListener("click",()=>{t==="online"&&this.online.leave(),this.onMenu?.()}),r.querySelector("#re")?.addEventListener("click",()=>this.onRestart?.()),r.querySelector("#nx")?.addEventListener("click",()=>this.onNext?.()),r.querySelector("#lob")?.addEventListener("click",()=>{this.hideModal(),this.online.backToLobby()})}showOnlineChampStanding(e,t,i,s,a){const{modal:r,box:o}=this.modalBox();o.className="modal win";const c=a?`<button class="chip" id="mn">Sair da sala</button><button class="play-btn" id="nx">${s?"🏆 Ver campeão":"Próxima corrida ▶"}</button>`:'<button class="chip" id="mn">Sair da sala</button><div class="ol-wait2">⏳ Aguardando o anfitrião…</div>';o.innerHTML=`<h3 style="font-size:22px">🏆 Campeonato · Corrida ${t}/${i}</h3>
      <div class="champ-stand"><div class="cs-title">Classificação geral</div>${e.map((l,h)=>`<div class="cs-row ${l.you?"you":""} ${h===0?"lead":""}"><span class="cs-pos">${h+1}º</span><span class="cs-cap" data-s="${l.skin}"></span><span class="cs-nm">${l.name}</span><b class="cs-pts">${l.pts}</b></div>`).join("")}</div>
      <div class="mactions">${c}</div>`,o.querySelectorAll(".cs-cap").forEach(l=>l.appendChild(wt(mt(l.dataset.s).art,44))),r.classList.remove("hidden"),o.querySelector("#mn").addEventListener("click",()=>{this.online.leave(),this.onMenu?.()}),o.querySelector("#nx")?.addEventListener("click",()=>{this.hideModal(),this.online.hostNextChamp()})}modalBox(){return{modal:this.hud.querySelector("#modal"),box:this.hud.querySelector("#mbox")}}showTrialResult(e){const{modal:t,box:i}=this.modalBox();i.className="modal win",i.innerHTML=`<h3>${e.finished?e.record?"NOVO RECORDE! 🏆":"Chegou! ⏱️":"Fim"}</h3>
      <div class="trial-big"><span class="tb-num">${e.flicks}</span><span class="tb-lab">petelecos</span></div>
      <div class="trial-best">🏅 Recorde nesta pista: <b>${e.best??e.flicks}</b></div>
      <div class="mactions"><button class="chip" id="mn">Menu</button><button class="chip" id="re">↻ De novo</button><button class="play-btn" id="nx">Nova pista ▶</button></div>`,t.classList.remove("hidden"),e.record&&this.confetti(i),i.querySelector("#mn").addEventListener("click",()=>this.onMenu?.()),i.querySelector("#re").addEventListener("click",()=>this.onRestart?.()),i.querySelector("#nx").addEventListener("click",()=>this.onNext?.())}showTeamResult(e){const{modal:t,box:i}=this.modalBox();i.className="modal win";const s=e.teams.map(a=>`<div class="team-col ${a.win?"win":""} ${a.you?"mine":""}">
      <div class="team-h">${a.win?"🏆 ":""}${a.label}</div>
      <div class="team-score">${a.score} <small>pts</small></div>
      ${a.members.sort((r,o)=>r.place-o.place).map(r=>`<div class="team-mem"><span class="tm-cap" data-s="${r.skin}"></span><span class="tm-nm">${r.name}</span><b>${r.place}º</b></div>`).join("")}
    </div>`).join("");i.innerHTML=`<h3>${e.won?"Seu time venceu! 🎉":"Fim de jogo"}</h3>
      <div class="team-cols">${s}</div>
      <div class="team-note">Vence o time com a <b>menor soma</b> de colocações.</div>
      <div class="mactions"><button class="chip" id="mn">Menu</button><button class="chip" id="re">↻ Revanche</button><button class="play-btn" id="nx">Nova pista ▶</button></div>`,i.querySelectorAll(".tm-cap").forEach(a=>a.appendChild(wt(mt(a.dataset.s).art,36))),t.classList.remove("hidden"),e.won&&this.confetti(i),i.querySelector("#mn").addEventListener("click",()=>this.onMenu?.()),i.querySelector("#re").addEventListener("click",()=>this.onRestart?.()),i.querySelector("#nx").addEventListener("click",()=>this.onNext?.())}showElimResult(e){const{modal:t,box:i}=this.modalBox();i.className="modal win",i.innerHTML=`<h3>${e.last?"Última eliminação!":"💀 Eliminado!"}</h3>
      <div class="elim-loser"><span class="el-cap" id="elc"></span><div><b>${e.loser.name}</b><span> foi eliminado${e.youOut?" — era VOCÊ 😵":""}</span></div></div>
      <div class="elim-alive"><div class="ea-t">Ainda na disputa (${e.survivors.length})</div>
        ${e.survivors.map((s,a)=>`<div class="ea-row ${s.you?"you":""}"><span class="ea-cap" data-s="${s.skin}"></span><span class="ea-nm">${s.name}</span>${a===0?'<span class="ea-lead">🥇 líder</span>':""}</div>`).join("")}</div>
      <div class="mactions"><button class="chip" id="mn">Sair</button><button class="play-btn" id="nx">${e.last?"🏆 Ver campeão":"Próxima corrida ▶"}</button></div>`,i.querySelector("#elc").appendChild(wt(mt(e.loser.skin).art,52)),i.querySelectorAll(".ea-cap").forEach(s=>s.appendChild(wt(mt(s.dataset.s).art,36))),t.classList.remove("hidden"),i.querySelector("#mn").addEventListener("click",()=>this.onMenu?.()),i.querySelector("#nx").addEventListener("click",()=>this.onNext?.())}showChampion(e){const t=this.hud.querySelector("#modal"),i=this.hud.querySelector("#mbox");i.className="modal win champ-final";const s=e.fmt==="elim"?"Eliminação":qi[e.fmt]?.name||"Campeonato";i.innerHTML=`
      <div class="cf-crown">👑</div>
      <h3 style="color:#c98a00">${e.youWon?"VOCÊ é o campeão! 🎉":"Campeão do "+s}</h3>
      <div class="cf-face" id="cff"></div>
      <div class="cf-name">${e.name} 🏆</div>
      <div class="champ-stand final">${e.rows.map((r,o)=>`<div class="cs-row ${r.you?"you":""} ${o===0?"lead":""}"><span class="cs-pos">${["🥇","🥈","🥉"][o]||o+1+"º"}</span><span class="cs-cap" data-s="${r.skin}"></span><span class="cs-nm">${r.name}</span><b class="cs-pts">${r.pts} pts</b></div>`).join("")}</div>
      <div class="mactions"><button class="play-btn" id="mn">Menu ▶</button></div>`;const a=wt(mt(e.skin).art,150);a.style.width="110px",a.style.height="110px",a.style.display="block",a.style.margin="0 auto",i.querySelector("#cff").appendChild(a),i.querySelectorAll(".cs-cap").forEach(r=>r.appendChild(wt(mt(r.dataset.s).art,40))),t.classList.remove("hidden"),this.confetti(i),i.querySelector("#mn").addEventListener("click",()=>this.onMenu?.())}};Ln.ED_TOOLS=[{t:"draw",ico:"✏️",lab:"Traçar",grp:"p",col:"#8fd0ff"},{t:"move",ico:"✋",lab:"Mover",grp:"p",col:"#ffd94a"},{t:"erase",ico:"🧽",lab:"Apagar",grp:"p",col:"#ff8a8a"},{t:"hole",ico:"⚫",lab:"Buraco",grp:"o",col:"#100a04"},{t:"bomb",ico:"💣",lab:"Bomba",grp:"o",col:"#e5484d"},{t:"stone",ico:"🪨",lab:"Pedra",grp:"o",col:"#9a948a"},{t:"jump",ico:"🛫",lab:"Salto",grp:"o",col:"#c9902e"},{t:"item",ico:"❓",lab:"Caixa",grp:"o",col:"#a86bff"},{t:"bonus1",ico:"💎",lab:"+1",grp:"b",col:"#2ea44f"},{t:"bonus2",ico:"💠",lab:"+2",grp:"b",col:"#2e9fa4"},{t:"bonus3",ico:"🏆",lab:"+3",grp:"b",col:"#e0a020"},{t:"ramp",ico:"⏫",lab:"Impulso",grp:"s",col:"#3fae6a"},{t:"push",ico:"⏬",lab:"Freio",grp:"s",col:"#e5484d"},{t:"sand",ico:"🟡",lab:"Areia",grp:"s",col:"#d9b877"},{t:"mud",ico:"🟤",lab:"Lama",grp:"s",col:"#5c452a"},{t:"water",ico:"💧",lab:"Água",grp:"s",col:"#4a90b8"},{t:"grass",ico:"🌿",lab:"Grama",grp:"s",col:"#5f8a36"}],Ln.ED_SURF=new Set(["sand","mud","water","grass","ramp","push"]);let ho=Ln;function uo(n,e){const t=mt(n).rarity,i=an.filter(a=>a.rarity===t&&a.id!==n).map(a=>a.id);for(let a=i.length-1;a>0;a--){const r=Math.floor(Math.random()*(a+1));[i[a],i[r]]=[i[r],i[a]]}const s=[];for(let a=0;a<Math.max(0,e);a++)s.push(i.length?i[a%i.length]:n);return s}function Hg(n){return Math.max(1,Math.min(99,Math.round((n-.8)/.45*99)))}function Gg(n){return n>=74?"hi":n>=50?"mid":"lo"}function Vg(n,e){const t=Hg(e),i=Math.max(8,Math.min(100,Math.round((e-.8)/.4*100)));return`<div class="sbar ${Gg(t)}"><span class="sbl">${n}</span><span class="strack"><i style="width:${i}%"></i></span><b class="sval">${t}</b></div>`}const ac=[["Desliza","slide"],["Peso","weight"],["Controle","control"],["Quique","bounce"],["Estabil.","stability"],["Potência","power"],["Aderência","grip"]];function br(n,e=!1){return`<div class="skin-bars">${(e?ac:ac.slice(0,4)).map(([i,s])=>Vg(i,n[s])).join("")}</div>`}function Wg(){const n=new Date;return`${n.getFullYear()}-${n.getMonth()+1}-${n.getDate()}`}const qg="modulepreload",$g=function(n,e){return new URL(n,e).href},rc={},Xg=function(e,t,i){let s=Promise.resolve();if(t&&t.length>0){const r=document.getElementsByTagName("link"),o=document.querySelector("meta[property=csp-nonce]"),c=o?.nonce||o?.getAttribute("nonce");s=Promise.allSettled(t.map(l=>{if(l=$g(l,i),l in rc)return;rc[l]=!0;const h=l.endsWith(".css"),d=h?'[rel="stylesheet"]':"";if(!!i)for(let g=r.length-1;g>=0;g--){const v=r[g];if(v.href===l&&(!h||v.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${l}"]${d}`))return;const f=document.createElement("link");if(f.rel=h?"stylesheet":qg,h||(f.as="script"),f.crossOrigin="",f.href=l,c&&f.setAttribute("nonce",c),document.head.appendChild(f),h)return new Promise((g,v)=>{f.addEventListener("load",g),f.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${l}`)))})}))}function a(r){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=r,window.dispatchEvent(o),!o.defaultPrevented)throw r}return s.then(r=>{for(const o of r||[])o.status==="rejected"&&a(o.reason);return e().catch(a)})};async function oc(){const n=await Xg(()=>import("./bundler-DMWXtVuP.js"),[],import.meta.url);return n.Peer||n.default||n}const Yg=[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun1.l.google.com:19302"},{urls:"turn:openrelay.metered.ca:80",username:"openrelayproject",credential:"openrelayproject"},{urls:"turn:openrelay.metered.ca:443",username:"openrelayproject",credential:"openrelayproject"},{urls:"turn:openrelay.metered.ca:443?transport=tcp",username:"openrelayproject",credential:"openrelayproject"}],lc={debug:0,config:{iceServers:Yg}},cc=new Set(["unavailable-id","network","server-error","socket-error","socket-closed","disconnected"]),hc="tmprally-",dc="ABCDEFGHJKMNPQRSTUVWXYZ23456789";function jg(n=5){let e="";for(let t=0;t<n;t++)e+=dc[Math.floor(Math.random()*dc.length)];return e}class uc{constructor(){this.peer=null,this.isHost=!1,this.code="",this.conns=new Map,this.onData=()=>{},this.onOpen=()=>{},this.onJoin=()=>{},this.onLeave=()=>{},this.onError=()=>{}}host(){this.isHost=!0;const e=async t=>{const i=await oc(),s=t>0&&this.code?this.code:jg(),a=new i(hc+s,lc);this.peer=a,this.code=s;let r=!1;a.on("open",()=>{r=!0,this.onOpen(s)}),a.on("connection",o=>this.accept(o)),a.on("error",o=>{const c=o&&o.type||String(o);if(c==="unavailable-id"&&(this.code=""),cc.has(c)&&t<8){try{a.destroy()}catch{}setTimeout(()=>e(t+1),700+t*400)}else c!=="peer-unavailable"&&this.onError(c)}),setTimeout(()=>{if(!r&&t<8){try{a.destroy()}catch{}e(t+1)}},14e3)};e(0).catch(()=>this.onError("load"))}accept(e){e.on("open",()=>{this.conns.set(e.peer,e),this.onJoin(e.peer)}),e.on("data",t=>this.onData(e.peer,t)),e.on("close",()=>{this.conns.delete(e.peer)&&this.onLeave(e.peer)}),e.on("error",()=>{this.conns.delete(e.peer)&&this.onLeave(e.peer)})}join(e){this.isHost=!1,this.code=e.toUpperCase();let t=!1;const i=s=>{const a=(r=700)=>{!t&&s<7?setTimeout(()=>i(s+1),r+s*300):t||this.onError("peer-unavailable")};oc().then(r=>{const o=new r(lc);this.peer=o;let c=!1;o.on("open",()=>{c=!0;const l=o.connect(hc+this.code,{reliable:!0});l.on("open",()=>{t=!0,this.conns.set("host",l),this.onOpen(this.code)}),l.on("data",h=>this.onData("host",h)),l.on("close",()=>this.onLeave("host")),l.on("error",()=>{try{o.destroy()}catch{}a()}),setTimeout(()=>{if(!t){try{o.destroy()}catch{}a()}},16e3)}),o.on("error",l=>{const h=l&&l.type||String(l);try{o.destroy()}catch{}h==="peer-unavailable"?t||a(1200):cc.has(h)?a():t||this.onError(h)}),setTimeout(()=>{if(!c&&!t){try{o.destroy()}catch{}a()}},12e3)}).catch(()=>this.onError("load"))};i(0)}send(e,t){const i=this.conns.get(e);if(i&&i.open)try{i.send(t)}catch{}}broadcast(e){for(const t of this.conns.values())if(t.open)try{t.send(e)}catch{}}relay(e,t){for(const[i,s]of this.conns)if(i!==e&&s.open)try{s.send(t)}catch{}}count(){return this.conns.size}destroy(){try{this.peer?.destroy()}catch{}this.conns.clear(),this.peer=null}}const fc=["Bolha","Zé","Nina","Tato","Duda","Chico"];class Kg{constructor(){this.net=new uc,this.active=!1,this.inRoom=!1,this.isHost=!1,this.code="",this.myId="host",this.myName="Você",this.mySkin="coca",this.humans=[],this.seats=[],this.total=4,this.cfg={level:0,trackIdx:0,pick:"specific",roomMode:"normal",teamSize:2,champRaces:3},this.mgr=null,this.champ=null,this.onRoster=()=>{},this.onError=()=>{},this.onCode=()=>{},this.onStartMatch=()=>{},this.onToLobby=()=>{},this.onClosed=()=>{},this.onChampStanding=()=>{},this.onChampEnd=()=>{},this.lastTok="",this.decided=!1,this.aiWait=0,this.applied=new Set,this.pendingFlick=null,this.pendingSync=null}reset(){this.net.destroy(),this.net=new uc,this.active=!1,this.inRoom=!1,this.isHost=!1,this.code="",this.myId="host",this.humans=[],this.seats=[],this.total=4,this.mgr=null,this.cfg={level:0,trackIdx:0,pick:"specific",roomMode:"normal",teamSize:2,champRaces:3},this.champ=null,this.lastTok="",this.decided=!1,this.aiWait=0,this.applied.clear(),this.pendingFlick=null,this.pendingSync=null}createRoom(e,t){this.reset(),this.isHost=!0,this.myId="host",this.myName=e,this.mySkin=t,this.humans=[{owner:"host",name:e,skin:t}],this.total=4,this.inRoom=!0,this.net.onOpen=i=>{this.code=i,this.onCode(i),this.rebuild()},this.net.onData=(i,s)=>this.hostData(i,s),this.net.onLeave=i=>this.hostLeave(i),this.net.onError=i=>this.onError(this.friendly(i)),this.net.host()}joinRoom(e,t,i){this.reset(),this.isHost=!1,this.myName=t,this.mySkin=i,this.net.onOpen=()=>{this.myId=this.net.peer.id,this.inRoom=!0,this.code=e.toUpperCase(),this.net.send("host",{t:"hello",name:t,skin:i}),this.onCode(this.code)},this.net.onData=(s,a)=>this.clientData(a),this.net.onLeave=()=>{this.inRoom&&(this.onError("Conexão com o anfitrião caiu"),this.onClosed())},this.net.onError=s=>this.onError(this.friendly(s)),this.net.join(e)}friendly(e){return e==="peer-unavailable"?"Sala não encontrada — confira o código":e==="network"||e==="server-error"||e==="socket-error"?"Sem conexão com o servidor de salas":e==="browser-incompatible"?"Navegador sem suporte a P2P":"Falha de conexão ("+e+")"}leave(){try{this.net.broadcast({t:"bye"})}catch{}this.reset()}rebuild(){if(!this.isHost)return;this.humans.length>6&&(this.humans=this.humans.slice(0,6)),this.cfg.roomMode==="dupla"&&(this.total=this.cfg.teamSize*2),this.total<this.humans.length&&(this.total=this.humans.length),this.total>6&&(this.total=6),this.total<2&&(this.total=2);const e=this.humans.map(r=>({name:r.name,skin:r.skin,kind:"human",owner:r.owner,off:r.off})),t=this.humans.map(r=>r.skin),i=(this.humans.find(r=>r.owner==="host")||this.humans[0])?.skin||"coca",s=an.filter(r=>r.rarity===mt(i).rarity&&!t.includes(r.id)).map(r=>r.id);for(let r=s.length-1;r>0;r--){const o=Math.floor(Math.random()*(r+1));[s[r],s[o]]=[s[o],s[r]]}let a=0;for(;e.length<this.total;){const r=a++,o=s.length?s[r%s.length]:an[Math.floor(Math.random()*an.length)].id;e.push({name:fc[r%fc.length],skin:o,kind:"ai",ai:Ct[r%Ct.length],owner:"host"})}this.cfg.roomMode==="dupla"?e.forEach((r,o)=>r.team=this.seatTeam(o)):e.forEach(r=>r.team=void 0),this.seats=e,this.broadcastRoster(),this.onRoster()}broadcastRoster(){this.net.broadcast({t:"roster",seats:this.seats,total:this.total,cfg:this.cfg})}setTotal(e){!this.isHost||this.cfg.roomMode==="dupla"||(this.total=Math.max(this.humans.length,Math.min(6,e)),this.rebuild())}setCfg(e,t,i){this.isHost&&(this.cfg.level=e,this.cfg.trackIdx=t,this.cfg.pick=i,this.rebuild())}setRoom(e,t=this.cfg.teamSize,i=this.cfg.champRaces){this.isHost&&(this.cfg.roomMode=e,this.cfg.teamSize=t,this.cfg.champRaces=i,e==="dupla"&&(this.total=t*2),this.rebuild())}seatTeam(e){return e%2}setMyCap(e){if(this.mySkin=e,this.isHost){const t=this.humans.find(i=>i.owner==="host");t&&(t.skin=e),this.rebuild()}else this.net.send("host",{t:"setcap",skin:e})}setMyName(e){const t=(e||"Você").slice(0,12);if(this.myName=t,this.isHost){const i=this.humans.find(s=>s.owner==="host");i&&(i.name=t),this.rebuild()}else this.net.send("host",{t:"setname",name:t})}hostData(e,t){if(this.isHost)if(t.t==="hello"){if(this.active||this.humans.some(i=>i.owner===e))return;if(this.humans.length>=6){this.net.send(e,{t:"full"});return}this.humans.push({owner:e,name:(t.name||"Jogador").slice(0,12),skin:t.skin||"coca"}),this.total<this.humans.length&&(this.total=this.humans.length),this.rebuild()}else if(t.t==="setcap"){const i=this.humans.find(s=>s.owner===e);i&&(i.skin=t.skin,this.rebuild())}else if(t.t==="setname"){const i=this.humans.find(s=>s.owner===e);i&&(i.name=(t.name||"Jogador").slice(0,12),this.rebuild())}else t.t==="flick"?(this.net.relay(e,t),this.pendingFlick=t):t.t==="bye"&&this.hostLeave(e)}hostLeave(e){if(this.isHost)if(this.active){for(const i of this.seats)i.owner===e&&(i.off=!0,i.ai||(i.ai=Ct[Math.floor(Math.random()*Ct.length)]));const t=this.humans.find(i=>i.owner===e);t&&(t.off=!0)}else this.humans=this.humans.filter(t=>t.owner!==e),this.rebuild()}clientData(e){if(e.t==="roster")this.seats=e.seats,this.total=e.total,this.cfg=e.cfg,this.onRoster();else if(e.t==="start")this.beginMatch(e.level,e.trackIdx,e.seats);else if(e.t==="flick")this.pendingFlick=e;else if(e.t==="sync")this.pendingSync=e.s;else if(e.t==="champres"){const t=this.mySeatIndex(),i=new Map(e.pts),s=this.seats.map((a,r)=>({seat:r,name:a.name,skin:a.skin,pts:i.get(r)||0,you:r===t})).sort((a,r)=>r.pts-a.pts);this.onChampStanding(s,e.race,e.total,e.last)}else if(e.t==="champend"){const t=this.seats[e.seat];this.active=!1,this.onChampEnd({name:t?.name||"",skin:t?.skin||"coca",you:e.seat===this.mySeatIndex()})}else e.t==="tolobby"?(this.active=!1,this.onToLobby()):e.t==="full"?(this.onError("A sala está cheia"),this.onClosed()):e.t==="bye"&&(this.onError("O anfitrião encerrou a sala"),this.onClosed())}startMatch(){if(!this.isHost)return;this.rebuild();let e=this.cfg.level,t=this.cfg.trackIdx;if(this.cfg.pick==="randlevel"?t=Math.floor(Math.random()*10):this.cfg.pick==="randany"&&(e=Math.floor(Math.random()*5),t=Math.floor(Math.random()*10)),this.cfg.roomMode==="champ"){const s=Math.max(2,Math.min(9,this.cfg.champRaces)),a=[0,1,2,3,4,5,6,7,8,9];for(let o=a.length-1;o>0;o--){const c=Math.floor(Math.random()*(o+1));[a[o],a[c]]=[a[c],a[o]]}const r=a.slice(0,s).map(o=>({level:e,idx:o}));this.champ={race:0,total:s,pts:new Map,seq:r},e=r[0].level,t=r[0].idx}else this.champ=null;const i=this.seats.map(s=>({...s}));this.net.broadcast({t:"start",level:e,trackIdx:t,seats:i}),this.beginMatch(e,t,i)}beginMatch(e,t,i){this.seats=i,this.active=!0,this.lastTok="",this.decided=!1,this.aiWait=0,this.applied.clear(),this.pendingFlick=null,this.pendingSync=null;const s=i.map(a=>({name:a.name,isAI:a.kind==="ai",ai:a.ai,skin:a.skin,team:a.team}));this.onStartMatch(s,e,t)}isChamp(){return!!this.champ}champRows(){const e=this.mySeatIndex();return this.seats.map((t,i)=>({seat:i,name:t.name,skin:t.skin,pts:this.champ.pts.get(i)||0,you:i===e})).sort((t,i)=>i.pts-t.pts)}hostFinishRace(e){if(!this.isHost||!this.champ)return;const t=[12,9,7,5,3,1];e.standings().forEach((a,r)=>this.champ.pts.set(a.id,(this.champ.pts.get(a.id)||0)+(t[r]||0)));const i=this.champ.race+1>=this.champ.total,s=this.champRows();this.net.broadcast({t:"champres",pts:[...this.champ.pts.entries()],race:this.champ.race+1,total:this.champ.total,last:i}),this.onChampStanding(s,this.champ.race+1,this.champ.total,i)}hostNextChamp(){if(!this.isHost||!this.champ)return;if(this.champ.race++,this.champ.race>=this.champ.total){const s=this.champRows()[0];this.net.broadcast({t:"champend",seat:s.seat}),this.onChampEnd({name:s.name,skin:s.skin,you:s.you}),this.champ=null,this.active=!1;return}const{level:e,idx:t}=this.champ.seq[this.champ.race],i=this.seats.map(s=>({...s}));this.net.broadcast({t:"start",level:e,trackIdx:t,seats:i}),this.beginMatch(e,t,i)}bind(e){this.mgr=e}backToLobby(){this.isHost&&(this.active=!1,this.net.broadcast({t:"tolobby"}),this.humans=this.humans.filter(e=>!e.off),this.rebuild(),this.onToLobby())}mySeatIndex(){return this.seats.findIndex(e=>e.kind==="human"&&e.owner===this.myId)}controlsActiveSeat(){const e=this.mgr;if(!e)return!1;const t=this.seats[e.current];return!!t&&t.kind==="human"&&!t.off&&t.owner===this.myId}tok(e){return String(e.flickCount)}emitFlick(e,t,i,s){this.applied.add(s),this.decided=!0;const a={t:"flick",tok:s,dir:t,power:i};this.isHost?this.net.broadcast(a):this.net.send("host",a),e.flick(t,i)}localFlick(e,t){const i=this.mgr;!i||i.phase!=="aim"||!this.controlsActiveSeat()||this.emitFlick(i,e,t,this.tok(i))}localUseItem(){}tick(e){const t=this.mgr;if(!t||!this.active||t.phase!=="aim")return;this.pendingSync&&(t.applySnapshot(this.pendingSync),this.pendingSync=null);const i=this.tok(t);if(i!==this.lastTok&&(this.lastTok=i,this.decided=!1,this.aiWait=0,this.isHost&&this.net.broadcast({t:"sync",s:t.snapshot()})),this.pendingFlick&&this.pendingFlick.tok===i&&!this.applied.has(i)){const r=this.pendingFlick;this.pendingFlick=null,this.applied.add(i),this.decided=!0,t.flick(r.dir,r.power);return}if(this.decided)return;const s=this.seats[t.current];if(this.isHost&&s&&(s.kind==="ai"||s.off)&&(this.aiWait+=e,this.aiWait>.7)){const r=t.caps[t.current],o=sh(r,t.caps,t.track);this.emitFlick(t,o.dir,o.power,i)}}aiLabel(e){return e?ih[e]:"IA"}}const ph=document.getElementById("scene"),fo=X0(ph);let It,vt=new Io(34,54),bt=null;const po=new pg,Ot=new gg,Ts=new vg,we=new Rg,at=new Kg;let mn="quick",st=null,ht=null,nn=null,ws=0,On=!1,oi=!1,Rs=null,pc=!1;function Ei(n){st=n,mn=n.mode,ws=0;let e=n.customTrack?n.customTrack:rh(n.level,n.trackIdx);n.mode==="caos"&&(e=Ng(e)),It=Kc(e.bg),Zc(It,e.w,e.h),bt=Uo(e),It.add(bt.group),It.add(po.group,Ot.points,Ts.group),vt=new Io(e.w,e.h),vt.setFrustum(21,innerWidth,innerHeight),Oo(),we.setup(e,n.players),we.chaos=n.mode==="caos",we.manualControl=n.mode==="online",at.bind(we),po.build(we.caps),mh.setCamera(vt.camera,vt),$e.showGame(),On=!0,pc||(Bg(),pc=!0),$e.updateHUD(we,ko())}function ko(){return we.phase==="aim"&&(at.active?at.controlsActiveSeat():!we.activeCap().isAI)}we.onToast=(n,e)=>$e.toast(n,e);we.onChange=()=>$e.updateHUD(we,ko());we.onFlick=(n,e)=>{Lt.flick(e),Jc[we.track.surfaceAt(n.pos)],Ot.dust(n.pos.x,n.pos.y,8),Ts.hide()};we.onItem=(n,e,t)=>{Lt.bonus(),Ot.impact(n.pos.x,n.pos.y,10,t?"#ff9de0":"#b98cff")};we.onEvent=n=>{switch(n.type){case"wall":Lt.wall(n.power),Ot.impact(n.x,n.y,n.power*.4,"#ffe6b0");break;case"stone":Lt.wall(n.power),Ot.impact(n.x,n.y,n.power*.5,"#e8e0d0");break;case"capHit":Lt.clack(n.power),Ot.impact(n.x,n.y,n.power*.6,"#fff");break;case"hole":Lt.hole(),Ot.dust(n.x,n.y,14,"#3a2c1a");break;case"bomb":Lt.bad(),Ot.impact(n.x,n.y,10,"#ff8a5a");break;case"bonus":Lt.bonus(),Ot.impact(n.x,n.y,10,"#8affc0");break;case"out":Lt.bad(),Ot.dust(n.x,n.y,10,"#cbb58a");break;case"ramp":Lt.bonus(),Ot.impact(n.x,n.y,8,"#9dffb8");break;case"land":Lt.wall(4),Ot.dust(n.x,n.y,14,"#d8c090");break;case"finish":Ot.confetti(n.x,n.y);break}};const $e=new ho({start:n=>{if(at.active&&at.leave(),ch(),n.mode==="champ"){const e=n.champFmt||"copa",t=s=>{for(let a=s.length-1;a>0;a--){const r=Math.floor(Math.random()*(a+1));[s[a],s[r]]=[s[r],s[a]]}return s};let i;if(e==="gp")i=[0,1,2,3,4].map(s=>({level:s,idx:Math.floor(Math.random()*Bt)}));else{const s=e==="sprint"?3:e==="maratona"?7:5;i=t([0,1,2,3,4,5,6,7,8,9]).slice(0,s).map(a=>({level:n.level,idx:a}))}ht={seq:i,race:0,pts:new Map,fmt:e},n.level=i[0].level,n.trackIdx=i[0].idx}else ht=null;n.mode==="elim"?(nn={players:n.players.slice(),level:n.level,race:0,out:[]},n.trackIdx=Math.floor(Math.random()*Bt)):nn=null,Ei(n)},setVols:(n,e,t)=>{dh(n),uh(e),fh(t),Be.setVols(n,e,t)},setSkin:n=>{Be.setSkin(n),Lt.ui()},preview:n=>Zg(n)},at);at.onStartMatch=(n,e,t)=>{st=null,ht=null,Ai=!1,Ei({level:e,trackIdx:t,pick:"specific",players:n,mode:"online"})};at.onToLobby=()=>{On=!1,Bn=!1,Ai=!1,Us(),$e.showLobby()};at.onClosed=()=>{const n=On;On=!1,Bn=!1,Ai=!1,n&&Us(),$e.showOnlineHome()};at.onChampStanding=(n,e,t,i)=>$e.showOnlineChampStanding(n,e,t,i,at.isHost);at.onChampEnd=n=>{Ai=!0,n.you&&Be.addWin(),Lt.win(),$e.showChampion({rows:[],fmt:"champ",youWon:n.you,name:n.name,skin:n.skin})};$e.onUseItem=()=>{at.active?at.localUseItem():we.useItem()};$e.onPause=()=>{we.phase!=="over"&&(Bn=!0,$e.showPause())};$e.onResume=()=>{Bn=!1,$e.hideModal()};$e.onRestart=()=>{Bn=!1,$e.hideModal(),st&&Ei(st)};$e.onMenu=()=>{On=!1,Bn=!1,Us(),$e.showMenu()};$e.onNext=()=>{if($e.hideModal(),ht){if(ht.race++,ht.race>=ht.seq.length){tv();return}st.level=ht.seq[ht.race].level,st.trackIdx=ht.seq[ht.race].idx,Ei(st);return}if(nn&&st){const n=we.standings(),e=n[n.length-1];if(nn.players=nn.players.filter(t=>!(t.name===e.name&&t.skin===e.skin)),nn.players.length<=1){const t=nn.players[0],i=t&&!t.isAI;i&&Be.addWin(),$e.showChampion({rows:[],fmt:"elim",youWon:!!i,name:t?t.name:"",skin:t?t.skin:"coca"}),nn=null;return}nn.race++,st.players=nn.players,st.trackIdx=Math.floor(Math.random()*Bt),Ei(st);return}st&&(st.pick==="randany"?(st.level=Math.floor(Math.random()*5),st.trackIdx=Math.floor(Math.random()*Bt)):st.pick==="randlevel"?st.trackIdx=Math.floor(Math.random()*Bt):st.trackIdx=(st.trackIdx+1)%Bt,Ei(st))};dh(Be.get().music);uh(Be.get().sfx);fh(Be.get().muted);Dt.music=Be.get().music;Dt.sfx=Be.get().sfx;Dt.muted=Be.get().muted;let Bn=!1;const mh=new kg(ph,vt.camera,vt,{canAim:()=>On&&!Bn&&ko(),capPos:()=>{const n=we.activeCap();return n?{x:n.pos.x,y:n.pos.y}:null},onAim:(n,e,t)=>{const i=we.activeCap();Ts.set(i.pos.x,i.pos.y,n,e,t)},onRelease:(n,e,t)=>{Ts.hide(),(mn==="daily"||mn==="trial")&&ws++,at.active?at.localFlick({x:n,y:e},t):we.flick({x:n,y:e},t)},onCancel:()=>Ts.hide(),editMode:()=>oi?$e.previewEditMode():"off",onEditDown:(n,e)=>{$e.preview3D("down",n,e)&&mo()},onEditMove:(n,e)=>{$e.preview3D("move",n,e)&&Jg()},onEditUp:()=>{$e.preview3D("up",0,0)&&mo()}});function Us(){It&&It.clear(),bt=null,oi=!1}function Zg(n){On=!1,Bn=!1,Rs=n,It=Kc(n.bg),Zc(It,n.w,n.h),bt=Uo(n),It.add(bt.group),vt=new Io(n.w,n.h),vt.frustum=Math.min(60,Math.max(n.w,n.h)*.42),vt.resize(innerWidth,innerHeight),vt.place(),mh.setCamera(vt.camera,vt),oi=!0,$e.showPreviewBar()}let mc=0;function mo(){!oi||!It||(Rs=$e.rebuildPreviewDef(),bt&&(It.remove(bt.group),bt.group.traverse(n=>{n.geometry?.dispose?.(),n.material&&(Array.isArray(n.material)?n.material:[n.material]).forEach(e=>e.dispose?.())})),bt=Uo(Rs),It.add(bt.group))}function Jg(){const n=performance.now();n-mc<70||(mc=n,mo())}$e.onPreviewBack=()=>{oi=!1,Us(),$e.showEditor()};$e.onPreviewPlay=()=>{oi=!1,Us(),Rs&&Ei({level:2,trackIdx:0,pick:"specific",players:Qg(),mode:"quick",customTrack:Rs})};function Qg(){const n=uo(Be.skin(),3),e=["Bolha","Zé","Nina","Tato"];return[{name:"Você",isAI:!1,skin:Be.skin()},...n.map((t,i)=>({name:e[i%e.length],isAI:!0,ai:Ct[i%Ct.length],skin:t}))]}let Ai=!1;function ev(){if(Ai)return;if(Ai=!0,Lt.win(),mn==="trial"){const t=we.caps[0].finished,i=t&&st?Be.setTrialBest(st.level,st.trackIdx,ws):!1;$e.showTrialResult({finished:t,flicks:ws,best:st?Be.trialBest(st.level,st.trackIdx):void 0,record:i});return}if(mn==="dupla"){const i=[...new Set(we.caps.map(a=>a.team))].sort().map(a=>{const r=we.caps.filter(c=>c.team===a).map(c=>({name:c.name,skin:c.skin,place:c.place,you:!c.isAI})),o=r.reduce((c,l)=>c+l.place,0);return{tid:a,score:o,members:r,hasYou:r.some(c=>c.you)}}).sort((a,r)=>a.score-r.score),s=i[0].hasYou;s&&Be.addWin(),$e.showTeamResult({teams:i.map((a,r)=>({label:"Time "+(a.tid===0?"A":"B"),score:a.score,members:a.members,win:r===0,you:a.hasYou})),won:s});return}if(mn==="elim"&&nn){const t=we.standings(),i=t[t.length-1];nn.out.push({name:i.name,skin:i.skin});const s=t.slice(0,-1).map(o=>({name:o.name,skin:o.skin,you:!o.isAI})),a=!i.isAI,r=s.length<=1;$e.showElimResult({loser:{name:i.name,skin:i.skin},survivors:s,youOut:a,last:r,championName:r?s[0]?.name:""});return}if(at.active&&at.isChamp()){at.isHost&&at.hostFinishRace(we);return}if(at.active&&we.teams>0){const i=[...new Set(we.caps.map(a=>a.team))].sort().map(a=>{const r=we.caps.filter(o=>o.team===a).map(o=>({name:o.name,skin:o.skin,place:o.place,you:o.id===at.mySeatIndex()}));return{tid:a,score:r.reduce((o,c)=>o+c.place,0),members:r,hasYou:r.some(o=>o.you)}}).sort((a,r)=>a.score-r.score),s=i[0].hasYou;s&&Be.addWin(),$e.showResults(we,mn,void 0,{teams:i.map((a,r)=>({label:"Time "+(a.tid===0?"A":"B"),score:a.score,members:a.members,win:r===0,you:a.hasYou})),won:s});return}const n=at.active?we.caps[at.mySeatIndex()]:we.caps.find(t=>!t.isAI);n&&n.place===1&&mn!=="daily"&&Be.addWin(),mn==="daily"&&we.caps[0].finished&&Be.setDailyBest(iv(),ws);let e;if(ht){const t=[12,9,7,5,3,1];we.standings().forEach((s,a)=>ht.pts.set(s.id,(ht.pts.get(s.id)||0)+(t[a]||0)));const i=[...ht.pts.entries()].sort((s,a)=>a[1]-s[1]).map(([s,a])=>({name:we.caps[s].name,skin:we.caps[s].skin,pts:a,you:!we.caps[s].isAI}));e={race:ht.race+1,total:ht.seq.length,last:ht.race+1>=ht.seq.length,rows:i,fmt:ht.fmt}}$e.showResults(we,mn,e)}function tv(){const n=[...ht.pts.entries()].sort((a,r)=>r[1]-a[1]),e=n.map(([a,r])=>({name:we.caps[a].name,skin:we.caps[a].skin,pts:r,you:!we.caps[a].isAI})),t=we.caps[n[0][0]],i=!!t&&!t.isAI;i&&Be.addWin(),Lt.win();const s=ht.fmt;ht=null,$e.showChampion({rows:e,fmt:s,youWon:i,name:t?t.name:"",skin:t?t.skin:"coca"})}function Oo(){const n=innerWidth,e=innerHeight;fo.setSize(n,e),vt.resize(n,e)}addEventListener("resize",Oo);addEventListener("pointerdown",()=>ch(),{once:!0});$e.showMenu();Oo();try{const e=(location.hash||"").match(/[#&]p=([^&]+)/);e&&($e.importSharedTrack(e[1]),history.replaceState(null,"",location.pathname+location.search))}catch{}window.__mgr=we;window.__ui=$e;window.__diag={get inGame(){return On},get mode(){return mn},get previewing(){return oi},get az(){return vt.az},get frustum(){return vt.frustum}};const nv=new q0;let ys=0;function go(){const n=Math.min(.05,nv.getDelta());if(ys+=n,oi&&It){if(bt)for(const e of bt.spinners)e.rotation.y+=n*2.4;if(bt)for(const e of bt.billboards)e.quaternion.copy(vt.camera.quaternion);fo.render(It,vt.camera),requestAnimationFrame(go);return}if(On&&It){Bn||(at.active&&at.tick(n),we.update(n),we.phase==="over"?ev():Ai=!1);let e=we.activeCap();if(we.phase==="resolve"){const i=we.activeCap();if(i&&i.moving&&!i.finished)e=i;else{let s=-1,a=i;for(const r of we.caps){if(r.finished||!r.moving)continue;const o=rn(r.vel);o>s&&(s=o,a=r)}e=a}}e&&!e.finished&&vt.follow(e.pos.x,e.pos.y),vt.update(n);let t=0;for(const i of we.caps)if(i.moving){const s=rn(i.vel);if(s>t&&(t=s),s>3&&Math.random()<.5){const a=we.track.surfaceAt(i.pos);(a==="sand"||a==="dirt"||a==="mud"||a==="grass")&&Ot.dust(i.pos.x,i.pos.y,1,a==="mud"?"#5c452a":a==="grass"?"#5f8a36":"#d8c090")}}if(Lt.slide(t),bt)for(const i of bt.pulses){const s=1+Math.sin(ys*4)*.18;i.mesh.scale.set(s,s,1),i.mesh.material.opacity=.22+Math.sin(ys*4)*.12}if(bt)for(const i of bt.spinners)i.rotation.y+=n*2.4,i.position.y+=Math.sin(ys*3+i.position.x)*.004;if(bt)for(const i of bt.billboards)i.quaternion.copy(vt.camera.quaternion);po.update(we.caps,ys,we.activeCap()?.id??-1),Ot.update(n),fo.render(It,vt.camera)}requestAnimationFrame(go)}go();function iv(){const n=new Date;return`${n.getFullYear()}-${n.getMonth()+1}-${n.getDate()}`}
