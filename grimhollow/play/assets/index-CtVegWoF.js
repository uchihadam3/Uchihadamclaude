var Ku=Object.defineProperty;var Ju=(s,t,e)=>t in s?Ku(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var ut=(s,t,e)=>Ju(s,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const _l="170",Qu=0,Vl=1,tf=2,Fh=1,ef=2,zn=3,li=0,sn=1,Kt=2,oi=0,Ki=1,Jr=2,Wl=3,Xl=4,nf=5,Mi=100,sf=101,rf=102,of=103,af=104,lf=200,cf=201,hf=202,df=203,va=204,ba=205,uf=206,ff=207,pf=208,mf=209,gf=210,_f=211,xf=212,vf=213,bf=214,Ma=0,wa=1,ya=2,es=3,Sa=4,Ta=5,Ea=6,Aa=7,ao=0,Mf=1,wf=2,ai=0,yf=1,Sf=2,Tf=3,Ef=4,Af=5,Rf=6,Cf=7,Oh=300,ns=301,is=302,Ra=303,Ca=304,lo=306,dn=1e3,wn=1001,La=1002,Tn=1003,Lf=1004,Qs=1005,Ze=1006,_o=1007,yn=1008,qn=1009,Bh=1010,zh=1011,Os=1012,xl=1013,Si=1014,Gn=1015,qs=1016,vl=1017,bl=1018,ss=1020,Hh=35902,Gh=1021,Vh=1022,Sn=1023,Wh=1024,Xh=1025,Ji=1026,rs=1027,qh=1028,Ml=1029,$h=1030,wl=1031,yl=1033,Hr=33776,Gr=33777,Vr=33778,Wr=33779,Pa=35840,Ua=35841,Da=35842,Ia=35843,ka=36196,Na=37492,Fa=37496,Oa=37808,Ba=37809,za=37810,Ha=37811,Ga=37812,Va=37813,Wa=37814,Xa=37815,qa=37816,$a=37817,Ya=37818,ja=37819,Za=37820,Ka=37821,Xr=36492,Ja=36494,Qa=36495,Yh=36283,tl=36284,el=36285,nl=36286,Pf=3200,Uf=3201,Sl=0,Df=1,ri="",Ie="srgb",ls="srgb-linear",co="linear",ge="srgb",Ri=7680,ql=519,If=512,kf=513,Nf=514,jh=515,Ff=516,Of=517,Bf=518,zf=519,il=35044,$l="300 es",Vn=2e3,Qr=2001;class cs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}}const Ve=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],xo=Math.PI/180,sl=180/Math.PI;function Wn(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ve[s&255]+Ve[s>>8&255]+Ve[s>>16&255]+Ve[s>>24&255]+"-"+Ve[t&255]+Ve[t>>8&255]+"-"+Ve[t>>16&15|64]+Ve[t>>24&255]+"-"+Ve[e&63|128]+Ve[e>>8&255]+"-"+Ve[e>>16&255]+Ve[e>>24&255]+Ve[n&255]+Ve[n>>8&255]+Ve[n>>16&255]+Ve[n>>24&255]).toLowerCase()}function Ye(s,t,e){return Math.max(t,Math.min(e,s))}function Hf(s,t){return(s%t+t)%t}function vo(s,t,e){return(1-e)*s+e*t}function Pn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function _e(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}class _t{constructor(t=0,e=0){_t.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ye(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ne{constructor(t,e,n,i,r,a,o,l,c){ne.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c)}set(t,e,n,i,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],g=n[8],_=i[0],m=i[3],p=i[6],w=i[1],M=i[4],x=i[7],E=i[2],y=i[5],R=i[8];return r[0]=a*_+o*w+l*E,r[3]=a*m+o*M+l*y,r[6]=a*p+o*x+l*R,r[1]=c*_+h*w+d*E,r[4]=c*m+h*M+d*y,r[7]=c*p+h*x+d*R,r[2]=u*_+f*w+g*E,r[5]=u*m+f*M+g*y,r[8]=u*p+f*x+g*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*a-o*c,u=o*l-h*r,f=c*r-a*l,g=e*d+n*u+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=d*_,t[1]=(i*c-h*n)*_,t[2]=(o*n-i*a)*_,t[3]=u*_,t[4]=(h*e-i*l)*_,t[5]=(i*r-o*e)*_,t[6]=f*_,t[7]=(n*l-c*e)*_,t[8]=(a*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-i*c,i*l,-i*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(bo.makeScale(t,e)),this}rotate(t){return this.premultiply(bo.makeRotation(-t)),this}translate(t,e){return this.premultiply(bo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const bo=new ne;function Zh(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Bs(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Gf(){const s=Bs("canvas");return s.style.display="block",s}const Yl={};function Rs(s){s in Yl||(Yl[s]=!0,console.warn(s))}function Vf(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Wf(s){const t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Xf(s){const t=s.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const de={enabled:!0,workingColorSpace:ls,spaces:{},convert:function(s,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ge&&(s.r=Xn(s.r),s.g=Xn(s.g),s.b=Xn(s.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(s.applyMatrix3(this.spaces[t].toXYZ),s.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ge&&(s.r=Qi(s.r),s.g=Qi(s.g),s.b=Qi(s.b))),s},fromWorkingColorSpace:function(s,t){return this.convert(s,this.workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ri?co:this.spaces[s].transfer},getLuminanceCoefficients:function(s,t=this.workingColorSpace){return s.fromArray(this.spaces[t].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,t,e){return s.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function Xn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Qi(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const jl=[.64,.33,.3,.6,.15,.06],Zl=[.2126,.7152,.0722],Kl=[.3127,.329],Jl=new ne().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ql=new ne().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);de.define({[ls]:{primaries:jl,whitePoint:Kl,transfer:co,toXYZ:Jl,fromXYZ:Ql,luminanceCoefficients:Zl,workingColorSpaceConfig:{unpackColorSpace:Ie},outputColorSpaceConfig:{drawingBufferColorSpace:Ie}},[Ie]:{primaries:jl,whitePoint:Kl,transfer:ge,toXYZ:Jl,fromXYZ:Ql,luminanceCoefficients:Zl,outputColorSpaceConfig:{drawingBufferColorSpace:Ie}}});let Ci;class qf{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ci===void 0&&(Ci=Bs("canvas")),Ci.width=t.width,Ci.height=t.height;const n=Ci.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ci}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Bs("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=Xn(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Xn(e[n]/255)*255):e[n]=Xn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let $f=0;class Kh{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:$f++}),this.uuid=Wn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(Mo(i[a].image)):r.push(Mo(i[a]))}else r=Mo(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function Mo(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?qf.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Yf=0;class Ke extends cs{constructor(t=Ke.DEFAULT_IMAGE,e=Ke.DEFAULT_MAPPING,n=wn,i=wn,r=Ze,a=yn,o=Sn,l=qn,c=Ke.DEFAULT_ANISOTROPY,h=ri){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Yf++}),this.uuid=Wn(),this.name="",this.source=new Kh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new _t(0,0),this.repeat=new _t(1,1),this.center=new _t(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ne,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Oh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case dn:t.x=t.x-Math.floor(t.x);break;case wn:t.x=t.x<0?0:1;break;case La:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case dn:t.y=t.y-Math.floor(t.y);break;case wn:t.y=t.y<0?0:1;break;case La:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ke.DEFAULT_IMAGE=null;Ke.DEFAULT_MAPPING=Oh;Ke.DEFAULT_ANISOTROPY=1;class xe{constructor(t=0,e=0,n=0,i=1){xe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(c+1)/2,x=(f+1)/2,E=(p+1)/2,y=(h+u)/4,R=(d+_)/4,A=(g+m)/4;return M>x&&M>E?M<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(M),i=y/n,r=R/n):x>E?x<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(x),n=y/i,r=A/i):E<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(E),n=R/r,i=A/r),this.set(n,i,r,e),this}let w=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(w)<.001&&(w=1),this.x=(m-g)/w,this.y=(d-_)/w,this.z=(u-h)/w,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class jf extends cs{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new xe(0,0,t,e),this.scissorTest=!1,this.viewport=new xe(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ze,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Ke(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Kh(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ti extends jf{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Jh extends Ke{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Tn,this.minFilter=Tn,this.wrapR=wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Zf extends Ke{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Tn,this.minFilter=Tn,this.wrapR=wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class $s{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],d=n[i+3];const u=r[a+0],f=r[a+1],g=r[a+2],_=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(o===1){t[e+0]=u,t[e+1]=f,t[e+2]=g,t[e+3]=_;return}if(d!==_||l!==u||c!==f||h!==g){let m=1-o;const p=l*u+c*f+h*g+d*_,w=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){const E=Math.sqrt(M),y=Math.atan2(E,p*w);m=Math.sin(m*y)/E,o=Math.sin(o*y)/E}const x=o*w;if(l=l*m+u*x,c=c*m+f*x,h=h*m+g*x,d=d*m+_*x,m===1-o){const E=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=E,c*=E,h*=E,d*=E}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,i,r,a){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],d=r[a],u=r[a+1],f=r[a+2],g=r[a+3];return t[e]=o*g+h*d+l*f-c*u,t[e+1]=l*g+h*u+c*d-o*f,t[e+2]=c*g+h*f+o*u-l*d,t[e+3]=h*g-o*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),d=o(r/2),u=l(n/2),f=l(i/2),g=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+o+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-i)*f}else if(n>o&&n>d){const f=2*Math.sqrt(1+n-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+c)/f}else if(o>d){const f=2*Math.sqrt(1+o-n-d);this._w=(r-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+d-n-o);this._w=(a-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ye(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+i*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-e;return this._w=f*a+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),d=Math.sin((1-e)*h)/c,u=Math.sin(e*h)/c;return this._w=a*d+this._w*u,this._x=n*d+this._x*u,this._y=i*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(t=0,e=0,n=0){D.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(tc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(tc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*i-o*n),h=2*(o*e-r*i),d=2*(r*n-a*e);return this.x=e+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=i+l*d+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return wo.copy(this).projectOnVector(t),this.sub(wo)}reflect(t){return this.sub(wo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ye(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const wo=new D,tc=new $s;class Ys{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(_n.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(_n.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=_n.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,_n):_n.fromBufferAttribute(r,a),_n.applyMatrix4(t.matrixWorld),this.expandByPoint(_n);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),tr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),tr.copy(n.boundingBox)),tr.applyMatrix4(t.matrixWorld),this.union(tr)}const i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,_n),_n.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ps),er.subVectors(this.max,ps),Li.subVectors(t.a,ps),Pi.subVectors(t.b,ps),Ui.subVectors(t.c,ps),Zn.subVectors(Pi,Li),Kn.subVectors(Ui,Pi),ui.subVectors(Li,Ui);let e=[0,-Zn.z,Zn.y,0,-Kn.z,Kn.y,0,-ui.z,ui.y,Zn.z,0,-Zn.x,Kn.z,0,-Kn.x,ui.z,0,-ui.x,-Zn.y,Zn.x,0,-Kn.y,Kn.x,0,-ui.y,ui.x,0];return!yo(e,Li,Pi,Ui,er)||(e=[1,0,0,0,1,0,0,0,1],!yo(e,Li,Pi,Ui,er))?!1:(nr.crossVectors(Zn,Kn),e=[nr.x,nr.y,nr.z],yo(e,Li,Pi,Ui,er))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,_n).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(_n).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(kn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const kn=[new D,new D,new D,new D,new D,new D,new D,new D],_n=new D,tr=new Ys,Li=new D,Pi=new D,Ui=new D,Zn=new D,Kn=new D,ui=new D,ps=new D,er=new D,nr=new D,fi=new D;function yo(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){fi.fromArray(s,r);const o=i.x*Math.abs(fi.x)+i.y*Math.abs(fi.y)+i.z*Math.abs(fi.z),l=t.dot(fi),c=e.dot(fi),h=n.dot(fi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Kf=new Ys,ms=new D,So=new D;class ho{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Kf.setFromPoints(t).getCenter(n);let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ms.subVectors(t,this.center);const e=ms.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(ms,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(So.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ms.copy(t.center).add(So)),this.expandByPoint(ms.copy(t.center).sub(So))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Nn=new D,To=new D,ir=new D,Jn=new D,Eo=new D,sr=new D,Ao=new D;class Tl{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Nn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Nn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Nn.copy(this.origin).addScaledVector(this.direction,e),Nn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){To.copy(t).add(e).multiplyScalar(.5),ir.copy(e).sub(t).normalize(),Jn.copy(this.origin).sub(To);const r=t.distanceTo(e)*.5,a=-this.direction.dot(ir),o=Jn.dot(this.direction),l=-Jn.dot(ir),c=Jn.lengthSq(),h=Math.abs(1-a*a);let d,u,f,g;if(h>0)if(d=a*l-o,u=a*o-l,g=r*h,d>=0)if(u>=-g)if(u<=g){const _=1/h;d*=_,u*=_,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(To).addScaledVector(ir,u),f}intersectSphere(t,e){Nn.subVectors(t.center,this.origin);const n=Nn.dot(this.direction),i=Nn.dot(Nn)-n*n,r=t.radius*t.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,i=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,i=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),d>=0?(o=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Nn)!==null}intersectTriangle(t,e,n,i,r){Eo.subVectors(e,t),sr.subVectors(n,t),Ao.crossVectors(Eo,sr);let a=this.direction.dot(Ao),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Jn.subVectors(this.origin,t);const l=o*this.direction.dot(sr.crossVectors(Jn,sr));if(l<0)return null;const c=o*this.direction.dot(Eo.cross(Jn));if(c<0||l+c>a)return null;const h=-o*Jn.dot(Ao);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class we{constructor(t,e,n,i,r,a,o,l,c,h,d,u,f,g,_,m){we.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c,h,d,u,f,g,_,m)}set(t,e,n,i,r,a,o,l,c,h,d,u,f,g,_,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new we().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Di.setFromMatrixColumn(t,0).length(),r=1/Di.setFromMatrixColumn(t,1).length(),a=1/Di.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const u=a*h,f=a*d,g=o*h,_=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+g*c,e[5]=u-_*c,e[9]=-o*l,e[2]=_-u*c,e[6]=g+f*c,e[10]=a*l}else if(t.order==="YXZ"){const u=l*h,f=l*d,g=c*h,_=c*d;e[0]=u+_*o,e[4]=g*o-f,e[8]=a*c,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=f*o-g,e[6]=_+u*o,e[10]=a*l}else if(t.order==="ZXY"){const u=l*h,f=l*d,g=c*h,_=c*d;e[0]=u-_*o,e[4]=-a*d,e[8]=g+f*o,e[1]=f+g*o,e[5]=a*h,e[9]=_-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const u=a*h,f=a*d,g=o*h,_=o*d;e[0]=l*h,e[4]=g*c-f,e[8]=u*c+_,e[1]=l*d,e[5]=_*c+u,e[9]=f*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const u=a*l,f=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=_-u*d,e[8]=g*d+f,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*d+g,e[10]=u-_*d}else if(t.order==="XZY"){const u=a*l,f=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+_,e[5]=a*h,e[9]=f*d-g,e[2]=g*d-f,e[6]=o*h,e[10]=_*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Jf,t,Qf)}lookAt(t,e,n){const i=this.elements;return ln.subVectors(t,e),ln.lengthSq()===0&&(ln.z=1),ln.normalize(),Qn.crossVectors(n,ln),Qn.lengthSq()===0&&(Math.abs(n.z)===1?ln.x+=1e-4:ln.z+=1e-4,ln.normalize(),Qn.crossVectors(n,ln)),Qn.normalize(),rr.crossVectors(ln,Qn),i[0]=Qn.x,i[4]=rr.x,i[8]=ln.x,i[1]=Qn.y,i[5]=rr.y,i[9]=ln.y,i[2]=Qn.z,i[6]=rr.z,i[10]=ln.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],w=n[3],M=n[7],x=n[11],E=n[15],y=i[0],R=i[4],A=i[8],v=i[12],b=i[1],C=i[5],U=i[9],I=i[13],V=i[2],$=i[6],X=i[10],rt=i[14],j=i[3],ft=i[7],xt=i[11],Rt=i[15];return r[0]=a*y+o*b+l*V+c*j,r[4]=a*R+o*C+l*$+c*ft,r[8]=a*A+o*U+l*X+c*xt,r[12]=a*v+o*I+l*rt+c*Rt,r[1]=h*y+d*b+u*V+f*j,r[5]=h*R+d*C+u*$+f*ft,r[9]=h*A+d*U+u*X+f*xt,r[13]=h*v+d*I+u*rt+f*Rt,r[2]=g*y+_*b+m*V+p*j,r[6]=g*R+_*C+m*$+p*ft,r[10]=g*A+_*U+m*X+p*xt,r[14]=g*v+_*I+m*rt+p*Rt,r[3]=w*y+M*b+x*V+E*j,r[7]=w*R+M*C+x*$+E*ft,r[11]=w*A+M*U+x*X+E*xt,r[15]=w*v+M*I+x*rt+E*Rt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+r*l*d-i*c*d-r*o*u+n*c*u+i*o*f-n*l*f)+_*(+e*l*f-e*c*u+r*a*u-i*a*f+i*c*h-r*l*h)+m*(+e*c*d-e*o*f-r*a*d+n*a*f+r*o*h-n*c*h)+p*(-i*o*h-e*l*d+e*o*u+i*a*d-n*a*u+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],g=t[12],_=t[13],m=t[14],p=t[15],w=d*m*c-_*u*c+_*l*f-o*m*f-d*l*p+o*u*p,M=g*u*c-h*m*c-g*l*f+a*m*f+h*l*p-a*u*p,x=h*_*c-g*d*c+g*o*f-a*_*f-h*o*p+a*d*p,E=g*d*l-h*_*l-g*o*u+a*_*u+h*o*m-a*d*m,y=e*w+n*M+i*x+r*E;if(y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/y;return t[0]=w*R,t[1]=(_*u*r-d*m*r-_*i*f+n*m*f+d*i*p-n*u*p)*R,t[2]=(o*m*r-_*l*r+_*i*c-n*m*c-o*i*p+n*l*p)*R,t[3]=(d*l*r-o*u*r-d*i*c+n*u*c+o*i*f-n*l*f)*R,t[4]=M*R,t[5]=(h*m*r-g*u*r+g*i*f-e*m*f-h*i*p+e*u*p)*R,t[6]=(g*l*r-a*m*r-g*i*c+e*m*c+a*i*p-e*l*p)*R,t[7]=(a*u*r-h*l*r+h*i*c-e*u*c-a*i*f+e*l*f)*R,t[8]=x*R,t[9]=(g*d*r-h*_*r-g*n*f+e*_*f+h*n*p-e*d*p)*R,t[10]=(a*_*r-g*o*r+g*n*c-e*_*c-a*n*p+e*o*p)*R,t[11]=(h*o*r-a*d*r-h*n*c+e*d*c+a*n*f-e*o*f)*R,t[12]=E*R,t[13]=(h*_*i-g*d*i+g*n*u-e*_*u-h*n*m+e*d*m)*R,t[14]=(g*o*i-a*_*i-g*n*l+e*_*l+a*n*m-e*o*m)*R,t[15]=(a*d*i-h*o*i+h*n*l-e*d*l-a*n*u+e*o*u)*R,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,d=o+o,u=r*c,f=r*h,g=r*d,_=a*h,m=a*d,p=o*d,w=l*c,M=l*h,x=l*d,E=n.x,y=n.y,R=n.z;return i[0]=(1-(_+p))*E,i[1]=(f+x)*E,i[2]=(g-M)*E,i[3]=0,i[4]=(f-x)*y,i[5]=(1-(u+p))*y,i[6]=(m+w)*y,i[7]=0,i[8]=(g+M)*R,i[9]=(m-w)*R,i[10]=(1-(u+_))*R,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=Di.set(i[0],i[1],i[2]).length();const a=Di.set(i[4],i[5],i[6]).length(),o=Di.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],xn.copy(this);const c=1/r,h=1/a,d=1/o;return xn.elements[0]*=c,xn.elements[1]*=c,xn.elements[2]*=c,xn.elements[4]*=h,xn.elements[5]*=h,xn.elements[6]*=h,xn.elements[8]*=d,xn.elements[9]*=d,xn.elements[10]*=d,e.setFromRotationMatrix(xn),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,i,r,a,o=Vn){const l=this.elements,c=2*r/(e-t),h=2*r/(n-i),d=(e+t)/(e-t),u=(n+i)/(n-i);let f,g;if(o===Vn)f=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Qr)f=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,r,a,o=Vn){const l=this.elements,c=1/(e-t),h=1/(n-i),d=1/(a-r),u=(e+t)*c,f=(n+i)*h;let g,_;if(o===Vn)g=(a+r)*d,_=-2*d;else if(o===Qr)g=r*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Di=new D,xn=new we,Jf=new D(0,0,0),Qf=new D(1,1,1),Qn=new D,rr=new D,ln=new D,ec=new we,nc=new $s;class En{constructor(t=0,e=0,n=0,i=En.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(Ye(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ye(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ye(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ye(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ye(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ye(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return ec.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ec,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return nc.setFromEuler(this),this.setFromQuaternion(nc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}En.DEFAULT_ORDER="XYZ";class El{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let tp=0;const ic=new D,Ii=new $s,Fn=new we,or=new D,gs=new D,ep=new D,np=new $s,sc=new D(1,0,0),rc=new D(0,1,0),oc=new D(0,0,1),ac={type:"added"},ip={type:"removed"},ki={type:"childadded",child:null},Ro={type:"childremoved",child:null};class Ne extends cs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:tp++}),this.uuid=Wn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ne.DEFAULT_UP.clone();const t=new D,e=new En,n=new $s,i=new D(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new we},normalMatrix:{value:new ne}}),this.matrix=new we,this.matrixWorld=new we,this.matrixAutoUpdate=Ne.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ne.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new El,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ii.setFromAxisAngle(t,e),this.quaternion.multiply(Ii),this}rotateOnWorldAxis(t,e){return Ii.setFromAxisAngle(t,e),this.quaternion.premultiply(Ii),this}rotateX(t){return this.rotateOnAxis(sc,t)}rotateY(t){return this.rotateOnAxis(rc,t)}rotateZ(t){return this.rotateOnAxis(oc,t)}translateOnAxis(t,e){return ic.copy(t).applyQuaternion(this.quaternion),this.position.add(ic.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(sc,t)}translateY(t){return this.translateOnAxis(rc,t)}translateZ(t){return this.translateOnAxis(oc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Fn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?or.copy(t):or.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),gs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Fn.lookAt(gs,or,this.up):Fn.lookAt(or,gs,this.up),this.quaternion.setFromRotationMatrix(Fn),i&&(Fn.extractRotation(i.matrixWorld),Ii.setFromRotationMatrix(Fn),this.quaternion.premultiply(Ii.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ac),ki.child=t,this.dispatchEvent(ki),ki.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(ip),Ro.child=t,this.dispatchEvent(Ro),Ro.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Fn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Fn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Fn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ac),ki.child=t,this.dispatchEvent(ki),ki.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gs,t,ep),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gs,np,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),f=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}Ne.DEFAULT_UP=new D(0,1,0);Ne.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ne.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const vn=new D,On=new D,Co=new D,Bn=new D,Ni=new D,Fi=new D,lc=new D,Lo=new D,Po=new D,Uo=new D,Do=new xe,Io=new xe,ko=new xe;class mn{constructor(t=new D,e=new D,n=new D){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),vn.subVectors(t,e),i.cross(vn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){vn.subVectors(i,e),On.subVectors(n,e),Co.subVectors(t,e);const a=vn.dot(vn),o=vn.dot(On),l=vn.dot(Co),c=On.dot(On),h=On.dot(Co),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;const u=1/d,f=(c*l-o*h)*u,g=(a*h-o*l)*u;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Bn)===null?!1:Bn.x>=0&&Bn.y>=0&&Bn.x+Bn.y<=1}static getInterpolation(t,e,n,i,r,a,o,l){return this.getBarycoord(t,e,n,i,Bn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Bn.x),l.addScaledVector(a,Bn.y),l.addScaledVector(o,Bn.z),l)}static getInterpolatedAttribute(t,e,n,i,r,a){return Do.setScalar(0),Io.setScalar(0),ko.setScalar(0),Do.fromBufferAttribute(t,e),Io.fromBufferAttribute(t,n),ko.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(Do,r.x),a.addScaledVector(Io,r.y),a.addScaledVector(ko,r.z),a}static isFrontFacing(t,e,n,i){return vn.subVectors(n,e),On.subVectors(t,e),vn.cross(On).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return vn.subVectors(this.c,this.b),On.subVectors(this.a,this.b),vn.cross(On).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return mn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return mn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return mn.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return mn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return mn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let a,o;Ni.subVectors(i,n),Fi.subVectors(r,n),Lo.subVectors(t,n);const l=Ni.dot(Lo),c=Fi.dot(Lo);if(l<=0&&c<=0)return e.copy(n);Po.subVectors(t,i);const h=Ni.dot(Po),d=Fi.dot(Po);if(h>=0&&d<=h)return e.copy(i);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(Ni,a);Uo.subVectors(t,r);const f=Ni.dot(Uo),g=Fi.dot(Uo);if(g>=0&&f<=g)return e.copy(r);const _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(Fi,o);const m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return lc.subVectors(r,i),o=(d-h)/(d-h+(f-g)),e.copy(i).addScaledVector(lc,o);const p=1/(m+_+u);return a=_*p,o=u*p,e.copy(n).addScaledVector(Ni,a).addScaledVector(Fi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Qh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ti={h:0,s:0,l:0},ar={h:0,s:0,l:0};function No(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class Ot{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ie){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,de.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=de.workingColorSpace){return this.r=t,this.g=e,this.b=n,de.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=de.workingColorSpace){if(t=Hf(t,1),e=Ye(e,0,1),n=Ye(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=No(a,r,t+1/3),this.g=No(a,r,t),this.b=No(a,r,t-1/3)}return de.toWorkingColorSpace(this,i),this}setStyle(t,e=Ie){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ie){const n=Qh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Xn(t.r),this.g=Xn(t.g),this.b=Xn(t.b),this}copyLinearToSRGB(t){return this.r=Qi(t.r),this.g=Qi(t.g),this.b=Qi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ie){return de.fromWorkingColorSpace(We.copy(this),t),Math.round(Ye(We.r*255,0,255))*65536+Math.round(Ye(We.g*255,0,255))*256+Math.round(Ye(We.b*255,0,255))}getHexString(t=Ie){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=de.workingColorSpace){de.fromWorkingColorSpace(We.copy(this),e);const n=We.r,i=We.g,r=We.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(i-r)/d+(i<r?6:0);break;case i:l=(r-n)/d+2;break;case r:l=(n-i)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=de.workingColorSpace){return de.fromWorkingColorSpace(We.copy(this),e),t.r=We.r,t.g=We.g,t.b=We.b,t}getStyle(t=Ie){de.fromWorkingColorSpace(We.copy(this),t);const e=We.r,n=We.g,i=We.b;return t!==Ie?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(ti),this.setHSL(ti.h+t,ti.s+e,ti.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ti),t.getHSL(ar);const n=vo(ti.h,ar.h,e),i=vo(ti.s,ar.s,e),r=vo(ti.l,ar.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const We=new Ot;Ot.NAMES=Qh;let sp=0;class di extends cs{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:sp++}),this.uuid=Wn(),this.name="",this.blending=Ki,this.side=li,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=va,this.blendDst=ba,this.blendEquation=Mi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ot(0,0,0),this.blendAlpha=0,this.depthFunc=es,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ql,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ri,this.stencilZFail=Ri,this.stencilZPass=Ri,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ki&&(n.blending=this.blending),this.side!==li&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==va&&(n.blendSrc=this.blendSrc),this.blendDst!==ba&&(n.blendDst=this.blendDst),this.blendEquation!==Mi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==es&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ql&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ri&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ri&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ri&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=i(t.textures),a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class De extends di{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new En,this.combine=ao,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ue=new D,lr=new _t;class je{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=il,this.updateRanges=[],this.gpuType=Gn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)lr.fromBufferAttribute(this,e),lr.applyMatrix3(t),this.setXY(e,lr.x,lr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyMatrix3(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyMatrix4(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyNormalMatrix(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.transformDirection(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Pn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=_e(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Pn(e,this.array)),e}setX(t,e){return this.normalized&&(e=_e(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Pn(e,this.array)),e}setY(t,e){return this.normalized&&(e=_e(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Pn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=_e(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Pn(e,this.array)),e}setW(t,e){return this.normalized&&(e=_e(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=_e(e,this.array),n=_e(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=_e(e,this.array),n=_e(n,this.array),i=_e(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=_e(e,this.array),n=_e(n,this.array),i=_e(i,this.array),r=_e(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==il&&(t.usage=this.usage),t}}class td extends je{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class ed extends je{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ue extends je{constructor(t,e,n){super(new Float32Array(t),e,n)}}let rp=0;const fn=new we,Fo=new Ne,Oi=new D,cn=new Ys,_s=new Ys,ze=new D;class Pe extends cs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:rp++}),this.uuid=Wn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Zh(t)?ed:td)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new ne().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return fn.makeRotationFromQuaternion(t),this.applyMatrix4(fn),this}rotateX(t){return fn.makeRotationX(t),this.applyMatrix4(fn),this}rotateY(t){return fn.makeRotationY(t),this.applyMatrix4(fn),this}rotateZ(t){return fn.makeRotationZ(t),this.applyMatrix4(fn),this}translate(t,e,n){return fn.makeTranslation(t,e,n),this.applyMatrix4(fn),this}scale(t,e,n){return fn.makeScale(t,e,n),this.applyMatrix4(fn),this}lookAt(t){return Fo.lookAt(t),Fo.updateMatrix(),this.applyMatrix4(Fo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Oi).negate(),this.translate(Oi.x,Oi.y,Oi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,r=t.length;i<r;i++){const a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ue(n,3))}else{for(let n=0,i=e.count;n<i;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ys);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];cn.setFromBufferAttribute(r),this.morphTargetsRelative?(ze.addVectors(this.boundingBox.min,cn.min),this.boundingBox.expandByPoint(ze),ze.addVectors(this.boundingBox.max,cn.max),this.boundingBox.expandByPoint(ze)):(this.boundingBox.expandByPoint(cn.min),this.boundingBox.expandByPoint(cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ho);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){const n=this.boundingSphere.center;if(cn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];_s.setFromBufferAttribute(o),this.morphTargetsRelative?(ze.addVectors(cn.min,_s.min),cn.expandByPoint(ze),ze.addVectors(cn.max,_s.max),cn.expandByPoint(ze)):(cn.expandByPoint(_s.min),cn.expandByPoint(_s.max))}cn.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)ze.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(ze));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)ze.fromBufferAttribute(o,c),l&&(Oi.fromBufferAttribute(t,c),ze.add(Oi)),i=Math.max(i,n.distanceToSquared(ze))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new je(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let A=0;A<n.count;A++)o[A]=new D,l[A]=new D;const c=new D,h=new D,d=new D,u=new _t,f=new _t,g=new _t,_=new D,m=new D;function p(A,v,b){c.fromBufferAttribute(n,A),h.fromBufferAttribute(n,v),d.fromBufferAttribute(n,b),u.fromBufferAttribute(r,A),f.fromBufferAttribute(r,v),g.fromBufferAttribute(r,b),h.sub(c),d.sub(c),f.sub(u),g.sub(u);const C=1/(f.x*g.y-g.x*f.y);isFinite(C)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(C),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(C),o[A].add(_),o[v].add(_),o[b].add(_),l[A].add(m),l[v].add(m),l[b].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let A=0,v=w.length;A<v;++A){const b=w[A],C=b.start,U=b.count;for(let I=C,V=C+U;I<V;I+=3)p(t.getX(I+0),t.getX(I+1),t.getX(I+2))}const M=new D,x=new D,E=new D,y=new D;function R(A){E.fromBufferAttribute(i,A),y.copy(E);const v=o[A];M.copy(v),M.sub(E.multiplyScalar(E.dot(v))).normalize(),x.crossVectors(y,v);const C=x.dot(l[A])<0?-1:1;a.setXYZW(A,M.x,M.y,M.z,C)}for(let A=0,v=w.length;A<v;++A){const b=w[A],C=b.start,U=b.count;for(let I=C,V=C+U;I<V;I+=3)R(t.getX(I+0)),R(t.getX(I+1)),R(t.getX(I+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new je(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const i=new D,r=new D,a=new D,o=new D,l=new D,c=new D,h=new D,d=new D;if(t)for(let u=0,f=t.count;u<f;u+=3){const g=t.getX(u+0),_=t.getX(u+1),m=t.getX(u+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,m),h.subVectors(a,r),d.subVectors(i,r),h.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)i.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),d.subVectors(i,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)ze.fromBufferAttribute(t,e),ze.normalize(),t.setXYZ(e,ze.x,ze.y,ze.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h);let f=0,g=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*h;for(let p=0;p<h;p++)u[g++]=c[f++]}return new je(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Pe,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){const u=c[h],f=t(u,n);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const cc=new we,pi=new Tl,cr=new ho,hc=new D,hr=new D,dr=new D,ur=new D,Oo=new D,fr=new D,dc=new D,pr=new D;class K extends Ne{constructor(t=new Pe,e=new De){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const o=this.morphTargetInfluences;if(r&&o){fr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],d=r[l];h!==0&&(Oo.fromBufferAttribute(d,t),a?fr.addScaledVector(Oo,h):fr.addScaledVector(Oo.sub(e),h))}e.add(fr)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),cr.copy(n.boundingSphere),cr.applyMatrix4(r),pi.copy(t.ray).recast(t.near),!(cr.containsPoint(pi.origin)===!1&&(pi.intersectSphere(cr,hc)===null||pi.origin.distanceToSquared(hc)>(t.far-t.near)**2))&&(cc.copy(r).invert(),pi.copy(t.ray).applyMatrix4(cc),!(n.boundingBox!==null&&pi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,pi)))}_computeIntersections(t,e,n){let i;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){const m=u[g],p=a[m.materialIndex],w=Math.max(m.start,f.start),M=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let x=w,E=M;x<E;x+=3){const y=o.getX(x),R=o.getX(x+1),A=o.getX(x+2);i=mr(this,p,t,n,c,h,d,y,R,A),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const w=o.getX(m),M=o.getX(m+1),x=o.getX(m+2);i=mr(this,a,t,n,c,h,d,w,M,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){const m=u[g],p=a[m.materialIndex],w=Math.max(m.start,f.start),M=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let x=w,E=M;x<E;x+=3){const y=x,R=x+1,A=x+2;i=mr(this,p,t,n,c,h,d,y,R,A),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const w=m,M=m+1,x=m+2;i=mr(this,a,t,n,c,h,d,w,M,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}}function op(s,t,e,n,i,r,a,o){let l;if(t.side===sn?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,t.side===li,o),l===null)return null;pr.copy(o),pr.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(pr);return c<e.near||c>e.far?null:{distance:c,point:pr.clone(),object:s}}function mr(s,t,e,n,i,r,a,o,l,c){s.getVertexPosition(o,hr),s.getVertexPosition(l,dr),s.getVertexPosition(c,ur);const h=op(s,t,e,n,hr,dr,ur,dc);if(h){const d=new D;mn.getBarycoord(dc,hr,dr,ur,d),i&&(h.uv=mn.getInterpolatedAttribute(i,o,l,c,d,new _t)),r&&(h.uv1=mn.getInterpolatedAttribute(r,o,l,c,d,new _t)),a&&(h.normal=mn.getInterpolatedAttribute(a,o,l,c,d,new D),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new D,materialIndex:0};mn.getNormal(hr,dr,ur,u.normal),h.face=u,h.barycoord=d}return h}class Me extends Pe{constructor(t=1,e=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],d=[];let u=0,f=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,i,a,2),g("x","z","y",1,-1,t,n,-e,i,a,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new ue(c,3)),this.setAttribute("normal",new ue(h,3)),this.setAttribute("uv",new ue(d,2));function g(_,m,p,w,M,x,E,y,R,A,v){const b=x/R,C=E/A,U=x/2,I=E/2,V=y/2,$=R+1,X=A+1;let rt=0,j=0;const ft=new D;for(let xt=0;xt<X;xt++){const Rt=xt*C-I;for(let Wt=0;Wt<$;Wt++){const ae=Wt*b-U;ft[_]=ae*w,ft[m]=Rt*M,ft[p]=V,c.push(ft.x,ft.y,ft.z),ft[_]=0,ft[m]=0,ft[p]=y>0?1:-1,h.push(ft.x,ft.y,ft.z),d.push(Wt/R),d.push(1-xt/A),rt+=1}}for(let xt=0;xt<A;xt++)for(let Rt=0;Rt<R;Rt++){const Wt=u+Rt+$*xt,ae=u+Rt+$*(xt+1),J=u+(Rt+1)+$*(xt+1),ot=u+(Rt+1)+$*xt;l.push(Wt,ae,ot),l.push(ae,J,ot),j+=6}o.addGroup(f,j,v),f+=j,u+=rt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Me(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function os(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function en(s){const t={};for(let e=0;e<s.length;e++){const n=os(s[e]);for(const i in n)t[i]=n[i]}return t}function ap(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function nd(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:de.workingColorSpace}const lp={clone:os,merge:en};var cp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,hp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ci extends di{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=cp,this.fragmentShader=hp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=os(t.uniforms),this.uniformsGroups=ap(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class id extends Ne{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new we,this.projectionMatrix=new we,this.projectionMatrixInverse=new we,this.coordinateSystem=Vn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ei=new D,uc=new _t,fc=new _t;class hn extends id{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=sl*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(xo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return sl*2*Math.atan(Math.tan(xo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ei.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ei.x,ei.y).multiplyScalar(-t/ei.z),ei.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ei.x,ei.y).multiplyScalar(-t/ei.z)}getViewSize(t,e){return this.getViewBounds(t,uc,fc),e.subVectors(fc,uc)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(xo*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,e-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Bi=-90,zi=1;class dp extends Ne{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new hn(Bi,zi,t,e);i.layers=this.layers,this.add(i);const r=new hn(Bi,zi,t,e);r.layers=this.layers,this.add(r);const a=new hn(Bi,zi,t,e);a.layers=this.layers,this.add(a);const o=new hn(Bi,zi,t,e);o.layers=this.layers,this.add(o);const l=new hn(Bi,zi,t,e);l.layers=this.layers,this.add(l);const c=new hn(Bi,zi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===Vn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Qr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,a),t.setRenderTarget(n,2,i),t.render(e,o),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class sd extends Ke{constructor(t,e,n,i,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:ns,super(t,e,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class up extends Ti{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new sd(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Ze}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Me(5,5,5),r=new ci({name:"CubemapFromEquirect",uniforms:os(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:sn,blending:oi});r.uniforms.tEquirect.value=e;const a=new K(i,r),o=e.minFilter;return e.minFilter===yn&&(e.minFilter=Ze),new dp(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,i){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(r)}}const Bo=new D,fp=new D,pp=new ne;class xi{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Bo.subVectors(n,e).cross(fp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Bo),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||pp.getNormalMatrix(t),i=this.coplanarPoint(Bo).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const mi=new ho,gr=new D;class Al{constructor(t=new xi,e=new xi,n=new xi,i=new xi,r=new xi,a=new xi){this.planes=[t,e,n,i,r,a]}set(t,e,n,i,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Vn){const n=this.planes,i=t.elements,r=i[0],a=i[1],o=i[2],l=i[3],c=i[4],h=i[5],d=i[6],u=i[7],f=i[8],g=i[9],_=i[10],m=i[11],p=i[12],w=i[13],M=i[14],x=i[15];if(n[0].setComponents(l-r,u-c,m-f,x-p).normalize(),n[1].setComponents(l+r,u+c,m+f,x+p).normalize(),n[2].setComponents(l+a,u+h,m+g,x+w).normalize(),n[3].setComponents(l-a,u-h,m-g,x-w).normalize(),n[4].setComponents(l-o,u-d,m-_,x-M).normalize(),e===Vn)n[5].setComponents(l+o,u+d,m+_,x+M).normalize();else if(e===Qr)n[5].setComponents(o,d,_,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),mi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),mi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(mi)}intersectsSprite(t){return mi.center.set(0,0,0),mi.radius=.7071067811865476,mi.applyMatrix4(t.matrixWorld),this.intersectsSphere(mi)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(gr.x=i.normal.x>0?t.max.x:t.min.x,gr.y=i.normal.y>0?t.max.y:t.min.y,gr.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(gr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function rd(){let s=null,t=!1,e=null,n=null;function i(r,a){e(r,a),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function mp(s){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,d=c.byteLength,u=s.createBuffer();s.bindBuffer(l,u),s.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const h=l.array,d=l.updateRanges;if(s.bindBuffer(c,o),d.length===0)s.bufferSubData(c,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){const g=d[u],_=d[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++u,d[u]=_)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){const _=d[f];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}class Bt extends Pe{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,d=t/o,u=e/l,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const w=p*u-a;for(let M=0;M<c;M++){const x=M*d-r;g.push(x,-w,0),_.push(0,0,1),m.push(M/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let w=0;w<o;w++){const M=w+c*p,x=w+c*(p+1),E=w+1+c*(p+1),y=w+1+c*p;f.push(M,x,y),f.push(x,E,y)}this.setIndex(f),this.setAttribute("position",new ue(g,3)),this.setAttribute("normal",new ue(_,3)),this.setAttribute("uv",new ue(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Bt(t.width,t.height,t.widthSegments,t.heightSegments)}}var gp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,_p=`#ifdef USE_ALPHAHASH
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
#endif`,xp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,vp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,bp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Mp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,wp=`#ifdef USE_AOMAP
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
#endif`,yp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Sp=`#ifdef USE_BATCHING
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
#endif`,Tp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ep=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ap=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Rp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Cp=`#ifdef USE_IRIDESCENCE
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
#endif`,Lp=`#ifdef USE_BUMPMAP
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
#endif`,Pp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Up=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Dp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ip=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,kp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Np=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Fp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Op=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Bp=`#define PI 3.141592653589793
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
} // validated`,zp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Hp=`vec3 transformedNormal = objectNormal;
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
#endif`,Gp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Vp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Wp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Xp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,qp="gl_FragColor = linearToOutputTexel( gl_FragColor );",$p=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Yp=`#ifdef USE_ENVMAP
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
#endif`,jp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Zp=`#ifdef USE_ENVMAP
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
#endif`,Kp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Jp=`#ifdef USE_ENVMAP
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
#endif`,Qp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,tm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,em=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,nm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,im=`#ifdef USE_GRADIENTMAP
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
}`,sm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,rm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,om=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,am=`uniform bool receiveShadow;
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
#endif`,lm=`#ifdef USE_ENVMAP
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
#endif`,cm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,hm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,dm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,um=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,fm=`PhysicalMaterial material;
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
#endif`,pm=`struct PhysicalMaterial {
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
}`,mm=`
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
#endif`,gm=`#if defined( RE_IndirectDiffuse )
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
#endif`,_m=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,xm=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,vm=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,bm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Mm=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,wm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ym=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Sm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Tm=`#if defined( USE_POINTS_UV )
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
#endif`,Em=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Am=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Rm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Cm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Lm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Pm=`#ifdef USE_MORPHTARGETS
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
#endif`,Um=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Dm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Im=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,km=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Nm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Fm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Om=`#ifdef USE_NORMALMAP
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
#endif`,Bm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,zm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Hm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Gm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Vm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Wm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Xm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,qm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,$m=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ym=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,jm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Zm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Km=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Jm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Qm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,tg=`float getShadowMask() {
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
}`,eg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ng=`#ifdef USE_SKINNING
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
#endif`,ig=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,sg=`#ifdef USE_SKINNING
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
#endif`,rg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,og=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ag=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,lg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,cg=`#ifdef USE_TRANSMISSION
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
#endif`,hg=`#ifdef USE_TRANSMISSION
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
#endif`,dg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ug=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,pg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const mg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,gg=`uniform sampler2D t2D;
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
}`,_g=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,vg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mg=`#include <common>
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
}`,wg=`#if DEPTH_PACKING == 3200
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
}`,yg=`#define DISTANCE
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
}`,Sg=`#define DISTANCE
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
}`,Tg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Eg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ag=`uniform float scale;
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
}`,Rg=`uniform vec3 diffuse;
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
}`,Cg=`#include <common>
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
}`,Lg=`uniform vec3 diffuse;
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
}`,Pg=`#define LAMBERT
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
}`,Ug=`#define LAMBERT
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
}`,Dg=`#define MATCAP
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
}`,Ig=`#define MATCAP
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
}`,kg=`#define NORMAL
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
}`,Ng=`#define NORMAL
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
}`,Fg=`#define PHONG
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
}`,Og=`#define PHONG
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
}`,Bg=`#define STANDARD
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
}`,zg=`#define STANDARD
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
}`,Hg=`#define TOON
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
}`,Gg=`#define TOON
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
}`,Vg=`uniform float size;
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
}`,Wg=`uniform vec3 diffuse;
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
}`,Xg=`#include <common>
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
}`,qg=`uniform vec3 color;
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
}`,$g=`uniform float rotation;
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
}`,Yg=`uniform vec3 diffuse;
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
}`,se={alphahash_fragment:gp,alphahash_pars_fragment:_p,alphamap_fragment:xp,alphamap_pars_fragment:vp,alphatest_fragment:bp,alphatest_pars_fragment:Mp,aomap_fragment:wp,aomap_pars_fragment:yp,batching_pars_vertex:Sp,batching_vertex:Tp,begin_vertex:Ep,beginnormal_vertex:Ap,bsdfs:Rp,iridescence_fragment:Cp,bumpmap_pars_fragment:Lp,clipping_planes_fragment:Pp,clipping_planes_pars_fragment:Up,clipping_planes_pars_vertex:Dp,clipping_planes_vertex:Ip,color_fragment:kp,color_pars_fragment:Np,color_pars_vertex:Fp,color_vertex:Op,common:Bp,cube_uv_reflection_fragment:zp,defaultnormal_vertex:Hp,displacementmap_pars_vertex:Gp,displacementmap_vertex:Vp,emissivemap_fragment:Wp,emissivemap_pars_fragment:Xp,colorspace_fragment:qp,colorspace_pars_fragment:$p,envmap_fragment:Yp,envmap_common_pars_fragment:jp,envmap_pars_fragment:Zp,envmap_pars_vertex:Kp,envmap_physical_pars_fragment:lm,envmap_vertex:Jp,fog_vertex:Qp,fog_pars_vertex:tm,fog_fragment:em,fog_pars_fragment:nm,gradientmap_pars_fragment:im,lightmap_pars_fragment:sm,lights_lambert_fragment:rm,lights_lambert_pars_fragment:om,lights_pars_begin:am,lights_toon_fragment:cm,lights_toon_pars_fragment:hm,lights_phong_fragment:dm,lights_phong_pars_fragment:um,lights_physical_fragment:fm,lights_physical_pars_fragment:pm,lights_fragment_begin:mm,lights_fragment_maps:gm,lights_fragment_end:_m,logdepthbuf_fragment:xm,logdepthbuf_pars_fragment:vm,logdepthbuf_pars_vertex:bm,logdepthbuf_vertex:Mm,map_fragment:wm,map_pars_fragment:ym,map_particle_fragment:Sm,map_particle_pars_fragment:Tm,metalnessmap_fragment:Em,metalnessmap_pars_fragment:Am,morphinstance_vertex:Rm,morphcolor_vertex:Cm,morphnormal_vertex:Lm,morphtarget_pars_vertex:Pm,morphtarget_vertex:Um,normal_fragment_begin:Dm,normal_fragment_maps:Im,normal_pars_fragment:km,normal_pars_vertex:Nm,normal_vertex:Fm,normalmap_pars_fragment:Om,clearcoat_normal_fragment_begin:Bm,clearcoat_normal_fragment_maps:zm,clearcoat_pars_fragment:Hm,iridescence_pars_fragment:Gm,opaque_fragment:Vm,packing:Wm,premultiplied_alpha_fragment:Xm,project_vertex:qm,dithering_fragment:$m,dithering_pars_fragment:Ym,roughnessmap_fragment:jm,roughnessmap_pars_fragment:Zm,shadowmap_pars_fragment:Km,shadowmap_pars_vertex:Jm,shadowmap_vertex:Qm,shadowmask_pars_fragment:tg,skinbase_vertex:eg,skinning_pars_vertex:ng,skinning_vertex:ig,skinnormal_vertex:sg,specularmap_fragment:rg,specularmap_pars_fragment:og,tonemapping_fragment:ag,tonemapping_pars_fragment:lg,transmission_fragment:cg,transmission_pars_fragment:hg,uv_pars_fragment:dg,uv_pars_vertex:ug,uv_vertex:fg,worldpos_vertex:pg,background_vert:mg,background_frag:gg,backgroundCube_vert:_g,backgroundCube_frag:xg,cube_vert:vg,cube_frag:bg,depth_vert:Mg,depth_frag:wg,distanceRGBA_vert:yg,distanceRGBA_frag:Sg,equirect_vert:Tg,equirect_frag:Eg,linedashed_vert:Ag,linedashed_frag:Rg,meshbasic_vert:Cg,meshbasic_frag:Lg,meshlambert_vert:Pg,meshlambert_frag:Ug,meshmatcap_vert:Dg,meshmatcap_frag:Ig,meshnormal_vert:kg,meshnormal_frag:Ng,meshphong_vert:Fg,meshphong_frag:Og,meshphysical_vert:Bg,meshphysical_frag:zg,meshtoon_vert:Hg,meshtoon_frag:Gg,points_vert:Vg,points_frag:Wg,shadow_vert:Xg,shadow_frag:qg,sprite_vert:$g,sprite_frag:Yg},gt={common:{diffuse:{value:new Ot(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ne},alphaMap:{value:null},alphaMapTransform:{value:new ne},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ne}},envmap:{envMap:{value:null},envMapRotation:{value:new ne},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ne}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ne}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ne},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ne},normalScale:{value:new _t(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ne},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ne}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ne}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ne}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ot(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ot(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ne},alphaTest:{value:0},uvTransform:{value:new ne}},sprite:{diffuse:{value:new Ot(16777215)},opacity:{value:1},center:{value:new _t(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ne},alphaMap:{value:null},alphaMapTransform:{value:new ne},alphaTest:{value:0}}},Ln={basic:{uniforms:en([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.fog]),vertexShader:se.meshbasic_vert,fragmentShader:se.meshbasic_frag},lambert:{uniforms:en([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,gt.lights,{emissive:{value:new Ot(0)}}]),vertexShader:se.meshlambert_vert,fragmentShader:se.meshlambert_frag},phong:{uniforms:en([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,gt.lights,{emissive:{value:new Ot(0)},specular:{value:new Ot(1118481)},shininess:{value:30}}]),vertexShader:se.meshphong_vert,fragmentShader:se.meshphong_frag},standard:{uniforms:en([gt.common,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.roughnessmap,gt.metalnessmap,gt.fog,gt.lights,{emissive:{value:new Ot(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:se.meshphysical_vert,fragmentShader:se.meshphysical_frag},toon:{uniforms:en([gt.common,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.gradientmap,gt.fog,gt.lights,{emissive:{value:new Ot(0)}}]),vertexShader:se.meshtoon_vert,fragmentShader:se.meshtoon_frag},matcap:{uniforms:en([gt.common,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,{matcap:{value:null}}]),vertexShader:se.meshmatcap_vert,fragmentShader:se.meshmatcap_frag},points:{uniforms:en([gt.points,gt.fog]),vertexShader:se.points_vert,fragmentShader:se.points_frag},dashed:{uniforms:en([gt.common,gt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:se.linedashed_vert,fragmentShader:se.linedashed_frag},depth:{uniforms:en([gt.common,gt.displacementmap]),vertexShader:se.depth_vert,fragmentShader:se.depth_frag},normal:{uniforms:en([gt.common,gt.bumpmap,gt.normalmap,gt.displacementmap,{opacity:{value:1}}]),vertexShader:se.meshnormal_vert,fragmentShader:se.meshnormal_frag},sprite:{uniforms:en([gt.sprite,gt.fog]),vertexShader:se.sprite_vert,fragmentShader:se.sprite_frag},background:{uniforms:{uvTransform:{value:new ne},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:se.background_vert,fragmentShader:se.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ne}},vertexShader:se.backgroundCube_vert,fragmentShader:se.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:se.cube_vert,fragmentShader:se.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:se.equirect_vert,fragmentShader:se.equirect_frag},distanceRGBA:{uniforms:en([gt.common,gt.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:se.distanceRGBA_vert,fragmentShader:se.distanceRGBA_frag},shadow:{uniforms:en([gt.lights,gt.fog,{color:{value:new Ot(0)},opacity:{value:1}}]),vertexShader:se.shadow_vert,fragmentShader:se.shadow_frag}};Ln.physical={uniforms:en([Ln.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ne},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ne},clearcoatNormalScale:{value:new _t(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ne},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ne},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ne},sheen:{value:0},sheenColor:{value:new Ot(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ne},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ne},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ne},transmissionSamplerSize:{value:new _t},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ne},attenuationDistance:{value:0},attenuationColor:{value:new Ot(0)},specularColor:{value:new Ot(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ne},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ne},anisotropyVector:{value:new _t},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ne}}]),vertexShader:se.meshphysical_vert,fragmentShader:se.meshphysical_frag};const _r={r:0,b:0,g:0},gi=new En,jg=new we;function Zg(s,t,e,n,i,r,a){const o=new Ot(0);let l=r===!0?0:1,c,h,d=null,u=0,f=null;function g(w){let M=w.isScene===!0?w.background:null;return M&&M.isTexture&&(M=(w.backgroundBlurriness>0?e:t).get(M)),M}function _(w){let M=!1;const x=g(w);x===null?p(o,l):x&&x.isColor&&(p(x,1),M=!0);const E=s.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,a):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(w,M){const x=g(M);x&&(x.isCubeTexture||x.mapping===lo)?(h===void 0&&(h=new K(new Me(1,1,1),new ci({name:"BackgroundCubeMaterial",uniforms:os(Ln.backgroundCube.uniforms),vertexShader:Ln.backgroundCube.vertexShader,fragmentShader:Ln.backgroundCube.fragmentShader,side:sn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,y,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),gi.copy(M.backgroundRotation),gi.x*=-1,gi.y*=-1,gi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(gi.y*=-1,gi.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(jg.makeRotationFromEuler(gi)),h.material.toneMapped=de.getTransfer(x.colorSpace)!==ge,(d!==x||u!==x.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,d=x,u=x.version,f=s.toneMapping),h.layers.enableAll(),w.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new K(new Bt(2,2),new ci({name:"BackgroundMaterial",uniforms:os(Ln.background.uniforms),vertexShader:Ln.background.vertexShader,fragmentShader:Ln.background.fragmentShader,side:li,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=de.getTransfer(x.colorSpace)!==ge,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(d!==x||u!==x.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,d=x,u=x.version,f=s.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function p(w,M){w.getRGB(_r,nd(s)),n.buffers.color.setClear(_r.r,_r.g,_r.b,M,a)}return{getClearColor:function(){return o},setClearColor:function(w,M=1){o.set(w),l=M,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,p(o,l)},render:_,addToRenderList:m}}function Kg(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=u(null);let r=i,a=!1;function o(b,C,U,I,V){let $=!1;const X=d(I,U,C);r!==X&&(r=X,c(r.object)),$=f(b,I,U,V),$&&g(b,I,U,V),V!==null&&t.update(V,s.ELEMENT_ARRAY_BUFFER),($||a)&&(a=!1,x(b,C,U,I),V!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function l(){return s.createVertexArray()}function c(b){return s.bindVertexArray(b)}function h(b){return s.deleteVertexArray(b)}function d(b,C,U){const I=U.wireframe===!0;let V=n[b.id];V===void 0&&(V={},n[b.id]=V);let $=V[C.id];$===void 0&&($={},V[C.id]=$);let X=$[I];return X===void 0&&(X=u(l()),$[I]=X),X}function u(b){const C=[],U=[],I=[];for(let V=0;V<e;V++)C[V]=0,U[V]=0,I[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:U,attributeDivisors:I,object:b,attributes:{},index:null}}function f(b,C,U,I){const V=r.attributes,$=C.attributes;let X=0;const rt=U.getAttributes();for(const j in rt)if(rt[j].location>=0){const xt=V[j];let Rt=$[j];if(Rt===void 0&&(j==="instanceMatrix"&&b.instanceMatrix&&(Rt=b.instanceMatrix),j==="instanceColor"&&b.instanceColor&&(Rt=b.instanceColor)),xt===void 0||xt.attribute!==Rt||Rt&&xt.data!==Rt.data)return!0;X++}return r.attributesNum!==X||r.index!==I}function g(b,C,U,I){const V={},$=C.attributes;let X=0;const rt=U.getAttributes();for(const j in rt)if(rt[j].location>=0){let xt=$[j];xt===void 0&&(j==="instanceMatrix"&&b.instanceMatrix&&(xt=b.instanceMatrix),j==="instanceColor"&&b.instanceColor&&(xt=b.instanceColor));const Rt={};Rt.attribute=xt,xt&&xt.data&&(Rt.data=xt.data),V[j]=Rt,X++}r.attributes=V,r.attributesNum=X,r.index=I}function _(){const b=r.newAttributes;for(let C=0,U=b.length;C<U;C++)b[C]=0}function m(b){p(b,0)}function p(b,C){const U=r.newAttributes,I=r.enabledAttributes,V=r.attributeDivisors;U[b]=1,I[b]===0&&(s.enableVertexAttribArray(b),I[b]=1),V[b]!==C&&(s.vertexAttribDivisor(b,C),V[b]=C)}function w(){const b=r.newAttributes,C=r.enabledAttributes;for(let U=0,I=C.length;U<I;U++)C[U]!==b[U]&&(s.disableVertexAttribArray(U),C[U]=0)}function M(b,C,U,I,V,$,X){X===!0?s.vertexAttribIPointer(b,C,U,V,$):s.vertexAttribPointer(b,C,U,I,V,$)}function x(b,C,U,I){_();const V=I.attributes,$=U.getAttributes(),X=C.defaultAttributeValues;for(const rt in $){const j=$[rt];if(j.location>=0){let ft=V[rt];if(ft===void 0&&(rt==="instanceMatrix"&&b.instanceMatrix&&(ft=b.instanceMatrix),rt==="instanceColor"&&b.instanceColor&&(ft=b.instanceColor)),ft!==void 0){const xt=ft.normalized,Rt=ft.itemSize,Wt=t.get(ft);if(Wt===void 0)continue;const ae=Wt.buffer,J=Wt.type,ot=Wt.bytesPerElement,yt=J===s.INT||J===s.UNSIGNED_INT||ft.gpuType===xl;if(ft.isInterleavedBufferAttribute){const mt=ft.data,zt=mt.stride,qt=ft.offset;if(mt.isInstancedInterleavedBuffer){for(let Yt=0;Yt<j.locationSize;Yt++)p(j.location+Yt,mt.meshPerAttribute);b.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=mt.meshPerAttribute*mt.count)}else for(let Yt=0;Yt<j.locationSize;Yt++)m(j.location+Yt);s.bindBuffer(s.ARRAY_BUFFER,ae);for(let Yt=0;Yt<j.locationSize;Yt++)M(j.location+Yt,Rt/j.locationSize,J,xt,zt*ot,(qt+Rt/j.locationSize*Yt)*ot,yt)}else{if(ft.isInstancedBufferAttribute){for(let mt=0;mt<j.locationSize;mt++)p(j.location+mt,ft.meshPerAttribute);b.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ft.meshPerAttribute*ft.count)}else for(let mt=0;mt<j.locationSize;mt++)m(j.location+mt);s.bindBuffer(s.ARRAY_BUFFER,ae);for(let mt=0;mt<j.locationSize;mt++)M(j.location+mt,Rt/j.locationSize,J,xt,Rt*ot,Rt/j.locationSize*mt*ot,yt)}}else if(X!==void 0){const xt=X[rt];if(xt!==void 0)switch(xt.length){case 2:s.vertexAttrib2fv(j.location,xt);break;case 3:s.vertexAttrib3fv(j.location,xt);break;case 4:s.vertexAttrib4fv(j.location,xt);break;default:s.vertexAttrib1fv(j.location,xt)}}}}w()}function E(){A();for(const b in n){const C=n[b];for(const U in C){const I=C[U];for(const V in I)h(I[V].object),delete I[V];delete C[U]}delete n[b]}}function y(b){if(n[b.id]===void 0)return;const C=n[b.id];for(const U in C){const I=C[U];for(const V in I)h(I[V].object),delete I[V];delete C[U]}delete n[b.id]}function R(b){for(const C in n){const U=n[C];if(U[b.id]===void 0)continue;const I=U[b.id];for(const V in I)h(I[V].object),delete I[V];delete U[b.id]}}function A(){v(),a=!0,r!==i&&(r=i,c(r.object))}function v(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:A,resetDefaultState:v,dispose:E,releaseStatesOfGeometry:y,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:m,disableUnusedAttributes:w}}function Jg(s,t,e){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),e.update(h,n,1)}function a(c,h,d){d!==0&&(s.drawArraysInstanced(n,c,h,d),e.update(h,n,d))}function o(c,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let f=0;for(let g=0;g<d;g++)f+=h[g];e.update(f,n,1)}function l(c,h,d,u){if(d===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)a(c[g],h[g],u[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,u,0,d);let g=0;for(let _=0;_<d;_++)g+=h[_]*u[_];e.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Qg(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(R){return!(R!==Sn&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const A=R===qs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==qn&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Gn&&!A)}function l(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=e.logarithmicDepthBuffer===!0,u=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),w=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),M=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),E=g>0,y=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:w,maxVaryings:M,maxFragmentUniforms:x,vertexTextures:E,maxSamples:y}}function t0(s){const t=this;let e=null,n=0,i=!1,r=!1;const a=new xi,o=new ne,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||i;return i=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){const g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,p=s.get(d);if(!i||g===null||g.length===0||r&&!m)r?h(null):c();else{const w=r?0:n,M=w*4;let x=p.clippingState||null;l.value=x,x=h(g,u,M,f);for(let E=0;E!==M;++E)x[E]=e[E];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,g){const _=d!==null?d.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=f+_*4,w=u.matrixWorldInverse;o.getNormalMatrix(w),(m===null||m.length<p)&&(m=new Float32Array(p));for(let M=0,x=f;M!==_;++M,x+=4)a.copy(d[M]).applyMatrix4(w,o),a.normal.toArray(m,x),m[x+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function e0(s){let t=new WeakMap;function e(a,o){return o===Ra?a.mapping=ns:o===Ca&&(a.mapping=is),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Ra||o===Ca)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new up(l.height);return c.fromEquirectangularTexture(s,a),t.set(a,c),a.addEventListener("dispose",i),e(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class od extends id{constructor(t=-1,e=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Yi=4,pc=[.125,.215,.35,.446,.526,.582],wi=20,zo=new od,mc=new Ot;let Ho=null,Go=0,Vo=0,Wo=!1;const vi=(1+Math.sqrt(5))/2,Hi=1/vi,gc=[new D(-vi,Hi,0),new D(vi,Hi,0),new D(-Hi,0,vi),new D(Hi,0,vi),new D(0,vi,-Hi),new D(0,vi,Hi),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)];class _c{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Ho=this._renderer.getRenderTarget(),Go=this._renderer.getActiveCubeFace(),Vo=this._renderer.getActiveMipmapLevel(),Wo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=bc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=vc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ho,Go,Vo),this._renderer.xr.enabled=Wo,t.scissorTest=!1,xr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ns||t.mapping===is?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ho=this._renderer.getRenderTarget(),Go=this._renderer.getActiveCubeFace(),Vo=this._renderer.getActiveMipmapLevel(),Wo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ze,minFilter:Ze,generateMipmaps:!1,type:qs,format:Sn,colorSpace:ls,depthBuffer:!1},i=xc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=xc(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=n0(r)),this._blurMaterial=i0(r,t,e)}return i}_compileMaterial(t){const e=new K(this._lodPlanes[0],t);this._renderer.compile(e,zo)}_sceneToCubeUV(t,e,n,i){const o=new hn(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(mc),h.toneMapping=ai,h.autoClear=!1;const f=new De({name:"PMREM.Background",side:sn,depthWrite:!1,depthTest:!1}),g=new K(new Me,f);let _=!1;const m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,_=!0):(f.color.copy(mc),_=!0);for(let p=0;p<6;p++){const w=p%3;w===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):w===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));const M=this._cubeSize;xr(i,w*M,p>2?M:0,M,M),h.setRenderTarget(i),_&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=d,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===ns||t.mapping===is;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=bc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=vc());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new K(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;xr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,zo)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=gc[(i-r-1)%gc.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,i,"latitudinal",r),this._halfBlur(a,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new K(this._lodPlanes[i],c),u=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*wi-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):wi;m>wi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${wi}`);const p=[];let w=0;for(let R=0;R<wi;++R){const A=R/_,v=Math.exp(-A*A/2);p.push(v),R===0?w+=v:R<m&&(w+=2*v)}for(let R=0;R<p.length;R++)p[R]=p[R]/w;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:M}=this;u.dTheta.value=g,u.mipInt.value=M-n;const x=this._sizeLods[i],E=3*x*(i>M-Yi?i-M+Yi:0),y=4*(this._cubeSize-x);xr(e,E,y,3*x,2*x),l.setRenderTarget(e),l.render(d,zo)}}function n0(s){const t=[],e=[],n=[];let i=s;const r=s-Yi+1+pc.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);e.push(o);let l=1/o;a>s-Yi?l=pc[a-s+Yi-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,_=3,m=2,p=1,w=new Float32Array(_*g*f),M=new Float32Array(m*g*f),x=new Float32Array(p*g*f);for(let y=0;y<f;y++){const R=y%3*2/3-1,A=y>2?0:-1,v=[R,A,0,R+2/3,A,0,R+2/3,A+1,0,R,A,0,R+2/3,A+1,0,R,A+1,0];w.set(v,_*g*y),M.set(u,m*g*y);const b=[y,y,y,y,y,y];x.set(b,p*g*y)}const E=new Pe;E.setAttribute("position",new je(w,_)),E.setAttribute("uv",new je(M,m)),E.setAttribute("faceIndex",new je(x,p)),t.push(E),i>Yi&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function xc(s,t,e){const n=new Ti(s,t,e);return n.texture.mapping=lo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function xr(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function i0(s,t,e){const n=new Float32Array(wi),i=new D(0,1,0);return new ci({name:"SphericalGaussianBlur",defines:{n:wi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Rl(),fragmentShader:`

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
		`,blending:oi,depthTest:!1,depthWrite:!1})}function vc(){return new ci({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Rl(),fragmentShader:`

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
		`,blending:oi,depthTest:!1,depthWrite:!1})}function bc(){return new ci({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Rl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:oi,depthTest:!1,depthWrite:!1})}function Rl(){return`

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
	`}function s0(s){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Ra||l===Ca,h=l===ns||l===is;if(c||h){let d=t.get(o);const u=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return e===null&&(e=new _c(s)),d=c?e.fromEquirectangular(o,d):e.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{const f=o.image;return c&&f&&f.height>0||h&&f&&i(f)?(e===null&&(e=new _c(s)),d=c?e.fromEquirectangular(o):e.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function i(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function r0(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&Rs("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function o0(s,t,e,n){const i={},r=new WeakMap;function a(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const g in u.attributes)t.remove(u.attributes[g]);for(const g in u.morphAttributes){const _=u.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)t.remove(_[m])}u.removeEventListener("dispose",a),delete i[u.id];const f=r.get(u);f&&(t.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(d,u){return i[u.id]===!0||(u.addEventListener("dispose",a),i[u.id]=!0,e.memory.geometries++),u}function l(d){const u=d.attributes;for(const g in u)t.update(u[g],s.ARRAY_BUFFER);const f=d.morphAttributes;for(const g in f){const _=f[g];for(let m=0,p=_.length;m<p;m++)t.update(_[m],s.ARRAY_BUFFER)}}function c(d){const u=[],f=d.index,g=d.attributes.position;let _=0;if(f!==null){const w=f.array;_=f.version;for(let M=0,x=w.length;M<x;M+=3){const E=w[M+0],y=w[M+1],R=w[M+2];u.push(E,y,y,R,R,E)}}else if(g!==void 0){const w=g.array;_=g.version;for(let M=0,x=w.length/3-1;M<x;M+=3){const E=M+0,y=M+1,R=M+2;u.push(E,y,y,R,R,E)}}else return;const m=new(Zh(u)?ed:td)(u,1);m.version=_;const p=r.get(d);p&&t.remove(p),r.set(d,m)}function h(d){const u=r.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function a0(s,t,e){let n;function i(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,f){s.drawElements(n,f,r,u*a),e.update(f,n,1)}function c(u,f,g){g!==0&&(s.drawElementsInstanced(n,f,r,u*a,g),e.update(f,n,g))}function h(u,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function d(u,f,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<u.length;p++)c(u[p]/a,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,u,0,_,0,g);let p=0;for(let w=0;w<g;w++)p+=f[w]*_[w];e.update(p,n,1)}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function l0(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function c0(s,t,e){const n=new WeakMap,i=new xe;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==d){let v=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",v)};u!==void 0&&u.texture.dispose();const f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],w=o.morphAttributes.color||[];let M=0;f===!0&&(M=1),g===!0&&(M=2),_===!0&&(M=3);let x=o.attributes.position.count*M,E=1;x>t.maxTextureSize&&(E=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);const y=new Float32Array(x*E*4*d),R=new Jh(y,x,E,d);R.type=Gn,R.needsUpdate=!0;const A=M*4;for(let b=0;b<d;b++){const C=m[b],U=p[b],I=w[b],V=x*E*4*b;for(let $=0;$<C.count;$++){const X=$*A;f===!0&&(i.fromBufferAttribute(C,$),y[V+X+0]=i.x,y[V+X+1]=i.y,y[V+X+2]=i.z,y[V+X+3]=0),g===!0&&(i.fromBufferAttribute(U,$),y[V+X+4]=i.x,y[V+X+5]=i.y,y[V+X+6]=i.z,y[V+X+7]=0),_===!0&&(i.fromBufferAttribute(I,$),y[V+X+8]=i.x,y[V+X+9]=i.y,y[V+X+10]=i.z,y[V+X+11]=I.itemSize===4?i.w:1)}}u={count:d,texture:R,size:new _t(x,E)},n.set(o,u),o.addEventListener("dispose",v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];const g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",g),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function h0(s,t,e,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,d=t.get(l,h);if(i.get(d)!==c&&(t.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;i.get(u)!==c&&(u.update(),i.set(u,c))}return d}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}class ad extends Ke{constructor(t,e,n,i,r,a,o,l,c,h=Ji){if(h!==Ji&&h!==rs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ji&&(n=Si),n===void 0&&h===rs&&(n=ss),super(null,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Tn,this.minFilter=l!==void 0?l:Tn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const ld=new Ke,Mc=new ad(1,1),cd=new Jh,hd=new Zf,dd=new sd,wc=[],yc=[],Sc=new Float32Array(16),Tc=new Float32Array(9),Ec=new Float32Array(4);function hs(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=wc[i];if(r===void 0&&(r=new Float32Array(i),wc[i]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function Fe(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Oe(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function uo(s,t){let e=yc[t];e===void 0&&(e=new Int32Array(t),yc[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function d0(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function u0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;s.uniform2fv(this.addr,t),Oe(e,t)}}function f0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Fe(e,t))return;s.uniform3fv(this.addr,t),Oe(e,t)}}function p0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;s.uniform4fv(this.addr,t),Oe(e,t)}}function m0(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Fe(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Oe(e,t)}else{if(Fe(e,n))return;Ec.set(n),s.uniformMatrix2fv(this.addr,!1,Ec),Oe(e,n)}}function g0(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Fe(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Oe(e,t)}else{if(Fe(e,n))return;Tc.set(n),s.uniformMatrix3fv(this.addr,!1,Tc),Oe(e,n)}}function _0(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Fe(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Oe(e,t)}else{if(Fe(e,n))return;Sc.set(n),s.uniformMatrix4fv(this.addr,!1,Sc),Oe(e,n)}}function x0(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function v0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;s.uniform2iv(this.addr,t),Oe(e,t)}}function b0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Fe(e,t))return;s.uniform3iv(this.addr,t),Oe(e,t)}}function M0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;s.uniform4iv(this.addr,t),Oe(e,t)}}function w0(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function y0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;s.uniform2uiv(this.addr,t),Oe(e,t)}}function S0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Fe(e,t))return;s.uniform3uiv(this.addr,t),Oe(e,t)}}function T0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;s.uniform4uiv(this.addr,t),Oe(e,t)}}function E0(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Mc.compareFunction=jh,r=Mc):r=ld,e.setTexture2D(t||r,i)}function A0(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||hd,i)}function R0(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||dd,i)}function C0(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||cd,i)}function L0(s){switch(s){case 5126:return d0;case 35664:return u0;case 35665:return f0;case 35666:return p0;case 35674:return m0;case 35675:return g0;case 35676:return _0;case 5124:case 35670:return x0;case 35667:case 35671:return v0;case 35668:case 35672:return b0;case 35669:case 35673:return M0;case 5125:return w0;case 36294:return y0;case 36295:return S0;case 36296:return T0;case 35678:case 36198:case 36298:case 36306:case 35682:return E0;case 35679:case 36299:case 36307:return A0;case 35680:case 36300:case 36308:case 36293:return R0;case 36289:case 36303:case 36311:case 36292:return C0}}function P0(s,t){s.uniform1fv(this.addr,t)}function U0(s,t){const e=hs(t,this.size,2);s.uniform2fv(this.addr,e)}function D0(s,t){const e=hs(t,this.size,3);s.uniform3fv(this.addr,e)}function I0(s,t){const e=hs(t,this.size,4);s.uniform4fv(this.addr,e)}function k0(s,t){const e=hs(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function N0(s,t){const e=hs(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function F0(s,t){const e=hs(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function O0(s,t){s.uniform1iv(this.addr,t)}function B0(s,t){s.uniform2iv(this.addr,t)}function z0(s,t){s.uniform3iv(this.addr,t)}function H0(s,t){s.uniform4iv(this.addr,t)}function G0(s,t){s.uniform1uiv(this.addr,t)}function V0(s,t){s.uniform2uiv(this.addr,t)}function W0(s,t){s.uniform3uiv(this.addr,t)}function X0(s,t){s.uniform4uiv(this.addr,t)}function q0(s,t,e){const n=this.cache,i=t.length,r=uo(e,i);Fe(n,r)||(s.uniform1iv(this.addr,r),Oe(n,r));for(let a=0;a!==i;++a)e.setTexture2D(t[a]||ld,r[a])}function $0(s,t,e){const n=this.cache,i=t.length,r=uo(e,i);Fe(n,r)||(s.uniform1iv(this.addr,r),Oe(n,r));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||hd,r[a])}function Y0(s,t,e){const n=this.cache,i=t.length,r=uo(e,i);Fe(n,r)||(s.uniform1iv(this.addr,r),Oe(n,r));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||dd,r[a])}function j0(s,t,e){const n=this.cache,i=t.length,r=uo(e,i);Fe(n,r)||(s.uniform1iv(this.addr,r),Oe(n,r));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||cd,r[a])}function Z0(s){switch(s){case 5126:return P0;case 35664:return U0;case 35665:return D0;case 35666:return I0;case 35674:return k0;case 35675:return N0;case 35676:return F0;case 5124:case 35670:return O0;case 35667:case 35671:return B0;case 35668:case 35672:return z0;case 35669:case 35673:return H0;case 5125:return G0;case 36294:return V0;case 36295:return W0;case 36296:return X0;case 35678:case 36198:case 36298:case 36306:case 35682:return q0;case 35679:case 36299:case 36307:return $0;case 35680:case 36300:case 36308:case 36293:return Y0;case 36289:case 36303:case 36311:case 36292:return j0}}class K0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=L0(e.type)}}class J0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Z0(e.type)}}class Q0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(t,e[o.id],n)}}}const Xo=/(\w+)(\])?(\[|\.)?/g;function Ac(s,t){s.seq.push(t),s.map[t.id]=t}function t_(s,t,e){const n=s.name,i=n.length;for(Xo.lastIndex=0;;){const r=Xo.exec(n),a=Xo.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Ac(e,c===void 0?new K0(o,s,t):new J0(o,s,t));break}else{let d=e.map[o];d===void 0&&(d=new Q0(o),Ac(e,d)),e=d}}}class qr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),a=t.getUniformLocation(e,r.name);t_(r,a,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const a=t[i];a.id in e&&n.push(a)}return n}}function Rc(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const e_=37297;let n_=0;function i_(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Cc=new ne;function s_(s){de._getMatrix(Cc,de.workingColorSpace,s);const t=`mat3( ${Cc.elements.map(e=>e.toFixed(4))} )`;switch(de.getTransfer(s)){case co:return[t,"LinearTransferOETF"];case ge:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function Lc(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+i_(s.getShaderSource(t),a)}else return i}function r_(s,t){const e=s_(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function o_(s,t){let e;switch(t){case yf:e="Linear";break;case Sf:e="Reinhard";break;case Tf:e="Cineon";break;case Ef:e="ACESFilmic";break;case Rf:e="AgX";break;case Cf:e="Neutral";break;case Af:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const vr=new D;function a_(){de.getLuminanceCoefficients(vr);const s=vr.x.toFixed(4),t=vr.y.toFixed(4),e=vr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function l_(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Cs).join(`
`)}function c_(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function h_(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function Cs(s){return s!==""}function Pc(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Uc(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const d_=/^[ \t]*#include +<([\w\d./]+)>/gm;function rl(s){return s.replace(d_,f_)}const u_=new Map;function f_(s,t){let e=se[t];if(e===void 0){const n=u_.get(t);if(n!==void 0)e=se[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return rl(e)}const p_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Dc(s){return s.replace(p_,m_)}function m_(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Ic(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function g_(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Fh?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===ef?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===zn&&(t="SHADOWMAP_TYPE_VSM"),t}function __(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case ns:case is:t="ENVMAP_TYPE_CUBE";break;case lo:t="ENVMAP_TYPE_CUBE_UV";break}return t}function x_(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case is:t="ENVMAP_MODE_REFRACTION";break}return t}function v_(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case ao:t="ENVMAP_BLENDING_MULTIPLY";break;case Mf:t="ENVMAP_BLENDING_MIX";break;case wf:t="ENVMAP_BLENDING_ADD";break}return t}function b_(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function M_(s,t,e,n){const i=s.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=g_(e),c=__(e),h=x_(e),d=v_(e),u=b_(e),f=l_(e),g=c_(r),_=i.createProgram();let m,p,w=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Cs).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Cs).join(`
`),p.length>0&&(p+=`
`)):(m=[Ic(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Cs).join(`
`),p=[Ic(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ai?"#define TONE_MAPPING":"",e.toneMapping!==ai?se.tonemapping_pars_fragment:"",e.toneMapping!==ai?o_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",se.colorspace_pars_fragment,r_("linearToOutputTexel",e.outputColorSpace),a_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Cs).join(`
`)),a=rl(a),a=Pc(a,e),a=Uc(a,e),o=rl(o),o=Pc(o,e),o=Uc(o,e),a=Dc(a),o=Dc(o),e.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===$l?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===$l?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=w+m+a,x=w+p+o,E=Rc(i,i.VERTEX_SHADER,M),y=Rc(i,i.FRAGMENT_SHADER,x);i.attachShader(_,E),i.attachShader(_,y),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function R(C){if(s.debug.checkShaderErrors){const U=i.getProgramInfoLog(_).trim(),I=i.getShaderInfoLog(E).trim(),V=i.getShaderInfoLog(y).trim();let $=!0,X=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if($=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,E,y);else{const rt=Lc(i,E,"vertex"),j=Lc(i,y,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+U+`
`+rt+`
`+j)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(I===""||V==="")&&(X=!1);X&&(C.diagnostics={runnable:$,programLog:U,vertexShader:{log:I,prefix:m},fragmentShader:{log:V,prefix:p}})}i.deleteShader(E),i.deleteShader(y),A=new qr(i,_),v=h_(i,_)}let A;this.getUniforms=function(){return A===void 0&&R(this),A};let v;this.getAttributes=function(){return v===void 0&&R(this),v};let b=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=i.getProgramParameter(_,e_)),b},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=n_++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=E,this.fragmentShader=y,this}let w_=0;class y_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new S_(t),e.set(t,n)),n}}class S_{constructor(t){this.id=w_++,this.code=t,this.usedTimes=0}}function T_(s,t,e,n,i,r,a){const o=new El,l=new y_,c=new Set,h=[],d=i.logarithmicDepthBuffer,u=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return c.add(v),v===0?"uv":`uv${v}`}function m(v,b,C,U,I){const V=U.fog,$=I.geometry,X=v.isMeshStandardMaterial?U.environment:null,rt=(v.isMeshStandardMaterial?e:t).get(v.envMap||X),j=rt&&rt.mapping===lo?rt.image.height:null,ft=g[v.type];v.precision!==null&&(f=i.getMaxPrecision(v.precision),f!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",f,"instead."));const xt=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Rt=xt!==void 0?xt.length:0;let Wt=0;$.morphAttributes.position!==void 0&&(Wt=1),$.morphAttributes.normal!==void 0&&(Wt=2),$.morphAttributes.color!==void 0&&(Wt=3);let ae,J,ot,yt;if(ft){const oe=Ln[ft];ae=oe.vertexShader,J=oe.fragmentShader}else ae=v.vertexShader,J=v.fragmentShader,l.update(v),ot=l.getVertexShaderID(v),yt=l.getFragmentShaderID(v);const mt=s.getRenderTarget(),zt=s.state.buffers.depth.getReversed(),qt=I.isInstancedMesh===!0,Yt=I.isBatchedMesh===!0,Ht=!!v.map,Zt=!!v.matcap,he=!!rt,B=!!v.aoMap,ve=!!v.lightMap,te=!!v.bumpMap,Jt=!!v.normalMap,Ct=!!v.displacementMap,ce=!!v.emissiveMap,It=!!v.metalnessMap,L=!!v.roughnessMap,S=v.anisotropy>0,G=v.clearcoat>0,tt=v.dispersion>0,et=v.iridescence>0,Q=v.sheen>0,St=v.transmission>0,ht=S&&!!v.anisotropyMap,Mt=G&&!!v.clearcoatMap,ee=G&&!!v.clearcoatNormalMap,it=G&&!!v.clearcoatRoughnessMap,bt=et&&!!v.iridescenceMap,Pt=et&&!!v.iridescenceThicknessMap,Nt=Q&&!!v.sheenColorMap,wt=Q&&!!v.sheenRoughnessMap,jt=!!v.specularMap,Xt=!!v.specularColorMap,le=!!v.specularIntensityMap,F=St&&!!v.transmissionMap,dt=St&&!!v.thicknessMap,Y=!!v.gradientMap,H=!!v.alphaMap,nt=v.alphaTest>0,st=!!v.alphaHash,pt=!!v.extensions;let Vt=ai;v.toneMapped&&(mt===null||mt.isXRRenderTarget===!0)&&(Vt=s.toneMapping);const ie={shaderID:ft,shaderType:v.type,shaderName:v.name,vertexShader:ae,fragmentShader:J,defines:v.defines,customVertexShaderID:ot,customFragmentShaderID:yt,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:f,batching:Yt,batchingColor:Yt&&I._colorsTexture!==null,instancing:qt,instancingColor:qt&&I.instanceColor!==null,instancingMorph:qt&&I.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:mt===null?s.outputColorSpace:mt.isXRRenderTarget===!0?mt.texture.colorSpace:ls,alphaToCoverage:!!v.alphaToCoverage,map:Ht,matcap:Zt,envMap:he,envMapMode:he&&rt.mapping,envMapCubeUVHeight:j,aoMap:B,lightMap:ve,bumpMap:te,normalMap:Jt,displacementMap:u&&Ct,emissiveMap:ce,normalMapObjectSpace:Jt&&v.normalMapType===Df,normalMapTangentSpace:Jt&&v.normalMapType===Sl,metalnessMap:It,roughnessMap:L,anisotropy:S,anisotropyMap:ht,clearcoat:G,clearcoatMap:Mt,clearcoatNormalMap:ee,clearcoatRoughnessMap:it,dispersion:tt,iridescence:et,iridescenceMap:bt,iridescenceThicknessMap:Pt,sheen:Q,sheenColorMap:Nt,sheenRoughnessMap:wt,specularMap:jt,specularColorMap:Xt,specularIntensityMap:le,transmission:St,transmissionMap:F,thicknessMap:dt,gradientMap:Y,opaque:v.transparent===!1&&v.blending===Ki&&v.alphaToCoverage===!1,alphaMap:H,alphaTest:nt,alphaHash:st,combine:v.combine,mapUv:Ht&&_(v.map.channel),aoMapUv:B&&_(v.aoMap.channel),lightMapUv:ve&&_(v.lightMap.channel),bumpMapUv:te&&_(v.bumpMap.channel),normalMapUv:Jt&&_(v.normalMap.channel),displacementMapUv:Ct&&_(v.displacementMap.channel),emissiveMapUv:ce&&_(v.emissiveMap.channel),metalnessMapUv:It&&_(v.metalnessMap.channel),roughnessMapUv:L&&_(v.roughnessMap.channel),anisotropyMapUv:ht&&_(v.anisotropyMap.channel),clearcoatMapUv:Mt&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:ee&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:it&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:bt&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:Pt&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:Nt&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:wt&&_(v.sheenRoughnessMap.channel),specularMapUv:jt&&_(v.specularMap.channel),specularColorMapUv:Xt&&_(v.specularColorMap.channel),specularIntensityMapUv:le&&_(v.specularIntensityMap.channel),transmissionMapUv:F&&_(v.transmissionMap.channel),thicknessMapUv:dt&&_(v.thicknessMap.channel),alphaMapUv:H&&_(v.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(Jt||S),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!$.attributes.uv&&(Ht||H),fog:!!V,useFog:v.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:zt,skinning:I.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:Rt,morphTextureStride:Wt,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:v.dithering,shadowMapEnabled:s.shadowMap.enabled&&C.length>0,shadowMapType:s.shadowMap.type,toneMapping:Vt,decodeVideoTexture:Ht&&v.map.isVideoTexture===!0&&de.getTransfer(v.map.colorSpace)===ge,decodeVideoTextureEmissive:ce&&v.emissiveMap.isVideoTexture===!0&&de.getTransfer(v.emissiveMap.colorSpace)===ge,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Kt,flipSided:v.side===sn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:pt&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(pt&&v.extensions.multiDraw===!0||Yt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return ie.vertexUv1s=c.has(1),ie.vertexUv2s=c.has(2),ie.vertexUv3s=c.has(3),c.clear(),ie}function p(v){const b=[];if(v.shaderID?b.push(v.shaderID):(b.push(v.customVertexShaderID),b.push(v.customFragmentShaderID)),v.defines!==void 0)for(const C in v.defines)b.push(C),b.push(v.defines[C]);return v.isRawShaderMaterial===!1&&(w(b,v),M(b,v),b.push(s.outputColorSpace)),b.push(v.customProgramCacheKey),b.join()}function w(v,b){v.push(b.precision),v.push(b.outputColorSpace),v.push(b.envMapMode),v.push(b.envMapCubeUVHeight),v.push(b.mapUv),v.push(b.alphaMapUv),v.push(b.lightMapUv),v.push(b.aoMapUv),v.push(b.bumpMapUv),v.push(b.normalMapUv),v.push(b.displacementMapUv),v.push(b.emissiveMapUv),v.push(b.metalnessMapUv),v.push(b.roughnessMapUv),v.push(b.anisotropyMapUv),v.push(b.clearcoatMapUv),v.push(b.clearcoatNormalMapUv),v.push(b.clearcoatRoughnessMapUv),v.push(b.iridescenceMapUv),v.push(b.iridescenceThicknessMapUv),v.push(b.sheenColorMapUv),v.push(b.sheenRoughnessMapUv),v.push(b.specularMapUv),v.push(b.specularColorMapUv),v.push(b.specularIntensityMapUv),v.push(b.transmissionMapUv),v.push(b.thicknessMapUv),v.push(b.combine),v.push(b.fogExp2),v.push(b.sizeAttenuation),v.push(b.morphTargetsCount),v.push(b.morphAttributeCount),v.push(b.numDirLights),v.push(b.numPointLights),v.push(b.numSpotLights),v.push(b.numSpotLightMaps),v.push(b.numHemiLights),v.push(b.numRectAreaLights),v.push(b.numDirLightShadows),v.push(b.numPointLightShadows),v.push(b.numSpotLightShadows),v.push(b.numSpotLightShadowsWithMaps),v.push(b.numLightProbes),v.push(b.shadowMapType),v.push(b.toneMapping),v.push(b.numClippingPlanes),v.push(b.numClipIntersection),v.push(b.depthPacking)}function M(v,b){o.disableAll(),b.supportsVertexTextures&&o.enable(0),b.instancing&&o.enable(1),b.instancingColor&&o.enable(2),b.instancingMorph&&o.enable(3),b.matcap&&o.enable(4),b.envMap&&o.enable(5),b.normalMapObjectSpace&&o.enable(6),b.normalMapTangentSpace&&o.enable(7),b.clearcoat&&o.enable(8),b.iridescence&&o.enable(9),b.alphaTest&&o.enable(10),b.vertexColors&&o.enable(11),b.vertexAlphas&&o.enable(12),b.vertexUv1s&&o.enable(13),b.vertexUv2s&&o.enable(14),b.vertexUv3s&&o.enable(15),b.vertexTangents&&o.enable(16),b.anisotropy&&o.enable(17),b.alphaHash&&o.enable(18),b.batching&&o.enable(19),b.dispersion&&o.enable(20),b.batchingColor&&o.enable(21),v.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reverseDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),v.push(o.mask)}function x(v){const b=g[v.type];let C;if(b){const U=Ln[b];C=lp.clone(U.uniforms)}else C=v.uniforms;return C}function E(v,b){let C;for(let U=0,I=h.length;U<I;U++){const V=h[U];if(V.cacheKey===b){C=V,++C.usedTimes;break}}return C===void 0&&(C=new M_(s,b,v,r),h.push(C)),C}function y(v){if(--v.usedTimes===0){const b=h.indexOf(v);h[b]=h[h.length-1],h.pop(),v.destroy()}}function R(v){l.remove(v)}function A(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:E,releaseProgram:y,releaseShaderCache:R,programs:h,dispose:A}}function E_(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function A_(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function kc(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Nc(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function a(d,u,f,g,_,m){let p=s[t];return p===void 0?(p={id:d.id,object:d,geometry:u,material:f,groupOrder:g,renderOrder:d.renderOrder,z:_,group:m},s[t]=p):(p.id=d.id,p.object=d,p.geometry=u,p.material=f,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=_,p.group=m),t++,p}function o(d,u,f,g,_,m){const p=a(d,u,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):e.push(p)}function l(d,u,f,g,_,m){const p=a(d,u,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):e.unshift(p)}function c(d,u){e.length>1&&e.sort(d||A_),n.length>1&&n.sort(u||kc),i.length>1&&i.sort(u||kc)}function h(){for(let d=t,u=s.length;d<u;d++){const f=s[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:o,unshift:l,finish:h,sort:c}}function R_(){let s=new WeakMap;function t(n,i){const r=s.get(n);let a;return r===void 0?(a=new Nc,s.set(n,[a])):i>=r.length?(a=new Nc,r.push(a)):a=r[i],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function C_(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new D,color:new Ot};break;case"SpotLight":e={position:new D,direction:new D,color:new Ot,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new Ot,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new Ot,groundColor:new Ot};break;case"RectAreaLight":e={color:new Ot,position:new D,halfWidth:new D,halfHeight:new D};break}return s[t.id]=e,e}}}function L_(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let P_=0;function U_(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function D_(s){const t=new C_,e=L_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new D);const i=new D,r=new we,a=new we;function o(c){let h=0,d=0,u=0;for(let v=0;v<9;v++)n.probe[v].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,w=0,M=0,x=0,E=0,y=0,R=0;c.sort(U_);for(let v=0,b=c.length;v<b;v++){const C=c[v],U=C.color,I=C.intensity,V=C.distance,$=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=U.r*I,d+=U.g*I,u+=U.b*I;else if(C.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(C.sh.coefficients[X],I);R++}else if(C.isDirectionalLight){const X=t.get(C);if(X.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const rt=C.shadow,j=e.get(C);j.shadowIntensity=rt.intensity,j.shadowBias=rt.bias,j.shadowNormalBias=rt.normalBias,j.shadowRadius=rt.radius,j.shadowMapSize=rt.mapSize,n.directionalShadow[f]=j,n.directionalShadowMap[f]=$,n.directionalShadowMatrix[f]=C.shadow.matrix,w++}n.directional[f]=X,f++}else if(C.isSpotLight){const X=t.get(C);X.position.setFromMatrixPosition(C.matrixWorld),X.color.copy(U).multiplyScalar(I),X.distance=V,X.coneCos=Math.cos(C.angle),X.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),X.decay=C.decay,n.spot[_]=X;const rt=C.shadow;if(C.map&&(n.spotLightMap[E]=C.map,E++,rt.updateMatrices(C),C.castShadow&&y++),n.spotLightMatrix[_]=rt.matrix,C.castShadow){const j=e.get(C);j.shadowIntensity=rt.intensity,j.shadowBias=rt.bias,j.shadowNormalBias=rt.normalBias,j.shadowRadius=rt.radius,j.shadowMapSize=rt.mapSize,n.spotShadow[_]=j,n.spotShadowMap[_]=$,x++}_++}else if(C.isRectAreaLight){const X=t.get(C);X.color.copy(U).multiplyScalar(I),X.halfWidth.set(C.width*.5,0,0),X.halfHeight.set(0,C.height*.5,0),n.rectArea[m]=X,m++}else if(C.isPointLight){const X=t.get(C);if(X.color.copy(C.color).multiplyScalar(C.intensity),X.distance=C.distance,X.decay=C.decay,C.castShadow){const rt=C.shadow,j=e.get(C);j.shadowIntensity=rt.intensity,j.shadowBias=rt.bias,j.shadowNormalBias=rt.normalBias,j.shadowRadius=rt.radius,j.shadowMapSize=rt.mapSize,j.shadowCameraNear=rt.camera.near,j.shadowCameraFar=rt.camera.far,n.pointShadow[g]=j,n.pointShadowMap[g]=$,n.pointShadowMatrix[g]=C.shadow.matrix,M++}n.point[g]=X,g++}else if(C.isHemisphereLight){const X=t.get(C);X.skyColor.copy(C.color).multiplyScalar(I),X.groundColor.copy(C.groundColor).multiplyScalar(I),n.hemi[p]=X,p++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=gt.LTC_FLOAT_1,n.rectAreaLTC2=gt.LTC_FLOAT_2):(n.rectAreaLTC1=gt.LTC_HALF_1,n.rectAreaLTC2=gt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const A=n.hash;(A.directionalLength!==f||A.pointLength!==g||A.spotLength!==_||A.rectAreaLength!==m||A.hemiLength!==p||A.numDirectionalShadows!==w||A.numPointShadows!==M||A.numSpotShadows!==x||A.numSpotMaps!==E||A.numLightProbes!==R)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=w,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=x+E-y,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=y,n.numLightProbes=R,A.directionalLength=f,A.pointLength=g,A.spotLength=_,A.rectAreaLength=m,A.hemiLength=p,A.numDirectionalShadows=w,A.numPointShadows=M,A.numSpotShadows=x,A.numSpotMaps=E,A.numLightProbes=R,n.version=P_++)}function l(c,h){let d=0,u=0,f=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,w=c.length;p<w;p++){const M=c[p];if(M.isDirectionalLight){const x=n.directional[d];x.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),d++}else if(M.isSpotLight){const x=n.spot[f];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),f++}else if(M.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),a.identity(),r.copy(M.matrixWorld),r.premultiply(m),a.extractRotation(r),x.halfWidth.set(M.width*.5,0,0),x.halfHeight.set(0,M.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),g++}else if(M.isPointLight){const x=n.point[u];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),u++}else if(M.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(M.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:o,setupView:l,state:n}}function Fc(s){const t=new D_(s),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function I_(s){let t=new WeakMap;function e(i,r=0){const a=t.get(i);let o;return a===void 0?(o=new Fc(s),t.set(i,[o])):r>=a.length?(o=new Fc(s),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class k_ extends di{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Pf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class N_ extends di{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const F_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,O_=`uniform sampler2D shadow_pass;
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
}`;function B_(s,t,e){let n=new Al;const i=new _t,r=new _t,a=new xe,o=new k_({depthPacking:Uf}),l=new N_,c={},h=e.maxTextureSize,d={[li]:sn,[sn]:li,[Kt]:Kt},u=new ci({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new _t},radius:{value:4}},vertexShader:F_,fragmentShader:O_}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new Pe;g.setAttribute("position",new je(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new K(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Fh;let p=this.type;this.render=function(y,R,A){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||y.length===0)return;const v=s.getRenderTarget(),b=s.getActiveCubeFace(),C=s.getActiveMipmapLevel(),U=s.state;U.setBlending(oi),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const I=p!==zn&&this.type===zn,V=p===zn&&this.type!==zn;for(let $=0,X=y.length;$<X;$++){const rt=y[$],j=rt.shadow;if(j===void 0){console.warn("THREE.WebGLShadowMap:",rt,"has no shadow.");continue}if(j.autoUpdate===!1&&j.needsUpdate===!1)continue;i.copy(j.mapSize);const ft=j.getFrameExtents();if(i.multiply(ft),r.copy(j.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/ft.x),i.x=r.x*ft.x,j.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/ft.y),i.y=r.y*ft.y,j.mapSize.y=r.y)),j.map===null||I===!0||V===!0){const Rt=this.type!==zn?{minFilter:Tn,magFilter:Tn}:{};j.map!==null&&j.map.dispose(),j.map=new Ti(i.x,i.y,Rt),j.map.texture.name=rt.name+".shadowMap",j.camera.updateProjectionMatrix()}s.setRenderTarget(j.map),s.clear();const xt=j.getViewportCount();for(let Rt=0;Rt<xt;Rt++){const Wt=j.getViewport(Rt);a.set(r.x*Wt.x,r.y*Wt.y,r.x*Wt.z,r.y*Wt.w),U.viewport(a),j.updateMatrices(rt,Rt),n=j.getFrustum(),x(R,A,j.camera,rt,this.type)}j.isPointLightShadow!==!0&&this.type===zn&&w(j,A),j.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(v,b,C)};function w(y,R){const A=t.update(_);u.defines.VSM_SAMPLES!==y.blurSamples&&(u.defines.VSM_SAMPLES=y.blurSamples,f.defines.VSM_SAMPLES=y.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),y.mapPass===null&&(y.mapPass=new Ti(i.x,i.y)),u.uniforms.shadow_pass.value=y.map.texture,u.uniforms.resolution.value=y.mapSize,u.uniforms.radius.value=y.radius,s.setRenderTarget(y.mapPass),s.clear(),s.renderBufferDirect(R,null,A,u,_,null),f.uniforms.shadow_pass.value=y.mapPass.texture,f.uniforms.resolution.value=y.mapSize,f.uniforms.radius.value=y.radius,s.setRenderTarget(y.map),s.clear(),s.renderBufferDirect(R,null,A,f,_,null)}function M(y,R,A,v){let b=null;const C=A.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(C!==void 0)b=C;else if(b=A.isPointLight===!0?l:o,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const U=b.uuid,I=R.uuid;let V=c[U];V===void 0&&(V={},c[U]=V);let $=V[I];$===void 0&&($=b.clone(),V[I]=$,R.addEventListener("dispose",E)),b=$}if(b.visible=R.visible,b.wireframe=R.wireframe,v===zn?b.side=R.shadowSide!==null?R.shadowSide:R.side:b.side=R.shadowSide!==null?R.shadowSide:d[R.side],b.alphaMap=R.alphaMap,b.alphaTest=R.alphaTest,b.map=R.map,b.clipShadows=R.clipShadows,b.clippingPlanes=R.clippingPlanes,b.clipIntersection=R.clipIntersection,b.displacementMap=R.displacementMap,b.displacementScale=R.displacementScale,b.displacementBias=R.displacementBias,b.wireframeLinewidth=R.wireframeLinewidth,b.linewidth=R.linewidth,A.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const U=s.properties.get(b);U.light=A}return b}function x(y,R,A,v,b){if(y.visible===!1)return;if(y.layers.test(R.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&b===zn)&&(!y.frustumCulled||n.intersectsObject(y))){y.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,y.matrixWorld);const I=t.update(y),V=y.material;if(Array.isArray(V)){const $=I.groups;for(let X=0,rt=$.length;X<rt;X++){const j=$[X],ft=V[j.materialIndex];if(ft&&ft.visible){const xt=M(y,ft,v,b);y.onBeforeShadow(s,y,R,A,I,xt,j),s.renderBufferDirect(A,null,I,xt,y,j),y.onAfterShadow(s,y,R,A,I,xt,j)}}}else if(V.visible){const $=M(y,V,v,b);y.onBeforeShadow(s,y,R,A,I,$,null),s.renderBufferDirect(A,null,I,$,y,null),y.onAfterShadow(s,y,R,A,I,$,null)}}const U=y.children;for(let I=0,V=U.length;I<V;I++)x(U[I],R,A,v,b)}function E(y){y.target.removeEventListener("dispose",E);for(const A in c){const v=c[A],b=y.target.uuid;b in v&&(v[b].dispose(),delete v[b])}}}const z_={[Ma]:wa,[ya]:Ea,[Sa]:Aa,[es]:Ta,[wa]:Ma,[Ea]:ya,[Aa]:Sa,[Ta]:es};function H_(s,t){function e(){let F=!1;const dt=new xe;let Y=null;const H=new xe(0,0,0,0);return{setMask:function(nt){Y!==nt&&!F&&(s.colorMask(nt,nt,nt,nt),Y=nt)},setLocked:function(nt){F=nt},setClear:function(nt,st,pt,Vt,ie){ie===!0&&(nt*=Vt,st*=Vt,pt*=Vt),dt.set(nt,st,pt,Vt),H.equals(dt)===!1&&(s.clearColor(nt,st,pt,Vt),H.copy(dt))},reset:function(){F=!1,Y=null,H.set(-1,0,0,0)}}}function n(){let F=!1,dt=!1,Y=null,H=null,nt=null;return{setReversed:function(st){if(dt!==st){const pt=t.get("EXT_clip_control");dt?pt.clipControlEXT(pt.LOWER_LEFT_EXT,pt.ZERO_TO_ONE_EXT):pt.clipControlEXT(pt.LOWER_LEFT_EXT,pt.NEGATIVE_ONE_TO_ONE_EXT);const Vt=nt;nt=null,this.setClear(Vt)}dt=st},getReversed:function(){return dt},setTest:function(st){st?mt(s.DEPTH_TEST):zt(s.DEPTH_TEST)},setMask:function(st){Y!==st&&!F&&(s.depthMask(st),Y=st)},setFunc:function(st){if(dt&&(st=z_[st]),H!==st){switch(st){case Ma:s.depthFunc(s.NEVER);break;case wa:s.depthFunc(s.ALWAYS);break;case ya:s.depthFunc(s.LESS);break;case es:s.depthFunc(s.LEQUAL);break;case Sa:s.depthFunc(s.EQUAL);break;case Ta:s.depthFunc(s.GEQUAL);break;case Ea:s.depthFunc(s.GREATER);break;case Aa:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}H=st}},setLocked:function(st){F=st},setClear:function(st){nt!==st&&(dt&&(st=1-st),s.clearDepth(st),nt=st)},reset:function(){F=!1,Y=null,H=null,nt=null,dt=!1}}}function i(){let F=!1,dt=null,Y=null,H=null,nt=null,st=null,pt=null,Vt=null,ie=null;return{setTest:function(oe){F||(oe?mt(s.STENCIL_TEST):zt(s.STENCIL_TEST))},setMask:function(oe){dt!==oe&&!F&&(s.stencilMask(oe),dt=oe)},setFunc:function(oe,ye,Be){(Y!==oe||H!==ye||nt!==Be)&&(s.stencilFunc(oe,ye,Be),Y=oe,H=ye,nt=Be)},setOp:function(oe,ye,Be){(st!==oe||pt!==ye||Vt!==Be)&&(s.stencilOp(oe,ye,Be),st=oe,pt=ye,Vt=Be)},setLocked:function(oe){F=oe},setClear:function(oe){ie!==oe&&(s.clearStencil(oe),ie=oe)},reset:function(){F=!1,dt=null,Y=null,H=null,nt=null,st=null,pt=null,Vt=null,ie=null}}}const r=new e,a=new n,o=new i,l=new WeakMap,c=new WeakMap;let h={},d={},u=new WeakMap,f=[],g=null,_=!1,m=null,p=null,w=null,M=null,x=null,E=null,y=null,R=new Ot(0,0,0),A=0,v=!1,b=null,C=null,U=null,I=null,V=null;const $=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,rt=0;const j=s.getParameter(s.VERSION);j.indexOf("WebGL")!==-1?(rt=parseFloat(/^WebGL (\d)/.exec(j)[1]),X=rt>=1):j.indexOf("OpenGL ES")!==-1&&(rt=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),X=rt>=2);let ft=null,xt={};const Rt=s.getParameter(s.SCISSOR_BOX),Wt=s.getParameter(s.VIEWPORT),ae=new xe().fromArray(Rt),J=new xe().fromArray(Wt);function ot(F,dt,Y,H){const nt=new Uint8Array(4),st=s.createTexture();s.bindTexture(F,st),s.texParameteri(F,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(F,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let pt=0;pt<Y;pt++)F===s.TEXTURE_3D||F===s.TEXTURE_2D_ARRAY?s.texImage3D(dt,0,s.RGBA,1,1,H,0,s.RGBA,s.UNSIGNED_BYTE,nt):s.texImage2D(dt+pt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,nt);return st}const yt={};yt[s.TEXTURE_2D]=ot(s.TEXTURE_2D,s.TEXTURE_2D,1),yt[s.TEXTURE_CUBE_MAP]=ot(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),yt[s.TEXTURE_2D_ARRAY]=ot(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),yt[s.TEXTURE_3D]=ot(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),mt(s.DEPTH_TEST),a.setFunc(es),te(!1),Jt(Vl),mt(s.CULL_FACE),B(oi);function mt(F){h[F]!==!0&&(s.enable(F),h[F]=!0)}function zt(F){h[F]!==!1&&(s.disable(F),h[F]=!1)}function qt(F,dt){return d[F]!==dt?(s.bindFramebuffer(F,dt),d[F]=dt,F===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=dt),F===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=dt),!0):!1}function Yt(F,dt){let Y=f,H=!1;if(F){Y=u.get(dt),Y===void 0&&(Y=[],u.set(dt,Y));const nt=F.textures;if(Y.length!==nt.length||Y[0]!==s.COLOR_ATTACHMENT0){for(let st=0,pt=nt.length;st<pt;st++)Y[st]=s.COLOR_ATTACHMENT0+st;Y.length=nt.length,H=!0}}else Y[0]!==s.BACK&&(Y[0]=s.BACK,H=!0);H&&s.drawBuffers(Y)}function Ht(F){return g!==F?(s.useProgram(F),g=F,!0):!1}const Zt={[Mi]:s.FUNC_ADD,[sf]:s.FUNC_SUBTRACT,[rf]:s.FUNC_REVERSE_SUBTRACT};Zt[of]=s.MIN,Zt[af]=s.MAX;const he={[lf]:s.ZERO,[cf]:s.ONE,[hf]:s.SRC_COLOR,[va]:s.SRC_ALPHA,[gf]:s.SRC_ALPHA_SATURATE,[pf]:s.DST_COLOR,[uf]:s.DST_ALPHA,[df]:s.ONE_MINUS_SRC_COLOR,[ba]:s.ONE_MINUS_SRC_ALPHA,[mf]:s.ONE_MINUS_DST_COLOR,[ff]:s.ONE_MINUS_DST_ALPHA,[_f]:s.CONSTANT_COLOR,[xf]:s.ONE_MINUS_CONSTANT_COLOR,[vf]:s.CONSTANT_ALPHA,[bf]:s.ONE_MINUS_CONSTANT_ALPHA};function B(F,dt,Y,H,nt,st,pt,Vt,ie,oe){if(F===oi){_===!0&&(zt(s.BLEND),_=!1);return}if(_===!1&&(mt(s.BLEND),_=!0),F!==nf){if(F!==m||oe!==v){if((p!==Mi||x!==Mi)&&(s.blendEquation(s.FUNC_ADD),p=Mi,x=Mi),oe)switch(F){case Ki:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Jr:s.blendFunc(s.ONE,s.ONE);break;case Wl:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Xl:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case Ki:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Jr:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Wl:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Xl:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}w=null,M=null,E=null,y=null,R.set(0,0,0),A=0,m=F,v=oe}return}nt=nt||dt,st=st||Y,pt=pt||H,(dt!==p||nt!==x)&&(s.blendEquationSeparate(Zt[dt],Zt[nt]),p=dt,x=nt),(Y!==w||H!==M||st!==E||pt!==y)&&(s.blendFuncSeparate(he[Y],he[H],he[st],he[pt]),w=Y,M=H,E=st,y=pt),(Vt.equals(R)===!1||ie!==A)&&(s.blendColor(Vt.r,Vt.g,Vt.b,ie),R.copy(Vt),A=ie),m=F,v=!1}function ve(F,dt){F.side===Kt?zt(s.CULL_FACE):mt(s.CULL_FACE);let Y=F.side===sn;dt&&(Y=!Y),te(Y),F.blending===Ki&&F.transparent===!1?B(oi):B(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),a.setFunc(F.depthFunc),a.setTest(F.depthTest),a.setMask(F.depthWrite),r.setMask(F.colorWrite);const H=F.stencilWrite;o.setTest(H),H&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),ce(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?mt(s.SAMPLE_ALPHA_TO_COVERAGE):zt(s.SAMPLE_ALPHA_TO_COVERAGE)}function te(F){b!==F&&(F?s.frontFace(s.CW):s.frontFace(s.CCW),b=F)}function Jt(F){F!==Qu?(mt(s.CULL_FACE),F!==C&&(F===Vl?s.cullFace(s.BACK):F===tf?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):zt(s.CULL_FACE),C=F}function Ct(F){F!==U&&(X&&s.lineWidth(F),U=F)}function ce(F,dt,Y){F?(mt(s.POLYGON_OFFSET_FILL),(I!==dt||V!==Y)&&(s.polygonOffset(dt,Y),I=dt,V=Y)):zt(s.POLYGON_OFFSET_FILL)}function It(F){F?mt(s.SCISSOR_TEST):zt(s.SCISSOR_TEST)}function L(F){F===void 0&&(F=s.TEXTURE0+$-1),ft!==F&&(s.activeTexture(F),ft=F)}function S(F,dt,Y){Y===void 0&&(ft===null?Y=s.TEXTURE0+$-1:Y=ft);let H=xt[Y];H===void 0&&(H={type:void 0,texture:void 0},xt[Y]=H),(H.type!==F||H.texture!==dt)&&(ft!==Y&&(s.activeTexture(Y),ft=Y),s.bindTexture(F,dt||yt[F]),H.type=F,H.texture=dt)}function G(){const F=xt[ft];F!==void 0&&F.type!==void 0&&(s.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function tt(){try{s.compressedTexImage2D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function et(){try{s.compressedTexImage3D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Q(){try{s.texSubImage2D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function St(){try{s.texSubImage3D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ht(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Mt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ee(){try{s.texStorage2D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function it(){try{s.texStorage3D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function bt(){try{s.texImage2D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Pt(){try{s.texImage3D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Nt(F){ae.equals(F)===!1&&(s.scissor(F.x,F.y,F.z,F.w),ae.copy(F))}function wt(F){J.equals(F)===!1&&(s.viewport(F.x,F.y,F.z,F.w),J.copy(F))}function jt(F,dt){let Y=c.get(dt);Y===void 0&&(Y=new WeakMap,c.set(dt,Y));let H=Y.get(F);H===void 0&&(H=s.getUniformBlockIndex(dt,F.name),Y.set(F,H))}function Xt(F,dt){const H=c.get(dt).get(F);l.get(dt)!==H&&(s.uniformBlockBinding(dt,H,F.__bindingPointIndex),l.set(dt,H))}function le(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},ft=null,xt={},d={},u=new WeakMap,f=[],g=null,_=!1,m=null,p=null,w=null,M=null,x=null,E=null,y=null,R=new Ot(0,0,0),A=0,v=!1,b=null,C=null,U=null,I=null,V=null,ae.set(0,0,s.canvas.width,s.canvas.height),J.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:mt,disable:zt,bindFramebuffer:qt,drawBuffers:Yt,useProgram:Ht,setBlending:B,setMaterial:ve,setFlipSided:te,setCullFace:Jt,setLineWidth:Ct,setPolygonOffset:ce,setScissorTest:It,activeTexture:L,bindTexture:S,unbindTexture:G,compressedTexImage2D:tt,compressedTexImage3D:et,texImage2D:bt,texImage3D:Pt,updateUBOMapping:jt,uniformBlockBinding:Xt,texStorage2D:ee,texStorage3D:it,texSubImage2D:Q,texSubImage3D:St,compressedTexSubImage2D:ht,compressedTexSubImage3D:Mt,scissor:Nt,viewport:wt,reset:le}}function Oc(s,t,e,n){const i=G_(n);switch(e){case Gh:return s*t;case Wh:return s*t;case Xh:return s*t*2;case qh:return s*t/i.components*i.byteLength;case Ml:return s*t/i.components*i.byteLength;case $h:return s*t*2/i.components*i.byteLength;case wl:return s*t*2/i.components*i.byteLength;case Vh:return s*t*3/i.components*i.byteLength;case Sn:return s*t*4/i.components*i.byteLength;case yl:return s*t*4/i.components*i.byteLength;case Hr:case Gr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Vr:case Wr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Ua:case Ia:return Math.max(s,16)*Math.max(t,8)/4;case Pa:case Da:return Math.max(s,8)*Math.max(t,8)/2;case ka:case Na:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Fa:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Oa:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Ba:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case za:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case Ha:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Ga:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case Va:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Wa:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Xa:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case qa:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case $a:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Ya:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case ja:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Za:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Ka:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Xr:case Ja:case Qa:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Yh:case tl:return Math.ceil(s/4)*Math.ceil(t/4)*8;case el:case nl:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function G_(s){switch(s){case qn:case Bh:return{byteLength:1,components:1};case Os:case zh:case qs:return{byteLength:2,components:1};case vl:case bl:return{byteLength:2,components:4};case Si:case xl:case Gn:return{byteLength:4,components:1};case Hh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function V_(s,t,e,n,i,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new _t,h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(L,S){return f?new OffscreenCanvas(L,S):Bs("canvas")}function _(L,S,G){let tt=1;const et=It(L);if((et.width>G||et.height>G)&&(tt=G/Math.max(et.width,et.height)),tt<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const Q=Math.floor(tt*et.width),St=Math.floor(tt*et.height);d===void 0&&(d=g(Q,St));const ht=S?g(Q,St):d;return ht.width=Q,ht.height=St,ht.getContext("2d").drawImage(L,0,0,Q,St),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+et.width+"x"+et.height+") to ("+Q+"x"+St+")."),ht}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+et.width+"x"+et.height+")."),L;return L}function m(L){return L.generateMipmaps}function p(L){s.generateMipmap(L)}function w(L){return L.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?s.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function M(L,S,G,tt,et=!1){if(L!==null){if(s[L]!==void 0)return s[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let Q=S;if(S===s.RED&&(G===s.FLOAT&&(Q=s.R32F),G===s.HALF_FLOAT&&(Q=s.R16F),G===s.UNSIGNED_BYTE&&(Q=s.R8)),S===s.RED_INTEGER&&(G===s.UNSIGNED_BYTE&&(Q=s.R8UI),G===s.UNSIGNED_SHORT&&(Q=s.R16UI),G===s.UNSIGNED_INT&&(Q=s.R32UI),G===s.BYTE&&(Q=s.R8I),G===s.SHORT&&(Q=s.R16I),G===s.INT&&(Q=s.R32I)),S===s.RG&&(G===s.FLOAT&&(Q=s.RG32F),G===s.HALF_FLOAT&&(Q=s.RG16F),G===s.UNSIGNED_BYTE&&(Q=s.RG8)),S===s.RG_INTEGER&&(G===s.UNSIGNED_BYTE&&(Q=s.RG8UI),G===s.UNSIGNED_SHORT&&(Q=s.RG16UI),G===s.UNSIGNED_INT&&(Q=s.RG32UI),G===s.BYTE&&(Q=s.RG8I),G===s.SHORT&&(Q=s.RG16I),G===s.INT&&(Q=s.RG32I)),S===s.RGB_INTEGER&&(G===s.UNSIGNED_BYTE&&(Q=s.RGB8UI),G===s.UNSIGNED_SHORT&&(Q=s.RGB16UI),G===s.UNSIGNED_INT&&(Q=s.RGB32UI),G===s.BYTE&&(Q=s.RGB8I),G===s.SHORT&&(Q=s.RGB16I),G===s.INT&&(Q=s.RGB32I)),S===s.RGBA_INTEGER&&(G===s.UNSIGNED_BYTE&&(Q=s.RGBA8UI),G===s.UNSIGNED_SHORT&&(Q=s.RGBA16UI),G===s.UNSIGNED_INT&&(Q=s.RGBA32UI),G===s.BYTE&&(Q=s.RGBA8I),G===s.SHORT&&(Q=s.RGBA16I),G===s.INT&&(Q=s.RGBA32I)),S===s.RGB&&G===s.UNSIGNED_INT_5_9_9_9_REV&&(Q=s.RGB9_E5),S===s.RGBA){const St=et?co:de.getTransfer(tt);G===s.FLOAT&&(Q=s.RGBA32F),G===s.HALF_FLOAT&&(Q=s.RGBA16F),G===s.UNSIGNED_BYTE&&(Q=St===ge?s.SRGB8_ALPHA8:s.RGBA8),G===s.UNSIGNED_SHORT_4_4_4_4&&(Q=s.RGBA4),G===s.UNSIGNED_SHORT_5_5_5_1&&(Q=s.RGB5_A1)}return(Q===s.R16F||Q===s.R32F||Q===s.RG16F||Q===s.RG32F||Q===s.RGBA16F||Q===s.RGBA32F)&&t.get("EXT_color_buffer_float"),Q}function x(L,S){let G;return L?S===null||S===Si||S===ss?G=s.DEPTH24_STENCIL8:S===Gn?G=s.DEPTH32F_STENCIL8:S===Os&&(G=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Si||S===ss?G=s.DEPTH_COMPONENT24:S===Gn?G=s.DEPTH_COMPONENT32F:S===Os&&(G=s.DEPTH_COMPONENT16),G}function E(L,S){return m(L)===!0||L.isFramebufferTexture&&L.minFilter!==Tn&&L.minFilter!==Ze?Math.log2(Math.max(S.width,S.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?S.mipmaps.length:1}function y(L){const S=L.target;S.removeEventListener("dispose",y),A(S),S.isVideoTexture&&h.delete(S)}function R(L){const S=L.target;S.removeEventListener("dispose",R),b(S)}function A(L){const S=n.get(L);if(S.__webglInit===void 0)return;const G=L.source,tt=u.get(G);if(tt){const et=tt[S.__cacheKey];et.usedTimes--,et.usedTimes===0&&v(L),Object.keys(tt).length===0&&u.delete(G)}n.remove(L)}function v(L){const S=n.get(L);s.deleteTexture(S.__webglTexture);const G=L.source,tt=u.get(G);delete tt[S.__cacheKey],a.memory.textures--}function b(L){const S=n.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),n.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let tt=0;tt<6;tt++){if(Array.isArray(S.__webglFramebuffer[tt]))for(let et=0;et<S.__webglFramebuffer[tt].length;et++)s.deleteFramebuffer(S.__webglFramebuffer[tt][et]);else s.deleteFramebuffer(S.__webglFramebuffer[tt]);S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer[tt])}else{if(Array.isArray(S.__webglFramebuffer))for(let tt=0;tt<S.__webglFramebuffer.length;tt++)s.deleteFramebuffer(S.__webglFramebuffer[tt]);else s.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&s.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let tt=0;tt<S.__webglColorRenderbuffer.length;tt++)S.__webglColorRenderbuffer[tt]&&s.deleteRenderbuffer(S.__webglColorRenderbuffer[tt]);S.__webglDepthRenderbuffer&&s.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const G=L.textures;for(let tt=0,et=G.length;tt<et;tt++){const Q=n.get(G[tt]);Q.__webglTexture&&(s.deleteTexture(Q.__webglTexture),a.memory.textures--),n.remove(G[tt])}n.remove(L)}let C=0;function U(){C=0}function I(){const L=C;return L>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+i.maxTextures),C+=1,L}function V(L){const S=[];return S.push(L.wrapS),S.push(L.wrapT),S.push(L.wrapR||0),S.push(L.magFilter),S.push(L.minFilter),S.push(L.anisotropy),S.push(L.internalFormat),S.push(L.format),S.push(L.type),S.push(L.generateMipmaps),S.push(L.premultiplyAlpha),S.push(L.flipY),S.push(L.unpackAlignment),S.push(L.colorSpace),S.join()}function $(L,S){const G=n.get(L);if(L.isVideoTexture&&Ct(L),L.isRenderTargetTexture===!1&&L.version>0&&G.__version!==L.version){const tt=L.image;if(tt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(tt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{J(G,L,S);return}}e.bindTexture(s.TEXTURE_2D,G.__webglTexture,s.TEXTURE0+S)}function X(L,S){const G=n.get(L);if(L.version>0&&G.__version!==L.version){J(G,L,S);return}e.bindTexture(s.TEXTURE_2D_ARRAY,G.__webglTexture,s.TEXTURE0+S)}function rt(L,S){const G=n.get(L);if(L.version>0&&G.__version!==L.version){J(G,L,S);return}e.bindTexture(s.TEXTURE_3D,G.__webglTexture,s.TEXTURE0+S)}function j(L,S){const G=n.get(L);if(L.version>0&&G.__version!==L.version){ot(G,L,S);return}e.bindTexture(s.TEXTURE_CUBE_MAP,G.__webglTexture,s.TEXTURE0+S)}const ft={[dn]:s.REPEAT,[wn]:s.CLAMP_TO_EDGE,[La]:s.MIRRORED_REPEAT},xt={[Tn]:s.NEAREST,[Lf]:s.NEAREST_MIPMAP_NEAREST,[Qs]:s.NEAREST_MIPMAP_LINEAR,[Ze]:s.LINEAR,[_o]:s.LINEAR_MIPMAP_NEAREST,[yn]:s.LINEAR_MIPMAP_LINEAR},Rt={[If]:s.NEVER,[zf]:s.ALWAYS,[kf]:s.LESS,[jh]:s.LEQUAL,[Nf]:s.EQUAL,[Bf]:s.GEQUAL,[Ff]:s.GREATER,[Of]:s.NOTEQUAL};function Wt(L,S){if(S.type===Gn&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===Ze||S.magFilter===_o||S.magFilter===Qs||S.magFilter===yn||S.minFilter===Ze||S.minFilter===_o||S.minFilter===Qs||S.minFilter===yn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(L,s.TEXTURE_WRAP_S,ft[S.wrapS]),s.texParameteri(L,s.TEXTURE_WRAP_T,ft[S.wrapT]),(L===s.TEXTURE_3D||L===s.TEXTURE_2D_ARRAY)&&s.texParameteri(L,s.TEXTURE_WRAP_R,ft[S.wrapR]),s.texParameteri(L,s.TEXTURE_MAG_FILTER,xt[S.magFilter]),s.texParameteri(L,s.TEXTURE_MIN_FILTER,xt[S.minFilter]),S.compareFunction&&(s.texParameteri(L,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(L,s.TEXTURE_COMPARE_FUNC,Rt[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Tn||S.minFilter!==Qs&&S.minFilter!==yn||S.type===Gn&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const G=t.get("EXT_texture_filter_anisotropic");s.texParameterf(L,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function ae(L,S){let G=!1;L.__webglInit===void 0&&(L.__webglInit=!0,S.addEventListener("dispose",y));const tt=S.source;let et=u.get(tt);et===void 0&&(et={},u.set(tt,et));const Q=V(S);if(Q!==L.__cacheKey){et[Q]===void 0&&(et[Q]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,G=!0),et[Q].usedTimes++;const St=et[L.__cacheKey];St!==void 0&&(et[L.__cacheKey].usedTimes--,St.usedTimes===0&&v(S)),L.__cacheKey=Q,L.__webglTexture=et[Q].texture}return G}function J(L,S,G){let tt=s.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(tt=s.TEXTURE_2D_ARRAY),S.isData3DTexture&&(tt=s.TEXTURE_3D);const et=ae(L,S),Q=S.source;e.bindTexture(tt,L.__webglTexture,s.TEXTURE0+G);const St=n.get(Q);if(Q.version!==St.__version||et===!0){e.activeTexture(s.TEXTURE0+G);const ht=de.getPrimaries(de.workingColorSpace),Mt=S.colorSpace===ri?null:de.getPrimaries(S.colorSpace),ee=S.colorSpace===ri||ht===Mt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ee);let it=_(S.image,!1,i.maxTextureSize);it=ce(S,it);const bt=r.convert(S.format,S.colorSpace),Pt=r.convert(S.type);let Nt=M(S.internalFormat,bt,Pt,S.colorSpace,S.isVideoTexture);Wt(tt,S);let wt;const jt=S.mipmaps,Xt=S.isVideoTexture!==!0,le=St.__version===void 0||et===!0,F=Q.dataReady,dt=E(S,it);if(S.isDepthTexture)Nt=x(S.format===rs,S.type),le&&(Xt?e.texStorage2D(s.TEXTURE_2D,1,Nt,it.width,it.height):e.texImage2D(s.TEXTURE_2D,0,Nt,it.width,it.height,0,bt,Pt,null));else if(S.isDataTexture)if(jt.length>0){Xt&&le&&e.texStorage2D(s.TEXTURE_2D,dt,Nt,jt[0].width,jt[0].height);for(let Y=0,H=jt.length;Y<H;Y++)wt=jt[Y],Xt?F&&e.texSubImage2D(s.TEXTURE_2D,Y,0,0,wt.width,wt.height,bt,Pt,wt.data):e.texImage2D(s.TEXTURE_2D,Y,Nt,wt.width,wt.height,0,bt,Pt,wt.data);S.generateMipmaps=!1}else Xt?(le&&e.texStorage2D(s.TEXTURE_2D,dt,Nt,it.width,it.height),F&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,it.width,it.height,bt,Pt,it.data)):e.texImage2D(s.TEXTURE_2D,0,Nt,it.width,it.height,0,bt,Pt,it.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Xt&&le&&e.texStorage3D(s.TEXTURE_2D_ARRAY,dt,Nt,jt[0].width,jt[0].height,it.depth);for(let Y=0,H=jt.length;Y<H;Y++)if(wt=jt[Y],S.format!==Sn)if(bt!==null)if(Xt){if(F)if(S.layerUpdates.size>0){const nt=Oc(wt.width,wt.height,S.format,S.type);for(const st of S.layerUpdates){const pt=wt.data.subarray(st*nt/wt.data.BYTES_PER_ELEMENT,(st+1)*nt/wt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Y,0,0,st,wt.width,wt.height,1,bt,pt)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Y,0,0,0,wt.width,wt.height,it.depth,bt,wt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,Y,Nt,wt.width,wt.height,it.depth,0,wt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Xt?F&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,Y,0,0,0,wt.width,wt.height,it.depth,bt,Pt,wt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,Y,Nt,wt.width,wt.height,it.depth,0,bt,Pt,wt.data)}else{Xt&&le&&e.texStorage2D(s.TEXTURE_2D,dt,Nt,jt[0].width,jt[0].height);for(let Y=0,H=jt.length;Y<H;Y++)wt=jt[Y],S.format!==Sn?bt!==null?Xt?F&&e.compressedTexSubImage2D(s.TEXTURE_2D,Y,0,0,wt.width,wt.height,bt,wt.data):e.compressedTexImage2D(s.TEXTURE_2D,Y,Nt,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xt?F&&e.texSubImage2D(s.TEXTURE_2D,Y,0,0,wt.width,wt.height,bt,Pt,wt.data):e.texImage2D(s.TEXTURE_2D,Y,Nt,wt.width,wt.height,0,bt,Pt,wt.data)}else if(S.isDataArrayTexture)if(Xt){if(le&&e.texStorage3D(s.TEXTURE_2D_ARRAY,dt,Nt,it.width,it.height,it.depth),F)if(S.layerUpdates.size>0){const Y=Oc(it.width,it.height,S.format,S.type);for(const H of S.layerUpdates){const nt=it.data.subarray(H*Y/it.data.BYTES_PER_ELEMENT,(H+1)*Y/it.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,H,it.width,it.height,1,bt,Pt,nt)}S.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,bt,Pt,it.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,Nt,it.width,it.height,it.depth,0,bt,Pt,it.data);else if(S.isData3DTexture)Xt?(le&&e.texStorage3D(s.TEXTURE_3D,dt,Nt,it.width,it.height,it.depth),F&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,bt,Pt,it.data)):e.texImage3D(s.TEXTURE_3D,0,Nt,it.width,it.height,it.depth,0,bt,Pt,it.data);else if(S.isFramebufferTexture){if(le)if(Xt)e.texStorage2D(s.TEXTURE_2D,dt,Nt,it.width,it.height);else{let Y=it.width,H=it.height;for(let nt=0;nt<dt;nt++)e.texImage2D(s.TEXTURE_2D,nt,Nt,Y,H,0,bt,Pt,null),Y>>=1,H>>=1}}else if(jt.length>0){if(Xt&&le){const Y=It(jt[0]);e.texStorage2D(s.TEXTURE_2D,dt,Nt,Y.width,Y.height)}for(let Y=0,H=jt.length;Y<H;Y++)wt=jt[Y],Xt?F&&e.texSubImage2D(s.TEXTURE_2D,Y,0,0,bt,Pt,wt):e.texImage2D(s.TEXTURE_2D,Y,Nt,bt,Pt,wt);S.generateMipmaps=!1}else if(Xt){if(le){const Y=It(it);e.texStorage2D(s.TEXTURE_2D,dt,Nt,Y.width,Y.height)}F&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,bt,Pt,it)}else e.texImage2D(s.TEXTURE_2D,0,Nt,bt,Pt,it);m(S)&&p(tt),St.__version=Q.version,S.onUpdate&&S.onUpdate(S)}L.__version=S.version}function ot(L,S,G){if(S.image.length!==6)return;const tt=ae(L,S),et=S.source;e.bindTexture(s.TEXTURE_CUBE_MAP,L.__webglTexture,s.TEXTURE0+G);const Q=n.get(et);if(et.version!==Q.__version||tt===!0){e.activeTexture(s.TEXTURE0+G);const St=de.getPrimaries(de.workingColorSpace),ht=S.colorSpace===ri?null:de.getPrimaries(S.colorSpace),Mt=S.colorSpace===ri||St===ht?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt);const ee=S.isCompressedTexture||S.image[0].isCompressedTexture,it=S.image[0]&&S.image[0].isDataTexture,bt=[];for(let H=0;H<6;H++)!ee&&!it?bt[H]=_(S.image[H],!0,i.maxCubemapSize):bt[H]=it?S.image[H].image:S.image[H],bt[H]=ce(S,bt[H]);const Pt=bt[0],Nt=r.convert(S.format,S.colorSpace),wt=r.convert(S.type),jt=M(S.internalFormat,Nt,wt,S.colorSpace),Xt=S.isVideoTexture!==!0,le=Q.__version===void 0||tt===!0,F=et.dataReady;let dt=E(S,Pt);Wt(s.TEXTURE_CUBE_MAP,S);let Y;if(ee){Xt&&le&&e.texStorage2D(s.TEXTURE_CUBE_MAP,dt,jt,Pt.width,Pt.height);for(let H=0;H<6;H++){Y=bt[H].mipmaps;for(let nt=0;nt<Y.length;nt++){const st=Y[nt];S.format!==Sn?Nt!==null?Xt?F&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,nt,0,0,st.width,st.height,Nt,st.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,nt,jt,st.width,st.height,0,st.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Xt?F&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,nt,0,0,st.width,st.height,Nt,wt,st.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,nt,jt,st.width,st.height,0,Nt,wt,st.data)}}}else{if(Y=S.mipmaps,Xt&&le){Y.length>0&&dt++;const H=It(bt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,dt,jt,H.width,H.height)}for(let H=0;H<6;H++)if(it){Xt?F&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,0,0,0,bt[H].width,bt[H].height,Nt,wt,bt[H].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,0,jt,bt[H].width,bt[H].height,0,Nt,wt,bt[H].data);for(let nt=0;nt<Y.length;nt++){const pt=Y[nt].image[H].image;Xt?F&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,nt+1,0,0,pt.width,pt.height,Nt,wt,pt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,nt+1,jt,pt.width,pt.height,0,Nt,wt,pt.data)}}else{Xt?F&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,0,0,0,Nt,wt,bt[H]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,0,jt,Nt,wt,bt[H]);for(let nt=0;nt<Y.length;nt++){const st=Y[nt];Xt?F&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,nt+1,0,0,Nt,wt,st.image[H]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,nt+1,jt,Nt,wt,st.image[H])}}}m(S)&&p(s.TEXTURE_CUBE_MAP),Q.__version=et.version,S.onUpdate&&S.onUpdate(S)}L.__version=S.version}function yt(L,S,G,tt,et,Q){const St=r.convert(G.format,G.colorSpace),ht=r.convert(G.type),Mt=M(G.internalFormat,St,ht,G.colorSpace),ee=n.get(S),it=n.get(G);if(it.__renderTarget=S,!ee.__hasExternalTextures){const bt=Math.max(1,S.width>>Q),Pt=Math.max(1,S.height>>Q);et===s.TEXTURE_3D||et===s.TEXTURE_2D_ARRAY?e.texImage3D(et,Q,Mt,bt,Pt,S.depth,0,St,ht,null):e.texImage2D(et,Q,Mt,bt,Pt,0,St,ht,null)}e.bindFramebuffer(s.FRAMEBUFFER,L),Jt(S)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,tt,et,it.__webglTexture,0,te(S)):(et===s.TEXTURE_2D||et>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&et<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,tt,et,it.__webglTexture,Q),e.bindFramebuffer(s.FRAMEBUFFER,null)}function mt(L,S,G){if(s.bindRenderbuffer(s.RENDERBUFFER,L),S.depthBuffer){const tt=S.depthTexture,et=tt&&tt.isDepthTexture?tt.type:null,Q=x(S.stencilBuffer,et),St=S.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ht=te(S);Jt(S)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ht,Q,S.width,S.height):G?s.renderbufferStorageMultisample(s.RENDERBUFFER,ht,Q,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,Q,S.width,S.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,St,s.RENDERBUFFER,L)}else{const tt=S.textures;for(let et=0;et<tt.length;et++){const Q=tt[et],St=r.convert(Q.format,Q.colorSpace),ht=r.convert(Q.type),Mt=M(Q.internalFormat,St,ht,Q.colorSpace),ee=te(S);G&&Jt(S)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,ee,Mt,S.width,S.height):Jt(S)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ee,Mt,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,Mt,S.width,S.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function zt(L,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,L),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const tt=n.get(S.depthTexture);tt.__renderTarget=S,(!tt.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),$(S.depthTexture,0);const et=tt.__webglTexture,Q=te(S);if(S.depthTexture.format===Ji)Jt(S)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,et,0,Q):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,et,0);else if(S.depthTexture.format===rs)Jt(S)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,et,0,Q):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,et,0);else throw new Error("Unknown depthTexture format")}function qt(L){const S=n.get(L),G=L.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==L.depthTexture){const tt=L.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),tt){const et=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,tt.removeEventListener("dispose",et)};tt.addEventListener("dispose",et),S.__depthDisposeCallback=et}S.__boundDepthTexture=tt}if(L.depthTexture&&!S.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");zt(S.__webglFramebuffer,L)}else if(G){S.__webglDepthbuffer=[];for(let tt=0;tt<6;tt++)if(e.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer[tt]),S.__webglDepthbuffer[tt]===void 0)S.__webglDepthbuffer[tt]=s.createRenderbuffer(),mt(S.__webglDepthbuffer[tt],L,!1);else{const et=L.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Q=S.__webglDepthbuffer[tt];s.bindRenderbuffer(s.RENDERBUFFER,Q),s.framebufferRenderbuffer(s.FRAMEBUFFER,et,s.RENDERBUFFER,Q)}}else if(e.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=s.createRenderbuffer(),mt(S.__webglDepthbuffer,L,!1);else{const tt=L.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,et=S.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,et),s.framebufferRenderbuffer(s.FRAMEBUFFER,tt,s.RENDERBUFFER,et)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Yt(L,S,G){const tt=n.get(L);S!==void 0&&yt(tt.__webglFramebuffer,L,L.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),G!==void 0&&qt(L)}function Ht(L){const S=L.texture,G=n.get(L),tt=n.get(S);L.addEventListener("dispose",R);const et=L.textures,Q=L.isWebGLCubeRenderTarget===!0,St=et.length>1;if(St||(tt.__webglTexture===void 0&&(tt.__webglTexture=s.createTexture()),tt.__version=S.version,a.memory.textures++),Q){G.__webglFramebuffer=[];for(let ht=0;ht<6;ht++)if(S.mipmaps&&S.mipmaps.length>0){G.__webglFramebuffer[ht]=[];for(let Mt=0;Mt<S.mipmaps.length;Mt++)G.__webglFramebuffer[ht][Mt]=s.createFramebuffer()}else G.__webglFramebuffer[ht]=s.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){G.__webglFramebuffer=[];for(let ht=0;ht<S.mipmaps.length;ht++)G.__webglFramebuffer[ht]=s.createFramebuffer()}else G.__webglFramebuffer=s.createFramebuffer();if(St)for(let ht=0,Mt=et.length;ht<Mt;ht++){const ee=n.get(et[ht]);ee.__webglTexture===void 0&&(ee.__webglTexture=s.createTexture(),a.memory.textures++)}if(L.samples>0&&Jt(L)===!1){G.__webglMultisampledFramebuffer=s.createFramebuffer(),G.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let ht=0;ht<et.length;ht++){const Mt=et[ht];G.__webglColorRenderbuffer[ht]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,G.__webglColorRenderbuffer[ht]);const ee=r.convert(Mt.format,Mt.colorSpace),it=r.convert(Mt.type),bt=M(Mt.internalFormat,ee,it,Mt.colorSpace,L.isXRRenderTarget===!0),Pt=te(L);s.renderbufferStorageMultisample(s.RENDERBUFFER,Pt,bt,L.width,L.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ht,s.RENDERBUFFER,G.__webglColorRenderbuffer[ht])}s.bindRenderbuffer(s.RENDERBUFFER,null),L.depthBuffer&&(G.__webglDepthRenderbuffer=s.createRenderbuffer(),mt(G.__webglDepthRenderbuffer,L,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(Q){e.bindTexture(s.TEXTURE_CUBE_MAP,tt.__webglTexture),Wt(s.TEXTURE_CUBE_MAP,S);for(let ht=0;ht<6;ht++)if(S.mipmaps&&S.mipmaps.length>0)for(let Mt=0;Mt<S.mipmaps.length;Mt++)yt(G.__webglFramebuffer[ht][Mt],L,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,Mt);else yt(G.__webglFramebuffer[ht],L,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0);m(S)&&p(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(St){for(let ht=0,Mt=et.length;ht<Mt;ht++){const ee=et[ht],it=n.get(ee);e.bindTexture(s.TEXTURE_2D,it.__webglTexture),Wt(s.TEXTURE_2D,ee),yt(G.__webglFramebuffer,L,ee,s.COLOR_ATTACHMENT0+ht,s.TEXTURE_2D,0),m(ee)&&p(s.TEXTURE_2D)}e.unbindTexture()}else{let ht=s.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(ht=L.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(ht,tt.__webglTexture),Wt(ht,S),S.mipmaps&&S.mipmaps.length>0)for(let Mt=0;Mt<S.mipmaps.length;Mt++)yt(G.__webglFramebuffer[Mt],L,S,s.COLOR_ATTACHMENT0,ht,Mt);else yt(G.__webglFramebuffer,L,S,s.COLOR_ATTACHMENT0,ht,0);m(S)&&p(ht),e.unbindTexture()}L.depthBuffer&&qt(L)}function Zt(L){const S=L.textures;for(let G=0,tt=S.length;G<tt;G++){const et=S[G];if(m(et)){const Q=w(L),St=n.get(et).__webglTexture;e.bindTexture(Q,St),p(Q),e.unbindTexture()}}}const he=[],B=[];function ve(L){if(L.samples>0){if(Jt(L)===!1){const S=L.textures,G=L.width,tt=L.height;let et=s.COLOR_BUFFER_BIT;const Q=L.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,St=n.get(L),ht=S.length>1;if(ht)for(let Mt=0;Mt<S.length;Mt++)e.bindFramebuffer(s.FRAMEBUFFER,St.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Mt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,St.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Mt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,St.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,St.__webglFramebuffer);for(let Mt=0;Mt<S.length;Mt++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(et|=s.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(et|=s.STENCIL_BUFFER_BIT)),ht){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,St.__webglColorRenderbuffer[Mt]);const ee=n.get(S[Mt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,ee,0)}s.blitFramebuffer(0,0,G,tt,0,0,G,tt,et,s.NEAREST),l===!0&&(he.length=0,B.length=0,he.push(s.COLOR_ATTACHMENT0+Mt),L.depthBuffer&&L.resolveDepthBuffer===!1&&(he.push(Q),B.push(Q),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,B)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,he))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ht)for(let Mt=0;Mt<S.length;Mt++){e.bindFramebuffer(s.FRAMEBUFFER,St.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Mt,s.RENDERBUFFER,St.__webglColorRenderbuffer[Mt]);const ee=n.get(S[Mt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,St.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Mt,s.TEXTURE_2D,ee,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,St.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&l){const S=L.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[S])}}}function te(L){return Math.min(i.maxSamples,L.samples)}function Jt(L){const S=n.get(L);return L.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Ct(L){const S=a.render.frame;h.get(L)!==S&&(h.set(L,S),L.update())}function ce(L,S){const G=L.colorSpace,tt=L.format,et=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||G!==ls&&G!==ri&&(de.getTransfer(G)===ge?(tt!==Sn||et!==qn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),S}function It(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(c.width=L.naturalWidth||L.width,c.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(c.width=L.displayWidth,c.height=L.displayHeight):(c.width=L.width,c.height=L.height),c}this.allocateTextureUnit=I,this.resetTextureUnits=U,this.setTexture2D=$,this.setTexture2DArray=X,this.setTexture3D=rt,this.setTextureCube=j,this.rebindTextures=Yt,this.setupRenderTarget=Ht,this.updateRenderTargetMipmap=Zt,this.updateMultisampleRenderTarget=ve,this.setupDepthRenderbuffer=qt,this.setupFrameBufferTexture=yt,this.useMultisampledRTT=Jt}function W_(s,t){function e(n,i=ri){let r;const a=de.getTransfer(i);if(n===qn)return s.UNSIGNED_BYTE;if(n===vl)return s.UNSIGNED_SHORT_4_4_4_4;if(n===bl)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Hh)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Bh)return s.BYTE;if(n===zh)return s.SHORT;if(n===Os)return s.UNSIGNED_SHORT;if(n===xl)return s.INT;if(n===Si)return s.UNSIGNED_INT;if(n===Gn)return s.FLOAT;if(n===qs)return s.HALF_FLOAT;if(n===Gh)return s.ALPHA;if(n===Vh)return s.RGB;if(n===Sn)return s.RGBA;if(n===Wh)return s.LUMINANCE;if(n===Xh)return s.LUMINANCE_ALPHA;if(n===Ji)return s.DEPTH_COMPONENT;if(n===rs)return s.DEPTH_STENCIL;if(n===qh)return s.RED;if(n===Ml)return s.RED_INTEGER;if(n===$h)return s.RG;if(n===wl)return s.RG_INTEGER;if(n===yl)return s.RGBA_INTEGER;if(n===Hr||n===Gr||n===Vr||n===Wr)if(a===ge)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Hr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Gr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Vr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Hr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Gr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Vr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Wr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Pa||n===Ua||n===Da||n===Ia)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Pa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ua)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Da)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ia)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ka||n===Na||n===Fa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ka||n===Na)return a===ge?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Fa)return a===ge?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Oa||n===Ba||n===za||n===Ha||n===Ga||n===Va||n===Wa||n===Xa||n===qa||n===$a||n===Ya||n===ja||n===Za||n===Ka)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Oa)return a===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ba)return a===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===za)return a===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ha)return a===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ga)return a===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Va)return a===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Wa)return a===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Xa)return a===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===qa)return a===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===$a)return a===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ya)return a===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ja)return a===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Za)return a===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ka)return a===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Xr||n===Ja||n===Qa)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Xr)return a===ge?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ja)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Qa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Yh||n===tl||n===el||n===nl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Xr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===tl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===el)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===nl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ss?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}class X_ extends hn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class He extends Ne{constructor(){super(),this.isGroup=!0,this.type="Group"}}const q_={type:"move"};class qo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new He,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new He,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new He,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(q_)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new He;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const $_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Y_=`
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

}`;class j_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new Ke,r=t.properties.get(i);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new ci({vertexShader:$_,fragmentShader:Y_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new K(new Bt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Z_ extends cs{constructor(t,e){super();const n=this;let i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null;const _=new j_,m=e.getContextAttributes();let p=null,w=null;const M=[],x=[],E=new _t;let y=null;const R=new hn;R.viewport=new xe;const A=new hn;A.viewport=new xe;const v=[R,A],b=new X_;let C=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let ot=M[J];return ot===void 0&&(ot=new qo,M[J]=ot),ot.getTargetRaySpace()},this.getControllerGrip=function(J){let ot=M[J];return ot===void 0&&(ot=new qo,M[J]=ot),ot.getGripSpace()},this.getHand=function(J){let ot=M[J];return ot===void 0&&(ot=new qo,M[J]=ot),ot.getHandSpace()};function I(J){const ot=x.indexOf(J.inputSource);if(ot===-1)return;const yt=M[ot];yt!==void 0&&(yt.update(J.inputSource,J.frame,c||a),yt.dispatchEvent({type:J.type,data:J.inputSource}))}function V(){i.removeEventListener("select",I),i.removeEventListener("selectstart",I),i.removeEventListener("selectend",I),i.removeEventListener("squeeze",I),i.removeEventListener("squeezestart",I),i.removeEventListener("squeezeend",I),i.removeEventListener("end",V),i.removeEventListener("inputsourceschange",$);for(let J=0;J<M.length;J++){const ot=x[J];ot!==null&&(x[J]=null,M[J].disconnect(ot))}C=null,U=null,_.reset(),t.setRenderTarget(p),f=null,u=null,d=null,i=null,w=null,ae.stop(),n.isPresenting=!1,t.setPixelRatio(y),t.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){o=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(J){if(i=J,i!==null){if(p=t.getRenderTarget(),i.addEventListener("select",I),i.addEventListener("selectstart",I),i.addEventListener("selectend",I),i.addEventListener("squeeze",I),i.addEventListener("squeezestart",I),i.addEventListener("squeezeend",I),i.addEventListener("end",V),i.addEventListener("inputsourceschange",$),m.xrCompatible!==!0&&await e.makeXRCompatible(),y=t.getPixelRatio(),t.getSize(E),i.renderState.layers===void 0){const ot={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,e,ot),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),w=new Ti(f.framebufferWidth,f.framebufferHeight,{format:Sn,type:qn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let ot=null,yt=null,mt=null;m.depth&&(mt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ot=m.stencil?rs:Ji,yt=m.stencil?ss:Si);const zt={colorFormat:e.RGBA8,depthFormat:mt,scaleFactor:r};d=new XRWebGLBinding(i,e),u=d.createProjectionLayer(zt),i.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),w=new Ti(u.textureWidth,u.textureHeight,{format:Sn,type:qn,depthTexture:new ad(u.textureWidth,u.textureHeight,yt,void 0,void 0,void 0,void 0,void 0,void 0,ot),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),ae.setContext(i),ae.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function $(J){for(let ot=0;ot<J.removed.length;ot++){const yt=J.removed[ot],mt=x.indexOf(yt);mt>=0&&(x[mt]=null,M[mt].disconnect(yt))}for(let ot=0;ot<J.added.length;ot++){const yt=J.added[ot];let mt=x.indexOf(yt);if(mt===-1){for(let qt=0;qt<M.length;qt++)if(qt>=x.length){x.push(yt),mt=qt;break}else if(x[qt]===null){x[qt]=yt,mt=qt;break}if(mt===-1)break}const zt=M[mt];zt&&zt.connect(yt)}}const X=new D,rt=new D;function j(J,ot,yt){X.setFromMatrixPosition(ot.matrixWorld),rt.setFromMatrixPosition(yt.matrixWorld);const mt=X.distanceTo(rt),zt=ot.projectionMatrix.elements,qt=yt.projectionMatrix.elements,Yt=zt[14]/(zt[10]-1),Ht=zt[14]/(zt[10]+1),Zt=(zt[9]+1)/zt[5],he=(zt[9]-1)/zt[5],B=(zt[8]-1)/zt[0],ve=(qt[8]+1)/qt[0],te=Yt*B,Jt=Yt*ve,Ct=mt/(-B+ve),ce=Ct*-B;if(ot.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(ce),J.translateZ(Ct),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),zt[10]===-1)J.projectionMatrix.copy(ot.projectionMatrix),J.projectionMatrixInverse.copy(ot.projectionMatrixInverse);else{const It=Yt+Ct,L=Ht+Ct,S=te-ce,G=Jt+(mt-ce),tt=Zt*Ht/L*It,et=he*Ht/L*It;J.projectionMatrix.makePerspective(S,G,tt,et,It,L),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function ft(J,ot){ot===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(ot.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(i===null)return;let ot=J.near,yt=J.far;_.texture!==null&&(_.depthNear>0&&(ot=_.depthNear),_.depthFar>0&&(yt=_.depthFar)),b.near=A.near=R.near=ot,b.far=A.far=R.far=yt,(C!==b.near||U!==b.far)&&(i.updateRenderState({depthNear:b.near,depthFar:b.far}),C=b.near,U=b.far),R.layers.mask=J.layers.mask|2,A.layers.mask=J.layers.mask|4,b.layers.mask=R.layers.mask|A.layers.mask;const mt=J.parent,zt=b.cameras;ft(b,mt);for(let qt=0;qt<zt.length;qt++)ft(zt[qt],mt);zt.length===2?j(b,R,A):b.projectionMatrix.copy(R.projectionMatrix),xt(J,b,mt)};function xt(J,ot,yt){yt===null?J.matrix.copy(ot.matrixWorld):(J.matrix.copy(yt.matrixWorld),J.matrix.invert(),J.matrix.multiply(ot.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(ot.projectionMatrix),J.projectionMatrixInverse.copy(ot.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=sl*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(J){l=J,u!==null&&(u.fixedFoveation=J),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=J)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(b)};let Rt=null;function Wt(J,ot){if(h=ot.getViewerPose(c||a),g=ot,h!==null){const yt=h.views;f!==null&&(t.setRenderTargetFramebuffer(w,f.framebuffer),t.setRenderTarget(w));let mt=!1;yt.length!==b.cameras.length&&(b.cameras.length=0,mt=!0);for(let qt=0;qt<yt.length;qt++){const Yt=yt[qt];let Ht=null;if(f!==null)Ht=f.getViewport(Yt);else{const he=d.getViewSubImage(u,Yt);Ht=he.viewport,qt===0&&(t.setRenderTargetTextures(w,he.colorTexture,u.ignoreDepthValues?void 0:he.depthStencilTexture),t.setRenderTarget(w))}let Zt=v[qt];Zt===void 0&&(Zt=new hn,Zt.layers.enable(qt),Zt.viewport=new xe,v[qt]=Zt),Zt.matrix.fromArray(Yt.transform.matrix),Zt.matrix.decompose(Zt.position,Zt.quaternion,Zt.scale),Zt.projectionMatrix.fromArray(Yt.projectionMatrix),Zt.projectionMatrixInverse.copy(Zt.projectionMatrix).invert(),Zt.viewport.set(Ht.x,Ht.y,Ht.width,Ht.height),qt===0&&(b.matrix.copy(Zt.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),mt===!0&&b.cameras.push(Zt)}const zt=i.enabledFeatures;if(zt&&zt.includes("depth-sensing")){const qt=d.getDepthInformation(yt[0]);qt&&qt.isValid&&qt.texture&&_.init(t,qt,i.renderState)}}for(let yt=0;yt<M.length;yt++){const mt=x[yt],zt=M[yt];mt!==null&&zt!==void 0&&zt.update(mt,ot,c||a)}Rt&&Rt(J,ot),ot.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ot}),g=null}const ae=new rd;ae.setAnimationLoop(Wt),this.setAnimationLoop=function(J){Rt=J},this.dispose=function(){}}}const _i=new En,K_=new we;function J_(s,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,nd(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,w,M,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,w,M):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===sn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===sn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const w=t.get(p),M=w.envMap,x=w.envMapRotation;M&&(m.envMap.value=M,_i.copy(x),_i.x*=-1,_i.y*=-1,_i.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(_i.y*=-1,_i.z*=-1),m.envMapRotation.value.setFromMatrix4(K_.makeRotationFromEuler(_i)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,w,M){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*w,m.scale.value=M*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,w){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===sn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const w=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Q_(s,t,e,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(w,M){const x=M.program;n.uniformBlockBinding(w,x)}function c(w,M){let x=i[w.id];x===void 0&&(g(w),x=h(w),i[w.id]=x,w.addEventListener("dispose",m));const E=M.program;n.updateUBOMapping(w,E);const y=t.render.frame;r[w.id]!==y&&(u(w),r[w.id]=y)}function h(w){const M=d();w.__bindingPointIndex=M;const x=s.createBuffer(),E=w.__size,y=w.usage;return s.bindBuffer(s.UNIFORM_BUFFER,x),s.bufferData(s.UNIFORM_BUFFER,E,y),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,M,x),x}function d(){for(let w=0;w<o;w++)if(a.indexOf(w)===-1)return a.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(w){const M=i[w.id],x=w.uniforms,E=w.__cache;s.bindBuffer(s.UNIFORM_BUFFER,M);for(let y=0,R=x.length;y<R;y++){const A=Array.isArray(x[y])?x[y]:[x[y]];for(let v=0,b=A.length;v<b;v++){const C=A[v];if(f(C,y,v,E)===!0){const U=C.__offset,I=Array.isArray(C.value)?C.value:[C.value];let V=0;for(let $=0;$<I.length;$++){const X=I[$],rt=_(X);typeof X=="number"||typeof X=="boolean"?(C.__data[0]=X,s.bufferSubData(s.UNIFORM_BUFFER,U+V,C.__data)):X.isMatrix3?(C.__data[0]=X.elements[0],C.__data[1]=X.elements[1],C.__data[2]=X.elements[2],C.__data[3]=0,C.__data[4]=X.elements[3],C.__data[5]=X.elements[4],C.__data[6]=X.elements[5],C.__data[7]=0,C.__data[8]=X.elements[6],C.__data[9]=X.elements[7],C.__data[10]=X.elements[8],C.__data[11]=0):(X.toArray(C.__data,V),V+=rt.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,U,C.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(w,M,x,E){const y=w.value,R=M+"_"+x;if(E[R]===void 0)return typeof y=="number"||typeof y=="boolean"?E[R]=y:E[R]=y.clone(),!0;{const A=E[R];if(typeof y=="number"||typeof y=="boolean"){if(A!==y)return E[R]=y,!0}else if(A.equals(y)===!1)return A.copy(y),!0}return!1}function g(w){const M=w.uniforms;let x=0;const E=16;for(let R=0,A=M.length;R<A;R++){const v=Array.isArray(M[R])?M[R]:[M[R]];for(let b=0,C=v.length;b<C;b++){const U=v[b],I=Array.isArray(U.value)?U.value:[U.value];for(let V=0,$=I.length;V<$;V++){const X=I[V],rt=_(X),j=x%E,ft=j%rt.boundary,xt=j+ft;x+=ft,xt!==0&&E-xt<rt.storage&&(x+=E-xt),U.__data=new Float32Array(rt.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=x,x+=rt.storage}}}const y=x%E;return y>0&&(x+=E-y),w.__size=x,w.__cache={},this}function _(w){const M={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(M.boundary=4,M.storage=4):w.isVector2?(M.boundary=8,M.storage=8):w.isVector3||w.isColor?(M.boundary=16,M.storage=12):w.isVector4?(M.boundary=16,M.storage=16):w.isMatrix3?(M.boundary=48,M.storage=48):w.isMatrix4?(M.boundary=64,M.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),M}function m(w){const M=w.target;M.removeEventListener("dispose",m);const x=a.indexOf(M.__bindingPointIndex);a.splice(x,1),s.deleteBuffer(i[M.id]),delete i[M.id],delete r[M.id]}function p(){for(const w in i)s.deleteBuffer(i[w]);a=[],i={},r={}}return{bind:l,update:c,dispose:p}}class tx{constructor(t={}){const{canvas:e=Gf(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const w=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ie,this.toneMapping=ai,this.toneMappingExposure=1;const x=this;let E=!1,y=0,R=0,A=null,v=-1,b=null;const C=new xe,U=new xe;let I=null;const V=new Ot(0);let $=0,X=e.width,rt=e.height,j=1,ft=null,xt=null;const Rt=new xe(0,0,X,rt),Wt=new xe(0,0,X,rt);let ae=!1;const J=new Al;let ot=!1,yt=!1;const mt=new we,zt=new we,qt=new D,Yt=new xe,Ht={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Zt=!1;function he(){return A===null?j:1}let B=n;function ve(T,k){return e.getContext(T,k)}try{const T={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${_l}`),e.addEventListener("webglcontextlost",H,!1),e.addEventListener("webglcontextrestored",nt,!1),e.addEventListener("webglcontextcreationerror",st,!1),B===null){const k="webgl2";if(B=ve(k,T),B===null)throw ve(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let te,Jt,Ct,ce,It,L,S,G,tt,et,Q,St,ht,Mt,ee,it,bt,Pt,Nt,wt,jt,Xt,le,F;function dt(){te=new r0(B),te.init(),Xt=new W_(B,te),Jt=new Qg(B,te,t,Xt),Ct=new H_(B,te),Jt.reverseDepthBuffer&&u&&Ct.buffers.depth.setReversed(!0),ce=new l0(B),It=new E_,L=new V_(B,te,Ct,It,Jt,Xt,ce),S=new e0(x),G=new s0(x),tt=new mp(B),le=new Kg(B,tt),et=new o0(B,tt,ce,le),Q=new h0(B,et,tt,ce),Nt=new c0(B,Jt,L),it=new t0(It),St=new T_(x,S,G,te,Jt,le,it),ht=new J_(x,It),Mt=new R_,ee=new I_(te),Pt=new Zg(x,S,G,Ct,Q,f,l),bt=new B_(x,Q,Jt),F=new Q_(B,ce,Jt,Ct),wt=new Jg(B,te,ce),jt=new a0(B,te,ce),ce.programs=St.programs,x.capabilities=Jt,x.extensions=te,x.properties=It,x.renderLists=Mt,x.shadowMap=bt,x.state=Ct,x.info=ce}dt();const Y=new Z_(x,B);this.xr=Y,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const T=te.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=te.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(T){T!==void 0&&(j=T,this.setSize(X,rt,!1))},this.getSize=function(T){return T.set(X,rt)},this.setSize=function(T,k,z=!0){if(Y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=T,rt=k,e.width=Math.floor(T*j),e.height=Math.floor(k*j),z===!0&&(e.style.width=T+"px",e.style.height=k+"px"),this.setViewport(0,0,T,k)},this.getDrawingBufferSize=function(T){return T.set(X*j,rt*j).floor()},this.setDrawingBufferSize=function(T,k,z){X=T,rt=k,j=z,e.width=Math.floor(T*z),e.height=Math.floor(k*z),this.setViewport(0,0,T,k)},this.getCurrentViewport=function(T){return T.copy(C)},this.getViewport=function(T){return T.copy(Rt)},this.setViewport=function(T,k,z,W){T.isVector4?Rt.set(T.x,T.y,T.z,T.w):Rt.set(T,k,z,W),Ct.viewport(C.copy(Rt).multiplyScalar(j).round())},this.getScissor=function(T){return T.copy(Wt)},this.setScissor=function(T,k,z,W){T.isVector4?Wt.set(T.x,T.y,T.z,T.w):Wt.set(T,k,z,W),Ct.scissor(U.copy(Wt).multiplyScalar(j).round())},this.getScissorTest=function(){return ae},this.setScissorTest=function(T){Ct.setScissorTest(ae=T)},this.setOpaqueSort=function(T){ft=T},this.setTransparentSort=function(T){xt=T},this.getClearColor=function(T){return T.copy(Pt.getClearColor())},this.setClearColor=function(){Pt.setClearColor.apply(Pt,arguments)},this.getClearAlpha=function(){return Pt.getClearAlpha()},this.setClearAlpha=function(){Pt.setClearAlpha.apply(Pt,arguments)},this.clear=function(T=!0,k=!0,z=!0){let W=0;if(T){let N=!1;if(A!==null){const q=A.texture.format;N=q===yl||q===wl||q===Ml}if(N){const q=A.texture.type,at=q===qn||q===Si||q===Os||q===ss||q===vl||q===bl,At=Pt.getClearColor(),Lt=Pt.getClearAlpha(),$t=At.r,Qt=At.g,Dt=At.b;at?(g[0]=$t,g[1]=Qt,g[2]=Dt,g[3]=Lt,B.clearBufferuiv(B.COLOR,0,g)):(_[0]=$t,_[1]=Qt,_[2]=Dt,_[3]=Lt,B.clearBufferiv(B.COLOR,0,_))}else W|=B.COLOR_BUFFER_BIT}k&&(W|=B.DEPTH_BUFFER_BIT),z&&(W|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",H,!1),e.removeEventListener("webglcontextrestored",nt,!1),e.removeEventListener("webglcontextcreationerror",st,!1),Mt.dispose(),ee.dispose(),It.dispose(),S.dispose(),G.dispose(),Q.dispose(),le.dispose(),F.dispose(),St.dispose(),Y.dispose(),Y.removeEventListener("sessionstart",Ge),Y.removeEventListener("sessionend",ke),Je.stop()};function H(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function nt(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const T=ce.autoReset,k=bt.enabled,z=bt.autoUpdate,W=bt.needsUpdate,N=bt.type;dt(),ce.autoReset=T,bt.enabled=k,bt.autoUpdate=z,bt.needsUpdate=W,bt.type=N}function st(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function pt(T){const k=T.target;k.removeEventListener("dispose",pt),Vt(k)}function Vt(T){ie(T),It.remove(T)}function ie(T){const k=It.get(T).programs;k!==void 0&&(k.forEach(function(z){St.releaseProgram(z)}),T.isShaderMaterial&&St.releaseShaderCache(T))}this.renderBufferDirect=function(T,k,z,W,N,q){k===null&&(k=Ht);const at=N.isMesh&&N.matrixWorld.determinant()<0,At=Ft(T,k,z,W,N);Ct.setMaterial(W,at);let Lt=z.index,$t=1;if(W.wireframe===!0){if(Lt=et.getWireframeAttribute(z),Lt===void 0)return;$t=2}const Qt=z.drawRange,Dt=z.attributes.position;let fe=Qt.start*$t,Se=(Qt.start+Qt.count)*$t;q!==null&&(fe=Math.max(fe,q.start*$t),Se=Math.min(Se,(q.start+q.count)*$t)),Lt!==null?(fe=Math.max(fe,0),Se=Math.min(Se,Lt.count)):Dt!=null&&(fe=Math.max(fe,0),Se=Math.min(Se,Dt.count));const Te=Se-fe;if(Te<0||Te===1/0)return;le.setup(N,W,At,z,Lt);let on,pe=wt;if(Lt!==null&&(on=tt.get(Lt),pe=jt,pe.setIndex(on)),N.isMesh)W.wireframe===!0?(Ct.setLineWidth(W.wireframeLinewidth*he()),pe.setMode(B.LINES)):pe.setMode(B.TRIANGLES);else if(N.isLine){let kt=W.linewidth;kt===void 0&&(kt=1),Ct.setLineWidth(kt*he()),N.isLineSegments?pe.setMode(B.LINES):N.isLineLoop?pe.setMode(B.LINE_LOOP):pe.setMode(B.LINE_STRIP)}else N.isPoints?pe.setMode(B.POINTS):N.isSprite&&pe.setMode(B.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)pe.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(te.get("WEBGL_multi_draw"))pe.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const kt=N._multiDrawStarts,In=N._multiDrawCounts,me=N._multiDrawCount,gn=Lt?tt.get(Lt).bytesPerElement:1,Ai=It.get(W).currentProgram.getUniforms();for(let an=0;an<me;an++)Ai.setValue(B,"_gl_DrawID",an),pe.render(kt[an]/gn,In[an])}else if(N.isInstancedMesh)pe.renderInstances(fe,Te,N.count);else if(z.isInstancedBufferGeometry){const kt=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,In=Math.min(z.instanceCount,kt);pe.renderInstances(fe,Te,In)}else pe.render(fe,Te)};function oe(T,k,z){T.transparent===!0&&T.side===Kt&&T.forceSinglePass===!1?(T.side=sn,T.needsUpdate=!0,lt(T,k,z),T.side=li,T.needsUpdate=!0,lt(T,k,z),T.side=Kt):lt(T,k,z)}this.compile=function(T,k,z=null){z===null&&(z=T),p=ee.get(z),p.init(k),M.push(p),z.traverseVisible(function(N){N.isLight&&N.layers.test(k.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),T!==z&&T.traverseVisible(function(N){N.isLight&&N.layers.test(k.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),p.setupLights();const W=new Set;return T.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const q=N.material;if(q)if(Array.isArray(q))for(let at=0;at<q.length;at++){const At=q[at];oe(At,z,N),W.add(At)}else oe(q,z,N),W.add(q)}),M.pop(),p=null,W},this.compileAsync=function(T,k,z=null){const W=this.compile(T,k,z);return new Promise(N=>{function q(){if(W.forEach(function(at){It.get(at).currentProgram.isReady()&&W.delete(at)}),W.size===0){N(T);return}setTimeout(q,10)}te.get("KHR_parallel_shader_compile")!==null?q():setTimeout(q,10)})};let ye=null;function Be(T){ye&&ye(T)}function Ge(){Je.stop()}function ke(){Je.start()}const Je=new rd;Je.setAnimationLoop(Be),typeof self<"u"&&Je.setContext(self),this.setAnimationLoop=function(T){ye=T,Y.setAnimationLoop(T),T===null?Je.stop():Je.start()},Y.addEventListener("sessionstart",Ge),Y.addEventListener("sessionend",ke),this.render=function(T,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(k),k=Y.getCamera()),T.isScene===!0&&T.onBeforeRender(x,T,k,A),p=ee.get(T,M.length),p.init(k),M.push(p),zt.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),J.setFromProjectionMatrix(zt),yt=this.localClippingEnabled,ot=it.init(this.clippingPlanes,yt),m=Mt.get(T,w.length),m.init(),w.push(m),Y.enabled===!0&&Y.isPresenting===!0){const q=x.xr.getDepthSensingMesh();q!==null&&Qe(q,k,-1/0,x.sortObjects)}Qe(T,k,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(ft,xt),Zt=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,Zt&&Pt.addToRenderList(m,T),this.info.render.frame++,ot===!0&&it.beginShadows();const z=p.state.shadowsArray;bt.render(z,T,k),ot===!0&&it.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=m.opaque,N=m.transmissive;if(p.setupLights(),k.isArrayCamera){const q=k.cameras;if(N.length>0)for(let at=0,At=q.length;at<At;at++){const Lt=q[at];O(W,N,T,Lt)}Zt&&Pt.render(T);for(let at=0,At=q.length;at<At;at++){const Lt=q[at];rn(m,T,Lt,Lt.viewport)}}else N.length>0&&O(W,N,T,k),Zt&&Pt.render(T),rn(m,T,k);A!==null&&(L.updateMultisampleRenderTarget(A),L.updateRenderTargetMipmap(A)),T.isScene===!0&&T.onAfterRender(x,T,k),le.resetDefaultState(),v=-1,b=null,M.pop(),M.length>0?(p=M[M.length-1],ot===!0&&it.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,w.pop(),w.length>0?m=w[w.length-1]:m=null};function Qe(T,k,z,W){if(T.visible===!1)return;if(T.layers.test(k.layers)){if(T.isGroup)z=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(k);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||J.intersectsSprite(T)){W&&Yt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(zt);const at=Q.update(T),At=T.material;At.visible&&m.push(T,at,At,z,Yt.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||J.intersectsObject(T))){const at=Q.update(T),At=T.material;if(W&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Yt.copy(T.boundingSphere.center)):(at.boundingSphere===null&&at.computeBoundingSphere(),Yt.copy(at.boundingSphere.center)),Yt.applyMatrix4(T.matrixWorld).applyMatrix4(zt)),Array.isArray(At)){const Lt=at.groups;for(let $t=0,Qt=Lt.length;$t<Qt;$t++){const Dt=Lt[$t],fe=At[Dt.materialIndex];fe&&fe.visible&&m.push(T,at,fe,z,Yt.z,Dt)}}else At.visible&&m.push(T,at,At,z,Yt.z,null)}}const q=T.children;for(let at=0,At=q.length;at<At;at++)Qe(q[at],k,z,W)}function rn(T,k,z,W){const N=T.opaque,q=T.transmissive,at=T.transparent;p.setupLightsView(z),ot===!0&&it.setGlobalState(x.clippingPlanes,z),W&&Ct.viewport(C.copy(W)),N.length>0&&Z(N,k,z),q.length>0&&Z(q,k,z),at.length>0&&Z(at,k,z),Ct.buffers.depth.setTest(!0),Ct.buffers.depth.setMask(!0),Ct.buffers.color.setMask(!0),Ct.setPolygonOffset(!1)}function O(T,k,z,W){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[W.id]===void 0&&(p.state.transmissionRenderTarget[W.id]=new Ti(1,1,{generateMipmaps:!0,type:te.has("EXT_color_buffer_half_float")||te.has("EXT_color_buffer_float")?qs:qn,minFilter:yn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:de.workingColorSpace}));const q=p.state.transmissionRenderTarget[W.id],at=W.viewport||C;q.setSize(at.z,at.w);const At=x.getRenderTarget();x.setRenderTarget(q),x.getClearColor(V),$=x.getClearAlpha(),$<1&&x.setClearColor(16777215,.5),x.clear(),Zt&&Pt.render(z);const Lt=x.toneMapping;x.toneMapping=ai;const $t=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),p.setupLightsView(W),ot===!0&&it.setGlobalState(x.clippingPlanes,W),Z(T,z,W),L.updateMultisampleRenderTarget(q),L.updateRenderTargetMipmap(q),te.has("WEBGL_multisampled_render_to_texture")===!1){let Qt=!1;for(let Dt=0,fe=k.length;Dt<fe;Dt++){const Se=k[Dt],Te=Se.object,on=Se.geometry,pe=Se.material,kt=Se.group;if(pe.side===Kt&&Te.layers.test(W.layers)){const In=pe.side;pe.side=sn,pe.needsUpdate=!0,Tt(Te,z,W,on,pe,kt),pe.side=In,pe.needsUpdate=!0,Qt=!0}}Qt===!0&&(L.updateMultisampleRenderTarget(q),L.updateRenderTargetMipmap(q))}x.setRenderTarget(At),x.setClearColor(V,$),$t!==void 0&&(W.viewport=$t),x.toneMapping=Lt}function Z(T,k,z){const W=k.isScene===!0?k.overrideMaterial:null;for(let N=0,q=T.length;N<q;N++){const at=T[N],At=at.object,Lt=at.geometry,$t=W===null?at.material:W,Qt=at.group;At.layers.test(z.layers)&&Tt(At,k,z,Lt,$t,Qt)}}function Tt(T,k,z,W,N,q){T.onBeforeRender(x,k,z,W,N,q),T.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),N.onBeforeRender(x,k,z,W,T,q),N.transparent===!0&&N.side===Kt&&N.forceSinglePass===!1?(N.side=sn,N.needsUpdate=!0,x.renderBufferDirect(z,k,W,N,T,q),N.side=li,N.needsUpdate=!0,x.renderBufferDirect(z,k,W,N,T,q),N.side=Kt):x.renderBufferDirect(z,k,W,N,T,q),T.onAfterRender(x,k,z,W,N,q)}function lt(T,k,z){k.isScene!==!0&&(k=Ht);const W=It.get(T),N=p.state.lights,q=p.state.shadowsArray,at=N.state.version,At=St.getParameters(T,N.state,q,k,z),Lt=St.getProgramCacheKey(At);let $t=W.programs;W.environment=T.isMeshStandardMaterial?k.environment:null,W.fog=k.fog,W.envMap=(T.isMeshStandardMaterial?G:S).get(T.envMap||W.environment),W.envMapRotation=W.environment!==null&&T.envMap===null?k.environmentRotation:T.envMapRotation,$t===void 0&&(T.addEventListener("dispose",pt),$t=new Map,W.programs=$t);let Qt=$t.get(Lt);if(Qt!==void 0){if(W.currentProgram===Qt&&W.lightsStateVersion===at)return Et(T,At),Qt}else At.uniforms=St.getUniforms(T),T.onBeforeCompile(At,x),Qt=St.acquireProgram(At,Lt),$t.set(Lt,Qt),W.uniforms=At.uniforms;const Dt=W.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Dt.clippingPlanes=it.uniform),Et(T,At),W.needsLights=Gt(T),W.lightsStateVersion=at,W.needsLights&&(Dt.ambientLightColor.value=N.state.ambient,Dt.lightProbe.value=N.state.probe,Dt.directionalLights.value=N.state.directional,Dt.directionalLightShadows.value=N.state.directionalShadow,Dt.spotLights.value=N.state.spot,Dt.spotLightShadows.value=N.state.spotShadow,Dt.rectAreaLights.value=N.state.rectArea,Dt.ltc_1.value=N.state.rectAreaLTC1,Dt.ltc_2.value=N.state.rectAreaLTC2,Dt.pointLights.value=N.state.point,Dt.pointLightShadows.value=N.state.pointShadow,Dt.hemisphereLights.value=N.state.hemi,Dt.directionalShadowMap.value=N.state.directionalShadowMap,Dt.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Dt.spotShadowMap.value=N.state.spotShadowMap,Dt.spotLightMatrix.value=N.state.spotLightMatrix,Dt.spotLightMap.value=N.state.spotLightMap,Dt.pointShadowMap.value=N.state.pointShadowMap,Dt.pointShadowMatrix.value=N.state.pointShadowMatrix),W.currentProgram=Qt,W.uniformsList=null,Qt}function vt(T){if(T.uniformsList===null){const k=T.currentProgram.getUniforms();T.uniformsList=qr.seqWithValue(k.seq,T.uniforms)}return T.uniformsList}function Et(T,k){const z=It.get(T);z.outputColorSpace=k.outputColorSpace,z.batching=k.batching,z.batchingColor=k.batchingColor,z.instancing=k.instancing,z.instancingColor=k.instancingColor,z.instancingMorph=k.instancingMorph,z.skinning=k.skinning,z.morphTargets=k.morphTargets,z.morphNormals=k.morphNormals,z.morphColors=k.morphColors,z.morphTargetsCount=k.morphTargetsCount,z.numClippingPlanes=k.numClippingPlanes,z.numIntersection=k.numClipIntersection,z.vertexAlphas=k.vertexAlphas,z.vertexTangents=k.vertexTangents,z.toneMapping=k.toneMapping}function Ft(T,k,z,W,N){k.isScene!==!0&&(k=Ht),L.resetTextureUnits();const q=k.fog,at=W.isMeshStandardMaterial?k.environment:null,At=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:ls,Lt=(W.isMeshStandardMaterial?G:S).get(W.envMap||at),$t=W.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Qt=!!z.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Dt=!!z.morphAttributes.position,fe=!!z.morphAttributes.normal,Se=!!z.morphAttributes.color;let Te=ai;W.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Te=x.toneMapping);const on=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,pe=on!==void 0?on.length:0,kt=It.get(W),In=p.state.lights;if(ot===!0&&(yt===!0||T!==b)){const un=T===b&&W.id===v;it.setState(W,T,un)}let me=!1;W.version===kt.__version?(kt.needsLights&&kt.lightsStateVersion!==In.state.version||kt.outputColorSpace!==At||N.isBatchedMesh&&kt.batching===!1||!N.isBatchedMesh&&kt.batching===!0||N.isBatchedMesh&&kt.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&kt.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&kt.instancing===!1||!N.isInstancedMesh&&kt.instancing===!0||N.isSkinnedMesh&&kt.skinning===!1||!N.isSkinnedMesh&&kt.skinning===!0||N.isInstancedMesh&&kt.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&kt.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&kt.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&kt.instancingMorph===!1&&N.morphTexture!==null||kt.envMap!==Lt||W.fog===!0&&kt.fog!==q||kt.numClippingPlanes!==void 0&&(kt.numClippingPlanes!==it.numPlanes||kt.numIntersection!==it.numIntersection)||kt.vertexAlphas!==$t||kt.vertexTangents!==Qt||kt.morphTargets!==Dt||kt.morphNormals!==fe||kt.morphColors!==Se||kt.toneMapping!==Te||kt.morphTargetsCount!==pe)&&(me=!0):(me=!0,kt.__version=W.version);let gn=kt.currentProgram;me===!0&&(gn=lt(W,k,N));let Ai=!1,an=!1,us=!1;const Ee=gn.getUniforms(),Rn=kt.uniforms;if(Ct.useProgram(gn.program)&&(Ai=!0,an=!0,us=!0),W.id!==v&&(v=W.id,an=!0),Ai||b!==T){Ct.buffers.depth.getReversed()?(mt.copy(T.projectionMatrix),Wf(mt),Xf(mt),Ee.setValue(B,"projectionMatrix",mt)):Ee.setValue(B,"projectionMatrix",T.projectionMatrix),Ee.setValue(B,"viewMatrix",T.matrixWorldInverse);const Yn=Ee.map.cameraPosition;Yn!==void 0&&Yn.setValue(B,qt.setFromMatrixPosition(T.matrixWorld)),Jt.logarithmicDepthBuffer&&Ee.setValue(B,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&Ee.setValue(B,"isOrthographic",T.isOrthographicCamera===!0),b!==T&&(b=T,an=!0,us=!0)}if(N.isSkinnedMesh){Ee.setOptional(B,N,"bindMatrix"),Ee.setOptional(B,N,"bindMatrixInverse");const un=N.skeleton;un&&(un.boneTexture===null&&un.computeBoneTexture(),Ee.setValue(B,"boneTexture",un.boneTexture,L))}N.isBatchedMesh&&(Ee.setOptional(B,N,"batchingTexture"),Ee.setValue(B,"batchingTexture",N._matricesTexture,L),Ee.setOptional(B,N,"batchingIdTexture"),Ee.setValue(B,"batchingIdTexture",N._indirectTexture,L),Ee.setOptional(B,N,"batchingColorTexture"),N._colorsTexture!==null&&Ee.setValue(B,"batchingColorTexture",N._colorsTexture,L));const fs=z.morphAttributes;if((fs.position!==void 0||fs.normal!==void 0||fs.color!==void 0)&&Nt.update(N,z,gn),(an||kt.receiveShadow!==N.receiveShadow)&&(kt.receiveShadow=N.receiveShadow,Ee.setValue(B,"receiveShadow",N.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(Rn.envMap.value=Lt,Rn.flipEnvMap.value=Lt.isCubeTexture&&Lt.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&k.environment!==null&&(Rn.envMapIntensity.value=k.environmentIntensity),an&&(Ee.setValue(B,"toneMappingExposure",x.toneMappingExposure),kt.needsLights&&Ae(Rn,us),q&&W.fog===!0&&ht.refreshFogUniforms(Rn,q),ht.refreshMaterialUniforms(Rn,W,j,rt,p.state.transmissionRenderTarget[T.id]),qr.upload(B,vt(kt),Rn,L)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(qr.upload(B,vt(kt),Rn,L),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&Ee.setValue(B,"center",N.center),Ee.setValue(B,"modelViewMatrix",N.modelViewMatrix),Ee.setValue(B,"normalMatrix",N.normalMatrix),Ee.setValue(B,"modelMatrix",N.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const un=W.uniformsGroups;for(let Yn=0,jn=un.length;Yn<jn;Yn++){const Gl=un[Yn];F.update(Gl,gn),F.bind(Gl,gn)}}return gn}function Ae(T,k){T.ambientLightColor.needsUpdate=k,T.lightProbe.needsUpdate=k,T.directionalLights.needsUpdate=k,T.directionalLightShadows.needsUpdate=k,T.pointLights.needsUpdate=k,T.pointLightShadows.needsUpdate=k,T.spotLights.needsUpdate=k,T.spotLightShadows.needsUpdate=k,T.rectAreaLights.needsUpdate=k,T.hemisphereLights.needsUpdate=k}function Gt(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return y},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(T,k,z){It.get(T.texture).__webglTexture=k,It.get(T.depthTexture).__webglTexture=z;const W=It.get(T);W.__hasExternalTextures=!0,W.__autoAllocateDepthBuffer=z===void 0,W.__autoAllocateDepthBuffer||te.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,k){const z=It.get(T);z.__webglFramebuffer=k,z.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(T,k=0,z=0){A=T,y=k,R=z;let W=!0,N=null,q=!1,at=!1;if(T){const Lt=It.get(T);if(Lt.__useDefaultFramebuffer!==void 0)Ct.bindFramebuffer(B.FRAMEBUFFER,null),W=!1;else if(Lt.__webglFramebuffer===void 0)L.setupRenderTarget(T);else if(Lt.__hasExternalTextures)L.rebindTextures(T,It.get(T.texture).__webglTexture,It.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Dt=T.depthTexture;if(Lt.__boundDepthTexture!==Dt){if(Dt!==null&&It.has(Dt)&&(T.width!==Dt.image.width||T.height!==Dt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");L.setupDepthRenderbuffer(T)}}const $t=T.texture;($t.isData3DTexture||$t.isDataArrayTexture||$t.isCompressedArrayTexture)&&(at=!0);const Qt=It.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Qt[k])?N=Qt[k][z]:N=Qt[k],q=!0):T.samples>0&&L.useMultisampledRTT(T)===!1?N=It.get(T).__webglMultisampledFramebuffer:Array.isArray(Qt)?N=Qt[z]:N=Qt,C.copy(T.viewport),U.copy(T.scissor),I=T.scissorTest}else C.copy(Rt).multiplyScalar(j).floor(),U.copy(Wt).multiplyScalar(j).floor(),I=ae;if(Ct.bindFramebuffer(B.FRAMEBUFFER,N)&&W&&Ct.drawBuffers(T,N),Ct.viewport(C),Ct.scissor(U),Ct.setScissorTest(I),q){const Lt=It.get(T.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+k,Lt.__webglTexture,z)}else if(at){const Lt=It.get(T.texture),$t=k||0;B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,Lt.__webglTexture,z||0,$t)}v=-1},this.readRenderTargetPixels=function(T,k,z,W,N,q,at){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let At=It.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&at!==void 0&&(At=At[at]),At){Ct.bindFramebuffer(B.FRAMEBUFFER,At);try{const Lt=T.texture,$t=Lt.format,Qt=Lt.type;if(!Jt.textureFormatReadable($t)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Jt.textureTypeReadable(Qt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=T.width-W&&z>=0&&z<=T.height-N&&B.readPixels(k,z,W,N,Xt.convert($t),Xt.convert(Qt),q)}finally{const Lt=A!==null?It.get(A).__webglFramebuffer:null;Ct.bindFramebuffer(B.FRAMEBUFFER,Lt)}}},this.readRenderTargetPixelsAsync=async function(T,k,z,W,N,q,at){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let At=It.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&at!==void 0&&(At=At[at]),At){const Lt=T.texture,$t=Lt.format,Qt=Lt.type;if(!Jt.textureFormatReadable($t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Jt.textureTypeReadable(Qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(k>=0&&k<=T.width-W&&z>=0&&z<=T.height-N){Ct.bindFramebuffer(B.FRAMEBUFFER,At);const Dt=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,Dt),B.bufferData(B.PIXEL_PACK_BUFFER,q.byteLength,B.STREAM_READ),B.readPixels(k,z,W,N,Xt.convert($t),Xt.convert(Qt),0);const fe=A!==null?It.get(A).__webglFramebuffer:null;Ct.bindFramebuffer(B.FRAMEBUFFER,fe);const Se=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await Vf(B,Se,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,Dt),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,q),B.deleteBuffer(Dt),B.deleteSync(Se),q}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,k=null,z=0){T.isTexture!==!0&&(Rs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),k=arguments[0]||null,T=arguments[1]);const W=Math.pow(2,-z),N=Math.floor(T.image.width*W),q=Math.floor(T.image.height*W),at=k!==null?k.x:0,At=k!==null?k.y:0;L.setTexture2D(T,0),B.copyTexSubImage2D(B.TEXTURE_2D,z,0,0,at,At,N,q),Ct.unbindTexture()},this.copyTextureToTexture=function(T,k,z=null,W=null,N=0){T.isTexture!==!0&&(Rs("WebGLRenderer: copyTextureToTexture function signature has changed."),W=arguments[0]||null,T=arguments[1],k=arguments[2],N=arguments[3]||0,z=null);let q,at,At,Lt,$t,Qt,Dt,fe,Se;const Te=T.isCompressedTexture?T.mipmaps[N]:T.image;z!==null?(q=z.max.x-z.min.x,at=z.max.y-z.min.y,At=z.isBox3?z.max.z-z.min.z:1,Lt=z.min.x,$t=z.min.y,Qt=z.isBox3?z.min.z:0):(q=Te.width,at=Te.height,At=Te.depth||1,Lt=0,$t=0,Qt=0),W!==null?(Dt=W.x,fe=W.y,Se=W.z):(Dt=0,fe=0,Se=0);const on=Xt.convert(k.format),pe=Xt.convert(k.type);let kt;k.isData3DTexture?(L.setTexture3D(k,0),kt=B.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(L.setTexture2DArray(k,0),kt=B.TEXTURE_2D_ARRAY):(L.setTexture2D(k,0),kt=B.TEXTURE_2D),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,k.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,k.unpackAlignment);const In=B.getParameter(B.UNPACK_ROW_LENGTH),me=B.getParameter(B.UNPACK_IMAGE_HEIGHT),gn=B.getParameter(B.UNPACK_SKIP_PIXELS),Ai=B.getParameter(B.UNPACK_SKIP_ROWS),an=B.getParameter(B.UNPACK_SKIP_IMAGES);B.pixelStorei(B.UNPACK_ROW_LENGTH,Te.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Te.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,Lt),B.pixelStorei(B.UNPACK_SKIP_ROWS,$t),B.pixelStorei(B.UNPACK_SKIP_IMAGES,Qt);const us=T.isDataArrayTexture||T.isData3DTexture,Ee=k.isDataArrayTexture||k.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){const Rn=It.get(T),fs=It.get(k),un=It.get(Rn.__renderTarget),Yn=It.get(fs.__renderTarget);Ct.bindFramebuffer(B.READ_FRAMEBUFFER,un.__webglFramebuffer),Ct.bindFramebuffer(B.DRAW_FRAMEBUFFER,Yn.__webglFramebuffer);for(let jn=0;jn<At;jn++)us&&B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,It.get(T).__webglTexture,N,Qt+jn),T.isDepthTexture?(Ee&&B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,It.get(k).__webglTexture,N,Se+jn),B.blitFramebuffer(Lt,$t,q,at,Dt,fe,q,at,B.DEPTH_BUFFER_BIT,B.NEAREST)):Ee?B.copyTexSubImage3D(kt,N,Dt,fe,Se+jn,Lt,$t,q,at):B.copyTexSubImage2D(kt,N,Dt,fe,Se+jn,Lt,$t,q,at);Ct.bindFramebuffer(B.READ_FRAMEBUFFER,null),Ct.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else Ee?T.isDataTexture||T.isData3DTexture?B.texSubImage3D(kt,N,Dt,fe,Se,q,at,At,on,pe,Te.data):k.isCompressedArrayTexture?B.compressedTexSubImage3D(kt,N,Dt,fe,Se,q,at,At,on,Te.data):B.texSubImage3D(kt,N,Dt,fe,Se,q,at,At,on,pe,Te):T.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,N,Dt,fe,q,at,on,pe,Te.data):T.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,N,Dt,fe,Te.width,Te.height,on,Te.data):B.texSubImage2D(B.TEXTURE_2D,N,Dt,fe,q,at,on,pe,Te);B.pixelStorei(B.UNPACK_ROW_LENGTH,In),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,me),B.pixelStorei(B.UNPACK_SKIP_PIXELS,gn),B.pixelStorei(B.UNPACK_SKIP_ROWS,Ai),B.pixelStorei(B.UNPACK_SKIP_IMAGES,an),N===0&&k.generateMipmaps&&B.generateMipmap(kt),Ct.unbindTexture()},this.copyTextureToTexture3D=function(T,k,z=null,W=null,N=0){return T.isTexture!==!0&&(Rs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),z=arguments[0]||null,W=arguments[1]||null,T=arguments[2],k=arguments[3],N=arguments[4]||0),Rs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,k,z,W,N)},this.initRenderTarget=function(T){It.get(T).__webglFramebuffer===void 0&&L.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?L.setTextureCube(T,0):T.isData3DTexture?L.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?L.setTexture2DArray(T,0):L.setTexture2D(T,0),Ct.unbindTexture()},this.resetState=function(){y=0,R=0,A=null,Ct.reset(),le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Vn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=de._getDrawingBufferColorSpace(t),e.unpackColorSpace=de._getUnpackColorSpace()}}class Cl{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ot(t),this.density=e}clone(){return new Cl(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class yi{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ot(t),this.near=e,this.far=n}clone(){return new yi(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class ex extends Ne{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new En,this.environmentIntensity=1,this.environmentRotation=new En,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class nx{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=il,this.updateRanges=[],this.version=0,this.uuid=Wn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Wn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Wn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const tn=new D;class to{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)tn.fromBufferAttribute(this,e),tn.applyMatrix4(t),this.setXYZ(e,tn.x,tn.y,tn.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)tn.fromBufferAttribute(this,e),tn.applyNormalMatrix(t),this.setXYZ(e,tn.x,tn.y,tn.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)tn.fromBufferAttribute(this,e),tn.transformDirection(t),this.setXYZ(e,tn.x,tn.y,tn.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Pn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=_e(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=_e(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=_e(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=_e(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=_e(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Pn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Pn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Pn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Pn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=_e(e,this.array),n=_e(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=_e(e,this.array),n=_e(n,this.array),i=_e(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=_e(e,this.array),n=_e(n,this.array),i=_e(i,this.array),r=_e(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new je(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new to(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class $r extends di{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new Ot(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Gi;const xs=new D,Vi=new D,Wi=new D,Xi=new _t,vs=new _t,ud=new we,br=new D,bs=new D,Mr=new D,Bc=new _t,$o=new _t,zc=new _t;class Yo extends Ne{constructor(t=new $r){if(super(),this.isSprite=!0,this.type="Sprite",Gi===void 0){Gi=new Pe;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new nx(e,5);Gi.setIndex([0,1,2,0,2,3]),Gi.setAttribute("position",new to(n,3,0,!1)),Gi.setAttribute("uv",new to(n,2,3,!1))}this.geometry=Gi,this.material=t,this.center=new _t(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Vi.setFromMatrixScale(this.matrixWorld),ud.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Wi.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Vi.multiplyScalar(-Wi.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const a=this.center;wr(br.set(-.5,-.5,0),Wi,a,Vi,i,r),wr(bs.set(.5,-.5,0),Wi,a,Vi,i,r),wr(Mr.set(.5,.5,0),Wi,a,Vi,i,r),Bc.set(0,0),$o.set(1,0),zc.set(1,1);let o=t.ray.intersectTriangle(br,bs,Mr,!1,xs);if(o===null&&(wr(bs.set(-.5,.5,0),Wi,a,Vi,i,r),$o.set(0,1),o=t.ray.intersectTriangle(br,Mr,bs,!1,xs),o===null))return;const l=t.ray.origin.distanceTo(xs);l<t.near||l>t.far||e.push({distance:l,point:xs.clone(),uv:mn.getInterpolation(xs,br,bs,Mr,Bc,$o,zc,new _t),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function wr(s,t,e,n,i,r){Xi.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(vs.x=r*Xi.x-i*Xi.y,vs.y=i*Xi.x+r*Xi.y):vs.copy(Xi),s.copy(t),s.x+=vs.x,s.y+=vs.y,s.applyMatrix4(ud)}class fd extends di{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Ot(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Hc=new we,ol=new Tl,yr=new ho,Sr=new D;class ix extends Ne{constructor(t=new Pe,e=new fd){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),yr.copy(n.boundingSphere),yr.applyMatrix4(i),yr.radius+=r,t.ray.intersectsSphere(yr)===!1)return;Hc.copy(i).invert(),ol.copy(t.ray).applyMatrix4(Hc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){const u=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=u,_=f;g<_;g++){const m=c.getX(g);Sr.fromBufferAttribute(d,m),Gc(Sr,m,l,i,t,e,this)}}else{const u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let g=u,_=f;g<_;g++)Sr.fromBufferAttribute(d,g),Gc(Sr,g,l,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Gc(s,t,e,n,i,r,a){const o=ol.distanceSqToPoint(s);if(o<e){const l=new D;ol.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class Mn extends Ke{constructor(t,e,n,i,r,a,o,l,c){super(t,e,n,i,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Un{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);const h=n[i],u=n[i+1]-h,f=(a-h)/u;return(i+f)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const a=this.getPoint(i),o=this.getPoint(r),l=e||(a.isVector2?new _t:new D);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new D,i=[],r=[],a=[],o=new D,l=new we;for(let f=0;f<=t;f++){const g=f/t;i[f]=this.getTangentAt(g,new D)}r[0]=new D,a[0]=new D;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),d=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Ye(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(i[f],r[f])}if(e===!0){let f=Math.acos(Ye(r[0].dot(r[t]),-1,1));f/=t,i[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(i[g],f*g)),a[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Ll extends Un{constructor(t=0,e=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new _t){const n=e,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class sx extends Ll{constructor(t,e,n,i,r,a){super(t,e,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Pl(){let s=0,t=0,e=0,n=0;function i(r,a,o,l){s=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){i(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,d){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+d)+(l-o)/d;u*=h,f*=h,i(a,o,u,f)},calc:function(r){const a=r*r,o=a*r;return s+t*r+e*a+n*o}}}const Tr=new D,jo=new Pl,Zo=new Pl,Ko=new Pl;class rx extends Un{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new D){const n=e,i=this.points,r=i.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%r]:(Tr.subVectors(i[0],i[1]).add(i[0]),c=Tr);const d=i[o%r],u=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(Tr.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Tr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),jo.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,g,_,m),Zo.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,g,_,m),Ko.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(jo.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),Zo.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),Ko.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(jo.calc(l),Zo.calc(l),Ko.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new D().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Vc(s,t,e,n,i){const r=(n-t)*.5,a=(i-e)*.5,o=s*s,l=s*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*s+e}function ox(s,t){const e=1-s;return e*e*t}function ax(s,t){return 2*(1-s)*s*t}function lx(s,t){return s*s*t}function Us(s,t,e,n){return ox(s,t)+ax(s,e)+lx(s,n)}function cx(s,t){const e=1-s;return e*e*e*t}function hx(s,t){const e=1-s;return 3*e*e*s*t}function dx(s,t){return 3*(1-s)*s*s*t}function ux(s,t){return s*s*s*t}function Ds(s,t,e,n,i){return cx(s,t)+hx(s,e)+dx(s,n)+ux(s,i)}class pd extends Un{constructor(t=new _t,e=new _t,n=new _t,i=new _t){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new _t){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ds(t,i.x,r.x,a.x,o.x),Ds(t,i.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class fx extends Un{constructor(t=new D,e=new D,n=new D,i=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new D){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ds(t,i.x,r.x,a.x,o.x),Ds(t,i.y,r.y,a.y,o.y),Ds(t,i.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class md extends Un{constructor(t=new _t,e=new _t){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new _t){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new _t){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class px extends Un{constructor(t=new D,e=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new D){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new D){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class gd extends Un{constructor(t=new _t,e=new _t,n=new _t){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new _t){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(Us(t,i.x,r.x,a.x),Us(t,i.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class mx extends Un{constructor(t=new D,e=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new D){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(Us(t,i.x,r.x,a.x),Us(t,i.y,r.y,a.y),Us(t,i.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class _d extends Un{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new _t){const n=e,i=this.points,r=(i.length-1)*t,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],d=i[a>i.length-3?i.length-1:a+2];return n.set(Vc(o,l.x,c.x,h.x,d.x),Vc(o,l.y,c.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new _t().fromArray(i))}return this}}var Wc=Object.freeze({__proto__:null,ArcCurve:sx,CatmullRomCurve3:rx,CubicBezierCurve:pd,CubicBezierCurve3:fx,EllipseCurve:Ll,LineCurve:md,LineCurve3:px,QuadraticBezierCurve:gd,QuadraticBezierCurve3:mx,SplineCurve:_d});class gx extends Un{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Wc[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const a=i[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const a=r[i],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new Wc[i.type]().fromJSON(i))}return this}}class al extends gx{constructor(t){super(),this.type="Path",this.currentPoint=new _t,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new md(this.currentPoint.clone(),new _t(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const r=new gd(this.currentPoint.clone(),new _t(t,e),new _t(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,a){const o=new pd(this.currentPoint.clone(),new _t(t,e),new _t(n,i),new _t(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new _d(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,i,r,a),this}absarc(t,e,n,i,r,a){return this.absellipse(t,e,n,n,i,r,a),this}ellipse(t,e,n,i,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,r,a,o,l),this}absellipse(t,e,n,i,r,a,o,l){const c=new Ll(t,e,n,i,r,a,o,l);if(this.curves.length>0){const d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Is extends Pe{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],a=[],o=[],l=[],c=new D,h=new _t;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){const f=n+d/e*i;c.x=t*Math.cos(f),c.y=t*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/t+1)/2,h.y=(a[u+1]/t+1)/2,l.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new ue(a,3)),this.setAttribute("normal",new ue(o,3)),this.setAttribute("uv",new ue(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Is(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class be extends Pe{constructor(t=1,e=1,n=1,i=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],d=[],u=[],f=[];let g=0;const _=[],m=n/2;let p=0;w(),a===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new ue(d,3)),this.setAttribute("normal",new ue(u,3)),this.setAttribute("uv",new ue(f,2));function w(){const x=new D,E=new D;let y=0;const R=(e-t)/n;for(let A=0;A<=r;A++){const v=[],b=A/r,C=b*(e-t)+t;for(let U=0;U<=i;U++){const I=U/i,V=I*l+o,$=Math.sin(V),X=Math.cos(V);E.x=C*$,E.y=-b*n+m,E.z=C*X,d.push(E.x,E.y,E.z),x.set($,R,X).normalize(),u.push(x.x,x.y,x.z),f.push(I,1-b),v.push(g++)}_.push(v)}for(let A=0;A<i;A++)for(let v=0;v<r;v++){const b=_[v][A],C=_[v+1][A],U=_[v+1][A+1],I=_[v][A+1];(t>0||v!==0)&&(h.push(b,C,I),y+=3),(e>0||v!==r-1)&&(h.push(C,U,I),y+=3)}c.addGroup(p,y,0),p+=y}function M(x){const E=g,y=new _t,R=new D;let A=0;const v=x===!0?t:e,b=x===!0?1:-1;for(let U=1;U<=i;U++)d.push(0,m*b,0),u.push(0,b,0),f.push(.5,.5),g++;const C=g;for(let U=0;U<=i;U++){const V=U/i*l+o,$=Math.cos(V),X=Math.sin(V);R.x=v*X,R.y=m*b,R.z=v*$,d.push(R.x,R.y,R.z),u.push(0,b,0),y.x=$*.5+.5,y.y=X*.5*b+.5,f.push(y.x,y.y),g++}for(let U=0;U<i;U++){const I=E+U,V=C+U;x===!0?h.push(V,V+1,I):h.push(V+1,V,I),A+=3}c.addGroup(p,A,x===!0?1:2),p+=A}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new be(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Hn extends be{constructor(t=1,e=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new Hn(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ul extends Pe{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const r=[],a=[];o(i),c(n),h(),this.setAttribute("position",new ue(r,3)),this.setAttribute("normal",new ue(r.slice(),3)),this.setAttribute("uv",new ue(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(w){const M=new D,x=new D,E=new D;for(let y=0;y<e.length;y+=3)f(e[y+0],M),f(e[y+1],x),f(e[y+2],E),l(M,x,E,w)}function l(w,M,x,E){const y=E+1,R=[];for(let A=0;A<=y;A++){R[A]=[];const v=w.clone().lerp(x,A/y),b=M.clone().lerp(x,A/y),C=y-A;for(let U=0;U<=C;U++)U===0&&A===y?R[A][U]=v:R[A][U]=v.clone().lerp(b,U/C)}for(let A=0;A<y;A++)for(let v=0;v<2*(y-A)-1;v++){const b=Math.floor(v/2);v%2===0?(u(R[A][b+1]),u(R[A+1][b]),u(R[A][b])):(u(R[A][b+1]),u(R[A+1][b+1]),u(R[A+1][b]))}}function c(w){const M=new D;for(let x=0;x<r.length;x+=3)M.x=r[x+0],M.y=r[x+1],M.z=r[x+2],M.normalize().multiplyScalar(w),r[x+0]=M.x,r[x+1]=M.y,r[x+2]=M.z}function h(){const w=new D;for(let M=0;M<r.length;M+=3){w.x=r[M+0],w.y=r[M+1],w.z=r[M+2];const x=m(w)/2/Math.PI+.5,E=p(w)/Math.PI+.5;a.push(x,1-E)}g(),d()}function d(){for(let w=0;w<a.length;w+=6){const M=a[w+0],x=a[w+2],E=a[w+4],y=Math.max(M,x,E),R=Math.min(M,x,E);y>.9&&R<.1&&(M<.2&&(a[w+0]+=1),x<.2&&(a[w+2]+=1),E<.2&&(a[w+4]+=1))}}function u(w){r.push(w.x,w.y,w.z)}function f(w,M){const x=w*3;M.x=t[x+0],M.y=t[x+1],M.z=t[x+2]}function g(){const w=new D,M=new D,x=new D,E=new D,y=new _t,R=new _t,A=new _t;for(let v=0,b=0;v<r.length;v+=9,b+=6){w.set(r[v+0],r[v+1],r[v+2]),M.set(r[v+3],r[v+4],r[v+5]),x.set(r[v+6],r[v+7],r[v+8]),y.set(a[b+0],a[b+1]),R.set(a[b+2],a[b+3]),A.set(a[b+4],a[b+5]),E.copy(w).add(M).add(x).divideScalar(3);const C=m(E);_(y,b+0,w,C),_(R,b+2,M,C),_(A,b+4,x,C)}}function _(w,M,x,E){E<0&&w.x===1&&(a[M]=w.x-1),x.x===0&&x.z===0&&(a[M]=E/2/Math.PI+.5)}function m(w){return Math.atan2(w.z,-w.x)}function p(w){return Math.atan2(-w.y,Math.sqrt(w.x*w.x+w.z*w.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ul(t.vertices,t.indices,t.radius,t.details)}}class Dl extends Ul{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Dl(t.radius,t.detail)}}class xd extends al{constructor(t){super(t),this.uuid=Wn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new al().fromJSON(i))}return this}}const _x={triangulate:function(s,t,e=2){const n=t&&t.length,i=n?t[0]*e:s.length;let r=vd(s,0,i,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c,h,d,u,f;if(n&&(r=wx(s,t,r,e)),s.length>80*e){o=c=s[0],l=h=s[1];for(let g=e;g<i;g+=e)d=s[g],u=s[g+1],d<o&&(o=d),u<l&&(l=u),d>c&&(c=d),u>h&&(h=u);f=Math.max(c-o,h-l),f=f!==0?32767/f:0}return zs(r,a,e,o,l,f,0),a}};function vd(s,t,e,n,i){let r,a;if(i===Dx(s,t,e,n)>0)for(r=t;r<e;r+=n)a=Xc(r,s[r],s[r+1],a);else for(r=e-n;r>=t;r-=n)a=Xc(r,s[r],s[r+1],a);return a&&fo(a,a.next)&&(Gs(a),a=a.next),a}function Ei(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(fo(e,e.next)||Le(e.prev,e,e.next)===0)){if(Gs(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function zs(s,t,e,n,i,r,a){if(!s)return;!a&&r&&Ax(s,n,i,r);let o=s,l,c;for(;s.prev!==s.next;){if(l=s.prev,c=s.next,r?vx(s,n,i,r):xx(s)){t.push(l.i/e|0),t.push(s.i/e|0),t.push(c.i/e|0),Gs(s),s=c.next,o=c.next;continue}if(s=c,s===o){a?a===1?(s=bx(Ei(s),t,e),zs(s,t,e,n,i,r,2)):a===2&&Mx(s,t,e,n,i,r):zs(Ei(s),t,e,n,i,r,1);break}}}function xx(s){const t=s.prev,e=s,n=s.next;if(Le(t,e,n)>=0)return!1;const i=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=i<r?i<a?i:a:r<a?r:a,d=o<l?o<c?o:c:l<c?l:c,u=i>r?i>a?i:a:r>a?r:a,f=o>l?o>c?o:c:l>c?l:c;let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=u&&g.y>=d&&g.y<=f&&ji(i,o,r,l,a,c,g.x,g.y)&&Le(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function vx(s,t,e,n){const i=s.prev,r=s,a=s.next;if(Le(i,r,a)>=0)return!1;const o=i.x,l=r.x,c=a.x,h=i.y,d=r.y,u=a.y,f=o<l?o<c?o:c:l<c?l:c,g=h<d?h<u?h:u:d<u?d:u,_=o>l?o>c?o:c:l>c?l:c,m=h>d?h>u?h:u:d>u?d:u,p=ll(f,g,t,e,n),w=ll(_,m,t,e,n);let M=s.prevZ,x=s.nextZ;for(;M&&M.z>=p&&x&&x.z<=w;){if(M.x>=f&&M.x<=_&&M.y>=g&&M.y<=m&&M!==i&&M!==a&&ji(o,h,l,d,c,u,M.x,M.y)&&Le(M.prev,M,M.next)>=0||(M=M.prevZ,x.x>=f&&x.x<=_&&x.y>=g&&x.y<=m&&x!==i&&x!==a&&ji(o,h,l,d,c,u,x.x,x.y)&&Le(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;M&&M.z>=p;){if(M.x>=f&&M.x<=_&&M.y>=g&&M.y<=m&&M!==i&&M!==a&&ji(o,h,l,d,c,u,M.x,M.y)&&Le(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;x&&x.z<=w;){if(x.x>=f&&x.x<=_&&x.y>=g&&x.y<=m&&x!==i&&x!==a&&ji(o,h,l,d,c,u,x.x,x.y)&&Le(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function bx(s,t,e){let n=s;do{const i=n.prev,r=n.next.next;!fo(i,r)&&bd(i,n,n.next,r)&&Hs(i,r)&&Hs(r,i)&&(t.push(i.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),Gs(n),Gs(n.next),n=s=r),n=n.next}while(n!==s);return Ei(n)}function Mx(s,t,e,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Lx(a,o)){let l=Md(a,o);a=Ei(a,a.next),l=Ei(l,l.next),zs(a,t,e,n,i,r,0),zs(l,t,e,n,i,r,0);return}o=o.next}a=a.next}while(a!==s)}function wx(s,t,e,n){const i=[];let r,a,o,l,c;for(r=0,a=t.length;r<a;r++)o=t[r]*n,l=r<a-1?t[r+1]*n:s.length,c=vd(s,o,l,n,!1),c===c.next&&(c.steiner=!0),i.push(Cx(c));for(i.sort(yx),r=0;r<i.length;r++)e=Sx(i[r],e);return e}function yx(s,t){return s.x-t.x}function Sx(s,t){const e=Tx(s,t);if(!e)return t;const n=Md(e,s);return Ei(n,n.next),Ei(e,e.next)}function Tx(s,t){let e=t,n=-1/0,i;const r=s.x,a=s.y;do{if(a<=e.y&&a>=e.next.y&&e.next.y!==e.y){const u=e.x+(a-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=r&&u>n&&(n=u,i=e.x<e.next.x?e:e.next,u===r))return i}e=e.next}while(e!==t);if(!i)return null;const o=i,l=i.x,c=i.y;let h=1/0,d;e=i;do r>=e.x&&e.x>=l&&r!==e.x&&ji(a<c?r:n,a,l,c,a<c?n:r,a,e.x,e.y)&&(d=Math.abs(a-e.y)/(r-e.x),Hs(e,s)&&(d<h||d===h&&(e.x>i.x||e.x===i.x&&Ex(i,e)))&&(i=e,h=d)),e=e.next;while(e!==o);return i}function Ex(s,t){return Le(s.prev,s,t.prev)<0&&Le(t.next,s,s.next)<0}function Ax(s,t,e,n){let i=s;do i.z===0&&(i.z=ll(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,Rx(i)}function Rx(s){let t,e,n,i,r,a,o,l,c=1;do{for(e=s,s=null,r=null,a=0;e;){for(a++,n=e,o=0,t=0;t<c&&(o++,n=n.nextZ,!!n);t++);for(l=c;o>0||l>0&&n;)o!==0&&(l===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,o--):(i=n,n=n.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;e=n}r.nextZ=null,c*=2}while(a>1);return s}function ll(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function Cx(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function ji(s,t,e,n,i,r,a,o){return(i-a)*(t-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(i-a)*(n-o)}function Lx(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!Px(s,t)&&(Hs(s,t)&&Hs(t,s)&&Ux(s,t)&&(Le(s.prev,s,t.prev)||Le(s,t.prev,t))||fo(s,t)&&Le(s.prev,s,s.next)>0&&Le(t.prev,t,t.next)>0)}function Le(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function fo(s,t){return s.x===t.x&&s.y===t.y}function bd(s,t,e,n){const i=Ar(Le(s,t,e)),r=Ar(Le(s,t,n)),a=Ar(Le(e,n,s)),o=Ar(Le(e,n,t));return!!(i!==r&&a!==o||i===0&&Er(s,e,t)||r===0&&Er(s,n,t)||a===0&&Er(e,s,n)||o===0&&Er(e,t,n))}function Er(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function Ar(s){return s>0?1:s<0?-1:0}function Px(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&bd(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function Hs(s,t){return Le(s.prev,s,s.next)<0?Le(s,t,s.next)>=0&&Le(s,s.prev,t)>=0:Le(s,t,s.prev)<0||Le(s,s.next,t)<0}function Ux(s,t){let e=s,n=!1;const i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function Md(s,t){const e=new cl(s.i,s.x,s.y),n=new cl(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Xc(s,t,e,n){const i=new cl(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Gs(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function cl(s,t,e){this.i=s,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Dx(s,t,e,n){let i=0;for(let r=t,a=e-n;r<e;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}class ks{static area(t){const e=t.length;let n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return ks.area(t)<0}static triangulateShape(t,e){const n=[],i=[],r=[];qc(t),$c(n,t);let a=t.length;e.forEach(qc);for(let l=0;l<e.length;l++)i.push(a),a+=e[l].length,$c(n,e[l]);const o=_x.triangulate(n,i);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function qc(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function $c(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class Il extends Pe{constructor(t=.5,e=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],c=[],h=[];let d=t;const u=(e-t)/i,f=new D,g=new _t;for(let _=0;_<=i;_++){for(let m=0;m<=n;m++){const p=r+m/n*a;f.x=d*Math.cos(p),f.y=d*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,h.push(g.x,g.y)}d+=u}for(let _=0;_<i;_++){const m=_*(n+1);for(let p=0;p<n;p++){const w=p+m,M=w,x=w+n+1,E=w+n+2,y=w+1;o.push(M,x,y),o.push(x,E,y)}}this.setIndex(o),this.setAttribute("position",new ue(l,3)),this.setAttribute("normal",new ue(c,3)),this.setAttribute("uv",new ue(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Il(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class kl extends Pe{constructor(t=new xd([new _t(0,.5),new _t(-.5,-.5),new _t(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],i=[],r=[],a=[];let o=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new ue(i,3)),this.setAttribute("normal",new ue(r,3)),this.setAttribute("uv",new ue(a,2));function c(h){const d=i.length/3,u=h.extractPoints(e);let f=u.shape;const g=u.holes;ks.isClockWise(f)===!1&&(f=f.reverse());for(let m=0,p=g.length;m<p;m++){const w=g[m];ks.isClockWise(w)===!0&&(g[m]=w.reverse())}const _=ks.triangulateShape(f,g);for(let m=0,p=g.length;m<p;m++){const w=g[m];f=f.concat(w)}for(let m=0,p=f.length;m<p;m++){const w=f[m];i.push(w.x,w.y,0),r.push(0,0,1),a.push(w.x,w.y)}for(let m=0,p=_.length;m<p;m++){const w=_[m],M=w[0]+d,x=w[1]+d,E=w[2]+d;n.push(M,x,E),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return Ix(e,t)}static fromJSON(t,e){const n=[];for(let i=0,r=t.shapes.length;i<r;i++){const a=e[t.shapes[i]];n.push(a)}return new kl(n,t.curveSegments)}}function Ix(s,t){if(t.shapes=[],Array.isArray(s))for(let e=0,n=s.length;e<n;e++){const i=s[e];t.shapes.push(i.uuid)}else t.shapes.push(s.uuid);return t}class Nl extends Pe{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],d=new D,u=new D,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const w=[],M=p/n;let x=0;p===0&&a===0?x=.5/e:p===n&&l===Math.PI&&(x=-.5/e);for(let E=0;E<=e;E++){const y=E/e;d.x=-t*Math.cos(i+y*r)*Math.sin(a+M*o),d.y=t*Math.cos(a+M*o),d.z=t*Math.sin(i+y*r)*Math.sin(a+M*o),g.push(d.x,d.y,d.z),u.copy(d).normalize(),_.push(u.x,u.y,u.z),m.push(y+x,1-M),w.push(c++)}h.push(w)}for(let p=0;p<n;p++)for(let w=0;w<e;w++){const M=h[p][w+1],x=h[p][w],E=h[p+1][w],y=h[p+1][w+1];(p!==0||a>0)&&f.push(M,x,y),(p!==n-1||l<Math.PI)&&f.push(x,E,y)}this.setIndex(f),this.setAttribute("position",new ue(g,3)),this.setAttribute("normal",new ue(_,3)),this.setAttribute("uv",new ue(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Nl(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class kx extends di{static get type(){return"MeshPhongMaterial"}constructor(t){super(),this.isMeshPhongMaterial=!0,this.color=new Ot(16777215),this.specular=new Ot(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Sl,this.normalScale=new _t(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new En,this.combine=ao,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ct extends di{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Sl,this.normalScale=new _t(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new En,this.combine=ao,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}const Yc={enabled:!1,files:{},add:function(s,t){this.enabled!==!1&&(this.files[s]=t)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class Nx{constructor(t,e,n){const i=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){const d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){const f=c[d],g=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}}const Fx=new Nx;class Fl{constructor(t){this.manager=t!==void 0?t:Fx,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}Fl.DEFAULT_MATERIAL_NAME="__DEFAULT";class Ox extends Fl{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,a=Yc.get(t);if(a!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(a),r.manager.itemEnd(t)},0),a;const o=Bs("img");function l(){h(),Yc.add(t,this),e&&e(this),r.manager.itemEnd(t)}function c(d){h(),i&&i(d),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(t),o.src=t,o}}class wd extends Fl{constructor(t){super(t)}load(t,e,n,i){const r=new Ke,a=new Ox(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(t,function(o){r.image=o,r.needsUpdate=!0,e!==void 0&&e(r)},n,i),r}}class po extends Ne{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ot(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Ms extends po{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ne.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ot(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Jo=new we,jc=new D,Zc=new D;class yd{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new _t(512,512),this.map=null,this.mapPass=null,this.matrix=new we,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Al,this._frameExtents=new _t(1,1),this._viewportCount=1,this._viewports=[new xe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;jc.setFromMatrixPosition(t.matrixWorld),e.position.copy(jc),Zc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Zc),e.updateMatrixWorld(),Jo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Jo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Jo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Kc=new we,ws=new D,Qo=new D;class Bx extends yd{constructor(){super(new hn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new _t(4,2),this._viewportCount=6,this._viewports=[new xe(2,1,1,1),new xe(0,1,1,1),new xe(3,1,1,1),new xe(1,1,1,1),new xe(3,0,1,1),new xe(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ws.setFromMatrixPosition(t.matrixWorld),n.position.copy(ws),Qo.copy(n.position),Qo.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Qo),n.updateMatrixWorld(),i.makeTranslation(-ws.x,-ws.y,-ws.z),Kc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Kc)}}class bn extends po{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Bx}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class zx extends yd{constructor(){super(new od(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ta extends po{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ne.DEFAULT_UP),this.updateMatrix(),this.target=new Ne,this.shadow=new zx}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class ys extends po{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const Jc=new we;class Hx{constructor(t,e,n=0,i=1/0){this.ray=new Tl(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new El,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Jc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Jc),this}intersectObject(t,e=!0,n=[]){return hl(t,this,n,e),n.sort(Qc),n}intersectObjects(t,e=!0,n=[]){for(let i=0,r=t.length;i<r;i++)hl(t[i],this,n,e);return n.sort(Qc),n}}function Qc(s,t){return s.distance-t.distance}function hl(s,t,e,n){let i=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){const r=s.children;for(let a=0,o=r.length;a<o;a++)hl(r[a],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:_l}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=_l);const P=4,ni=3.2,ea=2,Rr=1.7,th=.6,na=2,eh=.35,nh=1.65,Cr=2.7,Gx=1,Vx=1,Wx=1.85,Sd=260,Xx=210,Ss=8884384,Lr=6e5,Pr=.34,js=["MMMMM##########","MMMMM##########","MMSMM##########","MMTMM##########","MMTMM##########","MMTMM##########","##.........####","##...........##","##...........##","##...........##","##...........##","##...........##","##...........##","######...######","######...######","######.P.######","#######F#######"],nn=js.length,pn=js[0].length;function Ce(s,t){if(t<0||t>=nn||s<0||s>=pn)return"building";const e=js[t][s];return e==="#"?"building":e==="o"?"barrel":e==="M"?"mountain":e==="T"?"tunnel":e==="S"?"stairs":e==="F"?"forestgate":"street"}function ih(s,t){const e=Ce(s,t);return e==="tunnel"||e==="stairs"}function ia(s,t){const e=Ce(s,t);return e==="street"||e==="barrel"||e==="tunnel"||e==="stairs"||e==="forestgate"}function sh(){for(let s=0;s<nn;s++){const t=js[s].indexOf("P");if(t>=0)return{col:t,row:s}}return{col:1,row:1}}function rh(){for(let s=0;s<nn;s++){const t=js[s].indexOf("F");if(t>=0)return{col:t,row:s}}return{col:7,row:nn-1}}const Zs=["###################################","###################################","##T...f...TrTTbT.NTTTTTT.T...bf.T##","##T...TTTf.TTf..T===TTfT..Tr.TTTf##","##Tb.f.TTTT.......T==.TTTrTT...T.##","##f....T..T..TrT.bT==.b.TTTTT.T.T##","##.b..T..T..r.T.T.T=.T....TTTTTTT##","##......TT....T.rk.=TT..TfTb..T..##","##frT..TTT.T...T.rT===.bT..T.TT.T##","##.f.kT.TT.rT..rT.==r.TTfT.fTr..T##","##TT.TTTTrTTTTTT.==...TT..T.TTT.T##","##T..TTTbTT.bT....=.Tff..TbTf.TT.##","##T..Tfb..b.k.T..======.TTTT....f##","##.TTT.T....rTT..=..Tk..TT..T.T..##","##...TT......bkT.=.kT.f...r.T.TT.##","##...TfT...T.T.r==..TTTbT..k..TT.##","##.TTTT.T..r.bbT=T.T...r....TTb.T##","##.f.T..T..TTf..===.T.TT.....TrbT##","##..TTTbTT.bT.T===TTTT.bT.......T##","##.fk.T.T....TTT.=.....T...rT.TTT##","##...T..T.b.TTkT==.TT.TfTf...TT..##","##.rTT..TTT.Tr.=====rT....T..TT=E##","##r.TT.T..TT..T===TbTTbTT...T.r.=##","##.TT.TfT....TT.T=rf.rTT.T...T===##","##T....rf.T..bT..==..TfT..Tk=====##","##T..Tff.TrTTTT...==.TT..T..=Tk.T##","##T.TTb==========j===========..Tf##","##..TT==.TfTT.T.==...r.TTTTrTT.bb##","##T.b==TT.rr.Tr..==.TT.TTT.TT..Tb##","##T======.TTr..T.==T.T...k.f.T...##","##===.brb.....bTT=.TT.T..r.T.T..T##","##W==TT.T.r.rTr===....rf.ffb.TTTT##","##..T.T.....k..===.Tk.Tr.Tf.f..TT##","##TT..TTT.T.TT==TTTrTTk.r..T.T.r.##","##T......r..TT=T.TTT.TTT.rf...T.T##","##.r....T.T.TT=TTT..TTkr.T.T..bbT##","##rk....fT.T.T==.rrb..T..r.T..Tr.##","##TTTb..Tf....=TbTrT..T..TTrT..f.##","##...T.b....TT====fT..T.T..T.T...##","##T..........T...=..Tf.T.T..T..fk##","##r.T..Tf........=T.....T...TTb.T##","##TTT.TTbT.bTT...===.T.......TbT.##","##.T.T....TTTbT..==T.T......TTTTT##","##.T..T...TTTf.T====..k..T.b..krT##","##bT.TTT.kTr.....==.TT.T.TTb.T.r.##","##TT.TbrT....T..r==T...bb.f..T...##","##..b.TTTrT.rf=s.===TTf..T.TTT.rr##","##..rTT.TTTTTr.r.P...TTT..T..T.b.##","#################=#################","#################V#################"],Vs=Zs.length,Yr=Zs[0].length;function bi(s,t){if(t<0||t>=Vs||s<0||s>=Yr)return"edge";switch(Zs[t][s]){case".":return"grass";case"=":return"path";case"T":return"tree";case"b":return"bush";case"r":return"rock";case"f":return"foliage";case"k":return"skull";case"s":case"j":case"N":case"E":case"W":return"sign";case"V":return"gate";case"P":return"spawn";default:return"edge"}}function sa(s,t){const e=bi(s,t);return e==="grass"||e==="path"||e==="tree"||e==="foliage"||e==="skull"||e==="gate"||e==="spawn"}function qx(s,t){switch(Zs[t]?.[s]){case"s":return["Trilha da Mata Sussurrante.","A neblina nunca se levanta por aqui. Dizem que ela se lembra de quem passa.","Siga a trilha até a encruzilhada."];case"j":return["Encruzilhada da Mata.","Ao sul: Vilarejo de Grimhollow.","Norte: Montanhas Cinzentas · Leste: o Charco · Oeste: as Ruínas.","(Esses caminhos se abrirão em breve.)"];case"N":return["Trilha das Montanhas Cinzentas.","O caminho sobe rumo ao nevoeiro gelado.","(Bloqueado — em breve.)"];case"E":return["Trilha do Charco.","Um cheiro de água parada vem do leste.","(Bloqueado — em breve.)"];case"W":return["Trilha das Ruínas.","Pedras antigas espreitam entre as árvores a oeste.","(Bloqueado — em breve.)"];default:return["Uma placa de madeira, gasta pelo tempo."]}}function ra(s){for(let t=0;t<Vs;t++){const e=Zs[t].indexOf(s);if(e>=0)return{col:e,row:t}}return{col:8,row:Vs-2}}const Ks=["############################################","############################################","############################################","############################################","####......#######..........#################","####..C...#######....C.....#################","####......#######...E......#################","####......#######.......E..#################","####..X...#######..........#################","######.##########..K.......#################","######.##########..........#################","######.###############.#####################","######.###############G#####################","###.........##########.#########.........###","###.........##########.#########.........###","###.........###..............###...E.....###","###...E.....###.K...........B###.........###","###.........###..........E...###......K..###","###......................................###","###.........###......E.......###.........###","###.........###..............###.........###","#######.#######..............#######.#######","#######.#######...E..........#######.#######","#######.#######.B..........K.#######.#######","#######.#######..............#######.#######","#######.#############..#############.#######","#######.#############..#############.#######","###.........#########..#########.........###","###.B.......#########..#########........B###","###...E.....#########..#########....E....###","###................##..###...............###","###..K......#########..#########..K......###","###.........#########..#########.........###","##################........##################","#############....#........##################","#############.C..G........##################","#############....#...S.U..##################","##################........##################","############################################","############################################"],Ws=Ks.length,eo=Ks[0].length;function $x(s,t){return t<0||t>=Ws||s<0||s>=eo?"#":Ks[t][s]}function si(s,t){switch($x(s,t)){case".":return"floor";case"S":return"spawn";case"U":return"stairs";case"E":return"enemy";case"C":return"chest";case"K":return"bones";case"B":return"barrel";case"G":return"gate";case"X":return"secret";default:return"wall"}}function oh(s,t){return si(s,t)!=="wall"}function Ur(s,t){const e=si(s,t);return e==="wall"||e==="secret"}function ah(s){for(let t=0;t<Ws;t++){const e=Ks[t].indexOf(s);if(e>=0)return{col:e,row:t}}return{col:21,row:36}}function Yx(s){const t=[];for(let e=0;e<Ws;e++)for(let n=0;n<eo;n++)Ks[e][n]===s&&t.push({col:n,row:e});return t}const no=24,io=23,Ls=5,jx=2.6,Zx=7.4,Xs=24,Kx=2,ts=12,Jx=ts/Xs,lh=Math.PI*2*Kx/Xs,ch=Math.PI/2,oa=ts;function hh(s,t){return Math.atan2(-s,-t)}function Qx(){const s=[];for(let r=0;r<=Xs;r++){const a=ch+r*lh;s.push({x:no+Ls*Math.cos(a),y:r*Jx,z:io+Ls*Math.sin(a),yaw:hh(-Math.sin(a),Math.cos(a))})}const t=ch+Xs*lh,e=no+Ls*Math.cos(t),n=io+Ls*Math.sin(t),i=hh(-Math.sin(t),Math.cos(t));for(let r=1;r<=4;r++)s.push({x:e-2*r,y:ts,z:n,yaw:i});return s}const mo=Qx(),Zi=mo.length-1,dh=mo[Zi].yaw,so=4,uh={c:4,r:7},Dr={c:3,r:7},hi={col:2,row:7},Ol=new Set;for(let s=6;s<=8;s++)for(let t=1;t<=3;t++)t===hi.col&&s===hi.row||Ol.add(`${t},${s}`);function fh(s,t){return Ol.has(`${s},${t}`)}function tv(s,t){return s===uh.c&&t===uh.r}function ev(){return[...Ol].map(s=>s.split(",").map(Number))}const ph={x:hi.col*so,z:hi.row*so},aa=hi.col*so,la=hi.row*so,nv=7,mh=no,Ts=io+Ls;function Es(s){return mo[Math.max(0,Math.min(Zi,s))]}const iv=""+new URL("tex_cobble-DXMPAwZE.jpg",import.meta.url).href,sv=""+new URL("tex_stonewall-BFmowWy6.jpg",import.meta.url).href,rv=""+new URL("tex_thatch-DdJMnyvF.jpg",import.meta.url).href,ov=""+new URL("tex_wood-B0jCHZZA.jpg",import.meta.url).href,av=""+new URL("tex_dirt-BHcbB_Wz.jpg",import.meta.url).href,lv=""+new URL("tex_grass-C2Q1l28q.jpg",import.meta.url).href,cv=""+new URL("tex_mosswall-DpaqdZvP.jpg",import.meta.url).href,hv=""+new URL("tex_cavewall-DQwg9sDl.jpg",import.meta.url).href,dv=""+new URL("tex_cavefloor-CIzR_jPs.jpg",import.meta.url).href,uv=""+new URL("tex_caveceil-Dh6eDyCo.jpg",import.meta.url).href,gh=new Map,fv=new wd;function Dn(s,t=1,e=1){let n=gh.get(s);n||(n=fv.load(s),n.wrapS=dn,n.wrapT=dn,n.colorSpace=Ie,n.anisotropy=8,gh.set(s,n));const i=n.clone();return i.wrapS=dn,i.wrapT=dn,i.repeat.set(t,e),i.needsUpdate=!0,i}const Ir=4;function An(s,t){const e=document.createElement("canvas");e.width=s*Ir,e.height=t*Ir;const n=e.getContext("2d");return n.scale(Ir,Ir),{c:e,ctx:n}}function Js(s,t=1,e=1){const n=new Mn(s);return n.magFilter=Ze,n.minFilter=yn,n.generateMipmaps=!0,n.anisotropy=8,n.wrapS=dn,n.wrapT=dn,n.repeat.set(t,e),n.colorSpace=Ie,n}function ds(s){const t=new Mn(s);return t.magFilter=Ze,t.minFilter=yn,t.generateMipmaps=!0,t.anisotropy=8,t.wrapS=wn,t.wrapT=wn,t.colorSpace=Ie,t}const $n=s=>{let t=s>>>0;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}};function Xe(s=1){return Dn(ov)}function _h(s=7){return Dn(iv)}function As(s=3){return Dn(rv)}function pv(s=11){const{c:n,ctx:i}=An(48,64);i.fillStyle="#5a4a38",i.fillRect(0,0,48,64),i.fillStyle="#4a2f16",i.fillRect(6,6,36,58);for(let r=6;r<42;r+=8)i.fillStyle="rgba(20,10,4,0.7)",i.fillRect(r,6,1,58),i.fillStyle="rgba(120,80,40,0.25)",i.fillRect(r+1,6,1,58);return i.fillStyle="#20242a",i.fillRect(8,14,32,3),i.fillRect(8,46,32,3),i.fillStyle="#c9a227",i.fillRect(34,64/2,3,3),Js(n)}function ca(s=17){const{c:n,ctx:i}=An(48,32),r=$n(s);for(let a=0;a<48;a++){const o=96+Math.sin(a/48*Math.PI)*46+(r()-.5)*10;i.fillStyle=`rgb(${o|0},${o*.6|0},${o*.32|0})`,i.fillRect(a,0,1,32),a%6===0&&(i.fillStyle="rgba(20,10,4,0.6)",i.fillRect(a,0,1,32))}return i.fillStyle="#3a3f47",i.fillRect(0,3,48,3),i.fillRect(0,26,48,3),i.fillStyle="rgba(200,210,220,0.3)",i.fillRect(0,3,48,1),Js(n)}function mv(s=32){return Dn(cv)}function xh(){return Dn(hv)}function vh(){return Dn(dv)}function gv(){return Dn(uv)}function ii(s=31){return Dn(sv)}function _v(s=1){const{c:n,ctx:i}=An(76,128);i.clearRect(0,0,76,128),i.lineJoin="round",i.lineCap="round";const r=$n(s),a="#241812",o=76/2,l=29,c=13,h=(A,v)=>{const b=parseInt(A.slice(1),16);let C=b>>16&255,U=b>>8&255,I=b&255;if(v<0){const V=1+v;C*=V,U*=V,I*=V}else C+=(255-C)*v,U+=(255-U)*v,I+=(255-I)*v;return`rgb(${C|0},${U|0},${I|0})`},d=(A,v,b=2.2)=>{i.beginPath(),A.forEach(([C,U],I)=>I?i.lineTo(C,U):i.moveTo(C,U)),i.closePath(),i.fillStyle=v,i.fill(),b&&(i.strokeStyle=a,i.lineWidth=b,i.stroke())},u=(A,v,b,C,U=2)=>{i.beginPath(),i.arc(A,v,b,0,Math.PI*2),i.fillStyle=C,i.fill(),U&&(i.strokeStyle=a,i.lineWidth=U,i.stroke())},f=(A,v,b,C,U,I,V=2)=>{i.beginPath(),dl(i,A,v,b,C,U),i.fillStyle=I,i.fill(),V&&(i.strokeStyle=a,i.lineWidth=V,i.stroke())},g=(A,v)=>{i.save(),i.beginPath(),A.forEach(([b,C],U)=>U?i.lineTo(b,C):i.moveTo(b,C)),i.closePath(),i.clip(),i.fillStyle=v,i.fillRect(o+2,40,44,90),i.restore()},_=["#f4cc9c","#eab488","#d89a68"],m=_[Math.floor(r()*_.length)],p=h(m,-.16),w=Math.floor(r()*5);i.fillStyle="rgba(0,0,0,0.22)",i.beginPath(),i.ellipse(o,123,15,4.5,0,0,Math.PI*2),i.fill();const M=()=>{i.fillStyle=p,i.fillRect(o-4,36,8,12),u(o,l,c,m),i.save(),i.beginPath(),i.arc(o,l,c,0,Math.PI*2),i.clip(),i.fillStyle="rgba(0,0,0,0.10)",i.fillRect(o+3,l-c,c,2*c),i.restore();for(const A of[-1,1]){const v=o+A*4.6;i.fillStyle="#fff",i.beginPath(),i.ellipse(v,l-.3,2.3,3.6,0,0,Math.PI*2),i.fill(),i.fillStyle="#241812",i.beginPath(),i.ellipse(v+A*.3,l,1.6,3.1,0,0,Math.PI*2),i.fill(),i.fillStyle="#fff",i.beginPath(),i.arc(v-.7,l-1.8,.8,0,Math.PI*2),i.fill()}i.strokeStyle=a,i.lineWidth=1.6,i.beginPath(),i.moveTo(o-8,l-5.5),i.lineTo(o-2.5,l-6),i.moveTo(o+2.5,l-6),i.lineTo(o+8,l-5.5),i.stroke(),i.fillStyle=p,i.fillRect(o-.6,l+3,1.3,2.4),i.strokeStyle="#9c4a38",i.lineWidth=1.4,i.beginPath(),i.arc(o,l+6,2.2,.18*Math.PI,.82*Math.PI),i.stroke(),i.fillStyle="rgba(232,120,110,0.28)",i.beginPath(),i.arc(o-7.5,l+4,2,0,Math.PI*2),i.arc(o+7.5,l+4,2,0,Math.PI*2),i.fill()},x=A=>{i.beginPath(),i.arc(o,l-1,c+1,Math.PI*.98,Math.PI*2.02),i.lineTo(o+c,l+2),i.lineTo(o+8,l-3),i.lineTo(o+5,l-1),i.lineTo(o+2,l-4),i.lineTo(o-1,l-1),i.lineTo(o-4,l-4),i.lineTo(o-7,l-1),i.lineTo(o-c,l+2),i.closePath(),i.fillStyle=A,i.fill(),i.strokeStyle=a,i.lineWidth=2,i.stroke();const v=[-11,-7,-3,1,5,9,12];for(const b of v){const C=o+b*.9,U=Math.max(0,c*c-b*b),I=l-Math.sqrt(U)+3,V=o+b*1.7+(b>0?2:-2),$=I-10-(12-Math.abs(b))*.5;d([[C-3.4,I],[V,$],[C+3.4,I]],A,1.8)}i.strokeStyle=h(A,.35),i.lineWidth=1.3,i.beginPath(),i.moveTo(o-4,l-6),i.lineTo(o-2,l-c+1),i.moveTo(o+3,l-6),i.lineTo(o+5,l-c+2),i.stroke()},E=(A,v)=>{d([[o-12,48],[o-20,52],[o-18,74],[o-11,70]],A,2),d([[o+12,48],[o+20,52],[o+18,74],[o+11,70]],A,2),u(o-18,76,3.6,v,1.8),u(o+18,76,3.6,v,1.8)},y=(A,v)=>{d([[o-9,82],[o-1,82],[o-2,112],[o-9,112]],A,2),d([[o+1,82],[o+9,82],[o+9,112],[o+2,112]],A,2),f(o-11,110,10,11,3,v,2),f(o+1,110,10,11,3,v,2)},R=(A,v)=>{d(A,v,2.2),g(A,"rgba(0,0,0,0.16)")};if(w===0)y("#2f6f9a","#6a4526"),R([[o-12,46],[o+12,46],[o+14,84],[o-14,84]],"#37a34a"),d([[o-14,80],[o+14,80],[o+14,84],[o-14,84]],"#e8e0b0",1.4),E("#2f8f40","#e0b070"),f(o-14,79,28,5,2,"#5a3a1e",1.8),f(o-3,78,6,7,1.5,"#e6c040",1.4),M(),x("#f0d24a"),d([[o-c,l-6],[o+c,l-6],[o+5,l-c-13],[o-2,l-c-7]],"#2f8f3f",2),u(o+4,l-c-12,2.4,"#e6c040",1.4);else if(w===1)y("#33507e","#3a4656"),R([[o-13,46],[o+13,46],[o+14,82],[o-14,82]],"#8a5a2e"),d([[o-8,50],[o+8,50],[o+9,74],[o-9,74]],"#6f4522",1.8),i.strokeStyle="#e6c040",i.lineWidth=1.6,i.beginPath(),i.moveTo(o-7,56),i.lineTo(o+7,60),i.stroke(),E("#7a4d26","#3a4656"),u(o-15,49,5.5,"#9a6a38",2),u(o+15,49,5.5,"#9a6a38",2),f(o-14,78,28,5,2,"#4a2f18",1.8),M(),x("#e07028"),f(o-c-1,l-8,2*c+2,4.5,1.5,"#2f8f3f",1.8),d([[o+c-1,l-7],[o+c+6,l-2],[o+c+4,l-9]],"#2f8f3f",1.4);else if(w===2){const A=[[o-11,46],[o+11,46],[o+20,116],[o-20,116]];d(A,"#2a52b0",2.2),g(A,"rgba(0,0,0,0.16)"),d([[o-4,52],[o+4,52],[o+6,116],[o-6,116]],"#e6b83a",1.6),f(o-20,112,40,5,2,"#e6b83a",1.6),d([[o-11,48],[o-21,58],[o-17,84],[o-9,74]],"#2a52b0",2),d([[o+11,48],[o+21,58],[o+17,84],[o+9,74]],"#2a52b0",2),u(o-17,86,3.4,m,1.6),u(o+17,86,3.4,m,1.6),M(),x("#4aa8d8"),i.strokeStyle="#8a5a2e",i.lineWidth=3,i.beginPath(),i.moveTo(o+19,40),i.lineTo(o+19,118),i.stroke(),u(o+19,33,5,"#e6c040",2),u(o+19,33,2.2,"#fff6c0",0)}else if(w===3){const A=[[o-13,46],[o+13,46],[o+22,100],[o-22,100]];d(A,"#c0432a",2.2),g(A,"rgba(0,0,0,0.18)"),y("#2a2f45","#5a3a22"),R([[o-11,48],[o+11,48],[o+13,82],[o-13,82]],"#356ab8"),E("#2f5aa0","#d8a070"),f(o-13,78,26,5,2,"#4a3018",1.8),d([[o-12,46],[o-4,44],[o-6,52]],"#c0432a",1.6),d([[o+12,46],[o+4,44],[o+6,52]],"#c0432a",1.6),M(),x("#e8802a")}else{const A=[[o-11,46],[o+11,46],[o+18,116],[o-18,116]];d(A,"#dcd6c6",2.2),g(A,"rgba(0,0,0,0.12)"),f(o-18,112,36,5,2,"#c05a86",1.6),d([[o-5,46],[o+5,46],[o+3,74],[o-3,74]],"#c05a86",1.4),d([[o-11,48],[o-19,58],[o-15,82],[o-9,74]],"#dcd6c6",2),d([[o+11,48],[o+19,58],[o+15,82],[o+9,74]],"#dcd6c6",2),u(o-15,84,3.4,m,1.6),u(o+15,84,3.4,m,1.6),M();const v="#7a4a2a";d([[o-c-2,l-4],[o-c-3,l+26],[o-5,l+20],[o-4,l]],v,2),d([[o+c+2,l-4],[o+c+3,l+26],[o+5,l+20],[o+4,l]],v,2),i.beginPath(),i.arc(o,l-1,c+1,Math.PI*.92,Math.PI*2.08),i.lineTo(o+c-1,l+1),i.lineTo(o+7,l-2),i.lineTo(o+4,l+1),i.lineTo(o+1,l-3),i.lineTo(o-2,l+1),i.lineTo(o-5,l-2),i.lineTo(o-c+1,l+1),i.closePath(),i.fillStyle=v,i.fill(),i.strokeStyle=a,i.lineWidth=2,i.stroke()}return ds(n)}function dl(s,t,e,n,i,r){s.beginPath(),s.moveTo(t+r,e),s.arcTo(t+n,e,t+n,e+i,r),s.arcTo(t+n,e+i,t,e+i,r),s.arcTo(t,e+i,t,e,r),s.arcTo(t,e,t+n,e,r),s.closePath()}function ha(s){const{c:n,ctx:i}=An(160,56);i.clearRect(0,0,160,56),i.fillStyle="#33220f",dl(i,2,2,156,52,6),i.fill(),i.fillStyle="#59401f",dl(i,6,6,148,44,5),i.fill(),i.strokeStyle="rgba(30,18,8,0.35)",i.lineWidth=1;for(let a=12;a<48;a+=6)i.beginPath(),i.moveTo(10,a),i.lineTo(150,a+1),i.stroke();i.fillStyle="#2a1a0a";for(const[a,o]of[[12,12],[148,12],[12,44],[148,44]])i.beginPath(),i.arc(a,o,2,0,Math.PI*2),i.fill();let r=26;for(i.fillStyle="#f2dda0",i.textAlign="center",i.textBaseline="middle",i.font=`bold ${r}px Georgia, "Times New Roman", serif`;i.measureText(s).width>138&&r>10;)r-=1,i.font=`bold ${r}px Georgia, "Times New Roman", serif`;return i.strokeStyle="rgba(0,0,0,0.55)",i.lineWidth=3,i.strokeText(s,160/2,56/2+1),i.fillText(s,160/2,56/2+1),ds(n)}function da(s=41){const{c:n,ctx:i}=An(96,96),r=$n(s);for(let a=0;a<96;a+=2)for(let o=0;o<96;o+=2){const l=78+Math.floor(r()*34);i.fillStyle=`rgb(${l},${l*.94|0},${l*.84|0})`,i.fillRect(o,a,2,2)}for(let a=0;a<26;a++){const o=r()*96,l=r()*96,c=10+r()*16,h=r()<.5?.22:-.18;i.fillStyle=h>0?`rgba(0,0,0,${h})`:`rgba(255,250,240,${-h})`,i.beginPath();const d=4+(r()*3|0);for(let u=0;u<=d;u++){const f=u/d*Math.PI*2+r()*.3,g=c*(.7+r()*.4),_=o+Math.cos(f)*g,m=l+Math.sin(f)*g*.8;u===0?i.moveTo(_,m):i.lineTo(_,m)}i.closePath(),i.fill()}i.strokeStyle="rgba(20,16,12,0.5)",i.lineWidth=1.4;for(let a=0;a<7;a++){i.beginPath();let o=r()*96,l=r()*96;i.moveTo(o,l);for(let c=0;c<5;c++)o+=(r()-.5)*26,l+=(r()-.5)*26,i.lineTo(o,l);i.stroke()}return Js(n)}function xv(s=43){const{c:n,ctx:i}=An(96,96),r=$n(s);i.fillStyle="#161514",i.fillRect(0,0,96,96);const a=32;for(let o=0;o<96;o+=a)for(let l=0;l<96;l+=a){const c=40+Math.floor(r()*20);i.fillStyle=`rgb(${c},${c*.98|0},${c*.94|0})`,i.fillRect(l+2,o+2,a-4,a-4),i.fillStyle="rgba(0,0,0,0.4)",i.fillRect(l+2,o+a-4,a-4,2),i.fillStyle="rgba(255,255,255,0.05)",i.fillRect(l+2,o+2,a-4,1),r()<.3&&(i.strokeStyle="rgba(0,0,0,0.35)",i.lineWidth=1,i.beginPath(),i.moveTo(l+6+r()*10,o+6),i.lineTo(l+8+r()*12,o+a-6),i.stroke())}return Js(n)}function kr(s=61){return Dn(lv)}function ua(s=63){return Dn(av)}function bh(s=65){const{c:n,ctx:i}=An(128,300);i.clearRect(0,0,128,300);const r=$n(s),a=128/2,o=r()<.35,l=(r()-.5)*12,c=300*.8;i.beginPath(),i.moveTo(a-8,300),i.lineTo(a-5,c),i.lineTo(a+5,c),i.lineTo(a+8,300),i.closePath();const h=i.createLinearGradient(a-8,0,a+8,0);h.addColorStop(0,"#2a1c0f"),h.addColorStop(.5,"#553a20"),h.addColorStop(1,"#20150a"),i.fillStyle=h,i.fill();const d=7,u=300*.04,f=300*.84;for(let g=0;g<d;g++){const _=g/(d-1),m=u+(f-u)*_,p=10+_*(128*.46),w=(f-u)/d*2.1,M=30+l;i.fillStyle=`rgb(${M*.55|0},${M+22|0},${M*.5|0})`,i.beginPath(),i.moveTo(a,m-w*.25);const x=7;for(let E=0;E<=x;E++){const y=a+p*(E/x),R=(E%2===0?.86:1)*w;i.lineTo(y,m+R)}for(let E=x;E>=0;E--){const y=a-p*(E/x),R=(E%2===0?.86:1)*w;i.lineTo(y,m+R)}i.closePath(),i.fill()}for(let g=0;g<d;g++){const _=g/(d-1),m=u+(f-u)*_+2,p=(10+_*(128*.46))*.82,w=(f-u)/d*1.9,M=62+Math.floor(r()*20)+l;i.fillStyle=`rgb(${M*.5|0},${M+30|0},${M*.45|0})`,i.beginPath(),i.moveTo(a,m),i.lineTo(a+p,m+w*.92),i.lineTo(a-p,m+w*.92),i.closePath(),i.fill(),i.fillStyle=`rgba(${M*.7|0},${M+60|0},${M*.5|0},0.5)`,i.beginPath(),i.moveTo(a,m),i.lineTo(a-p*.7,m+w*.8),i.lineTo(a-p*.1,m+w*.8),i.closePath(),i.fill();for(let x=0;x<12;x++){const E=r()<.5?-1:1,y=p*(.4+r()*.62);i.fillStyle=`rgba(${M*.45|0},${M+14|0},${M*.4|0},0.85)`,i.beginPath(),i.arc(a+E*y,m+w*(.55+r()*.4),1.4+r()*2.4,0,Math.PI*2),i.fill()}o&&(i.fillStyle="rgba(238,244,255,0.8)",i.beginPath(),i.moveTo(a,m+1),i.lineTo(a+p*.3,m+w*.34),i.lineTo(a-p*.3,m+w*.34),i.closePath(),i.fill())}return ds(n)}function vv(s=75){const{c:n,ctx:i}=An(128,96);i.clearRect(0,0,128,96);const r=$n(s),a=128/2,o=96*.98,l=9+(r()*5|0);for(let c=0;c<l;c++){const h=-Math.PI/2+(c/(l-1)-.5)*1.7+(r()-.5)*.2,d=96*(.5+r()*.45),u=60+Math.floor(r()*40);i.strokeStyle=`rgb(${u*.42|0},${u},${u*.34|0})`,i.lineWidth=2.4;const f=a+Math.cos(h)*d,g=o+Math.sin(h)*d,_=a+Math.cos(h)*d*.5+(r()-.5)*8,m=o+Math.sin(h)*d*.5;i.beginPath(),i.moveTo(a,o),i.quadraticCurveTo(_,m,f,g),i.stroke(),i.lineWidth=1;for(let p=.25;p<1;p+=.16){const w=a+(f-a)*p,M=o+(g-o)*p;i.beginPath(),i.moveTo(w,M),i.lineTo(w-5,M-3),i.moveTo(w,M),i.lineTo(w+5,M-3),i.stroke()}}return ds(n)}function bv(s=67){const{c:n,ctx:i}=An(128,96);i.clearRect(0,0,128,96);const r=$n(s),a=128/2,o=96*.94,l=12;for(let c=0;c<l;c++){const h=a+(r()-.5)*128*.8,d=o-r()*96*.72,u=12+r()*18,f=54+Math.floor(r()*40),g=i.createRadialGradient(h,d-u*.3,u*.2,h,d,u);g.addColorStop(0,`rgb(${f*.6|0},${f+40},${f*.5|0})`),g.addColorStop(1,`rgb(${f*.4|0},${f*.8|0},${f*.4|0})`),i.fillStyle=g,i.beginPath(),i.arc(h,d,u,0,Math.PI*2),i.fill()}for(let c=0;c<5;c++)i.fillStyle="rgba(150,40,50,0.8)",i.beginPath(),i.arc(a+(r()-.5)*128*.6,o-r()*96*.5,1.6,0,Math.PI*2),i.fill();return ds(n)}function Mh(s=69){const{c:n,ctx:i}=An(128,96);i.clearRect(0,0,128,96);const r=$n(s),a=(o,l,c)=>{i.fillStyle="#e7e2d2",i.beginPath(),i.ellipse(o,l,c,c*.9,0,0,Math.PI*2),i.fill(),i.fillStyle="#d8d2c0",i.beginPath(),i.ellipse(o,l+c*.7,c*.6,c*.4,0,0,Math.PI*2),i.fill(),i.fillStyle="#2a2620",i.beginPath(),i.ellipse(o-c*.4,l-c*.1,c*.24,c*.28,0,0,Math.PI*2),i.ellipse(o+c*.4,l-c*.1,c*.24,c*.28,0,0,Math.PI*2),i.fill(),i.beginPath(),i.moveTo(o,l+c*.1),i.lineTo(o-c*.12,l+c*.4),i.lineTo(o+c*.12,l+c*.4),i.fill()};i.strokeStyle="#d5cfbe",i.lineWidth=3;for(let o=0;o<6;o++){const l=20+r()*88,c=96*.7+r()*96*.22;i.beginPath(),i.moveTo(l,c),i.lineTo(l+(r()-.5)*34,c+(r()-.5)*10),i.stroke()}return a(128*.5,96*.72,15),a(128*.32,96*.8,12),a(128*.68,96*.8,12),a(128*.46,96*.5,13),ds(n)}function wh(s=47){const{c:n,ctx:i}=An(96,96),r=$n(s);i.fillStyle="#0f0e0d",i.fillRect(0,0,96,96);const a=18;for(let o=0,l=0;o<96;o+=a,l++){const c=l%2?18:0;for(let h=-18;h<96;h+=36){const d=h+c,u=44+Math.floor(r()*20);i.fillStyle=`rgb(${u*.9|0},${u},${u*.86|0})`,i.fillRect(d+1,o+1,34,a-2),i.fillStyle="rgba(0,0,0,0.45)",i.fillRect(d+1,o+a-3,34,2),i.fillStyle="rgba(255,255,255,0.06)",i.fillRect(d+1,o+1,34,1),r()<.35&&(i.fillStyle=`rgba(70,90,50,${.18+r()*.2})`,i.beginPath(),i.ellipse(d+6+r()*20,o+4+r()*8,5,3,0,0,Math.PI*2),i.fill())}}return Js(n)}const Mv=""+new URL("wpn_sword-CpsgndpE.png",import.meta.url).href,wv=""+new URL("wpn_greatsword-C2mQEgxH.png",import.meta.url).href,yv=""+new URL("wpn_axe-CvCTYMUq.png",import.meta.url).href,Sv=""+new URL("wpn_dagger-BBXQkEIm.png",import.meta.url).href,Tv=""+new URL("wpn_rapier-dNk4ndjW.png",import.meta.url).href,Ev=""+new URL("wpn_maul-DbliXABw.png",import.meta.url).href,Av=""+new URL("wpn_mace-tTLR-MzC.png",import.meta.url).href,Rv=""+new URL("wpn_staff-DGpAnpDH.png",import.meta.url).href,Cv=""+new URL("wpn_shield-Bw_-3z5v.png",import.meta.url).href,Lv=""+new URL("wpn_orb-BsomjHDA.png",import.meta.url).href,yh={ry:0,rx:0,rz:16,tx:0,ty:2,s:1},Pv={slash:{wind:{ry:44,rx:-8,rz:36,tx:12,ty:4,s:.96},hit:{ry:-42,rx:16,rz:-42,tx:-26,ty:-8,s:1.18},follow:{ry:-16,rx:7,rz:-24,tx:-12,ty:-2,s:1.02},windup:105,strike:190,recover:190,cooldown:560,weight:1,fx:"arc"},quickslash:{wind:{ry:44,rx:-8,rz:36,tx:12,ty:4,s:.94},hit:{ry:-42,rx:16,rz:-42,tx:-26,ty:-8,s:1.16},follow:{ry:-16,rx:7,rz:-24,tx:-12,ty:-2,s:1},windup:45,strike:100,recover:95,cooldown:300,weight:.85,fx:"arc"},chop:{wind:{ry:-22,rx:-26,rz:22,tx:6,ty:-2,s:.96},hit:{ry:18,rx:40,rz:-18,tx:-12,ty:9,s:1.22},follow:{ry:8,rx:17,rz:-10,tx:-6,ty:8,s:1.05},windup:150,strike:230,recover:220,cooldown:820,weight:1.6,fx:"arcBig"},smash:{wind:{ry:-16,rx:-32,rz:16,tx:2,ty:0,s:.98},hit:{ry:12,rx:50,rz:-6,tx:-6,ty:13,s:1.36},follow:{ry:6,rx:21,rz:-2,tx:-2,ty:9,s:1.08},windup:220,strike:320,recover:300,cooldown:1200,weight:2.4,fx:"smashwave"},lunge:{wind:{ry:6,rx:-10,rz:4,tx:9,ty:17,s:.8},hit:{ry:-4,rx:42,rz:-22,tx:-15,ty:-16,s:1.46},follow:{ry:-2,rx:24,rz:-14,tx:-9,ty:-6,s:1.18},windup:110,strike:85,recover:155,cooldown:420,weight:.9,fx:"streak"},swipe:{wind:{ry:40,rx:-8,rz:44,tx:12,ty:4,s:.96},hit:{ry:-42,rx:12,rz:-50,tx:-26,ty:-4,s:1.16},follow:{ry:-14,rx:4,rz:-24,tx:-10,ty:0,s:1},windup:120,strike:205,recover:200,cooldown:640,weight:1.1,fx:"arc"},axeChop:{wind:{ry:6,rx:-14,rz:14,tx:5,ty:-22,s:.94},hit:{ry:-12,rx:22,rz:-20,tx:-9,ty:24,s:1.18},follow:{ry:-8,rx:14,rz:-14,tx:-5,ty:16,s:1.06},windup:150,strike:230,recover:220,cooldown:820,weight:1.6,fx:"arcBig",imgSpin:{wind:34,hit:-76,follow:-34}},maulSmash:{wind:{ry:6,rx:-16,rz:12,tx:4,ty:-24,s:.96},hit:{ry:-12,rx:24,rz:-18,tx:-7,ty:28,s:1.3},follow:{ry:-8,rx:15,rz:-12,tx:-4,ty:18,s:1.08},windup:220,strike:320,recover:300,cooldown:1200,weight:2.4,fx:"smashwave",imgSpin:{wind:30,hit:-56,follow:-26}}},ul=[{id:"sword",name:"Espada",url:Mv,slot:"main",grip:"1h",style:"slash",scale:1,dmg:1,cls:"Guerreiro"},{id:"greatsword",name:"Espadão",url:wv,slot:"main",grip:"2h",style:"smash",scale:1.2,dmg:3,cls:"Guerreiro",cooldown:1150},{id:"axe",name:"Machado",url:yv,slot:"main",grip:"1h",style:"axeChop",scale:1,dmg:2,cls:"Guerreiro"},{id:"dagger",name:"Adaga",url:Sv,slot:"main",grip:"1h",style:"quickslash",scale:.64,dmg:1,cls:"Ladino",cooldown:280},{id:"rapier",name:"Rapieira",url:Tv,slot:"main",grip:"1h",style:"lunge",scale:1.05,dmg:1,cls:"Ladino",cooldown:420},{id:"maul",name:"Marreta",url:Ev,slot:"main",grip:"2h",style:"maulSmash",scale:1.12,dmg:3,cls:"Clérigo",cooldown:1260},{id:"mace",name:"Maça",url:Av,slot:"main",grip:"1h",style:"chop",scale:.96,dmg:2,cls:"Clérigo"},{id:"staff",name:"Cajado",url:Rv,slot:"main",grip:"2h",style:"swipe",scale:1.06,dmg:1,cls:"Mago",tint:"arcane"},{id:"shield",name:"Escudo",url:Cv,slot:"off",grip:"1h",style:"slash",scale:.9,dmg:0,cls:"Guerreiro"},{id:"orb",name:"Orbe",url:Lv,slot:"off",grip:"1h",style:"swipe",scale:.8,dmg:0,cls:"Mago",tint:"arcane"}],Uv=Object.fromEntries(ul.map(s=>[s.id,s])),Td=""+new URL("sk_clerigo_01-m02oqn3i.png",import.meta.url).href,Ed=""+new URL("sk_clerigo_02-gPq2kyAZ.png",import.meta.url).href,Ad=""+new URL("sk_clerigo_03-BC61m31x.png",import.meta.url).href,Rd=""+new URL("sk_clerigo_04-DkEHRfvV.png",import.meta.url).href,Cd=""+new URL("sk_clerigo_05-dnCPnZU3.png",import.meta.url).href,Ld=""+new URL("sk_clerigo_06-BSo7ILHo.png",import.meta.url).href,Pd=""+new URL("sk_clerigo_07-CjoSnkTy.png",import.meta.url).href,Ud=""+new URL("sk_clerigo_08-DCl_nzII.png",import.meta.url).href,Dd=""+new URL("sk_clerigo_09-Ba1vsp2b.png",import.meta.url).href,Id=""+new URL("sk_clerigo_10-mdVYVSAr.png",import.meta.url).href,kd=""+new URL("sk_clerigo_11-CjethmxR.png",import.meta.url).href,Nd=""+new URL("sk_clerigo_12-C7S2ppC_.png",import.meta.url).href,Fd=""+new URL("sk_clerigo_13-2ncy5aSV.png",import.meta.url).href,Od=""+new URL("sk_clerigo_14-848kFmaR.png",import.meta.url).href,Bd=""+new URL("sk_clerigo_15-DcclFDYX.png",import.meta.url).href,zd=""+new URL("sk_guerreiro_01-D_DvW5ng.png",import.meta.url).href,Hd=""+new URL("sk_guerreiro_02-FBO4q1oa.png",import.meta.url).href,Gd=""+new URL("sk_guerreiro_03-CUWaFsIC.png",import.meta.url).href,Vd=""+new URL("sk_guerreiro_04-DV0sbKF9.png",import.meta.url).href,Wd=""+new URL("sk_guerreiro_05-rJJiQi-5.png",import.meta.url).href,Xd=""+new URL("sk_guerreiro_06-Bx2EDwMO.png",import.meta.url).href,qd=""+new URL("sk_guerreiro_07-97R_0COd.png",import.meta.url).href,$d=""+new URL("sk_guerreiro_08-UGcmyoGh.png",import.meta.url).href,Yd=""+new URL("sk_guerreiro_09-CDQwpzrD.png",import.meta.url).href,jd=""+new URL("sk_guerreiro_10-BZXnW6l3.png",import.meta.url).href,Zd=""+new URL("sk_guerreiro_11-CSJNGa0I.png",import.meta.url).href,Kd=""+new URL("sk_guerreiro_12-CWNNgDQ8.png",import.meta.url).href,Jd=""+new URL("sk_guerreiro_13-oyA7SeL2.png",import.meta.url).href,Qd=""+new URL("sk_guerreiro_14-CDK00urm.png",import.meta.url).href,tu=""+new URL("sk_guerreiro_15-vYbsrG8W.png",import.meta.url).href,eu=""+new URL("sk_ladino_01-D7vColft.png",import.meta.url).href,nu=""+new URL("sk_ladino_02-4cW8vrhW.png",import.meta.url).href,iu=""+new URL("sk_ladino_03-BrcSubEV.png",import.meta.url).href,su=""+new URL("sk_ladino_04-GxMm6DeJ.png",import.meta.url).href,ru=""+new URL("sk_ladino_05-BrLAnd-q.png",import.meta.url).href,ou=""+new URL("sk_ladino_06-D1z7SCpz.png",import.meta.url).href,au=""+new URL("sk_ladino_07-B7RhJ0wt.png",import.meta.url).href,lu=""+new URL("sk_ladino_08-D4FbpQ9F.png",import.meta.url).href,cu=""+new URL("sk_ladino_09-faeULULl.png",import.meta.url).href,hu=""+new URL("sk_ladino_10-cZSfMIhT.png",import.meta.url).href,du=""+new URL("sk_ladino_11-CDqqIQHS.png",import.meta.url).href,uu=""+new URL("sk_ladino_12-CZDoISs5.png",import.meta.url).href,fu=""+new URL("sk_ladino_13-DsM2ayWP.png",import.meta.url).href,pu=""+new URL("sk_ladino_14-D3917R8E.png",import.meta.url).href,mu=""+new URL("sk_ladino_15-B5aZcXUE.png",import.meta.url).href,gu=""+new URL("sk_mago_01-CXK3NXsg.png",import.meta.url).href,_u=""+new URL("sk_mago_02-wMfvdygl.png",import.meta.url).href,xu=""+new URL("sk_mago_03-DuqDF8qS.png",import.meta.url).href,vu=""+new URL("sk_mago_04-FHIO0qBl.png",import.meta.url).href,bu=""+new URL("sk_mago_05-D3v0cqW2.png",import.meta.url).href,Mu=""+new URL("sk_mago_06-BifuIDkE.png",import.meta.url).href,wu=""+new URL("sk_mago_07-DVhdUIDL.png",import.meta.url).href,yu=""+new URL("sk_mago_08-DODapwyo.png",import.meta.url).href,Su=""+new URL("sk_mago_09-B1FddkFu.png",import.meta.url).href,Tu=""+new URL("sk_mago_10-BJROR30h.png",import.meta.url).href,Eu=""+new URL("sk_mago_11-DgeCLkpn.png",import.meta.url).href,Au=""+new URL("sk_mago_12-DNW7MwiE.png",import.meta.url).href,Ru=""+new URL("sk_mago_13-B3xLYzpF.png",import.meta.url).href,Cu=""+new URL("sk_mago_14-BkU-TOV-.png",import.meta.url).href,Lu=""+new URL("sk_mago_15-B9MA9n-l.png",import.meta.url).href,Pu=""+new URL("sk_passive_01-BybXLWP1.png",import.meta.url).href,Uu=""+new URL("sk_passive_02-yMe2uQlm.png",import.meta.url).href,Du=""+new URL("sk_passive_03-CfLR3Po9.png",import.meta.url).href,Iu=""+new URL("sk_passive_04-BxwW4T3S.png",import.meta.url).href,ku=""+new URL("sk_passive_05-aKrH619S.png",import.meta.url).href,Nu=""+new URL("sk_passive_06-C8qd30Xb.png",import.meta.url).href,Fu=""+new URL("sk_passive_07-C4-U9Z10.png",import.meta.url).href,Ou=""+new URL("sk_passive_08-Ql7Qlb7A.png",import.meta.url).href,Bu=""+new URL("sk_passive_09-DuzOFh2V.png",import.meta.url).href,zu=""+new URL("sk_passive_10-BEytT8Z3.png",import.meta.url).href,Hu=""+new URL("sk_passive_11-BNx9pVVc.png",import.meta.url).href,Gu=""+new URL("sk_passive_12-ChLS0a2U.png",import.meta.url).href,Vu=""+new URL("sk_passive_13-Db0gOpKs.png",import.meta.url).href,Wu=""+new URL("sk_passive_14-Dgyd0quO.png",import.meta.url).href,Xu=""+new URL("sk_passive_15-B_UeHSwf.png",import.meta.url).href,qu=""+new URL("sk_passive_16-TWzCSpNO.png",import.meta.url).href,Dv=""+new URL("bg_guerreiro-DWgmGaUG.jpg",import.meta.url).href,Iv=""+new URL("bg_ladino-B6L4a-g-.jpg",import.meta.url).href,kv=""+new URL("bg_mago-Bct2J94D.jpg",import.meta.url).href,Nv=""+new URL("bg_clerigo-BUhJVnRj.jpg",import.meta.url).href,Fv=Object.assign({"../assets/ui/skills/sk_clerigo_01.png":Td,"../assets/ui/skills/sk_clerigo_02.png":Ed,"../assets/ui/skills/sk_clerigo_03.png":Ad,"../assets/ui/skills/sk_clerigo_04.png":Rd,"../assets/ui/skills/sk_clerigo_05.png":Cd,"../assets/ui/skills/sk_clerigo_06.png":Ld,"../assets/ui/skills/sk_clerigo_07.png":Pd,"../assets/ui/skills/sk_clerigo_08.png":Ud,"../assets/ui/skills/sk_clerigo_09.png":Dd,"../assets/ui/skills/sk_clerigo_10.png":Id,"../assets/ui/skills/sk_clerigo_11.png":kd,"../assets/ui/skills/sk_clerigo_12.png":Nd,"../assets/ui/skills/sk_clerigo_13.png":Fd,"../assets/ui/skills/sk_clerigo_14.png":Od,"../assets/ui/skills/sk_clerigo_15.png":Bd,"../assets/ui/skills/sk_guerreiro_01.png":zd,"../assets/ui/skills/sk_guerreiro_02.png":Hd,"../assets/ui/skills/sk_guerreiro_03.png":Gd,"../assets/ui/skills/sk_guerreiro_04.png":Vd,"../assets/ui/skills/sk_guerreiro_05.png":Wd,"../assets/ui/skills/sk_guerreiro_06.png":Xd,"../assets/ui/skills/sk_guerreiro_07.png":qd,"../assets/ui/skills/sk_guerreiro_08.png":$d,"../assets/ui/skills/sk_guerreiro_09.png":Yd,"../assets/ui/skills/sk_guerreiro_10.png":jd,"../assets/ui/skills/sk_guerreiro_11.png":Zd,"../assets/ui/skills/sk_guerreiro_12.png":Kd,"../assets/ui/skills/sk_guerreiro_13.png":Jd,"../assets/ui/skills/sk_guerreiro_14.png":Qd,"../assets/ui/skills/sk_guerreiro_15.png":tu,"../assets/ui/skills/sk_ladino_01.png":eu,"../assets/ui/skills/sk_ladino_02.png":nu,"../assets/ui/skills/sk_ladino_03.png":iu,"../assets/ui/skills/sk_ladino_04.png":su,"../assets/ui/skills/sk_ladino_05.png":ru,"../assets/ui/skills/sk_ladino_06.png":ou,"../assets/ui/skills/sk_ladino_07.png":au,"../assets/ui/skills/sk_ladino_08.png":lu,"../assets/ui/skills/sk_ladino_09.png":cu,"../assets/ui/skills/sk_ladino_10.png":hu,"../assets/ui/skills/sk_ladino_11.png":du,"../assets/ui/skills/sk_ladino_12.png":uu,"../assets/ui/skills/sk_ladino_13.png":fu,"../assets/ui/skills/sk_ladino_14.png":pu,"../assets/ui/skills/sk_ladino_15.png":mu,"../assets/ui/skills/sk_mago_01.png":gu,"../assets/ui/skills/sk_mago_02.png":_u,"../assets/ui/skills/sk_mago_03.png":xu,"../assets/ui/skills/sk_mago_04.png":vu,"../assets/ui/skills/sk_mago_05.png":bu,"../assets/ui/skills/sk_mago_06.png":Mu,"../assets/ui/skills/sk_mago_07.png":wu,"../assets/ui/skills/sk_mago_08.png":yu,"../assets/ui/skills/sk_mago_09.png":Su,"../assets/ui/skills/sk_mago_10.png":Tu,"../assets/ui/skills/sk_mago_11.png":Eu,"../assets/ui/skills/sk_mago_12.png":Au,"../assets/ui/skills/sk_mago_13.png":Ru,"../assets/ui/skills/sk_mago_14.png":Cu,"../assets/ui/skills/sk_mago_15.png":Lu,"../assets/ui/skills/sk_passive_01.png":Pu,"../assets/ui/skills/sk_passive_02.png":Uu,"../assets/ui/skills/sk_passive_03.png":Du,"../assets/ui/skills/sk_passive_04.png":Iu,"../assets/ui/skills/sk_passive_05.png":ku,"../assets/ui/skills/sk_passive_06.png":Nu,"../assets/ui/skills/sk_passive_07.png":Fu,"../assets/ui/skills/sk_passive_08.png":Ou,"../assets/ui/skills/sk_passive_09.png":Bu,"../assets/ui/skills/sk_passive_10.png":zu,"../assets/ui/skills/sk_passive_11.png":Hu,"../assets/ui/skills/sk_passive_12.png":Gu,"../assets/ui/skills/sk_passive_13.png":Vu,"../assets/ui/skills/sk_passive_14.png":Wu,"../assets/ui/skills/sk_passive_15.png":Xu,"../assets/ui/skills/sk_passive_16.png":qu}),Bl=s=>Fv[`../assets/ui/skills/${s}.png`],Ov=["dmg","mdmg","life","mana","def","mres","prec","crit","critd","eva","aspd","leech","poison","regen","cdr","block"],zl={};Ov.forEach((s,t)=>{const e=Bl(`sk_passive_${String(t+1).padStart(2,"0")}`);e&&(zl[s]=e)});zl.rage=Bl("sk_passive_02");const Sh={dmg:{sym:"⚔",color:"#d9694c",label:"Dano Físico"},mdmg:{sym:"✦",color:"#8a6cff",label:"Dano Mágico"},life:{sym:"❤",color:"#e0564c",label:"Vida"},mana:{sym:"◆",color:"#4f9be0",label:"Mana"},def:{sym:"🛡",color:"#9fb0c4",label:"Defesa"},mres:{sym:"◈",color:"#7fa0d8",label:"Resist. Mágica"},prec:{sym:"◎",color:"#d8c86a",label:"Precisão"},crit:{sym:"✸",color:"#e0b84c",label:"Chance Crítica"},critd:{sym:"✷",color:"#e08a3c",label:"Dano Crítico"},eva:{sym:"≈",color:"#9fd8c0",label:"Evasão"},aspd:{sym:"⚡",color:"#e6d24a",label:"Vel. de Ataque"},leech:{sym:"❦",color:"#c0463c",label:"Roubo de Vida"},poison:{sym:"☣",color:"#7fc04c",label:"Veneno"},regen:{sym:"✚",color:"#7fd08a",label:"Regeneração"},cdr:{sym:"⧗",color:"#c0a0e0",label:"Redução de Recarga"},block:{sym:"⬡",color:"#b8c0cc",label:"Bloqueio"},rage:{sym:"🔥",color:"#e06a3c",label:"Fúria"}},Bv={dmg:.03,mdmg:.03,life:.05,mana:.05,def:2,mres:2,prec:2,crit:.02,critd:.06,eva:.02,aspd:.03,leech:.02,poison:.04,regen:1,cdr:.03,block:.02,rage:.04};function zv(s){const t={};for(const e of Object.values(as))if(e)for(const n of e.branches)for(const i of n.skills){const r=s[i.id]||0;r<=0||i.kind!=="passive"||!i.stat||(t[i.stat]=(t[i.stat]||0)+r*Bv[i.stat])}return t}const Ut=(s,t,e,n,i=1)=>({id:s,name:t,kind:"active",desc:n,maxRank:i,icon:Bl(e)}),re=(s,t,e,n,i=5)=>({id:s,name:t,kind:"passive",desc:n,maxRank:i,stat:e}),Hv={classId:"guerreiro",bg:Dv,branches:[{id:"armas",name:"Armas",color:"#d9a34a",skills:[Ut("g_golpe_poderoso","Golpe Poderoso","sk_guerreiro_01","Um golpe forte que causa dano bruto no alvo.",5),re("g_afiacao","Afiação","dmg","+3% Dano Físico por rank."),Ut("g_investida","Investida","sk_guerreiro_02","Avança até o inimigo e o atordoa por um instante.",3),re("g_precisao","Mira de Guerra","prec","+2 Precisão por rank."),Ut("g_golpe_giratorio","Golpe Giratório","sk_guerreiro_03","Gira a arma acertando todos ao redor.",5),re("g_gume","Gume Cruel","crit","+2% Chance Crítica por rank."),Ut("g_quebra_armadura","Quebra-Armadura","sk_guerreiro_04","Reduz a defesa do alvo por alguns segundos.",3),re("g_brutalidade","Brutalidade","critd","+8% Dano Crítico por rank."),Ut("g_decapitar","Decapitar","sk_guerreiro_05","Executa alvos com pouca vida, dano massivo.",3)]},{id:"baluarte",name:"Baluarte",color:"#9fb0c4",skills:[re("g_pele_ferro","Pele de Ferro","def","+3 Defesa por rank."),Ut("g_provocar","Provocar","sk_guerreiro_06","Força o inimigo a atacar você (aggro).",3),re("g_vigor","Vigor","life","+5% Vida por rank."),Ut("g_muro_escudo","Muro de Escudo","sk_guerreiro_07","Aumenta muito o bloqueio por um tempo.",5),re("g_fortaleza","Fortaleza","mres","+2 Resist. Mágica por rank."),Ut("g_reflexao","Reflexão","sk_guerreiro_08","Ao bloquear, reflete parte do dano.",3),re("g_guarda","Guarda Firme","block","+3% Bloqueio por rank."),Ut("g_aco_absoluto","Aço Absoluto","sk_guerreiro_09","Fica imune a dano por um breve instante.",3),Ut("g_ultimo_suspiro","Último Suspiro","sk_guerreiro_10","Cura ao chegar perto da morte (com recarga).",3)]},{id:"furia",name:"Fúria",color:"#e0623c",skills:[re("g_furia_batalha","Fúria de Batalha","rage","+4% Dano quanto menor a Vida (por rank)."),Ut("g_grito_guerra","Grito de Guerra","sk_guerreiro_11","Grito que aumenta o dano do herói.",5),re("g_sede_sangue","Sede de Sangue","leech","+2% Roubo de Vida por rank."),Ut("g_frenesi","Frenesi","sk_guerreiro_12","Aumenta a velocidade de ataque temporariamente.",5),re("g_adrenalina","Adrenalina","aspd","+3% Vel. de Ataque por rank."),Ut("g_investida_brutal","Investida Brutal","sk_guerreiro_13","Avança causando dano e empurrando o alvo.",3),re("g_folego","Fôlego","regen","+1% Vida regenerada por rank."),Ut("g_terremoto","Terremoto","sk_guerreiro_14","Pisada que atordoa e fere em área.",3),Ut("g_golpe_final","Golpe Final","sk_guerreiro_15","Golpe devastador de recarga longa.",3)]}]},Gv={classId:"ladino",bg:Iv,branches:[{id:"assassino",name:"Assassino",color:"#d94c6a",skills:[Ut("l_apunhalar","Apunhalar","sk_ladino_01","Golpe pelas costas com dano crítico garantido.",5),re("l_precisao_letal","Precisão Letal","crit","+2% Chance Crítica por rank."),Ut("l_rajada_laminas","Rajada de Lâminas","sk_ladino_02","Vários golpes rápidos em sequência.",5),re("l_execucao","Execução","critd","+8% Dano Crítico por rank."),Ut("l_golpe_sombras","Golpe nas Sombras","sk_ladino_03","Teleporta atrás do alvo e ataca.",3),re("l_ponto_fraco","Ponto Fraco","dmg","+3% Dano em alvos com vida cheia (por rank)."),Ut("l_estocada","Estocada Perfurante","sk_ladino_04","Estocada que ignora parte da defesa.",3),Ut("l_execucao_a","Golpe Mortal","sk_ladino_05","Executa alvos com pouca vida.",3)]},{id:"sombra",name:"Sombra",color:"#7fb08a",skills:[re("l_reflexos","Reflexos","eva","+2% Evasão por rank."),Ut("l_passo_sombrio","Passo Sombrio","sk_ladino_06","Esquiva rápida reposicionando o herói.",3),re("l_lamina_env","Lâmina Envenenada","poison","+3% Dano de Veneno por rank."),Ut("l_bomba_fumaca","Bomba de Fumaça","sk_ladino_07","Solta fumaça e aumenta a evasão.",3),re("l_camuflagem","Camuflagem","eva","+2% Evasão ao ficar parado (por rank)."),Ut("l_nuvem_toxica","Nuvem Tóxica","sk_ladino_08","Nuvem venenosa que fere em área.",5),Ut("l_desaparecer","Desaparecer","sk_ladino_09","Some por um instante e zera a ameaça.",3),Ut("l_toxina","Toxina","sk_ladino_10","Aplica um veneno forte no alvo.",5)]},{id:"precisao",name:"Precisão",color:"#d8c86a",skills:[re("l_agilidade","Agilidade","aspd","+3% Vel. de Ataque por rank."),Ut("l_rajada_dupla","Rajada Dupla","sk_ladino_11","Dois golpes rápidos num só toque.",5),re("l_maos_rapidas","Mãos Rápidas","cdr","−2% Recarga por rank."),Ut("l_arremesso","Arremesso de Adaga","sk_ladino_12","Lança uma adaga à distância.",5),re("l_passos_leves","Passos Leves","eva","+2% Evasão ao se mover (por rank)."),Ut("l_contra_ataque","Contra-Ataque","sk_ladino_13","Revida ao esquivar de um golpe.",3),re("l_olhar","Olhar Aguçado","prec","+2 Precisão por rank."),Ut("l_danca_laminas","Dança das Lâminas","sk_ladino_14","Gira acertando vários alvos ao redor.",5),Ut("l_marca_mortal","Marca Mortal","sk_ladino_15","Marca o alvo: ele recebe mais dano.",3)]}]},Vv={classId:"mago",bg:kv,branches:[{id:"chamas",name:"Chamas",color:"#e0672c",skills:[Ut("m_bola_fogo","Bola de Fogo","sk_mago_01","Lança um projétil flamejante no alvo.",5),re("m_piromania","Piromania","mdmg","+3% Dano de Fogo por rank."),Ut("m_explosao_fogo","Explosão de Fogo","sk_mago_02","Explosão que fere em área.",5),re("m_combustao","Combustão","crit","+2% chance de magia crítica por rank."),Ut("m_meteoro","Meteoro","sk_mago_03","Invoca um meteoro devastador em área.",3),re("m_chama_persist","Chama Persistente","poison","+3% Dano de queimadura por rank."),Ut("m_muralha_fogo","Muralha de Fogo","sk_mago_04","Cria uma zona de fogo contínua.",3),Ut("m_imolacao","Imolação","sk_mago_05","Aura ardente que queima inimigos próximos.",5)]},{id:"gelo_arcano",name:"Gelo & Arcano",color:"#4f9be0",skills:[re("m_frieza","Frieza","mres","+2 Resist. Mágica por rank."),Ut("m_nova_gelo","Nova de Gelo","sk_mago_06","Congela os inimigos ao redor.",5),re("m_foco_arcano","Foco Arcano","cdr","−2% Recarga por rank."),Ut("m_lanca_gelo","Lança de Gelo","sk_mago_07","Estilhaço de gelo que perfura.",5),re("m_barreira","Barreira","def","+2 Defesa por rank."),Ut("m_escudo_arcano","Escudo Arcano","sk_mago_08","Escudo que absorve dano por um tempo.",5),Ut("m_teleporte","Teleporte","sk_mago_09","Reposiciona instantaneamente.",3),Ut("m_prisao_gelo","Prisão de Gelo","sk_mago_10","Prende o alvo num bloco de gelo.",3)]},{id:"tempestade",name:"Tempestade",color:"#9a6cff",skills:[Ut("m_raio_arcano","Raio Arcano","sk_mago_11","Raio que atinge o alvo em linha.",5),re("m_conducao","Condução","mdmg","+3% Dano de Raio por rank."),Ut("m_corrente","Corrente","sk_mago_12","Raio que salta entre vários inimigos.",5),re("m_estatica","Estática","crit","+2% chance de atordoar por rank."),Ut("m_tempestade","Tempestade","sk_mago_13","Tempestade que fere em área continuamente.",3),re("m_energia","Energia","mana","+5% Mana por rank."),Ut("m_descarga","Descarga","sk_mago_14","Explosão de energia instantânea.",3),Ut("m_nova_arcana","Nova Arcana","sk_mago_15","Nova arcana que arrasa tudo em volta.",3)]}]},Wv={classId:"clerigo",bg:Nv,branches:[{id:"luz",name:"Luz",color:"#e6d38a",skills:[Ut("c_cura","Cura","sk_clerigo_01","Restaura vida do herói.",5),re("c_fe","Fé","regen","+3% Poder de Cura por rank."),Ut("c_cura_area","Cura em Área","sk_clerigo_02","Cura em volta do herói.",5),re("c_graca","Graça","mana","+4% Regeneração de Mana por rank."),Ut("c_bencao","Bênção","sk_clerigo_03","Abençoa o herói, aumentando atributos.",3),re("c_vigor_divino","Vigor Divino","life","+4% Vida por rank."),Ut("c_aura_protecao","Aura de Proteção","sk_clerigo_04","Reduz o dano recebido por um tempo.",3),Ut("c_renovacao","Renovação","sk_clerigo_05","Cura contínua ao longo do tempo.",5)]},{id:"julgamento",name:"Julgamento",color:"#e0a63c",skills:[Ut("c_martelo_sagrado","Martelo Sagrado","sk_clerigo_06","Golpe de dano sagrado no alvo.",5),re("c_zelo","Zelo","mdmg","+3% Dano Sagrado por rank."),Ut("c_punicao","Punição","sk_clerigo_07","Fere e reduz a cura do alvo.",5),re("c_conviccao","Convicção","dmg","+3% Dano com a vida cheia (por rank)."),Ut("c_luz_radiante","Luz Radiante","sk_clerigo_08","Explosão de luz que fere em área.",5),re("c_fervor","Fervor","aspd","+3% Vel. de conjuração por rank."),Ut("c_selo_sagrado","Selo Sagrado","sk_clerigo_09","Selo que explode após alguns segundos.",3),Ut("c_condenacao","Condenação","sk_clerigo_10","Pilar de luz sagrada de grande dano.",3)]},{id:"fe",name:"Fé",color:"#cbb8e0",skills:[re("c_devocao","Devoção","mres","+2 Resist. Mágica por rank."),Ut("c_escudo_divino","Escudo Divino","sk_clerigo_11","Fica imune a dano por um breve instante.",3),re("c_perseveranca","Perseverança","regen","+1% Vida regenerada por rank."),Ut("c_repreensao","Repreensão","sk_clerigo_12","Clarão que atordoa os inimigos.",3),re("c_martir","Mártir","leech","+2% do dano causado vira cura (por rank)."),Ut("c_intervencao","Intervenção","sk_clerigo_13","Cura forte + escudo instantâneo.",3),Ut("c_ressurreicao","Ressurreição","sk_clerigo_14","Revive automaticamente uma vez (recarga longa).",1),Ut("c_aura_fe","Aura de Fé","sk_clerigo_15","Aura que fortalece o herói continuamente.",5)]}]},as={guerreiro:Hv,ladino:Gv,mago:Vv,clerigo:Wv},$e=(s,t,e)=>({target:"enemy",melee:!0,range:1,effect:"dmg",magic:!1,power:s,mana:t,cd:e}),Re=(s,t,e,n,i=!0)=>({target:"enemy",melee:!1,range:t,effect:"dmg",magic:i,power:s,mana:e,cd:n}),qi=(s,t,e)=>({target:"self",melee:!1,range:0,effect:"heal",magic:!0,power:s,mana:t,cd:e}),qe=s=>({target:"self",melee:!1,range:0,effect:"buff",magic:!1,power:0,mana:s.mana,cd:s.cd,atkMul:s.atkMul,defReduc:s.defReduc,dur:s.dur}),Xv={g_golpe_poderoso:$e(16,12,4e3),g_investida:$e(12,10,6e3),g_golpe_giratorio:$e(16,14,6e3),g_quebra_armadura:$e(12,10,7e3),g_decapitar:$e(26,18,1e4),g_provocar:qe({defReduc:.25,dur:6e3,mana:8,cd:1e4}),g_muro_escudo:qe({defReduc:.5,dur:6e3,mana:14,cd:14e3}),g_reflexao:qe({defReduc:.3,dur:6e3,mana:12,cd:12e3}),g_aco_absoluto:qe({defReduc:.9,dur:3e3,mana:20,cd:2e4}),g_ultimo_suspiro:qi(90,20,16e3),g_grito_guerra:qe({atkMul:1.5,dur:8e3,mana:14,cd:14e3}),g_frenesi:qe({atkMul:1.35,dur:8e3,mana:12,cd:12e3}),g_investida_brutal:$e(18,14,8e3),g_terremoto:$e(24,18,11e3),g_golpe_final:$e(40,30,18e3),l_apunhalar:$e(18,12,4e3),l_rajada_laminas:$e(16,14,6e3),l_golpe_sombras:$e(18,14,7e3),l_estocada:$e(14,10,6e3),l_execucao_a:$e(26,18,1e4),l_passo_sombrio:qe({defReduc:.4,dur:4e3,mana:8,cd:9e3}),l_bomba_fumaca:qe({defReduc:.5,dur:5e3,mana:12,cd:12e3}),l_nuvem_toxica:Re(12,3,14,8e3,!1),l_desaparecer:qe({defReduc:.8,dur:2500,mana:16,cd:16e3}),l_toxina:Re(10,2,10,7e3,!1),l_rajada_dupla:$e(14,10,4e3),l_arremesso:Re(16,4,12,5e3,!1),l_contra_ataque:qe({atkMul:1.3,dur:6e3,mana:10,cd:1e4}),l_danca_laminas:$e(18,16,8e3),l_marca_mortal:Re(10,4,10,9e3,!1),m_bola_fogo:Re(18,5,12,3500),m_explosao_fogo:Re(18,4,14,6e3),m_meteoro:Re(40,5,30,16e3),m_muralha_fogo:Re(16,4,16,9e3),m_imolacao:Re(12,2,12,7e3),m_nova_gelo:Re(16,3,14,6e3),m_lanca_gelo:Re(18,5,12,4500),m_escudo_arcano:qe({defReduc:.5,dur:6e3,mana:14,cd:12e3}),m_teleporte:qe({defReduc:.3,dur:2e3,mana:10,cd:1e4}),m_prisao_gelo:Re(12,4,12,9e3),m_raio_arcano:Re(18,5,12,4e3),m_corrente:Re(16,4,14,6e3),m_tempestade:Re(26,4,20,11e3),m_descarga:Re(18,3,14,6e3),m_nova_arcana:Re(40,4,30,16e3),c_cura:qi(50,12,6e3),c_cura_area:qi(70,18,9e3),c_bencao:qe({atkMul:1.4,dur:1e4,mana:14,cd:14e3}),c_aura_protecao:qe({defReduc:.4,dur:8e3,mana:14,cd:12e3}),c_renovacao:qi(60,16,11e3),c_martelo_sagrado:Re(18,4,12,4e3),c_punicao:Re(16,4,12,6e3),c_luz_radiante:Re(18,3,14,6e3),c_selo_sagrado:Re(24,4,18,9e3),c_condenacao:Re(38,5,28,15e3),c_escudo_divino:qe({defReduc:.9,dur:3e3,mana:20,cd:2e4}),c_repreensao:Re(12,3,12,9e3),c_intervencao:qi(90,22,14e3),c_ressurreicao:qi(150,30,6e4),c_aura_fe:qe({atkMul:1.3,dur:1e4,mana:14,cd:12e3})};function fl(s){return Xv[s]??$e(12,8,4e3)}function qv(s){for(const t in as){const e=as[t];if(e){for(const n of e.branches)for(const i of n.skills)if(i.id===s)return i.name}}return""}function $v(s,t){const e=as[s];if(!e)return[];const n=[];for(const i of e.branches)for(const r of i.skills){if(r.kind!=="active")continue;const a=t[r.id]||0;a<=0||n.push({id:r.id,name:r.name,icon:r.icon,rank:a,combat:fl(r.id)})}return n}const Yv=""+new URL("hud_plate-B2ygb4FP.png",import.meta.url).href,jv=""+new URL("eq_frame-d-QhyRgX.png",import.meta.url).href,Zv=""+new URL("eq_slot-DS9kMsLx.png",import.meta.url).href,$u=""+new URL("eq_container-84uusXC9.png",import.meta.url).href,fa=""+new URL("btn_base-wlebnyD3.png",import.meta.url).href,Kv=""+new URL("dpad-3wZIZEqb.png",import.meta.url).href,Jv=""+new URL("ico_attack-CbdvrLXs.png",import.meta.url).href,Qv=""+new URL("ico_action-BRbeFgHL.png",import.meta.url).href,t1=""+new URL("ico_inventory-B_-_sjLB.png",import.meta.url).href,e1=""+new URL("coin-CsF22FSK.png",import.meta.url).href,pa=""+new URL("map_frame-B4piWonF.png",import.meta.url).href,n1=""+new URL("clock_sun-DO5hSXa1.png",import.meta.url).href,i1=""+new URL("clock_moon-D1xrN5yT.png",import.meta.url).href;function s1(s,t,e,n,i,r,a,o,l){const c={};for(const O of i??[])c[O.id]=O;let h=null;const d={ArrowUp:"forward",KeyW:"forward",ArrowDown:"back",KeyS:"back",ArrowLeft:"turnLeft",KeyA:"turnLeft",ArrowRight:"turnRight",KeyD:"turnRight",KeyQ:"strafeLeft",KeyE:"strafeRight",Space:"interact",Enter:"interact",KeyF:"interact",KeyJ:"attack",KeyK:"attack"};window.addEventListener("keydown",O=>{const Z=d[O.code];Z&&(O.preventDefault(),t(Z))});let u=null,f=null,g=null,_=null,m=null,p=null,w=!1;const M=[];u=document.createElement("div"),u.id="gh-weapon-rig",f=document.createElement("img"),f.id="gh-weapon",f.src=e,f.alt="",u.appendChild(f),g=document.createElement("div"),g.id="gh-slash",g.innerHTML='<svg viewBox="0 0 240 200" preserveAspectRatio="none"><defs><linearGradient id="ghslashg" x1="0" y1="0" x2="1" y2="0.5"><stop offset="0" stop-color="#ffffff" stop-opacity="0"/><stop offset="0.5" stop-color="#eaf6ff" stop-opacity="0.95"/><stop offset="1" stop-color="#bfe3ff" stop-opacity="0"/></linearGradient></defs><path d="M18,64 C82,20 172,30 226,112 C162,70 92,74 26,90 Z" fill="url(#ghslashg)"/><path d="M28,68 C88,30 168,42 214,104" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-opacity="0.85"/></svg>',u.appendChild(g),s.appendChild(u),_=document.createElement("div"),_.id="gh-impact",s.appendChild(_),m=document.createElement("div"),m.id="gh-shock",s.appendChild(m),p=document.createElement("div"),p.id="gh-screenflash",s.appendChild(p);let x=null;const E=document.createElement("div");E.id="gh-hud",E.innerHTML='<div class="gh-hud-bar gh-hud-hp"><div class="gh-hud-fill gh-hud-hp-fill"></div></div><div class="gh-hud-bar gh-hud-mp"><div class="gh-hud-fill gh-hud-mp-fill"></div></div>',s.appendChild(E);const y=E.querySelector(".gh-hud-hp-fill"),R=E.querySelector(".gh-hud-mp-fill"),A=document.createElement("div");A.id="gh-map";const v=document.createElement("canvas");v.id="gh-map-canvas",v.width=132,v.height=132,A.appendChild(v);const b=document.createElement("button");b.id="gh-map-expand",b.title="Expandir mapa (M)",b.innerHTML='<svg viewBox="0 0 24 24" width="14" height="14"><path fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',A.appendChild(b),s.appendChild(A);const C=v.getContext("2d"),U=4,I=document.createElement("div");I.id="gh-bigmap",I.className="gh-bigmap-hidden",I.innerHTML='<div id="gh-bigmap-win"><button id="gh-bigmap-close" title="Fechar (Esc/M)">✕</button><canvas id="gh-bigmap-canvas" width="720" height="720"></canvas></div>',s.appendChild(I);const V=I.querySelector("#gh-bigmap-canvas"),$=V.getContext("2d");let X=null;const rt=()=>!I.classList.contains("gh-bigmap-hidden"),j=(O,Z,Tt,lt,vt)=>{O.save(),O.translate(Z,Tt),O.rotate(vt),O.beginPath(),O.moveTo(lt,0),O.lineTo(-lt*.7,lt*.62),O.lineTo(-lt*.7,-lt*.62),O.closePath(),O.fillStyle="#ffd964",O.shadowColor="rgba(255,210,90,.9)",O.shadowBlur=5,O.fill(),O.restore()},ft=O=>{const Z=C;if(!Z)return;const Tt=window.devicePixelRatio||1,lt=Math.round(v.clientWidth*Tt);lt>0&&v.width!==lt&&(v.width=lt,v.height=lt);const vt=v.width,Et=v.height;Z.clearRect(0,0,vt,Et),Z.fillStyle="#0b0d12",Z.fillRect(0,0,vt,Et);const Ft=U,Ae=2*Ft+1,Gt=Math.floor(vt/Ae),T=Math.floor((vt-Gt*Ae)/2);for(let z=-Ft;z<=Ft;z++)for(let W=-Ft;W<=Ft;W++){const N=O.col+W,q=O.row+z,at=N>=0&&N<O.cols&&q>=0&&q<O.rows;Z.fillStyle=at?O.cells[q*O.cols+N]?"#54606f":"#171b22":"#0b0d12",Z.fillRect(T+(W+Ft)*Gt,T+(z+Ft)*Gt,Gt-1,Gt-1)}const k=T+Ft*Gt+Math.floor(Gt/2);j(Z,k,k,Math.max(4,Gt*.42),Math.atan2(O.dr,O.dc))},xt=O=>{const Z=$;if(!Z)return;const Tt=V.width,lt=V.height;Z.clearRect(0,0,Tt,lt),Z.fillStyle="#0b0d12",Z.fillRect(0,0,Tt,lt);const vt=12,Et=Math.max(3,Math.floor(Math.min((Tt-2*vt)/O.cols,(lt-2*vt)/O.rows))),Ft=Et*O.cols,Ae=Et*O.rows,Gt=Math.round((Tt-Ft)/2),T=Math.round((lt-Ae)/2);for(let k=0;k<O.rows;k++)for(let z=0;z<O.cols;z++)Z.fillStyle=O.cells[k*O.cols+z]?"#5a6675":"#171b22",Z.fillRect(Gt+z*Et,T+k*Et,Et-1,Et-1);j(Z,Gt+O.col*Et+Et/2,T+O.row*Et+Et/2,Math.max(6,Et*.75),Math.atan2(O.dr,O.dc))},Rt=()=>{I.classList.remove("gh-bigmap-hidden"),X&&xt(X)},Wt=()=>I.classList.add("gh-bigmap-hidden");b.addEventListener("click",O=>{O.preventDefault(),Rt()}),I.querySelector("#gh-bigmap-close").addEventListener("click",O=>{O.preventDefault(),Wt()}),I.addEventListener("click",O=>{O.target===I&&Wt()}),window.addEventListener("keydown",O=>{O.code==="KeyM"?(O.preventDefault(),rt()?Wt():Rt()):O.code==="Escape"&&Wt()});const ae=document.createElement("div");ae.id="gh-clock",ae.innerHTML=`<img class="gh-sun" src="${n1}" alt="" draggable="false"/><img class="gh-moon" src="${i1}" alt="" draggable="false"/>`,s.appendChild(ae);const J=ae.querySelector(".gh-sun"),ot=ae.querySelector(".gh-moon"),yt=document.createElement("button");yt.id="gh-char-btn",yt.title="Personagem (C)",yt.innerHTML=`<img class="gh-char-ico" src="${t1}" alt=""/>`,s.appendChild(yt);const mt=[{key:"main",label:"Arma",gc:"1 / 3",gr:"1 / 5"},{key:"off",label:"Secundária",gc:"7 / 9",gr:"1 / 5"},{key:"head",label:"Elmo",gc:"4 / 6",gr:"1 / 3"},{key:"amulet",label:"Amul.",gc:"6 / 7",gr:"2 / 3"},{key:"chest",label:"Peitoral",gc:"4 / 6",gr:"3 / 6"},{key:"ring1",label:"Anel",gc:"3 / 4",gr:"4 / 5"},{key:"ring2",label:"Anel",gc:"6 / 7",gr:"4 / 5"},{key:"hands",label:"Luvas",gc:"2 / 4",gr:"5 / 7"},{key:"belt",label:"Cinto",gc:"4 / 6",gr:"6 / 7"},{key:"feet",label:"Botas",gc:"6 / 8",gr:"5 / 7"}],zt=O=>`<div class="gh-slot" data-slot="${O.key}" title="${O.label}" style="grid-column:${O.gc};grid-row:${O.gr}"></div>`,Yt=Array.from({length:20},(O,Z)=>`<div class="gh-bag-slot" data-bag="${Z}"></div>`).join(""),Ht=document.createElement("div");Ht.id="gh-eq",Ht.className="gh-eq-hidden",Ht.innerHTML='<div id="gh-eq-win"><button id="gh-eq-close" title="Fechar (Esc)">✕</button><div id="gh-eq-inner"><div class="gh-eq-title">Personagem</div><div class="gh-eq-tabs"><button class="gh-tab gh-tab-on" data-tab="equip">Equipamento</button><button class="gh-tab" data-tab="stats">Atributos</button><button class="gh-tab" data-tab="skills">Habilidades</button></div><div class="gh-eq-body"><div class="gh-tabpane" data-pane="equip"><div class="gh-section"><div class="gh-sec-head">Equipamentos</div><div class="gh-eq-doll">'+mt.map(zt).join("")+`</div></div><div class="gh-section"><div class="gh-sec-head gh-sec-inv">Inventário<span class="gh-gold" id="gh-gold"><img src="${e1}" alt=""/><b>0</b></span></div><div class="gh-bag">${Yt}</div></div></div><div class="gh-tabpane gh-pane-hidden" data-pane="stats"><div class="gh-eq-stats" id="gh-eq-stats"></div></div><div class="gh-tabpane gh-pane-hidden" data-pane="skills"><div id="gh-skills"></div></div></div></div></div>`,s.appendChild(Ht),Ht.querySelectorAll(".gh-tab").forEach(O=>O.addEventListener("click",Z=>{Z.preventDefault();const Tt=O.dataset.tab;Ht.querySelectorAll(".gh-tab").forEach(lt=>lt.classList.toggle("gh-tab-on",lt===O)),Ht.querySelectorAll(".gh-tabpane").forEach(lt=>lt.classList.toggle("gh-pane-hidden",lt.dataset.pane!==Tt))}));const Zt=Ht.querySelector("#gh-eq-stats");Zt.addEventListener("click",O=>{const Z=O.target.closest(".gh-pm");if(!Z||Z.hasAttribute("disabled"))return;O.preventDefault();const Tt=Z.dataset.attr,lt=Number(Z.dataset.d||"0");Tt&&lt&&l?.(Tt,lt)});const he=Ht.querySelector("#gh-gold b"),B=Array.from(Ht.querySelectorAll(".gh-bag-slot")),ve=Ht.querySelector("#gh-skills");let te="",Jt=0;const Ct={};let ce=null;const It=()=>Object.values(Ct).reduce((O,Z)=>O+Z,0),L=O=>{const Z=as[te];if(!Z)return null;for(const Tt of Z.branches){const lt=Tt.skills.findIndex(vt=>vt.id===O);if(lt>=0){const vt=Tt.skills[lt],Et=lt>0?Tt.skills[lt-1]:null,Ft=!Et||(Ct[Et.id]||0)>=1,Ae=Ct[O]||0,Gt=Ae>=vt.maxRank,T=Jt-It();return{sk:vt,unlocked:Ft,rank:Ae,maxed:Gt,canBuy:Ft&&!Gt&&T>0}}}return null},S=()=>{const O=as[te];if(!O){ve.innerHTML='<div class="gh-sk-soon">A árvore de habilidades desta classe chega em breve.</div>';return}const Z=Jt-It(),Tt=O.branches.map(Ft=>{const Ae=Ft.skills.map((Gt,T)=>{const k=Ct[Gt.id]||0,z=T>0?Ft.skills[T-1]:null,W=!z||(Ct[z.id]||0)>=1,N=k>=Gt.maxRank,q=W&&!N&&Z>0,at=Gt.kind==="active"?"gh-sk-active":"gh-sk-passive",At=[k>0?"gh-sk-on":"",W?"":"gh-sk-locked",q?"gh-sk-buy":"",Gt.id===ce?"gh-sk-sel":""].join(" "),Lt=Gt.stat?zl[Gt.stat]:void 0,$t=Gt.kind==="active"&&Gt.icon?`<img src="${Gt.icon}" alt=""/>`:Lt?`<img src="${Lt}" alt=""/>`:`<span class="gh-sk-sym" style="color:${Gt.stat?Sh[Gt.stat].color:"#ccc"}">${Gt.stat?Sh[Gt.stat].sym:"?"}</span>`;return`${T>0?`<div class="gh-sk-line" style="background:${Ft.color}"></div>`:""}<button class="gh-sk-node ${at} ${At}" data-sk="${Gt.id}">${$t}<span class="gh-sk-rank">${k}/${Gt.maxRank}</span></button>`}).join("");return`<div class="gh-sk-branch"><div class="gh-sk-bhead" style="color:${Ft.color}">${Ft.name}</div>${Ae}</div>`}).join("");let lt='<div class="gh-sk-thint">Toque num nó pra ver os detalhes; depois confirme para gastar o ponto.</div>';const vt=ce?L(ce):null;if(vt){const{sk:Ft,unlocked:Ae,rank:Gt,maxed:T,canBuy:k}=vt;let z;T?z='<span class="gh-sk-cbtn gh-sk-cdim">No máximo</span>':Ae?k?z=`<button class="gh-sk-cbtn gh-sk-cbuy" id="gh-sk-confirm">${Gt>0?`Melhorar → ${Gt+1}/${Ft.maxRank}`:"Aprender"} · 1 ponto</button>`:z='<span class="gh-sk-cbtn gh-sk-cdim">Sem pontos</span>':z='<span class="gh-sk-cbtn gh-sk-cdim">Requer o nó acima</span>',lt=`<div class="gh-sk-tname"><b>${Ft.name}</b> <i>${Ft.kind==="active"?"Ativa":"Passiva"} · ${Gt}/${Ft.maxRank}</i></div><div class="gh-sk-tdesc">${Ft.desc}</div>${z}`}ve.innerHTML=`<div class="gh-sk-top">Pontos: <b class="${Z>0?"gh-sk-pts":""}">${Z}</b></div><div class="gh-sk-cols">${Tt}</div><div class="gh-sk-tip" id="gh-sk-tip">${lt}</div>`,O.bg?(ve.style.backgroundImage=`linear-gradient(rgba(7,7,11,.66), rgba(7,7,11,.66)), url(${O.bg})`,ve.style.backgroundSize="cover",ve.style.backgroundPosition="center top",ve.style.backgroundRepeat="no-repeat"):ve.style.backgroundImage="",ve.querySelectorAll(".gh-sk-node").forEach(Ft=>{Ft.addEventListener("click",()=>{ce=Ft.dataset.sk,S()})});const Et=ve.querySelector("#gh-sk-confirm");Et&&Et.addEventListener("click",()=>{const Ft=ce?L(ce):null;Ft&&Ft.canBuy&&(Ct[Ft.sk.id]=Ft.rank+1,S(),a?.(Ct))})},G=()=>Ht.classList.remove("gh-eq-hidden"),tt=()=>Ht.classList.add("gh-eq-hidden"),et=()=>Ht.classList.contains("gh-eq-hidden")?G():tt();yt.addEventListener("click",O=>{O.preventDefault(),et()}),Ht.querySelector("#gh-eq-close").addEventListener("click",O=>{O.preventDefault(),tt()}),Ht.addEventListener("click",O=>{O.target===Ht&&tt()}),window.addEventListener("keydown",O=>{O.code==="KeyC"?(O.preventDefault(),et()):O.code==="Escape"&&tt()});const Q=document.createElement("div");Q.id="gh-dmg",s.appendChild(Q);const St=document.createElement("div");St.id="gh-toast",s.appendChild(St);const ht=document.createElement("div");ht.id="gh-cast",ht.innerHTML='<span class="gh-cast-name"></span><span class="gh-cast-frame"><span class="gh-cast-track"><i class="gh-cast-fill"></i></span></span>',s.appendChild(ht);const Mt=ht.querySelector(".gh-cast-name"),ee=ht.querySelector(".gh-cast-fill");let it=0;const bt=document.createElement("div");bt.id="gh-float",s.appendChild(bt);const Pt=document.createElement("div");Pt.id="pad",s.appendChild(Pt);const Nt=O=>`<img class="gh-btn-ico" src="${O}" alt="" draggable="false"/>`,wt=(O,Z)=>{let Tt;const lt=Et=>{Et.preventDefault(),t(Z),Tt=window.setInterval(()=>t(Z),Sd)},vt=()=>{Tt&&window.clearInterval(Tt),Tt=void 0};O.addEventListener("pointerdown",lt),O.addEventListener("pointerup",vt),O.addEventListener("pointerleave",vt),O.addEventListener("pointercancel",vt),O.addEventListener("contextmenu",Et=>Et.preventDefault())},jt=document.createElement("div");jt.className="gh-cluster gh-move";const Xt=(O,Z)=>{const Tt=document.createElement("button");return Tt.className="gh-dtap "+Z,wt(Tt,O),Tt};jt.appendChild(Xt("forward","gh-dup")),jt.appendChild(Xt("back","gh-ddown")),jt.appendChild(Xt("turnLeft","gh-dleft")),jt.appendChild(Xt("turnRight","gh-dright")),Pt.appendChild(jt);const le=document.createElement("button");le.className="gh-btn gh-act",le.innerHTML=Nt(Qv);const F=O=>{O.preventDefault(),t("interact")};le.addEventListener("pointerdown",F),le.addEventListener("contextmenu",O=>O.preventDefault()),Pt.appendChild(le);let dt=null;{dt=document.createElement("button"),dt.className="gh-btn gh-atk",dt.innerHTML=Nt(Jv);const O=Z=>{Z.preventDefault(),t("attack")};dt.addEventListener("pointerdown",O),dt.addEventListener("contextmenu",Z=>Z.preventDefault()),Pt.appendChild(dt)}const Y=document.createElement("div");Y.id="gh-actbar",Pt.appendChild(Y);const H=46,nt=47,st=51,pt=116,Vt=176,ie=(O,Z,Tt=pt,lt=Vt)=>{const vt=[];for(let Et=0;Et<O;Et++){const Ae=(O===1?(Tt+lt)/2:Tt+(lt-Tt)*Et/(O-1))*Math.PI/180,Gt=nt+Z*-Math.cos(Ae),T=st+Z*Math.sin(Ae);vt.push({right:Math.round(Gt-H/2),bottom:Math.round(T-H/2)})}return vt},oe=O=>{const Z=Math.ceil(O/2);return[...ie(Z,98),...ie(O-Z,150)]},ye=6,Be=O=>{const Z=ye,Tt=oe(Z);let lt="";for(let vt=0;vt<Z;vt++){const Et=Tt[vt]??{right:47,bottom:51},Ft=O[vt];Ft?lt+=`<button class="gh-sslot" data-skill="${Ft.id}" title="${Ft.name}" style="right:${Et.right}px;bottom:${Et.bottom}px">`+(Ft.icon?`<img src="${Ft.icon}" alt=""/>`:'<span class="gh-ss-x">✦</span>')+'<span class="gh-ss-cool"></span><span class="gh-ss-cd"></span></button>':lt+=`<span class="gh-sslot gh-ss-empty" style="right:${Et.right}px;bottom:${Et.bottom}px"><span class="gh-ss-rune">◈</span></span>`}Y.innerHTML=lt,Y.style.display="block",Y.querySelectorAll(".gh-sslot[data-skill]").forEach(vt=>{vt.addEventListener("pointerdown",Et=>{Et.preventDefault();const Ft=vt.dataset.skill;Ft&&o?.(Ft)}),vt.addEventListener("contextmenu",Et=>Et.preventDefault())})};Be([]);const Ge=document.createElement("div");Ge.id="gh-prompt",Ge.style.display="none",Pt.appendChild(Ge);const ke=document.createElement("div");ke.id="gh-dialogue",ke.style.display="none",ke.innerHTML='<img class="gh-dlg-portrait" alt="" /><div class="gh-dlg-body"><div class="gh-dlg-name"></div><div class="gh-dlg-text"></div><div class="gh-dlg-hint">toque para continuar ▸</div></div>',ke.addEventListener("pointerdown",O=>{O.preventDefault(),t("interact")}),Pt.appendChild(ke);const Je=ke.querySelector(".gh-dlg-name"),Qe=ke.querySelector(".gh-dlg-text"),rn=ke.querySelector(".gh-dlg-portrait");return r1(),{setPrompt(O){O?(Ge.textContent=O,Ge.style.display="block",le.classList.add("gh-act-on")):(Ge.style.display="none",le.classList.remove("gh-act-on"))},showDialogue(O,Z,Tt){Je.textContent=O,Qe.textContent=Z,Tt?(rn.src=Tt,rn.style.display="block"):(rn.removeAttribute("src"),rn.style.display="none"),ke.style.display="flex",Ge.style.display="none"},hideDialogue(){ke.style.display="none"},setHealth(O){const Z=Math.max(0,Math.min(1,O));y.style.width=Z*100+"%",y.style.background=Z>.5?"linear-gradient(#e35d4c,#b3241a)":Z>.25?"linear-gradient(#e08a2c,#9a4a10)":"linear-gradient(#c23a24,#7a1610)"},setMana(O){const Z=Math.max(0,Math.min(1,O));R.style.width=Z*100+"%"},setStats(O){he&&(he.textContent=`${O.gold}`);const Z=O.xpMax>0?Math.max(0,Math.min(1,O.xp/O.xpMax)):0,Tt=(vt,Et,Ft,Ae)=>{const Gt=Ft<=Ae||O.points<0?" disabled":"",T=O.points<=0?" disabled":"";return`<div class="gh-prow"><span>${vt}</span><span class="gh-pstep"><button class="gh-pm" data-attr="${Et}" data-d="-1"${Gt}>−</button><b>${Ft}</b><button class="gh-pm" data-attr="${Et}" data-d="1"${T}>＋</button></span></div>`},lt=(vt,Et)=>`<div class="gh-sec-row"><span>${vt}</span><b>${Et}</b></div>`;Zt.innerHTML=`<div class="gh-eq-lvl">Nível ${O.level}<div class="gh-xp"><div class="gh-xp-fill" style="width:${Z*100}%"></div></div></div><div class="gh-alloc-pts${O.points>0?" gh-pts-on":""}">Pontos a distribuir: <b>${O.points}</b></div><div class="gh-prim-box">`+Tt("Força","str",O.str,O.strMin)+Tt("Destreza","dex",O.dex,O.dexMin)+Tt("Inteligência","int",O.int,O.intMin)+'</div><div class="gh-sec-blocks"><div class="gh-sec-col"><h4>⚔️ Ofensivo</h4>'+lt("Atq. Físico",O.atk)+lt("Atq. Mágico",O.atkMag)+lt("Crítico",O.crit+"%")+lt("Dano Crít.",O.critDmg+"%")+lt("Precisão",O.precision+"%")+'</div><div class="gh-sec-col"><h4>🛡️ Defensivo</h4>'+lt("Vida",`${O.hp}/${O.hpMax}`)+lt("Defesa",O.def)+lt("Res. Mágica",O.magRes)+lt("Evasão",O.evasion+"%")+'</div><div class="gh-sec-col"><h4>🔷 Recursos</h4>'+lt("Mana",`${O.mp}/${O.mpMax}`)+lt("Ouro",O.gold)+"</div></div>"},flashDamage(){Q.style.animation="none",Q.offsetWidth,Q.style.animation="gh-dmg 360ms ease-out"},swingWeapon(){if(!f||!h||h.slot!=="main"||w)return-1;w=!0,M.forEach(q=>window.clearTimeout(q)),M.length=0,x||(x=s.querySelector("canvas"));const O=u,Z=Pv[h.style],Tt=Z.windup+Z.strike+Z.recover,lt=h.cooldown??Z.cooldown,vt=Math.round(Z.windup+Z.strike*.45),Et=Z.windup/Tt,Ft=vt/Tt,Ae=(Z.windup+Z.strike)/Tt,Gt=Z.weight,T=q=>`perspective(760px) rotateY(${q.ry}deg) rotateX(${q.rx}deg) rotateZ(${q.rz}deg) translate(${q.tx}%,${q.ty}%) scale(${q.s})`,k="drop-shadow(-6px 2px 8px rgba(0,0,0,0.45))",z=q=>`${k} blur(${q}px)`;if(O.getAnimations?.().forEach(q=>q.cancel()),O.animate([{transform:T(yh),filter:z(0),offset:0},{transform:T(Z.wind),filter:z(0),offset:Et},{transform:T(Z.hit),filter:z(Math.min(3,1.6*Gt)),offset:Ft},{transform:T(Z.follow),filter:z(.3),offset:Ae},{transform:T(yh),filter:z(0),offset:1}],{duration:Tt,easing:"ease-out",fill:"both"}),Z.imgSpin&&f){f.getAnimations?.().forEach(At=>At.cancel());const q=Z.imgSpin,at=At=>`perspective(620px) rotateY(${At}deg)`;f.animate([{transform:at(0),offset:0},{transform:at(q.wind),offset:Et},{transform:at(q.hit),offset:Ft},{transform:at(q.follow),offset:Ae},{transform:at(0),offset:1}],{duration:Tt,easing:"ease-out",fill:"both"})}const W=Z.fx==="arcBig"||Z.fx==="smashwave",N=Z.fx==="smashwave";return M.push(window.setTimeout(()=>{if(g)if(g.getAnimations?.().forEach(q=>q.cancel()),Z.fx==="streak")g.animate([{opacity:0,transform:"rotate(-4deg) scaleX(0.35) scaleY(0.5)"},{opacity:.9,transform:"rotate(-4deg) scaleX(1.15) scaleY(0.62)",offset:.3},{opacity:0,transform:"rotate(-4deg) scaleX(1.35) scaleY(0.66)"}],{duration:190,easing:"ease-out"});else if(N)g.animate([{opacity:0,transform:"rotate(-8deg) scale(0.9)"},{opacity:.5,transform:"rotate(-8deg) scale(1.5) translateY(6%)",offset:.28},{opacity:0,transform:"rotate(-8deg) scale(1.75) translateY(10%)"}],{duration:230,easing:"ease-out"});else{const q=Z.fx==="arcBig"?1.34:1;g.animate([{opacity:0,transform:`rotate(-8deg) scale(${.7*q})`},{opacity:.98,transform:`rotate(-8deg) scale(${1*q})`,offset:.26},{opacity:0,transform:`rotate(-8deg) scale(${1.14*q})`}],{duration:220,easing:"ease-out"})}if(m&&W){m.getAnimations?.().forEach(at=>at.cancel());const q=N?1.55:1.05;m.animate([{opacity:0,transform:"translate(-50%,-50%) scale(0.2)"},{opacity:N?.95:.8,transform:`translate(-50%,-50%) scale(${.72*q})`,offset:.22},{opacity:0,transform:`translate(-50%,-50%) scale(${1.4*q})`}],{duration:Math.round(240+Gt*80),easing:"ease-out"})}if(_){_.getAnimations?.().forEach(at=>at.cancel());const q=Math.max(.85,.7+.42*(Gt-1)+.42);_.animate([{opacity:0,transform:"scale(0.4)"},{opacity:Math.min(1,.66+.16*Gt),transform:`scale(${q})`,offset:.26},{opacity:0,transform:`scale(${1.5*(.9+.18*Gt)})`}],{duration:Math.round(190+Gt*60),easing:"ease-out"})}if(p&&N&&(p.getAnimations?.().forEach(q=>q.cancel()),p.animate([{opacity:0},{opacity:.55,offset:.18},{opacity:0}],{duration:220,easing:"ease-out"})),x){x.getAnimations?.().forEach(at=>at.cancel());const q=Gt;N?x.animate([{transform:"translate(0,0) scale(1)"},{transform:`translate(${-1.1*q}%,${1.3*q}%) scale(${1+.024*q}) rotate(${-.6*q}deg)`,offset:.14},{transform:`translate(${.7*q}%,${-.6*q}%) scale(${1+.012*q}) rotate(${.4*q}deg)`,offset:.34},{transform:`translate(${-.5*q}%,${.5*q}%) scale(${1+.006*q}) rotate(${-.2*q}deg)`,offset:.56},{transform:"translate(0,0) scale(1)"}],{duration:Math.round(280+Gt*55),easing:"ease-out"}):x.animate([{transform:"translate(0,0) scale(1)"},{transform:`translate(${-.8*q}%,${1*q}%) scale(${1+.018*q}) rotate(${-.45*q}deg)`,offset:.18},{transform:`translate(${.45*q}%,${-.35*q}%) scale(${1+.005*q}) rotate(${.18*q}deg)`,offset:.46},{transform:"translate(0,0) scale(1)"}],{duration:Math.round(200+Gt*45),easing:"ease-out"})}},vt)),M.push(window.setTimeout(()=>w=!1,lt)),vt},setInventory(O){B.forEach((Z,Tt)=>{const lt=O[Tt];Z.onclick=null,lt&&c[lt]?(Z.dataset.wid=lt,Z.innerHTML=`<img class="gh-item-ico" src="${c[lt].url}" alt="" title="${c[lt].name}"/>`,Z.onclick=()=>this.equipWeapon(lt)):(delete Z.dataset.wid,Z.innerHTML="")})},equipWeapon(O){const Z=c[O];if(!Z)return;const Tt=vt=>{const Et=Ht.querySelector(`.gh-slot[data-slot="${vt}"]`);Et&&(Et.innerHTML=`<img class="gh-item-ico" src="${Z.url}" alt="" title="${Z.name}"/>`)};Z.slot==="off"?Tt("off"):(h=Z,w=!1,M.forEach(vt=>window.clearTimeout(vt)),M.length=0,u?.getAnimations?.().forEach(vt=>vt.cancel()),f?.getAnimations?.().forEach(vt=>vt.cancel()),f.style.transform="",f.src=Z.url,u&&(u.style.height=`${(62*Z.scale).toFixed(1)}vh`,u.style.maxHeight=`${Math.round(640*Z.scale)}px`),s.classList.toggle("gh-wpn-arcane",Z.tint==="arcane"),Tt("main"),r?.(Z)),B.forEach(vt=>vt.classList.remove("gh-slot-pulse"));const lt=Ht.querySelector(`.gh-bag-slot[data-wid="${O}"]`);lt&&(lt.classList.remove("gh-slot-pulse"),lt.offsetWidth,lt.classList.add("gh-slot-pulse"))},updateMinimap(O){X=O,ft(O),rt()&&xt(O)},setSkillInfo(O,Z){te=O,Jt=Z,S()},setActionBar(O){Be(O)},setSkillCooldown(O,Z,Tt){const lt=Y.querySelector(`.gh-sslot[data-skill="${O}"]`);if(!lt)return;const vt=lt.querySelector(".gh-ss-cool"),Et=lt.querySelector(".gh-ss-cd");if(Z<=0){vt&&(vt.style.opacity="0",vt.style.setProperty("--gh-cd","0deg")),Et&&(Et.textContent="");return}vt&&(vt.style.opacity="1",vt.style.setProperty("--gh-cd",(Math.max(0,Math.min(1,Z))*360).toFixed(1)+"deg")),Et&&(Et.textContent=String(Tt))},skillManaFloat(O,Z){const Tt=Y.querySelector(`.gh-sslot[data-skill="${O}"]`);if(!Tt)return;const lt=Tt.getBoundingClientRect();this.floatText(lt.left+lt.width/2,lt.top-2,`-${Z}`,"mana")},floatText(O,Z,Tt,lt){const vt=document.createElement("div");vt.className="gh-float-n gh-fl-"+lt,vt.textContent=Tt;const Et=Math.abs(O*7+Z*13)%24-12|0;vt.style.left=O+Et+"px",vt.style.top=Z+"px",bt.appendChild(vt),window.setTimeout(()=>vt.remove(),1e3)},toast(O){St.textContent=O,St.style.animation="none",St.offsetWidth,St.style.animation="gh-toast 1.8s ease-out"},castBar(O,Z){it&&window.clearTimeout(it),Mt.textContent=O,ht.classList.add("gh-cast-on"),ee.style.transition="none",ee.style.width="0%",ee.offsetWidth,ee.style.transition=`width ${Z}ms linear`,ee.style.width="100%",it=window.setTimeout(()=>{ht.classList.remove("gh-cast-on"),it=0},Z)},cancelCast(){it&&window.clearTimeout(it),it=0,ht.classList.remove("gh-cast-on")},setClock(O,Z){const Tt=(O-.25)*Math.PI*2,lt=33,vt=(Ft,Ae)=>{const Gt=Math.sin(Ae),T=-Math.cos(Ae);Ft.style.left=50+Gt*lt+"%",Ft.style.top=50+T*lt+"%"};vt(J,Tt),vt(ot,Tt+Math.PI);const Et=Math.max(0,Math.min(1,Z));J.style.opacity=(.28+.72*Et).toFixed(3),ot.style.opacity=(.28+.72*(1-Et)).toFixed(3),J.style.filter=`drop-shadow(0 0 ${(3+7*Et).toFixed(1)}px rgba(240,180,70,${(.5*Et+.15).toFixed(2)}))`,ot.style.filter=`drop-shadow(0 0 ${(3+7*(1-Et)).toFixed(1)}px rgba(150,190,255,${(.5*(1-Et)+.15).toFixed(2)}))`}}}function r1(){if(document.getElementById("gh-style"))return;const s=document.createElement("style");s.id="gh-style",s.textContent=`
  /* rig da arma: base à direita, punho no canto inferior. A rotação 3D do golpe
     é aplicada AQUI, e a espada + o rastro de corte (filhos) giram juntos, então
     o corte segue a lâmina de forma travada. perspective() habilita rotação 3D
     (rotateX/Y) — é o que dá a PROFUNDIDADE. */
  #gh-weapon-rig {
    position:fixed; right:6%; bottom:-4%;
    height:62vh; max-height:640px;
    pointer-events:none; z-index:8;
    transform-origin:72% 90%;
    transform:perspective(760px) rotateX(0deg) rotateY(0deg) rotateZ(16deg) translate(0,2%) scale(1); /* REPOUSO */
    filter:drop-shadow(-6px 2px 8px rgba(0,0,0,0.45));
    will-change:transform, filter;
    backface-visibility:hidden;
  }
  #gh-weapon {
    display:block; height:100%; width:auto;
    pointer-events:none;
    /* pivô no CENTRO da imagem: o "giro de papel" (rotateY da própria arte) roda
       em torno da linha vertical central dela, não do punho */
    transform-origin:50% 50%;
    backface-visibility:hidden;
  }
  /* sprite de golpe: já vem na diagonal com o rastro pintado, então tem base
     e pivô próprios (punho no canto inferior-direito), escondido até o golpe */
  #gh-weapon-atk {
    position:fixed; right:0%; bottom:-6%;
    height:72vh; max-height:720px; width:auto;
    pointer-events:none; z-index:9; opacity:0;
    transform-origin:82% 86%;
    transform:translate(0,0) rotate(0deg) scale(1);
    filter:drop-shadow(-6px 2px 8px rgba(0,0,0,0.45));
    will-change:transform, opacity;
  }
  /* O golpe é em 3 fases encadeadas (cada uma começa onde a anterior parou,
     com fill 'forwards'), disparadas por timers no mesmo relógio do corte, do
     clarão e do tranco de câmera. A PROFUNDIDADE vem de 3 coisas juntas:
       (1) rotateY/rotateX 3D — a lâmina gira no espaço em direção à câmera;
       (2) escala: recua encolhendo (longe) e avança crescendo além de 1 (perto);
       (3) borrão de velocidade (blur) no pico do golpe.
     Poses-chave (perspective fixa em 760px):
       REPOUSO   rotY 0   rotX 0    rotZ 16   scale 1     (blur 0)
       ARMAR     rotY -26 rotX 10   rotZ 34   scale 0.82  (recua/afasta)
       ESTOCADA  rotY 30  rotX -14  rotZ -46  scale 1.42  (avança/aproxima, blur)
       SEGUIR    rotY 10  rotX -4   rotZ -26  scale 1.08 */
  @keyframes gh-windup {
    0%   { transform:perspective(760px) rotateY(0deg)   rotateX(0deg)  rotateZ(16deg) translate(0,2%)  scale(1);    filter:drop-shadow(-6px 2px 8px rgba(0,0,0,0.45)); }
    100% { transform:perspective(760px) rotateY(-26deg) rotateX(10deg) rotateZ(34deg) translate(11%,9%) scale(0.82); filter:drop-shadow(-6px 2px 8px rgba(0,0,0,0.45)); }
  }
  @keyframes gh-slashonly { /* avança pra dentro da cena, borrando no auge */
    0%   { transform:perspective(760px) rotateY(-26deg) rotateX(10deg)  rotateZ(34deg)  translate(11%,9%)   scale(0.82); filter:drop-shadow(-6px 2px 8px rgba(0,0,0,0.45)) blur(0px); }
    45%  { transform:perspective(760px) rotateY(30deg)  rotateX(-14deg) rotateZ(-46deg) translate(-30%,-8%) scale(1.42); filter:drop-shadow(-10px 4px 12px rgba(0,0,0,0.5)) blur(2.4px); }
    72%  { transform:perspective(760px) rotateY(12deg)  rotateX(-6deg)  rotateZ(-30deg) translate(-18%,4%)  scale(1.14); filter:drop-shadow(-8px 3px 10px rgba(0,0,0,0.48)) blur(0.4px); }
    100% { transform:perspective(760px) rotateY(10deg)  rotateX(-4deg)  rotateZ(-26deg) translate(-14%,6%)  scale(1.08); filter:drop-shadow(-6px 2px 8px rgba(0,0,0,0.45)) blur(0px); }
  }
  @keyframes gh-slashpose { /* 2º sprite (pose já diagonal): estocada rápida */
    0%   { transform:translate(12%,9%)   rotate(10deg)  scale(0.9);  opacity:0.85; }
    40%  { transform:translate(-2%,-2%)  rotate(-4deg)  scale(1.14); opacity:1;    }
    100% { transform:translate(-14%,-7%) rotate(-13deg) scale(1.05); opacity:0.85; }
  }
  @keyframes gh-recover {
    0%   { transform:perspective(760px) rotateY(10deg) rotateX(-4deg) rotateZ(-26deg) translate(-14%,6%) scale(1.08); }
    100% { transform:perspective(760px) rotateY(0deg)  rotateX(0deg)  rotateZ(16deg)  translate(0,2%)    scale(1);    }
  }
  /* tranco de câmera no impacto: o canvas dá um solavanco curto (recua girando
     de leve e volta) — vende o baque do golpe e reforça a profundidade */
  @keyframes gh-kick {
    0%   { transform:translate(0,0)      scale(1);     }
    18%  { transform:translate(-0.9%,1.1%) scale(1.022) rotate(-0.5deg); }
    46%  { transform:translate(0.5%,-0.4%) scale(1.006) rotate(0.2deg);  }
    100% { transform:translate(0,0)      scale(1);     }
  }
  /* clarão radial de impacto no ponto onde a lâmina corta */
  #gh-impact {
    position:fixed; right:26%; top:26%;
    width:30vh; height:30vh; max-width:330px; max-height:330px;
    pointer-events:none; z-index:9; opacity:0;
    border-radius:50%;
    background:radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(210,235,255,0.55) 32%, rgba(180,220,255,0) 70%);
    mix-blend-mode:screen;
  }
  /* onda de choque: anel que estoura no ponto do baque (golpes pesados) */
  #gh-shock {
    position:fixed; left:52%; top:44%;
    width:34vh; height:34vh; max-width:380px; max-height:380px;
    transform:translate(-50%,-50%) scale(0.2);
    pointer-events:none; z-index:9; opacity:0; border-radius:50%;
    border:0.8vh solid rgba(255,238,205,0.92);
    box-shadow:0 0 26px rgba(255,222,170,0.6), inset 0 0 22px rgba(255,222,170,0.45);
    mix-blend-mode:screen;
  }
  /* lampejo curto na tela inteira no impacto rombudo */
  #gh-screenflash {
    position:fixed; inset:0; pointer-events:none; z-index:7; opacity:0;
    background:radial-gradient(circle at 52% 44%, rgba(255,246,225,0.6), rgba(255,240,210,0) 62%);
    mix-blend-mode:screen;
  }
  .gh-wpn-arcane #gh-shock {
    border-color:rgba(214,186,255,0.92);
    box-shadow:0 0 26px rgba(186,150,255,0.6), inset 0 0 22px rgba(186,150,255,0.45);
  }
  @keyframes gh-flash {
    0%   { opacity:0;   transform:scale(0.4); }
    26%  { opacity:0.9; transform:scale(1);   }
    100% { opacity:0;   transform:scale(1.5); }
  }
  /* rastro de corte: fica DENTRO do rig, encostado no fio da lâmina, e por isso
     gira junto com a espada (segue a lâmina). A animação dele é só de opacidade
     (pisca no golpe) + um leve "abrir" — a posição vem do rig. */
  #gh-slash {
    position:absolute;
    left:-118%; top:-16%; width:250%; height:66%;
    pointer-events:none; z-index:2; opacity:0;
    transform-origin:78% 88%; transform:rotate(-8deg) scale(1);
    filter:drop-shadow(0 0 7px rgba(180,225,255,0.9));
  }
  #gh-slash svg { width:100%; height:100%; display:block; }
  @keyframes gh-slash-fade {
    0%   { opacity:0;    transform:rotate(-8deg) scale(0.7); }
    26%  { opacity:0.95; transform:rotate(-8deg) scale(1);   }
    100% { opacity:0;    transform:rotate(-8deg) scale(1.12); }
  }
  /* arma arcana (cajado/orbe): rastro e clarão em tom roxo em vez de branco-azul */
  .gh-wpn-arcane #gh-slash {
    filter:drop-shadow(0 0 8px rgba(196,150,255,0.9)) hue-rotate(212deg) saturate(1.35);
  }
  .gh-wpn-arcane #gh-impact {
    background:radial-gradient(circle, rgba(232,214,255,0.95) 0%, rgba(186,150,255,0.55) 32%, rgba(160,120,255,0) 70%);
  }
  /* placa de status (vida + mana) — arte com encaixes preenchidos por código */
  #gh-hud {
    position:fixed; left:12px; top:10px; z-index:11; pointer-events:none;
    width:min(230px,40vw); aspect-ratio:793 / 336;
    background:url(${Yv}) no-repeat center / 100% 100%;
    filter:drop-shadow(0 2px 5px rgba(0,0,0,.55));
  }
  .gh-hud-bar {
    position:absolute; left:19.2%; width:72.2%; overflow:hidden;
    border-radius:999px;
  }
  .gh-hud-hp { top:22.9%; height:17.6%; }
  .gh-hud-mp { top:56.9%; height:17.3%; }
  /* MAPA (canto superior direito): moldura 9-slice + canvas do minimapa no miolo */
  #gh-map {
    position:fixed; right:12px; top:10px; z-index:11; pointer-events:none;
    width:min(118px,27vw); aspect-ratio:1; box-sizing:border-box;
    border:clamp(13px,3.6vw,20px) solid transparent;
    border-image:url(${pa}) 130 repeat;
    filter:drop-shadow(0 2px 6px rgba(0,0,0,.55));
  }
  #gh-map-canvas {
    position:absolute; inset:0; width:100%; height:100%;
    border-radius:2px; image-rendering:auto;
  }
  /* botão de expandir o mapa (canto inferior direito do minimapa) */
  #gh-map-expand {
    position:absolute; right:2px; bottom:2px; z-index:3; pointer-events:auto;
    width:22px; height:22px; border-radius:6px; cursor:pointer; padding:0;
    display:flex; align-items:center; justify-content:center;
    color:#f0dca2; background:linear-gradient(#2b2218,#160f08);
    border:1.5px solid rgba(201,162,39,.6);
    box-shadow:0 1px 3px rgba(0,0,0,.6);
  }
  #gh-map-expand:hover { color:#fff; border-color:#f4c847; }
  #gh-map-expand:active { transform:scale(.9); }
  /* mapa GRANDE (overlay estilo PoE/Diablo) */
  #gh-bigmap {
    position:fixed; inset:0; z-index:19; pointer-events:auto;
    display:flex; align-items:center; justify-content:center;
    background:rgba(4,5,9,.72);
  }
  #gh-bigmap.gh-bigmap-hidden { display:none; }
  #gh-bigmap-win {
    position:relative; width:min(88vw,88vh); aspect-ratio:1; box-sizing:border-box;
    border:clamp(20px,6vw,42px) solid transparent;
    border-image:url(${pa}) 130 repeat;
    filter:drop-shadow(0 6px 22px rgba(0,0,0,.7));
  }
  #gh-bigmap-canvas { position:absolute; inset:0; width:100%; height:100%; }
  #gh-bigmap-close {
    position:absolute; top:calc(-8px - clamp(20px,6vw,42px)); right:0; z-index:3; cursor:pointer;
    width:34px; height:34px; border-radius:8px; font-size:17px; line-height:1;
    color:#f0dca2; background:linear-gradient(#2b2218,#160f08);
    border:2px solid rgba(201,162,39,.6); display:flex; align-items:center; justify-content:center;
  }
  #gh-bigmap-close:hover { color:#fff; border-color:#f4c847; }
  /* RELÓGIO dia/noite: só um ANEL FINO desenhado em CSS (sem PNG de fundo), no
     topo-centro colado no limite da tela. Sol e lua orbitam na linha do anel. */
  #gh-clock {
    position:fixed; z-index:12; pointer-events:none;
    top:8px; right:calc(12px + min(118px,27vw) + 8px);
    width:38px; height:38px; border-radius:50%;
    border:1.5px solid rgba(201,162,39,.6);
    background:radial-gradient(circle, rgba(8,9,14,.24), rgba(8,9,14,.08) 72%, rgba(8,9,14,0));
    box-shadow:0 1px 4px rgba(0,0,0,.45);
  }
  #gh-clock .gh-sun, #gh-clock .gh-moon {
    position:absolute; width:46%; height:46%; object-fit:contain;
    transform:translate(-50%,-50%); left:50%; top:50%;
    transition:opacity .5s linear, filter .5s linear;
  }
  .gh-hud-fill {
    height:100%; width:100%;
    transition:width .28s ease, background .28s ease;
    box-shadow:inset 0 1px 0 rgba(255,255,255,.3), inset 0 -3px 5px rgba(0,0,0,.4);
  }
  .gh-hud-hp-fill { background:linear-gradient(#e35d4c,#b3241a); }
  .gh-hud-mp-fill { background:linear-gradient(#57b0e8,#1c5fb3); }

  /* botão de abrir a janela de personagem — no lado ESQUERDO, logo abaixo da placa
     de vida/mana (o canto superior direito fica livre p/ o mapa). */
  #gh-char-btn {
    position:fixed; left:14px; top:calc(20px + min(230px, 40vw) * 0.424); z-index:12; pointer-events:auto;
    width:52px; height:52px; border-radius:50%; cursor:pointer;
    background:url(${fa}) no-repeat center / 100% 100%;
    border:none; padding:0;
    filter:drop-shadow(0 2px 7px rgba(0,0,0,.55));
    display:flex; align-items:center; justify-content:center;
  }
  .gh-char-ico {
    width:58%; height:58%; object-fit:contain; pointer-events:none;
    filter:drop-shadow(0 1px 2px rgba(0,0,0,.7));
  }
  #gh-char-btn:active { transform:scale(.94); filter:brightness(1.25) drop-shadow(0 1px 4px rgba(0,0,0,.6)); }
  /* janela de equipamentos */
  #gh-eq {
    position:fixed; inset:0; z-index:20; pointer-events:auto;
    display:flex; align-items:center; justify-content:center;
    background:rgba(0,0,0,.58);
  }
  #gh-eq.gh-eq-hidden { display:none; }
  /* a moldura vira 9-slice (border-image): cantos fixos, miolo estica — assim a
     janela pode ter QUALQUER tamanho (janela no desktop, tela cheia no celular)
     sem deformar a borda ornamentada. */
  #gh-eq-win {
    position:relative; box-sizing:border-box;
    width:min(58vh,440px); height:min(90vh,780px);
    border:clamp(22px,3.4vh,34px) solid transparent;
    border-image:url(${jv}) 90 fill;
    filter:drop-shadow(0 6px 20px rgba(0,0,0,.6));
  }
  #gh-char-btn { }
  /* celular: inventário em TELA CHEIA (mais espaço, sem rolar) */
  @media (max-width:640px) {
    #gh-eq { padding:0; }
    #gh-eq-win {
      width:100vw; height:100vh; height:100dvh;
      border-width:clamp(15px,2.6vh,24px);
    }
  }
  #gh-eq-close {
    position:absolute; right:6px; top:6px; z-index:2; width:34px; height:34px;
    border-radius:8px; cursor:pointer; font-size:16px; line-height:1;
    background:rgba(20,16,11,.66); color:#e8d9b0; border:2px solid rgba(201,162,39,.55);
  }
  #gh-eq-inner {
    width:100%; height:100%;
    display:flex; flex-direction:column; gap:1.4%;
    color:#e8dcc0; font-family:inherit; overflow:hidden;
  }
  .gh-eq-title {
    text-align:center; font-family:"Cinzel",serif; font-weight:700;
    font-size:clamp(15px,2.4vh,23px); letter-spacing:1.5px;
    color:#f0e2bd; text-shadow:0 2px 4px rgba(0,0,0,.7);
  }
  /* abas (Equipamento / Atributos) */
  .gh-eq-tabs { display:flex; gap:8px; justify-content:center; }
  .gh-tab {
    padding:4px 15px; cursor:pointer; border-radius:7px;
    font-family:"Cinzel",serif; font-weight:600; letter-spacing:.5px;
    font-size:clamp(11px,1.6vh,14px);
    background:rgba(20,16,11,.5); color:#c9b98c; border:1px solid rgba(201,162,39,.4);
  }
  .gh-tab-on { background:rgba(201,162,39,.24); color:#f6ead0; border-color:rgba(201,162,39,.7); }
  .gh-eq-body { flex:1 1 0; min-height:0; overflow-y:auto; overflow-x:hidden; padding-right:2px; overscroll-behavior:contain; -webkit-overflow-scrolling:touch; touch-action:pan-y; }
  /* título e abas NUNCA rolam (ficam fixos no topo da janela) */
  .gh-eq-title, .gh-eq-tabs { flex:0 0 auto; }
  .gh-tabpane { display:flex; flex-direction:column; gap:2.4%; }
  .gh-pane-hidden { display:none; }
  /* CAIXAS que separam "Equipado" da "Mochila": painel pintado em 9-slice
     (cantos ornamentados fixos, interior de pedra escura esticando). */
  .gh-section {
    border:clamp(13px,2.2vh,24px) solid transparent;
    border-image:url(${$u}) 88 fill;
    box-sizing:border-box; padding:1% 2% 2%;
  }
  .gh-sec-head {
    text-align:center; font-family:"Cinzel",serif; font-weight:600;
    font-size:clamp(12px,1.8vh,16px); color:#e0cf9e;
    letter-spacing:1px; margin:0 0 2.2%; text-shadow:0 1px 3px rgba(0,0,0,.8);
  }
  /* cabeçalho "Inventário" com o saldo de ouro à direita (ícone de moeda) */
  .gh-sec-inv {
    display:flex; align-items:center; justify-content:center; gap:6px; position:relative;
  }
  .gh-gold {
    position:absolute; right:2%; top:50%; transform:translateY(-50%);
    display:inline-flex; align-items:center; gap:4px;
    font-family:"Cinzel",serif; letter-spacing:.5px;
  }
  .gh-gold img { width:clamp(15px,2.2vh,20px); height:auto; filter:drop-shadow(0 1px 2px rgba(0,0,0,.7)); }
  .gh-gold b { color:#f4d873; font-size:clamp(12px,1.7vh,15px); text-shadow:0 1px 3px rgba(0,0,0,.85); }
  /* grade "boneco" 8×6 (célula quadrada via aspect-ratio) — disposição PoE */
  .gh-eq-doll {
    display:grid; grid-template-columns:repeat(8,1fr); grid-template-rows:repeat(6,1fr);
    gap:clamp(3px,0.8vh,6px); width:88%; aspect-ratio:4 / 3; margin:0 auto;
  }
  /* MOCHILA: um ÚNICO container escuro dividido por LINHAS FINAS (sem molduras
     grossas por célula). As linhas são a cor de fundo aparecendo no gap de 1px. */
  .gh-bag {
    display:grid; grid-template-columns:repeat(5,1fr); gap:1px;
    width:100%; margin:0 auto; overflow:hidden;
    background:rgba(201,162,39,.20);           /* cor das linhas (via gap) */
    border:1px solid rgba(201,162,39,.34);
    border-radius:5px; box-shadow:inset 0 2px 12px rgba(0,0,0,.6);
  }
  .gh-bag-slot {
    aspect-ratio:1; position:relative; border:none; border-image:none;
    background:rgba(11,9,6,.72); min-width:0; min-height:0;
    display:flex; align-items:center; justify-content:center; overflow:hidden;
  }
  .gh-bag-slot[data-wid]:hover { background:rgba(34,27,15,.9); filter:none; }
  /* contador de pilha (consumíveis empilhados) — usado quando houver itens */
  .gh-bag-slot .gh-count {
    position:absolute; right:2px; bottom:1px; font-size:clamp(9px,1.4vh,12px);
    color:#fff; font-weight:700; text-shadow:0 1px 2px #000, 0 0 3px #000; line-height:1;
  }
  .gh-slot {
    border:clamp(5px,1.05vh,8px) solid transparent;
    border-image:url(${Zv}) 89 fill;
    box-sizing:border-box; min-width:0; min-height:0;
    display:flex; align-items:center; justify-content:center; overflow:hidden;
  }
  /* ícone do item dentro de um slot (equipado ou na mochila) */
  .gh-item-ico {
    max-width:86%; max-height:86%; width:auto; height:auto; object-fit:contain;
    filter:drop-shadow(0 2px 3px rgba(0,0,0,.6)); pointer-events:none;
  }
  .gh-bag-slot[data-wid] { cursor:pointer; }
  .gh-bag-slot[data-wid]:hover { background:rgba(34,27,15,.92); }
  /* item selecionado: o slot pulsa/brilha (dourado) */
  .gh-slot-pulse { animation:gh-slot-pulse 620ms ease-out 1; }
  @keyframes gh-slot-pulse {
    0%   { box-shadow:0 0 0 0 rgba(255,224,130,0); }
    30%  { box-shadow:0 0 14px 3px rgba(255,224,130,.95); }
    100% { box-shadow:0 0 0 0 rgba(255,224,130,0); }
  }
  .gh-eq-stats {
    background:rgba(12,9,6,.5); border:1px solid rgba(201,162,39,.35);
    border-radius:8px; padding:3.5% 5%;
  }
  .gh-eq-lvl {
    text-align:center; font-family:"Cinzel",serif; font-weight:600;
    font-size:clamp(13px,2vh,18px); color:#f0e2bd; margin-bottom:6px;
  }
  .gh-xp {
    height:8px; border-radius:5px; margin-top:4px; overflow:hidden;
    background:rgba(0,0,0,.5); border:1px solid rgba(201,162,39,.4);
  }
  .gh-xp-fill { height:100%; background:linear-gradient(#d8c24a,#8a7016); }
  .gh-stat-cols {
    display:grid; grid-template-columns:1fr 1fr; gap:2px 12px;
    font-size:clamp(10px,1.55vh,14px);
  }
  .gh-stat { display:flex; justify-content:space-between; gap:6px; padding:1px 0; }
  .gh-stat span { color:#bfae82; }
  .gh-stat b { color:#f0e6cc; font-weight:600; }
  /* --- distribuição de atributos (aba Atributos, em jogo) --- */
  .gh-alloc-pts {
    text-align:center; margin:8px 0 6px; font-size:clamp(11px,1.7vh,14px); color:#b6a877;
  }
  .gh-alloc-pts b { color:#8f8262; font-family:"Cinzel",serif; }
  .gh-alloc-pts.gh-pts-on b { color:#ffd964; text-shadow:0 0 8px rgba(240,200,90,.55); }
  .gh-prim-box {
    display:flex; flex-direction:column; gap:5px; margin-bottom:10px;
    padding:8px 10px; border-radius:8px;
    background:rgba(0,0,0,.28); border:1px solid rgba(201,162,39,.28);
  }
  .gh-prow { display:flex; align-items:center; justify-content:space-between; }
  .gh-prow > span { color:#d7c79a; font-size:clamp(11px,1.7vh,14px); }
  .gh-pstep { display:flex; align-items:center; gap:9px; }
  .gh-pstep > b { min-width:22px; text-align:center; color:#f0e6cc; font-weight:700; font-size:clamp(12px,1.9vh,15px); }
  .gh-pm {
    width:26px; height:26px; border-radius:50%; flex:0 0 auto; cursor:pointer;
    border:1px solid rgba(201,162,39,.6); background:linear-gradient(#4a3f28,#2c2519);
    color:#f0d98c; font-size:16px; line-height:1; display:flex; align-items:center; justify-content:center;
    -webkit-tap-highlight-color:transparent;
  }
  .gh-pm:active { transform:scale(.9); filter:brightness(1.2); }
  .gh-pm[disabled] { opacity:.32; cursor:default; }
  .gh-sec-blocks { display:grid; grid-template-columns:1fr 1fr; gap:4px 12px; font-size:clamp(10px,1.5vh,13px); }
  .gh-sec-col:last-child { grid-column:1 / -1; }
  .gh-sec-col h4 {
    margin:4px 0 2px; font-size:clamp(10px,1.5vh,13px); color:#e0cf9e;
    font-family:"Cinzel",serif; font-weight:600; letter-spacing:.5px;
  }
  .gh-sec-row { display:flex; justify-content:space-between; gap:6px; padding:1px 0; }
  .gh-sec-row span { color:#bfae82; }
  .gh-sec-row b { color:#f0e6cc; font-weight:600; }
  /* --- dano flutuante (números que sobem sobre a cena) --- */
  #gh-float { position:fixed; inset:0; pointer-events:none; z-index:11; overflow:hidden; }
  .gh-float-n {
    position:absolute; transform:translate(-50%,-50%);
    font-family:"Cinzel",serif; font-weight:700; white-space:nowrap;
    text-shadow:0 2px 4px rgba(0,0,0,.9), 0 0 6px rgba(0,0,0,.7);
    animation:gh-float-rise 1s ease-out forwards; will-change:transform,opacity;
  }
  .gh-fl-hit  { color:#fbe6b6; font-size:22px; }
  .gh-fl-crit { color:#ff8a3c; font-size:34px; text-shadow:0 2px 5px rgba(0,0,0,.95), 0 0 12px rgba(255,120,40,.7); }
  .gh-fl-player { color:#ff5a4e; font-size:24px; }
  .gh-fl-heal { color:#8ff0a0; font-size:22px; }
  .gh-fl-mana { color:#7fc4ff; font-size:18px; }
  @keyframes gh-float-rise {
    0%   { opacity:0; transform:translate(-50%,-40%) scale(.7); }
    15%  { opacity:1; transform:translate(-50%,-55%) scale(1.08); }
    35%  { transform:translate(-50%,-70%) scale(1); }
    100% { opacity:0; transform:translate(-50%,-135%) scale(1); }
  }
  /* --- árvore de habilidades --- */
  #gh-skills { position:relative; border-radius:8px; padding:8px; }
  .gh-sk-soon { text-align:center; padding:34px 12px; font-style:italic; color:#b6a877; }
  .gh-sk-top { text-align:center; font-size:13px; color:#d7c79a; margin-bottom:8px; }
  .gh-sk-top b { font-family:"Cinzel",serif; font-size:16px; color:#8f8262; padding:0 3px; }
  .gh-sk-top b.gh-sk-pts { color:#ffd964; text-shadow:0 0 8px rgba(240,200,90,.5); }
  .gh-sk-cols { display:flex; gap:6px; justify-content:space-between; align-items:flex-start; }
  .gh-sk-branch { flex:1 1 0; min-width:0; display:flex; flex-direction:column; align-items:center; }
  .gh-sk-bhead {
    font-family:"Cinzel",serif; font-weight:700; font-size:clamp(11px,1.6vh,14px);
    margin-bottom:6px; text-shadow:0 1px 3px #000; text-align:center; letter-spacing:.5px;
  }
  .gh-sk-line { width:3px; height:11px; opacity:.5; border-radius:2px; }
  .gh-sk-node {
    position:relative; border-radius:50%; cursor:pointer; padding:0; flex:0 0 auto;
    background:rgba(10,9,6,.72); display:flex; align-items:center; justify-content:center;
    border:2px solid #6a5a2e; transition:box-shadow .15s, transform .08s, filter .15s;
  }
  .gh-sk-node:active { transform:scale(.92); }
  .gh-sk-active { width:clamp(38px,6.6vh,50px); height:clamp(38px,6.6vh,50px); border-color:#c9a24a; }
  .gh-sk-passive { width:clamp(28px,5vh,38px); height:clamp(28px,5vh,38px); border-color:#9aa2ad; }
  .gh-sk-node img { width:100%; height:100%; object-fit:contain; border-radius:50%; pointer-events:none; }
  .gh-sk-sym { font-size:clamp(13px,2.2vh,18px); line-height:1; pointer-events:none; }
  .gh-sk-node.gh-sk-locked { opacity:.32; filter:grayscale(.65); }
  .gh-sk-node.gh-sk-on { box-shadow:0 0 0 2px rgba(255,215,100,.55), 0 0 10px rgba(255,200,80,.4); }
  .gh-sk-node.gh-sk-sel { border-color:#fff; box-shadow:0 0 0 3px rgba(255,255,255,.85), 0 0 12px rgba(255,240,180,.6); }
  .gh-sk-node.gh-sk-buy { animation:gh-sk-pulse 1.25s ease-in-out infinite; }
  @keyframes gh-sk-pulse { 0%,100%{ box-shadow:0 0 0 0 rgba(255,220,120,0);} 50%{ box-shadow:0 0 11px 2px rgba(255,220,120,.6);} }
  .gh-sk-rank {
    position:absolute; right:-5px; bottom:-5px; background:rgba(8,7,5,.94);
    border:1px solid rgba(201,162,39,.6); border-radius:6px; padding:0 3px;
    font-size:10px; color:#f0dca2; line-height:1.35; font-variant-numeric:tabular-nums;
  }
  .gh-sk-tip {
    margin-top:10px; min-height:40px; padding:9px 12px; font-size:12.5px; line-height:1.4;
    background:rgba(8,7,5,.72); border:1px solid rgba(201,162,39,.3); border-radius:8px; color:#d8cba0;
  }
  .gh-sk-thint { font-style:italic; color:#b6a877; }
  .gh-sk-tname b { color:#f0e2bd; font-family:"Cinzel",serif; font-size:14px; }
  .gh-sk-tname i { color:#c9a84f; font-style:italic; font-size:11.5px; margin-left:4px; }
  .gh-sk-tdesc { margin:4px 0 8px; }
  /* botão de CONFIRMAR a alocação do ponto */
  .gh-sk-cbtn {
    display:inline-block; font-family:"Cinzel",serif; font-size:13px; letter-spacing:.5px;
    padding:8px 18px; border-radius:8px; text-align:center;
  }
  .gh-sk-cbuy {
    cursor:pointer; color:#1c150a; border:none;
    background:linear-gradient(#f4d873,#c99a34); box-shadow:0 2px 6px rgba(0,0,0,.5);
    font-weight:700;
  }
  .gh-sk-cbuy:hover { background:linear-gradient(#ffe98c,#dcae3e); }
  .gh-sk-cbuy:active { transform:translateY(1px) scale(.98); }
  .gh-sk-cdim { color:#9c8f6d; border:1px solid rgba(201,162,39,.3); background:rgba(20,16,11,.6); }
  /* toast (nível/aviso) */
  #gh-toast {
    position:fixed; top:24%; left:50%; transform:translateX(-50%); z-index:14;
    pointer-events:none; opacity:0; text-align:center; white-space:nowrap;
    font-family:"Cinzel",serif; font-weight:700; letter-spacing:1.5px;
    font-size:clamp(22px,5vw,34px);
    color:#ffe089; -webkit-text-stroke:0.6px rgba(60,40,10,.6);
    text-shadow:0 3px 10px #000, 0 0 22px rgba(240,190,70,.6);
  }
  @keyframes gh-toast {
    0% { opacity:0; transform:translate(-50%,10px) scale(.8); }
    18% { opacity:1; transform:translate(-50%,0) scale(1.06); }
    30% { transform:translate(-50%,0) scale(1); }
    78% { opacity:1; }
    100% { opacity:0; transform:translate(-50%,-16px) scale(1); }
  }
  /* barra de conjuração (magias com cast time) — usa a MOLDURA do mapa (9-slice)
     como container, igual ao minimapa, p/ combinar com o resto do HUD. */
  #gh-cast {
    position:fixed; left:50%; bottom:29%; transform:translate(-50%,0);
    z-index:13; pointer-events:none; width:min(300px,58vw);
    display:flex; flex-direction:column; align-items:center; gap:6px;
    opacity:0; transition:opacity .12s ease;
  }
  #gh-cast.gh-cast-on { opacity:1; }
  .gh-cast-name {
    font-family:"Cinzel",serif; font-weight:700; letter-spacing:1px;
    font-size:clamp(13px,3.4vw,17px); color:#f0e6c8;
    text-shadow:0 2px 6px #000, 0 0 12px rgba(120,160,230,.55);
  }
  .gh-cast-frame {
    width:100%; box-sizing:border-box;
    border:clamp(12px,3vw,16px) solid transparent;
    border-image:url(${pa}) 130 repeat;
    background:rgba(6,9,16,.92); background-clip:padding-box;
    filter:drop-shadow(0 2px 7px rgba(0,0,0,.6));
  }
  .gh-cast-track {
    display:block; height:clamp(9px,2.3vw,12px); overflow:hidden;
    border-radius:2px; background:rgba(4,6,12,.9);
    box-shadow:inset 0 1px 3px rgba(0,0,0,.85);
  }
  .gh-cast-fill {
    display:block; height:100%; width:0%;
    background:linear-gradient(90deg,#2a6fd0,#69c0ff 60%,#cfeaff);
    box-shadow:0 0 10px rgba(105,192,255,.9), inset 0 1px 0 rgba(255,255,255,.45);
  }
  /* vinheta vermelha ao levar dano */
  #gh-dmg {
    position:fixed; inset:0; z-index:9; pointer-events:none; opacity:0;
    box-shadow:inset 0 0 120px 30px rgba(180,10,10,.85);
    background:radial-gradient(ellipse at center, rgba(150,0,0,0) 45%, rgba(150,0,0,.4) 100%);
  }
  @keyframes gh-dmg {
    0% { opacity:0; } 18% { opacity:1; } 100% { opacity:0; }
  }
  #pad { position:fixed; inset:0; pointer-events:none; z-index:10; font-family:inherit; }
  .gh-cluster { position:absolute; pointer-events:none; }
  /* botões: a base é a arte redonda pintada; o ícone (svg) fica por cima */
  .gh-btn {
    pointer-events:auto;
    width:52px; height:52px; border-radius:50%; flex:0 0 auto;
    background:url(${fa}) no-repeat center / 100% 100%;
    border:none; padding:0; color:#ecd9a6;
    display:flex; align-items:center; justify-content:center;
    filter:drop-shadow(0 3px 8px rgba(0,0,0,0.55)); cursor:pointer;
    touch-action:none; -webkit-tap-highlight-color:transparent;
  }
  .gh-btn:active { transform:scale(0.92); filter:drop-shadow(0 1px 4px rgba(0,0,0,.6)) brightness(1.28); }
  .gh-btn-ico {
    width:66%; height:66%; object-fit:contain; display:block; pointer-events:none;
    filter:drop-shadow(0 1px 2px rgba(0,0,0,.85));
  }
  /* MOVIMENTO — D-pad de 4 botões no canto inferior ESQUERDO. GRID 3x3 em
     diamante (cima/baixo/esq/dir); cantos e miolo vazios.
              ▲(2,1)
        ⟲(1,2)      ⟳(3,2)
              ▼(2,3)            */
  /* MOVIMENTO — D-pad em CRUZ (arte única). As 4 zonas de toque ficam por cima
     dos braços; a do braço pressionado acende. */
  .gh-move {
    left:16px; bottom:20px; width:124px; height:124px;
    background:url(${Kv}) no-repeat center / 100% 100%;
    filter:drop-shadow(0 3px 9px rgba(0,0,0,0.55));
  }
  .gh-dtap {
    position:absolute; background:transparent; border:none; padding:0;
    pointer-events:auto; cursor:pointer; border-radius:16px;
    -webkit-tap-highlight-color:transparent;
  }
  .gh-dtap:active {
    background:radial-gradient(circle, rgba(255,226,140,0.5) 0%, rgba(255,210,110,0.18) 45%, rgba(255,210,110,0) 70%);
  }
  .gh-dup    { left:30%; top:0;    width:40%; height:44%; }
  .gh-ddown  { left:30%; bottom:0; width:40%; height:44%; }
  .gh-dleft  { left:0;   top:30%;  width:44%; height:40%; }
  .gh-dright { right:0;  top:30%;  width:44%; height:40%; }
  /* AÇÃO — canto inferior DIREITO (perto da arma/polegar): ataque em destaque
     embaixo, interagir logo acima. */
  .gh-atk {
    position:absolute; right:18px; bottom:22px;
    width:58px; height:58px; color:#f0b48a;
    filter:drop-shadow(0 0 12px rgba(200,70,40,0.5)) drop-shadow(0 3px 8px rgba(0,0,0,.55));
  }
  .gh-atk:active { transform:scale(0.9); filter:drop-shadow(0 0 8px rgba(220,90,50,0.75)) brightness(1.15); }
  /* interagir: à ESQUERDA do ataque (lado a lado), um tico menor */
  .gh-act {
    position:absolute; right:88px; bottom:24px;
    width:54px; height:54px;
    opacity:0.5; transition:opacity .15s, filter .15s;
  }
  .gh-act.gh-act-on {
    opacity:1;
    filter:drop-shadow(0 0 12px rgba(240,192,64,0.85)) drop-shadow(0 3px 8px rgba(0,0,0,.55));
  }
  .gh-act:active { transform:scale(0.92); }
  /* BARRA DE AÇÃO — habilidades ativas, faixa central inferior */
  @property --gh-cd { syntax:'<angle>'; inherits:false; initial-value:0deg; }
  /* container passa-cliques; os slots são posicionados em ARCO (meia-lua)
     ao redor do botão de ataque via right/bottom inline. */
  #gh-actbar {
    position:absolute; inset:0; display:none; pointer-events:none;
  }
  .gh-sslot {
    position:absolute;
    width:48px; height:48px; border-radius:50%; padding:0; border:none;
    background:url(${fa}) no-repeat center / 100% 100%;
    display:flex; align-items:center; justify-content:center; cursor:pointer;
    pointer-events:auto;
    filter:drop-shadow(0 2px 7px rgba(0,0,0,.6));
    -webkit-tap-highlight-color:transparent; overflow:hidden;
  }
  .gh-sslot:active { transform:scale(0.9); filter:brightness(1.2); }
  .gh-sslot img { width:70%; height:70%; object-fit:contain; pointer-events:none;
    filter:drop-shadow(0 1px 2px rgba(0,0,0,.85)); }
  /* slot VAZIO: soquete apagado (marca o lugar da futura habilidade) */
  .gh-ss-empty {
    filter:grayscale(.6) brightness(.5); opacity:.62; cursor:default;
    box-shadow:inset 0 0 8px rgba(0,0,0,.55);
  }
  .gh-ss-empty:active { transform:none; filter:grayscale(.6) brightness(.5); }
  .gh-ss-rune { font-size:18px; color:rgba(220,200,150,.5); pointer-events:none;
    text-shadow:0 1px 2px rgba(0,0,0,.8); }
  .gh-ss-x { font-size:20px; color:#e6d29a; }
  /* recarga: setor escuro (conic) que ENCOLHE conforme --gh-cd (frac×360) cai */
  .gh-ss-cool {
    position:absolute; inset:0; border-radius:50%; pointer-events:none; opacity:0;
    --gh-cd:0deg;
    background:conic-gradient(rgba(6,6,10,.74) var(--gh-cd), transparent 0);
  }
  /* segundos restantes no centro do ícone durante a recarga */
  .gh-ss-cd {
    position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
    pointer-events:none; font-family:"Cinzel",serif; font-weight:700;
    font-size:18px; color:#fff2c8; text-shadow:0 1px 3px rgba(0,0,0,.95);
  }
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
  .gh-dlg-name { color:#f0c040; font-family:"Cinzel",serif; font-weight:700; letter-spacing:.5px; font-size:16px; margin-bottom:4px; }
  /* altura fixa do texto: a caixa fica sempre do mesmo tamanho (falas longas
     são paginadas no código, então nunca ultrapassam este espaço) */
  .gh-dlg-text { font-size:16px; line-height:1.35; min-height:66px; }
  .gh-dlg-hint { text-align:right; font-size:12px; color:#a8966a; margin-top:6px; }
  @media (min-width: 900px) {
    .gh-btn { opacity:0.75; }
    .gh-act { opacity:0.5; }
    .gh-act.gh-act-on { opacity:1; }
  }
  `,document.head.appendChild(s)}const go=["#######","#..N..#","#.....#","#.....#","#.....#","#..P..#","###X###"],ro=go.length,pl=go[0].length,ma={tavern:{name:"TAVERNA",npc:"Bruno, o Taverneiro",seed:11,lines:["Bem-vindo à Taverna do Javali! Eu sou o Bruno.","Sente-se e descanse — logo você poderá pagar por um quarto e recuperar as forças."]},store:{name:"MERCADOR",npc:"Rosa, a Mercadora",seed:2,lines:["Tenho de tudo um pouco, aventureiro. Sou a Rosa.","Em breve abriremos o comércio: poções, cordas, tochas e mais."]},smith:{name:"FERREIRO",npc:"Brandt, o Ferreiro",seed:23,lines:["O fogo está quente e a bigorna, pronta. Brandt, ao seu dispor.","Traga minério e ouro que eu aprimoro suas armas e armaduras."]},alchemist:{name:"ALQUIMISTA",npc:"Isolde, a Alquimista",seed:31,lines:["Cuidado com o que respira aqui dentro... sou Isolde.","Elixires e poções logo estarão à venda na minha bancada."]}};function Nr(s){for(let t=0;t<ro;t++){const e=go[t].indexOf(s);if(e>=0)return{col:e,row:t}}return{col:1,row:1}}function jr(s,t){return t<0||t>=ro||s<0||s>=pl?"#":go[t][s]}function ga(s,t){return".PX".includes(jr(s,t))}const o1=""+new URL("taverneiro-Ba4UKFJq.png",import.meta.url).href,a1=""+new URL("mercadora-B8RulStP.png",import.meta.url).href,l1=""+new URL("ferreiro-BdN9Klhc.png",import.meta.url).href,c1=""+new URL("alquimista-ssXsgGLn.png",import.meta.url).href,Yu=""+new URL("pip-rEDWa-7w.png",import.meta.url).href,ju=""+new URL("wilma-DI_QNtI6.png",import.meta.url).href,h1=""+new URL("fazendeiro-CLjUAd1g.png",import.meta.url).href,d1=""+new URL("camponesa-CrL0OA2Y.png",import.meta.url).href,u1=""+new URL("lenhador-B54mx8Mi.png",import.meta.url).href,Zu=""+new URL("hedda-Buaz2cmx.png",import.meta.url).href,f1=""+new URL("costureira-Br8zMBee.png",import.meta.url).href,p1=""+new URL("gunther-D_2fJfLI.png",import.meta.url).href,m1=""+new URL("anselmo-a5GEbqfY.png",import.meta.url).href,g1=""+new URL("tam-BlgWIVim.png",import.meta.url).href,_1=""+new URL("lyle-gu11Pcfp.png",import.meta.url).href,x1=""+new URL("pine1-Cx-eXiFP.png",import.meta.url).href,v1=""+new URL("pine2-CUzpurmt.png",import.meta.url).href,b1=""+new URL("pine3-SLpwxU-f.png",import.meta.url).href,M1=""+new URL("pine4-D2rjz_P9.png",import.meta.url).href,w1=""+new URL("cluster1-CDwqmovY.png",import.meta.url).href,y1=""+new URL("cluster2-C0czRdHN.png",import.meta.url).href,S1=""+new URL("sign_tavern-DPGpN59J.png",import.meta.url).href,T1=""+new URL("sign_store-C8OmR8-U.png",import.meta.url).href,E1=""+new URL("sign_smith-B08qmnbc.png",import.meta.url).href,A1=""+new URL("sign_alch-CZuh7kJW.png",import.meta.url).href,R1=""+new URL("prop_lamp-D_-YfjKt.png",import.meta.url).href,C1=""+new URL("prop_notice-Bo5C5meg.png",import.meta.url).href,L1=""+new URL("enemy_skeleton-BcZFeUKH.png",import.meta.url).href,P1=""+new URL("death_poof-BE-q7e2_.png",import.meta.url).href,U1=""+new URL("dec_window-DrwRbTKE.png",import.meta.url).href,D1=""+new URL("dec_door-B5wowGxb.png",import.meta.url).href,_a=""+new URL("dec_torch-CtkBMXz7.png",import.meta.url).href,I1=""+new URL("dec_ivy-D9e2Lu2_.png",import.meta.url).href,k1=""+new URL("dec_banner-UBOZSe9G.png",import.meta.url).href,Th=""+new URL("dec_cracks-DKSsqxx2.png",import.meta.url).href,N1=""+new URL("dec_gate_frame-DQaCQl80.png",import.meta.url).href,F1=""+new URL("dec_gate_bars-B6YqUV4L.png",import.meta.url).href,O1=""+new URL("fx_fireball-CNUxOMXZ.png",import.meta.url).href,B1=""+new URL("fx_ice-DGJxZKsy.png",import.meta.url).href,z1=""+new URL("fx_ice_lance-DCxKutbL.png",import.meta.url).href,H1=""+new URL("fx_ray-BukWo5qE.png",import.meta.url).href,G1=""+new URL("fx_meteoro-DywgnSdp.png",import.meta.url).href,V1=""+new URL("fx_muralha-yiXxe2Yc.png",import.meta.url).href,W1=""+new URL("fx_imolacao-C-a5dtuo.png",import.meta.url).href,X1=""+new URL("fx_prisao-BDhoA-oK.png",import.meta.url).href,q1=""+new URL("fx_corrente-CI-yrk7e.png",import.meta.url).href,$1=""+new URL("fx_tempestade-DS9uv2Z_.png",import.meta.url).href,Y1=""+new URL("fx_descarga-IY9gTcyD.png",import.meta.url).href,j1=""+new URL("fx_l_apunhalar-BRQuzQIj.png",import.meta.url).href,Z1=""+new URL("fx_l_danca-w9P6lgu4.png",import.meta.url).href,K1=""+new URL("fx_l_sombras-fe3usKIe.png",import.meta.url).href,J1=""+new URL("fx_l_estocada-hJYwlzLR.png",import.meta.url).href,Q1=""+new URL("fx_l_mortal-DuYG-M3q.png",import.meta.url).href,tb=""+new URL("fx_l_dupla-C6r_wn6L.png",import.meta.url).href,eb=""+new URL("fx_l_danca-w9P6lgu4.png",import.meta.url).href,nb=""+new URL("fx_l_arremesso-rtDW0ow6.png",import.meta.url).href,ib=""+new URL("fx_l_nuvem-B2qmk_tl.png",import.meta.url).href,sb=""+new URL("fx_l_toxina-Bu3f7mn-.png",import.meta.url).href,rb=""+new URL("sword-Cnq9dXJw.png",import.meta.url).href,ob=""+new URL("class_guerreiro-DQxwW6XE.png",import.meta.url).href,ab=""+new URL("class_ladino-CBY8tWR5.png",import.meta.url).href,lb=""+new URL("class_mago-BCWgBU8E.png",import.meta.url).href,cb=""+new URL("class_clerigo-Bv6kp9nE.png",import.meta.url).href,Ns=[{id:"guerreiro",name:"Guerreiro",emoji:"⚔️",tag:"Tanque / corpo-a-corpo",desc:"Mestre das lâminas. Encara o perigo de frente, com espada e escudo ou uma arma de duas mãos. Muita vida e dano físico.",attr:{str:8,dex:4,int:3},hp:120,mp:40,weapons:["sword","greatsword","axe","shield"],startWeapon:"sword",portrait:ob},{id:"ladino",name:"Ladino",emoji:"🗡️",tag:"Dano rápido / crítico",desc:"Ágil e furtivo. Golpeia rápido com adaga e rapieira, buscando os pontos fracos. Frágil, mas letal e veloz.",attr:{str:4,dex:8,int:3},hp:90,mp:50,weapons:["dagger","rapier"],startWeapon:"dagger",portrait:ab},{id:"mago",name:"Mago",emoji:"🔮",tag:"Dano à distância / elemental",desc:"Canaliza fogo, gelo e raio pelo cajado e pelo orbe. Devastador à distância, mas de corpo frágil. Muita mana.",attr:{str:3,dex:4,int:8},hp:75,mp:110,weapons:["staff","orb"],startWeapon:"staff",portrait:lb},{id:"clerigo",name:"Clérigo",emoji:"🕯️",tag:"Suporte / cura",desc:"Fé feita arma. Cura os aliados e esmaga o mal com maça, martelo e escudo. Equilibrado, resistente e devoto.",attr:{str:5,dex:3,int:7},hp:95,mp:90,weapons:["mace","maul","shield","staff"],startWeapon:"mace",portrait:cb}],ml=Object.fromEntries(Ns.map(s=>[s.id,s])),Eh=5,hb=3;function Zr(s,t,e){return{atkPhys:Math.round(2+s.str*1.2+s.dex*.6),atkMag:Math.round(1+s.int*1.4),crit:Math.round(3+s.dex*.8),critDmg:150+Math.round(s.dex*1),precision:Math.min(99,Math.round(85+s.dex*.6)),hp:t+s.str*2,def:Math.round(1+s.str*.5),magRes:Math.round(s.int*.5),evasion:Math.round(2+s.dex*.7),mp:e+s.int*3}}const Ah=[x1,v1,M1],db=[b1],ub=.625,Fr=[{url:w1,aspect:1.96},{url:y1,aspect:1.72}],fb={tavern:o1,store:a1,smith:l1,alchemist:c1},pb={tavern:S1,store:T1,smith:E1,alchemist:A1},mb=2.6,Cn=[[0,-1],[1,0],[0,1],[-1,0]],$i={c:7,r:10},Or=10,Rh={url:O1,frames:17},gb={url:B1,frames:6},_b={url:z1,frames:12},Ch={url:H1,frames:16},xb={url:G1,frames:15},vb={url:V1,frames:16},bb={url:W1,frames:15},Mb={url:X1,frames:17},wb={url:q1,frames:19},yb={url:$1,frames:20},Sb={url:Y1,frames:11},Tb={url:j1,frames:5},Eb={url:Z1,frames:20},Ab={url:K1,frames:7},Rb={url:J1,frames:11},Cb={url:Q1,frames:6},Lb={url:tb,frames:8},Pb={url:eb,frames:20},Ub={url:nb,frames:14},Db={url:ib,frames:7},Ib={url:sb,frames:19},Ps={m_bola_fogo:Rh,m_explosao_fogo:Rh,m_meteoro:xb,m_muralha_fogo:vb,m_imolacao:bb,m_nova_gelo:gb,m_lanca_gelo:_b,m_prisao_gelo:Mb,m_raio_arcano:Ch,m_corrente:wb,m_tempestade:yb,m_descarga:Sb,m_nova_arcana:Ch,l_apunhalar:Tb,l_rajada_laminas:Eb,l_golpe_sombras:Ab,l_estocada:Rb,l_execucao_a:Cb,l_rajada_dupla:Lb,l_danca_laminas:Pb,l_arremesso:Ub,l_nuvem_toxica:Db,l_toxina:Ib},kb=1200,Lh=s=>{const t=Ps[s];return t?Math.min(2100,Math.max(900,Math.round(t.frames*115))):kb},Nb=new Set(["m_meteoro","m_tempestade","m_prisao_gelo"]),Fb=new Set(["m_muralha_fogo","m_descarga"]),Ph=s=>100,Ob=620,Br=3.2,Uh=[{c:5,r:5,dc:0,dr:1,kind:"tavern"},{c:9,r:5,dc:0,dr:1,kind:"store"},{c:1,r:9,dc:1,dr:0,kind:"smith"},{c:13,r:9,dc:-1,dr:0,kind:"alchemist"}],Dh=[{c:7,r:5,dc:0,dr:1,id:"irmaos"},{c:1,r:7,dc:1,dr:0,id:"hedda"},{c:13,r:11,dc:-1,dr:0,id:"elspethhome"}],Bb=[{id:"elspeth",c:8,r:6,night:[12,11],seed:1,name:"Elspeth, a Camponesa",lines:["Bom dia! Colhi legumes fresquinhos hoje cedo.","O poço da praça nunca seca, pode beber à vontade."]},{id:"corvin",c:10,r:6,night:[5,6],seed:2,name:"Corvin, o Lenhador",lines:["Cortar lenha é honesto, mas o bosque anda estranho ultimamente.","Dizem que há algo à espreita naquela montanha ao norte..."]},{id:"wren",c:12,r:10,night:[2,7],seed:3,name:"Wren, a Costureira",lines:["Precisa remendar essa capa? Faço um preço justo.","Roupa boa aquece o corpo — e o frio lá embaixo é de rachar."]},{id:"alard",c:2,r:11,night:[5,6],seed:5,name:"Alard, o Velho Fazendeiro",lines:["Cuidado, jovem. A escada sob a montanha leva às profundezas.","Equipe-se bem antes de descer. Já vi muitos partirem e nenhum voltar."]},{id:"gunther",c:8,r:13,night:[11,7],seed:9,name:"Gunther, o Vigia",lines:["Mantenha a paz por aqui, forasteiro.","Enquanto eu montar guarda, o vilarejo dorme tranquilo."]},{id:"anselmo",c:3,r:6,night:[2,6],seed:7,name:"Frei Anselmo",lines:["Que a luz o acompanhe nas trevas, viajante.","Reze antes de descer àquela masmorra. Vai precisar."]},{id:"tam",c:9,r:12,night:[7,6],seed:10,name:"Velho Tam",lines:["Uma moedinha para um pobre velho?","Já fui aventureiro como você... até a montanha levar tudo de mim."]},{id:"lyle",c:2,r:8,night:[5,6],seed:12,name:"Lyle, o Bardo",lines:["Ei! Quer ouvir a balada do herói que desceu à masmorra?","Faça feitos grandiosos e eu comporei uma canção sobre você!"]}],zb={pip:Yu,wilma:ju,alard:h1,elspeth:d1,corvin:u1,hedda:Zu,wren:f1,gunther:p1,anselmo:m1,tam:g1,lyle:_1},Hb={},xa={irmaos:{name:"Casa dos Irmãos",residents:[{col:2,row:2,seed:4,scale:.7,name:"Pip",art:Yu,lines:["Essa é a nossa casa! Eu e a Wilma somos irmãos.","Um dia vou ser aventureiro igual você — a Wilma que fica de babá!"]},{col:4,row:2,seed:6,scale:.66,name:"Wilma",art:ju,lines:["O Pip vive fugindo pra praça. Alguém tem que cuidar dele!","À noite dá pra ouvir barulhos vindo da montanha... eu tranco a porta."]}]},hedda:{name:"Casa de Hedda",residents:[{col:3,row:2,seed:8,name:"Hedda, a Matriarca",art:Zu,lines:["Entre, entre. Minha casa é modesta, mas aquecida.","Já vi muitos invernos passarem por Grimhollow. Sente-se, tome um chá."]}]},elspethhome:{name:"Casa de Elspeth",residents:[]}},Gb=96;function Ih(s,t=Gb){const e=[];for(const n of s){if(n.length<=t){e.push(n);continue}const i=n.split(/\s+/);let r="";for(const a of i)r&&r.length+1+a.length>t?(e.push(r+" …"),r=a):r=r?r+" "+a:a;r&&e.push(r)}return e}const oo=class oo{constructor(t,e,n){ut(this,"renderer");ut(this,"scene",new ex);ut(this,"camera");ut(this,"container");ut(this,"foliageFx");ut(this,"col");ut(this,"row");ut(this,"facing",0);ut(this,"anim",null);ut(this,"showIdx",0);ut(this,"world",new He);ut(this,"blocked",new Set);ut(this,"gates",new Map);ut(this,"gateAnims",[]);ut(this,"now",0);ut(this,"motes",[]);ut(this,"moteTexCache");ut(this,"fogPuffs",[]);ut(this,"softPuffCache");ut(this,"cloudTexCache");ut(this,"fogDome");ut(this,"smokeTexes",[]);ut(this,"npcs",[]);ut(this,"flames",[]);ut(this,"lampFlames",[]);ut(this,"lampGlows",[]);ut(this,"glowTex");ut(this,"dayNightLights",[]);ut(this,"outdoor",!1);ut(this,"_sky",new Ot);ut(this,"_cA",new Ot);ut(this,"_cB",new Ot);ut(this,"waterGlint");ut(this,"smoke",[]);ut(this,"billboardProps",[]);ut(this,"playerMaxHp",100);ut(this,"playerHp",100);ut(this,"playerMaxMp",100);ut(this,"playerMp",100);ut(this,"stats",{level:1,xp:0,xpMax:100,atk:8,def:2,str:5,dex:5,int:5,gold:0});ut(this,"prim",{str:5,dex:5,int:5});ut(this,"baseAttr",{str:5,dex:5,int:5});ut(this,"clsHp",100);ut(this,"clsMp",100);ut(this,"sec",Zr({str:5,dex:5,int:5},100,100));ut(this,"unspent",0);ut(this,"passive",{});ut(this,"skillRanks",{});ut(this,"target",null);ut(this,"cooldownUntil",{});ut(this,"coolingSkills",new Set);ut(this,"buff",null);ut(this,"reticle",null);ut(this,"raycaster",new Hx);ut(this,"lastTickMs",0);ut(this,"buffActive",!1);ut(this,"currentWeapon",null);ut(this,"playerName","Herói");ut(this,"classId","guerreiro");ut(this,"enemy",null);ut(this,"poofs",[]);ut(this,"poofTex");ut(this,"projectiles",[]);ut(this,"fxTexCache",{});ut(this,"_smokeTex");ut(this,"ui");ut(this,"location","village");ut(this,"doorMap",new Map);ut(this,"homeDoorMap",new Map);ut(this,"npcMap",new Map);ut(this,"returnTo",{col:0,row:0,facing:0});ut(this,"dialogue",null);ut(this,"lastPrompt"," ");ut(this,"artCache",new Map);ut(this,"_shadowTex");ut(this,"animTex",[]);ut(this,"walkers",[]);ut(this,"npcNight",!1);ut(this,"startAt");ut(this,"miniGrid",null);this.container=t,this.startAt=n;const i=e?ml[e.classId]:null;i&&e&&(this.playerName=e.name,this.classId=i.id,this.prim={...e.attr??i.attr},this.baseAttr={...e.attr??i.attr},this.clsHp=i.hp,this.clsMp=i.mp,this.sec=Zr(this.prim,this.clsHp,this.clsMp),this.stats.str=this.prim.str,this.stats.dex=this.prim.dex,this.stats.int=this.prim.int,this.playerMaxHp=this.sec.hp,this.playerHp=this.sec.hp,this.playerMaxMp=this.sec.mp,this.playerMp=this.sec.mp),this.renderer=new tx({antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),t.appendChild(this.renderer.domElement);const r=document.createElement("div");r.style.cssText="position:absolute;inset:0;pointer-events:none;opacity:0;z-index:5;background:radial-gradient(ellipse at center,rgba(30,55,25,0) 42%,rgba(24,46,20,0.55) 78%,rgba(16,32,14,0.8) 100%);",getComputedStyle(t).position==="static"&&(t.style.position="relative"),t.appendChild(r),this.foliageFx=r,this.scene.background=new Ot(Ss),this.camera=new hn(78,1,.05,400),this.camera.rotation.order="YXZ",this.scene.add(this.world),this.col=0,this.row=0,this.ui=s1(t,l=>this.onAction(l),rb,void 0,ul,l=>this.onEquip(l),l=>this.applyPassives(l),l=>this.useSkill(l),(l,c)=>this.allocAttr(l,c)),this.renderer.domElement.addEventListener("pointerdown",l=>this.onCanvasPointer(l)),this.ui.setInventory(ul.map(l=>l.id)),this.ui.equipWeapon(i?.startWeapon??"sword"),this.ui.setHealth(this.playerHp/this.playerMaxHp),this.ui.setMana(this.playerMp/this.playerMaxMp),this.ui.setSkillInfo(this.classId,Ph(this.stats.level)),this.refreshStats(),this.preloadFx();const a=sh();this.startAt==="showcase"?(this.returnTo={col:a.col,row:a.row,facing:0},this.enterLocation("showcase",0,0,0)):this.enterLocation("village",a.col,a.row,0),window.addEventListener("resize",()=>this.resize()),this.resize(),this.renderer.setAnimationLoop(l=>this.tick(l));const o=document.fonts;o?.ready&&o.ready.then(()=>{this.dialogue||this.enterLocation(this.location,this.col,this.row,this.facing)}),window.__game=this}enterLocation(t,e,n,i){this.clearWorld(),this.location=t,this.outdoor=t==="village"||t==="forest",this.dialogue=null,this.ui.hideDialogue(),t==="village"?(this.scene.fog=new yi(Ss,P*2.6,P*11),this.scene.background=new Ot(Ss),this.addVillageLights(),this.buildVillage()):t==="forest"?(this.scene.fog=new yi(Ss,P*3.5,P*18),this.scene.background=new Ot(Ss),this.addForestLights(),this.buildForest()):t==="dungeon"?(this.scene.fog=new yi(3817033,P*2.5,P*13),this.scene.background=new Ot(3093052),this.addDungeonLights(),this.buildDungeon()):t==="showcase"?(this.scene.fog=new Cl(8160144,.062),this.scene.background=new Ot(8160144),this.addShowcaseLights(),this.buildShowcase()):t in xa?(this.scene.fog=new yi(2365968,P*4,P*12),this.scene.background=new Ot(1445640),this.addInteriorLights(),this.buildHome(t)):(this.scene.fog=new yi(1709069,P*4,P*12),this.scene.background=new Ot(1183241),this.addInteriorLights(),this.buildInterior(t)),this.col=e,this.row=n,this.facing=i,this.location==="showcase"?(this.showIdx=0,this.applyShowcasePose()):(this.camera.position.set(e*P,this.floorYAt(e,n)+Rr,n*P),this.camera.rotation.y=-i*(Math.PI/2)),this.anim=null,this.lastPrompt=" ",this.ui.setPrompt(null),this.buildMiniGrid(),this.pushMinimap()}clearWorld(){this.world.traverse(t=>{const e=t;e.geometry&&e.geometry.dispose();const n=e.material;Array.isArray(n)?n.forEach(i=>i.dispose()):n&&n.dispose()}),this.world.clear(),this.blocked.clear(),this.gates.clear(),this.gateAnims=[],this.motes=[],this.fogPuffs=[],this.fogDome=void 0,this.npcs=[],this.flames=[],this.lampFlames=[],this.lampGlows=[],this.dayNightLights=[],this.animTex=[],this.walkers=[],this.smoke=[],this.billboardProps=[],this.enemy=null,this.reticle=null,this.clearTarget(),this.projectiles=[],this.poofs=[],this.waterGlint=void 0,this.doorMap.clear(),this.homeDoorMap.clear(),this.npcMap.clear()}addVillageLights(){const t=new ys(9081506,.75),e=new Ms(10135224,3812380,.7),n=new ta(16771008,.55);n.position.set(-6,12,4),this.world.add(t),this.world.add(e),this.world.add(n),this.registerDayLight(t,3820138,.46),this.registerDayLight(e,2899038,.5),this.registerDayLight(n,5596832,.14)}registerDayLight(t,e,n){this.dayNightLights.push({light:t,dayI:t.intensity,dayColor:t.color.clone(),nightColor:new Ot(e),nightMul:n})}daylight(t){const e=Math.sin((t-.25)*Math.PI*2);return Math.max(0,Math.min(1,e*1.15))}atmosColor(t,e){const n=oo.SKY_KEYS;let i=n[0],r=n[n.length-1];for(let o=0;o<n.length-1;o++)if(t>=n[o][0]&&t<=n[o+1][0]){i=n[o],r=n[o+1];break}const a=(t-i[0])/(r[0]-i[0]||1);e.copy(this._cA.set(i[1])).lerp(this._cB.set(r[1]),a)}updateDayNight(t){if(!this.outdoor)return;const e=(t/Lr+Pr)%1,n=this.daylight(e);this.atmosColor(e,this._sky),this.scene.fog&&this.scene.fog.color.copy(this._sky),this.scene.background.copy(this._sky);for(const r of this.dayNightLights){const a=r.nightMul+(1-r.nightMul)*n;r.light.intensity=r.dayI*a,r.light.color.copy(r.nightColor).lerp(r.dayColor,n)}const i=Math.max(0,Math.min(1,(.5-n)/.35));for(const r of this.lampFlames){const a=r.base+Math.sin(t*.011+r.base)*.8+Math.sin(t*.027)*.5;r.light.intensity=Math.max(0,a)*i}for(const r of this.lampGlows){const a=.88+Math.sin(t*.011)*.08+Math.sin(t*.027)*.04;r.material.opacity=i*a}}addInteriorLights(){this.world.add(new ys(12888176,1.15)),this.world.add(new Ms(10521184,3813408,.75))}buildVillage(){const t=new ct({map:_h(7)}),e=(m,p)=>new ct({map:m,color:new Ot(p)}),n=[new ct({map:ii(31)}),new ct({map:mv()})],i=[e(As(3),15323543),e(As(3),12820582),e(As(3),11179640)];i.forEach(m=>m.side=Kt);const r=this.decalMat(D1,.4),a=this.decalMat(U1,.4),o=this.decalMat(_a,.1),l=this.decalMat(k1,.4),c=this.decalMat(I1,.4),h=this.decalMat(Th,.08),d=(m,p,w=0)=>Math.sin(m*12.9+p*78.2+w*3.1)*43758.5%1,u=new Bt(P,P);for(let m=0;m<nn;m++)for(let p=0;p<pn;p++){if(ih(p,m))continue;const w=new K(u,t);w.rotation.x=-Math.PI/2;const M=Math.floor(Math.abs(d(p,m,5))*4)%4;w.rotation.z=M*Math.PI/2,w.position.set(p*P,0,m*P),this.world.add(w)}const f=new Me(P,ni,P),g=new Set([...Uh.map(m=>`${m.c},${m.r},${m.dc},${m.dr}`),...Dh.map(m=>`${m.c},${m.r},${m.dc},${m.dr}`)]),_=new Set;for(let m=0;m<nn;m++)for(let p=0;p<pn;p++){if(Ce(p,m)!=="building")continue;const w=Cn.filter(([E,y])=>{const R=Ce(p+E,m+y);return R==="street"||R==="barrel"});if(w.length===0)continue;const M=n[Math.floor(Math.abs(d(p,m))*997)%n.length],x=new K(f,M);x.position.set(p*P,ni/2,m*P),this.world.add(x);for(const[E,y]of w){if(g.has(`${p},${m},${E},${y}`)){_.add(`${p},${m},${E},${y}`);continue}const R=Math.abs(d(p,m,E*7+y*3))%1,A=p*P+E*(P/2+.05),v=m*P+y*(P/2+.05);R<.4?this.addWallDecal(p,m,E,y,a,1.9,1.9,1.75):R<.5?(this.addWallDecal(p,m,E,y,o,.95,1.55,2.15),this.glowLight(A+E*.25,2.35,v+y*.25,16752704,3,9)):R<.71?this.addWallDecal(p,m,E,y,c,2.3,1.5,1.05):R<.87&&this.addWallDecal(p,m,E,y,h,1.8,1.6,1.6)}}this.buildRoofs(i),this.buildMountain(),this.buildTunnel(),this.buildDungeonEnemy(),this.buildWell(),this.buildEstablishments(r,l),this.buildHomes(r),this.buildVillageForestGate(),this.buildVillageProps(),this.buildChimneySmoke(),this.buildNPCs()}buildVillageProps(){this.addLampPost(4,7),this.addLampPost(10,7),this.addLampPost(4,11),this.addLampPost(10,11),this.addWallProp(2,10,C1,2.7,"W")}makeGlowTex(){if(this.glowTex)return this.glowTex;const t=document.createElement("canvas");t.width=t.height=64;const e=t.getContext("2d"),n=e.createRadialGradient(32,32,0,32,32,32);return n.addColorStop(0,"rgba(255,244,214,1)"),n.addColorStop(.28,"rgba(255,207,138,0.72)"),n.addColorStop(1,"rgba(255,190,120,0)"),e.fillStyle=n,e.fillRect(0,0,64,64),this.glowTex=new Mn(t),this.glowTex}addLampPost(t,e,n=0,i=0){const r=t*P+n,a=e*P+i;this.addPropBillboard(t,e,R1,3.4,n,i);const o=2.95,l=new bn(16764810,4.2,17,2);l.position.set(r,o,a),this.world.add(l),this.lampFlames.push({light:l,base:4.2});const c=new Yo(new $r({map:this.makeGlowTex(),transparent:!0,opacity:0,depthWrite:!1,blending:Jr}));c.position.set(r,o,a),c.scale.set(2.6,2.6,1),this.world.add(c),this.lampGlows.push(c)}addPropBillboard(t,e,n,i,r=0,a=0){const o=new ct({transparent:!0,opacity:0,alphaTest:.4,side:Kt}),l=new K(new Bt(i,i),o);l.position.set(t*P+r,i/2,e*P+a),this.world.add(l),this.billboardProps.push(l),this.loadArt(n,c=>{const h=c.image,d=h&&h.width&&h.height?h.width/h.height:1;l.geometry.dispose(),l.geometry=new Bt(i*d,i),l.position.y=i/2,o.map=c,o.opacity=1,o.needsUpdate=!0})}addWallProp(t,e,n,i,r){const a=new ct({transparent:!0,opacity:0,alphaTest:.4,side:Kt}),o=new K(new Bt(i,i),a),l=P/2-.2;let c=0,h=0,d=0;r==="N"?(d=0,h=-l):r==="S"?(d=Math.PI,h=l):r==="W"?(d=Math.PI/2,c=-l):(d=-Math.PI/2,c=l),o.rotation.y=d,o.position.set(t*P+c,i/2,e*P+h),this.world.add(o),this.loadArt(n,u=>{const f=u.image,g=f&&f.width&&f.height?f.width/f.height:1;o.geometry.dispose(),o.geometry=new Bt(i*g,i),o.position.y=i/2,a.map=u,a.opacity=1,a.needsUpdate=!0})}buildDungeonEnemy(t=2,e=4){const n=Math.max(1,this.stats.level+(Math.floor(Math.random()*3)-1)),i=26+(n-1)*8,r=2.6,a=new ct({transparent:!0,opacity:0,alphaTest:.4,side:Kt}),o=new K(new Bt(r*.47,r),a);o.position.set(t*P,r/2,e*P),this.world.add(o),this.billboardProps.push(o),this.blocked.add(`${t},${e}`);const l=1.3,c=new He,h=new K(new Bt(l+.12,.26),new De({color:1182986,transparent:!0,opacity:.85})),d=new K(new Bt(l,.16),new De({color:13777454}));d.position.z=.01,c.add(h),c.add(d),c.position.set(t*P,r+.45,e*P),this.world.add(c),this.billboardProps.push(c),this.enemy={mesh:o,mat:a,c:t,r:e,bx:t*P,bz:e*P,hp:i,maxHp:i,elevel:n,hitAt:0,dyingAt:0,atkAt:0,hitApplied:!1,nextAtk:0,bar:c,barFill:d};const u=new bn(6987984,.55,5,2);u.position.set(t*P,1.7,e*P),this.world.add(u),this.poofTex||this.loadArt(P1,f=>this.poofTex=this.fxFilter(f)),this.loadArt(L1,f=>{const g=f.image,_=g&&g.width&&g.height?g.width/g.height:.47;o.geometry.dispose(),o.geometry=new Bt(r*_,r),o.position.y=r/2,a.map=f,a.opacity=1,a.needsUpdate=!0})}onEquip(t){this.currentWeapon=t,this.recomputeDerived()}atkWithBonus(t){const e=(this.passive.dmg??0)+(this.passive.mdmg??0);return Math.round(t*(1+e))}applyPassives(t){this.skillRanks={...t},this.refreshActionBar(),this.passive=zv(t),this.recomputeDerived()}allocAttr(t,e){if(e>0){if(this.unspent<=0)return;this.prim[t]+=1,this.unspent-=1}else{if(this.prim[t]<=this.baseAttr[t])return;this.prim[t]-=1,this.unspent+=1}this.recomputeDerived()}recomputeDerived(){this.sec=Zr(this.prim,this.clsHp,this.clsMp);const t=this.playerMaxHp>0?this.playerHp/this.playerMaxHp:1,e=this.playerMaxMp>0?this.playerMp/this.playerMaxMp:1;this.playerMaxHp=Math.round(this.sec.hp*(1+(this.passive.life??0))),this.playerMaxMp=Math.round(this.sec.mp*(1+(this.passive.mana??0))),this.playerHp=Math.max(1,Math.round(this.playerMaxHp*t)),this.playerMp=Math.round(this.playerMaxMp*e),this.stats.str=this.prim.str,this.stats.dex=this.prim.dex,this.stats.int=this.prim.int,this.stats.def=this.sec.def+Math.round((this.passive.def??0)+(this.passive.mres??0));const n=this.currentWeapon?.dmg??0;this.stats.atk=Math.round(this.atkWithBonus(this.sec.atkPhys+n)*this.buffAtkMul()),this.ui.setHealth(this.playerHp/this.playerMaxHp),this.ui.setMana(this.playerMp/this.playerMaxMp),this.refreshStats()}rollDamage(t,e){const n=e?this.passive.mdmg??0:this.passive.dmg??0;let i=t*(1+n)*this.buffAtkMul();const r=Math.random()*100<this.sec.crit;return r&&(i*=this.sec.critDmg/100),{dmg:Math.max(1,Math.round(i)),crit:r}}projectToScreen(t,e,n){const i=new D(t,e,n).project(this.camera),r=this.renderer.domElement.getBoundingClientRect();return{x:r.left+(i.x+1)/2*r.width,y:r.top+(1-i.y)/2*r.height}}tryHitEnemy(){const t=this.enemy;if(!t||t.dyingAt)return;const[e,n]=Cn[this.facing];if(this.col+e!==t.c||this.row+n!==t.r)return;const i=this.sec.atkPhys+(this.currentWeapon?.dmg??0),r=this.rollDamage(i,!1);this.dealDamageToEnemy(t,r.dmg,r.crit)}dealDamageToEnemy(t,e,n=!1){if(t.dyingAt)return;const i=Math.max(1,Math.round(e));t.hp-=i,t.hitAt=performance.now();const r=Math.max(1e-4,t.hp/t.maxHp);t.barFill.scale.x=r,t.barFill.position.x=-(1-r)*1.3/2;const a=this.projectToScreen(t.bx,1.8,t.bz);if(this.ui.floatText(a.x,a.y,n?`${i}!`:`${i}`,n?"crit":"hit"),t.hp<=0){t.dyingAt=t.hitAt,this.blocked.delete(`${t.c},${t.r}`),this.spawnPoof(t.bx,t.bz),this.target===t&&this.clearTarget();const o=t.elevel,l=4+o*3+Math.floor(Math.random()*(3+o*2));this.stats.gold+=l,this.gainXp(30+o*15),this.ui.toast(`+${l} ouro`)}}cellDist(t){return Math.max(Math.abs(this.col-t.c),Math.abs(this.row-t.r))}buffAtkMul(){return this.buff&&performance.now()<this.buff.until?this.buff.atkMul:1}buffDefReduc(){return this.buff&&performance.now()<this.buff.until?this.buff.defReduc:0}refreshActionBar(){const t=$v(this.classId,this.skillRanks);this.ui.setActionBar(t.map(e=>({id:e.id,name:e.name,icon:e.icon,mana:e.combat.mana})))}useSkill(t){const e=this.skillRanks[t]||0;if(e<=0)return;const n=fl(t),i=performance.now();if((this.cooldownUntil[t]??0)>i){this.ui.toast("Recarregando…");return}if(this.playerMp<n.mana){this.ui.toast("Mana insuficiente");return}if(n.target==="enemy"){(!this.target||this.target.dyingAt)&&this.enemy&&!this.enemy.dyingAt&&this.setTarget(this.enemy);const r=this.target;if(!r||r.dyingAt){this.ui.toast("Sem alvo");return}const a=this.cellDist(r),o=n.melee?1:n.range;if(a>o){this.ui.toast(n.melee?"Muito longe (corpo-a-corpo)":"Fora de alcance");return}}if(this.playerMp=Math.max(0,this.playerMp-n.mana),this.ui.setMana(this.playerMp/this.playerMaxMp),this.ui.skillManaFloat(t,n.mana),this.cooldownUntil[t]=i+n.cd,this.coolingSkills.add(t),n.effect==="dmg"&&this.target){const r=this.target.bx,a=this.target.bz,o=this.target,l=n.power*(1+.25*(e-1)),c=!n.melee&&n.magic?360:0;c>0&&this.ui.castBar(qv(t),c);const h=Lh(t),d=Nb.has(t),u=()=>{if(this.enemy===o&&!o.dyingAt){const g=this.rollDamage(l,n.magic);this.dealDamageToEnemy(o,g.dmg,g.crit)}},f=()=>{Ps[t]&&this.spawnEffect(t,r,a),d?window.setTimeout(u,h):u()};c>0?window.setTimeout(f,c):f(),n.melee&&this.ui.swingWeapon()}else if(n.effect==="heal"){const r=Math.round(n.power*(1+.25*(e-1))),a=this.playerHp;this.playerHp=Math.min(this.playerMaxHp,this.playerHp+r),this.ui.setHealth(this.playerHp/this.playerMaxHp),this.refreshStats();const o=this.playerHp-a;this.ui.floatText(window.innerWidth/2,window.innerHeight*.46,`+${o}`,"heal"),this.ui.toast(`+${r} vida`)}else n.effect==="buff"&&(this.buff={atkMul:n.atkMul??1,defReduc:n.defReduc??0,until:i+(n.dur??6e3)},this.recomputeDerived(),this.ui.toast("Fortalecido!"))}setTarget(t){this.target=t,this.ensureReticle(),this.reticle&&(this.reticle.visible=!0)}clearTarget(){this.target=null,this.reticle&&(this.reticle.visible=!1)}ensureReticle(){if(this.reticle)return;const t=document.createElement("canvas");t.width=128,t.height=128;const e=t.getContext("2d"),n=64;e.shadowColor="rgba(0,0,0,.5)",e.shadowBlur=5,e.strokeStyle="rgba(255,228,150,.9)",e.lineWidth=4,e.beginPath(),e.arc(n,n,50,0,Math.PI*2),e.stroke(),e.lineCap="round",e.lineWidth=5;const i=l=>{const c=Math.cos(l),h=Math.sin(l);e.beginPath(),e.moveTo(n+c*44,n+h*44),e.lineTo(n+c*56,n+h*56),e.stroke()};i(-Math.PI/2),i(Math.PI/2),i(0),i(Math.PI);const r=new Mn(t);r.colorSpace=Ie;const a=new De({map:r,transparent:!0,opacity:.9,depthTest:!0,depthWrite:!1}),o=new K(new Bt(1.15,1.15),a);o.renderOrder=999,o.visible=!1,this.reticle=o,this.world.add(o),this.billboardProps.push(o)}onCanvasPointer(t){const e=this.enemy;if(!e||e.dyingAt)return;const n=this.renderer.domElement.getBoundingClientRect(),i=(t.clientX-n.left)/n.width*2-1,r=-((t.clientY-n.top)/n.height)*2+1;this.raycaster.setFromCamera(new _t(i,r),this.camera),this.raycaster.intersectObject(e.mesh,!1).length&&this.setTarget(e)}spawnPoof(t,e){if(!this.poofTex)return;const n=this.poofTex.clone();n.needsUpdate=!0,n.repeat.set(1/Or,1),n.offset.set(0,0);const i=new De({map:n,transparent:!0,depthWrite:!1,side:Kt}),r=new K(new Bt(3.8,2.85),i);r.position.set(t,1.5,e),this.world.add(r),this.poofs.push({mesh:r,mat:i,tex:n,born:performance.now()})}updatePoofs(t){if(this.poofs.length===0)return;const e=this.camera.position.x,n=this.camera.position.z;for(let i=this.poofs.length-1;i>=0;i--){const r=this.poofs[i],a=(t-r.born)/Ob;if(a>=1){this.world.remove(r.mesh),r.mesh.geometry.dispose(),r.mat.dispose(),r.tex.dispose(),this.poofs.splice(i,1);continue}const o=Math.min(Or-1,Math.floor(a*Or));r.tex.offset.x=o/Or,r.mesh.rotation.y=Math.atan2(e-r.mesh.position.x,n-r.mesh.position.z)}}preloadFx(){for(const t in Ps){const e=Ps[t].url;this.fxTexCache[e]||this.loadArt(e,n=>this.fxTexCache[e]=this.fxFilter(n))}}fxFilter(t){return t.minFilter=Ze,t.magFilter=Ze,t.generateMipmaps=!1,t.needsUpdate=!0,t}spawnEffect(t,e,n){const i=Ps[t];if(!i)return;const r=this.fxTexCache[i.url];if(!r){this.loadArt(i.url,m=>this.fxTexCache[i.url]=this.fxFilter(m));return}const a=i.frames,o=r.clone();this.fxFilter(o),o.repeat.set(1/a,1),o.offset.set(0,0);const l=r.image,c=l&&l.height?l.width/a/l.height:1,h=new De({map:o,transparent:!0,depthWrite:!1,depthTest:!1,side:Kt}),d=2.8,u=c>=1?d:d*c,f=c>=1?d/c:d,g=new K(new Bt(u,f),h),_=Fb.has(t)?f/2:1.5;g.position.set(e,_,n),g.renderOrder=20,this.world.add(g),this.projectiles.push({mesh:g,mat:h,tex:o,frames:a,born:performance.now(),ms:Lh(t),fromX:e,fromZ:n,toX:e,toZ:n})}updateProjectiles(t){if(this.projectiles.length===0)return;const e=this.camera.position.x,n=this.camera.position.z;for(let i=this.projectiles.length-1;i>=0;i--){const r=this.projectiles[i],a=(t-r.born)/r.ms;if(a>=1){this.world.remove(r.mesh),r.mesh.geometry.dispose(),r.mat.dispose(),r.tex.dispose(),this.projectiles.splice(i,1);continue}const o=Math.min(r.frames-1,Math.max(0,Math.floor(a*r.frames)));r.tex.offset.x=o/r.frames,r.mesh.rotation.y=Math.atan2(e-r.mesh.position.x,n-r.mesh.position.z)}}nextXpMax(t){return Math.round(100+(t-1)*60)}gainXp(t){if(this.stats.level>=100)return;this.stats.xp+=t;let e=0;for(;this.stats.level<100&&this.stats.xp>=this.stats.xpMax;)this.stats.xp-=this.stats.xpMax,this.stats.level++,this.stats.xpMax=this.nextXpMax(this.stats.level),e++;this.stats.level>=100&&(this.stats.xp=0),e>0&&(this.playerHp=this.playerMaxHp,this.playerMp=this.playerMaxMp,this.unspent+=e*hb,this.ui.setHealth(1),this.ui.setMana(1),this.ui.setSkillInfo(this.classId,Ph(this.stats.level)),this.ui.toast(`Nível ${this.stats.level}!`)),this.refreshStats()}refreshStats(){this.ui.setStats({level:this.stats.level,xp:this.stats.xp,xpMax:this.stats.xpMax,hp:this.playerHp,hpMax:this.playerMaxHp,mp:this.playerMp,mpMax:this.playerMaxMp,atk:this.stats.atk,def:this.stats.def,str:this.stats.str,dex:this.stats.dex,int:this.stats.int,gold:this.stats.gold,points:this.unspent,strMin:this.baseAttr.str,dexMin:this.baseAttr.dex,intMin:this.baseAttr.int,atkMag:this.atkWithBonus(this.sec.atkMag),crit:this.sec.crit,critDmg:this.sec.critDmg,precision:this.sec.precision,magRes:this.sec.magRes,evasion:this.sec.evasion})}damagePlayer(t){if(this.playerHp<=0)return;const e=t*(1-this.buffDefReduc()),n=Math.max(1,Math.round(e));this.playerHp=Math.max(0,this.playerHp-n),this.ui.setHealth(this.playerHp/this.playerMaxHp),this.refreshStats(),this.ui.flashDamage(),this.ui.floatText(window.innerWidth/2,window.innerHeight*.58,`-${n}`,"player"),this.playerHp<=0&&window.setTimeout(()=>{this.playerHp=this.playerMaxHp,this.ui.setHealth(1),this.refreshStats();const i=sh();this.enterLocation("village",i.col,i.row,0)},800)}buildChimneySmoke(){const t=this.smokeTex(),e=[[5,5],[9,5],[1,9],[13,9],[7,5],[1,7]];for(const[n,i]of e)for(let r=0;r<4;r++){const a=new K(new Bt(1.4,1.4),new De({map:t,transparent:!0,depthWrite:!1,opacity:0}));a.position.set(n*P+.4,ni+ea,i*P),a.userData={phase:(n*3.1+i*1.7+r*1.3)%4,baseX:n*P+.4,baseZ:i*P},this.world.add(a),this.smoke.push(a)}}smokeTex(){if(this._smokeTex)return this._smokeTex;const t=document.createElement("canvas");t.width=64,t.height=64;const e=t.getContext("2d"),n=e.createRadialGradient(32,32,2,32,32,30);n.addColorStop(0,"rgba(220,220,224,0.9)"),n.addColorStop(1,"rgba(220,220,224,0)"),e.fillStyle=n,e.beginPath(),e.arc(32,32,30,0,Math.PI*2),e.fill();const i=new Mn(t);return i.colorSpace=Ie,this._smokeTex=i,i}buildVillageForestGate(){const t=rh(),e=t.col*P,n=t.row*P,i=new ct({map:Xe(5)}),r=new ct({map:ua(63)}),a=new Bt(P,P);for(let g=0;g<=2;g++){const _=new K(a,r);_.rotation.x=-Math.PI/2,_.rotation.z=g%2*Math.PI/2,_.position.set(e,.02,(t.row-g)*P),this.world.add(_)}const o=new He,l=new Me(.36,3.4,.36);for(const g of[-1.5,1.5]){const _=new K(l,i);_.position.set(g,1.7,0),o.add(_)}const c=new K(new Me(3.7,.36,.4),i);c.position.set(0,3.35,0),o.add(c);for(const g of[-1,1]){const _=new K(new Me(.7,.16,.16),i);_.position.set(g*1.05,3,0),_.rotation.z=g*(Math.PI/4),o.add(_)}const h=new K(new Bt(1.7,.6),new De({map:ha("Floresta"),transparent:!0,side:Kt}));h.position.set(0,2.72,0),h.rotation.y=Math.PI,o.add(h);const d=new ct({color:3815994});for(const g of[-.7,.7]){const _=new K(new be(.02,.02,.4,5),d);_.position.set(g,3.05,0),o.add(_)}o.position.set(e,0,n),this.world.add(o);const u=new ct({map:kr(61)});u.map.repeat.set(8,5);const f=new K(new Bt(8*P,5*P),u);f.rotation.x=-Math.PI/2,f.position.set(e,-.02,(t.row+2.5)*P),this.world.add(f);for(let g=1;g<=3;g++){const _=new K(a,r);_.rotation.x=-Math.PI/2,_.rotation.z=g%2*Math.PI/2,_.position.set(e,.02,(t.row+g)*P),this.world.add(_)}this.buildTreelineBackdrop(e,(t.row+3.4)*P,Math.PI)}makeClusterMats(){return Fr.map(t=>{const e=new ct({transparent:!0,opacity:0,side:Kt});return this.loadArt(t.url,n=>{e.map=n,e.alphaTest=.35,e.opacity=1,e.needsUpdate=!0}),{mat:e,aspect:t.aspect}})}buildTreelineBackdrop(t,e,n){if(Fr.length===0)return;const i=this.makeClusterMats(),r=13;let a=t-r*1.9;for(let o=0;o<3;o++){const l=i[o%i.length],c=r*l.aspect,h=new K(new Bt(c,r),l.mat);h.position.set(a+c/2,r/2-1,e),h.rotation.y=n,o===1&&(h.scale.x=-1),this.world.add(h),a+=c*.92}}buildMountain(){const t=new ct({map:da(41)});let e=pn,n=nn;for(let r=0;r<nn;r++)for(let a=0;a<pn;a++)Ce(a,r)==="mountain"&&(e=Math.min(e,a),n=Math.min(n,r));const i=(r,a)=>{const o=r-e,l=a-n,c=Math.sqrt(o*o+l*l);return Math.max(ni+2.5,ni+11-c*1.7+this.mHash(r,a)*2)};for(let r=0;r<nn;r++)for(let a=0;a<pn;a++){const o=Ce(a,r),l=o==="tunnel"||o==="stairs";if(o!=="mountain"&&!l)continue;const c=i(a,r),h=l?Br:0,d=c-h;if(d<=.2)continue;const u=new K(new Me(P,d,P),t);if(u.position.set(a*P,h+d/2,r*P),this.world.add(u),!l&&this.mHash(a,r,2)>.35){const f=1.6+this.mHash(a,r,3)*1.8,g=new K(new Me(f,f,f),t);g.position.set(a*P+(this.mHash(a,r,4)-.5)*2.4,c+f*.25,r*P+(this.mHash(a,r,5)-.5)*2.4),g.rotation.y=this.mHash(a,r,6)*Math.PI,this.world.add(g)}}}mHash(t,e,n=0){const i=Math.sin(t*41.3+e*17.7+n*7.13)*9871.2;return i-Math.floor(i)}buildBarrels(t,e,n){const i=new be(.4,.34,1.05,14),r=new be(.41,.41,.08,14);for(let a=0;a<nn;a++)for(let o=0;o<pn;o++){if(Ce(o,a)!=="barrel")continue;const l=Cn.filter(([x,E])=>Ce(o+x,a+E)==="building");if(l.length===0)continue;const c=l.find(([x,E])=>!e.has(`${o+x},${a+E},${-x},${-E}`))||l[0],[h,d]=c;let u=0,f=0;const g=1.05;h!==0?f=(Ce(o,a-1)==="building"?-1:Ce(o,a+1)==="building"||n(o,a)>0?1:-1)*g:u=(Ce(o-1,a)==="building"?-1:Ce(o+1,a)==="building"||n(o,a)>0?1:-1)*g;const _=o*P+h*(P/2-.5)+u,m=a*P+d*(P/2-.5)+f,p=new He,w=new K(i,t);w.position.y=.52,p.add(w);const M=new K(r,t);if(M.position.y=1.05,p.add(M),n(o,a,5)>.15){const x=new K(i,t);x.scale.set(.82,.82,.82),x.position.set(-u*.5-h*.1,.42,-f*.5-d*.1),p.add(x)}p.position.set(_,0,m),this.world.add(p)}}buildWell(){const t=$i.c*P,e=$i.r*P;this.blocked.add(`${$i.c},${$i.r}`);const n=new ct({map:ii(31)}),i=new ct({map:Xe(5)}),r=new ct({map:As(3),side:Kt}),a=new He,o=new K(new be(1.15,1.25,1.05,24,1,!0),n);o.position.y=.52,a.add(o);const l=new K(new be(.98,.98,1.05,24,1,!0),new ct({color:1512208,side:sn}));l.position.y=.52,a.add(l);const c=new K(new Il(.98,1.16,24),new ct({color:9274231,side:Kt}));c.rotation.x=-Math.PI/2,c.position.y=1.045,a.add(c);const h=new K(new be(.97,.97,.05,28),new kx({color:3109512,specular:12578559,shininess:100,transparent:!0,opacity:.95}));h.position.y=.86,a.add(h);const d=new K(new Is(.6,24),new De({color:12577525,transparent:!0,opacity:.25}));d.rotation.x=-Math.PI/2,d.position.set(-.12,.87,-.08),a.add(d),this.waterGlint=d;const u=new Me(.16,2,.16);for(const p of[-1,1]){const w=new K(u,i);w.position.set(p*.95,1.55,0),a.add(w)}const f=new K(new Me(2.2,.14,.14),i);f.position.y=2.5,a.add(f);const g=new K(new be(.025,.025,.72,6),new ct({color:7034422}));g.position.set(.2,2.08,0),a.add(g);const _=new K(new be(.24,.2,.34,12),i);_.position.set(.2,1.7,0),a.add(_);const m=new K(new Hn(1.7,.95,4),r);m.position.y=3.05,m.rotation.y=Math.PI/4,a.add(m),a.position.set(t,0,e),this.world.add(a)}buildTunnel(){const t=new ct({map:xv(43),side:Kt}),e=new ct({map:wh(47),side:Kt}),n=new ct({map:wh(51),side:Kt}),i=new ct({map:ii(31)});let r=null;for(let a=0;a<nn;a++)for(let o=0;o<pn;o++){if(!ih(o,a))continue;const l=o*P,c=a*P,h=Ce(o,a)==="stairs",d=new K(new Bt(P,P),n);if(d.rotation.x=Math.PI/2,d.position.set(l,Br,c),this.world.add(d),!h){const u=new K(new Bt(P,P),t);u.rotation.x=-Math.PI/2,u.position.set(l,.03,c),this.world.add(u)}for(const[u,f]of Cn){const g=Ce(o+u,a+f);g==="street"?r=[o,a]:(g==="mountain"||g==="building")&&!h&&this.addWall(l,c,u,f,0,Br,e)}h&&this.buildStairs(o,a,l,c,e,i)}if(r){const[a,o]=r,l=a*P,c=o*P,h=new De({color:16757322});for(const u of[-1,1]){const f=new K(new be(.05,.05,1.1,8),new ct({color:2759696}));f.position.set(l+u*(P/2-.25),1.9,c),this.world.add(f);const g=new K(new Nl(.18,10,10),h);g.position.set(l+u*(P/2-.25),2.55,c),this.world.add(g)}const d=new bn(16752704,7,16,2);d.position.set(l,2.4,c+.5),this.world.add(d),this.flames.push({light:d,base:6})}}addDungeonLights(){this.world.add(new ys(7762307,1.05)),this.world.add(new Ms(9143960,2104617,.72))}addShowcaseLights(){this.world.add(new ys(6975874,.55)),this.world.add(new Ms(10465480,2762272,.5));const t=new ta(14674687,1.3);t.position.set(aa,ts+30,la),t.target.position.set(aa,ts,la),this.world.add(t.target),this.world.add(t)}moteTex(){if(this.moteTexCache)return this.moteTexCache;const t=document.createElement("canvas");t.width=t.height=32;const e=t.getContext("2d"),n=e.createRadialGradient(16,16,0,16,16,16);n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.4,"rgba(255,255,255,0.5)"),n.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=n,e.fillRect(0,0,32,32);const i=new Mn(t);return this.moteTexCache=i,i}spawnMotes(t,e,n,i,r,a,o,l,c,h=.0016){const d=new Float32Array(o*3),u=new Float32Array(o);for(let m=0;m<o;m++)d[m*3]=t+(Math.random()-.5)*n,d[m*3+1]=r+Math.random()*(a-r),d[m*3+2]=e+(Math.random()-.5)*i,u[m]=.12+Math.random()*.5;const f=new Pe;f.setAttribute("position",new je(d,3));const g=new fd({color:l,size:c,map:this.moteTex(),transparent:!0,opacity:.72,depthWrite:!1,sizeAttenuation:!0,blending:Jr}),_=new ix(f,g);_.renderOrder=8,this.world.add(_),this.motes.push({pts:_,sp:u,y0:r,y1:a,sway:h})}applyHeightFog(t,e,n,i){const r=new Ot(i);t.onBeforeCompile=a=>{a.uniforms.hfColor={value:r},a.uniforms.hfClear={value:e},a.uniforms.hfFull={value:n},a.vertexShader=`varying float vWorldY;
`+a.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
  vWorldY = (modelMatrix * vec4(transformed, 1.0)).y;`),a.fragmentShader=`uniform vec3 hfColor;
uniform float hfClear;
uniform float hfFull;
varying float vWorldY;
`+a.fragmentShader.replace("#include <fog_fragment>",`#include <fog_fragment>
  float hf = clamp((vWorldY - hfClear) / (hfFull - hfClear), 0.0, 1.0);
  gl_FragColor.rgb = mix(gl_FragColor.rgb, hfColor, hf);`)},t.needsUpdate=!0}softPuffTex(){if(this.softPuffCache)return this.softPuffCache;const t=document.createElement("canvas");t.width=t.height=128;const e=t.getContext("2d"),n=e.createRadialGradient(64,64,0,64,64,64);n.addColorStop(0,"rgba(255,255,255,0.9)"),n.addColorStop(.5,"rgba(255,255,255,0.35)"),n.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=n,e.fillRect(0,0,128,128);const i=new Mn(t);return this.softPuffCache=i,i}cloudDomeTex(){if(this.cloudTexCache)return this.cloudTexCache;const t=512,e=256,n=document.createElement("canvas");n.width=t,n.height=e;const i=n.getContext("2d"),r=i.createImageData(t,e);for(let o=0;o<e;o++){const l=o/(e-1),c=Math.min(1,Math.max(0,(.7-l)/.7));for(let h=0;h<t;h++){const d=this.fbm(h*.02,o*.05,3.3),u=Math.min(1,Math.max(0,(d-.34)*2.3));let f=c*(.4+.6*u);l<.14&&(f=Math.max(f,(.14-l)/.14));const g=(o*t+h)*4;r.data[g]=r.data[g+1]=r.data[g+2]=255,r.data[g+3]=Math.round(Math.min(1,f)*255)}}i.putImageData(r,0,0);const a=new Mn(n);return a.wrapS=dn,a.flipY=!1,this.cloudTexCache=a,a}fogSmokeTex(t){if(this.smokeTexes[t])return this.smokeTexes[t];const e=128,n=document.createElement("canvas");n.width=n.height=e;const i=n.getContext("2d"),r=i.createImageData(e,e),a=t*17.3;for(let l=0;l<e;l++)for(let c=0;c<e;c++){const h=c/e-.5,d=l/e-.5,u=Math.sqrt(h*h+d*d)*2,f=Math.max(0,1-u),g=f*f,_=this.fbm(c*.05+a,l*.05+a,t*4.7),m=g*(.45+.55*_),p=(l*e+c)*4;r.data[p]=r.data[p+1]=r.data[p+2]=255,r.data[p+3]=Math.round(Math.min(1,m)*255)}i.putImageData(r,0,0);const o=new Mn(n);return this.smokeTexes[t]=o,o}spawnFogPuffs(t,e,n,i,r,a,o,l,c=.3,h=1.1,d=.16,u=8,f=18){const g=new Ot(o),_=new Ot(l);for(let m=0;m<n;m++){const p=g.clone().lerp(_,Math.random()),w=new $r({map:this.fogSmokeTex(m%4),color:p,transparent:!0,opacity:d,depthWrite:!1,fog:!1,rotation:Math.random()*Math.PI*2}),M=new Yo(w),x=u+Math.random()*(f-u);M.scale.set(x,x,1);const E=Math.random()*Math.PI*2,y=a*(c+Math.random()*(h-c)),R=t+Math.cos(E)*y,A=e+Math.sin(E)*y,v=i+Math.random()*(r-i);M.position.set(R,v,A),M.renderOrder=9,this.world.add(M),this.fogPuffs.push({s:M,bx:R,bz:A,by:v,ph:Math.random()*6.28,rad:1.2+Math.random()*2.6,baseOp:d*(.7+Math.random()*.6),rotSp:(Math.random()-.5)*.04,rise:.3+Math.random()*.7})}}buildShowcase(){const t=no,e=io,n=jx,i=Zx,r=ts,a=r+32,o=8160144,l=r+4,c=r+26,h=(H,nt,st)=>{const pt=ii(31);return pt.wrapS=pt.wrapT=dn,pt.repeat.set(H,nt),new ct({map:pt,color:st??16777215,side:Kt})},d=h(1.4,1.4),u=h(1.4,.5,13092807),f=h(1,1),g=h(5,3,12105912),_=h(2,2),m=h(3,2),p=xh();p.wrapS=p.wrapT=dn,p.repeat.set(1,1);const w=new ct({map:p,side:Kt}),M=kr(61);M.wrapS=M.wrapT=dn,M.repeat.set(4,4);const x=new ct({map:M,side:Kt});for(const H of[f,g,d,u,w])this.applyHeightFog(H,l,c,o);const E=(H,nt,st,pt,Vt,ie,oe)=>{const ye=H.length/3;H.push(...pt,...Vt,...ie,...oe),nt.push(0,0,1,0,1,1,0,1),st.push(ye,ye+1,ye+2,ye,ye+2,ye+3)},y=mo.slice(0,Xs+1),R=H=>Math.atan2(H.z-e,H.x-t),A=R(y[1])-R(y[0]),v=[],b=[],C=[],U=[],I=[],V=[],$=(H,nt,st)=>[t+nt*Math.cos(H),st,e+nt*Math.sin(H)];for(let H=0;H<y.length;H++){const nt=R(y[H]),st=y[H].y,pt=nt-A/2,Vt=nt+A/2;if(E(v,b,C,$(pt,n,st),$(Vt,n,st),$(Vt,i,st),$(pt,i,st)),H>0){const ie=y[H-1].y;E(U,I,V,$(pt,n,ie),$(pt,i,ie),$(pt,i,st),$(pt,n,st))}}const X=(H,nt,st,pt)=>{const Vt=new Pe;Vt.setAttribute("position",new ue(H,3)),Vt.setAttribute("uv",new ue(nt,2)),Vt.setIndex(st),Vt.computeVertexNormals();const ie=new K(Vt,pt);return this.world.add(ie),ie};X(v,b,C,d),X(U,I,V,u);const rt=new K(new be(n,n,r,32,1,!0),g);rt.position.set(t,r/2,e),this.world.add(rt);const j=new K(new Is(i,40),d);j.rotation.x=-Math.PI/2,j.position.set(t,.02,e),this.world.add(j);const ft=Math.atan2(Ts-e,-Math.sqrt(Math.max(0,i*i-(Ts-e)**2))),xt=.36,Rt=r-1,Wt=r+4.5,ae=(H,nt)=>Math.abs(Math.atan2(Math.sin(H-nt),Math.cos(H-nt))),J=60,ot=[[0,Rt],[Rt,Wt],[Wt,a]],yt=[],mt=[],zt=[],qt=i*2*Math.PI/J/4;for(const[H,nt]of ot){const st=H===Rt;for(let pt=0;pt<J;pt++){const Vt=pt/J*Math.PI*2,ie=(pt+1)/J*Math.PI*2;if(st&&ae((Vt+ie)/2,ft)<xt)continue;const oe=t+i*Math.cos(Vt),ye=e+i*Math.sin(Vt),Be=t+i*Math.cos(ie),Ge=e+i*Math.sin(ie),ke=pt*qt,Je=(pt+1)*qt,Qe=yt.length/3;yt.push(oe,H,ye,Be,H,Ge,Be,nt,Ge,oe,nt,ye),mt.push(ke,H/4,Je,H/4,Je,nt/4,ke,nt/4),zt.push(Qe,Qe+1,Qe+2,Qe,Qe+2,Qe+3)}}const Yt=new Pe;Yt.setAttribute("position",new ue(yt,3)),Yt.setAttribute("uv",new ue(mt,2)),Yt.setIndex(zt),Yt.computeVertexNormals(),this.world.add(new K(Yt,f));const Ht=aa,Zt=la,he=nv+1.8,B=2,ve=3.4,te=Ht+he-.2,Jt=mh-te,Ct=(mh+te)/2,ce=new K(new Bt(Jt,B*2),_);ce.rotation.x=-Math.PI/2,ce.position.set(Ct,r+.02,Ts),this.world.add(ce);for(const H of[-1,1]){const nt=new K(new Bt(Jt,ve),m);nt.position.set(Ct,r+ve/2,Ts+H*B),this.world.add(nt)}const It=new K(new Bt(Jt,B*2),m);It.rotation.x=Math.PI/2,It.position.set(Ct,r+ve,Ts),this.world.add(It);const L=he,S=new Bt(P,P);for(const[H,nt]of ev()){const st=new K(S,x);st.rotation.x=-Math.PI/2,st.position.set(H*P,r+.02,nt*P),this.world.add(st)}const G=new K(new Is(L,44),x);G.rotation.x=-Math.PI/2,G.position.set(Ht,r+.05,Zt),this.world.add(G);const tt=Math.asin(Math.min(.98,B/he))-.03,et=72,Q=r-2,St=r+ve,ht=r-2+a,Mt=he*2*Math.PI/et/4,ee=[[Q,St,!0],[St,ht,!1]],it=[],bt=[],Pt=[];for(const[H,nt,st]of ee)for(let pt=0;pt<et;pt++){const Vt=pt/et*Math.PI*2,ie=(pt+1)/et*Math.PI*2,oe=Math.atan2(Math.sin((Vt+ie)/2),Math.cos((Vt+ie)/2));if(st&&Math.abs(oe)<tt)continue;const ye=Ht+he*Math.cos(Vt),Be=Zt+he*Math.sin(Vt),Ge=Ht+he*Math.cos(ie),ke=Zt+he*Math.sin(ie),Je=pt*Mt,Qe=(pt+1)*Mt,rn=it.length/3;it.push(ye,H,Be,Ge,H,ke,Ge,nt,ke,ye,nt,Be),bt.push(Je,H/4,Qe,H/4,Qe,nt/4,Je,nt/4),Pt.push(rn,rn+1,rn+2,rn,rn+2,rn+3)}const Nt=new Pe;Nt.setAttribute("position",new ue(it,3)),Nt.setAttribute("uv",new ue(bt,2)),Nt.setIndex(Pt),Nt.computeVertexNormals(),this.world.add(new K(Nt,w)),this.blocked.add(`${hi.col},${hi.row}`);const wt=ph.x,jt=ph.z,Xt=new ct({map:vh(),side:Kt}),le=new K(new be(.9,1.1,.7,16),Xt);le.position.set(wt,r+.4,jt),this.world.add(le);const F=new ct({color:14080479,emissive:2041137}),dt=new K(new be(.4,.55,2.4,6),F);dt.position.set(wt,r+.75+1.2,jt),this.world.add(dt),this.glowLight(wt,r+1.9,jt,13625087,3.6,13),this.glowLight(Ht,r+13,Zt,14674687,4.5,34);const Y=this.decalMat(_a,.1);for(let H=2;H<y.length;H+=4){const nt=R(y[H]),st=y[H].y+2,pt=t+(i-.25)*Math.cos(nt),Vt=e+(i-.25)*Math.sin(nt),ie=new K(new Bt(.9,1.4),Y);ie.position.set(pt,st,Vt),ie.rotation.y=Math.atan2(t-pt,e-Vt),this.world.add(ie),this.glowLight(pt,st+.2,Vt,16752704,5,10)}for(const H of[Math.PI*.6,Math.PI*1.4])this.glowLight(Ht+Math.cos(H)*(L-1),r+2.4,Zt+Math.sin(H)*(L-1),16752704,2.6,9);this.spawnMotes(Ht,Zt,L*2,L*2,r+.2,r+6,60,14673650,.09,.0022),this.spawnFogPuffs(Ht,Zt,24,r+.6,r+10,L*.55,7370886,11186880,0,1,.05,16,34),this.spawnFogPuffs(t,e,10,1,r-1,n+.5,7370886,10134192,0,.7,.04,14,26)}vnoise(t,e,n){const i=(x,E,y)=>{const R=Math.sin(x*127.1+E*311.7+y*74.7)*43758.5453;return R-Math.floor(R)},r=Math.floor(t),a=Math.floor(e),o=Math.floor(n),l=t-r,c=e-a,h=n-o,d=x=>x*x*(3-2*x),u=d(l),f=d(c),g=d(h),_=(x,E,y)=>x+(E-x)*y,m=_(i(r,a,o),i(r+1,a,o),u),p=_(i(r,a+1,o),i(r+1,a+1,o),u),w=_(i(r,a,o+1),i(r+1,a,o+1),u),M=_(i(r,a+1,o+1),i(r+1,a+1,o+1),u);return _(_(m,p,f),_(w,M,f),g)}fbm(t,e,n){return this.vnoise(t,e,n)*.6+this.vnoise(t*2.1,e*2.1,n*2.1)*.3+this.vnoise(t*4.4,e*4.4,n*4.4)*.1}caveMesh(t,e,n,i,r,a,o,l,c=1,h=1){const d=[],u=[],f=[];for(let m=0;m<=a;m++)for(let p=0;p<=r;p++){const w=p/r,M=m/a;let x=t[0]+e[0]*w+n[0]*M,E=t[1]+e[1]*w+n[1]*M,y=t[2]+e[2]*w+n[2]*M;const R=Math.sin(Math.PI*w)*Math.sin(Math.PI*M),A=o*(this.fbm(x*.32,E*.32,y*.32)-.5)*R;x+=i[0]*A,E+=i[1]*A,y+=i[2]*A,d.push(x,E,y),u.push(w*c,M*h)}for(let m=0;m<a;m++)for(let p=0;p<r;p++){const w=m*(r+1)+p,M=w+1,x=w+r+1,E=x+1;f.push(w,x,M,M,x,E)}const g=new Pe;g.setAttribute("position",new ue(d,3)),g.setAttribute("uv",new ue(u,2)),g.setIndex(f),g.computeVertexNormals();const _=new K(g,l);return this.world.add(_),_}rockSpire(t,e,n,i,r,a){const o=new Hn(r,Math.abs(i-n),7,4),l=o.attributes.position;for(let h=0;h<l.count;h++){const d=l.getX(h),u=l.getY(h),f=l.getZ(h),g=this.fbm(d*2+t,u*2,f*2+e)-.5;l.setXYZ(h,d+g*r*.7,u,f+g*r*.7)}o.computeVertexNormals();const c=new K(o,a);return c.position.set(t,(n+i)/2,e),i<n&&(c.rotation.z=Math.PI),this.world.add(c),c}buildDungeon(){const t=eo,e=Ws,n=8.5,i=P/2,r=(v,b,C=0)=>Math.abs(Math.sin(v*12.9+b*78.2+C*3.1)*43758.5%1),a=new ct({map:xh(),side:Kt}),o=new ct({map:vh(),side:Kt}),l=new ct({map:gv(),side:Kt}),c=this.decalMat(_a,.1),h=this.decalMat(Th,.08),d=new ct({map:Mh(69),transparent:!0,alphaTest:.5,side:Kt}),u=new ct({map:Xe(5)}),f=new ct({color:2564893}),g=new ct({map:ca(17)}),_=(v,b)=>{const C=si(v,b);return C==="wall"||C==="secret"?!1:Ur(v-1,b)&&Ur(v+1,b)||Ur(v,b-1)&&Ur(v,b+1)};let m=0;for(let v=0;v<e;v++)for(let b=0;b<t;b++){const C=si(b,v);if(C==="wall")continue;const U=b*P,I=v*P,V=C==="secret";this.caveMesh([U-i,0,I-i],[P,0,0],[0,0,P],[0,1,0],3,3,.12,o,1,1),this.caveMesh([U-i,n,I-i],[P,0,0],[0,0,P],[0,-1,0],5,5,3.4,l,1,1);for(const[$,X]of Cn){const rt=si(b+$,v+X),j=rt==="wall",ft=V&&rt!=="secret"&&_(b+$,v+X);if(j||ft){const xt=U+$*i,Rt=I+X*i,Wt=$!==0?[0,0,P]:[P,0,0],ae=$!==0?[xt,0,Rt-i]:[xt-i,0,Rt];this.caveMesh(ae,Wt,[0,n,0],[$,0,X],4,6,.9,a,1,2.4),ft&&this.addWallDecal(b,v,$,X,h,1.9,1.8,1.7)}rt==="wall"&&!V&&m<30&&r(b,v,$*5+X)<.2&&(this.addWallDecal(b,v,$,X,c,.85,1.4,2.1),this.glowLight(U+$*.3,2.3,I+X*.3,16752704,4.4,12),m++)}if(C==="bones"){const $=new K(new Bt(1.7,1.3),d);$.rotation.x=-Math.PI/2,$.position.set(U,.05,I),this.world.add($)}else if(C==="barrel"){const $=new K(new be(.42,.46,.95,12),g);$.position.set(U,.48,I),this.world.add($),this.blocked.add(`${b},${v}`)}else C==="chest"&&(this.buildChest(U,I,u,f),this.blocked.add(`${b},${v}`),this.glowLight(U,.9,I,16761703,1.5,6.5))}const p=this.decalMat(N1,.4),w=this.decalMat(F1,.4),M=4.7,x=1.5,E=2.6,y=[[22,12,0,1],[17,35,1,0]];for(const[v,b,C,U]of y){if(si(v,b)!=="gate")continue;this.addArchWall(v,b,C,U,a,x,E,n),this.addWallDecal(v,b,C,U,p,P,M,M/2);const{pivotL:I,pivotR:V}=this.buildSwingGate(v,b,C,U,w,P,M);this.glowLight(v*P+C*.4,2.4,b*P+U*.4,16757850,3.4,9),this.glowLight((v-C)*P,1.8,(b-U)*P,16760690,2.2,9),this.blocked.add(`${v},${b}`),this.gates.set(`${v},${b}`,{pivotL:I,pivotR:V})}const R=ah("U"),A=new bn(12574975,3.2,13,2);A.position.set(R.col*P,2.7,R.row*P),this.world.add(A),this.spawnDungeonEnemy()}buildChest(t,e,n,i){const r=new K(new Me(1,.6,.7),n);r.position.set(t,.3,e),this.world.add(r);const a=new K(new Me(1.03,.3,.73),n);a.position.set(t,.73,e),this.world.add(a);const o=new K(new Me(1.05,.95,.14),i);o.position.set(t,.46,e),this.world.add(o);const l=new bn(16764794,1.4,5,2);l.position.set(t,1.1,e),this.world.add(l)}spawnDungeonEnemy(){const t=Yx("E").filter(i=>!(i.col===this.col&&i.row===this.row));if(!t.length)return;let e=t[0],n=1/0;for(const i of t){const r=Math.abs(i.col-this.col)+Math.abs(i.row-this.row);r<n&&(n=r,e=i)}this.buildDungeonEnemy(e.col,e.row)}addWall(t,e,n,i,r,a,o){const l=new K(new Bt(P,a-r),o);return l.position.set(t+n*(P/2),(r+a)/2,e+i*(P/2)),n===1?l.rotation.y=-Math.PI/2:n===-1?l.rotation.y=Math.PI/2:i===1?l.rotation.y=Math.PI:l.rotation.y=0,this.world.add(l),l}addArchWall(t,e,n,i,r,a,o,l){const c=P/2,h=new xd;h.moveTo(-c,0),h.lineTo(c,0),h.lineTo(c,l),h.lineTo(-c,l),h.closePath();const d=new al;d.moveTo(-a,0),d.lineTo(a,0),d.lineTo(a,o),d.absarc(0,o,a,0,Math.PI,!1),d.lineTo(-a,0),h.holes.push(d);const u=new kl(h,20),f=u.attributes.uv;for(let _=0;_<f.count;_++)f.setXY(_,f.getX(_)*.18,f.getY(_)*.18);const g=new K(u,r);return g.position.set(t*P+n*(P/2),0,e*P+i*(P/2)),n===1?g.rotation.y=-Math.PI/2:n===-1?g.rotation.y=Math.PI/2:i===1?g.rotation.y=Math.PI:g.rotation.y=0,g.renderOrder=3,this.world.add(g),g}halfPlaneGeo(t,e,n){const i=new Bt(t,e),r=i.attributes.uv;for(let a=0;a<r.count;a++)r.setX(a,r.getX(a)*.5+n*.5);return i}buildSwingGate(t,e,n,i,r,a,o){const l=new He;l.position.set(t*P+n*(P/2+.06),0,e*P+i*(P/2+.06)),l.rotation.y=n===1?Math.PI/2:n===-1?-Math.PI/2:i===1?0:Math.PI;const c=new He;c.position.set(-a/2,0,0);const h=new K(this.halfPlaneGeo(a/2,o,0),r);h.position.set(a/4,o/2,0),h.renderOrder=4,c.add(h);const d=new He;d.position.set(a/2,0,0);const u=new K(this.halfPlaneGeo(a/2,o,1),r);return u.position.set(-a/4,o/2,0),u.renderOrder=4,d.add(u),l.add(c),l.add(d),this.world.add(l),{pivotL:c,pivotR:d}}buildStairs(t,e,n,i,r,a){const c=i+P/2,h=P/5,d=-5*.8;for(const[_,m]of Cn){const p=Ce(t+_,e+m);(p==="mountain"||p==="building")&&this.addWall(n,i,_,m,d,Br,r)}for(let _=0;_<5;_++){const m=-_*.8,p=c-(_+.5)*h,w=m-d,M=new K(new Me(P,w,h+.02),a);M.position.set(n,m-w/2,p),this.world.add(M)}const u=new K(new Bt(P,P),new De({color:328966}));u.rotation.x=-Math.PI/2,u.position.set(n,d+.02,i),this.world.add(u);const f=new bn(16760688,6,13,2);f.position.set(n,2.6,i+P/2-.3),this.world.add(f);const g=new bn(16752720,3.5,8,2);g.position.set(n,.4,i-.6),this.world.add(g)}buildEstablishments(t,e){for(const n of Uh){const{c:i,r,dc:a,dr:o,kind:l}=n;this.addDecal(i,r,a,o,t,"door"),this.doorMap.set(`${i},${r},${a},${o}`,l);const c=i*P+a*(P/2+.06),h=r*P+o*(P/2+.06),d=new K(new Bt(1.05,1.75),e);d.position.set(c-o*1.3,2.05,h+a*1.3),d.rotation.y=a===1?Math.PI/2:a===-1?-Math.PI/2:o===1?0:Math.PI,d.renderOrder=4,this.world.add(d);const u=new He,f=.46,g=new ct({map:ha(ma[l].name),transparent:!0,side:Kt}),_=new K(new Bt(f*mb,f),g);_.position.set(0,1.74,.03),u.add(_);const m=pb[l];m&&this.loadArt(m,E=>{g.map=E,g.needsUpdate=!0;const y=E.image;if(y&&y.width&&y.height){const R=y.width/y.height;_.geometry.dispose(),_.geometry=new Bt(f*R,f)}});const p=i*P+a*(P/2+.16),w=r*P+o*(P/2+.16),M=o,x=-a;u.position.set(p+M*1.5,0,w+x*1.5),u.rotation.y=a===1?Math.PI/2:a===-1?-Math.PI/2:o===1?0:Math.PI,this.world.add(u)}}buildHomes(t){for(const e of Dh){const{c:n,r:i,dc:r,dr:a,id:o}=e;this.addDecal(n,i,r,a,t,"door"),this.homeDoorMap.set(`${n},${i},${r},${a}`,o)}}addNPC(t,e,n,i,r,a,o=1,l,c){const h=_v(n),d=!!a,u=new ct({map:h,transparent:!0,alphaTest:.5,side:Kt}),f=(d?2.4:2.15)*o,g=(d?f*.671:1.3)*(d?1:o),_=d?f/2-f*.015+.06:1.1*o,m=new K(new Bt(g*.95,g*.55),new De({map:this.shadowTex(),transparent:!0,depthWrite:!1,opacity:.55})),p=c?this.wallLean(t,e):{x:0,z:0},w=t*P+p.x,M=e*P+p.z;m.rotation.x=-Math.PI/2,m.position.set(w,.03,M),m.renderOrder=1,this.world.add(m);const x=new K(new Bt(g,f),u);x.position.set(w,_,M),x.userData={baseY:_,h:f,ph:(t*12.9+e*7.3)%(Math.PI*2)},this.world.add(x);const E=this.makeNameTag(i.split(",")[0].trim());E.position.set(w,_+f/2+.18,M),this.world.add(E),this.npcs.push(x);const y=`${t},${e}`,R={name:i,lines:r,tex:h,art:!1,frames:1,portrait:void 0};this.npcMap.set(y,R),a&&this.loadArt(a,A=>{l&&(A.repeat.set(1/l.frames,1),A.offset.set(0,0),this.animTex.push({tex:A,frames:l.frames,fps:l.fps})),u.map=A,u.needsUpdate=!0,R.tex=A,R.art=!0,R.frames=l?.frames??1,R.portrait=void 0}),c&&this.walkers.push({mesh:x,shadow:m,tag:E,baseY:_,cur:{c:t,r:e},dayCell:{c:c.day[0],r:c.day[1]},nightCell:{c:c.night[0],r:c.night[1]},key:y,moving:!1,t0:0,from:{c:t,r:e},to:{c:t,r:e},fromX:w,fromZ:M,toX:w,toZ:M,waitUntil:0,inside:!1,doorDir:void 0,trans:null})}makeNameTag(t){const i='bold 40px "Cinzel", "MedievalSharp", system-ui, serif',r=document.createElement("canvas").getContext("2d");r.font=i;const o=Math.ceil(r.measureText(t).width)+36,l=58,c=document.createElement("canvas");c.width=o,c.height=l;const h=c.getContext("2d"),d=l/2;h.beginPath(),h.moveTo(d,0),h.arcTo(o,0,o,l,d),h.arcTo(o,l,0,l,d),h.arcTo(0,l,0,0,d),h.arcTo(0,0,o,0,d),h.closePath(),h.fillStyle="rgba(16,12,8,0.74)",h.fill(),h.lineWidth=3,h.strokeStyle="rgba(201,162,39,0.7)",h.stroke(),h.font=i,h.textAlign="center",h.textBaseline="middle",h.lineWidth=5,h.strokeStyle="rgba(0,0,0,0.85)",h.strokeText(t,o/2,l/2+1),h.fillStyle="#f0dca2",h.fillText(t,o/2,l/2+1);const u=new Mn(c);u.colorSpace=Ie,u.magFilter=Ze,u.minFilter=yn,u.generateMipmaps=!0;const f=new Yo(new $r({map:u,transparent:!0,depthWrite:!1})),g=.4;return f.scale.set(g*(o/l),g,1),f}shadowTex(){if(!this._shadowTex){const e=document.createElement("canvas");e.width=64,e.height=64;const n=e.getContext("2d"),i=n.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);i.addColorStop(0,"rgba(0,0,0,0.6)"),i.addColorStop(.6,"rgba(0,0,0,0.32)"),i.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=i,n.fillRect(0,0,64,64);const r=new Mn(e);r.colorSpace=Ie,this._shadowTex=r}return this._shadowTex}loadArt(t,e){const n=this.artCache.get(t);if(n){e(n);return}new wd().load(t,i=>{i.colorSpace=Ie,i.magFilter=Ze,i.minFilter=yn,i.generateMipmaps=!0,i.anisotropy=8,i.wrapS=wn,i.wrapT=wn,this.artCache.set(t,i),e(i)},void 0,()=>{})}buildNPCs(){const t=(performance.now()/Lr+Pr)%1;this.npcNight=this.daylight(t)<.3;for(const e of Bb){const n=Hb[e.id],i=n?n.url:zb[e.id],[r,a]=this.npcNight?e.night:[e.c,e.r];this.addNPC(r,a,e.seed,e.name,e.lines,i,e.scale??1,n?{frames:n.frames,fps:n.fps}:void 0,{day:[e.c,e.r],night:e.night})}}makePortrait(t,e=1){const n=t;if(!n)return null;const i=Math.floor((n.naturalWidth||n.width||0)/e),r=n.naturalHeight||n.height||0;if(!i||!r)return null;const a=132,o=document.createElement("canvas");o.width=a,o.height=a;const l=o.getContext("2d");if(!l)return null;l.imageSmoothingQuality="high";let c=i*.5-r*.09,h=r*.05,d=r*.18;try{const u=document.createElement("canvas");u.width=i,u.height=r;const f=u.getContext("2d");if(f){f.drawImage(t,0,0);const g=f.getImageData(0,0,i,r).data,_=40,m=M=>{let x=0,E=0,y=-1;for(let R=0;R<=i;R++)if(R<i&&g[(M*i+R)*4+3]>_)y<0&&(y=R);else if(y>=0){const v=R-y;v>x&&(x=v,E=y),y=-1}return{w:x,cx:E+x/2}};let p=-1,w=-1;for(let M=0;M<r&&p<0;M++)for(let x=0;x<i;x++)if(g[(M*i+x)*4+3]>_){p=M;break}for(let M=r-1;M>=0&&w<0;M--)for(let x=0;x<i;x++)if(g[(M*i+x)*4+3]>_){w=M;break}if(p>=0&&w>p){const M=w-p+1;let x=p;for(let A=p;A<p+M*.3;A++)if(m(A).w>i*.06){x=A;break}let E=0,y=i/2;const R=Math.round(M*.14);for(let A=x;A<x+R;A++){const v=m(A);v.w>E&&(E=v.w,y=v.cx)}d=Math.max(M*.13,Math.min(E*1.55,M*.3,r*.55)),c=y-d/2,h=x-d*.12}}}catch{}c=Math.max(0,Math.min(c,i-d)),h=Math.max(0,Math.min(h,r-d)),d=Math.min(d,i,r);try{return l.drawImage(t,c,h,d,d,0,0,a,a),o.toDataURL("image/png")}catch{return null}}portraitFor(t){const e=this.npcMap.get(t);if(!e)return null;if(e.portrait!==void 0)return e.portrait;const n=e.tex.image;if(!n)return null;const i=this.makePortrait(n,e.frames??1);return i&&(e.portrait=i),i}addForestLights(){const t=new ys(10134706,.72),e=new Ms(10464188,4214830,.85),n=new ta(14673644,.5);n.position.set(-8,16,5),this.world.add(t),this.world.add(e),this.world.add(n),this.registerDayLight(t,3557482,.44),this.registerDayLight(e,2899038,.5),this.registerDayLight(n,6714797,.14)}buildForest(){const t=Yr,e=Vs,n=ra("s"),i=(E,y,R=0)=>{const A=Math.sin(E*41.3+y*17.7+R*7.13)*4213.1;return A-Math.floor(A)},r=new ct({map:kr(61)});r.map.repeat.set(t+10,e+10);const a=new K(new Bt((t+10)*P,(e+10)*P),r);a.rotation.x=-Math.PI/2,a.position.set((t/2-.5)*P,0,(e/2-.5)*P),this.world.add(a);const o=new ct({map:ua(63)}),l=new Bt(P,P);for(let E=0;E<e;E++)for(let y=0;y<t;y++){const R=bi(y,E);if(R==="path"||R==="gate"||R==="spawn"||R==="sign"){const A=new K(l,o);A.rotation.x=-Math.PI/2,A.rotation.z=Math.floor(i(y,E,9)*4)*Math.PI/2,A.position.set(y*P,.02,E*P),this.world.add(A)}}const c=Ah.length>0,h=(c?Ah:[65,66,67,71,79]).map((E,y)=>{const R=new ct({map:bh(65+y*6),transparent:!0,alphaTest:.4,side:Kt});return c&&this.loadArt(E,A=>{R.map=A,R.needsUpdate=!0}),R}),d=db.map((E,y)=>{const R=new ct({map:bh(83+y*4),transparent:!0,alphaTest:.4,side:Kt});return this.loadArt(E,A=>{R.map=A,R.needsUpdate=!0}),R}),u=[67,73].map(E=>new ct({map:bv(E),transparent:!0,alphaTest:.4,side:Kt})),f=[75,77].map(E=>new ct({map:vv(E),transparent:!0,alphaTest:.35,side:Kt})),g=new ct({map:da(41)}),_=new ct({map:Mh(69),transparent:!0,alphaTest:.4,side:Kt}),m=new ct({map:Xe(5)}),p=new ct({map:Xe(7)}),w=(E,y,R,A,v,b=!1)=>{const C=new Bt(R,A),U=b?-1:1,I=new K(C,v);I.position.set(E,A/2,y),I.scale.x=U;const V=new K(C,v);V.position.set(E,A/2,y),V.rotation.y=Math.PI/2,V.scale.x=U,this.world.add(I),this.world.add(V)},M=c?ub:.44,x=(E,y,R,A,v)=>{const C=d.length>0&&i(A,v,17)<.12?d:h,U=C[Math.floor(i(A,v,4)*C.length)%C.length];w(E,y,R*M,R,U,i(A,v,16)>.5)};for(let E=0;E<e;E++)for(let y=0;y<t;y++){const R=bi(y,E),A=y*P,v=E*P;if(R==="tree"||R==="edge"){const b=R==="edge",C=(b?8:5.4)+i(y,E,1)*2.2,U=(i(y,E,2)-.5)*P*.45,I=(i(y,E,3)-.5)*P*.45;x(A+U,v+I,C,y,E),i(y,E,12)>.5&&w(A+U,v+I,2,1.1,f[Math.floor(i(y,E,13)*f.length)%f.length]),b&&this.blocked.add(`${y},${E}`)}else if(R==="bush"){const b=2.4+i(y,E,5)*.8,C=1.4+i(y,E,6)*.5,U=u[Math.floor(i(y,E,7)*u.length)%u.length];w(A,v,b,C,U),this.blocked.add(`${y},${E}`)}else if(R==="rock"){const b=1.1+i(y,E,8)*.8,C=new K(new Dl(b),g);C.position.set(A,b*.55,v),C.rotation.set(i(y,E,9)*3,i(y,E,10)*3,.2),C.scale.y=.7,this.world.add(C),this.blocked.add(`${y},${E}`)}else if(R==="foliage"){const b=1.8+i(y,E,5)*.8,C=.9+i(y,E,6)*.5;w(A+(i(y,E,2)-.5)*P*.4,v+(i(y,E,3)-.5)*P*.4,b,C,f[Math.floor(i(y,E,7)*f.length)%f.length])}else if(R==="skull")w(A,v,2,1.4,_);else if(R==="sign"){const C=y===n.col&&E===n.row?[0,1]:this.forestSignFacing(y,E);this.buildForestSign(A,v,m,C),this.blocked.add(`${y},${E}`)}if(R==="grass"&&i(y,E,14)>.9){const b=new K(new be(.28,.32,2.4,8),p);b.rotation.set(0,i(y,E,15)*Math.PI,Math.PI/2),b.position.set(A,.28,v),this.world.add(b)}}if(Fr.length>0){const E=this.makeClusterMats(),y=(v,b,C,U)=>{const I=15+i(U,0,2)*3,V=E[Math.floor(i(U,0,4)*E.length)%E.length],$=I*V.aspect,X=new K(new Bt($,I),V.mat);X.position.set(v,I/2-1,b),X.rotation.y=C,i(U,0,5)>.5&&(X.scale.x=-1),this.world.add(X)},R=15*1.85*.72;let A=0;for(let v=-P;v<=(t+1)*P;v+=R)y(v,-1.5*P,0,A++);for(let v=-P;v<=e*P;v+=R)y(-1.5*P,v,Math.PI/2,A++),y((t+.5)*P,v,-Math.PI/2,A++)}else{for(let E=-2;E<t+2;E+=2)x(E*P+1,-2*P,10+i(E,-3,1)*3,E,-3);for(let E=-1;E<e-2;E+=2)x(-2*P,E*P,9+i(-3,E,1)*3,-3,E),x((t+1)*P,E*P,9+i(t+2,E,1)*3,t+2,E)}this.buildForestBackdrop(),this.buildForestVillageBackdrop()}buildForestVillageBackdrop(){const t=ra("V"),e=t.col*P,n=t.row*P,i=n+9*P,r=.6,a=new ct({map:kr(61)});a.map.repeat.set(20,16);const o=new K(new Bt(22*P,16*P),a);o.rotation.x=-Math.PI/2,o.position.set(e,-.02,n+6*P),this.world.add(o);const l=new ct({map:ua(63)}),c=new Bt(P,P);for(let E=n+1*P;E<i-2*P;E+=P){const y=new K(c,l);y.rotation.x=-Math.PI/2,y.rotation.z=Math.round((E-n)/P)%2*(Math.PI/2),y.position.set(e,.02,E),this.world.add(y)}if(Fr.length>0){const E=this.makeClusterMats(),y=13,R=(A,v,b,C)=>{const U=E[C%E.length],I=new K(new Bt(y*U.aspect,y),U.mat);I.position.set(A,y/2-1,v),I.rotation.y=Math.PI,b&&(I.scale.x=-1),this.world.add(I)};R(e-13,i+2*P,!1,0),R(e+13,i+2*P,!0,1),R(e-20,i-1*P,!1,1),R(e+20,i-1*P,!0,0)}const h=new He,d=new ct({map:Xe(3)}),u=new ct({map:As(3),side:Kt}),f=new ct({map:Xe(5)}),g=new ct({map:da(41)}),_=new ct({map:ii(31)}),m=new ct({map:_h(7)}),p=new ct({color:2102288});m.map.repeat.set(6,5);const w=new K(new Bt(24,18),m);w.rotation.x=-Math.PI/2,w.position.set(0,.06,2),h.add(w);const M=new K(new Me(34,9,7),g);M.position.set(-2,3.5,13),h.add(M);for(const[E,y,R,A]of[[-4,0,11,13],[1,-.5,10,15],[5.5,.5,9,11],[-9,.8,8,10]]){const v=new K(new Hn(R,A,7),g);v.position.set(E*1.5,A/2+1.5,13+y),v.rotation.y=E,h.add(v)}const x=(E,y,R,A,v)=>{const b=new K(new Me(R,A,R),d);b.position.set(E,A/2,y),h.add(b);const C=new K(new Hn(R*.82,A*.6,4),u);C.position.set(E,A+A*.28,y),C.rotation.y=Math.PI/4,h.add(C);const U=E+v[0]*(R/2+.03),I=y+v[1]*(R/2+.03),V=Math.atan2(v[0],v[1]),$=new K(new Bt(R*.26,A*.5),p);$.position.set(U,A*.25,I),$.rotation.y=V,h.add($);for(const X of[-1,1]){const rt=new K(new Bt(R*.16,A*.2),p);rt.position.set(U+X*v[1]*R*.26,A*.62,I-X*v[0]*R*.26),rt.rotation.y=V,h.add(rt)}};{for(const[C,U,I]of[[-6,3,3.2],[-2,3.2,3.4],[2,3,3.1],[6,3.2,3.3]])x(C,7,U,I,[0,-1]);for(const C of[2.5,5])x(-8,C,3,3.1,[1,0]);for(const C of[2.5,5])x(8,C,3,3.1,[-1,0]);const E=new He,y=new K(new be(.85,.95,1,16),_);y.position.y=.5,E.add(y);for(const C of[-.75,.75]){const U=new K(new Me(.14,1.9,.14),f);U.position.set(C,1.45,0),E.add(U)}const R=new K(new Hn(1.25,.7,4),u);R.position.y=2.5,R.rotation.y=Math.PI/4,E.add(R),E.position.set(0,0,2.5),h.add(E);const A=new He,v=new Me(.36,3.4,.36);for(const C of[-1.6,1.6]){const U=new K(v,f);U.position.set(C,1.7,0),A.add(U)}const b=new K(new Me(3.9,.36,.4),f);b.position.set(0,3.35,0),A.add(b),A.position.set(0,0,-3.5),h.add(A)}h.scale.setScalar(r),h.position.set(e,0,i),this.world.add(h)}forestSignFacing(t,e){const n=[[0,1],[1,0],[0,-1],[-1,0]];let i=[0,1];for(const[r,a]of n){if(bi(t+r,e+a)==="path")return[r,a];sa(t+r,e+a)&&(i=[r,a])}return i}buildForestSign(t,e,n,i){const r=new He,a=new Me(.16,2.3,.16);for(const c of[-.62,.62]){const h=new K(a,n);h.position.set(c,1.15,0),r.add(h)}const o=new K(new Me(1.75,.66,.09),n);o.position.set(0,1.78,.02),r.add(o);const l=new K(new Me(1.85,.76,.06),new ct({color:2759696}));l.position.set(0,1.78,-.01),r.add(l),r.position.set(t,0,e),r.rotation.y=Math.atan2(i[0],i[1]),this.world.add(r)}buildForestBackdrop(){const t=new De({color:7305349}),e=new De({color:12108495}),n=(Yr/2-.5)*P,i=-7*P;[-2.4,-1.2,-.1,1,2.2].forEach((a,o)=>{const l=30+o*37%13,c=17+o*53%8,h=n+a*24,d=i-o*31%8,u=new K(new Hn(c,l,5),t);u.position.set(h,l/2-3,d),u.rotation.y=o,this.world.add(u);const f=new K(new Hn(c*.4,l*.32,5),e);f.position.set(h,l-l*.18-3,d),f.rotation.y=o,this.world.add(f)})}canWalk(t,e){return(this.location==="village"?ia(t,e):this.location==="forest"?sa(t,e):this.location==="dungeon"?oh(t,e):this.location==="showcase"?fh(t,e):ga(t,e))&&!this.blocked.has(`${t},${e}`)}floorYAt(t,e){return this.location==="showcase"?oa:0}applyShowcasePose(){const t=Es(this.showIdx);this.camera.position.set(t.x,t.y+Rr,t.z),this.camera.rotation.y=t.yaw}stationStep(t,e){const n=Es(this.showIdx),i=Es(t);this.showIdx=t;const r=e>0?i.yaw:i.yaw+Math.PI;let a=this.camera.rotation.y,o=r;for(;o-a>Math.PI;)o-=Math.PI*2;for(;o-a<-Math.PI;)o+=Math.PI*2;this.anim={kind:"move",t0:performance.now(),fromX:n.x,fromZ:n.z,toX:i.x,toZ:i.z,fromY:n.y,toY:i.y,fromYaw:a,toYaw:o},this.pushMinimap()}showcaseStationMove(t){t==="forward"?this.showIdx<Zi?this.stationStep(this.showIdx+1,1):this.enterTerraceFromStairs():t==="back"&&(this.showIdx>0?this.stationStep(this.showIdx-1,-1):this.exitShowcase())}enterTerraceFromStairs(){const t=Es(Zi);this.showIdx=-1,this.col=Dr.c,this.row=Dr.r,this.facing=3;let e=this.camera.rotation.y,n=dh;for(;n-e>Math.PI;)n-=Math.PI*2;for(;n-e<-Math.PI;)n+=Math.PI*2;this.anim={kind:"move",t0:performance.now(),fromX:t.x,fromZ:t.z,toX:Dr.c*P,toZ:Dr.r*P,fromY:t.y,toY:oa,fromYaw:e,toYaw:n},this.pushMinimap()}enterStairsFromTerrace(){const t=Es(Zi);this.showIdx=Zi;let e=this.camera.rotation.y,n=dh+Math.PI;for(;n-e>Math.PI;)n-=Math.PI*2;for(;n-e<-Math.PI;)n+=Math.PI*2;this.anim={kind:"move",t0:performance.now(),fromX:this.col*P,fromZ:this.row*P,toX:t.x,toZ:t.z,fromY:oa,toY:t.y,fromYaw:e,toYaw:n},this.pushMinimap()}exitShowcase(){const t=this.returnTo;this.enterLocation("village",t.col,t.row,t.facing)}buildMiniGrid(){let t,e,n;this.location==="village"?(t=pn,e=nn,n=ia):this.location==="forest"?(t=Yr,e=Vs,n=sa):this.location==="dungeon"?(t=eo,e=Ws,n=oh):this.location==="showcase"?(t=6,e=10,n=fh):(t=pl,e=ro,n=ga);const i=new Uint8Array(t*e);for(let r=0;r<e;r++)for(let a=0;a<t;a++)i[r*t+a]=n(a,r)?1:0;this.miniGrid={cols:t,rows:e,cells:i}}pushMinimap(){this.miniGrid||this.buildMiniGrid();const t=this.miniGrid,[e,n]=Cn[this.facing];this.ui.updateMinimap({cols:t.cols,rows:t.rows,cells:t.cells,col:this.col,row:this.row,dc:e,dr:n})}doInteract(){const t=this.facingTarget();if(t){if(t.kind==="enter"){this.returnTo={col:this.col,row:this.row,facing:(this.facing+2)%4};const e=Nr("P");this.enterLocation(t.estab,e.col,e.row,0)}else if(t.kind==="enterhome"){this.returnTo={col:this.col,row:this.row,facing:(this.facing+2)%4};const e=Nr("P");this.enterLocation(t.id,e.col,e.row,0)}else if(t.kind==="exit"){const{col:e,row:n,facing:i}=this.returnTo;this.enterLocation("village",e,n,i)}else if(t.kind==="talk"){const e=Ih(t.lines),n=this.portraitFor(t.key);this.dialogue={name:t.name,lines:e,idx:0,portrait:n},this.ui.showDialogue(t.name,e[0],n)}else if(t.kind==="dungeon"){this.returnTo={col:this.col,row:this.row,facing:(this.facing+2)%4};const e=ah("S");this.enterLocation("dungeon",e.col,e.row,0)}else if(t.kind==="gate")this.openGate(t.key);else if(t.kind==="toforest"){this.returnTo={col:this.col,row:this.row,facing:(this.facing+2)%4};const e=ra("P");this.enterLocation("forest",e.col,e.row,0)}else if(t.kind==="tovillage"){const e=rh();this.enterLocation("village",e.col,e.row-1,0)}else if(t.kind==="sign"){const e=Ih(t.lines);this.dialogue={name:"Placa",lines:e,idx:0,portrait:null},this.ui.showDialogue("Placa",e[0],null)}}}openGate(t){const e=this.gates.get(t);e&&(this.gateAnims.push({pivotL:e.pivotL,pivotR:e.pivotR,t0:this.now,dur:620,to:1.05}),this.gates.delete(t),this.blocked.delete(t))}advanceDialogue(){this.dialogue&&(this.dialogue.idx++,this.dialogue.idx>=this.dialogue.lines.length?(this.dialogue=null,this.ui.hideDialogue()):this.ui.showDialogue(this.dialogue.name,this.dialogue.lines[this.dialogue.idx],this.dialogue.portrait??null))}box(t,e,n,i,r,a,o){const l=new K(new Me(i,r,a),o);return l.position.set(t,e,n),this.world.add(l),l}buildRoomShell(t=9,e=2,n=4864038){const r=new ct({map:Xe(t)}),a=new ct({map:Xe(e),side:Kt}),o=new ct({color:n,side:Kt}),l=new ct({map:pv(11),side:Kt}),c=new Bt(P,P);for(let f=0;f<ro;f++)for(let g=0;g<pl;g++){if(!ga(g,f))continue;const _=new K(c,r);_.rotation.x=-Math.PI/2,_.position.set(g*P,0,f*P),this.world.add(_);const m=new K(c,o);m.rotation.x=Math.PI/2,m.position.set(g*P,3,f*P),this.world.add(m);for(const[p,w]of Cn)jr(g+p,f+w)==="#"&&this.addWall(g*P,f*P,p,w,0,3,a)}const h=Nr("X"),d=new K(new Bt(nh,Cr),l);d.position.set(h.col*P,Cr/2,h.row*P+P/2-.06),d.rotation.y=Math.PI,this.world.add(d);const u=new K(new Bt(1.7,.6),new ct({map:ha("SAÍDA"),transparent:!0,side:Kt}));u.position.set(h.col*P,Cr+.5,h.row*P+P/2-.08),u.rotation.y=Math.PI,this.world.add(u)}buildHome(t){this.buildRoomShell(9,6,3943450);const n=new ct({map:Xe(5)}),i=new ct({map:Xe(7)}),r=new ct({map:ii(31)}),a=new ct({color:7161136}),o=new ct({color:13350025});this.wallCell(1,3,[-1,0],(g,_)=>{this.box(g,1.2,_,.5,2.4,2,r),this.box(g+.42,.55,_,.34,.7,1.1,new De({color:16742942})),this.glowLight(g+1.4,1,_,16747054,4.2,10)});const l=3*P,c=3*P;this.blocked.add("3,3"),this.box(l,.95,c,1.7,.12,1.1,n);for(const[g,_]of[[-.7,0],[.7,0],[0,-.5],[0,.5]])this.box(l+g*.9,.42,c+_,.16,.84,.16,i);this.box(l,.45,c-.95,1.4,.12,.4,i),this.box(l,.45,c+.95,1.4,.12,.4,i),this.box(l-.4,1.06,c,.22,.1,.22,o);const h=new K(new be(.16,.13,.22,12),i);h.position.set(l+.35,1.11,c),this.world.add(h);const d=xa[t].residents.length>=2?[[5,2],[5,4]]:[[5,3]];for(const[g,_]of d)this.wallCell(g,_,[1,0],(m,p)=>{this.box(m,.35,p,.9,.5,1.9,i),this.box(m,.66,p,.86,.16,1.8,o),this.box(m,.78,p-.7,.7,.18,.4,a)});this.wallCell(2,1,[0,-1],(g,_)=>{this.box(g,1.7,_,1.6,.1,.4,n);for(let m=-1;m<=1;m++){const p=new K(new be(.12,.1,.28,10),m===0?i:o);p.position.set(g+m*.45,1.9,_),this.world.add(p)}});const u=new K(new Bt(2.2,1.6),new ct({color:8010538}));u.rotation.x=-Math.PI/2,u.position.set(3*P,.02,3*P+.2),this.world.add(u);const f=new bn(16769192,5.5,30,2);f.position.set(3*P,3-.4,3*P),this.world.add(f);for(const g of xa[t].residents)this.addNPC(g.col,g.row,g.seed,g.name,g.lines,g.art,g.scale??1)}buildInterior(t){const n=new ct({map:Xe(5)});this.buildRoomShell(9,2,4864038);const i=Nr("N"),r=i.col*P,a=i.row*P+P/2+.2;this.box(r,.55,a,P*2.4,1.1,.7,n),this.box(r,1.12,a,P*2.4+.2,.14,.95,n);const o=ma[t];this.addNPC(i.col,i.row,o.seed,o.npc,o.lines,fb[t]);const l=new bn(16766106,4.5,15,2);l.position.set(r,2.5,i.row*P+1.6),this.world.add(l);const c=new bn(16769192,8,34,2);c.position.set(3*P,3-.3,3*P),this.world.add(c),this.box(3*P,3-.25,3*P,.4,.3,.4,new De({color:16758874})),t==="tavern"?this.propsTavern():t==="store"?this.propsStore():t==="smith"?this.propsSmith():this.propsAlchemist()}glowLight(t,e,n,i,r,a){const o=new bn(i,r,a,2);o.position.set(t,e,n),this.world.add(o),this.flames.push({light:o,base:r})}wallCell(t,e,n,i){const r=t*P+n[0]*(P/2-.75),a=e*P+n[1]*(P/2-.75);i(r,a),this.blocked.add(`${t},${e}`)}propsTavern(){const t=new ct({map:Xe(5)}),e=new ct({map:ii(31)}),n=new ct({map:ca(17)}),i=new ct({color:13279818});this.wallCell(1,3,[-1,0],(r,a)=>{this.box(r,1.1,a,.5,2.2,2.2,e),this.box(r+.4,.6,a,.35,.8,1.2,new De({color:16742942})),this.glowLight(r+1.3,1,a,16747054,5,11)}),this.wallCell(1,2,[-1,0],(r,a)=>{const o=new K(new be(.5,.44,1.3,14),n);o.position.set(r,.65,a),this.world.add(o)});for(const r of[2,4])this.wallCell(5,r,[1,0],(a,o)=>{this.box(a,.9,o,.2,1,.2,t);const l=new K(new be(.8,.8,.15,16),t);l.position.set(a,1.45,o),this.world.add(l);const c=new K(new be(.14,.12,.28,10),i);c.position.set(a,1.66,o),this.world.add(c)})}propsStore(){const t=new ct({map:Xe(3)}),e=[9058874,3824266,5208634,11569712,8010362];let n=0;const i=(r,a,o)=>{this.box(r,1.05,a,.5,2.1,2.4,t);for(const l of[.7,1.4])for(const c of[-.7,.7]){const h=new ct({color:e[n++%e.length]});this.box(r-o*.35,l,a+c,.4,.5,.5,h)}};for(const r of[2,3,4])this.wallCell(1,r,[-1,0],(a,o)=>i(a,o,-1));for(const r of[2,3,4])this.wallCell(5,r,[1,0],(a,o)=>i(a,o,1))}propsSmith(){const t=new ct({color:4869716}),e=new ct({map:ii(31)}),n=new ct({map:Xe(5)}),i=new ct({map:ca(17)});this.wallCell(1,3,[-1,0],(r,a)=>{this.box(r,1,a,.6,2,2.2,e),this.box(r+.45,1,a,.35,.5,1.2,new De({color:16738834})),this.glowLight(r+1.3,1.1,a,16742942,5.5,11)}),this.wallCell(1,4,[-1,0],(r,a)=>{this.box(r,.45,a,.6,.9,.6,n),this.box(r,1.05,a,.5,.35,1,t)}),this.wallCell(1,2,[-1,0],(r,a)=>{const o=new K(new be(.5,.44,1.2,14),i);o.position.set(r,.6,a),this.world.add(o)});for(const r of[2,3,4])this.wallCell(5,r,[1,0],(a,o)=>{this.box(a,1,o,.25,2,1.4,n);for(const l of[-.4,.4]){const c=new K(new Me(.08,1.5,.22),t);c.position.set(a-.2,1.4,o+l),this.world.add(c)}})}propsAlchemist(){const t=new ct({map:Xe(3)}),e=new ct({color:3817028}),n=[4239472,5267648,12599408,12623920,9453760];let i=0;const r=(a,o,l)=>{this.box(a,1.05,o,.5,2.1,2.4,t);for(const c of[.7,1.35,2])for(const h of[-.7,0,.7]){const d=new ct({color:n[i++%n.length]}),u=new K(new be(.11,.13,.36,8),d);u.position.set(a-l*.32,c,o+h),this.world.add(u)}};for(const a of[2,3])this.wallCell(1,a,[-1,0],(o,l)=>r(o,l,-1));for(const a of[2,3])this.wallCell(5,a,[1,0],(o,l)=>r(o,l,1));this.wallCell(1,4,[-1,0],(a,o)=>{const l=new K(new be(.6,.48,.85,16),e);l.position.set(a,.5,o),this.world.add(l);const c=new K(new be(.53,.53,.1,16),new De({color:7077792}));c.position.set(a,.92,o),this.world.add(c),this.glowLight(a+.9,1.2,o,5308314,3.2,8)}),this.wallCell(5,4,[1,0],(a,o)=>{this.box(a,.8,o,.9,.15,1.6,t),this.box(a,.98,o+.3,.5,.16,.6,new ct({color:6961706}))})}buildRoofs(t){const e=(i,r)=>t[Math.floor(Math.abs(this.mHash(i,r,9))*997)%t.length],n=(i,r,a,o)=>{if(Ce(i,r)!=="building")return!1;const l=Ce(i+a,r+o);return l==="street"||l==="barrel"};for(const i of[1,-1])for(let r=0;r<pn;r++){let a=0;for(;a<nn;)if(n(r,a,i,0)){let o=a;for(;o+1<nn&&n(r,o+1,i,0);)o++;let l=na;for(let c=a;c<=o;c++)l=Math.min(l,this.depthInto(r,c,-i,0));this.addRoofRun(r,a,r,o,i,0,l,e(r,a)),a=o+1}else a++}for(const i of[1,-1])for(let r=0;r<nn;r++){let a=0;for(;a<pn;)if(n(a,r,0,i)){let o=a;for(;o+1<pn&&n(o+1,r,0,i);)o++;let l=na;for(let c=a;c<=o;c++)l=Math.min(l,this.depthInto(c,r,0,-i));this.addRoofRun(a,r,o,r,0,i,l,e(a,r)),a=o+1}else a++}}depthInto(t,e,n,i){let r=0;for(;r<na&&Ce(t+n*r,e+i*r)==="building";)r++;return Math.max(1,r)}addRoofRun(t,e,n,i,r,a,o,l){const c=ni-.15,h=ni+ea,d=new D,u=new D,f=new D,g=new D,_=new D,m=new D;let p,w,M;const x=o*P-P/2;if(r!==0){const A=t*P+r*(P/2)+r*th,v=t*P-r*x,b=(A+v)/2,C=e*P-P/2,U=i*P+P/2;d.set(A,c,C),u.set(A,c,U),f.set(b,h,C),g.set(b,h,U),_.set(v,c,C),m.set(v,c,U),p=i-e+1,w=Math.abs(A-b)/P+.5,M=Math.abs(b-v)/P+.5}else{const A=e*P+a*(P/2)+a*th,v=e*P-a*x,b=(A+v)/2,C=t*P-P/2,U=n*P+P/2;d.set(C,c,A),u.set(U,c,A),f.set(C,h,b),g.set(U,h,b),_.set(C,c,v),m.set(U,c,v),p=n-t+1,w=Math.abs(A-b)/P+.5,M=Math.abs(b-v)/P+.5}this.world.add(this.quad(d,u,g,f,l,p,w)),this.world.add(this.quad(f,g,m,_,l,p,M)),this.world.add(this.tri(d,f,_,l)),this.world.add(this.tri(u,m,g,l));const E=d.clone();E.y-=eh;const y=u.clone();y.y-=eh,this.world.add(this.quad(E,y,u,d,l,p,.3))}tri(t,e,n,i){const r=new Pe;return r.setAttribute("position",new je(new Float32Array([t.x,t.y,t.z,e.x,e.y,e.z,n.x,n.y,n.z]),3)),r.setAttribute("uv",new je(new Float32Array([0,0,1,0,.5,1]),2)),r.setIndex([0,1,2]),r.computeVertexNormals(),new K(r,i)}decalMat(t,e=.35){const n=new ct({transparent:!0,alphaTest:e,side:Kt});return n.colorWrite=!1,n.depthWrite=!1,this.loadArt(t,i=>{n.map=i,n.colorWrite=!0,n.depthWrite=!0,n.needsUpdate=!0}),n}addWallDecal(t,e,n,i,r,a,o,l){const c=new K(new Bt(a,o),r);return c.position.set(t*P+n*(P/2+.05),l,e*P+i*(P/2+.05)),c.rotation.y=n===1?Math.PI/2:n===-1?-Math.PI/2:i===1?0:Math.PI,c.renderOrder=4,this.world.add(c),c}addDecal(t,e,n,i,r,a){const o=a==="door"?nh:Gx,l=a==="door"?Cr:Vx,c=a==="door"?l/2+.02:Wx,h=new K(new Bt(o,l),r),d=t*P+n*(P/2+.04),u=e*P+i*(P/2+.04);h.position.set(d,c,u),n===1?h.rotation.y=Math.PI/2:n===-1?h.rotation.y=-Math.PI/2:i===1?h.rotation.y=0:h.rotation.y=Math.PI,this.world.add(h)}quad(t,e,n,i,r,a=1,o=1){const l=new Pe,c=new Float32Array([t.x,t.y,t.z,e.x,e.y,e.z,n.x,n.y,n.z,i.x,i.y,i.z]);return l.setAttribute("position",new je(c,3)),l.setAttribute("uv",new je(new Float32Array([0,0,a,0,a,o,0,o]),2)),l.setIndex([0,1,2,0,2,3]),l.computeVertexNormals(),new K(l,r)}onAction(t){if(this.dialogue){t==="interact"&&this.advanceDialogue();return}if(t==="interact"){this.doInteract();return}if(t==="attack"){const o=this.ui.swingWeapon();o>=0&&window.setTimeout(()=>this.tryHitEnemy(),o);return}if(this.anim)return;if(this.location==="showcase"&&this.showIdx>=0){this.showcaseStationMove(t);return}if(t==="turnLeft"||t==="turnRight"){const o=t==="turnLeft"?1:-1;this.facing=(this.facing+(o===1?3:1))%4,this.pushMinimap(),this.anim={kind:"turn",t0:performance.now(),fromY:this.camera.rotation.y,toY:this.camera.rotation.y+Math.PI/2*o};return}let e=this.facing;t==="back"?e=(e+2)%4:t==="strafeLeft"?e=(e+3)%4:t==="strafeRight"&&(e=(e+1)%4);const[n,i]=Cn[e],r=this.col+n,a=this.row+i;if(this.location==="showcase"&&tv(r,a)){this.enterStairsFromTerrace();return}this.canWalk(r,a)&&(this.anim={kind:"move",t0:performance.now(),fromX:this.col*P,fromZ:this.row*P,toX:r*P,toZ:a*P,fromY:this.floorYAt(this.col,this.row),toY:this.floorYAt(r,a)},this.col=r,this.row=a,this.pushMinimap(),this.location==="forest"&&bi(r,a)==="tree"&&this.brushFoliage())}brushFoliage(){const t=this.foliageFx;t&&(t.style.transition="none",t.style.opacity="0.55",t.offsetWidth,t.style.transition="opacity 620ms ease-out",t.style.opacity="0")}updateNpcPhase(t){const e=(t/Lr+Pr)%1,n=this.daylight(e);return!this.npcNight&&n<.26?(this.npcNight=!0,this.staggerDepart(t)):this.npcNight&&n>.44&&(this.npcNight=!1,this.staggerDepart(t)),this.npcNight}staggerDepart(t){this.walkers.forEach((e,n)=>{e.waitUntil=Math.max(e.waitUntil,t+n*650)})}wallLean(t,e){const i=[[-1,0],[1,0],[0,-1],[0,1]];for(const[r,a]of i){const o=Ce(t+r,e+a);if(o==="building"||o==="mountain")return{x:r*1.3,z:a*1.3}}return{x:0,z:0}}nightDoorDir(t){const e=[[-1,0],[1,0],[0,-1],[0,1]];for(const[n,i]of e){const r=t.c+n,a=t.r+i;if(Ce(r,a)!=="building")continue;const o=`${r},${a},${-n},${-i}`;if(this.doorMap.has(o)||this.homeDoorMap.has(o))return{dc:n,dr:i}}return null}setWalkerOpacity(t,e){const n=t.mesh.material,i=e>=.99?.5:.02;n.alphaTest!==i&&(n.alphaTest=i,n.needsUpdate=!0),n.opacity=e,t.shadow.material.opacity=.55*e,t.tag.material.opacity=e}setWalkerVisible(t,e){t.mesh.visible=e,t.shadow.visible=e,t.tag.visible=e}plazaWalkable(t,e){if(t===$i.c&&e===$i.r)return!1;const n=e>=6&&e<=12&&t>=2&&t<=12,i=e>=13&&e<=14&&t>=6&&t<=8;return!n&&!i?!1:ia(t,e)}cellFreeForWalker(t,e,n){if(!this.plazaWalkable(t,e)||t===this.col&&e===this.row)return!1;for(const i of this.walkers)if(i!==n&&!i.inside&&(i.cur.c===t&&i.cur.r===e||i.moving&&i.to.c===t&&i.to.r===e))return!1;return!0}bfsNextStep(t,e){const n=(h,d)=>h+","+d;if(t.c===e.c&&t.r===e.r)return null;const i=new Map;i.set(n(t.c,t.r),null);const r=[t];let a=0;const o=[[0,-1],[1,0],[0,1],[-1,0]];let l=!1;for(;a<r.length;){const h=r[a++];if(h.c===e.c&&h.r===e.r){l=!0;break}for(const[d,u]of o){const f=h.c+d,g=h.r+u,_=n(f,g);i.has(_)||!(f===e.c&&g===e.r)&&!this.plazaWalkable(f,g)||(i.set(_,h),r.push({c:f,r:g}))}}if(!l&&!i.has(n(e.c,e.r)))return null;let c=e;for(let h=0;h<400;h++){const d=i.get(n(c.c,c.r));if(!d)return null;if(d.c===t.c&&d.r===t.r)return c;c=d}return null}updateWalkers(t){if(this.walkers.length===0||this.dialogue)return;const e=900,n=640,i=this.updateNpcPhase(t);for(const r of this.walkers){if(r.trans){const a=Math.min(1,(t-r.trans.t0)/n),o=a*a*(3-2*a),l=r.trans.fromX+(r.trans.toX-r.trans.fromX)*o,c=r.trans.fromZ+(r.trans.toZ-r.trans.fromZ)*o;r.mesh.position.x=l,r.mesh.position.z=c,r.shadow.position.x=l,r.shadow.position.z=c,r.tag.position.x=l,r.tag.position.z=c,this.setWalkerOpacity(r,r.trans.kind==="enter"?1-o:o),a>=1&&(r.trans.kind==="enter"?(r.inside=!0,this.setWalkerVisible(r,!1)):(this.setWalkerOpacity(r,1),r.mesh.position.set(r.toX,r.baseY,r.toZ),r.shadow.position.set(r.toX,.03,r.toZ)),r.trans=null);continue}if(r.inside){if(!i){const a=r.doorDir??this.nightDoorDir(r.nightCell),o=this.wallLean(r.nightCell.c,r.nightCell.r),l=r.nightCell.c*P+o.x,c=r.nightCell.r*P+o.z,h=r.nightCell.c*P+(a?.dc??0)*(P/2+.2),d=r.nightCell.r*P+(a?.dr??0)*(P/2+.2);this.setWalkerVisible(r,!0),this.setWalkerOpacity(r,0),r.mesh.position.set(h,r.baseY,d),r.trans={kind:"exit",t0:t,fromX:h,fromZ:d,toX:l,toZ:c}}continue}if(r.moving){const a=Math.min(1,(t-r.t0)/e),o=a*a*(3-2*a),l=r.fromX+(r.toX-r.fromX)*o,c=r.fromZ+(r.toZ-r.fromZ)*o;r.mesh.position.x=l,r.mesh.position.z=c,r.mesh.position.y=r.baseY+Math.sin(a*Math.PI)*.05,r.shadow.position.x=l,r.shadow.position.z=c,r.tag.position.x=l,r.tag.position.z=c,a>=1&&(r.moving=!1,r.mesh.position.y=r.baseY,r.waitUntil=t+240+(r.cur.c*37+r.cur.r*17)%220)}else if(t>=r.waitUntil){const a=i?r.nightCell:r.dayCell;if(r.cur.c===a.c&&r.cur.r===a.r){if(i&&(r.doorDir===void 0&&(r.doorDir=this.nightDoorDir(r.nightCell)),r.doorDir)){const u=r.nightCell.c*P+r.doorDir.dc*(P/2+.2),f=r.nightCell.r*P+r.doorDir.dr*(P/2+.2);r.trans={kind:"enter",t0:t,fromX:r.mesh.position.x,fromZ:r.mesh.position.z,toX:u,toZ:f};continue}r.waitUntil=t+500;continue}const o=this.bfsNextStep(r.cur,a);if(!o){r.waitUntil=t+500;continue}if(!this.cellFreeForWalker(o.c,o.r,r)){r.waitUntil=t+300;continue}const l=`${o.c},${o.r}`,c=this.npcMap.get(r.key);c&&(this.npcMap.delete(r.key),this.npcMap.set(l,c));const d=o.c===a.c&&o.r===a.r?this.wallLean(o.c,o.r):{x:0,z:0};r.fromX=r.mesh.position.x,r.fromZ=r.mesh.position.z,r.toX=o.c*P+d.x,r.toZ=o.r*P+d.z,r.from={c:r.cur.c,r:r.cur.r},r.to=o,r.cur=o,r.key=l,r.moving=!0,r.t0=t}}}tick(t){this.now=t;const e=this.anim;if(e)if(e.kind==="move"){const c=Math.min(1,(t-e.t0)/Sd),h=c*c*(3-2*c);this.camera.position.x=e.fromX+(e.toX-e.fromX)*h,this.camera.position.z=e.fromZ+(e.toZ-e.fromZ)*h;const d=e.fromY+(e.toY-e.fromY)*h;this.camera.position.y=d+Rr+Math.sin(c*Math.PI)*.07,e.fromYaw!==void 0&&e.toYaw!==void 0&&(this.camera.rotation.y=e.fromYaw+(e.toYaw-e.fromYaw)*h),c>=1&&(this.camera.position.y=e.toY+Rr,e.toYaw!==void 0&&(this.camera.rotation.y=e.toYaw),this.anim=null)}else{const c=Math.min(1,(t-e.t0)/Xx),h=c*c*(3-2*c);this.camera.rotation.y=e.fromY+(e.toY-e.fromY)*h,c>=1&&(this.anim=null)}const n=this.camera.position.x,i=this.camera.position.z;for(const c of this.npcs){c.rotation.y=Math.atan2(n-c.position.x,i-c.position.z);const h=c.userData;if(h&&h.h){const d=1+Math.sin(t*.0016+h.ph)*.014;c.scale.y=d,c.position.y=h.baseY+(d-1)*h.h/2,c.rotation.z=Math.sin(t*.0011+h.ph*1.7)*.007}}for(const c of this.billboardProps)c.rotation.y=Math.atan2(n-c.position.x,i-c.position.z);if(this.reticle&&this.target&&!this.target.dyingAt){this.reticle.visible=!0;let c=n-this.target.bx,h=i-this.target.bz;const d=Math.hypot(c,h)||1;c/=d,h/=d,this.reticle.position.set(this.target.bx+c*.3,1.35,this.target.bz+h*.3)}else this.reticle&&(this.reticle.visible=!1);const r=this.lastTickMs?Math.min(.1,(t-this.lastTickMs)/1e3):0;this.lastTickMs=t,r>0&&this.playerMp<this.playerMaxMp&&(this.playerMp=Math.min(this.playerMaxMp,this.playerMp+this.playerMaxMp*.03*r+1.5*r),this.ui.setMana(this.playerMp/this.playerMaxMp));const a=!!this.buff&&t<this.buff.until;if(this.buffActive&&!a&&(this.buff=null,this.recomputeDerived()),this.buffActive=a,this.coolingSkills.size)for(const c of this.coolingSkills){const d=(this.cooldownUntil[c]??0)-t;if(d<=0)this.ui.setSkillCooldown(c,0,0),this.coolingSkills.delete(c);else{const u=fl(c).cd;this.ui.setSkillCooldown(c,d/u,Math.ceil(d/1e3))}}const o=this.enemy;if(o){const c=o.mesh.geometry.parameters.height;let h=n-o.bx,d=i-o.bz;const u=Math.hypot(h,d)||1;h/=u,d/=u;let f=0,g=1,_=0,m=0,p=0,w=0;const M=t-o.hitAt;if(o.dyingAt){const x=(t-o.dyingAt)/650;o.mat.opacity=Math.max(0,1-x*3),o.mesh.rotation.z=-x*1.6;const E=Math.max(.12,1-x*.55);if(o.mesh.scale.set(1+x*.35,E,1),o.mesh.position.y=c/2-x*.75,o.bar.visible=!1,x>=1){for(const y of[o.mesh,o.bar]){this.world.remove(y);const R=this.billboardProps.indexOf(y);R>=0&&this.billboardProps.splice(R,1)}o.mesh.geometry.dispose(),o.mat.dispose(),this.enemy=null,window.setTimeout(()=>{this.enemy||(this.location==="village"?this.buildDungeonEnemy():this.location==="dungeon"&&this.spawnDungeonEnemy())},5e3)}}else{const x=Math.abs(this.col-o.c)+Math.abs(this.row-o.r)===1;if(!o.atkAt&&x&&t>=o.nextAtk&&(o.atkAt=t),o.atkAt){const E=(t-o.atkAt)/700;if(E<.4){const y=E/.4;f=-.35*y,g=1-.05*y}else if(E<.6){const y=(E-.4)/.2;f=-.35+1.25*y,g=.95+.27*y}else{const y=(E-.6)/.4;f=.9*(1-y),g=1.22-.22*y}!o.hitApplied&&E>.52&&(o.hitApplied=!0,x&&this.damagePlayer(12)),E>=1&&(o.atkAt=0,o.hitApplied=!1,o.nextAtk=t+1100)}if(M<240){const E=M/240,y=Math.sin((1-E)*Math.PI);f-=y*.6;const R=1-E*.7;m=R,p=R*.2,w=R*.16,_=y*.14}o.mesh.position.set(o.bx+h*f,c/2,o.bz+d*f),o.mesh.scale.set(g,g,1),o.mesh.rotation.z=_}o.mat.emissive.setRGB(m,p,w)}this.updatePoofs(t),this.updateProjectiles(t),this.updateDayNight(t);const l=(t/Lr+Pr)%1;if(this.ui.setClock(l,this.daylight(l)),this.gateAnims.length){for(const c of this.gateAnims){const h=Math.min(1,(t-c.t0)/c.dur),d=h*h*(3-2*h);c.pivotL.rotation.y=c.to*d,c.pivotR.rotation.y=-c.to*d}this.gateAnims=this.gateAnims.filter(c=>t-c.t0<c.dur)}for(const c of this.motes){const h=c.pts.geometry.attributes.position,d=h.array;for(let u=0;u<c.sp.length;u++){let f=d[u*3+1]+c.sp[u]*.012;d[u*3]+=Math.sin(t*6e-4+u*1.7)*c.sway,f>c.y1&&(f=c.y0),d[u*3+1]=f}h.needsUpdate=!0}for(const c of this.fogPuffs){const h=t*9e-5;c.s.position.x=c.bx+Math.cos(h+c.ph)*c.rad,c.s.position.z=c.bz+Math.sin(h*.8+c.ph)*c.rad,c.s.position.y=c.by+Math.sin(h*1.1+c.ph)*c.rise;const d=c.s.material;d.rotation+=c.rotSp*.016,d.opacity=c.baseOp*(.6+.4*Math.sin(h*2+c.ph))}this.fogDome&&(this.fogDome.rotation.y=t*2e-5);for(const c of this.flames)c.light.intensity=c.base+Math.sin(t*.011+c.base)*.8+Math.sin(t*.027)*.5;for(const c of this.animTex)c.tex.offset.x=Math.floor(t/1e3*c.fps)%c.frames/c.frames;this.updateWalkers(t);for(const c of this.smoke){const h=c.userData,d=(t*28e-5+h.phase)%4/4,u=d*4.2;c.position.set(h.baseX+Math.sin(t*6e-4+h.phase)*.5,ni+ea+u,h.baseZ);const f=.6+d*1.6;c.scale.set(f,f,f),c.material.opacity=Math.sin(d*Math.PI)*.42,c.rotation.y=Math.atan2(n-c.position.x,i-c.position.z)}if(this.waterGlint){const c=this.waterGlint.material;c.opacity=.18+(Math.sin(t*.0016)+1)*.11;const h=1+Math.sin(t*.0013+1)*.08;this.waterGlint.scale.set(h,h,h)}this.anim||this.updatePrompt(),this.renderer.render(this.scene,this.camera)}updatePrompt(){const t=this.facingTarget();let e=" ";t&&(t.kind==="enter"?e=`Entrar — ${ma[t.estab].name}`:t.kind==="enterhome"?e="Entrar na casa":t.kind==="exit"?e="Sair":t.kind==="talk"?e=`Falar com ${t.name}`:t.kind==="dungeon"?e="Descer à masmorra":t.kind==="toforest"?e="Ir para a Floresta":t.kind==="tovillage"?e="Voltar ao Vilarejo":t.kind==="sign"&&(e="Ler a placa")),e!==this.lastPrompt&&(this.lastPrompt=e,this.ui.setPrompt(e===" "?null:e))}facingTarget(){const[t,e]=Cn[this.facing],n=this.col+t,i=this.row+e,r=this.npcMap.get(`${n},${i}`);if(r)return{kind:"talk",name:r.name,lines:r.lines,key:`${n},${i}`};if(this.location==="village"){const a=this.doorMap.get(`${n},${i},${-t},${-e}`);if(a)return{kind:"enter",estab:a};const o=this.homeDoorMap.get(`${n},${i},${-t},${-e}`);if(o)return{kind:"enterhome",id:o};if(Ce(n,i)==="stairs")return{kind:"dungeon"};if(Ce(n,i)==="forestgate"||Ce(this.col,this.row)==="forestgate")return{kind:"toforest"}}else if(this.location==="forest"){const a=bi(n,i);if(a==="gate"||bi(this.col,this.row)==="gate")return{kind:"tovillage"};if(a==="sign")return{kind:"sign",lines:qx(n,i)}}else if(this.location==="dungeon"){if(si(n,i)==="stairs"||si(this.col,this.row)==="stairs")return{kind:"exit"};const a=`${n},${i}`;if(this.gates.has(a))return{kind:"gate",key:a}}else if(this.location==="showcase"){if(this.showIdx===0)return{kind:"exit"}}else if(jr(n,i)==="X"||jr(this.col,this.row)==="X")return{kind:"exit"};return null}resize(){const t=this.container.clientWidth||window.innerWidth,e=this.container.clientHeight||window.innerHeight;this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix()}};ut(oo,"SKY_KEYS",[[0,1186355],[.2,1581630],[.25,3750234],[.29,13601368],[.37,9542054],[.5,8884384],[.66,9736345],[.72,13464642],[.78,4863560],[.85,2239564],[1,1186355]]);let Fs=oo;const Vb=""+new URL("cluster1-CDwqmovY.png",import.meta.url).href,Wb=""+new URL("cluster2-C0czRdHN.png",import.meta.url).href,Xb=""+new URL("death_poof-BE-q7e2_.png",import.meta.url).href,qb=""+new URL("dec_banner-UBOZSe9G.png",import.meta.url).href,$b=""+new URL("dec_cracks-DKSsqxx2.png",import.meta.url).href,Yb=""+new URL("dec_door-B5wowGxb.png",import.meta.url).href,jb=""+new URL("dec_gate-D08IdObB.png",import.meta.url).href,Zb=""+new URL("dec_gate_bars-B6YqUV4L.png",import.meta.url).href,Kb=""+new URL("dec_gate_frame-DQaCQl80.png",import.meta.url).href,Jb=""+new URL("dec_ivy-D9e2Lu2_.png",import.meta.url).href,Qb=""+new URL("dec_torch-CtkBMXz7.png",import.meta.url).href,tM=""+new URL("dec_window-DrwRbTKE.png",import.meta.url).href,eM=""+new URL("enemy_skeleton-BcZFeUKH.png",import.meta.url).href,nM=""+new URL("pine1-Cx-eXiFP.png",import.meta.url).href,iM=""+new URL("pine2-CUzpurmt.png",import.meta.url).href,sM=""+new URL("pine3-SLpwxU-f.png",import.meta.url).href,rM=""+new URL("pine4-D2rjz_P9.png",import.meta.url).href,oM=""+new URL("prop_lamp-D_-YfjKt.png",import.meta.url).href,aM=""+new URL("prop_notice-Bo5C5meg.png",import.meta.url).href,lM=""+new URL("sign_alch-CZuh7kJW.png",import.meta.url).href,cM=""+new URL("sign_smith-B08qmnbc.png",import.meta.url).href,hM=""+new URL("sign_store-C8OmR8-U.png",import.meta.url).href,dM=""+new URL("sign_tavern-DPGpN59J.png",import.meta.url).href,uM=""+new URL("sword-Cnq9dXJw.png",import.meta.url).href,fM=""+new URL("sword_atk-BUeBP5dr.png",import.meta.url).href,pM=""+new URL("tex_caveceil-Dh6eDyCo.jpg",import.meta.url).href,mM=""+new URL("tex_cavefloor-CIzR_jPs.jpg",import.meta.url).href,gM=""+new URL("tex_cavewall-DQwg9sDl.jpg",import.meta.url).href,_M=""+new URL("tex_cobble-DXMPAwZE.jpg",import.meta.url).href,xM=""+new URL("tex_dirt-BHcbB_Wz.jpg",import.meta.url).href,vM=""+new URL("tex_grass-C2Q1l28q.jpg",import.meta.url).href,bM=""+new URL("tex_mosswall-DpaqdZvP.jpg",import.meta.url).href,MM=""+new URL("tex_stonewall-BFmowWy6.jpg",import.meta.url).href,wM=""+new URL("tex_thatch-DdJMnyvF.jpg",import.meta.url).href,yM=""+new URL("tex_wood-B0jCHZZA.jpg",import.meta.url).href,SM=""+new URL("wpn_axe-CvCTYMUq.png",import.meta.url).href,TM=""+new URL("wpn_dagger-BBXQkEIm.png",import.meta.url).href,EM=""+new URL("wpn_greatsword-C2mQEgxH.png",import.meta.url).href,AM=""+new URL("wpn_mace-tTLR-MzC.png",import.meta.url).href,RM=""+new URL("wpn_maul-DbliXABw.png",import.meta.url).href,CM=""+new URL("wpn_orb-BsomjHDA.png",import.meta.url).href,LM=""+new URL("wpn_rapier-dNk4ndjW.png",import.meta.url).href,PM=""+new URL("wpn_shield-Bw_-3z5v.png",import.meta.url).href,UM=""+new URL("wpn_staff-DGpAnpDH.png",import.meta.url).href,DM=""+new URL("wpn_sword-CpsgndpE.png",import.meta.url).href,IM=""+new URL("alquimista-ssXsgGLn.png",import.meta.url).href,kM=""+new URL("anselmo-a5GEbqfY.png",import.meta.url).href,NM=""+new URL("camponesa-CrL0OA2Y.png",import.meta.url).href,FM=""+new URL("costureira-Br8zMBee.png",import.meta.url).href,OM=""+new URL("fazendeiro-CLjUAd1g.png",import.meta.url).href,BM=""+new URL("ferreiro-BdN9Klhc.png",import.meta.url).href,zM=""+new URL("gunther-D_2fJfLI.png",import.meta.url).href,HM=""+new URL("hedda-Buaz2cmx.png",import.meta.url).href,GM=""+new URL("lenhador-B54mx8Mi.png",import.meta.url).href,VM=""+new URL("lyle-gu11Pcfp.png",import.meta.url).href,WM=""+new URL("mercadora-B8RulStP.png",import.meta.url).href,XM=""+new URL("pip-rEDWa-7w.png",import.meta.url).href,qM=""+new URL("tam-BlgWIVim.png",import.meta.url).href,$M=""+new URL("taverneiro-Ba4UKFJq.png",import.meta.url).href,YM=""+new URL("wilma-DI_QNtI6.png",import.meta.url).href,jM=""+new URL("btn_base-wlebnyD3.png",import.meta.url).href,ZM=""+new URL("class_clerigo-Bv6kp9nE.png",import.meta.url).href,KM=""+new URL("class_guerreiro-DQxwW6XE.png",import.meta.url).href,JM=""+new URL("class_icon_clerigo-DoeXMn4k.png",import.meta.url).href,QM=""+new URL("class_icon_guerreiro-C0eBl5F1.png",import.meta.url).href,tw=""+new URL("class_icon_ladino-D8WBB-2i.png",import.meta.url).href,ew=""+new URL("class_icon_mago-CqEgdtDo.png",import.meta.url).href,nw=""+new URL("class_ladino-CBY8tWR5.png",import.meta.url).href,iw=""+new URL("class_mago-BCWgBU8E.png",import.meta.url).href,sw=""+new URL("clock_moon-D1xrN5yT.png",import.meta.url).href,rw=""+new URL("clock_sun-DO5hSXa1.png",import.meta.url).href,ow=""+new URL("coin-CsF22FSK.png",import.meta.url).href,aw=""+new URL("create_bg-B2uN_HVG.png",import.meta.url).href,lw=""+new URL("dpad-3wZIZEqb.png",import.meta.url).href,cw=""+new URL("eq_container-84uusXC9.png",import.meta.url).href,hw=""+new URL("eq_frame-d-QhyRgX.png",import.meta.url).href,dw=""+new URL("eq_slot-DS9kMsLx.png",import.meta.url).href,uw=""+new URL("fx_corrente-CI-yrk7e.png",import.meta.url).href,fw=""+new URL("fx_descarga-IY9gTcyD.png",import.meta.url).href,pw=""+new URL("fx_fireball-CNUxOMXZ.png",import.meta.url).href,mw=""+new URL("fx_ice-DGJxZKsy.png",import.meta.url).href,gw=""+new URL("fx_ice_lance-DCxKutbL.png",import.meta.url).href,_w=""+new URL("fx_imolacao-C-a5dtuo.png",import.meta.url).href,xw=""+new URL("fx_l_apunhalar-BRQuzQIj.png",import.meta.url).href,vw=""+new URL("fx_l_arremesso-rtDW0ow6.png",import.meta.url).href,bw=""+new URL("fx_l_danca-w9P6lgu4.png",import.meta.url).href,Mw=""+new URL("fx_l_dupla-C6r_wn6L.png",import.meta.url).href,ww=""+new URL("fx_l_estocada-hJYwlzLR.png",import.meta.url).href,yw=""+new URL("fx_l_mortal-DuYG-M3q.png",import.meta.url).href,Sw=""+new URL("fx_l_nuvem-B2qmk_tl.png",import.meta.url).href,Tw=""+new URL("fx_l_danca-w9P6lgu4.png",import.meta.url).href,Ew=""+new URL("fx_l_sombras-fe3usKIe.png",import.meta.url).href,Aw=""+new URL("fx_l_toxina-Bu3f7mn-.png",import.meta.url).href,Rw=""+new URL("fx_meteoro-DywgnSdp.png",import.meta.url).href,Cw=""+new URL("fx_muralha-yiXxe2Yc.png",import.meta.url).href,Lw=""+new URL("fx_prisao-BDhoA-oK.png",import.meta.url).href,Pw=""+new URL("fx_ray-BukWo5qE.png",import.meta.url).href,Uw=""+new URL("fx_tempestade-DS9uv2Z_.png",import.meta.url).href,Dw=""+new URL("hud_plate-B2ygb4FP.png",import.meta.url).href,Iw=""+new URL("ico_action-BRbeFgHL.png",import.meta.url).href,kw=""+new URL("ico_attack-CbdvrLXs.png",import.meta.url).href,Nw=""+new URL("ico_inventory-B_-_sjLB.png",import.meta.url).href,Fw=""+new URL("load_sword-Bhnb8m09.png",import.meta.url).href,Ow=""+new URL("logo_plate-CK0-uVl1.png",import.meta.url).href,Bw=""+new URL("map_frame-B4piWonF.png",import.meta.url).href,zw=""+new URL("menu_plate-_kr3JKFU.png",import.meta.url).href,Hw=""+new URL("bg_clerigo-BUhJVnRj.jpg",import.meta.url).href,Gw=""+new URL("bg_guerreiro-DWgmGaUG.jpg",import.meta.url).href,Vw=""+new URL("bg_ladino-B6L4a-g-.jpg",import.meta.url).href,Ww=""+new URL("bg_mago-Bct2J94D.jpg",import.meta.url).href,Xw=""+new URL("title_bg-DAPsvtIp.png",import.meta.url).href,qw=""+new URL("title_bg-DAPsvtIp.png",import.meta.url).href,$w=""+new URL("create_bg-B2uN_HVG.png",import.meta.url).href,Yw=""+new URL("menu_plate-_kr3JKFU.png",import.meta.url).href,jw=""+new URL("logo_plate-CK0-uVl1.png",import.meta.url).href,gl=""+new URL("load_sword-Bhnb8m09.png",import.meta.url).href,Zw=""+new URL("class_icon_guerreiro-C0eBl5F1.png",import.meta.url).href,Kw=""+new URL("class_icon_ladino-D8WBB-2i.png",import.meta.url).href,Jw=""+new URL("class_icon_mago-CqEgdtDo.png",import.meta.url).href,Qw=""+new URL("class_icon_clerigo-DoeXMn4k.png",import.meta.url).href,ty=qw,Hl={guerreiro:Zw,ladino:Kw,mago:Jw,clerigo:Qw};function ey(s){return ly(),new Promise(t=>{const e=document.createElement("div");e.id="gh-intro",s.appendChild(e);const n=o=>{e.remove(),t(o)},i=(o,l)=>iy(e,o,l,n,()=>kh(e,i,o.id,l));let r=0;const a=ay(oy(),o=>r=o);ry(e,()=>r,a,900,()=>ny(e,()=>kh(e,i)))})}function ny(s,t){s.innerHTML=`
    <div class="gh-screen gh-title"${` style="background-image:url(${ty})"`}>
      <div class="gh-veil"></div>
      <div class="gh-title-inner">
        <img class="gh-logo-img" src="${jw}" alt="Nethergloam" />
        <div class="gh-flourish"><svg viewBox="0 0 260 14" preserveAspectRatio="xMidYMid meet"><g fill="#c9a24a"><circle cx="7" cy="7" r="2.6"/><rect x="15" y="6.1" width="97" height="1.8" rx="0.9"/><path d="M130 1 L138 7 L130 13 L122 7 Z"/><rect x="148" y="6.1" width="97" height="1.8" rx="0.9"/><circle cx="253" cy="7" r="2.6"/></g></svg></div>
        <p class="gh-tagline">Desça ao Nethergloam. As trevas aguardam.</p>
      </div>
      <div class="gh-menu">
        <button class="gh-menu-btn" id="gh-btn-new">Novo Jogo</button>
        <button class="gh-menu-btn gh-disabled" disabled title="Em breve">Continuar</button>
      </div>
    </div>`,s.querySelector("#gh-btn-new").addEventListener("click",t)}function kh(s,t,e,n){let i=e&&ml[e]||Ns[0];s.innerHTML=`
    <div class="gh-screen gh-create">
      <h2 class="gh-screen-h">Crie seu Herói</h2>
      <div class="gh-class-tabs">
        ${Ns.map(h=>`<button class="gh-class-tab${h.id===i.id?" on":""}" data-id="${h.id}"><img class="gh-tab-ico" src="${Hl[h.id]}" alt=""/><span>${h.name}</span></button>`).join("")}
      </div>
      <div class="gh-class-main" id="gh-class-main"></div>
      <div class="gh-create-foot">
        <input class="gh-name-input" id="gh-name" maxlength="18" placeholder="Nome do herói" value="${n?n.replace(/"/g,"&quot;"):""}" />
        <button class="gh-menu-btn" id="gh-btn-start">Continuar ▸</button>
      </div>
    </div>`;const r=s.querySelector("#gh-class-main"),a=h=>r.innerHTML=Kr(h);a(i);const o=()=>{r.style.minHeight="0";let h=0;for(const d of Ns)r.innerHTML=Kr(d),h=Math.max(h,r.getBoundingClientRect().height);r.innerHTML=Kr(i),r.style.minHeight=Math.ceil(h)+"px"};o();const l=document.fonts;l?.ready&&l.ready.then(()=>{r.isConnected&&o()});const c=()=>{r.isConnected&&o()};window.addEventListener("resize",c),s.querySelectorAll(".gh-class-tab").forEach(h=>h.addEventListener("click",()=>{s.querySelectorAll(".gh-class-tab").forEach(d=>d.classList.toggle("on",d===h)),i=ml[h.dataset.id],a(i)})),s.querySelector("#gh-btn-start").addEventListener("click",()=>{const d=s.querySelector("#gh-name").value.trim()||"Herói";window.removeEventListener("resize",c),t(i,d)})}function iy(s,t,e,n,i){const r={...t.attr},a={...t.attr};s.innerHTML=`
    <div class="gh-screen gh-create">
      <h2 class="gh-screen-h">Distribua os Atributos</h2>
      <div class="gh-class-main" id="gh-alloc-main"></div>
      <div class="gh-create-foot">
        <button class="gh-menu-btn gh-menu-btn-sec" id="gh-back">◂ Voltar</button>
        <button class="gh-menu-btn" id="gh-start">Iniciar Jornada ▸</button>
      </div>
    </div>`;const o=s.querySelector("#gh-alloc-main"),l=()=>a.str-r.str+(a.dex-r.dex)+(a.int-r.int),c=()=>{o.innerHTML=sy(t,a,r,Eh-l()),o.querySelectorAll(".gh-pm").forEach(f=>f.addEventListener("click",()=>{const g=f.dataset.k,_=Number(f.dataset.d);_<0&&a[g]<=r[g]||_>0&&l()>=Eh||(a[g]+=_,c())}))},h=()=>{const f=o.getBoundingClientRect().width,g=document.createElement("div");g.className="gh-class-main",g.style.cssText=`position:absolute; left:-9999px; top:0; visibility:hidden; pointer-events:none; height:auto; width:${f}px;`,o.parentElement.appendChild(g);let _=0;for(const m of Ns)g.innerHTML=Kr(m),_=Math.max(_,g.getBoundingClientRect().height);g.remove(),o.style.height=Math.ceil(_)+"px",c()};h();const d=document.fonts;d?.ready&&d.ready.then(()=>{o.isConnected&&h()});const u=()=>{o.isConnected&&h()};window.addEventListener("resize",u),s.querySelector("#gh-back").addEventListener("click",()=>{window.removeEventListener("resize",u),i()}),s.querySelector("#gh-start").addEventListener("click",()=>{window.removeEventListener("resize",u),n({name:e,classId:t.id,attr:{...a}})})}function sy(s,t,e,n){const i=s.portrait?`<img class="gh-class-portrait" src="${s.portrait}" alt="" />`:`<div class="gh-class-ph"><div class="gh-ph-emoji">${s.emoji}</div></div>`,r=Zr(t,s.hp,s.mp),a=(l,c)=>{const h=t[c],d=h-e[c],u=h<=e[c]?" disabled":"",f=n<=0?" disabled":"";return`<div class="gh-prim-row">
      <span class="gh-prim-name">${l}</span>
      <span class="gh-prim-step">
        <button class="gh-pm" data-k="${c}" data-d="-1"${u}>−</button>
        <b class="gh-prim-val">${h}${d?`<i class="gh-prim-up">+${d}</i>`:""}</b>
        <button class="gh-pm" data-k="${c}" data-d="1"${f}>＋</button>
      </span>
    </div>`},o=(l,c)=>`<div class="gh-sec-row"><span>${l}</span><b>${c}</b></div>`;return`
    <div class="gh-class-art">${i}</div>
    <div class="gh-class-info gh-alloc">
      <div class="gh-class-name"><img class="gh-name-ico" src="${Hl[s.id]}" alt=""/>${s.name}</div>
      <div class="gh-alloc-points">Pontos a distribuir: <b class="${n>0?"gh-pts-on":""}">${n}</b></div>
      <div class="gh-prim">
        ${a("Força","str")}
        ${a("Destreza","dex")}
        ${a("Inteligência","int")}
      </div>
      <div class="gh-sec-blocks">
        <div class="gh-sec-col">
          <h4>⚔️ Ofensivo</h4>
          ${o("Atq. Físico",r.atkPhys)}
          ${o("Atq. Mágico",r.atkMag)}
          ${o("Crítico",r.crit+"%")}
          ${o("Dano Crít.",r.critDmg+"%")}
          ${o("Precisão",r.precision+"%")}
        </div>
        <div class="gh-sec-col">
          <h4>🛡️ Defensivo</h4>
          ${o("Vida",r.hp)}
          ${o("Defesa",r.def)}
          ${o("Res. Mágica",r.magRes)}
          ${o("Evasão",r.evasion+"%")}
        </div>
        <div class="gh-sec-col">
          <h4>🔷 Recursos</h4>
          ${o("Mana",r.mp)}
        </div>
      </div>
    </div>`}function Kr(s){const t=s.portrait?`<img class="gh-class-portrait" src="${s.portrait}" alt="" />`:`<div class="gh-class-ph"><div class="gh-ph-emoji">${s.emoji}</div><div class="gh-ph-txt">arte em breve</div></div>`,e=(i,r)=>`<div class="gh-attr"><span>${i}</span><div class="gh-attr-bar"><i style="width:${r*10}%"></i></div><b>${r}</b></div>`,n=s.weapons.map(i=>Uv[i]?.name).filter(Boolean).join(" · ");return`
    <div class="gh-class-art">${t}</div>
    <div class="gh-class-info">
      <div class="gh-class-name"><img class="gh-name-ico" src="${Hl[s.id]}" alt=""/>${s.name}</div>
      <div class="gh-class-tag">${s.tag}</div>
      <p class="gh-class-desc">${s.desc}</p>
      <div class="gh-attrs">
        ${e("Força",s.attr.str)}
        ${e("Destreza",s.attr.dex)}
        ${e("Inteligência",s.attr.int)}
      </div>
      <div class="gh-vitals"><span>❤ Vida ${s.hp}</span><span>✦ Mana ${s.mp}</span></div>
      <div class="gh-class-weapons"><b>Armas:</b> ${n}</div>
    </div>`}function ry(s,t,e,n,i){s.innerHTML=`
    <div class="gh-screen gh-boot">
      <div class="gh-boot-corner">
        <div class="gh-boot-sword" id="gh-boot-sword" style="--p:0%">
          <img class="gh-bs-base" src="${gl}" alt="" />
          <div class="gh-bs-fill"><div class="gh-bs-lava"></div></div>
        </div>
        <div class="gh-boot-txt" id="gh-boot-txt">Forjando o mundo… 0%</div>
      </div>
    </div>`;const r=s.querySelector("#gh-boot-sword"),a=s.querySelector("#gh-boot-txt"),o=performance.now();let l=0;const c=()=>{const h=Math.round(t()*100);r.style.setProperty("--p",h+"%"),a.textContent=`Forjando o mundo… ${h}%`,l=requestAnimationFrame(c)};c(),e.then(async()=>{const h=performance.now()-o;h<n&&await new Promise(d=>setTimeout(d,n-h)),cancelAnimationFrame(l),r.style.setProperty("--p","100%"),a.textContent="Pronto",await new Promise(d=>setTimeout(d,160)),i()})}function oy(){const s=Object.assign({"../assets/env/cluster1.png":Vb,"../assets/env/cluster2.png":Wb,"../assets/env/death_poof.png":Xb,"../assets/env/dec_banner.png":qb,"../assets/env/dec_cracks.png":$b,"../assets/env/dec_door.png":Yb,"../assets/env/dec_gate.png":jb,"../assets/env/dec_gate_bars.png":Zb,"../assets/env/dec_gate_frame.png":Kb,"../assets/env/dec_ivy.png":Jb,"../assets/env/dec_torch.png":Qb,"../assets/env/dec_window.png":tM,"../assets/env/enemy_skeleton.png":eM,"../assets/env/pine1.png":nM,"../assets/env/pine2.png":iM,"../assets/env/pine3.png":sM,"../assets/env/pine4.png":rM,"../assets/env/prop_lamp.png":oM,"../assets/env/prop_notice.png":aM,"../assets/env/sign_alch.png":lM,"../assets/env/sign_smith.png":cM,"../assets/env/sign_store.png":hM,"../assets/env/sign_tavern.png":dM,"../assets/env/sword.png":uM,"../assets/env/sword_atk.png":fM,"../assets/env/tex_caveceil.jpg":pM,"../assets/env/tex_cavefloor.jpg":mM,"../assets/env/tex_cavewall.jpg":gM,"../assets/env/tex_cobble.jpg":_M,"../assets/env/tex_dirt.jpg":xM,"../assets/env/tex_grass.jpg":vM,"../assets/env/tex_mosswall.jpg":bM,"../assets/env/tex_stonewall.jpg":MM,"../assets/env/tex_thatch.jpg":wM,"../assets/env/tex_wood.jpg":yM,"../assets/env/wpn_axe.png":SM,"../assets/env/wpn_dagger.png":TM,"../assets/env/wpn_greatsword.png":EM,"../assets/env/wpn_mace.png":AM,"../assets/env/wpn_maul.png":RM,"../assets/env/wpn_orb.png":CM,"../assets/env/wpn_rapier.png":LM,"../assets/env/wpn_shield.png":PM,"../assets/env/wpn_staff.png":UM,"../assets/env/wpn_sword.png":DM,"../assets/npc/alquimista.png":IM,"../assets/npc/anselmo.png":kM,"../assets/npc/camponesa.png":NM,"../assets/npc/costureira.png":FM,"../assets/npc/fazendeiro.png":OM,"../assets/npc/ferreiro.png":BM,"../assets/npc/gunther.png":zM,"../assets/npc/hedda.png":HM,"../assets/npc/lenhador.png":GM,"../assets/npc/lyle.png":VM,"../assets/npc/mercadora.png":WM,"../assets/npc/pip.png":XM,"../assets/npc/tam.png":qM,"../assets/npc/taverneiro.png":$M,"../assets/npc/wilma.png":YM,"../assets/ui/btn_base.png":jM,"../assets/ui/class_clerigo.png":ZM,"../assets/ui/class_guerreiro.png":KM,"../assets/ui/class_icon_clerigo.png":JM,"../assets/ui/class_icon_guerreiro.png":QM,"../assets/ui/class_icon_ladino.png":tw,"../assets/ui/class_icon_mago.png":ew,"../assets/ui/class_ladino.png":nw,"../assets/ui/class_mago.png":iw,"../assets/ui/clock_moon.png":sw,"../assets/ui/clock_sun.png":rw,"../assets/ui/coin.png":ow,"../assets/ui/create_bg.png":aw,"../assets/ui/dpad.png":lw,"../assets/ui/eq_container.png":cw,"../assets/ui/eq_frame.png":hw,"../assets/ui/eq_slot.png":dw,"../assets/ui/fx/fx_corrente.png":uw,"../assets/ui/fx/fx_descarga.png":fw,"../assets/ui/fx/fx_fireball.png":pw,"../assets/ui/fx/fx_ice.png":mw,"../assets/ui/fx/fx_ice_lance.png":gw,"../assets/ui/fx/fx_imolacao.png":_w,"../assets/ui/fx/fx_l_apunhalar.png":xw,"../assets/ui/fx/fx_l_arremesso.png":vw,"../assets/ui/fx/fx_l_danca.png":bw,"../assets/ui/fx/fx_l_dupla.png":Mw,"../assets/ui/fx/fx_l_estocada.png":ww,"../assets/ui/fx/fx_l_mortal.png":yw,"../assets/ui/fx/fx_l_nuvem.png":Sw,"../assets/ui/fx/fx_l_rajada.png":Tw,"../assets/ui/fx/fx_l_sombras.png":Ew,"../assets/ui/fx/fx_l_toxina.png":Aw,"../assets/ui/fx/fx_meteoro.png":Rw,"../assets/ui/fx/fx_muralha.png":Cw,"../assets/ui/fx/fx_prisao.png":Lw,"../assets/ui/fx/fx_ray.png":Pw,"../assets/ui/fx/fx_tempestade.png":Uw,"../assets/ui/hud_plate.png":Dw,"../assets/ui/ico_action.png":Iw,"../assets/ui/ico_attack.png":kw,"../assets/ui/ico_inventory.png":Nw,"../assets/ui/load_sword.png":Fw,"../assets/ui/logo_plate.png":Ow,"../assets/ui/map_frame.png":Bw,"../assets/ui/menu_plate.png":zw,"../assets/ui/skills/bg_clerigo.jpg":Hw,"../assets/ui/skills/bg_guerreiro.jpg":Gw,"../assets/ui/skills/bg_ladino.jpg":Vw,"../assets/ui/skills/bg_mago.jpg":Ww,"../assets/ui/skills/sk_clerigo_01.png":Td,"../assets/ui/skills/sk_clerigo_02.png":Ed,"../assets/ui/skills/sk_clerigo_03.png":Ad,"../assets/ui/skills/sk_clerigo_04.png":Rd,"../assets/ui/skills/sk_clerigo_05.png":Cd,"../assets/ui/skills/sk_clerigo_06.png":Ld,"../assets/ui/skills/sk_clerigo_07.png":Pd,"../assets/ui/skills/sk_clerigo_08.png":Ud,"../assets/ui/skills/sk_clerigo_09.png":Dd,"../assets/ui/skills/sk_clerigo_10.png":Id,"../assets/ui/skills/sk_clerigo_11.png":kd,"../assets/ui/skills/sk_clerigo_12.png":Nd,"../assets/ui/skills/sk_clerigo_13.png":Fd,"../assets/ui/skills/sk_clerigo_14.png":Od,"../assets/ui/skills/sk_clerigo_15.png":Bd,"../assets/ui/skills/sk_guerreiro_01.png":zd,"../assets/ui/skills/sk_guerreiro_02.png":Hd,"../assets/ui/skills/sk_guerreiro_03.png":Gd,"../assets/ui/skills/sk_guerreiro_04.png":Vd,"../assets/ui/skills/sk_guerreiro_05.png":Wd,"../assets/ui/skills/sk_guerreiro_06.png":Xd,"../assets/ui/skills/sk_guerreiro_07.png":qd,"../assets/ui/skills/sk_guerreiro_08.png":$d,"../assets/ui/skills/sk_guerreiro_09.png":Yd,"../assets/ui/skills/sk_guerreiro_10.png":jd,"../assets/ui/skills/sk_guerreiro_11.png":Zd,"../assets/ui/skills/sk_guerreiro_12.png":Kd,"../assets/ui/skills/sk_guerreiro_13.png":Jd,"../assets/ui/skills/sk_guerreiro_14.png":Qd,"../assets/ui/skills/sk_guerreiro_15.png":tu,"../assets/ui/skills/sk_ladino_01.png":eu,"../assets/ui/skills/sk_ladino_02.png":nu,"../assets/ui/skills/sk_ladino_03.png":iu,"../assets/ui/skills/sk_ladino_04.png":su,"../assets/ui/skills/sk_ladino_05.png":ru,"../assets/ui/skills/sk_ladino_06.png":ou,"../assets/ui/skills/sk_ladino_07.png":au,"../assets/ui/skills/sk_ladino_08.png":lu,"../assets/ui/skills/sk_ladino_09.png":cu,"../assets/ui/skills/sk_ladino_10.png":hu,"../assets/ui/skills/sk_ladino_11.png":du,"../assets/ui/skills/sk_ladino_12.png":uu,"../assets/ui/skills/sk_ladino_13.png":fu,"../assets/ui/skills/sk_ladino_14.png":pu,"../assets/ui/skills/sk_ladino_15.png":mu,"../assets/ui/skills/sk_mago_01.png":gu,"../assets/ui/skills/sk_mago_02.png":_u,"../assets/ui/skills/sk_mago_03.png":xu,"../assets/ui/skills/sk_mago_04.png":vu,"../assets/ui/skills/sk_mago_05.png":bu,"../assets/ui/skills/sk_mago_06.png":Mu,"../assets/ui/skills/sk_mago_07.png":wu,"../assets/ui/skills/sk_mago_08.png":yu,"../assets/ui/skills/sk_mago_09.png":Su,"../assets/ui/skills/sk_mago_10.png":Tu,"../assets/ui/skills/sk_mago_11.png":Eu,"../assets/ui/skills/sk_mago_12.png":Au,"../assets/ui/skills/sk_mago_13.png":Ru,"../assets/ui/skills/sk_mago_14.png":Cu,"../assets/ui/skills/sk_mago_15.png":Lu,"../assets/ui/skills/sk_passive_01.png":Pu,"../assets/ui/skills/sk_passive_02.png":Uu,"../assets/ui/skills/sk_passive_03.png":Du,"../assets/ui/skills/sk_passive_04.png":Iu,"../assets/ui/skills/sk_passive_05.png":ku,"../assets/ui/skills/sk_passive_06.png":Nu,"../assets/ui/skills/sk_passive_07.png":Fu,"../assets/ui/skills/sk_passive_08.png":Ou,"../assets/ui/skills/sk_passive_09.png":Bu,"../assets/ui/skills/sk_passive_10.png":zu,"../assets/ui/skills/sk_passive_11.png":Hu,"../assets/ui/skills/sk_passive_12.png":Gu,"../assets/ui/skills/sk_passive_13.png":Vu,"../assets/ui/skills/sk_passive_14.png":Wu,"../assets/ui/skills/sk_passive_15.png":Xu,"../assets/ui/skills/sk_passive_16.png":qu,"../assets/ui/title_bg.png":Xw});return Array.from(new Set(Object.values(s)))}async function ay(s,t){if(s.length===0){t(1);return}let e=0;await Promise.all(s.map(n=>new Promise(i=>{const r=new Image,a=()=>{e++,t(e/s.length),i()};r.onload=a,r.onerror=a,r.src=n})))}function ly(){if(document.getElementById("gh-intro-style"))return;const s=document.createElement("style");s.id="gh-intro-style",s.textContent=`
  #gh-intro {
    position:fixed; inset:0; z-index:60; color:#e9dcbe;
    font-family:"MedievalSharp","Trebuchet MS",serif;
    user-select:none; -webkit-user-select:none;
  }
  #gh-intro .gh-screen {
    position:absolute; inset:0; display:flex; flex-direction:column;
    align-items:center; justify-content:center; padding:16px; overflow:auto;
  }
  /* --- título --- */
  /* título: key art de fundo (cover); logo no topo (céu escuro), menu embaixo */
  #gh-intro .gh-title {
    justify-content:space-between; padding:10vh 18px 8vh;
    background:#0a0b10 center/cover no-repeat;
    background-image:
      radial-gradient(ellipse at 50% 30%, rgba(120,70,30,.2), rgba(10,11,16,0) 60%),
      linear-gradient(#12131a, #05060a);
  }
  /* escurece topo (atrás do logo) e base (atrás do menu) p/ o texto ler bem sobre
     a arte, mantendo o meio (a figura com a lanterna) visível. */
  #gh-intro .gh-veil {
    position:absolute; inset:0; pointer-events:none;
    background:
      linear-gradient(180deg, rgba(4,5,9,.6) 0%, rgba(4,5,9,0) 26%, rgba(4,5,9,0) 56%, rgba(4,5,9,.84) 100%),
      radial-gradient(ellipse at 50% 42%, rgba(0,0,0,0) 55%, rgba(0,0,0,.4) 100%);
  }
  #gh-intro .gh-title-inner { position:relative; z-index:1; text-align:center; }
  /* wordmark: letras com gradiente metálico dourado (brilho + bevel), borda
     escura gravada e brilho quente — cara de logo de verdade. */
  #gh-intro .gh-logo {
    font-family:"Cinzel",serif; font-weight:700; margin:0; line-height:1.04;
    font-size:clamp(34px,9vw,74px); letter-spacing:2px;
    background:linear-gradient(180deg,#fbefc0 0%,#e9cd72 30%,#b58230 52%,#f3dc8f 68%,#9c6e22 100%);
    -webkit-background-clip:text; background-clip:text;
    color:transparent; -webkit-text-fill-color:transparent;
    -webkit-text-stroke:0.6px rgba(58,38,10,.55);
    filter:drop-shadow(0 2px 2px rgba(0,0,0,.75)) drop-shadow(0 0 24px rgba(220,160,60,.38));
  }
  #gh-intro .gh-logo-sm { font-size:clamp(28px,7vw,50px); }
  /* logo = placa pintada (com o nome já embutido). Encaixa direto, sem recorte de letra. */
  #gh-intro .gh-logo-img {
    display:block; width:min(680px,92vw); height:auto; margin:0 auto;
    filter:drop-shadow(0 5px 14px rgba(0,0,0,.72));
  }
  #gh-intro .gh-logo-img-sm { width:min(440px,78vw); }
  #gh-intro .gh-flourish {
    width:min(320px,74vw); margin:9px auto 6px;
    filter:drop-shadow(0 0 6px rgba(201,162,39,.4));
  }
  #gh-intro .gh-flourish svg { width:100%; height:auto; display:block; }
  #gh-intro .gh-tagline { font-style:italic; opacity:.82; margin:0 0 6px; font-size:clamp(13px,2.4vh,17px); }
  #gh-intro .gh-menu { position:relative; z-index:1; display:flex; flex-direction:column; gap:12px; align-items:center; }
  /* botão de menu = placa de pedra (arte PNG) em 9-slice; texto dourado por cima */
  #gh-intro .gh-menu-btn {
    font-family:"Cinzel",serif; font-size:clamp(15px,2.4vh,20px); letter-spacing:1px;
    padding:15px 46px; min-width:236px; color:#f0e0b4; cursor:pointer;
    background:transparent;
    border-style:solid; border-width:17px 28px;
    border-image:url(${Yw}) 150 165 fill;
    text-shadow:0 2px 4px #000, 0 0 10px rgba(0,0,0,.6);
    filter:drop-shadow(0 3px 8px rgba(0,0,0,.5));
    transition:filter .15s, color .15s, transform .1s;
  }
  #gh-intro .gh-menu-btn:hover:not(.gh-disabled) { color:#fff; filter:drop-shadow(0 0 14px rgba(240,192,64,.55)); }
  #gh-intro .gh-menu-btn:active:not(.gh-disabled) { transform:translateY(1px) scale(.985); }
  #gh-intro .gh-disabled { opacity:.42; cursor:default; }
  /* --- criação de personagem --- */
  #gh-intro .gh-create { justify-content:flex-start; gap:9px; overflow-y:auto; -webkit-overflow-scrolling:touch; }
  /* fundo (arte da cripta) FIXO atrás da UI + véu p/ o texto ler bem */
  #gh-intro .gh-create::before {
    content:""; position:fixed; inset:0; z-index:0;
    background:#0a0b10 center/cover no-repeat; background-image:url(${$w});
  }
  #gh-intro .gh-create::after {
    content:""; position:fixed; inset:0; z-index:0; pointer-events:none;
    background:linear-gradient(180deg, rgba(6,7,11,.74) 0%, rgba(6,7,11,.44) 32%, rgba(6,7,11,.5) 68%, rgba(6,7,11,.82) 100%);
  }
  /* NADA encolhe abaixo do conteúdo (senão o rodapé sobrepõe o painel) — a tela
     rola quando precisa; e tudo fica ACIMA do fundo (z-index:1). */
  #gh-intro .gh-create > * { flex:0 0 auto; position:relative; z-index:1; }
  #gh-intro .gh-screen-h {
    font-family:"Cinzel",serif; font-weight:700; color:#eccf82; margin:4px 0 0;
    font-size:clamp(19px,3vh,28px); text-shadow:0 2px 8px #000;
  }
  #gh-intro .gh-class-tabs { display:flex; gap:14px; flex-wrap:wrap; justify-content:center; }
  /* aba = SÓ o ícone clicável (sem caixa/borda). O selecionado brilha; os outros
     ficam mais apagados. */
  #gh-intro .gh-class-tab {
    display:flex; flex-direction:column; align-items:center; gap:3px; cursor:pointer;
    padding:2px 4px; color:#b6a877; font-family:"Cinzel",serif; font-size:13px;
    background:none; border:0; border-radius:0;
    opacity:.6; filter:grayscale(.25); transition:opacity .15s, filter .15s, color .15s, transform .1s;
  }
  #gh-intro .gh-class-tab:hover { opacity:.9; }
  #gh-intro .gh-class-tab:active { transform:scale(.94); }
  #gh-intro .gh-class-tab.on { opacity:1; filter:none; color:#f4d98a; }
  #gh-intro .gh-tab-ico {
    width:52px; height:52px; object-fit:contain; display:block; margin:0 auto;
    filter:drop-shadow(0 2px 3px rgba(0,0,0,.75));
  }
  #gh-intro .gh-class-tab.on .gh-tab-ico {
    filter:drop-shadow(0 0 9px rgba(240,200,90,.75)) drop-shadow(0 2px 3px rgba(0,0,0,.7));
  }
  #gh-intro .gh-class-main {
    display:flex; flex-direction:row; gap:14px; width:min(720px,96%); box-sizing:border-box;
    border:clamp(16px,3vw,24px) solid transparent; border-image:url(${$u}) 88 fill;
    padding:6px; align-items:stretch; flex-shrink:0;
  }
  /* a arte ESTICA até a altura da coluna de info (preenche o container, sem vazio
     embaixo); object-fit cover mantém o retrato sem distorcer. */
  #gh-intro .gh-class-art { flex:0 0 auto; width:min(38%,210px); align-self:stretch; min-height:238px; }
  #gh-intro .gh-class-portrait, #gh-intro .gh-class-ph {
    width:100%; height:100%; border-radius:8px; object-fit:cover;
    border:2px solid rgba(201,162,39,.45); background:rgba(8,7,5,.6);
  }
  #gh-intro .gh-class-ph { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; }
  #gh-intro .gh-ph-emoji { font-size:64px; filter:drop-shadow(0 3px 8px #000); }
  #gh-intro .gh-ph-txt { font-style:italic; opacity:.6; font-size:13px; }
  #gh-intro .gh-class-info { flex:1 1 auto; min-width:0; }
  #gh-intro .gh-class-name { display:flex; align-items:center; gap:8px; font-family:"Cinzel",serif; font-weight:700; font-size:clamp(18px,2.8vh,24px); color:#f0dca2; }
  #gh-intro .gh-name-ico { width:30px; height:30px; object-fit:contain; flex:0 0 auto; filter:drop-shadow(0 1px 2px rgba(0,0,0,.7)); }
  #gh-intro .gh-class-tag { color:#c9a84f; font-style:italic; margin-bottom:6px; font-size:14px; }
  #gh-intro .gh-class-desc { font-size:clamp(13px,1.9vh,15px); line-height:1.4; margin:0 0 10px; color:#ddd0b0; }
  #gh-intro .gh-attrs { display:flex; flex-direction:column; gap:5px; margin-bottom:8px; }
  #gh-intro .gh-attr { display:flex; align-items:center; gap:8px; font-size:13px; }
  #gh-intro .gh-attr > span { width:88px; color:#c6b58a; }
  #gh-intro .gh-attr > b { width:18px; text-align:right; color:#f0dca2; }
  #gh-intro .gh-attr-bar { flex:1; height:9px; background:rgba(0,0,0,.5); border:1px solid rgba(201,162,39,.4); border-radius:6px; overflow:hidden; }
  #gh-intro .gh-attr-bar i { display:block; height:100%; background:linear-gradient(#d8c24a,#8a7016); }
  #gh-intro .gh-vitals { display:flex; gap:16px; font-size:14px; color:#e6d6ac; margin-bottom:6px; }
  #gh-intro .gh-class-weapons { font-size:13px; color:#cbbb8e; }
  #gh-intro .gh-class-weapons b { color:#e6d09a; font-family:"Cinzel",serif; }
  /* --- distribuição de atributos (passo 2) --- */
  /* ocupa toda a altura fixa da moldura; se faltar espaço, rola POR DENTRO (a
     moldura nunca muda de tamanho). */
  #gh-intro .gh-alloc {
    display:flex; flex-direction:column; gap:4px;
    height:100%; min-height:0; overflow-y:auto; overflow-x:hidden; padding-right:4px;
  }
  #gh-intro .gh-alloc-points { font-size:13px; color:#d7c79a; }
  #gh-intro .gh-alloc-points b { font-family:"Cinzel",serif; font-size:15px; color:#8f8262; padding:0 2px; }
  #gh-intro .gh-alloc-points b.gh-pts-on { color:#ffd964; text-shadow:0 0 8px rgba(240,200,90,.5); }
  #gh-intro .gh-prim { display:flex; flex-direction:column; gap:2px; padding:4px 0; border-top:1px solid rgba(201,162,39,.22); border-bottom:1px solid rgba(201,162,39,.22); }
  /* linha do primário: nome ELÁSTICO (encolhe, com reticências) + stepper compacto
     à direita — nunca vaza a moldura. */
  #gh-intro .gh-prim-row { display:flex; align-items:center; gap:8px; }
  #gh-intro .gh-prim-name { flex:1 1 auto; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-family:"Cinzel",serif; font-size:14px; color:#e7d7a6; }
  #gh-intro .gh-prim-step { flex:0 0 auto; display:flex; align-items:center; gap:6px; }
  #gh-intro .gh-prim-val { min-width:30px; text-align:center; font-size:16px; color:#fff; }
  #gh-intro .gh-prim-up { font-style:normal; font-size:10px; color:#7ee08a; margin-left:2px; vertical-align:super; }
  #gh-intro .gh-pm {
    width:24px; height:24px; flex:0 0 auto; cursor:pointer; font-size:16px; line-height:1;
    color:#f0dca2; background:linear-gradient(#2b2218,#160f08);
    border:2px solid rgba(201,162,39,.6); border-radius:7px;
    display:flex; align-items:center; justify-content:center; padding:0;
    transition:border-color .12s, transform .08s, color .12s;
  }
  #gh-intro .gh-pm:hover:not(:disabled) { border-color:#f4c847; color:#fff; }
  #gh-intro .gh-pm:active:not(:disabled) { transform:scale(.9); }
  #gh-intro .gh-pm:disabled { opacity:.3; cursor:default; }
  /* no passo de atributos o retrato é um pouco mais estreito → sobra largura pros
     números, garantindo 2 colunas na moldura estreita do celular. */
  #gh-intro #gh-alloc-main .gh-class-art { width:min(36%,170px); }
  /* secundários: grade auto-ajustável — 3 colunas nas telas largas (fica baixinho),
     2 colunas no celular (mais alto, mas cabe na moldura travada). */
  #gh-intro .gh-sec-blocks { display:grid; grid-template-columns:repeat(auto-fit, minmax(84px, 1fr)); gap:3px 10px; align-content:start; }
  #gh-intro .gh-sec-col { min-width:0; }
  #gh-intro .gh-sec-col h4 {
    margin:2px 0 3px; font-family:"Cinzel",serif; font-size:12px; color:#eccf82; white-space:nowrap;
    border-bottom:1px solid rgba(201,162,39,.28); padding-bottom:2px;
  }
  #gh-intro .gh-sec-row { display:flex; justify-content:space-between; gap:6px; font-size:12px; color:#cdbd90; padding:0.5px 0; }
  #gh-intro .gh-sec-row span { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  #gh-intro .gh-sec-row b { color:#f0e0b0; font-variant-numeric:tabular-nums; flex:0 0 auto; }
  #gh-intro .gh-sec-note { font-size:10.5px; font-style:italic; color:#9c8f6d; margin-top:5px; line-height:1.3; }
  #gh-intro .gh-menu-btn-sec { min-width:120px; padding:15px 22px; opacity:.9; }
  #gh-intro .gh-create-foot { display:flex; gap:10px; align-items:center; flex-wrap:wrap; justify-content:center; margin:2px 0 12px; }
  #gh-intro .gh-name-input {
    font-family:"MedievalSharp",serif; font-size:16px; color:#f0e6c8; text-align:center;
    padding:10px 16px; width:min(260px,70vw); background:rgba(12,9,6,.8);
    border:2px solid rgba(201,162,39,.55); border-radius:9px; outline:none;
  }
  #gh-intro .gh-name-input:focus { border-color:#f4c847; }
  /* só empilha (arte em cima) em telas MUITO estreitas; nos demais fica lado a
     lado (compacto, cabe sem rolar). */
  @media (max-width:380px) {
    #gh-intro .gh-class-main { flex-direction:column; align-items:center; }
    /* empilhado: a arte volta a ter proporção 3:4 (não estica na vertical) */
    #gh-intro .gh-class-art { width:min(58%,170px); align-self:center; min-height:0; }
    #gh-intro .gh-class-portrait, #gh-intro .gh-class-ph { height:auto; aspect-ratio:3/4; }
    #gh-intro .gh-attr > span { width:74px; }
  }
  /* --- boot (tela preta + espada enchendo no canto) --- */
  #gh-intro .gh-boot { background:#000; }
  #gh-intro .gh-boot-corner {
    position:absolute; right:clamp(14px,3vw,34px); bottom:clamp(16px,4vh,36px);
    display:flex; flex-direction:column; align-items:flex-end; gap:8px;
  }
  @property --p { syntax:'<percentage>'; inherits:true; initial-value:0%; }
  #gh-intro .gh-boot-sword {
    position:relative; width:min(300px,60vw); aspect-ratio:332/81;
    transition:--p .3s linear; /* o nível da lava sobe suave a cada passo */
    animation:gh-lavaglow 1.6s ease-in-out infinite; /* brilho quente pulsando */
  }
  /* base = a espada apagada (o "vazio") */
  #gh-intro .gh-bs-base {
    width:100%; height:100%; display:block;
    filter:brightness(.24) saturate(.3) drop-shadow(0 2px 4px #000);
  }
  /* LAVA: fluido incandescente enchendo a lâmina até --p (esq→dir). Recortado
     pela INTERSEÇÃO da silhueta da espada com o nível preenchido, e com blobs
     quentes que se agitam (parece líquido borbulhando). */
  /* CLIPE por LARGURA (overflow hidden) — recorte universal e à prova de GPU.
     A largura é var(--p) do container; o nível da lava sobe esq→dir. */
  #gh-intro .gh-bs-fill {
    position:absolute; left:0; top:0; bottom:0; width:var(--p);
    overflow:hidden;
  }
  /* a LAVA tem SEMPRE a largura da espada (mesma expressão), então o recorte por
     largura do pai revela só a parte cheia, alinhada à silhueta. */
  #gh-intro .gh-bs-lava {
    position:absolute; left:0; top:0; height:100%; width:min(300px,60vw);
    -webkit-mask:url(${gl}) left center / 100% 100% no-repeat;
    mask:url(${gl}) left center / 100% 100% no-repeat;
    background:
      radial-gradient(60% 150% at 22% 32%, rgba(255,246,180,.60), transparent 55%),
      radial-gradient(48% 160% at 58% 70%, rgba(255,150,44,.60), transparent 60%),
      radial-gradient(42% 150% at 84% 42%, rgba(255,104,26,.55), transparent 62%),
      linear-gradient(90deg,#5c1604 0,#b8360d 32%,#ee6a1c 60%,#ffab3e 82%,#ffe27f 95%,#fff6cf 100%);
    background-size:170% 210%,200% 240%,220% 200%,100% 100%;
    background-repeat:no-repeat;
    animation:gh-lava 2.8s ease-in-out infinite; /* blobs quentes se agitam (fluido) */
  }
  @keyframes gh-lava {
    0%   { background-position:10% 28%, 82% 72%, 38% 50%, 0 0; }
    50%  { background-position:46% 66%, 44% 34%, 72% 58%, 0 0; }
    100% { background-position:10% 28%, 82% 72%, 38% 50%, 0 0; }
  }
  @keyframes gh-lavaglow {
    0%,100% { filter:drop-shadow(0 0 9px rgba(255,120,32,.8)) drop-shadow(0 0 3px rgba(255,220,120,.85)) brightness(1); }
    50%     { filter:drop-shadow(0 0 15px rgba(255,150,50,.95)) drop-shadow(0 0 6px rgba(255,236,150,1)) brightness(1.14); }
  }
  #gh-intro .gh-boot-txt {
    font-family:"Cinzel",serif; letter-spacing:1px; font-size:12px;
    color:#cbb98a; text-shadow:0 1px 3px #000;
  }
  `,document.head.appendChild(s)}document.documentElement.dataset.ghBuild="2026-07-24s";const zr=document.getElementById("app"),Nh=new URLSearchParams(location.search);Nh.has("show")?new Fs(zr,{name:"Test",classId:"mago"},"showcase"):Nh.has("test")?new Fs(zr,{name:"Test",classId:"mago"}):ey(zr).then(s=>{new Fs(zr,s)});
