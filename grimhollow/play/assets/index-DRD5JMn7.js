var ef=Object.defineProperty;var nf=(s,t,e)=>t in s?ef(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var ht=(s,t,e)=>nf(s,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const bl="170",sf=0,ql=1,rf=2,Hh=1,of=2,zn=3,ri=0,Je=1,$t=2,ii=0,Ji=1,to=2,$l=3,Yl=4,af=5,bi=100,lf=101,cf=102,hf=103,df=104,uf=200,ff=201,pf=202,mf=203,Sa=204,Ta=205,gf=206,_f=207,xf=208,vf=209,bf=210,Mf=211,wf=212,yf=213,Sf=214,Ea=0,Aa=1,Ra=2,ns=3,Ca=4,La=5,Pa=6,Ua=7,co=0,Tf=1,Ef=2,si=0,Af=1,Rf=2,Cf=3,Lf=4,Pf=5,Uf=6,Df=7,Gh=300,is=301,ss=302,Da=303,Ia=304,ho=306,sn=1e3,xn=1001,ka=1002,Mn=1003,If=1004,er=1005,Ve=1006,vo=1007,vn=1008,Xn=1009,Vh=1010,Wh=1011,zs=1012,Ml=1013,Si=1014,Hn=1015,$s=1016,wl=1017,yl=1018,rs=1020,Xh=35902,qh=1021,$h=1022,bn=1023,Yh=1024,jh=1025,Qi=1026,os=1027,Zh=1028,Sl=1029,Kh=1030,Tl=1031,El=1033,Vr=33776,Wr=33777,Xr=33778,qr=33779,Na=35840,Fa=35841,Oa=35842,za=35843,Ba=36196,Ha=37492,Ga=37496,Va=37808,Wa=37809,Xa=37810,qa=37811,$a=37812,Ya=37813,ja=37814,Za=37815,Ka=37816,Ja=37817,Qa=37818,tl=37819,el=37820,nl=37821,$r=36492,il=36494,sl=36495,Jh=36283,rl=36284,ol=36285,al=36286,kf=3200,Nf=3201,Al=0,Ff=1,ni="",Ce="srgb",cs="srgb-linear",uo="linear",pe="srgb",Ci=7680,jl=519,Of=512,zf=513,Bf=514,Qh=515,Hf=516,Gf=517,Vf=518,Wf=519,ll=35044,Zl="300 es",Gn=2e3,eo=2001;class hs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}}const Ne=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],bo=Math.PI/180,cl=180/Math.PI;function Vn(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ne[s&255]+Ne[s>>8&255]+Ne[s>>16&255]+Ne[s>>24&255]+"-"+Ne[t&255]+Ne[t>>8&255]+"-"+Ne[t>>16&15|64]+Ne[t>>24&255]+"-"+Ne[e&63|128]+Ne[e>>8&255]+"-"+Ne[e>>16&255]+Ne[e>>24&255]+Ne[n&255]+Ne[n>>8&255]+Ne[n>>16&255]+Ne[n>>24&255]).toLowerCase()}function He(s,t,e){return Math.max(t,Math.min(e,s))}function Xf(s,t){return(s%t+t)%t}function Mo(s,t,e){return(1-e)*s+e*t}function Cn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function me(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}class wt{constructor(t=0,e=0){wt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(He(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Zt{constructor(t,e,n,i,r,a,o,l,c){Zt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c)}set(t,e,n,i,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],g=n[8],_=i[0],m=i[3],p=i[6],y=i[1],v=i[4],x=i[7],E=i[2],S=i[5],A=i[8];return r[0]=a*_+o*y+l*E,r[3]=a*m+o*v+l*S,r[6]=a*p+o*x+l*A,r[1]=c*_+h*y+d*E,r[4]=c*m+h*v+d*S,r[7]=c*p+h*x+d*A,r[2]=u*_+f*y+g*E,r[5]=u*m+f*v+g*S,r[8]=u*p+f*x+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*a-o*c,u=o*l-h*r,f=c*r-a*l,g=e*d+n*u+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=d*_,t[1]=(i*c-h*n)*_,t[2]=(o*n-i*a)*_,t[3]=u*_,t[4]=(h*e-i*l)*_,t[5]=(i*r-o*e)*_,t[6]=f*_,t[7]=(n*l-c*e)*_,t[8]=(a*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-i*c,i*l,-i*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(wo.makeScale(t,e)),this}rotate(t){return this.premultiply(wo.makeRotation(-t)),this}translate(t,e){return this.premultiply(wo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const wo=new Zt;function td(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Bs(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function qf(){const s=Bs("canvas");return s.style.display="block",s}const Kl={};function Cs(s){s in Kl||(Kl[s]=!0,console.warn(s))}function $f(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Yf(s){const t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function jf(s){const t=s.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const ae={enabled:!0,workingColorSpace:cs,spaces:{},convert:function(s,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===pe&&(s.r=Wn(s.r),s.g=Wn(s.g),s.b=Wn(s.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(s.applyMatrix3(this.spaces[t].toXYZ),s.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===pe&&(s.r=ts(s.r),s.g=ts(s.g),s.b=ts(s.b))),s},fromWorkingColorSpace:function(s,t){return this.convert(s,this.workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ni?uo:this.spaces[s].transfer},getLuminanceCoefficients:function(s,t=this.workingColorSpace){return s.fromArray(this.spaces[t].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,t,e){return s.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function Wn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function ts(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const Jl=[.64,.33,.3,.6,.15,.06],Ql=[.2126,.7152,.0722],tc=[.3127,.329],ec=new Zt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),nc=new Zt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ae.define({[cs]:{primaries:Jl,whitePoint:tc,transfer:uo,toXYZ:ec,fromXYZ:nc,luminanceCoefficients:Ql,workingColorSpaceConfig:{unpackColorSpace:Ce},outputColorSpaceConfig:{drawingBufferColorSpace:Ce}},[Ce]:{primaries:Jl,whitePoint:tc,transfer:pe,toXYZ:ec,fromXYZ:nc,luminanceCoefficients:Ql,outputColorSpaceConfig:{drawingBufferColorSpace:Ce}}});let Li;class Zf{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Li===void 0&&(Li=Bs("canvas")),Li.width=t.width,Li.height=t.height;const n=Li.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Li}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Bs("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=Wn(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Wn(e[n]/255)*255):e[n]=Wn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Kf=0;class ed{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Kf++}),this.uuid=Vn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(yo(i[a].image)):r.push(yo(i[a]))}else r=yo(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function yo(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Zf.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Jf=0;class We extends hs{constructor(t=We.DEFAULT_IMAGE,e=We.DEFAULT_MAPPING,n=xn,i=xn,r=Ve,a=vn,o=bn,l=Xn,c=We.DEFAULT_ANISOTROPY,h=ni){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Jf++}),this.uuid=Vn(),this.name="",this.source=new ed(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new wt(0,0),this.repeat=new wt(1,1),this.center=new wt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Gh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case sn:t.x=t.x-Math.floor(t.x);break;case xn:t.x=t.x<0?0:1;break;case ka:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case sn:t.y=t.y-Math.floor(t.y);break;case xn:t.y=t.y<0?0:1;break;case ka:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}We.DEFAULT_IMAGE=null;We.DEFAULT_MAPPING=Gh;We.DEFAULT_ANISOTROPY=1;class ge{constructor(t=0,e=0,n=0,i=1){ge.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const v=(c+1)/2,x=(f+1)/2,E=(p+1)/2,S=(h+u)/4,A=(d+_)/4,R=(g+m)/4;return v>x&&v>E?v<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(v),i=S/n,r=A/n):x>E?x<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(x),n=S/i,r=R/i):E<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(E),n=A/r,i=R/r),this.set(n,i,r,e),this}let y=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(d-_)/y,this.z=(u-h)/y,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Qf extends hs{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ge(0,0,t,e),this.scissorTest=!1,this.viewport=new ge(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ve,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new We(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new ed(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ti extends Qf{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class nd extends We{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Mn,this.minFilter=Mn,this.wrapR=xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class tp extends We{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Mn,this.minFilter=Mn,this.wrapR=xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ys{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],d=n[i+3];const u=r[a+0],f=r[a+1],g=r[a+2],_=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(o===1){t[e+0]=u,t[e+1]=f,t[e+2]=g,t[e+3]=_;return}if(d!==_||l!==u||c!==f||h!==g){let m=1-o;const p=l*u+c*f+h*g+d*_,y=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){const E=Math.sqrt(v),S=Math.atan2(E,p*y);m=Math.sin(m*S)/E,o=Math.sin(o*S)/E}const x=o*y;if(l=l*m+u*x,c=c*m+f*x,h=h*m+g*x,d=d*m+_*x,m===1-o){const E=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=E,c*=E,h*=E,d*=E}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,i,r,a){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],d=r[a],u=r[a+1],f=r[a+2],g=r[a+3];return t[e]=o*g+h*d+l*f-c*u,t[e+1]=l*g+h*u+c*d-o*f,t[e+2]=c*g+h*f+o*u-l*d,t[e+3]=h*g-o*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),d=o(r/2),u=l(n/2),f=l(i/2),g=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+o+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-i)*f}else if(n>o&&n>d){const f=2*Math.sqrt(1+n-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+c)/f}else if(o>d){const f=2*Math.sqrt(1+o-n-d);this._w=(r-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+d-n-o);this._w=(a-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(He(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+i*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-e;return this._w=f*a+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),d=Math.sin((1-e)*h)/c,u=Math.sin(e*h)/c;return this._w=a*d+this._w*u,this._x=n*d+this._x*u,this._y=i*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class k{constructor(t=0,e=0,n=0){k.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(ic.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(ic.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*i-o*n),h=2*(o*e-r*i),d=2*(r*n-a*e);return this.x=e+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=i+l*d+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return So.copy(this).projectOnVector(t),this.sub(So)}reflect(t){return this.sub(So.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(He(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const So=new k,ic=new Ys;class js{constructor(t=new k(1/0,1/0,1/0),e=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(fn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(fn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=fn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,fn):fn.fromBufferAttribute(r,a),fn.applyMatrix4(t.matrixWorld),this.expandByPoint(fn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),nr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),nr.copy(n.boundingBox)),nr.applyMatrix4(t.matrixWorld),this.union(nr)}const i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,fn),fn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ms),ir.subVectors(this.max,ms),Pi.subVectors(t.a,ms),Ui.subVectors(t.b,ms),Di.subVectors(t.c,ms),jn.subVectors(Ui,Pi),Zn.subVectors(Di,Ui),hi.subVectors(Pi,Di);let e=[0,-jn.z,jn.y,0,-Zn.z,Zn.y,0,-hi.z,hi.y,jn.z,0,-jn.x,Zn.z,0,-Zn.x,hi.z,0,-hi.x,-jn.y,jn.x,0,-Zn.y,Zn.x,0,-hi.y,hi.x,0];return!To(e,Pi,Ui,Di,ir)||(e=[1,0,0,0,1,0,0,0,1],!To(e,Pi,Ui,Di,ir))?!1:(sr.crossVectors(jn,Zn),e=[sr.x,sr.y,sr.z],To(e,Pi,Ui,Di,ir))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,fn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(fn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Dn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Dn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Dn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Dn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Dn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Dn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Dn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Dn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Dn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Dn=[new k,new k,new k,new k,new k,new k,new k,new k],fn=new k,nr=new js,Pi=new k,Ui=new k,Di=new k,jn=new k,Zn=new k,hi=new k,ms=new k,ir=new k,sr=new k,di=new k;function To(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){di.fromArray(s,r);const o=i.x*Math.abs(di.x)+i.y*Math.abs(di.y)+i.z*Math.abs(di.z),l=t.dot(di),c=e.dot(di),h=n.dot(di);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const ep=new js,gs=new k,Eo=new k;class fo{constructor(t=new k,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):ep.setFromPoints(t).getCenter(n);let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;gs.subVectors(t,this.center);const e=gs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(gs,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Eo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(gs.copy(t.center).add(Eo)),this.expandByPoint(gs.copy(t.center).sub(Eo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const In=new k,Ao=new k,rr=new k,Kn=new k,Ro=new k,or=new k,Co=new k;class Rl{constructor(t=new k,e=new k(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,In)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=In.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(In.copy(this.origin).addScaledVector(this.direction,e),In.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Ao.copy(t).add(e).multiplyScalar(.5),rr.copy(e).sub(t).normalize(),Kn.copy(this.origin).sub(Ao);const r=t.distanceTo(e)*.5,a=-this.direction.dot(rr),o=Kn.dot(this.direction),l=-Kn.dot(rr),c=Kn.lengthSq(),h=Math.abs(1-a*a);let d,u,f,g;if(h>0)if(d=a*l-o,u=a*o-l,g=r*h,d>=0)if(u>=-g)if(u<=g){const _=1/h;d*=_,u*=_,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(Ao).addScaledVector(rr,u),f}intersectSphere(t,e){In.subVectors(t.center,this.origin);const n=In.dot(this.direction),i=In.dot(In)-n*n,r=t.radius*t.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,i=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,i=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),d>=0?(o=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,In)!==null}intersectTriangle(t,e,n,i,r){Ro.subVectors(e,t),or.subVectors(n,t),Co.crossVectors(Ro,or);let a=this.direction.dot(Co),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Kn.subVectors(this.origin,t);const l=o*this.direction.dot(or.crossVectors(Kn,or));if(l<0)return null;const c=o*this.direction.dot(Ro.cross(Kn));if(c<0||l+c>a)return null;const h=-o*Kn.dot(Co);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ve{constructor(t,e,n,i,r,a,o,l,c,h,d,u,f,g,_,m){ve.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c,h,d,u,f,g,_,m)}set(t,e,n,i,r,a,o,l,c,h,d,u,f,g,_,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ve().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Ii.setFromMatrixColumn(t,0).length(),r=1/Ii.setFromMatrixColumn(t,1).length(),a=1/Ii.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const u=a*h,f=a*d,g=o*h,_=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+g*c,e[5]=u-_*c,e[9]=-o*l,e[2]=_-u*c,e[6]=g+f*c,e[10]=a*l}else if(t.order==="YXZ"){const u=l*h,f=l*d,g=c*h,_=c*d;e[0]=u+_*o,e[4]=g*o-f,e[8]=a*c,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=f*o-g,e[6]=_+u*o,e[10]=a*l}else if(t.order==="ZXY"){const u=l*h,f=l*d,g=c*h,_=c*d;e[0]=u-_*o,e[4]=-a*d,e[8]=g+f*o,e[1]=f+g*o,e[5]=a*h,e[9]=_-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const u=a*h,f=a*d,g=o*h,_=o*d;e[0]=l*h,e[4]=g*c-f,e[8]=u*c+_,e[1]=l*d,e[5]=_*c+u,e[9]=f*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const u=a*l,f=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=_-u*d,e[8]=g*d+f,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*d+g,e[10]=u-_*d}else if(t.order==="XZY"){const u=a*l,f=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+_,e[5]=a*h,e[9]=f*d-g,e[2]=g*d-f,e[6]=o*h,e[10]=_*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(np,t,ip)}lookAt(t,e,n){const i=this.elements;return tn.subVectors(t,e),tn.lengthSq()===0&&(tn.z=1),tn.normalize(),Jn.crossVectors(n,tn),Jn.lengthSq()===0&&(Math.abs(n.z)===1?tn.x+=1e-4:tn.z+=1e-4,tn.normalize(),Jn.crossVectors(n,tn)),Jn.normalize(),ar.crossVectors(tn,Jn),i[0]=Jn.x,i[4]=ar.x,i[8]=tn.x,i[1]=Jn.y,i[5]=ar.y,i[9]=tn.y,i[2]=Jn.z,i[6]=ar.z,i[10]=tn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],y=n[3],v=n[7],x=n[11],E=n[15],S=i[0],A=i[4],R=i[8],b=i[12],M=i[1],C=i[5],I=i[9],N=i[13],G=i[2],X=i[6],q=i[10],et=i[14],$=i[3],pt=i[7],St=i[11],Lt=i[15];return r[0]=a*S+o*M+l*G+c*$,r[4]=a*A+o*C+l*X+c*pt,r[8]=a*R+o*I+l*q+c*St,r[12]=a*b+o*N+l*et+c*Lt,r[1]=h*S+d*M+u*G+f*$,r[5]=h*A+d*C+u*X+f*pt,r[9]=h*R+d*I+u*q+f*St,r[13]=h*b+d*N+u*et+f*Lt,r[2]=g*S+_*M+m*G+p*$,r[6]=g*A+_*C+m*X+p*pt,r[10]=g*R+_*I+m*q+p*St,r[14]=g*b+_*N+m*et+p*Lt,r[3]=y*S+v*M+x*G+E*$,r[7]=y*A+v*C+x*X+E*pt,r[11]=y*R+v*I+x*q+E*St,r[15]=y*b+v*N+x*et+E*Lt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+r*l*d-i*c*d-r*o*u+n*c*u+i*o*f-n*l*f)+_*(+e*l*f-e*c*u+r*a*u-i*a*f+i*c*h-r*l*h)+m*(+e*c*d-e*o*f-r*a*d+n*a*f+r*o*h-n*c*h)+p*(-i*o*h-e*l*d+e*o*u+i*a*d-n*a*u+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],g=t[12],_=t[13],m=t[14],p=t[15],y=d*m*c-_*u*c+_*l*f-o*m*f-d*l*p+o*u*p,v=g*u*c-h*m*c-g*l*f+a*m*f+h*l*p-a*u*p,x=h*_*c-g*d*c+g*o*f-a*_*f-h*o*p+a*d*p,E=g*d*l-h*_*l-g*o*u+a*_*u+h*o*m-a*d*m,S=e*y+n*v+i*x+r*E;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/S;return t[0]=y*A,t[1]=(_*u*r-d*m*r-_*i*f+n*m*f+d*i*p-n*u*p)*A,t[2]=(o*m*r-_*l*r+_*i*c-n*m*c-o*i*p+n*l*p)*A,t[3]=(d*l*r-o*u*r-d*i*c+n*u*c+o*i*f-n*l*f)*A,t[4]=v*A,t[5]=(h*m*r-g*u*r+g*i*f-e*m*f-h*i*p+e*u*p)*A,t[6]=(g*l*r-a*m*r-g*i*c+e*m*c+a*i*p-e*l*p)*A,t[7]=(a*u*r-h*l*r+h*i*c-e*u*c-a*i*f+e*l*f)*A,t[8]=x*A,t[9]=(g*d*r-h*_*r-g*n*f+e*_*f+h*n*p-e*d*p)*A,t[10]=(a*_*r-g*o*r+g*n*c-e*_*c-a*n*p+e*o*p)*A,t[11]=(h*o*r-a*d*r-h*n*c+e*d*c+a*n*f-e*o*f)*A,t[12]=E*A,t[13]=(h*_*i-g*d*i+g*n*u-e*_*u-h*n*m+e*d*m)*A,t[14]=(g*o*i-a*_*i-g*n*l+e*_*l+a*n*m-e*o*m)*A,t[15]=(a*d*i-h*o*i+h*n*l-e*d*l-a*n*u+e*o*u)*A,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,d=o+o,u=r*c,f=r*h,g=r*d,_=a*h,m=a*d,p=o*d,y=l*c,v=l*h,x=l*d,E=n.x,S=n.y,A=n.z;return i[0]=(1-(_+p))*E,i[1]=(f+x)*E,i[2]=(g-v)*E,i[3]=0,i[4]=(f-x)*S,i[5]=(1-(u+p))*S,i[6]=(m+y)*S,i[7]=0,i[8]=(g+v)*A,i[9]=(m-y)*A,i[10]=(1-(u+_))*A,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=Ii.set(i[0],i[1],i[2]).length();const a=Ii.set(i[4],i[5],i[6]).length(),o=Ii.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],pn.copy(this);const c=1/r,h=1/a,d=1/o;return pn.elements[0]*=c,pn.elements[1]*=c,pn.elements[2]*=c,pn.elements[4]*=h,pn.elements[5]*=h,pn.elements[6]*=h,pn.elements[8]*=d,pn.elements[9]*=d,pn.elements[10]*=d,e.setFromRotationMatrix(pn),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,i,r,a,o=Gn){const l=this.elements,c=2*r/(e-t),h=2*r/(n-i),d=(e+t)/(e-t),u=(n+i)/(n-i);let f,g;if(o===Gn)f=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===eo)f=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,r,a,o=Gn){const l=this.elements,c=1/(e-t),h=1/(n-i),d=1/(a-r),u=(e+t)*c,f=(n+i)*h;let g,_;if(o===Gn)g=(a+r)*d,_=-2*d;else if(o===eo)g=r*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ii=new k,pn=new ve,np=new k(0,0,0),ip=new k(1,1,1),Jn=new k,ar=new k,tn=new k,sc=new ve,rc=new Ys;class wn{constructor(t=0,e=0,n=0,i=wn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(He(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-He(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(He(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-He(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(He(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-He(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return sc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(sc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return rc.setFromEuler(this),this.setFromQuaternion(rc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}wn.DEFAULT_ORDER="XYZ";class Cl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let sp=0;const oc=new k,ki=new Ys,kn=new ve,lr=new k,_s=new k,rp=new k,op=new Ys,ac=new k(1,0,0),lc=new k(0,1,0),cc=new k(0,0,1),hc={type:"added"},ap={type:"removed"},Ni={type:"childadded",child:null},Lo={type:"childremoved",child:null};class Le extends hs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:sp++}),this.uuid=Vn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Le.DEFAULT_UP.clone();const t=new k,e=new wn,n=new Ys,i=new k(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ve},normalMatrix:{value:new Zt}}),this.matrix=new ve,this.matrixWorld=new ve,this.matrixAutoUpdate=Le.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Le.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Cl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ki.setFromAxisAngle(t,e),this.quaternion.multiply(ki),this}rotateOnWorldAxis(t,e){return ki.setFromAxisAngle(t,e),this.quaternion.premultiply(ki),this}rotateX(t){return this.rotateOnAxis(ac,t)}rotateY(t){return this.rotateOnAxis(lc,t)}rotateZ(t){return this.rotateOnAxis(cc,t)}translateOnAxis(t,e){return oc.copy(t).applyQuaternion(this.quaternion),this.position.add(oc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ac,t)}translateY(t){return this.translateOnAxis(lc,t)}translateZ(t){return this.translateOnAxis(cc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(kn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?lr.copy(t):lr.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),_s.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?kn.lookAt(_s,lr,this.up):kn.lookAt(lr,_s,this.up),this.quaternion.setFromRotationMatrix(kn),i&&(kn.extractRotation(i.matrixWorld),ki.setFromRotationMatrix(kn),this.quaternion.premultiply(ki.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(hc),Ni.child=t,this.dispatchEvent(Ni),Ni.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(ap),Lo.child=t,this.dispatchEvent(Lo),Lo.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),kn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),kn.multiply(t.parent.matrixWorld)),t.applyMatrix4(kn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(hc),Ni.child=t,this.dispatchEvent(Ni),Ni.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_s,t,rp),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_s,op,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),f=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}Le.DEFAULT_UP=new k(0,1,0);Le.DEFAULT_MATRIX_AUTO_UPDATE=!0;Le.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const mn=new k,Nn=new k,Po=new k,Fn=new k,Fi=new k,Oi=new k,dc=new k,Uo=new k,Do=new k,Io=new k,ko=new ge,No=new ge,Fo=new ge;class hn{constructor(t=new k,e=new k,n=new k){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),mn.subVectors(t,e),i.cross(mn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){mn.subVectors(i,e),Nn.subVectors(n,e),Po.subVectors(t,e);const a=mn.dot(mn),o=mn.dot(Nn),l=mn.dot(Po),c=Nn.dot(Nn),h=Nn.dot(Po),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;const u=1/d,f=(c*l-o*h)*u,g=(a*h-o*l)*u;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Fn)===null?!1:Fn.x>=0&&Fn.y>=0&&Fn.x+Fn.y<=1}static getInterpolation(t,e,n,i,r,a,o,l){return this.getBarycoord(t,e,n,i,Fn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Fn.x),l.addScaledVector(a,Fn.y),l.addScaledVector(o,Fn.z),l)}static getInterpolatedAttribute(t,e,n,i,r,a){return ko.setScalar(0),No.setScalar(0),Fo.setScalar(0),ko.fromBufferAttribute(t,e),No.fromBufferAttribute(t,n),Fo.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(ko,r.x),a.addScaledVector(No,r.y),a.addScaledVector(Fo,r.z),a}static isFrontFacing(t,e,n,i){return mn.subVectors(n,e),Nn.subVectors(t,e),mn.cross(Nn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return mn.subVectors(this.c,this.b),Nn.subVectors(this.a,this.b),mn.cross(Nn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return hn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return hn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return hn.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return hn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return hn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let a,o;Fi.subVectors(i,n),Oi.subVectors(r,n),Uo.subVectors(t,n);const l=Fi.dot(Uo),c=Oi.dot(Uo);if(l<=0&&c<=0)return e.copy(n);Do.subVectors(t,i);const h=Fi.dot(Do),d=Oi.dot(Do);if(h>=0&&d<=h)return e.copy(i);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(Fi,a);Io.subVectors(t,r);const f=Fi.dot(Io),g=Oi.dot(Io);if(g>=0&&f<=g)return e.copy(r);const _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(Oi,o);const m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return dc.subVectors(r,i),o=(d-h)/(d-h+(f-g)),e.copy(i).addScaledVector(dc,o);const p=1/(m+_+u);return a=_*p,o=u*p,e.copy(n).addScaledVector(Fi,a).addScaledVector(Oi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const id={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Qn={h:0,s:0,l:0},cr={h:0,s:0,l:0};function Oo(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class zt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ce){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ae.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=ae.workingColorSpace){return this.r=t,this.g=e,this.b=n,ae.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=ae.workingColorSpace){if(t=Xf(t,1),e=He(e,0,1),n=He(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Oo(a,r,t+1/3),this.g=Oo(a,r,t),this.b=Oo(a,r,t-1/3)}return ae.toWorkingColorSpace(this,i),this}setStyle(t,e=Ce){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ce){const n=id[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Wn(t.r),this.g=Wn(t.g),this.b=Wn(t.b),this}copyLinearToSRGB(t){return this.r=ts(t.r),this.g=ts(t.g),this.b=ts(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ce){return ae.fromWorkingColorSpace(Fe.copy(this),t),Math.round(He(Fe.r*255,0,255))*65536+Math.round(He(Fe.g*255,0,255))*256+Math.round(He(Fe.b*255,0,255))}getHexString(t=Ce){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ae.workingColorSpace){ae.fromWorkingColorSpace(Fe.copy(this),e);const n=Fe.r,i=Fe.g,r=Fe.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(i-r)/d+(i<r?6:0);break;case i:l=(r-n)/d+2;break;case r:l=(n-i)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ae.workingColorSpace){return ae.fromWorkingColorSpace(Fe.copy(this),e),t.r=Fe.r,t.g=Fe.g,t.b=Fe.b,t}getStyle(t=Ce){ae.fromWorkingColorSpace(Fe.copy(this),t);const e=Fe.r,n=Fe.g,i=Fe.b;return t!==Ce?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Qn),this.setHSL(Qn.h+t,Qn.s+e,Qn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Qn),t.getHSL(cr);const n=Mo(Qn.h,cr.h,e),i=Mo(Qn.s,cr.s,e),r=Mo(Qn.l,cr.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Fe=new zt;zt.NAMES=id;let lp=0;class li extends hs{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:lp++}),this.uuid=Vn(),this.name="",this.blending=Ji,this.side=ri,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Sa,this.blendDst=Ta,this.blendEquation=bi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new zt(0,0,0),this.blendAlpha=0,this.depthFunc=ns,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=jl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ci,this.stencilZFail=Ci,this.stencilZPass=Ci,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ji&&(n.blending=this.blending),this.side!==ri&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Sa&&(n.blendSrc=this.blendSrc),this.blendDst!==Ta&&(n.blendDst=this.blendDst),this.blendEquation!==bi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ns&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==jl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ci&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ci&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ci&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=i(t.textures),a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Re extends li{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wn,this.combine=co,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ae=new k,hr=new wt;class Ge{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ll,this.updateRanges=[],this.gpuType=Hn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)hr.fromBufferAttribute(this,e),hr.applyMatrix3(t),this.setXY(e,hr.x,hr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.applyMatrix3(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.applyMatrix4(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.applyNormalMatrix(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.transformDirection(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Cn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=me(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Cn(e,this.array)),e}setX(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Cn(e,this.array)),e}setY(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Cn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Cn(e,this.array)),e}setW(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=me(e,this.array),n=me(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=me(e,this.array),n=me(n,this.array),i=me(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=me(e,this.array),n=me(n,this.array),i=me(i,this.array),r=me(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ll&&(t.usage=this.usage),t}}class sd extends Ge{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class rd extends Ge{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class le extends Ge{constructor(t,e,n){super(new Float32Array(t),e,n)}}let cp=0;const an=new ve,zo=new Le,zi=new k,en=new js,xs=new js,De=new k;class Te extends hs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:cp++}),this.uuid=Vn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(td(t)?rd:sd)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Zt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return an.makeRotationFromQuaternion(t),this.applyMatrix4(an),this}rotateX(t){return an.makeRotationX(t),this.applyMatrix4(an),this}rotateY(t){return an.makeRotationY(t),this.applyMatrix4(an),this}rotateZ(t){return an.makeRotationZ(t),this.applyMatrix4(an),this}translate(t,e,n){return an.makeTranslation(t,e,n),this.applyMatrix4(an),this}scale(t,e,n){return an.makeScale(t,e,n),this.applyMatrix4(an),this}lookAt(t){return zo.lookAt(t),zo.updateMatrix(),this.applyMatrix4(zo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(zi).negate(),this.translate(zi.x,zi.y,zi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,r=t.length;i<r;i++){const a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new le(n,3))}else{for(let n=0,i=e.count;n<i;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new js);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];en.setFromBufferAttribute(r),this.morphTargetsRelative?(De.addVectors(this.boundingBox.min,en.min),this.boundingBox.expandByPoint(De),De.addVectors(this.boundingBox.max,en.max),this.boundingBox.expandByPoint(De)):(this.boundingBox.expandByPoint(en.min),this.boundingBox.expandByPoint(en.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fo);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(t){const n=this.boundingSphere.center;if(en.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];xs.setFromBufferAttribute(o),this.morphTargetsRelative?(De.addVectors(en.min,xs.min),en.expandByPoint(De),De.addVectors(en.max,xs.max),en.expandByPoint(De)):(en.expandByPoint(xs.min),en.expandByPoint(xs.max))}en.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)De.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(De));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)De.fromBufferAttribute(o,c),l&&(zi.fromBufferAttribute(t,c),De.add(zi)),i=Math.max(i,n.distanceToSquared(De))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ge(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let R=0;R<n.count;R++)o[R]=new k,l[R]=new k;const c=new k,h=new k,d=new k,u=new wt,f=new wt,g=new wt,_=new k,m=new k;function p(R,b,M){c.fromBufferAttribute(n,R),h.fromBufferAttribute(n,b),d.fromBufferAttribute(n,M),u.fromBufferAttribute(r,R),f.fromBufferAttribute(r,b),g.fromBufferAttribute(r,M),h.sub(c),d.sub(c),f.sub(u),g.sub(u);const C=1/(f.x*g.y-g.x*f.y);isFinite(C)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(C),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(C),o[R].add(_),o[b].add(_),o[M].add(_),l[R].add(m),l[b].add(m),l[M].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let R=0,b=y.length;R<b;++R){const M=y[R],C=M.start,I=M.count;for(let N=C,G=C+I;N<G;N+=3)p(t.getX(N+0),t.getX(N+1),t.getX(N+2))}const v=new k,x=new k,E=new k,S=new k;function A(R){E.fromBufferAttribute(i,R),S.copy(E);const b=o[R];v.copy(b),v.sub(E.multiplyScalar(E.dot(b))).normalize(),x.crossVectors(S,b);const C=x.dot(l[R])<0?-1:1;a.setXYZW(R,v.x,v.y,v.z,C)}for(let R=0,b=y.length;R<b;++R){const M=y[R],C=M.start,I=M.count;for(let N=C,G=C+I;N<G;N+=3)A(t.getX(N+0)),A(t.getX(N+1)),A(t.getX(N+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ge(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const i=new k,r=new k,a=new k,o=new k,l=new k,c=new k,h=new k,d=new k;if(t)for(let u=0,f=t.count;u<f;u+=3){const g=t.getX(u+0),_=t.getX(u+1),m=t.getX(u+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,m),h.subVectors(a,r),d.subVectors(i,r),h.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)i.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),d.subVectors(i,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)De.fromBufferAttribute(t,e),De.normalize(),t.setXYZ(e,De.x,De.y,De.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h);let f=0,g=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*h;for(let p=0;p<h;p++)u[g++]=c[f++]}return new Ge(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Te,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){const u=c[h],f=t(u,n);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const uc=new ve,ui=new Rl,dr=new fo,fc=new k,ur=new k,fr=new k,pr=new k,Bo=new k,mr=new k,pc=new k,gr=new k;class Z extends Le{constructor(t=new Te,e=new Re){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const o=this.morphTargetInfluences;if(r&&o){mr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],d=r[l];h!==0&&(Bo.fromBufferAttribute(d,t),a?mr.addScaledVector(Bo,h):mr.addScaledVector(Bo.sub(e),h))}e.add(mr)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),dr.copy(n.boundingSphere),dr.applyMatrix4(r),ui.copy(t.ray).recast(t.near),!(dr.containsPoint(ui.origin)===!1&&(ui.intersectSphere(dr,fc)===null||ui.origin.distanceToSquared(fc)>(t.far-t.near)**2))&&(uc.copy(r).invert(),ui.copy(t.ray).applyMatrix4(uc),!(n.boundingBox!==null&&ui.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ui)))}_computeIntersections(t,e,n){let i;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){const m=u[g],p=a[m.materialIndex],y=Math.max(m.start,f.start),v=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let x=y,E=v;x<E;x+=3){const S=o.getX(x),A=o.getX(x+1),R=o.getX(x+2);i=_r(this,p,t,n,c,h,d,S,A,R),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const y=o.getX(m),v=o.getX(m+1),x=o.getX(m+2);i=_r(this,a,t,n,c,h,d,y,v,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){const m=u[g],p=a[m.materialIndex],y=Math.max(m.start,f.start),v=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let x=y,E=v;x<E;x+=3){const S=x,A=x+1,R=x+2;i=_r(this,p,t,n,c,h,d,S,A,R),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const y=m,v=m+1,x=m+2;i=_r(this,a,t,n,c,h,d,y,v,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}}function hp(s,t,e,n,i,r,a,o){let l;if(t.side===Je?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,t.side===ri,o),l===null)return null;gr.copy(o),gr.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(gr);return c<e.near||c>e.far?null:{distance:c,point:gr.clone(),object:s}}function _r(s,t,e,n,i,r,a,o,l,c){s.getVertexPosition(o,ur),s.getVertexPosition(l,fr),s.getVertexPosition(c,pr);const h=hp(s,t,e,n,ur,fr,pr,pc);if(h){const d=new k;hn.getBarycoord(pc,ur,fr,pr,d),i&&(h.uv=hn.getInterpolatedAttribute(i,o,l,c,d,new wt)),r&&(h.uv1=hn.getInterpolatedAttribute(r,o,l,c,d,new wt)),a&&(h.normal=hn.getInterpolatedAttribute(a,o,l,c,d,new k),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new k,materialIndex:0};hn.getNormal(ur,fr,pr,u.normal),h.face=u,h.barycoord=d}return h}class fe extends Te{constructor(t=1,e=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],d=[];let u=0,f=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,i,a,2),g("x","z","y",1,-1,t,n,-e,i,a,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new le(c,3)),this.setAttribute("normal",new le(h,3)),this.setAttribute("uv",new le(d,2));function g(_,m,p,y,v,x,E,S,A,R,b){const M=x/A,C=E/R,I=x/2,N=E/2,G=S/2,X=A+1,q=R+1;let et=0,$=0;const pt=new k;for(let St=0;St<q;St++){const Lt=St*C-N;for(let Vt=0;Vt<X;Vt++){const re=Vt*M-I;pt[_]=re*y,pt[m]=Lt*v,pt[p]=G,c.push(pt.x,pt.y,pt.z),pt[_]=0,pt[m]=0,pt[p]=S>0?1:-1,h.push(pt.x,pt.y,pt.z),d.push(Vt/A),d.push(1-St/R),et+=1}}for(let St=0;St<R;St++)for(let Lt=0;Lt<A;Lt++){const Vt=u+Lt+X*St,re=u+Lt+X*(St+1),K=u+(Lt+1)+X*(St+1),lt=u+(Lt+1)+X*St;l.push(Vt,re,lt),l.push(re,K,lt),$+=6}o.addGroup(f,$,b),f+=$,u+=et}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fe(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function as(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Ze(s){const t={};for(let e=0;e<s.length;e++){const n=as(s[e]);for(const i in n)t[i]=n[i]}return t}function dp(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function od(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ae.workingColorSpace}const up={clone:as,merge:Ze};var fp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,pp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class oi extends li{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=fp,this.fragmentShader=pp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=as(t.uniforms),this.uniformsGroups=dp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class ad extends Le{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ve,this.projectionMatrix=new ve,this.projectionMatrixInverse=new ve,this.coordinateSystem=Gn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ti=new k,mc=new wt,gc=new wt;class nn extends ad{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=cl*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(bo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return cl*2*Math.atan(Math.tan(bo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ti.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ti.x,ti.y).multiplyScalar(-t/ti.z),ti.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ti.x,ti.y).multiplyScalar(-t/ti.z)}getViewSize(t,e){return this.getViewBounds(t,mc,gc),e.subVectors(gc,mc)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(bo*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,e-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Bi=-90,Hi=1;class mp extends Le{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new nn(Bi,Hi,t,e);i.layers=this.layers,this.add(i);const r=new nn(Bi,Hi,t,e);r.layers=this.layers,this.add(r);const a=new nn(Bi,Hi,t,e);a.layers=this.layers,this.add(a);const o=new nn(Bi,Hi,t,e);o.layers=this.layers,this.add(o);const l=new nn(Bi,Hi,t,e);l.layers=this.layers,this.add(l);const c=new nn(Bi,Hi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===Gn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===eo)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,a),t.setRenderTarget(n,2,i),t.render(e,o),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class ld extends We{constructor(t,e,n,i,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:is,super(t,e,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class gp extends Ti{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new ld(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Ve}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new fe(5,5,5),r=new oi({name:"CubemapFromEquirect",uniforms:as(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Je,blending:ii});r.uniforms.tEquirect.value=e;const a=new Z(i,r),o=e.minFilter;return e.minFilter===vn&&(e.minFilter=Ve),new mp(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,i){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(r)}}const Ho=new k,_p=new k,xp=new Zt;class gi{constructor(t=new k(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Ho.subVectors(n,e).cross(_p.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Ho),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||xp.getNormalMatrix(t),i=this.coplanarPoint(Ho).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const fi=new fo,xr=new k;class Ll{constructor(t=new gi,e=new gi,n=new gi,i=new gi,r=new gi,a=new gi){this.planes=[t,e,n,i,r,a]}set(t,e,n,i,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Gn){const n=this.planes,i=t.elements,r=i[0],a=i[1],o=i[2],l=i[3],c=i[4],h=i[5],d=i[6],u=i[7],f=i[8],g=i[9],_=i[10],m=i[11],p=i[12],y=i[13],v=i[14],x=i[15];if(n[0].setComponents(l-r,u-c,m-f,x-p).normalize(),n[1].setComponents(l+r,u+c,m+f,x+p).normalize(),n[2].setComponents(l+a,u+h,m+g,x+y).normalize(),n[3].setComponents(l-a,u-h,m-g,x-y).normalize(),n[4].setComponents(l-o,u-d,m-_,x-v).normalize(),e===Gn)n[5].setComponents(l+o,u+d,m+_,x+v).normalize();else if(e===eo)n[5].setComponents(o,d,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),fi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),fi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(fi)}intersectsSprite(t){return fi.center.set(0,0,0),fi.radius=.7071067811865476,fi.applyMatrix4(t.matrixWorld),this.intersectsSphere(fi)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(xr.x=i.normal.x>0?t.max.x:t.min.x,xr.y=i.normal.y>0?t.max.y:t.min.y,xr.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(xr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function cd(){let s=null,t=!1,e=null,n=null;function i(r,a){e(r,a),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function vp(s){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,d=c.byteLength,u=s.createBuffer();s.bindBuffer(l,u),s.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const h=l.array,d=l.updateRanges;if(s.bindBuffer(c,o),d.length===0)s.bufferSubData(c,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){const g=d[u],_=d[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++u,d[u]=_)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){const _=d[f];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}class Ot extends Te{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,d=t/o,u=e/l,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const y=p*u-a;for(let v=0;v<c;v++){const x=v*d-r;g.push(x,-y,0),_.push(0,0,1),m.push(v/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<o;y++){const v=y+c*p,x=y+c*(p+1),E=y+1+c*(p+1),S=y+1+c*p;f.push(v,x,S),f.push(x,E,S)}this.setIndex(f),this.setAttribute("position",new le(g,3)),this.setAttribute("normal",new le(_,3)),this.setAttribute("uv",new le(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ot(t.width,t.height,t.widthSegments,t.heightSegments)}}var bp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Mp=`#ifdef USE_ALPHAHASH
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
#endif`,wp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,yp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Sp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Tp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ep=`#ifdef USE_AOMAP
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
#endif`,Ap=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Rp=`#ifdef USE_BATCHING
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
#endif`,Cp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Lp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Pp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Up=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Dp=`#ifdef USE_IRIDESCENCE
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
#endif`,Ip=`#ifdef USE_BUMPMAP
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
#endif`,kp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Np=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Fp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Op=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,zp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Bp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Hp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Gp=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Vp=`#define PI 3.141592653589793
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
} // validated`,Wp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Xp=`vec3 transformedNormal = objectNormal;
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
#endif`,qp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,$p=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Yp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,jp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Zp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Kp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Jp=`#ifdef USE_ENVMAP
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
#endif`,Qp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,tm=`#ifdef USE_ENVMAP
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
#endif`,em=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,nm=`#ifdef USE_ENVMAP
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
#endif`,im=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,sm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,rm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,om=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,am=`#ifdef USE_GRADIENTMAP
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
}`,lm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,cm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,hm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,dm=`uniform bool receiveShadow;
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
#endif`,um=`#ifdef USE_ENVMAP
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
#endif`,fm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,pm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,mm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,gm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,_m=`PhysicalMaterial material;
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
#endif`,xm=`struct PhysicalMaterial {
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
}`,vm=`
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
#endif`,bm=`#if defined( RE_IndirectDiffuse )
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
#endif`,Mm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,wm=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ym=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tm=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Em=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Am=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Rm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Cm=`#if defined( USE_POINTS_UV )
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
#endif`,Lm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Pm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Um=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Dm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Im=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,km=`#ifdef USE_MORPHTARGETS
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
#endif`,Nm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Fm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Om=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,zm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Gm=`#ifdef USE_NORMALMAP
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
#endif`,Vm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Wm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Xm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,qm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$m=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ym=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,jm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Zm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Km=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Jm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Qm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,tg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,eg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ng=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ig=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,sg=`float getShadowMask() {
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
}`,rg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,og=`#ifdef USE_SKINNING
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
#endif`,ag=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,lg=`#ifdef USE_SKINNING
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
#endif`,cg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,hg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,dg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ug=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,fg=`#ifdef USE_TRANSMISSION
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
#endif`,pg=`#ifdef USE_TRANSMISSION
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
#endif`,mg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,gg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_g=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const vg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,bg=`uniform sampler2D t2D;
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
}`,Mg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,yg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Sg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tg=`#include <common>
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
}`,Eg=`#if DEPTH_PACKING == 3200
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
}`,Ag=`#define DISTANCE
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
}`,Rg=`#define DISTANCE
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
}`,Cg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Lg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pg=`uniform float scale;
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
}`,Ug=`uniform vec3 diffuse;
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
}`,Dg=`#include <common>
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
}`,Ig=`uniform vec3 diffuse;
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
}`,kg=`#define LAMBERT
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
}`,Ng=`#define LAMBERT
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
}`,Fg=`#define MATCAP
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
}`,Og=`#define MATCAP
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
}`,zg=`#define NORMAL
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
}`,Bg=`#define NORMAL
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
}`,Hg=`#define PHONG
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
}`,Gg=`#define PHONG
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
}`,Vg=`#define STANDARD
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
}`,Wg=`#define STANDARD
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
}`,Xg=`#define TOON
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
}`,qg=`#define TOON
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
}`,$g=`uniform float size;
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
}`,Yg=`uniform vec3 diffuse;
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
}`,jg=`#include <common>
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
}`,Zg=`uniform vec3 color;
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
}`,Kg=`uniform float rotation;
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
}`,Jg=`uniform vec3 diffuse;
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
}`,Jt={alphahash_fragment:bp,alphahash_pars_fragment:Mp,alphamap_fragment:wp,alphamap_pars_fragment:yp,alphatest_fragment:Sp,alphatest_pars_fragment:Tp,aomap_fragment:Ep,aomap_pars_fragment:Ap,batching_pars_vertex:Rp,batching_vertex:Cp,begin_vertex:Lp,beginnormal_vertex:Pp,bsdfs:Up,iridescence_fragment:Dp,bumpmap_pars_fragment:Ip,clipping_planes_fragment:kp,clipping_planes_pars_fragment:Np,clipping_planes_pars_vertex:Fp,clipping_planes_vertex:Op,color_fragment:zp,color_pars_fragment:Bp,color_pars_vertex:Hp,color_vertex:Gp,common:Vp,cube_uv_reflection_fragment:Wp,defaultnormal_vertex:Xp,displacementmap_pars_vertex:qp,displacementmap_vertex:$p,emissivemap_fragment:Yp,emissivemap_pars_fragment:jp,colorspace_fragment:Zp,colorspace_pars_fragment:Kp,envmap_fragment:Jp,envmap_common_pars_fragment:Qp,envmap_pars_fragment:tm,envmap_pars_vertex:em,envmap_physical_pars_fragment:um,envmap_vertex:nm,fog_vertex:im,fog_pars_vertex:sm,fog_fragment:rm,fog_pars_fragment:om,gradientmap_pars_fragment:am,lightmap_pars_fragment:lm,lights_lambert_fragment:cm,lights_lambert_pars_fragment:hm,lights_pars_begin:dm,lights_toon_fragment:fm,lights_toon_pars_fragment:pm,lights_phong_fragment:mm,lights_phong_pars_fragment:gm,lights_physical_fragment:_m,lights_physical_pars_fragment:xm,lights_fragment_begin:vm,lights_fragment_maps:bm,lights_fragment_end:Mm,logdepthbuf_fragment:wm,logdepthbuf_pars_fragment:ym,logdepthbuf_pars_vertex:Sm,logdepthbuf_vertex:Tm,map_fragment:Em,map_pars_fragment:Am,map_particle_fragment:Rm,map_particle_pars_fragment:Cm,metalnessmap_fragment:Lm,metalnessmap_pars_fragment:Pm,morphinstance_vertex:Um,morphcolor_vertex:Dm,morphnormal_vertex:Im,morphtarget_pars_vertex:km,morphtarget_vertex:Nm,normal_fragment_begin:Fm,normal_fragment_maps:Om,normal_pars_fragment:zm,normal_pars_vertex:Bm,normal_vertex:Hm,normalmap_pars_fragment:Gm,clearcoat_normal_fragment_begin:Vm,clearcoat_normal_fragment_maps:Wm,clearcoat_pars_fragment:Xm,iridescence_pars_fragment:qm,opaque_fragment:$m,packing:Ym,premultiplied_alpha_fragment:jm,project_vertex:Zm,dithering_fragment:Km,dithering_pars_fragment:Jm,roughnessmap_fragment:Qm,roughnessmap_pars_fragment:tg,shadowmap_pars_fragment:eg,shadowmap_pars_vertex:ng,shadowmap_vertex:ig,shadowmask_pars_fragment:sg,skinbase_vertex:rg,skinning_pars_vertex:og,skinning_vertex:ag,skinnormal_vertex:lg,specularmap_fragment:cg,specularmap_pars_fragment:hg,tonemapping_fragment:dg,tonemapping_pars_fragment:ug,transmission_fragment:fg,transmission_pars_fragment:pg,uv_pars_fragment:mg,uv_pars_vertex:gg,uv_vertex:_g,worldpos_vertex:xg,background_vert:vg,background_frag:bg,backgroundCube_vert:Mg,backgroundCube_frag:wg,cube_vert:yg,cube_frag:Sg,depth_vert:Tg,depth_frag:Eg,distanceRGBA_vert:Ag,distanceRGBA_frag:Rg,equirect_vert:Cg,equirect_frag:Lg,linedashed_vert:Pg,linedashed_frag:Ug,meshbasic_vert:Dg,meshbasic_frag:Ig,meshlambert_vert:kg,meshlambert_frag:Ng,meshmatcap_vert:Fg,meshmatcap_frag:Og,meshnormal_vert:zg,meshnormal_frag:Bg,meshphong_vert:Hg,meshphong_frag:Gg,meshphysical_vert:Vg,meshphysical_frag:Wg,meshtoon_vert:Xg,meshtoon_frag:qg,points_vert:$g,points_frag:Yg,shadow_vert:jg,shadow_frag:Zg,sprite_vert:Kg,sprite_frag:Jg},xt={common:{diffuse:{value:new zt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Zt}},envmap:{envMap:{value:null},envMapRotation:{value:new Zt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Zt},normalScale:{value:new wt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new zt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new zt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0},uvTransform:{value:new Zt}},sprite:{diffuse:{value:new zt(16777215)},opacity:{value:1},center:{value:new wt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}}},Rn={basic:{uniforms:Ze([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.fog]),vertexShader:Jt.meshbasic_vert,fragmentShader:Jt.meshbasic_frag},lambert:{uniforms:Ze([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,xt.lights,{emissive:{value:new zt(0)}}]),vertexShader:Jt.meshlambert_vert,fragmentShader:Jt.meshlambert_frag},phong:{uniforms:Ze([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,xt.lights,{emissive:{value:new zt(0)},specular:{value:new zt(1118481)},shininess:{value:30}}]),vertexShader:Jt.meshphong_vert,fragmentShader:Jt.meshphong_frag},standard:{uniforms:Ze([xt.common,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.roughnessmap,xt.metalnessmap,xt.fog,xt.lights,{emissive:{value:new zt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag},toon:{uniforms:Ze([xt.common,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.gradientmap,xt.fog,xt.lights,{emissive:{value:new zt(0)}}]),vertexShader:Jt.meshtoon_vert,fragmentShader:Jt.meshtoon_frag},matcap:{uniforms:Ze([xt.common,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,{matcap:{value:null}}]),vertexShader:Jt.meshmatcap_vert,fragmentShader:Jt.meshmatcap_frag},points:{uniforms:Ze([xt.points,xt.fog]),vertexShader:Jt.points_vert,fragmentShader:Jt.points_frag},dashed:{uniforms:Ze([xt.common,xt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Jt.linedashed_vert,fragmentShader:Jt.linedashed_frag},depth:{uniforms:Ze([xt.common,xt.displacementmap]),vertexShader:Jt.depth_vert,fragmentShader:Jt.depth_frag},normal:{uniforms:Ze([xt.common,xt.bumpmap,xt.normalmap,xt.displacementmap,{opacity:{value:1}}]),vertexShader:Jt.meshnormal_vert,fragmentShader:Jt.meshnormal_frag},sprite:{uniforms:Ze([xt.sprite,xt.fog]),vertexShader:Jt.sprite_vert,fragmentShader:Jt.sprite_frag},background:{uniforms:{uvTransform:{value:new Zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Jt.background_vert,fragmentShader:Jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Zt}},vertexShader:Jt.backgroundCube_vert,fragmentShader:Jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Jt.cube_vert,fragmentShader:Jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Jt.equirect_vert,fragmentShader:Jt.equirect_frag},distanceRGBA:{uniforms:Ze([xt.common,xt.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Jt.distanceRGBA_vert,fragmentShader:Jt.distanceRGBA_frag},shadow:{uniforms:Ze([xt.lights,xt.fog,{color:{value:new zt(0)},opacity:{value:1}}]),vertexShader:Jt.shadow_vert,fragmentShader:Jt.shadow_frag}};Rn.physical={uniforms:Ze([Rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Zt},clearcoatNormalScale:{value:new wt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Zt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Zt},sheen:{value:0},sheenColor:{value:new zt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Zt},transmissionSamplerSize:{value:new wt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Zt},attenuationDistance:{value:0},attenuationColor:{value:new zt(0)},specularColor:{value:new zt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Zt},anisotropyVector:{value:new wt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Zt}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag};const vr={r:0,b:0,g:0},pi=new wn,Qg=new ve;function t0(s,t,e,n,i,r,a){const o=new zt(0);let l=r===!0?0:1,c,h,d=null,u=0,f=null;function g(y){let v=y.isScene===!0?y.background:null;return v&&v.isTexture&&(v=(y.backgroundBlurriness>0?e:t).get(v)),v}function _(y){let v=!1;const x=g(y);x===null?p(o,l):x&&x.isColor&&(p(x,1),v=!0);const E=s.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,a):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(y,v){const x=g(v);x&&(x.isCubeTexture||x.mapping===ho)?(h===void 0&&(h=new Z(new fe(1,1,1),new oi({name:"BackgroundCubeMaterial",uniforms:as(Rn.backgroundCube.uniforms),vertexShader:Rn.backgroundCube.vertexShader,fragmentShader:Rn.backgroundCube.fragmentShader,side:Je,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,S,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),pi.copy(v.backgroundRotation),pi.x*=-1,pi.y*=-1,pi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(pi.y*=-1,pi.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Qg.makeRotationFromEuler(pi)),h.material.toneMapped=ae.getTransfer(x.colorSpace)!==pe,(d!==x||u!==x.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,d=x,u=x.version,f=s.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new Z(new Ot(2,2),new oi({name:"BackgroundMaterial",uniforms:as(Rn.background.uniforms),vertexShader:Rn.background.vertexShader,fragmentShader:Rn.background.fragmentShader,side:ri,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=ae.getTransfer(x.colorSpace)!==pe,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(d!==x||u!==x.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,d=x,u=x.version,f=s.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function p(y,v){y.getRGB(vr,od(s)),n.buffers.color.setClear(vr.r,vr.g,vr.b,v,a)}return{getClearColor:function(){return o},setClearColor:function(y,v=1){o.set(y),l=v,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,p(o,l)},render:_,addToRenderList:m}}function e0(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=u(null);let r=i,a=!1;function o(M,C,I,N,G){let X=!1;const q=d(N,I,C);r!==q&&(r=q,c(r.object)),X=f(M,N,I,G),X&&g(M,N,I,G),G!==null&&t.update(G,s.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,x(M,C,I,N),G!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(G).buffer))}function l(){return s.createVertexArray()}function c(M){return s.bindVertexArray(M)}function h(M){return s.deleteVertexArray(M)}function d(M,C,I){const N=I.wireframe===!0;let G=n[M.id];G===void 0&&(G={},n[M.id]=G);let X=G[C.id];X===void 0&&(X={},G[C.id]=X);let q=X[N];return q===void 0&&(q=u(l()),X[N]=q),q}function u(M){const C=[],I=[],N=[];for(let G=0;G<e;G++)C[G]=0,I[G]=0,N[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:I,attributeDivisors:N,object:M,attributes:{},index:null}}function f(M,C,I,N){const G=r.attributes,X=C.attributes;let q=0;const et=I.getAttributes();for(const $ in et)if(et[$].location>=0){const St=G[$];let Lt=X[$];if(Lt===void 0&&($==="instanceMatrix"&&M.instanceMatrix&&(Lt=M.instanceMatrix),$==="instanceColor"&&M.instanceColor&&(Lt=M.instanceColor)),St===void 0||St.attribute!==Lt||Lt&&St.data!==Lt.data)return!0;q++}return r.attributesNum!==q||r.index!==N}function g(M,C,I,N){const G={},X=C.attributes;let q=0;const et=I.getAttributes();for(const $ in et)if(et[$].location>=0){let St=X[$];St===void 0&&($==="instanceMatrix"&&M.instanceMatrix&&(St=M.instanceMatrix),$==="instanceColor"&&M.instanceColor&&(St=M.instanceColor));const Lt={};Lt.attribute=St,St&&St.data&&(Lt.data=St.data),G[$]=Lt,q++}r.attributes=G,r.attributesNum=q,r.index=N}function _(){const M=r.newAttributes;for(let C=0,I=M.length;C<I;C++)M[C]=0}function m(M){p(M,0)}function p(M,C){const I=r.newAttributes,N=r.enabledAttributes,G=r.attributeDivisors;I[M]=1,N[M]===0&&(s.enableVertexAttribArray(M),N[M]=1),G[M]!==C&&(s.vertexAttribDivisor(M,C),G[M]=C)}function y(){const M=r.newAttributes,C=r.enabledAttributes;for(let I=0,N=C.length;I<N;I++)C[I]!==M[I]&&(s.disableVertexAttribArray(I),C[I]=0)}function v(M,C,I,N,G,X,q){q===!0?s.vertexAttribIPointer(M,C,I,G,X):s.vertexAttribPointer(M,C,I,N,G,X)}function x(M,C,I,N){_();const G=N.attributes,X=I.getAttributes(),q=C.defaultAttributeValues;for(const et in X){const $=X[et];if($.location>=0){let pt=G[et];if(pt===void 0&&(et==="instanceMatrix"&&M.instanceMatrix&&(pt=M.instanceMatrix),et==="instanceColor"&&M.instanceColor&&(pt=M.instanceColor)),pt!==void 0){const St=pt.normalized,Lt=pt.itemSize,Vt=t.get(pt);if(Vt===void 0)continue;const re=Vt.buffer,K=Vt.type,lt=Vt.bytesPerElement,At=K===s.INT||K===s.UNSIGNED_INT||pt.gpuType===Ml;if(pt.isInterleavedBufferAttribute){const mt=pt.data,It=mt.stride,Gt=pt.offset;if(mt.isInstancedInterleavedBuffer){for(let qt=0;qt<$.locationSize;qt++)p($.location+qt,mt.meshPerAttribute);M.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=mt.meshPerAttribute*mt.count)}else for(let qt=0;qt<$.locationSize;qt++)m($.location+qt);s.bindBuffer(s.ARRAY_BUFFER,re);for(let qt=0;qt<$.locationSize;qt++)v($.location+qt,Lt/$.locationSize,K,St,It*lt,(Gt+Lt/$.locationSize*qt)*lt,At)}else{if(pt.isInstancedBufferAttribute){for(let mt=0;mt<$.locationSize;mt++)p($.location+mt,pt.meshPerAttribute);M.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=pt.meshPerAttribute*pt.count)}else for(let mt=0;mt<$.locationSize;mt++)m($.location+mt);s.bindBuffer(s.ARRAY_BUFFER,re);for(let mt=0;mt<$.locationSize;mt++)v($.location+mt,Lt/$.locationSize,K,St,Lt*lt,Lt/$.locationSize*mt*lt,At)}}else if(q!==void 0){const St=q[et];if(St!==void 0)switch(St.length){case 2:s.vertexAttrib2fv($.location,St);break;case 3:s.vertexAttrib3fv($.location,St);break;case 4:s.vertexAttrib4fv($.location,St);break;default:s.vertexAttrib1fv($.location,St)}}}}y()}function E(){R();for(const M in n){const C=n[M];for(const I in C){const N=C[I];for(const G in N)h(N[G].object),delete N[G];delete C[I]}delete n[M]}}function S(M){if(n[M.id]===void 0)return;const C=n[M.id];for(const I in C){const N=C[I];for(const G in N)h(N[G].object),delete N[G];delete C[I]}delete n[M.id]}function A(M){for(const C in n){const I=n[C];if(I[M.id]===void 0)continue;const N=I[M.id];for(const G in N)h(N[G].object),delete N[G];delete I[M.id]}}function R(){b(),a=!0,r!==i&&(r=i,c(r.object))}function b(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:R,resetDefaultState:b,dispose:E,releaseStatesOfGeometry:S,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:m,disableUnusedAttributes:y}}function n0(s,t,e){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),e.update(h,n,1)}function a(c,h,d){d!==0&&(s.drawArraysInstanced(n,c,h,d),e.update(h,n,d))}function o(c,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let f=0;for(let g=0;g<d;g++)f+=h[g];e.update(f,n,1)}function l(c,h,d,u){if(d===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)a(c[g],h[g],u[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,u,0,d);let g=0;for(let _=0;_<d;_++)g+=h[_]*u[_];e.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function i0(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(A){return!(A!==bn&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const R=A===$s&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Xn&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Hn&&!R)}function l(A){if(A==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=e.logarithmicDepthBuffer===!0,u=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),y=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),v=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),E=g>0,S=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:y,maxVaryings:v,maxFragmentUniforms:x,vertexTextures:E,maxSamples:S}}function s0(s){const t=this;let e=null,n=0,i=!1,r=!1;const a=new gi,o=new Zt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||i;return i=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){const g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,p=s.get(d);if(!i||g===null||g.length===0||r&&!m)r?h(null):c();else{const y=r?0:n,v=y*4;let x=p.clippingState||null;l.value=x,x=h(g,u,v,f);for(let E=0;E!==v;++E)x[E]=e[E];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,g){const _=d!==null?d.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=f+_*4,y=u.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let v=0,x=f;v!==_;++v,x+=4)a.copy(d[v]).applyMatrix4(y,o),a.normal.toArray(m,x),m[x+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function r0(s){let t=new WeakMap;function e(a,o){return o===Da?a.mapping=is:o===Ia&&(a.mapping=ss),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Da||o===Ia)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new gp(l.height);return c.fromEquirectangularTexture(s,a),t.set(a,c),a.addEventListener("dispose",i),e(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class hd extends ad{constructor(t=-1,e=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const ji=4,_c=[.125,.215,.35,.446,.526,.582],Mi=20,Go=new hd,xc=new zt;let Vo=null,Wo=0,Xo=0,qo=!1;const _i=(1+Math.sqrt(5))/2,Gi=1/_i,vc=[new k(-_i,Gi,0),new k(_i,Gi,0),new k(-Gi,0,_i),new k(Gi,0,_i),new k(0,_i,-Gi),new k(0,_i,Gi),new k(-1,1,-1),new k(1,1,-1),new k(-1,1,1),new k(1,1,1)];class bc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Vo=this._renderer.getRenderTarget(),Wo=this._renderer.getActiveCubeFace(),Xo=this._renderer.getActiveMipmapLevel(),qo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Vo,Wo,Xo),this._renderer.xr.enabled=qo,t.scissorTest=!1,br(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===is||t.mapping===ss?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Vo=this._renderer.getRenderTarget(),Wo=this._renderer.getActiveCubeFace(),Xo=this._renderer.getActiveMipmapLevel(),qo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ve,minFilter:Ve,generateMipmaps:!1,type:$s,format:bn,colorSpace:cs,depthBuffer:!1},i=Mc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Mc(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=o0(r)),this._blurMaterial=a0(r,t,e)}return i}_compileMaterial(t){const e=new Z(this._lodPlanes[0],t);this._renderer.compile(e,Go)}_sceneToCubeUV(t,e,n,i){const o=new nn(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(xc),h.toneMapping=si,h.autoClear=!1;const f=new Re({name:"PMREM.Background",side:Je,depthWrite:!1,depthTest:!1}),g=new Z(new fe,f);let _=!1;const m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,_=!0):(f.color.copy(xc),_=!0);for(let p=0;p<6;p++){const y=p%3;y===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):y===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));const v=this._cubeSize;br(i,y*v,p>2?v:0,v,v),h.setRenderTarget(i),_&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=d,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===is||t.mapping===ss;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=yc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wc());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new Z(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;br(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Go)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=vc[(i-r-1)%vc.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,i,"latitudinal",r),this._halfBlur(a,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new Z(this._lodPlanes[i],c),u=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Mi-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):Mi;m>Mi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Mi}`);const p=[];let y=0;for(let A=0;A<Mi;++A){const R=A/_,b=Math.exp(-R*R/2);p.push(b),A===0?y+=b:A<m&&(y+=2*b)}for(let A=0;A<p.length;A++)p[A]=p[A]/y;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:v}=this;u.dTheta.value=g,u.mipInt.value=v-n;const x=this._sizeLods[i],E=3*x*(i>v-ji?i-v+ji:0),S=4*(this._cubeSize-x);br(e,E,S,3*x,2*x),l.setRenderTarget(e),l.render(d,Go)}}function o0(s){const t=[],e=[],n=[];let i=s;const r=s-ji+1+_c.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);e.push(o);let l=1/o;a>s-ji?l=_c[a-s+ji-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,_=3,m=2,p=1,y=new Float32Array(_*g*f),v=new Float32Array(m*g*f),x=new Float32Array(p*g*f);for(let S=0;S<f;S++){const A=S%3*2/3-1,R=S>2?0:-1,b=[A,R,0,A+2/3,R,0,A+2/3,R+1,0,A,R,0,A+2/3,R+1,0,A,R+1,0];y.set(b,_*g*S),v.set(u,m*g*S);const M=[S,S,S,S,S,S];x.set(M,p*g*S)}const E=new Te;E.setAttribute("position",new Ge(y,_)),E.setAttribute("uv",new Ge(v,m)),E.setAttribute("faceIndex",new Ge(x,p)),t.push(E),i>ji&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Mc(s,t,e){const n=new Ti(s,t,e);return n.texture.mapping=ho,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function br(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function a0(s,t,e){const n=new Float32Array(Mi),i=new k(0,1,0);return new oi({name:"SphericalGaussianBlur",defines:{n:Mi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Pl(),fragmentShader:`

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
		`,blending:ii,depthTest:!1,depthWrite:!1})}function wc(){return new oi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Pl(),fragmentShader:`

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
		`,blending:ii,depthTest:!1,depthWrite:!1})}function yc(){return new oi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Pl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function Pl(){return`

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
	`}function l0(s){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Da||l===Ia,h=l===is||l===ss;if(c||h){let d=t.get(o);const u=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return e===null&&(e=new bc(s)),d=c?e.fromEquirectangular(o,d):e.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{const f=o.image;return c&&f&&f.height>0||h&&f&&i(f)?(e===null&&(e=new bc(s)),d=c?e.fromEquirectangular(o):e.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function i(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function c0(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&Cs("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function h0(s,t,e,n){const i={},r=new WeakMap;function a(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const g in u.attributes)t.remove(u.attributes[g]);for(const g in u.morphAttributes){const _=u.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)t.remove(_[m])}u.removeEventListener("dispose",a),delete i[u.id];const f=r.get(u);f&&(t.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(d,u){return i[u.id]===!0||(u.addEventListener("dispose",a),i[u.id]=!0,e.memory.geometries++),u}function l(d){const u=d.attributes;for(const g in u)t.update(u[g],s.ARRAY_BUFFER);const f=d.morphAttributes;for(const g in f){const _=f[g];for(let m=0,p=_.length;m<p;m++)t.update(_[m],s.ARRAY_BUFFER)}}function c(d){const u=[],f=d.index,g=d.attributes.position;let _=0;if(f!==null){const y=f.array;_=f.version;for(let v=0,x=y.length;v<x;v+=3){const E=y[v+0],S=y[v+1],A=y[v+2];u.push(E,S,S,A,A,E)}}else if(g!==void 0){const y=g.array;_=g.version;for(let v=0,x=y.length/3-1;v<x;v+=3){const E=v+0,S=v+1,A=v+2;u.push(E,S,S,A,A,E)}}else return;const m=new(td(u)?rd:sd)(u,1);m.version=_;const p=r.get(d);p&&t.remove(p),r.set(d,m)}function h(d){const u=r.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function d0(s,t,e){let n;function i(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,f){s.drawElements(n,f,r,u*a),e.update(f,n,1)}function c(u,f,g){g!==0&&(s.drawElementsInstanced(n,f,r,u*a,g),e.update(f,n,g))}function h(u,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function d(u,f,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<u.length;p++)c(u[p]/a,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,u,0,_,0,g);let p=0;for(let y=0;y<g;y++)p+=f[y]*_[y];e.update(p,n,1)}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function u0(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function f0(s,t,e){const n=new WeakMap,i=new ge;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==d){let b=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",b)};u!==void 0&&u.texture.dispose();const f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let v=0;f===!0&&(v=1),g===!0&&(v=2),_===!0&&(v=3);let x=o.attributes.position.count*v,E=1;x>t.maxTextureSize&&(E=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);const S=new Float32Array(x*E*4*d),A=new nd(S,x,E,d);A.type=Hn,A.needsUpdate=!0;const R=v*4;for(let M=0;M<d;M++){const C=m[M],I=p[M],N=y[M],G=x*E*4*M;for(let X=0;X<C.count;X++){const q=X*R;f===!0&&(i.fromBufferAttribute(C,X),S[G+q+0]=i.x,S[G+q+1]=i.y,S[G+q+2]=i.z,S[G+q+3]=0),g===!0&&(i.fromBufferAttribute(I,X),S[G+q+4]=i.x,S[G+q+5]=i.y,S[G+q+6]=i.z,S[G+q+7]=0),_===!0&&(i.fromBufferAttribute(N,X),S[G+q+8]=i.x,S[G+q+9]=i.y,S[G+q+10]=i.z,S[G+q+11]=N.itemSize===4?i.w:1)}}u={count:d,texture:A,size:new wt(x,E)},n.set(o,u),o.addEventListener("dispose",b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];const g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",g),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function p0(s,t,e,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,d=t.get(l,h);if(i.get(d)!==c&&(t.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;i.get(u)!==c&&(u.update(),i.set(u,c))}return d}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}class dd extends We{constructor(t,e,n,i,r,a,o,l,c,h=Qi){if(h!==Qi&&h!==os)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Qi&&(n=Si),n===void 0&&h===os&&(n=rs),super(null,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Mn,this.minFilter=l!==void 0?l:Mn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const ud=new We,Sc=new dd(1,1),fd=new nd,pd=new tp,md=new ld,Tc=[],Ec=[],Ac=new Float32Array(16),Rc=new Float32Array(9),Cc=new Float32Array(4);function ds(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=Tc[i];if(r===void 0&&(r=new Float32Array(i),Tc[i]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function Pe(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Ue(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function po(s,t){let e=Ec[t];e===void 0&&(e=new Int32Array(t),Ec[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function m0(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function g0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;s.uniform2fv(this.addr,t),Ue(e,t)}}function _0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Pe(e,t))return;s.uniform3fv(this.addr,t),Ue(e,t)}}function x0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;s.uniform4fv(this.addr,t),Ue(e,t)}}function v0(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Pe(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Ue(e,t)}else{if(Pe(e,n))return;Cc.set(n),s.uniformMatrix2fv(this.addr,!1,Cc),Ue(e,n)}}function b0(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Pe(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Ue(e,t)}else{if(Pe(e,n))return;Rc.set(n),s.uniformMatrix3fv(this.addr,!1,Rc),Ue(e,n)}}function M0(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Pe(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Ue(e,t)}else{if(Pe(e,n))return;Ac.set(n),s.uniformMatrix4fv(this.addr,!1,Ac),Ue(e,n)}}function w0(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function y0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;s.uniform2iv(this.addr,t),Ue(e,t)}}function S0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Pe(e,t))return;s.uniform3iv(this.addr,t),Ue(e,t)}}function T0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;s.uniform4iv(this.addr,t),Ue(e,t)}}function E0(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function A0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;s.uniform2uiv(this.addr,t),Ue(e,t)}}function R0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Pe(e,t))return;s.uniform3uiv(this.addr,t),Ue(e,t)}}function C0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;s.uniform4uiv(this.addr,t),Ue(e,t)}}function L0(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Sc.compareFunction=Qh,r=Sc):r=ud,e.setTexture2D(t||r,i)}function P0(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||pd,i)}function U0(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||md,i)}function D0(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||fd,i)}function I0(s){switch(s){case 5126:return m0;case 35664:return g0;case 35665:return _0;case 35666:return x0;case 35674:return v0;case 35675:return b0;case 35676:return M0;case 5124:case 35670:return w0;case 35667:case 35671:return y0;case 35668:case 35672:return S0;case 35669:case 35673:return T0;case 5125:return E0;case 36294:return A0;case 36295:return R0;case 36296:return C0;case 35678:case 36198:case 36298:case 36306:case 35682:return L0;case 35679:case 36299:case 36307:return P0;case 35680:case 36300:case 36308:case 36293:return U0;case 36289:case 36303:case 36311:case 36292:return D0}}function k0(s,t){s.uniform1fv(this.addr,t)}function N0(s,t){const e=ds(t,this.size,2);s.uniform2fv(this.addr,e)}function F0(s,t){const e=ds(t,this.size,3);s.uniform3fv(this.addr,e)}function O0(s,t){const e=ds(t,this.size,4);s.uniform4fv(this.addr,e)}function z0(s,t){const e=ds(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function B0(s,t){const e=ds(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function H0(s,t){const e=ds(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function G0(s,t){s.uniform1iv(this.addr,t)}function V0(s,t){s.uniform2iv(this.addr,t)}function W0(s,t){s.uniform3iv(this.addr,t)}function X0(s,t){s.uniform4iv(this.addr,t)}function q0(s,t){s.uniform1uiv(this.addr,t)}function $0(s,t){s.uniform2uiv(this.addr,t)}function Y0(s,t){s.uniform3uiv(this.addr,t)}function j0(s,t){s.uniform4uiv(this.addr,t)}function Z0(s,t,e){const n=this.cache,i=t.length,r=po(e,i);Pe(n,r)||(s.uniform1iv(this.addr,r),Ue(n,r));for(let a=0;a!==i;++a)e.setTexture2D(t[a]||ud,r[a])}function K0(s,t,e){const n=this.cache,i=t.length,r=po(e,i);Pe(n,r)||(s.uniform1iv(this.addr,r),Ue(n,r));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||pd,r[a])}function J0(s,t,e){const n=this.cache,i=t.length,r=po(e,i);Pe(n,r)||(s.uniform1iv(this.addr,r),Ue(n,r));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||md,r[a])}function Q0(s,t,e){const n=this.cache,i=t.length,r=po(e,i);Pe(n,r)||(s.uniform1iv(this.addr,r),Ue(n,r));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||fd,r[a])}function t_(s){switch(s){case 5126:return k0;case 35664:return N0;case 35665:return F0;case 35666:return O0;case 35674:return z0;case 35675:return B0;case 35676:return H0;case 5124:case 35670:return G0;case 35667:case 35671:return V0;case 35668:case 35672:return W0;case 35669:case 35673:return X0;case 5125:return q0;case 36294:return $0;case 36295:return Y0;case 36296:return j0;case 35678:case 36198:case 36298:case 36306:case 35682:return Z0;case 35679:case 36299:case 36307:return K0;case 35680:case 36300:case 36308:case 36293:return J0;case 36289:case 36303:case 36311:case 36292:return Q0}}class e_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=I0(e.type)}}class n_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=t_(e.type)}}class i_{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(t,e[o.id],n)}}}const $o=/(\w+)(\])?(\[|\.)?/g;function Lc(s,t){s.seq.push(t),s.map[t.id]=t}function s_(s,t,e){const n=s.name,i=n.length;for($o.lastIndex=0;;){const r=$o.exec(n),a=$o.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Lc(e,c===void 0?new e_(o,s,t):new n_(o,s,t));break}else{let d=e.map[o];d===void 0&&(d=new i_(o),Lc(e,d)),e=d}}}class Yr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),a=t.getUniformLocation(e,r.name);s_(r,a,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const a=t[i];a.id in e&&n.push(a)}return n}}function Pc(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const r_=37297;let o_=0;function a_(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Uc=new Zt;function l_(s){ae._getMatrix(Uc,ae.workingColorSpace,s);const t=`mat3( ${Uc.elements.map(e=>e.toFixed(4))} )`;switch(ae.getTransfer(s)){case uo:return[t,"LinearTransferOETF"];case pe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function Dc(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+a_(s.getShaderSource(t),a)}else return i}function c_(s,t){const e=l_(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function h_(s,t){let e;switch(t){case Af:e="Linear";break;case Rf:e="Reinhard";break;case Cf:e="Cineon";break;case Lf:e="ACESFilmic";break;case Uf:e="AgX";break;case Df:e="Neutral";break;case Pf:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Mr=new k;function d_(){ae.getLuminanceCoefficients(Mr);const s=Mr.x.toFixed(4),t=Mr.y.toFixed(4),e=Mr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function u_(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ls).join(`
`)}function f_(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function p_(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function Ls(s){return s!==""}function Ic(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function kc(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const m_=/^[ \t]*#include +<([\w\d./]+)>/gm;function hl(s){return s.replace(m_,__)}const g_=new Map;function __(s,t){let e=Jt[t];if(e===void 0){const n=g_.get(t);if(n!==void 0)e=Jt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return hl(e)}const x_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Nc(s){return s.replace(x_,v_)}function v_(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Fc(s){let t=`precision ${s.precision} float;
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
#define LOW_PRECISION`),t}function b_(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Hh?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===of?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===zn&&(t="SHADOWMAP_TYPE_VSM"),t}function M_(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case is:case ss:t="ENVMAP_TYPE_CUBE";break;case ho:t="ENVMAP_TYPE_CUBE_UV";break}return t}function w_(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case ss:t="ENVMAP_MODE_REFRACTION";break}return t}function y_(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case co:t="ENVMAP_BLENDING_MULTIPLY";break;case Tf:t="ENVMAP_BLENDING_MIX";break;case Ef:t="ENVMAP_BLENDING_ADD";break}return t}function S_(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function T_(s,t,e,n){const i=s.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=b_(e),c=M_(e),h=w_(e),d=y_(e),u=S_(e),f=u_(e),g=f_(r),_=i.createProgram();let m,p,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ls).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ls).join(`
`),p.length>0&&(p+=`
`)):(m=[Fc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ls).join(`
`),p=[Fc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==si?"#define TONE_MAPPING":"",e.toneMapping!==si?Jt.tonemapping_pars_fragment:"",e.toneMapping!==si?h_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Jt.colorspace_pars_fragment,c_("linearToOutputTexel",e.outputColorSpace),d_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ls).join(`
`)),a=hl(a),a=Ic(a,e),a=kc(a,e),o=hl(o),o=Ic(o,e),o=kc(o,e),a=Nc(a),o=Nc(o),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Zl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Zl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const v=y+m+a,x=y+p+o,E=Pc(i,i.VERTEX_SHADER,v),S=Pc(i,i.FRAGMENT_SHADER,x);i.attachShader(_,E),i.attachShader(_,S),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function A(C){if(s.debug.checkShaderErrors){const I=i.getProgramInfoLog(_).trim(),N=i.getShaderInfoLog(E).trim(),G=i.getShaderInfoLog(S).trim();let X=!0,q=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(X=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,E,S);else{const et=Dc(i,E,"vertex"),$=Dc(i,S,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+I+`
`+et+`
`+$)}else I!==""?console.warn("THREE.WebGLProgram: Program Info Log:",I):(N===""||G==="")&&(q=!1);q&&(C.diagnostics={runnable:X,programLog:I,vertexShader:{log:N,prefix:m},fragmentShader:{log:G,prefix:p}})}i.deleteShader(E),i.deleteShader(S),R=new Yr(i,_),b=p_(i,_)}let R;this.getUniforms=function(){return R===void 0&&A(this),R};let b;this.getAttributes=function(){return b===void 0&&A(this),b};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(_,r_)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=o_++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=E,this.fragmentShader=S,this}let E_=0;class A_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new R_(t),e.set(t,n)),n}}class R_{constructor(t){this.id=E_++,this.code=t,this.usedTimes=0}}function C_(s,t,e,n,i,r,a){const o=new Cl,l=new A_,c=new Set,h=[],d=i.logarithmicDepthBuffer,u=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,M,C,I,N){const G=I.fog,X=N.geometry,q=b.isMeshStandardMaterial?I.environment:null,et=(b.isMeshStandardMaterial?e:t).get(b.envMap||q),$=et&&et.mapping===ho?et.image.height:null,pt=g[b.type];b.precision!==null&&(f=i.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));const St=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Lt=St!==void 0?St.length:0;let Vt=0;X.morphAttributes.position!==void 0&&(Vt=1),X.morphAttributes.normal!==void 0&&(Vt=2),X.morphAttributes.color!==void 0&&(Vt=3);let re,K,lt,At;if(pt){const ie=Rn[pt];re=ie.vertexShader,K=ie.fragmentShader}else re=b.vertexShader,K=b.fragmentShader,l.update(b),lt=l.getVertexShaderID(b),At=l.getFragmentShaderID(b);const mt=s.getRenderTarget(),It=s.state.buffers.depth.getReversed(),Gt=N.isInstancedMesh===!0,qt=N.isBatchedMesh===!0,oe=!!b.map,Yt=!!b.matcap,Ht=!!et,z=!!b.aoMap,Ee=!!b.lightMap,te=!!b.bumpMap,jt=!!b.normalMap,kt=!!b.displacementMap,ce=!!b.emissiveMap,Rt=!!b.metalnessMap,L=!!b.roughnessMap,T=b.anisotropy>0,V=b.clearcoat>0,tt=b.dispersion>0,it=b.iridescence>0,Q=b.sheen>0,Ct=b.transmission>0,_t=T&&!!b.anisotropyMap,yt=V&&!!b.clearcoatMap,ee=V&&!!b.clearcoatNormalMap,at=V&&!!b.clearcoatRoughnessMap,bt=it&&!!b.iridescenceMap,Pt=it&&!!b.iridescenceThicknessMap,Bt=Q&&!!b.sheenColorMap,Mt=Q&&!!b.sheenRoughnessMap,Wt=!!b.specularMap,Xt=!!b.specularColorMap,ne=!!b.specularIntensityMap,B=Ct&&!!b.transmissionMap,gt=Ct&&!!b.thicknessMap,Y=!!b.gradientMap,W=!!b.alphaMap,nt=b.alphaTest>0,rt=!!b.alphaHash,ft=!!b.extensions;let Ft=si;b.toneMapped&&(mt===null||mt.isXRRenderTarget===!0)&&(Ft=s.toneMapping);const Kt={shaderID:pt,shaderType:b.type,shaderName:b.name,vertexShader:re,fragmentShader:K,defines:b.defines,customVertexShaderID:lt,customFragmentShaderID:At,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:qt,batchingColor:qt&&N._colorsTexture!==null,instancing:Gt,instancingColor:Gt&&N.instanceColor!==null,instancingMorph:Gt&&N.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:mt===null?s.outputColorSpace:mt.isXRRenderTarget===!0?mt.texture.colorSpace:cs,alphaToCoverage:!!b.alphaToCoverage,map:oe,matcap:Yt,envMap:Ht,envMapMode:Ht&&et.mapping,envMapCubeUVHeight:$,aoMap:z,lightMap:Ee,bumpMap:te,normalMap:jt,displacementMap:u&&kt,emissiveMap:ce,normalMapObjectSpace:jt&&b.normalMapType===Ff,normalMapTangentSpace:jt&&b.normalMapType===Al,metalnessMap:Rt,roughnessMap:L,anisotropy:T,anisotropyMap:_t,clearcoat:V,clearcoatMap:yt,clearcoatNormalMap:ee,clearcoatRoughnessMap:at,dispersion:tt,iridescence:it,iridescenceMap:bt,iridescenceThicknessMap:Pt,sheen:Q,sheenColorMap:Bt,sheenRoughnessMap:Mt,specularMap:Wt,specularColorMap:Xt,specularIntensityMap:ne,transmission:Ct,transmissionMap:B,thicknessMap:gt,gradientMap:Y,opaque:b.transparent===!1&&b.blending===Ji&&b.alphaToCoverage===!1,alphaMap:W,alphaTest:nt,alphaHash:rt,combine:b.combine,mapUv:oe&&_(b.map.channel),aoMapUv:z&&_(b.aoMap.channel),lightMapUv:Ee&&_(b.lightMap.channel),bumpMapUv:te&&_(b.bumpMap.channel),normalMapUv:jt&&_(b.normalMap.channel),displacementMapUv:kt&&_(b.displacementMap.channel),emissiveMapUv:ce&&_(b.emissiveMap.channel),metalnessMapUv:Rt&&_(b.metalnessMap.channel),roughnessMapUv:L&&_(b.roughnessMap.channel),anisotropyMapUv:_t&&_(b.anisotropyMap.channel),clearcoatMapUv:yt&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:ee&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:at&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:bt&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:Pt&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:Bt&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:Mt&&_(b.sheenRoughnessMap.channel),specularMapUv:Wt&&_(b.specularMap.channel),specularColorMapUv:Xt&&_(b.specularColorMap.channel),specularIntensityMapUv:ne&&_(b.specularIntensityMap.channel),transmissionMapUv:B&&_(b.transmissionMap.channel),thicknessMapUv:gt&&_(b.thicknessMap.channel),alphaMapUv:W&&_(b.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(jt||T),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!X.attributes.uv&&(oe||W),fog:!!G,useFog:b.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:It,skinning:N.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:Lt,morphTextureStride:Vt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:s.shadowMap.enabled&&C.length>0,shadowMapType:s.shadowMap.type,toneMapping:Ft,decodeVideoTexture:oe&&b.map.isVideoTexture===!0&&ae.getTransfer(b.map.colorSpace)===pe,decodeVideoTextureEmissive:ce&&b.emissiveMap.isVideoTexture===!0&&ae.getTransfer(b.emissiveMap.colorSpace)===pe,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===$t,flipSided:b.side===Je,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:ft&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ft&&b.extensions.multiDraw===!0||qt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Kt.vertexUv1s=c.has(1),Kt.vertexUv2s=c.has(2),Kt.vertexUv3s=c.has(3),c.clear(),Kt}function p(b){const M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(const C in b.defines)M.push(C),M.push(b.defines[C]);return b.isRawShaderMaterial===!1&&(y(M,b),v(M,b),M.push(s.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function y(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function v(b,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),b.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reverseDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),b.push(o.mask)}function x(b){const M=g[b.type];let C;if(M){const I=Rn[M];C=up.clone(I.uniforms)}else C=b.uniforms;return C}function E(b,M){let C;for(let I=0,N=h.length;I<N;I++){const G=h[I];if(G.cacheKey===M){C=G,++C.usedTimes;break}}return C===void 0&&(C=new T_(s,M,b,r),h.push(C)),C}function S(b){if(--b.usedTimes===0){const M=h.indexOf(b);h[M]=h[h.length-1],h.pop(),b.destroy()}}function A(b){l.remove(b)}function R(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:E,releaseProgram:S,releaseShaderCache:A,programs:h,dispose:R}}function L_(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function P_(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function Oc(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function zc(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function a(d,u,f,g,_,m){let p=s[t];return p===void 0?(p={id:d.id,object:d,geometry:u,material:f,groupOrder:g,renderOrder:d.renderOrder,z:_,group:m},s[t]=p):(p.id=d.id,p.object=d,p.geometry=u,p.material=f,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=_,p.group=m),t++,p}function o(d,u,f,g,_,m){const p=a(d,u,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):e.push(p)}function l(d,u,f,g,_,m){const p=a(d,u,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):e.unshift(p)}function c(d,u){e.length>1&&e.sort(d||P_),n.length>1&&n.sort(u||Oc),i.length>1&&i.sort(u||Oc)}function h(){for(let d=t,u=s.length;d<u;d++){const f=s[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:o,unshift:l,finish:h,sort:c}}function U_(){let s=new WeakMap;function t(n,i){const r=s.get(n);let a;return r===void 0?(a=new zc,s.set(n,[a])):i>=r.length?(a=new zc,r.push(a)):a=r[i],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function D_(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new k,color:new zt};break;case"SpotLight":e={position:new k,direction:new k,color:new zt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new k,color:new zt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new k,skyColor:new zt,groundColor:new zt};break;case"RectAreaLight":e={color:new zt,position:new k,halfWidth:new k,halfHeight:new k};break}return s[t.id]=e,e}}}function I_(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let k_=0;function N_(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function F_(s){const t=new D_,e=I_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new k);const i=new k,r=new ve,a=new ve;function o(c){let h=0,d=0,u=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,y=0,v=0,x=0,E=0,S=0,A=0;c.sort(N_);for(let b=0,M=c.length;b<M;b++){const C=c[b],I=C.color,N=C.intensity,G=C.distance,X=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=I.r*N,d+=I.g*N,u+=I.b*N;else if(C.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(C.sh.coefficients[q],N);A++}else if(C.isDirectionalLight){const q=t.get(C);if(q.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const et=C.shadow,$=e.get(C);$.shadowIntensity=et.intensity,$.shadowBias=et.bias,$.shadowNormalBias=et.normalBias,$.shadowRadius=et.radius,$.shadowMapSize=et.mapSize,n.directionalShadow[f]=$,n.directionalShadowMap[f]=X,n.directionalShadowMatrix[f]=C.shadow.matrix,y++}n.directional[f]=q,f++}else if(C.isSpotLight){const q=t.get(C);q.position.setFromMatrixPosition(C.matrixWorld),q.color.copy(I).multiplyScalar(N),q.distance=G,q.coneCos=Math.cos(C.angle),q.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),q.decay=C.decay,n.spot[_]=q;const et=C.shadow;if(C.map&&(n.spotLightMap[E]=C.map,E++,et.updateMatrices(C),C.castShadow&&S++),n.spotLightMatrix[_]=et.matrix,C.castShadow){const $=e.get(C);$.shadowIntensity=et.intensity,$.shadowBias=et.bias,$.shadowNormalBias=et.normalBias,$.shadowRadius=et.radius,$.shadowMapSize=et.mapSize,n.spotShadow[_]=$,n.spotShadowMap[_]=X,x++}_++}else if(C.isRectAreaLight){const q=t.get(C);q.color.copy(I).multiplyScalar(N),q.halfWidth.set(C.width*.5,0,0),q.halfHeight.set(0,C.height*.5,0),n.rectArea[m]=q,m++}else if(C.isPointLight){const q=t.get(C);if(q.color.copy(C.color).multiplyScalar(C.intensity),q.distance=C.distance,q.decay=C.decay,C.castShadow){const et=C.shadow,$=e.get(C);$.shadowIntensity=et.intensity,$.shadowBias=et.bias,$.shadowNormalBias=et.normalBias,$.shadowRadius=et.radius,$.shadowMapSize=et.mapSize,$.shadowCameraNear=et.camera.near,$.shadowCameraFar=et.camera.far,n.pointShadow[g]=$,n.pointShadowMap[g]=X,n.pointShadowMatrix[g]=C.shadow.matrix,v++}n.point[g]=q,g++}else if(C.isHemisphereLight){const q=t.get(C);q.skyColor.copy(C.color).multiplyScalar(N),q.groundColor.copy(C.groundColor).multiplyScalar(N),n.hemi[p]=q,p++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=xt.LTC_FLOAT_1,n.rectAreaLTC2=xt.LTC_FLOAT_2):(n.rectAreaLTC1=xt.LTC_HALF_1,n.rectAreaLTC2=xt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const R=n.hash;(R.directionalLength!==f||R.pointLength!==g||R.spotLength!==_||R.rectAreaLength!==m||R.hemiLength!==p||R.numDirectionalShadows!==y||R.numPointShadows!==v||R.numSpotShadows!==x||R.numSpotMaps!==E||R.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=x+E-S,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=A,R.directionalLength=f,R.pointLength=g,R.spotLength=_,R.rectAreaLength=m,R.hemiLength=p,R.numDirectionalShadows=y,R.numPointShadows=v,R.numSpotShadows=x,R.numSpotMaps=E,R.numLightProbes=A,n.version=k_++)}function l(c,h){let d=0,u=0,f=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,y=c.length;p<y;p++){const v=c[p];if(v.isDirectionalLight){const x=n.directional[d];x.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),d++}else if(v.isSpotLight){const x=n.spot[f];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),f++}else if(v.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(m),a.identity(),r.copy(v.matrixWorld),r.premultiply(m),a.extractRotation(r),x.halfWidth.set(v.width*.5,0,0),x.halfHeight.set(0,v.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),g++}else if(v.isPointLight){const x=n.point[u];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(m),u++}else if(v.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(v.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:o,setupView:l,state:n}}function Bc(s){const t=new F_(s),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function O_(s){let t=new WeakMap;function e(i,r=0){const a=t.get(i);let o;return a===void 0?(o=new Bc(s),t.set(i,[o])):r>=a.length?(o=new Bc(s),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class z_ extends li{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=kf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class B_ extends li{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const H_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,G_=`uniform sampler2D shadow_pass;
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
}`;function V_(s,t,e){let n=new Ll;const i=new wt,r=new wt,a=new ge,o=new z_({depthPacking:Nf}),l=new B_,c={},h=e.maxTextureSize,d={[ri]:Je,[Je]:ri,[$t]:$t},u=new oi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new wt},radius:{value:4}},vertexShader:H_,fragmentShader:G_}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new Te;g.setAttribute("position",new Ge(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Z(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Hh;let p=this.type;this.render=function(S,A,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||S.length===0)return;const b=s.getRenderTarget(),M=s.getActiveCubeFace(),C=s.getActiveMipmapLevel(),I=s.state;I.setBlending(ii),I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const N=p!==zn&&this.type===zn,G=p===zn&&this.type!==zn;for(let X=0,q=S.length;X<q;X++){const et=S[X],$=et.shadow;if($===void 0){console.warn("THREE.WebGLShadowMap:",et,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;i.copy($.mapSize);const pt=$.getFrameExtents();if(i.multiply(pt),r.copy($.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/pt.x),i.x=r.x*pt.x,$.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/pt.y),i.y=r.y*pt.y,$.mapSize.y=r.y)),$.map===null||N===!0||G===!0){const Lt=this.type!==zn?{minFilter:Mn,magFilter:Mn}:{};$.map!==null&&$.map.dispose(),$.map=new Ti(i.x,i.y,Lt),$.map.texture.name=et.name+".shadowMap",$.camera.updateProjectionMatrix()}s.setRenderTarget($.map),s.clear();const St=$.getViewportCount();for(let Lt=0;Lt<St;Lt++){const Vt=$.getViewport(Lt);a.set(r.x*Vt.x,r.y*Vt.y,r.x*Vt.z,r.y*Vt.w),I.viewport(a),$.updateMatrices(et,Lt),n=$.getFrustum(),x(A,R,$.camera,et,this.type)}$.isPointLightShadow!==!0&&this.type===zn&&y($,R),$.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(b,M,C)};function y(S,A){const R=t.update(_);u.defines.VSM_SAMPLES!==S.blurSamples&&(u.defines.VSM_SAMPLES=S.blurSamples,f.defines.VSM_SAMPLES=S.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new Ti(i.x,i.y)),u.uniforms.shadow_pass.value=S.map.texture,u.uniforms.resolution.value=S.mapSize,u.uniforms.radius.value=S.radius,s.setRenderTarget(S.mapPass),s.clear(),s.renderBufferDirect(A,null,R,u,_,null),f.uniforms.shadow_pass.value=S.mapPass.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,s.setRenderTarget(S.map),s.clear(),s.renderBufferDirect(A,null,R,f,_,null)}function v(S,A,R,b){let M=null;const C=R.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(C!==void 0)M=C;else if(M=R.isPointLight===!0?l:o,s.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const I=M.uuid,N=A.uuid;let G=c[I];G===void 0&&(G={},c[I]=G);let X=G[N];X===void 0&&(X=M.clone(),G[N]=X,A.addEventListener("dispose",E)),M=X}if(M.visible=A.visible,M.wireframe=A.wireframe,b===zn?M.side=A.shadowSide!==null?A.shadowSide:A.side:M.side=A.shadowSide!==null?A.shadowSide:d[A.side],M.alphaMap=A.alphaMap,M.alphaTest=A.alphaTest,M.map=A.map,M.clipShadows=A.clipShadows,M.clippingPlanes=A.clippingPlanes,M.clipIntersection=A.clipIntersection,M.displacementMap=A.displacementMap,M.displacementScale=A.displacementScale,M.displacementBias=A.displacementBias,M.wireframeLinewidth=A.wireframeLinewidth,M.linewidth=A.linewidth,R.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const I=s.properties.get(M);I.light=R}return M}function x(S,A,R,b,M){if(S.visible===!1)return;if(S.layers.test(A.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&M===zn)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,S.matrixWorld);const N=t.update(S),G=S.material;if(Array.isArray(G)){const X=N.groups;for(let q=0,et=X.length;q<et;q++){const $=X[q],pt=G[$.materialIndex];if(pt&&pt.visible){const St=v(S,pt,b,M);S.onBeforeShadow(s,S,A,R,N,St,$),s.renderBufferDirect(R,null,N,St,S,$),S.onAfterShadow(s,S,A,R,N,St,$)}}}else if(G.visible){const X=v(S,G,b,M);S.onBeforeShadow(s,S,A,R,N,X,null),s.renderBufferDirect(R,null,N,X,S,null),S.onAfterShadow(s,S,A,R,N,X,null)}}const I=S.children;for(let N=0,G=I.length;N<G;N++)x(I[N],A,R,b,M)}function E(S){S.target.removeEventListener("dispose",E);for(const R in c){const b=c[R],M=S.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}const W_={[Ea]:Aa,[Ra]:Pa,[Ca]:Ua,[ns]:La,[Aa]:Ea,[Pa]:Ra,[Ua]:Ca,[La]:ns};function X_(s,t){function e(){let B=!1;const gt=new ge;let Y=null;const W=new ge(0,0,0,0);return{setMask:function(nt){Y!==nt&&!B&&(s.colorMask(nt,nt,nt,nt),Y=nt)},setLocked:function(nt){B=nt},setClear:function(nt,rt,ft,Ft,Kt){Kt===!0&&(nt*=Ft,rt*=Ft,ft*=Ft),gt.set(nt,rt,ft,Ft),W.equals(gt)===!1&&(s.clearColor(nt,rt,ft,Ft),W.copy(gt))},reset:function(){B=!1,Y=null,W.set(-1,0,0,0)}}}function n(){let B=!1,gt=!1,Y=null,W=null,nt=null;return{setReversed:function(rt){if(gt!==rt){const ft=t.get("EXT_clip_control");gt?ft.clipControlEXT(ft.LOWER_LEFT_EXT,ft.ZERO_TO_ONE_EXT):ft.clipControlEXT(ft.LOWER_LEFT_EXT,ft.NEGATIVE_ONE_TO_ONE_EXT);const Ft=nt;nt=null,this.setClear(Ft)}gt=rt},getReversed:function(){return gt},setTest:function(rt){rt?mt(s.DEPTH_TEST):It(s.DEPTH_TEST)},setMask:function(rt){Y!==rt&&!B&&(s.depthMask(rt),Y=rt)},setFunc:function(rt){if(gt&&(rt=W_[rt]),W!==rt){switch(rt){case Ea:s.depthFunc(s.NEVER);break;case Aa:s.depthFunc(s.ALWAYS);break;case Ra:s.depthFunc(s.LESS);break;case ns:s.depthFunc(s.LEQUAL);break;case Ca:s.depthFunc(s.EQUAL);break;case La:s.depthFunc(s.GEQUAL);break;case Pa:s.depthFunc(s.GREATER);break;case Ua:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}W=rt}},setLocked:function(rt){B=rt},setClear:function(rt){nt!==rt&&(gt&&(rt=1-rt),s.clearDepth(rt),nt=rt)},reset:function(){B=!1,Y=null,W=null,nt=null,gt=!1}}}function i(){let B=!1,gt=null,Y=null,W=null,nt=null,rt=null,ft=null,Ft=null,Kt=null;return{setTest:function(ie){B||(ie?mt(s.STENCIL_TEST):It(s.STENCIL_TEST))},setMask:function(ie){gt!==ie&&!B&&(s.stencilMask(ie),gt=ie)},setFunc:function(ie,be,Ie){(Y!==ie||W!==be||nt!==Ie)&&(s.stencilFunc(ie,be,Ie),Y=ie,W=be,nt=Ie)},setOp:function(ie,be,Ie){(rt!==ie||ft!==be||Ft!==Ie)&&(s.stencilOp(ie,be,Ie),rt=ie,ft=be,Ft=Ie)},setLocked:function(ie){B=ie},setClear:function(ie){Kt!==ie&&(s.clearStencil(ie),Kt=ie)},reset:function(){B=!1,gt=null,Y=null,W=null,nt=null,rt=null,ft=null,Ft=null,Kt=null}}}const r=new e,a=new n,o=new i,l=new WeakMap,c=new WeakMap;let h={},d={},u=new WeakMap,f=[],g=null,_=!1,m=null,p=null,y=null,v=null,x=null,E=null,S=null,A=new zt(0,0,0),R=0,b=!1,M=null,C=null,I=null,N=null,G=null;const X=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,et=0;const $=s.getParameter(s.VERSION);$.indexOf("WebGL")!==-1?(et=parseFloat(/^WebGL (\d)/.exec($)[1]),q=et>=1):$.indexOf("OpenGL ES")!==-1&&(et=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),q=et>=2);let pt=null,St={};const Lt=s.getParameter(s.SCISSOR_BOX),Vt=s.getParameter(s.VIEWPORT),re=new ge().fromArray(Lt),K=new ge().fromArray(Vt);function lt(B,gt,Y,W){const nt=new Uint8Array(4),rt=s.createTexture();s.bindTexture(B,rt),s.texParameteri(B,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(B,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let ft=0;ft<Y;ft++)B===s.TEXTURE_3D||B===s.TEXTURE_2D_ARRAY?s.texImage3D(gt,0,s.RGBA,1,1,W,0,s.RGBA,s.UNSIGNED_BYTE,nt):s.texImage2D(gt+ft,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,nt);return rt}const At={};At[s.TEXTURE_2D]=lt(s.TEXTURE_2D,s.TEXTURE_2D,1),At[s.TEXTURE_CUBE_MAP]=lt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),At[s.TEXTURE_2D_ARRAY]=lt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),At[s.TEXTURE_3D]=lt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),mt(s.DEPTH_TEST),a.setFunc(ns),te(!1),jt(ql),mt(s.CULL_FACE),z(ii);function mt(B){h[B]!==!0&&(s.enable(B),h[B]=!0)}function It(B){h[B]!==!1&&(s.disable(B),h[B]=!1)}function Gt(B,gt){return d[B]!==gt?(s.bindFramebuffer(B,gt),d[B]=gt,B===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=gt),B===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=gt),!0):!1}function qt(B,gt){let Y=f,W=!1;if(B){Y=u.get(gt),Y===void 0&&(Y=[],u.set(gt,Y));const nt=B.textures;if(Y.length!==nt.length||Y[0]!==s.COLOR_ATTACHMENT0){for(let rt=0,ft=nt.length;rt<ft;rt++)Y[rt]=s.COLOR_ATTACHMENT0+rt;Y.length=nt.length,W=!0}}else Y[0]!==s.BACK&&(Y[0]=s.BACK,W=!0);W&&s.drawBuffers(Y)}function oe(B){return g!==B?(s.useProgram(B),g=B,!0):!1}const Yt={[bi]:s.FUNC_ADD,[lf]:s.FUNC_SUBTRACT,[cf]:s.FUNC_REVERSE_SUBTRACT};Yt[hf]=s.MIN,Yt[df]=s.MAX;const Ht={[uf]:s.ZERO,[ff]:s.ONE,[pf]:s.SRC_COLOR,[Sa]:s.SRC_ALPHA,[bf]:s.SRC_ALPHA_SATURATE,[xf]:s.DST_COLOR,[gf]:s.DST_ALPHA,[mf]:s.ONE_MINUS_SRC_COLOR,[Ta]:s.ONE_MINUS_SRC_ALPHA,[vf]:s.ONE_MINUS_DST_COLOR,[_f]:s.ONE_MINUS_DST_ALPHA,[Mf]:s.CONSTANT_COLOR,[wf]:s.ONE_MINUS_CONSTANT_COLOR,[yf]:s.CONSTANT_ALPHA,[Sf]:s.ONE_MINUS_CONSTANT_ALPHA};function z(B,gt,Y,W,nt,rt,ft,Ft,Kt,ie){if(B===ii){_===!0&&(It(s.BLEND),_=!1);return}if(_===!1&&(mt(s.BLEND),_=!0),B!==af){if(B!==m||ie!==b){if((p!==bi||x!==bi)&&(s.blendEquation(s.FUNC_ADD),p=bi,x=bi),ie)switch(B){case Ji:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case to:s.blendFunc(s.ONE,s.ONE);break;case $l:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Yl:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case Ji:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case to:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case $l:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Yl:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}y=null,v=null,E=null,S=null,A.set(0,0,0),R=0,m=B,b=ie}return}nt=nt||gt,rt=rt||Y,ft=ft||W,(gt!==p||nt!==x)&&(s.blendEquationSeparate(Yt[gt],Yt[nt]),p=gt,x=nt),(Y!==y||W!==v||rt!==E||ft!==S)&&(s.blendFuncSeparate(Ht[Y],Ht[W],Ht[rt],Ht[ft]),y=Y,v=W,E=rt,S=ft),(Ft.equals(A)===!1||Kt!==R)&&(s.blendColor(Ft.r,Ft.g,Ft.b,Kt),A.copy(Ft),R=Kt),m=B,b=!1}function Ee(B,gt){B.side===$t?It(s.CULL_FACE):mt(s.CULL_FACE);let Y=B.side===Je;gt&&(Y=!Y),te(Y),B.blending===Ji&&B.transparent===!1?z(ii):z(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),a.setFunc(B.depthFunc),a.setTest(B.depthTest),a.setMask(B.depthWrite),r.setMask(B.colorWrite);const W=B.stencilWrite;o.setTest(W),W&&(o.setMask(B.stencilWriteMask),o.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),o.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),ce(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?mt(s.SAMPLE_ALPHA_TO_COVERAGE):It(s.SAMPLE_ALPHA_TO_COVERAGE)}function te(B){M!==B&&(B?s.frontFace(s.CW):s.frontFace(s.CCW),M=B)}function jt(B){B!==sf?(mt(s.CULL_FACE),B!==C&&(B===ql?s.cullFace(s.BACK):B===rf?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):It(s.CULL_FACE),C=B}function kt(B){B!==I&&(q&&s.lineWidth(B),I=B)}function ce(B,gt,Y){B?(mt(s.POLYGON_OFFSET_FILL),(N!==gt||G!==Y)&&(s.polygonOffset(gt,Y),N=gt,G=Y)):It(s.POLYGON_OFFSET_FILL)}function Rt(B){B?mt(s.SCISSOR_TEST):It(s.SCISSOR_TEST)}function L(B){B===void 0&&(B=s.TEXTURE0+X-1),pt!==B&&(s.activeTexture(B),pt=B)}function T(B,gt,Y){Y===void 0&&(pt===null?Y=s.TEXTURE0+X-1:Y=pt);let W=St[Y];W===void 0&&(W={type:void 0,texture:void 0},St[Y]=W),(W.type!==B||W.texture!==gt)&&(pt!==Y&&(s.activeTexture(Y),pt=Y),s.bindTexture(B,gt||At[B]),W.type=B,W.texture=gt)}function V(){const B=St[pt];B!==void 0&&B.type!==void 0&&(s.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function tt(){try{s.compressedTexImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function it(){try{s.compressedTexImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Q(){try{s.texSubImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ct(){try{s.texSubImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function _t(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function yt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ee(){try{s.texStorage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function at(){try{s.texStorage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function bt(){try{s.texImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Pt(){try{s.texImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Bt(B){re.equals(B)===!1&&(s.scissor(B.x,B.y,B.z,B.w),re.copy(B))}function Mt(B){K.equals(B)===!1&&(s.viewport(B.x,B.y,B.z,B.w),K.copy(B))}function Wt(B,gt){let Y=c.get(gt);Y===void 0&&(Y=new WeakMap,c.set(gt,Y));let W=Y.get(B);W===void 0&&(W=s.getUniformBlockIndex(gt,B.name),Y.set(B,W))}function Xt(B,gt){const W=c.get(gt).get(B);l.get(gt)!==W&&(s.uniformBlockBinding(gt,W,B.__bindingPointIndex),l.set(gt,W))}function ne(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},pt=null,St={},d={},u=new WeakMap,f=[],g=null,_=!1,m=null,p=null,y=null,v=null,x=null,E=null,S=null,A=new zt(0,0,0),R=0,b=!1,M=null,C=null,I=null,N=null,G=null,re.set(0,0,s.canvas.width,s.canvas.height),K.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:mt,disable:It,bindFramebuffer:Gt,drawBuffers:qt,useProgram:oe,setBlending:z,setMaterial:Ee,setFlipSided:te,setCullFace:jt,setLineWidth:kt,setPolygonOffset:ce,setScissorTest:Rt,activeTexture:L,bindTexture:T,unbindTexture:V,compressedTexImage2D:tt,compressedTexImage3D:it,texImage2D:bt,texImage3D:Pt,updateUBOMapping:Wt,uniformBlockBinding:Xt,texStorage2D:ee,texStorage3D:at,texSubImage2D:Q,texSubImage3D:Ct,compressedTexSubImage2D:_t,compressedTexSubImage3D:yt,scissor:Bt,viewport:Mt,reset:ne}}function Hc(s,t,e,n){const i=q_(n);switch(e){case qh:return s*t;case Yh:return s*t;case jh:return s*t*2;case Zh:return s*t/i.components*i.byteLength;case Sl:return s*t/i.components*i.byteLength;case Kh:return s*t*2/i.components*i.byteLength;case Tl:return s*t*2/i.components*i.byteLength;case $h:return s*t*3/i.components*i.byteLength;case bn:return s*t*4/i.components*i.byteLength;case El:return s*t*4/i.components*i.byteLength;case Vr:case Wr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Xr:case qr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Fa:case za:return Math.max(s,16)*Math.max(t,8)/4;case Na:case Oa:return Math.max(s,8)*Math.max(t,8)/2;case Ba:case Ha:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Ga:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Va:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Wa:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case Xa:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case qa:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case $a:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case Ya:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case ja:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Za:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Ka:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Ja:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Qa:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case tl:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case el:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case nl:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case $r:case il:case sl:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Jh:case rl:return Math.ceil(s/4)*Math.ceil(t/4)*8;case ol:case al:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function q_(s){switch(s){case Xn:case Vh:return{byteLength:1,components:1};case zs:case Wh:case $s:return{byteLength:2,components:1};case wl:case yl:return{byteLength:2,components:4};case Si:case Ml:case Hn:return{byteLength:4,components:1};case Xh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function $_(s,t,e,n,i,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new wt,h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(L,T){return f?new OffscreenCanvas(L,T):Bs("canvas")}function _(L,T,V){let tt=1;const it=Rt(L);if((it.width>V||it.height>V)&&(tt=V/Math.max(it.width,it.height)),tt<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const Q=Math.floor(tt*it.width),Ct=Math.floor(tt*it.height);d===void 0&&(d=g(Q,Ct));const _t=T?g(Q,Ct):d;return _t.width=Q,_t.height=Ct,_t.getContext("2d").drawImage(L,0,0,Q,Ct),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+it.width+"x"+it.height+") to ("+Q+"x"+Ct+")."),_t}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+it.width+"x"+it.height+")."),L;return L}function m(L){return L.generateMipmaps}function p(L){s.generateMipmap(L)}function y(L){return L.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?s.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function v(L,T,V,tt,it=!1){if(L!==null){if(s[L]!==void 0)return s[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let Q=T;if(T===s.RED&&(V===s.FLOAT&&(Q=s.R32F),V===s.HALF_FLOAT&&(Q=s.R16F),V===s.UNSIGNED_BYTE&&(Q=s.R8)),T===s.RED_INTEGER&&(V===s.UNSIGNED_BYTE&&(Q=s.R8UI),V===s.UNSIGNED_SHORT&&(Q=s.R16UI),V===s.UNSIGNED_INT&&(Q=s.R32UI),V===s.BYTE&&(Q=s.R8I),V===s.SHORT&&(Q=s.R16I),V===s.INT&&(Q=s.R32I)),T===s.RG&&(V===s.FLOAT&&(Q=s.RG32F),V===s.HALF_FLOAT&&(Q=s.RG16F),V===s.UNSIGNED_BYTE&&(Q=s.RG8)),T===s.RG_INTEGER&&(V===s.UNSIGNED_BYTE&&(Q=s.RG8UI),V===s.UNSIGNED_SHORT&&(Q=s.RG16UI),V===s.UNSIGNED_INT&&(Q=s.RG32UI),V===s.BYTE&&(Q=s.RG8I),V===s.SHORT&&(Q=s.RG16I),V===s.INT&&(Q=s.RG32I)),T===s.RGB_INTEGER&&(V===s.UNSIGNED_BYTE&&(Q=s.RGB8UI),V===s.UNSIGNED_SHORT&&(Q=s.RGB16UI),V===s.UNSIGNED_INT&&(Q=s.RGB32UI),V===s.BYTE&&(Q=s.RGB8I),V===s.SHORT&&(Q=s.RGB16I),V===s.INT&&(Q=s.RGB32I)),T===s.RGBA_INTEGER&&(V===s.UNSIGNED_BYTE&&(Q=s.RGBA8UI),V===s.UNSIGNED_SHORT&&(Q=s.RGBA16UI),V===s.UNSIGNED_INT&&(Q=s.RGBA32UI),V===s.BYTE&&(Q=s.RGBA8I),V===s.SHORT&&(Q=s.RGBA16I),V===s.INT&&(Q=s.RGBA32I)),T===s.RGB&&V===s.UNSIGNED_INT_5_9_9_9_REV&&(Q=s.RGB9_E5),T===s.RGBA){const Ct=it?uo:ae.getTransfer(tt);V===s.FLOAT&&(Q=s.RGBA32F),V===s.HALF_FLOAT&&(Q=s.RGBA16F),V===s.UNSIGNED_BYTE&&(Q=Ct===pe?s.SRGB8_ALPHA8:s.RGBA8),V===s.UNSIGNED_SHORT_4_4_4_4&&(Q=s.RGBA4),V===s.UNSIGNED_SHORT_5_5_5_1&&(Q=s.RGB5_A1)}return(Q===s.R16F||Q===s.R32F||Q===s.RG16F||Q===s.RG32F||Q===s.RGBA16F||Q===s.RGBA32F)&&t.get("EXT_color_buffer_float"),Q}function x(L,T){let V;return L?T===null||T===Si||T===rs?V=s.DEPTH24_STENCIL8:T===Hn?V=s.DEPTH32F_STENCIL8:T===zs&&(V=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===Si||T===rs?V=s.DEPTH_COMPONENT24:T===Hn?V=s.DEPTH_COMPONENT32F:T===zs&&(V=s.DEPTH_COMPONENT16),V}function E(L,T){return m(L)===!0||L.isFramebufferTexture&&L.minFilter!==Mn&&L.minFilter!==Ve?Math.log2(Math.max(T.width,T.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?T.mipmaps.length:1}function S(L){const T=L.target;T.removeEventListener("dispose",S),R(T),T.isVideoTexture&&h.delete(T)}function A(L){const T=L.target;T.removeEventListener("dispose",A),M(T)}function R(L){const T=n.get(L);if(T.__webglInit===void 0)return;const V=L.source,tt=u.get(V);if(tt){const it=tt[T.__cacheKey];it.usedTimes--,it.usedTimes===0&&b(L),Object.keys(tt).length===0&&u.delete(V)}n.remove(L)}function b(L){const T=n.get(L);s.deleteTexture(T.__webglTexture);const V=L.source,tt=u.get(V);delete tt[T.__cacheKey],a.memory.textures--}function M(L){const T=n.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),n.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let tt=0;tt<6;tt++){if(Array.isArray(T.__webglFramebuffer[tt]))for(let it=0;it<T.__webglFramebuffer[tt].length;it++)s.deleteFramebuffer(T.__webglFramebuffer[tt][it]);else s.deleteFramebuffer(T.__webglFramebuffer[tt]);T.__webglDepthbuffer&&s.deleteRenderbuffer(T.__webglDepthbuffer[tt])}else{if(Array.isArray(T.__webglFramebuffer))for(let tt=0;tt<T.__webglFramebuffer.length;tt++)s.deleteFramebuffer(T.__webglFramebuffer[tt]);else s.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&s.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&s.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let tt=0;tt<T.__webglColorRenderbuffer.length;tt++)T.__webglColorRenderbuffer[tt]&&s.deleteRenderbuffer(T.__webglColorRenderbuffer[tt]);T.__webglDepthRenderbuffer&&s.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const V=L.textures;for(let tt=0,it=V.length;tt<it;tt++){const Q=n.get(V[tt]);Q.__webglTexture&&(s.deleteTexture(Q.__webglTexture),a.memory.textures--),n.remove(V[tt])}n.remove(L)}let C=0;function I(){C=0}function N(){const L=C;return L>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+i.maxTextures),C+=1,L}function G(L){const T=[];return T.push(L.wrapS),T.push(L.wrapT),T.push(L.wrapR||0),T.push(L.magFilter),T.push(L.minFilter),T.push(L.anisotropy),T.push(L.internalFormat),T.push(L.format),T.push(L.type),T.push(L.generateMipmaps),T.push(L.premultiplyAlpha),T.push(L.flipY),T.push(L.unpackAlignment),T.push(L.colorSpace),T.join()}function X(L,T){const V=n.get(L);if(L.isVideoTexture&&kt(L),L.isRenderTargetTexture===!1&&L.version>0&&V.__version!==L.version){const tt=L.image;if(tt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(tt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{K(V,L,T);return}}e.bindTexture(s.TEXTURE_2D,V.__webglTexture,s.TEXTURE0+T)}function q(L,T){const V=n.get(L);if(L.version>0&&V.__version!==L.version){K(V,L,T);return}e.bindTexture(s.TEXTURE_2D_ARRAY,V.__webglTexture,s.TEXTURE0+T)}function et(L,T){const V=n.get(L);if(L.version>0&&V.__version!==L.version){K(V,L,T);return}e.bindTexture(s.TEXTURE_3D,V.__webglTexture,s.TEXTURE0+T)}function $(L,T){const V=n.get(L);if(L.version>0&&V.__version!==L.version){lt(V,L,T);return}e.bindTexture(s.TEXTURE_CUBE_MAP,V.__webglTexture,s.TEXTURE0+T)}const pt={[sn]:s.REPEAT,[xn]:s.CLAMP_TO_EDGE,[ka]:s.MIRRORED_REPEAT},St={[Mn]:s.NEAREST,[If]:s.NEAREST_MIPMAP_NEAREST,[er]:s.NEAREST_MIPMAP_LINEAR,[Ve]:s.LINEAR,[vo]:s.LINEAR_MIPMAP_NEAREST,[vn]:s.LINEAR_MIPMAP_LINEAR},Lt={[Of]:s.NEVER,[Wf]:s.ALWAYS,[zf]:s.LESS,[Qh]:s.LEQUAL,[Bf]:s.EQUAL,[Vf]:s.GEQUAL,[Hf]:s.GREATER,[Gf]:s.NOTEQUAL};function Vt(L,T){if(T.type===Hn&&t.has("OES_texture_float_linear")===!1&&(T.magFilter===Ve||T.magFilter===vo||T.magFilter===er||T.magFilter===vn||T.minFilter===Ve||T.minFilter===vo||T.minFilter===er||T.minFilter===vn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(L,s.TEXTURE_WRAP_S,pt[T.wrapS]),s.texParameteri(L,s.TEXTURE_WRAP_T,pt[T.wrapT]),(L===s.TEXTURE_3D||L===s.TEXTURE_2D_ARRAY)&&s.texParameteri(L,s.TEXTURE_WRAP_R,pt[T.wrapR]),s.texParameteri(L,s.TEXTURE_MAG_FILTER,St[T.magFilter]),s.texParameteri(L,s.TEXTURE_MIN_FILTER,St[T.minFilter]),T.compareFunction&&(s.texParameteri(L,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(L,s.TEXTURE_COMPARE_FUNC,Lt[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===Mn||T.minFilter!==er&&T.minFilter!==vn||T.type===Hn&&t.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||n.get(T).__currentAnisotropy){const V=t.get("EXT_texture_filter_anisotropic");s.texParameterf(L,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,i.getMaxAnisotropy())),n.get(T).__currentAnisotropy=T.anisotropy}}}function re(L,T){let V=!1;L.__webglInit===void 0&&(L.__webglInit=!0,T.addEventListener("dispose",S));const tt=T.source;let it=u.get(tt);it===void 0&&(it={},u.set(tt,it));const Q=G(T);if(Q!==L.__cacheKey){it[Q]===void 0&&(it[Q]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,V=!0),it[Q].usedTimes++;const Ct=it[L.__cacheKey];Ct!==void 0&&(it[L.__cacheKey].usedTimes--,Ct.usedTimes===0&&b(T)),L.__cacheKey=Q,L.__webglTexture=it[Q].texture}return V}function K(L,T,V){let tt=s.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(tt=s.TEXTURE_2D_ARRAY),T.isData3DTexture&&(tt=s.TEXTURE_3D);const it=re(L,T),Q=T.source;e.bindTexture(tt,L.__webglTexture,s.TEXTURE0+V);const Ct=n.get(Q);if(Q.version!==Ct.__version||it===!0){e.activeTexture(s.TEXTURE0+V);const _t=ae.getPrimaries(ae.workingColorSpace),yt=T.colorSpace===ni?null:ae.getPrimaries(T.colorSpace),ee=T.colorSpace===ni||_t===yt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,T.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,T.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ee);let at=_(T.image,!1,i.maxTextureSize);at=ce(T,at);const bt=r.convert(T.format,T.colorSpace),Pt=r.convert(T.type);let Bt=v(T.internalFormat,bt,Pt,T.colorSpace,T.isVideoTexture);Vt(tt,T);let Mt;const Wt=T.mipmaps,Xt=T.isVideoTexture!==!0,ne=Ct.__version===void 0||it===!0,B=Q.dataReady,gt=E(T,at);if(T.isDepthTexture)Bt=x(T.format===os,T.type),ne&&(Xt?e.texStorage2D(s.TEXTURE_2D,1,Bt,at.width,at.height):e.texImage2D(s.TEXTURE_2D,0,Bt,at.width,at.height,0,bt,Pt,null));else if(T.isDataTexture)if(Wt.length>0){Xt&&ne&&e.texStorage2D(s.TEXTURE_2D,gt,Bt,Wt[0].width,Wt[0].height);for(let Y=0,W=Wt.length;Y<W;Y++)Mt=Wt[Y],Xt?B&&e.texSubImage2D(s.TEXTURE_2D,Y,0,0,Mt.width,Mt.height,bt,Pt,Mt.data):e.texImage2D(s.TEXTURE_2D,Y,Bt,Mt.width,Mt.height,0,bt,Pt,Mt.data);T.generateMipmaps=!1}else Xt?(ne&&e.texStorage2D(s.TEXTURE_2D,gt,Bt,at.width,at.height),B&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,at.width,at.height,bt,Pt,at.data)):e.texImage2D(s.TEXTURE_2D,0,Bt,at.width,at.height,0,bt,Pt,at.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){Xt&&ne&&e.texStorage3D(s.TEXTURE_2D_ARRAY,gt,Bt,Wt[0].width,Wt[0].height,at.depth);for(let Y=0,W=Wt.length;Y<W;Y++)if(Mt=Wt[Y],T.format!==bn)if(bt!==null)if(Xt){if(B)if(T.layerUpdates.size>0){const nt=Hc(Mt.width,Mt.height,T.format,T.type);for(const rt of T.layerUpdates){const ft=Mt.data.subarray(rt*nt/Mt.data.BYTES_PER_ELEMENT,(rt+1)*nt/Mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Y,0,0,rt,Mt.width,Mt.height,1,bt,ft)}T.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Y,0,0,0,Mt.width,Mt.height,at.depth,bt,Mt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,Y,Bt,Mt.width,Mt.height,at.depth,0,Mt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Xt?B&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,Y,0,0,0,Mt.width,Mt.height,at.depth,bt,Pt,Mt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,Y,Bt,Mt.width,Mt.height,at.depth,0,bt,Pt,Mt.data)}else{Xt&&ne&&e.texStorage2D(s.TEXTURE_2D,gt,Bt,Wt[0].width,Wt[0].height);for(let Y=0,W=Wt.length;Y<W;Y++)Mt=Wt[Y],T.format!==bn?bt!==null?Xt?B&&e.compressedTexSubImage2D(s.TEXTURE_2D,Y,0,0,Mt.width,Mt.height,bt,Mt.data):e.compressedTexImage2D(s.TEXTURE_2D,Y,Bt,Mt.width,Mt.height,0,Mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xt?B&&e.texSubImage2D(s.TEXTURE_2D,Y,0,0,Mt.width,Mt.height,bt,Pt,Mt.data):e.texImage2D(s.TEXTURE_2D,Y,Bt,Mt.width,Mt.height,0,bt,Pt,Mt.data)}else if(T.isDataArrayTexture)if(Xt){if(ne&&e.texStorage3D(s.TEXTURE_2D_ARRAY,gt,Bt,at.width,at.height,at.depth),B)if(T.layerUpdates.size>0){const Y=Hc(at.width,at.height,T.format,T.type);for(const W of T.layerUpdates){const nt=at.data.subarray(W*Y/at.data.BYTES_PER_ELEMENT,(W+1)*Y/at.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,W,at.width,at.height,1,bt,Pt,nt)}T.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,at.width,at.height,at.depth,bt,Pt,at.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,Bt,at.width,at.height,at.depth,0,bt,Pt,at.data);else if(T.isData3DTexture)Xt?(ne&&e.texStorage3D(s.TEXTURE_3D,gt,Bt,at.width,at.height,at.depth),B&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,at.width,at.height,at.depth,bt,Pt,at.data)):e.texImage3D(s.TEXTURE_3D,0,Bt,at.width,at.height,at.depth,0,bt,Pt,at.data);else if(T.isFramebufferTexture){if(ne)if(Xt)e.texStorage2D(s.TEXTURE_2D,gt,Bt,at.width,at.height);else{let Y=at.width,W=at.height;for(let nt=0;nt<gt;nt++)e.texImage2D(s.TEXTURE_2D,nt,Bt,Y,W,0,bt,Pt,null),Y>>=1,W>>=1}}else if(Wt.length>0){if(Xt&&ne){const Y=Rt(Wt[0]);e.texStorage2D(s.TEXTURE_2D,gt,Bt,Y.width,Y.height)}for(let Y=0,W=Wt.length;Y<W;Y++)Mt=Wt[Y],Xt?B&&e.texSubImage2D(s.TEXTURE_2D,Y,0,0,bt,Pt,Mt):e.texImage2D(s.TEXTURE_2D,Y,Bt,bt,Pt,Mt);T.generateMipmaps=!1}else if(Xt){if(ne){const Y=Rt(at);e.texStorage2D(s.TEXTURE_2D,gt,Bt,Y.width,Y.height)}B&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,bt,Pt,at)}else e.texImage2D(s.TEXTURE_2D,0,Bt,bt,Pt,at);m(T)&&p(tt),Ct.__version=Q.version,T.onUpdate&&T.onUpdate(T)}L.__version=T.version}function lt(L,T,V){if(T.image.length!==6)return;const tt=re(L,T),it=T.source;e.bindTexture(s.TEXTURE_CUBE_MAP,L.__webglTexture,s.TEXTURE0+V);const Q=n.get(it);if(it.version!==Q.__version||tt===!0){e.activeTexture(s.TEXTURE0+V);const Ct=ae.getPrimaries(ae.workingColorSpace),_t=T.colorSpace===ni?null:ae.getPrimaries(T.colorSpace),yt=T.colorSpace===ni||Ct===_t?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,T.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,T.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,yt);const ee=T.isCompressedTexture||T.image[0].isCompressedTexture,at=T.image[0]&&T.image[0].isDataTexture,bt=[];for(let W=0;W<6;W++)!ee&&!at?bt[W]=_(T.image[W],!0,i.maxCubemapSize):bt[W]=at?T.image[W].image:T.image[W],bt[W]=ce(T,bt[W]);const Pt=bt[0],Bt=r.convert(T.format,T.colorSpace),Mt=r.convert(T.type),Wt=v(T.internalFormat,Bt,Mt,T.colorSpace),Xt=T.isVideoTexture!==!0,ne=Q.__version===void 0||tt===!0,B=it.dataReady;let gt=E(T,Pt);Vt(s.TEXTURE_CUBE_MAP,T);let Y;if(ee){Xt&&ne&&e.texStorage2D(s.TEXTURE_CUBE_MAP,gt,Wt,Pt.width,Pt.height);for(let W=0;W<6;W++){Y=bt[W].mipmaps;for(let nt=0;nt<Y.length;nt++){const rt=Y[nt];T.format!==bn?Bt!==null?Xt?B&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+W,nt,0,0,rt.width,rt.height,Bt,rt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+W,nt,Wt,rt.width,rt.height,0,rt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Xt?B&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+W,nt,0,0,rt.width,rt.height,Bt,Mt,rt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+W,nt,Wt,rt.width,rt.height,0,Bt,Mt,rt.data)}}}else{if(Y=T.mipmaps,Xt&&ne){Y.length>0&&gt++;const W=Rt(bt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,gt,Wt,W.width,W.height)}for(let W=0;W<6;W++)if(at){Xt?B&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,0,0,bt[W].width,bt[W].height,Bt,Mt,bt[W].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,Wt,bt[W].width,bt[W].height,0,Bt,Mt,bt[W].data);for(let nt=0;nt<Y.length;nt++){const ft=Y[nt].image[W].image;Xt?B&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+W,nt+1,0,0,ft.width,ft.height,Bt,Mt,ft.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+W,nt+1,Wt,ft.width,ft.height,0,Bt,Mt,ft.data)}}else{Xt?B&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,0,0,Bt,Mt,bt[W]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,Wt,Bt,Mt,bt[W]);for(let nt=0;nt<Y.length;nt++){const rt=Y[nt];Xt?B&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+W,nt+1,0,0,Bt,Mt,rt.image[W]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+W,nt+1,Wt,Bt,Mt,rt.image[W])}}}m(T)&&p(s.TEXTURE_CUBE_MAP),Q.__version=it.version,T.onUpdate&&T.onUpdate(T)}L.__version=T.version}function At(L,T,V,tt,it,Q){const Ct=r.convert(V.format,V.colorSpace),_t=r.convert(V.type),yt=v(V.internalFormat,Ct,_t,V.colorSpace),ee=n.get(T),at=n.get(V);if(at.__renderTarget=T,!ee.__hasExternalTextures){const bt=Math.max(1,T.width>>Q),Pt=Math.max(1,T.height>>Q);it===s.TEXTURE_3D||it===s.TEXTURE_2D_ARRAY?e.texImage3D(it,Q,yt,bt,Pt,T.depth,0,Ct,_t,null):e.texImage2D(it,Q,yt,bt,Pt,0,Ct,_t,null)}e.bindFramebuffer(s.FRAMEBUFFER,L),jt(T)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,tt,it,at.__webglTexture,0,te(T)):(it===s.TEXTURE_2D||it>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&it<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,tt,it,at.__webglTexture,Q),e.bindFramebuffer(s.FRAMEBUFFER,null)}function mt(L,T,V){if(s.bindRenderbuffer(s.RENDERBUFFER,L),T.depthBuffer){const tt=T.depthTexture,it=tt&&tt.isDepthTexture?tt.type:null,Q=x(T.stencilBuffer,it),Ct=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,_t=te(T);jt(T)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,_t,Q,T.width,T.height):V?s.renderbufferStorageMultisample(s.RENDERBUFFER,_t,Q,T.width,T.height):s.renderbufferStorage(s.RENDERBUFFER,Q,T.width,T.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Ct,s.RENDERBUFFER,L)}else{const tt=T.textures;for(let it=0;it<tt.length;it++){const Q=tt[it],Ct=r.convert(Q.format,Q.colorSpace),_t=r.convert(Q.type),yt=v(Q.internalFormat,Ct,_t,Q.colorSpace),ee=te(T);V&&jt(T)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,ee,yt,T.width,T.height):jt(T)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ee,yt,T.width,T.height):s.renderbufferStorage(s.RENDERBUFFER,yt,T.width,T.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function It(L,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,L),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const tt=n.get(T.depthTexture);tt.__renderTarget=T,(!tt.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),X(T.depthTexture,0);const it=tt.__webglTexture,Q=te(T);if(T.depthTexture.format===Qi)jt(T)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,it,0,Q):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,it,0);else if(T.depthTexture.format===os)jt(T)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,it,0,Q):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,it,0);else throw new Error("Unknown depthTexture format")}function Gt(L){const T=n.get(L),V=L.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==L.depthTexture){const tt=L.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),tt){const it=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,tt.removeEventListener("dispose",it)};tt.addEventListener("dispose",it),T.__depthDisposeCallback=it}T.__boundDepthTexture=tt}if(L.depthTexture&&!T.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");It(T.__webglFramebuffer,L)}else if(V){T.__webglDepthbuffer=[];for(let tt=0;tt<6;tt++)if(e.bindFramebuffer(s.FRAMEBUFFER,T.__webglFramebuffer[tt]),T.__webglDepthbuffer[tt]===void 0)T.__webglDepthbuffer[tt]=s.createRenderbuffer(),mt(T.__webglDepthbuffer[tt],L,!1);else{const it=L.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Q=T.__webglDepthbuffer[tt];s.bindRenderbuffer(s.RENDERBUFFER,Q),s.framebufferRenderbuffer(s.FRAMEBUFFER,it,s.RENDERBUFFER,Q)}}else if(e.bindFramebuffer(s.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=s.createRenderbuffer(),mt(T.__webglDepthbuffer,L,!1);else{const tt=L.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,it=T.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,it),s.framebufferRenderbuffer(s.FRAMEBUFFER,tt,s.RENDERBUFFER,it)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function qt(L,T,V){const tt=n.get(L);T!==void 0&&At(tt.__webglFramebuffer,L,L.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),V!==void 0&&Gt(L)}function oe(L){const T=L.texture,V=n.get(L),tt=n.get(T);L.addEventListener("dispose",A);const it=L.textures,Q=L.isWebGLCubeRenderTarget===!0,Ct=it.length>1;if(Ct||(tt.__webglTexture===void 0&&(tt.__webglTexture=s.createTexture()),tt.__version=T.version,a.memory.textures++),Q){V.__webglFramebuffer=[];for(let _t=0;_t<6;_t++)if(T.mipmaps&&T.mipmaps.length>0){V.__webglFramebuffer[_t]=[];for(let yt=0;yt<T.mipmaps.length;yt++)V.__webglFramebuffer[_t][yt]=s.createFramebuffer()}else V.__webglFramebuffer[_t]=s.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){V.__webglFramebuffer=[];for(let _t=0;_t<T.mipmaps.length;_t++)V.__webglFramebuffer[_t]=s.createFramebuffer()}else V.__webglFramebuffer=s.createFramebuffer();if(Ct)for(let _t=0,yt=it.length;_t<yt;_t++){const ee=n.get(it[_t]);ee.__webglTexture===void 0&&(ee.__webglTexture=s.createTexture(),a.memory.textures++)}if(L.samples>0&&jt(L)===!1){V.__webglMultisampledFramebuffer=s.createFramebuffer(),V.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let _t=0;_t<it.length;_t++){const yt=it[_t];V.__webglColorRenderbuffer[_t]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,V.__webglColorRenderbuffer[_t]);const ee=r.convert(yt.format,yt.colorSpace),at=r.convert(yt.type),bt=v(yt.internalFormat,ee,at,yt.colorSpace,L.isXRRenderTarget===!0),Pt=te(L);s.renderbufferStorageMultisample(s.RENDERBUFFER,Pt,bt,L.width,L.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+_t,s.RENDERBUFFER,V.__webglColorRenderbuffer[_t])}s.bindRenderbuffer(s.RENDERBUFFER,null),L.depthBuffer&&(V.__webglDepthRenderbuffer=s.createRenderbuffer(),mt(V.__webglDepthRenderbuffer,L,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(Q){e.bindTexture(s.TEXTURE_CUBE_MAP,tt.__webglTexture),Vt(s.TEXTURE_CUBE_MAP,T);for(let _t=0;_t<6;_t++)if(T.mipmaps&&T.mipmaps.length>0)for(let yt=0;yt<T.mipmaps.length;yt++)At(V.__webglFramebuffer[_t][yt],L,T,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,yt);else At(V.__webglFramebuffer[_t],L,T,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0);m(T)&&p(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Ct){for(let _t=0,yt=it.length;_t<yt;_t++){const ee=it[_t],at=n.get(ee);e.bindTexture(s.TEXTURE_2D,at.__webglTexture),Vt(s.TEXTURE_2D,ee),At(V.__webglFramebuffer,L,ee,s.COLOR_ATTACHMENT0+_t,s.TEXTURE_2D,0),m(ee)&&p(s.TEXTURE_2D)}e.unbindTexture()}else{let _t=s.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(_t=L.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(_t,tt.__webglTexture),Vt(_t,T),T.mipmaps&&T.mipmaps.length>0)for(let yt=0;yt<T.mipmaps.length;yt++)At(V.__webglFramebuffer[yt],L,T,s.COLOR_ATTACHMENT0,_t,yt);else At(V.__webglFramebuffer,L,T,s.COLOR_ATTACHMENT0,_t,0);m(T)&&p(_t),e.unbindTexture()}L.depthBuffer&&Gt(L)}function Yt(L){const T=L.textures;for(let V=0,tt=T.length;V<tt;V++){const it=T[V];if(m(it)){const Q=y(L),Ct=n.get(it).__webglTexture;e.bindTexture(Q,Ct),p(Q),e.unbindTexture()}}}const Ht=[],z=[];function Ee(L){if(L.samples>0){if(jt(L)===!1){const T=L.textures,V=L.width,tt=L.height;let it=s.COLOR_BUFFER_BIT;const Q=L.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ct=n.get(L),_t=T.length>1;if(_t)for(let yt=0;yt<T.length;yt++)e.bindFramebuffer(s.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+yt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,Ct.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+yt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer);for(let yt=0;yt<T.length;yt++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(it|=s.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(it|=s.STENCIL_BUFFER_BIT)),_t){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Ct.__webglColorRenderbuffer[yt]);const ee=n.get(T[yt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,ee,0)}s.blitFramebuffer(0,0,V,tt,0,0,V,tt,it,s.NEAREST),l===!0&&(Ht.length=0,z.length=0,Ht.push(s.COLOR_ATTACHMENT0+yt),L.depthBuffer&&L.resolveDepthBuffer===!1&&(Ht.push(Q),z.push(Q),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,z)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Ht))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),_t)for(let yt=0;yt<T.length;yt++){e.bindFramebuffer(s.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+yt,s.RENDERBUFFER,Ct.__webglColorRenderbuffer[yt]);const ee=n.get(T[yt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,Ct.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+yt,s.TEXTURE_2D,ee,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&l){const T=L.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[T])}}}function te(L){return Math.min(i.maxSamples,L.samples)}function jt(L){const T=n.get(L);return L.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function kt(L){const T=a.render.frame;h.get(L)!==T&&(h.set(L,T),L.update())}function ce(L,T){const V=L.colorSpace,tt=L.format,it=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||V!==cs&&V!==ni&&(ae.getTransfer(V)===pe?(tt!==bn||it!==Xn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),T}function Rt(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(c.width=L.naturalWidth||L.width,c.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(c.width=L.displayWidth,c.height=L.displayHeight):(c.width=L.width,c.height=L.height),c}this.allocateTextureUnit=N,this.resetTextureUnits=I,this.setTexture2D=X,this.setTexture2DArray=q,this.setTexture3D=et,this.setTextureCube=$,this.rebindTextures=qt,this.setupRenderTarget=oe,this.updateRenderTargetMipmap=Yt,this.updateMultisampleRenderTarget=Ee,this.setupDepthRenderbuffer=Gt,this.setupFrameBufferTexture=At,this.useMultisampledRTT=jt}function Y_(s,t){function e(n,i=ni){let r;const a=ae.getTransfer(i);if(n===Xn)return s.UNSIGNED_BYTE;if(n===wl)return s.UNSIGNED_SHORT_4_4_4_4;if(n===yl)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Xh)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Vh)return s.BYTE;if(n===Wh)return s.SHORT;if(n===zs)return s.UNSIGNED_SHORT;if(n===Ml)return s.INT;if(n===Si)return s.UNSIGNED_INT;if(n===Hn)return s.FLOAT;if(n===$s)return s.HALF_FLOAT;if(n===qh)return s.ALPHA;if(n===$h)return s.RGB;if(n===bn)return s.RGBA;if(n===Yh)return s.LUMINANCE;if(n===jh)return s.LUMINANCE_ALPHA;if(n===Qi)return s.DEPTH_COMPONENT;if(n===os)return s.DEPTH_STENCIL;if(n===Zh)return s.RED;if(n===Sl)return s.RED_INTEGER;if(n===Kh)return s.RG;if(n===Tl)return s.RG_INTEGER;if(n===El)return s.RGBA_INTEGER;if(n===Vr||n===Wr||n===Xr||n===qr)if(a===pe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Vr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Xr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===qr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Vr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Wr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Xr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===qr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Na||n===Fa||n===Oa||n===za)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Na)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Fa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Oa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===za)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ba||n===Ha||n===Ga)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ba||n===Ha)return a===pe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ga)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Va||n===Wa||n===Xa||n===qa||n===$a||n===Ya||n===ja||n===Za||n===Ka||n===Ja||n===Qa||n===tl||n===el||n===nl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Va)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Wa)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Xa)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===qa)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===$a)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ya)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ja)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Za)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ka)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ja)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Qa)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===tl)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===el)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===nl)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===$r||n===il||n===sl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===$r)return a===pe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===il)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===sl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Jh||n===rl||n===ol||n===al)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===$r)return r.COMPRESSED_RED_RGTC1_EXT;if(n===rl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ol)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===al)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===rs?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}class j_ extends nn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class ke extends Le{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Z_={type:"move"};class Yo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ke,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ke,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ke,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Z_)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ke;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const K_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,J_=`
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

}`;class Q_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new We,r=t.properties.get(i);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new oi({vertexShader:K_,fragmentShader:J_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Z(new Ot(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class tx extends hs{constructor(t,e){super();const n=this;let i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null;const _=new Q_,m=e.getContextAttributes();let p=null,y=null;const v=[],x=[],E=new wt;let S=null;const A=new nn;A.viewport=new ge;const R=new nn;R.viewport=new ge;const b=[A,R],M=new j_;let C=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let lt=v[K];return lt===void 0&&(lt=new Yo,v[K]=lt),lt.getTargetRaySpace()},this.getControllerGrip=function(K){let lt=v[K];return lt===void 0&&(lt=new Yo,v[K]=lt),lt.getGripSpace()},this.getHand=function(K){let lt=v[K];return lt===void 0&&(lt=new Yo,v[K]=lt),lt.getHandSpace()};function N(K){const lt=x.indexOf(K.inputSource);if(lt===-1)return;const At=v[lt];At!==void 0&&(At.update(K.inputSource,K.frame,c||a),At.dispatchEvent({type:K.type,data:K.inputSource}))}function G(){i.removeEventListener("select",N),i.removeEventListener("selectstart",N),i.removeEventListener("selectend",N),i.removeEventListener("squeeze",N),i.removeEventListener("squeezestart",N),i.removeEventListener("squeezeend",N),i.removeEventListener("end",G),i.removeEventListener("inputsourceschange",X);for(let K=0;K<v.length;K++){const lt=x[K];lt!==null&&(x[K]=null,v[K].disconnect(lt))}C=null,I=null,_.reset(),t.setRenderTarget(p),f=null,u=null,d=null,i=null,y=null,re.stop(),n.isPresenting=!1,t.setPixelRatio(S),t.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(K){if(i=K,i!==null){if(p=t.getRenderTarget(),i.addEventListener("select",N),i.addEventListener("selectstart",N),i.addEventListener("selectend",N),i.addEventListener("squeeze",N),i.addEventListener("squeezestart",N),i.addEventListener("squeezeend",N),i.addEventListener("end",G),i.addEventListener("inputsourceschange",X),m.xrCompatible!==!0&&await e.makeXRCompatible(),S=t.getPixelRatio(),t.getSize(E),i.renderState.layers===void 0){const lt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,e,lt),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Ti(f.framebufferWidth,f.framebufferHeight,{format:bn,type:Xn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let lt=null,At=null,mt=null;m.depth&&(mt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,lt=m.stencil?os:Qi,At=m.stencil?rs:Si);const It={colorFormat:e.RGBA8,depthFormat:mt,scaleFactor:r};d=new XRWebGLBinding(i,e),u=d.createProjectionLayer(It),i.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),y=new Ti(u.textureWidth,u.textureHeight,{format:bn,type:Xn,depthTexture:new dd(u.textureWidth,u.textureHeight,At,void 0,void 0,void 0,void 0,void 0,void 0,lt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),re.setContext(i),re.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function X(K){for(let lt=0;lt<K.removed.length;lt++){const At=K.removed[lt],mt=x.indexOf(At);mt>=0&&(x[mt]=null,v[mt].disconnect(At))}for(let lt=0;lt<K.added.length;lt++){const At=K.added[lt];let mt=x.indexOf(At);if(mt===-1){for(let Gt=0;Gt<v.length;Gt++)if(Gt>=x.length){x.push(At),mt=Gt;break}else if(x[Gt]===null){x[Gt]=At,mt=Gt;break}if(mt===-1)break}const It=v[mt];It&&It.connect(At)}}const q=new k,et=new k;function $(K,lt,At){q.setFromMatrixPosition(lt.matrixWorld),et.setFromMatrixPosition(At.matrixWorld);const mt=q.distanceTo(et),It=lt.projectionMatrix.elements,Gt=At.projectionMatrix.elements,qt=It[14]/(It[10]-1),oe=It[14]/(It[10]+1),Yt=(It[9]+1)/It[5],Ht=(It[9]-1)/It[5],z=(It[8]-1)/It[0],Ee=(Gt[8]+1)/Gt[0],te=qt*z,jt=qt*Ee,kt=mt/(-z+Ee),ce=kt*-z;if(lt.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(ce),K.translateZ(kt),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),It[10]===-1)K.projectionMatrix.copy(lt.projectionMatrix),K.projectionMatrixInverse.copy(lt.projectionMatrixInverse);else{const Rt=qt+kt,L=oe+kt,T=te-ce,V=jt+(mt-ce),tt=Yt*oe/L*Rt,it=Ht*oe/L*Rt;K.projectionMatrix.makePerspective(T,V,tt,it,Rt,L),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function pt(K,lt){lt===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(lt.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(i===null)return;let lt=K.near,At=K.far;_.texture!==null&&(_.depthNear>0&&(lt=_.depthNear),_.depthFar>0&&(At=_.depthFar)),M.near=R.near=A.near=lt,M.far=R.far=A.far=At,(C!==M.near||I!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),C=M.near,I=M.far),A.layers.mask=K.layers.mask|2,R.layers.mask=K.layers.mask|4,M.layers.mask=A.layers.mask|R.layers.mask;const mt=K.parent,It=M.cameras;pt(M,mt);for(let Gt=0;Gt<It.length;Gt++)pt(It[Gt],mt);It.length===2?$(M,A,R):M.projectionMatrix.copy(A.projectionMatrix),St(K,M,mt)};function St(K,lt,At){At===null?K.matrix.copy(lt.matrixWorld):(K.matrix.copy(At.matrixWorld),K.matrix.invert(),K.matrix.multiply(lt.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(lt.projectionMatrix),K.projectionMatrixInverse.copy(lt.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=cl*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(K){l=K,u!==null&&(u.fixedFoveation=K),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=K)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)};let Lt=null;function Vt(K,lt){if(h=lt.getViewerPose(c||a),g=lt,h!==null){const At=h.views;f!==null&&(t.setRenderTargetFramebuffer(y,f.framebuffer),t.setRenderTarget(y));let mt=!1;At.length!==M.cameras.length&&(M.cameras.length=0,mt=!0);for(let Gt=0;Gt<At.length;Gt++){const qt=At[Gt];let oe=null;if(f!==null)oe=f.getViewport(qt);else{const Ht=d.getViewSubImage(u,qt);oe=Ht.viewport,Gt===0&&(t.setRenderTargetTextures(y,Ht.colorTexture,u.ignoreDepthValues?void 0:Ht.depthStencilTexture),t.setRenderTarget(y))}let Yt=b[Gt];Yt===void 0&&(Yt=new nn,Yt.layers.enable(Gt),Yt.viewport=new ge,b[Gt]=Yt),Yt.matrix.fromArray(qt.transform.matrix),Yt.matrix.decompose(Yt.position,Yt.quaternion,Yt.scale),Yt.projectionMatrix.fromArray(qt.projectionMatrix),Yt.projectionMatrixInverse.copy(Yt.projectionMatrix).invert(),Yt.viewport.set(oe.x,oe.y,oe.width,oe.height),Gt===0&&(M.matrix.copy(Yt.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),mt===!0&&M.cameras.push(Yt)}const It=i.enabledFeatures;if(It&&It.includes("depth-sensing")){const Gt=d.getDepthInformation(At[0]);Gt&&Gt.isValid&&Gt.texture&&_.init(t,Gt,i.renderState)}}for(let At=0;At<v.length;At++){const mt=x[At],It=v[At];mt!==null&&It!==void 0&&It.update(mt,lt,c||a)}Lt&&Lt(K,lt),lt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:lt}),g=null}const re=new cd;re.setAnimationLoop(Vt),this.setAnimationLoop=function(K){Lt=K},this.dispose=function(){}}}const mi=new wn,ex=new ve;function nx(s,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,od(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,y,v,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,y,v):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Je&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Je&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=t.get(p),v=y.envMap,x=y.envMapRotation;v&&(m.envMap.value=v,mi.copy(x),mi.x*=-1,mi.y*=-1,mi.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(mi.y*=-1,mi.z*=-1),m.envMapRotation.value.setFromMatrix4(ex.makeRotationFromEuler(mi)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,y,v){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=v*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Je&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const y=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function ix(s,t,e,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,v){const x=v.program;n.uniformBlockBinding(y,x)}function c(y,v){let x=i[y.id];x===void 0&&(g(y),x=h(y),i[y.id]=x,y.addEventListener("dispose",m));const E=v.program;n.updateUBOMapping(y,E);const S=t.render.frame;r[y.id]!==S&&(u(y),r[y.id]=S)}function h(y){const v=d();y.__bindingPointIndex=v;const x=s.createBuffer(),E=y.__size,S=y.usage;return s.bindBuffer(s.UNIFORM_BUFFER,x),s.bufferData(s.UNIFORM_BUFFER,E,S),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,v,x),x}function d(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){const v=i[y.id],x=y.uniforms,E=y.__cache;s.bindBuffer(s.UNIFORM_BUFFER,v);for(let S=0,A=x.length;S<A;S++){const R=Array.isArray(x[S])?x[S]:[x[S]];for(let b=0,M=R.length;b<M;b++){const C=R[b];if(f(C,S,b,E)===!0){const I=C.__offset,N=Array.isArray(C.value)?C.value:[C.value];let G=0;for(let X=0;X<N.length;X++){const q=N[X],et=_(q);typeof q=="number"||typeof q=="boolean"?(C.__data[0]=q,s.bufferSubData(s.UNIFORM_BUFFER,I+G,C.__data)):q.isMatrix3?(C.__data[0]=q.elements[0],C.__data[1]=q.elements[1],C.__data[2]=q.elements[2],C.__data[3]=0,C.__data[4]=q.elements[3],C.__data[5]=q.elements[4],C.__data[6]=q.elements[5],C.__data[7]=0,C.__data[8]=q.elements[6],C.__data[9]=q.elements[7],C.__data[10]=q.elements[8],C.__data[11]=0):(q.toArray(C.__data,G),G+=et.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,I,C.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(y,v,x,E){const S=y.value,A=v+"_"+x;if(E[A]===void 0)return typeof S=="number"||typeof S=="boolean"?E[A]=S:E[A]=S.clone(),!0;{const R=E[A];if(typeof S=="number"||typeof S=="boolean"){if(R!==S)return E[A]=S,!0}else if(R.equals(S)===!1)return R.copy(S),!0}return!1}function g(y){const v=y.uniforms;let x=0;const E=16;for(let A=0,R=v.length;A<R;A++){const b=Array.isArray(v[A])?v[A]:[v[A]];for(let M=0,C=b.length;M<C;M++){const I=b[M],N=Array.isArray(I.value)?I.value:[I.value];for(let G=0,X=N.length;G<X;G++){const q=N[G],et=_(q),$=x%E,pt=$%et.boundary,St=$+pt;x+=pt,St!==0&&E-St<et.storage&&(x+=E-St),I.__data=new Float32Array(et.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=x,x+=et.storage}}}const S=x%E;return S>0&&(x+=E-S),y.__size=x,y.__cache={},this}function _(y){const v={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=48,v.storage=48):y.isMatrix4?(v.boundary=64,v.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),v}function m(y){const v=y.target;v.removeEventListener("dispose",m);const x=a.indexOf(v.__bindingPointIndex);a.splice(x,1),s.deleteBuffer(i[v.id]),delete i[v.id],delete r[v.id]}function p(){for(const y in i)s.deleteBuffer(i[y]);a=[],i={},r={}}return{bind:l,update:c,dispose:p}}class sx{constructor(t={}){const{canvas:e=qf(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const y=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ce,this.toneMapping=si,this.toneMappingExposure=1;const x=this;let E=!1,S=0,A=0,R=null,b=-1,M=null;const C=new ge,I=new ge;let N=null;const G=new zt(0);let X=0,q=e.width,et=e.height,$=1,pt=null,St=null;const Lt=new ge(0,0,q,et),Vt=new ge(0,0,q,et);let re=!1;const K=new Ll;let lt=!1,At=!1;const mt=new ve,It=new ve,Gt=new k,qt=new ge,oe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Yt=!1;function Ht(){return R===null?$:1}let z=n;function Ee(w,U){return e.getContext(w,U)}try{const w={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${bl}`),e.addEventListener("webglcontextlost",W,!1),e.addEventListener("webglcontextrestored",nt,!1),e.addEventListener("webglcontextcreationerror",rt,!1),z===null){const U="webgl2";if(z=Ee(U,w),z===null)throw Ee(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let te,jt,kt,ce,Rt,L,T,V,tt,it,Q,Ct,_t,yt,ee,at,bt,Pt,Bt,Mt,Wt,Xt,ne,B;function gt(){te=new c0(z),te.init(),Xt=new Y_(z,te),jt=new i0(z,te,t,Xt),kt=new X_(z,te),jt.reverseDepthBuffer&&u&&kt.buffers.depth.setReversed(!0),ce=new u0(z),Rt=new L_,L=new $_(z,te,kt,Rt,jt,Xt,ce),T=new r0(x),V=new l0(x),tt=new vp(z),ne=new e0(z,tt),it=new h0(z,tt,ce,ne),Q=new p0(z,it,tt,ce),Bt=new f0(z,jt,L),at=new s0(Rt),Ct=new C_(x,T,V,te,jt,ne,at),_t=new nx(x,Rt),yt=new U_,ee=new O_(te),Pt=new t0(x,T,V,kt,Q,f,l),bt=new V_(x,Q,jt),B=new ix(z,ce,jt,kt),Mt=new n0(z,te,ce),Wt=new d0(z,te,ce),ce.programs=Ct.programs,x.capabilities=jt,x.extensions=te,x.properties=Rt,x.renderLists=yt,x.shadowMap=bt,x.state=kt,x.info=ce}gt();const Y=new tx(x,z);this.xr=Y,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const w=te.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=te.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(w){w!==void 0&&($=w,this.setSize(q,et,!1))},this.getSize=function(w){return w.set(q,et)},this.setSize=function(w,U,F=!0){if(Y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=w,et=U,e.width=Math.floor(w*$),e.height=Math.floor(U*$),F===!0&&(e.style.width=w+"px",e.style.height=U+"px"),this.setViewport(0,0,w,U)},this.getDrawingBufferSize=function(w){return w.set(q*$,et*$).floor()},this.setDrawingBufferSize=function(w,U,F){q=w,et=U,$=F,e.width=Math.floor(w*F),e.height=Math.floor(U*F),this.setViewport(0,0,w,U)},this.getCurrentViewport=function(w){return w.copy(C)},this.getViewport=function(w){return w.copy(Lt)},this.setViewport=function(w,U,F,H){w.isVector4?Lt.set(w.x,w.y,w.z,w.w):Lt.set(w,U,F,H),kt.viewport(C.copy(Lt).multiplyScalar($).round())},this.getScissor=function(w){return w.copy(Vt)},this.setScissor=function(w,U,F,H){w.isVector4?Vt.set(w.x,w.y,w.z,w.w):Vt.set(w,U,F,H),kt.scissor(I.copy(Vt).multiplyScalar($).round())},this.getScissorTest=function(){return re},this.setScissorTest=function(w){kt.setScissorTest(re=w)},this.setOpaqueSort=function(w){pt=w},this.setTransparentSort=function(w){St=w},this.getClearColor=function(w){return w.copy(Pt.getClearColor())},this.setClearColor=function(){Pt.setClearColor.apply(Pt,arguments)},this.getClearAlpha=function(){return Pt.getClearAlpha()},this.setClearAlpha=function(){Pt.setClearAlpha.apply(Pt,arguments)},this.clear=function(w=!0,U=!0,F=!0){let H=0;if(w){let D=!1;if(R!==null){const J=R.texture.format;D=J===El||J===Tl||J===Sl}if(D){const J=R.texture.type,ct=J===Xn||J===Si||J===zs||J===rs||J===wl||J===yl,dt=Pt.getClearColor(),Tt=Pt.getClearAlpha(),Dt=dt.r,ot=dt.g,vt=dt.b;ct?(g[0]=Dt,g[1]=ot,g[2]=vt,g[3]=Tt,z.clearBufferuiv(z.COLOR,0,g)):(_[0]=Dt,_[1]=ot,_[2]=vt,_[3]=Tt,z.clearBufferiv(z.COLOR,0,_))}else H|=z.COLOR_BUFFER_BIT}U&&(H|=z.DEPTH_BUFFER_BIT),F&&(H|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",W,!1),e.removeEventListener("webglcontextrestored",nt,!1),e.removeEventListener("webglcontextcreationerror",rt,!1),yt.dispose(),ee.dispose(),Rt.dispose(),T.dispose(),V.dispose(),Q.dispose(),ne.dispose(),B.dispose(),Ct.dispose(),Y.dispose(),Y.removeEventListener("sessionstart",Sn),Y.removeEventListener("sessionend",dn),Xe.stop()};function W(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function nt(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const w=ce.autoReset,U=bt.enabled,F=bt.autoUpdate,H=bt.needsUpdate,D=bt.type;gt(),ce.autoReset=w,bt.enabled=U,bt.autoUpdate=F,bt.needsUpdate=H,bt.type=D}function rt(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function ft(w){const U=w.target;U.removeEventListener("dispose",ft),Ft(U)}function Ft(w){Kt(w),Rt.remove(w)}function Kt(w){const U=Rt.get(w).programs;U!==void 0&&(U.forEach(function(F){Ct.releaseProgram(F)}),w.isShaderMaterial&&Ct.releaseShaderCache(w))}this.renderBufferDirect=function(w,U,F,H,D,J){U===null&&(U=oe);const ct=D.isMesh&&D.matrixWorld.determinant()<0,dt=j(w,U,F,H,D);kt.setMaterial(H,ct);let Tt=F.index,Dt=1;if(H.wireframe===!0){if(Tt=it.getWireframeAttribute(F),Tt===void 0)return;Dt=2}const ot=F.drawRange,vt=F.attributes.position;let se=ot.start*Dt,ue=(ot.start+ot.count)*Dt;J!==null&&(se=Math.max(se,J.start*Dt),ue=Math.min(ue,(J.start+J.count)*Dt)),Tt!==null?(se=Math.max(se,0),ue=Math.min(ue,Tt.count)):vt!=null&&(se=Math.max(se,0),ue=Math.min(ue,vt.count));const _e=ue-se;if(_e<0||_e===1/0)return;ne.setup(D,H,dt,F,Tt);let Ye,he=Mt;if(Tt!==null&&(Ye=tt.get(Tt),he=Wt,he.setIndex(Ye)),D.isMesh)H.wireframe===!0?(kt.setLineWidth(H.wireframeLinewidth*Ht()),he.setMode(z.LINES)):he.setMode(z.TRIANGLES);else if(D.isLine){let Nt=H.linewidth;Nt===void 0&&(Nt=1),kt.setLineWidth(Nt*Ht()),D.isLineSegments?he.setMode(z.LINES):D.isLineLoop?he.setMode(z.LINE_LOOP):he.setMode(z.LINE_STRIP)}else D.isPoints?he.setMode(z.POINTS):D.isSprite&&he.setMode(z.TRIANGLES);if(D.isBatchedMesh)if(D._multiDrawInstances!==null)he.renderMultiDrawInstances(D._multiDrawStarts,D._multiDrawCounts,D._multiDrawCount,D._multiDrawInstances);else if(te.get("WEBGL_multi_draw"))he.renderMultiDraw(D._multiDrawStarts,D._multiDrawCounts,D._multiDrawCount);else{const Nt=D._multiDrawStarts,Un=D._multiDrawCounts,de=D._multiDrawCount,un=Tt?tt.get(Tt).bytesPerElement:1,Ri=Rt.get(H).currentProgram.getUniforms();for(let Qe=0;Qe<de;Qe++)Ri.setValue(z,"_gl_DrawID",Qe),he.render(Nt[Qe]/un,Un[Qe])}else if(D.isInstancedMesh)he.renderInstances(se,_e,D.count);else if(F.isInstancedBufferGeometry){const Nt=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,Un=Math.min(F.instanceCount,Nt);he.renderInstances(se,_e,Un)}else he.render(se,_e)};function ie(w,U,F){w.transparent===!0&&w.side===$t&&w.forceSinglePass===!1?(w.side=Je,w.needsUpdate=!0,Ai(w,U,F),w.side=ri,w.needsUpdate=!0,Ai(w,U,F),w.side=$t):Ai(w,U,F)}this.compile=function(w,U,F=null){F===null&&(F=w),p=ee.get(F),p.init(U),v.push(p),F.traverseVisible(function(D){D.isLight&&D.layers.test(U.layers)&&(p.pushLight(D),D.castShadow&&p.pushShadow(D))}),w!==F&&w.traverseVisible(function(D){D.isLight&&D.layers.test(U.layers)&&(p.pushLight(D),D.castShadow&&p.pushShadow(D))}),p.setupLights();const H=new Set;return w.traverse(function(D){if(!(D.isMesh||D.isPoints||D.isLine||D.isSprite))return;const J=D.material;if(J)if(Array.isArray(J))for(let ct=0;ct<J.length;ct++){const dt=J[ct];ie(dt,F,D),H.add(dt)}else ie(J,F,D),H.add(J)}),v.pop(),p=null,H},this.compileAsync=function(w,U,F=null){const H=this.compile(w,U,F);return new Promise(D=>{function J(){if(H.forEach(function(ct){Rt.get(ct).currentProgram.isReady()&&H.delete(ct)}),H.size===0){D(w);return}setTimeout(J,10)}te.get("KHR_parallel_shader_compile")!==null?J():setTimeout(J,10)})};let be=null;function Ie(w){be&&be(w)}function Sn(){Xe.stop()}function dn(){Xe.start()}const Xe=new cd;Xe.setAnimationLoop(Ie),typeof self<"u"&&Xe.setContext(self),this.setAnimationLoop=function(w){be=w,Y.setAnimationLoop(w),w===null?Xe.stop():Xe.start()},Y.addEventListener("sessionstart",Sn),Y.addEventListener("sessionend",dn),this.render=function(w,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(U),U=Y.getCamera()),w.isScene===!0&&w.onBeforeRender(x,w,U,R),p=ee.get(w,v.length),p.init(U),v.push(p),It.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),K.setFromProjectionMatrix(It),At=this.localClippingEnabled,lt=at.init(this.clippingPlanes,At),m=yt.get(w,y.length),m.init(),y.push(m),Y.enabled===!0&&Y.isPresenting===!0){const J=x.xr.getDepthSensingMesh();J!==null&&qe(J,U,-1/0,x.sortObjects)}qe(w,U,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(pt,St),Yt=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,Yt&&Pt.addToRenderList(m,w),this.info.render.frame++,lt===!0&&at.beginShadows();const F=p.state.shadowsArray;bt.render(F,w,U),lt===!0&&at.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=m.opaque,D=m.transmissive;if(p.setupLights(),U.isArrayCamera){const J=U.cameras;if(D.length>0)for(let ct=0,dt=J.length;ct<dt;ct++){const Tt=J[ct];Tn(H,D,w,Tt)}Yt&&Pt.render(w);for(let ct=0,dt=J.length;ct<dt;ct++){const Tt=J[ct];rn(m,w,Tt,Tt.viewport)}}else D.length>0&&Tn(H,D,w,U),Yt&&Pt.render(w),rn(m,w,U);R!==null&&(L.updateMultisampleRenderTarget(R),L.updateRenderTargetMipmap(R)),w.isScene===!0&&w.onAfterRender(x,w,U),ne.resetDefaultState(),b=-1,M=null,v.pop(),v.length>0?(p=v[v.length-1],lt===!0&&at.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,y.pop(),y.length>0?m=y[y.length-1]:m=null};function qe(w,U,F,H){if(w.visible===!1)return;if(w.layers.test(U.layers)){if(w.isGroup)F=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(U);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||K.intersectsSprite(w)){H&&qt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(It);const ct=Q.update(w),dt=w.material;dt.visible&&m.push(w,ct,dt,F,qt.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||K.intersectsObject(w))){const ct=Q.update(w),dt=w.material;if(H&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),qt.copy(w.boundingSphere.center)):(ct.boundingSphere===null&&ct.computeBoundingSphere(),qt.copy(ct.boundingSphere.center)),qt.applyMatrix4(w.matrixWorld).applyMatrix4(It)),Array.isArray(dt)){const Tt=ct.groups;for(let Dt=0,ot=Tt.length;Dt<ot;Dt++){const vt=Tt[Dt],se=dt[vt.materialIndex];se&&se.visible&&m.push(w,ct,se,F,qt.z,vt)}}else dt.visible&&m.push(w,ct,dt,F,qt.z,null)}}const J=w.children;for(let ct=0,dt=J.length;ct<dt;ct++)qe(J[ct],U,F,H)}function rn(w,U,F,H){const D=w.opaque,J=w.transmissive,ct=w.transparent;p.setupLightsView(F),lt===!0&&at.setGlobalState(x.clippingPlanes,F),H&&kt.viewport(C.copy(H)),D.length>0&&$e(D,U,F),J.length>0&&$e(J,U,F),ct.length>0&&$e(ct,U,F),kt.buffers.depth.setTest(!0),kt.buffers.depth.setMask(!0),kt.buffers.color.setMask(!0),kt.setPolygonOffset(!1)}function Tn(w,U,F,H){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[H.id]===void 0&&(p.state.transmissionRenderTarget[H.id]=new Ti(1,1,{generateMipmaps:!0,type:te.has("EXT_color_buffer_half_float")||te.has("EXT_color_buffer_float")?$s:Xn,minFilter:vn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ae.workingColorSpace}));const J=p.state.transmissionRenderTarget[H.id],ct=H.viewport||C;J.setSize(ct.z,ct.w);const dt=x.getRenderTarget();x.setRenderTarget(J),x.getClearColor(G),X=x.getClearAlpha(),X<1&&x.setClearColor(16777215,.5),x.clear(),Yt&&Pt.render(F);const Tt=x.toneMapping;x.toneMapping=si;const Dt=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),p.setupLightsView(H),lt===!0&&at.setGlobalState(x.clippingPlanes,H),$e(w,F,H),L.updateMultisampleRenderTarget(J),L.updateRenderTargetMipmap(J),te.has("WEBGL_multisampled_render_to_texture")===!1){let ot=!1;for(let vt=0,se=U.length;vt<se;vt++){const ue=U[vt],_e=ue.object,Ye=ue.geometry,he=ue.material,Nt=ue.group;if(he.side===$t&&_e.layers.test(H.layers)){const Un=he.side;he.side=Je,he.needsUpdate=!0,tr(_e,F,H,Ye,he,Nt),he.side=Un,he.needsUpdate=!0,ot=!0}}ot===!0&&(L.updateMultisampleRenderTarget(J),L.updateRenderTargetMipmap(J))}x.setRenderTarget(dt),x.setClearColor(G,X),Dt!==void 0&&(H.viewport=Dt),x.toneMapping=Tt}function $e(w,U,F){const H=U.isScene===!0?U.overrideMaterial:null;for(let D=0,J=w.length;D<J;D++){const ct=w[D],dt=ct.object,Tt=ct.geometry,Dt=H===null?ct.material:H,ot=ct.group;dt.layers.test(F.layers)&&tr(dt,U,F,Tt,Dt,ot)}}function tr(w,U,F,H,D,J){w.onBeforeRender(x,U,F,H,D,J),w.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),D.onBeforeRender(x,U,F,H,w,J),D.transparent===!0&&D.side===$t&&D.forceSinglePass===!1?(D.side=Je,D.needsUpdate=!0,x.renderBufferDirect(F,U,H,D,w,J),D.side=ri,D.needsUpdate=!0,x.renderBufferDirect(F,U,H,D,w,J),D.side=$t):x.renderBufferDirect(F,U,H,D,w,J),w.onAfterRender(x,U,F,H,D,J)}function Ai(w,U,F){U.isScene!==!0&&(U=oe);const H=Rt.get(w),D=p.state.lights,J=p.state.shadowsArray,ct=D.state.version,dt=Ct.getParameters(w,D.state,J,U,F),Tt=Ct.getProgramCacheKey(dt);let Dt=H.programs;H.environment=w.isMeshStandardMaterial?U.environment:null,H.fog=U.fog,H.envMap=(w.isMeshStandardMaterial?V:T).get(w.envMap||H.environment),H.envMapRotation=H.environment!==null&&w.envMap===null?U.environmentRotation:w.envMapRotation,Dt===void 0&&(w.addEventListener("dispose",ft),Dt=new Map,H.programs=Dt);let ot=Dt.get(Tt);if(ot!==void 0){if(H.currentProgram===ot&&H.lightsStateVersion===ct)return O(w,dt),ot}else dt.uniforms=Ct.getUniforms(w),w.onBeforeCompile(dt,x),ot=Ct.acquireProgram(dt,Tt),Dt.set(Tt,ot),H.uniforms=dt.uniforms;const vt=H.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(vt.clippingPlanes=at.uniform),O(w,dt),H.needsLights=st(w),H.lightsStateVersion=ct,H.needsLights&&(vt.ambientLightColor.value=D.state.ambient,vt.lightProbe.value=D.state.probe,vt.directionalLights.value=D.state.directional,vt.directionalLightShadows.value=D.state.directionalShadow,vt.spotLights.value=D.state.spot,vt.spotLightShadows.value=D.state.spotShadow,vt.rectAreaLights.value=D.state.rectArea,vt.ltc_1.value=D.state.rectAreaLTC1,vt.ltc_2.value=D.state.rectAreaLTC2,vt.pointLights.value=D.state.point,vt.pointLightShadows.value=D.state.pointShadow,vt.hemisphereLights.value=D.state.hemi,vt.directionalShadowMap.value=D.state.directionalShadowMap,vt.directionalShadowMatrix.value=D.state.directionalShadowMatrix,vt.spotShadowMap.value=D.state.spotShadowMap,vt.spotLightMatrix.value=D.state.spotLightMatrix,vt.spotLightMap.value=D.state.spotLightMap,vt.pointShadowMap.value=D.state.pointShadowMap,vt.pointShadowMatrix.value=D.state.pointShadowMatrix),H.currentProgram=ot,H.uniformsList=null,ot}function ci(w){if(w.uniformsList===null){const U=w.currentProgram.getUniforms();w.uniformsList=Yr.seqWithValue(U.seq,w.uniforms)}return w.uniformsList}function O(w,U){const F=Rt.get(w);F.outputColorSpace=U.outputColorSpace,F.batching=U.batching,F.batchingColor=U.batchingColor,F.instancing=U.instancing,F.instancingColor=U.instancingColor,F.instancingMorph=U.instancingMorph,F.skinning=U.skinning,F.morphTargets=U.morphTargets,F.morphNormals=U.morphNormals,F.morphColors=U.morphColors,F.morphTargetsCount=U.morphTargetsCount,F.numClippingPlanes=U.numClippingPlanes,F.numIntersection=U.numClipIntersection,F.vertexAlphas=U.vertexAlphas,F.vertexTangents=U.vertexTangents,F.toneMapping=U.toneMapping}function j(w,U,F,H,D){U.isScene!==!0&&(U=oe),L.resetTextureUnits();const J=U.fog,ct=H.isMeshStandardMaterial?U.environment:null,dt=R===null?x.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:cs,Tt=(H.isMeshStandardMaterial?V:T).get(H.envMap||ct),Dt=H.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,ot=!!F.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),vt=!!F.morphAttributes.position,se=!!F.morphAttributes.normal,ue=!!F.morphAttributes.color;let _e=si;H.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(_e=x.toneMapping);const Ye=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,he=Ye!==void 0?Ye.length:0,Nt=Rt.get(H),Un=p.state.lights;if(lt===!0&&(At===!0||w!==M)){const on=w===M&&H.id===b;at.setState(H,w,on)}let de=!1;H.version===Nt.__version?(Nt.needsLights&&Nt.lightsStateVersion!==Un.state.version||Nt.outputColorSpace!==dt||D.isBatchedMesh&&Nt.batching===!1||!D.isBatchedMesh&&Nt.batching===!0||D.isBatchedMesh&&Nt.batchingColor===!0&&D.colorTexture===null||D.isBatchedMesh&&Nt.batchingColor===!1&&D.colorTexture!==null||D.isInstancedMesh&&Nt.instancing===!1||!D.isInstancedMesh&&Nt.instancing===!0||D.isSkinnedMesh&&Nt.skinning===!1||!D.isSkinnedMesh&&Nt.skinning===!0||D.isInstancedMesh&&Nt.instancingColor===!0&&D.instanceColor===null||D.isInstancedMesh&&Nt.instancingColor===!1&&D.instanceColor!==null||D.isInstancedMesh&&Nt.instancingMorph===!0&&D.morphTexture===null||D.isInstancedMesh&&Nt.instancingMorph===!1&&D.morphTexture!==null||Nt.envMap!==Tt||H.fog===!0&&Nt.fog!==J||Nt.numClippingPlanes!==void 0&&(Nt.numClippingPlanes!==at.numPlanes||Nt.numIntersection!==at.numIntersection)||Nt.vertexAlphas!==Dt||Nt.vertexTangents!==ot||Nt.morphTargets!==vt||Nt.morphNormals!==se||Nt.morphColors!==ue||Nt.toneMapping!==_e||Nt.morphTargetsCount!==he)&&(de=!0):(de=!0,Nt.__version=H.version);let un=Nt.currentProgram;de===!0&&(un=Ai(H,U,D));let Ri=!1,Qe=!1,fs=!1;const Me=un.getUniforms(),En=Nt.uniforms;if(kt.useProgram(un.program)&&(Ri=!0,Qe=!0,fs=!0),H.id!==b&&(b=H.id,Qe=!0),Ri||M!==w){kt.buffers.depth.getReversed()?(mt.copy(w.projectionMatrix),Yf(mt),jf(mt),Me.setValue(z,"projectionMatrix",mt)):Me.setValue(z,"projectionMatrix",w.projectionMatrix),Me.setValue(z,"viewMatrix",w.matrixWorldInverse);const $n=Me.map.cameraPosition;$n!==void 0&&$n.setValue(z,Gt.setFromMatrixPosition(w.matrixWorld)),jt.logarithmicDepthBuffer&&Me.setValue(z,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&Me.setValue(z,"isOrthographic",w.isOrthographicCamera===!0),M!==w&&(M=w,Qe=!0,fs=!0)}if(D.isSkinnedMesh){Me.setOptional(z,D,"bindMatrix"),Me.setOptional(z,D,"bindMatrixInverse");const on=D.skeleton;on&&(on.boneTexture===null&&on.computeBoneTexture(),Me.setValue(z,"boneTexture",on.boneTexture,L))}D.isBatchedMesh&&(Me.setOptional(z,D,"batchingTexture"),Me.setValue(z,"batchingTexture",D._matricesTexture,L),Me.setOptional(z,D,"batchingIdTexture"),Me.setValue(z,"batchingIdTexture",D._indirectTexture,L),Me.setOptional(z,D,"batchingColorTexture"),D._colorsTexture!==null&&Me.setValue(z,"batchingColorTexture",D._colorsTexture,L));const ps=F.morphAttributes;if((ps.position!==void 0||ps.normal!==void 0||ps.color!==void 0)&&Bt.update(D,F,un),(Qe||Nt.receiveShadow!==D.receiveShadow)&&(Nt.receiveShadow=D.receiveShadow,Me.setValue(z,"receiveShadow",D.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(En.envMap.value=Tt,En.flipEnvMap.value=Tt.isCubeTexture&&Tt.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&U.environment!==null&&(En.envMapIntensity.value=U.environmentIntensity),Qe&&(Me.setValue(z,"toneMappingExposure",x.toneMappingExposure),Nt.needsLights&&Et(En,fs),J&&H.fog===!0&&_t.refreshFogUniforms(En,J),_t.refreshMaterialUniforms(En,H,$,et,p.state.transmissionRenderTarget[w.id]),Yr.upload(z,ci(Nt),En,L)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Yr.upload(z,ci(Nt),En,L),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&Me.setValue(z,"center",D.center),Me.setValue(z,"modelViewMatrix",D.modelViewMatrix),Me.setValue(z,"normalMatrix",D.normalMatrix),Me.setValue(z,"modelMatrix",D.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const on=H.uniformsGroups;for(let $n=0,Yn=on.length;$n<Yn;$n++){const Xl=on[$n];B.update(Xl,un),B.bind(Xl,un)}}return un}function Et(w,U){w.ambientLightColor.needsUpdate=U,w.lightProbe.needsUpdate=U,w.directionalLights.needsUpdate=U,w.directionalLightShadows.needsUpdate=U,w.pointLights.needsUpdate=U,w.pointLightShadows.needsUpdate=U,w.spotLights.needsUpdate=U,w.spotLightShadows.needsUpdate=U,w.rectAreaLights.needsUpdate=U,w.hemisphereLights.needsUpdate=U}function st(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return S},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(w,U,F){Rt.get(w.texture).__webglTexture=U,Rt.get(w.depthTexture).__webglTexture=F;const H=Rt.get(w);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=F===void 0,H.__autoAllocateDepthBuffer||te.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,U){const F=Rt.get(w);F.__webglFramebuffer=U,F.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(w,U=0,F=0){R=w,S=U,A=F;let H=!0,D=null,J=!1,ct=!1;if(w){const Tt=Rt.get(w);if(Tt.__useDefaultFramebuffer!==void 0)kt.bindFramebuffer(z.FRAMEBUFFER,null),H=!1;else if(Tt.__webglFramebuffer===void 0)L.setupRenderTarget(w);else if(Tt.__hasExternalTextures)L.rebindTextures(w,Rt.get(w.texture).__webglTexture,Rt.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const vt=w.depthTexture;if(Tt.__boundDepthTexture!==vt){if(vt!==null&&Rt.has(vt)&&(w.width!==vt.image.width||w.height!==vt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");L.setupDepthRenderbuffer(w)}}const Dt=w.texture;(Dt.isData3DTexture||Dt.isDataArrayTexture||Dt.isCompressedArrayTexture)&&(ct=!0);const ot=Rt.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(ot[U])?D=ot[U][F]:D=ot[U],J=!0):w.samples>0&&L.useMultisampledRTT(w)===!1?D=Rt.get(w).__webglMultisampledFramebuffer:Array.isArray(ot)?D=ot[F]:D=ot,C.copy(w.viewport),I.copy(w.scissor),N=w.scissorTest}else C.copy(Lt).multiplyScalar($).floor(),I.copy(Vt).multiplyScalar($).floor(),N=re;if(kt.bindFramebuffer(z.FRAMEBUFFER,D)&&H&&kt.drawBuffers(w,D),kt.viewport(C),kt.scissor(I),kt.setScissorTest(N),J){const Tt=Rt.get(w.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+U,Tt.__webglTexture,F)}else if(ct){const Tt=Rt.get(w.texture),Dt=U||0;z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,Tt.__webglTexture,F||0,Dt)}b=-1},this.readRenderTargetPixels=function(w,U,F,H,D,J,ct){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let dt=Rt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ct!==void 0&&(dt=dt[ct]),dt){kt.bindFramebuffer(z.FRAMEBUFFER,dt);try{const Tt=w.texture,Dt=Tt.format,ot=Tt.type;if(!jt.textureFormatReadable(Dt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!jt.textureTypeReadable(ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=w.width-H&&F>=0&&F<=w.height-D&&z.readPixels(U,F,H,D,Xt.convert(Dt),Xt.convert(ot),J)}finally{const Tt=R!==null?Rt.get(R).__webglFramebuffer:null;kt.bindFramebuffer(z.FRAMEBUFFER,Tt)}}},this.readRenderTargetPixelsAsync=async function(w,U,F,H,D,J,ct){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let dt=Rt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ct!==void 0&&(dt=dt[ct]),dt){const Tt=w.texture,Dt=Tt.format,ot=Tt.type;if(!jt.textureFormatReadable(Dt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!jt.textureTypeReadable(ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=w.width-H&&F>=0&&F<=w.height-D){kt.bindFramebuffer(z.FRAMEBUFFER,dt);const vt=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,vt),z.bufferData(z.PIXEL_PACK_BUFFER,J.byteLength,z.STREAM_READ),z.readPixels(U,F,H,D,Xt.convert(Dt),Xt.convert(ot),0);const se=R!==null?Rt.get(R).__webglFramebuffer:null;kt.bindFramebuffer(z.FRAMEBUFFER,se);const ue=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await $f(z,ue,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,vt),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,J),z.deleteBuffer(vt),z.deleteSync(ue),J}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,U=null,F=0){w.isTexture!==!0&&(Cs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,w=arguments[1]);const H=Math.pow(2,-F),D=Math.floor(w.image.width*H),J=Math.floor(w.image.height*H),ct=U!==null?U.x:0,dt=U!==null?U.y:0;L.setTexture2D(w,0),z.copyTexSubImage2D(z.TEXTURE_2D,F,0,0,ct,dt,D,J),kt.unbindTexture()},this.copyTextureToTexture=function(w,U,F=null,H=null,D=0){w.isTexture!==!0&&(Cs("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,w=arguments[1],U=arguments[2],D=arguments[3]||0,F=null);let J,ct,dt,Tt,Dt,ot,vt,se,ue;const _e=w.isCompressedTexture?w.mipmaps[D]:w.image;F!==null?(J=F.max.x-F.min.x,ct=F.max.y-F.min.y,dt=F.isBox3?F.max.z-F.min.z:1,Tt=F.min.x,Dt=F.min.y,ot=F.isBox3?F.min.z:0):(J=_e.width,ct=_e.height,dt=_e.depth||1,Tt=0,Dt=0,ot=0),H!==null?(vt=H.x,se=H.y,ue=H.z):(vt=0,se=0,ue=0);const Ye=Xt.convert(U.format),he=Xt.convert(U.type);let Nt;U.isData3DTexture?(L.setTexture3D(U,0),Nt=z.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(L.setTexture2DArray(U,0),Nt=z.TEXTURE_2D_ARRAY):(L.setTexture2D(U,0),Nt=z.TEXTURE_2D),z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,U.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,U.unpackAlignment);const Un=z.getParameter(z.UNPACK_ROW_LENGTH),de=z.getParameter(z.UNPACK_IMAGE_HEIGHT),un=z.getParameter(z.UNPACK_SKIP_PIXELS),Ri=z.getParameter(z.UNPACK_SKIP_ROWS),Qe=z.getParameter(z.UNPACK_SKIP_IMAGES);z.pixelStorei(z.UNPACK_ROW_LENGTH,_e.width),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,_e.height),z.pixelStorei(z.UNPACK_SKIP_PIXELS,Tt),z.pixelStorei(z.UNPACK_SKIP_ROWS,Dt),z.pixelStorei(z.UNPACK_SKIP_IMAGES,ot);const fs=w.isDataArrayTexture||w.isData3DTexture,Me=U.isDataArrayTexture||U.isData3DTexture;if(w.isRenderTargetTexture||w.isDepthTexture){const En=Rt.get(w),ps=Rt.get(U),on=Rt.get(En.__renderTarget),$n=Rt.get(ps.__renderTarget);kt.bindFramebuffer(z.READ_FRAMEBUFFER,on.__webglFramebuffer),kt.bindFramebuffer(z.DRAW_FRAMEBUFFER,$n.__webglFramebuffer);for(let Yn=0;Yn<dt;Yn++)fs&&z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Rt.get(w).__webglTexture,D,ot+Yn),w.isDepthTexture?(Me&&z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Rt.get(U).__webglTexture,D,ue+Yn),z.blitFramebuffer(Tt,Dt,J,ct,vt,se,J,ct,z.DEPTH_BUFFER_BIT,z.NEAREST)):Me?z.copyTexSubImage3D(Nt,D,vt,se,ue+Yn,Tt,Dt,J,ct):z.copyTexSubImage2D(Nt,D,vt,se,ue+Yn,Tt,Dt,J,ct);kt.bindFramebuffer(z.READ_FRAMEBUFFER,null),kt.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else Me?w.isDataTexture||w.isData3DTexture?z.texSubImage3D(Nt,D,vt,se,ue,J,ct,dt,Ye,he,_e.data):U.isCompressedArrayTexture?z.compressedTexSubImage3D(Nt,D,vt,se,ue,J,ct,dt,Ye,_e.data):z.texSubImage3D(Nt,D,vt,se,ue,J,ct,dt,Ye,he,_e):w.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,D,vt,se,J,ct,Ye,he,_e.data):w.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,D,vt,se,_e.width,_e.height,Ye,_e.data):z.texSubImage2D(z.TEXTURE_2D,D,vt,se,J,ct,Ye,he,_e);z.pixelStorei(z.UNPACK_ROW_LENGTH,Un),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,de),z.pixelStorei(z.UNPACK_SKIP_PIXELS,un),z.pixelStorei(z.UNPACK_SKIP_ROWS,Ri),z.pixelStorei(z.UNPACK_SKIP_IMAGES,Qe),D===0&&U.generateMipmaps&&z.generateMipmap(Nt),kt.unbindTexture()},this.copyTextureToTexture3D=function(w,U,F=null,H=null,D=0){return w.isTexture!==!0&&(Cs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),F=arguments[0]||null,H=arguments[1]||null,w=arguments[2],U=arguments[3],D=arguments[4]||0),Cs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,U,F,H,D)},this.initRenderTarget=function(w){Rt.get(w).__webglFramebuffer===void 0&&L.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?L.setTextureCube(w,0):w.isData3DTexture?L.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?L.setTexture2DArray(w,0):L.setTexture2D(w,0),kt.unbindTexture()},this.resetState=function(){S=0,A=0,R=null,kt.reset(),ne.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Gn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=ae._getDrawingBufferColorSpace(t),e.unpackColorSpace=ae._getUnpackColorSpace()}}class Ul{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new zt(t),this.density=e}clone(){return new Ul(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class wi{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new zt(t),this.near=e,this.far=n}clone(){return new wi(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class rx extends Le{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new wn,this.environmentIntensity=1,this.environmentRotation=new wn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class ox{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=ll,this.updateRanges=[],this.version=0,this.uuid=Vn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Vn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Vn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const je=new k;class no{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)je.fromBufferAttribute(this,e),je.applyMatrix4(t),this.setXYZ(e,je.x,je.y,je.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)je.fromBufferAttribute(this,e),je.applyNormalMatrix(t),this.setXYZ(e,je.x,je.y,je.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)je.fromBufferAttribute(this,e),je.transformDirection(t),this.setXYZ(e,je.x,je.y,je.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Cn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=me(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=me(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=me(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=me(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=me(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Cn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Cn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Cn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Cn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=me(e,this.array),n=me(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=me(e,this.array),n=me(n,this.array),i=me(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=me(e,this.array),n=me(n,this.array),i=me(i,this.array),r=me(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new Ge(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new no(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class jr extends li{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new zt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Vi;const vs=new k,Wi=new k,Xi=new k,qi=new wt,bs=new wt,gd=new ve,wr=new k,Ms=new k,yr=new k,Gc=new wt,jo=new wt,Vc=new wt;class Zo extends Le{constructor(t=new jr){if(super(),this.isSprite=!0,this.type="Sprite",Vi===void 0){Vi=new Te;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new ox(e,5);Vi.setIndex([0,1,2,0,2,3]),Vi.setAttribute("position",new no(n,3,0,!1)),Vi.setAttribute("uv",new no(n,2,3,!1))}this.geometry=Vi,this.material=t,this.center=new wt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Wi.setFromMatrixScale(this.matrixWorld),gd.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Xi.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Wi.multiplyScalar(-Xi.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const a=this.center;Sr(wr.set(-.5,-.5,0),Xi,a,Wi,i,r),Sr(Ms.set(.5,-.5,0),Xi,a,Wi,i,r),Sr(yr.set(.5,.5,0),Xi,a,Wi,i,r),Gc.set(0,0),jo.set(1,0),Vc.set(1,1);let o=t.ray.intersectTriangle(wr,Ms,yr,!1,vs);if(o===null&&(Sr(Ms.set(-.5,.5,0),Xi,a,Wi,i,r),jo.set(0,1),o=t.ray.intersectTriangle(wr,yr,Ms,!1,vs),o===null))return;const l=t.ray.origin.distanceTo(vs);l<t.near||l>t.far||e.push({distance:l,point:vs.clone(),uv:hn.getInterpolation(vs,wr,Ms,yr,Gc,jo,Vc,new wt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Sr(s,t,e,n,i,r){qi.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(bs.x=r*qi.x-i*qi.y,bs.y=i*qi.x+r*qi.y):bs.copy(qi),s.copy(t),s.x+=bs.x,s.y+=bs.y,s.applyMatrix4(gd)}class _d extends li{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new zt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Wc=new ve,dl=new Rl,Tr=new fo,Er=new k;class ax extends Le{constructor(t=new Te,e=new _d){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Tr.copy(n.boundingSphere),Tr.applyMatrix4(i),Tr.radius+=r,t.ray.intersectsSphere(Tr)===!1)return;Wc.copy(i).invert(),dl.copy(t.ray).applyMatrix4(Wc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){const u=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=u,_=f;g<_;g++){const m=c.getX(g);Er.fromBufferAttribute(d,m),Xc(Er,m,l,i,t,e,this)}}else{const u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let g=u,_=f;g<_;g++)Er.fromBufferAttribute(d,g),Xc(Er,g,l,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Xc(s,t,e,n,i,r,a){const o=dl.distanceSqToPoint(s);if(o<e){const l=new k;dl.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class _n extends We{constructor(t,e,n,i,r,a,o,l,c){super(t,e,n,i,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ln{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);const h=n[i],u=n[i+1]-h,f=(a-h)/u;return(i+f)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const a=this.getPoint(i),o=this.getPoint(r),l=e||(a.isVector2?new wt:new k);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new k,i=[],r=[],a=[],o=new k,l=new ve;for(let f=0;f<=t;f++){const g=f/t;i[f]=this.getTangentAt(g,new k)}r[0]=new k,a[0]=new k;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),d=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(He(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(i[f],r[f])}if(e===!0){let f=Math.acos(He(r[0].dot(r[t]),-1,1));f/=t,i[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(i[g],f*g)),a[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Dl extends Ln{constructor(t=0,e=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new wt){const n=e,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class lx extends Dl{constructor(t,e,n,i,r,a){super(t,e,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Il(){let s=0,t=0,e=0,n=0;function i(r,a,o,l){s=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){i(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,d){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+d)+(l-o)/d;u*=h,f*=h,i(a,o,u,f)},calc:function(r){const a=r*r,o=a*r;return s+t*r+e*a+n*o}}}const Ar=new k,Ko=new Il,Jo=new Il,Qo=new Il;class cx extends Ln{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new k){const n=e,i=this.points,r=i.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%r]:(Ar.subVectors(i[0],i[1]).add(i[0]),c=Ar);const d=i[o%r],u=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(Ar.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Ar),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Ko.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,g,_,m),Jo.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,g,_,m),Qo.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(Ko.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),Jo.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),Qo.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(Ko.calc(l),Jo.calc(l),Qo.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new k().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function qc(s,t,e,n,i){const r=(n-t)*.5,a=(i-e)*.5,o=s*s,l=s*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*s+e}function hx(s,t){const e=1-s;return e*e*t}function dx(s,t){return 2*(1-s)*s*t}function ux(s,t){return s*s*t}function Ds(s,t,e,n){return hx(s,t)+dx(s,e)+ux(s,n)}function fx(s,t){const e=1-s;return e*e*e*t}function px(s,t){const e=1-s;return 3*e*e*s*t}function mx(s,t){return 3*(1-s)*s*s*t}function gx(s,t){return s*s*s*t}function Is(s,t,e,n,i){return fx(s,t)+px(s,e)+mx(s,n)+gx(s,i)}class xd extends Ln{constructor(t=new wt,e=new wt,n=new wt,i=new wt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new wt){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Is(t,i.x,r.x,a.x,o.x),Is(t,i.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class _x extends Ln{constructor(t=new k,e=new k,n=new k,i=new k){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new k){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Is(t,i.x,r.x,a.x,o.x),Is(t,i.y,r.y,a.y,o.y),Is(t,i.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class vd extends Ln{constructor(t=new wt,e=new wt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new wt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new wt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class xx extends Ln{constructor(t=new k,e=new k){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new k){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new k){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class bd extends Ln{constructor(t=new wt,e=new wt,n=new wt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new wt){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(Ds(t,i.x,r.x,a.x),Ds(t,i.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class vx extends Ln{constructor(t=new k,e=new k,n=new k){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new k){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(Ds(t,i.x,r.x,a.x),Ds(t,i.y,r.y,a.y),Ds(t,i.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Md extends Ln{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new wt){const n=e,i=this.points,r=(i.length-1)*t,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],d=i[a>i.length-3?i.length-1:a+2];return n.set(qc(o,l.x,c.x,h.x,d.x),qc(o,l.y,c.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new wt().fromArray(i))}return this}}var $c=Object.freeze({__proto__:null,ArcCurve:lx,CatmullRomCurve3:cx,CubicBezierCurve:xd,CubicBezierCurve3:_x,EllipseCurve:Dl,LineCurve:vd,LineCurve3:xx,QuadraticBezierCurve:bd,QuadraticBezierCurve3:vx,SplineCurve:Md});class bx extends Ln{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new $c[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const a=i[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const a=r[i],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new $c[i.type]().fromJSON(i))}return this}}class ul extends bx{constructor(t){super(),this.type="Path",this.currentPoint=new wt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new vd(this.currentPoint.clone(),new wt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const r=new bd(this.currentPoint.clone(),new wt(t,e),new wt(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,a){const o=new xd(this.currentPoint.clone(),new wt(t,e),new wt(n,i),new wt(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Md(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,i,r,a),this}absarc(t,e,n,i,r,a){return this.absellipse(t,e,n,n,i,r,a),this}ellipse(t,e,n,i,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,r,a,o,l),this}absellipse(t,e,n,i,r,a,o,l){const c=new Dl(t,e,n,i,r,a,o,l);if(this.curves.length>0){const d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class ks extends Te{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],a=[],o=[],l=[],c=new k,h=new wt;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){const f=n+d/e*i;c.x=t*Math.cos(f),c.y=t*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/t+1)/2,h.y=(a[u+1]/t+1)/2,l.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new le(a,3)),this.setAttribute("normal",new le(o,3)),this.setAttribute("uv",new le(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ks(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class xe extends Te{constructor(t=1,e=1,n=1,i=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],d=[],u=[],f=[];let g=0;const _=[],m=n/2;let p=0;y(),a===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new le(d,3)),this.setAttribute("normal",new le(u,3)),this.setAttribute("uv",new le(f,2));function y(){const x=new k,E=new k;let S=0;const A=(e-t)/n;for(let R=0;R<=r;R++){const b=[],M=R/r,C=M*(e-t)+t;for(let I=0;I<=i;I++){const N=I/i,G=N*l+o,X=Math.sin(G),q=Math.cos(G);E.x=C*X,E.y=-M*n+m,E.z=C*q,d.push(E.x,E.y,E.z),x.set(X,A,q).normalize(),u.push(x.x,x.y,x.z),f.push(N,1-M),b.push(g++)}_.push(b)}for(let R=0;R<i;R++)for(let b=0;b<r;b++){const M=_[b][R],C=_[b+1][R],I=_[b+1][R+1],N=_[b][R+1];(t>0||b!==0)&&(h.push(M,C,N),S+=3),(e>0||b!==r-1)&&(h.push(C,I,N),S+=3)}c.addGroup(p,S,0),p+=S}function v(x){const E=g,S=new wt,A=new k;let R=0;const b=x===!0?t:e,M=x===!0?1:-1;for(let I=1;I<=i;I++)d.push(0,m*M,0),u.push(0,M,0),f.push(.5,.5),g++;const C=g;for(let I=0;I<=i;I++){const G=I/i*l+o,X=Math.cos(G),q=Math.sin(G);A.x=b*q,A.y=m*M,A.z=b*X,d.push(A.x,A.y,A.z),u.push(0,M,0),S.x=X*.5+.5,S.y=q*.5*M+.5,f.push(S.x,S.y),g++}for(let I=0;I<i;I++){const N=E+I,G=C+I;x===!0?h.push(G,G+1,N):h.push(G+1,G,N),R+=3}c.addGroup(p,R,x===!0?1:2),p+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xe(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Bn extends xe{constructor(t=1,e=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new Bn(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class kl extends Te{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const r=[],a=[];o(i),c(n),h(),this.setAttribute("position",new le(r,3)),this.setAttribute("normal",new le(r.slice(),3)),this.setAttribute("uv",new le(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(y){const v=new k,x=new k,E=new k;for(let S=0;S<e.length;S+=3)f(e[S+0],v),f(e[S+1],x),f(e[S+2],E),l(v,x,E,y)}function l(y,v,x,E){const S=E+1,A=[];for(let R=0;R<=S;R++){A[R]=[];const b=y.clone().lerp(x,R/S),M=v.clone().lerp(x,R/S),C=S-R;for(let I=0;I<=C;I++)I===0&&R===S?A[R][I]=b:A[R][I]=b.clone().lerp(M,I/C)}for(let R=0;R<S;R++)for(let b=0;b<2*(S-R)-1;b++){const M=Math.floor(b/2);b%2===0?(u(A[R][M+1]),u(A[R+1][M]),u(A[R][M])):(u(A[R][M+1]),u(A[R+1][M+1]),u(A[R+1][M]))}}function c(y){const v=new k;for(let x=0;x<r.length;x+=3)v.x=r[x+0],v.y=r[x+1],v.z=r[x+2],v.normalize().multiplyScalar(y),r[x+0]=v.x,r[x+1]=v.y,r[x+2]=v.z}function h(){const y=new k;for(let v=0;v<r.length;v+=3){y.x=r[v+0],y.y=r[v+1],y.z=r[v+2];const x=m(y)/2/Math.PI+.5,E=p(y)/Math.PI+.5;a.push(x,1-E)}g(),d()}function d(){for(let y=0;y<a.length;y+=6){const v=a[y+0],x=a[y+2],E=a[y+4],S=Math.max(v,x,E),A=Math.min(v,x,E);S>.9&&A<.1&&(v<.2&&(a[y+0]+=1),x<.2&&(a[y+2]+=1),E<.2&&(a[y+4]+=1))}}function u(y){r.push(y.x,y.y,y.z)}function f(y,v){const x=y*3;v.x=t[x+0],v.y=t[x+1],v.z=t[x+2]}function g(){const y=new k,v=new k,x=new k,E=new k,S=new wt,A=new wt,R=new wt;for(let b=0,M=0;b<r.length;b+=9,M+=6){y.set(r[b+0],r[b+1],r[b+2]),v.set(r[b+3],r[b+4],r[b+5]),x.set(r[b+6],r[b+7],r[b+8]),S.set(a[M+0],a[M+1]),A.set(a[M+2],a[M+3]),R.set(a[M+4],a[M+5]),E.copy(y).add(v).add(x).divideScalar(3);const C=m(E);_(S,M+0,y,C),_(A,M+2,v,C),_(R,M+4,x,C)}}function _(y,v,x,E){E<0&&y.x===1&&(a[v]=y.x-1),x.x===0&&x.z===0&&(a[v]=E/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new kl(t.vertices,t.indices,t.radius,t.details)}}class Nl extends kl{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Nl(t.radius,t.detail)}}class wd extends ul{constructor(t){super(t),this.uuid=Vn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new ul().fromJSON(i))}return this}}const Mx={triangulate:function(s,t,e=2){const n=t&&t.length,i=n?t[0]*e:s.length;let r=yd(s,0,i,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c,h,d,u,f;if(n&&(r=Ex(s,t,r,e)),s.length>80*e){o=c=s[0],l=h=s[1];for(let g=e;g<i;g+=e)d=s[g],u=s[g+1],d<o&&(o=d),u<l&&(l=u),d>c&&(c=d),u>h&&(h=u);f=Math.max(c-o,h-l),f=f!==0?32767/f:0}return Hs(r,a,e,o,l,f,0),a}};function yd(s,t,e,n,i){let r,a;if(i===Fx(s,t,e,n)>0)for(r=t;r<e;r+=n)a=Yc(r,s[r],s[r+1],a);else for(r=e-n;r>=t;r-=n)a=Yc(r,s[r],s[r+1],a);return a&&mo(a,a.next)&&(Vs(a),a=a.next),a}function Ei(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(mo(e,e.next)||Se(e.prev,e,e.next)===0)){if(Vs(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Hs(s,t,e,n,i,r,a){if(!s)return;!a&&r&&Px(s,n,i,r);let o=s,l,c;for(;s.prev!==s.next;){if(l=s.prev,c=s.next,r?yx(s,n,i,r):wx(s)){t.push(l.i/e|0),t.push(s.i/e|0),t.push(c.i/e|0),Vs(s),s=c.next,o=c.next;continue}if(s=c,s===o){a?a===1?(s=Sx(Ei(s),t,e),Hs(s,t,e,n,i,r,2)):a===2&&Tx(s,t,e,n,i,r):Hs(Ei(s),t,e,n,i,r,1);break}}}function wx(s){const t=s.prev,e=s,n=s.next;if(Se(t,e,n)>=0)return!1;const i=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=i<r?i<a?i:a:r<a?r:a,d=o<l?o<c?o:c:l<c?l:c,u=i>r?i>a?i:a:r>a?r:a,f=o>l?o>c?o:c:l>c?l:c;let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=u&&g.y>=d&&g.y<=f&&Zi(i,o,r,l,a,c,g.x,g.y)&&Se(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function yx(s,t,e,n){const i=s.prev,r=s,a=s.next;if(Se(i,r,a)>=0)return!1;const o=i.x,l=r.x,c=a.x,h=i.y,d=r.y,u=a.y,f=o<l?o<c?o:c:l<c?l:c,g=h<d?h<u?h:u:d<u?d:u,_=o>l?o>c?o:c:l>c?l:c,m=h>d?h>u?h:u:d>u?d:u,p=fl(f,g,t,e,n),y=fl(_,m,t,e,n);let v=s.prevZ,x=s.nextZ;for(;v&&v.z>=p&&x&&x.z<=y;){if(v.x>=f&&v.x<=_&&v.y>=g&&v.y<=m&&v!==i&&v!==a&&Zi(o,h,l,d,c,u,v.x,v.y)&&Se(v.prev,v,v.next)>=0||(v=v.prevZ,x.x>=f&&x.x<=_&&x.y>=g&&x.y<=m&&x!==i&&x!==a&&Zi(o,h,l,d,c,u,x.x,x.y)&&Se(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;v&&v.z>=p;){if(v.x>=f&&v.x<=_&&v.y>=g&&v.y<=m&&v!==i&&v!==a&&Zi(o,h,l,d,c,u,v.x,v.y)&&Se(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;x&&x.z<=y;){if(x.x>=f&&x.x<=_&&x.y>=g&&x.y<=m&&x!==i&&x!==a&&Zi(o,h,l,d,c,u,x.x,x.y)&&Se(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function Sx(s,t,e){let n=s;do{const i=n.prev,r=n.next.next;!mo(i,r)&&Sd(i,n,n.next,r)&&Gs(i,r)&&Gs(r,i)&&(t.push(i.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),Vs(n),Vs(n.next),n=s=r),n=n.next}while(n!==s);return Ei(n)}function Tx(s,t,e,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Ix(a,o)){let l=Td(a,o);a=Ei(a,a.next),l=Ei(l,l.next),Hs(a,t,e,n,i,r,0),Hs(l,t,e,n,i,r,0);return}o=o.next}a=a.next}while(a!==s)}function Ex(s,t,e,n){const i=[];let r,a,o,l,c;for(r=0,a=t.length;r<a;r++)o=t[r]*n,l=r<a-1?t[r+1]*n:s.length,c=yd(s,o,l,n,!1),c===c.next&&(c.steiner=!0),i.push(Dx(c));for(i.sort(Ax),r=0;r<i.length;r++)e=Rx(i[r],e);return e}function Ax(s,t){return s.x-t.x}function Rx(s,t){const e=Cx(s,t);if(!e)return t;const n=Td(e,s);return Ei(n,n.next),Ei(e,e.next)}function Cx(s,t){let e=t,n=-1/0,i;const r=s.x,a=s.y;do{if(a<=e.y&&a>=e.next.y&&e.next.y!==e.y){const u=e.x+(a-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=r&&u>n&&(n=u,i=e.x<e.next.x?e:e.next,u===r))return i}e=e.next}while(e!==t);if(!i)return null;const o=i,l=i.x,c=i.y;let h=1/0,d;e=i;do r>=e.x&&e.x>=l&&r!==e.x&&Zi(a<c?r:n,a,l,c,a<c?n:r,a,e.x,e.y)&&(d=Math.abs(a-e.y)/(r-e.x),Gs(e,s)&&(d<h||d===h&&(e.x>i.x||e.x===i.x&&Lx(i,e)))&&(i=e,h=d)),e=e.next;while(e!==o);return i}function Lx(s,t){return Se(s.prev,s,t.prev)<0&&Se(t.next,s,s.next)<0}function Px(s,t,e,n){let i=s;do i.z===0&&(i.z=fl(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,Ux(i)}function Ux(s){let t,e,n,i,r,a,o,l,c=1;do{for(e=s,s=null,r=null,a=0;e;){for(a++,n=e,o=0,t=0;t<c&&(o++,n=n.nextZ,!!n);t++);for(l=c;o>0||l>0&&n;)o!==0&&(l===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,o--):(i=n,n=n.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;e=n}r.nextZ=null,c*=2}while(a>1);return s}function fl(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function Dx(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function Zi(s,t,e,n,i,r,a,o){return(i-a)*(t-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(i-a)*(n-o)}function Ix(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!kx(s,t)&&(Gs(s,t)&&Gs(t,s)&&Nx(s,t)&&(Se(s.prev,s,t.prev)||Se(s,t.prev,t))||mo(s,t)&&Se(s.prev,s,s.next)>0&&Se(t.prev,t,t.next)>0)}function Se(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function mo(s,t){return s.x===t.x&&s.y===t.y}function Sd(s,t,e,n){const i=Cr(Se(s,t,e)),r=Cr(Se(s,t,n)),a=Cr(Se(e,n,s)),o=Cr(Se(e,n,t));return!!(i!==r&&a!==o||i===0&&Rr(s,e,t)||r===0&&Rr(s,n,t)||a===0&&Rr(e,s,n)||o===0&&Rr(e,t,n))}function Rr(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function Cr(s){return s>0?1:s<0?-1:0}function kx(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&Sd(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function Gs(s,t){return Se(s.prev,s,s.next)<0?Se(s,t,s.next)>=0&&Se(s,s.prev,t)>=0:Se(s,t,s.prev)<0||Se(s,s.next,t)<0}function Nx(s,t){let e=s,n=!1;const i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function Td(s,t){const e=new pl(s.i,s.x,s.y),n=new pl(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Yc(s,t,e,n){const i=new pl(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Vs(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function pl(s,t,e){this.i=s,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Fx(s,t,e,n){let i=0;for(let r=t,a=e-n;r<e;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}class Ns{static area(t){const e=t.length;let n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return Ns.area(t)<0}static triangulateShape(t,e){const n=[],i=[],r=[];jc(t),Zc(n,t);let a=t.length;e.forEach(jc);for(let l=0;l<e.length;l++)i.push(a),a+=e[l].length,Zc(n,e[l]);const o=Mx.triangulate(n,i);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function jc(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function Zc(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class Fl extends Te{constructor(t=.5,e=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],c=[],h=[];let d=t;const u=(e-t)/i,f=new k,g=new wt;for(let _=0;_<=i;_++){for(let m=0;m<=n;m++){const p=r+m/n*a;f.x=d*Math.cos(p),f.y=d*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,h.push(g.x,g.y)}d+=u}for(let _=0;_<i;_++){const m=_*(n+1);for(let p=0;p<n;p++){const y=p+m,v=y,x=y+n+1,E=y+n+2,S=y+1;o.push(v,x,S),o.push(x,E,S)}}this.setIndex(o),this.setAttribute("position",new le(l,3)),this.setAttribute("normal",new le(c,3)),this.setAttribute("uv",new le(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fl(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Ol extends Te{constructor(t=new wd([new wt(0,.5),new wt(-.5,-.5),new wt(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],i=[],r=[],a=[];let o=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new le(i,3)),this.setAttribute("normal",new le(r,3)),this.setAttribute("uv",new le(a,2));function c(h){const d=i.length/3,u=h.extractPoints(e);let f=u.shape;const g=u.holes;Ns.isClockWise(f)===!1&&(f=f.reverse());for(let m=0,p=g.length;m<p;m++){const y=g[m];Ns.isClockWise(y)===!0&&(g[m]=y.reverse())}const _=Ns.triangulateShape(f,g);for(let m=0,p=g.length;m<p;m++){const y=g[m];f=f.concat(y)}for(let m=0,p=f.length;m<p;m++){const y=f[m];i.push(y.x,y.y,0),r.push(0,0,1),a.push(y.x,y.y)}for(let m=0,p=_.length;m<p;m++){const y=_[m],v=y[0]+d,x=y[1]+d,E=y[2]+d;n.push(v,x,E),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return Ox(e,t)}static fromJSON(t,e){const n=[];for(let i=0,r=t.shapes.length;i<r;i++){const a=e[t.shapes[i]];n.push(a)}return new Ol(n,t.curveSegments)}}function Ox(s,t){if(t.shapes=[],Array.isArray(s))for(let e=0,n=s.length;e<n;e++){const i=s[e];t.shapes.push(i.uuid)}else t.shapes.push(s.uuid);return t}class zl extends Te{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],d=new k,u=new k,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const y=[],v=p/n;let x=0;p===0&&a===0?x=.5/e:p===n&&l===Math.PI&&(x=-.5/e);for(let E=0;E<=e;E++){const S=E/e;d.x=-t*Math.cos(i+S*r)*Math.sin(a+v*o),d.y=t*Math.cos(a+v*o),d.z=t*Math.sin(i+S*r)*Math.sin(a+v*o),g.push(d.x,d.y,d.z),u.copy(d).normalize(),_.push(u.x,u.y,u.z),m.push(S+x,1-v),y.push(c++)}h.push(y)}for(let p=0;p<n;p++)for(let y=0;y<e;y++){const v=h[p][y+1],x=h[p][y],E=h[p+1][y],S=h[p+1][y+1];(p!==0||a>0)&&f.push(v,x,S),(p!==n-1||l<Math.PI)&&f.push(x,E,S)}this.setIndex(f),this.setAttribute("position",new le(g,3)),this.setAttribute("normal",new le(_,3)),this.setAttribute("uv",new le(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new zl(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class zx extends li{static get type(){return"MeshPhongMaterial"}constructor(t){super(),this.isMeshPhongMaterial=!0,this.color=new zt(16777215),this.specular=new zt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Al,this.normalScale=new wt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wn,this.combine=co,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ut extends li{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Al,this.normalScale=new wt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wn,this.combine=co,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}const Kc={enabled:!1,files:{},add:function(s,t){this.enabled!==!1&&(this.files[s]=t)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class Bx{constructor(t,e,n){const i=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){const d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){const f=c[d],g=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}}const Hx=new Bx;class Bl{constructor(t){this.manager=t!==void 0?t:Hx,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}Bl.DEFAULT_MATERIAL_NAME="__DEFAULT";class Gx extends Bl{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,a=Kc.get(t);if(a!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(a),r.manager.itemEnd(t)},0),a;const o=Bs("img");function l(){h(),Kc.add(t,this),e&&e(this),r.manager.itemEnd(t)}function c(d){h(),i&&i(d),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(t),o.src=t,o}}class Ed extends Bl{constructor(t){super(t)}load(t,e,n,i){const r=new We,a=new Gx(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(t,function(o){r.image=o,r.needsUpdate=!0,e!==void 0&&e(r)},n,i),r}}class go extends Le{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new zt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class ws extends go{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Le.DEFAULT_UP),this.updateMatrix(),this.groundColor=new zt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const ta=new ve,Jc=new k,Qc=new k;class Ad{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new wt(512,512),this.map=null,this.mapPass=null,this.matrix=new ve,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ll,this._frameExtents=new wt(1,1),this._viewportCount=1,this._viewports=[new ge(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Jc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Jc),Qc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Qc),e.updateMatrixWorld(),ta.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ta),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ta)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const th=new ve,ys=new k,ea=new k;class Vx extends Ad{constructor(){super(new nn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new wt(4,2),this._viewportCount=6,this._viewports=[new ge(2,1,1,1),new ge(0,1,1,1),new ge(3,1,1,1),new ge(1,1,1,1),new ge(3,0,1,1),new ge(1,0,1,1)],this._cubeDirections=[new k(1,0,0),new k(-1,0,0),new k(0,0,1),new k(0,0,-1),new k(0,1,0),new k(0,-1,0)],this._cubeUps=[new k(0,1,0),new k(0,1,0),new k(0,1,0),new k(0,1,0),new k(0,0,1),new k(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ys.setFromMatrixPosition(t.matrixWorld),n.position.copy(ys),ea.copy(n.position),ea.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(ea),n.updateMatrixWorld(),i.makeTranslation(-ys.x,-ys.y,-ys.z),th.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(th)}}class gn extends go{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Vx}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Wx extends Ad{constructor(){super(new hd(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class na extends go{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Le.DEFAULT_UP),this.updateMatrix(),this.target=new Le,this.shadow=new Wx}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Ss extends go{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const eh=new ve;class Xx{constructor(t,e,n=0,i=1/0){this.ray=new Rl(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new Cl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return eh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(eh),this}intersectObject(t,e=!0,n=[]){return ml(t,this,n,e),n.sort(nh),n}intersectObjects(t,e=!0,n=[]){for(let i=0,r=t.length;i<r;i++)ml(t[i],this,n,e);return n.sort(nh),n}}function nh(s,t){return s.distance-t.distance}function ml(s,t,e,n){let i=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){const r=s.children;for(let a=0,o=r.length;a<o;a++)ml(r[a],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:bl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=bl);const P=4,ei=3.2,ia=2,Lr=1.7,ih=.6,sa=2,sh=.35,rh=1.65,Pr=2.7,qx=1,$x=1,Yx=1.85,Rd=260,jx=210,Ts=8884384,Ur=6e5,Dr=.34,Zs=["MMMMM##########","MMMMM##########","MMSMM##########","MMTMM##########","MMTMM##########","MMTMM##########","##.........####","##...........##","##...........##","##...........##","##...........##","##...........##","##...........##","######...######","######...######","######.P.######","#######F#######"],Ke=Zs.length,ln=Zs[0].length;function ye(s,t){if(t<0||t>=Ke||s<0||s>=ln)return"building";const e=Zs[t][s];return e==="#"?"building":e==="o"?"barrel":e==="M"?"mountain":e==="T"?"tunnel":e==="S"?"stairs":e==="F"?"forestgate":"street"}function oh(s,t){const e=ye(s,t);return e==="tunnel"||e==="stairs"}function ra(s,t){const e=ye(s,t);return e==="street"||e==="barrel"||e==="tunnel"||e==="stairs"||e==="forestgate"}function ah(){for(let s=0;s<Ke;s++){const t=Zs[s].indexOf("P");if(t>=0)return{col:t,row:s}}return{col:1,row:1}}function lh(){for(let s=0;s<Ke;s++){const t=Zs[s].indexOf("F");if(t>=0)return{col:t,row:s}}return{col:7,row:Ke-1}}const Ks=["###################################","###################################","##T...f...TrTTbT.NTTTTTT.T...bf.T##","##T...TTTf.TTf..T===TTfT..Tr.TTTf##","##Tb.f.TTTT.......T==.TTTrTT...T.##","##f....T..T..TrT.bT==.b.TTTTT.T.T##","##.b..T..T..r.T.T.T=.T....TTTTTTT##","##......TT....T.rk.=TT..TfTb..T..##","##frT..TTT.T...T.rT===.bT..T.TT.T##","##.f.kT.TT.rT..rT.==r.TTfT.fTr..T##","##TT.TTTTrTTTTTT.==...TT..T.TTT.T##","##T..TTTbTT.bT....=.Tff..TbTf.TT.##","##T..Tfb..b.k.T..======.TTTT....f##","##.TTT.T....rTT..=..Tk..TT..T.T..##","##...TT......bkT.=.kT.f...r.T.TT.##","##...TfT...T.T.r==..TTTbT..k..TT.##","##.TTTT.T..r.bbT=T.T...r....TTb.T##","##.f.T..T..TTf..===.T.TT.....TrbT##","##..TTTbTT.bT.T===TTTT.bT.......T##","##.fk.T.T....TTT.=.....T...rT.TTT##","##...T..T.b.TTkT==.TT.TfTf...TT..##","##.rTT..TTT.Tr.=====rT....T..TT=E##","##r.TT.T..TT..T===TbTTbTT...T.r.=##","##.TT.TfT....TT.T=rf.rTT.T...T===##","##T....rf.T..bT..==..TfT..Tk=====##","##T..Tff.TrTTTT...==.TT..T..=Tk.T##","##T.TTb==========j===========..Tf##","##..TT==.TfTT.T.==...r.TTTTrTT.bb##","##T.b==TT.rr.Tr..==.TT.TTT.TT..Tb##","##T======.TTr..T.==T.T...k.f.T...##","##===.brb.....bTT=.TT.T..r.T.T..T##","##W==TT.T.r.rTr===....rf.ffb.TTTT##","##..T.T.....k..===.Tk.Tr.Tf.f..TT##","##TT..TTT.T.TT==TTTrTTk.r..T.T.r.##","##T......r..TT=T.TTT.TTT.rf...T.T##","##.r....T.T.TT=TTT..TTkr.T.T..bbT##","##rk....fT.T.T==.rrb..T..r.T..Tr.##","##TTTb..Tf....=TbTrT..T..TTrT..f.##","##...T.b....TT====fT..T.T..T.T...##","##T..........T...=..Tf.T.T..T..fk##","##r.T..Tf........=T.....T...TTb.T##","##TTT.TTbT.bTT...===.T.......TbT.##","##.T.T....TTTbT..==T.T......TTTTT##","##.T..T...TTTf.T====..k..T.b..krT##","##bT.TTT.kTr.....==.TT.T.TTb.T.r.##","##TT.TbrT....T..r==T...bb.f..T...##","##..b.TTTrT.rf=s.===TTf..T.TTT.rr##","##..rTT.TTTTTr.r.P...TTT..T..T.b.##","#################=#################","#################V#################"],Ws=Ks.length,Zr=Ks[0].length;function xi(s,t){if(t<0||t>=Ws||s<0||s>=Zr)return"edge";switch(Ks[t][s]){case".":return"grass";case"=":return"path";case"T":return"tree";case"b":return"bush";case"r":return"rock";case"f":return"foliage";case"k":return"skull";case"s":case"j":case"N":case"E":case"W":return"sign";case"V":return"gate";case"P":return"spawn";default:return"edge"}}function oa(s,t){const e=xi(s,t);return e==="grass"||e==="path"||e==="tree"||e==="foliage"||e==="skull"||e==="gate"||e==="spawn"}function Zx(s,t){switch(Ks[t]?.[s]){case"s":return["Trilha da Mata Sussurrante.","A neblina nunca se levanta por aqui. Dizem que ela se lembra de quem passa.","Siga a trilha até a encruzilhada."];case"j":return["Encruzilhada da Mata.","Ao sul: Vilarejo de Grimhollow.","Norte: Montanhas Cinzentas · Leste: o Charco · Oeste: as Ruínas.","(Esses caminhos se abrirão em breve.)"];case"N":return["Trilha das Montanhas Cinzentas.","O caminho sobe rumo ao nevoeiro gelado.","(Bloqueado — em breve.)"];case"E":return["Trilha do Charco.","Um cheiro de água parada vem do leste.","(Bloqueado — em breve.)"];case"W":return["Trilha das Ruínas.","Pedras antigas espreitam entre as árvores a oeste.","(Bloqueado — em breve.)"];default:return["Uma placa de madeira, gasta pelo tempo."]}}function aa(s){for(let t=0;t<Ws;t++){const e=Ks[t].indexOf(s);if(e>=0)return{col:e,row:t}}return{col:8,row:Ws-2}}const Js=["############################################","############################################","############################################","############################################","####......#######..........#################","####..C...#######....C.....#################","####......#######...E......#################","####......#######.......E..#################","####..X...#######..........#################","######.##########..K.......#################","######.##########..........#################","######.###############.#####################","######.###############G#####################","###.........##########.#########.........###","###.........##########.#########.........###","###.........###..............###...E.....###","###...E.....###.K...........B###.........###","###.........###..........E...###......K..###","###......................................###","###.........###......E.......###.........###","###.........###..............###.........###","#######.#######..............#######.#######","#######.#######...E..........#######.#######","#######.#######.B..........K.#######.#######","#######.#######..............#######.#######","#######.#############..#############.#######","#######.#############..#############.#######","###.........#########..#########.........###","###.B.......#########..#########........B###","###...E.....#########..#########....E....###","###................##..###...............###","###..K......#########..#########..K......###","###.........#########..#########.........###","##################........##################","#############....#........##################","#############.C..G........#...##############","#############....#...S.U..L.A.##############","##################........#...##############","############################################","############################################"],Xs=Js.length,io=Js[0].length;function Kx(s,t){return t<0||t>=Xs||s<0||s>=io?"#":Js[t][s]}function cn(s,t){switch(Kx(s,t)){case".":return"floor";case"S":return"spawn";case"U":return"stairs";case"E":return"enemy";case"C":return"chest";case"K":return"bones";case"B":return"barrel";case"G":return"gate";case"L":return"lockgate";case"A":return"sanctuary";case"X":return"secret";default:return"wall"}}function ch(s,t){return cn(s,t)!=="wall"}function Ir(s,t){const e=cn(s,t);return e==="wall"||e==="secret"}function hh(s){for(let t=0;t<Xs;t++){const e=Js[t].indexOf(s);if(e>=0)return{col:e,row:t}}return{col:21,row:36}}function la(s){const t=[];for(let e=0;e<Xs;e++)for(let n=0;n<io;n++)Js[e][n]===s&&t.push({col:n,row:e});return t}const so=24,ro=23,Ps=5,Jx=2.6,Qx=7.4,qs=24,tv=2,es=12,ev=es/qs,dh=Math.PI*2*tv/qs,uh=Math.PI/2,ca=es;function fh(s,t){return Math.atan2(-s,-t)}function nv(){const s=[];for(let r=0;r<=qs;r++){const a=uh+r*dh;s.push({x:so+Ps*Math.cos(a),y:r*ev,z:ro+Ps*Math.sin(a),yaw:fh(-Math.sin(a),Math.cos(a))})}const t=uh+qs*dh,e=so+Ps*Math.cos(t),n=ro+Ps*Math.sin(t),i=fh(-Math.sin(t),Math.cos(t));for(let r=1;r<=4;r++)s.push({x:e-2*r,y:es,z:n,yaw:i});return s}const _o=nv(),Ki=_o.length-1,ph=_o[Ki].yaw,oo=4,mh={c:4,r:7},kr={c:3,r:7},ai={col:2,row:7},Hl=new Set;for(let s=6;s<=8;s++)for(let t=1;t<=3;t++)t===ai.col&&s===ai.row||Hl.add(`${t},${s}`);function gh(s,t){return Hl.has(`${s},${t}`)}function iv(s,t){return s===mh.c&&t===mh.r}function sv(){return[...Hl].map(s=>s.split(",").map(Number))}const _h={x:ai.col*oo,z:ai.row*oo},ha=ai.col*oo,da=ai.row*oo,rv=7,xh=so,Es=ro+Ps;function As(s){return _o[Math.max(0,Math.min(Ki,s))]}const ov=""+new URL("tex_cobble-DXMPAwZE.jpg",import.meta.url).href,av=""+new URL("tex_stonewall-BFmowWy6.jpg",import.meta.url).href,lv=""+new URL("tex_thatch-DdJMnyvF.jpg",import.meta.url).href,cv=""+new URL("tex_wood-B0jCHZZA.jpg",import.meta.url).href,hv=""+new URL("tex_dirt-BHcbB_Wz.jpg",import.meta.url).href,dv=""+new URL("tex_grass-C2Q1l28q.jpg",import.meta.url).href,uv=""+new URL("tex_mosswall-DpaqdZvP.jpg",import.meta.url).href,fv=""+new URL("tex_cavewall-DQwg9sDl.jpg",import.meta.url).href,pv=""+new URL("tex_cavefloor-CIzR_jPs.jpg",import.meta.url).href,mv=""+new URL("tex_caveceil-Dh6eDyCo.jpg",import.meta.url).href,vh=new Map,gv=new Ed;function Pn(s,t=1,e=1){let n=vh.get(s);n||(n=gv.load(s),n.wrapS=sn,n.wrapT=sn,n.colorSpace=Ce,n.anisotropy=8,vh.set(s,n));const i=n.clone();return i.wrapS=sn,i.wrapT=sn,i.repeat.set(t,e),i.needsUpdate=!0,i}const Nr=4;function yn(s,t){const e=document.createElement("canvas");e.width=s*Nr,e.height=t*Nr;const n=e.getContext("2d");return n.scale(Nr,Nr),{c:e,ctx:n}}function Qs(s,t=1,e=1){const n=new _n(s);return n.magFilter=Ve,n.minFilter=vn,n.generateMipmaps=!0,n.anisotropy=8,n.wrapS=sn,n.wrapT=sn,n.repeat.set(t,e),n.colorSpace=Ce,n}function us(s){const t=new _n(s);return t.magFilter=Ve,t.minFilter=vn,t.generateMipmaps=!0,t.anisotropy=8,t.wrapS=xn,t.wrapT=xn,t.colorSpace=Ce,t}const qn=s=>{let t=s>>>0;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}};function Oe(s=1){return Pn(cv)}function bh(s=7){return Pn(ov)}function Rs(s=3){return Pn(lv)}function _v(s=11){const{c:n,ctx:i}=yn(48,64);i.fillStyle="#5a4a38",i.fillRect(0,0,48,64),i.fillStyle="#4a2f16",i.fillRect(6,6,36,58);for(let r=6;r<42;r+=8)i.fillStyle="rgba(20,10,4,0.7)",i.fillRect(r,6,1,58),i.fillStyle="rgba(120,80,40,0.25)",i.fillRect(r+1,6,1,58);return i.fillStyle="#20242a",i.fillRect(8,14,32,3),i.fillRect(8,46,32,3),i.fillStyle="#c9a227",i.fillRect(34,64/2,3,3),Qs(n)}function ua(s=17){const{c:n,ctx:i}=yn(48,32),r=qn(s);for(let a=0;a<48;a++){const o=96+Math.sin(a/48*Math.PI)*46+(r()-.5)*10;i.fillStyle=`rgb(${o|0},${o*.6|0},${o*.32|0})`,i.fillRect(a,0,1,32),a%6===0&&(i.fillStyle="rgba(20,10,4,0.6)",i.fillRect(a,0,1,32))}return i.fillStyle="#3a3f47",i.fillRect(0,3,48,3),i.fillRect(0,26,48,3),i.fillStyle="rgba(200,210,220,0.3)",i.fillRect(0,3,48,1),Qs(n)}function xv(s=32){return Pn(uv)}function Mh(){return Pn(fv)}function wh(){return Pn(pv)}function vv(){return Pn(mv)}function On(s=31){return Pn(av)}function bv(s=1){const{c:n,ctx:i}=yn(76,128);i.clearRect(0,0,76,128),i.lineJoin="round",i.lineCap="round";const r=qn(s),a="#241812",o=76/2,l=29,c=13,h=(R,b)=>{const M=parseInt(R.slice(1),16);let C=M>>16&255,I=M>>8&255,N=M&255;if(b<0){const G=1+b;C*=G,I*=G,N*=G}else C+=(255-C)*b,I+=(255-I)*b,N+=(255-N)*b;return`rgb(${C|0},${I|0},${N|0})`},d=(R,b,M=2.2)=>{i.beginPath(),R.forEach(([C,I],N)=>N?i.lineTo(C,I):i.moveTo(C,I)),i.closePath(),i.fillStyle=b,i.fill(),M&&(i.strokeStyle=a,i.lineWidth=M,i.stroke())},u=(R,b,M,C,I=2)=>{i.beginPath(),i.arc(R,b,M,0,Math.PI*2),i.fillStyle=C,i.fill(),I&&(i.strokeStyle=a,i.lineWidth=I,i.stroke())},f=(R,b,M,C,I,N,G=2)=>{i.beginPath(),gl(i,R,b,M,C,I),i.fillStyle=N,i.fill(),G&&(i.strokeStyle=a,i.lineWidth=G,i.stroke())},g=(R,b)=>{i.save(),i.beginPath(),R.forEach(([M,C],I)=>I?i.lineTo(M,C):i.moveTo(M,C)),i.closePath(),i.clip(),i.fillStyle=b,i.fillRect(o+2,40,44,90),i.restore()},_=["#f4cc9c","#eab488","#d89a68"],m=_[Math.floor(r()*_.length)],p=h(m,-.16),y=Math.floor(r()*5);i.fillStyle="rgba(0,0,0,0.22)",i.beginPath(),i.ellipse(o,123,15,4.5,0,0,Math.PI*2),i.fill();const v=()=>{i.fillStyle=p,i.fillRect(o-4,36,8,12),u(o,l,c,m),i.save(),i.beginPath(),i.arc(o,l,c,0,Math.PI*2),i.clip(),i.fillStyle="rgba(0,0,0,0.10)",i.fillRect(o+3,l-c,c,2*c),i.restore();for(const R of[-1,1]){const b=o+R*4.6;i.fillStyle="#fff",i.beginPath(),i.ellipse(b,l-.3,2.3,3.6,0,0,Math.PI*2),i.fill(),i.fillStyle="#241812",i.beginPath(),i.ellipse(b+R*.3,l,1.6,3.1,0,0,Math.PI*2),i.fill(),i.fillStyle="#fff",i.beginPath(),i.arc(b-.7,l-1.8,.8,0,Math.PI*2),i.fill()}i.strokeStyle=a,i.lineWidth=1.6,i.beginPath(),i.moveTo(o-8,l-5.5),i.lineTo(o-2.5,l-6),i.moveTo(o+2.5,l-6),i.lineTo(o+8,l-5.5),i.stroke(),i.fillStyle=p,i.fillRect(o-.6,l+3,1.3,2.4),i.strokeStyle="#9c4a38",i.lineWidth=1.4,i.beginPath(),i.arc(o,l+6,2.2,.18*Math.PI,.82*Math.PI),i.stroke(),i.fillStyle="rgba(232,120,110,0.28)",i.beginPath(),i.arc(o-7.5,l+4,2,0,Math.PI*2),i.arc(o+7.5,l+4,2,0,Math.PI*2),i.fill()},x=R=>{i.beginPath(),i.arc(o,l-1,c+1,Math.PI*.98,Math.PI*2.02),i.lineTo(o+c,l+2),i.lineTo(o+8,l-3),i.lineTo(o+5,l-1),i.lineTo(o+2,l-4),i.lineTo(o-1,l-1),i.lineTo(o-4,l-4),i.lineTo(o-7,l-1),i.lineTo(o-c,l+2),i.closePath(),i.fillStyle=R,i.fill(),i.strokeStyle=a,i.lineWidth=2,i.stroke();const b=[-11,-7,-3,1,5,9,12];for(const M of b){const C=o+M*.9,I=Math.max(0,c*c-M*M),N=l-Math.sqrt(I)+3,G=o+M*1.7+(M>0?2:-2),X=N-10-(12-Math.abs(M))*.5;d([[C-3.4,N],[G,X],[C+3.4,N]],R,1.8)}i.strokeStyle=h(R,.35),i.lineWidth=1.3,i.beginPath(),i.moveTo(o-4,l-6),i.lineTo(o-2,l-c+1),i.moveTo(o+3,l-6),i.lineTo(o+5,l-c+2),i.stroke()},E=(R,b)=>{d([[o-12,48],[o-20,52],[o-18,74],[o-11,70]],R,2),d([[o+12,48],[o+20,52],[o+18,74],[o+11,70]],R,2),u(o-18,76,3.6,b,1.8),u(o+18,76,3.6,b,1.8)},S=(R,b)=>{d([[o-9,82],[o-1,82],[o-2,112],[o-9,112]],R,2),d([[o+1,82],[o+9,82],[o+9,112],[o+2,112]],R,2),f(o-11,110,10,11,3,b,2),f(o+1,110,10,11,3,b,2)},A=(R,b)=>{d(R,b,2.2),g(R,"rgba(0,0,0,0.16)")};if(y===0)S("#2f6f9a","#6a4526"),A([[o-12,46],[o+12,46],[o+14,84],[o-14,84]],"#37a34a"),d([[o-14,80],[o+14,80],[o+14,84],[o-14,84]],"#e8e0b0",1.4),E("#2f8f40","#e0b070"),f(o-14,79,28,5,2,"#5a3a1e",1.8),f(o-3,78,6,7,1.5,"#e6c040",1.4),v(),x("#f0d24a"),d([[o-c,l-6],[o+c,l-6],[o+5,l-c-13],[o-2,l-c-7]],"#2f8f3f",2),u(o+4,l-c-12,2.4,"#e6c040",1.4);else if(y===1)S("#33507e","#3a4656"),A([[o-13,46],[o+13,46],[o+14,82],[o-14,82]],"#8a5a2e"),d([[o-8,50],[o+8,50],[o+9,74],[o-9,74]],"#6f4522",1.8),i.strokeStyle="#e6c040",i.lineWidth=1.6,i.beginPath(),i.moveTo(o-7,56),i.lineTo(o+7,60),i.stroke(),E("#7a4d26","#3a4656"),u(o-15,49,5.5,"#9a6a38",2),u(o+15,49,5.5,"#9a6a38",2),f(o-14,78,28,5,2,"#4a2f18",1.8),v(),x("#e07028"),f(o-c-1,l-8,2*c+2,4.5,1.5,"#2f8f3f",1.8),d([[o+c-1,l-7],[o+c+6,l-2],[o+c+4,l-9]],"#2f8f3f",1.4);else if(y===2){const R=[[o-11,46],[o+11,46],[o+20,116],[o-20,116]];d(R,"#2a52b0",2.2),g(R,"rgba(0,0,0,0.16)"),d([[o-4,52],[o+4,52],[o+6,116],[o-6,116]],"#e6b83a",1.6),f(o-20,112,40,5,2,"#e6b83a",1.6),d([[o-11,48],[o-21,58],[o-17,84],[o-9,74]],"#2a52b0",2),d([[o+11,48],[o+21,58],[o+17,84],[o+9,74]],"#2a52b0",2),u(o-17,86,3.4,m,1.6),u(o+17,86,3.4,m,1.6),v(),x("#4aa8d8"),i.strokeStyle="#8a5a2e",i.lineWidth=3,i.beginPath(),i.moveTo(o+19,40),i.lineTo(o+19,118),i.stroke(),u(o+19,33,5,"#e6c040",2),u(o+19,33,2.2,"#fff6c0",0)}else if(y===3){const R=[[o-13,46],[o+13,46],[o+22,100],[o-22,100]];d(R,"#c0432a",2.2),g(R,"rgba(0,0,0,0.18)"),S("#2a2f45","#5a3a22"),A([[o-11,48],[o+11,48],[o+13,82],[o-13,82]],"#356ab8"),E("#2f5aa0","#d8a070"),f(o-13,78,26,5,2,"#4a3018",1.8),d([[o-12,46],[o-4,44],[o-6,52]],"#c0432a",1.6),d([[o+12,46],[o+4,44],[o+6,52]],"#c0432a",1.6),v(),x("#e8802a")}else{const R=[[o-11,46],[o+11,46],[o+18,116],[o-18,116]];d(R,"#dcd6c6",2.2),g(R,"rgba(0,0,0,0.12)"),f(o-18,112,36,5,2,"#c05a86",1.6),d([[o-5,46],[o+5,46],[o+3,74],[o-3,74]],"#c05a86",1.4),d([[o-11,48],[o-19,58],[o-15,82],[o-9,74]],"#dcd6c6",2),d([[o+11,48],[o+19,58],[o+15,82],[o+9,74]],"#dcd6c6",2),u(o-15,84,3.4,m,1.6),u(o+15,84,3.4,m,1.6),v();const b="#7a4a2a";d([[o-c-2,l-4],[o-c-3,l+26],[o-5,l+20],[o-4,l]],b,2),d([[o+c+2,l-4],[o+c+3,l+26],[o+5,l+20],[o+4,l]],b,2),i.beginPath(),i.arc(o,l-1,c+1,Math.PI*.92,Math.PI*2.08),i.lineTo(o+c-1,l+1),i.lineTo(o+7,l-2),i.lineTo(o+4,l+1),i.lineTo(o+1,l-3),i.lineTo(o-2,l+1),i.lineTo(o-5,l-2),i.lineTo(o-c+1,l+1),i.closePath(),i.fillStyle=b,i.fill(),i.strokeStyle=a,i.lineWidth=2,i.stroke()}return us(n)}function gl(s,t,e,n,i,r){s.beginPath(),s.moveTo(t+r,e),s.arcTo(t+n,e,t+n,e+i,r),s.arcTo(t+n,e+i,t,e+i,r),s.arcTo(t,e+i,t,e,r),s.arcTo(t,e,t+n,e,r),s.closePath()}function fa(s){const{c:n,ctx:i}=yn(160,56);i.clearRect(0,0,160,56),i.fillStyle="#33220f",gl(i,2,2,156,52,6),i.fill(),i.fillStyle="#59401f",gl(i,6,6,148,44,5),i.fill(),i.strokeStyle="rgba(30,18,8,0.35)",i.lineWidth=1;for(let a=12;a<48;a+=6)i.beginPath(),i.moveTo(10,a),i.lineTo(150,a+1),i.stroke();i.fillStyle="#2a1a0a";for(const[a,o]of[[12,12],[148,12],[12,44],[148,44]])i.beginPath(),i.arc(a,o,2,0,Math.PI*2),i.fill();let r=26;for(i.fillStyle="#f2dda0",i.textAlign="center",i.textBaseline="middle",i.font=`bold ${r}px Georgia, "Times New Roman", serif`;i.measureText(s).width>138&&r>10;)r-=1,i.font=`bold ${r}px Georgia, "Times New Roman", serif`;return i.strokeStyle="rgba(0,0,0,0.55)",i.lineWidth=3,i.strokeText(s,160/2,56/2+1),i.fillText(s,160/2,56/2+1),us(n)}function pa(s=41){const{c:n,ctx:i}=yn(96,96),r=qn(s);for(let a=0;a<96;a+=2)for(let o=0;o<96;o+=2){const l=78+Math.floor(r()*34);i.fillStyle=`rgb(${l},${l*.94|0},${l*.84|0})`,i.fillRect(o,a,2,2)}for(let a=0;a<26;a++){const o=r()*96,l=r()*96,c=10+r()*16,h=r()<.5?.22:-.18;i.fillStyle=h>0?`rgba(0,0,0,${h})`:`rgba(255,250,240,${-h})`,i.beginPath();const d=4+(r()*3|0);for(let u=0;u<=d;u++){const f=u/d*Math.PI*2+r()*.3,g=c*(.7+r()*.4),_=o+Math.cos(f)*g,m=l+Math.sin(f)*g*.8;u===0?i.moveTo(_,m):i.lineTo(_,m)}i.closePath(),i.fill()}i.strokeStyle="rgba(20,16,12,0.5)",i.lineWidth=1.4;for(let a=0;a<7;a++){i.beginPath();let o=r()*96,l=r()*96;i.moveTo(o,l);for(let c=0;c<5;c++)o+=(r()-.5)*26,l+=(r()-.5)*26,i.lineTo(o,l);i.stroke()}return Qs(n)}function Mv(s=43){const{c:n,ctx:i}=yn(96,96),r=qn(s);i.fillStyle="#161514",i.fillRect(0,0,96,96);const a=32;for(let o=0;o<96;o+=a)for(let l=0;l<96;l+=a){const c=40+Math.floor(r()*20);i.fillStyle=`rgb(${c},${c*.98|0},${c*.94|0})`,i.fillRect(l+2,o+2,a-4,a-4),i.fillStyle="rgba(0,0,0,0.4)",i.fillRect(l+2,o+a-4,a-4,2),i.fillStyle="rgba(255,255,255,0.05)",i.fillRect(l+2,o+2,a-4,1),r()<.3&&(i.strokeStyle="rgba(0,0,0,0.35)",i.lineWidth=1,i.beginPath(),i.moveTo(l+6+r()*10,o+6),i.lineTo(l+8+r()*12,o+a-6),i.stroke())}return Qs(n)}function Fr(s=61){return Pn(dv)}function ma(s=63){return Pn(hv)}function yh(s=65){const{c:n,ctx:i}=yn(128,300);i.clearRect(0,0,128,300);const r=qn(s),a=128/2,o=r()<.35,l=(r()-.5)*12,c=300*.8;i.beginPath(),i.moveTo(a-8,300),i.lineTo(a-5,c),i.lineTo(a+5,c),i.lineTo(a+8,300),i.closePath();const h=i.createLinearGradient(a-8,0,a+8,0);h.addColorStop(0,"#2a1c0f"),h.addColorStop(.5,"#553a20"),h.addColorStop(1,"#20150a"),i.fillStyle=h,i.fill();const d=7,u=300*.04,f=300*.84;for(let g=0;g<d;g++){const _=g/(d-1),m=u+(f-u)*_,p=10+_*(128*.46),y=(f-u)/d*2.1,v=30+l;i.fillStyle=`rgb(${v*.55|0},${v+22|0},${v*.5|0})`,i.beginPath(),i.moveTo(a,m-y*.25);const x=7;for(let E=0;E<=x;E++){const S=a+p*(E/x),A=(E%2===0?.86:1)*y;i.lineTo(S,m+A)}for(let E=x;E>=0;E--){const S=a-p*(E/x),A=(E%2===0?.86:1)*y;i.lineTo(S,m+A)}i.closePath(),i.fill()}for(let g=0;g<d;g++){const _=g/(d-1),m=u+(f-u)*_+2,p=(10+_*(128*.46))*.82,y=(f-u)/d*1.9,v=62+Math.floor(r()*20)+l;i.fillStyle=`rgb(${v*.5|0},${v+30|0},${v*.45|0})`,i.beginPath(),i.moveTo(a,m),i.lineTo(a+p,m+y*.92),i.lineTo(a-p,m+y*.92),i.closePath(),i.fill(),i.fillStyle=`rgba(${v*.7|0},${v+60|0},${v*.5|0},0.5)`,i.beginPath(),i.moveTo(a,m),i.lineTo(a-p*.7,m+y*.8),i.lineTo(a-p*.1,m+y*.8),i.closePath(),i.fill();for(let x=0;x<12;x++){const E=r()<.5?-1:1,S=p*(.4+r()*.62);i.fillStyle=`rgba(${v*.45|0},${v+14|0},${v*.4|0},0.85)`,i.beginPath(),i.arc(a+E*S,m+y*(.55+r()*.4),1.4+r()*2.4,0,Math.PI*2),i.fill()}o&&(i.fillStyle="rgba(238,244,255,0.8)",i.beginPath(),i.moveTo(a,m+1),i.lineTo(a+p*.3,m+y*.34),i.lineTo(a-p*.3,m+y*.34),i.closePath(),i.fill())}return us(n)}function wv(s=75){const{c:n,ctx:i}=yn(128,96);i.clearRect(0,0,128,96);const r=qn(s),a=128/2,o=96*.98,l=9+(r()*5|0);for(let c=0;c<l;c++){const h=-Math.PI/2+(c/(l-1)-.5)*1.7+(r()-.5)*.2,d=96*(.5+r()*.45),u=60+Math.floor(r()*40);i.strokeStyle=`rgb(${u*.42|0},${u},${u*.34|0})`,i.lineWidth=2.4;const f=a+Math.cos(h)*d,g=o+Math.sin(h)*d,_=a+Math.cos(h)*d*.5+(r()-.5)*8,m=o+Math.sin(h)*d*.5;i.beginPath(),i.moveTo(a,o),i.quadraticCurveTo(_,m,f,g),i.stroke(),i.lineWidth=1;for(let p=.25;p<1;p+=.16){const y=a+(f-a)*p,v=o+(g-o)*p;i.beginPath(),i.moveTo(y,v),i.lineTo(y-5,v-3),i.moveTo(y,v),i.lineTo(y+5,v-3),i.stroke()}}return us(n)}function yv(s=67){const{c:n,ctx:i}=yn(128,96);i.clearRect(0,0,128,96);const r=qn(s),a=128/2,o=96*.94,l=12;for(let c=0;c<l;c++){const h=a+(r()-.5)*128*.8,d=o-r()*96*.72,u=12+r()*18,f=54+Math.floor(r()*40),g=i.createRadialGradient(h,d-u*.3,u*.2,h,d,u);g.addColorStop(0,`rgb(${f*.6|0},${f+40},${f*.5|0})`),g.addColorStop(1,`rgb(${f*.4|0},${f*.8|0},${f*.4|0})`),i.fillStyle=g,i.beginPath(),i.arc(h,d,u,0,Math.PI*2),i.fill()}for(let c=0;c<5;c++)i.fillStyle="rgba(150,40,50,0.8)",i.beginPath(),i.arc(a+(r()-.5)*128*.6,o-r()*96*.5,1.6,0,Math.PI*2),i.fill();return us(n)}function Sh(s=69){const{c:n,ctx:i}=yn(128,96);i.clearRect(0,0,128,96);const r=qn(s),a=(o,l,c)=>{i.fillStyle="#e7e2d2",i.beginPath(),i.ellipse(o,l,c,c*.9,0,0,Math.PI*2),i.fill(),i.fillStyle="#d8d2c0",i.beginPath(),i.ellipse(o,l+c*.7,c*.6,c*.4,0,0,Math.PI*2),i.fill(),i.fillStyle="#2a2620",i.beginPath(),i.ellipse(o-c*.4,l-c*.1,c*.24,c*.28,0,0,Math.PI*2),i.ellipse(o+c*.4,l-c*.1,c*.24,c*.28,0,0,Math.PI*2),i.fill(),i.beginPath(),i.moveTo(o,l+c*.1),i.lineTo(o-c*.12,l+c*.4),i.lineTo(o+c*.12,l+c*.4),i.fill()};i.strokeStyle="#d5cfbe",i.lineWidth=3;for(let o=0;o<6;o++){const l=20+r()*88,c=96*.7+r()*96*.22;i.beginPath(),i.moveTo(l,c),i.lineTo(l+(r()-.5)*34,c+(r()-.5)*10),i.stroke()}return a(128*.5,96*.72,15),a(128*.32,96*.8,12),a(128*.68,96*.8,12),a(128*.46,96*.5,13),us(n)}function Th(s=47){const{c:n,ctx:i}=yn(96,96),r=qn(s);i.fillStyle="#0f0e0d",i.fillRect(0,0,96,96);const a=18;for(let o=0,l=0;o<96;o+=a,l++){const c=l%2?18:0;for(let h=-18;h<96;h+=36){const d=h+c,u=44+Math.floor(r()*20);i.fillStyle=`rgb(${u*.9|0},${u},${u*.86|0})`,i.fillRect(d+1,o+1,34,a-2),i.fillStyle="rgba(0,0,0,0.45)",i.fillRect(d+1,o+a-3,34,2),i.fillStyle="rgba(255,255,255,0.06)",i.fillRect(d+1,o+1,34,1),r()<.35&&(i.fillStyle=`rgba(70,90,50,${.18+r()*.2})`,i.beginPath(),i.ellipse(d+6+r()*20,o+4+r()*8,5,3,0,0,Math.PI*2),i.fill())}}return Qs(n)}const Sv=""+new URL("wpn_sword-CpsgndpE.png",import.meta.url).href,Tv=""+new URL("wpn_greatsword-C2mQEgxH.png",import.meta.url).href,Ev=""+new URL("wpn_axe-CvCTYMUq.png",import.meta.url).href,Av=""+new URL("wpn_dagger-BBXQkEIm.png",import.meta.url).href,Rv=""+new URL("wpn_rapier-dNk4ndjW.png",import.meta.url).href,Cv=""+new URL("wpn_maul-DbliXABw.png",import.meta.url).href,Lv=""+new URL("wpn_mace-tTLR-MzC.png",import.meta.url).href,Pv=""+new URL("wpn_staff-DGpAnpDH.png",import.meta.url).href,Uv=""+new URL("wpn_shield-Bw_-3z5v.png",import.meta.url).href,Dv=""+new URL("wpn_orb-BsomjHDA.png",import.meta.url).href,Eh={ry:0,rx:0,rz:16,tx:0,ty:2,s:1},Iv={slash:{wind:{ry:44,rx:-8,rz:36,tx:12,ty:4,s:.96},hit:{ry:-42,rx:16,rz:-42,tx:-26,ty:-8,s:1.18},follow:{ry:-16,rx:7,rz:-24,tx:-12,ty:-2,s:1.02},windup:105,strike:190,recover:190,cooldown:560,weight:1,fx:"arc"},quickslash:{wind:{ry:44,rx:-8,rz:36,tx:12,ty:4,s:.94},hit:{ry:-42,rx:16,rz:-42,tx:-26,ty:-8,s:1.16},follow:{ry:-16,rx:7,rz:-24,tx:-12,ty:-2,s:1},windup:45,strike:100,recover:95,cooldown:300,weight:.85,fx:"arc"},chop:{wind:{ry:-22,rx:-26,rz:22,tx:6,ty:-2,s:.96},hit:{ry:18,rx:40,rz:-18,tx:-12,ty:9,s:1.22},follow:{ry:8,rx:17,rz:-10,tx:-6,ty:8,s:1.05},windup:150,strike:230,recover:220,cooldown:820,weight:1.6,fx:"arcBig"},smash:{wind:{ry:-16,rx:-32,rz:16,tx:2,ty:0,s:.98},hit:{ry:12,rx:50,rz:-6,tx:-6,ty:13,s:1.36},follow:{ry:6,rx:21,rz:-2,tx:-2,ty:9,s:1.08},windup:220,strike:320,recover:300,cooldown:1200,weight:2.4,fx:"smashwave"},lunge:{wind:{ry:6,rx:-10,rz:4,tx:9,ty:17,s:.8},hit:{ry:-4,rx:42,rz:-22,tx:-15,ty:-16,s:1.46},follow:{ry:-2,rx:24,rz:-14,tx:-9,ty:-6,s:1.18},windup:110,strike:85,recover:155,cooldown:420,weight:.9,fx:"streak"},swipe:{wind:{ry:40,rx:-8,rz:44,tx:12,ty:4,s:.96},hit:{ry:-42,rx:12,rz:-50,tx:-26,ty:-4,s:1.16},follow:{ry:-14,rx:4,rz:-24,tx:-10,ty:0,s:1},windup:120,strike:205,recover:200,cooldown:640,weight:1.1,fx:"arc"},axeChop:{wind:{ry:6,rx:-14,rz:14,tx:5,ty:-22,s:.94},hit:{ry:-12,rx:22,rz:-20,tx:-9,ty:24,s:1.18},follow:{ry:-8,rx:14,rz:-14,tx:-5,ty:16,s:1.06},windup:150,strike:230,recover:220,cooldown:820,weight:1.6,fx:"arcBig",imgSpin:{wind:34,hit:-76,follow:-34}},maulSmash:{wind:{ry:6,rx:-16,rz:12,tx:4,ty:-24,s:.96},hit:{ry:-12,rx:24,rz:-18,tx:-7,ty:28,s:1.3},follow:{ry:-8,rx:15,rz:-12,tx:-4,ty:18,s:1.08},windup:220,strike:320,recover:300,cooldown:1200,weight:2.4,fx:"smashwave",imgSpin:{wind:30,hit:-56,follow:-26}}},vi=[{id:"sword",name:"Espada",url:Sv,slot:"main",grip:"1h",style:"slash",scale:1,dmg:1,cls:"Guerreiro"},{id:"greatsword",name:"Espadão",url:Tv,slot:"main",grip:"2h",style:"smash",scale:1.2,dmg:3,cls:"Guerreiro",cooldown:1150},{id:"axe",name:"Machado",url:Ev,slot:"main",grip:"1h",style:"axeChop",scale:1,dmg:2,cls:"Guerreiro"},{id:"dagger",name:"Adaga",url:Av,slot:"main",grip:"1h",style:"quickslash",scale:.64,dmg:1,cls:"Ladino",cooldown:280},{id:"rapier",name:"Rapieira",url:Rv,slot:"main",grip:"1h",style:"lunge",scale:1.05,dmg:1,cls:"Ladino",cooldown:420},{id:"maul",name:"Marreta",url:Cv,slot:"main",grip:"2h",style:"maulSmash",scale:1.12,dmg:3,cls:"Clérigo",cooldown:1260},{id:"mace",name:"Maça",url:Lv,slot:"main",grip:"1h",style:"chop",scale:.96,dmg:2,cls:"Clérigo"},{id:"staff",name:"Cajado",url:Pv,slot:"main",grip:"2h",style:"swipe",scale:1.06,dmg:1,cls:"Mago",tint:"arcane"},{id:"shield",name:"Escudo",url:Uv,slot:"off",grip:"1h",style:"slash",scale:.9,dmg:0,cls:"Guerreiro"},{id:"orb",name:"Orbe",url:Dv,slot:"off",grip:"1h",style:"swipe",scale:.8,dmg:0,cls:"Mago",tint:"arcane"}],kv=Object.fromEntries(vi.map(s=>[s.id,s])),Cd=""+new URL("sk_clerigo_01-m02oqn3i.png",import.meta.url).href,Ld=""+new URL("sk_clerigo_02-gPq2kyAZ.png",import.meta.url).href,Pd=""+new URL("sk_clerigo_03-BC61m31x.png",import.meta.url).href,Ud=""+new URL("sk_clerigo_04-DkEHRfvV.png",import.meta.url).href,Dd=""+new URL("sk_clerigo_05-dnCPnZU3.png",import.meta.url).href,Id=""+new URL("sk_clerigo_06-BSo7ILHo.png",import.meta.url).href,kd=""+new URL("sk_clerigo_07-CjoSnkTy.png",import.meta.url).href,Nd=""+new URL("sk_clerigo_08-DCl_nzII.png",import.meta.url).href,Fd=""+new URL("sk_clerigo_09-Ba1vsp2b.png",import.meta.url).href,Od=""+new URL("sk_clerigo_10-mdVYVSAr.png",import.meta.url).href,zd=""+new URL("sk_clerigo_11-CjethmxR.png",import.meta.url).href,Bd=""+new URL("sk_clerigo_12-C7S2ppC_.png",import.meta.url).href,Hd=""+new URL("sk_clerigo_13-2ncy5aSV.png",import.meta.url).href,Gd=""+new URL("sk_clerigo_14-848kFmaR.png",import.meta.url).href,Vd=""+new URL("sk_clerigo_15-DcclFDYX.png",import.meta.url).href,Wd=""+new URL("sk_guerreiro_01-D_DvW5ng.png",import.meta.url).href,Xd=""+new URL("sk_guerreiro_02-FBO4q1oa.png",import.meta.url).href,qd=""+new URL("sk_guerreiro_03-CUWaFsIC.png",import.meta.url).href,$d=""+new URL("sk_guerreiro_04-DV0sbKF9.png",import.meta.url).href,Yd=""+new URL("sk_guerreiro_05-rJJiQi-5.png",import.meta.url).href,jd=""+new URL("sk_guerreiro_06-Bx2EDwMO.png",import.meta.url).href,Zd=""+new URL("sk_guerreiro_07-97R_0COd.png",import.meta.url).href,Kd=""+new URL("sk_guerreiro_08-UGcmyoGh.png",import.meta.url).href,Jd=""+new URL("sk_guerreiro_09-CDQwpzrD.png",import.meta.url).href,Qd=""+new URL("sk_guerreiro_10-BZXnW6l3.png",import.meta.url).href,tu=""+new URL("sk_guerreiro_11-CSJNGa0I.png",import.meta.url).href,eu=""+new URL("sk_guerreiro_12-CWNNgDQ8.png",import.meta.url).href,nu=""+new URL("sk_guerreiro_13-oyA7SeL2.png",import.meta.url).href,iu=""+new URL("sk_guerreiro_14-CDK00urm.png",import.meta.url).href,su=""+new URL("sk_guerreiro_15-vYbsrG8W.png",import.meta.url).href,ru=""+new URL("sk_ladino_01-D7vColft.png",import.meta.url).href,ou=""+new URL("sk_ladino_02-4cW8vrhW.png",import.meta.url).href,au=""+new URL("sk_ladino_03-BrcSubEV.png",import.meta.url).href,lu=""+new URL("sk_ladino_04-GxMm6DeJ.png",import.meta.url).href,cu=""+new URL("sk_ladino_05-BrLAnd-q.png",import.meta.url).href,hu=""+new URL("sk_ladino_06-D1z7SCpz.png",import.meta.url).href,du=""+new URL("sk_ladino_07-B7RhJ0wt.png",import.meta.url).href,uu=""+new URL("sk_ladino_08-D4FbpQ9F.png",import.meta.url).href,fu=""+new URL("sk_ladino_09-faeULULl.png",import.meta.url).href,pu=""+new URL("sk_ladino_10-cZSfMIhT.png",import.meta.url).href,mu=""+new URL("sk_ladino_11-CDqqIQHS.png",import.meta.url).href,gu=""+new URL("sk_ladino_12-CZDoISs5.png",import.meta.url).href,_u=""+new URL("sk_ladino_13-DsM2ayWP.png",import.meta.url).href,xu=""+new URL("sk_ladino_14-D3917R8E.png",import.meta.url).href,vu=""+new URL("sk_ladino_15-B5aZcXUE.png",import.meta.url).href,bu=""+new URL("sk_mago_01-CXK3NXsg.png",import.meta.url).href,Mu=""+new URL("sk_mago_02-wMfvdygl.png",import.meta.url).href,wu=""+new URL("sk_mago_03-DuqDF8qS.png",import.meta.url).href,yu=""+new URL("sk_mago_04-FHIO0qBl.png",import.meta.url).href,Su=""+new URL("sk_mago_05-D3v0cqW2.png",import.meta.url).href,Tu=""+new URL("sk_mago_06-BifuIDkE.png",import.meta.url).href,Eu=""+new URL("sk_mago_07-DVhdUIDL.png",import.meta.url).href,Au=""+new URL("sk_mago_08-DODapwyo.png",import.meta.url).href,Ru=""+new URL("sk_mago_09-B1FddkFu.png",import.meta.url).href,Cu=""+new URL("sk_mago_10-BJROR30h.png",import.meta.url).href,Lu=""+new URL("sk_mago_11-DgeCLkpn.png",import.meta.url).href,Pu=""+new URL("sk_mago_12-DNW7MwiE.png",import.meta.url).href,Uu=""+new URL("sk_mago_13-B3xLYzpF.png",import.meta.url).href,Du=""+new URL("sk_mago_14-BkU-TOV-.png",import.meta.url).href,Iu=""+new URL("sk_mago_15-B9MA9n-l.png",import.meta.url).href,ku=""+new URL("sk_passive_01-BybXLWP1.png",import.meta.url).href,Nu=""+new URL("sk_passive_02-yMe2uQlm.png",import.meta.url).href,Fu=""+new URL("sk_passive_03-CfLR3Po9.png",import.meta.url).href,Ou=""+new URL("sk_passive_04-BxwW4T3S.png",import.meta.url).href,zu=""+new URL("sk_passive_05-aKrH619S.png",import.meta.url).href,Bu=""+new URL("sk_passive_06-C8qd30Xb.png",import.meta.url).href,Hu=""+new URL("sk_passive_07-C4-U9Z10.png",import.meta.url).href,Gu=""+new URL("sk_passive_08-Ql7Qlb7A.png",import.meta.url).href,Vu=""+new URL("sk_passive_09-DuzOFh2V.png",import.meta.url).href,Wu=""+new URL("sk_passive_10-BEytT8Z3.png",import.meta.url).href,Xu=""+new URL("sk_passive_11-BNx9pVVc.png",import.meta.url).href,qu=""+new URL("sk_passive_12-ChLS0a2U.png",import.meta.url).href,$u=""+new URL("sk_passive_13-Db0gOpKs.png",import.meta.url).href,Yu=""+new URL("sk_passive_14-Dgyd0quO.png",import.meta.url).href,ju=""+new URL("sk_passive_15-B_UeHSwf.png",import.meta.url).href,Zu=""+new URL("sk_passive_16-TWzCSpNO.png",import.meta.url).href,Nv=""+new URL("bg_guerreiro-DWgmGaUG.jpg",import.meta.url).href,Fv=""+new URL("bg_ladino-B6L4a-g-.jpg",import.meta.url).href,Ov=""+new URL("bg_mago-Bct2J94D.jpg",import.meta.url).href,zv=""+new URL("bg_clerigo-BUhJVnRj.jpg",import.meta.url).href,Bv=Object.assign({"../assets/ui/skills/sk_clerigo_01.png":Cd,"../assets/ui/skills/sk_clerigo_02.png":Ld,"../assets/ui/skills/sk_clerigo_03.png":Pd,"../assets/ui/skills/sk_clerigo_04.png":Ud,"../assets/ui/skills/sk_clerigo_05.png":Dd,"../assets/ui/skills/sk_clerigo_06.png":Id,"../assets/ui/skills/sk_clerigo_07.png":kd,"../assets/ui/skills/sk_clerigo_08.png":Nd,"../assets/ui/skills/sk_clerigo_09.png":Fd,"../assets/ui/skills/sk_clerigo_10.png":Od,"../assets/ui/skills/sk_clerigo_11.png":zd,"../assets/ui/skills/sk_clerigo_12.png":Bd,"../assets/ui/skills/sk_clerigo_13.png":Hd,"../assets/ui/skills/sk_clerigo_14.png":Gd,"../assets/ui/skills/sk_clerigo_15.png":Vd,"../assets/ui/skills/sk_guerreiro_01.png":Wd,"../assets/ui/skills/sk_guerreiro_02.png":Xd,"../assets/ui/skills/sk_guerreiro_03.png":qd,"../assets/ui/skills/sk_guerreiro_04.png":$d,"../assets/ui/skills/sk_guerreiro_05.png":Yd,"../assets/ui/skills/sk_guerreiro_06.png":jd,"../assets/ui/skills/sk_guerreiro_07.png":Zd,"../assets/ui/skills/sk_guerreiro_08.png":Kd,"../assets/ui/skills/sk_guerreiro_09.png":Jd,"../assets/ui/skills/sk_guerreiro_10.png":Qd,"../assets/ui/skills/sk_guerreiro_11.png":tu,"../assets/ui/skills/sk_guerreiro_12.png":eu,"../assets/ui/skills/sk_guerreiro_13.png":nu,"../assets/ui/skills/sk_guerreiro_14.png":iu,"../assets/ui/skills/sk_guerreiro_15.png":su,"../assets/ui/skills/sk_ladino_01.png":ru,"../assets/ui/skills/sk_ladino_02.png":ou,"../assets/ui/skills/sk_ladino_03.png":au,"../assets/ui/skills/sk_ladino_04.png":lu,"../assets/ui/skills/sk_ladino_05.png":cu,"../assets/ui/skills/sk_ladino_06.png":hu,"../assets/ui/skills/sk_ladino_07.png":du,"../assets/ui/skills/sk_ladino_08.png":uu,"../assets/ui/skills/sk_ladino_09.png":fu,"../assets/ui/skills/sk_ladino_10.png":pu,"../assets/ui/skills/sk_ladino_11.png":mu,"../assets/ui/skills/sk_ladino_12.png":gu,"../assets/ui/skills/sk_ladino_13.png":_u,"../assets/ui/skills/sk_ladino_14.png":xu,"../assets/ui/skills/sk_ladino_15.png":vu,"../assets/ui/skills/sk_mago_01.png":bu,"../assets/ui/skills/sk_mago_02.png":Mu,"../assets/ui/skills/sk_mago_03.png":wu,"../assets/ui/skills/sk_mago_04.png":yu,"../assets/ui/skills/sk_mago_05.png":Su,"../assets/ui/skills/sk_mago_06.png":Tu,"../assets/ui/skills/sk_mago_07.png":Eu,"../assets/ui/skills/sk_mago_08.png":Au,"../assets/ui/skills/sk_mago_09.png":Ru,"../assets/ui/skills/sk_mago_10.png":Cu,"../assets/ui/skills/sk_mago_11.png":Lu,"../assets/ui/skills/sk_mago_12.png":Pu,"../assets/ui/skills/sk_mago_13.png":Uu,"../assets/ui/skills/sk_mago_14.png":Du,"../assets/ui/skills/sk_mago_15.png":Iu,"../assets/ui/skills/sk_passive_01.png":ku,"../assets/ui/skills/sk_passive_02.png":Nu,"../assets/ui/skills/sk_passive_03.png":Fu,"../assets/ui/skills/sk_passive_04.png":Ou,"../assets/ui/skills/sk_passive_05.png":zu,"../assets/ui/skills/sk_passive_06.png":Bu,"../assets/ui/skills/sk_passive_07.png":Hu,"../assets/ui/skills/sk_passive_08.png":Gu,"../assets/ui/skills/sk_passive_09.png":Vu,"../assets/ui/skills/sk_passive_10.png":Wu,"../assets/ui/skills/sk_passive_11.png":Xu,"../assets/ui/skills/sk_passive_12.png":qu,"../assets/ui/skills/sk_passive_13.png":$u,"../assets/ui/skills/sk_passive_14.png":Yu,"../assets/ui/skills/sk_passive_15.png":ju,"../assets/ui/skills/sk_passive_16.png":Zu}),Gl=s=>Bv[`../assets/ui/skills/${s}.png`],Hv=["dmg","mdmg","life","mana","def","mres","prec","crit","critd","eva","aspd","leech","poison","regen","cdr","block"],Vl={};Hv.forEach((s,t)=>{const e=Gl(`sk_passive_${String(t+1).padStart(2,"0")}`);e&&(Vl[s]=e)});Vl.rage=Gl("sk_passive_02");const Ah={dmg:{sym:"⚔",color:"#d9694c",label:"Dano Físico"},mdmg:{sym:"✦",color:"#8a6cff",label:"Dano Mágico"},life:{sym:"❤",color:"#e0564c",label:"Vida"},mana:{sym:"◆",color:"#4f9be0",label:"Mana"},def:{sym:"🛡",color:"#9fb0c4",label:"Defesa"},mres:{sym:"◈",color:"#7fa0d8",label:"Resist. Mágica"},prec:{sym:"◎",color:"#d8c86a",label:"Precisão"},crit:{sym:"✸",color:"#e0b84c",label:"Chance Crítica"},critd:{sym:"✷",color:"#e08a3c",label:"Dano Crítico"},eva:{sym:"≈",color:"#9fd8c0",label:"Evasão"},aspd:{sym:"⚡",color:"#e6d24a",label:"Vel. de Ataque"},leech:{sym:"❦",color:"#c0463c",label:"Roubo de Vida"},poison:{sym:"☣",color:"#7fc04c",label:"Veneno"},regen:{sym:"✚",color:"#7fd08a",label:"Regeneração"},cdr:{sym:"⧗",color:"#c0a0e0",label:"Redução de Recarga"},block:{sym:"⬡",color:"#b8c0cc",label:"Bloqueio"},rage:{sym:"🔥",color:"#e06a3c",label:"Fúria"}},Gv={dmg:.03,mdmg:.03,life:.05,mana:.05,def:2,mres:2,prec:2,crit:.02,critd:.06,eva:.02,aspd:.03,leech:.02,poison:.04,regen:1,cdr:.03,block:.02,rage:.04};function Vv(s){const t={};for(const e of Object.values(ls))if(e)for(const n of e.branches)for(const i of n.skills){const r=s[i.id]||0;r<=0||i.kind!=="passive"||!i.stat||(t[i.stat]=(t[i.stat]||0)+r*Gv[i.stat])}return t}const Ut=(s,t,e,n,i=1)=>({id:s,name:t,kind:"active",desc:n,maxRank:i,icon:Gl(e)}),Qt=(s,t,e,n,i=5)=>({id:s,name:t,kind:"passive",desc:n,maxRank:i,stat:e}),Wv={classId:"guerreiro",bg:Nv,branches:[{id:"armas",name:"Armas",color:"#d9a34a",skills:[Ut("g_golpe_poderoso","Golpe Poderoso","sk_guerreiro_01","Um golpe forte que causa dano bruto no alvo.",5),Qt("g_afiacao","Afiação","dmg","+3% Dano Físico por rank."),Ut("g_investida","Investida","sk_guerreiro_02","Avança até o inimigo e o atordoa por um instante.",3),Qt("g_precisao","Mira de Guerra","prec","+2 Precisão por rank."),Ut("g_golpe_giratorio","Golpe Giratório","sk_guerreiro_03","Gira a arma acertando todos ao redor.",5),Qt("g_gume","Gume Cruel","crit","+2% Chance Crítica por rank."),Ut("g_quebra_armadura","Quebra-Armadura","sk_guerreiro_04","Reduz a defesa do alvo por alguns segundos.",3),Qt("g_brutalidade","Brutalidade","critd","+8% Dano Crítico por rank."),Ut("g_decapitar","Decapitar","sk_guerreiro_05","Executa alvos com pouca vida, dano massivo.",3)]},{id:"baluarte",name:"Baluarte",color:"#9fb0c4",skills:[Qt("g_pele_ferro","Pele de Ferro","def","+3 Defesa por rank."),Ut("g_provocar","Provocar","sk_guerreiro_06","Força o inimigo a atacar você (aggro).",3),Qt("g_vigor","Vigor","life","+5% Vida por rank."),Ut("g_muro_escudo","Muro de Escudo","sk_guerreiro_07","Aumenta muito o bloqueio por um tempo.",5),Qt("g_fortaleza","Fortaleza","mres","+2 Resist. Mágica por rank."),Ut("g_reflexao","Reflexão","sk_guerreiro_08","Ao bloquear, reflete parte do dano.",3),Qt("g_guarda","Guarda Firme","block","+3% Bloqueio por rank."),Ut("g_aco_absoluto","Aço Absoluto","sk_guerreiro_09","Fica imune a dano por um breve instante.",3),Ut("g_ultimo_suspiro","Último Suspiro","sk_guerreiro_10","Cura ao chegar perto da morte (com recarga).",3)]},{id:"furia",name:"Fúria",color:"#e0623c",skills:[Qt("g_furia_batalha","Fúria de Batalha","rage","+4% Dano quanto menor a Vida (por rank)."),Ut("g_grito_guerra","Grito de Guerra","sk_guerreiro_11","Grito que aumenta o dano do herói.",5),Qt("g_sede_sangue","Sede de Sangue","leech","+2% Roubo de Vida por rank."),Ut("g_frenesi","Frenesi","sk_guerreiro_12","Aumenta a velocidade de ataque temporariamente.",5),Qt("g_adrenalina","Adrenalina","aspd","+3% Vel. de Ataque por rank."),Ut("g_investida_brutal","Investida Brutal","sk_guerreiro_13","Avança causando dano e empurrando o alvo.",3),Qt("g_folego","Fôlego","regen","+1% Vida regenerada por rank."),Ut("g_terremoto","Terremoto","sk_guerreiro_14","Pisada que atordoa e fere em área.",3),Ut("g_golpe_final","Golpe Final","sk_guerreiro_15","Golpe devastador de recarga longa.",3)]}]},Xv={classId:"ladino",bg:Fv,branches:[{id:"assassino",name:"Assassino",color:"#d94c6a",skills:[Ut("l_apunhalar","Apunhalar","sk_ladino_01","Golpe pelas costas com dano crítico garantido.",5),Qt("l_precisao_letal","Precisão Letal","crit","+2% Chance Crítica por rank."),Ut("l_rajada_laminas","Rajada de Lâminas","sk_ladino_02","Vários golpes rápidos em sequência.",5),Qt("l_execucao","Execução","critd","+8% Dano Crítico por rank."),Ut("l_golpe_sombras","Golpe nas Sombras","sk_ladino_03","Teleporta atrás do alvo e ataca.",3),Qt("l_ponto_fraco","Ponto Fraco","dmg","+3% Dano em alvos com vida cheia (por rank)."),Ut("l_estocada","Estocada Perfurante","sk_ladino_04","Estocada que ignora parte da defesa.",3),Ut("l_execucao_a","Golpe Mortal","sk_ladino_05","Executa alvos com pouca vida.",3)]},{id:"sombra",name:"Sombra",color:"#7fb08a",skills:[Qt("l_reflexos","Reflexos","eva","+2% Evasão por rank."),Ut("l_passo_sombrio","Passo Sombrio","sk_ladino_06","Esquiva rápida reposicionando o herói.",3),Qt("l_lamina_env","Lâmina Envenenada","poison","+3% Dano de Veneno por rank."),Ut("l_bomba_fumaca","Bomba de Fumaça","sk_ladino_07","Solta fumaça e aumenta a evasão.",3),Qt("l_camuflagem","Camuflagem","eva","+2% Evasão ao ficar parado (por rank)."),Ut("l_nuvem_toxica","Nuvem Tóxica","sk_ladino_08","Nuvem venenosa que fere em área.",5),Ut("l_desaparecer","Desaparecer","sk_ladino_09","Some por um instante e zera a ameaça.",3),Ut("l_toxina","Toxina","sk_ladino_10","Aplica um veneno forte no alvo.",5)]},{id:"precisao",name:"Precisão",color:"#d8c86a",skills:[Qt("l_agilidade","Agilidade","aspd","+3% Vel. de Ataque por rank."),Ut("l_rajada_dupla","Rajada Dupla","sk_ladino_11","Dois golpes rápidos num só toque.",5),Qt("l_maos_rapidas","Mãos Rápidas","cdr","−2% Recarga por rank."),Ut("l_arremesso","Arremesso de Adaga","sk_ladino_12","Lança uma adaga à distância.",5),Qt("l_passos_leves","Passos Leves","eva","+2% Evasão ao se mover (por rank)."),Ut("l_contra_ataque","Contra-Ataque","sk_ladino_13","Revida ao esquivar de um golpe.",3),Qt("l_olhar","Olhar Aguçado","prec","+2 Precisão por rank."),Ut("l_danca_laminas","Dança das Lâminas","sk_ladino_14","Gira acertando vários alvos ao redor.",5),Ut("l_marca_mortal","Marca Mortal","sk_ladino_15","Marca o alvo: ele recebe mais dano.",3)]}]},qv={classId:"mago",bg:Ov,branches:[{id:"chamas",name:"Chamas",color:"#e0672c",skills:[Ut("m_bola_fogo","Bola de Fogo","sk_mago_01","Lança um projétil flamejante no alvo.",5),Qt("m_piromania","Piromania","mdmg","+3% Dano de Fogo por rank."),Ut("m_explosao_fogo","Explosão de Fogo","sk_mago_02","Explosão que fere em área.",5),Qt("m_combustao","Combustão","crit","+2% chance de magia crítica por rank."),Ut("m_meteoro","Meteoro","sk_mago_03","Invoca um meteoro devastador em área.",3),Qt("m_chama_persist","Chama Persistente","poison","+3% Dano de queimadura por rank."),Ut("m_muralha_fogo","Muralha de Fogo","sk_mago_04","Cria uma zona de fogo contínua.",3),Ut("m_imolacao","Imolação","sk_mago_05","Aura ardente que queima inimigos próximos.",5)]},{id:"gelo_arcano",name:"Gelo & Arcano",color:"#4f9be0",skills:[Qt("m_frieza","Frieza","mres","+2 Resist. Mágica por rank."),Ut("m_nova_gelo","Nova de Gelo","sk_mago_06","Congela os inimigos ao redor.",5),Qt("m_foco_arcano","Foco Arcano","cdr","−2% Recarga por rank."),Ut("m_lanca_gelo","Lança de Gelo","sk_mago_07","Estilhaço de gelo que perfura.",5),Qt("m_barreira","Barreira","def","+2 Defesa por rank."),Ut("m_escudo_arcano","Escudo Arcano","sk_mago_08","Escudo que absorve dano por um tempo.",5),Ut("m_teleporte","Teleporte","sk_mago_09","Reposiciona instantaneamente.",3),Ut("m_prisao_gelo","Prisão de Gelo","sk_mago_10","Prende o alvo num bloco de gelo.",3)]},{id:"tempestade",name:"Tempestade",color:"#9a6cff",skills:[Ut("m_raio_arcano","Raio Arcano","sk_mago_11","Raio que atinge o alvo em linha.",5),Qt("m_conducao","Condução","mdmg","+3% Dano de Raio por rank."),Ut("m_corrente","Corrente","sk_mago_12","Raio que salta entre vários inimigos.",5),Qt("m_estatica","Estática","crit","+2% chance de atordoar por rank."),Ut("m_tempestade","Tempestade","sk_mago_13","Tempestade que fere em área continuamente.",3),Qt("m_energia","Energia","mana","+5% Mana por rank."),Ut("m_descarga","Descarga","sk_mago_14","Explosão de energia instantânea.",3),Ut("m_nova_arcana","Nova Arcana","sk_mago_15","Nova arcana que arrasa tudo em volta.",3)]}]},$v={classId:"clerigo",bg:zv,branches:[{id:"luz",name:"Luz",color:"#e6d38a",skills:[Ut("c_cura","Cura","sk_clerigo_01","Restaura vida do herói.",5),Qt("c_fe","Fé","regen","+3% Poder de Cura por rank."),Ut("c_cura_area","Cura em Área","sk_clerigo_02","Cura em volta do herói.",5),Qt("c_graca","Graça","mana","+4% Regeneração de Mana por rank."),Ut("c_bencao","Bênção","sk_clerigo_03","Abençoa o herói, aumentando atributos.",3),Qt("c_vigor_divino","Vigor Divino","life","+4% Vida por rank."),Ut("c_aura_protecao","Aura de Proteção","sk_clerigo_04","Reduz o dano recebido por um tempo.",3),Ut("c_renovacao","Renovação","sk_clerigo_05","Cura contínua ao longo do tempo.",5)]},{id:"julgamento",name:"Julgamento",color:"#e0a63c",skills:[Ut("c_martelo_sagrado","Martelo Sagrado","sk_clerigo_06","Golpe de dano sagrado no alvo.",5),Qt("c_zelo","Zelo","mdmg","+3% Dano Sagrado por rank."),Ut("c_punicao","Punição","sk_clerigo_07","Fere e reduz a cura do alvo.",5),Qt("c_conviccao","Convicção","dmg","+3% Dano com a vida cheia (por rank)."),Ut("c_luz_radiante","Luz Radiante","sk_clerigo_08","Explosão de luz que fere em área.",5),Qt("c_fervor","Fervor","aspd","+3% Vel. de conjuração por rank."),Ut("c_selo_sagrado","Selo Sagrado","sk_clerigo_09","Selo que explode após alguns segundos.",3),Ut("c_condenacao","Condenação","sk_clerigo_10","Pilar de luz sagrada de grande dano.",3)]},{id:"fe",name:"Fé",color:"#cbb8e0",skills:[Qt("c_devocao","Devoção","mres","+2 Resist. Mágica por rank."),Ut("c_escudo_divino","Escudo Divino","sk_clerigo_11","Fica imune a dano por um breve instante.",3),Qt("c_perseveranca","Perseverança","regen","+1% Vida regenerada por rank."),Ut("c_repreensao","Repreensão","sk_clerigo_12","Clarão que atordoa os inimigos.",3),Qt("c_martir","Mártir","leech","+2% do dano causado vira cura (por rank)."),Ut("c_intervencao","Intervenção","sk_clerigo_13","Cura forte + escudo instantâneo.",3),Ut("c_ressurreicao","Ressurreição","sk_clerigo_14","Revive automaticamente uma vez (recarga longa).",1),Ut("c_aura_fe","Aura de Fé","sk_clerigo_15","Aura que fortalece o herói continuamente.",5)]}]},ls={guerreiro:Wv,ladino:Xv,mago:qv,clerigo:$v},Be=(s,t,e)=>({target:"enemy",melee:!0,range:1,effect:"dmg",magic:!1,power:s,mana:t,cd:e}),we=(s,t,e,n,i=!0)=>({target:"enemy",melee:!1,range:t,effect:"dmg",magic:i,power:s,mana:e,cd:n}),$i=(s,t,e)=>({target:"self",melee:!1,range:0,effect:"heal",magic:!0,power:s,mana:t,cd:e}),ze=s=>({target:"self",melee:!1,range:0,effect:"buff",magic:!1,power:0,mana:s.mana,cd:s.cd,atkMul:s.atkMul,defReduc:s.defReduc,dur:s.dur}),Yv={g_golpe_poderoso:Be(16,12,4e3),g_investida:Be(12,10,6e3),g_golpe_giratorio:Be(16,14,6e3),g_quebra_armadura:Be(12,10,7e3),g_decapitar:Be(26,18,1e4),g_provocar:ze({defReduc:.25,dur:6e3,mana:8,cd:1e4}),g_muro_escudo:ze({defReduc:.5,dur:6e3,mana:14,cd:14e3}),g_reflexao:ze({defReduc:.3,dur:6e3,mana:12,cd:12e3}),g_aco_absoluto:ze({defReduc:.9,dur:3e3,mana:20,cd:2e4}),g_ultimo_suspiro:$i(90,20,16e3),g_grito_guerra:ze({atkMul:1.5,dur:8e3,mana:14,cd:14e3}),g_frenesi:ze({atkMul:1.35,dur:8e3,mana:12,cd:12e3}),g_investida_brutal:Be(18,14,8e3),g_terremoto:Be(24,18,11e3),g_golpe_final:Be(40,30,18e3),l_apunhalar:Be(18,12,4e3),l_rajada_laminas:Be(16,14,6e3),l_golpe_sombras:Be(18,14,7e3),l_estocada:Be(14,10,6e3),l_execucao_a:Be(26,18,1e4),l_passo_sombrio:ze({defReduc:.4,dur:4e3,mana:8,cd:9e3}),l_bomba_fumaca:ze({defReduc:.5,dur:5e3,mana:12,cd:12e3}),l_nuvem_toxica:we(12,3,14,8e3,!1),l_desaparecer:ze({defReduc:.8,dur:2500,mana:16,cd:16e3}),l_toxina:we(10,2,10,7e3,!1),l_rajada_dupla:Be(14,10,4e3),l_arremesso:we(16,4,12,5e3,!1),l_contra_ataque:ze({atkMul:1.3,dur:6e3,mana:10,cd:1e4}),l_danca_laminas:Be(18,16,8e3),l_marca_mortal:we(10,4,10,9e3,!1),m_bola_fogo:we(18,5,12,3500),m_explosao_fogo:we(18,4,14,6e3),m_meteoro:we(40,5,30,16e3),m_muralha_fogo:we(16,4,16,9e3),m_imolacao:we(12,2,12,7e3),m_nova_gelo:we(16,3,14,6e3),m_lanca_gelo:we(18,5,12,4500),m_escudo_arcano:ze({defReduc:.5,dur:6e3,mana:14,cd:12e3}),m_teleporte:ze({defReduc:.3,dur:2e3,mana:10,cd:1e4}),m_prisao_gelo:we(12,4,12,9e3),m_raio_arcano:we(18,5,12,4e3),m_corrente:we(16,4,14,6e3),m_tempestade:we(26,4,20,11e3),m_descarga:we(18,3,14,6e3),m_nova_arcana:we(40,4,30,16e3),c_cura:$i(50,12,6e3),c_cura_area:$i(70,18,9e3),c_bencao:ze({atkMul:1.4,dur:1e4,mana:14,cd:14e3}),c_aura_protecao:ze({defReduc:.4,dur:8e3,mana:14,cd:12e3}),c_renovacao:$i(60,16,11e3),c_martelo_sagrado:we(18,4,12,4e3),c_punicao:we(16,4,12,6e3),c_luz_radiante:we(18,3,14,6e3),c_selo_sagrado:we(24,4,18,9e3),c_condenacao:we(38,5,28,15e3),c_escudo_divino:ze({defReduc:.9,dur:3e3,mana:20,cd:2e4}),c_repreensao:we(12,3,12,9e3),c_intervencao:$i(90,22,14e3),c_ressurreicao:$i(150,30,6e4),c_aura_fe:ze({atkMul:1.3,dur:1e4,mana:14,cd:12e3})};function _l(s){return Yv[s]??Be(12,8,4e3)}function jv(s){for(const t in ls){const e=ls[t];if(e){for(const n of e.branches)for(const i of n.skills)if(i.id===s)return i.name}}return""}function Zv(s,t){const e=ls[s];if(!e)return[];const n=[];for(const i of e.branches)for(const r of i.skills){if(r.kind!=="active")continue;const a=t[r.id]||0;a<=0||n.push({id:r.id,name:r.name,icon:r.icon,rank:a,combat:_l(r.id)})}return n}const Kv=""+new URL("hud_plate-B2ygb4FP.png",import.meta.url).href,Rh=""+new URL("eq_frame-d-QhyRgX.png",import.meta.url).href,Ch=""+new URL("eq_slot-DS9kMsLx.png",import.meta.url).href,Ku=""+new URL("eq_container-84uusXC9.png",import.meta.url).href,ga=""+new URL("btn_base-wlebnyD3.png",import.meta.url).href,Jv=""+new URL("dpad-3wZIZEqb.png",import.meta.url).href,Qv=""+new URL("ico_attack-CbdvrLXs.png",import.meta.url).href,t1=""+new URL("ico_action-BRbeFgHL.png",import.meta.url).href,e1=""+new URL("ico_inventory-B_-_sjLB.png",import.meta.url).href,_a=""+new URL("coin-CsF22FSK.png",import.meta.url).href,ao=""+new URL("load_sword-Bhnb8m09.png",import.meta.url).href,xa=""+new URL("map_frame-B4piWonF.png",import.meta.url).href,n1=""+new URL("clock_sun-DO5hSXa1.png",import.meta.url).href,i1=""+new URL("clock_moon-D1xrN5yT.png",import.meta.url).href;function s1(s,t,e,n,i,r,a,o,l,c,h){const d={};for(const O of i??[])d[O.id]=O;let u=null;const f={ArrowUp:"forward",KeyW:"forward",ArrowDown:"back",KeyS:"back",ArrowLeft:"turnLeft",KeyA:"turnLeft",ArrowRight:"turnRight",KeyD:"turnRight",KeyQ:"strafeLeft",KeyE:"strafeRight",Space:"interact",Enter:"interact",KeyF:"interact",KeyJ:"attack",KeyK:"attack"};window.addEventListener("keydown",O=>{const j=f[O.code];j&&(O.preventDefault(),t(j))});let g=null,_=null,m=null,p=null,y=null,v=null,x=!1;const E=[];g=document.createElement("div"),g.id="gh-weapon-rig",_=document.createElement("img"),_.id="gh-weapon",_.src=e,_.alt="",g.appendChild(_),m=document.createElement("div"),m.id="gh-slash",m.innerHTML='<svg viewBox="0 0 240 200" preserveAspectRatio="none"><defs><linearGradient id="ghslashg" x1="0" y1="0" x2="1" y2="0.5"><stop offset="0" stop-color="#ffffff" stop-opacity="0"/><stop offset="0.5" stop-color="#eaf6ff" stop-opacity="0.95"/><stop offset="1" stop-color="#bfe3ff" stop-opacity="0"/></linearGradient></defs><path d="M18,64 C82,20 172,30 226,112 C162,70 92,74 26,90 Z" fill="url(#ghslashg)"/><path d="M28,68 C88,30 168,42 214,104" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-opacity="0.85"/></svg>',g.appendChild(m),s.appendChild(g),p=document.createElement("div"),p.id="gh-impact",s.appendChild(p),y=document.createElement("div"),y.id="gh-shock",s.appendChild(y),v=document.createElement("div"),v.id="gh-screenflash",s.appendChild(v);let S=null;const A=document.createElement("div");A.id="gh-hud",A.innerHTML='<div class="gh-hud-bar gh-hud-hp"><div class="gh-hud-fill gh-hud-hp-fill"></div></div><div class="gh-hud-bar gh-hud-mp"><div class="gh-hud-fill gh-hud-mp-fill"></div></div>',s.appendChild(A);const R=A.querySelector(".gh-hud-hp-fill"),b=A.querySelector(".gh-hud-mp-fill"),M=document.createElement("div");M.id="gh-map";const C=document.createElement("canvas");C.id="gh-map-canvas",C.width=132,C.height=132,M.appendChild(C);const I=document.createElement("button");I.id="gh-map-expand",I.title="Expandir mapa (M)",I.innerHTML='<svg viewBox="0 0 24 24" width="14" height="14"><path fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',M.appendChild(I),s.appendChild(M);const N=C.getContext("2d"),G=4,X=document.createElement("div");X.id="gh-bigmap",X.className="gh-bigmap-hidden",X.innerHTML='<div id="gh-bigmap-win"><button id="gh-bigmap-close" title="Fechar (Esc/M)">✕</button><canvas id="gh-bigmap-canvas" width="720" height="720"></canvas></div>',s.appendChild(X);const q=X.querySelector("#gh-bigmap-canvas"),et=q.getContext("2d");let $=null;const pt=()=>!X.classList.contains("gh-bigmap-hidden"),St=(O,j,Et,st,w)=>{O.save(),O.translate(j,Et),O.rotate(w),O.beginPath(),O.moveTo(st,0),O.lineTo(-st*.7,st*.62),O.lineTo(-st*.7,-st*.62),O.closePath(),O.fillStyle="#ffd964",O.shadowColor="rgba(255,210,90,.9)",O.shadowBlur=5,O.fill(),O.restore()},Lt=O=>{const j=N;if(!j)return;const Et=window.devicePixelRatio||1,st=Math.round(C.clientWidth*Et);st>0&&C.width!==st&&(C.width=st,C.height=st);const w=C.width,U=C.height;j.clearRect(0,0,w,U),j.fillStyle="#0b0d12",j.fillRect(0,0,w,U);const F=G,H=2*F+1,D=Math.floor(w/H),J=Math.floor((w-D*H)/2);for(let dt=-F;dt<=F;dt++)for(let Tt=-F;Tt<=F;Tt++){const Dt=O.col+Tt,ot=O.row+dt,vt=Dt>=0&&Dt<O.cols&&ot>=0&&ot<O.rows;j.fillStyle=vt?O.cells[ot*O.cols+Dt]?"#54606f":"#171b22":"#0b0d12",j.fillRect(J+(Tt+F)*D,J+(dt+F)*D,D-1,D-1)}const ct=J+F*D+Math.floor(D/2);St(j,ct,ct,Math.max(4,D*.42),Math.atan2(O.dr,O.dc))},Vt=O=>{const j=et;if(!j)return;const Et=q.width,st=q.height;j.clearRect(0,0,Et,st),j.fillStyle="#0b0d12",j.fillRect(0,0,Et,st);const w=12,U=Math.max(3,Math.floor(Math.min((Et-2*w)/O.cols,(st-2*w)/O.rows))),F=U*O.cols,H=U*O.rows,D=Math.round((Et-F)/2),J=Math.round((st-H)/2);for(let ct=0;ct<O.rows;ct++)for(let dt=0;dt<O.cols;dt++)j.fillStyle=O.cells[ct*O.cols+dt]?"#5a6675":"#171b22",j.fillRect(D+dt*U,J+ct*U,U-1,U-1);St(j,D+O.col*U+U/2,J+O.row*U+U/2,Math.max(6,U*.75),Math.atan2(O.dr,O.dc))},re=()=>{X.classList.remove("gh-bigmap-hidden"),$&&Vt($)},K=()=>X.classList.add("gh-bigmap-hidden");I.addEventListener("click",O=>{O.preventDefault(),re()}),X.querySelector("#gh-bigmap-close").addEventListener("click",O=>{O.preventDefault(),K()}),X.addEventListener("click",O=>{O.target===X&&K()}),window.addEventListener("keydown",O=>{O.code==="KeyM"?(O.preventDefault(),pt()?K():re()):O.code==="Escape"&&K()});const lt=document.createElement("div");lt.id="gh-clock",lt.innerHTML=`<img class="gh-sun" src="${n1}" alt="" draggable="false"/><img class="gh-moon" src="${i1}" alt="" draggable="false"/>`,s.appendChild(lt);const At=lt.querySelector(".gh-sun"),mt=lt.querySelector(".gh-moon"),It=document.createElement("button");It.id="gh-char-btn",It.title="Personagem (C)",It.innerHTML=`<img class="gh-char-ico" src="${e1}" alt=""/>`,s.appendChild(It);const Gt=[{key:"main",label:"Arma",gc:"1 / 3",gr:"1 / 5"},{key:"off",label:"Secundária",gc:"7 / 9",gr:"1 / 5"},{key:"head",label:"Elmo",gc:"4 / 6",gr:"1 / 3"},{key:"amulet",label:"Amul.",gc:"6 / 7",gr:"2 / 3"},{key:"chest",label:"Peitoral",gc:"4 / 6",gr:"3 / 6"},{key:"ring1",label:"Anel",gc:"3 / 4",gr:"4 / 5"},{key:"ring2",label:"Anel",gc:"6 / 7",gr:"4 / 5"},{key:"hands",label:"Luvas",gc:"2 / 4",gr:"5 / 7"},{key:"belt",label:"Cinto",gc:"4 / 6",gr:"6 / 7"},{key:"feet",label:"Botas",gc:"6 / 8",gr:"5 / 7"}],qt=O=>`<div class="gh-slot" data-slot="${O.key}" title="${O.label}" style="grid-column:${O.gc};grid-row:${O.gr}"></div>`,oe=20,Yt=Array.from({length:oe},(O,j)=>`<div class="gh-bag-slot" data-bag="${j}"></div>`).join(""),Ht=document.createElement("div");Ht.id="gh-eq",Ht.className="gh-eq-hidden",Ht.innerHTML='<div id="gh-eq-win"><button id="gh-eq-close" title="Fechar (Esc)">✕</button><div id="gh-eq-inner"><div class="gh-eq-title">Personagem</div><div class="gh-eq-tabs"><button class="gh-tab gh-tab-on" data-tab="equip">Equipamento</button><button class="gh-tab" data-tab="stats">Atributos</button><button class="gh-tab" data-tab="skills">Habilidades</button></div><div class="gh-eq-body"><div class="gh-tabpane" data-pane="equip"><div class="gh-section"><div class="gh-sec-head">Equipamentos</div><div class="gh-eq-doll">'+Gt.map(qt).join("")+`</div></div><div class="gh-section"><div class="gh-sec-head gh-sec-inv">Inventário<span class="gh-gold" id="gh-gold"><img src="${_a}" alt=""/><b>0</b></span></div><div class="gh-bag">${Yt}</div></div></div><div class="gh-tabpane gh-pane-hidden" data-pane="stats"><div class="gh-eq-stats" id="gh-eq-stats"></div></div><div class="gh-tabpane gh-pane-hidden" data-pane="skills"><div id="gh-skills"></div></div></div></div></div>`,s.appendChild(Ht);const z=document.createElement("div");z.id="gh-sm",z.className="gh-eq-hidden",z.innerHTML='<div id="gh-sm-win"><button id="gh-sm-close" title="Fechar">✕</button><div id="gh-sm-body"></div></div>',s.appendChild(z);const Ee=z.querySelector("#gh-sm-body");z.querySelector("#gh-sm-close").addEventListener("click",O=>{O.preventDefault(),z.classList.add("gh-eq-hidden")});const te=O=>{const j=(H,D,J,ct,dt=!1)=>{const Tt=J>=D,Dt=dt?`<img src="${_a}" alt=""/>`:H;return`<div class="gh-sm-mat"><div class="gh-sm-mslot${dt?" gh-sm-mgold":""}">${Dt}</div><div class="gh-sm-mnum ${Tt?"gh-ok":"gh-no"}">${D}<span class="gh-sm-mhave">/${J}</span></div><div class="gh-sm-cap">${ct}</div></div>`},Et=(H,D,J=!1)=>`<div class="gh-sm-slotwrap"><div class="gh-slot gh-sm-slot${J?" gh-sm-res":""}"><img class="gh-item-ico" src="${H}"/></div><span class="gh-sm-tier${J?" gh-sm-tier-up":""}">+${D}</span></div>`,st=O.sel;let w;if(!st)w='<div class="gh-sm-empty">Escolha um item no inventário abaixo para aprimorar.</div>';else if(st.max||!st.next)w='<div class="gh-sm-forge"><div class="gh-sm-col"><div class="gh-sm-lbl">ITEM</div>'+Et(st.icon,st.lvl)+`<div class="gh-sm-nm">${st.name} +${st.lvl}</div><div class="gh-sm-dmg">Dano ${st.dmg}</div></div></div><div class="gh-sm-max">Reforço máximo atingido.</div>`;else{const H=st.next,D=O.gold>=H.gold,J=O.mats.madeira>=H.madeira&&O.mats.minerio>=H.minerio&&O.mats.reforco>=H.reforco&&D;w='<div class="gh-sm-forge"><div class="gh-sm-col"><div class="gh-sm-lbl">ITEM</div>'+Et(st.icon,st.lvl)+`<div class="gh-sm-nm">${st.name}${st.lvl?" +"+st.lvl:""}</div><div class="gh-sm-dmg">Dano ${st.dmg}</div></div><div class="gh-sm-arrow">➜</div><div class="gh-sm-col"><div class="gh-sm-lbl">RESULTADO</div>`+Et(st.icon,st.lvl+1,!0)+`<div class="gh-sm-nm gh-up">${st.name} +${st.lvl+1}</div><div class="gh-sm-dmg">Dano <span class="gh-g">${H.dmg} ▲</span></div></div></div><div class="gh-sm-mats-h">MATERIAIS NECESSÁRIOS</div><div class="gh-sm-mats">`+j("🪵",H.madeira,O.mats.madeira,"Madeira")+j("🪨",H.minerio,O.mats.minerio,"Minério")+j("🔶",H.reforco,O.mats.reforco,"Pedra de Reforço")+j("",H.gold,O.gold,"Ouro",!0)+`</div><div class="gh-sm-forgewrap"><div class="gh-sm-forgebtn ${J?"gh-sm-hot":"gh-sm-cold"}" id="gh-sm-up"></div><div class="gh-sm-forgelbl ${J?"":"gh-sm-lblno"}">${J?"APRIMORAR":"FALTAM MATERIAIS"}</div></div>`}const U=[];for(let H=0;H<oe;H++){const D=O.items[H];if(!D){U.push('<div class="gh-bag-slot gh-sm-cell"></div>');continue}U.push(`<div class="gh-bag-slot gh-sm-cell ${st&&D.id===st.id?"gh-sm-sel":""}" data-sid="${D.id}"><img class="gh-item-ico" src="${D.icon}" title="${D.name}"/>${D.lvl?`<span class="gh-sm-badge">+${D.lvl}</span>`:""}</div>`)}Ee.innerHTML=`<div class="gh-eq-title gh-sm-title">Ferreiro — A Bigorna</div><div class="gh-section gh-sm-sec">${w}</div><div class="gh-section gh-sm-sec"><div class="gh-sec-head gh-sec-inv">Inventário<span class="gh-gold"><img src="${_a}" alt=""/><b>${O.gold}</b></span></div><div class="gh-bag gh-sm-bag">${U.join("")}</div></div>`,Ee.querySelectorAll("[data-sid]").forEach(H=>{H.onclick=()=>c?.(H.dataset.sid)});const F=Ee.querySelector("#gh-sm-up");F&&(F.onclick=()=>h?.())};Ht.querySelectorAll(".gh-tab").forEach(O=>O.addEventListener("click",j=>{j.preventDefault();const Et=O.dataset.tab;Ht.querySelectorAll(".gh-tab").forEach(st=>st.classList.toggle("gh-tab-on",st===O)),Ht.querySelectorAll(".gh-tabpane").forEach(st=>st.classList.toggle("gh-pane-hidden",st.dataset.pane!==Et))}));const jt=Ht.querySelector("#gh-eq-stats");jt.addEventListener("click",O=>{const j=O.target.closest(".gh-pm");if(!j||j.hasAttribute("disabled"))return;O.preventDefault();const Et=j.dataset.attr,st=Number(j.dataset.d||"0");Et&&st&&l?.(Et,st)});const kt=Ht.querySelector("#gh-gold b"),ce=Array.from(Ht.querySelectorAll(".gh-bag-slot")),Rt=Ht.querySelector("#gh-skills");let L="",T=0;const V={};let tt=null;const it=()=>Object.values(V).reduce((O,j)=>O+j,0),Q=O=>{const j=ls[L];if(!j)return null;for(const Et of j.branches){const st=Et.skills.findIndex(w=>w.id===O);if(st>=0){const w=Et.skills[st],U=st>0?Et.skills[st-1]:null,F=!U||(V[U.id]||0)>=1,H=V[O]||0,D=H>=w.maxRank,J=T-it();return{sk:w,unlocked:F,rank:H,maxed:D,canBuy:F&&!D&&J>0}}}return null},Ct=()=>{const O=ls[L];if(!O){Rt.innerHTML='<div class="gh-sk-soon">A árvore de habilidades desta classe chega em breve.</div>';return}const j=T-it(),Et=O.branches.map(F=>{const H=F.skills.map((D,J)=>{const ct=V[D.id]||0,dt=J>0?F.skills[J-1]:null,Tt=!dt||(V[dt.id]||0)>=1,Dt=ct>=D.maxRank,ot=Tt&&!Dt&&j>0,vt=D.kind==="active"?"gh-sk-active":"gh-sk-passive",se=[ct>0?"gh-sk-on":"",Tt?"":"gh-sk-locked",ot?"gh-sk-buy":"",D.id===tt?"gh-sk-sel":""].join(" "),ue=D.stat?Vl[D.stat]:void 0,_e=D.kind==="active"&&D.icon?`<img src="${D.icon}" alt=""/>`:ue?`<img src="${ue}" alt=""/>`:`<span class="gh-sk-sym" style="color:${D.stat?Ah[D.stat].color:"#ccc"}">${D.stat?Ah[D.stat].sym:"?"}</span>`;return`${J>0?`<div class="gh-sk-line" style="background:${F.color}"></div>`:""}<button class="gh-sk-node ${vt} ${se}" data-sk="${D.id}">${_e}<span class="gh-sk-rank">${ct}/${D.maxRank}</span></button>`}).join("");return`<div class="gh-sk-branch"><div class="gh-sk-bhead" style="color:${F.color}">${F.name}</div>${H}</div>`}).join("");let st='<div class="gh-sk-thint">Toque num nó pra ver os detalhes; depois confirme para gastar o ponto.</div>';const w=tt?Q(tt):null;if(w){const{sk:F,unlocked:H,rank:D,maxed:J,canBuy:ct}=w;let dt;J?dt='<span class="gh-sk-cbtn gh-sk-cdim">No máximo</span>':H?ct?dt=`<button class="gh-sk-cbtn gh-sk-cbuy" id="gh-sk-confirm">${D>0?`Melhorar → ${D+1}/${F.maxRank}`:"Aprender"} · 1 ponto</button>`:dt='<span class="gh-sk-cbtn gh-sk-cdim">Sem pontos</span>':dt='<span class="gh-sk-cbtn gh-sk-cdim">Requer o nó acima</span>',st=`<div class="gh-sk-tname"><b>${F.name}</b> <i>${F.kind==="active"?"Ativa":"Passiva"} · ${D}/${F.maxRank}</i></div><div class="gh-sk-tdesc">${F.desc}</div>${dt}`}Rt.innerHTML=`<div class="gh-sk-top">Pontos: <b class="${j>0?"gh-sk-pts":""}">${j}</b></div><div class="gh-sk-cols">${Et}</div><div class="gh-sk-tip" id="gh-sk-tip">${st}</div>`,O.bg?(Rt.style.backgroundImage=`linear-gradient(rgba(7,7,11,.66), rgba(7,7,11,.66)), url(${O.bg})`,Rt.style.backgroundSize="cover",Rt.style.backgroundPosition="center top",Rt.style.backgroundRepeat="no-repeat"):Rt.style.backgroundImage="",Rt.querySelectorAll(".gh-sk-node").forEach(F=>{F.addEventListener("click",()=>{tt=F.dataset.sk,Ct()})});const U=Rt.querySelector("#gh-sk-confirm");U&&U.addEventListener("click",()=>{const F=tt?Q(tt):null;F&&F.canBuy&&(V[F.sk.id]=F.rank+1,Ct(),a?.(V))})},_t=()=>Ht.classList.remove("gh-eq-hidden"),yt=()=>Ht.classList.add("gh-eq-hidden"),ee=()=>Ht.classList.contains("gh-eq-hidden")?_t():yt();It.addEventListener("click",O=>{O.preventDefault(),ee()}),Ht.querySelector("#gh-eq-close").addEventListener("click",O=>{O.preventDefault(),yt()}),Ht.addEventListener("click",O=>{O.target===Ht&&yt()}),window.addEventListener("keydown",O=>{O.code==="KeyC"?(O.preventDefault(),ee()):O.code==="Escape"&&yt()});const at=document.createElement("div");at.id="gh-dmg",s.appendChild(at);const bt=document.createElement("div");bt.id="gh-toast",s.appendChild(bt);const Pt=document.createElement("div");Pt.id="gh-cast",Pt.innerHTML='<span class="gh-cast-name"></span><span class="gh-cast-frame"><span class="gh-cast-track"><i class="gh-cast-fill"></i></span></span>',s.appendChild(Pt);const Bt=Pt.querySelector(".gh-cast-name"),Mt=Pt.querySelector(".gh-cast-fill");let Wt=0;const Xt=document.createElement("div");Xt.id="gh-float",s.appendChild(Xt);const ne=document.createElement("div");ne.id="pad",s.appendChild(ne);const B=O=>`<img class="gh-btn-ico" src="${O}" alt="" draggable="false"/>`,gt=(O,j)=>{let Et;const st=U=>{U.preventDefault(),t(j),Et=window.setInterval(()=>t(j),Rd)},w=()=>{Et&&window.clearInterval(Et),Et=void 0};O.addEventListener("pointerdown",st),O.addEventListener("pointerup",w),O.addEventListener("pointerleave",w),O.addEventListener("pointercancel",w),O.addEventListener("contextmenu",U=>U.preventDefault())},Y=document.createElement("div");Y.className="gh-cluster gh-move";const W=(O,j)=>{const Et=document.createElement("button");return Et.className="gh-dtap "+j,gt(Et,O),Et};Y.appendChild(W("forward","gh-dup")),Y.appendChild(W("back","gh-ddown")),Y.appendChild(W("turnLeft","gh-dleft")),Y.appendChild(W("turnRight","gh-dright")),ne.appendChild(Y);const nt=document.createElement("button");nt.className="gh-btn gh-act",nt.innerHTML=B(t1);const rt=O=>{O.preventDefault(),t("interact")};nt.addEventListener("pointerdown",rt),nt.addEventListener("contextmenu",O=>O.preventDefault()),ne.appendChild(nt);let ft=null;{ft=document.createElement("button"),ft.className="gh-btn gh-atk",ft.innerHTML=B(Qv);const O=j=>{j.preventDefault(),t("attack")};ft.addEventListener("pointerdown",O),ft.addEventListener("contextmenu",j=>j.preventDefault()),ne.appendChild(ft)}const Ft=document.createElement("div");Ft.id="gh-actbar",ne.appendChild(Ft);const Kt=46,ie=47,be=51,Ie=116,Sn=176,dn=(O,j,Et=Ie,st=Sn)=>{const w=[];for(let U=0;U<O;U++){const H=(O===1?(Et+st)/2:Et+(st-Et)*U/(O-1))*Math.PI/180,D=ie+j*-Math.cos(H),J=be+j*Math.sin(H);w.push({right:Math.round(D-Kt/2),bottom:Math.round(J-Kt/2)})}return w},Xe=O=>{const j=Math.ceil(O/2);return[...dn(j,98),...dn(O-j,150)]},qe=6,rn=O=>{const j=qe,Et=Xe(j);let st="";for(let w=0;w<j;w++){const U=Et[w]??{right:47,bottom:51},F=O[w];F?st+=`<button class="gh-sslot" data-skill="${F.id}" title="${F.name}" style="right:${U.right}px;bottom:${U.bottom}px">`+(F.icon?`<img src="${F.icon}" alt=""/>`:'<span class="gh-ss-x">✦</span>')+'<span class="gh-ss-cool"></span><span class="gh-ss-cd"></span></button>':st+=`<span class="gh-sslot gh-ss-empty" style="right:${U.right}px;bottom:${U.bottom}px"><span class="gh-ss-rune">◈</span></span>`}Ft.innerHTML=st,Ft.style.display="block",Ft.querySelectorAll(".gh-sslot[data-skill]").forEach(w=>{w.addEventListener("pointerdown",U=>{U.preventDefault();const F=w.dataset.skill;F&&o?.(F)}),w.addEventListener("contextmenu",U=>U.preventDefault())})};rn([]);const Tn=document.createElement("div");Tn.id="gh-prompt",Tn.style.display="none",ne.appendChild(Tn);const $e=document.createElement("div");$e.id="gh-dialogue",$e.style.display="none",$e.innerHTML='<img class="gh-dlg-portrait" alt="" /><div class="gh-dlg-body"><div class="gh-dlg-name"></div><div class="gh-dlg-text"></div><div class="gh-dlg-hint">toque para continuar ▸</div></div>',$e.addEventListener("pointerdown",O=>{O.preventDefault(),t("interact")}),ne.appendChild($e);const tr=$e.querySelector(".gh-dlg-name"),Ai=$e.querySelector(".gh-dlg-text"),ci=$e.querySelector(".gh-dlg-portrait");return r1(),{setPrompt(O){O?(Tn.textContent=O,Tn.style.display="block",nt.classList.add("gh-act-on")):(Tn.style.display="none",nt.classList.remove("gh-act-on"))},showDialogue(O,j,Et){tr.textContent=O,Ai.textContent=j,Et?(ci.src=Et,ci.style.display="block"):(ci.removeAttribute("src"),ci.style.display="none"),$e.style.display="flex",Tn.style.display="none"},hideDialogue(){$e.style.display="none"},setHealth(O){const j=Math.max(0,Math.min(1,O));R.style.width=j*100+"%",R.style.background=j>.5?"linear-gradient(#e35d4c,#b3241a)":j>.25?"linear-gradient(#e08a2c,#9a4a10)":"linear-gradient(#c23a24,#7a1610)"},setMana(O){const j=Math.max(0,Math.min(1,O));b.style.width=j*100+"%"},setStats(O){kt&&(kt.textContent=`${O.gold}`);const j=O.xpMax>0?Math.max(0,Math.min(1,O.xp/O.xpMax)):0,Et=(w,U,F,H)=>{const D=F<=H||O.points<0?" disabled":"",J=O.points<=0?" disabled":"";return`<div class="gh-prow"><span>${w}</span><span class="gh-pstep"><button class="gh-pm" data-attr="${U}" data-d="-1"${D}>−</button><b>${F}</b><button class="gh-pm" data-attr="${U}" data-d="1"${J}>＋</button></span></div>`},st=(w,U)=>`<div class="gh-sec-row"><span>${w}</span><b>${U}</b></div>`;jt.innerHTML=`<div class="gh-eq-lvl">Nível ${O.level}<div class="gh-xp"><div class="gh-xp-fill" style="width:${j*100}%"></div></div></div><div class="gh-alloc-pts${O.points>0?" gh-pts-on":""}">Pontos a distribuir: <b>${O.points}</b></div><div class="gh-prim-box">`+Et("Força","str",O.str,O.strMin)+Et("Destreza","dex",O.dex,O.dexMin)+Et("Inteligência","int",O.int,O.intMin)+'</div><div class="gh-sec-blocks"><div class="gh-sec-col"><h4>⚔️ Ofensivo</h4>'+st("Atq. Físico",O.atk)+st("Atq. Mágico",O.atkMag)+st("Crítico",O.crit+"%")+st("Dano Crít.",O.critDmg+"%")+st("Precisão",O.precision+"%")+'</div><div class="gh-sec-col"><h4>🛡️ Defensivo</h4>'+st("Vida",`${O.hp}/${O.hpMax}`)+st("Defesa",O.def)+st("Res. Mágica",O.magRes)+st("Evasão",O.evasion+"%")+'</div><div class="gh-sec-col"><h4>🔷 Recursos</h4>'+st("Mana",`${O.mp}/${O.mpMax}`)+st("Ouro",O.gold)+"</div></div>"},flashDamage(){at.style.animation="none",at.offsetWidth,at.style.animation="gh-dmg 360ms ease-out"},swingWeapon(){if(!_||!u||u.slot!=="main"||x)return-1;x=!0,E.forEach(ot=>window.clearTimeout(ot)),E.length=0,S||(S=s.querySelector("canvas"));const O=g,j=Iv[u.style],Et=j.windup+j.strike+j.recover,st=u.cooldown??j.cooldown,w=Math.round(j.windup+j.strike*.45),U=j.windup/Et,F=w/Et,H=(j.windup+j.strike)/Et,D=j.weight,J=ot=>`perspective(760px) rotateY(${ot.ry}deg) rotateX(${ot.rx}deg) rotateZ(${ot.rz}deg) translate(${ot.tx}%,${ot.ty}%) scale(${ot.s})`,ct="drop-shadow(-6px 2px 8px rgba(0,0,0,0.45))",dt=ot=>`${ct} blur(${ot}px)`;if(O.getAnimations?.().forEach(ot=>ot.cancel()),O.animate([{transform:J(Eh),filter:dt(0),offset:0},{transform:J(j.wind),filter:dt(0),offset:U},{transform:J(j.hit),filter:dt(Math.min(3,1.6*D)),offset:F},{transform:J(j.follow),filter:dt(.3),offset:H},{transform:J(Eh),filter:dt(0),offset:1}],{duration:Et,easing:"ease-out",fill:"both"}),j.imgSpin&&_){_.getAnimations?.().forEach(se=>se.cancel());const ot=j.imgSpin,vt=se=>`perspective(620px) rotateY(${se}deg)`;_.animate([{transform:vt(0),offset:0},{transform:vt(ot.wind),offset:U},{transform:vt(ot.hit),offset:F},{transform:vt(ot.follow),offset:H},{transform:vt(0),offset:1}],{duration:Et,easing:"ease-out",fill:"both"})}const Tt=j.fx==="arcBig"||j.fx==="smashwave",Dt=j.fx==="smashwave";return E.push(window.setTimeout(()=>{if(m)if(m.getAnimations?.().forEach(ot=>ot.cancel()),j.fx==="streak")m.animate([{opacity:0,transform:"rotate(-4deg) scaleX(0.35) scaleY(0.5)"},{opacity:.9,transform:"rotate(-4deg) scaleX(1.15) scaleY(0.62)",offset:.3},{opacity:0,transform:"rotate(-4deg) scaleX(1.35) scaleY(0.66)"}],{duration:190,easing:"ease-out"});else if(Dt)m.animate([{opacity:0,transform:"rotate(-8deg) scale(0.9)"},{opacity:.5,transform:"rotate(-8deg) scale(1.5) translateY(6%)",offset:.28},{opacity:0,transform:"rotate(-8deg) scale(1.75) translateY(10%)"}],{duration:230,easing:"ease-out"});else{const ot=j.fx==="arcBig"?1.34:1;m.animate([{opacity:0,transform:`rotate(-8deg) scale(${.7*ot})`},{opacity:.98,transform:`rotate(-8deg) scale(${1*ot})`,offset:.26},{opacity:0,transform:`rotate(-8deg) scale(${1.14*ot})`}],{duration:220,easing:"ease-out"})}if(y&&Tt){y.getAnimations?.().forEach(vt=>vt.cancel());const ot=Dt?1.55:1.05;y.animate([{opacity:0,transform:"translate(-50%,-50%) scale(0.2)"},{opacity:Dt?.95:.8,transform:`translate(-50%,-50%) scale(${.72*ot})`,offset:.22},{opacity:0,transform:`translate(-50%,-50%) scale(${1.4*ot})`}],{duration:Math.round(240+D*80),easing:"ease-out"})}if(p){p.getAnimations?.().forEach(vt=>vt.cancel());const ot=Math.max(.85,.7+.42*(D-1)+.42);p.animate([{opacity:0,transform:"scale(0.4)"},{opacity:Math.min(1,.66+.16*D),transform:`scale(${ot})`,offset:.26},{opacity:0,transform:`scale(${1.5*(.9+.18*D)})`}],{duration:Math.round(190+D*60),easing:"ease-out"})}if(v&&Dt&&(v.getAnimations?.().forEach(ot=>ot.cancel()),v.animate([{opacity:0},{opacity:.55,offset:.18},{opacity:0}],{duration:220,easing:"ease-out"})),S){S.getAnimations?.().forEach(vt=>vt.cancel());const ot=D;Dt?S.animate([{transform:"translate(0,0) scale(1)"},{transform:`translate(${-1.1*ot}%,${1.3*ot}%) scale(${1+.024*ot}) rotate(${-.6*ot}deg)`,offset:.14},{transform:`translate(${.7*ot}%,${-.6*ot}%) scale(${1+.012*ot}) rotate(${.4*ot}deg)`,offset:.34},{transform:`translate(${-.5*ot}%,${.5*ot}%) scale(${1+.006*ot}) rotate(${-.2*ot}deg)`,offset:.56},{transform:"translate(0,0) scale(1)"}],{duration:Math.round(280+D*55),easing:"ease-out"}):S.animate([{transform:"translate(0,0) scale(1)"},{transform:`translate(${-.8*ot}%,${1*ot}%) scale(${1+.018*ot}) rotate(${-.45*ot}deg)`,offset:.18},{transform:`translate(${.45*ot}%,${-.35*ot}%) scale(${1+.005*ot}) rotate(${.18*ot}deg)`,offset:.46},{transform:"translate(0,0) scale(1)"}],{duration:Math.round(200+D*45),easing:"ease-out"})}},w)),E.push(window.setTimeout(()=>x=!1,st)),w},setInventory(O){ce.forEach((j,Et)=>{const st=O[Et];j.onclick=null,st&&d[st]?(j.dataset.wid=st,j.innerHTML=`<img class="gh-item-ico" src="${d[st].url}" alt="" title="${d[st].name}"/>`,j.onclick=()=>this.equipWeapon(st)):(delete j.dataset.wid,j.innerHTML="")})},equipWeapon(O){const j=d[O];if(!j)return;const Et=w=>{const U=Ht.querySelector(`.gh-slot[data-slot="${w}"]`);U&&(U.innerHTML=`<img class="gh-item-ico" src="${j.url}" alt="" title="${j.name}"/>`)};j.slot==="off"?Et("off"):(u=j,x=!1,E.forEach(w=>window.clearTimeout(w)),E.length=0,g?.getAnimations?.().forEach(w=>w.cancel()),_?.getAnimations?.().forEach(w=>w.cancel()),_.style.transform="",_.src=j.url,g&&(g.style.height=`${(62*j.scale).toFixed(1)}vh`,g.style.maxHeight=`${Math.round(640*j.scale)}px`),s.classList.toggle("gh-wpn-arcane",j.tint==="arcane"),Et("main"),r?.(j)),ce.forEach(w=>w.classList.remove("gh-slot-pulse"));const st=Ht.querySelector(`.gh-bag-slot[data-wid="${O}"]`);st&&(st.classList.remove("gh-slot-pulse"),st.offsetWidth,st.classList.add("gh-slot-pulse"))},openSmith(O){te(O),z.classList.remove("gh-eq-hidden")},closeSmith(){z.classList.add("gh-eq-hidden")},updateMinimap(O){$=O,Lt(O),pt()&&Vt(O)},setSkillInfo(O,j){L=O,T=j,Ct()},setActionBar(O){rn(O)},setSkillCooldown(O,j,Et){const st=Ft.querySelector(`.gh-sslot[data-skill="${O}"]`);if(!st)return;const w=st.querySelector(".gh-ss-cool"),U=st.querySelector(".gh-ss-cd");if(j<=0){w&&(w.style.opacity="0",w.style.setProperty("--gh-cd","0deg")),U&&(U.textContent="");return}w&&(w.style.opacity="1",w.style.setProperty("--gh-cd",(Math.max(0,Math.min(1,j))*360).toFixed(1)+"deg")),U&&(U.textContent=String(Et))},skillManaFloat(O,j){const Et=Ft.querySelector(`.gh-sslot[data-skill="${O}"]`);if(!Et)return;const st=Et.getBoundingClientRect();this.floatText(st.left+st.width/2,st.top-2,`-${j}`,"mana")},floatText(O,j,Et,st){const w=document.createElement("div");w.className="gh-float-n gh-fl-"+st,w.textContent=Et;const U=Math.abs(O*7+j*13)%24-12|0;w.style.left=O+U+"px",w.style.top=j+"px",Xt.appendChild(w),window.setTimeout(()=>w.remove(),1e3)},toast(O){bt.textContent=O,bt.style.animation="none",bt.offsetWidth,bt.style.animation="gh-toast 1.8s ease-out"},castBar(O,j){Wt&&window.clearTimeout(Wt),Bt.textContent=O,Pt.classList.add("gh-cast-on"),Mt.style.transition="none",Mt.style.width="0%",Mt.offsetWidth,Mt.style.transition=`width ${j}ms linear`,Mt.style.width="100%",Wt=window.setTimeout(()=>{Pt.classList.remove("gh-cast-on"),Wt=0},j)},cancelCast(){Wt&&window.clearTimeout(Wt),Wt=0,Pt.classList.remove("gh-cast-on")},setClock(O,j){const Et=(O-.25)*Math.PI*2,st=33,w=(F,H)=>{const D=Math.sin(H),J=-Math.cos(H);F.style.left=50+D*st+"%",F.style.top=50+J*st+"%"};w(At,Et),w(mt,Et+Math.PI);const U=Math.max(0,Math.min(1,j));At.style.opacity=(.28+.72*U).toFixed(3),mt.style.opacity=(.28+.72*(1-U)).toFixed(3),At.style.filter=`drop-shadow(0 0 ${(3+7*U).toFixed(1)}px rgba(240,180,70,${(.5*U+.15).toFixed(2)}))`,mt.style.filter=`drop-shadow(0 0 ${(3+7*(1-U)).toFixed(1)}px rgba(150,190,255,${(.5*(1-U)+.15).toFixed(2)}))`}}}function r1(){if(document.getElementById("gh-style"))return;const s=document.createElement("style");s.id="gh-style",s.textContent=`
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
    background:url(${Kv}) no-repeat center / 100% 100%;
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
    border-image:url(${xa}) 130 repeat;
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
    border-image:url(${xa}) 130 repeat;
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
    background:url(${ga}) no-repeat center / 100% 100%;
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
    border-image:url(${Rh}) 90 fill;
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
  /* ---- FERREIRO (janela de aprimoramento) ---- */
  #gh-sm { position:fixed; inset:0; z-index:21; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,.6); pointer-events:auto; }
  #gh-sm.gh-eq-hidden { display:none; }
  #gh-sm-win {
    position:relative; box-sizing:border-box; width:min(58vh,440px); height:min(94vh,820px);
    border:clamp(22px,3.4vh,34px) solid transparent; border-image:url(${Rh}) 90 fill;
    filter:drop-shadow(0 6px 20px rgba(0,0,0,.6));
  }
  @media (max-width:640px){ #gh-sm-win { width:100vw; height:100dvh; border-width:clamp(15px,2.6vh,24px); } }
  #gh-sm-close { position:absolute; right:6px; top:6px; z-index:2; width:34px; height:34px; border-radius:8px; cursor:pointer; font-size:16px; background:rgba(20,16,11,.66); color:#e8d9b0; border:2px solid rgba(201,162,39,.55); }
  #gh-sm-body { width:100%; height:100%; display:flex; flex-direction:column; gap:2%; color:#e8dcc0; overflow-y:auto; overflow-x:hidden; overscroll-behavior:contain; -webkit-overflow-scrolling:touch; touch-action:pan-y; }
  .gh-sm-title { flex:0 0 auto; position:relative; padding:0 8px; }
  .gh-sm-sec { flex:0 0 auto; padding:2.5% 3.5% 3.5%; }
  .gh-sm-forge { display:flex; align-items:flex-start; justify-content:center; gap:2%; }
  .gh-sm-col { display:flex; flex-direction:column; align-items:center; gap:4px; width:44%; }
  .gh-sm-lbl { font-size:clamp(10px,1.5vh,12px); letter-spacing:1px; color:#b39a63; font-family:"Cinzel",serif; }
  /* slot da forja num WRAPPER que NÃO corta → o selo +N fica fora, inteiro */
  .gh-sm-slotwrap { position:relative; width:clamp(62px,11vh,90px); height:clamp(62px,11vh,90px); overflow:visible; }
  .gh-sm-slot { width:100%; height:100%; }
  .gh-sm-tier { position:absolute; top:-9px; right:-11px; z-index:3; font-family:"Cinzel",serif; font-size:clamp(11px,1.7vh,14px); font-weight:700; color:#12100a; background:linear-gradient(#e9cf72,#b7862a); border-radius:7px; padding:1px 7px; border:1px solid #6b4f18; box-shadow:0 1px 4px #000; }
  .gh-sm-tier-up { background:linear-gradient(#8fe07a,#3f9a2e); border-color:#215016; box-shadow:0 0 8px rgba(120,240,110,.6); }
  .gh-sm-res { box-shadow:0 0 16px 3px rgba(244,216,115,.5); border-radius:8px; }
  .gh-sm-res .gh-item-ico { filter:drop-shadow(0 0 8px rgba(255,224,130,.9)); }
  .gh-sm-nm { font-size:clamp(12px,1.7vh,14px); color:#efe2c0; text-align:center; line-height:1.15; min-height:2.4em; margin-top:8px; }
  .gh-sm-nm.gh-up { color:#f6ead0; }
  .gh-sm-dmg { font-size:clamp(11px,1.6vh,13px); color:#c7b789; }
  .gh-sm-dmg .gh-g { color:#8fdf7a; font-weight:700; }
  .gh-sm-arrow { font-size:clamp(22px,3.4vh,30px); color:#f4d873; text-shadow:0 0 10px rgba(244,216,115,.8); margin-top:1.7em; }
  .gh-sm-mats-h { text-align:center; font-size:clamp(11px,1.5vh,12px); color:#b39a63; letter-spacing:1px; margin:4% 0 2.5%; font-family:"Cinzel",serif; border-top:1px solid rgba(201,162,39,.28); padding-top:3.5%; }
  .gh-sm-mats { display:flex; justify-content:center; gap:3%; }
  .gh-sm-mat { width:23%; display:flex; flex-direction:column; align-items:center; gap:3px; }
  .gh-sm-mslot { width:clamp(44px,7.5vh,56px); height:clamp(44px,7.5vh,56px); display:flex; align-items:center; justify-content:center; border:8px solid transparent; border-image:url(${Ch}) 89 fill; font-size:clamp(20px,3.4vh,26px); }
  .gh-sm-mslot img { width:62%; height:62%; }
  /* números FORA do slot: "precisa/tem" (verde ou vermelho) */
  .gh-sm-mnum { font-size:clamp(13px,1.9vh,16px); font-weight:700; font-family:"Cinzel",serif; line-height:1; margin-top:1px; }
  .gh-sm-mhave { font-size:clamp(9px,1.35vh,11px); font-weight:400; color:#a89468; }
  .gh-ok { color:#8fdf7a; } .gh-no { color:#e17b6b; }
  .gh-sm-cap { font-size:clamp(9px,1.25vh,11px); color:#a89468; text-align:center; line-height:1.05; }
  /* BOTÃO = espada sendo forjada (lava). Brilha quando dá; apaga quando falta. */
  .gh-sm-forgewrap { display:flex; flex-direction:column; align-items:center; gap:2px; margin:4% auto 1%; }
  .gh-sm-forgebtn { width:clamp(78px,13vh,104px); height:clamp(78px,13vh,104px); cursor:pointer; background:url(${ao}) no-repeat center / contain; }
  .gh-sm-forgebtn.gh-sm-hot { animation:gh-forge-glow 1.5s ease-in-out infinite; }
  @keyframes gh-forge-glow { 0%,100%{ filter:drop-shadow(0 0 6px rgba(255,120,30,.5)); } 50%{ filter:drop-shadow(0 0 20px rgba(255,170,60,.95)); } }
  .gh-sm-forgebtn.gh-sm-cold { filter:grayscale(.85) brightness(.5); cursor:default; }
  .gh-sm-forgelbl { font-family:"Cinzel",serif; font-weight:700; font-size:clamp(13px,2vh,16px); letter-spacing:2px; color:#f4d873; text-shadow:0 1px 3px #000,0 0 6px rgba(0,0,0,.8); }
  .gh-sm-forgelbl.gh-sm-lblno { color:#9a8f6a; font-size:clamp(11px,1.7vh,13px); letter-spacing:1px; }
  .gh-sm-max, .gh-sm-empty { text-align:center; color:#c7b789; padding:6% 4%; font-size:clamp(12px,1.7vh,14px); }
  /* INVENTÁRIO em escala reduzida (20 slots, 5 col) — item +N num selo interno */
  .gh-sm-bag { grid-template-columns:repeat(5,1fr); }
  .gh-sm-cell { cursor:pointer; }
  .gh-sm-badge { position:absolute; right:2px; bottom:1px; font-family:"Cinzel",serif; font-size:clamp(9px,1.35vh,12px); font-weight:700; color:#12100a; background:linear-gradient(#e9cf72,#b7862a); border-radius:5px; padding:0 4px; line-height:1.25; box-shadow:0 1px 2px #000; }
  .gh-sm-sel { background:rgba(40,32,16,.95); box-shadow:inset 0 0 0 2px #f4d873, 0 0 12px 2px rgba(244,216,115,.7); }
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
    border-image:url(${Ku}) 88 fill;
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
    border-image:url(${Ch}) 89 fill;
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
    border-image:url(${xa}) 130 repeat;
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
    background:url(${ga}) no-repeat center / 100% 100%;
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
    background:url(${Jv}) no-repeat center / 100% 100%;
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
    background:url(${ga}) no-repeat center / 100% 100%;
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
  `,document.head.appendChild(s)}const xo=["#######","#..N..#","#.....#","#.....#","#.....#","#..P..#","###X###"],lo=xo.length,xl=xo[0].length,va={tavern:{name:"TAVERNA",npc:"Bruno, o Taverneiro",seed:11,lines:["Bem-vindo à Taverna do Javali! Eu sou o Bruno.","Sente-se e descanse — logo você poderá pagar por um quarto e recuperar as forças."]},store:{name:"MERCADOR",npc:"Rosa, a Mercadora",seed:2,lines:["Tenho de tudo um pouco, aventureiro. Sou a Rosa.","Em breve abriremos o comércio: poções, cordas, tochas e mais."]},smith:{name:"FERREIRO",npc:"Brandt, o Ferreiro",seed:23,lines:["O fogo está quente e a bigorna, pronta. Brandt, ao seu dispor.","Traga minério e ouro que eu aprimoro suas armas e armaduras."]},alchemist:{name:"ALQUIMISTA",npc:"Isolde, a Alquimista",seed:31,lines:["Cuidado com o que respira aqui dentro... sou Isolde.","Elixires e poções logo estarão à venda na minha bancada."]}};function Or(s){for(let t=0;t<lo;t++){const e=xo[t].indexOf(s);if(e>=0)return{col:e,row:t}}return{col:1,row:1}}function Kr(s,t){return t<0||t>=lo||s<0||s>=xl?"#":xo[t][s]}function ba(s,t){return".PX".includes(Kr(s,t))}const o1=""+new URL("taverneiro-Ba4UKFJq.png",import.meta.url).href,a1=""+new URL("mercadora-B8RulStP.png",import.meta.url).href,l1=""+new URL("ferreiro-BdN9Klhc.png",import.meta.url).href,c1=""+new URL("alquimista-ssXsgGLn.png",import.meta.url).href,Ju=""+new URL("pip-rEDWa-7w.png",import.meta.url).href,Qu=""+new URL("wilma-DI_QNtI6.png",import.meta.url).href,h1=""+new URL("fazendeiro-CLjUAd1g.png",import.meta.url).href,d1=""+new URL("camponesa-CrL0OA2Y.png",import.meta.url).href,u1=""+new URL("lenhador-B54mx8Mi.png",import.meta.url).href,tf=""+new URL("hedda-Buaz2cmx.png",import.meta.url).href,f1=""+new URL("costureira-Br8zMBee.png",import.meta.url).href,p1=""+new URL("gunther-D_2fJfLI.png",import.meta.url).href,m1=""+new URL("anselmo-a5GEbqfY.png",import.meta.url).href,g1=""+new URL("tam-BlgWIVim.png",import.meta.url).href,_1=""+new URL("lyle-gu11Pcfp.png",import.meta.url).href,x1=""+new URL("pine1-Cx-eXiFP.png",import.meta.url).href,v1=""+new URL("pine2-CUzpurmt.png",import.meta.url).href,b1=""+new URL("pine3-SLpwxU-f.png",import.meta.url).href,M1=""+new URL("pine4-D2rjz_P9.png",import.meta.url).href,w1=""+new URL("cluster1-CDwqmovY.png",import.meta.url).href,y1=""+new URL("cluster2-C0czRdHN.png",import.meta.url).href,S1=""+new URL("sign_tavern-DPGpN59J.png",import.meta.url).href,T1=""+new URL("sign_store-C8OmR8-U.png",import.meta.url).href,E1=""+new URL("sign_smith-B08qmnbc.png",import.meta.url).href,A1=""+new URL("sign_alch-CZuh7kJW.png",import.meta.url).href,R1=""+new URL("prop_lamp-D_-YfjKt.png",import.meta.url).href,C1=""+new URL("prop_notice-Bo5C5meg.png",import.meta.url).href,L1=""+new URL("enemy_skeleton-BcZFeUKH.png",import.meta.url).href,P1=""+new URL("death_poof-BE-q7e2_.png",import.meta.url).href,U1=""+new URL("dec_window-DrwRbTKE.png",import.meta.url).href,D1=""+new URL("dec_door-B5wowGxb.png",import.meta.url).href,Ma=""+new URL("dec_torch-CtkBMXz7.png",import.meta.url).href,I1=""+new URL("dec_ivy-D9e2Lu2_.png",import.meta.url).href,k1=""+new URL("dec_banner-UBOZSe9G.png",import.meta.url).href,Lh=""+new URL("dec_cracks-DKSsqxx2.png",import.meta.url).href,N1=""+new URL("dec_gate_frame-DQaCQl80.png",import.meta.url).href,F1=""+new URL("dec_gate_bars-B6YqUV4L.png",import.meta.url).href,O1=""+new URL("fx_fireball-CNUxOMXZ.png",import.meta.url).href,z1=""+new URL("fx_ice-DGJxZKsy.png",import.meta.url).href,B1=""+new URL("fx_ice_lance-DCxKutbL.png",import.meta.url).href,H1=""+new URL("fx_ray-BukWo5qE.png",import.meta.url).href,G1=""+new URL("fx_meteoro-DywgnSdp.png",import.meta.url).href,V1=""+new URL("fx_muralha-yiXxe2Yc.png",import.meta.url).href,W1=""+new URL("fx_imolacao-C-a5dtuo.png",import.meta.url).href,X1=""+new URL("fx_prisao-BDhoA-oK.png",import.meta.url).href,q1=""+new URL("fx_corrente-CI-yrk7e.png",import.meta.url).href,$1=""+new URL("fx_tempestade-DS9uv2Z_.png",import.meta.url).href,Y1=""+new URL("fx_descarga-IY9gTcyD.png",import.meta.url).href,j1=""+new URL("fx_l_apunhalar-BRQuzQIj.png",import.meta.url).href,Z1=""+new URL("fx_l_danca-w9P6lgu4.png",import.meta.url).href,K1=""+new URL("fx_l_sombras-fe3usKIe.png",import.meta.url).href,J1=""+new URL("fx_l_estocada-hJYwlzLR.png",import.meta.url).href,Q1=""+new URL("fx_l_mortal-DuYG-M3q.png",import.meta.url).href,tb=""+new URL("fx_l_dupla-C6r_wn6L.png",import.meta.url).href,eb=""+new URL("fx_l_danca-w9P6lgu4.png",import.meta.url).href,nb=""+new URL("fx_l_arremesso-rtDW0ow6.png",import.meta.url).href,ib=""+new URL("fx_l_nuvem-B2qmk_tl.png",import.meta.url).href,sb=""+new URL("fx_l_toxina-Bu3f7mn-.png",import.meta.url).href,rb=""+new URL("sword-Cnq9dXJw.png",import.meta.url).href,ob=""+new URL("class_guerreiro-DQxwW6XE.png",import.meta.url).href,ab=""+new URL("class_ladino-CBY8tWR5.png",import.meta.url).href,lb=""+new URL("class_mago-BCWgBU8E.png",import.meta.url).href,cb=""+new URL("class_clerigo-Bv6kp9nE.png",import.meta.url).href,Fs=[{id:"guerreiro",name:"Guerreiro",emoji:"⚔️",tag:"Tanque / corpo-a-corpo",desc:"Mestre das lâminas. Encara o perigo de frente, com espada e escudo ou uma arma de duas mãos. Muita vida e dano físico.",attr:{str:8,dex:4,int:3},hp:120,mp:40,weapons:["sword","greatsword","axe","shield"],startWeapon:"sword",portrait:ob},{id:"ladino",name:"Ladino",emoji:"🗡️",tag:"Dano rápido / crítico",desc:"Ágil e furtivo. Golpeia rápido com adaga e rapieira, buscando os pontos fracos. Frágil, mas letal e veloz.",attr:{str:4,dex:8,int:3},hp:90,mp:50,weapons:["dagger","rapier"],startWeapon:"dagger",portrait:ab},{id:"mago",name:"Mago",emoji:"🔮",tag:"Dano à distância / elemental",desc:"Canaliza fogo, gelo e raio pelo cajado e pelo orbe. Devastador à distância, mas de corpo frágil. Muita mana.",attr:{str:3,dex:4,int:8},hp:75,mp:110,weapons:["staff","orb"],startWeapon:"staff",portrait:lb},{id:"clerigo",name:"Clérigo",emoji:"🕯️",tag:"Suporte / cura",desc:"Fé feita arma. Cura os aliados e esmaga o mal com maça, martelo e escudo. Equilibrado, resistente e devoto.",attr:{str:5,dex:3,int:7},hp:95,mp:90,weapons:["mace","maul","shield","staff"],startWeapon:"mace",portrait:cb}],vl=Object.fromEntries(Fs.map(s=>[s.id,s])),Ph=5,hb=3;function Jr(s,t,e){return{atkPhys:Math.round(2+s.str*1.2+s.dex*.6),atkMag:Math.round(1+s.int*1.4),crit:Math.round(3+s.dex*.8),critDmg:150+Math.round(s.dex*1),precision:Math.min(99,Math.round(85+s.dex*.6)),hp:t+s.str*2,def:Math.round(1+s.str*.5),magRes:Math.round(s.int*.5),evasion:Math.round(2+s.dex*.7),mp:e+s.int*3}}const Uh=[x1,v1,M1],db=[b1],ub=.625,zr=[{url:w1,aspect:1.96},{url:y1,aspect:1.72}],fb={tavern:o1,store:a1,smith:l1,alchemist:c1},pb={tavern:S1,store:T1,smith:E1,alchemist:A1},mb=2.6,An=[[0,-1],[1,0],[0,1],[-1,0]],Yi={c:7,r:10},Br=10,Dh={url:O1,frames:17},gb={url:z1,frames:6},_b={url:B1,frames:12},Ih={url:H1,frames:16},xb={url:G1,frames:15},vb={url:V1,frames:16},bb={url:W1,frames:15},Mb={url:X1,frames:17},wb={url:q1,frames:19},yb={url:$1,frames:20},Sb={url:Y1,frames:11},Tb={url:j1,frames:5},Eb={url:Z1,frames:20},Ab={url:K1,frames:7},Rb={url:J1,frames:11},Cb={url:Q1,frames:6},Lb={url:tb,frames:8},Pb={url:eb,frames:20},Ub={url:nb,frames:14},Db={url:ib,frames:7},Ib={url:sb,frames:19},Us={m_bola_fogo:Dh,m_explosao_fogo:Dh,m_meteoro:xb,m_muralha_fogo:vb,m_imolacao:bb,m_nova_gelo:gb,m_lanca_gelo:_b,m_prisao_gelo:Mb,m_raio_arcano:Ih,m_corrente:wb,m_tempestade:yb,m_descarga:Sb,m_nova_arcana:Ih,l_apunhalar:Tb,l_rajada_laminas:Eb,l_golpe_sombras:Ab,l_estocada:Rb,l_execucao_a:Cb,l_rajada_dupla:Lb,l_danca_laminas:Pb,l_arremesso:Ub,l_nuvem_toxica:Db,l_toxina:Ib},kb=1200,kh=s=>{const t=Us[s];return t?Math.min(2100,Math.max(900,Math.round(t.frames*115))):kb},Nb=new Set(["m_meteoro","m_tempestade","m_prisao_gelo"]),Fb=new Set(["m_muralha_fogo","m_descarga"]),Nh=s=>100,Ob=620,Hr=3.2,Fh=[{c:5,r:5,dc:0,dr:1,kind:"tavern"},{c:9,r:5,dc:0,dr:1,kind:"store"},{c:1,r:9,dc:1,dr:0,kind:"smith"},{c:13,r:9,dc:-1,dr:0,kind:"alchemist"}],Oh=[{c:7,r:5,dc:0,dr:1,id:"irmaos"},{c:1,r:7,dc:1,dr:0,id:"hedda"},{c:13,r:11,dc:-1,dr:0,id:"elspethhome"}],zb=[{id:"elspeth",c:8,r:6,night:[12,11],seed:1,name:"Elspeth, a Camponesa",lines:["Bom dia! Colhi legumes fresquinhos hoje cedo.","O poço da praça nunca seca, pode beber à vontade."]},{id:"corvin",c:10,r:6,night:[5,6],seed:2,name:"Corvin, o Lenhador",lines:["Cortar lenha é honesto, mas o bosque anda estranho ultimamente.","Dizem que há algo à espreita naquela montanha ao norte..."]},{id:"wren",c:12,r:10,night:[2,7],seed:3,name:"Wren, a Costureira",lines:["Precisa remendar essa capa? Faço um preço justo.","Roupa boa aquece o corpo — e o frio lá embaixo é de rachar."]},{id:"alard",c:2,r:11,night:[5,6],seed:5,name:"Alard, o Velho Fazendeiro",lines:["Cuidado, jovem. A escada sob a montanha leva às profundezas.","Equipe-se bem antes de descer. Já vi muitos partirem e nenhum voltar."]},{id:"gunther",c:8,r:13,night:[11,7],seed:9,name:"Gunther, o Vigia",lines:["Mantenha a paz por aqui, forasteiro.","Enquanto eu montar guarda, o vilarejo dorme tranquilo."]},{id:"anselmo",c:3,r:6,night:[2,6],seed:7,name:"Frei Anselmo",lines:["Que a luz o acompanhe nas trevas, viajante.","Reze antes de descer àquela masmorra. Vai precisar."]},{id:"tam",c:9,r:12,night:[7,6],seed:10,name:"Velho Tam",lines:["Uma moedinha para um pobre velho?","Já fui aventureiro como você... até a montanha levar tudo de mim."]},{id:"lyle",c:2,r:8,night:[5,6],seed:12,name:"Lyle, o Bardo",lines:["Ei! Quer ouvir a balada do herói que desceu à masmorra?","Faça feitos grandiosos e eu comporei uma canção sobre você!"]}],Bb={pip:Ju,wilma:Qu,alard:h1,elspeth:d1,corvin:u1,hedda:tf,wren:f1,gunther:p1,anselmo:m1,tam:g1,lyle:_1},Hb={},wa={irmaos:{name:"Casa dos Irmãos",residents:[{col:2,row:2,seed:4,scale:.7,name:"Pip",art:Ju,lines:["Essa é a nossa casa! Eu e a Wilma somos irmãos.","Um dia vou ser aventureiro igual você — a Wilma que fica de babá!"]},{col:4,row:2,seed:6,scale:.66,name:"Wilma",art:Qu,lines:["O Pip vive fugindo pra praça. Alguém tem que cuidar dele!","À noite dá pra ouvir barulhos vindo da montanha... eu tranco a porta."]}]},hedda:{name:"Casa de Hedda",residents:[{col:3,row:2,seed:8,name:"Hedda, a Matriarca",art:tf,lines:["Entre, entre. Minha casa é modesta, mas aquecida.","Já vi muitos invernos passarem por Grimhollow. Sente-se, tome um chá."]}]},elspethhome:{name:"Casa de Elspeth",residents:[]}},Gb=96;function ya(s,t=Gb){const e=[];for(const n of s){if(n.length<=t){e.push(n);continue}const i=n.split(/\s+/);let r="";for(const a of i)r&&r.length+1+a.length>t?(e.push(r+" …"),r=a):r=r?r+" "+a:a;r&&e.push(r)}return e}const yi=class yi{constructor(t,e,n){ht(this,"renderer");ht(this,"scene",new rx);ht(this,"camera");ht(this,"container");ht(this,"foliageFx");ht(this,"col");ht(this,"row");ht(this,"facing",0);ht(this,"anim",null);ht(this,"showIdx",0);ht(this,"showcaseReturn",null);ht(this,"world",new ke);ht(this,"blocked",new Set);ht(this,"gates",new Map);ht(this,"gateAnims",[]);ht(this,"now",0);ht(this,"motes",[]);ht(this,"moteTexCache");ht(this,"fogPuffs",[]);ht(this,"softPuffCache");ht(this,"cloudTexCache");ht(this,"fogDome");ht(this,"smokeTexes",[]);ht(this,"npcs",[]);ht(this,"flames",[]);ht(this,"lampFlames",[]);ht(this,"lampGlows",[]);ht(this,"glowTex");ht(this,"dayNightLights",[]);ht(this,"outdoor",!1);ht(this,"_sky",new zt);ht(this,"_cA",new zt);ht(this,"_cB",new zt);ht(this,"waterGlint");ht(this,"smoke",[]);ht(this,"billboardProps",[]);ht(this,"playerMaxHp",100);ht(this,"playerHp",100);ht(this,"playerMaxMp",100);ht(this,"playerMp",100);ht(this,"stats",{level:1,xp:0,xpMax:100,atk:8,def:2,str:5,dex:5,int:5,gold:0});ht(this,"reinforce",{});ht(this,"materials",{madeira:8,minerio:5,reforco:3});ht(this,"smithSel","sword");ht(this,"prim",{str:5,dex:5,int:5});ht(this,"baseAttr",{str:5,dex:5,int:5});ht(this,"clsHp",100);ht(this,"clsMp",100);ht(this,"sec",Jr({str:5,dex:5,int:5},100,100));ht(this,"unspent",0);ht(this,"passive",{});ht(this,"skillRanks",{});ht(this,"target",null);ht(this,"cooldownUntil",{});ht(this,"coolingSkills",new Set);ht(this,"buff",null);ht(this,"reticle",null);ht(this,"raycaster",new Xx);ht(this,"lastTickMs",0);ht(this,"buffActive",!1);ht(this,"currentWeapon",null);ht(this,"playerName","Herói");ht(this,"classId","guerreiro");ht(this,"enemy",null);ht(this,"poofs",[]);ht(this,"poofTex");ht(this,"projectiles",[]);ht(this,"fxTexCache",{});ht(this,"_smokeTex");ht(this,"ui");ht(this,"location","village");ht(this,"doorMap",new Map);ht(this,"homeDoorMap",new Map);ht(this,"npcMap",new Map);ht(this,"returnTo",{col:0,row:0,facing:0});ht(this,"dialogue",null);ht(this,"lastPrompt"," ");ht(this,"artCache",new Map);ht(this,"_shadowTex");ht(this,"animTex",[]);ht(this,"walkers",[]);ht(this,"npcNight",!1);ht(this,"startAt");ht(this,"miniGrid",null);this.container=t,this.startAt=n;const i=e?vl[e.classId]:null;i&&e&&(this.playerName=e.name,this.classId=i.id,this.prim={...e.attr??i.attr},this.baseAttr={...e.attr??i.attr},this.clsHp=i.hp,this.clsMp=i.mp,this.sec=Jr(this.prim,this.clsHp,this.clsMp),this.stats.str=this.prim.str,this.stats.dex=this.prim.dex,this.stats.int=this.prim.int,this.playerMaxHp=this.sec.hp,this.playerHp=this.sec.hp,this.playerMaxMp=this.sec.mp,this.playerMp=this.sec.mp),this.renderer=new sx({antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),t.appendChild(this.renderer.domElement);const r=document.createElement("div");r.style.cssText="position:absolute;inset:0;pointer-events:none;opacity:0;z-index:5;background:radial-gradient(ellipse at center,rgba(30,55,25,0) 42%,rgba(24,46,20,0.55) 78%,rgba(16,32,14,0.8) 100%);",getComputedStyle(t).position==="static"&&(t.style.position="relative"),t.appendChild(r),this.foliageFx=r,this.scene.background=new zt(Ts),this.camera=new nn(78,1,.05,400),this.camera.rotation.order="YXZ",this.scene.add(this.world),this.col=0,this.row=0,this.ui=s1(t,l=>this.onAction(l),rb,void 0,vi,l=>this.onEquip(l),l=>this.applyPassives(l),l=>this.useSkill(l),(l,c)=>this.allocAttr(l,c),l=>{this.smithSel=l,this.ui.openSmith(this.buildSmithData())},()=>this.smithUpgrade()),this.renderer.domElement.addEventListener("pointerdown",l=>this.onCanvasPointer(l)),this.ui.setInventory(vi.map(l=>l.id)),this.ui.equipWeapon(i?.startWeapon??"sword"),this.ui.setHealth(this.playerHp/this.playerMaxHp),this.ui.setMana(this.playerMp/this.playerMaxMp),this.ui.setSkillInfo(this.classId,Nh(this.stats.level)),this.refreshStats(),this.preloadFx();const a=ah();this.startAt==="showcase"?(this.returnTo={col:a.col,row:a.row,facing:0},this.enterLocation("showcase",0,0,0)):this.enterLocation("village",a.col,a.row,0),window.addEventListener("resize",()=>this.resize()),this.resize(),this.renderer.setAnimationLoop(l=>this.tick(l));const o=document.fonts;o?.ready&&o.ready.then(()=>{this.dialogue||this.enterLocation(this.location,this.col,this.row,this.facing)}),window.__game=this}enterLocation(t,e,n,i){this.clearWorld(),this.location=t,this.outdoor=t==="village"||t==="forest",this.dialogue=null,this.ui.hideDialogue(),t==="village"?(this.scene.fog=new wi(Ts,P*2.6,P*11),this.scene.background=new zt(Ts),this.addVillageLights(),this.buildVillage()):t==="forest"?(this.scene.fog=new wi(Ts,P*3.5,P*18),this.scene.background=new zt(Ts),this.addForestLights(),this.buildForest()):t==="dungeon"?(this.scene.fog=new wi(3817033,P*2.5,P*13),this.scene.background=new zt(3093052),this.addDungeonLights(),this.buildDungeon()):t==="showcase"?(this.scene.fog=new Ul(8160144,.062),this.scene.background=new zt(8160144),this.addShowcaseLights(),this.buildShowcase()):t in wa?(this.scene.fog=new wi(2365968,P*4,P*12),this.scene.background=new zt(1445640),this.addInteriorLights(),this.buildHome(t)):(this.scene.fog=new wi(1709069,P*4,P*12),this.scene.background=new zt(1183241),this.addInteriorLights(),this.buildInterior(t)),this.col=e,this.row=n,this.facing=i,this.location==="showcase"?(this.showIdx=0,this.applyShowcasePose()):(this.camera.position.set(e*P,this.floorYAt(e,n)+Lr,n*P),this.camera.rotation.y=-i*(Math.PI/2)),this.anim=null,this.lastPrompt=" ",this.ui.setPrompt(null),this.buildMiniGrid(),this.pushMinimap()}clearWorld(){this.world.traverse(t=>{const e=t;e.geometry&&e.geometry.dispose();const n=e.material;Array.isArray(n)?n.forEach(i=>i.dispose()):n&&n.dispose()}),this.world.clear(),this.blocked.clear(),this.gates.clear(),this.gateAnims=[],this.motes=[],this.fogPuffs=[],this.fogDome=void 0,this.npcs=[],this.flames=[],this.lampFlames=[],this.lampGlows=[],this.dayNightLights=[],this.animTex=[],this.walkers=[],this.smoke=[],this.billboardProps=[],this.enemy=null,this.reticle=null,this.clearTarget(),this.projectiles=[],this.poofs=[],this.waterGlint=void 0,this.doorMap.clear(),this.homeDoorMap.clear(),this.npcMap.clear()}addVillageLights(){const t=new Ss(9081506,.75),e=new ws(10135224,3812380,.7),n=new na(16771008,.55);n.position.set(-6,12,4),this.world.add(t),this.world.add(e),this.world.add(n),this.registerDayLight(t,3820138,.46),this.registerDayLight(e,2899038,.5),this.registerDayLight(n,5596832,.14)}registerDayLight(t,e,n){this.dayNightLights.push({light:t,dayI:t.intensity,dayColor:t.color.clone(),nightColor:new zt(e),nightMul:n})}daylight(t){const e=Math.sin((t-.25)*Math.PI*2);return Math.max(0,Math.min(1,e*1.15))}atmosColor(t,e){const n=yi.SKY_KEYS;let i=n[0],r=n[n.length-1];for(let o=0;o<n.length-1;o++)if(t>=n[o][0]&&t<=n[o+1][0]){i=n[o],r=n[o+1];break}const a=(t-i[0])/(r[0]-i[0]||1);e.copy(this._cA.set(i[1])).lerp(this._cB.set(r[1]),a)}updateDayNight(t){if(!this.outdoor)return;const e=(t/Ur+Dr)%1,n=this.daylight(e);this.atmosColor(e,this._sky),this.scene.fog&&this.scene.fog.color.copy(this._sky),this.scene.background.copy(this._sky);for(const r of this.dayNightLights){const a=r.nightMul+(1-r.nightMul)*n;r.light.intensity=r.dayI*a,r.light.color.copy(r.nightColor).lerp(r.dayColor,n)}const i=Math.max(0,Math.min(1,(.5-n)/.35));for(const r of this.lampFlames){const a=r.base+Math.sin(t*.011+r.base)*.8+Math.sin(t*.027)*.5;r.light.intensity=Math.max(0,a)*i}for(const r of this.lampGlows){const a=.88+Math.sin(t*.011)*.08+Math.sin(t*.027)*.04;r.material.opacity=i*a}}addInteriorLights(){this.world.add(new Ss(12888176,1.15)),this.world.add(new ws(10521184,3813408,.75))}buildVillage(){const t=new ut({map:bh(7)}),e=(m,p)=>new ut({map:m,color:new zt(p)}),n=[new ut({map:On(31)}),new ut({map:xv()})],i=[e(Rs(3),15323543),e(Rs(3),12820582),e(Rs(3),11179640)];i.forEach(m=>m.side=$t);const r=this.decalMat(D1,.4),a=this.decalMat(U1,.4),o=this.decalMat(Ma,.1),l=this.decalMat(k1,.4),c=this.decalMat(I1,.4),h=this.decalMat(Lh,.08),d=(m,p,y=0)=>Math.sin(m*12.9+p*78.2+y*3.1)*43758.5%1,u=new Ot(P,P);for(let m=0;m<Ke;m++)for(let p=0;p<ln;p++){if(oh(p,m))continue;const y=new Z(u,t);y.rotation.x=-Math.PI/2;const v=Math.floor(Math.abs(d(p,m,5))*4)%4;y.rotation.z=v*Math.PI/2,y.position.set(p*P,0,m*P),this.world.add(y)}const f=new fe(P,ei,P),g=new Set([...Fh.map(m=>`${m.c},${m.r},${m.dc},${m.dr}`),...Oh.map(m=>`${m.c},${m.r},${m.dc},${m.dr}`)]),_=new Set;for(let m=0;m<Ke;m++)for(let p=0;p<ln;p++){if(ye(p,m)!=="building")continue;const y=An.filter(([E,S])=>{const A=ye(p+E,m+S);return A==="street"||A==="barrel"});if(y.length===0)continue;const v=n[Math.floor(Math.abs(d(p,m))*997)%n.length],x=new Z(f,v);x.position.set(p*P,ei/2,m*P),this.world.add(x);for(const[E,S]of y){if(g.has(`${p},${m},${E},${S}`)){_.add(`${p},${m},${E},${S}`);continue}const A=Math.abs(d(p,m,E*7+S*3))%1,R=p*P+E*(P/2+.05),b=m*P+S*(P/2+.05);A<.4?this.addWallDecal(p,m,E,S,a,1.9,1.9,1.75):A<.5?(this.addWallDecal(p,m,E,S,o,.95,1.55,2.15),this.glowLight(R+E*.25,2.35,b+S*.25,16752704,3,9)):A<.71?this.addWallDecal(p,m,E,S,c,2.3,1.5,1.05):A<.87&&this.addWallDecal(p,m,E,S,h,1.8,1.6,1.6)}}this.buildRoofs(i),this.buildMountain(),this.buildTunnel(),this.buildDungeonEnemy(),this.buildWell(),this.buildEstablishments(r,l),this.buildHomes(r),this.buildVillageForestGate(),this.buildVillageProps(),this.buildChimneySmoke(),this.buildNPCs()}buildVillageProps(){this.addLampPost(4,7),this.addLampPost(10,7),this.addLampPost(4,11),this.addLampPost(10,11),this.addWallProp(2,10,C1,2.7,"W")}makeGlowTex(){if(this.glowTex)return this.glowTex;const t=document.createElement("canvas");t.width=t.height=64;const e=t.getContext("2d"),n=e.createRadialGradient(32,32,0,32,32,32);return n.addColorStop(0,"rgba(255,244,214,1)"),n.addColorStop(.28,"rgba(255,207,138,0.72)"),n.addColorStop(1,"rgba(255,190,120,0)"),e.fillStyle=n,e.fillRect(0,0,64,64),this.glowTex=new _n(t),this.glowTex}addLampPost(t,e,n=0,i=0){const r=t*P+n,a=e*P+i;this.addPropBillboard(t,e,R1,3.4,n,i);const o=2.95,l=new gn(16764810,4.2,17,2);l.position.set(r,o,a),this.world.add(l),this.lampFlames.push({light:l,base:4.2});const c=new Zo(new jr({map:this.makeGlowTex(),transparent:!0,opacity:0,depthWrite:!1,blending:to}));c.position.set(r,o,a),c.scale.set(2.6,2.6,1),this.world.add(c),this.lampGlows.push(c)}addPropBillboard(t,e,n,i,r=0,a=0){const o=new ut({transparent:!0,opacity:0,alphaTest:.4,side:$t}),l=new Z(new Ot(i,i),o);l.position.set(t*P+r,i/2,e*P+a),this.world.add(l),this.billboardProps.push(l),this.loadArt(n,c=>{const h=c.image,d=h&&h.width&&h.height?h.width/h.height:1;l.geometry.dispose(),l.geometry=new Ot(i*d,i),l.position.y=i/2,o.map=c,o.opacity=1,o.needsUpdate=!0})}addWallProp(t,e,n,i,r){const a=new ut({transparent:!0,opacity:0,alphaTest:.4,side:$t}),o=new Z(new Ot(i,i),a),l=P/2-.2;let c=0,h=0,d=0;r==="N"?(d=0,h=-l):r==="S"?(d=Math.PI,h=l):r==="W"?(d=Math.PI/2,c=-l):(d=-Math.PI/2,c=l),o.rotation.y=d,o.position.set(t*P+c,i/2,e*P+h),this.world.add(o),this.loadArt(n,u=>{const f=u.image,g=f&&f.width&&f.height?f.width/f.height:1;o.geometry.dispose(),o.geometry=new Ot(i*g,i),o.position.y=i/2,a.map=u,a.opacity=1,a.needsUpdate=!0})}buildDungeonEnemy(t=2,e=4){const n=Math.max(1,this.stats.level+(Math.floor(Math.random()*3)-1)),i=26+(n-1)*8,r=2.6,a=new ut({transparent:!0,opacity:0,alphaTest:.4,side:$t}),o=new Z(new Ot(r*.47,r),a);o.position.set(t*P,r/2,e*P),this.world.add(o),this.billboardProps.push(o),this.blocked.add(`${t},${e}`);const l=1.3,c=new ke,h=new Z(new Ot(l+.12,.26),new Re({color:1182986,transparent:!0,opacity:.85})),d=new Z(new Ot(l,.16),new Re({color:13777454}));d.position.z=.01,c.add(h),c.add(d),c.position.set(t*P,r+.45,e*P),this.world.add(c),this.billboardProps.push(c),this.enemy={mesh:o,mat:a,c:t,r:e,bx:t*P,bz:e*P,hp:i,maxHp:i,elevel:n,hitAt:0,dyingAt:0,atkAt:0,hitApplied:!1,nextAtk:0,bar:c,barFill:d};const u=new gn(6987984,.55,5,2);u.position.set(t*P,1.7,e*P),this.world.add(u),this.poofTex||this.loadArt(P1,f=>this.poofTex=this.fxFilter(f)),this.loadArt(L1,f=>{const g=f.image,_=g&&g.width&&g.height?g.width/g.height:.47;o.geometry.dispose(),o.geometry=new Ot(r*_,r),o.position.y=r/2,a.map=f,a.opacity=1,a.needsUpdate=!0})}onEquip(t){this.currentWeapon=t,this.recomputeDerived()}smithCost(t){return{madeira:2+t,minerio:2+t,reforco:1+Math.floor(t/3),gold:80*(t+1)}}smithDmg(t,e){return Math.round(this.atkWithBonus(this.sec.atkPhys+t.dmg+e)*this.buffAtkMul())}buildSmithData(){const t=vi.map(a=>({id:a.id,name:a.name,icon:a.url,lvl:this.reinforce[a.id]??0})),e=vi.find(a=>a.id===this.smithSel)??vi[0],n=this.reinforce[e.id]??0,i={id:e.id,name:e.name,icon:e.url,lvl:n,dmg:this.smithDmg(e,n)},r=n>=yi.SMITH_MAX?{...i,max:!0}:{...i,max:!1,next:{dmg:this.smithDmg(e,n+1),...this.smithCost(n)}};return{gold:this.stats.gold,mats:{...this.materials},items:t,sel:r}}smithUpgrade(){const t=vi.find(i=>i.id===this.smithSel);if(!t)return;const e=this.reinforce[t.id]??0;if(e>=yi.SMITH_MAX)return;const n=this.smithCost(e);if(this.materials.madeira<n.madeira||this.materials.minerio<n.minerio||this.materials.reforco<n.reforco||this.stats.gold<n.gold){this.ui.toast("Faltam materiais ou ouro.");return}this.materials.madeira-=n.madeira,this.materials.minerio-=n.minerio,this.materials.reforco-=n.reforco,this.stats.gold-=n.gold,this.reinforce[t.id]=e+1,this.currentWeapon?.id===t.id&&this.recomputeDerived(),this.ui.toast(`${t.name} reforçada para +${e+1}!`),this.ui.openSmith(this.buildSmithData())}atkWithBonus(t){const e=(this.passive.dmg??0)+(this.passive.mdmg??0);return Math.round(t*(1+e))}applyPassives(t){this.skillRanks={...t},this.refreshActionBar(),this.passive=Vv(t),this.recomputeDerived()}allocAttr(t,e){if(e>0){if(this.unspent<=0)return;this.prim[t]+=1,this.unspent-=1}else{if(this.prim[t]<=this.baseAttr[t])return;this.prim[t]-=1,this.unspent+=1}this.recomputeDerived()}recomputeDerived(){this.sec=Jr(this.prim,this.clsHp,this.clsMp);const t=this.playerMaxHp>0?this.playerHp/this.playerMaxHp:1,e=this.playerMaxMp>0?this.playerMp/this.playerMaxMp:1;this.playerMaxHp=Math.round(this.sec.hp*(1+(this.passive.life??0))),this.playerMaxMp=Math.round(this.sec.mp*(1+(this.passive.mana??0))),this.playerHp=Math.max(1,Math.round(this.playerMaxHp*t)),this.playerMp=Math.round(this.playerMaxMp*e),this.stats.str=this.prim.str,this.stats.dex=this.prim.dex,this.stats.int=this.prim.int,this.stats.def=this.sec.def+Math.round((this.passive.def??0)+(this.passive.mres??0));const n=this.currentWeapon?this.reinforce[this.currentWeapon.id]??0:0,i=(this.currentWeapon?.dmg??0)+n;this.stats.atk=Math.round(this.atkWithBonus(this.sec.atkPhys+i)*this.buffAtkMul()),this.ui.setHealth(this.playerHp/this.playerMaxHp),this.ui.setMana(this.playerMp/this.playerMaxMp),this.refreshStats()}rollDamage(t,e){const n=e?this.passive.mdmg??0:this.passive.dmg??0;let i=t*(1+n)*this.buffAtkMul();const r=Math.random()*100<this.sec.crit;return r&&(i*=this.sec.critDmg/100),{dmg:Math.max(1,Math.round(i)),crit:r}}projectToScreen(t,e,n){const i=new k(t,e,n).project(this.camera),r=this.renderer.domElement.getBoundingClientRect();return{x:r.left+(i.x+1)/2*r.width,y:r.top+(1-i.y)/2*r.height}}tryHitEnemy(){const t=this.enemy;if(!t||t.dyingAt)return;const[e,n]=An[this.facing];if(this.col+e!==t.c||this.row+n!==t.r)return;const i=this.sec.atkPhys+(this.currentWeapon?.dmg??0),r=this.rollDamage(i,!1);this.dealDamageToEnemy(t,r.dmg,r.crit)}dealDamageToEnemy(t,e,n=!1){if(t.dyingAt)return;const i=Math.max(1,Math.round(e));t.hp-=i,t.hitAt=performance.now();const r=Math.max(1e-4,t.hp/t.maxHp);t.barFill.scale.x=r,t.barFill.position.x=-(1-r)*1.3/2;const a=this.projectToScreen(t.bx,1.8,t.bz);if(this.ui.floatText(a.x,a.y,n?`${i}!`:`${i}`,n?"crit":"hit"),t.hp<=0){t.dyingAt=t.hitAt,this.blocked.delete(`${t.c},${t.r}`),this.spawnPoof(t.bx,t.bz),this.target===t&&this.clearTarget();const o=t.elevel,l=4+o*3+Math.floor(Math.random()*(3+o*2));this.stats.gold+=l,this.gainXp(30+o*15),this.ui.toast(`+${l} ouro`)}}cellDist(t){return Math.max(Math.abs(this.col-t.c),Math.abs(this.row-t.r))}buffAtkMul(){return this.buff&&performance.now()<this.buff.until?this.buff.atkMul:1}buffDefReduc(){return this.buff&&performance.now()<this.buff.until?this.buff.defReduc:0}refreshActionBar(){const t=Zv(this.classId,this.skillRanks);this.ui.setActionBar(t.map(e=>({id:e.id,name:e.name,icon:e.icon,mana:e.combat.mana})))}useSkill(t){const e=this.skillRanks[t]||0;if(e<=0)return;const n=_l(t),i=performance.now();if((this.cooldownUntil[t]??0)>i){this.ui.toast("Recarregando…");return}if(this.playerMp<n.mana){this.ui.toast("Mana insuficiente");return}if(n.target==="enemy"){(!this.target||this.target.dyingAt)&&this.enemy&&!this.enemy.dyingAt&&this.setTarget(this.enemy);const r=this.target;if(!r||r.dyingAt){this.ui.toast("Sem alvo");return}const a=this.cellDist(r),o=n.melee?1:n.range;if(a>o){this.ui.toast(n.melee?"Muito longe (corpo-a-corpo)":"Fora de alcance");return}}if(this.playerMp=Math.max(0,this.playerMp-n.mana),this.ui.setMana(this.playerMp/this.playerMaxMp),this.ui.skillManaFloat(t,n.mana),this.cooldownUntil[t]=i+n.cd,this.coolingSkills.add(t),n.effect==="dmg"&&this.target){const r=this.target.bx,a=this.target.bz,o=this.target,l=n.power*(1+.25*(e-1)),c=!n.melee&&n.magic?360:0;c>0&&this.ui.castBar(jv(t),c);const h=kh(t),d=Nb.has(t),u=()=>{if(this.enemy===o&&!o.dyingAt){const g=this.rollDamage(l,n.magic);this.dealDamageToEnemy(o,g.dmg,g.crit)}},f=()=>{Us[t]&&this.spawnEffect(t,r,a),d?window.setTimeout(u,h):u()};c>0?window.setTimeout(f,c):f(),n.melee&&this.ui.swingWeapon()}else if(n.effect==="heal"){const r=Math.round(n.power*(1+.25*(e-1))),a=this.playerHp;this.playerHp=Math.min(this.playerMaxHp,this.playerHp+r),this.ui.setHealth(this.playerHp/this.playerMaxHp),this.refreshStats();const o=this.playerHp-a;this.ui.floatText(window.innerWidth/2,window.innerHeight*.46,`+${o}`,"heal"),this.ui.toast(`+${r} vida`)}else n.effect==="buff"&&(this.buff={atkMul:n.atkMul??1,defReduc:n.defReduc??0,until:i+(n.dur??6e3)},this.recomputeDerived(),this.ui.toast("Fortalecido!"))}setTarget(t){this.target=t,this.ensureReticle(),this.reticle&&(this.reticle.visible=!0)}clearTarget(){this.target=null,this.reticle&&(this.reticle.visible=!1)}ensureReticle(){if(this.reticle)return;const t=document.createElement("canvas");t.width=128,t.height=128;const e=t.getContext("2d"),n=64;e.shadowColor="rgba(0,0,0,.5)",e.shadowBlur=5,e.strokeStyle="rgba(255,228,150,.9)",e.lineWidth=4,e.beginPath(),e.arc(n,n,50,0,Math.PI*2),e.stroke(),e.lineCap="round",e.lineWidth=5;const i=l=>{const c=Math.cos(l),h=Math.sin(l);e.beginPath(),e.moveTo(n+c*44,n+h*44),e.lineTo(n+c*56,n+h*56),e.stroke()};i(-Math.PI/2),i(Math.PI/2),i(0),i(Math.PI);const r=new _n(t);r.colorSpace=Ce;const a=new Re({map:r,transparent:!0,opacity:.9,depthTest:!0,depthWrite:!1}),o=new Z(new Ot(1.15,1.15),a);o.renderOrder=999,o.visible=!1,this.reticle=o,this.world.add(o),this.billboardProps.push(o)}onCanvasPointer(t){const e=this.enemy;if(!e||e.dyingAt)return;const n=this.renderer.domElement.getBoundingClientRect(),i=(t.clientX-n.left)/n.width*2-1,r=-((t.clientY-n.top)/n.height)*2+1;this.raycaster.setFromCamera(new wt(i,r),this.camera),this.raycaster.intersectObject(e.mesh,!1).length&&this.setTarget(e)}spawnPoof(t,e){if(!this.poofTex)return;const n=this.poofTex.clone();n.needsUpdate=!0,n.repeat.set(1/Br,1),n.offset.set(0,0);const i=new Re({map:n,transparent:!0,depthWrite:!1,side:$t}),r=new Z(new Ot(3.8,2.85),i);r.position.set(t,1.5,e),this.world.add(r),this.poofs.push({mesh:r,mat:i,tex:n,born:performance.now()})}updatePoofs(t){if(this.poofs.length===0)return;const e=this.camera.position.x,n=this.camera.position.z;for(let i=this.poofs.length-1;i>=0;i--){const r=this.poofs[i],a=(t-r.born)/Ob;if(a>=1){this.world.remove(r.mesh),r.mesh.geometry.dispose(),r.mat.dispose(),r.tex.dispose(),this.poofs.splice(i,1);continue}const o=Math.min(Br-1,Math.floor(a*Br));r.tex.offset.x=o/Br,r.mesh.rotation.y=Math.atan2(e-r.mesh.position.x,n-r.mesh.position.z)}}preloadFx(){for(const t in Us){const e=Us[t].url;this.fxTexCache[e]||this.loadArt(e,n=>this.fxTexCache[e]=this.fxFilter(n))}}fxFilter(t){return t.minFilter=Ve,t.magFilter=Ve,t.generateMipmaps=!1,t.needsUpdate=!0,t}spawnEffect(t,e,n){const i=Us[t];if(!i)return;const r=this.fxTexCache[i.url];if(!r){this.loadArt(i.url,m=>this.fxTexCache[i.url]=this.fxFilter(m));return}const a=i.frames,o=r.clone();this.fxFilter(o),o.repeat.set(1/a,1),o.offset.set(0,0);const l=r.image,c=l&&l.height?l.width/a/l.height:1,h=new Re({map:o,transparent:!0,depthWrite:!1,depthTest:!1,side:$t}),d=2.8,u=c>=1?d:d*c,f=c>=1?d/c:d,g=new Z(new Ot(u,f),h),_=Fb.has(t)?f/2:1.5;g.position.set(e,_,n),g.renderOrder=20,this.world.add(g),this.projectiles.push({mesh:g,mat:h,tex:o,frames:a,born:performance.now(),ms:kh(t),fromX:e,fromZ:n,toX:e,toZ:n})}updateProjectiles(t){if(this.projectiles.length===0)return;const e=this.camera.position.x,n=this.camera.position.z;for(let i=this.projectiles.length-1;i>=0;i--){const r=this.projectiles[i],a=(t-r.born)/r.ms;if(a>=1){this.world.remove(r.mesh),r.mesh.geometry.dispose(),r.mat.dispose(),r.tex.dispose(),this.projectiles.splice(i,1);continue}const o=Math.min(r.frames-1,Math.max(0,Math.floor(a*r.frames)));r.tex.offset.x=o/r.frames,r.mesh.rotation.y=Math.atan2(e-r.mesh.position.x,n-r.mesh.position.z)}}nextXpMax(t){return Math.round(100+(t-1)*60)}gainXp(t){if(this.stats.level>=100)return;this.stats.xp+=t;let e=0;for(;this.stats.level<100&&this.stats.xp>=this.stats.xpMax;)this.stats.xp-=this.stats.xpMax,this.stats.level++,this.stats.xpMax=this.nextXpMax(this.stats.level),e++;this.stats.level>=100&&(this.stats.xp=0),e>0&&(this.playerHp=this.playerMaxHp,this.playerMp=this.playerMaxMp,this.unspent+=e*hb,this.ui.setHealth(1),this.ui.setMana(1),this.ui.setSkillInfo(this.classId,Nh(this.stats.level)),this.ui.toast(`Nível ${this.stats.level}!`)),this.refreshStats()}refreshStats(){this.ui.setStats({level:this.stats.level,xp:this.stats.xp,xpMax:this.stats.xpMax,hp:this.playerHp,hpMax:this.playerMaxHp,mp:this.playerMp,mpMax:this.playerMaxMp,atk:this.stats.atk,def:this.stats.def,str:this.stats.str,dex:this.stats.dex,int:this.stats.int,gold:this.stats.gold,points:this.unspent,strMin:this.baseAttr.str,dexMin:this.baseAttr.dex,intMin:this.baseAttr.int,atkMag:this.atkWithBonus(this.sec.atkMag),crit:this.sec.crit,critDmg:this.sec.critDmg,precision:this.sec.precision,magRes:this.sec.magRes,evasion:this.sec.evasion})}damagePlayer(t){if(this.playerHp<=0)return;const e=t*(1-this.buffDefReduc()),n=Math.max(1,Math.round(e));this.playerHp=Math.max(0,this.playerHp-n),this.ui.setHealth(this.playerHp/this.playerMaxHp),this.refreshStats(),this.ui.flashDamage(),this.ui.floatText(window.innerWidth/2,window.innerHeight*.58,`-${n}`,"player"),this.playerHp<=0&&window.setTimeout(()=>{this.playerHp=this.playerMaxHp,this.ui.setHealth(1),this.refreshStats();const i=ah();this.enterLocation("village",i.col,i.row,0)},800)}buildChimneySmoke(){const t=this.smokeTex(),e=[[5,5],[9,5],[1,9],[13,9],[7,5],[1,7]];for(const[n,i]of e)for(let r=0;r<4;r++){const a=new Z(new Ot(1.4,1.4),new Re({map:t,transparent:!0,depthWrite:!1,opacity:0}));a.position.set(n*P+.4,ei+ia,i*P),a.userData={phase:(n*3.1+i*1.7+r*1.3)%4,baseX:n*P+.4,baseZ:i*P},this.world.add(a),this.smoke.push(a)}}smokeTex(){if(this._smokeTex)return this._smokeTex;const t=document.createElement("canvas");t.width=64,t.height=64;const e=t.getContext("2d"),n=e.createRadialGradient(32,32,2,32,32,30);n.addColorStop(0,"rgba(220,220,224,0.9)"),n.addColorStop(1,"rgba(220,220,224,0)"),e.fillStyle=n,e.beginPath(),e.arc(32,32,30,0,Math.PI*2),e.fill();const i=new _n(t);return i.colorSpace=Ce,this._smokeTex=i,i}buildVillageForestGate(){const t=lh(),e=t.col*P,n=t.row*P,i=new ut({map:Oe(5)}),r=new ut({map:ma(63)}),a=new Ot(P,P);for(let g=0;g<=2;g++){const _=new Z(a,r);_.rotation.x=-Math.PI/2,_.rotation.z=g%2*Math.PI/2,_.position.set(e,.02,(t.row-g)*P),this.world.add(_)}const o=new ke,l=new fe(.36,3.4,.36);for(const g of[-1.5,1.5]){const _=new Z(l,i);_.position.set(g,1.7,0),o.add(_)}const c=new Z(new fe(3.7,.36,.4),i);c.position.set(0,3.35,0),o.add(c);for(const g of[-1,1]){const _=new Z(new fe(.7,.16,.16),i);_.position.set(g*1.05,3,0),_.rotation.z=g*(Math.PI/4),o.add(_)}const h=new Z(new Ot(1.7,.6),new Re({map:fa("Floresta"),transparent:!0,side:$t}));h.position.set(0,2.72,0),h.rotation.y=Math.PI,o.add(h);const d=new ut({color:3815994});for(const g of[-.7,.7]){const _=new Z(new xe(.02,.02,.4,5),d);_.position.set(g,3.05,0),o.add(_)}o.position.set(e,0,n),this.world.add(o);const u=new ut({map:Fr(61)});u.map.repeat.set(8,5);const f=new Z(new Ot(8*P,5*P),u);f.rotation.x=-Math.PI/2,f.position.set(e,-.02,(t.row+2.5)*P),this.world.add(f);for(let g=1;g<=3;g++){const _=new Z(a,r);_.rotation.x=-Math.PI/2,_.rotation.z=g%2*Math.PI/2,_.position.set(e,.02,(t.row+g)*P),this.world.add(_)}this.buildTreelineBackdrop(e,(t.row+3.4)*P,Math.PI)}makeClusterMats(){return zr.map(t=>{const e=new ut({transparent:!0,opacity:0,side:$t});return this.loadArt(t.url,n=>{e.map=n,e.alphaTest=.35,e.opacity=1,e.needsUpdate=!0}),{mat:e,aspect:t.aspect}})}buildTreelineBackdrop(t,e,n){if(zr.length===0)return;const i=this.makeClusterMats(),r=13;let a=t-r*1.9;for(let o=0;o<3;o++){const l=i[o%i.length],c=r*l.aspect,h=new Z(new Ot(c,r),l.mat);h.position.set(a+c/2,r/2-1,e),h.rotation.y=n,o===1&&(h.scale.x=-1),this.world.add(h),a+=c*.92}}buildMountain(){const t=new ut({map:pa(41)});let e=ln,n=Ke;for(let r=0;r<Ke;r++)for(let a=0;a<ln;a++)ye(a,r)==="mountain"&&(e=Math.min(e,a),n=Math.min(n,r));const i=(r,a)=>{const o=r-e,l=a-n,c=Math.sqrt(o*o+l*l);return Math.max(ei+2.5,ei+11-c*1.7+this.mHash(r,a)*2)};for(let r=0;r<Ke;r++)for(let a=0;a<ln;a++){const o=ye(a,r),l=o==="tunnel"||o==="stairs";if(o!=="mountain"&&!l)continue;const c=i(a,r),h=l?Hr:0,d=c-h;if(d<=.2)continue;const u=new Z(new fe(P,d,P),t);if(u.position.set(a*P,h+d/2,r*P),this.world.add(u),!l&&this.mHash(a,r,2)>.35){const f=1.6+this.mHash(a,r,3)*1.8,g=new Z(new fe(f,f,f),t);g.position.set(a*P+(this.mHash(a,r,4)-.5)*2.4,c+f*.25,r*P+(this.mHash(a,r,5)-.5)*2.4),g.rotation.y=this.mHash(a,r,6)*Math.PI,this.world.add(g)}}}mHash(t,e,n=0){const i=Math.sin(t*41.3+e*17.7+n*7.13)*9871.2;return i-Math.floor(i)}buildBarrels(t,e,n){const i=new xe(.4,.34,1.05,14),r=new xe(.41,.41,.08,14);for(let a=0;a<Ke;a++)for(let o=0;o<ln;o++){if(ye(o,a)!=="barrel")continue;const l=An.filter(([x,E])=>ye(o+x,a+E)==="building");if(l.length===0)continue;const c=l.find(([x,E])=>!e.has(`${o+x},${a+E},${-x},${-E}`))||l[0],[h,d]=c;let u=0,f=0;const g=1.05;h!==0?f=(ye(o,a-1)==="building"?-1:ye(o,a+1)==="building"||n(o,a)>0?1:-1)*g:u=(ye(o-1,a)==="building"?-1:ye(o+1,a)==="building"||n(o,a)>0?1:-1)*g;const _=o*P+h*(P/2-.5)+u,m=a*P+d*(P/2-.5)+f,p=new ke,y=new Z(i,t);y.position.y=.52,p.add(y);const v=new Z(r,t);if(v.position.y=1.05,p.add(v),n(o,a,5)>.15){const x=new Z(i,t);x.scale.set(.82,.82,.82),x.position.set(-u*.5-h*.1,.42,-f*.5-d*.1),p.add(x)}p.position.set(_,0,m),this.world.add(p)}}buildWell(){const t=Yi.c*P,e=Yi.r*P;this.blocked.add(`${Yi.c},${Yi.r}`);const n=new ut({map:On(31)}),i=new ut({map:Oe(5)}),r=new ut({map:Rs(3),side:$t}),a=new ke,o=new Z(new xe(1.15,1.25,1.05,24,1,!0),n);o.position.y=.52,a.add(o);const l=new Z(new xe(.98,.98,1.05,24,1,!0),new ut({color:1512208,side:Je}));l.position.y=.52,a.add(l);const c=new Z(new Fl(.98,1.16,24),new ut({color:9274231,side:$t}));c.rotation.x=-Math.PI/2,c.position.y=1.045,a.add(c);const h=new Z(new xe(.97,.97,.05,28),new zx({color:3109512,specular:12578559,shininess:100,transparent:!0,opacity:.95}));h.position.y=.86,a.add(h);const d=new Z(new ks(.6,24),new Re({color:12577525,transparent:!0,opacity:.25}));d.rotation.x=-Math.PI/2,d.position.set(-.12,.87,-.08),a.add(d),this.waterGlint=d;const u=new fe(.16,2,.16);for(const p of[-1,1]){const y=new Z(u,i);y.position.set(p*.95,1.55,0),a.add(y)}const f=new Z(new fe(2.2,.14,.14),i);f.position.y=2.5,a.add(f);const g=new Z(new xe(.025,.025,.72,6),new ut({color:7034422}));g.position.set(.2,2.08,0),a.add(g);const _=new Z(new xe(.24,.2,.34,12),i);_.position.set(.2,1.7,0),a.add(_);const m=new Z(new Bn(1.7,.95,4),r);m.position.y=3.05,m.rotation.y=Math.PI/4,a.add(m),a.position.set(t,0,e),this.world.add(a)}buildTunnel(){const t=new ut({map:Mv(43),side:$t}),e=new ut({map:Th(47),side:$t}),n=new ut({map:Th(51),side:$t}),i=new ut({map:On(31)});let r=null;for(let a=0;a<Ke;a++)for(let o=0;o<ln;o++){if(!oh(o,a))continue;const l=o*P,c=a*P,h=ye(o,a)==="stairs",d=new Z(new Ot(P,P),n);if(d.rotation.x=Math.PI/2,d.position.set(l,Hr,c),this.world.add(d),!h){const u=new Z(new Ot(P,P),t);u.rotation.x=-Math.PI/2,u.position.set(l,.03,c),this.world.add(u)}for(const[u,f]of An){const g=ye(o+u,a+f);g==="street"?r=[o,a]:(g==="mountain"||g==="building")&&!h&&this.addWall(l,c,u,f,0,Hr,e)}h&&this.buildStairs(o,a,l,c,e,i)}if(r){const[a,o]=r,l=a*P,c=o*P,h=new Re({color:16757322});for(const u of[-1,1]){const f=new Z(new xe(.05,.05,1.1,8),new ut({color:2759696}));f.position.set(l+u*(P/2-.25),1.9,c),this.world.add(f);const g=new Z(new zl(.18,10,10),h);g.position.set(l+u*(P/2-.25),2.55,c),this.world.add(g)}const d=new gn(16752704,7,16,2);d.position.set(l,2.4,c+.5),this.world.add(d),this.flames.push({light:d,base:6})}}addDungeonLights(){this.world.add(new Ss(7762307,1.05)),this.world.add(new ws(9143960,2104617,.72))}addShowcaseLights(){this.world.add(new Ss(6975874,.55)),this.world.add(new ws(10465480,2762272,.5));const t=new na(14674687,1.3);t.position.set(ha,es+30,da),t.target.position.set(ha,es,da),this.world.add(t.target),this.world.add(t)}moteTex(){if(this.moteTexCache)return this.moteTexCache;const t=document.createElement("canvas");t.width=t.height=32;const e=t.getContext("2d"),n=e.createRadialGradient(16,16,0,16,16,16);n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.4,"rgba(255,255,255,0.5)"),n.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=n,e.fillRect(0,0,32,32);const i=new _n(t);return this.moteTexCache=i,i}spawnMotes(t,e,n,i,r,a,o,l,c,h=.0016){const d=new Float32Array(o*3),u=new Float32Array(o);for(let m=0;m<o;m++)d[m*3]=t+(Math.random()-.5)*n,d[m*3+1]=r+Math.random()*(a-r),d[m*3+2]=e+(Math.random()-.5)*i,u[m]=.12+Math.random()*.5;const f=new Te;f.setAttribute("position",new Ge(d,3));const g=new _d({color:l,size:c,map:this.moteTex(),transparent:!0,opacity:.72,depthWrite:!1,sizeAttenuation:!0,blending:to}),_=new ax(f,g);_.renderOrder=8,this.world.add(_),this.motes.push({pts:_,sp:u,y0:r,y1:a,sway:h})}applyHeightFog(t,e,n,i){const r=new zt(i);t.onBeforeCompile=a=>{a.uniforms.hfColor={value:r},a.uniforms.hfClear={value:e},a.uniforms.hfFull={value:n},a.vertexShader=`varying float vWorldY;
`+a.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
  vWorldY = (modelMatrix * vec4(transformed, 1.0)).y;`),a.fragmentShader=`uniform vec3 hfColor;
uniform float hfClear;
uniform float hfFull;
varying float vWorldY;
`+a.fragmentShader.replace("#include <fog_fragment>",`#include <fog_fragment>
  float hf = clamp((vWorldY - hfClear) / (hfFull - hfClear), 0.0, 1.0);
  gl_FragColor.rgb = mix(gl_FragColor.rgb, hfColor, hf);`)},t.needsUpdate=!0}softPuffTex(){if(this.softPuffCache)return this.softPuffCache;const t=document.createElement("canvas");t.width=t.height=128;const e=t.getContext("2d"),n=e.createRadialGradient(64,64,0,64,64,64);n.addColorStop(0,"rgba(255,255,255,0.9)"),n.addColorStop(.5,"rgba(255,255,255,0.35)"),n.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=n,e.fillRect(0,0,128,128);const i=new _n(t);return this.softPuffCache=i,i}cloudDomeTex(){if(this.cloudTexCache)return this.cloudTexCache;const t=512,e=256,n=document.createElement("canvas");n.width=t,n.height=e;const i=n.getContext("2d"),r=i.createImageData(t,e);for(let o=0;o<e;o++){const l=o/(e-1),c=Math.min(1,Math.max(0,(.7-l)/.7));for(let h=0;h<t;h++){const d=this.fbm(h*.02,o*.05,3.3),u=Math.min(1,Math.max(0,(d-.34)*2.3));let f=c*(.4+.6*u);l<.14&&(f=Math.max(f,(.14-l)/.14));const g=(o*t+h)*4;r.data[g]=r.data[g+1]=r.data[g+2]=255,r.data[g+3]=Math.round(Math.min(1,f)*255)}}i.putImageData(r,0,0);const a=new _n(n);return a.wrapS=sn,a.flipY=!1,this.cloudTexCache=a,a}fogSmokeTex(t){if(this.smokeTexes[t])return this.smokeTexes[t];const e=128,n=document.createElement("canvas");n.width=n.height=e;const i=n.getContext("2d"),r=i.createImageData(e,e),a=t*17.3;for(let l=0;l<e;l++)for(let c=0;c<e;c++){const h=c/e-.5,d=l/e-.5,u=Math.sqrt(h*h+d*d)*2,f=Math.max(0,1-u),g=f*f,_=this.fbm(c*.05+a,l*.05+a,t*4.7),m=g*(.45+.55*_),p=(l*e+c)*4;r.data[p]=r.data[p+1]=r.data[p+2]=255,r.data[p+3]=Math.round(Math.min(1,m)*255)}i.putImageData(r,0,0);const o=new _n(n);return this.smokeTexes[t]=o,o}spawnFogPuffs(t,e,n,i,r,a,o,l,c=.3,h=1.1,d=.16,u=8,f=18){const g=new zt(o),_=new zt(l);for(let m=0;m<n;m++){const p=g.clone().lerp(_,Math.random()),y=new jr({map:this.fogSmokeTex(m%4),color:p,transparent:!0,opacity:d,depthWrite:!1,fog:!1,rotation:Math.random()*Math.PI*2}),v=new Zo(y),x=u+Math.random()*(f-u);v.scale.set(x,x,1);const E=Math.random()*Math.PI*2,S=a*(c+Math.random()*(h-c)),A=t+Math.cos(E)*S,R=e+Math.sin(E)*S,b=i+Math.random()*(r-i);v.position.set(A,b,R),v.renderOrder=9,this.world.add(v),this.fogPuffs.push({s:v,bx:A,bz:R,by:b,ph:Math.random()*6.28,rad:1.2+Math.random()*2.6,baseOp:d*(.7+Math.random()*.6),rotSp:(Math.random()-.5)*.04,rise:.3+Math.random()*.7})}}buildShowcase(){const t=so,e=ro,n=Jx,i=Qx,r=es,a=r+32,o=8160144,l=r+4,c=r+26,h=(W,nt,rt)=>{const ft=On(31);return ft.wrapS=ft.wrapT=sn,ft.repeat.set(W,nt),new ut({map:ft,color:rt??16777215,side:$t})},d=h(1.4,1.4),u=h(1.4,.5,13092807),f=h(1,1),g=h(5,3,12105912),_=h(2,2),m=h(3,2),p=Mh();p.wrapS=p.wrapT=sn,p.repeat.set(1,1);const y=new ut({map:p,side:$t}),v=Fr(61);v.wrapS=v.wrapT=sn,v.repeat.set(4,4);const x=new ut({map:v,side:$t});for(const W of[f,g,d,u,y])this.applyHeightFog(W,l,c,o);const E=(W,nt,rt,ft,Ft,Kt,ie)=>{const be=W.length/3;W.push(...ft,...Ft,...Kt,...ie),nt.push(0,0,1,0,1,1,0,1),rt.push(be,be+1,be+2,be,be+2,be+3)},S=_o.slice(0,qs+1),A=W=>Math.atan2(W.z-e,W.x-t),R=A(S[1])-A(S[0]),b=[],M=[],C=[],I=[],N=[],G=[],X=(W,nt,rt)=>[t+nt*Math.cos(W),rt,e+nt*Math.sin(W)];for(let W=0;W<S.length;W++){const nt=A(S[W]),rt=S[W].y,ft=nt-R/2,Ft=nt+R/2;if(E(b,M,C,X(ft,n,rt),X(Ft,n,rt),X(Ft,i,rt),X(ft,i,rt)),W>0){const Kt=S[W-1].y;E(I,N,G,X(ft,n,Kt),X(ft,i,Kt),X(ft,i,rt),X(ft,n,rt))}}const q=(W,nt,rt,ft)=>{const Ft=new Te;Ft.setAttribute("position",new le(W,3)),Ft.setAttribute("uv",new le(nt,2)),Ft.setIndex(rt),Ft.computeVertexNormals();const Kt=new Z(Ft,ft);return this.world.add(Kt),Kt};q(b,M,C,d),q(I,N,G,u);const et=new Z(new xe(n,n,r,32,1,!0),g);et.position.set(t,r/2,e),this.world.add(et);const $=new Z(new ks(i,40),d);$.rotation.x=-Math.PI/2,$.position.set(t,.02,e),this.world.add($);const pt=Math.atan2(Es-e,-Math.sqrt(Math.max(0,i*i-(Es-e)**2))),St=.36,Lt=r-1,Vt=r+4.5,re=(W,nt)=>Math.abs(Math.atan2(Math.sin(W-nt),Math.cos(W-nt))),K=60,lt=[[0,Lt],[Lt,Vt],[Vt,a]],At=[],mt=[],It=[],Gt=i*2*Math.PI/K/4;for(const[W,nt]of lt){const rt=W===Lt;for(let ft=0;ft<K;ft++){const Ft=ft/K*Math.PI*2,Kt=(ft+1)/K*Math.PI*2;if(rt&&re((Ft+Kt)/2,pt)<St)continue;const ie=t+i*Math.cos(Ft),be=e+i*Math.sin(Ft),Ie=t+i*Math.cos(Kt),Sn=e+i*Math.sin(Kt),dn=ft*Gt,Xe=(ft+1)*Gt,qe=At.length/3;At.push(ie,W,be,Ie,W,Sn,Ie,nt,Sn,ie,nt,be),mt.push(dn,W/4,Xe,W/4,Xe,nt/4,dn,nt/4),It.push(qe,qe+1,qe+2,qe,qe+2,qe+3)}}const qt=new Te;qt.setAttribute("position",new le(At,3)),qt.setAttribute("uv",new le(mt,2)),qt.setIndex(It),qt.computeVertexNormals(),this.world.add(new Z(qt,f));const oe=ha,Yt=da,Ht=rv+1.8,z=2,Ee=3.4,te=oe+Ht-.2,jt=xh-te,kt=(xh+te)/2,ce=new Z(new Ot(jt,z*2),_);ce.rotation.x=-Math.PI/2,ce.position.set(kt,r+.02,Es),this.world.add(ce);for(const W of[-1,1]){const nt=new Z(new Ot(jt,Ee),m);nt.position.set(kt,r+Ee/2,Es+W*z),this.world.add(nt)}const Rt=new Z(new Ot(jt,z*2),m);Rt.rotation.x=Math.PI/2,Rt.position.set(kt,r+Ee,Es),this.world.add(Rt);const L=Ht,T=new Ot(P,P);for(const[W,nt]of sv()){const rt=new Z(T,x);rt.rotation.x=-Math.PI/2,rt.position.set(W*P,r+.02,nt*P),this.world.add(rt)}const V=new Z(new ks(L,44),x);V.rotation.x=-Math.PI/2,V.position.set(oe,r+.05,Yt),this.world.add(V);const tt=Math.asin(Math.min(.98,z/Ht))-.03,it=72,Q=r-2,Ct=r+Ee,_t=r-2+a,yt=Ht*2*Math.PI/it/4,ee=[[Q,Ct,!0],[Ct,_t,!1]],at=[],bt=[],Pt=[];for(const[W,nt,rt]of ee)for(let ft=0;ft<it;ft++){const Ft=ft/it*Math.PI*2,Kt=(ft+1)/it*Math.PI*2,ie=Math.atan2(Math.sin((Ft+Kt)/2),Math.cos((Ft+Kt)/2));if(rt&&Math.abs(ie)<tt)continue;const be=oe+Ht*Math.cos(Ft),Ie=Yt+Ht*Math.sin(Ft),Sn=oe+Ht*Math.cos(Kt),dn=Yt+Ht*Math.sin(Kt),Xe=ft*yt,qe=(ft+1)*yt,rn=at.length/3;at.push(be,W,Ie,Sn,W,dn,Sn,nt,dn,be,nt,Ie),bt.push(Xe,W/4,qe,W/4,qe,nt/4,Xe,nt/4),Pt.push(rn,rn+1,rn+2,rn,rn+2,rn+3)}const Bt=new Te;Bt.setAttribute("position",new le(at,3)),Bt.setAttribute("uv",new le(bt,2)),Bt.setIndex(Pt),Bt.computeVertexNormals(),this.world.add(new Z(Bt,y)),this.blocked.add(`${ai.col},${ai.row}`);const Mt=_h.x,Wt=_h.z,Xt=new ut({map:wh(),side:$t}),ne=new Z(new xe(.9,1.1,.7,16),Xt);ne.position.set(Mt,r+.4,Wt),this.world.add(ne);const B=new ut({color:14080479,emissive:2041137}),gt=new Z(new xe(.4,.55,2.4,6),B);gt.position.set(Mt,r+.75+1.2,Wt),this.world.add(gt),this.glowLight(Mt,r+1.9,Wt,13625087,3.6,13),this.glowLight(oe,r+13,Yt,14674687,4.5,34);const Y=this.decalMat(Ma,.1);for(let W=2;W<S.length;W+=4){const nt=A(S[W]),rt=S[W].y+2,ft=t+(i-.25)*Math.cos(nt),Ft=e+(i-.25)*Math.sin(nt),Kt=new Z(new Ot(.9,1.4),Y);Kt.position.set(ft,rt,Ft),Kt.rotation.y=Math.atan2(t-ft,e-Ft),this.world.add(Kt),this.glowLight(ft,rt+.2,Ft,16752704,5,10)}for(const W of[Math.PI*.6,Math.PI*1.4])this.glowLight(oe+Math.cos(W)*(L-1),r+2.4,Yt+Math.sin(W)*(L-1),16752704,2.6,9);this.spawnMotes(oe,Yt,L*2,L*2,r+.2,r+6,60,14673650,.09,.0022),this.spawnFogPuffs(oe,Yt,24,r+.6,r+10,L*.55,7370886,11186880,0,1,.05,16,34),this.spawnFogPuffs(t,e,10,1,r-1,n+.5,7370886,10134192,0,.7,.04,14,26)}vnoise(t,e,n){const i=(x,E,S)=>{const A=Math.sin(x*127.1+E*311.7+S*74.7)*43758.5453;return A-Math.floor(A)},r=Math.floor(t),a=Math.floor(e),o=Math.floor(n),l=t-r,c=e-a,h=n-o,d=x=>x*x*(3-2*x),u=d(l),f=d(c),g=d(h),_=(x,E,S)=>x+(E-x)*S,m=_(i(r,a,o),i(r+1,a,o),u),p=_(i(r,a+1,o),i(r+1,a+1,o),u),y=_(i(r,a,o+1),i(r+1,a,o+1),u),v=_(i(r,a+1,o+1),i(r+1,a+1,o+1),u);return _(_(m,p,f),_(y,v,f),g)}fbm(t,e,n){return this.vnoise(t,e,n)*.6+this.vnoise(t*2.1,e*2.1,n*2.1)*.3+this.vnoise(t*4.4,e*4.4,n*4.4)*.1}caveMesh(t,e,n,i,r,a,o,l,c=1,h=1){const d=[],u=[],f=[];for(let m=0;m<=a;m++)for(let p=0;p<=r;p++){const y=p/r,v=m/a;let x=t[0]+e[0]*y+n[0]*v,E=t[1]+e[1]*y+n[1]*v,S=t[2]+e[2]*y+n[2]*v;const A=Math.sin(Math.PI*y)*Math.sin(Math.PI*v),R=o*(this.fbm(x*.32,E*.32,S*.32)-.5)*A;x+=i[0]*R,E+=i[1]*R,S+=i[2]*R,d.push(x,E,S),u.push(y*c,v*h)}for(let m=0;m<a;m++)for(let p=0;p<r;p++){const y=m*(r+1)+p,v=y+1,x=y+r+1,E=x+1;f.push(y,x,v,v,x,E)}const g=new Te;g.setAttribute("position",new le(d,3)),g.setAttribute("uv",new le(u,2)),g.setIndex(f),g.computeVertexNormals();const _=new Z(g,l);return this.world.add(_),_}rockSpire(t,e,n,i,r,a){const o=new Bn(r,Math.abs(i-n),7,4),l=o.attributes.position;for(let h=0;h<l.count;h++){const d=l.getX(h),u=l.getY(h),f=l.getZ(h),g=this.fbm(d*2+t,u*2,f*2+e)-.5;l.setXYZ(h,d+g*r*.7,u,f+g*r*.7)}o.computeVertexNormals();const c=new Z(o,a);return c.position.set(t,(n+i)/2,e),i<n&&(c.rotation.z=Math.PI),this.world.add(c),c}buildDungeon(){const t=io,e=Xs,n=8.5,i=P/2,r=(C,I,N=0)=>Math.abs(Math.sin(C*12.9+I*78.2+N*3.1)*43758.5%1),a=new ut({map:Mh(),side:$t}),o=new ut({map:wh(),side:$t}),l=new ut({map:vv(),side:$t}),c=this.decalMat(Ma,.1),h=this.decalMat(Lh,.08),d=new ut({map:Sh(69),transparent:!0,alphaTest:.5,side:$t}),u=new ut({map:Oe(5)}),f=new ut({color:2564893}),g=new ut({map:ua(17)}),_=(C,I)=>{const N=cn(C,I);return N==="wall"||N==="secret"?!1:Ir(C-1,I)&&Ir(C+1,I)||Ir(C,I-1)&&Ir(C,I+1)};let m=0;for(let C=0;C<e;C++)for(let I=0;I<t;I++){const N=cn(I,C);if(N==="wall")continue;const G=I*P,X=C*P,q=N==="secret";this.caveMesh([G-i,0,X-i],[P,0,0],[0,0,P],[0,1,0],3,3,.12,o,1,1),this.caveMesh([G-i,n,X-i],[P,0,0],[0,0,P],[0,-1,0],5,5,3.4,l,1,1);for(const[et,$]of An){const pt=cn(I+et,C+$),St=pt==="wall",Lt=q&&pt!=="secret"&&_(I+et,C+$);if(St||Lt){const Vt=G+et*i,re=X+$*i,K=et!==0?[0,0,P]:[P,0,0],lt=et!==0?[Vt,0,re-i]:[Vt-i,0,re];this.caveMesh(lt,K,[0,n,0],[et,0,$],4,6,.9,a,1,2.4),Lt&&this.addWallDecal(I,C,et,$,h,1.9,1.8,1.7)}pt==="wall"&&!q&&m<30&&r(I,C,et*5+$)<.2&&(this.addWallDecal(I,C,et,$,c,.85,1.4,2.1),this.glowLight(G+et*.3,2.3,X+$*.3,16752704,4.4,12),m++)}if(N==="bones"){const et=new Z(new Ot(1.7,1.3),d);et.rotation.x=-Math.PI/2,et.position.set(G,.05,X),this.world.add(et)}else if(N==="barrel"){const et=new Z(new xe(.42,.46,.95,12),g);et.position.set(G,.48,X),this.world.add(et),this.blocked.add(`${I},${C}`)}else N==="chest"&&(this.buildChest(G,X,u,f),this.blocked.add(`${I},${C}`),this.glowLight(G,.9,X,16761703,1.5,6.5))}const p=this.decalMat(N1,.4),y=this.decalMat(F1,.4),v=4.7,x=1.5,E=2.6,S=[[22,12,0,1],[17,35,1,0]];for(const[C,I,N,G]of S){if(cn(C,I)!=="gate")continue;this.addArchWall(C,I,N,G,a,x,E,n),this.addWallDecal(C,I,N,G,p,P,v,v/2);const{pivotL:X,pivotR:q}=this.buildSwingGate(C,I,N,G,y,P,v);this.glowLight(C*P+N*.4,2.4,I*P+G*.4,16757850,3.4,9),this.glowLight((C-N)*P,1.8,(I-G)*P,16760690,2.2,9),this.blocked.add(`${C},${I}`),this.gates.set(`${C},${I}`,{pivotL:X,pivotR:q})}const A=la("L")[0];A&&(this.addArchWall(A.col,A.row,-1,0,a,x,E,n),this.addWallDecal(A.col,A.row,-1,0,p,P,v,v/2),this.addWallDecal(A.col,A.row,-1,0,y,P,v,v/2),this.glowLight(A.col*P+-1*.4,2.4,A.row*P,16757850,3,8),this.blocked.add(`${A.col},${A.row}`));const R=la("A")[0];if(R){const C=new ut({map:On(31),side:$t}),I=R.col*P-P*.4,N=R.row*P,G=9;for(let X=0;X<G;X++){const q=.15+(X+1)*.42,et=new Z(new fe(.66,q,3),C);et.position.set(I+X*.6,q/2,N),this.world.add(et)}for(const X of[-1,1]){const q=new Z(new Ot(P*1.5,n),a);q.position.set(I+P*.6,n/2,N+X*1.5),q.rotation.y=X>0?Math.PI:0,this.world.add(q)}this.glowLight(I+.4,2.4,N,16760938,4.6,11),this.glowLight(I+2.6,3.4,N,16757850,2.6,8)}const b=hh("U"),M=new gn(12574975,3.2,13,2);M.position.set(b.col*P,2.7,b.row*P),this.world.add(M),this.spawnDungeonEnemy()}buildChest(t,e,n,i){const r=new Z(new fe(1,.6,.7),n);r.position.set(t,.3,e),this.world.add(r);const a=new Z(new fe(1.03,.3,.73),n);a.position.set(t,.73,e),this.world.add(a);const o=new Z(new fe(1.05,.95,.14),i);o.position.set(t,.46,e),this.world.add(o);const l=new gn(16764794,1.4,5,2);l.position.set(t,1.1,e),this.world.add(l)}spawnDungeonEnemy(){const t=la("E").filter(i=>!(i.col===this.col&&i.row===this.row));if(!t.length)return;let e=t[0],n=1/0;for(const i of t){const r=Math.abs(i.col-this.col)+Math.abs(i.row-this.row);r<n&&(n=r,e=i)}this.buildDungeonEnemy(e.col,e.row)}addWall(t,e,n,i,r,a,o){const l=new Z(new Ot(P,a-r),o);return l.position.set(t+n*(P/2),(r+a)/2,e+i*(P/2)),n===1?l.rotation.y=-Math.PI/2:n===-1?l.rotation.y=Math.PI/2:i===1?l.rotation.y=Math.PI:l.rotation.y=0,this.world.add(l),l}addArchWall(t,e,n,i,r,a,o,l){const c=P/2,h=new wd;h.moveTo(-c,0),h.lineTo(c,0),h.lineTo(c,l),h.lineTo(-c,l),h.closePath();const d=new ul;d.moveTo(-a,0),d.lineTo(a,0),d.lineTo(a,o),d.absarc(0,o,a,0,Math.PI,!1),d.lineTo(-a,0),h.holes.push(d);const u=new Ol(h,20),f=u.attributes.uv;for(let _=0;_<f.count;_++)f.setXY(_,f.getX(_)*.18,f.getY(_)*.18);const g=new Z(u,r);return g.position.set(t*P+n*(P/2),0,e*P+i*(P/2)),n===1?g.rotation.y=-Math.PI/2:n===-1?g.rotation.y=Math.PI/2:i===1?g.rotation.y=Math.PI:g.rotation.y=0,g.renderOrder=3,this.world.add(g),g}halfPlaneGeo(t,e,n){const i=new Ot(t,e),r=i.attributes.uv;for(let a=0;a<r.count;a++)r.setX(a,r.getX(a)*.5+n*.5);return i}buildSwingGate(t,e,n,i,r,a,o){const l=new ke;l.position.set(t*P+n*(P/2+.06),0,e*P+i*(P/2+.06)),l.rotation.y=n===1?Math.PI/2:n===-1?-Math.PI/2:i===1?0:Math.PI;const c=new ke;c.position.set(-a/2,0,0);const h=new Z(this.halfPlaneGeo(a/2,o,0),r);h.position.set(a/4,o/2,0),h.renderOrder=4,c.add(h);const d=new ke;d.position.set(a/2,0,0);const u=new Z(this.halfPlaneGeo(a/2,o,1),r);return u.position.set(-a/4,o/2,0),u.renderOrder=4,d.add(u),l.add(c),l.add(d),this.world.add(l),{pivotL:c,pivotR:d}}buildStairs(t,e,n,i,r,a){const c=i+P/2,h=P/5,d=-5*.8;for(const[_,m]of An){const p=ye(t+_,e+m);(p==="mountain"||p==="building")&&this.addWall(n,i,_,m,d,Hr,r)}for(let _=0;_<5;_++){const m=-_*.8,p=c-(_+.5)*h,y=m-d,v=new Z(new fe(P,y,h+.02),a);v.position.set(n,m-y/2,p),this.world.add(v)}const u=new Z(new Ot(P,P),new Re({color:328966}));u.rotation.x=-Math.PI/2,u.position.set(n,d+.02,i),this.world.add(u);const f=new gn(16760688,6,13,2);f.position.set(n,2.6,i+P/2-.3),this.world.add(f);const g=new gn(16752720,3.5,8,2);g.position.set(n,.4,i-.6),this.world.add(g)}buildEstablishments(t,e){for(const n of Fh){const{c:i,r,dc:a,dr:o,kind:l}=n;this.addDecal(i,r,a,o,t,"door"),this.doorMap.set(`${i},${r},${a},${o}`,l);const c=i*P+a*(P/2+.06),h=r*P+o*(P/2+.06),d=new Z(new Ot(1.05,1.75),e);d.position.set(c-o*1.3,2.05,h+a*1.3),d.rotation.y=a===1?Math.PI/2:a===-1?-Math.PI/2:o===1?0:Math.PI,d.renderOrder=4,this.world.add(d);const u=new ke,f=.46,g=new ut({map:fa(va[l].name),transparent:!0,side:$t}),_=new Z(new Ot(f*mb,f),g);_.position.set(0,1.74,.03),u.add(_);const m=pb[l];m&&this.loadArt(m,E=>{g.map=E,g.needsUpdate=!0;const S=E.image;if(S&&S.width&&S.height){const A=S.width/S.height;_.geometry.dispose(),_.geometry=new Ot(f*A,f)}});const p=i*P+a*(P/2+.16),y=r*P+o*(P/2+.16),v=o,x=-a;u.position.set(p+v*1.5,0,y+x*1.5),u.rotation.y=a===1?Math.PI/2:a===-1?-Math.PI/2:o===1?0:Math.PI,this.world.add(u)}}buildHomes(t){for(const e of Oh){const{c:n,r:i,dc:r,dr:a,id:o}=e;this.addDecal(n,i,r,a,t,"door"),this.homeDoorMap.set(`${n},${i},${r},${a}`,o)}}addNPC(t,e,n,i,r,a,o=1,l,c){const h=bv(n),d=!!a,u=new ut({map:h,transparent:!0,alphaTest:.5,side:$t}),f=(d?2.4:2.15)*o,g=(d?f*.671:1.3)*(d?1:o),_=d?f/2-f*.015+.06:1.1*o,m=new Z(new Ot(g*.95,g*.55),new Re({map:this.shadowTex(),transparent:!0,depthWrite:!1,opacity:.55})),p=c?this.wallLean(t,e):{x:0,z:0},y=t*P+p.x,v=e*P+p.z;m.rotation.x=-Math.PI/2,m.position.set(y,.03,v),m.renderOrder=1,this.world.add(m);const x=new Z(new Ot(g,f),u);x.position.set(y,_,v),x.userData={baseY:_,h:f,ph:(t*12.9+e*7.3)%(Math.PI*2)},this.world.add(x);const E=this.makeNameTag(i.split(",")[0].trim());E.position.set(y,_+f/2+.18,v),this.world.add(E),this.npcs.push(x);const S=`${t},${e}`,A={name:i,lines:r,tex:h,art:!1,frames:1,portrait:void 0};this.npcMap.set(S,A),a&&this.loadArt(a,R=>{l&&(R.repeat.set(1/l.frames,1),R.offset.set(0,0),this.animTex.push({tex:R,frames:l.frames,fps:l.fps})),u.map=R,u.needsUpdate=!0,A.tex=R,A.art=!0,A.frames=l?.frames??1,A.portrait=void 0}),c&&this.walkers.push({mesh:x,shadow:m,tag:E,baseY:_,cur:{c:t,r:e},dayCell:{c:c.day[0],r:c.day[1]},nightCell:{c:c.night[0],r:c.night[1]},key:S,moving:!1,t0:0,from:{c:t,r:e},to:{c:t,r:e},fromX:y,fromZ:v,toX:y,toZ:v,waitUntil:0,inside:!1,doorDir:void 0,trans:null})}makeNameTag(t){const i='bold 40px "Cinzel", "MedievalSharp", system-ui, serif',r=document.createElement("canvas").getContext("2d");r.font=i;const o=Math.ceil(r.measureText(t).width)+36,l=58,c=document.createElement("canvas");c.width=o,c.height=l;const h=c.getContext("2d"),d=l/2;h.beginPath(),h.moveTo(d,0),h.arcTo(o,0,o,l,d),h.arcTo(o,l,0,l,d),h.arcTo(0,l,0,0,d),h.arcTo(0,0,o,0,d),h.closePath(),h.fillStyle="rgba(16,12,8,0.74)",h.fill(),h.lineWidth=3,h.strokeStyle="rgba(201,162,39,0.7)",h.stroke(),h.font=i,h.textAlign="center",h.textBaseline="middle",h.lineWidth=5,h.strokeStyle="rgba(0,0,0,0.85)",h.strokeText(t,o/2,l/2+1),h.fillStyle="#f0dca2",h.fillText(t,o/2,l/2+1);const u=new _n(c);u.colorSpace=Ce,u.magFilter=Ve,u.minFilter=vn,u.generateMipmaps=!0;const f=new Zo(new jr({map:u,transparent:!0,depthWrite:!1})),g=.4;return f.scale.set(g*(o/l),g,1),f}shadowTex(){if(!this._shadowTex){const e=document.createElement("canvas");e.width=64,e.height=64;const n=e.getContext("2d"),i=n.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);i.addColorStop(0,"rgba(0,0,0,0.6)"),i.addColorStop(.6,"rgba(0,0,0,0.32)"),i.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=i,n.fillRect(0,0,64,64);const r=new _n(e);r.colorSpace=Ce,this._shadowTex=r}return this._shadowTex}loadArt(t,e){const n=this.artCache.get(t);if(n){e(n);return}new Ed().load(t,i=>{i.colorSpace=Ce,i.magFilter=Ve,i.minFilter=vn,i.generateMipmaps=!0,i.anisotropy=8,i.wrapS=xn,i.wrapT=xn,this.artCache.set(t,i),e(i)},void 0,()=>{})}buildNPCs(){const t=(performance.now()/Ur+Dr)%1;this.npcNight=this.daylight(t)<.3;for(const e of zb){const n=Hb[e.id],i=n?n.url:Bb[e.id],[r,a]=this.npcNight?e.night:[e.c,e.r];this.addNPC(r,a,e.seed,e.name,e.lines,i,e.scale??1,n?{frames:n.frames,fps:n.fps}:void 0,{day:[e.c,e.r],night:e.night})}}makePortrait(t,e=1){const n=t;if(!n)return null;const i=Math.floor((n.naturalWidth||n.width||0)/e),r=n.naturalHeight||n.height||0;if(!i||!r)return null;const a=132,o=document.createElement("canvas");o.width=a,o.height=a;const l=o.getContext("2d");if(!l)return null;l.imageSmoothingQuality="high";let c=i*.5-r*.09,h=r*.05,d=r*.18;try{const u=document.createElement("canvas");u.width=i,u.height=r;const f=u.getContext("2d");if(f){f.drawImage(t,0,0);const g=f.getImageData(0,0,i,r).data,_=40,m=v=>{let x=0,E=0,S=-1;for(let A=0;A<=i;A++)if(A<i&&g[(v*i+A)*4+3]>_)S<0&&(S=A);else if(S>=0){const b=A-S;b>x&&(x=b,E=S),S=-1}return{w:x,cx:E+x/2}};let p=-1,y=-1;for(let v=0;v<r&&p<0;v++)for(let x=0;x<i;x++)if(g[(v*i+x)*4+3]>_){p=v;break}for(let v=r-1;v>=0&&y<0;v--)for(let x=0;x<i;x++)if(g[(v*i+x)*4+3]>_){y=v;break}if(p>=0&&y>p){const v=y-p+1;let x=p;for(let R=p;R<p+v*.3;R++)if(m(R).w>i*.06){x=R;break}let E=0,S=i/2;const A=Math.round(v*.14);for(let R=x;R<x+A;R++){const b=m(R);b.w>E&&(E=b.w,S=b.cx)}d=Math.max(v*.13,Math.min(E*1.55,v*.3,r*.55)),c=S-d/2,h=x-d*.12}}}catch{}c=Math.max(0,Math.min(c,i-d)),h=Math.max(0,Math.min(h,r-d)),d=Math.min(d,i,r);try{return l.drawImage(t,c,h,d,d,0,0,a,a),o.toDataURL("image/png")}catch{return null}}portraitFor(t){const e=this.npcMap.get(t);if(!e)return null;if(e.portrait!==void 0)return e.portrait;const n=e.tex.image;if(!n)return null;const i=this.makePortrait(n,e.frames??1);return i&&(e.portrait=i),i}addForestLights(){const t=new Ss(10134706,.72),e=new ws(10464188,4214830,.85),n=new na(14673644,.5);n.position.set(-8,16,5),this.world.add(t),this.world.add(e),this.world.add(n),this.registerDayLight(t,3557482,.44),this.registerDayLight(e,2899038,.5),this.registerDayLight(n,6714797,.14)}buildForest(){const t=Zr,e=Ws,n=aa("s"),i=(E,S,A=0)=>{const R=Math.sin(E*41.3+S*17.7+A*7.13)*4213.1;return R-Math.floor(R)},r=new ut({map:Fr(61)});r.map.repeat.set(t+10,e+10);const a=new Z(new Ot((t+10)*P,(e+10)*P),r);a.rotation.x=-Math.PI/2,a.position.set((t/2-.5)*P,0,(e/2-.5)*P),this.world.add(a);const o=new ut({map:ma(63)}),l=new Ot(P,P);for(let E=0;E<e;E++)for(let S=0;S<t;S++){const A=xi(S,E);if(A==="path"||A==="gate"||A==="spawn"||A==="sign"){const R=new Z(l,o);R.rotation.x=-Math.PI/2,R.rotation.z=Math.floor(i(S,E,9)*4)*Math.PI/2,R.position.set(S*P,.02,E*P),this.world.add(R)}}const c=Uh.length>0,h=(c?Uh:[65,66,67,71,79]).map((E,S)=>{const A=new ut({map:yh(65+S*6),transparent:!0,alphaTest:.4,side:$t});return c&&this.loadArt(E,R=>{A.map=R,A.needsUpdate=!0}),A}),d=db.map((E,S)=>{const A=new ut({map:yh(83+S*4),transparent:!0,alphaTest:.4,side:$t});return this.loadArt(E,R=>{A.map=R,A.needsUpdate=!0}),A}),u=[67,73].map(E=>new ut({map:yv(E),transparent:!0,alphaTest:.4,side:$t})),f=[75,77].map(E=>new ut({map:wv(E),transparent:!0,alphaTest:.35,side:$t})),g=new ut({map:pa(41)}),_=new ut({map:Sh(69),transparent:!0,alphaTest:.4,side:$t}),m=new ut({map:Oe(5)}),p=new ut({map:Oe(7)}),y=(E,S,A,R,b,M=!1)=>{const C=new Ot(A,R),I=M?-1:1,N=new Z(C,b);N.position.set(E,R/2,S),N.scale.x=I;const G=new Z(C,b);G.position.set(E,R/2,S),G.rotation.y=Math.PI/2,G.scale.x=I,this.world.add(N),this.world.add(G)},v=c?ub:.44,x=(E,S,A,R,b)=>{const C=d.length>0&&i(R,b,17)<.12?d:h,I=C[Math.floor(i(R,b,4)*C.length)%C.length];y(E,S,A*v,A,I,i(R,b,16)>.5)};for(let E=0;E<e;E++)for(let S=0;S<t;S++){const A=xi(S,E),R=S*P,b=E*P;if(A==="tree"||A==="edge"){const M=A==="edge",C=(M?8:5.4)+i(S,E,1)*2.2,I=(i(S,E,2)-.5)*P*.45,N=(i(S,E,3)-.5)*P*.45;x(R+I,b+N,C,S,E),i(S,E,12)>.5&&y(R+I,b+N,2,1.1,f[Math.floor(i(S,E,13)*f.length)%f.length]),M&&this.blocked.add(`${S},${E}`)}else if(A==="bush"){const M=2.4+i(S,E,5)*.8,C=1.4+i(S,E,6)*.5,I=u[Math.floor(i(S,E,7)*u.length)%u.length];y(R,b,M,C,I),this.blocked.add(`${S},${E}`)}else if(A==="rock"){const M=1.1+i(S,E,8)*.8,C=new Z(new Nl(M),g);C.position.set(R,M*.55,b),C.rotation.set(i(S,E,9)*3,i(S,E,10)*3,.2),C.scale.y=.7,this.world.add(C),this.blocked.add(`${S},${E}`)}else if(A==="foliage"){const M=1.8+i(S,E,5)*.8,C=.9+i(S,E,6)*.5;y(R+(i(S,E,2)-.5)*P*.4,b+(i(S,E,3)-.5)*P*.4,M,C,f[Math.floor(i(S,E,7)*f.length)%f.length])}else if(A==="skull")y(R,b,2,1.4,_);else if(A==="sign"){const C=S===n.col&&E===n.row?[0,1]:this.forestSignFacing(S,E);this.buildForestSign(R,b,m,C),this.blocked.add(`${S},${E}`)}if(A==="grass"&&i(S,E,14)>.9){const M=new Z(new xe(.28,.32,2.4,8),p);M.rotation.set(0,i(S,E,15)*Math.PI,Math.PI/2),M.position.set(R,.28,b),this.world.add(M)}}if(zr.length>0){const E=this.makeClusterMats(),S=(b,M,C,I)=>{const N=15+i(I,0,2)*3,G=E[Math.floor(i(I,0,4)*E.length)%E.length],X=N*G.aspect,q=new Z(new Ot(X,N),G.mat);q.position.set(b,N/2-1,M),q.rotation.y=C,i(I,0,5)>.5&&(q.scale.x=-1),this.world.add(q)},A=15*1.85*.72;let R=0;for(let b=-P;b<=(t+1)*P;b+=A)S(b,-1.5*P,0,R++);for(let b=-P;b<=e*P;b+=A)S(-1.5*P,b,Math.PI/2,R++),S((t+.5)*P,b,-Math.PI/2,R++)}else{for(let E=-2;E<t+2;E+=2)x(E*P+1,-2*P,10+i(E,-3,1)*3,E,-3);for(let E=-1;E<e-2;E+=2)x(-2*P,E*P,9+i(-3,E,1)*3,-3,E),x((t+1)*P,E*P,9+i(t+2,E,1)*3,t+2,E)}this.buildForestBackdrop(),this.buildForestVillageBackdrop()}buildForestVillageBackdrop(){const t=aa("V"),e=t.col*P,n=t.row*P,i=n+9*P,r=.6,a=new ut({map:Fr(61)});a.map.repeat.set(20,16);const o=new Z(new Ot(22*P,16*P),a);o.rotation.x=-Math.PI/2,o.position.set(e,-.02,n+6*P),this.world.add(o);const l=new ut({map:ma(63)}),c=new Ot(P,P);for(let E=n+1*P;E<i-2*P;E+=P){const S=new Z(c,l);S.rotation.x=-Math.PI/2,S.rotation.z=Math.round((E-n)/P)%2*(Math.PI/2),S.position.set(e,.02,E),this.world.add(S)}if(zr.length>0){const E=this.makeClusterMats(),S=13,A=(R,b,M,C)=>{const I=E[C%E.length],N=new Z(new Ot(S*I.aspect,S),I.mat);N.position.set(R,S/2-1,b),N.rotation.y=Math.PI,M&&(N.scale.x=-1),this.world.add(N)};A(e-13,i+2*P,!1,0),A(e+13,i+2*P,!0,1),A(e-20,i-1*P,!1,1),A(e+20,i-1*P,!0,0)}const h=new ke,d=new ut({map:Oe(3)}),u=new ut({map:Rs(3),side:$t}),f=new ut({map:Oe(5)}),g=new ut({map:pa(41)}),_=new ut({map:On(31)}),m=new ut({map:bh(7)}),p=new ut({color:2102288});m.map.repeat.set(6,5);const y=new Z(new Ot(24,18),m);y.rotation.x=-Math.PI/2,y.position.set(0,.06,2),h.add(y);const v=new Z(new fe(34,9,7),g);v.position.set(-2,3.5,13),h.add(v);for(const[E,S,A,R]of[[-4,0,11,13],[1,-.5,10,15],[5.5,.5,9,11],[-9,.8,8,10]]){const b=new Z(new Bn(A,R,7),g);b.position.set(E*1.5,R/2+1.5,13+S),b.rotation.y=E,h.add(b)}const x=(E,S,A,R,b)=>{const M=new Z(new fe(A,R,A),d);M.position.set(E,R/2,S),h.add(M);const C=new Z(new Bn(A*.82,R*.6,4),u);C.position.set(E,R+R*.28,S),C.rotation.y=Math.PI/4,h.add(C);const I=E+b[0]*(A/2+.03),N=S+b[1]*(A/2+.03),G=Math.atan2(b[0],b[1]),X=new Z(new Ot(A*.26,R*.5),p);X.position.set(I,R*.25,N),X.rotation.y=G,h.add(X);for(const q of[-1,1]){const et=new Z(new Ot(A*.16,R*.2),p);et.position.set(I+q*b[1]*A*.26,R*.62,N-q*b[0]*A*.26),et.rotation.y=G,h.add(et)}};{for(const[C,I,N]of[[-6,3,3.2],[-2,3.2,3.4],[2,3,3.1],[6,3.2,3.3]])x(C,7,I,N,[0,-1]);for(const C of[2.5,5])x(-8,C,3,3.1,[1,0]);for(const C of[2.5,5])x(8,C,3,3.1,[-1,0]);const E=new ke,S=new Z(new xe(.85,.95,1,16),_);S.position.y=.5,E.add(S);for(const C of[-.75,.75]){const I=new Z(new fe(.14,1.9,.14),f);I.position.set(C,1.45,0),E.add(I)}const A=new Z(new Bn(1.25,.7,4),u);A.position.y=2.5,A.rotation.y=Math.PI/4,E.add(A),E.position.set(0,0,2.5),h.add(E);const R=new ke,b=new fe(.36,3.4,.36);for(const C of[-1.6,1.6]){const I=new Z(b,f);I.position.set(C,1.7,0),R.add(I)}const M=new Z(new fe(3.9,.36,.4),f);M.position.set(0,3.35,0),R.add(M),R.position.set(0,0,-3.5),h.add(R)}h.scale.setScalar(r),h.position.set(e,0,i),this.world.add(h)}forestSignFacing(t,e){const n=[[0,1],[1,0],[0,-1],[-1,0]];let i=[0,1];for(const[r,a]of n){if(xi(t+r,e+a)==="path")return[r,a];oa(t+r,e+a)&&(i=[r,a])}return i}buildForestSign(t,e,n,i){const r=new ke,a=new fe(.16,2.3,.16);for(const c of[-.62,.62]){const h=new Z(a,n);h.position.set(c,1.15,0),r.add(h)}const o=new Z(new fe(1.75,.66,.09),n);o.position.set(0,1.78,.02),r.add(o);const l=new Z(new fe(1.85,.76,.06),new ut({color:2759696}));l.position.set(0,1.78,-.01),r.add(l),r.position.set(t,0,e),r.rotation.y=Math.atan2(i[0],i[1]),this.world.add(r)}buildForestBackdrop(){const t=new Re({color:7305349}),e=new Re({color:12108495}),n=(Zr/2-.5)*P,i=-7*P;[-2.4,-1.2,-.1,1,2.2].forEach((a,o)=>{const l=30+o*37%13,c=17+o*53%8,h=n+a*24,d=i-o*31%8,u=new Z(new Bn(c,l,5),t);u.position.set(h,l/2-3,d),u.rotation.y=o,this.world.add(u);const f=new Z(new Bn(c*.4,l*.32,5),e);f.position.set(h,l-l*.18-3,d),f.rotation.y=o,this.world.add(f)})}canWalk(t,e){return(this.location==="village"?ra(t,e):this.location==="forest"?oa(t,e):this.location==="dungeon"?ch(t,e):this.location==="showcase"?gh(t,e):ba(t,e))&&!this.blocked.has(`${t},${e}`)}floorYAt(t,e){return this.location==="showcase"?ca:0}applyShowcasePose(){const t=As(this.showIdx);this.camera.position.set(t.x,t.y+Lr,t.z),this.camera.rotation.y=t.yaw}stationStep(t,e){const n=As(this.showIdx),i=As(t);this.showIdx=t;const r=e>0?i.yaw:i.yaw+Math.PI;let a=this.camera.rotation.y,o=r;for(;o-a>Math.PI;)o-=Math.PI*2;for(;o-a<-Math.PI;)o+=Math.PI*2;this.anim={kind:"move",t0:performance.now(),fromX:n.x,fromZ:n.z,toX:i.x,toZ:i.z,fromY:n.y,toY:i.y,fromYaw:a,toYaw:o},this.pushMinimap()}showcaseStationMove(t){t==="forward"?this.showIdx<Ki?this.stationStep(this.showIdx+1,1):this.enterTerraceFromStairs():t==="back"&&(this.showIdx>0?this.stationStep(this.showIdx-1,-1):this.exitShowcase())}enterTerraceFromStairs(){const t=As(Ki);this.showIdx=-1,this.col=kr.c,this.row=kr.r,this.facing=3;let e=this.camera.rotation.y,n=ph;for(;n-e>Math.PI;)n-=Math.PI*2;for(;n-e<-Math.PI;)n+=Math.PI*2;this.anim={kind:"move",t0:performance.now(),fromX:t.x,fromZ:t.z,toX:kr.c*P,toZ:kr.r*P,fromY:t.y,toY:ca,fromYaw:e,toYaw:n},this.pushMinimap()}enterStairsFromTerrace(){const t=As(Ki);this.showIdx=Ki;let e=this.camera.rotation.y,n=ph+Math.PI;for(;n-e>Math.PI;)n-=Math.PI*2;for(;n-e<-Math.PI;)n+=Math.PI*2;this.anim={kind:"move",t0:performance.now(),fromX:this.col*P,fromZ:this.row*P,toX:t.x,toZ:t.z,fromY:ca,toY:t.y,fromYaw:e,toYaw:n},this.pushMinimap()}exitShowcase(){const t=this.showcaseReturn;if(t)this.showcaseReturn=null,this.enterLocation(t.loc,t.col,t.row,t.facing);else{const e=this.returnTo;this.enterLocation("village",e.col,e.row,e.facing)}}buildMiniGrid(){let t,e,n;this.location==="village"?(t=ln,e=Ke,n=ra):this.location==="forest"?(t=Zr,e=Ws,n=oa):this.location==="dungeon"?(t=io,e=Xs,n=ch):this.location==="showcase"?(t=6,e=10,n=gh):(t=xl,e=lo,n=ba);const i=new Uint8Array(t*e);for(let r=0;r<e;r++)for(let a=0;a<t;a++)i[r*t+a]=n(a,r)?1:0;this.miniGrid={cols:t,rows:e,cells:i}}pushMinimap(){this.miniGrid||this.buildMiniGrid();const t=this.miniGrid,[e,n]=An[this.facing];this.ui.updateMinimap({cols:t.cols,rows:t.rows,cells:t.cells,col:this.col,row:this.row,dc:e,dr:n})}doInteract(){const t=this.facingTarget();if(t){if(t.kind==="enter"){this.returnTo={col:this.col,row:this.row,facing:(this.facing+2)%4};const e=Or("P");this.enterLocation(t.estab,e.col,e.row,0)}else if(t.kind==="enterhome"){this.returnTo={col:this.col,row:this.row,facing:(this.facing+2)%4};const e=Or("P");this.enterLocation(t.id,e.col,e.row,0)}else if(t.kind==="exit"){const{col:e,row:n,facing:i}=this.returnTo;this.enterLocation("village",e,n,i)}else if(t.kind==="talk"){const e=ya(t.lines),n=this.portraitFor(t.key);this.dialogue={name:t.name,lines:e,idx:0,portrait:n},this.ui.showDialogue(t.name,e[0],n)}else if(t.kind==="dungeon"){this.returnTo={col:this.col,row:this.row,facing:(this.facing+2)%4};const e=hh("S");this.enterLocation("dungeon",e.col,e.row,0)}else if(t.kind==="gate")this.openGate(t.key);else if(t.kind==="lockgate"){const e=ya(["Um portão de ferro antigo, coberto de selos.","Uma força além da tua o mantém trancado. Ainda não há como passar..."]);this.dialogue={name:"Portão Selado",lines:e,idx:0,portrait:null},this.ui.showDialogue("Portão Selado",e[0],null)}else if(t.kind==="sanctuary")this.showcaseReturn={loc:"dungeon",col:this.col,row:this.row,facing:(this.facing+2)%4},this.enterLocation("showcase",0,0,0);else if(t.kind==="smithshop")this.ui.openSmith(this.buildSmithData());else if(t.kind==="toforest"){this.returnTo={col:this.col,row:this.row,facing:(this.facing+2)%4};const e=aa("P");this.enterLocation("forest",e.col,e.row,0)}else if(t.kind==="tovillage"){const e=lh();this.enterLocation("village",e.col,e.row-1,0)}else if(t.kind==="sign"){const e=ya(t.lines);this.dialogue={name:"Placa",lines:e,idx:0,portrait:null},this.ui.showDialogue("Placa",e[0],null)}}}openGate(t){const e=this.gates.get(t);e&&(this.gateAnims.push({pivotL:e.pivotL,pivotR:e.pivotR,t0:this.now,dur:620,to:1.05}),this.gates.delete(t),this.blocked.delete(t))}advanceDialogue(){this.dialogue&&(this.dialogue.idx++,this.dialogue.idx>=this.dialogue.lines.length?(this.dialogue=null,this.ui.hideDialogue()):this.ui.showDialogue(this.dialogue.name,this.dialogue.lines[this.dialogue.idx],this.dialogue.portrait??null))}box(t,e,n,i,r,a,o){const l=new Z(new fe(i,r,a),o);return l.position.set(t,e,n),this.world.add(l),l}buildRoomShell(t=9,e=2,n=4864038){const r=new ut({map:Oe(t)}),a=new ut({map:Oe(e),side:$t}),o=new ut({color:n,side:$t}),l=new ut({map:_v(11),side:$t}),c=new Ot(P,P);for(let f=0;f<lo;f++)for(let g=0;g<xl;g++){if(!ba(g,f))continue;const _=new Z(c,r);_.rotation.x=-Math.PI/2,_.position.set(g*P,0,f*P),this.world.add(_);const m=new Z(c,o);m.rotation.x=Math.PI/2,m.position.set(g*P,3,f*P),this.world.add(m);for(const[p,y]of An)Kr(g+p,f+y)==="#"&&this.addWall(g*P,f*P,p,y,0,3,a)}const h=Or("X"),d=new Z(new Ot(rh,Pr),l);d.position.set(h.col*P,Pr/2,h.row*P+P/2-.06),d.rotation.y=Math.PI,this.world.add(d);const u=new Z(new Ot(1.7,.6),new ut({map:fa("SAÍDA"),transparent:!0,side:$t}));u.position.set(h.col*P,Pr+.5,h.row*P+P/2-.08),u.rotation.y=Math.PI,this.world.add(u)}buildHome(t){this.buildRoomShell(9,6,3943450);const n=new ut({map:Oe(5)}),i=new ut({map:Oe(7)}),r=new ut({map:On(31)}),a=new ut({color:7161136}),o=new ut({color:13350025});this.wallCell(1,3,[-1,0],(g,_)=>{this.box(g,1.2,_,.5,2.4,2,r),this.box(g+.42,.55,_,.34,.7,1.1,new Re({color:16742942})),this.glowLight(g+1.4,1,_,16747054,4.2,10)});const l=3*P,c=3*P;this.blocked.add("3,3"),this.box(l,.95,c,1.7,.12,1.1,n);for(const[g,_]of[[-.7,0],[.7,0],[0,-.5],[0,.5]])this.box(l+g*.9,.42,c+_,.16,.84,.16,i);this.box(l,.45,c-.95,1.4,.12,.4,i),this.box(l,.45,c+.95,1.4,.12,.4,i),this.box(l-.4,1.06,c,.22,.1,.22,o);const h=new Z(new xe(.16,.13,.22,12),i);h.position.set(l+.35,1.11,c),this.world.add(h);const d=wa[t].residents.length>=2?[[5,2],[5,4]]:[[5,3]];for(const[g,_]of d)this.wallCell(g,_,[1,0],(m,p)=>{this.box(m,.35,p,.9,.5,1.9,i),this.box(m,.66,p,.86,.16,1.8,o),this.box(m,.78,p-.7,.7,.18,.4,a)});this.wallCell(2,1,[0,-1],(g,_)=>{this.box(g,1.7,_,1.6,.1,.4,n);for(let m=-1;m<=1;m++){const p=new Z(new xe(.12,.1,.28,10),m===0?i:o);p.position.set(g+m*.45,1.9,_),this.world.add(p)}});const u=new Z(new Ot(2.2,1.6),new ut({color:8010538}));u.rotation.x=-Math.PI/2,u.position.set(3*P,.02,3*P+.2),this.world.add(u);const f=new gn(16769192,5.5,30,2);f.position.set(3*P,3-.4,3*P),this.world.add(f);for(const g of wa[t].residents)this.addNPC(g.col,g.row,g.seed,g.name,g.lines,g.art,g.scale??1)}buildInterior(t){const n=new ut({map:Oe(5)});this.buildRoomShell(9,2,4864038);const i=Or("N"),r=i.col*P,a=i.row*P+P/2+.2;this.box(r,.55,a,P*2.4,1.1,.7,n),this.box(r,1.12,a,P*2.4+.2,.14,.95,n);const o=va[t];this.addNPC(i.col,i.row,o.seed,o.npc,o.lines,fb[t]);const l=new gn(16766106,4.5,15,2);l.position.set(r,2.5,i.row*P+1.6),this.world.add(l);const c=new gn(16769192,8,34,2);c.position.set(3*P,3-.3,3*P),this.world.add(c),this.box(3*P,3-.25,3*P,.4,.3,.4,new Re({color:16758874})),t==="tavern"?this.propsTavern():t==="store"?this.propsStore():t==="smith"?this.propsSmith():this.propsAlchemist()}glowLight(t,e,n,i,r,a){const o=new gn(i,r,a,2);o.position.set(t,e,n),this.world.add(o),this.flames.push({light:o,base:r})}wallCell(t,e,n,i){const r=t*P+n[0]*(P/2-.75),a=e*P+n[1]*(P/2-.75);i(r,a),this.blocked.add(`${t},${e}`)}propsTavern(){const t=new ut({map:Oe(5)}),e=new ut({map:On(31)}),n=new ut({map:ua(17)}),i=new ut({color:13279818});this.wallCell(1,3,[-1,0],(r,a)=>{this.box(r,1.1,a,.5,2.2,2.2,e),this.box(r+.4,.6,a,.35,.8,1.2,new Re({color:16742942})),this.glowLight(r+1.3,1,a,16747054,5,11)}),this.wallCell(1,2,[-1,0],(r,a)=>{const o=new Z(new xe(.5,.44,1.3,14),n);o.position.set(r,.65,a),this.world.add(o)});for(const r of[2,4])this.wallCell(5,r,[1,0],(a,o)=>{this.box(a,.9,o,.2,1,.2,t);const l=new Z(new xe(.8,.8,.15,16),t);l.position.set(a,1.45,o),this.world.add(l);const c=new Z(new xe(.14,.12,.28,10),i);c.position.set(a,1.66,o),this.world.add(c)})}propsStore(){const t=new ut({map:Oe(3)}),e=[9058874,3824266,5208634,11569712,8010362];let n=0;const i=(r,a,o)=>{this.box(r,1.05,a,.5,2.1,2.4,t);for(const l of[.7,1.4])for(const c of[-.7,.7]){const h=new ut({color:e[n++%e.length]});this.box(r-o*.35,l,a+c,.4,.5,.5,h)}};for(const r of[2,3,4])this.wallCell(1,r,[-1,0],(a,o)=>i(a,o,-1));for(const r of[2,3,4])this.wallCell(5,r,[1,0],(a,o)=>i(a,o,1))}propsSmith(){const t=new ut({color:4869716}),e=new ut({map:On(31)}),n=new ut({map:Oe(5)}),i=new ut({map:ua(17)});this.wallCell(1,3,[-1,0],(r,a)=>{this.box(r,1,a,.6,2,2.2,e),this.box(r+.45,1,a,.35,.5,1.2,new Re({color:16738834})),this.glowLight(r+1.3,1.1,a,16742942,5.5,11)}),this.wallCell(1,4,[-1,0],(r,a)=>{this.box(r,.45,a,.6,.9,.6,n),this.box(r,1.05,a,.5,.35,1,t)}),this.wallCell(1,2,[-1,0],(r,a)=>{const o=new Z(new xe(.5,.44,1.2,14),i);o.position.set(r,.6,a),this.world.add(o)});for(const r of[2,3,4])this.wallCell(5,r,[1,0],(a,o)=>{this.box(a,1,o,.25,2,1.4,n);for(const l of[-.4,.4]){const c=new Z(new fe(.08,1.5,.22),t);c.position.set(a-.2,1.4,o+l),this.world.add(c)}})}propsAlchemist(){const t=new ut({map:Oe(3)}),e=new ut({color:3817028}),n=[4239472,5267648,12599408,12623920,9453760];let i=0;const r=(a,o,l)=>{this.box(a,1.05,o,.5,2.1,2.4,t);for(const c of[.7,1.35,2])for(const h of[-.7,0,.7]){const d=new ut({color:n[i++%n.length]}),u=new Z(new xe(.11,.13,.36,8),d);u.position.set(a-l*.32,c,o+h),this.world.add(u)}};for(const a of[2,3])this.wallCell(1,a,[-1,0],(o,l)=>r(o,l,-1));for(const a of[2,3])this.wallCell(5,a,[1,0],(o,l)=>r(o,l,1));this.wallCell(1,4,[-1,0],(a,o)=>{const l=new Z(new xe(.6,.48,.85,16),e);l.position.set(a,.5,o),this.world.add(l);const c=new Z(new xe(.53,.53,.1,16),new Re({color:7077792}));c.position.set(a,.92,o),this.world.add(c),this.glowLight(a+.9,1.2,o,5308314,3.2,8)}),this.wallCell(5,4,[1,0],(a,o)=>{this.box(a,.8,o,.9,.15,1.6,t),this.box(a,.98,o+.3,.5,.16,.6,new ut({color:6961706}))})}buildRoofs(t){const e=(i,r)=>t[Math.floor(Math.abs(this.mHash(i,r,9))*997)%t.length],n=(i,r,a,o)=>{if(ye(i,r)!=="building")return!1;const l=ye(i+a,r+o);return l==="street"||l==="barrel"};for(const i of[1,-1])for(let r=0;r<ln;r++){let a=0;for(;a<Ke;)if(n(r,a,i,0)){let o=a;for(;o+1<Ke&&n(r,o+1,i,0);)o++;let l=sa;for(let c=a;c<=o;c++)l=Math.min(l,this.depthInto(r,c,-i,0));this.addRoofRun(r,a,r,o,i,0,l,e(r,a)),a=o+1}else a++}for(const i of[1,-1])for(let r=0;r<Ke;r++){let a=0;for(;a<ln;)if(n(a,r,0,i)){let o=a;for(;o+1<ln&&n(o+1,r,0,i);)o++;let l=sa;for(let c=a;c<=o;c++)l=Math.min(l,this.depthInto(c,r,0,-i));this.addRoofRun(a,r,o,r,0,i,l,e(a,r)),a=o+1}else a++}}depthInto(t,e,n,i){let r=0;for(;r<sa&&ye(t+n*r,e+i*r)==="building";)r++;return Math.max(1,r)}addRoofRun(t,e,n,i,r,a,o,l){const c=ei-.15,h=ei+ia,d=new k,u=new k,f=new k,g=new k,_=new k,m=new k;let p,y,v;const x=o*P-P/2;if(r!==0){const R=t*P+r*(P/2)+r*ih,b=t*P-r*x,M=(R+b)/2,C=e*P-P/2,I=i*P+P/2;d.set(R,c,C),u.set(R,c,I),f.set(M,h,C),g.set(M,h,I),_.set(b,c,C),m.set(b,c,I),p=i-e+1,y=Math.abs(R-M)/P+.5,v=Math.abs(M-b)/P+.5}else{const R=e*P+a*(P/2)+a*ih,b=e*P-a*x,M=(R+b)/2,C=t*P-P/2,I=n*P+P/2;d.set(C,c,R),u.set(I,c,R),f.set(C,h,M),g.set(I,h,M),_.set(C,c,b),m.set(I,c,b),p=n-t+1,y=Math.abs(R-M)/P+.5,v=Math.abs(M-b)/P+.5}this.world.add(this.quad(d,u,g,f,l,p,y)),this.world.add(this.quad(f,g,m,_,l,p,v)),this.world.add(this.tri(d,f,_,l)),this.world.add(this.tri(u,m,g,l));const E=d.clone();E.y-=sh;const S=u.clone();S.y-=sh,this.world.add(this.quad(E,S,u,d,l,p,.3))}tri(t,e,n,i){const r=new Te;return r.setAttribute("position",new Ge(new Float32Array([t.x,t.y,t.z,e.x,e.y,e.z,n.x,n.y,n.z]),3)),r.setAttribute("uv",new Ge(new Float32Array([0,0,1,0,.5,1]),2)),r.setIndex([0,1,2]),r.computeVertexNormals(),new Z(r,i)}decalMat(t,e=.35){const n=new ut({transparent:!0,alphaTest:e,side:$t});return n.colorWrite=!1,n.depthWrite=!1,this.loadArt(t,i=>{n.map=i,n.colorWrite=!0,n.depthWrite=!0,n.needsUpdate=!0}),n}addWallDecal(t,e,n,i,r,a,o,l){const c=new Z(new Ot(a,o),r);return c.position.set(t*P+n*(P/2+.05),l,e*P+i*(P/2+.05)),c.rotation.y=n===1?Math.PI/2:n===-1?-Math.PI/2:i===1?0:Math.PI,c.renderOrder=4,this.world.add(c),c}addDecal(t,e,n,i,r,a){const o=a==="door"?rh:qx,l=a==="door"?Pr:$x,c=a==="door"?l/2+.02:Yx,h=new Z(new Ot(o,l),r),d=t*P+n*(P/2+.04),u=e*P+i*(P/2+.04);h.position.set(d,c,u),n===1?h.rotation.y=Math.PI/2:n===-1?h.rotation.y=-Math.PI/2:i===1?h.rotation.y=0:h.rotation.y=Math.PI,this.world.add(h)}quad(t,e,n,i,r,a=1,o=1){const l=new Te,c=new Float32Array([t.x,t.y,t.z,e.x,e.y,e.z,n.x,n.y,n.z,i.x,i.y,i.z]);return l.setAttribute("position",new Ge(c,3)),l.setAttribute("uv",new Ge(new Float32Array([0,0,a,0,a,o,0,o]),2)),l.setIndex([0,1,2,0,2,3]),l.computeVertexNormals(),new Z(l,r)}onAction(t){if(this.dialogue){t==="interact"&&this.advanceDialogue();return}if(t==="interact"){this.doInteract();return}if(t==="attack"){const o=this.ui.swingWeapon();o>=0&&window.setTimeout(()=>this.tryHitEnemy(),o);return}if(this.anim)return;if(this.location==="showcase"&&this.showIdx>=0){this.showcaseStationMove(t);return}if(t==="turnLeft"||t==="turnRight"){const o=t==="turnLeft"?1:-1;this.facing=(this.facing+(o===1?3:1))%4,this.pushMinimap(),this.anim={kind:"turn",t0:performance.now(),fromY:this.camera.rotation.y,toY:this.camera.rotation.y+Math.PI/2*o};return}let e=this.facing;t==="back"?e=(e+2)%4:t==="strafeLeft"?e=(e+3)%4:t==="strafeRight"&&(e=(e+1)%4);const[n,i]=An[e],r=this.col+n,a=this.row+i;if(this.location==="showcase"&&iv(r,a)){this.enterStairsFromTerrace();return}if(this.location==="dungeon"&&cn(r,a)==="sanctuary"&&this.canWalk(r,a)){this.showcaseReturn={loc:"dungeon",col:this.col,row:this.row,facing:this.facing},this.enterLocation("showcase",0,0,0);return}this.canWalk(r,a)&&(this.anim={kind:"move",t0:performance.now(),fromX:this.col*P,fromZ:this.row*P,toX:r*P,toZ:a*P,fromY:this.floorYAt(this.col,this.row),toY:this.floorYAt(r,a)},this.col=r,this.row=a,this.pushMinimap(),this.location==="forest"&&xi(r,a)==="tree"&&this.brushFoliage())}brushFoliage(){const t=this.foliageFx;t&&(t.style.transition="none",t.style.opacity="0.55",t.offsetWidth,t.style.transition="opacity 620ms ease-out",t.style.opacity="0")}updateNpcPhase(t){const e=(t/Ur+Dr)%1,n=this.daylight(e);return!this.npcNight&&n<.26?(this.npcNight=!0,this.staggerDepart(t)):this.npcNight&&n>.44&&(this.npcNight=!1,this.staggerDepart(t)),this.npcNight}staggerDepart(t){this.walkers.forEach((e,n)=>{e.waitUntil=Math.max(e.waitUntil,t+n*650)})}wallLean(t,e){const i=[[-1,0],[1,0],[0,-1],[0,1]];for(const[r,a]of i){const o=ye(t+r,e+a);if(o==="building"||o==="mountain")return{x:r*1.3,z:a*1.3}}return{x:0,z:0}}nightDoorDir(t){const e=[[-1,0],[1,0],[0,-1],[0,1]];for(const[n,i]of e){const r=t.c+n,a=t.r+i;if(ye(r,a)!=="building")continue;const o=`${r},${a},${-n},${-i}`;if(this.doorMap.has(o)||this.homeDoorMap.has(o))return{dc:n,dr:i}}return null}setWalkerOpacity(t,e){const n=t.mesh.material,i=e>=.99?.5:.02;n.alphaTest!==i&&(n.alphaTest=i,n.needsUpdate=!0),n.opacity=e,t.shadow.material.opacity=.55*e,t.tag.material.opacity=e}setWalkerVisible(t,e){t.mesh.visible=e,t.shadow.visible=e,t.tag.visible=e}plazaWalkable(t,e){if(t===Yi.c&&e===Yi.r)return!1;const n=e>=6&&e<=12&&t>=2&&t<=12,i=e>=13&&e<=14&&t>=6&&t<=8;return!n&&!i?!1:ra(t,e)}cellFreeForWalker(t,e,n){if(!this.plazaWalkable(t,e)||t===this.col&&e===this.row)return!1;for(const i of this.walkers)if(i!==n&&!i.inside&&(i.cur.c===t&&i.cur.r===e||i.moving&&i.to.c===t&&i.to.r===e))return!1;return!0}bfsNextStep(t,e){const n=(h,d)=>h+","+d;if(t.c===e.c&&t.r===e.r)return null;const i=new Map;i.set(n(t.c,t.r),null);const r=[t];let a=0;const o=[[0,-1],[1,0],[0,1],[-1,0]];let l=!1;for(;a<r.length;){const h=r[a++];if(h.c===e.c&&h.r===e.r){l=!0;break}for(const[d,u]of o){const f=h.c+d,g=h.r+u,_=n(f,g);i.has(_)||!(f===e.c&&g===e.r)&&!this.plazaWalkable(f,g)||(i.set(_,h),r.push({c:f,r:g}))}}if(!l&&!i.has(n(e.c,e.r)))return null;let c=e;for(let h=0;h<400;h++){const d=i.get(n(c.c,c.r));if(!d)return null;if(d.c===t.c&&d.r===t.r)return c;c=d}return null}updateWalkers(t){if(this.walkers.length===0||this.dialogue)return;const e=900,n=640,i=this.updateNpcPhase(t);for(const r of this.walkers){if(r.trans){const a=Math.min(1,(t-r.trans.t0)/n),o=a*a*(3-2*a),l=r.trans.fromX+(r.trans.toX-r.trans.fromX)*o,c=r.trans.fromZ+(r.trans.toZ-r.trans.fromZ)*o;r.mesh.position.x=l,r.mesh.position.z=c,r.shadow.position.x=l,r.shadow.position.z=c,r.tag.position.x=l,r.tag.position.z=c,this.setWalkerOpacity(r,r.trans.kind==="enter"?1-o:o),a>=1&&(r.trans.kind==="enter"?(r.inside=!0,this.setWalkerVisible(r,!1)):(this.setWalkerOpacity(r,1),r.mesh.position.set(r.toX,r.baseY,r.toZ),r.shadow.position.set(r.toX,.03,r.toZ)),r.trans=null);continue}if(r.inside){if(!i){const a=r.doorDir??this.nightDoorDir(r.nightCell),o=this.wallLean(r.nightCell.c,r.nightCell.r),l=r.nightCell.c*P+o.x,c=r.nightCell.r*P+o.z,h=r.nightCell.c*P+(a?.dc??0)*(P/2+.2),d=r.nightCell.r*P+(a?.dr??0)*(P/2+.2);this.setWalkerVisible(r,!0),this.setWalkerOpacity(r,0),r.mesh.position.set(h,r.baseY,d),r.trans={kind:"exit",t0:t,fromX:h,fromZ:d,toX:l,toZ:c}}continue}if(r.moving){const a=Math.min(1,(t-r.t0)/e),o=a*a*(3-2*a),l=r.fromX+(r.toX-r.fromX)*o,c=r.fromZ+(r.toZ-r.fromZ)*o;r.mesh.position.x=l,r.mesh.position.z=c,r.mesh.position.y=r.baseY+Math.sin(a*Math.PI)*.05,r.shadow.position.x=l,r.shadow.position.z=c,r.tag.position.x=l,r.tag.position.z=c,a>=1&&(r.moving=!1,r.mesh.position.y=r.baseY,r.waitUntil=t+240+(r.cur.c*37+r.cur.r*17)%220)}else if(t>=r.waitUntil){const a=i?r.nightCell:r.dayCell;if(r.cur.c===a.c&&r.cur.r===a.r){if(i&&(r.doorDir===void 0&&(r.doorDir=this.nightDoorDir(r.nightCell)),r.doorDir)){const u=r.nightCell.c*P+r.doorDir.dc*(P/2+.2),f=r.nightCell.r*P+r.doorDir.dr*(P/2+.2);r.trans={kind:"enter",t0:t,fromX:r.mesh.position.x,fromZ:r.mesh.position.z,toX:u,toZ:f};continue}r.waitUntil=t+500;continue}const o=this.bfsNextStep(r.cur,a);if(!o){r.waitUntil=t+500;continue}if(!this.cellFreeForWalker(o.c,o.r,r)){r.waitUntil=t+300;continue}const l=`${o.c},${o.r}`,c=this.npcMap.get(r.key);c&&(this.npcMap.delete(r.key),this.npcMap.set(l,c));const d=o.c===a.c&&o.r===a.r?this.wallLean(o.c,o.r):{x:0,z:0};r.fromX=r.mesh.position.x,r.fromZ=r.mesh.position.z,r.toX=o.c*P+d.x,r.toZ=o.r*P+d.z,r.from={c:r.cur.c,r:r.cur.r},r.to=o,r.cur=o,r.key=l,r.moving=!0,r.t0=t}}}tick(t){this.now=t;const e=this.anim;if(e)if(e.kind==="move"){const c=Math.min(1,(t-e.t0)/Rd),h=c*c*(3-2*c);this.camera.position.x=e.fromX+(e.toX-e.fromX)*h,this.camera.position.z=e.fromZ+(e.toZ-e.fromZ)*h;const d=e.fromY+(e.toY-e.fromY)*h;this.camera.position.y=d+Lr+Math.sin(c*Math.PI)*.07,e.fromYaw!==void 0&&e.toYaw!==void 0&&(this.camera.rotation.y=e.fromYaw+(e.toYaw-e.fromYaw)*h),c>=1&&(this.camera.position.y=e.toY+Lr,e.toYaw!==void 0&&(this.camera.rotation.y=e.toYaw),this.anim=null)}else{const c=Math.min(1,(t-e.t0)/jx),h=c*c*(3-2*c);this.camera.rotation.y=e.fromY+(e.toY-e.fromY)*h,c>=1&&(this.anim=null)}const n=this.camera.position.x,i=this.camera.position.z;for(const c of this.npcs){c.rotation.y=Math.atan2(n-c.position.x,i-c.position.z);const h=c.userData;if(h&&h.h){const d=1+Math.sin(t*.0016+h.ph)*.014;c.scale.y=d,c.position.y=h.baseY+(d-1)*h.h/2,c.rotation.z=Math.sin(t*.0011+h.ph*1.7)*.007}}for(const c of this.billboardProps)c.rotation.y=Math.atan2(n-c.position.x,i-c.position.z);if(this.reticle&&this.target&&!this.target.dyingAt){this.reticle.visible=!0;let c=n-this.target.bx,h=i-this.target.bz;const d=Math.hypot(c,h)||1;c/=d,h/=d,this.reticle.position.set(this.target.bx+c*.3,1.35,this.target.bz+h*.3)}else this.reticle&&(this.reticle.visible=!1);const r=this.lastTickMs?Math.min(.1,(t-this.lastTickMs)/1e3):0;this.lastTickMs=t,r>0&&this.playerMp<this.playerMaxMp&&(this.playerMp=Math.min(this.playerMaxMp,this.playerMp+this.playerMaxMp*.03*r+1.5*r),this.ui.setMana(this.playerMp/this.playerMaxMp));const a=!!this.buff&&t<this.buff.until;if(this.buffActive&&!a&&(this.buff=null,this.recomputeDerived()),this.buffActive=a,this.coolingSkills.size)for(const c of this.coolingSkills){const d=(this.cooldownUntil[c]??0)-t;if(d<=0)this.ui.setSkillCooldown(c,0,0),this.coolingSkills.delete(c);else{const u=_l(c).cd;this.ui.setSkillCooldown(c,d/u,Math.ceil(d/1e3))}}const o=this.enemy;if(o){const c=o.mesh.geometry.parameters.height;let h=n-o.bx,d=i-o.bz;const u=Math.hypot(h,d)||1;h/=u,d/=u;let f=0,g=1,_=0,m=0,p=0,y=0;const v=t-o.hitAt;if(o.dyingAt){const x=(t-o.dyingAt)/650;o.mat.opacity=Math.max(0,1-x*3),o.mesh.rotation.z=-x*1.6;const E=Math.max(.12,1-x*.55);if(o.mesh.scale.set(1+x*.35,E,1),o.mesh.position.y=c/2-x*.75,o.bar.visible=!1,x>=1){for(const S of[o.mesh,o.bar]){this.world.remove(S);const A=this.billboardProps.indexOf(S);A>=0&&this.billboardProps.splice(A,1)}o.mesh.geometry.dispose(),o.mat.dispose(),this.enemy=null,window.setTimeout(()=>{this.enemy||(this.location==="village"?this.buildDungeonEnemy():this.location==="dungeon"&&this.spawnDungeonEnemy())},5e3)}}else{const x=Math.abs(this.col-o.c)+Math.abs(this.row-o.r)===1;if(!o.atkAt&&x&&t>=o.nextAtk&&(o.atkAt=t),o.atkAt){const E=(t-o.atkAt)/700;if(E<.4){const S=E/.4;f=-.35*S,g=1-.05*S}else if(E<.6){const S=(E-.4)/.2;f=-.35+1.25*S,g=.95+.27*S}else{const S=(E-.6)/.4;f=.9*(1-S),g=1.22-.22*S}!o.hitApplied&&E>.52&&(o.hitApplied=!0,x&&this.damagePlayer(12)),E>=1&&(o.atkAt=0,o.hitApplied=!1,o.nextAtk=t+1100)}if(v<240){const E=v/240,S=Math.sin((1-E)*Math.PI);f-=S*.6;const A=1-E*.7;m=A,p=A*.2,y=A*.16,_=S*.14}o.mesh.position.set(o.bx+h*f,c/2,o.bz+d*f),o.mesh.scale.set(g,g,1),o.mesh.rotation.z=_}o.mat.emissive.setRGB(m,p,y)}this.updatePoofs(t),this.updateProjectiles(t),this.updateDayNight(t);const l=(t/Ur+Dr)%1;if(this.ui.setClock(l,this.daylight(l)),this.gateAnims.length){for(const c of this.gateAnims){const h=Math.min(1,(t-c.t0)/c.dur),d=h*h*(3-2*h);c.pivotL.rotation.y=c.to*d,c.pivotR.rotation.y=-c.to*d}this.gateAnims=this.gateAnims.filter(c=>t-c.t0<c.dur)}for(const c of this.motes){const h=c.pts.geometry.attributes.position,d=h.array;for(let u=0;u<c.sp.length;u++){let f=d[u*3+1]+c.sp[u]*.012;d[u*3]+=Math.sin(t*6e-4+u*1.7)*c.sway,f>c.y1&&(f=c.y0),d[u*3+1]=f}h.needsUpdate=!0}for(const c of this.fogPuffs){const h=t*9e-5;c.s.position.x=c.bx+Math.cos(h+c.ph)*c.rad,c.s.position.z=c.bz+Math.sin(h*.8+c.ph)*c.rad,c.s.position.y=c.by+Math.sin(h*1.1+c.ph)*c.rise;const d=c.s.material;d.rotation+=c.rotSp*.016,d.opacity=c.baseOp*(.6+.4*Math.sin(h*2+c.ph))}this.fogDome&&(this.fogDome.rotation.y=t*2e-5);for(const c of this.flames)c.light.intensity=c.base+Math.sin(t*.011+c.base)*.8+Math.sin(t*.027)*.5;for(const c of this.animTex)c.tex.offset.x=Math.floor(t/1e3*c.fps)%c.frames/c.frames;this.updateWalkers(t);for(const c of this.smoke){const h=c.userData,d=(t*28e-5+h.phase)%4/4,u=d*4.2;c.position.set(h.baseX+Math.sin(t*6e-4+h.phase)*.5,ei+ia+u,h.baseZ);const f=.6+d*1.6;c.scale.set(f,f,f),c.material.opacity=Math.sin(d*Math.PI)*.42,c.rotation.y=Math.atan2(n-c.position.x,i-c.position.z)}if(this.waterGlint){const c=this.waterGlint.material;c.opacity=.18+(Math.sin(t*.0016)+1)*.11;const h=1+Math.sin(t*.0013+1)*.08;this.waterGlint.scale.set(h,h,h)}this.anim||this.updatePrompt(),this.renderer.render(this.scene,this.camera)}updatePrompt(){const t=this.facingTarget();let e=" ";t&&(t.kind==="enter"?e=`Entrar — ${va[t.estab].name}`:t.kind==="enterhome"?e="Entrar na casa":t.kind==="exit"?e="Sair":t.kind==="talk"?e=`Falar com ${t.name}`:t.kind==="dungeon"?e="Descer à masmorra":t.kind==="toforest"?e="Ir para a Floresta":t.kind==="tovillage"?e="Voltar ao Vilarejo":t.kind==="sign"?e="Ler a placa":t.kind==="lockgate"?e="Portão selado":t.kind==="sanctuary"?e="Subir a escadaria":t.kind==="smithshop"&&(e="Ferreiro — Aprimorar")),e!==this.lastPrompt&&(this.lastPrompt=e,this.ui.setPrompt(e===" "?null:e))}facingTarget(){const[t,e]=An[this.facing],n=this.col+t,i=this.row+e,r=this.npcMap.get(`${n},${i}`);if(r&&this.location==="smith")return{kind:"smithshop"};if(r)return{kind:"talk",name:r.name,lines:r.lines,key:`${n},${i}`};if(this.location==="village"){const a=this.doorMap.get(`${n},${i},${-t},${-e}`);if(a)return{kind:"enter",estab:a};const o=this.homeDoorMap.get(`${n},${i},${-t},${-e}`);if(o)return{kind:"enterhome",id:o};if(ye(n,i)==="stairs")return{kind:"dungeon"};if(ye(n,i)==="forestgate"||ye(this.col,this.row)==="forestgate")return{kind:"toforest"}}else if(this.location==="forest"){const a=xi(n,i);if(a==="gate"||xi(this.col,this.row)==="gate")return{kind:"tovillage"};if(a==="sign")return{kind:"sign",lines:Zx(n,i)}}else if(this.location==="dungeon"){if(cn(n,i)==="stairs"||cn(this.col,this.row)==="stairs")return{kind:"exit"};const a=`${n},${i}`;if(this.gates.has(a))return{kind:"gate",key:a};if(cn(n,i)==="lockgate")return{kind:"lockgate"};if(cn(n,i)==="sanctuary"||cn(this.col,this.row)==="sanctuary")return{kind:"sanctuary"}}else if(this.location==="showcase"){if(this.showIdx===0)return{kind:"exit"}}else if(Kr(n,i)==="X"||Kr(this.col,this.row)==="X")return{kind:"exit"};return null}resize(){const t=this.container.clientWidth||window.innerWidth,e=this.container.clientHeight||window.innerHeight;this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix()}};ht(yi,"SMITH_MAX",10),ht(yi,"SKY_KEYS",[[0,1186355],[.2,1581630],[.25,3750234],[.29,13601368],[.37,9542054],[.5,8884384],[.66,9736345],[.72,13464642],[.78,4863560],[.85,2239564],[1,1186355]]);let Os=yi;const Vb=""+new URL("cluster1-CDwqmovY.png",import.meta.url).href,Wb=""+new URL("cluster2-C0czRdHN.png",import.meta.url).href,Xb=""+new URL("death_poof-BE-q7e2_.png",import.meta.url).href,qb=""+new URL("dec_banner-UBOZSe9G.png",import.meta.url).href,$b=""+new URL("dec_cracks-DKSsqxx2.png",import.meta.url).href,Yb=""+new URL("dec_door-B5wowGxb.png",import.meta.url).href,jb=""+new URL("dec_gate-D08IdObB.png",import.meta.url).href,Zb=""+new URL("dec_gate_bars-B6YqUV4L.png",import.meta.url).href,Kb=""+new URL("dec_gate_frame-DQaCQl80.png",import.meta.url).href,Jb=""+new URL("dec_ivy-D9e2Lu2_.png",import.meta.url).href,Qb=""+new URL("dec_torch-CtkBMXz7.png",import.meta.url).href,tM=""+new URL("dec_window-DrwRbTKE.png",import.meta.url).href,eM=""+new URL("enemy_skeleton-BcZFeUKH.png",import.meta.url).href,nM=""+new URL("pine1-Cx-eXiFP.png",import.meta.url).href,iM=""+new URL("pine2-CUzpurmt.png",import.meta.url).href,sM=""+new URL("pine3-SLpwxU-f.png",import.meta.url).href,rM=""+new URL("pine4-D2rjz_P9.png",import.meta.url).href,oM=""+new URL("prop_lamp-D_-YfjKt.png",import.meta.url).href,aM=""+new URL("prop_notice-Bo5C5meg.png",import.meta.url).href,lM=""+new URL("sign_alch-CZuh7kJW.png",import.meta.url).href,cM=""+new URL("sign_smith-B08qmnbc.png",import.meta.url).href,hM=""+new URL("sign_store-C8OmR8-U.png",import.meta.url).href,dM=""+new URL("sign_tavern-DPGpN59J.png",import.meta.url).href,uM=""+new URL("sword-Cnq9dXJw.png",import.meta.url).href,fM=""+new URL("sword_atk-BUeBP5dr.png",import.meta.url).href,pM=""+new URL("tex_caveceil-Dh6eDyCo.jpg",import.meta.url).href,mM=""+new URL("tex_cavefloor-CIzR_jPs.jpg",import.meta.url).href,gM=""+new URL("tex_cavewall-DQwg9sDl.jpg",import.meta.url).href,_M=""+new URL("tex_cobble-DXMPAwZE.jpg",import.meta.url).href,xM=""+new URL("tex_dirt-BHcbB_Wz.jpg",import.meta.url).href,vM=""+new URL("tex_grass-C2Q1l28q.jpg",import.meta.url).href,bM=""+new URL("tex_mosswall-DpaqdZvP.jpg",import.meta.url).href,MM=""+new URL("tex_stonewall-BFmowWy6.jpg",import.meta.url).href,wM=""+new URL("tex_thatch-DdJMnyvF.jpg",import.meta.url).href,yM=""+new URL("tex_wood-B0jCHZZA.jpg",import.meta.url).href,SM=""+new URL("wpn_axe-CvCTYMUq.png",import.meta.url).href,TM=""+new URL("wpn_dagger-BBXQkEIm.png",import.meta.url).href,EM=""+new URL("wpn_greatsword-C2mQEgxH.png",import.meta.url).href,AM=""+new URL("wpn_mace-tTLR-MzC.png",import.meta.url).href,RM=""+new URL("wpn_maul-DbliXABw.png",import.meta.url).href,CM=""+new URL("wpn_orb-BsomjHDA.png",import.meta.url).href,LM=""+new URL("wpn_rapier-dNk4ndjW.png",import.meta.url).href,PM=""+new URL("wpn_shield-Bw_-3z5v.png",import.meta.url).href,UM=""+new URL("wpn_staff-DGpAnpDH.png",import.meta.url).href,DM=""+new URL("wpn_sword-CpsgndpE.png",import.meta.url).href,IM=""+new URL("alquimista-ssXsgGLn.png",import.meta.url).href,kM=""+new URL("anselmo-a5GEbqfY.png",import.meta.url).href,NM=""+new URL("camponesa-CrL0OA2Y.png",import.meta.url).href,FM=""+new URL("costureira-Br8zMBee.png",import.meta.url).href,OM=""+new URL("fazendeiro-CLjUAd1g.png",import.meta.url).href,zM=""+new URL("ferreiro-BdN9Klhc.png",import.meta.url).href,BM=""+new URL("gunther-D_2fJfLI.png",import.meta.url).href,HM=""+new URL("hedda-Buaz2cmx.png",import.meta.url).href,GM=""+new URL("lenhador-B54mx8Mi.png",import.meta.url).href,VM=""+new URL("lyle-gu11Pcfp.png",import.meta.url).href,WM=""+new URL("mercadora-B8RulStP.png",import.meta.url).href,XM=""+new URL("pip-rEDWa-7w.png",import.meta.url).href,qM=""+new URL("tam-BlgWIVim.png",import.meta.url).href,$M=""+new URL("taverneiro-Ba4UKFJq.png",import.meta.url).href,YM=""+new URL("wilma-DI_QNtI6.png",import.meta.url).href,jM=""+new URL("btn_base-wlebnyD3.png",import.meta.url).href,ZM=""+new URL("class_clerigo-Bv6kp9nE.png",import.meta.url).href,KM=""+new URL("class_guerreiro-DQxwW6XE.png",import.meta.url).href,JM=""+new URL("class_icon_clerigo-DoeXMn4k.png",import.meta.url).href,QM=""+new URL("class_icon_guerreiro-C0eBl5F1.png",import.meta.url).href,tw=""+new URL("class_icon_ladino-D8WBB-2i.png",import.meta.url).href,ew=""+new URL("class_icon_mago-CqEgdtDo.png",import.meta.url).href,nw=""+new URL("class_ladino-CBY8tWR5.png",import.meta.url).href,iw=""+new URL("class_mago-BCWgBU8E.png",import.meta.url).href,sw=""+new URL("clock_moon-D1xrN5yT.png",import.meta.url).href,rw=""+new URL("clock_sun-DO5hSXa1.png",import.meta.url).href,ow=""+new URL("coin-CsF22FSK.png",import.meta.url).href,aw=""+new URL("create_bg-B2uN_HVG.png",import.meta.url).href,lw=""+new URL("dpad-3wZIZEqb.png",import.meta.url).href,cw=""+new URL("eq_container-84uusXC9.png",import.meta.url).href,hw=""+new URL("eq_frame-d-QhyRgX.png",import.meta.url).href,dw=""+new URL("eq_slot-DS9kMsLx.png",import.meta.url).href,uw=""+new URL("fx_corrente-CI-yrk7e.png",import.meta.url).href,fw=""+new URL("fx_descarga-IY9gTcyD.png",import.meta.url).href,pw=""+new URL("fx_fireball-CNUxOMXZ.png",import.meta.url).href,mw=""+new URL("fx_ice-DGJxZKsy.png",import.meta.url).href,gw=""+new URL("fx_ice_lance-DCxKutbL.png",import.meta.url).href,_w=""+new URL("fx_imolacao-C-a5dtuo.png",import.meta.url).href,xw=""+new URL("fx_l_apunhalar-BRQuzQIj.png",import.meta.url).href,vw=""+new URL("fx_l_arremesso-rtDW0ow6.png",import.meta.url).href,bw=""+new URL("fx_l_danca-w9P6lgu4.png",import.meta.url).href,Mw=""+new URL("fx_l_dupla-C6r_wn6L.png",import.meta.url).href,ww=""+new URL("fx_l_estocada-hJYwlzLR.png",import.meta.url).href,yw=""+new URL("fx_l_mortal-DuYG-M3q.png",import.meta.url).href,Sw=""+new URL("fx_l_nuvem-B2qmk_tl.png",import.meta.url).href,Tw=""+new URL("fx_l_danca-w9P6lgu4.png",import.meta.url).href,Ew=""+new URL("fx_l_sombras-fe3usKIe.png",import.meta.url).href,Aw=""+new URL("fx_l_toxina-Bu3f7mn-.png",import.meta.url).href,Rw=""+new URL("fx_meteoro-DywgnSdp.png",import.meta.url).href,Cw=""+new URL("fx_muralha-yiXxe2Yc.png",import.meta.url).href,Lw=""+new URL("fx_prisao-BDhoA-oK.png",import.meta.url).href,Pw=""+new URL("fx_ray-BukWo5qE.png",import.meta.url).href,Uw=""+new URL("fx_tempestade-DS9uv2Z_.png",import.meta.url).href,Dw=""+new URL("hud_plate-B2ygb4FP.png",import.meta.url).href,Iw=""+new URL("ico_action-BRbeFgHL.png",import.meta.url).href,kw=""+new URL("ico_attack-CbdvrLXs.png",import.meta.url).href,Nw=""+new URL("ico_inventory-B_-_sjLB.png",import.meta.url).href,Fw=""+new URL("load_sword-Bhnb8m09.png",import.meta.url).href,Ow=""+new URL("logo_plate-CK0-uVl1.png",import.meta.url).href,zw=""+new URL("map_frame-B4piWonF.png",import.meta.url).href,Bw=""+new URL("menu_plate-_kr3JKFU.png",import.meta.url).href,Hw=""+new URL("bg_clerigo-BUhJVnRj.jpg",import.meta.url).href,Gw=""+new URL("bg_guerreiro-DWgmGaUG.jpg",import.meta.url).href,Vw=""+new URL("bg_ladino-B6L4a-g-.jpg",import.meta.url).href,Ww=""+new URL("bg_mago-Bct2J94D.jpg",import.meta.url).href,Xw=""+new URL("title_bg-DAPsvtIp.png",import.meta.url).href,qw=""+new URL("title_bg-DAPsvtIp.png",import.meta.url).href,$w=""+new URL("create_bg-B2uN_HVG.png",import.meta.url).href,Yw=""+new URL("menu_plate-_kr3JKFU.png",import.meta.url).href,jw=""+new URL("logo_plate-CK0-uVl1.png",import.meta.url).href,Zw=""+new URL("class_icon_guerreiro-C0eBl5F1.png",import.meta.url).href,Kw=""+new URL("class_icon_ladino-D8WBB-2i.png",import.meta.url).href,Jw=""+new URL("class_icon_mago-CqEgdtDo.png",import.meta.url).href,Qw=""+new URL("class_icon_clerigo-DoeXMn4k.png",import.meta.url).href,ty=qw,Wl={guerreiro:Zw,ladino:Kw,mago:Jw,clerigo:Qw};function ey(s){return ly(),new Promise(t=>{const e=document.createElement("div");e.id="gh-intro",s.appendChild(e);const n=o=>{e.remove(),t(o)},i=(o,l)=>iy(e,o,l,n,()=>zh(e,i,o.id,l));let r=0;const a=ay(oy(),o=>r=o);ry(e,()=>r,a,900,()=>ny(e,()=>zh(e,i)))})}function ny(s,t){s.innerHTML=`
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
    </div>`,s.querySelector("#gh-btn-new").addEventListener("click",t)}function zh(s,t,e,n){let i=e&&vl[e]||Fs[0];s.innerHTML=`
    <div class="gh-screen gh-create">
      <h2 class="gh-screen-h">Crie seu Herói</h2>
      <div class="gh-class-tabs">
        ${Fs.map(h=>`<button class="gh-class-tab${h.id===i.id?" on":""}" data-id="${h.id}"><img class="gh-tab-ico" src="${Wl[h.id]}" alt=""/><span>${h.name}</span></button>`).join("")}
      </div>
      <div class="gh-class-main" id="gh-class-main"></div>
      <div class="gh-create-foot">
        <input class="gh-name-input" id="gh-name" maxlength="18" placeholder="Nome do herói" value="${n?n.replace(/"/g,"&quot;"):""}" />
        <button class="gh-menu-btn" id="gh-btn-start">Continuar ▸</button>
      </div>
    </div>`;const r=s.querySelector("#gh-class-main"),a=h=>r.innerHTML=Qr(h);a(i);const o=()=>{r.style.minHeight="0";let h=0;for(const d of Fs)r.innerHTML=Qr(d),h=Math.max(h,r.getBoundingClientRect().height);r.innerHTML=Qr(i),r.style.minHeight=Math.ceil(h)+"px"};o();const l=document.fonts;l?.ready&&l.ready.then(()=>{r.isConnected&&o()});const c=()=>{r.isConnected&&o()};window.addEventListener("resize",c),s.querySelectorAll(".gh-class-tab").forEach(h=>h.addEventListener("click",()=>{s.querySelectorAll(".gh-class-tab").forEach(d=>d.classList.toggle("on",d===h)),i=vl[h.dataset.id],a(i)})),s.querySelector("#gh-btn-start").addEventListener("click",()=>{const d=s.querySelector("#gh-name").value.trim()||"Herói";window.removeEventListener("resize",c),t(i,d)})}function iy(s,t,e,n,i){const r={...t.attr},a={...t.attr};s.innerHTML=`
    <div class="gh-screen gh-create">
      <h2 class="gh-screen-h">Distribua os Atributos</h2>
      <div class="gh-class-main" id="gh-alloc-main"></div>
      <div class="gh-create-foot">
        <button class="gh-menu-btn gh-menu-btn-sec" id="gh-back">◂ Voltar</button>
        <button class="gh-menu-btn" id="gh-start">Iniciar Jornada ▸</button>
      </div>
    </div>`;const o=s.querySelector("#gh-alloc-main"),l=()=>a.str-r.str+(a.dex-r.dex)+(a.int-r.int),c=()=>{o.innerHTML=sy(t,a,r,Ph-l()),o.querySelectorAll(".gh-pm").forEach(f=>f.addEventListener("click",()=>{const g=f.dataset.k,_=Number(f.dataset.d);_<0&&a[g]<=r[g]||_>0&&l()>=Ph||(a[g]+=_,c())}))},h=()=>{const f=o.getBoundingClientRect().width,g=document.createElement("div");g.className="gh-class-main",g.style.cssText=`position:absolute; left:-9999px; top:0; visibility:hidden; pointer-events:none; height:auto; width:${f}px;`,o.parentElement.appendChild(g);let _=0;for(const m of Fs)g.innerHTML=Qr(m),_=Math.max(_,g.getBoundingClientRect().height);g.remove(),o.style.height=Math.ceil(_)+"px",c()};h();const d=document.fonts;d?.ready&&d.ready.then(()=>{o.isConnected&&h()});const u=()=>{o.isConnected&&h()};window.addEventListener("resize",u),s.querySelector("#gh-back").addEventListener("click",()=>{window.removeEventListener("resize",u),i()}),s.querySelector("#gh-start").addEventListener("click",()=>{window.removeEventListener("resize",u),n({name:e,classId:t.id,attr:{...a}})})}function sy(s,t,e,n){const i=s.portrait?`<img class="gh-class-portrait" src="${s.portrait}" alt="" />`:`<div class="gh-class-ph"><div class="gh-ph-emoji">${s.emoji}</div></div>`,r=Jr(t,s.hp,s.mp),a=(l,c)=>{const h=t[c],d=h-e[c],u=h<=e[c]?" disabled":"",f=n<=0?" disabled":"";return`<div class="gh-prim-row">
      <span class="gh-prim-name">${l}</span>
      <span class="gh-prim-step">
        <button class="gh-pm" data-k="${c}" data-d="-1"${u}>−</button>
        <b class="gh-prim-val">${h}${d?`<i class="gh-prim-up">+${d}</i>`:""}</b>
        <button class="gh-pm" data-k="${c}" data-d="1"${f}>＋</button>
      </span>
    </div>`},o=(l,c)=>`<div class="gh-sec-row"><span>${l}</span><b>${c}</b></div>`;return`
    <div class="gh-class-art">${i}</div>
    <div class="gh-class-info gh-alloc">
      <div class="gh-class-name"><img class="gh-name-ico" src="${Wl[s.id]}" alt=""/>${s.name}</div>
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
    </div>`}function Qr(s){const t=s.portrait?`<img class="gh-class-portrait" src="${s.portrait}" alt="" />`:`<div class="gh-class-ph"><div class="gh-ph-emoji">${s.emoji}</div><div class="gh-ph-txt">arte em breve</div></div>`,e=(i,r)=>`<div class="gh-attr"><span>${i}</span><div class="gh-attr-bar"><i style="width:${r*10}%"></i></div><b>${r}</b></div>`,n=s.weapons.map(i=>kv[i]?.name).filter(Boolean).join(" · ");return`
    <div class="gh-class-art">${t}</div>
    <div class="gh-class-info">
      <div class="gh-class-name"><img class="gh-name-ico" src="${Wl[s.id]}" alt=""/>${s.name}</div>
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
          <img class="gh-bs-base" src="${ao}" alt="" />
          <div class="gh-bs-fill"><div class="gh-bs-lava"></div></div>
        </div>
        <div class="gh-boot-txt" id="gh-boot-txt">Forjando o mundo… 0%</div>
      </div>
    </div>`;const r=s.querySelector("#gh-boot-sword"),a=s.querySelector("#gh-boot-txt"),o=performance.now();let l=0;const c=()=>{const h=Math.round(t()*100);r.style.setProperty("--p",h+"%"),a.textContent=`Forjando o mundo… ${h}%`,l=requestAnimationFrame(c)};c(),e.then(async()=>{const h=performance.now()-o;h<n&&await new Promise(d=>setTimeout(d,n-h)),cancelAnimationFrame(l),r.style.setProperty("--p","100%"),a.textContent="Pronto",await new Promise(d=>setTimeout(d,160)),i()})}function oy(){const s=Object.assign({"../assets/env/cluster1.png":Vb,"../assets/env/cluster2.png":Wb,"../assets/env/death_poof.png":Xb,"../assets/env/dec_banner.png":qb,"../assets/env/dec_cracks.png":$b,"../assets/env/dec_door.png":Yb,"../assets/env/dec_gate.png":jb,"../assets/env/dec_gate_bars.png":Zb,"../assets/env/dec_gate_frame.png":Kb,"../assets/env/dec_ivy.png":Jb,"../assets/env/dec_torch.png":Qb,"../assets/env/dec_window.png":tM,"../assets/env/enemy_skeleton.png":eM,"../assets/env/pine1.png":nM,"../assets/env/pine2.png":iM,"../assets/env/pine3.png":sM,"../assets/env/pine4.png":rM,"../assets/env/prop_lamp.png":oM,"../assets/env/prop_notice.png":aM,"../assets/env/sign_alch.png":lM,"../assets/env/sign_smith.png":cM,"../assets/env/sign_store.png":hM,"../assets/env/sign_tavern.png":dM,"../assets/env/sword.png":uM,"../assets/env/sword_atk.png":fM,"../assets/env/tex_caveceil.jpg":pM,"../assets/env/tex_cavefloor.jpg":mM,"../assets/env/tex_cavewall.jpg":gM,"../assets/env/tex_cobble.jpg":_M,"../assets/env/tex_dirt.jpg":xM,"../assets/env/tex_grass.jpg":vM,"../assets/env/tex_mosswall.jpg":bM,"../assets/env/tex_stonewall.jpg":MM,"../assets/env/tex_thatch.jpg":wM,"../assets/env/tex_wood.jpg":yM,"../assets/env/wpn_axe.png":SM,"../assets/env/wpn_dagger.png":TM,"../assets/env/wpn_greatsword.png":EM,"../assets/env/wpn_mace.png":AM,"../assets/env/wpn_maul.png":RM,"../assets/env/wpn_orb.png":CM,"../assets/env/wpn_rapier.png":LM,"../assets/env/wpn_shield.png":PM,"../assets/env/wpn_staff.png":UM,"../assets/env/wpn_sword.png":DM,"../assets/npc/alquimista.png":IM,"../assets/npc/anselmo.png":kM,"../assets/npc/camponesa.png":NM,"../assets/npc/costureira.png":FM,"../assets/npc/fazendeiro.png":OM,"../assets/npc/ferreiro.png":zM,"../assets/npc/gunther.png":BM,"../assets/npc/hedda.png":HM,"../assets/npc/lenhador.png":GM,"../assets/npc/lyle.png":VM,"../assets/npc/mercadora.png":WM,"../assets/npc/pip.png":XM,"../assets/npc/tam.png":qM,"../assets/npc/taverneiro.png":$M,"../assets/npc/wilma.png":YM,"../assets/ui/btn_base.png":jM,"../assets/ui/class_clerigo.png":ZM,"../assets/ui/class_guerreiro.png":KM,"../assets/ui/class_icon_clerigo.png":JM,"../assets/ui/class_icon_guerreiro.png":QM,"../assets/ui/class_icon_ladino.png":tw,"../assets/ui/class_icon_mago.png":ew,"../assets/ui/class_ladino.png":nw,"../assets/ui/class_mago.png":iw,"../assets/ui/clock_moon.png":sw,"../assets/ui/clock_sun.png":rw,"../assets/ui/coin.png":ow,"../assets/ui/create_bg.png":aw,"../assets/ui/dpad.png":lw,"../assets/ui/eq_container.png":cw,"../assets/ui/eq_frame.png":hw,"../assets/ui/eq_slot.png":dw,"../assets/ui/fx/fx_corrente.png":uw,"../assets/ui/fx/fx_descarga.png":fw,"../assets/ui/fx/fx_fireball.png":pw,"../assets/ui/fx/fx_ice.png":mw,"../assets/ui/fx/fx_ice_lance.png":gw,"../assets/ui/fx/fx_imolacao.png":_w,"../assets/ui/fx/fx_l_apunhalar.png":xw,"../assets/ui/fx/fx_l_arremesso.png":vw,"../assets/ui/fx/fx_l_danca.png":bw,"../assets/ui/fx/fx_l_dupla.png":Mw,"../assets/ui/fx/fx_l_estocada.png":ww,"../assets/ui/fx/fx_l_mortal.png":yw,"../assets/ui/fx/fx_l_nuvem.png":Sw,"../assets/ui/fx/fx_l_rajada.png":Tw,"../assets/ui/fx/fx_l_sombras.png":Ew,"../assets/ui/fx/fx_l_toxina.png":Aw,"../assets/ui/fx/fx_meteoro.png":Rw,"../assets/ui/fx/fx_muralha.png":Cw,"../assets/ui/fx/fx_prisao.png":Lw,"../assets/ui/fx/fx_ray.png":Pw,"../assets/ui/fx/fx_tempestade.png":Uw,"../assets/ui/hud_plate.png":Dw,"../assets/ui/ico_action.png":Iw,"../assets/ui/ico_attack.png":kw,"../assets/ui/ico_inventory.png":Nw,"../assets/ui/load_sword.png":Fw,"../assets/ui/logo_plate.png":Ow,"../assets/ui/map_frame.png":zw,"../assets/ui/menu_plate.png":Bw,"../assets/ui/skills/bg_clerigo.jpg":Hw,"../assets/ui/skills/bg_guerreiro.jpg":Gw,"../assets/ui/skills/bg_ladino.jpg":Vw,"../assets/ui/skills/bg_mago.jpg":Ww,"../assets/ui/skills/sk_clerigo_01.png":Cd,"../assets/ui/skills/sk_clerigo_02.png":Ld,"../assets/ui/skills/sk_clerigo_03.png":Pd,"../assets/ui/skills/sk_clerigo_04.png":Ud,"../assets/ui/skills/sk_clerigo_05.png":Dd,"../assets/ui/skills/sk_clerigo_06.png":Id,"../assets/ui/skills/sk_clerigo_07.png":kd,"../assets/ui/skills/sk_clerigo_08.png":Nd,"../assets/ui/skills/sk_clerigo_09.png":Fd,"../assets/ui/skills/sk_clerigo_10.png":Od,"../assets/ui/skills/sk_clerigo_11.png":zd,"../assets/ui/skills/sk_clerigo_12.png":Bd,"../assets/ui/skills/sk_clerigo_13.png":Hd,"../assets/ui/skills/sk_clerigo_14.png":Gd,"../assets/ui/skills/sk_clerigo_15.png":Vd,"../assets/ui/skills/sk_guerreiro_01.png":Wd,"../assets/ui/skills/sk_guerreiro_02.png":Xd,"../assets/ui/skills/sk_guerreiro_03.png":qd,"../assets/ui/skills/sk_guerreiro_04.png":$d,"../assets/ui/skills/sk_guerreiro_05.png":Yd,"../assets/ui/skills/sk_guerreiro_06.png":jd,"../assets/ui/skills/sk_guerreiro_07.png":Zd,"../assets/ui/skills/sk_guerreiro_08.png":Kd,"../assets/ui/skills/sk_guerreiro_09.png":Jd,"../assets/ui/skills/sk_guerreiro_10.png":Qd,"../assets/ui/skills/sk_guerreiro_11.png":tu,"../assets/ui/skills/sk_guerreiro_12.png":eu,"../assets/ui/skills/sk_guerreiro_13.png":nu,"../assets/ui/skills/sk_guerreiro_14.png":iu,"../assets/ui/skills/sk_guerreiro_15.png":su,"../assets/ui/skills/sk_ladino_01.png":ru,"../assets/ui/skills/sk_ladino_02.png":ou,"../assets/ui/skills/sk_ladino_03.png":au,"../assets/ui/skills/sk_ladino_04.png":lu,"../assets/ui/skills/sk_ladino_05.png":cu,"../assets/ui/skills/sk_ladino_06.png":hu,"../assets/ui/skills/sk_ladino_07.png":du,"../assets/ui/skills/sk_ladino_08.png":uu,"../assets/ui/skills/sk_ladino_09.png":fu,"../assets/ui/skills/sk_ladino_10.png":pu,"../assets/ui/skills/sk_ladino_11.png":mu,"../assets/ui/skills/sk_ladino_12.png":gu,"../assets/ui/skills/sk_ladino_13.png":_u,"../assets/ui/skills/sk_ladino_14.png":xu,"../assets/ui/skills/sk_ladino_15.png":vu,"../assets/ui/skills/sk_mago_01.png":bu,"../assets/ui/skills/sk_mago_02.png":Mu,"../assets/ui/skills/sk_mago_03.png":wu,"../assets/ui/skills/sk_mago_04.png":yu,"../assets/ui/skills/sk_mago_05.png":Su,"../assets/ui/skills/sk_mago_06.png":Tu,"../assets/ui/skills/sk_mago_07.png":Eu,"../assets/ui/skills/sk_mago_08.png":Au,"../assets/ui/skills/sk_mago_09.png":Ru,"../assets/ui/skills/sk_mago_10.png":Cu,"../assets/ui/skills/sk_mago_11.png":Lu,"../assets/ui/skills/sk_mago_12.png":Pu,"../assets/ui/skills/sk_mago_13.png":Uu,"../assets/ui/skills/sk_mago_14.png":Du,"../assets/ui/skills/sk_mago_15.png":Iu,"../assets/ui/skills/sk_passive_01.png":ku,"../assets/ui/skills/sk_passive_02.png":Nu,"../assets/ui/skills/sk_passive_03.png":Fu,"../assets/ui/skills/sk_passive_04.png":Ou,"../assets/ui/skills/sk_passive_05.png":zu,"../assets/ui/skills/sk_passive_06.png":Bu,"../assets/ui/skills/sk_passive_07.png":Hu,"../assets/ui/skills/sk_passive_08.png":Gu,"../assets/ui/skills/sk_passive_09.png":Vu,"../assets/ui/skills/sk_passive_10.png":Wu,"../assets/ui/skills/sk_passive_11.png":Xu,"../assets/ui/skills/sk_passive_12.png":qu,"../assets/ui/skills/sk_passive_13.png":$u,"../assets/ui/skills/sk_passive_14.png":Yu,"../assets/ui/skills/sk_passive_15.png":ju,"../assets/ui/skills/sk_passive_16.png":Zu,"../assets/ui/title_bg.png":Xw});return Array.from(new Set(Object.values(s)))}async function ay(s,t){if(s.length===0){t(1);return}let e=0;await Promise.all(s.map(n=>new Promise(i=>{const r=new Image,a=()=>{e++,t(e/s.length),i()};r.onload=a,r.onerror=a,r.src=n})))}function ly(){if(document.getElementById("gh-intro-style"))return;const s=document.createElement("style");s.id="gh-intro-style",s.textContent=`
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
    border:clamp(16px,3vw,24px) solid transparent; border-image:url(${Ku}) 88 fill;
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
    -webkit-mask:url(${ao}) left center / 100% 100% no-repeat;
    mask:url(${ao}) left center / 100% 100% no-repeat;
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
  `,document.head.appendChild(s)}document.documentElement.dataset.ghBuild="2026-07-24w";const Gr=document.getElementById("app"),Bh=new URLSearchParams(location.search);Bh.has("show")?new Os(Gr,{name:"Test",classId:"mago"},"showcase"):Bh.has("test")?new Os(Gr,{name:"Test",classId:"mago"}):ey(Gr).then(s=>{new Os(Gr,s)});
