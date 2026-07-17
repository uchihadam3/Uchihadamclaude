var fc=Object.defineProperty;var pc=(r,t,e)=>t in r?fc(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var jt=(r,t,e)=>pc(r,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Fa="170",mc=0,oo=1,gc=2,wl=1,_c=2,gn=3,Nn=0,Le=1,Yt=2,In=0,yi=1,lo=2,co=3,ho=4,vc=5,Zn=100,xc=101,Mc=102,Sc=103,yc=104,Ec=200,Tc=201,bc=202,wc=203,Ys=204,$s=205,Ac=206,Rc=207,Cc=208,Pc=209,Lc=210,Ic=211,Dc=212,Uc=213,Nc=214,Zs=0,Ks=1,js=2,bi=3,Js=4,Qs=5,ta=6,ea=7,qr=0,Fc=1,Oc=2,Dn=0,Bc=1,zc=2,Hc=3,kc=4,Gc=5,Vc=6,Wc=7,Al=300,wi=301,Ai=302,na=303,ia=304,Yr=306,Zi=1e3,tn=1001,ra=1002,rn=1003,Xc=1004,sr=1005,Oe=1006,Qr=1007,en=1008,Mn=1009,Rl=1010,Cl=1011,Ki=1012,Oa=1013,jn=1014,_n=1015,Ji=1016,Ba=1017,za=1018,Ri=1020,Pl=35902,Ll=1021,Il=1022,nn=1023,Dl=1024,Ul=1025,Ei=1026,Ci=1027,Nl=1028,Ha=1029,Fl=1030,ka=1031,Ga=1033,Nr=33776,Fr=33777,Or=33778,Br=33779,sa=35840,aa=35841,oa=35842,la=35843,ca=36196,ha=37492,ua=37496,da=37808,fa=37809,pa=37810,ma=37811,ga=37812,_a=37813,va=37814,xa=37815,Ma=37816,Sa=37817,ya=37818,Ea=37819,Ta=37820,ba=37821,zr=36492,wa=36494,Aa=36495,Ol=36283,Ra=36284,Ca=36285,Pa=36286,qc=3200,Yc=3201,Va=0,$c=1,Ln="",Me="srgb",Li="srgb-linear",$r="linear",Jt="srgb",ei=7680,uo=519,Zc=512,Kc=513,jc=514,Bl=515,Jc=516,Qc=517,th=518,eh=519,La=35044,fo="300 es",vn=2e3,Gr=2001;class Ii{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,t);t.target=null}}}const Te=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ts=Math.PI/180,Ia=180/Math.PI;function Un(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Te[r&255]+Te[r>>8&255]+Te[r>>16&255]+Te[r>>24&255]+"-"+Te[t&255]+Te[t>>8&255]+"-"+Te[t>>16&15|64]+Te[t>>24&255]+"-"+Te[e&63|128]+Te[e>>8&255]+"-"+Te[e>>16&255]+Te[e>>24&255]+Te[n&255]+Te[n>>8&255]+Te[n>>16&255]+Te[n>>24&255]).toLowerCase()}function Fe(r,t,e){return Math.max(t,Math.min(e,r))}function nh(r,t){return(r%t+t)%t}function es(r,t,e){return(1-e)*r+e*t}function ln(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Qt(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}class Rt{constructor(t=0,e=0){Rt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Fe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*i+t.x,this.y=s*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ut{constructor(t,e,n,i,s,o,a,l,c){Ut.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,l,c)}set(t,e,n,i,s,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=s,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],p=n[5],g=n[8],_=i[0],m=i[3],d=i[6],y=i[1],S=i[4],v=i[7],w=i[2],b=i[5],R=i[8];return s[0]=o*_+a*y+l*w,s[3]=o*m+a*S+l*b,s[6]=o*d+a*v+l*R,s[1]=c*_+h*y+u*w,s[4]=c*m+h*S+u*b,s[7]=c*d+h*v+u*R,s[2]=f*_+p*y+g*w,s[5]=f*m+p*S+g*b,s[8]=f*d+p*v+g*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*s*h+n*a*l+i*s*c-i*o*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,f=a*l-h*s,p=c*s-o*l,g=e*u+n*f+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(i*c-h*n)*_,t[2]=(a*n-i*o)*_,t[3]=f*_,t[4]=(h*e-i*l)*_,t[5]=(i*s-a*e)*_,t[6]=p*_,t[7]=(n*l-c*e)*_,t[8]=(o*e-n*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(ns.makeScale(t,e)),this}rotate(t){return this.premultiply(ns.makeRotation(-t)),this}translate(t,e){return this.premultiply(ns.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ns=new Ut;function zl(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function ji(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function ih(){const r=ji("canvas");return r.style.display="block",r}const po={};function qi(r){r in po||(po[r]=!0,console.warn(r))}function rh(r,t,e){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}function sh(r){const t=r.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function ah(r){const t=r.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Xt={enabled:!0,workingColorSpace:Li,spaces:{},convert:function(r,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===Jt&&(r.r=xn(r.r),r.g=xn(r.g),r.b=xn(r.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(r.applyMatrix3(this.spaces[t].toXYZ),r.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===Jt&&(r.r=Ti(r.r),r.g=Ti(r.g),r.b=Ti(r.b))),r},fromWorkingColorSpace:function(r,t){return this.convert(r,this.workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Ln?$r:this.spaces[r].transfer},getLuminanceCoefficients:function(r,t=this.workingColorSpace){return r.fromArray(this.spaces[t].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,t,e){return r.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}};function xn(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Ti(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}const mo=[.64,.33,.3,.6,.15,.06],go=[.2126,.7152,.0722],_o=[.3127,.329],vo=new Ut().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),xo=new Ut().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Xt.define({[Li]:{primaries:mo,whitePoint:_o,transfer:$r,toXYZ:vo,fromXYZ:xo,luminanceCoefficients:go,workingColorSpaceConfig:{unpackColorSpace:Me},outputColorSpaceConfig:{drawingBufferColorSpace:Me}},[Me]:{primaries:mo,whitePoint:_o,transfer:Jt,toXYZ:vo,fromXYZ:xo,luminanceCoefficients:go,outputColorSpaceConfig:{drawingBufferColorSpace:Me}}});let ni;class oh{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ni===void 0&&(ni=ji("canvas")),ni.width=t.width,ni.height=t.height;const n=ni.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=ni}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ji("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=xn(s[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(xn(e[n]/255)*255):e[n]=xn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let lh=0;class Hl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:lh++}),this.uuid=Un(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(is(i[o].image)):s.push(is(i[o]))}else s=is(i);n.url=s}return e||(t.images[this.uuid]=n),n}}function is(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?oh.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ch=0;class we extends Ii{constructor(t=we.DEFAULT_IMAGE,e=we.DEFAULT_MAPPING,n=tn,i=tn,s=Oe,o=en,a=nn,l=Mn,c=we.DEFAULT_ANISOTROPY,h=Ln){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ch++}),this.uuid=Un(),this.name="",this.source=new Hl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Rt(0,0),this.repeat=new Rt(1,1),this.center=new Rt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ut,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Al)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Zi:t.x=t.x-Math.floor(t.x);break;case tn:t.x=t.x<0?0:1;break;case ra:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Zi:t.y=t.y-Math.floor(t.y);break;case tn:t.y=t.y<0?0:1;break;case ra:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}we.DEFAULT_IMAGE=null;we.DEFAULT_MAPPING=Al;we.DEFAULT_ANISOTROPY=1;class te{constructor(t=0,e=0,n=0,i=1){te.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s;const l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],p=l[5],g=l[9],_=l[2],m=l[6],d=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const S=(c+1)/2,v=(p+1)/2,w=(d+1)/2,b=(h+f)/4,R=(u+_)/4,A=(g+m)/4;return S>v&&S>w?S<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(S),i=b/n,s=R/n):v>w?v<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(v),n=b/i,s=A/i):w<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(w),n=R/s,i=A/s),this.set(n,i,s,e),this}let y=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(u-_)/y,this.z=(f-h)/y,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class hh extends Ii{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new te(0,0,t,e),this.scissorTest=!1,this.viewport=new te(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Oe,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new we(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Hl(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Jn extends hh{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class kl extends we{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=rn,this.minFilter=rn,this.wrapR=tn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class uh extends we{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=rn,this.minFilter=rn,this.wrapR=tn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Qi{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const f=s[o+0],p=s[o+1],g=s[o+2],_=s[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=p,t[e+2]=g,t[e+3]=_;return}if(u!==_||l!==f||c!==p||h!==g){let m=1-a;const d=l*f+c*p+h*g+u*_,y=d>=0?1:-1,S=1-d*d;if(S>Number.EPSILON){const w=Math.sqrt(S),b=Math.atan2(w,d*y);m=Math.sin(m*b)/w,a=Math.sin(a*b)/w}const v=a*y;if(l=l*m+f*v,c=c*m+p*v,h=h*m+g*v,u=u*m+_*v,m===1-a){const w=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=w,c*=w,h*=w,u*=w}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=s[o],f=s[o+1],p=s[o+2],g=s[o+3];return t[e]=a*g+h*u+l*p-c*f,t[e+1]=l*g+h*f+c*u-a*p,t[e+2]=c*g+h*p+a*f-l*u,t[e+3]=h*g-a*u-l*f-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(s/2),f=l(n/2),p=l(i/2),g=l(s/2);switch(o){case"XYZ":this._x=f*h*u+c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u-f*p*g;break;case"YXZ":this._x=f*h*u+c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u+f*p*g;break;case"ZXY":this._x=f*h*u-c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u-f*p*g;break;case"ZYX":this._x=f*h*u-c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u+f*p*g;break;case"YZX":this._x=f*h*u+c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u-f*p*g;break;case"XZY":this._x=f*h*u-c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=n+a+u;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(h-l)*p,this._y=(s-c)*p,this._z=(o-i)*p}else if(n>a&&n>u){const p=2*Math.sqrt(1+n-a-u);this._w=(h-l)/p,this._x=.25*p,this._y=(i+o)/p,this._z=(s+c)/p}else if(a>u){const p=2*Math.sqrt(1+a-n-u);this._w=(s-c)/p,this._x=(i+o)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+u-n-a);this._w=(o-i)/p,this._x=(s+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Fe(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+i*c-s*l,this._y=i*h+o*l+s*a-n*c,this._z=s*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-e;return this._w=p*o+e*this._w,this._x=p*n+e*this._x,this._y=p*i+e*this._y,this._z=p*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=i*u+this._y*f,this._z=s*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(t=0,e=0,n=0){U.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Mo.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Mo.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),h=2*(a*e-s*i),u=2*(s*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-s*u,this.z=i+l*u+s*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return rs.copy(this).projectOnVector(t),this.sub(rs)}reflect(t){return this.sub(rs.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Fe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const rs=new U,Mo=new Qi;class tr{constructor(t=new U(1/0,1/0,1/0),e=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Ke.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Ke.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Ke.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Ke):Ke.fromBufferAttribute(s,o),Ke.applyMatrix4(t.matrixWorld),this.expandByPoint(Ke);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ar.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ar.copy(n.boundingBox)),ar.applyMatrix4(t.matrixWorld),this.union(ar)}const i=t.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ke),Ke.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Oi),or.subVectors(this.max,Oi),ii.subVectors(t.a,Oi),ri.subVectors(t.b,Oi),si.subVectors(t.c,Oi),En.subVectors(ri,ii),Tn.subVectors(si,ri),Bn.subVectors(ii,si);let e=[0,-En.z,En.y,0,-Tn.z,Tn.y,0,-Bn.z,Bn.y,En.z,0,-En.x,Tn.z,0,-Tn.x,Bn.z,0,-Bn.x,-En.y,En.x,0,-Tn.y,Tn.x,0,-Bn.y,Bn.x,0];return!ss(e,ii,ri,si,or)||(e=[1,0,0,0,1,0,0,0,1],!ss(e,ii,ri,si,or))?!1:(lr.crossVectors(En,Tn),e=[lr.x,lr.y,lr.z],ss(e,ii,ri,si,or))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ke).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ke).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(un[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),un[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),un[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),un[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),un[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),un[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),un[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),un[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(un),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const un=[new U,new U,new U,new U,new U,new U,new U,new U],Ke=new U,ar=new tr,ii=new U,ri=new U,si=new U,En=new U,Tn=new U,Bn=new U,Oi=new U,or=new U,lr=new U,zn=new U;function ss(r,t,e,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){zn.fromArray(r,s);const a=i.x*Math.abs(zn.x)+i.y*Math.abs(zn.y)+i.z*Math.abs(zn.z),l=t.dot(zn),c=e.dot(zn),h=n.dot(zn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const dh=new tr,Bi=new U,as=new U;class Wa{constructor(t=new U,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):dh.setFromPoints(t).getCenter(n);let i=0;for(let s=0,o=t.length;s<o;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Bi.subVectors(t,this.center);const e=Bi.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Bi,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(as.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Bi.copy(t.center).add(as)),this.expandByPoint(Bi.copy(t.center).sub(as))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const dn=new U,os=new U,cr=new U,bn=new U,ls=new U,hr=new U,cs=new U;class fh{constructor(t=new U,e=new U(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,dn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=dn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(dn.copy(this.origin).addScaledVector(this.direction,e),dn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){os.copy(t).add(e).multiplyScalar(.5),cr.copy(e).sub(t).normalize(),bn.copy(this.origin).sub(os);const s=t.distanceTo(e)*.5,o=-this.direction.dot(cr),a=bn.dot(this.direction),l=-bn.dot(cr),c=bn.lengthSq(),h=Math.abs(1-o*o);let u,f,p,g;if(h>0)if(u=o*l-a,f=o*a-l,g=s*h,u>=0)if(f>=-g)if(f<=g){const _=1/h;u*=_,f*=_,p=u*(u+o*f+2*a)+f*(o*u+f+2*l)+c}else f=s,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*l)+c;else f=-s,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-o*s+a)),f=u>0?-s:Math.min(Math.max(-s,-l),s),p=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-s,-l),s),p=f*(f+2*l)+c):(u=Math.max(0,-(o*s+a)),f=u>0?s:Math.min(Math.max(-s,-l),s),p=-u*u+f*(f+2*l)+c);else f=o>0?-s:s,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(os).addScaledVector(cr,f),p}intersectSphere(t,e){dn.subVectors(t.center,this.origin);const n=dn.dot(this.direction),i=dn.dot(dn)-n*n,s=t.radius*t.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,i=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,i=(t.min.x-f.x)*c),h>=0?(s=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(s=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),u>=0?(a=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,dn)!==null}intersectTriangle(t,e,n,i,s){ls.subVectors(e,t),hr.subVectors(n,t),cs.crossVectors(ls,hr);let o=this.direction.dot(cs),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;bn.subVectors(this.origin,t);const l=a*this.direction.dot(hr.crossVectors(bn,hr));if(l<0)return null;const c=a*this.direction.dot(ls.cross(bn));if(c<0||l+c>o)return null;const h=-a*bn.dot(cs);return h<0?null:this.at(h/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ce{constructor(t,e,n,i,s,o,a,l,c,h,u,f,p,g,_,m){ce.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,l,c,h,u,f,p,g,_,m)}set(t,e,n,i,s,o,a,l,c,h,u,f,p,g,_,m){const d=this.elements;return d[0]=t,d[4]=e,d[8]=n,d[12]=i,d[1]=s,d[5]=o,d[9]=a,d[13]=l,d[2]=c,d[6]=h,d[10]=u,d[14]=f,d[3]=p,d[7]=g,d[11]=_,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ce().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/ai.setFromMatrixColumn(t,0).length(),s=1/ai.setFromMatrixColumn(t,1).length(),o=1/ai.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){const f=o*h,p=o*u,g=a*h,_=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=p+g*c,e[5]=f-_*c,e[9]=-a*l,e[2]=_-f*c,e[6]=g+p*c,e[10]=o*l}else if(t.order==="YXZ"){const f=l*h,p=l*u,g=c*h,_=c*u;e[0]=f+_*a,e[4]=g*a-p,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=p*a-g,e[6]=_+f*a,e[10]=o*l}else if(t.order==="ZXY"){const f=l*h,p=l*u,g=c*h,_=c*u;e[0]=f-_*a,e[4]=-o*u,e[8]=g+p*a,e[1]=p+g*a,e[5]=o*h,e[9]=_-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const f=o*h,p=o*u,g=a*h,_=a*u;e[0]=l*h,e[4]=g*c-p,e[8]=f*c+_,e[1]=l*u,e[5]=_*c+f,e[9]=p*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const f=o*l,p=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=_-f*u,e[8]=g*u+p,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=p*u+g,e[10]=f-_*u}else if(t.order==="XZY"){const f=o*l,p=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+_,e[5]=o*h,e[9]=p*u-g,e[2]=g*u-p,e[6]=a*h,e[10]=_*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ph,t,mh)}lookAt(t,e,n){const i=this.elements;return ze.subVectors(t,e),ze.lengthSq()===0&&(ze.z=1),ze.normalize(),wn.crossVectors(n,ze),wn.lengthSq()===0&&(Math.abs(n.z)===1?ze.x+=1e-4:ze.z+=1e-4,ze.normalize(),wn.crossVectors(n,ze)),wn.normalize(),ur.crossVectors(ze,wn),i[0]=wn.x,i[4]=ur.x,i[8]=ze.x,i[1]=wn.y,i[5]=ur.y,i[9]=ze.y,i[2]=wn.z,i[6]=ur.z,i[10]=ze.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],p=n[13],g=n[2],_=n[6],m=n[10],d=n[14],y=n[3],S=n[7],v=n[11],w=n[15],b=i[0],R=i[4],A=i[8],x=i[12],M=i[1],C=i[5],L=i[9],O=i[13],H=i[2],$=i[6],V=i[10],Q=i[14],X=i[3],at=i[7],dt=i[11],yt=i[15];return s[0]=o*b+a*M+l*H+c*X,s[4]=o*R+a*C+l*$+c*at,s[8]=o*A+a*L+l*V+c*dt,s[12]=o*x+a*O+l*Q+c*yt,s[1]=h*b+u*M+f*H+p*X,s[5]=h*R+u*C+f*$+p*at,s[9]=h*A+u*L+f*V+p*dt,s[13]=h*x+u*O+f*Q+p*yt,s[2]=g*b+_*M+m*H+d*X,s[6]=g*R+_*C+m*$+d*at,s[10]=g*A+_*L+m*V+d*dt,s[14]=g*x+_*O+m*Q+d*yt,s[3]=y*b+S*M+v*H+w*X,s[7]=y*R+S*C+v*$+w*at,s[11]=y*A+S*L+v*V+w*dt,s[15]=y*x+S*O+v*Q+w*yt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],p=t[14],g=t[3],_=t[7],m=t[11],d=t[15];return g*(+s*l*u-i*c*u-s*a*f+n*c*f+i*a*p-n*l*p)+_*(+e*l*p-e*c*f+s*o*f-i*o*p+i*c*h-s*l*h)+m*(+e*c*u-e*a*p-s*o*u+n*o*p+s*a*h-n*c*h)+d*(-i*a*h-e*l*u+e*a*f+i*o*u-n*o*f+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],p=t[11],g=t[12],_=t[13],m=t[14],d=t[15],y=u*m*c-_*f*c+_*l*p-a*m*p-u*l*d+a*f*d,S=g*f*c-h*m*c-g*l*p+o*m*p+h*l*d-o*f*d,v=h*_*c-g*u*c+g*a*p-o*_*p-h*a*d+o*u*d,w=g*u*l-h*_*l-g*a*f+o*_*f+h*a*m-o*u*m,b=e*y+n*S+i*v+s*w;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/b;return t[0]=y*R,t[1]=(_*f*s-u*m*s-_*i*p+n*m*p+u*i*d-n*f*d)*R,t[2]=(a*m*s-_*l*s+_*i*c-n*m*c-a*i*d+n*l*d)*R,t[3]=(u*l*s-a*f*s-u*i*c+n*f*c+a*i*p-n*l*p)*R,t[4]=S*R,t[5]=(h*m*s-g*f*s+g*i*p-e*m*p-h*i*d+e*f*d)*R,t[6]=(g*l*s-o*m*s-g*i*c+e*m*c+o*i*d-e*l*d)*R,t[7]=(o*f*s-h*l*s+h*i*c-e*f*c-o*i*p+e*l*p)*R,t[8]=v*R,t[9]=(g*u*s-h*_*s-g*n*p+e*_*p+h*n*d-e*u*d)*R,t[10]=(o*_*s-g*a*s+g*n*c-e*_*c-o*n*d+e*a*d)*R,t[11]=(h*a*s-o*u*s-h*n*c+e*u*c+o*n*p-e*a*p)*R,t[12]=w*R,t[13]=(h*_*i-g*u*i+g*n*f-e*_*f-h*n*m+e*u*m)*R,t[14]=(g*a*i-o*_*i-g*n*l+e*_*l+o*n*m-e*a*m)*R,t[15]=(o*u*i-h*a*i+h*n*l-e*u*l-o*n*f+e*a*f)*R,this}scale(t){const e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),s=1-n,o=t.x,a=t.y,l=t.z,c=s*o,h=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,o){return this.set(1,n,s,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,h=o+o,u=a+a,f=s*c,p=s*h,g=s*u,_=o*h,m=o*u,d=a*u,y=l*c,S=l*h,v=l*u,w=n.x,b=n.y,R=n.z;return i[0]=(1-(_+d))*w,i[1]=(p+v)*w,i[2]=(g-S)*w,i[3]=0,i[4]=(p-v)*b,i[5]=(1-(f+d))*b,i[6]=(m+y)*b,i[7]=0,i[8]=(g+S)*R,i[9]=(m-y)*R,i[10]=(1-(f+_))*R,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let s=ai.set(i[0],i[1],i[2]).length();const o=ai.set(i[4],i[5],i[6]).length(),a=ai.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],je.copy(this);const c=1/s,h=1/o,u=1/a;return je.elements[0]*=c,je.elements[1]*=c,je.elements[2]*=c,je.elements[4]*=h,je.elements[5]*=h,je.elements[6]*=h,je.elements[8]*=u,je.elements[9]*=u,je.elements[10]*=u,e.setFromRotationMatrix(je),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,i,s,o,a=vn){const l=this.elements,c=2*s/(e-t),h=2*s/(n-i),u=(e+t)/(e-t),f=(n+i)/(n-i);let p,g;if(a===vn)p=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Gr)p=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,s,o,a=vn){const l=this.elements,c=1/(e-t),h=1/(n-i),u=1/(o-s),f=(e+t)*c,p=(n+i)*h;let g,_;if(a===vn)g=(o+s)*u,_=-2*u;else if(a===Gr)g=s*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ai=new U,je=new ce,ph=new U(0,0,0),mh=new U(1,1,1),wn=new U,ur=new U,ze=new U,So=new ce,yo=new Qi;class sn{constructor(t=0,e=0,n=0,i=sn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],f=i[6],p=i[10];switch(e){case"XYZ":this._y=Math.asin(Fe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Fe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Fe(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Fe(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Fe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Fe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return So.makeRotationFromQuaternion(t),this.setFromRotationMatrix(So,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return yo.setFromEuler(this),this.setFromQuaternion(yo,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}sn.DEFAULT_ORDER="XYZ";class Gl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let gh=0;const Eo=new U,oi=new Qi,fn=new ce,dr=new U,zi=new U,_h=new U,vh=new Qi,To=new U(1,0,0),bo=new U(0,1,0),wo=new U(0,0,1),Ao={type:"added"},xh={type:"removed"},li={type:"childadded",child:null},hs={type:"childremoved",child:null};class Se extends Ii{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:gh++}),this.uuid=Un(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Se.DEFAULT_UP.clone();const t=new U,e=new sn,n=new Qi,i=new U(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ce},normalMatrix:{value:new Ut}}),this.matrix=new ce,this.matrixWorld=new ce,this.matrixAutoUpdate=Se.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Se.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Gl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return oi.setFromAxisAngle(t,e),this.quaternion.multiply(oi),this}rotateOnWorldAxis(t,e){return oi.setFromAxisAngle(t,e),this.quaternion.premultiply(oi),this}rotateX(t){return this.rotateOnAxis(To,t)}rotateY(t){return this.rotateOnAxis(bo,t)}rotateZ(t){return this.rotateOnAxis(wo,t)}translateOnAxis(t,e){return Eo.copy(t).applyQuaternion(this.quaternion),this.position.add(Eo.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(To,t)}translateY(t){return this.translateOnAxis(bo,t)}translateZ(t){return this.translateOnAxis(wo,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(fn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?dr.copy(t):dr.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),zi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?fn.lookAt(zi,dr,this.up):fn.lookAt(dr,zi,this.up),this.quaternion.setFromRotationMatrix(fn),i&&(fn.extractRotation(i.matrixWorld),oi.setFromRotationMatrix(fn),this.quaternion.premultiply(oi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ao),li.child=t,this.dispatchEvent(li),li.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(xh),hs.child=t,this.dispatchEvent(hs),hs.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),fn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),fn.multiply(t.parent.matrixWorld)),t.applyMatrix4(fn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ao),li.child=t,this.dispatchEvent(li),li.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zi,t,_h),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zi,vh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(t.shapes,u)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));i.material=a}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),p=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}Se.DEFAULT_UP=new U(0,1,0);Se.DEFAULT_MATRIX_AUTO_UPDATE=!0;Se.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Je=new U,pn=new U,us=new U,mn=new U,ci=new U,hi=new U,Ro=new U,ds=new U,fs=new U,ps=new U,ms=new te,gs=new te,_s=new te;class qe{constructor(t=new U,e=new U,n=new U){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Je.subVectors(t,e),i.cross(Je);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){Je.subVectors(i,e),pn.subVectors(n,e),us.subVectors(t,e);const o=Je.dot(Je),a=Je.dot(pn),l=Je.dot(us),c=pn.dot(pn),h=pn.dot(us),u=o*c-a*a;if(u===0)return s.set(0,0,0),null;const f=1/u,p=(c*l-a*h)*f,g=(o*h-a*l)*f;return s.set(1-p-g,g,p)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,mn)===null?!1:mn.x>=0&&mn.y>=0&&mn.x+mn.y<=1}static getInterpolation(t,e,n,i,s,o,a,l){return this.getBarycoord(t,e,n,i,mn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,mn.x),l.addScaledVector(o,mn.y),l.addScaledVector(a,mn.z),l)}static getInterpolatedAttribute(t,e,n,i,s,o){return ms.setScalar(0),gs.setScalar(0),_s.setScalar(0),ms.fromBufferAttribute(t,e),gs.fromBufferAttribute(t,n),_s.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(ms,s.x),o.addScaledVector(gs,s.y),o.addScaledVector(_s,s.z),o}static isFrontFacing(t,e,n,i){return Je.subVectors(n,e),pn.subVectors(t,e),Je.cross(pn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Je.subVectors(this.c,this.b),pn.subVectors(this.a,this.b),Je.cross(pn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return qe.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return qe.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return qe.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return qe.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return qe.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,s=this.c;let o,a;ci.subVectors(i,n),hi.subVectors(s,n),ds.subVectors(t,n);const l=ci.dot(ds),c=hi.dot(ds);if(l<=0&&c<=0)return e.copy(n);fs.subVectors(t,i);const h=ci.dot(fs),u=hi.dot(fs);if(h>=0&&u<=h)return e.copy(i);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(ci,o);ps.subVectors(t,s);const p=ci.dot(ps),g=hi.dot(ps);if(g>=0&&p<=g)return e.copy(s);const _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(hi,a);const m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return Ro.subVectors(s,i),a=(u-h)/(u-h+(p-g)),e.copy(i).addScaledVector(Ro,a);const d=1/(m+_+f);return o=_*d,a=f*d,e.copy(n).addScaledVector(ci,o).addScaledVector(hi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Vl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},An={h:0,s:0,l:0},fr={h:0,s:0,l:0};function vs(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}class Lt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Me){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Xt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=Xt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Xt.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=Xt.workingColorSpace){if(t=nh(t,1),e=Fe(e,0,1),n=Fe(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=vs(o,s,t+1/3),this.g=vs(o,s,t),this.b=vs(o,s,t-1/3)}return Xt.toWorkingColorSpace(this,i),this}setStyle(t,e=Me){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Me){const n=Vl[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=xn(t.r),this.g=xn(t.g),this.b=xn(t.b),this}copyLinearToSRGB(t){return this.r=Ti(t.r),this.g=Ti(t.g),this.b=Ti(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Me){return Xt.fromWorkingColorSpace(be.copy(this),t),Math.round(Fe(be.r*255,0,255))*65536+Math.round(Fe(be.g*255,0,255))*256+Math.round(Fe(be.b*255,0,255))}getHexString(t=Me){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Xt.workingColorSpace){Xt.fromWorkingColorSpace(be.copy(this),e);const n=be.r,i=be.g,s=be.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Xt.workingColorSpace){return Xt.fromWorkingColorSpace(be.copy(this),e),t.r=be.r,t.g=be.g,t.b=be.b,t}getStyle(t=Me){Xt.fromWorkingColorSpace(be.copy(this),t);const e=be.r,n=be.g,i=be.b;return t!==Me?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(An),this.setHSL(An.h+t,An.s+e,An.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(An),t.getHSL(fr);const n=es(An.h,fr.h,e),i=es(An.s,fr.s,e),s=es(An.l,fr.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const be=new Lt;Lt.NAMES=Vl;let Mh=0;class Qn extends Ii{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Mh++}),this.uuid=Un(),this.name="",this.blending=yi,this.side=Nn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ys,this.blendDst=$s,this.blendEquation=Zn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Lt(0,0,0),this.blendAlpha=0,this.depthFunc=bi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=uo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ei,this.stencilZFail=ei,this.stencilZPass=ei,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==yi&&(n.blending=this.blending),this.side!==Nn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ys&&(n.blendSrc=this.blendSrc),this.blendDst!==$s&&(n.blendDst=this.blendDst),this.blendEquation!==Zn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==bi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==uo&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ei&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ei&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ei&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(e){const s=i(t.textures),o=i(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Re extends Qn{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Lt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new sn,this.combine=qr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ge=new U,pr=new Rt;class Pe{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=La,this.updateRanges=[],this.gpuType=_n,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)pr.fromBufferAttribute(this,e),pr.applyMatrix3(t),this.setXY(e,pr.x,pr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.applyMatrix3(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.applyMatrix4(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.applyNormalMatrix(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.transformDirection(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ln(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Qt(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ln(e,this.array)),e}setX(t,e){return this.normalized&&(e=Qt(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ln(e,this.array)),e}setY(t,e){return this.normalized&&(e=Qt(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ln(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Qt(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ln(e,this.array)),e}setW(t,e){return this.normalized&&(e=Qt(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Qt(e,this.array),n=Qt(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Qt(e,this.array),n=Qt(n,this.array),i=Qt(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=Qt(e,this.array),n=Qt(n,this.array),i=Qt(i,this.array),s=Qt(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==La&&(t.usage=this.usage),t}}class Wl extends Pe{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Xl extends Pe{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class de extends Pe{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Sh=0;const Xe=new ce,xs=new Se,ui=new U,He=new tr,Hi=new tr,xe=new U;class Ie extends Ii{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Sh++}),this.uuid=Un(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(zl(t)?Xl:Wl)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ut().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Xe.makeRotationFromQuaternion(t),this.applyMatrix4(Xe),this}rotateX(t){return Xe.makeRotationX(t),this.applyMatrix4(Xe),this}rotateY(t){return Xe.makeRotationY(t),this.applyMatrix4(Xe),this}rotateZ(t){return Xe.makeRotationZ(t),this.applyMatrix4(Xe),this}translate(t,e,n){return Xe.makeTranslation(t,e,n),this.applyMatrix4(Xe),this}scale(t,e,n){return Xe.makeScale(t,e,n),this.applyMatrix4(Xe),this}lookAt(t){return xs.lookAt(t),xs.updateMatrix(),this.applyMatrix4(xs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ui).negate(),this.translate(ui.x,ui.y,ui.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,s=t.length;i<s;i++){const o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new de(n,3))}else{for(let n=0,i=e.count;n<i;n++){const s=t[n];e.setXYZ(n,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new tr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const s=e[n];He.setFromBufferAttribute(s),this.morphTargetsRelative?(xe.addVectors(this.boundingBox.min,He.min),this.boundingBox.expandByPoint(xe),xe.addVectors(this.boundingBox.max,He.max),this.boundingBox.expandByPoint(xe)):(this.boundingBox.expandByPoint(He.min),this.boundingBox.expandByPoint(He.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Wa);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(t){const n=this.boundingSphere.center;if(He.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];Hi.setFromBufferAttribute(a),this.morphTargetsRelative?(xe.addVectors(He.min,Hi.min),He.expandByPoint(xe),xe.addVectors(He.max,Hi.max),He.expandByPoint(xe)):(He.expandByPoint(Hi.min),He.expandByPoint(Hi.max))}He.getCenter(n);let i=0;for(let s=0,o=t.count;s<o;s++)xe.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(xe));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)xe.fromBufferAttribute(a,c),l&&(ui.fromBufferAttribute(t,c),xe.add(ui)),i=Math.max(i,n.distanceToSquared(xe))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Pe(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let A=0;A<n.count;A++)a[A]=new U,l[A]=new U;const c=new U,h=new U,u=new U,f=new Rt,p=new Rt,g=new Rt,_=new U,m=new U;function d(A,x,M){c.fromBufferAttribute(n,A),h.fromBufferAttribute(n,x),u.fromBufferAttribute(n,M),f.fromBufferAttribute(s,A),p.fromBufferAttribute(s,x),g.fromBufferAttribute(s,M),h.sub(c),u.sub(c),p.sub(f),g.sub(f);const C=1/(p.x*g.y-g.x*p.y);isFinite(C)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(C),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(C),a[A].add(_),a[x].add(_),a[M].add(_),l[A].add(m),l[x].add(m),l[M].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let A=0,x=y.length;A<x;++A){const M=y[A],C=M.start,L=M.count;for(let O=C,H=C+L;O<H;O+=3)d(t.getX(O+0),t.getX(O+1),t.getX(O+2))}const S=new U,v=new U,w=new U,b=new U;function R(A){w.fromBufferAttribute(i,A),b.copy(w);const x=a[A];S.copy(x),S.sub(w.multiplyScalar(w.dot(x))).normalize(),v.crossVectors(b,x);const C=v.dot(l[A])<0?-1:1;o.setXYZW(A,S.x,S.y,S.z,C)}for(let A=0,x=y.length;A<x;++A){const M=y[A],C=M.start,L=M.count;for(let O=C,H=C+L;O<H;O+=3)R(t.getX(O+0)),R(t.getX(O+1)),R(t.getX(O+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Pe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);const i=new U,s=new U,o=new U,a=new U,l=new U,c=new U,h=new U,u=new U;if(t)for(let f=0,p=t.count;f<p;f+=3){const g=t.getX(f+0),_=t.getX(f+1),m=t.getX(f+2);i.fromBufferAttribute(e,g),s.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=e.count;f<p;f+=3)i.fromBufferAttribute(e,f+0),s.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)xe.fromBufferAttribute(t,e),xe.normalize(),t.setXYZ(e,xe.x,xe.y,xe.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,f=new c.constructor(l.length*h);let p=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?p=l[_]*a.data.stride+a.offset:p=l[_]*h;for(let d=0;d<h;d++)f[g++]=c[p++]}return new Pe(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ie,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=t(l,n);e.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let h=0,u=c.length;h<u;h++){const f=c[h],p=t(f,n);l.push(p)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const p=c[u];h.push(p.toJSON(t.data))}h.length>0&&(i[l]=h,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const s=t.morphAttributes;for(const c in s){const h=[],u=s[c];for(let f=0,p=u.length;f<p;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Co=new ce,Hn=new fh,mr=new Wa,Po=new U,gr=new U,_r=new U,vr=new U,Ms=new U,xr=new U,Lo=new U,Mr=new U;class J extends Se{constructor(t=new Ie,e=new Re){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(s&&a){xr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=a[l],u=s[l];h!==0&&(Ms.fromBufferAttribute(u,t),o?xr.addScaledVector(Ms,h):xr.addScaledVector(Ms.sub(e),h))}e.add(xr)}return e}raycast(t,e){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),mr.copy(n.boundingSphere),mr.applyMatrix4(s),Hn.copy(t.ray).recast(t.near),!(mr.containsPoint(Hn.origin)===!1&&(Hn.intersectSphere(mr,Po)===null||Hn.origin.distanceToSquared(Po)>(t.far-t.near)**2))&&(Co.copy(s).invert(),Hn.copy(t.ray).applyMatrix4(Co),!(n.boundingBox!==null&&Hn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Hn)))}_computeIntersections(t,e,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,f=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],d=o[m.materialIndex],y=Math.max(m.start,p.start),S=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let v=y,w=S;v<w;v+=3){const b=a.getX(v),R=a.getX(v+1),A=a.getX(v+2);i=Sr(this,d,t,n,c,h,u,b,R,A),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const y=a.getX(m),S=a.getX(m+1),v=a.getX(m+2);i=Sr(this,o,t,n,c,h,u,y,S,v),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],d=o[m.materialIndex],y=Math.max(m.start,p.start),S=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let v=y,w=S;v<w;v+=3){const b=v,R=v+1,A=v+2;i=Sr(this,d,t,n,c,h,u,b,R,A),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const y=m,S=m+1,v=m+2;i=Sr(this,o,t,n,c,h,u,y,S,v),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}}function yh(r,t,e,n,i,s,o,a){let l;if(t.side===Le?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,t.side===Nn,a),l===null)return null;Mr.copy(a),Mr.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(Mr);return c<e.near||c>e.far?null:{distance:c,point:Mr.clone(),object:r}}function Sr(r,t,e,n,i,s,o,a,l,c){r.getVertexPosition(a,gr),r.getVertexPosition(l,_r),r.getVertexPosition(c,vr);const h=yh(r,t,e,n,gr,_r,vr,Lo);if(h){const u=new U;qe.getBarycoord(Lo,gr,_r,vr,u),i&&(h.uv=qe.getInterpolatedAttribute(i,a,l,c,u,new Rt)),s&&(h.uv1=qe.getInterpolatedAttribute(s,a,l,c,u,new Rt)),o&&(h.normal=qe.getInterpolatedAttribute(o,a,l,c,u,new U),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new U,materialIndex:0};qe.getNormal(gr,_r,vr,f.normal),h.face=f,h.barycoord=u}return h}class le extends Ie{constructor(t=1,e=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],h=[],u=[];let f=0,p=0;g("z","y","x",-1,-1,n,e,t,o,s,0),g("z","y","x",1,-1,n,e,-t,o,s,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,s,4),g("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new de(c,3)),this.setAttribute("normal",new de(h,3)),this.setAttribute("uv",new de(u,2));function g(_,m,d,y,S,v,w,b,R,A,x){const M=v/R,C=w/A,L=v/2,O=w/2,H=b/2,$=R+1,V=A+1;let Q=0,X=0;const at=new U;for(let dt=0;dt<V;dt++){const yt=dt*C-O;for(let Ot=0;Ot<$;Ot++){const ee=Ot*M-L;at[_]=ee*y,at[m]=yt*S,at[d]=H,c.push(at.x,at.y,at.z),at[_]=0,at[m]=0,at[d]=b>0?1:-1,h.push(at.x,at.y,at.z),u.push(Ot/R),u.push(1-dt/A),Q+=1}}for(let dt=0;dt<A;dt++)for(let yt=0;yt<R;yt++){const Ot=f+yt+$*dt,ee=f+yt+$*(dt+1),Y=f+(yt+1)+$*(dt+1),nt=f+(yt+1)+$*dt;l.push(Ot,ee,nt),l.push(ee,Y,nt),X+=6}a.addGroup(p,X,x),p+=X,f+=Q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new le(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Pi(r){const t={};for(const e in r){t[e]={};for(const n in r[e]){const i=r[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Ce(r){const t={};for(let e=0;e<r.length;e++){const n=Pi(r[e]);for(const i in n)t[i]=n[i]}return t}function Eh(r){const t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function ql(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Xt.workingColorSpace}const Th={clone:Pi,merge:Ce};var bh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,wh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Fn extends Qn{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=bh,this.fragmentShader=wh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Pi(t.uniforms),this.uniformsGroups=Eh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Yl extends Se{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ce,this.projectionMatrix=new ce,this.projectionMatrixInverse=new ce,this.coordinateSystem=vn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Rn=new U,Io=new Rt,Do=new Rt;class Ge extends Yl{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ia*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ts*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ia*2*Math.atan(Math.tan(ts*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Rn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Rn.x,Rn.y).multiplyScalar(-t/Rn.z),Rn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Rn.x,Rn.y).multiplyScalar(-t/Rn.z)}getViewSize(t,e){return this.getViewBounds(t,Io,Do),e.subVectors(Do,Io)}setViewOffset(t,e,n,i,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ts*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const di=-90,fi=1;class Ah extends Se{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Ge(di,fi,t,e);i.layers=this.layers,this.add(i);const s=new Ge(di,fi,t,e);s.layers=this.layers,this.add(s);const o=new Ge(di,fi,t,e);o.layers=this.layers,this.add(o);const a=new Ge(di,fi,t,e);a.layers=this.layers,this.add(a);const l=new Ge(di,fi,t,e);l.layers=this.layers,this.add(l);const c=new Ge(di,fi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,s,o,a,l]=e;for(const c of e)this.remove(c);if(t===vn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Gr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,s),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,f,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class $l extends we{constructor(t,e,n,i,s,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:wi,super(t,e,n,i,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Rh extends Jn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new $l(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Oe}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new le(5,5,5),s=new Fn({name:"CubemapFromEquirect",uniforms:Pi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Le,blending:In});s.uniforms.tEquirect.value=e;const o=new J(i,s),a=e.minFilter;return e.minFilter===en&&(e.minFilter=Oe),new Ah(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(s)}}const Ss=new U,Ch=new U,Ph=new Ut;class qn{constructor(t=new U(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Ss.subVectors(n,e).cross(Ch.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Ss),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Ph.getNormalMatrix(t),i=this.coplanarPoint(Ss).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const kn=new Wa,yr=new U;class Xa{constructor(t=new qn,e=new qn,n=new qn,i=new qn,s=new qn,o=new qn){this.planes=[t,e,n,i,s,o]}set(t,e,n,i,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=vn){const n=this.planes,i=t.elements,s=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],u=i[6],f=i[7],p=i[8],g=i[9],_=i[10],m=i[11],d=i[12],y=i[13],S=i[14],v=i[15];if(n[0].setComponents(l-s,f-c,m-p,v-d).normalize(),n[1].setComponents(l+s,f+c,m+p,v+d).normalize(),n[2].setComponents(l+o,f+h,m+g,v+y).normalize(),n[3].setComponents(l-o,f-h,m-g,v-y).normalize(),n[4].setComponents(l-a,f-u,m-_,v-S).normalize(),e===vn)n[5].setComponents(l+a,f+u,m+_,v+S).normalize();else if(e===Gr)n[5].setComponents(a,u,_,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),kn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),kn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(kn)}intersectsSprite(t){return kn.center.set(0,0,0),kn.radius=.7071067811865476,kn.applyMatrix4(t.matrixWorld),this.intersectsSphere(kn)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(yr.x=i.normal.x>0?t.max.x:t.min.x,yr.y=i.normal.y>0?t.max.y:t.min.y,yr.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(yr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Zl(){let r=null,t=!1,e=null,n=null;function i(s,o){e(s,o),n=r.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function Lh(r){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,u=c.byteLength,f=r.createBuffer();r.bindBuffer(l,f),r.bufferData(l,c,h),a.onUploadCallback();let p;if(c instanceof Float32Array)p=r.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=r.HALF_FLOAT:p=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=r.SHORT;else if(c instanceof Uint32Array)p=r.UNSIGNED_INT;else if(c instanceof Int32Array)p=r.INT;else if(c instanceof Int8Array)p=r.BYTE;else if(c instanceof Uint8Array)p=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(r.bindBuffer(c,a),u.length===0)r.bufferSubData(c,0,h);else{u.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<u.length;p++){const g=u[f],_=u[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,u[f]=_)}u.length=f+1;for(let p=0,g=u.length;p<g;p++){const _=u[p];r.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(r.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:s,update:o}}class Wt extends Ie{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const s=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=t/a,f=e/l,p=[],g=[],_=[],m=[];for(let d=0;d<h;d++){const y=d*f-o;for(let S=0;S<c;S++){const v=S*u-s;g.push(v,-y,0),_.push(0,0,1),m.push(S/a),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let y=0;y<a;y++){const S=y+c*d,v=y+c*(d+1),w=y+1+c*(d+1),b=y+1+c*d;p.push(S,v,b),p.push(v,w,b)}this.setIndex(p),this.setAttribute("position",new de(g,3)),this.setAttribute("normal",new de(_,3)),this.setAttribute("uv",new de(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wt(t.width,t.height,t.widthSegments,t.heightSegments)}}var Ih=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Dh=`#ifdef USE_ALPHAHASH
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
#endif`,Uh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Nh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Fh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Oh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Bh=`#ifdef USE_AOMAP
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
#endif`,zh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Hh=`#ifdef USE_BATCHING
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
#endif`,kh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Gh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Vh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Wh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Xh=`#ifdef USE_IRIDESCENCE
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
#endif`,qh=`#ifdef USE_BUMPMAP
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
#endif`,Yh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,$h=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Zh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Kh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,jh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Jh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Qh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,tu=`#if defined( USE_COLOR_ALPHA )
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
#endif`,eu=`#define PI 3.141592653589793
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
} // validated`,nu=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,iu=`vec3 transformedNormal = objectNormal;
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
#endif`,ru=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,su=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,au=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ou=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,lu="gl_FragColor = linearToOutputTexel( gl_FragColor );",cu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,hu=`#ifdef USE_ENVMAP
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
#endif`,uu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,du=`#ifdef USE_ENVMAP
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
#endif`,fu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,pu=`#ifdef USE_ENVMAP
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
#endif`,mu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,gu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,_u=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,vu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,xu=`#ifdef USE_GRADIENTMAP
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
}`,Mu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Su=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,yu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Eu=`uniform bool receiveShadow;
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
#endif`,Tu=`#ifdef USE_ENVMAP
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
#endif`,bu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,wu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Au=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ru=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Cu=`PhysicalMaterial material;
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
#endif`,Pu=`struct PhysicalMaterial {
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
}`,Lu=`
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
#endif`,Iu=`#if defined( RE_IndirectDiffuse )
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
#endif`,Du=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Uu=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Nu=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Fu=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ou=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Bu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,zu=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Hu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,ku=`#if defined( USE_POINTS_UV )
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
#endif`,Gu=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Vu=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Wu=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Xu=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,qu=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Yu=`#ifdef USE_MORPHTARGETS
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
#endif`,$u=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Zu=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ku=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ju=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ju=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Qu=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,td=`#ifdef USE_NORMALMAP
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
#endif`,ed=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,nd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,id=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,rd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,sd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ad=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,od=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ld=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,cd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,hd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ud=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,dd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,fd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,pd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,md=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,gd=`float getShadowMask() {
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
}`,_d=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,vd=`#ifdef USE_SKINNING
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
#endif`,xd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Md=`#ifdef USE_SKINNING
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
#endif`,Sd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,yd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ed=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Td=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,bd=`#ifdef USE_TRANSMISSION
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
#endif`,wd=`#ifdef USE_TRANSMISSION
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
#endif`,Ad=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Rd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Cd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Pd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ld=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Id=`uniform sampler2D t2D;
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
}`,Dd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ud=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Nd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fd=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Od=`#include <common>
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
}`,Bd=`#if DEPTH_PACKING == 3200
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
}`,zd=`#define DISTANCE
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
}`,Hd=`#define DISTANCE
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
}`,kd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Gd=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vd=`uniform float scale;
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
}`,Wd=`uniform vec3 diffuse;
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
}`,Xd=`#include <common>
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
}`,qd=`uniform vec3 diffuse;
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
}`,Yd=`#define LAMBERT
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
}`,$d=`#define LAMBERT
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
}`,Zd=`#define MATCAP
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
}`,Kd=`#define MATCAP
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
}`,jd=`#define NORMAL
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
}`,Jd=`#define NORMAL
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
}`,Qd=`#define PHONG
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
}`,tf=`#define PHONG
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
}`,ef=`#define STANDARD
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
}`,nf=`#define STANDARD
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
}`,rf=`#define TOON
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
}`,sf=`#define TOON
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
}`,af=`uniform float size;
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
}`,of=`uniform vec3 diffuse;
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
}`,lf=`#include <common>
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
}`,cf=`uniform vec3 color;
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
}`,hf=`uniform float rotation;
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
}`,uf=`uniform vec3 diffuse;
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
}`,Ft={alphahash_fragment:Ih,alphahash_pars_fragment:Dh,alphamap_fragment:Uh,alphamap_pars_fragment:Nh,alphatest_fragment:Fh,alphatest_pars_fragment:Oh,aomap_fragment:Bh,aomap_pars_fragment:zh,batching_pars_vertex:Hh,batching_vertex:kh,begin_vertex:Gh,beginnormal_vertex:Vh,bsdfs:Wh,iridescence_fragment:Xh,bumpmap_pars_fragment:qh,clipping_planes_fragment:Yh,clipping_planes_pars_fragment:$h,clipping_planes_pars_vertex:Zh,clipping_planes_vertex:Kh,color_fragment:jh,color_pars_fragment:Jh,color_pars_vertex:Qh,color_vertex:tu,common:eu,cube_uv_reflection_fragment:nu,defaultnormal_vertex:iu,displacementmap_pars_vertex:ru,displacementmap_vertex:su,emissivemap_fragment:au,emissivemap_pars_fragment:ou,colorspace_fragment:lu,colorspace_pars_fragment:cu,envmap_fragment:hu,envmap_common_pars_fragment:uu,envmap_pars_fragment:du,envmap_pars_vertex:fu,envmap_physical_pars_fragment:Tu,envmap_vertex:pu,fog_vertex:mu,fog_pars_vertex:gu,fog_fragment:_u,fog_pars_fragment:vu,gradientmap_pars_fragment:xu,lightmap_pars_fragment:Mu,lights_lambert_fragment:Su,lights_lambert_pars_fragment:yu,lights_pars_begin:Eu,lights_toon_fragment:bu,lights_toon_pars_fragment:wu,lights_phong_fragment:Au,lights_phong_pars_fragment:Ru,lights_physical_fragment:Cu,lights_physical_pars_fragment:Pu,lights_fragment_begin:Lu,lights_fragment_maps:Iu,lights_fragment_end:Du,logdepthbuf_fragment:Uu,logdepthbuf_pars_fragment:Nu,logdepthbuf_pars_vertex:Fu,logdepthbuf_vertex:Ou,map_fragment:Bu,map_pars_fragment:zu,map_particle_fragment:Hu,map_particle_pars_fragment:ku,metalnessmap_fragment:Gu,metalnessmap_pars_fragment:Vu,morphinstance_vertex:Wu,morphcolor_vertex:Xu,morphnormal_vertex:qu,morphtarget_pars_vertex:Yu,morphtarget_vertex:$u,normal_fragment_begin:Zu,normal_fragment_maps:Ku,normal_pars_fragment:ju,normal_pars_vertex:Ju,normal_vertex:Qu,normalmap_pars_fragment:td,clearcoat_normal_fragment_begin:ed,clearcoat_normal_fragment_maps:nd,clearcoat_pars_fragment:id,iridescence_pars_fragment:rd,opaque_fragment:sd,packing:ad,premultiplied_alpha_fragment:od,project_vertex:ld,dithering_fragment:cd,dithering_pars_fragment:hd,roughnessmap_fragment:ud,roughnessmap_pars_fragment:dd,shadowmap_pars_fragment:fd,shadowmap_pars_vertex:pd,shadowmap_vertex:md,shadowmask_pars_fragment:gd,skinbase_vertex:_d,skinning_pars_vertex:vd,skinning_vertex:xd,skinnormal_vertex:Md,specularmap_fragment:Sd,specularmap_pars_fragment:yd,tonemapping_fragment:Ed,tonemapping_pars_fragment:Td,transmission_fragment:bd,transmission_pars_fragment:wd,uv_pars_fragment:Ad,uv_pars_vertex:Rd,uv_vertex:Cd,worldpos_vertex:Pd,background_vert:Ld,background_frag:Id,backgroundCube_vert:Dd,backgroundCube_frag:Ud,cube_vert:Nd,cube_frag:Fd,depth_vert:Od,depth_frag:Bd,distanceRGBA_vert:zd,distanceRGBA_frag:Hd,equirect_vert:kd,equirect_frag:Gd,linedashed_vert:Vd,linedashed_frag:Wd,meshbasic_vert:Xd,meshbasic_frag:qd,meshlambert_vert:Yd,meshlambert_frag:$d,meshmatcap_vert:Zd,meshmatcap_frag:Kd,meshnormal_vert:jd,meshnormal_frag:Jd,meshphong_vert:Qd,meshphong_frag:tf,meshphysical_vert:ef,meshphysical_frag:nf,meshtoon_vert:rf,meshtoon_frag:sf,points_vert:af,points_frag:of,shadow_vert:lf,shadow_frag:cf,sprite_vert:hf,sprite_frag:uf},rt={common:{diffuse:{value:new Lt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ut}},envmap:{envMap:{value:null},envMapRotation:{value:new Ut},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ut}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ut}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ut},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ut},normalScale:{value:new Rt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ut},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ut}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ut}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ut}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Lt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Lt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0},uvTransform:{value:new Ut}},sprite:{diffuse:{value:new Lt(16777215)},opacity:{value:1},center:{value:new Rt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}}},on={basic:{uniforms:Ce([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.fog]),vertexShader:Ft.meshbasic_vert,fragmentShader:Ft.meshbasic_frag},lambert:{uniforms:Ce([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new Lt(0)}}]),vertexShader:Ft.meshlambert_vert,fragmentShader:Ft.meshlambert_frag},phong:{uniforms:Ce([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new Lt(0)},specular:{value:new Lt(1118481)},shininess:{value:30}}]),vertexShader:Ft.meshphong_vert,fragmentShader:Ft.meshphong_frag},standard:{uniforms:Ce([rt.common,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.roughnessmap,rt.metalnessmap,rt.fog,rt.lights,{emissive:{value:new Lt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag},toon:{uniforms:Ce([rt.common,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.gradientmap,rt.fog,rt.lights,{emissive:{value:new Lt(0)}}]),vertexShader:Ft.meshtoon_vert,fragmentShader:Ft.meshtoon_frag},matcap:{uniforms:Ce([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,{matcap:{value:null}}]),vertexShader:Ft.meshmatcap_vert,fragmentShader:Ft.meshmatcap_frag},points:{uniforms:Ce([rt.points,rt.fog]),vertexShader:Ft.points_vert,fragmentShader:Ft.points_frag},dashed:{uniforms:Ce([rt.common,rt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ft.linedashed_vert,fragmentShader:Ft.linedashed_frag},depth:{uniforms:Ce([rt.common,rt.displacementmap]),vertexShader:Ft.depth_vert,fragmentShader:Ft.depth_frag},normal:{uniforms:Ce([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,{opacity:{value:1}}]),vertexShader:Ft.meshnormal_vert,fragmentShader:Ft.meshnormal_frag},sprite:{uniforms:Ce([rt.sprite,rt.fog]),vertexShader:Ft.sprite_vert,fragmentShader:Ft.sprite_frag},background:{uniforms:{uvTransform:{value:new Ut},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ft.background_vert,fragmentShader:Ft.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ut}},vertexShader:Ft.backgroundCube_vert,fragmentShader:Ft.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ft.cube_vert,fragmentShader:Ft.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ft.equirect_vert,fragmentShader:Ft.equirect_frag},distanceRGBA:{uniforms:Ce([rt.common,rt.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ft.distanceRGBA_vert,fragmentShader:Ft.distanceRGBA_frag},shadow:{uniforms:Ce([rt.lights,rt.fog,{color:{value:new Lt(0)},opacity:{value:1}}]),vertexShader:Ft.shadow_vert,fragmentShader:Ft.shadow_frag}};on.physical={uniforms:Ce([on.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ut},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ut},clearcoatNormalScale:{value:new Rt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ut},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ut},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ut},sheen:{value:0},sheenColor:{value:new Lt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ut},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ut},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ut},transmissionSamplerSize:{value:new Rt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ut},attenuationDistance:{value:0},attenuationColor:{value:new Lt(0)},specularColor:{value:new Lt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ut},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ut},anisotropyVector:{value:new Rt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ut}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag};const Er={r:0,b:0,g:0},Gn=new sn,df=new ce;function ff(r,t,e,n,i,s,o){const a=new Lt(0);let l=s===!0?0:1,c,h,u=null,f=0,p=null;function g(y){let S=y.isScene===!0?y.background:null;return S&&S.isTexture&&(S=(y.backgroundBlurriness>0?e:t).get(S)),S}function _(y){let S=!1;const v=g(y);v===null?d(a,l):v&&v.isColor&&(d(v,1),S=!0);const w=r.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,o):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(y,S){const v=g(S);v&&(v.isCubeTexture||v.mapping===Yr)?(h===void 0&&(h=new J(new le(1,1,1),new Fn({name:"BackgroundCubeMaterial",uniforms:Pi(on.backgroundCube.uniforms),vertexShader:on.backgroundCube.vertexShader,fragmentShader:on.backgroundCube.fragmentShader,side:Le,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,b,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Gn.copy(S.backgroundRotation),Gn.x*=-1,Gn.y*=-1,Gn.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Gn.y*=-1,Gn.z*=-1),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(df.makeRotationFromEuler(Gn)),h.material.toneMapped=Xt.getTransfer(v.colorSpace)!==Jt,(u!==v||f!==v.version||p!==r.toneMapping)&&(h.material.needsUpdate=!0,u=v,f=v.version,p=r.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new J(new Wt(2,2),new Fn({name:"BackgroundMaterial",uniforms:Pi(on.background.uniforms),vertexShader:on.background.vertexShader,fragmentShader:on.background.fragmentShader,side:Nn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=Xt.getTransfer(v.colorSpace)!==Jt,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||f!==v.version||p!==r.toneMapping)&&(c.material.needsUpdate=!0,u=v,f=v.version,p=r.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function d(y,S){y.getRGB(Er,ql(r)),n.buffers.color.setClear(Er.r,Er.g,Er.b,S,o)}return{getClearColor:function(){return a},setClearColor:function(y,S=1){a.set(y),l=S,d(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,d(a,l)},render:_,addToRenderList:m}}function pf(r,t){const e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=f(null);let s=i,o=!1;function a(M,C,L,O,H){let $=!1;const V=u(O,L,C);s!==V&&(s=V,c(s.object)),$=p(M,O,L,H),$&&g(M,O,L,H),H!==null&&t.update(H,r.ELEMENT_ARRAY_BUFFER),($||o)&&(o=!1,v(M,C,L,O),H!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function l(){return r.createVertexArray()}function c(M){return r.bindVertexArray(M)}function h(M){return r.deleteVertexArray(M)}function u(M,C,L){const O=L.wireframe===!0;let H=n[M.id];H===void 0&&(H={},n[M.id]=H);let $=H[C.id];$===void 0&&($={},H[C.id]=$);let V=$[O];return V===void 0&&(V=f(l()),$[O]=V),V}function f(M){const C=[],L=[],O=[];for(let H=0;H<e;H++)C[H]=0,L[H]=0,O[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:L,attributeDivisors:O,object:M,attributes:{},index:null}}function p(M,C,L,O){const H=s.attributes,$=C.attributes;let V=0;const Q=L.getAttributes();for(const X in Q)if(Q[X].location>=0){const dt=H[X];let yt=$[X];if(yt===void 0&&(X==="instanceMatrix"&&M.instanceMatrix&&(yt=M.instanceMatrix),X==="instanceColor"&&M.instanceColor&&(yt=M.instanceColor)),dt===void 0||dt.attribute!==yt||yt&&dt.data!==yt.data)return!0;V++}return s.attributesNum!==V||s.index!==O}function g(M,C,L,O){const H={},$=C.attributes;let V=0;const Q=L.getAttributes();for(const X in Q)if(Q[X].location>=0){let dt=$[X];dt===void 0&&(X==="instanceMatrix"&&M.instanceMatrix&&(dt=M.instanceMatrix),X==="instanceColor"&&M.instanceColor&&(dt=M.instanceColor));const yt={};yt.attribute=dt,dt&&dt.data&&(yt.data=dt.data),H[X]=yt,V++}s.attributes=H,s.attributesNum=V,s.index=O}function _(){const M=s.newAttributes;for(let C=0,L=M.length;C<L;C++)M[C]=0}function m(M){d(M,0)}function d(M,C){const L=s.newAttributes,O=s.enabledAttributes,H=s.attributeDivisors;L[M]=1,O[M]===0&&(r.enableVertexAttribArray(M),O[M]=1),H[M]!==C&&(r.vertexAttribDivisor(M,C),H[M]=C)}function y(){const M=s.newAttributes,C=s.enabledAttributes;for(let L=0,O=C.length;L<O;L++)C[L]!==M[L]&&(r.disableVertexAttribArray(L),C[L]=0)}function S(M,C,L,O,H,$,V){V===!0?r.vertexAttribIPointer(M,C,L,H,$):r.vertexAttribPointer(M,C,L,O,H,$)}function v(M,C,L,O){_();const H=O.attributes,$=L.getAttributes(),V=C.defaultAttributeValues;for(const Q in $){const X=$[Q];if(X.location>=0){let at=H[Q];if(at===void 0&&(Q==="instanceMatrix"&&M.instanceMatrix&&(at=M.instanceMatrix),Q==="instanceColor"&&M.instanceColor&&(at=M.instanceColor)),at!==void 0){const dt=at.normalized,yt=at.itemSize,Ot=t.get(at);if(Ot===void 0)continue;const ee=Ot.buffer,Y=Ot.type,nt=Ot.bytesPerElement,xt=Y===r.INT||Y===r.UNSIGNED_INT||at.gpuType===Oa;if(at.isInterleavedBufferAttribute){const ot=at.data,wt=ot.stride,Pt=at.offset;if(ot.isInstancedInterleavedBuffer){for(let Bt=0;Bt<X.locationSize;Bt++)d(X.location+Bt,ot.meshPerAttribute);M.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let Bt=0;Bt<X.locationSize;Bt++)m(X.location+Bt);r.bindBuffer(r.ARRAY_BUFFER,ee);for(let Bt=0;Bt<X.locationSize;Bt++)S(X.location+Bt,yt/X.locationSize,Y,dt,wt*nt,(Pt+yt/X.locationSize*Bt)*nt,xt)}else{if(at.isInstancedBufferAttribute){for(let ot=0;ot<X.locationSize;ot++)d(X.location+ot,at.meshPerAttribute);M.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let ot=0;ot<X.locationSize;ot++)m(X.location+ot);r.bindBuffer(r.ARRAY_BUFFER,ee);for(let ot=0;ot<X.locationSize;ot++)S(X.location+ot,yt/X.locationSize,Y,dt,yt*nt,yt/X.locationSize*ot*nt,xt)}}else if(V!==void 0){const dt=V[Q];if(dt!==void 0)switch(dt.length){case 2:r.vertexAttrib2fv(X.location,dt);break;case 3:r.vertexAttrib3fv(X.location,dt);break;case 4:r.vertexAttrib4fv(X.location,dt);break;default:r.vertexAttrib1fv(X.location,dt)}}}}y()}function w(){A();for(const M in n){const C=n[M];for(const L in C){const O=C[L];for(const H in O)h(O[H].object),delete O[H];delete C[L]}delete n[M]}}function b(M){if(n[M.id]===void 0)return;const C=n[M.id];for(const L in C){const O=C[L];for(const H in O)h(O[H].object),delete O[H];delete C[L]}delete n[M.id]}function R(M){for(const C in n){const L=n[C];if(L[M.id]===void 0)continue;const O=L[M.id];for(const H in O)h(O[H].object),delete O[H];delete L[M.id]}}function A(){x(),o=!0,s!==i&&(s=i,c(s.object))}function x(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:A,resetDefaultState:x,dispose:w,releaseStatesOfGeometry:b,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:m,disableUnusedAttributes:y}}function mf(r,t,e){let n;function i(c){n=c}function s(c,h){r.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,u){u!==0&&(r.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];e.update(p,n,1)}function l(c,h,u,f){if(u===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],h[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,h,0,f,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*f[_];e.update(g,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function gf(r,t,e,n){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");i=r.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(R){return!(R!==nn&&n.convert(R)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const A=R===Ji&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==Mn&&n.convert(R)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==_n&&!A)}function l(R){if(R==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),d=r.getParameter(r.MAX_VERTEX_ATTRIBS),y=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),S=r.getParameter(r.MAX_VARYING_VECTORS),v=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),w=g>0,b=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:y,maxVaryings:S,maxFragmentUniforms:v,vertexTextures:w,maxSamples:b}}function _f(r){const t=this;let e=null,n=0,i=!1,s=!1;const o=new qn,a=new Ut,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const p=u.length!==0||f||n!==0||i;return i=f,n=u.length,p},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,p){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,d=r.get(u);if(!i||g===null||g.length===0||s&&!m)s?h(null):c();else{const y=s?0:n,S=y*4;let v=d.clippingState||null;l.value=v,v=h(g,f,S,p);for(let w=0;w!==S;++w)v[w]=e[w];d.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,p,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const d=p+_*4,y=f.matrixWorldInverse;a.getNormalMatrix(y),(m===null||m.length<d)&&(m=new Float32Array(d));for(let S=0,v=p;S!==_;++S,v+=4)o.copy(u[S]).applyMatrix4(y,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function vf(r){let t=new WeakMap;function e(o,a){return a===na?o.mapping=wi:a===ia&&(o.mapping=Ai),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===na||a===ia)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Rh(l.height);return c.fromEquirectangularTexture(r,o),t.set(o,c),o.addEventListener("dispose",i),e(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class Kl extends Yl{constructor(t=-1,e=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Mi=4,Uo=[.125,.215,.35,.446,.526,.582],Kn=20,ys=new Kl,No=new Lt;let Es=null,Ts=0,bs=0,ws=!1;const Yn=(1+Math.sqrt(5))/2,pi=1/Yn,Fo=[new U(-Yn,pi,0),new U(Yn,pi,0),new U(-pi,0,Yn),new U(pi,0,Yn),new U(0,Yn,-pi),new U(0,Yn,pi),new U(-1,1,-1),new U(1,1,-1),new U(-1,1,1),new U(1,1,1)];class Oo{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Es=this._renderer.getRenderTarget(),Ts=this._renderer.getActiveCubeFace(),bs=this._renderer.getActiveMipmapLevel(),ws=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,i,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ho(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=zo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Es,Ts,bs),this._renderer.xr.enabled=ws,t.scissorTest=!1,Tr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===wi||t.mapping===Ai?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Es=this._renderer.getRenderTarget(),Ts=this._renderer.getActiveCubeFace(),bs=this._renderer.getActiveMipmapLevel(),ws=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Oe,minFilter:Oe,generateMipmaps:!1,type:Ji,format:nn,colorSpace:Li,depthBuffer:!1},i=Bo(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Bo(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=xf(s)),this._blurMaterial=Mf(s,t,e)}return i}_compileMaterial(t){const e=new J(this._lodPlanes[0],t);this._renderer.compile(e,ys)}_sceneToCubeUV(t,e,n,i){const a=new Ge(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(No),h.toneMapping=Dn,h.autoClear=!1;const p=new Re({name:"PMREM.Background",side:Le,depthWrite:!1,depthTest:!1}),g=new J(new le,p);let _=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,_=!0):(p.color.copy(No),_=!0);for(let d=0;d<6;d++){const y=d%3;y===0?(a.up.set(0,l[d],0),a.lookAt(c[d],0,0)):y===1?(a.up.set(0,0,l[d]),a.lookAt(0,c[d],0)):(a.up.set(0,l[d],0),a.lookAt(0,0,c[d]));const S=this._cubeSize;Tr(i,y*S,d>2?S:0,S,S),h.setRenderTarget(i),_&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===wi||t.mapping===Ai;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ho()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=zo());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new J(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const l=this._cubeSize;Tr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,ys)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Fo[(i-s-1)%Fo.length];this._blur(t,s-1,s,o,a)}e.autoClear=n}_blur(t,e,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",s),this._halfBlur(o,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new J(this._lodPlanes[i],c),f=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Kn-1),_=s/g,m=isFinite(s)?1+Math.floor(h*_):Kn;m>Kn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Kn}`);const d=[];let y=0;for(let R=0;R<Kn;++R){const A=R/_,x=Math.exp(-A*A/2);d.push(x),R===0?y+=x:R<m&&(y+=2*x)}for(let R=0;R<d.length;R++)d[R]=d[R]/y;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:S}=this;f.dTheta.value=g,f.mipInt.value=S-n;const v=this._sizeLods[i],w=3*v*(i>S-Mi?i-S+Mi:0),b=4*(this._cubeSize-v);Tr(e,w,b,3*v,2*v),l.setRenderTarget(e),l.render(u,ys)}}function xf(r){const t=[],e=[],n=[];let i=r;const s=r-Mi+1+Uo.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);e.push(a);let l=1/a;o>r-Mi?l=Uo[o-r+Mi-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,_=3,m=2,d=1,y=new Float32Array(_*g*p),S=new Float32Array(m*g*p),v=new Float32Array(d*g*p);for(let b=0;b<p;b++){const R=b%3*2/3-1,A=b>2?0:-1,x=[R,A,0,R+2/3,A,0,R+2/3,A+1,0,R,A,0,R+2/3,A+1,0,R,A+1,0];y.set(x,_*g*b),S.set(f,m*g*b);const M=[b,b,b,b,b,b];v.set(M,d*g*b)}const w=new Ie;w.setAttribute("position",new Pe(y,_)),w.setAttribute("uv",new Pe(S,m)),w.setAttribute("faceIndex",new Pe(v,d)),t.push(w),i>Mi&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Bo(r,t,e){const n=new Jn(r,t,e);return n.texture.mapping=Yr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Tr(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function Mf(r,t,e){const n=new Float32Array(Kn),i=new U(0,1,0);return new Fn({name:"SphericalGaussianBlur",defines:{n:Kn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:qa(),fragmentShader:`

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
		`,blending:In,depthTest:!1,depthWrite:!1})}function zo(){return new Fn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:qa(),fragmentShader:`

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
		`,blending:In,depthTest:!1,depthWrite:!1})}function Ho(){return new Fn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:qa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:In,depthTest:!1,depthWrite:!1})}function qa(){return`

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
	`}function Sf(r){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===na||l===ia,h=l===wi||l===Ai;if(c||h){let u=t.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new Oo(r)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const p=a.image;return c&&p&&p.height>0||h&&p&&i(p)?(e===null&&(e=new Oo(r)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function yf(r){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&qi("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Ef(r,t,e,n){const i={},s=new WeakMap;function o(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let m=0,d=_.length;m<d;m++)t.remove(_[m])}f.removeEventListener("dispose",o),delete i[f.id];const p=s.get(f);p&&(t.remove(p),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,e.memory.geometries++),f}function l(u){const f=u.attributes;for(const g in f)t.update(f[g],r.ARRAY_BUFFER);const p=u.morphAttributes;for(const g in p){const _=p[g];for(let m=0,d=_.length;m<d;m++)t.update(_[m],r.ARRAY_BUFFER)}}function c(u){const f=[],p=u.index,g=u.attributes.position;let _=0;if(p!==null){const y=p.array;_=p.version;for(let S=0,v=y.length;S<v;S+=3){const w=y[S+0],b=y[S+1],R=y[S+2];f.push(w,b,b,R,R,w)}}else if(g!==void 0){const y=g.array;_=g.version;for(let S=0,v=y.length/3-1;S<v;S+=3){const w=S+0,b=S+1,R=S+2;f.push(w,b,b,R,R,w)}}else return;const m=new(zl(f)?Xl:Wl)(f,1);m.version=_;const d=s.get(u);d&&t.remove(d),s.set(u,m)}function h(u){const f=s.get(u);if(f){const p=u.index;p!==null&&f.version<p.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Tf(r,t,e){let n;function i(f){n=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,p){r.drawElements(n,p,s,f*o),e.update(p,n,1)}function c(f,p,g){g!==0&&(r.drawElementsInstanced(n,p,s,f*o,g),e.update(p,n,g))}function h(f,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,s,f,0,g);let m=0;for(let d=0;d<g;d++)m+=p[d];e.update(m,n,1)}function u(f,p,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<f.length;d++)c(f[d]/o,p[d],_[d]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,s,f,0,_,0,g);let d=0;for(let y=0;y<g;y++)d+=p[y]*_[y];e.update(d,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function bf(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case r.TRIANGLES:e.triangles+=a*(s/3);break;case r.LINES:e.lines+=a*(s/2);break;case r.LINE_STRIP:e.lines+=a*(s-1);break;case r.LINE_LOOP:e.lines+=a*s;break;case r.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function wf(r,t,e){const n=new WeakMap,i=new te;function s(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(a);if(f===void 0||f.count!==u){let x=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",x)};f!==void 0&&f.texture.dispose();const p=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],d=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let S=0;p===!0&&(S=1),g===!0&&(S=2),_===!0&&(S=3);let v=a.attributes.position.count*S,w=1;v>t.maxTextureSize&&(w=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);const b=new Float32Array(v*w*4*u),R=new kl(b,v,w,u);R.type=_n,R.needsUpdate=!0;const A=S*4;for(let M=0;M<u;M++){const C=m[M],L=d[M],O=y[M],H=v*w*4*M;for(let $=0;$<C.count;$++){const V=$*A;p===!0&&(i.fromBufferAttribute(C,$),b[H+V+0]=i.x,b[H+V+1]=i.y,b[H+V+2]=i.z,b[H+V+3]=0),g===!0&&(i.fromBufferAttribute(L,$),b[H+V+4]=i.x,b[H+V+5]=i.y,b[H+V+6]=i.z,b[H+V+7]=0),_===!0&&(i.fromBufferAttribute(O,$),b[H+V+8]=i.x,b[H+V+9]=i.y,b[H+V+10]=i.z,b[H+V+11]=O.itemSize===4?i.w:1)}}f={count:u,texture:R,size:new Rt(v,w)},n.set(a,f),a.addEventListener("dispose",x)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,e);else{let p=0;for(let _=0;_<c.length;_++)p+=c[_];const g=a.morphTargetsRelative?1:1-p;l.getUniforms().setValue(r,"morphTargetBaseInfluence",g),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}return{update:s}}function Af(r,t,e,n){let i=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(i.get(u)!==c&&(t.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(e.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;i.get(f)!==c&&(f.update(),i.set(f,c))}return u}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}class jl extends we{constructor(t,e,n,i,s,o,a,l,c,h=Ei){if(h!==Ei&&h!==Ci)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ei&&(n=jn),n===void 0&&h===Ci&&(n=Ri),super(null,i,s,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:rn,this.minFilter=l!==void 0?l:rn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Jl=new we,ko=new jl(1,1),Ql=new kl,tc=new uh,ec=new $l,Go=[],Vo=[],Wo=new Float32Array(16),Xo=new Float32Array(9),qo=new Float32Array(4);function Di(r,t,e){const n=r[0];if(n<=0||n>0)return r;const i=t*e;let s=Go[i];if(s===void 0&&(s=new Float32Array(i),Go[i]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,r[o].toArray(s,a)}return s}function _e(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function ve(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function Zr(r,t){let e=Vo[t];e===void 0&&(e=new Int32Array(t),Vo[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function Rf(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function Cf(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(_e(e,t))return;r.uniform2fv(this.addr,t),ve(e,t)}}function Pf(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(_e(e,t))return;r.uniform3fv(this.addr,t),ve(e,t)}}function Lf(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(_e(e,t))return;r.uniform4fv(this.addr,t),ve(e,t)}}function If(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(_e(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),ve(e,t)}else{if(_e(e,n))return;qo.set(n),r.uniformMatrix2fv(this.addr,!1,qo),ve(e,n)}}function Df(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(_e(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),ve(e,t)}else{if(_e(e,n))return;Xo.set(n),r.uniformMatrix3fv(this.addr,!1,Xo),ve(e,n)}}function Uf(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(_e(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),ve(e,t)}else{if(_e(e,n))return;Wo.set(n),r.uniformMatrix4fv(this.addr,!1,Wo),ve(e,n)}}function Nf(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function Ff(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(_e(e,t))return;r.uniform2iv(this.addr,t),ve(e,t)}}function Of(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(_e(e,t))return;r.uniform3iv(this.addr,t),ve(e,t)}}function Bf(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(_e(e,t))return;r.uniform4iv(this.addr,t),ve(e,t)}}function zf(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function Hf(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(_e(e,t))return;r.uniform2uiv(this.addr,t),ve(e,t)}}function kf(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(_e(e,t))return;r.uniform3uiv(this.addr,t),ve(e,t)}}function Gf(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(_e(e,t))return;r.uniform4uiv(this.addr,t),ve(e,t)}}function Vf(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(ko.compareFunction=Bl,s=ko):s=Jl,e.setTexture2D(t||s,i)}function Wf(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||tc,i)}function Xf(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||ec,i)}function qf(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Ql,i)}function Yf(r){switch(r){case 5126:return Rf;case 35664:return Cf;case 35665:return Pf;case 35666:return Lf;case 35674:return If;case 35675:return Df;case 35676:return Uf;case 5124:case 35670:return Nf;case 35667:case 35671:return Ff;case 35668:case 35672:return Of;case 35669:case 35673:return Bf;case 5125:return zf;case 36294:return Hf;case 36295:return kf;case 36296:return Gf;case 35678:case 36198:case 36298:case 36306:case 35682:return Vf;case 35679:case 36299:case 36307:return Wf;case 35680:case 36300:case 36308:case 36293:return Xf;case 36289:case 36303:case 36311:case 36292:return qf}}function $f(r,t){r.uniform1fv(this.addr,t)}function Zf(r,t){const e=Di(t,this.size,2);r.uniform2fv(this.addr,e)}function Kf(r,t){const e=Di(t,this.size,3);r.uniform3fv(this.addr,e)}function jf(r,t){const e=Di(t,this.size,4);r.uniform4fv(this.addr,e)}function Jf(r,t){const e=Di(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function Qf(r,t){const e=Di(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function tp(r,t){const e=Di(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function ep(r,t){r.uniform1iv(this.addr,t)}function np(r,t){r.uniform2iv(this.addr,t)}function ip(r,t){r.uniform3iv(this.addr,t)}function rp(r,t){r.uniform4iv(this.addr,t)}function sp(r,t){r.uniform1uiv(this.addr,t)}function ap(r,t){r.uniform2uiv(this.addr,t)}function op(r,t){r.uniform3uiv(this.addr,t)}function lp(r,t){r.uniform4uiv(this.addr,t)}function cp(r,t,e){const n=this.cache,i=t.length,s=Zr(e,i);_e(n,s)||(r.uniform1iv(this.addr,s),ve(n,s));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||Jl,s[o])}function hp(r,t,e){const n=this.cache,i=t.length,s=Zr(e,i);_e(n,s)||(r.uniform1iv(this.addr,s),ve(n,s));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||tc,s[o])}function up(r,t,e){const n=this.cache,i=t.length,s=Zr(e,i);_e(n,s)||(r.uniform1iv(this.addr,s),ve(n,s));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||ec,s[o])}function dp(r,t,e){const n=this.cache,i=t.length,s=Zr(e,i);_e(n,s)||(r.uniform1iv(this.addr,s),ve(n,s));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||Ql,s[o])}function fp(r){switch(r){case 5126:return $f;case 35664:return Zf;case 35665:return Kf;case 35666:return jf;case 35674:return Jf;case 35675:return Qf;case 35676:return tp;case 5124:case 35670:return ep;case 35667:case 35671:return np;case 35668:case 35672:return ip;case 35669:case 35673:return rp;case 5125:return sp;case 36294:return ap;case 36295:return op;case 36296:return lp;case 35678:case 36198:case 36298:case 36306:case 35682:return cp;case 35679:case 36299:case 36307:return hp;case 35680:case 36300:case 36308:case 36293:return up;case 36289:case 36303:case 36311:case 36292:return dp}}class pp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Yf(e.type)}}class mp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=fp(e.type)}}class gp{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(t,e[a.id],n)}}}const As=/(\w+)(\])?(\[|\.)?/g;function Yo(r,t){r.seq.push(t),r.map[t.id]=t}function _p(r,t,e){const n=r.name,i=n.length;for(As.lastIndex=0;;){const s=As.exec(n),o=As.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Yo(e,c===void 0?new pp(a,r,t):new mp(a,r,t));break}else{let u=e.map[a];u===void 0&&(u=new gp(a),Yo(e,u)),e=u}}}class Hr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=t.getActiveUniform(e,i),o=t.getUniformLocation(e,s.name);_p(s,o,this)}}setValue(t,e,n,i){const s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,o=e.length;s!==o;++s){const a=e[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,s=t.length;i!==s;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function $o(r,t,e){const n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}const vp=37297;let xp=0;function Mp(r,t){const e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Zo=new Ut;function Sp(r){Xt._getMatrix(Zo,Xt.workingColorSpace,r);const t=`mat3( ${Zo.elements.map(e=>e.toFixed(4))} )`;switch(Xt.getTransfer(r)){case $r:return[t,"LinearTransferOETF"];case Jt:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function Ko(r,t,e){const n=r.getShaderParameter(t,r.COMPILE_STATUS),i=r.getShaderInfoLog(t).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+i+`

`+Mp(r.getShaderSource(t),o)}else return i}function yp(r,t){const e=Sp(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Ep(r,t){let e;switch(t){case Bc:e="Linear";break;case zc:e="Reinhard";break;case Hc:e="Cineon";break;case kc:e="ACESFilmic";break;case Vc:e="AgX";break;case Wc:e="Neutral";break;case Gc:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const br=new U;function Tp(){Xt.getLuminanceCoefficients(br);const r=br.x.toFixed(4),t=br.y.toFixed(4),e=br.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function bp(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Yi).join(`
`)}function wp(r){const t=[];for(const e in r){const n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Ap(r,t){const e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(t,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:r.getAttribLocation(t,o),locationSize:a}}return e}function Yi(r){return r!==""}function jo(r,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Jo(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Rp=/^[ \t]*#include +<([\w\d./]+)>/gm;function Da(r){return r.replace(Rp,Pp)}const Cp=new Map;function Pp(r,t){let e=Ft[t];if(e===void 0){const n=Cp.get(t);if(n!==void 0)e=Ft[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Da(e)}const Lp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qo(r){return r.replace(Lp,Ip)}function Ip(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function tl(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Dp(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===wl?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===_c?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===gn&&(t="SHADOWMAP_TYPE_VSM"),t}function Up(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case wi:case Ai:t="ENVMAP_TYPE_CUBE";break;case Yr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Np(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Ai:t="ENVMAP_MODE_REFRACTION";break}return t}function Fp(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case qr:t="ENVMAP_BLENDING_MULTIPLY";break;case Fc:t="ENVMAP_BLENDING_MIX";break;case Oc:t="ENVMAP_BLENDING_ADD";break}return t}function Op(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Bp(r,t,e,n){const i=r.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=Dp(e),c=Up(e),h=Np(e),u=Fp(e),f=Op(e),p=bp(e),g=wp(s),_=i.createProgram();let m,d,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Yi).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Yi).join(`
`),d.length>0&&(d+=`
`)):(m=[tl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Yi).join(`
`),d=[tl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Dn?"#define TONE_MAPPING":"",e.toneMapping!==Dn?Ft.tonemapping_pars_fragment:"",e.toneMapping!==Dn?Ep("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ft.colorspace_pars_fragment,yp("linearToOutputTexel",e.outputColorSpace),Tp(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Yi).join(`
`)),o=Da(o),o=jo(o,e),o=Jo(o,e),a=Da(a),a=jo(a,e),a=Jo(a,e),o=Qo(o),a=Qo(a),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",e.glslVersion===fo?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===fo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const S=y+m+o,v=y+d+a,w=$o(i,i.VERTEX_SHADER,S),b=$o(i,i.FRAGMENT_SHADER,v);i.attachShader(_,w),i.attachShader(_,b),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function R(C){if(r.debug.checkShaderErrors){const L=i.getProgramInfoLog(_).trim(),O=i.getShaderInfoLog(w).trim(),H=i.getShaderInfoLog(b).trim();let $=!0,V=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if($=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,w,b);else{const Q=Ko(i,w,"vertex"),X=Ko(i,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+L+`
`+Q+`
`+X)}else L!==""?console.warn("THREE.WebGLProgram: Program Info Log:",L):(O===""||H==="")&&(V=!1);V&&(C.diagnostics={runnable:$,programLog:L,vertexShader:{log:O,prefix:m},fragmentShader:{log:H,prefix:d}})}i.deleteShader(w),i.deleteShader(b),A=new Hr(i,_),x=Ap(i,_)}let A;this.getUniforms=function(){return A===void 0&&R(this),A};let x;this.getAttributes=function(){return x===void 0&&R(this),x};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(_,vp)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=xp++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=w,this.fragmentShader=b,this}let zp=0;class Hp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new kp(t),e.set(t,n)),n}}class kp{constructor(t){this.id=zp++,this.code=t,this.usedTimes=0}}function Gp(r,t,e,n,i,s,o){const a=new Gl,l=new Hp,c=new Set,h=[],u=i.logarithmicDepthBuffer,f=i.vertexTextures;let p=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(x){return c.add(x),x===0?"uv":`uv${x}`}function m(x,M,C,L,O){const H=L.fog,$=O.geometry,V=x.isMeshStandardMaterial?L.environment:null,Q=(x.isMeshStandardMaterial?e:t).get(x.envMap||V),X=Q&&Q.mapping===Yr?Q.image.height:null,at=g[x.type];x.precision!==null&&(p=i.getMaxPrecision(x.precision),p!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",p,"instead."));const dt=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,yt=dt!==void 0?dt.length:0;let Ot=0;$.morphAttributes.position!==void 0&&(Ot=1),$.morphAttributes.normal!==void 0&&(Ot=2),$.morphAttributes.color!==void 0&&(Ot=3);let ee,Y,nt,xt;if(at){const Kt=on[at];ee=Kt.vertexShader,Y=Kt.fragmentShader}else ee=x.vertexShader,Y=x.fragmentShader,l.update(x),nt=l.getVertexShaderID(x),xt=l.getFragmentShaderID(x);const ot=r.getRenderTarget(),wt=r.state.buffers.depth.getReversed(),Pt=O.isInstancedMesh===!0,Bt=O.isBatchedMesh===!0,he=!!x.map,Gt=!!x.matcap,fe=!!Q,B=!!x.aoMap,Ve=!!x.lightMap,zt=!!x.bumpMap,Ht=!!x.normalMap,Tt=!!x.displacementMap,re=!!x.emissiveMap,Et=!!x.metalnessMap,P=!!x.roughnessMap,E=x.anisotropy>0,z=x.clearcoat>0,Z=x.dispersion>0,j=x.iridescence>0,q=x.sheen>0,Mt=x.transmission>0,lt=E&&!!x.anisotropyMap,ft=z&&!!x.clearcoatMap,Vt=z&&!!x.clearcoatNormalMap,tt=z&&!!x.clearcoatRoughnessMap,pt=j&&!!x.iridescenceMap,bt=j&&!!x.iridescenceThicknessMap,At=q&&!!x.sheenColorMap,mt=q&&!!x.sheenRoughnessMap,kt=!!x.specularMap,Nt=!!x.specularColorMap,ne=!!x.specularIntensityMap,D=Mt&&!!x.transmissionMap,st=Mt&&!!x.thicknessMap,W=!!x.gradientMap,K=!!x.alphaMap,ut=x.alphaTest>0,ct=!!x.alphaHash,It=!!x.extensions;let ue=Dn;x.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(ue=r.toneMapping);const Ee={shaderID:at,shaderType:x.type,shaderName:x.name,vertexShader:ee,fragmentShader:Y,defines:x.defines,customVertexShaderID:nt,customFragmentShaderID:xt,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:p,batching:Bt,batchingColor:Bt&&O._colorsTexture!==null,instancing:Pt,instancingColor:Pt&&O.instanceColor!==null,instancingMorph:Pt&&O.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ot===null?r.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:Li,alphaToCoverage:!!x.alphaToCoverage,map:he,matcap:Gt,envMap:fe,envMapMode:fe&&Q.mapping,envMapCubeUVHeight:X,aoMap:B,lightMap:Ve,bumpMap:zt,normalMap:Ht,displacementMap:f&&Tt,emissiveMap:re,normalMapObjectSpace:Ht&&x.normalMapType===$c,normalMapTangentSpace:Ht&&x.normalMapType===Va,metalnessMap:Et,roughnessMap:P,anisotropy:E,anisotropyMap:lt,clearcoat:z,clearcoatMap:ft,clearcoatNormalMap:Vt,clearcoatRoughnessMap:tt,dispersion:Z,iridescence:j,iridescenceMap:pt,iridescenceThicknessMap:bt,sheen:q,sheenColorMap:At,sheenRoughnessMap:mt,specularMap:kt,specularColorMap:Nt,specularIntensityMap:ne,transmission:Mt,transmissionMap:D,thicknessMap:st,gradientMap:W,opaque:x.transparent===!1&&x.blending===yi&&x.alphaToCoverage===!1,alphaMap:K,alphaTest:ut,alphaHash:ct,combine:x.combine,mapUv:he&&_(x.map.channel),aoMapUv:B&&_(x.aoMap.channel),lightMapUv:Ve&&_(x.lightMap.channel),bumpMapUv:zt&&_(x.bumpMap.channel),normalMapUv:Ht&&_(x.normalMap.channel),displacementMapUv:Tt&&_(x.displacementMap.channel),emissiveMapUv:re&&_(x.emissiveMap.channel),metalnessMapUv:Et&&_(x.metalnessMap.channel),roughnessMapUv:P&&_(x.roughnessMap.channel),anisotropyMapUv:lt&&_(x.anisotropyMap.channel),clearcoatMapUv:ft&&_(x.clearcoatMap.channel),clearcoatNormalMapUv:Vt&&_(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:tt&&_(x.clearcoatRoughnessMap.channel),iridescenceMapUv:pt&&_(x.iridescenceMap.channel),iridescenceThicknessMapUv:bt&&_(x.iridescenceThicknessMap.channel),sheenColorMapUv:At&&_(x.sheenColorMap.channel),sheenRoughnessMapUv:mt&&_(x.sheenRoughnessMap.channel),specularMapUv:kt&&_(x.specularMap.channel),specularColorMapUv:Nt&&_(x.specularColorMap.channel),specularIntensityMapUv:ne&&_(x.specularIntensityMap.channel),transmissionMapUv:D&&_(x.transmissionMap.channel),thicknessMapUv:st&&_(x.thicknessMap.channel),alphaMapUv:K&&_(x.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(Ht||E),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!$.attributes.uv&&(he||K),fog:!!H,useFog:x.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:wt,skinning:O.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:yt,morphTextureStride:Ot,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:x.dithering,shadowMapEnabled:r.shadowMap.enabled&&C.length>0,shadowMapType:r.shadowMap.type,toneMapping:ue,decodeVideoTexture:he&&x.map.isVideoTexture===!0&&Xt.getTransfer(x.map.colorSpace)===Jt,decodeVideoTextureEmissive:re&&x.emissiveMap.isVideoTexture===!0&&Xt.getTransfer(x.emissiveMap.colorSpace)===Jt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Yt,flipSided:x.side===Le,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:It&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(It&&x.extensions.multiDraw===!0||Bt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ee.vertexUv1s=c.has(1),Ee.vertexUv2s=c.has(2),Ee.vertexUv3s=c.has(3),c.clear(),Ee}function d(x){const M=[];if(x.shaderID?M.push(x.shaderID):(M.push(x.customVertexShaderID),M.push(x.customFragmentShaderID)),x.defines!==void 0)for(const C in x.defines)M.push(C),M.push(x.defines[C]);return x.isRawShaderMaterial===!1&&(y(M,x),S(M,x),M.push(r.outputColorSpace)),M.push(x.customProgramCacheKey),M.join()}function y(x,M){x.push(M.precision),x.push(M.outputColorSpace),x.push(M.envMapMode),x.push(M.envMapCubeUVHeight),x.push(M.mapUv),x.push(M.alphaMapUv),x.push(M.lightMapUv),x.push(M.aoMapUv),x.push(M.bumpMapUv),x.push(M.normalMapUv),x.push(M.displacementMapUv),x.push(M.emissiveMapUv),x.push(M.metalnessMapUv),x.push(M.roughnessMapUv),x.push(M.anisotropyMapUv),x.push(M.clearcoatMapUv),x.push(M.clearcoatNormalMapUv),x.push(M.clearcoatRoughnessMapUv),x.push(M.iridescenceMapUv),x.push(M.iridescenceThicknessMapUv),x.push(M.sheenColorMapUv),x.push(M.sheenRoughnessMapUv),x.push(M.specularMapUv),x.push(M.specularColorMapUv),x.push(M.specularIntensityMapUv),x.push(M.transmissionMapUv),x.push(M.thicknessMapUv),x.push(M.combine),x.push(M.fogExp2),x.push(M.sizeAttenuation),x.push(M.morphTargetsCount),x.push(M.morphAttributeCount),x.push(M.numDirLights),x.push(M.numPointLights),x.push(M.numSpotLights),x.push(M.numSpotLightMaps),x.push(M.numHemiLights),x.push(M.numRectAreaLights),x.push(M.numDirLightShadows),x.push(M.numPointLightShadows),x.push(M.numSpotLightShadows),x.push(M.numSpotLightShadowsWithMaps),x.push(M.numLightProbes),x.push(M.shadowMapType),x.push(M.toneMapping),x.push(M.numClippingPlanes),x.push(M.numClipIntersection),x.push(M.depthPacking)}function S(x,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),x.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),x.push(a.mask)}function v(x){const M=g[x.type];let C;if(M){const L=on[M];C=Th.clone(L.uniforms)}else C=x.uniforms;return C}function w(x,M){let C;for(let L=0,O=h.length;L<O;L++){const H=h[L];if(H.cacheKey===M){C=H,++C.usedTimes;break}}return C===void 0&&(C=new Bp(r,M,x,s),h.push(C)),C}function b(x){if(--x.usedTimes===0){const M=h.indexOf(x);h[M]=h[h.length-1],h.pop(),x.destroy()}}function R(x){l.remove(x)}function A(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:v,acquireProgram:w,releaseProgram:b,releaseShaderCache:R,programs:h,dispose:A}}function Vp(){let r=new WeakMap;function t(o){return r.has(o)}function e(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,l){r.get(o)[a]=l}function s(){r=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:s}}function Wp(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function el(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function nl(){const r=[];let t=0;const e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function o(u,f,p,g,_,m){let d=r[t];return d===void 0?(d={id:u.id,object:u,geometry:f,material:p,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},r[t]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=p,d.groupOrder=g,d.renderOrder=u.renderOrder,d.z=_,d.group=m),t++,d}function a(u,f,p,g,_,m){const d=o(u,f,p,g,_,m);p.transmission>0?n.push(d):p.transparent===!0?i.push(d):e.push(d)}function l(u,f,p,g,_,m){const d=o(u,f,p,g,_,m);p.transmission>0?n.unshift(d):p.transparent===!0?i.unshift(d):e.unshift(d)}function c(u,f){e.length>1&&e.sort(u||Wp),n.length>1&&n.sort(f||el),i.length>1&&i.sort(f||el)}function h(){for(let u=t,f=r.length;u<f;u++){const p=r[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:h,sort:c}}function Xp(){let r=new WeakMap;function t(n,i){const s=r.get(n);let o;return s===void 0?(o=new nl,r.set(n,[o])):i>=s.length?(o=new nl,s.push(o)):o=s[i],o}function e(){r=new WeakMap}return{get:t,dispose:e}}function qp(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new U,color:new Lt};break;case"SpotLight":e={position:new U,direction:new U,color:new Lt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new U,color:new Lt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new U,skyColor:new Lt,groundColor:new Lt};break;case"RectAreaLight":e={color:new Lt,position:new U,halfWidth:new U,halfHeight:new U};break}return r[t.id]=e,e}}}function Yp(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Rt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Rt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Rt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let $p=0;function Zp(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function Kp(r){const t=new qp,e=Yp(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new U);const i=new U,s=new ce,o=new ce;function a(c){let h=0,u=0,f=0;for(let x=0;x<9;x++)n.probe[x].set(0,0,0);let p=0,g=0,_=0,m=0,d=0,y=0,S=0,v=0,w=0,b=0,R=0;c.sort(Zp);for(let x=0,M=c.length;x<M;x++){const C=c[x],L=C.color,O=C.intensity,H=C.distance,$=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=L.r*O,u+=L.g*O,f+=L.b*O;else if(C.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(C.sh.coefficients[V],O);R++}else if(C.isDirectionalLight){const V=t.get(C);if(V.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const Q=C.shadow,X=e.get(C);X.shadowIntensity=Q.intensity,X.shadowBias=Q.bias,X.shadowNormalBias=Q.normalBias,X.shadowRadius=Q.radius,X.shadowMapSize=Q.mapSize,n.directionalShadow[p]=X,n.directionalShadowMap[p]=$,n.directionalShadowMatrix[p]=C.shadow.matrix,y++}n.directional[p]=V,p++}else if(C.isSpotLight){const V=t.get(C);V.position.setFromMatrixPosition(C.matrixWorld),V.color.copy(L).multiplyScalar(O),V.distance=H,V.coneCos=Math.cos(C.angle),V.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),V.decay=C.decay,n.spot[_]=V;const Q=C.shadow;if(C.map&&(n.spotLightMap[w]=C.map,w++,Q.updateMatrices(C),C.castShadow&&b++),n.spotLightMatrix[_]=Q.matrix,C.castShadow){const X=e.get(C);X.shadowIntensity=Q.intensity,X.shadowBias=Q.bias,X.shadowNormalBias=Q.normalBias,X.shadowRadius=Q.radius,X.shadowMapSize=Q.mapSize,n.spotShadow[_]=X,n.spotShadowMap[_]=$,v++}_++}else if(C.isRectAreaLight){const V=t.get(C);V.color.copy(L).multiplyScalar(O),V.halfWidth.set(C.width*.5,0,0),V.halfHeight.set(0,C.height*.5,0),n.rectArea[m]=V,m++}else if(C.isPointLight){const V=t.get(C);if(V.color.copy(C.color).multiplyScalar(C.intensity),V.distance=C.distance,V.decay=C.decay,C.castShadow){const Q=C.shadow,X=e.get(C);X.shadowIntensity=Q.intensity,X.shadowBias=Q.bias,X.shadowNormalBias=Q.normalBias,X.shadowRadius=Q.radius,X.shadowMapSize=Q.mapSize,X.shadowCameraNear=Q.camera.near,X.shadowCameraFar=Q.camera.far,n.pointShadow[g]=X,n.pointShadowMap[g]=$,n.pointShadowMatrix[g]=C.shadow.matrix,S++}n.point[g]=V,g++}else if(C.isHemisphereLight){const V=t.get(C);V.skyColor.copy(C.color).multiplyScalar(O),V.groundColor.copy(C.groundColor).multiplyScalar(O),n.hemi[d]=V,d++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=rt.LTC_FLOAT_1,n.rectAreaLTC2=rt.LTC_FLOAT_2):(n.rectAreaLTC1=rt.LTC_HALF_1,n.rectAreaLTC2=rt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const A=n.hash;(A.directionalLength!==p||A.pointLength!==g||A.spotLength!==_||A.rectAreaLength!==m||A.hemiLength!==d||A.numDirectionalShadows!==y||A.numPointShadows!==S||A.numSpotShadows!==v||A.numSpotMaps!==w||A.numLightProbes!==R)&&(n.directional.length=p,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=d,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=v+w-b,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=R,A.directionalLength=p,A.pointLength=g,A.spotLength=_,A.rectAreaLength=m,A.hemiLength=d,A.numDirectionalShadows=y,A.numPointShadows=S,A.numSpotShadows=v,A.numSpotMaps=w,A.numLightProbes=R,n.version=$p++)}function l(c,h){let u=0,f=0,p=0,g=0,_=0;const m=h.matrixWorldInverse;for(let d=0,y=c.length;d<y;d++){const S=c[d];if(S.isDirectionalLight){const v=n.directional[u];v.direction.setFromMatrixPosition(S.matrixWorld),i.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),u++}else if(S.isSpotLight){const v=n.spot[p];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(S.matrixWorld),i.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),p++}else if(S.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),o.identity(),s.copy(S.matrixWorld),s.premultiply(m),o.extractRotation(s),v.halfWidth.set(S.width*.5,0,0),v.halfHeight.set(0,S.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(S.isPointLight){const v=n.point[f];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),f++}else if(S.isHemisphereLight){const v=n.hemi[_];v.direction.setFromMatrixPosition(S.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:n}}function il(r){const t=new Kp(r),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function s(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function jp(r){let t=new WeakMap;function e(i,s=0){const o=t.get(i);let a;return o===void 0?(a=new il(r),t.set(i,[a])):s>=o.length?(a=new il(r),o.push(a)):a=o[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class Jp extends Qn{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=qc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Qp extends Qn{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const tm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,em=`uniform sampler2D shadow_pass;
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
}`;function nm(r,t,e){let n=new Xa;const i=new Rt,s=new Rt,o=new te,a=new Jp({depthPacking:Yc}),l=new Qp,c={},h=e.maxTextureSize,u={[Nn]:Le,[Le]:Nn,[Yt]:Yt},f=new Fn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Rt},radius:{value:4}},vertexShader:tm,fragmentShader:em}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new Ie;g.setAttribute("position",new Pe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new J(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=wl;let d=this.type;this.render=function(b,R,A){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;const x=r.getRenderTarget(),M=r.getActiveCubeFace(),C=r.getActiveMipmapLevel(),L=r.state;L.setBlending(In),L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const O=d!==gn&&this.type===gn,H=d===gn&&this.type!==gn;for(let $=0,V=b.length;$<V;$++){const Q=b[$],X=Q.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;i.copy(X.mapSize);const at=X.getFrameExtents();if(i.multiply(at),s.copy(X.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/at.x),i.x=s.x*at.x,X.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/at.y),i.y=s.y*at.y,X.mapSize.y=s.y)),X.map===null||O===!0||H===!0){const yt=this.type!==gn?{minFilter:rn,magFilter:rn}:{};X.map!==null&&X.map.dispose(),X.map=new Jn(i.x,i.y,yt),X.map.texture.name=Q.name+".shadowMap",X.camera.updateProjectionMatrix()}r.setRenderTarget(X.map),r.clear();const dt=X.getViewportCount();for(let yt=0;yt<dt;yt++){const Ot=X.getViewport(yt);o.set(s.x*Ot.x,s.y*Ot.y,s.x*Ot.z,s.y*Ot.w),L.viewport(o),X.updateMatrices(Q,yt),n=X.getFrustum(),v(R,A,X.camera,Q,this.type)}X.isPointLightShadow!==!0&&this.type===gn&&y(X,A),X.needsUpdate=!1}d=this.type,m.needsUpdate=!1,r.setRenderTarget(x,M,C)};function y(b,R){const A=t.update(_);f.defines.VSM_SAMPLES!==b.blurSamples&&(f.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Jn(i.x,i.y)),f.uniforms.shadow_pass.value=b.map.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,r.setRenderTarget(b.mapPass),r.clear(),r.renderBufferDirect(R,null,A,f,_,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value=b.mapSize,p.uniforms.radius.value=b.radius,r.setRenderTarget(b.map),r.clear(),r.renderBufferDirect(R,null,A,p,_,null)}function S(b,R,A,x){let M=null;const C=A.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(C!==void 0)M=C;else if(M=A.isPointLight===!0?l:a,r.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const L=M.uuid,O=R.uuid;let H=c[L];H===void 0&&(H={},c[L]=H);let $=H[O];$===void 0&&($=M.clone(),H[O]=$,R.addEventListener("dispose",w)),M=$}if(M.visible=R.visible,M.wireframe=R.wireframe,x===gn?M.side=R.shadowSide!==null?R.shadowSide:R.side:M.side=R.shadowSide!==null?R.shadowSide:u[R.side],M.alphaMap=R.alphaMap,M.alphaTest=R.alphaTest,M.map=R.map,M.clipShadows=R.clipShadows,M.clippingPlanes=R.clippingPlanes,M.clipIntersection=R.clipIntersection,M.displacementMap=R.displacementMap,M.displacementScale=R.displacementScale,M.displacementBias=R.displacementBias,M.wireframeLinewidth=R.wireframeLinewidth,M.linewidth=R.linewidth,A.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const L=r.properties.get(M);L.light=A}return M}function v(b,R,A,x,M){if(b.visible===!1)return;if(b.layers.test(R.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&M===gn)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,b.matrixWorld);const O=t.update(b),H=b.material;if(Array.isArray(H)){const $=O.groups;for(let V=0,Q=$.length;V<Q;V++){const X=$[V],at=H[X.materialIndex];if(at&&at.visible){const dt=S(b,at,x,M);b.onBeforeShadow(r,b,R,A,O,dt,X),r.renderBufferDirect(A,null,O,dt,b,X),b.onAfterShadow(r,b,R,A,O,dt,X)}}}else if(H.visible){const $=S(b,H,x,M);b.onBeforeShadow(r,b,R,A,O,$,null),r.renderBufferDirect(A,null,O,$,b,null),b.onAfterShadow(r,b,R,A,O,$,null)}}const L=b.children;for(let O=0,H=L.length;O<H;O++)v(L[O],R,A,x,M)}function w(b){b.target.removeEventListener("dispose",w);for(const A in c){const x=c[A],M=b.target.uuid;M in x&&(x[M].dispose(),delete x[M])}}}const im={[Zs]:Ks,[js]:ta,[Js]:ea,[bi]:Qs,[Ks]:Zs,[ta]:js,[ea]:Js,[Qs]:bi};function rm(r,t){function e(){let D=!1;const st=new te;let W=null;const K=new te(0,0,0,0);return{setMask:function(ut){W!==ut&&!D&&(r.colorMask(ut,ut,ut,ut),W=ut)},setLocked:function(ut){D=ut},setClear:function(ut,ct,It,ue,Ee){Ee===!0&&(ut*=ue,ct*=ue,It*=ue),st.set(ut,ct,It,ue),K.equals(st)===!1&&(r.clearColor(ut,ct,It,ue),K.copy(st))},reset:function(){D=!1,W=null,K.set(-1,0,0,0)}}}function n(){let D=!1,st=!1,W=null,K=null,ut=null;return{setReversed:function(ct){if(st!==ct){const It=t.get("EXT_clip_control");st?It.clipControlEXT(It.LOWER_LEFT_EXT,It.ZERO_TO_ONE_EXT):It.clipControlEXT(It.LOWER_LEFT_EXT,It.NEGATIVE_ONE_TO_ONE_EXT);const ue=ut;ut=null,this.setClear(ue)}st=ct},getReversed:function(){return st},setTest:function(ct){ct?ot(r.DEPTH_TEST):wt(r.DEPTH_TEST)},setMask:function(ct){W!==ct&&!D&&(r.depthMask(ct),W=ct)},setFunc:function(ct){if(st&&(ct=im[ct]),K!==ct){switch(ct){case Zs:r.depthFunc(r.NEVER);break;case Ks:r.depthFunc(r.ALWAYS);break;case js:r.depthFunc(r.LESS);break;case bi:r.depthFunc(r.LEQUAL);break;case Js:r.depthFunc(r.EQUAL);break;case Qs:r.depthFunc(r.GEQUAL);break;case ta:r.depthFunc(r.GREATER);break;case ea:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}K=ct}},setLocked:function(ct){D=ct},setClear:function(ct){ut!==ct&&(st&&(ct=1-ct),r.clearDepth(ct),ut=ct)},reset:function(){D=!1,W=null,K=null,ut=null,st=!1}}}function i(){let D=!1,st=null,W=null,K=null,ut=null,ct=null,It=null,ue=null,Ee=null;return{setTest:function(Kt){D||(Kt?ot(r.STENCIL_TEST):wt(r.STENCIL_TEST))},setMask:function(Kt){st!==Kt&&!D&&(r.stencilMask(Kt),st=Kt)},setFunc:function(Kt,$e,cn){(W!==Kt||K!==$e||ut!==cn)&&(r.stencilFunc(Kt,$e,cn),W=Kt,K=$e,ut=cn)},setOp:function(Kt,$e,cn){(ct!==Kt||It!==$e||ue!==cn)&&(r.stencilOp(Kt,$e,cn),ct=Kt,It=$e,ue=cn)},setLocked:function(Kt){D=Kt},setClear:function(Kt){Ee!==Kt&&(r.clearStencil(Kt),Ee=Kt)},reset:function(){D=!1,st=null,W=null,K=null,ut=null,ct=null,It=null,ue=null,Ee=null}}}const s=new e,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let h={},u={},f=new WeakMap,p=[],g=null,_=!1,m=null,d=null,y=null,S=null,v=null,w=null,b=null,R=new Lt(0,0,0),A=0,x=!1,M=null,C=null,L=null,O=null,H=null;const $=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,Q=0;const X=r.getParameter(r.VERSION);X.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(X)[1]),V=Q>=1):X.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),V=Q>=2);let at=null,dt={};const yt=r.getParameter(r.SCISSOR_BOX),Ot=r.getParameter(r.VIEWPORT),ee=new te().fromArray(yt),Y=new te().fromArray(Ot);function nt(D,st,W,K){const ut=new Uint8Array(4),ct=r.createTexture();r.bindTexture(D,ct),r.texParameteri(D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(D,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let It=0;It<W;It++)D===r.TEXTURE_3D||D===r.TEXTURE_2D_ARRAY?r.texImage3D(st,0,r.RGBA,1,1,K,0,r.RGBA,r.UNSIGNED_BYTE,ut):r.texImage2D(st+It,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,ut);return ct}const xt={};xt[r.TEXTURE_2D]=nt(r.TEXTURE_2D,r.TEXTURE_2D,1),xt[r.TEXTURE_CUBE_MAP]=nt(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),xt[r.TEXTURE_2D_ARRAY]=nt(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),xt[r.TEXTURE_3D]=nt(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ot(r.DEPTH_TEST),o.setFunc(bi),zt(!1),Ht(oo),ot(r.CULL_FACE),B(In);function ot(D){h[D]!==!0&&(r.enable(D),h[D]=!0)}function wt(D){h[D]!==!1&&(r.disable(D),h[D]=!1)}function Pt(D,st){return u[D]!==st?(r.bindFramebuffer(D,st),u[D]=st,D===r.DRAW_FRAMEBUFFER&&(u[r.FRAMEBUFFER]=st),D===r.FRAMEBUFFER&&(u[r.DRAW_FRAMEBUFFER]=st),!0):!1}function Bt(D,st){let W=p,K=!1;if(D){W=f.get(st),W===void 0&&(W=[],f.set(st,W));const ut=D.textures;if(W.length!==ut.length||W[0]!==r.COLOR_ATTACHMENT0){for(let ct=0,It=ut.length;ct<It;ct++)W[ct]=r.COLOR_ATTACHMENT0+ct;W.length=ut.length,K=!0}}else W[0]!==r.BACK&&(W[0]=r.BACK,K=!0);K&&r.drawBuffers(W)}function he(D){return g!==D?(r.useProgram(D),g=D,!0):!1}const Gt={[Zn]:r.FUNC_ADD,[xc]:r.FUNC_SUBTRACT,[Mc]:r.FUNC_REVERSE_SUBTRACT};Gt[Sc]=r.MIN,Gt[yc]=r.MAX;const fe={[Ec]:r.ZERO,[Tc]:r.ONE,[bc]:r.SRC_COLOR,[Ys]:r.SRC_ALPHA,[Lc]:r.SRC_ALPHA_SATURATE,[Cc]:r.DST_COLOR,[Ac]:r.DST_ALPHA,[wc]:r.ONE_MINUS_SRC_COLOR,[$s]:r.ONE_MINUS_SRC_ALPHA,[Pc]:r.ONE_MINUS_DST_COLOR,[Rc]:r.ONE_MINUS_DST_ALPHA,[Ic]:r.CONSTANT_COLOR,[Dc]:r.ONE_MINUS_CONSTANT_COLOR,[Uc]:r.CONSTANT_ALPHA,[Nc]:r.ONE_MINUS_CONSTANT_ALPHA};function B(D,st,W,K,ut,ct,It,ue,Ee,Kt){if(D===In){_===!0&&(wt(r.BLEND),_=!1);return}if(_===!1&&(ot(r.BLEND),_=!0),D!==vc){if(D!==m||Kt!==x){if((d!==Zn||v!==Zn)&&(r.blendEquation(r.FUNC_ADD),d=Zn,v=Zn),Kt)switch(D){case yi:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case lo:r.blendFunc(r.ONE,r.ONE);break;case co:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case ho:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case yi:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case lo:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case co:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case ho:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}y=null,S=null,w=null,b=null,R.set(0,0,0),A=0,m=D,x=Kt}return}ut=ut||st,ct=ct||W,It=It||K,(st!==d||ut!==v)&&(r.blendEquationSeparate(Gt[st],Gt[ut]),d=st,v=ut),(W!==y||K!==S||ct!==w||It!==b)&&(r.blendFuncSeparate(fe[W],fe[K],fe[ct],fe[It]),y=W,S=K,w=ct,b=It),(ue.equals(R)===!1||Ee!==A)&&(r.blendColor(ue.r,ue.g,ue.b,Ee),R.copy(ue),A=Ee),m=D,x=!1}function Ve(D,st){D.side===Yt?wt(r.CULL_FACE):ot(r.CULL_FACE);let W=D.side===Le;st&&(W=!W),zt(W),D.blending===yi&&D.transparent===!1?B(In):B(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),s.setMask(D.colorWrite);const K=D.stencilWrite;a.setTest(K),K&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),re(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ot(r.SAMPLE_ALPHA_TO_COVERAGE):wt(r.SAMPLE_ALPHA_TO_COVERAGE)}function zt(D){M!==D&&(D?r.frontFace(r.CW):r.frontFace(r.CCW),M=D)}function Ht(D){D!==mc?(ot(r.CULL_FACE),D!==C&&(D===oo?r.cullFace(r.BACK):D===gc?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):wt(r.CULL_FACE),C=D}function Tt(D){D!==L&&(V&&r.lineWidth(D),L=D)}function re(D,st,W){D?(ot(r.POLYGON_OFFSET_FILL),(O!==st||H!==W)&&(r.polygonOffset(st,W),O=st,H=W)):wt(r.POLYGON_OFFSET_FILL)}function Et(D){D?ot(r.SCISSOR_TEST):wt(r.SCISSOR_TEST)}function P(D){D===void 0&&(D=r.TEXTURE0+$-1),at!==D&&(r.activeTexture(D),at=D)}function E(D,st,W){W===void 0&&(at===null?W=r.TEXTURE0+$-1:W=at);let K=dt[W];K===void 0&&(K={type:void 0,texture:void 0},dt[W]=K),(K.type!==D||K.texture!==st)&&(at!==W&&(r.activeTexture(W),at=W),r.bindTexture(D,st||xt[D]),K.type=D,K.texture=st)}function z(){const D=dt[at];D!==void 0&&D.type!==void 0&&(r.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function Z(){try{r.compressedTexImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function j(){try{r.compressedTexImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function q(){try{r.texSubImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Mt(){try{r.texSubImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function lt(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ft(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Vt(){try{r.texStorage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function tt(){try{r.texStorage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function pt(){try{r.texImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function bt(){try{r.texImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function At(D){ee.equals(D)===!1&&(r.scissor(D.x,D.y,D.z,D.w),ee.copy(D))}function mt(D){Y.equals(D)===!1&&(r.viewport(D.x,D.y,D.z,D.w),Y.copy(D))}function kt(D,st){let W=c.get(st);W===void 0&&(W=new WeakMap,c.set(st,W));let K=W.get(D);K===void 0&&(K=r.getUniformBlockIndex(st,D.name),W.set(D,K))}function Nt(D,st){const K=c.get(st).get(D);l.get(st)!==K&&(r.uniformBlockBinding(st,K,D.__bindingPointIndex),l.set(st,K))}function ne(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),h={},at=null,dt={},u={},f=new WeakMap,p=[],g=null,_=!1,m=null,d=null,y=null,S=null,v=null,w=null,b=null,R=new Lt(0,0,0),A=0,x=!1,M=null,C=null,L=null,O=null,H=null,ee.set(0,0,r.canvas.width,r.canvas.height),Y.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ot,disable:wt,bindFramebuffer:Pt,drawBuffers:Bt,useProgram:he,setBlending:B,setMaterial:Ve,setFlipSided:zt,setCullFace:Ht,setLineWidth:Tt,setPolygonOffset:re,setScissorTest:Et,activeTexture:P,bindTexture:E,unbindTexture:z,compressedTexImage2D:Z,compressedTexImage3D:j,texImage2D:pt,texImage3D:bt,updateUBOMapping:kt,uniformBlockBinding:Nt,texStorage2D:Vt,texStorage3D:tt,texSubImage2D:q,texSubImage3D:Mt,compressedTexSubImage2D:lt,compressedTexSubImage3D:ft,scissor:At,viewport:mt,reset:ne}}function rl(r,t,e,n){const i=sm(n);switch(e){case Ll:return r*t;case Dl:return r*t;case Ul:return r*t*2;case Nl:return r*t/i.components*i.byteLength;case Ha:return r*t/i.components*i.byteLength;case Fl:return r*t*2/i.components*i.byteLength;case ka:return r*t*2/i.components*i.byteLength;case Il:return r*t*3/i.components*i.byteLength;case nn:return r*t*4/i.components*i.byteLength;case Ga:return r*t*4/i.components*i.byteLength;case Nr:case Fr:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Or:case Br:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case aa:case la:return Math.max(r,16)*Math.max(t,8)/4;case sa:case oa:return Math.max(r,8)*Math.max(t,8)/2;case ca:case ha:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case ua:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case da:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case fa:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case pa:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case ma:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case ga:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case _a:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case va:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case xa:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case Ma:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case Sa:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case ya:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case Ea:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case Ta:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case ba:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case zr:case wa:case Aa:return Math.ceil(r/4)*Math.ceil(t/4)*16;case Ol:case Ra:return Math.ceil(r/4)*Math.ceil(t/4)*8;case Ca:case Pa:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function sm(r){switch(r){case Mn:case Rl:return{byteLength:1,components:1};case Ki:case Cl:case Ji:return{byteLength:2,components:1};case Ba:case za:return{byteLength:2,components:4};case jn:case Oa:case _n:return{byteLength:4,components:1};case Pl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}function am(r,t,e,n,i,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Rt,h=new WeakMap;let u;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(P,E){return p?new OffscreenCanvas(P,E):ji("canvas")}function _(P,E,z){let Z=1;const j=Et(P);if((j.width>z||j.height>z)&&(Z=z/Math.max(j.width,j.height)),Z<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const q=Math.floor(Z*j.width),Mt=Math.floor(Z*j.height);u===void 0&&(u=g(q,Mt));const lt=E?g(q,Mt):u;return lt.width=q,lt.height=Mt,lt.getContext("2d").drawImage(P,0,0,q,Mt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+q+"x"+Mt+")."),lt}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),P;return P}function m(P){return P.generateMipmaps}function d(P){r.generateMipmap(P)}function y(P){return P.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?r.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function S(P,E,z,Z,j=!1){if(P!==null){if(r[P]!==void 0)return r[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let q=E;if(E===r.RED&&(z===r.FLOAT&&(q=r.R32F),z===r.HALF_FLOAT&&(q=r.R16F),z===r.UNSIGNED_BYTE&&(q=r.R8)),E===r.RED_INTEGER&&(z===r.UNSIGNED_BYTE&&(q=r.R8UI),z===r.UNSIGNED_SHORT&&(q=r.R16UI),z===r.UNSIGNED_INT&&(q=r.R32UI),z===r.BYTE&&(q=r.R8I),z===r.SHORT&&(q=r.R16I),z===r.INT&&(q=r.R32I)),E===r.RG&&(z===r.FLOAT&&(q=r.RG32F),z===r.HALF_FLOAT&&(q=r.RG16F),z===r.UNSIGNED_BYTE&&(q=r.RG8)),E===r.RG_INTEGER&&(z===r.UNSIGNED_BYTE&&(q=r.RG8UI),z===r.UNSIGNED_SHORT&&(q=r.RG16UI),z===r.UNSIGNED_INT&&(q=r.RG32UI),z===r.BYTE&&(q=r.RG8I),z===r.SHORT&&(q=r.RG16I),z===r.INT&&(q=r.RG32I)),E===r.RGB_INTEGER&&(z===r.UNSIGNED_BYTE&&(q=r.RGB8UI),z===r.UNSIGNED_SHORT&&(q=r.RGB16UI),z===r.UNSIGNED_INT&&(q=r.RGB32UI),z===r.BYTE&&(q=r.RGB8I),z===r.SHORT&&(q=r.RGB16I),z===r.INT&&(q=r.RGB32I)),E===r.RGBA_INTEGER&&(z===r.UNSIGNED_BYTE&&(q=r.RGBA8UI),z===r.UNSIGNED_SHORT&&(q=r.RGBA16UI),z===r.UNSIGNED_INT&&(q=r.RGBA32UI),z===r.BYTE&&(q=r.RGBA8I),z===r.SHORT&&(q=r.RGBA16I),z===r.INT&&(q=r.RGBA32I)),E===r.RGB&&z===r.UNSIGNED_INT_5_9_9_9_REV&&(q=r.RGB9_E5),E===r.RGBA){const Mt=j?$r:Xt.getTransfer(Z);z===r.FLOAT&&(q=r.RGBA32F),z===r.HALF_FLOAT&&(q=r.RGBA16F),z===r.UNSIGNED_BYTE&&(q=Mt===Jt?r.SRGB8_ALPHA8:r.RGBA8),z===r.UNSIGNED_SHORT_4_4_4_4&&(q=r.RGBA4),z===r.UNSIGNED_SHORT_5_5_5_1&&(q=r.RGB5_A1)}return(q===r.R16F||q===r.R32F||q===r.RG16F||q===r.RG32F||q===r.RGBA16F||q===r.RGBA32F)&&t.get("EXT_color_buffer_float"),q}function v(P,E){let z;return P?E===null||E===jn||E===Ri?z=r.DEPTH24_STENCIL8:E===_n?z=r.DEPTH32F_STENCIL8:E===Ki&&(z=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===jn||E===Ri?z=r.DEPTH_COMPONENT24:E===_n?z=r.DEPTH_COMPONENT32F:E===Ki&&(z=r.DEPTH_COMPONENT16),z}function w(P,E){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==rn&&P.minFilter!==Oe?Math.log2(Math.max(E.width,E.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?E.mipmaps.length:1}function b(P){const E=P.target;E.removeEventListener("dispose",b),A(E),E.isVideoTexture&&h.delete(E)}function R(P){const E=P.target;E.removeEventListener("dispose",R),M(E)}function A(P){const E=n.get(P);if(E.__webglInit===void 0)return;const z=P.source,Z=f.get(z);if(Z){const j=Z[E.__cacheKey];j.usedTimes--,j.usedTimes===0&&x(P),Object.keys(Z).length===0&&f.delete(z)}n.remove(P)}function x(P){const E=n.get(P);r.deleteTexture(E.__webglTexture);const z=P.source,Z=f.get(z);delete Z[E.__cacheKey],o.memory.textures--}function M(P){const E=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(E.__webglFramebuffer[Z]))for(let j=0;j<E.__webglFramebuffer[Z].length;j++)r.deleteFramebuffer(E.__webglFramebuffer[Z][j]);else r.deleteFramebuffer(E.__webglFramebuffer[Z]);E.__webglDepthbuffer&&r.deleteRenderbuffer(E.__webglDepthbuffer[Z])}else{if(Array.isArray(E.__webglFramebuffer))for(let Z=0;Z<E.__webglFramebuffer.length;Z++)r.deleteFramebuffer(E.__webglFramebuffer[Z]);else r.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&r.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&r.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let Z=0;Z<E.__webglColorRenderbuffer.length;Z++)E.__webglColorRenderbuffer[Z]&&r.deleteRenderbuffer(E.__webglColorRenderbuffer[Z]);E.__webglDepthRenderbuffer&&r.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const z=P.textures;for(let Z=0,j=z.length;Z<j;Z++){const q=n.get(z[Z]);q.__webglTexture&&(r.deleteTexture(q.__webglTexture),o.memory.textures--),n.remove(z[Z])}n.remove(P)}let C=0;function L(){C=0}function O(){const P=C;return P>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+i.maxTextures),C+=1,P}function H(P){const E=[];return E.push(P.wrapS),E.push(P.wrapT),E.push(P.wrapR||0),E.push(P.magFilter),E.push(P.minFilter),E.push(P.anisotropy),E.push(P.internalFormat),E.push(P.format),E.push(P.type),E.push(P.generateMipmaps),E.push(P.premultiplyAlpha),E.push(P.flipY),E.push(P.unpackAlignment),E.push(P.colorSpace),E.join()}function $(P,E){const z=n.get(P);if(P.isVideoTexture&&Tt(P),P.isRenderTargetTexture===!1&&P.version>0&&z.__version!==P.version){const Z=P.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(z,P,E);return}}e.bindTexture(r.TEXTURE_2D,z.__webglTexture,r.TEXTURE0+E)}function V(P,E){const z=n.get(P);if(P.version>0&&z.__version!==P.version){Y(z,P,E);return}e.bindTexture(r.TEXTURE_2D_ARRAY,z.__webglTexture,r.TEXTURE0+E)}function Q(P,E){const z=n.get(P);if(P.version>0&&z.__version!==P.version){Y(z,P,E);return}e.bindTexture(r.TEXTURE_3D,z.__webglTexture,r.TEXTURE0+E)}function X(P,E){const z=n.get(P);if(P.version>0&&z.__version!==P.version){nt(z,P,E);return}e.bindTexture(r.TEXTURE_CUBE_MAP,z.__webglTexture,r.TEXTURE0+E)}const at={[Zi]:r.REPEAT,[tn]:r.CLAMP_TO_EDGE,[ra]:r.MIRRORED_REPEAT},dt={[rn]:r.NEAREST,[Xc]:r.NEAREST_MIPMAP_NEAREST,[sr]:r.NEAREST_MIPMAP_LINEAR,[Oe]:r.LINEAR,[Qr]:r.LINEAR_MIPMAP_NEAREST,[en]:r.LINEAR_MIPMAP_LINEAR},yt={[Zc]:r.NEVER,[eh]:r.ALWAYS,[Kc]:r.LESS,[Bl]:r.LEQUAL,[jc]:r.EQUAL,[th]:r.GEQUAL,[Jc]:r.GREATER,[Qc]:r.NOTEQUAL};function Ot(P,E){if(E.type===_n&&t.has("OES_texture_float_linear")===!1&&(E.magFilter===Oe||E.magFilter===Qr||E.magFilter===sr||E.magFilter===en||E.minFilter===Oe||E.minFilter===Qr||E.minFilter===sr||E.minFilter===en)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(P,r.TEXTURE_WRAP_S,at[E.wrapS]),r.texParameteri(P,r.TEXTURE_WRAP_T,at[E.wrapT]),(P===r.TEXTURE_3D||P===r.TEXTURE_2D_ARRAY)&&r.texParameteri(P,r.TEXTURE_WRAP_R,at[E.wrapR]),r.texParameteri(P,r.TEXTURE_MAG_FILTER,dt[E.magFilter]),r.texParameteri(P,r.TEXTURE_MIN_FILTER,dt[E.minFilter]),E.compareFunction&&(r.texParameteri(P,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(P,r.TEXTURE_COMPARE_FUNC,yt[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===rn||E.minFilter!==sr&&E.minFilter!==en||E.type===_n&&t.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){const z=t.get("EXT_texture_filter_anisotropic");r.texParameterf(P,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,i.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function ee(P,E){let z=!1;P.__webglInit===void 0&&(P.__webglInit=!0,E.addEventListener("dispose",b));const Z=E.source;let j=f.get(Z);j===void 0&&(j={},f.set(Z,j));const q=H(E);if(q!==P.__cacheKey){j[q]===void 0&&(j[q]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,z=!0),j[q].usedTimes++;const Mt=j[P.__cacheKey];Mt!==void 0&&(j[P.__cacheKey].usedTimes--,Mt.usedTimes===0&&x(E)),P.__cacheKey=q,P.__webglTexture=j[q].texture}return z}function Y(P,E,z){let Z=r.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(Z=r.TEXTURE_2D_ARRAY),E.isData3DTexture&&(Z=r.TEXTURE_3D);const j=ee(P,E),q=E.source;e.bindTexture(Z,P.__webglTexture,r.TEXTURE0+z);const Mt=n.get(q);if(q.version!==Mt.__version||j===!0){e.activeTexture(r.TEXTURE0+z);const lt=Xt.getPrimaries(Xt.workingColorSpace),ft=E.colorSpace===Ln?null:Xt.getPrimaries(E.colorSpace),Vt=E.colorSpace===Ln||lt===ft?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Vt);let tt=_(E.image,!1,i.maxTextureSize);tt=re(E,tt);const pt=s.convert(E.format,E.colorSpace),bt=s.convert(E.type);let At=S(E.internalFormat,pt,bt,E.colorSpace,E.isVideoTexture);Ot(Z,E);let mt;const kt=E.mipmaps,Nt=E.isVideoTexture!==!0,ne=Mt.__version===void 0||j===!0,D=q.dataReady,st=w(E,tt);if(E.isDepthTexture)At=v(E.format===Ci,E.type),ne&&(Nt?e.texStorage2D(r.TEXTURE_2D,1,At,tt.width,tt.height):e.texImage2D(r.TEXTURE_2D,0,At,tt.width,tt.height,0,pt,bt,null));else if(E.isDataTexture)if(kt.length>0){Nt&&ne&&e.texStorage2D(r.TEXTURE_2D,st,At,kt[0].width,kt[0].height);for(let W=0,K=kt.length;W<K;W++)mt=kt[W],Nt?D&&e.texSubImage2D(r.TEXTURE_2D,W,0,0,mt.width,mt.height,pt,bt,mt.data):e.texImage2D(r.TEXTURE_2D,W,At,mt.width,mt.height,0,pt,bt,mt.data);E.generateMipmaps=!1}else Nt?(ne&&e.texStorage2D(r.TEXTURE_2D,st,At,tt.width,tt.height),D&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,tt.width,tt.height,pt,bt,tt.data)):e.texImage2D(r.TEXTURE_2D,0,At,tt.width,tt.height,0,pt,bt,tt.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Nt&&ne&&e.texStorage3D(r.TEXTURE_2D_ARRAY,st,At,kt[0].width,kt[0].height,tt.depth);for(let W=0,K=kt.length;W<K;W++)if(mt=kt[W],E.format!==nn)if(pt!==null)if(Nt){if(D)if(E.layerUpdates.size>0){const ut=rl(mt.width,mt.height,E.format,E.type);for(const ct of E.layerUpdates){const It=mt.data.subarray(ct*ut/mt.data.BYTES_PER_ELEMENT,(ct+1)*ut/mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,W,0,0,ct,mt.width,mt.height,1,pt,It)}E.clearLayerUpdates()}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,W,0,0,0,mt.width,mt.height,tt.depth,pt,mt.data)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,W,At,mt.width,mt.height,tt.depth,0,mt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Nt?D&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,W,0,0,0,mt.width,mt.height,tt.depth,pt,bt,mt.data):e.texImage3D(r.TEXTURE_2D_ARRAY,W,At,mt.width,mt.height,tt.depth,0,pt,bt,mt.data)}else{Nt&&ne&&e.texStorage2D(r.TEXTURE_2D,st,At,kt[0].width,kt[0].height);for(let W=0,K=kt.length;W<K;W++)mt=kt[W],E.format!==nn?pt!==null?Nt?D&&e.compressedTexSubImage2D(r.TEXTURE_2D,W,0,0,mt.width,mt.height,pt,mt.data):e.compressedTexImage2D(r.TEXTURE_2D,W,At,mt.width,mt.height,0,mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Nt?D&&e.texSubImage2D(r.TEXTURE_2D,W,0,0,mt.width,mt.height,pt,bt,mt.data):e.texImage2D(r.TEXTURE_2D,W,At,mt.width,mt.height,0,pt,bt,mt.data)}else if(E.isDataArrayTexture)if(Nt){if(ne&&e.texStorage3D(r.TEXTURE_2D_ARRAY,st,At,tt.width,tt.height,tt.depth),D)if(E.layerUpdates.size>0){const W=rl(tt.width,tt.height,E.format,E.type);for(const K of E.layerUpdates){const ut=tt.data.subarray(K*W/tt.data.BYTES_PER_ELEMENT,(K+1)*W/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,K,tt.width,tt.height,1,pt,bt,ut)}E.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,pt,bt,tt.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,At,tt.width,tt.height,tt.depth,0,pt,bt,tt.data);else if(E.isData3DTexture)Nt?(ne&&e.texStorage3D(r.TEXTURE_3D,st,At,tt.width,tt.height,tt.depth),D&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,pt,bt,tt.data)):e.texImage3D(r.TEXTURE_3D,0,At,tt.width,tt.height,tt.depth,0,pt,bt,tt.data);else if(E.isFramebufferTexture){if(ne)if(Nt)e.texStorage2D(r.TEXTURE_2D,st,At,tt.width,tt.height);else{let W=tt.width,K=tt.height;for(let ut=0;ut<st;ut++)e.texImage2D(r.TEXTURE_2D,ut,At,W,K,0,pt,bt,null),W>>=1,K>>=1}}else if(kt.length>0){if(Nt&&ne){const W=Et(kt[0]);e.texStorage2D(r.TEXTURE_2D,st,At,W.width,W.height)}for(let W=0,K=kt.length;W<K;W++)mt=kt[W],Nt?D&&e.texSubImage2D(r.TEXTURE_2D,W,0,0,pt,bt,mt):e.texImage2D(r.TEXTURE_2D,W,At,pt,bt,mt);E.generateMipmaps=!1}else if(Nt){if(ne){const W=Et(tt);e.texStorage2D(r.TEXTURE_2D,st,At,W.width,W.height)}D&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,pt,bt,tt)}else e.texImage2D(r.TEXTURE_2D,0,At,pt,bt,tt);m(E)&&d(Z),Mt.__version=q.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function nt(P,E,z){if(E.image.length!==6)return;const Z=ee(P,E),j=E.source;e.bindTexture(r.TEXTURE_CUBE_MAP,P.__webglTexture,r.TEXTURE0+z);const q=n.get(j);if(j.version!==q.__version||Z===!0){e.activeTexture(r.TEXTURE0+z);const Mt=Xt.getPrimaries(Xt.workingColorSpace),lt=E.colorSpace===Ln?null:Xt.getPrimaries(E.colorSpace),ft=E.colorSpace===Ln||Mt===lt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ft);const Vt=E.isCompressedTexture||E.image[0].isCompressedTexture,tt=E.image[0]&&E.image[0].isDataTexture,pt=[];for(let K=0;K<6;K++)!Vt&&!tt?pt[K]=_(E.image[K],!0,i.maxCubemapSize):pt[K]=tt?E.image[K].image:E.image[K],pt[K]=re(E,pt[K]);const bt=pt[0],At=s.convert(E.format,E.colorSpace),mt=s.convert(E.type),kt=S(E.internalFormat,At,mt,E.colorSpace),Nt=E.isVideoTexture!==!0,ne=q.__version===void 0||Z===!0,D=j.dataReady;let st=w(E,bt);Ot(r.TEXTURE_CUBE_MAP,E);let W;if(Vt){Nt&&ne&&e.texStorage2D(r.TEXTURE_CUBE_MAP,st,kt,bt.width,bt.height);for(let K=0;K<6;K++){W=pt[K].mipmaps;for(let ut=0;ut<W.length;ut++){const ct=W[ut];E.format!==nn?At!==null?Nt?D&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,ut,0,0,ct.width,ct.height,At,ct.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,ut,kt,ct.width,ct.height,0,ct.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Nt?D&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,ut,0,0,ct.width,ct.height,At,mt,ct.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,ut,kt,ct.width,ct.height,0,At,mt,ct.data)}}}else{if(W=E.mipmaps,Nt&&ne){W.length>0&&st++;const K=Et(pt[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,st,kt,K.width,K.height)}for(let K=0;K<6;K++)if(tt){Nt?D&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,pt[K].width,pt[K].height,At,mt,pt[K].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,kt,pt[K].width,pt[K].height,0,At,mt,pt[K].data);for(let ut=0;ut<W.length;ut++){const It=W[ut].image[K].image;Nt?D&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,ut+1,0,0,It.width,It.height,At,mt,It.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,ut+1,kt,It.width,It.height,0,At,mt,It.data)}}else{Nt?D&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,At,mt,pt[K]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,kt,At,mt,pt[K]);for(let ut=0;ut<W.length;ut++){const ct=W[ut];Nt?D&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,ut+1,0,0,At,mt,ct.image[K]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,ut+1,kt,At,mt,ct.image[K])}}}m(E)&&d(r.TEXTURE_CUBE_MAP),q.__version=j.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function xt(P,E,z,Z,j,q){const Mt=s.convert(z.format,z.colorSpace),lt=s.convert(z.type),ft=S(z.internalFormat,Mt,lt,z.colorSpace),Vt=n.get(E),tt=n.get(z);if(tt.__renderTarget=E,!Vt.__hasExternalTextures){const pt=Math.max(1,E.width>>q),bt=Math.max(1,E.height>>q);j===r.TEXTURE_3D||j===r.TEXTURE_2D_ARRAY?e.texImage3D(j,q,ft,pt,bt,E.depth,0,Mt,lt,null):e.texImage2D(j,q,ft,pt,bt,0,Mt,lt,null)}e.bindFramebuffer(r.FRAMEBUFFER,P),Ht(E)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Z,j,tt.__webglTexture,0,zt(E)):(j===r.TEXTURE_2D||j>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,Z,j,tt.__webglTexture,q),e.bindFramebuffer(r.FRAMEBUFFER,null)}function ot(P,E,z){if(r.bindRenderbuffer(r.RENDERBUFFER,P),E.depthBuffer){const Z=E.depthTexture,j=Z&&Z.isDepthTexture?Z.type:null,q=v(E.stencilBuffer,j),Mt=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,lt=zt(E);Ht(E)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,lt,q,E.width,E.height):z?r.renderbufferStorageMultisample(r.RENDERBUFFER,lt,q,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,q,E.width,E.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Mt,r.RENDERBUFFER,P)}else{const Z=E.textures;for(let j=0;j<Z.length;j++){const q=Z[j],Mt=s.convert(q.format,q.colorSpace),lt=s.convert(q.type),ft=S(q.internalFormat,Mt,lt,q.colorSpace),Vt=zt(E);z&&Ht(E)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Vt,ft,E.width,E.height):Ht(E)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Vt,ft,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,ft,E.width,E.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function wt(P,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,P),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Z=n.get(E.depthTexture);Z.__renderTarget=E,(!Z.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),$(E.depthTexture,0);const j=Z.__webglTexture,q=zt(E);if(E.depthTexture.format===Ei)Ht(E)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,j,0,q):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,j,0);else if(E.depthTexture.format===Ci)Ht(E)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,j,0,q):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function Pt(P){const E=n.get(P),z=P.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==P.depthTexture){const Z=P.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),Z){const j=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,Z.removeEventListener("dispose",j)};Z.addEventListener("dispose",j),E.__depthDisposeCallback=j}E.__boundDepthTexture=Z}if(P.depthTexture&&!E.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");wt(E.__webglFramebuffer,P)}else if(z){E.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(e.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[Z]),E.__webglDepthbuffer[Z]===void 0)E.__webglDepthbuffer[Z]=r.createRenderbuffer(),ot(E.__webglDepthbuffer[Z],P,!1);else{const j=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,q=E.__webglDepthbuffer[Z];r.bindRenderbuffer(r.RENDERBUFFER,q),r.framebufferRenderbuffer(r.FRAMEBUFFER,j,r.RENDERBUFFER,q)}}else if(e.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=r.createRenderbuffer(),ot(E.__webglDepthbuffer,P,!1);else{const Z=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,j=E.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,j),r.framebufferRenderbuffer(r.FRAMEBUFFER,Z,r.RENDERBUFFER,j)}e.bindFramebuffer(r.FRAMEBUFFER,null)}function Bt(P,E,z){const Z=n.get(P);E!==void 0&&xt(Z.__webglFramebuffer,P,P.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),z!==void 0&&Pt(P)}function he(P){const E=P.texture,z=n.get(P),Z=n.get(E);P.addEventListener("dispose",R);const j=P.textures,q=P.isWebGLCubeRenderTarget===!0,Mt=j.length>1;if(Mt||(Z.__webglTexture===void 0&&(Z.__webglTexture=r.createTexture()),Z.__version=E.version,o.memory.textures++),q){z.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(E.mipmaps&&E.mipmaps.length>0){z.__webglFramebuffer[lt]=[];for(let ft=0;ft<E.mipmaps.length;ft++)z.__webglFramebuffer[lt][ft]=r.createFramebuffer()}else z.__webglFramebuffer[lt]=r.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){z.__webglFramebuffer=[];for(let lt=0;lt<E.mipmaps.length;lt++)z.__webglFramebuffer[lt]=r.createFramebuffer()}else z.__webglFramebuffer=r.createFramebuffer();if(Mt)for(let lt=0,ft=j.length;lt<ft;lt++){const Vt=n.get(j[lt]);Vt.__webglTexture===void 0&&(Vt.__webglTexture=r.createTexture(),o.memory.textures++)}if(P.samples>0&&Ht(P)===!1){z.__webglMultisampledFramebuffer=r.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let lt=0;lt<j.length;lt++){const ft=j[lt];z.__webglColorRenderbuffer[lt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,z.__webglColorRenderbuffer[lt]);const Vt=s.convert(ft.format,ft.colorSpace),tt=s.convert(ft.type),pt=S(ft.internalFormat,Vt,tt,ft.colorSpace,P.isXRRenderTarget===!0),bt=zt(P);r.renderbufferStorageMultisample(r.RENDERBUFFER,bt,pt,P.width,P.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+lt,r.RENDERBUFFER,z.__webglColorRenderbuffer[lt])}r.bindRenderbuffer(r.RENDERBUFFER,null),P.depthBuffer&&(z.__webglDepthRenderbuffer=r.createRenderbuffer(),ot(z.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(q){e.bindTexture(r.TEXTURE_CUBE_MAP,Z.__webglTexture),Ot(r.TEXTURE_CUBE_MAP,E);for(let lt=0;lt<6;lt++)if(E.mipmaps&&E.mipmaps.length>0)for(let ft=0;ft<E.mipmaps.length;ft++)xt(z.__webglFramebuffer[lt][ft],P,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+lt,ft);else xt(z.__webglFramebuffer[lt],P,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);m(E)&&d(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Mt){for(let lt=0,ft=j.length;lt<ft;lt++){const Vt=j[lt],tt=n.get(Vt);e.bindTexture(r.TEXTURE_2D,tt.__webglTexture),Ot(r.TEXTURE_2D,Vt),xt(z.__webglFramebuffer,P,Vt,r.COLOR_ATTACHMENT0+lt,r.TEXTURE_2D,0),m(Vt)&&d(r.TEXTURE_2D)}e.unbindTexture()}else{let lt=r.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(lt=P.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(lt,Z.__webglTexture),Ot(lt,E),E.mipmaps&&E.mipmaps.length>0)for(let ft=0;ft<E.mipmaps.length;ft++)xt(z.__webglFramebuffer[ft],P,E,r.COLOR_ATTACHMENT0,lt,ft);else xt(z.__webglFramebuffer,P,E,r.COLOR_ATTACHMENT0,lt,0);m(E)&&d(lt),e.unbindTexture()}P.depthBuffer&&Pt(P)}function Gt(P){const E=P.textures;for(let z=0,Z=E.length;z<Z;z++){const j=E[z];if(m(j)){const q=y(P),Mt=n.get(j).__webglTexture;e.bindTexture(q,Mt),d(q),e.unbindTexture()}}}const fe=[],B=[];function Ve(P){if(P.samples>0){if(Ht(P)===!1){const E=P.textures,z=P.width,Z=P.height;let j=r.COLOR_BUFFER_BIT;const q=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Mt=n.get(P),lt=E.length>1;if(lt)for(let ft=0;ft<E.length;ft++)e.bindFramebuffer(r.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ft,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,Mt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ft,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,Mt.__webglFramebuffer);for(let ft=0;ft<E.length;ft++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(j|=r.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(j|=r.STENCIL_BUFFER_BIT)),lt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Mt.__webglColorRenderbuffer[ft]);const Vt=n.get(E[ft]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Vt,0)}r.blitFramebuffer(0,0,z,Z,0,0,z,Z,j,r.NEAREST),l===!0&&(fe.length=0,B.length=0,fe.push(r.COLOR_ATTACHMENT0+ft),P.depthBuffer&&P.resolveDepthBuffer===!1&&(fe.push(q),B.push(q),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,B)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,fe))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),lt)for(let ft=0;ft<E.length;ft++){e.bindFramebuffer(r.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ft,r.RENDERBUFFER,Mt.__webglColorRenderbuffer[ft]);const Vt=n.get(E[ft]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,Mt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ft,r.TEXTURE_2D,Vt,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){const E=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[E])}}}function zt(P){return Math.min(i.maxSamples,P.samples)}function Ht(P){const E=n.get(P);return P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Tt(P){const E=o.render.frame;h.get(P)!==E&&(h.set(P,E),P.update())}function re(P,E){const z=P.colorSpace,Z=P.format,j=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||z!==Li&&z!==Ln&&(Xt.getTransfer(z)===Jt?(Z!==nn||j!==Mn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),E}function Et(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=L,this.setTexture2D=$,this.setTexture2DArray=V,this.setTexture3D=Q,this.setTextureCube=X,this.rebindTextures=Bt,this.setupRenderTarget=he,this.updateRenderTargetMipmap=Gt,this.updateMultisampleRenderTarget=Ve,this.setupDepthRenderbuffer=Pt,this.setupFrameBufferTexture=xt,this.useMultisampledRTT=Ht}function om(r,t){function e(n,i=Ln){let s;const o=Xt.getTransfer(i);if(n===Mn)return r.UNSIGNED_BYTE;if(n===Ba)return r.UNSIGNED_SHORT_4_4_4_4;if(n===za)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Pl)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Rl)return r.BYTE;if(n===Cl)return r.SHORT;if(n===Ki)return r.UNSIGNED_SHORT;if(n===Oa)return r.INT;if(n===jn)return r.UNSIGNED_INT;if(n===_n)return r.FLOAT;if(n===Ji)return r.HALF_FLOAT;if(n===Ll)return r.ALPHA;if(n===Il)return r.RGB;if(n===nn)return r.RGBA;if(n===Dl)return r.LUMINANCE;if(n===Ul)return r.LUMINANCE_ALPHA;if(n===Ei)return r.DEPTH_COMPONENT;if(n===Ci)return r.DEPTH_STENCIL;if(n===Nl)return r.RED;if(n===Ha)return r.RED_INTEGER;if(n===Fl)return r.RG;if(n===ka)return r.RG_INTEGER;if(n===Ga)return r.RGBA_INTEGER;if(n===Nr||n===Fr||n===Or||n===Br)if(o===Jt)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Nr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Fr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Or)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Br)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Nr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Fr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Or)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Br)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===sa||n===aa||n===oa||n===la)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===sa)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===aa)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===oa)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===la)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ca||n===ha||n===ua)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===ca||n===ha)return o===Jt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===ua)return o===Jt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===da||n===fa||n===pa||n===ma||n===ga||n===_a||n===va||n===xa||n===Ma||n===Sa||n===ya||n===Ea||n===Ta||n===ba)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===da)return o===Jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===fa)return o===Jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===pa)return o===Jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ma)return o===Jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ga)return o===Jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===_a)return o===Jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===va)return o===Jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===xa)return o===Jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ma)return o===Jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Sa)return o===Jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ya)return o===Jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ea)return o===Jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ta)return o===Jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ba)return o===Jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===zr||n===wa||n===Aa)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===zr)return o===Jt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===wa)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Aa)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ol||n===Ra||n===Ca||n===Pa)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===zr)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Ra)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ca)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Pa)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ri?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}class lm extends Ge{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class ke extends Se{constructor(){super(),this.isGroup=!0,this.type="Group"}}const cm={type:"move"};class Rs{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ke,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ke,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ke,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),d=this._getHandJoint(c,_);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),p=.02,g=.005;c.inputState.pinching&&f>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(cm)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ke;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const hm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,um=`
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

}`;class dm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new we,s=t.properties.get(i);s.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Fn({vertexShader:hm,fragmentShader:um,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new J(new Wt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class fm extends Ii{constructor(t,e){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,f=null,p=null,g=null;const _=new dm,m=e.getContextAttributes();let d=null,y=null;const S=[],v=[],w=new Rt;let b=null;const R=new Ge;R.viewport=new te;const A=new Ge;A.viewport=new te;const x=[R,A],M=new lm;let C=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let nt=S[Y];return nt===void 0&&(nt=new Rs,S[Y]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function(Y){let nt=S[Y];return nt===void 0&&(nt=new Rs,S[Y]=nt),nt.getGripSpace()},this.getHand=function(Y){let nt=S[Y];return nt===void 0&&(nt=new Rs,S[Y]=nt),nt.getHandSpace()};function O(Y){const nt=v.indexOf(Y.inputSource);if(nt===-1)return;const xt=S[nt];xt!==void 0&&(xt.update(Y.inputSource,Y.frame,c||o),xt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function H(){i.removeEventListener("select",O),i.removeEventListener("selectstart",O),i.removeEventListener("selectend",O),i.removeEventListener("squeeze",O),i.removeEventListener("squeezestart",O),i.removeEventListener("squeezeend",O),i.removeEventListener("end",H),i.removeEventListener("inputsourceschange",$);for(let Y=0;Y<S.length;Y++){const nt=v[Y];nt!==null&&(v[Y]=null,S[Y].disconnect(nt))}C=null,L=null,_.reset(),t.setRenderTarget(d),p=null,f=null,u=null,i=null,y=null,ee.stop(),n.isPresenting=!1,t.setPixelRatio(b),t.setSize(w.width,w.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(Y){if(i=Y,i!==null){if(d=t.getRenderTarget(),i.addEventListener("select",O),i.addEventListener("selectstart",O),i.addEventListener("selectend",O),i.addEventListener("squeeze",O),i.addEventListener("squeezestart",O),i.addEventListener("squeezeend",O),i.addEventListener("end",H),i.addEventListener("inputsourceschange",$),m.xrCompatible!==!0&&await e.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(w),i.renderState.layers===void 0){const nt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(i,e,nt),i.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new Jn(p.framebufferWidth,p.framebufferHeight,{format:nn,type:Mn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let nt=null,xt=null,ot=null;m.depth&&(ot=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,nt=m.stencil?Ci:Ei,xt=m.stencil?Ri:jn);const wt={colorFormat:e.RGBA8,depthFormat:ot,scaleFactor:s};u=new XRWebGLBinding(i,e),f=u.createProjectionLayer(wt),i.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),y=new Jn(f.textureWidth,f.textureHeight,{format:nn,type:Mn,depthTexture:new jl(f.textureWidth,f.textureHeight,xt,void 0,void 0,void 0,void 0,void 0,void 0,nt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),ee.setContext(i),ee.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function $(Y){for(let nt=0;nt<Y.removed.length;nt++){const xt=Y.removed[nt],ot=v.indexOf(xt);ot>=0&&(v[ot]=null,S[ot].disconnect(xt))}for(let nt=0;nt<Y.added.length;nt++){const xt=Y.added[nt];let ot=v.indexOf(xt);if(ot===-1){for(let Pt=0;Pt<S.length;Pt++)if(Pt>=v.length){v.push(xt),ot=Pt;break}else if(v[Pt]===null){v[Pt]=xt,ot=Pt;break}if(ot===-1)break}const wt=S[ot];wt&&wt.connect(xt)}}const V=new U,Q=new U;function X(Y,nt,xt){V.setFromMatrixPosition(nt.matrixWorld),Q.setFromMatrixPosition(xt.matrixWorld);const ot=V.distanceTo(Q),wt=nt.projectionMatrix.elements,Pt=xt.projectionMatrix.elements,Bt=wt[14]/(wt[10]-1),he=wt[14]/(wt[10]+1),Gt=(wt[9]+1)/wt[5],fe=(wt[9]-1)/wt[5],B=(wt[8]-1)/wt[0],Ve=(Pt[8]+1)/Pt[0],zt=Bt*B,Ht=Bt*Ve,Tt=ot/(-B+Ve),re=Tt*-B;if(nt.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(re),Y.translateZ(Tt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),wt[10]===-1)Y.projectionMatrix.copy(nt.projectionMatrix),Y.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{const Et=Bt+Tt,P=he+Tt,E=zt-re,z=Ht+(ot-re),Z=Gt*he/P*Et,j=fe*he/P*Et;Y.projectionMatrix.makePerspective(E,z,Z,j,Et,P),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function at(Y,nt){nt===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(nt.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(i===null)return;let nt=Y.near,xt=Y.far;_.texture!==null&&(_.depthNear>0&&(nt=_.depthNear),_.depthFar>0&&(xt=_.depthFar)),M.near=A.near=R.near=nt,M.far=A.far=R.far=xt,(C!==M.near||L!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),C=M.near,L=M.far),R.layers.mask=Y.layers.mask|2,A.layers.mask=Y.layers.mask|4,M.layers.mask=R.layers.mask|A.layers.mask;const ot=Y.parent,wt=M.cameras;at(M,ot);for(let Pt=0;Pt<wt.length;Pt++)at(wt[Pt],ot);wt.length===2?X(M,R,A):M.projectionMatrix.copy(R.projectionMatrix),dt(Y,M,ot)};function dt(Y,nt,xt){xt===null?Y.matrix.copy(nt.matrixWorld):(Y.matrix.copy(xt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(nt.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(nt.projectionMatrix),Y.projectionMatrixInverse.copy(nt.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Ia*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(Y){l=Y,f!==null&&(f.fixedFoveation=Y),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Y)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)};let yt=null;function Ot(Y,nt){if(h=nt.getViewerPose(c||o),g=nt,h!==null){const xt=h.views;p!==null&&(t.setRenderTargetFramebuffer(y,p.framebuffer),t.setRenderTarget(y));let ot=!1;xt.length!==M.cameras.length&&(M.cameras.length=0,ot=!0);for(let Pt=0;Pt<xt.length;Pt++){const Bt=xt[Pt];let he=null;if(p!==null)he=p.getViewport(Bt);else{const fe=u.getViewSubImage(f,Bt);he=fe.viewport,Pt===0&&(t.setRenderTargetTextures(y,fe.colorTexture,f.ignoreDepthValues?void 0:fe.depthStencilTexture),t.setRenderTarget(y))}let Gt=x[Pt];Gt===void 0&&(Gt=new Ge,Gt.layers.enable(Pt),Gt.viewport=new te,x[Pt]=Gt),Gt.matrix.fromArray(Bt.transform.matrix),Gt.matrix.decompose(Gt.position,Gt.quaternion,Gt.scale),Gt.projectionMatrix.fromArray(Bt.projectionMatrix),Gt.projectionMatrixInverse.copy(Gt.projectionMatrix).invert(),Gt.viewport.set(he.x,he.y,he.width,he.height),Pt===0&&(M.matrix.copy(Gt.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),ot===!0&&M.cameras.push(Gt)}const wt=i.enabledFeatures;if(wt&&wt.includes("depth-sensing")){const Pt=u.getDepthInformation(xt[0]);Pt&&Pt.isValid&&Pt.texture&&_.init(t,Pt,i.renderState)}}for(let xt=0;xt<S.length;xt++){const ot=v[xt],wt=S[xt];ot!==null&&wt!==void 0&&wt.update(ot,nt,c||o)}yt&&yt(Y,nt),nt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:nt}),g=null}const ee=new Zl;ee.setAnimationLoop(Ot),this.setAnimationLoop=function(Y){yt=Y},this.dispose=function(){}}}const Vn=new sn,pm=new ce;function mm(r,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,ql(r)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function i(m,d,y,S,v){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(m,d):d.isMeshToonMaterial?(s(m,d),u(m,d)):d.isMeshPhongMaterial?(s(m,d),h(m,d)):d.isMeshStandardMaterial?(s(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,v)):d.isMeshMatcapMaterial?(s(m,d),g(m,d)):d.isMeshDepthMaterial?s(m,d):d.isMeshDistanceMaterial?(s(m,d),_(m,d)):d.isMeshNormalMaterial?s(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?l(m,d,y,S):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Le&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Le&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const y=t.get(d),S=y.envMap,v=y.envMapRotation;S&&(m.envMap.value=S,Vn.copy(v),Vn.x*=-1,Vn.y*=-1,Vn.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Vn.y*=-1,Vn.z*=-1),m.envMapRotation.value.setFromMatrix4(pm.makeRotationFromEuler(Vn)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,y,S){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*y,m.scale.value=S*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function h(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function u(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,y){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Le&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function _(m,d){const y=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function gm(r,t,e,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,S){const v=S.program;n.uniformBlockBinding(y,v)}function c(y,S){let v=i[y.id];v===void 0&&(g(y),v=h(y),i[y.id]=v,y.addEventListener("dispose",m));const w=S.program;n.updateUBOMapping(y,w);const b=t.render.frame;s[y.id]!==b&&(f(y),s[y.id]=b)}function h(y){const S=u();y.__bindingPointIndex=S;const v=r.createBuffer(),w=y.__size,b=y.usage;return r.bindBuffer(r.UNIFORM_BUFFER,v),r.bufferData(r.UNIFORM_BUFFER,w,b),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,S,v),v}function u(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){const S=i[y.id],v=y.uniforms,w=y.__cache;r.bindBuffer(r.UNIFORM_BUFFER,S);for(let b=0,R=v.length;b<R;b++){const A=Array.isArray(v[b])?v[b]:[v[b]];for(let x=0,M=A.length;x<M;x++){const C=A[x];if(p(C,b,x,w)===!0){const L=C.__offset,O=Array.isArray(C.value)?C.value:[C.value];let H=0;for(let $=0;$<O.length;$++){const V=O[$],Q=_(V);typeof V=="number"||typeof V=="boolean"?(C.__data[0]=V,r.bufferSubData(r.UNIFORM_BUFFER,L+H,C.__data)):V.isMatrix3?(C.__data[0]=V.elements[0],C.__data[1]=V.elements[1],C.__data[2]=V.elements[2],C.__data[3]=0,C.__data[4]=V.elements[3],C.__data[5]=V.elements[4],C.__data[6]=V.elements[5],C.__data[7]=0,C.__data[8]=V.elements[6],C.__data[9]=V.elements[7],C.__data[10]=V.elements[8],C.__data[11]=0):(V.toArray(C.__data,H),H+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,L,C.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function p(y,S,v,w){const b=y.value,R=S+"_"+v;if(w[R]===void 0)return typeof b=="number"||typeof b=="boolean"?w[R]=b:w[R]=b.clone(),!0;{const A=w[R];if(typeof b=="number"||typeof b=="boolean"){if(A!==b)return w[R]=b,!0}else if(A.equals(b)===!1)return A.copy(b),!0}return!1}function g(y){const S=y.uniforms;let v=0;const w=16;for(let R=0,A=S.length;R<A;R++){const x=Array.isArray(S[R])?S[R]:[S[R]];for(let M=0,C=x.length;M<C;M++){const L=x[M],O=Array.isArray(L.value)?L.value:[L.value];for(let H=0,$=O.length;H<$;H++){const V=O[H],Q=_(V),X=v%w,at=X%Q.boundary,dt=X+at;v+=at,dt!==0&&w-dt<Q.storage&&(v+=w-dt),L.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=v,v+=Q.storage}}}const b=v%w;return b>0&&(v+=w-b),y.__size=v,y.__cache={},this}function _(y){const S={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(S.boundary=4,S.storage=4):y.isVector2?(S.boundary=8,S.storage=8):y.isVector3||y.isColor?(S.boundary=16,S.storage=12):y.isVector4?(S.boundary=16,S.storage=16):y.isMatrix3?(S.boundary=48,S.storage=48):y.isMatrix4?(S.boundary=64,S.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),S}function m(y){const S=y.target;S.removeEventListener("dispose",m);const v=o.indexOf(S.__bindingPointIndex);o.splice(v,1),r.deleteBuffer(i[S.id]),delete i[S.id],delete s[S.id]}function d(){for(const y in i)r.deleteBuffer(i[y]);o=[],i={},s={}}return{bind:l,update:c,dispose:d}}class _m{constructor(t={}){const{canvas:e=ih(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,d=null;const y=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Me,this.toneMapping=Dn,this.toneMappingExposure=1;const v=this;let w=!1,b=0,R=0,A=null,x=-1,M=null;const C=new te,L=new te;let O=null;const H=new Lt(0);let $=0,V=e.width,Q=e.height,X=1,at=null,dt=null;const yt=new te(0,0,V,Q),Ot=new te(0,0,V,Q);let ee=!1;const Y=new Xa;let nt=!1,xt=!1;const ot=new ce,wt=new ce,Pt=new U,Bt=new te,he={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Gt=!1;function fe(){return A===null?X:1}let B=n;function Ve(T,N){return e.getContext(T,N)}try{const T={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Fa}`),e.addEventListener("webglcontextlost",K,!1),e.addEventListener("webglcontextrestored",ut,!1),e.addEventListener("webglcontextcreationerror",ct,!1),B===null){const N="webgl2";if(B=Ve(N,T),B===null)throw Ve(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let zt,Ht,Tt,re,Et,P,E,z,Z,j,q,Mt,lt,ft,Vt,tt,pt,bt,At,mt,kt,Nt,ne,D;function st(){zt=new yf(B),zt.init(),Nt=new om(B,zt),Ht=new gf(B,zt,t,Nt),Tt=new rm(B,zt),Ht.reverseDepthBuffer&&f&&Tt.buffers.depth.setReversed(!0),re=new bf(B),Et=new Vp,P=new am(B,zt,Tt,Et,Ht,Nt,re),E=new vf(v),z=new Sf(v),Z=new Lh(B),ne=new pf(B,Z),j=new Ef(B,Z,re,ne),q=new Af(B,j,Z,re),At=new wf(B,Ht,P),tt=new _f(Et),Mt=new Gp(v,E,z,zt,Ht,ne,tt),lt=new mm(v,Et),ft=new Xp,Vt=new jp(zt),bt=new ff(v,E,z,Tt,q,p,l),pt=new nm(v,q,Ht),D=new gm(B,re,Ht,Tt),mt=new mf(B,zt,re),kt=new Tf(B,zt,re),re.programs=Mt.programs,v.capabilities=Ht,v.extensions=zt,v.properties=Et,v.renderLists=ft,v.shadowMap=pt,v.state=Tt,v.info=re}st();const W=new fm(v,B);this.xr=W,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const T=zt.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=zt.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(T){T!==void 0&&(X=T,this.setSize(V,Q,!1))},this.getSize=function(T){return T.set(V,Q)},this.setSize=function(T,N,k=!0){if(W.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=T,Q=N,e.width=Math.floor(T*X),e.height=Math.floor(N*X),k===!0&&(e.style.width=T+"px",e.style.height=N+"px"),this.setViewport(0,0,T,N)},this.getDrawingBufferSize=function(T){return T.set(V*X,Q*X).floor()},this.setDrawingBufferSize=function(T,N,k){V=T,Q=N,X=k,e.width=Math.floor(T*k),e.height=Math.floor(N*k),this.setViewport(0,0,T,N)},this.getCurrentViewport=function(T){return T.copy(C)},this.getViewport=function(T){return T.copy(yt)},this.setViewport=function(T,N,k,G){T.isVector4?yt.set(T.x,T.y,T.z,T.w):yt.set(T,N,k,G),Tt.viewport(C.copy(yt).multiplyScalar(X).round())},this.getScissor=function(T){return T.copy(Ot)},this.setScissor=function(T,N,k,G){T.isVector4?Ot.set(T.x,T.y,T.z,T.w):Ot.set(T,N,k,G),Tt.scissor(L.copy(Ot).multiplyScalar(X).round())},this.getScissorTest=function(){return ee},this.setScissorTest=function(T){Tt.setScissorTest(ee=T)},this.setOpaqueSort=function(T){at=T},this.setTransparentSort=function(T){dt=T},this.getClearColor=function(T){return T.copy(bt.getClearColor())},this.setClearColor=function(){bt.setClearColor.apply(bt,arguments)},this.getClearAlpha=function(){return bt.getClearAlpha()},this.setClearAlpha=function(){bt.setClearAlpha.apply(bt,arguments)},this.clear=function(T=!0,N=!0,k=!0){let G=0;if(T){let F=!1;if(A!==null){const et=A.texture.format;F=et===Ga||et===ka||et===Ha}if(F){const et=A.texture.type,ht=et===Mn||et===jn||et===Ki||et===Ri||et===Ba||et===za,gt=bt.getClearColor(),_t=bt.getClearAlpha(),Ct=gt.r,Dt=gt.g,vt=gt.b;ht?(g[0]=Ct,g[1]=Dt,g[2]=vt,g[3]=_t,B.clearBufferuiv(B.COLOR,0,g)):(_[0]=Ct,_[1]=Dt,_[2]=vt,_[3]=_t,B.clearBufferiv(B.COLOR,0,_))}else G|=B.COLOR_BUFFER_BIT}N&&(G|=B.DEPTH_BUFFER_BIT),k&&(G|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",K,!1),e.removeEventListener("webglcontextrestored",ut,!1),e.removeEventListener("webglcontextcreationerror",ct,!1),ft.dispose(),Vt.dispose(),Et.dispose(),E.dispose(),z.dispose(),q.dispose(),ne.dispose(),D.dispose(),Mt.dispose(),W.dispose(),W.removeEventListener("sessionstart",Qa),W.removeEventListener("sessionend",to),On.stop()};function K(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function ut(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;const T=re.autoReset,N=pt.enabled,k=pt.autoUpdate,G=pt.needsUpdate,F=pt.type;st(),re.autoReset=T,pt.enabled=N,pt.autoUpdate=k,pt.needsUpdate=G,pt.type=F}function ct(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function It(T){const N=T.target;N.removeEventListener("dispose",It),ue(N)}function ue(T){Ee(T),Et.remove(T)}function Ee(T){const N=Et.get(T).programs;N!==void 0&&(N.forEach(function(k){Mt.releaseProgram(k)}),T.isShaderMaterial&&Mt.releaseShaderCache(T))}this.renderBufferDirect=function(T,N,k,G,F,et){N===null&&(N=he);const ht=F.isMesh&&F.matrixWorld.determinant()<0,gt=hc(T,N,k,G,F);Tt.setMaterial(G,ht);let _t=k.index,Ct=1;if(G.wireframe===!0){if(_t=j.getWireframeAttribute(k),_t===void 0)return;Ct=2}const Dt=k.drawRange,vt=k.attributes.position;let qt=Dt.start*Ct,ie=(Dt.start+Dt.count)*Ct;et!==null&&(qt=Math.max(qt,et.start*Ct),ie=Math.min(ie,(et.start+et.count)*Ct)),_t!==null?(qt=Math.max(qt,0),ie=Math.min(ie,_t.count)):vt!=null&&(qt=Math.max(qt,0),ie=Math.min(ie,vt.count));const se=ie-qt;if(se<0||se===1/0)return;ne.setup(F,G,gt,k,_t);let Ue,$t=mt;if(_t!==null&&(Ue=Z.get(_t),$t=kt,$t.setIndex(Ue)),F.isMesh)G.wireframe===!0?(Tt.setLineWidth(G.wireframeLinewidth*fe()),$t.setMode(B.LINES)):$t.setMode(B.TRIANGLES);else if(F.isLine){let St=G.linewidth;St===void 0&&(St=1),Tt.setLineWidth(St*fe()),F.isLineSegments?$t.setMode(B.LINES):F.isLineLoop?$t.setMode(B.LINE_LOOP):$t.setMode(B.LINE_STRIP)}else F.isPoints?$t.setMode(B.POINTS):F.isSprite&&$t.setMode(B.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)$t.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(zt.get("WEBGL_multi_draw"))$t.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const St=F._multiDrawStarts,hn=F._multiDrawCounts,Zt=F._multiDrawCount,Ze=_t?Z.get(_t).bytesPerElement:1,ti=Et.get(G).currentProgram.getUniforms();for(let Be=0;Be<Zt;Be++)ti.setValue(B,"_gl_DrawID",Be),$t.render(St[Be]/Ze,hn[Be])}else if(F.isInstancedMesh)$t.renderInstances(qt,se,F.count);else if(k.isInstancedBufferGeometry){const St=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,hn=Math.min(k.instanceCount,St);$t.renderInstances(qt,se,hn)}else $t.render(qt,se)};function Kt(T,N,k){T.transparent===!0&&T.side===Yt&&T.forceSinglePass===!1?(T.side=Le,T.needsUpdate=!0,rr(T,N,k),T.side=Nn,T.needsUpdate=!0,rr(T,N,k),T.side=Yt):rr(T,N,k)}this.compile=function(T,N,k=null){k===null&&(k=T),d=Vt.get(k),d.init(N),S.push(d),k.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(d.pushLight(F),F.castShadow&&d.pushShadow(F))}),T!==k&&T.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(d.pushLight(F),F.castShadow&&d.pushShadow(F))}),d.setupLights();const G=new Set;return T.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const et=F.material;if(et)if(Array.isArray(et))for(let ht=0;ht<et.length;ht++){const gt=et[ht];Kt(gt,k,F),G.add(gt)}else Kt(et,k,F),G.add(et)}),S.pop(),d=null,G},this.compileAsync=function(T,N,k=null){const G=this.compile(T,N,k);return new Promise(F=>{function et(){if(G.forEach(function(ht){Et.get(ht).currentProgram.isReady()&&G.delete(ht)}),G.size===0){F(T);return}setTimeout(et,10)}zt.get("KHR_parallel_shader_compile")!==null?et():setTimeout(et,10)})};let $e=null;function cn(T){$e&&$e(T)}function Qa(){On.stop()}function to(){On.start()}const On=new Zl;On.setAnimationLoop(cn),typeof self<"u"&&On.setContext(self),this.setAnimationLoop=function(T){$e=T,W.setAnimationLoop(T),T===null?On.stop():On.start()},W.addEventListener("sessionstart",Qa),W.addEventListener("sessionend",to),this.render=function(T,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(W.cameraAutoUpdate===!0&&W.updateCamera(N),N=W.getCamera()),T.isScene===!0&&T.onBeforeRender(v,T,N,A),d=Vt.get(T,S.length),d.init(N),S.push(d),wt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Y.setFromProjectionMatrix(wt),xt=this.localClippingEnabled,nt=tt.init(this.clippingPlanes,xt),m=ft.get(T,y.length),m.init(),y.push(m),W.enabled===!0&&W.isPresenting===!0){const et=v.xr.getDepthSensingMesh();et!==null&&Jr(et,N,-1/0,v.sortObjects)}Jr(T,N,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(at,dt),Gt=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,Gt&&bt.addToRenderList(m,T),this.info.render.frame++,nt===!0&&tt.beginShadows();const k=d.state.shadowsArray;pt.render(k,T,N),nt===!0&&tt.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=m.opaque,F=m.transmissive;if(d.setupLights(),N.isArrayCamera){const et=N.cameras;if(F.length>0)for(let ht=0,gt=et.length;ht<gt;ht++){const _t=et[ht];no(G,F,T,_t)}Gt&&bt.render(T);for(let ht=0,gt=et.length;ht<gt;ht++){const _t=et[ht];eo(m,T,_t,_t.viewport)}}else F.length>0&&no(G,F,T,N),Gt&&bt.render(T),eo(m,T,N);A!==null&&(P.updateMultisampleRenderTarget(A),P.updateRenderTargetMipmap(A)),T.isScene===!0&&T.onAfterRender(v,T,N),ne.resetDefaultState(),x=-1,M=null,S.pop(),S.length>0?(d=S[S.length-1],nt===!0&&tt.setGlobalState(v.clippingPlanes,d.state.camera)):d=null,y.pop(),y.length>0?m=y[y.length-1]:m=null};function Jr(T,N,k,G){if(T.visible===!1)return;if(T.layers.test(N.layers)){if(T.isGroup)k=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(N);else if(T.isLight)d.pushLight(T),T.castShadow&&d.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Y.intersectsSprite(T)){G&&Bt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(wt);const ht=q.update(T),gt=T.material;gt.visible&&m.push(T,ht,gt,k,Bt.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Y.intersectsObject(T))){const ht=q.update(T),gt=T.material;if(G&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Bt.copy(T.boundingSphere.center)):(ht.boundingSphere===null&&ht.computeBoundingSphere(),Bt.copy(ht.boundingSphere.center)),Bt.applyMatrix4(T.matrixWorld).applyMatrix4(wt)),Array.isArray(gt)){const _t=ht.groups;for(let Ct=0,Dt=_t.length;Ct<Dt;Ct++){const vt=_t[Ct],qt=gt[vt.materialIndex];qt&&qt.visible&&m.push(T,ht,qt,k,Bt.z,vt)}}else gt.visible&&m.push(T,ht,gt,k,Bt.z,null)}}const et=T.children;for(let ht=0,gt=et.length;ht<gt;ht++)Jr(et[ht],N,k,G)}function eo(T,N,k,G){const F=T.opaque,et=T.transmissive,ht=T.transparent;d.setupLightsView(k),nt===!0&&tt.setGlobalState(v.clippingPlanes,k),G&&Tt.viewport(C.copy(G)),F.length>0&&ir(F,N,k),et.length>0&&ir(et,N,k),ht.length>0&&ir(ht,N,k),Tt.buffers.depth.setTest(!0),Tt.buffers.depth.setMask(!0),Tt.buffers.color.setMask(!0),Tt.setPolygonOffset(!1)}function no(T,N,k,G){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[G.id]===void 0&&(d.state.transmissionRenderTarget[G.id]=new Jn(1,1,{generateMipmaps:!0,type:zt.has("EXT_color_buffer_half_float")||zt.has("EXT_color_buffer_float")?Ji:Mn,minFilter:en,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Xt.workingColorSpace}));const et=d.state.transmissionRenderTarget[G.id],ht=G.viewport||C;et.setSize(ht.z,ht.w);const gt=v.getRenderTarget();v.setRenderTarget(et),v.getClearColor(H),$=v.getClearAlpha(),$<1&&v.setClearColor(16777215,.5),v.clear(),Gt&&bt.render(k);const _t=v.toneMapping;v.toneMapping=Dn;const Ct=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),d.setupLightsView(G),nt===!0&&tt.setGlobalState(v.clippingPlanes,G),ir(T,k,G),P.updateMultisampleRenderTarget(et),P.updateRenderTargetMipmap(et),zt.has("WEBGL_multisampled_render_to_texture")===!1){let Dt=!1;for(let vt=0,qt=N.length;vt<qt;vt++){const ie=N[vt],se=ie.object,Ue=ie.geometry,$t=ie.material,St=ie.group;if($t.side===Yt&&se.layers.test(G.layers)){const hn=$t.side;$t.side=Le,$t.needsUpdate=!0,io(se,k,G,Ue,$t,St),$t.side=hn,$t.needsUpdate=!0,Dt=!0}}Dt===!0&&(P.updateMultisampleRenderTarget(et),P.updateRenderTargetMipmap(et))}v.setRenderTarget(gt),v.setClearColor(H,$),Ct!==void 0&&(G.viewport=Ct),v.toneMapping=_t}function ir(T,N,k){const G=N.isScene===!0?N.overrideMaterial:null;for(let F=0,et=T.length;F<et;F++){const ht=T[F],gt=ht.object,_t=ht.geometry,Ct=G===null?ht.material:G,Dt=ht.group;gt.layers.test(k.layers)&&io(gt,N,k,_t,Ct,Dt)}}function io(T,N,k,G,F,et){T.onBeforeRender(v,N,k,G,F,et),T.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),F.onBeforeRender(v,N,k,G,T,et),F.transparent===!0&&F.side===Yt&&F.forceSinglePass===!1?(F.side=Le,F.needsUpdate=!0,v.renderBufferDirect(k,N,G,F,T,et),F.side=Nn,F.needsUpdate=!0,v.renderBufferDirect(k,N,G,F,T,et),F.side=Yt):v.renderBufferDirect(k,N,G,F,T,et),T.onAfterRender(v,N,k,G,F,et)}function rr(T,N,k){N.isScene!==!0&&(N=he);const G=Et.get(T),F=d.state.lights,et=d.state.shadowsArray,ht=F.state.version,gt=Mt.getParameters(T,F.state,et,N,k),_t=Mt.getProgramCacheKey(gt);let Ct=G.programs;G.environment=T.isMeshStandardMaterial?N.environment:null,G.fog=N.fog,G.envMap=(T.isMeshStandardMaterial?z:E).get(T.envMap||G.environment),G.envMapRotation=G.environment!==null&&T.envMap===null?N.environmentRotation:T.envMapRotation,Ct===void 0&&(T.addEventListener("dispose",It),Ct=new Map,G.programs=Ct);let Dt=Ct.get(_t);if(Dt!==void 0){if(G.currentProgram===Dt&&G.lightsStateVersion===ht)return so(T,gt),Dt}else gt.uniforms=Mt.getUniforms(T),T.onBeforeCompile(gt,v),Dt=Mt.acquireProgram(gt,_t),Ct.set(_t,Dt),G.uniforms=gt.uniforms;const vt=G.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(vt.clippingPlanes=tt.uniform),so(T,gt),G.needsLights=dc(T),G.lightsStateVersion=ht,G.needsLights&&(vt.ambientLightColor.value=F.state.ambient,vt.lightProbe.value=F.state.probe,vt.directionalLights.value=F.state.directional,vt.directionalLightShadows.value=F.state.directionalShadow,vt.spotLights.value=F.state.spot,vt.spotLightShadows.value=F.state.spotShadow,vt.rectAreaLights.value=F.state.rectArea,vt.ltc_1.value=F.state.rectAreaLTC1,vt.ltc_2.value=F.state.rectAreaLTC2,vt.pointLights.value=F.state.point,vt.pointLightShadows.value=F.state.pointShadow,vt.hemisphereLights.value=F.state.hemi,vt.directionalShadowMap.value=F.state.directionalShadowMap,vt.directionalShadowMatrix.value=F.state.directionalShadowMatrix,vt.spotShadowMap.value=F.state.spotShadowMap,vt.spotLightMatrix.value=F.state.spotLightMatrix,vt.spotLightMap.value=F.state.spotLightMap,vt.pointShadowMap.value=F.state.pointShadowMap,vt.pointShadowMatrix.value=F.state.pointShadowMatrix),G.currentProgram=Dt,G.uniformsList=null,Dt}function ro(T){if(T.uniformsList===null){const N=T.currentProgram.getUniforms();T.uniformsList=Hr.seqWithValue(N.seq,T.uniforms)}return T.uniformsList}function so(T,N){const k=Et.get(T);k.outputColorSpace=N.outputColorSpace,k.batching=N.batching,k.batchingColor=N.batchingColor,k.instancing=N.instancing,k.instancingColor=N.instancingColor,k.instancingMorph=N.instancingMorph,k.skinning=N.skinning,k.morphTargets=N.morphTargets,k.morphNormals=N.morphNormals,k.morphColors=N.morphColors,k.morphTargetsCount=N.morphTargetsCount,k.numClippingPlanes=N.numClippingPlanes,k.numIntersection=N.numClipIntersection,k.vertexAlphas=N.vertexAlphas,k.vertexTangents=N.vertexTangents,k.toneMapping=N.toneMapping}function hc(T,N,k,G,F){N.isScene!==!0&&(N=he),P.resetTextureUnits();const et=N.fog,ht=G.isMeshStandardMaterial?N.environment:null,gt=A===null?v.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Li,_t=(G.isMeshStandardMaterial?z:E).get(G.envMap||ht),Ct=G.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Dt=!!k.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),vt=!!k.morphAttributes.position,qt=!!k.morphAttributes.normal,ie=!!k.morphAttributes.color;let se=Dn;G.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(se=v.toneMapping);const Ue=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,$t=Ue!==void 0?Ue.length:0,St=Et.get(G),hn=d.state.lights;if(nt===!0&&(xt===!0||T!==M)){const We=T===M&&G.id===x;tt.setState(G,T,We)}let Zt=!1;G.version===St.__version?(St.needsLights&&St.lightsStateVersion!==hn.state.version||St.outputColorSpace!==gt||F.isBatchedMesh&&St.batching===!1||!F.isBatchedMesh&&St.batching===!0||F.isBatchedMesh&&St.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&St.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&St.instancing===!1||!F.isInstancedMesh&&St.instancing===!0||F.isSkinnedMesh&&St.skinning===!1||!F.isSkinnedMesh&&St.skinning===!0||F.isInstancedMesh&&St.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&St.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&St.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&St.instancingMorph===!1&&F.morphTexture!==null||St.envMap!==_t||G.fog===!0&&St.fog!==et||St.numClippingPlanes!==void 0&&(St.numClippingPlanes!==tt.numPlanes||St.numIntersection!==tt.numIntersection)||St.vertexAlphas!==Ct||St.vertexTangents!==Dt||St.morphTargets!==vt||St.morphNormals!==qt||St.morphColors!==ie||St.toneMapping!==se||St.morphTargetsCount!==$t)&&(Zt=!0):(Zt=!0,St.__version=G.version);let Ze=St.currentProgram;Zt===!0&&(Ze=rr(G,N,F));let ti=!1,Be=!1,Ni=!1;const ae=Ze.getUniforms(),an=St.uniforms;if(Tt.useProgram(Ze.program)&&(ti=!0,Be=!0,Ni=!0),G.id!==x&&(x=G.id,Be=!0),ti||M!==T){Tt.buffers.depth.getReversed()?(ot.copy(T.projectionMatrix),sh(ot),ah(ot),ae.setValue(B,"projectionMatrix",ot)):ae.setValue(B,"projectionMatrix",T.projectionMatrix),ae.setValue(B,"viewMatrix",T.matrixWorldInverse);const Sn=ae.map.cameraPosition;Sn!==void 0&&Sn.setValue(B,Pt.setFromMatrixPosition(T.matrixWorld)),Ht.logarithmicDepthBuffer&&ae.setValue(B,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&ae.setValue(B,"isOrthographic",T.isOrthographicCamera===!0),M!==T&&(M=T,Be=!0,Ni=!0)}if(F.isSkinnedMesh){ae.setOptional(B,F,"bindMatrix"),ae.setOptional(B,F,"bindMatrixInverse");const We=F.skeleton;We&&(We.boneTexture===null&&We.computeBoneTexture(),ae.setValue(B,"boneTexture",We.boneTexture,P))}F.isBatchedMesh&&(ae.setOptional(B,F,"batchingTexture"),ae.setValue(B,"batchingTexture",F._matricesTexture,P),ae.setOptional(B,F,"batchingIdTexture"),ae.setValue(B,"batchingIdTexture",F._indirectTexture,P),ae.setOptional(B,F,"batchingColorTexture"),F._colorsTexture!==null&&ae.setValue(B,"batchingColorTexture",F._colorsTexture,P));const Fi=k.morphAttributes;if((Fi.position!==void 0||Fi.normal!==void 0||Fi.color!==void 0)&&At.update(F,k,Ze),(Be||St.receiveShadow!==F.receiveShadow)&&(St.receiveShadow=F.receiveShadow,ae.setValue(B,"receiveShadow",F.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(an.envMap.value=_t,an.flipEnvMap.value=_t.isCubeTexture&&_t.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&N.environment!==null&&(an.envMapIntensity.value=N.environmentIntensity),Be&&(ae.setValue(B,"toneMappingExposure",v.toneMappingExposure),St.needsLights&&uc(an,Ni),et&&G.fog===!0&&lt.refreshFogUniforms(an,et),lt.refreshMaterialUniforms(an,G,X,Q,d.state.transmissionRenderTarget[T.id]),Hr.upload(B,ro(St),an,P)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Hr.upload(B,ro(St),an,P),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&ae.setValue(B,"center",F.center),ae.setValue(B,"modelViewMatrix",F.modelViewMatrix),ae.setValue(B,"normalMatrix",F.normalMatrix),ae.setValue(B,"modelMatrix",F.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const We=G.uniformsGroups;for(let Sn=0,yn=We.length;Sn<yn;Sn++){const ao=We[Sn];D.update(ao,Ze),D.bind(ao,Ze)}}return Ze}function uc(T,N){T.ambientLightColor.needsUpdate=N,T.lightProbe.needsUpdate=N,T.directionalLights.needsUpdate=N,T.directionalLightShadows.needsUpdate=N,T.pointLights.needsUpdate=N,T.pointLightShadows.needsUpdate=N,T.spotLights.needsUpdate=N,T.spotLightShadows.needsUpdate=N,T.rectAreaLights.needsUpdate=N,T.hemisphereLights.needsUpdate=N}function dc(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(T,N,k){Et.get(T.texture).__webglTexture=N,Et.get(T.depthTexture).__webglTexture=k;const G=Et.get(T);G.__hasExternalTextures=!0,G.__autoAllocateDepthBuffer=k===void 0,G.__autoAllocateDepthBuffer||zt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,N){const k=Et.get(T);k.__webglFramebuffer=N,k.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(T,N=0,k=0){A=T,b=N,R=k;let G=!0,F=null,et=!1,ht=!1;if(T){const _t=Et.get(T);if(_t.__useDefaultFramebuffer!==void 0)Tt.bindFramebuffer(B.FRAMEBUFFER,null),G=!1;else if(_t.__webglFramebuffer===void 0)P.setupRenderTarget(T);else if(_t.__hasExternalTextures)P.rebindTextures(T,Et.get(T.texture).__webglTexture,Et.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const vt=T.depthTexture;if(_t.__boundDepthTexture!==vt){if(vt!==null&&Et.has(vt)&&(T.width!==vt.image.width||T.height!==vt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(T)}}const Ct=T.texture;(Ct.isData3DTexture||Ct.isDataArrayTexture||Ct.isCompressedArrayTexture)&&(ht=!0);const Dt=Et.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Dt[N])?F=Dt[N][k]:F=Dt[N],et=!0):T.samples>0&&P.useMultisampledRTT(T)===!1?F=Et.get(T).__webglMultisampledFramebuffer:Array.isArray(Dt)?F=Dt[k]:F=Dt,C.copy(T.viewport),L.copy(T.scissor),O=T.scissorTest}else C.copy(yt).multiplyScalar(X).floor(),L.copy(Ot).multiplyScalar(X).floor(),O=ee;if(Tt.bindFramebuffer(B.FRAMEBUFFER,F)&&G&&Tt.drawBuffers(T,F),Tt.viewport(C),Tt.scissor(L),Tt.setScissorTest(O),et){const _t=Et.get(T.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+N,_t.__webglTexture,k)}else if(ht){const _t=Et.get(T.texture),Ct=N||0;B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,_t.__webglTexture,k||0,Ct)}x=-1},this.readRenderTargetPixels=function(T,N,k,G,F,et,ht){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let gt=Et.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ht!==void 0&&(gt=gt[ht]),gt){Tt.bindFramebuffer(B.FRAMEBUFFER,gt);try{const _t=T.texture,Ct=_t.format,Dt=_t.type;if(!Ht.textureFormatReadable(Ct)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ht.textureTypeReadable(Dt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=T.width-G&&k>=0&&k<=T.height-F&&B.readPixels(N,k,G,F,Nt.convert(Ct),Nt.convert(Dt),et)}finally{const _t=A!==null?Et.get(A).__webglFramebuffer:null;Tt.bindFramebuffer(B.FRAMEBUFFER,_t)}}},this.readRenderTargetPixelsAsync=async function(T,N,k,G,F,et,ht){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let gt=Et.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ht!==void 0&&(gt=gt[ht]),gt){const _t=T.texture,Ct=_t.format,Dt=_t.type;if(!Ht.textureFormatReadable(Ct))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ht.textureTypeReadable(Dt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=T.width-G&&k>=0&&k<=T.height-F){Tt.bindFramebuffer(B.FRAMEBUFFER,gt);const vt=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,vt),B.bufferData(B.PIXEL_PACK_BUFFER,et.byteLength,B.STREAM_READ),B.readPixels(N,k,G,F,Nt.convert(Ct),Nt.convert(Dt),0);const qt=A!==null?Et.get(A).__webglFramebuffer:null;Tt.bindFramebuffer(B.FRAMEBUFFER,qt);const ie=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await rh(B,ie,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,vt),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,et),B.deleteBuffer(vt),B.deleteSync(ie),et}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,N=null,k=0){T.isTexture!==!0&&(qi("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,T=arguments[1]);const G=Math.pow(2,-k),F=Math.floor(T.image.width*G),et=Math.floor(T.image.height*G),ht=N!==null?N.x:0,gt=N!==null?N.y:0;P.setTexture2D(T,0),B.copyTexSubImage2D(B.TEXTURE_2D,k,0,0,ht,gt,F,et),Tt.unbindTexture()},this.copyTextureToTexture=function(T,N,k=null,G=null,F=0){T.isTexture!==!0&&(qi("WebGLRenderer: copyTextureToTexture function signature has changed."),G=arguments[0]||null,T=arguments[1],N=arguments[2],F=arguments[3]||0,k=null);let et,ht,gt,_t,Ct,Dt,vt,qt,ie;const se=T.isCompressedTexture?T.mipmaps[F]:T.image;k!==null?(et=k.max.x-k.min.x,ht=k.max.y-k.min.y,gt=k.isBox3?k.max.z-k.min.z:1,_t=k.min.x,Ct=k.min.y,Dt=k.isBox3?k.min.z:0):(et=se.width,ht=se.height,gt=se.depth||1,_t=0,Ct=0,Dt=0),G!==null?(vt=G.x,qt=G.y,ie=G.z):(vt=0,qt=0,ie=0);const Ue=Nt.convert(N.format),$t=Nt.convert(N.type);let St;N.isData3DTexture?(P.setTexture3D(N,0),St=B.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(P.setTexture2DArray(N,0),St=B.TEXTURE_2D_ARRAY):(P.setTexture2D(N,0),St=B.TEXTURE_2D),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,N.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,N.unpackAlignment);const hn=B.getParameter(B.UNPACK_ROW_LENGTH),Zt=B.getParameter(B.UNPACK_IMAGE_HEIGHT),Ze=B.getParameter(B.UNPACK_SKIP_PIXELS),ti=B.getParameter(B.UNPACK_SKIP_ROWS),Be=B.getParameter(B.UNPACK_SKIP_IMAGES);B.pixelStorei(B.UNPACK_ROW_LENGTH,se.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,se.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,_t),B.pixelStorei(B.UNPACK_SKIP_ROWS,Ct),B.pixelStorei(B.UNPACK_SKIP_IMAGES,Dt);const Ni=T.isDataArrayTexture||T.isData3DTexture,ae=N.isDataArrayTexture||N.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){const an=Et.get(T),Fi=Et.get(N),We=Et.get(an.__renderTarget),Sn=Et.get(Fi.__renderTarget);Tt.bindFramebuffer(B.READ_FRAMEBUFFER,We.__webglFramebuffer),Tt.bindFramebuffer(B.DRAW_FRAMEBUFFER,Sn.__webglFramebuffer);for(let yn=0;yn<gt;yn++)Ni&&B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Et.get(T).__webglTexture,F,Dt+yn),T.isDepthTexture?(ae&&B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Et.get(N).__webglTexture,F,ie+yn),B.blitFramebuffer(_t,Ct,et,ht,vt,qt,et,ht,B.DEPTH_BUFFER_BIT,B.NEAREST)):ae?B.copyTexSubImage3D(St,F,vt,qt,ie+yn,_t,Ct,et,ht):B.copyTexSubImage2D(St,F,vt,qt,ie+yn,_t,Ct,et,ht);Tt.bindFramebuffer(B.READ_FRAMEBUFFER,null),Tt.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else ae?T.isDataTexture||T.isData3DTexture?B.texSubImage3D(St,F,vt,qt,ie,et,ht,gt,Ue,$t,se.data):N.isCompressedArrayTexture?B.compressedTexSubImage3D(St,F,vt,qt,ie,et,ht,gt,Ue,se.data):B.texSubImage3D(St,F,vt,qt,ie,et,ht,gt,Ue,$t,se):T.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,F,vt,qt,et,ht,Ue,$t,se.data):T.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,F,vt,qt,se.width,se.height,Ue,se.data):B.texSubImage2D(B.TEXTURE_2D,F,vt,qt,et,ht,Ue,$t,se);B.pixelStorei(B.UNPACK_ROW_LENGTH,hn),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Zt),B.pixelStorei(B.UNPACK_SKIP_PIXELS,Ze),B.pixelStorei(B.UNPACK_SKIP_ROWS,ti),B.pixelStorei(B.UNPACK_SKIP_IMAGES,Be),F===0&&N.generateMipmaps&&B.generateMipmap(St),Tt.unbindTexture()},this.copyTextureToTexture3D=function(T,N,k=null,G=null,F=0){return T.isTexture!==!0&&(qi("WebGLRenderer: copyTextureToTexture3D function signature has changed."),k=arguments[0]||null,G=arguments[1]||null,T=arguments[2],N=arguments[3],F=arguments[4]||0),qi('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,N,k,G,F)},this.initRenderTarget=function(T){Et.get(T).__webglFramebuffer===void 0&&P.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?P.setTextureCube(T,0):T.isData3DTexture?P.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?P.setTexture2DArray(T,0):P.setTexture2D(T,0),Tt.unbindTexture()},this.resetState=function(){b=0,R=0,A=null,Tt.reset(),ne.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return vn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Xt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Xt._getUnpackColorSpace()}}class Si{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Lt(t),this.near=e,this.far=n}clone(){return new Si(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class vm extends Se{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new sn,this.environmentIntensity=1,this.environmentRotation=new sn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class xm{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=La,this.updateRanges=[],this.version=0,this.uuid=Un()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,s=this.stride;i<s;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Un()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Un()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ae=new U;class Vr{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.applyMatrix4(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.applyNormalMatrix(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.transformDirection(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=ln(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Qt(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=Qt(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=Qt(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=Qt(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=Qt(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=ln(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=ln(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=ln(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=ln(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=Qt(e,this.array),n=Qt(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=Qt(e,this.array),n=Qt(n,this.array),i=Qt(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=Qt(e,this.array),n=Qt(n,this.array),i=Qt(i,this.array),s=Qt(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return new Pe(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Vr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class nc extends Qn{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new Lt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let mi;const ki=new U,gi=new U,_i=new U,vi=new Rt,Gi=new Rt,ic=new ce,wr=new U,Vi=new U,Ar=new U,sl=new Rt,Cs=new Rt,al=new Rt;class Mm extends Se{constructor(t=new nc){if(super(),this.isSprite=!0,this.type="Sprite",mi===void 0){mi=new Ie;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new xm(e,5);mi.setIndex([0,1,2,0,2,3]),mi.setAttribute("position",new Vr(n,3,0,!1)),mi.setAttribute("uv",new Vr(n,2,3,!1))}this.geometry=mi,this.material=t,this.center=new Rt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),gi.setFromMatrixScale(this.matrixWorld),ic.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),_i.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&gi.multiplyScalar(-_i.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const o=this.center;Rr(wr.set(-.5,-.5,0),_i,o,gi,i,s),Rr(Vi.set(.5,-.5,0),_i,o,gi,i,s),Rr(Ar.set(.5,.5,0),_i,o,gi,i,s),sl.set(0,0),Cs.set(1,0),al.set(1,1);let a=t.ray.intersectTriangle(wr,Vi,Ar,!1,ki);if(a===null&&(Rr(Vi.set(-.5,.5,0),_i,o,gi,i,s),Cs.set(0,1),a=t.ray.intersectTriangle(wr,Ar,Vi,!1,ki),a===null))return;const l=t.ray.origin.distanceTo(ki);l<t.near||l>t.far||e.push({distance:l,point:ki.clone(),uv:qe.getInterpolation(ki,wr,Vi,Ar,sl,Cs,al,new Rt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Rr(r,t,e,n,i,s){vi.subVectors(r,e).addScalar(.5).multiply(n),i!==void 0?(Gi.x=s*vi.x-i*vi.y,Gi.y=i*vi.x+s*vi.y):Gi.copy(vi),r.copy(t),r.x+=Gi.x,r.y+=Gi.y,r.applyMatrix4(ic)}class $i extends we{constructor(t,e,n,i,s,o,a,l,c){super(t,e,n,i,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ya extends Ie{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const s=[],o=[],a=[],l=[],c=new U,h=new Rt;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){const p=n+u/e*i;c.x=t*Math.cos(p),c.y=t*Math.sin(p),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[f]/t+1)/2,h.y=(o[f+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new de(o,3)),this.setAttribute("normal",new de(a,3)),this.setAttribute("uv",new de(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ya(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class oe extends Ie{constructor(t=1,e=1,n=1,i=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const h=[],u=[],f=[],p=[];let g=0;const _=[],m=n/2;let d=0;y(),o===!1&&(t>0&&S(!0),e>0&&S(!1)),this.setIndex(h),this.setAttribute("position",new de(u,3)),this.setAttribute("normal",new de(f,3)),this.setAttribute("uv",new de(p,2));function y(){const v=new U,w=new U;let b=0;const R=(e-t)/n;for(let A=0;A<=s;A++){const x=[],M=A/s,C=M*(e-t)+t;for(let L=0;L<=i;L++){const O=L/i,H=O*l+a,$=Math.sin(H),V=Math.cos(H);w.x=C*$,w.y=-M*n+m,w.z=C*V,u.push(w.x,w.y,w.z),v.set($,R,V).normalize(),f.push(v.x,v.y,v.z),p.push(O,1-M),x.push(g++)}_.push(x)}for(let A=0;A<i;A++)for(let x=0;x<s;x++){const M=_[x][A],C=_[x+1][A],L=_[x+1][A+1],O=_[x][A+1];(t>0||x!==0)&&(h.push(M,C,O),b+=3),(e>0||x!==s-1)&&(h.push(C,L,O),b+=3)}c.addGroup(d,b,0),d+=b}function S(v){const w=g,b=new Rt,R=new U;let A=0;const x=v===!0?t:e,M=v===!0?1:-1;for(let L=1;L<=i;L++)u.push(0,m*M,0),f.push(0,M,0),p.push(.5,.5),g++;const C=g;for(let L=0;L<=i;L++){const H=L/i*l+a,$=Math.cos(H),V=Math.sin(H);R.x=x*V,R.y=m*M,R.z=x*$,u.push(R.x,R.y,R.z),f.push(0,M,0),b.x=$*.5+.5,b.y=V*.5*M+.5,p.push(b.x,b.y),g++}for(let L=0;L<i;L++){const O=w+L,H=C+L;v===!0?h.push(H,H+1,O):h.push(H+1,H,O),A+=3}c.addGroup(d,A,v===!0?1:2),d+=A}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new oe(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Pn extends oe{constructor(t=1,e=1,n=32,i=1,s=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,s,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(t){return new Pn(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class $a extends Ie{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const s=[],o=[];a(i),c(n),h(),this.setAttribute("position",new de(s,3)),this.setAttribute("normal",new de(s.slice(),3)),this.setAttribute("uv",new de(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(y){const S=new U,v=new U,w=new U;for(let b=0;b<e.length;b+=3)p(e[b+0],S),p(e[b+1],v),p(e[b+2],w),l(S,v,w,y)}function l(y,S,v,w){const b=w+1,R=[];for(let A=0;A<=b;A++){R[A]=[];const x=y.clone().lerp(v,A/b),M=S.clone().lerp(v,A/b),C=b-A;for(let L=0;L<=C;L++)L===0&&A===b?R[A][L]=x:R[A][L]=x.clone().lerp(M,L/C)}for(let A=0;A<b;A++)for(let x=0;x<2*(b-A)-1;x++){const M=Math.floor(x/2);x%2===0?(f(R[A][M+1]),f(R[A+1][M]),f(R[A][M])):(f(R[A][M+1]),f(R[A+1][M+1]),f(R[A+1][M]))}}function c(y){const S=new U;for(let v=0;v<s.length;v+=3)S.x=s[v+0],S.y=s[v+1],S.z=s[v+2],S.normalize().multiplyScalar(y),s[v+0]=S.x,s[v+1]=S.y,s[v+2]=S.z}function h(){const y=new U;for(let S=0;S<s.length;S+=3){y.x=s[S+0],y.y=s[S+1],y.z=s[S+2];const v=m(y)/2/Math.PI+.5,w=d(y)/Math.PI+.5;o.push(v,1-w)}g(),u()}function u(){for(let y=0;y<o.length;y+=6){const S=o[y+0],v=o[y+2],w=o[y+4],b=Math.max(S,v,w),R=Math.min(S,v,w);b>.9&&R<.1&&(S<.2&&(o[y+0]+=1),v<.2&&(o[y+2]+=1),w<.2&&(o[y+4]+=1))}}function f(y){s.push(y.x,y.y,y.z)}function p(y,S){const v=y*3;S.x=t[v+0],S.y=t[v+1],S.z=t[v+2]}function g(){const y=new U,S=new U,v=new U,w=new U,b=new Rt,R=new Rt,A=new Rt;for(let x=0,M=0;x<s.length;x+=9,M+=6){y.set(s[x+0],s[x+1],s[x+2]),S.set(s[x+3],s[x+4],s[x+5]),v.set(s[x+6],s[x+7],s[x+8]),b.set(o[M+0],o[M+1]),R.set(o[M+2],o[M+3]),A.set(o[M+4],o[M+5]),w.copy(y).add(S).add(v).divideScalar(3);const C=m(w);_(b,M+0,y,C),_(R,M+2,S,C),_(A,M+4,v,C)}}function _(y,S,v,w){w<0&&y.x===1&&(o[S]=y.x-1),v.x===0&&v.z===0&&(o[S]=w/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function d(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $a(t.vertices,t.indices,t.radius,t.details)}}class Za extends $a{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,o,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Za(t.radius,t.detail)}}class Ka extends Ie{constructor(t=.5,e=1,n=32,i=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const a=[],l=[],c=[],h=[];let u=t;const f=(e-t)/i,p=new U,g=new Rt;for(let _=0;_<=i;_++){for(let m=0;m<=n;m++){const d=s+m/n*o;p.x=u*Math.cos(d),p.y=u*Math.sin(d),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/e+1)/2,g.y=(p.y/e+1)/2,h.push(g.x,g.y)}u+=f}for(let _=0;_<i;_++){const m=_*(n+1);for(let d=0;d<n;d++){const y=d+m,S=y,v=y+n+1,w=y+n+2,b=y+1;a.push(S,v,b),a.push(v,w,b)}}this.setIndex(a),this.setAttribute("position",new de(l,3)),this.setAttribute("normal",new de(c,3)),this.setAttribute("uv",new de(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ka(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Wr extends Ie{constructor(t=1,e=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new U,f=new U,p=[],g=[],_=[],m=[];for(let d=0;d<=n;d++){const y=[],S=d/n;let v=0;d===0&&o===0?v=.5/e:d===n&&l===Math.PI&&(v=-.5/e);for(let w=0;w<=e;w++){const b=w/e;u.x=-t*Math.cos(i+b*s)*Math.sin(o+S*a),u.y=t*Math.cos(o+S*a),u.z=t*Math.sin(i+b*s)*Math.sin(o+S*a),g.push(u.x,u.y,u.z),f.copy(u).normalize(),_.push(f.x,f.y,f.z),m.push(b+v,1-S),y.push(c++)}h.push(y)}for(let d=0;d<n;d++)for(let y=0;y<e;y++){const S=h[d][y+1],v=h[d][y],w=h[d+1][y],b=h[d+1][y+1];(d!==0||o>0)&&p.push(S,v,b),(d!==n-1||l<Math.PI)&&p.push(v,w,b)}this.setIndex(p),this.setAttribute("position",new de(g,3)),this.setAttribute("normal",new de(_,3)),this.setAttribute("uv",new de(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wr(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Sm extends Qn{static get type(){return"MeshPhongMaterial"}constructor(t){super(),this.isMeshPhongMaterial=!0,this.color=new Lt(16777215),this.specular=new Lt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Lt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Va,this.normalScale=new Rt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new sn,this.combine=qr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class it extends Qn{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Lt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Lt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Va,this.normalScale=new Rt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new sn,this.combine=qr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}const ol={enabled:!1,files:{},add:function(r,t){this.enabled!==!1&&(this.files[r]=t)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class ym{constructor(t,e,n){const i=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,s===!1&&i.onStart!==void 0&&i.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=c.length;u<f;u+=2){const p=c[u],g=c[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}}const Em=new ym;class ja{constructor(t){this.manager=t!==void 0?t:Em,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(i,s){n.load(t,i,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}ja.DEFAULT_MATERIAL_NAME="__DEFAULT";class Tm extends ja{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=this,o=ol.get(t);if(o!==void 0)return s.manager.itemStart(t),setTimeout(function(){e&&e(o),s.manager.itemEnd(t)},0),o;const a=ji("img");function l(){h(),ol.add(t,this),e&&e(this),s.manager.itemEnd(t)}function c(u){h(),i&&i(u),s.manager.itemError(t),s.manager.itemEnd(t)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(t),a.src=t,a}}class bm extends ja{constructor(t){super(t)}load(t,e,n,i){const s=new we,o=new Tm(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){s.image=a,s.needsUpdate=!0,e!==void 0&&e(s)},n,i),s}}class Kr extends Se{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Lt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Ps extends Kr{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Se.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Lt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Ls=new ce,ll=new U,cl=new U;class rc{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Rt(512,512),this.map=null,this.mapPass=null,this.matrix=new ce,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Xa,this._frameExtents=new Rt(1,1),this._viewportCount=1,this._viewports=[new te(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;ll.setFromMatrixPosition(t.matrixWorld),e.position.copy(ll),cl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(cl),e.updateMatrixWorld(),Ls.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ls),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ls)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const hl=new ce,Wi=new U,Is=new U;class wm extends rc{constructor(){super(new Ge(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Rt(4,2),this._viewportCount=6,this._viewports=[new te(2,1,1,1),new te(0,1,1,1),new te(3,1,1,1),new te(1,1,1,1),new te(3,0,1,1),new te(1,0,1,1)],this._cubeDirections=[new U(1,0,0),new U(-1,0,0),new U(0,0,1),new U(0,0,-1),new U(0,1,0),new U(0,-1,0)],this._cubeUps=[new U(0,1,0),new U(0,1,0),new U(0,1,0),new U(0,1,0),new U(0,0,1),new U(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,s=t.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Wi.setFromMatrixPosition(t.matrixWorld),n.position.copy(Wi),Is.copy(n.position),Is.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Is),n.updateMatrixWorld(),i.makeTranslation(-Wi.x,-Wi.y,-Wi.z),hl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(hl)}}class Wn extends Kr{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new wm}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Am extends rc{constructor(){super(new Kl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ul extends Kr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Se.DEFAULT_UP),this.updateMatrix(),this.target=new Se,this.shadow=new Am}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Ds extends Kr{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Fa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Fa);const I=4,Cn=3.2,Us=2,Ns=1.7,dl=.6,Fs=2,fl=.35,pl=1.2,Cr=2.1,Rm=1,Cm=1,Pm=1.85,sc=260,Lm=210,Xi=8884384,er=["MMMMM##########","MMMMM##########","MMSMM##########","MMTMM##########","MMTMM##########","MMTMM##########","##.........####","##...........##","##...........##","##...........##","##...........##","##...........##","##...........##","######...######","######...######","######.P.######","#######F#######"],Ne=er.length,Qe=er[0].length;function me(r,t){if(t<0||t>=Ne||r<0||r>=Qe)return"building";const e=er[t][r];return e==="#"?"building":e==="o"?"barrel":e==="M"?"mountain":e==="T"?"tunnel":e==="S"?"stairs":e==="F"?"forestgate":"street"}function ml(r,t){const e=me(r,t);return e==="tunnel"||e==="stairs"}function Im(r,t){const e=me(r,t);return e==="street"||e==="barrel"||e==="tunnel"||e==="stairs"||e==="forestgate"}function Dm(){for(let r=0;r<Ne;r++){const t=er[r].indexOf("P");if(t>=0)return{col:t,row:r}}return{col:1,row:1}}function gl(){for(let r=0;r<Ne;r++){const t=er[r].indexOf("F");if(t>=0)return{col:t,row:r}}return{col:7,row:Ne-1}}const nr=["#######################","#.TT.rrTT.f.TTT..rfTTT#","#TTT..rTTT=NfTTT.bT...#","#r.fTTT.T==TTTfTTT.rfT#","#T.rbbTf==Tfr.TbTbTbr.#","#.TbrfT===fTr.fTf.bTTT#","#TT.T..=TTfTTTrr.TrT.T#","#..TTTf=TbrTfbTTfTffTf#","#Tbfb.T=fffbrTbfT.bTf.#","#r....===T..Tb.TT..TT.#","#fTTTTTf===T..ffrf.==E#","#T.TTTTff==.fb.T..===f#","#T.rT.T.f.==..TTf==T==#","#.fTTTTf..====Tf==TTT=#","#.T===========j==Tff.=#","#T.T==.TT...==TTfff===#","#T====TTT....=T.bT.T=T#","#W==T=f...T.T=TTT.T==T#","#T.=.=fTfTbrT=T.TT==ff#","#TT===f..TTTT=ffT.=ffr#","#bT.===ffT.TT==T..=.T.#","#rTfT.==T.TT==.TT==f.b#","#T...==fTbTT=Tf..==.TT#","#ff===TfTTTT=.f...=.fT#","#TTfTfTrT.f===...k=..f#","#.bb.T..T.f=TTT...==Tf#","#T.TTT.T.bf=.T........#","#T.TTTrbTbT==sTTT.bTTT#","#fTTT.TTrT.PT.TrTT.TTT#","###########V###########"],Xr=nr.length,Ua=nr[0].length;function $n(r,t){if(t<0||t>=Xr||r<0||r>=Ua)return"edge";switch(nr[t][r]){case".":return"grass";case"=":return"path";case"T":return"tree";case"b":return"bush";case"r":return"rock";case"f":return"foliage";case"k":return"skull";case"s":case"j":case"N":case"E":case"W":return"sign";case"V":return"gate";case"P":return"spawn";default:return"edge"}}function _l(r,t){const e=$n(r,t);return e==="grass"||e==="path"||e==="tree"||e==="foliage"||e==="skull"||e==="gate"||e==="spawn"}function Um(r,t){switch(nr[t]?.[r]){case"s":return["Trilha da Mata Sussurrante.","A neblina nunca se levanta por aqui. Dizem que ela se lembra de quem passa.","Siga a trilha até a encruzilhada."];case"j":return["Encruzilhada da Mata.","Ao sul: Vilarejo de Grimhollow.","Norte: Montanhas Cinzentas · Leste: o Charco · Oeste: as Ruínas.","(Esses caminhos se abrirão em breve.)"];case"N":return["Trilha das Montanhas Cinzentas.","O caminho sobe rumo ao nevoeiro gelado.","(Bloqueado — em breve.)"];case"E":return["Trilha do Charco.","Um cheiro de água parada vem do leste.","(Bloqueado — em breve.)"];case"W":return["Trilha das Ruínas.","Pedras antigas espreitam entre as árvores a oeste.","(Bloqueado — em breve.)"];default:return["Uma placa de madeira, gasta pelo tempo."]}}function Os(r){for(let t=0;t<Xr;t++){const e=nr[t].indexOf(r);if(e>=0)return{col:e,row:t}}return{col:8,row:Xr-2}}const Pr=4;function ye(r,t){const e=document.createElement("canvas");e.width=r*Pr,e.height=t*Pr;const n=e.getContext("2d");return n.scale(Pr,Pr),{c:e,ctx:n}}function Ye(r,t=1,e=1){const n=new $i(r);return n.magFilter=Oe,n.minFilter=en,n.generateMipmaps=!0,n.anisotropy=8,n.wrapS=Zi,n.wrapT=Zi,n.repeat.set(t,e),n.colorSpace=Me,n}function Ui(r){const t=new $i(r);return t.magFilter=Oe,t.minFilter=en,t.generateMipmaps=!0,t.anisotropy=8,t.wrapS=tn,t.wrapT=tn,t.colorSpace=Me,t}const De=r=>{let t=r>>>0;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}};function pe(r=1){const{c:n,ctx:i}=ye(64,64),s=De(r),o=5,a=64/o;for(let l=0;l<o;l++){const c=92+Math.floor(s()*30),h=Math.round(l*a),u=Math.round((l+1)*a);for(let f=h;f<u;f++)for(let p=0;p<64;p++){const g=Math.sin(p*.4+l)*6+(s()-.5)*14,_=c+g;i.fillStyle=`rgb(${_|0},${_*.62|0},${_*.34|0})`,i.fillRect(f,p,1,1)}if(i.fillStyle="rgba(30,16,6,0.8)",i.fillRect(h,0,1,64),i.fillStyle="rgba(255,220,170,0.10)",i.fillRect(h+1,0,1,64),s()<.5){const f=Math.floor(s()*64);i.fillStyle="rgba(40,22,10,0.7)",i.beginPath(),i.arc(h+a/2,f,2,0,Math.PI*2),i.fill()}}return Ye(n)}function vl(r=7){const{c:n,ctx:i}=ye(160,160),s=De(r);i.fillStyle="#4a4136",i.fillRect(0,0,160,160);for(let l=0;l<900;l++){const c=58+s()*26|0;i.fillStyle=`rgba(${c},${c*.88|0},${c*.72|0},0.4)`,i.fillRect(s()*160,s()*160,2,2)}const o=22,a=(l,c,h)=>{const u=6+Math.floor(s()*4),f=[];for(let v=0;v<u;v++){const w=v/u*Math.PI*2,b=h*(.78+s()*.3);f.push([l+Math.cos(w)*b,c+Math.sin(w)*b*.92])}const p=()=>{i.beginPath(),f.forEach((v,w)=>w?i.lineTo(v[0],v[1]):i.moveTo(v[0],v[1])),i.closePath()},g=120+Math.floor(s()*34),_=s();let m,d,y;_<.45?(m=g,d=g*.96|0,y=g*.9|0):_<.75?(m=g*.9|0,d=g*.93|0,y=g*.96|0):(m=Math.min(255,g*1|0),d=g*.92|0,y=g*.78|0),i.save(),i.translate(.6,1),p(),i.fillStyle="rgba(40,34,26,0.35)",i.fill(),i.restore(),p(),i.fillStyle=`rgb(${m},${d},${y})`,i.fill();const S=i.createLinearGradient(l,c-h,l,c+h);S.addColorStop(0,"rgba(255,250,236,0.1)"),S.addColorStop(.5,"rgba(255,255,255,0)"),S.addColorStop(1,"rgba(30,24,18,0.14)"),p(),i.fillStyle=S,i.fill()};for(let l=-1;l<160/o+1;l++)for(let c=-1;c<160/o+1;c++){const h=c*o+(l&1?o/2:0)+(s()-.5)*5,u=l*o+(s()-.5)*5;a(h,u,o*.52+s()*3)}return Ye(n)}function Bs(r=3){const{c:n,ctx:i}=ye(64,64);i.fillStyle="#6e5320",i.fillRect(0,0,64,64);const s=De(r);for(let o=0;o<900;o++){const a=Math.floor(s()*64),l=Math.floor(s()*64),c=3+Math.floor(s()*6),h=120+Math.floor(s()*90);i.strokeStyle=`rgb(${h},${h*.78|0},${h*.4|0})`,i.beginPath(),i.moveTo(a,l),i.lineTo(a+(s()-.5)*2,l+c),i.stroke()}i.fillStyle="rgba(30,20,6,0.35)";for(let o=0;o<64;o+=14)i.fillRect(0,o,64,2);return Ye(n)}function xl(r=11){const{c:n,ctx:i}=ye(48,64);i.fillStyle="#5a4a38",i.fillRect(0,0,48,64),i.fillStyle="#4a2f16",i.fillRect(6,6,36,58);for(let s=6;s<42;s+=8)i.fillStyle="rgba(20,10,4,0.7)",i.fillRect(s,6,1,58),i.fillStyle="rgba(120,80,40,0.25)",i.fillRect(s+1,6,1,58);return i.fillStyle="#20242a",i.fillRect(8,14,32,3),i.fillRect(8,46,32,3),i.fillStyle="#c9a227",i.fillRect(34,64/2,3,3),Ye(n)}function Nm(r=13){const{c:n,ctx:i}=ye(40,40);return i.clearRect(0,0,40,40),i.fillStyle="#3a2512",i.fillRect(4,4,32,32),i.fillStyle="#10161c",i.fillRect(8,8,24,24),i.fillStyle="rgba(120,150,170,0.25)",i.fillRect(9,9,6,22),i.fillStyle="#2a1a0c",i.fillRect(40/2-1,4,2,32),i.fillRect(4,40/2-1,32,2),Ye(n)}function zs(r=17){const{c:n,ctx:i}=ye(48,32),s=De(r);for(let o=0;o<48;o++){const a=96+Math.sin(o/48*Math.PI)*46+(s()-.5)*10;i.fillStyle=`rgb(${a|0},${a*.6|0},${a*.32|0})`,i.fillRect(o,0,1,32),o%6===0&&(i.fillStyle="rgba(20,10,4,0.6)",i.fillRect(o,0,1,32))}return i.fillStyle="#3a3f47",i.fillRect(0,3,48,3),i.fillRect(0,26,48,3),i.fillStyle="rgba(200,210,220,0.3)",i.fillRect(0,3,48,1),Ye(n)}function xi(r=31){const{c:n,ctx:i}=ye(96,96),s=De(r);i.fillStyle="#3b3a38",i.fillRect(0,0,96,96);const o=16;for(let a=0,l=0;a<96;a+=o,l++){const c=l%2?16:0;for(let h=-16;h<96;h+=32){const u=h+c,f=96+Math.floor(s()*40);i.fillStyle=`rgb(${f},${f*.98|0},${f*.92|0})`,i.fillRect(u+1,a+1,30,o-2),i.fillStyle="rgba(0,0,0,0.28)",i.fillRect(u+1,a+o-3,30,2),i.fillStyle="rgba(255,255,255,0.12)",i.fillRect(u+1,a+1,30,1),s()<.4&&(i.fillStyle=`rgba(40,50,40,${.1+s()*.15})`,i.beginPath(),i.ellipse(u+8+s()*14,a+6+s()*6,4,3,0,0,Math.PI*2),i.fill())}}return Ye(n)}function Fm(r=1){const{c:n,ctx:i}=ye(76,128);i.clearRect(0,0,76,128),i.lineJoin="round",i.lineCap="round";const s=De(r),o="#241812",a=76/2,l=29,c=13,h=(A,x)=>{const M=parseInt(A.slice(1),16);let C=M>>16&255,L=M>>8&255,O=M&255;if(x<0){const H=1+x;C*=H,L*=H,O*=H}else C+=(255-C)*x,L+=(255-L)*x,O+=(255-O)*x;return`rgb(${C|0},${L|0},${O|0})`},u=(A,x,M=2.2)=>{i.beginPath(),A.forEach(([C,L],O)=>O?i.lineTo(C,L):i.moveTo(C,L)),i.closePath(),i.fillStyle=x,i.fill(),M&&(i.strokeStyle=o,i.lineWidth=M,i.stroke())},f=(A,x,M,C,L=2)=>{i.beginPath(),i.arc(A,x,M,0,Math.PI*2),i.fillStyle=C,i.fill(),L&&(i.strokeStyle=o,i.lineWidth=L,i.stroke())},p=(A,x,M,C,L,O,H=2)=>{i.beginPath(),Na(i,A,x,M,C,L),i.fillStyle=O,i.fill(),H&&(i.strokeStyle=o,i.lineWidth=H,i.stroke())},g=(A,x)=>{i.save(),i.beginPath(),A.forEach(([M,C],L)=>L?i.lineTo(M,C):i.moveTo(M,C)),i.closePath(),i.clip(),i.fillStyle=x,i.fillRect(a+2,40,44,90),i.restore()},_=["#f4cc9c","#eab488","#d89a68"],m=_[Math.floor(s()*_.length)],d=h(m,-.16),y=Math.floor(s()*5);i.fillStyle="rgba(0,0,0,0.22)",i.beginPath(),i.ellipse(a,123,15,4.5,0,0,Math.PI*2),i.fill();const S=()=>{i.fillStyle=d,i.fillRect(a-4,36,8,12),f(a,l,c,m),i.save(),i.beginPath(),i.arc(a,l,c,0,Math.PI*2),i.clip(),i.fillStyle="rgba(0,0,0,0.10)",i.fillRect(a+3,l-c,c,2*c),i.restore();for(const A of[-1,1]){const x=a+A*4.6;i.fillStyle="#fff",i.beginPath(),i.ellipse(x,l-.3,2.3,3.6,0,0,Math.PI*2),i.fill(),i.fillStyle="#241812",i.beginPath(),i.ellipse(x+A*.3,l,1.6,3.1,0,0,Math.PI*2),i.fill(),i.fillStyle="#fff",i.beginPath(),i.arc(x-.7,l-1.8,.8,0,Math.PI*2),i.fill()}i.strokeStyle=o,i.lineWidth=1.6,i.beginPath(),i.moveTo(a-8,l-5.5),i.lineTo(a-2.5,l-6),i.moveTo(a+2.5,l-6),i.lineTo(a+8,l-5.5),i.stroke(),i.fillStyle=d,i.fillRect(a-.6,l+3,1.3,2.4),i.strokeStyle="#9c4a38",i.lineWidth=1.4,i.beginPath(),i.arc(a,l+6,2.2,.18*Math.PI,.82*Math.PI),i.stroke(),i.fillStyle="rgba(232,120,110,0.28)",i.beginPath(),i.arc(a-7.5,l+4,2,0,Math.PI*2),i.arc(a+7.5,l+4,2,0,Math.PI*2),i.fill()},v=A=>{i.beginPath(),i.arc(a,l-1,c+1,Math.PI*.98,Math.PI*2.02),i.lineTo(a+c,l+2),i.lineTo(a+8,l-3),i.lineTo(a+5,l-1),i.lineTo(a+2,l-4),i.lineTo(a-1,l-1),i.lineTo(a-4,l-4),i.lineTo(a-7,l-1),i.lineTo(a-c,l+2),i.closePath(),i.fillStyle=A,i.fill(),i.strokeStyle=o,i.lineWidth=2,i.stroke();const x=[-11,-7,-3,1,5,9,12];for(const M of x){const C=a+M*.9,L=Math.max(0,c*c-M*M),O=l-Math.sqrt(L)+3,H=a+M*1.7+(M>0?2:-2),$=O-10-(12-Math.abs(M))*.5;u([[C-3.4,O],[H,$],[C+3.4,O]],A,1.8)}i.strokeStyle=h(A,.35),i.lineWidth=1.3,i.beginPath(),i.moveTo(a-4,l-6),i.lineTo(a-2,l-c+1),i.moveTo(a+3,l-6),i.lineTo(a+5,l-c+2),i.stroke()},w=(A,x)=>{u([[a-12,48],[a-20,52],[a-18,74],[a-11,70]],A,2),u([[a+12,48],[a+20,52],[a+18,74],[a+11,70]],A,2),f(a-18,76,3.6,x,1.8),f(a+18,76,3.6,x,1.8)},b=(A,x)=>{u([[a-9,82],[a-1,82],[a-2,112],[a-9,112]],A,2),u([[a+1,82],[a+9,82],[a+9,112],[a+2,112]],A,2),p(a-11,110,10,11,3,x,2),p(a+1,110,10,11,3,x,2)},R=(A,x)=>{u(A,x,2.2),g(A,"rgba(0,0,0,0.16)")};if(y===0)b("#2f6f9a","#6a4526"),R([[a-12,46],[a+12,46],[a+14,84],[a-14,84]],"#37a34a"),u([[a-14,80],[a+14,80],[a+14,84],[a-14,84]],"#e8e0b0",1.4),w("#2f8f40","#e0b070"),p(a-14,79,28,5,2,"#5a3a1e",1.8),p(a-3,78,6,7,1.5,"#e6c040",1.4),S(),v("#f0d24a"),u([[a-c,l-6],[a+c,l-6],[a+5,l-c-13],[a-2,l-c-7]],"#2f8f3f",2),f(a+4,l-c-12,2.4,"#e6c040",1.4);else if(y===1)b("#33507e","#3a4656"),R([[a-13,46],[a+13,46],[a+14,82],[a-14,82]],"#8a5a2e"),u([[a-8,50],[a+8,50],[a+9,74],[a-9,74]],"#6f4522",1.8),i.strokeStyle="#e6c040",i.lineWidth=1.6,i.beginPath(),i.moveTo(a-7,56),i.lineTo(a+7,60),i.stroke(),w("#7a4d26","#3a4656"),f(a-15,49,5.5,"#9a6a38",2),f(a+15,49,5.5,"#9a6a38",2),p(a-14,78,28,5,2,"#4a2f18",1.8),S(),v("#e07028"),p(a-c-1,l-8,2*c+2,4.5,1.5,"#2f8f3f",1.8),u([[a+c-1,l-7],[a+c+6,l-2],[a+c+4,l-9]],"#2f8f3f",1.4);else if(y===2){const A=[[a-11,46],[a+11,46],[a+20,116],[a-20,116]];u(A,"#2a52b0",2.2),g(A,"rgba(0,0,0,0.16)"),u([[a-4,52],[a+4,52],[a+6,116],[a-6,116]],"#e6b83a",1.6),p(a-20,112,40,5,2,"#e6b83a",1.6),u([[a-11,48],[a-21,58],[a-17,84],[a-9,74]],"#2a52b0",2),u([[a+11,48],[a+21,58],[a+17,84],[a+9,74]],"#2a52b0",2),f(a-17,86,3.4,m,1.6),f(a+17,86,3.4,m,1.6),S(),v("#4aa8d8"),i.strokeStyle="#8a5a2e",i.lineWidth=3,i.beginPath(),i.moveTo(a+19,40),i.lineTo(a+19,118),i.stroke(),f(a+19,33,5,"#e6c040",2),f(a+19,33,2.2,"#fff6c0",0)}else if(y===3){const A=[[a-13,46],[a+13,46],[a+22,100],[a-22,100]];u(A,"#c0432a",2.2),g(A,"rgba(0,0,0,0.18)"),b("#2a2f45","#5a3a22"),R([[a-11,48],[a+11,48],[a+13,82],[a-13,82]],"#356ab8"),w("#2f5aa0","#d8a070"),p(a-13,78,26,5,2,"#4a3018",1.8),u([[a-12,46],[a-4,44],[a-6,52]],"#c0432a",1.6),u([[a+12,46],[a+4,44],[a+6,52]],"#c0432a",1.6),S(),v("#e8802a")}else{const A=[[a-11,46],[a+11,46],[a+18,116],[a-18,116]];u(A,"#dcd6c6",2.2),g(A,"rgba(0,0,0,0.12)"),p(a-18,112,36,5,2,"#c05a86",1.6),u([[a-5,46],[a+5,46],[a+3,74],[a-3,74]],"#c05a86",1.4),u([[a-11,48],[a-19,58],[a-15,82],[a-9,74]],"#dcd6c6",2),u([[a+11,48],[a+19,58],[a+15,82],[a+9,74]],"#dcd6c6",2),f(a-15,84,3.4,m,1.6),f(a+15,84,3.4,m,1.6),S();const x="#7a4a2a";u([[a-c-2,l-4],[a-c-3,l+26],[a-5,l+20],[a-4,l]],x,2),u([[a+c+2,l-4],[a+c+3,l+26],[a+5,l+20],[a+4,l]],x,2),i.beginPath(),i.arc(a,l-1,c+1,Math.PI*.92,Math.PI*2.08),i.lineTo(a+c-1,l+1),i.lineTo(a+7,l-2),i.lineTo(a+4,l+1),i.lineTo(a+1,l-3),i.lineTo(a-2,l+1),i.lineTo(a-5,l-2),i.lineTo(a-c+1,l+1),i.closePath(),i.fillStyle=x,i.fill(),i.strokeStyle=o,i.lineWidth=2,i.stroke()}return Ui(n)}function Na(r,t,e,n,i,s){r.beginPath(),r.moveTo(t+s,e),r.arcTo(t+n,e,t+n,e+i,s),r.arcTo(t+n,e+i,t,e+i,s),r.arcTo(t,e+i,t,e,s),r.arcTo(t,e,t+n,e,s),r.closePath()}function Hs(r){const{c:n,ctx:i}=ye(160,56);i.clearRect(0,0,160,56),i.fillStyle="#33220f",Na(i,2,2,156,52,6),i.fill(),i.fillStyle="#59401f",Na(i,6,6,148,44,5),i.fill(),i.strokeStyle="rgba(30,18,8,0.35)",i.lineWidth=1;for(let o=12;o<48;o+=6)i.beginPath(),i.moveTo(10,o),i.lineTo(150,o+1),i.stroke();i.fillStyle="#2a1a0a";for(const[o,a]of[[12,12],[148,12],[12,44],[148,44]])i.beginPath(),i.arc(o,a,2,0,Math.PI*2),i.fill();let s=26;for(i.fillStyle="#f2dda0",i.textAlign="center",i.textBaseline="middle",i.font=`bold ${s}px Georgia, "Times New Roman", serif`;i.measureText(r).width>138&&s>10;)s-=1,i.font=`bold ${s}px Georgia, "Times New Roman", serif`;return i.strokeStyle="rgba(0,0,0,0.55)",i.lineWidth=3,i.strokeText(r,160/2,56/2+1),i.fillText(r,160/2,56/2+1),Ui(n)}function ks(r=41){const{c:n,ctx:i}=ye(96,96),s=De(r);for(let o=0;o<96;o+=2)for(let a=0;a<96;a+=2){const l=78+Math.floor(s()*34);i.fillStyle=`rgb(${l},${l*.94|0},${l*.84|0})`,i.fillRect(a,o,2,2)}for(let o=0;o<26;o++){const a=s()*96,l=s()*96,c=10+s()*16,h=s()<.5?.22:-.18;i.fillStyle=h>0?`rgba(0,0,0,${h})`:`rgba(255,250,240,${-h})`,i.beginPath();const u=4+(s()*3|0);for(let f=0;f<=u;f++){const p=f/u*Math.PI*2+s()*.3,g=c*(.7+s()*.4),_=a+Math.cos(p)*g,m=l+Math.sin(p)*g*.8;f===0?i.moveTo(_,m):i.lineTo(_,m)}i.closePath(),i.fill()}i.strokeStyle="rgba(20,16,12,0.5)",i.lineWidth=1.4;for(let o=0;o<7;o++){i.beginPath();let a=s()*96,l=s()*96;i.moveTo(a,l);for(let c=0;c<5;c++)a+=(s()-.5)*26,l+=(s()-.5)*26,i.lineTo(a,l);i.stroke()}return Ye(n)}function Om(r=43){const{c:n,ctx:i}=ye(96,96),s=De(r);i.fillStyle="#161514",i.fillRect(0,0,96,96);const o=32;for(let a=0;a<96;a+=o)for(let l=0;l<96;l+=o){const c=40+Math.floor(s()*20);i.fillStyle=`rgb(${c},${c*.98|0},${c*.94|0})`,i.fillRect(l+2,a+2,o-4,o-4),i.fillStyle="rgba(0,0,0,0.4)",i.fillRect(l+2,a+o-4,o-4,2),i.fillStyle="rgba(255,255,255,0.05)",i.fillRect(l+2,a+2,o-4,1),s()<.3&&(i.strokeStyle="rgba(0,0,0,0.35)",i.lineWidth=1,i.beginPath(),i.moveTo(l+6+s()*10,a+6),i.lineTo(l+8+s()*12,a+o-6),i.stroke())}return Ye(n)}function Gs(r=61){const{c:n,ctx:i}=ye(64,64),s=De(r);for(let o=0;o<64;o++)for(let a=0;a<64;a++){const l=s(),c=96+Math.floor(l*46);i.fillStyle=`rgb(${c*.42|0},${c},${c*.36|0})`,i.fillRect(a,o,1,1)}for(let o=0;o<26;o++){const a=s()<.5;i.fillStyle=a?"rgba(30,52,24,0.28)":"rgba(150,190,90,0.22)",i.beginPath(),i.ellipse(s()*64,s()*64,3+s()*6,2+s()*4,s()*3,0,Math.PI*2),i.fill()}for(let o=0;o<130;o++){const a=s()*64,l=s()*64,c=2+s()*4,h=70+s()*90;i.strokeStyle=`rgba(${h*.4|0},${h|0},${h*.35|0},0.5)`,i.lineWidth=.8,i.beginPath(),i.moveTo(a,l),i.lineTo(a+(s()-.5)*1.5,l-c),i.stroke()}return Ye(n)}function Vs(r=63){const{c:n,ctx:i}=ye(64,64),s=De(r);for(let o=0;o<64;o++)for(let a=0;a<64;a++){const l=s(),c=104+Math.floor(l*30);i.fillStyle=`rgb(${c},${c*.74|0},${c*.5|0})`,i.fillRect(a,o,1,1)}for(let o=0;o<34;o++){const a=120+s()*70;i.fillStyle=`rgba(${a|0},${a*.94|0},${a*.86|0},0.85)`,i.beginPath(),i.ellipse(s()*64,s()*64,1+s()*2.2,1+s()*1.6,s()*3,0,Math.PI*2),i.fill()}for(let o=0;o<14;o++)i.fillStyle="rgba(60,40,24,0.28)",i.beginPath(),i.ellipse(s()*64,s()*64,4+s()*7,2+s()*3,s()*3,0,Math.PI*2),i.fill();return Ye(n)}function Ml(r=65){const{c:n,ctx:i}=ye(128,300);i.clearRect(0,0,128,300);const s=De(r),o=128/2,a=s()<.35,l=(s()-.5)*12,c=300*.8;i.beginPath(),i.moveTo(o-8,300),i.lineTo(o-5,c),i.lineTo(o+5,c),i.lineTo(o+8,300),i.closePath();const h=i.createLinearGradient(o-8,0,o+8,0);h.addColorStop(0,"#2a1c0f"),h.addColorStop(.5,"#553a20"),h.addColorStop(1,"#20150a"),i.fillStyle=h,i.fill();const u=7,f=300*.04,p=300*.84;for(let g=0;g<u;g++){const _=g/(u-1),m=f+(p-f)*_,d=10+_*(128*.46),y=(p-f)/u*2.1,S=30+l;i.fillStyle=`rgb(${S*.55|0},${S+22|0},${S*.5|0})`,i.beginPath(),i.moveTo(o,m-y*.25);const v=7;for(let w=0;w<=v;w++){const b=o+d*(w/v),R=(w%2===0?.86:1)*y;i.lineTo(b,m+R)}for(let w=v;w>=0;w--){const b=o-d*(w/v),R=(w%2===0?.86:1)*y;i.lineTo(b,m+R)}i.closePath(),i.fill()}for(let g=0;g<u;g++){const _=g/(u-1),m=f+(p-f)*_+2,d=(10+_*(128*.46))*.82,y=(p-f)/u*1.9,S=62+Math.floor(s()*20)+l;i.fillStyle=`rgb(${S*.5|0},${S+30|0},${S*.45|0})`,i.beginPath(),i.moveTo(o,m),i.lineTo(o+d,m+y*.92),i.lineTo(o-d,m+y*.92),i.closePath(),i.fill(),i.fillStyle=`rgba(${S*.7|0},${S+60|0},${S*.5|0},0.5)`,i.beginPath(),i.moveTo(o,m),i.lineTo(o-d*.7,m+y*.8),i.lineTo(o-d*.1,m+y*.8),i.closePath(),i.fill();for(let v=0;v<12;v++){const w=s()<.5?-1:1,b=d*(.4+s()*.62);i.fillStyle=`rgba(${S*.45|0},${S+14|0},${S*.4|0},0.85)`,i.beginPath(),i.arc(o+w*b,m+y*(.55+s()*.4),1.4+s()*2.4,0,Math.PI*2),i.fill()}a&&(i.fillStyle="rgba(238,244,255,0.8)",i.beginPath(),i.moveTo(o,m+1),i.lineTo(o+d*.3,m+y*.34),i.lineTo(o-d*.3,m+y*.34),i.closePath(),i.fill())}return Ui(n)}function Bm(r=75){const{c:n,ctx:i}=ye(128,96);i.clearRect(0,0,128,96);const s=De(r),o=128/2,a=96*.98,l=9+(s()*5|0);for(let c=0;c<l;c++){const h=-Math.PI/2+(c/(l-1)-.5)*1.7+(s()-.5)*.2,u=96*(.5+s()*.45),f=60+Math.floor(s()*40);i.strokeStyle=`rgb(${f*.42|0},${f},${f*.34|0})`,i.lineWidth=2.4;const p=o+Math.cos(h)*u,g=a+Math.sin(h)*u,_=o+Math.cos(h)*u*.5+(s()-.5)*8,m=a+Math.sin(h)*u*.5;i.beginPath(),i.moveTo(o,a),i.quadraticCurveTo(_,m,p,g),i.stroke(),i.lineWidth=1;for(let d=.25;d<1;d+=.16){const y=o+(p-o)*d,S=a+(g-a)*d;i.beginPath(),i.moveTo(y,S),i.lineTo(y-5,S-3),i.moveTo(y,S),i.lineTo(y+5,S-3),i.stroke()}}return Ui(n)}function zm(r=67){const{c:n,ctx:i}=ye(128,96);i.clearRect(0,0,128,96);const s=De(r),o=128/2,a=96*.94,l=12;for(let c=0;c<l;c++){const h=o+(s()-.5)*128*.8,u=a-s()*96*.72,f=12+s()*18,p=54+Math.floor(s()*40),g=i.createRadialGradient(h,u-f*.3,f*.2,h,u,f);g.addColorStop(0,`rgb(${p*.6|0},${p+40},${p*.5|0})`),g.addColorStop(1,`rgb(${p*.4|0},${p*.8|0},${p*.4|0})`),i.fillStyle=g,i.beginPath(),i.arc(h,u,f,0,Math.PI*2),i.fill()}for(let c=0;c<5;c++)i.fillStyle="rgba(150,40,50,0.8)",i.beginPath(),i.arc(o+(s()-.5)*128*.6,a-s()*96*.5,1.6,0,Math.PI*2),i.fill();return Ui(n)}function Hm(r=69){const{c:n,ctx:i}=ye(128,96);i.clearRect(0,0,128,96);const s=De(r),o=(a,l,c)=>{i.fillStyle="#e7e2d2",i.beginPath(),i.ellipse(a,l,c,c*.9,0,0,Math.PI*2),i.fill(),i.fillStyle="#d8d2c0",i.beginPath(),i.ellipse(a,l+c*.7,c*.6,c*.4,0,0,Math.PI*2),i.fill(),i.fillStyle="#2a2620",i.beginPath(),i.ellipse(a-c*.4,l-c*.1,c*.24,c*.28,0,0,Math.PI*2),i.ellipse(a+c*.4,l-c*.1,c*.24,c*.28,0,0,Math.PI*2),i.fill(),i.beginPath(),i.moveTo(a,l+c*.1),i.lineTo(a-c*.12,l+c*.4),i.lineTo(a+c*.12,l+c*.4),i.fill()};i.strokeStyle="#d5cfbe",i.lineWidth=3;for(let a=0;a<6;a++){const l=20+s()*88,c=96*.7+s()*96*.22;i.beginPath(),i.moveTo(l,c),i.lineTo(l+(s()-.5)*34,c+(s()-.5)*10),i.stroke()}return o(128*.5,96*.72,15),o(128*.32,96*.8,12),o(128*.68,96*.8,12),o(128*.46,96*.5,13),Ui(n)}function Sl(r=47){const{c:n,ctx:i}=ye(96,96),s=De(r);i.fillStyle="#0f0e0d",i.fillRect(0,0,96,96);const o=18;for(let a=0,l=0;a<96;a+=o,l++){const c=l%2?18:0;for(let h=-18;h<96;h+=36){const u=h+c,f=44+Math.floor(s()*20);i.fillStyle=`rgb(${f*.9|0},${f},${f*.86|0})`,i.fillRect(u+1,a+1,34,o-2),i.fillStyle="rgba(0,0,0,0.45)",i.fillRect(u+1,a+o-3,34,2),i.fillStyle="rgba(255,255,255,0.06)",i.fillRect(u+1,a+1,34,1),s()<.35&&(i.fillStyle=`rgba(70,90,50,${.18+s()*.2})`,i.beginPath(),i.ellipse(u+6+s()*20,a+4+s()*8,5,3,0,0,Math.PI*2),i.fill())}}return Ye(n)}function km(r,t){const e={ArrowUp:"forward",KeyW:"forward",ArrowDown:"back",KeyS:"back",ArrowLeft:"turnLeft",KeyA:"turnLeft",ArrowRight:"turnRight",KeyD:"turnRight",KeyQ:"strafeLeft",KeyE:"strafeRight",Space:"interact",Enter:"interact",KeyF:"interact"};window.addEventListener("keydown",g=>{const _=e[g.code];_&&(g.preventDefault(),t(_))});const n=document.createElement("div");n.id="pad",r.appendChild(n);const i=(g,_,m)=>{const d=document.createElement("button");d.className="gh-btn "+m,d.textContent=g;let y;const S=w=>{w.preventDefault(),t(_),y=window.setInterval(()=>t(_),sc)},v=()=>{y&&window.clearInterval(y),y=void 0};return d.addEventListener("pointerdown",S),d.addEventListener("pointerup",v),d.addEventListener("pointerleave",v),d.addEventListener("pointercancel",v),d.addEventListener("contextmenu",w=>w.preventDefault()),d},s=document.createElement("div");s.className="gh-cluster gh-move",s.appendChild(i("▲","forward","gh-fwd")),s.appendChild(i("⟲","turnLeft","gh-tl")),s.appendChild(i("▼","back","gh-back")),s.appendChild(i("⟳","turnRight","gh-tr")),n.appendChild(s);const o=document.createElement("div");o.className="gh-cluster gh-strafe",o.appendChild(i("◄","strafeLeft","gh-sl")),o.appendChild(i("►","strafeRight","gh-sr")),n.appendChild(o);const a=document.createElement("button");a.className="gh-btn gh-act",a.textContent="✋";const l=g=>{g.preventDefault(),t("interact")};a.addEventListener("pointerdown",l),a.addEventListener("contextmenu",g=>g.preventDefault()),n.appendChild(a);const c=document.createElement("div");c.id="gh-prompt",c.style.display="none",n.appendChild(c);const h=document.createElement("div");h.id="gh-dialogue",h.style.display="none",h.innerHTML='<img class="gh-dlg-portrait" alt="" /><div class="gh-dlg-body"><div class="gh-dlg-name"></div><div class="gh-dlg-text"></div><div class="gh-dlg-hint">toque para continuar ▸</div></div>',h.addEventListener("pointerdown",g=>{g.preventDefault(),t("interact")}),n.appendChild(h);const u=h.querySelector(".gh-dlg-name"),f=h.querySelector(".gh-dlg-text"),p=h.querySelector(".gh-dlg-portrait");return Gm(),{setPrompt(g){g?(c.textContent=g,c.style.display="block",a.classList.add("gh-act-on")):(c.style.display="none",a.classList.remove("gh-act-on"))},showDialogue(g,_,m){u.textContent=g,f.textContent=_,m?(p.src=m,p.style.display="block"):(p.removeAttribute("src"),p.style.display="none"),h.style.display="flex",c.style.display="none"},hideDialogue(){h.style.display="none"}}}function Gm(){if(document.getElementById("gh-style"))return;const r=document.createElement("style");r.id="gh-style",r.textContent=`
  #pad { position:fixed; inset:0; pointer-events:none; z-index:10; font-family:inherit; }
  .gh-cluster { position:absolute; pointer-events:none; }
  .gh-btn {
    pointer-events:auto; position:absolute;
    width:60px; height:60px; border-radius:12px;
    background:rgba(28,22,16,0.62); color:#e8d9b4;
    border:2px solid rgba(201,162,39,0.5);
    font-size:26px; line-height:1; font-family:inherit;
    display:flex; align-items:center; justify-content:center;
    box-shadow:0 3px 10px rgba(0,0,0,0.5); cursor:pointer;
    touch-action:none;
  }
  .gh-btn:active { background:rgba(201,162,39,0.55); transform:scale(0.94); }
  .gh-move { right:20px; bottom:24px; width:190px; height:190px; }
  .gh-fwd  { right:65px; bottom:120px; }
  .gh-back { right:65px; bottom:0px; }
  .gh-tl   { right:130px; bottom:60px; }
  .gh-tr   { right:0px;   bottom:60px; }
  .gh-strafe { left:20px; bottom:24px; width:140px; height:64px; }
  .gh-sl { left:0px; bottom:0px; }
  .gh-sr { left:70px; bottom:0px; }
  .gh-act {
    left:50%; transform:translateX(-50%); bottom:30px;
    width:66px; height:66px; border-radius:50%; font-size:30px;
    opacity:0.45; transition:opacity .15s, box-shadow .15s;
  }
  .gh-act.gh-act-on {
    opacity:1; border-color:#f0c040;
    box-shadow:0 0 16px rgba(240,192,64,0.6);
  }
  .gh-act:active { transform:translateX(-50%) scale(0.94); }
  #gh-prompt {
    pointer-events:none; position:absolute; left:50%; transform:translateX(-50%);
    bottom:104px; max-width:70%; text-align:center;
    background:rgba(20,16,10,0.82); color:#f0dca2;
    border:1px solid rgba(201,162,39,0.55); border-radius:10px;
    padding:6px 14px; font-size:15px; white-space:nowrap;
  }
  #gh-dialogue {
    pointer-events:auto; position:absolute; left:50%; transform:translateX(-50%);
    bottom:110px; width:min(560px,88%);
    display:flex; align-items:stretch; gap:12px;
    background:rgba(18,14,9,0.92); color:#ece0c4;
    border:2px solid rgba(201,162,39,0.6); border-radius:12px;
    padding:12px 16px 10px; box-shadow:0 6px 22px rgba(0,0,0,0.6);
    cursor:pointer; touch-action:none;
  }
  .gh-dlg-portrait {
    flex:0 0 auto; width:64px; height:64px; border-radius:9px; object-fit:cover;
    object-position:top center; background:rgba(0,0,0,0.35);
    border:2px solid rgba(201,162,39,0.6);
    image-rendering:auto; align-self:flex-start;
  }
  .gh-dlg-body { flex:1 1 auto; min-width:0; display:flex; flex-direction:column; }
  .gh-dlg-name { color:#f0c040; font-weight:bold; font-size:15px; margin-bottom:4px; }
  /* altura fixa do texto: a caixa fica sempre do mesmo tamanho (falas longas
     são paginadas no código, então nunca ultrapassam este espaço) */
  .gh-dlg-text { font-size:16px; line-height:1.35; min-height:66px; }
  .gh-dlg-hint { text-align:right; font-size:12px; color:#a8966a; margin-top:6px; }
  @media (min-width: 900px) {
    .gh-btn { opacity:0.75; }
    .gh-act { opacity:0.5; }
    .gh-act.gh-act-on { opacity:1; }
  }
  `,document.head.appendChild(r)}const jr=["#######","#..N..#","#.....#","#.....#","#.....#","#..P..#","###X###"],Ja=jr.length,ac=jr[0].length,Ws={tavern:{name:"TAVERNA",npc:"Bruno, o Taverneiro",seed:11,lines:["Bem-vindo à Taverna do Javali! Eu sou o Bruno.","Sente-se e descanse — logo você poderá pagar por um quarto e recuperar as forças."]},store:{name:"MERCADOR",npc:"Rosa, a Mercadora",seed:2,lines:["Tenho de tudo um pouco, aventureiro. Sou a Rosa.","Em breve abriremos o comércio: poções, cordas, tochas e mais."]},smith:{name:"FERREIRO",npc:"Brandt, o Ferreiro",seed:23,lines:["O fogo está quente e a bigorna, pronta. Brandt, ao seu dispor.","Traga minério e ouro que eu aprimoro suas armas e armaduras."]},alchemist:{name:"ALQUIMISTA",npc:"Isolde, a Alquimista",seed:31,lines:["Cuidado com o que respira aqui dentro... sou Isolde.","Elixires e poções logo estarão à venda na minha bancada."]}};function Lr(r){for(let t=0;t<Ja;t++){const e=jr[t].indexOf(r);if(e>=0)return{col:e,row:t}}return{col:1,row:1}}function kr(r,t){return t<0||t>=Ja||r<0||r>=ac?"#":jr[t][r]}function yl(r,t){return".PX".includes(kr(r,t))}const Vm=""+new URL("taverneiro-Ba4UKFJq.png",import.meta.url).href,Wm=""+new URL("mercadora-B8RulStP.png",import.meta.url).href,Xm=""+new URL("ferreiro-BdN9Klhc.png",import.meta.url).href,qm=""+new URL("alquimista-ssXsgGLn.png",import.meta.url).href,oc=""+new URL("pip-rEDWa-7w.png",import.meta.url).href,lc=""+new URL("wilma-DI_QNtI6.png",import.meta.url).href,Ym=""+new URL("fazendeiro-CLjUAd1g.png",import.meta.url).href,$m=""+new URL("camponesa-CrL0OA2Y.png",import.meta.url).href,Zm=""+new URL("lenhador-B54mx8Mi.png",import.meta.url).href,cc=""+new URL("hedda-Buaz2cmx.png",import.meta.url).href,Km=""+new URL("costureira-Br8zMBee.png",import.meta.url).href,jm=""+new URL("gunther-D_2fJfLI.png",import.meta.url).href,Jm=""+new URL("anselmo-a5GEbqfY.png",import.meta.url).href,Qm=""+new URL("tam-BlgWIVim.png",import.meta.url).href,t0=""+new URL("lyle-gu11Pcfp.png",import.meta.url).href,e0=""+new URL("pine1-Cx-eXiFP.png",import.meta.url).href,n0=""+new URL("pine2-CUzpurmt.png",import.meta.url).href,i0=""+new URL("pine3-SLpwxU-f.png",import.meta.url).href,r0=""+new URL("pine4-D2rjz_P9.png",import.meta.url).href,s0=""+new URL("cluster1-CDwqmovY.png",import.meta.url).href,a0=""+new URL("cluster2-C0czRdHN.png",import.meta.url).href,o0=""+new URL("sign_tavern-DPGpN59J.png",import.meta.url).href,l0=""+new URL("sign_store-C8OmR8-U.png",import.meta.url).href,c0=""+new URL("sign_smith-B08qmnbc.png",import.meta.url).href,h0=""+new URL("sign_alch-CZuh7kJW.png",import.meta.url).href,El=[e0,n0,r0],u0=[i0],d0=.625,Ir=[{url:s0,aspect:1.96},{url:a0,aspect:1.72}],f0={tavern:Vm,store:Wm,smith:Xm,alchemist:qm},p0={tavern:o0,store:l0,smith:c0,alchemist:h0},m0=2.6,Xn=[[0,-1],[1,0],[0,1],[-1,0]],Dr={c:7,r:10},Ur=3.2,Tl=[{c:5,r:5,dc:0,dr:1,kind:"tavern"},{c:9,r:5,dc:0,dr:1,kind:"store"},{c:1,r:9,dc:1,dr:0,kind:"smith"},{c:13,r:9,dc:-1,dr:0,kind:"alchemist"}],bl=[{c:7,r:5,dc:0,dr:1,id:"irmaos"},{c:1,r:7,dc:1,dr:0,id:"hedda"},{c:13,r:11,dc:-1,dr:0,id:"elspethhome"}],g0=[{id:"elspeth",c:3,r:6,seed:1,name:"Elspeth, a Camponesa",lines:["Bom dia! Colhi legumes fresquinhos hoje cedo.","O poço da praça nunca seca, pode beber à vontade."]},{id:"corvin",c:11,r:7,seed:2,name:"Corvin, o Lenhador",lines:["Cortar lenha é honesto, mas o bosque anda estranho ultimamente.","Dizem que há algo à espreita naquela montanha ao norte..."]},{id:"wren",c:9,r:9,seed:3,name:"Wren, a Costureira",lines:["Precisa remendar essa capa? Faço um preço justo.","Roupa boa aquece o corpo — e o frio lá embaixo é de rachar."]},{id:"alard",c:3,r:11,seed:5,name:"Alard, o Velho Fazendeiro",lines:["Cuidado, jovem. A escada sob a montanha leva às profundezas.","Equipe-se bem antes de descer. Já vi muitos partirem e nenhum voltar."]},{id:"gunther",c:11,r:11,seed:9,name:"Gunther, o Vigia",lines:["Mantenha a paz por aqui, forasteiro.","Enquanto eu montar guarda, o vilarejo dorme tranquilo."]},{id:"anselmo",c:3,r:8,seed:7,name:"Frei Anselmo",lines:["Que a luz o acompanhe nas trevas, viajante.","Reze antes de descer àquela masmorra. Vai precisar."]},{id:"tam",c:5,r:12,seed:10,name:"Velho Tam",lines:["Uma moedinha para um pobre velho?","Já fui aventureiro como você... até a montanha levar tudo de mim."]},{id:"lyle",c:10,r:12,seed:12,name:"Lyle, o Bardo",lines:["Ei! Quer ouvir a balada do herói que desceu à masmorra?","Faça feitos grandiosos e eu comporei uma canção sobre você!"]}],_0={pip:oc,wilma:lc,alard:Ym,elspeth:$m,corvin:Zm,hedda:cc,wren:Km,gunther:jm,anselmo:Jm,tam:Qm,lyle:t0},v0={},Xs={irmaos:{name:"Casa dos Irmãos",residents:[{col:2,row:2,seed:4,scale:.7,name:"Pip",art:oc,lines:["Essa é a nossa casa! Eu e a Wilma somos irmãos.","Um dia vou ser aventureiro igual você — a Wilma que fica de babá!"]},{col:4,row:2,seed:6,scale:.66,name:"Wilma",art:lc,lines:["O Pip vive fugindo pra praça. Alguém tem que cuidar dele!","À noite dá pra ouvir barulhos vindo da montanha... eu tranco a porta."]}]},hedda:{name:"Casa de Hedda",residents:[{col:3,row:2,seed:8,name:"Hedda, a Matriarca",art:cc,lines:["Entre, entre. Minha casa é modesta, mas aquecida.","Já vi muitos invernos passarem por Grimhollow. Sente-se, tome um chá."]}]},elspethhome:{name:"Casa de Elspeth",residents:[]}},x0=96;function qs(r,t=x0){const e=[];for(const n of r){if(n.length<=t){e.push(n);continue}const i=n.split(/\s+/);let s="";for(const o of i)s&&s.length+1+o.length>t?(e.push(s+" …"),s=o):s=s?s+" "+o:o;s&&e.push(s)}return e}class M0{constructor(t){jt(this,"renderer");jt(this,"scene",new vm);jt(this,"camera");jt(this,"container");jt(this,"foliageFx");jt(this,"col");jt(this,"row");jt(this,"facing",0);jt(this,"anim",null);jt(this,"world",new ke);jt(this,"blocked",new Set);jt(this,"npcs",[]);jt(this,"flames",[]);jt(this,"waterGlint");jt(this,"smoke",[]);jt(this,"_smokeTex");jt(this,"ui");jt(this,"location","village");jt(this,"doorMap",new Map);jt(this,"homeDoorMap",new Map);jt(this,"npcMap",new Map);jt(this,"returnTo",{col:0,row:0,facing:0});jt(this,"dialogue",null);jt(this,"lastPrompt"," ");jt(this,"artCache",new Map);jt(this,"_shadowTex");jt(this,"animTex",[]);jt(this,"walkers",[]);this.container=t,this.renderer=new _m({antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),t.appendChild(this.renderer.domElement);const e=document.createElement("div");e.style.cssText="position:absolute;inset:0;pointer-events:none;opacity:0;z-index:5;background:radial-gradient(ellipse at center,rgba(30,55,25,0) 42%,rgba(24,46,20,0.55) 78%,rgba(16,32,14,0.8) 100%);",getComputedStyle(t).position==="static"&&(t.style.position="relative"),t.appendChild(e),this.foliageFx=e,this.scene.background=new Lt(Xi),this.camera=new Ge(78,1,.05,400),this.camera.rotation.order="YXZ",this.scene.add(this.world),this.col=0,this.row=0,this.ui=km(t,i=>this.onAction(i));const n=Dm();this.enterLocation("village",n.col,n.row,0),window.addEventListener("resize",()=>this.resize()),this.resize(),this.renderer.setAnimationLoop(i=>this.tick(i))}enterLocation(t,e,n,i){this.clearWorld(),this.location=t,this.dialogue=null,this.ui.hideDialogue(),t==="village"?(this.scene.fog=new Si(Xi,I*2.6,I*11),this.scene.background=new Lt(Xi),this.addVillageLights(),this.buildVillage()):t==="forest"?(this.scene.fog=new Si(Xi,I*3.5,I*18),this.scene.background=new Lt(Xi),this.addForestLights(),this.buildForest()):t in Xs?(this.scene.fog=new Si(2365968,I*4,I*12),this.scene.background=new Lt(1445640),this.addInteriorLights(),this.buildHome(t)):(this.scene.fog=new Si(1709069,I*4,I*12),this.scene.background=new Lt(1183241),this.addInteriorLights(),this.buildInterior(t)),this.col=e,this.row=n,this.facing=i,this.camera.position.set(e*I,Ns,n*I),this.camera.rotation.y=-i*(Math.PI/2),this.anim=null,this.lastPrompt=" ",this.ui.setPrompt(null)}clearWorld(){this.world.traverse(t=>{const e=t;e.geometry&&e.geometry.dispose();const n=e.material;Array.isArray(n)?n.forEach(i=>i.dispose()):n&&n.dispose()}),this.world.clear(),this.blocked.clear(),this.npcs=[],this.flames=[],this.animTex=[],this.walkers=[],this.smoke=[],this.waterGlint=void 0,this.doorMap.clear(),this.homeDoorMap.clear(),this.npcMap.clear()}addVillageLights(){this.world.add(new Ds(9081506,.75)),this.world.add(new Ps(10135224,3812380,.7));const t=new ul(16771008,.55);t.position.set(-6,12,4),this.world.add(t)}addInteriorLights(){this.world.add(new Ds(12888176,1.15)),this.world.add(new Ps(10521184,3813408,.75))}buildVillage(){const e=[pe(1),pe(5),pe(9)].map(p=>new it({map:p})),n=new it({map:vl(7)}),i=new it({map:Bs(3),side:Yt}),s=new it({map:xl(11),side:Yt}),o=new it({map:Nm(13),transparent:!0,side:Yt}),a=new it({map:zs(17)}),l=(p,g,_=0)=>Math.sin(p*12.9+g*78.2+_*3.1)*43758.5%1,c=new Wt(I,I);for(let p=0;p<Ne;p++)for(let g=0;g<Qe;g++){if(ml(g,p))continue;const _=new J(c,n);_.rotation.x=-Math.PI/2;const m=Math.floor(Math.abs(l(g,p,5))*4)%4;_.rotation.z=m*Math.PI/2,_.position.set(g*I,0,p*I),this.world.add(_)}const h=new le(I,Cn,I),u=new Set([...Tl.map(p=>`${p.c},${p.r},${p.dc},${p.dr}`),...bl.map(p=>`${p.c},${p.r},${p.dc},${p.dr}`)]),f=new Set;for(let p=0;p<Ne;p++)for(let g=0;g<Qe;g++){if(me(g,p)!=="building")continue;const _=Xn.filter(([y,S])=>{const v=me(g+y,p+S);return v==="street"||v==="barrel"});if(_.length===0)continue;const m=e[Math.floor(Math.abs(l(g,p))*3%3)],d=new J(h,m);d.position.set(g*I,Cn/2,p*I),this.world.add(d);for(const[y,S]of _){if(u.has(`${g},${p},${y},${S}`)){f.add(`${g},${p},${y},${S}`);continue}Math.abs(l(g,p,y*2+S))<.5&&this.addDecal(g,p,y,S,o,"window")}}this.buildRoofs(i),this.buildBarrels(a,f,l),this.buildMountain(),this.buildTunnel(),this.buildWell(),this.buildEstablishments(s),this.buildHomes(s),this.buildVillageForestGate(),this.buildVillageProps(),this.buildChimneySmoke(),this.buildNPCs()}buildVillageProps(){new it({map:pe(5)});const t=new it({map:pe(7)}),e=new it({color:12034154}),n=new it({map:pe(3)}),i=new it({color:5929530}),s=new it({color:4863268}),o=(h,u)=>{for(let f=0;f<5;f++){const p=new J(new oe(.12,.12,1.3,8),t);p.rotation.z=Math.PI/2,p.position.set(h,.14+f%2*.24,u+(f-2)*.26),this.world.add(p)}},a=(h,u)=>{this.box(h,.4,u,.8,.8,.8,n),this.box(h+.5,.3,u+.2,.6,.6,.6,n);const f=new J(new oe(.26,.34,.7,10),e);f.position.set(h-.4,.35,u+.3),this.world.add(f)},l=(h,u)=>{this.box(h,.22,u,1.1,.34,.4,t),this.box(h,.42,u,1,.14,.32,s);for(let f=-2;f<=2;f++){const p=new J(new Wr(.12,6,6),i);p.position.set(h+f*.2,.56,u),this.world.add(p)}},c=(h,u,f)=>{f(h*I,u*I),this.blocked.add(`${h},${u}`)};c(2,6,o),c(11,6,a),c(12,10,o),c(4,12,l),c(8,12,l)}buildChimneySmoke(){const t=this.smokeTex(),e=[[5,5],[9,5],[1,9],[13,9],[7,5],[1,7]];for(const[n,i]of e)for(let s=0;s<4;s++){const o=new J(new Wt(1.4,1.4),new Re({map:t,transparent:!0,depthWrite:!1,opacity:0}));o.position.set(n*I+.4,Cn+Us,i*I),o.userData={phase:(n*3.1+i*1.7+s*1.3)%4,baseX:n*I+.4,baseZ:i*I},this.world.add(o),this.smoke.push(o)}}smokeTex(){if(this._smokeTex)return this._smokeTex;const t=document.createElement("canvas");t.width=64,t.height=64;const e=t.getContext("2d"),n=e.createRadialGradient(32,32,2,32,32,30);n.addColorStop(0,"rgba(220,220,224,0.9)"),n.addColorStop(1,"rgba(220,220,224,0)"),e.fillStyle=n,e.beginPath(),e.arc(32,32,30,0,Math.PI*2),e.fill();const i=new $i(t);return i.colorSpace=Me,this._smokeTex=i,i}buildVillageForestGate(){const t=gl(),e=t.col*I,n=t.row*I,i=new it({map:pe(5)}),s=new it({map:Vs(63)}),o=new Wt(I,I);for(let g=0;g<=2;g++){const _=new J(o,s);_.rotation.x=-Math.PI/2,_.rotation.z=g%2*Math.PI/2,_.position.set(e,.02,(t.row-g)*I),this.world.add(_)}const a=new ke,l=new le(.36,3.4,.36);for(const g of[-1.5,1.5]){const _=new J(l,i);_.position.set(g,1.7,0),a.add(_)}const c=new J(new le(3.7,.36,.4),i);c.position.set(0,3.35,0),a.add(c);for(const g of[-1,1]){const _=new J(new le(.7,.16,.16),i);_.position.set(g*1.05,3,0),_.rotation.z=g*(Math.PI/4),a.add(_)}const h=new J(new Wt(1.7,.6),new Re({map:Hs("Floresta"),transparent:!0,side:Yt}));h.position.set(0,2.72,0),h.rotation.y=Math.PI,a.add(h);const u=new it({color:3815994});for(const g of[-.7,.7]){const _=new J(new oe(.02,.02,.4,5),u);_.position.set(g,3.05,0),a.add(_)}a.position.set(e,0,n),this.world.add(a);const f=new it({map:Gs(61)});f.map.repeat.set(8,5);const p=new J(new Wt(8*I,5*I),f);p.rotation.x=-Math.PI/2,p.position.set(e,-.02,(t.row+2.5)*I),this.world.add(p);for(let g=1;g<=3;g++){const _=new J(o,s);_.rotation.x=-Math.PI/2,_.rotation.z=g%2*Math.PI/2,_.position.set(e,.02,(t.row+g)*I),this.world.add(_)}this.buildTreelineBackdrop(e,(t.row+3.4)*I,Math.PI)}makeClusterMats(){return Ir.map(t=>{const e=new it({transparent:!0,opacity:0,side:Yt});return this.loadArt(t.url,n=>{e.map=n,e.alphaTest=.35,e.opacity=1,e.needsUpdate=!0}),{mat:e,aspect:t.aspect}})}buildTreelineBackdrop(t,e,n){if(Ir.length===0)return;const i=this.makeClusterMats(),s=13;let o=t-s*1.9;for(let a=0;a<3;a++){const l=i[a%i.length],c=s*l.aspect,h=new J(new Wt(c,s),l.mat);h.position.set(o+c/2,s/2-1,e),h.rotation.y=n,a===1&&(h.scale.x=-1),this.world.add(h),o+=c*.92}}buildMountain(){const t=new it({map:ks(41)});let e=Qe,n=Ne;for(let s=0;s<Ne;s++)for(let o=0;o<Qe;o++)me(o,s)==="mountain"&&(e=Math.min(e,o),n=Math.min(n,s));const i=(s,o)=>{const a=s-e,l=o-n,c=Math.sqrt(a*a+l*l);return Math.max(Cn+2.5,Cn+11-c*1.7+this.mHash(s,o)*2)};for(let s=0;s<Ne;s++)for(let o=0;o<Qe;o++){const a=me(o,s),l=a==="tunnel"||a==="stairs";if(a!=="mountain"&&!l)continue;const c=i(o,s),h=l?Ur:0,u=c-h;if(u<=.2)continue;const f=new J(new le(I,u,I),t);if(f.position.set(o*I,h+u/2,s*I),this.world.add(f),!l&&this.mHash(o,s,2)>.35){const p=1.6+this.mHash(o,s,3)*1.8,g=new J(new le(p,p,p),t);g.position.set(o*I+(this.mHash(o,s,4)-.5)*2.4,c+p*.25,s*I+(this.mHash(o,s,5)-.5)*2.4),g.rotation.y=this.mHash(o,s,6)*Math.PI,this.world.add(g)}}}mHash(t,e,n=0){const i=Math.sin(t*41.3+e*17.7+n*7.13)*9871.2;return i-Math.floor(i)}buildBarrels(t,e,n){const i=new oe(.4,.34,1.05,14),s=new oe(.41,.41,.08,14);for(let o=0;o<Ne;o++)for(let a=0;a<Qe;a++){if(me(a,o)!=="barrel")continue;const l=Xn.filter(([v,w])=>me(a+v,o+w)==="building");if(l.length===0)continue;const c=l.find(([v,w])=>!e.has(`${a+v},${o+w},${-v},${-w}`))||l[0],[h,u]=c;let f=0,p=0;const g=1.05;h!==0?p=(me(a,o-1)==="building"?-1:me(a,o+1)==="building"||n(a,o)>0?1:-1)*g:f=(me(a-1,o)==="building"?-1:me(a+1,o)==="building"||n(a,o)>0?1:-1)*g;const _=a*I+h*(I/2-.5)+f,m=o*I+u*(I/2-.5)+p,d=new ke,y=new J(i,t);y.position.y=.52,d.add(y);const S=new J(s,t);if(S.position.y=1.05,d.add(S),n(a,o,5)>.15){const v=new J(i,t);v.scale.set(.82,.82,.82),v.position.set(-f*.5-h*.1,.42,-p*.5-u*.1),d.add(v)}d.position.set(_,0,m),this.world.add(d)}}buildWell(){const t=Dr.c*I,e=Dr.r*I;this.blocked.add(`${Dr.c},${Dr.r}`);const n=new it({map:xi(31)}),i=new it({map:pe(5)}),s=new it({map:Bs(3),side:Yt}),o=new ke,a=new J(new oe(1.15,1.25,1.05,24,1,!0),n);a.position.y=.52,o.add(a);const l=new J(new oe(.98,.98,1.05,24,1,!0),new it({color:1512208,side:Le}));l.position.y=.52,o.add(l);const c=new J(new Ka(.98,1.16,24),new it({color:9274231,side:Yt}));c.rotation.x=-Math.PI/2,c.position.y=1.045,o.add(c);const h=new J(new oe(.97,.97,.05,28),new Sm({color:3109512,specular:12578559,shininess:100,transparent:!0,opacity:.95}));h.position.y=.86,o.add(h);const u=new J(new Ya(.6,24),new Re({color:12577525,transparent:!0,opacity:.25}));u.rotation.x=-Math.PI/2,u.position.set(-.12,.87,-.08),o.add(u),this.waterGlint=u;const f=new le(.16,2,.16);for(const d of[-1,1]){const y=new J(f,i);y.position.set(d*.95,1.55,0),o.add(y)}const p=new J(new le(2.2,.14,.14),i);p.position.y=2.5,o.add(p);const g=new J(new oe(.025,.025,.72,6),new it({color:7034422}));g.position.set(.2,2.08,0),o.add(g);const _=new J(new oe(.24,.2,.34,12),i);_.position.set(.2,1.7,0),o.add(_);const m=new J(new Pn(1.7,.95,4),s);m.position.y=3.05,m.rotation.y=Math.PI/4,o.add(m),o.position.set(t,0,e),this.world.add(o)}buildTunnel(){const t=new it({map:Om(43),side:Yt}),e=new it({map:Sl(47),side:Yt}),n=new it({map:Sl(51),side:Yt}),i=new it({map:xi(31)});let s=null;for(let o=0;o<Ne;o++)for(let a=0;a<Qe;a++){if(!ml(a,o))continue;const l=a*I,c=o*I,h=me(a,o)==="stairs",u=new J(new Wt(I,I),n);if(u.rotation.x=Math.PI/2,u.position.set(l,Ur,c),this.world.add(u),!h){const f=new J(new Wt(I,I),t);f.rotation.x=-Math.PI/2,f.position.set(l,.03,c),this.world.add(f)}for(const[f,p]of Xn){const g=me(a+f,o+p);g==="street"?s=[a,o]:(g==="mountain"||g==="building")&&!h&&this.addWall(l,c,f,p,0,Ur,e)}h&&this.buildStairs(a,o,l,c,e,i)}if(s){const[o,a]=s,l=o*I,c=a*I,h=new Re({color:16757322});for(const f of[-1,1]){const p=new J(new oe(.05,.05,1.1,8),new it({color:2759696}));p.position.set(l+f*(I/2-.25),1.9,c),this.world.add(p);const g=new J(new Wr(.18,10,10),h);g.position.set(l+f*(I/2-.25),2.55,c),this.world.add(g)}const u=new Wn(16752704,7,16,2);u.position.set(l,2.4,c+.5),this.world.add(u),this.flames.push({light:u,base:6})}}addWall(t,e,n,i,s,o,a){const l=new J(new Wt(I,o-s),a);l.position.set(t+n*(I/2),(s+o)/2,e+i*(I/2)),n===1?l.rotation.y=-Math.PI/2:n===-1?l.rotation.y=Math.PI/2:i===1?l.rotation.y=Math.PI:l.rotation.y=0,this.world.add(l)}buildStairs(t,e,n,i,s,o){const c=i+I/2,h=I/5,u=-5*.8;for(const[_,m]of Xn){const d=me(t+_,e+m);(d==="mountain"||d==="building")&&this.addWall(n,i,_,m,u,Ur,s)}for(let _=0;_<5;_++){const m=-_*.8,d=c-(_+.5)*h,y=m-u,S=new J(new le(I,y,h+.02),o);S.position.set(n,m-y/2,d),this.world.add(S)}const f=new J(new Wt(I,I),new Re({color:328966}));f.rotation.x=-Math.PI/2,f.position.set(n,u+.02,i),this.world.add(f);const p=new Wn(16760688,6,13,2);p.position.set(n,2.6,i+I/2-.3),this.world.add(p);const g=new Wn(16752720,3.5,8,2);g.position.set(n,.4,i-.6),this.world.add(g)}buildEstablishments(t){for(const e of Tl){const{c:n,r:i,dc:s,dr:o,kind:a}=e;this.addDecal(n,i,s,o,t,"door"),this.doorMap.set(`${n},${i},${s},${o}`,a);const l=new ke,c=.62,h=new it({map:Hs(Ws[a].name),transparent:!0,side:Yt}),u=new J(new Wt(c*m0,c),h);u.position.set(0,2.05,.03),l.add(u);const f=p0[a];f&&this.loadArt(f,d=>{h.map=d,h.needsUpdate=!0;const y=d.image;if(y&&y.width&&y.height){const S=y.width/y.height;u.geometry.dispose(),u.geometry=new Wt(c*S,c)}});const p=n*I+s*(I/2+.16),g=i*I+o*(I/2+.16),_=o,m=-s;l.position.set(p+_*1.2,0,g+m*1.2),l.rotation.y=s===1?Math.PI/2:s===-1?-Math.PI/2:o===1?0:Math.PI,this.world.add(l)}}buildHomes(t){for(const e of bl){const{c:n,r:i,dc:s,dr:o,id:a}=e;this.addDecal(n,i,s,o,t,"door"),this.homeDoorMap.set(`${n},${i},${s},${o}`,a)}}addNPC(t,e,n,i,s,o,a=1,l,c){const h=Fm(n),u=!!o,f=new it({map:h,transparent:!0,alphaTest:.5,side:Yt}),p=(u?2.4:2.15)*a,g=(u?p*.671:1.3)*(u?1:a),_=u?p/2-p*.015+.06:1.1*a,m=new J(new Wt(g*.95,g*.55),new Re({map:this.shadowTex(),transparent:!0,depthWrite:!1,opacity:.55}));m.rotation.x=-Math.PI/2,m.position.set(t*I,.03,e*I),m.renderOrder=1,this.world.add(m);const d=new J(new Wt(g,p),f);d.position.set(t*I,_,e*I),d.userData={baseY:_,h:p,ph:(t*12.9+e*7.3)%(Math.PI*2)},this.world.add(d);const y=this.makeNameTag(i.split(",")[0].trim());y.position.set(t*I,_+p/2+.18,e*I),this.world.add(y),this.npcs.push(d),this.blocked.add(`${t},${e}`);const S=`${t},${e}`,v={name:i,lines:s,tex:h,art:!1,frames:1,portrait:void 0};this.npcMap.set(S,v),o&&this.loadArt(o,w=>{l&&(w.repeat.set(1/l.frames,1),w.offset.set(0,0),this.animTex.push({tex:w,frames:l.frames,fps:l.fps})),f.map=w,f.needsUpdate=!0,v.tex=w,v.art=!0,v.frames=l?.frames??1,v.portrait=void 0}),c&&c.length>1&&this.walkers.push({mesh:d,shadow:m,baseY:_,path:c.map(([w,b])=>({c:w,r:b})),idx:0,dirn:1,key:S,moving:!1,t0:0,from:{c:t,r:e},to:{c:t,r:e},waitUntil:0})}makeNameTag(t){const i="bold 40px system-ui, -apple-system, Segoe UI, sans-serif",s=document.createElement("canvas").getContext("2d");s.font=i;const a=Math.ceil(s.measureText(t).width)+36,l=58,c=document.createElement("canvas");c.width=a,c.height=l;const h=c.getContext("2d"),u=l/2;h.beginPath(),h.moveTo(u,0),h.arcTo(a,0,a,l,u),h.arcTo(a,l,0,l,u),h.arcTo(0,l,0,0,u),h.arcTo(0,0,a,0,u),h.closePath(),h.fillStyle="rgba(16,12,8,0.74)",h.fill(),h.lineWidth=3,h.strokeStyle="rgba(201,162,39,0.7)",h.stroke(),h.font=i,h.textAlign="center",h.textBaseline="middle",h.lineWidth=5,h.strokeStyle="rgba(0,0,0,0.85)",h.strokeText(t,a/2,l/2+1),h.fillStyle="#f0dca2",h.fillText(t,a/2,l/2+1);const f=new $i(c);f.colorSpace=Me,f.magFilter=Oe,f.minFilter=en,f.generateMipmaps=!0;const p=new Mm(new nc({map:f,transparent:!0,depthWrite:!1})),g=.4;return p.scale.set(g*(a/l),g,1),p}shadowTex(){if(!this._shadowTex){const e=document.createElement("canvas");e.width=64,e.height=64;const n=e.getContext("2d"),i=n.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);i.addColorStop(0,"rgba(0,0,0,0.6)"),i.addColorStop(.6,"rgba(0,0,0,0.32)"),i.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=i,n.fillRect(0,0,64,64);const s=new $i(e);s.colorSpace=Me,this._shadowTex=s}return this._shadowTex}loadArt(t,e){const n=this.artCache.get(t);if(n){e(n);return}new bm().load(t,i=>{i.colorSpace=Me,i.magFilter=Oe,i.minFilter=en,i.generateMipmaps=!0,i.anisotropy=8,i.wrapS=tn,i.wrapT=tn,this.artCache.set(t,i),e(i)},void 0,()=>{})}buildNPCs(){for(const t of g0){const e=v0[t.id],n=e?e.url:_0[t.id];this.addNPC(t.c,t.r,t.seed,t.name,t.lines,n,t.scale??1,e?{frames:e.frames,fps:e.fps}:void 0,t.patrol)}}makePortrait(t,e=1){const n=t;if(!n)return null;const i=Math.floor((n.naturalWidth||n.width||0)/e),s=n.naturalHeight||n.height||0;if(!i||!s)return null;const o=132,a=document.createElement("canvas");a.width=o,a.height=o;const l=a.getContext("2d");if(!l)return null;l.imageSmoothingQuality="high";let c=i*.5-s*.09,h=s*.05,u=s*.18;try{const f=document.createElement("canvas");f.width=i,f.height=s;const p=f.getContext("2d");if(p){p.drawImage(t,0,0);const g=p.getImageData(0,0,i,s).data,_=40,m=S=>{let v=0,w=0,b=-1;for(let R=0;R<=i;R++)if(R<i&&g[(S*i+R)*4+3]>_)b<0&&(b=R);else if(b>=0){const x=R-b;x>v&&(v=x,w=b),b=-1}return{w:v,cx:w+v/2}};let d=-1,y=-1;for(let S=0;S<s&&d<0;S++)for(let v=0;v<i;v++)if(g[(S*i+v)*4+3]>_){d=S;break}for(let S=s-1;S>=0&&y<0;S--)for(let v=0;v<i;v++)if(g[(S*i+v)*4+3]>_){y=S;break}if(d>=0&&y>d){const S=y-d+1;let v=d;for(let A=d;A<d+S*.3;A++)if(m(A).w>i*.06){v=A;break}let w=0,b=i/2;const R=Math.round(S*.14);for(let A=v;A<v+R;A++){const x=m(A);x.w>w&&(w=x.w,b=x.cx)}u=Math.max(S*.13,Math.min(w*1.55,S*.3,s*.55)),c=b-u/2,h=v-u*.12}}}catch{}c=Math.max(0,Math.min(c,i-u)),h=Math.max(0,Math.min(h,s-u)),u=Math.min(u,i,s);try{return l.drawImage(t,c,h,u,u,0,0,o,o),a.toDataURL("image/png")}catch{return null}}portraitFor(t){const e=this.npcMap.get(t);if(!e)return null;if(e.portrait!==void 0)return e.portrait;const n=e.tex.image;if(!n)return null;const i=this.makePortrait(n,e.frames??1);return i&&(e.portrait=i),i}addForestLights(){this.world.add(new Ds(10134706,.72)),this.world.add(new Ps(10464188,4214830,.85));const t=new ul(14673644,.5);t.position.set(-8,16,5),this.world.add(t)}buildForest(){const t=Ua,e=Xr,n=Os("s"),i=(w,b,R=0)=>{const A=Math.sin(w*41.3+b*17.7+R*7.13)*4213.1;return A-Math.floor(A)},s=new it({map:Gs(61)});s.map.repeat.set(t+10,e+10);const o=new J(new Wt((t+10)*I,(e+10)*I),s);o.rotation.x=-Math.PI/2,o.position.set((t/2-.5)*I,0,(e/2-.5)*I),this.world.add(o);const a=new it({map:Vs(63)}),l=new Wt(I,I);for(let w=0;w<e;w++)for(let b=0;b<t;b++){const R=$n(b,w);if(R==="path"||R==="gate"||R==="spawn"||R==="sign"){const A=new J(l,a);A.rotation.x=-Math.PI/2,A.rotation.z=Math.floor(i(b,w,9)*4)*Math.PI/2,A.position.set(b*I,.02,w*I),this.world.add(A)}}const c=El.length>0,h=(c?El:[65,66,67,71,79]).map((w,b)=>{const R=new it({map:Ml(65+b*6),transparent:!0,alphaTest:.4,side:Yt});return c&&this.loadArt(w,A=>{R.map=A,R.needsUpdate=!0}),R}),u=u0.map((w,b)=>{const R=new it({map:Ml(83+b*4),transparent:!0,alphaTest:.4,side:Yt});return this.loadArt(w,A=>{R.map=A,R.needsUpdate=!0}),R}),f=[67,73].map(w=>new it({map:zm(w),transparent:!0,alphaTest:.4,side:Yt})),p=[75,77].map(w=>new it({map:Bm(w),transparent:!0,alphaTest:.35,side:Yt})),g=new it({map:ks(41)}),_=new it({map:Hm(69),transparent:!0,alphaTest:.4,side:Yt}),m=new it({map:pe(5)}),d=new it({map:pe(7)}),y=(w,b,R,A,x,M=!1)=>{const C=new Wt(R,A),L=M?-1:1,O=new J(C,x);O.position.set(w,A/2,b),O.scale.x=L;const H=new J(C,x);H.position.set(w,A/2,b),H.rotation.y=Math.PI/2,H.scale.x=L,this.world.add(O),this.world.add(H)},S=c?d0:.44,v=(w,b,R,A,x)=>{const C=u.length>0&&i(A,x,17)<.12?u:h,L=C[Math.floor(i(A,x,4)*C.length)%C.length];y(w,b,R*S,R,L,i(A,x,16)>.5)};for(let w=0;w<e;w++)for(let b=0;b<t;b++){const R=$n(b,w),A=b*I,x=w*I;if(R==="tree"||R==="edge"){const M=R==="edge",C=(M?8:5.4)+i(b,w,1)*2.2,L=(i(b,w,2)-.5)*I*.45,O=(i(b,w,3)-.5)*I*.45;v(A+L,x+O,C,b,w),i(b,w,12)>.5&&y(A+L,x+O,2,1.1,p[Math.floor(i(b,w,13)*p.length)%p.length]),M&&this.blocked.add(`${b},${w}`)}else if(R==="bush"){const M=2.4+i(b,w,5)*.8,C=1.4+i(b,w,6)*.5,L=f[Math.floor(i(b,w,7)*f.length)%f.length];y(A,x,M,C,L),this.blocked.add(`${b},${w}`)}else if(R==="rock"){const M=1.1+i(b,w,8)*.8,C=new J(new Za(M),g);C.position.set(A,M*.55,x),C.rotation.set(i(b,w,9)*3,i(b,w,10)*3,.2),C.scale.y=.7,this.world.add(C),this.blocked.add(`${b},${w}`)}else if(R==="foliage"){const M=1.8+i(b,w,5)*.8,C=.9+i(b,w,6)*.5;y(A+(i(b,w,2)-.5)*I*.4,x+(i(b,w,3)-.5)*I*.4,M,C,p[Math.floor(i(b,w,7)*p.length)%p.length])}else if(R==="skull")y(A,x,2,1.4,_);else if(R==="sign"){const C=b===n.col&&w===n.row?[0,1]:this.forestSignFacing(b,w);this.buildForestSign(A,x,m,C),this.blocked.add(`${b},${w}`)}if(R==="grass"&&i(b,w,14)>.9){const M=new J(new oe(.34,.4,2.4,8),d);M.rotation.set(0,i(b,w,15)*Math.PI,Math.PI/2),M.position.set(A,.34,x),this.world.add(M),this.blocked.add(`${b},${w}`)}}if(Ir.length>0){const w=this.makeClusterMats(),b=(x,M,C,L)=>{const O=15+i(L,0,2)*3,H=w[Math.floor(i(L,0,4)*w.length)%w.length],$=O*H.aspect,V=new J(new Wt($,O),H.mat);V.position.set(x,O/2-1,M),V.rotation.y=C,i(L,0,5)>.5&&(V.scale.x=-1),this.world.add(V)},R=15*1.85*.72;let A=0;for(let x=-I;x<=(t+1)*I;x+=R)b(x,-1.5*I,0,A++);for(let x=-I;x<=e*I;x+=R)b(-1.5*I,x,Math.PI/2,A++),b((t+.5)*I,x,-Math.PI/2,A++)}else{for(let w=-2;w<t+2;w+=2)v(w*I+1,-2*I,10+i(w,-3,1)*3,w,-3);for(let w=-1;w<e-2;w+=2)v(-2*I,w*I,9+i(-3,w,1)*3,-3,w),v((t+1)*I,w*I,9+i(t+2,w,1)*3,t+2,w)}this.buildForestBackdrop(),this.buildForestVillageBackdrop()}buildForestVillageBackdrop(){const t=Os("V"),e=t.col*I,n=t.row*I,i=n+9*I,s=.6,o=new it({map:Gs(61)});o.map.repeat.set(20,16);const a=new J(new Wt(22*I,16*I),o);a.rotation.x=-Math.PI/2,a.position.set(e,-.02,n+6*I),this.world.add(a);const l=new it({map:Vs(63)}),c=new Wt(I,I);for(let w=n+1*I;w<i-2*I;w+=I){const b=new J(c,l);b.rotation.x=-Math.PI/2,b.rotation.z=Math.round((w-n)/I)%2*(Math.PI/2),b.position.set(e,.02,w),this.world.add(b)}if(Ir.length>0){const w=this.makeClusterMats(),b=13,R=(A,x,M,C)=>{const L=w[C%w.length],O=new J(new Wt(b*L.aspect,b),L.mat);O.position.set(A,b/2-1,x),O.rotation.y=Math.PI,M&&(O.scale.x=-1),this.world.add(O)};R(e-13,i+2*I,!1,0),R(e+13,i+2*I,!0,1),R(e-20,i-1*I,!1,1),R(e+20,i-1*I,!0,0)}const h=new ke,u=new it({map:pe(3)}),f=new it({map:Bs(3),side:Yt}),p=new it({map:pe(5)}),g=new it({map:ks(41)}),_=new it({map:xi(31)}),m=new it({map:vl(7)}),d=new it({color:2102288});m.map.repeat.set(6,5);const y=new J(new Wt(24,18),m);y.rotation.x=-Math.PI/2,y.position.set(0,.06,2),h.add(y);const S=new J(new le(34,9,7),g);S.position.set(-2,3.5,13),h.add(S);for(const[w,b,R,A]of[[-4,0,11,13],[1,-.5,10,15],[5.5,.5,9,11],[-9,.8,8,10]]){const x=new J(new Pn(R,A,7),g);x.position.set(w*1.5,A/2+1.5,13+b),x.rotation.y=w,h.add(x)}const v=(w,b,R,A,x)=>{const M=new J(new le(R,A,R),u);M.position.set(w,A/2,b),h.add(M);const C=new J(new Pn(R*.82,A*.6,4),f);C.position.set(w,A+A*.28,b),C.rotation.y=Math.PI/4,h.add(C);const L=w+x[0]*(R/2+.03),O=b+x[1]*(R/2+.03),H=Math.atan2(x[0],x[1]),$=new J(new Wt(R*.26,A*.5),d);$.position.set(L,A*.25,O),$.rotation.y=H,h.add($);for(const V of[-1,1]){const Q=new J(new Wt(R*.16,A*.2),d);Q.position.set(L+V*x[1]*R*.26,A*.62,O-V*x[0]*R*.26),Q.rotation.y=H,h.add(Q)}};{for(const[C,L,O]of[[-6,3,3.2],[-2,3.2,3.4],[2,3,3.1],[6,3.2,3.3]])v(C,7,L,O,[0,-1]);for(const C of[2.5,5])v(-8,C,3,3.1,[1,0]);for(const C of[2.5,5])v(8,C,3,3.1,[-1,0]);const w=new ke,b=new J(new oe(.85,.95,1,16),_);b.position.y=.5,w.add(b);for(const C of[-.75,.75]){const L=new J(new le(.14,1.9,.14),p);L.position.set(C,1.45,0),w.add(L)}const R=new J(new Pn(1.25,.7,4),f);R.position.y=2.5,R.rotation.y=Math.PI/4,w.add(R),w.position.set(0,0,2.5),h.add(w);const A=new ke,x=new le(.36,3.4,.36);for(const C of[-1.6,1.6]){const L=new J(x,p);L.position.set(C,1.7,0),A.add(L)}const M=new J(new le(3.9,.36,.4),p);M.position.set(0,3.35,0),A.add(M),A.position.set(0,0,-3.5),h.add(A)}h.scale.setScalar(s),h.position.set(e,0,i),this.world.add(h)}forestSignFacing(t,e){const n=[[0,1],[1,0],[0,-1],[-1,0]];let i=[0,1];for(const[s,o]of n){if($n(t+s,e+o)==="path")return[s,o];_l(t+s,e+o)&&(i=[s,o])}return i}buildForestSign(t,e,n,i){const s=new ke,o=new le(.16,2.3,.16);for(const c of[-.62,.62]){const h=new J(o,n);h.position.set(c,1.15,0),s.add(h)}const a=new J(new le(1.75,.66,.09),n);a.position.set(0,1.78,.02),s.add(a);const l=new J(new le(1.85,.76,.06),new it({color:2759696}));l.position.set(0,1.78,-.01),s.add(l),s.position.set(t,0,e),s.rotation.y=Math.atan2(i[0],i[1]),this.world.add(s)}buildForestBackdrop(){const t=new Re({color:7305349}),e=new Re({color:12108495}),n=(Ua/2-.5)*I,i=-7*I;[-2.4,-1.2,-.1,1,2.2].forEach((o,a)=>{const l=30+a*37%13,c=17+a*53%8,h=n+o*24,u=i-a*31%8,f=new J(new Pn(c,l,5),t);f.position.set(h,l/2-3,u),f.rotation.y=a,this.world.add(f);const p=new J(new Pn(c*.4,l*.32,5),e);p.position.set(h,l-l*.18-3,u),p.rotation.y=a,this.world.add(p)})}canWalk(t,e){return(this.location==="village"?Im(t,e):this.location==="forest"?_l(t,e):yl(t,e))&&!this.blocked.has(`${t},${e}`)}doInteract(){const t=this.facingTarget();if(t){if(t.kind==="enter"){this.returnTo={col:this.col,row:this.row,facing:(this.facing+2)%4};const e=Lr("P");this.enterLocation(t.estab,e.col,e.row,0)}else if(t.kind==="enterhome"){this.returnTo={col:this.col,row:this.row,facing:(this.facing+2)%4};const e=Lr("P");this.enterLocation(t.id,e.col,e.row,0)}else if(t.kind==="exit"){const{col:e,row:n,facing:i}=this.returnTo;this.enterLocation("village",e,n,i)}else if(t.kind==="talk"){const e=qs(t.lines),n=this.portraitFor(t.key);this.dialogue={name:t.name,lines:e,idx:0,portrait:n},this.ui.showDialogue(t.name,e[0],n)}else if(t.kind==="dungeon"){const e=qs(["A escada de pedra desce para a escuridão.","(Em breve você poderá explorar a masmorra.)"]);this.dialogue={name:"Masmorra",lines:e,idx:0,portrait:null},this.ui.showDialogue("Masmorra",e[0],null)}else if(t.kind==="toforest"){this.returnTo={col:this.col,row:this.row,facing:(this.facing+2)%4};const e=Os("P");this.enterLocation("forest",e.col,e.row,0)}else if(t.kind==="tovillage"){const e=gl();this.enterLocation("village",e.col,e.row-1,0)}else if(t.kind==="sign"){const e=qs(t.lines);this.dialogue={name:"Placa",lines:e,idx:0,portrait:null},this.ui.showDialogue("Placa",e[0],null)}}}advanceDialogue(){this.dialogue&&(this.dialogue.idx++,this.dialogue.idx>=this.dialogue.lines.length?(this.dialogue=null,this.ui.hideDialogue()):this.ui.showDialogue(this.dialogue.name,this.dialogue.lines[this.dialogue.idx],this.dialogue.portrait??null))}box(t,e,n,i,s,o,a){const l=new J(new le(i,s,o),a);return l.position.set(t,e,n),this.world.add(l),l}buildRoomShell(t=9,e=2,n=4864038){const s=new it({map:pe(t)}),o=new it({map:pe(e),side:Yt}),a=new it({color:n,side:Yt}),l=new it({map:xl(11),side:Yt}),c=new Wt(I,I);for(let p=0;p<Ja;p++)for(let g=0;g<ac;g++){if(!yl(g,p))continue;const _=new J(c,s);_.rotation.x=-Math.PI/2,_.position.set(g*I,0,p*I),this.world.add(_);const m=new J(c,a);m.rotation.x=Math.PI/2,m.position.set(g*I,3,p*I),this.world.add(m);for(const[d,y]of Xn)kr(g+d,p+y)==="#"&&this.addWall(g*I,p*I,d,y,0,3,o)}const h=Lr("X"),u=new J(new Wt(pl,Cr),l);u.position.set(h.col*I,Cr/2,h.row*I+I/2-.06),u.rotation.y=Math.PI,this.world.add(u);const f=new J(new Wt(1.7,.6),new it({map:Hs("SAÍDA"),transparent:!0,side:Yt}));f.position.set(h.col*I,Cr+.5,h.row*I+I/2-.08),f.rotation.y=Math.PI,this.world.add(f)}buildHome(t){this.buildRoomShell(9,6,3943450);const n=new it({map:pe(5)}),i=new it({map:pe(7)}),s=new it({map:xi(31)}),o=new it({color:7161136}),a=new it({color:13350025});this.wallCell(1,3,[-1,0],(g,_)=>{this.box(g,1.2,_,.5,2.4,2,s),this.box(g+.42,.55,_,.34,.7,1.1,new Re({color:16742942})),this.glowLight(g+1.4,1,_,16747054,4.2,10)});const l=3*I,c=3*I;this.blocked.add("3,3"),this.box(l,.95,c,1.7,.12,1.1,n);for(const[g,_]of[[-.7,0],[.7,0],[0,-.5],[0,.5]])this.box(l+g*.9,.42,c+_,.16,.84,.16,i);this.box(l,.45,c-.95,1.4,.12,.4,i),this.box(l,.45,c+.95,1.4,.12,.4,i),this.box(l-.4,1.06,c,.22,.1,.22,a);const h=new J(new oe(.16,.13,.22,12),i);h.position.set(l+.35,1.11,c),this.world.add(h);const u=Xs[t].residents.length>=2?[[5,2],[5,4]]:[[5,3]];for(const[g,_]of u)this.wallCell(g,_,[1,0],(m,d)=>{this.box(m,.35,d,.9,.5,1.9,i),this.box(m,.66,d,.86,.16,1.8,a),this.box(m,.78,d-.7,.7,.18,.4,o)});this.wallCell(2,1,[0,-1],(g,_)=>{this.box(g,1.7,_,1.6,.1,.4,n);for(let m=-1;m<=1;m++){const d=new J(new oe(.12,.1,.28,10),m===0?i:a);d.position.set(g+m*.45,1.9,_),this.world.add(d)}});const f=new J(new Wt(2.2,1.6),new it({color:8010538}));f.rotation.x=-Math.PI/2,f.position.set(3*I,.02,3*I+.2),this.world.add(f);const p=new Wn(16769192,5.5,30,2);p.position.set(3*I,3-.4,3*I),this.world.add(p);for(const g of Xs[t].residents)this.addNPC(g.col,g.row,g.seed,g.name,g.lines,g.art,g.scale??1)}buildInterior(t){const n=new it({map:pe(5)});this.buildRoomShell(9,2,4864038);const i=Lr("N"),s=i.col*I,o=i.row*I+I/2+.2;this.box(s,.55,o,I*2.4,1.1,.7,n),this.box(s,1.12,o,I*2.4+.2,.14,.95,n);const a=Ws[t];this.addNPC(i.col,i.row,a.seed,a.npc,a.lines,f0[t]);const l=new Wn(16766106,4.5,15,2);l.position.set(s,2.5,i.row*I+1.6),this.world.add(l);const c=new Wn(16769192,8,34,2);c.position.set(3*I,3-.3,3*I),this.world.add(c),this.box(3*I,3-.25,3*I,.4,.3,.4,new Re({color:16758874})),t==="tavern"?this.propsTavern():t==="store"?this.propsStore():t==="smith"?this.propsSmith():this.propsAlchemist()}glowLight(t,e,n,i,s,o){const a=new Wn(i,s,o,2);a.position.set(t,e,n),this.world.add(a),this.flames.push({light:a,base:s})}wallCell(t,e,n,i){const s=t*I+n[0]*(I/2-.75),o=e*I+n[1]*(I/2-.75);i(s,o),this.blocked.add(`${t},${e}`)}propsTavern(){const t=new it({map:pe(5)}),e=new it({map:xi(31)}),n=new it({map:zs(17)}),i=new it({color:13279818});this.wallCell(1,3,[-1,0],(s,o)=>{this.box(s,1.1,o,.5,2.2,2.2,e),this.box(s+.4,.6,o,.35,.8,1.2,new Re({color:16742942})),this.glowLight(s+1.3,1,o,16747054,5,11)}),this.wallCell(1,2,[-1,0],(s,o)=>{const a=new J(new oe(.5,.44,1.3,14),n);a.position.set(s,.65,o),this.world.add(a)});for(const s of[2,4])this.wallCell(5,s,[1,0],(o,a)=>{this.box(o,.9,a,.2,1,.2,t);const l=new J(new oe(.8,.8,.15,16),t);l.position.set(o,1.45,a),this.world.add(l);const c=new J(new oe(.14,.12,.28,10),i);c.position.set(o,1.66,a),this.world.add(c)})}propsStore(){const t=new it({map:pe(3)}),e=[9058874,3824266,5208634,11569712,8010362];let n=0;const i=(s,o,a)=>{this.box(s,1.05,o,.5,2.1,2.4,t);for(const l of[.7,1.4])for(const c of[-.7,.7]){const h=new it({color:e[n++%e.length]});this.box(s-a*.35,l,o+c,.4,.5,.5,h)}};for(const s of[2,3,4])this.wallCell(1,s,[-1,0],(o,a)=>i(o,a,-1));for(const s of[2,3,4])this.wallCell(5,s,[1,0],(o,a)=>i(o,a,1))}propsSmith(){const t=new it({color:4869716}),e=new it({map:xi(31)}),n=new it({map:pe(5)}),i=new it({map:zs(17)});this.wallCell(1,3,[-1,0],(s,o)=>{this.box(s,1,o,.6,2,2.2,e),this.box(s+.45,1,o,.35,.5,1.2,new Re({color:16738834})),this.glowLight(s+1.3,1.1,o,16742942,5.5,11)}),this.wallCell(1,4,[-1,0],(s,o)=>{this.box(s,.45,o,.6,.9,.6,n),this.box(s,1.05,o,.5,.35,1,t)}),this.wallCell(1,2,[-1,0],(s,o)=>{const a=new J(new oe(.5,.44,1.2,14),i);a.position.set(s,.6,o),this.world.add(a)});for(const s of[2,3,4])this.wallCell(5,s,[1,0],(o,a)=>{this.box(o,1,a,.25,2,1.4,n);for(const l of[-.4,.4]){const c=new J(new le(.08,1.5,.22),t);c.position.set(o-.2,1.4,a+l),this.world.add(c)}})}propsAlchemist(){const t=new it({map:pe(3)}),e=new it({color:3817028}),n=[4239472,5267648,12599408,12623920,9453760];let i=0;const s=(o,a,l)=>{this.box(o,1.05,a,.5,2.1,2.4,t);for(const c of[.7,1.35,2])for(const h of[-.7,0,.7]){const u=new it({color:n[i++%n.length]}),f=new J(new oe(.11,.13,.36,8),u);f.position.set(o-l*.32,c,a+h),this.world.add(f)}};for(const o of[2,3])this.wallCell(1,o,[-1,0],(a,l)=>s(a,l,-1));for(const o of[2,3])this.wallCell(5,o,[1,0],(a,l)=>s(a,l,1));this.wallCell(1,4,[-1,0],(o,a)=>{const l=new J(new oe(.6,.48,.85,16),e);l.position.set(o,.5,a),this.world.add(l);const c=new J(new oe(.53,.53,.1,16),new Re({color:7077792}));c.position.set(o,.92,a),this.world.add(c),this.glowLight(o+.9,1.2,a,5308314,3.2,8)}),this.wallCell(5,4,[1,0],(o,a)=>{this.box(o,.8,a,.9,.15,1.6,t),this.box(o,.98,a+.3,.5,.16,.6,new it({color:6961706}))})}buildRoofs(t){const e=(n,i,s,o)=>{if(me(n,i)!=="building")return!1;const a=me(n+s,i+o);return a==="street"||a==="barrel"};for(const n of[1,-1])for(let i=0;i<Qe;i++){let s=0;for(;s<Ne;)if(e(i,s,n,0)){let o=s;for(;o+1<Ne&&e(i,o+1,n,0);)o++;let a=Fs;for(let l=s;l<=o;l++)a=Math.min(a,this.depthInto(i,l,-n,0));this.addRoofRun(i,s,i,o,n,0,a,t),s=o+1}else s++}for(const n of[1,-1])for(let i=0;i<Ne;i++){let s=0;for(;s<Qe;)if(e(s,i,0,n)){let o=s;for(;o+1<Qe&&e(o+1,i,0,n);)o++;let a=Fs;for(let l=s;l<=o;l++)a=Math.min(a,this.depthInto(l,i,0,-n));this.addRoofRun(s,i,o,i,0,n,a,t),s=o+1}else s++}}depthInto(t,e,n,i){let s=0;for(;s<Fs&&me(t+n*s,e+i*s)==="building";)s++;return Math.max(1,s)}addRoofRun(t,e,n,i,s,o,a,l){const c=Cn-.15,h=Cn+Us,u=new U,f=new U,p=new U,g=new U,_=new U,m=new U;let d,y,S;const v=a*I-I/2;if(s!==0){const A=t*I+s*(I/2)+s*dl,x=t*I-s*v,M=(A+x)/2,C=e*I-I/2,L=i*I+I/2;u.set(A,c,C),f.set(A,c,L),p.set(M,h,C),g.set(M,h,L),_.set(x,c,C),m.set(x,c,L),d=i-e+1,y=Math.abs(A-M)/I+.5,S=Math.abs(M-x)/I+.5}else{const A=e*I+o*(I/2)+o*dl,x=e*I-o*v,M=(A+x)/2,C=t*I-I/2,L=n*I+I/2;u.set(C,c,A),f.set(L,c,A),p.set(C,h,M),g.set(L,h,M),_.set(C,c,x),m.set(L,c,x),d=n-t+1,y=Math.abs(A-M)/I+.5,S=Math.abs(M-x)/I+.5}this.world.add(this.quad(u,f,g,p,l,d,y)),this.world.add(this.quad(p,g,m,_,l,d,S)),this.world.add(this.tri(u,p,_,l)),this.world.add(this.tri(f,m,g,l));const w=u.clone();w.y-=fl;const b=f.clone();b.y-=fl,this.world.add(this.quad(w,b,f,u,l,d,.3))}tri(t,e,n,i){const s=new Ie;return s.setAttribute("position",new Pe(new Float32Array([t.x,t.y,t.z,e.x,e.y,e.z,n.x,n.y,n.z]),3)),s.setAttribute("uv",new Pe(new Float32Array([0,0,1,0,.5,1]),2)),s.setIndex([0,1,2]),s.computeVertexNormals(),new J(s,i)}addDecal(t,e,n,i,s,o){const a=o==="door"?pl:Rm,l=o==="door"?Cr:Cm,c=o==="door"?l/2+.02:Pm,h=new J(new Wt(a,l),s),u=t*I+n*(I/2+.04),f=e*I+i*(I/2+.04);h.position.set(u,c,f),n===1?h.rotation.y=Math.PI/2:n===-1?h.rotation.y=-Math.PI/2:i===1?h.rotation.y=0:h.rotation.y=Math.PI,this.world.add(h)}quad(t,e,n,i,s,o=1,a=1){const l=new Ie,c=new Float32Array([t.x,t.y,t.z,e.x,e.y,e.z,n.x,n.y,n.z,i.x,i.y,i.z]);return l.setAttribute("position",new Pe(c,3)),l.setAttribute("uv",new Pe(new Float32Array([0,0,o,0,o,a,0,a]),2)),l.setIndex([0,1,2,0,2,3]),l.computeVertexNormals(),new J(l,s)}onAction(t){if(this.dialogue){t==="interact"&&this.advanceDialogue();return}if(t==="interact"){this.doInteract();return}if(this.anim)return;if(t==="turnLeft"||t==="turnRight"){const a=t==="turnLeft"?1:-1;this.facing=(this.facing+(a===1?3:1))%4,this.anim={kind:"turn",t0:performance.now(),fromY:this.camera.rotation.y,toY:this.camera.rotation.y+Math.PI/2*a};return}let e=this.facing;t==="back"?e=(e+2)%4:t==="strafeLeft"?e=(e+3)%4:t==="strafeRight"&&(e=(e+1)%4);const[n,i]=Xn[e],s=this.col+n,o=this.row+i;this.canWalk(s,o)&&(this.anim={kind:"move",t0:performance.now(),fromX:this.col*I,fromZ:this.row*I,toX:s*I,toZ:o*I},this.col=s,this.row=o,this.location==="forest"&&$n(s,o)==="tree"&&this.brushFoliage())}brushFoliage(){const t=this.foliageFx;t&&(t.style.transition="none",t.style.opacity="0.55",t.offsetWidth,t.style.transition="opacity 620ms ease-out",t.style.opacity="0")}updateWalkers(t){if(this.dialogue)return;const e=900;for(const n of this.walkers)if(n.moving){const i=Math.min(1,(t-n.t0)/e),s=i*i*(3-2*i),o=(n.from.c+(n.to.c-n.from.c)*s)*I,a=(n.from.r+(n.to.r-n.from.r)*s)*I;n.mesh.position.x=o,n.mesh.position.z=a,n.mesh.position.y=n.baseY+Math.sin(i*Math.PI)*.05,n.shadow.position.x=o,n.shadow.position.z=a,i>=1&&(n.moving=!1,n.mesh.position.y=n.baseY,this.blocked.delete(`${n.from.c},${n.from.r}`),n.waitUntil=t+350)}else if(t>=n.waitUntil){let i=n.idx+n.dirn;(i<0||i>=n.path.length)&&(n.dirn*=-1,i=n.idx+n.dirn);const s=n.path[i],o=`${s.c},${s.r}`;if(s.c===this.col&&s.r===this.row||this.blocked.has(o)){n.waitUntil=t+400;continue}this.blocked.add(o);const a=this.npcMap.get(n.key);a&&(this.npcMap.delete(n.key),this.npcMap.set(o,a)),n.from=n.path[n.idx],n.to=s,n.idx=i,n.key=o,n.moving=!0,n.t0=t}}tick(t){const e=this.anim;if(e)if(e.kind==="move"){const s=Math.min(1,(t-e.t0)/sc),o=s*s*(3-2*s);this.camera.position.x=e.fromX+(e.toX-e.fromX)*o,this.camera.position.z=e.fromZ+(e.toZ-e.fromZ)*o,this.camera.position.y=Ns+Math.sin(s*Math.PI)*.07,s>=1&&(this.camera.position.y=Ns,this.anim=null)}else{const s=Math.min(1,(t-e.t0)/Lm),o=s*s*(3-2*s);this.camera.rotation.y=e.fromY+(e.toY-e.fromY)*o,s>=1&&(this.anim=null)}const n=this.camera.position.x,i=this.camera.position.z;for(const s of this.npcs){s.rotation.y=Math.atan2(n-s.position.x,i-s.position.z);const o=s.userData;if(o&&o.h){const a=1+Math.sin(t*.0016+o.ph)*.014;s.scale.y=a,s.position.y=o.baseY+(a-1)*o.h/2,s.rotation.z=Math.sin(t*.0011+o.ph*1.7)*.007}}for(const s of this.flames)s.light.intensity=s.base+Math.sin(t*.011+s.base)*.8+Math.sin(t*.027)*.5;for(const s of this.animTex)s.tex.offset.x=Math.floor(t/1e3*s.fps)%s.frames/s.frames;this.updateWalkers(t);for(const s of this.smoke){const o=s.userData,a=(t*28e-5+o.phase)%4/4,l=a*4.2;s.position.set(o.baseX+Math.sin(t*6e-4+o.phase)*.5,Cn+Us+l,o.baseZ);const c=.6+a*1.6;s.scale.set(c,c,c),s.material.opacity=Math.sin(a*Math.PI)*.42,s.rotation.y=Math.atan2(n-s.position.x,i-s.position.z)}if(this.waterGlint){const s=this.waterGlint.material;s.opacity=.18+(Math.sin(t*.0016)+1)*.11;const o=1+Math.sin(t*.0013+1)*.08;this.waterGlint.scale.set(o,o,o)}this.anim||this.updatePrompt(),this.renderer.render(this.scene,this.camera)}updatePrompt(){const t=this.facingTarget();let e=" ";t&&(t.kind==="enter"?e=`Entrar — ${Ws[t.estab].name}`:t.kind==="enterhome"?e="Entrar na casa":t.kind==="exit"?e="Sair":t.kind==="talk"?e=`Falar com ${t.name}`:t.kind==="dungeon"?e="Descer à masmorra":t.kind==="toforest"?e="Ir para a Floresta":t.kind==="tovillage"?e="Voltar ao Vilarejo":t.kind==="sign"&&(e="Ler a placa")),e!==this.lastPrompt&&(this.lastPrompt=e,this.ui.setPrompt(e===" "?null:e))}facingTarget(){const[t,e]=Xn[this.facing],n=this.col+t,i=this.row+e,s=this.npcMap.get(`${n},${i}`);if(s)return{kind:"talk",name:s.name,lines:s.lines,key:`${n},${i}`};if(this.location==="village"){const o=this.doorMap.get(`${n},${i},${-t},${-e}`);if(o)return{kind:"enter",estab:o};const a=this.homeDoorMap.get(`${n},${i},${-t},${-e}`);if(a)return{kind:"enterhome",id:a};if(me(n,i)==="stairs")return{kind:"dungeon"};if(me(n,i)==="forestgate"||me(this.col,this.row)==="forestgate")return{kind:"toforest"}}else if(this.location==="forest"){const o=$n(n,i);if(o==="gate"||$n(this.col,this.row)==="gate")return{kind:"tovillage"};if(o==="sign")return{kind:"sign",lines:Um(n,i)}}else if(kr(n,i)==="X"||kr(this.col,this.row)==="X")return{kind:"exit"};return null}resize(){const t=this.container.clientWidth||window.innerWidth,e=this.container.clientHeight||window.innerHeight;this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix()}}const S0=document.getElementById("app");new M0(S0);
